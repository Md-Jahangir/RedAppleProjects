class Constant {
    constructor() {
        this.game = null;
        this.scaleFactor = null;
        this.scaleFactorX = null;
        this.scaleFactorY = null;
        this.isMobile = null;
        this.currentAspectRatio = null;
        this.originalAspectRatio = null;
        this.currentRatio = null;
        this.round = Math.floor;
        this.bgTheme = null;
        this.category = null;
        this.countHint = 0;
        this.wordWaveCount = 1; // Number of waves of words
        // this.threeLetterWords = [];
        this.numberOfWordsForPlace = 10;
        //scores

        this.bonusScore = null;
        this.setTimeLimit = 500;
        this.wordTextDisplay = null;
        this.gameState = null;
        this.powerPlayTimeGap = null;

        this.isPowerPlay = null;
    }

}

const constant = new Constant();

export { constant as Constant };