/**
 * Class for localizations requests. Get localization data from server. Allow not use global variables with texts in code.
 * @class
 */
 function LanguageService() {
	/**
	 * Object that contain localization information.
	 * @type {Object.<string, string>}
	 */
	this.languageData = null;
	this.currencyData = null;
	this.currencyObj=null;
	this.serverCurrencyData=null;
	/**
	 * Readiness flag. Used to make sure that all needed localization data is successfully loaded from server.
	 * @type {boolean}
	 */
	this.isReady = false;
};
//#################################################################################################
/**
 * Make server request for localization data.
 * @public
 */
LanguageService.prototype.init =  function() {
	
	   serverRequests.getTranslations(function(data){
		this.languageData = data.response.translationGreyhoundRacing;
		this.serverCurrencyData=serverRequests.getCurrencies();
		this.isReady = true;
	}, this);
	
};
//#################################################################################################
/**
 * Search for given ID in languageData instance. If ID is found - return it value.
 * Return ID otherwise, or empty string if localization data is missing at all.
 * @param {string} id - localized text ID
 * @returns {string}
 * @public
 */
LanguageService.prototype.getString = function(id) {
	if (!this.languageData) {
		//console.error("Seems like localization data is not loaded.");
		return id;
	};
	if (!this.languageData.hasOwnProperty(id)) {
		//console.error("String with ID", id, "not found.");
		return id;
	} else {
		//console.log("this.languageData[id]"+this.languageData[id]);
		return this.languageData[id];
	}
};

LanguageService.prototype.serverCurrency = function(id) {
	if (!this.serverCurrencyData) {
		//console.error("Seems like localization data is not loaded.");
		return id;
	};
	if (!this.serverCurrencyData.hasOwnProperty(id)) {
		//console.error("String with ID", id, "not found.");
		return id;
	} else {
		//console.log("this.serverCurrencyData[id]"+this.serverCurrencyData[id]);
		return this.serverCurrencyData[id];
	}
};

//#################################################################################################

var languageService = new LanguageService();
languageService.init();
