import { IModel } from '../../../extensions/app/assets/base/BaseModel';
// config中不能定义任何方法, 任何变量在外部访问都是readonly
// 如果config中的内容是服务器下发的，可以使用Object.assign覆盖config中的内容
export default class Eventname implements IModel<Eventname> {

    // 关卡改变
    public onLevelChanged = 'onLevelChanged';

    // 重新开始
    public restart = 'restart';

    //道具1 使用
    public DaoJuTipUse = 'DaoJuTipUse';
    //道具2 使用
    public DaoJuHammerUse = 'DaoJuHammerUse';
    //道具2 使用结束
    public DaoJuHammerUseOver = 'DaoJuHammerUseOver';

    // 体力值改变
    public heartChange = 'heartChange';
    // 游戏中生命值改变
    public gameHeartJian = 'gameHeartJian';
    // 游戏中生命值增加
    public gameHeartAdd = 'gameHeartAdd';
    //恢复时间
    public timeAdd = 'timeAdd';
    // 恢复生命值
    public startGameDaoJiShi = 'startGameDaoJiShi';

    //DianTool  绘制辅助点点
    public DianTool = 'DianTool';

    // 引导
    public showGuideOne = 'showGuideOne';
    // 新手引导一移动
    public guideOneMove = 'guideOneMove';
    // 显示引导二
    public showGuideTwo = 'showGuideTwo';

    //引导结束
    public guideOneEnd = 'guideOneEnd';
    // 新手引导二结束
    public guideTwoEnd = 'guideTwoEnd';

    // 错误闪烁
    public errorFlash = 'errorFlash';

    // 播放钢琴音效
    public playPianoSound = 'playPianoSound';

    // 被庄机撞击
    public beiZhuangJiShark = 'beiZhuangJiShark';

    // 颜色箭头改变
    public colorArrowChange = 'colorArrowChange';

    // 开始创意关卡
    public StartSpecialLevel = 'StartSpecialLevel';

    // 更新关卡状态
    public UpdateSPLevelStatus = 'UpdateSPLevelStatus';

    // 暂停倒计时
    public pauseCountDown = 'pauseCountDown';
    // 恢复倒计时
    public resumeCountDown = 'resumeCountDown';

}