/**
 * This class contain all requests to server. User need just call proper method and pass callback function to it.
 */
function ServerRequests() {
    // this.serverAddress = "https://api.gamessecure.com";
    this.serverAddress = "https://dev.gamessecure.com";
    this.baseInfoCasinos = "/casinos/api?";
    this.queryString = window.location.search;
    this.urlParams = new URLSearchParams(this.queryString);

    this.token = this.urlParams.get('token');
    this.casino = this.urlParams.get('casino');
    this.remote_id = this.urlParams.get('remote_id');
    this.currency = this.urlParams.get('currency');
    this.language = this.urlParams.get('language');
    this.mode = this.urlParams.get('mode');
    this.session_id = this.urlParams.get('session_id');
    this.key = this.urlParams.get('key');

    if (this.mode == "offline") {
        this.currency = "fun";
        this.language = "en";
        this.token = "fun";
    }
    this.baseInfoGames = "/games/admin?token=" + this.token + "&isGameLogic=true&game_id=130";



};
//#################################################################################################
/**
 * Get data from server using GET method.
 * @param {string} url 
 * @param {function} callback 
 * @param {object} callbackContext 
 */
ServerRequests.prototype.getData = function(url, callback, callbackContext) {
    fetch(this.serverAddress + url, { method: "GET" })
        .then(response => response.json())
        .then((responseData) => {
            callback.call(callbackContext, responseData);
        });
};

//#################################################################################################
/**
 * Get translations from server.
 * @param {function} callback
 * @param {object} callbackContext
 */
ServerRequests.prototype.getTranslations = function(callback, callbackContext) {
    //translations
    if (!this.language) {
        this.language = "en";
    }
    this.getData("/translations/api?languageABRV=" + this.language, callback, callbackContext);
};

//#################################################################################################
/**
 * Get Balance From Server.
 * @param {function} callback
 * @param {object} callbackContext
 */
ServerRequests.prototype.getBalance = function() {
    let userBalances;

    if (this.mode == 'offline') {
        url = this.baseInfoCasinos + 'action=balance' + '&token=' + this.token + '&mode=' + this.mode;
    } else {
        url = this.baseInfoCasinos + 'action=balance' + '&token=' + this.token + '&remote_id=' + this.remote_id + '&casino=' + this.casino + '&currency=' + this.currency;
    }


    $.ajax({
        url: this.serverAddress + url,
        async: false,
        success: function(responseData) {
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
ServerRequests.prototype.deductBetAmount = function(currentBet) {

    let url = this.baseInfoCasinos + 'action=debit' + '&action_type=BET' + '&session_id=' + this.session_id + '&amount=' + currentBet + '&token=' + this.token + '&remote_id=' + this.remote_id + '&casino=' + this.casino + '&currency=' + this.currency + '&key=' + this.key;
    let userAmount;

    $.ajax({

        url: this.serverAddress + url,
        dataType: "json",
        async: false,
        success: function(data) {
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
ServerRequests.prototype.updateWinAmount = function(currentAmt) {

    let url = this.baseInfoCasinos + 'action=credit' + '&action_type=WIN' + '&session_id=' + this.session_id + '&amount=' + currentAmt + '&token=' + this.token + '&remote_id=' + this.remote_id + '&casino=' + this.casino + '&currency=' + this.currency + '&key=' + this.key;

    let userAmount;

    $.ajax({

        url: this.serverAddress + url,
        dataType: "json",
        async: false,
        success: function(data) {
            userAmount = data.balance;
        }
    });
    return userAmount;

};
//#################################################################################################


/** 
 * Game Init .
 */
// ServerRequests.prototype.gameInitData = function() {

//     let url = this.baseInfoGames + '&action=gameInitData';
//     var self = this;

//     $.ajax({
//         url: this.serverAddress + url,
//         async: false,
//         success: function(responseData) {
//             self.result = responseData.result;
//         }
//     });
//     return self.result;
// };

ServerRequests.prototype.gameInitData = function(min_bet, max_bet, money) {

    let url = this.baseInfoGames + '&action=gameInitData&min_bet=' + min_bet + '&max_bet=' + max_bet + '&money=' + money;
    var self = this;

    $.ajax({
        url: this.serverAddress + url,
        async: false,
        success: function(responseData) {
            self.result = responseData.result;
        }
    });
    return self.result;
};

/** 
 * Game Winloss .
 */
ServerRequests.prototype.gameWinLoss = function(_sid, _bettedFiches, _numberSelected, callback, callbackContext) {

    let url = this.baseInfoGames + '&action=gameWinLoss&_sid=' + _sid + '&_bettedFiches=' + _bettedFiches + '&_numberSelected=' + _numberSelected;
    var self = this;

    $.ajax({
        url: this.serverAddress + url,
        async: false,
        success: function(responseData) {
            self.result = responseData.result;
            callback.call(callbackContext, responseData);
        }
    });
    return self.result;
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

var serverRequests = new ServerRequests();