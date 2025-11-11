class Constant {
    /**
     * Create class instance and fill params from URL or fill it with default values if URL not contain needed data.
     * @constructs
     */
    constructor() {
        this.game = null;
        this.scaleFactor = null;
        this.scaleFactorX = null;
        this.scaleFactorY = null;
        this.isMobile = null;
        this.isPortrait = null;
        this.currentAspectRatio = null;
        this.originalAspectRatio = null;
        this.currentRatio = null;
        this.timeToEnd = null;
        this.gameTimer;
        this.gameTimerText = null;
        this.initialTime = 180;
        this.timeToEnd = 0;

        this.gameOptions = {
            rotationSpeed: 4,
            maxRotationSpeed: 10,
            rotationVariation: 2,
            changeTime: 2500,
            minAngle: 12,
            throwSpeed: 150,
        }
        this.playClicked = 0;
        this.gameStartTime = null;

        this.adApiKey = '07240c59-4bd2-47c0-b9c7-6c476a0e226f';
        this.adDivId = 'applixir-ad-container';

        //Game Analytics
        this.GAME_KEY = "1d6e73af471e767ad2c34c0d193e61fb";
        this.SECRET_KEY = "4b18eb56fbd4a6a28281f9e80fad4072f3297f18";
    };
};
let constant = new Constant();
export { constant as Constant };