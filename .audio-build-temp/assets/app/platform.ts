export interface PlatformShareOptions {
    title?: string;
    imageUrl?: string;
    query?: string;
}

interface VibrationCallbacks {
    success?: () => void;
    fail?: (error: any) => void;
    complete?: () => void;
}

interface ShortVibrationOptions extends VibrationCallbacks {
    type: 'light' | 'medium' | 'heavy';
}

/** Native sharing and vibration utilities used by business code. */
class PlatformService {
    private menuShareOptions: PlatformShareOptions = {};
    private menuShareRegisteredOn: any = null;

    share(options: PlatformShareOptions = {}) {
        const api = this.resolveApi('shareAppMessage');
        if (!api) {
            console.warn('[PlatformService] shareAppMessage is unavailable');
            return;
        }
        try {
            api.shareAppMessage(options);
        } catch (error) {
            console.error('[PlatformService] Failed to share', error);
        }
    }

    openMenuShare(options: PlatformShareOptions = {}) {
        this.menuShareOptions = { ...options };
        const api = this.resolveApi('onShareAppMessage');
        if (!api || this.menuShareRegisteredOn === api) return;

        this.menuShareRegisteredOn = api;
        try {
            api.updateShareMenu?.({ withShareTicket: true });
            api.showShareMenu?.({
                withShareTicket: true,
                menus: ['shareAppMessage', 'shareTimeline'],
            });
            api.onShareAppMessage(() => ({ ...this.menuShareOptions }));
            api.onShareTimeline?.(() => ({ ...this.menuShareOptions }));
        } catch (error) {
            this.menuShareRegisteredOn = null;
            console.error('[PlatformService] Failed to enable menu sharing', error);
        }
    }

    vibrateShort(options: ShortVibrationOptions = { type: 'light' }) {
        this.callVibration('vibrateShort', options);
    }

    vibrateLong(options: VibrationCallbacks = {}) {
        this.callVibration('vibrateLong', options);
    }

    private get runtime(): any {
        return globalThis as any;
    }

    private resolveApi(methodName: string): any {
        const candidates = [
            this.runtime.TTMinis?.game,
            this.runtime.tt,
            this.runtime.wx,
        ];
        return candidates.find((api) => typeof api?.[methodName] === 'function') || null;
    }

    private callVibration(methodName: 'vibrateShort' | 'vibrateLong', options: VibrationCallbacks) {
        const api = this.resolveApi(methodName);
        if (!api) return;
        try {
            api[methodName](options);
        } catch (error) {
            console.warn(`[PlatformService] ${methodName} failed`, error);
        }
    }
}

export const platformService = new PlatformService();
