/********* Script_Details ************
 * @Original_Creator :-Amit Kumar.
 * @Created_Date :- 23-10-2024.
 * @Last_Update_By :- Amit Kumar.
 * @Last_Updatd_Date :- 23-10-2024
 * @Description :- Indicateds all the static variable.
 ************************************/

class Constant {

  constructor() {
    this.game = null;
    this.isMobile = null;
    this.DESIGNWIDTH = 1080;
    this.DESIGNHEIGHT = 1920;
    this.NUMBEROFCOINS = 5;
    this.GAMESTART_TIME = 4000;
    this.gameID = null;
    this.maxTime = 60000.0000;
    this.minX = 150;
    this.maxX = 900;
    this.minY = 800;
    this.maxY = 1750;
    this.isFree = null;
    this.gameCoordinates = null;

    this.userData = null;
    this.opponentData = null;
  }

  //#region -GetNewScale
  GetNewScale(_currentWidth, _currentHeight, _designWidth, _designHeight) {
    const scaleX = _currentWidth / _designWidth;
    const scaleY = _currentHeight / _designHeight;
    return scaleX > scaleY ? scaleY : scaleX;
  }
  //#endregion
}
const constant = new Constant();
export { constant as Constant };