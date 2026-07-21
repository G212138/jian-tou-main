/* eslint-disable */
import { Component,director,Director } from 'cc';
import { app } from '../../app/app';
import { EDITOR,EDITOR_NOT_IN_PREVIEW } from 'cc/env';

export type IReadOnly<T> = { readonly [P in keyof T]: T[P] extends Function ? T[P] : (T[P] extends Object ? IReadOnly<T[P]> : T[P]); };

export type IViewName = "PageHome"|"PageMain"|"PageSpLevel"|"PopResult"|"PopSetting"
export type IViewNames = IViewName[]
export type IMiniViewName = "never"
export type IMiniViewNames = IMiniViewName[]
export type IMusicName = "music/bgm"
export type IMusicNames = IMusicName[]
export type IEffectName = "effect/piano/A"|"effect/piano/B"|"effect/Button"|"effect/piano/C"|"effect/piano/D"|"effect/piano/E"|"effect/piano/F"|"effect/piano/G"|"effect/error"|"effect/fail"|"effect/qiaoSui"|"effect/success"
export type IEffectNames = IEffectName[]

import config_eventname from '../app-model/config.eventname'
import config_localkey from '../app-model/config.localkey'
import store_game from '../app-model/store.game'
import {GlobaldataManager} from '../app-manager/globaldata/GlobaldataManager'
import {ReportManager} from '../app-manager/report/ReportManager'
import {TiliManager} from '../app-manager/tili/TiliManager'
import {VibrateManager} from '../app-manager/vibrate/VibrateManager'
import EventManager from '../../../extensions/app/assets/manager/event/EventManager'
import LoaderManager from '../../../extensions/app/assets/manager/loader/LoaderManager'
import SoundManager from '../../../extensions/app/assets/manager/sound/SoundManager'
import TimerManager from '../../../extensions/app/assets/manager/timer/TimerManager'
import UIManager from '../../../extensions/app/assets/manager/ui/UIManager'
export type IApp = {
    Controller: {},
    controller: {},
    Manager: {Globaldata:Omit<typeof GlobaldataManager,keyof Component>,Report:Omit<typeof ReportManager,keyof Component>,Tili:Omit<typeof TiliManager,keyof Component>,Vibrate:Omit<typeof VibrateManager,keyof Component>,Event:Omit<typeof EventManager,keyof Component>,Loader:Omit<typeof LoaderManager,keyof Component>,Sound:Omit<typeof SoundManager,keyof Component>,Timer:Omit<typeof TimerManager,keyof Component>,UI:Omit<typeof UIManager,keyof Component>},
    manager: {globaldata:Omit<GlobaldataManager,keyof Component>,report:Omit<ReportManager,keyof Component>,tili:Omit<TiliManager,keyof Component>,vibrate:Omit<VibrateManager,keyof Component>,event:Omit<EventManager,keyof Component>,loader:Omit<LoaderManager,keyof Component>,sound:Omit<SoundManager<IEffectName,IMusicName>,keyof Component>,timer:Omit<TimerManager,keyof Component>,ui:Omit<UIManager<IViewName,IMiniViewName>,keyof Component>},
    data: {},
    config: {eventname:IReadOnly<config_eventname>,localkey:IReadOnly<config_localkey>}
    store: {game:IReadOnly<store_game>}
}

function init(){
if(!EDITOR||!EDITOR_NOT_IN_PREVIEW) Object.assign(app.config, {eventname:new config_eventname(),localkey:new config_localkey()})
if(!EDITOR||!EDITOR_NOT_IN_PREVIEW) Object.assign(app.data, {})
if(!EDITOR||!EDITOR_NOT_IN_PREVIEW) Object.assign(app.store, {game:new store_game()})

if(!EDITOR||!EDITOR_NOT_IN_PREVIEW) Object.assign(app.Controller, {})
if(!EDITOR||!EDITOR_NOT_IN_PREVIEW) Object.assign(app.controller, {})
}
if(!EDITOR||!EDITOR_NOT_IN_PREVIEW) director.on(Director.EVENT_RESET,init)
if(!EDITOR||!EDITOR_NOT_IN_PREVIEW) init()
