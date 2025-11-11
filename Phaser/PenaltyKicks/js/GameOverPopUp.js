import { Constant } from "./Constant.js";
import { SoundManeger } from "./SoundManeger.js";
class GameOverPopUp {
    constructor(scene) {
        this.scene = scene;
        this.gameOverContainer = null;
        // this.bestScore = null;
    }
    CreateGameOverPopUp() {

        this.gameOverContainer = this.scene.add.container(0, 0);
        let overlay = this.scene.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2, "1_1").setOrigin(0.5).setScale(Constant.scaleFactorX * 2000, Constant.scaleFactorY * 1100).setInteractive().setAlpha(0.5);
        overlay.on("pointerup", this.OnOverlayPressed, this);
        overlay.on("pointerdown", this.OnOverlayReleased, this)

        let popUpBg = this.scene.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2, "bg").setOrigin(0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        // console.log('popUpBg : ', popUpBg)

        let gameOverBaseImage = this.scene.add.image(Constant.game.config.width / 2.65, Constant.game.config.height / 3.2, "Game_Over_base").setOrigin(0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);

        let gameOverFontImage = this.scene.add.image(Constant.game.config.width / 2.65, Constant.game.config.height / 3.2, "Game_Over").setOrigin(0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        const textTextStyle = {
            fontSize: '45px',
            fontFamily: 'Roboto-BoldItalic',
            color: '#ffca00',
            align: 'center',
        };

        const textTextStyle1 = {
            fontSize: '30px',
            fontFamily: 'Roboto-BoldItalic',
            color: '#ffffff',
            align: 'center',
            // stroke: '#fff',
            // strokeThickness: 4,
        };
        const textTextStyle2 = {
            fontSize: '30px',
            fontFamily: 'Roboto-BoldItalic',
            color: '#7a2737',
            align: 'center',
            stroke: '#fff',
            strokeThickness: 3,
        };
        // let GameOverText = this.scene.add.text(Constant.game.config.width / 2, Constant.game.config.height / 2.6, 'GAME OVER', gameOverTextStyle).setOrigin(0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);


        //current_score

        let currentScoreBaseImage = this.scene.add.image(Constant.game.config.width / 3.1, Constant.game.config.height / 2.1, "current_score").setOrigin(0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);


        let scoreText = this.scene.add.text(Constant.game.config.width / 3.1, Constant.game.config.height / 2.1, 'Current Score : ' + 0, textTextStyle).setOrigin(0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);

        let bestScoreBaseImage = this.scene.add.image(Constant.game.config.width / 3.25, Constant.game.config.height / 1.7, "highest_score").setOrigin(0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);


        let bestScoreText = this.scene.add.text(Constant.game.config.width / 3.25, Constant.game.config.height / 1.7, 'Highest Score : ' + 0, textTextStyle1).setOrigin(0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);



        let homeButton = this.scene.add.image(Constant.game.config.width / 4, Constant.game.config.height / 1.45, "home_replay_base").setOrigin(0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY).setInteractive({ cursor: 'pointer' });

        let homeText = this.scene.add.text(Constant.game.config.width / 4, Constant.game.config.height / 1.46, 'Home', textTextStyle2).setOrigin(0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY).setInteractive({ cursor: 'pointer' });

        homeText.on("pointerup", this.OnHomeButtonPressed, this);
        homeText.on("pointerdown", this.OnHomeButtonReleased, this);

        homeButton.on("pointerup", this.OnHomeButtonPressed, this);
        homeButton.on("pointerdown", this.OnHomeButtonReleased, this)

        let restartButton = this.scene.add.image(Constant.game.config.width / 2.8, Constant.game.config.height / 1.45, "home_replay_base").setOrigin(0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY).setInteractive({ cursor: 'pointer' });

        let restartText = this.scene.add.text(Constant.game.config.width / 2.8, Constant.game.config.height / 1.46, 'Replay', textTextStyle2).setOrigin(0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY).setInteractive({ cursor: 'pointer' });


        restartText.on("pointerup", this.OnRestartButtonPressed, this);
        restartText.on("pointerdown", this.OnRestartButtonReleased, this);


        restartButton.on("pointerup", this.OnRestartButtonPressed, this);
        restartButton.on("pointerdown", this.OnRestartButtonReleased, this);

        let logo = this.scene.add.image(Constant.game.config.width / 1.5, Constant.game.config.height / 2.4, "logo1").setOrigin(0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        this.gameOverContainer.add([
            overlay,
            popUpBg,
            gameOverBaseImage,
            gameOverFontImage,
            currentScoreBaseImage,
            scoreText,
            bestScoreBaseImage,
            bestScoreText,
            homeButton,
            restartButton,
            homeText,
            restartText,
            logo
        ])

        this.gameOverContainer.setVisible(false);
    }
    EnableGameOverPopUp() {
        this.gameOverContainer.setVisible(true);
        this.gameOverContainer.list[5].setText("Current Score : " + this.scene.gameUI.score);

        this.ResetGame();
        let bestScore = 0;
        bestScore = (localStorage.getItem('penalty_kick_score'));
        console.log('bestScore', bestScore);

        if (bestScore == null) {
            localStorage.setItem('penalty_kick_score', 0);
        }
        if (parseInt(localStorage.getItem('penalty_kick_score')) < this.scene.gameUI.score) {
            localStorage.setItem('penalty_kick_score', this.scene.gameUI.score);
        }

        this.gameOverContainer.list[7].setText("Highest Score : " + parseInt(localStorage.getItem('penalty_kick_score')));


    }
    DisableGameOverPopUp() {
        this.gameOverContainer.setVisible(false);
    }

    OnOverlayPressed() {
    }
    OnOverlayReleased() {
    }

    OnHomeButtonPressed() {
        SoundManeger.StopBackgroundMusic();
    }
    OnHomeButtonReleased() {
        this.scene.scene.start('Lobby');
    }
    OnRestartButtonPressed() {
    }
    OnRestartButtonReleased() {
        this.scene.scene.restart();
    }
    ResetGame() {
        // console.log('enter when turn complete', this.scene.ball.staticBall);
        this.scene.goalKeeperMovement.goalKeeperSpineMovement.visible = false;
        this.scene.ball.staticBall.setVisible(false);
        this.scene.player.visible = false;
    }
}
export default GameOverPopUp;
