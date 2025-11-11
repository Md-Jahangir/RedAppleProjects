import { Constant } from "../Constant.js";
import { Server } from "../Server.js";
class GameOverPopUp {
    constructor(scene) {
        this.scene = scene;
        this.gameOverContainer = null;
        this.quitButton = null;
        this.replayButton = null;
    }
    CreateGameOverPopup() {
        this.gameOverContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        let overlay = this.scene.add.image(0, 0, 'overlay').setOrigin(0.5).setScale(1080 * Constant.scaleFactorX, 1.2);
        let popupBase = this.scene.add.image(0, 0, "gameover_base").setOrigin(0.5);
        const gameOverTextStyle = { fontFamily: 'BRITANIC', fontSize: "150px", fontStyle: 'bold', align: 'center' };
        let gameOverText = this.scene.add.text(0, -230, 'Game Over', gameOverTextStyle).setOrigin(0.5);
        const otherTextStyle = { fontFamily: 'BRITANIC', fontSize: "80px", fontStyle: 'bold', align: 'center' };

        let collectedText = this.scene.add.text(0, -70, 'You heve Collected', otherTextStyle).setOrigin(0.5);

        let bannaCountBaseImage = this.scene.add.image(0, 95, 'bigBannanBase').setOrigin(0.5);
        this.scoreValue = this.scene.add.text(20, 95, 0, otherTextStyle).setOrigin(0.5);

        this.quitButton = this.scene.add.image(-190, 350, 'Quit').setOrigin(0.5).setInteractive({ useHandCursor: true });
        this.replayButton = this.scene.add.image(190, 350, 'Replay').setOrigin(0.5).setInteractive({ useHandCursor: true });

        this.quitButton.on('pointerdown', this.OnQuitButtonPressed, this);
        this.quitButton.on('pointerup', this.OnQuitButtonReleased, this);

        this.replayButton.on('pointerdown', this.OnReplayButtonPressed, this);
        this.replayButton.on('pointerup', this.OnReplayButtonReleased, this);

        overlay.on('pointerdown', this.OnOverlayPressed, this);
        overlay.on('pointerup', this.OnOverlayReleased, this);

        this.gameOverContainer.add([
            overlay,
            popupBase,
            gameOverText,
            collectedText,
            bannaCountBaseImage,
            this.scoreValue,
            this.quitButton,
            this.replayButton
        ]);
        this.gameOverContainer.visible = false;
    }
    OnOverlayPressed() { }
    OnOverlayReleased() { }
    OnQuitButtonPressed() {
        this.gameOverContainer.list[2].scaleX -= 0.2;
        this.gameOverContainer.list[2].scaleY -= 0.2;
    }
    OnQuitButtonReleased() {
        this.gameOverContainer.list[2].scaleX += 0.2;
        this.gameOverContainer.list[2].scaleY += 0.2;
        this.DisableGameOverPopUp();
        this.scene.totalDistance = 0;
        this.scene.second = 0
        Constant.game.scene.start("MenuScene");
    }
    OnReplayButtonPressed() {
        this.gameOverContainer.list[3].scaleX -= 0.2;
        this.gameOverContainer.list[3].scaleY -= 0.2;
    }
    OnReplayButtonReleased() {
        const currentTimeStamp = Date.now();
        const finalTime = currentTimeStamp - Constant.gameStartTime;
        Server.PostGamePlayTimeToParent(finalTime / 1000, Constant.score);
        this.gameOverContainer.list[3].scaleX += 0.2;
        this.gameOverContainer.list[3].scaleY += 0.2;
        this.DisableGameOverPopUp();
        this.scene.totalDistance = 0;
        this.scene.second = 0
        this.scene.OnRestartPressOver();
    }
    EnableGameOverPopup() {
        this.scoreValue.setText(this.scene.food.scoreCount);
        this.gameOverContainer.visible = true;
    }
    DisableGameOverPopUp() {
        this.gameOverContainer.visible = false;
    }
}

export default GameOverPopUp;