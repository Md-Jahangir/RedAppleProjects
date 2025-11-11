export default class ButtonExp extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.SetInteractive();
    }
    SetInteractive() {
        super.setInteractive({ useHandCursor: true });
        super.on("pointerup", this.onUp, this);
    }
    onUp() {
        this.clickCallback.apply(this.clickCallbackContext, this.clickCallbackArgs);
    }
    setClickCallback(callback, context = null, args = null) {
        this.clickCallback = callback;
        this.clickCallbackContext = context === null ? this : context;
        this.clickCallbackArgs = args;
    };
}