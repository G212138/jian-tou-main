import { IStore } from '../../../extensions/app/assets/base/BaseModel';
import { app } from '../../app/app';
import { createStore } from '../../pkg-export/@gamex/cc-store';
// store中只允许在根路径下定义方法，任何变量在外部访问都是readonly
// store类型的引入是借鉴了Web前端框架中全局状态管理的思路，意图是让数据更安全，更可控。同时框架中还提供了数据绑定的扩展包，可以通过pkg的方式安装，实现「数据->视图」的单向绑定。
export default class Game implements IStore<Game> {
    // 将当前实例转成Store
    constructor() { 
       return createStore(this);// return不可忽略
    }
    //体力值
    tili = 5;
    setTiLi(v: number) {
        this.tili = v;
        app.lib.storage.set(app.config.localkey.TILI_KEY, v);
    }
    getTiLi() {
        return this.tili;
    }

    // 最后一次恢复体力的时间戳
    lastRecoveryTimestamp = 0;
    setLastRecoveryTimestamp(v: number) {
        this.lastRecoveryTimestamp = v;
        app.lib.storage.set(app.config.localkey.LAST_RECOVERY_TIMESTAMP_KEY, v);
    }
    getLastRecoveryTimestamp() {
        return this.lastRecoveryTimestamp;
    }


    //关卡
    level = 1;
    setLevel(v: number) {
        this.level = v;
        app.lib.storage.set(app.config.localkey.LEVEL_KEY, v);
    }
    getLevel() {
        return this.level;
    }


    daojishi:string = "";
    setDaoJiShi(v: string) {
        this.daojishi = v;
    }
    getDaoJiShi() {
        return this.daojishi;
    }

    specialLevel = 1;
    setSpecialLevel(v: number) {
        this.specialLevel = v;
        app.lib.storage.set(app.config.localkey.SpecialLevelKey, v);
    }
    getSpecialLevel() {
        return this.specialLevel;
    }

    
}