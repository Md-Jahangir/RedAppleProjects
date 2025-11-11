export default class MatterImage extends Phaser.Physics.Matter.Image {
    constructor(scene, x, y, texture, frame, obj) {
        super(scene.matter.world, x, y, texture, frame, obj)
        scene.add.existing(this);
        // this.setOrigin(0.5);
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
}