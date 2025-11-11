import { Utils } from "../Utils.js";
import { SoundManager } from "../SoundManager.js";
import { Constant } from "../Constant.js";

class GameOverPopup {
    constructor(scene) {
        this.scene = scene;
        this.CreateGameOverPopup(0);
    };

    CreateGameOverPopup(_score) {

        this.gameOverPopupGroup = this.scene.add.group();


        // this.overlay = Utils.SpriteSettingsControl(this.scene, 0, 0, "one_pixel_black", 0, 0, 3000, 3000, "true", this.OverlayPressed);
        // this.overlay.alpha = 0.6;
        // this.base = Utils.SpriteSettingsControl(this.scene, Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2), "popup_base", 0.5, 0.5, Constant.scaleFactor, Constant.scaleFactor);
        // this.gameoverHeading = Utils.SpriteSettingsControl(this.scene, Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 3.2), "gameover_heading", 0.5, 0.5, 0.8 * Constant.scaleFactor, 0.8 * Constant.scaleFactor);
        // this.yourScoreText = this.scene.add.text(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 1.85), "YOUR SCORE : " + _score, yourScoreTextStyle).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        // this.replayButtonContainer = this.scene.add.container(0, 0);
        // this.replayButtonContainer.add([this.replayButton, this.replayText]);
        // this.menuButtonContainer = this.scene.add.container(0, 0);
        // this.menuButtonContainer.add([this.menuButton, this.menuText]);
        // this.replayButton = Utils.SpriteSettingsControl(this.scene, Math.round(Constant.game.config.width / 1.5), Math.round(Constant.game.config.height / 1.4), "button_base", 0.5, 0.5, 0.6 * Constant.scaleFactor, 0.6 * Constant.scaleFactor, "true", this.ReplayButtonPressed, this.ReplayButtonReleased);
        // this.replayText = this.scene.add.text(Math.round(Constant.game.config.width / 1.5), Math.round(Constant.game.config.height / 1.4), "REPLAY", replayTextStyle).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        // this.menuButton = Utils.SpriteSettingsControl(this.scene, Math.round(Constant.game.config.width / 3), Math.round(Constant.game.config.height / 1.4), "button_base", 0.5, 0.5, 0.6 * Constant.scaleFactor, 0.6 * Constant.scaleFactor, "true", this.MenuButtonPressed, this.MenuButtonReleased);
        // this.menuText = this.scene.add.text(Math.round(Constant.game.config.width / 3), Math.round(Constant.game.config.height / 1.4), "MENU", menuTextStyle).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.overlay = this.scene.add.image(0, 0, "one_pixel_black").setOrigin(0);
        this.overlay.alpha = 0.6;
        this.overlay.setInteractive({ useHandCursor: true });
        this.overlay.on('pointerup', this.OverlayPressed, this);
        this.base = this.scene.add.image(0, 0, "popup_base").setOrigin(0.5);

        // this.gameoverHeading = this.scene.add.image(0, 0, "gameover_heading").setOrigin(0.5);

        var yourScoreTextStyle = { fontFamily: 'Poppins_Bold', fontSize: '60px', fill: '#fff', fontStyle: 'bold', align: 'left' };
        this.yourScoreText = this.scene.add.text(0, 0, "YOUR SCORE : ", yourScoreTextStyle).setOrigin(0.5);

        this.replayButton = this.scene.add.image(0, 0, "replay_btn").setOrigin(0.5);
        this.replayButton.setInteractive({ useHandCursor: true });
        this.replayButton.on('pointerdown', this.ReplayButtonPressed, this);
        this.replayButton.on('pointerup', this.ReplayButtonReleased, this);

        var replayTextStyle = { fontFamily: 'Poppins_Bold', fontSize: '46px', fill: '#001754', fontStyle: 'bold', align: 'center' };
        // this.replayText = this.scene.add.text(0, 0, "REPLAY", replayTextStyle).setOrigin(0.5);
        this.adButton = this.scene.add.image(0, 0, "ad_icon").setOrigin(0.5);

        // this.playAdBtn.on("pointerdown", this.AdButtonPressed, this);
        // this.playAdBtn.on("pointerup", this.AdButtonReleased, this);


        this.menuButton = this.scene.add.image(0, 0, "menu_btn").setOrigin(0.5);
        this.menuButton.setInteractive({ useHandCursor: true });
        this.menuButton.setInteractive({ useHandCursor: true });
        this.menuButton.on('pointerdown', this.MenuButtonPressed, this);
        this.menuButton.on('pointerup', this.MenuButtonReleased, this);

        var menuTextStyle = { fontFamily: 'Poppins_Bold', fontSize: '46px', fill: '#001754', fontStyle: 'bold', align: 'center' };
        // this.menuText = this.scene.add.text(0, 0, "MENU", menuTextStyle).setOrigin(0.5);
        this.gameOverPopupGroup.add(this.overlay);
        this.gameOverPopupGroup.add(this.base);
        // this.gameOverPopupGroup.add(this.gameoverHeading);
        this.gameOverPopupGroup.add(this.yourScoreText);
        this.gameOverPopupGroup.add(this.replayButton);
        this.gameOverPopupGroup.add(this.menuButton);
        this.gameOverPopupGroup.add(this.adButton);
        // this.gameOverPopupGroup.add(this.menuText);

        // this.base.setAlpha(0);
        this.gameOverPopupGroup.setDepth(2);
        this.gameOverPopupGroup.setVisible(false);
        // this.scene.gameOverPopup.ShowPopup(this.base)

    }


    ShowPopup(_refImage) {

        var alphaTween = this.scene.add.tween({
            targets: [_refImage],
            alpha: 1,
            ease: 'Linear',
            duration: 300
        });
    }
    ShowGameOverPopup(_score) {
        this.yourScoreText.setText("YOUR SCORE : " + _score);
        this.gameOverPopupGroup.setVisible(true);
    }

    HideGameOverPopup() {
        this.gameOverPopupGroup.setVisible(false);
    }


    ReplayButtonPressed() {
        this.scene.adHitFrom = 'reload';
        let newScale = Utils.getScale(1080, 1920, window.innerWidth, window.innerHeight);
        Utils.ButtonScaleTween(this.scene, this.replayButton, newScale);
        // Utils.ButtonScaleTween(this.scene, this.replayText, newScale);
        SoundManager.PlayButtonClickSound();
    }

    ReplayButtonReleased() {
        this.HideGameOverPopup();
        this.scene.ShowAd();
        // setTimeout(() => {
        //     this.HideGameOverPopup();
        //     // Constant.game.scene.stop('GameScene');
        //     // Constant.game.scene.start('GameScene');
        //     this.scene.scene.restart('GameScene');
        // }, 100);
    }

    MenuButtonPressed() {
        let newScale = Utils.getScale(1080, 1920, window.innerWidth, window.innerHeight);
        Utils.ButtonScaleTween(this.scene, this.menuButton, newScale);
        // Utils.ButtonScaleTween(this.scene, this.menuText, newScale);
        SoundManager.PlayButtonClickSound();
    }

    MenuButtonReleased() {
        setTimeout(() => {
            this.HideGameOverPopup();
            Constant.game.scene.stop('GameScene');
            Constant.game.scene.start('TitleScene');
        }, 100);
    }

    OverlayPressed() { }

    Resize(newWidth, newHeight, offsetWidth) {
        let newScale = Utils.getScale(1080, 1920, newWidth, newHeight);
        this.overlay.setDisplaySize(newWidth, newHeight);
        this.base.setScale(newScale);
        this.base.setPosition(newWidth / 2, newHeight / 2);
        // this.gameoverHeading.setScale(newScale * 0.8);
        // this.gameoverHeading.setPosition(this.base.x, this.base.y - 500 * newScale);
        this.yourScoreText.setScale(newScale);
        this.yourScoreText.setPosition(this.base.x, this.base.y)
        this.replayButton.setScale(newScale);
        this.replayButton.setPosition(this.base.x + 185 * newScale, this.base.y + 225 * newScale);
        this.adButton.setScale(newScale);
        this.adButton.setPosition(this.replayButton.x + this.replayButton.displayWidth / 2 - 25 * newScale, this.replayButton.y - this.replayButton.displayHeight / 2 + 20 * newScale);
        this.menuButton.setScale(newScale);
        this.menuButton.setPosition(this.base.x - 185 * newScale, this.base.y + 225 * newScale);

        // this.replayText.setScale(newScale);
        // this.replayText.setPosition(this.replayButton.x, this.replayButton.y);
        // this.menuText.setScale(newScale);
        // this.menuText.setPosition(this.menuButton.x + 10 * newScale, this.menuButton.y);
    }

};

export default GameOverPopup;