
/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 16-02-2024.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 16-02-2024
 * @Description :- This class used for any interactions between client and server.
 ************************************/
import { Client } from "./Client.js";
import { Model } from "../Model.js";
//#region - Class defination 
class Server {
    /**
     * Create class instance and fill params from URL or fill it with default values if URL not contain needed data.
     * @constructs
    */
    constructor() {
        //================Platform API URL================================
        this.urlParams = new URLSearchParams(window.location.search);
        this.authToken = this.urlParams.get("authToken");
        Model.SetAuthToken(this.authToken);
    };

    //##########################################################################
    //#region PLATFORM API'S-------------------------

    /**
     * Requests data from server, and call handler function after responce was received. URL contain only
     * needed data - action name and it's params. Static parts or URL stored in class instance.
     * @public
     * @param {string} url - string with action name and params.
     * @param {function} callback - function that will be called with responce as param.
     * @returns {object} response in json format.
    **
    ****/
    async GetData(url, options) {
        try {

            let response = await (await fetch(url, options)).json();
            switch (true) {
                case (response.status == 404):
                    throw new Error(response.message);
                    break;
                case (response.status == 401):
                    throw new Error(response.message);
                    break;
                case (response.status == "400"):
                    throw new Error(response.message);
                    break;
                case (response.error):
                    throw new Error(response.message);
                    break;
                default:
                    return response;
            }
        } catch (err) {
            throw new Error(err.message);
        }
    };

    async TokenAuthentication(_token) {
        try {
            let reqHeaders = new Headers();
            reqHeaders.append("Content-Type", "application/json");
            let url = this.baseUrl + this.userAuthenticationUrlApi + "?token=" + _token;
            let requestOptions = {
                method: 'POST',
                headers: reqHeaders,
            };
            return (await this.GetData(url, requestOptions));
        } catch (err) {
            console.log("TokenAuthentication error : ", err);
        }
    };

    // /**
    // * Get how many previous and next event.
    // * @public 
    // * @param {Number} _howManyPrevious - total number of the past event.
    // * @param {Number} __howManyNext - total number of the future event.
    // * @param {string} _sessionId - session id for the user.
    // * @param {String} _gameType - type of the game.
    // * @returns {Object} - all event data from KIRON Api's.
    // */
    // async HowManyPreviousNextEvents(_howManyPrevious, __howManyNext, _sessionId, _gameType) {
    //     try {
    //         let reqHeaders = new Headers();
    //         reqHeaders.append("Content-Type", "application/json");
    //         reqHeaders.append("token", this.token);
    //         let url = this.baseUrl + this.howManyPreviousAndNextEventApi + "?howmanyprevious=" + _howManyPrevious + "&howmanynext=" + __howManyNext + "&session_id=" + _sessionId + "&type=" + _gameType;
    //         let requestOptions = {
    //             method: 'GET',
    //             headers: reqHeaders,
    //         };
    //         return (await this.GetData(url, requestOptions));
    //     } catch (error) {
    //         console.log("error----", error);
    //     }
    // };

    IsParamsMissing() {
        if (this.mode === "offline") return false;
        if (!this.authToken) {
            return true;
        }
        Model.SetAuthToken(this.authToken);
        return false;
    };


};
//#endregion
let server = new Server();

export { server as Server };