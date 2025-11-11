import { LevelManager } from "./LevelManager.js";
import { Server } from "./Server.js";
import { LoadAssets } from "./LoadAssets.js";
import { Database } from "./Database.js";
import { GameArchitechture } from "./GameArchitechture.js";
export default class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
        //===> General Data <====//
        this.thumbsDown;
        this.thumbsUp;
        this.bg;
        this.thumbsDownText;
        this.thumbsUpText;
        this.grid;
        this.timerImg;
        this.timerValueText = "00:00";
        this.timerText;
        this.timerDegre = -89; //1;
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
        this.answers = [];
        this.destractor = [];
        this.occupiedCells = [];
        this.totalCorrectAnswer = 0;
        this.totalInCorrectAnswer = 0;
        this.objectAngle = 15;
        //------------------------------
        this.movementTime;
        this.movementType;
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

        //==================BANNER TEXT===================//
        this.letsStart;
        this.levelUp;
        this.timesUp;
        this.excellent;
        this.gameOver;
        this.eachLevelTimer;
        this.consecutiveComboWins = 0;
        //---------------------------------------------
        this.requiredClicksForTheGame = 0;
    }
    preload() {
        this.load.image('img', 'assets/images/img.png');
    }
    create() {
        if (Server.platform == "favorites") {
            window.parent.postMessage({ eventName: "gameStarted", payload: null }, "*");
        }
        SoundManager.StartSoundPlay(); //Game start sound 
        //====> Selecting Background <======//
        this.levelBackground = LevelManager.DecideLevelBackground();
        let singleImage = this.levelBackground.split("/");
        this.bg = this.add.image(game.config.width / 2, game.config.height / 2, "Back" + singleImage[singleImage.length - 1]).setOrigin(0.5, 0.5).setScale(scaleFactorX * 1, scaleFactorY * 1);
        // console.log('this.bg',this.bg)
        this.bg.setInteractive();
        this.bg.on("pointerdown", (pointer, x, y, event) => this.OnBackgroundClick());
        //=====> Static Items <==========//        
        let headerBar = this.add.image(game.config.width / 2, game.config.height / 23, 'one_pixel_white').setOrigin(0.5).setScale(scaleFactorX * 3000, scaleFactorY * 240);
        headerBar.setTint("0X04627b");
        headerBar.depth = 2;
        const style1 = { font: "bold 35px CCBellyLaugh", stroke: '#fff', strokeThickness: 6, fill: "#0c4826" };
        let headingText = this.add.text(game.config.width / 1.85, game.config.height / 12, "Find Us If You Can", style1).setOrigin(0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        headingText.depth = 2;
        this.thumbsUp = this.add.image(game.config.width / 20, game.config.height / 12, "thumbs_up").setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.5, scaleFactorY * 0.5);
        this.thumbsDown = this.add.image(game.config.width / 1.05, game.config.height / 12, "thumbs_down").setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.5, scaleFactorY * 0.5);
        this.thumbsUp.depth = 2;
        this.thumbsDown.depth = 2;
        const style = { font: "bold 30px CCBellyLaugh", fill: "#0c4826", stroke: '#fff', strokeThickness: 6, };
        this.thumbsUpText = this.add.text(this.thumbsUp.x + (game.config.width / 16), this.thumbsUp.y, this.totalCorrectAnswer, style).setOrigin(0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        this.thumbsDownText = this.add.text(this.thumbsDown.x - (game.config.width / 16), this.thumbsDown.y, this.totalInCorrectAnswer, style).setOrigin(0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        this.thumbsUpText.depth = 2;
        this.thumbsDownText.depth = 2;
        this.timerImg = this.add.image(game.config.width / 4.6, game.config.height / 12, "timer").setOrigin(0.5, 0.5).setScale(scaleFactorX * 1.4, scaleFactorY * 1.4);
        this.timerImg.depth = 3;
        const timerTextStyle = { font: "bold 21px CCBellyLaugh", fill: "#0c4826", stroke: '#fff', strokeThickness: 6, };
        this.timerText = this.add.text(game.config.width / 4.1, game.config.height / 11.5, this.timerValueText, timerTextStyle).setOrigin(0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        this.timerText.depth = 3;
        //----------------------------------------------
        this.grid = this.add.image(game.config.width / 1.99, game.config.height / 1.72, "grid").setOrigin(0.5, 0.5).setScale(scaleFactorX * 1.32, scaleFactorY * 1.2);
        //------------------------------------------
        this.timer = this.time.addEvent({ delay: 1000, callback: this.UpdateTimer, callbackScope: this, loop: true });
        this.timer.paused = true;
        this.eachLevelTimer = this.time.addEvent({ delay: 100, callback: this.UpdateEachLevelTimer, callbackScope: this, loop: true });
        this.eachLevelTimer.paused = true;
        // console.log(this.timer);
        this.rotateTimer = this.time.addEvent({
            delay: (1000),
            callback: this.UpdateRotateTimer,
            callbackScope: this,
            loop: true
        });

        this.rotateTimer.paused = true;
        //====> Timer Arc <============//
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(Math.floor(game.config.width / 300), 0x54f419, 1);
        this.graphics.beginPath();
        this.graphics.arc(game.config.width / 4, game.config.height / 12, Math.floor(game.config.width / 36), Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(this.timerDegre), true);
        this.graphics.strokePath();
        this.graphics.depth = 3;
        this.graphics.visible = false;
        //=============Object Location===========================//
        this.objectPosition = [
            Math.floor(game.config.width / 6.6), Math.floor(game.config.height / 3.8)
        ];
        this.objectPositionOffset = [
            Math.floor(game.config.width / 12.5), Math.floor(game.config.height / 7.85)
        ];
        //-----------------Question Locations-------------------------
        this.singleQuestionPostion = [
            [Math.ceil(game.config.width / 13.7), Math.ceil(game.config.height / 1.8)]
        ];
        this.doubleQuestionPosition = [
            [Math.ceil(game.config.width / 13.7), Math.ceil(game.config.height / 2.05)],
            [Math.ceil(game.config.width / 13.7), Math.ceil(game.config.height / 1.6)]
        ];
        this.tripleQuestionPosition = [
            [Math.ceil(game.config.width / 13.7), Math.ceil(game.config.height / 2.2)],
            [Math.ceil(game.config.width / 13.7), Math.ceil(game.config.height / 1.72)],
            [Math.ceil(game.config.width / 13.7), Math.ceil(game.config.height / 1.4)]
        ];

        //===========Answer Click=========================//
        this.numberOfAnswerClick = 0;
        //===> Game time <=====//
        this.GameTimer();

        //############## Setting timer value #############//

        if (this.isTimerAvailable) {
            this.timerValueText = this.totalTimeForGame;
            this.SetTimerText(this.timerValueText);
        }
        //======> createing initial level <====//
        this.CreateLevel();
        this.timer.paused = false;
        this.BannerCreateAndHide("GAME_START", true);

    };
    OnBackgroundClick() {
        this.totalNumberUserClicked += 1;
    };
    DecidePosition() {
        let index = Math.floor(Math.random() * (66 - 0) + 0);
        if (this.occupiedCells.length == 0) {
            return this.CalculatePosition(index);
        } else if (this.occupiedCells.indexOf(index) == -1) {
            return this.CalculatePosition(index);
        } else {
            return this.DecidePosition();
        }
    };
    SetTimerText(_time) {
        let min, sec;
        if (_time > 60) {
            min = parseInt(_time / 60);
            min = min < 10 ? "0" + min : min;
            sec = _time % 60;
        } else {
            min = "00";
            sec = _time < 10 ? "0" + _time : _time;
        }
        this.timerValueText = _time;
        this.timerText.text = min + ":" + sec;
    }
    CalculatePosition(index) {
        this.occupiedCells.push(index);
        if (index == 0) {
            return this.objectPosition;
        } else {
            let rowCollPos = this.FindRowCol(index);
            return [
                (this.objectPosition[0] + Math.ceil(this.objectPositionOffset[0] * rowCollPos[0])),
                (this.objectPosition[1] + Math.ceil(this.objectPositionOffset[1] * rowCollPos[1]))
            ]
        }
    }
    FindRowCol(_index) /* Calculate row and col from index */ {
        return [((_index % 11)), parseInt(_index / 11)];
    };
    GridPositions(_imgName) {
        let obj = this.add.image(Math.floor(game.config.width / 6.6), Math.floor(game.config.height / 3.6), _imgName).setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.6, scaleFactorY * 0.6);
        let obj1 = this.add.image(Math.floor(game.config.width / 5.6), Math.floor(game.config.height / 3.6), _imgName).setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.6, scaleFactorY * 0.6);
        //-------------Question
        let obj2 = this.add.image(Math.floor(game.config.width / 13.7), Math.floor(game.config.height / 2.2), _imgName).setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.6, scaleFactorY * 0.6);
        let obj3 = this.add.image(Math.floor(game.config.width / 13.7), Math.floor(game.config.height / 1.72), _imgName).setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.6, scaleFactorY * 0.6);
        let obj4 = this.add.image(Math.floor(game.config.width / 13.7), Math.floor(game.config.height / 1.4), _imgName).setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.6, scaleFactorY * 0.6);
    };
    CreateLevel() {
        this.currentLevel = LevelManager.GetCurrentLevelNumber();
        console.log('this.currentLevel', this.currentLevel);

        if (!this.isTimerAvailable) {
            this.timerValueText = this.timeForEachLevel;
            this.SetTimerText(this.timerValueText);
        }
        this.eachLevelTimer.paused = false;

        //=====> Images will be used in game <=====//
        this.ImageForCurrentLevel();

        //=========> Display Level <=====//
        this.DisplayLevel();
        // this.GridPositions( this.allLevelImage[0]);
    };
    GameTimer() {
        let questionTimeData = LevelManager.DecideTimeOrNumberOfQuestion();
        if (questionTimeData[0] === null || questionTimeData[0] === "") {
            this.isTimerAvailable = false;
        } else {
            this.isTimerAvailable = true;
        }
        this.totalTimeForGame = questionTimeData[0];
        this.timeForEachLevel = questionTimeData[1];
        this.totalNumberOfLevel = questionTimeData[2];
        console.log("this.totalNumberOfLevel-======" + this.totalNumberOfLevel);
    };
    MovementAndRotationOfImage() {
        let movementAndRotationData = LevelManager.DecideMovementAndRotation();
        if (movementAndRotationData[0] == null) //movement not available
        {
            if (movementAndRotationData[2] == null) //rotation not available
            {
                this.isMovementAvailabe = false;
                this.isRotationAvailable = false;
            } else {
                this.isRotationAvailable = true;
                this.isMovementAvailabe = false;
            }
        } else {
            this.isRotationAvailable = true;
            this.isMovementAvailabe = true;
        }
        this.movementDirection = movementAndRotationData[0];
        this.movementTime = movementAndRotationData[1];
        this.rotationType = movementAndRotationData[2];
        this.rotationTime = movementAndRotationData[3];
    };
    UpdateEachLevelTimer() {
        this.eachLevelTime += 100;
    };
    ImageForCurrentLevel() {
        this.allLevelImage = LevelManager.totalLevelImageName;
        this.totalNumberOfImages = LevelManager.numberOfImage;
        this.totalNumberOfTypeOfImages = LevelManager.numberOfTypeOfImage;
        for (let i = 0; i < this.allLevelImage.length; i++) {
            this.allLevelImage[i] = LoadAssets.getImageName(this.allLevelImage[i]);
        }
        if (parseInt(this.currentLevel / 5) > 6) {
            this.numberOfAnswers = 6;
        } else {
            if (this.currentLevel > 5) {
                this.numberOfAnswers = parseInt(this.currentLevel / 5);
            } else {
                this.numberOfAnswers = 1;
            }
        }
        this.numberOfDestractor = this.totalNumberOfImages - this.numberOfAnswers;
        this.requiredClicksForTheGame = this.requiredClicksForTheGame + this.numberOfAnswers;
        console.log('this.numberOfAnswers : ', this.numberOfAnswers);
        console.log('this.requiredClicksForTheGame : ', this.requiredClicksForTheGame);
    };
    DisplayLevel(_this) {
        let sceneRef = this;
        let _objectPosition = [...this.objectPosition];
        let allImageName = [...this.allLevelImage];
        let positions;
        let answerImage = [];
        let destractorImage = [];
        switch (this.totalNumberOfTypeOfImages) {
            case 1:
                positions = [...this.singleQuestionPostion];
                break;
            case 2:
                positions = [...this.doubleQuestionPosition];
                break;
            case 3:
                positions = [...this.tripleQuestionPosition];
                break;
        }
        // this.bg.depth = 2;
        //################### Creating Question ##############//
        for (let k = 0; k < positions.length; k++) {
            let randomIndex = Math.floor(Math.random() * ((allImageName.length - 1) - 0 + 1) + 0);
            let questionBg = this.add.sprite(positions[k][0], positions[k][1], 'questionBg').setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.6, scaleFactorY * 0.6);
            let question = this.add.sprite(positions[k][0], positions[k][1], allImageName[randomIndex]).setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.35, scaleFactorY * 0.35);
            question.key = "question";
            questionBg.key = "question";
            question.bg = questionBg;
            answerImage.push(allImageName[randomIndex]);
            allImageName.splice(randomIndex, 1);
        }
        //################# Creating Answers ###################//
        for (let i = 0; i < this.numberOfAnswers; i++) {
            let pos = this.DecidePosition();
            // console.log("numberOfAnswers");
            let singleImage;
            if (answerImage.length > 1) {
                let randomIndex = Math.floor(Math.random() * ((answerImage.length - 1) - 0 + 1) + 0);
                singleImage = answerImage[randomIndex];
            } else {
                singleImage = answerImage[0];
            }

            let answersBg = this.add.sprite(pos[0], pos[1], 'answerBg').setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.6, scaleFactorY * 0.6);
            let answers = this.add.sprite(pos[0], pos[1], singleImage).setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.35, scaleFactorY * 0.35);
            answersBg.key = "answers";
            answers.key = "answers";
            answers.bg = answersBg;
            answers.prevX = pos[0];
            answers.prevY = pos[1];
            // answers.depth = 3;
            answers.setInteractive();
            answersBg.setInteractive();
            answers.on("pointerup", () => { sceneRef.onObjectClicked(answers) });
            answersBg.on("pointerup", () => { sceneRef.onObjectClicked(answers) });
            this.answers.push(answers);
        }
        //#################### Creating Destructor ######################//
        for (let j = 0; j < this.numberOfDestractor; j++) {
            let pos1 = this.DecidePosition();
            let singleImage;
            if (allImageName.length > 1) {
                let randomIndex = Math.floor(Math.random() * ((allImageName.length - 1) - 0 + 1) + 0);
                singleImage = allImageName[randomIndex];
            } else {
                singleImage = allImageName[0];
            }
            let destractorBg = this.add.sprite(pos1[0], pos1[1], 'answerBg').setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.6, scaleFactorY * 0.6);
            let destractor = this.add.sprite(pos1[0], pos1[1], singleImage).setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.35, scaleFactorY * 0.35);
            // let destractor = this.add.sprite(pos1[0], pos1[1], 'img').setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.5, scaleFactorY * 0.5);
            destractorBg.key = "destractor";
            destractor.key = "destractor";
            destractor.bg = destractorBg;
            destractor.prevX = pos1[0];
            destractor.prevY = pos1[1];
            destractor.setInteractive();
            destractorBg.setInteractive();
            destractor.on("pointerup", () => { sceneRef.onObjectClicked(destractor) });
            destractorBg.on("pointerup", () => { sceneRef.onObjectClicked(destractor) });
            this.destractor.push(destractor);
        }
        if (this.isRotationAvailable) {
            this.RotateImages(this.rotationType);
        }
        if (this.isMovementAvailabe) {
            this.SetMovementType(LevelManager.movementDirection, LevelManager.movementType);
        }
        this.totalQuestionPresented += 1;
    };
    onObjectClicked(_this) {
        _this.disableInteractive();
        this.totalEachLevelTime.push(this.eachLevelTime);
        console.log("_this", this.numberOfAnswerClick);
        this.totalNumberUserClicked += 1;
        if (_this.key == "answers") {
            this.numberOfAnswerClick += 1;

            _this.visible = false;
            _this.bg.visible = false;
            if (this.numberOfAnswerClick == this.numberOfAnswers) {
                this.totalGamePlayed += 1;
                this.totalCorrectAnswer += 1;
                this.consecutiveWins += 1;
                this.consecutiveLoose = 0;
                this.consecutiveComboWins += 1;
                if (this.consecutiveComboWins > this.comboWins) {
                    this.comboWins = this.consecutiveComboWins;
                }
                if ((this.consecutiveWins != LevelManager.offsetForLevelUp) && (this.totalGamePlayed != this.totalNumberOfLevel)) {
                    // console.log("win========================");
                    this.BannerCreateAndHide("EXCELLENT", true);
                    SoundManager.CorrectAnswerSoundPlay(); //Playing when answer is correct
                }
                this.LevelWin(this.totalCorrectAnswer);
                this.ChangeLevel(true);
            }
        } else if (_this.key == "destractor") {
            this.totalGamePlayed += 1;
            this.totalInCorrectAnswer += 1;
            this.consecutiveWins = 0;
            this.consecutiveLoose += 1;
            this.consecutiveComboWins = 0;
            SoundManager.InCorrectAnswerSoundPlay(); //Playing when answer is incorrect
            this.LevelLoose(this.totalInCorrectAnswer);
            this.ChangeLevel(true);
        }

    }
    //=========>Level Complete<=================//
    ChangeLevel(_bool) {
        let levelOrTimeComplete = true;
        if (this.isTimerAvailable) {
            if (this.timer.paused) {
                levelOrTimeComplete = false;
                this.ClearLevel();
                SoundManager.EndSoundPlay(); //playing game end sound
                this.BannerCreateAndHide("TIMES_UP", false);
                this.CalculateResponse();
            }
        } else {
            if ((this.totalGamePlayed == this.totalNumberOfLevel)) {
                levelOrTimeComplete = false;
                this.ClearLevel();
                SoundManager.EndSoundPlay(); //playing game end sound
                this.BannerCreateAndHide("GAME_OVER", false);
                this.CalculateResponse();
                this.timerText.visible = false;
                this.timer.paused = true;
            } else {
                if (!_bool) {
                    this.totalGamePlayed += 1;
                    this.consecutiveComboWins = 0;
                    this.totalInCorrectAnswer += 1;
                    this.consecutiveWins = 0;
                    this.consecutiveLoose += 1;
                    this.LevelLoose(this.totalInCorrectAnswer);
                }

                this.timer.paused = false;
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
        // this.totalEachLevelTime.push(this.eachLevelTime);
        this.answers = [];
        this.destractor = [];
        this.occupiedCells = [];
        this.objectAngle = 15;
        this.rotationAngle = 0;
        this.numberOfAnswerClick = 0;
        this.eachLevelTime = 0;
        this.eachLevelTimer.paused = true;
        this.rotateTimer.paused = true;
        let arrLength = this.scene.scene.children.list.length;
        for (let i = 0; i < arrLength; i++) {
            if (this.scene.scene.children.list[i].key == "answers" ||
                this.scene.scene.children.list[i].key == "destractor" ||
                this.scene.scene.children.list[i].key == "question") {
                this.scene.scene.children.list[i].destroy();
                arrLength = this.scene.scene.children.list.length;
                i = 0;
            }
        }
    };
    UpdateLevelInformation() { };
    LevelWin(_number) {
        this.thumbsUpText.setText(_number);
    };
    LevelLoose(_number) {
        this.thumbsDownText.setText(_number);
    };
    // Check
    GetDataFromLevelManager() { };
    UpdateTimer() {
        this.timerValueText -= 1;
        this.SetTimerText(this.timerValueText);

        if (this.timerValueText == 0) {
            this.timer.paused = true;
            SoundManager.InCorrectAnswerSoundPlay(); //playing unanswered as incorrect
            this.ChangeLevel(false);
        }
    };
    //===========> Rotation<=====================//
    RotateImages(rotation) {
        this.rotateTimer.paused = false;
        if (rotation == "counter_clockwise") {
            this.rotationAngle -= (360 / parseInt(LevelManager.rotationTime)); //5;
        }
        if (rotation == "clockwise") {
            this.rotationAngle += (360 / parseInt(LevelManager.rotationTime)); //5;
        }

    };
    UpdateRotateTimer() {
        let iterator;
        for (iterator of this.answers) {
            iterator.angle += this.rotationAngle;
        }
        for (iterator of this.destractor) {
            iterator.angle += this.rotationAngle;
        }
    };

    //===========>Data to be sent to server<==============//
    CalculateResponse() {
        let _level = LevelManager.GetCurrentLevelNumber();
        let _correctAnwer = this.totalCorrectAnswer;
        let _inCorrectAnswer;
        //= this.totalInCorrectAnswer;
        // let _accuracy = (this.totalNumberUserClicked === 0) ?
        //     0 : parseInt((this.totalGamePlayed / this.totalNumberUserClicked) * 100);
        console.log("9999", this.isTimerAvailable);
        if (this.totalInCorrectAnswer > 0) {
            _inCorrectAnswer = this.totalInCorrectAnswer;
        }
        else {
            _inCorrectAnswer = 1;
        }
        let _accuracy = (this.totalNumberUserClicked === 0) ?
            0 : parseInt((this.requiredClicksForTheGame / this.totalNumberUserClicked) * 100);

        let _totalTime = 0;
        let _avarageTime = 0;
        for (let i = 0; i < this.totalEachLevelTime.length; i++) {
            _totalTime += this.totalEachLevelTime[i];

        }
        if (_totalTime > 0) {
            if (this.totalGamePlayed == 0)
                this.totalGamePlayed = 1;
            _avarageTime = (_totalTime / this.totalGamePlayed); //(this.totalGamePlayed / _totalTime);
        }
        let _timePerQuestion = [...this.totalEachLevelTime];
        let _deviceDateTime = Math.round(new Date().getTime() / 1000).toString();
        let _score = (_level * this.totalCorrectAnswer * 99);


        let post_game = {
            "firstStar": false,
            "secondStar": false,
            "thirdStar": false,
            "highScore": null,
            "level": _level,
            "currentScore": _score,
            "brainHelp": Database.brain_help,
            "ratingBox": true
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

        //=============first star calculation=================

        let firstStar = (_correctAnwer / this.totalQuestionPresented);
        if (firstStar >= Database.success_rate) {
            post_game.firstStar = true;
        } else {
            post_game.firstStar = false;
        }

        //===========second star calculation==================

        console.log('average answer time : ' + _avarageTime);
        if (parseFloat(_avarageTime).toFixed(2) <= parseFloat(Database.average_answer_time)) {
            post_game.secondStar = true;
        }
        else {
            post_game.secondStar = false;
        }
        //=============third star calculation======================
        let calculation = 2;
        let endLevel = _level;
        let startLevel = parseInt(Database.level)//LevelManager.GetInitialLevel();
        console.log('start level : ' + startLevel + 'initial level : ' + endLevel);
        if ((endLevel - startLevel) <= calculation) {
            post_game.thirdStar = true;
        } else {
            post_game.thirdStar = false;
        }
        // score calculation
        console.log('last high score : ' + Database.lastHighestScore);
        if (Database.lastHighestScore == 0 || Database.lastHighestScore == "") {
            post_game.highScore = true;
        } else if (_score > Database.lastHighestScore) {
            post_game.highScore = true;
        } else {
            post_game.highScore = false;
        }
        let brainHelp = Database.brain_help;


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
            //     "&game_name=" + "Finds-Us-If-you-can", "_self");
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
                    "&game_name=" + "Find-Us-If-you-can" +
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
                    "&game_name=" + "Find-Us-If-you-can", "_self");
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
    }
}