//#region - Class defination 
class Utils {
    constructor() {

    };

    /**
    * Check is there any value null/undefine/length 0 .
    * @returns {string} empty or not
    */
    IsEmpty = (value) => {
        if (value === null || value === undefined || this.Trim(value) === '' || this.Trim(value) === "" || value.length === 0) {
            return true
        } else {
            return false
        }
    };

    /**
    * Trim the string.
    * @returns {string} string with trim
    */
    Trim = (x) => {
        let value = String(x)
        return value.replace(/^\s+|\s+$/gm, '')
    };

    getScale(resWidth, resHeight, screenNewWidth, screenNewHeight) {
        let screenWidth = resWidth;
        let screenHeight = resHeight;
        let newScaleX = screenNewWidth / screenWidth;
        let newScaleY = screenNewHeight / screenHeight;
        return newScaleX < newScaleY ? newScaleX : newScaleY;
    };

    ButtonScaleTween(_this, _refImage, _scale) {
        let ScaleTween = _this.add.tween({
            targets: [_refImage],
            scaleX: _scale * 0.95,
            scaleY: _scale * 0.95,
            ease: 'Linear',
            duration: 50,
            onComplete: this.onCompleteHandler,
            onCompleteParams: [_refImage, _scale],
        });
    };

    onCompleteHandler(tween, targets, _refImage, _scale) {
        var te = this.parent.scene.add.tween({
            targets: [_refImage],
            scaleX: _scale * 1,
            scaleY: _scale * 1,
            ease: 'Linear',
            duration: 50,
        });
    };
};

//#endregion 
let utils = new Utils();
export { utils as Utils };