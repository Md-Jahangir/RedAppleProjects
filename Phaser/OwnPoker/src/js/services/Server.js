
/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 16-02-2024.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 16-02-2024
 * @Description :- This class used for any interactions between client and server.
 ************************************/

import { Model } from "../Model";

//#region - Class defination 
class Server {
    /**
     * Create class instance and fill params from URL or fill it with default values if URL not contain needed data.
     * @constructs
    */
    constructor() {
        //================Platform API URL================================
        this.urlParams = new URLSearchParams(window.location.search);
        this.loginApiUrl = "login";
        this.logoutApiUrl = "logout";
        this.signUpApiUrl = "signup";
        this.verifyToken = "verify-token";
        this.forgotPasswordApiUrl = "forgot-password";
        this.resetPasswordApiUrl = "reset-password";
        this.changePassword = "change-password";
        this.getUserDetailsApiUrl = "get-user-details";
        this.updateUserDetails = "update-user-details";
        this.getAvatarList = "get-avatars";
        this.updateUserAvatars = "update-avatars";
        this.getTableDetailsApiUrl = "get-cash-tables";
        this.getLaunchApiUrl = "get-game-launch-url";
        this.generateGameTokenApiUrl = "generate-game-token";
        this.updateBalanceApiUrl = "update-balance";


        this.pokerAuthServiceBaseUrl = "https://staginglocal.redappletech.com/poker-auth-service/api/v1/";
        this.pokerCashApiServiceBaseUrl = "https://staginglocal.redappletech.com/poker-cashapi-service/api/v1/";
        this.pokerGameEngineServiceBaseUrl = "https://staginglocal.redappletech.com/poker-engine-service/api/v1/";
        // this.pokerAuthServiceBaseUrl = "http://192.168.1.25:5007/api/v1/";
        // this.pokerCashApiServiceBaseUrl = "http://192.168.1.25:5008/api/v1/";

        //================================================================

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
            // console.log("options before : ", options);
            // options.mode = 'no-cors';
            // console.log("options after : ", options);
            let response = await (await fetch(url, options)).json();
            console.log("GetData...........", response);

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

    // async GetData(url, options) {
    //     try {
    //         // Set default headers if not provided
    //         options.headers = options.headers || {};
    //         options.headers['Content-Type'] = 'application/json';

    //         // Send the request
    //         let response = (await fetch(url, options));
    //         console.log('response ', response)
    //         // Check if the response status indicates an error
    //         if (!response.ok) {
    //             // Throw an error with the message from the server
    //             throw new Error((response.json()).message);
    //         }
    //         // Parse and return JSON response
    //         return response.json();
    //     } catch (err) {
    //         // Log the error and rethrow it for further handling
    //         throw new Error(err.message || 'An unknown error occurred');
    //     }
    // }

    //#region LOGIN API
    async LoginApi(_email, _password) {
        console.log("_email: ", _email);
        console.log("_password: ", _password);

        let reqHeaders = new Headers();
        reqHeaders.append("Content-Type", "application/json");
        let url = this.pokerAuthServiceBaseUrl + this.loginApiUrl;
        let option = {
            login: _email,
            password: _password
        }
        try {
            let requestOptions = {
                method: 'POST',
                headers: reqHeaders,
                body: JSON.stringify(option),
            };
            return (await this.GetData(url, requestOptions));
        } catch (error) {
            console.log("Login Api error : ", error);
            throw new Error(error.message)
        }
    };
    //#endregion

    //#region LOGOUT API
    async LogoutApi() {
        let reqHeaders = new Headers();
        reqHeaders.append("Content-Type", "application/json");
        reqHeaders.append('token', Model.GetAuthTokenFromLocalStorage());
        let url = this.pokerAuthServiceBaseUrl + this.logoutApiUrl;
        try {
            let requestOptions = {
                method: 'POST',
                headers: reqHeaders
            };
            return (await this.GetData(url, requestOptions));
        } catch (error) {
            console.log("Logout Api error : ", error);
            throw new Error(error.message)
        }
    };
    //#endregion

    //#region SIGN UP API
    async SignUpApi(_username, _email, _password, _mobile) {
        console.log("_username: ", _username);
        console.log("_email: ", _email);
        console.log("_password: ", _password);
        console.log("_mobile: ", _mobile);

        let reqHeaders = new Headers();
        reqHeaders.append("Content-Type", "application/json");
        let url = this.pokerAuthServiceBaseUrl + this.signUpApiUrl;
        let option = {
            username: _username,
            email: _email,
            password: _password,
            mobile: _mobile,
            user_type: 3 //for platform login
        }
        try {
            let requestOptions = {
                method: 'POST',
                headers: reqHeaders,
                body: JSON.stringify(option),
            };
            return (await this.GetData(url, requestOptions));
        } catch (error) {
            console.log("Sign Up Api error : ", error);
        }
    };
    //#endregion

    //#region FORGOT PASSWORD API
    async ForgotPasswordApi(_email) {
        console.log("_email: ", _email);

        let reqHeaders = new Headers();
        reqHeaders.append("Content-Type", "application/json");
        let url = this.pokerAuthServiceBaseUrl + this.forgotPasswordApiUrl;
        let option = {
            email: _email
        }
        try {
            let requestOptions = {
                method: 'POST',
                headers: reqHeaders,
                body: JSON.stringify(option),
            };
            return (await this.GetData(url, requestOptions));
        } catch (error) {
            console.log("Forgot Password Api error : ", error);
        }
    };
    //#endregion

    //#region RESET PASSWORD API
    async ResetPasswordApi(_newPassword, _otp) {
        console.log("_newPassword: ", _newPassword);

        let reqHeaders = new Headers();
        reqHeaders.append("Content-Type", "application/json");
        let url = this.pokerAuthServiceBaseUrl + this.resetPasswordApiUrl;
        let option = {
            newPassword: _newPassword,
            tempToken: _otp
        }
        try {
            let requestOptions = {
                method: 'POST',
                headers: reqHeaders,
                body: JSON.stringify(option),
            };
            return (await this.GetData(url, requestOptions));
        } catch (error) {
            console.log("Reset Password Api error : ", error);
        }
    };
    //#endregion

    //#region GET USER DETAILS API
    async GetUserDetailsApi() {
        let token = Model.GetAuthTokenFromLocalStorage();
        console.log("token: ", token);
        let reqHeaders = new Headers();
        reqHeaders.append("Content-Type", "application/json");
        reqHeaders.append("token", token);
        let url = this.pokerAuthServiceBaseUrl + this.getUserDetailsApiUrl;

        try {
            let requestOptions = {
                method: 'GET',
                headers: reqHeaders
            };
            return (await this.GetData(url, requestOptions));
        } catch (error) {
            console.log("User Details Api error : ", error);
        }
    };
    //#endregion

    //#region GET TABLE DETAILS API
    async GetTableDetailsApi(_pageNum, _limit, _type) {
        let token = Model.GetAuthTokenFromLocalStorage();
        console.log("GetTableDetailsApi token: ", token);
        let reqHeaders = new Headers();
        reqHeaders.append("Content-Type", "application/json");
        reqHeaders.append("token", token);
        let url = this.pokerCashApiServiceBaseUrl + this.getTableDetailsApiUrl + "?page=" + _pageNum + "&limit=" + _limit + "&type=potType" + "&value=" + encodeURIComponent(_type);

        try {
            let requestOptions = {
                method: 'GET',
                headers: reqHeaders
            };
            return (await this.GetData(url, requestOptions));
        } catch (error) {
            console.log("Table Details Api error : ", error);
        }
    };
    //#endregion

    //#region GET GAME LAUNCH URL API
    async GetGameLaunchUrlApi(_tableId, _buyIn) {
        let token = Model.GetAuthTokenFromLocalStorage();
        console.log("GetGameLaunchUrlApi token: ", token);
        let reqHeaders = new Headers();
        reqHeaders.append("Content-Type", "application/json");
        reqHeaders.append("token", Model.GetAuthTokenFromLocalStorage());
        // let url = this.pokerCashApiServiceBaseUrl + this.getLaunchApiUrl + "?table_id=" + _tableId + "&buyin=" + _buyIn;
        let url = this.pokerCashApiServiceBaseUrl + this.getLaunchApiUrl + "?table_id=" + _tableId;
        try {
            let requestOptions = {
                method: 'GET',
                headers: reqHeaders
            };
            return (await this.GetData(url, requestOptions));
        } catch (error) {
            console.log("game launch Api error : ", error);
        }
    };
    //#endregion

    //#region GENERATE GAME TOKEN API
    async GenerateGameTokenApi() {
        let reqHeaders = new Headers();
        reqHeaders.append("Content-Type", "application/json");
        reqHeaders.append("token", Model.GetAuthTokenFromLocalStorage());
        let url = this.pokerGameEngineServiceBaseUrl + this.generateGameTokenApiUrl;
        try {
            let requestOptions = {
                method: 'GET',
                headers: reqHeaders
            };
            return (await this.GetData(url, requestOptions));
        } catch (error) {
            console.log("game Token Api error : ", error);
        }
    };
    //#endregion

    //#region UPDATE BALANCE API
    async UpdateBalance(_tableId, _amount) {
        try {
            const reqHeaders = new Headers();
            reqHeaders.append('Content-Type', 'application/json');
            reqHeaders.append('token', Model.GetAuthTokenFromLocalStorage());
            const option = {
                'table_id': _tableId,
                'amount': _amount,
            };
            const url = this.pokerAuthServiceBaseUrl + this.updateBalanceApiUrl;
            const requestOptions = {
                method: 'POST',
                headers: reqHeaders,
                body: JSON.stringify(option)
            };
            return (await this.GetData(url, requestOptions));
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log('UpdateBalance error: ', err);
        }
    };
    //#endregion

    IsParamsMissing() {
        // if (this.mode === "offline") return false;
        // if (!this.authToken || !this.tableId || !this.buyIn || !this.maxPlayers) {
        // if (!this.tableId || !this.buyIn || !this.maxPlayers) {
        //     return true;
        // }
        // // Model.SetAuthToken(this.authToken);
        // Model.SetTableId(this.tableId);
        // Model.SetBuyInAmount(this.buyIn);
        // Model.SetMaxPlayersCount(this.maxPlayers);
        // Model.SetSmallBlindAmount(this.smallBlind);
        // Model.SetBigBlindAmount(this.bigBlind);
        return false;
    };


};
//#endregion
let server = new Server();

export { server as Server };