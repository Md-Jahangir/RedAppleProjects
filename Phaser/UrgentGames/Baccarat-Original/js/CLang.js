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
    /**
     * Object that contain data about currencies. Used for getting currency symbol.
     */
    this.serverCurrencyData = null;
    /**
     * Object that contain localization information about errors.
     * @type {Object.<string, string>}
     */
    this.languageErrorsData = null;
    /**
     * Readiness flag. Used to make sure that all needed localization data is successfully loaded from server.
     * @type {boolean}
     */
    this.isReady = false;
};
//#########################################################################################################################################
/**
 * Make server request for localization data.
 * @public
 */
LanguageService.prototype.init = async function () {    
    const data = await serverRequests.getTranslations();
    const currencyData = await serverRequests.getCurrencies();
    
    this.languageData = data ? data.response.translationBaccarat : null;
    this.languageErrorsData = data ? data.response.translationErrors : null;
    this.serverCurrencyData = currencyData ? currencyData.response : null;
    this.isReady = true;
};
//#########################################################################################################################################
/**
 * Search for given ID in languageData instance. If ID is found - return it value.
 * Return ID otherwise, or empty string if localization data is missing at all.
 * @param {string} id - localized text ID
 * @returns {string}
 * @public
 */
LanguageService.prototype.getString = function (id) {
    return this.getData(this.languageData, id);
};
//#########################################################################################################################################
/**
 * Searches passed ID in passed data. If data not exists or don't have property with passed ID returns ID.
 * @param {object} data - localization data.
 * @param {string} id - ID of text for search.
 * @returns {string}
 */
LanguageService.prototype.getData = function (data, id) {
    if (!data) return id;
    if (!data.hasOwnProperty(id)) return id;
    return data[id];
};
//#########################################################################################################################################
/**
 * Returns error text for given ID. If text not found returns ID.
 * @param {string} id - localized error ID
 * @returns {string}
 */
LanguageService.prototype.getErrorString = function (id) {
    return this.getData(this.languageErrorsData, id);
};
//#########################################################################################################################################
/**
 * Checks if language data is existed.
 * @public
 * @returns {boolean}
 */
LanguageService.prototype.hasLanguageData = function () {
    return this.languageData ? true : false;
};
//#########################################################################################################################################
/**
 * Checks for currency symbol data in currencies. If data not found returns currencySymbol property name.
 * @public
 * @returns {string}
 */
LanguageService.prototype.getCurrencySymbol = function() {
    return this.getData(this.serverCurrencyData, "currencySymbol");
};

var languageService = new LanguageService();
