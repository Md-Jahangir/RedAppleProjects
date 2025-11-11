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
    this.currencyObj = null;
    this.serverCurrencyData = null;
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
LanguageService.prototype.init = function() {

    serverRequests.getTranslations(function(data) {
        /*
        TODO:
        at this moment get first available translation (usually English).
        later need to use selected language
        */

        this.languageData = data.response.translationRoulette;
        this.serverCurrencyData = serverRequests.getCurrencies();
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
        return id;
    };
    if (!this.languageData.hasOwnProperty(id)) {
        return id;
    } else {
        return this.languageData[id];
    }
};

LanguageService.prototype.serverCurrency = function(id) {
    if (!this.serverCurrencyData) {
        return id;
    };
    if (!this.serverCurrencyData.hasOwnProperty(id)) {
        return id;
    } else {
        return this.serverCurrencyData[id];
    }
};

//#################################################################################################

var languageService = new LanguageService();
languageService.init();