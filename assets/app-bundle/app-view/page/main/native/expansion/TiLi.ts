import { _decorator, Component, Label, Node } from 'cc';
import { app } from 'db://assets/app/app';
import { bindStore } from 'db://assets/pkg-export/@gamex/cc-store';
const { ccclass, property } = _decorator;

@ccclass('TiLi')
export class TiLi extends Component {

    @property(Label)
    daoJiShi: Label = null;

    @property(Label)
    tiLi: Label = null;

    start() {
         bindStore(this.tiLi, 'string', () => {
            return app.store.game.tili.toString();
        });
        bindStore(this.daoJiShi, 'string', () => {
            return app.store.game.getDaoJiShi();
        });
    }
}


