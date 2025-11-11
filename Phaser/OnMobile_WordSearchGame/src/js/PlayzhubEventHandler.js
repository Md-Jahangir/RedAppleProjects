/**
 * @file PlayzhubEventHandler.js
 * @module PlayzhubEventHandler
 * `PlayzhubEventHandler` class is responsible for handling all the events that are triggered by the Playzhub SDK.
 * This class is responsible for handling the following events:
 * @description
 * - Events are divided into 2 types. A few events will be integrated at the game end and a few events will be at the platform end to have more control on game metrics..
 */

// import { PlayzhubSDk } from './PlayzhubSDk_E6';
import { Server } from './Server';

class PlayzhubEventHandler {

  constructor() {
    this.gameType = 'HTML5';
    this.gameName = 'WordSearch';
  };

  emitEvent(_eventName, _data) {
    window.PlayzhubSDk.emitEvent(_eventName, _data);
  };

  //#region This will be called by the game when game loading is started.
  GameLoadingStarted() {
    const eventName = 'GameLoadingStarted';
    const data = {
      'game_id': Server.gameID,
      'game_type': this.gameType,
      'game_name': this.gameName
    };
    this.emitEvent(eventName, data);
  };
  //#endregion

  //#region This will be called by the game when game loading is completed and the game is in a playable state.
  GameLoadingCompleted() {
    const eventName = 'GameLoadingCompleted';
    const data = {
      'game_id': Server.gameID,
      'game_type': this.gameType,
      'game_name': this.gameName
    };
    this.emitEvent(eventName, data);
  };
  //#endregion

  //#region This will be called by the game to fetch the game state saved in the platform.
  RequestGameStateFromGame() {
    const eventName = 'RequestGameStateFromGame';
    const data = null;
    this.emitEvent(eventName, data);
  };
  //#endregion

  //#region This will be called by the game to fetch the game state saved in the platform.
  RequestGameState() {
    const eventName = 'RequestGameState';
    const data = null;
    this.emitEvent(eventName, data);
  };
  //#endregion

  //#region This will be called when the game play is started.
  GamePlayStarted(_numberOfPlays) {
    const eventName = 'GamePlayStarted';
    const data = {
      'game_frequency': _numberOfPlays,
      'game_id': Server.gameID,
      'game_type': this.gameType,
      'game_name': this.gameName
    };
    this.emitEvent(eventName, data);
  };
  //#endregion

  //#region This will be called by the game when game play is ended.
  GamePlayStopped(_timeConsumed) {
    const eventName = 'GamePlayStopped';
    const data = {
      'gameplay_time': _timeConsumed,
      'game_id': Server.gameID,
      'game_type': this.gameType,
      'game_name': this.gameName
    };
    this.emitEvent(eventName, data);
  };
  //#endregion

  //#region This will be called when level completed or failed
  UpdateGameLevel(_timeConsumed, _completedLevel, _levelStatus) {
    const eventName = 'UpdateGameLevel';
    const data = {
      'gameplay_time': _timeConsumed,
      'game_id': Server.gameID,
      'game_type': this.gameType,
      'game_name': this.gameName,
      'game_level': _completedLevel,
      'level_status': _levelStatus
    };
    this.emitEvent(eventName, data);
  };
  //#endregion

  //#region This will be called by the game when game play is paused by the user.
  GamePlayPaused() {
    const eventName = 'GamePlayPaused';
    const data = {
      'game_id': Server.gameID,
      'game_type': this.gameType,
      'game_name': this.gameName,
    };
    this.emitEvent(eventName, data);
  };
  //#endregion

  //#region This will be called by the game when game play is started again from Paused mode.
  GamePlayResumed() {
    const eventName = 'GamePlayResumed';
    const data = {
      'game_id': Server.gameID,
      'game_type': this.gameType,
      'game_name': this.gameName,
    };
    this.emitEvent(eventName, data);
  };
  //#endregion

  //#region This will be called by the game when there is a pause due to level change or restarting the level etc.
  InterimBreak() {
    const eventName = 'InterimBreak';
    const data = {
      'game_id': Server.gameID,
      'game_type': this.gameType,
      'game_name': this.gameName,
    };
    this.emitEvent(eventName, data);
  };
  //#endregion

  //#region This will be called by the game when ad will be shown.
  RequestAD() {
    const eventName = 'RequestAD';
    const data = {
      'game_id': Server.gameID,
      'game_type': this.gameType,
      'game_name': this.gameName,
    };
    this.emitEvent(eventName, data);
  };
  //#endregion

  //#region This will be called by the game when the score will be updated to the platform.
  GameScoreUpdate(_timeConsumed, _gamescore) {
    const eventName = 'GameScoreUpdate';
    const data = {
      'gameplay_time': _timeConsumed,
      'game_id': Server.gameID,
      'game_type': this.gameType,
      'game_name': this.gameName,
      'score': _gamescore
    };
    this.emitEvent(eventName, data);
  };
  //#endregion

  //#region This will be called by the game when game state will be updated to the platform.
  GameStateUpdate(_data) {
    const eventName = 'GameStateUpdate';
    this.emitEvent(eventName, _data);
  };
  //#endregion

  //#region This will be called by the game to enable/disable debug mode. Enabled mode will print logs from the platform.
  DebugMode() {
    const eventName = 'DebugMode';
    const data = {
      'game_id': Server.gameID,
      'game_type': this.gameType,
      'game_name': this.gameName,
    };
    this.emitEvent(eventName, data);
  };
  //#endregion

  //################# All Listen Event #########################

  //#region This will be called by Platform to send game state to game end
  SendGameStateToGame(callBackFunction) {
    console.log('callBackFunction', callBackFunction, typeof (callBackFunction));

    const eventName = 'SendGameStateToGame';
    window.PlayzhubSDk.listen(eventName, (data) => {
      console.log('SendGameStateToGame', data);
      callBackFunction(data);
    });
  };
  //#endregion

  //#region This will be called by Platform to send game state to game end
  ReceivedGameState(callBackFunction) {
    const eventName = 'ReceivedGameState';
    window.PlayzhubSDk.listen(eventName, (data) => {
      console.log('ReceivedGameState', data);
      callBackFunction(data);
    });
  };
  //#endregion

  //#region This will be called by the platform to fetch game state from the game anytime.
  GameStateFetch(callBackFunction) {
    const eventName = 'GameStateFetch';
    window.PlayzhubSDk.listen(eventName, (data) => {
      console.log('GameStateFetch', data);
      callBackFunction(data);
    });
  };
  //#endregion

  //#region This will be called by the platform to fetch scores from the game anytime.
  GameScoreFetch(callBackFunction) {
    const eventName = 'GameScoreFetch';
    window.PlayzhubSDk.listen(eventName, (data) => {
      console.log('GameScoreFetch', data);
      callBackFunction(data);
    });
  };
  //#endregion

  //#region This will be called by the platform to notify the game that the ad is about to start from the platform and the game needs to pause the game.
  AdStarted(callBackFunction) {
    const eventName = 'AdStarted';
    window.PlayzhubSDk.listen(eventName, (data) => {
      console.log('AdStarted', data);
      callBackFunction(data);
    });
  };
  //#endregion

  //#region This will be called by the platform to notify the game that the ad is ended so that the game can resume.
  AdCompleted(callBackFunction) {
    const eventName = 'AdCompleted';
    window.PlayzhubSDk.listen(eventName, (data) => {
      console.log('AdCompleted', data);
      callBackFunction(data);
    });
  };
  //#endregion
}
const playzhubEvent = new PlayzhubEventHandler();
export { playzhubEvent as PlayzhubEventHandler };