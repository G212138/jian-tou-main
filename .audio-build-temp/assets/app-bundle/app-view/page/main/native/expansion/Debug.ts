import { _decorator, Component, Node } from 'cc';
import { app } from 'db://assets/app/app';
const { ccclass, property } = _decorator;

@ccclass('Debug')
export class Debug extends Component {
    @property(Node)
    shangyiguan: Node = null;

    @property(Node)
    xiaoyiguan: Node = null;

    start() {
        this.shangyiguan.on(Node.EventType.TOUCH_END, this.onShangyiguanClick, this);
        this.xiaoyiguan.on(Node.EventType.TOUCH_END, this.onXiaoyiguanClick, this);
    }

    onShangyiguanClick() {
       app.store.game.setLevel(app.store.game.getLevel() - 1);
       app.manager.event.emit(app.config.eventname.restart);
    }
    onXiaoyiguanClick() {
        app.store.game.setLevel(app.store.game.getLevel() + 1);
        app.manager.event.emit(app.config.eventname.restart);
    }
}


