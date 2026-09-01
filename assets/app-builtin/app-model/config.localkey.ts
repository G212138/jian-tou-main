import { IModel } from '../../../extensions/app/assets/base/BaseModel';
// config中不能定义任何方法, 任何变量在外部访问都是readonly
// 如果config中的内容是服务器下发的，可以使用Object.assign覆盖config中的内容
export default class Localkey implements IModel<Localkey> {
    //关卡
    public LEVEL_KEY = 'LEVEL_KEY';

    /** 主线最高已解锁关卡，和当前选择关卡分开保存。 */
    public MAX_UNLOCKED_LEVEL_KEY = 'MAX_UNLOCKED_LEVEL_KEY';
    /** 通过激励视频单独解锁的主线关卡。 */
    public AD_UNLOCKED_LEVELS_KEY = 'AD_UNLOCKED_LEVELS_KEY';

    public SpecialLevelKey = 'SpecialLevelKey';

    public TILI_KEY = 'TILI_KEY';

    // 最后一次恢复体力的时间戳
    public LAST_RECOVERY_TIMESTAMP_KEY = 'LAST_RECOVERY_TIMESTAMP_KEY';

    //是否需要新手引导
    public NeedGuideOne = 'NeedGuideOne';
    public NeedGuideTwo = 'NeedGuideTwo';

    // 是否是新用户
    public NewUser = 'NewUser';

    public ShareMsg = "箭了还箭！"

    
    // 颜色箭头改变
    public isColorArrow = 'isColorArrow';

    // 是否启用深色模式
    public IsDarkMode = 'IS_DARK_MODE';

    // 创意关卡状态
    public LEVEL_STATUS_KEY = 'LEVEL_STATUS_KEY';
}
