import { _decorator, Component, Node, EventTouch, EventMouse, Vec3, UITransform, Vec2, math, macro, Slider } from 'cc';
import { app } from 'db://assets/app/app';
const { ccclass, property } = _decorator;

@ccclass('TouchZoomPan')
export class TouchZoomPan extends Component {

    @property({ type: Node, tooltip: "需要控制的目标节点（例如地图、图片）" })
    targetNode: Node = null!;

    @property({ tooltip: "最小缩放值" })
    minScale: number = 0.8;

    @property({ tooltip: "最大缩放值" })
    maxScale: number = 2.0;

    @property({ tooltip: "鼠标滚轮缩放速度" })
    wheelSpeed: number = 0.1;

    // --- 内部变量 ---
    private _initialDistance: number = 0; 
    private _initialScale: Vec3 = new Vec3();
    private _tempVec3: Vec3 = new Vec3();
    private _viewSize: math.Size = new math.Size();
    private _contentSize: math.Size = new math.Size();
    private _isZooming: boolean = false; // 标记是否正在缩放中
    private _zoomSlider: Slider | null = null;

    onLoad() {
        // 开启多点触控（保险起见）
        macro.ENABLE_MULTI_TOUCH = true;

        if (!this.targetNode) {
            console.error("TouchZoomPan: 请在属性面板中绑定 Target Node !");
            return;
        }

        // 注册触摸事件
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        this.node.on(Node.EventType.MOUSE_WHEEL, this.onMouseWheel, this);

        //监听restart
        app.manager.event.on(app.config.eventname.restart, this._onRestart, this);
    }

    start() {
        // 缩放条位于 PageMain/UI 下，运行时自动关联。
        const pageRoot = this.node.parent?.parent;
        this._zoomSlider = pageRoot?.getChildByPath('UI/ZoomSlider')?.getComponent(Slider) || null;
        if (this._zoomSlider) {
            this._zoomSlider.node.on('slide', this.onZoomSliderChanged, this);
            this.syncZoomSlider();
        }
    }

    private _onRestart() {
        // 重置拖动和缩放状态。
        this.targetNode.setPosition(0, 0);
        this.applyScale(1);
    }

    onDestroy() {
        this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        this.node.off(Node.EventType.MOUSE_WHEEL, this.onMouseWheel, this);
        this._zoomSlider?.node.off('slide', this.onZoomSliderChanged, this);
        app.manager.event.off(app.config.eventname.restart, this._onRestart, this);
    }

    private onTouchStart(event: EventTouch) {
        if (!this.isTransformFeatureEnabled()) return;
        // 这里的逻辑其实可以简化，主要逻辑放在 Move 里处理会更稳健
        // 仅仅用来清理状态
        if (event.getTouches().length < 2) {
            this._isZooming = false;
        }
    }

    private onTouchMove(event: EventTouch) {
        if (!this.isTransformFeatureEnabled()) return;
        const touches = event.getTouches();

        // =========================
        //      双指缩放逻辑
        // =========================
        if (touches.length === 2) {
            const p1 = touches[0].getUILocation();
            const p2 = touches[1].getUILocation();
            const currentDistance = Vec2.distance(p1, p2);

            // 关键修复：如果在 Move 过程中发现变成了双指，但还没开始记录初始值，立刻记录
            if (!this._isZooming) {
                this._initialDistance = currentDistance;
                this._initialScale.set(this.targetNode.scale);
                this._isZooming = true; // 锁定状态，防止单指逻辑干扰
                return; // 第一帧只记录，不缩放，防止跳变
            }

            if (this._initialDistance > 0) {
                // 计算缩放倍率
                const scaleFactor = currentDistance / this._initialDistance;
                let newScale = this._initialScale.x * scaleFactor;

                // 限制缩放范围
                newScale = Math.max(this.minScale, Math.min(newScale, this.maxScale));

                // 应用缩放
                this.applyScale(newScale);

                 //取消缩放引导
                if(app.manager.globaldata.getNeedGuideTwo()){
                    app.manager.globaldata.setNeedGuideTwo(false);
                    // 移除新手引导二
                    app.manager.event.emit(app.config.eventname.guideTwoEnd);
                }
            }
        } 
        // =========================
        //      单指移动逻辑
        // =========================
        else if (touches.length === 1) {
            // 如果刚刚松开一只手（从双指变单指），需要重置状态，不要立刻移动，否则会跳变
            if (this._isZooming) {
                this._isZooming = false;
                return; 
            }

            const delta = event.getUIDelta();
            this.targetNode.getPosition(this._tempVec3);
            this._tempVec3.x += delta.x;
            this._tempVec3.y += delta.y;
            
            this.limitPosition(this._tempVec3, this.targetNode.scale.x);
            this.targetNode.setPosition(this._tempVec3);
        }
    }

    private onTouchEnd(event: EventTouch) {
        const touches = event.getTouches();
        // 如果手指少于2根，重置缩放状态
        if (touches.length < 2) {
            this._isZooming = false;
        }
    }

    private onMouseWheel(event: EventMouse) {
        if (!this.isTransformFeatureEnabled()) return;
        const scrollY = event.getScrollY();
        const scaleDiff = (scrollY > 0 ? 1 : -1) * this.wheelSpeed;
        let newScale = this.targetNode.scale.x + scaleDiff;
        newScale = Math.max(this.minScale, Math.min(newScale, this.maxScale));

        this.applyScale(newScale);
         //取消缩放引导
        if(app.manager.globaldata.getNeedGuideTwo()){
            app.manager.globaldata.setNeedGuideTwo(false);
            // 移除新手引导二
            app.manager.event.emit(app.config.eventname.guideTwoEnd);
        }
    }

    /** 底部拖动条回调：把 0-1 的进度映射为实际缩放倍率。 */
    private onZoomSliderChanged(slider: Slider) {
        if (!this.isTransformFeatureEnabled()) return;
        const newScale = this.minScale + (this.maxScale - this.minScale) * slider.progress;
        this.applyScale(newScale, false);

        if (app.manager.globaldata.getNeedGuideTwo()) {
            app.manager.globaldata.setNeedGuideTwo(false);
            app.manager.event.emit(app.config.eventname.guideTwoEnd);
        }
    }

    /** 统一处理拖动条、双指和滚轮缩放。 */
    private applyScale(scale: number, syncSlider: boolean = true) {
        const newScale = Math.max(this.minScale, Math.min(scale, this.maxScale));
        this.targetNode.setScale(new Vec3(newScale, newScale, 1));
        this.targetNode.getPosition(this._tempVec3);
        this.limitPosition(this._tempVec3, newScale);
        this.targetNode.setPosition(this._tempVec3);

        if (syncSlider) {
            this.syncZoomSlider();
        }
    }

    private syncZoomSlider() {
        if (!this._zoomSlider) return;
        const range = this.maxScale - this.minScale;
        this._zoomSlider.progress = range > 0
            ? Math.max(0, Math.min(1, (this.targetNode.scale.x - this.minScale) / range))
            : 0;
    }

    /** 普通第一关关闭玩家主动缩放和移动，创意关卡不受主线关卡编号限制。 */
    private isTransformFeatureEnabled(): boolean {
        return app.manager.globaldata.getIsSpecialLevel() || app.store.game.getLevel() !== 1;
    }

    /**
     * 边界限制：保留显示2/3
     */
    private limitPosition(pos: Vec3, scale: number) {
        const viewTrans = this.node.getComponent(UITransform);
        const contentTrans = this.targetNode.getComponent(UITransform);
        
        if (!viewTrans || !contentTrans) return;

        this._viewSize = viewTrans.contentSize;
        this._contentSize = contentTrans.contentSize;

        const scaledW = this._contentSize.width * scale;
        const scaledH = this._contentSize.height * scale;

        const limitX = Math.max(scaledW, this._viewSize.width) * 1 / 4;
        if (pos.x > limitX) pos.x = limitX;
        if (pos.x < -limitX) pos.x = -limitX;

        const limitY = Math.max(scaledH, this._viewSize.height) * 1 / 4;
        if (pos.y > limitY) pos.y = limitY;
        if (pos.y < -limitY) pos.y = -limitY;
    }
}
