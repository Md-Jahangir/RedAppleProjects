/**
 * This class contain all requests to server. User need just call proper method and pass callback function to it.
 */
class ServerRequests {
    constructor() {
        this.baseInfoCasinos = "/casinos/api?";
        this.queryString = window.location.search;
        this.urlParams = new URLSearchParams(this.queryString);

        this.token = this.urlParams.get('token');
        this.casino = this.urlParams.get('casino');
        this.remote_id = this.urlParams.get('remote_id');
        this.currency = this.urlParams.get('currency') || 'USD';
        this.language = this.urlParams.get('language') || 'en';
        this.session_id = this.urlParams.get('session_id');
        this.mode = this.urlParams.get('mode');
        this.server = this.urlParams.get('server');
        this.gameId = this.urlParams.get('game_id') || "120";
        this.serverAddress = this.urlParams.get("server") || "https://api.gamessecure.com"

        if (this.mode == "offline") {
            this.currency = "fun";
            this.token = "fun";
        }

        this.baseData = "/games/admin?isGameLogic=true"
            + "&token=" + this.token
            + "&game_id=" + this.gameId
            + "&mode=" + this.mode
            + "&casino=" + this.casino
            + "&remote_id=" + this.remote_id
            + "&currency=" + this.currency
            + "&language=" + this.language;
    }
    //#####################################################################################################################################
    /**
     * Fetches data from server.
     * @param {string} url 
     * @returns 
     */
    async fetchData(url, addBaseData = true) {
        let URL = "";

        if (addBaseData) {
            URL = this.serverAddress + this.baseData + url;
        } else {
            URL = this.serverAddress + url;
        }

        try {
            let response = await fetch(URL, { method: "GET" });
            response = await response.json();

            return errorHandler.process(response);
        } catch (err) {
            return errorHandler.process(null);
        }
    }
    //#####################################################################################################################################
    /**
     * Ask server to init game.
     * @param {number} cash 
     * @param {function} callback 
     * @param {object} callbackContext 
     */
    async initGame() {
        GameAnalytics("initialize", "d2193845d61b1d39211f14bbcb152619", "082f980b3fcf86f839f08398ac7c86673e3e05b9");
        const response = await this.fetchData("&action=start" + "&session_id=" + this.session_id);

        if (response && response.result && response.result.sessionId) {
            this.session_id = response.result.sessionId
        }

        return response
    };
    //#####################################################################################################################################
    /**
     * update placed bet
     * @param {number} currentBet 
     * @param {function} callback 
     * @param {object} callbackContext 
     */
    placeBet(currentBet) {
        var totalBet = 0;
        for (var i = 0; i < currentBet.length; i++) {
            totalBet += currentBet[i];
        }

        var totalBetInCents = totalBet * 100;

        if (this.mode != "offline") {
            totalBetInCents.toFixed(CURRENCY_DECIMAL);
            GameAnalytics("addBusinessEvent", this.currency, totalBetInCents, "Casino Bet", "NormalDeal", "Main Screen");
        }

        return this.fetchData(
            "&session_id=" + this.session_id
            + "&action=placeBet"
            + "&betTie=" + currentBet[BET_TIE]
            + "&betBanker=" + currentBet[BET_BANKER]
            + "&betPlayer=" + currentBet[BET_PLAYER]
        );
    }
    //#####################################################################################################################################
    async getTranslations() {
        return this.fetchData("/translations/api?languageABRV=" + this.language, false);
    }
    //#####################################################################################################################################
    async getCurrencies() {
        return this.fetchData("/currencies/api?currency_abrv=" + this.currency, false);
    }    
};
const serverRequests = new ServerRequests();
