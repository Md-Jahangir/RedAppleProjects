import { LevelManager } from "./LevelManager.js";
import { Server } from "./Server.js";
import { LoadAssets } from "./LoadAssets.js";
import { Database } from "./Database.js";
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
        // this.graphics;
        this.timer;
        this.rotationAngle = 0;
        //=====> Level Data <======//
        this.leftButton;
        this.rigthtButton;
        this.isTimerAvailable;
        this.totalTimeForGame;
        this.timeForEachLevel;
        this.totalNumberOfLevel;
        this.isRotationAvailable;
        this.rotationType;
        this.rotationTime;
        this.totalNumberOfImages;
        this.allLevelImage = [];
        this.levelBackground;
        this.currentLevelImage;
        this.totalCorrectAnswer = 0;
        this.totalInCorrectAnswer = 0;
        this.objectAngle = 15;
        //------------------------------
        this.leftPart = 0;
        this.rightPart = 0;
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
        this.consecutiveComboWins = 0;
        this.eachLevelTimer;
        this.Question;
        this.questionFlip = [false, true, false, true, false, true, true, false, true, false, false, true, true, false, false, false, true, false, true, true];
        this.questionFlipIndex = 0;
    }
    create() {
        if (Server.platform == "favorites") {
            window.parent.postMessage({ eventName: "gameStarted", payload: null }, "*");
        }
        SoundManager.StartSoundPlay(); //Game start sound 
        //====> Selecting Background <======//
        this.levelBackground = LevelManager.DecideLevelBackground();
        let singleImage = this.levelBackground.split("/");
        this.bg = this.add.image(game.config.width / 2, game.config.height / 2, 'Back' + singleImage[singleImage.length - 1]).setOrigin(0.5, 0.5).setScale(scaleFactorX * 1, scaleFactorY * 1);
        this.bg.setInteractive();
        this.bg.on("pointerdown", (pointer, x, y, event) => this.OnBackgroundClick());
        let title = this.add.image(game.config.width / 2, game.config.height / 9, 'title').setOrigin(0.5, 0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);

        //=====> Static Items <==========// 
        // let hand = this.add.image(game.config.width/2,game.config.height/2,'hand').setOrigin(0.5).setScale(scaleFactorX*2,scaleFactorY*2);
        // hand.depth = 2;
        // hand.flipX = true;   
        this.leftButton = this.add.image(game.config.width / 9, game.config.height / 1.15, 'left_button').setOrigin(0.5).setScale(scaleFactorX * 1.3, scaleFactorY * 1.3);
        this.leftButton.depth = 2;
        this.leftButton.key = "left_button";
        this.leftButton.prevScaleX = scaleFactorX * 1.3;
        this.leftButton.prevScaleY = scaleFactorY * 1.3;
        this.leftButton.setInteractive();
        this.rigthtButton = this.add.image(game.config.width / 1.12, game.config.height / 1.15, 'right_button').setOrigin(0.5).setScale(scaleFactorX * 1.3, scaleFactorY * 1.3);
        this.rigthtButton.depth = 2;
        this.rigthtButton.key = "right_button";
        this.rigthtButton.prevScaleX = scaleFactorX * 1.3;
        this.rigthtButton.prevScaleY = scaleFactorY * 1.3;
        this.rigthtButton.setInteractive();
        this.leftButton.on("pointerdown", this.ButtonPointerDown);
        this.leftButton.on("pointerup", this.ButtonPointerUp);
        this.rigthtButton.on("pointerdown", this.ButtonPointerDown);
        this.rigthtButton.on("pointerup", this.ButtonPointerUp);

        this.thumbsUp = this.add.image(game.config.width / 12, game.config.height / 10, "thumbs_up").setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.8, scaleFactorY * 0.8);
        this.thumbsDown = this.add.image(game.config.width / 1.09, game.config.height / 10, "thumbs_down").setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.8, scaleFactorY * 0.8);
        this.thumbsUp.depth = 2;
        this.thumbsDown.depth = 2;
        const style = { font: "bold 30px CCBellyLaugh", fill: "#67473e" };
        this.thumbsUpText = this.add.text(this.thumbsUp.x + (game.config.width / 16), this.thumbsUp.y, this.totalCorrectAnswer, style).setOrigin(0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        this.thumbsDownText = this.add.text(this.thumbsDown.x - (game.config.width / 16), this.thumbsDown.y, this.totalInCorrectAnswer, style).setOrigin(0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        this.thumbsUpText.depth = 2;
        this.thumbsDownText.depth = 2;
        this.timerImg = this.add.image(game.config.width / 4.5, game.config.height / 10, "timer").setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.8, scaleFactorY * 0.8);
        this.timerImg.depth = 3;
        const timerTextStyle = { font: "bold 18px CCBellyLaugh", fill: "#e12327" };
        this.timerText = this.add.text(game.config.width / 4.5, game.config.height / 8.5, this.timerValueText, timerTextStyle).setOrigin(0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        this.timerText.depth = 3;
        //------------------------------------------
        this.timer = this.time.addEvent({ delay: 100, callback: this.UpdateTimer, callbackScope: this, loop: true });
        this.timer.paused = true;
        this.eachLevelTimer = this.time.addEvent({ delay: 100, callback: this.UpdateEachLevelTimer, callbackScope: this, loop: true });
        this.eachLevelTimer.paused = true;

        //===========Answer Click=========================//
        this.numberOfAnswerClick = 0;
        //===> Game time <=====//
        this.GameTimer();
        //############## Setting timer value #############//    
        if (this.isTimerAvailable) {
            this.timerValueText = this.totalTimeForGame;
            this.SetTimerText(this.timerValueText);
        } else {
            this.timerValueText = this.timeForEachLevel;
            this.SetTimerText(this.timerValueText);
        }
        this.questionFlip = LevelManager.ShuffleArr(this.questionFlip);
        this.questionFlipIndex = 0;
        //======> createing initial level <====//
        this.CreateLevel();
        this.BannerCreateAndHide("GAME_START", true);
    };
    OnBackgroundClick() {
        this.totalNumberUserClicked += 1;
    };
    UpdateEachLevelTimer() {
        this.eachLevelTime += 100;
    };
    SetTimerText(_time) {
        let min, sec;
        sec = parseInt(_time / 1000);
        if (sec > 60) {
            min = parseInt(sec / 60);
            min = min < 10 ? ("0" + min) : min;
            sec = sec % 60;
            sec = sec < 10 ? ("0" + sec) : sec;
            this.timerText.text = min + ":" + sec;
        } else {
            min = "00";
            sec = sec < 10 ? ("0" + sec) : sec;
            this.timerText.text = "00:" + sec;
        }
    }
    update() { };
    ButtonPointerDown(_this) {
        this.setScale(scaleFactorX * 1.2, scaleFactorY * 1.2);
    };
    ButtonPointerUp(_this) {
        this.setScale(this.prevScaleX, this.prevScaleY);
        let answerCheck;
        if (this.key == "left_button") {
            answerCheck = this.scene.CheckAnswer("left");
        } else {
            answerCheck = this.scene.CheckAnswer("right")
        }
        this.scene.onObjectClicked(answerCheck);
    };
    CheckAnswer(_value) {
        if (!this.Question.flipX && (_value == "left")) {
            return true;
        } else if (this.Question.flipX && (_value == "right")) {
            return true;
        } else {
            return false;
        }
    };
    CreateLevel() {
        setTimeout(() => {
            this.leftButton.setInteractive();
            this.rigthtButton.setInteractive();
        }, 1000);
        this.eachLevelTimer.paused = false;

        // if(! this.isTimerAvailable )
        // {
        //     console.log("new level"+this.timeForEachLevel);
        //     this.timerValueText = this.timeForEachLevel;
        //     this.SetTimerText(this.timerValueText);
        // }
        // LevelManager.DecidePlacementOfImages();
        this.GameTimer();
        //=====> Images will be used in game <=====//
        this.ImageForCurrentLevel();
        //====> Image Rotation <====//
        this.RotationOfImage();
        this.currentLevel = LevelManager.GetCurrentLevelNumber();
        //=========> Display Level <=====//
        setTimeout(() => {
            this.DisplayLevel();
        }, 700);
    };
    GameTimer() {
        let questionTimeData = LevelManager.DecideTimeOrNumberOfQuestion();
        if (questionTimeData[0] === null || questionTimeData[0] === "") {
            this.isTimerAvailable = false;
        } else {
            this.isTimerAvailable = true;
        }
        this.totalTimeForGame = (questionTimeData[0] * 1000);
        this.timeForEachLevel = (questionTimeData[1] * 1000);
        this.totalNumberOfLevel = questionTimeData[2];
        // console.log(" this.timeForEachLevel " + this.timeForEachLevel);
    };
    RotationOfImage() {
        let rotationData = LevelManager.DecideRotation();
        if (rotationData[0] == null) {
            this.isRotationAvailable = false;
        } else {
            this.isRotationAvailable = true;
        }
        this.rotationType = rotationData[0];
        this.rotationTime = (rotationData[1] * 1000);
    };
    ImageForCurrentLevel() {
        this.allLevelImage = LevelManager.totalLevelImageName;
        for (let i = 0; i < this.allLevelImage.length; i++) {
            this.allLevelImage[i] = LoadAssets.getImageName(this.allLevelImage[i]);
        }
        const randomIndex = Math.floor(Math.random() * ((this.allLevelImage.length - 1) - 0 + 1) + 0);
        this.currentLevelImage = this.allLevelImage[randomIndex];
    };
    DisplayLevel(_this) {
        // console.log("flip arr");
        this.Question = this.add.image(game.config.width / 2, game.config.height / 2, this.currentLevelImage).setOrigin(0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        this.Question.depth = 5;
        this.Question.key = "Question";
        this.totalQuestionPresented += 1;
        this.Question.flipX = this.questionFlip[this.questionFlipIndex];
        console.log("%c" + this.questionFlip[this.questionFlipIndex],
            "color: white;background: black;font-size: 30px;border: 1px solid red;");

        if (this.questionFlipIndex >= (this.questionFlip.length - 1)) {
            this.questionFlip = LevelManager.ShuffleArr(this.questionFlip)
            this.questionFlipIndex = 0
        } else {
            this.questionFlipIndex += 1;
        }
        if (this.isRotationAvailable) {
            this.RotateImages(this.rotationType);
        }
        this.timer.paused = false;
    };
    onObjectClicked(_correctAnswer) {
        this.totalEachLevelTime.push(this.eachLevelTime);
        this.leftButton.disableInteractive();
        this.rigthtButton.disableInteractive();
        this.totalNumberUserClicked += 1;
        if (_correctAnswer == true) {
            // this.totalEachLevelTime.push(this.eachLevelTime);
            this.numberOfAnswerClick += 1;
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
                SoundManager.CorrectAnswerSoundPlay(); //Playing when answer is correct
            }
            this.LevelWin(this.totalCorrectAnswer);
        } else {
            // this.totalEachLevelTime.push(this.eachLevelTime);
            this.totalGamePlayed += 1;
            this.consecutiveComboWins = 0;
            this.totalInCorrectAnswer += 1;
            this.consecutiveWins = 0;
            this.consecutiveLoose += 1;
            SoundManager.InCorrectAnswerSoundPlay(); //Playing when answer is incorrect
            this.LevelLoose(this.totalInCorrectAnswer);
        }
        this.ChangeLevel(true);
    }
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
                // console.log("level Down----------------------------" + this.currentLevel);
                if (this.currentLevel > 1) {
                    LevelManager.DecreaseLevel(LevelManager);
                } else { }
                this.consecutiveLoose = 0;
            }
            this.currentLevel = LevelManager.GetCurrentLevelNumber();
            this.CreateLevel();
        }
    };
    ClearLevel() {
        this.leftButton.disableInteractive();
        this.rigthtButton.disableInteractive();
        this.eachLevelTimer.paused = true;
        // this.totalEachLevelTime.push(this.eachLevelTime);
        this.rotationAngle = 0;
        this.eachLevelTime = 0;
        if (!this.isTimerAvailable) {
            this.timerValueText = this.timeForEachLevel;
            this.SetTimerText(this.timerValueText);
        }
        let index = this.scene.scene.children.list.findIndex(child => child.key === "Question");
        if (index != null && index != undefined && index != -1) {
            this.scene.scene.children.list[index].destroy();
        }
    };
    UpdateLevelInformation() { };
    LevelWin(_number) {
        this.thumbsUpText.setText(_number);
    };
    LevelLoose(_number) {
        this.thumbsDownText.setText(_number);
    };
    //########### Check ###########################//
    GetDataFromLevelManager() { };
    UpdateTimer() {
        // this.eachLevelTime += 1;

        if ((this.timerValueText - 100) < 0) {
            this.timerValueText = 0;
        } else {
            this.timerValueText -= 100; //1;
        }
        this.SetTimerText(this.timerValueText);
        if (this.timerValueText == 0) {
            this.timer.paused = true;
            SoundManager.InCorrectAnswerSoundPlay(); //playing unanswered as incorrect
            this.ChangeLevel(false);
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
        this.tweens.add({
            targets: this.Question,
            angle: { from: this.Question.angle, to: (_angle + this.Question.angle) },
            ease: 'Linear',
            duration: this.rotationTime,
            callbackScope: this,
            loop: -1
        });
    };


    //===========>Data to be sent to server<==============//
    CalculateResponse() {
        let _level = LevelManager.GetCurrentLevelNumber();
        let _correctAnwer = this.totalCorrectAnswer;
        let _inCorrectAnswer = this.totalInCorrectAnswer;
        let _accuracy = (this.totalNumberUserClicked === 0) ? 0 : parseInt((this.totalGamePlayed / this.totalNumberUserClicked) * 100);
        let _totalTime = 0;
        let _avarageTime = 0;
        for (let i = 0; i < this.totalEachLevelTime.length; i++) {
            _totalTime += this.totalEachLevelTime[i];

        }
        console.log("_totalTime " + _totalTime);
        console.log("_totalTime " + this.totalGamePlayed);
        if (_totalTime > 0) {
            _avarageTime = (_totalTime / this.totalGamePlayed); //(this.totalGamePlayed / _totalTime);
        }
        console.log("_avarageTime " + _avarageTime);
        let _timePerQuestion = [...this.totalEachLevelTime];
        let _deviceDateTime = Math.round(new Date().getTime() / 1000).toString();
        let _score = (_level * this.totalCorrectAnswer * 99);

        //=================post game screen===================
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

        //===============for rating system container ====================================

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

        //===============first star calculation=======================

        let firstStar = (_correctAnwer / this.totalQuestionPresented);
        if (firstStar >= Database.success_rate) {
            post_game.firstStar = true;
        } else {
            post_game.firstStar = false;
        }

        //==========second star calculation==================
        console.log('average answer time : ' + _avarageTime);
        if (parseFloat(_avarageTime).toFixed(2) <= parseFloat(Database.average_answer_time)) {
            post_game.secondStar = true;
        }
        else {
            post_game.secondStar = false;
        }
        //===============third star calculation================
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
        //==========score calculation=======================================
        console.log('last high score : ' + Database.lastHighestScore);
        if (Database.lastHighestScore == 0 || Database.lastHighestScore == "") {
            // show the _score as highest score on dom panel
            console.log('show the _score as highest score on dom panel')
            post_game.highScore = true;
        } else if (_score > Database.lastHighestScore) {
            // show the score scored by player on the dom panel
            console.log('show the score scored by player on the dom panel');
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
            "game_id": gameId,
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
            //     "&game_name=" + "its-left-its-right", "_self");

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
                    "&game_name=" + "its-left-its-right" +
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
                    "&game_name=" + "its-left-its-right", "_self");
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
        popUpBg.depth = 6;
        if (_bool) {
            setTimeout(() => {
                popUpBg.visible = false;
            }, 500);
        }
    }
}