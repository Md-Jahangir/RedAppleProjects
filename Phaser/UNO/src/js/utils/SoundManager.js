/* global localStorage */
import { Constant } from './Constant.js';

class SoundManager {
  constructor() {
    this.bgMusic = null;
    this.buttonClickSound = null;
    this.obstacleCollideSound = null;
    this.knifeAttachSound = null;
  }

  CreateSound() {
    this.bgMusic = Constant.game.sound.add('bg_music');
    this.buttonClickSound = Constant.game.sound.add('button_click_sound');
  }

  PlayBgMusic() {
    if (localStorage.getItem('texas_poker_is_music_on') === null) {
      localStorage.setItem('texas_poker_is_music_on', '1');
    }
    if (localStorage.getItem('texas_poker_is_music_on') === '1') {
      this.bgMusic.stop();
      this.bgMusic.play();
      this.bgMusic.loop = true;
      this.bgMusic.volume = 0.5;
    }
  }

  StopBgMusic() {
    this.bgMusic.stop();
  }

  PlayButtonClickSound() {
    if (localStorage.getItem('texas_poker_is_sound_on') === null) {
      localStorage.setItem('texas_poker_is_sound_on', '1');
    }
    if (localStorage.getItem('texas_poker_is_sound_on') === '1') {
      this.buttonClickSound.play();
    }
  }
}

const sound = new SoundManager();
export { sound as SoundManager };
