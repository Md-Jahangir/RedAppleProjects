import { SoundManager } from "../SoundManager";
import { Constant } from "../Constant";

class WinPopup {
    constructor(scene) {
        this.scene = scene;
        this.winPopupGroup = null;
        this.CreatePopup();
    };

    CreatePopup() {
        this.winPopupGroup = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height * 2)).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.winPopupGroup.depth = 5;

        // this.overlay = this.scene.add.image(0, 0, "one_pixel_black").setInteractive().setScale(3000, 3000);
        this.overlay = this.scene.add.image(0, 0, "overlay").setInteractive().setScale(1.2);
        this.overlay.on("pointerdown", this.OverlayPressed, this);
        this.overlay.alpha = 0.1;

        // this.rotateBg = this.scene.add.image(0, 240, "win_rotate_bg");

        let messageTextStyle = { fontFamily: Constant.fontName, fontSize: "70px", fill: '#fff', fontStyle: 'bold', align: 'center', wordWrap: { width: Math.round(Constant.game.config.width - 200) }, stroke: '#d83d96', strokeThickness: 16 };
        this.messageText = this.scene.add.text(0, 250, Constant.winMessage, messageTextStyle).setOrigin(0.5, 0.5);

        // let scoreHeadingTextStyle = { fontFamily: Constant.fontName, fontSize: "80px", fill: '#fff', fontStyle: 'bold', align: 'center', wordWrap: { width: Math.round(Constant.game.config.width - 200) }, stroke: '#d83d96', strokeThickness: 16 };
        // this.scoreHeadingText = this.scene.add.text(0, 250, Constant.scoreText, scoreHeadingTextStyle).setOrigin(0.5, 0.5);

        // let scoreTextStyle = { fontFamily: Constant.fontName, fontSize: "90px", fill: '#fff', fontStyle: 'bold', align: 'center', wordWrap: { width: Math.round(Constant.game.config.width - 200) } };
        // this.scoreText = this.scene.add.text(0, 500, "", scoreTextStyle).setOrigin(0.5, 0.5);

        // this.winPopupGroup.add([this.overlay, this.rotateBg, this.messageText]);
        this.winPopupGroup.add([this.overlay, this.messageText]);
        // this.RotateMessageBg();
        // this.ShowWinPopup();
    };

    RotateMessageBg() {
        let angleTween = this.scene.tweens.add({
            targets: this.rotateBg,
            angle: 360,
            ease: 'Linear',
            repeat: -1,
            duration: 5000,
        });
    };

    // SetScore(_score) {
    //     console.log("Constant.timeToEnd: ", Constant.timeToEnd);
    //     this.scoreText.setText(Constant.scoreText + Constant.timeToEnd);
    // };

    ShowWinPopup() {
        SoundManager.PlayWinSound();
        let alphaTween = this.scene.add.tween({
            targets: [this.winPopupGroup],
            y: Math.round(Constant.game.config.height / 2),
            ease: 'Linear',
            duration: 300,
            callbackScope: this,
            onComplete: function (tween) {
            }
        });
    };

    HideWinPopup() {
        let alphaTween = this.scene.add.tween({
            targets: [this.winPopupGroup],
            y: Math.round(Constant.game.config.height * 2),
            ease: 'Linear',
            duration: 300,
            callbackScope: this,
            onComplete: function (tween) {
            }
        });
    };

    OverlayPressed() {
        console.log("win overlay");
    };

};

export default WinPopup;