import Facade from "../../Facade";
import { Signals } from "@/Imports";
import Utils from "@base/utils/Utils";
import Sound from 'pixi-sound';

export default new class SoundsHandling {

  constructor () {
    Signals.correctAnswer.add(this.onCorrectAnswer, this)
    Signals.incorrectAnswer.add(this.onInCorrectAnswer, this)
    Signals.levelUp.add(this.onLevelUp, this)
    Signals.levelDown.add(this.onLevelDown, this)
    Signals.gameFinish.add(this.onGameFinish, this)
    // Signals.muteClick.add(this.onMuteClick, this)
    // Signals.musicClick.add(this.onMusicClick, this)
    // Signals.soundClick.add(this.onSoundClick, this)
    this.musicVolume = 1

    this.hasFocus = true
    this.defaultMute = 1
    this.isMuteSounds = true
    this.isMuteMusic = true
  }

  onCorrectAnswer() {
    let correct_arr = ["correct_1", "correct_2", "correct_3", "correct_4", "correct_5", "correct_6", "correct_7", "correct_8", "correct_9", "correct_10", "correct_11", "correct_12", "correct_13"]
    let correct_sound = correct_arr[Math.round(Math.random()*(correct_arr.length-1))]
    Facade.soundManager.play(correct_sound, 1, false, 'music')
  }

  onInCorrectAnswer() {
    let incorrect_arr = ["incorrect_1", "incorrect_2", "incorrect_3", "incorrect_4"]
    let incorrect_sound = incorrect_arr[Math.round(Math.random()*(incorrect_arr.length-1))]
    Facade.soundManager.play(incorrect_sound, 1, false, 'music')
  }

  onLevelUp() {
    Facade.soundManager.play("level_up", 1, false, 'music')
  }
  onLevelDown() {
    Facade.soundManager.play("level_down", 1, false, 'music')
  }
  onGameFinish() {
    Facade.soundManager.play("game_finish", 1, false, 'music')
  }

  onGameInited() {
    this.playMusic()
    this.isMute = false

    setInterval(() => this.checkBrowserOnFocus(), 1000)
  }

  playMusic() {
    Facade.soundManager.play(this.currentMusic, 1, true, 'music')
  }

  pauseBackMusic() {
    Facade.soundManager.pause(this.currentMusic)
  }

  resumeBackMusic() {
    Facade.soundManager.play (this.currentMusic, 1, true, 'music')
  }

  onSoundClick(value) {
    this.isMuteSounds = value == 1 ? true : false
    this.muteSounds(value)
  }

  muteSounds(value) {
    const group = Facade.soundManager.groups['default']
    this.defaultMute = value
    if(value) {
      group.volume = 1
    } else {
      group.volume = 0
    }
  }

  onMusicClick(value) {
    this.isMuteMusic = value == 1 ? true : false
    this.muteMusic(value)
  }

  muteMusic(value) {
    const group = Facade.soundManager.groups['music']
    if(value) {
      group.volume = 1
    } else {
      group.volume = 0
    }
  }

  onMuteClick(value) {
   this.onMusicClick(value)
   this.onSoundClick(value)

    Signals.setMuteButtons.dispatch(value)
  }

  checkBrowserOnFocus() {
    if (document.hasFocus ()) {
      if (! this.hasFocus) {
        if (this.isMuteSounds) {
          this.muteSounds (1)
        }
        if (this.isMuteMusic) {
          this.muteMusic (1)
        }
        this.hasFocus = true
      }
    } else {
      if (this.hasFocus) {
        this.muteSounds (0)
        this.muteMusic (0)
        this.hasFocus = false
      }
    }
  }

}