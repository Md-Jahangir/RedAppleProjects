import { Model } from "./model";
/**
 * 
 */
class Server {
    /**
     * 
     */
    constructor() {
        this.urlParams = new URLSearchParams(window.location.search);
        this.mode = this.urlParams.get("mode");
        this.token = this.urlParams.get("token");//|| "IDLXNm097e6y4iYqI";
        this.gameId = this.urlParams.get("game_id") || "514";
        this.casino = this.urlParams.get("casino");//|| "6034aa18b69b77173e5286d1";
        this.remoteId = this.urlParams.get("remote_id");//|| "1";
        this.currency = this.urlParams.get("currency") || "USD";
        this.language = this.urlParams.get("language") || "en";
        // this.serverAddress = "https://api.casinoinhand.com";
        this.serverAddress = "https://api.gamessecure.com";
        if (this.mode === "offline") {
            this.currency = "fun";
            this.token = "fun";
        }
        // this.baseData = "/games/admin?token=" + token + "&game_id=" + gameId + "&casino=" + casino + "&remote_id=" + remoteId;
        this.baseData = "/games/admin?token=" + this.token + "&mode=" + this.mode + "&game_id=" + this.gameId + "&casino=" + this.casino + "&remote_id=" + this.remoteId;// + "&currency=" + this.currency + "&language=" + this.language;

    };
    //#############################################################################################
    /**
     * 
     * @param {string} url 
     * @param {function} callback 
     * @param {object} callbackContext 
     */
    getData(url, callback, callbackContext) {
        fetch(this.serverAddress + this.baseData + url, { method: "GET" })
            .then(response => response.json())
            .then((responseData) => {
                callback.call(callbackContext, responseData);
            });
    };
    //#############################################################################################
    /**
     * 
     * @param {function} callback 
     * @param {object} callbackContext 
     */
    getInitialData(callback, callbackContext) {
        this.getData("&isGameLogic=1&action=getInitialData", callback, callbackContext);
    };
    //#############################################################################################
    /**
     * 
     * @param {function} callback 
     * @param {object} callbackContext 
     */
    getSpinResults(callback, callbackContext) {
        let lines = Model.getLines();
        let coins = Model.getBetPerLine();
        let urlStr = "&isGameLogic=1&action=getSpinResult&lines=" + lines + "&coins=" + coins;
        this.getData(urlStr, callback, callbackContext);
    };
    //#############################################################################################
    /**
     * Check availability of critical params in URL.
     * @public
     * @returns {boolean}
     */
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