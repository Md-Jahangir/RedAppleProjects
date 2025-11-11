
/********* Script_Details ************
 * @Original_Creator :- Faiz_Ahmad.
 * @Created_Date :- 27-09-2022.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 12-05-2023
 * @Description :- This class used for any interactions between client and server.
 ************************************/

//#region - Class defination 
class Server {
    /**
     * Create class instance and fill params from URL or fill it with default values if URL not contain needed data.
     * @constructs
    */
    constructor() {
        //================Platform API URL================================
        this.urlParams = new URLSearchParams(window.location.search);
        this.token = this.urlParams.get("token");
        // this.baseUrl = "http://16.162.71.88:3004/api/v1/";//New structure
        this.baseUrl = "https://gameapi.krnasia.com/api/v1/";//Live-Production
        // this.baseUrl = "https://gameapistg.krnasia.com/api/v1/";//Live-Staging

        this.userAuthenticationUrlApi = "auth";
        this.getUserBalanceUrlApi = "getbalance";
        this.multiBetPlaceUrlApi = "multiplebetplace";
        this.howManyPreviousAndNextEventApi = "previousandnexteventsjson";
        this.sessionBetsApi = "sessionbets";
        this.betConfigApi = "betconfig";///have to send in same pattern
        this.game24HoursEventDataApi = "eventsby24hoursjson";
        this.serverTimeApi = "servertimejson";
        this.raceEventCombinationOddsApi = "raceeventcombinationoddsjson/";
        this.raceEventSingleOddsApi = "singleodds/";
        this.specificEventResultApi = "getspecificeventsjson/";///have to send in same pattern
        this.resultApi = "results";
        this.eventResultUrlApi = "eventhistory";
        this.sessionEventNumberList = "sessionevents/";
        this.gameLaunchUrl = "getgamelaunchurl";
        this.allGameListApi = "gameplay/getgamelist/";
        this.playerRatingApi = "playerrating/";
        this.pastEventHistoryApi = "pasteventresulthistory";
        this.playerRankApi = "playerrank";
        //================================================================
    };

    //##########################################################################
    //#region PLATFORM API'S-------------------------

    /**
     * Requests data from server, and call handler function after responce was received. URL contain only
     * needed data - action name and it's params. Static parts or URL stored in class instance.
     * @public
     * @param {string} url - string with action name and params.
     * @param {function} callback - function that will be called with responce as param.
     * @returns {object} response in json format.
    **
    ****/
    async getData(url, options) {
        try {
            let response = await (await fetch(url, options)).json();
            switch (true) {
                case (response.status == 404):
                    throw new Error(response.message);
                    break;
                case (response.status == 401):
                    throw new Error(response.message);
                    break;
                case (response.status == "400"):
                    throw new Error(response.message);
                    break;
                case (response.error):
                    throw new Error(response.message);
                    break;
                default:
                    return response;
            }
        } catch (err) {
            throw new Error(err.message);
        }
    };

    /***
     * User authentiction is done with token and operator id
     * @public
     * @param {string} _token - authenticatication token for user. 
     * @returns {object} returns obejct {
            "PlayerID": id of the player,
            "CurrencyCode": currency will be used in game,
            "LanguageCode": language will be used in game,
            "Code": status code,
            "Status": status(valid / Invalid)
        }.
    ***/
    async TokenAuthentication(_token) {
        try {
            let reqHeaders = new Headers();
            reqHeaders.append("Content-Type", "application/json");
            let url = this.baseUrl + this.userAuthenticationUrlApi + "?token=" + _token;
            let requestOptions = {
                method: 'POST',
                headers: reqHeaders,
            };
            return (await this.getData(url, requestOptions));
        } catch (err) {
            console.log("TokenAuthentication error : ", err);
        }
    };

    /***
     * Recieves user balance
     * @public
     * @param {string} _playerToken - authenticatication token for user. 
     * @param {string} _operatorId - id of the operator. .
     * @param {string} _playerId - authenticatication token for user. 
     * @param {string} _currencyCode - id of the operator. 
     * @param {string} _sessionId - session id for the user. 
     * @returns {object} returns obejct {
        "Amount": user balnce ,
        "Code": status code,
        "Status": status of api call
    }
    ***/
    async GetUserBalance(_playerToken, _operatorId, _playerId, _currencyCode, _sessionId) {
        try {
            let reqHeaders = new Headers();
            reqHeaders.append("Content-Type", "application/json");
            reqHeaders.append("operator_id", _operatorId);
            reqHeaders.append("token", this.token);
            let option = {
                PlayerToken: _playerToken.toString(),
                PlayerID: _playerId.toString(),
                CurrencyCode: _currencyCode.toString()
            };
            let url = this.baseUrl + this.getUserBalanceUrlApi + "?session_id=" + _sessionId;
            let requestOptions = {
                method: 'POST',
                headers: reqHeaders,
                body: JSON.stringify(option)
            };
            return (await this.getData(url, requestOptions));
        } catch (err) {
            console.log("GetUserBalance Error: ", err);
        }
    };

    /***
 * Place Multi bet for the race number
 * @public
 * @param {string} _operatorId - id of the operator. 
 * @param {Array} _dataArray - all the data for multi bet. 
  
 * @returns {object} returns obejct {
    "error": true/false,
    "message": transaction message,
    "data": {
        "KironTransactionId": id,
        "PlatformTransactionId": id,
        "Message": transaction message,
        "SlipID": id,
        "Total_Amount": total amount for bet
    }
}
***/
    async PlaceMultiBet(_operatorId, _dataArray) {
        let reqHeaders = new Headers();
        reqHeaders.append("Content-Type", "application/json");
        reqHeaders.append("operator_id", _operatorId);
        reqHeaders.append("token", this.token);
        let url = this.baseUrl + this.multiBetPlaceUrlApi;
        let requestOptions = {
            method: 'POST',
            headers: reqHeaders,
            body: JSON.stringify(_dataArray)
        };
        return (await this.getData(url, requestOptions));
    };

    /**
    * Get how many previous and next event.
    * @public 
    * @param {Number} _howManyPrevious - total number of the past event.
    * @param {Number} __howManyNext - total number of the future event.
    * @param {string} _sessionId - session id for the user.
    * @param {String} _gameType - type of the game.
    * @returns {Object} - all event data from KIRON Api's.
    */
    async HowManyPreviousNextEvents(_howManyPrevious, __howManyNext, _sessionId, _gameType) {
        try {
            let reqHeaders = new Headers();
            reqHeaders.append("Content-Type", "application/json");
            reqHeaders.append("token", this.token);
            let url = this.baseUrl + this.howManyPreviousAndNextEventApi + "?howmanyprevious=" + _howManyPrevious + "&howmanynext=" + __howManyNext + "&session_id=" + _sessionId + "&type=" + _gameType;
            let requestOptions = {
                method: 'GET',
                headers: reqHeaders,
            };
            return (await this.getData(url, requestOptions));
        } catch (error) {
            console.log("error----", error);
        }
    };

    /***
     * Get all the session bets available
     * @public
     * @param {string} _sessionId - session id for the user. 
     * @param {string} _gameId - game id for the particular game. 
     * @returns {object} 
    ***/
    async GetSessionBets(_sessionId, _gameId) {
        try {
            let reqHeaders = new Headers();
            reqHeaders.append("Content-Type", "application/json");
            reqHeaders.append("token", this.token);
            let url = this.baseUrl + this.sessionBetsApi + "?session_id=" + _sessionId + "&game_id=" + _gameId;
            let requestOptions = {
                method: 'GET',
                headers: reqHeaders
            };
            return (await this.getData(url, requestOptions));
        } catch (error) {
            console.log("error----", error);
        }
    };

    /***
     * Handle bet configuartion
     * @public
     * @param {string} _operatorId - operator id. 
     * @param {string} _gameId - game id for the particular game. 
     * @param {string} _userId - user id. 
     * @param {string} _sessionId - session id for the user. 
     * @returns {object} 
    ***/
    async GetBetConfiguration(_operatorId, _gameId, _userId, _sessionId) {
        try {
            let reqHeaders = new Headers();
            reqHeaders.append("Content-Type", "application/json");
            reqHeaders.append("token", this.token);
            let url = this.baseUrl + this.betConfigApi + "?operator_id=" + _operatorId + "&game_id=" + _gameId + "&user_id=" + _userId + "&session_id=" + _sessionId;
            let requestOptions = {
                method: 'GET',
                headers: reqHeaders
            };
            return (await this.getData(url, requestOptions));
        } catch (error) {
            console.log("error----", error);
        }
    };

    /**
    * Get all the deatils(bet win amount etc.) for particular event number.
    * @public 
    * @param {Number} _eventId - id of the event.
    * @param {Number} user_id - total number of future event.
    * @param {Number} _raceStartTime - race start time.
    * @param {string} _sessionId - session id for the user. 
    * @returns {Object} - Combination odds data from KIRON Api's.
    **/
    async EventHistoryApi(_eventId, user_id, _raceStartTime, _sessionId) {
        try {
            let reqHeaders = new Headers();
            reqHeaders.append("Content-Type", "application/json");
            reqHeaders.append("token", this.token);
            let url = this.baseUrl + this.eventResultUrlApi + "?event_id=" + _eventId + "&user_id=" + user_id + "&race_time=" + _raceStartTime + "&session_id=" + _sessionId;
            let requestOptions = {
                method: 'GET',
                headers: reqHeaders,
            };
            return (await this.getData(url, requestOptions));
        } catch (error) {
            console.log("error----", error);
        }
    };

    /**
* Get 24 hours history data.
* @public 
* @param {Number} _fromDate - start date time.
* @param {Number} _toDate - end date time.
* @param {Number} _gameType - game name.
* @param {string} _sessionId - session id for the user. 
* @returns {Object} 
**/
    async GetGame24HoursEventData(_fromDate, _toDate, _gameType, _sessionId) {
        try {
            let reqHeaders = new Headers();
            reqHeaders.append("Content-Type", "application/json");
            reqHeaders.append("token", this.token);
            let url = this.baseUrl + this.game24HoursEventDataApi + "?FromDateTime=" + _fromDate + "&ToDateTime=" + _toDate + "&type=" + _gameType + "&session_id=" + _sessionId;
            let requestOptions = {
                method: 'GET',
                headers: reqHeaders,
            };
            return (await this.getData(url, requestOptions));
        } catch (error) {
            console.log("error----", error);
        }
    };

    /**
    * Calls specificEventResult api.
    * @public 
    * @param {Number} _eventNumber -  number of the event.
    * @param {string} _sessionId - session id for the user. 
    * @returns {Object} -
    */
    async GetSpecificEventResult(_eventNumber, _sessionId) {
        try {
            let reqHeaders = new Headers();
            reqHeaders.append("Content-Type", "application/json");
            reqHeaders.append("token", this.token);
            let url = this.baseUrl + this.specificEventResultApi + _eventNumber + "?session_id=" + _sessionId;
            let requestOptions = {
                method: 'GET',
                headers: reqHeaders,
            };
            return (await this.getData(url, requestOptions));
        } catch (error) {
            console.log("error----", error);
        }
    };

    /**
    * Get the result for particular race number.
    * @public 
    * @param {string} _operatorId - id of the operator. 
    * @param {Number} _userId - user id.
    * @param {Number} _eventId - id of the event.
    * @param {string} _playerToken - authenticatication token for user. 
    * @param {string} _playerId - id of the player. 
    * @param {string} _currencyCode - currency code used. 
    * @param {string} _sessionId - session id for the user. 
    * @param {string} _gameId - game id for the game. 
    * @returns {Object} - result data from KIRON Api's.
    **/
    async EventResultApi(_operatorId, _userId, _eventId, _playerToken, _playerId, _currencyCode, _sessionId, _gameId) {
        try {
            let reqHeaders = new Headers();
            reqHeaders.append("Content-Type", "application/json");
            reqHeaders.append("operator_id", _operatorId);
            reqHeaders.append("token", this.token);
            let option = {
                user_id: _userId.toString(),
                event_id: _eventId.toString(),
                player_token: _playerToken.toString(),
                player_id: _playerId.toString(),
                currency_code: _currencyCode.toString(),
                session_id: _sessionId,
                game_id: _gameId
            };
            let url = this.baseUrl + this.resultApi;
            let requestOptions = {
                method: 'POST',
                headers: reqHeaders,
                body: JSON.stringify(option)
            };
            return (await this.getData(url, requestOptions));
        } catch (error) {
            console.log("error----", error);
        }
    };

    /**
     * Handles sever time data
    * @param {string} _sessionId - session id for the user.
    * @returns {null}
    **/
    async GetServerTime(_sessionId) {
        try {
            let reqHeaders = new Headers();
            reqHeaders.append("Content-Type", "application/json");
            reqHeaders.append("token", this.token);
            let url = this.baseUrl + this.serverTimeApi + "?session_id=" + _sessionId;
            let requestOptions = {
                method: 'GET',
                headers: reqHeaders,
            };
            return (await this.getData(url, requestOptions));
        } catch (error) {
            console.log("error----", error);
        }
    };

    /**
    * Get all combination odds of a particulr event id.
    * @public 
    * @param {Number} _eventId - id of the event(evnet number).
    * @param {string} _sessionId - session id for the user.
    * @returns {Object} - Combination odds data.
    */
    async GetRaceEventCombinationOdds(_eventId, _sessionId) {
        try {
            let reqHeaders = new Headers();
            reqHeaders.append("Content-Type", "application/json");
            reqHeaders.append("token", this.token);
            let url = this.baseUrl + this.raceEventCombinationOddsApi + _eventId + "?session_id=" + _sessionId;
            let requestOptions = {
                method: 'GET',
                headers: reqHeaders,
            };
            return (await this.getData(url, requestOptions));
        } catch (error) {
            console.log("error----", error);
        }
    };

    /**
    * Get all single odds of a particulr event id.
    * @public 
    * @param {Number} _eventId - id of the event(evnet number).
    * @param {string} _sessionId - session id for the user.
    * @returns {Object} - single odds data.
    */
    async GetRaceEventSingleOdds(_eventId, _sessionId) {
        try {
            let reqHeaders = new Headers();
            reqHeaders.append("Content-Type", "application/json");
            reqHeaders.append("token", this.token);
            let url = this.baseUrl + this.raceEventSingleOddsApi + _eventId + "?session_id=" + _sessionId;
            let requestOptions = {
                method: 'GET',
                headers: reqHeaders,
            };
            return (await this.getData(url, requestOptions));
        } catch (error) {
            console.log("error----", error);
        }
    };

    /**
   * Get all the event number in session available.
   * @param {string} _sessionId - session id for the user. 
   * @param {string} _gameId - game id for the game. 
   * @returns {Object} - event number data from KIRON Api's.
   **/
    async GetSessionEventNumberList(_sessionId, _gameId) {
        try {
            let reqHeaders = new Headers();
            reqHeaders.append("Content-Type", "application/json");
            reqHeaders.append("token", this.token);
            let url = this.baseUrl + this.sessionEventNumberList + "?session_id=" + _sessionId + "&game_id=" + _gameId;
            let requestOptions = {
                method: 'GET',
                headers: reqHeaders,
            };
            return (await this.getData(url, requestOptions));
        } catch (error) {
            console.log("error----", error);
        }
    };

    /**
    * Get game url to launch.
    * @param {string} _operatorId - id of the operator.  
    * @param {string} _playerToken - authenticatication token for user. 
    * @param {string} _currency - currency code used. 
    * @param {string} _language - language code . 
    * @param {string} _gameId - game id for the game. 
    * @param {string} _returnUrl - return url of the game. 
    * @param {string} _mode - mode of the game. 
    * @returns {Object} - url.
    **/
    async GetGameLaunchUrl(_operatorId, _playerToken, _currency, _language, _gameId, _returnUrl, _mode) {
        try {
            let reqHeaders = new Headers();
            reqHeaders.append("Content-Type", "application/json");
            reqHeaders.append("token", this.token);
            let option = {
                operator_id: _operatorId,
                player_token: _playerToken,
                currency: _currency,
                language: _language,
                game_id: _gameId,
                return_url: _returnUrl,
                mode: _mode,
                bet_limit_arr: []
            };
            let url = this.baseUrl + this.gameLaunchUrl;
            let requestOptions = {
                method: 'POST',
                headers: reqHeaders,
                body: JSON.stringify(option)
            };
            return (await this.getData(url, requestOptions));
        } catch (error) {
            console.log("error----", error);
        }
    };

    /**
    * Get game list available.
    * @param {string} _operatorId - id of the operator.  
    * @returns {Object} - url.
    **/
    async GetAllGameList(_operatorId) {
        try {
            let reqHeaders = new Headers();
            reqHeaders.append("Content-Type", "application/json");
            reqHeaders.append("token", this.token);
            let url = this.baseUrl + this.allGameListApi + _operatorId;
            let requestOptions = {
                method: 'GET',
                headers: reqHeaders,
            };
            return (await this.getData(url, requestOptions));
        } catch (error) {
            console.log("error----", error);
        }
    };

    /**
    * Get all the player's rating.
    * @public 
    * @param {Number} _eventId - id of the event.
    * @param {string} _sessionId - session id for the user. 
    * @returns {Object} - rating data from KIRON Api's.
    **/
    async GetPlayerRating(_eventId, _sessionId) {
        try {
            let reqHeaders = new Headers();
            reqHeaders.append("Content-Type", "application/json");
            reqHeaders.append("token", this.token);
            let url = this.baseUrl + this.playerRatingApi + _eventId + "?session_id=" + _sessionId;
            let requestOptions = {
                method: 'GET',
                headers: reqHeaders,
            };
            return (await this.getData(url, requestOptions));
        } catch (error) {
            console.log("error----", error);
        }
    };


    async GetPastEventResultHistory(_fromDate, _toDate, _limit, _pageNumber) {
        try {
            let reqHeaders = new Headers();
            reqHeaders.append("Content-Type", "application/json");
            reqHeaders.append("token", this.token);
            let url = this.baseUrl + this.pastEventHistoryApi + "?fromDate=" + _fromDate + "&toDate=" + _toDate + "&limit=" + _limit + "&page=" + _pageNumber;
            let requestOptions = {
                method: 'GET',
                headers: reqHeaders
            };
            return (await this.getData(url, requestOptions));
        } catch (error) {
            throw new Error(error.message);
        }
    };

    async GetAllPlayerRank(_gameType) {
        try {
            let reqHeaders = new Headers();
            reqHeaders.append("Content-Type", "application/json");
            reqHeaders.append("token", this.token);
            let url = this.baseUrl + this.playerRankApi + "?gameType=" + _gameType;
            let requestOptions = {
                method: 'GET',
                headers: reqHeaders
            };
            return (await this.getData(url, requestOptions));
        } catch (error) {
            console.log("error----", error);
        }
    };

    //#endregion
};
//#endregion
let server = new Server();

export { server as Server };