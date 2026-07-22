import { _decorator, Component, Node } from 'cc';
import { app } from 'db://assets/app/app';
import { i18n } from 'db://assets/app/i18n';
const { ccclass, property } = _decorator;

@ccclass('ShouChangDialog')
export class ShouChangDialog extends Component {

    @property(Node)
    private btnClose: Node = null;

    //首页
    @property(Node)
    private btnGo: Node = null; 

    onEnable() {
        i18n.apply(this.node);
    }

    start() {
        this.btnClose.on(Node.EventType.TOUCH_END, this.onClickClose, this);
        this.btnGo.on(Node.EventType.TOUCH_END, this.onClickGo, this);
    }

    private onClickClose() {
        app.manager.ui.hide({name: 'PopResult'});
    }
    private onClickGo() {
       //不重新开始，这时候再去打开复活的弹窗
      app.manager.ui.hide({name: 'PopResult'});
    }
}


