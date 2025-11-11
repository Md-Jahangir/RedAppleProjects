export default class TitleScene extends Phaser.Scene {

    constructor() {
        super("TitleScene");
        this.playButtonContainer = null;
        this.instructionButtonContainer = null;
    }

    preload() {}

    create() {
        this.menuBg = this.add.spine(Math.round(game.config.width / 2), Math.round(game.config.height / 2), 'bg_sprite', true).setScale(scaleFactor, scaleFactor);
        this.menuBg.play("BG_animation", true);

        this.title = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2), Math.round(game.config.height / 6), "title", 0.5, 0.5, scaleFactor, scaleFactor);
        this.title.setScale(0, 0);

        this.blueTurtle = this.add.spine(-Math.round(game.config.width / 5), Math.round(game.config.height / 1.8), 'menu_blue_turtle', true).setScale(scaleFactor, scaleFactor);

        this.yellowTurtle = this.add.spine(Math.round(game.config.width / 0.85), Math.round(game.config.height / 1.5), 'menu_yellow_turtle', true).setScale(scaleFactor, scaleFactor);

        this.blueTurtleBubbles = this.add.spine(Math.round(game.config.width / 2), Math.round(game.config.height / 2.2), 'menu_bubbles', true).setScale(scaleFactor * 0.5, scaleFactor * 0.5);
        this.blueTurtleBubbles.setVisible(false);

        this.yellowTurtleBubbles = this.add.spine(Math.round(game.config.width / 1.84), Math.round(game.config.height / 2.13), 'menu_bubbles', true).setScale(scaleFactor * 0.3, scaleFactor * 0.3);
        this.yellowTurtleBubbles.setVisible(false);

        this.playButton = this.add.spine(Math.round(game.config.width / 2), Math.round(game.config.height / 1.35), 'play_button', true).setScale(scaleFactor, scaleFactor);
        this.playButton.play("play_button_animation", true);
        this.playButton.setScale(0, 0);
        this.playButton.setInteractive({ useHandCursor: true });
        this.playButton.on("pointerdown", this.PlayButtonPressed, this);
        this.playButton.on("pointerup", this.PlayButtonReleased, this);

        this.ShowBlueTurtle();
        this.ShowYellowTurtle();
    }

    ShowBlueTurtle() {
        this.blueTurtle.play("floating", true);
        this.tweens.add({
            targets: [this.blueTurtle],
            x: Math.round(game.config.width / 2.7),
            y: Math.round(game.config.height / 2.1),
            ease: 'Sine.easeInOut',
            duration: 3200,
            callbackScope: this,
            onComplete: function(tween) {
                this.ShowTitleAndPlayButton();
                this.blueTurtleBubbles.setVisible(true);
                this.blueTurtleBubbles.play("bubbles_animation", true);
            }
        });
    }

    ShowYellowTurtle() {
        this.yellowTurtle.play("floating", true);
        this.tweens.add({
            targets: [this.yellowTurtle],
            x: Math.round(game.config.width / 1.51),
            y: Math.round(game.config.height / 1.88),
            ease: 'Sine.easeInOut',
            duration: 3700,
            callbackScope: this,
            onComplete: function(tween) {
                this.yellowTurtleBubbles.setVisible(true);
                this.yellowTurtleBubbles.play("bubbles_animation", true);
            }
        });
    }

    ShowTitleAndPlayButton() {
        this.tweens.add({
            targets: [this.title, this.playButton],
            scaleX: scaleFactor,
            scaleY: scaleFactor,
            ease: 'Back.easeOut',
            duration: 500,
            callbackScope: this,
            onComplete: function(tween) {
                // this.playButton.play("play_button_animation", true);
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