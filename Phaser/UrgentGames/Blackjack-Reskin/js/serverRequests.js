/**
 * This class contain all requests to server. User need just call proper method and pass callback function to it.
 */
class ServerRequests {
    constructor() {
        this.baseInfoCasinos = "/casinos/api?";
        this.queryString = window.location.search;
        this.urlParams = new URLSearchParams(this.queryString);
        this.language = this.urlParams.get('language') || 'en';
        this.mode = this.urlParams.get('mode');
        this.token = this.urlParams.get('token');
        this.casino = this.urlParams.get('casino');
        this.remote_id = this.urlParams.get('remote_id');
        this.currency = this.urlParams.get('currency') || 'USD';
        this.session_id = this.urlParams.get('session_id');
        this.game_id = "84";

        this.serverAddress = this.urlParams.get('server') || "https://api.gamessecure.com";

        if (this.mode == "offline") {
            this.currency = "fun";
            this.token = "fun";
        }

        this.baseInfoGames = "/games/admin?isGameLogic=1&token=" + this.token +
            "&mode=" + this.mode +
            "&game_id=" + this.game_id +
            "&casino=" + this.casino +
            "&remote_id=" + this.remote_id +
            "&currency=" + this.currency +
            "&language=" + this.language;
    }

    //#################################################################################################################
    /**
     * Fetches data from server.
     * @param {string} url 
     * @returns 
     */
    async fetchData(url) {
        try {
            let response = await fetch(this.serverAddress + url, { method: "GET" });
            response = await response.json();

            return errorHandler.process(response);
        } catch (err) {
            return errorHandler.process(null);
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
        const responseData = await this.fetchData("/currencies/api?currency_abrv=" + this.currency);
        return responseData.response;
    };

    //#####################################################################################################################
    /**
    * Ask server to init game.
    * @param {number} cash 
    */
    async gameInit() {
        GameAnalytics("initialize", "cdaee6d64d8437ee1883ca0f4a64db14", "b83e53948c492fee56d5d0ccbf8bedcfa066b250");		
        const response = await this.fetchData(this.baseInfoGames 
            + "&session_id=" + this.session_id
            + "&action=gameInit");

        if (response && response.result && response.result.sessionId) {
            this.session_id = response.result.sessionId
        }

        return response
    };

    //#####################################################################################################################
    /**
     * @param {*} betAmount 
     */
    async getFirstDeal(betAmount) {
        var totalBetInCents = betAmount * 100;
        if (this.mode != "offline") {
            totalBetInCents.toFixed(CURRENCY_DECIMAL);
            GameAnalytics("addBusinessEvent", this.currency, totalBetInCents, "Casino Bet", "NormalDeal", "Main Screen");
        }		
        const response = await this.fetchData(this.baseInfoGames + "&action=getFirstDeal&currentBet=" + betAmount + "&session_id=" + this.session_id);
        return response.result;
    };

    //#####################################################################################################################
    /**
     * Get translations from server.
     */
    async getTranslations() {
        const response = await this.fetchData("/translations/api?languageABRV=" + this.language);
        return response.response;
    };

    //#####################################################################################################################
    /**
     * Reset all data.
     * @param {boolean} isFirstPlay 
     */
    async reset(isFirstPlay) {
        return this.getData(this.baseInfoGames + "&action=reset&isFirstPlay=" + isFirstPlay + "&session_id=" + this.session_id);
    };

    //#####################################################################################################################
    /**
     * Get card for player, when player HIT.
     * @param {boolean} isDouble - indicates that player selected Double option.
     * @param {boolean} isInsuranceActive - let server know that insurance popup was shown before askin for card.
     * @param {boolean} isInsuranceAccepted - let server know that player wants to buy insurance.
     */
    async getCardForPlayer(isDouble, isInsuranceActive, isInsuranceAccepted) {
        return this.fetchData(this.baseInfoGames
            + "&session_id=" + this.session_id
            + "&action=getCardForPlayer&isDouble=" + isDouble
            + "&isInsuranceActive=" + isInsuranceActive
            + "&isInsuranceAccepted=" + isInsuranceAccepted);
    };

    //#####################################################################################################################
    /**
     * Check dealing result for dealer (only during dealer's turn).
     */
    async checkDealerHand() {
        const resp = await this.fetchData(this.baseInfoGames + "&action=checkDealerHand" + "&session_id=" + this.session_id);
        return resp.result
    };

    //#####################################################################################################################
    /**
     * Split data request.
     */
    async getSplit() {
        const response = await this.fetchData(this.baseInfoGames + "&action=getSplit" + "&session_id=" + this.session_id)
        return response.result;
    };

    //#####################################################################################################################
    /**
     * stand action process
     * @param {boolean} isInsuranceActive
     * @param {boolean} isInsuranceAccepted
     */
    async getStand(isInsuranceActive, isInsuranceAccepted) {
        return this.fetchData(this.baseInfoGames
            + "&session_id=" + this.session_id
            + "&action=getStand"
            + "&isInsuranceActive=" + isInsuranceActive
            + "&isInsuranceAccepted=" + isInsuranceAccepted);
    };

    //#####################################################################################################################################
    /**
     * Get message by status
     */
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
}

const serverRequests = new ServerRequests();
