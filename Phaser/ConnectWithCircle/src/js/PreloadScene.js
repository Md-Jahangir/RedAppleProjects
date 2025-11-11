import { Constant } from "./Constant.js";
import { PlayzhubEventHandler } from "./PlayzhubEventHandler.js";
import { Server } from "./Server.js";
import * as GA from "gameanalytics";

export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super('PreloadScene');
        this.loadingBase = null;
        this.loadingText = null;
        this.fonts = {
            "Aileron-Regular": null,
            "Aileron-Black": null
        }
    }

    preload() {
        //SPLASH
        // this.load.image("title", "assets/images/menu/title.png");
        // this.load.image("loading_bg", "assets/images/Loading_page/bg.png");
        // this.load.image("loading_base", "assets/images/Loading_page/loading_base.png");
        // this.load.image("loading_text_asset", "assets/images/Loading_page/loading.png");
        // this.load.image("loading_fill", "assets/images/loading_fill.png");


        // for (let i = 0; i < 3; i++) {
        //     this.load.image('shape_' + i, 'assets/images/gameplay/shape_' + i + '.png');
        // }
    };

    create() {
        this.LoadFonts();

        this.loadArray = [];
        const getgameBg = document.getElementById("loading_bg");
        const getLogo = document.getElementById("loading_logo");
        const getProgressbase = document.getElementById("loading_base");
        const getProgressBar = document.getElementById("title");
        const getLoadingText = document.getElementById("loading_logo");
        this.loadArray.push(getgameBg, getLogo, getProgressbase, getProgressBar, getLoadingText);
        for (let index = 0; index < this.loadArray.length; index++) {
            const element = this.loadArray[index];

            if (element.complete) {
                this.loadHTMLImage(element);
            } else {
                element.onload = () => this.loadHTMLImage(element);
            }
        }

        GA.GameAnalytics.addProgressionEvent(
            "Start",
            "game_loading"
        );
    }
    loadHTMLImage(element) {
        if (element.id) {
            const textureKey = element.id;

            // Add the HTML image as a texture in Phaser
            if (!this.textures.exists(textureKey)) {
                console.log(' texture not exists ');
                this.textures.addImage(textureKey, element);
            }
            if (textureKey === "loading_bg") {
                this.loadingBg = this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2, 'loading_bg').setScale(Constant.scaleFactorX, Constant.scaleFactorY).setOrigin(0.5, 0.5);
            }
            else if (textureKey === "title") {
                this.logo = this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2 - (Constant.game.config.height / 9.6), 'title').setScale(Constant.scaleFactorX, Constant.scaleFactorY).setOrigin(0.5, 0.5);
            }
            else if (textureKey === "loading_logo") {
                this.loadingText = this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2 + (Constant.game.config.height / 10), 'loading_logo').setScale(1 * Constant.scaleFactorX, Constant.scaleFactorY).setOrigin(0.5, 0.5);
            }
            else if (textureKey === "loading_base") {
                this.loadingBase = this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2 + (Constant.game.config.height / 6.6), 'loading_base').setScale(Constant.scaleFactorX, Constant.scaleFactorY).setOrigin(0.5, 0.5);
                this.loadingBase.setCrop(0, 0, 0, this.loadingBase.height);
            }
            console.log(`Texture added and displayed: ${textureKey}`);
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
    };

    FontLoadSuccess(fontName, isLast) {
        if (isLast) {
            // if (Server.IsUrlParamsMissing()) {
            //     this.scene.start("GameErrorScene");
            // } else {
            Constant.timeToEnd = Server.timerValue;
            this.LoadAssests();
            // }
        }
    };
    FontLoadError(fontName) { };

    LoadAssests() {
        PlayzhubEventHandler.GameLoadingStarted();
        this.load.on('progress', this.LoadProgress, this);
        this.load.on('complete', this.OnComplete, { scene: this.scene });

        this.load.image("error_logo", "assets/images/error_logo.png");
        this.load.image("target", "assets/images/target.png");

        // menu Assets
        this.load.image("title", "assets/images/menu/title.png");
        this.load.image("play_button", "assets/images/menu/play.png");

        // Info Page

        this.load.image("infoBg", "assets/images/info_page/infoBg.png");
        this.load.image("infoShadow", "assets/images/info_page/infoShadow.png");
        this.load.image("info", "assets/images/info_page/instructionPage1.png");
        this.load.image("info2", "assets/images/info_page/instructionPage2.png");
        this.load.image("back", "assets/images/info_page/back.png");
        this.load.image("play", "assets/images/info_page/play.png");
        this.load.image("next", "assets/images/info_page/next.png");
        this.load.image("backInfo", "assets/images/info_page/backInfo.png");
        this.load.image("sound_on", "assets/images/info_page/sound_on.png");

        this.load.image("dot1", "assets/images/info_page/dot_1.png");
        this.load.image("dot2", "assets/images/info_page/dot_2.png");

        this.load.image("bg_1", "assets/images/gameplay/bg_1.png");
        this.load.image("bg_2", "assets/images/gameplay/bg_2.png");
        this.load.image("bg_3", "assets/images/gameplay/bg_3.png");
        this.load.image("bg_4", "assets/images/gameplay/bg_4.png");
        this.load.image("bg_5", "assets/images/gameplay/bg_5.png");
        this.load.image("lifedown", "assets/images/gameplay/lifedown.png");
        this.load.image("lifefull", "assets/images/gameplay/lifefull.png");
        this.load.image("base", "assets/images/gameplay/base.png");

        this.load.image("menu", "assets/images/gameplay/menu.png");
        this.load.image("replay", "assets/images/gameplay/replay.png");
        this.load.image("stopwatch", "assets/images/gameplay/stopwatch.png");


        // gameplay
        this.load.image("gameBg", "assets/images/gameplay/game_bg.png");
        this.load.image("ball", "assets/images/gameplay/ball.png");
        this.load.image("arm", "assets/images/gameplay/stick.png");
        this.load.spritesheet('sound', 'assets/images/gameplay/soundbuttonsprite.png', { frameWidth: 236 / 2, frameHeight: 118 });

        this.load.image("quit", "assets/images/quit/quit.png");
        this.load.image("no", "assets/images/quit/no.png");
        this.load.image("yes", "assets/images/quit/yes.png");
        this.load.image("ad_icon", "assets/images/ad_icon.png");

        // Audio
        this.load.audio("ball_connect", "assets/sounds/ball_collide.mp3");
        this.load.audio("bg_music", "assets/sounds/bg_music.mp3");
        this.load.audio("button_click_sound", "assets/sounds/button_click_sound.mp3");

        this.load.start();
    };
    LoadingBar() {
        if (!this.loadingBase) return;
        if ((this.loadingBase.scale.x + 0.09) < 1.2) {
            this.loadingBase.scale.x += 0.09;
            this.loadingText.alpha += 0.09;
        } else {
            this.time.removeEvent(this.loadingTimer);
            this.scene.start("TitleScene");
        }
    }

    LoadProgress(percentage) {
        if (this.loadingBase) {
            this.loadingBase.setCrop(0, 0, this.loadingBase.width * percentage, this.loadingBase.height);
        }
    }

    OnComplete() {
        PlayzhubEventHandler.GameLoadingCompleted();
        // SoundManager.CreateSound();
        setTimeout(() => {
            Constant.game.scene.stop('PreloadScene');
            this.scene.start("TitleScene");
            // this.scene.start("GameScene");
        }, 250);

        GA.GameAnalytics.addProgressionEvent(
            "Complete",
            "game_loading"
        );
    }

}
