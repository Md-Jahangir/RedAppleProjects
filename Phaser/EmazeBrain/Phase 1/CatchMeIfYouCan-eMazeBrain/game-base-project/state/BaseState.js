export default class BaseState {

	constructor(stateMachine, id, model = null) {
		this.stateMachine = stateMachine;
		this.model = model
		this.id = id;
		this.dispatchStateChange = true;
	}

  begin() {
    throw error('Method enter() must be implemented')
	}

  end = () => {
		throw error('Method exit() must be implemented')
	}

	cleanUp() {}
}