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
        this.gameTitle = null;
        this.percentsText = null;
        this.backgroundsList = [
            "Background_1",
            "Background_2",
            "Background_3",
        ];
        this.fontsLoaded = 0;
        this.fonts = {
            "Bahnschrift": null,
            "modesto-expanded": null
        }
    };

    preload() {
        this.cameras.main.setBackgroundColor(0x000000);
        this.load.json("resolution-config", "assets/configs/resolutions/" + SelectedResolution.path + "/config.json");
        this.load.image("error-logo", "assets/images/" + SelectedResolution.path + "/error.png");

        this.load.image("loading_bg", "assets/images/" + SelectedResolution.path + "/loading/loading_overlay.png");
        this.load.image("progress_base", "assets/images/" + SelectedResolution.path + "/loading/loading_base.png");
        this.load.image("progress_bar", "assets/images/" + SelectedResolution.path + "/loading/loading_bar.png");
        // this.load.image("loader_insect", "assets/images/" + SelectedResolution.path + "/loading/loader_insect.png");
        this.load.image("logo", "assets/images/" + SelectedResolution.path + "/loading/brand_logo.png");
        this.load.image("play_button", "assets/images/" + SelectedResolution.path + "/loading/play_button.png");
        this.load.image("checkbox", "assets/images/" + SelectedResolution.path + "/loading/checkbox.png");
        this.load.image("tick", "assets/images/" + SelectedResolution.path + "/loading/tick.png");
        this.load.setPath("assets/images/" + SelectedResolution.path + "/spines/");
        this.load.spine("splash_logo_spine", "splash_logo_spine/title_art_exterior.json", "splash_logo_spine/title_art_exterior.atlas");
        this.load.spine("exterior_bg_spine", "exterior_bg/bg_exterior.json", "exterior_bg/bg_exterior.atlas");
        this.load.setPath("");

    };

    create() {
        let config = this.cache.json.get("resolution-config");

        this.game.events.on("resize", this.resize, this);

        this.background = this.add.image(0, 0, "loading_bg").setOrigin(0);
        this.gameTitle = this.add.image(this.scale.width / 2, this.scale.height / 2, "logo");

        this.progressBase = this.add.image(this.scale.width / 2, this.scale.height / 2, "progress_base");

        this.progressBar = this.add.image(this.scale.width / 2, this.scale.height / 2, "progress_bar");
        this.progressBar.setCrop(0, 0, 0, this.progressBar.displayHeight);

        // this.loaderInsect = this.add.image(this.progressBase.x, this.scale.height / 2, "loader_insect");


        this.percentsText = this.add.text(
            this.scale.width / 2,
            this.progressBar.y + config.loading.text.y,
            "Loading...0%", {
            fontFamily: "Bahnschrift",
            fontStyle: "Condensed",
            fontSize: config.loading.text.fontSize,
            color: "#a6e6fd"
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
        // this.loadFonts();
        this.loadAssets();
    };
    loadFonts() {
        let propNames = Object.getOwnPropertyNames(this.fonts);
        propNames.forEach((fontName, index) => {
            let isLast = index >= propNames.length - 1;
            this.fonts[fontName] = new FontFaceObserver(fontName);
            this.fonts[fontName].load().then(this.fontLoadSuccess.bind(this, fontName, isLast), this.fontLoadError.bind(this, fontName));
        });
    };
    fontLoadSuccess(fontName, isLast) {
        // console.info("Font " + fontName + " loaded.");
        if (isLast) {
            // this.loadAssets();
            if (Server.isParamsMissing()) {
                this.scene.start("game-error");
            } else {
                Server.getInitialData(this.initialServerDataReceived, this);
            }
        }
    };
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


        let config = this.cache.json.get("resolution-config");
        let frameWidth = config.symbols.frame.width;
        let frameHeight = config.symbols.frame.height;

        this.load.atlas("popup", "assets/images/" + SelectedResolution.path + "/ui/popups/popup-atlas.png", "assets/images/" + SelectedResolution.path + "/ui/popups/popup-atlas.json");

        // loading random background
        let rndIndex = Math.floor(Math.random() * this.backgroundsList.length);
        let imgName = this.backgroundsList[rndIndex];
        this.load.image("background", "assets/images/" + SelectedResolution.path + "/backgrounds/background.png");
        for (let i = 0; i < 5; i++) {
            this.load.image("reel_bg_" + i, "assets/images/" + SelectedResolution.path + "/reels/reel_bg_" + i + ".png");
        }

        this.load.image("free-spins-bg", "assets/images/" + SelectedResolution.path + "/ui/free-spins/free-spins-bg.png");
        this.load.image("games-left-bg", "assets/images/" + SelectedResolution.path + "/ui/free-spins/games-left-bg.png");
        this.load.image("multiplied-bg", "assets/images/" + SelectedResolution.path + "/ui/free-spins/multiplied-bg.png");
        this.load.image("bottom_panel_bg", "assets/images/" + SelectedResolution.path + "/ui/bottom_panel_bg.png");
        this.load.image("top_panel_bg", "assets/images/" + SelectedResolution.path + "/ui/top_panel_bg.png");
        this.load.image("balance_base", "assets/images/" + SelectedResolution.path + "/ui/balance_base.png");
        this.load.image("auto_spin_counter_base", "assets/images/" + SelectedResolution.path + "/ui/auto_spin_counter_base.png");
        this.load.image("free_spin_counter_base", "assets/images/" + SelectedResolution.path + "/ui/free_spin_counter_base.png");

        this.load.image("menu_button-normal", "assets/images/" + SelectedResolution.path + "/ui/buttons/menu_button.png");
        this.load.image("menu_button-hover", "assets/images/" + SelectedResolution.path + "/ui/buttons/menu_hover.png");
        this.load.image("menu_button-disabled", "assets/images/" + SelectedResolution.path + "/ui/buttons/menu_disable.png");

        this.load.image("plus_button-normal", "assets/images/" + SelectedResolution.path + "/ui/buttons/plus_button.png");
        this.load.image("plus_button-hover", "assets/images/" + SelectedResolution.path + "/ui/buttons/plus_hover.png");
        this.load.image("plus_button-disabled", "assets/images/" + SelectedResolution.path + "/ui/buttons/plus_disable.png");

        this.load.image("minus_button-normal", "assets/images/" + SelectedResolution.path + "/ui/buttons/minus_button.png");
        this.load.image("minus_button-hover", "assets/images/" + SelectedResolution.path + "/ui/buttons/minus_hover.png");
        this.load.image("minus_button-disabled", "assets/images/" + SelectedResolution.path + "/ui/buttons/minus_disable.png");

        this.load.image("info-button-normal", "assets/images/" + SelectedResolution.path + "/ui/popups/info_normal.png");
        this.load.image("info-button-hover", "assets/images/" + SelectedResolution.path + "/ui/popups/info_hover.png");
        this.load.image("info-button-disabled", "assets/images/" + SelectedResolution.path + "/ui/popups/info_disable.png");

        this.load.image("paytable-button-normal", "assets/images/" + SelectedResolution.path + "/ui/popups/paytable_normal.png");
        this.load.image("paytable-button-hover", "assets/images/" + SelectedResolution.path + "/ui/popups/paytable_hover.png");
        this.load.image("paytable-button-disabled", "assets/images/" + SelectedResolution.path + "/ui/popups/paytable_disable.png");

        this.load.image("setting-button-normal", "assets/images/" + SelectedResolution.path + "/ui/popups/setting_normal.png");
        this.load.image("setting-button-hover", "assets/images/" + SelectedResolution.path + "/ui/popups/setting_hover.png");
        this.load.image("setting-button-disabled", "assets/images/" + SelectedResolution.path + "/ui/popups/setting_disable.png");

        this.load.image("close-button-normal", "assets/images/" + SelectedResolution.path + "/ui/buttons/close_normal.png");
        this.load.image("close-button-hover", "assets/images/" + SelectedResolution.path + "/ui/buttons/close_hover.png");
        this.load.image("close-button-disabled", "assets/images/" + SelectedResolution.path + "/ui/buttons/close_disable.png");
        this.load.image("home-button-normal", "assets/images/" + SelectedResolution.path + "/ui/buttons/home_normal.png");
        this.load.image("home-button-hover", "assets/images/" + SelectedResolution.path + "/ui/buttons/home_hover.png");
        this.load.image("home-button-disabled", "assets/images/" + SelectedResolution.path + "/ui/buttons/home_disable.png");
        this.load.image("volume-button-normal", "assets/images/" + SelectedResolution.path + "/ui/buttons/sound_normal.png");
        this.load.image("volume-button-hover", "assets/images/" + SelectedResolution.path + "/ui/buttons/sound_hover.png");
        this.load.image("volume-button-disabled", "assets/images/" + SelectedResolution.path + "/ui/buttons/sound_disable.png");
        this.load.image("music-button-normal", "assets/images/" + SelectedResolution.path + "/ui/buttons/music_normal.png");
        this.load.image("music-button-hover", "assets/images/" + SelectedResolution.path + "/ui/buttons/music_hover.png");
        this.load.image("music-button-disabled", "assets/images/" + SelectedResolution.path + "/ui/buttons/music_disable.png");

        this.load.image("spin_base", "assets/images/" + SelectedResolution.path + "/ui/spin_base.png");

        this.load.image("fast_spin_button-normal", "assets/images/" + SelectedResolution.path + "/ui/buttons/fast_spin_button.png");
        this.load.image("fast_spin_button-hover", "assets/images/" + SelectedResolution.path + "/ui/buttons/fast_spin_hover.png");
        this.load.image("fast_spin_button-disabled", "assets/images/" + SelectedResolution.path + "/ui/buttons/fast_spin_disable.png");

        this.load.image("spin_button-normal", "assets/images/" + SelectedResolution.path + "/ui/buttons/spin_button.png");
        this.load.image("spin_button-hover", "assets/images/" + SelectedResolution.path + "/ui/buttons/spin_hover.png");
        this.load.image("spin_button-disabled", "assets/images/" + SelectedResolution.path + "/ui/buttons/spin_disable.png");

        this.load.image("auto_spin_button-normal", "assets/images/" + SelectedResolution.path + "/ui/buttons/auto_spin_button.png");
        this.load.image("auto_spin_button-hover", "assets/images/" + SelectedResolution.path + "/ui/buttons/auto_spin_hover.png");
        this.load.image("auto_spin_button-disabled", "assets/images/" + SelectedResolution.path + "/ui/buttons/auto_spin_disable.png");


        this.load.image("bet_base", "assets/images/" + SelectedResolution.path + "/ui/bet_base.png");

        this.load.image("last_win_base", "assets/images/" + SelectedResolution.path + "/ui/last_win_base.png");
        this.load.image("total_win_base", "assets/images/" + SelectedResolution.path + "/ui/total_win_base.png");

        this.load.image("popup_overlay", "assets/images/" + SelectedResolution.path + "/ui/popups/menu_overlay.png");
        this.load.image("pop-overlay", "assets/images/" + SelectedResolution.path + "/ui/overlay.png");
        // this.load.image("coins-heap", "assets/images/" + SelectedResolution.path + "/items/coins-heap.png");
        this.load.image("switch-background-on", "assets/images/" + SelectedResolution.path + "/ui/switch-background-on-normal.png");
        this.load.image("switch-background-off", "assets/images/" + SelectedResolution.path + "/ui/switch-background-off-normal.png");
        this.load.image("switch-ball", "assets/images/" + SelectedResolution.path + "/ui/switch-ball.png");

        // this.load.image("popup-close-normal", "assets/images/" + SelectedResolution.path + "/ui/popups/popup-close-normal.png");
        // this.load.image("popup-close-hover", "assets/images/" + SelectedResolution.path + "/ui/popups/popup-close-hover.png");
        // this.load.image("popup-close-disabled", "assets/images/" + SelectedResolution.path + "/ui/popups/popup-close-normal.png");

        this.load.image("popup-accept-normal", "assets/images/" + SelectedResolution.path + "/ui/popups/popup-accept-normal.png");
        this.load.image("popup-accept-hover", "assets/images/" + SelectedResolution.path + "/ui/popups/popup-accept-hover.png");
        this.load.image("popup-accept-disabled", "assets/images/" + SelectedResolution.path + "/ui/popups/popup-accept-normal.png");

        this.load.image("popup-decline-normal", "assets/images/" + SelectedResolution.path + "/ui/popups/popup-decline-normal.png");
        this.load.image("popup-decline-hover", "assets/images/" + SelectedResolution.path + "/ui/popups/popup-decline-hover.png");
        this.load.image("popup-decline-disabled", "assets/images/" + SelectedResolution.path + "/ui/popups/popup-decline-normal.png");
        // pop new bg
        this.load.image("pop-bg", "assets/images/" + SelectedResolution.path + "/ui/popups/autogamebg.png");
        this.load.image("pop-bg-1", "assets/images/" + SelectedResolution.path + "/ui/popups/autogamebg_frame.png");
        this.load.image("symbol-a", "assets/images/" + SelectedResolution.path + "/reels/symbols/a.png");
        this.load.image("symbol-bug", "assets/images/" + SelectedResolution.path + "/reels/symbols/bug.png");
        this.load.image("symbol-cat", "assets/images/" + SelectedResolution.path + "/reels/symbols/cat.png");
        this.load.image("symbol-cross", "assets/images/" + SelectedResolution.path + "/reels/symbols/cross.png");
        this.load.image("symbol-eagle", "assets/images/" + SelectedResolution.path + "/reels/symbols/eagle.png");
        this.load.image("symbol-j", "assets/images/" + SelectedResolution.path + "/reels/symbols/j.png");
        this.load.image("symbol-k", "assets/images/" + SelectedResolution.path + "/reels/symbols/k.png");
        this.load.image("symbol-q", "assets/images/" + SelectedResolution.path + "/reels/symbols/q.png");
        this.load.image("symbol-ring", "assets/images/" + SelectedResolution.path + "/reels/symbols/ring.png");
        this.load.image("symbol-farao", "assets/images/" + SelectedResolution.path + "/reels/symbols/farao.png");
        this.load.image("symbol-book", "assets/images/" + SelectedResolution.path + "/reels/symbols/book.png");
        this.load.image("symbol-wild", "assets/images/" + SelectedResolution.path + "/reels/symbols/wild.png");
        this.load.image("symbol-bonus", "assets/images/" + SelectedResolution.path + "/reels/symbols/bonus.png");
        this.load.image("symbol-freeSpin", "assets/images/" + SelectedResolution.path + "/reels/symbols/freeSpin.png");
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


        //PLugins
        this.load.plugin('rexscrollerplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexscrollerplugin.min.js', true);
        this.load.setPath("assets/images/" + SelectedResolution.path + "/spines/");
        //Spine
        this.load.spine("big_win_spine", 'bigwinspine/big_win.json', 'bigwinspine/big_win.atlas');
        this.load.spine("mega_win_spine", 'megawinspine/mega_win.json', 'megawinspine/mega_win.atlas');
        this.load.spine("super_win_spine", 'superwinspine/super_win.json', 'superwinspine/super_win.atlas');
        this.load.spine("title_art_spine", 'titleart/title_art_interior.json', 'titleart/title_art_interior.atlas');
        this.load.spine("score_glow_spine", 'scoreglowspine/skeleton.json', 'scoreglowspine/skeleton.atlas');
        this.load.spine("left_character_spine", 'leftcharacterspine/l_charecter.json', 'leftcharacterspine/l_charecter.atlas');
        this.load.spine("right_character_spine", 'rightcharacterspine/r_charecter.json', 'rightcharacterspine/r_charecter.atlas');
        this.load.spine("fire_spine", 'firespine/fire.json', 'firespine/fire.atlas');

        //Symbol Spine
        this.load.spine("animation-symbol-freeSpin", 'freespin/free_spin.json', 'freespin/free_spin.atlas');
        this.load.spine("animation-symbol-book", 'bookspine/golden_book.json', 'bookspine/golden_book.atlas');
        this.load.spine("animation-symbol-bug", 'bugspine/golden_bug.json', 'bugspine/golden_bug.atlas');
        this.load.spine("animation-symbol-cat", 'catspine/golden_cat.json', 'catspine/golden_cat.atlas');
        this.load.spine("animation-symbol-cross", 'crossspine/golden_cross.json', 'crossspine/golden_cross.atlas');
        this.load.spine("animation-symbol-eagle", 'eaglespine/golden_eagle.json', 'eaglespine/golden_eagle.atlas');
        this.load.spine("animation-symbol-farao", 'faraospine/golden_farao.json', 'faraospine/golden_farao.atlas');
        this.load.spine("animation-symbol-ring", 'ringspine/golden_ring.json', 'ringspine/golden_ring.atlas');
        this.load.spine("animation-symbol-wild", 'wildspine/wild_symbol.json', 'wildspine/wild_symbol.atlas');
        this.load.spine("animation-symbol-bonus", 'bonusspine/bonus.json', 'bonusspine/bonus.atlas');
        this.load.spine("animation-symbol-a", 'a_spine/a_symbol.json', 'a_spine/a_symbol.atlas');
        this.load.spine("animation-symbol-j", 'jspine/j_symbol.json', 'jspine/j_symbol.atlas');
        this.load.spine("animation-symbol-k", 'kspine/k_symbol.json', 'kspine/k_symbol.atlas');
        this.load.spine("animation-symbol-q", 'qspine/q_symbol.json', 'qspine/q_symbol.atlas');
        this.load.spine("animation-payline", 'payline_shadow/payline.json', 'payline_shadow/payline.atlas');
        this.load.spine("coin-animation", 'coin_spines/coin.json', 'coin_spines/coin.atlas');
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
        let config = this.cache.json.get("resolution-config");
        this.progressBar.setCrop(0, 0, this.progressBar.width * percents, this.progressBar.height);
        this.percentsText.setText('Loading...' + Math.round(percents * 100) + "%");
        // this.loaderInsect.x = this.startX + ((this.progressBar.displayWidth - config.loading.insects.distance) * percents);
    }

    resize(newWidth, newHeight) {
        let newScale = getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);
        let config = this.cache.json.get("resolution-config");
        this.background.setDisplaySize(newWidth, newHeight);
        this.gameTitle.setScale(newScale);
        this.gameTitle.setPosition(
            newWidth / 2,
            newHeight / 2 - config.loading.logo.y * newScale
        );

        this.progressBase.setScale(newScale);
        this.progressBase.setPosition(
            newWidth / 2,
            this.gameTitle.y + config.loading.logo.stepAfter * newScale
        );

        this.progressBar.setScale(newScale);
        this.progressBar.setPosition(
            newWidth / 2,
            this.gameTitle.y + config.loading.logo.stepAfter * newScale
        );

        // this.loaderInsect.setScale(newScale);
        // this.loaderInsect.setPosition(
        //     newWidth / 2 - config.loading.insects.x * newScale,
        //     this.gameTitle.y + config.loading.logo.stepAfter * newScale
        // );
        // this.startX = this.loaderInsect.x;

        this.percentsText.setScale(newScale);
        this.percentsText.setPosition(
            newWidth / 2,
            this.progressBar.y - config.loading.text.y * newScale
        );
    };
}

export default GamePreloader;