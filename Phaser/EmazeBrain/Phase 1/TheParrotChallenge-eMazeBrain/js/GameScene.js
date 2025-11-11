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
        this.tickerRed;
        this.tickerGreen;
        this.timerDegre = -89; //1;
        this.graphics;
        this.timer;
        // this.rotateTimer;
        // this.rotationAngle = 0;
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
        this.totalNumberOfImages;
        this.allLevelImage = [];
        this.levelBackground;
        this.answers = [];
        this.destractor = [];
        this.totalCorrectAnswer = 0;
        this.totalInCorrectAnswer = 0;
        this.objectAngle = 15;
        this.consecutiveComboWins = 0;
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
        this.eachLevelTime = 0; //Each level time to calculate response
        this.totalEachLevelTime = []; //Each level time to calculate response
        this.eachGameTime = 0; //Each game time to calculate response
        this.totalNumberUserClicked = 0; //total number of click to calculate response
        this.totalQuestionPresented = 0; // total number of question presented to calculate response
        //================Zones(N,S,E,W,NE,SE,NW,SW)===============//
        this.objectPosition = [];
        //==================BANNER TEXT===================//
        this.letsStart;
        this.levelUp;
        this.timesUp;
        this.excellent;
        this.gameOver;
        //===========Answer Click=========================//
        this.numberOfAnswerClick = 0;
        this.eachLevelTimer;

        //----------------------------------------------
        this.requiredClickForTheGame = 0;
    }
    create() {
        if (Server.platform == "favorites") {
            window.parent.postMessage({ eventName: "gameStarted", payload: null }, "*");
        }
        SoundManager.StartSoundPlay(); //Game start sound 
        //=====> Static Items <==========//        
        let headerBar = this.add.image(game.config.width / 2, game.config.height / 23, 'one_pixel_white').setOrigin(0.5).setScale(scaleFactorX * 3000, scaleFactorY * 240);
        headerBar.setTint("0X253A32");
        headerBar.depth = 2;
        const style1 = { font: "bold 30px Arial", fill: "#fff" };
        let headingText = this.add.text(game.config.width / 1.9, game.config.height / 12, "The Parrot Challenge", style1).setOrigin(0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        headingText.depth = 2;
        this.thumbsUp = this.add.image(game.config.width / 20, game.config.height / 12, "thumbs_up").setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.5, scaleFactorY * 0.5);
        this.thumbsDown = this.add.image(game.config.width / 1.05, game.config.height / 12, "thumbs_down").setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.5, scaleFactorY * 0.5);
        this.thumbsUp.depth = 2;
        this.thumbsDown.depth = 2;
        const style = { font: "bold 30px Arial", fill: "#fff" };
        this.thumbsUpText = this.add.text(this.thumbsUp.x + (game.config.width / 12.8), this.thumbsUp.y, this.totalCorrectAnswer, style).setOrigin(0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        this.thumbsDownText = this.add.text(this.thumbsDown.x - (game.config.width / 12.8), this.thumbsDown.y, this.totalInCorrectAnswer, style).setOrigin(0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
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
        // console.log(this.timer);
        // this.rotateTimer = this.time.addEvent({
        //     delay: (1000),
        //     callback: this.UpdateRotateTimer,
        //     callbackScope: this, loop: true
        // });
        // this.rotateTimer.paused = true;
        //====> Timer Arc <============//
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(Math.floor(game.config.width / 300), 0x54f419, 1);
        this.graphics.beginPath();
        this.graphics.arc(game.config.width / 4, game.config.height / 12, Math.floor(game.config.width / 36), Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(this.timerDegre), true);
        this.graphics.strokePath();
        this.graphics.depth = 3;
        this.graphics.visible = false;
        //=============Object Location===========================//
        this.SelectObjectPosition();
        this.SetDirectionLines();
        //===> Game time <=====//
        this.GameTimer();
        //====> Selecting Background <======//
        this.levelBackground = LevelManager.DecideLevelBackground();
        this.bg = this.add.image(game.config.width / 2, game.config.height / 2, this.levelBackground).setOrigin(0.5, 0.5).setScale(scaleFactorX * 1, scaleFactorY * 1);
        this.bg.setInteractive();
        this.bg.on("pointerdown", (pointer, x, y, event) => this.OnBackgroundClick());
        //======> createing initial level <====//
        this.BannerCreateAndHide("GAME_START", true);
        setTimeout(() => {
            this.CreateLevel();
        }, 700);
        this.graphics.visible = true;
        this.tickerGreen.visible = true;
        this.timer.paused = false;
    };
    SelectObjectPosition() {
        if (LevelManager.movementDirection == "RTL" || LevelManager.movementDirection == "LTR" ||
            LevelManager.movementDirection == "BTT" || LevelManager.movementDirection == "TTB") {
            this.selectedObjectPosition = [
                [Math.floor(game.config.width / 11.07), Math.floor(game.config.height / 3.69)],
                [Math.floor(game.config.width / 4), Math.floor(game.config.height / 3.69)],
                [Math.floor(game.config.width / 2.5), Math.floor(game.config.height / 3.69)],
                [Math.floor(game.config.width / 1.8), Math.floor(game.config.height / 3.69)],
                [Math.floor(game.config.width / 1.37), Math.floor(game.config.height / 3.69)],
                [Math.floor(game.config.width / 1.12), Math.floor(game.config.height / 3.69)],
                [Math.floor(game.config.width / 11.07), Math.floor(game.config.height / 2.1)],
                [Math.floor(game.config.width / 4), Math.floor(game.config.height / 2.1)],
                [Math.floor(game.config.width / 2.5), Math.floor(game.config.height / 2.1)],
                [Math.floor(game.config.width / 1.8), Math.floor(game.config.height / 2.1)],
                [Math.floor(game.config.width / 1.37), Math.floor(game.config.height / 2.1)],
                [Math.floor(game.config.width / 1.12), Math.floor(game.config.height / 2.1)],
                [Math.floor(game.config.width / 11.07), Math.floor(game.config.height / 1.52)],
                [Math.floor(game.config.width / 4), Math.floor(game.config.height / 1.52)],
                [Math.floor(game.config.width / 2.5), Math.floor(game.config.height / 1.52)],
                [Math.floor(game.config.width / 1.8), Math.floor(game.config.height / 1.52)],
                [Math.floor(game.config.width / 1.37), Math.floor(game.config.height / 1.52)],
                [Math.floor(game.config.width / 1.12), Math.floor(game.config.height / 1.52)],
                [Math.floor(game.config.width / 11.07), Math.floor(game.config.height / 1.18)],
                [Math.floor(game.config.width / 4), Math.floor(game.config.height / 1.18)],
                [Math.floor(game.config.width / 2.5), Math.floor(game.config.height / 1.18)],
                [Math.floor(game.config.width / 1.8), Math.floor(game.config.height / 1.18)],
                [Math.floor(game.config.width / 1.12), Math.floor(game.config.height / 1.18)]
            ];
        } else if (LevelManager.movementDirection == "TRDBL" || LevelManager.movementDirection == "BLDTR") {
            this.selectedObjectPosition = [
                [Math.floor(game.config.width / 4.21), Math.floor(game.config.height / 4.40)],
                [Math.floor(game.config.width / 2.6), Math.floor(game.config.height / 4.40)],
                [Math.floor(game.config.width / 1.85), Math.floor(game.config.height / 4.40)],
                [Math.floor(game.config.width / 1.48), Math.floor(game.config.height / 4.40)],
                [Math.floor(game.config.width / 1.22), Math.floor(game.config.height / 4.40)],
                [Math.floor(game.config.width / 1.054), Math.floor(game.config.height / 4.40)],
                [Math.floor(game.config.width / 5.2), Math.floor(game.config.height / 2.2)],
                [Math.floor(game.config.width / 2.95), Math.floor(game.config.height / 2.2)],
                [Math.floor(game.config.width / 2.04), Math.floor(game.config.height / 2.2)],
                [Math.floor(game.config.width / 1.578), Math.floor(game.config.height / 2.2)],
                [Math.floor(game.config.width / 1.287), Math.floor(game.config.height / 2.2)],
                [Math.floor(game.config.width / 1.1), Math.floor(game.config.height / 2.2)],
                [Math.floor(game.config.width / 6.37), Math.floor(game.config.height / 1.52)],
                [Math.floor(game.config.width / 3.38), Math.floor(game.config.height / 1.52)],
                [Math.floor(game.config.width / 2.25), Math.floor(game.config.height / 1.52)],
                [Math.floor(game.config.width / 1.69), Math.floor(game.config.height / 1.52)],
                [Math.floor(game.config.width / 1.35), Math.floor(game.config.height / 1.52)],
                [Math.floor(game.config.width / 1.14), Math.floor(game.config.height / 1.52)],
                [Math.floor(game.config.width / 8.7), Math.floor(game.config.height / 1.15)],
                [Math.floor(game.config.width / 3.92), Math.floor(game.config.height / 1.15)],
                [Math.floor(game.config.width / 2.5), Math.floor(game.config.height / 1.15)],
                [Math.floor(game.config.width / 1.81), Math.floor(game.config.height / 1.15)],
                [Math.floor(game.config.width / 1.056), Math.floor(game.config.height / 1.15)]
            ];
        } else {
            this.selectedObjectPosition = [
                [Math.floor(game.config.width / 9.4), Math.floor(game.config.height / 4.40)],
                [Math.floor(game.config.width / 3.757), Math.floor(game.config.height / 4.40)],
                [Math.floor(game.config.width / 2.482), Math.floor(game.config.height / 4.40)],
                [Math.floor(game.config.width / 1.84), Math.floor(game.config.height / 4.40)],
                [Math.floor(game.config.width / 1.515), Math.floor(game.config.height / 4.40)],
                [Math.floor(game.config.width / 1.24), Math.floor(game.config.height / 4.40)],
                [Math.floor(game.config.width / 1.061), Math.floor(game.config.height / 4.40)],
                [Math.floor(game.config.width / 6.45), Math.floor(game.config.height / 2.2)],
                [Math.floor(game.config.width / 3.16), Math.floor(game.config.height / 2.2)],
                [Math.floor(game.config.width / 2.19), Math.floor(game.config.height / 2.2)],
                [Math.floor(game.config.width / 1.66), Math.floor(game.config.height / 2.2)],
                [Math.floor(game.config.width / 1.39), Math.floor(game.config.height / 2.2)],
                [Math.floor(game.config.width / 1.16), Math.floor(game.config.height / 2.2)],
                [Math.floor(game.config.width / 5.08), Math.floor(game.config.height / 1.52)],
                [Math.floor(game.config.width / 2.78), Math.floor(game.config.height / 1.52)],
                [Math.floor(game.config.width / 1.978), Math.floor(game.config.height / 1.52)],
                [Math.floor(game.config.width / 1.53), Math.floor(game.config.height / 1.52)],
                [Math.floor(game.config.width / 1.295), Math.floor(game.config.height / 1.52)],
                [Math.floor(game.config.width / 1.097), Math.floor(game.config.height / 1.52)],
                [Math.floor(game.config.width / 4.1), Math.floor(game.config.height / 1.15)],
                [Math.floor(game.config.width / 2.45), Math.floor(game.config.height / 1.15)],
                [Math.floor(game.config.width / 1.8), Math.floor(game.config.height / 1.15)],
                [Math.floor(game.config.width / 1.4), Math.floor(game.config.height / 1.15)]
            ];
        }
    };
    SetDirectionLines() {
        switch (LevelManager.movementDirection) {
            case "RTL":
                this.selectedLine = [
                    [
                        [game.config.width, game.config.height / 3.7],
                        [0, game.config.height / 3.7]
                    ],
                    [
                        [game.config.width, game.config.height / 2.1],
                        [0, game.config.height / 2.1]
                    ],
                    [
                        [game.config.width, game.config.height / 1.52],
                        [0, game.config.height / 1.52]
                    ],
                    [
                        [game.config.width, game.config.height / 1.18],
                        [0, game.config.height / 1.18],
                    ]
                ];
                return;
            case "LTR":
                this.selectedLine = [
                    [
                        [0, game.config.height / 3.7],
                        [game.config.width, game.config.height / 3.7]
                    ],
                    [
                        [0, game.config.height / 2.1],
                        [game.config.width, game.config.height / 2.1]
                    ],
                    [
                        [0, game.config.height / 1.52],
                        [game.config.width, game.config.height / 1.52]
                    ],
                    [
                        [0, game.config.height / 1.18],
                        [game.config.width, game.config.height / 1.18]
                    ]
                ];
                return;
            case "TTB":
                this.selectedLine = [
                    [
                        [game.config.width / 11, game.config.height / 6.5],
                        [game.config.width / 11, game.config.height / 1]
                    ],
                    [
                        [game.config.width / 4, game.config.height / 6.5],
                        [game.config.width / 4, game.config.height / 1]
                    ],
                    [
                        [game.config.width / 2.5, game.config.height / 6.5],
                        [game.config.width / 2.5, game.config.height / 1]
                    ],
                    [
                        [game.config.width / 1.8, game.config.height / 6.5],
                        [game.config.width / 1.8, game.config.height / 1]
                    ],
                    [
                        [game.config.width / 1.37, game.config.height / 6.5],
                        [game.config.width / 1.37, game.config.height / 1]
                    ],
                    [
                        [game.config.width / 1.12, game.config.height / 6.5],
                        [game.config.width / 1.12, game.config.height / 1]
                    ]
                ];
                return;
            case "BTT":
                this.selectedLine = [
                    [
                        [game.config.width / 11, game.config.height / 1],
                        [game.config.width / 11, game.config.height / 6.5]
                    ],
                    [
                        [game.config.width / 4, game.config.height / 1],
                        [game.config.width / 4, game.config.height / 6.5]
                    ],
                    [
                        [game.config.width / 2.5, game.config.height / 1],
                        [game.config.width / 2.5, game.config.height / 6.5]
                    ],
                    [
                        [game.config.width / 1.8, game.config.height / 1],
                        [game.config.width / 1.8, game.config.height / 6.5]
                    ],
                    [
                        [game.config.width / 1.37, game.config.height / 1],
                        [game.config.width / 1.37, game.config.height / 6.5]
                    ],
                    [
                        [game.config.width / 1.12, game.config.height / 1],
                        [game.config.width / 1.12, game.config.height / 6.5]
                    ],
                ];
                return;
            case "BRDTL":
                this.selectedLine = [
                    [
                        [game.config.width / 3.7, game.config.height / 1],
                        [game.config.width / 11, game.config.height / 6.5]
                    ],
                    [
                        [game.config.width / 2.3, game.config.height / 1],
                        [game.config.width / 4, game.config.height / 6.5]
                    ],
                    [
                        [game.config.width / 1.7, game.config.height / 1],
                        [game.config.width / 2.6, game.config.height / 6.5]
                    ],
                    [
                        [game.config.width / 1.35, game.config.height / 1],
                        [game.config.width / 1.9, game.config.height / 6.5]
                    ],
                    [
                        [game.config.width / 1.16, game.config.height / 1],
                        [game.config.width / 1.56, game.config.height / 6.5],
                    ],
                    [
                        [game.config.width / 1.005, game.config.height / 1],
                        [game.config.width / 1.27, game.config.height / 6.5]
                    ],
                    [
                        [game.config.width / 0.9, game.config.height / 1],
                        [game.config.width / 1.08, game.config.height / 6.5]
                    ]
                ];
                return;
            case "BLDTR":
                this.selectedLine = [
                    [
                        [game.config.width / 11, game.config.height / 1],
                        [game.config.width / 4, game.config.height / 6.5]
                    ],
                    [
                        [game.config.width / 4.4, game.config.height / 1],
                        [game.config.width / 2.5, game.config.height / 6.5]
                    ],
                    [
                        [game.config.width / 2.7, game.config.height / 1],
                        [game.config.width / 1.8, game.config.height / 6.5]
                    ],
                    [
                        [game.config.width / 1.9, game.config.height / 1],
                        [game.config.width / 1.45, game.config.height / 6.5]
                    ],
                    [
                        [game.config.width / 1.48, game.config.height / 1],
                        [game.config.width / 1.2, game.config.height / 6.5]
                    ],
                    [
                        [game.config.width / 1.22, game.config.height / 1],
                        [game.config.width / 1.04, game.config.height / 6.5]
                    ],
                    [
                        [game.config.width / 1.08, game.config.height / 1],
                        [game.config.width / 0.95, game.config.height / 6.5]
                    ]
                ];
                return;
            case "TLDBR":
                this.selectedLine = [
                    [
                        [game.config.width / 11, game.config.height / 6.5],
                        [game.config.width / 3.7, game.config.height / 1]
                    ],
                    [
                        [game.config.width / 4, game.config.height / 6.5],
                        [game.config.width / 2.3, game.config.height / 1]
                    ],
                    [
                        [game.config.width / 2.6, game.config.height / 6.5],
                        [game.config.width / 1.7, game.config.height / 1]
                    ],
                    [
                        [game.config.width / 1.9, game.config.height / 6.5],
                        [game.config.width / 1.35, game.config.height / 1]
                    ],
                    [
                        [game.config.width / 1.56, game.config.height / 6.5],
                        [game.config.width / 1.16, game.config.height / 1]
                    ],
                    [
                        [game.config.width / 1.27, game.config.height / 6.5],
                        [game.config.width / 1.005, game.config.height / 1]
                    ],
                    [
                        [game.config.width / 1.08, game.config.height / 6.5],
                        [game.config.width / 0.9, game.config.height / 1]
                    ]
                ];
                return;
            case "TRDBL":
                this.selectedLine = [
                    [
                        [game.config.width / 4, game.config.height / 6.5],
                        [game.config.width / 11, game.config.height / 1]
                    ],
                    [
                        [game.config.width / 2.5, game.config.height / 6.5],
                        [game.config.width / 4.4, game.config.height / 1]
                    ],
                    [
                        [game.config.width / 1.8, game.config.height / 6.5],
                        [game.config.width / 2.7, game.config.height / 1]
                    ],
                    [
                        [game.config.width / 1.45, game.config.height / 6.5],
                        [game.config.width / 1.9, game.config.height / 1]
                    ],
                    [
                        [game.config.width / 1.2, game.config.height / 6.5],
                        [game.config.width / 1.48, game.config.height / 1],
                    ],
                    [
                        [game.config.width / 1.04, game.config.height / 6.5],
                        [game.config.width / 1.22, game.config.height / 1]
                    ],
                    [
                        [game.config.width / 0.95, game.config.height / 6.5],
                        [game.config.width / 1.08, game.config.height / 1]
                    ]
                ];
                return;
        }
        // for (let i = 0; i < this.selectedLine.length; i++) {
        //     graphics1.lineBetween(this.selectedLine[i][0][0], this.selectedLine[i][0][1], this.selectedLine[i][1][0], this.selectedLine[i][1][1]);
        // }
    };

    SetEndPointsForMovement(_element) {
        let c1, c2, m;
        console.log("SetEndPointsForMovement->");
        let objX = Math.floor(_element.x);
        let objY = Math.floor(_element.y);
        for (let i = 0; i < this.selectedLine.length; i++) {
            m = (Math.floor(this.selectedLine[i][1][1] - this.selectedLine[i][0][1])) / Math.floor(this.selectedLine[i][1][0] - this.selectedLine[i][0][0]);

            if (m != 0 && m != Infinity && m != -Infinity) {
                console.log("this.rtlLines[i][0][1]" + m);
                c1 = Math.floor(this.selectedLine[i][1][1] - (m * this.selectedLine[i][1][0]));
                c2 = Math.floor((Math.floor(objY) - (m * objX)));
                if (this.CheckConstants(c1, c2, _element, this.selectedLine[i][0][0], this.selectedLine[i][0][1], this.selectedLine[i][1][0], this.selectedLine[i][1][1])) {
                    return;
                } else {
                    continue;
                }
            } else {
                console.log("this.rtlLines[i][0][1]" + m);
                if (m === 0) {
                    _element.continousStartX = this.selectedLine[i][0][0];
                    _element.continousStartY = _element.y;
                    _element.continousEndX = this.selectedLine[i][1][0];
                    _element.continousEndY = _element.y;

                } else {
                    console.log('val of m is : ' + m);
                    _element.continousStartX = _element.x;
                    _element.continousStartY = this.selectedLine[i][0][1];
                    _element.continousEndX = _element.x;
                    _element.continousEndY = this.selectedLine[i][1][1];
                }
            }
        }
    };
    CheckConstants(_c1, _c2, _element, _x1, _y1, _x2, _y2) {
        console.log("CheckConstants->" + _c1);
        console.log("CheckConstants->" + _c2);
        if (Math.abs(Math.abs(_c1) - Math.abs(_c2)) < 30) {
            _element.continousStartX = _x1;
            _element.continousStartY = _y1;
            _element.continousEndX = _x2;
            _element.continousEndY = _y2;
            console.log("CheckConstants");
            return true;
        }
        return false;
    };
    OnBackgroundClick() {
        this.totalNumberUserClicked += 1;
    };
    UpdateEachLevelTimer() {
        this.eachLevelTime += 100;
    };
    CreateLevel() {
        LevelManager.DecidePlacementOfImages();
        this.eachLevelTimer.paused = false;
        //=====> Images will be used in game <=====//
        this.ImageForCurrentLevel();
        //====> Image Rotation <====//
        this.MovementAndRotationOfImage();
        //====> Game image numer <==//
        this.numberOfAnswers;
        this.numberOfDestractor;
        this.placementOfImages;
        this.currentLevel = LevelManager.GetCurrentLevelNumber();
        //=========> Display Level <=====//
        setTimeout(() => {
            this.DisplayLevel();
        }, 500);
    };
    GameTimer() {
        let questionTimeData = LevelManager.DecideTimeOrNumberOfQuestion();
        console.log('questionTimeData : ', questionTimeData)
        if (questionTimeData[0] === null || questionTimeData[0] === "") {
            this.isTimerAvailable = false;
        } else {
            this.isTimerAvailable = true;
        }
        this.totalTimeForGame = questionTimeData[0];
        this.timeForEachLevel = questionTimeData[1];
        this.totalNumberOfLevel = questionTimeData[2];
        console.log('this.totalTimeForGame : ', this.totalTimeForGame);
        console.log('this.timeForEachLevel : ', this.timeForEachLevel);
        console.log('this.totalNumberOfLevel : ', this.totalNumberOfLevel);
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
        // console.log("this.movementTime "+ movementAndRotationData[1]);
        this.movementDirection = movementAndRotationData[0];
        this.movementTime = (movementAndRotationData[1] * 1000);
        this.rotationType = movementAndRotationData[2];
        this.rotationTime = (movementAndRotationData[3] * 1000);
        // console.log("this.isRotationAvailable "+this.isRotationAvailable);
    };
    ImageForCurrentLevel() {
        this.allLevelImage = LevelManager.SelectRandomGameImage();
        this.allLevelImage = LevelManager.ShuffleArr(this.allLevelImage);
        this.totalNumberOfImages = LevelManager.numberOfImage;
        this.numberOfAnswers = 2;
        this.requiredClickForTheGame = this.requiredClickForTheGame + 2;
        console.log('this.requiredClickForTheGame : ', this.requiredClickForTheGame);
        this.numberOfDestractor = this.totalNumberOfImages - 2;
        for (let i = 0; i < this.allLevelImage.length; i++) {
            this.allLevelImage[i] = LoadAssets.getImageName(this.allLevelImage[i]);
        }
        // console.log(" this.allLevelImage-----------"+  this.allLevelImage); 
        // console.log(" this.numberOfAnswers "+ this.numberOfAnswers);
        // console.log(" this.numberOfDestractor "+ this.numberOfDestractor);
        // console.log(" this.totalNumberOfImages-----------"+  this.totalNumberOfImages); 
    };
    DisplayLevel(_this) {
        let sceneRef = this;
        let answers = null;
        let destractor = null;
        // let _objectPosition = [...this.objectPosition];
        let _objectPosition = [...this.selectedObjectPosition];
        _objectPosition = LevelManager.ShuffleArr(_objectPosition);
        this.totalQuestionPresented += 1;
        // this.bg.depth = 2;
        for (let i = 0; i < this.numberOfAnswers; i++) {
            let index = Math.floor(Math.random() * (_objectPosition.length - 0) + 0);
            let pos = _objectPosition[index];
            _objectPosition.splice(index, 1);
            let singleImage = this.allLevelImage[0].split(".");
            answers = this.add.sprite(pos[0], pos[1], singleImage[0]).setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.7, scaleFactorY * 0.7);
            answers.key = "answers";
            answers.angle = this.objectAngle;
            answers.prevX = pos[0];
            answers.prevY = pos[1];
            // answers.depth = 3;
            this.objectAngle += 15;
            answers.setInteractive();
            answers.on("pointerup", sceneRef.onObjectClicked);
            this.answers.push(answers);
        }
        for (let i = 0; i < this.numberOfDestractor; i++) {
            let index1 = Math.floor(Math.random() * (_objectPosition.length - 0) + 0);
            let pos1 = _objectPosition[index1];
            _objectPosition.splice(index1, 1);
            let singleImage1 = this.allLevelImage[i + 1].split(".");
            destractor = this.add.sprite(pos1[0], pos1[1], singleImage1[0]).setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.7, scaleFactorY * 0.7);
            destractor.key = "destractor";
            destractor.prevX = pos1[0];
            destractor.prevY = pos1[1];
            // destractor.depth = 3;
            destractor.angle = this.objectAngle;
            this.objectAngle += 15;
            destractor.setInteractive();
            destractor.on("pointerup", sceneRef.onObjectClicked);
            this.destractor.push(destractor);
        }
        // console.log("this.isRotationAvailable");
        if (this.isRotationAvailable) {
            // console.log("this.isRotationAvailable");
            this.RotateImages(this.rotationType);
        }
        if (this.isMovementAvailabe) {
            this.SetMovementType(LevelManager.movementDirection, LevelManager.movementType);
        }
    };
    onObjectClicked() {
        this.disableInteractive();
        this.visible = false;
        this.scene.totalNumberUserClicked += 1;
        if (this.key == "answers") {
            this.visible = false;
            this.scene.numberOfAnswerClick += 1;
            if (this.scene.numberOfAnswerClick == this.scene.numberOfAnswers) {
                this.scene.totalGamePlayed += 1;
                this.scene.totalCorrectAnswer += 1;
                this.scene.consecutiveWins += 1;
                this.scene.consecutiveLoose = 0;
                // this.scene.numberOfAnswerClick = 0;
                this.scene.consecutiveComboWins += 1;
                if (this.scene.consecutiveComboWins > this.scene.comboWins) {
                    this.scene.comboWins = this.scene.consecutiveComboWins;
                }
                if ((this.scene.consecutiveWins != LevelManager.offsetForLevelUp) && (this.scene.totalGamePlayed != this.scene.totalNumberOfLevel)) {
                    this.scene.BannerCreateAndHide("EXCELLENT", true);
                    SoundManager.CorrectAnswerSoundPlay(); //Playing when answer is correct
                }
                // this.eachLevelTimer.paused = true;
                // this.totalEachLevelTime.push(this.eachLevelTime);
                this.scene.LevelWin(this.scene.totalCorrectAnswer);
                this.scene.ChangeLevel(true);
            }
        } else if (this.key == "destractor") {
            this.scene.totalGamePlayed += 1;
            // this.scene.numberOfAnswerClick = 0;
            // this.scene.comboWins =  this.scene.consecutiveWins;
            this.scene.totalInCorrectAnswer += 1;
            this.scene.consecutiveWins = 0;
            this.scene.consecutiveLoose += 1;
            this.scene.consecutiveComboWins = 0;
            // this.eachLevelTimer.paused = true;
            // this.totalEachLevelTime.push(this.eachLevelTime);
            SoundManager.InCorrectAnswerSoundPlay(); //Playing when answer is incorrect
            this.scene.LevelLoose(this.scene.totalInCorrectAnswer);
            this.scene.ChangeLevel(true);
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
                this.graphics.clear();
                this.graphics.visible = false;
                this.tickerRed.visible = false;
                this.tickerGreen.visible = false;
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
                this.timerDegre = -89; //1;
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
            // console.log("levelOrTimeComplete----------------------------");
            this.ClearLevel();
            if (this.consecutiveWins == LevelManager.offsetForLevelUp) {
                // console.log("level up----------------------------");
                this.consecutiveWins = 0;
                this.BannerCreateAndHide("LEVEL_UP", true);
                SoundManager.LevelUpSoundPlay();
                LevelManager.IncreaseLevel(LevelManager);
            } else if (this.consecutiveLoose == LevelManager.offsetForLevelDown) {
                // console.log("level Down----------------------------");
                if (this.currentLevel > 1) {
                    LevelManager.DecreaseLevel(LevelManager);
                }
                this.consecutiveLoose = 0;
            }
            this.currentLevel = LevelManager.GetCurrentLevelNumber();
            // setTimeout(() => {
            this.CreateLevel();
            // }, 700);
        }
    };
    ClearLevel() {
        this.eachLevelTimer.paused = true;
        this.totalEachLevelTime.push(this.eachLevelTime);
        this.answers = [];
        this.destractor = [];
        this.objectAngle = 15;
        this.numberOfAnswerClick = 0;
        this.eachLevelTime = 0;
        this.numberOfAnswers = 0;
        this.numberOfDestractor = [];
        this.movementContinuousIntervalBool = false;
        this.movementIntervalInterval = false;
        let arrLength = this.scene.scene.children.list.length;
        for (let i = 0; i < arrLength; i++) {
            if (this.scene.scene.children.list[i].key == "answers" ||
                this.scene.scene.children.list[i].key == "destractor") {
                this.scene.scene.children.list[i].destroy();
                arrLength = this.scene.scene.children.list.length;
                i = 0;
            }
        }
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
        this.graphics.clear();
        let offSet;
        if (this.isTimerAvailable) {
            this.timerDegre += (360 / this.totalTimeForGame); //36;
            offSet = (270 - (360 / this.totalTimeForGame));
        } else {
            this.timerDegre += (360 / this.timeForEachLevel); //36;
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
        for (let iterator of this.answers) {
            this.tweens.add({
                targets: iterator,
                angle: { from: iterator.angle, to: (_angle + iterator.angle) },
                ease: 'Linear',
                duration: this.rotationTime,
                callbackScope: this,
                loop: -1
            });
        }
        for (let iterator of this.destractor) {
            this.tweens.add({
                targets: iterator,
                angle: { from: iterator.angle, to: (_angle + iterator.angle) },
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
                // this.SetIntervalOffset(directionType);
                // this.SetDirectionType(directionType,  this.answers[0],false);
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
                // this.MovementIntervalContineous(_direction,this.destractor,continousStartX, continousStartY,
                //     continousEndX, continousEndY);

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
        let distance;
        let m;
        if (_bool) {
            switch (_direction) {
                case "RTL":
                    this.SetEndPointsForMovement(_obj);
                    this.movementTime = Math.abs(Math.abs(_obj.x - _obj.continousEndX) * (Math.floor(LevelManager.movementTime * 1000) / Math.abs(_obj.continousEndX - _obj.continousStartX)));
                    console.log(" this.movementTime =========" + this.movementTime);
                    distance = (Math.sqrt(Math.pow((Math.abs(_obj.continousEndX - _obj.continousStartX)), 2) + Math.pow((Math.abs(_obj.continousEndY - _obj.continousStartY)), 2)));
                    this.movementIntervalX = ((distance) / 10);
                    this.movementIntervalY = 0;
                    break;
                case "LTR":
                    this.SetEndPointsForMovement(_obj);
                    this.movementTime = Math.abs(Math.abs(_obj.continousEndX - _obj.x) * (Math.floor(LevelManager.movementTime * 1000) / Math.abs(_obj.continousEndX - _obj.continousStartX)));
                    distance = (Math.sqrt(Math.pow((Math.abs(_obj.continousEndX - _obj.continousStartX)), 2) + Math.pow((Math.abs(_obj.continousEndY - _obj.continousStartY)), 2)));
                    this.movementIntervalX = ((distance) / 10);
                    this.movementIntervalY = 0;

                    break;
                case "TTB":
                    this.SetEndPointsForMovement(_obj);
                    this.movementTime = Math.abs(Math.abs(_obj.y - _obj.continousEndY) * (Math.floor(LevelManager.movementTime * 1000) / Math.abs(_obj.continousStartY - _obj.continousEndY)));
                    distance = (Math.sqrt(Math.pow((Math.abs(_obj.continousEndX - _obj.continousStartX)), 2) + Math.pow((Math.abs(_obj.continousEndY - _obj.continousStartY)), 2)));
                    this.movementIntervalX = 0;
                    this.movementIntervalY = ((distance) / 10);

                    break;
                case "BTT":
                    this.SetEndPointsForMovement(_obj);
                    this.movementTime = Math.abs(Math.abs(_obj.y - _obj.continousEndY) * (Math.floor(LevelManager.movementTime * 1000) / Math.abs(_obj.continousStartY - _obj.continousEndY)));
                    distance = (Math.sqrt(Math.pow((Math.abs(_obj.continousEndX - _obj.continousStartX)), 2) + Math.pow((Math.abs(_obj.continousEndY - _obj.continousStartY)), 2)));
                    this.movementIntervalX = 0;
                    this.movementIntervalY = -((distance) / 10);
                    break;
                case "BRDTL":
                    this.SetEndPointsForMovement(_obj);
                    console.log("BRDTL-----------------");
                    this.movementTime = Math.abs(Math.abs(_obj.y - _obj.continousEndY) * (Math.floor(LevelManager.movementTime * 1000) / Math.abs(_obj.continousEndY - _obj.continousStartY))); // this.TimeForContineous(_obj, _obj.x, _obj.y,_obj.continousEndX,_obj.continousEndY);
                    distance = (Math.sqrt(Math.pow((Math.abs(_obj.continousEndX - _obj.continousStartX)), 2) + Math.pow((Math.abs(_obj.continousEndY - _obj.continousStartY)), 2)));
                    this.movementIntervalX = (Math.abs(_obj.continousEndX - _obj.continousStartX)) / 10; //((distance) / 10);
                    this.movementIntervalY = (Math.abs(_obj.continousEndY - _obj.continousStartY)) / 10; //((distance) / 10);

                    break;
                case "BLDTR":
                    this.SetEndPointsForMovement(_obj);
                    console.log("BLDTR-----------------");
                    this.movementTime = Math.abs(Math.abs(_obj.y - _obj.continousEndY) * (Math.floor(LevelManager.movementTime * 1000) / Math.abs(_obj.continousEndY - _obj.continousStartY))); // this.TimeForContineous(_obj, _obj.x, _obj.y,_obj.continousEndX,_obj.continousEndY);
                    distance = (Math.sqrt(Math.pow((Math.abs(_obj.continousEndX - _obj.continousStartX)), 2) + Math.pow((Math.abs(_obj.continousEndY - _obj.continousStartY)), 2)));
                    // this.movementIntervalX = ((distance) / 10);
                    // this.movementIntervalY = ((distance) / 10);
                    this.movementIntervalX = (Math.abs(_obj.continousEndX - _obj.continousStartX)) / 10; //((distance) / 10);
                    this.movementIntervalY = (Math.abs(_obj.continousEndY - _obj.continousStartY)) / 10; //((distance) / 10);
                    break;
                case "TLDBR":
                    this.SetEndPointsForMovement(_obj);
                    console.log("TLDBR-----------------");
                    this.movementTime = Math.abs(Math.abs(_obj.y - _obj.continousEndY) * (Math.floor(LevelManager.movementTime * 1000) / Math.abs(_obj.continousEndY - _obj.continousStartY))); // this.TimeForContineous(_obj, _obj.x, _obj.y,_obj.continousEndX,_obj.continousEndY);
                    distance = (Math.sqrt(Math.pow((Math.abs(_obj.continousEndX - _obj.continousStartX)), 2) + Math.pow((Math.abs(_obj.continousEndY - _obj.continousStartY)), 2)));
                    // this.movementIntervalX = ((distance) / 10);
                    // this.movementIntervalY = ((distance) / 10);
                    this.movementIntervalX = (Math.abs(_obj.continousEndX - _obj.continousStartX)) / 10; //((distance) / 10);
                    this.movementIntervalY = (Math.abs(_obj.continousEndY - _obj.continousStartY)) / 10; //((distance) / 10);
                    break;
                case "TRDBL":
                    this.SetEndPointsForMovement(_obj);
                    this.movementTime = Math.abs(Math.abs(_obj.y - _obj.continousEndY) * (Math.floor(LevelManager.movementTime * 1000) / Math.abs(_obj.continousEndY - _obj.continousStartY))); // this.TimeForContineous(_obj, _obj.x, _obj.y,_obj.continousEndX,_obj.continousEndY);
                    // console.log("TRDBL-----------------");
                    distance = (Math.sqrt(Math.pow((Math.abs(_obj.continousEndX - _obj.continousStartX)), 2) + Math.pow((Math.abs(_obj.continousEndY - _obj.continousStartY)), 2)));
                    // this.movementIntervalX = ((distance) / 10);
                    // this.movementIntervalY = ((distance) / 10);
                    this.movementIntervalX = (Math.abs(_obj.continousEndX - _obj.continousStartX)) / 10; //((distance) / 10);
                    this.movementIntervalY = (Math.abs(_obj.continousEndY - _obj.continousStartY)) / 10; //((distance) / 10);
                    break;
            }
        }
        this.StartMovement(_obj, continousStartX, continousStartY,
            continousEndX, continousEndY, _direction);
    };
    TimeForContineous(_obj, _startX, _startY, _endX, _endY) {
        let distance = null,
            distance2 = null;
        if (LevelManager.movementDirection == "RTL" || LevelManager.movementDirection == "LTR") {
            this.movementTime = parseInt(((LevelManager.movementTime * 1000) / Math.abs(_obj.continousEndX - _obj.continousStartX)) * Math.abs(_startX - _endX));
        } else if (LevelManager.movementDirection == "BTT" || LevelManager.movementDirection == "TTB") {
            this.movementTime = parseInt(((LevelManager.movementTime * 1000) / Math.abs(_obj.continousEndY - _obj.continousStartY)) * Math.abs(_startY - _endY));
        } else if (LevelManager.movementDirection == "BRDTL") {
            // distance = (Math.sqrt(Math.pow((_obj.continousStartX - _obj.continousEndX),2)
            // +Math.pow((_obj.continousStartY - _obj.continousEndY),2)));
            distance = (Math.sqrt(Math.pow((game.config.width - 0), 2) +
                Math.pow((game.config.height - 0), 2)));
            distance2 = (Math.sqrt(Math.pow((_startX - _endX), 2) + Math.pow((_startY - _endY), 2)));
            this.movementTime = (((LevelManager.movementTime * 1000) / Math.abs(distance)) * Math.abs(distance2));
        } else {
            distance = parseInt(Math.sqrt(Math.pow((_obj.continousEndX - _obj.continousStartX), 2) + Math.pow((_obj.continousEndY - _obj.continousStartY), 2)));
            distance2 = parseInt(Math.sqrt(Math.pow((_startX - _endX), 2) + Math.pow((_startY - _endY), 2)));
            this.movementTime = parseInt(((LevelManager.movementTime * 1000) / Math.abs(distance)) * Math.abs(distance2));
            // console.log("distance "+distance);
            // console.log("distance2 "+distance2);
        }
        console.log("this.movementTime " + this.movementTime);
        return this.movementTime;
    };
    TimeForInterval(_obj) {
        let distance = parseInt(Math.sqrt(Math.pow((_obj.continousEndX - _obj.continousStartX), 2) + Math.pow(Math.abs(_obj.continousEndY - _obj.continousStartY), 2)));

        if (LevelManager.movementDirection == "RTL" || LevelManager.movementDirection == "LTR") {
            this.movementTime = (distance / this.movementIntervalX);
        } else if (LevelManager.movementDirection == "BTT" || LevelManager.movementDirection == "TTB") {
            this.movementTime = (distance / Math.abs(this.movementIntervalY));
        } else {
            this.movementTime = (distance / this.movementIntervalY)
        }
        this.movementTime = parseInt((LevelManager.movementTime * 1000) / this.movementTime);
        return this.movementTime;
    };
    MovementContineous(_obj, _startX, _startY, _endX, _endY) {
        this.tweens.add({
            targets: _obj,
            x: _obj.continousEndX,
            y: _obj.continousEndY,
            ease: 'Linear',
            duration: this.movementTime,
            callbackScope: this,
            onComplete: function () {
                if (this.isMovementContinuous) {
                    console.log('entering')
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

        // }
    };
    MovementContineousContineous(_obj, _startX, _startY, _endX, _endY) {
        // this.movementTime = this.TimeForContineous(_obj, _obj.x, _obj.y, _obj.continousEndX, _obj.continousEndY);
        console.log("MovementContineousContineous-----------------------");
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
        this.movementContinuousIntervalArr = [];
        console.log("MovementContineousInterval-------");
        if (!this.movementContinuousIntervalBool) {
            this.movementTime = this.TimeForInterval(_obj);
            this.intervalTimer = this.time.addEvent({
                delay: this.movementTime,
                callback: () => {
                    if (this.movementContinuousIntervalArr.length > 0) {
                        this.movementContinuousIntervalArr.forEach(element => {
                            switch (_dir) {
                                case "RTL":
                                    if ((element.x) > (element.continousEndX)) {
                                        element.x -= this.movementIntervalX;
                                    } else {
                                        element.setPosition(element.continousStartX, element.y);
                                    }
                                    break;
                                case "LTR":
                                    if ((element.x) < (element.continousEndX)) {
                                        element.x += this.movementIntervalX;
                                    } else {
                                        element.setPosition(element.continousStartX, (element.y));
                                    }
                                    break;
                                case "TTB":
                                    console.log("TTB " + this.movementTime);
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
                                    if (element.y > element.continousEndY) {

                                        element.x -= this.movementIntervalX;
                                        element.y -= this.movementIntervalY;
                                    } else {
                                        element.setPosition(element.continousStartX, element.continousStartY);
                                    }
                                    break;
                                case "BLDTR":
                                    if (element.y > element.continousEndY) {
                                        element.x += this.movementIntervalX;
                                        element.y -= this.movementIntervalY;
                                    } else {
                                        element.setPosition(element.continousStartX, element.continousStartY);
                                    }
                                    break;
                                case "TLDBR":
                                    if (element.y < element.continousEndY) {
                                        element.x += this.movementIntervalX;
                                        element.y += this.movementIntervalY;
                                    } else {
                                        element.setPosition(element.continousStartX, element.continousStartY);
                                    }
                                    break;
                                case "TRDBL":
                                    if (element.y < element.continousEndY) {
                                        element.x -= this.movementIntervalX;
                                        element.y += this.movementIntervalY;
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
                _obj.setPosition(_obj.continousStartX, _obj.continousStartY);
                this.movementContinuousIntervalArr.push(_obj);
            }
        });
        this.movementContinuousIntervalBool = true;
    };
    MovementIntervalContineous(_dir, _obj, continousStartX, continousStartY, continousEndX, continousEndY) {
        let counter = _obj.length;
        this.movementTime = this.TimeForInterval(_obj);
        let intervalTimer = this.time.addEvent({
            delay: this.movementTime,
            callback: () => {
                switch (_dir) {
                    case "RTL":
                        if ((_obj.x) > (_obj.continousEndX)) {
                            _obj.x -= this.movementIntervalX;
                        } else {
                            _obj.setPosition(_obj.continousStartX, _obj.y);
                            this.MovementIntervalContineousTween(_obj, _obj.continousEndX, _obj.y);
                        }
                        break;
                    case "LTR":
                        if ((_obj.x) < (_obj.continousEndX)) {
                            _obj.x += this.movementIntervalX;
                        } else {
                            _obj.setPosition(_obj.continousStartX, (_obj.y));
                            this.MovementIntervalContineousTween(_obj, _obj.continousEndX, _obj.y);
                        }
                        break;
                    case "TTB":
                        if (_obj.y < _obj.continousEndY) {
                            _obj.y += this.movementIntervalY;
                        } else {
                            _obj.setPosition(_obj.x, (_obj.continousStartY));
                            this.MovementIntervalContineousTween(_obj, _obj.x, (_obj.continousEndY));
                        }
                        break;
                    case "BTT":
                        if (_obj.y > _obj.continousEndY) {
                            _obj.y += this.movementIntervalY;
                        } else {
                            console.log("FAIZ------------");
                            _obj.setPosition(_obj.x, (_obj.continousStartY));
                            this.MovementIntervalContineousTween(_obj, _obj.x, (_obj.continousEndY));
                        }
                        break;

                    case "BRDTL":
                        if (_obj.y > _obj.continousEndY) {

                            _obj.x -= this.movementIntervalX;
                            _obj.y -= this.movementIntervalY;
                        } else {
                            _obj.setPosition(_obj.continousStartX, _obj.continousStartY);
                            this.MovementIntervalContineousTween(_obj, _obj.continousEndX, _obj.continousEndY);
                        }
                        break;
                    case "BLDTR":
                        if (_obj.y > _obj.continousEndY) {
                            _obj.x += this.movementIntervalX;
                            _obj.y -= this.movementIntervalY;
                        } else {
                            _obj.setPosition(_obj.continousStartX, _obj.continousStartY);
                            this.MovementIntervalContineousTween(_obj, _obj.continousEndX, _obj.continousEndY);
                        }
                        break;
                    case "TLDBR":
                        if (_obj.y < _obj.continousEndY) {
                            _obj.x += this.movementIntervalX;
                            _obj.y += this.movementIntervalY;
                        } else {
                            _obj.setPosition(_obj.continousStartX, _obj.continousStartY);
                            this.MovementIntervalContineousTween(_obj, _obj.continousEndX, _obj.continousEndY);
                        }
                        break;
                    case "TRDBL":
                        if (_obj.y < _obj.continousEndY) {
                            _obj.x -= this.movementIntervalX;
                            _obj.y += this.movementIntervalY;
                        } else {
                            _obj.setPosition(_obj.continousStartX, _obj.continousStartY);
                            this.MovementIntervalContineousTween(_obj, _obj.continousEndX, _obj.continousEndY);
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
                delay: this.movementTime,
                callback: () => {
                    this.movementIntervalIntervalArr.forEach(element => {
                        switch (_dir) {
                            case "RTL":
                                // console.log("RTL---------------------------");
                                // if (element.x > -(game.config.width - element.prevX)) {
                                if ((element.x) > (element.continousEndX)) {
                                    element.x -= this.movementIntervalX;
                                } else {
                                    element.setPosition(element.continousStartX, element.y);
                                    // element.setPosition((game.config.width + (element.prevX)), element.y);
                                }
                                break;
                            case "LTR":
                                // if (element.x < (game.config.width + (element.prevX))) {
                                if ((element.x) < (element.continousStartX)) {
                                    element.x += this.movementIntervalX;
                                } else {
                                    // element.setPosition(-(game.config.width - element.prevX), element.y);
                                    element.setPosition(element.continousEndX, (element.y));
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
                                // if (element.x > element.continousStartY) {
                                if (element.y > element.continousStartY) {

                                    element.x -= this.movementIntervalX;
                                    element.y -= this.movementIntervalY;
                                } else {
                                    // element.setPosition(element.continousStartX, element.continousEndX);
                                    element.setPosition(element.continousEndX, element.continousEndY);
                                }
                                // } else {
                                //     element.setPosition(element.continousStartX, element.continousEndY);
                                // }
                                break;
                            case "BLDTR":
                                // if (element.x < element.continousEndX) {
                                if (element.y > element.continousEndY) {
                                    element.x += this.movementIntervalX;
                                    element.y -= this.movementIntervalY;
                                } else {
                                    element.setPosition(element.continousStartX, element.continousStartY);
                                }
                                // } else {
                                //     element.setPosition(element.continousStartX, element.continousStartY);
                                // }
                                break;
                            case "TLDBR":
                                // console.log("Interval---------------" + _dir);
                                // if (element.x < element.continousEndX) {
                                if (element.y < element.continousEndY) {
                                    element.x += this.movementIntervalX;
                                    element.y += this.movementIntervalY;
                                } else {
                                    element.setPosition(element.continousStartX, element.continousStartY);
                                }
                                // } else {
                                //     element.setPosition(element.continousStartX, element.continousStartY);
                                // }
                                break;
                            case "TRDBL":
                                // if (element.x > element.continousEndX) {
                                if (element.y < element.continousEndY) {
                                    element.x -= this.movementIntervalX;
                                    element.y += this.movementIntervalY;
                                } else {
                                    element.setPosition(element.continousStartX, element.continousStartY);
                                }
                                // } else {
                                //     element.setPosition(element.continousStartX, element.continousStartY);
                                // }
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
    MovementInterval(_obj, _dir) {
        let rtldBuffer;
        let m;
        this.movementIntervalIntervalArr.push(_obj);
        if (!this.movementIntervalInterval) {
            // this.movementTime = this.TimeForInterval(_obj);
            console.log("this.movementTime " + this.movementTime);
            this.intervalTimer = this.time.addEvent({
                delay: this.movementTime,
                callback: () => {
                    // console.log("Interval---------------");
                    this.movementIntervalIntervalArr.forEach(element => {

                        switch (_dir) {
                            case "RTL":
                                // console.log("RTL---------------------------");
                                // if (element.x > -(game.config.width - element.prevX)) {
                                if ((element.x) > (element.continousEndX)) {
                                    element.x -= this.movementIntervalX;
                                } else {
                                    element.setPosition(element.continousStartX, element.y);
                                    // element.setPosition((game.config.width + (element.prevX)), element.y);
                                }
                                break;
                            case "LTR":
                                // if (element.x < (game.config.width + (element.prevX))) {
                                if ((element.x) < (element.continousStartX)) {
                                    element.x += this.movementIntervalX;
                                } else {
                                    // element.setPosition(-(game.config.width - element.prevX), element.y);
                                    element.setPosition(element.continousEndX, (element.y));
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
                                // if (element.x > element.continousStartY) {
                                if (element.y > element.continousStartY) {

                                    element.x -= this.movementIntervalX;
                                    element.y -= this.movementIntervalY;
                                } else {
                                    // element.setPosition(element.continousStartX, element.continousEndX);
                                    element.setPosition(element.continousEndX, element.continousEndY);
                                }
                                // } else {
                                //     element.setPosition(element.continousStartX, element.continousEndY);
                                // }
                                break;
                            case "BLDTR":
                                // if (element.x < element.continousEndX) {
                                if (element.y > element.continousEndY) {
                                    element.x += this.movementIntervalX;
                                    element.y -= this.movementIntervalY;
                                } else {
                                    element.setPosition(element.continousStartX, element.continousStartY);
                                }
                                // } else {
                                //     element.setPosition(element.continousStartX, element.continousStartY);
                                // }
                                break;
                            case "TLDBR":
                                // console.log("Interval---------------" + _dir);
                                // if (element.x < element.continousEndX) {
                                if (element.y < element.continousEndY) {
                                    element.x += this.movementIntervalX;
                                    element.y += this.movementIntervalY;
                                } else {
                                    element.setPosition(element.continousStartX, element.continousStartY);
                                }
                                // } else {
                                //     element.setPosition(element.continousStartX, element.continousStartY);
                                // }
                                break;
                            case "TRDBL":
                                // if (element.x > element.continousEndX) {
                                if (element.y < element.continousEndY) {
                                    element.x -= this.movementIntervalX;
                                    element.y += this.movementIntervalY;
                                } else {
                                    element.setPosition(element.continousStartX, element.continousStartY);
                                }
                                // } else {
                                //     element.setPosition(element.continousStartX, element.continousStartY);
                                // }
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
        // let _accuracy = (this.totalNumberUserClicked === 0) ? 0 : parseInt((this.totalGamePlayed / this.totalNumberUserClicked) * 100);
        let _accuracy = (this.totalNumberUserClicked === 0) ? 0 : parseInt((this.requiredClickForTheGame / this.totalNumberUserClicked) * 100);
        let _totalTime = 0;
        let _avarageTime = 0;
        for (let i = 0; i < this.totalEachLevelTime.length; i++) {
            _totalTime += this.totalEachLevelTime[i];

        }
        if (_totalTime > 0) {
            _avarageTime = (_totalTime / this.totalGamePlayed);; //(this.totalGamePlayed / _totalTime);
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

        //===============first star calculation===================

        let firstStar = (_correctAnwer / this.totalQuestionPresented);
        console.log('firstStar : ' + firstStar);
        console.log('spectific success rate :  ' + Database.success_rate);
        if (firstStar >= Database.success_rate) {
            console.log('get first star');
            post_game.firstStar = true;
        } else {
            post_game.firstStar = false;
        }

        //================second star calculation====================
        console.log('average answer time : ' + _avarageTime);
        if (parseFloat(_avarageTime).toFixed(2) <= parseFloat(Database.average_answer_time)) {
            post_game.secondStar = true;
        }
        else {
            post_game.secondStar = false;
        }
        //================third star calculation============================
        let calculation = 2;
        console.log('calculation : ' + calculation);
        let endLevel = _level;
        let startLevel = parseInt(Database.level);
        console.log('start level : ' + startLevel + 'initial level : ' + endLevel);
        if ((endLevel - startLevel) >= calculation) {
            post_game.thirdStar = true;
        } else {
            post_game.thirdStar = false;
        }
        //==========score calculation==================================
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
            //     "&game_name=" + "the-parrot-challenge", "_self");
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
                    "&game_name=" + "the-parrot-challenge" +
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
                    "&game_name=" + "the-parrot-challenge", "_self");
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