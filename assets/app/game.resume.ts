/** 可持久化的关卡路径配置。 */
export interface ResumeLevelConfig {
    ropes: [number, number][][];
    grid_width: number;
    grid_height: number;
}

/** 玩家主动返回首页时保存的未完成游戏快照。 */
export interface UnfinishedGameSnapshot {
    version: 1;
    level: number;
    isSpecialLevel: boolean;
    specialLevelIndex: number;
    levelName: string;
    remainingLevelConfig: ResumeLevelConfig;
    originalLevelConfig: ResumeLevelConfig;
    totalRopeCount: number;
    escapedRopeCount: number;
    remainingSeconds: number;
    heartNum: number;
    savedAt: number;
}
