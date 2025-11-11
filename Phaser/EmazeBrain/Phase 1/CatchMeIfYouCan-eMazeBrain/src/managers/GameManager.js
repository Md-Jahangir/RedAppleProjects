// import { UIManager } from "@/Imports"
import BaseManager from "@base/manager/BaseManager"
import BaseSoundManager from "@/managers/sound/BaseSoundManager";
import SoundsHandling from "@/managers/sound/SoundsHandling";

export default class GameManager extends BaseManager {

  constructor () {
    super()

    this.start()
  }

  start = () => {
    // this.uiManager = new UIManager()
  }
}