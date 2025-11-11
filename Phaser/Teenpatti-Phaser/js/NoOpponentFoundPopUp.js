var noopponentGroup;
var smileySheet;
var refreshButton;
var refreshButtonText;
var backBttn;
var backButtonText;
var NoOpponentFoundPopUp = {
    GeneratePopup: function(message) {

        var isShowNoOpponentPopUp = false;

        var noOpponentPopUpOverlay =  Utils.SpriteSettingsControl(noOpponentPopUpOverlay,640,300,'blackOnePixel',"true","true",0.5,0.5,2800,2800,"true");
       // var noOpponentPopUpOverlay = Utils.ButtonSettingsControl(noOpponentPopUpOverlay,640,300,'blackOnePixel',this.HidePopUpPanel,null,null,null,"true","true",0.5,0.5,2800,2800,this);
        noOpponentPopUpOverlay.alpha = 0.5;

        noopponentGroup = game.add.group();
        noopponentGroup.position.set(0, -680);

        var noOpponentPopUpMessageText = Utils.TextSettingsControl(noOpponentPopUpMessageText,640.0,230.0,message,"true","false",0.5,0.5,0.0,0.0,"Arial","bold","#ffffff","center","30px");
        var noOpponentPopUpBase =  Utils.SpriteSettingsControl(noOpponentPopUpBase,640,360,'popupBase',"true","true",0.5,0.5,0.5,0.5,"true");

        refreshButton = Utils.ButtonSettingsControl(refreshButton,500.0,440.0,'green_base',this.RefreshButtonDownAnimation,null,null,this.RefreshButtonUpAnimation,"true","true",0.5,0.5,0.5,0.5,this);
        refreshButtonText = Utils.TextSettingsControl(refreshButtonText,500.0,435.0,'REFRESH',"true","false",0.5,0.5,0.0,0.0,"Arial","bold","#ffffff","center","25px");

        backBttn = Utils.ButtonSettingsControl(backBttn,800.0,440.0,'green_base',this.BackBttnDownAnimation,null,null,this.BackBttnUpAnimation,"true","true",0.5,0.5,0.5,0.5,this);
        backButtonText = Utils.TextSettingsControl(backButtonText,800.0,435.0,'BACK',"true","false",0.5,0.5,0.0,0.0,"Arial","bold","#ffffff","center","25px");

        noopponentGroup.add(noOpponentPopUpOverlay);
        noopponentGroup.add(noOpponentPopUpBase);
        noopponentGroup.add(refreshButton);
        noopponentGroup.add(backBttn);
        noopponentGroup.add(refreshButtonText);
        noopponentGroup.add(backButtonText);
        noopponentGroup.add(noOpponentPopUpMessageText);
        this.DummySmileyAnimation();
        noopponentGroup.add(smileySheet);
        noopponentGroup.visible = true;

        //Open Pop up
        game.add.tween(noopponentGroup).to( { x: 0, y: 0 }, 1200, Phaser.Easing.Bounce.Out, true);


        isShowNoOpponentPopUp = true;

        //For Animation Text
        //game.time.events.stop();
        if(roundText != null){
            roundText.destroy();
        }
    },
    ShowCommonPopUp: function(){
        if(isShowNoOpponentPopUp){
            game.world.bringToTop(commonPopupGroup);
        }
    },
    RefreshBttnClick: function(){
        opponentPanelGraphicsCounter = 1;
        this.HidePopUpPanel();
        Utils.DestroyListStartIndex();
        onlineServerEvent.FireOnConnectionSuccessEvent();
    },
    RefreshButtonDownAnimation: function(){
        game.add.tween(refreshButton.scale).to({ x: 0.45, y: 0.45}, 100, Phaser.Easing.Linear.Out, true);
        game.add.tween(refreshButtonText.scale).to({ x: 0.95, y: 0.95}, 100, Phaser.Easing.Linear.Out, true);
    },
    RefreshButtonUpAnimation: function(){
        game.add.tween(refreshButton.scale).to({ x: 0.5, y: 0.5}, 100, Phaser.Easing.Linear.Out, true);
        game.add.tween(refreshButtonText.scale).to({ x: 1.0, y: 1.0}, 100, Phaser.Easing.Linear.Out, true);
        setTimeout(() => {
            this.RefreshBttnClick();
        }, 100);
    },
    BackButtonClick: function(){
        this.HidePopUpPanel();
        setTimeout(() => {
            Utils.GameRefresh();
            Utils.DestroyDeafultPlayerSprite();
            StateTransition.TransitToMenu(); 
        }, 400);
    },
    BackBttnDownAnimation: function(){
        game.add.tween(backBttn.scale).to({ x: 0.45, y: 0.45}, 100, Phaser.Easing.Linear.Out, true);
        game.add.tween(backButtonText.scale).to({ x: 0.95, y: 0.95}, 100, Phaser.Easing.Linear.Out, true);
    },
    BackBttnUpAnimation: function(){
        game.add.tween(backBttn.scale).to({ x: 0.5, y: 0.5}, 100, Phaser.Easing.Linear.Out, true);
        game.add.tween(backButtonText.scale).to({ x: 1.0, y: 1.0}, 100, Phaser.Easing.Linear.Out, true);
        setTimeout(() => {
            this.BackButtonClick();
        }, 100);
    },
    HidePopUpPanel: function(){
        game.add.tween(noopponentGroup).to( { x: 0, y: -680 }, 400, Phaser.Easing.Linear.Out, true);
        setTimeout(() => {
            noopponentGroup.visible = false;
            isShowCommonPopUp = false;
        }, 400);
    },
    // ButtonClickAnimation: function(buttonSprite,buttonClickFunction){
    //     game.add.tween(buttonSprite.scale).to( { x: 1.1, y: 1.1 }, 100, Phaser.Easing.Linear.In, true);
    //     setTimeout(() => {
    //         game.add.tween(buttonSprite.scale).to( { x: 1.0, y: 1.0 }, 100, Phaser.Easing.Linear.In, true);
    //     }, 100);
    //     setTimeout(() => {
    //         this.buttonClickFunction();
    //     }, 200);
    // }
    DummySmileyAnimation: function(){
        smileySheet = game.add.sprite(game.world.centerX, game.world.centerY - 30, 'smiley');
        smileySheet.anchor.setTo(0.5,0.5);
        smileySheet.scale.setTo(0.6,0.6);
        var anim = smileySheet.animations.add('anim');
        smileySheet.animations.play('anim',8, true);
    },
}