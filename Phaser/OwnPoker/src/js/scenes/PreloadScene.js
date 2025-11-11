import Phaser from "phaser";
import FontFaceObserver from "fontfaceobserver";
import { Utils } from "../Utils.js";
import { SelectedResolution } from "../ResolutionSelector.js";
import { Server } from "../services/Server.js";
import { Model } from "../Model.js";
// import { Client } from "../services/Client.js";

export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super('PreloadScene');
        this.progressBar = null;
        this.loadingText = null;
        this.numberOfTable = 5;
        this.numberOfProfilePic = 10;
        this.numberOfFrontCard = 4;
        this.fonts = {
            "BAHNSCHRIFT": null,
        }

        this.buttonImagesArray = [
            { name: 'sign_in_out_button', path: 'assets/images/signInUp/sign_in_out_button_base.png' },
            { name: 'back_button', path: 'assets/images/signInUp/back_button.png' },
            { name: 'fold_button', path: 'assets/images/gameScene/fold_button_base.png' },
            { name: 'call_button', path: 'assets/images/gameScene/call_button_base.png' },
            { name: 'check_button', path: 'assets/images/gameScene/check_button_base.png' },
            { name: 'raise_button', path: 'assets/images/gameScene/raise_button_base.png' },
            { name: 'raise_popup_plus_button', path: 'assets/images/gameScene/raise_popup_plus_button.png' },
            { name: 'raise_popup_minus_button', path: 'assets/images/gameScene/raise_popup_minus_button.png' },
            { name: 'raise_popup_cross_button', path: 'assets/images/gameScene/cross_button.png' },
            { name: 'raise_popup_correct_button', path: 'assets/images/gameScene/correct_button.png' },
            { name: 'leave_button', path: 'assets/images/gameScene/leave_button.png' },
            { name: 'cross_button', path: 'assets/images/popups/cross_button.png' },
            { name: 'plus_button', path: 'assets/images/dashboardAndChooseTable/plus_button.png' },
            { name: 'settings_button', path: 'assets/images/dashboardAndChooseTable/settings_button.png' },
            { name: 'dashboard_play_button', path: 'assets/images/dashboardAndChooseTable/dashboard_play_button.png' },
            { name: 'dashboard_register_button', path: 'assets/images/dashboardAndChooseTable/dashboard_register_button.png' },
            { name: 'nlh_plh_button', path: 'assets/images/dashboardAndChooseTable/nlh_plh_button.png' },
            { name: 'arrow_button', path: 'assets/images/dashboardAndChooseTable/arrow_button.png' },
            { name: 'edit_button', path: 'assets/images/profile/edit_button.png' },

        ];

        this.imagesNameArray = [
            //Sign In/Up Scene
            { name: "one_pixel_white", path: "assets/images/signInUp/one_pixel_white.png" },
            { name: "tob_base", path: "assets/images/signInUp/tob_base.png" },
            { name: "sign_in_heading", path: "assets/images/signInUp/sign_in_heading.png" },
            { name: "input_text_base", path: "assets/images/signInUp/input_text_base.png" },
            { name: "email_icon", path: "assets/images/signInUp/email_icon.png" },
            { name: "password_icon", path: "assets/images/signInUp/password_icon.png" },
            { name: "sign_up_heading", path: "assets/images/signInUp/sign_up_heading.png" },
            { name: "person_icon", path: "assets/images/signInUp/person_icon.png" },
            { name: "mobile_icon", path: "assets/images/signInUp/mobile_icon.png" },
            { name: "forgot_password_heading", path: "assets/images/signInUp/forgot_password_heading.png" },
            { name: "forgot_password_icon", path: "assets/images/signInUp/forgot_password_icon.png" },
            { name: "reset_password_heading", path: "assets/images/signInUp/reset_password_heading.png" },
            //Dashboard/Choose Table
            { name: "balance_base", path: "assets/images/dashboardAndChooseTable/balance_base.png" },
            { name: "dashboard_heading", path: "assets/images/dashboardAndChooseTable/dashboard_heading.png" },
            { name: "dashboard_table_base", path: "assets/images/dashboardAndChooseTable/dashboard_table_base.png" },
            { name: "dashboard_tournament_base", path: "assets/images/dashboardAndChooseTable/dashboard_tournament_base.png" },
            { name: "choose_table_heading", path: "assets/images/dashboardAndChooseTable/choose_table_heading.png" },
            { name: "nlh_plh_base", path: "assets/images/dashboardAndChooseTable/nlh_plh_base.png" },
            { name: "selected_arrow", path: "assets/images/dashboardAndChooseTable/selected_arrow.png" },
            { name: "plh_table", path: "assets/images/dashboardAndChooseTable/plh_table.png" },
            { name: "nlh_table", path: "assets/images/dashboardAndChooseTable/nlh_table.png" },
            { name: "table_balance_base", path: "assets/images/dashboardAndChooseTable/table_balance_base.png" },
            { name: "blinds_base", path: "assets/images/dashboardAndChooseTable/blinds_base.png" },
            { name: "player_base", path: "assets/images/dashboardAndChooseTable/player_base.png" },
            { name: "player_icon", path: "assets/images/dashboardAndChooseTable/player_icon.png" },
            { name: "profile_heading", path: "assets/images/profile/profile_heading.png" },
            { name: "profile_input_base", path: "assets/images/profile/profile_input_base.png" },
            { name: "profile__pic_base", path: "assets/images/profile/profile__pic_base.png" },
            { name: "profile_pic", path: "assets/images/profile/profile_pic.png" },
            { name: "buy_in_base", path: "assets/images/dashboardAndChooseTable/buy_in_base.png" },
            { name: "buy_in_bar", path: "assets/images/dashboardAndChooseTable/buy_in_bar.png" },

            //Game Scene
            { name: "table_bg", path: "assets/images/gameScene/table_bg.png" },
            { name: "raise_popup_base", path: "assets/images/gameScene/raise_popup_base.png" },
            { name: "pot_value_base", path: "assets/images/gameScene/pot_value_base.png" },
            { name: "raise_base", path: "assets/images/gameScene/raise_base.png" },
            { name: "raise_bar", path: "assets/images/gameScene/raise_bar.png" },
            //Player
            { name: "user_balance_base", path: "assets/images/gameScene/player/user_balance_base.png" },
            { name: "user_base", path: "assets/images/gameScene/player/user_base.png" },
            { name: "user_card_back", path: "assets/images/gameScene/player/user_card_back.png" },
            { name: "user_card_front", path: "assets/images/gameScene/player/user_card_front.png" },
            { name: "user_decision_base", path: "assets/images/gameScene/player/decision_base.png" },
            { name: "user_delear_base", path: "assets/images/gameScene/player/user_delear_base.png" },
            { name: "user_image", path: "assets/images/gameScene/player/user_image.png" },
            { name: "user_name_base", path: "assets/images/gameScene/player/user_name_base.png" },
            { name: "user_ring", path: "assets/images/gameScene/player/user_ring.png" },
            { name: "small_blind_base", path: "assets/images/gameScene/player/small_blind_base.png" },
            { name: "big_blind_base", path: "assets/images/gameScene/player/big_blind_base.png" },
            { name: "poker_chip", path: "assets/images/gameScene/player/poker_chip.png" },
            { name: "black_layer", path: "assets/images/gameScene/player/black_layer.png" },
            { name: "green_layer", path: "assets/images/gameScene/player/green_layer.png" },
            { name: "card_outline", path: "assets/images/gameScene/player/card_outline.png" },
            //Popup
            { name: "overlay", path: "assets/images/popups/overlay.png" },
            { name: "popup_base", path: "assets/images/popups/popup_base.png" },
        ];

        this.spritesheetArray = [
            { name: 'card_spritesheet', path: 'assets/images/gameScene/player/card_spritesheet47.png', frameConfig: { frameWidth: 2205 / 13, frameHeight: 1200 / 5 } },
            { name: 'loading_wheel', path: 'assets/images/popups/loading_wheel.png', frameConfig: { frameWidth: 157, frameHeight: 157 } },
            { name: 'eye_icon', path: 'assets/images/signInUp/eye_icon.png', frameConfig: { frameWidth: 78 / 2, frameHeight: 27 } },
            { name: 'check_box', path: 'assets/images/signInUp/check_box.png', frameConfig: { frameWidth: 74 / 2, frameHeight: 37 } },
        ];

        this.audioFiles = [
            { name: 'card', path: 'assets/sounds/card.mp3' },
        ];
    }

    preload() {
        let url;
        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js';
        this.load.plugin('rexbbcodetextplugin', url, true);

        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexteditplugin.min.js';
        this.load.plugin('rextexteditplugin', url, true);

        //SPLASH
        this.load.image('background', 'assets/images/common/background.png');
        this.load.image('progress_base', 'assets/images/preloadScene/progress_base.png');
        this.load.image('progress_bar', 'assets/images/preloadScene/progress_bar.png');
        this.load.image('logo', 'assets/images/preloadScene/logo.png');

    };

    create() {
        this.game.events.on("resize", this.resize, this);

        this.splashBg = this.add.image(0, 0, "background").setOrigin(0);
        this.logo = this.add.image(0, 0, "logo").setOrigin(0.5);
        this.progressBase = this.add.image(Math.round(this.scale.width / 2), Math.round(this.scale.height / 1.1), "progress_base").setOrigin(0.5);
        this.progressBar = this.add.image(Math.round(this.scale.width / 2), Math.round(this.scale.height / 1.1), "progress_bar").setOrigin(0.5);
        let loadingTextStyle = { fontFamily: 'Poppins_Bold', fontSize: '42px', fill: '#FFF', fontStyle: "normal", align: 'center' };
        this.loadingText = this.add.text(Math.round(this.scale.width / 2), Math.round(this.scale.height / 1.1), "Loading: ", loadingTextStyle).setOrigin(0.5);
        this.progressBar.setCrop(0, 0, 0, this.progressBar.height);
        this.LoadFonts();
        this.progressBase.setVisible(false);
        this.progressBar.setVisible(false);
        this.resize(window.innerWidth, window.innerHeight);
    };

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
            // if (Server.IsParamsMissing()) {
            // if (Client.IsParamsMissing()) {
            //     this.scene.start("GameErrorScene");
            // } else {
            this.LoadAssests();
            // }
        }
    };
    FontLoadError(fontName) { };

    LoadAssests() {
        const cardFrameWidth = 1155 / 13;
        const cardFrameHeight = 650 / 5;
        const loadingWheelFrameWidth = 157;
        const loadingWheelFrameHeight = 157;
        const sitInArrowFrameWidth = 98 / 2;
        const sitInArrowFrameHeight = 70;

        this.load.on('progress', this.LoadProgress, this);
        this.load.on('complete', this.OnComplete, { scene: this.scene });


        this.buttonImagesArray.forEach(button => {
            this.load.image(`${button.name}_normal`, button.path);
            this.load.image(`${button.name}_hover`, button.path);
            this.load.image(`${button.name}_disabled`, button.path);
        });

        this.imagesNameArray.forEach(_img => {
            this.load.image(_img.name, _img.path);
        });

        for (let i = 0; i < this.numberOfProfilePic; i++) {
            this.load.image(`profile_pic_${i}`, `assets/images/gameScene/player/profile_pic_${i}.png`);
        }
        for (let i = 0; i < this.numberOfTable; i++) {
            this.load.image(`table_bg_${i}`, `assets/images/gameScene/table_bg_${i}.png`);
        }
        for (let i = 0; i < this.numberOfFrontCard; i++) {
            this.load.spritesheet(`front_card_${i}`, `assets/images/gameScene/player/front_card_${i}.png`, { frameWidth: cardFrameWidth, frameHeight: cardFrameHeight });
        }

        this.spritesheetArray.forEach(_img => {
            this.load.spritesheet(_img.name, _img.path, _img.frameConfig);
        });

        this.audioFiles.forEach(audio => {
            this.load.audio(audio.name, audio.path);
        });


        this.load.start();
    };

    LoadProgress(percentage) {
        this.progressBar.setCrop(0, 0, this.progressBar.width * percentage, this.progressBar.height);
        percentage = percentage * 100;
        this.loadingText.setText("Loading: " + parseInt(percentage) + " %");
    }

    OnComplete() {
        // SoundManager.CreateSound();
        setTimeout(() => {
            console.log("localStorage.getItem('texas_poker_logged_in')==", localStorage.getItem("texas_poker_logged_in"));
            this.scene.stop('PreloadScene');
            if (localStorage.getItem("texas_poker_logged_in") == null || localStorage.getItem("texas_poker_logged_in") == "false") {
                this.scene.start("SignInScene");
            } else {
                this.scene.start("DashboardScene");
                // this.scene.start("ChooseTableScene");
            }
            // this.scene.start("UserProfileScene");
            // this.scene.start("DashboardScene");
            // this.scene.start("ChooseTableScene");
            // this.scene.start("ForgotPasswordScene");
            // this.scene.start("ResetPasswordScene");
            // this.scene.start("GameScene");
            // this.scene.start("GameErrorScene");
        }, 1000);
    }

    resize(newWidth, newHeight) {
        let newScale = Utils.getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);

        this.splashBg.setDisplaySize(newWidth, newHeight);

        this.logo.setScale(newScale);
        this.logo.setPosition(
            newWidth / 2,
            newHeight / 2.4
        );
        this.progressBase.setScale(newScale);
        this.progressBase.setPosition(
            newWidth / 2,
            newHeight / 1.1
        );

        this.progressBar.setScale(newScale);
        this.progressBar.setPosition(
            newWidth / 2,
            newHeight / 1.1
        );

        this.loadingText.setScale(newScale);
        this.loadingText.setPosition(
            newWidth / 2,
            newHeight / 1.07
        );
    }

}