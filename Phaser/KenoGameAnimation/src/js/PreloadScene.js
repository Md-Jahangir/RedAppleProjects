import { Server } from "./Server.js";
import { SoundManager } from "./SoundManager.js";
import { Constant } from "./Constant.js";

export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super('PreloadScene');
        this.progressBar = null;
        this.loadingText = null;
        this.loading = null;
        this.fonts = {
            "Poppins_Bold": null,
            "Roboto_Bold": null,
            "Roboto_Regular": null,
            "Roboto_Medium": null
        }
    }

    preload() {
        //SPLASH
        this.load.image('background', 'assets/images/bg.png');
        this.load.spritesheet('loading_wheel', 'assets/images/loading_wheel.png', { frameWidth: (471 / 3), frameHeight: 157 });
        // this.load.image('progress_base', 'assets/images/splash/progress_base.png');
        // this.load.image('progress_bar', 'assets/images/splash/progress_bar.png');

        // for (let i = 0; i < 3; i++) {
        //     this.load.image('shape_' + i, 'assets/images/gameplay/shape_' + i + '.png');
        // }
    };

    create() {
        this.LoadFonts();

        this.splashBg = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2), "background").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        // this.splashBg.setVisible(false);
        // this.splashLogo = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 3.7), "logo").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        // this.progressBase = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 1.25), "progress_base").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        // this.progressBar = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 1.25), "progress_bar").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        // this.loadingText = this.add.text(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 1.2), "Loading: ", { fontFamily: 'Poppins_Bold', fontSize: '46px', fill: '#FFF', fontStyle: "normal", align: 'center' }).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        // this.progressBar.setCrop(0, 0, 0, this.progressBar.height);

        this.loading = this.add.sprite(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2), "loading_wheel").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.anims.create({
            key: "loading_anim",
            frameRate: 5,
            frames: this.anims.generateFrameNumbers("loading_wheel", { start: 0, end: 2 }),
            repeat: -1
        });

    }

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
            // if (Server.IsUrlParamsMissing()) {
            //     this.scene.start("GameErrorScene");
            // } else {
            this.LoadAssests();
            // }
        }
    };
    FontLoadError(fontName) { };

    LoadAssests() {
        this.load.on('progress', this.LoadProgress, this);
        this.load.on('complete', this.OnComplete, { scene: this.scene });


        //GAMEPLAY
        this.load.image('main_base', 'assets/images/gameplay/main_base.png');
        this.load.image('left_number_base', 'assets/images/gameplay/left_number_base.png');
        this.load.image('right_message_base', 'assets/images/gameplay/right_message_base.png');
        this.load.image('right_timer_base', 'assets/images/gameplay/right_timer_base.png');
        this.load.image('ball_base_type_1', 'assets/images/gameplay/ball_base_type_1.png');
        this.load.image('ball_base_selected_type_1', 'assets/images/gameplay/ball_base_selected_type_1.png');
        this.load.image('ball_base_type_2', 'assets/images/gameplay/ball_base_type_2.png');
        this.load.image('ball_base_selected_type_2', 'assets/images/gameplay/ball_base_selected_type_2.png');
        this.load.spritesheet('sound_on_off_button', 'assets/images/gameplay/sound_on_off_button.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('full_screen_button', 'assets/images/gameplay/full_screen_button.png', { frameWidth: 32, frameHeight: 33 });

        this.load.spritesheet('hot_anim', 'assets/images/gameplay/hot_anim.png', { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('cold_anim', 'assets/images/gameplay/cold_anim.png', { frameWidth: 300 / 3, frameHeight: 400 / 4 });

        this.load.image('pipe', 'assets/images/gameplay/pipe.png');
        this.load.image('top_pipe', 'assets/images/gameplay/top_pipe.png');
        this.load.image('bottom_pipe', 'assets/images/gameplay/bottom_pipe.png');
        // this.load.image('pipe_base', 'assets/images/gameplay/pipe_base.png');
        this.load.image('pipe_ball', 'assets/images/gameplay/pipe_ball.png');
        this.load.image('pipe_glass', 'assets/images/gameplay/pipe_glass.png');
        this.load.image('row_base', 'assets/images/gameplay/row_base.png');
        this.load.image('col_base', 'assets/images/gameplay/col_base.png');


        //GamePlay3 Screen 
        this.load.image('heading_base', 'assets/images/gameplay/heading_base.png');
        this.load.image('box_base', 'assets/images/gameplay/right_box_base.png');
        this.load.image('hot_icon', 'assets/images/gameplay/hot_icon.png');
        this.load.image('cold_icon', 'assets/images/gameplay/cold_icon.png');
        this.load.image('hot_icon_small', 'assets/images/gameplay/hot_icon_small.png');
        this.load.image('cold_icon_small', 'assets/images/gameplay/cold_icon_small.png');
        this.load.image('text_base', 'assets/images/gameplay/text_base.png');


        //QUIT POPUP
        // this.load.image('quit_base', 'assets/images/popup/quit/quit_base.png');
        // this.load.image('yes_button', 'assets/images/popup/quit/yes_button.png');
        // this.load.image('no_button', 'assets/images/popup/quit/no_button.png');
        // this.load.spritesheet('hand', 'assets/images/popup/quit/hand.png', { frameWidth: 256, frameHeight: 256 });

        this.load.image('one_pixel_white', 'assets/images/one_pixel_white.png');
        this.load.image('one_pixel_black', 'assets/images/one_pixel_black.png');
        // this.load.image('button_base', 'assets/images/popup/gameover/button_base.png');
        // this.load.image('popup_base', 'assets/images/popup/gameover/popup_base.png');
        // this.load.image('gameover_heading', 'assets/images/popup/gameover/gameover_heading.png');

        //AUDIO
        this.load.audio('button_click_sound', 'assets/sounds/button_click_sound.mp3');
        this.load.audio('knife_attach_sound', 'assets/sounds/knife_attach_sound.mp3');
        this.load.audio('obstacle_collide_sound', 'assets/sounds/obstacle_collide_sound.mp3');
        this.load.audio('bg_music', 'assets/sounds/bg_music.mp3');

        this.load.start();
    };

    LoadProgress(percentage) {
        // this.progressBar.setCrop(0, 0, this.progressBar.width * percentage, this.progressBar.height);
        // percentage = percentage * 100;
        // this.loadingText.setText("Loading: " + parseInt(percentage) + " %");
        this.loading.play("loading_anim");
    }

    OnComplete() {
        SoundManager.CreateSound();
        // setTimeout(() => {
        this.scene.scene.loading.anims.stop();
        Constant.game.scene.stop('PreloadScene');
        this.scene.start("GameScene");
        // this.scene.start("AfterDrawScene");
        // this.scene.start("PreviosDrawScene");
        // this.scene.start('FinalDrawScene');
        // this.scene.start("DrawScene");
        // }, 500);
    }

}