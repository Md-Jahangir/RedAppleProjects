export default class Sprite extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
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
        super.setInteractive({ useHandCursor: true, draggable: true });
    }
    RemoveInteractive() {
        super.removeInteractive();
    }
    SetFrame(frameNum) {
        super.setFrame(frameNum);
    }
    Destroy() {
        super.destroy();
    }
}