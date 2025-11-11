import { LanguageService } from "../LanguageService";
import ErrorPopup from "./error-popup";

/**
 * Purpose of this class parse responses from server and show different errors popups if needed.
 * @class
 */
class ErrorHandler {
    /**
     * @constructor
     */
    constructor() {
        this.popup = null;
        this.actions = {
            "RELOAD": this.actionReload,          // reloads current page
            "DEPOSIT": this.actionOpenDepositPage, // redirects player to balance deposit page            
            "SIMPLE": this.actionClosePopup,      // just show information message and close
            "EXIT": this.actionGoToHome         // exit game to home url
        };

        let urlParams = new URLSearchParams(window.location.search);
        this.depositUrl = urlParams.get("deposit") || null;
        this.homeUrl = urlParams.get("home") || null;
        this.mode = urlParams.get("mode") || "online";
    };
    //#####################################################################################################################################
    /**
     * Processes each response from server and check it for errors. If any error found method returns NULL, to stop further
     * logic execution. If no errors it just returns original response.
     * @public
     * @param {Object} response 
     * @returns {Object|null}
     */
    process(response) {
        if (!response || !response.hasOwnProperty("status")) {
            let data = this.getPopupDataByStatus(-1);
            this.showPopup(data.data, data.action);
            return null;
        }

        if (response.status !== 200) {
            let data = this.getPopupDataByStatus(response.status);
            this.showPopup(data.data, data.action);
            return null;
        }

        return response;
    };
    //#####################################################################################################################################
    /**
     * Searches for error data and shows error popup based on passed error code. This method need to be used to show popup without sending
     * data to backend.
     * @public
     * @param {number} status - code of error.
     */
    processByNumber(status) {
        let data = this.getPopupDataByStatus(status);
        this.showPopup(data.data, data.action);
    };
    //#####################################################################################################################################
    /**
     * Creates popup if it not exists and show it with passed data.
     * @private
     * @param {Object} data - title, description and button texts.
     * @param {funtion} action - callback for popup's button.
     */
    showPopup(data, action) {
        if (!this.popup) {
            this.popup = new ErrorPopup();
        }
        // this.popup.show(data, action, this);
    };
    //#####################################################################################################################################
    /**
     * Gets content data and proper action for popup by passed error code.
     * @private
     * @param {number} status - error code
     * @returns {Object}
     */
    getPopupDataByStatus(status) {
        switch (status) {
            case 102:
                return {
                    action: this.actions["EXIT"],
                    data: {
                        title: LanguageService.getErrorString("TEXT_ERROR_102_TITLE"),
                        description: LanguageService.getErrorString("TEXT_ERROR_102_DESCRIPTION"),
                        button: LanguageService.getErrorString("TEXT_ERROR_BUTTON_EXIT")
                    }

                };
            case 105:
                return {
                    action: this.hasDepositUrl() ? this.actions["DEPOSIT"] : this.actions["SIMPLE"],
                    data: {
                        title: LanguageService.getErrorString("TEXT_ERROR_105_TITLE"),
                        description: LanguageService.getErrorString("TEXT_ERROR_105_DESCRIPTION"),
                        button: this.hasDepositUrl() ? LanguageService.getErrorString("TEXT_ERROR_BUTTON_DEPOSIT") : LanguageService.getErrorString("TEXT_ERROR_BUTTON_OK")
                    }
                };
            case 112:
                return {
                    action: this.actions["SIMPLE"],
                    data: {
                        title: LanguageService.getErrorString("TEXT_ERROR_112_TITLE"),
                        description: LanguageService.getErrorString("TEXT_ERROR_112_DESCRIPTION"),
                        button: LanguageService.getErrorString("TEXT_ERROR_BUTTON_OK")
                    }
                }
            case 1110:
                return {
                    action: this.actions["SIMPLE"],
                    data: {
                        title: LanguageService.getErrorString("TEXT_ERROR_1110_TITLE"),
                        description: LanguageService.getErrorString("TEXT_ERROR_1110_DESCRIPTION"),
                        button: LanguageService.getErrorString("TEXT_ERROR_BUTTON_OK")
                    }
                }
            case 1111:
                return {
                    action: this.actions["SIMPLE"],
                    data: {
                        title: LanguageService.getErrorString("TEXT_ERROR_1111_TITLE"),
                        description: LanguageService.getErrorString("TEXT_ERROR_1111_DESCRIPTION"),
                        button: LanguageService.getErrorString("TEXT_ERROR_BUTTON_OK")
                    }
                }
            case 1000:
            default:
                return {
                    action: this.actions["RELOAD"],
                    data: {
                        title: LanguageService.hasLanguageData()
                            ? LanguageService.getErrorString("TEXT_ERROR_1000_TITLE")
                            : "Server error",
                        description: LanguageService.hasLanguageData()
                            ? LanguageService.getErrorString("TEXT_ERROR_1000_DESCRIPTION")
                            : "Seems something happened on the server side. We are working hard to resolve this issue. Please try to reload page.",
                        button: LanguageService.hasLanguageData()
                            ? LanguageService.getErrorString("TEXT_ERROR_BUTTON_RELOAD")
                            : "Reload"
                    }
                };
        }
    };
    //#####################################################################################################################################
    /**
     * Checks if deposit page URL passed to address line.
     * @private
     * @returns {boolean}
     */
    hasDepositUrl() {
        if (this.mode === "offline") return false;
        return this.depositUrl ? true : false;
    };
    //#####################################################################################################################################
    /**
     * Reloads current page. Used as action method passed to popup.
     * @private
     */
    actionReload() {
        window.location.reload();
    };
    //#####################################################################################################################################
    /**
     * Opens deposit balance page. Used as action method passed to popup.
     * @private
     */
    actionOpenDepositPage() {
        window.location.assign(this.depositUrl);
    };
    //#####################################################################################################################################
    /**
     * Closes popup with no other action. Used as action method passed to popup.
     * @private
     */
    actionClosePopup() { };
    //#####################################################################################################################################
    /**
     * Opens home page of casino. Used as action method passed to popup.
     * @private
     */
    actionGoToHome() {
        window.location.assign(this.homeUrl);
    };
};

let errorHandler = new ErrorHandler();
export { errorHandler as ErrorHandler };