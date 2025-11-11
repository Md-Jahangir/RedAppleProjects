import Button from "../class/Button";
// import { Server } from "../Services/Server";
// import { Constant } from "../Constant";
import Texture from "../gameObjectsClass/Texture";
// import { PlayzhubEventHandler } from "../../lib/PlayzhubEventHandler";
import { PlayzhubEventHandler } from "../PlayzhubEventHandler";
import { SoundManager } from "../SoundManager";

export default class QuitPopup {
    constructor(scene) {
        this.scene = scene;
        this.quitPopupContainer = null;
        this.create();
    }
    create() {
        this.popupBg = new Texture(this.scene, 0, 0, 'transp');
        this.popupBg.setAlpha(1).setInteractive().setVisible(false).setDepth(3);
        this.quitPopupContainer = this.scene.add.container(0, 0).setVisible(false).setDepth(4);
        // this.quitPopupBase = new Texture(this.scene, 0, -200, 'quit_popup_base');
        // this.quitPopupBase.SetOrigin(0.5);
        this.yesBut = new Button(this.scene, 'yes_but', 1);
        this.yesBut.button.SetPosition(-120, -60)
        this.yesBut.button.SetOrigin(0.5);
        this.yesBut.button.SetScale(0.1);
        this.yesBut.setClickcallback(this.YesButFunc, this.scene, null);
        this.noBut = new Button(this.scene, 'no_but', 1);
        this.noBut.button.SetPosition(120, -60);
        this.noBut.button.SetOrigin(0.5);
        this.noBut.button.SetScale(0.1);
        this.noBut.setClickcallback(this.NoButFunc, this, null);
        this.quitPopupContainer.add([this.yesBut.button, this.noBut.button]);
    }
    YesButFunc() {
        // this.RestartGameControl();
        let consumedTime = this.ConsumedTimeCalculateFunc();
        // Server.PostGameOuitToParent(consumedTime, Constant.score);
        PlayzhubEventHandler.GamePlayStopped(consumedTime);
        this.scene.stop('GameScene');
        this.scene.start('MenuScene', { "playCount": 1 });
    }
    NoButFunc() {
        this.scene.cameras.main.fadeIn(500);
        this.VisibleControl(false);
        // this.yesBut.button.setScale(0.1);
        // this.noBut.button.setScale(0.1);
        this.scene.popupanimContainer.setVisible(false);
        this.scene.popupAnim.setAnimation(0, 'quit_appear', false);
        SoundManager.IsPlayGameBgMusic();
    }
    VisibleControl(isVisible) {
        this.quitPopupContainer.setVisible(isVisible);
        if (isVisible) {
            this.ButtonAnim([this.yesBut.button, this.noBut.button], 1.25, 250, 0)
        }
        else {
            this.popupBg.setVisible(isVisible);
        }
    }
    ButtonAnim(_target, _scale, _time, _rotation) {
        this.scene.tweens.add({
            targets: _target,
            scaleX: _scale,
            scaleY: _scale,
            alpha: 1,
            duration: _time,
            rotation: Phaser.Math.DegToRad(_rotation),
            ease: 'Power2',
            onComplete: () => {
                if (_time === 250) {
                    this.ButtonAnim(_target, 1, 50, 0);
                }
            }
        });
    }
    PopupBaseAnimControl(_isVisible) {
        this.scene.popupAnim.y = -180;
        // this.scene.popupAnim.setPosition(this.scene.popupAnimPos.x, this.scene.popupAnimPos.y);
        this.popupBg.setVisible(_isVisible);
        this.scene.popupanimContainer.setVisible(_isVisible);
        this.scene.popupAnim.setAnimation(0, 'quit_appear', false);
        this.scene.popupAnim.on('complete', () => {
            this.scene.popupAnim.setAnimation(0, "quit_loop", true);
            this.VisibleControl(_isVisible);
            this.scene.popupAnim.off('complete', null, this);
        }, this);
    }
    Resize(_newWidth, _newHeight, _newScale) {
        this.popupBg.SetDisplay(_newWidth, _newHeight);
        this.quitPopupContainer.setScale(_newScale);
        this.quitPopupContainer.setPosition(_newWidth / 2, _newHeight / 2);
    }
}