class Utils {
    constructor() {

    };
    getScale(resWidth, resHeight, screenNewWidth, screenNewHeight) {
        let screenWidth = resWidth;
        let screenHeight = resHeight;
        let newScaleX = screenNewWidth / screenWidth;
        let newScaleY = screenNewHeight / screenHeight;
        return newScaleX < newScaleY ? newScaleX : newScaleY;
    }
}
let utils = new Utils();
export { utils as Utils };