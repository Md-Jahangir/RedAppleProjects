import { Server } from "./Server.js";
import { SoundManager } from "./SoundManager.js";
import { Constant } from "./Constant.js";
import { Utils } from "./Utils.js";
import { PlayzhubEventHandler } from "./PlayzhubEventHandler.js";
import * as GA from "gameanalytics";
export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super('PreloadScene');
        this.progressBar = null;
        this.loadingText = null;
        this.fonts = {
            "Poppins_Bold": null,
        }
    }

    preload() { };

    create() {
        Constant.activeScene = 'preload';
        this.game.events.on("resize", this.resize, this);

        this.loadArray = [];
        const getgameBg = document.getElementById("splash_bg");
        const getLogo = document.getElementById("logo");
        const getProgressbase = document.getElementById("progress_base");
        const getProgressBar = document.getElementById("progress_bar");
        this.loadArray.push(getgameBg, getLogo, getProgressbase, getProgressBar);
        for (let index = 0; index < this.loadArray.length; index++) {
            const element = this.loadArray[index];

            if (element.complete) {
                this.loadHTMLImage(element);
            } else {
                element.onload = () => this.loadHTMLImage(element);
            }
        }
        this.loadingText = this.add.text(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 1.2), "Loading: ", { fontFamily: 'Poppins_Bold', fontSize: '46px', fill: '#FFF', fontStyle: "normal", align: 'center' }).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.LoadFonts();

        this.LoadAssests();
        if (window.innerWidth >= (window.innerHeight / 1.7777777)) {
            let clientHeight = window.innerHeight;
            let clientWidth = (clientHeight / 1.77777777778);
            this.resize(clientWidth, clientHeight, (window.innerWidth / 2) - (clientWidth / 2));
        }
        else {
            let clientWidth = window.innerWidth;
            let clientHeight = window.innerHeight;
            this.resize(clientWidth, clientHeight, 0);
        }

        GA.GameAnalytics.addProgressionEvent(
            "Start",
            "game_loading"
        );
    };
    loadHTMLImage(element) {
        let clientHeight, clientWidth;
        if (window.innerWidth >= (window.innerHeight / 1.7777777)) {
            clientHeight = window.innerHeight;
            clientWidth = (clientHeight / 1.77777777778);
        }
        else {
            clientWidth = window.innerWidth;
            clientHeight = window.innerHeight;
        }
        let newScale = Utils.getScale(1080, 1920, clientWidth, clientHeight);
        if (element.id) {
            const textureKey = element.id;

            // Add the HTML image as a texture in Phaser
            if (!this.textures.exists(textureKey)) {
                this.textures.addImage(textureKey, element);
            }
            if (textureKey === "splash_bg") {
                this.splashBg = this.add.image(0, 0, "splash_bg").setOrigin(0);
                this.ResizeSplashBg(clientWidth, clientHeight);
            }
            else if (textureKey === "logo") {
                this.splashLogo = this.add.image(0, 0, "logo").setOrigin(0.5);
                this.ResizeSplashLogo(clientWidth, clientHeight, newScale);
            }
            else if (textureKey === "progress_base") {
                this.progressBase = this.add.image(0, 0, "progress_base").setOrigin(0);
                this.ResizeProgressBase(clientWidth, clientHeight, newScale);
            }
            else if (textureKey === "progress_bar") {
                this.progressBar = this.add.image(0, 0, "progress_bar").setOrigin(0);
                this.progressBar.setCrop(0, 0, 0, this.progressBar.height);
                this.ResizeProgressBar(clientWidth, clientHeight, newScale);
            }
        } else { }
    }


    LoadFonts() {
        let propNames = Object.getOwnPropertyNames(this.fonts);
        propNames.forEach((fontName, index) => {
            let isLast = index >= propNames.length - 1;
            this.fonts[fontName] = new FontFaceObserver(fontName);
            this.fonts[fontName].load().then(this.FontLoadSuccess.bind(this, fontName, isLast), this.FontLoadError.bind(this, fontName));
        });
    };

    FontLoadSuccess(fontName, isLast) {
        if (isLast) {
            Constant.timeToEnd = Server.timerValue;
            this.LoadAssests();
        }
    };
    FontLoadError(fontName) { };

    LoadAssests() {
        PlayzhubEventHandler.GameLoadingStarted();
        this.load.on('progress', this.LoadProgress, this);
        this.load.on('complete', this.OnComplete, { scene: this.scene });

        //MENU
        this.load.image('menu_character_knife', 'assets/images/menu/menu_character_knife.png');
        this.load.image('character_shadow', 'assets/images/menu/character_shadow.png');
        this.load.spritesheet('menu_character', 'assets/images/menu/menu_character_spriteshet.png', { frameWidth: 527, frameHeight: 532 });

        this.load.image('character_glow', 'assets/images/menu/character_glow.png');
        this.load.image('play_button', 'assets/images/menu/play_button.png');
        this.load.image('title', 'assets/images/menu/title.png');
        this.load.image('title_knife', 'assets/images/menu/title_knife.png');
        //GAMEPLAY
        this.load.image('gameplay_bg', 'assets/images/gameplay/gameplay_bg.png');
        this.load.image('back_button', 'assets/images/gameplay/back_button.png');
        this.load.image('sound_on', 'assets/images/gameplay/sound_on.png');
        this.load.image('sound_off', 'assets/images/gameplay/sound_off.png');
        this.load.image('knife', 'assets/images/gameplay/knife.png');
        this.load.spritesheet('target', 'assets/images/gameplay/target.png', { frameWidth: 375, frameHeight: 381 });
        this.load.spritesheet('target_break', 'assets/images/gameplay/target_break.png', { frameWidth: 609, frameHeight: 1075 });
        this.load.image('knife_stand', 'assets/images/gameplay/knife_stand.png');
        this.load.image('knife_stand_knife_base', 'assets/images/gameplay/knife_stand_knife_base.png');

        this.load.image('stand_knife', 'assets/images/gameplay/stand_knife.png');
        this.load.image('obstacle_0', 'assets/images/gameplay/obstacle_0.png');
        this.load.image('obstacle_1', 'assets/images/gameplay/obstacle_1.png');

        //QUIT POPUP
        this.load.image('quit_base', 'assets/images/popup/quit/quit_base.png');
        this.load.image('yes_button', 'assets/images/popup/quit/yes_button.png');
        this.load.image('no_button', 'assets/images/popup/quit/no_button.png');
        this.load.spritesheet('hand', 'assets/images/popup/quit/hand.png', { frameWidth: 256, frameHeight: 256 });

        this.load.image('one_pixel_white', 'assets/images/one_pixel_white.png');
        this.load.image('one_pixel_black', 'assets/images/one_pixel_black.png');
        this.load.image('menu_btn', 'assets/images/popup/gameover/menu_btn.png');
        this.load.image('popup_base', 'assets/images/popup/gameover/popup_base.png');
        this.load.image('replay_btn', 'assets/images/popup/gameover/replay_btn.png');
        // this.load.image('ad_icon', 'assets/images/popup/gameover/ad_icon.png');
        //AUDIO
        this.load.audio('button_click_sound', 'assets/sounds/button_click_sound.mp3');
        this.load.audio('knife_attach_sound', 'assets/sounds/knife_attach_sound.mp3');
        this.load.audio('obstacle_collide_sound', 'assets/sounds/obstacle_collide_sound.mp3');
        this.load.audio('bg_music', 'assets/sounds/bg_music.mp3');

        this.load.start();
    };

    LoadProgress(percentage) {
        this.progressBar.setCrop(0, 0, this.progressBar.width * percentage, this.progressBar.height);
        percentage = percentage * 100;
        this.loadingText.setText("Loading: " + parseInt(percentage) + " %");
    }

    OnComplete() {
        PlayzhubEventHandler.GameLoadingCompleted();
        SoundManager.CreateSound();
        setTimeout(() => {
            Constant.game.scene.stop('PreloadScene');
            this.scene.start("TitleScene");
        }, 1000);
        GA.GameAnalytics.addProgressionEvent(
            "Complete",
            "game_loading"
        );
    }
    ResizeSplashBg(newWidth, newHeight, newScale) {
        this.splashBg.setDisplaySize(newWidth, newHeight);
    }
    ResizeSplashLogo(newWidth, newHeight, newScale) {
        this.splashLogo.setScale(newScale);
        this.splashLogo.setPosition(newWidth / 2, 650 * newScale);
    }
    ResizeProgressBase(newWidth, newHeight, newScale) {
        if (this.progressBase) {

            this.progressBase.setScale(newScale);
            this.progressBase.setPosition(
                newWidth / 2 - 250 * newScale,
                (newHeight) - (360 * newScale)
            );
        }
    }
    ResizeProgressBar(newWidth, newHeight, newScale) {
        if (this.progressBar) {
            this.progressBar.setScale(newScale);
            this.progressBar.setPosition(this.progressBase.x, this.progressBase.y);
        }
    }
    resize(newWidth, newHeight, offsetWidth) {
        if (Constant.activeScene != 'preload') return;
        let newScale = Utils.getScale(1080, 1920, newWidth, newHeight);
        this.ResizeSplashBg(newWidth, newHeight, newScale);
        this.ResizeSplashLogo(newWidth, newHeight, newScale);
        this.ResizeProgressBase(newWidth, newHeight, newScale);
        this.ResizeProgressBar(newWidth, newHeight, newScale);


        this.loadingText.setScale(newScale);
        this.loadingText.setPosition(
            newWidth / 2,
            (newHeight) - (250 * newScale)
        );
        const camera = this.cameras.main;
        camera.x = offsetWidth;
        camera.setViewport(offsetWidth, 0, newWidth, newHeight);
    }

}