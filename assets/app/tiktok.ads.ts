import { DEV } from 'cc/env';
import type { AdPlacementConfig } from './config.ads';

export interface RewardedVideoOptions {
    onShow?: () => void;
    onError?: (error: any) => void;
    onClose?: (completed: boolean) => void;
}

export interface InterstitialOptions {
    onShow?: () => void;
    onError?: (error: any) => void;
    onClose?: () => void;
}

type AdApiName = 'createRewardedVideoAd' | 'createInterstitialAd';
type AdApiSource = 'TTMinis.game' | 'TTMinis' | 'tt' | 'wx';

interface ResolvedAdApi {
    api: any;
    source: AdApiSource;
    needsLoad: boolean;
}

/**
 * 抖音 / TikTok 小游戏统一广告管理器。
 *
 * 合规约束：
 * - 激励视频只由业务层明确的用户点击触发；
 * - 抖音激励视频全局只保留一个实例；
 * - 插屏启动后 30 秒内不展示，相邻插屏至少间隔 60 秒；
 * - 激励视频结束后的 60 秒内不展示插屏。
 */
class AdManager {
    private config: AdPlacementConfig = {
        videoID: '',
        interstitialID: '',
    };

    private readonly appStartedAt = Date.now();
    private readonly interstitialStartupDelay = 30 * 1000;
    private readonly interstitialMinInterval = 60 * 1000;
    private readonly interstitialAfterRewardedDelay = 60 * 1000;

    private rewardedShowing = false;
    private rewardedAd: any = null;
    private rewardedAdSource: AdApiSource | null = null;
    private interstitialAd: any = null;
    private lastInterstitialShowTime = 0;
    private lastRewardedShowTime = 0;

    init(config: AdPlacementConfig) {
        const placementChanged = this.config.videoID !== config.videoID;
        this.config = { ...config };
        if (placementChanged && this.rewardedAd) {
            this.destroyAd(this.rewardedAd);
            this.rewardedAd = null;
            this.rewardedAdSource = null;
        }
    }

    checkRewardedVideoAd(): boolean {
        if (DEV && !this.hasPlatformRuntime) return true;
        return !!this.config.videoID && !!this.resolveApi('createRewardedVideoAd');
    }

    checkInterstitialAd(): boolean {
        if (DEV && !this.hasPlatformRuntime) return true;
        return !!this.config.interstitialID && !!this.resolveApi('createInterstitialAd');
    }

    canShowInterstitialAd(): boolean {
        return this.checkInterstitialAd()
            && !this.interstitialAd
            && this.getInterstitialWaitMs() <= 0;
    }

    showRewardedVideoAd(options: RewardedVideoOptions = {}) {
        if (this.rewardedShowing) {
            options.onError?.(this.createError(
                'AD_REWARDED_ALREADY_SHOWING',
                'A rewarded video ad is already active',
            ));
            return;
        }

        if (DEV && !this.hasPlatformRuntime) {
            this.rewardedShowing = true;
            setTimeout(() => {
                this.rewardedShowing = false;
                this.lastRewardedShowTime = Date.now();
                options.onShow?.();
                options.onClose?.(true);
            }, 100);
            return;
        }

        if (!this.config.videoID) {
            this.finishRewardedError(options, this.createError(
                'AD_REWARDED_PLACEMENT_MISSING',
                'Rewarded video Placement ID is not configured',
            ));
            return;
        }

        const resolved = this.resolveApi('createRewardedVideoAd');
        if (!resolved) {
            this.finishRewardedError(options, this.createError(
                'AD_REWARDED_API_UNAVAILABLE',
                'Rewarded video API is unavailable',
            ));
            return;
        }

        console.info('[AdManager] Rewarded video show requested', {
            source: resolved.source,
            adUnitId: this.config.videoID,
        });

        let ad: any;
        try {
            ad = this.getOrCreateRewardedAd(resolved);
        } catch (error) {
            this.finishRewardedError(options, error);
            return;
        }

        this.rewardedShowing = true;
        let finished = false;
        const keepInstance = resolved.source === 'tt';

        const cleanup = () => {
            ad.offClose?.(handleClose);
            ad.offError?.(handleError);
        };
        const finish = () => {
            cleanup();
            if (!keepInstance) this.destroyAd(ad);
            this.rewardedShowing = false;
        };
        const handleError = (error: any) => {
            if (finished) return;
            finished = true;
            finish();
            if (keepInstance && this.rewardedAd === ad) {
                this.destroyAd(ad);
                this.rewardedAd = null;
                this.rewardedAdSource = null;
            }
            console.error('[AdManager] Rewarded video failed', error);
            options.onError?.(error);
        };
        const handleClose = (result: { isEnded?: boolean } | undefined) => {
            if (finished) return;
            finished = true;
            finish();

            // 抖音仅在完整播放时发奖；旧微信运行时可能不返回关闭参数。
            const completed = result?.isEnded === true
                || (resolved.source === 'wx' && result === undefined);
            options.onClose?.(completed);
        };

        ad.onClose?.(handleClose);
        ad.onError?.(handleError);

        this.displayAd(ad, resolved)
            .then(() => {
                if (finished) return;
                this.lastRewardedShowTime = Date.now();
                options.onShow?.();
            })
            .catch(handleError);
    }

    showInterstitialAd(options: InterstitialOptions = {}) {
        if (this.interstitialAd) {
            options.onError?.(this.createError(
                'AD_INTERSTITIAL_ALREADY_SHOWING',
                'An interstitial ad is already active',
            ));
            return;
        }

        const waitMs = this.getInterstitialWaitMs();
        if (waitMs > 0) {
            options.onError?.(this.createError(
                'AD_INTERSTITIAL_COOLDOWN',
                `Interstitial cooldown: ${waitMs}ms remaining`,
            ));
            return;
        }

        if (DEV && !this.hasPlatformRuntime) {
            const mockAd = {};
            this.interstitialAd = mockAd;
            setTimeout(() => {
                this.lastInterstitialShowTime = Date.now();
                options.onShow?.();
                if (this.interstitialAd === mockAd) this.interstitialAd = null;
                options.onClose?.();
            }, 100);
            return;
        }

        if (!this.config.interstitialID) {
            options.onError?.(this.createError(
                'AD_INTERSTITIAL_PLACEMENT_MISSING',
                'Interstitial Placement ID is not configured',
            ));
            return;
        }

        const resolved = this.resolveApi('createInterstitialAd');
        if (!resolved) {
            options.onError?.(this.createError(
                'AD_INTERSTITIAL_API_UNAVAILABLE',
                'Interstitial API is unavailable',
            ));
            return;
        }

        let ad: any;
        try {
            ad = resolved.api.createInterstitialAd({ adUnitId: this.config.interstitialID });
            if (!ad || typeof ad.show !== 'function') {
                throw this.createError('AD_INTERSTITIAL_INSTANCE_INVALID', 'Invalid interstitial instance');
            }
            this.interstitialAd = ad;
        } catch (error) {
            options.onError?.(error);
            return;
        }

        let finished = false;
        const cleanup = () => {
            ad.offClose?.(handleClose);
            ad.offError?.(handleError);
            this.destroyAd(ad);
            if (this.interstitialAd === ad) this.interstitialAd = null;
        };
        const handleError = (error: any) => {
            if (finished) return;
            finished = true;
            cleanup();
            console.error('[AdManager] Interstitial failed', error);
            options.onError?.(error);
        };
        const handleClose = () => {
            if (finished) return;
            finished = true;
            cleanup();
            options.onClose?.();
        };

        ad.onClose?.(handleClose);
        ad.onError?.(handleError);

        this.displayAd(ad, resolved)
            .then(() => {
                if (finished) return;
                this.lastInterstitialShowTime = Date.now();
                options.onShow?.();
            })
            .catch(handleError);
    }

    private get runtime(): any {
        return globalThis as any;
    }

    private get hasPlatformRuntime(): boolean {
        return !!this.runtime.TTMinis || !!this.runtime.tt || !!this.runtime.wx;
    }

    private resolveApi(apiName: AdApiName): ResolvedAdApi | null {
        const candidates: ResolvedAdApi[] = [
            { api: this.runtime.TTMinis?.game, source: 'TTMinis.game', needsLoad: false },
            { api: this.runtime.TTMinis, source: 'TTMinis', needsLoad: false },
            { api: this.runtime.tt, source: 'tt', needsLoad: true },
            { api: this.runtime.wx, source: 'wx', needsLoad: true },
        ];
        return candidates.find(({ api }) => typeof api?.[apiName] === 'function') || null;
    }

    private getOrCreateRewardedAd(resolved: ResolvedAdApi): any {
        if (resolved.source === 'tt' && this.rewardedAd && this.rewardedAdSource === 'tt') {
            return this.rewardedAd;
        }

        const ad = resolved.api.createRewardedVideoAd({ adUnitId: this.config.videoID });
        if (!ad || typeof ad.show !== 'function') {
            throw this.createError('AD_REWARDED_INSTANCE_INVALID', 'Invalid rewarded video instance');
        }

        if (resolved.source === 'tt') {
            this.rewardedAd = ad;
            this.rewardedAdSource = resolved.source;
        }
        return ad;
    }

    private getInterstitialWaitMs(): number {
        const now = Date.now();
        const startupRemaining = this.appStartedAt + this.interstitialStartupDelay - now;
        const interstitialRemaining = this.lastInterstitialShowTime > 0
            ? this.lastInterstitialShowTime + this.interstitialMinInterval - now
            : 0;
        const rewardedRemaining = this.lastRewardedShowTime > 0
            ? this.lastRewardedShowTime + this.interstitialAfterRewardedDelay - now
            : 0;
        return Math.max(0, startupRemaining, interstitialRemaining, rewardedRemaining);
    }

    private displayAd(ad: any, resolved: ResolvedAdApi): Promise<void> {
        if (resolved.needsLoad && typeof ad.load === 'function') {
            return Promise.resolve(ad.load())
                .then(() => ad.show())
                .then((): void => undefined);
        }

        // 原生 TikTok 要求 show() 保持在用户点击调用栈中。
        try {
            return Promise.resolve(ad.show()).then((): void => undefined);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    private finishRewardedError(options: RewardedVideoOptions, error: any) {
        this.rewardedShowing = false;
        console.error('[AdManager] Rewarded video failed', error);
        options.onError?.(error);
    }

    private destroyAd(ad: any) {
        try {
            ad?.destroy?.();
        } catch (error) {
            console.warn('[AdManager] Failed to destroy ad instance', error);
        }
    }

    private createError(errorCode: string, errMsg: string) {
        return { errorCode, errCode: errorCode, errMsg };
    }
}

export const adManager = new AdManager();
