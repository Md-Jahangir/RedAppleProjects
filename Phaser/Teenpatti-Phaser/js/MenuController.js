var isMenuPopUpShow = false;
var menuPopupCounter = 0;
var MenuController = {

     LoadImage: function(){
        Debug.log("Enter into The Settings Page Preload Function");
    },

    SetImageDimension: function(){
        Debug.log("Enter into the Settings Button Click");

        menuConrollerPopupOverlay = game.add.sprite(640, 360, 'blackOnePixel');
        menuConrollerPopupOverlay.anchor.setTo(0.5, 0.5);
        menuConrollerPopupOverlay.scale.setTo(11280, 720);
        menuConrollerPopupOverlay.alpha = 0.5;
        menuConrollerPopupOverlay.inputEnabled = true;
        menuConrollerPopupOverlay.visible = false;
        menuConrollerPopupOverlay.events.onInputDown.add(this.HideMenuControllerPopup, this);
        this.GenerateMenuPopup();
    },

    ShowMenuControllerPopup: function() {
        menuPopupCounter = 0;
        menuConrollerPopupOverlay.visible = true;
        menuGroup.visible = true;
        game.add.tween(menuGroup.position).to({ x: 325, y: 0 }, 500, Phaser.Easing.Linear.Out, true);
        isMenuPopUpShow = true;
        if(numberOfPlayerCounter >= 2 && gameStatus == "Playing" && isExitToLobbyClicked){
            // switchTablePopUpBase.inputEnabled = false;
            exitToLobbyPopUpBase.inputEnabled = false;
            exitToLobbyPopUpBase.alpha = 0.5;
        }
        if(numberOfPlayerCounter >= 2 && !isExitToLobbyClicked){
            // switchTablePopUpBase.inputEnabled = true;
            exitToLobbyPopUpBase.inputEnabled = true;
            exitToLobbyPopUpBase.alpha = 1;
        }
    },

    HideMenuControllerPopup: function() {
        Debug.log("Hide Menu Controller Pop up CLick");
        menuConrollerPopupOverlay.visible = false;
        game.add.tween(menuGroup.position).to({ x: -198, y: 0 }, 300, Phaser.Easing.Linear.Out, true);
        isMenuPopUpShow = false;
    },

    GenerateMenuPopup: function() {
        menuGroup = game.add.group();
        menuGroup.position.set(-500, 0);

        
        menuPopupBase = game.add.sprite(-198, 360.0, 'whiteOnePixel');
        menuPopupBase.anchor.setTo(0.5, 0.5);
        menuPopupBase.scale.setTo(300, 720);
        menuPopupBase.tint = 0x092a5c;

        var menuHeading = Utils.TextSettingsControl(menuHeading, -198.0, 40.0, "MENU", "true", "false", 0.5, 0.5, 0., 0.0, "Arial", "bold", "#FFFF00", "center", "30px");
        // menuHeading = game.add.sprite(-198, 40, 'settingsHeading');
        // menuHeading.anchor.setTo(0.5, 0.5);
        // menuHeading.scale.setTo(0.5, 0.5);

        menuGroup.add(menuPopupBase);
        menuGroup.add(menuHeading);

        exitToLobbyPopUpBase = this.GenerateMenuPopupSubGroup(exitToLobbyGroup, 'exitToLobbyIcon', 'Exit To Lobby', -295, 105, -115, 95, -198, 105, this.ExitToLobbyClick, this.ExitToLobbyHoverBttn, this.ExitToLobbyOutBttn);
        closeMenuPopUpBase = this.GenerateMenuPopupSubGroup(closeMenuGroup, 'closeIcon', 'Close Menu', -295 , 175, -115, 165, -198, 175, this.CloseMenu, this.CloseMenuColorHoverButton, this.CloseMenuColorOutButton);

        switchTablePopUpBase = this.GenerateMenuPopupSubGroup(switchToLobbyGroup, 'switchIcon', 'Switch Table', -295, 175 + 70, -115, 165+70 , -198, 175 + 70, this.SwitchTableBttnClick, this.SwitchTableHoverBttnClick, this.SwitchTableOutBttnClick);
        howToPlayPopUPBase = this.GenerateMenuPopupSubGroup(howToPlayGroup, 'questionMarkIcon', 'How To Play', -295, 175 +140 , -115, 165+140, -198 , 175+140, this.HowToPlayBttnClick, this.HowToPlayBttnHoverClick, this.HowToPlayBttnOutClick);
        menuGroup.visible = false;
    },
    
    GenerateMenuPopupSubGroup: function(groupname, iconName,textName, iconPosx, iconPosy, textPosx, textPosy, buttonBasex, buttonBasey, functionName, overFunctionName,previousFunctionName) {
        groupname = game.add.group();
        menuGroup.add(groupname);
        groupname.position.set(0, 0);

        var buttonbase = game.add.sprite(buttonBasex, buttonBasey, 'whiteOnePixel');
        buttonbase.anchor.setTo(0.5, 0.5);
        buttonbase.scale.setTo(300, 60);
        buttonbase.tint = 0x092a5c;
        buttonbase.inputEnabled = true;

        buttonbase.events.onInputOver.add(overFunctionName, this);
        buttonbase.events.onInputOut.add(previousFunctionName, this);
        buttonbase.events.onInputDown.add(functionName, this);
       
        Debug.log("The name of the button base...."+ menuPopupCounter);

        buttonIcon = game.add.sprite(iconPosx, iconPosy, iconName);
        buttonIcon.anchor.setTo(0.5, 0.5);
        buttonIcon.scale.setTo(0.5, 0.5);
        buttonText = game.add.text(textPosx, textPosy, textName, { font: '20px Arial', fill: '#ffffff'});
        buttonText.anchor.set(1, 0);
        if(gamePlayType == "Private" && menuPopupCounter == 2){
            buttonIcon.alpha = 0.5;
            buttonText.alpha = 0.5;
        }
        groupname.add(buttonbase);
        groupname.add(buttonIcon);
        groupname.add(buttonText);

        if(gamePlayType == "Private" && menuPopupCounter == 2){
            buttonbase.inputEnabled = false;
        }
        menuPopupCounter++;
        return buttonbase;
    },

    CloseMenuColorHoverButton: function() {
        Debug.log("Over");
        closeMenuPopUpBase.tint = 0x021b41;
    },
    CloseMenuColorOutButton: function() {
        Debug.log("Out");
        closeMenuPopUpBase.tint = 0x092a5c;
    },
    CloseMenu: function(){
        this.HideMenuControllerPopup();
    },
    ExitToLobbyClick: function(){
        gameStatus = "";
        this.HideMenuControllerPopup();
        Client.LeaveRoomEmit(1);
    },
    ExitToLobbyHoverBttn: function(){
        exitToLobbyPopUpBase.tint = 0x021b41;
    },
    ExitToLobbyOutBttn: function(){
        exitToLobbyPopUpBase.tint = 0x092a5c;
    },
    SwitchTableBttnClick: function(){
        isSwitchTable = true;
        this.HideMenuControllerPopup();
        Debug.log("The GameAmount............."+onlineServerEvent.GameAmount(gameType)+"The Game Type....................."+gameType);
        Client.SwitchTableEmit(onlineServerEvent.GameAmount(gameType));
        //Client.LeaveRoomEmit(1);
    },
    SwitchTableHoverBttnClick: function(){
        switchTablePopUpBase.tint = 0x021b41;
    },
    SwitchTableOutBttnClick: function(){
        switchTablePopUpBase.tint = 0x092a5c;
    },
    HowToPlayBttnClick: function(){
        this.HideMenuControllerPopup();
        Rules.GenerateRules();
        Rules.ShowRulesPopUp();
    },
    HowToPlayBttnHoverClick: function(){
        howToPlayPopUPBase.tint = 0x021b41;
    },
    HowToPlayBttnOutClick: function(){
        howToPlayPopUPBase.tint = 0x092a5c;
    },
    MenuBringToTop: function(){
        if(isMenuPopUpShow){
            game.world.bringToTop(menuConrollerPopupOverlay);
            game.world.bringToTop(menuGroup);
        }
    },
}