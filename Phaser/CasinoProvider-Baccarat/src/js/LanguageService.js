
import { Server } from '../js/Server';
/**
 * Class for localizations requests. Get localization data from server. Allow not use global variables with texts in code.
 * @class
 */

class LanguageService {
    /**
 * Create class instance and fill params from URL or fill it with default values if URL not contain needed data.
 * @constructs
 */
    constructor() {
        this.languageData = null;
        this.currencyData = null;
        this.currencyObj = null;
        this.serverCurrencyData = null;
        this.languageErrorsData = null;
        this.isReady = false;
    };
    //#################################################################################################

    //For api server
    async init() {
        const translations = await Server.getTranslations();
        this.languageData = translations.data ? translations.data : null;

        this.languageErrorsData = translations.translationErrors ? translations.translationErrors : null;

        this.serverCurrencyData = await Server.getCurrencies();
        this.isReady = true;
        return true;
    };

    //#################################################################################################
    /**
     * Search for given ID in languageData instance. If ID is found - return it value.
     * Return ID otherwise, or empty string if localization data is missing at all.
     * @param {string} id - localized text ID
     * @returns {string}
     * @public
     */
    getString(id) {
        if (!this.languageData) {
            return id;
        };
        if (!this.languageData.hasOwnProperty(id)) {
            return id;
        } else {
            return this.languageData[id];
        }
    };

    serverCurrency(id) {
        if (!this.serverCurrencyData) {
            return id;
        };
        if (!this.serverCurrencyData.hasOwnProperty(id)) {
            return id;
        } else {
            return this.serverCurrencyData[id];
        }
    };

    //#########################################################################################################################################
    /**
     * Searches passed ID in passed data. If data not exists or don't have property with passed ID returns ID.
     * @param {object} data - localization data.
     * @param {string} id - ID of text for search.
     * @returns {string}
     */
    getData(data, id) {
        if (!data) return id;
        if (!data.hasOwnProperty(id)) return id;
        return data[id];
    };
    //#########################################################################################################################################
    /**
     * Checks if language data is existed.
     * @public
     * @returns {boolean}
     */
    hasLanguageData() {
        return this.languageData ? true : false;
    };
    //#########################################################################################################################################
    /**
     * Returns error text for given ID. If text not found returns ID.
     * @param {string} id - localized error ID
     * @returns {string}
     */
    getErrorString(id) {
        return this.getData(this.languageErrorsData, id);
    };
}

//#################################################################################################

let languageService = new LanguageService();
export { languageService as LanguageService };