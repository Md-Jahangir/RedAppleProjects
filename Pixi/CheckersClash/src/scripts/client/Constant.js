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
        this.gameType = null;
        //scores
        this.bonusScore = null;
        this.gameScore = 0;
        this.gameState = null;
        this.timeToEnd = 0;
        this.currentScreen = null;
        this.iconWidth = 83;
        this.setLevel = null;
        this.currUndoCount = 5;
        this.showTutPages = null;
        this.gameStartTime = null;
        this.movesCount = null;
        this.uiAtlas = null;
        this.unlockedBotLevel = null;
        this.userFallbackFrame = null;
        this.oppoFallbackFrame = null;
        this.botUserName = null;
        this.pfpAtlas = null;
        this.gameAtlas = null;
        this.lifetimeScore = null;
        this.hintLeft = null;
        this.currBotLvl = null;
        this.modeOneArr = [0, 0, 0];
        this.modeTwoArr = [0, 0, 0];
        this.modeThreeArr = [0, 0, 0];
        this.GAME_KEY = "04946c5362ad9bc0bf4fd8289ee7300a";
        this.SECRET_KEY = "5df7ed839264378990e55fcc3febfdaa02991d16";
        // this.SetTextureNames();
    };
};
const constant = new Constant();
export { constant as Constant };