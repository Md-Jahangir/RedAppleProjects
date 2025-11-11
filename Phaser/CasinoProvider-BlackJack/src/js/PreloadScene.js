import Phaser from 'phaser';
import FontFaceObserver from 'fontfaceobserver';
import { Constant } from './Constant.js';
import { Server } from './Server.js';
import { Model } from "./Model.js";
import { LanguageService } from './LanguageService.js';
// import { Server } from "./Server.js";
import { SoundManager } from "./SoundManager.js";
// import InactiveGamePopup from "./popups/InactiveGamePopup.js";
export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super('PreloadScene');
        this.progressBar = null;
        this.loadingText = null;
        this.slotData = null;
        this.inactiveGamePopup = null;
        this.splashContainer = null;
        this.fonts = {
            "LuckiestGuy-Regular": null,
        }
    };

    preload() {
        // this.load.image('loading_overlay', 'assets/images/loader/loading_overlay.png');
        // this.load.image('brand_logo', 'assets/images/loader/brand_logo.png');
        // this.load.image('loader_bg', 'assets/images/loader/loader_bg.png');
        // this.load.image('loading_bar', 'assets/images/loader/loading_bar.png');
        // this.load.image('loading_base', 'assets/images/loader/loading_base.png');
    };

    create() {
        this.loadArray = new Array();
        this.splashContainer = this.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        // let splashBg = this.add.image(0, 0, "loading_overlay");
        // let brandLogo = this.add.image(0, -150, "brand_logo");
        // let splashBase = this.add.image(0, 150, "loading_base");

        // this.progressBar = this.add.image(splashBase.x - 637, splashBase.y - 0, "loading_bar").setOrigin(0, 0.5).setScale(0, 1);
        // this.progressBar.setCrop(0, 0, 0, this.progressBar.height);
        // this.splashContainer.add([splashBg, brandLogo, splashBase, this.progressBar]);

        const getOverlayBg = document.getElementById("loading_overlay");
        const getTitleBg = document.getElementById("title_bg");
        const getLogo = document.getElementById("brand_logo");
        const getProgressbase = document.getElementById("loading_base");
        const getProgressBar = document.getElementById("loading_bar");
        const getPlayButton = document.getElementById("play_button");
        const getCheckBox = document.getElementById("checkbox");
        const getTick = document.getElementById("tick");
        this.loadArray.push(getOverlayBg, getTitleBg, getLogo, getProgressbase, getProgressBar, getPlayButton, getCheckBox, getTick);
        for (let index = 0; index < this.loadArray.length; index++) {
            const element = this.loadArray[index];
            if (element.complete) {
                this.loadHTMLImage(element);
            } else {
                element.onload = () => this.loadHTMLImage(element);
            }
        }

        this.percentsText = this.add.text(
            0, 250,
            "Loading...0%", {
            fontFamily: "LuckiestGuy-Regular",
            fontStyle: "Condensed",
            fontSize: '40px',
            color: "#a6e6fd"
        }
        ).setOrigin(0.5);
        this.splashContainer.add(this.percentsText);
        this.loadFonts();
    }

    loadHTMLImage(element) {
        if (element.id) {
            const textureKey = element.id;
            // Add the HTML image as a texture in Phaser
            if (!this.textures.exists(textureKey)) {
                this.textures.addImage(textureKey, element);
            }
            if (textureKey === "loading_overlay") {
                this.background = this.add.image(0, 0, textureKey);
                this.splashContainer.add(this.background)
            } else if (textureKey === "brand_logo") {
                this.brand_logo = this.add.image(0, -150, textureKey);
                this.splashContainer.add(this.brand_logo)
            } else if (textureKey === "loading_base") {
                this.progressBase = this.add.image(0, 300, textureKey);
                this.splashContainer.add(this.progressBase)
            } else if (textureKey === "loading_bar") {
                this.progressBar = this.add.image(-637, 300, textureKey).setOrigin(0, 0.5).setScale(0, 1);
                this.progressBar.setCrop(0, 0, 0, this.progressBar.displayHeight);
                this.splashContainer.add(this.progressBar)
            }
        } else {
            console.warn("Element does not have an ID:", element);
        }
        // if (element.id == "loader_insect") {
        // }

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
        if (isLast) {
            if (Server.isParamsMissing()) {
                this.scene.start("GameErrorScene");
            } else {
                this.GetInitialData();
            }
        }


    }
    fontLoadError(fontName) {
        console.error("Font loading error: ", fontName);
    };

    async GetInitialData() {
        const resp = await LanguageService.init();
        if (resp) {
            let gameInitApi = await Server.gameInit();
            if (gameInitApi.result.status == 200) {
                Model.SetBalance(gameInitApi.result.result.balance);
                Model.SetMinBet(gameInitApi.result.result.minBet);
                Model.SetMaxBet(gameInitApi.result.result.maxBet);
                Model.SetBetsValues(gameInitApi.result.result.betsValues);
                this.loadAssets();
            }

        };
    };

    loadAssets() {
        this.load.on('progress', this.loadProgress, this);
        this.load.on('complete', this.complete, { scene: this.scene });
        this.load.setPath('assets/images/spines');
        this.load.spine('spine_title_art', 'titleart_export/title_art.json', 'titleart_export/title_art.atlas');
        this.load.spine('spine_win', 'win_export/win.json', 'win_export/win.atlas');
        this.load.spine('spine_loose', 'lose_export/lose.json', 'lose_export/lose.atlas');
        this.load.spine('spine_blackjack', 'blackjack_export/blackjack_popup.json', 'blackjack_export/blackjack_popup.atlas');
        this.load.spine('spine_tie', 'tie_export/tie.json', 'tie_export/tie.atlas');
        this.load.setPath('');

        this.load.audio('card', 'assets/sounds/card.wav');
        this.load.audio('chip', 'assets/sounds/chip.wav');
        this.load.audio('fiche_collect', 'assets/sounds/fiche_collect.mp3');
        this.load.audio('lose', 'assets/sounds/lose.wav');
        this.load.audio('signal_button', 'assets/sounds/signal_button.wav');
        this.load.audio('game_bg_sound', 'assets/sounds/game_bg_sound.mp3');
        this.load.audio('win', 'assets/sounds/win.wav');
        this.load.audio('place_ur_bets', 'assets/sounds/place_ur_bets.mp3');



        this.load.spritesheet('card_spritesheet', 'assets/images/card_spritesheet47.png', { frameWidth: 2205 / 13, frameHeight: 1200 / 5 });
        this.load.image('cardvalue_base', 'assets/images/cardvalue_base.png');
        this.load.image('bg_gameplay', 'assets/images/bg_gameplay.png');
        this.load.image('balance_base', 'assets/images/balance_base.png');
        this.load.image('bet_bg', 'assets/images/bet_bg.png');
        this.load.image('bet_bg_alpha', 'assets/images/bet_bg_alpha.png');

        this.load.image('open_deck', 'assets/images/open_deck.png');
        this.load.image('close_deck', 'assets/images/close_deck.png');
        this.load.image('close_deck_card', 'assets/images/close_deck_card.png');
        this.load.image('display_bg', 'assets/images/display_bg.png');
        this.load.image('top_chips_bg', 'assets/images/top_chips_bg.png');
        // enabled Chips ------------------------------------------------------------------------
        this.load.image('fiche_base', 'assets/images/fiche_base.png');
        this.load.image('fiche_0', 'assets/images/fiche_0.png');
        this.load.image('fiche_1', 'assets/images/fiche_1.png');
        this.load.image('fiche_2', 'assets/images/fiche_2.png');
        this.load.image('fiche_3', 'assets/images/fiche_3.png');
        this.load.image('fiche_4', 'assets/images/fiche_4.png');
        this.load.image('fiche_5', 'assets/images/fiche_5.png');


        // Buttons >>>>-----------------------------------------------------------------


        this.load.image('back_button', 'assets/images/buttons/back_button.png');
        this.load.image('button_back_glow', 'assets/images/buttons/button_back_glow.png');
        this.load.image('button_back_normal', 'assets/images/buttons/button_back_normal.png');


        this.load.image('info_button', 'assets/images/buttons/info_button.png');
        this.load.image('button_info_glow', 'assets/images/buttons/button_info_glow.png');
        this.load.image('button_info_normal', 'assets/images/buttons/button_info_normal.png');

        // this.load.image('play_button', 'assets/images/buttons/play_button.png');

        this.load.image('button_bottom_disabled', 'assets/images/buttons/button_disabled.png');
        this.load.image('button_bottom_glow', 'assets/images/buttons/button_glow.png');
        this.load.image('button_bottom_normal', 'assets/images/buttons/button_normal.png');

        this.load.image('button_deal_disabled', 'assets/images/buttons/button_disabled.png');
        this.load.image('button_deal_glow', 'assets/images/buttons/button_glow.png');
        this.load.image('button_deal_normal', 'assets/images/buttons/button_normal.png');

        this.load.image('button_double_disabled', 'assets/images/buttons/button_disabled.png');
        this.load.image('button_double_glow', 'assets/images/buttons/button_glow.png');
        this.load.image('button_double_normal', 'assets/images/buttons/button_normal.png');

        this.load.image('button_split_disabled', 'assets/images/buttons/button_disabled.png');
        this.load.image('button_split_glow', 'assets/images/buttons/button_glow.png');
        this.load.image('button_split_normal', 'assets/images/buttons/button_normal.png');


        this.load.image('button_hit_disabled', 'assets/images/buttons/button_disabled.png');
        this.load.image('button_hit_glow', 'assets/images/buttons/button_glow.png');
        this.load.image('button_hit_normal', 'assets/images/buttons/button_normal.png');

        this.load.image('button_rebet_disabled', 'assets/images/buttons/button_disabled.png');
        this.load.image('button_rebet_glow', 'assets/images/buttons/button_glow.png');
        this.load.image('button_rebet_normal', 'assets/images/buttons/button_normal.png');

        this.load.image('button_stand_disabled', 'assets/images/buttons/button_disabled.png');
        this.load.image('button_stand_glow', 'assets/images/buttons/button_glow.png');
        this.load.image('button_stand_normal', 'assets/images/buttons/button_normal.png');

        this.load.image('sound_bg', 'assets/images/buttons/button_info_normal.png');
        this.load.image('sound_off', 'assets/images/buttons/sound_off.png');
        this.load.image('sound_on', 'assets/images/buttons/sound_on.png');

        this.load.image('info_popup_overlay', 'assets/images/popups/info_popup_overlay.png');
        this.load.image('info_popup_bg', 'assets/images/popups/info_popup_bg.png');
        this.load.image('info_cross_button', 'assets/images/popups/info_cross_button.png');

        this.load.start();
    }

    loadProgress(percentage) {
        this.progressBar.scaleX = percentage;
        this.progressBar.setCrop(0, 0, this.progressBar.width * percentage, this.progressBar.height);
        percentage = percentage * 100;
        this.percentsText.setText('Loading...' + Math.round(percentage) + "%");
    }

    complete() {
        SoundManager.CreateSound();
        if (localStorage.getItem('checkbox_selected_blackjack') == "false" || localStorage.getItem('checkbox_selected_blackjack') === null) {
            this.scene.start('SplashScene');
        } else {
            this.scene.start("GameScene");
        }

    }

}