import BaseContainer from "@base/container/BaseContainer";
import * as PIXI from "pixi.js";
import { Signals} from "@/Imports";
import Facade from "../Facade";
import ScaleManager from "@/stage/ScaleManager";
import LocalizedPIXIText from "@base/text/LocalizedPIXIText";

export default class PreloaderContainer extends BaseContainer {

  constructor (data) {
    super(data)
    this.init()

  }

  init() {
    this.background = new PIXI.Sprite(PIXI.Texture.from('preloaderBackground'))
    this.background.anchor.set(0.5)
    this.background.interactive = true
    this.background.alpha = 0
    this.addChild(this.background)

    this.barBack = new PIXI.Sprite(PIXI.Texture.from('preloaderBarBack'))
    this.addChild(this.barBack)
    this.barFull = new PIXI.Sprite(PIXI.Texture.from('preloaderBarFull'))
    this.barFull.x = 20
    this.barBack.addChild(this.barFull)
    this.barMask = this.drawMask(0, 0, this.barFull.width, this.barFull.height)
    this.barFull.addChild(this.barMask)
    this.barFull.mask = this.barMask

    this.percentageText = new LocalizedPIXIText('0%', Facade.textFactory.getStyle('preloadPercentage'))
    this.addChild(this.percentageText)

    this.percentageText.x -= 40
    this.percentageText.y += 40

    this.addMainGraphics();
    window.dispatchEvent(new Event('resize'))
  }

  addMainGraphics() {

    Signals.loadingProgress.add(this.onPreloaderProgress, this)
    this.onOrientationChanged(Facade.orientation)
  }


  onPreloaderProgress = (progress) =>{
    this.progress = progress
    this.percentageText.text = Number(progress).toFixed(0) + " %"
    this.barMask.x = this.barFull.width * (progress/100 - 1)
  }

  onOrientationChanged(orientationSymbol) {
    switch (orientationSymbol) {
      case 'Hd':
      case 'Hm':
        break

      case 'Vm':
        break
    }
    this.background.position.set(ScaleManager.center.x, ScaleManager.center.y)
    this.percentageText.position.set(ScaleManager.center.x - this.percentageText.width / 2, ScaleManager.center.y - this.percentageText.height / 2)
    this.barBack.position.set(ScaleManager.center.x - this.barBack.width / 2, ScaleManager.center.y + 250)
  }

  drawMask(x, y, w, h) {
    let mask = new PIXI.Graphics()
    mask.beginFill(0x0FF000)
    mask.drawRect(x, y, w, h)
    mask.endFill()
    return mask
  }

  destroy(options) {
    super.destroy(options)

    clearInterval(this.interval)
  }

}