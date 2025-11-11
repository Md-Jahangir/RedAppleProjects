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
        this.usualImg = this.scene.add.image(x, y, "symbol-" + this.id);
        this.spinAnim = this.scene.add.sprite(x, y, "symbol-spin-animation");
        this.spinAnim.setVisible(false);
        this.winAnim = this.scene.add.sprite(x, y, "animation-symbol-Bear");
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

    setScale(newScale) {
        this.usualImg.setScale(newScale);
        this.spinAnim.setScale(newScale);
        this.winAnim.setScale(newScale);
    };

    setPosition(newX, newY) {
        this.usualImg.setPosition(newX, newY);
        this.spinAnim.setPosition(newX, newY);
        this.winAnim.setPosition(newX, newY);
    };

    playSpin() {
        this.usualImg.setVisible(false);
        this.winAnim.setVisible(false);
        this.spinAnim.setVisible(true);
        this.spinAnim.play("symbol-spin");
    };

    stopSpin() {
        this.spinAnim.stop();
        this.spinAnim.setVisible(false);
        this.winAnim.setVisible(false);
        this.usualImg.setVisible(true);
    };

    setSymbol(id) {
        this.id = id;
        this.usualImg.setTexture("symbol-" + this.id);
    };

    playWin() {
        this.usualImg.setVisible(false);
        this.spinAnim.setVisible(false);
        this.winAnim.setVisible(true);
        this.winAnim.play("anim-symbol-" + this.id);
    }
}

export default Symbol;