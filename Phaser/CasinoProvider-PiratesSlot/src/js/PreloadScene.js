import Phaser from 'phaser';
import FontFaceObserver from 'fontfaceobserver';
import { Constant } from './Constant.js';
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
        this.splashContainer = null;
        this.fonts = {
            "kingsandpirates-peak": null,
            "Roboto_Bold": null,
            "modesto-expanded": null,
        }
    };

    preload() {

        this.load.image('loading_overlay', 'assets/images/loader/loading_overlay.png');
        this.load.image('progress_base', 'assets/images/loader/loading_base.png');
        this.load.image('progress_bar', 'assets/images/loader/loading_bar.png');
        this.load.image("logo", "assets/images/loader/brand_logo.png");
        this.load.image("play_button", "assets/images/loader/play_button.png");
        this.load.image("checkbox", "assets/images/loader/checkbox.png");
        this.load.image("tick", "assets/images/loader/tick.png");
        this.load.setPath('assets/images/gameplay/spine/');
        this.load.spine('title_art_spine', 'title_art_export/title_art.json', 'title_art_export/title_art.atlas');
        this.load.setPath('');
        this.load.plugin('rexscrollerplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexscrollerplugin.min.js', true);
    };

    create() {
        this.splashContainer = this.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);

        let splashBg = this.add.image(0, 0, "loading_overlay").setOrigin(0.5, 0.5).setScale(1, 1);
        this.splashContainer.add([splashBg]);
        this.gameTitle = this.add.image(splashBg.x, splashBg.y, "logo");
        let progressBase = this.add.image(-650, 200, "progress_base").setOrigin(0, 0.5)
        this.progressBar = this.add.image(progressBase.x + 5, progressBase.y, "progress_bar").setOrigin(0, 0.5).setScale(0, 1);
        this.progressBar.setCrop(0, 0, 0, this.progressBar.height);
        this.splashContainer.add([this.gameTitle, progressBase, this.progressBar]);
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
            // if (Server.isUrlParamsMissing()) {
            //     this.scene.start("GameErrorScene");
            // } else {
            this.CallInitialDataAPI();
            // }
        }
    };
    async CallInitialDataAPI() {
        let initialData = await Server.getInitialData();
        if (!initialData.error) {
            if (initialData.data.status) {
                if (initialData.data.result.length == 0) {
                    // this.scene.start("GameErrorScene");
                } else {
                    this.OnInitialDataReceived(initialData.data.result);
                }
            } else {
            }
        } else {
        }
    }
    //#############################################################################################
    fontLoadError(fontName) {
        console.error("Font loading error: ", fontName);
    };

    OnInitialDataReceived(response) {
        Model.setBalance(parseFloat(response.balance));
        Model.setBetsValues(response.betsValues);
        Model.setPaylines(response.paylines);
        Model.setPaytable(response.paytable);
        this.loadAssets();
    };

    loadAssets() {
        this.load.on('progress', this.loadProgress, this);
        this.load.on('complete', this.complete, { scene: this.scene });

        //GAMEPLAY
        this.load.image('popup_bg_game', 'assets/images/gameplay/game_bg.png');
        this.load.image('game_frame', 'assets/images/gameplay/game_frame.png');
        this.load.json('game_config', 'assets/game_config.json')

        // this.load.image('screen_rotation', 'assets/images/gameplay/screen_rotation.png');

        this.load.image('gameplay_frame', 'assets/images/gameplay/gameplay_frame.png');
        this.load.image('gameplay_frame_upper', 'assets/images/gameplay/gameplay_frame_upper.png');
        this.load.image('board_wheel', 'assets/images/gameplay/board_wheel.png');
        this.load.image('description', 'assets/images/gameplay/description.png');
        this.load.image('loading_overlay', 'assets/images/gameplay/loading_overlay.png');

        this.load.image('left_bar', 'assets/images/gameplay/reel/left_bar.png');
        this.load.image('right_bar', 'assets/images/gameplay/reel/right_bar.png');

        this.load.image('one_pixel_white', 'assets/images/gameplay/one_pixel_white.png');
        this.load.image('one_pixel_black', 'assets/images/gameplay/one_pixel_black.png');
        this.load.image('transparent_image', 'assets/images/gameplay/transparent_image.png');
        this.load.image('buy_bonus_button_disabled', 'assets/images/gameplay/bottomPanel/buy_bonus_button_disabled.png');
        this.load.image('button_close_settings', 'assets/images/popups/autoplay/button_close_settings.png');

        this.load.image('menu_button_normal', 'assets/images/gameplay/bottomPanel/menu_button_normal.png');
        this.load.image('menu_button_disabled', 'assets/images/gameplay/bottomPanel/menu_button_disabled.png');
        this.load.image('menu_button_glow', 'assets/images/gameplay/bottomPanel/menu_button_glow.png');
        //Bottom Panel
        this.load.image('auto_spin_button', 'assets/images/gameplay/bottomPanel/auto_spin_button.png');
        this.load.image('auto_spin_button_disabled', 'assets/images/gameplay/bottomPanel/auto_spin_button_disabled.png');
        this.load.image('bottom_panel_bg', 'assets/images/gameplay/bottomPanel/bottom_panel_bg.png');
        this.load.image('button_start_game_round', 'assets/images/gameplay/bottomPanel/button_start_game_round.png');
        this.load.image('button_star_autoplay', 'assets/images/gameplay/bottomPanel/button_star_autoplay.png');
        this.load.image('button_stop_autoplay', 'assets/images/gameplay/bottomPanel/button_stop_autoplay.png');
        this.load.image('autoPlay_counter_base', 'assets/images/gameplay/bottomPanel/autoPlay_counter_base.png')
        //Auto Play Settings
        this.load.image('autoplay_base', 'assets/images/popups/autoplay/autoplay_bg.png');
        this.load.image('autoplay_title_text', 'assets/images/popups/autoplay/autoplay_title_text.png');
        this.load.image('button_selection_normal', 'assets/images/popups/autoplay/button_selection_normal.png');
        this.load.image('button_selection_glow', 'assets/images/popups/autoplay/button_selection_glow.png');

        //Menu Settings page
        this.load.image('settings_menu_base', 'assets/images/popups/menu/settings_menu_base.png');
        this.load.image('home_button_glow', 'assets/images/popups/menu/home_button_glow.png');
        this.load.image('home_button_normal', 'assets/images/popups/menu/home_button_normal.png');

        this.load.image('info_button_glow', 'assets/images/popups/menu/info_button_glow.png');
        this.load.image('info_button_normal', 'assets/images/popups/menu/info_button_normal.png');

        this.load.image('paytable_button_normal', 'assets/images/popups/menu/paytable_button_normal.png');
        this.load.image('paytable_button_glow', 'assets/images/popups/menu/paytable_button_glow.png');

        this.load.image('payline_button_normal', 'assets/images/popups/menu/paytable_button_normal.png');
        this.load.image('payline_button_glow', 'assets/images/popups/menu/paytable_button_glow.png');

        this.load.image('settings_button_glow', 'assets/images/popups/menu/settings_button_glow.png');
        this.load.image('settings_button_normal', 'assets/images/popups/menu/settings_button_normal.png');

        this.load.image('close_button_normal', 'assets/images/popups/menu/close_button_normal.png');
        this.load.image('close_button_glow', 'assets/images/popups/menu/close_button_glow.png');

        this.load.spritesheet("music_button", "assets/images/popups/menu/music_button.png", { frameWidth: 166 / 2, frameHeight: 81 });
        this.load.spritesheet("sound_button", "assets/images/popups/menu/sound_button.png", { frameWidth: 166 / 2, frameHeight: 81 });
        //
        this.load.image('spin_button', 'assets/images/gameplay/bottomPanel/spin_button.png');
        this.load.image('spin_button_text', 'assets/images/gameplay/bottomPanel/spin_button_text.png');

        this.load.image('arrow_button', 'assets/images/gameplay/bottomPanel/arrow_button.png');
        //-------------------------------settings pop up-------------------------------


        this.load.image('ButtonBackGorundMusic', 'assets/images/popups/settings/ButtonBackGorundMusic.png');
        this.load.image('ButtonSoundeffects', 'assets/images/popups/settings/ButtonSoundeffects.png');
        this.load.image('rock_fastplay', 'assets/images/popups/settings/switch_ball.png');
        this.load.image('rockbackmusic', 'assets/images/popups/settings/switch_ball.png');
        this.load.image('RockSoundEffect', 'assets/images/popups/settings/switch_ball.png');
        this.load.image('RockSpaceBar', 'assets/images/popups/settings/switch_ball.png');
        this.load.spritesheet("button_onof", "assets/images/popups/settings/button_onof.png", { frameWidth: 93, frameHeight: 106 / 2 });//
        this.load.spritesheet("button_offon", "assets/images/popups/settings/button_onof.png", { frameWidth: 93, frameHeight: 106 / 2 })


        //---------------------bonus pop up landscape design--------------------------- 
        this.load.image('free_spin_popup_bg', 'assets/images/popups/bonusPopup/free_spin_popup_bg.png');
        this.load.image('buton_right', 'assets/images/popups/bonusPopup/button_left.png');
        this.load.image('button_50fun', 'assets/images/popups/bonusPopup/button_50fun.png');
        this.load.image('button_left', 'assets/images/popups/bonusPopup/button_left.png');
        this.load.image('central_button_title', 'assets/images/popups/bonusPopup/central_button_title.png');
        this.load.image('scatter', 'assets/images/popups/bonusPopup/scatter.png');
        //----------------------------------- for portrait design----------------------------------------------

        this.load.image('buttonfun50.00_portrait', 'assets/images/popups/bonusPopup/buttonfun50.00_portrait.png');
        this.load.image('title_portrait', 'assets/images/popups/bonusPopup/title_portrait.png');

        this.load.image('reel_bg', 'assets/images/gameplay/reel/reel_bg.png');

        this.load.image("symbol_a", "assets/images/gameplay/reel/symbols/a.png");
        this.load.image("symbol_anchor", "assets/images/gameplay/reel/symbols/anchor.png");
        this.load.image("symbol_bomb", "assets/images/gameplay/reel/symbols/bomb.png");
        this.load.image("symbol_j", "assets/images/gameplay/reel/symbols/j.png");
        this.load.image("symbol_k", "assets/images/gameplay/reel/symbols/k.png");
        this.load.image("symbol_q", "assets/images/gameplay/reel/symbols/q.png");
        this.load.image("symbol_hero", "assets/images/gameplay/reel/symbols/hero.png");
        this.load.image("symbol_heroine", "assets/images/gameplay/reel/symbols/heroine.png");
        this.load.image("symbol_villain", "assets/images/gameplay/reel/symbols/villain.png");
        this.load.image("symbol_letter", "assets/images/gameplay/reel/symbols/letter.png");
        this.load.image("symbol_gun", "assets/images/gameplay/reel/symbols/gun.png");
        this.load.image("symbol_hook", "assets/images/gameplay/reel/symbols/hook.png");
        this.load.image("symbol_octopus", "assets/images/gameplay/reel/symbols/octopus.png");

        this.load.image("one_pixel_black", "assets/images/gameplay/one_pixel_black.png");

        // Payline - Icons -------------------

        for (let index = 0; index < 20; index++) {
            this.load.image('payline-icon-' + index, 'assets/images/paylines-icons/' + index + '.png');
        }

        //AUDIO
        this.load.audio('spin_button_click_sound', 'assets/sounds/org/spin_button_click.wav');
        this.load.audio('spin_stop_sound', 'assets/sounds/org/spin_stop.wav');


        this.load.audio('button_click_sound', 'assets/sounds/org/button_click_sound.wav');
        this.load.audio('payline_wins_sound', 'assets/sounds/org/payline_wins_sound.wav');
        this.load.audio('reel_sound', 'assets/sounds/org/reel_sound.wav');
        this.load.audio('game_bg_sound', 'assets/sounds/org/game_bg_sound.mp3');

        this.load.audio('coin_anim_sound', 'assets/sounds/org/coin_anim_sound.wav');
        this.load.audio('coin_payout', 'assets/sounds/org/coin_payout.mp3');
        this.load.audio('big_win_sound', 'assets/sounds/org/big_win_sound.wav');
        this.load.audio('ultra_win_sound', 'assets/sounds/org/ultra_win_sound.mp3');
        this.load.audio('update_balance_sound', 'assets/sounds/org/update_balance_sound.mp3');
        this.load.audio('poup_show', 'assets/sounds/org/poup_show.wav');
        this.load.audio('popup_hide', 'assets/sounds/org/popup_hide.wav');

        //spine 
        this.load.setPath('assets/images/gameplay/spine/');
        this.load.spine('spine_anchor', 'anchor_export/anchor_mid.json', 'anchor_export/anchor_mid.atlas');
        this.load.spine('spine_heroine', 'heroine_export/heroine_high.json', 'heroine_export/heroine_high.atlas');
        this.load.spine('spine_a', 'a_export/a_test.json', 'a_export/a_test.atlas');
        this.load.spine('spine_j', 'j_export/j_test.json', 'j_export/j_test.atlas');
        this.load.spine('spine_q', 'q_export/q_test.json', 'q_export/q_test.atlas');
        this.load.spine('spine_k', 'k_export/k_test.json', 'k_export/k_test.atlas');
        this.load.spine('spine_hero', 'hero_export/hero_high.json', 'hero_export/hero_high.atlas');
        this.load.spine('spine_octopus', 'octo_export/octo_high.json', 'octo_export/octo_high.atlas');
        this.load.spine('spine_villain', 'vilain_export/vlain_high.json', 'vilain_export/vlain_high.atlas');
        this.load.spine('spine_wild', 'wild_card_export/wild_card.json', 'wild_card_export/wild_card.atlas');
        this.load.spine('spine_bomb', 'cannon_ball_export/cannon_ball_mid.json', 'cannon_ball_export/cannon_ball_mid.atlas');
        this.load.spine('spine_gun', 'gun_export/gun.json', 'gun_export/gun.atlas');
        this.load.spine('spine_hook', 'hook_export/hook_mid.json', 'hook_export/hook_mid.atlas');
        this.load.spine('spine_letter', 'letter_export/letter_mid.json', 'letter_export/letter_mid.atlas');
        this.load.spine('spine_game_bg', 'pirates_bg_export/pirate_bg.json', 'pirates_bg_export/pirate_bg.atlas');
        this.load.spine('spine_big_win_bg', 'bigwin_bg_export/pirate_win_bg.json', 'bigwin_bg_export/pirate_win_bg.atlas');
        this.load.spine('spine_big_win', 'big_win_export/pirate_bigwin.json', 'big_win_export/pirate_bigwin.atlas');
        this.load.spine('spine_mega_win', 'mega_win_export/pirate_mega_win.json', 'mega_win_export/pirate_mega_win.atlas');
        this.load.spine('spine_super_win', 'super_win_export/pirate_super_win.json', 'super_win_export/pirate_super_win.atlas');
        this.load.spine('spine_payline', 'payline_export/payline.json', 'payline_export/payline.atlas');
        this.load.spine('coin_1', 'coin_export_1/mega_coin.json', 'coin_export_1/mega_coin.atlas');
        this.load.spine('coin_2', 'coin_export_2/super_coin.json', 'coin_export_2/super_coin.atlas');
        this.load.spine('sprinkle_coins', 'sprinkle_coins_export/coin_sprinkle.json', 'sprinkle_coins_export/coin_sprinkle.atlas');
        this.load.spine('spine_free_spin', 'free_spin_export/free_spin.json', 'free_spin_export/free_spin.atlas');
        this.load.start();
    }

    loadProgress(percentage) {
        this.progressBar.scaleX = percentage;
        this.progressBar.setCrop(0, 0, this.progressBar.width * percentage, this.progressBar.height);
        percentage = percentage * 100;
    }
    FakeLoad() {
        if (Constant.isMobile) {
            if (Constant.isPortrait) {
                this.progressBar.scaleX += 0.02;
            }
            else {
                this.progressBar.scaleX += 0.01;
            }
        }
        else {
            this.progressBar.scaleX += 0.02;
        }
    }
    complete() {
        SoundManager.CreateSound(this.scene);
        if (localStorage.getItem('checkbox_selected_pirates') === false || localStorage.getItem('checkbox_selected_pirates') === null) {
            this.scene.start('SplashScene');
        } else {
            this.scene.start("GameScene");
        }
        let myInterval = setInterval(() => {
            clearInterval(myInterval);

        }, 1000);

    }

}