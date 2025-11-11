import JioSdkIntegration from "./JioSdkIntegration.js";
export default class TitleScene extends Phaser.Scene {

    constructor() {
        super("TitleScene");
        this.titlePageContainer = null;
        this.gameplayPageContainer = null;
        this.gameplayBttmContainer = null;
        this.score = 0;
        this.count = 0;
        this.midScore;
        this.redLine;
        this.redLineShadow;
        this.scoreTxt;
        this.gameplayScore;
        this.isGameOver = false;
        this.colliderBgUp;
        this.colliderBgLeft;
        this.colliderBgRight;
        this.colliderBgDown;
        this.ball;
        this.tapBttnCounter = 0;
        this.overlapRight;
        this.overlapLeft;
        this.overlapUp;
        this.overlapDown;
        this.overlapBttmLine;
        this.checkCollisionCounter = 0;
        this.scoreTxt;
        this.highScoreTxt;
        this.highScore = 0;
        this.isMidScoreUpdate = false;
        this.emitter0;
        // this.bodyVelocity = 700;
        this.headWhiteTxt;
        this.ballspeed = 80;
        this.JioSdkIntegrationReference = new JioSdkIntegration();
    }
    init()
    {
        // console.log("Enter into the Init");
        var element = document.createElement('style');
        document.head.appendChild(element);
        var sheet = element.sheet;
        var styles = '@font-face { font-family: "burgerjointneon"; src: url("assets/fonts/burgerjointneon.ttf") format("truetype"); }';
        sheet.insertRule(styles, 0);
    }
    preload() {
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }
    create() {
        if (localStorage.getItem("neon_ball_high_score") == null) {
            localStorage.setItem("neon_ball_high_score", 0);
        }
        if(localStorage.getItem("neon_ball_high_score"))
        {
            this.highScore = localStorage.getItem("neon_ball_high_score");
        }
        this.gamePlayBg = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2), Math.round(game.config.height / 2),
         "defaultBg", 0.5, 0.5, scaleFactor*1.5, scaleFactor*1.5,false,this.TapToStartBttnPressed);

         this.anims.create({
            key: 'redLineAnim',
            frames: [
                { key: 'anim9' },
                { key: 'anim8' },
                { key: 'anim7' },
                { key: 'anim6' },
                { key: 'anim5' },
                { key: 'anim4' },
                { key: 'anim3' },
                { key: 'anim2' },
                { key: 'anim1', duration: 2 }
            ],
            frameRate: 60,
            repeat: 0
        });
        this.redLine = this.add.sprite(Math.round(game.config.width / 2), Math.round(game.config.height / 2), 'anim1')
        .setOrigin(0.5, 0.5)
        .setScale(scaleFactor*1.5, scaleFactor*1.5);
        this.redLine.visible = false;

        this.soundButton = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 1.077), Math.round(game.config.height / 35), "soundOn", 0.5, 0.5, scaleFactor, scaleFactor, "true", this.SoundButtonPressed, this.SoundButtonReleased);
        this.DefaultSoundButton();
        
        this.add.sprite(Math.round(game.config.width / 2.01), Math.round(game.config.height / 1.98), 'glow_line')
        .setOrigin(0.5, 0.5)
        .setScale(scaleFactor*1.51, scaleFactor*1.5);

        this.colliderBgUp = this.physics.add.sprite(Math.round(game.config.width / 2.01), Math.round(game.config.height / 7),
        "horizontal-line").setScale(scaleFactor*1.52, scaleFactor).setOrigin(0.5, 0.5);
        this.colliderBgUp.index = 2;

        this.colliderBgLeft = this.physics.add.sprite(Math.round(game.config.width / 7.5), Math.round(game.config.height / 1.98),
        "vertical-line_left").setScale(scaleFactor*1.5, scaleFactor*1.5).setOrigin(0.5, 0.5);
        this.colliderBgLeft.index = 0;
        
        this.colliderBgRight = this.physics.add.sprite(Math.round(game.config.width / 1.16), Math.round(game.config.height / 1.98),
        "vertical-line_right").setScale(scaleFactor*1.5, scaleFactor*1.5).setOrigin(0.5, 0.5);
        this.colliderBgRight.index = 0;
        // this.colliderBgRight.angle = 90;

        this.colliderBgDown = this.physics.add.sprite(Math.round(game.config.width / 2.01), Math.round(game.config.height / 1.15),
        "bottomline").setScale(scaleFactor*1.51, scaleFactor*1.5).setOrigin(0.5, 0.5);
        this.colliderBgDown.index = 1;

        this.redLineShadow = this.add.sprite(Math.round(game.config.width / 2), Math.round(game.config.height / 1.14),
        "redLine").setScale(scaleFactor*1.5, scaleFactor*1.5).setOrigin(0.5, 0.5);

        // this.overlapRight = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 1.23), 
        // Math.round(game.config.height / 1.98), "one_pixel_white", 0.5, 0.5, scaleFactor*10, scaleFactor*1370);
        // this.overlapRight.alpha = 0.00001;

        // this.overlapLeft = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 5.2), 
        // Math.round(game.config.height / 1.98), "one_pixel_white", 0.5, 0.5, scaleFactor*10, scaleFactor*1370);
        // this.overlapLeft.alpha = 0.00001;
        
        // this.overlapUp = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2), 
        // Math.round(game.config.height / 6), "one_pixel_white", 0.5, 0.5, scaleFactor*800, scaleFactor*10);
        // this.overlapUp.alpha = 0.00001;
        
        // this.overlapDown = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2), 
        // Math.round(game.config.height / 1.25), "one_pixel_white", 0.5, 0.5, scaleFactor*800, scaleFactor*10);
        // this.overlapDown.alpha = 0.00001;
        // this.overlapDown.visible = false;

        this.overlapBttmLine =  Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2), 
        Math.round(game.config.height / 1.1), "one_pixel_white", 0.5, 0.5, scaleFactor*800, scaleFactor*10);
        this.overlapBttmLine.alpha = 0.00001;



        let sceneRef = this;
        WebFont.load({
            custom: {
                families: ['burgerjointneon']
            },
            active: function ()
            {
                // console.log("The add........................",sceneRef);
                sceneRef.highScoreTxt =  sceneRef.add.text(Math.round(game.config.width /5), Math.round(game.config.height/35), "HIGH SCORE : "+sceneRef.highScore,
                { fontFamily: 'burgerjointneon', fontSize: '40px', fill: '#19e6e2', align: 'center' })
                .setOrigin(0.5, 0.5)
                .setScale(scaleFactor, scaleFactor);

                sceneRef.headTxt =  sceneRef.add.text(Math.round(game.config.width/2), Math.round(game.config.height/2.75), "NEON BALL", 
                { fontFamily: 'burgerjointneon', fontSize: '105px', fill: '#19e6e2', fontStyle: 'bold',align: 'center' })
                .setOrigin(0.5, 0.5)
                .setScale(scaleFactor, scaleFactor);

                sceneRef.headWhiteTxt =  sceneRef.add.text(Math.round(game.config.width/2), Math.round(game.config.height/2.74), "NEON BALL", 
                { fontFamily: 'burgerjointneon', fontSize: '105px', fill: '#ffffff', fontStyle: 'bold',align: 'center' })
                .setOrigin(0.5, 0.5)
                .setScale(scaleFactor, scaleFactor);

                sceneRef.playBttn = sceneRef.add.text(Math.round(game.config.width/2), Math.round(game.config.height/1.3), "PLAY ",
                { fontFamily: 'burgerjointneon', fontSize: '105px', fill: '#19e6e2', fontStyle: 'bold',align: 'center' })
                .setOrigin(0.5, 0.5)
                .setScale(scaleFactor, scaleFactor)
                .setInteractive({ useHandCursor: true })
                .on('pointerdown', sceneRef.PlayBttnPressed)

                sceneRef.tapToStart = sceneRef.add.text(Math.round(game.config.width/2), Math.round(game.config.height/1.3), "TAP TO START ",
                { fontFamily: 'burgerjointneon', fontSize: '85px', fill: '#19e6e2', fontStyle: 'bold',align: 'center' })
                .setOrigin(0.5, 0.5)
                .setScale(scaleFactor, scaleFactor);
                
                sceneRef.gameplayScore =  sceneRef.add.text(Math.round(game.config.width /2), Math.round(game.config.height/13), "0", 
                { fontFamily: 'burgerjointneon', fontSize: '80px', fill: '#f12121',fontStyle: 'bold',align: 'center' })
                .setOrigin(0.5, 0.5)
                .setScale(scaleFactor, scaleFactor);

                sceneRef.scoreTxt =  sceneRef.add.text(Math.round(game.config.width /2), Math.round(game.config.height/1.6), "SCORE : "+sceneRef.score,
                { fontFamily: 'burgerjointneon', fontSize: '50px', fill: '#f12121',fontStyle: 'bold',align: 'center' })
                .setOrigin(0.5, 0.5)
                .setScale(scaleFactor, scaleFactor);
                
                sceneRef.midScore =  sceneRef.add.text(Math.round(game.config.width /2), Math.round(game.config.height/2), "0", 
                { fontFamily: 'burgerjointneon', fontSize: '200px', fill: '#292929',fontStyle: 'bold',align: 'center' })
                .setOrigin(0.5, 0.5)
                .setScale(scaleFactor, scaleFactor);

                sceneRef.titlePageContainer = sceneRef.add.container(0, 0);
                sceneRef.titlePageContainer.add([sceneRef.playBttn,sceneRef.soundButton,sceneRef.highScoreTxt,sceneRef.headWhiteTxt,sceneRef.headTxt,sceneRef.scoreTxt]);

                sceneRef.gameplayPageContainer = sceneRef.add.container(0, 0);
                sceneRef.gameplayPageContainer.add([sceneRef.tapToStart,sceneRef.gameplayScore,sceneRef.midScore]);
                sceneRef.gameplayPageContainer.alpha = 0;
            }
        });
        
        this.gameplayBttmContainer = this.add.container(0, 0);
        this.gameplayBttmContainer.add([/*this.overlapDown,*/this.colliderBgDown,this.redLineShadow]);
        this.colliderBgDown.body.enable = false;
        this.gameplayBttmContainer.visible = false;

        this.ball = this.physics.add.image(Math.round(game.config.width / 3.5), Math.round(game.config.height / 4.5),"ball")
        .setScale(scaleFactor*1.5, scaleFactor*1.5)
        .setOrigin(0.5, 0.5);

        this.ball.setCircle(30,25,25);
        this.ball.angle += 180;

        this.physics.add.existing(this.ball, true);
        this.ball.body.enable = true;
        this.ball.depth = 2;
        
        this.physics.add.existing(this.colliderBgLeft, true);
        this.colliderBgLeft.body.enable = true;
        this.physics.add.collider(this.ball, this.colliderBgLeft);
        
        this.physics.add.existing(this.colliderBgRight, true);
        this.colliderBgRight.body.enable = true;
        this.physics.add.collider(this.ball, this.colliderBgRight);
        
        this.physics.add.existing(this.colliderBgUp, true);
        this.colliderBgUp.body.enable = true;
        this.physics.add.collider(this.ball, this.colliderBgUp);

        this.physics.add.existing(this.colliderBgDown, true);
        this.colliderBgDown.body.enable = false;
        this.physics.add.collider(this.ball, this.colliderBgDown);
        this.CollisionCheckWithObstacle();
        console.log("Jio SDK Integration...............",this.JioSdkIntegrationReference);
        this.JioSdkIntegrationReference.cacheAds();
        this.JioSdkIntegrationReference.showAds();
    }

    DefaultSoundButton() {
        if (localStorage.getItem("neon_ball_is_sound_on") == null) {
            localStorage.setItem("neon_ball_is_sound_on", 1);
            Utils.CreateScoreObject(this.highScore,1);
        }
        if (localStorage.getItem("neon_ball_is_sound_on") == 1) {
            this.soundButton.setTexture("soundOn");
        } else {
            this.soundButton.setTexture("soundOff");
        }
    }
    ToggleSoundButton() {
        if (localStorage.getItem("neon_ball_is_sound_on") == 1) {
            localStorage.setItem("neon_ball_is_sound_on", 0);
            this.soundButton.setTexture("soundOff");
            SoundManager.PlayButtonClickSound();
            SoundManager.StopBgMusic();
            Utils.CreateScoreObject(this.highScore,0);
        } else {
            localStorage.setItem("neon_ball_is_sound_on", 1);
            this.soundButton.setTexture("soundOn");
            SoundManager.PlayBgMusic();
            Utils.CreateScoreObject(this.highScore,1);
        }
    }
    SoundButtonPressed() {
        Utils.ButtonScaleTween(this.scene.scene, this.scene.scene.soundButton, scaleFactor);
        SoundManager.PlayButtonClickSound();
    }
    SoundButtonReleased() {
        this.ToggleSoundButton();
    }
    PlayBttnPressed()
    {
        SoundManager.PlayButtonClickSound();
        this.scene.titlePageContainer.alpha = 0;
        this.scene.gameplayPageContainer.alpha = 1;
        this.scene.tapToStart.visible = true;
        // console.log("The tap to start.............",this.scene.scene.scene.gamePlayBg);
        this.scene.scene.scene.gamePlayBg.setInteractive();
    }

    TapToStartBttnPressed()
    {
        // console.log("The tapstostrat................."+this.tapToStart.visible);

        if(this.tapBttnCounter == 0)
        {
            if(this.tapToStart.visible)
            {
                SoundManager.PlayButtonClickSound();
                this.tapToStart.visible = false;
                // this.ball.body.setGravityY(100);
                let rand = Math.floor(Math.random() * (2 - 0) + 0);
                // console.log("Int rand.................."+rand);
                if(rand == 0)
                {
                    this.ball.body.setVelocity(Math.floor(Math.random() * (600 - (500)) + (500)), Math.floor(Math.random() * (600 - (500)) + (500)));
                }
                else
                {
                    this.ball.body.setVelocity(Math.floor(Math.random() * (700 - (600)) + (600)), Math.floor(Math.random() * (700 - (600)) + (600)));
                }

                // this.ball.body.setVelocity(100,700);
                // this.ball.body.setVelocity(this.bodyVelocity, this.bodyVelocity);
                this.ball.body.setAngularVelocity(0.01);
                this.ball.body.setBounce(1, 1);
                this.colliderBgLeft.body.immovable = true;
                this.colliderBgRight.body.immovable = true;
                this.colliderBgUp.body.immovable = true;    
                this.colliderBgDown.body.immovable = true;
                this.tapBttnCounter++;
            }
        }
        else{
            // this.tapToStart.visible = true;
            this.gameplayBttmContainer.visible = true;
            this.colliderBgDown.body.enable = true;
            // this.overlapDown.setScale(scaleFactor*800,scaleFactor*10);
            setTimeout(() => {
                this.gameplayBttmContainer.visible = false;
                this.colliderBgDown.body.enable = false;
            }, 500);
        }
    } 
    CollisionCheckWithObstacle() {
        this.physics.add.overlap(this.ball, this.colliderBgDown, this.GetResult, null, this);
        this.physics.add.overlap(this.ball, this.colliderBgLeft, this.GetResult, null, this);
        this.physics.add.overlap(this.ball, this.colliderBgRight, this.GetResult, null, this);
        this.physics.add.overlap(this.ball, this.colliderBgUp, this.GetResult, null, this);
    }  
    GetResult(_player, _obstacle) {
        if(!this.isGameOver)
        {
            if(this.tapBttnCounter > 0)
            {
                // console.log("Collision Happens..............Player"+_obstacle.index);
                if(_obstacle.index == 0){               //Collision with Right,Up Collider
                    this.score+=3;
                }
                else if(_obstacle.index == 2)           //Collision with Left Collider
                {
                    this.score+=3;
                    // console.log("The body velocity..................."+_player.body.velocity.x);

                }
                else{                                   //Collision with Down Collider
                    if(_player.body.velocity.x > 0 && _player.body.velocity.y > 0)
                    {
                        _player.body.setVelocity(_player.body.velocity.x+this.ballspeed, _player.body.velocity.y+this.ballspeed);
                    }
                    else if(_player.body.velocity.x < 0 && _player.body.velocity.y >0)
                    {
                        _player.body.setVelocity(_player.body.velocity.x-this.ballspeed, _player.body.velocity.y+this.ballspeed);
                    }
                    else if(_player.body.velocity.x < 0 && _player.body.velocity.y < 0)
                    {
                        _player.body.setVelocity(_player.body.velocity.x-this.ballspeed, _player.body.velocity.y-this.ballspeed);
                    }
                    else if(_player.body.velocity.x > 0 && _player.body.velocity.y < 0)
                    {
                        _player.body.setVelocity(_player.body.velocity.x+this.ballspeed, _player.body.velocity.y-this.ballspeed);
                    }
                    this.score+=50;
                    this.count++;
                    this.midScore.text = this.count;
                    // this.bodyVelocity+= 50;
                }
                this.RedLineAnimation();
            }
        }
    }
    update()
    {
        if(!this.isGameOver)
        {
            if(this.checkOverlap(this.ball,this.overlapBttmLine))
            {
                // console.log("Bottom Line Game Over..............");
                this.isGameOver = true;
                SoundManager.PlayGameOverSound();
                setTimeout(() => {
                    this.ResetGame();
                }, 200);
            }
        }
    }
    RedLineAnimation()
    {
        SoundManager.PlayHitSound();
        this.redLine.visible = true;
        this.gameplayScore.text = this.score;
        // this.count++;
        // this.midScore.text = this.count;
        setTimeout(() => {
            for(let i = 0;i<3;i++)
            {
                this.emitter0 = this.add.particles('red').createEmitter({
                    x: 0,
                    y: 0,
                    speed: { min: -800, max: 800 },
                    angle: { min: 0, max: 360 },
                    scale: { start: 0.1, end: 0 },
                    blendMode: 'ADD',
                    //active: false,
                    lifespan: 300,
                    gravityY: 800
                });
                this.emitter0.setPosition(this.ball.x+50, this.ball.y+50);
                this.emitter0.explode();
            }
        }, 100);
        // this.count++;
        // this.midScore.text = this.count;
        this.redLine.play('redLineAnim');
        this.redLine.on('animationcomplete',this.RedLineAnimationComplete);
    }
    RedLineAnimationComplete()
    {
        this.scene.redLine.visible = false;
        // setTimeout(() => {
        //     this.scene.checkCollisionCounter = 0; 
        // }, (this.scene.ball.body.velocity.x-800));
    }
    checkOverlap(spriteA, spriteB) {
	    let boundsA = spriteA.getBounds();
	    let boundsB = spriteB.getBounds();
	    return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
	}
    ResetGame()
    {
        // console.log("The score.............."+this.score+"The high score................."+this.highScore);
        if(this.highScore<this.score)
        {
            this.highScore = this.score;
            localStorage.setItem("high_score", this.highScore);
            Utils.CreateScoreObject(this.highScore,localStorage.getItem("neon_ball_is_sound_on"));
            // console.log("........................."+this.highScore);
        }
        this.bodyVelocity = 700;
        this.highScoreTxt.text = "HIGH SCORE : "+this.highScore;
        this.scoreTxt.text = "SCORE : "+this.score;
        this.titlePageContainer.alpha = 1;
        this.gameplayPageContainer.alpha = 0;
        this.tapBttnCounter = 0;
        this.checkCollisionCounter = 0;
        this.score = 0;
        this.count = 0;
        this.ball.setPosition(Math.round(game.config.width / 3.5), Math.round(game.config.height / 4.5));
        this.ball.setVelocity(0,0);
        this.isGameOver = false;
        this.gameplayScore.text = 0;
        this.midScore.text = 0;
        // this.gamePlayBg.setInteractive(false);
    }
}