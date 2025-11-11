import { v4 as uuidv4 } from 'uuid';
/**
 * This class used for any interactions between client and server. 
 */
class Server {
    /**
     * Create class instance and fill params from URL or fill it with default values if URL not contain needed data.
     * @constructs
     */
    constructor() {
        // this.baseUrl = "https://extcae-backend.challengesarena.com/appserver/api/v1/games/originals/";
        this.baseUrl = baseUrl;
        this.scoreApi = "score";
        this.urlParams = new URLSearchParams(window.location.search);
        this.language = this.urlParams.get("lang");
        this.gameCode = this.urlParams.get("gameCode");
        this.subId = this.urlParams.get("subId");
        // this.gameState = this.urlParams.get("gamestate");
        this.currentLevel = this.urlParams.get("currlevel");
        this.sessionId = "";
        this.score = "";
        this.GetUniqueSessionId();
    };

    GenerateSessionId() {
        return uuidv4();
    };

    GetUniqueSessionId() {
        // this.DestroySession();
        this.sessionId = sessionStorage.getItem('sessionId');
        if (!this.sessionId) {
            let newSessionId = this.GenerateSessionId();
            sessionStorage.setItem('sessionId', newSessionId);
        } else {
            this.sessionId = sessionStorage.getItem('sessionId');
        }
        console.log("this.sessionId: ", this.sessionId);
    };

    DestroySession() {
        sessionStorage.removeItem('sessionId');
    };


    async GetData(url, options) {
        try {
            let response = await fetch(url, options);
            console.log("response", response);
            return response.json();
        } catch (err) {
            console.log("Error log: ", err);
        }
    };
    async PostScore(_score, _gameState) {
        console.log("_score: ", this.subId);
        try {
            let reqHeaders = new Headers();
            reqHeaders.append("Content-Type", "application/json");
            let option = {
                gameCode: this.gameCode,
                sessionId: this.sessionID,
                score: _score,
                subId: this.subID,
                gamestate: _gameState,
                currlevel: this.currentLevel
            };
            let url = this.baseUrl + this.scoreApi;
            let requestOptions = {
                method: 'POST',
                headers: reqHeaders,
                body: JSON.stringify(option)
            };
            return (await this.GetData(url, requestOptions));
        } catch (err) {
            console.log("Post score Error: ", err);
        }
    };
    async PostMessage(_score, _gameState) {
        console.log("PostMessage _score: ", _score);
        console.log("PostMessage _gameState: ", _gameState);
        try {
            // let reqHeaders = new Headers();
            // reqHeaders.append("Content-Type", "application/json");
            let option = {
                gameCode: this.gameCode,
                sessionId: this.sessionID,
                score: _score,
                subId: this.subID,
                gamestate: _gameState,
                currlevel: this.currentLevel
            };
            window.parent.postMessage(option, "*");

        } catch (err) {
            console.log("Post Message Error: ", err);
        }
    }

    // PostScore(_score, _gameState) {
    //     window.parent.postMessage({
    //         "gameCode": this.gameCode,
    //         "sessionId": this.sessionID,
    //         "score": _score,
    //         "subId": this.subID,
    //         "gamestate": _gameState,
    //         "currlevel": this.currentLevel
    //     }, "*");
    // };

    // GetUrl(apiUrl) {
    //     return this.baseUrl + apiUrl;
    // };

    // PostScore(_score, _gameState) {
    //     let option = {
    //         gameCode: this.gameCode,
    //         sessionId: this.sessionID,
    //         score: _score,
    //         subId: this.subID,
    //         gamestate: _gameState,
    //         currlevel: this.currentLevel
    //     };

    //     let xhttp = new XMLHttpRequest();
    //     xhttp.open("POST", this.GetUrl(this.scoreApi), true);
    //     xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //     xhttp.onreadystatechange = function () {
    //         if (xhttp.readyState == 4 && xhttp.status == 200) {
    //             response = JSON.parse(this.responseText);
    //         } else { }
    //     };
    //     xhttp.send(JSON.stringify(option));
    // };



    IsUrlParamsMissing() {
        // if (!this.language || !this.gameCode || !this.gameState || !this.subId || !this.currentLevel) {
        if (!this.language || !this.gameCode || !this.subId || !this.currentLevel) {
            return true;
        }
        return false;
    };

};

let server = new Server();

export { server as Server };