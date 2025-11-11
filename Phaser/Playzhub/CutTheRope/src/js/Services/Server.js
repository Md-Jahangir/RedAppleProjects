// import { Constant } from "../Constant";
// import { GameAnalytics } from "../../lib/GameAnalyticsSDK";

class Server {
    constructor() {
        this.urlParams = new URLSearchParams(window.location.search);
        this.timerValue = this.urlParams.get("timer");
        this.gameID = this.urlParams.get("game_id") || 5;
    }
    IsUrlParamMissing() {
        if (!this.timerValue) {
            return true;
        }
        return false;
    }
    // //#region PostGameOuitToParent
    // PostGameOuitToParent(_timeConsumed, _score) {
    //     console.log(' Post Game Quit To Parent  ', _timeConsumed, _score);
    //     const data = {
    //         "gameplay_time": _timeConsumed,
    //         "game_id": this.gameID,
    //         "game_type": "HTML5",
    //         "game_name": "Cut It Right",
    //         "score": _score
    //     }
    //     GameAnalytics.emit("GamePlayStopped", data);
    // }
    // //#endregion

    // //#region PostGameOverToParent
    // PostGameOverToParent(_timeConsumed, _score) {
    //     console.log(' Post Game Over To Parent ', _timeConsumed);
    //     const data = {
    //         "gameplay_time": _timeConsumed,
    //         "game_id": this.gameID,
    //         "game_type": "HTML5",
    //         "game_name": "Cut It Right",
    //         "score": _score
    //     }
    //     GameAnalytics.emit("GameCompleted", data);
    // }
    // //#endregion

    // //#region -PostGameFrequencyToParent
    // PostGameFrequencyToParent() {
    //     console.log(' PostGameFrequencyToParent ', Constant.numberOfPlayButtonClicked, this.gameID);
    //     const data = {
    //         "game_frequency": Constant.numberOfPlayButtonClicked,
    //         "game_id": this.gameID,
    //         "game_type": "HTML5",
    //         "game_name": "Cut It Right"
    //     }
    //     GameAnalytics.emit("GamePlayStarted", data);
    // }
    // //#endregion

    // //#region -PostGamePlayTimeToParent
    // PostGamePlayTimeToParent(_timeConsumed, _score) {
    //     console.log(' PostGamePlayTimeToParent ', _timeConsumed, _score);
    //     const data = {
    //         "gameplay_time": _timeConsumed,
    //         "game_id": this.gameID,
    //         "game_type": "HTML5",
    //         "game_name": "Cut It Right",
    //         "score": _score
    //     }
    //     GameAnalytics.emit("GameScoreUpdate", data);
    // }

    // PostGameLevelToParent(_timeConsumed, _gameLevel, _status) {
    //     console.log('PostGameLevelToParent', _timeConsumed, _gameLevel, _status);
    //     const data = {
    //         'gameplay_time': _timeConsumed,
    //         'game_id': this.gameID,
    //         'game_type': 'HTML5',
    //         'game_name': 'Cut It Right',
    //         'game_level': _gameLevel,
    //         'level_status': _status
    //     }
    //     GameAnalytics.emit("UpdateGameLevel", data);
    // }

    // PostGameState(_starData, _score, _gameOptions) {
    //     let data;
    //     if (_starData != null) {
    //         data = {
    //             'starsData': _starData,
    //             'score': _score,
    //             'gameOptions': _gameOptions
    //         }
    //     } else {
    //         data = null;
    //     }
    //     GameAnalytics.emit("GameStateUpdate", data);
    // }
    // //#endregion

    // //#region Request GameState
    // ReqGameState() {
    //     GameAnalytics.emit('RequestGameStateFromGame', null);
    // }
}
let server = new Server();
export { server as Server }