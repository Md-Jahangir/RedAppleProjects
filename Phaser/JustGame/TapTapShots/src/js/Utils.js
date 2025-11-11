
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
    // getScaleX(resWidth, screenNewWidth) {
    //     let screenWidth = resWidth;
    //     let newScaleX = screenNewWidth / screenWidth;
    //     return newScaleX;
    // }
    // getScaleY(resHeight, screenNewHeight) {

    //     let screenHeight = resHeight;
    //     let newScaleY = screenNewHeight / screenHeight;
    //     return newScaleY

    // }
};

let utils = new Utils();
export { utils as Utils };