import { Constant } from "./Constant.js";
export default class GameErrorScene extends Phaser.Scene {

    constructor() {
        super('GameErrorScene');
        this.errorMessage = "Sorry ! Timer value not found...";
    };

    preload() {
        this.load.image('error_logo', 'assets/images/loading/error_logo.png');
    };

    create() {
        let errorLogo = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 4), "error_logo").setOrigin(0.5).setScale(Constant.scaleFactor);
        let errorTextStyle = { fontFamily: 'Poppins_Bold', fontSize: '65px', fill: '#fff', fontStyle: 'bold', align: 'center', wordWrap: { width: Math.round(Constant.game.config.width - 100) } };
        let errorText = this.add.text(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2), this.errorMessage, errorTextStyle).setOrigin(0.5, 0.5);
    }

}