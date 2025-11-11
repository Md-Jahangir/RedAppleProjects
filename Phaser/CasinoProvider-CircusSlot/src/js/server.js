import { Model } from "./model";
class Server {
	/**
	 *
	 */
	constructor() {
		this.urlParams = new URLSearchParams(window.location.search);
		this.mode = this.urlParams.get("mode");
		this.token = this.urlParams.get("token") //|| "94a8ceeaaa312fe5b728f53ea2c47714-ucd-3981816335";
		this.gameId = this.urlParams.get("gameID") //|| "10";
		this.casino = this.urlParams.get("casino") //|| "6557651a0c3095964738978a";
		this.remoteId = this.urlParams.get("remoteId") //|| "2243410159";
		// this.serverAddress = "https://api.casinoinhand.com";
		// this.serverAddress = "https://api.gamessecure.com";
		// this.serverAddress = "http://3.129.109.248:5001/api/v1/game-engine";
		this.serverAddress = "https://api.bets2win.in/gameapi/api/v1/game-engine";
		this.currency = this.urlParams.get("currency") //|| "USD";
		this.language = this.urlParams.get("language") || "en";
		//this.serverAddress = "http://localhost:1337";
		if (this.mode === "offline") {
			this.token = "94a8ceeaaa312fe5b728f53ea2c47714-ucd-3981816335";
			this.gameId = "10";
			this.casino = "6557651a0c3095964738978a"
			this.currency = "USD";
			this.language = "en";
		}
		// this.baseData = "/games/admin?token=" + token + "&game_id=" + gameId + "&casino=" + casino + "&remote_id=" + remoteId;
		// this.baseData = "/games/admin?token=" + this.token + "&mode=" + this.mode + "&game_id=" + this.gameId + "&casino=" + this.casino + "&remote_id=" + this.remoteId;
		this.baseData = "?token=" + this.token + "&mode=" + this.mode + "&game_id=" + this.gameId + "&casino=" + this.casino + "&remote_id=" + this.remoteId + "&currency=" + this.currency + "&language=" + this.language;
		this.SetCurrency();
	};

	SetCurrency() {
		Model.setCurrency(this.currency);
	}
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
		if (!this.token || !this.casino || !this.remoteId || this.currency != 'USD') {

			return true;
		}
		return false;
	};
};

let server = new Server();

export { server as Server };
