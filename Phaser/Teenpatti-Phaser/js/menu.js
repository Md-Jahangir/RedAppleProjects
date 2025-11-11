var profilePicButtonClick = false;
var Menu = function () {};
Menu.prototype = {
    init: function(){
        Utils.ScaleManager();
        Debug.log("The Database User image ........."+Database.user_image);
        gameState = "Menu";
    },
    create: function(){
        gamePage = "MenuPage";
        Debug.log("The GameStatus ........."+gameStatus);
        if(!isLoginAPI){
            API.Login();
            isLoginAPI = true;
        }
        else{
            API.GetProfileDetails();
        }
        this.DestroyAllDetails();
       // API.GiftAPI();
    },
    preload: function(){
        game.stage.disableVisibilityChange = true;
        game.time.advancedTiming = true;
    },
    render: function(){
        //  FPS debug info
        //console.log("Enter into the Render");
        // game.debug.text('FPS: ' + game.time.fps || 'FPS: --', 40, 40, "#00ff00");
    },
    CreateMenuPage: function(){
        console.log("Enter into the Create Menu Page..................................................................................."+user_amount);
        //this.input.onTap .add(this.gofull, this);
        _BG = Utils.SpriteSettingsControl(_BG,640.0,360.0,'bg_3',"true","true",0.5,0.5,0.8,0.8);
        Utils.GenerateBubble();
        //Classic Card
        //_Classics_card = Utils.ButtonSettingsControl(_Classics_card, 250.0, 325.0, 'classic_card', this.ClassicCardBttnDown,null,null, this.ClassicCardBttnUp, "true", "true", 0.5, 0.5, 0.5, 0.5);
        //_classic_bet_amount = Utils.TextSettingsControl(_classic_bet_amount, 250.0, 463.0, parseInt(classic_amount) + " CHIPS", "true", "true", 0.5, 0.5, 1.0, 1.0, "Arial", "bold", "#ffffff", "center", "25px");
	    _Classics_card = Utils.ButtonSettingsControl(_Classics_card, 445.0, 325.0, 'classic_card', this.ClassicCardBttnDown,null,null, this.ClassicCardBttnUp, "true", "true", 0.5, 0.5, 0.5, 0.5);
        _classic_bet_amount = Utils.TextSettingsControl(_classic_bet_amount, 445.0, 463.0, parseInt(classic_amount) + " CHIPS", "true", "true", 0.5, 0.5, 1.0, 1.0, "Arial", "bold", "#ffffff", "center", "25px");      

        //Muflis Card
        //_Muflis_Card = Utils.ButtonSettingsControl(_Muflis_Card, 640.0, 325.0, 'muflis_card', this.MuflisCardBttnDown,null,null,this.MuflisCardBttnUp, "true", "true", 0.5, 0.5, 0.5, 0.5);
        //_muflis_bet_amount = Utils.TextSettingsControl(_muflis_bet_amount, 640.0, 463.0, parseInt(muflis_amount) + " CHIPS", "true", "false", 0.5, 0.5, 0.0, 0.0, "Arial", "bold", "#ffffff", "center", "25px");

        //Joker Card
        //_Joker_Card = Utils.ButtonSettingsControl(_Joker_Card, 1030.0, 325.0, 'joker_card', this.JokerCardBttnDown, null,null,this.JokerCardBttnUp, "true", "true", 0.5, 0.5, 0.5, 0.5);
        //_joker_bet_amount = Utils.TextSettingsControl(_joker_bet_amount, 1030.0, 463.0, parseInt(joker_amount) + " CHIPS", "true", "false", 0.5, 0.5, 0.0, 0.0, "Arial", "bold", "#ffffff", "center", "25px");

        //Private Table
        //_Private_Table_Button = Utils.ButtonSettingsControl(_Private_Table_Button, 640.0, 615.0, 'private_table_button', this.PrivateBttnDown, null,null, this.PrivateBttnUp, "true", "true", 0.5, 0.5, 0.5, 0.5);
	    _Private_Table_Button = Utils.ButtonSettingsControl(_Private_Table_Button, 835.0, 325.0, 'private_table_card', this.PrivateBttnDown, null,null,this.PrivateBttnUp, "true", "true", 0.5, 0.5, 0.5, 0.5);
        //_private_bet_amount = Utils.TextSettingsControl(_private_bet_amount, 835.0, 463.0, "PRIVATE TABLE", "true", "false", 0.5, 0.5, 0.0, 0.0, "Arial", "bold", "#ffffff", "center", "25px");

        //Poker Chip
        _poker_chip_text_showcase = Utils.SpriteSettingsControl(_poker_chip_text_showcase, 515.0, 88.0, 'text_showcase', "true", "true", -1.0, 1.0, 0.6, 0.7, "false");
        poker_chip = Utils.SpriteSettingsControl(_poker_chip, 810.0, 86.0, 'poker_chip', "true", "true", -1.0, 1.0, 0.65, 0.65);
        inhand_money_text = Utils.TextSettingsControl(_inhand_money_text, 1055.0, 57.0, /*user_amount*/parseInt(user_amount), "true", "false", 0.5, 0.5, 0.0, 0.0, "Arial", "bold", "#ffffff", "center", "25px");

        //Picture Case
        _picture_text_showcase = Utils.SpriteSettingsControl(_picture_text_showcase, 400.0, 15.0, 'text_showcase', "true", "true", 1, 0, 0.6, 0.7);

        //Setting Button
        _Settings_Button = Utils.ButtonSettingsControl(_Settings_Button, 1090.0, 93.0, 'settings_button', this.SettingsBttnDown, null,null, this.SettingsBttnUp, "true", "true", -1.0, 1.0, 0.7, 0.7);

        //Profile Pic
        _profile_picture = Utils.ButtonSettingsControl(_profile_picture,120.0,90.0,user_image,this.ProfilePicButtonClick,null,null,null,"true","true",1,1,0.25,0.25);
        Utils.SpriteMasking(_profile_picture,80.0,55.0,90);

        _user_name_text = Utils.TextSettingsControl(_user_name_text,150.0,70.0,user_name,"true","false",0.0,1.0,0.0,0.0,"Arial","bold","#ffffff",'left',"25px");

        Settings.SetImageDimension();
        ChangeNamePopUp.CreateChangeNamePopup();
        Loading.HideLoadingPopUp();
        // ChangePicturePopUp.CreateChangePicturePopUp();
        //API.GiftAPI();
        // RoundText.ShowRoundText();
        // RoundText.LoopRoundText();
        // onlineServerEvent.CreateNextRoundText();
    },
    update: function(){
        //Debug.log("Enter into the Update Function");
        Loading.RotateLoadingPopUp();
        // var graphics = game.add.graphics(game.world.centerX, game.world.centerY);

        // //  Our first arc will be a line only
        // graphics.lineStyle(8, 0xffd900);
    
        // graphics.arc(0, 0, 135, 0, 1.5707963267948966, false);
    },
    SettingsBttnDown: function(){
        game.add.tween(_Settings_Button.scale).to({ x: 0.65, y: 0.65}, 100, Phaser.Easing.Linear.Out, true);
    },
    SettingsBttnUp: function(){
        _Settings_Button.inputEnabled = false;
        game.add.tween(_Settings_Button.scale).to({ x: 0.7, y: 0.7}, 100, Phaser.Easing.Linear.Out, true);
        setTimeout(() => {
            Settings.ShowSettingsPopup();
        }, 100);
        setTimeout(() => {
            _Settings_Button.inputEnabled = true;
        }, 800);
    },
    LoadPopUp: function(){
        if(createAllPopUp == 0){
            ChangePicturePopUp.LoadChangePicturePopUp();
        }
    },
    CreatePopUp: function(){
        if(createAllPopUp == 0){
            createAllPopUp = 1;
            ChangePicturePopUp.CreateChangePicturePopUp();
        }
    },
    gofull: function() {
        game.scale.startFullScreen();
    },
    ClassicCardBttnDown: function(){
        game.add.tween(_Classics_card.scale).to({ x: 0.45, y: 0.45}, 100, Phaser.Easing.Linear.Out, true);
        //game.add.tween(_classic_bet_amount).to({ x: 250, y: 448}, 100, Phaser.Easing.Linear.Out, true);
	game.add.tween(_classic_bet_amount).to({ x: 445, y: 448}, 100, Phaser.Easing.Linear.Out, true);
        game.add.tween(_classic_bet_amount.scale).to({ x: 0.95, y: 0.95}, 100, Phaser.Easing.Linear.Out, true);
    },
    ClassicCardBttnUp: function(){
        _Classics_card.inputEnabled = false;
        Debug.log("Classic Card button Up");
        game.add.tween(_Classics_card.scale).to({ x: 0.5, y: 0.5}, 100, Phaser.Easing.Linear.Out, true);
        //game.add.tween(_classic_bet_amount).to({ x: 250, y: 463}, 100, Phaser.Easing.Linear.Out, true);
        game.add.tween(_classic_bet_amount).to({ x: 445, y: 463}, 100, Phaser.Easing.Linear.Out, true);
        game.add.tween(_classic_bet_amount.scale).to({ x: 1.0, y: 1.0}, 100, Phaser.Easing.Linear.Out, true);
       setTimeout(() => {
        if(user_amount >maxBalance){
            Debug.log("Classic Card ButtonClick");
            gameType = "Classic";
            Client.AddUser();
            StateTransition.TransitToClassic();
            opponentPanelGraphicsCounter = 1;
            gamePlayType = "Normal";
            game_id = 1;
        }
        else{
            _Classics_card.inputEnabled = true;
            PopUp.GenerateCommonPopup('You have not enough Balance');
        }
       }, 100);
    },
    JokerCardBttnDown: function(){
        game.add.tween(_Joker_Card.scale).to({ x: 0.45, y: 0.45}, 100, Phaser.Easing.Linear.Out, true);
        game.add.tween(_joker_bet_amount).to({ x: 1030, y: 448}, 100, Phaser.Easing.Linear.Out, true);
        game.add.tween(_joker_bet_amount.scale).to({ x: 0.95, y: 0.95}, 100, Phaser.Easing.Linear.Out, true);
    },
    JokerCardBttnUp: function(){
        _Joker_Card.inputEnabled = false;
        game.add.tween(_Joker_Card.scale).to({ x: 0.5, y: 0.5}, 100, Phaser.Easing.Linear.Out, true);
        game.add.tween(_joker_bet_amount).to({ x: 1030, y: 463}, 100, Phaser.Easing.Linear.Out, true);
        game.add.tween(_joker_bet_amount.scale).to({ x: 1.0, y: 1.0}, 100, Phaser.Easing.Linear.Out, true);
        setTimeout(() => {
            if(user_amount >maxBalance){
                Debug.log("Joker Card Button Click");
                gameType = "Joker";
                Client.AddUser();
                StateTransition.TransitToJoker();
                opponentPanelGraphicsCounter = 1;
                gamePlayType = "Normal";
                game_id = 3;
            }
            else{
                _Joker_Card.inputEnabled = true;
                PopUp.GenerateCommonPopup('You have not enough Balance');
            }
        }, 100);
    },
    MuflisCardBttnDown: function(){
        game.add.tween(_Muflis_Card.scale).to({ x: 0.45, y: 0.45}, 100, Phaser.Easing.Linear.Out, true);
        game.add.tween(_muflis_bet_amount).to({ x: 640, y: 448}, 100, Phaser.Easing.Linear.Out, true);
        game.add.tween(_muflis_bet_amount.scale).to({ x: 0.95, y: 0.95}, 100, Phaser.Easing.Linear.Out, true);
    },
    MuflisCardBttnUp: function(){
        _Muflis_Card.inputEnabled = false;
        game.add.tween(_Muflis_Card.scale).to({ x: 0.5, y: 0.5}, 100, Phaser.Easing.Linear.Out, true);
        game.add.tween(_muflis_bet_amount).to({ x: 640, y: 463}, 100, Phaser.Easing.Linear.Out, true);
        game.add.tween(_muflis_bet_amount.scale).to({ x: 1.0, y: 1.0}, 100, Phaser.Easing.Linear.Out, true);
        setTimeout(() => {
            if(user_amount >maxBalance){
                Debug.log("Muflis Card Button Click");
                gameType = "Muflis";
                Client.AddUser();
                StateTransition.TransitToMuflis();
                opponentPanelGraphicsCounter = 1;
                gamePlayType = "Normal";
                game_id = 2;
            }
            else{
                _Muflis_Card.inputEnabled = true;
                PopUp.GenerateCommonPopup('You have not enough Balance');
            }
        }, 100);
    },
    PrivateBttnDown: function(){
        game.add.tween(_Private_Table_Button.scale).to({ x: 0.45, y: 0.45}, 100, Phaser.Easing.Linear.Out, true);
    },
    PrivateBttnUp: function(){
        _Private_Table_Button.inputEnabled = false;
        var privateTableBttnUpTween = game.add.tween(_Private_Table_Button.scale).to({ x: 0.5, y: 0.5}, 100, Phaser.Easing.Linear.Out, true);
        setTimeout(() => {
            Debug.log("Private Table Button Click");
            StateTransition.TransitToPrivateTable();
            gamePlayType = "Private";
        }, 100);
    },
    ProfilePicButtonClick: function(){
        // if(!profilePicButtonClick){
            console.log("Enter into the Profile Pic Button");
            profilePicButtonClick = true;
            _profile_picture.inputEnabled = false;
            // _Classics_card.inputEnabled = false;
            // _Muflis_Card.inputEnabled = false;
            // _Joker_Card.inputEnabled = false;
            _Private_Table_Button.inputEnabled = false;
            ChangePicturePopUp.CreateChangePicturePopUp();
            ChangePicturePopUp.ShowChangePicturePopUp();
        // }
    },
    // ProfilePicUpAnimation: function(){
        
    //     console.log("Enter the Profile Pic Button.............");
    //     setTimeout(() => {
    //         // _profile_picture.inputEnabled = true;
    //         console.log("Enter the Profile Pic Up Animation.............");
    //     }, 2000);
    // },

    ParseLoginData: function(responseText){
        console.log("ResponseText......."+responseText);
        Database.SaveData("user_id",responseText.result.user_id);
        Database.SaveData("user_amount",responseText.result.wallet_money);
        Database.SaveData("image_url",responseText.result.image_url);
        Database.SaveData("user_name",responseText.result.user_name);
        Database.SaveData("session_id",responseText.result.access_token);
        Database.SaveData("classic_amount",responseText.result.classic_amount);
        Database.SaveData("muflis_amount",responseText.result.muflis_amount);
        Database.SaveData("joker_amount",responseText.result.joker_amount);
        Database.SaveData("user_image",responseText.result.avatar_id);
        Database.SaveData("classic_pot_amount",responseText.result.classic_max_pot_amount);
        Database.SaveData("mufflis_pot_amount",responseText.result.muflis_max_pot_amount);
        Database.SaveData("joker_pot_amount",responseText.result.joker_max_pot_amount);
        this.RetrievLoginDataTest();
    },
    RetrievLoginDataTest: function(){
        user_id = Database.LoadData("user_id");
        user_amount = Database.LoadData("user_amount");
        image_url = Database.LoadData("image_url");
        user_name = Database.LoadData("user_name");
        session_id = Database.LoadData("session_id");
        classic_amount = Database.LoadData("classic_amount");
        muflis_amount = Database.LoadData("muflis_amount");
        joker_amount = Database.LoadData("joker_amount");
        user_image = Database.LoadData("user_image");
        classic_pot_amount = Database.LoadData("classic_pot_amount");;
        muflis_pot_amount = Database.LoadData("mufflis_pot_amount");;
        joker_pot_amount = Database.LoadData("joker_pot_amount");
        changePicturePopUpImageName = Database.LoadData("user_image");
    },
    DestroyAllDetails: function(){
        if(nextRoundBg != ""){
            nextRoundBg.visible = false;
            nextRoundText.visible = false;
        }
        if(defaultPlayer.length > 0){
            for(var i = 0;i < defaultPlayer.length; i++){
                if(defaultPlayer[i] != null){
                    defaultPlayer[i].destroy();
                }
            }
        }
        if(allPlayers.length > 0){
            for(var i = 0;i < allPlayers.length; i++){
                if(allPlayers[i] != null){
                    if(allPlayers[i].card.length >0){
                        for(var j = 0;j<allPlayers[i].card.length;j++){
                            allPlayers[i].card[j].cardsprite.destroy();
                        }
                    }
                    allPlayers[i].destroy();
                }
            }
        }
    }
};
