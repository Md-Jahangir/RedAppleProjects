/* global window,URLSearchParams*/

/**
 * This class used for any interactions between client and server. 
 */

class Server {
  /**
       * Create class instance and fill params from URL or fill it with default values if URL not contain needed data.
       * @constructs
       */
  constructor() {
    this.urlParams = new URLSearchParams(window.location.search);
    this.timerValue = this.urlParams.get('timer');
    this.gameID = this.urlParams.get('game_id');

  };

  IsUrlParamsMissing() {
    if (!this.timerValue) {
      return true;
    }
    return false;
  };

  PostGamePlayTimeToParent(_consumedTime, _score) {
    console.log('PostGamePlayTimeToParent', _consumedTime, _score, this.gameID);
    const data = {
      'gameplay_time': _consumedTime,
      'game_id': this.gameID,
      'game_type': 'HTML5',
      'game_name': 'WordSearch',
      'score': _score
    };
    sendMessage('GameOver', data);
  }

  PostGameFrequencyToParent(_frequency) {
    console.log('PostGameFrequencyToParent', _frequency, this.gameID);
    const data = {
      'game_frequency': _frequency,
      'game_id': this.gameID,
      'game_type': 'HTML5',
      'game_name': 'WordSearch',
    };
    sendMessage('GameFrequency', data);
  }

  PostGameQuitToParent(_consumedTime, _score) {
    console.log('PostGameQuitToParent', _consumedTime, _score, this.gameID);
    const data = {
      'gameplay_time': _consumedTime,
      'game_id': this.gameID,
      'game_type': 'HTML5',
      'game_name': 'WordSearch',
      // 'score': _score
    };
    sendMessage('GameQuit', data);
  }

  PostGameData(_score, _totalLevels, _gridConfig, _sLevel, _hintsUsed) {
    let data = {
      'game_score': _score,
      'total_levels': _totalLevels,
      'current_grid': _gridConfig,
      'sub_levels': _sLevel,
      'game_collectibles': {
        'hints_used': _hintsUsed
      }

    };
    if (_score === null) {
      data = null;
      // console.log(' game completed ');
      sendMessage('game-state', data);

    } else {
      sendMessage('game-state', data);

    }
    // console.log('game-state', data);
  }

  PostGameLevelToParent(_consumedTime, _gameLevel, _status) {
    console.log('PostGameLevelToParent', _consumedTime, _gameLevel, _status);
    const data = {
      'gameplay_time': _consumedTime,
      'game_id': this.gameID,
      'game_type': 'HTML5',
      'game_name': 'WordSearch',
      'game_level': _gameLevel,
      'level_status': _status
    };
    sendMessage('GameLevel', data);
  }
}


const server = new Server();

export { server as Server };