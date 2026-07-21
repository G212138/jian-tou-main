import { _decorator } from 'cc';
import BaseManager from '../../../../extensions/app/assets/base/BaseManager';
const { ccclass, property } = _decorator;

// 关卡类型枚举
export enum LevelActionType {
    MAIN_LEVEL = 1,      // 主线关卡
    CREATIVE_LEVEL = 2   // 创意关卡
}

// 关卡结果枚举
export enum LevelResultType {
    SUCCESS = 1,         // 成功
    FAIL = 2,            // 失败
    RETRY = 3,           // 重试
    REVIVE = 4,          // 复活
    ENTER = 5,           // 进入
    EXIT = 6,            // 退出
    USE_ITEM = 7,        // 使用道具
    AD_REWARD = 8,       // 广告激励
    SHARE = 9            // 分享
}

interface ReportCallback {
    success?: (res: any) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
}

interface ReportParams {
    levelID: number;
    levelAction: LevelActionType;
    levelResult: LevelResultType;
    levelTime?: number;
    levelProgress?: number;
    loginCount?: number;
    externInfo?: any;
    success?: (res: any) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
}

@ccclass('ReportManager')
export class ReportManager extends BaseManager {
    private logger: any = null;
    private readonly FIXED_EVENT_ID: string = '10000003';

    // [无序] 加载完成时触发
    protected onLoad() { }

    // [无序] 自身初始化完成, init执行完毕后被调用
    protected onInited() { }

    // [无序] 所有manager初始化完成
    protected onFinished() { }

    // [无序] 初始化manager，在初始化完成后，调用finish方法
    protected init(finish: Function) {
        this.initLogger();
        super.init(finish);
    }

    private initLogger() {
        //@ts-ignore
        if (typeof wx !== 'undefined' && wx.getMiniReportManager) {
            //@ts-ignore
            this.logger = wx.getMiniReportManager({ debug: true, eventList: [this.FIXED_EVENT_ID] });
        }
    }

    public reportLevelEvent(params: ReportParams) {
        if (!this.logger) {
            console.warn('ReportManager: Logger not initialized');
            return;
        }

        this.logger.report({
            eventID: this.FIXED_EVENT_ID,
            levelName: params.levelID.toString(),
            levelID: params.levelID,
            levelAction: params.levelAction,
            levelResult: params.levelResult,
            levelTime: params.levelTime,
            levelProgress: params.levelProgress,
            loginCount: params.loginCount,
            externInfo: params.externInfo
        });
    }

    public reportEvent(data: any,) {
        if (!this.logger) {
            console.warn('ReportManager: Logger not initialized');
            console.log('ReportManager: reportEvent', data);
            return;
        }

        this.logger.report({
            eventID: this.FIXED_EVENT_ID,
            levelName: "不关注",
            ...data
        });
    }
}