class Constant {
    constructor() {
        this.game = null;
        this.scaleFactor = null;
        this.scaleFactorY = null;
        this.scaleFactorX = null;
        this.currentAspectRatio = null;
        this.originalAspectRatio = null;
        this.currentRatio = null;
        this.isMobile = false;
        this.gameStarted = false;
        this.isPortrait = false;
    };
};

let constant = new Constant();
export { constant as Constant };