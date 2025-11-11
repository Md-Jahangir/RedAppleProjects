class Overlay {
    constructor(scene) {
        this.scene = scene;
        this.overlay = null;
        this.controlOverlay = null;
    }
    CreateOverlay() {
        this.overlay = this.scene.add.image(game.config.width / 2, game.config.height / 2, 'tutorial_overlay');
    }
    CreateGameControlsOverlay() {
        this.controlOverlay = this.scene.add.image(game.config.width / 2, game.config.height / 2, 'onepixel').setScale(1200 * scaleFactor, 2000 * scaleFactor).setInteractive({ useHandCursor: true }).setAlpha(0.0001);
    }
}
export default Overlay;