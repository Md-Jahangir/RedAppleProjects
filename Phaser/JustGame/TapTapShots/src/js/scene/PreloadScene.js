
import { Server } from "../class/Server";
import { Constant } from "../Constant";
import { Utils } from "../Utils";
import FontFaceObserver from "fontfaceobserver";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
        this.fonts = {
            "Poppins-Bold": null,
        }
    }
    preload() {
        // console.log('preload------');
        this.load.image('preload-bg', './assets/images/splash/game_bg.png');
        this.load.image('loading-bar', './assets/images/splash/progress_bar.png');
        this.load.image('loading-base', './assets/images/splash/progress_base.png');
    }
    create() {
        this.game.events.on("resize", this.resize, this);

        this.bg = this.add.image(0, 0, 'preload-bg').setOrigin(0);
        this.loadingText = this.add.text(0, 0, 'Loading...', { fontFamily: "Poppins-Bold", fontSize: 80 }).setOrigin(0.5);
        this.loadingBase = this.add.image(0, 0, 'loading-base').setOrigin(0.5);
        this.loadingBar = this.add.image(0, 0, 'loading-bar').setOrigin(0.5);
        this.loadingBar.setCrop(0, 0, this.loadingBar.height);

        this.LoadFonts();
        // console.log(window.innerWidth, window.innerHeight);
        this.resize(window.innerWidth, window.innerHeight);
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
            if (Server.IsUrlParamMissing()) {
                // this.scene.stop('PreloadScene');
                this.scene.start('ErrorScene');
            }
            else {
                Constant.timeToEnd = Server.timerValue;
                this.LoadAssets();
            }
        }
    }
    FontLoadError(fontName) {
        console.log('error');
    }
    LoadAssets() {
        //loading bar
        this.load.on('progress', this.LoadProgress, this);
        this.load.on('complete', this.LoadComplete, { scene: this.scene });

        //game scene assets
        this.load.image('game-bg', './assets/images/splash/game_bg.png');
        this.load.image('ball', './assets/images/gameplay/ball.png');
        this.load.image('ball-shadow', './assets/images/gameplay/ball_shadow.png');
        this.load.image('bubble', './assets/images/gameplay/bubble_particle.png');
        this.load.image('ground', './assets/images/gameplay/Ground.png');


        //basket right
        this.load.image('basket-right', './assets/images/gameplay/right_basket_board.png');
        this.load.image('basket1', './assets/images/gameplay/right_ring_front.png');
        this.load.image('basket-piece1', './assets/images/gameplay/right_ring_back.png');


        //basket left
        this.load.image('basket-left', './assets/images/gameplay/left_basket_board.png');
        this.load.image('basket2', './assets/images/gameplay/left_ring_front.png');
        this.load.image('basket-piece2', './assets/images/gameplay/left_ring_back.png');

        //Button load 
        this.load.image('pause-but', './assets/images/button/pause_but.png');
        this.load.image('play-but', './assets/images/button/play_but.png');
        this.load.image('restart-but', './assets/images/button/restart_but.png');

        //one pixel
        this.load.image('one-pixel', './assets/images/gameplay/one-pixel.png');

        //json
        this.load.json('basket-collider', './assets/json/ColliderBasket.json');


        this.load.start();


    }
    LoadProgress(_percentage) {
        this.loadingBar.setCrop(0, 0, this.loadingBar.width * _percentage, this.loadingBar.height);
        _percentage = _percentage * 100;
        this.loadingText.setText('Loading...' + _percentage + '%');
    }
    LoadComplete() {
        setTimeout(() => {
            this.scene.stop('PreloadScene');
            this.scene.start('GameScene');
        }, 1000)

    }

    resize(newWidth, newHeight) {
        // console.log(newWidth, newHeight);
        let newScale = Utils.getScale(1080, 1920, newWidth, newHeight);
        this.bg.setDisplaySize(newWidth, newHeight);
        this.loadingBase.setScale(newScale);
        this.loadingBase.setPosition(
            newWidth / 2,
            newHeight / 2 + 411 * newScale
        );
        this.loadingBar.setScale(newScale);
        this.loadingBar.setPosition(
            newWidth / 2,
            newHeight / 2 + 411 * newScale
        );
        this.loadingText.setScale(newScale);
        this.loadingText.setPosition(
            newWidth / 2,
            newHeight / 2 + 240 * newScale
        )
    }


}