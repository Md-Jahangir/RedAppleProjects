import BaseState from '@base/state/BaseState'
import { Signals} from "@/Imports";
import GameStatesEnum from "../GameStatesEnum";

export default class IdleState extends BaseState {

  begin() {
    this.model.isFreespinsStarted = false;
    this.model.stateSkippedWinnings = false;
    if(this.model.stateSkipped && !this.model.isFreespinsMode) {
      this.model.stateSkipped = false
      this.end()
      return
    }
    if(this.model.isAuto || this.model.isFreespinsMode) {
      this.end()
    } else {
      if(!this.model.isFreespinsMode) {
        Signals.spinBtnPressed.addOnce (this.end, this)
      }
    }
  }



  end = () => {
    let gameState = GameStatesEnum.PRE_SPIN_START
    this.stateMachine.setState(gameState);
  }

  cleanUp() {
    if(!this.model.isFreespinsMode) {
      Signals.spinBtnPressed.remove (this.end, this)
    }
  }
}
