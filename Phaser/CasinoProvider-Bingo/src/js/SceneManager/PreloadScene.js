import Phaser from 'phaser';
import FontFaceObserver from 'fontfaceobserver';
import { Constant } from '../Constant.js';
import { Utils } from '../Utils.js';
import { SelectedResolution } from '../ResolutionSelector.js';
import { SoundManager } from '../SoundManager.js';
import { Server } from '../Server.js';
import { Model } from '../Model.js';
// import { LanguageService } from './LanguageService.js';
// import { getScale } from './Module.js';
export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super('PreloadScene');
        this.progressBar = null;
        this.loadingText = null;
        this.splashContainer = null;
        this.fonts = {
            // "ARIAL": null,
            "CAMBRIAB": null
        }
    };

    preload() {
        this.load.json("game-config", "assets/config/config.json");
        this.load.image('loading_overlay', 'assets/images/loader/loading_overlay.png');
        this.load.image('loading_bar', 'assets/images/loader/loading_bar.png');
        this.load.image('loading_base', 'assets/images/loader/loading_base.png');
        this.load.image('brand_logo', 'assets/images/loader/brand_logo.png');
    };

    create() {
        // Constant.game.events.on("resize", this.Resize, this);
        this.game.events.on("resize", this.Resize, this);

        this.splashBg = this.add.image(0, 0, "loading_overlay").setOrigin(0);
        this.splashBg.setTint(0xff00ff)

        this.brandLogo = this.add.image(0, 0, "brand_logo");
        this.loadingBase = this.add.image(0, 0, "loading_base").setOrigin(0.5, 0.5);

        this.progressBar = this.add.image(this.loadingBase.x, this.loadingBase.y, "loading_bar");
        this.progressBar.setCrop(0, 0, 0, this.progressBar.height);

        this.loadFonts();
        this.Resize(window.innerWidth, window.innerHeight);
    }

    loadFonts() {
        let propNames = Object.getOwnPropertyNames(this.fonts);
        propNames.forEach((fontName, index) => {
            let isLast = index >= propNames.length - 1;
            this.fonts[fontName] = new FontFaceObserver(fontName);
            this.fonts[fontName].load().then(this.fontLoadSuccess.bind(this, fontName, isLast), this.fontLoadError.bind(this, fontName));
        });
    };

    async fontLoadSuccess(fontName, isLast) {
        // const resp = await LanguageService.init();

        if (isLast) {
            let getBalance = await Server.getBalance(this.UpdateModel, this);
            // // let gameInitApi = await Server.gameInit();
            // // if (!getBalance.error ) {
            // Model.SetBalance(getBalance.data.balance);
            // Model.SetMinBet(1);
            // Model.SetMaxBet(100);
            // Model.SetCurrency((getBalance.data.currency).toUpperCase());
            // Model.SetBalance(getBalance.data.balance);
            // Model.SetMinBet(getBalance.result.minBet);
            // Model.SetMaxBet(getBalance.result.maxBet);
            // Model.SetBetsValues(getBalance.result.betsValues);

            this.loadAssets();
            // } else {
            // }

        };
    }
    UpdateModel() {
        console.log('update');
        Model.SetBetsValues([0.25, 0.50, 1, 5, 10, 50, 100]);
        Model.SetPaytableValues([100, 50, 5]);
        Model.SetCurrency(Server.currency);
    }


    fontLoadError(fontName) {
        console.error("Font loading error: ", fontName);
    };


    loadAssets() {
        this.load.on('progress', this.loadProgress, this);
        this.load.on('complete', this.complete, { scene: this.scene });
        this.load.audio('game_bg', 'assets/sounds/game_bg.mp3');
        this.load.audio('button_click', 'assets/sounds/button_click.wav');
        this.load.audio('coin_place_sound', 'assets/sounds/coin_place_sound.wav');
        this.load.audio('game_over', 'assets/sounds/game_over.mp3');
        this.load.audio('launch_ball', 'assets/sounds/launch_ball.mp3');
        this.load.audio('win_sound', 'assets/sounds/win_sound.wav');
        this.load.audio('win_row', 'assets/sounds/win_row.mp3');


        this.load.image('bg_game', 'assets/images/game-ui/bg_game.png');
        this.load.image('bg_select_card', 'assets/images/game-ui/bg_select_card.png');
        // this.load.image('bg_splash', 'assets/images/game-ui/bg_splash.png');

        this.load.image('bg_tile', 'assets/images/game-ui/bg_tile.jpg');
        this.load.image('but_exit', 'assets/images/game-ui/but_exit.png');
        this.load.image('but_paytable', 'assets/images/game-ui/but_paytable.png');
        this.load.image('but_play', 'assets/images/game-ui/but_play.png');
        this.load.image('title', 'assets/images/game-ui/title.png');
        this.load.image('but_start', 'assets/images/game-ui/but_start.png');

        this.load.spritesheet('but_fullscreen', 'assets/images/game-ui/but_fullscreen.png', { frameWidth: 190 / 2, frameHeight: 94 });
        this.load.spritesheet('audio_icon', 'assets/images/game-ui/audio_icon.png', { frameWidth: 190 / 2, frameHeight: 94 });
        this.load.spritesheet('but_plus', 'assets/images/game-ui/but_plus.png', { frameWidth: 190 / 2, frameHeight: 94 });
        this.load.spritesheet('but_ball', 'assets/images/game-ui/but_ball.png', { frameWidth: 160 / 2, frameHeight: 82 });
        this.load.spritesheet('card_cell', 'assets/images/game-ui/card_cell.png', { frameWidth: 260 / 4, frameHeight: 65 });
        this.load.spritesheet('card_cell_small', 'assets/images/game-ui/card_cell_small.png', { frameWidth: 66 / 2, frameHeight: 33 });
        this.load.spritesheet('board_cell', 'assets/images/game-ui/board_cell.png', { frameWidth: 165 / 3, frameHeight: 55 });
        this.load.spritesheet('ball', 'assets/images/game-ui/ball.png', { frameWidth: 350 / 5, frameHeight: 70 });
        this.load.spritesheet('ball_preview', 'assets/images/game-ui/ball_preview.png', { frameWidth: 700 / 5, frameHeight: 140 });

        this.load.image('but_exit', 'assets/images/game-ui/but_exit.png');
        this.load.image('num_card_base', 'assets/images/game-ui/num_card_base.png');
        this.load.image('extract_num_base', 'assets/images/game-ui/extract_num_base.png');
        this.load.image('paytable_base', 'assets/images/game-ui/paytable_base.png');
        this.load.image('tube_strip', 'assets/images/game-ui/tube_strip.png');
        this.load.image('plus_display', 'assets/images/game-ui/plus_display.png');
        this.load.image('display_small', 'assets/images/game-ui/display_small.png');
        this.load.image('card_bg', 'assets/images/game-ui/card_bg.png');
        this.load.image('card_highlight_1', 'assets/images/game-ui/card_highlight_1.png');
        this.load.image('card_highlight_2', 'assets/images/game-ui/card_highlight_2.png');
        this.load.image('top_cell_layer', 'assets/images/game-ui/top_cell_layer.png');
        this.load.image('top_cell_layer_bg', 'assets/images/game-ui/top_cell_layer_bg.png');

        this.load.image('tube', 'assets/images/game-ui/tube.png');
        this.load.image('number_extract_bg', 'assets/images/game-ui/number_extract_bg.png');
        this.load.image('msg_box', 'assets/images/game-ui/msg_box.png');


        this.load.start();
    }

    loadProgress(percentage) {
        this.progressBar.setCrop(0, 0, this.progressBar.width * percentage, this.progressBar.height);
        percentage = percentage * 100;
    }

    Resize(newWidth, newHeight) {
        let newScale = Utils.getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);
        this.splashBg.setDisplaySize(newWidth, newHeight);

        let config = this.cache.json.get("game-config").loader;
        this.brandLogo.setScale(newScale);
        // this.brandLogo.setPosition(newWidth / 2, config.brand_logo.y);
        this.brandLogo.setPosition(newWidth / 2, newHeight / 2);

        this.loadingBase.setScale(newScale);
        this.loadingBase.setPosition(this.brandLogo.x - config.loaderbase.offsetX, this.brandLogo.y + (config.loaderbase.offsetY * newScale));

        this.progressBar.setScale(newScale);
        this.progressBar.setPosition(this.loadingBase.x, this.loadingBase.y);
    }

    complete() {
        SoundManager.CreateSound(this.scene);
        this.scene.stop("PreloadScene");
        if (localStorage.getItem('checkbox_selected_bingo') === false || localStorage.getItem('checkbox_selected_bingo') === null) {
            this.scene.start('SplashScene');
        } else {
            this.scene.start("CardsSelectionScene");
        }
    }

}