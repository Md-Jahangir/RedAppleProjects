import { Database } from "./Database.js";
import { LevelManager } from "./LevelManager.js";
import { Server } from "./Server.js";
import { LoadAssets } from "./LoadAssets.js";
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
        this.betweenX;
        this.timerDegre = -89;//1;
        this.graphics;
        this.timer;
        this.key;
        this.allLevelImage = [];
        this.carName = [];
        this.onePrefixCarImg = [];
        this.twoPrefixCarImg = [];
        this.allCarImage = [];
        this.counterForButtonAndSpaceBar = 0;
        this.totalCorrectAnswer = 0;
        this.totalInCorrectAnswer = 0;
        this.counter = 0;
        this.carDestroyBool = false;
        this.wallArray = [];
        this.borderLine;
        this.consecutiveWins = 0;
        this.consecutiveLoose = 0;
        this.comboWins = 0;
        this.totalGamePlayed = 0;
        this.eachLevelTime = 0;//Each level time to calculate response
        this.totalEachLevelTime = [];//Each level time to calculate response
        this.eachGameTime = 0;//Each game time to calculate response
        this.totalNumberUserClicked = 0;//total number of click to calculate response
        this.totalQuestionPresented = 0;// total number of question presented to calculate response
        this.totalCarImageNumberOnScreen;
        this.objectPositionOfPrefOne = [];
        this.objectPositionOfPrefTwo = [];
        this.answerImage = [];
        this.questionImage = [];
        this.numberOfAnswerImages;
        this.numberOfQuestionImages;
        this.eachLevelTimer;
        this.bombAnim;
        this.isCollided = false;
        this.consecutiveComboWins = 0;
        this.totalClickNeeded = 0;
    }
    preload() {
    }
    create() {
        if (Server.platform == "favorites") {
            window.parent.postMessage({ eventName: "gameStarted", payload: null }, "*");
        }
        this.input.on('pointerdown', (pointer) => { this.BulletGenerate(pointer) }, this);

        SoundManager.StartSoundPlay();//Game start sound 
        //====> Selecting Background <======//
        this.levelBackground = LevelManager.DecideLevelBackground();
        this.bg = this.add.image(game.config.width / 2, game.config.height / 2, 'background').setOrigin(0.5);
        this.bg.setInteractive();
        this.bg.on("pointerdown", (pointer, x, y, event) => this.OnBackgroundClick());



        let headerBar = this.add.image(game.config.width / 2, game.config.height / 23, 'one_pixel_white').setOrigin(0.5).setScale(scaleFactorX * 3000, scaleFactorY * 225);
        headerBar.setTint("0X04627b");
        headerBar.depth = 2;

        const style1 = { font: "bold 35px CCBellyLaugh", stroke: '#fff', strokeThickness: 6, fill: "#0c4826" };
        let headingText = this.add.text(game.config.width / 2, game.config.height / 12, "Shift Gears", style1).setOrigin(0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        headingText.depth = 2;
        const style = { font: "bold 30px CCBellyLaugh", fill: "#0c4826", stroke: '#fff', strokeThickness: 6 };

        let slash = this.add.text(game.config.width / 4.18, game.config.height / 4.7, "/", style).setOrigin(0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);

        this.thumbsUpText = this.add.text(game.config.width / 4.885, game.config.height / 4.954, this.totalCorrectAnswer, style).setOrigin(0.5).setScale(scaleFactorX * 3, scaleFactorY * 3);
        this.thumbsDownText = this.add.text(game.config.width / 3.794, game.config.height / 4.7, this.totalInCorrectAnswer, style).setOrigin(0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);
        this.thumbsUpText.depth = 2;
        this.thumbsDownText.depth = 2;

        this.timerImg = this.add.image(game.config.width / 4.6, game.config.height / 13, "ticker").setOrigin(0.5, 0.5).setScale(scaleFactorX * 0.6, scaleFactorY * 0.6);
        this.timerImg.depth = 3;

        this.timer = this.time.addEvent({ delay: 1000, callback: this.UpdateTimer, callbackScope: this, loop: true });
        this.timer.paused = true;
        this.eachLevelTimer = this.time.addEvent({ delay: 100, callback: this.UpdateEachLevelTimer, callbackScope: this, loop: true });
        this.eachLevelTimer.paused = true;

        this.totalTimeToPlay = LevelManager.maxTimeForGame;

        this.bombAnim = this.add.sprite(game.config.width / 2, game.config.height / 2, 'bomb').setOrigin(0.5);
        this.bombAnim.setVisible(false);
        this.bombAnim.setDepth(2);
        // creatimg animation bomb
        this.anims.create({
            key: 'blow',
            frames: this.anims.generateFrameNumbers('bomb', { start: 1, end: 6 }),
            frameRate: 30,
            // repeat    : -1
        });

        this.graphics = this.add.graphics();
        this.graphics.lineStyle(Math.floor(game.config.width / 45), 0xFF5700, 0.8);
        this.graphics.beginPath();
        this.graphics.arc(game.config.width / 3.7, game.config.height / 7.1, Math.floor(game.config.width / 100), Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(this.timerDegre), true).setScale(scaleFactorX * 0.7, scaleFactorY * 0.7);
        this.graphics.strokePath();
        this.graphics.depth = 3;
        this.graphics.visible = true;
        this.totalTimeToPlay = LevelManager.maxTimeForGame;

        this.gear = this.add.sprite(game.config.width / 1.325, game.config.height / 1.092, 'gear').setScale(scaleFactorX * 1.3, scaleFactorY * 1.3).setInteractive();
        this.gear.on('pointerup', this.SelectForwardOrBackward, this);

        let spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        spaceBar.on('down', this.SelectForwardOrBackward, this);

        this.borderLine = this.add.sprite(game.config.width / 2, game.config.height / 1.75, 'borderLine').setOrigin(0.5, 0.5).setScale(scaleFactorX * 2, scaleFactorY * 2);

        //===> Game time <=====//
        this.GameTimer();
        //======> createing initial level <====//
        this.CreateLevel();
        this.physics.world.on("worldbounds", (body) => {
            this.counter += 1;
            body.gameObject.setVisible(false);
            body.setCollideWorldBounds(false);
            body.onWorldBounds = false;
            body.enable = false;
            body.gameObject.destroy();
            console.log("this.counter" + this.counter);
            console.log("this.totalCarImageNumberOnScreen" + this.totalCarImageNumberOnScreen);
            if (this.counter == this.totalCarImageNumberOnScreen) {
                this.onObjectClicked();
            }
        });
        this.timer.paused = false;
        this.BannerCreateAndHide("GAME_START", true);
        // this.PositionOfTheCarImage();
    };

    PositionOfTheCarImage() {
        let a = this.add.image(Math.floor(game.config.width / 2.7), Math.floor(game.config.height / 3.3), 'one_1');
        // a.displayWidth = 500;
        // console.log('a======================',a)
        // a.setSize(1000,1000);
        let b = this.physics.add.image(Math.floor(game.config.width / 6.295), Math.floor(game.config.height / 2.73), 'one_1');
        let c = this.physics.add.image(Math.floor(game.config.width / 6.295), Math.floor(game.config.height / 1.656), 'one_1');
        let d = this.physics.add.image(Math.floor(game.config.width / 1.694), Math.floor(game.config.height / 1.1513), 'one_1');
        let e = this.physics.add.image(Math.floor(game.config.width / 1.176), Math.floor(game.config.height / 1.92), 'one_1');
        let f = this.physics.add.image(Math.floor(game.config.width / 6.442), Math.floor(game.config.height / 1.2), 'one_1');
        let g = this.physics.add.image(Math.floor(game.config.width / 1.750), Math.floor(game.config.height / 3.6), 'one_1');
        let h = this.physics.add.image(Math.floor(game.config.width / 2.633), Math.floor(game.config.height / 1.351), 'one_1');

        let i = this.physics.add.image(Math.floor(game.config.width / 4.1), Math.floor(game.config.height / 2), 'one_1');
        let j = this.physics.add.image(Math.floor(game.config.width / 1.177), Math.floor(game.config.height / 3.292), 'one_1');
        let k = this.physics.add.image(Math.floor(game.config.width / 1.971), Math.floor(game.config.height / 1.14), 'one_1');
        let l = this.physics.add.image(Math.floor(game.config.width / 1.176), Math.floor(game.config.height / 1.35), 'one_1');
        let m = this.physics.add.image(Math.floor(game.config.width / 2.3), Math.floor(game.config.height / 2), 'one_1');
        let n = this.physics.add.image(Math.floor(game.config.width / 1.71), Math.floor(game.config.height / 1.53), 'one_1');
        let o = this.physics.add.image(Math.floor(game.config.width / 1.376), Math.floor(game.config.height / 1.785), 'one_1');

        let a1 = this.physics.add.image(Math.floor(game.config.width / 3.8), Math.floor(game.config.height / 3.3), 'two_14');
        a1.angle = -90;
        a1.body.setSize(200, 77, 77, 200);
        let b1 = this.physics.add.image(Math.floor(game.config.width / 1.33), Math.floor(game.config.height / 4.5), 'two_14');
        b1.angle = -90;
        b1.body.setSize(200, 77, 77, 200);
        let c1 = this.physics.add.image(Math.floor(game.config.width / 1.9), Math.floor(game.config.height / 2), 'two_14');
        c1.angle = -90;
        c1.body.setSize(200, 77, 77, 200);
        let d1 = this.physics.add.image(Math.floor(game.config.width / 3), Math.floor(game.config.height / 2), 'two_14');
        d1.angle = -90;
        d1.body.setSize(200, 77, 77, 200);
        let e1 = this.physics.add.image(Math.floor(game.config.width / 3.8), Math.floor(game.config.height / 1.5), 'two_14');
        e1.angle = -90;
        e1.body.setSize(200, 77, 77, 200);
        let f1 = this.physics.add.image(Math.floor(game.config.width / 1.37), Math.floor(game.config.height / 2.35), 'two_14');
        f1.angle = -90;
        f1.body.setSize(200, 77, 77, 200);
        let g1 = this.physics.add.image(Math.floor(game.config.width / 1.37), Math.floor(game.config.height / 1.25), 'one_1');
        g1.angle = -90;
        g1.body.setSize(200, 77, 77, 200);



        let h1 = this.physics.add.image(Math.floor(game.config.width / 2.651), Math.floor(game.config.height / 1.09), 'two_14');
        h1.angle = -90;
        h1.body.setSize(200, 77, 77, 200);
        let i1 = this.physics.add.image(Math.floor(game.config.width / 3.8), Math.floor(game.config.height / 1.3), 'two_14');
        i1.angle = -90;
        i1.body.setSize(200, 77, 77, 200);
        let j1 = this.physics.add.image(Math.floor(game.config.width / 2.021), Math.floor(game.config.height / 1.360), 'two_14');
        j1.angle = -90;
        j1.body.setSize(200, 77, 77, 200);
        let k1 = this.physics.add.image(Math.floor(game.config.width / 3.934), Math.floor(game.config.height / 1.133), 'two_14');
        k1.angle = -90;
        k1.body.setSize(200, 77, 77, 200);
        let l1 = this.physics.add.image(Math.floor(game.config.width / 1.386), Math.floor(game.config.height / 1.4304), 'two_14');
        l1.angle = -90;
        l1.body.setSize(200, 77, 77, 200);
        let m1 = this.physics.add.image(Math.floor(game.config.width / 2.109), Math.floor(game.config.height / 4.576), 'two_14');
        m1.angle = -90;
        m1.body.setSize(200, 77, 77, 200);
        let n1 = this.physics.add.image(Math.floor(game.config.width / 1.381), Math.floor(game.config.height / 2.958), 'two_14');
        n1.angle = -90;
        n1.body.setSize(200, 77, 77, 200);
        let o1 = this.physics.add.image(Math.floor(game.config.width / 1.573), Math.floor(game.config.height / 2.312), 'one_1');
    }

    BulletGenerate(pointer) {
        console.log('position of X : ', pointer.downX);
        console.log('position of Y : ', pointer.downY);
    }
    OnCollideAnimationPlay(_x, _y) {
        console.log("Animation play==========================");
        this.bombAnim.x = _x;
        this.bombAnim.y = _y;
        this.bombAnim.setVisible(true);
        this.bombAnim.anims.play('blow');
        this.bombAnim.on('animationcomplete', () => {
            console.log("Animation complete");
            this.bombAnim.setVisible(false);
        });
    }
    OnBackgroundClick() {
        this.totalNumberUserClicked += 1;
    };
    CreateLevel() {
        console.log('CreateLevel----------------------');
        this.eachLevelTimer.paused = false;
        this.currentLevel = LevelManager.GetCurrentLevelNumber();
        // console.log('currentLevel',this.currentLevel);
        if (!this.isTimerAvailable) {
            this.timerValueText = this.timeForEachLevel;
        }

        //=====> Images will be used in game <=====//
        this.ImageForCurrentLevel();
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
        // console.log("allLevelImage-----------",this.eachLevelTime);
    };


    ImageForCurrentLevel() {
        this.allLevelImage = Database.main_image_location;
        console.log('answerImageNumber : ', this.allLevelImage);

        for (let i = 0; i < this.allLevelImage.length; i++)               //those 7 question images for level 1
        {
            this.allLevelImage[i] = LoadAssets.getImageName(this.allLevelImage[i]);
            // console.log('this.allLevelImage : ',this.allLevelImage);
        }
    };
    DisplayLevel(_this) {
        this.carWithPrefixOne;
        this.carWithPrefixTwo;
        let carObj;
        this.objectPositionOfPrefOne = LevelManager.CarPositionOfPrefOneImages();
        this.objectPositionOfPrefTwo = LevelManager.CarImagePositionOfPreftwoImages();
        this.totalCarImageNumberOnScreen = LevelManager.answerImageNumber;
        this.totalQuestionPresented += 1;
        for (let i = 0; i < LevelManager.answerImageNumber; i++) {
            let car = this.allLevelImage[Math.floor(Math.random() * this.allLevelImage.length)];
            this.carName.push(car);
        }
        this.carName.forEach(element => {
            if (element.includes("one_")) {
                this.onePrefixCarImg.push(element);
            }
            else if (element.includes("two_")) {
                this.twoPrefixCarImg.push(element);
            }
        });


        if (this.onePrefixCarImg.length > 0) {
            for (let i = 0; i < this.onePrefixCarImg.length; i++) {
                let carWithPrefixOne = this.physics.add.sprite(this.objectPositionOfPrefOne[i][0], this.objectPositionOfPrefOne[i][1], this.onePrefixCarImg[i]).setOrigin(0.5).setScale(scaleFactorX * 0.7, scaleFactorY * 0.7).setInteractive();
                carWithPrefixOne.displayWidth = this.objectPositionOfPrefOne[i][2];
                carWithPrefixOne.displayHeight = this.objectPositionOfPrefOne[i][3];
                carWithPrefixOne.body.setCollideWorldBounds(true);
                carWithPrefixOne.body.onWorldBounds = true;
                carWithPrefixOne.setImmovable(true);
                carWithPrefixOne.key = this.allCarImage.length;
                carWithPrefixOne.body.setSize(this.objectPositionOfPrefOne[i][2], this.objectPositionOfPrefOne[i][3]);
                carWithPrefixOne.objectName = "car";
                carWithPrefixOne.on("pointerup", (pointer, x, y, event) => this.MoveObject(carWithPrefixOne));
                this.allCarImage.push(carWithPrefixOne);

            }
        }
        if (this.twoPrefixCarImg.length > 0) {
            for (let j = 0; j < this.twoPrefixCarImg.length; j++) {
                let carWithPrefixTwo = this.physics.add.sprite(this.objectPositionOfPrefTwo[j][0], this.objectPositionOfPrefTwo[j][1], this.twoPrefixCarImg[j]).setOrigin(0.5).setInteractive().setScale(scaleFactorX * 0.7, scaleFactorY * 0.7);
                carWithPrefixTwo.setAngle(90);
                carWithPrefixTwo.displayWidth = this.objectPositionOfPrefTwo[j][2];
                carWithPrefixTwo.displayHeight = this.objectPositionOfPrefTwo[j][3];
                carWithPrefixTwo.body.setCollideWorldBounds(true);
                carWithPrefixTwo.body.onWorldBounds = true;
                // carWithPrefixTwo.body.setSize(200,77,77,200);
                carWithPrefixTwo.body.setSize(this.objectPositionOfPrefTwo[j][3], this.objectPositionOfPrefTwo[j][2]);
                carWithPrefixTwo.setImmovable(true);
                carWithPrefixTwo.key = this.allCarImage.length;
                carWithPrefixTwo.objectName = "car";
                carWithPrefixTwo.on("pointerup", (pointer, x, y, event) => this.MoveObject(carWithPrefixTwo));
                this.allCarImage.push(carWithPrefixTwo);
            }
        }


        //---------------------------------------------------------------------------
        for (let i = 0; i < this.allCarImage.length; i++) {
            for (let j = (i + 1); j < this.allCarImage.length; j++) {
                this.physics.add.collider(this.allCarImage[i], this.allCarImage[j], this.CollideBetweenCars, null, this);
            }
        }
        this.totalClickNeeded += this.allCarImage.length;

    };

    CollideBetweenCars(objecA, objectB) {
        this.OnCollideAnimationPlay(objectB.x, objectB.y);
        if (!this.isCollided) {
            this.isCollided = true;
            if (objectB.texture.key.includes("one_")) {
                objectB.setVelocityY(0);
                SoundManager.InCorrectAnswerSoundPlay();
                this.totalGamePlayed += 1;
                this.totalInCorrectAnswer += 1;
                this.consecutiveWins = 0;
                this.consecutiveLoose += 1;
                this.consecutiveComboWins = 0;
                this.LevelLoose(this.totalInCorrectAnswer);
                this.ChangeLevel(true);
            }
            else if (objectB.texture.key.includes("two_")) {
                objectB.setVelocityX(0);
                SoundManager.InCorrectAnswerSoundPlay();
                this.totalGamePlayed += 1;
                this.totalInCorrectAnswer += 1;
                this.consecutiveWins = 0;
                this.consecutiveLoose += 1;
                this.consecutiveComboWins = 0;
                this.LevelLoose(this.totalInCorrectAnswer);
                this.ChangeLevel(true);
            }
        }
    }
    SelectForwardOrBackward() {
        // this.counterForButtonAndSpaceBar++;
        if (this.counterForButtonAndSpaceBar == 0) {
            this.gear.setFrame(1);
            this.counterForButtonAndSpaceBar = 1;
            console.log('Gear is designated to R front');
        }
        else {
            this.gear.setFrame(0);
            this.counterForButtonAndSpaceBar = 0;
            console.log('Gear is designated to D back');
        }
    }

    OnCollideCallBack(sprite1, sprite2) {
        // sprite1.destroy();
    }
    MoveObject(_this) {
        this.key = _this.key;

        if (this.allCarImage[this.key].texture.key.includes("one_")) {
            // console.log('this is one',this.allCarImage[this.key]);
            if (this.counterForButtonAndSpaceBar == 0) {
                this.allCarImage[this.key].setVelocityY(-300);
            }
            else {
                this.allCarImage[this.key].setVelocityY(300);
            }
        }
        else if (this.allCarImage[this.key].texture.key.includes("two_")) {
            if (this.counterForButtonAndSpaceBar == 0) {
                this.allCarImage[this.key].setVelocityX(300);
            }
            else {
                this.allCarImage[this.key].setVelocityX(-300);
            }
        }
    }
    onObjectClicked() {
        console.log('screen is clear');
        this.totalGamePlayed += 1;
        this.totalCorrectAnswer += 1;
        this.consecutiveWins += 1;
        this.consecutiveLoose = 0;
        this.consecutiveComboWins += 1;
        if (this.consecutiveComboWins > this.comboWins) {
            this.comboWins = this.consecutiveComboWins;
        }
        if ((this.consecutiveWins != LevelManager.offsetForLevelUp) && (this.totalGamePlayed != this.totalNumberOfLevel)) {
            console.log('excellent');
            this.BannerCreateAndHide("EXCELLENT", true);
        }
        this.LevelWin(this.totalCorrectAnswer);
        this.ChangeLevel(true);

    }
    //=========>Level Complete<=================//
    ChangeLevel(_bool) {
        let levelOrTimeComplete = true;
        if (this.isTimerAvailable) {
            if (this.timer.paused) {
                console.log("Times Up====");
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
                SoundManager.EndSoundPlay();
                this.BannerCreateAndHide("GAME_OVER", false);
                this.CalculateResponse();
                this.graphics.clear();
                this.graphics.visible = false;
                // this.tickerRed.visible = false;
                // this.tickerGreen.visible = false;
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
                this.timerDegre = -89;
                this.graphics.clear();
                this.graphics.visible = true;
                this.graphics.lineStyle(Math.floor(game.config.width / 45), 0xFF5700, 0.8);
                this.graphics.beginPath();
                this.graphics.arc(game.config.width / 3.7, game.config.height / 7.1, Math.floor(game.config.width / 100), Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(this.timerDegre), true).setScale(scaleFactorX * 0.7, scaleFactorY * 0.7);
                this.graphics.strokePath();
                // this.tickerRed.visible = false;
                // this.tickerGreen.visible = true;
                this.timer.paused = false;
            }
        }
        if (levelOrTimeComplete) {
            this.ClearLevel();
            if (this.consecutiveWins == LevelManager.offsetForLevelUp) {
                console.log("level up----------------------------");
                this.consecutiveWins = 0;
                this.BannerCreateAndHide("LEVEL_UP", true);
                SoundManager.LevelUpSoundPlay();
                LevelManager.IncreaseLevel(LevelManager);
            } else if (this.consecutiveLoose == LevelManager.offsetForLevelDown) {
                console.log("level Down----------------------------" + this.consecutiveWins);
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
        console.log('Clear level----------------------');
        this.eachLevelTimer.paused = true;
        this.totalEachLevelTime.push(this.eachLevelTime);
        this.carName = [];
        this.onePrefixCarImg = [];
        this.twoPrefixCarImg = [];
        this.allLevelImage = [];
        this.objectPositionOfPrefOne = [];
        this.objectPositionOfPrefTwo = [];
        this.counter = 0;
        // this.borderLine.setVisible(false);

        this.allCarImage = []
        this.eachLevelTime = 0;
        this.isCollided = false;
        let arrLength = this.scene.scene.children.list.length;
        // console.log('arrlength : ',arrLength);
        for (let i = 0; i < arrLength; i++) {
            // console.log("name:",this.scene.scene.children.list[i].objectName.key);
            if (this.scene.scene.children.list[i].objectName == "car") {
                // console.log('option data ',this.scene.scene.children.list[i]);
                this.scene.scene.children.list[i].body.setCollideWorldBounds(false);
                this.scene.scene.children.list[i].body.onWorldBounds = false;
                this.scene.scene.children.list[i].body.enable = false;
                this.scene.scene.children.list[i].destroy();
                arrLength = this.scene.scene.children.list.length;
                i = 0;
            }
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
            this.timerDegre += (360 / this.totalTimeForGame);
            offSet = (270 - (360 / this.totalTimeForGame));
        }
        else {
            this.timerDegre += (360 / this.timeForEachLevel);
            offSet = (270 - (360 / this.timeForEachLevel));
        }
        if (this.timerDegre < 269) {
            if (this.timerDegre > 180) {
                this.graphics.lineStyle(Math.floor(game.config.width / 45), 0xFF5700, 0.8);;
                this.graphics.beginPath();
                this.graphics.arc(game.config.width / 3.7, game.config.height / 7.1, Math.floor(game.config.width / 100), Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(this.timerDegre), true).setScale(scaleFactorX * 0.7, scaleFactorY * 0.7);
                this.graphics.strokePath();
            }
            else {
                this.graphics.lineStyle(Math.floor(game.config.width / 45), 0xFF5700, 0.8);
                this.graphics.beginPath();
                this.graphics.arc(game.config.width / 3.7, game.config.height / 7.1, Math.floor(game.config.width / 100), Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(this.timerDegre), true).setScale(scaleFactorX * 0.7, scaleFactorY * 0.7);
                this.graphics.strokePath();
            }
        }
        else {
            this.graphics.clear();
            this.graphics.visible = false;
            this.timer.paused = true;
            SoundManager.InCorrectAnswerSoundPlay();  //playing unanswered as incorrect
            this.ChangeLevel(false);
        }
        // this.totalTimeToPlay--
        // this.timerText.setText(this.totalTimeToPlay);
        if (this.totalTimeToPlay == 0) {
            this.timerText.destroy();
        }
    };
    SetMovementType(directionType, movementType) {
        console.log('directionType', directionType);
        console.log('movementType', movementType);
    }

    //===========>Data to be sent to server<==============//
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
        } else {
            _avarageTime = 0;
            console.log('_averageTime    :    ' + _avarageTime)
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
            } else {
                post_game.ratingBox = false;
            }
        }
        else {
            post_game.ratingBox = false;
        }

        //================first star calculation=================

        let firstStar = (_correctAnwer / this.totalQuestionPresented);
        if (firstStar >= Database.success_rate) {
            post_game.firstStar = true;
        } else {
            post_game.firstStar = false;
        }

        //=========second star calculation============
        console.log('average answer time : ' + _avarageTime);
        if (parseFloat(_avarageTime).toFixed(2) <= parseFloat(Database.average_answer_time)) {
            post_game.secondStar = true;
        }
        else {
            post_game.secondStar = false;
        }

        //=============third star calculation================
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
        // score calculation
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
            "datetime": _deviceDateTime.toString(), //device time
            "combo": _combo, // the highest correct answers combo
            "score": _score // (user’s level)*(correct answers)*(99)
        }
        console.log("data to send ", data);
        let _responseData = await Server.sendGameData(data, Server);
        console.log("_responseData", _responseData);

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
            //     "&game_name=" + "ShiftGears", "_self");
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
                    "&game_name=" + "ShiftGears" +
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
                    "&game_name=" + "ShiftGears", "_self");
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