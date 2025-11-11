import StateMachineImported from '@/states/GameStateMachine'
import SignalsImported from '@/signals/GameSignals'
import RequestsImported from '@/managers/comunication/specific/GCRequests'

const GameStateMachine = StateMachineImported
const Signals = SignalsImported
const Requests = RequestsImported

export { GameStateMachine, Signals, Requests }
