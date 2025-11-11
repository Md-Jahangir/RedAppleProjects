import { Constant } from './Constant.js';
import { PlayzhubEventHandler } from './PlayzhubEventHandler_E6.js';
import { SoundManeger } from "./SoundManeger.js";
export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super("PreloadScene")
        this.progressBar = null;
        this.percentText = null;
        this.fonts = {
            "Roboto_Bold": null,
            "Roboto-BoldItalic": null
        }
    };

    preload() {
        // this.load.image('logo', 'assets/gamelogo.png');
        // this.load.image('progress_bar', 'assets/loading_bar.png');
        // this.load.image('progress_base', 'assets/loading_base.png');
    };

    create() {
        // this.logo = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2), "logo").setOrigin(0.5).setScale(Constant.scaleFactor);
        // this.progressBase = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 1.5), "progress_base").setOrigin(0.5).setScale(Constant.scaleFactor);
        // this.progressBar = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 1.5), "progress_bar").setOrigin(0.5).setScale(Constant.scaleFactor);
        // this.progressBar.setCrop(0, 0, 0, this.progressBar.height);

        this.loadArray = [];
        const getgameBg = document.getElementById("splash_bg");
        const getGameLogo = document.getElementById("logo");
        const getProgressbase = document.getElementById("progress_base");
        const getProgressBar = document.getElementById("progress_bar");
        this.loadArray.push(getgameBg, getGameLogo, getProgressbase, getProgressBar);
        for (let index = 0; index < this.loadArray.length; index++) {
            const element = this.loadArray[index];
            if (element.complete) {
                this.loadHTMLImage(element);
            } else {
                element.onload = () => this.loadHTMLImage(element);
            }
        }
        let percentTextStyle = { fontFamily: 'Roboto_Bold', fontSize: "45px", fill: 'rgb(255, 255, 255)', fontStyle: 'bold', align: 'center' };
        this.percentText = this.add.text(this.progressBar.x, this.progressBar.y + 50, "Loading...", percentTextStyle).setOrigin(0.5).setScale(Constant.scaleFactor);
        this.LoadFonts();
    }
    loadHTMLImage(element) {
        if (element.id) {
            const textureKey = element.id;

            if (!this.textures.exists(textureKey)) {
                this.textures.addImage(textureKey, element);
            }
            if (textureKey === "splash_bg") {
                this.splashBG = this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2, 'splash_bg').setOrigin(0.5).setScale(1.5 * Constant.scaleFactorX, 1.7 * Constant.scaleFactorY);
            } else if (textureKey === "logo") {
                this.logo = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2), "logo").setOrigin(0.5).setScale(Constant.scaleFactor);
            }
            else if (textureKey === "progress_base") {
                this.progressBase = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 1.1), "progress_base").setOrigin(0.5).setScale(Constant.scaleFactor);
            }
            else if (textureKey === "progress_bar") {
                this.progressBar = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 1.1), "progress_bar").setOrigin(0.5).setScale(Constant.scaleFactor);
                this.progressBar.setCrop(0, 0, 0, this.progressBar.height);

            }
        } else {
            console.warn("Element does not have an ID:", element);
        }
    }
    //======================================
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
            // console.log('this.load')
            this.LoadAssets();
        }
    };
    FontLoadError(fontName) { console.log('error------') };

    LoadAssets() {
        PlayzhubEventHandler.GameLoadingStarted();
        this.load.on('progress', this.LoadProgress, this);
        this.load.on('complete', this.OnComplete, { scene: this.scene });
        //gameOver pop up
        this.load.setPath('assets/spinefolder/');
        this.load.spine('owl', 'Owl_V3_A-01_only_layers.json', 'Owl_V3_A-01_only_layers.atlas');
        this.load.spine('skeleton', 'SkeletonSpine/skeleton.json', 'SkeletonSpine/skeleton.atlas');
        this.load.setPath('');


        this.load.spritesheet('Sound on-off', 'assets/Sound on-off.png', { frameWidth: 60 / 2, frameHeight: 25 / 1 });
        this.load.spritesheet('ball_', 'assets/ball.png', { frameWidth: 1290 / 5, frameHeight: 1032 / 4 });
        // this.load.spritesheet('ball_', 'assets/ball.png', { frameWidth: 1050 / 7, frameHeight: 150 });
        this.load.spritesheet('goalkeeper_idle', 'assets/goalkeeper_idle.png', { frameWidth: 1592 / 8, frameHeight: 765 / 3 });
        this.load.spritesheet('player', 'assets/player.png', { frameWidth: 4096 / 8, frameHeight: 2048 / 4 });
        this.load.spritesheet('goalkeeper_save_center_up', 'assets/goalkeeper_save_center_up.png', { frameWidth: 1096 / 5, frameHeight: 1700 / 5 });
        this.load.spritesheet('goalkeeper_save_center_down', 'assets/goalkeeper_save_center_down.png', { frameWidth: 1972 / 9, frameHeight: 1620 / 6 });
        this.load.spritesheet('goalkeeper_save_left', 'assets/goalkeeper_save_left.png', { frameWidth: 2676 / 5, frameHeight: 1960 / 7 });
        this.load.spritesheet('goalkeeper_save_right', 'assets/goalkeeper_save_right.png', { frameWidth: 3540 / 7, frameHeight: 1400 / 5 });
        this.load.spritesheet('goalkeeper_save_down_left', 'assets/goalkeeper_save_down_left.png', { frameWidth: 3748 / 7, frameHeight: 1176 / 5 });
        this.load.spritesheet('goalkeeper_save_down_right', 'assets/goalkeeper_save_down_right.png', { frameWidth: 3600 / 7, frameHeight: 1176 / 5 });

        //audio load--------------------------------------------------------------------------------------
        this.load.audio('Ball_Hit', 'assets/audio/Ball_Hit.mp3');
        this.load.audio('boo_missed_goal_sound', 'assets/audio/boo_missed_goal_sound.mp3');
        this.load.audio('crowd_general', 'assets/audio/crowd_general.mp3');
        this.load.audio('goal_cheer', 'assets/audio/goal_cheer.mp3');
        this.load.audio('goal_post_hit', 'assets/audio/goal_post_hit.mp3');
        this.load.audio('soccer_whistle_point_scored', 'assets/audio/soccer_whistle_point_scored.mp3');
        //-------------------------------------------------------------------------------------------------

        this.load.image('bg', 'assets/GameOverPopUp/bg.png')
        this.load.image('bg', 'assets/GameOverPopUp/bg.png')
        this.load.image('Game_Over_base', 'assets/GameOverPopUp/Game_Over_base.png')
        this.load.image('Game_Over', 'assets/GameOverPopUp/Game_Over.png')
        this.load.image('highest_score', 'assets/GameOverPopUp/highest_score.png')
        this.load.image('home_replay_base', 'assets/GameOverPopUp/home_replay_base.png')
        this.load.image('current_score', 'assets/GameOverPopUp/current_score.png')
        this.load.image('logo1', 'assets/GameOverPopUp/logo1.png')

        //Prompt texts 
        this.load.image('GOAL!', 'assets/PromptTexts/GOAL!.png')
        this.load.image('missed', 'assets/PromptTexts/missed.png')
        this.load.image('saved!', 'assets/PromptTexts/saved!.png')

        //pausePopUp
        this.load.image('pausePopUpBg', 'assets/PausePopUp/pausePopUpBg.png')
        this.load.image('resumeBtn', 'assets/PausePopUp/resumeBtn.png')


        this.load.image('arrow_left', 'assets/arrow_left.png')
        this.load.image('arrow_right', 'assets/arrow_right.png')
        this.load.image('ball_shadow', 'assets/ball_shadow.png')
        this.load.image('bg_game', 'assets/bg_game.png')
        this.load.image('bg_menu', 'assets/bg_menu.png')
        this.load.image('logo', 'assets/logo.png')
        this.load.image('Play_button', 'assets/Play_button.png')
        this.load.image('but_continue', 'assets/but_continue.png')
        this.load.image('but_exit', 'assets/but_exit.png')
        this.load.image('but_fullscreen', 'assets/but_fullscreen.png')
        this.load.image('but_home', 'assets/but_home.png')
        this.load.image('but_info', 'assets/but_info.png')
        this.load.image('but_level', 'assets/but_level.png')
        this.load.image('but_no', 'assets/but_no.png')
        this.load.image('score_board', 'assets/score_board.png')
        this.load.image('kick base', 'assets/kick base.png');
        this.load.image('ball icon', 'assets/ball icon.png');
        this.load.image('base', 'assets/base.png');
        this.load.image('yes no base', 'assets/yes no base.png');
        this.load.image('but_pause', 'assets/but_pause.png')
        this.load.image('button_base', 'assets/button_base.png')
        this.load.image('but_play', 'assets/but_play.png')
        this.load.image('but_restart', 'assets/but_restart.png')
        this.load.image('but_start', 'assets/but_start.png')


        this.load.image('pointer', 'assets/pointer.png')
        this.load.image('pointer_light', 'assets/pointer_light.png')





        this.load.image('but_yes', 'assets/but_yes.png')
        this.load.image('cursor', 'assets/cursor.png')
        this.load.image('goal', 'assets/goal.png')
        this.load.image('hand_touch', 'assets/hand_touch.png')
        this.load.image('logo_ctl', 'assets/logo_ctl.png')
        this.load.image('msg_box', 'assets/msg_box.png')
        this.load.image('progress_bar', 'assets/progress_bar.png')
        this.load.image('shot_left', 'assets/shot_left.png')
        this.load.image('start_ball', 'assets/start_ball.png')
        this.load.image('1_1', 'assets/1_1.png')
        this.load.image('goal', 'assets/goal.png')



        //spine load

        this.load.start();
    }

    LoadProgress(percentage) {
        if (this.progressBar) {
            this.progressBar.setCrop(0, 0, this.progressBar.width * percentage, this.progressBar.height);
        }
        percentage = percentage * 100;
        this.percentText.setText("Loading..." + Math.round(percentage) + "%");
    }

    async OnComplete() {
        PlayzhubEventHandler.GameLoadingCompleted();
        SoundManeger.CreateSounds();
        this.scene.stop('PreloadScene');
        this.scene.start("Lobby");
    }

}