import { Constant } from "./Constant.js";
import { Server } from "./Server.js";
import { SoundManeger } from "./SoundManeger.js";
import { PlayzhubEventHandler } from "./PlayzhubEventHandler_E6.js";
class GameExitPopUp {
    constructor(scene) {
        this.scene = scene;
        this.leavegameContainer = null;
    }
    CreateExitPopUp() {
        this.leavegameContainer = this.scene.add.container(0, 0).setDepth(2);
        let overlay = this.scene.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2, '1_1').setOrigin(0.5).setScale(2000 * Constant.scaleFactorX, 1100 * Constant.scaleFactorY);
        overlay.setInteractive();
        overlay.setAlpha(0.3);
        overlay.on('pointerdown', this.OnPressOverlay, this);
        overlay.on('pointerup', this.OnReleaseOverlay, this);
        let messageBox = this.scene.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2, "msg_box").setOrigin(0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);

        let baseImage = this.scene.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2.2, "base").setOrigin(0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);


        let closeText = this.scene.add.text(Constant.game.config.width / 2, Constant.game.config.height / 2.2, 'Do You Want To Quit?', {
            fontSize: '50px',
            fontFamily: 'Roboto-BoldItalic',
            color: '#ffffff',
            align: 'center'
        }).setScale(1 * Constant.scaleFactorX, 1 * Constant.scaleFactorY).setOrigin(0.5);

        const yesNoTextStyle = {
            fontSize: '20px',
            fontFamily: 'Roboto-BoldItalic',
            color: '#7a2737',
            align: 'center',
            stroke: '#fff',
            strokeThickness: 3,
        }

        let yesButton = this.scene.add.sprite(Constant.game.config.width / 2.35, Constant.game.config.height / 1.55, 'yes no base').setInteractive().setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        let yesText = this.scene.add.text(Constant.game.config.width / 2.35, Constant.game.config.height / 1.55, 'Yes', yesNoTextStyle).setOrigin(0.5).setInteractive();
        yesButton.on("pointerup", this.YesButtonPress, this);
        yesButton.on("pointerdown", this.YesButtonRelease, this)

        yesText.on("pointerup", this.YesButtonPress, this);
        yesText.on("pointerdown", this.YesButtonRelease, this)

        let noButton = this.scene.add.sprite(Constant.game.config.width / 1.9, Constant.game.config.height / 1.55, 'yes no base').setInteractive({ cursor: 'pointer' }).setScale(Constant.scaleFactorX, Constant.scaleFactorY)
        let noText = this.scene.add.text(Constant.game.config.width / 1.9, Constant.game.config.height / 1.55, 'No', yesNoTextStyle).setOrigin(0.5).setInteractive();
        noButton.on("pointerup", this.OnNoButtonPressed, this);
        noButton.on("pointerdown", this.OnNoButtonReleased, this);

        noText.on("pointerup", this.OnNoButtonPressed, this);
        noText.on("pointerdown", this.OnNoButtonReleased, this)

        this.leavegameContainer.add(overlay);
        this.leavegameContainer.add(messageBox);
        this.leavegameContainer.add(baseImage);
        this.leavegameContainer.add(closeText);
        this.leavegameContainer.add(yesButton);
        this.leavegameContainer.add(yesText);
        this.leavegameContainer.add(noButton);
        this.leavegameContainer.add(noText);
        this.leavegameContainer.setVisible(false);
    }
    EnableGameExitPopUp() {
        this.leavegameContainer.setVisible(true);
    }
    DisableGameExitPopUp() {
        this.leavegameContainer.setVisible(false);
    }
    OnPressOverlay() { }
    OnReleaseOverlay() {

    }
    YesButtonPress() { }
    YesButtonRelease() {
        SoundManeger.StopBackgroundMusic();
        const currentTimeStamp = Date.now();
        const finalTime = currentTimeStamp - Constant.gameStartTime;
        // Server.PostGameQuitToParent(finalTime / 1000, this.scene.gameUI.score);
        PlayzhubEventHandler.GamePlayStopped(finalTime / 1000);
        this.scene.gameUI.bg.setAlpha(1);
        this.scene.scene.start('Lobby');
    }
    OnNoButtonPressed() { }
    OnNoButtonReleased() {
        this.scene.gameUI.bg.setAlpha(1);
        this.leavegameContainer.setVisible(false);
    }
}
export default GameExitPopUp;
