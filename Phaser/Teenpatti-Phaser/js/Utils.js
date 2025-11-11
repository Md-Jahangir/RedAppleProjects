// var giftSenderPosX;
// var giftSenderPosY;
// var giftReceiverPosX;
// var giftReceiverPosY;
// var giftId;
var mask;
var tip_button;
// var tipButtonCounter  = 0;
var currentTipBase;
var currentTipAmountBaseIcon;
var currentTipAmountText;
var defaultPlayer = [];
var isCurrentBetAmountAnimationTop = false;
var globalPotAmount = "";
var walletBalance = "";
var tipLimit = 10;
var giftLimit = 10;
var winText = "";
var numberOfPlayerOnline = 0;
var isCrownTopRender = false;
var activePlayerIndexArray = [];
var isInfoPopUpClicked = false;
var isSideShow = false;
var jokercard;
// var turnTimer = 0;
// var isTurnTimerOn = false;
var Utils = {
    //Load the Json File
    LoadImage: function () {
        game.load.json('roomJoinData', 'js/json/RoomJoinData.json');
        game.load.json('gameRequestData', 'js/json/PlayerCard.json');
        game.load.json('templateJsonData', 'js/json/chatBox.json');
        InfoPopUp.LoadInfoPopUp();
    },
    //Create An Remote Player & Online Player By Parsing Json Data
    CreateImage: function () {
        //roomJoinDataJSON = game.cache.getJSON('roomJoinData');
        //playerCardJson = game.cache.getJSON('gameRequestData');

        _back_button = Utils.ButtonSettingsControl(_back_button, 80.0, 50.0, 'back_button', this.BackBttnDownAnimation, null, null, this.BackbttnUpAnimation, "true", "true", 0.5, 0.5, 0.7, 0.7, this);
        //_text_showcase = Utils.SpriteSettingsControl(_text_showcase,1005.0,50.0,'text_showcase',"true","true",0.5,0.5,0.5,0.7);
        _chat_button = Utils.ButtonSettingsControl(_chat_button, 1200.0, 150.0, 'chat_button', this.ChatBttnDownAnimation, null, null, this.ChatBttnUpAnimation, "true", "true", 0.5, 0.5, 0.72, 0.72, this);
        _info_button = Utils.ButtonSettingsControl(_info_button, 1200.0, 50.0, 'info_Button', this.InfoButtonDownAnimation, null, null, this.InfoButtonUpAnimation, "true", "true", 0.5, 0.5, 0.7, 0.7, this);

        _table = Utils.SpriteSettingsControl(_table, 640.0, 400.0, 'table_0' + game_id, "true", "true", 0.5, 0.5, 0.6, 0.6);
        _girl_dealer = Utils.SpriteSettingsControl(_girl_dealer, _table.x, _table.y - 285, 'girls_dealer', "true", "true", 0.5, 0.5, 0.5, 0.5);

        _pot_amount_text_showcase = Utils.SpriteSettingsControl(_pot_amount_text_showcase, _table.x, _table.y - 65, 'text_showcase', "true", "true", 0.5, 0.5, 0.5, 0.5);
        _pot_amount = Utils.TextSettingsControl(_pot_amount, _table.x, _table.y - 61, '1234567896', "true", "false", 0.5, 0.5, 0., 0.0, "Arial", "bold", "#ffffff", "center", "25px");
        _pot_amount_icon = Utils.SpriteSettingsControl(_pot_amount_icon, _table.x - 100, _table.y - 65, 'poker_chip', "true", "true", 0.5, 0.5, 0.5, 0.5);

        _online_player_button_group = game.add.group();
        _online_player_card_group = game.add.group();

        _button_ui_base = Utils.SpriteSettingsControl(_button_ui_base, 640.0, 335.0, 'button_ui_base', "true", "true", 0.5, 0.5, 0.5, 0.5);
        _pack_button = Utils.ButtonSettingsControl(_pack_button, 400.0, 690.0, 'pack_button', this.PackButtonDownAnimation, null, null, this.PackbuttonUpAnimation, "true", "true", 0.5, 0.5, 0.5, 0.5, this);
        _show_button = Utils.ButtonSettingsControl(_show_button, 640.0, 690.0, 'show_button', this.ShowBttnDownAnimation, null, null, this.ShowBttnUpAnimation, "true", "true", 0.5, 0.5, 0.5, 0.5, this);
        _side_show_button = Utils.ButtonSettingsControl(_side_show_button, 640.0, 690.0, 'side_show_button', this.SideShowBttnDownAnimation, null, null, this.SideShowBttnUpAnimation, "true", "true", 0.5, 0.5, 0.5, 0.5, this);

        _blind_button = Utils.ButtonSettingsControl(_blind_button, 880.0, 670.0, 'blind', this.BlindBttnDownAnimation, null, null, this.BlindBttnUpAnimation, "true", "true", 0.5, 0.5, 0.5, 0.5, this);

        _chaal_button = Utils.ButtonSettingsControl(_chaal_button, 880.0, 670.0, 'chaal_button', this.ChaalBttnDownAnimation, null, null, this.ChaalBttnUpAnimation, "true", "true", 0.5, 0.5, 0.5, 0.5, this);

        _plus_button = Utils.ButtonSettingsControl(_plus_button, 965.0, 642.0, 'plus_icon', this.PlusBttnDownAnimation, null, null, this.PlusBttnUpAnimation, "true", "true", 0.5, 0.5, 0.8, 0.8, this);
        _minus_button = Utils.ButtonSettingsControl(_minus_button, 795.0, 642.0, 'minus_icon', this.MinusBttnDownAnimation, null, null, this.MinusBttnUpAnimation, "true", "true", 0.5, 0.5, 0.8, 0.8, this);

        _current_bet_amount_text = Utils.TextSettingsControl(_current_bet_amount_text, 879.0, 642.0,/*this.currentBetAmount*/"1000", "true", "false", 0.5, 0.5, 0.0, 0.0, "Arial", "bold", "#ffffff", "center", "21px");
        tip_button = Utils.ButtonSettingsControl(tip_button, _table.x, _table.y - 150, 'tip', this.TipButtonDownAnimation, null, null, this.TipButtonUpAnimation, "true", "true", 0.5, 0.5, 0.6, 0.6, this);

        if (game_id == 1) {
            _classic_heading = Utils.SpriteSettingsControl(_classic_heading, 640 + 400, 425 - 380, 'classic_heading', "true", "true", 0.5, 0.5, 0.5, 0.5);
        }
        else if (game_id == 2) {
            _muflis_heading = Utils.SpriteSettingsControl(_muflis_heading, 640 + 400, 425 - 380, 'muflis_heading', "true", "true", 0.5, 0.5, 0.75, 0.75);
        }
        else {
            _joker_heading = Utils.SpriteSettingsControl(_joker_heading, 640 + 400, 425 - 400, 'joker_heading', "true", "true", 0.5, 0.5, 0.75, 0.75);
        }
        _online_player_button_group.add(_button_ui_base);
        _online_player_button_group.add(_pack_button);
        _online_player_button_group.add(_show_button);
        _online_player_button_group.add(_side_show_button);
        _online_player_button_group.add(_blind_button);
        _online_player_button_group.add(_chaal_button);
        _online_player_button_group.add(_plus_button);
        _online_player_button_group.add(_minus_button);
        _online_player_button_group.add(_current_bet_amount_text);

        //Testing
        // Debug.log("The online player button group length......"+_online_player_button_group.length);
        // for(var i= 0; i<_online_player_button_group.length;i++){
        //     Debug.log("The name of all group....."+_online_player_button_group.getAt(i).key + "Fetch the anchor of _packbutton      " + _online_player_button_group.getAt(1).anchor.x);
        // }
        if (gamePlayType == "Private") {
            _room_code_text = Utils.TextSettingsControl(_room_code_text, 280.0, 50.0, 'Room Code : ', "true", "false", 0.5, 0.5, 0., 0.0, "Arial", "bold", "#ffffff", "center", "25px");

            _room_code = Utils.TextSettingsControl(_room_code, 400.0, 50.0, room_code, "true", "false", 0.5, 0.5, 0., 0.0, "Arial", "bold", "#ffffff", "center", "25px");
        }
        Utils.PushAllArrayElement();
        //this.CreateUser(roomJoinDataJSON);                                  //Create A User with Room Join Json Data
        this.EnableDisableChaalButton(false);                   //Enable Disable Chaal Button
        this.EnableDisableSideShowButton(false);                //Enable Disable The Side Show Button 
        //this.EnableDisableAllButtonGroup(true);                 //Enable Disable The Button Group
        this.EnableDisableTipButton(false);
        //this.StoreCardData(playerCardJson);                     //Store All the Card Data 
        //this.ShowCard(21);                                    //Show the card of with Player Index
        //this.ShowAllCard();                                   //Show All card

        //this.ShowAllBootAmountAnimation(numberofPlayer);        //For All BootAmount Animation
        //this.SetPotAmountTimer();                               //For Calculate The Pot Value After Animation
        //this.DisablePlayer(21);                               //Disable Any Particular Player with Player ID
        //this.UpdateCurrentBetAmount(2000);                    //Update Current Bet Amount
        // this.UpdatePotAmount("534552152");                   //Update Current Pot Amount       
        //this.EnableDisableMinusButton(false);   
        //this.UpdateCurrentBetAmount(10000);
        //this.EnableDisableAllButtonGroup(false);      
        //this.InputReceived("SEE",21,1000);                     //Input Received From Server
        //OpponentWaitingPanel.ShowWaitingPopup();
        //Debug.log("The Table Position X.........."+_table.x + "Y Position............."+_table.y);
        //this.UpdatePlayerInHandMoney(30000,19);
        //this.ShowTimer(22);
        //this.CreateSeeButton();
        //SideShowPopUp.ShowSideShowPopUp();
        //this.ShowWinnerCrown(19);
        this.EnableDisableAllButtonGroup(false);
        Gift.CreateChangePicturePopUp();
        this.UpdatePotAmount(0);
        //numberOfPlayerOnline = 7;
        isCrownTopRender = false;
        _info_button.inputEnabled = false;
        //this.DummyCard();
        //this.SpawnCardAnimation();
    },
    SpawnCardAnimation: function () {
        animationCardGroup = game.add.group();
        cardCounter = 0;
        //numberOfPlayerOnline = 7;
        loopCounter = 0;
        game.time.events.loop(100, this.CardAnimation, this);
        game.time.events.start();
    },
    CardAnimation: function () {
        if (loopCounter < numberOfPlayerOnline) {
            if (gameType == "Joker" && cardCounter == 0) {
                var animationcard = Utils.SpriteSettingsControl(animationcard, 610, 250, 'joker', "true", "true", 0.0, 1.0, 1.0, 1.0);
            }
            else {
                var animationcard = Utils.SpriteSettingsControl(animationcard, 610, 250, 'backSideCard', "true", "true", 0.0, 1.0, 1.0, 1.0);
            }
            animationCardGroup.add(animationcard);
            var animationStayCard = Utils.SpriteSettingsControl(animationcard, 610, 250, 'backSideCard', "true", "true", 0.0, 1.0, 1.0, 1.0);

            console.log("The name.............." + animationcard.key);
            var tween = game.add.tween(animationcard.position).to({ x: cardPosX[activePlayerIndexArray[loopCounter]]/*cardPosX[loopCounter]*/, y: cardPosY[activePlayerIndexArray[loopCounter]]/*cardPosY[loopCounter]*/ }, 200, Phaser.Easing.Linear.Out, true);
            console.log("The Value of I.........." + loopCounter + "Number of player......." + numberOfPlayerOnline);
            if (activePlayerIndexArray[loopCounter] == 0) {
                animationcard.scale.set(1.5, 1.5);
                game.add.tween(animationcard).to({ angle: this.RotateSpawnCard(cardCounter) }, 200, Phaser.Easing.Linear.Out, true);
                //this.RotateUserAnimationCard(cardCounter,animationcard);
            }
            else {
                game.add.tween(animationcard).to({ angle: this.RotateSpawnCard(cardCounter) }, 200, Phaser.Easing.Linear.Out, true);
                //this.RotateAnimationCard(cardCounter, animationcard); 
            }
            if (loopCounter == (numberOfPlayerOnline - 1) && cardCounter < 2) {
                loopCounter = -1;
                console.log("The Value of I within If.........." + loopCounter);
                cardCounter++;
            }
            loopCounter++;
            setTimeout(() => {
                animationCardGroup.destroy();
                // this.CreateSeeButton();
                // isSeeButtonRender = true;
            }, numberOfPlayerOnline * 3 * 200);
            setTimeout(() => {
                animationStayCard.visible = false;
            }, (numberOfPlayerOnline * 3 * 100) - 100);
        }
    },
    RotateSpawnCard: function (index) {
        var angle;
        if (index == 0) {
            angle = -40;
        }
        if (index == 1) {
            angle = -20;
        }
        if (index == 2) {
            angle = 0;
        }
        return angle;
    },
    RotateUserAnimationCard: function (index, card) {
        if (index == 0) {
            card.angle = -40;
        }
        if (index == 1) {
            card.angle = -20;
        }
        if (index == 2) {
            card.angle = 0;
        }
        return card.angle;
    },
    RotateAnimationCard: function (index, card) {
        if (index == 0) {
            card.angle = -40;
        }
        if (index == 1) {
            card.angle = -20;
        }
        if (index == 2) {
            card.angle = 0;
        }
        return card.angle;
    },
    //CreatePlayer
    CreateUser: function (data) {
        if (gamePage == "GameplayPage") {
            winText.visible = false;
            Debug.log("The Create user Data..........." + data);
            Database.SaveData("room_name", data.result.room_name);
            Database.SaveData("round_id", data.result.round_id);
            Database.SaveData("roomplayer_id", data.result.roomplayer_id);
            Database.SaveData("room_id", data.result.room_id);
            room_name = data.result.room_name;
            round_id = Database.LoadData("round_id");
            roomplayer_id = Database.LoadData("roomplayer_id");
            room_id = Database.LoadData("room_id");
            Debug.log("Room name......." + room_name + "Round_id......." + round_id + "RoomPlayer_id........" + roomplayer_id + "Room_Id........" + room_id);
            // for (var i = 0; i < data.result.userslist.length; i++)
            // {
            //     if(user_id == data.result.userslist[i].userid){
            //         userIndex = -1;
            //     }
            // }
            if (userIndex < 0) {
                for (var i = 0; i < data.result.userslist.length; i++) {
                    Debug.log("Enter into the Data Result user List................." + user_id + "User List User Id............" + data.result.userslist[i].userid);
                    if (user_id == data.result.userslist[i].userid) {
                        userIndex = data.result.userslist[i].sitting_index;
                        Debug.log("Enter into the User Index......." + userIndex);
                        this.DeactivateAllCrown();
                    }
                }
            }

            for (var i = 0; i < data.result.userslist.length; i++) {
                var startIndex = 0;
                var playerType = "";
                Debug.log("The User Index............." + userIndex + "The allplayer Data.........." + allPlayers[startIndex]);
                startIndex = data.result.userslist[i].sitting_index - userIndex;
                if (startIndex < 0) {
                    startIndex = 7 + startIndex;
                }
                Debug.log("The Start Index.........." + startIndex);
                if (defaultPlayer[startIndex] != null) {
                    defaultPlayer[startIndex].visible = false;
                }
                if (allPlayers[startIndex] == null) {
                    console.log("Enter into the AllPlayers Create Condition......StartIndex" + startIndex + "Lst of Start Index......." + lststartIndex[startIndex]);
                    var player = new Player();
                    player.playerId = data.result.userslist[i].userid;
                    player.playerName = data.result.userslist[i].name;
                    player.sittingIndex = data.result.userslist[i].sitting_index;
                    player.playerSprite = data.result.userslist[i].image;
                    player.playerInhandMoney = data.result.userslist[i].wallet_balance;
                    player.bootAmount = data.result.userslist[i].boot_amount;
                    player.playerSprite = data.result.userslist[i].avatar_id;
                    // currentBetAmount =  parseInt(data.result.userslist[i].boot_amount);
                    Debug.log("Current Bet Amount........" + currentBetAmount + "The Current Bet Amount Text........." + _current_bet_amount_text);

                    Debug.log("The Player Id........." + player.playerId);
                    Debug.log("The Player Name........." + player.playerName);
                    Debug.log("The Player Sitting Index........" + player.sittingIndex);
                    Debug.log("The Start Index.........." + startIndex);
                    Debug.log("The Player Pos X........." + playerPosX[startIndex] + "Player Pos Y............" + playerPosY[startIndex]);
                    Debug.log("The Player Inhand Money........." + player.playerInhandMoney);
                    if (user_id == data.result.userslist[i].userid) {
                        playerType = "Online";
                        clientEndSittingIndex = data.result.userslist[i].sitting_index;
                    }
                    else {
                        playerType = "Remote";
                    }
                    player.CreatePlayer(playerPosX[startIndex], playerPosY[startIndex], dealerIconPosX[startIndex], dealerIconPosY[startIndex], giftIconPosx[startIndex], giftIconPosY[startIndex],
                        namePosX[startIndex], namePosY[startIndex], timerImagePosX[startIndex], timerImagePosY[startIndex], decisionImagePosX[startIndex], decisionImagePosY[startIndex],
                        decisionTextPosX[startIndex], decisionTextPosY[startIndex], bootAmountBasePosX[startIndex], bootAmountBasePosY[startIndex], bootAmountTextPosX[startIndex], bootAmountTextPosY[startIndex],
                        bootIconPosX[startIndex], bootIconPosY[startIndex], inHandMoneyBaseAmountPosX[startIndex], inHandMoneyBaseAmountPosY[startIndex], inHandMoneyIconPosX[startIndex], inHandMoneyIconPosY[startIndex],
                        crownImagePosX[startIndex], crownImagePosY[startIndex], packBasePosX[startIndex], packBasePosY[startIndex], inHandAmountPosX[startIndex], inHandAmountPosY[startIndex], playerType,
                        crownImageStayPosX[startIndex], crownImageStayPosY[startIndex]);

                    allPlayers[startIndex] = player;
                    lststartIndex.push(startIndex);
                    Debug.log("Enter into the Create Player" + player.playerName);

                    // console.log("The data.............."+JSON.stringify(data));
                    // if(data.result.userslist.length == 1){
                    //     this.CreateBonusTimer(data.result.userslist.length,allPlayers);
                    // }
                    // if(data.result.userslist.length >= 2){
                    //     game.time.events.remove(bonusTimerLoopEvent);
                    // }
                }
                console.log("All the Start Index Create User............" + lststartIndex[i] + "The length of the start index..........." + lststartIndex.length + "Position 3...." + lststartIndex[3]);
            }
            // this.DeactivateAllCrown();
        }
    },
    //Spawn Card 
    StoreCardData: function (data) {
        if (gamePage == "GameplayPage") {
            console.log("The Length of Lst Start Index Within Store Card..........." + lststartIndex.length);
            cardGroup = game.add.group();
            var counter = 0;
            if (data.result.gamestatus == "wait_for_next_round") {

            }
            else {
                chaal_limit = data.result.chaal_limit;
                max_blind = data.result.max_blind;
                pot_limit = data.result.pot_limit;
                dealer_id = data.result.dealer_id;
                boot_amount = data.result.boot_amount;
            }
            numberofPlayer = data.result.cardlist.length;
            numberOfPlayerOnline = data.result.cardlist.length;
            console.log("The online pLayer............." + numberOfPlayerOnline + "Number of PLayer............" + numberofPlayer);
            Debug.log("The result of Lst start Index..............." + data.result.cardlist.length + "Number of Player......." + numberofPlayer);
            //SoundManager.PlayCardDealSound();
            if (data.result.gamestatus == "wait_for_next_round") {
                for (var i = 0; i < data.result.cardlist.length; i++) {
                    var cardArray = [];
                    Debug.log("The Card Positon of X...." + cardPosX[lststartIndex[i]] + "The card psoition of Y.........." + cardPosY[lststartIndex[i]] + "List of Start Index......" + lststartIndex[i]);
                    for (var j = (data.result.cardlist[i].cards_details.length - 1); j >= 0; j--) {
                        var card = new Card();
                        for (var k = 0; k < allPlayers.length; k++) {
                            if (allPlayers[k] != null) {
                                if (data.result.cardlist[i].user_id == allPlayers[k].playerId) {
                                    if (gameType == "Joker" && j == 2) {
                                        if (data.result.cardlist[i].user_id == user_id) {
                                            card.cardsprite = Utils.SpriteSettingsControl(card,/*640,170,*/cardPosX[k], cardPosY[k], 'joker', "true", "true", 0.0, 1.0, 1.5, 1.5);
                                        }
                                        else {
                                            card.cardsprite = Utils.SpriteSettingsControl(card,/*640,170,*/cardPosX[k], cardPosY[k], 'joker', "true", "true", 0.0, 1.0, 1.0, 1.0);
                                        }
                                    }
                                    else {
                                        if (data.result.cardlist[i].user_id == user_id) {
                                            card.cardsprite = Utils.SpriteSettingsControl(card,/*640,170,*/cardPosX[k], cardPosY[k], 'backSideCard', "true", "true", 0.0, 1.0, 1.5, 1.5);
                                        }
                                        else {
                                            card.cardsprite = Utils.SpriteSettingsControl(card,/*640,170,*/cardPosX[k], cardPosY[k], 'backSideCard', "true", "true", 0.0, 1.0, 1.0, 1.0);
                                        }
                                    }
                                    Debug.log("The Card Number..........." + data.result.cardlist[i].cards_details[j].cardnumber);
                                    card.cardNumber = data.result.cardlist[i].cards_details[j].cardnumber - 2;//this.CardNumber(data.result.cardlist[i].cards_details[j].cardnumber);
                                    card.cardType = this.CardType(data.result.cardlist[i].cards_details[j].cardtype);
                                    card.cardPosX = cardPosX[k];
                                    card.cardPosY = cardPosY[k];
                                    card.cardShowPosX = cardShowPosX[k];
                                    card.cardShowPosY = cardShowPosY[k];
                                    cardGroup.add(card.cardsprite);
                                    //var tween = game.add.tween(card.cardsprite.position).to({ x: cardPosX[k], y: cardPosY[k]}, 500, Phaser.Easing.Sinusoidal.Out, true);
                                    cardArray.push(card);
                                    if (data.result.cardlist[i].user_id == user_id) {
                                        this.RotateUserCard(j, card.cardsprite);
                                    }
                                    else {
                                        this.RotateCard(j, card.cardsprite);
                                    }
                                    //card.cardsprite.visible = false;
                                }
                            }
                        }
                    }
                    console.log("The All Players Start Index Store Card ............." + allPlayers[lststartIndex[i]] + "Lst of Start Index............" + lststartIndex[i] + "Position 3...." + lststartIndex[3]);
                    for (var k = 0; k < allPlayers.length; k++) {
                        if (allPlayers[k] != null) {
                            if (data.result.cardlist[i].user_id == allPlayers[k].playerId) {
                                allPlayers[k].card = cardArray;
                            }
                        }
                    }
                }
            }
            else {
                setTimeout(() => {
                    for (var i = 0; i < data.result.cardlist.length; i++) {
                        var cardArray = [];
                        Debug.log("The Card Positon of X...." + cardPosX[lststartIndex[i]] + "The card psoition of Y.........." + cardPosY[lststartIndex[i]] + "List of Start Index......" + lststartIndex[i]);
                        for (var j = (data.result.cardlist[i].cards_details.length - 1); j >= 0; j--) {
                            var card = new Card();
                            for (var k = 0; k < allPlayers.length; k++) {
                                if (allPlayers[k] != null) {
                                    if (data.result.cardlist[i].user_id == allPlayers[k].playerId) {
                                        if (gameType == "Joker" && j == 2) {
                                            if (data.result.cardlist[i].user_id == user_id) {
                                                card.cardsprite = Utils.SpriteSettingsControl(card,/*640,170,*/cardPosX[k], cardPosY[k], 'joker', "true", "true", 0.0, 1.0, 1.5, 1.5);
                                            }
                                            else {
                                                card.cardsprite = Utils.SpriteSettingsControl(card,/*640,170,*/cardPosX[k], cardPosY[k], 'joker', "true", "true", 0.0, 1.0, 1.0, 1.0);
                                            }
                                        }
                                        else {
                                            if (data.result.cardlist[i].user_id == user_id) {
                                                card.cardsprite = Utils.SpriteSettingsControl(card,/*640,170,*/cardPosX[k], cardPosY[k], 'backSideCard', "true", "true", 0.0, 1.0, 1.5, 1.5);
                                            }
                                            else {
                                                card.cardsprite = Utils.SpriteSettingsControl(card,/*640,170,*/cardPosX[k], cardPosY[k], 'backSideCard', "true", "true", 0.0, 1.0, 1.0, 1.0);
                                            }
                                        }
                                        Debug.log("The Card Number..........." + data.result.cardlist[i].cards_details[j].cardnumber);
                                        card.cardNumber = data.result.cardlist[i].cards_details[j].cardnumber - 2;//this.CardNumber(data.result.cardlist[i].cards_details[j].cardnumber);
                                        card.cardType = this.CardType(data.result.cardlist[i].cards_details[j].cardtype);
                                        card.cardPosX = cardPosX[k];
                                        card.cardPosY = cardPosY[k];
                                        card.cardShowPosX = cardShowPosX[k];
                                        card.cardShowPosY = cardShowPosY[k];
                                        cardGroup.add(card.cardsprite);
                                        //var tween = game.add.tween(card.cardsprite.position).to({ x: cardPosX[k], y: cardPosY[k]}, 500, Phaser.Easing.Sinusoidal.Out, true);
                                        cardArray.push(card);
                                        if (data.result.cardlist[i].user_id == user_id) {
                                            this.RotateUserCard(j, card.cardsprite);
                                        }
                                        else {
                                            this.RotateCard(j, card.cardsprite);
                                        }
                                        //card.cardsprite.visible = false;
                                    }
                                }
                            }
                        }
                        console.log("The All Players Start Index Store Card ............." + allPlayers[lststartIndex[i]] + "Lst of Start Index............" + lststartIndex[i] + "Position 3...." + lststartIndex[3]);
                        for (var k = 0; k < allPlayers.length; k++) {
                            if (allPlayers[k] != null) {
                                if (data.result.cardlist[i].user_id == allPlayers[k].playerId) {
                                    allPlayers[k].card = cardArray;
                                }
                            }
                        }
                    }
                }, numberOfPlayerOnline * 3 * 200);
            }
        }
    },
    ShowCardToTop: function () {
        if (isCardTopShown) {
            game.world.bringToTop(cardGroup);
        }
    },
    //Rotate Card
    RotateCard: function (index, card) {
        if (index == 2) {
            card.angle = -40;
        }
        if (index == 1) {
            card.angle = -20;
        }
        if (index == 0) {
            card.angle = 0;
        }
    },
    //RotateUserCard
    RotateUserCard: function (index, card) {
        if (index == 0) {
            card.angle = 0;
        }
        if (index == 1) {
            card.angle = -20;
        }
        if (index == 2) {
            card.angle = -40;
        }
    },

    //Show Card 
    ShowCard: function (playerIndex) {
        if (_see_button != null) {
            _see_button.visible = false;
            _see_button_text.visible = false;
        }
        isCardTopShown = false;
        //isSeeCardTopShown = true;
        seenCardGroup = game.add.group();
        //console.log("The index of lst........."+lststartIndex[i]);

        console.log("The user seen card happens........................");
        for (var i = 0; i < allPlayers.length; i++) {
            if (allPlayers[lststartIndex[i]] != null) {
                if (allPlayers[lststartIndex[i]].seeCard.length == 0) {
                    if (allPlayers[lststartIndex[i]].playerId == playerIndex) {
                        var cardArray = [];
                        for (var j = (allPlayers[lststartIndex[i]].card.length - 1); j >= 0; j--) {
                            //for(var  j = 0; j<allPlayers[lststartIndex[i]].card.length;j++){
                            Debug.log("The Card Type........." + allPlayers[lststartIndex[i]].card[j].cardType + "The Card Number........." + allPlayers[lststartIndex[i]].card[j].cardNumber);
                            var index = (allPlayers[lststartIndex[i]].card[j].cardType * 13) + allPlayers[lststartIndex[i]].card[j].cardNumber;
                            if (playerIndex == user_id) {
                                if (gameType == "Joker" && j == (allPlayers[lststartIndex[i]].card.length - 1)) {
                                    allCardSprite = Utils.SpriteSettingsControl(allCardSprite, allPlayers[lststartIndex[i]].card[j].cardPosX - (j * 20), allPlayers[lststartIndex[i]].card[j].cardPosY, 'joker', "true", "true", 0.0, 1.0, 1.5, 1.5);
                                    this.RotateShowCard(j, allCardSprite);
                                    jokercard = Utils.SpriteSettingsControl(allCardSprite, allPlayers[lststartIndex[i]].card[j].cardPosX - (j * 20), allPlayers[lststartIndex[i]].card[j].cardPosY, 'card', "true", "true", 0.0, 1.0, 1.5, 1.5);
                                    jokercard.frame = index;
                                    jokercard.visible = false;
                                    this.RotateShowCard(j, jokercard);
                                }
                                else {
                                    allCardSprite = Utils.SpriteSettingsControl(allCardSprite, allPlayers[lststartIndex[i]].card[j].cardPosX - (j * 20), allPlayers[lststartIndex[i]].card[j].cardPosY, 'card', "true", "true", 0.0, 1.0, 1.5, 1.5);
                                    this.RotateShowCard(j, allCardSprite);
                                }
                            }
                            else {
                                allCardSprite = Utils.SpriteSettingsControl(allCardSprite, allPlayers[lststartIndex[i]].card[j].cardShowPosX - (j * 30)/*cardPosX*/, allPlayers[lststartIndex[i]].card[j].cardShowPosY/*cardPosY*/, 'card', "true", "true", 0.0, 1.0, 1.3, 1.3);
                            }
                            // else{
                            //     if(gameType == "Joker" && j==0){
                            //         allCardSprite = Utils.SpriteSettingsControl(allCardSprite,allPlayers[lststartIndex[i]].card[j].cardPosX, allPlayers[lststartIndex[i]].card[j].cardPosY, 'joker',"true","false",0.0,1.0,0.8,0.8);
                            //     }
                            //     else{
                            //         allCardSprite = Utils.SpriteSettingsControl(allCardSprite,allPlayers[lststartIndex[i]].card[j].cardPosX, allPlayers[lststartIndex[i]].card[j].cardPosY, 'card',"true","false",0.0,1.0,0.8,0.8);
                            //     }
                            // }
                            Debug.log("The index of lst........." + lststartIndex[i]);
                            Debug.log("The Index of Card : " + index);
                            allCardSprite.frame = index;
                            cardArray.push(allCardSprite);
                            seenCardGroup.add(allCardSprite);
                        }
                        hasSeenCard = true;
                        allPlayers[lststartIndex[i]].seeCard = cardArray;

                        for (var j = 0; j < allPlayers[lststartIndex[i]].card.length; j++) {
                            allPlayers[lststartIndex[i]].card[j].cardsprite.destroy();
                        }
                        Debug.log("The length of see card........." + allPlayers[lststartIndex[i]].seeCard.length);
                    }
                }
            }
        }
        isSeeCardTopShown = true;
    },
    //Rotate Card
    RotateShowCard: function (index, card) {
        if (index == 0) {
            card.angle = 15;
        }
        if (index == 1) {
            card.angle = 0;
        }
        if (index == 2) {
            card.angle = -15;
        }
    },
    ShowSeenCardToTop: function () {
        if (isSeeCardTopShown) {
            if (seenCardGroup != null) {
                game.world.bringToTop(seenCardGroup);
            }
        }
    },
    //Show All Card
    ShowAllCard: function () {
        isCardTopShown = false;
        //isSeeCardTopShown = true;
        for (var i = 0; i < allPlayers.length; i++) {
            if (allPlayers[lststartIndex[i]] != null) {
                console.log("The Card Length................" + allPlayers[lststartIndex[i]].card.length);
                if (allPlayers[lststartIndex[i]].seeCard.length == 0) {
                    var cardArray = [];
                    if (allPlayers[lststartIndex[i]].card.length > 0) {
                        //for(var  j = 0; j<allPlayers[lststartIndex[i]].card.length;j++){
                        for (var j = (allPlayers[lststartIndex[i]].card.length - 1); j >= 0; j--) {
                            Debug.log("The Card Type........." + allPlayers[lststartIndex[i]].card[j].cardType + "The Card Number........." + allPlayers[lststartIndex[i]].card[j].cardNumber);
                            var index = (allPlayers[lststartIndex[i]].card[j].cardType * 13) + allPlayers[lststartIndex[i]].card[j].cardNumber;
                            Debug.log("The Index of Card : " + index);
                            if (allPlayers[lststartIndex[i]].playerId == user_id) {
                                allCardSprite = Utils.SpriteSettingsControl(allCardSprite, allPlayers[lststartIndex[i]].card[j].cardPosX - (j * 20), allPlayers[lststartIndex[i]].card[j].cardPosY, 'card', "true", "true", 0.0, 1.0, 1.5, 1.5);
                                //this.RotateCard(j,allCardSprite);
                                this.RotateShowCard(j, allCardSprite);
                            }
                            else {
                                allCardSprite = Utils.SpriteSettingsControl(allCardSprite, allPlayers[lststartIndex[i]].card[j].cardShowPosX - (j * 30)/*cardPosX*/, allPlayers[lststartIndex[i]].card[j].cardShowPosY/*cardPosY*/, 'card', "true", "true", 0.0, 1.0, 1.3, 1.3);
                            }
                            allCardSprite.frame = index;
                            cardArray.push(allCardSprite);
                            //this.RotateCard(j,allCardSprite);
                        }
                    }
                    allPlayers[lststartIndex[i]].seeCard = cardArray;
                    for (var j = 0; j < allPlayers[lststartIndex[i]].card.length; j++) {
                        allPlayers[lststartIndex[i]].card[j].cardsprite.destroy();
                    }
                }
                else {
                    console.log("Enter the Joker Show All Card Else Part");
                    if (gameType == "Joker") {
                        if (allPlayers[lststartIndex[i]].playerId == user_id) {
                            if (allPlayers[lststartIndex[i]].decisionTextValue != "PACK") {
                                jokercard.visible = true;
                            }
                            for (var j = 0; j < allPlayers[lststartIndex[i]].seeCard.length; j++) {
                                //var index = (allPlayers[lststartIndex[i]].card[j].cardType * 13) + allPlayers[lststartIndex[i]].card[j].cardNumber;
                                if (j == 0) {
                                    console.log("Enter the Joker If Part" + allPlayers[lststartIndex[i]].seeCard[j]);
                                    allPlayers[lststartIndex[i]].seeCard[j].visible = false;
                                }
                            }
                        }
                        // if(allPlayers[lststartIndex[i].seeCard ){
                        // if(allPlayers[lststartIndex[i].seeCard.length] > 0){
                        //     for(var  j = 0; j<allPlayers[lststartIndex[i]].seeCard.length;j++){
                        //         var index = (allPlayers[lststartIndex[i]].card[j].cardType * 13) + allPlayers[lststartIndex[i]].card[j].cardNumber;
                        //         if(j == (allPlayers[lststartIndex[i]].seeCard.length-1)){
                        //             console.log("Enter the Joker If Part");
                        //             if(allPlayers[lststartIndex[i]].playerId == user_id){
                        //                 console.log("Enter the Joker Show All Card Pop Up");
                        //                 allCardSprite = Utils.SpriteSettingsControl(allCardSprite,allPlayers[lststartIndex[i]].card[j].cardPosX - (j*20), allPlayers[lststartIndex[i]].card[j].cardPosY, 'card',"true","true",0.0,1.0,1.5,1.5);
                        //             }
                        //             allCardSprite.frame = index;
                        //         }
                        //     }
                        // }
                    }
                }
            }
        }
    },
    EnableAllBootAmountAnimation: function () {
        for (var i = 0; i < allPlayers.length; i++) {
            if (allPlayers[i] != null) {
                allPlayers[i].EnableDisableAllBootAmount(true);
            }
        }
    },
    //Show Winner Crown
    ShowWinnerCrown: function (_playerId) {
        SoundManager.PlayWinnerSound();
        for (var i = 0; i < allPlayers.length; i++) {
            if (allPlayers[i] != null) {
                if (allPlayers[i].playerId == _playerId) {
                    allPlayers[i].crownIcon.visible = true;
                    this.DeactivateAllCrown();
                    var playerReference = allPlayers[i];
                    setTimeout(this.PotAmountAnimation, 1000, playerPosX[i], playerPosY[i], globalPotAmount);
                    particleEffectSpriteSheet = game.add.sprite(playerPosX[i], playerPosY[i] + 10, 'particleBlast');
                    particleEffectSpriteSheet.anchor.setTo(0.5, 0.5);
                    //particleEffectSpriteSheet.scale.setTo(0.5,0.5);
                    var anim = particleEffectSpriteSheet.animations.add('anim');
                    particleEffectSpriteSheet.animations.play('anim', 30, false);
                    anim.onComplete.add(this.ParticleEffectDestroy, this);
                    setTimeout(function () {
                        playerReference.EnableDisableSmallCrownImage(true);
                    }, 7000)
                    // setTimeout(() => {
                    //     playerReference.EnableDisableSmallCrownImage(true);
                    // }, 5000);
                }
            }
        }
    },
    ParticleEffectDestroy: function () {
        particleEffectSpriteSheet.destroy();
    },

    // DelayPotAmountAnimation: function(){
    //     this.PotAmountAnimation(playerPosX[i],playerPosY[i],potAmount);
    // },
    ShowDealerIcon: function (_playerId) {
        for (var i = 0; i < allPlayers.length; i++) {
            if (allPlayers[i] != null) {
                if (allPlayers[i].playerId == _playerId) {
                    //if(_playerId == user_id){
                    allPlayers[i].EnableDisableDealerIcon(true);
                    //}
                }
            }
        }
    },
    GameOver: function (winner_id) {
        this.EnableDisableAllButtonGroup(false);
        this.ShowWinnerCrown(winner_id);
        this.EnableDisableSeeButton(false);
        this.ShowAllCard();
        if (allPlayers.length > 0) {
            for (var i = 0; i < allPlayers.length; i++) {
                if (allPlayers[i] != null) {
                    allPlayers[i].EnableDisableGiftIcon(false);
                    this.HideTimer(winner_id);
                }
            }
        }
    },
    ScoreDeclare: function (data) {
        for (var i = 0; i < data.result.all_player_score.length; i++) {
            if (user_id == data.result.all_player_score[i].user_id) {
                console.log("The User Id is........" + user_id + ". The Score Declare User Id......." + data.result.all_player_score[i].user_id);
                console.log(data.result.all_player_score[i]);
                for (var j = 0; j < allPlayers.length; j++) {
                    if (allPlayers[j] != null) {
                        if (allPlayers[j].playerId == data.result.all_player_score[i].user_id) {
                            if (data.result.all_player_score[i].user_id == user_id) {
                                //this.PotAmountAnimation(playerPosX[i],playerPosY[i],data.result.all_player_score[i].wallet_money);
                                allPlayers[j].UpdatePlayerInHandMoney(data.result.all_player_score[i].wallet_money);
                            }
                        }
                    }
                }
            }
        }
    },

    //UpdatePlayerInHandMoney 
    UpdatePlayerInHandMoney: function (currentInHandMoney, playerId) {
        for (var i = 0; i < allPlayers.length; i++) {
            if (allPlayers[i] != null) {
                if (allPlayers[i].playerId == playerId) {
                    Debug.log("Enter into Update inhand Player................" + currentInHandMoney + "PlayerId........" + playerId + "INHandMoney........." + allPlayers[i].playerInhandMoney);
                    allPlayers[i].playerInhandMoney -= currentInHandMoney;
                    allPlayers[i].UpdatePlayerInHandMoney(allPlayers[i].playerInhandMoney);
                }
            }
        }
    },

    SetPlayerInHandMoney: function (playerInHandMoney, _playerId) {
        for (var i = 0; i < allPlayers.length; i++) {
            if (allPlayers[i] != null) {
                if (allPlayers[i].playerId == _playerId) {
                    allPlayers[i].UpdatePlayerInHandMoney(playerInHandMoney);
                }
            }
        }
    },
    GetPlayerInHandMoney: function () {
        var handMoney = 0;
        for (var i = 0; i < allPlayers.length; i++) {
            if (allPlayers[i] != null) {
                if (allPlayers[i].playerId == user_id) {
                    handMoney = allPlayers[i].playerInhandMoney;
                }
            }
        }
        return handMoney;
    },
    GetPlayerBootAmount: function () {
        var bootamount = 0;
        for (var i = 0; i < allPlayers.length; i++) {
            if (allPlayers[i] != null) {
                if (allPlayers[i].playerId == user_id) {
                    bootamount = allPlayers[i].bootAmount;
                }
            }
        }
        return bootamount;
    },
    PotAmountAnimation: function (playerPosX, playerPosY, wallet_balance) {
        potAmountAnimationBase = Utils.SpriteSettingsControl(potAmountAnimationBase, _table.x, _table.y - 65, 'text_showcase', "true", "true", 0.5, 0.5, 0.25, 0.25);
        potAmountAnimationBaseIcon = Utils.SpriteSettingsControl(potAmountAnimationBaseIcon, _table.x - 55, _table.y - 65, 'poker_chip', "true", "true", 0.5, 0.5, 0.25, 0.25);
        potAnimationAmountText = Utils.TextSettingsControl(potAnimationAmountText, _table.x, _table.y - 61, wallet_balance, "true", "false", 0.5, 0.5, 0.0, 0.0, "Arial", "bold", "#ffffff", "center", "18px");


        var baseTween = game.add.tween(potAmountAnimationBase).to({ x: playerPosX, y: playerPosY }, 700, Phaser.Easing.Linear.Out, true);
        var baseIconTween = game.add.tween(potAmountAnimationBaseIcon).to({ x: playerPosX - 55, y: playerPosY }, 700, Phaser.Easing.Linear.Out, true);
        var textTween = game.add.tween(potAnimationAmountText).to({ x: playerPosX, y: playerPosY + 2 }, 700, Phaser.Easing.Linear.Out, true);
        baseTween.onComplete.add(Utils.CompletePotAmountAnimationCollection, this);
    },

    CompletePotAmountAnimationCollection: function () {
        potAmountAnimationBase.visible = false;
        potAmountAnimationBaseIcon.visible = false;
        potAnimationAmountText.visible = false;
        Utils.UpdatePotAmount(0);
    },
    //Update Current Pot Amount
    UpdatePotAmount: function (currentPotAmount) {
        if (_pot_amount) {
            _pot_amount.setText(currentPotAmount);
        }
    },
    //Show Timer Function
    ShowTimer: function (_playerId) {
        isPlayerTimer = false;
        isPlayerTimerCreate = true;
        playerId = _playerId;
        if (gameStatus == "Playing") {
            if (!hasSeenCard) {
                isCardTopShown = true;
            }
            else {
                isSeeCardTopShown = true;
            }
        }
    },
    ChangeTimer: function (index) {
        for (var i = 0; i < allPlayers.length; i++) {
            if (allPlayers[i] != null) {
                if (allPlayers[i].playerId == index) {
                    if (index == user_id) {
                        angle = allPlayers[i].UpdateTimer(76);
                    }
                    else {
                        angle = allPlayers[i].UpdateTimer(65);
                    }
                    //Debug.log("The angle..........."+angle);
                    return angle;
                }
            }
        }
    },

    HideTimer: function (index) {
        SoundManager.StopTimeEndNotification();
        for (var i = 0; i < allPlayers.length; i++) {
            if (allPlayers[i] != null) {
                if (allPlayers[i].playerId == index) {
                    allPlayers[i].HideTimer();
                    allPlayers[i].timerCounter = 0;
                    isPlayerTimer = true;
                    isCardTopShown = false;
                    game.time.events.stop();
                }
            }
        }
    },
    HideTimerImage: function (index) {
        for (var i = 0; i < allPlayers.length; i++) {
            if (allPlayers[i] != null) {
                if (allPlayers[i].playerId == index) {
                    allPlayers[i].HideTimer();
                    allPlayers[i].timerCounter = 0;
                    isCardTopShown = false;
                    game.time.events.stop();
                }
            }
        }
    },

    //Disable A Player With Player Index
    DisablePlayer: function (index) {
        for (var i = 0; i < allPlayers.length; i++) {
            if (allPlayers[i] != null) {
                if (allPlayers[i].playerId == index) {
                    allPlayers[i].EnableDisableDealerIcon(false);
                    allPlayers[i].EnableDisableGiftIcon(false);
                    allPlayers[i].giftIcon.destroy();
                    allPlayers[i].groupName.visible = false;
                    allPlayers[i].playerOnlineRing.destroy();
                    allPlayers[i].EnableDisableCrownIcon(false);
                    allPlayers[i].EnableDisableGlow(false);
                    allPlayers[i].EnableDisableSmallCrownImage(false);
                    if (allPlayers[i].card.length > 0) {
                        for (var j = 0; j < allPlayers[i].card.length; j++) {
                            allPlayers[i].card[j].cardsprite.destroy();
                        }
                    }
                    if (allPlayers[i].seeCard.length > 0) {
                        for (var k = 0; k < allPlayers[i].seeCard.length; k++) {
                            allPlayers[i].seeCard[k].destroy();
                            if (gameType == "Joker") {
                                jokercard.visible = false;
                            }
                        }
                    }
                }
                // allPlayers[i].isDead = true;
            }
            //allPlayers[i] = null;
        }
    },
    DisableAllPlayer: function () {
        isPlayerTimer = true;
        currentBetAmount = onlineServerEvent.GameAmount(gameType);
        //userIndex = -1;
        potAmount = 0;
        this.UpdatePotAmount(0);
        hasSeenCard = false;
        currentBlindAmount = 0;
        blindCount = 0;
        this.DisablePlayerCard(user_id);
        for (var i = 0; i < allPlayers.length; i++) {
            if (allPlayers[i] != null) {
                allPlayers[i].EnableDisableDealerIcon(false);
                allPlayers[i].EnableDisableGiftIcon(false);
                //allPlayers[i].giftIcon.destroy();
                // allPlayers[i].groupName.visible = false;
                // allPlayers[i].playerOnlineRing.destroy();
                allPlayers[i].EnableDisableCrownIcon(false);
                allPlayers[i].EnableDisableAllDecisionBase(false);
                allPlayers[i].EnableDisablePackDecision(false);
                if (allPlayers[i].card.length > 0) {
                    for (var j = 0; j < allPlayers[i].card.length; j++) {
                        allPlayers[i].card[j].cardsprite.destroy();
                    }
                }
            }
        }
        for (var i = 0; i < allPlayers.length; i++) {
            if (allPlayers[i] != null) {
                this.DisablePlayerCard(allPlayers[i].playerId);
            }
        }
        // if(lststartIndex.length >0){
        //     for(var i = 0;i<lststartIndex.length;i++){
        //         lststartIndex[i] = null;
        //     }
        //     lststartIndex.length = 0;
        // }
        // for(var i = 0;i<allPlayers.length;i++){
        //     if(allPlayers[i] != null){
        //         allPlayers[i] = null;
        //     }
        // }
    },
    //Show All The Boot Amount Animation
    ShowAllBootAmountAnimation: function (numberOfPlayer) {
        console.log("The Wallet Balance........" + Utils.walletBalance + "The User Id......." + user_id);
        if (Utils.walletBalance > 0) {
            this.SetPlayerInHandMoney(Utils.walletBalance, user_id);
        }
        this.UpdatePlayerInHandMoney(onlineServerEvent.GameAmount(gameType), user_id);
        Debug.log("Enter into the Show Boot Amount ANimation......" + numberOfPlayer);
        for (var i = 0; i < numberOfPlayer; i++) {
            if (allPlayers[activePlayerIndexArray[i]] != null) {
                Debug.log("Enter into the Show Boot Amount");
                allPlayers[activePlayerIndexArray[i]].EnableDisableAllBootAmount(true);
                allPlayers[activePlayerIndexArray[i]].CollectBootAmountAnimation();
                SoundManager.PlayChaalBlindSound();
            }
        }
    },

    //For Refreshing The Game
    GameRefresh: function () {
        Debug.log("Enter into the Game Refresh" + allPlayers.length);
        isPlayerTimer = true;
        userIndex = -1;
        potAmount = 0;
        hasSeenCard = false;
        currentBlindAmount = 0;
        blindCount = 0;
        currentBetAmount = onlineServerEvent.GameAmount(gameType);
        this.UpdatePotAmount(0);

        if (allPlayers.length > 0) {
            for (var i = 0; i < allPlayers.length; i++) {
                if (allPlayers[i] != null) {
                    console.log("Enter into the Game Refresh ALl Player");
                    allPlayers[i].EnableDisableAllDecisionBase(false);
                    allPlayers[i].EnableDisablePackDecision(false);
                    allPlayers[i].EnableDisableDealerIcon(false);
                    allPlayers[i].EnableDisableGiftIcon(false);
                    allPlayers[i].EnableDisableCrownIcon(false);
                    allPlayers[i].EnableDisableGlow(false);
                    allPlayers[i].EnableDisableSmallCrownImage(false);
                    if (allPlayers[i].card.length > 0) {
                        for (var j = 0; j < allPlayers[i].card.length; j++) {
                            allPlayers[i].card[j].cardsprite.destroy();
                        }
                    }
                    if (allPlayers[i].seeCard.length > 0) {
                        for (var k = 0; k < allPlayers[i].seeCard.length; k++) {
                            allPlayers[i].seeCard[k].destroy();
                        }
                    }
                    // if(allPlayers[lststartIndex[i]].seeCard.length > 0){
                    //     for(var k = 0;k<allPlayers[lststartIndex[i]].seeCard.length;k++){
                    //         allPlayers[lststartIndex[i]].seeCard[k].destroy();
                    //     }
                    // }
                    // if(allPlayers[i].groupName != null){
                    //     allPlayers[i].groupName.destroy();
                    // }
                    allPlayers[i] = null;
                    defaultPlayer[i].visible = true;
                }
            }
            allPlayers.length = 0;
        }
        if (lststartIndex.length > 0) {
            for (var i = 0; i < lststartIndex.length; i++) {
                lststartIndex[i] = null;
            }
            lststartIndex.length = 0;
        }
    },
    DisablePlayerForSwitchTable: function () {
        for (var i = 0; i < allPlayers.length; i++) {
            if (allPlayers[i] != null) {
                this.DisablePlayer(allPlayers[i].playerId);
                this.HideTimer(allPlayers[i].playerId);
                this.EnableDisableSeeButton(false);
            }
        }
    },
    DestroyListStartIndex: function () {
        Debug.log("Enter into the Destroy Lst Start Index");
        isPlayerTimer = true;
        userIndex = -1;
        potAmount = 0;
        hasSeenCard = false;
        currentBlindAmount = 0;
        blindCount = 0;
        currentBetAmount = onlineServerEvent.GameAmount(gameType);
        this.UpdatePotAmount(0);
        if (allPlayers.length > 0) {
            for (var i = 0; i < allPlayers.length; i++) {
                if (allPlayers[i] != null) {
                    allPlayers[i].EnableDisableAllDecisionBase(false);
                    allPlayers[i].EnableDisablePackDecision(false);
                    allPlayers[i].EnableDisableDealerIcon(false);
                    allPlayers[i].EnableDisableGiftIcon(false);
                    allPlayers[i].EnableDisableCrownIcon(false);
                    allPlayers[i].EnableDisableGlow(false);
                    allPlayers[i].EnableDisableSmallCrownImage(false);
                    if (allPlayers[i].card.length > 0) {
                        for (var j = 0; j < allPlayers[i].card.length; j++) {
                            allPlayers[i].card[j].cardsprite.destroy();
                        }
                    }
                    if (allPlayers[i].seeCard.length > 0) {
                        for (var k = 0; k < allPlayers[i].seeCard.length; k++) {
                            allPlayers[i].seeCard[k].destroy();
                        }
                    }
                }
            }
        }
    },
    DestroyStartIndex: function () {
        if (lststartIndex.length > 0) {
            for (var i = 0; i < lststartIndex.length; i++) {
                lststartIndex[i] = null;
            }
            lststartIndex.length = 0;
        }
    },
    DisablePlayerCard: function (_playerId) {
        if (allPlayers.length > 0) {
            for (var i = 0; i < allPlayers.length; i++) {
                if (allPlayers[i] != null) {
                    if (allPlayers[i].playerId == _playerId) {
                        if (allPlayers[i].card.length > 0) {
                            for (var j = 0; j < allPlayers[i].card.length; j++) {
                                allPlayers[i].card[j].cardsprite.destroy();
                            }
                            allPlayers[i].card.length = 0;
                        }
                        if (allPlayers[i].seeCard.length > 0) {
                            for (var k = 0; k < allPlayers[i].seeCard.length; k++) {
                                allPlayers[i].seeCard[k].destroy();
                            }
                            allPlayers[i].seeCard.length = 0;
                        }
                        if (gameType == "Joker") {
                            if (jokercard != null) {
                                jokercard.visible = false;
                            }
                        }
                        // if(allPlayers[lststartIndex[i]].seeCard.length > 0){
                        //     for(var k = 0;k<allPlayers[lststartIndex[i]].seeCard.length;k++){
                        //         allPlayers[lststartIndex[i]].seeCard[k].destroy();
                        //     }
                        //     allPlayers[lststartIndex[i]].seeCard.length = 0;
                        // }
                    }
                }
            }
        }
    },
    //For Change the Turn Update the current Bet Amount
    ChangeTurn: function (_bootAmount, playerId, prev_command_type, running_player) {
        _back_button.inputEnabled = true;
        for (var i = 0; i < allPlayers.length; i++) {
            if (allPlayers[i] != null) {
                if (allPlayers[i].playerId == playerId) {
                    if (prev_command_type == "CHAAL") {
                        if (blindCount == 4) {
                            hasSeenCard = true;
                        }
                        if (!hasSeenCard) {
                            allPlayers[i].bootAmount = _bootAmount / 2;
                            this.UpdateCurrentBetAmount(_bootAmount / 2);
                        }
                        else {
                            allPlayers[i].bootAmount = _bootAmount;
                            this.UpdateCurrentBetAmount(_bootAmount);
                        }
                    }
                    else if (prev_command_type == "BLIND") {
                        if (hasSeenCard) {
                            console.log("The Previous Command Blind................................Boot Amount Double");
                            allPlayers[i].bootAmount = _bootAmount * 2;
                            this.UpdateCurrentBetAmount(_bootAmount * 2);
                        }
                        else {
                            allPlayers[i].bootAmount = _bootAmount;
                            this.UpdateCurrentBetAmount(_bootAmount);
                        }
                    }
                    this.ShowTimer(playerId);
                    if (playerId == user_id) {
                        SoundManager.PlayYourTurnSound();
                        this.EnableDisableAllButtonGroup(true);
                        togglePlusMinusButton = false;
                        if (currentBetAmount < chaal_limit) {
                            this.EnableDisableMinusButton(true);
                            this.EnableDisablePlusButton(true);
                        }
                        else {
                            this.EnableDisableMinusButton(false);
                            this.EnableDisablePlusButton(false);
                        }
                        if (blindCount == 4) {
                            blindCount++;
                            console.log("The Previous Command Chaal................................Boot Amount Double");
                            this.EnableDisableBlindButton(false);
                            this.EnableDisableChaalButton(true);
                            this.ShowCard(user_id);
                            if (prev_command_type == "CHAAL") {
                                Client.PlayerInputEmit("SEE", currentBetAmount / 2, user_id);
                            }
                            else {
                                Client.PlayerInputEmit("SEE", currentBetAmount, user_id);
                            }
                            if (prev_command_type == "CHAAL") {
                                hasSeenCard = true;
                            }
                            else {
                                //this.UpdateCurrentBetAmount(_bootAmount * 2);
                                hasSeenCard = true;
                            }
                        }
                        Debug.log("The Toggle Minus Button CLick..........." + togglePlusMinusButton + "Current Bet AMount..........." + currentBetAmount + "The Chal Limit.................." + chaal_limit + "The blindCount...." + blindCount);
                        if (!hasSeenCard) {
                            if (currentBetAmount < chaal_limit / 2) {
                                this.EnableDisableMinusButton(true);
                                this.EnableDisablePlusButton(true);
                            }
                            else {
                                this.EnableDisableMinusButton(false);
                                this.EnableDisablePlusButton(false);
                            }
                        }
                        if (blindCount == 4) {
                            if (currentBetAmount == chaal_limit) {
                                this.EnableDisableMinusButton(false);
                                this.EnableDisablePlusButton(false);
                            }
                        }
                        if (running_player == 2) {
                            this.EnableDisableShowButton(true);
                            this.EnableDisableSideShowButton(false);
                        }
                        else {
                            this.EnableDisableShowButton(false);
                            this.EnableDisableSideShowButton(true);
                        }
                    }
                    this.EnableDisableMinusButton(false);
                    if (running_player > 2) {
                        if (!hasSeenCard) {
                            _side_show_button.inputEnabled = false;
                            _side_show_button.alpha = 0.5;
                        }
                        else {
                            //this.EnableDisableSideShowButton(true);
                            _side_show_button.inputEnabled = true;
                            _side_show_button.alpha = 1;
                        }
                    }
                    // turnTimer = 0;
                    // isTurnTimerOn = false;
                }
            }
        }
    },
    //Update Current Bet Amount
    UpdateCurrentBetAmount: function (_currentBetAmount) {
        currentBetAmount = _currentBetAmount;
        _current_bet_amount_text.setText(_currentBetAmount);
    },

    //Set The Pot Amount & Timer For reflect
    SetPotAmount: function () {
        potAmount += numberofPlayer * currentBetAmount;
        _pot_amount.setText(potAmount);
        //this.UpdatePlayerInHandMoney(currentBetAmount,user_id);
    },
    SetPotAmountTimer: function () {
        setTimeout(this.SetPotAmount, 800);
    },


    //TipAmount Animation
    CurrentTipAmountAnimation: function (playerPosX, playerPosY) {
        var currentTipBase = Utils.SpriteSettingsControl(currentTipBase, playerPosX, playerPosY, 'text_showcase', "true", "true", 0.5, 0.5, 0.25, 0.25);
        var currentTipAmountBaseIcon = Utils.SpriteSettingsControl(currentTipAmountBaseIcon, playerPosX - 60, playerPosY, 'poker_chip', "true", "true", 0.5, 0.5, 0.25, 0.25);
        var currentTipAmountText = Utils.TextSettingsControl(currentTipAmountText, playerPosX - 10, playerPosY + 3, onlineServerEvent.GameAmount(gameType), "true", "false", 0.5, 0.5, 0.0, 0.0, "Arial", "bold", "#ffffff", "center", "18px");

        var baseTween = game.add.tween(currentTipBase).to({ x: _pot_amount_text_showcase.x, y: _pot_amount_text_showcase.y - 100 }, 700, Phaser.Easing.Linear.Out, true);
        var baseIconTween = game.add.tween(currentTipAmountBaseIcon).to({ x: _pot_amount_icon.x + 50, y: _pot_amount_icon.y - 100 }, 700, Phaser.Easing.Linear.Out, true);
        var textTween = game.add.tween(currentTipAmountText).to({ x: _pot_amount.x, y: _pot_amount.y - 100 }, 700, Phaser.Easing.Linear.Out, true);

        baseTween.onComplete.add(this.CompleteCurrentTipAnimation, this);
        setTimeout(() => {
            currentTipBase.visible = false;
            currentTipAmountBaseIcon.visible = false;
            currentTipAmountText.visible = false;
        }, 700);
    },
    CompleteCurrentTipAnimation: function () {
        this.EnableDisableCurrentTipAmount(false);
        tip_button.inputEnabled = true;
    },
    EnableDisableCurrentTipAmount: function (isShow) {
        // currentTipBase.visible = isShow;
        // currentTipAmountBaseIcon.visible = isShow;
        // currentTipAmountText.visible = isShow;
    },

    //Current Bet Amount Animation
    CurrentBetAmountAnimation: function (playerPosX, playerPosY, _currentBetAmount) {
        var currentBetAmountBase = Utils.SpriteSettingsControl(currentBetAmountBase, playerPosX, playerPosY, 'text_showcase', "true", "true", 0.5, 0.5, 0.25, 0.25);
        var currentBetAmountBaseIcon = Utils.SpriteSettingsControl(currentBetAmountBaseIcon, playerPosX - 60, playerPosY, 'poker_chip', "true", "true", 0.5, 0.5, 0.25, 0.25);
        //if(tipButtonCounter == 0){
        var currentBetAmountText = Utils.TextSettingsControl(currentBetAmountText, playerPosX - 10, playerPosY + 3, _currentBetAmount, "true", "false", 0.5, 0.5, 0.0, 0.0, "Arial", "bold", "#ffffff", "center", "18px");
        currentBetAmount = _currentBetAmount;
        //}
        // else{
        //     currentBetAmountText = Utils.TextSettingsControl(currentBetAmountText,playerPosX-10,playerPosY+3,onlineServerEvent.GameAmount(gameType),"true","false",0.5,0.5,0.0,0.0,"Arial","bold","#ffffff","center","18px");
        // }
        //if(tipButtonCounter == 0){
        var baseTween = game.add.tween(currentBetAmountBase).to({ x: _pot_amount_text_showcase.x, y: _pot_amount_text_showcase.y }, 700, Phaser.Easing.Linear.Out, true);
        var baseIconTween = game.add.tween(currentBetAmountBaseIcon).to({ x: _pot_amount_icon.x + 50, y: _pot_amount_icon.y }, 700, Phaser.Easing.Linear.Out, true);
        var textTween = game.add.tween(currentBetAmountText).to({ x: _pot_amount.x, y: _pot_amount.y }, 700, Phaser.Easing.Linear.Out, true);
        //}
        //else{
        //     var baseTween = game.add.tween(currentBetAmountBase).to({ x: _pot_amount_text_showcase.x, y: _pot_amount_text_showcase.y -100}, 700, Phaser.Easing.Linear.Out, true);
        //     var baseIconTween = game.add.tween(currentBetAmountBaseIcon).to({ x: _pot_amount_icon.x + 50, y: _pot_amount_icon.y -100}, 700, Phaser.Easing.Linear.Out, true);
        //     var textTween = game.add.tween(currentBetAmountText).to({ x: _pot_amount.x, y: _pot_amount.y -100}, 700, Phaser.Easing.Linear.Out, true);
        // }
        baseTween.onComplete.add(this.CompleteCurrentBetAmountCollection, this);
        _blind_button.inputEnabled = false;
        _chaal_button.inputEnabled = false;
        setTimeout(() => {
            currentBetAmountBaseIcon.visible = false;
            currentBetAmountBase.visible = false;
            currentBetAmountText.visible = false;
        }, 700);
    },

    CompleteCurrentBetAmountCollection: function () {
        this.EnableDisableCurrentBetAmount(false);
        _blind_button.inputEnabled = true;
        _chaal_button.inputEnabled = true;
        _pack_button.inputEnabled = true;
        if (_side_show_button) {
            _side_show_button.inputEnabled = true;
        }
        // if(_see_button){
        //     _see_button.inputEnabled = true;
        // }
        if (tip_button) {
            tip_button.inputEnabled = true;
        }
        if (_show_button) {
            _show_button.inputEnabled = true;
        }
    },
    EnableDisableCurrentBetAmount: function (isShow) {
        Debug.log("Current Bet amount within Enable Disable Current Bet Amount...." + currentBetAmount);
        // Debug.log("Current Pot amount ...."+potAmount);
        //if(tipButtonCounter == 0){
        // Debug.log("Current Pot amount afetr ...."+potAmount);

        //potAmount += parseInt(currentBetAmount,10);
        this.UpdatePotAmount(globalPotAmount);
        //this.UpdatePlayerInHandMoney(currentBetAmount,user_id);
        //}
        // currentBetAmountBaseIcon.visible = isShow;
        // currentBetAmountBase.visible = isShow;
        // currentBetAmountText.visible = isShow;
    },
    // TipButtonAnimation: function(playerPosX,playerPosY,_currentBetAmount) {
    //     currentBetAmountBase = Utils.SpriteSettingsControl(currentBetAmountBase,playerPosX,playerPosY,'text_showcase',"true","true",0.5,0.5,0.25,0.25);
    //     currentBetAmountBaseIcon = Utils.SpriteSettingsControl(currentBetAmountBaseIcon,playerPosX-60,playerPosY,'poker_chip',"true","true",0.5,0.5,0.25,0.25);
    //     if(tipButtonCounter == 0){
    //         currentBetAmountText = Utils.TextSettingsControl(currentBetAmountText,playerPosX-10,playerPosY+3,_currentBetAmount,"true","false",0.5,0.5,0.0,0.0,"Arial","bold","#ffffff","center","18px");
    //         currentBetAmount  = _currentBetAmount;
    //     }
    //     else{
    //         currentBetAmountText = Utils.TextSettingsControl(currentBetAmountText,playerPosX-10,playerPosY+3,onlineServerEvent.GameAmount(gameType),"true","false",0.5,0.5,0.0,0.0,"Arial","bold","#ffffff","center","18px");
    //     }
    //     if(tipButtonCounter == 0){
    //         var baseTween = game.add.tween(currentBetAmountBase).to({ x: _pot_amount_text_showcase.x, y: _pot_amount_text_showcase.y }, 700, Phaser.Easing.Linear.Out, true);
    //         var baseIconTween = game.add.tween(currentBetAmountBaseIcon).to({ x: _pot_amount_icon.x + 50, y: _pot_amount_icon.y }, 700, Phaser.Easing.Linear.Out, true);
    //         var textTween = game.add.tween(currentBetAmountText).to({ x: _pot_amount.x, y: _pot_amount.y }, 700, Phaser.Easing.Linear.Out, true);
    //     }
    //     else{
    //         var baseTween = game.add.tween(currentBetAmountBase).to({ x: _pot_amount_text_showcase.x, y: _pot_amount_text_showcase.y -100}, 700, Phaser.Easing.Linear.Out, true);
    //         var baseIconTween = game.add.tween(currentBetAmountBaseIcon).to({ x: _pot_amount_icon.x + 50, y: _pot_amount_icon.y -100}, 700, Phaser.Easing.Linear.Out, true);
    //         var textTween = game.add.tween(currentBetAmountText).to({ x: _pot_amount.x, y: _pot_amount.y -100}, 700, Phaser.Easing.Linear.Out, true);
    //     }
    //     baseTween.onComplete.add(this.CompleteCurrentBetAmountCollection, this);
    //     _blind_button.inputEnabled = false;
    //     _chaal_button.inputEnabled = false;
    // },



    //Mapping Card Number & Card Type
    CardType: function (cardType) {
        switch (cardType) {
            case "SPADE":
                return 0;
                break;
            case "CLUB":
                return 1;
                break;
            case "HEART":
                return 2;
                break;
            case "DIAMOND":
                return 3;
                break;
        }
    },
    CardNumber: function (cardNumber) {
        switch (cardNumber) {
            case "TWO":
                return 0;
                break;
            case "THREE":
                return 1;
                break;
            case "FOUR":
                return 2;
                break;
            case "FIVE":
                return 3;
                break;
            case "SIX":
                return 4;
                break;
            case "SEVEN":
                return 5;
                break;
            case "EIGHT":
                return 6;
                break;
            case "NINE":
                return 7;
                break;
            case "TEN":
                return 8;
                break;
            case "JACK":
                return 9;
                break;
            case "QUEEN":
                return 10;
                break;
            case "KING":
                return 11;
                break;
            case "ACE":
                return 12;
                break;
        }
    },

    //InfoButton
    InfoButtonClick: function () {
        isInfoPopUpClicked = true;
        // InfoPopUp.GenerateInfoPopUp(boot_amount,max_blind,chaal_limit,pot_limit);
        InfoPopUp.GenerateInfoPopUp(boot_amount, max_blind, chaal_limit, 2000.00);
        InfoPopUp.ShowInfoPopUp();
        console.log("The InfoPop Up Clicked....................." + isInfoPopUpClicked);
    },
    InfoButtonDownAnimation: function () {
        game.add.tween(_info_button.scale).to({ x: 0.65, y: 0.65 }, 100, Phaser.Easing.Linear.Out, true);
    },
    InfoButtonUpAnimation: function () {
        _info_button.inputEnabled = false;
        game.add.tween(_info_button.scale).to({ x: 0.7, y: 0.7 }, 100, Phaser.Easing.Linear.Out, true);
        setTimeout(() => {
            this.InfoButtonClick();
        }, 100);
        setTimeout(() => {
            _info_button.inputEnabled = true;
        }, 800);
    },

    //BackButton
    BackButtonClick: function () {
        MenuController.SetImageDimension();
        MenuController.ShowMenuControllerPopup();
    },
    BackBttnDownAnimation: function () {
        game.add.tween(_back_button.scale).to({ x: 0.65, y: 0.65 }, 100, Phaser.Easing.Linear.Out, true);
    },
    BackbttnUpAnimation: function () {
        _back_button.inputEnabled = false;
        game.add.tween(_back_button.scale).to({ x: 0.7, y: 0.7 }, 100, Phaser.Easing.Linear.Out, true);
        setTimeout(() => {
            this.BackButtonClick();
        }, 100);
        setTimeout(() => {
            _back_button.inputEnabled = true;
        }, 800);
    },

    //ChatButton
    ChatButtonClick: function () {
        Debug.log("Chat Button Click");
        ChatBox.ShowChatPopup();
        API.RetrieveChatList();
        isChatBoxOpen = true;
    },
    ChatBttnDownAnimation: function () {
        game.add.tween(_chat_button.scale).to({ x: 0.68, y: 0.68 }, 100, Phaser.Easing.Linear.Out, true);
    },
    ChatBttnUpAnimation: function () {
        _chat_button.inputEnabled = false;
        game.add.tween(_chat_button.scale).to({ x: 0.72, y: 0.72 }, 100, Phaser.Easing.Linear.Out, true);
        setTimeout(() => {
            this.ChatButtonClick();
        }, 100);
        setTimeout(() => {
            _chat_button.inputEnabled = true;
        }, 800);
    },

    //ChaalButton
    ChaalButtonClick: function () {
        Debug.log("Chaal Button Click Wallet Balance....." + this.GetPlayerInHandMoney() + "Player Boot Amount......." + this.GetPlayerBootAmount());
        if ((this.GetPlayerInHandMoney() <= 10) || (this.GetPlayerInHandMoney() <= currentBetAmount)) {
            PopUp.GenerateCommonPopup('You Have Not Enough Balance');
            setTimeout(() => {
                Client.LeaveRoomEmit(user_id);
            }, 2000);
            return;
        }
        else {
            for (var i = 0; i < allPlayers.length; i++) {
                if (allPlayers[i] != null) {
                    if (allPlayers[i].playerId == user_id) {
                        this.CurrentBetAmountAnimation(playerPosX[i], playerPosY[i], currentBetAmount);
                    }
                }
            }
            this.UpdatePlayerInHandMoney(currentBetAmount, user_id);
            Client.PlayerInputEmit("CHAAL", currentBetAmount, user_id);
        }
    },
    ChaalBttnDownAnimation: function () {
        Debug.log("Enter into the Chaal button Animation");
        game.add.tween(_chaal_button.scale).to({ x: 0.45, y: 0.45 }, 100, Phaser.Easing.Linear.Out, true);
    },
    ChaalBttnUpAnimation: function () {
        Debug.log("Enter into the Chaal button UP Animation");
        _chaal_button.inputEnabled = false;
        game.add.tween(_chaal_button.scale).to({ x: 0.5, y: 0.5 }, 100, Phaser.Easing.Linear.Out, true);
        setTimeout(() => {
            this.ChaalButtonClick();
        }, 100);
    },

    //PackButton
    PackButtonClick: function () {
        Debug.log("Pack Button Click");
        SoundManager.PlayPackSound();
        this.HideSeeButton();
        Client.GamePackEmit(currentBetAmount);
    },
    PackButtonDownAnimation: function () {
        game.add.tween(_pack_button.scale).to({ x: 0.45, y: 0.45 }, 100, Phaser.Easing.Linear.Out, true);
    },
    PackbuttonUpAnimation: function () {
        _pack_button.inputEnabled = false;
        game.add.tween(_pack_button.scale).to({ x: 0.5, y: 0.5 }, 100, Phaser.Easing.Linear.Out, true);
        setTimeout(() => {
            this.PackButtonClick();
        }, 100);
    },
    GamePack: function (_playerId) {
        for (var i = 0; i < allPlayers.length; i++) {
            if (allPlayers[i] != null) {
                if (allPlayers[i].playerId == _playerId) {
                    if (!isSideShow) {
                        this.DisablePlayerCard(_playerId);
                    }
                    else if (isSideShow) {
                        isSideShow = false;
                        setTimeout(() => {
                            this.DisablePlayerCard(_playerId);
                        }, 2000);
                    }
                    Debug.log("The Player Id......." + _playerId + "The User Id......." + user_id + "The Value of I........." + i);
                    if (user_id == _playerId) {
                        this.HideTimer(_playerId);
                        allPlayers[i].decisionTextValue = "PACK";
                        allPlayers[i].UpdateDecisionTextValue();
                        allPlayers[i].EnableDisablePackDecision(true);
                        allPlayers[i].EnableDisableGiftIcon(false);
                        this.EnableDisableAllButtonGroup(false);
                        //allPlayers[i] = null;
                        this.EnableDisableSeeButton(false);
                    }
                    else {
                        allPlayers[i].decisionTextValue = "PACK";
                        allPlayers[i].UpdateDecisionTextValue();
                        this.HideTimer(_playerId);
                        allPlayers[i].EnableDisablePackDecision(true);
                        allPlayers[i].EnableDisableGiftIcon(false);
                    }
                }
            }
        }
    },
    CheckingBalance: function () {

    },
    //BlindButton
    BlindButtonClick: function () {
        Debug.log("Blind Button Click" + currentBetAmount + "Wallet Balance.........." + this.GetPlayerInHandMoney());
        SoundManager.StopTimeEndNotification();
        if ((this.GetPlayerInHandMoney() <= 10) || (this.GetPlayerInHandMoney() <= currentBetAmount)) {
            PopUp.GenerateCommonPopup('You Have Not Enough Balance');
            setTimeout(() => {
                Client.LeaveRoomEmit(user_id);
            }, 2000);
            return;
        }
        else {
            blindCount++;
            Debug.log("The Current Blind Amount.........." + currentBetAmount + "The Blind Count.........." + blindCount);

            for (var i = 0; i < allPlayers.length; i++) {
                if (allPlayers[i] != null) {
                    if (allPlayers[i].playerId == user_id) {
                        this.CurrentBetAmountAnimation(playerPosX[i], playerPosY[i], currentBetAmount);
                    }
                }
            }
            this.UpdatePlayerInHandMoney(currentBetAmount, user_id);
            Client.PlayerInputEmit("BLIND", currentBetAmount, user_id);
        }
    },
    BlindBttnDownAnimation: function () {
        game.add.tween(_blind_button.scale).to({ x: 0.45, y: 0.45 }, 100, Phaser.Easing.Linear.Out, true);
    },
    BlindBttnUpAnimation: function () {
        _blind_button.inputEnabled = false;
        game.add.tween(_blind_button.scale).to({ x: 0.5, y: 0.5 }, 100, Phaser.Easing.Linear.Out, true);
        setTimeout(() => {
            this.BlindButtonClick();
        }, 100);
    },

    //ShowButton
    ShowButtonClick: function () {
        Debug.log("Show Button Click");
        if ((this.GetPlayerInHandMoney() <= 10) || (this.GetPlayerInHandMoney() <= currentBetAmount)) {
            PopUp.GenerateCommonPopup('You Have Not Enough Balance');
            setTimeout(() => {
                Client.LeaveRoomEmit(user_id);
            }, 2000);
            return;
        }
        else {
            for (var i = 0; i < allPlayers.length; i++) {
                if (allPlayers[i] != null) {
                    if (allPlayers[i].playerId == user_id) {
                        this.CurrentBetAmountAnimation(allPlayers[i].playerPosX, allPlayers[i].playerPosY, currentBetAmount);
                    }
                }
            }
            this.UpdatePlayerInHandMoney(currentBetAmount, user_id);
            Client.PlayerInputEmit("SHOW", currentBetAmount, user_id);
        }
    },
    ShowBttnDownAnimation: function () {
        game.add.tween(_show_button.scale).to({ x: 0.45, y: 0.45 }, 100, Phaser.Easing.Linear.Out, true);
    },
    ShowBttnUpAnimation: function () {
        _show_button.inputEnabled = false;
        game.add.tween(_show_button.scale).to({ x: 0.5, y: 0.5 }, 100, Phaser.Easing.Linear.Out, true);
        setTimeout(() => {
            this.ShowButtonClick();
        }, 100);
    },

    //SideShow
    SideShowButtonClick: function () {
        //tipButtonCounter = 0;
        _back_button.inputEnabled = false;
        Debug.log("Side Show Button Click");
        if ((this.GetPlayerInHandMoney() <= 10) || (this.GetPlayerInHandMoney() <= currentBetAmount)) {
            PopUp.GenerateCommonPopup('You Have Not Enough Balance');
            setTimeout(() => {
                Client.LeaveRoomEmit(user_id);
            }, 2000);
            return;
        }
        else {
            Client.SideShowEmit(currentBetAmount);
        }
    },
    SideShowBttnDownAnimation: function () {
        game.add.tween(_side_show_button.scale).to({ x: 0.45, y: 0.45 }, 100, Phaser.Easing.Linear.Out, true);
    },
    SideShowBttnUpAnimation: function () {
        _side_show_button.inputEnabled = false;
        game.add.tween(_side_show_button.scale).to({ x: 0.5, y: 0.5 }, 100, Phaser.Easing.Linear.Out, true);
        setTimeout(() => {
            this.SideShowButtonClick();
        }, 100);
    },
    //SeeButton
    SeeButtonClick: function () {
        Debug.log("See Button Click");
        this.ShowCard(user_id);
        if (numberofPlayer > 2) {
            _side_show_button.inputEnabled = true;
            _side_show_button.alpha = 1;
        }
        Client.PlayerInputEmit("SEE", currentBetAmount, user_id);
    },
    SeeBttnDownAnimation: function () {
        game.add.tween(_see_button.scale).to({ x: 0.45, y: 0.45 }, 100, Phaser.Easing.Linear.Out, true);
    },
    SeeBttnUpAnimation: function () {
        _see_button.inputEnabled = false;
        game.add.tween(_see_button.scale).to({ x: 0.5, y: 0.5 }, 100, Phaser.Easing.Linear.Out, true);
        setTimeout(() => {
            this.SeeButtonClick();
        }, 100);
    },
    SeeButtonRender: function () {
        if (isSeeButtonRender) {
            game.world.bringToTop(_see_button);
            game.world.bringToTop(_see_button_text);
        }
    },
    //Plus Button
    PlusButtonClick: function () {
        Debug.log("Plus Button Click........" + currentBetAmount);
        if (!togglePlusMinusButton) {
            if (currentBetAmount < chaal_limit) {
                currentBetAmount *= 2;
                this.UpdateCurrentBetAmount(currentBetAmount);
                togglePlusMinusButton = true;
                this.EnableDisablePlusButton(!togglePlusMinusButton);
                this.EnableDisableMinusButton(togglePlusMinusButton);
            }
            else {
                this.EnableDisablePlusButton(false);
            }
        }
    },
    PlusBttnDownAnimation: function () {
        game.add.tween(_plus_button.scale).to({ x: 0.65, y: 0.65 }, 100, Phaser.Easing.Linear.Out, true);
    },
    PlusBttnUpAnimation: function () {
        _plus_button.inputEnabled = false;
        game.add.tween(_plus_button.scale).to({ x: 0.7, y: 0.7 }, 100, Phaser.Easing.Linear.Out, true);
        setTimeout(() => {
            this.PlusButtonClick();
        }, 100);
    },
    //MinusButton
    MinusButtonClick: function () {
        Debug.log("Minus Button CLick" + currentBetAmount);
        if (togglePlusMinusButton) {
            // if(hasSeenCard){
            //     currentBetAmount /= 2;
            //     this.UpdateCurrentBetAmount(currentBetAmount);
            // }
            // else{
            currentBetAmount /= 2;
            this.UpdateCurrentBetAmount(currentBetAmount);
            //}
            togglePlusMinusButton = false;
            this.EnableDisablePlusButton(!togglePlusMinusButton);
            this.EnableDisableMinusButton(togglePlusMinusButton);
        }
    },
    MinusBttnDownAnimation: function () {
        game.add.tween(_minus_button.scale).to({ x: 0.65, y: 0.65 }, 100, Phaser.Easing.Linear.Out, true);
    },
    MinusBttnUpAnimation: function () {
        _minus_button.inputEnabled = false;
        game.add.tween(_minus_button.scale).to({ x: 0.7, y: 0.7 }, 100, Phaser.Easing.Linear.Out, true);
        setTimeout(() => {
            this.MinusButtonClick();
        }, 100);
    },

    TipButtonClick: function () {
        if (user_amount > tipLimit) {
            for (var i = 0; i < allPlayers.length; i++) {
                if (allPlayers[i] != null) {
                    if (allPlayers[i].playerId == user_id) {
                        this.CurrentTipAmountAnimation(playerPosX[i], playerPosY[i]);
                        Client.SendTipEmit(onlineServerEvent.GameAmount(gameType));
                    }
                }
            }
        }
        else {
            PopUp.GenerateCommonPopup('You have not enough Balance for tip');
        }
    },
    TipButtonDownAnimation: function () {
        //tipButtonCounter = 1;
        game.add.tween(tip_button.scale).to({ x: 0.65, y: 0.65 }, 100, Phaser.Easing.Linear.Out, true);
    },
    TipButtonUpAnimation: function () {
        //tipButtonCounter = 1;
        tip_button.inputEnabled = false;
        game.add.tween(tip_button.scale).to({ x: 0.7, y: 0.7 }, 100, Phaser.Easing.Linear.Out, true);
        setTimeout(() => {
            this.TipButtonClick();
        }, 100);
    },
    EnableDisableShowButton: function (isShow) {
        Debug.log("Enable Disable Show Button Click");
        _show_button.visible = isShow;
    },
    EnableDisableSideShowButton: function (isShow) {
        Debug.log("Enable Disable Show");
        _side_show_button.visible = isShow;
    },
    EnableDisableSeeButton: function (isShow) {
        Debug.log("Enable Disable See Button");
        if (_see_button != null) {
            isSeeButtonRender = isShow;
            _see_button.visible = isShow;
            _see_button_text.visible = isShow;
        }
    },
    EnableDisableChaalButton: function (isShow) {
        Debug.log("Enable Disable Chaal Button");
        _chaal_button.visible = isShow;
    },
    EnableDisableTipButton: function (isShow) {
        tip_button.visible = isShow;
    },
    EnableDisableBlindButton: function (isShow) {
        Debug.log("Enable Disable Blind Button");
        _blind_button.visible = isShow;
    },
    EnableDisableAllButtonGroup: function (isShow) {
        _online_player_button_group.visible = isShow;
        _current_bet_amount_text.visible = isShow;
        if (numberofPlayer == 2) {
            this.EnableDisableShowButton(true);
            this.EnableDisableSideShowButton(false);
        }
        else {
            //if(hasSeenCard){
            this.EnableDisableSideShowButton(true);
            this.EnableDisableShowButton(false);
            //}
            // else{

            // }
        }
        //this.EnableDisableSideShowButton(true);
    },
    EnableDisablePlusButton: function (isShow) {
        Debug.log("Enter into the Enable Disable Plus Button" + isShow);
        _plus_button.inputEnabled = isShow;
        if (!isShow) {
            _plus_button.tint = hoverColourCode;
        }
        else {
            _plus_button.tint = outColourCode;
        }
    },
    EnableDisableMinusButton: function (isShow) {
        Debug.log("Enter into the Enable Disable Minus Button" + isShow);
        _minus_button.inputEnabled = isShow;
        if (!isShow) {
            _minus_button.tint = hoverColourCode;
        }
        else {
            _minus_button.tint = outColourCode;
        }
    },
    //All Button Control
    ButtonSettingsControl: function (buttonObj, posX, posY, imageName, OnInputDownEvent, OnInputHoverEvent, OnInputOutEvent, OnInputUpEvent, isSetAnchor, isSetScale, anchorX, anchorY, scaleX, scaleY, referenceClass) {
        buttonObj = game.add.sprite(posX, posY, imageName);
        if (isSetAnchor == "true") {
            buttonObj.anchor.setTo(anchorX, anchorY);
        }
        if (isSetScale == "true") {
            buttonObj.scale.setTo(scaleX, scaleY);
        }
        buttonObj.inputEnabled = true;
        if (OnInputDownEvent != null)
            buttonObj.events.onInputDown.add(OnInputDownEvent, referenceClass);
        if (OnInputHoverEvent != null)
            buttonObj.events.onInputOver.add(OnInputHoverEvent, referenceClass);
        if (OnInputOutEvent != null)
            buttonObj.events.onInputOut.add(OnInputOutEvent, referenceClass);
        if (OnInputUpEvent != null)
            buttonObj.events.onInputUp.add(OnInputUpEvent, referenceClass);
        return buttonObj;
    },
    //All Sprite Control
    SpriteSettingsControl: function (spriteObj, posX, posY, imageName, isSetAnchor, isSetScale, anchorX, anchorY, scaleX, scaleY, isInputEnable) {
        spriteObj = game.add.sprite(posX, posY, imageName);
        if (isSetAnchor == "true") {
            spriteObj.anchor.setTo(anchorX, anchorY);
        }
        if (isSetScale == "true") {
            spriteObj.scale.setTo(scaleX, scaleY);
        }
        if (isInputEnable == "true")
            spriteObj.inputEnabled = true;
        return spriteObj;
    },
    //All Text Control
    TextSettingsControl: function (textObj, posX, posY, textName, isSetAnchor, isSetScale, anchorX, anchorY, scaleX, scaleY, fontName, fontStyle, fontColor, fontAlign, fontSize) {
        textObj = game.add.text(posX, posY, textName, { "font": fontStyle + " " + fontSize + " " + fontName, "fill": fontColor, "align": fontAlign });
        if (isSetAnchor == "true")
            textObj.anchor.setTo(anchorX, anchorY);
        if (isSetScale == "true")
            textObj.scale.setTo(scaleX, scaleY);
        return textObj;
    },
    //ScaleManager of All
    ScaleManager: function () {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
    },
    //Push All the Postion in Array
    PushAllArrayElement: function () {
        Debug.log("The Table X pOsition......." + _table.x + "   " + _table.y);

        playerPosX = [_table.x, _table.x - 320, _table.x - 440, _table.x - 290, _table.x + 290, _table.x + 440, _table.x + 320];
        playerPosY = [_table.y + 95, _table.y + 125, _table.y - 45, _table.y - 215, _table.y - 215, _table.y - 45, _table.y + 125];

        cardPosX = [playerPosX[0] - 20, playerPosX[1] + 90, playerPosX[2] + 110, playerPosX[3] + 90, playerPosX[4] - 130, playerPosX[5] - 140, playerPosX[6] - 110];
        cardPosY = [playerPosY[0] + 115, playerPosY[1] - 25, playerPosY[2] + 10, playerPosY[3] + 80, playerPosY[4] + 80, playerPosY[5] + 10, playerPosY[6] - 25];

        giftIconPosx = [playerPosX[0] - 75, playerPosX[1] - 65, playerPosX[2] - 65, playerPosX[3] - 65, playerPosX[4] - 65, playerPosX[5] - 65, playerPosX[6] - 65];
        giftIconPosY = [playerPosY[0], playerPosY[1], playerPosY[2], playerPosY[3], playerPosY[4], playerPosY[5], playerPosY[6]];

        namePosX = [playerPosX[0], playerPosX[1], playerPosX[2], playerPosX[3], playerPosX[4], playerPosX[5], playerPosX[6]];
        namePosY = [playerPosY[0] - 93, playerPosY[1] - 80, playerPosY[2] - 80, playerPosY[3] - 80, playerPosY[4] - 80, playerPosY[5] - 80, playerPosY[6] - 80];

        decisionImagePosX = [playerPosX[0], playerPosX[1], playerPosX[2], playerPosX[3], playerPosX[4], playerPosX[5], playerPosX[6]];
        decisionImagePosY = [playerPosY[0] + 38, playerPosY[1] + 38, playerPosY[2] + 38, playerPosY[3] + 38, playerPosY[4] + 38, playerPosY[5] + 38, playerPosY[6] + 38];

        decisionTextPosX = [playerPosX[0], playerPosX[1], playerPosX[2], playerPosX[3], playerPosX[4], playerPosX[5], playerPosX[6]];
        decisionTextPosY = [playerPosY[0] + 40, playerPosY[1] + 38, playerPosY[2] + 38, playerPosY[3] + 38, playerPosY[4] + 38, playerPosY[5] + 38, playerPosY[6] + 38];

        bootAmountBasePosX = [playerPosX[0] + 120, playerPosX[1] + 100, playerPosX[2] + 100, playerPosX[3] + 100, playerPosX[4] + 100, playerPosX[5] + 100, playerPosX[6] + 100];
        bootAmountBasePosY = [playerPosY[0] - 40, playerPosY[1] - 33, playerPosY[2] - 33, playerPosY[3] - 33, playerPosY[4] - 33, playerPosY[5] - 33, playerPosY[6] - 33];

        bootIconPosX = [playerPosX[0] + 60, playerPosX[1] + 50, playerPosX[2] + 50, playerPosX[3] + 50, playerPosX[4] + 50, playerPosX[5] + 50, playerPosX[6] + 50];
        bootIconPosY = [playerPosY[0] - 40, playerPosY[1] - 33, playerPosY[2] - 33, playerPosY[3] - 33, playerPosY[4] - 33, playerPosY[5] - 33, playerPosY[6] - 33];

        bootAmountTextPosX = [playerPosX[0] + 106, playerPosX[1] + 102, playerPosX[2] + 102, playerPosX[3] + 102, playerPosX[4] + 102, playerPosX[5] + 102, playerPosX[6] + 102];
        bootAmountTextPosY = [playerPosY[0] - 37, playerPosY[1] - 30, playerPosY[2] - 30, playerPosY[3] - 30, playerPosY[4] - 30, playerPosY[5] - 30, playerPosY[6] - 30];

        inHandMoneyBaseAmountPosX = [playerPosX[0], playerPosX[1], playerPosX[2], playerPosX[3], playerPosX[4], playerPosX[5], playerPosX[6]];
        inHandMoneyBaseAmountPosY = [playerPosY[0] + 113, playerPosY[1] + 70, playerPosY[2] + 70, playerPosY[3] + 70, playerPosY[4] + 70, playerPosY[5] + 70, playerPosY[6] + 70];

        inHandMoneyIconPosX = [playerPosX[0] - 80, playerPosX[1] - 70, playerPosX[2] - 70, playerPosX[3] - 70, playerPosX[4] - 70, playerPosX[5] - 70, playerPosX[6] - 70];
        inHandMoneyIconPosY = [playerPosY[0] + 113, playerPosY[1] + 70, playerPosY[2] + 70, playerPosY[3] + 70, playerPosY[4] + 70, playerPosY[5] + 70, playerPosY[6] + 70];

        inHandAmountPosX = [playerPosX[0], playerPosX[1], playerPosX[2], playerPosX[3], playerPosX[4], playerPosX[5], playerPosX[6]];
        inHandAmountPosY = [playerPosY[0] + 116, playerPosY[1] + 73, playerPosY[2] + 73, playerPosY[3] + 73, playerPosY[4] + 73, playerPosY[5] + 73, playerPosY[6] + 73];

        packBasePosX = [playerPosX[0], playerPosX[1], playerPosX[2], playerPosX[3], playerPosX[4], playerPosX[5], playerPosX[6]];
        packBasePosY = [playerPosY[0], playerPosY[1], playerPosY[2], playerPosY[3], playerPosY[4], playerPosY[5], playerPosY[6]];

        dealerIconPosX = [playerPosX[0] + 70, playerPosX[1] - 35, playerPosX[2] - 35, playerPosX[3] - 35, playerPosX[4] - 35, playerPosX[5] - 35, playerPosX[6] - 35];
        dealerIconPosY = [playerPosY[0] - 60, playerPosY[1] + 55, playerPosY[2] + 55, playerPosY[3] + 55, playerPosY[4] + 55, playerPosY[5] + 55, playerPosY[6] + 55];

        timerImagePosX = [playerPosX[0], playerPosX[1], playerPosX[2], playerPosX[3], playerPosX[4], playerPosX[5], playerPosX[6]];
        timerImagePosY = [playerPosY[0], playerPosY[1], playerPosY[2], playerPosY[3], playerPosY[4], playerPosY[5], playerPosY[6]];

        crownImagePosX = [_table.x, _table.x - 320, _table.x - 440, _table.x - 290, _table.x + 290, _table.x + 440, _table.x + 320];
        crownImagePosY = [_table.y, _table.y + 40, _table.y - 130, _table.y - 300, _table.y - 300, _table.y - 130, _table.y + 40];

        cardShowPosX = [playerPosX[0] + 120, playerPosX[1] + 90, playerPosX[2] + 90, playerPosX[3] + 90, playerPosX[4] + 90, playerPosX[5] + 90, playerPosX[6] + 90];
        cardShowPosY = [playerPosY[0] + 40, playerPosY[1] + 40, playerPosY[2] + 40, playerPosY[3] + 45, playerPosY[4] + 40, playerPosY[5] + 40, playerPosY[6] + 40];

        crownImageStayPosX = [playerPosX[0] - 75, playerPosX[1] - 65, playerPosX[2] - 65, playerPosX[3] - 65, playerPosX[4] - 65, playerPosX[5] - 65, playerPosX[6] - 65];
        crownImageStayPosY = [playerPosY[0] - 50, playerPosY[1] - 50, playerPosY[2] - 50, playerPosY[3] - 50, playerPosY[4] - 50, playerPosY[5] - 50, playerPosY[6] - 50];
    },
    //Input Received
    OnPlayerInputReceived: function (decisionType, playerId, _currentBetAmount, _potAmount, wallet_balance) {
        Debug.log("Enter into the On Player Input Received Function.........." + decisionType + "Player Id........" + playerId + "Current Bet AMount........." + _currentBetAmount + "The Pot Amount....." + _potAmount);
        globalPotAmount = _potAmount;
        for (var i = 0; i < allPlayers.length; i++) {
            if (allPlayers[i] != null) {
                if (allPlayers[i].playerId == playerId) {
                    if (playerId == user_id) {
                        switch (decisionType) {
                            case "BLIND":
                                this.HideTimer(playerId);
                                this.EnableDisableAllButtonGroup(false);
                                SoundManager.PlayChaalBlindSound();
                                Debug.log("Enter into the Blind Decision of Online Player........" + playerId);
                                break;
                            case "CHAAL":
                                this.HideTimer(playerId);
                                this.EnableDisableAllButtonGroup(false);
                                SoundManager.PlayChaalBlindSound();
                                break;
                            case "SEE":
                                // this.ShowCard(user_id);
                                this.EnableDisableBlindButton(false);
                                this.EnableDisableChaalButton(true);
                                this.EnableDisableSeeButton(false);
                                if (_currentBetAmount < chaal_limit) {
                                    currentBetAmount = _currentBetAmount * 2;
                                }
                                if (hasSeenCard && currentBetAmount == chaal_limit) {
                                    this.EnableDisableMinusButton(false);
                                    this.EnableDisablePlusButton(false);
                                }
                                this.UpdateCurrentBetAmount(currentBetAmount);
                                SoundManager.PlaySeeCardSound();
                                break;
                            case "SHOW":
                                this.HideTimer(playerId);
                                this.EnableDisableAllButtonGroup(false);
                                break;
                        }
                    }
                    else {
                        switch (decisionType) {
                            case "BLIND":
                                Debug.log("Enter into the Blind Decision of Remote Player........" + playerId);
                                allPlayers[i].decisionTextValue = "BLIND";
                                allPlayers[i].UpdateDecisionTextValue();
                                allPlayers[i].EnableDisableAllDecisionBase(true);
                                this.HideTimer(playerId);
                                //tipButtonCounter = 0;
                                this.CurrentBetAmountAnimation(playerPosX[i], playerPosY[i], _currentBetAmount);
                                break;
                            case "CHAAL":
                                allPlayers[i].decisionTextValue = "CHAAL";
                                allPlayers[i].UpdateDecisionTextValue();
                                this.HideTimer(playerId);
                                allPlayers[i].EnableDisableAllDecisionBase(true);
                                //tipButtonCounter = 0;
                                this.CurrentBetAmountAnimation(playerPosX[i], playerPosY[i], _currentBetAmount);
                                break;
                            case "SEE":
                                allPlayers[i].decisionTextValue = "SEEN";
                                allPlayers[i].UpdateDecisionTextValue();
                                allPlayers[i].EnableDisableAllDecisionBase(true);
                                break;
                            case "SHOW":
                                this.HideTimer(playerId);
                                //tipButtonCounter = 0;
                                this.CurrentBetAmountAnimation(allPlayers[i].playerPosX, allPlayers[i].playerPosY, currentBetAmount);
                                break;
                        }
                    }
                }
            }
        }
    },
    OnPlayerSendTips: function (playerId, _currentBetAmount, inhandMoney) {
        for (var i = 0; i < allPlayers.length; i++) {
            if (allPlayers[i] != null) {
                if (allPlayers[i].playerId == playerId) {
                    if (playerId == user_id) {
                        this.UpdatePlayerInHandMoney(_currentBetAmount, playerId);
                    }
                    else {
                        this.CurrentTipAmountAnimation(playerPosX[i], playerPosY[i]);
                        //tipButtonCounter = 1;
                    }
                }
            }
        }
    },
    SpriteMasking: function (imageName, positionX, positionY, diameter) {
        mask = game.add.graphics(positionX, positionY);
        mask.beginFill(0xffffff);
        mask.drawCircle(0, 1, diameter);
        imageName.mask = mask;
        return imageName;
    },
    CreateSeeButton: function () {
        isExitToLobbyClicked = false;
        _see_button = Utils.ButtonSettingsControl(_see_button, playerPosX[0], playerPosY[0] + 67, 'red_base', this.SeeButtonClick, this.SeeButtonHoverEffect, this.SeeButtonOutEffect, null, "true", "true", 0.5, 0.5, 0.3, 0.3, this);
        _see_button_text = Utils.TextSettingsControl(_see_button_text, playerPosX[0], playerPosY[0] + 65, 'SEE', "true", "true", 0.5, 0.5, 0.8, 0.8, "Arial", "bold", "#ffffff", "center", "22px");
    },
    HideSeeButton: function () {
        _see_button.visible = false;
        _see_button_text.visible = false;
    },

    SendGiftAnimation: function (receiver_id, sender_id, gift_id, sendToAll, updateBalance) {
        var giftId = gift_id;
        var giftReceiverPositionX = [];
        var giftReceiverPositionY = [];
        for (var i = 0; i < allPlayers.length; i++) {
            if (allPlayers[i] != null) {
                //if(sendToAll == "0"){
                if (allPlayers[i].playerId == sender_id) {
                    var giftSenderPosX = allPlayers[i].playerPosX;
                    var giftSenderPosY = allPlayers[i].playerPosY;
                    //senderGiftIcon = allPlayers[i].giftIcon;
                }
                // else{
                //     if(isSendToAll){
                //         giftReceiverPositionX = allPlayers[i].playerPosX;
                //         giftReceiverPositionY = allPlayers[i].playerPosY;
                //     }
                // }
                if (allPlayers[i].playerId == receiver_id) {
                    var giftReceiverPosX = allPlayers[i].playerPosX;
                    var giftReceiverPosY = allPlayers[i].playerPosY;
                    //receiverGiftIcon = allPlayers[i].giftIcon;
                }
                //}
                // else{
                //     if(sender_id != user_id){
                //         giftReceiverPositionX[i] = allPlayers[i].playerPosX;
                //         giftReceiverPositionY[i] = allPlayers[i].playerPosY;
                //     }
                // }

            }
        }
        if (user_id == sender_id) {
            this.SetPlayerInHandMoney(updateBalance, user_id);
            Debug.log("The Sender Id Position..........." + giftReceiverPosX + "..." + giftReceiverPosY + "..." + giftSenderPosX + "..." + giftSenderPosY);
            if (sendToAll == "0") {
                var sendGiftIconBase = Utils.SpriteSettingsControl(sendGiftIconBase, giftSenderPosX, giftSenderPosY, 'gift_' + gift_id, "true", "true", 0.5, 0.5, 0.25, 0.25);
                var sendGiftIconTween = game.add.tween(sendGiftIconBase).to({ x: giftReceiverPosX, y: giftReceiverPosY }, 700, Phaser.Easing.Linear.Out, true);
                setTimeout(this.CompleteCurrentSenderGiftAnimation, 700, giftId, giftReceiverPosX, giftReceiverPosY, sendGiftIconBase);
            }
            else {
                for (var i = 0; i < allPlayers.length; i++) {
                    if (allPlayers[i] != null) {
                        if (allPlayers[i].playerId != sender_id) {
                            var sendGiftIconBase = Utils.SpriteSettingsControl(sendGiftIconBase, giftSenderPosX, giftSenderPosY, 'gift_' + gift_id, "true", "true", 0.5, 0.5, 0.25, 0.25);
                            var sendGiftIconTween = game.add.tween(sendGiftIconBase).to({ x: allPlayers[i].playerPosX, y: allPlayers[i].playerPosY }, 700, Phaser.Easing.Linear.Out, true);
                            setTimeout(this.CompleteCurrentSenderGiftAnimation, 700, giftId, allPlayers[i].playerPosX, allPlayers[i].playerPosY, sendGiftIconBase);
                        }
                    }
                }
            }
        }
        else {
            Debug.log("The Receiver Id Position..........." + giftReceiverPosX + "..." + giftReceiverPosY + "..." + giftSenderPosX + "..." + giftSenderPosY);
            if (sendToAll == "0") {
                var receiverGiftIconBase = Utils.SpriteSettingsControl(receiverGiftIconBase, giftSenderPosX, giftSenderPosY, 'gift_' + gift_id, "true", "true", 0.5, 0.5, 0.25, 0.25);
                var receiverGiftIconTween = game.add.tween(receiverGiftIconBase).to({ x: giftReceiverPosX, y: giftReceiverPosY }, 700, Phaser.Easing.Linear.Out, true);
                setTimeout(this.CompleteCurrentReceiverGiftAnimation, 700, giftId, giftReceiverPosX, giftReceiverPosY, receiverGiftIconBase);
            }
            else {
                for (var i = 0; i < allPlayers.length; i++) {
                    if (allPlayers[i] != null) {
                        if (allPlayers[i].playerId != sender_id) {
                            var receiverGiftIconBase = Utils.SpriteSettingsControl(receiverGiftIconBase, giftSenderPosX, giftSenderPosY, 'gift_' + gift_id, "true", "true", 0.5, 0.5, 0.25, 0.25);
                            var receiverGiftIconTween = game.add.tween(receiverGiftIconBase).to({ x: allPlayers[i].playerPosX, y: allPlayers[i].playerPosY }, 700, Phaser.Easing.Linear.Out, true);
                            setTimeout(this.CompleteCurrentReceiverGiftAnimation, 700, giftId, allPlayers[i].playerPosX, allPlayers[i].playerPosY, receiverGiftIconBase);
                        }
                    }
                }
            }
        }
        setTimeout(this.GiftIconChange, 3000, receiver_id, giftId, sendToAll, sender_id);
    },
    GiftIconChange: function (receiver_id, gift_id, send_to_all, sender_id) {
        for (var i = 0; i < allPlayers.length; i++) {
            if (allPlayers[i] != null) {
                if (send_to_all == "0") {
                    if (allPlayers[i].playerId == receiver_id) {
                        allPlayers[i].giftIcon.loadTexture('gift_' + gift_id);
                        allPlayers[i].giftIcon.scale.setTo(0.25, 0.25);
                        allPlayers[i].giftIcon.inputEnabled = true;
                    }
                }
                else {
                    if (allPlayers[i].playerId != sender_id) {
                        allPlayers[i].giftIcon.loadTexture('gift_' + gift_id);
                        allPlayers[i].giftIcon.scale.setTo(0.25, 0.25);
                        allPlayers[i].giftIcon.inputEnabled = true;
                    }
                }
            }
        }
    },

    CompleteCurrentSenderGiftAnimation: function (gift_id, giftReceiverPositionX, giftReceiverPositionY, giftIconBase) {
        giftIconBase.visible = false;
        var senderGiftSpriteSheet = game.add.sprite(giftReceiverPositionX, giftReceiverPositionY, 'gift_spritesheet_' + gift_id);
        senderGiftSpriteSheet.anchor.setTo(0.5, 0.5);
        senderGiftSpriteSheet.scale.setTo(0.5, 0.5);
        var anim = senderGiftSpriteSheet.animations.add('anim');
        senderGiftSpriteSheet.animations.play('anim', 5, false);
        SoundManager.PlayGiftSound(gift_id);
        //setTimeout(this.SenderGiftAnimationComplete,5,senderGiftSpriteSheet);
        //anim.onComplete.add(this.SenderGiftAnimationComplete, this,senderGiftSpriteSheet);
        anim.onComplete.add(function () { setTimeout(senderGiftSpriteSheet.destroy(), 100) }, this);
    },

    CompleteCurrentReceiverGiftAnimation: function (gift_id, giftReceiverPositionX, giftReceiverPositionY, giftIconBase) {
        giftIconBase.visible = false;
        var receieverGiftSpriteSheet = game.add.sprite(giftReceiverPositionX, giftReceiverPositionY, 'gift_spritesheet_' + gift_id);
        receieverGiftSpriteSheet.anchor.setTo(0.5, 0.5);
        receieverGiftSpriteSheet.scale.setTo(0.5, 0.5);
        var anim = receieverGiftSpriteSheet.animations.add('anim');
        receieverGiftSpriteSheet.animations.play('anim', 5, false);
        SoundManager.PlayGiftSound(gift_id);
        //setTimeout(this.ReceiverGiftAnimationComplete,5,receieverGiftSpriteSheet);
        //anim.onComplete.add(this.ReceiverGiftAnimationComplete, this,receieverGiftSpriteSheet);
        anim.onComplete.add(function () { setTimeout(receieverGiftSpriteSheet.destroy(), 100) }, this);
    },
    SenderGiftAnimationComplete: function (spriteSheet) {
        console.log("Enter the Sender Gift Animation Complete");
        setTimeout(spriteSheet.destroy(), 100);
    },
    ReceiverGiftAnimationComplete: function (spriteSheet) {
        console.log("Enter the Receiver Gift Animation Complete");
        setTimeout(spriteSheet.destroy(), 100);
    },
    ShowDealerMessage: function (message) {
        if (_dealerMessageBase != null) {
            _dealerMessageBase.destroy();
        }
        if (dealerMessageText != null) {
            dealerMessageText.destroy();
        }
        _dealerMessageBase = Utils.SpriteSettingsControl(_dealerMessageBase, _table.x + 135, _table.y - 360, 'text_showcase', "true", "true", 0.5, 0.5, 0.4, 0.4);
        dealerMessageText = Utils.TextSettingsControl(dealerMessageText, _table.x + 135, _table.y - 360, message, "true", "true", 0.5, 0.5, 0.8, 0.8, "Arial", "bold", "#ffffff", "center", "22px");
        setTimeout(this.DealerMessageAnimation, 2000);
    },
    UpdateDealerMessage: function (message) {
        if (_dealerMessageBase != null) {
            this.ShowMessage();
            dealerMessageText.setText(message);
            setTimeout(this.DealerMessageAnimation, 2000);
        }
    },
    DealerMessageAnimation: function () {
        if (_dealerMessageBase != null) {
            _dealerMessageBase.visible = false;
            dealerMessageText.visible = false;
        }
    },
    ShowMessage: function () {
        if (_dealerMessageBase != null) {
            _dealerMessageBase.visible = true;
            dealerMessageText.visible = true;
        }
    },
    SideShowGlow: function (index, isShow) {
        for (var i = 0; i < allPlayers.length; i++) {
            if (allPlayers[i] != null) {
                if (allPlayers[i].playerId == index) {
                    allPlayers[i].EnableDisableGlow(isShow);
                }
            }
        }
    },
    SideShowPopUp: function (data) {
        console.log("The status of Data.........." + data.status);
        if (data.status == 0) {
            for (var i = 0; i < allPlayers.length; i++) {
                if (allPlayers[i] != null) {
                    if (allPlayers[i].playerId == data.result.sender_id) {
                        if (data.result.sender_id == user_id) {
                            _side_show_button.inputEnabled = true;
                            PopUp.GenerateCommonPopup('Till Now Opponent Not Seen The Card');
                        }
                    }
                }
            }
        }
        else if (data.status == 1) {
            for (var i = 0; i < allPlayers.length; i++) {
                if (allPlayers[i] != null) {
                    if (allPlayers[i].playerId == data.result.receiver_id) {
                        if (data.result.receiver_id == user_id) {
                            sendSideShowPlayerID = data.result.sender_id;
                            SideShowPopUp.ShowSideShowPopUp();
                            // turnTimer = data.result.remaining_time;
                            // isTurnTimerOn = true;
                            console.log("Enter into the If Condition...................." + currentBetAmount);
                        }
                    }
                }
            }
            for (var i = 0; i < allPlayers.length; i++) {
                if (allPlayers[i] != null) {
                    if (allPlayers[i].playerId == data.result.sender_id) {
                        if (data.result.sender_id == user_id) {
                            this.HideTimer(data.result.sender_id);
                            this.EnableDisableAllButtonGroup(false);
                            globalPotAmount = data.result.pot_amount;
                            this.CurrentBetAmountAnimation(allPlayers[i].playerPosX, allPlayers[i].playerPosY, currentBetAmount);
                            this.UpdatePlayerInHandMoney(currentBetAmount, user_id);
                        }
                        else {
                            this.HideTimer(data.result.sender_id);
                            globalPotAmount = data.result.pot_amount;
                            this.CurrentBetAmountAnimation(playerPosX[i], playerPosY[i], currentBetAmount);
                        }
                    }
                }
            }
            this.SideShowGlow(data.result.sender_id, true);
            this.SideShowGlow(data.result.receiver_id, true);
        }
        else if (data.status == 5) {
            // console.log("The AllPlayers Length............."+allPlayers.length + "Send_id....."+sender_id+"User _id......."+user_id);
            for (var i = 0; i < allPlayers.length; i++) {
                if (allPlayers[i] != null) {
                    if (allPlayers[i].playerId == data.result.sender_id) {
                        if (data.result.sender_id == user_id) {
                            this.HideTimer(data.result.sender_id);
                            globalPotAmount = data.result.pot_amount;
                            // console.log("Enter into the Current Bet Amount Animation If Part");
                            this.CurrentBetAmountAnimation(allPlayers[i].playerPosX, allPlayers[i].playerPosY, currentBetAmount);
                            this.UpdatePlayerInHandMoney(currentBetAmount, user_id);
                        }
                        else {
                            this.HideTimer(data.result.sender_id);
                            globalPotAmount = data.result.pot_amount;
                            // console.log("Enter into the Current Bet Amount Animation Else Part");
                            this.CurrentBetAmountAnimation(playerPosX[i], playerPosY[i], currentBetAmount);
                        }
                    }
                }
            }
        }
    },

    SideShowRejectResponse: function (data) {
        _back_button.inputEnabled = true;
        for (var i = 0; i < allPlayers.length; i++) {
            if (allPlayers[i] != null) {
                if (allPlayers[i].playerId == data.result.receiver_id) {
                    if (data.result.receiver_id == user_id) {
                        Debug.log("The Side Show Reject Response..........." + sendSideShowPlayerID);
                        PopUp.GenerateCommonPopup(data.result.sender_name + ' does not want to Side Show');
                        // allPlayers[i].EnableDisableGlow(data.result.receiver_id);
                    }
                    if (data.result.sender_id == user_id) {
                        SideShowPopUp.HideSideShowPopUp();
                    }
                }
            }
        }
    },

    GenerateBubble: function () {
        for (var i = 0; i < 15; i++) {
            var randomY = Math.random() * 720 + 0;
            var randomX = Math.random() * 1280 + 0;
            bubble = game.add.sprite(randomX + (i * 100), randomY + (i * 100), 'circle');
            bubble.anchor.set(0.5, 0.5);
            var randomValue = Math.random(0.5, 0.8);
            bubble.scale.set(randomValue, randomValue);
            bubble.tint = "0xff38b6";
            bubbleArray.push(bubble);
        }
        Debug.log("Length of bubble array...." + bubbleArray.length);
        this.Movebubble();
        game.time.events.loop(50000, this.Movebubble, this);
    },

    Movebubble: function () {
        for (var i = 0; i < bubbleArray.length; i++) {
            var randomY = Math.random() * 1120 - 400;
            var randomX = Math.random() * 1680 - 400;
            var tween = game.add.tween(bubbleArray[i].position).to({ x: randomX, y: randomY }, 25000, Phaser.Easing.Linear.Out, true);
            tween.onComplete.add(this.ReturnBubble, this);
        }
    },

    ReturnBubble: function () {
        for (var i = 0; i < bubbleArray.length; i++) {
            var randomY = Math.random() * 1120 - 400;
            var randomX = Math.random() * 1680 - 400;
            var tween = game.add.tween(bubbleArray[i].position).to({ x: randomX, y: randomY }, 25000, Phaser.Easing.Linear.Out, true);
        }
    },
    CreateOwnMessageTemplate: function (player_id, message) {
        for (var i = 0; i < allPlayers.length; i++) {
            if (allPlayers[i] != null) {
                if (allPlayers[i].playerId == player_id) {
                    if (user_id == player_id) {
                        var ownMessageGroup = game.add.group();
                        var ownMessageBox = Utils.SpriteSettingsControl(ownMessageBox, playerPosX[i], playerPosY[i] - 110, 'text_showcase', "true", "true", 0.5, 0.5, 0.45, 0.5);
                        var ownMessageBoxTxt = Utils.TextSettingsControl(ownMessageBoxTxt, playerPosX[i], playerPosY[i] - 110, message, "true", "false", 0.5, 0.5, 0.0, 0.0, "Arial", "bold", "#ffffff", "center", "25px");
                        ownMessageGroup.add(ownMessageBox);
                        ownMessageGroup.add(ownMessageBoxTxt);
                        setTimeout(this.SetTimeOutDelayOfDisableOwnMessageTemplate, 2000, ownMessageGroup);
                    }
                    else {
                        var ownMessageGroup = game.add.group();
                        var ownMessageBox = Utils.SpriteSettingsControl(ownMessageBox, playerPosX[i] + 80, playerPosY[i] - 100, 'text_showcase', "true", "true", 0.5, 0.5, 0.45, 0.5);
                        var ownMessageBoxTxt = Utils.TextSettingsControl(ownMessageBoxTxt, playerPosX[i] + 80, playerPosY[i] - 100, message, "true", "false", 0.5, 0.5, 0., 0.0, "Arial", "bold", "#ffffff", "center", "25px");
                        ownMessageGroup.add(ownMessageBox);
                        ownMessageGroup.add(ownMessageBoxTxt);
                        setTimeout(this.SetTimeOutDelayOfDisableOwnMessageTemplate, 2000, ownMessageGroup);
                    }
                }

            }
        }
    },
    SetTimeOutDelayOfDisableOwnMessageTemplate: function (messageGroup) {
        Debug.log("Enter into The Set Time Out Disable Own Message Destroy");
        messageGroup.destroy();
    },
    GiftIconTopRenderer: function () {
        for (var i = 0; i < allPlayers.length; i++) {
            if (allPlayers[i] != null) {
                allPlayers[i].ShowGiftIconToTop();
            }
        }
    },
    DealerIconTopRenderer: function () {
        for (var i = 0; i < allPlayers.length; i++) {
            if (allPlayers[i] != null) {
                allPlayers[i].ShowDealerIcon();
            }
        }
    },
    InHandMoneyTopRenderer: function () {
        for (var i = 0; i < allPlayers.length; i++) {
            if (allPlayers[i] != null) {
                allPlayers[i].InhandMoneyToTop();
            }
        }
    },
    ShowGiftIcon: function () {
        for (var i = 0; i < allPlayers.length; i++) {
            if (allPlayers[i] != null) {
                if (allPlayers[i].playerId == user_id) {
                    allPlayers[i].EnableDisableGiftIcon(false);
                }
                else {
                    allPlayers[i].EnableDisableGiftIcon(true);
                }
            }
        }
    },

    SinglePersonLeaveRoom: function (player_id) {
        Debug.log("Enter into the Single Person Leave Room.............");
        for (var i = 0; i < allPlayers.length; i++) {
            if (allPlayers[i] != null) {
                if (allPlayers[i].playerId == player_id) {
                    Debug.log("Index............." + i);
                    // if(allPlayers[i].groupName != null){
                    //     allPlayers[i].groupName.visible = false;
                    // }
                    defaultPlayer[i] = null;
                    //lststartIndex[i] = null;
                    lststartIndex.splice(lststartIndex.indexOf(i), 1);
                    // lststartIndex = lststartIndex.filter(function(element) {
                    //     return element !== null;
                    // });
                    allPlayers[i] = null;
                    console.log("The Length of Lst Start Index Within Single Person Leave Room.........." + lststartIndex.length);
                    this.CreateDefaultPlayerSprite();
                }
            }
        }
        console.log("The all players array Length..............." + allPlayers.length);
        // if(lststartIndex.length == 1){
        //     Utils.CreateBonusTimer(lststartIndex.length);
        // }
    },

    CreateDefaultPlayerSprite: function () {
        if (gamePage == "GameplayPage") {
            for (var i = 0; i < 7; i++) {
                if (defaultPlayer[i] == null) {
                    Debug.log("Enter into the Create Default Player Sprite");
                    if (i <= 3) {
                        var createDefault = Utils.SpriteSettingsControl(createDefault, playerPosX[i], playerPosY[i], 'defaultPlayer', "true", "true", 0.5, 0.5, -0.15, 0.15);
                    }
                    else {
                        var createDefault = Utils.SpriteSettingsControl(createDefault, playerPosX[i], playerPosY[i], 'defaultPlayer', "true", "true", 0.5, 0.5, 0.15, 0.15);
                    }
                    defaultPlayer[i] = createDefault;
                }
            }
        }
    },
    DestroyDeafultPlayerSprite: function () {
        for (var i = 0; i < defaultPlayer.length; i++) {
            defaultPlayer[i].destroy();
            defaultPlayer[i] = null;
        }
        defaultPlayer.length = 0;
    },
    ShowWinnigText: function () {
        if (globalPotAmount >= pot_limit) {
            winText = Utils.TextSettingsControl(winText, 640.0, 680.0, "Pot amount reached. Winner declared", "true", "true", 0.5, 0.5, 0.0, 0.0, "Arial", "bold", "#ffffff", "center", "45px");
        }
        else {
            winText = Utils.TextSettingsControl(winText, 640.0, 680.0, "Winner declared", "true", "true", 0.5, 0.5, 0.0, 0.0, "Arial", "bold", "#ffffff", "center", "45px");
        }
        winText.alpha = 0.1;
        game.add.tween(winText.scale).to({ x: 1.0, y: 1.0 }, 1000, Phaser.Easing.Linear.Out, true);

        game.add.tween(winText).to({ alpha: 1 }, 2000, "Linear", true);
        setTimeout(() => {
            game.add.tween(winText.scale).to({ x: 0.0, y: 0.0 }, 1000, Phaser.Easing.Linear.Out, true);
            game.add.tween(winText).to({ alpha: 0.1 }, 2000, "Linear", true);
        }, 2000);
        setTimeout(() => {
            game.add.tween(winText.scale).to({ x: 1.0, y: 1.0 }, 1000, Phaser.Easing.Linear.Out, true);
            game.add.tween(winText).to({ alpha: 1.0 }, 2000, "Linear", true);
        }, 3000);
    },
    // SideShowTimer: function(){
    //     game.time.events.loop(1000, this.SideShowUpdateTimer, this);
    // },
    // SideShowUpdateTimer: function(){
    //     if(isTurnTimerOn & turnTimer > 0){
    //         turnTimer--;
    //         console.log("The Turn Timer Count"+turnTimer + "The isTurnTimerOn Status........"+isTurnTimerOn);
    //         if(turnTimer == 0){
    //             isTurnTimerOn = false;
    //             Client.SideShowDecisionResponseEmit("REJECT",currentBetAmount,sendSideShowPlayerID); 
    //         }
    //     }
    // },
    DummyCard: function () {
        for (var i = 0; i < 7; i++) {

            var crownImage = Utils.SpriteSettingsControl(crownImage, dealerIconPosX[i], dealerIconPosY[i], 'delaer_icon', "true", "true", 0.5, 0.5, 0.45, 0.45);

            var crownImage1 = Utils.SpriteSettingsControl(crownImage1, giftIconPosx[i], giftIconPosY[i], 'gift_icon', "true", "true", 0.5, 0.5, 0.65, 0.65);

            var crownImage2 = Utils.SpriteSettingsControl(crownImage2, crownImageStayPosX[i], crownImageStayPosY[i], 'smallCrownImage', "true", "true", 0.5, 0.5, 0.4, 0.4);


            var crownImage3 = Utils.SpriteSettingsControl(crownImage3, crownImagePosX[i], crownImagePosY[i], 'crown_image', "true", "true", 0.5, 0.5, 0.8, 0.8);

            for (var j = 0; j < 3; j++) {
                allCardSprite = Utils.SpriteSettingsControl(allCardSprite, cardShowPosX[i] - (j * 20), cardShowPosY[i], 'card', "true", "true", 0.0, 1.0, 1.3, 1.3);
            }

        }
    },
    DeactivateAllCrown: function () {
        for (var i = 0; i < allPlayers.length; i++) {
            if (allPlayers[i] != null) {
                // allPlayers[i].isDead = false;
                allPlayers[i].EnableDisableSmallCrownImage(false);
            }
        }
    },

    SetBootAmountAnimation: function () {
        for (var i = 0; i < allPlayers.length; i++) {
            if (allPlayers[i] != null) {
                allPlayers[i].SetAllPlayerBootAmountPosition(
                    bootAmountBasePosX[i], bootAmountBasePosY[i],
                    bootIconPosX[i], bootIconPosY[i],
                    bootAmountTextPosX[i], bootAmountTextPosY[i]
                );
            }
        }
    },

    FindActivePlayer: function (data) {
        console.log("The data of Find Active Player........................." + data.result.cardlist.length);
        if (activePlayerIndexArray.length > 0) {
            console.log("ActivePlayer Length...." + activePlayerIndexArray.length);
        }
        for (var i = 0; i < data.result.cardlist.length; i++) {
            //for (var j = (data.result.cardlist[i].cards_details.length - 1); j >= 0; j--) {  
            for (var k = 0; k < allPlayers.length; k++) {
                if (allPlayers[k] != null) {

                    if (data.result.cardlist[i].user_id == allPlayers[k].playerId) {
                        activePlayerIndexArray.push(k);
                    }
                }
            }
            //}
        }
        //Testing
        for (var i = 0; i < activePlayerIndexArray.length; i++) {
            console.log("Active Player................." + activePlayerIndexArray[i]);
        }
        //Utils.SpawnCardAnimation();
        Utils.ShowAllBootAmountAnimation(numberofPlayer);
    },
    DestroyActivePlayerIndexArray: function () {
        if (activePlayerIndexArray.length > 0) {
            for (var i = 0; i < activePlayerIndexArray.length; i++) {
                activePlayerIndexArray[i] = null;
            }
            activePlayerIndexArray.length = 0;
        }
    },
    CreateBonusTimer: function (numberofPlayer) {
        console.log("The Number of Player.................." + numberofPlayer);
        if (numberofPlayer == 1) {
            bonusTimerLoopEvent = game.time.events.loop(60000, this.AddBonus, this);
            game.time.events.start();
        }
    },
    AddBonus: function () {
        //console.log("The allplayers Length............."+allPlayers.length+"The use id............."+user_id+"The player_id......."+allPlayers[0].playerId);
        for (var i = 0; i < allPlayers.length; i++) {
            if (allPlayers[i] != null) {
                if (user_id == allPlayers[i].playerId) {
                    var onlineUserGroup = allPlayers[i].onlineUser;
                    var onlineCircle = allPlayers[i].playerOnlineRing;
                    console.log("Enter into the Add bonus Update Section...........");
                    var money = parseInt(allPlayers[i].playerInhandMoney);
                    money += 5.00;
                    allPlayers[i].UpdatePlayerInHandMoney(money);
                    Client.GameWaitingBonus(5);
                    SoundManager.PlayBonusCoinCollectSound();
                    var tweenComplete = game.add.tween(onlineUserGroup.scale).to({ x: 0.6, y: 0.6 }, 700, Phaser.Easing.Linear.Out, true);
                    game.add.tween(onlineCircle.scale).to({ x: 0.55, y: 0.55 }, 700, Phaser.Easing.Linear.Out, true);
                    tweenComplete.onComplete.add(function () {
                        game.add.tween(onlineUserGroup.scale).to({ x: 0.5, y: 0.5 }, 700, Phaser.Easing.Linear.Out, true);
                        game.add.tween(onlineCircle.scale).to({ x: 0.5, y: 0.5 }, 700, Phaser.Easing.Linear.Out, true);
                    }, this);
                }
            }
        }
    }
};