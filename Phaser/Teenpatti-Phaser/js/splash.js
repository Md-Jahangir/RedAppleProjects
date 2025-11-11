var Splash = function () {};
Splash.prototype = {

    init: function(){
        Utils.ScaleManager();
    },
    preload: function(){
        console.log("Enter into the Splash Page Peload function");
    },
    create: function(){
        var splash = Utils.SpriteSettingsControl(splash,640.0,360.0,'splash',"true","true",0.5,0.5,0.9,0.9);
        this.SetTimeOut();
        SoundManager.CreateSound();
        //SoundManager.PlayBackgroundMusic();
    },
    SetTimeOut: function(){
        setTimeout(this.ChangeState,3000);
    },
    ChangeState: function(){
        StateTransition.TransitToMenu();
    }
};