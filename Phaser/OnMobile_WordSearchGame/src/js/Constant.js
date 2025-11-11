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
    this.offsetWidth = null;
    this.scaleFactor = null;
    this.scaleFactorX = null;
    this.scaleFactorY = null;
    this.isMobile = null;
    this.currentAspectRatio = null;
    this.originalAspectRatio = null;
    this.currentRatio = null;
    this.category = null;
    this.countHint = 0;
    this.scaleX = null;
    this.scaleY = null;
    this.numberOfWordsForPlace = 10;
    this.scale = null;
    this.bonusScore = null;
    this.setTimeLimit = 500;
    this.wordTextDisplay = null;
    this.gameState = null;
    this.timeToEnd = 0;
    this.timeBarWidth = null;
    this.gameStartTime = null;
    this.playClicked = null;
    this.currentScene = null;
    this.score = null;
    this.lastLevelPlayed = null;
    this.hintsUsed = null;
    this.isFirstLoading = 0;
    this.gridType = null;
    this.sLvlCount = null;
    this.hintCount = null;
    this.totalLevels = null;
    this.currentScene = null;

    this.adApiKey = 'e6dbd562-7c45-4d2a-9c60-1526a9396e71';
    this.adDivId = 'applixir-ad-container';

    //Game Analytics
    this.GAME_KEY = '67816eb085ccd36a96b7b9692c197f9e';
    this.SECRET_KEY = '4c2b2698d9e66a84501ff07015571453b52c181c';
  };

};

// };
const constant = new Constant();
export { constant as Constant };