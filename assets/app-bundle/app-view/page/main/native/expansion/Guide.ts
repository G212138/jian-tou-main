import { _decorator, Component, instantiate, Node, Prefab, v3, Vec2 } from 'cc';
import { app } from 'db://assets/app/app';
const { ccclass, property } = _decorator;

@ccclass('Guide')
export class Guide extends Component {

    // 新手引导一
    @property(Prefab)
    private guideOneNode:Prefab = null;
    // 新手引导二   
    @property(Prefab)
    private guideTwoNode:Prefab = null;
    @property(Node)
    private guideParentNode:Node = null;

    onLoad() {
        // 监听新手引导一
        app.manager.event.on(app.config.eventname.showGuideOne, this.showGuideOne, this);
        // 监听新手引导一移动事件
        app.manager.event.on(app.config.eventname.guideOneMove, this.guideOneMove, this);
        // 监听新手引导二
        app.manager.event.on(app.config.eventname.showGuideTwo, this.showGuideTwo, this);
        // 监听新手引导结束
        app.manager.event.on(app.config.eventname.guideOneEnd, this.guideOneEnd, this);
        // 监听新手引导二结束
        app.manager.event.on(app.config.eventname.guideTwoEnd, this.guideTwoEnd, this);
    }

    // 显示新手引导一
    private showGuideOne() {
          // 移除新手引导一
        this.guideParentNode.removeAllChildren();
        if (this.guideOneNode) {
            this.guideParentNode.addChild(instantiate(this.guideOneNode));
        }
    }
    // 新手引导一移动事件
    private guideOneMove(pos: Vec2) {
        if (this.guideOneNode) {
            // 移动新手引导一到指定位置
            console.log(`Guide: 新手引导一移动到 ${pos}`);
            let hand = this.guideParentNode.getChildByName('hand');
            if(!hand){
                this.showGuideOne();
                hand.setPosition(v3(pos.x, pos.y, 0));
            }else{
                hand.setPosition(v3(pos.x, pos.y, 0));
            }
           
        }
    }
    // 显示新手引导二
    private showGuideTwo() {
        // 移除新手引导一
        this.guideParentNode.removeAllChildren();
        if (this.guideTwoNode) {
            this.guideParentNode.addChild(instantiate(this.guideTwoNode));
        }
    }
    // 新手引导结束事件
    private guideOneEnd() {
        if (this.guideOneNode) {
            // 移除新手引导一
            let hand = this.guideParentNode.getChildByName('hand');
            if(hand){
                this.guideParentNode.removeChild(hand);
            }
        }
    }
    // 新手引导二结束事件
    private guideTwoEnd() {
        console.log('Guide: 新手引导二结束');
        if (this.guideTwoNode) {
            console.log('Guide: 新手引导二节点存在');
            // 移除新手引导二
            let suofang = this.guideParentNode.getChildByName('suofang');
            if(suofang){
                console.log('Guide: 新手引导二节点存在，移除');
                this.guideParentNode.removeChild(suofang);
            }
        }
    }
}


