export default class TitleScene extends Phaser.Scene {

    constructor() {
        super("TitleScene");
        this.playButtonContainer = null;
        this.instructionButtonContainer = null;
    }

    preload() {

    }

    create() {
        var menuBg = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2), Math.round(game.config.height / 2), "menu_bg", 0.5, 0.5, 1, 1);
        var logo = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2), Math.round(game.config.height / 7), "logo", 0.5, 0.5, 0.6, 0.6);

        this.playButtonContainer = this.add.container(0, 0);
        this.playButton = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2), Math.round(game.config.height / 2), "button_base", 0.5, 0.5, 1, 1, "true", this.PlayButtonPressed, this.PlayButtonReleased);
        var playTextStyle = { fontFamily: 'Bahnschrift', fontSize: '46px', fill: '#000', fontStyle: 'bold', align: 'center' };
        this.playText = this.add.text(Math.round(game.config.width / 2), Math.round(game.config.height / 2), "PLAY", playTextStyle).setOrigin(0.5, 0.5);
        this.playButtonContainer.add([this.playButton, this.playText]);

        this.instructionButtonContainer = this.add.container(0, 0);
        this.instructionButton = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2), Math.round(game.config.height / 1.65), "button_base", 0.5, 0.5, 1, 1, "true", this.InstructionButtonPressed, this.InstructionButtonReleased);
        var instructionTextStyle = { fontFamily: 'Bahnschrift', fontSize: '46px', fill: '#000', fontStyle: 'bold', align: 'center' };
        this.instructionText = this.add.text(Math.round(game.config.width / 2), Math.round(game.config.height / 1.65), "ABOUT", instructionTextStyle).setOrigin(0.5, 0.5);
        this.instructionButtonContainer.add([this.instructionButton, this.instructionText]);

    }

    PlayButtonPressed(_this) {
        Utils.ButtonScaleTween(this.scene, this.scene.playButton, 1);
        Utils.ButtonScaleTween(this.scene, this.scene.playText, 1);
    }
    PlayButtonReleased() {
        setTimeout(() => {
            game.scene.stop('TitleScene');
            game.scene.start('GameScene');
        }, 100);
    }

    InstructionButtonPressed() {
        Utils.ButtonScaleTween(this.scene, this.scene.instructionButton, 1);
        Utils.ButtonScaleTween(this.scene, this.scene.instructionText, 1);
    }
    InstructionButtonReleased() {
        setTimeout(() => {
            var url = "https://www.redappletech.com/";
            window.open(url, '_blank');
        }, 100);
    }


}