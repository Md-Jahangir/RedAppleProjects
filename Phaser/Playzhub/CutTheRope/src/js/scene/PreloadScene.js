
/********* Script_Details ************
 * @Original_Creator :- Tanmay Mukherjee.
 * @Created_Date :- 26-07-2024
 * @Last_Update_By :- Tanmay Mukherjee
 * @Last_Updatd_Date :- 26-09-24
 * @Description :- Load all the assests and showing the Loading Scene.
 ************************************/
import { Utils } from "../class/Utils";
import FontFaceObserver from "fontfaceobserver";
import Texture from "../gameObjectsClass/Texture";
import Text from "../gameObjectsClass/Text";
import { Constant } from "../Constant";
import { Server } from "../Services/Server";
import { SoundManager } from "../SoundManager";
import { PlayzhubEventHandler } from "../PlayzhubEventHandler";
import * as GA from "gameanalytics";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super("PreloadScene");
        this.fonts = {
            "Poppins-Bold": null
        }
    }
    preload() {
        // localStorage.clear();
    }
    create() {
        this.game.events.on("resize", this.resize, this);
        Constant.activeScene = 'PreloadScene';
        this.loadArray = new Array();
        const getBackground = document.getElementById('preload_bg');
        const getGameLogo = document.getElementById('game-logo');
        const getProgressBase = document.getElementById('loading-base');
        const getProgressBar = document.getElementById('loading-bar');
        this.loadArray.push(getBackground, getGameLogo, getProgressBase, getProgressBar);
        for (let index = 0; index < this.loadArray.length; index++) {
            const element = this.loadArray[index];
            if (element.complete) {
                this.AddTextures(element);
            }
            else {
                element.onload = () => this.AddTextures(element);
            }
        }
        this.loadingText = new Text(this, 0, 0, 'Loading...', { fontFamily: "Poppins-Bold", fontSize: 60 });
        this.loadingText.SetOrigin(0.5);
        this.LoadFonts();


        if (window.innerWidth > window.innerHeight) {
            let clientHeight = window.innerHeight;
            let clientWidth = (clientHeight / 1.77777777778);
            Constant.clientWidth = clientWidth;
            Constant.clientHeight = window.innerHeight;
            this.resize(clientWidth, clientHeight, (window.innerWidth / 2) - (clientWidth / 2));
        }
        else {
            let clientWidth = window.innerWidth;
            let clientHeight = window.innerHeight;
            Constant.clientWidth = clientWidth;
            Constant.clientHeight = clientHeight;
            this.resize(clientWidth, clientHeight, 0);
        }

        GA.GameAnalytics.addProgressionEvent(
            "Start",
            "game_loading"
        );
    }
    //#region Preload Assets Creation from Index.html Load Images
    AddTextures(element) {
        const textureKey = element.id;
        if (!this.textures.exists(textureKey)) {
            this.textures.addImage(textureKey, element);
        }
        if (textureKey === 'preload_bg') {
            this.bg = new Texture(this, 0, 0, 'preload_bg');
            this.ResizeBackground(window.innerWidth, window.innerHeight);
        }
        else if (textureKey === 'loading-base') {
            this.progressBase = new Texture(this, 0, 0, 'loading-base');
            this.progressBase.SetOrigin(0.5);
            this.ResizeProgressBase(window.innerWidth, window.innerHeight);
        }
        else if (textureKey === 'loading-bar') {
            this.progressBar = new Texture(this, 0, 0, 'loading-bar');
            this.progressBar.setOrigin(0.5);
            this.progressBar.setCrop(0, 0, this.progressBar.height);
            this.ResizeProgressBar(window.innerWidth, window.innerHeight);
        }
        else if (textureKey === 'game-logo') {
            this.logo = new Texture(this, 0, 0, 'game-logo');
            this.logo.SetOrigin(0.5);
            this.ResizeGameLogo(window.innerWidth, window.innerHeight);
        } else {
            // eslint-disable-next-line no-console
            console.log('Element doesnt exist', element, element.id);
        }
    }
    //#endregion

    //#region Font Load Functionality
    LoadFonts() {
        let propNames = Object.getOwnPropertyNames(this.fonts);
        propNames.forEach((fontName, index) => {
            let isLast = index >= propNames.length - 1;
            this.fonts[fontName] = new FontFaceObserver(fontName);
            this.fonts[fontName].load().then(this.FontLoadSuccess.bind(this, fontName, isLast), this.FontLoadError.bind(this, fontName));
        });

    }
    FontLoadSuccess(fontName, isLast) {
        if (isLast) {
            this.LoadAssets();
            if (!Server.IsUrlParamMissing()) {
                Constant.timeToEnd = Server.timerValue;
            }
            else {
                // this.scene.start('ErrorScene');
                Constant.timeToEnd = 10000000000000;
            }
        }
    }
    FontLoadError(fontName) {
        console.log('error');
    }
    //#endregion

    //#region -  Load All Assets and Scene Change
    LoadAssets() {

        PlayzhubEventHandler.GameLoadingStarted();
        //loading bar
        this.load.on('progress', this.LoadProgress, this)
        this.load.on('complete', this.LoadComplete, { scene: this.scene });
        //spine load
        this.load.spine('game_anim', 'assets/spine/gameAnim/character_cut_the_rope.json', 'assets/spine/gameAnim/character_cut_the_rope.atlas');
        this.load.spine('Popup_anim', 'assets/spine/PopupAnim/pop_up.json', 'assets/spine/PopupAnim/pop_up.atlas');
        this.load.spine('tutorial_anim', 'assets/spine/tutorialAnim/hand_cut.json', 'assets/spine/tutorialAnim/hand_cut.atlas');
        this.load.spine('baloon_anim', 'assets/spine/gameAnim/baloon/baloon.json', 'assets/spine/gameAnim/baloon/baloon.atlas');
        this.load.spine('bubble_anim', 'assets/spine/gameAnim/bubble_blast/bubble.json', 'assets/spine/gameAnim/bubble_blast/bubble.atlas');
        //MenuScene Assets
        this.load.image('playBut', './assets/images/ui/playBut.png');

        //lvl assets
        this.load.spritesheet("levelthumb", "./assets/images/lvlimg/levelthumb.png", {
            frameWidth: 60,
            frameHeight: 60
        });
        this.load.image("levelpages", "./assets/images/lvlimg/levelpages.png");
        this.load.image("transp", "./assets/images/lvlimg/transp.png");
        this.load.image('backBut', './assets/images/ui/backBut.png');
        this.load.image('lvl_chapter', './assets/images/ui/lvl_chapter.png');
        this.load.image('lvl_box', './assets/images/lvlimg/level_box.png');
        this.load.image('lvl_box_locked', './assets/images/lvlimg/level_box_locked.png');

        //json
        this.load.json('lvl-json', './assets/json/lvl.json');
        this.load.json('collider-json', './assets/json/physicsCollider.json');

        //Tutorial Assets Popup
        this.load.image('tut_bg', './assets/images/tutPages/tut_bg.png');
        this.load.image('tut_01', './assets/images/tutPages/1.png');
        this.load.image('tut_02', './assets/images/tutPages/2.png');
        this.load.image('tut_03', './assets/images/tutPages/3.png');
        this.load.image('tut_04', './assets/images/tutPages/4.png');
        this.load.image('tut_05', './assets/images/tutPages/5.png');
        this.load.image('skip_but', './assets/images/ui/wrong.png');
        this.load.image('pre_but', './assets/images/ui/pre.png');
        this.load.image('next_but', './assets/images/ui/next.png');

        //GameScene Assets
        this.load.image('overlay', './assets/images/splash/overlay.png');
        this.load.image('bg', './assets/images/splash/game_bg.png');
        this.load.image('rope-head1', './assets/images/gameplay/rope_head1.png');
        this.load.image('rope-head2', './assets/images/gameplay/rope_head2.png');
        this.load.image('spider', './assets/images/gameplay/spider.png');
        this.load.image('frog', './assets/images/gameplay/chamaeleon.png');
        this.load.image('star', './assets/images/gameplay/star.png');
        this.load.image('backlvlBut', './assets/images/ui/backlvlbut.png');
        this.load.image('backlvlbut_loss', './assets/images/ui/backlvlbut_loss.png');
        this.load.image('pauseBut', './assets/images/ui/pauseBut.png');
        this.load.image('bubble', './assets/images/gameplay/bubble.png');
        this.load.image('cutter_particle', './assets/images/gameplay/cutter_particle.png');
        // this.load.image('spiderBubble', './assets/images/gameplay/spiderBubble.png');
        this.load.image('spiderBubble', './assets/images/gameplay/spider.png');
        this.load.image('bubble-shadow', './assets/images/gameplay/bubble_shadow.png');
        this.load.image('obs1', './assets/images/gameplay/obstacle1.png');
        this.load.image('air-gun', './assets/images/gameplay/air_gun.png');
        this.load.image('next-but', './assets/images/ui/nextBut.png');
        this.load.image('reload-but', './assets/images/ui/reloadBut.png');
        this.load.image('replay_but', './assets/images/ui/replay_but.png');
        this.load.image('small-radious', './assets/images/gameplay/small_radious.png');
        this.load.image('medium-radious', './assets/images/gameplay/medium_radious.png');
        this.load.image('large-radious', './assets/images/gameplay/large_radious.png');
        this.load.image('small_bouncer', "./assets/images/gameplay/small_bouncer.png");
        this.load.image('large_bouncer', "./assets/images/gameplay/large_bouncer.png");
        this.load.image('slider_obj', "./assets/images/gameplay/slider_obj.jpg");
        this.load.image('magic_hat', "./assets/images/gameplay/magic_hat.png");
        this.load.spritesheet("stars", "./assets/images/ui/star.png", {
            frameWidth: 108,
            frameHeight: 56,
            startFrame: 0,
            endFrame: 3
        });
        this.load.spritesheet("sound_button", "./assets/images/ui/sound_on_off.png", {
            frameWidth: 135,
            frameHeight: 141,
        });
        this.load.image('quit_popup_base', './assets/images/ui/quit_popup_base.png');
        this.load.image('yes_but', './assets/images/ui/yes_but.png');
        this.load.image('no_but', './assets/images/ui/no_but.png');
        this.load.image('score_base', './assets/images/ui/coin_bar.png');
        this.load.image('timer_logo', './assets/images/ui/timer_logo.png');
        this.load.image('timer_base', './assets/images/ui/timer_base.png');
        this.load.image('timer_bar', './assets/images/ui/timer_bar.png');
        this.load.image('levelup_base', './assets/images/ui/levelUp_base.png');
        this.load.image('levelLoose_base', './assets/images/ui/levelLoose_base.png');
        this.load.image('level_up_glow', './assets/images/ui/level_up_glow.png');
        // this.load.image('level_up_sunray', './assets/images/ui/level_up_sunray.png');
        this.load.image('level_up_stardust', './assets/images/ui/level_up_stardust.png');
        this.load.image('star_bar', './assets/images/ui/star_bar.png');
        this.load.image('star_fill', './assets/images/ui/star_fill.png');
        this.load.image('star_blank', './assets/images/ui/star_blank.png');
        for (let index = 1; index <= 3; index++) {
            this.load.image('star_' + index, './assets/images/ui/star_' + index + '.png');
            this.load.image('starcase_' + index, './assets/images/ui/starcase_' + index + '.png');
        }
        this.load.image('ad_img', './assets/images/ui/ad_img.png');

        //one-pixel
        this.load.image('one-pixel', './assets/images/one_pixel.png');
        this.load.image('ad_icon', 'assets/images/ad_icon.png');

        //Audio
        this.load.audio('click-sound', './assets/audio/button_click_sound.mp3');
        this.load.audio('bgm_sound', './assets/audio/bgm_sound.mp3');


        this.load.start();
    }
    LoadProgress(_percentage) {
        this.progressBar?.setCrop(0, 0, this.progressBar.width * _percentage, this.progressBar.height);
        _percentage = _percentage * 100;
        this.loadingText.SetText('Loading...' + _percentage.toFixed(0) + '%');
    }
    LoadComplete() {
        PlayzhubEventHandler.GameLoadingCompleted();
        SoundManager.CreateSound();
        setTimeout(() => {
            this.scene.stop('PreloadScene');
            this.scene.start('MenuScene', { "playCount": 0 });
        }, 1000)

        GA.GameAnalytics.addProgressionEvent(
            "Complete",
            "game_loading"
        );

    }
    //#endregion

    //#region -  Resize
    ResizeBackground(_newWidth, _newHeight) {
        this.bg?.SetDisplay(_newWidth, _newHeight);
    }
    ResizeProgressBase(_newWidth, _newHeight) {
        let newScale = Utils.getScale(1080, 1920, _newWidth, _newHeight);
        this.progressBase?.SetScale(newScale);
        this.progressBase?.SetPosition(_newWidth / 2 + 20 * newScale, _newHeight - 250 * newScale);
    }
    ResizeProgressBar(_newWidth, _newHeight) {
        let newScale = Utils.getScale(1080, 1920, _newWidth, _newHeight);
        this.progressBar?.SetScale(newScale);
        this.progressBar?.SetPosition(_newWidth / 2 + 20 * newScale, _newHeight - 250 * newScale);
    }
    ResizeGameLogo(_newWidth, _newHeight) {
        let newScale = Utils.getScale(1080, 1920, _newWidth, _newHeight);
        this.logo?.SetScale(newScale);
        this.logo?.SetPosition((_newWidth / 2) - (170 * newScale), (_newHeight / 2) - (610 * newScale));
    }

    resize(newWidth, newHeight, offsetWidth) {
        if (Constant.activeScene !== 'PreloadScene') {
            return;
        }
        let newScale = Utils.getScale(1080, 1920, newWidth, newHeight);
        if (this.bg) {
            this.ResizeBackground(newWidth, newHeight);
        }
        if (this.logo) {
            this.ResizeGameLogo(newWidth, newHeight);
        }
        this.loadingText.SetScale(newScale);
        this.loadingText.setPosition(newWidth / 2, newHeight - 350 * newScale);
        if (this.progressBase) {
            this.ResizeProgressBase(newWidth, newHeight);
        }
        if (this.progressBar) {
            this.ResizeProgressBar(newWidth, newHeight);
        }
        const camera = this.cameras.main;
        camera.x = offsetWidth;
        // camera.setBounds(0, 0, newWidth, newHeight);
        camera.setViewport(offsetWidth, 0, newWidth, newHeight);
    }
    //#endregion

}