import { LoadAssets } from "./LoadAssets.js";
import { Server } from "./Server.js";
import { GameArchitechture } from "./GameArchitechture.js";
import { LoadingPopup } from "./LoadingPopup.js";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }
    init() {

    }
    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image("one_pixel_white",'assets/images/one_pixel_white.png')
        this.load.spritesheet('loading_wheel', 'assets/images/loading_wheel.png', {
            frameWidth: 157,
            frameHeight: 157
        });
        this.load.image('ticker', 'assets/images/ticker.png');
        this.loadFont('tickingtimebombbb_ital', 'assets/fonts/tickingtimebombbb_ital.ttf');
    }
    loadFont(name, url) {
        var newFont = new FontFace(name, `url(${url})`);
        newFont.load().then(function(loaded) {
            document.fonts.add(loaded);
        }).catch(function(error) {
            return error;
        });
    }
    create() {
        // console.log('loading pop up : ',this)
        this.loadingPopup = new LoadingPopup(this);
        let bg = this.add.image(game.config.width / 2, game.config.height / 2, 'background').setOrigin(0.5, 0.5).setScale(scaleFactorX, scaleFactorY);
        this.loadingPopup.ShowLoadingPopup();
        LoadAssets.LoadAssests(this,JSON.parse(localStorage.getItem("MatchThePairsImageJson")),this.LoadComplete);
    }
    LoadComplete() /*After loading all the file*/ {
        SoundManager.AddSound();
        this.scene.start("GameScene");
    }

}