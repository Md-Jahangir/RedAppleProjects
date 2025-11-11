// import { GameArchitechture } from "./GameArchitechture.js";
import { LevelManager } from "./LevelManager.js";
import { Server } from "./Server.js";
import { LoadAssets } from "./LoadAssets.js";
import { Database } from "./Database.js";
import { GameArchitechture } from "./GameArchitechture.js";
export default class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
        //         //===> General Data <====//
        this.thumbsDown;
        this.thumbsUp;
        this.bg;
        this.thumbsDownText;
        this.thumbsUpText;
        this.timerImg;
        this.timerText;
        this.timerDegre = -89;     //1;
        this.graphics;
        this.timer;
        this.rotateTimer;
        this.rotationAngle = 0;
        //=====> Level Data <======//
        this.numberOfAnswers = 1;
        this.numberOfDestractor = [];
        this.placementOfImages;
        this.isTimerAvailable;
        this.totalTimeForGame;
        this.timeForEachLevel;
        this.totalNumberOfLevel;
        this.isMovementAvailabe;
        this.isRotationAvailable;
        this.movementDirection;
        this.movementTime;
        this.rotationType;
        this.rotationTime;
        this.totalNumberOfImages;
        this.totalNumberOfTypeOfImages;
        this.allLevelImage = [];
        this.levelBackground;
        this.question = [];
        this.options = [];
        this.checkArr = [];
        this.destractor = [];
        this.numberOfSequence;
        this.totalCorrectAnswer = 0;
        this.totalInCorrectAnswer = 0;
        this.objectAngle = 15;
        //------------------------------
        this.movementTime;
        this.movementType;
        //-----------------------------------
        this.questionObjectPosition = [];
        this.extraArrayElement = [];
        //-----------------------------------
        this.intervalTimer;
        this.currentLevel = 1;
        this.consecutiveWins = 0;
        this.consecutiveLoose = 0;
        this.comboWins = 0;
        this.totalGamePlayed = 0;
        this.totalClickNeeded = 0;
        this.eachLevelTime = 0;//Each level time to calculate response
        this.totalEachLevelTime = [];//Each level time to calculate response
        this.eachGameTime = 0;//Each game time to calculate response
        this.totalNumberUserClicked = 0;//total number of click to calculate response
        this.totalQuestionPresented = 0;// total number of question presented to calculate response
        this.questionImageShowTimer;
        //================timer event====================//
        this.imageShowPerLevelTimer;
        this.allLevelImage = [];
        this.answerImage = [];
        this.objectPosition = [];
        this.answerPosition = [];
        this.sequenceImageCounter = 1;
        this.actualAnsCount = 0;
        this.totalTimeToPlay;
        this.timerText;
        //==================BANNER TEXT===================//
        this.letsStart;
        this.levelUp;
        this.timesUp;
        this.excellent;
        this.gameOver;
        this.eachLevelTimer;
        this.consecutiveComboWins = 0;
        //-------------------------------------------------------
        this.requiredClicksForTheGame = 0;
    }
    create() {
        if (Server.platform == "favorites") {
            window.parent.postMessage({ eventName: "gameStarted", payload: null }, "*");
        }
        SoundManager.StartSoundPlay();         //Game start sound 
        this.levelBackground = LevelManager.DecideLevelBackground();
        let singleImage = this.levelBackground.split("/");
        this.bg = this.add.image(game.config.width / 2, game.config.height / 2, singleImage[singleImage.length - 1]).setOrigin(0.5, 0.5).setScale(scaleFactorX * 1, scaleFactorY * 1);
        this.bg.setInteractive();
        this.bg.on("pointerdown", (pointer, x, y, event) => this.OnBackgroundClick());

        //         //=====> Static Items <==========//        
        let headerBar = this.add.image(game.config.width / 2, game.config.height / 23, 'one_pixel_white').setOrigin(0.5).setScale(scaleFactorX * 3000, scaleFactorY * 240);
        headerBar.setTint("0X04627b");
        headerBar.depth = 2;

        // let a = this.add.image(game.config.width/2,game.config.height/2,'one_pixel_white').setScale(scaleFactorX*200,scaleFactorY*200);
        // a.depth = 5
        const styleHead = { font: "bold 35px CCBellyLaugh", stroke: '#fff', strokeThickness: 6, fill: "#0c4826" };
        let headingText = this.add.text(game.config.width / 2, game.config.height / 12, "Follow The Moskva", styleHead).setOrigin(0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        headingText.depth = 2;
        this.thumbsUp = this.add.image(game.config.width / 23.5, game.config.height / 13.2, "like").setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.75, scaleFactorY * 0.65);
        this.thumbsDown = this.add.image(game.config.width / 1.045, game.config.height / 13.2, "unlke").setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.75, scaleFactorY * 0.65);
        this.thumbsUp.depth = 2;
        this.thumbsDown.depth = 2;
        const style = { font: "bold 30px CCBellyLaugh", fill: "#0c4826", stroke: '#fff', strokeThickness: 6 };
        const style1 = { fontFamily: 'Georgia', fontSize: '45px', fill: '#ff0', fontStyle: 'bold', align: 'center' };
        this.thumbsUpText = this.add.text(this.thumbsUp.x + (game.config.width / 40), this.thumbsUp.y - (game.config.height / 30), this.totalCorrectAnswer, style1).setOrigin(0.5)//.setScale(scaleFactorX*2,scaleFactorY*2);
        this.thumbsDownText = this.add.text(this.thumbsDown.x - (game.config.width / 40), this.thumbsDown.y + (game.config.height / 30), this.totalInCorrectAnswer, style1).setOrigin(0.5)//.setScale(scaleFactorX*2,scaleFactorY*2);
        this.thumbsUpText.depth = 2;
        this.thumbsDownText.depth = 2;

        this.timerImg = this.add.image(game.config.width / 4.6, game.config.height / 13, "ticker").setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.5, scaleFactorY * 0.5);
        this.timerImg.depth = 3;

        this.timer = this.time.addEvent({ delay: 1000, callback: this.UpdateTimer, callbackScope: this, loop: true });
        this.timer.paused = true;
        this.eachLevelTimer = this.time.addEvent({ delay: 100, callback: this.UpdateEachLevelTimer, callbackScope: this, loop: true });
        this.eachLevelTimer.paused = true;

        // this.rotateTimer = this.time.addEvent({
        //     delay: (1000),
        //     callback: this.UpdateRotateTimer,
        //     callbackScope: this, loop: true
        // });
        // this.rotateTimer.paused = true;
        //====> Timer Arc <============//
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(Math.floor(game.config.width / 45), 0xFFDB58, 0.7);
        this.graphics.beginPath();
        this.graphics.arc(game.config.width / 4.6, game.config.height / 13, Math.floor(game.config.width / 100), Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(this.timerDegre), true);
        this.graphics.strokePath();
        this.graphics.depth = 3;
        this.graphics.visible = false;
        this.totalTimeToPlay = LevelManager.maxTimeForGame;

        //===========Answer Click=========================//
        //         this.numberOfAnswerClick = 0;
        //===> Game time <=====//
        this.GameTimer();

        //############## Setting timer value #############//

        if (this.isTimerAvailable) {
            this.timerValueText = this.totalTimeForGame;
        }
        //======> createing initial level <====//
        this.CreateLevel();
        this.graphics.visible = true;
        // this.CorrectImageCheck();

        this.timer.paused = false;
        this.BannerCreateAndHide("GAME_START", true);

    };
    OnBackgroundClick() {
        this.totalNumberUserClicked += 1;
    };
    CreateLevel() {
        this.currentLevel = LevelManager.GetCurrentLevelNumber();
        if (!this.isTimerAvailable) {
            this.timerValueText = this.timeForEachLevel;
        }

        //=====> Images will be used in game <=====//
        this.ImageForCurrentLevel();
        //====> Image Rotation <====//
        this.MovementAndRotationOfImage();
        // //=========> Display Level <=====//
        this.DisplayLevel();
    };
    GameTimer() {
        let questionTimeData = LevelManager.DecideTimeOrNumberOfQuestion();
        if (questionTimeData[0] === null || questionTimeData[0] === "") {
            this.isTimerAvailable = false;
        }
        else {
            this.isTimerAvailable = true;
        }
        this.totalTimeForGame = questionTimeData[0];
        this.timeForEachLevel = questionTimeData[1];
        this.totalNumberOfLevel = questionTimeData[2];
        console.log('totalTimeForGame' + this.totalTimeForGame + " this.timeForEachLevel" + this.timeForEachLevel + ' this.totalNumberOfLevel' + this.totalNumberOfLevel);
    };


    UpdateEachLevelTimer() {
        this.eachLevelTime += 100;
    };
    MovementAndRotationOfImage() {
        let movementAndRotationData = LevelManager.DecideMovementAndRotation();
        if (this.currentLevel >= 15) {
            this.isRotationAvailable = true;
        }
        this.rotationType = movementAndRotationData[2];
    };

    ImageForCurrentLevel() {
        this.allLevelImage = LevelManager.SelectRandomQuestionImageSet();
        this.answerImage = LevelManager.SelectRandomAnswerImageSet();
        this.requiredClicksForTheGame = this.requiredClicksForTheGame + LevelManager.numberOfAnswerImages
        console.log('requiredClicksForTheGame : ', this.requiredClicksForTheGame);

        this.totalNumberOfImages = LevelManager.numberOfImage;
        for (let i = 0; i < this.allLevelImage.length; i++)               //those 7 question images for level 1
        {
            this.allLevelImage[i] = LoadAssets.getImageName(this.allLevelImage[i]);
        }
        for (let i = 0; i < this.answerImage.length; i++)                   // option images coming from LevelManager
        {
            this.answerImage[i] = LoadAssets.getImageName(this.answerImage[i]);
        }
    };
    DisplayLevel(_this) {
        // console.log('enter how many times')
        let objectPositionNumber = LevelManager.randomPosNumber;
        this.question = [];
        this.options = [];
        this.questionImageShowTimer = LevelManager.questionImageShowTimer;
        let optionImage;
        let sceneRef = this;
        // let bool = true;
        //this.objectPosition = LevelManager.GetObjectPostion(objectPositionNumber);
        // console.log('this.objectPosition----->', this.objectPosition);
        // this.objectPosition  = LevelManager.ShuffleArr(this.objectPosition );
        this.answerPosition = LevelManager.GetAnswerImagePosition();
        this.numberOfSequence = LevelManager.sequenceNumber;
        this.answerPosition = LevelManager.ShuffleArr(this.answerPosition);
        this.questionObjectPosition = LevelManager.GetObjectPostion(objectPositionNumber);
        if (LevelManager.sequenceNumber == 1) {
            let lengthDifference = (this.questionObjectPosition.length - this.allLevelImage.length);
            this.extraArrayElement = this.allLevelImage.sort(() => Math.random() - Math.random()).slice(0, lengthDifference);
            for (let i = 0; i < this.extraArrayElement.length; i++) {
                this.allLevelImage.push(this.extraArrayElement[i]);
            }

            this.allLevelImage = LevelManager.ShuffleArr(this.allLevelImage);
            console.log('this.questionObjectPosition', this.questionObjectPosition);

            for (let j = 0; j < this.allLevelImage.length; j++) {
                this.question.push(this.add.sprite(this.questionObjectPosition[j][0], this.questionObjectPosition[j][1], this.allLevelImage[j]).setOrigin(0.5).setScale(scaleFactorX * 0.5, scaleFactorY * 0.5));
                this.question[j].visible = false;
            }
            // console.log('this.question',this.question);
        }

        else if (LevelManager.sequenceNumber == 2) {
            //------------------------------------------------------------------------------------
            console.log('this.questionObjectPosition', this.questionObjectPosition);
            let numberOfImageToSpawn = this.questionObjectPosition.length * 2;
            console.log('numberOfImageToSpawn', numberOfImageToSpawn);
            let randomImages;
            // let randomImages = numberOfImageToSpawn - this.allLevelImage.length;
            if ((numberOfImageToSpawn - this.allLevelImage.length) == 0) {
                // no random images
            }
            else {
                randomImages = numberOfImageToSpawn - this.allLevelImage.length;
            }
            this.extraArrayElement = this.allLevelImage.sort(() => Math.random() - Math.random()).slice(0, randomImages);
            for (let j = 0; j < this.extraArrayElement.length; j++) {
                this.allLevelImage.push(this.extraArrayElement[j]);
            }


            //shuffle the array------------------------------------------
            this.allLevelImage = LevelManager.ShuffleArr(this.allLevelImage);
            console.log('this.allLevelImage', this.allLevelImage);
            //-----------------------------------------------------------

            let arrayToHold = [...this.questionObjectPosition];
            // console.log('arrayToHold',arrayToHold);
            console.log('this.questionObjectPosition', this.questionObjectPosition)
            for (let i = 0; i < arrayToHold.length; i++) {
                this.questionObjectPosition.push(arrayToHold[i]);
            }
            //  for(let i = 0; i < arrayToHold.length; i++)
            //  {
            //      this.questionObjectPosition.push(arrayToHold[i]);
            //  }
            console.log('questionObjectPosition', this.questionObjectPosition);
            for (let j = 0; j < this.questionObjectPosition.length; j++) {
                this.question.push(this.add.sprite(this.questionObjectPosition[j][0], this.questionObjectPosition[j][1], this.allLevelImage[j]).setOrigin(0.5).setScale(scaleFactorX * 0.5, scaleFactorY * 0.5));
                this.question[j].visible = false;
            }
            console.log('question', this.question);
            this.objectPosition.splice(0, this.objectPosition.length);
            for (let i = 0; i < this.questionObjectPosition.length; i++) {
                this.objectPosition.push(this.questionObjectPosition[i]);
            }
        }

        else if (LevelManager.sequenceNumber == 3) {
            //----------------------------------
            console.log('this.questionObjectPosition', this.questionObjectPosition);
            let numberOfImageToSpawn = this.questionObjectPosition.length * 3;
            console.log('numberOfImageToSpawn', numberOfImageToSpawn);
            let randomImages;
            // let randomImages = numberOfImageToSpawn - this.allLevelImage.length;
            if ((numberOfImageToSpawn - this.allLevelImage.length) == 0) {
                // no random images
            }
            else {
                randomImages = numberOfImageToSpawn - this.allLevelImage.length;
            }
            this.extraArrayElement = this.allLevelImage.sort(() => Math.random() - Math.random()).slice(0, randomImages);
            for (let j = 0; j < this.extraArrayElement.length; j++) {
                this.allLevelImage.push(this.extraArrayElement[j]);
            }

            //shuffle the array---------------------------------
            this.allLevelImage = LevelManager.ShuffleArr(this.allLevelImage);
            console.log('this.allLevelImage', this.allLevelImage);
            //--------------------------------------------------

            let arrayToHold = [...this.questionObjectPosition];
            // console.log('arrayToHold',arrayToHold);
            console.log('this.questionObjectPosition', this.questionObjectPosition)
            for (let i = 0; i < arrayToHold.length; i++) {
                this.questionObjectPosition.push(arrayToHold[i]);
            }
            for (let i = 0; i < arrayToHold.length; i++) {
                this.questionObjectPosition.push(arrayToHold[i]);
            }
            console.log('questionObjectPosition', this.questionObjectPosition);
            for (let j = 0; j < this.questionObjectPosition.length; j++) {
                this.question.push(this.add.sprite(this.questionObjectPosition[j][0], this.questionObjectPosition[j][1], this.allLevelImage[j]).setOrigin(0.5).setScale(scaleFactorX * 0.5, scaleFactorY * 0.5));
                this.question[j].visible = false;
            }
            console.log('question', this.question);
            this.objectPosition.splice(0, this.objectPosition.length);
            for (let i = 0; i < this.questionObjectPosition.length; i++) {
                this.objectPosition.push(this.questionObjectPosition[i]);
            }
        }
        else if (LevelManager.sequenceNumber == 4) {
            //-----------------------------------------------------------------------
            //  console.log('this.questionObjectPosition',this.questionObjectPosition);
            let numberOfImageToSpawn = this.questionObjectPosition.length * 4;
            //  console.log('numberOfImageToSpawn',numberOfImageToSpawn);
            let randomImages;
            // let randomImages = numberOfImageToSpawn - this.allLevelImage.length;
            if ((numberOfImageToSpawn - this.allLevelImage.length) == 0) {
                // no random images
            }
            else {
                randomImages = numberOfImageToSpawn - this.allLevelImage.length;
            }
            this.extraArrayElement = this.allLevelImage.sort(() => Math.random() - Math.random()).slice(0, randomImages);
            //  console.log('extra images : ',this.extraArrayElement )
            for (let j = 0; j < this.extraArrayElement.length; j++) {
                this.allLevelImage.push(this.extraArrayElement[j]);
            }
            //Shuffle The Array-----------------------------------
            this.allLevelImage = LevelManager.ShuffleArr(this.allLevelImage);
            console.log('allLevelImage', this.allLevelImage);
            //----------------------------------------------------

            let arrayToHold = [...this.questionObjectPosition];
            // console.log('arrayToHold',arrayToHold);
            //  console.log('this.questionObjectPosition',this.questionObjectPosition)
            for (let i = 0; i < arrayToHold.length; i++) {
                this.questionObjectPosition.push(arrayToHold[i]);
            }
            for (let i = 0; i < arrayToHold.length; i++) {
                this.questionObjectPosition.push(arrayToHold[i]);
            }
            for (let i = 0; i < arrayToHold.length; i++) {
                this.questionObjectPosition.push(arrayToHold[i]);
            }

            //  console.log('questionObjectPosition', this.questionObjectPosition);
            for (let j = 0; j < this.questionObjectPosition.length; j++) {
                this.question.push(this.add.sprite(this.questionObjectPosition[j][0], this.questionObjectPosition[j][1], this.allLevelImage[j]).setOrigin(0.5).setScale(scaleFactorX * 0.5, scaleFactorY * 0.5));
                this.question[j].visible = false;
            }
            //  console.log('question',this.question);
            this.objectPosition.splice(0, this.objectPosition.length);
            for (let i = 0; i < this.questionObjectPosition.length; i++) {
                this.objectPosition.push(this.questionObjectPosition[i]);
            }


        }
        //----------------------------------------------------------------------------
        this.imageShowPerLevelTimer = this.time.addEvent({
            delay: this.questionImageShowTimer,
            callback: this.SequenceManeger,
            callbackScope: this,
            loop: true
        });
        //----------------------------------------------------------------------------
        for (let i = 0; i < this.answerImage.length; i++) {
            optionImage = this.add.sprite(this.answerPosition[i][0], this.answerPosition[i][1], this.answerImage[i]).setOrigin(0.5).setScale(scaleFactorX * 0.5, scaleFactorY * 0.5).setInteractive();
            if (this.allLevelImage.includes(this.answerImage[i])) {
                optionImage.key = "answers";
                // console.log('correct');
            }
            else {
                optionImage.key = "destractor";
                // console.log('incorrect');
            }
            // optionImage.on("pointerup", (pointer, x, y, event) => sceneRef.onObjectClicked(optionImage));
            this.options.push(optionImage);
            optionImage.on("pointerup", (pointer, x, y, event) => sceneRef.onObjectClicked(this.options[i]));
            this.options[i].visible = false;
            // console.log('option images : ',this.options);
        }

        if (this.isRotationAvailable) {
            this.RotateImages(this.rotationType);
        }
        //--------------
        if (LevelManager.levelNumber < 10) {
            this.totalClickNeeded += 1;
        }
        else if (LevelManager.levelNumber < 20) {
            this.totalClickNeeded += 2;
        }
        else {
            this.totalClickNeeded += 3;
        }

    };
    GetObjectPostion(_totalNumberOfObjects) {
        this.add.sprite(Math.floor(game.config.width / 15.5), Math.floor(game.config.height / 2), 'referenceImage').setOrigin(0.5).setScale(scaleFactorX * 0.5, scaleFactorY * 0.5)
        // this.add.sprite(Math.floor(game.config.width / 1.068), Math.floor(game.config.height / 2), 'referenceImage').setOrigin(0.5).setScale(scaleFactorX * 0.5, scaleFactorY * 0.5)
        let totalDistance = Math.floor(game.config.width / 1.068) - Math.floor(game.config.width / 15.5);//19.2);//- Math.floor(game.config.width / 9.6);
        let totalGap = (totalDistance / (_totalNumberOfObjects - 1));
        for (let i = 1; i <= (_totalNumberOfObjects - 1); i++) {
            // for (let i = 1; i <= (_totalNumberOfObjects - 2); i++) {
            this.add.sprite(Math.floor(game.config.width / 15.5) + (i * totalGap), Math.floor(game.config.height / 2), 'referenceImage').setOrigin(0.5).setScale(scaleFactorX * 0.5, scaleFactorY * 0.5)
        }
    };
    SequenceManeger() {
        // console.log('question array length',this.question.length);
        for (let i = 0; i < this.question.length; i++) {
            this.question[i].visible = true;
            this.checkArr.push(this.question.shift());
            // console.log('check',this.checkArr);             
            if (this.checkArr.length > 1) {
                for (let i = 0; i < this.checkArr.length; i++) {
                    this.checkArr[i].visible = false;

                    // console.log('checkArr : ',this.checkArr)
                    this.checkArr.shift();
                    this.sequenceImageCounter++;
                    // console.log('sequenceImageCounter : ', this.sequenceImageCounter);
                    // console.log('this.objectPosition.length',this.questionObjectPosition.length)
                    if (this.sequenceImageCounter == this.questionObjectPosition.length) {
                        setTimeout(() => {
                            this.checkArr[i].visible = false;
                        }, this.questionImageShowTimer);
                        setTimeout(() => {
                            for (let i = 0; i < this.options.length; i++) {
                                this.options[i].visible = true;
                                this.sequenceImageCounter = 0;
                                this.eachLevelTimer.paused = false;
                                console.log(' this.eachLevelTimer.paused ', this.eachLevelTimer.paused)
                                this.timer.paused = false;
                            }
                        }, this.questionImageShowTimer);
                    }
                    break;
                }
            }
            break;
        }
        if (this.question.length == 0) {
            this.imageShowPerLevelTimer.paused = true;
        }
    };
    onObjectClicked(_this) {
        _this.disableInteractive();
        // console.log('when player has to click 2');
        let key = _this.key;
        this.totalNumberUserClicked += 1;
        if (_this.key == "answers") {
            if (LevelManager.answerImageSelected == 1) {
                console.log('when player has to click 1');
                SoundManager.CorrectAnswerSoundPlay();
                this.totalGamePlayed += 1;
                this.totalCorrectAnswer += 1;
                this.consecutiveWins += 1;
                this.consecutiveLoose = 0;
                this.consecutiveComboWins += 1;
                if (this.consecutiveComboWins > this.comboWins) {
                    this.comboWins = this.consecutiveComboWins;
                }
                if ((this.consecutiveWins != LevelManager.offsetForLevelUp) && (this.totalGamePlayed != this.totalNumberOfLevel)) {
                    this.BannerCreateAndHide("EXCELLENT", true);
                }
                this.LevelWin(this.totalCorrectAnswer);
                // this.timer.paused = true;
                this.ChangeLevel(true);
            }
            else if (LevelManager.answerImageSelected == 2) {
                console.log('when player has to click 2');
                this.actualAnsCount++;
                if (this.actualAnsCount == LevelManager.answerImageSelected) {
                    SoundManager.CorrectAnswerSoundPlay()
                    this.totalGamePlayed += 1;
                    this.totalCorrectAnswer += 1;
                    this.consecutiveWins += 1;
                    this.consecutiveLoose = 0;
                    this.consecutiveComboWins += 1;
                    if (this.consecutiveComboWins > this.comboWins) {
                        this.comboWins = this.consecutiveComboWins;
                    }
                    if ((this.consecutiveWins != LevelManager.offsetForLevelUp) && (this.totalGamePlayed != this.totalNumberOfLevel)) {
                        this.BannerCreateAndHide("EXCELLENT", true);
                    }
                    // this.timer.paused = true;
                    this.ChangeLevel(true);
                    this.LevelWin(this.totalCorrectAnswer);
                    this.actualAnsCount = 0;
                }
            }
            else if (LevelManager.answerImageSelected == 3) {
                console.log('when player has to click 3');
                this.actualAnsCount++;
                if (this.actualAnsCount == LevelManager.answerImageSelected) {
                    SoundManager.CorrectAnswerSoundPlay();
                    this.totalGamePlayed += 1;
                    this.totalCorrectAnswer += 1;
                    this.consecutiveWins += 1;
                    this.consecutiveLoose = 0;
                    if (this.consecutiveComboWins > this.comboWins) {
                        this.comboWins = this.consecutiveComboWins;
                    }
                    if ((this.consecutiveWins != LevelManager.offsetForLevelUp) && (this.totalGamePlayed != this.totalNumberOfLevel)) {
                        this.BannerCreateAndHide("EXCELLENT", true);
                    }
                    this.LevelWin(this.totalCorrectAnswer);
                    this.actualAnsCount = 0;
                    // this.timer.paused = true;
                    this.ChangeLevel(true);
                }
            }
        }
        else {
            SoundManager.InCorrectAnswerSoundPlay();
            this.totalGamePlayed += 1;
            // console.log('totalGamePlayed',this.totalGamePlayed);
            this.totalInCorrectAnswer += 1;
            this.consecutiveWins = 0;
            this.consecutiveLoose += 1;
            this.consecutiveComboWins = 0;
            // console.log('comboWins : ',this.comboWins);
            // console.log('wrong Ans : ');
            this.LevelLoose(this.totalInCorrectAnswer);
            this.ChangeLevel(true);
        }
    };
    //=========>Level Complete<=================//
    ChangeLevel(_bool) {
        this.DestroyQuestionAndOptions();
        // this.timerText.destroy();
        // this.timer.paused = true;
        let levelOrTimeComplete = true;
        if (this.isTimerAvailable) {
            if (this.timer.paused) {
                this.checkArr.forEach(element => {
                    element.destroy();
                });
                // console.log('this.checkArr',this.checkArr);

                // console.log('game play : ',this.totalGamePlayed);
                levelOrTimeComplete = false;
                // console.log('time complete');
                SoundManager.EndSoundPlay();
                this.BannerCreateAndHide("TIMES_UP", false);
                // console.log('question',this.question);
                this.ClearLevel();
                this.CalculateResponse();
            }
        }
        else {
            if ((this.totalGamePlayed == this.totalNumberOfLevel)) {
                if (!_bool) {

                }
                // this.timerText.destroy();
                levelOrTimeComplete = false;
                this.ClearLevel();
                // console.log('this.totalGamePlayed == this.totalNumberOfLevel');
                SoundManager.EndSoundPlay();
                this.BannerCreateAndHide("GAME_OVER", false);
                this.CalculateResponse();
                this.graphics.clear();
                this.graphics.visible = false;
                // this.tickerRed.visible = false;
                // this.tickerGreen.visible = false;
                // this.timer.paused = true;
            }
            else {
                if (!_bool) {
                    this.totalGamePlayed += 1;
                    this.consecutiveComboWins = 0;;
                    this.totalInCorrectAnswer += 1;
                    this.consecutiveWins = 0;
                    this.consecutiveLoose += 1;
                    this.LevelLoose(this.totalInCorrectAnswer);
                }
                this.timerDegre = -89;
                this.graphics.clear();
                this.graphics.visible = true;
                this.graphics.lineStyle(Math.floor(game.config.width / 45), 0xFFDB58, 0.7);
                this.graphics.beginPath();
                this.graphics.arc(game.config.width / 4.6, game.config.height / 13, Math.floor(game.config.width / 100), Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(this.timerDegre), true);
                this.graphics.strokePath();
                // this.tickerRed.visible = false;
                // this.tickerGreen.visible = true;
                // this.timer.paused = false;
            }
        }
        if (levelOrTimeComplete) {
            this.ClearLevel();
            if (this.consecutiveWins == LevelManager.offsetForLevelUp) {
                // console.log("level up----------------------------");
                this.consecutiveWins = 0;
                this.BannerCreateAndHide("LEVEL_UP", true);
                SoundManager.LevelUpSoundPlay();
                LevelManager.IncreaseLevel(LevelManager);
            } else if (this.consecutiveLoose == LevelManager.offsetForLevelDown) {
                // console.log("level Down----------------------------"+this.consecutiveWins);
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
        this.question = [];
        this.options = [];
        this.extraArrayElement = [];
        this.questionObjectPosition = [];
        // this.rotateTimer.paused = true;
        this.numberOfAnswers = 0;
        this.eachLevelTime = 0;
        this.DestroyQuestionAndOptions();
    };
    DestroyQuestionAndOptions() {
        for (let i = 0; i < this.question.length; i++) {
            this.question[i].destroy();
        }
        for (let i = 0; i < this.options.length; i++) {
            this.options[i].destroy();
        }
    }
    LevelWin(_number) {
        this.thumbsUpText.setText(_number);
    };
    LevelLoose(_number) {
        this.thumbsDownText.setText(_number);
    };
    UpdateTimer() {
        this.graphics.clear();
        let offSet;
        if (this.isTimerAvailable) {
            this.timerDegre += (360 / this.totalTimeForGame);
            offSet = (270 - (360 / this.totalTimeForGame));
        }
        else if (this.eachLevelTimer.paused == false && this.isTimerAvailable == false) //&& this.totalTimeForGame == "")
        {
            this.timerDegre += (360 / this.timeForEachLevel);
            offSet = (270 - (360 / this.timeForEachLevel));
            console.log('when each level time is availavble but total time is unavailable')
        }
        if (this.timerDegre < 269) {
            if (this.timerDegre > 180) {
                this.graphics.lineStyle(Math.floor(game.config.width / 45), 0xFFDB58, 0.7);
                this.graphics.beginPath();
                this.graphics.arc(game.config.width / 4.6, game.config.height / 13, Math.floor(game.config.width / 100), Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(this.timerDegre), true);
                this.graphics.strokePath();
            }
            else {
                this.graphics.lineStyle(Math.floor(game.config.width / 45), 0xFFDB58, 0.7);
                this.graphics.beginPath();
                this.graphics.arc(game.config.width / 4.6, game.config.height / 13, Math.floor(game.config.width / 100), Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(this.timerDegre), true);
                this.graphics.strokePath();
            }
        }
        else {
            this.graphics.clear();
            this.graphics.visible = false;
            this.timer.paused = true;
            SoundManager.InCorrectAnswerSoundPlay();                               //playing unanswered as incorrect
            this.ChangeLevel(false);
        }
        if (this.totalTimeToPlay == 0) {
            this.timerText.destroy();
        }
    };
    //===========> Rotation answer images after level 14 <=====================//
    RotateImages(rotation) {
        // this.rotateTimer.paused = false;
        // if (rotation == "counter_clockwise") {
        //     this.rotationAngle -= 30//(360/parseInt(LevelManager.rotationTime));//5;
        // }
        // if (rotation == "clockwise") {
        //     this.rotationAngle += 30//(360/parseInt(LevelManager.rotationTime));//5;
        // }
        let rotationAngle;
        if (rotation == "counter_clockwise") {
            rotationAngle = -359;
        }
        if (rotation == "clockwise") {
            rotationAngle = 359;
        }
        this.UpdateRotateTimer(rotationAngle);
    };
    UpdateRotateTimer(_angle) {
        let iterator;
        for (iterator of this.options) {
            this.tweens.add({
                targets: iterator,
                angle: { from: iterator.angle, to: (_angle + iterator.angle) },
                ease: 'Linear',
                duration: 4000,
                callbackScope: this,
                loop: -1
            });
        }
        for (iterator of this.destractor) {
            this.tweens.add({
                targets: iterator,
                angle: { from: iterator.angle, to: (_angle + iterator.angle) },
                ease: 'Linear',
                duration: 4000,
                callbackScope: this,
                loop: -1
            });
        }
    };
    //     //===========>Data to be sent to server<==============//
    CalculateResponse() {
        let _level = LevelManager.GetCurrentLevelNumber();
        let _correctAnwer = this.totalCorrectAnswer;
        let _inCorrectAnswer = this.totalInCorrectAnswer;
        // let _accuracy = (this.totalNumberUserClicked === 0) ? 0 : parseInt((this.totalGamePlayed / this.totalNumberUserClicked) * 100);
        let _accuracy = (this.totalNumberUserClicked === 0) ? 0 : parseInt((this.totalClickNeeded / this.totalNumberUserClicked) * 100);

        // let _accuracy = (this.totalNumberUserClicked === 0) ? 0 : parseInt((this.requiredClicksForTheGame / this.totalNumberUserClicked) * 100)


        let _totalTime = 0;
        let _avarageTime = 0;
        for (let i = 0; i < this.totalEachLevelTime.length; i++) {
            _totalTime += this.totalEachLevelTime[i];

        }
        if (_totalTime > 0 && this.totalGamePlayed > 0) {
            _avarageTime = (_totalTime / this.totalGamePlayed);//(this.totalGamePlayed / _totalTime);
        }
        else {
            _avarageTime = 0;
            // console.log('avgTime : ' + _avarageTime);                         // added to prevent infinity in avaerage time this.totalClickNeeded
        }
        let _timePerQuestion = [...this.totalEachLevelTime];
        let _deviceDateTime = Math.round(new Date().getTime() / 1000).toString();
        let _score = (_level * this.totalCorrectAnswer * 99);

        //==========post game screen=================== 

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
        //    console.log('starting level : ' + startingLevel + 'present level : ' + presentLevel);
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

        //=======first star calculation============

        let firstStar = (_correctAnwer / this.totalQuestionPresented);
        // console.log('firstStar : ' + firstStar);
        // console.log('spectific success rate :  ' + Database.success_rate);
        if (firstStar >= Database.success_rate) {
            // console.log('get first star');
            post_game.firstStar = true;
        }
        else {
            post_game.firstStar = false;
        }

        //============second star calculation============
        console.log('average answer time : ' + _avarageTime);
        if (parseFloat(_avarageTime).toFixed(2) <= parseFloat(Database.average_answer_time)) {
            post_game.secondStar = true;
        }
        else {
            post_game.secondStar = false;
        }

        //=====================third star calculation==============
        let calculation = 2;
        console.log('calculation : ' + calculation);
        let endLevel = _level;
        let startLevel = parseInt(Database.level); //LevelManager.GetInitialLevel();
        console.log('start level : ' + startLevel + 'initial level : ' + endLevel);
        if ((endLevel - startLevel) >= calculation) {
            post_game.thirdStar = true;
        }
        else {
            post_game.thirdStar = false;
        }
        // score calculation
        if (Database.lastHighestScore == 0 || Database.lastHighestScore == "") {
            // show the _score as highest score on dom panel
            post_game.highScore = true;
        }
        else if (_score > Database.lastHighestScore) {
            // show the score scored by player on the dom panel
            post_game.highScore = true;
        }
        else {
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
            "game_id": gameId,// current game id 
            "questions_presented": this.totalQuestionPresented,// total number of question presented
            "level": _level,  // <the level the player reached in this session at the end of the game>
            "correct_answers": _correctAnwer, // number of correct answers
            "incorrect_answers": _inCorrectAnswer, // number of incorrect answers
            "accuracy": _accuracy, // number of clicks (if >1),0/1-If the user missed the target up to 50% of the target size from the target
            "total_time": _totalTime, // 
            "average_answer_time": _avarageTime, // number of questions / total time played
            "time_per_question": _timePerQuestion, // {}
            "datetime": _deviceDateTime, //device time
            "combo": _combo, // the highest correct answers combo
            "score": _score // (user’s level)*(correct answers)*(99)
        }
        let res = await Server.sendGameData(data, Server);
        console.log("data to send ", res);
        let baseUrl = "../post_game_screen/game_end.html";
        // let baseUrl = "https://dev-game-emazebrain.s3.amazonaws.com/post_game_screen/game_end.html";
        // window.open(baseUrl+"?urlData="+JSON.stringify(urlData) , "_self");
        let urlParams = new URLSearchParams(window.location.search);
        let isStandAlone = urlParams.get("standAlone");
        if (isStandAlone == null || isStandAlone == undefined) {
            // window.open(baseUrl +
            //     "?firstStar=" + _post_game.firstStar +
            //     "&secondStar=" + _post_game.secondStar +
            //     "&thirdStar=" + _post_game.thirdStar +
            //     "&highScore=" + _post_game.highScore +
            //     "&level=" + _post_game.level +
            //     "&brainHelp=" + _post_game.brainHelp +
            //     "&ratingBox=" + _post_game.ratingBox +
            //     "&currentScore=" + _post_game.currentScore +
            //     "&t=" + Server.token +
            //     "&game_id=" + gameId +
            //     "&title=" + Database.title +
            //     "&game_name=" + "FollowTheMoskova", "_self");
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
                    "&game_name=" + "FollowTheMoskova" +
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
                    "&game_name=" + "FollowTheMoskova", "_self");
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
        popUpBg.depth = 5;
        if (_bool) {
            setTimeout(() => {
                popUpBg.visible = false;
            }, 500);
        }
    };
}