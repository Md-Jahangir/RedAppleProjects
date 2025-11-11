/**
 * @file PlayzhubEventHandler.js
 * @module PlayzhubEventHandler
 * `PlayzhubEventHandler` class is responsible for handling all the events that are triggered by the Playzhub SDK.
 */

var gameType = "HTML5";
var gameName = "HitTheWicket"
var PlayzhubEventHandler = {
  emitEvent: function (_eventName, _data) {
    // window.PlayzhubSDk_E5 = new PlayzhubSDk_E5('HitTheWicket', true);
    console.log("emitEvent from game window: ", window);
    console.log("emitEvent from game window.PlayzhubSDk_E5: ", window.PlayzhubInstance);

    window.PlayzhubInstance.emitEvent(_eventName, _data);
  },

  //#region This will be called by the game when game loading is started.
  GameLoadingStarted: function () {
    const eventName = 'GameLoadingStarted';
    const data = {
      'game_id': Server.GetGameId(),
      'game_type': gameType,
      'game_name': gameName
    };
    this.emitEvent(eventName, data);
  },
  //#endregion

  //#region This will be called by the game when game loading is completed and the game is in a playable state.
  GameLoadingCompleted: function () {
    const eventName = 'GameLoadingCompleted';
    const data = {
      'game_id': Server.GetGameId(),
      'game_type': gameType,
      'game_name': gameName
    };
    this.emitEvent(eventName, data);
  },

  //#region This will be called by the game to fetch the game state saved in the platform.
  RequestGameStateFromGame: function () {
    const eventName = 'RequestGameStateFromGame';
    const data = null;
    this.emitEvent(eventName, data);
  },
  //#endregion

  //#region This will be called by the game to fetch the game state saved in the platform.
  RequestGameState: function () {
    const eventName = 'RequestGameState';
    const data = null;
    this.emitEvent(eventName, data);
  },
  //#endregion

  //#region This will be called when the game play is started.
  GamePlayStarted: function (_numberOfPlays) {
    const eventName = 'GamePlayStarted';
    const data = {
      "game_frequency": _numberOfPlays,
      'game_id': Server.GetGameId(),
      'game_type': gameType,
      "game_name": gameName
    };
    this.emitEvent(eventName, data);
  },
  //#endregion

  //#region This will be called by the game when game play is ended.
  GamePlayStopped: function (_timeConsumed) {
    const eventName = 'GamePlayStopped';
    const data = {
      'gameplay_time': _timeConsumed,
      'game_id': Server.GetGameId(),
      'game_type': gameType,
      "game_name": gameName
    };
    this.emitEvent(eventName, data);
  },
  //#endregion

  //#region This will be called when level completed or failed
  UpdateGameLevel: function (_timeConsumed, _completedLevel, _levelStatus) {
    const eventName = 'UpdateGameLevel';
    const data = {
      "gameplay_time": _timeConsumed,
      "game_id": Server.GetGameId(),
      "game_type": gameType,
      "game_name": gameName,
      "game_level": _completedLevel,
      "level_status": _levelStatus
    };
    this.emitEvent(eventName, data);
  },
  //#endregion

  //#region This will be called by the game when game play is paused by the user.
  GamePlayPaused: function () {
    const eventName = 'GamePlayPaused';
    const data = {
      "game_id": Server.GetGameId(),
      "game_type": gameType,
      "game_name": gameName,
    };
    this.emitEvent(eventName, data);
  },
  //#endregion

  //#region This will be called by the game when game play is started again from Paused mode.
  GamePlayResumed: function () {
    const eventName = 'GamePlayResumed';
    const data = {
      "game_id": Server.GetGameId(),
      "game_type": gameType,
      "game_name": gameName,
    };
    this.emitEvent(eventName, data);
  },
  //#endregion

  //#region This will be called by the game when there is a pause due to level change or restarting the level etc.
  InterimBreak: function () {
    const eventName = 'InterimBreak';
    const data = {
      "game_id": Server.GetGameId(),
      "game_type": gameType,
      "game_name": gameName,
    };
    this.emitEvent(eventName, data);
  },
  //#endregion

  //#region This will be called by the game to request ad.
  RequestAD: function () {
    const eventName = 'RequestAD';
    const data = {
      "game_id": Server.GetGameId(),
      "game_type": gameType,
      "game_name": gameName,
    };
    this.emitEvent(eventName, data);
    console.log('requeste ad');

  },
  //#endregion

  //#region This will be called by the game when the score will be updated to the platform.
  GameScoreUpdate: function (_timeConsumed, _gamescore) {
    const eventName = 'GameScoreUpdate';
    const data = {
      "gameplay_time": _timeConsumed,
      'game_id': Server.GetGameId(),
      'game_type': gameType,
      "game_name": gameName,
      'score': _gamescore
    };
    this.emitEvent(eventName, data);
  },
  //#endregion

  //#region This will be called by the game when game state will be updated to the platform.
  GameStateUpdate: function (_data) {
    const eventName = 'GameStateUpdate';
    this.emitEvent(eventName, _data);
  },
  //#endregion

  //#region This will be called by the game to enable/disable debug mode. Enabled mode will print logs from the platform.
  DebugMode: function () {
    const eventName = 'DebugMode';
    const data = {
      'game_id': Server.GetGameId(),
      'game_type': gameType,
      "game_name": gameName,
    };
    this.emitEvent(eventName, data);
  },
  //#endregion

  //################# All Listen Event #########################

  //#region This will be called by Platform to send game state to game end
  SendGameStateToGame: function (callBackFunction) {
    const eventName = 'SendGameStateToGame';
    window.PlayzhubInstance.listen(eventName, (data) => {
      console.log('SendGameStateToGame', data);
      callBackFunction(data);
    });
  },
  //#endregion

  //#region This will be called by Platform to send game state to game end
  ReceivedGameState: function (callBackFunction) {
    const eventName = 'ReceivedGameState';
    window.PlayzhubInstance.listen(eventName, (data) => {
      console.log('ReceivedGameState', data);
      callBackFunction(data);
    })
  },
  //#endregion

  //#region This will be called by the platform to fetch game state from the game anytime.
  GameStateFetch: function (callBackFunction) {
    const eventName = 'GameStateFetch';
    window.PlayzhubInstance.listen(eventName, (data) => {
      console.log('GameStateFetch', data);
      callBackFunction(data);
    });
  },
  //#endregion

  //#region This will be called by the platform to fetch scores from the game anytime.
  GameScoreFetch: function (callBackFunction) {
    const eventName = 'GameScoreFetch';
    window.PlayzhubInstance.listen(eventName, (data) => {
      console.log('GameScoreFetch', data);
      callBackFunction(data);
    });
  },
  //#endregion

  //#region This will be called by the platform to notify the game that the ad is about to start from the platform and the game needs to pause the game.
  AdStarted: function (callBackFunction) {
    const eventName = 'AdStarted';
    console.log("ADStarted from event handler");

    window.PlayzhubInstance.listen(eventName, (data) => {
      console.log('AdStarted', data);
      callBackFunction(data);
    });
  },
  //#endregion

  //#region This will be called by the platform to notify the game that the ad is ended so that the game can resume.
  AdCompleted: function (callBackFunction) {
    const eventName = 'AdCompleted';
    console.log("AdCompleted from event handler");
    window.PlayzhubInstance.listen(eventName, (data) => {
      console.log('AdCompleted', data);
      callBackFunction(data);
    });
  }
  //#endregion

}



