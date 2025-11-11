import { LevelManager } from "./LevelManager.js";
import { LoadAssets } from "./LoadAssets.js";
import { Server } from "./Server.js";
import { Database } from "./Database.js";
import { ErrorPopup } from "./ErrorPopup.js";
export default class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
        //===> General Data <====//
        this.thumbsDown;
        this.thumbsUp;
        this.bg;
        this.thumbsDownText;
        this.thumbsUpText;
        this.tickerRed;
        this.tickerGreen;
        this.timerDegre = -89; //1;
        this.graphics;
        this.timer;
        this.rotateTimer;
        // this.rotationAngle = 0;
        this.eachLevelTimer = null;
        this.consecutiveComboWins = 0;
        this.totalClickNeeded = 0;
        //=====> Level Data <======//
        this.numberOfAnswers;
        this.numberOfDestractor = [];
        this.placementOfImages;
        this.isTimerAvailable;
        this.totalTimeForGame;
        this.timeForEachLevel;
        this.totalNumberOfLevel;
        this.isMovementAvailabe;
        this.isRotationAvailable;
        this.movementDirection;
        this.rotationType;
        this.rotationTime;
        this.totalNumberOfImages;
        this.allLevelImage = [];
        this.levelBackground;
        this.answers = [];
        this.destractor = [];
        this.totalCorrectAnswer = 0;
        this.totalInCorrectAnswer = 0;
        this.objectAngle = 15;
        //------------------------------
        this.movementInterval;
        this.movementIntervalX = 10;
        this.movementIntervalY;
        this.isInetervalContinuous = true;
        this.continousStartX;
        this.continousStartY;
        this.continousEndX;
        this.continousEndY;
        this.isMovementContinuous = true;
        this.movementTime;
        this.movementType;
        this.isSingleMovement = false;
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
        this.objectPosition = [];
        this.eachLevelTime = 0; //Each level time to calculate response
        this.totalEachLevelTime = []; //Each level time to calculate response
        this.eachGameTime = 0; //Each game time to calculate response
        this.totalNumberUserClicked = 0; //total number of click to calculate response
        // this.totalNumberUserAnswered  = 0;//total number of question answered to calculate response
        this.totalQuestionPresented = 0; // total number of question presented to calculate response
        //==================BANNER TEXT===================//
        this.letsStart;
        this.levelUp;
        this.timesUp;
        this.excellent;
        this.gameOver;
        this.FirstMovement //after creating object movement time
        this.TimeBetweenInterval = 1500;
        this.errorPopup;
    }
    create() {
        if (Server.platform == "favorites") {
            window.parent.postMessage({ eventName: "gameStarted", payload: null }, "*");
        }
        this.errorPopup = new ErrorPopup(this);
        this.headerBar = this.add.image(game.config.width / 2, game.config.height / 17, 'titleBg').setOrigin(0.5).setScale(scaleFactorX * 2.3, scaleFactorY * 2.5);
        this.headerBar.depth = 2;
        this.headerBar.setTint(0xaed9f8);
        const style = { font: "bold 30px Arial", fill: "#000" };
        const style1 = {
            font: "bold 30px Arial",
            stroke: '#000',
            fill: "#003081"
        };
        let headingText = this.add.text(game.config.width / 2, game.config.height / 13, "The Shadower", style1).setOrigin(0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        headingText.depth = 3
        this.thumbsUp = this.add.image(game.config.width / 20, game.config.height / 14, "like").setOrigin(0.5).setScale(scaleFactorX * 0.09, scaleFactorY * 0.09);
        this.thumbsUp.depth = 2;
        this.thumbsUpText = this.add.text(this.thumbsUp.x + (game.config.width / 12.8), this.thumbsUp.y, this.totalCorrectAnswer, style).setOrigin(0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        this.thumbsUpText.depth = 2;
        this.thumbsDown = this.add.image(game.config.width / 1.05, game.config.height / 14, "unlke").setOrigin(0.5).setScale(scaleFactorX * 0.09, scaleFactorY * 0.09);
        this.thumbsDown.depth = 2;
        this.thumbsDownText = this.add.text(this.thumbsDown.x - (game.config.width / 12.8), this.thumbsDown.y, this.totalInCorrectAnswer, style).setOrigin(0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        this.thumbsDownText.depth = 2;

        //=====> Static Items <==========//        
        SoundManager.StartSoundPlay(); //Game start sound 

        this.timer = this.time.addEvent({ delay: 1000, callback: this.UpdateTimer, callbackScope: this, loop: true });
        this.timer.paused = true;
        this.eachLevelTimer = this.time.addEvent({ delay: 100, callback: this.UpdateEachLevelTimer, callbackScope: this, loop: true });
        this.eachLevelTimer.paused = true;
        // //====> Timer Arc <============//

        this.timeBar = this.add.sprite(game.config.width / 5.8, game.config.height / 13.1, 'one_pixel_white').setOrigin(0, 0.5).setScale(scaleFactorX * 340, scaleFactorY * 40);
        this.timeBar.setTint(0x00ff00);
        this.timeBar.depth = 2;
        this.ticker = this.add.image(game.config.width / 3.78, game.config.height / 13, "timer_bg").setOrigin(0.5).setScale(scaleFactorX * 1.98, scaleFactorY * 2);
        this.ticker.depth = 3;

        //===> Game time <=====//
        this.GameTimer();
        //====> Selecting Background <======//
        this.levelBackground = LevelManager.DecideLevelBackground();
        // console.log("this.levelBackground ->" + this.levelBackground);
        this.bg = this.add.image(game.config.width / 2, game.config.height / 2, this.levelBackground).setOrigin(0.5, 0.5).setScale(scaleFactorX * 1, scaleFactorY * 1);
        this.bg.setInteractive();
        this.bg.on("pointerdown", (pointer, x, y, event) => this.OnBackgroundClick());
        //======> createing initial level <====//
        this.CreateLevel();
        // if

    }
    OnBackgroundClick() {
        this.totalNumberUserClicked += 1;
    };
    UpdateEachLevelTimer() {
        this.eachLevelTime += 100;
    };
    CreateLevel() {
        this.eachLevelTimer.paused = false;
        // LevelManager.DecidePlacementOfImages();
        // //====> Selecting Background <======//
        this.levelBackground = LevelManager.DecideLevelBackground();
        //=====> Images will be used in game <=====//
        this.ImageForCurrentLevel();
        //====> Image Rotation <====//
        this.MovementAndRotationOfImage();
        //====> Game image numer <==//
        // this.numberOfAnswers;
        // this.numberOfDestractor;
        // this.placementOfImages;
        this.currentLevel = LevelManager.GetCurrentLevelNumber();
        //=========> Display Level <=====//
        setTimeout(() => {
            let returnVal = this.DisplayLevel();
            if (returnVal != null) {
                this.timer.paused = false;
                this.BannerCreateAndHide("GAME_START", true);
            }
        }, 500);
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
        console.log(" this.timeForEachLevel ", this.timeForEachLevel);
        console.log('totalNumber of Level: ', this.totalNumberOfLevel);
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
        this.movementTime = (movementAndRotationData[1] * 1000);
        this.rotationType = movementAndRotationData[2];
        this.rotationTime = (movementAndRotationData[3] * 1000);
    };
    ImageForCurrentLevel() {
        this.allLevelImage = LevelManager.SelectRandomGameImage(this);
        console.log('this.allLevelImage', this.allLevelImage)
        this.totalNumberOfImages = LevelManager.numberOfImage;
        console.log(" this.totalNumberOfImages ", this.totalNumberOfImages);
    };
    DisplayLevel(_this) {
        let sceneRef = this;
        let answers = null;
        let destractor = null;
        let colour = LevelManager.GetColour();
        console.log("------colour---------", colour);
        let _objectPosition = LevelManager.GetObjectPostion(); //[...this.objectPosition];
        _objectPosition = LevelManager.ShuffleArr(_objectPosition);
        this.totalQuestionPresented += 1;
        //Question image name-----------------------------
        try {
            const name = this.allLevelImage[0].split("_");
            // Question images-----------------------------------------
            this.question = this.add.sprite(game.config.width / 2, game.config.height / 1.8, name[0] + '_original');  //changed
            console.log('question object created', this.question);
            this.question.depth = 1;
            this.question.key = "original";
            for (let i = 0; i < this.allLevelImage.length; i++) {
                let answers = this.add.sprite(_objectPosition[i][0], _objectPosition[i][1], this.allLevelImage[i]).setOrigin(0.5).setScale(scaleFactorX * 0.7, scaleFactorY * 0.7);
                answers.setTint(colour);
                if (this.allLevelImage[i].includes("correct")) {
                    // answers.alpha = 0.5;
                    answers.key = "answers";
                } else {
                    answers.key = "destractor";
                }
                answers.setInteractive();
                answers.on("pointerup", (pointer, x, y, event) => sceneRef.onObjectClicked(answers));
                this.answers.push(answers);
            }
            if (this.isRotationAvailable) {
                this.RotateImages(this.rotationType);
            }

            if (this.isMovementAvailabe) {
                this.SetMovementType(LevelManager.movementDirection, LevelManager.movementType);
            }
            return 1;
        } catch (error) {
            // let errorPopup = new ErrorPopup(this);
            this.errorPopup.ShowErrorPopup("Please provide corrrect image");
            return null;
        }

    };
    onObjectClicked(_this) {
        this.totalGamePlayed += 1;
        this.totalNumberUserClicked += 1;

        this.totalEachLevelTime.push(this.eachLevelTime);   // newly added here for actual response time calculation

        // this.totalNumberUserAnswered += 1;
        // console.log(_this.key);
        let key = _this.key;
        if (_this.key == "answers") {
            this.totalCorrectAnswer += 1;
            this.consecutiveWins += 1;
            this.consecutiveLoose = 0;
            this.consecutiveComboWins += 1;
            if (this.consecutiveComboWins > this.comboWins) {
                // console.log(" this.consecutiveWins ->"+ this.consecutiveWins);
                this.comboWins = this.consecutiveComboWins;
            }
            if ((this.consecutiveWins != LevelManager.offsetForLevelUp) &&
                (this.totalGamePlayed != this.totalNumberOfLevel)) {
                this.BannerCreateAndHide("EXCELLENT", true);
                SoundManager.CorrectAnswerSoundPlay(); //Playing when answer is correct
            }
            this.LevelWin(this.totalCorrectAnswer);
        } else if (_this.key == "destractor") {
            this.consecutiveComboWins = 0;
            this.totalInCorrectAnswer += 1;
            this.consecutiveWins = 0;
            this.consecutiveLoose += 1;
            SoundManager.InCorrectAnswerSoundPlay(); //Playing when answer is incorrect
            this.LevelLoose(this.totalInCorrectAnswer);
        }
        this.ChangeLevel(true);
    };
    //=========>Level Complete<=================//
    ChangeLevel(_bool) {
        let levelOrTimeComplete = true;
        if (this.isTimerAvailable) {
            if (this.timer.paused) {
                levelOrTimeComplete = false;
                this.ClearLevel();
                SoundManager.EndSoundPlay();
                this.BannerCreateAndHide("TIMES_UP", false);
                this.CalculateResponse();
            }
        } else {
            if ((this.totalGamePlayed == this.totalNumberOfLevel)) {
                if (!_bool) {

                }
                levelOrTimeComplete = false;
                this.ClearLevel();
                SoundManager.EndSoundPlay();
                this.BannerCreateAndHide("GAME_OVER", false);
                this.CalculateResponse();
                this.timer.paused = true;
            } else {
                if (!_bool) {
                    // console.log("total game played");
                    this.totalGamePlayed += 1;
                    this.consecutiveComboWins = 0;
                    this.totalInCorrectAnswer += 1;
                    this.consecutiveWins = 0;
                    this.consecutiveLoose += 1;;
                    this.LevelLoose(this.totalInCorrectAnswer);
                }
                this.timeBar.scaleX = scaleFactorX * 340;
                this.timeBar.setTint(0x00ff00);
                this.timer.paused = false;
            }
        }
        if (levelOrTimeComplete) {
            this.ClearLevel();
            if (this.consecutiveWins == LevelManager.offsetForLevelUp) {
                // console.log("level up----------------------------");
                this.consecutiveWins = 0;
                this.BannerCreateAndHide("LEVEL_UP", true);
                SoundManager.LevelUpSoundPlay();
                if (this.TimeBetweenInterval > 500) {
                    this.TimeBetweenInterval -= 200;
                }
                LevelManager.IncreaseLevel(LevelManager);
            } else if (this.consecutiveLoose == LevelManager.offsetForLevelDown) {
                // console.log("level Down----------------------------"+this.currentLevel);
                if (this.TimeBetweenInterval < 1500) {
                    this.TimeBetweenInterval += 200;
                }
                if (this.currentLevel > 1) {
                    LevelManager.DecreaseLevel(LevelManager);
                }
                this.consecutiveLoose = 0;
            }
            this.currentLevel = LevelManager.GetCurrentLevelNumber();
            this.CreateLevel();
        }
    };
    async ClearLevel() {
        const waitForSecond = (ms) => new Promise(resolve => setTimeout(resolve, ms))
        this.eachLevelTimer.paused = true;
        // this.totalEachLevelTime.push(this.eachLevelTime);
        this.answers = [];
        this.destractor = [];
        this.objectAngle = 15;
        this.numberOfAnswers = 0;
        this.eachLevelTime = 0;
        this.numberOfDestractor = [];
        this.movementContinuousIntervalBool = false;
        this.movementIntervalInterval = false;

        this.RemoveDestractors();

        if (parseInt(LevelManager.autoCorrect) > 0) {
            await waitForSecond(1000);
            this.RemoveAnswers();
            this.RemoveOrignal();
        } else {
            this.RemoveAnswers();
            this.RemoveOrignal();
        }
        if (this.intervalTimer) {
            this.intervalTimer.remove();
        }
    };
    /*
        Removing Destractor images from screen
    */
    RemoveDestractors() {
        let arrLength = this.scene.scene.children.list.length;
        for (let i = 0; i < arrLength; i++) {
            if (this.scene.scene.children.list[i].key == "destractor") {
                this.scene.scene.children.list[i].destroy();
                arrLength = this.scene.scene.children.list.length;
                i = 0;
            }
        }
    };
    /*
        Removing Answer images from screen
    */
    RemoveAnswers() {
        let arrLength = this.scene.scene.children.list.length;
        for (let i = 0; i < arrLength; i++) {
            if (this.scene.scene.children.list[i].key == "answers") {
                this.scene.scene.children.list[i].destroy();
                arrLength = this.scene.scene.children.list.length;
                i = 0;
            }
        }
    };
    /*
        Removing Orignal images from screen
    */
    RemoveOrignal() {
        let arrLength = this.scene.scene.children.list.length;
        for (let i = 0; i < arrLength; i++) {
            if (this.scene.scene.children.list[i].key == "original") {
                this.scene.scene.children.list[i].destroy();
                arrLength = this.scene.scene.children.list.length;
                i = 0;
            }
        }
    }
    LevelWin(_number) {
        this.thumbsUpText.setText(_number);
    };
    LevelLoose(_number) {
        this.thumbsDownText.setText(_number);
    };
    UpdateTimer() {
        let offSet;
        if (this.isTimerAvailable) {
            offSet = (340 / this.totalTimeForGame);        // i change the value to 340 as its scaleX value from 240 to get the actual result
            console.log('enter when totalTimeForGame is available')
        }
        else {
            offSet = (340 / this.timeForEachLevel);        // i change the value to 340 as its scaleX value from 240 to get the actual result
            console.log('enter when each level time is available', offSet)
        }
        if (this.timeBar.scaleX <= 56) {
            this.timeBar.setTint(0xff0000);
        }
        if (this.timeBar.scaleX <= 0) {
            this.timer.paused = true;
            SoundManager.InCorrectAnswerSoundPlay(); //playing unanswered as incorrect
            this.ChangeLevel(false);
        }
        else {
            if (this.timeBar.scaleX <= offSet) {
                this.timeBar.scaleX = 0;
            }
            else {
                this.timeBar.scaleX -= offSet;
            }
        }
    };
    //===========> Rotation<=====================//
    RotateImages(rotation) {
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
        // for (let iterator of this.answers) {
        this.tweens.add({
            targets: this.question,
            angle: { from: this.question.angle, to: (_angle + this.question.angle) },
            ease: 'Linear',
            duration: this.rotationTime,
            callbackScope: this,
            loop: -1
        });
        // }
    };
    //============> Movement <===================//
    SetMovementType(directionType, movementType) {
        switch (parseInt(movementType)) {
            case 0:
                this.movementType = "continuous";
                this.SetDirectionType(directionType, this.question);
                break;
            case 1:
                this.movementType = "intervals";
                this.SetDirectionType(directionType, this.question);
                break;
            case 2:
                this.movementType = "continuous-continuous";
                this.SetDirectionType(directionType, this.question);
                break;
            case 3:
                this.movementType = "continuous-interval";
                this.SetDirectionType(directionType, this.question);
                break;
            case 4:
                this.movementType = "intervals-continuous";
                this.SetDirectionType(directionType, this.question);
                break;
            case 5:
                this.movementType = "intervals-intervals";
                this.SetDirectionType(directionType, this.question);
                break;
        }
        let baseStyles = [
            "color: orange",
            "background-color: #fff",
            "padding: 2px 4px",
            "border-radius: 2px",
            "font-size: 20px"
        ].join(";");
        console.log(`%c this.movementTime -> ${LevelManager.movementTime}`, baseStyles);
    };
    StartMovement(_obj, continousStartX, continousStartY,
        continousEndX, continousEndY, _direction) {

        switch (this.movementType) {
            case "continuous":
                this.MovementContineous(_obj, continousStartX, continousStartY,
                    continousEndX, continousEndY);
                break;
            case "intervals":
                this.MovementInterval(_obj, _direction);
                break;
            case "continuous-continuous":
                this.MovementContineousContineous(_obj, continousStartX, continousStartY,
                    continousEndX, continousEndY);
                break;
            case "continuous-interval":
                this.MovementContineousInterval(_obj, continousStartX, continousStartY,
                    continousEndX, continousEndY, _direction);
                break;
            case "intervals-continuous":
                this.MovementIntervalContineous(_direction, _obj, continousStartX, continousStartY, continousEndX, continousEndY);
                break;
            case "intervals-intervals":
                this.MovementIntervalInterval(_obj, _direction);
                break;
        }
    };
    SetDirectionType(_direction, _obj, _bool = true) {
        let continousStartY, continousEndX, continousEndY, continousStartX = 10;
        if (_bool) {
            switch (_direction) {
                case "RTL":
                    this.movementTime = ((10000 / (game.config.width + _obj.x)) * (_obj.x));
                    _obj.continousStartX = (game.config.width);
                    _obj.continousStartY = (game.config.height / 1.8);
                    _obj.continousEndX = 0;
                    _obj.continousEndY = (game.config.height / 1.8);
                    this.movementIntervalX = ((game.config.width) / 10);
                    this.movementIntervalY = 0;
                    break;
                case "LTR":
                    this.movementTime = ((10000 / (game.config.width + 200)) * ((game.config.width + 200) - _obj.x));
                    // console.log('movementTime -------------------> ' + this.movementTime)
                    _obj.continousStartX = 0;
                    _obj.continousStartY = (game.config.height / 1.8);
                    _obj.continousEndX = (game.config.width);
                    _obj.continousEndY = (game.config.height / 1.8);
                    this.movementIntervalX = ((game.config.width) / 10);
                    this.movementIntervalY = 0;
                    break;
                case "TTB":
                    this.movementTime = ((10000 / (game.config.height + 200)) * ((game.config.height + 200) - _obj.y));
                    // console.log('movementTime -------------------> ' + this.movementTime)
                    _obj.continousStartX = (game.config.width / 2);
                    _obj.continousStartY = (game.config.height / 7);
                    _obj.continousEndX = (game.config.width / 2);
                    _obj.continousEndY = (game.config.height);
                    this.movementIntervalX = 0;
                    this.movementIntervalY = ((game.config.height) / 10);
                    break;
                case "BTT":
                    this.movementTime = ((10000 / (game.config.height + 200)) * (_obj.y));
                    _obj.continousStartX = (game.config.width / 2);
                    _obj.continousStartY = (game.config.height);
                    _obj.continousEndX = (game.config.width / 2);
                    _obj.continousEndY = (game.config.height / 7);
                    this.movementIntervalX = 0;
                    this.movementIntervalY = -((game.config.height) / 10);
                    break;
                case "TRDBL":
                    this.movementIntervalX = (game.config.width) / 2 - (game.config.width) / 2.65;
                    this.movementIntervalY = ((game.config.height) / 2) - ((game.config.height) / 2.5);

                    _obj.continousStartX = (game.config.width);
                    _obj.continousStartY = (game.config.height / 7);
                    _obj.continousEndX = 0;
                    _obj.continousEndY = (game.config.height);
                    break;
                case "TLDBR":
                    this.movementIntervalX = (game.config.width) / 2 - (game.config.width) / 2.65;
                    this.movementIntervalY = ((game.config.height) / 2) - ((game.config.height) / 2.5);

                    _obj.continousStartX = 0;
                    _obj.continousStartY = (game.config.height / 7);
                    _obj.continousEndX = (game.config.width);
                    _obj.continousEndY = (game.config.height);
                    break;
                case "BRDTL":
                    this.movementIntervalX = (game.config.width) / 2 - (game.config.width) / 2.65;
                    this.movementIntervalY = ((game.config.height) / 2) - ((game.config.height) / 2.5);
                    this.movementTime = ((10000 / (game.config.height + 200)) * (_obj.y));
                    _obj.continousStartX = (game.config.width);
                    _obj.continousStartY = (game.config.height);
                    _obj.continousEndX = 0;
                    _obj.continousEndY = (game.config.height / 7);
                    break;
                case "BLDTR":
                    this.movementIntervalX = (game.config.width) / 2 - (game.config.width) / 2.6;
                    this.movementIntervalY = ((game.config.height) / 2) - ((game.config.height) / 2.5);
                    this.movementIntervalY = ((game.config.height) / 10);

                    _obj.continousStartX = 0;
                    _obj.continousStartY = (game.config.height);
                    _obj.continousEndX = (game.config.width);
                    _obj.continousEndY = (game.config.height / 7);
                    break;
            }
        }
        this.StartMovement(_obj, continousStartX, continousStartY, continousEndX, continousEndY, _direction);
    };
    // TIME FOR CONTINUOUS
    TimeForContineous(_obj, _startX, _startY, _endX, _endY) {
        let distance = null,
            distance2 = null;
        if (LevelManager.movementDirection == "RTL" || LevelManager.movementDirection == "LTR") {
            this.movementTime = parseInt(((LevelManager.movementTime * 1000) / Math.abs(_obj.continousEndX - _obj.continousStartX)) * Math.abs(_startX - _endX));
        } else if (LevelManager.movementDirection == "BTT" || LevelManager.movementDirection == "TTB") {
            this.movementTime = parseInt(((LevelManager.movementTime * 1000) / Math.abs(_obj.continousEndY - _obj.continousStartY)) * Math.abs(_startY - _endY));
            // console.log("this.movementTime " + this.movementTime);
        } else if (LevelManager.movementDirection == "BRDTL") {
            distance = (Math.sqrt(Math.pow((game.config.width - 0), 2) +
                Math.pow((game.config.height - 0), 2)));
            distance2 = (Math.sqrt(Math.pow((_startX - _endX), 2) + Math.pow((_startY - _endY), 2)));
            this.movementTime = (((LevelManager.movementTime * 1000) / Math.abs(distance)) * Math.abs(distance2));
        } else {
            distance = parseInt(Math.sqrt(Math.pow((_obj.continousEndX - _obj.continousStartX), 2) + Math.pow((_obj.continousEndY - _obj.continousStartY), 2)));
            distance2 = parseInt(Math.sqrt(Math.pow((_startX - _endX), 2) + Math.pow((_startY - _endY), 2)));
            this.movementTime = parseInt(((LevelManager.movementTime * 1000) / Math.abs(distance)) * Math.abs(distance2));
        }
        return this.movementTime;
    };
    // TIME FOR INTERVAL
    TimeForInterval(_obj) {
        let distance = parseInt(Math.sqrt(Math.pow((_obj.continousEndX - _obj.continousStartX), 2) + Math.pow((_obj.continousEndY - _obj.continousStartY), 2)));

        if (LevelManager.movementDirection == "RTL" || LevelManager.movementDirection == "LTR") {
            this.movementTime = (distance / this.movementIntervalX);
        } else if (LevelManager.movementDirection == "BTT" || LevelManager.movementDirection == "TTB") {
            this.movementTime = (distance / this.movementIntervalY);
        } else {
            console.log('distance', distance)
            this.movementTime = (distance / this.movementIntervalY);
        }
        this.movementTime = parseInt((LevelManager.movementTime * 1000) / this.movementTime);

        return this.movementTime;
    };
    MovementContineous(_obj, _startX, _startY, _endX, _endY) {
        this.movementTime = this.TimeForContineous(_obj, _obj.x, _obj.y, _obj.continousEndX, _obj.continousEndY);

        this.tweens.add({
            targets: _obj,
            x: _obj.continousEndX,
            y: _obj.continousEndY,
            ease: 'Linear',
            duration: this.movementTime,
            callbackScope: this,
            delay: 500,
            onComplete: function () {
                if (this.isMovementContinuous) {
                    setTimeout(() => {
                        _obj.setPosition(_obj.continousStartX, _obj.continousStartY);
                        this.tweens.add({
                            targets: _obj,
                            x: _obj.continousEndX,
                            y: _obj.continousEndY,
                            ease: 'Linear',
                            duration: (LevelManager.movementTime * 1000),
                            loop: -1,
                            loopDelay: 500
                        });
                    }, 500);
                }
            }
        });
    };
    MovementContineousContineous(_obj, _startX, _startY, _endX, _endY) {
        this.movementTime = this.TimeForContineous(_obj, _obj.x, _obj.y, _obj.continousEndX, _obj.continousEndY);
        // console.log("MovementContineousContineous-----------------------");
        this.tweens.add({
            targets: _obj,
            x: _obj.continousEndX,
            y: _obj.continousEndY,
            ease: 'Linear',
            duration: this.movementTime,
            callbackScope: this,
            onComplete: function () {
                if (this.isMovementContinuous) {

                    _obj.setPosition(_obj.continousStartX, _obj.continousStartY);
                    this.movementTime = this.TimeForContineous(_obj, _obj.x, _obj.y, _obj.continousEndX, _obj.continousEndY);
                    this.tweens.add({
                        targets: _obj,
                        x: _obj.continousEndX,
                        y: _obj.continousEndY,
                        ease: 'Linear',
                        duration: this.movementTime, //     (LevelManager.movementTime*1000),
                        // yoyo: true,
                        repeat: -1
                    });
                }
            }
        });
    };
    MovementContineousInterval(_obj, _startX, _startY, _endX, _endY, _dir) {
        _obj.bool = false;
        let _delay;
        if (!this.movementContinuousIntervalBool) {
            this.movementTime = this.TimeForInterval(_obj);
            this.intervalTimer = this.time.addEvent({
                delay: this.TimeBetweenInterval, //this.movementTime,
                callback: () => {
                    // ////console.log("------------");
                    if (this.movementContinuousIntervalArr.length > 0) {
                        this.movementContinuousIntervalArr.forEach(element => {
                            switch (_dir) {
                                case "RTL":
                                    if (element.x > 0) {
                                        element.x -= this.movementIntervalX;
                                    } else {
                                        element.setPosition((game.config.width), element.y);
                                    }
                                    break;
                                case "LTR":
                                    if (element.x < (game.config.width)) {
                                        element.x += this.movementIntervalX;
                                    } else {
                                        element.setPosition(0, element.y);
                                    }
                                    break;
                                case "TTB":
                                    if (element.y < element.continousEndY) {
                                        element.y += this.movementIntervalY;
                                    } else {
                                        element.setPosition(element.x, (element.continousStartY));
                                    }
                                    break;
                                case "BTT":
                                    if (element.y > element.continousEndY) {
                                        element.y += this.movementIntervalY;
                                    } else {
                                        element.setPosition(element.x, (element.continousStartY));
                                    }
                                    break;

                                case "BRDTL":
                                    if ((element.x - this.movementIntervalX) > element.continousEndX) {
                                        if ((element.y - this.movementIntervalY) > element.continousEndY) {
                                            element.x -= this.movementIntervalX;
                                            element.y -= this.movementIntervalY;
                                        } else {
                                            element.setPosition(element.continousStartX, element.continousStartY);
                                        }
                                    } else {
                                        element.setPosition(element.continousStartX, element.continousStartY);
                                    }
                                    break;
                                case "BLDTR":
                                    if ((element.x + this.movementIntervalX) < element.continousEndX) {
                                        if ((element.y - this.movementIntervalY) > element.continousEndY) {
                                            element.x += this.movementIntervalX;
                                            element.y -= this.movementIntervalY;
                                        } else {
                                            element.setPosition(element.continousStartX, element.continousStartY);
                                        }
                                    } else {
                                        element.setPosition(element.continousStartX, element.continousStartY);
                                    }
                                    break;
                                case "TLDBR":
                                    if ((element.x + this.movementIntervalX) < element.continousEndX) {
                                        if ((element.y + this.movementIntervalY) < element.continousEndY) {
                                            element.x += this.movementIntervalX;
                                            element.y += this.movementIntervalY;
                                        } else {
                                            element.setPosition(element.continousStartX, element.continousStartY);
                                        }
                                    } else {
                                        element.setPosition(element.continousStartX, element.continousStartY);
                                    }
                                    break;
                                case "TRDBL":
                                    if ((element.x - this.movementIntervalX) > element.continousEndX) {
                                        if ((element.y + this.movementIntervalY) < element.continousEndY) {
                                            element.x -= this.movementIntervalX;
                                            element.y += this.movementIntervalY;
                                        } else {
                                            element.setPosition(element.continousStartX, element.continousStartY);
                                        }
                                    } else {
                                        element.setPosition(element.continousStartX, element.continousStartY);
                                    }
                                    break;
                            }
                        });
                    }
                },
                callbackScope: this,
                loop: true
            });
        }
        this.movementTime = this.TimeForContineous(_obj, _obj.x, _obj.y, _obj.continousEndX, _obj.continousEndY);
        this.tweens.add({
            targets: _obj,
            x: _obj.continousEndX,
            y: _obj.continousEndY,
            ease: 'Linear',
            duration: this.movementTime,
            callbackScope: this,
            onComplete: function () {
                this.movementContinuousIntervalArr.push(_obj);
            }
        });
        this.movementContinuousIntervalBool = true;
    };
    MovementIntervalContineous(_dir, _obj) {
        let counter = _obj.length;
        this.movementTime = this.TimeForInterval(_obj);
        let intervalTimer = this.time.addEvent({
            delay: this.TimeBetweenInterval, //500,
            callback: () => {
                switch (_dir) {
                    case "RTL":
                        if (_obj.x > 0) {
                            _obj.x -= this.movementIntervalX;
                        } else {
                            _obj.setPosition((game.config.width), _obj.y);
                            this.MovementIntervalContineousTween(_obj, 0, _obj.y);
                        }
                        break;
                    case "LTR":
                        if (_obj.x < (game.config.width)) {
                            _obj.x += this.movementIntervalX;
                        } else {
                            _obj.setPosition(0, _obj.y);
                            this.MovementIntervalContineousTween(_obj, (game.config.width), _obj.y);
                        }
                        break;
                    case "TTB":
                        if ((_obj.y + this.movementIntervalY) < _obj.continousEndY) {
                            _obj.y += this.movementIntervalY;
                        } else {
                            _obj.setPosition(_obj.x, (_obj.continousStartY));
                            this.MovementIntervalContineousTween(_obj, _obj.x, (_obj.continousEndY));
                        }
                        break;
                    case "BTT":
                        if ((_obj.y + this.movementIntervalY) > _obj.continousEndY) {
                            _obj.y += this.movementIntervalY;
                        } else {
                            _obj.setPosition(_obj.x, (_obj.continousStartY));
                            this.MovementIntervalContineousTween(_obj, _obj.x, (_obj.continousEndY));
                        }
                        break;

                    case "BRDTL":
                        if ((_obj.x - this.movementIntervalX) > _obj.continousEndX) {
                            if ((_obj.y - this.movementIntervalY) > _obj.continousEndY) {
                                _obj.x -= this.movementIntervalX;
                                _obj.y -= this.movementIntervalY;
                            } else {
                                intervalTimer.paused = true;
                                _obj.setPosition(_obj.continousStartX, _obj.continousStartY);
                                this.MovementIntervalContineousTween(_obj, _obj.continousEndX, _obj.continousEndY);
                            }
                        } else {
                            intervalTimer.paused = true;
                            _obj.setPosition(_obj.continousStartX, _obj.continousStartY);
                            this.MovementIntervalContineousTween(_obj, _obj.continousEndX, _obj.continousEndY);
                        }
                        break;
                    case "BLDTR":
                        if ((_obj.x + this.movementIntervalX) < _obj.continousEndX) {
                            if ((_obj.y - this.movementIntervalY) > _obj.continousEndY) {
                                _obj.x += this.movementIntervalX;
                                _obj.y -= this.movementIntervalY;
                            } else {
                                intervalTimer.paused = true;
                                _obj.setPosition(_obj.continousStartX, _obj.continousStartY);
                                this.MovementIntervalContineousTween(_obj, _obj.continousEndX, _obj.continousEndY);
                            }
                        } else {
                            intervalTimer.paused = true;
                            _obj.setPosition(_obj.continousStartX, _obj.continousStartY);
                            this.MovementIntervalContineousTween(_obj, _obj.continousEndX, _obj.continousEndY);
                        }
                        break;
                    case "TLDBR":
                        if ((_obj.x + this.movementIntervalX) < _obj.continousEndX) {
                            if ((_obj.y + this.movementIntervalY) < _obj.continousEndY) {
                                _obj.x += this.movementIntervalX;
                                _obj.y += this.movementIntervalY;
                            } else {
                                intervalTimer.paused = true;
                                _obj.setPosition(_obj.continousStartX, _obj.continousStartY);
                                this.MovementIntervalContineousTween(_obj, _obj.continousEndX, _obj.continousEndY);
                            }
                        } else {
                            intervalTimer.paused = true;
                            _obj.setPosition(_obj.continousStartX, _obj.continousStartY);
                            this.MovementIntervalContineousTween(_obj, _obj.continousEndX, _obj.continousEndY);
                            counter -= 1;
                        }
                        break;
                    case "TRDBL":
                        if ((_obj.x - this.movementIntervalX) > _obj.continousEndX) {
                            if ((_obj.y + this.movementIntervalY) < _obj.continousEndY) {
                                _obj.x -= this.movementIntervalX;
                                _obj.y += this.movementIntervalY;
                            } else {
                                intervalTimer.paused = true;
                                _obj.setPosition(_obj.continousStartX, _obj.continousStartY);
                                this.MovementIntervalContineousTween(_obj, _obj.continousEndX, _obj.continousEndY);
                                counter -= 1;
                            }
                        } else {
                            intervalTimer.paused = true;
                            _obj.setPosition(_obj.continousStartX, _obj.continousStartY);
                            this.MovementIntervalContineousTween(_obj, _obj.continousEndX, _obj.continousEndY);
                            counter -= 1;
                        }
                        break;
                }
                if (counter == 0) {
                    intervalTimer.remove();
                }
            },
            callbackScope: this,
            loop: true
        });
    };
    MovementIntervalContineousTween(_obj, _x, _y) {
        this.tweens.add({
            targets: _obj,
            x: _x,
            y: _y,
            ease: 'Linear',
            duration: (LevelManager.movementTime * 1000),
            callbackScope: this,
            repeat: -1
        });
    }
    MovementIntervalInterval(_obj, _dir) {
        _obj.bool = false;
        this.movementIntervalIntervalArr.push(_obj);
        if (!this.movementIntervalInterval) {
            this.movementTime = this.TimeForInterval(_obj);
            this.intervalTimer = this.time.addEvent({
                delay: this.TimeBetweenInterval, // this.movementTime,
                callback: () => {
                    this.movementIntervalIntervalArr.forEach(element => {
                        switch (_dir) {
                            case "RTL":
                                if (element.x > 0) {
                                    element.x -= this.movementIntervalX;
                                } else {
                                    element.setPosition((game.config.width), element.y);
                                }
                                break;
                            case "LTR":
                                if (element.x < (game.config.width)) {
                                    element.x += this.movementIntervalX;
                                } else {
                                    element.setPosition(0, element.y);
                                }
                                break;
                            case "TTB":
                                if ((element.y + this.movementIntervalY) < element.continousEndY) {
                                    element.y += this.movementIntervalY;
                                } else {
                                    element.setPosition(element.x, (element.continousStartY));
                                }
                                break;
                            case "BTT":
                                if ((element.y + this.movementIntervalY) > element.continousEndY) {
                                    element.y += this.movementIntervalY;
                                } else {
                                    element.setPosition(element.x, (element.continousStartY));
                                }
                                break;

                            case "BRDTL":
                                if ((element.x - this.movementIntervalX) > element.continousEndX) {
                                    if ((element.y - this.movementIntervalY) > element.continousEndY) {
                                        element.x -= this.movementIntervalX;
                                        element.y -= this.movementIntervalY;
                                    } else {
                                        element.setPosition(element.continousStartX, element.continousStartY);
                                    }
                                } else {
                                    element.setPosition(element.continousStartX, element.continousStartY);
                                }
                                break;
                            case "BLDTR":
                                if ((element.x + this.movementIntervalX) < element.continousEndX) {
                                    if ((element.y - this.movementIntervalY) > element.continousEndY) {
                                        element.x += this.movementIntervalX;
                                        element.y -= this.movementIntervalY;
                                    } else {
                                        element.setPosition(element.continousStartX, element.continousStartY);
                                    }
                                } else {
                                    element.setPosition(element.continousStartX, element.continousStartY);
                                }
                                break;
                            case "TLDBR":
                                if ((element.x + this.movementIntervalX) < element.continousEndX) {
                                    if ((element.y + this.movementIntervalY) < element.continousEndY) {
                                        element.x += this.movementIntervalX;
                                        element.y += this.movementIntervalY;
                                    } else {
                                        element.setPosition(element.continousStartX, element.continousStartY);
                                    }
                                } else {
                                    element.setPosition(element.continousStartX, element.continousStartY);
                                }
                                break;
                            case "TRDBL":
                                if ((element.x - this.movementIntervalX) > element.continousEndX) {
                                    if ((element.y + this.movementIntervalY) < element.continousEndY) {
                                        element.x -= this.movementIntervalX;
                                        element.y += this.movementIntervalY;
                                    } else {
                                        element.setPosition(element.continousStartX, element.continousStartY);
                                    }
                                } else {
                                    element.setPosition(element.continousStartX, element.continousStartY);
                                }
                                break;
                        }
                    });
                },
                callbackScope: this,
                loop: true
            });
        }
        this.movementIntervalInterval = true;
    };
    async MovementInterval(_obj, _dir) {
        let rtldBuffer;
        let m;
        const waitForSecond = (ms) => new Promise(resolve => setTimeout(resolve, ms))
        this.movementIntervalIntervalArr.push(_obj);
        if (!this.movementIntervalInterval) {
            this.movementTime = this.TimeForInterval(_obj);
            console.log("this.movementTime " + this.movementTime);
            await waitForSecond(500);
            this.intervalTimer = this.time.addEvent({
                delay: this.TimeBetweenInterval,
                callback: () => {
                    this.movementIntervalIntervalArr.forEach(async element => {
                        switch (_dir) {
                            case "RTL":
                                if (element.x > 0) {
                                    element.x -= this.movementIntervalX;
                                } else {
                                    this.intervalTimer.paused = true;
                                    await waitForSecond(500);
                                    element.setPosition((game.config.width), element.y);
                                    this.intervalTimer.paused = false;
                                }
                                break;
                            case "LTR":
                                if (element.x < (game.config.width)) {
                                    element.x += this.movementIntervalX;
                                } else {
                                    this.intervalTimer.paused = true;
                                    await waitForSecond(500);
                                    element.setPosition(0, element.y);
                                    this.intervalTimer.paused = false;
                                }
                                break;
                            case "TTB":
                                if ((element.y + this.movementIntervalY) < game.config.height) {
                                    //element.continousEndY) {
                                    element.y += this.movementIntervalY;
                                } else {
                                    this.intervalTimer.paused = true;
                                    await waitForSecond(500);
                                    element.setPosition(element.x, (element.continousStartY));
                                    this.intervalTimer.paused = false;
                                }
                                break;
                            case "BTT":
                                if ((element.y + this.movementIntervalY) > element.continousEndY) {
                                    element.y += this.movementIntervalY;
                                } else {
                                    this.intervalTimer.paused = true;
                                    await waitForSecond(500);
                                    element.setPosition(element.x, (element.continousStartY));
                                    this.intervalTimer.paused = false;
                                }
                                break;

                            case "BRDTL":
                                if ((element.x - this.movementIntervalX) > element.continousEndX) {
                                    if ((element.y - this.movementIntervalY) > element.continousEndY) {
                                        element.x -= this.movementIntervalX;
                                        element.y -= this.movementIntervalY;
                                    } else {
                                        this.intervalTimer.paused = true;
                                        await waitForSecond(500);
                                        element.setPosition(element.continousStartX, element.continousStartY);
                                        this.intervalTimer.paused = false;
                                    }
                                } else {
                                    element.setPosition(element.continousStartX, element.continousStartY);
                                }
                                break;
                            case "BLDTR":
                                if ((element.x + this.movementIntervalX) < element.continousEndX) {
                                    if ((element.y - this.movementIntervalY) > element.continousEndY) {
                                        element.x += this.movementIntervalX;
                                        element.y -= this.movementIntervalY;
                                    } else {
                                        this.intervalTimer.paused = true;
                                        await waitForSecond(500);
                                        element.setPosition(element.continousStartX, element.continousStartY);
                                        this.intervalTimer.paused = false;
                                    }
                                } else {
                                    element.setPosition(element.continousStartX, element.continousStartY);
                                }
                                break;
                            case "TLDBR":
                                if ((element.x + this.movementIntervalX) < element.continousEndX) {
                                    if ((element.y + this.movementIntervalY) < element.continousEndY) {
                                        element.x += this.movementIntervalX;
                                        element.y += this.movementIntervalY;
                                    } else {
                                        this.intervalTimer.paused = true;
                                        await waitForSecond(500);
                                        element.setPosition(element.continousStartX, element.continousStartY);
                                        this.intervalTimer.paused = false;
                                    }
                                } else {
                                    element.setPosition(element.continousStartX, element.continousStartY);
                                }
                                break;
                            case "TRDBL":
                                if ((element.x - this.movementIntervalX) > element.continousEndX) {
                                    if ((element.y + this.movementIntervalY) < element.continousEndY) {
                                        element.x -= this.movementIntervalX;
                                        element.y += this.movementIntervalY;
                                    } else {
                                        this.intervalTimer.paused = true;
                                        await waitForSecond(500);
                                        element.setPosition(element.continousStartX, element.continousStartY);
                                        this.intervalTimer.paused = false;
                                    }
                                } else {
                                    element.setPosition(element.continousStartX, element.continousStartY);
                                }
                                break;
                        }
                    });
                },
                callbackScope: this,
                loop: true
            });
        }
        this.movementIntervalInterval = true;
    };
    //===========>Data to be sent to server<==============//
    CalculateResponse() {
        let _level = LevelManager.GetCurrentLevelNumber();
        let _correctAnwer = this.totalCorrectAnswer;
        let _inCorrectAnswer = this.totalInCorrectAnswer;

        let _accuracy = (this.totalNumberUserClicked === 0) ?
            0 : parseInt((this.totalGamePlayed / this.totalNumberUserClicked) * 100);

        let _totalTime = 0;
        let _avarageTime = 0;
        for (let i = 0; i < this.totalEachLevelTime.length; i++) {
            _totalTime += this.totalEachLevelTime[i];

        }
        if (_totalTime > 0) {
            _avarageTime = (_totalTime / this.totalGamePlayed); // / _totalTime);
        }
        let _timePerQuestion = [...this.totalEachLevelTime];
        let _deviceDateTime = Math.round(new Date().getTime() / 1000).toString();
        let _score = (_level * this.totalCorrectAnswer * 99);



        //==============Post game screen==================

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
            } else {
                post_game.ratingBox = false;
            }
        } else {
            post_game.ratingBox = false;
        }

        //first star calculation

        let firstStar = (_correctAnwer / this.totalQuestionPresented);
        if (firstStar >= Database.success_rate) {
            post_game.firstStar = true;
        }
        else {
            post_game.firstStar = false;
        }

        //==========second star calculation=============
        console.log('average answer time : ' + _avarageTime);
        if (parseFloat(_avarageTime).toFixed(2) <= parseFloat(Database.average_answer_time)) {
            post_game.secondStar = true;
        }
        else {
            post_game.secondStar = false;
        }

        //third star calculation
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
        console.log('last high score : ' + Database.lastHighestScore);
        if (Database.lastHighestScore == 0 || Database.lastHighestScore == "") {
            post_game.highScore = true;
        }
        else if (_score > Database.lastHighestScore) {
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
            "game_id": gameId, // current game id 
            "questions_presented": this.totalQuestionPresented, // total number of question presented
            "level": _level, // <the level the player reached in this session at the end of the game>
            "correct_answers": _correctAnwer, // number of correct answers
            "incorrect_answers": _inCorrectAnswer, // number of incorrect answers
            "accuracy": _accuracy, // number of clicks (if >1),0/1-If the user missed the target up to 50% of the target size from the target
            "total_time": _totalTime, // 
            "average_answer_time": parseFloat(parseFloat(_avarageTime).toFixed(2)), // number of questions / total time played
            "time_per_question": _timePerQuestion, // {}
            "datetime": _deviceDateTime.toString(), //device time
            "combo": _combo, // the highest correct answers combo
            "score": _score // (user’s level)*(correct answers)*(99)
        }
        console.log("data to send ", data);
        let res = await Server.sendGameData(data, Server);

        let baseUrl = "../post_game_screen/game_end.html";
        // let baseUrl = "https://dev-game-emazebrain.s3.amazonaws.com/post_game_screen/game_end.html";
        // window.open(baseUrl+"?urlData="+JSON.stringify(urlData) , "_self");
        let urlParams = new URLSearchParams(window.location.search);
        let isStandAlone = urlParams.get("standAlone");
        if (isStandAlone == null && isStandAlone == undefined) {
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
            //     "&game_name=" + "TheShadower", "_self");
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
                    "&game_name=" + "TheShadower" +
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
                    "&game_name=" + "TheShadower", "_self");
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