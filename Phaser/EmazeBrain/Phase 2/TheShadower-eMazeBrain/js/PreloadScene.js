import { LoadAssets } from "./LoadAssets.js";
import { Server } from "./Server.js";
import { GameArchitechture } from "./GameArchitechture.js";
import { LoadingPopup } from "./LoadingPopup.js";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }
    init() { }
    preload() { }
    create() {
        this.loadingPopup = new LoadingPopup(this);
        let bg = this.add.image(game.config.width / 2, game.config.height / 2, 'background').setOrigin(0.5, 0.5).setScale(scaleFactorX, scaleFactorY);
        this.loadingPopup.ShowLoadingPopup();
        LoadAssets.LoadAssests(this, JSON.parse(localStorage.getItem("TheShadowerImageJson")), this.LoadComplete);
        // LoadAssets.LoadAssests(this,window.navigator.onLine,JSON.parse(localStorage.getItem("moreislessimageJson")),this.LoadComplete);
    };
    /*
    After loading all the file
    */
    LoadComplete() {
        SoundManager.AddSound();
        console.log('preload scene ended here');
        this.scene.start("GameScene");
    };
}