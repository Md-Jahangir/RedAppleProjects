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
        this.load.image('gameplay_bg', 'assets/images/gameplay/gameplay_bg.png');
        this.load.image('highway_heading', 'assets/images/gameplay/highway_heading.png');
        this.load.image('progress_base', 'assets/images/gameplay/progress_base.png');
        this.load.image('progress_bar', 'assets/images/gameplay/progress_bar.png');
        //POPUP
        this.load.image('popup_base', 'assets/images/popups/popup_base.png');
        this.load.image('overlay', 'assets/images/popups/overlay.png');
        this.load.image('cross_button', 'assets/images/popups/cross_button.png');
    };

    create() {
        this.splashBg = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2), "gameplay_bg").setOrigin(0.5, 0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        this.splashLogo = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2), "highway_heading").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
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
        this.load.image('highway_heading_with_truck', 'assets/images/gameplay/highway_heading_with_truck.png');

        for (let i = 1; i <= 9; i++) {
            this.load.spritesheet('left_' + i, 'assets/images/gameplay/leftLines/left_' + i + '.png', { frameWidth: 138.5, frameHeight: 68 });
        }
        for (let j = 1; j <= 9; j++) {
            this.load.spritesheet('right_' + j, 'assets/images/gameplay/rightLines/right_' + j + '.png', { frameWidth: 138.5, frameHeight: 68 });
        }

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

        this.load.image("symbol_dice", "assets/images/gameplay/reel/symbols/dice.png");
        this.load.image("symbol_gasPump", "assets/images/gameplay/reel/symbols/gas_pump.png");
        this.load.image("symbol_gasoline", "assets/images/gameplay/reel/symbols/gasoline.png");
        this.load.image("symbol_greenTruck", "assets/images/gameplay/reel/symbols/green_truck.png");
        this.load.image("symbol_piston", "assets/images/gameplay/reel/symbols/piston.png");
        this.load.image("symbol_redTruck", "assets/images/gameplay/reel/symbols/red_truck.png");
        this.load.image("symbol_scatter", "assets/images/gameplay/reel/symbols/scatter.png");
        this.load.image("symbol_sparkPlug", "assets/images/gameplay/reel/symbols/spark_plug.png");
        this.load.image("symbol_steeringWheel", "assets/images/gameplay/reel/symbols/steering_wheel.png");
        this.load.image("symbol_tire", "assets/images/gameplay/reel/symbols/tire.png");
        this.load.image("symbol_wild", "assets/images/gameplay/reel/symbols/wild.png");
        this.load.image("symbol_yellowTruck", "assets/images/gameplay/reel/symbols/yellow_truck.png");

        //symbols winning animation
        this.load.spritesheet("animation_symbol_dice", "assets/images/gameplay/reel/symbols/animation/dice.png", { frameWidth: frameWidth, frameHeight: frameHeight });
        this.load.spritesheet("animation_symbol_gasPump", "assets/images/gameplay/reel/symbols/animation/gas_pump.png", { frameWidth: frameWidth, frameHeight: frameHeight });
        this.load.spritesheet("animation_symbol_gasoline", "assets/images/gameplay/reel/symbols/animation/gasoline.png", { frameWidth: frameWidth, frameHeight: frameHeight });
        this.load.spritesheet("animation_symbol_greenTruck", "assets/images/gameplay/reel/symbols/animation/green_truck.png", { frameWidth: frameWidth, frameHeight: frameHeight });
        this.load.spritesheet("animation_symbol_piston", "assets/images/gameplay/reel/symbols/animation/piston.png", { frameWidth: frameWidth, frameHeight: frameHeight });
        this.load.spritesheet("animation_symbol_redTruck", "assets/images/gameplay/reel/symbols/animation/red_truck.png", { frameWidth: frameWidth, frameHeight: frameHeight });
        this.load.spritesheet("animation_symbol_scatter", "assets/images/gameplay/reel/symbols/animation/scatter.png", { frameWidth: frameWidth, frameHeight: frameHeight });
        this.load.spritesheet("animation_symbol_sparkPlug", "assets/images/gameplay/reel/symbols/animation/spark_plug.png", { frameWidth: frameWidth, frameHeight: frameHeight });
        this.load.spritesheet("animation_symbol_steeringWheel", "assets/images/gameplay/reel/symbols/animation/steering_wheel.png", { frameWidth: frameWidth, frameHeight: frameHeight });
        this.load.spritesheet("animation_symbol_tire", "assets/images/gameplay/reel/symbols/animation/tire.png", { frameWidth: frameWidth, frameHeight: frameHeight });
        this.load.spritesheet("animation_symbol_wild", "assets/images/gameplay/reel/symbols/animation/wild.png", { frameWidth: frameWidth, frameHeight: frameHeight });
        this.load.spritesheet("animation_symbol_yellowTruck", "assets/images/gameplay/reel/symbols/animation/yellow_truck.png", { frameWidth: frameWidth, frameHeight: frameHeight });

        this.load.spritesheet("symbol_spin_animation", "assets/images/gameplay/reel/symbols/animation/spin.png", { frameWidth: frameWidth, frameHeight: frameHeight });

        //AUDIO
        this.load.audio('button_click_sound', 'assets/sounds/button_click_sound.mp3');
        this.load.audio('payline_showing_continously_sound', 'assets/sounds/payline_showing_continously_sound.mp3');
        this.load.audio('payline_wins_sound', 'assets/sounds/payline_wins_sound.mp3');
        this.load.audio('spin_button_click_sound', 'assets/sounds/spin_button_click_sound.mp3');
        this.load.audio('spin_stop_sound', 'assets/sounds/spin_stop_sound.mp3');
        this.load.audio('single_payline_sound', 'assets/sounds/single_payline_sound.mp3');
        // this.load.audio('multiple_payline_sound', 'assets/sounds/multiple_payline_sound.mp3');

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