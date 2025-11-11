/**
 * This class contain all requests to server. User need just call proper method and pass callback function to it.
 */
import { GameAnalytics } from 'gameanalytics';
import { ErrorHandler } from './errors/error-handler';

class Server {
    /**
  * Create class instance and fill params from URL or fill it with default values if URL not contain needed data.
  * @constructs
  */
    constructor() {

        this.queryString = window.location.search;
        this.urlParams = new URLSearchParams(this.queryString);
        this.language = this.urlParams.get('language') || 'en';
        this.mode = this.urlParams.get('mode');
        this.token = this.urlParams.get('token');
        this.casino = this.urlParams.get('casino');
        this.remote_id = this.urlParams.get('remoteId');
        this.currency = this.urlParams.get('currency') || 'USD';
        this.session_id = this.urlParams.get('session_id');
        this.game_id = this.urlParams.get('gameID') || 5;
        this.serverAddress = "https://staging.bets2win.in/gameapi";
        // http://localhost:8080/?gameID=5&remoteId=2243410159&mode=online&casino=6557651a0c3095964738978a&currency=KRW&language=en&token=94a8ceeaaa312fe5b728f53ea2c47714-ucd-3981816335
        if (this.mode == "offline") {
            this.currency = "fun";
            this.token = "fun";
            this.gameId = "5";
            this.remoteId = "2243410159";
        }
        this.baseInfoCasinos = "/api/v1/casino/api?game_id=" + this.game_id +
            "&token=" + this.token +
            "&mode=" + this.mode +
            "&casino=" + this.casino +
            "&remote_id=" + this.remote_id +
            "&currency=" + this.currency +
            "&language=" + this.language;
        this.baseInfoGames = "/api/v1/game-engine?game_id=" + this.game_id +
            "&token=" + this.token +
            "&mode=" + this.mode +
            "&casino=" + this.casino +
            "&remote_id=" + this.remote_id +
            "&currency=" + this.currency +
            "&language=" + this.language;
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

    //#####################################################################################################################
    /**
    * Ask server to init game.
    * @param {number} cash 
    */
    async BetPlaced(currentBet) {
        GameAnalytics("initialize", "cdaee6d64d8437ee1883ca0f4a64db14", "b83e53948c492fee56d5d0ccbf8bedcfa066b250");
        // const response = await this.fetchData(this.baseInfoGames
        //     + "&action=gameInit");

        // if (response && response.result && response.result.sessionId) {
        //     this.session_id = response.result.sessionId
        // }
        const response = await this.fetchData(this.baseInfoGames + "&action=betPlaced" + "&currentBet=" + currentBet);
        return response.data;
        // return response
    };
    async GetPlayerBalance() {
        if (this.mode != "offline") {
            // totalBetInCents.toFixed(CURRENCY_DECIMAL);
            // GameAnalytics("addBusinessEvent", this.currency, totalBetInCents, "Casino Bet", "NormalDeal", "Main Screen");
        }
        const response = await this.fetchData(this.baseInfoCasinos + "&action=balance");
        return response;
    }

    //#####################################################################################################################
    /**
     * @param {*} betAmount 
     */
    async ShuffleDeck(availableBalance, betAmount) {
        if (this.mode != "offline") {
            // totalBetInCents.toFixed(CURRENCY_DECIMAL);
            // GameAnalytics("addBusinessEvent", this.currency, totalBetInCents, "Casino Bet", "NormalDeal", "Main Screen");
        }
        const response = await this.fetchData(this.baseInfoGames + "&action=getShuffledCardDeck");
        return response.data;
    }
    async GetIndexForFiches(iValue) {
        if (this.mode != "offline") {
            // totalBetInCents.toFixed(CURRENCY_DECIMAL);
            // GameAnalytics("addBusinessEvent", this.currency, totalBetInCents, "Casino Bet", "NormalDeal", "Main Screen");
        }
        const response = await this.fetchData(this.baseInfoGames + "&action=getIndexForFiches" + "&iValue=" + iValue);
        return response;
    }
    async StartBacarrat(cash, minBet, maxBet) {
        if (this.mode != "offline") {
            // totalBetInCents.toFixed(CURRENCY_DECIMAL);
            // GameAnalytics("addBusinessEvent", this.currency, totalBetInCents, "Casino Bet", "NormalDeal", "Main Screen");
        }
        const response = await this.fetchData(this.baseInfoGames + "&action=start" + "&cash=" + cash + "&minBet=" + minBet + "&maxBet=" + maxBet);
        return response;
    }
    async GetMoney() {
        if (this.mode != "offline") {
            // totalBetInCents.toFixed(CURRENCY_DECIMAL);
            // GameAnalytics("addBusinessEvent", this.currency, totalBetInCents, "Casino Bet", "NormalDeal", "Main Screen");
        }
        const response = await this.fetchData(this.baseInfoGames + "&action=getMoney");
        return response.data;
    }
    async SetMoney() {
        if (this.mode != "offline") {
            // totalBetInCents.toFixed(CURRENCY_DECIMAL);
            // GameAnalytics("addBusinessEvent", this.currency, totalBetInCents, "Casino Bet", "NormalDeal", "Main Screen");
        }
        const response = await this.fetchData(this.baseInfoGames + "&action=setMoney" + "&cash=" + 20);
        return response.data;
    }



    async Reset() {
        if (this.mode != "offline") {
            // totalBetInCents.toFixed(CURRENCY_DECIMAL);
            // GameAnalytics("addBusinessEvent", this.currency, totalBetInCents, "Casino Bet", "NormalDeal", "Main Screen");
        }
        const response = await this.fetchData(this.baseInfoGames + "&action=reset");
        return response.data;
    }

    async DebitBalance(amount) {
        if (this.mode != "offline") {
            // totalBetInCents.toFixed(CURRENCY_DECIMAL);
            // GameAnalytics("addBusinessEvent", this.currency, totalBetInCents, "Casino Bet", "NormalDeal", "Main Screen");
        }
        const response = await this.fetchData(this.baseInfoCasinos + "&action=debit" + '&amount=' + amount);
        return response.data;
    }
    async CreditBalance(amount) {
        if (this.mode != "offline") {
            // totalBetInCents.toFixed(CURRENCY_DECIMAL);
            // GameAnalytics("addBusinessEvent", this.currency, totalBetInCents, "Casino Bet", "NormalDeal", "Main Screen");
        }
        const response = await this.fetchData(this.baseInfoCasinos + "&action=credit" + '&amount=' + amount);
        return response.data;
    }

    //#####################################################################################################################
    /**
     * Get translations from server.
     */
    async getTranslations() {
        const response = await this.fetchData("/api/v1/translations/api?languageABRV=" + this.language + '&game_id=' + this.game_id);
        return response;
    };


    getStatusMessage(statusCode) {
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
}
let server = new Server();

export { server as Server };
