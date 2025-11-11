/**
 * This class contain all requests to server. User need just call proper method and pass callback function to it.
 */
function ServerRequests() {
    this.serverAddress = "https://api.casinoinhand.com";
    this.baseInfoCasinos = "/casinos/api?";
    this.queryString = window.location.search;
    this.urlParams = new URLSearchParams(this.queryString);
    this.token = this.urlParams.get('token');
    this.mode = this.urlParams.get('mode');
    this.casino = this.urlParams.get('casino');
    this.remote_id = this.urlParams.get('remote_id');
    this.currency = this.urlParams.get('currency') || 'USD';
    this.session_id = this.urlParams.get('session_id');
    this.key = this.urlParams.get('key');
    this.language = this.urlParams.get('language');
    this.game_id = 122;
    if (this.mode == "offline") {
        this.currency = "fun";
        this.language = "en";
        this.token = "fun";
    }
    this.baseInfoGames = "/games/admin?token=" + this.token + "&isGameLogic=true&game_id=" + this.game_id;


};
//#################################################################################################
/**
 * Get data from server using GET method.
 * @param {string} url 
 * @param {function} callback 
 * @param {object} callbackContext 
 */
ServerRequests.prototype.getData = function(url) {
    $.ajax({
        url: this.serverAddress + url,
        async: false,
        success: function(responseData) {
            result = responseData;
        }
    });

    return result;
};
ServerRequests.prototype.getData2 = function(url, callback, callbackContext) {
    fetch(this.serverAddress + url, { method: "GET" })
        .then(response => response.json())
        .then((responseData) => {
            callback.call(callbackContext, responseData);
        });
};
//#################################################################################################

/**
 * Get Balance from server.
 * @param {function} callback
 * @param {object} callbackContext
 */
if (!this.language) {
    this.language = "en";
}
ServerRequests.prototype.getTranslations = function(callback, callbackContext) {
    this.getData2("/translations/api?language_ABRV=" + this.language, callback, callbackContext);
};

ServerRequests.prototype.getBalance = function() {
    let url;
    if (this.mode == 'offline') {
        url = this.baseInfoCasinos + 'action=balance' + '&token=' + this.token + '&mode=' + this.mode;
    } else {
        url = this.baseInfoCasinos + 'action=balance' + '&token=' + this.token + '&remote_id=' + this.remote_id + '&casino=' + this.casino + '&currency=' + this.currency;
    }
    let resp = this.getData(url);
    return resp;
};
//#################################################################################################

/**
 * send Bet data .
 * @param {number} currentBet
 * @param {function} callback
 * @param {object} callbackContext
 */
ServerRequests.prototype.deductBetAmount = function(currentBet, callback, callbackContext) {
    let transactionId = new Date() * 1;

    let url = this.baseInfoCasinos + 'action=debit' + '&action_type=BET' 
    + '&session_id=' + this.session_id 
    + '&amount=' + currentBet 
    + '&token=' + this.token 
    + '&remote_id=' + this.remote_id 
    + '&casino=' + this.casino 
    + '&currency=' + this.currency 
    + '&key=' + this.key
    + "&game_id=" + this.gameId
    + "&transaction_id=" + transactionId;
    let resp = this.getData(url);
    return resp;
};
//#################################################################################################
/** 
 * send Win data .
 * @param {number} currentAmt
 * @param {function} callback
 * @param {object} callbackContext
 */
ServerRequests.prototype.updateWinAmount = function(currentAmt, callback, callbackContext) {
    let transactionId = new Date() * 1;

    let url = this.baseInfoCasinos + 'action=credit' + '&action_type=WIN' 
    + '&session_id=' + this.session_id 
    + '&amount=' + currentAmt 
    + '&token=' + this.token 
    + '&remote_id=' + this.remote_id 
    + '&casino=' + this.casino 
    + '&currency=' + this.currency 
    + '&key=' + this.key 
    + "&game_id=" + this.gameId
    + "&transaction_id=" + transactionId;
    let resp = this.getData(url);
    return resp;
};
//#################################################################################################

//#################################################################################################

ServerRequests.prototype.getBetWinLoss = function(iState, iNumberPoint, szBet) {
    let url = this.baseInfoGames + '&action=getBetWinLoss&isGameLogic=true&iState=' + iState + "&iNumberPoint=" + iNumberPoint + "&szBet=" + szBet;
    let resp = this.getData(url);
    return resp;
};
//#################################################################################################

//#################################################################################################

ServerRequests.prototype.checkBetWin = function(iSumDices, iState, iAmountForBet, iNumberPoint, szBet, aDiceResult) {
    let url = this.baseInfoGames + '&action=checkBetWin&isGameLogic=true&iSumDices=' + iSumDices + "&iState=" + iState + "&szBet=" + szBet + "&iAmountForBet" + iAmountForBet + "&iNumberPoint=" + iNumberPoint + "&aDiceResult=" + aDiceResult;
    let resp = this.getData(url);
    return resp;
};
//#################################################################################################

ServerRequests.prototype._generateRandomDices = function() {
    let url = this.baseInfoGames + "&action=getRandomDices&isGameLogic=true";
    let resp = this.getData(url);
    return resp;
};
//#################################################################################################

ServerRequests.prototype._checkHardwayWin = function(szBet) {
    let url = this.baseInfoGames + "&action=checkHardwayWin&isGameLogic=true&szBet=" + szBet;
    let resp = this.getData(url);
    return resp;
};
//#################################################################################################
ServerRequests.prototype.getCurrencies = function() {

    if (!this.currency) {
        this.currency = "USD";
    }
    let result;
    $.ajax({
        url: this.serverAddress + "/currencies/api?currency_abrv=" + this.currency,
        async: false,
        success: function(responseData) {
            result = responseData.response;
        }
    });
    return result;

};
//#################################################################################################

ServerRequests.prototype.getMinMaxBet = function() {
    let url = this.baseInfoGames + "&action=getMinMaxBet&isGameLogic=true&currency=" + this.currency;
    let resp = this.getData(url);
    return resp.result;
}


var serverRequests = new ServerRequests();