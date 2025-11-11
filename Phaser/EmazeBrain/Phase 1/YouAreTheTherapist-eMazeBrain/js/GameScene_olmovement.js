import { LevelManager } from "./LevelManager.js";
import { LoadAssets } from "./LoadAssets.js";
import { Server } from "./Server.js";
import { Database } from "./Database.js";
export default class GameScene extends Phaser.Scene 
{
    constructor() 
    {
        super("GameScene");
        //===> General Data <====//
        this.thumbsDown;
        this.thumbsUp;
        this.bg;
        this.thumbsDownText;
        this.thumbsUpText; 
        this.timer;
        // this.rotateTimer;
        this.rotationAngle = 0;
        this.northWord;
        this.southWord;
        this.northEast;
        this.northWest;
        this.southWest;
        this.southEast;
        this.west;
        this.east;
        this.check;
        // this.emotions = [
        //     "Sad",
        //     "Happy",
        //     "Afraid",
        //     "Angry",
        //     "Surprised",
        //     "Disgusted",
        //     "Confused"
        // ];
        this.emotions = [
            "Sad",
            "Happy",
            "Angry",
            "Surprised",
            "Confused"
        ];
        this.SelectedEmotion;
        this.consecutiveComboWins = 0;
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
        this.movementTime;
        this.rotationType;
        this.rotationTime;
        this.totalNumberOfCorrectImages;
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
        this.movementIntervalInterval  = false;
        this.movementContinuousIntervalArr = [];
        this.movementIntervalIntervalArr = [];
        //-----------------------------------
        this.intervalTimer;
        this.currentLevel = 1;
        this.consecutiveWins = 0;
        this.consecutiveLoose = 0;
        this.comboWins = 0;
        this.totalGamePlayed = 0;       
        this.northPosition = [];
        this.northEastPosition = [];
        this.northWestPosition = [];

        this.southPosition = [];
        this.southEastPosition = [];
        this.southWestPosition = [];

        this.eastPosition = [];
        this.westPosition = [];

        this.eachLevelTime  = 0;//Each level time to calculate response
        this.totalEachLevelTime  = [];//Each level time to calculate response
        this.eachGameTime  = 0;//Each game time to calculate response
        this.totalNumberUserClicked  = 0;//total number of click to calculate response
       // this.totalNumberUserAnswered  = 0;//total number of question answered to calculate response
        this.totalQuestionPresented = 0;// total number of question presented to calculate response
        //==================BANNER TEXT===================//
        this.letsStart;
        this.levelUp;
        this.timesUp;
        this.excellent;
        this.gameOver;
        //===========Answer Click=========================//
        this.numberOfAnswerClick = 0;
        this.timerHeight = 1;
        this.eachLevelTimer;
        this.url;
    }
   
    create() 
    {
        SoundManager.StartSoundPlay();//Game start sound 
        //=====> Static Items <==========//        
        // let headerBar = this.add.image(game.config.width/2,game.config.height/12,'heading').setOrigin(0.5).setScale(scaleFactorX*2.17,scaleFactorY*2.5);
        // headerBar.depth = 2;
        this.thumbsUp  = this.add.image(game.config.width/20,game.config.height/12.7,"thumbs_up").setOrigin(0.5,0.5).setScale(scaleFactorX*0.5,scaleFactorY*0.5);
        this.thumbsDown = this.add.image(game.config.width/1.05,game.config.height/12.7,"thumbs_down").setOrigin(0.5,0.5).setScale(scaleFactorX*0.5,scaleFactorY*0.5);
        this.thumbsUp.depth = 2;
        this.thumbsDown.depth = 2;
        const style = { font: "bold 30px Arial", fill: "#fff" };
        this.thumbsUpText = this.add.text(this.thumbsUp.x + (game.config.width/17), this.thumbsUp.y ,  this.totalCorrectAnswer, style).setOrigin(0.5).setScale(scaleFactorX*2,scaleFactorY*2);
        this.thumbsDownText = this.add.text(this.thumbsDown.x - (game.config.width/17), this.thumbsDown.y , this.totalInCorrectAnswer, style).setOrigin(0.5).setScale(scaleFactorX*2,scaleFactorY*2);
        this.thumbsUpText.depth = 2;
        this.thumbsDownText.depth = 2;
        //============================= Words ==============================//
        this.northWord  = this.add.image(Math.floor(game.config.width/1.9),Math.floor(game.config.height/1.136),"button_1").setOrigin(0.5,0.5).setScale(scaleFactorX*2,scaleFactorY*2);
        this.southWord  = this.add.image(Math.floor(game.config.width/1.9),Math.floor(game.config.height/3.17),"button_2").setOrigin(0.5,0.5).setScale(scaleFactorX*2,scaleFactorY*2);
        this.northEast  = this.add.image(Math.floor(game.config.width/1.23),Math.floor(game.config.height/1.136),"button_3").setOrigin(0.5,0.5).setScale(scaleFactorX*2,scaleFactorY*2);
        this.northWest  = this.add.image(Math.floor(game.config.width/5.48),Math.floor(game.config.height/1.136),"button_4").setOrigin(0.5,0.5).setScale(scaleFactorX*2,scaleFactorY*2);
        this.southWest  = this.add.image(Math.floor(game.config.width/5.04),Math.floor(game.config.height/3.17),"button_4").setOrigin(0.5,0.5).setScale(scaleFactorX*2,scaleFactorY*2);
        this.southEast  = this.add.image(Math.floor(game.config.width/1.23),Math.floor(game.config.height/3.17),"button_4").setOrigin(0.5,0.5).setScale(scaleFactorX*2,scaleFactorY*2);
        this.east  = this.add.image(Math.floor(game.config.width/5.04),Math.floor(game.config.height/1.685),"button_4").setOrigin(0.5,0.5).setScale(scaleFactorX*2,scaleFactorY*2);
        this.west  = this.add.image(Math.floor(game.config.width/1.23),Math.floor(game.config.height/1.685),"button_4").setOrigin(0.5,0.5).setScale(scaleFactorX*2,scaleFactorY*2);
        this.northWord.depth = 2;
        this.southWord.depth = 2;
        this.northEast.depth = 2;
        this.northWest.depth = 2;
        this.southWest.depth = 2;
        this.southEast.depth = 2;
        this.west.depth = 2;
        this.east.depth = 2;     
        //======================== Emotions ======================================//
      
        const emotionStyle = { font: " 35px CCBellyLaugh", fill: "#fff" };
        let currentLevelEmotions = [];
        this.emotion1 = this.add.text(this.southPosition.x, this.southPosition.y,"", emotionStyle).setOrigin(0.5);
        this.emotion1.depth = 2;
        // currentLevelEmotions.push(this.emotion1);
        // ////console.log("currentLevelEmotions",currentLevelEmotions);
        // ////console.log("this.SelectedEmotion"+this.SelectedEmotion);
        // this.OnButtonClick(currentLevelEmotions);
        // currentLevelEmotions.forEach(element => {
        //     if(element.text === this.SelectedEmotion)
        //     {
        //         this.OnButtonClick(element);
        //     }
        // });
        //==============================
        this.timer = this.time.addEvent({ delay: 1000, callback: this.UpdateTimer, callbackScope: this, loop: true });
        this.timer.paused = true;
        this.eachLevelTimer = this.time.addEvent({ delay: 100, callback: this.UpdateEachLevelTimer, callbackScope: this, loop: true });
        this.eachLevelTimer.paused = true;
        // this.rotateTimer = this.time.addEvent({ delay: (10), 
        //                     callback: this.UpdateRotateTimer, 
        //                     callbackScope: this, loop: true });
        // this.rotateTimer.paused = true;
        //=============Object Location===========================//
        this.northPosition = [
            [Math.floor(game.config.width/16),Math.floor(game.config.height/3),0.8],
            [Math.floor(game.config.width/7.01),Math.floor(game.config.height/3),0.8],
            [Math.floor(game.config.width/4.5),Math.floor(game.config.height/3),0.8],
            [Math.floor(game.config.width/3.31),Math.floor(game.config.height/3),0.8],
            [Math.floor(game.config.width/2.62),Math.floor(game.config.height/3),0.8],
            [Math.floor(game.config.width/2.17),Math.floor(game.config.height/3),0.8],
            [Math.floor(game.config.width/1.85),Math.floor(game.config.height/3),0.8],
            [Math.floor(game.config.width/1.613),Math.floor(game.config.height/3),0.8],
            [Math.floor(game.config.width/1.429),Math.floor(game.config.height/3),0.8],
            [Math.floor(game.config.width/1.283),Math.floor(game.config.height/3),0.8],
            [Math.floor(game.config.width/1.164),Math.floor(game.config.height/3),0.8],
            [Math.floor(game.config.width/1.065),Math.floor(game.config.height/3),0.8]
        ];      
        this.northWestPosition = [
            [Math.floor(game.config.width/1.2),Math.floor(game.config.height/5),0.8],
            [Math.floor(game.config.width/1.05),Math.floor(game.config.height/2),0.8],
            [Math.floor(game.config.width/1.4),Math.floor(game.config.height/5),0.8],
            [Math.floor(game.config.width/1.2),Math.floor(game.config.height/2.3),0.8],
            [Math.floor(game.config.width/1.4),Math.floor(game.config.height/2),0.8],
            [Math.floor(game.config.width/1.8),Math.floor(game.config.height/5.8),0.8],
            [Math.floor(game.config.width/1.7),Math.floor(game.config.height/2.6),0.8],
            [Math.floor(game.config.width/1.07),Math.floor(game.config.height/4),0.8],
            [Math.floor(game.config.width/1.22),Math.floor(game.config.height/1.5),0.8],
            [Math.floor(game.config.width/1.6),Math.floor(game.config.height/1.6),0.8],
            [Math.floor(game.config.width/2.3),Math.floor(game.config.height/3),0.8],
            [Math.floor(game.config.width/2.1),Math.floor(game.config.height/2),0.8]
        ];
        this.northEastPosition = [
            [Math.floor(game.config.width/1.92),Math.floor(game.config.height/8),0.8],
            [Math.floor(game.config.width/2.25),Math.floor(game.config.height/6),0.8],
            [Math.floor(game.config.width/3),Math.floor(game.config.height/2),0.8],
            [Math.floor(game.config.width/4),Math.floor(game.config.height/8),0.8],
            [Math.floor(game.config.width/5),Math.floor(game.config.height/3),0.8],
            [Math.floor(game.config.width/11),Math.floor(game.config.height/2.8),0.8],
            [Math.floor(game.config.width/2),Math.floor(game.config.height/2.5),0.8],
            [Math.floor(game.config.width/14),Math.floor(game.config.height/1.5),0.8],
            [Math.floor(game.config.width/3),Math.floor(game.config.height/4),0.8],
            [Math.floor(game.config.width/6),Math.floor(game.config.height/1.5),0.8],
            [Math.floor(game.config.width/3.7),Math.floor(game.config.height/1.5),0.8],
            [Math.floor(game.config.width/2.3),Math.floor(game.config.height/1.4),0.8]
        ];
        this.southPosition = [
            [Math.floor(game.config.width/16),Math.floor(game.config.height/1.3),0.8],
            [Math.floor(game.config.width/7.01),Math.floor(game.config.height/1.3),0.8],
            [Math.floor(game.config.width/4.5),Math.floor(game.config.height/1.3),0.8],
            [Math.floor(game.config.width/3.31),Math.floor(game.config.height/1.3),0.8],
            [Math.floor(game.config.width/2.62),Math.floor(game.config.height/1.3),0.8],
            [Math.floor(game.config.width/2.17),Math.floor(game.config.height/1.3),0.8],
            [Math.floor(game.config.width/1.85),Math.floor(game.config.height/1.3),0.8],
            [Math.floor(game.config.width/1.613),Math.floor(game.config.height/1.3),0.8],
            [Math.floor(game.config.width/1.429),Math.floor(game.config.height/1.3),0.8],
            [Math.floor(game.config.width/1.283),Math.floor(game.config.height/1.3),0.8],
            [Math.floor(game.config.width/1.164),Math.floor(game.config.height/1.3),0.8],
            [Math.floor(game.config.width/1.065),Math.floor(game.config.height/1.3),0.8]
        ];
        this.southEastPosition = [
            [Math.floor(game.config.width/12),Math.floor(game.config.height/1.2),0.8],
            [Math.floor(game.config.width/6),Math.floor(game.config.height/1.4),0.8],
            [Math.floor(game.config.width/4),Math.floor(game.config.height/1.6),0.8],
            [Math.floor(game.config.width/3),Math.floor(game.config.height/1.3),0.8],
            [Math.floor(game.config.width/4),Math.floor(game.config.height/1.15),0.8],
            [Math.floor(game.config.width/12),Math.floor(game.config.height/1.6),0.8],
            [Math.floor(game.config.width/6),Math.floor(game.config.height/2.2),0.8],
            [Math.floor(game.config.width/14),Math.floor(game.config.height/2.9),0.8],
            [Math.floor(game.config.width/2.4),Math.floor(game.config.height/1.2),0.8],
            [Math.floor(game.config.width/2.8),Math.floor(game.config.height/2.2),0.8],
            [Math.floor(game.config.width/2.2),Math.floor(game.config.height/1.8),0.8],
            [Math.floor(game.config.width/3.6),Math.floor(game.config.height/3),0.8]
        ];
        this.southWestPosition = [
            [Math.floor(game.config.width/1.2),Math.floor(game.config.height/2.5),0.8],
            [Math.floor(game.config.width/1.05),Math.floor(game.config.height/1.6),0.8],
            [Math.floor(game.config.width/1.2),Math.floor(game.config.height/2.5),0.8],
            [Math.floor(game.config.width/1.07),Math.floor(game.config.height/3.5),0.8],
            [Math.floor(game.config.width/1.7),Math.floor(game.config.height/2.6),0.8],
            [Math.floor(game.config.width/1.4),Math.floor(game.config.height/1.7),0.8],
            [Math.floor(game.config.width/1.7),Math.floor(game.config.height/1.2),0.8],
            [Math.floor(game.config.width/1.2),Math.floor(game.config.height/1.3),0.8],
            [Math.floor(game.config.width/1.05),Math.floor(game.config.height/1.2),0.8],
            [Math.floor(game.config.width/1.4),Math.floor(game.config.height/1.2),0.8],
            [Math.floor(game.config.width/2.3),Math.floor(game.config.height/2.2),0.8],
            [Math.floor(game.config.width/2.1),Math.floor(game.config.height/1.4),0.8]
        ];
        this.eastPosition = [
            [Math.floor(game.config.width/1.2),Math.floor(game.config.height/2.2),0.8],
            [Math.floor(game.config.width/1.1),Math.floor(game.config.height/1.6),0.8],
            [Math.floor(game.config.width/1.05),Math.floor(game.config.height/2.5),0.8],
            [Math.floor(game.config.width/1.3),Math.floor(game.config.height/1.5),0.8],
            [Math.floor(game.config.width/1.35),Math.floor(game.config.height/1.12),0.8],
            [Math.floor(game.config.width/1.1),Math.floor(game.config.height/1.12),0.8],
            [Math.floor(game.config.width/1.7),Math.floor(game.config.height/1.2),0.8],
            [Math.floor(game.config.width/1.5),Math.floor(game.config.height/1.45),0.8],
            [Math.floor(game.config.width/1.4),Math.floor(game.config.height/2.2),0.8],
            [Math.floor(game.config.width/1.2),Math.floor(game.config.height/4),0.8],
            [Math.floor(game.config.width/1.4),Math.floor(game.config.height/4.3),0.8],
            [Math.floor(game.config.width/1.6),Math.floor(game.config.height/2.5),0.8]
        ];
        this.westPosition = [
            [Math.floor(game.config.width/10),Math.floor(game.config.height/2.2),0.8],
            [Math.floor(game.config.width/5),Math.floor(game.config.height/1.8),0.8],
            [Math.floor(game.config.width/3.3),Math.floor(game.config.height/2.4),0.8],
            [Math.floor(game.config.width/5),Math.floor(game.config.height/3),0.8],
            [Math.floor(game.config.width/2.5),Math.floor(game.config.height/3.2),0.8],
            [Math.floor(game.config.width/2.5),Math.floor(game.config.height/1.7),0.8],
            [Math.floor(game.config.width/3.4),Math.floor(game.config.height/1.5),0.8],
            [Math.floor(game.config.width/2.5),Math.floor(game.config.height/1.2),0.8],
            [Math.floor(game.config.width/3.5),Math.floor(game.config.height/1.12),0.8],
            [Math.floor(game.config.width/5),Math.floor(game.config.height/1.23),0.8],
            [Math.floor(game.config.width/9),Math.floor(game.config.height/4.2),0.8],
            [Math.floor(game.config.width/8.7),Math.floor(game.config.height/1.5),0.8]
        ];
        
        //===> Game time <=====//
        this.GameTimer();
        //====> Selecting Background <======//
        this.levelBackground = LevelManager.DecideLevelBackground();
        this.bg  = this.add.image(game.config.width/2,game.config.height/2,this.levelBackground).setOrigin(0.5,0.5).setScale(scaleFactorX,scaleFactorY);
        this.bg.setInteractive(); 
        this.bg.on("pointerdown", (pointer, x, y, event) => this.OnBackgroundClick());
        
        this.CreateTimer(); 
        //======> createing initial level <====//
        this.CreateLevel();
        // this.timer.paused = false;     
        this.BannerCreateAndHide("GAME_START",true);     
        // this.northPositionDecide(); 
        // this.ImageForCurrentLevel();
       
    };
    CreateTimer()
    {
        let timerImageBase1  = this.add.image(game.config.width/6,game.config.height/12,"base1").setOrigin(0.5,0.5).setScale(scaleFactorX*0.8,scaleFactorY*0.8);
        let timerImageBase2  = this.add.image(game.config.width/6,game.config.height/12,"base2").setOrigin(0.5,0.5).setScale(scaleFactorX*0.8,scaleFactorY*0.8);
        this.timerimg  = this.add.image(game.config.width/6,game.config.height/12,"base4").setOrigin(0.5,0.5).setScale(scaleFactorX*0.8,scaleFactorY*0.8);
        let timerImageBase3  = this.add.image(game.config.width/6,game.config.height/12,"base3").setOrigin(0.5,0.5).setScale(scaleFactorX*0.8,scaleFactorY*0.8);
        ////console.log("this.timerimg.height"+this.timerimg.height);
        //,  0 ,  0);
    }
    OnBackgroundClick()
    {
        this.totalNumberUserClicked += 1;
    };
    UpdateEachLevelTimer()
    {
        this.eachLevelTime += 100;
    };
    OnButtonClick(_this)
    {
        ////console.log("button clicked===================",_this);
        this.check.visible = true;
        this.check.x = _this.x- game.config.width/15;
        this.check.y = _this.y;
    };
    ObjectPositionDecide()
    {
        let startX = game.config.width/16;
        let intervalX = game.config.width/12.5;
        for (let i = 0; i < 12; i++) 
        {
            let angry1  = this.add.image(startX,game.config.height/2.5,"angry_1").setOrigin(0.5,0.5).setScale(scaleFactorX*1.1,scaleFactorY*1.1);
            angry1.depth = 2;
            startX += intervalX;
        }
    };

    update()
    {};
    CreateLevel()
    {
        this.eachLevelTimer.paused = false ;
        this.timerimg.setCrop(0,this.timerHeight,this.timerimg.width, this.timerimg.height);
        this.DisableWord();
        // LevelManager.DecidePlacementOfImages();        
        //=====> Images will be used in game <=====//
            this.ImageForCurrentLevel();
        //====> Image Rotation <====//
            this.MovementAndRotationOfImage();
        //====> Game image numer <==//
            // this.setGameImageNumber();
            // this.numberOfAnswers;
            // this.numberOfDestractor;
            // this.placementOfImages;
            this.currentLevel = LevelManager.GetCurrentLevelNumber();
        //=========> Display Level <=====//
            // this.DisplayLevel();
            setTimeout(() => {
                this.DisplayLevel();
            }, 500);
    };
    GameTimer()
    {
        let questionTimeData = LevelManager.DecideTimeOrNumberOfQuestion();
        if(questionTimeData[0] === null || questionTimeData[0] === "")
        {
            this.isTimerAvailable = false;
        }
        else
        {
            this.isTimerAvailable = true;
        } 
        // this.isTimerAvailable = false;
        this.totalTimeForGame = questionTimeData[0];
        this.timeForEachLevel = questionTimeData[1];
        this.totalNumberOfLevel = questionTimeData[2];
        // this.eachLevelTime = this.timeForEachLevel;
        this.eachGameTime  = this.totalTimeForGame;
        ////console.log(" this.timeForEachLevel "+ this.timeForEachLevel);
    };
    MovementAndRotationOfImage()
    {
        let movementAndRotationData = LevelManager.DecideMovementAndRotation();
        if(movementAndRotationData[0]==null)//movement not available
        {
            if(movementAndRotationData[2]==null)//rotation not available
            {
                this.isMovementAvailabe = false;
                this.isRotationAvailable = false;
            }
            else
            {
                this.isRotationAvailable = true;
                this.isMovementAvailabe = false;
            }
        }
        else
        {
            this.isRotationAvailable = true;
            this.isMovementAvailabe = true;
        }
        this.movementDirection = movementAndRotationData[0];
        this.movementTime = (movementAndRotationData[1]*1000);
        this.rotationType = movementAndRotationData[2];
        this.rotationTime = (movementAndRotationData[3]*1000);
    };
    ImageForCurrentLevel()
    {
        this.allLevelImage = LevelManager.SelectRandomGameImage();
        this.numberOfAnswers = LevelManager.numberOfTypeOfImage;
        this.numberOfDestractor = LevelManager.numberOfImage - LevelManager.numberOfTypeOfImage
       
        for (let i = 0; i < this.allLevelImage.length; i++) 
        {
            this.allLevelImage[i] = LoadAssets.getImageName(this.allLevelImage[i]);
        }
        ////console.log(" this.allLevelImage-----------",  this.allLevelImage); 
        console.log(" this.numberOfAnswers-----------"+  this.numberOfAnswers); 
        console.log("  this.numberOfDestractor -----------"+  this.numberOfDestractor); 
    };
    DisplayLevel(_this)
    {   
        let sceneRef = this;
        let answers = null;
        let destractor= null;
        let positionIndex = 0;
        this.totalQuestionPresented += 1;
        let objectPosition = [];
        this.SelectedEmotion = this.emotions[Math.floor(Math.random()*((this.emotions.length-1)-0)+0)];
        this.emotion1.text = this.SelectedEmotion;
        switch(LevelManager.answerLocation)
        {
            case "N":  objectPosition = [...this.northPosition];
                        this.northWord.visible = true;
                        this.emotion1.x = this.northWord.x;
                        this.emotion1.y = this.northWord.y;
                        break; 
            case "NE": objectPosition = [...this.northEastPosition];
                        this.northEast.visible = true;
                        this.emotion1.x = this.northEast.x;
                        this.emotion1.y = this.northEast.y;
                        break; 
            case "NW": objectPosition = [...this.northWestPosition];
                        this.northWest.visible = true;
                        this.emotion1.x = this.northWest.x;
                        this.emotion1.y = this.northWest.y;
                        break; 
            case "S":   objectPosition = [...this.southPosition];
                        this.southWord.visible = true;
                        this.emotion1.x = this.southWord.x;
                        this.emotion1.y = this.southWord.y;
                        break; 
            case "SE": objectPosition = [...this.southEastPosition];
                        this.southEast.visible = true;
                        this.emotion1.x = this.southEast.x;
                        this.emotion1.y = this.southEast.y;
                        break; 
            case "SW": objectPosition = [...this.southWestPosition];
                        this.southWest.visible = true;
                        this.emotion1.x = this.southWest.x;
                        this.emotion1.y = this.southWest.y;
                        break; 
            case "E":  objectPosition = [...this.eastPosition];
                        this.east.visible = true;
                        this.emotion1.x = this.east.x;
                        this.emotion1.y = this.east.y;
                        break; 
            case "W":  objectPosition = [...this.westPosition];
                        this.west.visible = true;
                        this.emotion1.x = this.west.x;
                        this.emotion1.y = this.west.y;
                        break; 
        }
        objectPosition = LoadAssets.shuffle(objectPosition);
        // let postFxPlugin = this.plugins.get('rexgrayscalepipelineplugin');
        const answerArr  = this.allLevelImage.filter((_data)=>{ return _data.includes(this.SelectedEmotion.toLocaleLowerCase());});
        const destractorArr = this.allLevelImage.filter((_data)=>{ return !_data.includes(this.SelectedEmotion.toLocaleLowerCase());});
        ////console.log(answerArr);
        ////console.log(destractorArr);
        for (let i = 0; i < this.numberOfAnswers; i++) 
        { 
            const currentAnswerEmotion = answerArr[Math.floor(Math.random()*((answerArr.length-1)-0)+0)];
            answers = this.add.sprite(objectPosition[positionIndex][0], objectPosition[positionIndex][1],  currentAnswerEmotion).setOrigin(0.5,0.5).setScale(scaleFactorX *  objectPosition[positionIndex][2],scaleFactorY *  objectPosition[positionIndex][2]);
            answers.key = "answers"; 
            answers.prevX =  objectPosition[positionIndex][0];
            answers.prevY =  objectPosition[positionIndex][1];
            answers.depth = 3;
            answers.setInteractive(); 
            answers.on("pointerup",sceneRef.onObjectClicked);            
            // answers.on("pointerup", (pointer, x, y, event) => sceneRef.onObjectClicked(answers));            
            this.answers.push(answers);
            positionIndex += 1;
            answers = null;
        }
        for (let i = 0; i < this.numberOfDestractor; i++) 
        {   
            const currentDestractorEmotion = destractorArr[Math.floor(Math.random()*((destractorArr.length-1)-0)+0)];
            destractor = this.add.sprite( objectPosition[positionIndex][0], objectPosition[positionIndex][1],  currentDestractorEmotion).setOrigin(0.5,0.5).setScale(scaleFactorX *  objectPosition[positionIndex][2],scaleFactorY *  objectPosition[positionIndex][2]);
            destractor.key = "destractor";
            destractor.prevX =  objectPosition[positionIndex][0];
            destractor.prevY =  objectPosition[positionIndex][1];
            destractor.depth = 3;    
            destractor.setInteractive();
            // destractor.on("pointerup", (pointer, x, y, event) => sceneRef.onObjectClicked(destractor)); 
            destractor.on("pointerup",sceneRef.onObjectClicked);           
            this.destractor.push(destractor);
            positionIndex += 1;
        }      
        if(this.isRotationAvailable)
        {
            this.RotateImages(this.rotationType);
        }
        if(this.isMovementAvailabe)
        {
            this.SetMovementType(LevelManager.movementDirection,LevelManager.movementType);
        } 
        this.timer.paused = false;
    };
    DisableWord()
    {
        this.northWord.visible = false;
        this.southWord.visible = false;
        this.northEast.visible = false;
        this.northWest.visible = false;
        this.southWest.visible = false;
        this.southEast.visible = false;
        this.west.visible = false;
        this.east.visible = false;
    };
    onObjectClicked()
    {       
        // ////console.log(" this.totalNumberOfLevel "+this.totalNumberOfLevel);
        this.scene.totalNumberUserClicked += 1;
        // this.totalNumberUserAnswered += 1;
        let ref =  this.scene;
        if( this.key=="answers" )
        {
            this.disableInteractive();
            this.visible = false;
            this.destroy();
            // ////console.log("_this.key ",this);
            ref.numberOfAnswerClick += 1;
            if(ref.numberOfAnswerClick ==  ref.numberOfAnswers)
            {
                ref.totalCorrectAnswer  += 1;
                ref.consecutiveWins += 1;
                ref.consecutiveLoose = 0;
                ref.totalGamePlayed += 1 ;
                ref.consecutiveComboWins += 1;
                if( ref.consecutiveComboWins >  ref.comboWins)
                {
                    ref.comboWins = ref.consecutiveComboWins;
                }
                if((ref.consecutiveWins != LevelManager.offsetForLevelUp) && ( ref.totalGamePlayed != ref.totalNumberOfLevel))
                {
                    ref.BannerCreateAndHide("EXCELLENT",true);
                    SoundManager.CorrectAnswerSoundPlay();//Playing when answer is correct
                }
                ref.LevelWin(ref.totalCorrectAnswer);
                ref.ChangeLevel(true);
            }
        }
        else if(this.key=="destractor")
        {
            ref.totalGamePlayed += 1 ;
            ref.consecutiveComboWins = 0;
            ref.totalInCorrectAnswer  += 1;
            ref.consecutiveWins = 0;
            ref.consecutiveLoose += 1;
            SoundManager.InCorrectAnswerSoundPlay();//Playing when answer is incorrect
            ref.LevelLoose(ref.totalInCorrectAnswer);
            ref.ChangeLevel(true);
        }
      
    }
    //=========>Level Complete<=================//
    ChangeLevel(_bool)
    {
        let levelOrTimeComplete = true;      
        if(this.isTimerAvailable)
        {
            if( this.timer.paused)
            {
                levelOrTimeComplete = false;
                this.ClearLevel();
                SoundManager.EndSoundPlay();//playing game end sound
                this.BannerCreateAndHide("TIMES_UP",false);
                this.CalculateResponse();
            }
        }   
        else
        {
            if(( this.totalGamePlayed == this.totalNumberOfLevel))
            {
                levelOrTimeComplete = false;
                this.ClearLevel();
                SoundManager.EndSoundPlay();//playing game end sound
                this.BannerCreateAndHide("GAME_OVER",false);
                this.CalculateResponse();
                this.timer.paused = true; 
            }
            else
            {
                if(!_bool)
                {
                    this.totalGamePlayed += 1 ;
                    this.consecutiveComboWins = 0;
                    this.totalInCorrectAnswer  += 1;
                    this.consecutiveWins = 0;
                    this.consecutiveLoose += 1;
                    // levelOrTimeComplete = false;
                    // this.ClearLevel();                   
                    // this.currentLevel  = LevelManager.GetCurrentLevelNumber();
                    this.LevelLoose( this.totalInCorrectAnswer);
                    // this.CreateLevel();
                }
                // this.timer.paused = false; 
            }
        }         
        if(levelOrTimeComplete)
        {
            // ////console.log("levelOrTimeComplete----------------------------");
            this.ClearLevel();
            if(this.consecutiveWins == LevelManager.offsetForLevelUp)
            {
                ////console.log("level up----------------------------");
                this.consecutiveWins = 0;
                this.BannerCreateAndHide("LEVEL_UP",true);
                SoundManager.LevelUpSoundPlay();
                LevelManager.IncreaseLevel(LevelManager);
            }
            else if(this.consecutiveLoose == LevelManager.offsetForLevelDown)
            {
                // ////console.log("level Down----------------------------");
                if( this.currentLevel > 1)
                {
                    LevelManager.DecreaseLevel(LevelManager);
                }
                else
                {
                    this.consecutiveLoose = 0;
                }
            }  
            this.currentLevel  = LevelManager.GetCurrentLevelNumber();
            this.CreateLevel();
        }
    };
    ClearLevel()
    {
        ////console.log("clear level-------------");
        this.eachLevelTimer.paused = true ;
        this.totalEachLevelTime.push(this.eachLevelTime);
        this.answers = [];
        this.destractor = [];
        this.objectAngle = 15;
        this.rotationAngle = 0;
        // this.rotateTimer.paused = true;
        this.numberOfAnswers  = 0;
        this.eachLevelTime  = 0;
        this.numberOfAnswerClick = 0;
        this.numberOfDestractor = [];
        this.movementContinuousIntervalBool = false;
        this.movementIntervalInterval = false;
        this.movementTime = 0;
        if(! this.isTimerAvailable)
        {
            this.timerHeight = 1;
        }
        let arrLength =  this.scene.scene.children.list.length;
        for (let i = 0; i < arrLength; i++) 
        {
            if( this.scene.scene.children.list[i].key=="answers" || 
                this.scene.scene.children.list[i].key=="destractor")
            {
                this.scene.scene.children.list[i].destroy();
                arrLength =  this.scene.scene.children.list.length;
                i = 0;
            }  
        }
        if(this.intervalTimer)
        {
            this.intervalTimer.remove();
        }
    };
    LevelWin(_number)
    {
        this.thumbsUpText.setText(_number);
    };
    LevelLoose(_number)
    {
        this.thumbsDownText.setText(_number);
    };
    UpdateTimer()
    {      
        ////console.log("timer function---------"+this.isTimerAvailable);  
        // this.graphics.clear();
        let offSet ;
        // this.eachLevelTime += 1;
        if(this.isTimerAvailable)
        {
            this.timerHeight += (this.timerimg.height/this.totalTimeForGame);
            ////console.log("this.timerHeight "+this.timerHeight);
        }
        else
        {
            this.timerHeight += (this.timerimg.height/this.timeForEachLevel);
            ////console.log("this.timerHeight "+this.timerHeight);
        } 
     
        // ////console.log("this.timerimg.height "+this.timerimg.height);
        if(this.timerHeight >= this.timerimg.height)
        {
            this.timer.paused = true;
            this.timerimg.setCrop(0,this.timerHeight,this.timerimg.width, this.timerimg.height);
            SoundManager.InCorrectAnswerSoundPlay();//playing unanswered as incorrect
            this.ChangeLevel(false);
        }
        else
        {
            if(this.isTimerAvailable)
            {
                ////console.log("this.timerHeight "+this.timerHeight);
                this.timerimg.setCrop(0,this.timerHeight,this.timerimg.width, this.timerimg.height);
            }
            else
            {
                ////console.log("this.timerHeight "+this.timerHeight);
                this.timerimg.setCrop(0,this.timerHeight,this.timerimg.width, this.timerimg.height);
            }
        }
    }; 
    //===========> Rotation<=====================//
    RotateImages(rotation)
    {
        // this.rotateTimer.paused = false;        
        if(rotation == "counter_clockwise")
        {
            this.rotationAngle = -360;//-= (360/parseInt(LevelManager.rotationTime));//5;
        }
        if(rotation == "clockwise")
        {
            this.rotationAngle  = 360;//+= (360/parseInt(LevelManager.rotationTime));//5;
        }    
        this.UpdateRotateTimer(this.rotationType);  
    };
    UpdateRotateTimer()
    {
        let  iterator;
        ////console.log("this.rotationTime",this.rotationTime);
        for ( iterator of  this.answers) 
        {
            // iterator.angle += this.rotationAngle;
            this.tweens.add({
                targets: iterator,
                angle:  this.rotationAngle,
                ease: 'Linear',
                duration: this.rotationTime,
                callbackScope: this,
                loop:-1
            });
        }
        for ( iterator of  this.destractor) 
        {
            // iterator.angle += this.rotationAngle;
            this.tweens.add({
                targets: iterator,
                angle:  this.rotationAngle,
                ease: 'Linear',
                duration: this.rotationTime,
                callbackScope: this,
                loop:-1
            });
        }      
    };
    //============> Movement <===================//
    SetMovementType(directionType,movementType)
    {
        switch(parseInt(movementType))
        {
            case 0:  
                    this.movementType = "continuous";
                    this.answers.forEach(element => {                
                        this.SetDirectionType(directionType,  element);
                    });
                    this.destractor.forEach(element => {                
                        this.SetDirectionType(directionType,  element);
                    });
                    break;
            case 1: 
                    this.movementType = "intervals";
                    this.SetIntervalOffset(directionType);
                    // this.SetDirectionType(directionType,  this.answers[0],false);
                    this.answers.forEach(element => {                
                        this.SetDirectionType(directionType,  element);
                    });
                    this.destractor.forEach(element => {                
                        this.SetDirectionType(directionType,  element);
                    });
                    break;
            case 2: 
                    this.movementType = "continuous-continuous";
                    this.answers.forEach(element => {                
                        this.SetDirectionType(directionType,  element);
                    });
                    this.destractor.forEach(element => {                
                        this.SetDirectionType(directionType,  element);
                    });
                    break;
            case 3: 
                    this.movementType = "continuous-interval";
                    this.answers.forEach(element => {                
                        this.SetDirectionType(directionType,  element);
                    });
                    this.destractor.forEach(element => {                
                        this.SetDirectionType(directionType,  element);
                    });
                    break;
            case 4:
                    this.movementType = "intervals-continuous";
                    this.answers.forEach(element => {                
                        this.SetDirectionType(directionType,  element);
                    });
                    this.destractor.forEach(element => {                
                        this.SetDirectionType(directionType,  element);
                    });
                    break;
            case 5:
                    this.movementType = "intervals-intervals";
                    this.answers.forEach(element => {                
                        this.SetDirectionType(directionType,  element);
                    });
                    this.destractor.forEach(element => {                
                        this.SetDirectionType(directionType,  element);
                    });
                    break;
        }
       
    };
    StartMovement(_obj,continousStartX, continousStartY,
        continousEndX, continousEndY,_direction)
    {
        
        switch(this.movementType)
        {
            case "continuous":
                                this.MovementContineous(_obj,continousStartX, continousStartY,
                                continousEndX, continousEndY);
                                break;
            case "intervals": 
                                this.MovementInterval(_obj,_direction);
                                    break;
            case "continuous-continuous":    
                                        this.MovementContineousContineous(_obj,continousStartX, continousStartY,
                                        continousEndX, continousEndY);
                                        break;
            case "continuous-interval":
                                        this.MovementContineousInterval(_obj,continousStartX, continousStartY,
                                        continousEndX, continousEndY,_direction); 
                                        break;
            case "intervals-continuous":    
                                        this.MovementIntervalContineous(_direction,_obj,continousStartX, continousStartY,
                                            continousEndX, continousEndY);
                                        // this.MovementIntervalContineous(_direction,this.destractor,continousStartX, continousStartY,
                                        //     continousEndX, continousEndY);
                                            
                                        break;
            case "intervals-intervals":
                                        this.MovementIntervalInterval(_obj,_direction);
                                        break;
        }
    };
    SetDirectionType(_direction,_obj,_bool = true)
    {
        let continousStartX= 10;
        let continousStartY;
        let continousEndX;
        let continousEndY;
        let m ;
        if(_bool)
        {
            switch(_direction)
            {
                case "RTL":    
                            this.movementTime = ((10000/(game.config.width+_obj.x))*(_obj.x));
                            _obj.continousStartX = (game.config.width+(_obj.x/6));//50);
                            _obj.continousStartY = _obj.y;
                            _obj.continousEndX = -parseInt((game.config.width-_obj.x)/6);//50;
                            _obj.continousEndY = _obj.y; 
                            this.movementIntervalX = ((game.config.width)/ 10);
                            this.movementIntervalY = 0;     
                            break;
                case "LTR": 
                            this.movementTime = ((10000/(game.config.width+200))*((game.config.width+200) - _obj.x));
                            _obj.continousEndX = (game.config.width+(_obj.x/6));//(game.config.width+_obj.width);
                            _obj.continousStartX = -parseInt(game.config.width/2-(_obj.x/6));
                             _obj.continousStartY = _obj.y;
                             _obj.continousEndY = _obj.y;
                             this.movementIntervalX = ((game.config.width)/ 10);
                             this.movementIntervalY = 0;  
                            
                            break;
                case "TTB": 
                            this.movementTime = ((10000/(game.config.height+200))*((game.config.height+200) - _obj.y));
                            _obj.continousStartX = _obj.x;
                            _obj.continousStartY = -_obj.height;//-200;
                            _obj.continousEndX = _obj.x;
                            _obj.continousEndY = (game.config.height+_obj.height);//200);
                            this.movementIntervalX = 0;
                            this.movementIntervalY = ((game.config.height)/ 10);
                            break;
                case "BTT":  
                            this.movementTime = ((10000/(game.config.height+200))*( _obj.y));
                            _obj.continousStartX = _obj.x;
                            _obj.continousStartY = (game.config.height+_obj.height);//(game.config.height+200);
                            _obj.continousEndX = _obj.x;
                            _obj.continousEndY =  -_obj.height;//-200;
                            this.movementIntervalX = 0;
                            this.movementIntervalY = -((game.config.height)/ 10);
                            break;
                case "BRDTL": 
                            this.movementTime = ((10000/(game.config.height+200))*( _obj.y));
                            this.movementIntervalX = ((game.config.width)/ 10);
                            this.movementIntervalY = ((game.config.height)/ 10);
                            this.answers.forEach(element => {
                                 let objX,objY;
                                objX = element.x;
                                objY = element.y;
                                while((objX > -(game.config.width/1.9-element.x))&&(objY > -(game.config.height/1.9-element.y)))
                                {
                                    objX  -=  this.movementIntervalX;
                                    objY -= this.movementIntervalY;
                                }
                                element.continousEndX = objX;
                               element.continousEndY = objY;
                                objX = element.x;
                                objY = element.y;
                                while((objX < (game.config.width/1.6+element.x))&&(objY < (game.config.height/1.6+element.y)))
                                {
                                    objX  +=  this.movementIntervalX;
                                    objY  += this.movementIntervalY;
                                }
                                element.continousStartX = objX;
                                element.continousStartY = objY;
                            });
                            this.destractor.forEach(element => {
                                let objX,objY;
                               objX = element.x;
                               objY = element.y;
                               while((objX > -(game.config.width/1.9-element.x))&&(objY > -(game.config.height/1.9-element.y)))
                               {
                                   objX  -=  this.movementIntervalX;
                                   objY -= this.movementIntervalY;
                               }
                               element.continousEndX = objX;
                               element.continousEndY = objY;
                               objX = element.x;
                               objY = element.y;
                               while((objX < (game.config.width/1.6+element.x))&&(objY < (game.config.height/1.6+element.y)))
                               {
                                   objX  +=  this.movementIntervalX;
                                   objY  += this.movementIntervalY;
                               }
                               element.continousStartX = objX;
                                element.continousStartY = objY;
                           });
                            break;
                case "BLDTR":
                    this.movementTime = ((10000/(game.config.height+200))*( _obj.y));                        
                            this.movementIntervalX = ((game.config.width)/ 10);
                            this.movementIntervalY = ((game.config.height)/ 10);

                            this.answers.forEach(element => {
                                let objX,objY;
                               objX = element.x;
                               objY = element.y;
                               while((objX < (game.config.width+element.x))&&(objY > -(game.config.height + element.y)))
                               {
                                   objX  +=  this.movementIntervalX;
                                   objY  -= this.movementIntervalY;
                               }
                               element.continousEndX = objX;
                               element.continousEndY = objY;
                               objX = element.x;
                               objY = element.y;
                               while((objX > -(game.config.width/2+element.x))&&(objY < (game.config.height/2+element.y)))
                               {
                                   objX  -=  this.movementIntervalX;
                                   objY  += this.movementIntervalY;
                               }                              
                               element.continousStartX = objX;
                               element.continousStartY = objY;
                           });
                           this.destractor.forEach(element => {
                              let objX,objY;
                              objX = element.x;
                              objY = element.y;
                              while((objX < (game.config.width+element.x))&&(objY > -(game.config.height + element.y)))
                              {
                                  objX  +=  this.movementIntervalX;
                                  objY  -= this.movementIntervalY;
                              }
                              element.continousEndX = objX;
                              element.continousEndY = objY;
                              objX = element.x;
                              objY = element.y;
                              while((objX > -(game.config.width/2+element.x))&&(objY < (game.config.height/2+element.y)))
                              {
                                  objX  -=  this.movementIntervalX;
                                  objY  += this.movementIntervalY;
                              }                              
                              element.continousStartX = objX;
                              element.continousStartY = objY;
                          });
                          break;
                case "TLDBR": 
                            this.movementTime = ((10000/(game.config.height+200))*( _obj.y));                        
                            this.movementIntervalX = ((game.config.width)/ 10);
                            this.movementIntervalY = ((game.config.height)/ 10);

                            this.answers.forEach(element => {
                                let objX,objY;
                               objX = element.x;
                               objY = element.y;
                               while((objX < (game.config.width+(element.x)))&&(objY < (game.config.height + (element.y))))
                               {
                                   objX  +=  this.movementIntervalX;
                                   objY  += this.movementIntervalY;
                               }
                               element.continousEndX = objX;
                               element.continousEndY = objY;
                               objX = element.x;
                               objY = element.y;
                               while((objX > -(game.config.width/2 - (element.x)))&&(objY > -(game.config.height/2 -(element.y))))
                               {
                                   objX  -=  this.movementIntervalX;
                                   objY  -= this.movementIntervalY;
                               }                              
                               element.continousStartX = objX;
                               element.continousStartY = objY;
                           });
                           this.destractor.forEach(element => {
                              let objX,objY;
                              objX = element.x;
                              objY = element.y;
                              while((objX < (game.config.width+(element.x)))&&(objY < (game.config.height + (element.y))))
                              {
                                  objX  +=  this.movementIntervalX;
                                  objY  += this.movementIntervalY;
                              }
                              element.continousEndX = objX;
                              element.continousEndY = objY;
                              objX = element.x;
                              objY = element.y;
                              while((objX > -(game.config.width/2 - (element.x)))&&(objY > -(game.config.height/2 -(element.y))))
                              {
                                  objX  -=  this.movementIntervalX;
                                  objY  -= this.movementIntervalY;
                              }                              
                              element.continousStartX = objX;
                              element.continousStartY = objY;
                          });
                          break;
                case "TRDBL":   
                            this.movementTime = ((10000/(game.config.height+200))*( _obj.y));                        
                            this.movementIntervalX = ((game.config.width)/ 10);
                            this.movementIntervalY = ((game.config.height)/ 10);
                        this.answers.forEach(element => {
                            let objX,objY;
                            objX = element.x;
                            objY = element.y;
                            while((objX > -((game.config.width/2+element.x)))&&
                            (objY < (game.config.height/2 +(element.y))))
                            {
                                objX  -=  this.movementIntervalX;
                                objY  += this.movementIntervalY;
                            } 
                            
                            element.continousEndX = objX;
                            element.continousEndY = objY;
                            objX = element.x;
                            objY = element.y;
                            while((objX < (game.config.width/2+(element.x)))&&(objY > -(game.config.height/2 +(element.y))))
                            {
                                objX  +=  this.movementIntervalX;
                                objY  -= this.movementIntervalY;
                            }                       
                            element.continousStartX = objX;
                            element.continousStartY = objY;
                        });
                        this.destractor.forEach(element => {
                            let objX,objY;
                            objX = element.x;
                            objY = element.y;
                            while((objX > -((game.config.width/2+element.x)))&&
                            (objY < (game.config.height/2 +(element.y))))
                            {
                                objX  -=  this.movementIntervalX;
                                objY  += this.movementIntervalY;
                            } 
                            
                            element.continousEndX = objX;
                            element.continousEndY = objY;
                            objX = element.x;
                            objY = element.y;
                            while((objX < (game.config.width/2+(element.x)))&&(objY > -(game.config.height/2 +(element.y))))
                            {
                                objX  +=  this.movementIntervalX;
                                objY  -= this.movementIntervalY;
                            }                       
                            element.continousStartX = objX;
                            element.continousStartY = objY;
                        });
                        break;
            }
        }
        this.StartMovement(_obj,continousStartX, continousStartY,
                continousEndX, continousEndY,_direction);
    }; 
    TimeForContineous(_obj,_startX,_startY,_endX,_endY)
    {
        let distance = null,distance2 = null;
        if(LevelManager.movementDirection=="RTL"||LevelManager.movementDirection=="LTR")
        {
            this.movementTime = parseInt(((LevelManager.movementTime*1000)/Math.abs(_obj.continousEndX - _obj.continousStartX))*Math.abs(_startX - _endX));
        }
        else if(LevelManager.movementDirection=="BTT"||LevelManager.movementDirection=="TTB")
        {
            this.movementTime = parseInt(((LevelManager.movementTime*1000)/Math.abs(_obj.continousEndY - _obj.continousStartY))*Math.abs(_startY - _endY));
        }
        else
        {
            distance =  parseInt(Math.sqrt(Math.pow((_obj.continousEndX - _obj.continousStartX),2)+Math.pow((_obj.continousEndY - _obj.continousStartY),2)));
            distance2 =  parseInt(Math.sqrt(Math.pow((_startX - _endX),2)+Math.pow((_startY - _endY),2)));
            console.log("distance "+distance);
            console.log("distance2 "+distance2);
            this.movementTime = parseInt(((LevelManager.movementTime*1000)/Math.abs(distance))*Math.abs(distance2));
        }
        return this.movementTime;
    };
    TimeForInterval(_obj)
    {
        let distance =  parseInt(Math.sqrt(Math.pow((_obj.continousEndX - _obj.continousStartX),2)+Math.pow((_obj.continousEndY - _obj.continousStartY),2)));
   
        if(LevelManager.movementDirection=="RTL"||LevelManager.movementDirection=="LTR")
        {
            this.movementTime =   (distance/this.movementIntervalX);
        }
        else if(LevelManager.movementDirection=="BTT"||LevelManager.movementDirection=="TTB")
        {
            this.movementTime =   (distance/this.movementIntervalY);
        }
        else
        {
            this.movementTime =   (distance/this.movementIntervalY)
        }
        this.movementTime = parseInt((LevelManager.movementTime*1000)/ this.movementTime);
        return this.movementTime;
    };
    MovementContineous(_obj,_startX,_startY,_endX,_endY)
    {
        this.movementTime = this.TimeForContineous(_obj, _obj.x, _obj.y,_obj.continousEndX,_obj.continousEndY);
        this.tweens.add({
            targets: _obj,
            x:  _obj.continousEndX,
            y:  _obj.continousEndY,
            ease: 'Linear',
            duration:  this.movementTime,
            callbackScope: this,
            onComplete: function()
            {
                if( this.isMovementContinuous)
                {
                    _obj.setPosition( _obj.continousStartX,  _obj.continousStartY);
                    this.tweens.add({
                        targets: _obj,
                        x:  _obj.continousEndX,
                        y:  _obj.continousEndY,
                        ease: 'Linear',
                        duration: (LevelManager.movementTime*1000),
                        repeat: -1
                    });
                }                        
            }
        });
    };
    MovementContineousContineous(_obj,_startX,_startY,_endX,_endY)
    {
        this.movementTime = this.TimeForContineous(_obj, _obj.x, _obj.y,_obj.continousEndX,_obj.continousEndY);
        // console.log("this.movementTime "+this.movementTime);
        this.tweens.add({
            targets: _obj,
            x:  _obj.continousEndX,
            y:  _obj.continousEndY,
            ease: 'Linear',
            duration: this.movementTime,
            callbackScope: this,
            onComplete: function(){
                if( this.isMovementContinuous)
                {
                    _obj.setPosition( _obj.continousStartX,  _obj.continousStartY);
                    this.movementTime = this.TimeForContineous(_obj,_obj.continousStartX,  _obj.continousStartY,_obj.continousEndX,_obj.continousEndY);
                    // console.log("this.movementTime "+this.movementTime);
                    this.tweens.add({
                        targets: _obj,
                        x:  _obj.continousEndX,
                        y:  _obj.continousEndY,
                        ease: 'Linear',
                        duration: (LevelManager.movementTime*1000),
                        // yoyo: true,
                        repeat: -1
                    });
                }                        
            }
        });
    };
    MovementContineousInterval(_obj,_startX,_startY,_endX,_endY,_dir)
    {
        _obj.bool = false;
        let _delay;
        if(!this.movementContinuousIntervalBool)
        {
            this.movementTime = this.TimeForInterval(_obj);
            this.intervalTimer = this.time.addEvent({ delay:  this.movementTime, callback: ()=>{
                // ////console.log("------------");
                if( this.movementContinuousIntervalArr.length > 0)
                {                   
                    this.movementContinuousIntervalArr.forEach(element => {
                        switch(_dir)
                        {
                            case "RTL": 
                                        if(element.x > -(game.config.width-element.prevX) )
                                        { 
                                            element.x -= this.movementIntervalX;
                                        }
                                        else
                                        {
                                            element.setPosition((game.config.width+(element.prevX)),element.y);
                                        }
                                        break;
                            case "LTR":              
                                        if(element.x < (game.config.width+(element.prevX)) )
                                        { 
                                            element.x += this.movementIntervalX;
                                        }
                                        else
                                        {
                                            element.setPosition(-(game.config.width-element.prevX),element.y);
                                        }                   
                                        break;
                            case "TTB": 
                                        if(element.y < element.continousEndY )
                                        { 
                                            element.y += this.movementIntervalY;                           
                                        }
                                        else
                                        {
                                            element.setPosition(element.x,(element.continousStartY));
                                        }
                                        break;
                            case "BTT": 
                                        if(element.y > element.continousEndY)
                                        {                         
                                            element.y += this.movementIntervalY;                        
                                        }
                                        else
                                        {         
                                            element.setPosition(element.x,(element.continousStartY));
                                        }
                                        break;
                            
                            case "BRDTL":     
                                        if(element.x >element.continousEndX)
                                        { 
                                            if(element.y > element.continousEndY)
                                            {
                                                element.x -= this.movementIntervalX;
                                                element.y -= this.movementIntervalY;                    
                                            }
                                            else
                                            {
                                                element.setPosition(element.continousStartX,element.continousStartY);
                                            }                        
                                        }
                                        else
                                        {
                                            element.setPosition(element.continousStartX,element.continousStartY);
                                        }
                                    break;
                            case "BLDTR":
                                        if(element.x < element.continousEndX )
                                        { 
                                            if(element.y > element.continousEndY)
                                            {
                                                element.x += this.movementIntervalX;
                                                element.y -= this.movementIntervalY;                    
                                            }
                                            else
                                            {
                                                element.setPosition(element.continousStartX,element.continousStartY);
                                            }                           
                                        }
                                        else
                                        {   
                                            element.setPosition(element.continousStartX,element.continousStartY);
                                        }
                                    break; 
                            case "TLDBR": 
                                        if(element.x < element.continousEndX )
                                        { 
                                            if(element.y < element.continousEndY)
                                            {
                                                element.x += this.movementIntervalX;
                                                element.y += this.movementIntervalY;                    
                                            }
                                            else
                                            {
                                                element.setPosition(element.continousStartX,element.continousStartY);
                                            }                           
                                        }
                                        else
                                        {   
                                            element.setPosition(element.continousStartX,element.continousStartY);
                                        }
                                        break;
                            case "TRDBL": 
                                        if(element.x > element.continousEndX )
                                        { 
                                            if(element.y < element.continousEndY)
                                            {
                                                element.x -= this.movementIntervalX;
                                                element.y += this.movementIntervalY;                    
                                            }
                                            else
                                            {
                                                element.setPosition(element.continousStartX,element.continousStartY);
                                            }                           
                                        }
                                        else
                                        {   
                                            element.setPosition(element.continousStartX,element.continousStartY);
                                        }
                            break;
                        }                        
                    });
                }
            }, callbackScope: this, loop:true});  
        }
        this.movementTime = this.TimeForContineous(_obj, _obj.x, _obj.y,_obj.continousEndX,_obj.continousEndY);
        this.tweens.add({
            targets: _obj,
            x:  _obj.continousEndX,
            y:  _obj.continousEndY,
            ease: 'Linear',
            duration: this.movementTime,
            callbackScope: this,
            onComplete: function()
            {
                this.movementContinuousIntervalArr.push(_obj);             
            }
        });
        this.movementContinuousIntervalBool = true;
    };
    MovementIntervalContineous(_dir,_obj,continousStartX, continousStartY,
        continousEndX, continousEndY)
    {
        let posX = 10,posY = 10;
        let m;
        // let _obj = [..._arr];
        let counter = _obj.length;
        let counter1 = [];
     
        this.movementTime = this.TimeForInterval(_obj);
        let intervalTimer = this.time.addEvent({ delay:  500 , callback: ()=>{
            switch(_dir)
            {
                case "RTL": 
                            if(_obj.x > -(game.config.width-_obj.prevX) )
                            { 
                                _obj.x -= this.movementIntervalX;
                            }
                            else
                            {
                                _obj.setPosition((game.config.width+(_obj.prevX)),_obj.y);
                                this.MovementIntervalContineousTween(_obj, -(game.config.width-_obj.prevX), _obj.y);
                            }
                            break;
                case "LTR":              
                            if(_obj.x < (game.config.width+(_obj.prevX)) )
                            { 
                                _obj.x += this.movementIntervalX;
                            }
                            else
                            {
                                _obj.setPosition(-(game.config.width-_obj.prevX),_obj.y);
                                this.MovementIntervalContineousTween(_obj, (game.config.width+(_obj.prevX)), _obj.y);
                            }                   
                            break;
                case "TTB": 
                            if(_obj.y < _obj.continousEndY )
                            { 
                                _obj.y += this.movementIntervalY;                           
                            }
                            else
                            {
                                _obj.setPosition(_obj.x,(_obj.continousStartY));
                                this.MovementIntervalContineousTween(_obj,_obj.x,(_obj.continousEndY));
                            }
                            break;
                case "BTT": 
                            if(_obj.y > _obj.continousEndY)
                            {                         
                                _obj.y += this.movementIntervalY;                        
                            }
                            else
                            {         
                                _obj.setPosition(_obj.x,(_obj.continousStartY));
                                this.MovementIntervalContineousTween(_obj,_obj.x,(_obj.continousEndY));                   
                            }
                            break;
                
                case "BRDTL":     
                            if(_obj.x >_obj.continousEndX)
                            { 
                                if(_obj.y > _obj.continousEndY)
                                {
                                    _obj.x -= this.movementIntervalX;
                                    _obj.y -= this.movementIntervalY;                    
                                }
                                else
                                {
                                    _obj.setPosition(_obj.continousStartX,_obj.continousStartY);
                                    this.MovementIntervalContineousTween(_obj,_obj.continousEndX,_obj.continousEndY);
                                }                        
                            }
                            else
                            {
                                _obj.setPosition(_obj.continousStartX,_obj.continousStartY);
                                this.MovementIntervalContineousTween(_obj,_obj.continousEndX,_obj.continousEndY);
                            }
                        break;
                case "BLDTR":
                            if(_obj.x < _obj.continousEndX )
                            { 
                                if(_obj.y > _obj.continousEndY)
                                {
                                    _obj.x += this.movementIntervalX;
                                    _obj.y -= this.movementIntervalY;                    
                                }
                                else
                                {
                                    _obj.setPosition(_obj.continousStartX,_obj.continousStartY);
                                    this.MovementIntervalContineousTween(_obj,_obj.continousEndX,_obj.continousEndY);
                                }                           
                            }
                            else
                            {   
                                _obj.setPosition(_obj.continousStartX,_obj.continousStartY);
                                this.MovementIntervalContineousTween(_obj,_obj.continousEndX,_obj.continousEndY);
                            }
                        break; 
                case "TLDBR": 
                            if(_obj.x < _obj.continousEndX )
                            { 
                                if(_obj.y < _obj.continousEndY)
                                {
                                    _obj.x += this.movementIntervalX;
                                    _obj.y += this.movementIntervalY;                    
                                }
                                else
                                {
                                    _obj.setPosition(_obj.continousStartX,_obj.continousStartY);
                                    this.MovementIntervalContineousTween(_obj,_obj.continousEndX,_obj.continousEndY);
                                }                           
                            }
                            else
                            {   
                                _obj.setPosition(_obj.continousStartX,_obj.continousStartY);
                                this.MovementIntervalContineousTween(_obj,_obj.continousEndX,_obj.continousEndY);
                                counter -=1;
                            }
                            break;
                case "TRDBL": 
                            if(_obj.x > _obj.continousEndX )
                            { 
                                if(_obj.y < _obj.continousEndY)
                                {
                                    _obj.x -= this.movementIntervalX;
                                    _obj.y += this.movementIntervalY;                    
                                }
                                else
                                {
                                    _obj.setPosition(_obj.continousStartX,_obj.continousStartY);
                                    this.MovementIntervalContineousTween(_obj,_obj.continousEndX,_obj.continousEndY);
                                    counter -=1;
                                }                           
                            }
                            else
                            {   
                                _obj.setPosition(_obj.continousStartX,_obj.continousStartY);
                                this.MovementIntervalContineousTween(_obj,_obj.continousEndX,_obj.continousEndY);
                                counter -=1;
                            }
                break;
            }  
            if(counter == 0)
            {               
                intervalTimer.remove();
            }
        }, callbackScope: this, loop:true});   
    };
    MovementIntervalContineousTween(_obj,_x,_y)
    {
        this.tweens.add({
            targets: _obj,
            x:  _x,
            y:  _y,
            ease: 'Linear',
            duration:   (LevelManager.movementTime*1000),
            callbackScope: this,
            repeat: -1});
    }
    MovementIntervalInterval(_obj,_dir)
    {
        _obj.bool = false;
        this.movementIntervalIntervalArr.push(_obj);
        if(!this.movementIntervalInterval)
        {
            this.movementTime = this.TimeForInterval(_obj);
            this.intervalTimer = this.time.addEvent({ delay:  this.movementTime, callback: ()=>{
                this.movementIntervalIntervalArr.forEach(element => {
                    switch(_dir)
                    {
                        case "RTL": 
                                    if(element.x > -(game.config.width-element.prevX) )
                                    { 
                                        element.x -= this.movementIntervalX;
                                    }
                                    else
                                    {
                                        element.setPosition((game.config.width+(element.prevX)),element.y);
                                    }
                                    break;
                        case "LTR":              
                                    if(element.x < (game.config.width+(element.prevX)) )
                                    { 
                                        element.x += this.movementIntervalX;
                                    }
                                    else
                                    {
                                        element.setPosition(-(game.config.width-element.prevX),element.y);
                                    }                   
                                    break;
                        case "TTB": 
                                    if(element.y < element.continousEndY )
                                    { 
                                        element.y += this.movementIntervalY;                           
                                    }
                                    else
                                    {
                                        element.setPosition(element.x,(element.continousStartY));
                                    }
                                    break;
                        case "BTT": 
                                    if(element.y > element.continousEndY)
                                    {                         
                                        element.y += this.movementIntervalY;                        
                                    }
                                    else
                                    {         
                                        element.setPosition(element.x,(element.continousStartY));
                                    }
                                    break;
                        
                        case "BRDTL":     
                                    if(element.x >element.continousEndX)
                                    { 
                                        if(element.y > element.continousEndY)
                                        {
                                            element.x -= this.movementIntervalX;
                                            element.y -= this.movementIntervalY;                    
                                        }
                                        else
                                        {
                                            element.setPosition(element.continousStartX,element.continousStartY);
                                        }                        
                                    }
                                    else
                                    {
                                        element.setPosition(element.continousStartX,element.continousStartY);
                                    }
                                break;
                        case "BLDTR":
                                    if(element.x < element.continousEndX )
                                    { 
                                        if(element.y > element.continousEndY)
                                        {
                                            element.x += this.movementIntervalX;
                                            element.y -= this.movementIntervalY;                    
                                        }
                                        else
                                        {
                                            element.setPosition(element.continousStartX,element.continousStartY);
                                        }                           
                                    }
                                    else
                                    {   
                                        element.setPosition(element.continousStartX,element.continousStartY);
                                    }
                                break; 
                        case "TLDBR": 
                                    if(element.x < element.continousEndX )
                                    { 
                                        if(element.y < element.continousEndY)
                                        {
                                            element.x += this.movementIntervalX;
                                            element.y += this.movementIntervalY;                    
                                        }
                                        else
                                        {
                                            element.setPosition(element.continousStartX,element.continousStartY);
                                        }                           
                                    }
                                    else
                                    {   
                                        element.setPosition(element.continousStartX,element.continousStartY);
                                    }
                                    break;
                        case "TRDBL": 
                                    if(element.x > element.continousEndX )
                                    { 
                                        if(element.y < element.continousEndY)
                                        {
                                            element.x -= this.movementIntervalX;
                                            element.y += this.movementIntervalY;                    
                                        }
                                        else
                                        {
                                            element.setPosition(element.continousStartX,element.continousStartY);
                                        }                           
                                    }
                                    else
                                    {   
                                        element.setPosition(element.continousStartX,element.continousStartY);
                                    }
                        break;
                    }   
                });
            }, callbackScope: this, loop:true}); 
        } 
        this.movementIntervalInterval = true; 
    };
    MovementInterval(_obj,_dir)
    {       
        let rtldBuffer;
        let m;
        this.movementIntervalIntervalArr.push(_obj);
        if(!this.movementIntervalInterval)
        {
            this.movementTime = this.TimeForInterval(_obj);
            console.log("this.movementTime "+this.movementTime );
            this.intervalTimer = this.time.addEvent({ delay:    500, callback: ()=>{
                this.movementIntervalIntervalArr.forEach(element => {
                    switch(_dir)
                    {
                        case "RTL": 
                                    if(element.x > -(game.config.width-element.prevX) )
                                    { 
                                        element.x -= this.movementIntervalX;
                                    }
                                    else
                                    {
                                        element.setPosition((game.config.width+(element.prevX)),element.y);
                                    }
                                    break;
                        case "LTR":              
                                    if(element.x < (game.config.width+(element.prevX)) )
                                    { 
                                        element.x += this.movementIntervalX;
                                    }
                                    else
                                    {
                                        element.setPosition(-(game.config.width-element.prevX),element.y);
                                    }                   
                                    break;
                        case "TTB": 
                                    if(element.y < element.continousEndY )
                                    { 
                                        element.y += this.movementIntervalY;                           
                                    }
                                    else
                                    {
                                        element.setPosition(element.x,(element.continousStartY));
                                    }
                                    break;
                        case "BTT": 
                                    if(element.y > element.continousEndY)
                                    {                         
                                        element.y += this.movementIntervalY;                        
                                    }
                                    else
                                    {         
                                        element.setPosition(element.x,(element.continousStartY));
                                    }
                                    break;
                        
                        case "BRDTL":     
                                    if(element.x >element.continousEndX)
                                    { 
                                        if(element.y > element.continousEndY)
                                        {
                                            element.x -= this.movementIntervalX;
                                            element.y -= this.movementIntervalY;                    
                                        }
                                        else
                                        {
                                            element.setPosition(element.continousStartX,element.continousStartY);
                                        }                        
                                    }
                                    else
                                    {
                                        element.setPosition(element.continousStartX,element.continousStartY);
                                    }
                                break;
                        case "BLDTR":
                                    if(element.x < element.continousEndX )
                                    { 
                                        if(element.y > element.continousEndY)
                                        {
                                            element.x += this.movementIntervalX;
                                            element.y -= this.movementIntervalY;                    
                                        }
                                        else
                                        {
                                            element.setPosition(element.continousStartX,element.continousStartY);
                                        }                           
                                    }
                                    else
                                    {   
                                        element.setPosition(element.continousStartX,element.continousStartY);
                                    }
                                break; 
                        case "TLDBR": 
                                    if(element.x < element.continousEndX )
                                    { 
                                        if(element.y < element.continousEndY)
                                        {
                                            element.x += this.movementIntervalX;
                                            element.y += this.movementIntervalY;                    
                                        }
                                        else
                                        {
                                            element.setPosition(element.continousStartX,element.continousStartY);
                                        }                           
                                    }
                                    else
                                    {   
                                        element.setPosition(element.continousStartX,element.continousStartY);
                                    }
                                    break;
                        case "TRDBL": 
                                    if(element.x > element.continousEndX )
                                    { 
                                        if(element.y < element.continousEndY)
                                        {
                                            element.x -= this.movementIntervalX;
                                            element.y += this.movementIntervalY;                    
                                        }
                                        else
                                        {
                                            element.setPosition(element.continousStartX,element.continousStartY);
                                        }                           
                                    }
                                    else
                                    {   
                                        element.setPosition(element.continousStartX,element.continousStartY);
                                    }
                        break;
                    }  
                });
            }, callbackScope: this, loop:true}); 
        }
        this.movementIntervalInterval = true; 
    };
    SetIntervalOffset(_dir)
    {
        switch(_dir)
        {
            case "RTL": 
                        this.movementIntervalX = -((game.config.width)/ 10);
                        this.movementIntervalY = 0;
                        break;
            case "LTR": 
                        this.movementIntervalX = ((game.config.width)/ 10);
                        this.movementIntervalY = 0;  
                        break;
            case "TTB": 
                        this.movementIntervalX = 0;
                        this.movementIntervalY =  ((game.config.height)/ 10);
                        break;
            case "BTT": 
                        this.movementIntervalX = 0;
                        this.movementIntervalY = -((game.config.height)/ 10);
                        break;
            case "RTLD": 
                        this.movementIntervalX = -((game.config.width)/ 10);
                        this.movementIntervalY =  -((game.config.height)/ 10);
                        break;
            case "LTRD": 
                        this.movementIntervalX = ((game.config.width)/ 10);
                        this.movementIntervalY =  -((game.config.height)/ 10);
                        break;
            case "BRDTL": 
                            this.movementIntervalX = ((game.config.width)/ 10);
                            this.movementIntervalY = ((game.config.height)/ 10);
                            break;
            case "BLDTR": 
                            this.movementIntervalX = ((game.config.width)/ 10);
                            this.movementIntervalY = ((game.config.height)/ 10);
                            break;
            case "TLDBR": 
                            this.movementIntervalX = ((game.config.width)/ 10);
                            this.movementIntervalY = ((game.config.height)/ 10);
                            break;
            case "TRDBL":
                            this.movementIntervalX = ((game.config.width)/ 10);
                            this.movementIntervalY = ((game.config.height)/ 10);
                            break;
        }
    }
    //===========>Data to be sent to server<==============//
    CalculateResponse()
    { 
        let _level = LevelManager.GetCurrentLevelNumber();
        let _correctAnwer = this.totalCorrectAnswer;
        let _inCorrectAnswer = this.totalInCorrectAnswer;
        let _accuracy = (this.totalNumberUserClicked === 0) ? 0 : parseInt((  this.totalGamePlayed/this.totalNumberUserClicked)*100) ;
        let _totalTime = 0;
        let _avarageTime = 0;
        let _
        for (let i = 0; i < this.totalEachLevelTime.length; i++) 
        {
            _totalTime +=  this.totalEachLevelTime[i];
            
        }
        if(_totalTime > 0 && this.totalGamePlayed > 0)
        {
            _avarageTime = (_totalTime / this.totalGamePlayed);// / _totalTime);
        }
        else{
            _avarageTime = 0;
            console.log('average answer time is zero');
        }
        // console.log('vag ans time : ' + average_answer_time);
        let _timePerQuestion = [...this.totalEachLevelTime];                 
        let _deviceDateTime = Math.round(new Date().getTime()/1000);
        let _score  =   (_level * this.totalCorrectAnswer * 99);

  
        let post_game ={
            "firstStar": false,
            "secondStar": false,
            "thirdStar": false,
            "highScore": null,
            "level": _level,
            "currentScore":_score,
            "brainHelp" : Database.brain_help,
            "ratingBox" : false
        }

               // for rating system container  

               let startingLevel = LevelManager.GetInitialLevel();
               let presentLevel = LevelManager.GetCurrentLevelNumber();
               console.log('starting level : ' + startingLevel + 'present level : ' + presentLevel);
               if(startingLevel >= 5)
               {
                 if(presentLevel == startingLevel + 5)
                 {
                    console.log('rate box enable');
                    // show star system
                    post_game.ratingBox = true;
                 }
               }
        
               //first star calculation

            let firstStar = (_correctAnwer / this.totalQuestionPresented);
            console.log('firstStar : ' + firstStar);
            console.log('spectific success rate :  ' + Database.success_rate);
            if(firstStar >=  Database.success_rate)
            {
                console.log('get first star');
                post_game.firstStar = true;
            }
            else{
                console.log('you are about to get your first star');
            }

            //second star calculation
            console.log('average answer time : ' + _avarageTime);
            

            //third star calculation
            let calculation = Database.level_up + 2;
            console.log('calculation : ' + calculation);
            let endLevel = _level;
            let startLevel = LevelManager.GetInitialLevel();
            console.log('start level : ' + startLevel + 'initial level : ' + endLevel); 
            if((endLevel - startLevel) >= calculation)
            {
            //third star visible;
            // document.getElementsByClassName("mt-3 img_gray").style.display="none";
            post_game.thirdStar = true;
            }
            else{
            // not visible
            }
            // score calculation
            console.log('last high score : ' + Database.lastHighestScore);
            if(Database.lastHighestScore == 0 || Database.lastHighestScore == "")
            {
            // show the _score as highest score on dom panel
            console.log('show the _score as highest score on dom panel')
            post_game.highScore = true;
            }
            else if(_score > Database.lastHighestScore)
            {
            // show the score scored by player on the dom panel
            console.log('show the score scored by player on the dom panel');
            post_game.highScore = true;
            }
            else{
            console.log('show the score only');
            }
            let brainHelp = Database.brain_help;
            console.log('brain help : ' + brainHelp);

                //   console.log('graph array : ' + Database.graphArray);


        this.ServerData(_level,_correctAnwer,_inCorrectAnswer,
                        _accuracy,_totalTime, _avarageTime,_timePerQuestion,
                        _deviceDateTime,this.comboWins,_score,post_game);
    };
    ServerData(_level,_correctAnwer,_inCorrectAnswer,
                _accuracy,_totalTime, _avarageTime,_timePerQuestion,
                _deviceDateTime,_combo,_score,_post_game)
    {
        let data =  {
                "game_id": gameId,// current game id 
                "questions_presented":  this.totalQuestionPresented,// total number of question presented
                "level": _level,  // <the level the player reached in this session at the end of the game>
                "correct_answers": _correctAnwer, // number of correct answers
                "incorrect_answers": _inCorrectAnswer, // number of incorrect answers
                "accuracy": _accuracy, // number of clicks (if >1),0/1-If the user missed the target up to 50% of the target size from the target
                "total_time": _totalTime , // 
                "average_answer_time": parseFloat(parseFloat(_avarageTime).toFixed(2)) , // number of questions / total time played
                "time_per_question": _timePerQuestion, // {}
                "datetime": _deviceDateTime.toString(), //device time
                "combo": _combo, // the highest correct answers combo
                "score": _score // (user’s level)*(correct answers)*(99)
            }
        ////console.log("data to send ",data);
        Server.sendGameData(data,Server);
         // window.open("https://dev-game-emazebrain.s3.amazonaws.com/post_game_screen/game_end.html","_self");
            // window.open("../post_game_screen/game_end.html","_self");

            let baseUrl = "../post_game_screen/game_end.html";
            let urlData = {
                firstStar: _post_game.firstStar,
                secondStar: _post_game.secondStar,
                thirdStar:_post_game.thirdStar,
                highScore: _post_game.highScore,
                currentScore:_post_game.currentScore ,
                level: _post_game.level,
                brainHelp: _post_game.brainHelp,
                ratingBox:_post_game.ratingBox,
                
            }
            // let baseUrl = "https://dev-game-emazebrain.s3.amazonaws.com/post_game_screen/game_end.html";
            window.open(baseUrl+"?urlData="+JSON.stringify(urlData) , "_self");
            window.open(baseUrl+  
            "?firstStar="+ _post_game.firstStar+
            "&secondStar="+ _post_game.secondStar+
            "&thirdStar=" +_post_game.thirdStar+
            "&highScore="+ _post_game.highScore+
            "&level="+ _post_game.level+
            "&brainHelp="+ _post_game.brainHelp+
            "&ratingBox="+ _post_game.ratingBox+
            "&currentScore="+_post_game.currentScore+
            "&t="+Server.token+
            "&game_id="+gameId, "_self");   
    };
    //===>Banner Pop up<=========//
    BannerCreateAndHide(_text,_bool)
    {
        let value;
        switch(_text)
        {
            case "GAME_START": value = 'start';break;
            case "EXCELLENT":  value = 'excellent';break;
            case "TIMES_UP":   value = 'timeUp';break;
            case "GAME_OVER":  value = 'gameOver';break;
            case "LEVEL_UP":   value = 'levelUp';break;
        }
        let popUpBg = this.add.image(game.config.width/2,game.config.height/2,value).setOrigin(0.5).setScale(scaleFactorX,scaleFactorY);
        popUpBg.depth  = 5;
        if(_bool)
        {
            setTimeout(() => {
                popUpBg.visible = false;
            },  500);
        }
    }
}