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
        this.score = null;
        this.timeToEnd = null;
        this.clientWidth = null;
        this.clientHeight = null;
        this.gameStartTime = null;
        this.playClicked = null;
        this.activeScene = null;

        this.adApiKey = '2ac044c7-8c2e-4a4c-8c19-d9da0a51fe0f';
        this.adDivId = 'applixir-ad-container';

        //Game Analytics
        this.GAME_KEY = "18a6bda7a2bc938aaebe02809342c735";
        this.SECRET_KEY = "40b0e5e13ae0e5bbdac886831a48b899239f7608";
    }
}
let constant = new Constant();

export { constant as Constant }