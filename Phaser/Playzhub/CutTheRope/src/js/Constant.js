class Constant {
    constructor() {
        this.isMobile = null;
        this.game = null;
        this.bulletSpeed = null;
        this.clientWidth = null;
        this.clientHeight = null;
        this.timeToEnd = null;
        this.score = 0;
        this.lifeTimescore = 0;
        this.activeScene = null;
        this.numberOfPlayButtonClicked = 0;
        this.gameStartedCount = null;
        this.starsData = [];
        this.gameOptions = null;
        this.adApiKey = 'eb384ed5-c76e-400e-85c1-3c82eaa91658';
        this.adDivId = 'applixir-ad-container';

        //Game Analytics
        this.GAME_KEY = "20f6a4a4d04c12622c54cc87e59a8385";
        this.SECRET_KEY = "ebf956fa5262a07352fa4e6b2a5030faa2a31370";
    }
}
let constant = new Constant;
export { constant as Constant }