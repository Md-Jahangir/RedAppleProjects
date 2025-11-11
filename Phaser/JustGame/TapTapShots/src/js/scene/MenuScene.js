// import { Constant } from "../Constant";
import { Utils } from "../Utils";
import Button from "../class/Button";

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
        this.randomBasket = null;
    }
    create() {
        this.game.events.on("resize", this.resize, this);

        // console.log('Menu Scene-----');
        // this.randomBasket = Phaser.Math.Between(1, 2);
        this.bg = this.add.image(0, 0, 'game-bg').setOrigin(0);
        this.playBut = new Button(this, 'play-but', 0, 0, 1, 1);
        this.playBut.setClickcallback(this.PlayButtonFunc, this);
        // console.log(this.randomBasket, '--------------');

        this.resize(window.innerWidth, window.innerHeight);
    }
    //Menu scene to Game scene jump Function
    PlayButtonFunc() {
        this.scene.stop('PreloadScene');
        this.scene.start('GameScene');
    }

    resize(newWidth, newHeight) {
        let newScale = Utils.getScale(1080, 1920, newWidth, newHeight);
        this.bg.setDisplaySize(newWidth, newHeight);
        this.playBut.SetScale(newScale);
        this.playBut.SetPosition(newWidth / 2, newHeight / 2);
    }
} 