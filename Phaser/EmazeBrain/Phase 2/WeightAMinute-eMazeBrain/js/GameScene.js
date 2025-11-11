import { LevelManager } from "./LevelManager.js";
import { Database } from "./Database.js";
import { LoadAssets } from "./LoadAssets.js";
import { GameArchitechture } from "./GameArchitechture.js";
import { Server } from "./Server.js";
export default class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
        //===> General Data <====//
        this.thumbsDown;
        this.thumbsUp;
        this.cross;
        this.bg;
        this.thumbsDownText;
        this.thumbsUpText;
        this.betweenX;
        this.baseCollider;
        this.totalImageName = [];
        this.answerButtonImageBase = [];
        this.questionImageBaseButton;
        this.leftShiftIndex = -1;
        this.rightShiftIndex = -1;
        this.baseColliderPosition = [];
        this.units = [];
        this.unitConvertAmount;
        this.timerImg;
        this.timerDegre = -89;//1;
        this.graphics;
        this.timer;
        this.rotationTween;
        this.rotationAngle = 0;
        this.questionValueConvertedAmt;
        this.convertedValueForAnswer;
        //=====> Level Data <======//
        this.isStopRotate = true;
        this.isTimerAvailable;
        this.isMovementAvailabe;
        this.gapX = 80;//100;
        this.gapY = 75;
        this.overlapped = false;
        this.isRotationAvailable;
        this.movementDirection;
        this.movementTime;
        this.rotationType;
        this.rotationTime;
        this.isMovementContinuous = true;
        this.TimeBetweenInterval = 1500;
        this.totalCorrectAnswer = 0;
        this.totalInCorrectAnswer = 0;
        this.movementIntervalIntervalArr = [];
        this.movementContinuousIntervalArr = [];
        this.movementIntervalX = 10;
        //         //-----------------------------------
        this.movementStartBool = true;
        this.intervalTimer;
        this.unitForQuestionImage;
        this.currentLevel = 1;
        this.consecutiveWins = 0;
        this.consecutiveLoose = 0;
        this.comboWins = 0;
        this.totalGamePlayed = 0;
        this.eachLevelTime = 0;//Each level time to calculate response
        this.totalEachLevelTime = [];//Each level time to calculate response
        this.eachGameTime = 0;//Each game time to calculate response
        this.totalNumberUserClicked = 0;//total number of click to calculate response
        this.totalQuestionPresented = 0;// total number of question presented to calculate response
        this.answerCheckingArr = [];
        this.allLevelImage = [];
        this.objectPosition = [];
        this.answerImage = [];
        this.questionImage = [];
        this.numberOfAnswerImages;
        this.numberOfQuestionImages;
        this.answerImageNumericValueText = [];
        this.questionImageNumericValueText;
        this.xPosAfterDrag;
        this.yPosAfterDrag;
        this.questionContainer;

        this.isRotationSingleImage = true;
        //==================tween variable=================
        this.movementContinuousTween;
        this.movementContinuousContinuousTween;
        this.MovementContineousIntervalTween;
        this.movementIntervalContinuousTween;
        //=================================================

        this.startMovementBool = true;
        //==================BANNER TEXT===================//
        this.letsStart;
        this.levelUp;
        this.timesUp;
        this.excellent;
        this.gameOver;
        this.eachLevelTimer;
        this.demoImage;
        //-------------------------------------------------------
        this.requiredClicksForTheGame = 0;
    };
    create() {
        if (Server.platform == "favorites") {
            window.parent.postMessage({ eventName: "gameStarted", payload: null }, "*");
        }
        this.gapX = game.config.width / 20;//100;
        this.gapY = game.config.height / 14.4;
        this.DragSingleWeight();
        SoundManager.StartSoundPlay();    //Game start sound 

        //====> Selecting Background <======//
        this.levelBackground = LevelManager.DecideLevelBackground();
        let singleImage = this.levelBackground.split("/");
        this.bg = this.add.image(game.config.width / 2, game.config.height / 2, singleImage[singleImage.length - 1]).setOrigin(0.5, 0.5).setScale(scaleFactorX * 1, scaleFactorY * 1);
        this.bg.setInteractive();
        this.bg.on("pointerdown", (pointer, x, y, event) => this.OnBackgroundClick());
        this.cross = this.add.text(game.config.width / 2, game.config.height / 2, "X", { font: "bold 20px ", fill: "#FF0000" }).setOrigin(0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        this.cross.visible = false;

        //=====> Static Items <==========//        
        let headerBar = this.add.image(game.config.width / 2, game.config.height / 23, 'one_pixel_white').setOrigin(0.5).setScale(scaleFactorX * 3000, scaleFactorY * 200);
        headerBar.setTint("0X04627b");
        headerBar.depth = 2;
        const style1 = { font: "bold 35px CCBellyLaugh", stroke: '#fff', strokeThickness: 6, fill: "#0c4826" };
        let headingText = this.add.text(game.config.width / 1.9, game.config.height / 12, "Weight A Minute", style1).setOrigin(0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        headingText.depth = 2;
        this.thumbsUp = this.add.image(game.config.width / 14, game.config.height / 13.2, "like").setOrigin(0.5, 0.5).setScale(scaleFactorX * 1.2, scaleFactorY * 1.2);
        this.thumbsDown = this.add.image(game.config.width / 1.075, game.config.height / 13.2, "unlike").setOrigin(0.5, 0.5).setScale(scaleFactorX * 1.2, scaleFactorY * 1.2);
        this.thumbsUp.depth = 2;
        this.thumbsDown.depth = 2;
        const style = { font: "bold 20px CCBellyLaugh", fill: "#000000" };//"#0c4826" ,stroke: '#fff', strokeThickness: 6,};
        this.thumbsUpText = this.add.text(this.thumbsUp.x + (game.config.width / 27), this.thumbsUp.y, this.totalCorrectAnswer, style).setOrigin(0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        this.thumbsDownText = this.add.text(this.thumbsDown.x - (game.config.width / 27), this.thumbsDown.y, this.totalInCorrectAnswer, style).setOrigin(0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        this.thumbsUpText.depth = 2;
        this.thumbsDownText.depth = 2;
        this.timerImg = this.add.image(game.config.width / 4.6, game.config.height / 13, "ticker").setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.5, scaleFactorY * 0.5);
        this.timerImg.depth = 3;

        //------------------------------------------
        this.timer = this.time.addEvent({ delay: 1000, callback: this.UpdateTimer, callbackScope: this, loop: true });
        this.timer.paused = true;
        this.eachLevelTimer = this.time.addEvent({ delay: 100, callback: this.UpdateEachLevelTimer, callbackScope: this, loop: true });
        this.eachLevelTimer.paused = true;

        //====> Timer Arc <============//
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(Math.floor(game.config.width / 190), 0x54f419, 1);
        this.graphics.beginPath();
        this.graphics.arc(game.config.width / 4.6, game.config.height / 13, Math.floor(game.config.width / 43), Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(this.timerDegre), true);
        this.graphics.strokePath();
        this.graphics.depth = 3;

        //===========Answer Click=========================//
        this.numberOfAnswerClick = 0;

        //===> Game time <=====//
        this.GameTimer();

        //======> createing initial level <====//
        this.CreateLevel();
        this.timer.paused = false;
        this.BannerCreateAndHide("GAME_START", true);
    };
    OnBackgroundClick() {
        this.totalNumberUserClicked += 1;
        //console.log('totalNumberUserClicked', this.totalNumberUserClicked);
    };
    CreateLevel() {
        this.eachLevelTimer.paused = false;
        this.currentLevel = LevelManager.GetCurrentLevelNumber();

        //=====> Images will be used in game <=====//
        this.ImageForCurrentLevel();

        //====> Image Rotation <====//
        this.MovementAndRotationOfImage();

        //=========> Display Level <=====//
        this.DisplayLevel();
    };
    GameTimer() {
        let questionTimeData = LevelManager.DecideTimeOrNumberOfQuestion();
        if (questionTimeData[0] === null || questionTimeData[0] === "") {
            this.isTimerAvailable = false;
        }
        else {
            this.isTimerAvailable = true;
        }
        this.totalTimeForGame = questionTimeData[0];
        this.timeForEachLevel = questionTimeData[1];
        this.totalNumberOfLevel = questionTimeData[2];
    };
    UpdateEachLevelTimer() {
        this.eachLevelTime += 100;
    };
    MovementAndRotationOfImage() {
        //console.log("MovementAndRotationOfImage");
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
        //console.log("ImageForCurrentLevel");
        let unitValue = LevelManager.unitValue;
        this.answerImageNumericValueText = this.questionImageNumericValueText = this.numberOfQuestionImages = this.numberOfAnswerImages = null;
        this.answerCheckingArr = [];
        this.numberOfAnswerImages = LevelManager.answerImageNumber;  //multiple question
        this.numberOfQuestionImages = LevelManager.questionImageNumber;  // draggable img
        this.requiredClicksForTheGame = this.requiredClicksForTheGame + this.numberOfQuestionImages;

        console.log('this.requiredClicksForTheGame', this.requiredClicksForTheGame);

        this.answerImageNumericValueText = LevelManager.SelectRandomAnswerImageText();
        this.unitConvertAmount = LevelManager.ConversionBetweenWeights();
        this.answerImageNumericValueText.sort(function (a, b) { return a - b });


        //#region -------Question Image Section-------
        this.questionImageNumericValueText = LevelManager.SelectQuestionImageText();
        if (unitValue.length > 1) {
            if (((Math.random() * (1 - 0) + 0)) > 0.5) {//Kg
                this.unitForQuestionImage = unitValue[(unitValue.length - 1)];
            }
            else {
                this.unitForQuestionImage = unitValue[0];
                this.questionImageNumericValueText = (this.questionImageNumericValueText * this.unitConvertAmount);
            }
        }
        else {
            this.unitForQuestionImage = unitValue[0];
            this.questionImageNumericValueText = (this.questionImageNumericValueText);//* this.unitConvertAmount);
        }
        //#endregion

        //#region --------Image section-------        
        this.totalImageName = Database.main_image_location;
        for (let i = 0; i < this.totalImageName.length; i++) {
            this.allLevelImage.push(LoadAssets.getImageName(this.totalImageName[i]));
        }
        for (let i = 0; i < this.numberOfAnswerImages; i++) {
            this.answerButtonImageBase.push(this.allLevelImage[Math.floor(Math.random() * this.allLevelImage.length)]);
        }
        for (let i = 0; i < this.numberOfQuestionImages; i++) {
            this.questionImageBaseButton = this.allLevelImage[Math.floor(Math.random() * this.allLevelImage.length)];
        }
        //#endregion
        //------------------BASE COLLIDER -----------------------//
        //#region-----Base Colllider------
        this.baseColliderPosition = LevelManager.GetBaseColliderPosition();
        if (Database.answer_location == "NW" || Database.answer_location == "SW") {
            this.baseCollider = this.add.image(this.baseColliderPosition[0][0], this.baseColliderPosition[0][1], "one_pixel_white").setOrigin(0, 0.5).setScale((this.gapX * this.numberOfAnswerImages + 160), 180).setAlpha(0);
        }
        else if (Database.answer_location == "N" || Database.answer_location == "S") {
            this.baseCollider = this.add.image(this.baseColliderPosition[0][0], this.baseColliderPosition[0][1], "one_pixel_white").setOrigin(0, 0.5).setScale((this.gapX * this.numberOfAnswerImages + 160), 180).setAlpha(0);
        }
        else if (Database.answer_location == "E" || Database.answer_location == "W") {
            this.baseCollider = this.add.image(this.baseColliderPosition[0][0], this.baseColliderPosition[0][1], "one_pixel_white").setOrigin(0.5, 0).setScale(205, (this.numberOfAnswerImages * this.gapY + 60)).setAlpha(0);
        }
        else if (Database.answer_location == "NE" || Database.answer_location == "SE") {
            this.baseCollider = this.add.image(this.baseColliderPosition[0][0], this.baseColliderPosition[0][1], "one_pixel_white").setOrigin(1, 0.5).setScale((this.gapX * this.numberOfAnswerImages + 160), 210).setAlpha(0);
        }
        //#endregion
    };
    DisplayLevel(_this) {
        console.log('database.answerlocation : ', Database.answer_location);
        let numericAnswerValueText, temp, tempUnits;
        let unitValue = LevelManager.unitValue;
        let numStyle = { fontFamily: 'Georgia', fontSize: '20px', fill: '#fff', fontStyle: 'bold', align: 'center' };
        this.objectPosition = LevelManager.GetAnswerImagePosition();

        if (Database.answer_location == "NE" || Database.answer_location == "SE") {
            let counter = 0
            for (let i = (this.numberOfAnswerImages - 1); i >= 0; i--) { // multiple answer images created   

                let container = this.add.container(this.objectPosition[i][0], this.objectPosition[i][1]);
                container.name = this.answerImageNumericValueText[counter];
                container.prevX = container.x;
                container.prevY = container.y;
                if (unitValue.length > 1) {
                    if (((Math.random() * (1 - 0) + 0)) > 0.5) {//Kg
                        tempUnits = unitValue[0];

                        temp = (this.answerImageNumericValueText[counter] * this.unitConvertAmount);//.toFixed(2);
                    }
                    else {

                        tempUnits = unitValue[(unitValue.length - 1)];
                        temp = (this.answerImageNumericValueText[counter]);
                    }
                }
                else {
                    tempUnits = unitValue[0];
                    temp = (this.answerImageNumericValueText[counter]);
                }
                this.units.push(tempUnits);
                this.answerCheckingArr.push(temp);

                let button = this.add.image(0, 0, this.answerButtonImageBase[i]).setOrigin(0.5).setScale(scaleFactorX * 1, scaleFactorY * 1);
                numericAnswerValueText = this.add.text(0, -2, temp + " " + tempUnits, numStyle).setOrigin(0.5);
                container.add([button, numericAnswerValueText]);
                container.key = "answers";
                container.setSize(button.width, button.height);
                if (Database.answer_location != "E" && Database.answer_location != "W") {
                    container.angle = -90;
                }
                this.answerImage.push(container);
                counter += 1;
            }
        }
        else {
            let counter = 0, posCount = 0;
            console.log("###", this.numberOfAnswerImages);
            if (this.numberOfAnswerImages < 10) {
                posCount = 3;
            }
            else {
                posCount = 3 - (this.numberOfAnswerImages - 9);
            }
            for (let i = 0; i < this.numberOfAnswerImages; i++)  // multiple answer images created   
            {
                let container = this.add.container(this.objectPosition[posCount][0], this.objectPosition[posCount][1]);
                container.name = this.answerCheckingArr[i];
                container.prevX = container.x;
                container.prevY = container.y;
                if (unitValue.length > 1) {
                    if (((Math.random() * (1 - 0) + 0)) > 0.5) {//Kg
                        tempUnits = unitValue[0];

                        temp = (this.answerImageNumericValueText[counter] * this.unitConvertAmount);//.toFixed(2);
                    }
                    else {

                        tempUnits = unitValue[(unitValue.length - 1)];
                        temp = (this.answerImageNumericValueText[counter]);
                    }
                }
                else {
                    tempUnits = unitValue[0];
                    temp = (this.answerImageNumericValueText[counter]);
                }
                this.units.push(tempUnits);
                this.answerCheckingArr.push(temp);
                let button = this.add.image(0, 0, this.answerButtonImageBase[i]).setOrigin(0.5).setScale(scaleFactorX * 1, scaleFactorY * 1);
                numericAnswerValueText = this.add.text(0, -2, temp + "" + tempUnits, numStyle).setOrigin(0.5);
                container.add([button, numericAnswerValueText]);
                container.key = "answers";
                container.setSize(button.width, button.height);
                if (Database.answer_location != "E" && Database.answer_location != "W") {
                    container.angle = -90;
                }
                this.answerImage.push(container);
                counter += 1;
                posCount += 1;
            }
        }

        for (let j = 0; j < this.numberOfQuestionImages; j++) // this.isMovementAvailabe single image created
        {
            this.questionContainer = this.add.container(game.config.width / 2, game.config.height / 2);
            let button = this.add.image(0, 0, this.questionImageBaseButton).setOrigin(0.5).setScale(scaleFactorX * 1, scaleFactorY * 1);
            let numericQuestionValueText = this.add.text(0, 0, this.questionImageNumericValueText + " " + this.unitForQuestionImage, numStyle).setOrigin(0.5);
            this.questionContainer.name = numericQuestionValueText;
            this.questionContainer.key = "destructor";
            this.questionContainer.prevX = this.questionContainer.x;
            this.questionContainer.prevY = this.questionContainer.y;
            this.questionContainer.prevAngle = 0;
            this.questionContainer.add([button, numericQuestionValueText]);
            this.questionContainer.setSize(button.width, button.height);

            if (Database.answer_location != "E" && Database.answer_location != "W") {
                this.questionContainer.angle = -90;
                this.questionContainer.prevAngle = -90;
            }
            this.questionContainer.setInteractive({ useHandCursor: true });
            this.input.setDraggable(this.questionContainer);
        }
        if (this.isRotationAvailable) {
            this.RotateImages(this.rotationType);
        }
        if (this.isMovementAvailabe) {
            this.SetMovementType(LevelManager.movementDirection, LevelManager.movementType);
        }
    };

    DragSingleWeight() {
        this.input.on('dragstart', (pointer, object) => {
            this.isRotationSingleImage = false;
            object.dragStartX = object.x;
            object.dragStartY = object.y;
            if (Database.answer_location != "E" && Database.answer_location != "W") {
                object.setAngle(-90);
            }
            if (this.isMovementAvailabe)
                this.StartAndStopMovement(LevelManager.movementDirection, LevelManager.movementType, false);
        });

        this.input.on('drag', (pointer, object, dragX, dragY) => {
            object.x = dragX;
            object.y = dragY;
            for (let i = 0; i < this.answerImage.length; i++) {
                this.CheckOverlap(object, this.answerImage[i]);
            }
        });

        this.input.on('dragend', (pointer, object) => {
            if ((object.x != object.prevX) && (object.y != object.prevY)) {
                if (object) {
                    if (this.overlapped) { /* Object placed */
                        this.SetPositionOfAllWeight(object);
                    } else {
                        object.x = object.dragStartX;
                        object.y = object.dragStartY;
                        if (this.isMovementAvailabe)
                            this.StartAndStopMovement(LevelManager.movementDirection, LevelManager.movementType, true);
                    }
                }
                if (this.isStopRotate == false && this.isRotationAvailable) {
                    this.rotationTween.pause();
                    this.questionContainer.angle = this.questionContainer.prevAngle;
                }
                this.isRotationSingleImage = true;

            }
        });
    };
    SetPositionOfAllWeight(_object) {
        this.isStopRotate = false;
        if (Database.answer_location == "N" || Database.answer_location == "S" || Database.answer_location == "SW"
            || Database.answer_location == "SE" || Database.answer_location == "NE" || Database.answer_location == "NW")  // landscape
        {
            if (this.leftShiftIndex == -1) {
                _object.setPosition(this.answerImage[0].x - this.gapX, this.answerImage[0].y);
            }
            else {
                _object.setPosition(this.answerImage[this.leftShiftIndex].x + this.gapX, this.answerImage[this.leftShiftIndex].y);
            }
        }
        else if (Database.answer_location == "E" || Database.answer_location == "W")          // portrait
        {
            if (this.leftShiftIndex == -1) {
                _object.setPosition(this.answerImage[0].x, this.answerImage[0].y - this.gapY);
            }
            else {
                _object.setPosition(this.answerImage[this.leftShiftIndex].x, this.answerImage[this.leftShiftIndex].y + this.gapY);
            }
        }
        this.AfterDrag();
    };
    CheckOverlap(obj1, obj2) {
        let boundA = obj1.getBounds();
        let boundB = obj2.getBounds();
        if (Phaser.Geom.Intersects.RectangleToRectangle(boundA, boundB)) {
            //console.log('overlap is occuring');
            this.MoveWeightsOnOverlap(obj1);
            this.overlapped = true;
        }
        else {
            if (!Phaser.Geom.Intersects.RectangleToRectangle(obj1.getBounds(), this.baseCollider.getBounds())) {
                if (Database.answer_location == "E" || Database.answer_location == "W") {
                    obj2.y = obj2.prevY;
                }
                else {
                    obj2.x = obj2.prevX;
                }
                this.overlapped = false;
            }
            else {
                this.MoveWeightsOnOverlap(obj1);
                this.overlapped = true;
            }
        }
    };
    MoveWeightsOnOverlap(_obj1) {
        let leftElementIndex = -1;
        let rightElementIndex = -1;
        if (Database.answer_location == "NW" ||
            Database.answer_location == "NE" ||
            Database.answer_location == "SW" ||
            Database.answer_location == "SE" ||
            Database.answer_location == "N" ||
            Database.answer_location == "S") {
            for (let i = 0; i < this.answerImage.length; i++) {
                if (this.answerImage[i].x <= _obj1.x) {
                    leftElementIndex = i;

                }
                if (this.answerImage[this.answerImage.length - 1 - i].x >= _obj1.x) {
                    rightElementIndex = this.answerImage.length - 1 - i;
                }
            }

            if (leftElementIndex != -1) {
                for (let i = 0; i <= leftElementIndex; i++) {
                    this.answerImage[i].x = this.answerImage[i].prevX - (this.gapX / 2);
                }
            }
            if (rightElementIndex != -1) {
                for (let i = rightElementIndex; i < this.answerImage.length; i++) {
                    this.answerImage[i].x = this.answerImage[i].prevX + (this.gapX / 2);
                }
            }
        }
        else if (Database.answer_location == "E" || Database.answer_location == "W") {
            for (let i = 0; i < this.answerImage.length; i++) {
                if (this.answerImage[i].y <= _obj1.y) {
                    leftElementIndex = i;
                }
                if (this.answerImage[this.answerImage.length - 1 - i].y >= _obj1.y) {
                    rightElementIndex = this.answerImage.length - 1 - i;
                }
            }

            if (leftElementIndex != -1) {
                for (let i = 0; i <= leftElementIndex; i++) {
                    this.answerImage[i].y = this.answerImage[i].prevY - (this.gapY / 2);
                }
            }
            if (rightElementIndex != -1) {
                for (let i = rightElementIndex; i < this.answerImage.length; i++) {
                    this.answerImage[i].y = this.answerImage[i].prevY + (this.gapY / 2);
                }
            }
        }
        this.leftShiftIndex = leftElementIndex;
        this.rightShiftIndex = rightElementIndex;
    };
    PlaceCross() {
        this.cross.visible = true;
        if (Database.answer_location == "E") {
            this.cross.y = this.questionContainer.y;
            this.cross.x = this.questionContainer.x - (this.questionContainer.width) + Math.floor(game.config.width / 21.5);
        }
        else if (Database.answer_location == "W") {
            this.cross.y = this.questionContainer.y;
            this.cross.x = this.questionContainer.x + (this.questionContainer.width) - Math.floor(game.config.width / 21.5);
        }
        else {
            this.cross.x = this.questionContainer.x;
            this.cross.y = this.questionContainer.y - (this.questionContainer.height) - Math.floor(game.config.height / 21.5);
        }
    };
    AfterDrag() {
        console.log("After drag called------------------");
        this.eachLevelTimer.paused = true;
        this.totalEachLevelTime.push(this.eachLevelTime);
        let checkArr = [];
        let correctAnswer = false;
        let answer = this.questionImageNumericValueText,
            leftElement = this.answerCheckingArr[this.leftShiftIndex],
            rightElement = this.answerCheckingArr[this.rightShiftIndex];
        // //console.log('rightElement', rightElement);
        // //console.log('leftElement', leftElement);
        // //console.log('this.units[this.rightShiftIndex]', this.units[this.rightShiftIndex]);
        // //console.log('this.units[this.leftShiftIndex]', this.units[this.leftShiftIndex]);

        //----------------------------------------------------

        let unitValue = LevelManager.unitValue;
        if (unitValue.length > 1) {
            if (this.unitForQuestionImage == unitValue[1]) {
                answer = (this.questionImageNumericValueText * this.unitConvertAmount);
            }
            if (!(rightElement === undefined) && (this.units[this.rightShiftIndex] === unitValue[1])) {
                rightElement = (rightElement * this.unitConvertAmount);
            }
            if (!(leftElement === undefined) && (this.units[this.leftShiftIndex] === unitValue[1])) {
                leftElement = (leftElement * this.unitConvertAmount);
            }
        }
        else {
            answer = (this.questionImageNumericValueText);//* this.unitConvertAmount);
        }
        // //console.log('\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\');
        // //console.log('rightElement', rightElement);
        // //console.log('leftElement', leftElement);
        // //console.log('answer', answer);
        if (
            (rightElement === undefined)
            && (leftElement < answer)
        ) {
            correctAnswer = true;
            // //console.log("won---------------------------------");
        }
        else if (
            (leftElement === undefined)
            && (answer < rightElement)
        ) {
            correctAnswer = true;
            // //console.log("won---------------------------------");
        }
        else if ((leftElement < answer) && (answer < rightElement)) {
            correctAnswer = true;
            // //console.log("won---------------------------------");
        }
        else {
            correctAnswer = false;
            // //console.log("Loose---------------------------------");
            this.PlaceCross();
        }
        setTimeout(() => {
            this.OnObjectClicked(correctAnswer);
        }, 500);
    };
    OnObjectClicked(_correct) {
        this.totalGamePlayed += 1;
        //console.log('total game played  : ', this.totalGamePlayed);
        if (_correct) {
            this.numberOfAnswerClick += 1;
            this.totalCorrectAnswer += 1;
            this.consecutiveWins += 1;
            this.consecutiveComboWins += 1;
            if (this.consecutiveComboWins > this.comboWins) {
                this.comboWins = this.consecutiveComboWins;
            }
            this.consecutiveLoose = 0;
            if ((parseInt(this.consecutiveWins) != parseInt(LevelManager.offsetForLevelUp)) && (parseInt(this.totalGamePlayed) != parseInt(this.totalNumberOfLevel))) {
                this.BannerCreateAndHide("EXCELLENT", true);
                SoundManager.CorrectAnswerSoundPlay(); //Playing when answer is correct
            }
            this.LevelWin(this.totalCorrectAnswer);
        } else {
            this.consecutiveWins = 0;
            this.consecutiveComboWins = 0;
            this.totalInCorrectAnswer += 1;
            this.consecutiveLoose += 1;
            SoundManager.InCorrectAnswerSoundPlay(); //Playing when answer is incorrect
            this.LevelLoose(this.totalInCorrectAnswer);
        }
        this.ChangeLevel(true);
    };
    StartAndStopMovement(_dir, _dirType, _bool) {
        switch (parseInt(_dirType)) {
            case 0:
                _dirType = "continuous";
                if (_bool == false) {
                    this.movementContinuousTween.pause();
                }
                else {
                    this.movementContinuousTween.resume();
                }
                break;
            case 1:
                _dirType = "intervals";
                this.intervalTimer.paused = (!_bool);
                break;
            case 2:
                _dirType = "continuous-continuous";
                if (_bool == false) {
                    this.movementContinuousContinuousTween.pause();
                }
                else {
                    this.movementContinuousContinuousTween.resume();
                }
                break;
            case 3:
                _dirType = "continuous-interval";
                this.intervalTimer.paused = (!_bool);
                if (_bool == false) {
                    this.MovementContineousIntervalTween.pause();
                }
                else {
                    this.MovementContineousIntervalTween.resume();
                }
                break;
            case 4:
                _dirType = "intervals-continuous";
                if (this.intervalTimer) {
                    this.intervalTimer.paused = (!_bool);
                }
                if (!_bool) {
                    if (this.movementIntervalContinuousTween) {
                        this.movementIntervalContinuousTween.pause();
                    }
                }
                else {
                    if (this.movementIntervalContinuousTween) {
                        this.movementIntervalContinuousTween.resume();
                    }
                }
                break;
            case 5:
                _dirType = "intervals-intervals";
                this.intervalTimer.paused = (!_bool);
                break;
        }
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
        }
        else {
            if ((this.totalGamePlayed == this.totalNumberOfLevel)) {
                levelOrTimeComplete = false;
                this.ClearLevel();
                SoundManager.EndSoundPlay();
                this.BannerCreateAndHide("GAME_OVER", false);
                this.CalculateResponse();
                this.graphics.clear();
                this.graphics.visible = false;
                this.timer.paused = true;
            }
            else {
                if (!_bool) {
                    this.totalGamePlayed += 1;
                    this.consecutiveComboWins = 0;
                    this.totalInCorrectAnswer += 1;
                    this.consecutiveWins = 0;
                    this.consecutiveLoose += 1;
                    this.LevelLoose(this.totalInCorrectAnswer);
                }
                this.timerDegre = -89;
                this.graphics.clear();
                this.graphics.visible = true;
                this.graphics.lineStyle(Math.floor(game.config.width / 190), 0x54f419, 1);
                this.graphics.beginPath();
                this.graphics.arc(game.config.width / 4.6, game.config.height / 13, Math.floor(game.config.width / 43), Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(this.timerDegre), true);
                this.graphics.strokePath();
                this.timer.paused = false;
            }
        }
        if (levelOrTimeComplete) {
            this.ClearLevel();
            if (this.consecutiveWins == LevelManager.offsetForLevelUp) {
                this.consecutiveWins = 0;
                this.BannerCreateAndHide("LEVEL_UP", true);
                SoundManager.LevelUpSoundPlay();
                LevelManager.IncreaseLevel(LevelManager);
            }
            else if (this.consecutiveLoose == LevelManager.offsetForLevelDown) {
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
        this.answerImageNumericValueText = [];
        this.questionImageNumericValueText = 0;
        this.unitConvertAmount = 0;
        this.eachLevelTime = 0;
        this.objectPosition = [];
        this.baseColliderPosition = [];
        this.checkArr = [];
        this.units = [];

        this.movementContinuousIntervalBool = false;
        this.movementIntervalInterval = false;
        this.cross.visible = false;
        this.isStopRotate = true;
        this.DestroyQuestionAndOptions();
    };
    DestroyQuestionAndOptions() {
        let arrLength = this.scene.scene.children.list.length;
        for (let i = 0; i < arrLength; i++) {
            if (this.scene.scene.children.list[i].key == "answers" || this.scene.scene.children.list[i].key == "destructor") {
                this.scene.scene.children.list[i].destroy();
                arrLength = this.scene.scene.children.list.length;
                i = 0;
            }
        }

        this.answerImage = [];
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
            this.timerDegre += (360 / this.totalTimeForGame);
            offSet = (270 - (360 / this.totalTimeForGame));
        } else {
            this.timerDegre += (360 / this.timeForEachLevel);
            offSet = (270 - (360 / this.timeForEachLevel));
        }
        if (this.timerDegre < 269) {
            if (this.timerDegre > 180) {
                this.graphics.lineStyle(Math.floor(game.config.width / 190), 0xf13900, 1);
                this.graphics.beginPath();
                this.graphics.arc(game.config.width / 4.6, game.config.height / 13, Math.floor(game.config.width / 43), Phaser.Math.DegToRad(-89), Phaser.Math.DegToRad(this.timerDegre), true);
                this.graphics.strokePath();
            } else {
                this.graphics.lineStyle(Math.floor(game.config.width / 190), 0x54f419, 1);
                this.graphics.beginPath();
                this.graphics.arc(game.config.width / 4.6, game.config.height / 13, Math.floor(game.config.width / 43), Phaser.Math.DegToRad(-89), Phaser.Math.DegToRad(this.timerDegre), true);
                this.graphics.strokePath();
            }
        } else {
            this.graphics.clear();
            // this.graphics.visible = false;
            this.timer.paused = true;
            // SoundManager.InCorrectAnswerSoundPlay(); //playing unanswered as incorrect
            this.ChangeLevel(false);
        }
    };
    SetMovementType(directionType, movementType) {
        switch (parseInt(movementType)) {
            case 0:
                this.movementType = "continuous";
                this.SetDirectionType(directionType, this.questionContainer);
                break;
            case 1:
                this.movementType = "intervals";
                this.SetDirectionType(directionType, this.questionContainer);
                break;
            case 2:
                this.movementType = "continuous-continuous";
                this.SetDirectionType(directionType, this.questionContainer);
                break;
            case 3:
                this.movementType = "continuous-interval";
                this.SetDirectionType(directionType, this.questionContainer);
                break;
            case 4:
                this.movementType = "intervals-continuous";
                this.SetDirectionType(directionType, this.questionContainer);
                break;
            case 5:
                this.movementType = "intervals-intervals";
                this.SetDirectionType(directionType, this.questionContainer);
                break;
        }
    };
    StartMovement(_obj, continousStartX, continousStartY,
        continousEndX, continousEndY, _direction) {
        switch (this.movementType) {
            case "continuous":  //0
                this.MovementContineous(_obj, continousStartX, continousStartY,
                    continousEndX, continousEndY);
                break;
            case "intervals":  //1
                this.MovementInterval(_obj, _direction);
                break;
            case "continuous-continuous":  //2
                this.MovementContineousContineous(_obj, continousStartX, continousStartY,
                    continousEndX, continousEndY);
                break;
            case "continuous-interval":  //3
                this.MovementContineousInterval(_obj, continousStartX, continousStartY,
                    continousEndX, continousEndY, _direction);
                break;
            case "intervals-continuous":  //4
                this.MovementIntervalContineous(_direction, _obj, continousStartX, continousStartY, continousEndX, continousEndY);
                break;
            case "intervals-intervals":  //5
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
                    _obj.continousStartX = 0;
                    _obj.continousStartY = (game.config.height / 1.8);
                    _obj.continousEndX = (game.config.width);
                    _obj.continousEndY = (game.config.height / 1.8);
                    this.movementIntervalX = ((game.config.width) / 10);
                    this.movementIntervalY = 0;
                    break;
                case "TTB":
                    this.movementTime = ((10000 / (game.config.height + 200)) * ((game.config.height + 200) - _obj.y));
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
                    //console.log('objy : ', _obj)
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
        this.rotationTween = this.tweens.add({
            targets: this.questionContainer,
            angle: { from: this.questionContainer.angle, to: (_angle + this.questionContainer.angle) },
            ease: 'Linear',
            duration: this.rotationTime,
            callbackScope: this,
            loop: -1
        });
    };
    // TIME FOR CONTINUOUS
    TimeForContineous(_obj, _startX, _startY, _endX, _endY) {
        let distance = null,
            distance2 = null;
        if (LevelManager.movementDirection == "RTL" || LevelManager.movementDirection == "LTR") {
            this.movementTime = parseInt(((LevelManager.movementTime * 1000) / Math.abs(_obj.continousEndX - _obj.continousStartX)) * Math.abs(_startX - _endX));
        } else if (LevelManager.movementDirection == "BTT" || LevelManager.movementDirection == "TTB") {
            this.movementTime = parseInt(((LevelManager.movementTime * 1000) / Math.abs(_obj.continousEndY - _obj.continousStartY)) * Math.abs(_startY - _endY));
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
            this.movementTime = (distance / this.movementIntervalY);
        }
        this.movementTime = parseInt((LevelManager.movementTime * 1000) / this.movementTime);

        return this.movementTime;
    };
    MovementContineous(_obj, _startX, _startY, _endX, _endY) {
        this.movementTime = this.TimeForContineous(_obj, _obj.x, _obj.y, _obj.continousEndX, _obj.continousEndY);
        this.movementContinuousTween = this.tweens.add({
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
                        this.movementContinuousTween = this.tweens.add({
                            targets: _obj,
                            x: _obj.continousEndX,
                            y: _obj.continousEndY,
                            ease: 'Linear',
                            duration: (LevelManager.movementTime * 1000),
                            // loop: -1,
                            repeat: 1,
                            loopDelay: 500,
                            onComplete: () => {
                                this.OnObjectClicked(false);
                                //console.log("wdddddddddddddddddddd");
                            }
                        });
                    }, 500);
                }
            }
        });
    };
    MovementContineousContineous(_obj, _startX, _startY, _endX, _endY) {
        this.movementTime = this.TimeForContineous(_obj, _obj.x, _obj.y, _obj.continousEndX, _obj.continousEndY);
        this.movementContinuousContinuousTween = this.tweens.add({
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
                    this.movementContinuousContinuousTween = this.tweens.add({
                        targets: _obj,
                        x: _obj.continousEndX,
                        y: _obj.continousEndY,
                        ease: 'Linear',
                        duration: this.movementTime, //     (LevelManager.movementTime*1000),
                        // yoyo: true,
                        repeat: 1,
                        onComplete: () => {
                            this.OnObjectClicked(false);
                        }
                    });
                }
            }
        });
    };
    MovementContineousInterval(_obj, _startX, _startY, _endX, _endY, _dir) {
        _obj.bool = false;
        let _delay;
        let counter = 1;
        if (!this.movementContinuousIntervalBool) {
            this.movementTime = this.TimeForInterval(_obj);
            this.intervalTimer = this.time.addEvent({
                delay: this.TimeBetweenInterval, //this.movementTime,
                callback: () => {
                    if (this.movementContinuousIntervalArr.length > 0) {
                        this.movementContinuousIntervalArr.forEach(element => {
                            switch (_dir) {
                                case "RTL":
                                    if (element.x > 0) {
                                        element.x -= this.movementIntervalX;
                                    } else {
                                        ++counter;
                                        if (counter < 3) {
                                            element.setPosition((game.config.width), element.y);
                                        }
                                        else {
                                            this.intervalTimer.paused = true;
                                            this.OnObjectClicked();
                                        }
                                    }
                                    break;
                                case "LTR":
                                    if (element.x < (game.config.width)) {
                                        element.x += this.movementIntervalX;
                                    } else {
                                        ++counter;
                                        if (counter < 3) {
                                            element.setPosition(0, element.y);
                                        }
                                        else {
                                            this.intervalTimer.paused = true;
                                            this.OnObjectClicked();
                                        }
                                    }
                                    break;
                                case "TTB":
                                    if (element.y < element.continousEndY) {
                                        element.y += this.movementIntervalY;
                                    } else {
                                        ++counter;
                                        if (counter < 3) {
                                            element.setPosition(element.x, (element.continousStartY));
                                        }
                                        else {
                                            this.intervalTimer.paused = true;
                                            this.OnObjectClicked();
                                        }
                                    }
                                    break;
                                case "BTT":
                                    if (element.y > element.continousEndY) {
                                        element.y += this.movementIntervalY;
                                    } else {
                                        ++counter;
                                        if (counter < 3) {
                                            element.setPosition(element.x, (element.continousStartY));
                                        }
                                        else {
                                            this.intervalTimer.paused = true;
                                            this.OnObjectClicked();
                                        }
                                    }
                                    break;

                                case "BRDTL":
                                    if ((element.x - this.movementIntervalX) > element.continousEndX) {
                                        if ((element.y - this.movementIntervalY) > element.continousEndY) {
                                            element.x -= this.movementIntervalX;
                                            element.y -= this.movementIntervalY;
                                        } else {
                                            ++counter;
                                            if (counter < 3) {
                                                element.setPosition(element.continousStartX, element.continousStartY);
                                            }
                                            else {
                                                this.intervalTimer.paused = true;
                                                this.OnObjectClicked();
                                            }
                                        }
                                    } else {
                                        ++counter;
                                        if (counter < 3) {
                                            element.setPosition(element.continousStartX, element.continousStartY);
                                        }
                                        else {
                                            this.intervalTimer.paused = true;
                                            this.OnObjectClicked();
                                        }
                                    }
                                    break;
                                case "BLDTR":
                                    if ((element.x + this.movementIntervalX) < element.continousEndX) {
                                        if ((element.y - this.movementIntervalY) > element.continousEndY) {
                                            element.x += this.movementIntervalX;
                                            element.y -= this.movementIntervalY;
                                        } else {
                                            ++counter;
                                            if (counter < 3) {
                                                element.setPosition(element.continousStartX, element.continousStartY);
                                            }
                                            else {
                                                this.intervalTimer.paused = true;
                                                this.OnObjectClicked();
                                            }
                                        }
                                    } else {
                                        ++counter;
                                        if (counter < 3) {
                                            element.setPosition(element.continousStartX, element.continousStartY);
                                        }
                                        else {
                                            this.intervalTimer.paused = true;
                                            this.OnObjectClicked();
                                        }
                                    }
                                    break;
                                case "TLDBR":
                                    if ((element.x + this.movementIntervalX) < element.continousEndX) {
                                        if ((element.y + this.movementIntervalY) < element.continousEndY) {
                                            element.x += this.movementIntervalX;
                                            element.y += this.movementIntervalY;
                                        } else {
                                            ++counter;
                                            if (counter < 3) {
                                                element.setPosition(element.continousStartX, element.continousStartY);
                                            }
                                            else {
                                                this.intervalTimer.paused = true;
                                                this.OnObjectClicked();
                                            }
                                        }
                                    } else {
                                        ++counter;
                                        if (counter < 3) {
                                            element.setPosition(element.continousStartX, element.continousStartY);
                                        }
                                        else {
                                            this.intervalTimer.paused = true;
                                            this.OnObjectClicked();
                                        }
                                    }
                                    break;
                                case "TRDBL":
                                    if ((element.x - this.movementIntervalX) > element.continousEndX) {
                                        if ((element.y + this.movementIntervalY) < element.continousEndY) {
                                            element.x -= this.movementIntervalX;
                                            element.y += this.movementIntervalY;
                                        } else {
                                            ++counter;
                                            if (counter < 3) {
                                                element.setPosition(element.continousStartX, element.continousStartY);
                                            }
                                            else {
                                                this.intervalTimer.paused = true;
                                                this.OnObjectClicked();
                                            }
                                        }
                                    } else {
                                        ++counter;
                                        if (counter < 3) {
                                            element.setPosition(element.continousStartX, element.continousStartY);
                                        }
                                        else {
                                            this.intervalTimer.paused = true;
                                            this.OnObjectClicked();
                                        }
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
        this.MovementContineousIntervalTween = this.tweens.add({
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
    MovementIntervalContineous(_dir, _obj) {   // BTT and TTB error
        let counter = _obj.length;
        this.movementTime = this.TimeForInterval(_obj);
        this.intervalTimer = this.time.addEvent({
            delay: LevelManager.hoppingTime,//this.TimeBetweenInterval,
            callback: () => {
                switch (_dir) {
                    case "RTL":
                        if (_obj.x > 0) {
                            _obj.x -= this.movementIntervalX;
                        } else {
                            _obj.setPosition((game.config.width), _obj.y);
                            this.intervalTimer.paused = true;
                            this.MovementIntervalContineousTween(_obj, 0, _obj.y);
                        }
                        break;
                    case "LTR":
                        if (_obj.x < (game.config.width)) {
                            _obj.x += this.movementIntervalX;
                        } else {
                            _obj.setPosition(0, _obj.y);
                            this.intervalTimer.paused = true;
                            this.MovementIntervalContineousTween(_obj, (game.config.width), _obj.y);
                        }
                        break;
                    case "TTB":
                        if ((_obj.y + this.movementIntervalY) < _obj.continousEndY) {
                            _obj.y += this.movementIntervalY;
                        } else {
                            _obj.setPosition(_obj.x, (_obj.continousStartY));
                            this.intervalTimer.paused = true;
                            this.MovementIntervalContineousTween(_obj, _obj.x, (_obj.continousEndY));
                        }
                        break;
                    case "BTT":

                        if ((_obj.y + this.movementIntervalY) > _obj.continousEndY) {
                            _obj.y += this.movementIntervalY;
                        } else {
                            _obj.setPosition(_obj.x, (_obj.continousStartY));
                            this.intervalTimer.paused = true;
                            this.MovementIntervalContineousTween(_obj, _obj.x, (_obj.continousEndY));
                        }
                        break;

                    case "BRDTL":
                        if ((_obj.x - this.movementIntervalX) > _obj.continousEndX) {
                            if ((_obj.y - this.movementIntervalY) > _obj.continousEndY) {
                                _obj.x -= this.movementIntervalX;
                                _obj.y -= this.movementIntervalY;
                            } else {
                                this.intervalTimer.paused = true;
                                _obj.setPosition(_obj.continousStartX, _obj.continousStartY);
                                this.MovementIntervalContineousTween(_obj, _obj.continousEndX, _obj.continousEndY);
                            }
                        } else {
                            this.intervalTimer.paused = true;
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
                                this.intervalTimer.paused = true;
                                _obj.setPosition(_obj.continousStartX, _obj.continousStartY);
                                this.MovementIntervalContineousTween(_obj, _obj.continousEndX, _obj.continousEndY);
                            }
                        } else {
                            this.intervalTimer.paused = true;
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
                                this.intervalTimer.paused = true;
                                _obj.setPosition(_obj.continousStartX, _obj.continousStartY);
                                this.MovementIntervalContineousTween(_obj, _obj.continousEndX, _obj.continousEndY);
                            }
                        } else {
                            this.intervalTimer.paused = true;
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
                                this.intervalTimer.paused = true;
                                _obj.setPosition(_obj.continousStartX, _obj.continousStartY);
                                this.MovementIntervalContineousTween(_obj, _obj.continousEndX, _obj.continousEndY);
                                counter -= 1;
                            }
                        } else {
                            this.intervalTimer.paused = true;
                            _obj.setPosition(_obj.continousStartX, _obj.continousStartY);
                            this.MovementIntervalContineousTween(_obj, _obj.continousEndX, _obj.continousEndY);
                            counter -= 1;
                        }
                        break;
                }
                if (counter == 0) {
                    this.intervalTimerintervalTimer.remove();
                }
            },
            callbackScope: this,
            loop: true
        });
    };
    MovementIntervalContineousTween(_obj, _x, _y) {
        this.movementIntervalContinuousTween = this.tweens.add({
            targets: _obj,
            x: _x,
            y: _y,
            ease: 'Linear',
            duration: (LevelManager.movementTime * 1000),
            callbackScope: this,
            repeat: 1,
            onComplete: () => {
                this.OnObjectClicked(false);
            }
        });
    }
    MovementIntervalInterval(_obj, _dir) {
        _obj.bool = false;
        let counter = 0;
        this.movementIntervalIntervalArr.push(_obj);
        if (!this.movementIntervalInterval) {
            this.movementTime = this.TimeForInterval(_obj);
            this.intervalTimer = this.time.addEvent({
                delay: LevelManager.hoppingTime,//this.TimeBetweenInterval, 
                callback: () => {
                    this.movementIntervalIntervalArr.forEach(element => {
                        switch (_dir) {
                            case "RTL":
                                if (element.x > 0) {
                                    element.x -= this.movementIntervalX;
                                } else {
                                    ++counter;
                                    if (counter < 3) {
                                        element.setPosition((game.config.width), element.y);
                                    }
                                    else {
                                        this.intervalTimer.paused = true;
                                        this.OnObjectClicked();
                                    }
                                }
                                break;
                            case "LTR":
                                if (element.x < (game.config.width)) {
                                    element.x += this.movementIntervalX;
                                }
                                else {
                                    ++counter;
                                    if (counter < 3) {
                                        element.setPosition(0, element.y);
                                    }
                                    else {
                                        this.intervalTimer.paused = true;
                                        this.OnObjectClicked();
                                    }
                                }
                                break;
                            case "TTB":
                                if ((element.y + this.movementIntervalY) < element.continousEndY) {
                                    element.y += this.movementIntervalY;
                                } else {
                                    ++counter;
                                    if (counter < 3) {
                                        element.setPosition(element.x, (element.continousStartY));
                                    }
                                    else {
                                        this.intervalTimer.paused = true;
                                        this.OnObjectClicked();
                                    }
                                }
                                break;
                            case "BTT":
                                if ((element.y + this.movementIntervalY) > element.continousEndY) {
                                    element.y += this.movementIntervalY;
                                } else {
                                    ++counter;
                                    if (counter < 3) {
                                        element.setPosition(element.x, (element.continousStartY));
                                    }
                                    else {
                                        this.intervalTimer.paused = true;
                                        this.OnObjectClicked();
                                    }
                                }
                                break;

                            case "BRDTL":
                                if ((element.x - this.movementIntervalX) > element.continousEndX) {
                                    if ((element.y - this.movementIntervalY) > element.continousEndY) {
                                        element.x -= this.movementIntervalX;
                                        element.y -= this.movementIntervalY;
                                    } else {
                                        ++counter;
                                        if (counter < 3) {
                                            element.setPosition(element.continousStartX, element.continousStartY);
                                        }
                                        else {
                                            this.intervalTimer.paused = true;
                                            this.OnObjectClicked();
                                        }
                                    }
                                } else {
                                    ++counter;
                                    if (counter < 3) {
                                        element.setPosition(element.continousStartX, element.continousStartY);
                                    }
                                    else {
                                        this.intervalTimer.paused = true;
                                        this.OnObjectClicked();
                                    }
                                }
                                break;
                            case "BLDTR":
                                if ((element.x + this.movementIntervalX) < element.continousEndX) {
                                    if ((element.y - this.movementIntervalY) > element.continousEndY) {
                                        element.x += this.movementIntervalX;
                                        element.y -= this.movementIntervalY;
                                    } else {
                                        ++counter;
                                        if (counter < 3) {
                                            element.setPosition(element.continousStartX, element.continousStartY);
                                        }
                                        else {
                                            this.intervalTimer.paused = true;
                                            this.OnObjectClicked();
                                        }
                                    }
                                } else {
                                    ++counter;
                                    if (counter < 3) {
                                        element.setPosition(element.continousStartX, element.continousStartY);
                                    }
                                    else {
                                        this.intervalTimer.paused = true;
                                        this.OnObjectClicked();
                                    }
                                }
                                break;
                            case "TLDBR":
                                if ((element.x + this.movementIntervalX) < element.continousEndX) {
                                    if ((element.y + this.movementIntervalY) < element.continousEndY) {
                                        element.x += this.movementIntervalX;
                                        element.y += this.movementIntervalY;
                                    } else {
                                        ++counter;
                                        if (counter < 3) {
                                            element.setPosition(element.continousStartX, element.continousStartY);
                                        }
                                        else {
                                            this.intervalTimer.paused = true;
                                            this.OnObjectClicked();
                                        }
                                    }
                                } else {
                                    ++counter;
                                    if (counter < 3) {
                                        element.setPosition(element.continousStartX, element.continousStartY);
                                    }
                                    else {
                                        this.intervalTimer.paused = true;
                                        this.OnObjectClicked();
                                    }
                                }
                                break;
                            case "TRDBL":
                                if ((element.x - this.movementIntervalX) > element.continousEndX) {
                                    if ((element.y + this.movementIntervalY) < element.continousEndY) {
                                        element.x -= this.movementIntervalX;
                                        element.y += this.movementIntervalY;
                                    } else {
                                        ++counter;
                                        if (counter < 3) {
                                            element.setPosition(element.continousStartX, element.continousStartY);
                                        }
                                        else {
                                            this.intervalTimer.paused = true;
                                            this.OnObjectClicked();
                                        }
                                    }
                                } else {
                                    ++counter;
                                    if (counter < 3) {
                                        element.setPosition(element.continousStartX, element.continousStartY);
                                    }
                                    else {
                                        this.intervalTimer.paused = true;
                                        this.OnObjectClicked();
                                    }
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
        let counter = 0;
        const waitForSecond = (ms) => new Promise(resolve => setTimeout(resolve, ms))
        this.movementIntervalIntervalArr.push(_obj);
        if (!this.movementIntervalInterval) {
            // this.movementTime = this.TimeForInterval(_obj);
            //console.log("this.movementTime " + LevelManager.hoppingTime);//this.movementTime);
            await waitForSecond(500);
            this.intervalTimer = this.time.addEvent({
                delay: LevelManager.hoppingTime,//this.TimeBetweenInterval,
                callback: () => {
                    this.movementIntervalIntervalArr.forEach(async element => {
                        switch (_dir) {
                            case "RTL":
                                if (element.x > 0) {
                                    element.x -= this.movementIntervalX;
                                } else {
                                    ++counter;
                                    if (counter < 3) {
                                        this.intervalTimer.paused = true;
                                        await waitForSecond(500);
                                        element.setPosition((game.config.width), element.y);
                                        this.intervalTimer.paused = false;
                                    }
                                    else {
                                        this.intervalTimer.paused = true;
                                        this.OnObjectClicked();
                                    }
                                }
                                break;
                            case "LTR":
                                if (element.x < (game.config.width)) {
                                    element.x += this.movementIntervalX;
                                }
                                else {
                                    ++counter;
                                    if (counter < 3) {
                                        this.intervalTimer.paused = true;
                                        await waitForSecond(500);
                                        element.setPosition(0, element.y);
                                        this.intervalTimer.paused = false;
                                    }
                                    else {
                                        this.intervalTimer.paused = true;
                                        this.OnObjectClicked();
                                    }
                                }
                                break;
                            case "TTB":
                                if ((element.y + this.movementIntervalY) < game.config.height) {
                                    //element.continousEndY) {
                                    element.y += this.movementIntervalY;
                                }
                                else {
                                    ++counter;
                                    if (counter < 3) {
                                        this.intervalTimer.paused = true;
                                        await waitForSecond(500);
                                        element.setPosition(element.x, (element.continousStartY));
                                        this.intervalTimer.paused = false;
                                    }
                                    else {
                                        this.intervalTimer.paused = true;
                                        this.OnObjectClicked();
                                    }
                                }
                                break;
                            case "BTT":
                                if ((element.y + this.movementIntervalY) > element.continousEndY) {
                                    element.y += this.movementIntervalY;
                                }
                                else {
                                    ++counter;
                                    if (counter < 3) {
                                        this.intervalTimer.paused = true;
                                        await waitForSecond(500);
                                        element.setPosition(element.x, (element.continousStartY));
                                        this.intervalTimer.paused = false;
                                    }
                                    else {
                                        this.intervalTimer.paused = true;
                                        this.OnObjectClicked();
                                    }
                                }
                                break;

                            case "BRDTL":
                                if ((element.x - this.movementIntervalX) > element.continousEndX) {
                                    if ((element.y - this.movementIntervalY) > element.continousEndY) {
                                        element.x -= this.movementIntervalX;
                                        element.y -= this.movementIntervalY;
                                    }
                                    else {
                                        ++counter;
                                        if (counter < 3) {
                                            this.intervalTimer.paused = true;
                                            await waitForSecond(500);
                                            element.setPosition(element.continousStartX, element.continousStartY);
                                            this.intervalTimer.paused = false;
                                        }
                                        else {
                                            this.intervalTimer.paused = true;
                                            this.OnObjectClicked();
                                        }
                                    }
                                } else {
                                    ++counter;
                                    if (counter < 3) {
                                        element.setPosition(element.continousStartX, element.continousStartY);
                                    }
                                    else {
                                        this.intervalTimer.paused = true;
                                        this.OnObjectClicked();
                                    }
                                }
                                break;
                            case "BLDTR":
                                if ((element.x + this.movementIntervalX) < element.continousEndX) {
                                    if ((element.y - this.movementIntervalY) > element.continousEndY) {
                                        element.x += this.movementIntervalX;
                                        element.y -= this.movementIntervalY;
                                    } else {
                                        ++counter;
                                        if (counter < 3) {
                                            this.intervalTimer.paused = true;
                                            await waitForSecond(500);
                                            element.setPosition(element.continousStartX, element.continousStartY);
                                            this.intervalTimer.paused = false;
                                        }
                                        else {
                                            this.intervalTimer.paused = true;
                                            this.OnObjectClicked();
                                        }
                                    }
                                } else {
                                    ++counter;
                                    if (counter < 3) {
                                        element.setPosition(element.continousStartX, element.continousStartY);
                                    }
                                    else {
                                        this.intervalTimer.paused = true;
                                        this.OnObjectClicked();
                                    }
                                }
                                break;
                            case "TLDBR":
                                if ((element.x + this.movementIntervalX) < element.continousEndX) {
                                    if ((element.y + this.movementIntervalY) < element.continousEndY) {
                                        element.x += this.movementIntervalX;
                                        element.y += this.movementIntervalY;
                                    } else {
                                        ++counter;
                                        if (counter < 3) {
                                            this.intervalTimer.paused = true;
                                            await waitForSecond(500);
                                            element.setPosition(element.continousStartX, element.continousStartY);
                                            this.intervalTimer.paused = false;
                                        }
                                        else {
                                            this.intervalTimer.paused = true;
                                            this.OnObjectClicked();
                                        }
                                    }
                                } else {
                                    ++counter;
                                    if (counter < 3) {
                                        element.setPosition(element.continousStartX, element.continousStartY);
                                    }
                                    else {
                                        this.intervalTimer.paused = true;
                                        this.OnObjectClicked();
                                    }
                                }
                                break;
                            case "TRDBL":
                                if ((element.x - this.movementIntervalX) > element.continousEndX) {
                                    if ((element.y + this.movementIntervalY) < element.continousEndY) {
                                        element.x -= this.movementIntervalX;
                                        element.y += this.movementIntervalY;
                                    } else {
                                        ++counter;
                                        if (counter < 3) {
                                            this.intervalTimer.paused = true;
                                            await waitForSecond(500);
                                            element.setPosition(element.continousStartX, element.continousStartY);
                                            this.intervalTimer.paused = false;
                                        }
                                        else {
                                            this.intervalTimer.paused = true;
                                            this.OnObjectClicked();
                                        }
                                    }
                                } else {
                                    ++counter;
                                    if (counter < 3) {
                                        element.setPosition(element.continousStartX, element.continousStartY);
                                    }
                                    else {
                                        this.intervalTimer.paused = true;
                                        this.OnObjectClicked();
                                    }
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

        let _accuracy = (this.totalNumberUserClicked === 0) ? 0 : parseInt((this.totalGamePlayed / this.totalNumberUserClicked) * 100);

        let _totalTime = 0;
        let _avarageTime = 0;
        for (let i = 0; i < this.totalEachLevelTime.length; i++) {
            _totalTime += this.totalEachLevelTime[i];

        }
        if (_totalTime > 0 && this.totalGamePlayed > 0) {
            _avarageTime = (_totalTime / this.totalGamePlayed);//(this.totalGamePlayed / _totalTime);
        }
        else {
            _avarageTime = 0;
            //console.log('avgTime : ' + _avarageTime);                         // added to prevent infinity in avaerage time 
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
        //console.log('starting level : ' + startingLevel + 'present level : ' + presentLevel);
        if (startingLevel >= 5) {
            if (presentLevel == startingLevel + 5) {
                //console.log('rate box enable');
                // show star system
                post_game.ratingBox = true;
            }
        }

        //first star calculation

        let firstStar = (_correctAnwer / this.totalQuestionPresented);
        //console.log('firstStar : ' + firstStar);
        //console.log('spectific success rate :  ' + Database.success_rate);
        if (firstStar >= Database.success_rate) {
            //console.log('get first star');
            // document.getElementsByClassName("img_gray").style.display="none";
            post_game.firstStar = true;
        } else {
            //console.log('you are about to get your first star');
        }

        //==========second star calculation=============
        //console.log('average answer time : ' + _avarageTime);
        if (parseFloat(_avarageTime).toFixed(2) <= parseFloat(Database.average_answer_time)) {
            post_game.secondStar = true;
        }

        //third star calculation
        let calculation = 2;
        //console.log('calculation : ' + calculation);
        let endLevel = _level;
        let startLevel = parseInt(Database.level); //LevelManager.GetInitialLevel();
        //console.log('start level : ' + startLevel + 'initial level : ' + endLevel);
        if ((endLevel - startLevel) >= calculation) {
            //third star visible;
            // document.getElementsByClassName("mt-3 img_gray").style.display="none";
            post_game.thirdStar = true;
        } else {
            // not visible
        }
        // score calculation
        // //console.log('last high score : ' + Database.lastHighestScore);
        if (Database.lastHighestScore == 0 || Database.lastHighestScore == "") {
            // show the _score as highest score on dom panel
            // //console.log('show the _score as highest score on dom panel');
            post_game.highScore = true;
        } else if (_score > Database.lastHighestScore) {
            // show the score scored by player on the dom panel
            // //console.log('show the score scored by player on the dom panel');
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
            "game_id": gameId,// current game id 
            "questions_presented": this.totalQuestionPresented,// total number of question presented
            "level": _level,  // <the level the player reached in this session at the end of the game>
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
        // Server.sendGameData(data, Server);

        // newly added for post game screen
        let _serverResponse = await Server.sendGameData(data, Server);


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
                    "&game_name=" + "WeightAMinute" +
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
                    "&game_name=" + "WeightAMinute", "_self");
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
    };
}