import FontFaceObserver from "fontfaceobserver";
import Phaser from "phaser";
import { Server } from "./Server.js";
import { SoundManager } from "./SoundManager.js";
import { Constant } from "./Constant.js";

export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super('PreloadScene');
        this.progressBar = null;
        this.loadingText = null;
        this.fonts = {
            "Kh_KoulenL": null,
            "NotoSans_Regular": null
        }
        // this.numberOfPlate = 3;
        // this.numberOfIncense = 3;
        // this.numberOfCandle = 4;
    }

    preload() {
        //SPLASH
        this.load.image('splash_bg', 'assets/images/common/background.png');
        this.load.image('mermaid', 'assets/images/common/mermaid.png');
        this.load.image('logo_khamer', 'assets/images/common/logo_khamer.png');
        this.load.image('logo_english', 'assets/images/common/logo_english.png');
        this.load.image('progress_base', 'assets/images/splash/progress_base.png');
        this.load.image('progress_base_black', 'assets/images/splash/progress_base_black.png');
        this.load.image('progress_bar', 'assets/images/splash/progress_bar.png');
    };

    create() {
        this.splashBg = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2), "splash_bg").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);

        this.mermaidCharacter = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 1.8), "mermaid").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor * 0.8, Constant.scaleFactor * 0.8);
        let imageName;
        if (Server.language == "eng") {
            imageName = "logo_english";
            Constant.fontName = "Kh_KoulenL";
        } else {
            imageName = "logo_khamer";
            Constant.fontName = "NotoSans_Regular";
        }
        this.splashLogo = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 7), imageName).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.progressBaseBlack = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 1.145), "progress_base_black").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.progressBar = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 1.145), "progress_bar").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.progressBase = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 1.18), "progress_base").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);

        // this.loadingText = this.add.text(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 1.1), Constant.loadingText, { fontFamily: 'Kh_KoulenL', fontSize: '34px', fill: '#FFF', fontStyle: "normal", align: 'center' }).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.loadingText = this.add.text(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 1.1), Constant.loadingText, { fontFamily: Constant.fontName, fontSize: '34px', fill: '#FFF', fontStyle: "normal", align: 'center' }).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.progressBar.setCrop(0, 0, 0, this.progressBar.height);

        this.LoadFonts();
    };

    LoadFonts() {
        let propNames = Object.getOwnPropertyNames(this.fonts);
        propNames.forEach((fontName, index) => {
            let isLast = index >= propNames.length - 1;
            this.fonts[fontName] = new FontFaceObserver(fontName);
            this.fonts[fontName].load().then(this.FontLoadSuccess.bind(this, fontName, isLast), this.FontLoadError.bind(this, fontName));
        });
    };

    async FontLoadSuccess(fontName, isLast) {
        if (isLast) {
            if (Server.IsUrlParamsMissing()) {
                this.scene.start("GameErrorScene");
            } else {
                this.LoadAssests();
                Constant.SetTextAsPerLanguage(Server.language);
                await Server.PostScore(0, "loaded");
                await Server.PostMessage(0, "loaded");
            }
        }
    };
    FontLoadError(fontName) { };

    LoadAssests() {
        this.load.on('progress', this.LoadProgress, this);
        this.load.on('complete', this.OnComplete, { scene: this.scene });

        this.load.image('one_pixel_black', 'assets/images/one_pixel_black.png');

        //MENU
        this.load.image('mermaid_glow', 'assets/images/menu/mermaid_glow.png');

        //GAMEPLAY
        //PLATE
        this.load.image('plate_normal', 'assets/images/gameplay/plate/plate_normal.png');
        this.load.image('plate_back_big', 'assets/images/gameplay/plate/plate_back_big.png');
        this.load.image('plate_front_big', 'assets/images/gameplay/plate/plate_front_big.png');
        this.load.image('plate_back_medium', 'assets/images/gameplay/plate/plate_back_medium.png');
        this.load.image('plate_front_medium', 'assets/images/gameplay/plate/plate_front_medium.png');
        this.load.image('plate_back_small', 'assets/images/gameplay/plate/plate_back_small.png');
        this.load.image('plate_front_small', 'assets/images/gameplay/plate/plate_front_small.png');

        this.load.image('plate_big_0', 'assets/images/gameplay/plate/plate_back_big.png');
        this.load.image('plate_big_19', 'assets/images/gameplay/plate/plate_front_big.png');
        this.load.image('plate_medium_0', 'assets/images/gameplay/plate/plate_back_medium.png');
        this.load.image('plate_medium_15', 'assets/images/gameplay/plate/plate_front_medium.png');
        this.load.image('plate_small_0', 'assets/images/gameplay/plate/plate_back_small.png');
        this.load.image('plate_small_11', 'assets/images/gameplay/plate/plate_front_small.png');

        //INCENSE
        this.load.image('incense_0', 'assets/images/gameplay/incenseStcik/incense_red.png');
        this.load.image('incense_1', 'assets/images/gameplay/incenseStcik/incense_yellow.png');
        this.load.image('incense_2', 'assets/images/gameplay/incenseStcik/incense_pink.png');

        this.load.image('plate_incense_0', 'assets/images/gameplay/incenseStcik/plate_incense_0.png');
        this.load.image('plate_incense_1', 'assets/images/gameplay/incenseStcik/plate_incense_1.png');
        this.load.image('plate_incense_2', 'assets/images/gameplay/incenseStcik/plate_incense_2.png');

        //CANDLE
        this.load.image('candle_0', 'assets/images/gameplay/candle/candle_white.png');
        this.load.image('candle_1', 'assets/images/gameplay/candle/candle_red.png');
        this.load.image('candle_2', 'assets/images/gameplay/candle/candle_yellow.png');
        this.load.image('candle_3', 'assets/images/gameplay/candle/candle_orange.png');

        this.load.image('plate_candle_0', 'assets/images/gameplay/candle/plate_candle_0.png');
        this.load.image('plate_candle_1', 'assets/images/gameplay/candle/plate_candle_1.png');
        this.load.image('plate_candle_2', 'assets/images/gameplay/candle/plate_candle_2.png');
        this.load.image('plate_candle_3', 'assets/images/gameplay/candle/plate_candle_3.png');

        //FLOWER
        this.load.image('plate_flower_0', 'assets/images/gameplay/flower/flower_jasmine.png');
        this.load.image('plate_flower_1', 'assets/images/gameplay/flower/flower_marigold.png');
        this.load.image('plate_flower_2', 'assets/images/gameplay/flower/flower_chompey.png');
        this.load.image('plate_flower_3', 'assets/images/gameplay/flower/flower_lotus.png');
        this.load.image('counter_base', 'assets/images/gameplay/flower/counter_base.png');

        //COMMON
        this.load.image('overlay', 'assets/images/common/overlay.png');
        this.load.image('decorate_bg', 'assets/images/common/decorate_bg.png');
        this.load.image('inactive_base', 'assets/images/common/inactive_base.png');
        this.load.image('active_base', 'assets/images/common/active_base.png');
        this.load.image('message_line_base', 'assets/images/common/message_line_base.png');
        this.load.image('point', 'assets/images/common/point.png');
        this.load.image('inactive_candle_button_base', 'assets/images/common/inactive_candle_button_base.png');
        this.load.image('active_candle_button_base', 'assets/images/common/active_candle_button_base.png');
        this.load.image('button_candle_active', 'assets/images/common/button_candle_active.png');
        this.load.image('button_flower_active', 'assets/images/common/button_flower_active.png');
        this.load.image('button_incense_active', 'assets/images/common/button_incense_active.png');
        this.load.image('button_candle_inactive', 'assets/images/common/button_candle_inactive.png');
        this.load.image('button_flower_inactive', 'assets/images/common/button_flower_inactive.png');
        this.load.image('button_incense_inactive', 'assets/images/common/button_incense_inactive.png');
        this.load.image('inactive_base_small', 'assets/images/common/inactive_base_small.png');
        this.load.image('active_base_small', 'assets/images/common/active_base_small.png');
        this.load.image('active_play_button_base', 'assets/images/common/active_play_button_base.png');
        this.load.image('inactive_play_button_base', 'assets/images/common/inactive_play_button_base.png');
        this.load.image('float_water_layer', 'assets/images/common/float_water_layer.png');
        this.load.image('meramaid_glow_rotate', 'assets/images/common/meramaid_glow_rotate.png');
        this.load.image('sound_on', 'assets/images/common/sound_on.png');
        this.load.image('sound_off', 'assets/images/common/sound_off.png');

        //WIN POPUP
        this.load.image('win_rotate_bg', 'assets/images/popup/win_rotate_bg.png');

        //SPRITESHEET
        this.load.spritesheet('fireworks', 'assets/images/spritesheet/fireworks.png', { frameWidth: 237, frameHeight: 333 });
        this.load.spritesheet('static_water', 'assets/images/spritesheet/static_water.png', { frameWidth: 954, frameHeight: 348 });
        this.load.spritesheet('lantern', 'assets/images/spritesheet/lantern.png', { frameWidth: 292, frameHeight: 315 });
        this.load.spritesheet('candle_light', 'assets/images/spritesheet/candle_light.png', { frameWidth: 174, frameHeight: 187 });
        this.load.spritesheet('incense_smoke', 'assets/images/spritesheet/incense_smoke.png', { frameWidth: 72, frameHeight: 378 });
        this.load.spritesheet('mermaid_ripples', 'assets/images/spritesheet/mermaid_ripples.png', { frameWidth: 620, frameHeight: 189 });
        this.load.spritesheet('bubbles', 'assets/images/spritesheet/bubbles.png', { frameWidth: 181, frameHeight: 308 });
        this.load.spritesheet('bratib_move_water', 'assets/images/spritesheet/bratib_move_water.png', { frameWidth: 966, frameHeight: 589 });

        // //AUDIO
        this.load.audio('button_click_sound', 'assets/sounds/button_click_sound.mp3');
        this.load.audio('knife_attach_sound', 'assets/sounds/knife_attach_sound.mp3');
        this.load.audio('game_win', 'assets/sounds/game_win.mp3');
        this.load.audio('game_loose', 'assets/sounds/game_loose.mp3');
        this.load.audio('bg_music', 'assets/sounds/bg_music.mp3');

        this.load.start();
    };

    LoadProgress(percentage) {
        this.progressBar.setCrop(0, 0, this.progressBar.width * percentage, this.progressBar.height);
        percentage = percentage * 100;
        this.loadingText.setText(Constant.loadingText + parseInt(percentage) + " %");
    }

    OnComplete() {
        SoundManager.CreateSound();
        setTimeout(() => {
            Constant.game.scene.stop('PreloadScene');
            this.scene.start("TitleScene");
        }, 500);
    }

}