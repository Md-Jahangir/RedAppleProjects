var createUserData = "";
var gameStartData = "";
var nextRoundText = "";
var gameStatus = "";
var nextRoundBg = "";
var joinType = "";
var bonusTimerLoopEvent = "";
var first_room = 0;
var onlineServerEvent = {

    FireOnConnectionSuccessEvent: function(){
        Debug.log("Enter the connection succcess event......GameType......"+gameType + "Amount......"+this.GameAmount(gameType));
        Client.GameRequestEmit(this.GameAmount(gameType));
    },
    FireOnConnectionFailedEvent: function(){  
        Debug.log("Enter the connection failed event");
    },
    FireOnJoinedRoomSuccessEvent: function(data){
        console.log("Enter into the joined Room success Event............."+data);
        console.log("Enter into the connected room...............................................");
        createUserData = data;
        joinType = "createUser";
        setTimeout(this.CreateUserTimeDelay,3500);
        setTimeout(this.CreateInfoPopUpDelay,3800);
        // if(data.result.gamestatus == "wait_for_next_round"){
        //     Debug.log("Enter into the Wait For Next Round Status.......");
        //     gameStatus = "Waiting";
        //     setTimeout(this.CreateUserTimeDelay,3000);
        //     // setTimeout(() => {
        //     //     potAmount = data.result.pot_amount;
        //     //     Utils.UpdatePotAmount(data.result.pot_amount);
        //     // }, 3400);
        //     // setTimeout(() => {
        //     //     Utils.StoreCardData(data);
        //     // }, 3500);
        //     // setTimeout(() => {
        //     //     Utils.ShowDealerIcon(data.result.dealer_id);
        //     //     Utils.ShowDealerMessage("Welcome " + user_name + "!!!");
        //     // }, 3600);
        //     // setTimeout(() => {
        //     //     this.CreateNextRoundText();
        //     // }, 3800);
        // }
        // else if(data.result.gamestatus == "winnerdeclare"){
        //     setTimeout(this.CreateUserTimeDelay,3000);
        //     // setTimeout(() => {
        //     //     this.CreateNextRoundText();
        //     // }, 3200);
        // }
        // else{
        //     gameStatus = "Playing";
        //     if(gamePlayType == "Normal"){
        //         setTimeout(this.CreateUserTimeDelay,3000);
        //         //setTimeout(this.WaitingPopUpDealy,1000);
        //         setTimeout(() => {
        //             // _back_button.inputEnabled = false;
        //         }, 1000);
        //     }
        //     else{

        //     }
        // }
        console.log("The First Room Data............."+data.result.first_room);
        first_room = data.result.first_room;
    },
    FireOnSuccessGameStart: function(data){
        console.log("Enter into the result gamestatus..............."+JSON.stringify(createUserData));
        if(data.result.eligibility_status == 0){
            if(data.result.player_id == user_id){
              if(roundText != null){
                roundText.destroy();
              }
              PopUp.GenerateCommonPopup('You Have Not Enough Balance');
            }
            else{
              Utils.DestroyListStartIndex();
            }
        }
        else{
            if(roundText != null){
                roundText.destroy();
            }
            if(data.result.gamestatus == "wait_for_next_round"){
                gameStatus = "Waiting";
                if(nextRoundText != null){
                    nextRoundText.visible = false;
                    nextRoundBg.visible = false;
                }
                setTimeout(() => {
                    potAmount = data.result.pot_amount;
                    Utils.UpdatePotAmount(data.result.pot_amount);
                }, 3400);
                setTimeout(() => {
                    Utils.StoreCardData(data);
                }, 3500);
                setTimeout(() => {
                    Utils.ShowDealerIcon(data.result.dealer_id);
                    Utils.ShowDealerMessage("Welcome " + user_name + "!!!");
                }, 3600);
                setTimeout(() => {
                    this.CreateNextRoundText();
                }, 3800);
                setTimeout(() => {
                    Utils.EnableDisableTipButton(true);
                }, 3800);
            }
            else if(data.result.gamestatus == "winnerdeclare"){
                if(nextRoundText != null){
                    nextRoundText.visible = false;
                    nextRoundBg.visible = false;
                }
                setTimeout(this.CreateUserTimeDelay,3000);
                setTimeout(() => {
                    this.CreateNextRoundText();
                }, 3200);
                setTimeout(() => {
                    Utils.EnableDisableTipButton(true);
                }, 3200);
            }
            else if(data.result.gamestatus == "waiting"){
                gameStatus = "Playing";
                if(nextRoundText != null){
                    nextRoundText.visible = false;
                    nextRoundBg.visible = false;
                }
                Utils.EnableDisableTipButton(true);
            }
            else{
                gameStatus = "Playing";
                if(nextRoundText != null){
                    nextRoundText.visible = false;
                    nextRoundBg.visible = false;
                }
            }
            Utils.DestroyActivePlayerIndexArray();
            Utils.SetPlayerInHandMoney(data.result.wallet_balance,user_id);
            round_id = data.result.round_id;
        }
    },
    FireOnJoinedRoomFailedEvent: function(data){
        Debug.log("Enter into the joined Room failed Event............."+data);
    },
    FireEnterUserSuccessEvent: function(data){
        console.log("Fire the enter user............."+JSON.stringify(data));
        createUserData = data;
        joinType = "enterUser";
        setTimeout(this.CreateUserTimeDelay,2000);
  
        //_back_button.inputEnabled = false;
    },
    ConfirmGameStart: function(data){
        numberOfPlayerCounter = data.result.total_game_started;
        isExitToLobbyClicked = true;
        // isSwitchTable = true;
        console.log("Number of Player Counter....................."+numberOfPlayerCounter);
        if(nextRoundBg != ""){
            nextRoundBg.visible = false;
            nextRoundText.visible = false;
        }
        if(parseInt(first_room) == 1){
            console.log("Enter the Bonus Part.............."+first_room);
            if(data.result.total_game_started == 1){
                if(gamePlayType == "Normal"){
                    Utils.CreateBonusTimer(data.result.total_game_started);
                }
            }
            if(data.result.total_game_started >= 2){
                console.log("The Exit Group Button........................",exitGroupbuttonBase);
                if(gamePlayType == "Normal"){
                    game.time.events.remove(bonusTimerLoopEvent);
                }
            }
        }
    },
    FireEnterUserFailedEvent: function(data){

    },
    FireOnGameStartEvent: function(data){
        //Debug.log("Enter into the game start start Event............."+data);
        //showRoundText = false;
        console.log("Enter into the game start Event.................................");
        if(gameStatus == "Playing"){
            gameStartData = data;
            Debug.log("Enter into the game start start Event............."+gameStartData);
            currentBetAmount =  parseInt(this.GameAmount(gameType));
            dealer_id = gameStartData.result.dealer_id;
            numberofPlayer = gameStartData.result.cardlist.length;
            console.log("The number of player..............."+numberofPlayer);
            //Utils.EnableAllBootAmountAnimation();
            // setTimeout(this.CreateInfoPopUpDelay,1000);
            setTimeout(this.GameStartDelay,1500);
            setTimeout(this.CardStoreDelay,2500);

            setTimeout(this.CreateSeeButtonDelay,(numberOfPlayerCounter*1000)+1000);
            setTimeout(this.CreateShowDealerIconDelay,3300);
            setTimeout(this.CreateGiftIconDelay,3400);
            // setTimeout(this.CreateBonusTimer,3500);
            Utils.EnableDisableBlindButton(true);
            Utils.EnableDisableChaalButton(false);
        }
    },
    FirePlayerNotFoundEvent: function(data){
        Debug.log("Enter into the fire no player found Event.............");
        //PopUp.GenerateCommonPopup('No Opponent Found');
        //setTimeout(this.NoOpponentFound,1000);
    },
    NoOpponentFound: function(){
        // PopUp.GenerateCommonPopup('No Opponent Found');
        //Utils.GameRefresh();
        userIndex = -1;
        //NoOpponentFoundPopUp.GeneratePopup('No Opponent Found');
        // StateTransition.TransitToMenu();
    },
    FireOnTurnChangeEvent: function(data){
        Debug.log("Enter into the Cahnge Turn Event.............."+data.result.boot_amount + "Player id........."+data.result.player_id);
        Utils.ChangeTurn(data.result.boot_amount,data.result.player_id,data.result.prev_command_type,data.result.totaruningplayer);
    },
    FireExitToLobby: function(data){
        Debug.log("Fire Exit to Lobby.............."+data);
        if(data.result.player_id == user_id){
            if(data.result.exit_status == "switch_table"){
                Utils.DisablePlayerForSwitchTable();
                Utils.EnableDisableAllButtonGroup(false);
                Utils.GameRefresh();
                Utils.DestroyDeafultPlayerSprite();
                isSwitchTable = false;
            }
            else{
                if(isSwitchTable){
                    console.log("Enter into the Switch Table.................");
                    //Utils.DisableAllPlayer();
                    Utils.DisablePlayerForSwitchTable();
                    Utils.EnableDisableAllButtonGroup(false);
                    Utils.GameRefresh();
                    Utils.DestroyDeafultPlayerSprite();
                    isSwitchTable = false;
                }
                else{
                    Utils.DisableAllPlayer();
                    Utils.GameRefresh();
                    Utils.DestroyDeafultPlayerSprite();
                    StateTransition.TransitToMenu();
                }
            }
        }
        else{
            //userIndex = -1;
            Utils.DisablePlayer(data.result.player_id);
            Utils.DisablePlayerCard(data.result.player_id);
            //Utils.HideTimer(data.result.player_id);
            Utils.HideTimerImage(data.result.player_id);
            Utils.SinglePersonLeaveRoom(data.result.player_id);
            isExitToLobbyClicked = false;
            // game.time.events.start();
        }
    },
    GameAmount: function(gameType){
        switch(gameType){
            case "Classic":
                return classic_amount;
                break;
            case "Joker":
                return joker_amount;
                break;
            case "Muflis":
                return muflis_amount;
                break;
        }
        return "0";
    },
    GameMaxPotLimit: function(gameType){
        switch(gameType){
            case "Classic":
                return classic_pot_amount;
                break;
            case "Joker":
                return joker_pot_amount;
                break;
            case "Muflis":
                return muflis_pot_amount;
                break;
        }
        return "0";
    },
    CreateUserTimeDelay: function(){
        Utils.CreateDefaultPlayerSprite();
        setTimeout(() => {
            Utils.CreateUser(createUserData);
        }, 1000);
    },
    WaitingPopUpDealy: function(){
        oppoentWaitingPanelTime = createUserData.result.pending_time;
        //OpponentWaitingPanel.ShowWaitingPopup('Waiting For Opponent');
    },
    GameStartDelay: function(){
        if(gamePlayType == "Normal"){
            //OpponentWaitingPanel.EnableDisableTimerPopUp();
        }
        // numberofPlayer = gameStartData.result.cardlist.length;
        Debug.log("Enter into the Game Start Delay"+numberofPlayer);
        Utils.SetBootAmountAnimation();
        // Utils.EnableAllBootAmountAnimation();
        Utils.FindActivePlayer(gameStartData);
        //Utils.ShowAllBootAmountAnimation(numberofPlayer);
        Utils.SetPotAmountTimer();
        Utils.EnableDisableTipButton(true);
    },
    CardStoreDelay: function(){
        Debug.log("Enter into the Card Store Delay");
        Utils.StoreCardData(gameStartData);
        Utils.SpawnCardAnimation();
        //Utils.FindActivePlayer(gameStartData);
    },
    CreateSeeButtonDelay: function(){
        Utils.CreateSeeButton();
        isSeeButtonRender = true;
        isExitToLobbyClicked = false;
        // exitToLobbyPopUpBase.inputEnabled = true;
        // exitToLobbyPopUpBase.alpha = 1.0;
    },
    CreateShowDealerIconDelay: function(){
        Utils.ShowDealerIcon(dealer_id);
        Utils.ShowDealerMessage("Welcome " + user_name + "!!!");
    },
    CreateGiftIconDelay: function(){
        // game.time.events.stop();
        if(roundText != null){
            roundText.destroy();
        }
        if(gameStatus == "Waiting"){
            if(nextRoundText != null){
                nextRoundText.visible = false;
                nextRoundBg.visible = false;
            }
        }
        Utils.ShowGiftIcon();
        _back_button.inputEnabled = true;
        _info_button.inputEnabled = true;
    },
    CreateInfoPopUpDelay: function(){
        // chaal_limit = gameStartData.result.chaal_limit;
        // max_blind = gameStartData.result.max_blind;
        // pot_limit = gameStartData.result.pot_limit;
        // dealer_id = gameStartData.result.dealer_id;
        // boot_amount = gameStartData.result.boot_amount;
        chaal_limit = createUserData.result.chaal_limit;
        max_blind = createUserData.result.max_blind;
        pot_limit = createUserData.result.pot_limit;
        boot_amount = createUserData.result.boot_amount;
        InfoPopUp.GenerateInfoPopUp(boot_amount,max_blind,chaal_limit,2000.00);
        InfoPopUp.ShowInfoPopUp();
    },
    CreateNextRoundText: function(){
        if(gamePage == "GameplayPage"){
            nextRoundBg = Utils.SpriteSettingsControl(nextRoundBg,_table.x, _table.y + 300,'blackOnePixel',"true","true",0.5,0.5,1280,65);
            nextRoundText = Utils.TextSettingsControl(nextRoundText,_table.x, _table.y + 300,'Please wait for the next round to start',"true","false",0.5,0.5,0.0,0.0,"Arial","","#ffffff","center","30px");
        }
    },
}