import { _decorator } from 'cc';
import BaseManager from '../../../../extensions/app/assets/base/BaseManager';
import storage from '../../../../extensions/app/assets/lib/storage/storage';
import { platformService } from '../../../app/platform';
const { ccclass, property } = _decorator;
@ccclass('VibrateManager')
export class VibrateManager extends BaseManager {

   private VibrateMuteCacheKey = 'VibrateMute';

   private vibrateMute: boolean = false;

   //上次震动时间
   private lastVibrateTime: number = 0;

   // [无序] 加载完成时触发
   protected onLoad() { }

   // [无序] 自身初始化完成, init执行完毕后被调用
   protected onInited() { 
       const VibrateMute = storage.get(this.VibrateMuteCacheKey) === true;
       this.vibrateMute = VibrateMute;
   }

   public get isVibrateMute() {
       return this.vibrateMute;
   }

   public setVibrateMute(vibrate: boolean) {
       this.vibrateMute = vibrate;
       storage.set(this.VibrateMuteCacheKey, this.vibrateMute);
   }

   public playVibrate() {
       if (!this.vibrateMute) {
           // platformService.vibrateShort();
           platformService.vibrateLong();
       }
   }

   public playVibrateHeavy() {
       if (!this.vibrateMute) {
           platformService.vibrateShort({ type: 'heavy' });
       }
   }

   public playVibrateShort() {
       //控制一秒只震动一次
    //    const now = Date.now();
    //    if (now - this.lastVibrateTime < 300) {
    //        return;
    //    }
    //    this.lastVibrateTime = now;
       if (!this.vibrateMute) {
           platformService.vibrateShort({type:'light'});
       }
   }


   // [无序] 所有manager初始化完成
   protected onFinished() { }

   // [无序] 初始化manager，在初始化完成后，调用finish方法
   protected init(finish: Function) {
       super.init(finish);
   }
}