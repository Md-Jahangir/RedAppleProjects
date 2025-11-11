import { Utils } from "./Utils.js";
import { SoundManager } from "./SoundManager.js";
import { Constant } from "./Constant.js";
import { Server } from "./Server.js";
import PreviousDraw from "./class/PreviousDraw.js";
import DrawClass from "./class/DrawClass.js";
import DrawHistory from "./class/DrawHistory.js";
import DrawNumberHits from "./class/DrawNumberHits.js";


export default class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");

    }

    init() {
        this.previousDraw = new PreviousDraw(this);
        this.drawClass = new DrawClass(this);
        this.drawHistory = new DrawHistory(this);
        this.drawNumberHits = new DrawNumberHits(this);
    }
    preload() { }

    create() {

        // Constant.game.events.on('onDrawHistoryCompleted', this.DrawHistoryCompleted, this);
        this.previousDraw.create();
        this.drawClass.create();
        this.drawHistory.create();
        this.drawNumberHits.create();

    }


    CreateBackground() {
        // this.bg = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2), "background").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
    }
    DrawHistoryCompleted() {
        // this.drawNumberHits.create();
    }



    update(t, dt) {

    }

}