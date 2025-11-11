import { Constant } from "./Constant.js";
import { SoundManeger } from "./SoundManeger.js";
class GameUI {
    constructor(scene) {
        this.scene = scene;
        this.bg = null;
        this.audioanim = null;
        this.soundToggleCounter = 0;
        this.pause_btn = null;
        this.close_btn = null;
        this.scoreText = null;
        this.score = 0;
        this.numberOfTurn = 0;
        this.totalNumberOfTurn = 15;
        this.turnText = null;
        this.arrow = null;
        this.isArrowAnimating = true;
        this.titleText = null;
        this.saveText = null;
        this.outText = null;
        Constant.game.events.on('StopArrowTween', this.StopArrowTween, this);
        Constant.game.events.on('PlayArrowTween', this.PlayArrowTween, this);
    }
    GameBackground() {
        this.bg = this.scene.add.sprite(Constant.game.config.width / 2, Constant.game.config.height / 2, 'bg_game').setOrigin(0.5, 0.5).setScale(1.5 * Constant.scaleFactorX, 1.7 * Constant.scaleFactorY).setInteractive();
    }
    CreateOutOfBoundImage() {
        this.outText = this.scene.add.image(Constant.game.config.width / 2, -100, "missed").setOrigin(0.5).setDepth(3);
    }
    CreateUI() {
        let buttonsBase = this.scene.add.sprite(Constant.game.config.width / 30, Constant.game.config.height / 22, 'button_base').setOrigin(0.5, 0.5).setScale(1 * Constant.scaleFactorX, 1 * Constant.scaleFactorY).setInteractive({ cursor: 'pointer' });
        buttonsBase.on("pointerup", this.OnPauseGameButtonPress, this);
        buttonsBase.on("pointerdown", this.OnPauseGameButtonReleased, this);

        let buttonsBase1 = this.scene.add.sprite(Constant.game.config.width / 13, Constant.game.config.height / 22, 'button_base').setOrigin(0.5, 0.5).setScale(1 * Constant.scaleFactorX, 1 * Constant.scaleFactorY).setInteractive({ cursor: 'pointer' });
        buttonsBase1.on("pointerup", this.SoundButtonOnPress, this);
        buttonsBase1.on("pointerdown", this.SoundButtonOnRelease, this);



        let buttonsBase2 = this.scene.add.sprite(Constant.game.config.width / 8.3, Constant.game.config.height / 22, 'button_base').setOrigin(0.5, 0.5).setScale(1 * Constant.scaleFactorX, 1 * Constant.scaleFactorY).setInteractive({ cursor: 'pointer' });
        buttonsBase2.on("pointerup", this.OnCloseButtonPress, this);
        buttonsBase2.on("pointerdown", this.OnCloseButtonRelease, this);

        this.sound_btn = this.scene.add.sprite(Constant.game.config.width / 13, Constant.game.config.height / 22, 'Sound on-off').setOrigin(0.5, 0.5).setScale(1 * Constant.scaleFactorX, 1 * Constant.scaleFactorY).setInteractive({ cursor: 'pointer' });
        this.sound_btn.on("pointerup", this.SoundButtonOnPress, this);
        this.sound_btn.on("pointerdown", this.SoundButtonOnRelease, this);

        this.pause_btn = this.scene.add.sprite(Constant.game.config.width / 30, Constant.game.config.height / 22, 'but_pause').setScale(1 * Constant.scaleFactorX, 1 * Constant.scaleFactorY).setOrigin(0.5, 0.5).setInteractive({ cursor: 'pointer' });
        this.pause_btn.on("pointerup", this.OnPauseGameButtonPress, this);
        this.pause_btn.on("pointerdown", this.OnPauseGameButtonReleased, this);

        this.close_btn = this.scene.add.sprite(Constant.game.config.width / 8.3, Constant.game.config.height / 22, 'but_exit').setScale(1 * Constant.scaleFactorX, 1 * Constant.scaleFactorY).setOrigin(0.5, 0.5).setInteractive({ cursor: 'pointer' });
        this.close_btn.on("pointerup", this.OnCloseButtonPress, this);
        this.close_btn.on("pointerdown", this.OnCloseButtonRelease, this);


        this.CreateBottomPanel();
    }
    CreateBottomPanel() {
        const scoreTextStyle = {
            fontSize: '45px',
            fontFamily: 'Roboto_Bold',
            color: '#ffffff',
            align: 'center'
        };

        const turnTextStyle = {
            fontSize: '40px',
            fontFamily: 'Roboto_Bold',
            color: '#ffffff',
            align: 'center'
        };
        let scoreBaseImage = this.scene.add.image(Constant.game.config.width / 10, Constant.game.config.height / 1.1, "score_board").setScale(Constant.scaleFactorX, Constant.scaleFactorY).setOrigin(0.5);

        this.scoreText = this.scene.add.text(Constant.game.config.width / 14, Constant.game.config.height / 1.095, 'SCORE : ' + this.score, scoreTextStyle).setScale(Constant.scaleFactorX, Constant.scaleFactorY).setOrigin(0.5)

        // let legImg = this.scene.add.sprite(Constant.game.config.width / 1.25, Constant.game.config.height / 1.1, 'shot_left').setOrigin(0.5, 0.5).setScale(Constant.scaleFactorX * 1.5, Constant.scaleFactorY * 1.5);

        let kickBaseImage = this.scene.add.image(Constant.game.config.width / 1.068, Constant.game.config.height / 16, "kick base").setScale(Constant.scaleFactorX, Constant.scaleFactorY).setOrigin(0.5);

        let ballIcon = this.scene.add.image(Constant.game.config.width / 1.03, Constant.game.config.height / 15, "ball icon").setScale(Constant.scaleFactorX, Constant.scaleFactorY).setOrigin(0.5);

        this.turnText = this.scene.add.text(Constant.game.config.width / 1.08, Constant.game.config.height / 15, this.numberOfTurn + "/" + this.totalNumberOfTurn, turnTextStyle).setOrigin(0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY)


    }
    OnPressOverlay() { }
    OnReleaseOverlay() {
    }
    CreateArrow() {
        this.arrow = this.scene.add.image(Constant.game.config.width / 2.02, Constant.game.config.height / 1.30, 'hand_touch').setOrigin(0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        this.AnimateArrow();
    }
    AnimateArrow() {
        this.arrowTween = this.scene.tweens.add({
            targets: this.arrow,
            ease: "linear",
            duration: 500,
            x: Math.round(Constant.game.config.width / 2.222),
            y: Math.round(Constant.game.config.height / 2.222),
            onComplete: () => {
                this.arrow.setPosition(Constant.game.config.width / 2.02, Constant.game.config.height / 1.30);
                this.scene.tweens.add({
                    targets: this.arrow,
                    ease: "linear",
                    duration: 500,
                    x: Math.round(Constant.game.config.width / 2.02),
                    y: Math.round(Constant.game.config.height / 2.22),
                    onComplete: () => {
                        this.arrow.setPosition(Constant.game.config.width / 2.02, Constant.game.config.height / 1.30);
                        this.scene.tweens.add({
                            targets: this.arrow,
                            ease: "linear",
                            duration: 500,
                            x: Math.round(Constant.game.config.width / 1.539),
                            y: Math.round(Constant.game.config.height / 2.22),
                            onComplete: () => {
                                this.arrow.setPosition(Constant.game.config.width / 2.02, Constant.game.config.height / 1.30);
                                this.AnimateArrow();
                            }
                        })
                    }
                })
            }
        })
        // this.arrowTween.pause();
    }
    PlayArrowTween() {
        this.arrow.setVisible(true);
        this.arrow.setPosition(Constant.game.config.width / 2.02, Constant.game.config.height / 1.30);
        this.arrowTween.play();
    }
    StopArrowTween() {
        this.arrow.setVisible(false);
        this.arrow.setPosition(Constant.game.config.width / 2.02, Constant.game.config.height / 1.30);
        this.arrowTween.stop();
    }
    SoundButtonOnPress() {
    }
    SoundButtonOnRelease() {
        this.soundToggleCounter += 1;
        if (this.soundToggleCounter % 2 == 1) {
            SoundManeger.DisableSound();
            this.sound_btn.setFrame(1);
        }
        else {
            this.sound_btn.setFrame(0);
            SoundManeger.EnableSound();
        }
    }
    OnPauseGameButtonPress() { }
    OnPauseGameButtonReleased() {
        this.scene.anims.pauseAll();
        this.scene.resumePopup.EnableResumePopUp();
    }
    OnCloseButtonPress() { }
    OnCloseButtonRelease() {
        this.bg.setAlpha(0.5);
        this.scene.gameExit.EnableGameExitPopUp();
    }
    YesButtonPress() { }
    YesButtonRelease() {
        this.bg.setAlpha(1);
        this.scene.scene.start('Lobby');
    }
    OnNoButtonPressed() { }
    OnNoButtonReleased() {
        this.bg.setAlpha(1);
        // this.leavegameContainer.setVisible(false);
    }
}
export default GameUI;