import { Utils } from "../Utils.js";
import { SoundManager } from "../SoundManager.js";
import { Constant } from "../Constant.js";
import { Server } from "../Server.js";
import { PlayzhubEventHandler } from "../PlayzhubEventHandler.js";

class QuitPopup {
    constructor(scene) {
        this.scene = scene;
        this.CreateQuitPopup();
    };

    CreateQuitPopup() {
        this.quitPopupGroup = this.scene.add.group();

        // this.overlay = Utils.SpriteSettingsControl(this.scene, 0, 0, "one_pixel_black", 0, 0, 3000, 3000, "true", this.OverlayPressed);
        // this.overlay.alpha = 0.6;

        // this.base = Utils.SpriteSettingsControl(this.scene, Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2), "quit_base", 0.5, 0.5, Constant.scaleFactor, Constant.scaleFactor);
        // this.quitText = this.scene.add.text(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2.27), "DO YOU WANT TO QUIT ?", quitTextStyle).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        // this.yesButton = Utils.SpriteSettingsControl(this.scene, Math.round(Constant.game.config.width / 3.27), Math.round(Constant.game.config.height / 1.8), "yes_button", 0.5, 0.5, Constant.scaleFactor, Constant.scaleFactor, "true", this.YesButtonPressed, this.YesButtonReleased);
        // this.noButton = Utils.SpriteSettingsControl(this.scene, Math.round(Constant.game.config.width / 1.44), Math.round(Constant.game.config.height / 1.8), "no_button", 0.5, 0.5, Constant.scaleFactor, Constant.scaleFactor, "true", this.NoButtonPressed, this.NoButtonReleased);
        this.overlay = this.scene.add.image(0, 0, "one_pixel_black").setOrigin(0);
        this.overlay.alpha = 0.6;
        this.overlay.setInteractive({ useHandCursor: true });
        this.overlay.on('pointerup', this.OverlayPressed, this);
        this.base = this.scene.add.image(0, 0, "quit_base").setOrigin(0.5);

        var quitTextStyle = { fontFamily: 'Poppins_Bold', fontSize: '56px', fill: '#fff', fontStyle: 'bold', align: 'center' };
        this.quitText = this.replayText = this.scene.add.text(0, 0, "DO YOU WANT TO QUIT ?", quitTextStyle).setOrigin(0.5);

        this.yesButton = this.scene.add.image(0, 0, "yes_button").setOrigin(0.5);
        this.yesButton.setInteractive({ useHandCursor: true });
        this.yesButton.on('pointerdown', this.YesButtonPressed, this);
        this.yesButton.on('pointerup', this.YesButtonReleased, this);

        this.noButton = this.scene.add.image(0, 0, "no_button").setOrigin(0.5);
        this.noButton.setInteractive({ useHandCursor: true });
        this.noButton.on('pointerdown', this.NoButtonPressed, this);
        this.noButton.on('pointerup', this.NoButtonReleased, this);
        this.quitPopupGroup.add(this.overlay);
        this.quitPopupGroup.add(this.base);
        this.quitPopupGroup.add(this.quitText);
        this.quitPopupGroup.add(this.yesButton);
        this.quitPopupGroup.add(this.noButton);

        // this.base.setAlpha(0);
        // this.quitPopupGroup.setAlpha(0);
        this.quitPopupGroup.setDepth(2);
        this.quitPopupGroup.setVisible(false);

        // this.scene.quitPopup.ShowQuitPopup(this.base);
    }

    OverlayPressed() { }

    YesButtonPressed() {
        let newScale = Utils.getScale(1080, 1920, window.innerWidth, window.innerHeight);
        // Server.PostGameOverToParent(Server.timerValue - Constant.timeToEnd);
        // Server.PostGameOuitToParent();
        Utils.ButtonScaleTween(this.scene, this.yesButton, newScale);
        SoundManager.PlayButtonClickSound();
    }

    YesButtonReleased() {
        const currentTimeStamp = Date.now();
        const finalTime = currentTimeStamp - Constant.gameStartTime;
        PlayzhubEventHandler.GamePlayStopped(finalTime / 1000);
        setTimeout(() => {
            // this.scene.CallTheScoreSendAPI();
            Constant.game.scene.stop('GameScene');
            Constant.game.scene.start('TitleScene');
            SoundManager.StopBgMusic();
        }, 300);
    }

    NoButtonPressed() {
        let newScale = Utils.getScale(1080, 1920, window.innerWidth, window.innerHeight);
        Utils.ButtonScaleTween(this.scene, this.noButton, newScale);
        SoundManager.PlayButtonClickSound();
    }

    NoButtonReleased() {
        this.HideQuitPopup();
    }



    ShowQuitPopup() {
        // console.log('show', this.quitPopupGroup);

        this.quitPopupGroup.setVisible(true);
        var alphaTween = this.scene.add.tween({
            targets: [this.quitPopupGroup],
            alpha: 1,
            ease: 'Linear',
            duration: 300
        });
    }
    HideQuitPopup() {
        var alphaTween = this.scene.add.tween({
            targets: [this.quitPopupGroup],
            alpha: 0,
            ease: 'Linear',
            duration: 300,
            onCompleteScope: this,
            onComplete: this.onHideQuitPopup
        });
    }

    onHideQuitPopup() {
        // this.quitPopupGroup.setAlpha(0);
        this.quitPopupGroup.setVisible(false);
        setTimeout(() => {
            this.scene.isGameOver = false;
        }, 320);
    }
    Resize(newWidth, newHeight, offsetWidth) {
        let newScale = Utils.getScale(1080, 1920, newWidth, newHeight);
        this.overlay.setDisplaySize(newWidth, newHeight);
        this.base.setScale(newScale);
        this.base.setPosition(newWidth / 2, newHeight / 2);
        this.quitText.setScale(newScale);
        this.quitText.setPosition(this.base.x, this.base.y - 100 * newScale)
        this.yesButton.setScale(newScale);
        this.yesButton.setPosition(this.base.x - 185 * newScale, this.base.y + 100 * newScale);
        this.noButton.setScale(newScale);
        this.noButton.setPosition(this.base.x + 185 * newScale, this.base.y + 100 * newScale);

    }

};

export default QuitPopup;
