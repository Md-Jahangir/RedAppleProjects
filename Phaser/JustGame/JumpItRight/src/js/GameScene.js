"use strict"
import { Constant } from "./Constant.js";
import Background from "./Background.js";
import Branchs from "./Branchs.js";
import playerBase from "./PlayerBase.js";
import BranchesTwig from "./BranchesTwig.js";
import MonkeyPlayer from "./MonkeyPlayer.js"
import BladeObstacle from "./BladeObstacle.js";
import Food from "./Food.js";
import PowerUpFood from "./PoweUpFood.js";
import TitlePopUp from "./PopUps/TitlePopUp.js";
import GameUI from "./GameUI.js"
import GameOverPopUp from "./PopUps/GameOverPopup.js"
import GamePausePopUp from "./PopUps/GamePausePopUp.js"
import CountDown from "./CountDown.js";
import { Server } from "./Server.js";
import { SoundManeger } from "./SoundManeger.js";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene")
        this.bg = null;
        this.monkeyPlayer = null;
        this.playerBase = null;
        this.obstacle = null;
        this.branchesTwig = null;
        this.bladeObstacle = null;
        this.food = null;
        this.powerUpFood = null;
        this.titlePopup = null;
        this.ui = null;
        this.gameOver = null;
        this.countDown = null;

        this.isGameEnd = false;

        this.branches;
        this.movementOffset = 10;
        this.player;
        this.counterFace = 0;
        this.upOffest = 5;
        this.moveBgBool = false;
        this.isDead = false;
        this.extremeLeftXPos = null;
        this.extremeRightXPos = null;
        // this.moveSpecialFoodBool = false;
        this.isBranchesTwigsMoving = false;
        this.isPlateBaseBgMoving = false;
        // this.timerEvent = null;
        this.second = 0;
        this.thymbnailPlayerAnimation;
        this.totalDistance = 0;
    }
    init() {
        this.background = new Background(this);
        this.monkeyPlayer = new MonkeyPlayer(this);
        this.playerBase = new playerBase(this);
        this.obstacle = new Branchs(this);
        this.branchesTwig = new BranchesTwig(this);
        this.bladeObstacle = new BladeObstacle(this);
        this.food = new Food(this);
        this.powerUpFood = new PowerUpFood(this);
        // this.magneticField = new MagneticField(this);
        this.titlePopup = new TitlePopUp(this);
        this.ui = new GameUI(this);
        this.gameOver = new GameOverPopUp(this);
        this.gamePausePopUp = new GamePausePopUp(this);
        this.countDown = new CountDown(this);

        this.extremeLeftXPos = Constant.game.config.width / 6;
        this.extremeRightXPos = Constant.game.config.width / 1.979;

    }
    preload() { }
    create() {
        Constant.gameStartTime = Date.now();
        this.background.CreateBaseImages();
        this.background.CreateTransperentBranches();
        this.monkeyPlayer.CreateMonkeyPlayer();

        // this.CreateMonkeyUpDownAnim();

        this.playerBase.CreateBaseImage();
        this.obstacle.CreateBranchsRight();
        this.obstacle.CreateBranchsLeft();

        this.branchesTwig.CreateLeftTwigs();
        this.branchesTwig.CreateRightTwigs();

        this.CreateOverlay();
        this.food.CreateFood();



        // this.thymbnailPlayerAnimation.visible = false;


        // this.titlePopup.CreateTitleInstructionPopup();


        this.bladeObstacle.CreateFirstStructure();
        this.bladeObstacle.CreateSecondStructure();

        this.powerUpFood.CreatePowerUpFood();
        // this.monkeyPlayer.CreatePowerUpMonkey();
        this.ui.CreateUi();
        this.ui.EnableUI();
        this.gameOver.CreateGameOverPopup();
        this.gamePausePopUp.CreateGamePausePopUp();
        this.countDown.CreateCountDownTaxt();
        this.CreateLowerEdge();
        this.AllColliderCheckIns();


        // this.monkeyPlayer.NormalMonkeyAnimation();
        this.playerBase.EffectOnPot();
        Constant.gameStarted = true;
        this.isGameEnd = false;

        let timeValueTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '45px', fill: '#fff', fontStyle: 'bold', align: 'center', wordWrap: { width: Math.round(Constant.game.config.width - 100) } };
        this.timeValueText = this.add.text(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 1.04), "", timeValueTextStyle).setOrigin(0.5, 0.5);
        // this.CreateTimer();
    }

    CreateMonkeyUpDownAnim() {
        this.thymbnailPlayerAnimation = this.add.spine(Constant.game.config.width / 2, Constant.game.config.height / 1.56, "norm_monkey").
            setScale(Constant.scaleFactorX * 0.3, Constant.scaleFactorY * 0.3);
        this.thymbnailPlayerAnimation.play("jump2", true);
        this.thymbnailPlayerAnimation.timeScale = 1.2;
    }


    CreateTimer() {
        this.TimedEvent = this.time.addEvent({
            delay: 1000,
            callback: this.UpdateTime,
            callbackScope: this,
            loop: true
        });
    };
    UpdateTime() {
        if (Constant.timeToEnd > 0) {
            Constant.timeToEnd--;
            this.DisplayTimeFormat(Constant.timeToEnd);
        } else {
            this.TimedEvent.remove();
            this.CallTheScoreSendAPI();
        }
    };
    DisplayTimeFormat(_time) {
        let minutes = parseInt(_time / 60, 10);
        let seconds = parseInt(_time % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        this.timeValueText.setText("Time Remain : " + minutes + ":" + seconds);
    }

    CallTheScoreSendAPI() {
        if (getMobileOperatingSystem() == "Android") {
            console.log("The score........................" + this.food.scoreCount.toString());

            sendMessage("The Game End..................................");
            sendMessage(this.food.scoreCount.toString());
        } else if (getMobileOperatingSystem() == "iOS") {
            var postdata = {
                score: this.food.scoreCount.toString(),
            };
            var postmessage = JSON.stringify(postdata);
            window.webkit.messageHandlers.jsHandler.postMessage(postmessage);
            window.webkit.messageHandlers.jsHandler.postMessage("The Game End.............");
        }
        else {
            this.TimedEvent.remove();
            Constant.timeToEnd = Server.timerValue;
            this.gameOver.EnableGameOverPopup();
        }
        SoundManeger.StopBgMusic();
    };

    CreateOverlay() {
        this.gameOverlay = this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2, 'white').setOrigin(0.5, 0.5).setScale(Constant.scaleFactorX * 1080,
            Constant.scaleFactorY * 1920).setAlpha(0.0000001);
    }
    MakeTheSceneInteractive() {
        if (Constant.isMobile) {
            if (Constant.isPortrait) {
                this.upOffest = 8;
            }
        }
        else {
            this.upOffest = 5;
        }
        this.gameOverlay.setInteractive();
        this.gameOverlay.on('pointerdown', this.onPointerDown, this);
        this.gameOverlay.on('pointerup', this.PlayerMovement, this);
        // this.timerEvent = this.time.addEvent({ delay: 1000, callback: this.TimeCalculation, callbackScope: this, loop: true });
        this.dynamicTimerSpeed = this.time.addEvent({ delay: 500, callback: this.DynamicSpeed, callbackScope: this, loop: true });
    }
    DynamicSpeed() {
        if (Constant.isMobile) {
            this.upOffest = this.upOffest + 0.04;
            if (this.speed > 12) {
                this.dynamicTimerSpeed.paused = true;
            }
        } else {
            this.upOffest = this.upOffest + 0.07;
            if (this.speed > 14) {
                this.dynamicTimerSpeed.paused = true;
            }
        }
    }
    TimeCalculation() {
        this.second += 1;
        this.totalDistance = Math.floor(this.upOffest * this.second * 1.35);
        this.ui.gameUIContainer.list[4].setText(this.totalDistance);
    }
    MakeTheSceneDisableInteractive() {
        this.gameOverlay.removeInteractive();
    }
    MakeSceneEnableInteractive() {
        this.gameOverlay.setInteractive();
    }
    CreateLowerEdge() {
        this.edge = this.physics.add.image(Constant.game.config.width / 2, Constant.game.config.height / 1.010, 'white').setOrigin(0.5).setScale(1080, 20).setAlpha(0.0000001);
        this.edge.body.allowGravity = false;
        this.edge.body.immovable = true;
        this.physics.add.overlap(this.edge, this.monkeyPlayer.playerContainer, this.GameEnd, null, this);
    }
    AllColliderCheckIns() {
        // this.physics.add.collider(this.monkeyPlayer.normalMonkey, this.playerBase.playerbaseArray[0]);
        //wheel and player
        for (let i = 0; i < this.bladeObstacle.wheelArray.length; i++) {
            this.physics.add.collider(this.monkeyPlayer.playerContainer, this.bladeObstacle.wheelArray[i], this.GameEnd, null, this);
        }
        //rolling wheel and player
        for (let i = 0; i < this.bladeObstacle.collideRollinArray.length; i++) {
            this.physics.add.collider(this.monkeyPlayer.playerContainer, this.bladeObstacle.collideRollinArray[i], this.GameEnd, null, this);
        }
        //plates and player

        for (let i = 0; i < this.obstacle.leftBranchGroupArray.length; i++) {
            this.physics.add.collider(this.monkeyPlayer.playerContainer, this.obstacle.leftBranchGroupArray[i]);
        }

        for (let i = 0; i < this.obstacle.rightBranchGroupArray.length; i++) {
            this.physics.add.collider(this.monkeyPlayer.playerContainer, this.obstacle.rightBranchGroupArray[i]);
        }

        //collide with food and player
        this.food.foodArray.forEach((elem, index) => {
            this.physics.add.overlap(elem, this.monkeyPlayer.playerContainer, this.OnCollideWithFood, null, this);
        });

        this.physics.add.overlap(this.powerUpFood.powerUpFood, this.monkeyPlayer.playerContainer, this.PowerUpEffectOnCollide, null, this);

        for (let i = 0; i < this.branchesTwig.leftCollidingArray.length; i++) {
            this.physics.add.collider(this.monkeyPlayer.playerContainer, this.branchesTwig.leftCollidingArray[i], this.OnCollideWithBranches, null, this);
        }
    }

    OnCollideWithBranches(_player, _leftBranches) {
        // setTimeout(() => {
        if (!this.isDead) {
            this.monkeyPlayer.PlayIdle();
        }
        // }, 400);
    }
    GameEnd(_player, _wheelObstacle) {
        const currentTimeStamp = Date.now();
        const finalTime = currentTimeStamp - Constant.gameStartTime;
        Server.PostGamePlayTimeToParent(finalTime / 1000, Constant.score);
        // this.isClickable = false;
        SoundManeger.PlayDeathSound();
        this.isGameEnd = true;
        this.dynamicTimerSpeed.paused = true;
        // this.timerEvent.remove();
        this.gameOver.gameOverContainer.list[5].setText(this.totalDistance);
        // this.totalDistance = 0;
        this.isDead = true;
        // if (this.isDead) {
        Constant.isPaused = false;
        _player.body.enable = false;
        this.monkeyPlayer.playerContainer.body.allowGravity = true;
        _wheelObstacle.body.enable = false;

        this.PlayDeathAimation();

        // }
    }

    PlayDeathAimation() {

        if (this.isDead) {
            if (this.counterFace % 2 == 0) {
                this.monkeyPlayer.PlayDeathLeft();
                this.monkeyPlayer.dethLeft.once('complete', this.OnDethAnimComplete, this);
            }

            else if (this.counterFace % 2 == 1) {
                this.monkeyPlayer.PlayDeathRight();
                this.monkeyPlayer.dethRight.once('complete', this.OnDethAnimComplete, this);
            }

        }

    }

    OnDethAnimComplete() {
        // setTimeout(() => {
        //     this.scene.restart()
        // }, 1000); 
        // this.gameOver.EnableGameOverPopup();
        this.monkeyPlayer.playerContainer.visible = false;
        this.monkeyPlayer.normalMonkey.visible = false;

        // this.GameOver();
        setTimeout(() => {

            // this.CallTheScoreSendAPI();
            this.gameOver.EnableGameOverPopup();
        }, 100);

    }
    OnCollideWithFood(_food, _player) {
        this.food.ScoreCountOnCollide(_food);
    }
    PowerUpEffectOnCollide(_powerupFood, _player) {
        this.MakeTheSceneDisableInteractive();
        // this.magneticField.MakeMagneticFieldEnable(_player.x, _player.y);
        SoundManeger.PlayBoosterSound();
        _powerupFood.body.enable = false;
        _player.body.enable = false;
        // _player.visible = false;
        _powerupFood.visible = false;
        this.upOffest = this.upOffest * 6;
        this.monkeyPlayer.EnableMonkeyPlayer(_player.x, _player.y)
    }
    onPointerDown() {
    }
    /**
     * here i will change the angle of the player and provide a velocity at the 
     * direction at it is facing off
     */
    PlayerMovement() {
        if (!this.isGameEnd) {
            SoundManeger.PlayJump();
            // this.monkeyPlayer.normalMonkey.body.immovable = false;
            this.counterFace += 1;
            if (this.counterFace % 2 == 1) {
                if (this.monkeyPlayer.playerContainer.x >= this.extremeLeftXPos) {
                    this.monkeyPlayer.playerContainer.setAngle(-10);
                    this.monkeyPlayer.PlayLeftJump();
                    this.monkeyPlayer.rightJump.once('complete', this.OnCompleteLeftOrRight, this);
                    this.monkeyPlayer.playerContainer.body.setVelocityX(-300);
                }
            }

            else {
                if (this.monkeyPlayer.playerContainer.x <= this.extremeRightXPos) {
                    this.monkeyPlayer.playerContainer.setAngle(10);
                    this.monkeyPlayer.PlayRightJump();

                    this.monkeyPlayer.leftJump.once('complete', this.OnCompleteLeftOrRight, this);

                    this.monkeyPlayer.playerContainer.body.setVelocityX(300);
                }
            }

            if (this.monkeyPlayer.playerContainer.y < Constant.game.config.height / 4.593) {  //418
                this.monkeyPlayer.playerContainer.body.setVelocityY(0);
            }
            else {
                this.monkeyPlayer.playerContainer.body.setVelocityY(-300);
            }
        }
    }
    OnRestartPressOver() {
        this.isPlateBaseBgMoving = false;
        this.isBranchesTwigsMoving = false;
        this.monkeyPlayer.playerContainer.visible = true;
        this.monkeyPlayer.playerContainer.body.allowGravity = false;
        this.scene.restart('GameScene');
    }
    OnCompleteLeftOrRight() {
        if (!this.isDead) {
            if (this.counterFace % 2 == 0) {
                this.monkeyPlayer.PlayFallRight();
            } else {
                this.monkeyPlayer.PlayFallLeft();
            }
        }
    }
    update(delta) {



        this.bladeObstacle.UpadteRotateTimer();
        // this.titlePopup.RotateTimerWheelsOfTitleScreen();
        //######################################################### 
        if (this.isPlateBaseBgMoving) {
            this.background.MoveBaseBlueImages();
            this.background.MoveTransperentBg();


            this.obstacle.MoveLeftPlates();//----
            this.obstacle.MoveRightPlates();//----
            this.playerBase.MovePlayerBase();//---- 
        }
        if (this.isBranchesTwigsMoving) {
            this.branchesTwig.MoveLeftObstacle();
            this.branchesTwig.MoveRightObstacle();
            this.food.MoveFood();
            this.bladeObstacle.MoveBladeObstacle();
            this.bladeObstacle.MoveRollinBlades();
            this.powerUpFood.MovePowerUpFood();
        }
        //#########################################################  
    }
}//