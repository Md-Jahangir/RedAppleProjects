export default class Button extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture[0]);
        scene.add.existing(this);
        this.x = x;
        this.y = y;
        this.textureKeys = texture;
        this.clickCallback = null;
        this.clickCallbackContext = this;
        this.clickCallbackArgs = null;
        this.isDisabled = null;
        this.SetInteractive();
    }
    SetInteractive() {
        super.setInteractive({ useHandCursor: true });
        super.on("pointerup", this.OnUp, this);
        super.on("pointerout", this.OnOut, this);
        super.on("pointerover", this.OnOver, this);
    }
    setClickCallback(callback, context = null, args = null) {
        this.clickCallback = callback;
        this.clickCallbackContext = context === null ? this : context;
        this.clickCallbackArgs = args;
    };
    OnUp() {
        this.clickCallback.apply(this.clickCallbackContext, this.clickCallbackArgs);
    }
    OnOut() {
        this.SetTexture(this.textureKeys[0]);
    }
    OnOver() {
        this.SetTexture(this.textureKeys[1]);
    }
    SetTexture(key) {
        super.setTexture(key);
    }
    Disable() {
        setTimeout(() => {
            this.isDisabled = true;
            this.SetTexture(this.textureKeys[2]);
            super.setAlpha(0.5);
            super.removeInteractive();
        }, 100);
    };
    Enable() {
        this.isDisabled = false;
        this.SetTexture(this.textureKeys[0]);
        super.setInteractive({ cursor: 'pointer' });
        this.disabled.setVisible(false);
        super.setAlpha(1);

    };
    Destroy() {
        super.destroy();
        delete this;
    };
    SetScale(newScale) {
        super.setScale(newScale)
    };
    SetPosition(newX, newY) {
        this.btnX = newX;
        this.btnY = newY;

        super.setPosition(this.btnX, this.btnY);
    };
}