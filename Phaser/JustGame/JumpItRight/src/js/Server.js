
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
        this.timerValue = this.urlParams.get("timer");
        this.gameID = this.urlParams.get("game_id");

    };

    IsUrlParamsMissing() {
        if (!this.timerValue) {
            return true;
        }
        return false;
    };
    PostGameQuitToParent(_consumedTime, _score) {
        console.log('PostGameQuitToParent', _consumedTime, _score, this.gameID);
        const data = {
            gameplay_time: _consumedTime,
            game_id: this.gameID,
            game_type: 'HTML5',
            game_name: 'JumpItRight',
        }
        sendMessage('GameQuit', data);
    }
    PostGameFrequencyToParent(_frequency) {
        console.log('PostGameFrequencyToParent', _frequency, this.gameID);
        const data = {
            game_frequency: _frequency,
            game_id: this.gameID,
            game_type: 'HTML5',
            game_name: 'JumpItRight',
        }
        sendMessage('GameFrequency', data);
    }

    PostGamePlayTimeToParent(_consumedTime, _score) {
        console.log('PostGamePlayTimeToParent', _consumedTime, _score, this.gameID);
        const data = {
            gameplay_time: _consumedTime,
            game_id: this.gameID,
            game_type: 'HTML5',
            game_name: 'JumpItRight',
            score: _score
        }
        sendMessage('GameOver', data);
    }

    PostGameFinishToParent(_timeConsumed) {
        console.log(' Post Game Over To Parent ', _timeConsumed);
        sendMessageForAnalytics("getGamePlayTime",
            {
                "event": "Gameplay Time",
                "game_id": this.gameID,
                "game_type": "HTML",
                "gameplay_time": _timeConsumed,
                "timestamp": Math.floor(Date.now() / 1000)
            }
        );
    }

};

let server = new Server();

export { server as Server };
