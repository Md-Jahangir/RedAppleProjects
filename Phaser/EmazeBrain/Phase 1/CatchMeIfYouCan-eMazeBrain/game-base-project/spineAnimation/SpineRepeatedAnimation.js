import * as PIXI from "pixi.js"

export default class SpineRepeatedAnimation extends PIXI.Container {

  constructor (name, onComplete = null, onEnd = null) {
    super ();
    const spineData = PIXI.Loader.shared.resources[name].spineData
    this.animation = new PIXI.spine.Spine(spineData)
    this.parentComplete = onComplete
    this.parentEnd = onEnd
    this.animation.state.onComplete = this.onComplete.bind(this)
    this.addChild(this.animation)
  }

  start(animNames, repeats, timeScale = 1) {
    this.currentAnimationIndex = 0
    this.currentRepeatIndex = 0
    this.repeats = repeats
    this.animNames = animNames
    this.animation.state.timeScale = timeScale
    this.playNext()
  }

  playNext() {
    this.currentRepeatIndex ++
    this.animation.state.setAnimation(0, this.animNames[this.currentAnimationIndex], false);
  }

  stop() {
    if (this.animation) {
      this.animation.lastTime = null
      this.animation.state.clearTrack(0)
      this.animation.skeleton.setToSetupPose()
    }
  }

  onComplete() {
    if(this.currentRepeatIndex + 1 > this.repeats[this.currentAnimationIndex]) {
      this.currentRepeatIndex = 0
      if(this.currentAnimationIndex + 1 <= this.animNames.length - 1) {
        this.currentAnimationIndex ++
        if(this.parentComplete) {
          this.parentComplete()
        }
      } else {
        if(this.parentEnd) {
          this.parentEnd ()
        }
        return
      }
    }
    this.playNext()
  }

}