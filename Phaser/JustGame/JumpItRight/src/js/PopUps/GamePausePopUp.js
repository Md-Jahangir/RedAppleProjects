import { Constant } from "../Constant.js";
import { Server } from "../Server.js";
class GamePausePopUp {
    constructor(scene) {
        this.scene = scene;
        this.gamePauseContainer = null;
    }
    CreateGamePausePopUp() {
        this.Overlay = this.scene.add.image(0, 0, 'overlay').setScale(1080 * Constant.scaleFactor, 1920 * Constant.scaleFactor).setOrigin(0.5).setInteractive().setAlpha(0.5);
        this.gamePauseContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor);


        this.popUpBase = this.scene.add.image(0, 0, 'quite_base').setOrigin(0.5);
        const textStyle = { fontFamily: 'BRITANIC', fontSize: "75px", fontStyle: 'bold', align: 'center' };
        let quitText = this.scene.add.text(0, -50, 'QUIT THE GAME', textStyle).setOrigin(0.5);
        this.wantToQuit = this.scene.add.image(-130, 180, 'yes').setOrigin(0.5).setInteractive({ useHandCursor: true });
        this.dontWantToQuit = this.scene.add.image(150, 180, 'no').setOrigin(0.5).setInteractive({ useHandCursor: true });

        this.Overlay.on('pointerdown', this.OnOverlayPress, this);
        this.Overlay.on('pointerup', this.OnOverlayRelease, this);

        this.wantToQuit.on("pointerdown", this.OnQuitPress, this);
        this.wantToQuit.on("pointerup", this.OnQuitRelease, this);

        this.dontWantToQuit.on("pointerdown", this.OnResumePress, this);
        this.dontWantToQuit.on("pointerup", this.OnResumeRelease, this);



        this.gamePauseContainer.add([
            this.popUpBase,
            quitText,
            this.wantToQuit,
            this.dontWantToQuit
        ]);

        this.gamePauseContainer.visible = false;
        this.Overlay.visible = false;
    };
    OnOverlayPress() { };
    OnOverlayRelease() { };

    OnQuitPress() {
        this.wantToQuit.setScale(Constant.scaleFactorX * 0.9, Constant.scaleFactorY * 0.9);
    };
    OnQuitRelease() {
        const currentTimeStamp = Date.now();
        const finalTime = currentTimeStamp - Constant.gameStartTime;
        Server.PostGameQuitToParent(finalTime / 1000, Constant.score);
        this.wantToQuit.setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        Constant.isPaused = false;
        this.DisbleGamePausePopup();
        this.scene.scene.start('MenuScene');

        // this.scene.CallTheScoreSendAPI();
    };

    OnResumePress() {
        this.dontWantToQuit.setScale(Constant.scaleFactorX * 0.9, Constant.scaleFactorY * 0.9);
    };
    OnResumeRelease() {
        this.dontWantToQuit.setScale(Constant.scaleFactorX * 1, Constant.scaleFactorY * 1);
        Constant.isPaused = false;
        this.scene.isPlateBaseBgMoving = true;
        this.scene.isBranchesTwigsMoving = true;
        this.scene.monkeyPlayer.playerContainer.body.enable = true;
        this.DisbleGamePausePopup();
    };

    EnableGamePausePopup() {
        this.gamePauseContainer.visible = true;
        this.Overlay.visible = true;
    }
    DisbleGamePausePopup() {
        this.gamePauseContainer.visible = false;
        this.Overlay.visible = false;
    }
}
export default GamePausePopUp;