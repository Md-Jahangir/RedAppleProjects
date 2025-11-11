/*@Original_Creator : - Supriyo_Mukherjee.
@Created_Date : - 26 - 11 - 2022.
@Last_Update_By : - Supriyo_Mukherjee.
@Last_Updatd_Date : - 27 - 12 - 2022
@Description : - Handles flow of the game.All the scripts are manipulted from here*/

//importing popUp.js
//importing SoundManeger.js


import PopUp from "./PopUp.js";
import SoundManager from "./SoundManager.js";
export default class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene")
        this.numberOfBg = 3;
        this.missileNumber = 2;
        this.numberOfObstacle = 1;
        this.riverBg = [];
        this.speed = 10;
        this.coinSpeed = 20;
        this.missileSpeed = 20;
        this.boat;
        this.upperBar;
        this.missileArray = [];
        this.cursor;
        this.bombAnim;
        this.container;
        this.numberOfPatternArray = [];
        this.logWoodPatternArray = [];
        this.coinGroupArray = [];
        this.logWoodArray = [];
        this.poolArray = [];
        this.demoBoatArray = [];
        this.demoBoatPos = [];
        this.missilePatternArray = [];
        this.zebraCross;
        this.coinCollectCount = 0;
        this.coinText;
        this.distance = 0;
        this.timeInSec = 0;
        this.timer;
        this.interval = 0;
        this.bestScore = 0;
        // this.distanceForSingleGame = 0;
        this.logArray = [];
        // this.interpolatedPoint;
    }
    //here i've created object og popUp class  and sound maneger class
    init() {
        this.popUp = new PopUp(this);
        this.soundManager = new SoundManager(this);
    }
    //here i've created multiple game objects and and timers and invoked keyboard access methods 
    create() {

        let x;
        // x = x + 1;
        console.log('=====================', x);
        // this.SoundManager.BackgroundSoundPlay();
        // this.backgroundSound.play(); 
        this.soundManager.AddSoundsForGame();
        this.soundManager.backgroundSound.play();
        this.CrteationOfRiverFrame();
        this.zebraCross = this.add.image(960, -400, 'zebraCross').setOrigin(0.5, 0.5).setScale(4.3, 4);
        // this.zebraCross.setVelocityY(400);
        this.tweens.add({
            targets: this.zebraCross,
            x: 960,
            y: 1200,
            duration: 3000,
            ease: 'linear',
        })
        this.boat = this.physics.add.image(game.config.width / 2, game.config.height / 1.2, 'boat').setAngle(90).setDepth(1).setScale(0.3);
        this.upperBar = this.physics.add.image(game.config.width / 2, game.config.height / 27, 'white').setOrigin(0.5).setScale(725, 10).setAlpha(0);
        this.upperBar.setImmovable(true);
        this.boat.body.setSize(280, 750, 750, 280);

        const style = { font: "bold 50px Arial", fill: "#fff" };
        this.coinText = this.add.text(30, 30, "Coin : " + 0, style).setDepth(5);
        this.distance = this.add.text(30, 90, "Distance : " + 0, style).setDepth(5);
        this.Best = this.add.text(1650, 30, "Best : " + this.bestScore, style).setDepth(5);
        this.cursors = this.input.keyboard.createCursorKeys();

        let spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        spaceBar.on('down', this.OnSpaceKeyPressed, this);
        //zebra cross

        this.timer = this.time.addEvent({ delay: 1000, callback: this.TimeConsume, callbackScope: this, loop: true });
        this.timer.paused = false;
        this.bombAnim = this.add.sprite(game.config.width / 2, game.config.height / 2, 'bomb').setOrigin(0.5);
        this.bombAnim.setVisible(false);
        this.anims.create({
            key: 'blow',
            frames: this.anims.generateFrameNumbers('bomb', { start: 1, end: 6 }),
            frameRate: 15
        });


        this.input.on('pointerdown', (pointer) => { this.OnScreenPoint(pointer) }, this);

        this.CoinPositions();
        // this.PositionOfDemoCoinForTween();
        this.LogWoodPosition();
        this.MissilePosition();
        this.DemoBoatObstaclePosition()
        this.CreateCoin();
        this.CreationOfMissile();
        // this.CreateObstacle();
        this.CreatngPool();
        this.CreateLogWood();
        this.CreateDemoBoat();
    }
    //using this method i can can any position on the canvas after click
    OnScreenPoint(pointer) {
        console.log('position of X : ', pointer.downX);
        console.log('position of Y : ', pointer.downY);
    }
    //added multiple sounds used in the game
    SoundManager() {
        this.backgroundSound = game.sound.add('bg_music');
        this.coinCollectSound = game.sound.add('coin_collect');
        this.gameOverSound = game.sound.add('game_over');
    }
    /*
    handles coin animation on collide with boat 
    params{integer} - _x -> x position of the colliding area
    params{integer} - _y -> y position of the colliding area
    {public}
    */
    TweenCoins(_x, _y) {
        let demoCoin = this.add.image(_x, _y, 'coin').setOrigin(0.5).setScale(2);
        this.tweens.add({
            targets: demoCoin,
            x: 113,
            y: 56,
            ease: 'linear',
            duration: 500,
            onComplete: function () {
                demoCoin.destroy();
            },
        })
    }
    //here I've taken multiple coin positions and pushed them into an array named numberOfPatternArray
    CoinPositions() {
        this.patternOne = [
            { x: 960, y: 150 },
            { x: 960, y: 190 },
            { x: 960, y: 230 },
            { x: 960, y: 270 },
            { x: 1000, y: 190 },
            { x: 1000, y: 230 },
            { x: 1000, y: 270 },
            { x: 1000, y: 310 }
        ];
        this.patternTwo = [
            { x: 670, y: 900 },
            { x: 710, y: 900 },
            { x: 750, y: 900 },
            { x: 790, y: 900 },
            { x: 830, y: 900 },
            { x: 870, y: 900 },
            { x: 910, y: 900 },
            { x: 950, y: 900 }
        ];
        this.patternThree = [
            { x: 950, y: 1300 },
            { x: 990, y: 1300 },
            { x: 1030, y: 1300 },
            { x: 1070, y: 1300 },
            { x: 1110, y: 1300 },
            { x: 1150, y: 1300 },
            { x: 1190, y: 1300 },
            { x: 1230, y: 1300 }
        ];
        this.patternFour = [
            { x: 960, y: 50 },
            { x: 960, y: 90 },
            { x: 960, y: 130 },
            { x: 960, y: 170 },
            { x: 960, y: 210 },
            { x: 960, y: 250 },
            { x: 960, y: 290 },
            { x: 960, y: 330 }
        ];
        this.patternFive = [
            { x: 760, y: 500 },
            { x: 800, y: 500 },
            { x: 840, y: 500 },
            { x: 880, y: 500 },
            { x: 760, y: 540 },
            { x: 800, y: 540 },
            { x: 840, y: 540 },
            { x: 880, y: 540 },
        ]

        this.numberOfPatternArray = [
            this.patternOne, this.patternTwo, this.patternThree, this.patternFour, this.patternFive
        ];
    }
    /*created coins on the canvas's different position and added them into respective groups and 
    then into an array and positioned them*/
    CreateCoin() {
        this.numberOfPatternArray.map((elem) => {
            let coinGroup = this.add.container(0, 0);
            elem.map((elem1) => {
                let coin = this.physics.add.sprite(elem1.x, elem1.y, "coin");
                coin.key = "coins";
                coinGroup.add(coin);
                coinGroup.setSize(400, 250);
                this.physics.add.collider(this.boat, coin, this.OnCollideCoinCollect, null, this);
            });
            this.coinGroupArray.push(coinGroup);
        });
        this.coinGroupArray[0].setPosition(0, -4500);
        this.coinGroupArray[1].setPosition(0, -7900);
        this.coinGroupArray[2].setPosition(0, -12000);
    }
    /*here i have moved the coins on y negetive  with a certain speed*/
    MoveCoins() {
        for (let i = 0; i < this.coinGroupArray.length; i++) {
            if (this.coinGroupArray[i].y >= game.config.height) {
                let maps = this.coinGroupArray.map(a => a.y);
                let maxValue = Math.max(...maps);
                let randomY = this.GenerateRandom(4200, 5000);
                for (let j = 0; j < 8; j++) {
                    this.coinGroupArray[i].list[j].visible = true;
                    this.coinGroupArray[i].list[j].body.enable = true;
                }
                this.coinGroupArray[i].x = 0;
                this.coinGroupArray[i].y -= (maxValue + this.coinGroupArray[i].height + randomY);
            }
            this.coinGroupArray[i].y += this.coinSpeed + 5;
        }
    }

    //log wood position
    LogWoodPosition() {
        let firstPattern = [
            { x: 711, y: 296 },
            { x: 1200, y: 296 },
        ];
        let seconndPattern = [
            { x: 711, y: 840 },
            { x: 1200, y: 840 },
        ];
        this.logWoodPatternArray = [firstPattern, seconndPattern];
    }
    // here i have created the logs as obstacle 
    CreateLogWood() {
        this.logWoodPatternArray.map((elem) => {
            let logWoodGroup = this.add.container(0, 0);
            elem.map((elem1) => {
                let logWood = this.physics.add.sprite(elem1.x, elem1.y, "log");
                logWood.key = 'wood';
                logWoodGroup.add(logWood);
                logWoodGroup.setSize(400, 250);
                this.physics.add.collider(this.boat, logWood, this.OnCollideWithTheLog, null, this);
            })
            this.logWoodArray.push(logWoodGroup);
        });
        this.logWoodArray[0].setPosition(0, -3500);
        this.logWoodArray[1].setPosition(0, -9000);
        console.log('log wood array : ', this.logWoodArray);
    }
    /*here i have moved the LogWood on y negetive  with a certain speed*/
    MoveLogWood() {
        for (let i = 0; i < this.logWoodArray.length; i++) {
            if (this.logWoodArray[i].y >= game.config.height) {
                let maps = this.logWoodArray.map(a => a.y);
                let maxValue = Math.max(...maps);
                console.log('maxValue : ', maxValue);
                let randomY = this.GenerateRandom(4200, 5000);
                for (let j = 0; j < this.logWoodArray.length; j++) {
                    this.logWoodArray[i].list[j].visible = true;
                    this.logWoodArray[i].list[j].body.enable = true;
                }
                this.logWoodArray[i].x = 0;
                this.logWoodArray[i].y -= (maxValue + this.logWoodArray[i].height + randomY);
            }
            this.logWoodArray[i].y += this.speed + 5;
        }
    }

    //taking position of the demo boats on the river 
    DemoBoatObstaclePosition() {
        let patternOne = [
            { x: 715, y: 300 },
            { x: 1214, y: 300 }
        ];
        let patternTwo = [
            { x: 960, y: 60 },
            { x: 960, y: 560 }
        ];
        this.demoBoatPos = [patternOne, patternTwo];
        console.log('this.demoBoatPos : ', this.demoBoatPos)
    }
    // here i have created some demo boat to obstacle the real one
    CreateDemoBoat() {
        this.demoBoatPos.map((elem) => {
            let demoBoatGroup = this.add.container(0, 0);
            elem.map((elem1) => {
                let demoBoat = this.physics.add.sprite(elem1.x, elem1.y, "boat").setAngle(90).setScale(0.3);
                demoBoat.key = 'demoBoat';
                demoBoatGroup.add(demoBoat);
                demoBoatGroup.setSize(280, 750, 750, 280);
                this.physics.add.collider(this.boat, demoBoat, this.OnCollideWithTheDemoBoat, null, this);
            })
            this.demoBoatArray.push(demoBoatGroup);
        });
        this.demoBoatArray[0].setPosition(0, -25000);
        this.demoBoatArray[1].setPosition(0, -17000);
        console.log('log wood array : ', this.demoBoatArray);
    }
    //here i have moved the demo boats on y = 0 direction
    MoveDemoBoat() {
        for (let i = 0; i < this.demoBoatArray.length; i++) {
            if (this.demoBoatArray[i].y >= game.config.height) {
                let maps = this.demoBoatArray.map(a => a.y);
                let maxValue = Math.max(...maps);
                console.log('maxValue : ', maxValue);
                let randomY = this.GenerateRandom(4200, 5000);
                for (let j = 0; j < this.demoBoatArray.length; j++) {
                    this.demoBoatArray[i].list[j].visible = true;
                    this.demoBoatArray[i].list[j].body.enable = true;
                }
                this.demoBoatArray[i].x = 0;
                this.demoBoatArray[i].y -= (maxValue + this.demoBoatArray[i].height + randomY);
            }
            this.demoBoatArray[i].y += this.speed;
        }
    }

    // here i have created the river background 
    CrteationOfRiverFrame() {
        for (let i = 0; i < this.numberOfBg; i++) {
            let bg = this.add.sprite(0, 0, 'bg').setOrigin(0.5, 0);
            this.riverBg.push(bg);
            bg.setPosition(game.config.width / 2, Math.round(i * (-game.config.height)));
        }
        console.log('riverBg : ', this.riverBg);
    }
    // here i have moved the background using object pulling concept downwards
    FlowTheRiver() {
        for (let i = 0; i < this.riverBg.length; i++) {
            if (this.riverBg[i].y >= game.config.height) {
                let maps = this.riverBg.map(a => a.y);
                let maxValue = Math.max(...maps);
                this.riverBg[i].y = -(maxValue + this.riverBg[i].height - 10);
            }
            this.riverBg[i].y += this.speed;
        }
    }
    MissilePosition() {
        let patternOne = [
            { x: 960, y: 50 },
            { x: 960, y: 600 }
        ];
        let patternTwo = [
            { x: 800, y: 326 },
            { x: 1100, y: 326 }
        ];
        let patternThree = [
            { x: 960, y: 100 },
            { x: 960, y: 450 },
            { x: 960, y: 750 },
            { x: 740, y: 1050 },
            { x: 1182, y: 1050 }
        ];
        this.missilePatternArray = [patternOne, patternTwo, patternThree];
        console.log('this.missilePatternArray', this.missilePatternArray)
    }
    // here missiles are created as to obstacle the real boat
    CreationOfMissile() {
        this.missilePatternArray.map((elem) => {
            let missileGroup = this.add.container(0, 0);
            elem.map((elem1) => {
                let missile = this.physics.add.sprite(elem1.x, elem1.y, "missile").setAngle(-90);
                missile.key = 'missile';
                missileGroup.add(missile);
                missile.setSize(62, 160);
                this.physics.add.collider(this.boat, missile, this.DestroyBoat, null, this);
            })
            this.missileArray.push(missileGroup);
            console.log('this.missileArray', this.missileArray);
        });
        this.missileArray[0].setPosition(0, -1000);
        this.missileArray[1].setPosition(0, -8000);
        this.missileArray[2].setPosition(0, -20000);
        console.log('this.missileArray: ', this.missileArray);
    }
    // here I have moved the missiles using object pulling concept downwards
    MoveTheMissiles() {
        for (let i = 0; i < this.missileArray.length; i++) {
            if (this.missileArray[i].y >= game.config.height) {
                let maps = this.missileArray.map(a => a.y);
                let maxValue = Math.max(...maps);
                console.log('this.missileArray.length : ', this.missileArray.length);
                let randomY = this.GenerateRandom(4200, 5000);
                if (i <= 1) {
                    for (let j = 0; j < 2; j++) {
                        this.missileArray[i].list[j].visible = true;
                        this.missileArray[i].list[j].body.enable = true;
                    }
                }
                else {
                    for (let j = 0; j < 5; j++) {
                        this.missileArray[i].list[j].visible = true;
                        this.missileArray[i].list[j].body.enable = true;
                    }
                }
                this.missileArray[i].x = 0;
                this.missileArray[i].y -= (maxValue + this.missileArray[i].height + randomY);
            }
            this.missileArray[i].y += this.missileSpeed;
        }
    }
    // here i created the pools or flyovers on the river
    CreatngPool() {
        for (let i = 0; i < 2; i++) {
            let pool = this.add.sprite(0, 0, 'pool1').setOrigin(0.5, 0.5).setDepth(4).setScale(6.8, 3.5);
            this.poolArray.push(pool);
            pool.setPosition(Math.floor(game.config.width / 2), Math.round(i * (-game.config.height)));
        }
    }
    //move the flyover downwards 
    MoveThePool() {
        for (let i = 0; i < this.poolArray.length; i++) {
            // if (this.poolArray[i].y >= game.config.height) {
            //     let maps = this.poolArray.map(a => a.y);
            //     let maxValue = Math.max(...maps);
            //     this.poolArray[i].y = -(maxValue + this.poolArray[i].height);
            // }
            this.poolArray[i].y += this.speed + 2;
        }
    }
    // this method returns random value between a range of max and min as passed as arguments
    GenerateRandom(_min, _max) {
        return Math.floor(Math.random() * (_max - _min) + _min);
    }
    // left and right movement of the the real boat 
    LeftRightMovementOfBoat() {
        if (this.cursors.left.isDown) {
            if (this.boat.x > 652) {
                this.boat.x -= 8;
                this.boat.setAngle(70);
                // Phaser.Geom.Point.Interpolate(70, 110, 0.5, this.interpolatedPoint);
                if (this.boat.x == 652) {
                    this.boat.x += 8;
                }
            }
        }
        else if (this.cursors.right.isDown) {
            this.boat.setAngle(110);
            // Phaser.Geom.Point.Interpolate(70, 110, 0.5, this.interpolatedPoint);
            if (this.boat.x < 1265) {
                this.boat.x += 8;
                if (this.boat.x == 1265) {
                    this.boat.x -= 8;
                }
            }
        }
        else {
            this.boat.setAngle(90);
        }
    }
    /*
     here a blast spritesheet has been played and by calling
     @params{number} - _xPos - blasted item x position
     @params{number} - _yPos - blasted item y position
     @public
    */
    OnCollideAnimPlay(_xPos, _yPos) {
        console.log('method calling on colliding')
        this.bombAnim.x = _xPos;
        this.bombAnim.y = _yPos;
        this.bombAnim.setVisible(true);
        this.bombAnim.anims.play('blow');
        this.bombAnim.on('animationcomplete', () => {
            this.bombAnim.setVisible(false);
        });
    }
    /*
    After colliding of boat i.e. player and coins this method is called
    and passing the nuber of collected coin to pop up js
    @params{object} -  _boat - real boat or player
    @params{object} - _coins - coins gonna collenting
    @public
    */
    OnCollideCoinCollect(_boat, _coins) {
        // console.log('coin.x : ', this.coinText.x);
        // console.log('coin.y : ', this.coinText.y);
        this.TweenCoins(_boat.x, _boat.y);
        this.soundManager.coinCollectSound.play();
        _coins.setVisible(false);
        _coins.body.enable = false;
        this.coin++;
        this.coinCollectCount++;
        this.coinText.setText("Coins : " + this.coinCollectCount);
        this.popUp.GameCoinInfo(this.coinCollectCount);
    }
    // on collide with the bones the real boat will be destroyed and game will be ended like this by portraing a pop up by showing that game 
    // has been over and coin count has been set to 0 and scores set to 0 and destroyed the rest images

    /*
    on colliding player and the bone this method gonna called and after that game over and pop up is called 
    and game data updated once again
    @params{object} - _boat - player
    @params{object} - _bone - bone
    @public
    */
    OnCollideWithBone(_boat, _bone) {
        this.soundManager.gameOverSound.play();
        _boat.destroy();
        this.OnCollideAnimPlay(_boat.x, _boat.y);
        this.timer.paused = true;
        if (this.interval > this.bestScore) {
            window.localStorage.setItem("boat_rush_highest_score", this.interval);
            this.bestScore = this.interval;
        }
        let highestScore = window.localStorage.getItem("boat_rush_highest_score");
        this.Best.setText("Best : ", highestScore);
        console.log('this.BestScore : ', highestScore);
        this.coinCollectCount = 0;
        this.timeInSec = 0;
        this.interval = 0;


        console.log('coinGroupArray : ', this.coinGroupArray);
        // console.log('child : ', this.scene.scene.children.list[0].texture.key)
        for (let i = 3; i < this.scene.scene.children.list.length; i++) {

            // if (this.scene.scene.children.list[i].texture.key != "bg") {
            this.scene.scene.children.list[i].destroy();
            // }
        }

        this.DestroyAllObjects();
        // this.DestroyBones();
        this.popUp.CreatePopUp();
        this.popUp.ShowPopup();
    }

    /*here  i've created the missiles and added physics to them and called this method on space bar press
    and added collider to them as they collided with the obstacles the obstacles will be destroyed*/
    OnSpaceKeyPressed() {
        let bullet1 = this.physics.add.image(this.boat.x - 30, this.boat.y, 'white').setScale(15, 45).setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000).setDepth(3);
        let bullet2 = this.physics.add.image(this.boat.x + 30, this.boat.y, 'white').setScale(15, 45).setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000).setDepth(3);
        this.physics.add.collider(bullet1, this.upperBar, this.OnCollideWithTheUpperBar, null, this);
        this.physics.add.collider(bullet2, this.upperBar, this.OnCollideWithTheUpperBar, null, this);
        this.physics.add.collider(bullet1, this.missile, this.DestroyMissile, null, this);
        this.physics.add.collider(bullet2, this.missile, this.DestroyMissile, null, this);

        this.physics.add.collider(bullet1, this.bone, this.DestroySkull, null, this);
        bullet1.setVelocityY(-1300);
        bullet2.setVelocityY(-1300);
    }

    /* on collide with the log wood the player boat has been destroyed and game over and game data setting 0 again
    and pop up shown
    @params{object} - _log - wood as obstacle,
    @params{object} - _boat - player
    */
    OnCollideWithTheLog(_log, _boat) {
        _boat.destroy();
        this.OnCollideAnimPlay(_boat.x, _boat.y);
        this.timer.paused = true;

        if (this.interval > this.bestScore) {
            window.localStorage.setItem("Best", this.interval);
            this.bestScore = this.interval;
        }

        console.log('coinarray : ',)

        let highestScore = window.localStorage.getItem("Best");
        this.Best.setText("Best : ", highestScore);
        this.coinCollectCount = 0;
        this.timeInSec = 0;
        this.interval = 0;
        this.DestroyAllObjects();
        // this.DestroyBones();
        for (let i = 3; i < this.scene.scene.children.list.length; i++) {

            // if (this.scene.scene.children.list[i].texture.key != "bg") {
            this.scene.scene.children.list[i].destroy();
            // }
        }
        this.popUp.CreatePopUp();       // added

        this.popUp.ShowPopup();
    }
    /* on collide with the upper bar the bulltes has been destroyed created by pressing the space bar
       @params{object} - _bullet - bullets creating from the boat on space bar press
       @params{object} - _bar - bar on the  top of the canvas alpha  = 0;
       @public
    */
    OnCollideWithTheUpperBar(_bullet, _bar) {
        console.log('destroy');
        _bullet.destroy();
    }

    /*
      on colliding the demo boat same thing happens  as  colliding with the obstacle
      @params{object} - _demoBoat - obstacle
      @params{object} - _realBoat - player
      @public
    */
    OnCollideWithTheDemoBoat(_demoBoat, _realBoat) {
        console.log('collided with the demo boat', _realBoat.x);
        _realBoat.destroy();
        // _demoBoat.destroy();
        this.OnCollideAnimPlay(_realBoat.x, _realBoat.y);
        this.timer.paused = true;

        if (this.interval > this.bestScore) {
            window.localStorage.setItem("Best", this.interval);
            this.bestScore = this.interval;
        }

        console.log('coinarray : ',)
        let highestScore = window.localStorage.getItem("Best");
        this.Best.setText("Best : ", highestScore);
        this.coinCollectCount = 0;
        this.timeInSec = 0;
        this.interval = 0;
        this.DestroyAllObjects();
        // this.DestroyBones();

        for (let i = 3; i < this.scene.scene.children.list.length; i++) {

            // if (this.scene.scene.children.list[i].texture.key != "bg") {
            this.scene.scene.children.list[i].destroy();
            // }
        }
        this.popUp.CreatePopUp();       // added

        this.popUp.ShowPopup();
    }
    /* on collide between real boat and the obstacle the real boat has been destroyed and the game has been over and set 
    the score into the localStorage and getting that value  by get method  and showing that value in the score part of the game
    and set coinCollectCount = 0,timeInSec = 0,interval = 0, and showing the pop up
    @params{object} - _objectA - real boat or player
    @params{object} - _objectB - missile
    @missile
    */

    DestroyBoat(_boat, _missile) {
        console.log('_boat' + _boat);
        console.log('_missile' + _boat);
        this.soundManager.gameOverSound.play();
        _boat.destroy();
        _missile.visible = false;
        this.OnCollideAnimPlay(_boat.x, _boat.y);
        this.timer.paused = true;
        console.log('this.interval : ', this.interval);
        if (this.interval > this.bestScore) {
            window.localStorage.setItem("Best", this.interval);
            this.bestScore = this.interval;
        }
        let highestScore = window.localStorage.getItem("Best");
        this.Best.setText("Best : ", highestScore);
        // if (highestScore == undefined || highestScore == null)
        //     highestScore = this.interval;
        // this.popUp.BestScoreOfIndividuals(highestScore);
        this.coinCollectCount = 0;
        this.timeInSec = 0;
        this.interval = 0;
        this.DestroyAllObjects();
        // this.DestroyBones();

        for (let i = 3; i < this.scene.scene.children.list.length; i++) {

            // if (this.scene.scene.children.list[i].texture.key != "bg") {
            this.scene.scene.children.list[i].destroy();
            // }
        }
        this.popUp.CreatePopUp();
        // this.popUp.CreatePopUp();       // added

        this.popUp.ShowPopup();
    }
    // here i am destroying the game objects like skull and the missiles after game over  and setting all the game data once again
    DestroyAllObjects() {
        this.interval = 0;
        this.coinGroupArray = [];
        this.missileArray = [];
        this.logWoodArray = [];
        this.demoBoatArray = [];
        for (let i = 0; i < this.poolArray.length; i++) {
            this.poolArray[i].destroy();
        }
        this.zebraCross.destroy();
        let arrLength = this.scene.scene.children.list.length;
        console.log('arrLength : ', arrLength);
        for (let i = 0; i < arrLength; i++) {
            if (this.scene.scene.children.list[i].key == "coins" ||
                this.scene.scene.children.list[i].key == "missile" ||
                this.scene.scene.children.list[i].key == "demoBoat" ||
                this.scene.scene.children.list[i].key == "wood") {
                this.scene.scene.children.list[i].destroy();
                arrLength = this.scene.scene.children.list.length;
                i = 0;
            }
        }
    }
    /*
    destroying the missiles after colliding with the bullets passed as parameters as you can see
    @params{object} -  _bullet - bullet coming from the boat or player  on  space bar press
    @params{object} - _missile - obstacle
    @PUBLIC
    */
    DestroyMissile(_bullet, _missile) {
        _missile.destroy();
    }
    // this methid helps to calculate the time period how long the player was alive in game
    TimeConsume() {
        this.timeInSec++;
        this.interval = (this.speed * this.timeInSec);
        this.distance.setText("Distance : " + this.interval);
        this.popUp.IndividualDistanceOccupied(this.interval);
    }
    /* here i am callinf those method whom i need though the game continuously like
      background move missiles bones boat pooland last but not the bleast the wood as obsytacles */
    update() {
        this.FlowTheRiver();
        this.MoveTheMissiles();
        this.LeftRightMovementOfBoat();
        this.MoveCoins();
        this.MoveThePool();
        this.MoveDemoBoat();
        this.MoveLogWood();
    }
}