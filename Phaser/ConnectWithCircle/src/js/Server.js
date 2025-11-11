
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
        this.baseURL = "http://13.232.173.115:3001";
        this.scoreURL = "/update-score";
        this.response = "";
    };

    GetUrl(apiUrl) {
        return this.baseURL + apiUrl;
    }
    PostScore(_score) {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                this.response = JSON.parse(this.responseText);
            } else { }
        };
        xhttp.open("POST", this.GetUrl(this.scoreURL), true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("score=" + _score);
    }

    IsUrlParamsMissing() {
        if (!this.timerValue) {
            return true;
        }
        return false;
    };

    PostGameFinishToParent(_consumedTime) {
        // console.log('PostGameFinishToParent', _consumedTime, this.gameID);

        const data = {
            gameplay_time: _consumedTime,
            game_id: this.gameID,
            game_type: 'HTML5',
            game_name: 'Connect The Ball'
        }
        // sendMessage('GameCompleted', data);
    }
    PostGamePlayTimeToParent(_consumedTime, _score) {
        // console.log('PostGamePlayTimeToParent', _consumedTime, _score, this.gameID);
        const data = {
            gameplay_time: _consumedTime,
            game_id: this.gameID,
            game_type: 'HTML5',
            game_name: 'Connect The Ball',
            score: _score
        }
        // sendMessage('GameOver', data);
    }
    PostGameFrequencyToParent(_frequency) {
        // console.log('PostGameFrequencyToParent', _frequency, this.gameID);
        const data = {
            game_frequency: _frequency,
            game_id: this.gameID,
            game_type: 'HTML5',
            game_name: 'Connect The Ball',
        }
        // sendMessage('GameFrequency', data);
    }

    PostGameQuitToParent(_consumedTime, _score) {
        // console.log('PostGameQuitToParent', _consumedTime, _score, this.gameID);
        const data = {
            gameplay_time: _consumedTime,
            game_id: this.gameID,
            game_type: 'HTML5',
            game_name: 'Connect The Ball',
            // score: _score
        }
        // sendMessage('GameQuit', data);
    }

};

let server = new Server();

export { server as Server };
