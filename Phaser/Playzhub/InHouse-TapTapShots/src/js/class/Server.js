
// import { GameAnalytics } from "../../lib/GameAnalyticsSDK";

class Server {
    constructor() {
        this.urlParams = new URLSearchParams(window.location.search);
        this.timerValue = this.urlParams.get("timer");
        this.gameID = this.urlParams.get("game_id") || 7;
        // this.analyticsSdk = null;
        // this.InitializeGameAnalyticsSDK(this.gameID);

    }
    //#region  Game Analytics Initialization

    //#endregion
    IsUrlParamMissing() {
        if (!this.timerValue) {
            return true;
        }
        return false;
    }
    // PostGameFinishToParent(_consumedTime) {
    //     console.log('PostGameFinishToParent', _consumedTime, this.gameID);

    //     const data = {
    //         gameplay_time: _consumedTime,
    //         game_id: this.gameID,
    //         game_type: 'HTML5',
    //         game_name: 'TapTapShots'
    //     }
    //     GameAnalytics.emit('GameCompleted', data);
    // }
    // PostGamePlayTimeToParent(_consumedTime, _score) {
    //     console.log('PostGamePlayTimeToParent', _consumedTime, _score, this.gameID);
    //     const data = {
    //         gameplay_time: _consumedTime,
    //         game_id: this.gameID,
    //         game_type: 'HTML5',
    //         game_name: 'TapTapShots',
    //         score: _score
    //     }
    //     // GameAnalytics.emit('GameScoreUpdate', data);
    // }
    // PostGameFrequencyToParent(_frequency) {
    //     console.log('PostGameFrequencyToParent', _frequency, this.gameID);
    //     const data = {
    //         game_frequency: _frequency,
    //         game_id: this.gameID,
    //         game_type: 'HTML5',
    //         game_name: 'TapTapShots',
    //     }
    //     // GameAnalytics.emit('GamePlayStarted  ', data);
    // }

    // PostGameQuitToParent(_consumedTime, _score) {
    //     console.log('PostGameQuitToParent', _consumedTime, _score, this.gameID);
    //     const data = {
    //         gameplay_time: _consumedTime,
    //         game_id: this.gameID,
    //         game_type: 'HTML5',
    //         game_name: 'TapTapShots',
    //         score: _score
    //     }
    //     // GameAnalytics.emit('GamePlayStopped ', data);
    // }
}
let server = new Server();
export { server as Server }
