import { Model } from "./Model";

/**
 * This class contain all requests to server. User need just call proper method and pass callback function to it.
 */
class Server {
    constructor() {
        this.baseInfoCasinos = "/casinos/api?";
        this.queryString = window.location.search;
        this.urlParams = new URLSearchParams(this.queryString);
        this.language = this.urlParams.get('language') || 'en';
        this.mode = this.urlParams.get('mode');
        this.token = this.urlParams.get('token');
        this.casino = this.urlParams.get('casino');
        this.remote_id = this.urlParams.get('remote_id');
        this.currency = this.urlParams.get('currency') || 'USD';
        this.session_id = this.urlParams.get('session_id');
        this.game_id = "7";

        this.serverAddress = "https://api.bets2win.in/gameapi";

        if (this.mode == "offline") {
            this.currency = "$";
            this.token = "fun";
            this.gameId = "7";
            this.remote_id = "2243410159";
        }

        this.baseInfoGames = "/api/v1/casino/api/?isGameLogic=1&token=" + this.token +
            "&mode=" + this.mode +
            "&game_id=" + this.game_id +
            "&casino=" + this.casino +
            "&remote_id=" + this.remote_id +
            "&currency=" + this.currency +
            "&language=" + this.language;
    }


    //#################################################################################################
    /**
     * Get data from server using GET method.
     * @param {string} url 
     * @param {function} callback 
     * @param {object} callbackContext 
     */
    async getData(url, callback, callbackContext) {
        const responseData = await fetch(this.serverAddress + url, { method: "GET" })
            .then(response => response.json());
        if (callback) {
            callback.call(callbackContext, responseData);
        } else {
            return responseData.response;
        }
    };
    //#################################################################################################

    /**
     * Get Balance From Server.
     * @param {function} callback
     * @param {object} callbackContext
     */
    async getBalance(callback, callbackContext) {
        let userBalances;
        userBalances = await this.getData(this.baseInfoGames + "&action=" + 'balance', callback, callbackContext);
        return userBalances;
    };
    //#################################################################################################

    /**
    * send Bet data .
    * @param {number} currentBet
    * @param {function} callback
    * @param {object} callbackContext
    */
    // deductBetAmount(currentBet) {

    //     // let url = this.baseInfoCasinos + 'action=debit' + '&action_type=BET' + '&session_id=' + this.session_id + '&amount=' + currentBet + '&token=' + this.token + '&remote_id=' + this.remote_id + '&casino=' + this.casino + '&currency=' + this.currency + '&key=' + this.key;
    //     let url = this.baseInfoCasinos + 'action=debit' + '&amount=' + currentBet + '&token=' + this.token + '&remote_id=' + this.remoteId + '&casino=' + this.casino + '&currency=' + this.currency + '&game_id=' + this.gameId + '&mode=' + this.mode;
    //     let userAmount;

    //     $.ajax({

    //         url: this.serverAddress + url,
    //         dataType: "json",
    //         async: false,
    //         success: function (data) {
    //             userAmount = data.balance;


    //         }
    //     });

    //     return userAmount;
    // };
    // //#################################################################################################
    // /** 
    // * send Win data .
    // * @param {number} currentAmt
    // * @param {function} callback
    // * @param {object} callbackContext
    // */
    // updateWinAmount(currentAmt) {

    //     let url = this.baseInfoCasinos + 'action=credit' + '&amount=' + currentAmt + '&token=' + this.token + '&remote_id=' + this.remoteId + '&casino=' + this.casino + '&currency=' + this.currency + '&game_id=' + this.gameId + '&mode=' + this.mode;

    //     let userAmount;

    //     $.ajax({

    //         url: this.serverAddress + url,
    //         dataType: "json",
    //         async: false,
    //         success: function (data) {
    //             userAmount = data.balance;


    //         }
    //     });
    //     return userAmount;

    // };
    // //#################################################################################################


    // /** 
    // * Game Init .
    // */
    // getMinWin(_aHistory) {


    //     let url = this.baseInfoGames + '&action=getMinWin&_aHistory=' + _aHistory;
    //     var self = this;

    //     $.ajax({
    //         url: this.serverAddress + url,
    //         async: false,
    //         success: function (responseData) {
    //             self.result = responseData.result;


    //         }
    //     });
    //     return self.result;
    // };


}
var serverRequests = new Server();
export { serverRequests as Server };