'use strict';
import { LevelManager } from "./LevelManager.js";
import { Server } from "./Server.js";
import { LoadAssets } from "./LoadAssets.js";

export default class GameScene extends Phaser.Scene 
{
    constructor() 
    {
        super("GameScene");
        //===> General Data <====//
        this.timerValueText = 3;
        this.timerText;
        this.timerDegre = -89;//89;//1;
        this.tickerRed; 
        this.tickerGreen; 
        this.tickerDegre = -89;//1;
        this.graphics;
        this.graphics1;
        this.rotationAngle = 0;
        //=====> Level Data <======//
        this.totalNumberOfLevel;;
        this.movementDirection;
        this.movementTime;
        this.rotationType;
        this.rotationTime;
        this.allLevelImage = [];
        // this.levelBackground;
        this.totalCorrectAnswer = 0;
        this.totalInCorrectAnswer = 0;
        this.objectAngle = 15;       
        //------------------------------
        this.movementBuffer  = 0;
        this.movementInterval;
        this.movementIntervalX = 10;
        this.movementIntervalY;
        this.isInetervalContinuous = true;
        this.continousStartX;
        this.continousStartY;
        this.continousEndX;
        this.continousEndY;
        this.isMovementContinuous = true;
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
        this.eachLevelTime  = 0;//Each level time to calculate response
        this.totalEachLevelTime  = [];//Each level time to calculate response
        this.eachGameTime  = 0;//Each game time to calculate response
        this.totalNumberUserClicked  = 0;//total number of click to calculate response
        this.totalQuestionPresented = 0;// total number of question presented to calculate response
        this.consecutiveComboWins = 0;// to calculate combo
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
    preload()
    {
        this.load.plugin('rexgrayscalepipelineplugin', 
        'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgrayscalepipelineplugin.min.js',
         true);
    }
    create() 
    {      
        SoundManager.StartSoundPlay();//Game start sound 
        //====> Selecting Background <======//
        let levelBackground = LevelManager.DecideLevelBackground(); 
        let singleImage =  levelBackground.split("/"); 
        let bg  = this.add.image(game.config.width/2,game.config.height/2,singleImage[singleImage.length-1]).setOrigin(0.5,0.5).setScale(scaleFactorX * 2,scaleFactorY * 2);
        bg.setInteractive(); 
        bg.on("pointerdown", (pointer, x, y, event) => this.OnBackgroundClick());       
        //=====> Static Items <==========//        
        let headerBar = this.add.image(game.config.width/2,game.config.height/21,'titleBg').setOrigin(0.5).setScale(scaleFactorX*2.3,scaleFactorY*2.6);  
        headerBar.depth = 2;
        let titleBg =  this.add.image(game.config.width/1.99,game.config.height/13.5,"title").setOrigin(0.5,0.5).setScale(scaleFactorX*1.8,scaleFactorY*1.9);
        titleBg.depth = 2;
        
        this.stopButton =  this.add.image(game.config.width/1.06,game.config.height/1.12,"stop").setOrigin(0.5,0.5).setScale(scaleFactorX*1.8,scaleFactorY*1.9);
        this.stopButton.depth = 4;
        this.stopButton.disableInteractive();
        this.stopButton.on("pointerdown",this.StopButtonDown);  
        this.stopButton.on("pointerup",this.StopButtonUp);  
      
        //----------------------------------------------
        
        let thumbsUp  = this.add.image(game.config.width/20,game.config.height/13.5,"thumbs_up").setOrigin(0.5,0.5).setScale(scaleFactorX*1.8,scaleFactorY*1.8);
        let thumbsDown = this.add.image(game.config.width/1.05,game.config.height/13.5,"thumbs_down").setOrigin(0.5,0.5).setScale(scaleFactorX*1.8,scaleFactorY*1.8);
        thumbsUp.depth = 2;
        thumbsDown.depth = 2;

        const style = { font: "bold 30px CCBellyLaugh", fill: "#a18708" ,stroke: '#fff', strokeThickness: 4,};
        this.thumbsUpText = this.add.text(thumbsUp.x + (game.config.width/16), thumbsUp.y - (game.config.height/80) ,  this.totalCorrectAnswer, style).setOrigin(0.5).setScale(scaleFactorX*1.9,scaleFactorY*2);
        this.thumbsDownText = this.add.text(thumbsDown.x - (game.config.width/16), thumbsDown.y - (game.config.height/80) , this.totalInCorrectAnswer, style).setOrigin(0.5).setScale(scaleFactorX*1.9,scaleFactorY*2);
        this.thumbsUpText.depth = 2;
        this.thumbsDownText.depth = 2;

        let timerImg = this.add.image(game.config.width/4.6,game.config.height/14,"timer").setOrigin(0.5,0.5).setScale(scaleFactorX*1.5,scaleFactorY*1.75);
        timerImg.depth = 3;
        const timerTextStyle = { font: "bold 21px CCBellyLaugh", fill: "#594b03"};
        this.timerText = this.add.text(game.config.width/4.6,game.config.height/14,  this.timerValueText, timerTextStyle).setOrigin(0.5).setScale(scaleFactorX*2,scaleFactorY*2);
        this.timerText.depth = 3;
        this.tickerRed = this.add.image(game.config.width/1.3,game.config.height/16,"ticker_red").setOrigin(0.5,0.5).setScale(scaleFactorX*0.45,scaleFactorY*0.45);
        this.tickerGreen = this.add.image(game.config.width/1.3,game.config.height/16,"ticker_green").setOrigin(0.5,0.5).setScale(scaleFactorX*0.45,scaleFactorY*0.45);
        this.tickerRed.visible = false;
        this.tickerGreen.visible = false;
        this.tickerRed.depth = 3;
        this.tickerGreen.depth = 3;
       //------------------------------------------
        this.timer = this.time.addEvent({ delay: 1000, callback: this.UpdateTickerTimer, callbackScope: this, loop: true });
        this.timer.paused = true;
        this.eachLevelTimer = this.time.addEvent({ delay: 100, callback: this.EachLevelTimer, callbackScope: this, loop: true });
        this.eachLevelTimer.paused = true;
        this.rotateTimer = this.time.addEvent({ delay: (1000), 
            callback: this.UpdateRotateTimer, 
            callbackScope: this, loop: true });
        this.rotateTimer.paused = true;
        //====> Timer Arc <============//
        this.graphics = this.add.graphics();
        this.graphics.depth = 3;
        this.graphics1 = this.add.graphics();
        this.graphics1.lineStyle(Math.floor(game.config.width/300), 0x54f419, 1);
        this.graphics1.beginPath();
        this.graphics1.arc(game.config.width/1.3,game.config.height/17, Math.floor(game.config.width/42), Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(this.tickerDegre), true);
        this.graphics1.strokePath();
        this.graphics1.depth = 3;
        this.graphics1.visible = false;
        //===> Game time <=====//
        this.GameTimer();        
        //=======> Setting timer value <======//
        console.log("this.isTimerAvailable "+this.isTimerAvailable);
        if(this.isTimerAvailable)
        {
            this.timer.paused = false;
            this.graphics1.visible = true;
            this.tickerGreen.visible = true;
        }
        //======> createing initial level <====//
      
        this.CreateLevel();   
        this.BannerCreateAndHide("GAME_START",true);           
    };
    StopButtonDown()
    {
        this.setScale(scaleFactorX*1.7,scaleFactorY*1.8);
        this.totalNumberUserClicked += 1;
    };
    StopButtonUp()
    {
        this.disableInteractive();  
        this.setScale(scaleFactorX*1.8,scaleFactorY*1.9);
        this.scene.StopMovement();
        this.scene.OnObjectClicked();
    };
    EachLevelTimer()
    {
        this.eachLevelTime += 100; 
    };
    // UpdateGameTimer()
    // {
    //     console.log(" this.timeForEachLevel "+ this.timeForEachLevel);
    //     if( this.timeForEachLevel!=0)
    //     {
    //         this.timeForEachLevel -= 1000;
    //     }
    //     else
    //     {
    //         this.StopMovement();
    //         this.ClearLevel();
    //         SoundManager.EndSoundPlay();//playing game end sound
    //         this.BannerCreateAndHide("GAME_OVER",false);
    //         this.CalculateResponse();
    //         this.timerText.visible = false;
    //         // this.timer.paused = true;
    //     }
    // };
    UpdateTickerTimer()
    {        
        this.graphics1.clear();
        let offSet ;       
        if(this.isTimerAvailable)
        {
            this.tickerDegre += (360/this.totalTimeForGame);
            offSet =(270 -  (360/this.totalTimeForGame));
        }
        else
        {
            this.tickerDegre += (360/this.timeForEachLevel);
            offSet = (270 - (360/this.timeForEachLevel));
        } 
        console.log("UpdateTickerTimer-----------------"+this.tickerDegre );
        if( this.tickerDegre < 269)
        {                     
            if(this.tickerDegre > 180)
            {
                this.tickerRed.visible = true;
                this.tickerGreen.visible = false;
                this.graphics1.lineStyle(Math.floor(game.config.width/300), 0xf13900, 1);
                this.graphics1.beginPath();
                this.graphics1.arc(game.config.width/1.3,game.config.height/17, Math.floor(game.config.width/42), Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(this.tickerDegre), true);
                this.graphics1.strokePath();
            }
            else
            {
                this.tickerRed.visible = false;
                this.tickerGreen.visible = true;
                this.graphics1.lineStyle(Math.floor(game.config.width/300), 0x54f419, 1);
                this.graphics1.beginPath();
                this.graphics1.arc(game.config.width/1.3,game.config.height/17, Math.floor(game.config.width/42), Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(this.tickerDegre), true);
                this.graphics1.strokePath();
            }           
        }
        else
        {
            this.graphics1.clear();
            this.graphics1.visible = false;
            this.tickerRed.visible = false;
            this.tickerGreen.visible = false;
            this.timer.paused = true;
            SoundManager.InCorrectAnswerSoundPlay();//playing unanswered as incorrect
            this.ChangeLevel(false);
        }
    };
    OnBackgroundClick()
    {
        this.totalNumberUserClicked += 1;
    };
    CalculatePosition()
    {
       let minmumPosition = game.config.width/4.5;
       let maxmumPosition = game.config.width/1.2;
       let randomPosition = Math.floor(Math.random()*( maxmumPosition - minmumPosition)+minmumPosition);
       let positionForQuestion = [];
    //    if(LevelManager.movementDirection == "RTL" || LevelManager.movementDirection == "LTR")
    //    {
    //         minmumPosition = game.config.width/4.5;
    //         maxmumPosition = game.config.width/1.2;
    //         positionForQuestion[0] = Math.floor(Math.random()*( maxmumPosition - minmumPosition)+minmumPosition);;
    //         positionForQuestion[1] = game.config.height/2;
    //    }
    //    else if (LevelManager.movementDirection == "TTB" || LevelManager.movementDirection == "BTT")
    //    {
        // minmumPosition = game.config.height/5;
        // maxmumPosition = game.config.height/1.25;
        //         positionForQuestion[0] = Math.floor(Math.random()*( maxmumPosition - minmumPosition)+minmumPosition);
        //         positionForQuestion[1]=0;
    //    }
       return  randomPosition;
    };
    CreateLevel()
    {
        this.graphics.lineStyle(Math.floor(game.config.width/290), 0x594b03, 1);
        this.graphics.beginPath();
        this.graphics.arc(game.config.width/4.6,game.config.height/14, Math.floor(game.config.width/50), Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(this.timerDegre), true);
        this.graphics.strokePath();
        // if(! this.isTimerAvailable )
        // {
        //     //console.log("new level"+this.timeForEachLevel);
        //     this.timerValueText = this.timeForEachLevel;
        //     this.SetTimerText(this.timerValueText);
        // }
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
        setTimeout(() => {
            this.DisplayLevel();
        }, 700);

    };
    GameTimer()
    {
        let questionTimeData = LevelManager.DecideTimeOrNumberOfQuestion();
        console.log("questionTimeData",questionTimeData);
        if(questionTimeData[0] === null || questionTimeData[0] === "")
        {
            this.isTimerAvailable = false;
        }
        else
        {
            this.isTimerAvailable = true;
        } 
        this.totalTimeForGame = questionTimeData[0];
        this.timeForEachLevel = (questionTimeData[1]*1000);
        this.totalNumberOfLevel = questionTimeData[2];
    };
    MovementAndRotationOfImage()
    {
        let movementAndRotationData = LevelManager.DecideMovementAndRotation();
        this.movementDirection = movementAndRotationData[0];
        this.movementTime = (movementAndRotationData[1]*1000);
        // this.rotationType = movementAndRotationData[2];
    };
    ImageForCurrentLevel()
    {
        this.allLevelImage = LevelManager.totalLevelImageName;
        this.totalNumberOfImages = LevelManager.numberOfImage;
        this.totalNumberOfTypeOfImages =  LevelManager.numberOfTypeOfImage;
        for (let i = 0; i < this.allLevelImage.length; i++) 
        {
            this.allLevelImage[i] = LoadAssets.getImageName(this.allLevelImage[i]);
        }
        if(this.currentLevel%5 == 0)
        {
            if(this.numberOfAnswers < 6)
            {
                this.numberOfAnswers += 1;
            }
        }
        this.numberOfDestractor =   this.totalNumberOfImages -  this.numberOfAnswers;
    };
    DisplayLevel()
    {   
        const grayscalePipeline = this.renderer.pipelines.get('Gray');
        this.totalQuestionPresented += 1;       
        let randomIndex = Math.floor(Math.random()*((this.allLevelImage.length - 1)- 0 + 1)+0);
        let pos = this.CalculatePosition();
        this.grey =  this.add.image(pos,game.config.height/2,this.allLevelImage[randomIndex]).setOrigin(0.5,0.5).setScale(scaleFactorX*1.8,scaleFactorY*1.9);//.setPipeline(grayscalePipeline);
        this.grey.depth = 1;
        this.grey.key = "grey";
        this.player =  this.add.image(pos,game.config.height/2,this.allLevelImage[randomIndex]).setOrigin(0.5,0.5).setScale(scaleFactorX*1.8,scaleFactorY*1.9);
        this.player.prevX = pos;
        this.player.prevY = game.config.height/2;
        this.player.depth = 1;
        this.player.key = "player";
        let  pipelineInstance = this.plugins.get('rexgrayscalepipelineplugin').add(this.grey );
        this.SetMovementType(this.player,LevelManager.movementDirection,LevelManager.movementType);
        setTimeout(() => {
            this.stopButton.setInteractive();
        }, 1500);
        if( this.isTimerAvailable )
        {
            this.timer.paused = false;
        }
        this.eachLevelTimer.paused = false;
    };
    SetGameImageNumber()
    {};
    OnObjectClicked()
    {
        let correct = this.CheckAnswer();
        this.totalGamePlayed += 1 ;
        if(correct)
        {
            this.numberOfAnswerClick += 1;
            this.totalCorrectAnswer  += 1;
            this.consecutiveWins += 1;
            this.consecutiveComboWins += 1;
            if( this.consecutiveComboWins >  this.comboWins)
            {
                this.comboWins =  this.consecutiveComboWins;
            }
            this.consecutiveLoose = 0;
            if((this.consecutiveWins != LevelManager.offsetForLevelUp) && ( this.totalGamePlayed != this.totalNumberOfLevel))
            {
                this.BannerCreateAndHide("EXCELLENT",true);
                SoundManager.CorrectAnswerSoundPlay();//Playing when answer is correct
            }
            this.LevelWin(this.totalCorrectAnswer);
        }
        else
        {
            this.consecutiveWins = 0;
            this.consecutiveComboWins = 0;
            this.totalInCorrectAnswer  += 1;
            this.consecutiveLoose += 1;
            SoundManager.InCorrectAnswerSoundPlay();//Playing when answer is incorrect
            this.LevelLoose( this.totalInCorrectAnswer);
        }
        setTimeout(() => {
            this.ChangeLevel(true);
        }, 700);
    };
    CheckAnswer()
    {
        let xPoslimit = {
            min: ((this.grey.x + (this.grey.width/2)) - ((this.grey.width * 85)/100)),
            max: ((this.grey.x - (this.grey.width/2)) + ((this.grey.width * 85)/100))
        }
        let yPosLimit = {
            min: ((this.grey.y + (this.grey.height/2)) - ((this.grey.height * 85)/100)),
            max: ((this.grey.y - (this.grey.height/2)) + ((this.grey.height * 85)/100))
        }
        let playerXPosLimit =  {
            min: ((this.player.x + (this.player.width/2)) - ((this.player.width * 85)/100)),
            max: ((this.player.x - (this.player.width/2)) + ((this.player.width * 85)/100))
        }
        let playerYPosLimit = {
            min: ((this.player.y + (this.player.height/2)) - ((this.player.height * 85)/100)),
            max: ((this.player.y - (this.player.height/2)) + ((this.player.height * 85)/100))
        }
        if((playerXPosLimit.min > (this.grey.x - (this.grey.width/2)) && playerXPosLimit.min  < xPoslimit.min)||
        (playerXPosLimit.max > xPoslimit.max && playerXPosLimit.max  < (this.grey.x + (this.grey.width/2))))
        {
            // //console.log("--------------------win---------------------------");
            return true;
        }
        else if((playerYPosLimit.min > (this.grey.y - (this.grey.height/2)) && playerYPosLimit.min  < yPosLimit.min)||
        (playerYPosLimit.max > yPosLimit.max && playerYPosLimit.max  < (this.grey.y + (this.grey.height/2))))
        {
            // //console.log(this.player.x+"--------------------win---------------------------"+this.player.y );
            return true;
        }
        else
        {
            // //console.log("--------------------loose---------------------------");
            return false;;
        }
    };
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
                SoundManager.EndSoundPlay();
                this.BannerCreateAndHide("TIMES_UP",false);
                this.CalculateResponse();
            }
        }   
        else
        {  
            if( this.totalGamePlayed == this.totalNumberOfLevel)
            {
                levelOrTimeComplete = false;
                this.ClearLevel();
                SoundManager.EndSoundPlay();//playing game end sound
                this.BannerCreateAndHide("GAME_OVER",false);
                this.CalculateResponse();
                this.timerText.visible = false;
                // this.timer.paused = true; 
            }
            else
            {
                if(!_bool)
                {
                    this.totalGamePlayed += 1 ;
                    this.consecutiveWins = 0;
                    this.consecutiveComboWins = 0;
                    this.totalInCorrectAnswer  += 1;             
                    this.consecutiveLoose += 1;
                    // levelOrTimeComplete = false;
                    // this.ClearLevel();                   
                    this.currentLevel  = LevelManager.GetCurrentLevelNumber();
                    this.LevelLoose( this.totalInCorrectAnswer);
                    // this.CreateLevel();
                }
                if(this.isTimerAvailable)
                {
                    this.tickerDegre = -89;
                    this.graphics1.clear();
                    this.graphics1.visible = true;                
                    this.graphics1.lineStyle(Math.floor(game.config.width/300), 0x54f419, 1);
                    this.graphics1.beginPath();
                    this.graphics1.arc(game.config.width/1.3,game.config.height/17, Math.floor(game.config.width/42), Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(this.tickerDegre), true);
                    this.graphics1.strokePath();              
                    this.tickerRed.visible = false;
                    this.tickerGreen.visible = true;
                    this.timer.paused = false; 
                }               
            }      
        }
        if(levelOrTimeComplete)
        {
            this.ClearLevel();
            if(this.consecutiveWins == LevelManager.offsetForLevelUp)
            {
                this.consecutiveWins = 0;
                this.BannerCreateAndHide("LEVEL_UP",true);
                SoundManager.LevelUpSoundPlay();
                LevelManager.IncreaseLevel(LevelManager);
            }
            else if(this.consecutiveLoose == LevelManager.offsetForLevelDown)
            {
                if( this.currentLevel > 1)
                {
                    LevelManager.DecreaseLevel(LevelManager);
                }
                this.consecutiveLoose = 0;
            }  
            this.currentLevel  = LevelManager.GetCurrentLevelNumber();
            this.CreateLevel();
        }
    };
    ClearLevel()
    {
       
        this.eachLevelTimer.paused = true;
        this.totalEachLevelTime.push(this.eachLevelTime);
        this.timerValueText = 3;// re initialize timer text to 3
        this.timerText.text = this.timerValueText;// settign timer text tot 3
        this.movementBuffer  = 0;
        this.numberOfAnswerClick = 0;
        this.rotateTimer.paused = true;
        this.movementContinuousIntervalBool = false;
        this.movementIntervalInterval = false;
        this.timerDegre = -89;
        if(this.isTimerAvailable)
        {
            this.timer.paused = true;
            // this.tickerDegre = -89;
        }
        this.eachLevelTime  = 0;
        let arrLength =  this.scene.scene.children.list.length;
        for (let i = 0; i < arrLength; i++) 
        {
            if( this.scene.scene.children.list[i].key=="player" || 
                this.scene.scene.children.list[i].key=="grey")
            {
                this.scene.scene.children.list[i].destroy();
                arrLength =  this.scene.scene.children.list.length;
                i = 0;
            }  
        }
        this.graphics.clear();        
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
        // //console.log("-----------------------UpdateTimer---------------") 
        // this.eachLevelTime += 1; 
        this.graphics.clear(); 
        this.timerDegre += 119;
        if( this.timerDegre < 268)
        {
            this.graphics.lineStyle(Math.floor(game.config.width/290), 0x594b03, 1);
            this.graphics.beginPath();
            this.graphics.arc(game.config.width/4.6,game.config.height/14, Math.floor(game.config.width/50), Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(this.timerDegre), true);
            this.graphics.strokePath();
            this.timerValueText -= 1;
            this.timerText.text = this.timerValueText;
        }
        else
        {
            this.timerValueText -= 1;
            this.timerText.text = this.timerValueText;
            if(this.timerValueText == 0)
            {
                this.StopMovement();
                SoundManager.InCorrectAnswerSoundPlay();//playing unanswered as incorrect
                setTimeout(() => {
                    this.ChangeLevel(false);
                }, 700);
            }
        } 
    }; 
    SetMovementType(_obj,directionType,movementType)
    {
        switch(parseInt(movementType))
        {
            case 0:  
                    this.movementType = "continuous";
                    this.SetDirectionType(directionType,  _obj);
                    break;
            case 1: 
                    this.movementType = "intervals";
                    this.SetIntervalOffset(directionType);
                    this.SetDirectionType(directionType,  _obj);
                    break;
            case 2: 
                    this.movementType = "continuous-continuous";
                    this.SetDirectionType(directionType,  _obj);
                    break;
            case 3: 
                    this.movementType = "continuous-interval";
                    this.SetDirectionType(directionType,  _obj);
                    break;
            case 4:
                    this.movementType = "intervals-continuous";
                    this.SetDirectionType(directionType,  _obj);
                    break;
            case 5:
                    this.movementType = "intervals-intervals";
                    this.SetDirectionType(directionType,  _obj);
                    break;
        }
        console.log("this.movementType"+this.movementType);
       
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
                                // this.IntervalMovement(this.answers,this.destractor,_direction);
                                this.IntervalMovement(_obj,continousStartX, continousStartY,_direction);
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
                                        this.MovementIntervalContineous(_direction,_obj,continousEndX, continousEndY,continousStartX, continousStartY,);
                                         break;
            case "intervals-intervals":
                                        this.MovementIntervalInterval(_obj,_direction,continousEndX, continousEndY);
                                        break;
        }
    };
    SetDirectionType(_direction,_obj,_bool = true)
    {
        let continousStartX = 10;
        let continousStartY;
        let continousEndX;
        let continousEndY;
        let m ;
        let objX ;
        if(_bool)
        {
            switch(_direction)
            {
                case "RTL":    
                            // this.movementTime = ((10000/(game.config.width+50))*(_obj.x));
                            continousStartX = -_obj.width/3;//(game.config.width+50);
                            continousStartY = _obj.y;
                             objX = _obj.x;
                            this.movementIntervalX = ((game.config.width)/ 10);
                            this.movementIntervalY = 0;     
                            while(true)
                            {
                                if(objX < (game.config.width + _obj.width/3))
                                {
                                    objX +=  this.movementIntervalX
                                }
                                else
                                {
                                    break;
                                }
                            }
                            continousEndX = objX;//(game.config.width+200);                 
                            // continousEndX = -(game.config.width/7.5);
                            continousEndY = _obj.y; 
                            // this.MovementRTL(_obj);
                            break;
                case "LTR": 
                            // this.movementTime = ((10000/(game.config.width+200))*((game.config.width+200) - _obj.x));
                            continousStartX = (game.config.width+_obj.width/3);//(-200);
                            continousStartY = (game.config.height/2);//_obj.y;
                            objX = _obj.x;
                            this.movementIntervalX = ((game.config.width)/ 10);
                            this.movementIntervalY = 0;  
                            while(true)
                            {
                                if(objX > (-_obj.width/3))
                                {
                                    objX -=  this.movementIntervalX
                                }
                                else
                                {
                                    break;
                                }
                            }
                            continousEndX = objX;//(game.config.width+200);
                            continousEndY = (game.config.height/2);//_obj.y;                           
                            // this.MovementLTR(_obj);
                            break;
                case "TTB": 
                            // this.movementTime = ((10000/(game.config.height+200))*((game.config.height+200) - _obj.y));
                            continousStartX = (game.config.width/2);//_obj.x;
                            continousStartY = (game.config.height + game.config.height/5.4);//200;
                            continousEndX = (game.config.width/2);//_obj.x;
                            continousEndY = -(game.config.height/5.023);//215); 
                            this.movementIntervalX = 0;
                            this.movementIntervalY = ((game.config.height)/ 10);
                            // this.MovementTTB(_obj);
                            break;
                case "BTT":  
                            // this.movementTime = ((10000/(game.config.height+200))*( _obj.y));
                            continousStartX = (game.config.width/2);//_obj.x;
                            continousStartY = -(game.config.height -  game.config.height/5.4);
                            continousEndX = (game.config.width/2);//_obj.x;
                            continousEndY = (game.config.height + game.config.height/5.023);//215); -215;
                            this.movementIntervalX = 0;
                            this.movementIntervalY = -((game.config.height)/ 10);
                            // this.MovementBTT(_obj);
                            break;
                case "RTLD": 
                            // //console.log("movement RTLD");
                            // this.movementTime = ((10000/(game.config.height+200))*( _obj.y));
this.movementIntervalX = -((game.config.width)/ 10);
this.movementIntervalY = -((game.config.height)/ 10);
_obj.visible = false;
continousEndX = (game.config.width);//_obj.x;
continousEndY = -(_obj.width/2);//_obj.y;
continousStartX = -(_obj.width/2);
continousStartY = (game.config.height);

                            // while(true)
                            // {
                            //     continousEndX -= this.movementIntervalX;
                            //     continousEndY += this.movementIntervalY;  
                            //     if(continousEndX < (game.config.width + _obj.width/2) )
                            //     { 
                            //         if(continousEndY < (game.config.height +  _obj.height/3))
                            //         {}
                            //         else
                            //         {
                            //           break;
                            //         }                           
                            //     }
                            //     else
                            //     {        
                            //         break;
                            //     } 
                            // } 
                           
                            _obj.visible = true;
                            // m = ((continousEndY - _obj.y)/(continousEndX - _obj.x)); 
                            // continousStartX = (_obj.x + ((game.config.height - _obj.y)/m));
                            // continousStartY = (game.config.height);//-(_obj.height/2);//(game.config.height);
                            
                            // continousEndY = 0;
                            // continousEndX = (_obj.x + 300);                       
                            // //console.log("continousStartX"+continousStartX+" _obj.x "+_obj.x);
                            // //console.log("continousStartY"+continousStartY+" _obj.y "+_obj.y);
                            // //console.log("m"+m);
                            // this.MovementRTLD(_obj);
                            break;
                case "LTRD": 
                            // let m ;
                            // this.movementTime = ((10000/(game.config.height+200))*( _obj.y)); 
                            this.movementIntervalX = ((game.config.width)/ 10);
                            this.movementIntervalY = ((game.config.height)/ 10);
                            _obj.visible = false;
                            continousEndX = _obj.x;
                            continousEndY = _obj.y;
                            while(true)
                            {
                                continousEndX -= this.movementIntervalX;
                                continousEndY += this.movementIntervalY;  
                                if(continousEndX > -(game.config.width + _obj.width/3) )
                                { 
                                    if(continousEndY < (game.config.height +  _obj.height/2))
                                    {}
                                    else
                                    {
                                      break;
                                    }                           
                                }
                                else
                                {        
                                    break;
                                } 
                            } 
                            _obj.visible = true;                          
                            // continousEndY = (game.config.height +_obj.height/3);//0;
                            // continousEndX = (_obj.x - 300);
                            m = (Math.abs(continousEndY - _obj.y)/Math.abs(continousEndX - _obj.x));
                            continousStartX = (_obj.x + (Math.abs(continousEndY - _obj.y)/m));
                            continousStartY = -(_obj.height/2);
                            // //console.log("continousStartX"+continousStartX+" _obj.x "+_obj.x);
                            // //console.log("continousStartY"+continousStartY+" _obj.y "+_obj.y);
                           
                            break;
            
                case "TRDBL":  console.log("TRDL");
                                this.movementIntervalX = -((game.config.width)/ 10);
                                this.movementIntervalY = -((game.config.height)/ 10);
                                // _obj.visible = false;
                                continousEndX = (game.config.width);//_obj.x;
                                continousEndY = -(_obj.height/2);//_obj.y;
                                continousStartX = -(_obj.width/2);
                                continousStartY = (game.config.height);
                                break;
                case "TLDBR": 
                                this.movementIntervalX = -((game.config.width)/ 10);
                                this.movementIntervalY = -((game.config.height)/ 10);
                                // _obj.visible = false;
                                continousEndX = -(_obj.width/2);//_obj.x;
                                continousEndY = -(_obj.height/2);//_obj.y;
                                continousStartX = (game.config.width);//_obj.x;
                                continousStartY = (game.config.height);//_obj.y;
                                break; 
                case "BRDTL": 
                                this.movementIntervalX = -((game.config.width)/ 10);
                                this.movementIntervalY = -((game.config.height)/ 10);
                                // _obj.visible = false;
                                continousStartX = -(_obj.width/2);//_obj.x;
                                continousStartY = -(_obj.height/2);//_obj.y;
                                continousEndX = (game.config.width);//_obj.x;
                                continousEndY = (game.config.height);//_obj.y;
                                break;
                case "BLDTR": 
                                this.movementIntervalX = -((game.config.width)/ 10);
                                this.movementIntervalY = -((game.config.height)/ 10);
                                // _obj.visible = false;
                                continousStartX = (game.config.width);//_obj.x;
                                continousStartY = -(_obj.height/2);//_obj.y;
                                continousEndX = -(_obj.width/2);//_obj.x;
                                continousEndY = (game.config.height);//_obj.y;
                                break;
                        }
        }
        this.StartMovement(_obj,continousStartX, continousStartY,
            continousEndX, continousEndY,_direction);
    }; 
    MovementContineous(_obj,_startX,_startY,_endX,_endY)
    {       
        _obj.setPosition( _endX,  _endY);
        let ref = this;
        console.log(" this.movementTime ->"+ this.movementTime);
        setTimeout(() => {            
            this.movementContineousTween = this.tweens.add({
                targets: _obj,
                x:  _startX,//_endX,
                y:  _startY,//_endY,
                ease: 'Linear',
                duration: this.movementTime,
                callbackScope: this,           
                // repeat : 2,
                onLoop  : function()
                        {
                            ref.UpdateTimer();
                            //console.log("repeat");
                        },
                loop: -1,
                loopDelay : 500
            })
            ;
        }, 1000);
    };
    MovementContineousContineous(_obj,_startX,_startY,_endX,_endY)
    {
        _obj.setPosition(_startX,_startY);
        let ref  = this;      
        setTimeout(() => {
            this.movementContineousContineousTween = this.tweens.add({
                targets: _obj,
                x:  _endX,
                y:  _endY,
                ease: 'Linear',
                duration: this.movementTime,
                callbackScope: this,
                onComplete: function(){
                        setTimeout(() => {
                            if( this.isMovementContinuous)
                            {
                                this.UpdateTimer();
                                this.movementContineousContineousTween = this.tweens.add({
                                        targets: _obj,
                                        x: _startX,
                                        y: _startY,
                                        ease: 'Linear',
                                        duration: this.movementTime,
                                        loop: -1,
                                        loopDelay : 500,
                                        onLoop  : function()
                                        {
                                            ref.UpdateTimer();
                                            // //console.log("repeat");
                                        }
                                });
                            }
                        }, 500);
                    }
            });
        }, 1000);                                       
    };
    MovementContineousInterval(_obj,_startX,_startY,_endX,_endY,_dir)
    {       
        _obj.bool = false;
        let bool = false;
        if(!this.movementContinuousIntervalBool)
        {
            this.intervalTimer = this.time.addEvent({ delay: 1000, callback: ()=>{
                if( this.movementContinuousIntervalArr.length > 0)
                {                   
                    this.movementContinuousIntervalArr.forEach(element => {
                        switch(_dir)
                        {
                            case "RTL":                            
                                        if(element.x <game.config.width + _obj.width/3  && !element.bool)
                                        { 
                                            element.x += this.movementIntervalX;                          
                                        }
                                        else
                                        {                                           
                                            if(element.x > -element.width/3)
                                            {
                                                if(!element.bool)
                                                {
                                                    setTimeout(() => {
                                                        this.UpdateTimer();
                                                        element.bool = true;
                                                    }, 500)
                                                }
                                                else
                                                {
                                                    element.x -= this.movementIntervalX; 
                                                }
                                            }
                                            else
                                            {
                                                if(element.bool)
                                                {
                                                    setTimeout(() => {
                                                        this.UpdateTimer();
                                                        element.bool = false;
                                                    }, 500)
                                                }
                                            } 
                                        }
                                        break;
                            case "LTR": 
                                        if(element.x < (game.config.width+element.width/2) && !element.bool )
                                        { 
                                            if(!bool)
                                            {
                                                setTimeout(() => {
                                                    bool = true;
                                                    this.UpdateTimer();
                                                }, 500);
                                            }
                                            else
                                            {
                                                element.x += this.movementIntervalX;
                                            }
                                        }
                                        else
                                        {
                                            if(element.x > -element.width/3)
                                            {
                                                if(!element.bool)
                                                {
                                                    setTimeout(() => {
                                                        this.UpdateTimer();
                                                        element.bool = true;
                                                    }, 500);
                                                }
                                                else
                                                {
                                                    element.x -= this.movementIntervalX;
                                                }
                                            }
                                            else
                                            {
                                                if(element.bool)
                                                {
                                                    setTimeout(() => {
                                                        this.UpdateTimer();
                                                        element.bool = false;
                                                    }, 500);
                                                }
                                            }
                                        }                      
                                        break;
                            case "TTB": 
                                        if(element.y < (game.config.height+element.height/3)  && !element.bool)
                                        { 
                                            if(!bool)
                                            {
                                                setTimeout(() => {
                                                    this.UpdateTimer();
                                                    bool = true;
                                                }, 500);
                                            }
                                            else
                                            {
                                                element.y += this.movementIntervalY;  
                                            }
                                        }
                                        else
                                        {
                                            if(element.y > 0)
                                            {
                                                if(!element.bool)
                                                {
                                                    setTimeout(() => {
                                                        this.UpdateTimer();
                                                        element.bool = true ;
                                                    }, 500);
                                                }
                                                else
                                                {
                                                    element.y -= this.movementIntervalY;  
                                                }
                                            }
                                            else
                                            {
                                                if(element.bool)
                                                {
                                                    setTimeout(() => {
                                                        this.UpdateTimer();
                                                        element.bool = false;
                                                    }, 500);
                                                }
                                            }
                                        }
                                        break;
                            case "BTT": 
                                        if(element.y > 0 && !element.bool)
                                        {        
                                            if(!bool)
                                            {
                                                setTimeout(() => {
                                                    this.UpdateTimer();
                                                    bool = true;
                                                }, 500);
                                            }  
                                            else
                                            {
                                                element.y += this.movementIntervalY;
                                            }              
                                        }
                                        else
                                        {    
                                            if(element.y < (game.config.height+element.height/3))
                                            {      
                                                if(!element.bool)
                                                {
                                                    setTimeout(() => {
                                                        this.UpdateTimer();
                                                        element.bool = true ;
                                                    }, 500);              
                                                }
                                                else
                                                {
                                                    element.y -= this.movementIntervalY;
                                                }
                                            }
                                            else
                                            {
                                                if(element.bool)
                                                {
                                                    setTimeout(() => {
                                                        this.UpdateTimer();
                                                        element.bool = false;
                                                    }, 500);
                                                }
                                            }
                                        }
                                        break;
                            case "RTLD": 
                                        if(element.x > -element.width/3 && !element.bool)
                                        { 
                                            if(element.y < game.config.height && !element.bool)
                                            {
                                                if(!bool)
                                                {
                                                    setTimeout(() => {
                                                        this.UpdateTimer();
                                                        bool = true ;
                                                    }, 500); 
                                                }  
                                                else
                                                {
                                                    element.x += this.movementIntervalX;
                                                    element.y -= this.movementIntervalY;
                                                }
                                            }
                                            else
                                            {
                                                if(element.y > -element.height/3 )
                                                {
                                                    if(!element.bool)
                                                    {
                                                        setTimeout(() => {
                                                            this.UpdateTimer();
                                                            element.bool = true ;
                                                        }, 500); 
                                                    }
                                                    else
                                                    {
                                                        element.x -= this.movementIntervalX;
                                                        element.y += this.movementIntervalY;
                                                    }
                                                }
                                                else
                                                {
                                                    if(element.bool)
                                                    {
                                                        setTimeout(() => {
                                                            this.UpdateTimer();
                                                            element.bool = false;
                                                        }, 500);
                                                    }
                                                }
                                            }                        
                                        }
                                        else
                                        {   
                                            if(element.x < game.config.width )
                                            {
                                                if(!element.bool)
                                                {
                                                    setTimeout(() => {
                                                        this.UpdateTimer();
                                                        element.bool = true ;
                                                    }, 500); 
                                                }
                                                else
                                                {
                                                    element.x -= this.movementIntervalX;
                                                    element.y += this.movementIntervalY;
                                                }
                                            }
                                            else
                                            {
                                                if(element.bool)
                                                {
                                                    setTimeout(() => {
                                                        this.UpdateTimer();
                                                        element.bool = false;
                                                    }, 500);
                                                }
                                            }
                                        }
                                        break;
                            case "LTRD": 
                                       if(element.x < (game.config.width ) && !element.bool)
                                        { 
                                            if(element.y > 0 && !element.bool)
                                            {       
                                                if(!bool)
                                                {
                                                    setTimeout(() => {
                                                        this.UpdateTimer();
                                                        bool = true ;
                                                    }, 500); 
                                                }  
                                                else
                                                {
                                                    element.x += this.movementIntervalX;
                                                    element.y -= this.movementIntervalY;
                                                }                                          
                                            }
                                            else
                                            {
                                                if(element.y < game.config.height )
                                                {
                                                    if(!element.bool)
                                                    {
                                                        this.UpdateTimer();
                                                        element.bool = true;
                                                    }
                                                    else
                                                    {
                                                        element.x -= this.movementIntervalX;
                                                        element.y += this.movementIntervalY;
                                                    }
                                                }
                                                else
                                                {
                                                    if(element.bool)
                                                    {
                                                        setTimeout(() => {
                                                            this.UpdateTimer();
                                                            element.bool = false;
                                                        }, 500);
                                                    }
                                                }
                                            }                           
                                        }
                                        else
                                        {   
                                            if(element.x >  0 )
                                            {    
                                                if(!element.bool)
                                                {
                                                    setTimeout(() => {
                                                        this.UpdateTimer();
                                                        element.bool = true ;
                                                    }, 500); 
                                                } 
                                                else
                                                {
                                                    element.x -= this.movementIntervalX;
                                                    element.y += this.movementIntervalY;
                                                }
                                            } 
                                            else
                                            {
                                                if(element.bool)
                                                {
                                                    setTimeout(() => {
                                                        this.UpdateTimer();
                                                        element.bool = false;
                                                    }, 500);
                                                }
                                            }
                                        }
                                        break;
                        }                        
                    });
                }
            }, callbackScope: this, loop:true});  
        }
        _obj.setPosition(_startX,_startY);
        setTimeout(() => {
            this.movementContineousTween = this.tweens.add({
                targets: _obj,
                x:  _endX,
                y:  _endY,
                ease: 'Linear',
                duration: 10000,
                callbackScope: this,
                onComplete: function()
                {
                    // this.UpdateTimer();
                    this.movementContinuousIntervalArr.push(_obj);             
                    this.movementContinuousIntervalBool = true;
                }
            });            
        }, 1000);
    };
    MovementIntervalContineous(_dir,_obj,_continousEndX, _continousEndY,_continousStartX, _continousStartY,)
    {
        _obj.setPosition(_continousEndX,_continousEndY);
        setTimeout(() => {
            this.intervalTimer = this.time.addEvent({ delay: 1000, callback: ()=>{  
                switch(_dir)
                {
                    case "RTL": 
                                if(_obj.x > -_obj.width/3 )
                                { 
                                    _obj.x -= this.movementIntervalX;                         
                                }
                                else
                                {
                                    this.intervalTimer.paused = true;  
                                    setTimeout(() => {
                                        this.UpdateTimer();
                                        this.MovementIntervalContineousTween(_obj,(game.config.width+_obj.width/3), _obj.y);
                                    }, 500);                      
                                }
                                break;
                    case "LTR": 
                                if(_obj.x < (game.config.width + _obj.width/2) )
                                { 
                                    _obj.x += this.movementIntervalX;
                                }
                                else
                                {
                                    this.intervalTimer.paused = true;
                                    setTimeout(() => {
                                        this.UpdateTimer();
                                        this.MovementIntervalContineousTween(_obj,-(_obj.width/3), _obj.y);    
                                    }, 500);
                                }                 
                                break;
                    case "TTB": 
                                if(_obj.y < (game.config.height + _obj.height/3) )
                                { 
                                    _obj.y += this.movementIntervalY;                           
                                }
                                else
                                {
                                    this.intervalTimer.paused = true;
                                    setTimeout(() => {
                                        this.UpdateTimer();
                                        this.MovementIntervalContineousTween(_obj, _obj.x,  -(_obj.height/3));
                                    }, 500);
                                }
                                break;
                    case "BTT": 
                                if(_obj.y > 0)
                                {                         
                                    _obj.y += this.movementIntervalY;                        
                                }
                                else
                                {          
                                    this.intervalTimer.paused = true;
                                    setTimeout(() => {
                                        this.UpdateTimer();                  
                                        this.MovementIntervalContineousTween(_obj, _obj.x,  (game.config.height+_obj.height/3));
                                    }, 500);
                                }
                                break;
                    case "RTLD":                         
                                if(_obj.x > -_obj.width/2)
                                { 
                                    if(_obj.y < game.config.height)// -_obj.height/2)
                                    {
                                        _obj.x += this.movementIntervalX;
                                        _obj.y -= this.movementIntervalY;                    
                                    }
                                    else
                                    {
                                        this.intervalTimer.paused = true;
                                        setTimeout(() => {
                                            this.UpdateTimer();
                                            this.MovementIntervalContineousTween(_obj,_continousEndX,_continousEndY);
                                        }, 500);
                                    }                        
                                }
                                else
                                {   
                                    this.intervalTimer.paused = true;
                                    setTimeout(() => {
                                        this.UpdateTimer();
                                        this.MovementIntervalContineousTween(_obj,_continousEndX,_continousEndY);
                                    }, 500);
                                }
                                break;
                    case "LTRD": 
                                if(_obj.x < (game.config.width ) )
                                { 
                                    if(_obj.y > -_obj.height/3)
                                    {
                                        _obj.x += this.movementIntervalX;
                                        _obj.y -= this.movementIntervalY;                    
                                    }
                                    else
                                    {
                                        this.intervalTimer.paused = true; 
                                        setTimeout(() => {
                                            this.UpdateTimer();
                                            this.MovementIntervalContineousTween(_obj,_continousEndX,_continousEndY);
                                        }, 500);
                                    }                           
                                }
                                else
                                {   
                                    this.intervalTimer.paused = true;
                                    setTimeout(() => {
                                        this.UpdateTimer();
                                        this.MovementIntervalContineousTween(_obj,_continousEndX,_continousEndY);     
                                    }, 500);
                                }
                                break;
                }  
            }, callbackScope: this, loop:true});               
        }, 1000);
    //    //console.log(this.intervalTimer);
    };
    MovementIntervalContineousTween(_obj,_x,_y)
    {
        let ref= this;
        this.movementContineousTween = this.tweens.add({
            targets: _obj,
            x:  _x,
            y:  _y,
            ease: 'Linear',
            duration: 10000,
            callbackScope: this,           
            onLoop  : function()
            {
                ref.UpdateTimer();
                // //console.log("repeat");
            },
            loop: -1,
            loopDelay : 500
        });
    }
    MovementIntervalInterval(_obj,_dir,_continousEndX, _continousEndY)
    {
        _obj.bool = false;
        let bool = false;
        _obj.setPosition(_continousEndX,_continousEndY);
        this.movementIntervalIntervalArr.push(_obj);
        let counter = 1;
        if(!this.movementIntervalInterval)
        {
            // //console.log("{{{{{{{{{{{{{{{{{{");//,ansArr.indexOf(_obj));
            setTimeout(() => {
                this.intervalTimer = this.time.addEvent({ delay: 1000, callback: ()=>{
                    this.movementIntervalIntervalArr.forEach(element => {
                    switch(_dir)
                    {
                        case "RTL": 
                                    if(element.x > -element.width/3  && !element.bool)
                                    { 
                                        element.x -= this.movementIntervalX;                          
                                    }
                                    else
                                    {
                                       
                                        if(element.x < game.config.width + element.width/3)
                                        {
                                            if(!element.bool)
                                            {
                                                setTimeout(() => {
                                                    this.UpdateTimer();
                                                    element.bool = true;
                                                }, 500)
                                            }
                                            else
                                            {
                                                element.x += this.movementIntervalX;
                                            }
                                        }
                                        else
                                        {
                                            if(element.bool)
                                            {
                                                setTimeout(() => {
                                                    this.UpdateTimer();
                                                    element.bool = false;
                                                }, 500)
                                            }
                                        }
                                    }
                                    break;
                        case "LTR": 
                        // //console.log("LTR");
                                    if(element.x < (game.config.width+element.width/2) && !element.bool )
                                    { 
                                        element.x += this.movementIntervalX;
                                    }
                                    else
                                    {
                                        if(element.x > -element.width/3)
                                        {
                                            if(!element.bool)
                                            {
                                                setTimeout(() => {
                                                    this.UpdateTimer();
                                                    element.bool = true;
                                                }, 500)
                                            }
                                            else
                                            {
                                                element.x -= this.movementIntervalX;
                                            }
                                        }
                                        else
                                        {
                                            if(element.bool)
                                            {
                                                setTimeout(() => {
                                                    this.UpdateTimer();
                                                    element.bool = false;
                                                }, 500)
                                            }
                                        }
                                    }                      
                                    break;
                        case "TTB": 
                                    if(element.y < (game.config.height+element.height/3)  && !element.bool)
                                    { 
                                        // if(!bool)
                                        // {
                                        //     bool = true;
                                        //     this.UpdateTimer();
                                        // }
                                        element.y += this.movementIntervalY;                           
                                    }
                                    else
                                    {
                                      
                                        if(element.y > 0)
                                        {
                                            if(!element.bool)
                                            {
                                                setTimeout(() => {
                                                    this.UpdateTimer();
                                                    element.bool = true;
                                                }, 500)
                                            }
                                            else
                                            {
                                                element.y -= this.movementIntervalY;  
                                            }
                                        }
                                        else
                                        {
                                            if(element.bool)
                                            {
                                                setTimeout(() => {
                                                    this.UpdateTimer();
                                                    element.bool = false;
                                                }, 500)
                                            }
                                        }
                                    }
                                    break;
                        case "BTT": 
                                    if(element.y > 0 && !element.bool)
                                    {                         
                                        element.y += this.movementIntervalY;                        
                                    }
                                    else
                                    {    
                                        if(element.y < (game.config.height+element.height/3))
                                        {      
                                            if(!element.bool)
                                            {
                                                setTimeout(() => {
                                                    this.UpdateTimer();
                                                    element.bool = true;
                                                }, 500)              
                                            }
                                            else
                                            {

                                                element.y -= this.movementIntervalY;
                                            }
                                        }
                                        else
                                        {
                                            if(element.bool)
                                            {
                                                setTimeout(() => {
                                                    this.UpdateTimer();
                                                    element.bool = false;
                                                }, 500)
                                            }
                                        }
                                    }
                                    break;
                        case "RTLD": 
                                    if(element.x > -element.width/2 && !element.bool)
                                    { 
                                        if(element.y < game.config.height && !element.bool)
                                        {
                                            element.x += this.movementIntervalX;
                                            element.y -= this.movementIntervalY;                    
                                        }
                                        else
                                        {
                                            if(element.y > - element.height/3 )
                                            {
                                                if(!element.bool)
                                                {
                                                    setTimeout(() => {
                                                        this.UpdateTimer();
                                                        element.bool = true;
                                                    }, 500)
                                                }
                                                else
                                                {
                                                    element.x -= this.movementIntervalX;
                                                    element.y += this.movementIntervalY;
                                                }
                                            }
                                            else
                                            {
                                                if(element.bool)
                                                {
                                                    setTimeout(() => {
                                                        this.UpdateTimer();
                                                        element.bool = false;
                                                    }, 500)
                                                }
                                            }
                                        }                        
                                    }
                                    else
                                    {   
                                        counter += 1;
                                        if(element.x < game.config.width )
                                        {
                                            if(!element.bool)
                                            {
                                                setTimeout(() => {
                                                    this.UpdateTimer();
                                                    element.bool = true;
                                                }, 500)
                                            }
                                            else
                                            {
                                                element.x -= this.movementIntervalX;
                                                element.y += this.movementIntervalY;
                                            }
                                        }
                                        else
                                        {
                                            if(element.bool)
                                            {
                                                setTimeout(() => {
                                                    this.UpdateTimer();
                                                    element.bool = false;
                                                }, 500)
                                            }
                                        }
                                    }
                                    break;
                        case "LTRD": 
                                if(element.x < (game.config.width ) && !element.bool)
                                    { 
                                        if(element.y > - element.height/3 && !element.bool)
                                        {   
                                            element.x += this.movementIntervalX;
                                            element.y -= this.movementIntervalY;                    
                                        }
                                        else
                                        {
                                            if(element.y < game.config.height)
                                            {
                                                if(!element.bool)
                                                {
                                                    setTimeout(() => {
                                                        this.UpdateTimer();
                                                        element.bool = true;
                                                    }, 500)
                                                }
                                                else
                                                {
                                                    element.y += this.movementIntervalY; 
                                                    element.x -= this.movementIntervalX;
                                                }
                                            }
                                            else
                                            {
                                                if(element.bool)
                                                {
                                                    setTimeout(() => {
                                                        this.UpdateTimer();
                                                        element.bool = false;
                                                    }, 500)
                                                }
                                            }
                                        }                           
                                    }
                                    else
                                    {   
                                        counter += 1;
                                        if(element.x > -element.width/3)
                                        {     
                                            if(!element.bool)
                                            {
                                                setTimeout(() => {
                                                    this.UpdateTimer();
                                                    element.bool = true;
                                                }, 500)
                                            }
                                            else
                                            {
                                                element.x -= this.movementIntervalX;
                                                element.y += this.movementIntervalY;
                                            }
                                        } 
                                        else
                                        {
                                            if(element.bool)
                                            {
                                                setTimeout(() => {
                                                    this.UpdateTimer();
                                                    element.bool = false;
                                                }, 500)
                                            }
                                        }
                                    }
                                    break;
                    }   
                    });
                    // if(counter ==3)
                    // {
                    //     this.intervalTimer.paused = true;
                    //     this.StopMovement();
                    // }
                }, callbackScope: this, loop:true}); 
            }, 1000);
        } 
        this.movementIntervalInterval = true; 
    };
    MovementInterval(_obj,_dir)
    {       
        let rtldBuffer;
        let m;
        // if(this.movementBuffer < 3)
        // {           
            // //console.log("IntervalMovement------------------------",_dir);
            switch(_dir)
            {
                case "RTL": 
                            if(_obj.x > -_obj.width/3 )
                            { 
                                _obj.x -= this.movementIntervalX;                          
                            }
                            else
                            {
                                // this.movementBuffer += 1;
                                setTimeout(() => {
                                    this.UpdateTimer();
                                    _obj.setPosition((_obj.prevX),_obj.y);                                    
                                }, 500);
                            }
                            break;
                case "LTR": 
                            if(_obj.x < (game.config.width+_obj.width/2) )
                            { 
                                _obj.x += this.movementIntervalX;
                            }
                            else
                            {
                                // this.movementBuffer += 1;
                                setTimeout(() => {
                                    this.UpdateTimer();
                                    _obj.setPosition((_obj.prevX),_obj.y); 
                                }, 500);
                            }                      
                            break;
                case "TTB": 
                            if(_obj.y < (game.config.height+_obj.height/3) )
                            { 
                                _obj.y += this.movementIntervalY;                           
                            }
                            else
                            {
                                this.intervalTimer.paused = true;  
                                setTimeout(() => {
                                    // this.movementBuffer += 1;     
                                    this.UpdateTimer();        
                                    // _obj.setPosition(_obj.x,-(_obj.height/3));
                                    _obj.setPosition(_obj.x,(_obj.prevY));
                                    if( this.isInetervalContinuous)
                                    {
                                        this.intervalTimer.paused = false;
                                    } 
                                }, 500);
                            }
                            break;
                case "BTT": 
                            if(_obj.y > 0)
                            {                         
                                _obj.y += this.movementIntervalY;                        
                            }
                            else
                            {                            
                                this.intervalTimer.paused = true;
                                setTimeout(() => {
                                    // this.movementBuffer += 1;
                                    this.UpdateTimer();             
                                    _obj.setPosition(_obj.x,(game.config.height+_obj.height/3));
                                    if( this.isInetervalContinuous)
                                    {
                                        this.intervalTimer.paused = false;
                                    } 
                                }, 500); 
                            }
                            break;
                case "RTLD": 
                            if(_obj.x > -_obj.width/2)
                            { 
                                if(_obj.y > -_obj.height/2)
                                {
                                    // //console.log("RTLDDDDDDDDDDDDDDDDDDDDD"+this.movementIntervalX);
                                    _obj.x += this.movementIntervalX;
                                    _obj.y += this.movementIntervalY;                    
                                }
                                else
                                {
                                    setTimeout(() => {
                                        m = ((_obj.y - _obj.prevY)/(_obj.x -  _obj.prevX));
                                        // //console.log("RTLDDDDDDDDDDDDDDDDDDDDD"+m); 
                                        let posX = (_obj.x + ((game.config.height - _obj.y)/m));
                                        let posY = (game.config.height);
                                        _obj.setPosition(posX,posY);
                                        // this.movementBuffer += 1;
                                        this.UpdateTimer();
                                    }, 500);
                                }                        
                            }
                            else
                            {   
                                setTimeout(() => {
                                    m = ((_obj.y - _obj.prevY)/(_obj.x -  _obj.prevX)); 
                                    let posX = (_obj.x + ((game.config.height - _obj.y)/m));
                                    // //console.log("RTLDDDDDDDDDDDDDDDDDDDDD"+m);
                                    let posY = (game.config.height);
                                    _obj.setPosition(posX,posY);
                                    // this.movementBuffer += 1;    
                                    this.UpdateTimer(); 
                                }, 500);
                            }
                            break;
                case "LTRD": 
                           if(_obj.x < (game.config.width + _obj.width/2) )
                            { 
                                if(_obj.y < (game.config.height +  _obj.height/3))
                                {
                                    _obj.x += this.movementIntervalX;
                                    _obj.y += this.movementIntervalY;                    
                                }
                                else
                                {
                                    setTimeout(() => {
                                        m =((_obj.y - _obj.prevY)/(_obj.x - _obj.prevX));
                                        let posX = (_obj.x + ((0 - _obj.y)/m));
                                        let posY = (0);
                                        // //console.log(posX + " RTLDDDDDDDDDDDDDDDDDDDDD "+posY);
                                        // _obj.setPosition(posX,posY);
                                        _obj.setPosition(Math.floor(posX),Math.floor(posY)); 
                                        // this.movementBuffer += 1;
                                        this.UpdateTimer();
                                    }, 500);
                                }                           
                            }
                            else
                            {       
                                setTimeout(() => {
                                    m =((_obj.y - _obj.prevY)/(_obj.x - _obj.prevX));
                                    let posX = (_obj.x +((0 - _obj.y)/m));
                                    let posY = (0);
                                    // //console.log(posX + " RTLDDDDDDDDDDDDDDDDDDDDD "+posY);
                                   _obj.setPosition(Math.floor(posX),Math.floor(posY)); 
                                   // this.movementBuffer += 1;
                                   this.UpdateTimer();
                                }, 500); 
                            }
                            break;
            }
        // }
        // else
        // {
        //     this.StopMovement("intervals");
        // }
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
        }
    };
    IntervalMovement(_obj,_startX,  _startY,_dir)
    {
        let ref = this;
        let counter = 0;
        switch(_dir)
        {
            case "RTL": 
                        _obj.visible = false; 
                        while(true)
                        {
                            _obj.x += this.movementIntervalX;                          
                             if(_obj.x < (game.config.width + _obj.width/3 ))
                            {}
                            else
                            {
                                _obj.prevX = _obj.x;
                                break;
                            }
                        }
                        _obj.visible = true;    
                        break;
            case "LTR":     _obj.visible = false; 
                            while(true)
                            {
                                _obj.x -= this.movementIntervalX;                           
                                if(_obj.x > (-_obj.width/3) )
                                {}
                                else
                                {
                                    _obj.prevX = _obj.x;
                                break;                          
                                }
                            }
                            _obj.visible = true;          
                        break;
            case "TTB":  _obj.visible = false; 
                        while(true)
                        {
                            _obj.y -= this.movementIntervalY;                           
                            if(_obj.y > (-_obj.height/3) )
                            {}
                            else
                            {
                                _obj.prevY = _obj.y;
                               break;                          
                            }
                        }
                        _obj.visible = true; 
                        break;
            case "BTT": 
                         _obj.visible = false; 
                        while(true)
                        {
                            _obj.y -= this.movementIntervalY;                        
                            if(_obj.y < (game.config.height + _obj.height/3))
                            {}
                            else
                            {   
                                _obj.prevY = _obj.y;                        
                               break;                       
                            }
                        } 
                        _obj.visible = true; 
                        break;
            case "RTLD":   _obj.visible = false; 
                            while(true)
                            {
                                _obj.x += this.movementIntervalX;
                                _obj.y += this.movementIntervalY; 
                                if(_obj.x > -_obj.width/2)
                                { 
                                    if(_obj.y > -_obj.height/2)
                                    {}
                                    else
                                    {                   
                                        break;
                                    }                        
                                }
                                else
                                {                   
                                    break;        
                                }
                            } 
                        _obj.visible = true;                           
                        break;
            case "LTRD":    _obj.visible = false;
                            while(true)
                            {
                                _obj.x += this.movementIntervalX;
                                _obj.y += this.movementIntervalY;  
                                if(_obj.x < (game.config.width + _obj.width/2) )
                                { 
                                    if(_obj.y < (game.config.height +  _obj.height/3))
                                    {}
                                    else
                                    {
                                      break;
                                    }                           
                                }
                                else
                                {        
                                    break;
                                } 
                            } 
                            _obj.visible = true;                     
                        break;
        }
        setTimeout(() => {
            this.intervalTimer = this.time.addEvent(
            {
                delay: 1000, 
                callback: ()=>
                {
                    ref.MovementInterval(_obj,_dir );
                }, 
                callbackScope: this, 
                loop:true
            });
        }, 1000);
    };
    //===========>Data to be sent to server<==============//
    CalculateResponse()
    { 
        let _level = LevelManager.GetCurrentLevelNumber();
        let _correctAnwer = this.totalCorrectAnswer;
        let _inCorrectAnswer = this.totalInCorrectAnswer;
        let _accuracy = (this.totalNumberUserClicked === 0) ? 0 : parseInt((  this.totalGamePlayed/this.totalNumberUserClicked)*100) ;
        let _totalTime = 0;
        let _avarageTime = 0;
        for (let i = 0; i < this.totalEachLevelTime.length; i++) 
        {
            _totalTime +=  this.totalEachLevelTime[i];
            
        }
        if(_totalTime > 0 && this.totalGamePlayed > 0)
        {
            _avarageTime = (_totalTime / this.totalGamePlayed);;//(this.totalGamePlayed / _totalTime);
        }
        else
        {
            _avarageTime = 0;
        }
        let _deviceDateTime = Math.round(new Date().getTime()/1000).toString();
        let _timePerQuestion = [...this.totalEachLevelTime];  
        let _score  =   (_level * this.totalCorrectAnswer * 99);
        this.ServerData(_level,_correctAnwer,_inCorrectAnswer,
                        _accuracy,_totalTime, _avarageTime,_timePerQuestion,
                        _deviceDateTime,this.comboWins,_score);
    };
    ServerData(_level,_correctAnwer,_inCorrectAnswer,
                _accuracy,_totalTime, _avarageTime,_timePerQuestion,
                _deviceDateTime,_combo,_score)
    {       
        let data =  {
                "game_id": gameId,// current game id 
                "questions_presented":  this.totalQuestionPresented,// total number of question presented
                "level": _level,  // <the level the player reached in this session at the end of the game>
                "correct_answers": _correctAnwer, // number of correct answers
                "incorrect_answers": _inCorrectAnswer, // number of incorrect answers
                "accuracy": _accuracy, // number of clicks (if >1),0/1-If the user missed the target up to 50% of the target size from the target
                "total_time": _totalTime , // 
                "average_answer_time": _avarageTime , // number of questions / total time played
                "time_per_question": _timePerQuestion, // {}
                "datetime": _deviceDateTime, //device time
                "combo": _combo, // the highest correct answers combo
                "score": _score // (user’s level)*(correct answers)*(99)
            }
            console.log("data to send ",data);
            Server.sendGameData(data,Server);
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
    };
    StopMovement()
    {
        //console.log("stop movement called",  this.movementContineousTween );        
        switch( this.movementType )
        {
            case "continuous":  this.movementContineousTween.paused  = true;
                                this.movementContineousTween.loop = 0;
                                this.movementContineousTween.callbacks.onLoop = null;
                                this.movementContineousTween.stop();
                                this.movementContineousTween.remove();
                                // this.movementContineousTween.destroy();
                                // this.movementContineousTween = null;
                                break;
            case "intervals":   this.intervalTimer.remove();
                                break;
            case "continuous-continuous":  this.movementContineousContineousTween.pause();                                          
                                            break;
            case "continuous-interval": if(!this.movementContinuousIntervalBool)
                                        {
                                            this.movementContineousTween.pause();
                                        }
                                        else
                                        {
                                            this.intervalTimer.remove();
                                        }
                                        break;
            case "intervals-continuous":  if(this.intervalTimer.paused)
                                          {
                                            //   //console.log("this.movementContineousTween",this.movementContineousTween);
                                            this.movementContineousTween.pause();
                                          }
                                          else
                                          {
                                            this.intervalTimer.remove();
                                          }
                                        break;
            case "intervals-intervals": 
                                        if(this.movementIntervalInterval)
                                        {
                                            this.intervalTimer.remove();
                                        }
                                        break;
        }  
    };
}