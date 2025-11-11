import * as PIXI from "pixi.js"
import * as PIXISpine from 'pixi-spine';
// import 'pixi-spine';

export default class SpineAnimation extends PIXI.Container {

  constructor (name, onComplete = null) {
    super ();
    const spineData = new PIXI.Loader.shared.resources[name].spineData
    this.animation = new PIXISpine.Spine(spineData)
    this.animation.state.onComplete = onComplete

    this.addChild(this.animation)
  }

  start(animNames, loops, timeScale = 1, animationStart = 0) {
    let loop = loops ? loops[0] : null
    let anim = this.animation.state.setAnimation(0, animNames[0], loop);
    anim.animationStart = animationStart;

    if(animNames.length > 1) {
      for (let i = 1; i < animNames.length; i ++) {
        loop = loops ? loops[i] : null
        this.animation.state.addAnimation(0, animNames[i], loop, 0);
      }
    }
    this.animation.state.timeScale = timeScale
  }

  stop() {
    if (this.animation) {
      this.animation.lastTime = null
      this.animation.state.clearTrack(0)
      this.animation.skeleton.setToSetupPose()
    }
  }
}
