import Button from "../class/Button";
import Texture from "../gameObjectsClass/Texture";
import * as GA from "gameanalytics";

export default class PausePopup {
    constructor(scene) {
        this.scene = scene;
        this.pausePopupContainer = null;
        this.create();
    }
    create() {
        this.PausePopupBg = new Texture(this.scene, 0, 0, 'preload-bg');
        this.PausePopupBg.setAlpha(0.2).setInteractive().setVisible(false);
        this.pausePopupContainer = this.scene.add.container(window.innerWidth / 2, window.innerHeight / 2).setVisible(false).setDepth(4);
        this.resumeBut = new Button(this.scene, 'playBut', 1);
        this.resumeBut.button.SetOrigin(0.5);
        this.resumeBut.button.SetPosition(0, 0)
        this.resumeBut.setClickcallback(this.VisibleControl, this, [false]);
        this.backlvlBut = new Button(this.scene, 'backlvlBut', 1);
        this.backlvlBut.button.SetPosition(-100, -200);
        this.backlvlBut.SetScale(2);
        this.backlvlBut.button.SetOrigin(0.5);
        this.backlvlBut.setClickcallback(this.BackLvlButFunc, this.scene, null);
        this.replaylvlBut = new Button(this.scene, 'reload-but', 1);
        this.replaylvlBut.button.SetPosition(100, -200);
        this.replaylvlBut.SetScale(2);
        this.replaylvlBut.button.SetOrigin(0.5);
        this.replaylvlBut.setClickcallback(this.ReplayLevelFunc, this.scene, [this.scene.gameInfo]);
        this.pausePopupContainer.add([this.resumeBut.button, this.backlvlBut.button, this.replaylvlBut.button]);
    }
    BackLvlButFunc() {
        GA.GameAnalytics.addDesignEvent("ui:back_clicked");
        this.scene.stop('GameScene');
        this.scene.start('MenuScene', { "playCount": 1 });
    }
    ReplayLevelFunc(Data) {
        GA.GameAnalytics.addDesignEvent("ui:replay_clicked");
        this.scene.stop('GameScene');
        this.scene.start('GameScene', {
            level: Data.level,
            stars: Data.stars,
            gameOption: Data.gameOption
        });
    }
    VisibleControl(isTrue) {
        // console.log('--', isTrue);
        GA.GameAnalytics.addDesignEvent("ui:resume_clicked");
        this.scene.isGamePause = false;
        this.scene.matter.world.resume();
        this.PausePopupBg.setVisible(isTrue);
        this.pausePopupContainer.setVisible(isTrue);
    }
    Resize(newWidth, newHeight, newScale) {
        this.PausePopupBg.SetDisplay(newWidth, newHeight);
        this.pausePopupContainer.setScale(newScale);
        this.pausePopupContainer.setPosition(newWidth / 2, newHeight / 2);
    }
}