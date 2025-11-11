export default class Ball {
    constructor(scene, _texture, _frame, index) {
        this.scene = scene;
        this._x = 0;
        this._y = 0;
        this.texture = _texture;
        this.frame = _frame;
        this.create();
    }
    create() {
        this.ballImg = this.scene.add.sprite(this._x, this._y, this.texture, this.frame);
        this.ballText = this.scene.add.text(
            0,
            0,
            '', {
            fontFamily: "CAMBRIAB",
            fontStyle: "bold",
            fontSize: '25px',
            color: '#fff'
        }
        ).setOrigin(0.5);
    }
    set x(x) {
        this._x = x;
        this.ballImg.x = this._x;
        this.ballText.x = this._x;
    }
    set y(y) {
        this._y = y;
        this.ballImg.y = this._y;
        this.ballText.y = this._y;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    getDisplayHeight() {
        return this.ballImg.displayHeight;
    }
    getDisplayWidth() {
        return this.ballImg.displayWidth;
    }
    MoveX(newX, callback, callbackContext) {
        this.x = newX;
        callback.call(callbackContext);
        this.ballImg.setPosition(newX, this.y);
        this.ballText.copyPosition(this.ballImg);
    }
    MoveY(newY, text, callback, callbackContext) {
        this.y = newY;
        callback.call(callbackContext);
        this.ballText.setText(text);
        this.ballImg.setPosition(this.x, newY);
        this.ballText.copyPosition(this.ballImg);
    }
    GetFrame() {
        return this.ballImg.frame.name;
    }
    SetFrame(_frame) {
        this.ballImg.setFrame(_frame);
    }
    Remove() {
        this.ballImg.destroy();
        this.ballText.destroy();
    }
    Resize(newX, newY, newScale) {
        this.x = newX;
        this.y = newY;
        this.ballImg.setScale(newScale);
        this.ballText.setScale(newScale);
        // this.ballImg.setPosition(this.x * newScale, this.y * newScale);
        this.ballImg.setPosition(this.x, this.y);
        this.ballText.copyPosition(this.ballImg);

    }
}