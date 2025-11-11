/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 19-09-2024.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 01-10-2024.
 * @Description :- Indicateds all the static variable.
 ************************************/

class Constant {
  constructor() {
    this.game = null;
    this.clientHeight = null;
    this.clientWidth = null;
    this.newScale = null;
    this.scaleFactor = null;
    this.scaleFactorX = null;
    this.scaleFactorY = null;
    this.gameContScaleFactor = null;
    this.isMobile = null;
    this.currentAspectRatio = null;
    this.originalAspectRatio = null;
    this.currentRatio = null;
    this.category = null;
    this.countHint = 0;
    this.scaleX = null;
    this.scaleY = null;
    this.scale = null;
    //scores
    this.bonusScore = null;
    this.gameScore = 0;
    this.gameState = null;
    this.timeToEnd = 0;
    this.currentScene = null;
    this.iconWidth = 83;
    this.setLevel = null;
    this.currUndoCount = 5;
    this.showTutPages = null;
    this.gameStartTime = null;
    this.movesCount = null;

    // this.adGameId = 9451;
    // this.adZoneId = 2050;
    // this.adAccountId = 8837;
    // this.adInjectectionDivId = 'applixir-ad-container';

    this.adApiKey = '7cfc5e86-366e-4858-924e-76c129cab7bb';
    this.adDivId = 'applixir-ad-container';

    //Game Analytics
    this.GAME_KEY = '8fb29c14f8d1de091a99f5809ed2fc9c';
    this.SECRET_KEY = 'ed576d7af4691805aced84e167ac07abb40b3269';
  };

};
const constant = new Constant();
export { constant as Constant };