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
 * Unified ad manager for TikTok Mini Games and the project's legacy mini-game targets.
 * Business code only talks to this class, independent of third-party SDK wrappers.
 */
class AdManager {
    private config: AdPlacementConfig = {
        videoID: '',
        interstitialID: '',
    };

    private rewardedShowing = false;
    private interstitialAd: any = null;
    private lastInterstitialShowTime = 0;
    private readonly interstitialMinInterval = 30 * 1000;

    init(config: AdPlacementConfig) {
        this.config = { ...config };
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
        if (!this.checkInterstitialAd() || this.interstitialAd) return false;
        return Date.now() - this.lastInterstitialShowTime >= this.interstitialMinInterval;
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
            ad = resolved.api.createRewardedVideoAd({ adUnitId: this.config.videoID });
            if (!ad || typeof ad.show !== 'function') {
                throw this.createError('AD_REWARDED_INSTANCE_INVALID', 'Invalid rewarded video instance');
            }
        } catch (error) {
            this.finishRewardedError(options, error);
            return;
        }

        this.rewardedShowing = true;
        let finished = false;

        const cleanup = () => {
            ad.offClose?.(handleClose);
            ad.offError?.(handleError);
        };
        const finish = () => {
            cleanup();
            this.destroyAd(ad);
            this.rewardedShowing = false;
        };
        const handleError = (error: any) => {
            if (finished) return;
            finished = true;
            finish();
            console.error('[AdManager] Rewarded video failed', error);
            options.onError?.(error);
        };
        const handleClose = (result: { isEnded?: boolean } | undefined) => {
            if (finished) return;
            finished = true;
            finish();

            // TikTok rewards only when isEnded is explicitly true. Older WeChat
            // runtimes may omit the result after a completed, non-skippable video.
            const completed = result?.isEnded === true
                || (resolved.source === 'wx' && result === undefined);
            options.onClose?.(completed);
        };

        ad.onClose?.(handleClose);
        ad.onError?.(handleError);

        this.displayAd(ad, resolved)
            .then(() => {
                if (!finished) options.onShow?.();
            })
            .catch(handleError);
    }

    showInterstitialAd(options: InterstitialOptions = {}) {
        if (DEV && !this.hasPlatformRuntime) {
            if (this.interstitialAd) {
                options.onError?.(this.createError(
                    'AD_INTERSTITIAL_ALREADY_SHOWING',
                    'An interstitial ad is already active',
                ));
                return;
            }
            const elapsed = Date.now() - this.lastInterstitialShowTime;
            if (elapsed < this.interstitialMinInterval) {
                options.onError?.(this.createError(
                    'AD_INTERSTITIAL_COOLDOWN',
                    `Interstitial cooldown: ${this.interstitialMinInterval - elapsed}ms remaining`,
                ));
                return;
            }
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
        if (this.interstitialAd) {
            options.onError?.(this.createError(
                'AD_INTERSTITIAL_ALREADY_SHOWING',
                'An interstitial ad is already active',
            ));
            return;
        }

        const elapsed = Date.now() - this.lastInterstitialShowTime;
        if (elapsed < this.interstitialMinInterval) {
            options.onError?.(this.createError(
                'AD_INTERSTITIAL_COOLDOWN',
                `Interstitial cooldown: ${this.interstitialMinInterval - elapsed}ms remaining`,
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

    private displayAd(ad: any, resolved: ResolvedAdApi): Promise<void> {
        if (resolved.needsLoad && typeof ad.load === 'function') {
            return Promise.resolve(ad.load())
                .then(() => ad.show())
                .then((): void => undefined);
        }

        // TikTok Native Mini Games requires show() to remain in the user-action
        // call stack. Evaluating ad.show() before Promise.resolve preserves it.
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