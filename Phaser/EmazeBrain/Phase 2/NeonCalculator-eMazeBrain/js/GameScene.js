import { LevelManager } from "./LevelManager.js";
import { LoadAssets } from "./LoadAssets.js";
import { Server } from "./Server.js";
import Arithmatic from "./Equation.js";
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
        // this.isMovementAvailabe;
        // this.isRotationAvailable;
        // this.movementDirection;
        // this.rotationType;
        // this.rotationTime;
        this.totalNumberOfImages;
        this.allLevelImage = [];
        this.levelBackground;
        this.answers = [];
        this.destractor = [];
        this.totalCorrectAnswer = 0;
        this.totalInCorrectAnswer = 0;
        this.objectAngle = 15;
        //------------------------------
        // this.movementInterval;
        // this.movementIntervalX = 10;
        // this.movementIntervalY;
        // this.isInetervalContinuous = true;
        // this.continousStartX;
        // this.continousStartY;
        // this.continousEndX;
        // this.continousEndY;
        // this.isMovementContinuous = true;
        // this.movementTime;
        // this.movementType;
        // this.isSingleMovement = false;
        // this.movementContinuousIntervalBool = false;
        // this.movementIntervalInterval = false;
        // this.movementContinuousIntervalArr = [];
        // this.movementIntervalIntervalArr = [];
        this.userAnswer = null;
        this.gameSign = null;
        this.answerSign = null;
        this.currentLevelOperator = [];
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
        //============================
        this.leftCalculatorButtons = [];
        this.rightCalculatorButtons = [];
        this.answerNumber;
        this.equationString;
        this.userPressedNumber = "";
        this.numberDigitUserInput = 0;
        this.userInputNumber = 0;
        this.decidedCalculator = null;

        this.calculatorArr = [];

        this.crossEquation = "";
        this.greenEquation = "";
        this.crossEquationText = null;
        this.greenValueText = null;
        this.equationArr = [];
        //-------------------------
        this.operators = [];
        this.timerBool = false;
    }
    create() {
        // console.clear();
        if (Server.platform == "favorites") {
            window.parent.postMessage({ eventName: "gameStarted", payload: null }, "*");
        }
        let bg = this.add.image(game.config.width / 2, game.config.height / 2, LevelManager.TotalBackgroundImage).setOrigin(0.5);
        bg.setInteractive();
        // bg.tint = "0x000000";
        // bg.tint = "0xffffff";
        bg.on("pointerdown", (pointer, x, y, event) => {
            this.totalNumberUserClicked += 1;
        });
        let thumbsUp = this.add.image(game.config.width / 23.5, game.config.height / 14, "like").setOrigin(0.5).setScale(scaleFactorX * 0.7, scaleFactorY * 0.7);
        thumbsUp.depth = 2;

        const style = { font: " 30px Arial", fill: "#000" };
        let thumbsUpTextBase = this.add.image(thumbsUp.x + (game.config.width / 12.8), thumbsUp.y, "base").setOrigin(0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        this.thumbsUpText = this.add.text(thumbsUp.x + (game.config.width / 12.8), thumbsUp.y, this.totalCorrectAnswer, style).setOrigin(0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        this.thumbsUpText.depth = 2;

        let thumbsDown = this.add.image(game.config.width / 1.05, game.config.height / 14, "unlike").setOrigin(0.5).setScale(scaleFactorX * 0.7, scaleFactorY * 0.7);
        thumbsDown.depth = 2;
        let thumbsDownTextBase = this.add.image(thumbsDown.x - (game.config.width / 12.8), thumbsDown.y, "base").setOrigin(0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        this.thumbsDownText = this.add.text(thumbsDown.x - (game.config.width / 12.8), thumbsDown.y, this.totalInCorrectAnswer, style).setOrigin(0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        this.thumbsDownText.depth = 2;
        //=======> Timer <=============================//
        this.tickerRed = this.add.image(game.config.width / 2, game.config.height / 12, "ticker_red").setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.5, scaleFactorY * 0.5);
        this.tickerGreen = this.add.image(game.config.width / 2, game.config.height / 12, "ticker_green").setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.5, scaleFactorY * 0.5);
        this.tickerRed.visible = false;
        this.tickerGreen.visible = false;
        this.tickerRed.depth = 3;
        this.tickerGreen.depth = 3;
        //=====> Static Items <==========//        
        SoundManager.StartSoundPlay(); //Game start sound 

        this.timer = this.time.addEvent({ delay: 1000, callback: this.UpdateTimer, callbackScope: this, loop: true });
        this.timer.paused = true;
        this.eachLevelTimer = this.time.addEvent({ delay: 100, callback: this.UpdateEachLevelTimer, callbackScope: this, loop: true });
        this.eachLevelTimer.paused = true;
        //====> Timer Arc <============//
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(Math.floor(game.config.width / 300), 0x54f419, 1);
        this.graphics.beginPath();
        this.graphics.arc(game.config.width / 2, game.config.height / 12, Math.floor(game.config.width / 36), Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(this.timerDegre), true);
        this.graphics.strokePath();
        this.graphics.depth = 3;
        this.graphics.visible = false;
        //======================//
        this.CreateSigns();
        //===> Game time <=====//
        this.GameTimer();
        //------------------------------------------------------------
        this.CreateCalculator("blue_rect", "green_rect", "blue_results", "green_results", "blue_button", "green_button");
        //======> createing initial level <====//
        this.CreateLevel();
        this.graphics.visible = true;
        this.tickerGreen.visible = true;
        this.timer.paused = false;
        this.BannerCreateAndHide("start", true);
        //----------------------------
        // this.OnlyAdditionAvailable(42,21,3);//_sum,_ans,_numberOfOrgans 
        // this.MultiplicationOrDivisionAvailable(56,2);//_sum,_ans,_numberOfOrgans 

        //============================================//
        this.cross = this.add.image(game.config.width / 2, game.config.height / 2, 'cross').setOrigin(0.5).setScale(scaleFactorX * 1, scaleFactorY * 1);
        this.cross.tint = "0xFF0000";//red - 0xFF0000 , green - 0x23FF00 
        this.cross.visible = false;
    };
    OnBackgroundClick() {
        this.totalNumberUserClicked += 1;
    };
    UpdateEachLevelTimer() {
        this.eachLevelTime += 100;
    };
    CreateCalculator(_base1, _base2, _display1, _display2, _button1, _button2) {
        let buttonStyle = { font: " 40px Arial", fill: "#fff" }, left = null, right = null;
        let calculator1 = this.add.image(game.config.width / 4.33, game.config.height / 1.75, _base1).setOrigin(0.5).setScale(scaleFactorX * 1.1, scaleFactorY * 0.95);
        let calculator1Display = this.add.image(game.config.width / 4.4, game.config.height / 3.2, _display1).setOrigin(0.5).setScale(scaleFactorX * 1, scaleFactorY * 1);
        let calculator2 = this.add.image(game.config.width / 1.295, game.config.height / 1.75, _base2).setOrigin(0.5).setScale(scaleFactorX * 1.1, scaleFactorY * 0.95);
        let calculator2Display = this.add.image(game.config.width / 1.3, game.config.height / 3.2, _display2).setOrigin(0.5).setScale(scaleFactorX * 1, scaleFactorY * 1);
        let leftCalculatorButtonsPos = [
            [game.config.width / 4.35, game.config.height / 1.18],
            [game.config.width / 8.3, game.config.height / 2.17],
            [game.config.width / 4.35, game.config.height / 2.17],
            [game.config.width / 2.93, game.config.height / 2.17],
            [game.config.width / 8.3, game.config.height / 1.69],
            [game.config.width / 4.35, game.config.height / 1.69],
            [game.config.width / 2.93, game.config.height / 1.69],
            [game.config.width / 8.3, game.config.height / 1.39],
            [game.config.width / 4.35, game.config.height / 1.39],
            [game.config.width / 2.93, game.config.height / 1.39]
        ];
        let rightCalculatorButtonsPos = [
            [game.config.width / 1.295, game.config.height / 1.18],
            [game.config.width / 1.51, game.config.height / 2.17],
            [game.config.width / 1.295, game.config.height / 2.17],
            [game.config.width / 1.133, game.config.height / 2.17],
            [game.config.width / 1.51, game.config.height / 1.69],
            [game.config.width / 1.295, game.config.height / 1.69],
            [game.config.width / 1.133, game.config.height / 1.69],
            [game.config.width / 1.51, game.config.height / 1.39],
            [game.config.width / 1.295, game.config.height / 1.39],
            [game.config.width / 1.133, game.config.height / 1.39],
        ];



        for (let i = 0; i < leftCalculatorButtonsPos.length; i++) {
            left = this.CreateCalculatorButtons(leftCalculatorButtonsPos[i], _button1, "number_" + i, i);
            right = this.CreateCalculatorButtons(rightCalculatorButtonsPos[i], _button2, "number_" + i, i);
            this.leftCalculatorButtons.push(left);
            this.rightCalculatorButtons.push(right);
        }
        const style1 = {
            font: "bold 45px Arial",
            // font: "bold 30px Arial",
            stroke: '#000',
            fill: "#ffffff"
        };
        this.answerNumber = "555";
        this.equationString = "0";//"555+555+555+555+555";
        this.rightEquationText = this.add.text(game.config.width / 1.3, game.config.height / 3.07, this.answerNumber, style1).setOrigin(0.5);//.setScale(scaleFactorX * 2, scaleFactorY * 2);
        this.leftEquationText = this.add.text(game.config.width / 4.4, game.config.height / 3.07, this.equationString, style1).setOrigin(0.5);//.setScale(scaleFactorX * 2, scaleFactorY * 2);

        this.crossEquationText = this.add.text(game.config.width / 1.3, game.config.height / 2, "sadsadr", {
            // font: "bold 35px Arial",
            font: "bold 50px Arial",
            fill: "#FF1300"
        }).setOrigin(0.5);
        this.crossEquationText.visible = false;

        this.greenValueText = this.add.text(game.config.width / 1.3, game.config.height / 2, "sadsadr", {
            // font: "bold 35px Arial",
            font: "bold 30px Arial",
            fill: "#36FF00"
        }).setOrigin(0.5);
        this.greenValueText.visible = false;
    };
    ShowSigns(_type) {
        this.gameSign = _type;
        console.log("Selected sign " + _type);
        if (_type === "equal") {
            this.equalSign.visible = true;
            // this.equalSign.setInteractive();
            // this.greaterThanSign.disableInteractive();
            // this.lessThanSign.disableInteractive();
            this.greaterThanSign.visible = false;
            this.lessThanSign.visible = false;
            this.answerSign = null;
        }
        else {

            this.SetAnswerSign();
            this.equalSign.visible = false;
            // this.equalSign.disableInteractive();
            this.greaterThanSign.visible = true;
            this.lessThanSign.visible = true;
            // this.greaterThanSign.setInteractive();
            // this.lessThanSign.setInteractive();
        }
        this.EnableSign(_type);
    };
    CreateSigns(_type) {
        this.equalSign = this.add.image(game.config.width / 2, game.config.height / 1.8, "equal").setOrigin(0.5).setScale(scaleFactorX * 0.5, scaleFactorY * 0.5);
        this.equalSign.setInteractive();
        this.equalSign.on("pointerdown", () => {
            this.SignClicked(this.equalSign);
        });
        this.equalSign.visible = false;

        this.lessThanSign = this.add.image(game.config.width / 2, game.config.height / 2.5, "less").setOrigin(0.5).setScale(scaleFactorX * 1, scaleFactorY * 1);
        this.lessThanSign.setInteractive();
        this.lessThanSign.on("pointerdown", () => {
            this.SignClicked("less");
        });
        this.greaterThanSign = this.add.image(game.config.width / 2, game.config.height / 1.4, "greater").setOrigin(0.5).setScale(scaleFactorX * 1, scaleFactorY * 1);
        this.greaterThanSign.setInteractive();
        this.greaterThanSign.on("pointerdown", () => {
            this.SignClicked("greater");
        });
        this.greaterThanSign.visible = false;
        this.greaterThanSign.visible = false;
    };
    EnableSign(_type) {
        if (_type === "equal") {
            this.equalSign.setInteractive();
        }
        else {
            this.lessThanSign.setInteractive();
            this.greaterThanSign.setInteractive();
        }
    };
    SetAnswerSign() {
        // console.log("Math.floor(Math.random())===="+Math.random());
        if (Math.random() > 0.5) {
            this.answerSign = "less";
        }
        else {
            this.answerSign = "greater";
        }
        console.log("============ this.answerSign==============" + this.answerSign);
    };
    CreateCalculatorButtons(_pos, _button, _text, _value) {
        let calculatorbutton = this.add.image(_pos[0], _pos[1], _button).setOrigin(0.5).setScale(scaleFactorX * 1.1, scaleFactorY * 0.7);
        calculatorbutton.calculatorbuttonText = this.add.image(_pos[0], _pos[1], _text).setOrigin(0.5).setScale(scaleFactorX * 0.5, scaleFactorY * 0.5);
        calculatorbutton.name = _value;
        calculatorbutton.setInteractive(this.input.makePixelPerfect());

        calculatorbutton.on("pointerdown", () => {
            // alert("down")
            this.NumberPressed(calculatorbutton);

            // console.log("button Down " +this.name);
        });


        calculatorbutton.on("pointerup", () => { this.NumberReleased(calculatorbutton) })
        return calculatorbutton;
    };
    NumberPressed(_calculatorbutton) {
        _calculatorbutton.setScale(scaleFactorX * 1.07, scaleFactorY * 0.69);
        _calculatorbutton.calculatorbuttonText.setScale(scaleFactorX * 0.49, scaleFactorY * 0.49);

        console.log("scsad");
        // 
    };
    NumberReleased(_calculatorbutton) {
        console.log('enter pointer uppppppppp')
        // _calculatorbutton.setScale(scaleFactorX * 0.85, scaleFactorY * 0.7);
        // _calculatorbutton.calculatorbuttonText.setScale(scaleFactorX * 0.5, scaleFactorY * 0.5);
        _calculatorbutton.setScale(scaleFactorX * 1.1, scaleFactorY * 0.7);
        _calculatorbutton.calculatorbuttonText.setScale(scaleFactorX * 0.5, scaleFactorY * 0.5);
        this.PutNumbersInCalculator(_calculatorbutton);
    }
    PutNumbersInCalculator(_calculatorbutton) {
        let arr = this.equationString.split("");
        let _euqation = "";
        arr = arr.filter(function (el) {
            if (el !== " ")
                return el;
        });

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === "_") {
                arr[i] = _calculatorbutton.name;
                break;
            }
        }

        arr.forEach(element => {
            _euqation += element;
        });

        this.equationString = _euqation;// _calculatorbutton.name +this.equationString; 

        if (this.decidedCalculator == "left") {
            this.leftEquationText.setText(this.equationString);
            console.log('this.equationString  ', this.equationString)
        }
        else {
            this.rightEquationText.setText(this.equationString);
            console.log('this.equationString  ', this.equationString)
        }

        this.userPressedNumber = this.userPressedNumber + _calculatorbutton.name;

        let num = this.userPressedNumber
        console.log("this.userPressedNumber=====" + parseInt(this.userPressedNumber));
        console.log("this.userInputNumber=====" + parseInt(this.userInputNumber));

        this.numberDigitUserInput -= 1;
        if (this.numberDigitUserInput === 0) {
            if (this.decidedCalculator === "left") {
                this.DisableCalculatorButtons(this.leftCalculatorButtons);
            }
            else {
                this.DisableCalculatorButtons(this.rightCalculatorButtons)
            }

            //check answer
        }
    };
    EnableCalculatorButtons(_left, _right) {
        if (_left) {
            this.leftCalculatorButtons.map(x => x.setInteractive());
        }
        else {
            this.leftCalculatorButtons.map(x => x.disableInteractive());
        }
        if (_right) {
            this.rightCalculatorButtons.map(x => x.setInteractive());
        }
        else {
            this.rightCalculatorButtons.map(x => x.disableInteractive());
        }
    };
    CreateLevel() {
        this.eachLevelTimer.paused = false;
        // LevelManager.DecidePlacementOfImages();

        //---ANSWERS  = 42 ;
        // this.EquationManager(1,42,21,5);//_signs,_numberForOtherCalculator,_userInputDigit,_numberOfOrgans
        //====> Selecting Background <======//
        this.levelBackground = LevelManager.DecideLevelBackground();
        //=====> Images will be used in game <=====//
        this.ImageForCurrentLevel();
        this.currentLevel = LevelManager.GetCurrentLevelNumber();
        //=========> Display Level <=====//
        // setTimeout(() => {
        this.DisplayLevel();
        // }, 500);      
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
        console.log(" this.totalTimeForGame " + this.totalTimeForGame);
    };
    ImageForCurrentLevel() {
        this.allLevelImage = LevelManager.SelectRandomGameImage();
        console.log(this.allLevelImage);
        this.totalNumberOfImages = LevelManager.numberOfImage;
    };
    GenerateEquation(_num, _numberOfOrgans, _operators) {
        console.log('updated numbers : ', _num);
        console.log("Number of organs" + _numberOfOrgans);
        console.log('_operators : ', _operators);
        let math1 = new Arithmatic();
        let _temp = 0;
        if (this.gameSign === "equal") {
            // console.log('enter when equal', LevelManager.levelNumber);
            // console.log("==================================");
            // console.log("_operators ", _operators);
            // console.log("_numberOfOrgans ", _numberOfOrgans);
            // console.log("eq", math1.eqGen(_num, _operators, 2));
            // console.log("======================================", demo);
            // demo = math1.eqGen(_num, _operators, 5);
            demo = math1.eqGen(_num, _operators, _numberOfOrgans);
            console.log("_num ", _num);
            demo = demo.replaceAll("(", "");
            demo = demo.replaceAll(")", "");
            console.log("======================================", demo);
            return demo;
            //---------------------------------------------------------
            // if (LevelManager.levelNumber >= 5 && LevelManager.levelNumber <= 8) {
            //     // return this.GenerationOfTemporaryEquation(_num, _operators, _numberOfOrgans)
            //     return math.eqGen(_num, _operators, _numberOfOrgans);
            // }
            // //---------------------------------------------------------
            // else {
            // return math1.eqGen(_num, _operators, _numberOfOrgans);
            // return math.eqGen(_num, _operators, _numberOfOrgans);
            // }
        }
        else {
            console.log('enter when not equal')
            if (this.answerSign === "greater") {
                if (_num !== 0) {
                    _temp = Math.floor(_num / 2);
                }
                else {
                    _temp = -Math.floor(Math.random() * (50 - 10) + 10);
                }
                // return math.eqGen((_num + _temp ),_operators,_numberOfOrgans);
            }
            else {
                if (_num !== 0) {
                    _temp = (_num * 2);
                }
                else {
                    _temp = Math.floor(Math.random() * (50 - 10) + 10);
                }
            }
            return math1.eqGen((_num + _temp), _operators, _numberOfOrgans);
        }
    };
    GenerationOfTemporaryEquation(_target, _operators, _organs) {
        let expression = [];
        console.log('_target :- ', _target);
        console.log('_operators :- ', _operators);
        console.log('_organs :- ', _organs);

        let random = Math.floor(Math.random() * (_target - 3) + 3);
        let userclicked = (random + _target)
        console.log('userclicked :--------- ', userclicked);

        let random1 = Math.floor(Math.random() * (15 - 3) + 3);
        console.log('random1 : ', random1);
        for (let i = 0; i < _organs - 1; i++) {
            let random = Math.floor(Math.random() * _operators.length);
            this.operators.push(_operators[random]);
        }
        console.log('this.operators', this.operators);
        let randomToAdd = Math.floor(Math.random() * (5 - 2) + 2);

        expression.push(userclicked);
        expression.push('+');
        expression.push(random1);
        expression.push('-');
        expression.push(random1);
        expression.push('+')
        expression.push(random1 + randomToAdd);
        expression.push('-');
        expression.push(random + random1 + randomToAdd);

        console.log('expression :======================== ', expression);

        return ' ' + expression.join(' ') + ' ';
    }
    SignClicked(_type) {
        this.DisableSignsButtons();
        if (this.timerBool == false) {
            this.timerBool = true;
            this.CheckAnswer(_type);
        }
    }
    async CheckAnswer(_type) {
        // console.clear();

        console.log("this.answerSign =================" + parseInt(this.userPressedNumber));
        console.log(" parseInt(this.userInputNumber) =================================" + parseInt(this.userInputNumber));
        if (this.gameSign === "equal") {
            if (parseInt(this.userPressedNumber) === parseInt(this.userInputNumber)) {
                console.log("=====Correct===============");
                this.onObjectClicked(true);
            }
            else {
                // console.clear();
                console.log("=====Not Correct===============");
                this.PutCrossInEquation();
                this.Delay(500).then(() => {
                    this.GreenNumberOnCalculator();
                    this.Delay(1000).then(() => {
                        console.log("dasdasdsada");
                        this.onObjectClicked(false);
                    });
                });
            }
        }
        else {
            if (_type === this.answerSign) {
                console.log("Correct ");
                this.onObjectClicked(true);
            }
            else {
                console.log("IN coreect");
                await this.PositionCrossSign();
                setTimeout(() => {
                    this.onObjectClicked(false);
                }, 1000);
            }
        }
    };
    async PositionCrossSign() {
        this.cross.visible = true;
        if (this.answerSign === "greater") {
            this.cross.x = this.lessThanSign.x;
            this.cross.y = this.lessThanSign.y;

            this.greaterThanSign.tint = "0x23FF00";
        }
        else if (this.answerSign === "less") {
            this.cross.x = this.greaterThanSign.x;
            this.cross.y = this.greaterThanSign.y;

            this.lessThanSign.tint = "0x23FF00";
        }
        return;
    };
    DisplayLevel(_this) {
        // this.userAnswer = LevelManager.SelectAnswer();
        // console.log("sas",this.userAnswer);

        this.totalQuestionPresented += 1;
        this.timerBool = false;
        //============Select left or right calculator=================//
        this.DecideLeftOrRightCalculator();
        this.ShowSigns(LevelManager.SelectSigns(LevelManager.levelNumber));// = , < , >


        this.currentLevelOperator = LevelManager.SelectOperator();


        this.numberDigitUserInput = LevelManager.SelectDigitForUserInput();//==Number of digit selected for user
        console.log('this.numberDigitUserInput : ', this.numberDigitUserInput);

        this.userInputNumber = LevelManager.SelectUserInput(this.numberDigitUserInput);//==Number user need to type  
        console.log('this.userInputNumber : ', this.userInputNumber);

        this.FillCalculatorTopbar(this.userInputNumber, this.currentLevelOperator);
        this.timer.paused = false;
        this.totalClickNeeded = this.numberDigitUserInput + 1;
    };
    onObjectClicked(_bool) {
        this.totalGamePlayed += 1;
        this.totalNumberUserClicked += 1;
        // this.totalNumberUserAnswered += 1;
        // console.log(_this.key);
        // let key = _this.key;
        if (_bool) {
            this.totalCorrectAnswer += 1;
            this.consecutiveWins += 1;
            this.consecutiveLoose = 0;
            this.consecutiveComboWins += 1;
            if (this.consecutiveComboWins > this.comboWins) {
                this.comboWins = this.consecutiveComboWins;
            }
            if ((this.consecutiveWins != LevelManager.offsetForLevelUp) && (this.totalGamePlayed != this.totalNumberOfLevel)) {
                this.BannerCreateAndHide("excellent", true);
                SoundManager.CorrectAnswerSoundPlay(); //Playing when answer is correct
            }
            this.LevelWin(this.totalCorrectAnswer);
        } else {
            this.consecutiveComboWins = 0;
            this.totalInCorrectAnswer += 1;
            this.consecutiveWins = 0;
            this.consecutiveLoose += 1;
            SoundManager.InCorrectAnswerSoundPlay(); //Playing when answer is incorrect
            this.LevelLoose(this.totalInCorrectAnswer);
        }

        this.ChangeLevel(true);
    };
    DisableCalculatorButtons(_calculatorButtons) {
        _calculatorButtons.forEach(element => {
            element.disableInteractive();
        });
    };
    EnableCalculatorButtons(_calculatorButtons) {
        _calculatorButtons.forEach(element => {
            element.setInteractive();
        });
    };
    DecideLeftOrRightCalculator() {
        if (Math.random() > 0.5)//Left Calculator selected
        {
            this.DisableCalculatorButtons(this.rightCalculatorButtons);
            this.EnableCalculatorButtons(this.leftCalculatorButtons);
            this.decidedCalculator = "left";
        }
        else//Right Calculator selected
        {
            this.DisableCalculatorButtons(this.leftCalculatorButtons);
            this.EnableCalculatorButtons(this.rightCalculatorButtons);
            this.decidedCalculator = "right";
        }
    };
    FillCalculatorTopbar(_userInputNumber, _currentLevelOperator) {
        let _selectedNumber = null, _equationString = null, _selectedOrgan = null, _updatedNumber = 0;
        let underScore = "";
        _selectedOrgan = LevelManager.SelectNumberOfOrgans();
        console.log("_selectedOrgan................................................." + _selectedOrgan);
        _selectedNumber = LevelManager.SelectAnswer();
        if (this.answerSign === "greater") {
            console.log("--------------" + this.answerSign);
            _updatedNumber = parseInt(_selectedNumber) - Math.floor(Math.random() * (50 - 5) + 5);
            console.log(' _updatedNumber : ', _updatedNumber)
        }
        else if (this.answerSign === "less") {
            console.log("--------------" + this.answerSign);
            _updatedNumber = parseInt(_selectedNumber) + Math.floor(Math.random() * (50 - 5) + 5);
            console.log(' _updatedNumber : ', _updatedNumber)
        }
        else {
            _updatedNumber = _selectedNumber;
            console.log('_updated Number : ', _updatedNumber);
        }
        // if (_updatedNumber === 0 || _updatedNumber === 1) {
        //     // this.SelectAnswer(); 
        // }


        _equationString = this.GenerateEquation(_updatedNumber, _selectedOrgan, _currentLevelOperator);
        this.equationString = _equationString;
        this.answerNumber = _updatedNumber;//_selectedNumber;
        console.log(' _equationString- : ', this.equationString, _updatedNumber, _selectedOrgan, _currentLevelOperator)
        console.log(' _updatedNumber ', _updatedNumber)
        //

        underScore = this.FillUnderScoreInEquation();
        if (underScore !== null) {
            this.userInputNumber = underScore;
        }




        if (this.decidedCalculator === "left") {
            this.rightEquationText.setText(this.answerNumber);
            this.leftEquationText.setText(this.equationString);
            console.log('this.equationString left: ', this.equationString);
        }
        else {
            this.rightEquationText.setText(this.equationString);
            this.leftEquationText.setText(this.answerNumber);
            console.log('this.equationString right: ', this.equationString);
        }
    };
    // FillUnderScoreInEquation() {
    //     let _underScore = "";
    //     let arr = [];
    //     this.numberDigitUserInput = 0;
    //     this.crossEquation = "";
    //     if (this.gameSign === "equal") {
    //         let _equationString = this.equationString;
    //         console.log('_equationString', _equationString);
    //         //-----------------------------------------------------------------

    //         let level = LevelManager.GetCurrentLevelNumber();
    //         if (level == 4) {
    //             console.log('when level is 4')
    //             let arr1 = [];
    //             let arr2 = [];
    //             arr1 = _equationString.split("+");
    //             arr1.reverse();
    //             console.log('arr1 : ', arr1);
    //             // arr2.push(arr1[0]);
    //             // arr2.push('+');
    //             // arr2.push(arr1[1]);
    //             // arr2.push('+');
    //             // arr2.push(arr1[2])
    //             // arr2.push('+');
    //             // arr2.push(arr1[3]);
    //             // arr2.push('+');
    //             // arr2.push(arr1[4])
    //             for (let i = 0; i < arr1.length; i++) {
    //                 arr2.push(arr1[i].trim());
    //                 if (i < arr1.length - 1) {
    //                     arr2.push('+');
    //                 }
    //             }
    //             arr = [...arr2];
    //             console.log('arr2 : ', arr2);
    //             // arr = [...arr2];
    //         }
    //         else if (level == 3) {
    //             let arr3 = [];
    //             let arr4 = [];
    //             arr3 = _equationString.split("+");
    //             arr3.reverse();
    //             arr4.push(arr3[0]);
    //             arr4.push('+')
    //             arr4.push(arr3[1]);
    //             arr4.push('+')
    //             arr4.push(arr3[2]);
    //             arr4.push('+')
    //             arr4.push(arr3[3]);
    //             arr = [...arr4];
    //         }
    //         else if (level == 2) {
    //             let arr5 = [];
    //             let arr6 = [];
    //             arr5 = _equationString.split("+");
    //             arr5.reverse();
    //             arr6.push(arr5[0])
    //             arr6.push('+')
    //             arr6.push(arr5[1])
    //             arr6.push('+')
    //             arr6.push(arr5[2])
    //             arr = [...arr6]
    //         }
    //         else {
    //             arr = _equationString.split("");
    //         }
    //         //-----------------------------------------------------------------
    //         // arr = _equationString.split("");
    //         console.log('arr : -------------------', arr)
    //         arr = arr.filter(function (el) {
    //             if (el !== " ")
    //                 return el;
    //         });
    //         for (let i = 0; i < arr.length; i++) {
    //             if (!LevelManager.CheckOperator(arr[i])) {
    //                 console.log('arr[i] : ', arr[i])
    //                 _underScore += arr[i];
    //                 arr[i] = "_ ";
    //                 this.numberDigitUserInput += 1;
    //             }
    //             else {
    //                 break;
    //             }
    //         }
    //         this.equationString = "";
    //         arr.forEach(element => {
    //             this.equationString += element;
    //         });
    //         this.equatioStringWithUnderscore = this.equationString
    //         //================================Setting Green equation value =====================================//
    //         let eq = this.equationString, bool = false;
    //         eq = eq.split("_");
    //         console.log("eq", eq);
    //         eq.forEach(element => {
    //             if (element == "") {
    //                 if (!bool) {
    //                     bool = true;
    //                     this.greenEquation += _underScore;
    //                     console.log('this.greenEquation-------------->_underScore', _underScore)
    //                 }
    //             }
    //             else {
    //                 // this.greenEquation += element;
    //                 for (let i = 0; i <= (element.length + 1); i++) {
    //                     this.greenEquation += " ";
    //                 }
    //             }
    //         });
    //         console.log("}}}}}}}}}}" + this.greenEquation);
    //         this.greenValueText.setText(this.greenEquation);

    //         //================== Setting Cross equation value ====================//
    //         bool = false;
    //         eq.forEach(element => {
    //             if (element == "") {
    //                 if (!bool) {
    //                     bool = true;
    //                     this.crossEquation += "x";
    //                 }
    //             }
    //             else {
    //                 for (let q = 0; q < (element.length - 1); q++) {
    //                     this.crossEquation += " ";//element;                        
    //                 }
    //             }
    //         });
    //         this.crossEquationText.setText(this.crossEquation);

    //         //==================================================== 
    //         return _underScore;
    //     }
    //     else
    //         return null;
    // };
    FillUnderScoreInEquation() {
        let _underScore = "";
        let arr = [];
        this.numberDigitUserInput = 0;
        this.crossEquation = "";
        if (this.gameSign === "equal") {
            let _equationString = this.equationString;
            console.log('_equationString', _equationString);
            //-----------------------------------------------------------------

            let level = LevelManager.GetCurrentLevelNumber();
            // if (level == 4) {
            //     console.log('when level is 4')
            //     let arr1 = [];
            //     let arr2 = [];
            //     arr1 = _equationString.split("+");
            //     arr1.reverse();
            //     console.log('arr1 : ', arr1);
            //     arr2.push(arr1[0]);
            //     arr2.push('+');
            //     arr2.push(arr1[1]);
            //     arr2.push('+');
            //     arr2.push(arr1[2])
            //     arr2.push('+');
            //     arr2.push(arr1[3]);
            //     arr2.push('+');
            //     arr2.push(arr1[4])
            //     console.log('arr2 : ', arr2);
            //     arr = [...arr2];
            // }
            // else if (level == 3) {
            //     let arr3 = [];
            //     let arr4 = [];
            //     arr3 = _equationString.split("+");
            //     arr3.reverse();
            //     arr4.push(arr3[0]);
            //     arr4.push('+')
            //     arr4.push(arr3[1]);
            //     arr4.push('+')
            //     arr4.push(arr3[2]);
            //     arr4.push('+')
            //     arr4.push(arr3[3]);
            //     arr = [...arr4];
            // }
            // else if (level == 2) {

            //     console.log('enter when level 2##############################')
            //     let arr5 = [];
            //     let arr6 = [];
            //     arr5 = _equationString.split("+");
            //     arr5.reverse();
            //     arr6.push(arr5[0])
            //     arr6.push('+')
            //     arr6.push(arr5[1])
            //     arr6.push('+')
            //     arr6.push(arr5[2])
            //     arr = [...arr6]
            //     console.log('arr when level 2 three digits : ',arr)
            // }
            // else {
            arr = _equationString.split("");
            // console.log('when level is greater then 4',arr)
            // }


            //-----------------------------------------------------------------
            // arr = _equationString.split("");
            arr = arr.filter(function (el) {
                if (el !== " ")
                    return el;
            });
            console.log('arr : -------------------', arr)

            let tempNum = [], tempOperator = [], val = "", index;
            for (let i = 0; i < arr.length; i++) {
                if (!LevelManager.CheckOperator(arr[i])) {
                    // console.log('arr[i] : ', arr[i])
                    // _underScore += arr[i];
                    val += arr[i];
                    // arr[i] = "_ ";
                    // this.numberDigitUserInput += 1;
                }
                else {
                    // break;
                    tempOperator.push(arr[i]);
                    tempNum.push(val);
                    val = ""
                }
            }
            if (val != "") {
                tempNum.push(val);
            }
            console.log('temp : -------------------', tempNum)

            // console.log('num : -------------------', num)
            // console.log('tempOperator : -------------------', tempOperator)
            // console.log('num : -------------------', tempNum.indexOf(num.toString()))
            let num = Math.max(...tempNum.filter((n) => Math.abs(n) < 10));
            index = tempNum.indexOf(num.toString());
            _underScore = tempNum[index];
            tempNum[index] = "_";
            this.equationString = "";
            console.log('temp : -------------------', tempNum)
            for (let i = 0; i < tempNum.length; i++) {

                this.equationString += tempNum[i];
                if (tempOperator[i]) {
                    this.equationString += tempOperator[i];
                }

            }
            // arr = [];
            // arr = [...tempNum];
            // arr.forEach(element => {
            //     this.equationString += element;
            // });
            this.equatioStringWithUnderscore = this.equationString
            //================================Setting Green equation value =====================================//

            let st1 = this.equationString;
            st1 = st1.split("");
            console.log("eq=============================== st", st1);
            this.crossEquation = "";
            let q1;
            st1.forEach(element => {
                if (element === '_') {
                    this.greenEquation += `[size=45][color=green][b][u]` + _underScore + `[/u][/b][/color][/size]`;
                }
                else {
                    this.greenEquation += (`[b]` + element + `[/b]`);
                }
            });
            this.greenValueText.setText(this.greenEquation);
            //================== Setting Cross equation value ====================//
            // bool = false;
            let st = this.equationString;
            st = st.split("");
            console.log("eq=============================== st", st);
            this.crossEquation = "";
            let q;
            st.forEach(element => {
                if (element === '_') {
                    this.crossEquation += `[size=45][color=red]X[/color][/size]`;
                }
                else {
                    this.crossEquation += (`[b]` + element + `[/b]`);
                }
            });
            console.log("eq===============================", this.crossEquation);

            this.crossEquationText.setText(this.crossEquation);

            //==================================================== 
            return _underScore;
        }
        else
            return null;
    };
    DisableSignsButtons() {
        this.equalSign.disableInteractive();
        this.lessThanSign.disableInteractive();
        this.greaterThanSign.disableInteractive();
    };
    //=========>Level Complete<=================//
    ChangeLevel(_bool) {
        let levelOrTimeComplete = true;
        if (this.isTimerAvailable) {
            if (this.timer.paused) {
                levelOrTimeComplete = false;
                this.ClearLevel();
                SoundManager.EndSoundPlay();
                this.BannerCreateAndHide("timeUp", false);
                this.CalculateResponse();
            }
        } else {
            if ((this.totalGamePlayed == this.totalNumberOfLevel)) {
                if (!_bool) {

                }
                levelOrTimeComplete = false;
                this.ClearLevel();
                SoundManager.EndSoundPlay();
                this.BannerCreateAndHide("gameOver", false);
                this.CalculateResponse();
                this.graphics.clear();
                this.graphics.visible = false;
                this.tickerRed.visible = false;
                this.tickerGreen.visible = false;
                this.timer.paused = true;
            } else {
                if (!_bool) {
                    // console.log("total game played");
                    this.totalGamePlayed += 1;
                    this.consecutiveComboWins = 0;;
                    this.totalInCorrectAnswer += 1;
                    this.consecutiveWins = 0;
                    this.consecutiveLoose += 1;;
                    this.LevelLoose(this.totalInCorrectAnswer);
                }
                // this.timeBar.scaleX = scaleFactorX * 340;                     // have commented out as it has no task to perform over here
                // this.timeBar.setTint(0x00ff00);
                this.timerDegre = -89;
                this.graphics.clear();
                this.graphics.visible = true;
                this.graphics.lineStyle(Math.floor(game.config.width / 300), 0x54f419, 1);
                this.graphics.beginPath();
                this.graphics.arc(game.config.width / 2, game.config.height / 12, Math.floor(game.config.width / 36), Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(this.timerDegre), true);
                this.graphics.strokePath();
                this.tickerRed.visible = false;
                this.tickerGreen.visible = true;
                this.timer.paused = false;
            }
        }
        if (levelOrTimeComplete) {
            this.ClearLevel();
            if (this.consecutiveWins == LevelManager.offsetForLevelUp) {
                // console.log("level up----------------------------");
                this.consecutiveWins = 0;
                this.BannerCreateAndHide("levelUp", true);
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
        this.cross.visible = false;
        this.greaterThanSign.tint = "0xf8b930";
        this.lessThanSign.tint = "0xf8b930";
        this.eachLevelTimer.paused = true;
        this.totalEachLevelTime.push(this.eachLevelTime);
        this.answers = [];
        this.destractor = [];
        this.objectAngle = 15;
        this.numberOfAnswers = 0;
        this.eachLevelTime = 0;
        this.numberOfDestractor = [];
        this.answerNumber = "0";
        this.equationString = "0";
        this.DisableCalculatorButtons(this.rightCalculatorButtons);
        this.DisableCalculatorButtons(this.leftCalculatorButtons);
        this.DisableSignsButtons();
        this.rightEquationText.setText("");
        this.leftEquationText.setText("");
        this.userInputNumber = 0;
        this.userPressedNumber = "";
        this.crossEquation = "";
        this.greenEquation = "";
        this.equatioStringWithUnderscore = "";
        this.greenValueText.visible = false;
    };
    LevelWin(_number) {
        this.thumbsUpText.setText(_number);
    };
    LevelLoose(_number) {
        this.thumbsDownText.setText(_number);
    };
    UpdateTimer() {
        console.log("UpdateTimer -----------------");
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
                this.graphics.arc(game.config.width / 2, game.config.height / 12, Math.floor(game.config.width / 36), Phaser.Math.DegToRad(-89), Phaser.Math.DegToRad(this.timerDegre), true);
                this.graphics.strokePath();
            } else {
                this.tickerRed.visible = false;
                this.tickerGreen.visible = true;
                this.graphics.lineStyle(Math.floor(game.config.width / 300), 0x54f419, 1);
                this.graphics.beginPath();
                this.graphics.arc(game.config.width / 2, game.config.height / 12, Math.floor(game.config.width / 36), Phaser.Math.DegToRad(-89), Phaser.Math.DegToRad(this.timerDegre), true);
                this.graphics.strokePath();
            }
        } else {
            this.DisableSignsButtons();
            this.graphics.clear();
            this.graphics.visible = false;
            this.tickerRed.visible = false;
            this.tickerGreen.visible = false;
            this.timer.paused = true;
            SoundManager.InCorrectAnswerSoundPlay(); //playing unanswered as incorrect
            if (this.timerBool == false) {
                this.timerBool = true;
                this.ChangeLevel(false);
            }

        }
    };
    DecideCalculator() {
        if (this.isTimerAvailable) {
            // this.totalTimeForGame
            if (Math.floor(Math.random()) > 0.7)//Left Calculator selected
            { }
        }
        else {
            // this.calculatorArr
            // this.totalNumberOfLevel
        }
    };
    PutCrossInEquation() {
        this.crossEquationText.visible = true;

        if (this.decidedCalculator == "left") {
            this.crossEquationText.x = this.leftEquationText.x;
            this.crossEquationText.y = this.leftEquationText.y;

            this.greenValueText.x = this.leftEquationText.x;
            this.greenValueText.y = this.leftEquationText.y;
        }
        else {

            this.crossEquationText.x = this.rightEquationText.x;
            this.crossEquationText.y = this.rightEquationText.y - (game.config.width / 384);

            this.greenValueText.x = this.rightEquationText.x;
            this.greenValueText.y = this.rightEquationText.y;

        }
        // return;
    };
    Delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    };
    GreenNumberOnCalculator() {
        this.crossEquationText.visible = false;
        if (this.decidedCalculator == "left") {
            this.leftEquationText.setText(this.equatioStringWithUnderscore);
        }
        else {
            this.rightEquationText.setText(this.equatioStringWithUnderscore);
        }
        this.greenValueText.visible = true;
    };
    //===========> GAME END RESPONSE<=====================//
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
        if (_totalTime > 0) {
            _avarageTime = (_totalTime / this.totalGamePlayed); // / _totalTime);
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
        } else {
            post_game.ratingBox = false;
        }

        //first star calculation

        let firstStar = (_correctAnwer / this.totalQuestionPresented);
        if (firstStar >= Database.success_rate) {
            post_game.firstStar = true;
        } else {
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
        } else {
            post_game.thirdStar = false;
        }
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
    ServerData(_level, _correctAnwer, _inCorrectAnswer,
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
        Server.sendGameData(data, Server);
        let baseUrl = "../post_game_screen/game_end.html";
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
            //     "&game_name=" + "WeightAMinut", "_self");
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
                    "&game_name=" + "NeonCalculator" +
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
                    "&game_name=" + "NeonCalculator", "_self");
            }
        }
        // window.open("../post_game_screen/game_end.html","_self");
    };
    //===>Banner Pop up<=========//
    BannerCreateAndHide(_text, _bool) {
        let popUpBg = this.add.image(game.config.width / 2, game.config.height / 2, _text).setOrigin(0.5).setScale(scaleFactorX, scaleFactorY);
        popUpBg.depth = 5;
        if (_bool) {
            setTimeout(() => {
                popUpBg.visible = false;
            }, 500);
        }
    };
}