import { AssetManager, Node, ProgressBar, UIOpacity, _decorator, assetManager, tween } from 'cc';
import BaseAppInit from '../../../extensions/app/assets/base/BaseAppInit';
import { app } from '../../app/app';
import Core from 'db://app/Core';
const { ccclass, property } = _decorator;

@ccclass('AppInit')
export class AppInit extends BaseAppInit {
    @property(Node)
    private logo: Node;

    private InitList = [
        "page-home-res",
        "page-home",
        "page-main-res",
        "page-main",
        "page-sp-level-res",
        "page-sp-level",
    ];

    @property(ProgressBar)
    private progressBar: ProgressBar;

    /**
    * 获得用户资源总量，这里返回几，就需要用户自行调用几次nextInit
    */
    protected getUserAssetNum(): number {
        return this.InitList.length;
    }

    protected onLoad() {
        // 执行初始化操作
        const opacity = this.logo.getComponent(UIOpacity);
        opacity.opacity = 255;
        this.initRes();
    }

    protected onProgress(completed: number, total: number) {
        // 执行进度操作
        console.log(`AppInit进度: ${completed}/${total}`);
        this.progressBar.progress = completed / total;
    }

    private initRes() {
        const self = this;
        const task = Core.inst.lib.task.createAny();
        this.InitList.forEach((item) => {
           task.add(next => {
                self.preloadRes(item).then(() => {
                    // self.progressBar.progress = 0;
                    next();
                })
            });
        });
        task.start();
    }

    protected onFinish() {
        //判断是不是新用户
        if (app.manager.globaldata.newUser) {
            // 是新用户，直接进入第一关
            app.manager.ui.show({name:"PageMain"});
            app.manager.globaldata.setNewUser(false);
        }
        // 执行完成操作
        this.node.destroy();
    }

    private preloadRes(name: string) {
        return new Promise((resolve, reject) => {
        const self = this;
        assetManager.loadBundle(name, (err: Error, bundle: AssetManager.Bundle) => {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            bundle.loadDir("", function (finished: number, total: number, item) {
                // self.progressBar.progress = finished / total;
                // console.log(name,finished,total);
            }, function (err, assets) {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(assets); 
                self.nextInit();
            });
        });

        }
        )
    }
}