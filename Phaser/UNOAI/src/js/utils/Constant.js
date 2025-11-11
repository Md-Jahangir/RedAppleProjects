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

    this.SetLanguage();

    this.player1Score = 10;
    this.player2Score = 20;
    this.player3Score = 30;
    this.player4Score = 40;

  };

  //#region - Set the static text 
  SetLanguage() {
    this.SELECT_NUMBER_OF_PLAYERS = 'PLEASE SELECT THE NUMBER OF PLAYERS !';
    this.HOW_TO_PLAY = 'HOW TO PLAY';
    this.HOW_TO_PLAY_MESSAGE = 'OBJECTIVE:\n' +
      'Be the first player to discard all your cards.\n\n' +
      'HOW TO PLAY:\n' +
      'Match a card from your hand by color or number with the top card' +
      'on the discard pile.\n' +
      'If you cant play, draw one card.If it’s playable, ' +
      'you can play it immediately.\n\n' +
      'SPECIAL CARDS:\n' +
      '+2 (Draw Two) → Next player draws 2 cards & skips turn.\n' +
      'Skip → Next player loses their turn.\n' +
      'Reverse → Changes the play direction.\n' +
      'Wild → Choose any color to continue.\n' +
      'Wild +4 → Choose a color & next player draws 4 cards.\n\n' +
      'UNO RULE:\n' +
      'When you have one card left, you must say "UNO!".\n' +
      'If you forget before the next turn starts, draw 2 cards!\n\n' +
      'WINNING:\n' +
      'The first player to discard all cards wins the round!';

    this.QUIT_HEADING = 'QUIT';
    this.DO_YOU_WANT_QUIT = 'Do you want to quit ?';
    this.GAME_OVER_HEADING = 'GAME OVER';
    this.PLAYER_1 = 'Player  1';
    this.PLAYER_2 = 'Player  2';
    this.PLAYER_3 = 'Player  3';
    this.PLAYER_4 = 'Player  4';

    this.VERSION_TEXT = '1.0.0';
  };
  //#endregion

};
const constant = new Constant();
export { constant as Constant };