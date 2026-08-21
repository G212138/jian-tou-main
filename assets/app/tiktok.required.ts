import { Game, game, sys } from 'cc';
import { DEV } from 'cc/env';
import {
    TIKTOK_REQUIRED_FEATURE_CONFIG,
    TikTokRequiredFeatureConfig,
} from './config.tiktok';
import { i18n } from './i18n';

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

interface DouyinLaunchOptions {
    scene?: string | number;
    launch_from?: string;
    location?: string;
    query?: Record<string, string>;
}

const CLAIM_STORAGE_KEYS: Record<TikTokMissionType, string> = {
    shortcut: 'TIKTOK_SHORTCUT_REWARD_CLAIMED',
    revisit: 'DOUYIN_SIDEBAR_REWARD_CLAIMED_DATE',
};

const DOUYIN_SIDEBAR_SCENES = new Set(['021012', '021036', '101036']);

/**
 * Platform features used by the Douyin and TikTok builds.
 *
 * Douyin review requires the sidebar revisit flow. The listener is registered
 * as soon as this module is evaluated, and getLaunchOptionsSync is used as a
 * cold-start fallback so a sidebar launch is not lost before the UI is ready.
 * International TikTok Native Mini Games keep their shortcut/profile missions.
 */
class TikTokRequiredFeatures {
    private config: TikTokRequiredFeatureConfig = TIKTOK_REQUIRED_FEATURE_CONFIG;
    private callbacks: TikTokRequiredCallbacks = {};
    private initialized = false;
    private earlyHooksInstalled = false;
    private platformLoggedIn = false;
    private loginPromise: Promise<boolean> | null = null;
    private checkingRewards = false;
    private devClaimed = new Set<TikTokMissionType>();
    private latestDouyinLaunch: DouyinLaunchOptions | null = null;
    private douyinSidebarSupported = false;
    private sidebarCapabilityPromise: Promise<boolean> | null = null;

    loginStatus: TikTokLoginStatus = 'idle';

    constructor() {
        this.installEarlyPlatformHooks();
    }

    private get runtime(): any {
        return globalThis as any;
    }

    private get nativeApi(): any {
        return this.runtime.TTMinis?.game || null;
    }

    private get douyinApi(): any {
        return this.runtime.tt || null;
    }

    private get missionApi(): any {
        return this.nativeApi || this.douyinApi;
    }

    get isDouyinRuntime(): boolean {
        if (!this.douyinApi) return false;
        if (!this.nativeApi) return true;

        try {
            const appName = String(this.douyinApi.getSystemInfoSync?.()?.appName || '').toLowerCase();
            return appName.includes('douyin')
                || appName.includes('toutiao')
                || appName.includes('xigua');
        } catch (_error) {
            return false;
        }
    }

    get isTikTokRuntime(): boolean {
        const platform = sys.platform as any;
        const platforms = sys.Platform as any;
        return !!this.nativeApi
            || !!this.douyinApi
            || platform === platforms.BYTEDANCE_MINI_GAME
            || platform === platforms.BYTEDANCE_GAME;
    }

    get shouldShowShortcutEntry(): boolean {
        if (DEV && !this.missionApi && this.config.enableDevMock) return true;
        if (this.isDouyinRuntime) return false;
        return this.canUseOn(this.nativeApi, 'getShortcutMissionReward')
            && this.canUseOn(this.nativeApi, 'addShortcut');
    }

    get shouldShowRevisitEntry(): boolean {
        if (DEV && !this.missionApi && this.config.enableDevMock) return true;
        if (this.isDouyinRuntime) return this.douyinSidebarSupported;
        return this.canUseOn(this.nativeApi, 'getEntranceMissionReward')
            && this.canUseOn(this.nativeApi, 'startEntranceMission');
    }

    get shouldShowEntries(): boolean {
        return this.shouldShowShortcutEntry || this.shouldShowRevisitEntry;
    }

    get isSidebarTaskCompleted(): boolean {
        return this.isDouyinRuntime && this.isDouyinSidebarLaunch(this.latestDouyinLaunch);
    }

    get isSidebarRewardClaimed(): boolean {
        return this.isDouyinRuntime && this.hasClaimed('revisit');
    }

    initialize(
        callbacks: TikTokRequiredCallbacks,
        config: TikTokRequiredFeatureConfig = TIKTOK_REQUIRED_FEATURE_CONFIG,
    ) {
        this.callbacks = callbacks;
        this.config = config;
        this.installEarlyPlatformHooks();

        if (this.initialized || (!this.isTikTokRuntime && !(DEV && this.config.enableDevMock))) return;
        this.initialized = true;
        game.on(Game.EVENT_SHOW, this.onGameShow, this);

        void this.refreshCapabilities();
        void this.silentLogin();
        void this.checkPendingMissionRewards();
    }

    async refreshCapabilities(): Promise<boolean> {
        if (DEV && !this.missionApi && this.config.enableDevMock) return true;
        if (!this.isDouyinRuntime) return this.shouldShowEntries;
        if (this.sidebarCapabilityPromise) return this.sidebarCapabilityPromise;

        const api = this.douyinApi;
        if (typeof api?.checkScene !== 'function' || typeof api?.navigateToScene !== 'function') {
            this.douyinSidebarSupported = false;
            return false;
        }

        this.sidebarCapabilityPromise = new Promise<boolean>((resolve) => {
            api.checkScene({
                scene: 'sidebar',
                success: (result: { isExist?: boolean }) => {
                    this.douyinSidebarSupported = result?.isExist === true;
                    resolve(this.douyinSidebarSupported);
                },
                fail: (error: any) => {
                    this.douyinSidebarSupported = false;
                    console.warn('[DouyinRequired] tt.checkScene(sidebar) failed', error);
                    resolve(false);
                },
            });
        }).then((supported) => {
            this.sidebarCapabilityPromise = null;
            return supported;
        });

        return this.sidebarCapabilityPromise;
    }

    async silentLogin(): Promise<boolean> {
        if (this.platformLoggedIn) return true;
        if (this.loginPromise) return this.loginPromise;

        const api = this.isDouyinRuntime ? this.douyinApi : this.missionApi;
        if (DEV && !api && this.config.enableDevMock) {
            this.platformLoggedIn = true;
            this.loginStatus = 'mock';
            return true;
        }

        if (typeof api?.login !== 'function') {
            this.loginStatus = 'failed';
            console.warn('[PlatformLogin] login API is unavailable');
            return false;
        }

        this.loginStatus = 'logging_in';
        const loginOptions: any = {
            success: (result: { code?: string; anonymousCode?: string; isLogin?: boolean }) => {
                const sessionAvailable = !!result?.code
                    || !!result?.anonymousCode
                    || typeof result?.isLogin === 'boolean';
                this.platformLoggedIn = sessionAvailable;
                this.loginStatus = sessionAvailable ? 'authenticated' : 'failed';
                this.resolveLogin?.(sessionAvailable);
            },
            fail: (error: any) => {
                this.loginStatus = 'failed';
                console.warn('[PlatformLogin] silent login failed', error);
                this.resolveLogin?.(false);
            },
        };

        // Douyin defaults force=true, which may display a login dialog at startup.
        // This offline game does not require identity, so keep the check silent.
        if (this.isDouyinRuntime) loginOptions.force = false;

        this.loginPromise = new Promise<boolean>((resolve) => {
            this.resolveLogin = resolve;
            try {
                api.login(loginOptions);
            } catch (error) {
                this.loginStatus = 'failed';
                console.warn('[PlatformLogin] login call failed', error);
                resolve(false);
            }
        }).then((result) => {
            this.resolveLogin = null;
            this.loginPromise = null;
            return result;
        });

        return this.loginPromise;
    }

    private resolveLogin: ((result: boolean) => void) | null = null;

    async runShortcutMission(): Promise<TikTokMissionActionResult> {
        if (DEV && !this.missionApi && this.config.enableDevMock) {
            return this.grantDevReward('shortcut');
        }
        if (this.isDouyinRuntime || !this.shouldShowShortcutEntry) {
            return this.unavailable(i18n.t('tiktok.home_unavailable'));
        }

        await this.silentLogin();
        try {
            const canReceiveReward = await this.queryMissionReward('getShortcutMissionReward');
            if (canReceiveReward) return this.grantReward('shortcut');
            if (this.hasClaimed('shortcut')) {
                return { status: 'already_claimed', message: i18n.t('tiktok.home_claimed') };
            }

            await this.callVoidApi('addShortcut');
            return { status: 'started', message: i18n.t('tiktok.home_started') };
        } catch (error) {
            console.error('[TikTokRequired] Home screen shortcut failed', error);
            return { status: 'error', message: i18n.t('tiktok.home_failed') };
        }
    }

    async runRevisitMission(): Promise<TikTokMissionActionResult> {
        if (DEV && !this.missionApi && this.config.enableDevMock) {
            return this.grantDevReward('revisit');
        }
        if (this.isDouyinRuntime) return this.runDouyinSidebarMission();
        if (!this.shouldShowRevisitEntry) {
            return this.unavailable(i18n.t('tiktok.revisit_unavailable'));
        }

        await this.silentLogin();
        try {
            const canReceiveReward = await this.queryMissionReward('getEntranceMissionReward');
            if (canReceiveReward) return this.grantReward('revisit');
            if (this.hasClaimed('revisit')) {
                return { status: 'already_claimed', message: i18n.t('tiktok.revisit_claimed') };
            }

            await this.callVoidApi('startEntranceMission');
            return { status: 'started', message: i18n.t('tiktok.revisit_started') };
        } catch (error) {
            console.error('[TikTokRequired] Profile revisit mission failed', error);
            return { status: 'error', message: i18n.t('tiktok.revisit_failed') };
        }
    }

    async checkPendingMissionRewards() {
        if (this.checkingRewards || !this.isTikTokRuntime) return;
        this.checkingRewards = true;

        try {
            if (this.isDouyinRuntime) {
                // 返回游戏后显示“立即领奖”，由用户主动点击完成奖励领取。
                return;
            }

            await this.silentLogin();
            await this.checkAndGrant('shortcut', 'getShortcutMissionReward');
            await this.checkAndGrant('revisit', 'getEntranceMissionReward');
        } finally {
            this.checkingRewards = false;
        }
    }

    private async runDouyinSidebarMission(): Promise<TikTokMissionActionResult> {
        const supported = await this.refreshCapabilities();
        if (!supported) return this.unavailable(i18n.t('tiktok.revisit_unavailable'));
        if (this.hasClaimed('revisit')) {
            return { status: 'already_claimed', message: i18n.t('tiktok.revisit_claimed') };
        }
        if (this.isDouyinSidebarLaunch(this.latestDouyinLaunch)) {
            return this.grantReward('revisit');
        }

        return new Promise<TikTokMissionActionResult>((resolve) => {
            this.douyinApi.navigateToScene({
                scene: 'sidebar',
                success: () => resolve({
                    status: 'started',
                    message: i18n.t('tiktok.revisit_started'),
                }),
                fail: (error: any) => {
                    console.error('[DouyinRequired] tt.navigateToScene(sidebar) failed', error);
                    resolve({ status: 'error', message: i18n.t('tiktok.revisit_failed') });
                },
            });
        });
    }

    private installEarlyPlatformHooks() {
        if (this.earlyHooksInstalled) return;
        const api = this.douyinApi;
        if (!api) return;

        this.earlyHooksInstalled = true;
        try {
            this.latestDouyinLaunch = api.getLaunchOptionsSync?.() || null;
        } catch (error) {
            console.warn('[DouyinRequired] getLaunchOptionsSync failed', error);
        }

        if (typeof api.onShow === 'function') {
            api.onShow((options: DouyinLaunchOptions) => {
                this.latestDouyinLaunch = options || null;
                if (this.initialized) setTimeout(() => void this.checkPendingMissionRewards(), 0);
            });
        }
    }

    private isDouyinSidebarLaunch(options: DouyinLaunchOptions | null): boolean {
        if (!options) return false;
        const scene = String(options.scene ?? '').padStart(6, '0');
        return DOUYIN_SIDEBAR_SCENES.has(scene)
            || (options.launch_from === 'homepage' && options.location === 'sidebar_card');
    }

    private canUseOn(api: any, apiName: string): boolean {
        if (!api) return false;
        if (typeof api.canIUse === 'function') {
            try {
                return !!api.canIUse(apiName);
            } catch (error) {
                console.warn('[PlatformRequired] canIUse(' + apiName + ') failed', error);
            }
        }
        return typeof api[apiName] === 'function';
    }

    private queryMissionReward(apiName: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.nativeApi[apiName]({
                success: (result: { canReceiveReward?: boolean }) => {
                    resolve(result?.canReceiveReward === true);
                },
                fail: reject,
            });
        });
    }

    private callVoidApi(apiName: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.nativeApi[apiName]({ success: resolve, fail: reject });
        });
    }

    private async checkAndGrant(type: TikTokMissionType, apiName: string) {
        if (this.hasClaimed(type) || !this.canUseOn(this.nativeApi, apiName)) return;
        try {
            if (await this.queryMissionReward(apiName)) this.grantReward(type);
        } catch (error) {
            console.warn('[TikTokRequired] ' + apiName + ' check failed', error);
        }
    }

    private grantReward(type: TikTokMissionType): TikTokMissionActionResult {
        if (this.hasClaimed(type)) {
            return {
                status: 'already_claimed',
                message: i18n.t(type === 'shortcut' ? 'tiktok.home_claimed' : 'tiktok.revisit_claimed'),
            };
        }

        const amount = this.rewardAmount(type);
        try {
            this.callbacks.onGrantReward?.(type, amount);
            const claimValue = type === 'revisit' && this.isDouyinRuntime
                ? this.localDayKey()
                : '1';
            sys.localStorage.setItem(CLAIM_STORAGE_KEYS[type], claimValue);
            return {
                status: 'rewarded',
                message: i18n.t('tiktok.reward_granted', { name: this.rewardName(type), amount }),
            };
        } catch (error) {
            console.error('[PlatformRequired] Failed to grant mission reward', error);
            return { status: 'error', message: i18n.t('tiktok.delivery_failed') };
        }
    }

    private grantDevReward(type: TikTokMissionType): TikTokMissionActionResult {
        if (this.devClaimed.has(type)) {
            return { status: 'already_claimed', message: this.rewardName(type) + ' mock already claimed' };
        }
        this.devClaimed.add(type);
        const amount = this.rewardAmount(type);
        this.callbacks.onGrantReward?.(type, amount);
        return { status: 'rewarded', message: '[DEV] ' + this.rewardName(type) + ': +' + amount + ' Energy' };
    }

    private hasClaimed(type: TikTokMissionType): boolean {
        const value = sys.localStorage.getItem(CLAIM_STORAGE_KEYS[type]);
        if (type === 'revisit' && this.isDouyinRuntime) return value === this.localDayKey();
        return value === '1';
    }

    private localDayKey(): string {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return year + '-' + month + '-' + day;
    }

    private rewardAmount(type: TikTokMissionType): number {
        return type === 'shortcut'
            ? this.config.shortcutRewardTili
            : this.config.revisitRewardTili;
    }

    private rewardName(type: TikTokMissionType): string {
        return i18n.t(type === 'shortcut' ? 'tiktok.home_reward' : 'tiktok.revisit_reward');
    }

    private unavailable(message: string): TikTokMissionActionResult {
        return { status: 'unavailable', message };
    }

    private onGameShow() {
        if (this.loginStatus === 'failed') void this.silentLogin();
        setTimeout(() => void this.checkPendingMissionRewards(), 200);
    }
}

export const tiktokRequiredFeatures = new TikTokRequiredFeatures();
