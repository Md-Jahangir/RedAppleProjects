import { Constant } from "./Constant";
import FontFaceObserver from "fontfaceobserver";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super("PreloadScene");
        this.fonts = {
            "Poppins-Bold": null,
        }
    }
    preload() {
        this.load.image('preload_bg', './assets/images/overlayimages/preload_bg.png');
        this.load.image('loading_bar', './assets/images/uiassets/loading_bar.png');
        this.load.image('loading_base', './assets/images/uiassets/loading_base.png');
    }
    create() {
        this.bg = this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2, 'preload_bg').setDisplaySize(Constant.game.config.width, Constant.game.config.height);
        this.loadingText = this.add.text(Constant.game.config.width / 2, Constant.game.config.height / 1.5, 'Loading...', { fontFamily: 'Howli-SansOne', fontSize: 80 }).setOrigin(0.5).setScale(Constant.scaleFactor);
        this.loadingBase = this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 1.2, 'loading_base').setScale(Constant.scaleFactor);
        this.loadingBar = this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 1.2, 'loading_bar').setScale(Constant.scaleFactor);
        this.loadingBar.setCrop(0, 0, 0, this.loadingBar.height);

        this.LoadFonts();
    }
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

        }
    }
    FontLoadError(fontName) {
        console.log('error');
    }
    LoadAssets() {
        //loading bar
        this.load.on('progress', this.LoadProgress, this);
        this.load.on('complete', this.LoadComplete, { scene: this.scene });

        //overlay
        this.load.image('menu_bg', './assets/images/overlayimages/menu_bg.png');
        this.load.image('game_bg', './assets/images/overlayimages/game_bg.png');
        this.load.image('paralax_bg', './assets/images/overlayimages/paralax_bg.jpg');

        //boundary
        this.load.image('collider', './assets/images/one_pixel.png');

        // game assets
        this.load.image('player_head', './assets/images/gameassets/Player_head.png');
        this.load.image('player_body', './assets/images/gameassets/Player_body.png');
        this.load.image('tank_obs', './assets/images/gameassets/tank_obs.png');
        this.load.image('bullet', './assets/images/gameassets/bullet.png');



        //buttons
        this.load.image('but_play', './assets/images/uiassets/buttonassets/but_play.png');
        this.load.image('but_home', './assets/images/uiassets/buttonassets/but_home.png');
        this.load.image('but_info', './assets/images/uiassets/buttonassets/but_info.png');
        this.load.image('but_pause', './assets/images/uiassets/buttonassets/but_pause1.png');
        this.load.image('but_restart', './assets/images/uiassets/buttonassets/but_restart.png');

        this.load.start();
    }

    LoadProgress(_percentage) {
        this.loadingBar.setCrop(0, 0, this.loadingBar.width * _percentage, this.loadingBar.height);
        _percentage = parseInt(_percentage);
        _percentage = _percentage * 100;
        this.loadingText.setText('Loading...' + _percentage + '%');
    }

    LoadComplete() {
        setTimeout(() => {
            this.scene.stop('PreloadScene');
            this.scene.start('MenuScene');
        }, 1000)
    }
}