/**
 * This class used for any interactions between client and server. 
 */
import { Client } from "./Client.js";
class Server {
    /**
     * Create class instance and fill params from URL or fill it with default values if URL not contain needed data.
     * @constructs
     */
    constructor() {
        this.urlParams = new URLSearchParams(window.location.search);
        this.sectionId = this.urlParams.get("sectionid");
        this.rpgId = this.urlParams.get("RpgId");
        this.serverAddress = baseUrl; // "http://139.59.74.142:89/api/";
    };
    //#############################################################################################
    /**
     * Requests data from server, and call handler function after responce was received. URL contain only
     * needed data - action name and it's params. Static parts or URL stored in class instance.
     * @public
     * @param {string} url - string with action name and params.
     * @param {object} options - context for callback function.
     */
    async getData(url, options) {
        try {
            let response = await fetch(url, options);
            return response.json();
        } catch (err) {
            console.log("Error log: ", err);
        }
    };

    //#############################################################################################
    async getGameCourseData() {
        let reqHeaders = new Headers();
        reqHeaders.append("Content-Type", "application/json");
        let url = this.serverAddress + 'lmsgetcoursesectiongame';
        let option = {
            sectionid: this.sectionId
        }
        let requestOptions = {
            method: 'POST',
            body: JSON.stringify(option),
            headers: reqHeaders,
        };
        return (await this.getData(url, requestOptions));
    }

    async submitCompleteStatusData(_status) {
        let reqHeaders = new Headers();
        reqHeaders.append("Content-Type", "application/json");
        let url = this.serverAddress + 'lmsupdategamesectionstatus';
        let option = {
            RpgId: this.rpgId,
            sectionid: this.sectionId,
            status: _status
        }
        let requestOptions = {
            method: 'POST',
            body: JSON.stringify(option),
            headers: reqHeaders,
        };
        let resp = await this.getData(url, requestOptions)
        return (resp);
    }

    async submitUserResponseData(_courseId, _gameSectionId, _gameTestResponse, _gameTestStatus, _gameTestScore) {
        let reqHeaders = new Headers();
        reqHeaders.append("Content-Type", "application/json");
        let url = this.serverAddress + 'lmsaddupdateusercoursegamesection';
        let option = {
            RpgId: this.rpgId,
            courseid: _courseId,
            sectionid: this.sectionId,
            gamesectionid: _gameSectionId,
            game_test_response: _gameTestResponse,
            game_test_status: _gameTestStatus,
            game_test_score: _gameTestScore
        }
        let requestOptions = {
            method: 'POST',
            body: JSON.stringify(option),
            headers: reqHeaders,
        };
        return (await this.getData(url, requestOptions));
    }

    isUrlParamsMissing() {
        if (!this.sectionId || !this.rpgId) {
            return true;
        }
        return false;
    };
};

let server = new Server();

export { server as Server };