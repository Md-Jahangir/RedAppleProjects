import * as signals from "signals";
import { Signals } from "@/Imports";

export default {
  sendAPI: new signals.Signal (),
//
  tokenAuthAPI : new signals.Signal (),
  gameDataAPI : new signals.Signal (),
  imageDataAPI : new signals.Signal (),
  allDataReceived : new signals.Signal (),
//
  realityCheck: new signals.Signal (),
  gameStarted: new signals.Signal (),
  gameInited: new signals.Signal (),
  loadAssets: new signals.Signal (),
  loadingProgress: new signals.Signal (),
  textAssetsLoadingComplete: new signals.Signal (),
  preloaderAssetsLoadingComplete: new signals.Signal (),
  mainGameAssetsLoadingComplete: new signals.Signal (),
  continueBtnClick: new signals.Signal (),
  modelInitStored: new signals.Signal (),
  gameMessage: new signals.Signal (),
  backendMessage: new signals.Signal (),
  stateChanged: new signals.Signal (),
  initGame: new signals.Signal (),
  orientationChanged: new signals.Signal (),
  requestFullScreen: new signals.Signal (),
  graphicsCreated: new signals.Signal (),
  initUI: new signals.Signal (),
  spinBtnPressed: new signals.Signal (),
  errorConnection: new signals.Signal (),

  correctAnswer: new signals.Signal (),
  incorrectAnswer: new signals.Signal (),
  levelUp: new signals.Signal (),
  levelDown: new signals.Signal (),
  gameFinish: new signals.Signal (),

  musicClick: new signals.Signal (),
  soundClick: new signals.Signal (),
  muteClick: new signals.Signal ()
}