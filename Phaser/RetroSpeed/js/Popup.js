import { Audiomanager } from "./Audiomanager.js";
class Popup {
    constructor(scene) {
        this.scene = scene;
    }
    CreatePopup() {
        let overlay = this.scene.add.image(game.config.width / 3.84, game.config.height / 2.16, 'overlay').setScale(2850 * scaleFactorX, 2060 * scaleFactorY).setAlpha(0.6);
        let gameOverTitle = this.scene.add.image(game.config.width / 2, game.config.height / 2.7, 'game_over');
        if (isMobile) {
            gameOverTitle.setScale(0.8 * scaleFactorY);
        }
        let share = this.scene.add.image(game.config.width / 1.71, game.config.height / 2.1, 'share').setScale(0.7 * scaleFactorY);
        let playButton = this.scene.add.image(game.config.width / 2.4, game.config.height / 2.1, 'play_button').setScale(0.7 * scaleFactorY).setInteractive({ useHandCursor: true });
        let score = this.scene.add.image(game.config.width / 2.06, game.config.height / 1.6, 'score').setScale(1.2 * scaleFactorY);
        playButton.on('pointerdown', this.OnPointerDown, this);
        playButton.on('pointerup', this.OnPointerUp, this);
    }
    OnPointerDown() {
        Audiomanager.CreateClickSound();
    }
    OnPointerUp() {
        this.scene.scene.restart('GameScene');
        randomNumber = (Math.floor(Math.random() * bgArray.length));
    }
}
export default Popup;