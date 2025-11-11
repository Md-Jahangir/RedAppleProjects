import BaseContainer from "@base/container/BaseContainer";
import * as PIXI from "pixi.js";
import ScaleManager from "@/stage/ScaleManager";
import Facade from "@/Facade";

export default class BackgroundContainer extends BaseContainer {

  constructor(data) {
    super(data)
    this.init()
  }

  init(data) {
    let backBase = (Facade.model.color_scheme == "cold") ? "backBaseCold" : "backBaseWarm"
    this.background = new PIXI.Sprite(PIXI.Texture.from(backBase))
    this.background.anchor.set(0.5)
    this.addChild(this.background)

    // this.interactive = true
    // this.on('pointerdown', (e) => {
    //   GameSignals.backgroundTap.dispatch()
    // })

    this.onOrientationChanged(Facade.orientation)
  }

  onOrientationChanged(orientationSymbol) {
    switch (orientationSymbol) {
      case 'Hd':
      case 'Hm':
        break

      case 'Vm':
        break
    }
    this.position.set(ScaleManager.center.x, ScaleManager.center.y)
  }

}
