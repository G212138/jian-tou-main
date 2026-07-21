import { _decorator, Component, Label, macro, Node } from 'cc';
import { app } from 'db://assets/app/app';
import { bindStore } from 'db://pkg/@gamex/cc-store';
const { ccclass, property } = _decorator;

@ccclass('TiLiHome')
export class TiLiHome extends Component {
    @property(Label)
    daoJiShi: Label;

    @property(Label)
    tiLi: Label;

    start() {
        bindStore(this.tiLi, 'string', () => {
            return app.store.game.tili.toString();
        });
        bindStore(this.daoJiShi, 'string', () => {
            return app.store.game.getDaoJiShi();
        });
    }    
}


