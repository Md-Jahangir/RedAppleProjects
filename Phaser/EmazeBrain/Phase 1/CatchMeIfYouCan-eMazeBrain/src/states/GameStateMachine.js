import StateMachine from "@base/state/StateMachine";
import { Signals } from "@/Imports";

import InitState from './states/InitState'
import LoadingState from "@/states/states/LoadingState";
import IdleState from './states/IdleState'


export default class GameStateMachine extends StateMachine {
  constructor (model, stateEnum) {
    super(model, stateEnum)
  }

  init(gameStatesEnum) {
    super.init(gameStatesEnum)
    this.addState(InitState, this.statesEnum.INIT)
    this.addState(LoadingState, this.statesEnum.LOADING)
    this.addState(IdleState, this.statesEnum.IDLE)
  }

  stateChanged(id, model) {
    super.stateChanged(id, model)
    Signals.stateChanged.dispatch(id, model)
  }
}
