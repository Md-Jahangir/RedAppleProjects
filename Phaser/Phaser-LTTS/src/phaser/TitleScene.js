import Phaser from 'phaser';

export default class TitleScene extends Phaser.Scene {
    constructor() {
        super('TitleScene');
    }

    create() {
        this.cameras.main.setBackgroundColor(0xb0e0eb);

        this.playButton = this.add.image(
            Math.round(window.phaserGame.game.config.width / 2),
            Math.round(window.phaserGame.game.config.height / 2),
            'play_button').setOrigin(0.5).setScale(window.phaserGame.scaleFactorX);
        this.playButton.setInteractive({useHandCursor: true});
        this.playButton.on('pointerdown', this.PlayButtonPressed, this);
        this.playButton.on('pointerup', this.PlayButtonReleased, this);
    }

    PlayButtonPressed() {
    }

    PlayButtonReleased() {
        setTimeout(() => {
            window.phaserGame.game.scene.stop('TitleScene');
            window.phaserGame.game.scene.start('GameScene');
        }, 100);
    }
}
