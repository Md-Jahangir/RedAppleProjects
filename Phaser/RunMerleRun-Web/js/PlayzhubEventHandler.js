

/**
 * @file PlayzhubEventHandler.js
 * @module PlayzhubEventHandler
 * `PlayzhubEventHandler` class is responsible for handling all the events that are triggered by the Playzhub SDK.
 */



var PlayzhubEventHandler = {
  GameLoadingStarted: function () {
    const eventName = 'GameLoadingStarted';
    const data = {
      'game_id': Server.GetGameID(),
      'game_type': 'HTML5',
      'game_name': 'Run Merle Run',
    };
    window.PlayzhubInstance.emitEvent(eventName, data);
  },

  GameLoadingCompleted: function () {
    const eventName = 'GameLoadingCompleted';
    const data = {
      'game_id': Server.GetGameID(),
      'game_type': 'HTML5',
      'game_name': 'Run Merle Run',
    };
    window.PlayzhubInstance.emitEvent(eventName, data);
  },

  GamePlayStarted: function () {
    const eventName = 'GamePlayStarted';
    const data = {
      'game_id': Server.GetGameID(),
      'game_type': 'HTML5',
      'game_name': 'Run Merle Run',
    };
    window.PlayzhubInstance.emitEvent(eventName, data);
  },

  GamePlayStopped: function (_consumedTime) {
    const eventName = 'GamePlayStopped';
    const data = {
      'game_id': Server.GetGameID(),
      'game_type': 'HTML5',
      'game_name': 'Run Merle Run',
      'gameplay_time': _consumedTime
    };
    window.PlayzhubInstance.emitEvent(eventName, data);
  },

  UpdateGameLevel: function () {
    const eventName = 'UpdateGameLevel';
    const data = {
      'game_id': Server.GetGameID(),
      'game_type': 'HTML5',
      'game_name': 'Run Merle Run'
    };
    window.PlayzhubInstance.emitEvent(eventName, data);
  },

  GamePlayPaused: function () {
    const eventName = 'GamePlayPaused';
    const data = {
      'game_id': Server.GetGameID(),
      'game_type': 'HTML5'
    };
    window.PlayzhubInstance.emitEvent(eventName, data);
  },

  GamePlayResumed: function () {
    const eventName = 'GamePlayResumed';
    const data = {
      'game_id': Server.GetGameID(),
      'game_type': 'HTML5',
      'game_name': 'Run Merle Run'
    };
    window.PlayzhubInstance.emitEvent(eventName, data);
  },

  InterimBreak: function () {
    const eventName = 'InterimBreak';
    const data = {
      'game_id': Server.GetGameID(),
      'game_type': 'HTML5',
      'game_name': 'Run Merle Run'
    };
    window.PlayzhubInstance.emitEvent(eventName, data);
  },

  RequestAD: function () {
    const eventName = 'RequestAD';
    const data = {
      'game_id': Server.GetGameID(),
      'game_type': 'HTML5',
      'game_name': 'Run Merle Run'
    };
    window.PlayzhubInstance.emitEvent(eventName, data);
    console.log('Request ad......');

  },

  GameScoreUpdate: function (_consumedTime, _gamescore) {
    const eventName = 'GameScoreUpdate';
    const data = {
      'gameplay_time': _consumedTime,
      'game_id': Server.GetGameID(),
      'game_type': 'HTML5',
      'game_name': 'Run Merle Run',
      'score': _gamescore,
    };
    window.PlayzhubInstance.emitEvent(eventName, data);
  },

  GameStateUpdate: function (_grid, _sublvl) {
    const eventName = 'GameStateUpdate';
    const data = {
      'game_id': Server.GetGameID(),
      'game_type': 'HTML5',
      'grid': _grid,
      'sublevel': _sublvl
    };
    window.PlayzhubInstance.emitEvent(eventName, data);
  },

  DebugMode: function () {
    const eventName = 'DebugMode';
    const data = {
      'event': 'DebugMode',
      'game_id': Server.GetGameID(),
      'game_type': 'HTML5'
    };
    window.PlayzhubInstance.emitEvent(eventName, data);
  },

  //-----------------All Platform Listeners------------------------------//

  GameStateFetch: function () {
    window.PlayzhubInstance.listen('GameStateFetch', function (data) {
      Constant.game.events.emitEvent('gamestateupdate', data);
    });
  },

  GameScoreFetch: function () {
    window.PlayzhubInstance.listen('GameScoreFetch', function (data) {
      Constant.game.events.emitEvent('gamescoreupdate', data);
    });
  },

  AdStarted: function () {
    console.log("listening AdStarted from event handler");

    window.PlayzhubInstance.listen('AdStarted', function (data) {
      console.log("firing adstarted method");
      GameOverPopup.OnAdStarted();
    });
  },

  AdCompleted: function () {
    console.log("listening AdStarted from event handler");
    window.PlayzhubInstance.listen('AdCompleted', function (data) {
      console.log("firing adcompleted method");
      GameOverPopup.OnAdCompleted();
    });
  },

}



