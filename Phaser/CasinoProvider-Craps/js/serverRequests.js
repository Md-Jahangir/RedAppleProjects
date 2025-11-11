/**
 * This class contain all requests to server. User need just call proper method and pass callback function to it.
 */
function ServerRequests() {
    // this.serverAddress = "https://api.casinoinhand.com";
    // this.serverAddress = "http://3.129.109.248:5001/api/v1";
    // this.serverAddress = "https://staging.bets2win.in/gameapi/api/v1";
    this.serverAddress = "https://staginglocal.redappletech.com/bets2win-slotapi/gameapi/api/v1";
    this.baseInfoCasinos = "/casino/api?";
    this.queryString = window.location.search;
    this.urlParams = new URLSearchParams(this.queryString);
    this.mode = this.urlParams.get('mode');
    this.token = this.urlParams.get('token');
    this.casino = this.urlParams.get('casino');
    this.remoteId = this.urlParams.get('remoteId');
    this.currency = this.urlParams.get('currency');
    this.language = this.urlParams.get('language');
    this.gameId = this.urlParams.get('gameID');
    if (this.mode == "offline") {
        this.currency = "fun";
        this.language = "en";
        this.token = "fun";
        this.gameId = "7";
    }

    // console.log("this.mode: ", this.mode);
    // console.log("this.token: ", this.token);
    // console.log("this.casino: ", this.casino);
    // console.log("this.remoteId: ", this.remoteId);
    // console.log("this.currency: ", this.currency);
    // console.log("this.language: ", this.language);
    // console.log("this.gameId: ", this.gameId);

    // this.baseInfoGames = "/games/admin?token=" + this.token + "&isGameLogic=true&game_id=" + this.gameId ;
    this.baseInfoGames = "/game-engine?token=" + this.token + "&isGameLogic=true&game_id=" + this.gameId
        + "&remote_id=" + this.remoteId + "&casino=" + this.casino + "&currency=" + this.currency +
        "&language=" + this.language + "&mode=" + this.mode;


};
//#################################################################################################
/**
 * Get data from server using GET method.
 * @param {string} url 
 * @param {function} callback 
 * @param {object} callbackContext 
 */
ServerRequests.prototype.getData = function (url) {
    $.ajax({
        url: this.serverAddress + url,
        async: false,
        success: function (responseData) {
            result = responseData;
        }
    });

    return result;
};
ServerRequests.prototype.getData2 = function (url, callback, callbackContext) {
    fetch(this.serverAddress + url, { method: "GET" }
    )
        .then(response => response.json(),)
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
ServerRequests.prototype.getTranslations = function (callback, callbackContext) {
    this.getData2("/translations/api?languageABRV=" + this.language + "&game_id=" + this.gameId, callback, callbackContext);
};

ServerRequests.prototype.getBalance = function () {
    let url;
    if (this.mode == 'offline') {
        url = this.baseInfoCasinos + 'action=balance' + '&token=' + this.token + '&mode=' + this.mode;
        console.log("offline");
    } else {
        console.log("online");

        url = this.baseInfoCasinos + 'action=balance' + '&token=' + this.token +
            '&remote_id=' + this.remoteId + '&casino=' + this.casino + '&currency=' + this.currency +
            '&mode=' + this.mode;
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
ServerRequests.prototype.deductBetAmount = function (currentBet, callback, callbackContext) {
    let transactionId = new Date() * 1;

    let url = this.baseInfoCasinos + 'action=debit' + '&action_type=BET'
        + '&session_id=' + this.session_id
        + '&amount=' + currentBet
        + '&token=' + this.token
        + '&remote_id=' + this.remoteId
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
ServerRequests.prototype.updateWinAmount = function (currentAmt, callback, callbackContext) {
    let transactionId = new Date() * 1;

    let url = this.baseInfoCasinos + 'action=credit' + '&action_type=WIN'
        + '&session_id=' + this.session_id
        + '&amount=' + currentAmt
        + '&token=' + this.token
        + '&remote_id=' + this.remoteId
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

ServerRequests.prototype.getBetWinLoss = function (iState, iNumberPoint, szBet) {
    // let url = this.baseInfoGames + '&action=getBetWinLoss&isGameLogic=true&iState=' + iState + "&iNumberPoint=" + iNumberPoint + "&szBet=" + szBet;
    let url = this.baseInfoGames + '&action=getBetWinLoss&iState=' + iState
        + "&iNumberPoint=" + iNumberPoint + "&szBet=" + szBet;
    let resp = this.getData(url);
    return resp;
};
//#################################################################################################

//#################################################################################################

ServerRequests.prototype.checkBetWin = function (iSumDices, iState, iAmountForBet, iNumberPoint, szBet, aDiceResult) {
    let url = this.baseInfoGames + '&action=checkBetWin&iSumDices=' + iSumDices + "&iState="
        + iState + "&szBet=" + szBet + "&iAmountForBet" + iAmountForBet + "&iNumberPoint=" +
        iNumberPoint + "&aDiceResult=" + aDiceResult;
    let resp = this.getData(url);
    return resp;
};
//#################################################################################################

ServerRequests.prototype._generateRandomDices = function () {
    // let url = this.baseInfoGames + "&action=getRandomDices&isGameLogic=true";
    let url = this.baseInfoGames + "&action=getRandomDices";
    let resp = this.getData(url);
    return resp;
};
//#################################################################################################

ServerRequests.prototype._checkHardwayWin = function (szBet) {
    let url = this.baseInfoGames + "&action=checkHardwayWin&szBet=" + szBet;
    let resp = this.getData(url);
    return resp;
};
//#################################################################################################
ServerRequests.prototype.getCurrencies = function () {

    if (!this.currency) {
        this.currency = "KRW";
    }
    let result;
    $.ajax({
        url: this.serverAddress + "/currencies/api?currency_abrv=" + this.currency,
        async: false,
        success: function (responseData) {
            // result = responseData.response;
            result = responseData.data;
        }
    });
    return result;

};
//#################################################################################################

ServerRequests.prototype.getMinMaxBet = function () {
    let url = this.baseInfoGames + "&action=getMinMaxBet&isGameLogic=true&currency=" + this.currency;
    let resp = this.getData(url);
    return resp.result;
}


var serverRequests = new ServerRequests();