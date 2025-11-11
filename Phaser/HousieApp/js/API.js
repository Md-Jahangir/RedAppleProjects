var baseUrL = "http://13.232.173.115:3001";
var loginUrl = "/login";
var logoutUrl = "/logout";
var forgotPasswordGenerateOtpUrl = "/forget-password-generate-otp";
var verifyForgetOtpUrl = "/verify-forget-otp";
var resetPasswordUrl = "/reset-password";
var profileDetailsUrl = "/profile-details";
var stateListUrl = "/list-state";
var registrationUrl = "/registration";
var purchaseTicketUrl = "/purchaset-ticket";
var gameListUrl = "/list-game";
var joinGameUrl = "/join-game";
var playedGameUrl = "/played-game";
var leaderboardUrl = "/leader-board";
var updateProfileUrl = "/update-profile";
var dailyBonusUrl = "/daily-bonus";
var advertisementUrl = "/list-advertisements";
var prizeListingUrl = "/list-prizes";
var claimPrize = "/claim-prize";

var accessToken;
var tokenForPasswordChange;
var stateList = [];
var meUserId = 0;
var advertisingImageUrl = ""
var prizeListResponse;
var claimResponse = "";

var API = {
    GetUrl: function(apiUrl) {
        return baseUrL + apiUrl;
    },

    StateList: function() {
        // console.log("The StateList Url............................" + API.GetUrl(stateListUrl));
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            // console.log("The StateList Status................" + this.status);
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var stateListResponse = JSON.parse(this.responseText);
                stateList = stateListResponse.result;
                // console.log("stateListResponse: " + this.responseText);
                if (stateListResponse.status != 1) {
                    Alert.ShowAlert(stateListResponse.message);
                } else {}
            } else {}
        };
        xhttp.open("POST", API.GetUrl(stateListUrl), true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("");
    },

    Registration: function(_name, _email, _password, _dob, _stateId, _phoneNo, _gender) {
        // console.log("The Registration Url............................" + API.GetUrl(registrationUrl));
        LoadingPopup.ShowLoadingPopup();
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            // console.log("The Registration Status................" + this.responseText);
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var registrationResponse = JSON.parse(this.responseText);
                if (registrationResponse.status == 1) {
                    // console.log("Registration...ResponseText.......1" + (this.responseText));
                    LoadingPopup.HideLoadingPopup();

                    accessToken = registrationResponse.result.accessToken;
                    localStorage.setItem("logged_in", true);
                    localStorage.setItem("access_token", accessToken);
                    // localStorage.setItem("is_app_launch_first_time", false);

                    API.ProfileDetails(accessToken);
                    StateTransition.TransitToMenu();
                } else {
                    LoadingPopup.HideLoadingPopup();
                    Alert.ShowAlert(registrationResponse.message);
                }
            } else {}
        };
        xhttp.open("POST", API.GetUrl(registrationUrl), true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("name=" + _name + "&email=" + _email + "&password=" + _password + "&dob=" + _dob + "&stateId=" + _stateId + "&phoneNo=" + _phoneNo + "&gender=" + _gender);
    },

    //------------------------------------------Login-----------------------------------
    Login: function(_email, _password, _deviceId, _deviceToken, _deviceType) {
        // console.log("The Login Url............................" + API.GetUrl(loginUrl));
        LoadingPopup.ShowLoadingPopup();
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            console.log("The Login Status................" + this.status);
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var loginResponse = JSON.parse(this.responseText);
                if (loginResponse.status == 1) {
                    // console.log("login Response Text.......1" + this.responseText);
                    LoadingPopup.HideLoadingPopup();
                    accessToken = loginResponse.result.accessToken;
                    localStorage.setItem("logged_in", true);
                    localStorage.setItem("access_token", accessToken);
                    // localStorage.setItem("is_app_launch_first_time", false);
                    StateTransition.TransitToMenu();
                    SoundManager.PlayWelcomeSound();
                } else if (loginResponse.status == 18) {
                    LoadingPopup.HideLoadingPopup();
                    Alert.ShowAlert(loginResponse.message);
                } 
                else {
                    LoadingPopup.HideLoadingPopup();
                    Alert.ShowAlert(loginResponse.message);
                }
            } else {}
        };
        xhttp.open("POST", API.GetUrl(loginUrl), true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("email=" + _email + "&password=" + _password);
    },

    //------------------------------------------LogOut-----------------------------------
    Logout: function(_accessToken) {
        // console.log("The Logout Url............................" + API.GetUrl(logoutUrl));
        LoadingPopup.ShowLoadingPopup();
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            // console.log("The Logout Status................" + this.status + "access token " + accessToken);
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var logoutResponse = JSON.parse(this.responseText);
                if (logoutResponse.status == 1) {
                    LoadingPopup.HideLoadingPopup();
                    // console.log("Logout ResponseText.......1" + this.responseText);
                    localStorage.setItem("logged_in", false);
                    localStorage.setItem("page_name", "");
                    localStorage.setItem("access_token", "");
                    // localStorage.setItem("is_app_launch_first_time", true);
                    meUserId = 0;
                    StateTransition.TransitToLogin();
                    LoadingPopup.HideLoadingPopup();
                }else if(logoutResponse.status == 10){
                    console.log("logoutResponse 10");
                    localStorage.setItem("logged_in", false);
                    localStorage.setItem("page_name", "");
                    localStorage.setItem("access_token", "");
                    meUserId = 0;
                    StateTransition.TransitToLogin();
                    LoadingPopup.HideLoadingPopup();
                }  
                else {
                    LoadingPopup.HideLoadingPopup();
                    Alert.ShowAlert(logoutResponse.message);
                }
            } else {}
        };
        xhttp.open("POST", API.GetUrl(logoutUrl), true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("access-token", _accessToken);
        xhttp.send("");
    },

    //------------------------------------------ForgetPasswordGenerateOtp-----------------------------------
    ForgetPasswordGenerateOtp: function(_email) {
        // console.log("The ForgetPasswordGenerateOtp Url............................" + API.GetUrl(forgotPasswordGenerateOtpUrl));
        LoadingPopup.ShowLoadingPopup();
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            // console.log("The ForgetPasswordGenerateOtp Status................" + this.status);
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var forgetPasswordGenerateOtpResponse = JSON.parse(this.responseText);
                if (forgetPasswordGenerateOtpResponse.status == 1) {
                    LoadingPopup.HideLoadingPopup();
                    // console.log("ForgetPasswordGenerateOtp ResponseText.......1" + this.responseText);
                    forgotEmailTextInputField.value = "";
                    tokenForPasswordChange = forgetPasswordGenerateOtpResponse.result.token;
                    StateTransition.TransitToOtp();
                } else {
                    LoadingPopup.HideLoadingPopup();
                    Alert.ShowAlert(forgetPasswordGenerateOtpResponse.message);
                    if (forgotEmailTextInputField != null) {
                        forgotEmailTextInputField.value = "";
                    } else {}
                }
            } else {}
        };
        xhttp.open("POST", API.GetUrl(forgotPasswordGenerateOtpUrl), true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("email=" + _email);
    },

    //------------------------------------------VerifyForgetOtp-----------------------------------
    VerifyForgetOtp: function(_otp) {
        // console.log("The VerifyForgetOtp Url............................" + API.GetUrl(verifyForgetOtpUrl));
        LoadingPopup.ShowLoadingPopup();
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            // console.log("The VerifyForgetOtp Status................" + this.status);
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var forgetVerifyOtpResponse = JSON.parse(this.responseText);
                if (forgetVerifyOtpResponse.status == 1) {
                    LoadingPopup.HideLoadingPopup();
                    // console.log("VerifyForgetOtp ResponseText.......1" + this.responseText);
                    otpTextInputField.value = "";
                    StateTransition.TransitToResetPassword();
                } else {
                    LoadingPopup.HideLoadingPopup();
                    Alert.ShowAlert(forgetVerifyOtpResponse.message);
                    if (otpTextInputField != null) {
                        otpTextInputField.value = "";
                    } else {}
                }
            } else {}
        };
        xhttp.open("POST", API.GetUrl(verifyForgetOtpUrl), true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("otp=" + _otp + "&token=" + tokenForPasswordChange);
    },

    //------------------------------------------ResetPassword-----------------------------------
    ResetPassword: function(_password) {
        // console.log("The ResetPassword Url............................" + API.GetUrl(resetPasswordUrl));
        LoadingPopup.ShowLoadingPopup();
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            // console.log("The ResetPassword Status................" + this.status);
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var resetPasswordResponse = JSON.parse(this.responseText);
                if (resetPasswordResponse.status == 1) {
                    // console.log("ResetPassword ResponseText.......1" + this.responseText);
                    LoadingPopup.HideLoadingPopup();
                    StateTransition.TransitToLogin();
                } else {
                    LoadingPopup.HideLoadingPopup();
                    Alert.ShowAlert(resetPasswordResponse.message);
                    if (newPasswordTextInputField != null) {
                        newPasswordTextInputField.value = "";
                    } else {}
                    if (confirmPasswordTextInputField != null) {
                        confirmPasswordTextInputField.value = "";
                    } else {}
                }
            } else {}
        };
        xhttp.open("POST", API.GetUrl(resetPasswordUrl), true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("token=" + tokenForPasswordChange + "&password=" + _password);
    },
    //------------------------------------------ProfileDetails-----------------------------------
    ProfileDetails: function(_accessToken) {
        // console.log("The ProfileDetails Url............................" + API.GetUrl(profileDetailsUrl));
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            // console.log("The ProfileDetails Status................" + this.status);
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var profileDetailsResponse = JSON.parse(this.responseText);
                if (profileDetailsResponse.status == 1) {
                    // console.log("ProfileDetails ResponseText.......1" + this.responseText);
                    LoadingPopup.HideLoadingPopup();

                    API.SetTheValueOfProfileDetailsInVariables(profileDetailsResponse);

                }else if(profileDetailsResponse.status == 10){
                    console.log("profileDetailsResponse 10");
                    API.Logout(localStorage.getItem("access_token"));
                    Alert.HideAlert();
                    LoadingPopup.HideLoadingPopup();
                } 
                else {
                    LoadingPopup.HideLoadingPopup();
                    Alert.ShowAlert(profileDetailsResponse.message);
                }
            } else {}

        };
        xhttp.open("POST", API.GetUrl(profileDetailsUrl), true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("access-token", _accessToken);
        xhttp.send("");
    },
    SetTheValueOfProfileDetailsInVariables: function(_profileDetailsResponse) {
        // console.log("The Bonus Amount.................."+_profileDetailsResponse.result.bonusAmount);
        var userId = _profileDetailsResponse.result.userId;
        meUserId = _profileDetailsResponse.result.userId;
        var userDob = _profileDetailsResponse.result.dob;
        var userName = _profileDetailsResponse.result.name;
        var userEmail = _profileDetailsResponse.result.email;
        var userPhoneNo = _profileDetailsResponse.result.phoneNo;
        var userStateId = _profileDetailsResponse.result.stateId;
        var userGender = _profileDetailsResponse.result.gender;
        var userRewardAmount = _profileDetailsResponse.result.rewardAmount;
        var userEarnedAmount = _profileDetailsResponse.result.bonusAmount;
        var userWalletMoney = _profileDetailsResponse.result.walletMoney;
        var userLifeLine = _profileDetailsResponse.result.lifeLine;
        if (_profileDetailsResponse.result.image == "") {
            var userImage = 'profile_pic';
        } else {
            userImage = _profileDetailsResponse.result.image;
        }

        API.SendTheValueToTheMenuProfileEditProfile(userName, userEmail, userPhoneNo, userStateId, userGender, userRewardAmount, userWalletMoney, userLifeLine, userImage, userEarnedAmount);
    },

    SendTheValueToTheMenuProfileEditProfile: function(_userName, _userEmail, _userPhoneNo, _userStateId, _userGender, _userRewardAmount, _userWalletMoney, _userLifeLine, _userImage, _userEarnedAmount) {
        if (gamePage == "Menu") {
            // console.log("The gamepage..........................."+gamePage);
            Menu.prototype.SetValueFromServer(_userEarnedAmount, _userWalletMoney, _userLifeLine, _userRewardAmount);
        } else if (gamePage == "ProfilePage") {
            LoadingPopup.ShowLoadingPopup();
            ProfilePage.prototype.SetValueFromServer(_userName, _userPhoneNo, _userImage, _userRewardAmount, _userWalletMoney, _userLifeLine);
        } else if (gamePage == "EditProfile") {
            LoadingPopup.ShowLoadingPopup();
            EditProfile.prototype.SetValueFromServer(_userName, _userPhoneNo, _userEmail, _userStateId, _userGender, _userImage);
        } else {}
    },

    //------------------------------------------Leaderboard-----------------------------------
    Leaderboard: function(_accessToken) {
        // console.log("The Leaderboard Url............................" + API.GetUrl(leaderboardUrl));
        LoadingPopup.ShowLoadingPopup();
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            // console.log("The Leaderboard Status................" + this.status);
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var leaderboardResponse = JSON.parse(this.responseText);
                if (leaderboardResponse.status == 1) {
                    // console.log("Leaderboard ResponseText.......1" + this.responseText);
                    var leaderboardList = leaderboardResponse.result;
                    LeaderBoard.prototype.SetValueFromServer(leaderboardList);
                } 
                else if(leaderboardResponse.status == 10){
                    console.log("leaderboardResponse 10");
                    Alert.HideAlert();
                    API.Logout(localStorage.getItem("access_token"));
                    LoadingPopup.HideLoadingPopup();
                }
                else {
                    LoadingPopup.HideLoadingPopup();
                    Alert.ShowAlert(leaderboardResponse.message);
                }
            } else {}
        };
        xhttp.open("POST", API.GetUrl(leaderboardUrl), true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("access-token", _accessToken);
        xhttp.send("");
    },

    //------------------------------------------UpdateProfile-----------------------------------
    UpdateProfile: function(_accessToken, _name, _phoneNo, _gender, _stateId, _image) {
        // console.log("_stateId" + _stateId);
        // console.log("The UpdateProfile Url............................" + API.GetUrl(updateProfileUrl));
        LoadingPopup.ShowLoadingPopup();
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            // console.log("The UpdateProfile Status................" + this.status);
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var updateProfileResponse = JSON.parse(this.responseText);
                if (updateProfileResponse.status == 1) {
                    LoadingPopup.HideLoadingPopup();
                    // console.log("UpdateProfile ResponseText.......1" + this.responseText);
                    Alert.ShowAlert(updateProfileResponse.message, false);
                    setTimeout(() => {
                        Alert.HideAlert();
                        StateTransition.TransitToProfilePage();
                    }, 1000);
                } else {
                    LoadingPopup.HideLoadingPopup();
                    Alert.ShowAlert(updateProfileResponse.message);
                }
            } else {}
        };
        xhttp.open("POST", API.GetUrl(updateProfileUrl), true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("access-token", _accessToken);
        xhttp.send("name=" + _name + "&phoneNo=" + _phoneNo + "&gender=" + _gender + "&stateId=" + _stateId);
    },

    //------------------------------------------GameList-----------------------------------
    GameList: function(_accessToken) {
        // console.log("The GameList Url............................" + API.GetUrl(gameListUrl));
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            // console.log("The GameList Status................" + this.status);
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var gameListResponse = JSON.parse(this.responseText);
                var gameList = gameListResponse.result;
                if (gameListResponse.status == 1) {
                    // console.log("GameList ResponseText.......1" + this.responseText);
                    LoadingPopup.HideLoadingPopup();
                    //Create List of tournament
                    Menu.prototype.CreateTouramentList(gameList);
                }else if(gameListResponse.status == 10){
                    console.log("gameListResponse 10");
                    Alert.HideAlert();
                    API.Logout(localStorage.getItem("access_token"));
                    LoadingPopup.HideLoadingPopup();
                } 
                else {
                    LoadingPopup.HideLoadingPopup();
                    Alert.ShowAlert(gameListResponse.message);
                }
            } else {}
        };
        xhttp.open("POST", API.GetUrl(gameListUrl), true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("access-token", _accessToken);
        xhttp.send("");
    },

    //------------------------------------------PurchaseTicket-----------------------------------
    PurchaseTicket: function(_accessToken, _noOfBuyTicket, _gameId, _price, _buttonIndex) {
        // console.log("The PurchaseTicket Url............................" + API.GetUrl(purchaseTicketUrl));
        LoadingPopup.ShowLoadingPopup();
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            // console.log("The PurchaseTicket Status................" + this.status);
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var purchaseTicketResponse = JSON.parse(this.responseText);
                var purchasedTicketIdArray = purchaseTicketResponse.result;
                var purchasedTicketId = "";
                // console.log("PurchaseTicket ResponseText.......1" + this.responseText);
                purchasedTicketId = API.CheckingAndReturnTicketId(purchasedTicketIdArray);

                if (purchaseTicketResponse.status == 1) {
                    LoadingPopup.HideLoadingPopup();
                    if (_noOfBuyTicket == 1) {
                        setTimeout(() => {
                            SoundManager.PlayOneTicketSound();
                        }, 100);
                    } else {
                        setTimeout(() => {
                            SoundManager.PlayTwoTicketSound();
                        }, 100);
                    }
                    API.JoinGame(_accessToken, purchasedTicketId, _gameId, _price, _buttonIndex);
                } else if (purchaseTicketResponse.status == 16) {
                    Client.addUser(localStorage.getItem("access_token"), _gameId);
                    setTimeout(() => {
                        Client.gameRequest(localStorage.getItem("access_token"), _gameId);
                    }, 100);
                } else {
                    LoadingPopup.HideLoadingPopup();
                    Alert.ShowAlert(purchaseTicketResponse.message);
                }
            } else {}
        };
        xhttp.open("POST", API.GetUrl(purchaseTicketUrl), true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("access-token", _accessToken);
        xhttp.send("noOfBuyTicket=" + _noOfBuyTicket + "&price=" + _price + "&gameId=" + _gameId);
        // console.log("No of buy ticket............."+_noOfBuyTicket+"Price.............."+_price+"game Id............."+_gameId);
    },
    CheckingAndReturnTicketId: function(_purchasedTicketIdArray) {
        var id = "";
        for (var i = 0; i < _purchasedTicketIdArray.length; i++) {
            if (_purchasedTicketIdArray.length > 1) {
                if (i == 0) {
                    id += _purchasedTicketIdArray[i]._id + ",";
                } else {
                    id += _purchasedTicketIdArray[i]._id;
                }
            } else {
                id += _purchasedTicketIdArray[i]._id;
            }
        }
        return id;
    },

    //------------------------------------------JoinGame-----------------------------------
    JoinGame: function(_accessToken, _ticketId, _gameId, _ticketPrice, _buttonIndex) {
        // console.log("The JoinGame Url............................" + API.GetUrl(joinGameUrl));
        LoadingPopup.ShowLoadingPopup();
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            // console.log("The JoinGame Status................" + this.status);
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var joinGameResponse = JSON.parse(this.responseText);
                if (joinGameResponse.status == 1) {
                    // console.log("JoinGame ResponseText.......1" + this.responseText);
                    LoadingPopup.HideLoadingPopup();

                    var joinedGameId = joinGameResponse.result.gameId;
                    Client.addUser(localStorage.getItem("access_token"), joinedGameId);
                    setTimeout(() => {
                        Client.gameRequest(localStorage.getItem("access_token"), joinedGameId);
                    }, 50);
                } else {
                    LoadingPopup.HideLoadingPopup();
                    Alert.ShowAlert(joinGameResponse.message);
                }
            } else {}
        };
        xhttp.open("POST", API.GetUrl(joinGameUrl), true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("access-token", _accessToken);
        xhttp.send("ticketId=" + _ticketId + "&gameId=" + _gameId + "&price=" + _ticketPrice);
    },

    //------------------------------------------PlayedGameList-----------------------------------
    PlayedGameList: function(_accessToken) {
        // console.log("The PlayedGameList Url............................" + API.GetUrl(playedGameUrl));
        LoadingPopup.ShowLoadingPopup();
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            // console.log("The PlayedGameList Status................" + this.status);
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var playedGameListResponse = JSON.parse(this.responseText);
                var playedGameList = playedGameListResponse.result;
                if (playedGameListResponse.status == 1) {
                    // console.log("PlayedGameList ResponseText.......1" + this.responseText);
                    LoadingPopup.HideLoadingPopup();
                    GameHistory.prototype.CreatePlayedTournamentList(playedGameList);
                } else {
                    LoadingPopup.HideLoadingPopup();
                    Alert.ShowAlert(playedGameListResponse.message);
                }
            } else {}
        };
        xhttp.open("POST", API.GetUrl(playedGameUrl), true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("access-token", _accessToken);
        xhttp.send("");
    },


    //------------------------------------------DailyBonus-----------------------------------
    DailyBonus: function(accessToken) {
        // console.log("The DailyBonus Url............................" + API.GetUrl(dailyBonusUrl));
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            // console.log("The DailyBonus Status................" + this.status);
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var dailyBonusResponse = JSON.parse(this.responseText);
                if (dailyBonusResponse.status == 1) {
                    // console.log("dailyBonusResponse.result: " + dailyBonusResponse.result.bonus);
                    if (dailyBonusResponse.result.bonus != 0) {
                        Alert.ShowAlert(dailyBonusResponse.result.bonus + "\n" + dailyBonusResponse.message);
                    } else {

                    }
                }else if(dailyBonusResponse.status == 10){
                    console.log("dailyBonusResponse 10");
                    Alert.HideAlert();
                    API.Logout(localStorage.getItem("access_token"));
                    LoadingPopup.HideLoadingPopup();
                } 
                else {
                    Alert.ShowAlert(dailyBonusResponse.message);
                }
            } else {}
        };
        xhttp.open("POST", API.GetUrl(dailyBonusUrl), true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("access-token", accessToken);
        xhttp.send("");
    },


    //-------------------------------------------------Advertisement-------------------------------------
    AdvetisementFetchAPI: function(accessToken) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            // console.log("The DailyBonus Status................" + this.status);
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var advertismentResponse = JSON.parse(this.responseText);
                if (advertismentResponse.status == 1) {
                    // console.log("advertisementBonusResponse.result: " , advertismentResponse.result[0].advertisementImage);
                    advertisingImageUrl = advertismentResponse.result[0].advertisementImage;
                    LoadingPopup.HideLoadingPopup();
                }else if(advertismentResponse.status == 10){
                    console.log("advertismentResponse 10");
                    Alert.HideAlert();
                    API.Logout(localStorage.getItem("access_token"));
                    LoadingPopup.HideLoadingPopup();
                }  
                else {
                    LoadingPopup.HideLoadingPopup();
                    Alert.ShowAlert(advertismentResponse.message);
                }
            }
        };
        xhttp.open("GET", API.GetUrl(advertisementUrl), true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("access-token", accessToken);
        xhttp.send("");
    },

    PrizeListFetchAPI: function(accessToken) {
        // console.log("The auth token............"+accessToken);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                prizeListResponse = JSON.parse(this.responseText);
                if (prizeListResponse.status == 1) {
                    // console.log("prizelist.result: ", prizeListResponse.result[0].prizeImage);
                }else if(prizeListResponse.status == 10){
                    console.log("prizeListResponse 10");
                    Alert.HideAlert();
                    API.Logout(localStorage.getItem("access_token"));
                    LoadingPopup.HideLoadingPopup();
                }  
                else {
                    Alert.ShowAlert(prizeListResponse.message);
                }
            }
        };
        xhttp.open("GET", API.GetUrl(prizeListingUrl), true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("access-token", accessToken);
        xhttp.send("");
    },

    ClaimPrize: function(_json, accessToken) {
        // console.log("The auth token............"+accessToken+"................"+_json);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                claimResponse = JSON.parse(this.responseText);
                if (claimResponse.status == 1) {
                    // console.log("Claim Response: ",claimResponse);
                    Alert.ShowAlert(claimResponse.message);
                    setTimeout(() => {
                        StateTransition.TransitToMenu();
                    }, 1000);
                }else if(claimResponse.status == 10){
                    console.log("claimResponse 10");
                    Alert.HideAlert();
                    API.Logout(localStorage.getItem("access_token"));
                    LoadingPopup.HideLoadingPopup();
                }  
                else {
                    Alert.ShowAlert(claimResponse.message);
                }
            }
        };
        xhttp.open("POST", API.GetUrl(claimPrize), true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("access-token", accessToken);
        xhttp.send("prizeId=" + _json);
    }
}