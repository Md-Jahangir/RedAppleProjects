var isGetResponse = false;
var clientEndSittingIndex = "";
var Client = {};
Client.socket = io(BaseUrL); //= new io.socket();//io();//new io.Socket();
Client.socket.connect({
  'reconnection': true,
  'autoconnect': true,
  'reconnectionDelay': 500,
  'reconnectionAttempts': 10
});

// // Add a connect listener
Client.socket.on('connect', function () {
  console.log('Client has connected to the server!' + Client.socket.id);
});
var data = {
  "data1": "ShantanuDa",
  "data2": "Saptarshi"
};
Client.socket.emit('testing', data);
Client.socket.on('testing_response', function (data) {
  Debug.log("The Data send From the server......." + data.data1 + "Data2...." + data.data2);
});
// Add a disconnect listener
Client.socket.on('disconnect', function () {
  console.log('The client has disconnected!');
  PopUp.GenerateCommonPopup('You have been disconnected \n from the server');
  if (gameState == "Gameplay") {
    setTimeout(() => {
      if (specificPage == "GiftPage") {
        Gift.HideGiftPopUp();
      }
      Utils.DisableAllPlayer();
      Utils.GameRefresh();
      Utils.DestroyDeafultPlayerSprite();
      StateTransition.TransitToMenu();
    }, 2000);
  }
  setTimeout(() => {
    window.location.href = "https://mygamebuzz.net/live/index.php/games/list";
  }, 2000);
  // Client.AddUser();
});

// Fired upon a connection error
Client.socket.on('connect_error', function () {
  console.log('The connection error occurred!');
});

// Fired upon a connection timeout.
Client.socket.on('connect_timeout', function () {
  console.log('The connection timeout occurred!');
});

// Fired upon a successful reconnection.
Client.socket.on('reconnect', function () {
  console.log('The reconnect occurred!');
});

// Fired upon an attempt to reconnect.
Client.socket.on('reconnect_attempt', function () {
  console.log('The connection attempt occurred!');
});

// Fired upon an attempt to reconnect.
Client.socket.on('reconnecting', function () {
  console.log('The connection error occurred!');
});
// Fired upon a reconnection attempt error.
Client.socket.on('reconnect_error', function () {
  console.log('The reconnection error occurred!');
});
// Fired when couldn’t reconnect within reconnectionAttempts.
Client.socket.on('reconnect_failed', function () {
  console.log('The reconnection failed occurred!');
});
Client.socket.on('ping', function () {
  console.log('The ping .....................!');
});
Client.socket.on('pong', function () {
  console.log('The pong....................!');
});

Client.socket.on('user_connected', function (data) {
  console.log("The User Connected Data..........." + JSON.stringify(data));
  // isGetResponse = ;
  UserConnected(data);
});
Client.socket.on("connected_room", function (data) {
  console.log("The Connected room Data..........." + JSON.stringify(data));
  GameRequestOn(data);
});
Client.socket.on("gamestart", function (data) {
  console.log("The Game Start Data............................." + JSON.stringify(data));
  GameStartOn(data);
});
Client.socket.on('enter_user', function (data) {
  Debug.log("The enter user Data................................" + JSON.stringify(data));
  EnterUserOn(data);
});
Client.socket.on('gameturn', function (data) {
  console.log("The Game Turn Data............................." + JSON.stringify(data));
  GameTurnOn(data);
});
Client.socket.on("decision_response", function (data) {
  console.log("The Decision Response Data............................." + JSON.stringify(data));
  PlayerInputReceived(data);
});
Client.socket.on("game_winner", function (data) {
  console.log("The Game Winner Data............................." + JSON.stringify(data));
  GameOver(data);
});
Client.socket.on("packdetails", function (data) {
  console.log("The Pack Details Data............................." + JSON.stringify(data));
  GamePack(data);
});
Client.socket.on("scoredeclare", function (data) {
  console.log("The Score Declare Data.................." + JSON.stringify(data));
  ScoreDeclare(data);
});
Client.socket.on("message_received", function (data) {
  Debug.log("The Message Received Data..........." + JSON.stringify(data));
  RoomMessageOn(data);
});
Client.socket.on("gift_received", function (data) {
  Debug.log("The gift Received................" + JSON.stringify(data));
  SendGiftOn(data);
});
Client.socket.on("leave_room", function (data) {
  console.log("The Leave Room Received.........." + JSON.stringify(data));
  LeaveRoomOn(data);
});
Client.socket.on("dealer_message", function (data) {
  console.log("The Dealer Message.............." + JSON.stringify(data));
  DealerMessageOn(data);
});
Client.socket.on("sideshow_response", function (data) {
  console.log("The Side Show Response Data............................." + JSON.stringify(data));
  SideShowOn(data);
});
Client.socket.on("sideshow_acceptresponse", function (data) {
  Debug.log("SideShow Accept Response....................." + data);
  SideShowAcceptResponseOn(data);
});
Client.socket.on("sideshow_rejectresponse", function (data) {
  Debug.log("Side Show Reject Response Data............................." + JSON.stringify(data));
  SideShowRejectResponseOn(data);
});
Client.socket.on("nextgameround", function (data) {
  Debug.log("The Next Game Round Data........." + JSON.stringify(data));
  NextGameRound(data);
});
Client.socket.on("replayresponse", function (data) {
  Debug.log("The Confirm Join Response Data....." + JSON.stringify(data));
  ConfirmJoinResponse(data);
});
Client.socket.on("wantoplaymore", function (data) {
  Debug.log("The Want To Play More Response Data....." + JSON.stringify(data));
  WantToPlayMoreResponse(data);
});
Client.socket.on("sendtipresponse", function (data) {
  Debug.log("The Send Tip Response Data....." + JSON.stringify(data));
  SendTipResponseData(data);
});
Client.socket.on("replayfailure", function (data) {
  Debug.log("The Replay Failure Response Data....." + JSON.stringify(data));
  ReplayFailure(data);
});
Client.socket.on("sideshow_decision_response", function (data) {
  Debug.log("The Side Show Decision Response Data............................." + JSON.stringify(data));
  SideShowDecisionResponse(data);
});

Client.socket.on("game_play_response", function (data) {
  console.log("The Game Play Response Data............................." + JSON.stringify(data));
  // SideShowDecisionResponse(data);
  GameplayResponse(data);
});
Client.socket.on("confirm_game_play", function (data) {
  console.log("The confirm gameplay fired...................." + JSON.stringify(data));
  // SideShowDecisionResponse(data);
  onlineServerEvent.ConfirmGameStart(data);
});

Client.socket.on("update_user_balance", function (data) {
  console.log("The updated user balance...................." + JSON.stringify(data));
  // SideShowDecisionResponse(data);
  // onlineServerEvent.ConfirmGameStart(data);
});
Client.socket.on("error_response", function (data) {
  console.log("The error response data...................." + JSON.stringify(data));
});


//Game Play Request
Client.GameplayRequest = function () {
  console.log("ENter into the Gameplay Request........................" + clientEndSittingIndex);
  var data = {
    "access_token": session_id,
    "room_name": room_name,
    "round_id": round_id,
    "sitting_position": clientEndSittingIndex
  }
  Client.socket.emit('game_play_request', data);
}
//Game Play Response
GameplayResponse = function (data) {
  if (data.status == 1) {
    onlineServerEvent.FireOnSuccessGameStart(data);
  }
}

//AddUser Emit
Client.AddUser = function () {
  console.log("Enter into the Add User Function" + session_id + "The socket id.............." + Client.socket.id);
  var data = {
    "access_token": session_id,
    "socket_id": Client.socket.id
  };
  Client.socket.emit('adduser', data, function (err, success) {
    console.log("The Confirmation................................" + success);
  });
}
UserConnected = function (data) {
  Debug.log("The Connected User");
  // if(gameStatus != "Playing"){
  if (data.status == 1) {
    Debug.log("User Connected Success");
    onlineServerEvent.FireOnConnectionSuccessEvent();
  }
  else {
    Debug.log("User Connected Failure");
    onlineServerEvent.FireOnConnectionFailedEvent();
  }
  // }
}

//GameRequest Emit
Client.GameRequestEmit = function (amount) {
  console.log("Enter into the Game Request emit" + amount + "The Game Id........" + game_id + "The Max Pot Limit............" + onlineServerEvent.GameMaxPotLimit(gameType));
  if (gamePlayType == "Normal") {
    var data = {
      "amount": amount,
      "access_token": session_id,
      "user_id": user_id,
      "game_id": game_id,
      "max_pot_limit": onlineServerEvent.GameMaxPotLimit(gameType)
    };
  }
  else {
    var data = {
      "amount": amount,
      "access_token": session_id,
      "user_id": user_id,
      "game_id": game_id,
      "code": room_code,
      "max_pot_limit": private_pot_limit
    };
  }
  console.log("The game request Emit data................", data);
  Client.socket.emit('gamerequest', data);
}

GameRequestOn = function (data) {
  console.log("Enter into the Game Request On" + JSON.stringify(data));
  if (data.status == 1) {
    onlineServerEvent.FireOnJoinedRoomSuccessEvent(data);
  }
  else {
    onlineServerEvent.FireOnJoinedRoomFailedEvent(data);
  }
}

EnterUserOn = function (data) {
  console.log("Enter User On.........." + data);
  if (data.status == 1) {
    onlineServerEvent.FireEnterUserSuccessEvent(data);
  }
  else {
    onlineServerEvent.FireEnterUserFailedEvent(data);
  }
}

//GameStart
GameStartOn = function (data) {
  console.log("Enter into the Game Start On........." + data);
  if (data.status == 1) {
    onlineServerEvent.FireOnGameStartEvent(data);
  }
  else if (data.status == 0) {
    onlineServerEvent.FirePlayerNotFoundEvent();
  }
  else if (data.status == 2) {
    PopUp.GenerateCommonPopup(" Maximum playing round in the series \n reached. Please exit to lobby and join \n once again.");
  }
}

//Change Turn
GameTurnOn = function (data) {
  console.log("Enter into the Game Turn On......." + data);
  if (data.status == 1) {
    waitingTimeInterval = data.result.turn_timmer;
    onlineServerEvent.FireOnTurnChangeEvent(data);
  }
}

//Player Input Emit
Client.PlayerInputEmit = function (command_type, amount_beted, player_id) {
  var data = {
    "command_type": command_type,
    "amount_beted": amount_beted,
    "player_id": player_id,
    "round_id": round_id,
    "room_name": room_name,
    "room_id": room_id,
    "access_token": session_id,
    "game_id": game_id
  };
  Client.socket.emit('decision_making', data);
}
PlayerInputReceived = function (data) {
  //Debug.log("Enter into the Game Turn On......."+data);
  if (data.status == 1) {
    Utils.OnPlayerInputReceived(data.result.command_type, data.result.player_id, data.result.amount_beted, data.result.pot_amount, data.result.wallet_balance);
  }
}

//GamePack
Client.GamePackEmit = function (amount_beted) {
  var data = {
    "access_token": session_id,
    "amount_beted": amount_beted,
    "round_id": round_id,
    "room_name": room_name,
    "room_id": room_id
  };
  Client.socket.emit('pack', data);
}
GamePack = function (data) {
  if (data.status == 1) {
    Utils.GamePack(data.result.player_id);
  }
}

//Gameover
GameOver = function (data) {
  if (data.status == 1) {
    if (gameStatus == "Playing") {
      isSwitchTable = false;
      isExitToLobbyClicked = true;
      Utils.ShowWinnigText();
    }
    Utils.GameOver(data.result.player_id);
  }
}
ScoreDeclare = function (data) {
  if (data.status == 1) {
    Utils.ScoreDeclare(data);
  }
}

//Chat Service
Client.NewMessageEmit = function (message) {
  var data = {
    "access_token": session_id,
    "message": message,
    "room_name": room_name,
    "room_id": room_id,
    "round_id": round_id,
  }
  Client.socket.emit('new_message', data);
}
RoomMessageOn = function (data) {
  Debug.log("Enter into the Room Message On........." + data);
  if (data.status == 1) {
    ChatBox.OwnTemplateMsgBoxUpdateScroll(data.result.chat.message, data.result.chat.sender_id, data.result.chat.avatar_id);
    Utils.CreateOwnMessageTemplate(data.result.chat.sender_id, data.result.chat.message);
  }
}

//Send Gift
Client.SendGiftEmit = function (_gift_id, coin_value) {
  Debug.log("The Coin Value......." + coin_value + "gift_ID......" + gift_id);
  var to_id;
  var sendToAll;
  if (isSendToAll) {
    to_id = "0";
    sendToAll = "1";
  }
  else {
    to_id = gift_to_id;
    sendToAll = "0";
  }
  var data = {
    "access_token": session_id,
    "gift_id": _gift_id,
    "user_id": user_id,
    "room_id": room_id,
    "round_id": round_id,
    "room_name": room_name,
    "to_id": to_id,
    "amount": coin_value,
    "send_to_all": sendToAll,
  }
  Client.socket.emit('send_gift', data);
}
SendGiftOn = function (data) {
  Debug.log("Enter into the Send Gift On..............." + data);
  if (data.status == 1) {
    Utils.SendGiftAnimation(data.result.to_id, data.result.sender_id, data.result.gift_id, data.result.send_to_all, data.result.wallet_balance);
  }
}

//Leave Room Emit
Client.LeaveRoomEmit = function (index) {
  console.log("The Leave Room Emit.......................");
  var exit_location;
  if (index == 0) {
    exit_location = "leave_room";
  }
  else {
    exit_location = "exit_from_lobby";
  }
  var data = {
    "exit_location": exit_location,
    "room_name": room_name,
    "access_token": session_id,
    "room_id": room_id,
    "round_id": round_id,
  }
  Client.socket.emit('leave', data);
}

LeaveRoomOn = function (data) {
  Debug.log("Enter the Leave Room On data........." + data);
  if (data.status == 1) {
    onlineServerEvent.FireExitToLobby(data);
  }
}
DealerMessageOn = function (data) {
  Debug.log("Enter the Dealer Message On..........." + data);
  if (data.status == 1) {
    Utils.UpdateDealerMessage(data.result.message);
  }
}

Client.SideShowEmit = function (current_amount) {
  var data = {
    "room_name": room_name,
    "access_token": session_id,
    "room_id": room_id,
    "round_id": round_id,
    "amount_beted": current_amount,
    "command_type": "SIDE_SHOW",
  }
  Client.socket.emit('sideshow', data);
}
SideShowOn = function (data) {
  Debug.log("Enter into the Side Show On data.........." + data);
  //if(data.status == 1){
  Utils.SideShowPopUp(data);
  // }
  // else{
  //   PopUp.GenerateCommonPopup('Till Now Opponent Not Seen The Card');
  // }
}
Client.SideShowDecisionResponseEmit = function (message, current_amount, receiver_id) {
  Debug.log("The Side Show Response Emit........" + receiver_id + "sender_id" + user_id);
  var data = {
    "room_name": room_name,
    "access_token": session_id,
    "room_id": room_id,
    "round_id": round_id,
    "command_type": message,
    "amount_beted": current_amount,
    "receiver_id": receiver_id,
    "sender_id": user_id,
    "game_id": game_id
  }
  Client.socket.emit('sideshow_decision', data);
}
SideShowRejectResponseOn = function (data) {
  Debug.log("Enter into the Side Show Reject Response Data........." + data);
  if (data.status == 1) {
    Utils.SideShowRejectResponse(data);
  }
}
NextGameRound = function (data) {
  Debug.log("The Next Game Round.........." + data);
  if (data.status == 1) {
    oppoentWaitingPanelTime = data.result.timeinterval;
    //OpponentWaitingPanel.ShowWaitingPopup('Next Round Start In');
    //isTimeRemainingPopUp = false;
    //Utils.DisableAllPlayer();
    //Client.ConfirmJoinEmit();
  }
}

WantToPlayMoreResponse = function (data) {
  if (data.status == 1) {
    //Loading.ShowLoadingPopUp();
    showRoundText = true;
    if (gameStatus == "Playing") {
      RoundText.ShowText();
    }
    Utils.DisableAllPlayer();
    //Client.ConfirmJoinEmit();
    InfoPopUp.ShowInfoPopUp();
  }
}

Client.ConfirmJoinEmit = function () {
  _back_button.inputEnabled = false;
  var data = {
    "round_id": round_id,
    "room_id": room_id,
    "user_id": user_id,
    "room_name": room_name,
  }
  console.log("Enter into the Confirm Join Emit Room Name" + room_name + "Room Id........" + room_id + "User Id......" + user_id + "round id......" + round_id);
  Client.socket.emit('replay', data);
}
ConfirmJoinResponse = function (data) {
  console.log("The Game Status....................." + data.result.game_status);
  if (data.status == 1) {
    joinType = "createUser";
    round_id = data.result.round_id;
    Utils.walletBalance = data.result.wallet_balance;
    if (data.result.gamestatus == "waiting") {
      gameStatus = "Playing";
      if (nextRoundText != null) {
        nextRoundText.visible = false;
        nextRoundBg.visible = false;
      }
    }
    Utils.DisablePlayerCard(user_id);
    Utils.SetPlayerInHandMoney(data.result.wallet_balance, user_id);
    if (data.result.eligibility_status == 0) {
      if (data.result.player_id == user_id) {
        if (roundText != null) {
          roundText.destroy();
        }
        PopUp.GenerateCommonPopup('You Have Not Enough Balance');
        //Client.LeaveRoomEmit(1);
      }
      else {
        //Utils.SetPlayerInHandMoney(data.result.wallet_balance,user_id);
        //Utils.CreateUser();
        Utils.DestroyListStartIndex();
      }
    }
  }
}
ReplayFailure = function (data) {
  if (data.status == "0") {
    if (data.result.notjoinuser.includes(user_id)) {
      PopUp.GenerateCommonPopup('Response Timed Out');
      setTimeout(() => {
        Client.LeaveRoomEmit(1);
      }, 500);
    }
  }
}
Client.SwitchTableEmit = function (current_amount) {
  console.log("The Current Amount............" + current_amount);
  console.log("The Game Id.................." + game_id);
  var data = {
    "access_token": session_id,
    "room_id": room_id,
    "round_id": round_id,
    "amount": current_amount,
    "room_name": room_name,
    "game_id": game_id,
    "max_pot_limit": onlineServerEvent.GameMaxPotLimit(gameType),
  }
  Client.socket.emit('switchtable', data);
}
Client.SendTipEmit = function (amount) {
  Debug.log("Send Tip Emit");
  var data = {
    "access_token": session_id,
    "amount": amount,
    "room_name": room_name,
  }
  Client.socket.emit('sendtip', data);
}
SendTipResponseData = function (data) {
  if (data.status == 1) {
    Utils.OnPlayerSendTips(data.result.player_id, data.result.amount, data.result.wallet_balance);
  }
}
SideShowDecisionResponse = function (data) {
  Utils.SideShowGlow(data.result.sender_id, false);
  Utils.SideShowGlow(data.result.receiver_id, false);
}
SideShowAcceptResponseOn = function (data) {
  console.log("The side show accept response data..........." + data + "sender_Id........" + data.result.sender_id + "user_id......" + user_id + "receiver_id..." + data.result.receiver_id);
  if (data.result.sender_id != user_id && data.result.receiver_id == user_id) {
    console.log("Enter into the If side show accept response data.............");
    Utils.ShowCard(data.result.sender_id);
    isSideShow = true;
  }
  else if (data.result.receiver_id != user_id && data.result.sender_id == user_id) {
    console.log("Enter into the Else side show accept response data.............");
    Utils.ShowCard(data.result.receiver_id);
    isSideShow = true;
  }
}
Client.GameWaitingBonus = function (amount) {
  var data = {
    "access_token": session_id,
    "amount": amount,
    "room_name": room_name,
  }
  Client.socket.emit('game_waiting_bonus', data);
}
Client.CheckingResponse = function () {
  console.log("Please go back to a menu screen");
}
