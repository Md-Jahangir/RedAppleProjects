export default class TitleScene extends Phaser.Scene {

    constructor() {
        super("TitleScene");
        this.playButtonContainer = null;
        this.instructionButtonContainer = null;
    }

    preload() {

    }

    create() {
        var menuBg = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2), Math.round(game.config.height / 2), "menu_bg", 0.5, 0.5, scaleFactor, scaleFactor);
        this.title = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2), Math.round(game.config.height / 2.5), "title", 0.5, 0.5, scaleFactor, scaleFactor);
        this.title.setScale(0, 0);

        // this.playButtonContainer = this.add.container(0, 0);
        this.playButton = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2), Math.round(game.config.height / 1.5), "play_button", 0.5, 0.5, scaleFactor, scaleFactor, "true", this.PlayButtonPressed, this.PlayButtonReleased);
        // var playTextStyle = { fontFamily: 'AmericanCaptain', fontSize: '80px', fill: '#fff', fontStyle: 'bold', align: 'center' };
        // this.playText = this.add.text(Math.round(game.config.width / 2), Math.round(game.config.height / 1.5), "PLAY", playTextStyle).setOrigin(0.5, 0.5).setScale(scaleFactor, scaleFactor);
        // this.playButtonContainer.add([this.playButton, this.playText]);

        this.playButton.alpha = 0;
        this.ShowTitleAndButton();
    }

    ShowTitleAndButton() {
        this.tweens.add({
            targets: [this.title],
            scaleX: scaleFactor,
            scaleY: scaleFactor,
            ease: 'Bounce.Out',
            duration: 300,
            delay: 100,
            callbackScope: this,
            onComplete: function(tween) {
                this.tweens.add({
                    targets: [this.playButton],
                    alpha: 1,
                    ease: 'Back.Out',
                    duration: 200,

                });
            }
        });
    }

    PlayButtonPressed() {
        Utils.ButtonScaleTween(this.scene.scene, this.scene.scene.playButton, scaleFactor);
        Utils.ButtonScaleTween(this.scene.scene, this.scene.scene.playText, scaleFactor);
        SoundManager.PlayButtonClickSound();
    }
    PlayButtonReleased() {
        setTimeout(() => {
            game.scene.stop('TitleScene');
            game.scene.start('GameScene');
        }, 100);
    }

}