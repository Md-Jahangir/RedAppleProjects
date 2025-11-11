var Muflis = function () {};
Muflis.prototype = {
    init: function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.fullScreenScaleMode=Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        gameState = "Gameplay";
    },
    preload: function(){
        blindCount = 0;
        //Debug.log("Enter into the Classic Game Preload Function"+gamePlayType);
        _BG = Utils.SpriteSettingsControl(_BG,640.0,360.0,'bg_3',"true","true",0.5,0.5,0.8,0.8);
        Utils.GenerateBubble();
        Utils.LoadImage();
    },
    create: function(){
        //Debug.log("Enter into the Create Function of Classic ");
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
        //         isTimeRemainingPopUp = true;
        //     }
        // }
        Utils.ShowCardToTop();
        Utils.SeeButtonRender();
        Utils.ShowSeenCardToTop();
        // PopUp.ShowCommonPopUp();
        Rules.RulesBringToTop();
        MenuController.MenuBringToTop();
        Utils.InHandMoneyTopRenderer();
        PopUp.ShowCommonPopUp();
        InfoPopUp.UpdateInfoPopUp();
        SideShowPopUp.RenderSideShowPopUp();
        ChatBox.RenderChatBox();
        Gift.UpdateRender();
     },
     render: function(){
        // game.debug.text('FPS: ' + game.time.fps || 'FPS: --', 40, 40, "#00ff00");
     }
};