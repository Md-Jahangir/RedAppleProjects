export default class Text extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, style) {
        super(scene, x, y, text, style)
        scene.add.existing(this);
        // this.textObj = scene.add.text(0, 0, text, style).setOrigin(0);
    }
    SetScale(newScale) {
        this.setScale(newScale);
    }
    SetPosition(x, y) {
        // this.setPosition(x, y);
        this.textObj.setPosition(x, y);
    }
    SetText(text) {
        this.setText(text);
    }
    SetOrigin(_origin) {
        this.setOrigin(_origin);
    }
}