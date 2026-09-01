import { _decorator, Component, Node, UITransform, EventTouch, Touch, EventMouse, Vec2, Widget, Canvas, input, Input, macro, v3 } from 'cc';
import { app } from 'db://assets/app/app';

const { ccclass, property } = _decorator;

@ccclass('Drag')
export class Drag extends Component {
// 是否启用拖动

@property({ displayName: "启用拖动" })

public enableDrag: boolean = true;

// 是否限制在屏幕内

@property({ displayName: "限制在屏幕内" })

public limitInScreen: boolean = true;

// 是否启用鼠标缩放

@property({ displayName: "启用鼠标缩放" })

public enableScale: boolean = true;

// 最小缩放

@property({ displayName: "最小缩放", visible: function () { return this.enableScale } })

public minScale: number = 0.5;

// 最大缩放

@property({ displayName: "最大缩放", visible: function () { return this.enableScale } })

public maxScale: number = 3.0;

// 缩放速度

@property({ displayName: "缩放速度", visible: function () { return this.enableScale } })

public scaleSpeed: number = 0.1;

// 私有变量

private _isDragging: boolean = false;

private _offset: Vec2 = new Vec2();

private _widget: Widget = null;

private _widgetEnabled: boolean = false;

@property({ type: Node, displayName: "父节点，不能超出父节点范围" })
private parentNode: Node = null;

// 双指缩放相关

private _isScaling: boolean = false;

private _lastDistance: number = 0;

private _lastTouchCenter: Vec2 = new Vec2();

private _touches: Touch[] = [];

//用来计算单指移动的距离
private moveDistance: number = 0;

onLoad() {

    // 检查是否有Widget组件

    this._widget = this.node.getComponent(Widget);

    //监听restart
    app.manager.event.on(app.config.eventname.restart, this._onRestart, this);

}

start() {

    // 注册触摸事件

    this.node.on(Node.EventType.TOUCH_START, this._onTouchStart, this);

    this.node.on(Node.EventType.TOUCH_MOVE, this._onTouchMove, this);

    this.node.on(Node.EventType.TOUCH_END, this._onTouchEnd, this);

    this.node.on(Node.EventType.TOUCH_CANCEL, this._onTouchEnd, this);

    // 注册鼠标滚轮事件

    if (this.enableScale) {

         this.node.on(Node.EventType.MOUSE_WHEEL, this._onMouseWheel, this);

    }

    //加一个保护机制，不知道什么原因导致滑动出了屏幕外面，需要重置回来
    this.schedule(this.checkPosition, 1, macro.REPEAT_FOREVER);

}

private checkPosition(){

    //获取屏幕限制
    let screenSize = this._getScreenLimit();
    //获取自己的坐标
    let nodeWorldPos = this.node.worldPosition;
    //判断是否超出屏幕
    if(nodeWorldPos.x < screenSize.minX){
        this.node.setWorldPosition(v3(screenSize.minX, nodeWorldPos.y, nodeWorldPos.z));
    }else if(nodeWorldPos.x > screenSize.maxX){
        this.node.setWorldPosition(v3(screenSize.maxX, nodeWorldPos.y, nodeWorldPos.z));
    }
    if(nodeWorldPos.y < screenSize.minY){
        this.node.setWorldPosition(v3(nodeWorldPos.x, screenSize.minY, nodeWorldPos.z));
    }else if(nodeWorldPos.y > screenSize.maxY){
        this.node.setWorldPosition(v3(nodeWorldPos.x, screenSize.maxY, nodeWorldPos.z));    
    }
}

onDestroy() {
    app.manager.event.off(app.config.eventname.restart, this._onRestart, this);

    // 注销触摸事件

    this.node.off(Node.EventType.TOUCH_START, this._onTouchStart, this);

    this.node.off(Node.EventType.TOUCH_MOVE, this._onTouchMove, this);

    this.node.off(Node.EventType.TOUCH_END, this._onTouchEnd, this);

    this.node.off(Node.EventType.TOUCH_CANCEL, this._onTouchEnd, this);

    // 注销鼠标滚轮事件

    if (this.enableScale) {

         this.node.off(Node.EventType.MOUSE_WHEEL, this._onMouseWheel, this);

    }
    // 注销保护机制
    this.unschedule(this.checkPosition);

}

private _onRestart() {
    // 重置拖动状态
    this.node.setPosition(0, 0);
    this.node.setScale(1, 1);
}

private _onTouchStart(event: EventTouch) {
    this.moveDistance = 0;

    const touches = event.getTouches();

    // 如果已经有两个触摸点，则不响应

    if (this._touches.length === 2) return;

    //取前两个点，若果已经有一个点，则取一个点

    if (this._touches.length === 1) {

        this._touches.push(touches[0]);

    } else {

        this._touches.push(...touches.slice(0, 2));

    }

    if (this._touches.length === 1) {

        // 单指按下 - 开始或继续拖动

        // 如果之前在缩放，不响应

        if (this._isScaling) {

            return;

        }

        if (this.enableDrag) {

            // 设置拖动状态

            this._isDragging = true;

            this._isScaling = false;

            // 禁用Widget（如果有）

            if (this._widget && this._widget.enabled) {

                this._widgetEnabled = this._widget.enabled;

                this._widget.enabled = false;

            }

            // 重要：每次单指按下都重新计算偏移量

            // 这样可以确保节点不会跳动

            const touchPos = this._touches[0].getUILocation();

            const nodeWorldPos = this.node.worldPosition;

            this._offset.set(

                touchPos.x - nodeWorldPos.x,

                touchPos.y - nodeWorldPos.y

            );

        }

    } else if (this._touches.length >= 2) {

        // 双指按下 - 开始缩放

        if (this.enableScale) {

            // 停止拖动，开始缩放

            this._isDragging = false;

            this._isScaling = true;

            // 禁用Widget（如果有）

            if (this._widget && this._widget.enabled) {

                if (!this._widgetEnabled) {

                    this._widgetEnabled = this._widget.enabled;

                }

                this._widget.enabled = false;

            }

            //重要：基于当前双指位置初始化缩放数据

            const touch1 = this._touches[0].getUILocation();

            const touch2 = this._touches[1].getUILocation();

            this._lastDistance = this._getTouchDistance(touch1, touch2);

            this._lastTouchCenter.set(

                (touch1.x + touch2.x) / 2,

                (touch1.y + touch2.y) / 2

            );

        }

    }

}

private _onTouchMove(event: EventTouch) {

    // 双指缩放

    if (this._touches.length >= 2 && this._isScaling && this.enableScale) {

        const touch1 = this._touches[0].getUILocation();

        const touch2 = this._touches[1].getUILocation();

        // 计算当前双指距离

        const currentDistance = this._getTouchDistance(touch1, touch2);

        // 计算距离变化比例

        const distanceRatio = currentDistance / this._lastDistance;

        // 如果距离变化太小，忽略（可能是手指抖动）

        if (Math.abs(distanceRatio - 1.0) < 0.01) {

            this._lastDistance = currentDistance;

            return;

        }

        // 计算新的缩放值

        const currentScale = this.node.scale.x;

        let newScale = currentScale * distanceRatio;

        // 限制在最小最大范围内

        newScale = Math.max(this.minScale, Math.min(this.maxScale, newScale));

        // 如果缩放值没变化，只更新距离

        if (newScale === currentScale) {

            this._lastDistance = currentDistance;

            return;

        }

        //取消缩放引导
        if(app.manager.globaldata.getNeedGuideTwo()){
            app.manager.globaldata.setNeedGuideTwo(false);
            // 移除新手引导二
            app.manager.event.emit(app.config.eventname.guideTwoEnd);
        }

        // 计算当前双指中心点

        const currentCenter = new Vec2(

            (touch1.x + touch2.x) / 2,

            (touch1.y + touch2.y) / 2

        );

        // 获取节点当前的世界坐标

        const nodeWorldPos = this.node.worldPosition;

        // 计算中心点相对于节点中心的偏移

        const offsetX = currentCenter.x - nodeWorldPos.x;

        const offsetY = currentCenter.y - nodeWorldPos.y;

        // 应用缩放

        this.node.setScale(newScale, newScale, newScale);

        // 计算缩放后，为了保持中心点位置不变，节点应该移动到的新位置

        const scaleRatio = newScale / currentScale;

        let newWorldX = currentCenter.x - offsetX * scaleRatio;

        let newWorldY = currentCenter.y - offsetY * scaleRatio;

        // 应用屏幕限制

        if (this.limitInScreen && this.parentNode) {

            const limit = this._getScreenLimit();

            if (limit) {

                newWorldX = Math.max(limit.minX, Math.min(limit.maxX, newWorldX));

                newWorldY = Math.max(limit.minY, Math.min(limit.maxY, newWorldY));

            }

        }

        // 更新节点位置

        this.node.setWorldPosition(newWorldX, newWorldY, nodeWorldPos.z);

        // 更新上一次的距离

        this._lastDistance = currentDistance;

        return;

    }

    // 单指拖动

    if (this._touches.length === 1 && this._isDragging && this.enableDrag && !this._isScaling) {

        // 获取触摸点的世界坐标

        const touchPos = this._touches[0].getUILocation();

        // 计算新的世界坐标位置（减去偏移）

        let newWorldX = touchPos.x - this._offset.x;

        let newWorldY = touchPos.y - this._offset.y;

        // 限制在屏幕范围内

        if (this.limitInScreen && this.parentNode) {

            const limit = this._getScreenLimit();

            if (limit) {

                newWorldX = Math.max(limit.minX, Math.min(limit.maxX, newWorldX));

                newWorldY = Math.max(limit.minY, Math.min(limit.maxY, newWorldY));

            }

        }
       
        // 更新节点的世界坐标

        this.node.setWorldPosition(newWorldX, newWorldY, this.node.worldPosition.z);

    }

}

private _onTouchEnd(event: EventTouch) {

    const touches = event.getTouches();

    // 移除触摸点

    touches.forEach(touch => {

        this._touches = this._touches.filter(t => t.getID() !== touch.getID());

    });

    if (this._touches.length === 1) {

        this._isDragging = true;

        this._isScaling = false;

        //设置单指偏移量

        this._offset.set(

            this._touches[0].getUILocation().x - this.node.worldPosition.x,

            this._touches[0].getUILocation().y - this.node.worldPosition.y

        );
        

    }

    if (this._touches.length === 2) {
        
        this._isScaling = true;

        this._isDragging = false;

        //设置双指缩放相关数据

        this._lastDistance = this._getTouchDistance(this._touches[0].getUILocation(), this._touches[1].getUILocation());

        this._lastTouchCenter.set(

            (this._touches[0].getUILocation().x + this._touches[1].getUILocation().x) / 2,

            (this._touches[0].getUILocation().y + this._touches[1].getUILocation().y) / 2

        );

    }

    // 所有手指都抬起 - 完全重置状态

    if (this._touches.length === 0) {

        // 清除所有状态

        this._isDragging = false;

        this._isScaling = false;

        // 注意：不清除 _offset，它会在下次 TouchStart 时重新计算

        // 清除缩放相关数据

        this._lastDistance = 0;

        this._lastTouchCenter.set(0, 0);

        // 恢复Widget（如果有）

        if (this._widget) {

            this._widget.enabled = this._widgetEnabled;

        }

    }

}

private _onMouseWheel(event: EventMouse) {
    console.log("鼠标滚轮滚动事件", event);

    if (!this.enableScale) return;

    const uiTransform = this.node.getComponent(UITransform);

    if (!uiTransform) return;

    // 获取滚轮滚动方向

    const scrollY = event.getScrollY();

    // 计算新的缩放值

    const currentScale = this.node.scale.x; // 假设xyz缩放一致

    const scaleChange = scrollY > 0 ? this.scaleSpeed : -this.scaleSpeed;

    let newScale = currentScale + scaleChange;

    // 限制在最小最大范围内

    newScale = Math.max(this.minScale, Math.min(this.maxScale, newScale));

    // 如果缩放值没变化，直接返回

    if (newScale === currentScale) return;

    // 获取鼠标在世界坐标系中的位置

    const mouseWorldPos = event.getUILocation();

    // 获取节点当前的世界坐标

    const nodeWorldPos = this.node.worldPosition;

    // 计算鼠标相对于节点中心的偏移（世界坐标）

    const offsetX = mouseWorldPos.x - nodeWorldPos.x;

    const offsetY = mouseWorldPos.y - nodeWorldPos.y;

    // 应用缩放

    this.node.setScale(newScale, newScale, newScale);

    // 计算缩放后，为了保持鼠标位置不变，节点应该移动到的新位置

    // 缩放会改变偏移量，所以需要重新计算节点位置

    const scaleRatio = newScale / currentScale;

    let newWorldX = mouseWorldPos.x - offsetX * scaleRatio;

    let newWorldY = mouseWorldPos.y - offsetY * scaleRatio;

    // 应用屏幕限制

    if (this.limitInScreen && this.parentNode) {

        const limit = this._getScreenLimit();

        if (limit) {

            newWorldX = Math.max(limit.minX, Math.min(limit.maxX, newWorldX));

            newWorldY = Math.max(limit.minY, Math.min(limit.maxY, newWorldY));

        }

    }

     //取消缩放引导
    if(app.manager.globaldata.getNeedGuideTwo()){
        app.manager.globaldata.setNeedGuideTwo(false);
        // 移除新手引导二
        app.manager.event.emit(app.config.eventname.guideTwoEnd);
    }

    // 更新节点位置

    this.node.setWorldPosition(newWorldX, newWorldY, nodeWorldPos.z);

}

/**

 * 获取屏幕限制范围（世界坐标）

 * 确保物体完全覆盖屏幕，不露出黑边

 */

private _getScreenLimit() {

    const selfTransform = this.node.getComponent(UITransform);

    const canvasTransform = this.parentNode.getComponent(UITransform);

    if (!selfTransform || !canvasTransform) {

        return null;

    }

    // 获取Canvas的世界坐标和尺寸

    const canvasWorldPos = this.parentNode.worldPosition;

    const canvasWidth = canvasTransform.width;

    const canvasHeight = canvasTransform.height;

    // 获取节点的尺寸（考虑缩放）

    const selfWidth = selfTransform.width * Math.abs(this.node.scale.x);

    const selfHeight = selfTransform.height * Math.abs(this.node.scale.y);

    // 计算节点的半尺寸

    const halfWidth = selfWidth / 2;

    const halfHeight = selfHeight / 2;

    // 计算Canvas的边界（世界坐标）

    const canvasLeft = canvasWorldPos.x - canvasWidth / 2;

    const canvasRight = canvasWorldPos.x + canvasWidth / 2;

    const canvasBottom = canvasWorldPos.y - canvasHeight / 2;

    const canvasTop = canvasWorldPos.y + canvasHeight / 2;

    // 如果节点比屏幕小：限制节点不能离开屏幕

    if (selfWidth <= canvasWidth && selfHeight <= canvasHeight) {

        return {

            minX: canvasLeft + halfWidth,

            maxX: canvasRight - halfWidth,

            minY: canvasBottom + halfHeight,

            maxY: canvasTop - halfHeight

        };

    }

    // 如果节点比屏幕大：限制节点必须覆盖整个屏幕（不能露出黑边）

    return {

        minX: canvasRight - halfWidth,  // 中心不能太靠左，否则右边露出

        maxX: canvasLeft + halfWidth,   // 中心不能太靠右，否则左边露出

        minY: canvasTop - halfHeight,   // 中心不能太靠下，否则上边露出

        maxY: canvasBottom + halfHeight // 中心不能太靠上，否则下边露出

    };

}

/**

 * 计算两个触摸点之间的距离

 */

private _getTouchDistance(touch1: Vec2, touch2: Vec2): number {

    const dx = touch2.x - touch1.x;

    const dy = touch2.y - touch1.y;

    return Math.sqrt(dx * dx + dy * dy);

}

/**

 * 设置是否启用拖动

 */

public setEnableDrag(enable: boolean) {

    this.enableDrag = enable;

}
}
