// import { Constant } from "../Constant";
import Button from "../class/Button";

export default class PausePopup {
    constructor(scene) {
        this.scene = scene;
        this.pausePopupContainer = null;
        this.create();
    }
    create() {
        this.popupbg = this.scene.add.image(0, 0, 'game-bg').setInteractive().setOrigin(0).setVisible(false).setAlpha(0.2).setDepth(5);
        this.pausePopupContainer = this.scene.add.container(0, 0).setVisible(false).setDepth(5);
        this.restartBut = new Button(this.scene, 'restart-but', 0, 200, 1, 1);
        this.restartBut.setClickcallback(this.RestartButFunc, this);
        this.resumeBut = new Button(this.scene, 'play-but', 0, -200, 1, 1);
        this.resumeBut.setClickcallback(this.resumeButFunc, this);

        this.scText = this.scene.add.text(0, -400, this.scene.basketInstance.score, { fontFamily: "Poppins-Bold", fontSize: 80 }).setOrigin(0.5);
        this.pausePopupContainer.add([this.restartBut.button, this.resumeBut.button, this.scText]);
    }
    //Game Restart Functionality
    RestartButFunc() {
        this.scene.scene.restart('GameScene');
    }
    //Game Resume Functionality
    resumeButFunc() {
        this.scene.isGamePause = false;
        this.scene.pauseBut.button.setVisible(true);
        this.scene.basketBallInstance.ball.body.timeScale = 1;
        if (this.scene.basketInstance.score > 0) {
            this.scene.basketInstance.gameTimer.resume();
        }
        this.popupbg.setVisible(false);
        this.pausePopupContainer.setVisible(false);
    }
    resize(newWidth, newHeight, newScale) {
        this.popupbg.setDisplaySize(newWidth, newHeight);
        this.pausePopupContainer.setScale(newScale);
        this.pausePopupContainer.setPosition(newWidth / 2, newHeight / 2);
    }
}