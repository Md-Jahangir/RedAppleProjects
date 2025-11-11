/********* Script_Details ************
 * @Original_Creator :- Amit Kumar.
 * @Created_Date :- 24-10-2024.
 * @Last_Update_By :- Amit Kumar.
 * @Last_Updatd_Date :- 24-10-2024
 * @Description :-Sound Manager.
 ************************************/

/* global */
import { Constant } from './Constant';

export default class SoundManager {
  constructor() {
    this.backgroundMusic = null;
    this.buttonClickSound = null;
    this.coinCollectSound = null;
    this.gameStartSound = null;
    this.startWhistleSound = null;
    this.gameOverPopupSound = null;

    this.isMute = null;
  }
  create() {
    this.backgroundMusic = Constant.game.sound.add('backgroundMusic');
    this.buttonClickSound = Constant.game.sound.add('buttonClickSound');
    this.coinCollectSound = Constant.game.sound.add('coinCollectSound');
    this.gameStartSound = Constant.game.sound.add('gameStartWooshEffect');
    this.startWhistleSound = Constant.game.sound.add('whistlesound');
    this.gameOverPopupSound = Constant.game.sound.add('gameOverSound');
  }

  SoundOnAndOff() {
    if (!this.isMute) {
      this.isMute = true;
      this.StopBackgroundMusic();
    } else {
      this.isMute = false;
      this.PlayBackgroundMusic();
    }
  }

  OnPlayerExit() {
    this.isMute = true;
  }

  PlayBackgroundMusic() {
    if (!this.isMute) {
      this.backgroundMusic.play();
      this.backgroundMusic.loop = true;
      this.backgroundMusic.volume = 0.7;
      this.gameStartSound.volume = 0.5;
    }
  }
  StopBackgroundMusic() {
    this.gameStartSound.volume = 0;
    this.backgroundMusic.stop();
  }

  PlayButtonClickSound() {
    if (!this.isMute) {
      this.buttonClickSound.play();
      this.buttonClickSound.volume = 0.6;
    }
  }

  PlayCoinCollectSound() {
    if (!this.isMute) {
      this.coinCollectSound.play();
    }
  }

  PlayGameStartSound() {
    if (!this.isMute) {
      this.gameStartSound.play();
      this.gameStartSound.volume = 0.5;
    }
  }

  PlayGameOverPopupSound() {
    if (!this.isMute) this.gameOverPopupSound.play();
  }

  PlayStartWhistleSound() {
    if (!this.isMute) this.startWhistleSound.play();
  }
}
const soundManager = new SoundManager();
export { soundManager as SoundManager };