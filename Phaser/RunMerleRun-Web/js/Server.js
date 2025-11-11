// Define the Server constructor function
var Server = {


    // Add methods to the Server prototype
    IsUrlParamsMissing: function () {
        if (!this.timerValue) {
            return true;
        }
        return false;

    },

    GetGameDetails: function () {

        this.urlParams = new URLSearchParams(window.location.search)
        this.gameID = this.urlParams.get("game_id");

    },


    GetGameID: function () {
        return this.gameID;
    },
    PostGameQuitToParent: function (_consumedTime, _score) {
        console.log('PostGameQuitToParent', _consumedTime, _score, this.gameID);
        var data = {
            gameplay_time: _consumedTime,
            game_id: this.gameID,
            game_type: 'HTML5',
            game_name: 'Run Merle Run',
            score: _score
        };
        // sendMessage('GameQuit', data);
    },

    PostGameFrequencyToParent: function (_frequency) {
        console.log('PostGameFrequencyToParent', _frequency, this.gameID);
        var data = {
            game_frequency: _frequency,
            game_id: this.gameID,
            game_type: 'HTML5',
            game_name: 'Run Merle Run',
        };
        // sendMessage('GameFrequency', data);
    },

    PostGamePlayTimeToParent: function (_consumedTime, _score) {
        console.log('PostGamePlayTimeToParent', _consumedTime, _score, this.gameID);
        var data = {
            gameplay_time: _consumedTime,
            game_id: this.gameID,
            game_type: 'HTML5',
            game_name: 'Run Merle Run',
            score: _score
        };
        // sendMessage('GameOver', data);
    },

    PostGameFinishToParent: function (_timeConsumed) {
        console.log('PostGameFinishToParent', _timeConsumed);
        // sendMessageForAnalytics("getGamePlayTime", {
        //     "event": "Gameplay Time",
        //     "game_id": this.gameID,
        //     "game_type": "HTML",
        //     "gameplay_time": _timeConsumed,
        //     "timestamp": Math.floor(Date.now() / 1000)
        // });

    }
}

// // Create an instance of Server
// var server = new Server();

// // Export the server instance (in ES5, this is just assigning it to a global variable or module system)
// window.Server = Server;
