export default class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
        this.soundButton;
        this.ball;
        this.tapTosStart;
        this.gameplayContainer = null;
        this.isGameStart = false;
        this.group1;
        this.batArry = [];
        this.randomNumber = [];
        this.roundCounter = 2;
        this.tapCounter = -1;
        this.numberArray1 = [0,1,2,3,4,5,6,7,8];
        this.isWicket = false;
        this.defaultPosX = [940,894,767,588,398,240,151,151,240,397,587,766,893];
        this.defaultPosY = [960,1145,1289,1357,1334,1225,1056,864,695,586,562,630,773];
        this.batArrayTweenPosX = [1140,1059,840,540,240,20,-59,19,238,538,838,1058];
        this.batArrayTweenPosY = [960,1259,1479,1559,1479,1260,960,660,441,360,439,658];
        this.isGameOver = false;
        this.midBlock;
        this.score = 0;
        this.highScore = 0;
        this.gamePlaySceneScoreTxt;
        this.roundCounterTxt;
        this.isCollision = false;
        this.animationTime = 250;
    }
    ResetAllData()
    {
        this.gameplayContainer = null;
        this.isGameStart = false;
        this.batArry = [];
        this.batArrayForScore = [];
        this.randomNumber = [];
        this.roundCounter = 2;
        this.tapCounter = -1;
        this.numberArray1 = [0,1,2,3,4,5,6,7,8];
        this.isWicket = false;
        this.defaultPosX = [940,886,740,540,340,193,140,193,339,539,739,885];
        this.defaultPosY = [960,1159,1306,1359,1306,1160,960,760,614,560,613,758];
        this.batArrayTweenPosX = [1140,1059,840,540,240,20,-59,19,238,538,838,1058];
        this.batArrayTweenPosY = [960,1259,1479,1559,1479,1260,960,660,441,360,439,658];
        this.isGameOver = false;
        this.score = 0;
        this.highScore = 0;
        this.animationTime = 250;
    }
    create() {
        this.ResetAllData();
        // console.log("Enter into the Gameplay Scene"+this.tapCounter);
        let gameplayBg = this.add.sprite(Math.round(game.config.width/2), Math.round(game.config.height/2), "backGround")
        .setOrigin(0.5, 0.5)
        .setScale(scaleFactor*1.5, scaleFactor*1.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', this.GameplayBgBttnPressed)

        this.tapTosStart = this.add.sprite(Math.round(game.config.width/2), Math.round(game.config.height/1.15), "tapToStart")
        .setOrigin(0.5, 0.5)
        .setScale(scaleFactor*1.5, scaleFactor*1.5)

        this.tweens.add({
            targets: [this.tapTosStart],
            alpha: 0,
            delay: 1000,
            duration: 300,
            ease: 'Power2',
            onComplete: () => {
                console.log("Animation Complete...................");
                this.tweens.add({
                    targets: [this.playBttn],
                    alpha: 1,
                    duration: 300,
                    ease: 'Power2',
                }, this);
            },
            yoyo: true,
            loop:1000
          }, this);


        let roundBg = this.add.sprite(Math.round(game.config.width/2), Math.round(game.config.height/10), "roundBg")
        .setOrigin(0.5, 0.5)
        .setScale(scaleFactor*1.5, scaleFactor*1.5)

        let roundTxt = this.add.sprite(Math.round(game.config.width/2.5), Math.round(game.config.height/10), "roundTxt")
        .setOrigin(0.5, 0.5)
        .setScale(scaleFactor, scaleFactor)

        Utils.SpriteSettingsControl(this,game.config.width/2,game.config.height/2, "circle", 0.5, 0.5, scaleFactor*1.5, scaleFactor*1.5);
    
        this.soundButton = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 1.1), Math.round(game.config.height / 24), 
        "soundOn", 0.5, 0.5, scaleFactor*2, scaleFactor*2, "true", this.SoundButtonPressed, this.SoundButtonReleased);
        this.DefaultSoundButton();

        let homeBttn = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 10.5), Math.round(game.config.height / 24), "home", 
        0.5, 0.5, scaleFactor*2, scaleFactor*2, "true", this.HomeBttnPressed, this.HomeBttnReleased);

       this.midBlock = this.add.sprite(Math.round(game.config.width/1.8), Math.round(game.config.height/3.75), "Wicket0")
        .setOrigin(0.5, 0.5)
        .setScale(scaleFactor, scaleFactor);
        this.midBlock.visible = false;
        
        this.anims.create({
            key: 'wicketAnim',
            frames: [
                { key: 'Wicket0' },
                { key: 'Wicket1' },
                { key: 'Wicket2' },
                { key: 'Wicket3' },
                { key: 'Wicket4'},
                { key: 'Wicket0', duration: 2 },
            ],
            frameRate: 10,
            repeat: 0
        });
          
        this.ball = this.add.sprite(Math.round(game.config.width/35), Math.round(game.config.height/5), "ball")
        .setOrigin(0.5, 0.5)
        .setScale(scaleFactor*2, scaleFactor*2);
        
        this.gameplayContainer = this.add.container(Math.round(game.config.width/2), Math.round(game.config.height/2));
        this.gameplayContainer.setScale(scaleFactor*0.5,scaleFactor*0.5);
        this.gameplayContainer.add([this.ball]);

        this.ball.y -= 1160;
        // console.log("The Position Set.....................",this.ball.y);

        this.group1 = this.add.group({ key: 'bat0', frameQuantity: 12 });
        const circle = new Phaser.Geom.Circle(Math.round(game.config.width/2), Math.round(game.config.height/2), 400);
        Phaser.Actions.PlaceOnCircle(this.group1.getChildren(), circle);

        // console.log("The children....................",this.group1.getChildren()[0].visible);
        this.group1.getChildren()[9].visible = false;
        this.group1.getChildren()[10].visible = false;
        this.group1.getChildren()[0].angle = 90;
        this.group1.getChildren()[1].angle = 90+30;
        this.group1.getChildren()[2].angle = 90+60;
        this.group1.getChildren()[3].angle = 180;
        
        this.group1.getChildren()[4].angle = 180+30;
        this.group1.getChildren()[5].angle = 180+60;
        this.group1.getChildren()[6].angle = 270;
        
        this.group1.getChildren()[7].angle = 270+30;
        this.group1.getChildren()[8].angle = 270+60;
        
        // this.group1.getChildren()[10].angle = 360+30;
        this.group1.getChildren()[11].angle = 360+60;
        // this.group1.getChildren()[12].angle = 360+60;
        

        for(let i = 0;i<this.group1.getChildren().length;i++)
        {
            // console.log("The Posx................."+this.group1.getChildren()[i].x);
            // console.log("The Posy................."+this.group1.getChildren()[i].y);
            this.group1.getChildren()[i].setScale(0,0);
            this.batArry.push(this.add.sprite(this.group1.getChildren()[i].x, this.group1.getChildren()[i].y, "one_pixel_white")
            .setOrigin(0.5, 0.5)
            .setScale(scaleFactor*15, scaleFactor*15));
            this.batArry[i].alpha = 0.001;


            this.batArrayForScore.push(this.add.sprite(this.group1.getChildren()[i].x, this.group1.getChildren()[i].y, "one_pixel_white")
            .setOrigin(0.5, 0.5)
            .setScale(scaleFactor*15, scaleFactor*15));
            this.batArrayForScore[i].alpha = 0.001;

        }
        // console.log("The bat Array...............",this.batArry.length);
        this.batArry[9].setScale(0,0);
        this.batArry[10].setScale(0,0);


        let titleSceneTxtStyle = { fontFamily: 'burgerjointneon', fontSize: '85px', fill: '#ffffff', fontStyle: 'bold',align: 'center' };
        this.gamePlaySceneScoreTxt =  this.add.text(Math.round(game.config.width/2), Math.round(game.config.height/2), 
        this.score, titleSceneTxtStyle)
        .setOrigin(0.5, 0.5)
        .setScale(scaleFactor, scaleFactor);

        this.roundCounterTxt =  this.add.text(Math.round(game.config.width/1.5), Math.round(game.config.height/9.5), 
        (this.roundCounter-1), titleSceneTxtStyle)
        .setOrigin(0.5, 0.5)
        .setScale(scaleFactor, scaleFactor);

        
        // let emitterPos1 = this.add.sprite(Math.round(game.config.width/4), Math.round(game.config.height/4), "one_pixel_white")
        //     .setOrigin(0.5, 0.5)
        //     .setScale(scaleFactor*30, scaleFactor*30);

        // let emitterPos2 = this.add.sprite(Math.round(game.config.width/1.2), Math.round(game.config.height/4), "one_pixel_white")
        // .setOrigin(0.5, 0.5)
        // .setScale(scaleFactor*30, scaleFactor*30);
    }
    InstantiateBallWithRoundCounter(_roundCounter)
    {
        this.GetRandomNumber(_roundCounter,this.numberArray1);
    }
    checkOverlap(spriteA, spriteB) {
	    let boundsA = spriteA.getBounds();
	    let boundsB = spriteB.getBounds();
	    return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
	}
    update()
    {
        this.ball.angle += 6;
        if(this.isGameStart)
        {
            this.gameplayContainer.angle += (1+this.roundCounter/10);
        }
        if(!this.isGameOver)
        {
            for(let i = 0;i<this.randomNumber.length;i++)
            {
                this.CheckCollision(this.randomNumber[i]);
            }
            if(this.checkOverlap(this.ball,this.batArry[10]) && !this.isWicket)
            {
                this.isWicket = true;
                // console.log("Wicket Happens Next Round Start");
                this.NextRound();
            }
        }
    }
    NextRound()
    {
        this.midBlock.play('wicketAnim');
        this.score+=10;
        this.gamePlaySceneScoreTxt.text = this.score;
        this.roundCounter++;
        this.roundCounterTxt.text = (this.roundCounter-1);
        this.randomNumber = [];
        this.SetAllBatScaleToZero();
        this.InstantiateBallWithRoundCounter(this.roundCounter);
        this.tapCounter = 0;

        for(let i = 0;i < 50;i++)
        {
            let emitter0 = this.add.particles('spark').createEmitter({
            x: Math.round(game.config.width/4),
            y: Math.round(game.config.height/4),
            speed: { min: -200, max: 200 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.2, end: 0 },
            blendMode: 'ADD',
            lifespan: 1000,
            gravityY: 200
            });
            emitter0.explode();
        }

        for(let i = 0;i < 50;i++)
        {
            let emitter0 = this.add.particles('spark').createEmitter({
            x: Math.round(game.config.width/2),
            y: Math.round(game.config.height/4),
            speed: { min: -200, max: 200 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.2, end: 0 },
            blendMode: 'ADD',
            lifespan: 1000,
            gravityY: 200
            });
            emitter0.explode();
        }

        
        for(let i = 0;i < 50;i++)
        {
            let emitter0 = this.add.particles('spark').createEmitter({
            x: Math.round(game.config.width/1.5),
            y: Math.round(game.config.height/4),
            speed: { min: -200, max: 200 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.2, end: 0 },
            blendMode: 'ADD',
            lifespan: 1000,
            gravityY: 200
            });
            emitter0.explode();
        }

        setTimeout(() => {
            this.isWicket = false; 
        }, 1000);
    }
    SetAllBatScaleToZero()
    {
        for(let i = 0;i<this.group1.getChildren().length;i++)
        {
            this.group1.getChildren()[i].setScale(0,0);
        }
    }
    GetRandomNumber(_counter,_arrayElement1)
    {
        for(let i =0;i<_counter;i++)
        {
            let rand1 =_arrayElement1[Math.floor(Math.random() * _arrayElement1.length)];
            for(let j = 0;j<this.randomNumber.length;j++)
            {
                while(rand1 == this.randomNumber[j])
                {
                    // console.log("Enter into the Rand1......................"+rand1);
                    rand1 =_arrayElement1[Math.floor(Math.random() * _arrayElement1.length)];
                }
            }
            // console.log("The rand 1................."+rand1);
            let rand2 = Math.floor(Math.random() * 2);
            if(rand2 == 0)
                this.group1.getChildren()[rand1].setTexture("bat0");
            else
                this.group1.getChildren()[rand1].setTexture("bat1");
            this.group1.getChildren()[rand1].setScale(scaleFactor*1.2,scaleFactor*1.2);
            this.randomNumber.push(rand1);
        }
        // for(let k = 0;k<this.randomNumber.length;k++)
        // {
        //     if(this.randomNumber[k] == 11 || this.randomNumber[k] == 12)
        //     {
        //         this.randomNumber.reverse();
        //     }
        //     else{
        //     }
        // }
        this.randomNumber.sort();
        // console.log("Random Number Push.............",this.randomNumber);
    }
    BatMovement(_randomNumberArray,_counter)
    {
        // console.log("The counter.............."+_counter+"The round counter.................."+this.animationTime);
        if(_counter == (this.roundCounter-1))
        {
            this.batArry[10].setScale(15,15);
        }
        if(!this.isGameOver && _counter <= (this.roundCounter-1))
        {
            SoundManager.PlaySwingSound();
            this.tweens.add({
                targets: [this.group1.getChildren()[_randomNumberArray[_counter]]],
                y : {value: this.batArrayTweenPosY[_randomNumberArray[_counter]]},
                x : {value: this.batArrayTweenPosX[_randomNumberArray[_counter]]},
                delay: 0,
                duration:  this.animationTime,
                ease:  "Linear",
                onComplete: () => {
                    // console.log("Animation Complete...................");
                    this.tweens.add({
                        targets: [this.group1.getChildren()[_randomNumberArray[_counter]]],
                        y : {value: this.defaultPosY[_randomNumberArray[_counter]]},
                        x : {value: this.defaultPosX[_randomNumberArray[_counter]]},
                        delay: 0,
                        duration:  this.animationTime,
                        ease: "Linear",
                    }, this);
                },
            }, this);

            this.tweens.add({
                targets: [this.batArry[_randomNumberArray[_counter]]],
                y : {value: this.batArrayTweenPosY[_randomNumberArray[_counter]]},
                x : {value: this.batArrayTweenPosX[_randomNumberArray[_counter]]},
                delay: 0,
                duration:  this.animationTime,
                ease:  "Linear",
                onComplete: () => {
                    // console.log("Animation Complete...................");
                    // this.score++;
                    // this.gamePlaySceneScoreTxt.text = this.score;
                    this.tweens.add({
                        targets: [this.batArry[_randomNumberArray[_counter]]],
                        y : {value: this.defaultPosY[_randomNumberArray[_counter]]},
                        x : {value: this.defaultPosX[_randomNumberArray[_counter]]},
                        delay: 0,
                        duration:  this.animationTime,
                        ease:  "Linear",
                    }, this);
                },
            }, this);
        }
    }
    CheckCollision(_index)
    {

        if(this.checkOverlap(this.ball,this.batArrayForScore[_index+1]))
        {
            if(!this.isCollision){
                this.isCollision = true;
                // console.log("The score increases...............");
                this.score++;
                this.gamePlaySceneScoreTxt.text = this.score;
                let randNumber = Math.floor(Math.random() * (4 - 2) + 2);
                for(let i = 0;i < 50;i++)
                {
                    let emitter0 = this.add.particles('spark').createEmitter({
                    x: Math.round(game.config.width/randNumber),
                    y: Math.round(game.config.height/4),
                    speed: { min: -200, max: 200 },
                    angle: { min: 0, max: 360 },
                    scale: { start: 0.2, end: 0 },
                    blendMode: 'ADD',
                    lifespan: 1000,
                    gravityY: 0
                    });
                    emitter0.explode();
                }
                setTimeout(() => {
                    this.isCollision = false;
                }, 500);
            }
        }
        if(this.checkOverlap(this.ball,this.batArry[_index]))
        {
            // console.log("Overlap happens................................");
            this.isGameOver = true;
            this.isGameStart = false;
            SoundManager.PlayCheerSound();
            setTimeout(() => {
                SoundManager.StopGamePlayPageBgMusic();
                SoundManager.PlayMenuPageBgMusic();
                this.scene.stop("GameScene");
                this.scene.start("TitleScene");
                localStorage.setItem("score", this.score);
            }, 1000);
        }
    }
    GameplayBgBttnPressed()
    {
        if(this.scene.tapCounter == -1){
            this.scene.tapCounter++;
            this.scene.tapTosStart.visible = false;
            this.scene.isGameStart = true;
            this.scene.InstantiateBallWithRoundCounter(this.scene.roundCounter);
            this.scene.midBlock.visible = true;
        }
        else{
            this.scene.BatMovement(this.scene.randomNumber,this.scene.tapCounter);
            this.scene.tapCounter++;
        }
    }
    DefaultSoundButton() {
        if (localStorage.getItem("hit_the_wicket_is_sound_on") == null) {
            localStorage.setItem("hit_the_wicket_is_sound_on", 1);
        }
        if (localStorage.getItem("hit_the_wicket_is_sound_on") == 1) {
            this.soundButton.setTexture("soundOn");
        } else {
            this.soundButton.setTexture("soundOff");
        }
    }
    ToggleSoundButton() {
        if (localStorage.getItem("hit_the_wicket_is_sound_on") == 1) {
            localStorage.setItem("hit_the_wicket_is_sound_on", 0);
            this.soundButton.setTexture("soundOff");
            SoundManager.PlayButtonClickSound();
            SoundManager.StopGamePlayPageBgMusic();
        } else {
            localStorage.setItem("hit_the_wicket_is_sound_on", 1);
            this.soundButton.setTexture("soundOn");
            SoundManager.PlayGameplayPageBgMusic();
        }
    }
    SoundButtonPressed() {
        Utils.ButtonScaleTween(this.scene.scene, this.scene.scene.soundButton, scaleFactor*2);
        SoundManager.PlayButtonClickSound();
    }
    SoundButtonReleased() {
        this.ToggleSoundButton();
    }
    HomeBttnPressed()
    {
        SoundManager.StopGamePlayPageBgMusic();
        SoundManager.PlayMenuPageBgMusic();
        this.scene.stop("GameScene");
        this.scene.start("TitleScene");
    }
    HomeBttnReleased()
    {

    }

}