// import { Model } from "./Model.js";
/**
 * This class used for any interactions between client and server. 
 */
class Server {
    /**
     * Create class instance and fill params from URL or fill it with default values if URL not contain needed data.
     * @constructs
     */
    constructor() {
        this.serverAddress = "http://staging.redappletech.com:5001/api/v1/game-engine/";
        this.urlParams = new URLSearchParams(window.location.search);

        // this.gameId = this.urlParams.get("gameID"); //1
        // this.remoteId = this.urlParams.get("remoteId"); 
        // this.soundStatus = this.urlParams.get("soundStatus");
        // this.musicStatus = this.urlParams.get("musicStatus");
        this.gameId = "1";
        this.remoteId = "https://ultra888.com/_1647950673";
        this.soundStatus = "1";
        this.musicStatus = "1";
        Model.SetSoundStatus(this.soundStatus);
        Model.SetMusicStatus(this.musicStatus);
    };
    //#############################################################################################
    async fetchWithTimeout(resource, options, times = {}) {
        // console.log('Dhukeche');
        const { timeout = 12000 } = times;

        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        const response = await fetch(resource, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(id);
        // console.log('kukur chana ', response)
        return response;
    };

    //#####################################################################

    /**
     * Requests data from server, and call handler function after responce was received. URL contain only
     * needed data - action name and it's params. Static parts or URL stored in class instance.
     * @public
     * @param {string} url - string with action name and params.
     * @param {function} callback - function that will be called with responce as param.
     * @param {object} callbackContext - context for callback function.
     */

    async getData(url, options) {
        try {
            let response = await this.fetchWithTimeout(url, options, {
                timeout: 12000
            });
            return await response.json();
        } catch (err) {
            console.log(`ERROR :: COULD NOT FETCH DATA :`, err);
        }
    };


    // async getData(url, options) {
    //     try {
    //         let response = await fetch(url, options);
    //         return response.json();
    //         // if (response.ok) {
    //         //     return response.json();
    //         // } else {
    //         //     throw new Error("Error in API call")
    //         // }
    //     } catch (err) {
    //         console.log(`ERROR :: COULD NOT FETCH DATA : ${JSON.stringify(err)}`);
    //     }
    // };
    //#############################################################################################
    /**
     * Requests initial data for constant.game. Initial data need to contain paytable, paylines configurations,
     * user balance and available bets range.
     * @public
     * @param {function} callback - handler for initial data. 
     * @param {object} callbackContext - context for handler.
     */
    // getInitialData(callback, callbackContext) {
    //     this.getData("&isGameLogic=1&action=getInitialData", callback, callbackContext);
    // };
    async getInitialData() {
        let reqHeaders = new Headers();
        reqHeaders.append("Content-Type", "application/json");
        let url = this.serverAddress + '?' + `game_id=${this.gameId}&action=getInitialData&remote_id=${this.remoteId}`;
        // let option = {
        //     userId: _userId,
        //     password: _password
        // }
        let requestOptions = {
            method: 'GET',
            // body: JSON.stringify(option),
            headers: reqHeaders
        };
        return (await this.getData(url, requestOptions));
    }

    //#############################################################################################
    /**
     * Requests server to make a spin and pass it result to handler.
     * @public
     * @param {function} callback - handler for spin results.
     * @param {object} callbackContext - context for handler.
     */
    // getSpinResults(callback, callbackContext) {
    //     let lines = Model.getLines();
    //     let coins = Model.getBetPerLine();
    //     let urlStr = "&isGameLogic=1&action=getSpinResult&lines=" + lines + "&coins=" + coins;
    //     this.getData(urlStr, callback, callbackContext);
    // };

    async getSpinResults() {
        let lines = Model.getLines();
        let coins = Model.getBetPerLine();
        // console.log("lines: ", lines)
        // console.log("coins: ", coins)
        let reqHeaders = new Headers();
        reqHeaders.append("Content-Type", "application/json");
        let url = this.serverAddress + '?' + `game_id=${this.gameId}&action=getSpinResult&remote_id=${this.remoteId}&lines=${lines}&coins=${coins}`;

        // let option = {
        //     userId: _userId,
        //     password: _password
        // }
        let requestOptions = {
            method: 'GET',
            // body: JSON.stringify(option),
            headers: reqHeaders
        };
        return (await this.getData(url, requestOptions));
    }

    //#############################################################################################

    isUrlParamsMissing() {
        // if (!this.gameId || !this.remoteId) {
        //     return true;
        // }
        // return false;
        if (!this.gameId || !this.remoteId || !this.soundStatus || !this.musicStatus) {
            return true;
        }
        return false;
    };

};

let server = new Server();

export { server as Server };