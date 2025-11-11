/**
 * This class contain all requests to server. User need just call proper method and pass callback function to it.
 */
function ServerRequests() {
    this.serverAddress = "https://api.gamessecure.com";
    //this.serverAddress = "http://localhost:1337";	
    this.baseInfoGames = "/games/admin?token=test188&isGameLogic=true&game_id=128";
    this.baseInfoCasinos = "/casinos/api?";
    this.queryString = window.location.search;
    this.urlParams = new URLSearchParams(this.queryString);


    this.token = this.urlParams.get('token') == null ? 'test188' : this.urlParams.get('token');
    this.casino = this.urlParams.get('casino') == null ? '5eb1c263849d9136d08f299f' : this.urlParams.get('casino');
    this.remote_id = this.urlParams.get('remote_id') == null ? '147' : this.urlParams.get('remote_id');
    this.currency = this.urlParams.get('currency') == null ? 'EUR' : this.urlParams.get('currency');
    this.mode = this.urlParams.get('mode');

    this.session_id = this.urlParams.get('session_id') == null ? '38432ff064690c9b03da519d0c685b1045451c9e' : this.urlParams.get('session_id');
    this.key = this.urlParams.get('key') == null ? 'BA505C93BC46D04C82265B25FB7E8EF26B048ED3' : this.urlParams.get('key');
};
//#################################################################################################
/**
 * Get data from server using GET method.
 * @param {string} url 
 * @param {function} callback 
 * @param {object} callbackContext 
 */
ServerRequests.prototype.getData = function (url, callback, callbackContext) {
    // fetch(this.serverAddress + url, { method: "GET" })
    // .then( response => response.json() )
    // .then((responseData) => {
    // 	callback.call(callbackContext, responseData);
    // });
    $.ajax({
        url: this.serverAddress + url,
        async: false,
        success: function (responseData) {
            callback.call(callbackContext, responseData);

        }
    });
};
//#################################################################################################

/**
 * Get Balance From Server.
 * @param {function} callback
 * @param {object} callbackContext
 */
ServerRequests.prototype.getBalance = function () {

    //let url = this.baseInfoCasinos + 'action=balance'  + '&token=' +this.token + '&remote_id=' + this.remote_id + '&casino=' + this.casino + '&currency=' + this.currency;

    let userBalances;

    if (this.mode == 'offline') {
        url = this.baseInfoCasinos + 'action=balance' + '&token=' + this.token + '&mode=' + this.mode;
    } else {
        url = this.baseInfoCasinos + 'action=balance' + '&token=' + this.token + '&remote_id=' + this.remote_id + '&casino=' + this.casino + '&currency=' + this.currency;
    }


    $.ajax({
        url: this.serverAddress + url,
        async: false,
        success: function (responseData) {
            userBalances = responseData.balance;
        }
    });
    return userBalances;
};
//#################################################################################################

/**
* send Bet data .
* @param {number} currentBet
* @param {function} callback
* @param {object} callbackContext
*/
ServerRequests.prototype.deductBetAmount = function (currentBet) {

    let url = this.baseInfoCasinos + 'action=debit' + '&action_type=BET' + '&session_id=' + this.session_id + '&amount=' + currentBet + '&token=' + this.token + '&remote_id=' + this.remote_id + '&casino=' + this.casino + '&currency=' + this.currency + '&key=' + this.key;
    let userAmount;

    $.ajax({

        url: this.serverAddress + url,
        dataType: "json",
        async: false,
        success: function (data) {
            userAmount = data.balance;


        }
    });
    return userAmount;
};
//#################################################################################################
/** 
* send Win data .
* @param {number} currentAmt
* @param {function} callback
* @param {object} callbackContext
*/
ServerRequests.prototype.updateWinAmount = function (currentAmt) {

    let url = this.baseInfoCasinos + 'action=credit' + '&action_type=WIN' + '&session_id=' + this.session_id + '&amount=' + currentAmt + '&token=' + this.token + '&remote_id=' + this.remote_id + '&casino=' + this.casino + '&currency=' + this.currency + '&key=' + this.key;

    let userAmount;

    $.ajax({

        url: this.serverAddress + url,
        dataType: "json",
        async: false,
        success: function (data) {
            userAmount = data.balance;


        }
    });
    return userAmount;

};
//#################################################################################################


/** 
* Game Init .
*/
ServerRequests.prototype.getMinWin = function (_aHistory) {


    let url = this.baseInfoGames + '&action=getMinWin&_aHistory=' + _aHistory;
    var self = this;

    $.ajax({
        url: this.serverAddress + url,
        async: false,
        success: function (responseData) {
            self.result = responseData.result;


        }
    });
    return self.result;
};




var serverRequests = new ServerRequests();