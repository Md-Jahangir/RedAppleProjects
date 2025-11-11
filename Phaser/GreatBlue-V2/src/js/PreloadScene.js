import { Model } from "./Model.js";
import { Server } from "./Server.js";
import { SoundManager } from "./SoundManager.js";
import InactiveGamePopup from "./popups/InactiveGamePopup.js";
import { Constant } from "./Constant.js";

export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super('PreloadScene');
        this.progressBar = null;
        this.loadingText = null;
        this.slotData = null;
        this.inactiveGamePopup = null;
        this.fonts = {
            "Roboto_Regular": null,
            "Roboto_Bold": null,
        }
    };

    preload() {
        this.load.image('loading_bg', 'assets/images/gameplay/loading_bg.png');
        this.load.image('gameplay_bg', 'assets/images/gameplay/gameplay_bg.png');
        this.load.image('great_blue_heading', 'assets/images/gameplay/great_blue_heading.png');
        this.load.image('progress_base', 'assets/images/gameplay/progress_base.png');
        this.load.image('progress_bar', 'assets/images/gameplay/progress_bar.png');
        //POPUP
        this.load.image('popup_base', 'assets/images/popups/popup_base.png');
        this.load.image('overlay', 'assets/images/popups/overlay.png');
        this.load.image('cross_button', 'assets/images/popups/cross_button.png');
    };

    create() {
        this.splashBg = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2), "loading_bg").setOrigin(0.5, 0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        this.splashLogo = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2), "great_blue_heading").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.progressBase = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 1.25), "progress_base").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.progressBar = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 1.25), "progress_bar").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.progressBar.setCrop(0, 0, 0, this.progressBar.height);

        this.loadFonts();
    }

    //======================================
    loadFonts() {
        let propNames = Object.getOwnPropertyNames(this.fonts);
        propNames.forEach((fontName, index) => {
            let isLast = index >= propNames.length - 1;
            this.fonts[fontName] = new FontFaceObserver(fontName);
            this.fonts[fontName].load().then(this.fontLoadSuccess.bind(this, fontName, isLast), this.fontLoadError.bind(this, fontName));
        });
    };

    fontLoadSuccess(fontName, isLast) {
        if (isLast) {
            if (Server.isUrlParamsMissing()) {
                this.scene.start("GameErrorScene");
            } else {
                this.CallInitialDataAPI();
            }
        }
    };

    async CallInitialDataAPI() {
        let initialData = await Server.getInitialData();

        if (!initialData.error) {
            if (initialData.data.status) {
                if (initialData.data.result.length == 0) {
                    this.scene.start("GameErrorScene");
                } else {
                    this.OnInitialDataReceived(initialData.data.result);
                }
            } else {
                //SHOW popup 
                this.inactiveGamePopup = new InactiveGamePopup(this, initialData.data.msg);
            }
        } else {
            this.inactiveGamePopup = new InactiveGamePopup(this, initialData.message);
        }
        // if (initialData.data.length == 0) {
        //     this.scene.start("GameErrorScene");
        // } else {
        //     this.OnInitialDataReceived(initialData.data);
        // }
    }
    OnInitialDataReceived(data) {
        console.log("OnInitialDataReceived data: ", data);
        Model.setBalance(data.balance);
        Model.setBetsValues(data.betsValues);
        Model.setPaylines(data.paylines);
        Model.SetLineNumber(data.paylines.length);
        Model.SetBetAmountValue(data.betAmountValue);
        this.loadAssets();
    }

    fontLoadError(fontName) { };

    loadAssets() {
        this.load.on('progress', this.loadProgress, this);
        this.load.on('complete', this.complete, { scene: this.scene });

        let frameWidth = 309;
        let frameHeight = 244;

        // //POPUP
        // this.load.image('popup_base', 'assets/images/popups/popup_base.png');
        // this.load.image('overlay', 'assets/images/popups/overlay.png');
        // this.load.image('cross_button', 'assets/images/popups/cross_button.png');

        //GAMEPLAY
        this.load.image('one_pixel_white', 'assets/images/gameplay/one_pixel_white.png');
        this.load.image('transparent_image', 'assets/images/gameplay/transparent_image.png');
        this.load.image('great_blue_heading_with_truck', 'assets/images/gameplay/great_blue_heading_with_truck.png');

        for (let i = 1; i <= 25; i++) {
            this.load.spritesheet('number_' + i, 'assets/images/gameplay/lineNumbers/number_' + i + '.png', { frameWidth: 140, frameHeight: 55 });
        }

        //FreeSpin
        this.load.image('free_spin_heading', 'assets/images/gameplay/freeSpin/free_spin_heading.png');
        this.load.image('free_spin_overlay', 'assets/images/gameplay/freeSpin/free_spin_overlay.png');
        this.load.image('free_spin_bg', 'assets/images/gameplay/freeSpin/free_spin_bg.png');
        this.load.image('free_spin_popup_base', 'assets/images/gameplay/freeSpin/free_spin_popup_base.png');
        this.load.image('spins_heading', 'assets/images/gameplay/freeSpin/spins_heading.png');
        this.load.image('multiplier_heading', 'assets/images/gameplay/freeSpin/multiplier_heading.png');
        this.load.image('you_win_heading', 'assets/images/gameplay/freeSpin/you_win_heading.png');
        this.load.image('continue_button', 'assets/images/gameplay/freeSpin/continue_button.png');

        this.load.spritesheet("scatter_spritesheet", "assets/images/gameplay/freeSpin/scatter_spritesheet.png", { frameWidth: 451, frameHeight: 408 });

        //Bottom Panel
        this.load.image('auto_spin_button', 'assets/images/gameplay/bottomPanel/auto_spin_button.png');
        this.load.image('stop_auto_spin_button', 'assets/images/gameplay/bottomPanel/stop_auto_spin_button.png');
        this.load.image('auto_spin_glow', 'assets/images/gameplay/bottomPanel/auto_spin_glow.png');
        this.load.image('gameplay_back_button', 'assets/images/gameplay/bottomPanel/back_button.png');
        this.load.image('back_glow', 'assets/images/gameplay/bottomPanel/back_glow.png');
        this.load.image('big_win_base', 'assets/images/gameplay/bottomPanel/big_win_base.png');
        this.load.image('bottom_panel_bg', 'assets/images/gameplay/bottomPanel/bottom_panel_bg.png');
        this.load.image('line_bet_base', 'assets/images/gameplay/bottomPanel/line_bet_base.png');
        this.load.image('line_bet_minus_button', 'assets/images/gameplay/bottomPanel/line_bet_minus_button.png');
        this.load.image('line_bet_plus_button', 'assets/images/gameplay/bottomPanel/line_bet_plus_button.png');
        this.load.image('line_bet_plus_minus_glow', 'assets/images/gameplay/bottomPanel/line_bet_plus_minus_glow.png');

        this.load.image('line_base', 'assets/images/gameplay/bottomPanel/line_base.png');
        this.load.image('line_minus_button', 'assets/images/gameplay/bottomPanel/line_minus_button.png');
        this.load.image('line_plus_button', 'assets/images/gameplay/bottomPanel/line_plus_button.png');
        this.load.image('line_plus_minus_glow', 'assets/images/gameplay/bottomPanel/line_plus_minus_glow.png');
        this.load.image('message_base', 'assets/images/gameplay/bottomPanel/message_base.png');
        this.load.image('spin_button', 'assets/images/gameplay/bottomPanel/spin_button.png');
        this.load.image('stop_button', 'assets/images/gameplay/bottomPanel/stop_button.png');
        this.load.image('spin_glow', 'assets/images/gameplay/bottomPanel/spin_glow.png');
        this.load.image('total_bet_base', 'assets/images/gameplay/bottomPanel/total_bet_base.png');

        //REEL AND SYMBOLS
        //symbols
        this.load.image('reel_bg', 'assets/images/gameplay/reel/reel_bg.png');

        this.load.image("symbol_9", "assets/images/gameplay/reel/symbols/9.png");
        this.load.image("symbol_10", "assets/images/gameplay/reel/symbols/10.png");
        this.load.image("symbol_goldFish", "assets/images/gameplay/reel/symbols/goldFish.png");
        this.load.image("symbol_j", "assets/images/gameplay/reel/symbols/j.png");
        this.load.image("symbol_a", "assets/images/gameplay/reel/symbols/a.png");
        this.load.image("symbol_k", "assets/images/gameplay/reel/symbols/k.png");
        this.load.image("symbol_q", "assets/images/gameplay/reel/symbols/q.png");
        this.load.image("symbol_scatter", "assets/images/gameplay/reel/symbols/scatter.png");
        this.load.image("symbol_seaHorse", "assets/images/gameplay/reel/symbols/seaHorse.png");
        this.load.image("symbol_shark", "assets/images/gameplay/reel/symbols/shark.png");
        this.load.image("symbol_starFish", "assets/images/gameplay/reel/symbols/starFish.png");
        this.load.image("symbol_turtle", "assets/images/gameplay/reel/symbols/turtle.png");
        this.load.image("symbol_wild", "assets/images/gameplay/reel/symbols/wild.png");

        this.load.spritesheet("animation_symbol_9", "assets/images/gameplay/reel/symbols/animation/9.png", { frameWidth: frameWidth, frameHeight: frameHeight });
        this.load.spritesheet("animation_symbol_10", "assets/images/gameplay/reel/symbols/animation/10.png", { frameWidth: frameWidth, frameHeight: frameHeight });
        this.load.spritesheet("animation_symbol_goldFish", "assets/images/gameplay/reel/symbols/animation/goldFish.png", { frameWidth: frameWidth, frameHeight: frameHeight });
        this.load.spritesheet("animation_symbol_j", "assets/images/gameplay/reel/symbols/animation/j.png", { frameWidth: frameWidth, frameHeight: frameHeight });
        this.load.spritesheet("animation_symbol_a", "assets/images/gameplay/reel/symbols/animation/a.png", { frameWidth: frameWidth, frameHeight: frameHeight });
        this.load.spritesheet("animation_symbol_k", "assets/images/gameplay/reel/symbols/animation/k.png", { frameWidth: frameWidth, frameHeight: frameHeight });
        this.load.spritesheet("animation_symbol_q", "assets/images/gameplay/reel/symbols/animation/q.png", { frameWidth: frameWidth, frameHeight: frameHeight });
        this.load.spritesheet("animation_symbol_scatter", "assets/images/gameplay/reel/symbols/animation/scatter.png", { frameWidth: frameWidth, frameHeight: frameHeight });
        this.load.spritesheet("animation_symbol_seaHorse", "assets/images/gameplay/reel/symbols/animation/seaHorse.png", { frameWidth: frameWidth, frameHeight: frameHeight });
        this.load.spritesheet("animation_symbol_shark", "assets/images/gameplay/reel/symbols/animation/shark.png", { frameWidth: frameWidth, frameHeight: frameHeight });
        this.load.spritesheet("animation_symbol_turtle", "assets/images/gameplay/reel/symbols/animation/turtle.png", { frameWidth: frameWidth, frameHeight: frameHeight });
        this.load.spritesheet("animation_symbol_wild", "assets/images/gameplay/reel/symbols/animation/wild.png", { frameWidth: frameWidth, frameHeight: frameHeight });
        this.load.spritesheet("animation_symbol_starFish", "assets/images/gameplay/reel/symbols/animation/starFish.png", { frameWidth: frameWidth, frameHeight: frameHeight });

        this.load.spritesheet("symbol_spin_animation", "assets/images/gameplay/reel/symbols/animation/spin.png", { frameWidth: frameWidth, frameHeight: frameHeight });

        //AUDIO
        this.load.audio('button_click_sound', 'assets/sounds/button_click_sound.mp3');
        this.load.audio('payline_showing_continously_sound', 'assets/sounds/payline_showing_continously_sound.mp3');
        this.load.audio('payline_wins_sound', 'assets/sounds/payline_wins_sound.mp3');
        this.load.audio('spin_button_click_sound', 'assets/sounds/spin_button_click_sound.mp3');
        this.load.audio('spin_stop_sound', 'assets/sounds/spin_stop_sound.mp3');
        this.load.audio('spin_ongoing_sound', 'assets/sounds/spin_ongoing_sound.mp3');
        this.load.audio('payline_wins_multiple_sound', 'assets/sounds/payline_wins_multiple_sound.mp3');


        this.load.start();


    }

    loadProgress(percentage) {
        this.progressBar.setCrop(0, 0, this.progressBar.width * percentage, this.progressBar.height);
        percentage = percentage * 100;
    }
    complete() {
        setTimeout(() => {
            SoundManager.CreateSound();
            this.scene.start("GameScene");
        }, 1000);
    }

}