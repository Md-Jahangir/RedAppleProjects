/* global  */

/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 05-03-2025.
 * @Last_Update_By :- Swarnav.
 * @Last_Updated_Date :- 05-03-2025
 * @Description :- Game audio.
 ************************************/

import { Constant } from '../Constant.js';
class AudioManager {

  constructor() {
    this.button = null;
    this.lvlFail = null;
    this.lvlComplt = null;
    this.cakeSelected = null;
    this.cakePlaced = null;
    this.confettiPop = null;
    this.lvlBg = null;
  }

  CreateAudio() {
    this.button = Constant.game.sound.add('button_click');
    this.lvlFail = Constant.game.sound.add('level_fail');
    this.lvlComplt = Constant.game.sound.add('level_up');
    this.cakeSelected = Constant.game.sound.add('cake_selelcted');
    this.cakePlaced = Constant.game.sound.add('cake_placed');
    this.confettiPop = Constant.game.sound.add('confetti_pop');
    this.lvlBg = Constant.game.sound.add('bg_audio');
    this.sparkleSFX = Constant.game.sound.add('sparkle');
  }

  PlayLevelMusic() {
    if (parseInt(localStorage.getItem('cake_sort')) === 1) {
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
    if (parseInt(localStorage.getItem('cake_sort')) === 1) this.lvlBg.resume();
  }

  // StopGameMusic() {
  //   this.gameplayBG.stop();
  //   this.gameplayBG.loop = false;
  // }

  PlayLvlCompleteAudio() {
    if (parseInt(localStorage.getItem('cake_sort')) === 1) this.lvlComplt.play();
  }

  PlayButtonPressAudio() {
    if (parseInt(localStorage.getItem('cake_sort')) === 1) this.button.play();
  }

  PlayLvlFailAudio() {
    if (parseInt(localStorage.getItem('cake_sort')) === 1) this.lvlFail.play();
  }

  PlayCakeSelectedAudio() {
    if (parseInt(localStorage.getItem('cake_sort')) === 1) this.cakeSelected.play();
  }

  PlayCakePalacedAudio() {
    if (parseInt(localStorage.getItem('cake_sort')) === 1) this.cakePlaced.play();
  }

  PlayConfettiAudio() {
    if (parseInt(localStorage.getItem('cake_sort')) === 1) this.confettiPop.play();
  }

  PlaySparkleAudio() {
    if (parseInt(localStorage.getItem('cake_sort')) === 1) this.sparkleSFX.play();
  }

}

const audiomanager = new AudioManager();
export { audiomanager as AudioManager };