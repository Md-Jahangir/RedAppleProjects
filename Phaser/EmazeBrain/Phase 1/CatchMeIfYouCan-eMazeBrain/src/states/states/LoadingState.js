import GameStatesEnum from '../GameStatesEnum'
import BaseState from '@base/state/BaseState'
import { Signals} from "@/Imports";

export default class LoadingState extends BaseState {

  begin() {
    Signals.continueBtnClick.add(this.onContinueBtnClick, this)
    Signals.loadAssets.dispatch()
  }

  onContinueBtnClick() {
    this.end()
  }

  end = () => {
    let gameState = GameStatesEnum.IDLE
    if(this.model.freespins && this.model.freespins.amount_left > 0) {
      this.model.isFreespinsMode = true
      this.isAuto = true
    }
    this.stateMachine.setState(gameState)

    Signals.gameInited.dispatch()
  }

  cleanUp() {
  }

}
