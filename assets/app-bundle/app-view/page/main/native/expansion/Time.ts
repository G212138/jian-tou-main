import { _decorator, Component, Node, Label } from 'cc';
import { app } from 'db://assets/app/app';
const { ccclass, property } = _decorator;

@ccclass('Time')
export class Time extends Component {
    // 倒计时总时长（8分钟 = 480秒）
    private totalSeconds: number = 8 * 60;
    // 当前剩余秒数
    private remainingSeconds: number = 0;
    // Label组件引用
    @property(Label)
    private timeLabel: Label = null;

    private _isCountdownRunning: boolean = false;

    //是否暂停倒计时，观看广告的时候暂停
    private isStopCountDown: boolean = false;

    onLoad() {
        // 初始化倒计时
        this.resetTimer();
        
        app.manager.event.on(app.config.eventname.startGameDaoJiShi, this.startCountdown, this);
        app.manager.event.on(app.config.eventname.timeAdd, this.addTime, this);
        app.manager.event.on(app.config.eventname.restart, this.resetTimer, this);

        // 监听暂停倒计时事件
        app.manager.event.on(app.config.eventname.pauseCountDown, this.pauseCountDown, this);
        // 监听恢复倒计时事件
        app.manager.event.on(app.config.eventname.resumeCountDown, this.resumeCountDown, this);
    }

    //暂停倒计时
    private pauseCountDown(): void {
        this.isStopCountDown = true;
    }

    //恢复倒计时
    private resumeCountDown(): void {
        this.isStopCountDown = false;
    }
    



    /**
     * 重置计时器
     */
    private resetTimer(): void {
        this._isCountdownRunning = false;
        this.remainingSeconds = this.totalSeconds;
        this.updateTimeLabel();
        this.timeLabel.enabled = false;
        this.isStopCountDown = false;
    }

    /**
     * 开始倒计时
     */
    public startCountdown(): void {
        if(this._isCountdownRunning){
            //已经计时中
            return
        }

        this.isStopCountDown = false;

        this._isCountdownRunning = true;
        
        // 先取消之前可能存在的倒计时
        this.unschedule(this.updateCountdown);
        // 立即更新一次时间显示
        this.updateTimeLabel();
        this.timeLabel.enabled = true;
        // 每1秒执行一次updateCountdown方法
        this.schedule(this.updateCountdown, 1);
    }

    /**
     * 停止倒计时
     */
    public stopCountdown(): void {
        this._isCountdownRunning = false;
        this.timeLabel.enabled = false;
        this.unschedule(this.updateCountdown);
    }

    /**
     * 倒计时更新函数（每秒调用一次）
     */
    private updateCountdown(): void {

        // 如果暂停倒计时，直接返回
        if(this.isStopCountDown){
            return
        }

        // 减少剩余时间
        this.remainingSeconds--;
        
        // 更新显示
        this.updateTimeLabel();
        
        // 检查是否倒计时结束
        if (this.remainingSeconds <= 0) {
            this.remainingSeconds = 0;
            this.stopCountdown();
            this.onTimeUp();
        }
    }

    /**
     * 更新时间显示
     */
    private updateTimeLabel(): void {
        if (this.timeLabel) {
            // 计算分钟和秒数
            const minutes: number = Math.floor(this.remainingSeconds / 60);
            const seconds: number = Math.floor(this.remainingSeconds % 60);
            
            // 格式化时间显示（MM:SS）- 使用兼容性更好的方法
            const formattedMinutes: string = (minutes < 10 ? '0' : '') + minutes;
            const formattedSeconds: string = (seconds < 10 ? '0' : '') + seconds;
            const formattedTime: string = formattedMinutes + ':' + formattedSeconds;
            this.timeLabel.string = formattedTime;
        }
    }

    /**
     * 倒计时结束处理函数
     */
    private onTimeUp(): void {
        this._isCountdownRunning = false;
        console.log('游戏时间到，游戏失败！');
        app.manager.sound.playEffect({name:'effect/fail'});
        app.manager.ui.show({name: 'PopResult', data: {noTime: true}});
       
    }
    
    /**
     * 组件销毁时取消所有定时器
     */
    onDestroy(): void {
        this.unscheduleAllCallbacks();
    }

    addTime(time: number){
        this.remainingSeconds += time;
        this.updateTimeLabel();
        this.stopCountdown();
        this.startCountdown();
    }
}


