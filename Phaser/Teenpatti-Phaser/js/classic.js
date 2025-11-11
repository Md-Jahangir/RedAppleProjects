var Classic = function () {};
Classic.prototype = {
    init: function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.fullScreenScaleMode=Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        gameState = "Gameplay";
    },
    preload: function(){
        blindCount = 0;
        //game.stage.disableVisibilityChange = true;
        //Debug.log("Enter into the Classic Game Preload Function"+gamePlayType);
        _BG = Utils.SpriteSettingsControl(_BG,640.0,360.0,'bg_3',"true","true",0.5,0.5,0.8,0.8);
        Utils.GenerateBubble();
        Utils.LoadImage();
    },
    create: function(){
        //Debug.log("Enter into the Create Function of Classic ");
        gamePage = "GameplayPage";
        Utils.CreateImage();
    },
    update: function(){
        Utils.GiftIconTopRenderer();
        Utils.DealerIconTopRenderer();
        if(!isPlayerTimer){
            //Debug.log("Enter into the Update function");
            Utils.ChangeTimer(playerId);
            if(angle > 6.28){
                isPlayerTimer = true;
                Utils.HideTimer(playerId);
            }
        }
        // if(timeRemaining <= 0){
        //     if(!isTimeRemainingPopUp){
        //         Debug.log("Enter into the Hide Waiting Opponent Panel.........."+timeRemaining);
        //         OpponentWaitingPanel.EnableDisableTimerPopUp(false);
        //         game.time.events.stop();
        //         isTimeRemainingPopUp = true;
        //     }
        // }
        Utils.ShowCardToTop();
        Utils.SeeButtonRender();
        Utils.ShowSeenCardToTop();
        Rules.RulesBringToTop();
        Loading.RotateLoadingPopUp();
        Utils.InHandMoneyTopRenderer();
        MenuController.MenuBringToTop();
        PopUp.ShowCommonPopUp();
        InfoPopUp.UpdateInfoPopUp();
        SideShowPopUp.RenderSideShowPopUp();
        Gift.UpdateRender();
        ChatBox.RenderChatBox();
        //SideShowTimer
        // Utils.SideShowTimer();
     },
     render: function(){
        //game.debug.text('FPS: ' + game.time.fps || 'FPS: --', 40, 40, "#00ff00");
     }
};