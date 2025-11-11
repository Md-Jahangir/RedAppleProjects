import Background from "./Background.js";
import Player from "./Player.js";
import GameUI from "./GameUI.js";
// import Obstacle from "./Obstacle.js";
import Obstacles from "./Obstacles.js";
import Controls from "./Controls.js";
import { Audiomanager } from "./Audiomanager.js";
import Score from "./Score.js";
import Popup from "./Popup.js";
export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }
    init() {
        this.backGround = new Background(this);
        this.player = new Player(this);
        this.gameUI = new GameUI(this);
        this.obstacle = new Obstacles(this);
        this.control = new Controls(this);
        this.score = new Score(this);
        this.popup = new Popup(this);
        // this.isControl = false;
        this.distance = 0;
        this.rate = 0;
        this.isDownLeft = false;
        this.isDownRight = false;
        this.isGameOver = false;
    }
    create() {
        // this.cameras.main.setZoom(0.2);
        // console.log(this.sys.game.device.fullscreen);
        this.ShowBG();
        this.CreateAudio();
        this.ShowPlayer();
        this.GameUI();
        this.OnTapTweenComplete();
        this.CreateTouchControls();
        this.CreateKeyboardControls();
        this.ShowScore();
    }
    ShowBG() {
        this.backGround.CreateBG();
    }
    MoveBG() {
        if (!this.isGameOver) {
            this.backGround.MoveBG();
            if (this.score.score % 5 == 0) {
                this.distace = this.score.score;
            }
            if (this.score.score % this.distace == 0) {
                this.backGround.speed += 0.05;
                this.distace = 0;
            }
            // console.log(this.distace);
        }
        // console.log(this.backGround.speed);
    }
    CreateAudio() {
        // console.log(Audiomanager);
        Audiomanager.CreateSounds();
    }
    ChangeAudioRate() {
        if (!this.isGameOver) {
            if (this.score.score % 15 == 0) {
                this.rate = this.score.score;
            }
            if (this.score.score % this.rate == 0) {
                if (Audiomanager.carSound.rate <= 2) {
                    Audiomanager.carSound.rate += 0.001;
                    this.rate = 0;
                }
            }
        }
    }
    ShowPlayer() {
        this.player.CreatePlayer();
        Audiomanager.PlayCarEngineSound();
    }
    GameUI() {
        this.gameUI.CreateGameUI();
    }
    ControlFullScreen() {
        if (this.scale.isFullscreen) {
            // console.log("Ariel");
            this.gameUI.fullscreen.setVisible(false);
            this.gameUI.exitFullscreen.setVisible(true);
        }
        else {
            this.gameUI.fullscreen.setVisible(true);
            this.gameUI.exitFullscreen.setVisible(false);
        }
    }
    OnTapTweenComplete() {
        this.gameUI.tapTweens.on('complete', this.ShowObstacles, this);
    }
    ShowObstacles() {
        // this.isControl = true;
        // this.obstacle.CreateObstacles();
        // this.obstacle.Create();
        if (!this.isGameOver) {
            this.obstacle.CreateObstaclesPool();
        }
        // this.obstacle.CreateRandomArray();
        // this.obstacle.CreateObstaclesLaneOne();
        // this.obstacle.CreateObstaclesLaneTwo();
        // this.obstacle.CreateObstaclesLaneThree();
        // this.obstacle.CreateObstaclesLaneFour();
    }
    MoveObstacles() {
        if (!this.isGameOver) {
            // this.obstacle.MoveObstacles();
            this.obstacle.MoveObstaclesPool();
            // for (let i = 0; i < this.obstacle.vehiclesArray.length; i++) {
            //     for (let j = 0; j < this.obstacle.vehiclesArray[i].length; j++) {
            //         if (this.obstacle.vehiclesArray[i][j].y >= 1200) {
            //             this.obstacle.speed += this.obstacle.speed + (0.04 * this.obstacle.speed);
            //         }
            //     }
            // }
            if (this.score.score % 5 == 0) {
                this.distace = this.score.score;
            }
            if (this.score.score % this.distace == 0) {
                this.obstacle.speedOne += 0.05;
                this.obstacle.speedTwo += 0.05;
                this.obstacle.speedThree += 0.05;
                this.obstacle.speedFour += 0.05;
                this.distace = 0;
            }
        }
    }
    CreateTouchControls() {
        this.control.CreateTouchOverlaps();
        this.control.leftOverlap.on('pointerdown', pointer => {
            this.isDownLeft = true;
        });
        this.control.leftOverlap.on('pointerup', pointer => {
            this.isDownLeft = false;
        });
        this.control.rightOverlap.on('pointerdown', pointer => {
            this.isDownRight = true;
        });
        this.control.rightOverlap.on('pointerup', pointer => {
            this.isDownRight = false;
        });
    }
    CreateKeyboardControls() {
        this.control.CreateKeyboardControls();
    }
    PlayerMovement() {
        if (!this.isGameOver) {
            if (this.isDownLeft) {
                this.player.MovePlayerOnLeft();
            }
            if (this.isDownRight) {
                this.player.MovePlayerOnRight();
            }
            if (this.control.cursors.left.isDown) {
                this.player.MovePlayerOnLeft();
            }
            if (this.control.cursors.right.isDown) {
                this.player.MovePlayerOnRight();
            }
            if (isMobile) {
                if (this.player.player.x <= game.config.width / 3.2 || this.player.player.x >= game.config.width / 1.464) {
                    this.GameOver();
                }
            }
            else {
                if (this.player.player.x <= game.config.width / 3 || this.player.player.x >= game.config.width / 1.526) {
                    this.GameOver();
                }
            }
        }
    }
    ShowScore() {
        this.score.CreateScore();
    }
    UpdateScore() {
        for (let i = 0; i < this.obstacle.vehiclesArrayLaneOne.length; i++) {
            if (this.obstacle.vehiclesArrayLaneOne[i].y >= this.player.player.y && this.obstacle.vehiclesArrayLaneOne[i].name == 'not_passed') {
                this.obstacle.vehiclesArrayLaneOne[i].name = 'passed';
                this.score.score++;
                this.score.scoreTxt.setText(this.score.score);
            }
        }
        for (let i = 0; i < this.obstacle.vehiclesArrayLaneTwo.length; i++) {
            if (this.obstacle.vehiclesArrayLaneTwo[i].y >= this.player.player.y && this.obstacle.vehiclesArrayLaneTwo[i].name == 'not_passed') {
                this.obstacle.vehiclesArrayLaneTwo[i].name = 'passed';
                this.score.score++;
                this.score.scoreTxt.setText(this.score.score);
            }
        }
        for (let i = 0; i < this.obstacle.vehiclesArrayLaneThree.length; i++) {
            if (this.obstacle.vehiclesArrayLaneThree[i].y >= this.player.player.y && this.obstacle.vehiclesArrayLaneThree[i].name == 'not_passed') {
                this.obstacle.vehiclesArrayLaneThree[i].name = 'passed';
                this.score.score++;
                this.score.scoreTxt.setText(this.score.score);
            }
        }
        for (let i = 0; i < this.obstacle.vehiclesArrayLaneFour.length; i++) {
            if (this.obstacle.vehiclesArrayLaneFour[i].y >= this.player.player.y && this.obstacle.vehiclesArrayLaneFour[i].name == 'not_passed') {
                this.obstacle.vehiclesArrayLaneFour[i].name = 'passed';
                this.score.score++;
                this.score.scoreTxt.setText(this.score.score);
            }
        }
    }
    ShowBestScore() {
        let bestScore = 0;
        bestScore = localStorage.getItem('speed_score');
        if (bestScore == null) {
            localStorage.setItem('speed_score', 0);
        }
        if (localStorage.getItem('speed_score') < this.score.score) {
            localStorage.setItem('speed_score', this.score.score);
        }
        this.score.bestScoreTxt.setText("Best:" + localStorage.getItem('speed_score'));
    }
    CollisionChecks() {
        for (let i = 0; i < this.obstacle.vehiclesArrayLaneOne.length; i++) {
            this.physics.add.collider(this.player.player, this.obstacle.vehiclesArrayLaneOne[i], this.GameOver, null, this);
        }
        for (let i = 0; i < this.obstacle.vehiclesArrayLaneTwo.length; i++) {
            this.physics.add.collider(this.player.player, this.obstacle.vehiclesArrayLaneTwo[i], this.GameOver, null, this);
        }
        for (let i = 0; i < this.obstacle.vehiclesArrayLaneThree.length; i++) {
            this.physics.add.collider(this.player.player, this.obstacle.vehiclesArrayLaneThree[i], this.GameOver, null, this);
        }
        for (let i = 0; i < this.obstacle.vehiclesArrayLaneFour.length; i++) {
            this.physics.add.collider(this.player.player, this.obstacle.vehiclesArrayLaneFour[i], this.GameOver, null, this);
        }
    }
    GameOver() {
        // console.log("GameOver");
        this.player.player.body.enable = false;
        this.cameras.main.shake(185, 0.013);
        this.isGameOver = true;
        Audiomanager.PlayCarCrashSound();
        Audiomanager.StopCarEngineSound();
        this.popup.CreatePopup();
        this.score.scoreTxt.setPosition(game.config.width / 1.8, game.config.height / 1.6);
        if (isMobile) {
            this.score.scoreTxt.x = game.config.width / 1.62;
        }
        this.score.scoreTxt.setScale(0.6);
        this.score.CreateBestScore();
        this.ShowBestScore();
    }
    update() {
        this.ControlFullScreen();
        this.MoveBG();
        this.ChangeAudioRate();
        this.MoveObstacles();
        this.PlayerMovement();
        this.CollisionChecks();
        this.UpdateScore();
    }
}