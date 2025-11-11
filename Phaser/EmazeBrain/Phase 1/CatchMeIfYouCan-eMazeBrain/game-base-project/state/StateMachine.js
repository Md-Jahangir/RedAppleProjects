import Signals from "@base/signals/BaseSignals";

export default class StateMachine {

  constructor (model, stateEnum) {
    this.model = model
    this.currentState = null
    this.idsArr = []
    this.statesArr = []
    this.currentStateName = ''
    this.init(stateEnum)
  }

  init(stateEnum) {
    this.statesEnum = stateEnum
  }

  addState (StatesEnum, id) {
    let stateId = this.getStateId(id)
    if (this.idsArr.indexOf(stateId) !== -1) {
      throw new Error('State already defined: ' + stateId)
    }
    this.idsArr[id] = stateId
    this.statesArr[id] = new StatesEnum(this, id, this.model)
  }

  getStateId (id) {
    for (let name in this.statesEnum) {
      if (id === this.statesEnum[name]) {
        return name
      }
    }
  }

  setState (id) {
    if (this.currentState) {
      this.currentState.cleanUp()
    }
    this.currentState = this.statesArr[id]
    if (this.currentState.dispatchStateChange) {
      this.currentStateName = this.idsArr[id]
      this.stateChanged(this.idsArr[id], this.model)
    }
    this.currentState.begin()
  }

  stateChanged(id, model) {

    model.currentState = this.currentStateName
  }

}
