import { LevelManager } from "./LevelManager.js";
import { LoadAssets } from "./LoadAssets.js";
import { Server } from "./Server.js";
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
        this.emotions = [
            "Sad",
            "Happy",
            "Angry",
            "Surprised",
            "Confused"
        ];
        this.orignalEmotions = [
            "Sad",
            "Happy",
            "Angry",
            "Surprised",
            "Confused"
        ];
        this.selectedLine = [];
        this.selectedObjectPosition = []
        this.SelectedEmotion;
        this.consecutiveComboWins = 0;
        //=====> Level Data <======//
        this.numberOfAnswers;
        this.numberOfDestractor;
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
        this.northPosition = [];
        this.northEastPosition = [];
        this.northWestPosition = [];

        this.southPosition = [];
        this.southEastPosition = [];
        this.southWestPosition = [];

        this.eastPosition = [];
        this.westPosition = [];

        this.eachLevelTime = 0;//Each level time to calculate response
        this.totalEachLevelTime = [];//Each level time to calculate response
        this.eachGameTime = 0;//Each game time to calculate response
        this.totalNumberUserClicked = 0;//total number of click to calculate response
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
        //-======================For North and South============================-
        // this.longestTldbrLineNorthX = (game.config.width / 6.11, 0);
        // this.longestTldbrLineNorthY = (game.config.width/1.63, game.config.height);

        this.longestBldtrLineNorthX;
        this.longestBldtrLineNorthY;
        //=======================For NE,SE,NW,SW,E,W===========================
        this.longestTldbrRestLinesX;
        this.longestTldbrRestLinesY;

        this.longestBldtrRestLinesX
        this.longestBldtrRestLinesY;

        this.maximumLengthOfLine = 0;

        this.requirdClickForTheGame = 0;
    }

    create() {
        if (Server.platform == "favorites") {
            window.parent.postMessage({ eventName: "gameStarted", payload: null }, "*");
        }
        // SoundManager.StartSoundPlay();//Game start sound 
        //=====> Static Items <==========//        
        let headerBar = this.add.image(game.config.width / 2, game.config.height / 12, 'heading').setOrigin(0.5).setScale(scaleFactorX * 2.17, scaleFactorY * 2.5);
        headerBar.depth = 4;
        this.thumbsUp = this.add.image(game.config.width / 20, game.config.height / 12.7, "thumbs_up").setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.5, scaleFactorY * 0.5);
        this.thumbsDown = this.add.image(game.config.width / 1.05, game.config.height / 12.7, "thumbs_down").setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.5, scaleFactorY * 0.5);
        this.thumbsUp.depth = 4;
        this.thumbsDown.depth = 4;
        const style = { font: "bold 30px Arial", fill: "#fff" };
        this.thumbsUpText = this.add.text(this.thumbsUp.x + (game.config.width / 17), this.thumbsUp.y, this.totalCorrectAnswer, style).setOrigin(0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        this.thumbsDownText = this.add.text(this.thumbsDown.x - (game.config.width / 17), this.thumbsDown.y, this.totalInCorrectAnswer, style).setOrigin(0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        this.thumbsUpText.depth = 4;
        this.thumbsDownText.depth = 4;
        //============================= Words ==============================//
        this.northWord = this.add.image(Math.floor(game.config.width / 1.9), Math.floor(game.config.height / 1.136), "button_1").setOrigin(0.5, 0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        this.southWord = this.add.image(Math.floor(game.config.width / 1.9), Math.floor(game.config.height / 3.17), "button_2").setOrigin(0.5, 0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        this.northEast = this.add.image(Math.floor(game.config.width / 1.23), Math.floor(game.config.height / 1.136), "button_3").setOrigin(0.5, 0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        this.northWest = this.add.image(Math.floor(game.config.width / 5.48), Math.floor(game.config.height / 1.136), "button_4").setOrigin(0.5, 0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        this.southWest = this.add.image(Math.floor(game.config.width / 5.04), Math.floor(game.config.height / 3.17), "button_4").setOrigin(0.5, 0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        this.southEast = this.add.image(Math.floor(game.config.width / 1.23), Math.floor(game.config.height / 3.17), "button_4").setOrigin(0.5, 0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        this.east = this.add.image(Math.floor(game.config.width / 5.04), Math.floor(game.config.height / 1.685), "button_4").setOrigin(0.5, 0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        this.west = this.add.image(Math.floor(game.config.width / 1.23), Math.floor(game.config.height / 1.685), "button_4").setOrigin(0.5, 0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        this.northWord.depth = 4;
        this.southWord.depth = 4;
        this.northEast.depth = 4;
        this.northWest.depth = 4;
        this.southWest.depth = 4;
        this.southEast.depth = 4;
        this.west.depth = 4;
        this.east.depth = 4;
        //======================== Emotions ======================================//

        const emotionStyle = { font: " 35px CCBellyLaugh", fill: "#fff" };
        let currentLevelEmotions = [];
        this.emotion1 = this.add.text(this.southPosition.x, this.southPosition.y, "", emotionStyle).setOrigin(0.5);
        this.emotion1.depth = 4;
        //==============================
        this.timer = this.time.addEvent({ delay: 1000, callback: this.UpdateTimer, callbackScope: this, loop: true });
        this.timer.paused = true;
        this.eachLevelTimer = this.time.addEvent({ delay: 100, callback: this.UpdateEachLevelTimer, callbackScope: this, loop: true });
        this.eachLevelTimer.paused = true;
        this.rotateTimer = this.time.addEvent({
            delay: (10),
            callback: this.UpdateRotateTimer,
            callbackScope: this, loop: true
        });
        this.rotateTimer.paused = true;

        //===> Game time <=====//
        this.GameTimer();                         // commented out for drawing the lines
        //====> Selecting Background <======//
        this.levelBackground = LevelManager.DecideLevelBackground();
        this.bg = this.add.image(game.config.width / 2, game.config.height / 2, this.levelBackground).setOrigin(0.5, 0.5).setScale(scaleFactorX * 1, scaleFactorY * 1);
        this.bg.setInteractive();
        this.bg.on("pointerdown", (pointer, x, y, event) => this.OnBackgroundClick());

        this.CreateTimer();
        //======> createing initial level <====//
        this.CreateLevel();                        // commented out for drawing the lines
        // this.timer.paused = false;     
        this.BannerCreateAndHide("GAME_START", true);
        // this.northPositionDecide(); 
        // this.ImageForCurrentLevel();
        this.SetDirectionLines();
        this.SelectObjectPosition();
        let tempArr = [];
        //---------------------------------------------------------
        for (let i = 0; i < this.selectedLine.length; i++) {

            tempArr.push(LevelManager.CalculateDistanceBetweenPoints(this.selectedLine[i][0][0], this.selectedLine[i][0][1], this.selectedLine[i][1][0], this.selectedLine[i][1][1]));
        }
        //------------------------------------------------------------
        // console.log('LevelManager.answerLocation : ' , LevelManager.answerLocation);
        // console.log("temp=========="+Math.max(...tempArr));
        this.maximumLengthOfLine = Math.max(...tempArr);
    };

    SelectObjectPosition() {
        if (LevelManager.answerLocation == "N") {
            this.selectedObjectPosition = [
                [Math.floor(game.config.width / 24.93), Math.floor(game.config.height / 3.63)],
                [Math.floor(game.config.width / 8.45), Math.floor(game.config.height / 3.63)],
                [Math.floor(game.config.width / 4.75), Math.floor(game.config.height / 3.63)],
                [Math.floor(game.config.width / 3.459), Math.floor(game.config.height / 3.63)],
                [Math.floor(game.config.width / 2.758), Math.floor(game.config.height / 3.63)],
                [Math.floor(game.config.width / 2.24), Math.floor(game.config.height / 3.63)],
                [Math.floor(game.config.width / 1.871), Math.floor(game.config.height / 3.63)],
                [Math.floor(game.config.width / 1.610), Math.floor(game.config.height / 3.63)],
                [Math.floor(game.config.width / 1.415), Math.floor(game.config.height / 3.63)],
                [Math.floor(game.config.width / 1.291), Math.floor(game.config.height / 3.63)],
                [Math.floor(game.config.width / 1.172), Math.floor(game.config.height / 3.63)],
                [Math.floor(game.config.width / 1.078), Math.floor(game.config.height / 3.63)],
            ]
            return;
        }
        else if (LevelManager.answerLocation == "S") {
            this.selectedObjectPosition = [
                [Math.floor(game.config.width / 24.93), Math.floor(game.config.height / 1.202)],
                [Math.floor(game.config.width / 8.45), Math.floor(game.config.height / 1.202)],
                [Math.floor(game.config.width / 4.75), Math.floor(game.config.height / 1.202)],
                [Math.floor(game.config.width / 3.459), Math.floor(game.config.height / 1.202)],
                [Math.floor(game.config.width / 2.758), Math.floor(game.config.height / 1.202)],
                [Math.floor(game.config.width / 2.24), Math.floor(game.config.height / 1.202)],
                [Math.floor(game.config.width / 1.871), Math.floor(game.config.height / 1.202)],
                [Math.floor(game.config.width / 1.610), Math.floor(game.config.height / 1.202)],
                [Math.floor(game.config.width / 1.415), Math.floor(game.config.height / 1.202)],
                [Math.floor(game.config.width / 1.291), Math.floor(game.config.height / 1.202)],
                [Math.floor(game.config.width / 1.172), Math.floor(game.config.height / 1.202)],
                [Math.floor(game.config.width / 1.078), Math.floor(game.config.height / 1.202)],
            ]
            return;
        }
        else if (LevelManager.answerLocation == "NW") {
            this.selectedObjectPosition = [
                [Math.floor(game.config.width / 10.32), Math.floor(game.config.height / 4.32)],
                [Math.floor(game.config.width / 5.147), Math.floor(game.config.height / 4.32)],
                [Math.floor(game.config.width / 3.398), Math.floor(game.config.height / 4.32)],
                [Math.floor(game.config.width / 2.553), Math.floor(game.config.height / 4.32)],
                [Math.floor(game.config.width / 2.012), Math.floor(game.config.height / 4.32)],
                [Math.floor(game.config.width / 1.652), Math.floor(game.config.height / 4.32)],
                [Math.floor(game.config.width / 10.32), Math.floor(game.config.height / 2.088)],
                [Math.floor(game.config.width / 5.147), Math.floor(game.config.height / 2.088)],
                [Math.floor(game.config.width / 3.398), Math.floor(game.config.height / 2.088)],
                [Math.floor(game.config.width / 2.553), Math.floor(game.config.height / 2.088)],
                [Math.floor(game.config.width / 2.012), Math.floor(game.config.height / 2.088)],
                [Math.floor(game.config.width / 1.652), Math.floor(game.config.height / 2.088)],
            ]
            return;
        }
        else if (LevelManager.answerLocation == "W") {
            this.selectedObjectPosition = [
                [Math.floor(game.config.width / 10.32), Math.floor(game.config.height / 2.812)],
                [Math.floor(game.config.width / 5.147), Math.floor(game.config.height / 2.812)],
                [Math.floor(game.config.width / 3.398), Math.floor(game.config.height / 2.812)],
                [Math.floor(game.config.width / 2.553), Math.floor(game.config.height / 2.812)],
                [Math.floor(game.config.width / 2.012), Math.floor(game.config.height / 2.812)],
                [Math.floor(game.config.width / 1.652), Math.floor(game.config.height / 2.812)],
                [Math.floor(game.config.width / 10.32), Math.floor(game.config.height / 1.648)],
                [Math.floor(game.config.width / 5.147), Math.floor(game.config.height / 1.648)],
                [Math.floor(game.config.width / 3.398), Math.floor(game.config.height / 1.648)],
                [Math.floor(game.config.width / 2.553), Math.floor(game.config.height / 1.648)],
                [Math.floor(game.config.width / 2.012), Math.floor(game.config.height / 1.648)],
                [Math.floor(game.config.width / 1.652), Math.floor(game.config.height / 1.648)],
            ]
            return;
        }
        else if (LevelManager.answerLocation == "SW") {
            this.selectedObjectPosition = [
                [Math.floor(game.config.width / 10.32), Math.floor(game.config.height / 1.656)],
                [Math.floor(game.config.width / 5.147), Math.floor(game.config.height / 1.656)],
                [Math.floor(game.config.width / 3.398), Math.floor(game.config.height / 1.656)],
                [Math.floor(game.config.width / 2.553), Math.floor(game.config.height / 1.656)],
                [Math.floor(game.config.width / 2.012), Math.floor(game.config.height / 1.656)],
                [Math.floor(game.config.width / 1.652), Math.floor(game.config.height / 1.656)],
                [Math.floor(game.config.width / 10.32), Math.floor(game.config.height / 1.172)],
                [Math.floor(game.config.width / 5.147), Math.floor(game.config.height / 1.172)],
                [Math.floor(game.config.width / 3.398), Math.floor(game.config.height / 1.172)],
                [Math.floor(game.config.width / 2.553), Math.floor(game.config.height / 1.172)],
                [Math.floor(game.config.width / 2.012), Math.floor(game.config.height / 1.172)],
                [Math.floor(game.config.width / 1.652), Math.floor(game.config.height / 1.172)],
            ]
            return;
        }
        else if (LevelManager.answerLocation == "NE") {
            this.selectedObjectPosition = [
                [Math.floor(game.config.width / 1.1059), Math.floor(game.config.height / 4.32)],
                [Math.floor(game.config.width / 1.2427), Math.floor(game.config.height / 4.33)],
                [Math.floor(game.config.width / 1.415), Math.floor(game.config.height / 4.33)],
                [Math.floor(game.config.width / 1.6452), Math.floor(game.config.height / 4.33)],
                [Math.floor(game.config.width / 1.957), Math.floor(game.config.height / 4.33)],
                [Math.floor(game.config.width / 2.5263), Math.floor(game.config.height / 4.33)],
                [Math.floor(game.config.width / 1.104), Math.floor(game.config.height / 2.08494)],
                [Math.floor(game.config.width / 1.2411), Math.floor(game.config.height / 2.08494)],
                [Math.floor(game.config.width / 1.4159), Math.floor(game.config.height / 2.08494)],
                [Math.floor(game.config.width / 1.6681), Math.floor(game.config.height / 2.08494)],
                [Math.floor(game.config.width / 2.00626), Math.floor(game.config.height / 2.097)],
                [Math.floor(game.config.width / 2.526), Math.floor(game.config.height / 2.08494)]
            ];
            return;
        }
        else if (LevelManager.answerLocation == "E") {
            this.selectedObjectPosition = [
                [Math.floor(game.config.width / 1.109), Math.floor(game.config.height / 2.812)],
                [Math.floor(game.config.width / 1.245), Math.floor(game.config.height / 2.812)],
                [Math.floor(game.config.width / 1.421), Math.floor(game.config.height / 2.812)],
                [Math.floor(game.config.width / 1.666), Math.floor(game.config.height / 2.812)],
                [Math.floor(game.config.width / 2.0062), Math.floor(game.config.height / 2.812)],
                [Math.floor(game.config.width / 2.543), Math.floor(game.config.height / 2.812)],
                [Math.floor(game.config.width / 1.109), Math.floor(game.config.height / 1.648)],
                [Math.floor(game.config.width / 1.245), Math.floor(game.config.height / 1.648)],
                [Math.floor(game.config.width / 1.421), Math.floor(game.config.height / 1.648)],
                [Math.floor(game.config.width / 1.666), Math.floor(game.config.height / 1.648)],
                [Math.floor(game.config.width / 2.0062), Math.floor(game.config.height / 1.648)],
                [Math.floor(game.config.width / 2.543), Math.floor(game.config.height / 1.648)]
            ];

            return;
        }
        else if (LevelManager.answerLocation == "SE") {
            this.selectedObjectPosition = [
                [Math.floor(game.config.width / 1.109), Math.floor(game.config.height / 1.656)],
                [Math.floor(game.config.width / 1.245), Math.floor(game.config.height / 1.656)],
                [Math.floor(game.config.width / 1.421), Math.floor(game.config.height / 1.656)],
                [Math.floor(game.config.width / 1.666), Math.floor(game.config.height / 1.656)],
                [Math.floor(game.config.width / 2.0062), Math.floor(game.config.height / 1.656)],
                [Math.floor(game.config.width / 2.543), Math.floor(game.config.height / 1.656)],
                [Math.floor(game.config.width / 1.109), Math.floor(game.config.height / 1.172)],
                [Math.floor(game.config.width / 1.245), Math.floor(game.config.height / 1.172,)],
                [Math.floor(game.config.width / 1.421), Math.floor(game.config.height / 1.172)],
                [Math.floor(game.config.width / 1.666), Math.floor(game.config.height / 1.172)],
                [Math.floor(game.config.width / 2.0062), Math.floor(game.config.height / 1.172)],
                [Math.floor(game.config.width / 2.543), Math.floor(game.config.height / 1.172)]
            ];
            return;
        }
    }

    SetDirectionLines() {
        // console.log('SetDirectionLines------------------------------')
        switch (LevelManager.movementDirection) {
            case "TTB":
                if (LevelManager.answerLocation == "N" || LevelManager.answerLocation == "S") {
                    this.selectedLine = [
                        [
                            [game.config.width / 24, 0],
                            [game.config.width / 24, game.config.height]
                        ],
                        [
                            [game.config.width / 8.34, 0],
                            [game.config.width / 8.34, game.config.height]
                        ],
                        [
                            [game.config.width / 4.717, 0],
                            [game.config.width / 4.717, game.config.height]
                        ],
                        [
                            [game.config.width / 3.44, 0],
                            [game.config.width / 3.44, game.config.height]
                        ],
                        [
                            [game.config.width / 2.75, 0],
                            [game.config.width / 2.75, game.config.height]
                        ],
                        [
                            [game.config.width / 2.232, 0],
                            [game.config.width / 2.232, game.config.height]
                        ],
                        [
                            [game.config.width / 1.865, 0],
                            [game.config.width / 1.865, game.config.height]
                        ],
                        [
                            [game.config.width / 1.606, 0],
                            [game.config.width / 1.606, game.config.height]
                        ],
                        [
                            [game.config.width / 1.4107, 0],
                            [game.config.width / 1.4107, game.config.height]
                        ],
                        [
                            [game.config.width / 1.289, 0],
                            [game.config.width / 1.289, game.config.height]
                        ],
                        [
                            [game.config.width / 1.172, 0],
                            [game.config.width / 1.172, game.config.height]
                        ],
                        [
                            [game.config.width / 1.078, 0],
                            [game.config.width / 1.078, game.config.height]
                        ]
                    ];
                    return;
                }
                else {
                    this.selectedLine = [
                        [
                            [game.config.width / 10.15, 0],
                            [game.config.width / 10.15, game.config.height]
                        ],
                        [
                            [game.config.width / 5.079, 0],
                            [game.config.width / 5.079, game.config.height]
                        ],
                        [
                            [game.config.width / 3.386, 0],
                            [game.config.width / 3.386, game.config.height]
                        ],
                        [
                            [game.config.width / 2.539, 0],
                            [game.config.width / 2.539, game.config.height]
                        ],
                        [
                            [game.config.width / 2.0062, 0],
                            [game.config.width / 2.0062, game.config.height]
                        ],
                        [
                            [game.config.width / 1.649, 0],
                            [game.config.width / 1.649, game.config.height]
                        ],
                        [
                            [game.config.width / 1.419, 0],
                            [game.config.width / 1.419, game.config.height]
                        ],
                        [
                            [game.config.width / 1.245, 0],
                            [game.config.width / 1.245, game.config.height]
                        ],
                        [
                            [game.config.width / 1.109, 0],
                            [game.config.width / 1.109, game.config.height]
                        ]
                    ];
                    return
                }
            case "BTT":
                if (LevelManager.answerLocation == "N" || LevelManager.answerLocation == "S") {
                    this.selectedLine = [
                        [
                            [game.config.width / 24, game.config.height],
                            [game.config.width / 24, 0]
                        ],
                        [
                            [game.config.width / 8.34, game.config.height],
                            [game.config.width / 8.34, 0]
                        ],
                        [
                            [game.config.width / 4.717, game.config.height],
                            [game.config.width / 4.717, 0],
                        ],
                        [
                            [game.config.width / 3.44, game.config.height],
                            [game.config.width / 3.44, 0],
                        ],
                        [
                            [game.config.width / 2.75, game.config.height],
                            [game.config.width / 2.75, 0],
                        ],
                        [
                            [game.config.width / 2.232, game.config.height],
                            [game.config.width / 2.232, 0],
                        ],
                        [
                            [game.config.width / 1.865, game.config.height],
                            [game.config.width / 1.865, 0],
                        ],
                        [
                            [game.config.width / 1.606, game.config.height],
                            [game.config.width / 1.606, 0],
                        ],
                        [
                            [game.config.width / 1.4107, game.config.height],
                            [game.config.width / 1.4107, 0],
                        ],
                        [
                            [game.config.width / 1.289, game.config.height],
                            [game.config.width / 1.289, 0],
                        ],
                        [
                            [game.config.width / 1.172, game.config.height],
                            [game.config.width / 1.172, 0],
                        ],
                        [
                            [game.config.width / 1.078, game.config.height],
                            [game.config.width / 1.078, 0],
                        ]
                    ];
                    return;
                }

                else {
                    this.selectedLine = [
                        [
                            [game.config.width / 10.15, game.config.height],
                            [game.config.width / 10.15, 0]
                        ],
                        [
                            [game.config.width / 5.079, game.config.height],
                            [game.config.width / 5.079, 0]
                        ],
                        [
                            [game.config.width / 3.386, game.config.height],
                            [game.config.width / 3.386, 0]
                        ],
                        [
                            [game.config.width / 2.539, game.config.height],
                            [game.config.width / 2.539, 0]
                        ],
                        [
                            [game.config.width / 2.0062, game.config.height],
                            [game.config.width / 2.0062, 0]
                        ],
                        [
                            [game.config.width / 1.649, game.config.height],
                            [game.config.width / 1.649, 0]
                        ],
                        [
                            [game.config.width / 1.419, game.config.height],
                            [game.config.width / 1.419, 0]
                        ],
                        [
                            [game.config.width / 1.245, game.config.height],
                            [game.config.width / 1.245, 0]
                        ],
                        [
                            [game.config.width / 1.109, game.config.height],
                            [game.config.width / 1.109, 0]
                        ]
                    ];
                    // console.log("==================",this.selectedLine);
                    return;
                }
            case 'RTL':
                if (LevelManager.answerLocation == "N") {
                    this.selectedLine = [
                        [
                            [0, game.config.height / 3.6],
                            [game.config.width, game.config.height / 3.6]
                        ]
                    ];
                    return;
                }
                else if (LevelManager.answerLocation == "S") {
                    this.selectedLine = [
                        [
                            [0, game.config.height / 1.2],
                            [game.config.width, game.config.height / 1.2]
                        ]
                    ];
                    return;
                }
                else {
                    this.selectedLine = [
                        [
                            [0, game.config.height / 4.3],
                            [game.config.width, game.config.height / 4.3]
                        ],
                        [
                            [0, game.config.height / 2.8],
                            [game.config.width, game.config.height / 2.8]
                        ],
                        [
                            [0, game.config.height / 2.08],
                            [game.config.width, game.config.height / 2.08]
                        ],
                        [
                            [0, game.config.height / 1.653],
                            [game.config.width, game.config.height / 1.653]
                        ],
                        [
                            [0, game.config.height / 1.372],
                            [game.config.width, game.config.height / 1.372]
                        ],
                        [
                            [0, game.config.height / 1.172],
                            [game.config.width, game.config.height / 1.172]
                        ]
                    ];
                    return;
                }
            case "LTR":
                if (LevelManager.answerLocation == "N") {
                    this.selectedLine = [
                        [
                            [game.config.width, game.config.height / 3.6],
                            [0, game.config.height / 3.6]
                        ]
                    ];
                    return;
                }
                else if (LevelManager.answerLocation == "S") {
                    this.selectedLine = [
                        [
                            [game.config.width, game.config.height / 1.2],
                            [0, game.config.height / 1.2],
                        ]
                    ];
                    return;
                }
                else {
                    this.selectedLine = [
                        [
                            [game.config.width, game.config.height / 4.3],
                            [0, game.config.height / 4.3],
                        ],
                        [
                            [game.config.width, game.config.height / 2.8],
                            [0, game.config.height / 2.8],
                        ],
                        [
                            [game.config.width, game.config.height / 2.08],
                            [0, game.config.height / 2.08],
                        ],
                        [
                            [game.config.width, game.config.height / 1.653],
                            [0, game.config.height / 1.653],
                        ],
                        [
                            [game.config.width, game.config.height / 1.372],
                            [0, game.config.height / 1.372],
                        ],
                        [
                            [game.config.width, game.config.height / 1.172],
                            [0, game.config.height / 1.172],
                        ]
                    ];
                    return;
                }
            case "TLDBR":
                if (LevelManager.answerLocation == "N" || LevelManager.answerLocation == "S") {
                    this.selectedLine = [
                        [
                            [0, game.config.height / 1.3391],
                            [game.config.width / 8.458, game.config.height]
                        ],
                        [
                            [0, game.config.height / 1.782],
                            [game.config.width / 5.28, game.config.height]
                        ],
                        [
                            [0, game.config.height / 2.798],
                            [game.config.width / 3.54, game.config.height]
                        ],
                        [
                            [0, game.config.height / 5.34],
                            [game.config.width / 2.72, game.config.height]
                        ],
                        [
                            [0, game.config.height / 75],
                            [game.config.width / 2.3, game.config.height]
                        ],
                        [
                            [game.config.width / 10.72, 0],
                            [game.config.width / 1.929, game.config.height]
                        ],
                        [
                            [game.config.width / 6.11, 0],
                            [game.config.width / 1.63, game.config.height]
                        ],
                        [
                            [game.config.width / 4.218, 0],
                            [game.config.width / 1.421, game.config.height]
                        ],
                        [
                            [game.config.width / 3.086, 0],
                            [game.config.width / 1.275, game.config.height]
                        ],
                        [
                            [game.config.width / 2.412, 0],
                            [game.config.width / 1.182, game.config.height]
                        ],
                        [
                            [game.config.width / 1.995, 0],
                            [game.config.width / 1.079, game.config.height]
                        ],
                        [
                            [game.config.width / 1.678, 0],
                            [game.config.width / 1.0068, game.config.height]
                        ],
                        [
                            [game.config.width / 1.515, 0],
                            [game.config.width, game.config.height / 1.202]
                        ],
                        [
                            [game.config.width / 1.369, 0],
                            [game.config.width, game.config.height / 1.643]
                        ],
                        [
                            [game.config.width / 1.24, 0],
                            [game.config.width, game.config.height / 2.24]
                        ]
                    ];
                    // console.log('selected line TLDBR if part : ');
                    return;
                }
                else {
                    this.selectedLine = [
                        [
                            [0, game.config.height / 1.375],
                            [game.config.width / 4.582, game.config.height]
                        ],
                        [
                            [0, game.config.height / 1.656],
                            [game.config.width / 3.248, game.config.height]
                        ],
                        [
                            [0, game.config.height / 2.088],
                            [game.config.width / 2.467, game.config.height]
                        ],
                        [
                            [0, game.config.height / 2.8125],
                            [game.config.width / 1.975, game.config.height]
                        ],
                        [
                            [0, game.config.height / 4.268],
                            [game.config.width / 1.65, game.config.height]
                        ],
                        [
                            [0, game.config.height / 8.852],
                            [game.config.width / 1.382, game.config.height]
                        ],
                        [
                            [0, 0],
                            [game.config.width / 1.212, game.config.height]
                        ],
                        [
                            [game.config.width / 9.5, 0],
                            [game.config.width / 1.081, game.config.height]
                        ],
                        [
                            [game.config.width / 4.848, 0],
                            [game.config.width, game.config.height / 1.0315]
                        ],
                        [
                            [game.config.width / 3.0379, 0],
                            [game.config.width, game.config.height / 1.1726]
                        ],
                        [
                            [game.config.width / 2.3674, 0],
                            [game.config.width, game.config.height / 1.384]
                        ],
                        [
                            [game.config.width / 1.92, 0],
                            [game.config.width, game.config.height / 1.674]
                        ],
                        [
                            [game.config.width / 1.6134, 0],
                            [game.config.width, game.config.height / 2.101]
                        ],
                        [
                            [game.config.width / 1.3763, 0],
                            [game.config.width, game.config.height / 2.8125]
                        ]
                    ];
                    // console.log('selected line TLDBR else part : ')

                    return;
                }
            case "BRDTL":
                if (LevelManager.answerLocation == "N" || LevelManager.answerLocation == "S") {
                    this.selectedLine = [
                        [
                            [game.config.width / 8.458, game.config.height],
                            [0, game.config.height / 1.3391],
                        ],
                        [
                            [game.config.width / 5.28, game.config.height],
                            [0, game.config.height / 1.782],
                        ],
                        [
                            [game.config.width / 3.54, game.config.height],
                            [0, game.config.height / 2.798],
                        ],
                        [
                            [game.config.width / 2.72, game.config.height],
                            [0, game.config.height / 5.34],
                        ],
                        [
                            [game.config.width / 2.3, game.config.height],
                            [0, game.config.height / 75],
                        ],
                        [
                            [game.config.width / 1.929, game.config.height],
                            [game.config.width / 10.72, 0],
                        ],
                        [
                            [game.config.width / 1.63, game.config.height],
                            [game.config.width / 6.11, 0],
                        ],
                        [
                            [game.config.width / 1.421, game.config.height],
                            [game.config.width / 4.218, 0],
                        ],
                        [
                            [game.config.width / 1.275, game.config.height],
                            [game.config.width / 3.086, 0],
                        ],
                        [
                            [game.config.width / 1.182, game.config.height],
                            [game.config.width / 2.412, 0],
                        ],
                        [
                            [game.config.width / 1.079, game.config.height],
                            [game.config.width / 1.995, 0],
                        ],
                        [
                            [game.config.width / 1.0068, game.config.height],
                            [game.config.width / 1.678, 0],
                        ],
                        [
                            [game.config.width, game.config.height / 1.202],
                            [game.config.width / 1.515, 0]
                        ],
                        [
                            [game.config.width, game.config.height / 1.643],
                            [game.config.width / 1.369, 0],
                        ],
                        [
                            [game.config.width, game.config.height / 2.24],
                            [game.config.width / 1.24, 0],
                        ]
                    ];
                    return;
                }
                else {
                    // console.log('enter over here when movement is Brdtl and ans wers pos is NE')
                    this.selectedLine = [
                        [
                            [game.config.width / 4.582, game.config.height],
                            [0, game.config.height / 1.375]
                        ],
                        [
                            [game.config.width / 3.248, game.config.height],
                            [0, game.config.height / 1.656]
                        ],
                        [
                            [game.config.width / 2.467, game.config.height],
                            [0, game.config.height / 2.088]
                        ],
                        [
                            [game.config.width / 1.975, game.config.height],
                            [0, game.config.height / 2.8125]
                        ],
                        [
                            [game.config.width / 1.65, game.config.height],
                            [0, game.config.height / 4.268]
                        ],
                        [
                            [game.config.width / 1.382, game.config.height],
                            [0, game.config.height / 8.852]
                        ],
                        [
                            [game.config.width / 1.212, game.config.height],
                            [0, 0]
                        ],
                        [
                            [game.config.width / 1.081, game.config.height],
                            [game.config.width / 9.5, 0]
                        ],
                        [
                            [game.config.width, game.config.height / 1.0315],
                            [game.config.width / 4.848, 0]
                        ],
                        [
                            [game.config.width, game.config.height / 1.1726],
                            [game.config.width / 3.0379, 0],
                        ],
                        [
                            [game.config.width, game.config.height / 1.384],
                            [game.config.width / 2.3674, 0]
                        ],
                        [
                            [game.config.width, game.config.height / 1.674],
                            [game.config.width / 1.92, 0]
                        ],
                        [
                            [game.config.width, game.config.height / 2.101],
                            [game.config.width / 1.6134, 0]
                        ],
                        [
                            [game.config.width, game.config.height / 2.8125],
                            [game.config.width / 1.3763, 0]
                        ]
                    ];
                    return;
                }
            case "BLDTR":
                if (LevelManager.answerLocation == "N" || LevelManager.answerLocation == "S") {
                    this.selectedLine = [
                        [
                            [game.config.width, game.config.height / 1.547],
                            [game.config.width / 1.158, game.config.height]
                        ],
                        [
                            [game.config.width, game.config.height / 2.164],
                            [game.config.width / 1.27, game.config.height]
                        ],
                        [
                            [game.config.width, game.config.height / 3.64],
                            [game.config.width / 1.41, game.config.height]
                        ],
                        [
                            [game.config.width, game.config.height / 10.384],
                            [game.config.width / 1.5635, game.config.height]
                        ],
                        [
                            [game.config.width / 1.037, 0],
                            [game.config.width / 1.8045, game.config.height]
                        ],
                        [
                            [game.config.width / 1.119, 0],
                            [game.config.width / 2.1573, game.config.height]
                        ],
                        [
                            [game.config.width / 1.198, 0],
                            [game.config.width / 2.719, game.config.height]
                        ],
                        [
                            [game.config.width / 1.335, 0],
                            [game.config.width / 3.542, game.config.height]
                        ],
                        [
                            [game.config.width / 4.694, 0],
                            [game.config.width / 1.525, 0]
                        ],
                        [
                            [game.config.width / 1.518, 0],
                            [game.config.width / 4.660, game.config.height]
                        ],
                        [
                            [game.config.width / 1.769, 0],
                            [game.config.width / 7.30, game.config.height]
                        ],
                        [
                            [game.config.width / 2.07, 0],
                            [game.config.width / 21.57, game.config.height]
                        ],
                        [
                            [game.config.width / 2.421, 0],
                            [0, game.config.height / 1.087]
                        ],
                        [
                            [game.config.width / 2.874, 0],
                            [0, game.config.height / 1.465]
                        ],
                        [
                            [game.config.width / 3.6, 0],
                            [0, game.config.height / 2]
                        ],
                        [
                            [game.config.width / 5.106, 0],
                            [0, game.config.height / 2.911]
                        ]
                    ];
                    return;
                }
                else {
                    this.selectedLine = [
                        [
                            [game.config.width, game.config.height / 1.375],
                            [game.config.width / 1.28, game.config.height]
                        ],
                        [
                            [game.config.width, game.config.height / 1.661],
                            [game.config.width / 1.460, game.config.height]
                        ],
                        [
                            [game.config.width, game.config.height / 2.068],
                            [game.config.width / 1.704, game.config.height]
                        ],
                        [
                            [game.config.width, game.config.height / 2.834],
                            [game.config.width / 2.051, game.config.height]
                        ],
                        [
                            [game.config.width, game.config.height / 4.32],
                            [game.config.width / 2.519, game.config.height]
                        ],
                        [
                            [game.config.width, game.config.height / 8.609],
                            [game.config.width / 3.5555, game.config.height]
                        ],
                        [
                            [game.config.width / 1.008, 0],
                            [game.config.width / 5.647, game.config.height]
                        ],
                        [
                            [game.config.width / 1.116, 0],
                            [game.config.width / 12.71, game.config.height]
                        ],
                        [
                            [game.config.width / 1.264, 0],
                            [0, game.config.height / 1.0295]
                        ],
                        [
                            [game.config.width / 1.4918, 0],
                            [0, game.config.height / 1.175]
                        ],
                        [
                            [game.config.width / 1.7534, 0],
                            [0, game.config.height / 1.375]
                        ],
                        [
                            [game.config.width / 2.044, 0],
                            [0, game.config.height / 1.682]
                        ],
                        [
                            [game.config.width / 2.5, 0],
                            [0, game.config.height / 2.142]
                        ],
                        [
                            [game.config.width / 3.555, 0],
                            [0, game.config.height / 2.8125]
                        ]
                    ];
                    return;
                }
            case "TRDBL":
                if (LevelManager.answerLocation == "N" || LevelManager.answerLocation == "S") {
                    this.selectedLine = [
                        [
                            [game.config.width / 1.158, game.config.height],
                            [game.config.width, game.config.height / 1.547]
                        ],
                        [
                            [game.config.width / 1.27, game.config.height],
                            [game.config.width, game.config.height / 2.164]
                        ],
                        [
                            [game.config.width / 1.41, game.config.height],
                            [game.config.width, game.config.height / 3.64]
                        ],
                        [
                            [game.config.width / 1.5635, game.config.height],
                            [game.config.width, game.config.height / 10.384]
                        ],
                        [
                            [game.config.width / 1.8045, game.config.height],
                            [game.config.width / 1.037, 0]
                        ],
                        [
                            [game.config.width / 2.1573, game.config.height],
                            [game.config.width / 1.119, 0]
                        ],
                        [
                            [game.config.width / 2.719, game.config.height],
                            [game.config.width / 1.198, 0]
                        ],
                        [
                            [game.config.width / 3.542, game.config.height],
                            [game.config.width / 1.335, 0]
                        ],
                        [
                            [game.config.width / 1.525, 0],
                            [game.config.width / 4.694, 0]
                        ],
                        [
                            [game.config.width / 4.660, game.config.height],
                            [game.config.width / 1.518, 0]
                        ],
                        [
                            [game.config.width / 7.30, game.config.height],
                            [game.config.width / 1.769, 0]
                        ],
                        [
                            [game.config.width / 21.57, game.config.height],
                            [game.config.width / 2.07, 0]
                        ],
                        [
                            [0, game.config.height / 1.087],
                            [game.config.width / 2.421, 0]
                        ],
                        [
                            [0, game.config.height / 1.465],
                            [game.config.width / 2.874, 0]
                        ],
                        [
                            [0, game.config.height / 2],
                            [game.config.width / 3.6, 0]
                        ],
                        [
                            [0, game.config.height / 2.911],
                            [game.config.width / 5.106, 0]
                        ]
                    ];
                    return;
                }
                else {

                    this.selectedLine = [
                        [
                            [game.config.width / 1.28, game.config.height],
                            [game.config.width, game.config.height / 1.375]
                        ],
                        [
                            [game.config.width / 1.460, game.config.height],
                            [game.config.width, game.config.height / 1.661]
                        ],
                        [
                            [game.config.width / 1.704, game.config.height],
                            [game.config.width, game.config.height / 2.068]
                        ],
                        [
                            [game.config.width / 2.051, game.config.height],
                            [game.config.width, game.config.height / 2.834]
                        ],
                        [
                            [game.config.width / 2.519, game.config.height],
                            [game.config.width, game.config.height / 4.32]
                        ],
                        [
                            [game.config.width / 3.5555, game.config.height],
                            [game.config.width, game.config.height / 8.609]
                        ],
                        [
                            [game.config.width / 5.647, game.config.height],
                            [game.config.width / 1.008, 0]
                        ],
                        [
                            [game.config.width / 12.71, game.config.height],
                            [game.config.width / 1.116, 0]
                        ],
                        [
                            [0, game.config.height / 1.0295],
                            [game.config.width / 1.264, 0]
                        ],
                        [
                            [0, game.config.height / 1.175],
                            [game.config.width / 1.4918, 0]
                        ],
                        [
                            [0, game.config.height / 1.375],
                            [game.config.width / 1.7534, 0]
                        ],
                        [
                            [0, game.config.height / 1.682],
                            [game.config.width / 2.044, 0]
                        ],
                        [
                            [0, game.config.height / 2.142],
                            [game.config.width / 2.5, 0]
                        ],
                        [
                            [0, game.config.height / 2.8125],
                            [game.config.width / 3.555, 0]
                        ]
                    ];
                    return;
                }
        }
    }

    SetEndPointsForMovement(_element) {
        let c1, c2, m;
        // console.log("SetEndPointsForMovement->");
        let objX = Math.floor(_element.x);
        let objY = Math.floor(_element.y);
        for (let i = 0; i < this.selectedLine.length; i++) {
            // console.log('selected line : ',this.selectedLine)
            m = (Math.floor(this.selectedLine[i][1][1] - this.selectedLine[i][0][1])) /
                Math.floor(this.selectedLine[i][1][0] - this.selectedLine[i][0][0]);
            // console.log("#####################"+m);



            if (m != 0 && m != Infinity && m != -Infinity) {
                // console.log("this.rtlLines[i][0][1]" + m);
                c1 = Math.floor(this.selectedLine[i][1][1] - (m * this.selectedLine[i][1][0]));
                c2 = Math.floor((Math.floor(objY) - (m * objX)));
                if (this.CheckConstants(c1, c2, _element, this.selectedLine[i][0][0], this.selectedLine[i][0][1], this.selectedLine[i][1][0], this.selectedLine[i][1][1])) {
                    return;
                } else {
                    // continue;
                }
            } else {
                // console.log("this.rtlLines[i][0][1]" + m);                
                // console.log("pppppppp");
                if (m === 0) {
                    _element.continousStartX = this.selectedLine[i][0][0];
                    _element.continousStartY = _element.y;
                    _element.continousEndX = this.selectedLine[i][1][0];
                    _element.continousEndY = _element.y;

                } else {
                    // console.log('val of m is : ' + m);
                    _element.continousStartX = _element.x;
                    _element.continousStartY = this.selectedLine[i][0][1];
                    _element.continousEndX = _element.x;
                    _element.continousEndY = this.selectedLine[i][1][1];
                }
            }

        }

    }

    CheckConstants(_c1, _c2, _element, _x1, _y1, _x2, _y2) {
        // console.log("CheckConstants->" + _c1);
        // console.log("CheckConstants->" + _c2);
        // if (Math.abs(Math.abs(_c1) - Math.abs(_c2)) < 35) {
        if (Math.abs((_c1) - (_c2)) < 35) {
            _element.continousStartX = _x1;
            _element.continousStartY = _y1;
            _element.continousEndX = _x2;
            _element.continousEndY = _y2;
            console.log("CheckConstants");
            return true;
        }
        return false;
    }

    CreateTimer() {
        let timerImageBase1 = this.add.image(game.config.width / 6, game.config.height / 12, "base1").setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.8, scaleFactorY * 0.8);
        let timerImageBase2 = this.add.image(game.config.width / 6, game.config.height / 12, "base2").setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.8, scaleFactorY * 0.8);
        this.timerimg = this.add.image(game.config.width / 6, game.config.height / 12, "base4").setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.8, scaleFactorY * 0.8);
        let timerImageBase3 = this.add.image(game.config.width / 6, game.config.height / 12, "base3").setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.8, scaleFactorY * 0.8);
        this.timerimg.depth = 4
        timerImageBase1.depth = 4
        timerImageBase2.depth = 4
        timerImageBase3.depth = 4
    }

    OnBackgroundClick() {
        this.totalNumberUserClicked += 1;
    };
    UpdateEachLevelTimer() {
        this.eachLevelTime += 100;
    };
    OnButtonClick(_this) {
        ////console.log("button clicked===================",_this);
        this.check.visible = true;
        this.check.x = _this.x - game.config.width / 15;
        this.check.y = _this.y;
    };

    update() { };
    CreateLevel() {
        this.eachLevelTimer.paused = false;
        this.timerimg.setCrop(0, this.timerHeight, this.timerimg.width, this.timerimg.height);
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
        setTimeout(() => {
            this.DisplayLevel();
        }, 500);
    };
    GameTimer() {
        let questionTimeData = LevelManager.DecideTimeOrNumberOfQuestion();
        if (questionTimeData[0] === null || questionTimeData[0] === "") {
            this.isTimerAvailable = false;
        }
        else {
            this.isTimerAvailable = true;
        }
        // this.isTimerAvailable = false;
        this.totalTimeForGame = questionTimeData[0];
        this.timeForEachLevel = questionTimeData[1];
        this.totalNumberOfLevel = questionTimeData[2];
        this.eachLevelTime = this.timeForEachLevel;
        // this.eachGameTime  = this.totalTimeForGame;
        ////console.log(" this.timeForEachLevel "+ this.timeForEachLevel);
    };
    MovementAndRotationOfImage() {
        let movementAndRotationData = LevelManager.DecideMovementAndRotation();
        if (movementAndRotationData[0] == null)//movement not available
        {
            if (movementAndRotationData[2] == null)//rotation not available
            {
                this.isMovementAvailabe = false;
                this.isRotationAvailable = false;
            }
            else {
                this.isRotationAvailable = true;
                this.isMovementAvailabe = false;
            }
        }
        else {
            this.isRotationAvailable = true;
            this.isMovementAvailabe = true;

        }
        // added later
        // this.isMovementAvailabe = false;
        // this.isRotationAvailable = false;
        // added
        this.movementDirection = movementAndRotationData[0];
        this.movementTime = (movementAndRotationData[1] * 1000);
        this.rotationType = movementAndRotationData[2];
        this.rotationTime = (movementAndRotationData[3] * 1000);
        console.log('this.rotationTime : ', movementAndRotationData[3]);
    };
    ImageForCurrentLevel() {
        this.allLevelImage = LevelManager.SelectRandomGameImage();
        this.numberOfAnswers = LevelManager.numberOfTypeOfImage;
        this.requirdClickForTheGame = this.requirdClickForTheGame + this.numberOfAnswers;
        console.log('this.requirdClickForTheGame : ', this.requirdClickForTheGame);
        this.numberOfDestractor = LevelManager.numberOfImage - LevelManager.numberOfTypeOfImage

        for (let i = 0; i < this.allLevelImage.length; i++) {
            this.allLevelImage[i] = LoadAssets.getImageName(this.allLevelImage[i]);
        }
        console.log(" this.numberOfAnswers-----------" + this.numberOfAnswers);
        console.log("  this.numberOfDestractor -----------" + this.numberOfDestractor);
    };
    DisplayLevel(_this) {
        let sceneRef = this;
        let answers = null;
        let destractor = null;
        let positionIndex = 0;
        this.totalQuestionPresented += 1;
        let objectPosition = [];
        if (this.emotions.length == 1) {
            this.SelectedEmotion = this.emotions[0];
            this.emotions = [];
            this.emotions = [...this.orignalEmotions];
            this.emotions = LevelManager.ShuffleArr(this.emotions);
        }
        else {
            let index = Math.floor(Math.random() * ((this.emotions.length - 1) - 0) + 0);
            this.SelectedEmotion = this.emotions[index];
            this.emotions.splice(index, 1)
        }

        this.emotion1.text = this.SelectedEmotion;


        switch (LevelManager.answerLocation) {
            case "N": objectPosition = [...this.northPosition];
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
            case "S": objectPosition = [...this.southPosition];
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
            case "E": objectPosition = [...this.eastPosition];
                this.east.visible = true;
                this.emotion1.x = this.east.x;
                this.emotion1.y = this.east.y;
                break;
            case "W": objectPosition = [...this.westPosition];
                this.west.visible = true;
                this.emotion1.x = this.west.x;
                this.emotion1.y = this.west.y;
                break;
        }


        // objectPosition = this.selectedObjectPosition;
        // objectPosition = LoadAssets.shuffle(objectPosition);
        // console.log('objectPos : ',objectPosition);


        objectPosition = LoadAssets.shuffle(this.selectedObjectPosition); //LoadAssets.shuffle(objectPosition);
        const answerArr = this.allLevelImage.filter((_data) => { return _data.includes(this.SelectedEmotion.toLocaleLowerCase()); });
        const destractorArr = this.allLevelImage.filter((_data) => { return !_data.includes(this.SelectedEmotion.toLocaleLowerCase()); });

        for (let i = 0; i < this.numberOfAnswers; i++) {
            const currentAnswerEmotion = answerArr[Math.floor(Math.random() * ((answerArr.length - 1) - 0) + 0)];
            // answers = this.add.sprite(objectPosition[positionIndex][0], objectPosition[positionIndex][1], currentAnswerEmotion).setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.62, scaleFactorY * 0.62);//25%
            // answers = this.add.sprite(objectPosition[positionIndex][0], objectPosition[positionIndex][1], currentAnswerEmotion).setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.675, scaleFactorY * 0.675);//35%
            // answers = this.add.sprite(objectPosition[positionIndex][0], objectPosition[positionIndex][1], currentAnswerEmotion).setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.75, scaleFactorY * 0.75);//50%
            // answers = this.add.sprite(objectPosition[positionIndex][0], objectPosition[positionIndex][1], currentAnswerEmotion).setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.875, scaleFactorY * 0.875);//75%
            // answers = this.add.sprite(objectPosition[positionIndex][0], objectPosition[positionIndex][1], currentAnswerEmotion).setOrigin(0.5, 0.5).setScale(scaleFactorX * 1, scaleFactorY * 1);//100%
            answers = this.add.sprite(objectPosition[positionIndex][0], objectPosition[positionIndex][1], currentAnswerEmotion).setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.9, scaleFactorY * 0.9);
            answers.key = "answers";
            answers.name = "answers";
            answers.prevX = objectPosition[positionIndex][0];
            answers.prevY = objectPosition[positionIndex][1];
            answers.depth = 3;
            answers.setInteractive();
            answers.on("pointerup", sceneRef.onObjectClicked);
            this.answers.push(answers);
            positionIndex += 1;
            answers = null;
        }
        for (let i = 0; i < this.numberOfDestractor; i++) {
            console.log('numberOfDestractor', objectPosition, positionIndex, objectPosition[positionIndex])
            const currentDestractorEmotion = destractorArr[Math.floor(Math.random() * ((destractorArr.length - 1) - 0) + 0)];
            // destractor = this.add.sprite(objectPosition[positionIndex][0], objectPosition[positionIndex][1], currentDestractorEmotion).setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.62, scaleFactorY * 0.62);//25%
            // destractor = this.add.sprite(objectPosition[positionIndex][0], objectPosition[positionIndex][1], currentDestractorEmotion).setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.675, scaleFactorY * 0.675);//35%
            // destractor = this.add.sprite(objectPosition[positionIndex][0], objectPosition[positionIndex][1], currentDestractorEmotion).setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.75, scaleFactorY * 0.75);//50%
            // destractor = this.add.sprite(objectPosition[positionIndex][0], objectPosition[positionIndex][1], currentDestractorEmotion).setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.875, scaleFactorY * 0.875);//75%
            // destractor = this.add.sprite(objectPosition[positionIndex][0], objectPosition[positionIndex][1], currentDestractorEmotion).setOrigin(0.5, 0.5).setScale(scaleFactorX * 1, scaleFactorY * 1);//100%
            destractor = this.add.sprite(objectPosition[positionIndex][0], objectPosition[positionIndex][1], currentDestractorEmotion).setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.9, scaleFactorY * 0.9);
            destractor.key = "destractor";
            destractor.name = "destractor";
            destractor.prevX = objectPosition[positionIndex][0];
            destractor.prevY = objectPosition[positionIndex][1];
            destractor.depth = 3;
            destractor.setInteractive();
            destractor.on("pointerup", sceneRef.onObjectClicked);
            this.destractor.push(destractor);
            positionIndex += 1;
            destractor = null;
        }
        if (this.isRotationAvailable) {
            this.RotateImages(this.rotationType);
        }

        if (this.isMovementAvailabe) {
            this.SetMovementType(LevelManager.movementDirection, LevelManager.movementType);
        }
        this.timer.paused = false;
    };
    DisableWord() {
        this.emotion1.text = "";
        this.northWord.visible = false;
        this.southWord.visible = false;
        this.northEast.visible = false;
        this.northWest.visible = false;
        this.southWest.visible = false;
        this.southEast.visible = false;
        this.west.visible = false;
        this.east.visible = false;
    };
    onObjectClicked() {
        // this.eachLevelTimer.paused = true ;
        //  this.totalEachLevelTime.push(this.eachLevelTime)
        // ////console.log(" this.totalNumberOfLevel "+this.totalNumberOfLevel);
        this.scene.totalNumberUserClicked += 1;
        // this.totalNumberUserAnswered += 1;
        let ref = this.scene;

        console.log('key : ', this.key)
        if (this.key == "answers") {
            // this.totalEachLevelTime.push(this.eachLevelTime)
            this.disableInteractive();
            this.visible = false;
            this.destroy();
            // ////console.log("_this.key ",this);
            ref.numberOfAnswerClick += 1;
            if (ref.numberOfAnswerClick == ref.numberOfAnswers) {
                ref.totalCorrectAnswer += 1;
                ref.consecutiveWins += 1;
                ref.consecutiveLoose = 0;
                ref.totalGamePlayed += 1;
                ref.consecutiveComboWins += 1;
                if (ref.consecutiveComboWins > ref.comboWins) {
                    ref.comboWins = ref.consecutiveComboWins;
                }
                if ((ref.consecutiveWins != LevelManager.offsetForLevelUp) && (ref.totalGamePlayed != ref.totalNumberOfLevel)) {
                    ref.BannerCreateAndHide("EXCELLENT", true);
                    SoundManager.CorrectAnswerSoundPlay();//Playing when answer is correct
                }
                ref.LevelWin(ref.totalCorrectAnswer);
                ref.ChangeLevel(true);
            }
        }
        else if (this.key == "destractor") {
            // this.totalEachLevelTime.push(this.eachLevelTime)
            ref.totalGamePlayed += 1;
            ref.consecutiveComboWins = 0;
            ref.totalInCorrectAnswer += 1;
            ref.consecutiveWins = 0;
            ref.consecutiveLoose += 1;
            SoundManager.InCorrectAnswerSoundPlay();//Playing when answer is incorrect
            ref.LevelLoose(ref.totalInCorrectAnswer);
            ref.ChangeLevel(true);
        }

    }
    //=========>Level Complete<=================//
    ChangeLevel(_bool) {
        let levelOrTimeComplete = true;
        if (this.isTimerAvailable) {
            if (this.timer.paused) {
                levelOrTimeComplete = false;
                this.ClearLevel();
                SoundManager.EndSoundPlay();//playing game end sound
                this.BannerCreateAndHide("TIMES_UP", false);
                this.CalculateResponse();
            }
        }
        else {
            if ((this.totalGamePlayed == this.totalNumberOfLevel)) {
                levelOrTimeComplete = false;
                this.ClearLevel();
                SoundManager.EndSoundPlay();//playing game end sound
                this.BannerCreateAndHide("GAME_OVER", false);
                this.CalculateResponse();
                this.timer.paused = true;
            }
            else {
                if (!_bool) {
                    this.totalGamePlayed += 1;
                    this.consecutiveComboWins = 0;
                    this.totalInCorrectAnswer += 1;
                    this.consecutiveWins = 0;
                    this.consecutiveLoose += 1;
                    levelOrTimeComplete = false;
                    this.LevelLoose(this.totalInCorrectAnswer);
                }
            }
        }
        if (levelOrTimeComplete) {
            console.log("levelOrTimeComplete----------------------------");
            this.ClearLevel();
            if (this.consecutiveWins == LevelManager.offsetForLevelUp) {
                ////console.log("level up----------------------------");
                this.consecutiveWins = 0;
                this.BannerCreateAndHide("LEVEL_UP", true);
                SoundManager.LevelUpSoundPlay();
                LevelManager.IncreaseLevel(LevelManager);
            }
            else if (this.consecutiveLoose == LevelManager.offsetForLevelDown) {
                console.log("level Down----------------------------");
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
        ////console.log("clear level-------------");
        this.eachLevelTimer.paused = true;
        this.totalEachLevelTime.push(this.eachLevelTime);
        this.answers = [];
        this.destractor = [];
        this.objectAngle = 15;
        this.rotationAngle = 0;
        this.DisableWord();
        this.rotateTimer.paused = true;
        this.numberOfAnswers = 0;
        this.eachLevelTime = 0;
        this.numberOfAnswerClick = 0;
        this.numberOfDestractor = 0;
        this.movementContinuousIntervalBool = false;
        this.movementIntervalInterval = false;
        this.movementTime = 0;
        if (!this.isTimerAvailable) {
            this.timerHeight = 1;
        }
        // console.clear();
        let arrLength = this.scene.scene.children.list.length;
        // console.log("list: ",this.scene.scene.children.list);
        for (let i = 0; i < arrLength; i++) {
            if (this.scene.scene.children.list[i] !== null
                && this.scene.scene.children.list[i] !== undefined
                && this.scene.scene.children.list[i].name !== null
                && this.scene.scene.children.list[i].name !== undefined) {
                console.log("name: " + this.scene.scene.children.list[i].name);
                if (this.scene.scene.children.list[i].name === "answers" ||
                    this.scene.scene.children.list[i].name === "destractor") {
                    // this.scene.scene.children.remove( this.scene.scene.children.list[i]);
                    this.scene.scene.children.list[i].destroy();

                    //  console.log("list: ",this.scene.scene.children.list);
                    // arrLength = this.scene.scene.children.list.length;
                    i = 0;
                    //  this.scene.scene.children.list[i].visible  = false;
                }
            }
        }
        //  this.scene.scene.children.list = this.scene.scene.children.list.filter(function( element ) {
        //     return element !== null;
        //  });
        // this.scene.scene.children.list = [];
        // this.scene.scene.children.list = [..._temp];
        // console.log(this.scene.scene.children.list);

        if (this.intervalTimer) {
            this.intervalTimer.remove();
        }
    };
    LevelWin(_number) {
        this.thumbsUpText.setText(_number);
    };
    LevelLoose(_number) {
        this.thumbsDownText.setText(_number);
    };
    UpdateTimer() {
        let offSet;
        // this.eachLevelTime += 1;
        if (this.isTimerAvailable) {
            this.timerHeight += (this.timerimg.height / this.totalTimeForGame);
        }
        else {
            this.timerHeight += (this.timerimg.height / this.timeForEachLevel);
        }

        if (this.timerHeight >= this.timerimg.height) {
            this.timer.paused = true;
            this.timerimg.setCrop(0, this.timerHeight, this.timerimg.width, this.timerimg.height);
            SoundManager.InCorrectAnswerSoundPlay();//playing unanswered as incorrect
            this.ChangeLevel(false);
        }
        else {
            if (this.isTimerAvailable) {
                this.timerimg.setCrop(0, this.timerHeight, this.timerimg.width, this.timerimg.height);
            }
            else {
                this.timerimg.setCrop(0, this.timerHeight, this.timerimg.width, this.timerimg.height);
            }
        }
    };
    //===========> Rotation<=====================//
    RotateImages(rotation) {
        this.rotateTimer.paused = false;
        if (rotation == "counter_clockwise") {
            this.rotationAngle = -359;//-= (360/parseInt(LevelManager.rotationTime));//5;
        }
        if (rotation == "clockwise") {
            this.rotationAngle = 359;//+= (360/parseInt(LevelManager.rotationTime));//5;
        }
        this.UpdateRotateTimer(this.rotationType);
    };
    UpdateRotateTimer() {
        // let iterator;
        // ////console.log("this.rotationTime",this.rotationTime);
        // for (iterator of this.answers) {
        //     // iterator.angle += this.rotationAngle;
        //     console.log('itarator angle : ', iterator.angle);
        //     this.tweens.add({
        //         targets: iterator,
        //         angle: this.rotationAngle,
        //         ease: 'Linear',
        //         duration: this.rotationTime,
        //         callbackScope: this,
        //         loop: -1
        //     });
        // }
        // for (iterator of this.destractor) {
        //     // iterator.angle += this.rotationAngle;
        //     this.tweens.add({
        //         targets: iterator,
        //         angle: this.rotationAngle,
        //         ease: 'Linear',
        //         duration: this.rotationTime,
        //         callbackScope: this,
        //         loop: -1
        //     });
        // }

        //============================================================================
        let iterator;
        ////console.log("this.rotationTime",this.rotationTime);
        for (iterator of this.answers) {
            // iterator.angle += this.rotationAngle; 
            this.tweens.add({
                targets: iterator,
                angle: iterator.angle += this.rotationAngle,//{ from: iterator.angle, to: (this.rotationAngle + iterator.angle) },//this.rotationAngle,
                ease: 'Linear',
                duration: this.rotationTime,
                callbackScope: this,
                loop: -1
            });
        }
        for (iterator of this.destractor) {
            // iterator.angle += this.rotationAngle;
            this.tweens.add({
                targets: iterator,
                angle: iterator.angle += this.rotationAngle, //{ from: iterator.angle, to: (this.rotationAngle + iterator.angle) },//this.rotationAngle,
                ease: 'Linear',
                duration: this.rotationTime,
                callbackScope: this,
                loop: -1
            });
        }
    };
    //============> Movement <===================//
    SetMovementType(directionType, movementType) {
        switch (parseInt(movementType)) {
            case 0:
                this.movementType = "continuous";
                this.answers.forEach(element => {
                    this.SetDirectionType(directionType, element);
                });
                this.destractor.forEach(element => {
                    this.SetDirectionType(directionType, element);
                });
                break;
            case 1:
                this.movementType = "intervals";
                this.SetIntervalOffset(directionType);
                this.answers.forEach(element => {
                    this.SetDirectionType(directionType, element);
                });
                this.destractor.forEach(element => {
                    this.SetDirectionType(directionType, element);
                });
                break;
            case 2:
                this.movementType = "continuous-continuous";
                this.answers.forEach(element => {
                    this.SetDirectionType(directionType, element);
                });
                this.destractor.forEach(element => {
                    this.SetDirectionType(directionType, element);
                });
                break;
            case 3:
                this.movementType = "continuous-interval";
                this.answers.forEach(element => {
                    this.SetDirectionType(directionType, element);
                });
                this.destractor.forEach(element => {
                    this.SetDirectionType(directionType, element);
                });
                break;
            case 4:
                this.movementType = "intervals-continuous";
                this.answers.forEach(element => {
                    this.SetDirectionType(directionType, element);
                });
                this.destractor.forEach(element => {
                    this.SetDirectionType(directionType, element);
                });
                break;
            case 5:
                this.movementType = "intervals-intervals";
                this.answers.forEach(element => {
                    this.SetDirectionType(directionType, element);
                });
                this.destractor.forEach(element => {
                    this.SetDirectionType(directionType, element);
                });
                break;
        }

    };
    StartMovement(_obj, continousStartX, continousStartY,
        continousEndX, continousEndY, _direction) {
        console.log('StartMovement', this.movementType, _obj, continousStartX, continousStartY,
            continousEndX, continousEndY);
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
                this.MovementIntervalContineous(_direction, _obj, continousStartX, continousStartY,
                    continousEndX, continousEndY);
                break;
            case "intervals-intervals":
                this.MovementIntervalInterval(_obj, _direction);
                break;
        }
    };
    SetDirectionType(_direction, _obj, _bool = true) {
        let continousStartX = 10;
        let continousStartY;
        let continousEndX;
        let continousEndY;
        let m;
        if (_bool) {
            switch (_direction) {
                case "RTL":
                    this.SetEndPointsForMovement(_obj);
                    this.movementTime = ((10000 / (game.config.width + _obj.x)) * (_obj.x));
                    console.log('_obj : ', _obj);
                    this.movementIntervalX = ((game.config.width) / 10);
                    this.movementIntervalY = 0;
                    break;
                case "LTR":
                    this.SetEndPointsForMovement(_obj);
                    this.movementTime = ((10000 / (game.config.width + 200)) * ((game.config.width + 200) - _obj.x));
                    this.movementIntervalX = ((game.config.width) / 10);
                    this.movementIntervalY = 0;

                    break;
                case "TTB":
                    this.SetEndPointsForMovement(_obj);
                    this.movementTime = ((10000 / (game.config.height + 200)) * ((game.config.height + 200) - _obj.y));
                    this.movementIntervalX = 0;
                    this.movementIntervalY = ((game.config.height) / 10);
                    break;
                case "BTT":
                    this.SetEndPointsForMovement(_obj);
                    this.movementTime = ((10000 / (game.config.height + 200)) * (_obj.y));
                    this.movementIntervalX = 0;
                    this.movementIntervalY = -((game.config.height) / 10);
                    break;
                case "BRDTL":
                    this.SetEndPointsForMovement(_obj);
                    this.movementTime = ((10000 / (game.config.height + 200)) * (_obj.y));
                    this.movementIntervalX = ((game.config.width) / 10);
                    this.movementIntervalY = ((game.config.height) / 10);
                    break;
                case "BLDTR":
                    this.SetEndPointsForMovement(_obj);
                    this.movementTime = ((10000 / (game.config.height + 200)) * (_obj.y));
                    this.movementIntervalX = ((game.config.width) / 10);
                    this.movementIntervalY = ((game.config.height) / 10);
                    break;
                case "TLDBR":
                    this.SetEndPointsForMovement(_obj);
                    // console.log("aaaa"+_obj.continousStartX );
                    // console.log("aaaa"+_obj. continousEndX);
                    // console.log("aaaa"+_obj.continousStartY );
                    // console.log("aaaa"+_obj. continousEndY);
                    this.movementTime = ((10000 / (game.config.height + 200)) * (_obj.y));
                    this.movementIntervalX = ((game.config.width) / 10);
                    this.movementIntervalY = ((game.config.height) / 10);
                    break;
                case "TRDBL":
                    this.SetEndPointsForMovement(_obj);
                    this.movementTime = ((10000 / (game.config.height + 200)) * (_obj.y));
                    this.movementIntervalX = ((game.config.width) / 10);
                    this.movementIntervalY = ((game.config.height) / 10);
                    break;
            }
        }
        console.log('_direction', _direction);

        this.StartMovement(_obj, continousStartX, continousStartY, continousEndX, continousEndY, _direction);
    };
    TimeForContineous(_obj, _startX, _startY, _endX, _endY) {
        let distance = null, distance2 = null;
        // if(LevelManager.movementDirection=="RTL"||LevelManager.movementDirection=="LTR")
        // {
        //     this.movementTime = parseInt(((LevelManager.movementTime*1000)/Math.abs(_obj.continousEndX - _obj.continousStartX))*Math.abs(_startX - _endX));
        // }
        // else if(LevelManager.movementDirection=="BTT"||LevelManager.movementDirection=="TTB")
        // {
        //     this.movementTime = parseInt(((LevelManager.movementTime*1000)/Math.abs(_obj.continousEndY - _obj.continousStartY))*Math.abs(_startY - _endY));
        // }
        // else
        // {
        //     distance = parseInt(Math.sqrt(Math.pow((_obj.continousEndX - _obj.continousStartX), 2) + Math.pow((_obj.continousEndY - _obj.continousStartY), 2)));
        //     distance2 = parseInt(Math.sqrt(Math.pow((_startX - _endX), 2) + Math.pow((_startY - _endY), 2)));
        //     this.movementTime = parseInt(((LevelManager.movementTime * 1000) / Math.abs(distance)) * Math.abs(distance2));
        // }

        distance = LevelManager.CalculateDistanceBetweenPoints(_startX, _startY, _endX, _endY);
        this.movementTime = parseInt(((LevelManager.movementTime * 1000) / this.maximumLengthOfLine) * distance);
        return this.movementTime;
    };
    TimeForInterval(_obj) {
        let distance = parseInt(Math.sqrt(Math.pow((_obj.continousEndX - _obj.continousStartX), 2) + Math.pow((_obj.continousEndY - _obj.continousStartY), 2)));

        if (LevelManager.movementDirection == "RTL" || LevelManager.movementDirection == "LTR") {
            this.movementTime = (distance / this.movementIntervalX);
        }
        else if (LevelManager.movementDirection == "BTT" || LevelManager.movementDirection == "TTB") {
            this.movementTime = (distance / this.movementIntervalY);
        }
        else {
            this.movementTime = (distance / this.movementIntervalY)
        }
        this.movementTime = parseInt((LevelManager.movementTime * 1000) / this.movementTime);
        return this.movementTime;
    };

    // Code Modified by Rupesh : Continuous Movement was commented before , raised issue by client on 22-05-2025
    MovementContineous(_obj, _startX, _startY, _endX, _endY) {
        console.log('MovementContineous', _obj, _obj.continousEndX, _obj.continousEndY);

        this.movementTime = this.TimeForContineous(_obj, _obj.x, _obj.y, _obj.continousEndX, _obj.continousEndY);
        this.tweens.add({
            targets: _obj,
            x: _obj.continousEndX,
            y: _obj.continousEndY,
            ease: 'Linear',
            duration: this.movementTime,
            callbackScope: this,
            onComplete: function () {
                console.log('onComplete');

                if (this.isMovementContinuous) {
                    _obj.setPosition(_obj.continousStartX, _obj.continousStartY);
                    this.tweens.add({
                        targets: _obj,
                        x: _obj.continousEndX,
                        y: _obj.continousEndY,
                        ease: 'Linear',
                        duration: (LevelManager.movementTime * 1000),
                        repeat: -1
                    });
                }
            }
        });
    };
    MovementContineousContineous(_obj, _startX, _startY, _endX, _endY) {
        this.movementTime = this.TimeForContineous(_obj, _obj.x, _obj.y, _obj.continousEndX, _obj.continousEndY);
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
                    this.movementTime = this.TimeForContineous(_obj, _obj.continousStartX, _obj.continousStartY, _obj.continousEndX, _obj.continousEndY);
                    this.tweens.add({
                        targets: _obj,
                        x: _obj.continousEndX,
                        y: _obj.continousEndY,
                        ease: 'Linear',
                        duration: (LevelManager.movementTime * 1000),
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
                delay: this.movementTime, callback: () => {
                    // ////console.log("------------");
                    if (this.movementContinuousIntervalArr.length > 0) {
                        this.movementContinuousIntervalArr.forEach(element => {
                            switch (_dir) {
                                case "RTL":
                                    if (element.x > -(game.config.width - element.prevX)) {
                                        element.x -= this.movementIntervalX;
                                    }
                                    else {
                                        element.setPosition((game.config.width + (element.prevX)), element.y);
                                    }
                                    break;
                                case "LTR":
                                    if (element.x < (game.config.width + (element.prevX))) {
                                        element.x += this.movementIntervalX;

                                    }
                                    else {
                                        element.setPosition(-(game.config.width - element.prevX), element.y);
                                    }
                                    break;
                                case "TTB":
                                    if (element.y < element.continousEndY) {
                                        element.y += this.movementIntervalY;
                                    }
                                    else {
                                        element.setPosition(element.x, (element.continousStartY));
                                    }
                                    break;
                                case "BTT":
                                    if (element.y > element.continousEndY) {
                                        element.y += this.movementIntervalY;
                                    }
                                    else {
                                        element.setPosition(element.x, (element.continousStartY));
                                    }
                                    break;

                                case "BRDTL":
                                    if (element.x > element.continousEndX) {
                                        if (element.y > element.continousEndY) {
                                            element.x -= this.movementIntervalX;
                                            element.y -= this.movementIntervalY;
                                        }
                                        else {
                                            element.setPosition(element.continousStartX, element.continousStartY);
                                        }
                                    }
                                    else {
                                        element.setPosition(element.continousStartX, element.continousStartY);
                                    }
                                    break;
                                case "BLDTR":
                                    if (element.x < element.continousEndX) {
                                        if (element.y > element.continousEndY) {
                                            element.x += this.movementIntervalX;
                                            element.y -= this.movementIntervalY;
                                        }
                                        else {
                                            element.setPosition(element.continousStartX, element.continousStartY);
                                        }
                                    }
                                    else {
                                        element.setPosition(element.continousStartX, element.continousStartY);
                                    }
                                    break;
                                case "TLDBR":
                                    if (element.x < element.continousEndX) {
                                        if (element.y < element.continousEndY) {
                                            element.x += this.movementIntervalX;
                                            element.y += this.movementIntervalY;
                                        }
                                        else {
                                            element.setPosition(element.continousStartX, element.continousStartY);
                                        }
                                    }
                                    else {
                                        element.setPosition(element.continousStartX, element.continousStartY);
                                    }
                                    break;
                                case "TRDBL":
                                    if (element.x > element.continousEndX) {
                                        if (element.y < element.continousEndY) {
                                            element.x -= this.movementIntervalX;
                                            element.y += this.movementIntervalY;
                                        }
                                        else {
                                            element.setPosition(element.continousStartX, element.continousStartY);
                                        }
                                    }
                                    else {
                                        element.setPosition(element.continousStartX, element.continousStartY);
                                    }
                                    break;
                            }
                        });
                    }
                }, callbackScope: this, loop: true
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
    MovementIntervalContineous(_dir, _obj, continousStartX, continousStartY,
        continousEndX, continousEndY) {
        let posX = 10, posY = 10;
        let m;
        // let _obj = [..._arr];
        let counter = _obj.length;
        let counter1 = [];

        this.movementTime = this.TimeForInterval(_obj);
        let intervalTimer = this.time.addEvent({
            delay: 500, callback: () => {
                switch (_dir) {
                    case "RTL":
                        if (_obj.x > -(game.config.width - _obj.prevX)) {
                            _obj.x -= this.movementIntervalX;
                        }
                        else {
                            _obj.setPosition((game.config.width + (_obj.prevX)), _obj.y);
                            this.MovementIntervalContineousTween(_obj, -(game.config.width - _obj.prevX), _obj.y);
                        }
                        break;
                    case "LTR":
                        if (_obj.x < (game.config.width + (_obj.prevX))) {
                            _obj.x += this.movementIntervalX;
                        }
                        else {
                            _obj.setPosition(-(game.config.width - _obj.prevX), _obj.y);
                            this.MovementIntervalContineousTween(_obj, (game.config.width + (_obj.prevX)), _obj.y);
                        }
                        break;
                    case "TTB":
                        if (_obj.y < _obj.continousEndY) {
                            _obj.y += this.movementIntervalY;
                        }
                        else {
                            _obj.setPosition(_obj.x, (_obj.continousStartY));
                            this.MovementIntervalContineousTween(_obj, _obj.x, (_obj.continousEndY));
                        }
                        break;
                    case "BTT":
                        if (_obj.y > _obj.continousEndY) {
                            _obj.y += this.movementIntervalY;
                        }
                        else {
                            _obj.setPosition(_obj.x, (_obj.continousStartY));
                            this.MovementIntervalContineousTween(_obj, _obj.x, (_obj.continousEndY));
                        }
                        break;

                    case "BRDTL":
                        if (_obj.x > _obj.continousEndX) {
                            if (_obj.y > _obj.continousEndY) {
                                _obj.x -= this.movementIntervalX;
                                _obj.y -= this.movementIntervalY;
                            }
                            else {
                                _obj.setPosition(_obj.continousStartX, _obj.continousStartY);
                                this.MovementIntervalContineousTween(_obj, _obj.continousEndX, _obj.continousEndY);
                            }
                        }
                        else {
                            _obj.setPosition(_obj.continousStartX, _obj.continousStartY);
                            this.MovementIntervalContineousTween(_obj, _obj.continousEndX, _obj.continousEndY);
                        }
                        break;
                    case "BLDTR":
                        if (_obj.x < _obj.continousEndX) {
                            if (_obj.y > _obj.continousEndY) {
                                _obj.x += this.movementIntervalX;
                                _obj.y -= this.movementIntervalY;
                            }
                            else {
                                _obj.setPosition(_obj.continousStartX, _obj.continousStartY);
                                this.MovementIntervalContineousTween(_obj, _obj.continousEndX, _obj.continousEndY);
                            }
                        }
                        else {
                            _obj.setPosition(_obj.continousStartX, _obj.continousStartY);
                            this.MovementIntervalContineousTween(_obj, _obj.continousEndX, _obj.continousEndY);
                        }
                        break;
                    case "TLDBR":
                        if (_obj.x < _obj.continousEndX) {
                            if (_obj.y < _obj.continousEndY) {
                                _obj.x += this.movementIntervalX;
                                _obj.y += this.movementIntervalY;
                            }
                            else {
                                _obj.setPosition(_obj.continousStartX, _obj.continousStartY);
                                this.MovementIntervalContineousTween(_obj, _obj.continousEndX, _obj.continousEndY);
                            }
                        }
                        else {
                            _obj.setPosition(_obj.continousStartX, _obj.continousStartY);
                            this.MovementIntervalContineousTween(_obj, _obj.continousEndX, _obj.continousEndY);
                            counter -= 1;
                        }
                        break;
                    case "TRDBL":
                        if (_obj.x > _obj.continousEndX) {
                            if (_obj.y < _obj.continousEndY) {
                                _obj.x -= this.movementIntervalX;
                                _obj.y += this.movementIntervalY;
                            }
                            else {
                                _obj.setPosition(_obj.continousStartX, _obj.continousStartY);
                                this.MovementIntervalContineousTween(_obj, _obj.continousEndX, _obj.continousEndY);
                                counter -= 1;
                            }
                        }
                        else {
                            _obj.setPosition(_obj.continousStartX, _obj.continousStartY);
                            this.MovementIntervalContineousTween(_obj, _obj.continousEndX, _obj.continousEndY);
                            counter -= 1;
                        }
                        break;
                }
                if (counter == 0) {
                    intervalTimer.remove();
                }
            }, callbackScope: this, loop: true
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
                delay: this.movementTime, callback: () => {
                    this.movementIntervalIntervalArr.forEach(element => {
                        switch (_dir) {
                            case "RTL":
                                if (element.x > -(game.config.width - element.prevX)) {
                                    element.x -= this.movementIntervalX;
                                }
                                else {
                                    element.setPosition((game.config.width + (element.prevX)), element.y);
                                }
                                break;
                            case "LTR":
                                if (element.x < (game.config.width + (element.prevX))) {
                                    element.x += this.movementIntervalX;
                                }
                                else {
                                    element.setPosition(-(game.config.width - element.prevX), element.y);
                                }
                                break;
                            case "TTB":
                                if (element.y < element.continousEndY) {
                                    element.y += this.movementIntervalY;
                                }
                                else {
                                    element.setPosition(element.x, (element.continousStartY));
                                }
                                break;
                            case "BTT":
                                if (element.y > element.continousEndY) {
                                    element.y += this.movementIntervalY;
                                }
                                else {
                                    element.setPosition(element.x, (element.continousStartY));
                                }
                                break;

                            case "BRDTL":
                                if (element.x > element.continousEndX) {
                                    if (element.y > element.continousEndY) {
                                        element.x -= this.movementIntervalX;
                                        element.y -= this.movementIntervalY;
                                    }
                                    else {
                                        element.setPosition(element.continousStartX, element.continousStartY);
                                    }
                                }
                                else {
                                    element.setPosition(element.continousStartX, element.continousStartY);
                                }
                                break;
                            case "BLDTR":
                                if (element.x < element.continousEndX) {
                                    if (element.y > element.continousEndY) {
                                        element.x += this.movementIntervalX;
                                        element.y -= this.movementIntervalY;
                                    }
                                    else {
                                        element.setPosition(element.continousStartX, element.continousStartY);
                                    }
                                }
                                else {
                                    element.setPosition(element.continousStartX, element.continousStartY);
                                }
                                break;
                            case "TLDBR":
                                if (element.x < element.continousEndX) {
                                    if (element.y < element.continousEndY) {
                                        element.x += this.movementIntervalX;
                                        element.y += this.movementIntervalY;
                                    }
                                    else {
                                        element.setPosition(element.continousStartX, element.continousStartY);
                                    }
                                }
                                else {
                                    element.setPosition(element.continousStartX, element.continousStartY);
                                }
                                break;
                            case "TRDBL":
                                if (element.x > element.continousEndX) {
                                    if (element.y < element.continousEndY) {
                                        element.x -= this.movementIntervalX;
                                        element.y += this.movementIntervalY;
                                    }
                                    else {
                                        element.setPosition(element.continousStartX, element.continousStartY);
                                    }
                                }
                                else {
                                    element.setPosition(element.continousStartX, element.continousStartY);
                                }
                                break;
                        }
                    });
                }, callbackScope: this, loop: true
            });
        }
        this.movementIntervalInterval = true;
    };
    MovementInterval(_obj, _dir) {
        let rtldBuffer;
        let m;
        this.movementIntervalIntervalArr.push(_obj);
        if (!this.movementIntervalInterval) {
            this.movementTime = this.TimeForInterval(_obj);
            // console.log("this.movementTime "+this.movementTime );
            this.intervalTimer = this.time.addEvent({
                delay: 500, callback: () => {
                    this.movementIntervalIntervalArr.forEach(element => {
                        switch (_dir) {
                            case "RTL":
                                if (element.x > -(game.config.width - element.prevX)) {
                                    element.x -= this.movementIntervalX;
                                }
                                else {
                                    element.setPosition((game.config.width + (element.prevX)), element.y);
                                }
                                break;
                            case "LTR":
                                if (element.x < (game.config.width + (element.prevX))) {
                                    element.x += this.movementIntervalX;
                                }
                                else {
                                    element.setPosition(-(game.config.width - element.prevX), element.y);
                                }
                                break;
                            case "TTB":
                                if (element.y < element.continousEndY) {
                                    element.y += this.movementIntervalY;
                                }
                                else {
                                    element.setPosition(element.x, (element.continousStartY));
                                }
                                break;
                            case "BTT":
                                if (element.y > element.continousEndY) {
                                    element.y += this.movementIntervalY;
                                }
                                else {
                                    element.setPosition(element.x, (element.continousStartY));
                                }
                                break;

                            case "BRDTL":
                                if (element.x > element.continousEndX) {
                                    if (element.y > element.continousEndY) {
                                        element.x -= this.movementIntervalX;
                                        element.y -= this.movementIntervalY;
                                    }
                                    else {
                                        element.setPosition(element.continousStartX, element.continousStartY);
                                    }
                                }
                                else {
                                    element.setPosition(element.continousStartX, element.continousStartY);
                                }
                                break;
                            case "BLDTR":
                                if (element.x < element.continousEndX) {
                                    if (element.y > element.continousEndY) {
                                        element.x += this.movementIntervalX;
                                        element.y -= this.movementIntervalY;
                                    }
                                    else {
                                        element.setPosition(element.continousStartX, element.continousStartY);
                                    }
                                }
                                else {
                                    element.setPosition(element.continousStartX, element.continousStartY);
                                }
                                break;
                            case "TLDBR":
                                if (element.x < element.continousEndX) {
                                    if (element.y < element.continousEndY) {
                                        element.x += this.movementIntervalX;
                                        element.y += this.movementIntervalY;
                                    }
                                    else {
                                        element.setPosition(element.continousStartX, element.continousStartY);
                                    }
                                }
                                else {
                                    element.setPosition(element.continousStartX, element.continousStartY);
                                }
                                break;
                            case "TRDBL":
                                if (element.x > element.continousEndX) {
                                    if (element.y < element.continousEndY) {
                                        element.x -= this.movementIntervalX;
                                        element.y += this.movementIntervalY;
                                    }
                                    else {
                                        element.setPosition(element.continousStartX, element.continousStartY);
                                    }
                                }
                                else {
                                    element.setPosition(element.continousStartX, element.continousStartY);
                                }
                                break;
                        }
                    });
                }, callbackScope: this, loop: true
            });
        }
        this.movementIntervalInterval = true;
    };
    SetIntervalOffset(_dir) {
        switch (_dir) {
            case "RTL":
                this.movementIntervalX = -((game.config.width) / 10);
                this.movementIntervalY = 0;
                break;
            case "LTR":
                this.movementIntervalX = ((game.config.width) / 10);
                this.movementIntervalY = 0;
                break;
            case "TTB":
                this.movementIntervalX = 0;
                this.movementIntervalY = ((game.config.height) / 10);
                break;
            case "BTT":
                this.movementIntervalX = 0;
                this.movementIntervalY = -((game.config.height) / 10);
                break;
            case "RTLD":
                this.movementIntervalX = -((game.config.width) / 10);
                this.movementIntervalY = -((game.config.height) / 10);
                break;
            case "LTRD":
                this.movementIntervalX = ((game.config.width) / 10);
                this.movementIntervalY = -((game.config.height) / 10);
                break;
            case "BRDTL":
                this.movementIntervalX = ((game.config.width) / 10);
                this.movementIntervalY = ((game.config.height) / 10);
                break;
            case "BLDTR":
                this.movementIntervalX = ((game.config.width) / 10);
                this.movementIntervalY = ((game.config.height) / 10);
                break;
            case "TLDBR":
                this.movementIntervalX = ((game.config.width) / 10);
                this.movementIntervalY = ((game.config.height) / 10);
                break;
            case "TRDBL":
                this.movementIntervalX = ((game.config.width) / 10);
                this.movementIntervalY = ((game.config.height) / 10);
                break;
        }
    }
    //===========>Data to be sent to server<==============//
    CalculateResponse() {
        let _level = LevelManager.GetCurrentLevelNumber();
        let _correctAnwer = this.totalCorrectAnswer;
        let _inCorrectAnswer = this.totalInCorrectAnswer;
        // let _accuracy = (this.totalNumberUserClicked === 0) ? 0 : parseInt((this.totalGamePlayed / this.totalNumberUserClicked) * 100);
        let _accuracy = (this.totalNumberUserClicked === 0) ? 0 : parseInt((this.requirdClickForTheGame / this.totalNumberUserClicked) * 100);
        let _totalTime = 0;
        let _avarageTime = 0;
        let _
        for (let i = 0; i < this.totalEachLevelTime.length; i++) {
            _totalTime += this.totalEachLevelTime[i];

        }
        if (_totalTime > 0 && this.totalGamePlayed > 0) {
            _avarageTime = (_totalTime / this.totalGamePlayed);// / _totalTime);
        }
        else {
            _avarageTime = 0;
            // console.log('average answer time is zero');
        }
        // console.log('vag ans time : ' + average_answer_time);
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

        //===============first star calculation=================

        let firstStar = (_correctAnwer / this.totalQuestionPresented);
        if (firstStar >= Database.success_rate) {
            // console.log('get first star');
            post_game.firstStar = true;
        }
        else {
            post_game.firstStar = false;
        }

        //==============second star calculation================
        console.log('average answer time : ' + _avarageTime);
        if (parseFloat(_avarageTime).toFixed(2) <= parseFloat(Database.average_answer_time)) {
            post_game.secondStar = true;
        }
        else {
            post_game.secondStar = false;
        }
        //==============third star calculation================
        let calculation = 2;
        // console.log('calculation : ' + calculation);
        let endLevel = _level;
        let startLevel = parseInt(Database.level)//LevelManager.GetInitialLevel();
        console.log('start level : ' + startLevel + 'initial level : ' + endLevel);
        if ((endLevel - startLevel) >= calculation) {
            post_game.thirdStar = true;
        }
        else {
            post_game.thirdStar = false;
        }
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
            "average_answer_time": parseFloat(parseFloat(_avarageTime).toFixed(2)), // number of questions / total time played
            "time_per_question": _timePerQuestion, // {}
            "datetime": _deviceDateTime.toString(), //device time
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
            //     "&game_name=" + "you-are-the-therapist", "_self");
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
                    "&game_name=" + "you-are-the-therapist" +
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
                    "&game_name=" + "you-are-the-therapist", "_self");
            }
        }
    };
    //===>Banner Pop up<=========//
    BannerCreateAndHide(_text, _bool) {
        let value;
        switch (_text) {
            case "GAME_START": value = 'start'; break;
            case "EXCELLENT": value = 'excellent'; break;
            case "TIMES_UP": value = 'timeUp'; break;
            case "GAME_OVER": value = 'gameOver'; break;
            case "LEVEL_UP": value = 'levelUp'; break;
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