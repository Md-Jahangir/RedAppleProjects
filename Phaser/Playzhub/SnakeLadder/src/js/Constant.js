class Constant {
    /**
     * Create class instance and fill params from URL or fill it with default values if URL not contain needed data.
     * @constructs
     */
    constructor() {
        this.game = null;
        this.clientHeight = null;
        this.clientWidth = null;
        this.offsetWidth = null;
        this.newScale = null;
        this.scaleFactor = null;
        this.scaleFactorX = null;
        this.scaleFactorY = null;
        this.isMobile = null;
        this.currentAspectRatio = null;
        this.originalAspectRatio = null;
        this.currentRatio = null;
        this.playClicked = null;
        this.round = Math.round;
        this.gameStarted = null;
        this.skipClickCount = null;
        this.gameScore = null;
        this.gameStartTime = null;
        this.backButPosX = null;
        this.backButPosY = null;
        this.rulesButPosX = null;
        this.rulesButPosY = null;
        this.skipButPosX = null;
        this.skipButPosY = null;
        this.getSoundTexture = null;

        this.gameData = null;

        this.updateTurnData = null;
        this.gameOverData = null;
        this.currentScene = null;
        this.getLevel = null;
        this.gemsCollCount = 0;
        this.canShowRules = true;

        //Game Analytics
        this.GAME_KEY = "44610227d1c16e1cb527e489bc858fd8";
        this.SECRET_KEY = "4a2fc006b07c39d117eaedbd6fc5f83d56c4ce5d";

    };


};
let constant = new Constant();
export { constant as Constant };