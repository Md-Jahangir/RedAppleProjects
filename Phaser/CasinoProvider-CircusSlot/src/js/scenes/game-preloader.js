import Phaser from "phaser";
import { SelectedResolution } from "../resolution-selector";
import { getScale } from "../utils";
import { Model } from "../model";
import { Server } from "../server";
import FontFaceObserver from "fontfaceobserver";
import { SoundManager } from "../SoundManager";

class GamePreloader extends Phaser.Scene {
    constructor() {
        super("game-preloader");
        this.screenContainer = null;
        this.progressBar = null;
        this.companyLogo = null;
        this.percentsText = null;
        this.backgroundsList = [
            "Background_1",
            "Background_2",
            "Background_3",
        ];
        this.fontsLoaded = 0;
        this.fonts = {
            "Bahnschrift": null,
            "evil_empire": null,
            "framd": null,
            "lilitaone_regular": null
        }
    };

    preload() {
        // preload assets for loading screen
        this.cameras.main.setBackgroundColor(0x000000);
        this.load.json("resolution-config", "assets/configs/resolutions/" + SelectedResolution.path + "/config.json");

        this.load.image("loading_bg", "assets/images/" + SelectedResolution.path + "/loading/loading_overlay.png");
        this.load.image("progress_base", "assets/images/" + SelectedResolution.path + "/loading/loading_base.png");
        this.load.image("progress_bar", "assets/images/" + SelectedResolution.path + "/loading/loading_bar.png");
        this.load.image("logo", "assets/images/" + SelectedResolution.path + "/loading/brand_logo.png");
        // this.load.image("logo", "assets/images/" + SelectedResolution.path + "/loading/logo.png");
        this.load.image("play_button", "assets/images/" + SelectedResolution.path + "/loading/play_button.png");
        this.load.image("checkbox", "assets/images/" + SelectedResolution.path + "/loading/checkbox.png");
        this.load.image("tick", "assets/images/" + SelectedResolution.path + "/loading/tick.png");
        this.load.image("error-logo", "assets/images/" + SelectedResolution.path + "/error.png");

        this.load.setPath("assets/images/" + SelectedResolution.path + "/titleArt/");
        this.load.spine("title_art_animation", 'title_art.json', 'title_art.atlas');
        this.load.setPath('');

    };

    create() {
        let config = this.cache.json.get("resolution-config");

        this.game.events.on("resize", this.resize, this);
        this.background = this.add.image(0, 0, "loading_bg").setOrigin(0);
        // this.gameTitle = this.add.image(this.scale.width / 2, this.scale.height / 2 - config.loading.logo.y, "logo");
        // this.gameTitle = this.add.spine(this.scale.width / 2, this.scale.height / 2 - config.loading.logo.y, "title_art_animation", "animation", true);
        // this.gameTitle.play('animation', false);
        this.gameTitle = this.add.image(this.scale.width / 2, this.scale.height / 2, "logo");


        this.progressBase = this.add.image(this.scale.width / 2, this.gameTitle.y + config.loading.logo.baseY, "progress_base");
        this.progressBar = this.add.image(this.scale.width / 2, this.gameTitle.y + config.loading.logo.barY, "progress_bar");
        this.progressBar.setCrop(0, 0, 0, this.progressBar.displayHeight);

        this.percentsText = this.add.text(
            this.scale.width / 2,
            this.progressBase.y + config.loading.text.y,
            "", {
            fontFamily: "Bahnschrift",
            fontStyle: "Condensed",
            fontSize: config.loading.text.fontSize,
            color: "#ffffff"
        }
        ).setOrigin(0.5);

        this.loadFonts();
        this.resize(window.innerWidth, window.innerHeight);
    };

    initialServerDataReceived(response) {
        let data = response.data.result;
        Model.setBalance(parseFloat(data.balance));
        Model.setBetsValues(data.betAmountValue);
        Model.setPaylines(data.paylines);
        Model.setPaytable(data.paytable);
        this.loadAssets();
    };
    //#############################################################################################
    loadFonts() {
        let propNames = Object.getOwnPropertyNames(this.fonts);
        propNames.forEach((fontName, index) => {
            let isLast = index >= propNames.length - 1;
            this.fonts[fontName] = new FontFaceObserver(fontName);
            this.fonts[fontName].load().then(this.fontLoadSuccess.bind(this, fontName, isLast), this.fontLoadError.bind(this, fontName));
        });
    };
    //#############################################################################################
    fontLoadSuccess(fontName, isLast) {
        if (isLast) {
            if (Server.isParamsMissing()) {
                this.scene.start("game-error");
            } else {
                Server.getInitialData(this.initialServerDataReceived, this);
            }
        }
    };
    //#############################################################################################
    fontLoadError(fontName) {
        console.error("Font loading error: ", fontName);
    };

    loadAssets() {
        this.load.once("complete", this.loadComplete, this);
        this.load.on("progress", this.loadProgress, this);
        this.load.audio('button_click_sound', 'assets/sounds/button_click_sound.mp3');
        this.load.audio('payline_showing_continously_sound', 'assets/sounds/payline_showing_continously_sound.mp3');
        this.load.audio('payline_wins_sound', 'assets/sounds/payline_wins_sound.mp3');
        this.load.audio('spin_button_click_sound', 'assets/sounds/spin_button_click_sound.mp3');
        this.load.audio('spin_stop_sound', 'assets/sounds/spin_stop_sound.mp3');
        this.load.audio('single_payline_sound', 'assets/sounds/single_payline_sound.mp3');
        this.load.audio('reel_sound', 'assets/sounds/reel_sound.mp3');
        this.load.audio('game_bg_sound', 'assets/sounds/game_bg_sound.mp3');

        this.load.audio('coin_anim_sound', 'assets/sounds/coin_anim_sound.mp3');
        this.load.audio('coin_payout', 'assets/sounds/coin_payout.mp3');
        this.load.audio('big_win_sound', 'assets/sounds/big_win_sound.mp3');
        this.load.audio('ultra_win_sound', 'assets/sounds/ultra_win_sound.mp3');
        this.load.audio('update_balance_sound', 'assets/sounds/update_balance_sound.mp3');

        let config = this.cache.json.get("resolution-config");
        let frameWidth = config.symbols.frame.width;
        let frameHeight = config.symbols.frame.height;

        // this.load.image("background", "assets/images/" + SelectedResolution.path + "/backgrounds/background.png");
        // this.load.image("game_logo", "assets/images/" + SelectedResolution.path + "/ui/game_logo.png");
        for (let i = 0; i < 5; i++) {
            this.load.image("reel_bg_" + i, "assets/images/" + SelectedResolution.path + "/reels/reel_bg_" + i + ".png");
        }
        this.load.image("reels_bg", "assets/images/" + SelectedResolution.path + "/reels/reels_bg.png");
        this.load.image("bottom_panel", "assets/images/" + SelectedResolution.path + "/ui/bottom_panel.png");
        this.load.image("bet_last_win_base", "assets/images/" + SelectedResolution.path + "/ui/bet_last_win_base.png");
        this.load.image("bet_total_win_base", "assets/images/" + SelectedResolution.path + "/ui/bet_total_win_base.png");
        this.load.image("balance_base", "assets/images/" + SelectedResolution.path + "/ui/balance_base.png");
        this.load.image("menu_button-normal", "assets/images/" + SelectedResolution.path + "/ui/menu_button_normal.png");
        this.load.image("menu_button-hover", "assets/images/" + SelectedResolution.path + "/ui/menu_button_hover.png");
        this.load.image("menu_button-disabled", "assets/images/" + SelectedResolution.path + "/ui/menu_button_disabled.png");
        this.load.image("minus_button-normal", "assets/images/" + SelectedResolution.path + "/ui/minus_button_normal.png");
        this.load.image("minus_button-hover", "assets/images/" + SelectedResolution.path + "/ui/minus_button_hover.png");
        this.load.image("minus_button-disabled", "assets/images/" + SelectedResolution.path + "/ui/minus_button_disabled.png");
        this.load.image("plus_button-normal", "assets/images/" + SelectedResolution.path + "/ui/plus_button_normal.png");
        this.load.image("plus_button-hover", "assets/images/" + SelectedResolution.path + "/ui/plus_button_hover.png");
        this.load.image("plus_button-disabled", "assets/images/" + SelectedResolution.path + "/ui/plus_button_disabled.png");
        this.load.image("spin_button-normal", "assets/images/" + SelectedResolution.path + "/ui/spin_button_normal.png");
        this.load.image("spin_button-hover", "assets/images/" + SelectedResolution.path + "/ui/spin_button_hover.png");
        this.load.image("spin_button-disabled", "assets/images/" + SelectedResolution.path + "/ui/spin_button_disabled.png");
        this.load.image("fast_button-normal", "assets/images/" + SelectedResolution.path + "/ui/auto_fast_normal.png");
        this.load.image("fast_button-hover", "assets/images/" + SelectedResolution.path + "/ui/auto_fast_hover.png");
        this.load.image("fast_button-disabled", "assets/images/" + SelectedResolution.path + "/ui/auto_fast_disabled.png");
        this.load.image("auto_button-normal", "assets/images/" + SelectedResolution.path + "/ui/auto_fast_normal.png");
        this.load.image("auto_button-hover", "assets/images/" + SelectedResolution.path + "/ui/auto_fast_hover.png");
        this.load.image("auto_button-disabled", "assets/images/" + SelectedResolution.path + "/ui/auto_fast_disabled.png");

        // this.load.image("auto_button_counter", "assets/images/" + SelectedResolution.path + "/ui/auto_spin_counter.png");
        this.load.image("auto_spin_counter_disable", "assets/images/" + SelectedResolution.path + "/ui/auto_spin_counter_disable.png");
        this.load.image("auto_spin_counter_normal", "assets/images/" + SelectedResolution.path + "/ui/auto_spin_counter_normal.png");


        this.load.image("menu_popup_base-normal", "assets/images/" + SelectedResolution.path + "/ui/menu_popup_base_inactive.png");
        this.load.image("menu_popup_base-hover", "assets/images/" + SelectedResolution.path + "/ui/menu_popup_base_active.png");
        this.load.image("menu_popup_base-disabled", "assets/images/" + SelectedResolution.path + "/ui/menu_popup_base_active.png");
        this.load.image("back_button-normal", "assets/images/" + SelectedResolution.path + "/ui/popups/back_button_normal.png");
        this.load.image("back_button-hover", "assets/images/" + SelectedResolution.path + "/ui/popups/back_button_hover.png");
        this.load.image("back_button-disabled", "assets/images/" + SelectedResolution.path + "/ui/popups/back_button_disabled.png");


        this.load.atlas("popup", "assets/images/" + SelectedResolution.path + "/ui/popups/popup-atlas.png", "assets/images/" + SelectedResolution.path + "/ui/popups/popup-atlas.json");

        this.load.image("popup_overlay", "assets/images/" + SelectedResolution.path + "/ui/popups/popup_overlay.png");
        this.load.image("pop_bg", "assets/images/" + SelectedResolution.path + "/ui/popups/pop_bg.png");
        this.load.image("music_sound_base", "assets/images/" + SelectedResolution.path + "/ui/popups/music_sound_base.png");
        this.load.image("music_heading", "assets/images/" + SelectedResolution.path + "/ui/popups/music_heading.png");
        this.load.image("sounds_heading", "assets/images/" + SelectedResolution.path + "/ui/popups/sounds_heading.png");
        this.load.image("music_sound_off_base", "assets/images/" + SelectedResolution.path + "/ui/popups/music_sound_off_base.png");
        this.load.image("music_sound_on_base", "assets/images/" + SelectedResolution.path + "/ui/popups/music_sound_on_base.png");
        this.load.image("switch_ball", "assets/images/" + SelectedResolution.path + "/ui/popups/switch_ball.png");
        this.load.image("auto_popup_overlay", "assets/images/" + SelectedResolution.path + "/ui/popups/auto_popup_overlay.png");
        this.load.image("auto_popup_frame", "assets/images/" + SelectedResolution.path + "/ui/popups/auto_popup_frame.png");
        this.load.image("decline_button-normal", "assets/images/" + SelectedResolution.path + "/ui/popups/decline_button.png");
        this.load.image("decline_button-hover", "assets/images/" + SelectedResolution.path + "/ui/popups/decline_button.png");
        this.load.image("decline_button-disabled", "assets/images/" + SelectedResolution.path + "/ui/popups/decline_button.png");
        this.load.image("accept_button-normal", "assets/images/" + SelectedResolution.path + "/ui/popups/accept_button.png");
        this.load.image("accept_button-hover", "assets/images/" + SelectedResolution.path + "/ui/popups/accept_button.png");
        this.load.image("accept_button-disabled", "assets/images/" + SelectedResolution.path + "/ui/popups/accept_button.png");

        //Symbol 
        this.load.image("symbol-bear", "assets/images/" + SelectedResolution.path + "/reels/symbols/static/bear.png");
        this.load.image("symbol-club", "assets/images/" + SelectedResolution.path + "/reels/symbols/static/club.png");
        this.load.image("symbol-diamond", "assets/images/" + SelectedResolution.path + "/reels/symbols/static/diamond.png");
        this.load.image("symbol-heart", "assets/images/" + SelectedResolution.path + "/reels/symbols/static/heart.png");
        this.load.image("symbol-joker", "assets/images/" + SelectedResolution.path + "/reels/symbols/static/joker.png");
        this.load.image("symbol-ladyMagician", "assets/images/" + SelectedResolution.path + "/reels/symbols/static/ladyMagician.png");
        this.load.image("symbol-freeSpin", "assets/images/" + SelectedResolution.path + "/reels/symbols/static/freeSpin.png");
        this.load.image("symbol-lion", "assets/images/" + SelectedResolution.path + "/reels/symbols/static/lion.png");
        this.load.image("symbol-maleMagician", "assets/images/" + SelectedResolution.path + "/reels/symbols/static/maleMagician.png");
        this.load.image("symbol-monkey", "assets/images/" + SelectedResolution.path + "/reels/symbols/static/monkey.png");
        this.load.image("symbol-spades", "assets/images/" + SelectedResolution.path + "/reels/symbols/static/spades.png");
        this.load.image("symbol-sticky", "assets/images/" + SelectedResolution.path + "/reels/symbols/static/sticky.png");
        this.load.image("symbol-scatter", "assets/images/" + SelectedResolution.path + "/reels/symbols/static/scatter.png");
        this.load.image("symbol-wild", "assets/images/" + SelectedResolution.path + "/reels/symbols/static/wild.png");

        //Free Spin 
        this.load.image("free_spin_popup_bg", "assets/images/" + SelectedResolution.path + "/ui/freeSpin/free_spin_popup_bg.png");
        this.load.image("free_spin_popup_curtain", "assets/images/" + SelectedResolution.path + "/ui/freeSpin/free_spin_popup_curtain.png");
        this.load.image("free_spin_popup_title_art", "assets/images/" + SelectedResolution.path + "/ui/freeSpin/free_spin_popup_title_art.png");
        this.load.image("games_left_base", "assets/images/" + SelectedResolution.path + "/ui/freeSpin/games_left_base.png");
        this.load.image("free_spin_heading", "assets/images/" + SelectedResolution.path + "/ui/freeSpin/free_spin_heading.png");

        this.load.image("paytable-cell", "assets/images/" + SelectedResolution.path + "/ui/paytable-cell.png");
        this.load.image("prev-page-normal", "assets/images/" + SelectedResolution.path + "/ui/prev-page-normal.png");
        this.load.image("prev-page-hover", "assets/images/" + SelectedResolution.path + "/ui/prev-page-hover.png");
        this.load.image("prev-page-disabled", "assets/images/" + SelectedResolution.path + "/ui/prev-page-disabled.png");
        this.load.image("next-page-normal", "assets/images/" + SelectedResolution.path + "/ui/next-page-normal.png");
        this.load.image("next-page-hover", "assets/images/" + SelectedResolution.path + "/ui/next-page-hover.png");
        this.load.image("next-page-disabled", "assets/images/" + SelectedResolution.path + "/ui/next-page-disabled.png");
        this.load.image("page-inactive", "assets/images/" + SelectedResolution.path + "/ui/page-inactive.png");
        this.load.image("page-active", "assets/images/" + SelectedResolution.path + "/ui/page-active.png");
        this.load.image("paytable-cell-shine", "assets/images/" + SelectedResolution.path + "/ui/paytable-cell-shine.png");

        // this.load.spritesheet("symbol-spin-animation", "assets/images/" + SelectedResolution.path + "/reels/symbols/animation/spin.png", { frameWidth: frameWidth, frameHeight: frameHeight });

        // paylines icons
        this.load.image("payline-icon-0", "assets/images/" + SelectedResolution.path + "/paylines-icons/0.png");
        this.load.image("payline-icon-1", "assets/images/" + SelectedResolution.path + "/paylines-icons/1.png");
        this.load.image("payline-icon-2", "assets/images/" + SelectedResolution.path + "/paylines-icons/2.png");
        this.load.image("payline-icon-3", "assets/images/" + SelectedResolution.path + "/paylines-icons/3.png");
        this.load.image("payline-icon-4", "assets/images/" + SelectedResolution.path + "/paylines-icons/4.png");
        this.load.image("payline-icon-5", "assets/images/" + SelectedResolution.path + "/paylines-icons/5.png");
        this.load.image("payline-icon-6", "assets/images/" + SelectedResolution.path + "/paylines-icons/6.png");
        this.load.image("payline-icon-7", "assets/images/" + SelectedResolution.path + "/paylines-icons/7.png");
        this.load.image("payline-icon-8", "assets/images/" + SelectedResolution.path + "/paylines-icons/8.png");
        this.load.image("payline-icon-9", "assets/images/" + SelectedResolution.path + "/paylines-icons/9.png");
        this.load.image("payline-icon-10", "assets/images/" + SelectedResolution.path + "/paylines-icons/10.png");
        this.load.image("payline-icon-11", "assets/images/" + SelectedResolution.path + "/paylines-icons/11.png");
        this.load.image("payline-icon-12", "assets/images/" + SelectedResolution.path + "/paylines-icons/12.png");
        this.load.image("payline-icon-13", "assets/images/" + SelectedResolution.path + "/paylines-icons/13.png");
        this.load.image("payline-icon-14", "assets/images/" + SelectedResolution.path + "/paylines-icons/14.png");
        this.load.image("payline-icon-15", "assets/images/" + SelectedResolution.path + "/paylines-icons/15.png");
        this.load.image("payline-icon-16", "assets/images/" + SelectedResolution.path + "/paylines-icons/16.png");
        this.load.image("payline-icon-17", "assets/images/" + SelectedResolution.path + "/paylines-icons/17.png");
        this.load.image("payline-icon-18", "assets/images/" + SelectedResolution.path + "/paylines-icons/18.png");
        this.load.image("payline-icon-19", "assets/images/" + SelectedResolution.path + "/paylines-icons/19.png");

        //Symbol Spine
        this.load.setPath("assets/images/" + SelectedResolution.path + "/reels/symbols/animation/spine/");
        this.load.spine("animation-symbol-bear", 'bear/bear.json', 'bear/bear.atlas');
        this.load.spine("animation-symbol-club", 'club/club.json', 'club/club.atlas');
        this.load.spine("animation-symbol-diamond", 'diamond/diamond.json', 'diamond/diamond.atlas');
        this.load.spine("animation-symbol-heart", 'heart/heart.json', 'heart/heart.atlas');
        this.load.spine("animation-symbol-joker", 'joker/jocker.json', 'joker/jocker.atlas');
        // this.load.spine("animation-symbol-joker", 'joker/JOCKER_72.json', 'joker/JOCKER_72.atlas');
        this.load.spine("animation-symbol-ladyMagician", 'ladyMagician/magician_lady.json', 'ladyMagician/magician_lady.atlas');
        this.load.spine("animation-symbol-lion", 'lion/lion.json', 'lion/lion.atlas');
        this.load.spine("animation-symbol-maleMagician", 'maleMagician/magician_male.json', 'maleMagician/magician_male.atlas');
        this.load.spine("animation-symbol-monkey", 'monkey/monkey.json', 'monkey/monkey.atlas');
        this.load.spine("animation-symbol-scatter", 'scatter/scatter.json', 'scatter/scatter.atlas');
        this.load.spine("animation-symbol-spades", 'spade/spade.json', 'spade/spade.atlas');
        this.load.spine("animation-symbol-sticky", 'sticky/sticky.json', 'sticky/sticky.atlas');
        this.load.spine("animation-symbol-wild", 'wild/wild.json', 'wild/wild.atlas');
        this.load.spine("animation-symbol-freeSpin", 'freespin/freespin.json', 'freespin/freespin.atlas');


        this.load.setPath("assets/images/" + SelectedResolution.path + "/jackpot-animation/");
        this.load.spine("animation-big-win", 'bigWin/big_win.json', 'bigWin/big_win.atlas');
        this.load.spine("animation-epic-win", 'epicWin/epic_win.json', 'epicWin/epic_win.atlas');
        this.load.spine("animation-ultra-win", 'ultraWin/ultra_win.json', 'ultraWin/ultra_win.atlas');
        this.load.spine("animation-payline", 'payline/payline.json', 'payline/payline.atlas');
        this.load.spine("animation-menu-bg", 'menuBg/setting_reel.json', 'menuBg/setting_reel.atlas');
        this.load.spine("animation-feature-menu", 'feature_menu/freature_reel.json', 'feature_menu/freature_reel.atlas');
        this.load.spine("animation-bg", 'bg/background.json', 'bg/background.atlas');
        this.load.spine("animation-coin", 'coins/coin_win.json', 'coins/coin_win.atlas');
        this.load.spine("animation-sprinkle", 'sprinkle/coin_sprinkle.json', 'sprinkle/coin_sprinkle.atlas');


        this.load.start();
    };

    loadComplete() {

        setTimeout(() => {
            SoundManager.CreateSound(this.scene);
            if (localStorage.getItem('checkbox_selected') === false || localStorage.getItem('checkbox_selected') === null) {
                this.scene.start('splash-loader');
            } else {
                this.scene.start("game-main");
            }
        }, 1000);
    }

    loadProgress(percents) {
        this.progressBar.setCrop(0, 0, this.progressBar.width * percents, this.progressBar.height);
        this.percentsText.setText('Loading...' + Math.round(percents * 100) + "%");
    }

    resize(newWidth, newHeight) {
        let newScale = getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);
        let config = this.cache.json.get("resolution-config");
        // let scaleX = newWidth / this.background.width;
        // let scaleY = newHeight / this.background.height;
        // let totalScale = scaleX > scaleY ? scaleX : scaleY;

        // this.background.setScale(totalScale);
        this.background.setDisplaySize(newWidth, newHeight);

        this.gameTitle.setScale(newScale);
        this.gameTitle.setPosition(
            newWidth / 2,
            newHeight / 2 - config.loading.logo.y * newScale
        );

        this.progressBase.setScale(newScale);
        this.progressBase.setPosition(
            newWidth / 2,
            this.gameTitle.y + config.loading.logo.baseY * newScale
        );

        this.progressBar.setScale(newScale);
        this.progressBar.setPosition(
            newWidth / 2,
            this.gameTitle.y + config.loading.logo.barY * newScale
        );
        this.percentsText.setScale(newScale);
        this.percentsText.setPosition(
            newWidth / 2,
            this.progressBase.y + config.loading.text.y * newScale
        );
    };
}

export default GamePreloader;