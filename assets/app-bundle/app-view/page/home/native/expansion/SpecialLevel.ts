import { _decorator, Button, Component, macro, Node } from 'cc';
import { app } from 'db://assets/app/app';
const { ccclass, property } = _decorator;

@ccclass('SpecialLevel')
export class SpecialLevel extends Component {
    @property(Node)
    specialLevelNode: Node = null;


    start() {
        this.specialLevelNode.on(Button.EventType.CLICK, this.onClickSpecialLevel, this);

    }

    onClickSpecialLevel() {
        const lv = app.store.game.getLevel();
        if (lv <= 5) {
            app.manager.ui.showToast('第五关后开启！');
            return;
        }

        app.manager.ui.show({name: 'PageSpLevel'});
        
    }

    protected onDestroy(): void {
        this.unscheduleAllCallbacks();
    }
    
}


