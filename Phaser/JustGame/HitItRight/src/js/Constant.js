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

        //Game Analytics
        this.GAME_KEY = "4d45e9d795b00da1eede9393ea3a28c4";
        this.SECRET_KEY = "644848dfcc3c33f017d2566d653ee6dc75c2f2b7";
    };
};
let constant = new Constant();
export { constant as Constant };