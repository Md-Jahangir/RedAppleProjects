import { Constant } from "./Constant.js";
class ResumePopup {
    constructor(scene) {
        this.scene = scene;
        this.resumePopupContainer = null;
    }
    CreateResumePopUp() {
        this.resumePopupContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        let overlayBg = this.scene.add.image(0, 0, '1_1').setOrigin(0.5).setScale(Constant.scaleFactorX * 2000, Constant.scaleFactorY * 1100).setAlpha(0.02).setInteractive();

        overlayBg.on('pointerdown', this.OnOverlayPressed, this);
        overlayBg.on('pointerup', this.OnOverlayReleased, this);
        let bg = this.scene.add.image(0, 0, 'pausePopUpBg').setOrigin(0.5);
        const gamePausedStyle = {
            fontSize: '64px',
            fontFamily: 'Roboto-BoldItalic',
            color: '#ffffff',
            align: 'center'
        };

        const gamePausedStyle1 = {
            fontSize: '30px',
            fontFamily: 'Roboto-BoldItalic',
            color: '#7a2737',
            align: 'center',
            stroke: '#fff',
            strokeThickness: 4,
        };
        let gamePausedText = this.scene.add.text(0, -80, 'Game Paused', gamePausedStyle).setOrigin(0.5);

        let continueBaseImage = this.scene.add.image(0, 60, 'resumeBtn').setOrigin(0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY).setOrigin(0.5).setInteractive({ cursor: 'pointer' });
        let continueText = this.scene.add.text(0, 50, 'Continue', gamePausedStyle1).setOrigin(0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY).setOrigin(0.5).setInteractive({ cursor: 'pointer' });

        continueText.on('pointerdown', this.OnContinuePressed, this);
        continueBaseImage.on('pointerdown', this.OnContinuePressed, this);

        continueText.on('pointerup', this.OnContinueReleased, this);
        continueBaseImage.on('pointerup', this.OnContinueReleased, this);

        this.resumePopupContainer.add([
            overlayBg,
            bg,
            gamePausedText,
            continueBaseImage,
            continueText
        ]);

        this.resumePopupContainer.setVisible(false);
    }
    EnableResumePopUp() {
        this.resumePopupContainer.setVisible(true);
    }
    DisableResumePopUp() {
        this.resumePopupContainer.setVisible(false);
    }
    OnOverlayPressed() {
    }
    OnOverlayReleased() {
    }
    OnContinuePressed() {
    }
    OnContinueReleased() {
        this.scene.anims.resumeAll();
        this.resumePopupContainer.setVisible(false);
    }
}
export default ResumePopup;