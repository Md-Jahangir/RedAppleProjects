import * as PIXI from "pixi.js"
import SpineAnimation from "./SpineAnimation";

export default class WinAnimation extends PIXI.Container {

  constructor (animationsNames) {
    super ();
    this.animations = []
    for (let i = 0; i < animationsNames.length; i ++) {
      let anim = new SpineAnimation(animationsNames[i])
      anim.visible = false
      this.animations.push(anim)
      this.addChild(anim)
    }
  }

  start(symbolIndex, animName, loop = false, timeScale = 1) {
    this.current = this.animations[symbolIndex - 1]
    this.current.visible = true
    this.animations[symbolIndex - 1].start([animName], [loop], timeScale);
  }

  stop() {
    if (this.current) {
      this.current.visible = false
      this.current.stop()
    }
  }
}