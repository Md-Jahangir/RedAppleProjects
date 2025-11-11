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
        this.isPortrait = null;
        this.gameStarted = false;
        this.isIPad = false;
        this.isPaused = false;
        this.timeToEnd = null;
        this.gameStartTime = null;
        this.playClicked = null;
        this.score = 0;
    };
};

let constant = new Constant();
export { constant as Constant };