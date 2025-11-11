/**
 * This class contain all requests to server. User need just call proper method and pass callback function to it.
 */
function ServerRequests() {
	//this.serverAddress = "http://localhost:1337";
    this.serverAddress = "https://api.gamessecure.com";
    this.baseInfoCasinos = "/casinos/api?";
    this.queryString = window.location.search;
    this.urlParams = new URLSearchParams(this.queryString);
    this.mode = this.urlParams.get('mode');
    this.token = this.urlParams.get('token');
    this.casino = this.urlParams.get('casino');
    this.remote_id = this.urlParams.get('remote_id');
    this.currency = this.urlParams.get('currency');
    this.session_id = this.urlParams.get('session_id');
    this.key = this.urlParams.get('key');
	this.gameId = this.urlParams.get("game_id") || "124";

    if (this.mode == "offline") {
        this.currency = "fun";
        this.language = "en";
        this.token = "fun";
    }

    this.baseInfoGames = "/games/admin?token=" + this.token + "&isGameLogic=true&game_id=" + this.gameId;

};




// !!!
// TODO: why asynchronous method deleted? Need to refactor all methods below to make them asynchronous!!!
// !!!



//#################################################################################################

/**
 * Get data from server using GET method.
 * @param {string} url 
 * @param {function} callback 
 * @param {object} callbackContext 
 */
ServerRequests.prototype.getData = function(url, callback, callbackContext) {
    $.ajax({
        url: this.serverAddress + url,
        async: false,
        success: function(responseData) {
            callback.call(callbackContext, responseData);

        }
    });
};
//#################################################################################################


//#################################################################################################

/**
 * send Bet data .
 * @param {number} currentBet
 * @param {function} callback
 * @param {object} callbackContext
 */
ServerRequests.prototype.deductBetAmount = function(currentBet) {
	let transactionId = new Date() * 1;
    let url = this.baseInfoCasinos + 'action=debit&action_type=BET'
		+ '&session_id=' + this.session_id
		+ '&amount=' + currentBet
		+ '&token=' + this.token
		+ '&remote_id=' + this.remote_id
		+ '&casino=' + this.casino
		+ '&currency=' + this.currency
		+ '&key=' + this.key
		+ "&game_id=" + this.gameId
		+ "&transaction_id=" + transactionId;
		
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
	let transactionId = new Date() * 1;
    let url = this.baseInfoCasinos + 'action=credit&action_type=WIN'
		+ '&session_id=' + this.session_id
		+ '&amount=' + currentAmt
		+ '&token=' + this.token
		+ '&remote_id=' + this.remote_id
		+ '&casino=' + this.casino
		+ '&currency=' + this.currency
		+ '&key=' + this.key
		+ "&game_id=" + this.gameId
		+ "&transaction_id=" + transactionId;

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


//#################################################################################################
/** 
 * Winner Comparing Hands.
 * @param {object} aHandPlayer
 * @param {object} aHandDealer
 * @param {number} iHandPlayerValue
 * @param {number} iHandDealerValue
 * @param {function} callback
 * @param {object} callbackContext
 */
ServerRequests.prototype.winnerComparingHands = function(aHandPlayer, aHandDealer, iHandPlayerValue, iHandDealerValue) {

    aHandPlayer = JSON.stringify(aHandPlayer);
    aHandDealer = JSON.stringify(aHandDealer);
    let url = this.baseInfoGames + '&action=getWinnerComparingHands' + '&aHandPlayer=' + aHandPlayer + '&aHandDealer=' + aHandDealer + '&iHandPlayerValue=' + iHandPlayerValue + '&iHandDealerValue=' + iHandDealerValue;
    var self = this;

    $.ajax({
        url: this.serverAddress + url,
        async: false,
        success: function(responseData) {
            self.result = responseData;



        }
    });
    return self.result;
};

//#################################################################################################
/** 
 * Getting Shuffled Card Deck .
 */
ServerRequests.prototype.getShuffledCardDeck = function() {


    let url = this.baseInfoGames + '&action=getShuffledCardDeck';
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



//#################################################################################################
/** 
 * Getting Index For Fiches .
 * @param {number} iValue
 */
ServerRequests.prototype.getIndexForFiches = function(iValue) {


    let url = this.baseInfoGames + '&action=getIndexForFiches&iValue=' + iValue;
    var self = this;
    var res;

    $.ajax({
        url: this.serverAddress + url,
        async: false,
        success: function(responseData) {
            res = responseData.result;


        }
    });
    return res;
};

/** 
 * Generate Random Player Cards .
 */
ServerRequests.prototype._generateRandPlayerCards = function() {


    let url = this.baseInfoGames + '&action=_generateRandPlayerCards';
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
 * Generate Random Dealer Cards .
 */
ServerRequests.prototype._generateRandDealerCards = function() {


    let url = this.baseInfoGames + '&action=_generateRandDealerCards';
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

var serverRequests = new ServerRequests();