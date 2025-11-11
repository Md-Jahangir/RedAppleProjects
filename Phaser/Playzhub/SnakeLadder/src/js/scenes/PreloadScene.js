import { Constant } from "../Constant.js";
import { Utils } from "../Utils.js";
import FontFaceObserver from "fontfaceobserver";
import { PlayzhubEventHandler } from "../PlayzhubEventHandler.js";
import { AudioManager } from "../media/AudioManager.js";
import * as GA from 'gameanalytics';

export default class PreloadScene extends Phaser.Scene {

    constructor() {

        super('PreloadScene');

        this.progressBar = null;
        this.loadingText = null;
        this.isSpectator = null;
        this.localUserdata = null;
        this.fonts = {
            'LuckiestGuy-Regular': null,
            'GROBOLD': null
        };
        // this.client = new Client();
    }

    preload() {
        //SPLASH

    };

    create() {
        Constant.currentScene = 'PreloadScene';
        this.game.events.on('resize', this.resize, this);
        this.loadArray = [];
        // const getgameBg = document.getElementById('splash');
        // const errorLogo = document.getElementById("error_logo");
        const getLogo = document.getElementById('logo');
        // const getProgressbase = document.getElementById('progress_base');
        // const getProgressBar = document.getElementById('progress_bar');
        this.loadArray.push(getLogo);
        for (let index = 0; index < this.loadArray.length; index++) {
            const element = this.loadArray[index];

            if (element.complete) {
                this.loadHTMLImage(element);
            } else {
                element.onload = () => this.loadHTMLImage(element);
            }
        }

        // this.loadingText = this.add.text(0, 0, "Loading...", { fontFamily: 'LuckiestGuy-Regular', fontSize: '64px', fill: '#ffffff', fontStyle: 'bold', align: 'center' }).setOrigin(0.5).setVisible(false);
        // this.loadingText.setStroke('#f9d08a', 5);
        // this.loadingText.setShadow(0, 5, '#e48a37', 2, true, false);

        // this.progressBar.setCrop(0, 0, 0, this.progressBar.height);

        this.SetClientSize();
        this.LoadFonts();
        // Constant.game.events.on('eventGetUserData', this.ReceiveUserData, this);

        GA.GameAnalytics.addProgressionEvent(
            "Start",
            "game_loading"
        );
    }

    SetClientSize() {
        let clientHeight, clientWidth, widthOffset;
        if (window.innerWidth > window.innerHeight) {
            clientHeight = window.innerHeight;
            Constant.clientHeight = clientHeight;
            clientWidth = (clientHeight / 1.77777777778);
            Constant.clientWidth = clientWidth;
            widthOffset = (window.innerWidth / 2) - (clientWidth / 2);
            // this.resize(clientWidth, clientHeight, widthOffset);
        }
        else {
            clientWidth = window.innerWidth;
            Constant.clientWidth = clientWidth;

            clientHeight = window.innerHeight;
            Constant.clientHeight = clientHeight;

            widthOffset = 0;

        }
        this.resize(clientWidth, clientHeight, widthOffset);
    }

    loadHTMLImage(element) {
        let clientHeight, clientWidth;
        if (window.innerWidth > window.innerHeight) {
            clientHeight = window.innerHeight;
            clientWidth = (clientHeight / 1.77777777778);
        }
        else {
            clientWidth = window.innerWidth;
            Constant.clientWidth = clientWidth;

            clientHeight = window.innerHeight;
            Constant.clientHeight = clientHeight;
        }
        const newScale = Utils.GetScale(1080, 1920, clientWidth, clientHeight);
        if (element.id) {
            const textureKey = element.id;

            // Add the HTML image as a texture in Phaser
            if (!this.textures.exists(textureKey)) {
                this.textures.addImage(textureKey, element);
            }
            // if (textureKey === 'splash') {
            //     this.splashBG = this.add.image(0, 0, 'splash').setOrigin(0);
            //     this.ResizeBg(clientWidth, clientHeight);
            // }
            if (textureKey === 'logo') {
                this.gameLogo = this.add.image(0, 0, 'logo');
                this.ResizeGameLogo(clientWidth, clientHeight, newScale);
            }
            // else if (textureKey === "error_logo") {
            //   this.errorLogo = this.add.image(0, 0, 'error_logo').setOrigin(0);
            //   this.ResizeErrorLogo(clientWidth, clientHeight, newScale);
            // }
            // else if (textureKey === 'progress_base') {
            //     this.progressBase = this.add.image(0, 0, 'progress_base').setOrigin(0.5);
            //     this.ResizeProgressBase(clientWidth, clientHeight, newScale);
            // }
            // else if (textureKey === 'progress_bar') {
            //     this.progressBar = this.add.image(0, 0, 'progress_bar').setOrigin(0.5);
            //     this.progressBar.setCrop(0, 0, this.progressBar.height);
            //     this.ResizeProgressBar(clientWidth, clientHeight, newScale);
            // }
        } else {
            console.warn('Element does not have an ID:', element);
        }
    }

    LoadFonts() {
        let propNames = Object.getOwnPropertyNames(this.fonts);
        propNames.forEach((fontName, index) => {
            if (!this.fonts[fontName]) { // Check if the font is not already loaded
                console.log("Loading font", fontName);
                let isLast = index >= propNames.length - 1;
                this.fonts[fontName] = new FontFaceObserver(fontName);
                this.fonts[fontName].load().then(this.FontLoadSuccess.bind(this, fontName, isLast), this.FontLoadError.bind(this, fontName));
            }
        });
    };

    FontLoadSuccess(fontName, isLast) {
        if (isLast) {

            console.log("Successfully loaded", fontName, isLast);
            // if (Server.IsUrlParamsMissing()) {
            //     // this.scene.start("GameErrorScene");
            // } else {
            //     this.LoadAssests();
            //     // Client.RequestForPlayerData();
            // }
            // Client.ListenSpectatorWatchData();
            // this.loadingText.setVisible(true);
            this.LoadAssests();


        }
    };

    FontLoadError(fontName) { };

    LoadAssests() {
        PlayzhubEventHandler.GameLoadingStarted();
        // this.load.on('progress', this.LoadProgress, this);
        // this.load.on('complete', this.OnComplete, { scene: this.scene, client: this.client });
        this.load.on('complete', this.OnComplete, { scene: this.scene });

        this.load.image('splash', 'assets/images/bg/splash_bg.png');
        this.load.image('board', 'assets/images/board.png');
        this.load.atlas('ui', 'assets/images/snl_ui.png', 'assets/images/snl_ui.json');
        this.load.atlas('game_obj', 'assets/images/game_obj.png', 'assets/images/game_obj.json');
        this.load.image('game_bg', 'assets/images/bg/game_bg.png');
        this.load.image('ldr', 'assets/images/ladder.png');
        this.load.json('player_data', 'assets/json/player_obj.json');
        this.load.json('lvl_data', 'assets/json/level_data.json');
        this.load.image('overlay', 'assets/images/overlays/overlay.png');
        this.load.image('turn_overlay', 'assets/images/overlays/turn_overlay.png');
        this.load.image('rules_overlay', 'assets/images/overlays/rules_overlay.png');
        this.load.image('rules_base', 'assets/images/bases/rules_popup.png');
        this.load.image("white_flare", "assets/images/white_flare.png");
        this.load.image("score_base", "assets/images/bases/score_base.png");
        this.load.image("castle_door", "assets/images/castle_door.png");
        this.load.image("multiplier_base", "assets/images/bases/multiplier_base.png");
        this.load.image("dice_base", "assets/images/bases/dice_base.png");
        for (let i = 1; i < 4; i++)
            this.load.image('shutter_' + i, "assets/images/shutter_" + i + ".png");
        for (let i = 0; i < 2; i++)
            this.load.image('player_' + i, "assets/images/player_" + i + ".png");
        for (let i = 1; i < 5; i++)
            this.load.image('portal_' + i, "assets/images/portal/portal_" + i + ".png");
        this.load.image("reward", "assets/images/reward.png");
        this.load.spritesheet("avatar", "assets/images/avatars.png", { frameWidth: 2097 / 9, frameHeight: 237 / 1 });
        this.load.image("dice_overlay", "assets/images/overlays/dice_base_overlay.png");
        this.load.image("ad_icon", "assets/images/ad_icon.png");

        //Loading Audio
        this.load.audio('click', 'assets/audio/button_click.mp3');
        this.load.audio('coin_collect', 'assets/audio/collect_coin.mp3');
        this.load.audio('footstep', 'assets/audio/footstep.mp3');
        this.load.audio('game_bg_snd', 'assets/audio/game_bg.mp3');
        this.load.audio('hissing', 'assets/audio/hissing.mp3');
        this.load.audio('ladder_up', 'assets/audio/ladder_up.mp3');
        this.load.audio('level_comp', 'assets/audio/level_comp.mp3');
        this.load.audio('level_fail', 'assets/audio/level_fail.wav');
        this.load.audio('dice_roll', 'assets/audio/dice_roll.mp3');

        //Loading Spine
        this.load.spineBinary('splash_data', 'assets/spines/splash_page_animation.skel');
        this.load.spineAtlas('splash_atlas', 'assets/spines/splash_page_animation.atlas');
        this.load.spineBinary('snake_data', 'assets/spines/snake.skel');
        this.load.spineAtlas('snake_atlas', 'assets/spines/snake.atlas');
        this.load.spineBinary('snake_data', 'assets/spines/small_snake.skel');
        this.load.spineAtlas('snake_atlas', 'assets/spines/small_snake.atlas');
        this.load.spineBinary('timer_data', 'assets/spines/timer.skel');
        this.load.spineAtlas('timer_atlas', 'assets/spines/timer.atlas');
        this.load.spineBinary('popup_data', 'assets/spines/popup.skel');
        this.load.spineAtlas('popup_atlas', 'assets/spines/popup.atlas');
        this.load.spineBinary('title_art_data', 'assets/spines/title_art.skel');
        this.load.spineAtlas('title_art_atlas', 'assets/spines/title_art.atlas');

        this.load.start();
    }

    LoadProgress(percentage) {

        // this.progressBar.setCrop(0, 0, this.progressBar.width * percentage, this.progressBar.height);
        // percentage = percentage * 100;
        // this.loadingText.setText("Loading: " + parseInt(percentage) + " %");
    }

    OnComplete() {
        PlayzhubEventHandler.GameLoadingCompleted();
        AudioManager.CreateAudio();
        localStorage.setItem('snl', 1);
        setTimeout(() => {
            this.scene.scene.scene.stop("PreloadScene");
            this.scene.scene.scene.start("MenuScene");
        }, 100);

        GA.GameAnalytics.addProgressionEvent(
            "Complete",
            "game_loading"
        );
    }

    ResizeBg(newWidth, newHeight) {
        this.splashBG.setDisplaySize(newWidth, newHeight);
    }
    ResizeGameLogo(newWidth, newHeight, newScale) {
        this.gameLogo.setScale(newScale);
        this.gameLogo.setPosition(newWidth / 2, newHeight / 2 - (15 * newScale));
    }
    ResizeProgressBase(newWidth, newHeight, newScale) {
        this.progressBase.setScale(newScale);
        this.progressBase.setPosition(
            newWidth / 2,
            newHeight - (177 * this.newScale)
        );
    }
    ResizeProgressBar(newWidth, newHeight, newScale) {
        this.progressBar.setScale(newScale);
        this.progressBar.setPosition(this.progressBase.x, this.progressBase.y - (5 * this.newScale));
    }

    resize(_newWidth, _newHeight, offsetWidth) {
        if (Constant.currentScene !== 'PreloadScene') {
            return;
        }

        console.log("camera offsetwidth", offsetWidth);


        this.newScale = Utils.GetScale(1080, 1920, _newWidth, _newHeight);
        Constant.newScale = this.newScale;

        // if (this.splashBG) {
        //     this.ResizeBg(_newWidth, _newHeight);
        // }
        // if (this.errorLogo) {
        //   this.ResizeErrorLogo(_newWidth, _newHeight, this.newScale);
        // }
        if (this.gameLogo) {
            this.ResizeGameLogo(_newWidth, _newHeight, this.newScale);
        }
        // if (this.progressBase) {
        //     this.ResizeProgressBase(_newWidth, _newHeight, this.newScale);
        // }
        // if (this.progressBar) {
        //     this.ResizeProgressBar(_newWidth, _newHeight, this.newScale);
        // }

        // this.loadingText.setScale(this.newScale);
        // this.loadingText.setPosition(
        //     _newWidth / 2,
        //     (_newHeight) - (270 * this.newScale)
        // );

        const camera = this.cameras.main;
        console.log("camera------------", camera);

        camera.x = offsetWidth;
        // camera.setBounds(0, 0, newWidth, newHeight);
        camera.setViewport(offsetWidth, 0, _newWidth, _newHeight);

    }
}