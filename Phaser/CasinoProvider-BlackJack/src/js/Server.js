/**
 * This class contain all requests to server. User need just call proper method and pass callback function to it.
 */
import { GameAnalytics } from 'gameanalytics';
import { ErrorHandler } from './errors/error-handler';
import { Model } from './Model';

class Server {
    /**
  * Create class instance and fill params from URL or fill it with default values if URL not contain needed data.
  * @constructs
  */
    constructor() {
        this.baseInfoCasinos = "/api/v1/casino/api?";
        this.queryString = window.location.search;
        this.urlParams = new URLSearchParams(this.queryString);
        this.language = this.urlParams.get('language') || 'en';
        this.mode = this.urlParams.get('mode');
        this.token = this.urlParams.get('token');
        this.casino = this.urlParams.get('casino');
        this.remoteId = this.urlParams.get('remoteId');
        this.currency = this.urlParams.get('currency') || 'USD';
        this.session_id = this.urlParams.get('session_id');
        this.gameId = this.urlParams.get('gameID');

        // this.serverAddress = this.urlParams.get('server') || "http://3.129.109.248:5001";
        this.serverAddress = "https://staginglocal.redappletech.com/bets2win-slotapi/gameapi/";
        //gameID=6&remoteId=2243410159&mode=online&token=94a8ceeaaa312fe5b728f53ea2c47714-ucd-3981816335&casino=6557651a0c3095964738978a&currency=KRW&language=en&token=94a8ceeaaa312fe5b728f53ea2c47714-ucd-3981816335
        if (this.mode == "offline") {
            this.currency = "fun";
            this.token = "fun";
            this.gameId = "6";
            this.remoteId = "2243410159";
        }

        this.baseInfoGames = "/api/v1/game-engine?game_id=" + this.gameId +
            "&token=" + this.token +
            "&mode=" + this.mode +
            "&casino=" + this.casino +
            "&remote_id=" + this.remoteId +
            "&currency=" + this.currency +
            "&language=" + this.language;
        this.SetCurrency();
    }
    SetCurrency() {
        Model.SetCurrency(this.currency);
    }

    //#################################################################################################################

    async fetchData(url) {
        try {
            let response = await fetch(this.serverAddress + url, { method: "GET" });
            response = await response.json();
            return response;
            // return ErrorHandler.process(response);
        } catch (err) {
            return ErrorHandler.process(null);
        }
    };

    //#################################################################################################
    /**
    * Get data from server using GET method.
    * @param {string} url 
    * @param {function} callback 
    * @param {object} callbackContext 
    */
    async getData(url, callback, callbackContext) {
        const responseData = await fetch(this.serverAddress + url, { method: "GET" })
            .then(response => response.json());
        if (callback) {
            callback.call(callbackContext, responseData);
        } else {
            return responseData.response;
        }
    };

    //#################################################################################################
    /**
     * Get currency from server
     * @param {number} cash 
     */
    async getCurrencies() {
        const responseData = await this.fetchData("/api/v1/currencies/api?currency_abrv=" + this.currency);
        return responseData.response;
    };
    //https://staging.bets2win.in/gameapi/api/v1/game-engine?game_id=6&availableBalance=2000&currentBet=100&mode=online&casino=6557651a0c3095964738978a&remote_id=2243410159&currency=KRW&language=en
    //#####################################################################################################################
    /**
    * Ask server to init game.
    * @param {number} cash 
    */
    async gameInit() {
        GameAnalytics("initialize", "cdaee6d64d8437ee1883ca0f4a64db14", "b83e53948c492fee56d5d0ccbf8bedcfa066b250");
        // const response = await this.fetchData(this.baseInfoGames
        //     + "&action=gameInit");

        // if (response && response.result && response.result.sessionId) {
        //     this.session_id = response.result.sessionId
        // }
        const response = await this.fetchData(this.baseInfoGames + "&action=gameInit");
        return response.data;
        // return response
    };

    //#####################################################################################################################
    /**
     * @param {*} betAmount 
     */
    async ShuffleDeck(availableBalance, betAmount) {
        if (this.mode != "offline") {
            // totalBetInCents.toFixed(CURRENCY_DECIMAL);
            // GameAnalytics("addBusinessEvent", this.currency, totalBetInCents, "Casino Bet", "NormalDeal", "Main Screen");
        }
        const response = await this.fetchData(this.baseInfoGames + "&action=prepareDealing&cash=" + availableBalance + "&currentBet=" + betAmount);

        return response.result;
    }
    async GetPlayerCardAuto() {
        if (this.mode != "offline") {
            // totalBetInCents.toFixed(CURRENCY_DECIMAL);
            // GameAnalytics("addBusinessEvent", this.currency, totalBetInCents, "Casino Bet", "NormalDeal", "Main Screen");
        }
        const response = await this.fetchData(this.baseInfoGames + "&action=getCardForPlayerAuto");
        return response.data;
    }
    async GetDealerCardAuto() {
        if (this.mode != "offline") {
            // totalBetInCents.toFixed(CURRENCY_DECIMAL);
            // GameAnalytics("addBusinessEvent", this.currency, totalBetInCents, "Casino Bet", "NormalDeal", "Main Screen");
        }
        const response = await this.fetchData(this.baseInfoGames + "&action=getCardForDealerAuto");
        return response.data;
    }
    async GetPlayerCard() {
        // if (this.mode != "offline") {
        // totalBetInCents.toFixed(CURRENCY_DECIMAL);
        // GameAnalytics("addBusinessEvent", this.currency, totalBetInCents, "Casino Bet", "NormalDeal", "Main Screen");
        // }
        const response = await this.fetchData(this.baseInfoGames + "&action=getCardForPlayer");
        return response.data;
    }
    async CheckAvailablePlayerActions() {
        if (this.mode != "offline") {
            // totalBetInCents.toFixed(CURRENCY_DECIMAL);
            // GameAnalytics("addBusinessEvent", this.currency, totalBetInCents, "Casino Bet", "NormalDeal", "Main Screen");
        }
        const response = await this.fetchData(this.baseInfoGames + "&action=checkAvailablePlayerActions");
        return response.data;
    }
    async GetDealerCard() {
        if (this.mode != "offline") {
            // totalBetInCents.toFixed(CURRENCY_DECIMAL);
            // GameAnalytics("addBusinessEvent", this.currency, totalBetInCents, "Casino Bet", "NormalDeal", "Main Screen");
        }
        const response = await this.fetchData(this.baseInfoGames + "&action=getCardForDealer");
        return response.data;
    }
    async CheckDealerHand() {
        if (this.mode != "offline") {
            // totalBetInCents.toFixed(CURRENCY_DECIMAL);
            // GameAnalytics("addBusinessEvent", this.currency, totalBetInCents, "Casino Bet", "NormalDeal", "Main Screen");
        }
        const response = await this.fetchData(this.baseInfoGames + "&action=checkDealerHand");
        return response.data;
    }
    async CheckPlayerHand() {
        if (this.mode != "offline") {
            // totalBetInCents.toFixed(CURRENCY_DECIMAL);
            // GameAnalytics("addBusinessEvent", this.currency, totalBetInCents, "Casino Bet", "NormalDeal", "Main Screen");
        }
        const response = await this.fetchData(this.baseInfoGames + "&action=checkPlayerHand");
        return response.data;
    }
    async Reset(isFirstPlay) {
        if (this.mode != "offline") {
            // totalBetInCents.toFixed(CURRENCY_DECIMAL);
            // GameAnalytics("addBusinessEvent", this.currency, totalBetInCents, "Casino Bet", "NormalDeal", "Main Screen");
        }
        const response = await this.fetchData(this.baseInfoGames + "&action=reset" + '&isFirstPlay=' + isFirstPlay);
        return response.data;
    }
    async GetSplit() {
        if (this.mode != "offline") {
            // totalBetInCents.toFixed(CURRENCY_DECIMAL);
            // GameAnalytics("addBusinessEvent", this.currency, totalBetInCents, "Casino Bet", "NormalDeal", "Main Screen");
        }
        const response = await this.fetchData(this.baseInfoGames + "&action=getSplit");
        return response.data;
    }
    async GetStand() {
        if (this.mode != "offline") {
            // totalBetInCents.toFixed(CURRENCY_DECIMAL);
            // GameAnalytics("addBusinessEvent", this.currency, totalBetInCents, "Casino Bet", "NormalDeal", "Main Screen");
        }
        const response = await this.fetchData(this.baseInfoGames + "&action=getStand");
        return response.data;
    }
    async DebitBalance(amount) {
        if (this.mode != "offline") {
            // totalBetInCents.toFixed(CURRENCY_DECIMAL);
            // GameAnalytics("addBusinessEvent", this.currency, totalBetInCents, "Casino Bet", "NormalDeal", "Main Screen");
        }
        const response = await this.fetchData(this.baseInfoCasinos + 'game_id=' + this.gameId + "&token=" + this.token + "&mode=" + this.mode + "&casino=" + this.casino + "&remote_id=" + this.remoteId + "&currency=" + this.currency + "&language=" + this.language + "&action=debit" + '&amount=' + amount);
        return response.data;
    }
    async CreditBalance(amount) {
        if (this.mode != "offline") {
            // totalBetInCents.toFixed(CURRENCY_DECIMAL);
            // GameAnalytics("addBusinessEvent", this.currency, totalBetInCents, "Casino Bet", "NormalDeal", "Main Screen");
        }
        const response = await this.fetchData(this.baseInfoCasinos + 'game_id=' + this.gameId + "&token=" + this.token + "&mode=" + this.mode + "&casino=" + this.casino + "&remote_id=" + this.remoteId + "&currency=" + this.currency + "&language=" + this.language + "&action=credit" + '&amount=' + amount);
        return response.data;
    }

    //#####################################################################################################################
    /**
     * Get translations from server.
     */
    async getTranslations() {
        const response = await this.fetchData("/api/v1/translations/api?languageABRV=" + this.language + '&game_id=' + this.gameId);
        return response;
    };


    getStatusMessage = function (statusCode) {
        switch (statusCode) {
            case 102:
                return languageService.getString("TEXT_TOKEN_NOT_FOUND")
            case 105:
                return languageService.getString("TEXT_NO_MONEY")
            case 112:
                return languageService.getString("TEXT_SERVICE_MESSGE")
            default:
                return 'Reload game'
        }
    };

    isParamsMissing() {
        if (this.mode === "offline") return false;
        if (!this.token || !this.casino || !this.remoteId) {

            return true;
        }
        return false;
    };


};
let server = new Server();

export { server as Server };
