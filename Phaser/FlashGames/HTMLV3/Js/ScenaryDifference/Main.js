var loadingBg;
var loadingBarFrame;
var loadingBarFill;
var loadingText;
var Main = function() {};
Main.prototype = {
    init: function() {
        console.log("The main Screen.........................");
        Utils.ScaleManager();
    },
    preload: function() {
        game.load.script('GamePlay', 'Js/ScenaryDifference/GamePlay.js');
        LoadAssets.LoadAllAssets();
    },
    create: function() {
        game.state.add('GamePlay', GamePlay);
        game.state.start('GamePlay');
        // SoundManager.CreateSound();
        // loadingBg = Utils.SpriteSettingsControl(loadingBg, 640, 360, 'whitePixel', "true", "true", 0.5, 0.5, 1280, 1280, this);
        // loadingText = game.add.sprite(690, 420, 'lodingText');
        // loadingText.anchor.setTo(0.5)
        // loadingText.animations.add('loading');
    
        // loadingText.animations.play('loading', 100, true);
        // Utils.SpriteSettingsControl(loadingText, 690, 420, 'loadingText',"true", "true", 0.5, 0.5, 0.4, 0.4, this);
        // loadingBarFrame = Utils.SpriteSettingsControl(loadingBarFrame, 670, 470, 'loadBarFrame',"true", "true", 0.5, 0.5, 0.4, 0.25, this);
        // loadingBarFill = Utils.SpriteSettingsControl(loadingBarFill, 380, 470, 'loadBarFill',"true", "true", 0, 0.5, 0.01, 0.15, this);
        // this.LoadingFillTimer();        
    },
    // LoadingFillTimer:function()
    // {
    //     if(loadingBarFill.scale.x<0.24000000000000007)
    //     {
    //         loadingBarFill.scale.x+=0.01;
    //         setTimeout(() => {
    //             this.LoadingFillTimer();
    //         }, 10);
    //     }
    //     else
    //     {
    //         game.state.add('GamePlay', GamePlay);
    //         game.state.start('GamePlay');
    //     }
    // }
};