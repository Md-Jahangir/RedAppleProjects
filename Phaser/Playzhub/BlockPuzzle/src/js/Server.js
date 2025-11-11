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
    this.gameID = this.urlParams.get('game_id') || 51;

  };

  IsUrlParamsMissing() {
    if (!this.timerValue) {
      return true;
    }
    return false;
  };
  PostGameOuitToParent() {
     
    console.log('Post Game Quit To Parent');
    sendMessageForAnalytics('getQuitGame',
      {
        'event': 'Quit Game',
        'game_id': this.gameID,
        'game_type': 'HTML',
        'timestamp': Math.floor(Date.now() / 1000)
      }
    );
  }
  PostGameOverToParent(_timeConsumed) {
     
    console.log(' Post Game Over To Parent ', _timeConsumed);
    sendMessageForAnalytics('getGamePlayTime',
      {
        'event': 'Gameplay Time',
        'game_id': this.gameID,
        'game_type': 'HTML',
        'gameplay_time': _timeConsumed,
        'timestamp': Math.floor(Date.now() / 1000)
      }
    );
  }

};


const server = new Server();

export { server as Server };