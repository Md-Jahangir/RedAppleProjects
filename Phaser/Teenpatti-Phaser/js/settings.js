var controlPicturePopup = false;
var Settings = {
    LoadImage: function(){
        Debug.log("Enter into The Settings Page Preload Function");
    },

    SetImageDimension: function(){
        Debug.log("Enter into the Settings Button Click");
        settingsPopupOverlay = game.add.sprite(640, 360, 'blackOnePixel');
        settingsPopupOverlay.anchor.setTo(0.5, 0.5);
        settingsPopupOverlay.scale.setTo(1280, 720);
        settingsPopupOverlay.alpha = 0.5;
        settingsPopupOverlay.inputEnabled = true;
        settingsPopupOverlay.visible = false;
        settingsPopupOverlay.events.onInputDown.add(this.HideSettingsPopup, this);
    
        this.GenerateSettingPopup();
    },
    ShowSettingsPopup: function() {
        //this.PreviousNameColorOfButton();
        this.PreviousPictureColorOfButton();
        // this.PreviousGameRulesColorOfButton();
        this.PreviousSoundOnOffColorOfButton();
        this.ExitGroupOut();
        settingsPopupOverlay.visible = true;
        settingsGroup.visible = true;
        game.add.tween(settingsGroup.position).to({ x: 335, y: 0 }, 500, Phaser.Easing.Linear.Out, true);
        setTimeout(() => {
            soundOnOffButtonIcon.visible = true;
        }, 1000);
    },


    HideSettingsPopup: function() {
        Debug.log("Hide Settings Pop up CLick");
        // controlPicturePopup = false;
        settingsPopupOverlay.visible = false;
        game.add.tween(settingsGroup.position).to({ x: 700, y: 0 }, 300, Phaser.Easing.Linear.Out, true);
        soundOnOffButtonIcon.visible = false;
    },

    GenerateSettingPopup: function() {
        settingsPopupCounter = 0;
        settingsGroup = game.add.group();
        settingsGroup.position.set(500, 0);

        
        settingsPopupBase = game.add.sprite(798, 360.0, 'whiteOnePixel');
        settingsPopupBase.anchor.setTo(0.5, 0.5);
        settingsPopupBase.scale.setTo(300, 720);
        settingsPopupBase.tint = 0x092a5c;

        settingsHeading = game.add.sprite(798, 40, 'settingsHeading');
        settingsHeading.anchor.setTo(0.5, 0.5);
        settingsHeading.scale.setTo(0.5, 0.5);

        // var arrow_button = game.add.sprite(918,40,'arrow');
        // arrow_button.anchor.setTo(0.5,0.5);
        // arrow_button.scale.setTo(0.5,0.5);
        // arrow_button.inputEnabled = true;
        // arrow_button.events.onInputDown.add(this.HideSettingsPopup,this);

        settingsGroup.add(settingsPopupBase);
        settingsGroup.add(settingsHeading);
        // settingsGroup.add(arrow_button);
        if(Database.LoadData("soundOnOff") == "1"){
            Database.SaveData("soundOnOff","1");
            soundOnOffGroupbuttonBase = this.GenerateSettingsPopupSubGroup(soundOnOffGroup, 'soundIcon', 'Sound On', /*675 + 15, 105 + 140, 920, 105 + 130, 798, 105 + 140,*/675 + 15, 105 + 70, 920, 105 + 60, 798, 105 + 70, this.SoundONOff, this.SoundOnOffColorOfButton, this.PreviousSoundOnOffColorOfButton);
        }
        else{
            Database.SaveData("soundOnOff","0");
            soundOnOffGroupbuttonBase = this.GenerateSettingsPopupSubGroup(soundOnOffGroup, 'soundOffIcon', 'Sound Off', /*675 + 15, 105 + 140, 920, 105 + 130, 798, 105 + 140,*/ 675 + 15, 105 + 70, 920, 105 + 60, 798, 105 + 70,this.SoundONOff, this.SoundOnOffColorOfButton, this.PreviousSoundOnOffColorOfButton);
        }
        //rulesGroupbuttonBase = this.GenerateSettingsPopupSubGroup(gameRulesGroup, 'gameRulesIcon', 'Game Rules', 675 + 15, 105 + 140, 920, 105 + 130, 798, 105 + 140, this.GameRules, this.GameRulesColorOfButton, this.PreviousGameRulesColorOfButton);
        changePictureGroupbuttonBase = this.GenerateSettingsPopupSubGroup(chanagePictureGroup, 'changePictureIcon', 'Change Picture', 675 + 15, 105/*105 + 70*/, 920, /*105 + 60*/95, 798, 105/*+ 70*/, this.ChangePicture, this.ChangePictureColorOfButton, this.PreviousPictureColorOfButton);
        //changeNameGroupbuttonBase = this.GenerateSettingsPopupSubGroup(chanageNameGroup, 'changeNameIcon', 'Change Name', 675 + 15, 105, 920, 95, 798, 105, this.ChangeName, this.ChangeNameColorOfButton, this.PreviousNameColorOfButton);
        exitGroupbuttonBase = this.GenerateSettingsPopupSubGroup(exitNameGroup, 'signOutIcon', 'Exit', 675 + 15, 695-10, 920, 680-10, 798, 695, this.ExitGroupClick, this.ExitGroupHover, this.ExitGroupOut);
        settingsGroup.visible = false;
    },

    GenerateSettingsPopupSubGroup: function(groupname, iconName,textName, iconPosx, iconPosy, textPosx, textPosy, buttonBasex, buttonBasey, functionName, overFunctionName,previousFunctionName) {
        settingsPopupCounter++;
        console.log("The settings pop up counter........."+settingsPopupCounter);
        groupname = game.add.group();
        settingsGroup.add(groupname);
        groupname.position.set(0, 0);

        var buttonbase = game.add.sprite(buttonBasex, buttonBasey, 'whiteOnePixel');
        buttonbase.anchor.setTo(0.5, 0.5);
        if(settingsPopupCounter == 3){
            buttonbase.scale.setTo(300, 100);
        }
        else{
            buttonbase.scale.setTo(300, 60);
        }
        buttonbase.tint = 0x092a5c;
        buttonbase.inputEnabled = true;

        buttonbase.events.onInputOver.add(overFunctionName, this);
        buttonbase.events.onInputOut.add(previousFunctionName, this);
        buttonbase.events.onInputDown.add(functionName, this);
       
        Debug.log("The name of the button base...."+settingsPopupCounter + groupname.key);
        buttonIcon = game.add.sprite(iconPosx, iconPosy, iconName);
        buttonIcon.anchor.setTo(0.5, 0.5);
        if(settingsPopupCounter == 3){
            buttonIcon.scale.setTo(0.6, 0.6);
        }
        else{
            buttonIcon.scale.setTo(0.5, 0.5);
        }
        if(settingsPopupCounter == 1){
            soundOnOffButtonIcon = buttonIcon;
        }
        if(settingsPopupCounter == 3){
            buttonText = game.add.text(textPosx, textPosy, textName, { font: '30px Arial', fill: '#ffffff'});
        }
        else{
            buttonText = game.add.text(textPosx, textPosy, textName, { font: '20px Arial', fill: '#ffffff'});
        }
        buttonText.anchor.set(1, 0);

        if(settingsPopupCounter == 1){
            soundOnOffButtonText = buttonText;
        }
        groupname.add(buttonbase);
        groupname.add(buttonIcon);
        groupname.add(buttonText);
        groupname.add(soundOnOffButtonIcon);
        return buttonbase;
    },

    ChangeName: function() {
        Debug.log("Change name clicked");
        this.HideSettingsPopup();
        ChangeNamePopUp.ShowChangeNamePopup();
    },

    ChangePicture: function() {
        Debug.log("ChangePicture clicked");
        if(!controlPicturePopup){
            controlPicturePopup = true;
            this.HideSettingsPopup();
            ChangePicturePopUp.CreateChangePicturePopUp();
            ChangePicturePopUp.ShowChangePicturePopUp();
        }
    },

    GameRules: function() {
        Debug.log("GameRules clicked");
        this.HideSettingsPopup();
    },

    SoundONOff: function() {
        Debug.log("SoundONOff clicked");
        if(Database.LoadData("soundOnOff") == "1"){
            //sounOnOff = 1;
            Database.SaveData("soundOnOff","0");
            //SoundManager.StopBackGroundMusic();
            soundOnOffButtonIcon.visible = false;
            soundOnOffButtonIcon = game.add.sprite(1017, 175, 'soundOffIcon');
            soundOnOffButtonIcon.anchor.setTo(0.5, 0.5);
            soundOnOffButtonIcon.scale.setTo(0.5, 0.5);
            soundOnOffButtonIcon.visible = true;
            soundOnOffButtonText.setText("Sound Off");
        }
        else{
            //sounOnOff = 0;
            Database.SaveData("soundOnOff","1");
            //SoundManager.PlayBackgroundMusic();
            soundOnOffButtonIcon.visible = false;
            soundOnOffButtonIcon = game.add.sprite(1017, 175, 'soundIcon');
            soundOnOffButtonIcon.anchor.setTo(0.5, 0.5);
            soundOnOffButtonIcon.scale.setTo(0.5, 0.5);
            soundOnOffButtonIcon.visible = true;
            soundOnOffButtonText.setText("Sound On");
        }
        //this.HideSettingsPopup();
    },

    //Over&ReleaseFunction
    // ChangeNameColorOfButton: function() {
    //     Debug.log("Over");
    //     changeNameGroupbuttonBase.tint = 0x021b41;
    // },
    // PreviousNameColorOfButton: function() {
    //     Debug.log("Out");
    //     changeNameGroupbuttonBase.tint = 0x092a5c;
    // },

    ChangePictureColorOfButton: function() {
        Debug.log("Over");
        changePictureGroupbuttonBase.tint = 0x021b41;
    },
    PreviousPictureColorOfButton: function() {
        Debug.log("Out");
        changePictureGroupbuttonBase.tint = 0x092a5c;
    },

    // GameRulesColorOfButton: function() {
    //     Debug.log("Over");
    //     rulesGroupbuttonBase.tint = 0x021b41;
    // },
    // PreviousGameRulesColorOfButton: function() {
    //     Debug.log("Out");
    //     rulesGroupbuttonBase.tint = 0x092a5c;
    // },

    SoundOnOffColorOfButton: function() {
        Debug.log("Over");
        soundOnOffGroupbuttonBase.tint = 0x021b41;
    },
    PreviousSoundOnOffColorOfButton: function() {
        Debug.log("Out");
        soundOnOffGroupbuttonBase.tint = 0x092a5c;
    },
    ExitGroupClick: function(){
        //MenuController.ShowMenuControllerPopup();
        console.log("Click on the Exit Group");
        API.Logout();
    },
    ExitGroupHover: function(){
        exitGroupbuttonBase.tint = 0x021b41;
    },
    ExitGroupOut: function(){
        exitGroupbuttonBase.tint = 0x092a5c;
    }

};
