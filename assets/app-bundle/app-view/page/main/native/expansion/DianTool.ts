import { _decorator, Component, Graphics, Vec2 } from 'cc';
import { app } from 'db://assets/app/app';
import { RopeManager } from './RopeManager';
const { ccclass } = _decorator;

interface TrailDot {
    position: Vec2;
    directionX: number;
    directionY: number;
    elapsed: number;
    duration: number;
}

@ccclass('DianTool')
export class DianTool extends Component {
    private readonly dotPositions = new Map<string, Vec2>();
    private readonly trailDots: TrailDot[] = [];
    private trailGraphics: Graphics | null = null;

    private readonly baseRadius = 3;
    private readonly trailRadius = 8.5;
    private readonly pulseSpanSteps = 6;
    private elapsedTime = 0;
    private lastPulseTime = -1;
    private moveStepDuration = 1 / 60;

    /** 注册点阵绘制事件，并复用网格节点上的 Graphics 组件。 */
    onLoad() {
        app.manager.event.on(app.config.eventname.DianTool, this.onDianTool, this);
        app.manager.event.on(app.config.eventname.ropeDotPulse, this.onRopeDotPulse, this);
        app.manager.event.on(app.config.eventname.themeChanged, this.onThemeChanged, this);
        // 箭头是网格节点的子节点，因此这里绘制的点始终位于箭头下方、页面背景上方。
        this.trailGraphics = this.getComponent(Graphics);
    }

    /** 组件销毁时注销事件，避免页面重复进入后产生重复回调。 */
    protected onDestroy(): void {
        app.manager.event.off(app.config.eventname.DianTool, this.onDianTool, this);
        app.manager.event.off(app.config.eventname.ropeDotPulse, this.onRopeDotPulse, this);
        app.manager.event.off(app.config.eventname.themeChanged, this.onThemeChanged, this);
        this.trailGraphics = null;
    }

    /**
     * 按帧更新正在播放的脉冲点。
     * 每个点放大时向箭头方向轻移，缩回时返回原坐标并常驻。
     */
    update(deltaTime: number): void {
        this.elapsedTime += deltaTime;

        const graphics = this.trailGraphics;
        if (!graphics || this.trailDots.length === 0) return;

        graphics.clear();
        const [red, green, blue, alpha] = this.getDotColor();
        graphics.fillColor.set(red, green, blue, alpha);

        // 先重绘所有常驻点；箭头子节点随后渲染，自然会覆盖线条下方的点。
        for (const position of this.dotPositions.values()) {
            graphics.circle(position.x, position.y, this.baseRadius);
        }

        for (let i = this.trailDots.length - 1; i >= 0; i--) {
            const dot = this.trailDots[i];
            dot.elapsed += deltaTime;

            const progress = Math.min(dot.elapsed / dot.duration, 1);
            if (progress >= 1) {
                this.trailDots.splice(i, 1);
                continue;
            }

            // 恢复原来的柔和脉冲：从基础大小放大到峰值，再平滑回到基础大小。
            const pulseAmount = Math.sin(progress * Math.PI);
            const radius = this.baseRadius + (this.trailRadius - this.baseRadius) * pulseAmount;
            // 点在放大阶段沿箭头方向轻移，缩回时同步回到原坐标；格子 Y 轴与界面 Y 轴方向相反。
            const moveDistance = this.baseRadius * pulseAmount;

            graphics.circle(
                dot.position.x + dot.directionX * moveDistance,
                dot.position.y - dot.directionY * moveDistance,
                radius
            );
        }

        graphics.fill();
    }

    /** 根据当前关卡的原始线条坐标建立基础点阵，不在空白格子新增点。 */
    onDianTool(gridWidth: number, gridHeight: number, ropeManager: RopeManager) {
        const graphics = this.getComponent(Graphics);
        graphics.clear();
        this.resetTrailState();

        const currentLevel = ropeManager['currentLevel'];
        if (!currentLevel || !currentLevel.ropes) {
            console.warn('DianTool: 没有找到关卡配置或绳子数据');
            return;
        }

        const ropePoints = new Set<string>();
        currentLevel.ropes.forEach(rope => {
            rope.forEach(([gridX, gridY]) => {
                ropePoints.add(`${gridX},${gridY}`);
            });
        });

        const [red, green, blue, alpha] = this.getDotColor();
        graphics.fillColor.set(red, green, blue, alpha);
        let hasDots = false;
        for (let i = 0; i < gridWidth; i++) {
            for (let j = 0; j < gridHeight; j++) {
                const key = `${i},${j}`;
                if (!ropePoints.has(key)) continue;

                const pos = ropeManager.gridToWorldPos(i, j);
                this.dotPositions.set(key, pos.clone());
                graphics.circle(pos.x, pos.y, this.baseRadius);
                hasDots = true;
            }
        }
        if (hasDots) graphics.fill();
    }

    /** 清空上一关的点阵状态和脉冲计时数据。 */
    private resetTrailState(): void {
        this.dotPositions.clear();
        this.trailDots.length = 0;
        this.lastPulseTime = -1;
        this.moveStepDuration = 1 / 60;
        this.trailGraphics?.clear();
    }

    /** 根据参考配色返回当前主题的点阵颜色。 */
    private getDotColor(): [number, number, number, number] {
        return app.manager.globaldata.getIsDarkMode()
            ? [64, 70, 104, 255]
            : [207, 213, 246, 255];
    }

    /** 主题切换后立即重绘所有常驻点，避免点阵颜色滞后到下一次动画。 */
    private onThemeChanged(): void {
        const graphics = this.trailGraphics;
        if (!graphics) return;

        graphics.clear();
        const [red, green, blue, alpha] = this.getDotColor();
        graphics.fillColor.set(red, green, blue, alpha);
        for (const position of this.dotPositions.values()) {
            graphics.circle(position.x, position.y, this.baseRadius);
        }
        graphics.fill();
    }

    /**
     * 箭头每释放一个原有点阵格子时触发一次缩放脉冲。
     * 脉冲周期根据连续格子的实际释放间隔自动匹配箭头速度。
     */
    private onRopeDotPulse(gridX: number, gridY: number, directionX: number, directionY: number): void {
        const key = `${gridX},${gridY}`;
        const position = this.dotPositions.get(key);
        if (!position) return;

        if (this.lastPulseTime >= 0) {
            const measuredStepDuration = this.elapsedTime - this.lastPulseTime;
            if (measuredStepDuration > 0) {
                const clampedStepDuration = Math.min(Math.max(measuredStepDuration, 1 / 120), 0.15);
                this.moveStepDuration = this.moveStepDuration * 0.5 + clampedStepDuration * 0.5;
            }
        }
        this.lastPulseTime = this.elapsedTime;

        // 脉冲波保持约六个点的宽度，箭头变速后会自动缩短或延长动画时间。
        const duration = Math.min(Math.max(this.moveStepDuration * this.pulseSpanSteps, 0.08), 0.9);
        this.trailDots.push({
            position: position.clone(),
            directionX,
            directionY,
            elapsed: 0,
            duration,
        });
    }
}
