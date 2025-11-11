class MagneticField {
    constructor(scene) {
        this.scene = scene;
    }
    CreateMagneticField() {
        this.field = this.scene.add.image(0, 0, "black").setOrigin(0.5, 0.5).setScale(1080, 300).setVisible(false);
        this.scene.physics.add.existing(this.field);
        this.field.body.allowGravity = false;
        this.field.body.immovable = true;
    }
    MakeMagneticFieldEnable(_xPos, _yPos) {
        this.field.setPosition(_xPos, _yPos);
        // this.field.setVisible(true);
    }
    MakeMagneticFieldDisable() {

    }
}
export default MagneticField;