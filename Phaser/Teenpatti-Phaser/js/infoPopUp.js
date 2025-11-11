var _infoGroup;
var _ok_button;
var gamePlayInfoPopupImageName;
var _start_game_text;
var InfoPopUp = {
    LoadInfoPopUp: function(){
         game.load.image('max_blind', 'assets/InfoPopUp/max_blind.png');
    },
    GenerateInfoPopUp: function(bootAmount,maxBlindAmount,chaalLimit,potLimit) {
        if(gamePage == "GameplayPage"){
            _infoGroup = game.add.group();

            var _background = Utils.SpriteSettingsControl(_background,640,360,'blackOnePixel',"true","true",0.5,0.5,1280,720,"true");
            _background.alpha = 0.5;

            Debug.log("The Heading Decision.............."+this.HeadingDecision() + "Gameplay type......"+gamePlayType);
            var _info_popup_base = Utils.SpriteSettingsControl(_info_popup_base,640,360,'popupBase',"true","true",0.5,0.5,0.5,0.5);
            var _info_classic_heading = Utils.SpriteSettingsControl(_info_classic_heading,640,210,this.HeadingDecision(),"true","true",0.5,0.5,0.5,0.5);

            var _boot_icon = Utils.SpriteSettingsControl(_boot_icon,420,286,'boot_icon',"true","true",0.5,0.5,0.7,0.7);
            var _boot_amount_text = Utils.TextSettingsControl(_boot_amount_text,460.0,284.0,'Boot Amount			   :',"true","false",0.0,0.5,0.0,0.0,"Arial","bold","#ffffff","center","25px");
            var _boot_amount = Utils.TextSettingsControl(_boot_amount,750.0,284.0,bootAmount,"true","false",0.0,0.5,0.0,0.0,"Arial","bold","#ffffff","center","25px");

            var _max_blind = Utils.SpriteSettingsControl(_max_blind,420,336,'max_blind',"true","true",0.5,0.5,0.7,0.7);
            var _max_blinds_text = Utils.TextSettingsControl(_max_blinds_text,460.0,334.0,'Max Blinds 			     :',"true","false",0.0,0.5,0.0,0.0,"Arial","bold","#ffffff","center","25px");
            var _max_blinds_amount = Utils.TextSettingsControl(_max_blinds_amount,750.0,334.0,maxBlindAmount,"true","false",0.0,0.5,0.0,0.0,"Arial","bold","#ffffff","center","25px");

            var _chaal_limit_icon = Utils.SpriteSettingsControl(_chaal_limit_icon,420,386,'max_blind',"true","true",0.5,0.5,0.7,0.7);
            var _chaal_limit_text = Utils.TextSettingsControl(_chaal_limit_text,460.0,384.0,'Chaal Limit 			    :',"true","false",0.0,0.5,0.0,0.0,"Arial","bold","#ffffff","center","25px");
            var _chaal_limit_amount = Utils.TextSettingsControl(_chaal_limit_amount,750.0,384.0,chaalLimit,"true","false",0.0,0.5,0.0,0.0,"Arial","bold","#ffffff","center","25px");

            var _pot_limit_icon = Utils.SpriteSettingsControl(_pot_limit_icon,420,436,'pot_limit_icon',"true","true",0.5,0.5,0.7,0.7);
            var _pot_limit_text = Utils.TextSettingsControl(_pot_limit_text,460.0,434.0,'Pot Limit 			        :',"true","false",0.0,0.5,0.0,0.0,"Arial","bold","#ffffff","center","25px");
            var _pot_limit_amount = Utils.TextSettingsControl(_pot_limit_amount,750.0,434.0,potLimit,"true","false",0.0,0.5,0.0,0.0,"Arial","bold","#ffffff","center","25px");
            console.log("The Status of Info Button Clicked.............."+isInfoPopUpClicked);
            if(isInfoPopUpClicked){
                _ok_button = Utils.ButtonSettingsControl(_ok_button,640,485,'green_base',this.OkButtonDownAnimation, null,null,this.OkButtonUpAnimation,"true","true",0.5,0.5,0.4,0.4,this);
                _start_game_text = Utils.TextSettingsControl(_start_game_text,640.0,480.0,"OK","true","false",0.5,0.5,0.0,0.0,"Arial","bold","#ffffff","center","25px");
            }
            else{
                _ok_button = Utils.ButtonSettingsControl(_ok_button,640,485,'green_base',this.OkButtonDownAnimation, null,null,this.OkButtonUpAnimation,"true","true",0.5,0.5,0.6,0.5,this);
                _start_game_text = Utils.TextSettingsControl(_start_game_text,640.0,480.0,"Start Game","true","false",0.5,0.5,0.0,0.0,"Arial","bold","#ffffff","center","25px");
            }
            _infoGroup.add(_background);
            _infoGroup.add(_info_popup_base);
            _infoGroup.add(_info_classic_heading);
            _infoGroup.add(_boot_icon);
            _infoGroup.add(_boot_amount_text);
            _infoGroup.add(_boot_amount);
            _infoGroup.add(_max_blind);
            _infoGroup.add(_max_blinds_text);
            _infoGroup.add(_max_blinds_amount);
            _infoGroup.add(_chaal_limit_icon);
            _infoGroup.add(_chaal_limit_text);
            _infoGroup.add(_chaal_limit_amount);
            _infoGroup.add(_pot_limit_icon);
            _infoGroup.add(_pot_limit_text);
            _infoGroup.add(_pot_limit_amount);
            _infoGroup.add(_ok_button);
            _infoGroup.add(_start_game_text);

            _infoGroup.visible = false;
        }
    },
    OkButtonClick: function(){
        if(isInfoPopUpClicked){
            _infoGroup.visible = false;
            isShowInfoPopUp = false;
            isInfoPopUpClicked = false;
            console.log("Enter into the Info Pop up Clicked....................");
            _ok_button.inputEnabled = true;
        }
        else{
            _infoGroup.visible = false;
            isShowInfoPopUp = false;
            Client.GameplayRequest();
            console.log("Enter into the Game Request.................");
            _ok_button.inputEnabled = true;
        }
    },
    OkButtonDownAnimation: function(){
        game.add.tween(_ok_button.scale).to({ x: 0.45, y: 0.45}, 100, Phaser.Easing.Linear.Out, true);
    },
    OkButtonUpAnimation: function(){
        game.add.tween(_ok_button.scale).to({ x: 0.5, y: 0.5}, 100, Phaser.Easing.Linear.Out, true);
        _ok_button.inputEnabled = false;
        setTimeout(() => {
            this.OkButtonClick();
        }, 100);
    },
    ShowInfoPopUp: function(){
        if(_infoGroup){
            _infoGroup.visible = true;
        }
        isShowInfoPopUp = true;
        if(isInfoPopUpClicked){
            _start_game_text.setText("OK");
        }
        else{
            _start_game_text.setText("Start Game");
        }
    },
    HeadingDecision: function(){
        switch(gameType){
            case "Classic":
            gamePlayInfoPopupImageName = "classic_heading";
            break;
            case "Muflis":
            gamePlayInfoPopupImageName = "muflis_heading";
            break;
            case "Joker":
            gamePlayInfoPopupImageName = "joker_heading";
            break; 
        }
        return gamePlayInfoPopupImageName;
    },
    UpdateInfoPopUp: function(){
        if(isShowInfoPopUp){
            game.world.bringToTop(_infoGroup);
        }
    }
}