export default class TitleScene extends Phaser.Scene {

    constructor() {
        super("TitleScene");
        this.titlePageContainer = null;
        this.gameplayPageContainer = null;
        this.score = 0;
    }
    create() {
        let gamePlayBg = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2), Math.round(game.config.height / 2),
         "defaultBg", 0.5, 0.5, scaleFactor*1.5, scaleFactor*1.5);

        let highscoreTextStyle = { fontFamily: 'burgerjointneon', fontSize: '40px', fill: '#19e6e2', align: 'center' };
        let highScoreTxt =  this.add.text(Math.round(game.config.width /5), Math.round(game.config.height/35), "HIGH SCORE : "+this.score, highscoreTextStyle)
        .setOrigin(0.5, 0.5)
        .setScale(scaleFactor, scaleFactor);
        
        this.soundButton = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 1.077), Math.round(game.config.height / 35), "soundOn", 0.5, 0.5, scaleFactor, scaleFactor, "true", this.SoundButtonPressed, this.SoundButtonReleased);
        this.DefaultSoundButton();
        
        let colliderBg = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2), Math.round(game.config.height / 2),
        "border", 0.5, 0.5, scaleFactor*1.5, scaleFactor*1.5);
        
        let headingTxtStyle = { fontFamily: 'burgerjointneon', fontSize: '85px', fill: '#19e6e2', fontStyle: 'bold',align: 'center' };
        let headTxt =  this.add.text(Math.round(game.config.width/2), Math.round(game.config.height/2.75), "NEON BALL", headingTxtStyle)
        .setOrigin(0.5, 0.5)
        .setScale(scaleFactor, scaleFactor);

        this.playBttn = this.add.text(Math.round(game.config.width/2), Math.round(game.config.height/1.3), "PLAY", headingTxtStyle)
        .setOrigin(0.5, 0.5)
        .setScale(scaleFactor, scaleFactor)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', this.PlayBttnPressed)

        let finalScoreStyle = { fontFamily: 'burgerjointneon', fontSize: '50px', fill: '#f12121',fontStyle: 'bold',align: 'center' };
        let scoreTxt =  this.add.text(Math.round(game.config.width /2), Math.round(game.config.height/1.6), "SCORE : "+this.score, finalScoreStyle)
        .setOrigin(0.5, 0.5)
        .setScale(scaleFactor, scaleFactor);

        let ball = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 3.5), Math.round(game.config.height / 5.3),
        "ball", 0.5, 0.5, scaleFactor*1.5, scaleFactor*1.5);
        
        this.titlePageContainer = this.add.container(0, 0);
        this.titlePageContainer.add([this.playBttn,this.soundButton,highScoreTxt,headTxt,scoreTxt]);


        this.tapToStart = this.add.text(Math.round(game.config.width/2), Math.round(game.config.height/1.3), "TAP TO START", headingTxtStyle)
        .setOrigin(0.5, 0.5)
        .setScale(scaleFactor, scaleFactor)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', this.TapToStartBttnPressed)

        let gameplayScoreStyle = { fontFamily: 'burgerjointneon', fontSize: '80px', fill: '#f12121',fontStyle: 'bold',align: 'center' };
        let gameplayScore =  this.add.text(Math.round(game.config.width /2), Math.round(game.config.height/13), this.score, gameplayScoreStyle)
        .setOrigin(0.5, 0.5)
        .setScale(scaleFactor, scaleFactor);

        let midScoreStyle = { fontFamily: 'burgerjointneon', fontSize: '80px', fill: '#f12121',fontStyle: 'bold',align: 'center' };
        

        this.gameplayPageContainer = this.add.container(0, 0);
        this.gameplayPageContainer.add([this.tapToStart,gameplayScore]);
        this.gameplayPageContainer.alpha = 1;

        // this.title = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2), Math.round(game.config.height / 2), "title", 0.5, 0.5, scaleFactor, scaleFactor);
        // this.title.setScale(0, 0);

        // this.playButtonContainer = this.add.container(0, 0);
        // this.playButton = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2), Math.round(game.config.height / 1.5), "button_base", 0.5, 0.5, scaleFactor, scaleFactor, "true", this.PlayButtonPressed, this.PlayButtonReleased);
        // var playTextStyle = { fontFamily: 'Poppins_Bold', fontSize: '80px', fill: '#fff', fontStyle: 'bold', align: 'center' };
        // this.playText = this.add.text(Math.round(game.config.width / 2), Math.round(game.config.height / 1.5), "PLAY", playTextStyle).setOrigin(0.5, 0.5).setScale(scaleFactor, scaleFactor);
        // this.playButtonContainer.add([this.playButton, this.playText]);
        // this.playButtonContainer.alpha = 0;soundOn

        // this.ShowTitleAndButton();
    }
    DefaultSoundButton() {
        if (localStorage.getItem("neon_ball_is_sound_on") == null) {
            localStorage.setItem("neon_ball_is_sound_on", 1);
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
            // SoundManager.PlayButtonClickSound();
            // SoundManager.StopBgMusic();
        } else {
            localStorage.setItem("neon_ball_is_sound_on", 1);
            this.soundButton.setTexture("soundOn");
            // SoundManager.PlayBgMusic();
        }
    }
    SoundButtonPressed() {
        Utils.ButtonScaleTween(this.scene.scene, this.scene.scene.soundButton, scaleFactor);
        // SoundManager.PlayButtonClickSound();
    }
    SoundButtonReleased() {
        this.ToggleSoundButton();
    }
    PlayBttnPressed()
    {
        this.scene.titlePageContainer.alpha = 0;
        this.scene.gameplayPageContainer.alpha = 1;
    }

    TapToStartBttnPressed()
    {
        // game.scene.stop('TitleScene');
        // game.scene.start('GameScene');
    }
}