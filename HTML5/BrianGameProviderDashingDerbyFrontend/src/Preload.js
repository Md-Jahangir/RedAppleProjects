/********* Script_Details ************
 * @Original_Creator :- Md jahangir.
 * @Created_Date :- 06-03-2023.
 * @Last_Update_By :- Md jahangir.
 * @Last_Updatd_Date :- 12-05-2023
 * @Description :- Handles all data recived at the starting time of the game and show loader .
 ************************************/

import { Constant } from "./app/components/Constant.js";
import { Loader } from "./app/components/Loader.js";
import { Popup } from "./app/components/Popup.js";
import { Utils } from "./app/components/Utils.js";
import { Server } from "./app/services/Server.js";
import { GameManager } from "./app/core/GameManager.js";
import { Localization } from "./app/components/Localization.js";

//#region - Class defination
export default class Preload {
    /**
    * initializes variables.
    * @Constructor
    */
    constructor() {
        Loader.ShowLoader();

        this.gameListArray = [];
        this.selectedGameId = null;
    };

    /**
    * Get all the game list from server 
    * @param {string} _operatorId - id of the operator
    * @param {string} _playerToken - player token
    * @param {string} _currencyCode - code of currrency 
    * @param {string} _languageCode - language code
    * @param {string} _mode - mode of the game 
    * @returns {null} 
    */
    async GetAllGameList(_operatorId, _playerToken, _currencyCode, _languageCode, _mode) {
        let response = await Server.GetAllGameList(_operatorId);
        if (response.error == false) {
            this.gameListArray = [...response.data];
        } else {
            Popup.ShowErrorPopup(response.message);
        }
        this.CreateGameTab(_operatorId, _playerToken, _currencyCode, _languageCode, _mode);
    }

    /**
    * Create all the game list from server date in a tab 
    * @param {string} _operatorId - id of the operator
    * @param {string} _playerToken - player token
    * @param {string} _currencyCode - code of currrency 
    * @param {string} _languageCode - language code
    * @param {string} _mode - mode of the game 
    * @returns {null} 
    */
    CreateGameTab(_operatorId, _playerToken, _currencyCode, _languageCode, _mode) {
        let gameTabObj = document.getElementById("gameListTab");
        if (gameTabObj) {
            for (let i = 0; i < this.gameListArray.length; i++) {
                let li = document.createElement("LI");
                li.setAttribute('class', 'nav-item');
                li.setAttribute('role', 'presentation');
                li.gamename = this.gameListArray[i].game_name;
                let button = document.createElement("button");
                button.innerText = this.gameListArray[i].game_name;
                button.id = this.gameListArray[i]._id;
                button.itemid = this.gameListArray[i].game_type;
                button.className = "nav-link";
                li.appendChild(button);
                button.addEventListener("click", () => {
                    this.OnGameTabClicked(button, _operatorId, _playerToken, _currencyCode, _languageCode, _mode);
                });
                gameTabObj.appendChild(li);
                if (button.itemid == "dashingderby") {
                    button.classList.add("active");
                }
            }
        }
    };

    /**
    * Handle game change from tab cliked
    * @param {object} _obj - selected tab object
    * @param {string} _operatorId - id of the operator
    * @param {string} _playerToken - player token
    * @param {string} _currencyCode - code of currrency 
    * @param {string} _languageCode - language code
    * @param {string} _mode - mode of the game 
    * @returns {null} 
    */
    async OnGameTabClicked(_obj, _operatorId, _playerToken, _currencyCode, _languageCode, _mode) {

        if (_obj.itemid == "platinumhounds") {
            if (window.confirm(Localization.ifYouLeaveTheCurrentGameText)) {
                this.ResetTabSelected();
                _obj.classList.add("active");
                // let url = "http://16.162.71.88/BrianGameProviderPlatinumHounds/";
                let url = "https://plathounds.krnasia.com/";
                let response = await Server.GetGameLaunchUrl(_operatorId, _playerToken, _currencyCode, _languageCode, _obj.id, url, _mode);
                if (response.error == false) {
                    window.open(response.data, "_self");
                }
            }
        } else {
        }
    };

    /**
    * Handle inactive game tab list when clicked.
    *  @returns {null} 
    */
    ResetTabSelected() {
        let obj = document.getElementById("gameListTab");
        if (obj.children.length > 0) {
            for (let i = 0; i < obj.children.length; i++) {
                let liObj = obj.children[i];
                liObj.children[0].classList.remove("active");
            }
        }
    }

    /**
    * Load the video url for stream video.
    * @returns {null} 
    */
    LoadVideoFromUrl() {
        let playerDesktop = videojs('dashing_stream_video_desktop');
        playerDesktop.ready(function () {
            setTimeout(function () {
                playerDesktop.autoplay('muted');
                playerDesktop.fluid('true');
            }, 1000);
            playerDesktop.play();
        });

        let playerMobile = videojs('dashing_stream_video_mobile');
        playerMobile.ready(function () {
            setTimeout(function () {
                playerMobile.autoplay('muted');
                playerMobile.fluid('true');
            }, 1000);
            playerMobile.play();
        });
    };

    /**
    * Get Token data url parameters.
    *  @returns {object} params object
    */
    GetDataFromUrlParams() {
        let urlParams = new URLSearchParams(window.location.search);
        let urlPramsObj = {
            token: urlParams.get("token")
        };
        return urlPramsObj;
    };

    /**
    * Handle Token validation,user balance.
    * @returns {null} 
    */
    async ValidateUserAuthentication() {
        let urlParamsData = this.GetDataFromUrlParams();
        this.LoadVideoFromUrl();
        if (Utils.IsEmpty(urlParamsData.token)) {
            Popup.ShowErrorPopup(Localization.urlParameterMissingText);
        } else {
            let authResponse = await Server.TokenAuthentication(urlParamsData.token);
            if (authResponse.error == false) {
                if (authResponse.data != null) {
                    if (parseInt(authResponse.data.Code) == 0) {
                        Localization.SetTheTextAsPerLanguage(authResponse.data.LanguageCode);
                        this.GetAllGameList(authResponse.data.operator_id, authResponse.data.player_token, authResponse.data.CurrencyCode, authResponse.data.LanguageCode, authResponse.data.mode);
                        let balanceResponse = await Server.GetUserBalance(
                            authResponse.data.player_token,
                            authResponse.data.operator_id,
                            authResponse.data.PlayerID,
                            authResponse.data.CurrencyCode,
                            authResponse.data.session_id
                        );

                        if (balanceResponse.error == false) {
                            if (balanceResponse.data.Code == 0) {
                                this.OnDataReceived(
                                    authResponse.data.player_token, authResponse.data.operator_id,
                                    authResponse.data.game_id, authResponse.data.PlayerID,
                                    authResponse.data.user_id, authResponse.data.CurrencyCode,
                                    authResponse.data.LanguageCode, authResponse.data.session_id,
                                    balanceResponse.data.Amount, authResponse.data.mode, authResponse.data.UserName
                                );
                            }
                        } else {
                            Loader.HideLoader();
                            Popup.ShowErrorPopup(balanceResponse.message);
                        }
                    } else {
                        Loader.HideLoader();
                        Popup.ShowErrorPopup(authResponse.message);
                    }
                } else {
                    Loader.HideLoader();
                    Popup.ShowErrorPopup(authResponse.message);
                }
            } else {
                Loader.HideLoader();
                Popup.ShowErrorPopup(authResponse.message);
            }
        }
    };

    /**
    * Get the creadential data and store
    * @public 
    * @param {string} _playerToken - player token
    * @param {string} _operatorId - id of the operator
    * @param {string} _gameId - game id 
    * @param {string} _playerId - id of the platform player
    * @param {string} _userId - id of the user
    * @param {string} _currencyCode - code of currrency 
    * @param {string} _languageCode - language code
    * @param {string} _sessionId - mode
    * @param {string} _userBalanace - balance of the user
    * @param {string} _mode - mode of the game
    * @returns {null} 
    */
    OnDataReceived(_playerToken, _operatorId, _gameId, _playerId, _userId, _currencyCode, _languageCode, _sessionId, _userBalanace, _mode, _userName) {
        if (
            Utils.IsEmpty(_playerToken) || Utils.IsEmpty(_operatorId) ||
            Utils.IsEmpty(_gameId) || Utils.IsEmpty(_playerId) ||
            Utils.IsEmpty(_userId) || Utils.IsEmpty(_currencyCode) ||
            Utils.IsEmpty(_languageCode) || Utils.IsEmpty(_sessionId) ||
            Utils.IsEmpty(_userBalanace) || Utils.IsEmpty(_mode) ||
            Utils.IsEmpty(_userName)
        ) {
            Popup.ShowErrorPopup(Localization.noValueWillBeNullText);
        } else {
            Constant.InitializeCredentials(_playerToken, _operatorId, _gameId, _playerId, _userId, _currencyCode, _languageCode, _sessionId, _userBalanace, _mode, _userName);
            setInterval(() => {
                GameManager.SetCurrentTime();
            }, 1000);
            GameManager.SetTotalAvailableBalance(_userBalanace);
            GameManager.CreateObjectOfGameTimeManager();
            GameManager.SetAllEventTime();
            GameManager.SetAllBetConfiguration();
            GameManager.SetAllEventListener();
            GameManager.GetAllSessionBets();
            GameManager.SetGameHistoryData();
            GameManager.SetUserName();
        }
    };

}
//#endregion