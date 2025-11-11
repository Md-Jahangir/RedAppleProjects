class Constant {
    constructor() {
        //#region -Variables
        this.game = null;
        this.scaleFactor = null;
        this.gameWidth = null;
        this.gameHeight = null;
        this.colliders = null;
        this.delayGameOver = 1000;
        this.isPaused = false;
        this.isGameOver = false;
        this.isFirstResize = true;
        //servers
        this.advertisementCountDown = null;
        this.advertisementBreakTime = 12;
        this.PlayerData = null;
        //#endregion
    }
    //#region -GetScale
    /**
     * 
     * @param {number} resWidth 
     * @param {number} resHeight 
     * @param {number} screenNewWidth 
     * @param {number} screenNewHeight 
     * @returns 
     */
    GetScale(resWidth, resHeight, screenNewWidth, screenNewHeight) {
        let screenWidth = resWidth;
        let screenHeight = resHeight;
        let newScaleX = screenNewWidth / screenWidth;
        let newScaleY = screenNewHeight / screenHeight;
        return newScaleX < newScaleY ? newScaleX : newScaleY;
    }
    //#endregion
}
//Global Instance
const constant = new Constant();
export { constant as Constant }