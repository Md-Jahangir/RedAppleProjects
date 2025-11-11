export default class Text extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, style) {
        super(scene, x, y, text, style);
        scene.add.existing(this);
    }
    SetScale(newScale) {
        super.setScale(newScale);
    }
    SetPosition(x, y) {
        super.setPosition(x, y);
    }
    SetText(text) {
        super.setText(text);
    }
    SetOrigin(_origin) {
        super.setOrigin(_origin);
    }
    SetVisible(isTrue) {
        super.setVisible(isTrue);
    }
}