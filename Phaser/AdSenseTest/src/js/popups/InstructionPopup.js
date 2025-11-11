import { Utils } from "../Utils.js";
import { SoundManager } from "../SoundManager.js";
import { Constant } from "../Constant.js";

class InstructionPopup {
    constructor(scene) {
        this.scene = scene;
    };

    CreateInstructionPopup() {
        this.instructionPopupGroup = this.scene.add.group();

        // this.overlay = Utils.SpriteSettingsControl(this.scene, 0, 0, "one_pixel_black", 0, 0, 3000, 3000, "true", this.OverlayPressed);
        // this.tapText = this.scene.add.text(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 1.5), "TAP TO THROW THE KNIFE", tapTextStyle).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        // this.hand = this.scene.add.sprite(Math.round(Constant.game.config.width / 1.9), Math.round(Constant.game.config.height / 1.2), "hand").setScale(Constant.scaleFactor, Constant.scaleFactor);
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

        // this.instructionPopupGroup.setAlpha(0);
        // this.scene.instructionPopup.ShowInstructionPopup();
    }

    OverlayPressed() {
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
        // setTimeout(() => {
        this.scene.scene.instructionPopup.HideInstructionPopup();
        // }, 100);
    }



    // ShowInstructionPopup() {
    //     // console.log("this scene: ", this.scene);
    //     var alphaTween = this.scene.add.tween({
    //         targets: [this.scene.instructionPopup.instructionPopupGroup],
    //         alpha: 1,
    //         ease: 'Linear',
    //         duration: 300
    //     });

    //     // setTimeout(() => {
    //     //     // this.scene.instructionPopup.scene.anims.play("hand_tap");
    //     //     console.log("snim: ", this.scene);
    //     //     // this.scene.scene.instructionPopup.animHand.play("hand_tap");
    //     // }, 200);

    //     // var alphaTween = this.scene.add.tween({
    //     //     targets: [_refImage],
    //     //     alpha: 1,
    //     //     ease: 'Linear',
    //     //     duration: 300
    //     // });
    // }
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
        // this.parent.scene.quitPopup.quitPopupGroup.destroy();
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