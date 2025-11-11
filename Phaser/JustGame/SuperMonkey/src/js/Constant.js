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
        this.currentAspectRatio = null;
        this.originalAspectRatio = null;
        this.currentRatio = null;
        this.round = Math.round;
        this.timeToEnd = 0;
        this.mapNumber = null;
        this.gameStartTime = null;
        this.playClicked = null;
        this.score = null;

        this.gameOptions = {

            cloudTwoArraySpeed: 2,
            cloudOneArraySpeed: 3,
            bushThreeArraySpeed: 4,
            bushTwoArraySpeed: 4.5,
            bushOneArraySpeed: 4.8,
            frontBGLayerSpeed: 12,
            jumpVelMonkey: -770,
            jumpVelKong: -810,
            vaultVelMonkey: -900,
            vaultVelKong: -950,
            birdTweenDuration: 3500,
            bananaArrowYPos: -4.5,
            bananaRestYPos: 8.16,

        };

        this.gameOptionsMobile = {

            frontBGLayerSpeed: 5,
            bananaLayerSpeed: 10,
            jumpVelMonkey: -500,
            jumpVelKong: -690,
            vaultVelMonkey: -550,
            vaultVelKong: -770,
            birdTweenDuration: 2000,
            bananaArrowYPos: -2.4,
            bananaRestYPos: 12.05,

        };

        this.adApiKey = '50f00fbe-fd60-474d-baaa-8f17a78a176e';
        this.adDivId = 'applixir-ad-container';

        //Game Analytics
        this.GAME_KEY = "91e073f332b35834c63aa1756674892b";
        this.SECRET_KEY = "13406b47e01b1a729affbeb71ed715ab62864e68";
    };
};
let constant = new Constant();
export { constant as Constant };