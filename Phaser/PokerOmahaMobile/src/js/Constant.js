/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 16-02-2024.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 09-08-2024
 * @Description :- Indicateds all the static variable.
 ************************************/

class Constant {
  constructor() {
    this.game = null;
    this.scaleFactor = null;
    this.isMobile = null;
    this.currentAspectRatio = null;
    this.originalAspectRatio = null;
    this.currentRatio = null;
    this.platformUrl = 'https://staginglocal.redappletech.com/poker-web/';
    this.gameCategory = null;
    this.isTournamentCompleted = false;
    this.POST_OR_GET_GAME_EVENTS = {
      LEAVE_TABLE: 'LEAVE_TABLE',
      PLAY_PAUSE: 'PLAY_PAUSE',
      PROGRESS: 'PROGRESS',
      SKIP: 'SKIP',
      FRAME_RATE: 'FRAME_RATE',
      FORWARD: 'FORWARD',
      BACKWARD: 'BACKWARD',
      REPLAY: 'REPLAY',
      STOP: 'STOP',
      REPLAY_END: 'REPLAY_END'
    };
    this.SetLanguage();
  };

  //#region - Set the static text 
  SetLanguage() {
    this.ERROR_MSG_TEXT = 'Sorry ! There are some value not found...';
    this.PLAY_TEXT = 'PLAY';
    this.FOLD_TEXT = 'Fold';
    this.CALL_TEXT = 'CALL';
    this.CHECK_TEXT = 'CHECK';
    this.RAISE_TEXT = 'RAISE';
    this.HALF_TEXT = 'HALF';
    this.MIN_TEXT = 'MIN';


    this.HALF_POT_TEXT = '1/2 POT';
    this.THREE_FOURTH_POT_TEXT = '3/4 POT';
    this.POT_TEXT = 'POT';
    this.ALL_IN_TEXT = 'ALL IN';
    this.VERSION_TEXT = '1.0.8';
    // this.GAME_TURN_TIME = null;
  };
  //#endregion

};
const constant = new Constant();
export { constant as Constant };