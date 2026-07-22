import { _decorator, Component, Node, Sprite, SpriteFrame } from 'cc';
import { app } from 'db://assets/app/app';
const { ccclass, property } = _decorator;

@ccclass('gameHeartManager')
export class gameHeartManager extends Component {

    @property(Node) heartLayout: Node = null;
    @property(Node) time: Node = null;

    @property(SpriteFrame) heartLose: SpriteFrame = null;
    @property(SpriteFrame) heartRed: SpriteFrame = null;

    private heartNum: number = 3;

    onLoad() {
        this.heartLayout.children.forEach((heart) => {
            heart.active = true;
        })
        // 保持计时器节点启用，等待箭头绘制完成事件。
        this.time.active = true;

        app.manager.event.on(app.config.eventname.gameHeartJian, this.updateGameHeartJian, this);
        app.manager.event.on(app.config.eventname.gameHeartAdd, this.updateGameHeartAdd, this);

        app.manager.event.on(app.config.eventname.restart, this.resetHeart, this);
    }

    resetHeart(){
        this.heartNum = 3;
        this.heartLayout.children.forEach((heartNode, index) => {
            heartNode.getComponent(Sprite).spriteFrame = this.heartRed;
        })
    }

    updateGameHeartJian() {
        console.log('gameHeartJian', this.heartNum);
        //生命值减1
        this.heartNum--;
        
        this.heartLayout.children.forEach((heartNode, index) => {
            heartNode.getComponent(Sprite).spriteFrame = index < this.heartNum ? this.heartRed : this.heartLose;
        })
        //如果生命值小于0，游戏结束
        if (this.heartNum <= 0) {
            // 暂停倒计时
            app.manager.event.emit(app.config.eventname.pauseCountDown);
            // app.manager.ui.showToast('游戏结束');
            setTimeout(() => {
                app.manager.sound.playEffect({name:'effect/fail'});
                app.manager.ui.show({name: 'PopResult', data: {noGameHeart: true}});
            }, 500);
           
            return;
        }

    }

    updateGameHeartAdd() {
        //生命值加1
        this.heartNum++;
        //如果生命值大于3，生命值设为3
        if (this.heartNum > 3) {
            this.heartNum = 3;
        }
        this.heartLayout.children.forEach((heartNode, index) => {
            heartNode.getComponent(Sprite).spriteFrame = index < this.heartNum ? this.heartRed : this.heartLose;
        })
    }

    
}


