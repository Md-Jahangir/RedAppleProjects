class Controls {
    constructor(scene) {
        this.scene = scene;
        this.leftOverlap;
        this.rightOverlap;
    }
    CreateOverlaps() {
        this.leftOverlap = this.scene.add.image(0, 0, 'onepixel').setScale(1920 * scaleFactorX, 2180 * scaleFactorY).setAlpha(0.001).setInteractive({ useHandCursor: true });
        this.rightOverlap = this.scene.add.image(game.config.width, 0, 'onepixel').setScale(-1915 * scaleFactorX, 2180 * scaleFactorY).setAlpha(0.001).setInteractive({ useHandCursor: true });
    }
}
export default Controls;