var isSideShowPopUp;
var acceptButton;
var acceptText;
var rejectButton;
var rejectText;
var SideShowPopUp = {
    CreateSideShowPopUp: function(){
        sideShowPopupGroup = game.add.group();

        var overlay = Utils.SpriteSettingsControl(overlay,640,360,'blackOnePixel',"true","false",0.5,0.5,0.0,0.0);
        overlay.scale.setTo(1280, 720);
        overlay.alpha = 0.5;
        overlay.inputEnabled = true;

        var popupBase = Utils.SpriteSettingsControl(popupBase,640,360,'popupBase',"true","true",0.5,0.5,0.5,0.5);
        var sideShowPopUpHeading = Utils.TextSettingsControl(sideShowPopUpHeading,640.0,250.0,'Opponent \n Want To Side Show?',"true","false",0.5,0.5,0.0,0.0,"Arial","bold","#ffffff","center","35px");


        acceptButton = Utils.ButtonSettingsControl(acceptButton,530,400,'green_base',this.AcceptButtonDownAnimation,null,null,this.AcceptButtonUpAnimation,"true","true",0.5,0.5,0.4,0.5,this);
        acceptText =  Utils.TextSettingsControl(acceptText,530.0,398.0,'ACCEPT',"true","false",0.5,0.5,0.0,0.0,"Arial","bold","#ffffff","center","25px");


        rejectButton = Utils.ButtonSettingsControl(rejectButton,750,400,'red_base',this.RejectButtonDownAnimation,null,null,this.RejectButtonUpAnimation,"true","true",0.5,0.5,0.6,0.5,this);
        rejectText =  Utils.TextSettingsControl(rejectText,750.0,398.0,'DECLINE',"true","false",0.5,0.5,0.0,0.0,"Arial","bold","#ffffff","center","25px");

        sideShowPopupGroup.add(overlay);
        sideShowPopupGroup.add(popupBase);
        sideShowPopupGroup.add(sideShowPopUpHeading);
        sideShowPopupGroup.add(acceptButton);
        sideShowPopupGroup.add(acceptText);
        sideShowPopupGroup.add(rejectButton);
        sideShowPopupGroup.add(rejectText);
        isSideShowPopUp = true;
    },
    ShowSideShowPopUp: function(){
        this.CreateSideShowPopUp();
        sideShowPopupGroup.visible = true;
    },
    HideSideShowPopUp: function(){
        isSideShowPopUp = false;
        sideShowPopupGroup.visible = false;
    },
    AcceptButtonClicked: function(){
        Client.SideShowDecisionResponseEmit("ACCEPT",currentBetAmount,sendSideShowPlayerID);
        this.HideSideShowPopUp();
    },
    AcceptButtonDownAnimation: function(){
        isTurnTimerOn = false;
        turnTimer = 0;
        game.add.tween(acceptButton.scale).to({ x: 0.35, y: 0.45}, 100, Phaser.Easing.Linear.In, true);
        game.add.tween(acceptText.scale).to({ x: 0.95, y: 0.95}, 100, Phaser.Easing.Linear.In, true);
    },
    AcceptButtonUpAnimation: function(){
        game.add.tween(acceptButton.scale).to({ x: 0.4, y: 0.5}, 100, Phaser.Easing.Linear.In, true);
        game.add.tween(acceptText.scale).to({ x: 1.0, y: 1.0}, 100, Phaser.Easing.Linear.In, true);
        setTimeout(() => {
            this.AcceptButtonClicked();
        }, 100);
    },
    RejectButtonClicked: function(){
        Client.SideShowDecisionResponseEmit("REJECT",currentBetAmount,sendSideShowPlayerID);
        this.HideSideShowPopUp();
    },
    RejectButtonDownAnimation: function(){
        isTurnTimerOn = false;
        turnTimer = 0;
        game.add.tween(rejectButton.scale).to({ x: 0.55, y: 0.45}, 100, Phaser.Easing.Linear.In, true);
        game.add.tween(rejectText.scale).to({ x: 0.95, y: 0.95}, 100, Phaser.Easing.Linear.In, true);
    },
    RejectButtonUpAnimation: function(){
        game.add.tween(rejectButton.scale).to({ x: 0.6, y: 0.5}, 100, Phaser.Easing.Linear.In, true);
        game.add.tween(rejectText.scale).to({ x: 1.0, y: 1.0}, 100, Phaser.Easing.Linear.In, true);
        setTimeout(() => {
            this.RejectButtonClicked();
        }, 100);
    },
    RenderSideShowPopUp: function(){
        if(isSideShowPopUp){
            game.world.bringToTop(sideShowPopupGroup);
        }
    }
}