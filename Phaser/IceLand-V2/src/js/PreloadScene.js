import { Constant } from "./Constant.js";
import { Model } from "./Model.js";
import { Server } from "./Server.js";
import { SoundManager } from "./SoundManager.js";
import InactiveGamePopup from "./popups/InactiveGamePopup.js";

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
        this.load.image('gameplay_bg', 'assets/images/gameplay/gameplay_bg.png');
        this.load.image('loading_bg', 'assets/images/gameplay/loading_bg.png');
        this.load.image('ice_land_heading', 'assets/images/gameplay/ice_land_heading.png');
        this.load.image('progress_base', 'assets/images/gameplay/progress_base.png');
        this.load.image('progress_bar', 'assets/images/gameplay/progress_bar.png');
        this.load.image('loading_logo', 'assets/images/gameplay/loading_logo.png');
        //POPUP
        this.load.image('popup_base', 'assets/images/popups/popup_base.png');
        this.load.image('overlay', 'assets/images/popups/overlay.png');
        this.load.image('cross_button', 'assets/images/popups/cross_button.png');
    };

    create() {
        this.splashBg = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2), "loading_bg").setOrigin(0.5, 0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        this.splashLogo = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2), "loading_logo").setOrigin(0.5, 0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        this.progressBase = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 1.25), "progress_base").setOrigin(0.5, 0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        this.progressBar = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 1.25), "progress_bar").setOrigin(0.5, 0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
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
        console.log("initialData: ", initialData);

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


        // if (initialData.data.status == true) {
        //     if (initialData.data.result.length == 0) {
        //         this.scene.start("GameErrorScene");
        //     } else {
        //         this.OnInitialDataReceived(initialData.data.result);
        //     }
        // } else {
        //     //SHOW popup 
        //     this.inactiveGamePopup = new InactiveGamePopup(this, initialData.data.msg);
        // }


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

        for (let i = 1; i <= 50; i++) {
            this.load.spritesheet('number_' + i, 'assets/images/gameplay/lineNumbers/number_' + i + '.png', { frameWidth: 112, frameHeight: 30 });
        }

        //Free Spin
        this.load.image('free_spin_heading', 'assets/images/gameplay/freeSpin/free_spin_heading.png');
        this.load.image('free_spin_overlay', 'assets/images/gameplay/freeSpin/free_spin_overlay.png');
        this.load.image('free_spin_popup_base', 'assets/images/gameplay/freeSpin/free_spin_popup_base.png');
        this.load.image('you_win_heading', 'assets/images/gameplay/freeSpin/you_win_heading.png');
        this.load.image('continue_button', 'assets/images/gameplay/freeSpin/continue_button.png');


        //Bottom Panel

        this.load.image('auto_spin_button', 'assets/images/gameplay/bottomPanel/auto_spin_button.png');
        this.load.image('stop_auto_spin_button', 'assets/images/gameplay/bottomPanel/stop_auto_spin_button.png');
        this.load.image('auto_spin_glow', 'assets/images/gameplay/bottomPanel/auto_spin_glow.png');
        this.load.image('gameplay_back_button', 'assets/images/gameplay/bottomPanel/back_button.png');
        this.load.image('back_glow', 'assets/images/gameplay/bottomPanel/back_glow.png');
        this.load.image('big_win_base', 'assets/images/gameplay/bottomPanel/big_win_base.png');
        this.load.image('big_win', 'assets/images/gameplay/bottomPanel/big_win.png');
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

        this.load.image("symbol_ace", "assets/images/gameplay/reel/symbols/ace.png");
        this.load.image("symbol_dolphin", "assets/images/gameplay/reel/symbols/dolphin.png");
        this.load.image("symbol_jack", "assets/images/gameplay/reel/symbols/jack.png");
        this.load.image("symbol_king", "assets/images/gameplay/reel/symbols/king.png");
        this.load.image("symbol_nine", "assets/images/gameplay/reel/symbols/nine.png");
        this.load.image("symbol_owl", "assets/images/gameplay/reel/symbols/owl.png");
        this.load.image("symbol_penguin", "assets/images/gameplay/reel/symbols/penguin.png");
        this.load.image("symbol_queen", "assets/images/gameplay/reel/symbols/queen.png");
        this.load.image("symbol_ten", "assets/images/gameplay/reel/symbols/ten.png");
        this.load.image("symbol_walrus", "assets/images/gameplay/reel/symbols/walrus.png");
        this.load.image("symbol_wolf", "assets/images/gameplay/reel/symbols/wolf.png");
        this.load.image("symbol_wild", "assets/images/gameplay/reel/symbols/wild.png");
        this.load.image("symbol_scatter", "assets/images/gameplay/reel/symbols/scatter.png");

        //symbols winning animation
        this.load.spritesheet("animation_symbol_ace", "assets/images/gameplay/reel/symbols/animation/ace.png", { frameWidth: frameWidth, frameHeight: frameHeight });
        this.load.spritesheet("animation_symbol_dolphin", "assets/images/gameplay/reel/symbols/animation/dolphin.png", { frameWidth: frameWidth, frameHeight: frameHeight });
        this.load.spritesheet("animation_symbol_jack", "assets/images/gameplay/reel/symbols/animation/jack.png", { frameWidth: frameWidth, frameHeight: frameHeight });
        this.load.spritesheet("animation_symbol_king", "assets/images/gameplay/reel/symbols/animation/king.png", { frameWidth: frameWidth, frameHeight: frameHeight });
        this.load.spritesheet("animation_symbol_nine", "assets/images/gameplay/reel/symbols/animation/nine.png", { frameWidth: frameWidth, frameHeight: frameHeight });
        this.load.spritesheet("animation_symbol_owl", "assets/images/gameplay/reel/symbols/animation/owl.png", { frameWidth: frameWidth, frameHeight: frameHeight });
        this.load.spritesheet("animation_symbol_penguin", "assets/images/gameplay/reel/symbols/animation/penguin.png", { frameWidth: frameWidth, frameHeight: frameHeight });
        this.load.spritesheet("animation_symbol_queen", "assets/images/gameplay/reel/symbols/animation/queen.png", { frameWidth: frameWidth, frameHeight: frameHeight });
        this.load.spritesheet("animation_symbol_ten", "assets/images/gameplay/reel/symbols/animation/ten.png", { frameWidth: frameWidth, frameHeight: frameHeight });
        this.load.spritesheet("animation_symbol_walrus", "assets/images/gameplay/reel/symbols/animation/walrus.png", { frameWidth: frameWidth, frameHeight: frameHeight });
        this.load.spritesheet("animation_symbol_wolf", "assets/images/gameplay/reel/symbols/animation/wolf.png", { frameWidth: frameWidth, frameHeight: frameHeight });
        this.load.spritesheet("animation_symbol_wild", "assets/images/gameplay/reel/symbols/animation/wild.png", { frameWidth: frameWidth, frameHeight: frameHeight });
        this.load.spritesheet("animation_symbol_scatter", "assets/images/gameplay/reel/symbols/animation/scatter.png", { frameWidth: frameWidth, frameHeight: frameHeight });

        this.load.spritesheet("symbol_spin_animation", "assets/images/gameplay/reel/symbols/animation/spin.png", { frameWidth: frameWidth, frameHeight: frameHeight });
        this.load.image('bear_anim_reel_bg', 'assets/images/gameplay/bottomPanel/bear_anim_reel_bg.png');
        // this.load.spritesheet("bear_run", "assets/images/gameplay/reel/symbols/animation/bear_run.png", { frameWidth: 310, frameHeight: 710 });
        this.load.spritesheet("bear_run", "assets/images/gameplay/reel/symbols/animation/bear_run.png", { frameWidth: 330, frameHeight: 730 });

        //AUDIO
        this.load.audio('button_click_sound', 'assets/sounds/button_click_sound.mp3');
        this.load.audio('payline_showing_continously_sound', 'assets/sounds/payline_showing_continously_sound.mp3');
        this.load.audio('payline_wins_sound', 'assets/sounds/payline_wins_sound.mp3');
        this.load.audio('spin_button_click_sound', 'assets/sounds/spin_button_click_sound.mp3');
        this.load.audio('spin_stop_sound', 'assets/sounds/spin_stop_sound.mp3');
        this.load.audio('bg_music', 'assets/sounds/bg_music.mp3');
        this.load.audio('spin_ongoing_sound', 'assets/sounds/spin_ongoing_sound.mp3');

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