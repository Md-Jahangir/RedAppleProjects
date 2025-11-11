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
        this.tickerRed;
        this.tickerGreen;
        this.timerDegre = -89; //1;
        this.graphics;
        this.timer;
        this.isTimerAvailable;
        this.totalTimeForGame;
        this.timeForEachLevel;
        this.totalNumberOfLevel;
        this.allLevelImage = [];
        this.totalCorrectAnswer = 0;
        this.totalInCorrectAnswer = 0;
        this.objectPosition = [];
        this.question = [];
        this.checkArr = [];
        this.imageNumberToLightUp;
        this.grey = [];
        this.indexSequenceToFollow = [];
        this.arrayIndexesToShowAsImage = [];
        // this.soundOnClick;

        this.ImageBlinkTime;
        this.counterForSingleAnswer = 0;
        this.isEmpty = true;
        this.greyInvisibleTween;
        this.questionVisibleTween;
        this.imageShowPerLevelTimer = null;
        this.bool = false;
        this.clickableBool = false;
        this.clickCounter = -1;
        this.consecutiveWins = 0;
        this.consecutiveLoose = 0;
        this.comboWins = 0;
        this.totalGamePlayed = 0;
        this.eachLevelTime = 0; //Each level time to calculate response
        this.totalEachLevelTime = []; //Each level time to calculate response
        // this.eachGameTime  = 0;//Each game time to calculate response
        this.totalNumberUserClicked = 0; //total number of click to calculate response
        this.totalQuestionPresented = -1; // total number of question presented to calculate response

        this.GrayscalePipeline = null;
        this.totalClickNeeded = 0;
        //==================BANNER TEXT===================//
        this.letsStart;
        this.levelUp;
        this.timesUp;
        this.excellent;
        this.gameOver;
        this.eachLevelTimer = null;
        this.consecutiveComboWins = 0;

        this.soundArray = [];
        //---------------------------------------------------------
        this.requiredClicksForTheGame = 0;
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
        window.focus();
        // SoundManager.StartSoundPlay();                                      //Game start sound 
        // //====> Selecting Background <======//
        this.levelBackground = LevelManager.DecideLevelBackground();
        let singleImage = this.levelBackground.split("/");
        // console.log('singleImage',singleImage)
        this.bg = this.add.image(game.config.width / 2, game.config.height / 2, singleImage[singleImage.length - 1]).setOrigin(0.5, 0.5).setScale(scaleFactorX * 1, scaleFactorY * 1);
        this.bg.setInteractive();
        // this.bg.setVisible(false);
        this.bg.on("pointerdown", (pointer, x, y, event) => this.OnBackgroundClick());
        // //=====> Static Items <==========//        
        let headerBar = this.add.image(game.config.width / 2, game.config.height / 23, 'one_pixel_white').setOrigin(0.5).setScale(scaleFactorX * 3000, scaleFactorY * 240);
        headerBar.setTint("0X04627b");
        headerBar.depth = 2;
        const style3 = { font: "bold 35px CCBellyLaugh", stroke: '#fff', strokeThickness: 6, fill: "#0c4826" };
        let headingText = this.add.text(game.config.width / 1.85, game.config.height / 12, "Power Off", style3).setOrigin(0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        headingText.depth = 2;
        this.thumbsUp = this.add.image(game.config.width / 20, game.config.height / 12, "like").setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.7, scaleFactorY * 0.7);
        this.thumbsDown = this.add.image(game.config.width / 1.05, game.config.height / 12, "unlke").setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.7, scaleFactorY * 0.7);
        this.thumbsUp.depth = 2;
        this.thumbsDown.depth = 2;
        const style1 = { fontFamily: 'Arial', fontSize: '40px', fill: '#f00', fontStyle: 'bold', align: 'center' };
        const style2 = { fontFamily: 'Arial', fontSize: '40px', fill: '#0f0', fontStyle: 'bold', align: 'center' };
        this.thumbsUpText = this.add.text(this.thumbsUp.x + (game.config.width / 15), this.thumbsUp.y, this.totalCorrectAnswer, style2).setOrigin(0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        this.thumbsDownText = this.add.text(this.thumbsDown.x - (game.config.width / 15), this.thumbsDown.y, this.totalInCorrectAnswer, style1).setOrigin(0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);

        this.thumbsUpText.depth = 2;
        this.thumbsDownText.depth = 2;

        this.tickerRed = this.add.image(game.config.width / 4, game.config.height / 12, "ticker_red").setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.5, scaleFactorY * 0.5);
        this.tickerGreen = this.add.image(game.config.width / 4, game.config.height / 12, "ticker_green").setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.5, scaleFactorY * 0.5);
        this.tickerRed.visible = false;
        this.tickerGreen.visible = false;
        this.tickerRed.depth = 3;
        this.tickerGreen.depth = 3;

        this.timer = this.time.addEvent({ delay: 1000, callback: this.UpdateTimer, callbackScope: this, loop: true });
        this.timer.paused = true;
        this.eachLevelTimer = this.time.addEvent({ delay: 100, callback: this.UpdateEachLevelTimer, callbackScope: this, loop: true });
        this.eachLevelTimer.paused = true;
        //====> Timer Arc <============//

        this.graphics = this.add.graphics();
        this.graphics.lineStyle(Math.floor(game.config.width / 300), 0x54f419, 1);
        this.graphics.beginPath();
        this.graphics.arc(game.config.width / 4, game.config.height / 12, Math.floor(game.config.width / 36), Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(this.timerDegre), true);
        this.graphics.strokePath();
        this.graphics.depth = 3;
        this.graphics.visible = false;

        // //===========Answer Click=========================//
        // this.numberOfAnswerClick = 0;
        //===> Game time <=====//
        this.GameTimer();

        // //############## Setting timer value #############//
        console.log("this.isTimerAvailable " + this.isTimerAvailable);
        //======> createing initial level <====//
        this.CreateLevel();
        this.graphics.visible = true;
        this.tickerGreen.visible = true;
        // this.timer.paused = false;

        this.BannerCreateAndHide("GAME_START", true);

    };

    OnBackgroundClick() {
        this.totalNumberUserClicked += 1;
    };

    CreateLevel() {
        this.eachLevelTimer.paused = false;
        this.ImageForCurrentLevel();
        this.currentLevel = LevelManager.GetCurrentLevelNumber();
        console.log(' this.currentLevel : ', this.currentLevel);
        setTimeout(() => {
            this.DisplayLevel();
        }, 500);
    };
    GameTimer() {
        let questionTimeData = LevelManager.DecideTimeOrNumberOfQuestion();
        console.log("questionTimeData: ", questionTimeData)
        if (questionTimeData[0] === null || questionTimeData[0] === "") {
            this.isTimerAvailable = false;
        } else {
            this.isTimerAvailable = true;
        }
        console.log("game timer this.isTimerAvailable: " + this.isTimerAvailable);
        this.totalTimeForGame = questionTimeData[0];
        this.timeForEachLevel = questionTimeData[1];
        this.totalNumberOfLevel = questionTimeData[2];
        console.log(" this.timeForEachLevel " + this.totalTimeForGame);
    };
    UpdateEachLevelTimer() {
        this.eachLevelTime += 100;
    };
    ImageForCurrentLevel() {
        this.soundArray = [...LevelManager.SendSoundFrequency()];
        console.log('this.soundArray : ', this.soundArray);
        // this.soundOnClick = LevelManager.SendSoundFrequency();
        // console.log('this.soundOnClick : ', this.soundOnClick);
        this.allLevelImage = LevelManager.SelectRandomQuestionImageSet();

        this.requiredClicksForTheGame = this.requiredClicksForTheGame + this.allLevelImage.length;

        this.totalNumberOfImages = LevelManager.numberOfImage;
        // console.log('allLevelImage', this.allLevelImage)
        for (let i = 0; i < this.allLevelImage.length; i++) {
            this.allLevelImage[i] = LoadAssets.getImageName(this.allLevelImage[i]);
        }
    };
    DisplayLevel() {
        const grayscalePipeline = this.renderer.pipelines.get('Gray');
        this.grey = [];
        this.question = [];
        this.totalQuestionPresented += 1;
        // time period of image visibility and visibility off
        this.ImageBlinkTime = LevelManager.blinkTime;
        // images to be blink
        this.imageNumberToLightUp = LevelManager.numberOfLightUpImage;
        // positions where images will blink
        this.objectPosition = LevelManager.GetObjectPosition();
        // shuffled the array object position 
        this.objectPosition = LevelManager.ShuffleArr(this.objectPosition);

        //Grey color button
        console.log("this.ImageBlinkTime: ", this.ImageBlinkTime);
        let greyButton = this.allLevelImage[1];

        // image add at those position
        for (let i = 0; i < this.allLevelImage.length; i++) {
            let objImage = this.add.sprite(this.objectPosition[i][0], this.objectPosition[i][1], this.allLevelImage[i]).setOrigin(0.5);
            objImage.visible = true;
            this.question.push(objImage);

            let greyImage = this.add.image(this.objectPosition[i][0], this.objectPosition[i][1], this.allLevelImage[i]).setOrigin(0.5).setInteractive({ useHandCursor: true }).setDepth(1)
            let pipelineInstance = this.plugins.get('rexgrayscalepipelineplugin').add(greyImage);
            // greyImage.setTint("0x000000")
            greyImage.visible = true;
            this.grey.push(greyImage);
        }
        console.log('this.question------------>', this.question);
        console.log('this.grey : ', this.grey);
        // randomly taking indexes of question images for sequence
        for (let i = 0; i < this.imageNumberToLightUp; i++) {
            let randomIndexPosOfTheLightUpImage = Math.floor(Math.random() * this.grey.length);
            this.indexSequenceToFollow.push(randomIndexPosOfTheLightUpImage);
        }
        console.log('this.indexSequenceToFollow******************', this.indexSequenceToFollow);
        this.arrayIndexesToShowAsImage = [...this.indexSequenceToFollow];
        console.log('this.arrayIndexesToShowAsImage : ', this.arrayIndexesToShowAsImage)
        // it provides the time period between blink 
        this.imageShowPerLevelTimer = this.time.addEvent({
            delay: this.ImageBlinkTime,
            callback: this.ImageBlinkInSequence,
            callbackScope: this,
            loop: true
        });
        this.totalClickNeeded += this.arrayIndexesToShowAsImage.length - 1;

    };

    ImageBlinkInSequence() {
        for (let i = 0; i < this.indexSequenceToFollow.length; i++) {
            if (this.bool == false) {
                this.soundArray[this.indexSequenceToFollow[i]].play();
                this.grey[this.indexSequenceToFollow[i]].visible = false;
                setTimeout(() => {
                    this.soundArray[this.indexSequenceToFollow[i]].stop();
                }, 500);
                break;
            } else {
                this.grey[this.indexSequenceToFollow[i]].visible = true;
                this.checkArr.push(this.indexSequenceToFollow.shift());
                break;
            }
        }

        if (this.bool == false) {
            this.bool = true;
        } else {
            this.bool = false;
        }

        if (this.checkArr.length == this.arrayIndexesToShowAsImage.length) {
            console.log("all lit done");
            for (let i = 0; i < this.grey.length; i++) {
                this.grey[i].visible = true;
                setTimeout(() => {
                    this.grey[i].visible = false;
                    setTimeout(() => {
                        this.grey[i].visible = true;
                        this.timer.paused = false;
                    }, this.ImageBlinkTime);
                }, 500);
            }
            this.imageShowPerLevelTimer.paused = true;
            this.answerAndDestructorRecognization();
            this.eachLevelTimer.paused = false;
        } else { }

    }
    answerAndDestructorRecognization() {
        let _this = this;
        for (let i = 0; i < this.grey.length; i++) {
            this.grey[i].key = i;
            this.grey[i].on("pointerup", (pointer, x, y, event) => _this.onObjectClicked(this.grey[i]), this);
        }
    }
    onObjectClicked(_this) {
        this.totalNumberUserClicked += 1;
        this.clickCounter++;
        let key = _this.key;
        this.soundArray[key].play();
        console.log('key============================', key);
        _this.visible = false;
        setTimeout(() => {
            _this.visible = true;
            // this.soundOnClick.stop();
            this.soundArray[key].stop();
        }, 500);
        if (this.arrayIndexesToShowAsImage[this.clickCounter] == key) {
            if (this.clickCounter == this.arrayIndexesToShowAsImage.length - 1) {
                console.log('correct ans');
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
                    // SoundManager.CorrectAnswerSoundPlay(); //Playing when answer is correct
                }
                this.LevelWin(this.totalCorrectAnswer);
                this.clickCounter = -1;
                this.arrayIndexesToShowAsImage = [];
                this.checkArr = [];
                this.ChangeLevel(true);
            }
        } else {
            console.log('wrong ans');
            this.totalGamePlayed += 1;
            this.totalInCorrectAnswer += 1;
            this.consecutiveWins = 0;
            this.consecutiveLoose += 1;
            this.consecutiveComboWins = 0;
            // SoundManager.InCorrectAnswerSoundPlay();
            this.LevelLoose(this.totalInCorrectAnswer);
            this.clickCounter = -1;
            this.arrayIndexesToShowAsImage = [];
            this.checkArr = [];

            this.ChangeLevel(true);
        }
        // this.totalGamePlayed += 1;
        // this.clickCounter = -1;
        // this.arrayIndexesToShowAsImage = [];
        // this.checkArr = [];
        // this.ChangeLevel(true);
    }

    // //=========>Level Complete<=================//
    ChangeLevel(_bool) {
        // setTimeout(() => {
        //     this.soundOnClick.stop();
        // }, 500);
        let levelOrTimeComplete = true;
        this.bool = false;
        if (this.isTimerAvailable) {
            console.log("timer if................................");

            if (this.timer.paused) {
                levelOrTimeComplete = false;
                this.ClearLevel();
                // SoundManager.EndSoundPlay(); //playing game end sound
                this.BannerCreateAndHide("TIMES_UP", false);
                this.CalculateResponse();
                this.DestroyQuestionAndOptions();
            }
        } else {
            console.log("timer else................................");
            if ((this.totalGamePlayed == this.totalNumberOfLevel)) {
                console.log("if................................");

                levelOrTimeComplete = false;
                this.ClearLevel();
                // SoundManager.EndSoundPlay(); //playing game end sound
                this.BannerCreateAndHide("GAME_OVER", false);
                this.CalculateResponse();
                this.graphics.clear();
                this.graphics.visible = false;
                this.tickerRed.visible = false;
                this.tickerGreen.visible = false;
                this.timer.paused = true;
            } else {
                console.log("else.................................");
                if (!_bool) {
                    this.totalGamePlayed += 1;
                    this.consecutiveWins = 0;
                    this.consecutiveComboWins = 0;
                    this.totalInCorrectAnswer += 1;
                    this.consecutiveLoose += 1;
                    this.currentLevel = LevelManager.GetCurrentLevelNumber();
                    this.LevelLoose(this.totalInCorrectAnswer);
                }
                this.timerDegre = -89;
                this.graphics.clear();
                this.graphics.visible = true;
                this.graphics.lineStyle(Math.floor(game.config.width / 300), 0x54f419, 1);
                this.graphics.beginPath();
                this.graphics.arc(game.config.width / 4, game.config.height / 12, Math.floor(game.config.width / 36), Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(this.timerDegre), true);
                this.graphics.strokePath();
                this.tickerRed.visible = false;
                this.tickerGreen.visible = true;

                this.timer.paused = false;
            }


        }
        if (levelOrTimeComplete) {
            this.ClearLevel();
            if (this.consecutiveWins == LevelManager.offsetForLevelUp) {
                // console.log('level_up')
                this.consecutiveWins = 0;
                this.BannerCreateAndHide("LEVEL_UP", true);
                // SoundManager.LevelUpSoundPlay();
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
        this.timer.paused = true;
        this.totalEachLevelTime.push(this.eachLevelTime);
        this.numberOfAnswerClick = 0;
        this.eachLevelTime = 0; // here i am making the each level time 0
        this.indexSequenceToFollow = [];
        this.arrayIndexesToShowAsImage = [];
        this.checkArr = [];
        this.clickCounter = -1;
        // this.graphics.clear();



        this.DestroyQuestionAndOptions()
    };
    DestroyQuestionAndOptions() {
        for (let i = 0; i < this.question.length; i++) {
            this.question[i].destroy();
        }
        for (let j = 0; j < this.grey.length; j++) {
            this.grey[j].destroy();
        }
        this.indexSequenceToFollow = [];
        this.arrayIndexesToShowAsImage = [];
        this.question = [];
        this.grey = [];
    }

    LevelWin(_number) {
        this.thumbsUpText.setText(_number);
    };
    LevelLoose(_number) {
        this.thumbsDownText.setText(_number);
    };

    UpdateTimer() {
        console.log("UpdateTimer");
        // console.log("this.totalTimeForGame: " + this.totalTimeForGame);
        // console.log("this.timeForEachLevel: " + this.timeForEachLevel);
        this.graphics.clear();
        let offSet;
        if (this.isTimerAvailable) {
            this.timerDegre += (360 / this.totalTimeForGame);
            offSet = (270 - (360 / this.totalTimeForGame));
        } else {
            this.timerDegre += (360 / this.timeForEachLevel);
            offSet = (270 - (360 / this.timeForEachLevel));
        }
        if (this.timerDegre < 269) {
            if (this.timerDegre > 180) {
                this.tickerRed.visible = true;
                this.tickerGreen.visible = false;
                this.graphics.lineStyle(Math.floor(game.config.width / 300), 0xf13900, 1);
                this.graphics.beginPath();
                this.graphics.arc(game.config.width / 4, game.config.height / 12, Math.floor(game.config.width / 36), Phaser.Math.DegToRad(-89), Phaser.Math.DegToRad(this.timerDegre), true);
                this.graphics.strokePath();
            } else {
                this.tickerRed.visible = false;
                this.tickerGreen.visible = true;
                this.graphics.lineStyle(Math.floor(game.config.width / 300), 0x54f419, 1);
                this.graphics.beginPath();
                this.graphics.arc(game.config.width / 4, game.config.height / 12, Math.floor(game.config.width / 36), Phaser.Math.DegToRad(-89), Phaser.Math.DegToRad(this.timerDegre), true);
                this.graphics.strokePath();
            }
        } else {
            this.graphics.clear();
            this.graphics.visible = false;
            this.tickerRed.visible = false;
            this.tickerGreen.visible = false;
            this.timer.paused = true;
            // SoundManager.InCorrectAnswerSoundPlay(); //playing unanswered as incorrect

            this.ChangeLevel(false);

        }
    };

    // //===========>Data to be sent to server<==============//
    CalculateResponse() {
        let _level = LevelManager.GetCurrentLevelNumber();
        let _correctAnwer = this.totalCorrectAnswer;
        let _inCorrectAnswer = this.totalInCorrectAnswer;
        let _accuracy = (this.totalNumberUserClicked === 0) ? 0 : parseInt((this.totalGamePlayed / this.totalNumberUserClicked) * 100);
        // let _accuracy = (this.totalNumberUserClicked === 0) ? 0 : parseInt((this.requiredClicksForTheGame / this.totalNumberUserClicked) * 100);
        let _totalTime = 0;
        let _avarageTime = 0;
        for (let i = 0; i < this.totalEachLevelTime.length; i++) {
            _totalTime += this.totalEachLevelTime[i];

        }
        if (_totalTime > 0 && this.totalGamePlayed > 0) {
            _avarageTime = (_totalTime / this.totalGamePlayed); //(this.totalGamePlayed / _totalTime);
        } else {
            _avarageTime = 0;
            // console.log('avgTime : ' + _avarageTime); // added to prevent infinity in avaerage time 
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
        if (startingLevel >= 5) {
            if (presentLevel == startingLevel + 5) {
                // show star system
                post_game.ratingBox = true;
            }
            else {
                post_game.ratingBox = false;
            }
        } else {
            post_game.ratingBox = false;
        }

        //=======first star calculation============

        let firstStar = (_correctAnwer / this.totalQuestionPresented);
        if (firstStar >= Database.success_rate) {
            // console.log('get first star');
            post_game.firstStar = true;
        } else {
            post_game.firstStar = false;
        }

        //==============second star calculation====================
        console.log('average answer time : ' + _avarageTime);
        if (parseFloat(_avarageTime).toFixed(2) <= parseFloat(Database.average_answer_time)) {
            post_game.secondStar = true;
        }
        else {
            post_game.secondStar = false;
        }
        //=========third star calculation======================
        let calculation = 2;
        // console.log('calculation : ' + calculation);
        let endLevel = _level;
        let startLevel = parseInt(Database.level); //LevelManager.GetInitialLevel();
        // console.log('start level : ' + startLevel + 'initial level : ' + endLevel);
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
        // console.log('brain help : ' + brainHelp);



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
        console.log('_combo', _combo)
        // Server.sendGameData(data, Server);
        // newly added for post game screen
        let _serverResponse = await Server.sendGameData(data, Server);

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
                    "&game_name=" + "PowerOff" +
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
                    "&game_name=" + "PowerOff", "_self");
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