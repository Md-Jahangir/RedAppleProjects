import BaseContainer from "./BaseContainer"
import SymbolsContainer from "./BaseSymbolsContainer";
import Config from "@/config/Config";
import Facade from "@/Facade";

export default class BaseAnimationsContainer extends BaseContainer {

  constructor() {
    super()
    this.lowAnimations = []
    this.highnimations = []
    this.reelsDataOrigin = null
    this.interactive = false
    this.interactiveChildren = false
  }

  init() {
    this.symbols = SymbolsContainer.instance.allSymbols
    for (let i = 0; i < this.TOTAL_REELS; i ++) {
      this.lowAnimations.push ([])
      this.highnimations.push ([])
      for (let j = 0; j < this.VISIBLED_SYMBOLS[i]; j ++) {
        this.createAnimation(i, j, 'lows', this.lowAnimations)
        this.createAnimation(i, j, 'highs', this.highnimations)
      }
    }
  }

  onStartAllAnimations (totalList) {
    for (let i = 0; i < totalList.length; i ++) {
      let data = totalList[ i ]
      for (let j = 0; j < data.length; j ++) {
        const path = data[j].payline.line
        this.startAnimation (path, data[j].payout)
      }
    }
  }

  checkForSpine(index) {
    return Config.symbolsSpines[index]
  }

  startSingleAnimation(data) {
    this.stopAll()
    const path = data.payline.line
    let arr = this.lowAnimations
    this.startAnimation(path, data.payout, arr)
  }

  startAnimation (path, payout) {
    for (let i = 0; i < payout.length; i ++) {
      let p = path[i]
      let symbol = Facade.model.reelsDataOrigin[p[0]][p[1]]
      let animName = Config.symbolAnimationNames[symbol]
      let arr = this.checkForSpine(symbol) == 'lows' ? this.lowAnimations : this.highnimations
      let s = arr[p[0]][p[1]]
      s.visible = true
      s.start([animName], [true], 0.7)
    }
  }

  stopAll ()  {
    for (let i = 0; i < this.TOTAL_REELS; i ++) {
      for (let j = 0; j < this.VISIBLED_SYMBOLS[i]; j ++) {
        this.lowAnimations[ i ][ j ].stop ()
        this.highnimations[ i ][ j ].stop ()
        this.lowAnimations[ i ][ j ].visible = false
        this.highnimations[ i ][ j ].visible = false
      }
    }
  }

  createAnimation(i, j, name, arr) {
    const animLows = this.createSpineAnimation(name)
    animLows.interactive = false
    animLows.visible = false
    arr[i].push(animLows)
    animLows.x = this.symbols[i][j + 1].x
    animLows.y = this.symbols[i][j + 1].y
    this.addChild (animLows)
  }

  createSpineAnimation(name) {
    //for overriding
  }

}
