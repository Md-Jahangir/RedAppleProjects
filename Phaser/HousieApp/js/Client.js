var allNormalPlayers = [];
var allDetailsPlayers = [];
var userTicketTable;
var totalPlayersTicket = 0;
var totalNumberOfPlayers = 0;
var mePlayer;
var connectedRoomData;
var profilePicArray = [];
var meProfilePic = "";
var mePlayerName = "";
var mePlayerLevel = "";
var mePlayerNumberOfTicket = "";
var mePlayerTotalReward = "";
var reconnectionCreatePlayerAvoid = 0;

var Client = {};
Client.socket = io(baseUrL);
Client.socket.connect();

// Add a connect listener
Client.socket.on('connect', function() {
    // console.log('Client has connected to the server!' + Client.socket.id);
    localStorage.setItem("is_game_playing", false);
    // console.log("Client pageName: " + localStorage.getItem("page_name"));
    // console.log("Client access_token: " + localStorage.getItem("access_token"));
    Client.kill(localStorage.getItem("page_name"), localStorage.getItem("access_token"));
});
// Fired upon a connection error
Client.socket.on('connect_error', function() {
    // console.log('The connection error occurred!');
    // Alert.ShowAlert("The connection error occurred!");
});
// Fired upon a connection timeout.
Client.socket.on('connect_timeout', function() {
    // console.log('The connection timeout occurred!');
});

// Add a disconnect listener
Client.socket.on('disconnect', function() {
    console.log("The client has disconnected!");
});

// Fired upon a successful reconnection.
Client.socket.on('reconnect', function() {
    console.log('The reconnect occurred!');
    // if (localStorage.getItem("is_game_playing") == "false") {
    //     console.log("reconnect will happen");
    //     if (gamePage == "Gameplay") {
    //         console.log("reconnect and add user");
    //         reconnectionCreatePlayerAvoid = 1;
    //         ReconnectAddUser();
    //     } else {}
    // }

    if (gamePage == "Gameplay") {
        // console.log("reconnect and add user");
        Client.reConnectAfterDisconnect(localStorage.getItem("access_token"));
    } else {}
});
// Fired upon an attempt to reconnect.
Client.socket.on('reconnect_attempt', function() {
    // console.log('The connection attempt occurred!');
});
// Fired upon an attempt to reconnect.
Client.socket.on('reconnecting', function() {
    // console.log('The connection error occurred!');
});
// Fired upon a reconnection attempt error.
Client.socket.on('reconnect_error', function() {
    // console.log('The reconnection error occurred!');
});
// Fired when couldn’t reconnect within reconnectionAttempts.
Client.socket.on('reconnect_failed', function() {
    // console.log('The reconnection failed occurred!');
});

// //----Player Leave------------------------------
// Client.socket.on('player_leave', function(_data) {
//     // console.log("The Leave Data From the server......." + JSON.stringify(_data));
// });

Client.socket.on('ping', function() {});
Client.socket.on('pong', function() {});

//-----------------------------Response From Server(on)------------------------------------

//userConnected
Client.socket.on('userConnected', function(_data) {
    // console.log("The user Connected Data From the server......." + JSON.stringify(_data));
    UserConnected(_data);
});

//enterUser
Client.socket.on('enterUser', function(_data) {
    // console.log("The enterUser Data From the server......." + JSON.stringify(_data));
    EnterUser(_data);
});

//connectedRoom
Client.socket.on('connectedRoom', function(_data) {
    // console.log("The connectedRoom Data From the server......." + JSON.stringify(_data));
    ConnectedRoom(_data);
});

//gameStart
Client.socket.on('gameStart', function(_data) {
    // console.log("The gameStart Data From the server......." + JSON.stringify(_data));
    GameStart(_data);
});

//randomNumberGenerate
Client.socket.on('randomNumberGenerate', function(_data) {
    // console.log("The randomNumberGenerate Data From the server......." + JSON.stringify(_data));
    GetRandomNumber(_data);
});

//submitTicketValue
Client.socket.on('submitTicketValue', function(_data) {
    // console.log("The submitTicketValue Data From the server......." + JSON.stringify(_data));
    SubmitedTicketValue(_data);
});

//rewardMatch
Client.socket.on('rewardMatch', function(_data) {
    // console.log("The rewardMatch Data From the server......." + JSON.stringify(_data));
    RewardMatched(_data);
});

//userBlock
Client.socket.on('ticketBlock', function(_data) {
    // console.log("The ticketBlock Data From the server......." + JSON.stringify(_data));
    TicketBlocked(_data);
});

//player Leaved
Client.socket.on('playerLeave', function(_data) {
    // console.log("The player Leaved Data From the server......." + JSON.stringify(_data));
    PlayerLeaved(_data);
});

//game closed
Client.socket.on('gameClosed', function(_data) {
    // console.log("The game Closed Data From the server......." + JSON.stringify(_data));
    localStorage.setItem("is_game_playing", false);
    GameClosed(_data);
});

//player ReConnect After Disconnect
Client.socket.on('playerReConnectAfterDisconnect', function(_data) {
    // console.log("The player ReConnect After Disconnect Data From the server......." + JSON.stringify(_data));
    // localStorage.setItem("is_game_playing", false);
    if (_data.status == 1) {
        if (_data.result.userId == meUserId) {
            console.log("re connect afetr success");
            reconnectionCreatePlayerAvoid = 1;
            ReconnectAddUser();
        } else {}
    } else {}
});


//-----------------------------Request From Client(emit)------------------------------------

Client.kill = function(_gamePage, _accessToken) {
    var killData = {
        "page": _gamePage,
        "accessToken": _accessToken
    }
    Client.socket.emit('kill', killData);
}

Client.addUser = function(_accessToken, _gameId) {
    // LoadingPopup.ShowLoadingPopup();
    var addUserData = {
            "accessToken": _accessToken,
            "gameId": _gameId
        }
        // console.log("client add user--------------------" + JSON.stringify(addUserData));
    Client.socket.emit('addUser', addUserData);
}

//gameRequest
Client.gameRequest = function(_accessToken, _gameId) {
    var gameRequestData = {
            "accessToken": _accessToken,
            "gameId": _gameId
        }
        // console.log("client game Request--------------------" + JSON.stringify(gameRequestData));
    Client.socket.emit('gameRequest', gameRequestData);
}

//Submit number agains random number generate
Client.submitNoAgainstRandomNoGenerate = function(_accessToken, _ticketId, _ticketPos, _ticketVal) {
    var submitNumberData = {
            "accessToken": _accessToken,
            "ticketId": _ticketId,
            "ticketPos": _ticketPos,
            "ticketVal": _ticketVal
        }
        // console.log("submit Number Against RandomNoGenerate--------------------" + JSON.stringify(submitNumberData));
    Client.socket.emit('submitNoAgainstRandomNoGenerate', submitNumberData);
}

//submit For Reward
Client.submitForReward = function(_accessToken, _ticketId, _requestReward) {
    LoadingPopup.ShowLoadingPopup();
    var submitForRewardData = {
            "accessToken": _accessToken,
            "ticketId": _ticketId,
            "requestReward": _requestReward
        }
        // console.log("submit For Reward Data--------------------" + JSON.stringify(submitForRewardData));
    Client.socket.emit('submitForReward', submitForRewardData);
}

//Leave room
Client.leaveRoom = function(_accessToken) {
    var leaveRoomData = {
            "accessToken": _accessToken
        }
        // console.log("client leave Room--------------------" + JSON.stringify(leaveRoomData));
    Client.socket.emit('leave', leaveRoomData);
}

//Reconnect after Disconnect
Client.reConnectAfterDisconnect = function(_accessToken) {
    var disconnectData = {
            "accessToken": _accessToken
        }
        // console.log("client disconnect Room--------------------" + JSON.stringify(disconnectData));
    Client.socket.emit('reConnectAfterDisconnect', disconnectData);
}


//-----------------------------Local function------------------------------------

UserConnected = function(_data) {
    if (_data.status != 1) {
        localStorage.setItem("is_game_playing", false);
    } else {}
}

EnterUser = function(_data) {
    // console.log("EnterUser: ", _data);
    if (_data.status == 1) {
        totalNumberOfPlayers = [];
        totalPlayersTicket = _data.result.gameAllOnlineTickets;
        totalNumberOfPlayers = _data.result.gameAllOnlineUsers;
        // mePlayer = _data.result.user;
        // console.log("totalNumberOfPlayers: ", totalNumberOfPlayers);
        // console.log("mePlayer: ", mePlayer);
        for (var i = 0; i < totalNumberOfPlayers.length; i++) {
            profilePicArray.push(totalNumberOfPlayers[i].userImage);
            if (totalNumberOfPlayers[i].userId == meUserId) {
                mePlayerName = totalNumberOfPlayers[i].userName;
                mePlayerLevel = totalNumberOfPlayers[i].userLevel;
                mePlayerNumberOfTicket = totalNumberOfPlayers[i].noOfTicket;
                mePlayerTotalReward = totalNumberOfPlayers[i].userReward;
                meProfilePic = totalNumberOfPlayers[i].userImage;
            } else {}
        }

        if (reconnectionCreatePlayerAvoid == 0) {
            setTimeout(() => {
                // console.log("calling enter : ");
                CreatePlayer(totalNumberOfPlayers);
                CreateDetailsPlayer(totalNumberOfPlayers);
                Gameplay.prototype.SetValueOfTotalTicketsAndPlayer(totalNumberOfPlayers, totalPlayersTicket);
            }, 3000);
        } else {

        }
    } else {}
}


CreatePlayer = function(_data) {
    // console.log("CreatePlayer: ", _data);
    allNormalPlayers = [];
    var loopMaxIteration;
    if (_data.length > 3) {
        loopMaxIteration = 3
    } else {
        loopMaxIteration = _data.length;
    }
    for (var i = 0; i < loopMaxIteration; i++) {
        var player = new Player();
        player.CreatePlayer((game.world.centerX + Math.round(game.width / 20)) - (i * (game.world.centerX - Math.round(game.width / 2.84))), (game.world.centerY - Math.round(game.height / 2.233)), _data[i].userId, _data[i].userName, 'image' + i);
        allNormalPlayers.push(player);
    }
}

RemoveNormalPlayer = function(_leavedPlayerId) {
    for (var i = 0; i < allNormalPlayers.length; i++) {
        if (allNormalPlayers[i].playerId == _leavedPlayerId) {
            allNormalPlayers[i].playersGroup.destroy();
            allNormalPlayers.splice(i, 1);
            totalNumberOfPlayers.splice(i, 1);
        }
    }
}

CreateDetailsPlayer = function(_data) {
    allDetailsPlayers = [];
    for (var i = 0; i < _data.length; i++) {
        var playerDetails = new PlayerDetails();
        playerDetails.CreatePlayerDetails(game.world.centerX - Math.round(game.width / 2.93), (game.world.centerY - Math.round(game.height / 1.412 /*1.245*/ )) + (i * (game.world.centerY - Math.round(game.height / 2.38))), _data[i].userId, _data[i].userName, 'image' + i, _data[i].userLevel, _data[i].noOfTicket);
        allDetailsPlayers.push(playerDetails);
    }
}

RemoveDetailsPlayer = function(_leavedPlayerId) {
    for (var i = 0; i < allDetailsPlayers.length; i++) {
        if (allDetailsPlayers[i].playerId == _leavedPlayerId) {
            allDetailsPlayers[i].profileDetailsBg.destroy();
            allDetailsPlayers.splice(i, 1);
        }
    }
}

SetTheValueOfPlayers = function() {
    // console.log("client Set TheValueOfPlayers");
    for (var i = 0; i < allNormalPlayers.length; i++) {
        allNormalPlayers[i].SetPlayerValue('image' + i, totalNumberOfPlayers[i].userName);
    }
    for (var i = 0; i < allDetailsPlayers.length; i++) {
        allDetailsPlayers[i].SetPlayerDetailsValue('image' + i, totalNumberOfPlayers[i].userName, totalNumberOfPlayers[i].userLevel, totalNumberOfPlayers[i].noOfTicket);
    }
}

ConnectedRoom = function(_data) {
    // console.log("ConnectedRoom: ", _data);
    if (_data.status == 1) {
        userTicketTable = [];
        connectedRoomData = [];
        userTicketTable = _data.result.userTicket;
        connectedRoomData = _data;
        if (reconnectionCreatePlayerAvoid == 0) {
            StateTransition.TransitToGameplay();
            setTimeout(() => {
                for (var i = 0; i < profilePicArray.length; i++) {
                    game.load.image('image' + i, profilePicArray[i]);
                    game.load.start();
                }
                game.load.image('meUserImage', meProfilePic);
                game.load.start();
                ProfilePopup.CreateProfilePopup(mePlayerName, mePlayerLevel, mePlayerNumberOfTicket, mePlayerTotalReward, 'meUserImage');
            }, 5000);
        } else {
            // Gameplay.prototype.CreateUserTicket(userTicketTable);
        }

    } else {
        localStorage.setItem("is_game_playing", false);
        LoadingPopup.HideLoadingPopup();
        Alert.ShowAlert(_data.message);
    }
}

GameStart = function(_data) {
    // console.log("GameStart", _data);
    if (_data.status == 1) {
        SetTheValueOfPlayers();
    } else {}
}

GetRandomNumber = function(_data) {
    if (_data.status == 1) {
        // if (reconnectionCreatePlayerAvoid == 1) {
        // console.log("GR once");
        // setTimeout(() => {
        // SetTheValueOfPlayers();
        //     reconnectionCreatePlayerAvoid = 0;
        // }, 1000);
        // } else {}
        // console.log("game started and random generated");
        LoadingPopup.HideLoadingPopup();
        var randomNumber = _data.result.randomNumber;
        var randomNumberArray = _data.result.RandomNumberArray;
        // console.log("GetRandomNumber randomNumber : " + randomNumber);
        // console.log("GetRandomNumber randomNumber array : ", randomNumberArray);
        Gameplay.prototype.ShowRandomNumber(randomNumber);
        setTimeout(() => {
            if (randomNumberArray.length != null || randomNumberArray.length != 0) {
                Gameplay.prototype.ShowTheSelectedNumberInNumberPlate(randomNumberArray);
            } else {}
        }, 100);

    } else {}
}

SubmitedTicketValue = function(_data) {
    // console.log("SubmitedTicketValue: ", _data);
    if (_data.status == 1) {} else {}
}

RewardMatched = function(_data) {
    // console.log("RewardMatched: ", _data);
    if (_data.status == 1) {
        LoadingPopup.HideLoadingPopup();
        // Alert.ShowAlert(_data.message);
        Alert.ShowAlert(_data.message, false);
        Gameplay.prototype.PrizeButtonHandler(_data);
        Gameplay.prototype.DeductNumberOfClaims(_data);
        setTimeout(() => {
            SoundManager.PlayClaimedSound();
        }, 200);
    } else if (_data.status == 13) {
        LoadingPopup.HideLoadingPopup();
        Alert.ShowAlert(_data.message, false);
        // setTimeout(() => {
        //     Alert.HideAlert();
        // }, 1500);
    } else {}
    setTimeout(() => {
        Alert.HideAlert();
    }, 1500);
}

TicketBlocked = function(_data) {
    // console.log("TicketBlocked", _data);
    if (_data.status == 1) {
        var blockedTicketId = _data.result.ticketId;
        // console.log("blockedTicketId: " + blockedTicketId);
        Gameplay.prototype.BlockParticularTicket(blockedTicketId);
        setTimeout(() => {
            Alert.HideAlert();
        }, 1500);
        setTimeout(() => {
            Alert.ShowAlert(_data.message);
            setTimeout(() => {
                SoundManager.PlayBlockedSound();
            }, 100);
        }, 1800);
    } else {}

}

PlayerLeaved = function(_data) {
    if (_data.status == 1) {
        var afterLeaveTotalPlayersTicket = _data.result.gameAllOnlineTickets;

        for (var i = 0; i < allNormalPlayers.length; i++) {
            if (allNormalPlayers[i].playerId == _data.result.userId) {
                RemoveNormalPlayer(_data.result.userId);
            }
        }
        for (var i = 0; i < allDetailsPlayers.length; i++) {
            if (allDetailsPlayers[i].playerId == _data.result.userId) {
                RemoveDetailsPlayer(_data.result.userId);
            }
        }
        if (meUserId == _data.result.userId) {
            userTicketTable = [];
            StateTransition.TransitToMenu();
        } else {
            // console.log("receate");
            for (var i = 0; i < allNormalPlayers.length; i++) {
                allNormalPlayers[i].playersGroup.destroy();
                allNormalPlayers.splice(i, 1);
            }
            CreatePlayer(totalNumberOfPlayers);
            Gameplay.prototype.SetValueOfTotalTicketsAndPlayer(totalNumberOfPlayers, afterLeaveTotalPlayersTicket);

            for (var i = 0; i < allDetailsPlayers.length; i++) {
                allDetailsPlayers[i].profileDetailsBg.destroy();
                allDetailsPlayers.splice(i, 1);
            }
            CreateDetailsPlayer(totalNumberOfPlayers);
            SetTheValueOfPlayers();
        }
    } else {}
}

GameClosed = function(_data) {
    // console.log("GameClosed", _data);
    if (_data.status == 1) {
        Alert.ShowAlert(_data.message);
        setTimeout(() => {
            StateTransition.TransitToMenu();
        }, 1000);
    } else {}
}

ReconnectAddUser = function() {
    if (localStorage.getItem("access_token") != null && localStorage.getItem("access_token") != "") {
        localStorage.setItem("is_game_playing", false);
        Client.addUser(localStorage.getItem("access_token"), "");
        setTimeout(() => {
            Client.gameRequest(localStorage.getItem("access_token"), "");
        }, 100);
    } else {}
}