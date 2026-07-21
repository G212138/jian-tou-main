import { _decorator, Component, Graphics, Node } from 'cc';
import { app } from 'db://assets/app/app';
import { RopeManager } from './RopeManager';
const { ccclass, property } = _decorator;

@ccclass('DianTool')
export class DianTool extends Component {
    onLoad() {
        app.manager.event.on(app.config.eventname.DianTool,this.onDianTool,this);

    }

    onDianTool(gridWidth:number,gridHeight:number,ropeManager:RopeManager) {
        const graphics = this.getComponent(Graphics);
        graphics.clear();
        
        // 获取当前关卡的绳子配置
        const currentLevel = ropeManager['currentLevel'];
        if (!currentLevel || !currentLevel.ropes) {
            console.warn('DianTool: 没有找到关卡配置或绳子数据');
            return;
        }
        
        // 创建一个 Set 来存储所有有绳子的格子坐标
        const ropePoints = new Set<string>();
        currentLevel.ropes.forEach(rope => {
            rope.forEach(([gridX, gridY]) => {
                ropePoints.add(`${gridX},${gridY}`);
            });
        });
        
        // 只绘制有绳子的点
        for(let i = 0; i < gridWidth; i++) {
            for(let j = 0; j < gridHeight; j++) {
                // 检查当前格子是否有绳子
                if (!ropePoints.has(`${i},${j}`)) {
                    continue;
                }
                
                // 设置颜色
                graphics.fillColor.set(204, 204, 204, 255);
                graphics.strokeColor.set(204, 204, 204, 255);
                
                // 获取位置并绘制圆形
                const pos = ropeManager.gridToWorldPos(i, j);
                graphics.circle(pos.x, pos.y, 3);
                
                // 填充和描边
                graphics.fill();
                graphics.stroke();
            }
        }
    }
}


