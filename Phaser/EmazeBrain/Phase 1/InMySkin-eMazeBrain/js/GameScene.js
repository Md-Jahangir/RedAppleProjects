'use strict';
import { LevelManager } from "./LevelManager.js";
import { Server } from "./Server.js";
import { LoadAssets } from "./LoadAssets.js";
import { Database } from "./Database.js";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
        //===> General Data <====//
        this.timerValueText = 3;
        this.timerText;
        this.timerDegre = -89; //89;//1;
        this.tickerRed;
        this.tickerGreen;
        this.tickerDegre = -89; //1;
        this.graphics;
        this.graphics1;
        this.headerBar;
        //=====> Level Data <======//
        this.totalNumberOfLevel;
        this.movementDirection;
        this.movementTime;
        this.rotationType;
        this.rotationTime;
        this.allLevelImage = [];
        this.totalCorrectAnswer = 0;
        this.totalInCorrectAnswer = 0;
        //------------------------------
        this.movementIntervalX = 10;
        this.movementIntervalY;
        this.isInetervalContinuous = true;
        this.continousStartX;
        this.continousStartY;
        this.continousEndX;
        this.continousEndY;
        this.movementType;
        this.movementContinuousIntervalBool = false;
        this.movementIntervalInterval = false;
        this.movementContinuousIntervalArr = [];
        this.movementIntervalIntervalArr = [];
        //-----------------------------------
        this.intervalTimer;
        this.currentLevel = 1;
        this.consecutiveWins = 0;
        this.consecutiveLoose = 0;
        this.comboWins = 0;
        this.totalGamePlayed = 0;
        this.eachLevelTime = 0; //Each level time to calculate response
        this.totalEachLevelTime = []; //Each level time to calculate response
        this.eachGameTime = 0; //Each game time to calculate response
        this.totalNumberUserClicked = 0; //total number of click to calculate response
        this.totalQuestionPresented = 0; // total number of question presented to calculate response
        this.consecutiveComboWins = 0; // to calculate combo
        this.player;
        this.grey;
        this.stopButton;
        //=================Movement Obj Reference===============//
        this.movementContineousTween;
        this.movementContineousContineousTween;
        this.GrayscalePipeline;
        this.layer;
        this.eachLevelTimer;
    }
    preload() {
        this.load.plugin('rexgrayscalepipelineplugin',
            'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgrayscalepipelineplugin.min.js',
            true);
    }
    create() {
        if (Server.platform == "favorites") {
            window.parent.postMessage({ eventName: "gameStarted", payload: null }, "*");
        }
        SoundManager.StartSoundPlay(); //Game start sound 
        //====> Selecting Background <======//
        let levelBackground = LevelManager.DecideLevelBackground();
        let singleImage = levelBackground.split("/");
        let bg = this.add.image(game.config.width / 2, game.config.height / 2, singleImage[singleImage.length - 1]).setOrigin(0.5, 0.5).setScale(scaleFactorX * 1, scaleFactorY * 1);
        bg.setInteractive();
        bg.on("pointerdown", (pointer, x, y, event) => this.OnBackgroundClick());
        //=====> Static Items <==========//        
        this.headerBar = this.add.image(game.config.width / 2, game.config.height / 21, 'titleBg').setOrigin(0.5).setScale(scaleFactorX * 2.3, scaleFactorY * 2.6);
        this.headerBar.depth = 2;
        let titleBg = this.add.image(game.config.width / 1.99, game.config.height / 13.5, "title").setOrigin(0.5, 0.5).setScale(scaleFactorX * 1.8, scaleFactorY * 1.9);
        titleBg.depth = 2;

        this.stopButton = this.add.image(-500, game.config.height / 1.12, "stop").setOrigin(0.5, 0.5).setScale(scaleFactorX * 1.8, scaleFactorY * 1.9);
        this.stopButton.depth = 4;
        this.stopButton.disableInteractive();
        this.stopButton.on("pointerdown", this.StopButtonDown);
        this.stopButton.on("pointerup", this.StopButtonUp);

        //----------------------------------------------

        let thumbsUp = this.add.image(game.config.width / 20, game.config.height / 13.5, "thumbs_up").setOrigin(0.5, 0.5).setScale(scaleFactorX * 1.8, scaleFactorY * 1.8);
        let thumbsDown = this.add.image(game.config.width / 1.05, game.config.height / 13.5, "thumbs_down").setOrigin(0.5, 0.5).setScale(scaleFactorX * 1.8, scaleFactorY * 1.8);
        thumbsUp.depth = 2;
        thumbsDown.depth = 2;

        const style = { font: "bold 30px CCBellyLaugh", fill: "#a18708", stroke: '#fff', strokeThickness: 4, };
        this.thumbsUpText = this.add.text(thumbsUp.x + (game.config.width / 16), thumbsUp.y - (game.config.height / 80), this.totalCorrectAnswer, style).setOrigin(0.5).setScale(scaleFactorX * 1.9, scaleFactorY * 2);
        this.thumbsDownText = this.add.text(thumbsDown.x - (game.config.width / 16), thumbsDown.y - (game.config.height / 80), this.totalInCorrectAnswer, style).setOrigin(0.5).setScale(scaleFactorX * 1.9, scaleFactorY * 2);
        this.thumbsUpText.depth = 2;
        this.thumbsDownText.depth = 2;

        let timerImg = this.add.image(game.config.width / 4.6, game.config.height / 14, "timer").setOrigin(0.5, 0.5).setScale(scaleFactorX * 1.5, scaleFactorY * 1.75);
        timerImg.depth = 3;
        const timerTextStyle = { font: "bold 21px CCBellyLaugh", fill: "#594b03" };
        this.timerText = this.add.text(game.config.width / 4.6, game.config.height / 14, this.timerValueText, timerTextStyle).setOrigin(0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        this.timerText.depth = 3;
        this.tickerRed = this.add.image(game.config.width / 1.3, game.config.height / 16, "ticker_red").setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.45, scaleFactorY * 0.45);
        this.tickerGreen = this.add.image(game.config.width / 1.3, game.config.height / 16, "ticker_green").setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.45, scaleFactorY * 0.45);
        this.tickerRed.visible = false;
        this.tickerGreen.visible = false;
        this.tickerRed.depth = 3;
        this.tickerGreen.depth = 3;
        //------------------------------------------
        this.timer = this.time.addEvent({ delay: 1000, callback: this.UpdateTickerTimer, callbackScope: this, loop: true });
        this.timer.paused = true;
        this.eachLevelTimer = this.time.addEvent({ delay: 100, callback: this.EachLevelTimer, callbackScope: this, loop: true });
        this.eachLevelTimer.paused = true;
        this.rotateTimer = this.time.addEvent({
            delay: (1000),
            callback: this.UpdateRotateTimer,
            callbackScope: this,
            loop: true
        });
        this.rotateTimer.paused = true;
        //====> Timer Arc <============//
        this.graphics = this.add.graphics();
        this.graphics.depth = 3;
        this.graphics1 = this.add.graphics();
        this.graphics1.lineStyle(Math.floor(game.config.width / 300), 0x54f419, 1);
        this.graphics1.beginPath();
        this.graphics1.arc(game.config.width / 1.3, game.config.height / 17, Math.floor(game.config.width / 42), Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(this.tickerDegre), true);
        this.graphics1.strokePath();
        this.graphics1.depth = 3;
        this.graphics1.visible = false;
        //===> Game time <=====//
        this.GameTimer();
        //=======> Setting timer value <======//
        console.log("this.isTimerAvailable " + this.isTimerAvailable);
        if (this.isTimerAvailable) {
            this.timer.paused = true;
            this.graphics1.visible = true;
            this.tickerGreen.visible = true;
        }
        //======> createing initial level <====//      
        this.CreateLevel();
        this.BannerCreateAndHide("GAME_START", true);
    };
    StopButtonDown() {
        this.setScale(scaleFactorX * 1.7, scaleFactorY * 1.8);
        this.scene.totalNumberUserClicked += 1;
        console.log('total number user clicked : ' + this.scene.totalNumberUserClicked);
    };
    StopButtonUp() {
        this.disableInteractive();
        this.setScale(scaleFactorX * 1.8, scaleFactorY * 1.9);
        this.scene.StopMovement();
        setTimeout(() => {
            this.scene.OnObjectClicked();
        }, 500);
    };
    EachLevelTimer() {
        this.eachLevelTime += 100;
    };
    UpdateTickerTimer() {
        this.graphics1.clear();
        let offSet;
        if (this.isTimerAvailable) {
            this.tickerDegre += (360 / this.totalTimeForGame);
            offSet = (270 - (360 / this.totalTimeForGame));
        } else {
            this.tickerDegre += (360 / this.timeForEachLevel);
            offSet = (270 - (360 / this.timeForEachLevel));
        }
        if (this.tickerDegre < 269) {
            if (this.tickerDegre > 180) {
                this.tickerRed.visible = true;
                this.tickerGreen.visible = false;
                this.graphics1.lineStyle(Math.floor(game.config.width / 300), 0xf13900, 1);
                this.graphics1.beginPath();
                this.graphics1.arc(game.config.width / 1.3, game.config.height / 17, Math.floor(game.config.width / 42), Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(this.tickerDegre), true);
                this.graphics1.strokePath();
            } else {
                this.tickerRed.visible = false;
                this.tickerGreen.visible = true;
                this.graphics1.lineStyle(Math.floor(game.config.width / 300), 0x54f419, 1);
                this.graphics1.beginPath();
                this.graphics1.arc(game.config.width / 1.3, game.config.height / 17, Math.floor(game.config.width / 42), Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(this.tickerDegre), true);
                this.graphics1.strokePath();
            }
        } else {
            this.stopButton.disableInteractive();
            this.StopMovement();
            this.graphics1.clear();
            this.graphics1.visible = false;
            this.tickerRed.visible = false;
            this.tickerGreen.visible = false;
            this.timer.paused = true;
            SoundManager.InCorrectAnswerSoundPlay(); //playing unanswered as incorrect
            this.ChangeLevel(false);
        }
    };
    OnBackgroundClick() {
        this.totalNumberUserClicked += 1;
        console.log('total number user clicked : ' + this.totalNumberUserClicked);
    };
    CreateLevel() {
        this.graphics.lineStyle(Math.floor(game.config.width / 290), 0x594b03, 1);
        this.graphics.beginPath();
        this.graphics.arc(game.config.width / 4.6, game.config.height / 14, Math.floor(game.config.width / 50), Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(this.timerDegre), true);
        this.graphics.strokePath();

        //=====> Images will be used in game <=====//
        this.ImageForCurrentLevel();
        //====> Image Rotation <====//
        this.MovementAndRotationOfImage();
        this.currentLevel = LevelManager.GetCurrentLevelNumber();
        //=========> Display Level <=====//
        setTimeout(() => {
            this.DisplayLevel();
        }, 700);

    };
    GameTimer() {
        let questionTimeData = LevelManager.DecideTimeOrNumberOfQuestion();
        console.log("questionTimeData", questionTimeData);
        if (questionTimeData[0] === null || questionTimeData[0] === "") {
            this.isTimerAvailable = false;
        } else {
            this.isTimerAvailable = true;
        }
        this.totalTimeForGame = (questionTimeData[0]); //*1000);
        this.timeForEachLevel = (questionTimeData[1]); //*1000);
        this.totalNumberOfLevel = questionTimeData[2];
    };
    MovementAndRotationOfImage() {
        let movementAndRotationData = LevelManager.DecideMovementAndRotation();
        this.movementDirection = movementAndRotationData[0];
        this.movementTime = (movementAndRotationData[1] * 1000);
    };
    ImageForCurrentLevel() {
        this.allLevelImage = LevelManager.totalLevelImageName;
        this.totalNumberOfImages = LevelManager.numberOfImage;
        this.totalNumberOfTypeOfImages = LevelManager.numberOfTypeOfImage;
        for (let i = 0; i < this.allLevelImage.length; i++) {
            this.allLevelImage[i] = LoadAssets.getImageName(this.allLevelImage[i]);
        }
        if (this.currentLevel % 5 == 0) {
            if (this.numberOfAnswers < 6) {
                this.numberOfAnswers += 1;
            }
        }
        this.numberOfDestractor = this.totalNumberOfImages - this.numberOfAnswers;
    };
    DisplayLevel() {
        const grayscalePipeline = this.renderer.pipelines.get('Gray');
        this.totalQuestionPresented += 1;
        let randomIndex = Math.floor(Math.random() * ((this.allLevelImage.length - 1) - 0 + 1) + 0);
        this.grey = this.add.image(0, game.config.height / 2, this.allLevelImage[randomIndex]).setOrigin(0.5, 0.5).setScale(scaleFactorX * 1.8, scaleFactorY * 1.9); //.setPipeline(grayscalePipeline);
        this.grey.depth = 1;
        this.grey.key = "grey";
        this.grey.visible = true;
        this.player = this.add.image(0, game.config.height / 2, this.allLevelImage[randomIndex]).setOrigin(0.5, 0.5).setScale(scaleFactorX * 1.8, scaleFactorY * 1.9);
        this.player.prevX = 0;
        this.player.prevY = game.config.height / 2;
        this.player.depth = 1;
        this.player.key = "player";
        let pipelineInstance = this.plugins.get('rexgrayscalepipelineplugin').add(this.grey);
        this.SetMovementType(this.player, LevelManager.movementDirection, LevelManager.movementType, this.grey);
        // setTimeout(() => {
        //     this.stopButton.setInteractive();
        // }, 1000);
        if (this.isTimerAvailable) {
            this.timer.paused = false;
        }
        this.eachLevelTimer.paused = false;
    };
    OnObjectClicked() {
        // this.totalEachLevelTime.push(this.eachLevelTime);
        let correct = this.CheckAnswer();
        this.totalGamePlayed += 1;
        console.log('total game played  : ', this.totalGamePlayed);
        if (correct) {
            this.numberOfAnswerClick += 1;
            this.totalCorrectAnswer += 1;
            this.consecutiveWins += 1;
            this.consecutiveComboWins += 1;
            if (this.consecutiveComboWins > this.comboWins) {
                this.comboWins = this.consecutiveComboWins;
            }
            this.consecutiveLoose = 0;
            if ((parseInt(this.consecutiveWins) != parseInt(LevelManager.offsetForLevelUp)) && (parseInt(this.totalGamePlayed) != parseInt(this.totalNumberOfLevel))) {
                this.BannerCreateAndHide("EXCELLENT", true);
                SoundManager.CorrectAnswerSoundPlay(); //Playing when answer is correct
            }
            // this.totalEachLevelTime.push(this.eachLevelTime)
            this.LevelWin(this.totalCorrectAnswer);
        } else {
            this.consecutiveWins = 0;
            this.consecutiveComboWins = 0;
            this.totalInCorrectAnswer += 1;
            this.consecutiveLoose += 1;
            SoundManager.InCorrectAnswerSoundPlay(); //Playing when answer is incorrect
            // this.totalEachLevelTime.push(this.eachLevelTime)
            this.LevelLoose(this.totalInCorrectAnswer);
        }
        // setTimeout(() => {
        this.ChangeLevel(true);
        // }, 700);
    };
    CheckAnswer() {
        let xPoslimit = {
            min: ((this.grey.x + (this.grey.width / 2)) - ((this.grey.width * 85) / 100)),
            max: ((this.grey.x - (this.grey.width / 2)) + ((this.grey.width * 85) / 100))
        };
        let yPosLimit = {
            min: ((this.grey.y + (this.grey.height / 2)) - ((this.grey.height * 85) / 100)),
            max: ((this.grey.y - (this.grey.height / 2)) + ((this.grey.height * 85) / 100))
        };
        let playerXPosLimit = {
            min: ((this.player.x + (this.player.width / 2)) - ((this.player.width * 85) / 100)),
            max: ((this.player.x - (this.player.width / 2)) + ((this.player.width * 85) / 100))
        };
        let playerYPosLimit = {
            min: ((this.player.y + (this.player.height / 2)) - ((this.player.height * 85) / 100)),
            max: ((this.player.y - (this.player.height / 2)) + ((this.player.height * 85) / 100))
        };
        if ((playerXPosLimit.min > (this.grey.x - (this.grey.width / 2)) && playerXPosLimit.min < xPoslimit.min) ||
            (playerXPosLimit.max > xPoslimit.max && playerXPosLimit.max < (this.grey.x + (this.grey.width / 2)))) {
            // //console.log("--------------------win---------------------------");
            return true;
        } else if ((playerYPosLimit.min > (this.grey.y - (this.grey.height / 2)) && playerYPosLimit.min < yPosLimit.min) ||
            (playerYPosLimit.max > yPosLimit.max && playerYPosLimit.max < (this.grey.y + (this.grey.height / 2)))) {
            // //console.log(this.player.x+"--------------------win---------------------------"+this.player.y );
            return true;
        } else {
            if ((this.player.x == this.grey.x) && (this.player.y == this.grey.y)) {
                return true;
            } else {
                // //console.log("--------------------loose---------------------------");
                return false;
            }
        }
    };
    //============Calculate Grey Position =========================//
    SetGreyPosition(_continousStartX, _continousStartY, _continousEndX, _continousEndY, _direction) {
        let dist, min, max, randomPos;
        switch (_direction) {
            case "RTL":
                this.stopButton.x = (game.config.width / 1.06);
                dist = Math.floor(
                    Math.sqrt(
                        Math.pow(Math.abs(_continousEndX - Math.abs(_continousStartX)), 2) +
                        Math.pow(Math.abs(_continousEndY - _continousStartY), 2)
                    )
                );
                min = ((dist * 20) / 100);
                max = ((dist * 60) / 100);
                randomPos = Math.floor(Math.random() * (max - min) + min)
                this.grey.setPosition(_continousEndX, _continousStartY);
                while (this.grey.x > (_continousEndX - randomPos)) {
                    this.grey.x -= this.movementIntervalX;
                }
                break;
            case "LTR":
                this.stopButton.x = (game.config.width / 1.06);
                dist = Math.floor(
                    Math.sqrt(
                        Math.pow(Math.abs(_continousStartX - _continousEndX), 2) +
                        Math.pow(Math.abs(_continousEndY - _continousStartY), 2)
                    )
                );
                min = Math.floor((dist * 20) / 100);
                max = Math.floor((dist * 60) / 100);
                randomPos = Math.floor(Math.random() * (max - min + 1) + min);
                // this.grey.setPosition(_continousStartX,_continousStartY);
                // while(this.grey.x > (_continousStartX - randomPos))
                // {
                //     this.grey.x -= this.movementIntervalX;      
                // }  
                this.grey.setPosition(_continousEndX, _continousStartY);
                while (this.grey.x < (Math.abs(_continousEndX) + randomPos)) {
                    this.grey.x += this.movementIntervalX;
                }
                break;
            case "TTB":
                this.stopButton.x = (game.config.width / 1.06);
                dist = Math.floor(
                    Math.sqrt(
                        Math.pow(Math.abs(_continousStartX - _continousEndX), 2) +
                        Math.pow(Math.abs(_continousStartY - _continousEndY), 2)
                    )
                );
                min = Math.floor((dist * 20) / 100);
                max = Math.floor((dist * 50) / 100);
                randomPos = Math.floor(Math.random() * (max - min) + min);
                // this.grey.setPosition(_continousStartX,_continousStartY);
                // console.log('conntinuousStartX : ',randomPos);
                // console.log('continuousStartY : ',_continousStartY);
                // while(this.grey.y > Math.abs(_continousStartY - randomPos))
                // {
                //     this.grey.y -= ((game.config.height)/ 10);  //this.movementIntervalY;      
                // }    
                // console.log("this.grey.y ->"+this.grey.y);
                this.grey.setPosition(_continousEndX, _continousEndY);
                while (this.grey.y < Math.abs(Math.abs(_continousEndY) + randomPos)) {
                    this.grey.y += ((game.config.height) / 10);
                }
                // console.log("this.grey.y ->"+this.grey.y);
                break;
            case "BTT":
                this.stopButton.x = (game.config.width / 1.06);
                dist = Math.floor(
                    Math.sqrt(
                        Math.pow(Math.abs(_continousStartX - _continousEndX), 2) +
                        Math.pow(Math.abs(_continousEndY - _continousStartY), 2)
                    )
                );
                min = Math.floor((dist * 20) / 100);
                max = Math.floor((dist * 60) / 100);
                randomPos = Math.floor(Math.random() * (max - min) + min);
                this.grey.setPosition(_continousEndX, _continousEndY);
                while (this.grey.y > Math.abs(_continousEndY - randomPos)) {
                    this.grey.y -= ((game.config.height) / 10);
                }
                break;
            case "TRDBL":
                this.stopButton.x = (game.config.width / 1.06);
                dist = (
                    Math.sqrt(
                        Math.pow(((_continousEndX) - (_continousStartX)), 2) +
                        Math.pow(((_continousStartY) - (_continousEndY)), 2)
                    )
                );
                // min = ((dist * 20) / 100);
                min = ((dist * 40) / 100);
                max = ((dist * 60) / 100);
                randomPos = (Math.random() * (max - min) + min);
                this.grey.setPosition(_continousEndX, _continousEndY);
                console.log('_continousEndX  ' + _continousEndX + '_continousEndY  ' + _continousEndY);
                while (this.grey.x > ((_continousEndX) - randomPos) &&
                    this.grey.y < ((_continousEndY) + randomPos)) {
                    this.grey.x -= this.movementIntervalX;
                    this.grey.y += this.movementIntervalY;
                }
                break;
            case "TLDBR":
                this.stopButton.x = (game.config.width / 12);
                dist = Math.floor(
                    Math.sqrt(
                        Math.pow(Math.abs(Math.abs(_continousStartX) - Math.abs(_continousEndX)), 2) +
                        Math.pow(Math.abs(Math.abs(_continousStartY) - Math.abs(_continousEndY)), 2)
                    )
                );
                // min = Math.floor((dist * 20) / 100);
                min = Math.floor((dist * 40) / 100);
                max = Math.floor((dist * 60) / 100);
                randomPos = Math.floor(Math.random() * (max - min) + min);
                this.grey.setPosition(_continousEndX, _continousEndY);
                console.log('continuousEndX : ' + _continousEndX + 'continuousEndY : ' + _continousEndY);
                while (this.grey.x < Math.abs(_continousEndX + randomPos) &&
                    this.grey.y < Math.abs(_continousEndY + randomPos)) {
                    this.grey.x += this.movementIntervalX;
                    this.grey.y += this.movementIntervalY;
                }
                break;
            case "BRDTL":
                this.stopButton.x = (game.config.width / 12);
                dist = Math.floor(
                    Math.sqrt(
                        Math.pow(Math.abs(Math.abs(_continousEndX) - Math.abs(_continousStartX)), 2) +
                        Math.pow(Math.abs(Math.abs(_continousEndY) - Math.abs(_continousStartY)), 2)
                    )
                );
                min = Math.floor((dist * 40) / 100);
                max = Math.floor((dist * 60) / 100);
                randomPos = Math.floor(Math.random() * (max - min) + min);
                this.grey.setPosition(_continousStartX, _continousStartY);
                while (this.grey.x < Math.abs(_continousStartX + randomPos) &&
                    this.grey.y < Math.abs(_continousStartY + randomPos)) {
                    this.grey.x += this.movementIntervalX;
                    this.grey.y += this.movementIntervalY;
                }
                break;
            case "BLDTR":
                this.stopButton.x = (game.config.width / 1.06);
                dist = Math.floor(
                    Math.sqrt(
                        Math.pow(Math.abs(Math.abs(_continousEndX) - Math.abs(_continousStartX)), 2) +
                        Math.pow(Math.abs(Math.abs(_continousEndY) - Math.abs(_continousStartY)), 2)
                    )
                );
                // min = Math.floor((dist * 50) / 100);
                min = Math.floor((dist * 40) / 100);
                max = Math.floor((dist * 60) / 100);
                randomPos = Math.floor(Math.random() * (max - min) + min);
                this.grey.setPosition(_continousStartX, _continousStartY);
                while (this.grey.x > Math.abs(_continousStartX - randomPos) &&
                    this.grey.y < Math.abs(_continousStartY + randomPos)) {
                    this.grey.x -= this.movementIntervalX;
                    this.grey.y += this.movementIntervalY;
                }
                break;
        }
    };
    //=========>Level Complete<=================//
    ChangeLevel(_bool) {
        console.log('_bool : ', _bool);
        let levelOrTimeComplete = true;
        if (this.isTimerAvailable) {
            if (this.timer.paused) {
                levelOrTimeComplete = false;
                this.ClearLevel();
                SoundManager.EndSoundPlay();
                this.BannerCreateAndHide("TIMES_UP", false);
                this.CalculateResponse();
            }
        }
        else {
            if (this.totalGamePlayed == this.totalNumberOfLevel) {
                console.log('this.totalGamePlayed : ', this.totalGamePlayed);
                console.log('this.totalNumberOfLevel : ', this.totalNumberOfLevel)
                levelOrTimeComplete = false;
                this.ClearLevel();
                SoundManager.EndSoundPlay(); //playing game end sound
                this.BannerCreateAndHide("GAME_OVER", false);
                this.CalculateResponse();
                this.timerText.visible = false;
                // this.timer.paused = true; 
            }
            else {
                console.log('_bool : ', _bool);
                if (!_bool) {
                    this.totalGamePlayed += 1;
                    console.log('this.totalGamePlayed :----------------> ', this.totalGamePlayed);
                    console.log('this.totalNumberOfLevel : ', this.totalNumberOfLevel)
                    this.consecutiveWins = 0;
                    this.consecutiveComboWins = 0;
                    this.totalInCorrectAnswer += 1;
                    this.consecutiveLoose += 1;
                    this.currentLevel = LevelManager.GetCurrentLevelNumber();
                    this.LevelLoose(this.totalInCorrectAnswer);
                    // levelOrTimeComplete = false;
                    // this.ClearLevel();                   
                    // this.CreateLevel();

                    //------------------------------------------------------------------------
                    if (this.totalGamePlayed == this.totalNumberOfLevel) {
                        console.log('this.totalGamePlayed : ', this.totalGamePlayed);
                        console.log('this.totalNumberOfLevel : ', this.totalNumberOfLevel)
                        levelOrTimeComplete = false;
                        this.ClearLevel();
                        SoundManager.EndSoundPlay(); //playing game end sound
                        this.BannerCreateAndHide("GAME_OVER", false);
                        this.CalculateResponse();
                        this.timerText.visible = false;
                    }
                    //------------------------------------------------------------------------

                }
                if (this.isTimerAvailable) {
                    this.tickerDegre = -89;
                    this.graphics1.clear();
                    this.graphics1.visible = true;
                    this.graphics1.lineStyle(Math.floor(game.config.width / 300), 0x54f419, 1);
                    this.graphics1.beginPath();
                    this.graphics1.arc(game.config.width / 1.3, game.config.height / 17, Math.floor(game.config.width / 42), Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(this.tickerDegre), true);
                    this.graphics1.strokePath();
                    this.tickerRed.visible = false;
                    this.tickerGreen.visible = true;
                    this.timer.paused = false;
                }
            }
        }
        if (levelOrTimeComplete) {
            this.ClearLevel();
            if (this.consecutiveWins == LevelManager.offsetForLevelUp) {
                this.consecutiveWins = 0;
                this.BannerCreateAndHide("LEVEL_UP", true);
                SoundManager.LevelUpSoundPlay();
                LevelManager.IncreaseLevel(LevelManager);
            } else if (this.consecutiveLoose == LevelManager.offsetForLevelDown) {
                if (this.currentLevel > 1) {
                    LevelManager.DecreaseLevel(LevelManager);
                }
                this.consecutiveLoose = 0;
            }
            this.currentLevel = LevelManager.GetCurrentLevelNumber();
            this.CreateLevel();
        }
    };
    ClearLevel() {
        this.eachLevelTimer.paused = true;
        this.totalEachLevelTime.push(this.eachLevelTime);
        this.timerValueText = 3; // re initialize timer text to 3
        this.timerText.text = this.timerValueText; // settign timer text tot 3
        this.numberOfAnswerClick = 0;
        this.rotateTimer.paused = true;
        this.movementContinuousIntervalBool = false;
        this.movementIntervalInterval = false;
        this.timerDegre = -89;
        if (this.isTimerAvailable) {
            this.timer.paused = true;
            // this.tickerDegre = -89;
        }
        this.eachLevelTime = 0;
        let arrLength = this.scene.scene.children.list.length;
        for (let i = 0; i < arrLength; i++) {
            if (this.scene.scene.children.list[i].key == "player" ||
                this.scene.scene.children.list[i].key == "grey") {
                this.scene.scene.children.list[i].destroy();
                arrLength = this.scene.scene.children.list.length;
                i = 0;
            }
        }
        this.graphics.clear();
        this.movementContinuousIntervalArr = [];
        this.movementIntervalIntervalArr = [];
    };
    LevelWin(_number) {
        this.thumbsUpText.setText(_number);
    };
    LevelLoose(_number) {
        this.thumbsDownText.setText(_number);
    };
    UpdateTimer() {
        // //console.log("-----------------------UpdateTimer---------------") 
        // this.eachLevelTime += 1; 
        this.graphics.clear();
        this.timerDegre += 119;
        if (this.timerDegre < 268) {
            this.graphics.lineStyle(Math.floor(game.config.width / 290), 0x594b03, 1);
            this.graphics.beginPath();
            this.graphics.arc(game.config.width / 4.6, game.config.height / 14, Math.floor(game.config.width / 50), Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(this.timerDegre), true);
            this.graphics.strokePath();
            this.timerValueText -= 1;
            this.timerText.text = this.timerValueText;
        } else {
            this.timerValueText -= 1;
            this.timerText.text = this.timerValueText;
            if (this.timerValueText == 0) {
                this.StopMovement();
                SoundManager.InCorrectAnswerSoundPlay(); //playing unanswered as incorrect
                // setTimeout(() => {
                this.ChangeLevel(false);
                // }, 700);
            }
        }
    };
    //==========Movement =======================//
    SetMovementType(_obj, directionType, movementType, _grey) {
        switch (parseInt(movementType)) {
            case 0:
                this.movementType = "continuous";
                this.SetDirectionType(directionType, _obj, _grey);
                break;
            case 1:
                this.movementType = "intervals";
                this.SetIntervalOffset(directionType);
                this.SetDirectionType(directionType, _obj, _grey);
                break;
            case 2:
                this.movementType = "continuous-continuous";
                this.SetDirectionType(directionType, _obj, _grey);
                break;
            case 3:
                this.movementType = "continuous-interval";
                this.SetDirectionType(directionType, _obj, _grey);
                break;
            case 4:
                this.movementType = "intervals-continuous";
                this.SetDirectionType(directionType, _obj, _grey);
                break;
            case 5:
                this.movementType = "intervals-intervals";
                this.SetDirectionType(directionType, _obj, _grey);
                break;
        }
        console.log("this.movementType" + this.movementType);
    };
    StartMovement(_obj, continousStartX, continousStartY,
        continousEndX, continousEndY, _direction) {

        switch (this.movementType) {
            case "continuous":
                this.SetGreyPosition(continousStartX, continousStartY,
                    continousEndX, continousEndY, _direction);
                this.MovementContineous(_obj, continousStartX, continousStartY,
                    continousEndX, continousEndY);
                break;
            case "intervals":
                this.SetGreyPosition(continousStartX, continousStartY,
                    continousEndX, continousEndY, _direction);
                this.IntervalMovement(_obj, continousStartX, continousStartY, _direction, continousEndX, continousEndY);
                break;
            case "continuous-continuous":
                this.SetGreyPosition(continousStartX, continousStartY,
                    continousEndX, continousEndY, _direction);
                this.MovementContineousContineous(_obj, continousStartX, continousStartY,
                    continousEndX, continousEndY);
                break;
            case "continuous-interval":
                this.SetGreyPosition(continousStartX, continousStartY,
                    continousEndX, continousEndY, _direction);
                this.MovementContineousInterval(_obj, continousStartX, continousStartY,
                    continousEndX, continousEndY, _direction);
                break;
            case "intervals-continuous":
                this.SetGreyPosition(continousStartX, continousStartY,
                    continousEndX, continousEndY, _direction);
                this.MovementIntervalContineous(_direction, _obj, continousEndX, continousEndY, continousStartX, continousStartY);
                break;
            case "intervals-intervals":
                this.SetGreyPosition(continousStartX, continousStartY,
                    continousEndX, continousEndY, _direction);
                this.MovementIntervalInterval(_direction, _obj, continousEndX, continousEndY, continousStartX, continousStartY);
                break;
        }
    };
    SetDirectionType(_direction, _obj, _greyBase, _bool = true) {
        let continousStartX = 10;
        let continousStartY;
        let continousEndX;
        let continousEndY;
        if (_bool) {
            switch (_direction) {
                case "RTL":
                    continousStartX = -_obj.width / 3;
                    continousStartY = _obj.y;
                    // this.movementIntervalX = ((game.config.width)/ 10);
                    this.movementIntervalX = (game.config.width) / 2 - (game.config.width) / 2.5; //((game.config.width)/ 10);
                    // this.movementIntervalY = ((game.config.height)/ 2) - ((game.config.height)/ 2.5);//((game.config.height)/ 10);
                    this.movementIntervalY = 0;
                    continousEndX = (game.config.width);
                    continousEndY = _obj.y;
                    this.movementTime = (((continousEndX - Math.abs(continousStartX)) / Math.abs(this.movementIntervalX)));
                    this.movementTime = ((LevelManager.movementTime * 1000) / this.movementTime);
                    console.log("(this.movementTime) " + (this.movementTime));

                    break;
                case "LTR":
                    continousStartX = (game.config.width + _obj.width / 3);
                    continousStartY = (game.config.height / 2);
                    // this.movementIntervalX = ((game.config.width)/ 10);
                    this.movementIntervalX = (game.config.width) / 2 - (game.config.width) / 2.5; //((game.config.width)/ 10);
                    // this.movementIntervalY = ((game.config.height)/ 2) - ((game.config.height)/ 2.5);//((game.config.height)/ 10);
                    this.movementIntervalY = 0;
                    continousEndX = -_obj.width / 3;
                    continousEndY = (game.config.height / 2);
                    this.movementTime = (((continousStartX - continousEndX) / Math.abs(this.movementIntervalX)));
                    this.movementTime = ((LevelManager.movementTime * 1000) / this.movementTime);
                    break;
                case "TTB":
                    _obj.setScale(scaleFactorX * 1.26, scaleFactorY * 1.33); //added for decreasing 30% of scale of player
                    _greyBase.setScale(scaleFactorX * 1.26, scaleFactorY * 1.33); //added for decreasing 30% of scale of grey
                    continousStartX = (game.config.width / 2);
                    continousStartY = (game.config.height + _obj.height / 2);
                    // continousStartY = (game.config.height + _obj.height/3);
                    // continousEndX = (game.config.width/2);
                    // continousEndY = -(_obj.height/2);
                    continousEndX = (game.config.width / 2); // added for screen and banner consideration
                    continousEndY = (_obj.height + 75); // added for screen and banner consideration
                    console.log('continuous endY : ', continousEndY);
                    // continousEndY = -(_obj.height/3);
                    this.movementIntervalX = 0;
                    // this.movementIntervalY = ((game.config.height)/ 10);
                    // this.movementIntervalX = (game.config.width)/ 2 -(game.config.width)/ 2.5;//((game.config.width)/ 10);
                    this.movementIntervalY = ((game.config.height) / 2) - ((game.config.height) / 2.5); //((game.config.height)/ 10);
                    this.movementTime = ((Math.abs(continousStartY - continousEndY) / Math.abs(this.movementIntervalY))); //*(_obj.x));
                    this.movementTime = ((LevelManager.movementTime * 1000) / this.movementTime);
                    break;
                case "BTT":
                    _obj.setScale(scaleFactorX * 1.26, scaleFactorY * 1.33); //added for decreasing 30% of scale of player
                    _greyBase.setScale(scaleFactorX * 1.26, scaleFactorY * 1.33); //added for decreasing 30% of scale of grey
                    continousStartX = (game.config.width / 2);
                    continousStartY = -(_obj.height / 2);
                    continousEndX = (game.config.width / 2);
                    continousEndY = (game.config.height + _obj.height / 2);
                    this.movementIntervalX = 0;
                    // this.movementIntervalY = ((game.config.height)/ 10);
                    // this.movementIntervalX = (game.config.width)/ 2 -(game.config.width)/ 2.5;//((game.config.width)/ 10);
                    this.movementIntervalY = ((game.config.height) / 2) - ((game.config.height) / 2.5); //((game.config.height)/ 10);
                    this.movementTime = ((Math.abs(continousEndY - continousStartY) / Math.abs(this.movementIntervalY))); //*(_obj.x));
                    this.movementTime = ((LevelManager.movementTime * 1000) / this.movementTime);
                    break;
                case "TRDBL":
                    // this.movementIntervalX = (game.config.width) / 2 - (game.config.width) / 2.5; //((game.config.width)/ 10);
                    // this.movementIntervalY = ((game.config.height) / 2) - ((game.config.height) / 2.5); //((game.config.height)/ 10);
                    // continousEndX = (game.config.width);
                    // continousEndY = 0;    //-(_obj.displayHeight/2);
                    // console.log('continuousEndX : ' + continousEndX + 'continuousEndY : ' + continousEndY);
                    // continousEndY = -(_obj.height/2);
                    // continousStartX = -(_obj.width/2);
                    continousEndX = (game.config.width) + _obj.width / 2;//(game.config.width / 1.3); // newly added for screen and banner consideration
                    continousEndY = (this.headerBar.y + this.headerBar.height / 2);//(game.config.height / 4.3); // newly added for screen and banner consideration
                    continousStartX = -_obj.width / 2;//0; //-(_obj.displayWidth/2);
                    continousStartY = (game.config.height) + _obj.height / 2;
                    this.movementIntervalX = Math.abs((continousEndX - continousStartX) / 10);
                    this.movementIntervalY = Math.abs((continousEndY - continousStartY) / 10);
                    this.movementTime = (((continousStartY - Math.abs(continousEndY)) / Math.abs(this.movementIntervalY)));
                    this.movementTime = ((LevelManager.movementTime * 1000) / this.movementTime);
                    break;
                case "TLDBR":
                    // this.movementIntervalX = Math.floor((game.config.width)/ 10);
                    // this.movementIntervalY = Math.floor((game.config.height)/ 10);
                    // this.movementIntervalX = (game.config.width) / 2 - (game.config.width) / 2.5; //((game.config.width)/ 10);
                    // this.movementIntervalY = ((game.config.height) / 2) - ((game.config.height) / 2.5); //((game.config.height)/ 10);
                    // continousEndX = 0;         //-Math.floor(_obj.width/2);
                    // continousEndY = 0;         //-Math.floor(_obj.height/2);
                    // console.log('continuousEndX : ' + continousEndX + 'continuousEndY : ' + continousEndY);
                    continousEndX = -_obj.width / 2;//game.config.width / 3.5; // newly added for screen and banner consideration
                    continousEndY = (this.headerBar.y + this.headerBar.height / 2); //game.config.height / 3.5; // newly added for screen and banner consideration
                    continousStartX = (game.config.width) + _obj.width / 2;
                    continousStartY = (game.config.height);
                    this.movementIntervalX = Math.abs((continousEndX - continousStartX) / 10);
                    this.movementIntervalY = Math.abs((continousEndY - continousStartY) / 10);
                    this.movementTime = (((continousStartY - Math.abs(continousEndY)) / Math.abs(this.movementIntervalY)));
                    this.movementTime = ((LevelManager.movementTime * 1000) / this.movementTime);
                    break;
                case "BRDTL":
                    // this.movementIntervalX = ((game.config.width)/ 10);
                    // this.movementIntervalY = ((game.config.height)/ 10);
                    // this.movementIntervalX = (game.config.width) / 2 - (game.config.width) / 2.5; 
                    // this.movementIntervalY = ((game.config.height) / 2) - ((game.config.height) / 2.5); 
                    continousStartX = -_obj.width / 2; //-(_obj.width/2);
                    continousStartY = (this.headerBar.y + this.headerBar.height); //-(_obj.height/2);
                    continousEndX = (game.config.width);
                    continousEndY = (game.config.height);
                    this.movementIntervalX = ((continousEndX - continousStartX) / 10);
                    this.movementIntervalY = ((continousEndY - continousStartY) / 10);
                    this.movementTime = (((continousEndY - Math.abs(continousStartY)) / Math.abs(this.movementIntervalY))); //*(_obj.x));
                    this.movementTime = ((LevelManager.movementTime * 1000) / this.movementTime);
                    // _obj.x = 0;
                    // _obj.y = continousStartY;
                    break;
                case "BLDTR":
                    // this.movementIntervalX = ((game.config.width)/ 10);
                    // this.movementIntervalY = ((game.config.height)/ 10);
                    // this.movementIntervalX = (game.config.width) / 2 - (game.config.width) / 2.5; //((game.config.width)/ 10);
                    // this.movementIntervalY = ((game.config.height) / 2) - ((game.config.height) / 2.5); //((game.config.height)/ 10);
                    continousStartX = (game.config.width) + _obj.width / 4;
                    continousStartY = (this.headerBar.y + this.headerBar.height / 2);//0; //-(_obj.height/2);
                    continousEndX = -_obj.width / 2;//0; //-(_obj.width/2);
                    continousEndY = (game.config.height) + _obj.height / 4;
                    this.movementIntervalX = Math.abs((continousEndX - continousStartX) / 10);
                    this.movementIntervalY = Math.abs((continousEndY - continousStartY) / 10);
                    this.movementTime = ((Math.abs(continousStartX - Math.abs(continousEndX)) / Math.abs(this.movementIntervalY)));
                    this.movementTime = ((LevelManager.movementTime * 1000) / this.movementTime);
                    break;
            }
        }
        this.StartMovement(_obj, continousStartX, continousStartY,
            continousEndX, continousEndY, _direction);
    };
    MovementContineous(_obj, _startX, _startY, _endX, _endY) {
        _obj.setPosition(_endX, _endY);
        let ref = this;
        console.log(" this.movementTime ->" + LevelManager.movementTime);
        let movementTime = LevelManager.movementTime;
        setTimeout(() => {
            this.stopButton.setInteractive();
            this.movementContineousTween = this.tweens.add({
                targets: _obj,
                x: _startX, //_endX,
                y: _startY, //_endY,
                ease: 'Linear',
                duration: (LevelManager.movementTime * 1000),
                callbackScope: this,
                // repeat : 2,
                onLoop: function () {
                    ref.UpdateTimer();
                    //console.log("repeat");
                },
                loop: -1,
                loopDelay: 500
            });
        }, 1000);
    };
    MovementContineousContineous(_obj, _startX, _startY, _endX, _endY) {
        _obj.setPosition(_endX, _endY);
        let ref = this;
        let counter = 0;
        console.log(" this.movementTime ->" + LevelManager.movementTime);
        ref.stopButton.setInteractive();
        let tweenFunction = function (_obj, _startX, _startY, _endX, _endY) {
            setTimeout(() => {
                ref.movementContineousContineousTween = ref.tweens.add({
                    targets: _obj,
                    x: _startX,
                    y: _startY,
                    ease: 'Linear',
                    duration: (LevelManager.movementTime * 1000),
                    callbackScope: ref,
                    onComplete: function () {
                        counter += 1;
                        ref.UpdateTimer();
                        if (counter != 3) {
                            setTimeout(() => {
                                ref.movementContineousContineousTween.paused = true;
                                ref.movementContineousContineousTween = null;
                                ref.movementContineousContineousTween = ref.tweens.add({
                                    targets: _obj,
                                    x: _endX,
                                    y: _endY,
                                    ease: 'Linear',
                                    duration: (LevelManager.movementTime * 1000),
                                    callbackScope: ref,
                                    onComplete: function () {
                                        counter += 1;
                                        // console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\");
                                        ref.movementContineousContineousTween.paused = true;
                                        ref.movementContineousContineousTween = null;
                                        ref.UpdateTimer();
                                        tweenFunction(_obj, _startX, _startY, _endX, _endY);
                                    }
                                });

                            }, 500);
                        }
                    }
                });
            }, 1000);
        }
        tweenFunction(_obj, _startX, _startY, _endX, _endY);
    };
    MovementContineousInterval(_obj, _startX, _startY, _endX, _endY, _dir) {
        _obj.bool = false;
        _obj.setPosition(_endX, _endY);
        // console.log("(this.movementTime) "+(this.movementTime));
        this.intervalTimer = this.time.addEvent({
            delay: parseInt(this.movementTime),
            callback: () => {
                switch (_dir) {
                    case "RTL":
                        if (_obj.x > _startX && !_obj.bool) {
                            _obj.x -= this.movementIntervalX;
                        } else {
                            if (!_obj.bool) {
                                this.UpdateTimer();
                            }
                            if (_obj.x < _endX) {
                                _obj.bool = true;
                                _obj.x += this.movementIntervalX;
                            } else {
                                _obj.bool = false;
                                this.UpdateTimer();
                            }
                        }
                        break;
                    case "LTR":
                        if (_obj.x < _startX && !_obj.bool) {
                            console.log("dsads");
                            _obj.x += this.movementIntervalX;
                        } else {
                            if (!_obj.bool) {
                                _obj.bool = true;
                                this.UpdateTimer();
                            }
                            if (_obj.x > _endX && _obj.bool) {
                                console.log("1515");
                                _obj.x -= this.movementIntervalX;
                            } else {
                                _obj.bool = false;
                                this.UpdateTimer();
                            }
                        }
                        break;
                    case "TTB":
                        if (_obj.y < _startY && !_obj.bool) {
                            _obj.y += this.movementIntervalY;
                        } else {
                            if (!_obj.bool) {
                                _obj.bool = true;
                                this.UpdateTimer();
                            }
                            if (_obj.y > _endY) {
                                _obj.y -= this.movementIntervalY;
                            } else {
                                _obj.bool = false;
                                this.UpdateTimer();
                            }
                        }
                        break;
                    case "BTT":
                        if (_obj.y > _startY && !_obj.bool) {
                            _obj.y -= this.movementIntervalY;
                        } else {
                            if (!_obj.bool) {
                                this.UpdateTimer();
                                _obj.bool = true;
                            }
                            if (_obj.y < _endY) {
                                _obj.y += this.movementIntervalY;
                            } else {
                                this.UpdateTimer();
                                _obj.bool = false;
                            }
                        }
                        break;
                    case "TRDBL":
                        if ((_obj.x > _startX || _obj.y < _startY) && !(_obj.bool)) {
                            _obj.x -= this.movementIntervalX;
                            _obj.y += this.movementIntervalY;
                        } else {
                            console.log("898");
                            if (!_obj.bool) {
                                this.UpdateTimer();
                            }
                            if (_obj.x < _endX || _obj.y > _endY) {
                                _obj.bool = true;
                                _obj.x += this.movementIntervalX;
                                _obj.y -= this.movementIntervalY;
                            } else {
                                _obj.bool = false;
                                this.UpdateTimer();
                            }
                        }
                        break;
                    case "TLDBR":
                        if ((_obj.x < _startX ||
                            _obj.y < _startY) && !(_obj.bool)) {
                            _obj.x += this.movementIntervalX;
                            _obj.y += this.movementIntervalY;

                        } else {
                            if (!_obj.bool) {
                                this.UpdateTimer();
                            }
                            if (_obj.x > _endX || _obj.y > _endY) {
                                _obj.bool = true;
                                _obj.x -= this.movementIntervalX;
                                _obj.y -= this.movementIntervalY;
                            } else {
                                _obj.bool = false;
                                this.UpdateTimer();
                            }
                        }
                        break;
                    case "BRDTL":
                        if ((_obj.x > _startX || _obj.y > _startY) && !(_obj.bool)) {
                            _obj.x -= this.movementIntervalX;
                            _obj.y -= this.movementIntervalY;
                        } else {
                            if (!_obj.bool) {
                                this.UpdateTimer();
                            }
                            if ((_obj.x < _endX ||
                                _obj.y < _endY)) {
                                _obj.x += this.movementIntervalX;
                                _obj.y += this.movementIntervalY;

                            } else {
                                _obj.bool = false;
                                this.UpdateTimer();
                            }
                        }
                        break;
                    case "BLDTR":
                        if ((_obj.x < _startX || _obj.y > _startY) && !(_obj.bool)) {
                            _obj.x += this.movementIntervalX;
                            _obj.y -= this.movementIntervalY;
                        } else {
                            if (!_obj.bool) {
                                this.UpdateTimer();
                            }
                            if ((_obj.x > _endX ||
                                _obj.y < _endY)) {
                                _obj.x -= this.movementIntervalX;
                                _obj.y += this.movementIntervalY;

                            } else {
                                _obj.bool = false;
                                this.UpdateTimer();
                            }
                        }
                        break;
                }
            },
            callbackScope: this,
            loop: true
        });
        this.intervalTimer.paused = true;

        setTimeout(() => {
            this.stopButton.setInteractive();
            this.movementContineousTween = this.tweens.add({
                targets: _obj,
                x: _startX,
                y: _startY,
                ease: 'Linear',
                duration: (LevelManager.movementTime * 1000),
                callbackScope: this,
                onComplete: function () {
                    setTimeout(() => {
                        _obj.bool = true;
                        this.UpdateTimer();
                        this.movementContinuousIntervalBool = true;
                        this.intervalTimer.paused = false;
                    }, 500);
                }
            });
        }, 1000);
    };
    MovementIntervalContineous(_dir, _obj, _continousEndX, _continousEndY, _continousStartX, _continousStartY) {
        _obj.setPosition(_continousEndX, _continousEndY);
        setTimeout(() => {
            this.stopButton.setInteractive();
            console.log("interval contenuous" + parseInt(this.movementTime));
            this.intervalTimer = this.time.addEvent({
                delay: parseInt(this.movementTime),
                callback: () => {
                    parseInt("_dir " + _dir);
                    switch (_dir) {
                        case "RTL":
                            if (_obj.x > _continousStartX) {
                                _obj.x -= this.movementIntervalX;
                            } else {
                                this.intervalTimer.paused = true;
                                setTimeout(() => {
                                    this.UpdateTimer();
                                    this.MovementIntervalContineousTween(_obj, _continousEndX, _continousEndY, _continousStartX, _continousStartY);
                                }, 500);
                            }
                            break;
                        case "LTR":
                            if (_obj.x < _continousStartX) {
                                _obj.x += this.movementIntervalX;
                            } else {
                                this.intervalTimer.paused = true;
                                setTimeout(() => {
                                    this.UpdateTimer();
                                    this.MovementIntervalContineousTween(_obj, _continousEndX, _continousEndY, _continousStartX, _continousStartY);
                                }, 500);
                            }
                            break;
                        case "TTB":
                            if (_obj.y < _continousStartY) {
                                _obj.y += this.movementIntervalY;
                            } else {
                                this.intervalTimer.paused = true;
                                setTimeout(() => {
                                    this.UpdateTimer();
                                    this.MovementIntervalContineousTween(_obj, _continousEndX, _continousEndY, _continousStartX, _continousStartY);
                                }, 500);
                            }
                            break;
                        case "BTT":
                            if (_obj.y > _continousStartY) {
                                _obj.y -= this.movementIntervalY;
                            } else {
                                this.intervalTimer.paused = true;
                                setTimeout(() => {
                                    this.UpdateTimer();
                                    this.MovementIntervalContineousTween(_obj, _continousEndX, _continousEndY, _continousStartX, _continousStartY);
                                }, 500);
                            }
                            break;
                        case "TRDBL":
                            if ((_obj.x > _continousStartX || _obj.y < _continousStartY)) {
                                _obj.x -= this.movementIntervalX;
                                _obj.y += this.movementIntervalY;
                            } else {
                                this.UpdateTimer();
                                this.intervalTimer.paused = true;
                                this.MovementIntervalContineousTween(_obj, _continousEndX, _continousEndY, _continousStartX, _continousStartY);
                            }
                            break;
                        case "TLDBR":
                            if ((_obj.x < _continousStartX ||
                                _obj.y < _continousStartY)) {
                                _obj.x += this.movementIntervalX;
                                _obj.y += this.movementIntervalY;

                            } else {
                                this.UpdateTimer();
                                this.intervalTimer.paused = true;
                                this.MovementIntervalContineousTween(_obj, _continousEndX, _continousEndY, _continousStartX, _continousStartY);
                            }
                            break;
                        case "BRDTL":
                            if ((_obj.x > _continousStartX || _obj.y > _continousStartY)) {
                                _obj.x -= this.movementIntervalX;
                                _obj.y -= this.movementIntervalY;
                            } else {
                                this.UpdateTimer();
                                // _obj.setPosition(_continousEndX,_continousEndY);
                                this.intervalTimer.paused = true;
                                this.MovementIntervalContineousTween(_obj, _continousEndX, _continousEndY, _continousStartX, _continousStartY);
                            }
                            break;
                        case "BLDTR":
                            if ((_obj.x < _continousStartX || _obj.y > _continousStartY)) {
                                _obj.x += this.movementIntervalX;
                                _obj.y -= this.movementIntervalY;
                            } else {
                                this.UpdateTimer();
                                this.intervalTimer.paused = true;
                                this.MovementIntervalContineousTween(_obj, _continousEndX, _continousEndY, _continousStartX, _continousStartY);
                            }
                            break;
                    }
                },
                callbackScope: this,
                loop: true
            });
        }, 1000);
    };
    MovementIntervalContineousTween(_obj, _continousEndX, _continousEndY, _continousStartX, _continousStartY) {
        let ref = this;
        _obj._continousStartX = _obj.x;
        _obj._continousStartY = _obj.y;
        setTimeout(() => {
            let tweenFunction = function (_obj, _continousEndX, _continousEndY, _continousStartX, _continousStartY) {
                ref.movementContineousTween = ref.tweens.add({
                    targets: _obj,
                    x: _continousEndX,
                    y: _continousEndY,
                    ease: 'Linear',
                    duration: (LevelManager.movementTime * 1000),
                    callbackScope: ref,
                    onComplete: function () {
                        setTimeout(() => {
                            ref.UpdateTimer();
                            ref.movementContineousTween.paused = true;
                            ref.movementContineousTween = ref.tweens.add({
                                targets: _obj,
                                x: _obj._continousStartX,
                                y: _obj._continousStartY,
                                ease: 'Linear',
                                duration: (LevelManager.movementTime * 1000),
                                callbackScope: ref,
                                onComplete: function () {
                                    ref.UpdateTimer();
                                }
                            });
                        }, 500);
                    }
                });
            }
            tweenFunction(_obj, _continousEndX, _continousEndY, _continousStartX, _continousStartY);
        }, 1000);
    }
    MovementIntervalInterval(_dir, _obj, _endX, _endY, _startX, _startY) {
        _obj.bool = false;
        let bool = false;
        _obj.setPosition(_endX, _endY);
        let counter = 1;
        if (!this.movementIntervalInterval) {
            setTimeout(() => {
                this.stopButton.setInteractive();
                this.intervalTimer = this.time.addEvent({
                    delay: parseInt(this.movementTime),
                    callback: () => {
                        switch (_dir) {
                            case "RTL":
                                if (_obj.x > _startX && !_obj.bool) {
                                    _obj.x -= this.movementIntervalX;
                                } else {
                                    if (!_obj.bool) {
                                        _obj.bool = true;
                                        this.UpdateTimer();
                                    }
                                    if (_obj.x < _endX) {

                                        _obj.x += this.movementIntervalX;
                                    } else {
                                        _obj.bool = false;
                                        this.UpdateTimer();
                                    }
                                }
                                break;
                            case "LTR":
                                if (_obj.x < _startX && !_obj.bool) {
                                    console.log("dsads");
                                    _obj.x += this.movementIntervalX;
                                } else {
                                    if (!_obj.bool) {
                                        _obj.bool = true;
                                        this.UpdateTimer();
                                    }
                                    if (_obj.x > _endX && _obj.bool) {
                                        console.log("1515");
                                        _obj.x -= this.movementIntervalX;
                                    } else {
                                        _obj.bool = false;
                                        this.UpdateTimer();
                                    }
                                }
                                break;
                            case "TTB":
                                if (_obj.y < _startY && !_obj.bool) {
                                    _obj.y += this.movementIntervalY;
                                } else {
                                    if (!_obj.bool) {
                                        _obj.bool = true;
                                        this.UpdateTimer();
                                    }
                                    if (_obj.y > _endY) {
                                        _obj.y -= this.movementIntervalY;
                                    } else {
                                        _obj.bool = false;
                                        this.UpdateTimer();
                                    }
                                }
                                break;
                            case "BTT":
                                if (_obj.y > _startY && !_obj.bool) {
                                    _obj.y -= this.movementIntervalY;
                                } else {
                                    if (!_obj.bool) {
                                        _obj.bool = true;
                                        this.UpdateTimer();
                                    }
                                    if (_obj.y < _endY) {
                                        _obj.y += this.movementIntervalY;
                                    } else {
                                        _obj.bool = false;
                                        this.UpdateTimer();
                                    }
                                }
                                break;
                            case "TRDBL":
                                if ((_obj.x > _startX || _obj.y < _startY) && !(_obj.bool)) {
                                    _obj.x -= this.movementIntervalX;
                                    _obj.y += this.movementIntervalY;
                                } else {
                                    console.log("898");
                                    if (!_obj.bool) {
                                        _obj.bool = true;
                                        this.UpdateTimer();
                                    }
                                    if (_obj.x < _endX || _obj.y > _endY) {
                                        _obj.bool = true;
                                        _obj.x += this.movementIntervalX;
                                        _obj.y -= this.movementIntervalY;
                                    } else {
                                        _obj.bool = false;
                                        this.UpdateTimer();
                                    }
                                }
                                break;
                            case "TLDBR":
                                if ((_obj.x < _startX ||
                                    _obj.y < _startY) && !(_obj.bool)) {
                                    _obj.x += this.movementIntervalX;
                                    _obj.y += this.movementIntervalY;

                                } else {
                                    if (!_obj.bool) {
                                        _obj.bool = true;
                                        this.UpdateTimer();
                                    }
                                    if (_obj.x > _endX || _obj.y > _endY) {
                                        _obj.bool = true;
                                        _obj.x -= this.movementIntervalX;
                                        _obj.y -= this.movementIntervalY;
                                    } else {
                                        _obj.bool = false;
                                        this.UpdateTimer();
                                    }
                                }
                                break;
                            case "BRDTL":
                                if ((_obj.x > _startX || _obj.y > _startY) && !(_obj.bool)) {
                                    _obj.x -= this.movementIntervalX;
                                    _obj.y -= this.movementIntervalY;
                                } else {
                                    if (!_obj.bool) {
                                        _obj.bool = true;
                                        this.UpdateTimer();
                                    }
                                    if ((_obj.x < _endX ||
                                        _obj.y < _endY)) {
                                        _obj.x += this.movementIntervalX;
                                        _obj.y += this.movementIntervalY;

                                    } else {
                                        _obj.bool = false;
                                        this.UpdateTimer();
                                    }
                                }
                                break;
                            case "BLDTR":
                                if ((_obj.x < _startX || _obj.y > _startY) && !(_obj.bool)) {
                                    _obj.x += this.movementIntervalX;
                                    _obj.y -= this.movementIntervalY;
                                } else {
                                    if (!_obj.bool) {
                                        _obj.bool = true;
                                        this.UpdateTimer();
                                    }
                                    if ((_obj.x > _endX ||
                                        _obj.y < _endY)) {
                                        _obj.x -= this.movementIntervalX;
                                        _obj.y += this.movementIntervalY;

                                    } else {
                                        _obj.bool = false;
                                        this.UpdateTimer();
                                    }
                                }
                                break;
                        }
                    },
                    callbackScope: this,
                    loop: true
                });
            }, 1000);
        }
        this.movementIntervalInterval = true;
    };
    MovementInterval(_obj, _dir, _endX, _endY, _startX, _startY) {
        console.log('end X : ' + _endX + 'end Y : ' + _endY);
        console.log('start X : ' + _startX + 'start Y : ' + _startY);
        let rtldBuffer;
        let m;
        switch (_dir) {
            case "RTL":
                if (_obj.x > _startX) {
                    _obj.x -= this.movementIntervalX;
                } else {
                    _obj.setPosition(_endX, _endY);
                    this.UpdateTimer();
                }
                break;
            case "LTR":
                if (_obj.x < _startX) {
                    _obj.x += this.movementIntervalX;
                } else {
                    _obj.setPosition(_endX, _endY);
                    this.UpdateTimer();
                }
                break;
            case "TTB":
                if (_obj.y < _startY) {
                    _obj.y += this.movementIntervalY;
                } else {
                    this.intervalTimer.paused = true;
                    this.UpdateTimer();
                    _obj.setPosition(_endX, _endY);
                    console.log(' _endX--------------------' + _endX + '_endY========================' + _endY);
                    if (this.isInetervalContinuous) {
                        this.intervalTimer.paused = false;
                    }
                }
                break;
            case "BTT":
                if (_obj.y > _startY) {
                    _obj.y -= this.movementIntervalY;
                } else {
                    this.intervalTimer.paused = true;
                    this.UpdateTimer();
                    _obj.setPosition(_endX, _endY);
                    if (this.isInetervalContinuous) {
                        this.intervalTimer.paused = false;
                    }
                }
                break;

            case "TRDBL":
                if ((_obj.x > _startX || _obj.y < _startY)) {
                    _obj.x -= this.movementIntervalX;
                    _obj.y += this.movementIntervalY;
                } else {
                    this.UpdateTimer();
                    _obj.setPosition(_endX, _endY);
                }
                break;
            case "TLDBR":
                if ((_obj.x < _startX ||
                    _obj.y < _startY)) {
                    _obj.x += this.movementIntervalX;
                    _obj.y += this.movementIntervalY;

                } else {
                    this.UpdateTimer();
                    _obj.setPosition(_endX, _endY);
                }
                break;
            case "BRDTL":
                if ((_obj.x > _startX || _obj.y > _startY)) {
                    _obj.x -= this.movementIntervalX;
                    _obj.y -= this.movementIntervalY;
                } else {
                    this.UpdateTimer();
                    _obj.setPosition(_endX, _endY);
                }
                break;
            case "BLDTR":
                if ((_obj.x < _startX || _obj.y > _startY)) {
                    _obj.x += this.movementIntervalX;
                    _obj.y -= this.movementIntervalY;
                } else {
                    this.UpdateTimer();
                    _obj.setPosition(_endX, _endY);
                }
                break;
        }
    };
    SetIntervalOffset(_dir) {
        switch (_dir) {
            case "RTL":
                this.movementIntervalX = ((game.config.width) / 10);
                this.movementIntervalY = ((game.config.height) / 10);
                break;
            case "LTR":
                this.movementIntervalX = ((game.config.width) / 10);
                this.movementIntervalY = ((game.config.height) / 10);
                break;
            case "TTB":
                this.movementIntervalX = ((game.config.width) / 10);
                this.movementIntervalY = ((game.config.height) / 10);
                break;
            case "BTT":
                this.movementIntervalX = ((game.config.width) / 10);
                this.movementIntervalY = ((game.config.height) / 10);
                break;

            case "TRDBL":
                this.movementIntervalX = ((game.config.width) / 10);
                this.movementIntervalY = ((game.config.height) / 10);
                break;
            case "TLDBR":
                this.movementIntervalX = ((game.config.width) / 10);
                this.movementIntervalY = ((game.config.height) / 10);
                break;
            case "BRDTL":
                this.movementIntervalX = ((game.config.width) / 10);
                this.movementIntervalY = ((game.config.height) / 10);
                break;
            case "BLDTR":
                this.movementIntervalX = ((game.config.width) / 10);
                this.movementIntervalY = ((game.config.height) / 10);
                break;
        }
    };
    IntervalMovement(_obj, _startX, _startY, _dir, _continousEndX, _continousEndY) {
        let ref = this;
        let counter = 0;
        _obj.prevX = _continousEndX;
        _obj.prevY = _continousEndY;
        _obj.visible = false;
        _obj.setPosition(_continousEndX, _continousEndY);
        console.log('player X : ' + _continousEndX + 'player Y : ' + _continousEndY);
        _obj.visible = true;
        setTimeout(() => {
            this.stopButton.setInteractive();
            this.intervalTimer = this.time.addEvent({
                // delay: 1000, 
                delay: (this.movementTime),
                callback: () => {
                    ref.MovementInterval(_obj, _dir, _continousEndX, _continousEndY, _startX, _startY);
                    // console.log('continuousEndX : ',_startX);
                    // console.log('continuousEndY : ',_startY);
                },
                callbackScope: this,
                loop: true
            });
        }, 1000);
    };
    //===========>Data to be sent to server<==============//
    CalculateResponse() {
        let _level = LevelManager.GetCurrentLevelNumber();
        let _correctAnwer = this.totalCorrectAnswer;
        let _inCorrectAnswer = this.totalInCorrectAnswer;
        this.totalQuestionPresented = _correctAnwer + _inCorrectAnswer;
        let _accuracy = (this.totalNumberUserClicked === 0) ? 0 : parseInt((this.totalQuestionPresented / this.totalNumberUserClicked) * 100);
        console.log('totalQuestionPresented : ', this.totalQuestionPresented)
        console.log('totalNumberUserClicked : ', this.totalNumberUserClicked)
        console.log('_accuracy : ', _accuracy)

        // if (_accuracy > 100) {
        //     _accuracy = 100;
        // }
        let _totalTime = 0;
        let _avarageTime = 0;
        for (let i = 0; i < this.totalEachLevelTime.length; i++) {
            _totalTime += this.totalEachLevelTime[i];

        }
        if (_totalTime > 0 && this.totalGamePlayed > 0) {
            _avarageTime = (_totalTime / this.totalGamePlayed);; //(this.totalGamePlayed / _totalTime);
        } else {
            _avarageTime = 0;
        }
        let _deviceDateTime = Math.round(new Date().getTime() / 1000).toString();
        let _timePerQuestion = [...this.totalEachLevelTime];
        let _score = (_level * this.totalCorrectAnswer * 99);

        let post_game = {
            "firstStar": false,
            "secondStar": false,
            "thirdStar": false,
            "highScore": null,
            "level": _level,
            "currentScore": _score,
            "brainHelp": Database.brain_help,
            "ratingBox": false
        }

        // for rating system container  

        let startingLevel = LevelManager.GetInitialLevel();
        let presentLevel = LevelManager.GetCurrentLevelNumber();
        console.log('starting level : ' + startingLevel + 'present level : ' + presentLevel);
        if (startingLevel >= 5) {
            if (presentLevel == startingLevel + 5) {
                console.log('rate box enable');
                // show star system
                post_game.ratingBox = true;
            }
            else {
                post_game.ratingBox = false;
            }
        }
        else {
            post_game.ratingBox = false;
        }

        //==============first star calculation========================

        let firstStar = (_correctAnwer / this.totalQuestionPresented);
        console.log('firstStar : ' + firstStar);
        console.log('spectific success rate :  ' + Database.success_rate);
        if (firstStar >= Database.success_rate) {
            post_game.firstStar = true;
        } else {
            post_game.firstStar = false;
        }

        //=================second star calculation=============

        console.log('average answer time : ' + _avarageTime);
        if (parseFloat(_avarageTime).toFixed(2) <= parseFloat(Database.average_answer_time)) {
            post_game.secondStar = true;
        }
        else {
            post_game.secondStar = false;
        }
        //================third star calculation===========================
        let calculation = 2;
        console.log('calculation : ' + calculation);
        let endLevel = _level;
        let startLevel = parseInt(Database.level); //LevelManager.GetInitialLevel();
        console.log('start level : ' + startLevel + 'initial level : ' + endLevel);
        if ((endLevel - startLevel) >= calculation) {
            post_game.thirdStar = true;
        } else {
            post_game.thirdStar = false;
        }
        // score calculation
        if (Database.lastHighestScore == 0 || Database.lastHighestScore == "") {
            post_game.highScore = true;
        } else if (_score > Database.lastHighestScore) {
            post_game.highScore = true;
        } else {
            post_game.highScore = false;
        }
        let brainHelp = Database.brain_help;
        console.log('brain help : ' + brainHelp);

        this.ServerData(_level, _correctAnwer, _inCorrectAnswer,
            _accuracy, _totalTime, _avarageTime, _timePerQuestion,
            _deviceDateTime, this.comboWins, _score, post_game);
    };
    async ServerData(_level, _correctAnwer, _inCorrectAnswer,
        _accuracy, _totalTime, _avarageTime, _timePerQuestion,
        _deviceDateTime, _combo, _score, _post_game) {
        let data = {
            "game_id": gameId, // current game id 
            "questions_presented": this.totalQuestionPresented, // total number of question presented
            "level": _level, // <the level the player reached in this session at the end of the game>
            "correct_answers": _correctAnwer, // number of correct answers
            "incorrect_answers": _inCorrectAnswer, // number of incorrect answers
            "accuracy": _accuracy, // number of clicks (if >1),0/1-If the user missed the target up to 50% of the target size from the target
            "total_time": _totalTime, // 
            "average_answer_time": parseFloat(parseFloat(_avarageTime).toFixed(2)), // number of questions / total time played
            "time_per_question": _timePerQuestion, // {}
            "datetime": _deviceDateTime, //device time
            "combo": _combo, // the highest correct answers combo
            "score": _score // (user’s level)*(correct answers)*(99)
        }
        console.log("data to send ", data);
        let res = await Server.sendGameData(data, Server);
        console.log("res", res);

        let baseUrl = "../post_game_screen/game_end.html";
        // let baseUrl = "https://dev-game-emazebrain.s3.amazonaws.com/post_game_screen/game_end.html";
        // window.open(baseUrl+"?urlData="+JSON.stringify(urlData) , "_self");
        let urlParams = new URLSearchParams(window.location.search);
        let isStandAlone = urlParams.get("standAlone");
        if (isStandAlone == null || isStandAlone == undefined) {
            if (Server.platform == "favorites") {
                window.open(baseUrl +
                    "?firstStar=" + _post_game.firstStar +
                    "&secondStar=" + _post_game.secondStar +
                    "&thirdStar=" + _post_game.thirdStar +
                    "&highScore=" + _post_game.highScore +
                    "&level=" + _post_game.level +
                    "&brainHelp=" + _post_game.brainHelp +
                    "&ratingBox=" + _post_game.ratingBox +
                    "&currentScore=" + _post_game.currentScore +
                    "&t=" + Server.token +
                    "&game_id=" + gameId +
                    "&title=" + Database.title +
                    "&game_name=" + "in-my-slin" +
                    "&platform=" + "favorites", "_self");
            } else {
                window.open(baseUrl +
                    "?firstStar=" + _post_game.firstStar +
                    "&secondStar=" + _post_game.secondStar +
                    "&thirdStar=" + _post_game.thirdStar +
                    "&highScore=" + _post_game.highScore +
                    "&level=" + _post_game.level +
                    "&brainHelp=" + _post_game.brainHelp +
                    "&ratingBox=" + _post_game.ratingBox +
                    "&currentScore=" + _post_game.currentScore +
                    "&t=" + Server.token +
                    "&game_id=" + gameId +
                    "&title=" + Database.title +
                    "&game_name=" + "in-my-slin", "_self");
            }
        }
    };
    //===>Banner Pop up<=========//
    BannerCreateAndHide(_text, _bool) {
        let value;
        switch (_text) {
            case "GAME_START":
                value = 'start';
                break;
            case "EXCELLENT":
                value = 'excellent';
                break;
            case "TIMES_UP":
                value = 'timeUp';
                break;
            case "GAME_OVER":
                value = 'gameOver';
                break;
            case "LEVEL_UP":
                value = 'levelUp';
                break;
        }
        let popUpBg = this.add.image(game.config.width / 2, game.config.height / 2, value).setOrigin(0.5).setScale(scaleFactorX, scaleFactorY);
        popUpBg.depth = 15;
        if (_bool) {
            setTimeout(() => {
                popUpBg.visible = false;
            }, 500);
        }
    };
    StopMovement() {
        switch (this.movementType) {
            case "continuous":
                this.movementContineousTween.paused = true;
                this.movementContineousTween.loop = 0;
                this.movementContineousTween.callbacks.onLoop = null;
                this.movementContineousTween.stop();
                this.movementContineousTween.remove();
                break;
            case "intervals":
                this.intervalTimer.remove();
                break;
            case "continuous-continuous":
                this.movementContineousContineousTween.pause();
                break;
            case "continuous-interval":
                if (!this.movementContinuousIntervalBool) {
                    this.movementContineousTween.pause();
                } else {
                    this.intervalTimer.remove();
                }
                break;
            case "intervals-continuous":
                if (this.intervalTimer.paused) {
                    //   //console.log("this.movementContineousTween",this.movementContineousTween);
                    this.movementContineousTween.pause();
                } else {
                    this.intervalTimer.remove();
                }
                break;
            case "intervals-intervals":
                if (this.movementIntervalInterval) {
                    this.intervalTimer.remove();
                }
                break;
        }
    };
}