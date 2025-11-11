
import { PlayzhubEventHandler } from "../PlayzhubEventHandler";
import { Server } from "../class/Server";
import { Constant } from "../Constant";
import { SoundManager } from "../SoundManager";
import { Utils } from "../Utils";
import FontFaceObserver from "fontfaceobserver";
import * as GA from "gameanalytics";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
        this.playzHubData = null;
        this.fonts = {
            "Poppins-Bold": null,
        }
    }
    preload() {
        // console.log('preload------');
        // this.load.image('preload-bg', './assets/images/splash/load_bg.png');
        // this.load.image('shadow-overlay', './assets/images/splash/shadow_overlay.png');
        // this.load.image('loading-bar', './assets/images/splash/progress_bar.png');
        // this.load.image('loading-base', './assets/images/splash/progress_base.png');
        // this.load.image('game-logo', './assets/images/splash/game_logo.png');
    }
    create() {
        Constant.activeScene = 'preload';
        this.game.events.on("resize", this.resize, this);
        this.loadArray = [];
        const getgameBg = document.getElementById("splash_bg");
        const getLogo = document.getElementById("game_logo");
        const getShadowOverlay = document.getElementById("shadow_overlay");
        const getProgressbase = document.getElementById("progress_base");
        const getProgressBar = document.getElementById("progress_bar");
        this.loadArray.push(getgameBg, getLogo, getShadowOverlay, getProgressbase, getProgressBar);
        for (let index = 0; index < this.loadArray.length; index++) {
            const element = this.loadArray[index];

            if (element.complete) {
                this.loadHTMLImage(element);
            } else {
                element.onload = () => this.loadHTMLImage(element);
            }
        }

        this.loadingText = this.add.text(0, 0, 'Loading...', { fontFamily: "Poppins-Bold", fontSize: 70 }).setOrigin(0.5);

        this.LoadFonts();
        // console.log(window.innerWidth, window.innerHeight);
        if (window.innerWidth > window.innerHeight) {
            let clientHeight = window.innerHeight;
            let clientWidth = (clientHeight / 1.77777777778);
            Constant.clientWidth = clientWidth;
            Constant.clientHeight = window.innerHeight;
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
    }
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
                this.bg = this.add.image(0, 0, 'splash_bg').setOrigin(0);
                this.ResizeBg(clientWidth, clientHeight);
            }
            else if (textureKey === "game_logo") {
                this.gameLogo = this.add.image(0, 0, 'game_logo');
                this.ResizeGameLogo(clientWidth, clientHeight, newScale);
            }
            else if (textureKey === "shadow_overlay") {
                this.shadowOverlay = this.add.image(0, 0, 'shadow_overlay').setOrigin(0);
                this.ResizeShadow(clientWidth, clientHeight, newScale);
            }
            else if (textureKey === "progress_base") {
                this.progressBase = this.add.image(0, 0, 'progress_base').setOrigin(0.5);
                this.ResizeProgressBase(clientWidth, clientHeight, newScale);
            }
            else if (textureKey === "progress_bar") {
                this.progressBar = this.add.image(0, 0, 'progress_bar').setOrigin(0.5);
                this.progressBar.setCrop(0, 0, this.progressBar.height);
                this.ResizeProgressBar(clientWidth, clientHeight, newScale);
            }
        } else {
            console.warn("Element does not have an ID:", element);
        }
    }
    LoadFonts() {
        let propNames = Object.getOwnPropertyNames(this.fonts);
        propNames.forEach((fontName, index) => {
            let isLast = index >= propNames.length - 1;
            this.fonts[fontName] = new FontFaceObserver(fontName);
            this.fonts[fontName].load().then(this.FontLoadSuccess.bind(this, fontName, isLast), this.FontLoadError.bind(this, fontName));
        });

    }
    FontLoadSuccess(fontName, isLast) {

        if (isLast) {
            // this.scene.stop('PreloadScene');
            this.LoadAssets();
        }
    }
    FontLoadError(fontName) {
        console.log('error');
    }
    LoadAssets() {
        PlayzhubEventHandler.GameLoadingStarted();
        //loading bar
        this.load.on('progress', this.LoadProgress, this);
        this.load.on('complete', this.LoadComplete, this);

        //menu scene assets
        this.load.image('menu_play-but', './assets/images/button/menu_play_but.png');

        //game scene assets
        this.load.image('game-bg', './assets/images/gameplay/game_bg.png');
        this.load.image('ball', './assets/images/gameplay/ball.png');
        this.load.image('ball-shadow', './assets/images/gameplay/ball_shadow.png');
        this.load.image('bubble', './assets/images/gameplay/bubble_particle.png');
        this.load.image('ground', './assets/images/gameplay/Ground.png');
        this.load.image('timer-base', './assets/images/gameplay/timer_base.png');
        this.load.image('timer-bar', './assets/images/gameplay/timer_bar.png');

        //basket right
        this.load.image('basket-right', './assets/images/gameplay/right_basket_board.png');
        this.load.image('basket1', './assets/images/gameplay/right_ring_front.png');
        this.load.image('basket-piece1', './assets/images/gameplay/right_ring_back.png');

        //basket left
        this.load.image('basket-left', './assets/images/gameplay/left_basket_board.png');
        this.load.image('basket2', './assets/images/gameplay/left_ring_front.png');
        this.load.image('basket-piece2', './assets/images/gameplay/left_ring_back.png');

        //Button load 
        this.load.image('pause-but', './assets/images/button/pause_but.png');
        this.load.image('play-but', './assets/images/button/play_but.png');
        this.load.image('restart-but', './assets/images/button/restart_but.png');
        this.load.image('back-but', './assets/images/button/back_but.png');
        this.load.spritesheet('sound-but', './assets/images/button/sound_but.png', { frameWidth: 200 / 2, frameHeight: 103 });

        //popup
        this.load.image('black-overlay', './assets/images/popup/black_overlay.png');
        this.load.image('popup-base', './assets/images/popup/popup_base.png');
        this.load.image('no-but', './assets/images/popup/no_but.png');
        this.load.image('yes-but', './assets/images/popup/yes_but.png');
        this.load.image('tutorial-01', './assets/images/popup/tutorial_01.png');
        this.load.image('tutorial-02', './assets/images/popup/tutorial_02.png');
        this.load.image('skip-but', './assets/images/popup/skip_but.png');
        this.load.image('next-but', './assets/images/popup/next_but.png');
        this.load.image('pre-but', './assets/images/popup/pre_but.png');
        this.load.image('tutorial-play-but', './assets/images/popup/play_but.png');
        this.load.image('menu-but', './assets/images/popup/menu_but.png');
        this.load.image('replay-but', './assets/images/popup/replay_but.png');
        this.load.image('ad-img', './assets/images/popup/ad_img.png');


        //UI Assets
        this.load.image('clock-base', './assets/images/gameplay/clock_base.png');
        this.load.image('score-base', './assets/images/gameplay/score_base.png');

        //one pixel
        this.load.image('one-pixel', './assets/images/gameplay/one-pixel.png');

        //json
        this.load.json('basket-collider', './assets/json/ColliderBasket.json');

        //Audio
        this.load.audio('click-sound', './assets/audio/button_click_sound.mp3');
        this.load.audio('bg-music', './assets/audio/bg_music.mp3');

        this.load.start();


    }
    LoadProgress(_percentage) {
        if (this.progressBar) {
            this.progressBar.setCrop(0, 0, this.progressBar.width * _percentage, this.progressBar.height);
        }
        _percentage = _percentage * 100;
        this.loadingText.setText(`Loading: ${parseInt(_percentage)} %`);
    }
    LoadComplete() {
        PlayzhubEventHandler.GameLoadingCompleted();
        SoundManager.CreateSound();
        setTimeout(() => {
            this.scene.stop('PreloadScene');
            this.scene.start('MenuScene', { isTutorial: true });
        }, 1000)

        GA.GameAnalytics.addProgressionEvent(
            "Complete",
            "game_loading"
        );
    }
    ResizeBg(newWidth, newHeight) {
        this.bg.setDisplaySize(newWidth, newHeight);
    }
    ResizeGameLogo(newWidth, newHeight, newScale) {
        this.gameLogo.setScale(newScale);
        this.gameLogo.setPosition(newWidth / 2, 300 * newScale);
    }
    ResizeProgressBase(newWidth, newHeight, newScale) {
        this.progressBase.setScale(newScale);
        this.progressBase.setPosition(
            newWidth / 2,
            (newHeight) - (120 * newScale)
        );
    }
    ResizeProgressBar(newWidth, newHeight, newScale) {
        this.progressBar.setScale(newScale);
        this.progressBar.setPosition(this.progressBase.x, this.progressBase.y - (5 * newScale));
    }
    ResizeShadow(newWidth, newHeight, newScale) {
        this.shadowOverlay.setDisplaySize(newWidth, newHeight);
    }

    resize(newWidth, newHeight, offsetWidth) {
        if (Constant.activeScene != 'preload') return;
        // console.log(newWidth, newHeight);
        let newScale = Utils.getScale(1080, 1920, newWidth, newHeight);
        if (this.bg) {
            this.ResizeBg(newWidth, newHeight);
        }
        if (this.shadowOverlay) {
            this.ResizeShadow(newWidth, newHeight, newScale);
        }
        if (this.gameLogo) {
            this.ResizeGameLogo(newWidth, newHeight, newScale);
        }
        if (this.progressBase) {
            this.ResizeProgressBase(newWidth, newHeight, newScale);
        }
        if (this.progressBar) {
            this.ResizeProgressBar(newWidth, newHeight, newScale);
        }
        this.loadingText.setScale(newScale);
        this.loadingText.setPosition(
            newWidth / 2,
            (newHeight) - (200 * newScale)
        );
        const camera = this.cameras.main;
        camera.x = offsetWidth;
        // camera.setBounds(0, 0, newWidth, newHeight);

        camera.setViewport(offsetWidth, 0, newWidth, newHeight);
    }


}