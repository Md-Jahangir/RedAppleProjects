import Phaser from 'phaser';
import FontFaceObserver from 'fontfaceobserver';
import { Constant } from './Constant.js';
import { SoundManager } from "./SoundManager.js";
import InactiveGamePopup from "./popups/InactiveGamePopup.js";
import { Model } from './Model.js';
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
            "PR-Viking": null
        }
    };

    preload() {
        if (Constant.isPortrait) {
            this.load.image('portrait_bg', 'assets/images/gameplay/portrait_bg.jpg');
            this.load.image('portrait_logo', 'assets/images/gameplay/Nordic_Treasure_logo.png');
        }
        else {
            this.load.image('landscape_bg', 'assets/images/gameplay/landscape_bg.jpg');
            this.load.image('landscape_logo', 'assets/images/gameplay/Nordic_Treasure_logo.png');
        }
        this.load.image('progress_base', 'assets/images/gameplay/progress_base.png');
        this.load.image('progress_bar', 'assets/images/gameplay/progress_bar.png');
        //POPUP


        this.load.plugin('rexscrollerplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexscrollerplugin.min.js', true);
    };

    create() {
        if (Constant.isPortrait) {
            let splashBg = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2), "portrait_bg").setOrigin(0.5, 0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
            this.splashLogo = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2.5), "portrait_logo").setOrigin(0.5, 0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        }
        else {
            let splashBg = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2), "landscape_bg").setOrigin(0.5, 0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
            this.splashLogo = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2.5), "landscape_logo").setOrigin(0.5, 0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        }

        //-----------------------------------------------------------------------------------------------------------------------------------
        if (Constant.isMobile) {
            if (Constant.isPortrait) {
                let progressBase = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 1.25), "progress_base").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor * 0.7, Constant.scaleFactor);
                this.progressBar = this.add.image(Math.round(Constant.game.config.width / 13), Math.round(Constant.game.config.height / 1.25), "progress_bar").setOrigin(0, 0.5).setScale(Constant.scaleFactor * 0.6, Constant.scaleFactor);
                this.progressBar.setCrop(0, 0, 0, this.progressBar.height);
            }
            else {
                let progressBase = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 1.25), "progress_base").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor * 1.1, Constant.scaleFactor);
                this.progressBar = this.add.image(Math.round(Constant.game.config.width / 7.4), Math.round(Constant.game.config.height / 1.25), "progress_bar").setOrigin(0, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
                this.progressBar.setCrop(0, 0, 0, this.progressBar.height);
            }
        }
        else {
            let progressBase = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 1.25), "progress_base").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor * 1.1, Constant.scaleFactor);
            this.progressBar = this.add.image(Math.round(Constant.game.config.width / 7.4), Math.round(Constant.game.config.height / 1.25), "progress_bar").setOrigin(0, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
            this.progressBar.setCrop(0, 0, 0, this.progressBar.height);
        }
        //---------------------------------------------------------------------------------------------------------------------------------------

        this.loadFonts();
        // this.loadAssets();
    }

    //======================================
    loadFonts() {
        // console.log("loadFonts");
        // let propNames = Object.getOwnPropertyNames(this.fonts);
        // propNames.forEach((fontName, index) => {
        //     let isLast = index >= propNames.length - 1;
        //     this.fonts[fontName] = new FontFaceObserver(fontName);

        //     this.fonts[fontName].load(null, 5000).then(() => {
        //         this.fontLoadSuccess.bind(this, fontName, isLast);
        //     });
        // });

        let propNames = Object.getOwnPropertyNames(this.fonts);
        propNames.forEach((fontName, index) => {
            let isLast = index >= propNames.length - 1;
            this.fonts[fontName] = new FontFaceObserver(fontName);
            this.fonts[fontName].load().then(this.fontLoadSuccess.bind(this, fontName, isLast), this.fontLoadError.bind(this, fontName));
        });
    };

    fontLoadSuccess(fontName, isLast) {
        // if (isLast) {
        //     if (Server.isUrlParamsMissing()) {
        //         this.scene.start("GameErrorScene");
        //     } else {
        //         this.CallInitialDataAPI();
        //     }
        // }
        if (isLast) {
            Model.setBalance(5000);

            this.loadAssets();
        }
    };
    fontLoadError(fontName) { };

    // async CallInitialDataAPI() {
    //     let initialData = await Server.getInitialData();
    //     // console.log("initialData: ", initialData);
    //     if (!initialData.error) {
    //         if (initialData.data.status) {
    //             if (initialData.data.result.length == 0) {
    //                 this.scene.start("GameErrorScene");
    //             } else {
    //                 this.OnInitialDataReceived(initialData.data.result);
    //             }
    //         } else {
    //             //SHOW popup 
    //             this.inactiveGamePopup = new InactiveGamePopup(this, initialData.data.msg);
    //         }
    //     } else {
    //         this.inactiveGamePopup = new InactiveGamePopup(this, initialData.message);
    //     }
    // };
    // OnInitialDataReceived(data) {
    //     Model.setBalance(data.balance);
    //     Model.setBetsValues(data.betsValues);
    //     Model.setPaylines(data.paylines);

    //     Model.SetLineNumber(data.paylines.length);
    //     Model.SetBetAmountValue(data.betAmountValue);

    //     this.loadAssets();
    // };

    // fontLoadError(fontName) { };

    loadAssets() {
        this.load.on('progress', this.loadProgress, this);
        this.load.on('complete', this.complete, { scene: this.scene });

        //GAMEPLAY
        this.load.image('bg_portrait_game', 'assets/images/gameplay/bg_portrait.jpg');
        this.load.image('gameplay_bg_blur_game', 'assets/images/gameplay/gameplay_bg_blur.jpg');
        this.load.image('gameplay_frame', 'assets/images/gameplay/gameplay_frame.png');
        this.load.image('description', 'assets/images/gameplay/description.png');
        this.load.image('gameplay_frame_layer_1', 'assets/images/gameplay/gameplay_frame_layer_1.png');
        this.load.image('gameplay_frame_layer_2', 'assets/images/gameplay/gameplay_frame_layer_2.png');

        this.load.image('one_pixel_white', 'assets/images/gameplay/one_pixel_white.png');
        this.load.image('one_pixel_black', 'assets/images/gameplay/one_pixel_black.png'); ~
            this.load.image('transparent_image', 'assets/images/gameplay/transparent_image.png');
        this.load.image('Nordics_Treasure_logo', 'assets/images/gameplay/Nordics_Treasure_logo.png');
        this.load.image('buy_bonus_button', 'assets/images/gameplay/buy_bonus_button.png');
        this.load.image('button_close_settings', 'assets/images/popups/autoplay/button_close_settings.png');

        this.load.image('menu', 'assets/images/gameplay/menu.png');

        //Bottom Panel
        this.load.image('auto_spin_button', 'assets/images/gameplay/bottomPanel/auto_spin_button.png');
        this.load.image('bottom_panel_bg', 'assets/images/gameplay/bottomPanel/bottom_panel_bg.png');
        this.load.image('button_start_game_round', 'assets/images/gameplay/bottomPanel/button_start_game_round.png');
        this.load.image('button_star_autoplay', 'assets/images/gameplay/bottomPanel/button_star_autoplay.png');
        this.load.image('button_stop_autoplay', 'assets/images/gameplay/bottomPanel/button_stop_autoplay.png');
        this.load.image('autoPlay_counter_base', 'assets/images/gameplay/bottomPanel/autoPlay_counter_base.png')
        //Auto Play Settings
        this.load.image('autoplay_settings', 'assets/images/popups/autoplay/autoplay_settings.png');
        this.load.image('button_selection', 'assets/images/popups/autoplay/button_selection.png');
        this.load.image('rock_loss_limit', 'assets/images/popups/autoplay/rock_loss_limit.png');

        this.load.image('rock_single_winLimit', 'assets/images/popups/autoplay/rock_single_winLimit.png');
        this.load.image('rock_win_limit', 'assets/images/popups/autoplay/rock_win_limit.png');//buttonStarAutoplay

        //Menu Settings page
        this.load.image('settings_menu_base', 'assets/images/popups/menu/settings_menu_base.png');
        this.load.image('button_scroll', 'assets/images/popups/menu/button_scroll.png');
        this.load.image('button_right', 'assets/images/popups/menu/button_right.png');
        this.load.image('button_paytable', 'assets/images/popups/menu/button_paytable.png');
        this.load.image('button_info', 'assets/images/popups/menu/button_info.png');
        this.load.image('button_game_settings', 'assets/images/popups/menu/button_game_settings.png');

        this.load.image('button_close_game', 'assets/images/popups/menu/button_close_game.png');
        this.load.image('button_close_menu', 'assets/images/popups/menu/button_close_menu.png');

        this.load.spritesheet("music_button", "assets/images/popups/menu/music_button.png", { frameWidth: 245 / 2, frameHeight: 121 });
        this.load.spritesheet("sound_button", "assets/images/popups/menu/sound_button.png", { frameWidth: 123, frameHeight: 121 });
        //
        this.load.image('spin_button', 'assets/images/gameplay/bottomPanel/spin_button.png');
        this.load.image('misterey_symbol', 'assets/images/gameplay/reel/misterey_symbol.png');

        this.load.image('arrow_button', 'assets/images/gameplay/bottomPanel/arrow_button.png');
        //-------------------------------settings pop up-------------------------------


        this.load.image('ButtonBackGorundMusic', 'assets/images/popups/settings/ButtonBackGorundMusic.png');
        this.load.image('ButtonFastPlay', 'assets/images/popups/settings/ButtonFastPlay.png');
        this.load.image('ButtonSoundeffects', 'assets/images/popups/settings/ButtonSoundeffects.png');
        this.load.image('rock_fastplay', 'assets/images/popups/settings/rock_fastplay.png');
        this.load.image('rockbackmusic', 'assets/images/popups/settings/rockbackmusic.png');
        this.load.image('RockSoundEffect', 'assets/images/popups/settings/RockSoundEffect.png');
        this.load.image('RockSpaceBar', 'assets/images/popups/settings/RockSpaceBar.png');
        this.load.spritesheet("button_onof", "assets/images/popups/settings/button_onof.png", { frameWidth: 113, frameHeight: 60 });//
        this.load.spritesheet("button_offon", "assets/images/popups/settings/button_onof.png", { frameWidth: 113, frameHeight: 60 })

        //---------------------bonus pop up landscape design--------------------------- 

        this.load.image('buton_right', 'assets/images/popups/bonusPopup/buton_right.png');
        this.load.image('button_50fun', 'assets/images/popups/bonusPopup/button_50fun.png');
        this.load.image('button_left', 'assets/images/popups/bonusPopup/button_left.png');
        this.load.image('central_button_title', 'assets/images/popups/bonusPopup/central_button_title.png');
        this.load.image('full_ilustration', 'assets/images/popups/bonusPopup/full_ilustration.png');

        this.load.image('parchment', 'assets/images/popups/bonusPopup/parchment.png');
        this.load.image('scatter', 'assets/images/popups/bonusPopup/scatter.png');
        this.load.image('background', 'assets/images/popups/bonusPopup/background.png');
        this.load.image('parchment', 'assets/images/popups/bonusPopup/parchment.png');
        //----------------------------------- for portrait design----------------------------------------------

        this.load.image('ilustration_portrait', 'assets/images/popups/bonusPopup/ilustration_portrait.png');
        this.load.image('back_portrait', 'assets/images/popups/bonusPopup/back_portrait.png');
        this.load.image('buttonfun50.00_portrait', 'assets/images/popups/bonusPopup/buttonfun50.00_portrait.png');
        this.load.image('cancel_portrait', 'assets/images/popups/bonusPopup/cancel_portrait.png');

        this.load.image('scatter_portrait', 'assets/images/popups/bonusPopup/scatter_portrait.png');
        this.load.image('start_portrait', 'assets/images/popups/bonusPopup/start_portrait.png');
        this.load.image('title_portrait', 'assets/images/popups/bonusPopup/title_portrait.png');
        //------------------------------------------------------------------------------------


        //REEL AND SYMBOLS
        //symbols
        this.load.image('reel_bg', 'assets/images/gameplay/reel/reel_bg.png');

        this.load.image("symbol_a", "assets/images/gameplay/reel/symbols/org/a.png");
        this.load.image("symbol_10", "assets/images/gameplay/reel/symbols/org/10.png");
        this.load.image("symbol_9", "assets/images/gameplay/reel/symbols/org/9.png");
        this.load.image("symbol_j", "assets/images/gameplay/reel/symbols/org/j.png");
        this.load.image("symbol_k", "assets/images/gameplay/reel/symbols/org/k.png");
        this.load.image("symbol_q", "assets/images/gameplay/reel/symbols/org/q.png");
        this.load.image("symbol_character_1", "assets/images/gameplay/reel/symbols/org/character_1.png");
        this.load.image("symbol_character_2", "assets/images/gameplay/reel/symbols/org/character_2.png");
        this.load.image("symbol_character_3", "assets/images/gameplay/reel/symbols/org/character_3.png");
        this.load.image("symbol_character_4", "assets/images/gameplay/reel/symbols/org/character_4.png");
        this.load.image("symbol_scatter", "assets/images/gameplay/reel/symbols/org/scatter.png");
        this.load.image("symbol_misterey", "assets/images/gameplay/reel/symbols/org/misterey.png");

        this.load.image("one_pixel_black", "assets/images/gameplay/one_pixel_black.png");

        // Blur Images
        this.load.image("Blured_9", "assets/images/gameplay/reel/symbols/blur/Blured_9.png");
        this.load.image("Blured_10", "assets/images/gameplay/reel/symbols/blur/Blured_10.png");
        this.load.image("Blured_a", "assets/images/gameplay/reel/symbols/blur/Blured_a.png");
        this.load.image("Blured_character_4", "assets/images/gameplay/reel/symbols/blur/Blured_character_4.png");
        this.load.image("Blured_character_1", "assets/images/gameplay/reel/symbols/blur/Blured_character_1.png");
        this.load.image("Blured_character_2", "assets/images/gameplay/reel/symbols/blur/Blured_character_2.png");
        this.load.image("Blured_character_3", "assets/images/gameplay/reel/symbols/blur/Blured_character_3.png");
        this.load.image("Blured_j", "assets/images/gameplay/reel/symbols/blur/Blured_j.png");
        this.load.image("Blured_k", "assets/images/gameplay/reel/symbols/blur/Blured_k.png");
        this.load.image("Blured_q", "assets/images/gameplay/reel/symbols/blur/Blured_q.png");
        this.load.image("Blured_scatter", "assets/images/gameplay/reel/symbols/blur/Blured_Scatter_symbol.png");
        this.load.image("Blured_misterey", "assets/images/gameplay/reel/symbols/blur/Blured_misterey.png");
        //symbols winning animation        
        this.load.spritesheet("numbersSpritesheet", "assets/images/gameplay/numbersSpritesheet.png", { frameWidth: 1848 / 11, frameHeight: 166 });
        this.load.spritesheet("fireSpritesheet", "assets/images/gameplay/fireSpritesheet.png", { frameWidth: 2880 / 18, frameHeight: 155 });
        this.load.spritesheet("thunder_spritesheet", "assets/images/gameplay/thunder_spritesheet.png", { frameWidth: 2690 / 8, frameHeight: 913 });

        this.load.image("dot", "assets/images/gameplay/dot.png");
        this.load.spritesheet("winNumbers", "assets/images/gameplay/winNumbers.png", { frameWidth: 1680 / 10, frameHeight: 166 });

        //AUDIO
        this.load.audio('background_sound', 'assets/sounds/org/background.mp3');
        this.load.audio('spin_sound', 'assets/sounds/org/spin.mp3');
        this.load.audio('spin_stop_sound', 'assets/sounds/org/spin_stop.mp3');

        this.load.audio('normal_match', 'assets/sounds/org/normal_match.mp3');
        this.load.audio('match7', 'assets/sounds/org/match7.mp3');
        this.load.audio('roll_after_matching', 'assets/sounds/org/roll_after_matching.mp3');
        this.load.audio('character1', 'assets/sounds/org/character1.wav');
        this.load.audio('hammermp3', 'assets/sounds/org/hammermp3.mp3');

        this.load.audio('bonus_button_sound', 'assets/sounds/org/Tap_to_play.mp3');
        this.load.audio('bonus_start_sound', 'assets/sounds/org/bonus_info_outro.mp3');
        this.load.audio('bonus_play_sound', 'assets/sounds/org/bonus_info_intro.mp3');
        this.load.audio('roll2', 'assets/sounds/org/roll2.mp3');
        this.load.audio('roll1', 'assets/sounds/org/roll1.mp3');

        this.load.audio('slowreel_sound', 'assets/sounds/org/roll1.mp3');
        this.load.audio('thor2', 'assets/sounds/org/thor2.mp3');
        this.load.audio('peliroja', 'assets/sounds/org/peliroja.mp3');
        this.load.audio('strom', 'assets/sounds/org/strom.mp3');

        //spine 
        this.load.setPath('assets/images/gameplay/spine/');
        this.load.spine('scatter', 'Scatter_Animation.json', 'Scatter_Animation.atlas');

        this.load.spine('allinone', 'Symbol_Animation.json', 'Symbol_Animation.atlas');

        this.load.spine('barbas_anim', 'Barbas_Animation_sk.json', 'Barbas_Animation_sk.atlas');
        this.load.spine('thunder_anim', 'Thunder_Animation.json', 'Thunder_Animation.atlas');
        this.load.spine('morena_anim', 'Morena_Animation.json', 'Morena_Animation.atlas');
        this.load.spine('slowreel_anim', 'Slowreel_Animation.json', 'Slowreel_Animation.atlas');
        this.load.spine('thor_anim', 'Thor_Animation.json', 'Thor_Animation.atlas');
        this.load.spine('peliroja_anim', 'Peliroja_Scaled.json', 'Peliroja_Scaled.atlas');
        this.load.spine('roughboy_anim', 'Roughboy_scaled.json', 'Roughboy_scaled.atlas');

        this.load.spine('map_tap_to_play', 'map_.json', 'map_.atlas');

        this.load.spine('strom', 'Storm.json', 'Storm.atlas');
        this.load.spine('fog', 'Fog_back.json', 'Fog_back.atlas');

        this.load.start();
    }

    loadProgress(percentage) {
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
        let i = 0;
        let myInterval = setInterval(() => {
            i++;
            if (i < 6) {
                this.scene.scene.FakeLoad()
            }
            else {
                clearInterval(myInterval);
                SoundManager.CreateSound();
                this.scene.stop("PreloadScene");
                this.scene.start("GameScene");
            }
        }, 1000);

    }

}