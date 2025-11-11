// import { Model } from "./model";
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
        this.token = this.urlParams.get("t");
        this.isStandAlone = this.urlParams.get("standAlone");
        this.platform = this.urlParams.get("platform");
        this.level = this.urlParams.get("level");
        this.time = this.urlParams.get("time");
        this.favoriteID = this.urlParams.get("favorite_id");
        this.serverAddress = "https://dev-api.emazebrain.com/api/v1/gamedata";
        this.serverAddressTherapist = "https://dev-api.emazebrain.com/api/v1/favorite-gamedata";

        this.serverPostAddress = "https://dev-api.emazebrain.com/api/v1/responsedata/";

        this.imageUrl = "https://dev-api.emazebrain.com/api/v1/imagedata/";
        this.imageUrlTherapist = "https://dev-api.emazebrain.com/api/v1/favorite-imagedata/";
        this.authUrl = "https://dev-api.emazebrain.com/api/v1/game/auth";
        this.standAloneUrl = "https://dev-api.emazebrain.com/api/v1/staticGames/getData";
        // console.log("this.token"+this.token);
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
    async getData(url, options) {

        try {
            let response = await fetch(url, options);
            return response.json();
        } catch (err) {
            console.log("Error log: ", err);
        }

    };

    //#############################################################################################
    /**
     * Requests initial data for game. Initial data need to contain paytable, paylines configurations,
     * user balance and available bets range.
     * @public
     * @param {function} callback - handler for initial data. 
     * @param {object} callbackContext - context for handler.
     */
    async TokenAuthentication(_server) {
        _server.token = "Bearer " + _server.token;
        console.log("Server.token" + _server.token);
        let reqHeaders = new Headers();
        reqHeaders.append("Content-Type", "application/json");
        reqHeaders.append("Authorization", _server.token);
        let url = _server.authUrl;
        let requestOptions = {
            method: 'POST',
            headers: reqHeaders
        };
        return (await this.getData(url, requestOptions));
    }
    async getGameData(_server) {
        let reqHeaders = new Headers();
        reqHeaders.append("Content-Type", "application/json");
        reqHeaders.append("Authorization", _server.token);
        let url;
        if (this.isStandAlone) {
            url = this.standAloneUrl;
        } else {
            url = this.serverAddress;
        }

        let option = {
            game_id: gameId.toString(),
        };

        let requestOptions = {
            method: 'POST',
            headers: reqHeaders,
            body: JSON.stringify(option)
        };
        return (await this.getData(url, requestOptions));
    }
    async getImageData(_bg, _main, _server) {
        let reqHeaders = new Headers();
        reqHeaders.append("Content-Type", "application/json");
        reqHeaders.append("Authorization", _server.token);
        let url = this.imageUrl;
        let option = {
            bg_images_cdn_location: _bg,
            main_images_cdn_location: _main
        };
        let requestOptions = {
            method: 'POST',
            headers: reqHeaders,
            body: JSON.stringify(option)
        };
        return (await this.getData(url, requestOptions));
    }

    async getTherapistGameData(_server) {
        console.log("Server.token", _server.token);
        let reqHeaders = new Headers();
        reqHeaders.append("Content-Type", "application/json");
        reqHeaders.append("Authorization", `Bearer ${_server.token}`);
        // reqHeaders.append("Authorization","Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IllsWUFtbE55bSIsImlhdCI6MTY0MjY2MTQwNiwiZXhwIjoxNjc0MTk3NDA2LCJzdWIiOiJ0b2tlbiIsImlzcyI6InBsYXRmb3JtIiwiZGF0YSI6eyJ1c2VyX2lkIjoyLCJzb3VyY2VfdHlwZSI6MSwidXNlcl90eXBlIjoxLCJmaXJzdF9uYW1lIjoiYW5rdXNoIiwibGFzdF9uYW1lIjoic2hvbWUiLCJ1c2VybmFtZSI6ImFua3VzaCIsImVtYWlsIjoiYW5rdXNoc2hvbWVAZ21haWwuY29tIiwicGhvbmUiOiI5ODc0NjE4ODQ1IiwicHJvZmlsZV9pbWFnZSI6IiIsInN0YXR1cyI6MH19.PzW89gciLlPY_sxEVjBIXC8Biqh4Qqd9yRAXPOqc3pA");
        let url = null;
        if (this.isStandAlone) {
            url = this.standAloneUrl;
        }
        else {
            url = this.serverAddressTherapist;
        }
        let option;
        if (this.platform == "favorites") {
            option = {
                game_id: gameId.toString(),
                favorite_id: this.favoriteID.toString()
            };
        } else {
            option = {
                game_id: gameId.toString(),
            };
        }
        let requestOptions = {
            method: 'POST',
            headers: reqHeaders,
            body: JSON.stringify(option)
        };
        console.log(' header', reqHeaders, requestOptions);

        return (await this.getData(url, requestOptions));
    }
    async getTherapistImageData(_bg, _main, _server) {
        let reqHeaders = new Headers();
        reqHeaders.append("Content-Type", "application/json");
        reqHeaders.append("Authorization", `Bearer ${_server.token}`);
        // reqHeaders.append("Authorization","Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IllsWUFtbE55bSIsImlhdCI6MTY0MjY2MTQwNiwiZXhwIjoxNjc0MTk3NDA2LCJzdWIiOiJ0b2tlbiIsImlzcyI6InBsYXRmb3JtIiwiZGF0YSI6eyJ1c2VyX2lkIjoyLCJzb3VyY2VfdHlwZSI6MSwidXNlcl90eXBlIjoxLCJmaXJzdF9uYW1lIjoiYW5rdXNoIiwibGFzdF9uYW1lIjoic2hvbWUiLCJ1c2VybmFtZSI6ImFua3VzaCIsImVtYWlsIjoiYW5rdXNoc2hvbWVAZ21haWwuY29tIiwicGhvbmUiOiI5ODc0NjE4ODQ1IiwicHJvZmlsZV9pbWFnZSI6IiIsInN0YXR1cyI6MH19.PzW89gciLlPY_sxEVjBIXC8Biqh4Qqd9yRAXPOqc3pA");
        let url = this.imageUrlTherapist;
        let option = {
            bg_images_cdn_location: _bg,
            main_images_cdn_location: _main
        };
        let requestOptions = {
            method: 'POST',
            headers: reqHeaders,
            body: JSON.stringify(option)
        };
        return (await this.getData(url, requestOptions));
    }

    async sendGameData(_data, _server) {
        let reqHeaders = new Headers();
        reqHeaders.append("Content-Type", "application/json");
        reqHeaders.append("Authorization", _server.token);
        let url = this.serverPostAddress;
        let option = _data;

        let requestOptions = {
            method: 'POST',
            body: JSON.stringify(option),
            headers: reqHeaders,
        };
        return (await this.getData(url, requestOptions));
    }
    isUrlParamsMissing() {
        if (this.token == null || this.token == undefined || this.token == "") {
            console.log("token not found" + this.token)
            return false;
        } else {
            console.log("token not found" + this.token);
            return true;
        }
    };
};

let server = new Server();

export { server as Server };