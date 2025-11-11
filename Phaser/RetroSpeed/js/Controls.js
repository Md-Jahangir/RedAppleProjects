class Controls {
    constructor(scene) {
        this.scene = scene;
        this.leftOverlap;
        this.rightOverlap;
        this.cursors = null;
    }
    CreateTouchOverlaps() {
        this.leftOverlap = this.scene.add.image(0, 0, 'overlay').setScale(1920 * scaleFactorX, 2180 * scaleFactorY).setAlpha(0.001).setInteractive({ useHandCursor: true });
        if (isMobile) {
            this.leftOverlap.setScale(1060 * scaleFactorX, 4000 * scaleFactorY);
        }
        this.rightOverlap = this.scene.add.image(game.config.width, 0, 'overlay').setScale(-1915 * scaleFactorX, 2180 * scaleFactorY).setAlpha(0.001).setInteractive({ useHandCursor: true });
        if (isMobile) {
            this.rightOverlap.setScale(-1096 * scaleFactorX, 4000 * scaleFactorY);
        }
    }
    CreateKeyboardControls() {
        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }
}
export default Controls;