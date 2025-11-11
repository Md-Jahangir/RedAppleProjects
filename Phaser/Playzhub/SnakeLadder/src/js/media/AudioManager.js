/* global console */

/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 05-03-2025.
 * @Last_Update_By :- Swarnav.
 * @Last_Updated_Date :- 24-07-2025
 * @Description :- Game audio.
 ************************************/

import { Constant } from '../Constant.js';
class AudioManager {

  constructor() {
    this.button = null;
    this.lvlFail = null;
    this.lvlComplt = null;
    this.ladderUp = null;
    this.snakeBite = null;
    this.footStep = null;
    this.lvlBg = null;
    this.coinCollect = null;
    this.diceRoll = null;
  }

  CreateAudio() {
    this.button = Constant.game.sound.add('click');
    this.lvlFail = Constant.game.sound.add('level_fail');
    this.lvlComplt = Constant.game.sound.add('level_comp');
    this.footStep = Constant.game.sound.add('footstep');
    this.coinCollect = Constant.game.sound.add('coin_collect');
    this.ladderUp = Constant.game.sound.add('ladder_up');
    this.lvlBg = Constant.game.sound.add('game_bg_snd');
    this.snakeBite = Constant.game.sound.add('hissing');
    this.diceRoll = Constant.game.sound.add('dice_roll');
  }

  PlayLevelMusic() {
    if (parseInt(localStorage.getItem('snl')) === 1) {

      this.lvlBg.play();
      this.lvlBg.loop = true;
    }

    else if (parseInt(localStorage.getItem('snl')) === NaN) {
      this.lvlBg.play();
      this.lvlBg.loop = true;
    }
  }

  StopLevelMusic() {
    this.lvlBg.stop();
    this.lvlBg.loop = false;
  }

  PauseGameMusic() {
    this.lvlBg.pause();
  }

  ResumeGameMusic() {
    if (parseInt(localStorage.getItem('snl')) === 1)
      if (this.lvlBg.isPaused)
        this.lvlBg.resume();
      else
        this.PlayLevelMusic();
  }

  PlayLvlCompleteAudio() {
    if (parseInt(localStorage.getItem('snl')) === 1) this.lvlComplt.play();
  }

  PlayButtonPressAudio() {
    if (parseInt(localStorage.getItem('snl')) === 1) this.button.play();
  }

  PlayLvlFailAudio() {
    if (parseInt(localStorage.getItem('snl')) === 1) this.lvlFail.play();
  }

  PlayFootStepAudio() {
    if (parseInt(localStorage.getItem('snl')) === 1) this.footStep.play();
  }

  PlayCoinCollectedAudio() {
    if (parseInt(localStorage.getItem('snl')) === 1) this.coinCollect.play();
  }

  PlayLadderUpAudio() {
    if (parseInt(localStorage.getItem('snl')) === 1) this.ladderUp.play();
  }

  PlaySnakeBiteAudio() {
    if (parseInt(localStorage.getItem('snl')) === 1) this.snakeBite.play();
  }

  PlayDiceRollAudio() {
    if (parseInt(localStorage.getItem('snl')) === 1) this.diceRoll.play();
  }

}

const audiomanager = new AudioManager();
export { audiomanager as AudioManager };