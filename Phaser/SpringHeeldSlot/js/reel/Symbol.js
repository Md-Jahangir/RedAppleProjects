class Symbol {
    constructor(scene, x, y, id) {
        this.scene = scene;
        this.id = id;
        this.usualImg = null;
        this.winAnim = null;
        this.spinAnim = null;

        this.create(x, y);
    };

    create(x, y) {
        this.usualImg = this.scene.add.image(x, y, "symbol_" + this.id).setOrigin(0.5, 0).setScale(scaleFactorX, scaleFactorY);
        // this.usualImg.setVisible(false);
        this.spinAnim = this.scene.add.sprite(x, y, "symbol_spin_animation").setOrigin(0.5, 0).setScale(scaleFactorX, scaleFactorY);
        this.spinAnim.setVisible(false);
        this.winAnim = this.scene.add.sprite(x, y, "animation_symbol_" + this.id).setOrigin(0.5, 0).setScale(scaleFactorX, scaleFactorY);
        this.winAnim.setVisible(false);
    };

    getId() {
        return this.id;
    };

    getWidth() {
        return this.usualImg.displayWidth;
    };

    getHeight() {
        return this.usualImg.displayHeight;
    };

    getPosition() {
        return this.usualImg.getCenter();
    };

    playSpin(_startFrame) {
        this.usualImg.setVisible(false);
        this.winAnim.setVisible(false);
        this.spinAnim.setVisible(true);
        this.spinAnim.play("symbol_spin", false, _startFrame);
    };

    stopSpin() {
        this.spinAnim.anims.stop();
        this.spinAnim.setVisible(false);
        this.winAnim.setVisible(false);
        this.usualImg.setVisible(true);
    };

    setSymbol(id) {
        this.id = id;
        this.usualImg.setTexture("symbol_" + this.id);
    };

    playWin() {
        this.usualImg.setVisible(false);
        this.spinAnim.setVisible(false);
        this.winAnim.setVisible(true);
        this.winAnim.play("anim_symbol_" + this.id, true);
    }

    stopWin() {
        console.log("stopWin ")
        this.winAnim.anims.stop();
        this.usualImg.setVisible(true);
        this.spinAnim.setVisible(false);
        this.winAnim.setVisible(false);
    }
}

export default Symbol;