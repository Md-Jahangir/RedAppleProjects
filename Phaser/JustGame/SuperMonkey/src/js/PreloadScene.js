import { Align } from "./util/align.js";
import { Server } from "./Server.js";
import { AudioManager } from "./AudioManager.js";
import { Constant } from "./Constant.js";
import { PlayzhubEventHandler } from "./PlayzhubEventHandler.js";
import * as GA from "gameanalytics";

export default class PreloadScene extends Phaser.Scene {

    constructor() {

        super('PreloadScene');

        this.progressBase = null;
        this.progressLine = null;
        this.loaderIcon = null;
        this.fonts = {
            "GROBOLD": null,

        }
    }

    preload() {

        // this.load.image('loading_Bg', 'assets/images/loading_page/loading_bg.png');
        // this.load.image('loader_icon', 'assets/images/loading_page/loader_icon.png');
        // this.load.image('loading_txt', 'assets/images/loading_page/loading_txt.png');
        // this.load.image('progress_base', 'assets/images/loading_page/loading_base.png');
        // this.load.image('progress_line', 'assets/images/loading_page/loading_line.png');

    }

    create() {
        this.loadArray = [];
        const getgameBg = document.getElementById("loading_Bg");
        const getLoadingText = document.getElementById("loading_txt");
        const getProgressbase = document.getElementById("progress_base");
        const getProgressBar = document.getElementById("progress_bar");
        const getLogo = document.getElementById("loader_icon");
        this.loadArray.push(getgameBg, getLoadingText, getProgressbase, getProgressBar, getLogo);
        for (let index = 0; index < this.loadArray.length; index++) {
            const element = this.loadArray[index];

            if (element.complete) {
                this.loadHTMLImage(element);
            } else {
                element.onload = () => this.loadHTMLImage(element);
            }
        }
        this.LoadFonts();

        GA.GameAnalytics.addProgressionEvent(
            "Start",
            "game_loading"
        );
    }

    loadHTMLImage(element) {
        if (element.id) {
            const textureKey = element.id;
            if (!this.textures.exists(textureKey)) {
                this.textures.addImage(textureKey, element);
            }
            if (textureKey === "loading_Bg") {
                let bg = this.add.image(0, 0, 'loading_Bg').setScale(Constant.scaleFactor);
                Align.center(bg);
            }

            else if (textureKey === "loading_txt") {
                let loadingText = this.add.image(0, 0, 'loading_txt').setScale(Constant.scaleFactor);
                Align.placeAt(2, 1.06, loadingText);
            }
            else if (textureKey === "progress_base") {
                this.progressBase = this.add.image(0, 0, "progress_base").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor);
                Align.placeAt(2, 1.15, this.progressBase);
            }
            else if (textureKey === "progress_bar") {
                this.progressBar = this.add.image(0, 0, "progress_bar").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor);
                Align.placeAt(2, 1.157, this.progressBar);
                this.progressBar.setCrop(0, 0, 0, this.progressBar.height);
            }
            else if (textureKey === "loader_icon") {
                this.loaderIcon = this.add.image(0, 0, 'loader_icon').setScale(Constant.scaleFactor).setVisible(false);
                Align.placeAt(2, 1.15, this.loaderIcon);
            }
        } else {
            console.warn("Element does not have an ID:", element);
        }
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
            // Constant.timeToEnd = Server.timerValue;
            this.LoadAssests();
            // }
        }
    };

    FontLoadError(fontName) { };

    LoadAssests() {
        PlayzhubEventHandler.GameLoadingStarted();
        this.load.on('progress', this.LoadProgress, this);
        this.load.on('complete', this.OnComplete, { scene: this.scene });


        //----------Loading Spines-----------//
        this.load.setPath('assets/spines/');
        this.load.spine('monkey', 'sp_monkey_running.json', 'sp_monkey_running.atlas');
        this.load.spine('kong', 'sp_monkey_powerup.json', 'sp_monkey_powerup.atlas');
        this.load.spine('bird', 'sp_bird.json', 'sp_bird.atlas');
        this.load.spine('fire', 'sp_fire.json', 'sp_fire.atlas');
        this.load.setPath("");
        //----------Loading Audio-----------//

        this.load.audio('bg_audio', 'assets/audio/bg_audio.mp3');
        this.load.audio('run_audio', 'assets/audio/run_audio.mp3');
        this.load.audio('kong_transition', 'assets/audio/kong_transition.mp3');
        this.load.audio('hit_audio', 'assets/audio/hit_audio.mp3');
        this.load.audio('excited', 'assets/audio/excited.mp3');

        //-----------Loading TutorialScene------------//

        for (let i = 0; i < 3; i++) {
            this.load.image('content_' + i, 'assets/images/tutorial_page/content_' + i + '.png');
        }
        this.load.image('info_bg', 'assets/images/tutorial_page/info_bg.png');
        this.load.image('info_fog', 'assets/images/tutorial_page/info_fog.png');
        this.load.image('play_button', 'assets/images/tutorial_page/play.png');
        this.load.image('next_btn', 'assets/images/tutorial_page/next.png');
        this.load.image('prev_btn', 'assets/images/tutorial_page/previous.png');
        this.load.image('skip', 'assets/images/tutorial_page/skip.png');
        this.load.image('focused', 'assets/images/tutorial_page/focused.png');
        this.load.image('absent', 'assets/images/tutorial_page/absent.png');

        //-----------Loading TitleScene------------//

        this.load.image('play_btn', 'assets/images/title_page/play_buton.png');

        //----------------Loading BG-----------------//

        for (let i = 0; i < 6; i++) {
            this.load.image('front_jungle_' + i, 'assets/images/parallax_BG/front_jungle_' + i + '.png');
        }
        for (let i = 0; i < 3; i++) {
            this.load.image('cloud_' + i, 'assets/images/parallax_BG/cloud_' + i + '.png');
        }
        for (let i = 0; i < 3; i++) {
            this.load.image('green_cloud_' + i, 'assets/images/parallax_BG/green_cloud_' + i + '.png');
        }
        for (let i = 0; i < 6; i++) {
            this.load.image('jungle_' + i, 'assets/images/parallax_BG/jungle_' + i + '.png');
        }
        this.load.image('sky', 'assets/images/parallax_BG/sky.png');
        this.load.image('fog', 'assets/images/parallax_BG/overall_fog.png');
        this.load.image('bush_front', 'assets/images/parallax_BG/front_bush.png');

        //----------Loading Platform Tiles-----------//

        this.load.spritesheet('platform', 'assets/images/platform_tile/platform.png', { frameWidth: 257, frameHeight: 256 });
        this.load.tilemapTiledJSON('platform_patterns', 'assets/images/platform_tile/platform_set.json');
        this.load.tilemapTiledJSON('platform_pattern_two', 'assets/images/platform_tile/platform_set_two.json');
        this.load.tilemapTiledJSON('platform_pattern_three', 'assets/images/platform_tile/pattern_set_three.json');
        this.load.tilemapTiledJSON('platform_pattern_four', 'assets/images/platform_tile/platform_set_four.json');

        //----------Loading GameScene-----------//

        this.load.image('back_btn', 'assets/images/gameplay_page/back.png');
        this.load.spritesheet('sound_btn', 'assets/images/gameplay_page/sound_btn.png', { frameWidth: 93, frameHeight: 93 });
        this.load.image('clock', 'assets/images/gameplay_page/clock.png');
        this.load.image('score_board', 'assets/images/gameplay_page/score_board.png');
        this.load.image('stalk', 'assets/images/gameplay_page/cut_stalk.png');
        this.load.image('rock', 'assets/images/gameplay_page/rock.png');
        this.load.image('banana', 'assets/images/gameplay_page/banana.png');
        this.load.image('special_box', 'assets/images/gameplay_page/special_box.png');

        //----------Loading GameOver-----------//

        this.load.image('gameover_base', 'assets/images/gameover_popup/gameover_base.png');
        this.load.image('menu_btn', 'assets/images/gameover_popup/menu.png');
        this.load.image('replay_btn', 'assets/images/gameover_popup/replay_btn.png');
        this.load.image('shadow', 'assets/images/gameover_popup/shadow.png');

        //----------Loading Quit Popup-----------//

        this.load.image('quit_base', 'assets/images/quit_popup/quit_base.png');
        this.load.image('yes_btn', 'assets/images/quit_popup/yes.png');
        this.load.image('no_btn', 'assets/images/quit_popup/no.png');

        //----------Loading Other Images-----------//

        this.load.image('control_overlay', 'assets/images/one_pixel_white.png');

        // this.load.image('ad_icon', 'assets/images/ad_icon.png');


        // this.load.spine('stoneball', 'Stone_ball.json', 'Stone_ball.atlas');

        this.load.start();

    }

    AddAudio() {

        AudioManager.CreateAudios();

    }

    LoadProgress(percentage) {

        let startX = Constant.round(Constant.game.config.width / 8.5);

        this.loaderIcon.x = startX + ((this.progressBase.displayWidth - Constant.round(Constant.game.config.width / 37)) * percentage);

        this.loaderIcon.setVisible(true);
        if (this.progressBar) {
            this.progressBar.setCrop(0, 0, (this.progressBar.width - 10) * percentage, this.progressBar.height);
        }

        percentage = percentage * 100;

    }

    OnComplete() {
        PlayzhubEventHandler.GameLoadingCompleted();
        setTimeout(() => {
            this.scene.scene.AddAudio();
            this.scene.stop('PreloadScene');
            this.scene.start('TitleScene');
        }, 100);

        GA.GameAnalytics.addProgressionEvent(
            "Complete",
            "game_loading"
        );
    }

}