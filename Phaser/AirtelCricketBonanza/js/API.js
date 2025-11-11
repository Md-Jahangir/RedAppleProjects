var BaseUrL = "https://www.airtelcricketbonanza.com/admin/index.php/api/"; //"http://13.232.237.237/admin/index.php/api/";
var userProfile = "User/profile";
var rewardStatus = "Prize/prizelistByUser";
var leaderBoardStatus = "User/toptenScorer";
var savePlayerName = "User/savePlayer";
var reedemPrize = "Prize/redeem_prize";
var updateScoreAPI = "User/saveScore";
var logoutAPI = "User/logout";
var checkUserPlayed = "User/checkPlayed";
var checkTokenAPI = "User/checkToken";
var token = "";
var getUserProfileResponseDetails = "";
var rewardStatusResponseDetails = "";
var leaderBoardResponseDetails = "";
var savePlayerResponseDetails = "";
var reedemPrizeResponseDetails = "";
var updateScoreResponseDetails = "";
var playedDetails = "";
var logoutDetails = "";
var tokenDetails = "";
var totalScoreServerData;

var amount = [];
var totalCount = [];
var usedCount = [];
var prize_id = [];
var prizeStatus = [];
var isPlayed = 0;

var API = {
    GetUrl: function(apiUrl) {
        return BaseUrL + apiUrl;
    },
    GetUserProfile: function(token) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                getUserProfileResponseDetails = JSON.parse(this.responseText);
            }
        };
        xhttp.open("POST", API.GetUrl(userProfile), true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("token=" + token);
    },
    GetRewardStatus: function(token) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                rewardStatusResponseDetails = JSON.parse(this.responseText);
                for (var i = 0; i < rewardStatusResponseDetails["result"][0].length; i++) {
                    amount[i] = rewardStatusResponseDetails["result"][0][i]["Prize"]["amount"];
                    totalCount[i] = rewardStatusResponseDetails["result"][0][i]["Prize"]["total_count"];
                    usedCount[i] = rewardStatusResponseDetails["result"][0][i]["Prize"]["used_count"];
                    prize_id[i] = rewardStatusResponseDetails["result"][0][i]["Prize"]["id"];
                    prizeStatus[i] = rewardStatusResponseDetails["result"][0][i]["Prize"]["status"];
               }
            }
        };
        xhttp.open("POST", API.GetUrl(rewardStatus), true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("token=" + token);
    },
    GetLeaderBoardScore: function() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                leaderBoardResponseDetails = JSON.parse(this.responseText);
            }
        };
        xhttp.open("GET", API.GetUrl(leaderBoardStatus), true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("");
    },
    GetSavePlayerDetails: function(token) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                savePlayerResponseDetails = JSON.parse(this.responseText);
                totalScoreServerData = savePlayerResponseDetails["result"][0]["User"]["total_scores"];
                _totalScore = totalScoreServerData;
               isPlayed = savePlayerResponseDetails["result"][0]["User"]["is_played"];
            }
        };
        xhttp.open("POST", API.GetUrl(savePlayerName), true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("token=" + token);
    },
    GetReedemPrizeResponseDetails: function(token, prize_id) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                reedemPrizeResponseDetails = JSON.parse(this.responseText);
            }
        };
        xhttp.open("POST", API.GetUrl(reedemPrize), true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("token=" + token + "&prize_id=" + prize_id);
    },
    SaveScoreData: function(token, score) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                updateScoreResponseDetails = JSON.parse(this.responseText);
                isPlayed = 1;
            }
        };
        xhttp.open("POST", API.GetUrl(updateScoreAPI), true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("token=" + token + "&score=" + score);
    },
	
	CheckPlayed: function(token) {
		console.log( "The token ......" +token );
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                playedDetails = JSON.parse(this.responseText);
				if(playedDetails["status"]==1)
				{
					s_iPlayerTeam = _iActivePlayerTeam;
					s_iOpponentTeam = _iActiveOpponentTeam;
					s_oMenu.unload();
    
					s_oMain.gotoGame(s_iPlayerTeam, s_iOpponentTeam);
				}
				else{
					var CAlert = new CAlertPopup();
				}
            }
        };
        xhttp.open("POST", API.GetUrl(checkUserPlayed), true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("token=" + token);
    },
	
	logout: function(token, page) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                logoutDetails = JSON.parse(this.responseText);
                MyAirtelAppReact.close();
            }
        };
        xhttp.open("POST", API.GetUrl(logoutAPI), true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("token=" + token + "&page_id=" + page);
    },
	
	checkToken: function(token, secutrityKey) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
				tokenDetails = JSON.parse(this.responseText);
                
            }
        };
        xhttp.open("POST", API.GetUrl(checkTokenAPI), false);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("token=" + token + "&secret_key=" + secutrityKey);
    },
	
	
}