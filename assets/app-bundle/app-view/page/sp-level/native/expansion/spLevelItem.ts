import { _decorator, Color, Component, Graphics, Label, Node, Sprite, SpriteFrame, UITransform, Vec2 } from 'cc';
import { LevelStatus } from '../PageSpLevel';
import { app } from 'db://assets/app/app';
import { adManager } from 'db://assets/app/tiktok.ads';
import { PageMain } from '../../../main/native/PageMain';
const { ccclass, property } = _decorator;

@ccclass('spLevelItem')
export class spLevelItem extends Component {

    //三种状态的spriteFrame
    @property({type: SpriteFrame})
    unlockSpriteFrame: SpriteFrame = null;
    @property({type: SpriteFrame})
    completeSpriteFrame: SpriteFrame = null;
    @property({type: SpriteFrame})
    challengeSpriteFrame: SpriteFrame = null;

    @property({type: Node})
    graphicsNode: Node = null;

    @property({type: Label})
    levelName: Label = null;

    private _index: number = 0;
    private _levelName: string = "";
    private _status: number = 0;
    private _levelConfig: any = null;

    

    private gridWidth: number = 30;

    private gridHeight: number = 50;

    private cellPixelSize: number = 0;

    private ropeThickness: number = 4;
    private arrowSize: number = 6;
    private arrowLineWidth: number = 1;

    private isColorful: boolean = false;

    private strokeColor: string = '#114113';

    private colors:string[] = ["#1ba784", "#ed5126", "#2A52BE", "#96c24e", "#f9595c", "#fc8c23", "#4A7856", "#C77DFF", "#577590", "#F9C74F", "#43AA8B", "#E63946", "#4CC9F0", "#194B96", "#FFD166", "#7209B7", "#F72585"]
        
    start() {
        this.node.on(Node.EventType.TOUCH_END, this.onLevelItemClick, this);
    }

    //设置关卡信息
    setLevelInfo(index: number, name: string, status: number, levelConfig: any) {
        this._index = index;
        this._levelName = name;
        this._status = status;
        this._levelConfig = levelConfig;
        //设置关卡名字
        this.levelName.string = this._levelName;
        this.updateLevelStatus(status);
        this.drawArrow();
    }

    onLevelItemClick() {
       //根据状态，来做不同的变化
       if (this._status == LevelStatus.Unlock) {
           // 未解锁状态，点击后跳转挑战界面
           // TODO 看激励视频
           adManager.showRewardedVideoAd({
            onClose: (success) => {
                if (success) {
                    // 激励视频播放成功，更新关卡状态为已完成
                    this.updateLevelStatus(LevelStatus.Challenge);
                    //通知PageSpLevel更新解锁状态
                    app.manager.event.emit(app.config.eventname.UpdateSPLevelStatus, this._index, this._status);
                }else{
                    // 激励视频播放失败，提示用户重新播放
                    app.manager.ui.showToast("激励视频播放失败，请重新播放");
                }
            },
            onError: () => {
                // 激励视频播放失败，提示用户重新播放
                app.manager.ui.showToast("激励视频播放失败，请重新播放");
            }
           });

           
       }else if (this._status == LevelStatus.Complete  || this._status == LevelStatus.Challenge) {
           // 已完成状态，点击后跳转挑战界面
           app.manager.globaldata.setIsSpecialLevel(true);
           app.manager.globaldata.setSpecialConfig(this._levelConfig);
           app.manager.globaldata.setSpecialLevelIndex(this._index);
           app.manager.ui.show<PageMain>({name: 'PageMain', data: {isSpecialLevel: true,name: this._levelName}});
           
       }
    }

    updateLevelStatus(status: LevelStatus) {
        this._status = status;
        //根据状态，来做不同的变化
        if (status == LevelStatus.Unlock) {
            // 未解锁状态，点击后跳转挑战界面
            // TODO 看激励视频
            this.node.getChildByName("status").getComponent(Sprite).spriteFrame = this.unlockSpriteFrame;
        }else if (status == LevelStatus.Complete) {
            // 已完成状态，点击后跳转挑战界面
            this.node.getChildByName("status").getComponent(Sprite).spriteFrame = this.completeSpriteFrame;
            this.node.getChildByName("ad").active = false;
        }else if (status == LevelStatus.Challenge) {
            // 待挑战状态，点击后跳转挑战界面
            this.node.getChildByName("ad").active = false;
            this.node.getChildByName("status").getComponent(Sprite).spriteFrame = this.challengeSpriteFrame;
        }
    }


    //根据状态，来画不同的箭头
    drawArrow() {
        
        if (this._status == LevelStatus.Complete) {

            this.isColorful = true;
        }
        this.gridWidth = this._levelConfig.grid_width;
        this.gridHeight = this._levelConfig.grid_height;
        this.adjustCellSize();
        this.drawAllRopes();


    }

    adjustCellSize() {
        const screenSize = this.graphicsNode.getComponent(UITransform).contentSize;
        
        // 计算最大可容纳的格子尺寸（不超出屏幕）
        const maxCellWidth = screenSize.width / this.gridWidth;
        const maxCellHeight = screenSize.height / this.gridHeight;
        this.cellPixelSize = Math.min(maxCellWidth, maxCellHeight) * 0.9; // 留10%边距
        //画点  TODO

    }

    drawAllRopes() {
        const graphics = this.graphicsNode.getComponent(Graphics);
        // 清空
        graphics.clear();

        if(!this.isColorful){
            //从default中根据_index循环来取，防止索引越界
            this.strokeColor = this.colors[this._index % this.colors.length];
        }
        
        for(let i = 0; i < this._levelConfig.ropes.length; i++){
            const ropeConfig = this._levelConfig.ropes[i];
            //异步执行
            setTimeout(() => {
                this.drawSingleRope(ropeConfig,graphics);
            }, 0);
        }
        
    }
    // 绘制单条绳子（连续线段+起点标记）
    drawSingleRope(ropeConfig: [number, number][],graphics: Graphics) {
        //判断是不是彩色
        
        if(this.isColorful){
            //从default中随机取一个
            this.strokeColor = this.colors[Math.floor(Math.random()*this.colors.length)];
        }
        
        // 转换路径节点为世界坐标
        const worldPoints: Vec2[] = [];
        ropeConfig.forEach(([gridX, gridY]) => {
            const worldPos = this.gridToWorldPos(gridX, gridY);
            worldPoints.push(worldPos);
        });
         
        // 绘制绳子路径和起点箭头（使用同一个Graphics组件）
        this.drawRopePath(graphics, worldPoints, ropeConfig,this.strokeColor);

    }

    // 用 Graphics 绘制绳子路径和起点箭头（连续线段+圆角端点+箭头）
    drawRopePath(graphics: Graphics, points: Vec2[], ropeConfig: [number, number][],strokeColor:string) {
        // 设置箭头的绘制参数
        graphics.lineWidth = this.ropeThickness;
        //把string转为color
        graphics.strokeColor = new Color(strokeColor);
        graphics.fillColor = new Color(strokeColor);
        if (points.length < 2) {
            console.warn('RopeManager: 路径点数量少于2，无法绘制绳子');
            return;
        }
        graphics.moveTo(points[0].x, points[0].y)
        for(let i = 1; i < points.length; i++){
            graphics.lineTo(points[i].x, points[i].y); // 移动到起点
        }
        graphics.stroke();
      
        
        // 第二部分：绘制起点箭头
        // 计算箭头方向（第二个节点 → 第一个节点）
            let angle = 0; // 默认向上（0弧度）
            if (ropeConfig.length >= 2) {
                const [startGridX, startGridY] = ropeConfig[ropeConfig.length - 1]; // 第一个节点（起点）
                const [nextGridX, nextGridY] = ropeConfig[ropeConfig.length - 2]; // 第二个节点
                // 方向向量：从第二个节点指向起点（next → start）
                const dirGridX = startGridX - nextGridX;
                const dirGridY = startGridY - nextGridY;

                // 转换为旋转角度（弧度），箭头朝向起点（与绳子延伸方向相反）
                if (dirGridX === 1 && dirGridY === 0) angle = -Math.PI / 2; // 右（90°）→ 箭头朝右（指向起点）
                else if (dirGridX === -1 && dirGridY === 0) angle = Math.PI / 2; // 左（-90°）→ 箭头朝左
                else if (dirGridX === 0 && dirGridY === -1) angle = 0; // 下（180°）→ 箭头朝下（修正方向）
                else if (dirGridX === 0 && dirGridY === 1) angle = Math.PI; // 上（0°）→ 箭头朝上（修正方向）
                else if (dirGridX === 1 && dirGridY === 1) angle = Math.PI / 4; // 右上（45°）→ 箭头朝右上
                else if (dirGridX === 1 && dirGridY === -1) angle = 3 * Math.PI / 4; // 右下（135°）→ 箭头朝右下
                else if (dirGridX === -1 && dirGridY === -1) angle = -3 * Math.PI / 4; // 左下（-135°）→ 箭头朝左下
                else if (dirGridX === -1 && dirGridY === 1) angle = -Math.PI / 4; // 左上（-45°）→ 箭头朝左上
            }
       
            // 临时移动原点到箭头位置
            const startX = points[points.length - 1].x;
            const startY = points[points.length - 1].y;
            graphics.lineWidth = this.arrowLineWidth;
            // 绘制箭头（三角形+中心线）
            graphics.moveTo(startX, startY);
        
            // 优化的正三角形三个顶点（初始方向向上）
            const height = this.arrowSize;
            const halfWidth = this.arrowSize / 2;
        
            // 计算三角形三个顶点（相对于起点）
            const top = { x: startX, y: startY + height / 2 };
            const left = { x: startX - halfWidth, y: startY - height / 2 };
            const right = { x: startX + halfWidth, y: startY - height / 2 };
        
            // 旋转顶点
            const rotatedTop = this.rotatePoint(top, startX, startY, angle);
            const rotatedLeft = this.rotatePoint(left, startX, startY, angle);
            const rotatedRight = this.rotatePoint(right, startX, startY, angle);
        
            // 绘制旋转后的三角形
            graphics.moveTo(rotatedTop.x, rotatedTop.y);
            graphics.lineTo(rotatedLeft.x, rotatedLeft.y);
            graphics.lineTo(rotatedRight.x, rotatedRight.y);
            graphics.close();
        
            try{
                // 填充箭头
                graphics.fill();
                // 描边箭头轮廓
                graphics.stroke();
            }catch(err){
                // console.log('err',err);
            }   
        
    }

    // 格子坐标 -> 世界坐标（2D 版本，居中显示）
    public gridToWorldPos(gridX: number, gridY: number): Vec2 {
        // console.log(`RopeManager: 转换格子坐标 (${gridX}, ${gridY}) 到世界坐标`);
        // GridContainer 锚点为(0.5,0.5)，中心为原点
        const totalWidth = this.gridWidth * this.cellPixelSize;
        const totalHeight = this.gridHeight * this.cellPixelSize;
        const x = (gridX * this.cellPixelSize + this.cellPixelSize / 2) - totalWidth / 2;
        const y = (gridY * this.cellPixelSize + this.cellPixelSize / 2) - totalHeight / 2;
        //上下反过来
        const worldPos = new Vec2(x, -y);
        // console.log(`RopeManager: 转换结果 - 世界坐标: (${worldPos.x}, ${worldPos.y})`);
        return worldPos;
    }

    // 工具方法：旋转点（围绕中心点旋转指定角度）
    public rotatePoint(point: { x: number; y: number }, centerX: number, centerY: number, angle: number) {
        const dx = point.x - centerX;
        const dy = point.y - centerY;
        // 旋转公式：x' = dx*cosθ - dy*sinθ + cx; y' = dx*sinθ + dy*cosθ + cy
        const x = dx * Math.cos(angle) - dy * Math.sin(angle) + centerX;
        const y = dx * Math.sin(angle) + dy * Math.cos(angle) + centerY;
        return { x, y };
    }
    
}


