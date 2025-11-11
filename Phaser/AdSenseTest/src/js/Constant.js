class Constant {
    /**
     * Create class instance and fill params from URL or fill it with default values if URL not contain needed data.
     * @constructs
     */
    constructor() {
        this.game = null;
        this.scaleFactor = null;
        this.isMobile = null;
        this.currentAspectRatio = null;
        this.originalAspectRatio = null;
        this.currentRatio = null;
        this.timeToEnd = null;
        this.activeScene = null;
        this.gameStartTime = null;
        this.playClicked = null;
        this.score = 0;

        this.gameOptions = {
            rotationSpeed: 3,
            maxRotationSpeed: 10,
            rotationVariation: 2,
            changeTime: 2500,
            minAngle: 12,
            throwSpeed: 150,
        }

        this.adApiKey = '1abf755b-44ac-4115-a0a5-636b7f36b7eb';
        this.adDivId = 'applixir-ad-container';
    };
};
let constant = new Constant();
export { constant as Constant };