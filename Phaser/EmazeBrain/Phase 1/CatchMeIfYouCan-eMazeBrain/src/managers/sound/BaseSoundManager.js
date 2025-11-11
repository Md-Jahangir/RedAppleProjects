import Sound from 'pixi-sound';
import BaseManager from "@base/manager/BaseManager";
import SoundGroup from "./SoundGroup";
import Facade from "@/Facade";

export default new class BaseSoundManager extends BaseManager {

  constructor () {
    super ()
    Facade.soundManager = this
    this.isMuted = false

    this.sound = null;
    this._groups = {};

    this._getSound ();
    this.addNewSoundGroup ('default');
  }

  /**
   * Получить текущий звуковой файл
   * @private
   */
  _getSound () {
    this.sound = Sound;
  }

  /**
   * Воспроизвести звук по имени
   * @param alias имя звука
   * @param volume
   * @param loop
   * @param groupName
   */
  play ( alias, volume = 1, loop = false, groupName = 'default' , callback = null) {
    if(this.isMuted) {
      return
    }
    let sound = this.getSound (alias);
    if (sound) {
      let instance = sound.play ({ loop: loop, volume: volume, complete: callback });
      this.addSoundToGroup (sound, alias, groupName);
      return instance;
    }
  }

  /**
   * Остановить звук по имени
   * @param alias имя звука
   */
  stop ( alias ) {
    let sound = this.getSound (alias);
    if (sound) {
      let instance = sound.stop ();
      return instance;
    }
  }

  muteAll() {
    this.isMuted = true
    Sound.muteAll()
  }

  unmuteAll() {
    this.isMuted = false
    Sound.unmuteAll()
  }

  /**
   *
   * @param alias
   */
  pause ( alias ) {
    let sound = this.getSound (alias);
    if (sound.isPlaying) {
      this.sound.pause (alias);
    }
  }

  /**
   *
   * @param alias
   */
  resume ( alias ) {
    let sound = this.getSound (alias);
    if (sound && ! sound.isPlaying) {
      this.sound.resume (alias);
    }
  }

  /**
   *
   * @param groupName
   * @param value
   */
  muteGroup ( groupName, value ) {
    let group = this._groups[ groupName ];
    if (group) {
      if (value === undefined) {
        group.switchMuted ();
      } else {
        group.muted = value;
      }
    }
  }

  /**
   *
   * @param alias
   * @returns {*}
   */
  getSound ( alias ) {
    return this.sound.find (alias);
  }

  /**
   *
   * @param groupName
   */
  addNewSoundGroup ( groupName ) {
    if (! this.groups.hasOwnProperty (groupName)) {
      this._groups[ groupName ] = new SoundGroup (groupName);
    }
  }

  /**
   *
   * @param sound
   * @param alias
   * @param groupName
   */
  addSoundToGroup ( sound, alias, groupName ) {
    this.addNewSoundGroup (groupName);
    this.groups[ groupName ].addSound (sound, alias);
  }

  /**
   *
   * @returns {*}
   */
  get groups () {
    return this._groups;
  }
}