class Server {
    constructor() {
        this.urlParams = new URLSearchParams(window.location.search);
        // this.baseURL = "https://staging.grandgaming.com/rest-api/api/v1/dashboard/";
        this.baseURL = "https://api.grandgaming.com/api/v1/dashboard/";
        this.verifyGameToken = "verifyGameToken";
        this.singlePlayerScoreUpdate = "singlePlayerScoreUpdate";
        this.deviceType = this.urlParams.get("device_type");
        this.token = this.urlParams.get("auth_token");
    };
    //#region - IsURLParamMissing?
    /**
     * @description - function using just opposite, if returns true then url is missing, if return false, url is not missing.
     * @returns {boolean} is missing or not
     */
    IsUrlParamsMissing() {
        if (!this.token || !this.deviceType) {
            return true;
        } else {
            return false;
        }
    };
    //#endregion

    //#region -GetData
    /**
     * 
     * @param {string} url 
     * @param {Object} options 
     * @returns 
     */
    async GetData(url, options) {
        try {
            let response = await (await fetch(url, options)).json();
            switch (true) {
                case (response.status == 404):
                    throw new Error(response.message);
                case (response.status == 401):
                    throw new Error(response.message);
                case (response.status == 400):
                    throw new Error(response.message);
                case (response.status == 406):
                    throw new Error(response.message);
                case (response.error):
                    throw new Error(response.message);
                default:
                    return response;
            }
        } catch (err) {
            throw new Error(err.message);
        }
    };
    //#endregion

    //#region  - VerfyToken
    async VerifyGameToken() {
        let url = this.baseURL + this.verifyGameToken;
        let reqHeaders = new Headers();
        reqHeaders.append("Content-Type", "application/json");
        let bodyOption = {
            "token": this.token
        };
        try {
            let requestOptions = {
                method: 'POST',
                headers: reqHeaders,
                body: JSON.stringify(bodyOption),
            }
            return (await this.GetData(url, requestOptions));
        }
        catch (error) {
            console.log("Error : ", error);
        }
    }
    //#endregion

    //#region -PlayerScoreUpdate
    async PlayerScoreUpdate(_gameID, _userID, _score) {
        let url = this.baseURL + this.singlePlayerScoreUpdate;
        let reqHeaders = new Headers();
        reqHeaders.append("Content-Type", "application/json");
        let bodyOption = {
            "game_id": _gameID,
            "user_id": _userID,
            "score": _score
        }
        try {
            let requestData = {
                method: "POST",
                headers: reqHeaders,
                body: JSON.stringify(bodyOption)
            }
            await this.GetData(url, requestData);
        }
        catch (error) {
            console.log("Error : ", error);
        }
    }
    //#endregion
};

//Global Instance
let server = new Server();
export { server as Server };