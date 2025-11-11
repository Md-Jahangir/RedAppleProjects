/**
 * This class contain all requests to server. User need just call proper method and pass callback function to it.
 */
function ServerRequests() {
    //this.serverAddress = "https://dev.gamessecure.com";
     this.serverAddress = "https://api.gamessecure.com";
    this.baseInfoCasinos = "/casinos/api?";
    this.queryString = window.location.search;
    this.urlParams = new URLSearchParams(this.queryString);
    this.token = this.urlParams.get('token');
    this.casino = this.urlParams.get('casino');
    this.remote_id = this.urlParams.get('remote_id');
    this.currency = this.urlParams.get('currency');
    this.language = this.urlParams.get('language');
    this.session_id = this.urlParams.get('session_id');
    this.key = this.urlParams.get('key');
    this.mode = this.urlParams.get('mode');
    this.gameId = 131;

    if (this.mode == "offline") {
        this.currency = "fun";
        this.language = "en";
        this.token = "fun";
    }

    this.baseInfo = "/games/admin?token=" + this.token + "&isGameLogic=1&game_id=" + this.gameId;
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

ServerRequests.prototype.getDataSync = function(url) {
    $.ajax({
        url: this.serverAddress + url,
        async: false,
        success: function(responseData) {
            result = responseData;
        }
    });

    return result;
};
//#################################################################################################

ServerRequests.prototype.getBalance = function() {
    let url;
    if (this.mode == 'offline') {
        url = this.baseInfoCasinos + 'action=balance' + '&token=' + this.token + '&mode=' + this.mode;
    } else {
        url = this.baseInfoCasinos + 'action=balance' + '&token=' + this.token + '&remote_id=' + this.remote_id + '&casino=' + this.casino + '&currency=' + this.currency;
    }
    let resp = this.getDataSync(url);
    return resp;
};

//################################################################################################
//#################################################################################################
/**
 * Get translations from server.
 * @param {function} callback
 * @param {object} callbackContext
 */
ServerRequests.prototype.getTranslations = function(callback, callbackContext) {
    if (!this.language) {
        this.language = "en";
    }
    this.getData("/translations/api?languageABRV=" + this.language, callback, callbackContext);
};

//#################################################################################################
/**
 * Ask server to prepare auto deal first cards.
 * @param {number} cash 
 * @param {number} currentBet 
 * @param {function} callback 
 * @param {object} callbackContext 
 */
ServerRequests.prototype.prepareDealing = function(cash, currentBet, callback, callbackContext) {
    let requestStr = this.baseInfo + "&action=prepareDealing&cash=" + cash + "&currentBet=" + currentBet;
    this.getData(requestStr, callback, callbackContext);
};
//#################################################################################################
/**
 * Get card for dealer during first deal.
 * @param {function} callback 
 * @param {object} callbackContext 
 */
ServerRequests.prototype.getCardForDealerAuto = function(callback, callbackContext) {
    this.getData(this.baseInfo + "&action=getCardForDealerAuto", callback, callbackContext);
};
//#################################################################################################
/**
 * Get card for player during first deal.
 * @param {function} callback 
 * @param {object} callbackContext 
 */
ServerRequests.prototype.getCardForPlayerAuto = function(callback, callbackContext) {
    this.getData(this.baseInfo + "&action=getCardForPlayerAuto", callback, callbackContext);
};
//#################################################################################################
/**
 * Reset all data.
 * @param {boolean} isFirstPlay 
 * @param {function} callback 
 * @param {object} callbackContext 
 */
ServerRequests.prototype.reset = function(isFirstPlay, callback, callbackContext) {
    this.getData(this.baseInfo + "&action=reset&isFirstPlay=" + isFirstPlay, callback, callbackContext);
};
//#################################################################################################
/**
 * Get card for dealer when player STAND.
 * @param {function} callback 
 * @param {object} callbackContext 
 */
ServerRequests.prototype.getCardForDealer = function(callback, callbackContext) {
    this.getData(this.baseInfo + "&action=getCardForDealer", callback, callbackContext);
};
//#################################################################################################
/**
 * Get card for player, when player HIT.
 * @param {function} callback 
 * @param {object} callbackContext 
 */
ServerRequests.prototype.getCardForPlayer = function(callback, callbackContext) {
    this.getData(this.baseInfo + "&action=getCardForPlayer", callback, callbackContext);
};
//#################################################################################################
/**
 * Check dealing result for dealer (only during dealer's turn).
 * @param {function} callback 
 * @param {object} callbackContext 
 */
ServerRequests.prototype.checkDealerHand = function(callback, callbackContext) {
    this.getData(this.baseInfo + "&action=checkDealerHand", callback, callbackContext);
};
//#################################################################################################
/**
 * Check dealing results for player (during player turn).
 * @param {boolean} isInsuranceActive 
 * @param {function} callback 
 * @param {object} callbackContext 
 */
ServerRequests.prototype.checkPlayerHand = function(isInsuranceActive, callback, callbackContext) {
    if (isInsuranceActive) {
        this.getData(this.baseInfo + "&action=checkPlayerHand&isInsuranceActive=" + isInsuranceActive, callback, callbackContext);
    } else {
        this.getData(this.baseInfo + "&action=checkPlayerHand", callback, callbackContext);
    }
};
//#################################################################################################
/**
 * Check dealing results for player (during player turn).
 * @param {boolean} isInsuranceActive 
 * @param {function} callback 
 * @param {object} callbackContext 
 */
ServerRequests.prototype.checkPlayerSplitHand = function(isInsuranceActive, callback, callbackContext) {
    if (isInsuranceActive) {
        this.getData(this.baseInfo + "&action=checkPlayerSplitHand&isInsuranceActive=" + isInsuranceActive, callback, callbackContext);
    } else {
        this.getData(this.baseInfo + "&action=checkPlayerSplitHand", callback, callbackContext);
    }
};
//#################################################################################################
/**
 * Ask server for available player actions.
 * @param {boolean} isSplitAvailable 
 * @param {boolean} isSplitActive
 * @param {number} seatCredit 
 * @param {number} currentBet  
 * @param {function} callback 
 * @param {object} callbackContext 
 */
ServerRequests.prototype.checkAvailablePlayerActions = function(isSplitAvailable, isSplitActive, seatCredit, currentBet, callback, callbackContext) {
    let requestStr;

    if (isSplitAvailable) {
        if (isSplitActive) {
            requestStr = "&action=checkAvailablePlayerActions&isSplitAvailable=" + isSplitAvailable + "&isSplitActive=" + isSplitActive + "&seatCredit=" + seatCredit + "&currentBet=" + currentBet;
        } else {
            requestStr = "&action=checkAvailablePlayerActions&isSplitAvailable=" + isSplitAvailable + "&seatCredit=" + seatCredit + "&currentBet=" + currentBet;
        }
    } else {
        if (isSplitActive) {
            requestStr = "&action=checkAvailablePlayerActions&isSplitActive=" + isSplitActive + "&seatCredit=" + seatCredit + "&currentBet=" + currentBet;
        } else {
            requestStr = "&action=checkAvailablePlayerActions&seatCredit=" + seatCredit + "&currentBet=" + currentBet;
        }
    }
    this.getData(this.baseInfo + requestStr, callback, callbackContext);
}

//#################################################################################################
/**
 * send Win data .
 * @param {number} currentAmt
 * @param {function} callback
 * @param {object} callbackContext
 */
ServerRequests.prototype.winner = function(currentAmt, callback, callbackContext) {
    let transactionId = new Date() * 1;
s
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
    this.getData(url, callback, callbackContext);
};
//#################################################################################################

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
    this.getData(url, callback, callbackContext);
};
//#################################################################################################


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
            // callback.call(callbackContext, responseData);
            result = responseData.response;
        }
    });

    return result;
};
//#################################################################################################

//#################################################################################################
/**
 * send Split data .
 * @param {function} callback
 * @param {object} callbackContext
 */
ServerRequests.prototype.getSplit = function(callback, callbackContext) {
    let url = this.baseInfo + '&action=getSplit';
    this.getData(url, callback, callbackContext);
};
//#################################################################################################

//#################################################################################################
/**
 * send Stand data .
 * @param {function} callback
 * @param {object} callbackContext
 */
// ServerRequests.prototype.getStand = function(callback, callbackContext) {
ServerRequests.prototype.getStand = function() {
    let result;
    $.ajax({
        url: this.serverAddress + this.baseInfo + "&action=getStand",
        async: false,
        success: function(responseData) {
            result = responseData;

        }
    });

    return result;
};
//#################################################################################################
//#################################################################################################

ServerRequests.prototype.getMinMaxBet = function() {
    let url = this.baseInfo + "&action=getMinMaxBet&currency=" + this.currency;
    let resp = this.getDataSync(url);
    return resp.result;
};
//#################################################################################################

//#################################################################################################

ServerRequests.prototype.gameInit = function() {
    let url = this.baseInfo + "&action=gameInit";
    let resp = this.getDataSync(url);
    return resp.result;
};
//#################################################################################################

var serverRequests = new ServerRequests();