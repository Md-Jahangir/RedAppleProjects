// import { Server } from "./Server";

export default class TitleScene extends Phaser.Scene {

    constructor() {
        super("TitleScene");
        this.soundButton;
        this.titleSceneScore = 0;
        this.titleSceneBestScore = 0;
        this.titleSceneScoreTxt;
        this.titleSceneBestScoreTxt;
        this.roundCounter = 0;
    }
    init() {
        roundCounter = 0;
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
        // PlayzhubEventHandler.AdStarted(this.PauseGame.bind(this));
        // PlayzhubEventHandler.AdCompleted(this.ResumeGame.bind(this));

        PlayzhubEventHandler.RequestGameState();
        if (localStorage.getItem("score") == null) {
            // localStorage.setItem("score", 0);
        }
        if (localStorage.getItem("score")) {
            // this.titleSceneScore = localStorage.getItem("score");
        }
        if (localStorage.getItem("hit_the_wicket_high_score") == null) {
            // localStorage.setItem("hit_the_wicket_high_score", 0);
        }
        if (this.titleSceneBestScore < this.titleSceneScore) {
            // this.titleSceneBestScore = this.titleSceneScore;
            // localStorage.setItem("hit_the_wicket_high_score", this.titleSceneScore);
        }
        else {
            // this.titleSceneBestScore = localStorage.getItem("hit_the_wicket_high_score");
        }
        Utils.SpriteSettingsControl(this, game.config.width / 2, game.config.height / 2, "backGround", 0.5, 0.5, scaleFactor * 1.5, scaleFactor * 1.5);
        Utils.SpriteSettingsControl(this, game.config.width / 2, game.config.height / 5.5, "title", 0.5, 0.5, scaleFactor * 1.1, scaleFactor * 1.1);


        Utils.SpriteSettingsControl(this, game.config.width / 2, game.config.height / 2.2, "circle", 0.5, 0.5, scaleFactor * 1.4, scaleFactor * 1.4);

        this.soundButton = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 1.1), Math.round(game.config.height / 24), "soundOn", 0.5, 0.5, scaleFactor * 2, scaleFactor * 2, "true", this.SoundButtonPressed, this.SoundButtonReleased);
        this.DefaultSoundButton();

        let playBttn = this.add.sprite(Math.round(game.config.width / 2), Math.round(game.config.height / 1.16), "playTxt")
            .setOrigin(0.5, 0.5)
            .setScale(scaleFactor * 1.5, scaleFactor * 1.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', this.PlayBttnPressed, this)

        this.tweens.add({
            targets: [playBttn],
            alpha: 0,
            delay: 1000,
            duration: 300,
            ease: 'Power2',
            onComplete: () => {
                // console.log("Animation Complete...................");
                this.tweens.add({
                    targets: [this.playBttn],
                    alpha: 1,
                    duration: 300,
                    ease: 'Power2',
                }, this);
            },
            yoyo: true,
            loop: 1000
        }, this);

        // let bestScore = this.add.sprite(Math.round(game.config.width / 2), Math.round(game.config.height / 1.55), "bestScoreTxt")
        //     .setOrigin(0.5, 0.5)
        //     .setScale(scaleFactor * 0.7, scaleFactor * 0.7);

        let sceneRef = this;
        WebFont.load({
            custom: {
                families: ['burgerjointneon']
            },
            active: function () {
                sceneRef.titleSceneScoreTxt = sceneRef.add.text(Math.round(game.config.width / 2), Math.round(game.config.height / 2.2), sceneRef.titleSceneScore,
                    { fontFamily: 'burgerjointneon', fontSize: '85px', fill: '#ffffff', fontStyle: 'bold', align: 'center' })
                    .setOrigin(0.5, 0.5)
                    .setScale(scaleFactor, scaleFactor);

                sceneRef.titleSceneBestScoreTxt = sceneRef.add.text(Math.round(game.config.width / 2), Math.round(game.config.height / 1.43), '',
                    { fontFamily: 'burgerjointneon', fontSize: '85px', fill: '#ffffff', fontStyle: 'bold', align: 'center' })
                    .setOrigin(0.5, 0.5)
                    .setScale(scaleFactor, scaleFactor);
            }
        });
        PlayzhubEventHandler.ReceivedGameState(this.UpdateGameData.bind(this));

        GameAnalytics("addDesignEvent", "screen:title");
    }

    // PauseGame() {
    //     console.log(' Game paused ');
    //     PlayzhubEventHandler.GamePlayPaused();
    // }

    // ResumeGame() {
    //     console.log(' Game Resumed ');
    //     PlayzhubEventHandler.GamePlayResumed();
    //     setTimeout(() => {
    //         this.scene.start("GameScene", { "score": score, "round": roundCounter });
    //     }, 150);
    // }

    UpdateGameData(data) {
        console.log("Game Data Updated............", data);
        if (data == null) {
            roundCounter = 0;
            this.titleSceneScore = score = 0;
            this.titleSceneScoreTxt.setText(this.titleSceneScore);
            // this.titleSceneBestScoreTxt.setText(this.titleSceneBestScore);
        } else {
            roundCounter = data.round;
            this.titleSceneScore = score = data.game_score;
            this.titleSceneScoreTxt.setText(this.titleSceneScore);
            // this.titleSceneBestScoreTxt.setText(this.titleSceneBestScore);
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
            SoundManager.StopMenuPageBgMusic();
        } else {
            localStorage.setItem("hit_the_wicket_is_sound_on", 1);
            this.soundButton.setTexture("soundOn");
            SoundManager.PlayMenuPageBgMusic();
        }
    }
    SoundButtonPressed() {
        GameAnalytics("addDesignEvent", "ui: sound_clicked");
        Utils.ButtonScaleTween(this.scene.scene, this.scene.scene.soundButton, scaleFactor * 2);
        SoundManager.PlayButtonClickSound();
    }
    SoundButtonReleased() {
        this.ToggleSoundButton();
    }
    PlayBttnPressed() {
        GameAnalytics("addDesignEvent", "ui:play_clicked");
        SoundManager.StopMenuPageBgMusic();
        SoundManager.PlayGameplayPageBgMusic();
        SoundManager.PlayButtonClickSound();
        // PlayzhubEventHandler.RequestAD();
        console.log("Play btn pressed");
        setTimeout(() => {
            this.scene.start("GameScene", { "score": score, "round": roundCounter });
        }, 150);

    }
}