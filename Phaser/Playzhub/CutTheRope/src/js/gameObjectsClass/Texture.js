export default class Texture extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)
        scene.add.existing(this);
        this.setOrigin(0);
    }
    SetDisplay(newWidth, newHeight) {
        super.setDisplaySize(newWidth, newHeight);
    }
    SetScale(newScale) {
        super.setScale(newScale);
    }
    SetPosition(x, y) {
        super.setPosition(x, y);
    }
    SetOrigin(_origin) {
        super.setOrigin(_origin);
    }
    SetInteractive() {
        super.setInteractive({ useHandCursor: true });
    }
    Destroy() {
        super.destroy();
    }
    SetDepth(_depth) {
        super.setDepth(_depth);
    }
}