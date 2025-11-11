import BaseContainer from "./BaseContainer"
import SymbolsContainer from "@/src/containers/SymbolsContainer";

export default class BaseAnimationsContainerWithSeparateAnimations extends BaseContainer {

  constructor(data) {
    super(data)
    this.animations = []
    this.reelsDataOrigin = null
  }

  init(data) {
    this.symbols = SymbolsContainer.instance.allSymbols
    for (let i = 0; i < this.TOTAL_REELS; i ++) {
      this.animations.push ([])
      for (let j = 0; j < this.VISIBLED_SYMBOLS[i]; j ++) {
        let anim = this.createAnimation(data)
          anim.visible = false
          this.animations[i].push(anim)
        anim.x = this.symbols[i][j + 1].x + this.SYMBOL_HEIGHT[i] / 2
        anim.y = this.symbols[i][j + 1].y + this.SYMBOL_HEIGHT[i] / 2
        this.addChild (anim)
      }
    }
  }

  onStartAllAnimations (totalList) {
    for (let i = 0; i < totalList.length; i ++) {
      let data = totalList[ i ]
      for (let j = 0; j < data.length; j ++) {
        const path = data[ j ].path
        this.startAnimation (path)
      }
    }
  }

  startSingleAnimation(data) {
    this.stopAll()
    const path = data.path
    this.startAnimation(path)
  }

  startAnimation (path) {
    for (let i = 0; i < path.length; i ++) {
      let p = path[i]
      let s = this.animations[p[0]][p[1]]
      let symbol = this.reelsDataOrigin[p[0]][p[1]]
      let animName = this.animationName
      s.visible = true
      s.start([animName], [true], 0.7)
    }
  }

  stopAll ()  {
    for (let i = 0; i < this.TOTAL_REELS; i ++) {
      for (let j = 0; j < this.VISIBLED_SYMBOLS[i]; j ++) {
        this.animations[ i ][ j ].stop ()
        this.animations[ i ][ j ].visible = false
      }
    }
  }

  createAnimation(data) {

  }


}
