import { LevelManeger } from "./LevelManeger.js";
export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene')
        this.headerBar;
        this.thumbsUp;
        this.thumbsDown;
        this.thumbsUpText;
        this.thumbsDownText;
        this.totalCorrectAnswer = 0;
        this.totalInCorrectAnswer = 0;
        this.question;
        this.numberOfAnswers;
        this.placementOfImages;

        //=============different object(answers)position for different movement======================
        this.northPosition = [];
        this.southPosition = [];
        this.eastPosition = [];
        this.westPosition = [];
        this.northEastPosition = [];
        this.northWestPosition = [];
        this.southEastPosition = [];
        this.southWestPosition = [];
        //----------------------------------
        this.isMovementContinuous = true;
        this.movementContinuousIntervalArr = [];
        this.movementIntervalIntervalArr = [];
        this.movementIntervalInterval = false;
        this.movementContinuousIntervalBool = false;
        this.movementContineousTween;
        this.intervalTimer;
        this.currentLevel = 1;
        this.ball_1;
        this.ball_2;
        this.ball_3;
        this.ball_4;
        this.ball_5;
        this.ball_6;
        this.ball_7;
        this.ball_correct;
        //----------------------------------
        this.movementIntervalY;
        this.isInetervalContinuous = true;
        this.continousStartX;
        this.continousStartY;
        this.continousEndX;
        this.continousEndY;
        this.movementType;
    }
    preload() {

    }
    create() {
        let bg = this.add.image(game.config.width / 2, game.config.height / 2, 'background').setOrigin(0.5);
        this.headerBar = this.add.image(game.config.width / 2, game.config.height / 17, 'titleBg').setOrigin(0.5).setScale(scaleFactorX * 2.3, scaleFactorY * 2.5);
        this.headerBar.depth = 2;
        const style = { font: "bold 30px Arial", fill: "#000" };
        const style1 = { font: "bold 30px Arial", fill: "#47f" };
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
        this.ticker = this.add.image(game.config.width / 4, game.config.height / 13, "ticker").setOrigin(0.5).setScale(scaleFactorX * 0.7, scaleFactorY * 0.7);
        this.ticker.depth = 3;
        // console.log('specific game data : ' , this.testJsonObj.general.movement_type);

        this.westPosition = [
            [Math.floor(game.config.width / 22), Math.floor(game.config.height / 2.3)],
            [Math.floor(game.config.width / 8.5), Math.floor(game.config.height / 2.3)],
            [Math.floor(game.config.width / 5.3), Math.floor(game.config.height / 2.3)],
            [Math.floor(game.config.width / 3.8), Math.floor(game.config.height / 2.3)],
            [Math.floor(game.config.width / 22), Math.floor(game.config.height / 1.4)],
            [Math.floor(game.config.width / 8.5), Math.floor(game.config.height / 1.4)],
            [Math.floor(game.config.width / 5.3), Math.floor(game.config.height / 1.4)],
            [Math.floor(game.config.width / 3.8), Math.floor(game.config.height / 1.4)],
        ]
        this.eastPosition = [
            [Math.floor(game.config.width / 1.36), Math.floor(game.config.height / 2.3)],
            [Math.floor(game.config.width / 1.23), Math.floor(game.config.height / 2.3)],
            [Math.floor(game.config.width / 1.13), Math.floor(game.config.height / 2.3)],
            [Math.floor(game.config.width / 1.04), Math.floor(game.config.height / 2.3)],
            [Math.floor(game.config.width / 1.36), Math.floor(game.config.height / 1.4)],
            [Math.floor(game.config.width / 1.23), Math.floor(game.config.height / 1.4)],
            [Math.floor(game.config.width / 1.13), Math.floor(game.config.height / 1.4)],
            [Math.floor(game.config.width / 1.04), Math.floor(game.config.height / 1.4)],
        ]
        this.northPosition = [
            [Math.floor(game.config.width / 2.6), Math.floor(game.config.height / 4.67)],
            [Math.floor(game.config.width / 2.2), Math.floor(game.config.height / 4.67)],
            [Math.floor(game.config.width / 1.9), Math.floor(game.config.height / 4.67)],
            [Math.floor(game.config.width / 1.67), Math.floor(game.config.height / 4.67)],
            [Math.floor(game.config.width / 2.6), Math.floor(game.config.height / 2.78)],
            [Math.floor(game.config.width / 2.2), Math.floor(game.config.height / 2.78)],
            [Math.floor(game.config.width / 1.9), Math.floor(game.config.height / 2.78)],
            [Math.floor(game.config.width / 1.67), Math.floor(game.config.height / 2.78)],
        ]
        this.southPosition = [
            [Math.floor(game.config.width / 2.6), Math.floor(game.config.height / 1.29)],
            [Math.floor(game.config.width / 2.2), Math.floor(game.config.height / 1.29)],
            [Math.floor(game.config.width / 1.9), Math.floor(game.config.height / 1.29)],
            [Math.floor(game.config.width / 1.67), Math.floor(game.config.height / 1.29)],
            [Math.floor(game.config.width / 2.6), Math.floor(game.config.height / 1.08)],
            [Math.floor(game.config.width / 2.2), Math.floor(game.config.height / 1.08)],
            [Math.floor(game.config.width / 1.9), Math.floor(game.config.height / 1.08)],
            [Math.floor(game.config.width / 1.67), Math.floor(game.config.height / 1.08)],
        ]
        this.northWestPosition = [
            [Math.floor(game.config.width / 22), Math.floor(game.config.height / 4.3)],
            [Math.floor(game.config.width / 9), Math.floor(game.config.height / 4.3)],
            [Math.floor(game.config.width / 5.5), Math.floor(game.config.height / 4.3)],
            [Math.floor(game.config.width / 3.9), Math.floor(game.config.height / 4.3)],
            [Math.floor(game.config.width / 22), Math.floor(game.config.height / 2.4)],
            [Math.floor(game.config.width / 9), Math.floor(game.config.height / 2.4)],
            [Math.floor(game.config.width / 5.5), Math.floor(game.config.height / 2.4)],
            [Math.floor(game.config.width / 3.9), Math.floor(game.config.height / 2.4)],
        ]
        this.northEastPosition = [
            [Math.floor(game.config.width / 1.5), Math.floor(game.config.height / 4.3)],
            [Math.floor(game.config.width / 1.32), Math.floor(game.config.height / 4.3)],
            [Math.floor(game.config.width / 1.18), Math.floor(game.config.height / 4.3)],
            [Math.floor(game.config.width / 1.06), Math.floor(game.config.height / 4.3)],
            [Math.floor(game.config.width / 1.5), Math.floor(game.config.height / 2.4)],
            [Math.floor(game.config.width / 1.32), Math.floor(game.config.height / 2.4)],
            [Math.floor(game.config.width / 1.18), Math.floor(game.config.height / 2.4)],
            [Math.floor(game.config.width / 1.06), Math.floor(game.config.height / 2.4)],
        ]
        this.southEastPosition = [
            [Math.floor(game.config.width / 22), Math.floor(game.config.height / 1.4)],
            [Math.floor(game.config.width / 8), Math.floor(game.config.height / 1.4)],
            [Math.floor(game.config.width / 5), Math.floor(game.config.height / 1.4)],
            [Math.floor(game.config.width / 3.6), Math.floor(game.config.height / 1.4)],
            [Math.floor(game.config.width / 22), Math.floor(game.config.height / 1.1)],
            [Math.floor(game.config.width / 8), Math.floor(game.config.height / 1.1)],
            [Math.floor(game.config.width / 5), Math.floor(game.config.height / 1.1)],
            [Math.floor(game.config.width / 3.6), Math.floor(game.config.height / 1.1)],
        ]
        this.southWestPosition = [
            [Math.floor(game.config.width / 1.5), Math.floor(game.config.height / 1.4)],
            [Math.floor(game.config.width / 1.32), Math.floor(game.config.height / 1.4)],
            [Math.floor(game.config.width / 1.18), Math.floor(game.config.height / 1.4)],
            [Math.floor(game.config.width / 1.06), Math.floor(game.config.height / 1.4)],
            [Math.floor(game.config.width / 1.5), Math.floor(game.config.height / 1.1)],
            [Math.floor(game.config.width / 1.32), Math.floor(game.config.height / 1.1)],
            [Math.floor(game.config.width / 1.18), Math.floor(game.config.height / 1.1)],
            [Math.floor(game.config.width / 1.06), Math.floor(game.config.height / 1.1)],
        ]

        // answers images west pos
        // this.ball_1 = this.add.image(this.westPosition[0][0],this.westPosition[0][1],'ball_1').setOrigin(0.5);
        // this.ball_2 = this.add.image(this.westPosition[1][0],this.westPosition[1][1],'ball_2').setOrigin(0.5);
        // this.ball_3 = this.add.image(this.westPosition[2][0],this.westPosition[2][1],'ball_3').setOrigin(0.5);
        // this.ball_4 = this.add.image(this.westPosition[3][0],this.westPosition[3][1],'ball_4').setOrigin(0.5);
        // this.ball_correct = this.add.image(this.westPosition[4][0],this.westPosition[4][1],'ball_correct').setOrigin(0.5);
        // this.ball_5 = this.add.image(this.westPosition[5][0],this.westPosition[5][1],'ball_1').setOrigin(0.5);
        // this.ball_6 = this.add.image(this.westPosition[6][0],this.westPosition[6][1],'ball_3').setOrigin(0.5);
        // this.ball_7 = this.add.image(this.westPosition[7][0],this.westPosition[7][1],'ball_4').setOrigin(0.5);

        // answer images east pos
        // this.ball_1 = this.add.image(this.eastPosition[0][0],this.eastPosition[0][1],'ball_1').setOrigin(0.5);
        // this.ball_2 = this.add.image(this.eastPosition[1][0],this.eastPosition[1][1],'ball_2').setOrigin(0.5);
        // this.ball_3 = this.add.image(this.eastPosition[2][0],this.eastPosition[2][1],'ball_3').setOrigin(0.5);
        // this.ball_4 = this.add.image(this.eastPosition[3][0],this.eastPosition[3][1],'ball_4').setOrigin(0.5);
        // this.ball_correct = this.add.image(this.eastPosition[4][0],this.eastPosition[4][1],'ball_correct').setOrigin(0.5);
        // this.ball_5 = this.add.image(this.eastPosition[5][0],this.eastPosition[5][1],'ball_1').setOrigin(0.5);
        // this.ball_6 = this.add.image(this.eastPosition[6][0],this.eastPosition[6][1],'ball_3').setOrigin(0.5);
        // this.ball_7 = this.add.image(this.eastPosition[7][0],this.eastPosition[7][1],'ball_4').setOrigin(0.5);

        // answer image north pos
        // this.ball_1 = this.add.image(this.northPosition[0][0],this.northPosition[0][1],'ball_1').setOrigin(0.5).setScale(scaleFactorX * 0.8, scaleFactorY * 0.8);
        // this.ball_2 = this.add.image(this.northPosition[1][0],this.northPosition[1][1],'ball_2').setOrigin(0.5).setScale(scaleFactorX * 0.8, scaleFactorY * 0.8);
        // this.ball_3 = this.add.image(this.northPosition[2][0],this.northPosition[2][1],'ball_3').setOrigin(0.5).setScale(scaleFactorX * 0.8, scaleFactorY * 0.8);
        // this.ball_4 = this.add.image(this.northPosition[3][0],this.northPosition[3][1],'ball_4').setOrigin(0.5).setScale(scaleFactorX * 0.8, scaleFactorY * 0.8);
        // this.ball_correct = this.add.image(this.northPosition[4][0],this.northPosition[4][1],'ball_correct').setOrigin(0.5).setScale(scaleFactorX * 0.8, scaleFactorY * 0.8);
        // this.ball_5 = this.add.image(this.northPosition[5][0],this.northPosition[5][1],'ball_1').setOrigin(0.5).setScale(scaleFactorX * 0.8, scaleFactorY * 0.8);
        // this.ball_6 = this.add.image(this.northPosition[6][0],this.northPosition[6][1],'ball_3').setOrigin(0.5).setScale(scaleFactorX * 0.8, scaleFactorY * 0.8);
        // this.ball_7 = this.add.image(this.northPosition[7][0],this.northPosition[7][1],'ball_4').setOrigin(0.5).setScale(scaleFactorX * 0.8, scaleFactorY * 0.8);

        // answer image south pos
        // this.ball_1 = this.add.image(this.southPosition[0][0],this.southPosition[0][1],'ball_1').setOrigin(0.5).setScale(scaleFactorX * 0.8, scaleFactorY * 0.8);
        // this.ball_2 = this.add.image(this.southPosition[1][0],this.southPosition[1][1],'ball_2').setOrigin(0.5).setScale(scaleFactorX * 0.8, scaleFactorY * 0.8);
        // this.ball_3 = this.add.image(this.southPosition[2][0],this.southPosition[2][1],'ball_3').setOrigin(0.5).setScale(scaleFactorX * 0.8, scaleFactorY * 0.8);
        // this.ball_4 = this.add.image(this.southPosition[3][0],this.southPosition[3][1],'ball_4').setOrigin(0.5).setScale(scaleFactorX * 0.8, scaleFactorY * 0.8);
        // this.ball_correct = this.add.image(this.southPosition[4][0],this.southPosition[4][1],'ball_correct').setOrigin(0.5).setScale(scaleFactorX * 0.8, scaleFactorY * 0.8);
        // this.ball_5 = this.add.image(this.southPosition[5][0],this.southPosition[5][1],'ball_1').setOrigin(0.5).setScale(scaleFactorX * 0.8, scaleFactorY * 0.8);
        // this.ball_6 = this.add.image(this.southPosition[6][0],this.southPosition[6][1],'ball_3').setOrigin(0.5).setScale(scaleFactorX * 0.8, scaleFactorY * 0.8);
        // this.ball_7 = this.add.image(this.southPosition[7][0],this.southPosition[7][1],'ball_4').setOrigin(0.5).setScale(scaleFactorX * 0.8, scaleFactorY * 0.8);

        // answer image northWest pos
        // this.ball_1 = this.add.image(this.northWestPosition[0][0],this.northWestPosition[0][1],'ball_1').setOrigin(0.5);
        // this.ball_2 = this.add.image(this.northWestPosition[1][0],this.northWestPosition[1][1],'ball_2').setOrigin(0.5);
        // this.ball_3 = this.add.image(this.northWestPosition[2][0],this.northWestPosition[2][1],'ball_3').setOrigin(0.5);
        // this.ball_4 = this.add.image(this.northWestPosition[3][0],this.northWestPosition[3][1],'ball_4').setOrigin(0.5);
        // this.ball_correct = this.add.image(this.northWestPosition[4][0],this.northWestPosition[4][1],'ball_correct').setOrigin(0.5);
        // this.ball_5 = this.add.image(this.northWestPosition[5][0],this.northWestPosition[5][1],'ball_1').setOrigin(0.5);
        // this.ball_6 = this.add.image(this.northWestPosition[6][0],this.northWestPosition[6][1],'ball_3').setOrigin(0.5);
        // this.ball_7 = this.add.image(this.northWestPosition[7][0],this.northWestPosition[7][1],'ball_4').setOrigin(0.5);

        // answer images northEast pos
        // this.ball_1 = this.add.image(this.northEastPosition[0][0],this.northEastPosition[0][1],'ball_1').setOrigin(0.5);
        // this.ball_2 = this.add.image(this.northEastPosition[1][0],this.northEastPosition[1][1],'ball_2').setOrigin(0.5);
        // this.ball_3 = this.add.image(this.northEastPosition[2][0],this.northEastPosition[2][1],'ball_3').setOrigin(0.5);
        // this.ball_4 = this.add.image(this.northEastPosition[3][0],this.northEastPosition[3][1],'ball_4').setOrigin(0.5);
        // this.ball_correct = this.add.image(this.northEastPosition[4][0],this.northEastPosition[4][1],'ball_correct').setOrigin(0.5);
        // this.ball_5 = this.add.image(this.northEastPosition[5][0],this.northEastPosition[5][1],'ball_1').setOrigin(0.5);
        // this.ball_6 = this.add.image(this.northEastPosition[6][0],this.northEastPosition[6][1],'ball_3').setOrigin(0.5);
        // this.ball_7 = this.add.image(this.northEastPosition[7][0],this.northEastPosition[7][1],'ball_4').setOrigin(0.5);

        // answer images southEast position
        // this.ball_1 = this.add.image(this.southEastPosition[0][0],this.southEastPosition[0][1],'ball_1').setOrigin(0.5);
        // this.ball_2 = this.add.image(this.southEastPosition[1][0],this.southEastPosition[1][1],'ball_2').setOrigin(0.5);
        // this.ball_3 = this.add.image(this.southEastPosition[2][0],this.southEastPosition[2][1],'ball_3').setOrigin(0.5);
        // this.ball_4 = this.add.image(this.southEastPosition[3][0],this.southEastPosition[3][1],'ball_4').setOrigin(0.5);
        // this.ball_correct = this.add.image(this.southEastPosition[4][0],this.southEastPosition[4][1],'ball_correct').setOrigin(0.5);
        // this.ball_5 = this.add.image(this.southEastPosition[5][0],this.southEastPosition[5][1],'ball_1').setOrigin(0.5);
        // this.ball_6 = this.add.image(this.southEastPosition[6][0],this.southEastPosition[6][1],'ball_3').setOrigin(0.5);
        // this.ball_7 = this.add.image(this.southEastPosition[7][0],this.southEastPosition[7][1],'ball_4').setOrigin(0.5);

        // answer images southWest position
        // this.ball_1 = this.add.image(this.southWestPosition[0][0],this.southWestPosition[0][1],'ball_1').setOrigin(0.5);
        // this.ball_2 = this.add.image(this.southWestPosition[1][0],this.southWestPosition[1][1],'ball_2').setOrigin(0.5);
        // this.ball_3 = this.add.image(this.southWestPosition[2][0],this.southWestPosition[2][1],'ball_3').setOrigin(0.5);
        // this.ball_4 = this.add.image(this.southWestPosition[3][0],this.southWestPosition[3][1],'ball_4').setOrigin(0.5);
        // this.ball_correct = this.add.image(this.southWestPosition[4][0],this.southWestPosition[4][1],'ball_correct').setOrigin(0.5);
        // this.ball_5 = this.add.image(this.southWestPosition[5][0],this.southWestPosition[5][1],'ball_1').setOrigin(0.5);
        // this.ball_6 = this.add.image(this.southWestPosition[6][0],this.southWestPosition[6][1],'ball_3').setOrigin(0.5);
        // this.ball_7 = this.add.image(this.southWestPosition[7][0],this.southWestPosition[7][1],'ball_4').setOrigin(0.5); 
        this.question = this.add.image(game.config.width / 2, game.config.height / 1.8, 'ball_original');
        this.question.depth = 1;
        this.CreateLevel();
    }
    CreateLevel() {
        LevelManeger.DecidePlacementOfImages();
        this.numberOfAnswers;
        this.placementOfImages;;
        this.ImageForCurrentLevel();
        this.currentLevel = LevelManeger.GetCurrentLevelNumber();
        console.log('currentLevel : ', this.currentLevel);
        setTimeout(() => {
            this.DisplayLevel();
        }, 700);
    }

    ImageForCurrentLevel() {
        this.allLevelImage = LevelManeger.SelectRandomGameImage();
        console.log('allLevelImage : ', this.allLevelImage);
        this.totalNumberOfImages = LevelManeger.numberOfImage;
        console.log(" this.totalNumberOfImages-----------", this.totalNumberOfImages);
        console.log(" this.allLevelImage-----------", this.allLevelImage);

        // if (this.totalNumberOfImages % this.allLevelImage.length == 0) {
        //     if (this.allLevelImage.length == 2) {
        //         this.numberOfAnswers = ((this.totalNumberOfImages / this.allLevelImage.length) + 1);
        //         this.numberOfDestractor = [((this.totalNumberOfImages / this.allLevelImage.length) - 1)];
        //     } else if (this.allLevelImage.length == 3) {
        //         this.numberOfAnswers = (this.totalNumberOfImages / this.allLevelImage.length) + 1;
        //         this.numberOfDestractor = [(this.totalNumberOfImages / this.allLevelImage.length) - 1,
        //             (this.totalNumberOfImages / this.allLevelImage.length)
        //         ];
        //     } else if (this.allLevelImage.length == 4) {
        //         this.numberOfAnswers = (this.totalNumberOfImages / this.allLevelImage.length) + 2;
        //         this.numberOfDestractor = [(this.totalNumberOfImages / this.allLevelImage.length) - 2,
        //             (this.totalNumberOfImages / this.allLevelImage.length) - 1,
        //             (this.totalNumberOfImages / this.allLevelImage.length) + 1
        //         ];
        //     }

        // } else if (this.totalNumberOfImages % this.allLevelImage.length != 0) {
        //     if (this.allLevelImage.length == 2) {
        //         this.numberOfAnswers = ((this.totalNumberOfImages - 1) / this.allLevelImage.length) + 1;
        //         this.numberOfDestractor = [((this.totalNumberOfImages - 1) / this.allLevelImage.length)];
        //     } else if (this.allLevelImage.length == 3) {
        //         if (this.totalNumberOfImages % this.allLevelImage.length == 1) {
        //             this.numberOfAnswers = ((this.totalNumberOfImages - 1) / this.allLevelImage.length) + 2,
        //                 this.numberOfDestractor = [((this.totalNumberOfImages - 1) / this.allLevelImage.length) - 1,
        //                     ((this.totalNumberOfImages - 1) / this.allLevelImage.length)
        //                 ];
        //         } else if (this.totalNumberOfImages % this.allLevelImage.length == 2) {
        //             this.numberOfAnswers = ((this.totalNumberOfImages - 2) / this.allLevelImage.length) + 2,
        //                 this.numberOfDestractor = [((this.totalNumberOfImages - 2) / this.allLevelImage.length) + 1,
        //                     ((this.totalNumberOfImages - 2) / this.allLevelImage.length) - 1
        //                 ];
        //         }

        //     } else if (this.allLevelImage.length == 4) {
        //         if (this.totalNumberOfImages % this.allLevelImage.length == 1) {
        //             this.numberOfAnswers = ((this.totalNumberOfImages - 1) / this.allLevelImage.length) + 3,
        //                 this.numberOfDestractor = [((this.totalNumberOfImages - 1) / this.allLevelImage.length) + 1,
        //                     ((this.totalNumberOfImages - 1) / this.allLevelImage.length) - 2,
        //                     ((this.totalNumberOfImages - 1) / this.allLevelImage.length) - 1
        //                 ];
        //         } else if (this.totalNumberOfImages % this.allLevelImage.length == 2) {
        //             this.numberOfAnswers = ((this.totalNumberOfImages - 2) / this.allLevelImage.length) + 2,
        //                 this.numberOfDestractor = [((this.totalNumberOfImages - 2) / this.allLevelImage.length) + 1,
        //                     ((this.totalNumberOfImages - 2) / this.allLevelImage.length) - 1,
        //                     ((this.totalNumberOfImages - 2) / this.allLevelImage.length)
        //                 ];
        //         } else if (this.totalNumberOfImages % this.allLevelImage.length == 3) {
        //             this.numberOfAnswers = ((this.totalNumberOfImages - 3) / this.allLevelImage.length) + 2,
        //             this.numberOfDestractor = [((this.totalNumberOfImages - 3) / this.allLevelImage.length) + 1,
        //                 ((this.totalNumberOfImages - 3) / this.allLevelImage.length) - 1,
        //                 ((this.totalNumberOfImages - 3) / this.allLevelImage.length)
        //             ];
        //         }
        //     }
        // }
        // for (let i = 0; i < this.allLevelImage.length; i++) {
        //     this.allLevelImage[i] = LoadAssets.getImageName(this.allLevelImage[i]);
        // }
    }
    DisplayLevel() {
        this.SetMovementType(this.question, LevelManeger.movementDirection, LevelManeger.movementType);
    }
    SetMovementType(_obj, directionType, movementType) {
        console.log('question obj--------------> ', _obj);
        console.log('directionType--------------> ', directionType);
        console.log('movementType--------------> ', movementType);

        switch (parseInt(movementType)) {
            case 0:
                this.movementType = "continuous";
                this.SetDirectionType(directionType, _obj);
                break;
            case 1:
                this.movementType = "intervals";
                this.SetIntervalOffset(directionType);
                this.SetDirectionType(directionType, _obj);
                break;
            case 2:
                this.movementType = "continuous-continuous";
                this.SetDirectionType(directionType, _obj);
                break;
            case 3:
                this.movementType = "continuous-interval";
                this.SetDirectionType(directionType, _obj);
                break;
            case 4:
                this.movementType = "intervals-continuous";
                this.SetDirectionType(directionType, _obj);
                break;
            case 5:
                this.movementType = "intervals-intervals";
                this.SetDirectionType(directionType, _obj);
                break;
        }
        console.log("this.movementType" + this.movementType);
    };
    StartMovement(_obj, continousStartX, continousStartY,
        continousEndX, continousEndY, _direction) {

        switch (this.movementType) {
            case "continuous":
                this.MovementContineous(_obj, continousStartX, continousStartY, // done
                    continousEndX, continousEndY);
                break;
            case "intervals":
                // this.IntervalMovement(_obj, continousStartX, continousStartY, continousEndX, continousEndY,_direction);
                this.MovementInterval(_obj, continousStartX, continousStartY, continousEndX, continousEndY, _direction); // done
                break;
            case "continuous-continuous":
                this.MovementContineousContineous(_obj, continousStartX, continousStartY, // done
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
        if (_bool) {
            switch (_direction) {
                case "RTL":
                    this.movementTime = ((10000 / (game.config.width + _obj.x)) * (_obj.x));
                    _obj.continousStartX = 0; //(game.config.width + (_obj.x/6));
                    _obj.continousStartY = (game.config.height / 1.8);
                    _obj.continousEndX = (game.config.width); //-parseInt((game.config.width-_obj.x)/6);//50;
                    _obj.continousEndY = (game.config.height / 1.8);
                    this.movementIntervalX = ((game.config.width) / 10);
                    this.movementIntervalY = 0;
                    break;
                case "LTR":
                    this.movementTime = ((10000 / (game.config.width + 200)) * ((game.config.width + 200) - _obj.x));
                    console.log('movementTime -------------------> ' + this.movementTime)
                    _obj.continousStartX = (game.config.width); //-parseInt(game.config.width/2-(_obj.x/6));
                    _obj.continousStartY = (game.config.height / 1.8);
                    _obj.continousEndX = 0; //(game.config.width+(_obj.x/6));//(game.config.width+_obj.width);
                    _obj.continousEndY = (game.config.height / 1.8);
                    this.movementIntervalX = ((game.config.width) / 10);
                    this.movementIntervalY = 0;
                    break;
                case "TTB":
                    this.movementTime = ((10000 / (game.config.height + 200)) * ((game.config.height + 200) - _obj.y));
                    console.log('movementTime -------------------> ' + this.movementTime)
                    _obj.continousStartX = (game.config.width / 2);
                    _obj.continousStartY = (game.config.height / 7); //(game.config.height/1.15);//-_obj.height;
                    _obj.continousEndX = (game.config.width / 2);
                    _obj.continousEndY = (game.config.height); //(game.config.height+_obj.height);
                    this.movementIntervalX = 0;
                    this.movementIntervalY = ((game.config.height) / 10);
                    // console.log('contstartX : ' + _obj.continousStartX + 'contstartY : ' +_obj.continousStartY  +'contEndX : ' +_obj.continousEndX +'contEndY : ' + _obj.continousEndY);
                    break;
                case "BTT":
                    this.movementTime = ((10000 / (game.config.height + 200)) * (_obj.y));
                    _obj.continousStartX = (game.config.width / 2);
                    _obj.continousStartY = (game.config.height); //(game.config.height+_obj.height);
                    _obj.continousEndX = (game.config.width / 2);
                    _obj.continousEndY = (game.config.height / 7); //-_obj.height;
                    this.movementIntervalX = 0;
                    this.movementIntervalY = -((game.config.height) / 10);
                    break;
                case "TRDBL":
                    this.movementIntervalX = (game.config.width) / 2 - (game.config.width) / 2.5; //((game.config.width)/ 10);
                    this.movementIntervalY = ((game.config.height) / 2) - ((game.config.height) / 2.5); //((game.config.height)/ 10);
                    this.movementIntervalY = ((game.config.height) / 10);

                    _obj.continousStartX = (game.config.width);
                    _obj.continousStartY = (game.config.height / 7);
                    _obj.continousEndX = 0;
                    _obj.continousEndY = (game.config.height);
                    break;
                case "TLDBR":
                    this.movementIntervalX = (game.config.width) / 2 - (game.config.width) / 2.5; //((game.config.width)/ 10);
                    this.movementIntervalY = ((game.config.height) / 2) - ((game.config.height) / 2.5); //((game.config.height)/ 10);
                    this.movementIntervalY = ((game.config.height) / 10);

                    _obj.continousStartX = 0;
                    _obj.continousStartY = (game.config.height / 7);
                    _obj.continousEndX = (game.config.width);
                    _obj.continousEndY = (game.config.height);
                    this.movementIntervalX = ((game.config.width) / 10);
                    this.movementIntervalY = ((game.config.height) / 10);
                    break;
                case "BRDTL":
                    this.movementIntervalX = (game.config.width) / 2 - (game.config.width) / 2.5; //((game.config.width)/ 10);
                    this.movementIntervalY = ((game.config.height) / 2) - ((game.config.height) / 2.5); //((game.config.height)/ 10);
                    this.movementTime = ((10000 / (game.config.height + 200)) * (_obj.y));
                    console.log('movement time is : ' + this.movementTime);
                    _obj.continousStartX = (game.config.width);
                    _obj.continousStartY = (game.config.height);
                    _obj.continousEndX = 0;
                    _obj.continousEndY = (game.config.height / 7);
                    break;
                case "BLDTR":
                    this.movementIntervalX = (game.config.width) / 2 - (game.config.width) / 2.5; //((game.config.width)/ 10);
                    this.movementIntervalY = ((game.config.height) / 2) - ((game.config.height) / 2.5); //((game.config.height)/ 10);
                    this.movementIntervalY = ((game.config.height) / 10);

                    _obj.continousStartX = 0;
                    _obj.continousStartY = (game.config.height);
                    _obj.continousEndX = (game.config.width);
                    _obj.continousEndY = (game.config.height / 7);
                    break;
            }
        }
        this.StartMovement(_obj, continousStartX, continousStartY,
            continousEndX, continousEndY, _direction);
    }

    // TIME FOR CONTINUOUS
    TimeForContineous(_obj, _startX, _startY, _endX, _endY) {
        let distance = null,
            distance2 = null;
        if (LevelManeger.movementDirection == "RTL" || LevelManeger.movementDirection == "LTR") {
            this.movementTime = parseInt(((LevelManeger.movementTime * 1000) / Math.abs(_obj.continousEndX - _obj.continousStartX)) * Math.abs(_startX - _endX));
        } else if (LevelManeger.movementDirection == "BTT" || LevelManeger.movementDirection == "TTB") {
            this.movementTime = parseInt(((LevelManeger.movementTime * 1000) / Math.abs(_obj.continousEndY - _obj.continousStartY)) * Math.abs(_startY - _endY));
            // this.movementTime = (10000/(game.config.height + 200))*((game.config.height + 200) - _obj.y);
            console.log("this.movementTime " + this.movementTime);
        } else if (LevelManeger.movementDirection == "BRDTL") {
            // distance = (Math.sqrt(Math.pow((_obj.continousStartX - _obj.continousEndX),2)
            // +Math.pow((_obj.continousStartY - _obj.continousEndY),2)));
            distance = (Math.sqrt(Math.pow((game.config.width - 0), 2) +
                Math.pow((game.config.height - 0), 2)));
            distance2 = (Math.sqrt(Math.pow((_startX - _endX), 2) + Math.pow((_startY - _endY), 2)));
            this.movementTime = (((LevelManeger.movementTime * 1000) / Math.abs(distance)) * Math.abs(distance2));
        } else {
            distance = parseInt(Math.sqrt(Math.pow((_obj.continousEndX - _obj.continousStartX), 2) + Math.pow((_obj.continousEndY - _obj.continousStartY), 2)));
            distance2 = parseInt(Math.sqrt(Math.pow((_startX - _endX), 2) + Math.pow((_startY - _endY), 2)));
            this.movementTime = parseInt(((LevelManeger.movementTime * 1000) / Math.abs(distance)) * Math.abs(distance2));
            // console.log("distance "+distance);
            // console.log("distance2 "+distance2);
        }
        console.log("this.movementTime " + this.movementTime);
        return this.movementTime;
    };

    // TIME FOR INTERVAL
    TimeForInterval(_obj) {
        let distance = parseInt(Math.sqrt(Math.pow((_obj.continousEndX - _obj.continousStartX), 2) + Math.pow((_obj.continousEndY - _obj.continousStartY), 2)));

        if (LevelManeger.movementDirection == "RTL" || LevelManeger.movementDirection == "LTR") {
            this.movementTime = (distance / this.movementIntervalX);
        } else if (LevelManeger.movementDirection == "BTT" || LevelManeger.movementDirection == "TTB") {
            this.movementTime = (distance / this.movementIntervalY);
        } else //if(LevelManeger.movementDirection == "BRDTL" || LevelManeger.movementDirection == "BLDTR")
        {
            console.log('distance', distance)
            this.movementTime = (distance / this.movementIntervalY);
        }
        this.movementTime = parseInt((LevelManeger.movementTime * 1000) / this.movementTime);
        return this.movementTime;
    };

    // MOVEMENT CONTINUOUS (more is less)
    MovementContineous(_obj, _startX, _startY, _endX, _endY) {
        this.movementTime = this.TimeForContineous(_obj, _obj.x, _obj.y, _obj.continousEndX, _obj.continousEndY);
        this.movementContineousTween = this.tweens.add({
            targets: _obj,
            x: _obj.continousEndX,
            y: _obj.continousEndY,
            ease: 'Linear',
            duration: this.movementTime,
            callbackScope: this,
            onComplete: function() {
                if (this.isMovementContinuous) {
                    _obj.setPosition(_obj.continousStartX, _obj.continousStartY);
                    this.tweens.add({
                        targets: _obj,
                        x: _obj.continousEndX,
                        y: _obj.continousEndY,
                        ease: 'Linear',
                        duration: (LevelManeger.movementTime * 1000),
                        repeat: -1
                    });
                }
            }
        });

        // this.movementTime = this.TimeForContineous(_obj, _obj.x, _obj.y,_obj.continousEndX,_obj.continousEndY);
        // // _obj.setPosition( _endX,  _endY);
        // let ref = this;
        // console.log(" this.movementTime ->"+LevelManeger.movementTime);
        // setTimeout(() => {   
        //     console.log('isMovementContinuous : ', this.isMovementContinuous);
        //     this.movementContineousTween = this.tweens.add({
        //         targets: _obj,
        //         x:  _obj.continousEndX,
        //         y:  _obj.continousEndY,
        //         ease: 'Linear',
        //         duration:  this.movementTime,
        //         callbackScope: this,   

        //               onComplete: function()
        //         {
        //             if(this.isMovementContinuous == true)
        //             {
        //                 console.log('_obj.continousStartX ' + _obj.continousStartX + ' _obj.continousStartY ' +  _obj.continousStartY)
        //                 _obj.setPosition( _obj.continousStartX,  _obj.continousStartY);
        //                 this.tweens.add({
        //                     targets: _obj,
        //                     x:  _obj.continousEndX,
        //                     y:  _obj.continousEndY,
        //                     ease: 'Linear',
        //                     duration: (LevelManeger.movementTime*1000),
        //                     repeat: -1
        //                 });
        //             }                        
        //         },
        //         onLoop  : function()
        //                 {
        //                     // ref.UpdateTimer();
        //                     //console.log("repeat");
        //                 },
        //         loop: -1,
        //         loopDelay : 500
        //     });

        // }, 1000);
    };
    // MOVEMENT CONTINUOUS-CONTINUOUS(more is less)
    MovementContineousContineous(_obj, _startX, _startY, _endX, _endY) {
        this.movementTime = this.TimeForContineous(_obj, _obj.x, _obj.y, _obj.continousEndX, _obj.continousEndY);
        console.log("MovementContineousContineous-----------------------");
        this.tweens.add({
            targets: _obj,
            x: _obj.continousEndX,
            y: _obj.continousEndY,
            ease: 'Linear',
            duration: this.movementTime,
            callbackScope: this,
            onComplete: function() {
                if (this.isMovementContinuous) {

                    _obj.setPosition(_obj.continousStartX, _obj.continousStartY);
                    this.movementTime = this.TimeForContineous(_obj, _obj.x, _obj.y, _obj.continousEndX, _obj.continousEndY);
                    this.tweens.add({
                        targets: _obj,
                        x: _obj.continousEndX,
                        y: _obj.continousEndY,
                        ease: 'Linear',
                        duration: this.movementTime, //     (LevelManeger.movementTime*1000),
                        // yoyo: true,
                        repeat: -1
                    });
                }
            }
        });
    };


    //MOVEMENT INTERVAL(more is less)
    MovementInterval(_obj, _startX, _startY, _endX, _endY, _dir) {
        console.log('_objX : ' + _obj.x + '_objY : ' + _obj.y);
        this.movementIntervalIntervalArr.push(_obj);
        console.log('movementIntervalArr : ', this.movementIntervalIntervalArr);
        if (!this.movementIntervalInterval) {
            console.log('condition false');
            this.movementTime = this.TimeForInterval(_obj);
            console.log('movementTime : ' + this.movementTime);
            this.intervalTimer = this.time.addEvent({
                delay: 500,
                callback: () => {
                    this.movementIntervalIntervalArr.forEach(element => {
                        //   console.log('element : ' , element);
                        switch (_dir) {
                            case "RTL":
                                if (element.x > -(game.config.width - element.x)) {
                                    element.x -= this.movementIntervalX;
                                    if (element.x == 0) {
                                        element.setPosition((game.config.width + (element.x)), element.y);
                                    }
                                }
                                // else 
                                // {
                                //     element.setPosition((game.config.width + (element.x)), element.y);
                                //     console.log('enter into ')
                                // }
                                break;
                            case "LTR":
                                if (element.x < (game.config.width)) {
                                    element.x += this.movementIntervalX;
                                    if (element.x == game.config.width) {
                                        element.setPosition(-(game.config.width - element.x), element.y);
                                    }
                                }
                                break;
                            case "TTB":
                                // console.log(element.continousEndX); 
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
                                if (element.x > element.continousEndX) {
                                    if (element.y > element.continousEndY) {
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
                                if (element.x < element.continousEndX) {
                                    if (element.y > element.continousEndY) {
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
                                if (element.x < element.continousEndX) {
                                    if (element.y < element.continousEndY) {
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
                                if (element.x > element.continousEndX) {
                                    if (element.y < element.continousEndY) {
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
    };

    // MOVEMENT CONTINUOUS INTERVAL
    MovementContineousInterval(_obj, _startX, _startY, _endX, _endY, _dir) {
        if (!this.movementContinuousIntervalBool) {
            this.movementContinuousIntervalArr.push(_obj);
            this.movementTime = this.TimeForInterval(_obj);
            console.log('movementTime : ', this.TimeForInterval(_obj));
            this.intervalTimer = this.time.addEvent({
                delay: this.movementTime,
                callback: () => {
                    if (this.movementContinuousIntervalArr.length > 0) {
                        this.movementContinuousIntervalArr.forEach(element => {
                            switch (_dir) {
                                case "RTL":
                                    if (element.x > -(game.config.width - element.x)) {
                                        element.x -= this.movementIntervalX;
                                        if (element.x == 0) {
                                            element.setPosition((game.config.width + (element.x)), element.y);
                                        }
                                    }
                                    break;
                                case "LTR":
                                    if (element.x < (game.config.width)) {
                                        element.x += this.movementIntervalX;
                                        if (element.x == game.config.width) {
                                            element.setPosition(-(game.config.width - element.x), element.y);
                                        }
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
                                    // console.log('enter');
                                    if (element.x > element.continousEndX) {
                                        if (element.y > element.continousEndY) {
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
                                    if (element.x < element.continousEndX) {
                                        if (element.y > element.continousEndY) {
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
                                    if (element.x < element.continousEndX) {
                                        if (element.y < element.continousEndY) {
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
                                    if (element.x > element.continousEndX) {
                                        if (element.y < element.continousEndY) {
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
            //    this.intervalTimer.paused = true; 

            // here will be a set time out function from where  we will make the  this.intervalTimer will be false
        }
    }


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
}