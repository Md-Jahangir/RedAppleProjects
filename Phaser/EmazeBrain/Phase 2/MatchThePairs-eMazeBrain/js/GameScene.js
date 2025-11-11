import { GameArchitechture } from "./GameArchitechture.js";
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
        this.timerBg;
        this.timer;
        this.timerBlockMask;
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
        // this.destractor = [];
        this.totalCorrectAnswer = 0;
        this.totalInCorrectAnswer = 0;
        this.objectAngle = 15;
        this.clickCounter = 0;
        this.faceupItem = null;
        this.maximumNumberOfAttempts = 0;
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
        //=====================================//
        this.FirstMovement //after creating object movement time
        this.TimeBetweenInterval = 1500;
        this.gridBlocks = []; //total grid blocks
    }
    create() {
        if (Server.platform == "favorites") {
            window.parent.postMessage({ eventName: "gameStarted", payload: null }, "*");
        }
        this.errorPopup = new ErrorPopup(this);
        //====> Selecting Background <======//
        this.levelBackground = LevelManager.TotalBackgroundImage// LevelManager.DecideLevelBackground();

        this.bg = this.add.image(game.config.width / 2, game.config.height / 2, this.levelBackground).setOrigin(0.5, 0.5).setScale(scaleFactorX * 1, scaleFactorY * 1);

        this.bg.setInteractive();
        this.bg.on("pointerdown", (pointer, x, y, event) => this.OnBackgroundClick());

        let headerBar = this.add.image(game.config.width / 2, game.config.height / 20, 'one_pixel_white').setOrigin(0.5).setScale(scaleFactorX * 3000, scaleFactorY * 310);
        headerBar.setTint("0X04627b");
        headerBar.depth = 2;

        const style3 = { font: "bold 35px CCBellyLaugh", stroke: '#fff', strokeThickness: 6, fill: "#0c4826" };
        let headingText = this.add.text(game.config.width / 2, game.config.height / 12, "Match The Pairs", style3).setOrigin(0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        headingText.depth = 2;



        const style = { font: " 30px Arial", fill: "#000" };
        this.thumbsUp = this.add.image(game.config.width / 20, game.config.height / 10, "thumbs_up").setOrigin(0.5).setScale(scaleFactorX * 0.7, scaleFactorY * 0.7);
        this.thumbsUp.depth = 2;
        let thumbsUpTextBg = this.add.image(this.thumbsUp.x + (game.config.width / 12.8), this.thumbsUp.y, "thumb_bg").setOrigin(0.5).setScale(scaleFactorX * 1, scaleFactorY * 1);
        this.thumbsUpText = this.add.text(this.thumbsUp.x + (game.config.width / 12.8), this.thumbsUp.y, this.totalCorrectAnswer, style).setOrigin(0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        thumbsUpTextBg.depth = 2;
        this.thumbsUpText.depth = 2;
        this.thumbsDown = this.add.image(game.config.width / 1.05, game.config.height / 10, "thumbs_down").setOrigin(0.5).setScale(scaleFactorX * 0.7, scaleFactorY * 0.7);
        this.thumbsDown.depth = 2;
        this.thumbsDownText = this.add.text(this.thumbsDown.x - (game.config.width / 12.8), this.thumbsDown.y, this.totalInCorrectAnswer, style).setOrigin(0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        this.thumbsDownText.depth = 3
        let thumbsDownTextBg = this.add.image(this.thumbsDown.x - (game.config.width / 12.8), this.thumbsDown.y, "thumb_bg").setOrigin(0.5).setScale(scaleFactorX * 1, scaleFactorY * 1);
        thumbsDownTextBg.depth = 2;

        //=====> Static Items <==========//        
        SoundManager.StartSoundPlay(); //Game start sound 
        this.timer = this.time.addEvent({ delay: 1000, callback: this.UpdateTimer, callbackScope: this, loop: true });
        this.timer.paused = true;
        this.eachLevelTimer = this.time.addEvent({ delay: 100, callback: this.UpdateEachLevelTimer, callbackScope: this, loop: true });
        this.eachLevelTimer.paused = true;
        //====> Timer  <============//
        this.timerBg = this.add.sprite(game.config.width / 1.3, game.config.height / 10, 'ticker_bg').setOrigin(0.5, 0.5).setScale(scaleFactorX * 1, scaleFactorY * 1);
        this.timerBg.depth = 3;
        this.timerBlockMask = this.add.sprite(game.config.width / 1.3, game.config.height / 34, 'one_pixel_white').setOrigin(0.5, 0).setScale(scaleFactorX * 90, scaleFactorY * 1);
        this.timerBlockMask.depth = 3;
        //=====For number of chances left ==================//
        this.ticker = this.add.image(game.config.width / 4.2, game.config.height / 9, "ticker").setOrigin(0.5).setScale(scaleFactorX * 0.85, scaleFactorY * 0.85);
        this.ticker.depth = 3;
        const style1 = {
            fontSize: " 40px ",
            fontFamily: 'tickingtimebombbb_ital',
            stroke: '#000',
            fill: "#000"
        };
        this.tickerText = this.add.text(game.config.width / 4.2, game.config.height / 11, this.maximumNumberOfAttempts, style1).setOrigin(0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        this.tickerText.depth = 3;
        //===> Game time <=====//
        this.GameTimer()
        //======> createing initial level <====//
        this.timer.paused = false;
        this.CreateLevel();
        this.BannerCreateAndHide("GAME_START", true);
        // this.GenerateGrid([5, 3, 0]);
        // this.GenerateGrid([4, 8, 0]);
        // this.ImageForCurrentLevel();
    }
    OnBackgroundClick() {
        this.totalNumberUserClicked += 1;
    };
    UpdateEachLevelTimer() {
        this.eachLevelTime += 100;
    };
    CreateLevel() {
        let gridMatrix = LevelManager.currentLevelGrid;

        this.GenerateGrid(gridMatrix);
        this.SetBlockedBlock(this.gridBlocks, gridMatrix[2]);
        //============ Setting Attempts ===========================//
        this.maximumNumberOfAttempts = LevelManager.maximumNUmberOfAttempts;
        this.tickerText.text = this.maximumNumberOfAttempts;
        this.eachLevelTimer.paused = false;
        // //====> Selecting Background <======//
        this.levelBackground = LevelManager.DecideLevelBackground();
        //=====> Images will be used in game <=====//
        this.ImageForCurrentLevel();
        //====> Image Rotation <====//
        this.MovementAndRotationOfImage();
        this.currentLevel = LevelManager.GetCurrentLevelNumber();
        //=========> Display Level <=====//
        setTimeout(() => {
            this.DisplayLevel();
        }, 500);
    };
    GameTimer() {
        let questionTimeData = LevelManager.DecideTimeOrNumberOfQuestion();

        if (questionTimeData[0] === null || questionTimeData[0] === "") {
            this.isTimerAvailable = false;
        } else {
            this.isTimerAvailable = true;
        }
        console.log('questionTimeData', questionTimeData);
        this.totalTimeForGame = questionTimeData[0];
        this.timeForEachLevel = questionTimeData[1];
        this.totalNumberOfLevel = questionTimeData[2];
        console.log(" this.totalNumberOfLevel ===================" + this.totalNumberOfLevel);
        console.log();
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
        if (LevelManager.SelectRandomGameImage() == null) {
            this.ClearLevel();
            this.errorPopup.ShowErrorPopup("Not enough main image available");
        }
        else {
            this.allLevelImage = LevelManager.SelectRandomGameImage();
        }
        this.totalNumberOfImages = (LevelManager.numberOfTypeOfImage);
    };
    DisplayLevel(_this) {
        this.totalQuestionPresented += 1;
        //Question image name-----------------------------
        let imageIndex = 0;
        let _max = LevelManager.DecideObjectOrientationAngle();
        let totalCurrentGrid = LevelManager.ShuffleArr(this.gridBlocks);
        let allLevelImage = this.allLevelImage.concat(this.allLevelImage);
        allLevelImage = LevelManager.ShuffleArr(allLevelImage);
        let faceDown = LevelManager.ShuffleArr(LevelManager.gameImages);

        for (let i = 0; i < totalCurrentGrid.length; i++) {
            if (!totalCurrentGrid[i].blocked) {
                let item = this.add.sprite(totalCurrentGrid[i].x, totalCurrentGrid[i].y, allLevelImage[imageIndex]).setOrigin(0.5).setScale(scaleFactorX * 0.5);
                item.key = "answers";
                item.angle = this.SelectObjectAngle(_max);
                let faceDownImage = this.add.sprite(totalCurrentGrid[i].x, totalCurrentGrid[i].y, faceDown[0]).setOrigin(0.5).setScale(scaleFactorX * 1, scaleFactorY * 1);
                faceDownImage.setInteractive();
                faceDownImage.key = "game";
                faceDownImage.faceup = item;
                faceDownImage.on("pointerup", (pointer, x, y, event) => this.onObjectClicked(faceDownImage));
                imageIndex += 1;
                this.answers.push(faceDownImage);
            }
        }
        if (this.isRotationAvailable) {
            this.RotateImages(this.rotationType);
        }
        this.totalClickNeeded += allLevelImage.length;
    };
    onObjectClicked(_this) {
        this.totalNumberUserClicked += 1;
        this.clickCounter += 1;
        _this.visible = false;

        let totalLeftBlocks = this.answers.filter(function (el) {
            return el.visible == true;
        });
        if (this.clickCounter == 2) {
            this.DisableGrid();
            this.clickCounter = 0;
            this.maximumNumberOfAttempts -= 1;
            this.tickerText.text = this.maximumNumberOfAttempts;
            if (this.faceupItem.faceup.texture.key !== _this.faceup.texture.key) {
                setTimeout(() => {
                    _this.visible = true;
                    this.faceupItem.visible = true;
                    this.EnableGrid();
                }, 500);
            } else {
                this.EnableGrid();
            }
            if (!(this.maximumNumberOfAttempts > 0) || (totalLeftBlocks.length == 0)) {
                //======> wrong answer <===================//
                if (totalLeftBlocks.length > 0) {



                    this.totalGamePlayed += 1;

                    this.consecutiveComboWins = 0;
                    this.totalInCorrectAnswer += 1;
                    this.consecutiveWins = 0;
                    this.consecutiveLoose += 1;
                    SoundManager.InCorrectAnswerSoundPlay(); //Playing when answer is incorrect
                    this.LevelLoose(this.totalInCorrectAnswer);
                }
                //===============> Right Answer<================//
                else {

                    this.totalGamePlayed += 1;
                    this.totalCorrectAnswer += 1;
                    this.consecutiveWins += 1;
                    this.consecutiveLoose = 0;
                    this.consecutiveComboWins += 1;
                    if (this.consecutiveComboWins > this.comboWins) {
                        this.comboWins = this.consecutiveComboWins;
                    }
                    if ((this.consecutiveWins != LevelManager.offsetForLevelUp) &&
                        (this.totalGamePlayed != this.totalNumberOfLevel)) {
                        this.BannerCreateAndHide("EXCELLENT", true);
                        SoundManager.CorrectAnswerSoundPlay(); //Playing when answer is correct
                    }
                    this.LevelWin(this.totalCorrectAnswer);
                }
                this.ChangeLevel(true);
            }
        } else {
            this.faceupItem = _this;
        }

    };
    SelectObjectAngle(_max) {
        return (Math.floor(Math.random() * (_max - 0) + 0));
    };
    //=========>Level Complete<=================//
    ChangeLevel(_bool) {
        // console.log("this.totalGamePlayed===============" + this.totalGamePlayed);
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
            if ((this.totalGamePlayed == this.totalNumberOfLevel)) {
                levelOrTimeComplete = false;
                this.ClearLevel();
                SoundManager.EndSoundPlay();
                this.BannerCreateAndHide("GAME_OVER", false);
                this.CalculateResponse();
                this.timer.paused = true;
                this.timerBg.visible = false;
                this.timerBlockMask.visible = false;
            }
            else {
                if (!_bool) {
                    // this.totalGamePlayed += 1;
                    this.consecutiveComboWins = 0;;
                    this.totalInCorrectAnswer += 1;
                    this.consecutiveWins = 0;
                    this.consecutiveLoose += 1;
                    this.timer.paused = false;
                    this.LevelLoose(this.totalInCorrectAnswer);
                }
            }
        }
        if (levelOrTimeComplete) {
            this.ClearLevel();
            if (this.consecutiveWins == LevelManager.offsetForLevelUp) {
                this.consecutiveWins = 0;
                this.BannerCreateAndHide("LEVEL_UP", true);
                SoundManager.LevelUpSoundPlay();
                if (this.TimeBetweenInterval > 500) {
                    this.TimeBetweenInterval -= 200;
                }
                LevelManager.IncreaseLevel(LevelManager);
            } else if (this.consecutiveLoose == LevelManager.offsetForLevelDown) {
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
    ClearLevel() {
        this.eachLevelTimer.paused = true;
        this.clickCounter = 0;
        if (!this.isTimerAvailable)
            this.timerBlockMask.scaleY = 1;
        this.totalEachLevelTime.push(this.eachLevelTime);
        this.answers = [];
        this.gridBlocks = [];
        this.destractor = [];
        this.objectAngle = 15;
        this.numberOfAnswers = 0;
        this.eachLevelTime = 0;
        this.numberOfDestractor = [];
        this.RemoveBlocks();
        this.RemoveAnswers();
        this.RemoveGameImages();
        if (this.intervalTimer) {
            this.intervalTimer.remove();
        }
    };
    RemoveBlocks() {
        let arrLength = this.scene.scene.children.list.length;
        for (let i = 0; i < arrLength; i++) {
            if (this.scene.scene.children.list[i].key) {
                if (this.scene.scene.children.list[i].key === "block") {
                    this.scene.scene.children.list[i].destroy();
                    arrLength = this.scene.scene.children.list.length;
                    i = 0;
                }
            }
        }
    };
    RemoveAnswers() {
        let arrLength = this.scene.scene.children.list.length;
        for (let i = 0; i < arrLength; i++) {
            if (this.scene.scene.children.list[i].key) {
                if (this.scene.scene.children.list[i].key === "answers") {
                    this.scene.scene.children.list[i].destroy();
                    arrLength = this.scene.scene.children.list.length;
                    i = 0;
                }
            }
        }
    };
    RemoveGameImages() {
        let arrLength = this.scene.scene.children.list.length;
        for (let i = 0; i < arrLength; i++) {
            if (this.scene.scene.children.list[i].key) {
                if (this.scene.scene.children.list[i].key === "game") {
                    this.scene.scene.children.list[i].destroy();
                    arrLength = this.scene.scene.children.list.length;
                    i = 0;
                }
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
            offSet = Math.abs(158 / this.totalTimeForGame);
        } else {
            offSet = Math.ceil(158 / this.timeForEachLevel);
        }


        this.timerBlockMask.scaleY += offSet;
        if (this.timerBlockMask.scaleY >= 158) {
            this.timer.paused = true;
            this.totalGamePlayed += 1;
            SoundManager.InCorrectAnswerSoundPlay(); //playing unanswered as incorrect
            this.ChangeLevel(false);
        }
    };
    //==========> Enable disable grid blocks <==========//
    DisableGrid() {
        if (this.answers.length > 0) {
            this.answers = this.answers.map((_elem) => _elem.disableInteractive());
        }
    };
    EnableGrid() {
        if (this.answers.length > 0) {
            this.answers = this.answers.map((_elem) => _elem.setInteractive());
        }
    }
    //=============> Grid <======================//
    GenerateGrid(_arr) {
        let rows = _arr[1],
            cols = _arr[0],
            BLOCKED = _arr[2];
        let startX = 0,
            startY = 0,
            offsetX = Math.floor(game.config.width / 9.1),
            offsetY = Math.floor(game.config.height / 5.14);
        // offsetY = Math.floor(game.config.height / 5.4);
        //------------------------------------------------------
        if ((cols % 2) === 0 && (rows % 2) === 0) {
            startX = (Math.floor(game.config.width / 2.245) - (Math.floor(game.config.width / 9.1) * ((cols / 2) - 1)));
            startY = (Math.floor(game.config.height / 2.45) - (Math.floor(game.config.height / 8) * ((rows / 2) - 1)));
        } else if ((cols % 2) === 0 && (rows % 2) !== 0) {
            startX = (Math.floor(game.config.width / 2.245) - (Math.floor(game.config.width / 9.1) * ((cols / 2) - 1)));
            startY = (Math.floor(game.config.height / 2) - (Math.floor(game.config.height / 4) * ((rows / 2) - 1)));
        } else if ((cols % 2) !== 0 && (rows % 2) === 0) {
            startX = (Math.floor(game.config.width / 2.245) - (Math.floor(game.config.width / 8) * ((cols / 2) - 1)));
            startY = (Math.floor(game.config.height / 2) - (Math.floor(game.config.height / 4.4) * ((rows / 2) - 1)));
        } else {
            startX = (Math.floor(game.config.width / 2.245) - (Math.floor(game.config.width / 9) * ((cols / 2) - 1)));
            startY = (Math.floor(game.config.height / 2) - (Math.floor(game.config.height / 4.4) * ((rows / 2) - 1)));
        }
        let tempX = startX,
            tempY = startY;
        for (let i = 0; i < rows; i++) {
            for (let j = (cols - 1); j >= 0; j--) {
                let block = this.add.image(tempX, tempY, "block").setOrigin(0.5).setScale(scaleFactorX * 1, scaleFactorY * 1);
                block.blocked = false;
                block.key = "block";
                tempX += offsetX;
                this.gridBlocks.push(block);
            }
            tempX = startX;
            tempY += offsetY;
        }
    };
    SetBlockedBlock(_arr, _numberOfBlocked) {
        let val = LevelManager.getRandom(_arr, _numberOfBlocked);
        if (val.length > 0) {
            for (let i = 0; i < val.length; i++) {
                val[i].alpha = 0.5;
                val[i].blocked = true;
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
        if (this.answers.length > 0) {
            for (let iterator of this.answers) {
                this.tweens.add({
                    targets: iterator.faceup,
                    angle: { from: iterator.faceup, to: (_angle + iterator.faceup) },
                    ease: 'Linear',
                    duration: this.rotationTime,
                    callbackScope: this,
                    loop: -1
                });
            }
        }
    };
    CalculateResponse() {
        let _level = LevelManager.GetCurrentLevelNumber();
        let _correctAnwer = this.totalCorrectAnswer;
        let _inCorrectAnswer = this.totalInCorrectAnswer;

        // let _accuracy = (this.totalNumberUserClicked === 0) ?
        //     0 : parseInt((this.totalGamePlayed / this.totalNumberUserClicked) * 100);
        let _accuracy = (this.totalNumberUserClicked === 0) ? 0 : parseInt((this.totalClickNeeded / this.totalNumberUserClicked) * 100);
        let _totalTime = 0;
        let _avarageTime = 0;
        for (let i = 0; i < this.totalEachLevelTime.length; i++) {
            _totalTime += this.totalEachLevelTime[i];

        }
        if (_totalTime > 0 && this.totalGamePlayed > 0) {
            _avarageTime = (_totalTime / this.totalGamePlayed); // / _totalTime);
        }
        let _timePerQuestion = [...this.totalEachLevelTime];
        let _deviceDateTime = Math.round(new Date().getTime() / 1000).toString();
        let _score = (_level * this.totalCorrectAnswer * 99);


        //integrating post game screen
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
        if (startingLevel >= 5) {
            if (presentLevel == startingLevel + 5) {
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

        //================first star calculation=============

        let firstStar = (_correctAnwer / this.totalQuestionPresented);
        if (firstStar >= Database.success_rate) {
            post_game.firstStar = true;
        }
        else {
            post_game.firstStar = false;
        }

        //=========second star calculation=============

        console.log('average answer time : ' + _avarageTime);
        if (parseFloat(_avarageTime).toFixed(2) <= parseFloat(Database.average_answer_time)) {
            post_game.secondStar = true;
        }
        else {
            post_game.secondStar = false;
        }
        //==================third star calculation=============
        let calculation = 2;
        let endLevel = _level;
        let startLevel = parseInt(Database.level);//LevelManager.GetInitialLevel();
        if ((endLevel - startLevel) >= calculation) {
            //third star visible;
            // document.getElementsByClassName("mt-3 img_gray").style.display="none";
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
        let data1 = await Server.sendGameData(data, Server);
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
            //     "&game_name=" + "MatchThePairs", "_self");
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
                    "&game_name=" + "MatchThePairs" +
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
                    "&game_name=" + "MatchThePairs", "_self");
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