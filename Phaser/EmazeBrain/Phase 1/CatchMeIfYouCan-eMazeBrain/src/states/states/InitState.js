import GameStatesEnum from '../GameStatesEnum'
import BaseState from '@base/state/BaseState'
import { Signals} from "@/Imports";

export default class InitState extends BaseState {

  begin() {
    Signals.initGame.addOnce(this.onInitGame, this)
    // Signals.gameMessage.dispatch('init')
    Signals.initGame.dispatch()
  }

  onInitGame(data) {
    this.model.initRawData = data
    let gameState = GameStatesEnum.LOADING
    this.stateMachine.setState(gameState)
  }

  cleanUp() {
    Signals.initGame.remove(this.onInitGame, this)
  }

}
