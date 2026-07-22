import { _decorator, Component, Node, Graphics, Vec2, Color, Label, Sprite, Layers, UITransform, JsonAsset, EventTouch, Input, instantiate, Prefab, v3, TextAsset, tween, CCFloat, CCString } from 'cc';
import { app } from 'db://assets/app/app';
import { RopeRun } from './RopeRun';
const { ccclass, property } = _decorator;

// 关卡配置接口
interface LevelConfig {
    ropes: [number, number][][];
    grid_width: number;
    grid_height: number;
}


@ccclass('RopeManager')
export class RopeManager extends Component {

    public defaultColorList = ["#1ba784", "#ed5126", "#2A52BE", "#96c24e", "#f9595c", "#fc8c23", "#4A7856", "#C77DFF", "#577590", "#F9C74F", "#43AA8B", "#E63946", "#4CC9F0", "#194B96", "#FFD166", "#7209B7", "#F72585"]
    @property({ type: Node, tooltip: "格子容器（用于定位绳子坐标）" })
    gridContainer: Node = null;

    @property({ type: CCFloat , tooltip: "每个格子的像素尺寸" })
    cellPixelSize: number = 40; // 可根据屏幕大小调整

    @property({ type: CCFloat , tooltip: "绳子粗细（像素）" })
    ropeThickness: number = 6;

    // @property({ type: Prefab, tooltip: "格子预制体（用于绘制绳子路径）" })
    // ceilPrefab: Prefab = null;

    @property({ type: CCFloat , tooltip: "绳子端点圆角半径" })
    ropeCornerRadius: number = 3; // 圆角效果，0 为直角

    // 新增：箭头样式配置（可在编辑器中调整）
    @property({ type: CCFloat , tooltip: "箭头三角形边长（像素）" })
    arrowSize: number = 60;

    @property({ type: CCFloat , tooltip: "箭头线宽度（像素）" })
    arrowLineWidth: number = 2;

    @property({ tooltip: "箭头颜色（默认白色，与黑色绳子区分）" })
    strokeColor: string = "#111433";

    private currentLevel: LevelConfig = null;

    private gridWidth: number = 30;

    private gridHeight: number = 50;
    
    // 新增：存储绳子节点和配置的映射关系
    // public ropeNodesMap: Map<Node, number> = new Map<Node, number>();

    public GuidePosList: [number, number][] = [
        [5,9],[7,9],[8,9],[8,10],[8,11]
    ];

    public sheqiTouch: boolean = false;

    private moveDistance: number = 0;

    private drawGeneration: number = 0;
    private completedDrawCount: number = 0;

    onLoad() {
        //监听restart事件 和 下一关事件
        app.manager.event.on(app.config.eventname.restart, this.start, this);
        app.manager.event.on(app.config.eventname.DaoJuTipUse, this.onDaoJuTipUse, this);

        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    start() {
        console.log('RopeManager: 开始初始化组件');

        // 1. 加载配置文件
        this.loadLevelConfig();

        

    }
    onDestroy() {
        // 移除节点事件监听
        this.node.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
    }

    onTouchStart(event: EventTouch) {
        this.sheqiTouch = false;
        this.moveDistance = 0;
    }

    onTouchMove(event: EventTouch) {
        this.moveDistance += Math.abs(event.getDelta().x) + Math.abs(event.getDelta().y);
        //忽略触摸事件,如果移动距离大于10像素
        if(this.moveDistance > 10){
            this.sheqiTouch = true;
        }
    }
    onTouchEnd(event: EventTouch) {
        if(this.sheqiTouch){
            return;
        }
        this.moveDistance = 0;
        //找到end的点在哪个格子里
        const pos = event.getUILocation();
        //  console.log(`RopeManager: 触摸位置 - 屏幕坐标: (${pos.x}, ${pos.y})`);
        //转为节点坐标
        const worldPos = this.getComponent(UITransform).convertToNodeSpaceAR(v3(pos.x, pos.y, 1));
        // console.log(`RopeManager: 转换结果 - 世界坐标: (${worldPos.x}, ${worldPos.y})`);
        const gridPos = this.worldToGridPos(worldPos.x, worldPos.y);
        // console.log(`RopeManager: 转换结果 - 格子坐标: (${gridPos.x}, ${gridPos.y})`);

        app.manager.event.emit('ROPE_RUN', gridPos);
    }

    // 动态调整格子尺寸，适配屏幕
    adjustCellSize() {
        const screenSize = this.getComponent(UITransform).contentSize;
        console.log(`RopeManager: 当前屏幕尺寸 - 宽: ${screenSize.width}, 高: ${screenSize.height}`);
        // 计算最大可容纳的格子尺寸（不超出屏幕）
        const maxCellWidth = screenSize.width / this.gridWidth;
        const maxCellHeight = screenSize.height / this.gridHeight;
        this.cellPixelSize = Math.min(maxCellWidth, maxCellHeight) * 0.9; // 留10%边距
        app.manager.event.emit(app.config.eventname.DianTool,this.gridWidth,this.gridHeight,this);

        this.ropeThickness = Math.min(Math.max(this.cellPixelSize*0.4,4),14);
        this.arrowSize = this.ropeThickness * 2;

        console.log(`RopeManager: 调整后的格子尺寸为 ${this.cellPixelSize}px`);
        console.log(`RopeManager: 调整后的绳子粗细为 ${this.ropeThickness}px`);
    }

    // 加载关卡配置
    async loadLevelConfig() {
        const self = this;
        //获取当前是第几关
        const currentLevelId = app.store.game.getLevel();
         //创意关卡入侵
        if(app.manager.globaldata.getIsSpecialLevel()){
            this.currentLevel = app.manager.globaldata.getSpecialConfig();
        }else{
           
            console.log(`RopeManager: 当前是第 ${currentLevelId} 关`);
        
            // 从全局配置中获取当前关卡
            const levelConfigString = app.manager.globaldata.getLevelConfig(currentLevelId);
            if (!levelConfigString) {
                console.error(`RopeManager: 未找到关卡 ${currentLevelId}`);
                return;
            }
            const levelConfig = app.manager.globaldata.CreateMapDataByStr(levelConfigString);
            if (!levelConfig) {
                console.error(`RopeManager: 解析关卡 ${currentLevelId} 配置失败`);
                return;
            }
            self.currentLevel = levelConfig as LevelConfig;
        }

        

        self.gridWidth = self.currentLevel.grid_width;
        self.gridHeight = self.currentLevel.grid_height;

        self.adjustCellSize();

        //记录一下当前关卡有多少个绳子
        app.manager.globaldata.setRopeCount(self.currentLevel.ropes.length);
        app.manager.globaldata.setEscapeRopeCount(0);

         //根据关卡配置文件，维护一个二维数组，用于存储每个格子是否被占用
        self.geneArray(self.currentLevel.ropes);
        
        self.drawAllRopes();

        //如果是第一关，需要判断是否需要引导
        if(currentLevelId == 1){
            if(app.manager.globaldata.getNeedGuideOne()){
                //需要引导
                this.showGuideOne();
            }
        }else if(currentLevelId == 2){
            if(app.manager.globaldata.getNeedGuideTwo()){
                //需要引导
                this.showGuideTwo();
            }
        }
       
    }

    // 生成一个二维数组，用于存储每个格子是否被占用
    geneArray(ropes: [number, number][][]) {
        const array: boolean[][] = [];
        for (let i = 0; i < this.gridHeight; i++) {
            array.push([]);
            for (let j = 0; j < this.gridWidth; j++) {
                array[i].push(false);
            }
        }
        // 遍历所有绳子，标记占用的格子
        ropes.forEach((rope,index) => {
            rope.forEach(([gridX, gridY]) => {
                array[gridY][gridX] = true;
            });
        });
        console.log(`RopeManager: 生成的占用格子数组为`,array);
        app.manager.globaldata.setGridArray(array);
    }

    // 绘制当前关卡所有绳子
    drawAllRopes() {
        if (!this.currentLevel) {
            console.warn('RopeManager: 当前没有选中的关卡，跳过绘制');
            return;
        }

        const drawGeneration = ++this.drawGeneration;
        this.completedDrawCount = 0;
        app.manager.globaldata.setAlreadyDrawRopeCount(0);

        // 清空格子容器（删除之前绘制的所有绳子）
        this.gridContainer.destroyAllChildren();
        // 清空映射表
        // this.ropeNodesMap.clear();
         
        for(let i = 0; i < this.currentLevel.ropes.length; i++){
            const ropeConfig = this.currentLevel.ropes[i];
            //异步执行
            setTimeout(() => {
                if (drawGeneration !== this.drawGeneration) return;
                this.drawSingleRope(ropeConfig, i, drawGeneration);
            }, Math.random()*1000);


        }
        
        
    }

    // 绘制单条绳子（连续线段+起点标记）
    drawSingleRope(ropeConfig: [number, number][], index: number, drawGeneration: number) {
        //判断是不是彩色
        const isColorful = app.manager.globaldata.getIsColorArrow();
        if(isColorful){
            //从default中随机取一个
            this.strokeColor = this.defaultColorList[Math.floor(Math.random()*this.defaultColorList.length)];
        }else{
            this.strokeColor ="#111433";
        }

        // 创建绳子节点
        const ropeNode = new Node(`Rope_${index}`);
        ropeNode.layer = Layers.Enum.UI_2D;
        ropeNode.parent = this.gridContainer;
        ropeNode.addComponent(UITransform);
        ropeNode.getComponent(UITransform).setContentSize(0,0);

        const ropeRun = ropeNode.addComponent(RopeRun);

        ropeRun.ropeManager = this;
        ropeRun.setRopeConfig(ropeConfig);
        ropeRun.screenSize = new Vec2(this.getComponent(UITransform).contentSize.width,this.getComponent(UITransform).contentSize.height);
        ropeRun.ropeColor = this.strokeColor;
        // 添加Graphics组件
        const graphics = ropeNode.addComponent(Graphics);
        graphics.strokeColor = new Color(this.strokeColor);
        graphics.lineWidth = this.ropeThickness;
        
        // 转换路径节点为世界坐标
        const worldPoints: Vec2[] = [];
        ropeConfig.forEach(([gridX, gridY]) => {
            const worldPos = this.gridToWorldPos(gridX, gridY);
            worldPoints.push(worldPos);
        });
         
        // 绘制绳子路径和起点箭头（使用同一个Graphics组件）
        this.drawRopePath(graphics, worldPoints, ropeNode, ropeConfig, index, this.strokeColor, drawGeneration);
        

    }

    // 用 Graphics 绘制绳子路径和起点箭头（连续线段+圆角端点+箭头）
    drawRopePath(graphics: Graphics, points: Vec2[], ropeNode: Node, ropeConfig: [number, number][], index: number, strokeColor: string, drawGeneration: number) {
        const self = this;
        if (points.length < 2) {
            console.warn('RopeManager: 路径点数量少于2，无法绘制绳子');
            return;
        }

        graphics.clear(); // 清空画布
        // console.log(`RopeManager: 清空画布，开始绘制路径`);
        
        let currentIndex = 1; // 当前绘制到的点索引
        // 第一部分：绘制绳子路径
        graphics.moveTo(points[0].x, points[0].y); // 移动到起点
        graphics.lineCap = Graphics.LineCap.ROUND; // 端点圆角
        graphics.lineJoin = Graphics.LineJoin.ROUND; // 转角圆角
         
        // 逐帧绘制（每帧画一个线段）
        const drawStep = () => {
                if (currentIndex >= points.length) {
                    // 绘制完成，停止调度
                    graphics.unschedule(drawStep);
                    if (drawGeneration !== self.drawGeneration) return;

                    // 绘制箭头
                    drawArrow();

                    self.completedDrawCount++;
                    app.manager.globaldata.setAlreadyDrawRopeCount(self.completedDrawCount);

                    // 最新批次的全部箭头绘制完成后再开始倒计时。
                    if (self.completedDrawCount >= self.currentLevel.ropes.length) {
                        app.manager.event.emit(app.config.eventname.startGameDaoJiShi);
                    }
                return;
                }

                // 同步绘制当前线段（保证顺序）
                 graphics.lineTo(points[currentIndex].x, points[currentIndex].y);
                graphics.stroke(); // 提交绘制（可选：也可最后统一stroke）
        
                currentIndex++;
            };

            // 启动逐帧绘制（每50ms画一段，和原setTimeout间隔一致）
        graphics.schedule(drawStep, 50 / 1000); // schedule的间隔单位是秒

        // // 绘制线段：连接所有路径节点
        // for (let i = 1; i < points.length; i++) {
        //     setTimeout(() => {
        //         graphics.lineTo(points[i].x, points[i].y);
               

        //         // console.log(`RopeManager: 设置绳子端点样式为圆角`);

        //         graphics.strokeColor = new Color(strokeColor);

        //         try{
        //             graphics.stroke();
        //         }catch(err){
        //             // console.log('err',err);
        //         }
        //     }, 50*i);
            
        // }
        // 第二部分：绘制起点箭头
        const drawArrow = () => {
            // 设置箭头的绘制参数
            graphics.lineWidth = this.arrowLineWidth;
            //把string转为color
            graphics.strokeColor = new Color(strokeColor);
            graphics.fillColor = new Color(strokeColor);
        
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

    // 世界坐标 -> 格子坐标（2D 版本，居中显示）
    public worldToGridPos(worldX: number, worldY: number): Vec2 {
        // console.log(`RopeManager: 转换世界坐标 (${worldX}, ${worldY}) 到格子坐标`);
        // GridContainer 锚点为(0.5,0.5)，中心为原点
        const totalWidth = this.gridWidth * this.cellPixelSize;
        const totalHeight = this.gridHeight * this.cellPixelSize;
        // 基于gridToWorldPos的逆运算，考虑格子中心偏移
        const gridX = Math.floor((worldX + totalWidth / 2) / this.cellPixelSize );
        const gridY = Math.floor((-worldY + totalHeight / 2) / this.cellPixelSize);
        // console.log(`RopeManager: 转换结果 - 格子坐标: (${gridX}, ${gridY})`);
        return new Vec2(gridX, gridY);
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


    // 绳子点击处理函数
    private onRopeClick(ropeConfig: [number, number][],index:number) {
        console.log(`RopeManager: 点击绳子索引 ${index}`);
        app.manager.event.emit('ROPE_RUN', index);
    }

    

    //展示一个可以出逃的绳子
    private onDaoJuTipUse() {
        
        //遍历子节点
        const children = this.node.children;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const ropeRun = child.getComponent(RopeRun);
            if(ropeRun){
                const ropeConfig = ropeRun.getRopeConfig();
                if(ropeConfig.length < 2){
                    continue;
                }
                const checkRes = this.checkRunable(ropeConfig);
                if(checkRes == null){
                    // 使用tween实现无限闪烁效果
                    tween(ropeRun)
                            .delay(0)
                            .call(() => {
                                ropeRun.reDrawRope(ropeConfig, Color.GREEN,true);
                            })
                            .delay(0.5)  // 200ms绿色
                            .call(() => {
                                ropeRun.reDrawRope(ropeConfig, Color.BLACK);
                            })
                            .delay(0.5)  // 200ms黑色
                            .call(() => {
                                ropeRun.reDrawRope(ropeConfig, Color.GREEN,true);
                            })
                            .start();
                    return;                 
                }
            }
        }
    }

    // 检查绳子是否可以成功跑出去
    public checkRunable(ropeConfig: [number, number][]):[number,number] {
        const gridArray = app.manager.globaldata.getGridArray();
        const [startGridX, startGridY] = ropeConfig[ropeConfig.length - 1];
        // 判断箭头方向
        // 假设路径中至少有两个节点来确定方向
        if (ropeConfig.length < 2) {
            return null;
        }
        const firstNode = ropeConfig[ropeConfig.length - 1];
        const secondNode = ropeConfig[ropeConfig.length - 2];
        // 计算方向向量
        const dirX = firstNode[0] - secondNode[0];
        const dirY = firstNode[1] - secondNode[1];
        // 如果方向向量为0，则不需要移动
        if (dirX === 0 && dirY === 0) {
            return null;
        }
        //dirX为1，说明箭头指向右
        //dirX为-1，说明箭头指向左
        //dirY为1，说明箭头指向上
        //dirY为-1，说明箭头指向下

        if (dirX === 1) {
            //判断二维数组中这个方向有没有占用的格子
            for (let i = startGridX; i < gridArray[0].length-1; i++) {
                if (gridArray[startGridY][i + 1]) {
                    return [i + 1,startGridY];
                }
            }
        } else if (dirX === -1) {
            //判断二维数组中这个方向有没有占用的格子
            for (let i = startGridX; i > 0; i--) {
                if (gridArray[startGridY][i - 1]) {
                    return [i - 1,startGridY];
                }
            }
        } else if (dirY === 1) {
            //判断二维数组中这个方向有没有占用的格子
            for (let i = startGridY; i < gridArray.length-1; i++) {
                if (gridArray[i + 1][startGridX]) {
                    return [startGridX,i + 1];
                }
            }
        } else if (dirY === -1) {
            //判断二维数组中这个方向有没有占用的格子
            for (let i = startGridY; i > 0; i--) {
                if (gridArray[i - 1][startGridX]) {
                    return [startGridX,i - 1];
                }
            }   
        }
        return null;
    }

    //展示新手引导一
    private showGuideOne(){
        // 展示一个可以出逃的绳子
        app.manager.event.emit(app.config.eventname.showGuideOne);
    
        const uiPos = this.gridToWorldPos(9,10);
        // 发送新手引导一移动事件
        app.manager.event.emit(app.config.eventname.guideOneMove, uiPos);
    }

    //展示新手引导二
    private showGuideTwo(){
        // 展示一个可以出逃的绳子
        app.manager.event.emit(app.config.eventname.showGuideTwo);
    }

    

}