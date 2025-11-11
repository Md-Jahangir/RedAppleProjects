import { Audiomanager } from "./Audiomanager.js";
class GameUI {
    constructor(scene) {
        this.scene = scene;
        this.tapTweens = null;
        this.fullscreen = null;
        this.exitFullscreen = null;
    }
    CreateTitleUI() {
        let title = this.scene.add.image(game.config.width / 2, game.config.height / 2.7, 'title');
        let share = this.scene.add.image(game.config.width / 1.67, game.config.height / 1.74, 'share').setScale(0.7 * scaleFactorY);
        let playButton = this.scene.add.image(game.config.width / 2.4, game.config.height / 1.74, 'play_button').setScale(0.7 * scaleFactorY).setInteractive({ useHandCursor: true });
        playButton.on('pointerdown', this.OnPointerDown, this);
        playButton.on('pointerup', this.OnPointerUp, this);
    }
    OnPointerDown() {
        Audiomanager.CreateClickSound();
    }
    OnPointerUp() {
        this.scene.scene.stop('TitleScene');
        this.scene.scene.start('GameScene');
    }
    CreateGameUI() {
        let tap = this.scene.add.image(game.config.width / 2.01, game.config.height / 2.16, 'tap');
        if (isMobile) {
            tap.setScale(0.8 * scaleFactorY);
        }
        this.tapTweens = this.scene.tweens.add({
            targets: tap,
            duration: 900,
            ease: 'Sine.easeIn',
            alpha: 0,
            repeat: 1,
        });
        this.fullscreen = this.scene.add.image(game.config.width / 1.08, game.config.width / 13.8, 'enter').setInteractive({ useHandCursor: true }).setDepth(2).setScale(0.3 * scaleFactorY);
        this.fullscreen.on('pointerup', this.FullscreenMode, this);
        this.exitFullscreen = this.scene.add.image(game.config.width / 1.08, game.config.width / 13.8, 'exit').setInteractive({ useHandCursor: true }).setDepth(2).setScale(0.3 * scaleFactorY).setVisible(false);
        this.exitFullscreen.on('pointerup', this.ExitFullscreenMode, this);
    }
    FullscreenMode() {
        // this.scene.sys.game.device.fullscreen(this.fullscreen);
        this.scene.scale.startFullscreen();
    }
    ExitFullscreenMode() {
        this.scene.scale.stopFullscreen();
    }
    // OnComplete() {

    // }
}
export default GameUI;