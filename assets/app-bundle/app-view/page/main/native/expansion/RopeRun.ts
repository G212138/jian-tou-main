import { _decorator, color, Color, Component, EventTouch, Graphics, Label, Node, tween, UIOpacity, Vec2, Vec3 } from 'cc';
import { app } from 'db://assets/app/app';
import { RopeManager } from './RopeManager';
const { ccclass, property } = _decorator;

interface IRopeRunConfig {
    ropeArrays: [number, number][];
}

@ccclass('RopeRun')
export class RopeRun extends Component {

    public ropeColor: string = "#111433";

    private _currentStep: number = 100;

    public ropeManager: RopeManager = null;

    public screenSize: Vec2 = new Vec2(0,0);

    private runOutTool: IRopeRunConfig = {
        ropeArrays: [],
    };

    private isRunning: boolean = false;

    private runSpeed: number = 0.01;

    // 正常移出倍率：1 为原速度，1.5 表示提升 50%。
    private runSpeedMultiplier: number = 2;

    private runStepAccumulator: number = 0;

    private runSpeedError: number = 0.01;

    //插针1个值
    private chazhenTimes: number = 2;

    //记录当前绳子是否已经失败了，如果是的话，重复失败不记录
    private isFail: boolean = false;

    start() {
        app.manager.event.on('ROPE_RUN', this.onRopeRun, this);
       
        app.manager.event.on(app.config.eventname.beiZhuangJiShark, this.onBeiZhuangJiShark, this);

        app.manager.event.on(app.config.eventname.colorArrowChange, this.onChangeRopeColor, this);
    }

    // 存储当前正在执行的tween动画实例
    private currentTween: any = null;

    onDestroy() {
        app.manager.event.off('ROPE_RUN', this.onRopeRun, this);
        // 停止当前正在执行的tween动画
        if (this.currentTween) {
            this.currentTween.stop();
            this.currentTween = null;
        }
        
        app.manager.event.off(app.config.eventname.beiZhuangJiShark, this.onBeiZhuangJiShark, this);
    }   


    public getRopeConfig(){
        return this.runOutTool.ropeArrays;
    }

    public setRopeConfig(ropeConfig: [number, number][]){
        this.runOutTool.ropeArrays = ropeConfig;
    }

    //id: number, ropeConfig: [number, number][]
    onRopeRun(gridPos: Vec2) {
        //判断坐标在不在自己绳子上
        if(!this.checkisThisRope(gridPos)){
            return;
        }
        
        if(this.isRunning){
            return;
        }
        //多重判断，可以去掉
        if(this.ropeManager.sheqiTouch){
            return;
        }

        this.unscheduleAllCallbacks();

        if(app.manager.globaldata.getDaoJuHammerUse()){
            //使用道具2，不检查是否能移动
            app.manager.event.emit(app.config.eventname.DaoJuHammerUseOver);
            this.qiaoSuiRope();
            this.clearRopeCells(this.runOutTool.ropeArrays);
            //记录一下当前关卡已经逃逸了多少个绳子
            app.manager.globaldata.addEscapeRopeCount(1);
            //判断是否胜利
            if(app.manager.globaldata.getEscapeRopeCount() === app.manager.globaldata.getRopeCount()){
                //延迟一会胜利
                setTimeout(() => {
                    app.manager.sound.playEffect({name:'effect/success'});
                    app.manager.vibrate.playVibrate();
                    app.manager.ui.show({name:"PopResult",data:{SuccessDialog:true}});
                }, 500);
            }
            return;
        }

        const res = this.ropeManager.checkRunable(this.runOutTool.ropeArrays);
        if(res != null){
            //TODO 碰撞回弹 
            //不能移动，做红色修改
            app.manager.event.emit(app.config.eventname.beiZhuangJiShark,res);
            this.doRunError(res);
            return;
        }

        this.clearRopeCells(this.runOutTool.ropeArrays);
        app.manager.vibrate.playVibrateShort();
        //播放钢琴音效
        app.manager.event.emit(app.config.eventname.playPianoSound);
        
        this.isRunning = true;
        this.runStepAccumulator = 0;
        // 通过每帧累计移动步数突破帧率对极短 schedule 间隔的限制。
        this.schedule(
            this.moveRunOutBySpeed.bind(this, this.runOutTool),
            this.runSpeed,
            this._currentStep
        );
        //记录一下当前关卡已经逃逸了多少个绳子
        app.manager.globaldata.addEscapeRopeCount(1);
        //判断是否胜利
        if(app.manager.globaldata.getEscapeRopeCount() === app.manager.globaldata.getRopeCount()){
            //延迟一会胜利
            setTimeout(() => {
                app.manager.sound.playEffect({name:'effect/success'});
                app.manager.vibrate.playVibrate();
                app.manager.ui.show({name:"PopResult",data:{SuccessDialog:true}});
                //引导结束
                if(app.manager.globaldata.getNeedGuideOne() && app.store.game.getLevel() === 1){
                    app.manager.globaldata.setNeedGuideOne(false);
                    app.manager.event.emit(app.config.eventname.guideOneEnd);
                }else if(app.manager.globaldata.getNeedGuideTwo() && app.store.game.getLevel() === 2){
                    app.manager.globaldata.setNeedGuideTwo(false);
                    app.manager.event.emit(app.config.eventname.guideTwoEnd);
                }
                

            }, 500);
        }

        //如果存在引导
        if(app.manager.globaldata.getNeedGuideOne()){
            //移动新手引导一到指定位置
            // 检查是否还有引导位置
            if (this.ropeManager.GuidePosList.length === 0) {
                return;
            }
            const pos = this.ropeManager.GuidePosList.pop();
            app.manager.event.emit(app.config.eventname.guideOneMove, this.ropeManager.gridToWorldPos(pos[0],pos[1]));
        }

    }

    private checkisThisRope(gridPos: Vec2){
        for(let i = 0; i < this.runOutTool.ropeArrays.length; i++){
            const rope = this.runOutTool.ropeArrays[i];
            if(rope[0] === gridPos.x && rope[1] === gridPos.y){
                //在绳子上
                return true;
            }
        }
        return false;
    }

    /** 按倍率累计移动更新；1.5 倍速时按 1、2、1、2 次交替刷新。 */
    private moveRunOutBySpeed(ropeConfig: IRopeRunConfig) {
        this.runStepAccumulator += this.runSpeedMultiplier;
        const updateCount = Math.floor(this.runStepAccumulator);
        this.runStepAccumulator -= updateCount;

        for (let i = 0; i < updateCount; i++) {
            if (this._currentStep <= 0) {
                this.unscheduleAllCallbacks();
                this.node.destroy();
                return;
            }
            this.moveRunOut(ropeConfig);
        }
    }

    // 出逃
    private moveRunOut(ropeConfig: IRopeRunConfig) {
        if (this._currentStep <= 0) {
            this.node.destroy();
            return;
        }
        // 假设路径中至少有两个节点来确定方向
        if (ropeConfig.ropeArrays.length < 2) {
            return;
        }
        
        const firstNode = ropeConfig.ropeArrays[ropeConfig.ropeArrays.length - 1];
        const secondNode = ropeConfig.ropeArrays[ropeConfig.ropeArrays.length - 2];
        
        // 计算方向向量
        const dirX = firstNode[0] - secondNode[0];
        const dirY = firstNode[1] - secondNode[1];
        
        // console.log(`RopeManager: 计算方向向量 - X: ${dirX}, Y: ${dirY}`);
        
        // 如果方向向量为0，则不需要移动
        if (dirX === 0 && dirY === 0) {
            return;
        }
        
        // 查找对应的绳子节点
        let ropeNode: Node = this.node;
        
        // 获取Graphics组件（用于动画）
        if (ropeNode) {
            const graphics = ropeNode.getComponent(Graphics);
            if (graphics) {
                // 计算新的路径节点：所有节点都按照自己的方向移动出去
                // 按照绳子方向，每个节点都向前移动一个格子大小的距离；根据插针值判断是否前进
                this.chazhenTimes--;
                //newPathNodes是下一步要达到的格子，如果chazhen次数走到0，才进行替换runouttool
                const newPathNodes:any[] = [];
                for (let i = 1; i < ropeConfig.ropeArrays.length; i++) {
                    const node = ropeConfig.ropeArrays[i];
                    newPathNodes.push(node);
                }
                newPathNodes.push([firstNode[0] + dirX, firstNode[1] + dirY]);

                const currentPathNodes: any[] = [];

                for (let j = 0; j < ropeConfig.ropeArrays.length; j++) {
                        const [oldX, oldY] = ropeConfig.ropeArrays[j];
                        const [newX, newY] = newPathNodes[j];
                        if(j === ropeConfig.ropeArrays.length - 1){
                            //最后一个节点，插针值需要根据chazhentimes影响
                            if(this.chazhenTimes == 1){
                                //第一次，只能前进0.25
                                // 线性插值
                                const x1 = oldX + (newX - oldX) * 0.5;
                                const y1 = oldY + (newY - oldY) * 0.5;
                                currentPathNodes.push(this.ropeManager.gridToWorldPos(x1, y1));
                                continue;
                            }
                        }
                        if (j === 0) {
                            //根据插针值进行判断是否需要前进
                            if(this.chazhenTimes == 0){
                                currentPathNodes.push(this.ropeManager.gridToWorldPos(newX, newY));
                                continue;
                            }
                        }

                         // 线性插值
                        const x2 = oldX + (newX - oldX) * 0.5;
                        const y2 = oldY + (newY - oldY) * 0.5;
                        currentPathNodes.push(this.ropeManager.gridToWorldPos(x2, y2));

                        currentPathNodes.push(this.ropeManager.gridToWorldPos(newX, newY));
                    }
                if(this.chazhenTimes == 0){
                   //前进一格
                    this.runOutTool.ropeArrays = newPathNodes;
                    //重置为2
                    this.chazhenTimes = 2;
                }
                
                // 清除画布
                graphics.clear();

                graphics.lineWidth = this.ropeManager.ropeThickness;
                
                // 绘制当前帧的绳子路径
                graphics.moveTo(currentPathNodes[0].x, currentPathNodes[0].y);
                for (let i = 1; i < currentPathNodes.length; i++) {
                    graphics.lineTo(currentPathNodes[i].x, currentPathNodes[i].y);
                }
                    
                // 设置样式
                graphics.lineCap = Graphics.LineCap.ROUND;
                graphics.lineJoin = Graphics.LineJoin.ROUND;
                graphics.strokeColor = new Color(this.ropeColor);
                graphics.stroke();
                // 绘制箭头
                this.drawArrow(graphics, ropeConfig.ropeArrays ,graphics.strokeColor,false,currentPathNodes[currentPathNodes.length - 1]);

                //判断最后一个元素的横坐标和纵坐标是否超出size
                if(Math.abs(currentPathNodes[currentPathNodes.length - 1].x) > this.screenSize.x *2 ||
                    Math.abs(currentPathNodes[currentPathNodes.length - 1].y) > this.screenSize.y * 2 ){
                    this._currentStep = 0
                }
                this._currentStep--;
            }
        }
    }

    // 清除绳子占用的格子
    private clearRopeCells(ropeConfig: [number, number][]) {
        const gridArray = app.manager.globaldata.getGridArray();
        for (let i = 0; i < ropeConfig.length; i++) {
            const [gridX, gridY] = ropeConfig[i];
            gridArray[gridY][gridX] = false;
        }
    }

    //绘制箭头
    private drawArrow(graphics: Graphics, ropeConfig: [number, number][],color:Color,doubleDraw:boolean = false,WorldstartPos:Vec2 = null) {
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
            else if (dirGridX === 0 && dirGridY === -1) angle = 0; // 下（0°）→ 箭头朝下（修正方向）
            else if (dirGridX === 0 && dirGridY === 1) angle = Math.PI; // 上（180°）→ 箭头朝上（修正方向）
            else if (dirGridX === 1 && dirGridY === 1) angle = Math.PI / 4; // 右上（45°）→ 箭头朝右上
            else if (dirGridX === 1 && dirGridY === -1) angle = 3 * Math.PI / 4; // 右下（135°）→ 箭头朝右下
            else if (dirGridX === -1 && dirGridY === -1) angle = -3 * Math.PI / 4; // 左下（-135°）→ 箭头朝左下
            else if (dirGridX === -1 && dirGridY === 1) angle = -Math.PI / 4; // 左上（-45°）→ 箭头朝左上
        }
        
        // 临时移动原点到箭头位置
        if(WorldstartPos == null){
            WorldstartPos = this.ropeManager.gridToWorldPos(ropeConfig[ropeConfig.length - 1][0], ropeConfig[ropeConfig.length - 1][1]);
        }
        // const startPos = this.ropeManager.gridToWorldPos(ropeConfig[ropeConfig.length - 1][0], ropeConfig[ropeConfig.length - 1][1]);
        const startPos = WorldstartPos;
        // 绘制箭头（三角形+中心线）
        graphics.moveTo(startPos.x, startPos.y);
        
        // 优化的正三角形三个顶点（初始方向向上）
        let height = this.ropeManager.arrowSize;
        let halfWidth = this.ropeManager.arrowSize / 2;

        if(doubleDraw){
            height *= 1.5;
            halfWidth *= 1.5;
        }
        
        // 计算三角形三个顶点（相对于起点）
        const top = { x: startPos.x, y: startPos.y + height / 2 };
        const left = { x: startPos.x - halfWidth, y: startPos.y - height / 2 };
        const right = { x: startPos.x + halfWidth, y: startPos.y - height / 2 };
        
        // 旋转顶点
        const rotatedTop = this.ropeManager.rotatePoint(top, startPos.x, startPos.y, angle);
        const rotatedLeft = this.ropeManager.rotatePoint(left, startPos.x, startPos.y, angle);
        const rotatedRight = this.ropeManager.rotatePoint(right, startPos.x, startPos.y, angle);
        
        // 绘制旋转后的三角形
        graphics.moveTo(rotatedTop.x, rotatedTop.y);
        graphics.lineTo(rotatedLeft.x, rotatedLeft.y);
        graphics.lineTo(rotatedRight.x, rotatedRight.y);
        graphics.close();

        // 设置箭头的绘制参数
        graphics.lineWidth = this.ropeManager.arrowLineWidth;

        graphics.strokeColor = color;
        graphics.fillColor = color;  
        
        // 填充箭头
        graphics.fill();
        // 描边箭头轮廓
        graphics.stroke();
        
        // console.log(`RopeManager: 箭头绘制完成`);
    }

    // 现在是画绿色箭头有用到这个东西 
    public reDrawRope(ropeConfig: [number, number][],color:Color,doubleDraw:boolean = false) {
        const graphics = this.node.getComponent(Graphics);
        if (graphics) {

            const worldPoints: Vec2[] = [];
            ropeConfig.forEach(([gridX, gridY]) => {
                const worldPos = this.ropeManager.gridToWorldPos(gridX, gridY);
                worldPoints.push(worldPos);
            });
            graphics.clear();
            // 清除画布

            graphics.lineWidth = this.ropeManager.ropeThickness;
            if(doubleDraw){
                graphics.lineWidth = this.ropeManager.ropeThickness * 1.5;
            }
            
            // 绘制当前帧的绳子路径
            graphics.moveTo(worldPoints[0].x, worldPoints[0].y);
            for (let i = 1; i < worldPoints.length; i++) {
                graphics.lineTo(worldPoints[i].x, worldPoints[i].y);
            }
                    
            // 设置样式
            graphics.lineCap = Graphics.LineCap.ROUND;
            graphics.lineJoin = Graphics.LineJoin.ROUND;
            graphics.strokeColor = color;
            graphics.fillColor = color;  
            graphics.stroke();
            // 绘制箭头
            this.drawArrow(graphics, ropeConfig,color,doubleDraw);
        }
    }

    public qiaoSuiRope(){
        this.node.getComponent(Graphics).clear();
        app.manager.sound.playEffect({name:'effect/qiaoSui'});
        //震动一下
        app.manager.vibrate.playVibrate();
        //遍历子节点
        for(let i = 0; i < this.runOutTool.ropeArrays.length;i++){
            const ropeArray = this.runOutTool.ropeArrays[i];
            const worldPos = this.ropeManager.gridToWorldPos(ropeArray[0], ropeArray[1]);
            //创建一个ceil节点
            const ceilNode = app.manager.globaldata.getCeilNode();
            ceilNode.setPosition(new Vec3(worldPos.x, worldPos.y, 1));
            this.node.addChild(ceilNode);
           
            ceilNode.getComponent(Label).color = Color.BLACK;
            //50%概率
            if(Math.random() > 0.5){
                ceilNode.getComponent(Label).string = '|';
            }else{
                ceilNode.getComponent(Label).string = '—';
            }

            // 生成随机水平偏移量 (-150到150之间的随机数)
            const randomXOffset = (Math.random() - 0.5) * 300;
            
            // 创建抛物线掉落效果
            tween(ceilNode)
                // 第一阶段：轻微向上并向一侧移动（爆炸效果的开始）
                .to(0.1, { position: new Vec3(ceilNode.position.x + randomXOffset * 0.3, ceilNode.position.y + 50, 0) })
                // 第二阶段：抛物线下落，水平位移增加
                .to(0.7, { position: new Vec3(ceilNode.position.x + randomXOffset, -800, 0) })
                // 完成后清空文本
                .call(() => {
                    ceilNode.getComponent(Label).string = '';
                    app.manager.globaldata.returnCeilNode(ceilNode);
                    ceilNode.removeFromParent();
                    this.node.destroy();
                })
                .start();
        }
       
    }

    public doRunError(target: [number, number]){

        let firstDoBack:boolean = true;
        let chazhenTimes:number = 2;
        const graphics = this.getComponent(Graphics);
        if (!graphics) return 
        const firstNode = this.runOutTool.ropeArrays[this.runOutTool.ropeArrays.length - 1];
        //判断firstNode距离target的距离
        let distance = Math.abs(firstNode[0] - target[0]) + Math.abs(firstNode[1] - target[1]);

        let tempArray:IRopeRunConfig = {
            ropeArrays: [...this.runOutTool.ropeArrays],
        };

        //记录一下回退的步骤
        const backStep:any[] = [];
        const startPos = [];
        for(let j = 0; j < tempArray.ropeArrays.length; j++){
            const pos = tempArray.ropeArrays[j];
            startPos.push(this.ropeManager.gridToWorldPos(pos[0], pos[1]));
        }

        backStep.push(startPos);

        //靠了，画箭头需要index坐标，不是世界坐标
        const backStepIndex: any[] = []
        backStepIndex.push(tempArray.ropeArrays);
        
        //前进方向
        const doRunBlack = ()=>{
            chazhenTimes--;
            const firstNode = tempArray.ropeArrays[tempArray.ropeArrays.length - 1];
            const secondNode = tempArray.ropeArrays[tempArray.ropeArrays.length - 2];

              // 计算方向向量
            const dirX = firstNode[0] - secondNode[0];
            const dirY = firstNode[1] - secondNode[1];
        
            // 如果方向向量为0，则不需要移动
            if (dirX === 0 && dirY === 0) {
                return;
            }

            const newPathNodes:any[] = [];
            for (let i = 1; i < tempArray.ropeArrays.length; i++) {
                const node = tempArray.ropeArrays[i];
                newPathNodes.push(node);
            }
            newPathNodes.push([firstNode[0] + dirX, firstNode[1] + dirY]);

            const currentPathNodes: any[] = [];

            for (let j = 0; j < tempArray.ropeArrays.length; j++) {
                const [oldX, oldY] = tempArray.ropeArrays[j];
                const [newX, newY] = newPathNodes[j];

                if(j === tempArray.ropeArrays.length - 1){
                    //最后一个节点，插针值需要根据chazhentimes影响
                    if(chazhenTimes == 1){
                        //第一次，只能前进0.25
                        // 线性插值
                        const x1 = oldX + (newX - oldX) * 0.5;
                        const y1 = oldY + (newY - oldY) * 0.5;
                        currentPathNodes.push(this.ropeManager.gridToWorldPos(x1, y1));
                        continue;
                    }
                }
                if (j === 0) {
                    //根据插针值进行判断是否需要前进
                    if(chazhenTimes == 0){
                        currentPathNodes.push(this.ropeManager.gridToWorldPos(newX, newY));
                        continue;
                    }
                }
                // 线性插值
                const x = oldX + (newX - oldX) * 0.5;
                const y = oldY + (newY - oldY) * 0.5;
                currentPathNodes.push(this.ropeManager.gridToWorldPos(x, y));
                currentPathNodes.push(this.ropeManager.gridToWorldPos(newX, newY));
            }
            //记录回退的步骤
            backStep.push(currentPathNodes);
             if(chazhenTimes == 0){
                //前进一格
                tempArray.ropeArrays = newPathNodes;
                //重置为2
                chazhenTimes = 2;
            }

            graphics.clear();
            graphics.lineWidth = this.ropeManager.ropeThickness;
            // 绘制当前帧的绳子路径
            graphics.moveTo(currentPathNodes[0].x, currentPathNodes[0].y);
            for (let i = 1; i < currentPathNodes.length; i++) {
                graphics.lineTo(currentPathNodes[i].x, currentPathNodes[i].y);
            } 
            // 设置样式
            graphics.lineCap = Graphics.LineCap.ROUND;
            graphics.lineJoin = Graphics.LineJoin.ROUND;
            //彩色箭头侵入
            graphics.strokeColor = new Color(this.ropeColor);
            graphics.stroke();
            // 绘制箭头
            // console.log('tempArray.ropeArrays',tempArray.ropeArrays);
            this.drawArrow(graphics, tempArray.ropeArrays,graphics.strokeColor,false,currentPathNodes[currentPathNodes.length - 1]);
        }

        //倒退方向
        const doRunRed = ()=>{

             // 第一帧触发错误
             if(firstDoBack){

                if(!this.isFail){
                    app.manager.event.emit(app.config.eventname.gameHeartJian);
                    this.isFail = true;
                }                
                //触发红色闪烁
                app.manager.event.emit(app.config.eventname.errorFlash);
                app.manager.sound.playEffect({name:'effect/error'});
                //震动一下
                app.manager.vibrate.playVibrateHeavy();
             }

             firstDoBack = false;

            if(backStep.length === 0) {
                return;
            }
            const currentPathNodes = backStep.pop();
            // console.log('currentPathNodes',currentPathNodes);
            //回退的index坐标
            const currentPathNodesIndex = backStepIndex[0];
            
            graphics.clear();
            graphics.lineWidth = this.ropeManager.ropeThickness;
            // 绘制当前帧的绳子路径
            graphics.moveTo(currentPathNodes[0].x, currentPathNodes[0].y);
            for (let i = 1; i < currentPathNodes.length; i++) {
                graphics.lineTo(currentPathNodes[i].x, currentPathNodes[i].y);
            } 
            // 设置样式
            graphics.lineCap = Graphics.LineCap.ROUND;
            graphics.lineJoin = Graphics.LineJoin.ROUND;
            //彩色箭头 默认装机之后仍显示红色
            graphics.strokeColor = Color.RED;
            graphics.stroke();
            // 绘制箭头
            this.drawArrow(graphics, currentPathNodesIndex,Color.RED,false,currentPathNodes[currentPathNodes.length - 1]);
        }
        

         this.schedule(
            doRunBlack.bind(this),
            this.runSpeedError, 
            distance*2-1
        );
        // 计算schedule完全结束所需的时间：(repeat次数) * 间隔时间
        // 当repeat为distance-1时，总共有distance次执行，间隔次数为distance-1次
        this.schedule(doRunRed.bind(this),this.runSpeedError,distance*2, (distance*2+1) * this.runSpeedError);
    }

    private onBeiZhuangJiShark(res:any){
        if(res != null){
            //先判断res是不是我的节点
            for(let i = 0;i<this.runOutTool.ropeArrays.length;i++){
                if(this.runOutTool.ropeArrays[i][0] == res[0] && this.runOutTool.ropeArrays[i][1] == res[1]){
                    //说明是我的节点
                    //触发红色闪烁
                    const graphics = this.getComponent(Graphics);
                     this.tweenColor(graphics, new Color(this.ropeColor), this.RED, 0.5) // 黑→红（1.5秒）
                        .then(() => {
                            this.tweenColor(graphics, this.RED, new Color(this.ropeColor), 0.5); // 红→黑（1.5秒）
                        })  
                    
                    return;
                }
            }
        }
       
    }

    // 定义颜色状态
    private readonly RED = new Color(200, 0, 0);   // 中间颜色：红色
    private currentColor: Color = new Color();     // 当前颜色缓存
    // 颜色插值过渡方法
    private tweenColor(graphics: Graphics, from: Color, to: Color, duration: number) {
        const self = this;
        return new Promise<void>((resolve) => {
            // 检查组件是否已被销毁
            if (!this.node || this.node.isValid === false) {
                resolve();
                return;
            }

            // 初始化起始颜色
            this.currentColor.set(from);
            graphics.fillColor = this.currentColor;
            graphics.fill();

            // 停止之前的动画
            if (this.currentTween) {
                this.currentTween.stop();
            }

            // 缓动插值颜色通道
            this.currentTween = tween(this.currentColor)
                .to(duration, {
                    r: to.r,
                    g: to.g,
                    b: to.b
                }, {
                    easing: 'smooth', // 平滑过渡
                    onUpdate: () => {
                        // 检查组件和graphics是否有效
                        if (!self.node || self.node.isValid === false || !graphics || !graphics.node || !graphics.node.isValid) {
                            if (self.currentTween) {
                                self.currentTween.stop();
                                self.currentTween = null;
                            }
                            return;
                        }
                        
                        // 实时更新颜色并重新绘制
                        try {
                            graphics.fillColor = self.currentColor;
                            graphics.clear(); // 清除画布
                            if (self.runOutTool && self.runOutTool.ropeArrays) {
                                self.reDrawRope(self.runOutTool.ropeArrays, self.currentColor);
                            }
                            graphics.fill(); // 填充新颜色
                        } catch (err) {
                            console.log('Color tween update error:', err);
                            if (self.currentTween) {
                                self.currentTween.stop();
                                self.currentTween = null;
                            }
                        }
                    },
                    onComplete: () => {
                        // 检查组件是否有效
                        if (!self.node || self.node.isValid === false) {
                            if (self.currentTween) {
                                self.currentTween = null;
                            }
                            resolve();
                            return;
                        }
                        
                        self.currentTween = null;
                        resolve(); // 过渡完成，执行下一步
                    }
                })
                .start();
        });
    }


    private onChangeRopeColor(){

         //判断是不是彩色
        const isColorful = app.manager.globaldata.getIsColorArrow();
        if(isColorful){
            //从default中随机取一个
            this.ropeColor = this.ropeManager.defaultColorList[Math.floor(Math.random()*this.ropeManager.defaultColorList.length)];
        }else{
            //全局定义一个默认值吧后面
            this.ropeColor = "#111433";
        }

        this.reDrawRope(this.runOutTool.ropeArrays, new Color(this.ropeColor));
        
    }
}


