export default class GameErrorScene extends Phaser.Scene {

    constructor() {
        super('GameErrorScene');
        this.errorMessage = "Sorry ! no data found while loading, please reload the page.";
    };

    preload() {
        this.load.image('error_logo', 'assets/images/gameplay/error_logo.png');
    };

    create() {
        let errorLogo = this.add.image(Math.round(constant.game.config.width / 2), Math.round(constant.game.config.height / 4), "error_logo").setOrigin(0.5).setScale(scaleFactor);
        let errorTextStyle = { fontFamily: 'SofiaProSemiBoldAz', fontSize: '65px', fill: '#fff', fontStyle: 'bold', align: 'center', wordWrap: { width: Math.round(constant.game.config.width - 100) } };
        let errorText = this.add.text(Math.round(constant.game.config.width / 2), Math.round(constant.game.config.height / 2), this.errorMessage, errorTextStyle).setOrigin(0.5, 0.5);
    }

}