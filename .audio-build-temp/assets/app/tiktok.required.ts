import { Game, game, sys } from 'cc';
import { DEV } from 'cc/env';
import {
    TIKTOK_REQUIRED_FEATURE_CONFIG,
    TikTokRequiredFeatureConfig,
} from './config.tiktok';

export type TikTokMissionType = 'shortcut' | 'revisit';
export type TikTokLoginStatus =
    | 'idle'
    | 'logging_in'
    | 'authenticated'
    | 'failed'
    | 'mock';

export interface TikTokMissionActionResult {
    status: 'rewarded' | 'started' | 'already_claimed' | 'unavailable' | 'error';
    message: string;
}

interface TikTokRequiredCallbacks {
    onGrantReward?: (type: TikTokMissionType, amount: number) => void;
    onNotice?: (message: string) => void;
}

const CLAIM_STORAGE_KEYS: Record<TikTokMissionType, string> = {
    shortcut: 'TIKTOK_SHORTCUT_REWARD_CLAIMED',
    revisit: 'TIKTOK_REVISIT_REWARD_CLAIMED',
};

/**
 * TikTok Native Mini Game 必接能力适配层。
 *
 * - 启动时调用 silent login；当前单机玩法不保存、不上传一次性 code。
 * - 对 41.0.0+ 的快捷方式与个人主页回访 API 先执行 canIUse。
 * - 平台返回 canReceiveReward 后才发放奖励，并用本地标记阻止重复发放。
 */
class TikTokRequiredFeatures {
    private config: TikTokRequiredFeatureConfig = TIKTOK_REQUIRED_FEATURE_CONFIG;
    private callbacks: TikTokRequiredCallbacks = {};
    private initialized = false;
    private platformLoggedIn = false;
    private loginPromise: Promise<boolean> | null = null;
    private checkingRewards = false;
    private devClaimed = new Set<TikTokMissionType>();

    loginStatus: TikTokLoginStatus = 'idle';

    private get runtime(): any {
        return globalThis as any;
    }

    private get api(): any {
        return this.runtime.TTMinis?.game || this.runtime.tt || null;
    }

    get isTikTokRuntime(): boolean {
        const platform = sys.platform as any;
        const platforms = sys.Platform as any;
        return !!this.runtime.TTMinis?.game
            || !!this.runtime.tt
            || platform === platforms.BYTEDANCE_MINI_GAME
            || platform === platforms.BYTEDANCE_GAME;
    }

    get shouldShowEntries(): boolean {
        return this.isTikTokRuntime || (DEV && this.config.enableDevMock);
    }

    initialize(
        callbacks: TikTokRequiredCallbacks,
        config: TikTokRequiredFeatureConfig = TIKTOK_REQUIRED_FEATURE_CONFIG,
    ) {
        this.callbacks = callbacks;
        this.config = config;

        if (this.initialized || !this.shouldShowEntries) return;
        this.initialized = true;
        game.on(Game.EVENT_SHOW, this.onGameShow, this);

        void this.silentLogin().then(() => this.checkPendingMissionRewards());
    }

    async silentLogin(): Promise<boolean> {
        console.log("静默登录");
        if (this.platformLoggedIn) return true;
        if (this.loginPromise) return this.loginPromise;

        if (DEV && !this.api && this.config.enableDevMock) {
            this.platformLoggedIn = true;
            this.loginStatus = 'mock';
            return true;
        }

        const api = this.api;
        if (typeof api?.login !== 'function') {
            this.loginStatus = 'failed';
            console.error('[TikTokRequired] TTMinis.game.login is unavailable');
            return false;
        }

        this.loginStatus = 'logging_in';
        const loginRequest = new Promise<boolean>((resolve) => {
            api.login({
                success: (result: { code?: string }) => {
                    console.log("静默登录成功");
                    if (!result?.code) {
                        this.loginStatus = 'failed';
                        console.error('[TikTokRequired] Silent login returned no authorization code');
                        resolve(false);
                        return;
                    }

                    // 当前项目不需要用户 OpenID；code 仅用于确认静默登录能力可用，随后立即丢弃。
                    this.platformLoggedIn = true;
                    this.loginStatus = 'authenticated';
                    resolve(true);
                },
                fail: (error: any) => {
                    console.log("静默登录失败");
                    this.loginStatus = 'failed';
                    console.error('[TikTokRequired] Silent login failed', error);
                    resolve(false);
                },
            });
        });
        this.loginPromise = loginRequest.then(
            (result) => {
                this.loginPromise = null;
                return result;
            },
            (error) => {
                this.loginPromise = null;
                throw error;
            },
        );

        return this.loginPromise;
    }

    async runShortcutMission(): Promise<TikTokMissionActionResult> {
        if (!this.shouldShowEntries) return this.unavailable('Home screen shortcut is unavailable');

        if (DEV && !this.api && this.config.enableDevMock) {
            return this.grantDevReward('shortcut');
        }

        await this.silentLogin();
        if (!this.canUse('getShortcutMissionReward') || !this.canUse('addShortcut')) {
            return this.unavailable('Please update TikTok to use Home Reward');
        }

        try {
            const canReceiveReward = await this.queryMissionReward('getShortcutMissionReward');
            if (canReceiveReward) return this.grantReward('shortcut');
            if (this.hasClaimed('shortcut')) {
                return { status: 'already_claimed', message: 'Home Reward already claimed' };
            }

            await this.callVoidApi('addShortcut');
            return {
                status: 'started',
                message: 'Added. Reopen from the Home Screen to claim +3 Energy',
            };
        } catch (error) {
            console.error('[TikTokRequired] Home screen shortcut failed', error);
            return { status: 'error', message: 'Home Reward failed. Please try again' };
        }
    }

    async runRevisitMission(): Promise<TikTokMissionActionResult> {
        if (!this.shouldShowEntries) return this.unavailable('Revisit Reward is unavailable');

        if (DEV && !this.api && this.config.enableDevMock) {
            return this.grantDevReward('revisit');
        }

        await this.silentLogin();
        if (!this.canUse('getEntranceMissionReward') || !this.canUse('startEntranceMission')) {
            return this.unavailable('Please update TikTok to use Revisit Reward');
        }

        try {
            const canReceiveReward = await this.queryMissionReward('getEntranceMissionReward');
            if (canReceiveReward) return this.grantReward('revisit');
            if (this.hasClaimed('revisit')) {
                return { status: 'already_claimed', message: 'Revisit Reward already claimed' };
            }

            await this.callVoidApi('startEntranceMission');
            return {
                status: 'started',
                message: 'Open the game from your TikTok Profile to claim +2 Energy',
            };
        } catch (error) {
            console.error('[TikTokRequired] Profile revisit mission failed', error);
            return { status: 'error', message: 'Revisit Reward failed. Please try again' };
        }
    }

    async checkPendingMissionRewards() {
        if (this.checkingRewards || !this.isTikTokRuntime) return;
        this.checkingRewards = true;

        try {
            await this.silentLogin();
            await this.checkAndGrant('shortcut', 'getShortcutMissionReward');
            await this.checkAndGrant('revisit', 'getEntranceMissionReward');
        } finally {
            this.checkingRewards = false;
        }
    }

    private canUse(apiName: string): boolean {
        const api = this.api;
        if (typeof api?.canIUse === 'function') {
            try {
                return !!api.canIUse(apiName);
            } catch (error) {
                console.warn(`[TikTokRequired] canIUse(${apiName}) failed`, error);
            }
        }
        return typeof api?.[apiName] === 'function';
    }

    private queryMissionReward(apiName: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.api[apiName]({
                success: (result: { canReceiveReward?: boolean }) => {
                    resolve(result?.canReceiveReward === true);
                },
                fail: reject,
            });
        });
    }

    private callVoidApi(apiName: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.api[apiName]({ success: resolve, fail: reject });
        });
    }

    private async checkAndGrant(type: TikTokMissionType, apiName: string) {
        if (this.hasClaimed(type) || !this.canUse(apiName)) return;
        try {
            if (await this.queryMissionReward(apiName)) this.grantReward(type);
        } catch (error) {
            console.warn(`[TikTokRequired] ${apiName} check failed`, error);
        }
    }

    private grantReward(type: TikTokMissionType): TikTokMissionActionResult {
        if (this.hasClaimed(type)) {
            return { status: 'already_claimed', message: `${this.rewardName(type)} already claimed` };
        }

        const amount = this.rewardAmount(type);
        try {
            this.callbacks.onGrantReward?.(type, amount);
            sys.localStorage.setItem(CLAIM_STORAGE_KEYS[type], '1');
            return {
                status: 'rewarded',
                message: `${this.rewardName(type)}: +${amount} Energy`,
            };
        } catch (error) {
            console.error('[TikTokRequired] Failed to grant mission reward', error);
            return { status: 'error', message: 'Reward delivery failed. Please try again' };
        }
    }

    private grantDevReward(type: TikTokMissionType): TikTokMissionActionResult {
        if (this.devClaimed.has(type)) {
            return { status: 'already_claimed', message: `${this.rewardName(type)} mock already claimed` };
        }
        this.devClaimed.add(type);
        const amount = this.rewardAmount(type);
        this.callbacks.onGrantReward?.(type, amount);
        return { status: 'rewarded', message: `[DEV] ${this.rewardName(type)}: +${amount} Energy` };
    }

    private hasClaimed(type: TikTokMissionType): boolean {
        return sys.localStorage.getItem(CLAIM_STORAGE_KEYS[type]) === '1';
    }

    private rewardAmount(type: TikTokMissionType): number {
        return type === 'shortcut'
            ? this.config.shortcutRewardTili
            : this.config.revisitRewardTili;
    }

    private rewardName(type: TikTokMissionType): string {
        return type === 'shortcut' ? 'Home Reward' : 'Revisit Reward';
    }

    private unavailable(message: string): TikTokMissionActionResult {
        return { status: 'unavailable', message };
    }

    private onGameShow() {
        if (this.loginStatus === 'failed') void this.silentLogin();
        setTimeout(() => this.checkPendingMissionRewards(), 500);
    }
}

export const tiktokRequiredFeatures = new TikTokRequiredFeatures();
