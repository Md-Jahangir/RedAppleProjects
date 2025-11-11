/**
 * This class contain all requests to server. User need just call proper method and pass callback function to it.
 */
function ServerRequests() {
	//this.serverAddress = "https://api.gamessecure.com";	
	this.serverAddress = "http://localhost:1337";	
	this.baseInfo = "/games/admin?token=test188&isGameLogic=1&game_id=119";
	this.baseInfoNew = "/casinos/api?";
	this.queryString = window.location.search;
    this.urlParams = new URLSearchParams(this.queryString);
    this.token = this.urlParams.get('token');
    this.casino = this.urlParams.get('casino');
    this.remote_id = this.urlParams.get('remote_id');
    this.currency = this.urlParams.get('currency');
    this.session_id = this.urlParams.get('session_id')==null?'38432ff064690c9b03da519d0c685b1045451c9e':this.urlParams.get('session_id');
    this.key = this.urlParams.get('key')==null?'BA505C93BC46D04C82265B25FB7E8EF26B048ED3':this.urlParams.get('key');
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
	.then( response => response.json() )
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
	this.getData("/translations-blackjacks?token=IDLXNm097e6y4iYqI", callback, callbackContext);
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
	// this.getData(this.baseInfo + "&action=checkPlayerHand&isInsuranceActive=" + isInsuranceActive, callback, callbackContext);
	if(isInsuranceActive)
	{
		this.getData(this.baseInfo + "&action=checkPlayerHand&isInsuranceActive=" + isInsuranceActive, callback, callbackContext);
	}
	else
	{
		this.getData(this.baseInfo + "&action=checkPlayerHand",callback, callbackContext);

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
	// let requestStr = "&action=checkAvailablePlayerActions&isSplitAvailable=" + isSplitAvailable + "&seatCredit=" + seatCredit + "&currentBet=" + currentBet + "&isSplitActive=" + isSplitActive;
	let requestStr;
	// if(isSplitAvailable)
	// {
	//  	requestStr = "&action=checkAvailablePlayerActions&isSplitAvailable=" + isSplitAvailable + "&isSplitActive=" + isSplitActive+ "&seatCredit=" + seatCredit + "&currentBet=" + currentBet ;
	// }
	// else
	// {
	// 	requestStr = "&action=checkAvailablePlayerActions&isSplitActive=" + isSplitActive+ "&seatCredit=" + seatCredit + "&currentBet=" + currentBet ;
	// }
	if(isSplitAvailable)
	{
		if(isSplitActive)
		{
	 		requestStr = "&action=checkAvailablePlayerActions&isSplitAvailable=" + isSplitAvailable + "&isSplitActive=" + isSplitActive+ "&seatCredit=" + seatCredit + "&currentBet=" + currentBet ;
		}
		else
		{
			requestStr = "&action=checkAvailablePlayerActions&isSplitAvailable=" + isSplitAvailable + "&seatCredit=" + seatCredit + "&currentBet=" + currentBet ;
		}
	}
	else
	{
		if(isSplitActive)
		{
			requestStr = "&action=checkAvailablePlayerActions&isSplitActive=" + isSplitActive+ "&seatCredit=" + seatCredit + "&currentBet=" + currentBet ;
		}
		else
		{
			requestStr = "&action=checkAvailablePlayerActions&seatCredit=" + seatCredit + "&currentBet=" + currentBet ;
			
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
	// ServerRequests.prototype.winner = function(currentAmt) {
	//let requestStr = this.baseInfoNew + "action=credit&action_type=WIN&session_id=38432ff064690c9b03da519d0c685b1045451c9e&remote_id=147&amount=" + currentAmt + "&key=BA505C93BC46D04C82265B25FB7E8EF26B048ED3&token=test188&casino=5eb1c263849d9136d08f299f";
	let url = this.baseInfoCasinos + 'action=credit' + '&action_type=WIN' + '&session_id=' +this.session_id +'&amount='+ currentAmt + '&token=' +this.token + '&remote_id=' + this.remote_id + '&casino=' + this.casino + '&currency=' + this.currency + '&key=' +this.key;
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
	//let requestStr = this.baseInfoNew + "action=debit&action_type=BET&session_id=38432ff064690c9b03da519d0c685b1045451c9e&remote_id=147&amount=" + currentBet + "&key=BA505C93BC46D04C82265B25FB7E8EF26B048ED3&token=test188&casino=5eb1c263849d9136d08f299f";
	let url = this.baseInfoCasinos + 'action=debit' + '&action_type=BET' + '&session_id=' +this.session_id +'&amount='+ currentBet + '&token=' +this.token + '&remote_id=' + this.remote_id + '&casino=' + this.casino + '&currency=' + this.currency + '&key=' +this.key;
	this.getData(url, callback, callbackContext);
	};
	//#################################################################################################

var serverRequests = new ServerRequests();