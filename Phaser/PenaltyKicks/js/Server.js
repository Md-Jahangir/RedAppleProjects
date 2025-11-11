
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
        this.gameID = this.urlParams.get("game_id") || 10;

    };

    IsUrlParamsMissing() {
        if (!this.timerValue) {
            return true;
        }
        return false;
    };

    async GetListen() {

        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorizaqtion", "Basic" + btoa("admin:admin"));

        let options = {

            headers: headers,
            body: JSON.stringify(body),
            method: "GET",

        }

        await this.fetchData(url, options);

    }
    PostGameFinishToParent(_consumedTime) {
        console.log('PostGameFinishToParent', _consumedTime);

        const data = {
            gameplay_time: _consumedTime,
            game_id: this.gameID,
            game_type: 'HTML5',
            game_name: 'Penalty Blast',
        }
        // sendMessage('GameCompleted', data);
    }
    PostGamePlayTimeToParent(_consumedTime, _score) {
        console.log('PostGamePlayTimeToParent', _consumedTime, _score);
        const data = {
            gameplay_time: _consumedTime,
            game_id: this.gameID,
            game_type: 'HTML5',
            game_name: 'Penalty Blast',
            score: _score
        }
        // sendMessage('GameOver', data);
    }
    PostGameFrequencyToParent(_frequency) {
        console.log('PostGameFrequencyToParent', _frequency);
        const data = {
            game_frequency: _frequency,
            game_id: this.gameID,
            game_type: 'HTML5',
            game_name: 'Penalty Blast',
        }
        // sendMessage('GameFrequency', data);
    }

    PostGameQuitToParent(_consumedTime, _score) {
        console.log('PostGameQuitToParent', _consumedTime, _score);
        const data = {
            gameplay_time: _consumedTime,
            game_id: this.gameID,
            game_type: 'HTML5',
            game_name: 'Penalty Blast',
            score: _score
        }
        // sendMessage('GameQuit', data);
    }

};

let server = new Server();

export { server as Server };
