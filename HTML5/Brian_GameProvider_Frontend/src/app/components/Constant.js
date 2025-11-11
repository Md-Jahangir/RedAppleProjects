/********* Script_Details ************
 * @Original_Creator :- Md jahangir.
 * @Created_Date :- 06-03-2023.
 * @Last_Update_By :- Md jahangir.
 * @Last_Updatd_Date :- 09-03-2023
 * @Description :- Handles Global variables that need everywhere.
 ************************************/

import { Utils } from "./Utils.js";

//#region - Class defination 
class Constant {
    /**
    * initializes variables.
    * @Constructor
    */
    constructor() {
        this.videoUrl = "https://kiron.streamamg.com/019/dogs-byzguy4i5nmr0dqqepqo.html";
        this.gameId_VirtualFootball = "";
        this.gameId_PlatinumHounds = "63f36b394f5aac7868502e59";
        this.gameId_DashingDerby = "";
        this.operatorId = null;
        this.playerId = null;
        this.userId = null;
        this.gameId = null;
        this.playerToken = null;
        this.userBalance = null;
        this.currencyCode = null;
        this.languageCode = null;
        this.sessionId = null;
        this.mode = null;
        this.gameType = "platinumhounds";
        this.howManyPrevData = 13;
        this.howManyNextData = 60;
        this.currentServerTime = null;
        this.selectedEvent = null;
        this.betCloseTime = null;
        this.userName = null;
        this.selectedLiveEvent = null;
        this.selectedPreviousEvent = null;
    };

    /**
    * Store creadential data
    * @public 
    * @param {string} _playerToken - player token
    * @param {string} _operatorId - id of the operator
    * @param {string} _gameId - game id 
    * @param {string} _playerId - id of the player
    * @param {string} _userId - id of the user
    * @param {string} _currencyCode - code of currrency 
    * @param {string} _languageCode - language code
    * @param {string} _sessionId - session id of the user
    * @param {string} _userBalanace - balance of the user
    * @param {string} _mode - mode of the game
    * @returns {null} 
    */
    InitializeCredentials(_playerToken, _operatorId, _gameId, _playerId, _userId, _currencyCode, _languageCode, _sessionId, _userBalanace, _mode, _userName) {
        this.operatorId = _operatorId;
        this.playerId = _playerId;
        this.userId = _userId;
        this.gameId = _gameId;
        this.playerToken = _playerToken;
        this.userBalance = parseInt(_userBalanace.replaceAll(",", ""));//_userBalanace;
        this.currencyCode = _currencyCode;
        this.languageCode = _languageCode;
        this.sessionId = _sessionId;
        this.mode = _mode;
        this.userName = _userName;
    };


    /**
    * Set the server time.
    * @returns {null}
    */
    SetServerTime(_data) {
        let data = _data;
        let localtime = data.LocalTime.split("T");
        let temp = localtime[1].split(":");
        this.currentServerTime = Utils.ConvertUtcTimeToLocal(temp[0], temp[1], temp[2]);
    };

    /**
    * Set the selected event obj.
    * @returns {null}
    */
    SetSeletedEvent(_obj) {
        this.selectedEvent = _obj;
    };

    /**
    * Get the selected event obj.
    * @returns {object} selected event
    */
    GetSeletedEvent() {
        return this.selectedEvent;
    };

    SetSelectedLiveEvent(_obj) {
        this.selectedLiveEvent = _obj;
    };
    GetSelectedLiveEvent() {
        return this.selectedLiveEvent;
    };

    SetSelectedPreviousEvent(_obj) {
        this.selectedPreviousEvent = _obj;
    };
    GetSelectedPreviousEvent() {
        return this.selectedPreviousEvent;
    };

    /**
    * Reset the selected event obj.
    * @returns {null}
    */
    ResetSelectedEvent(_obj) {
        this.selectedEvent = _obj;
    };

    /**
    * Get the User balance.
    * @returns {string} balance of the user
    */
    GetUserBalance() {
        return this.userBalance;
    };

    /**
    * Set the User balance.
    * @returns {null}
    */
    SetUserBalance(_amount) {
        this.userBalance = _amount;
    };

    /**
    * Set the bet close time.
    * @returns {null}
    */
    SetBetCloseTime(_time) {
        this.betCloseTime = _time;
    };

    /**
    * Get the bet close time.
    * @returns {null}
    */
    GetBetCloseTime() {
        return this.betCloseTime;
    };

}
//#endregion 
let constant = new Constant();
export { constant as Constant };