export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super('PreloadScene');
    }

    preload() {
        this.loadAssests();

        GameAnalytics("addProgressionEvent", "Start", "game_loading");
    }

    loadAssests() {
        PlayzhubEventHandler.GameLoadingStarted();
        Server.GetGameDetails();

        this.load.image('one_pixel_white', 'assets/images/one_pixel_white.png');
        this.load.image('ball', 'assets/images/Ball.png');
        this.load.image('bat0', 'assets/images/Bat.png');
        this.load.image('bat1', 'assets/images/Bat1.png');
        this.load.image('bestScoreTxt', 'assets/images/BestScore.png');
        this.load.image('backGround', 'assets/images/bg.png');
        this.load.image('back', 'assets/images/back.png');
        this.load.image('circle', 'assets/images/Circle.png');

        this.load.image('home', 'assets/images/Home.png');
        this.load.image('playTxt', 'assets/images/Play.png');
        this.load.image('roundTxt', 'assets/images/Round.png');
        this.load.image('soundOff', 'assets/images/soundOff.png');
        this.load.image('soundOn', 'assets/images/soundOn.png');
        this.load.image('title', 'assets/images/Title.png');

        this.load.image('quit_bg', 'assets/images/quit_bg.png');
        this.load.image('quit_yes', 'assets/images/quit_yes.png');
        this.load.image('quit_no', 'assets/images/quit_no.png');

        this.load.image('tapToStart', 'assets/images/tapToStart.png');
        this.load.image('roundBg', 'assets/images/roundBg.png');

        this.load.image('spark', 'assets/images/Fireworks.png');


        for (let i = 0; i < 5; i++) {
            this.load.image('Wicket' + i, 'assets/images/WicketAnim/Wicket' + i + '.png');
        }


        this.load.audio('button_click_sound', 'sounds/click-1.mp3');
        this.load.audio('menu_page_audio', 'sounds/BGM01.mp3');
        this.load.audio('gameplay_page_audio', 'sounds/BGM02.mp3');
        this.load.audio('swing', 'sounds/swing.mp3');
        this.load.audio('cheer01', 'sounds/cheer01.mp3');
        this.load.audio('cheer02', 'sounds/cheer02.mp3');
        this.load.audio('cheer03', 'sounds/cheer03.mp3');

        // this.load.audio('hit_sound', 'sounds/hit.mp3');
        // this.load.audio('bg_music', 'sounds/bgm.mp3');
        this.load.start();
    }

    create() {
        // try {
        //     PlayzhubSDk = new PlayzhubSDk_E5(Server.GetGameId(), true);
        //     console.log('PlayzhubSDk Game naalaytics ', PlayzhubSDk);
        // } catch (error) {
        //     console.log('Error in create:', error);
        // }
        this.loadArray = [];
        const getgameBg = document.getElementById("splash_bg");
        const getGameLogo = document.getElementById("logo");
        const getProgressbase = document.getElementById("progress_base");
        const getProgressBar = document.getElementById("progress_bar");
        this.loadArray.push(getgameBg, getGameLogo, getProgressbase, getProgressBar);
        for (let index = 0; index < this.loadArray.length; index++) {
            const element = this.loadArray[index];
            if (element.complete) {
                this.loadHTMLImage(element);
            } else {
                element.onload = () => this.loadHTMLImage(element);
            }
        }
        this.loadingText = this.add.text(game.config.width / 2, game.config.height / 2 + 640, "Loading...", { fontFamily: 'Roboto_Bold', fontSize: "40px", fontStyle: 'bold', align: 'center' }).setOrigin(0.5).setScale(scaleFactor);
        this.load.on('progress', this.loadProgress, this);
        this.load.on('complete', this.complete, { scene: this.scene });
    }
    loadHTMLImage(element) {
        if (element.id) {
            const textureKey = element.id;

            if (!this.textures.exists(textureKey)) {
                this.textures.addImage(textureKey, element);
            }
            if (textureKey === "splash_bg") {
                // this.splashBG = this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2, 'splash_bg').setOrigin(0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
                Utils.SpriteSettingsControl(this, game.config.width / 2, game.config.height / 2, "splash_bg", 0.5, 0.5, scaleFactor * 1.5, scaleFactor * 1.5);
            } else if (textureKey === "logo") {
                Utils.SpriteSettingsControl(this, game.config.width / 2, game.config.height / 2 - 200, "logo", 0.5, 0.5, scaleFactor, scaleFactor);
            }
            else if (textureKey === "progress_base") {
                // this.progressBase = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2) + 650, "progress_base").setOrigin(0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
                Utils.SpriteSettingsControl(this, game.config.width / 2, game.config.height / 2 + 700, "progress_base", 0.5, 0.5, scaleFactor, scaleFactor);
            }
            else if (textureKey === "progress_bar") {
                // this.progressBar = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2) + 650, "progress_bar").setOrigin(0.5).setScale(Constant.scaleFactorX * 1.5, Constant.scaleFactorY);
                this.progressBar = Utils.SpriteSettingsControl(this, game.config.width / 2, game.config.height / 2 + 700, "progress_bar", 0.5, 0.5, scaleFactor, scaleFactor);
                this.progressBar.setCrop(0, 0, 0, this.progressBar.height);

            }
        } else {
            console.warn("Element does not have an ID:", element);
        }
    }

    loadProgress(percentage) {
        if (this.progressBar) {
            this.progressBar.setCrop(0, 0, this.progressBar.width * percentage, this.progressBar.height);
            percentage = percentage * 100;
        }
        this.loadingText.setText("Loading: " + parseInt(percentage) + " %");
    }

    complete() {
        PlayzhubEventHandler.GameLoadingCompleted();
        setTimeout(() => {
            SoundManager.AddSound();
            // SoundManager.PlayMenuPageBgMusic();
            this.scene.start("TitleScene");
        }, 500);

        GameAnalytics("addProgressionEvent", "Complete", "game_loading");
    }

}