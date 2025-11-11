/**
 * This class contain all requests to server. User need just call proper method and pass callback function to it.
 */
function ServerRequests() {
    this.serverAddress = "https://api.gamessecure.com";
    //this.serverAddress = "http://localhost:1337";	
    this.baseInfoGames = "/games/admin?token=test188&isGameLogic=true&game_id=108";
    this.baseInfoCasinos = "/casinos/api?";
    this.queryString = window.location.search;
    this.urlParams = new URLSearchParams(this.queryString);
    this.token = this.urlParams.get('token') == null ? 'test188' : this.urlParams.get('token');
    this.mode = this.urlParams.get('mode');
    this.casino = this.urlParams.get('casino');
    this.remote_id = this.urlParams.get('remote_id');
    this.currency = this.urlParams.get('currency');
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
ServerRequests.prototype.getData = function(url) {
    // fetch(this.serverAddress + url, { method: "GET" })
    //     .then(response => response.json())
    //     .then((responseData) => {
    //         callback.call(callbackContext, responseData);
    //     });
    let result;
        $.ajax({
            url: this.serverAddress + url,         
            async: false,   
            success:function(responseData){                   
                // callback.call(callbackContext, responseData);
                result =  responseData;
                
           }
       });

     return result;
};
//#################################################################################################

/**
 * Get Balance from server.
 * @param {function} callback
 * @param {object} callbackContext
 */
ServerRequests.prototype.getBalance = function() {
    let url;
    if (this.mode == 'offline') {
        url = this.baseInfoCasinos + 'action=balance' + '&token=' + this.token + '&mode=' + this.mode;
    } else {
        url = this.baseInfoCasinos + 'action=balance' + '&token=' + this.token + '&remote_id=' + this.remote_id + '&casino=' + this.casino + '&currency=' + this.currency;
    }
    //let url = this.baseInfoCasinos + 'action=balance'  + '&token=' +this.token + '&remote_id=' + this.remote_id + '&casino=' + this.casino + '&currency=' + this.currency;
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
    //let requestStr = this.baseInfoNew + "action=debit&action_type=BET&session_id=38432ff064690c9b03da519d0c685b1045451c9e&remote_id=147&amount=" + currentBet + "&key=BA505C93BC46D04C82265B25FB7E8EF26B048ED3&token=test188&casino=5eb1c263849d9136d08f299f";
    let url = this.baseInfoCasinos + 'action=debit' + '&action_type=BET' + '&session_id=' + this.session_id + '&amount=' + currentBet + '&token=' + this.token + '&remote_id=' + this.remote_id + '&casino=' + this.casino + '&currency=' + this.currency + '&key=' + this.key;
    // this.getData(url, callback, callbackContext);
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
    // ServerRequests.prototype.winner = function(currentAmt) {
    //let requestStr = this.baseInfoNew + "action=credit&action_type=WIN&session_id=38432ff064690c9b03da519d0c685b1045451c9e&remote_id=147&amount=" + currentAmt + "&key=BA505C93BC46D04C82265B25FB7E8EF26B048ED3&token=test188&casino=5eb1c263849d9136d08f299f";
    let url = this.baseInfoCasinos + 'action=credit' + '&action_type=WIN' + '&session_id=' + this.session_id + '&amount=' + currentAmt + '&token=' + this.token + '&remote_id=' + this.remote_id + '&casino=' + this.casino + '&currency=' + this.currency + '&key=' + this.key;
    // this.getData(url, callback, callbackContext);
    let resp = this.getData(url);
    return resp;
};
//#################################################################################################

//#################################################################################################

 ServerRequests.prototype.getBetWinLoss = function(iState, iNumberPoint, szBet) {
    let url = this.baseInfoGames + '&action=getBetWinLoss&isGameLogic=true&iState=' + iState + "&iNumberPoint=" + iNumberPoint + "&szBet=" + szBet;
    //let url = this.baseInfoCasinos + 'action=balance'  + '&token=' +this.token + '&remote_id=' + this.remote_id + '&casino=' + this.casino + '&currency=' + this.currency;
    let resp = this.getData(url);
    return resp;
};
//#################################################################################################

//#################################################################################################

ServerRequests.prototype.checkBetWin= function(iSumDices, iState, iAmountForBet, iNumberPoint, szBet, aDiceResult) {
    let url = this.baseInfoGames + '&action=checkBetWin&isGameLogic=true&iSumDices=' + iSumDices + "&iState=" + iState + "&szBet=" + szBet + "&iAmountForBet" + iAmountForBet + "&iNumberPoint=" + iNumberPoint + "&aDiceResult=" + aDiceResult;
    //let url = this.baseInfoCasinos + 'action=balance'  + '&token=' +this.token + '&remote_id=' + this.remote_id + '&casino=' + this.casino + '&currency=' + this.currency;
    let resp = this.getData(url);
    return resp;
};
//#################################################################################################

ServerRequests.prototype._generateRandomDices= function() {
    let url = this.baseInfoGames + "&action=getRandomDices&isGameLogic=true";
    //let url = this.baseInfoCasinos + 'action=balance'  + '&token=' +this.token + '&remote_id=' + this.remote_id + '&casino=' + this.casino + '&currency=' + this.currency;
    let resp = this.getData(url);
    return resp;
};
//#################################################################################################

ServerRequests.prototype._checkHardwayWin= function(szBet) {
    let url = this.baseInfoGames + "&action=checkHardwayWin&isGameLogic=true&szBet=" + szBet;
    //let url = this.baseInfoCasinos + 'action=balance'  + '&token=' +this.token + '&remote_id=' + this.remote_id + '&casino=' + this.casino + '&currency=' + this.currency;
    let resp = this.getData(url);
    return resp;
};
//#################################################################################################


var serverRequests = new ServerRequests();