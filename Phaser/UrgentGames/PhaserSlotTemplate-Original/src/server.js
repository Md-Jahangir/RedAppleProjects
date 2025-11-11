import { Model } from "./model";
/**
 * This class used for any interactions between client and server. 
 */
class Server {
	/**
	 * Create class instance and fill params from URL or fill it with default values if URL not contain needed data.
	 * @constructs
	 */
	constructor() {
		this.urlParams = new URLSearchParams(window.location.search);

		this.mode     = this.urlParams.get("mode");
		this.token    = this.urlParams.get("token"); //"test188";
		this.gameId   = this.urlParams.get("game_id") || "701";
		this.casino   = this.urlParams.get("casino"); //"5fd20b8ec088305fed9447f2";
		this.remoteId = this.urlParams.get("remote_id"); //"147";
		this.currency = this.urlParams.get("currency") || "USD";
		this.language = this.urlParams.get("language") || "en";

		if (this.mode === "offline") {
			this.currency = "fun";
			this.token = "fun";
		}

		this.serverAddress = "https://api.gamessecure.com";	
		//this.serverAddress = "http://localhost:1337";
		this.baseData = "/games/admin?token=" + this.token + "&mode=" + this.mode + "&game_id=" + this.gameId + "&casino=" + this.casino + "&remote_id=" + this.remoteId + "&currency=" + this.currency + "&language=" + this.language;
	};
	//#############################################################################################
	/**
	 * Requests data from server, and call handler function after responce was received. URL contain only
	 * needed data - action name and it's params. Static parts or URL stored in class instance.
	 * @public
	 * @param {string} url - string with action name and params.
	 * @param {function} callback - function that will be called with responce as param.
	 * @param {object} callbackContext - context for callback function.
	 */
	getData(url, callback, callbackContext) {
		fetch(this.serverAddress + this.baseData + url, { method: "GET" })
		.then( response => response.json() )
		.then((responseData) => {
			callback.call(callbackContext, responseData);
		});
	};
	//#############################################################################################
	/**
	 * Requests initial data for game. Initial data need to contain paytable, paylines configurations,
	 * user balance and available bets range.
	 * @public
	 * @param {function} callback - handler for initial data. 
	 * @param {object} callbackContext - context for handler.
	 */
	getInitialData(callback, callbackContext) {
		this.getData("&isGameLogic=1&action=getInitialData", callback, callbackContext);
	};
	//#############################################################################################
	/**
	 * Requests server to make a spin and pass it result to handler.
	 * @public
	 * @param {function} callback - handler for spin results.
	 * @param {object} callbackContext - context for handler.
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