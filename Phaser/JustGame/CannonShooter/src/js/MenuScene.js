import { Constant } from "./Constant";
import Button from "./Button";

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene");
    }
    create() {
        this.bg = this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2, 'menu_bg').setDisplaySize(Constant.game.config.width, Constant.game.config.height);
        this.playBut = new Button(this, 'but_play', Constant.game.config.width / 2, Constant.game.config.height / 1.5);
        this.infoBut = new Button(this, 'but_info', Constant.game.config.width / 1.11, Constant.game.config.height / 7.2);
    }
}