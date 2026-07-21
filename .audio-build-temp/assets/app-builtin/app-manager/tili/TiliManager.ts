import { _decorator, macro } from 'cc';
import BaseManager from '../../../../extensions/app/assets/base/BaseManager';
import { app } from 'db://assets/app/app';
const { ccclass, property } = _decorator;
@ccclass('TiliManager')
export class TiliManager extends BaseManager {
    private maxHearts: number = 5; // 最大体力值
    private recoveryTime: number = 5 * 60; // 体力恢复时间（秒）
    
    // [无序] 加载完成时触发
    protected onLoad() { 
        // 初始化生命值 - 只有在本地存储中没有生命值时才设置初始值
        const currentHearts = app.lib.storage.get(app.config.localkey.TILI_KEY);
        if (currentHearts === null || currentHearts === undefined) {
            app.store.game.setTiLi(5);
        } else {
            app.store.game.setTiLi(currentHearts);
        }
    
        // 初始化最后一次恢复体力的时间戳 - 只有在本地存储中没有时间戳时才设置初始值
        const lastRecoveryTimestamp = app.lib.storage.get(app.config.localkey.LAST_RECOVERY_TIMESTAMP_KEY);
        if (lastRecoveryTimestamp === null || lastRecoveryTimestamp === undefined) {
            app.store.game.setLastRecoveryTimestamp(0);
        } else {
            app.store.game.setLastRecoveryTimestamp(lastRecoveryTimestamp);
        }
       
    }

    // [无序] 自身初始化完成, init执行完毕后被调用
    protected onInited() { 
         // 初始化时从存储中读取体力数据
        this.schedule(this.JianTingHeart,1,macro.REPEAT_FOREVER);
    }

    // [无序] 所有manager初始化完成
    protected onFinished() { }

    // [无序] 初始化manager，在初始化完成后，调用finish方法
    protected init(finish: Function) {
        super.init(finish);
    }

    private JianTingHeart() {
        let heart = app.lib.storage.get(app.config.localkey.TILI_KEY);
        if(heart >= this.maxHearts){
            app.store.game.setLastRecoveryTimestamp(0);
            app.store.game.setDaoJiShi("");
            return;
        }
        //查看是否有本地的恢复时间
        if(app.store.game.getLastRecoveryTimestamp() == 0){
            app.store.game.setLastRecoveryTimestamp(Date.now());
        }else{
            //说明本地有恢复时间记录。计算现在距离恢复时间的时间差
            let timeDiff = (Date.now() - app.store.game.getLastRecoveryTimestamp()) / 1000;
            //timeDiff 够几个 recoveryTime 就恢复多少体力
            let recoverCount = Math.floor(timeDiff / this.recoveryTime);
            // 恢复 recoverCount 点体力
            if(recoverCount < 0){
                recoverCount = 0;
            }
            heart += recoverCount;
            // 计算当前时间距离下一次恢复的时间差
            let timeDiffNext = timeDiff % this.recoveryTime;
            app.store.game.setLastRecoveryTimestamp(Date.now() - timeDiffNext * 1000);
            //保留整数
            timeDiffNext = this.recoveryTime - Math.floor(timeDiffNext);
            // 确保体力不超过最大体力值
            heart = Math.min(heart, this.maxHearts);
            app.store.game.setTiLi(heart);
            // 体力满了，就不继续恢复了
            if(heart >= this.maxHearts){
                app.store.game.setLastRecoveryTimestamp(0);
            }

            let daoJiShi = this.parseTime(timeDiffNext);

            app.store.game.setDaoJiShi(daoJiShi);
        }
        
    }

    private parseTime(daoJiShi: number) {
        let str = "";
        if (daoJiShi > -1) {
            // 格式化倒计时显示
            const minutes = Math.floor(daoJiShi / 60);
            const seconds = daoJiShi % 60;
            // 使用替代方法实现补零，避免padStart兼容性问题
            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes.toString();
            const formattedSeconds = seconds < 10 ? '0' + seconds : seconds.toString();
            str = `${formattedMinutes}:${formattedSeconds}`;
        }
        return str;
    }
    
}
