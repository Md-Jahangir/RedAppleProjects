import { Utils } from "../Utils.js";
import { SoundManager } from "../SoundManager.js";
import { Constant } from "../Constant.js";
import * as GA from "gameanalytics";

class InstructionPopup {
    constructor(scene) {
        this.scene = scene;
    };

    CreateInstructionPopup() {
        this.instructionPopupGroup = this.scene.add.group();
        this.overlay = this.scene.add.image(0, 0, "one_pixel_black").setOrigin(0);
        this.overlay.alpha = 0.6;
        this.overlay.setInteractive({ useHandCursor: true });
        this.overlay.on('pointerup', this.OverlayPressed, this);

        var tapTextStyle = { fontFamily: 'Poppins_Bold', fontSize: '65px', fill: '#fff', fontStyle: 'bold', align: 'center' };
        this.tapText = this.scene.add.text(0, 0, 'TAP TO THROW THE KNIFE', tapTextStyle).setOrigin(0.5);

        this.hand = this.scene.add.sprite(0, 0, "hand").setOrigin(0.5);
        this.scene.anims.create({
            key: "hand_tap",
            frameRate: 15,
            repeat: -1,
            frames: this.scene.anims.generateFrameNumbers("hand", { start: 0, end: 11 }),
        });
        setTimeout(() => {
            this.hand.play("hand_tap");
        }, 500);

        this.instructionPopupGroup.add(this.overlay);
        this.instructionPopupGroup.add(this.tapText);
        this.instructionPopupGroup.add(this.hand);

        this.instructionPopupGroup.setDepth(2);
    }

    OverlayPressed() {
        GA.GameAnalytics.addDesignEvent("ui:taptoplay_clicked");
        this.HideInstructionPopup();
    }

    YesButtonPressed() {
        Utils.ButtonScaleTween(this.scene.scene, this.scene.scene.quitPopup.yesButton, Constant.scaleFactor);
        SoundManager.PlayButtonClickSound();
    }

    YesButtonReleased() {
        setTimeout(() => {
            Constant.game.scene.stop('GameScene');
            Constant.game.scene.start('TitleScene');
            SoundManager.StopBgMusic();
        }, 100);
    }

    NoButtonPressed() {
        Utils.ButtonScaleTween(this.scene.scene, this.scene.scene.quitPopup.noButton, Constant.scaleFactor);
        SoundManager.PlayButtonClickSound();
    }

    NoButtonReleased() {
        this.scene.scene.instructionPopup.HideInstructionPopup();
    }


    HideInstructionPopup() {
        this.scene.add.tween({
            targets: this.instructionPopupGroup,
            alpha: 0,
            ease: 'Linear',
            duration: 300,
            onComplete: this.onHideInstructionPopup,
            onCompleteScope: this
        });
    }

    onHideInstructionPopup() {
        this.instructionPopupGroup.setVisible(false);
    }
    Resize(newWidth, newHeight, offsetWidth) {
        let newScale = Utils.getScale(1080, 1920, newWidth, newHeight);
        this.overlay.setDisplaySize(newWidth, newHeight);
        this.tapText.setScale(newScale);
        this.tapText.setPosition(newWidth / 2, newHeight - 550 * newScale);
        this.hand.setScale(newScale);
        this.hand.setPosition(newWidth / 2, newHeight - 330 * newScale);
    }

};

export default InstructionPopup;