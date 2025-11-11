import Button from "../class/Button";
import { Utils } from "../class/Utils";
import { Model } from "../Model";
import Image from "../objectclass/Image";
import { Client } from "../services/Client";


export default class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene");
    }
    create() {
        Client.SetConnection();
        this.game.events.on('resize', this.Resize, this);
        this.bg = new Image(this, 0, 0, 'bg');
        this.bg.setOrigin(0);
        let textureKeys = ["play_button_normal", "play_button_hover", "play_button_disabled"];
        this.playBut = new Button(this, 0, 0, textureKeys);
        this.playBut.setClickCallback(this.PlayButFunc, this, null);
        this.Resize(window.innerWidth, window.innerHeight);

    }
    PlayButFunc() {
        let random = Phaser.Math.Between(1, 4);
        setTimeout(() => {
            this.scene.stop('MenuScene');
            this.scene.start('GameScene', 4);

        }, 1000)
    }
    Resize(newWidth, newHeight) {
        let newScale = Utils.getScale(1920, 1080, newWidth, newHeight);
        this.bg.SetDisplay(newWidth, newHeight);
        this.playBut.SetScale(newScale);
        this.playBut.SetPosition(newWidth / 2, newHeight / 2);
    }
}