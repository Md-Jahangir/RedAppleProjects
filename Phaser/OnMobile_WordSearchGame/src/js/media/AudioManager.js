/* global console */

/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 21-11-2024.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 22-11-2024
 * @Description :- Game audio.
 ************************************/

import { Constant } from '../Constant.js';
class AudioManager {

  constructor() {
    this.button = null;
    this.gameBtn = null;
    this.coinAnim = null;
    this.gameOver = null;
    this.subLvlComplt = null;
    this.matched = null;
    this.incorrect = null;
    this.lvlComplt = null;
    this.alertFinal = null;
    this.lvlBg = null;
    this.gameplayBG = null;
    this.playBtnPop = null;
  }

  CreateAudio() {
    this.button = Constant.game.sound.add('button_click');
    this.gameBtn = Constant.game.sound.add('game_btns');
    this.coinAnim = Constant.game.sound.add('coin_anim');
    this.gameOver = Constant.game.sound.add('gameover_popup');
    this.subLvlComplt = Constant.game.sound.add('sublvl_complete');
    this.matched = Constant.game.sound.add('matched');
    this.incorrect = Constant.game.sound.add('incorrect');
    this.lvlComplt = Constant.game.sound.add('lvl_complete');
    this.alertFinal = Constant.game.sound.add('alert_final');
    this.playBtnPop = Constant.game.sound.add('playbtn_pop');
    this.lvlBg = Constant.game.sound.add('bg_audio');
    this.gameplayBG = Constant.game.sound.add('gameplay_bg');
  }

  PlayLevelMusic() {
    if (parseInt(localStorage.getItem('word_search')) === 1) {
      this.lvlBg.play();
      this.lvlBg.loop = true;
    }
  }

  StopLevelMusic() {
    this.lvlBg.stop();
    this.lvlBg.loop = false;
  }

  PlayGameMusic() {
    if (parseInt(localStorage.getItem('word_search')) === 1) {
      this.gameplayBG.play();
      this.gameplayBG.loop = true;
    }
  }

  PauseGameMusic() {
    this.gameplayBG.pause();
  }

  ResumeGameMusic() {
    if (parseInt(localStorage.getItem('word_search')) === 1) this.gameplayBG.resume();
  }

  StopGameMusic() {
    this.gameplayBG.stop();
    this.gameplayBG.loop = false;
  }

  PlayPlayBtnPop() {
    if (parseInt(localStorage.getItem('word_search')) === 1) this.playBtnPop.play();
  }

  PlayCoinAnimAudio() {
    if (parseInt(localStorage.getItem('word_search')) === 1) this.coinAnim.play();
  }

  PlayFinalAlertPopupAudio() {
    if (parseInt(localStorage.getItem('word_search')) === 1) {
      if (this.alertFinal) {
        this.alertFinal.play();
        this.alertFinal.loop = true;
        this.alertFinal.setVolume(1); // Start at full volume

        // Fade-out settings
        const fadeOutDuration = 40000; // Total fade-out duration in ms (40 seconds)
        const updateInterval = 1000; // Adjust volume every 1000ms
        const steps = fadeOutDuration / updateInterval; // Number of adjustments
        const volumeDecrement = 1 / steps; // Volume reduction per step

        let currentVolume = 1;

        const fadeOut = setInterval(() => {
          currentVolume -= volumeDecrement;

          if (currentVolume <= 0) {
            currentVolume = 0; // Ensure volume does not go negative
            this.alertFinal.setVolume(currentVolume); // Set final volume to 0
            this.alertFinal.loop = false;
            this.alertFinal.stop(); // Stop the audio completely
            clearInterval(fadeOut); // Stop the interval
          } else {
            this.alertFinal.setVolume(currentVolume); // Apply reduced volume
            // console.log(`Volume: ${currentVolume.toFixed(2)}`); // Debug log for verification
          }
        }, updateInterval);
      } else {
        console.error('Audio object \'alertFinal\' not initialized!');
      }
    }
  }

  PlayLvlCompleteAudio() {
    if (parseInt(localStorage.getItem('word_search')) === 1) this.lvlComplt.play();
  }

  PlayButtonPressAudio() {
    if (parseInt(localStorage.getItem('word_search')) === 1) this.button.play();
  }

  PlayGameButtonPressAudio() {
    if (parseInt(localStorage.getItem('word_search')) === 1) this.gameBtn.play();
  }

  PlaySubLvlCompleteAudio() {
    if (parseInt(localStorage.getItem('word_search')) === 1) this.subLvlComplt.play();
  }

  PlayWordMatchedAudio() {
    if (parseInt(localStorage.getItem('word_search')) === 1) this.matched.play();
  }

  PlayIncorrectMatchedAudio() {
    if (parseInt(localStorage.getItem('word_search')) === 1) this.incorrect.play();
  }

  PlayGameOverAudio() {
    if (parseInt(localStorage.getItem('word_search')) === 1) this.gameOver.play();
  }

}

const audiomanager = new AudioManager();
export { audiomanager as AudioManager };