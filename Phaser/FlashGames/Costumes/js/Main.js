var mainBackground;
var  mainWhiteBackground;
var mainBg;
var mainBoy;
var mainGirl;
var nextButton;
var Main = function() {};
Main.prototype = {
    init: function() {
        console.log("The main Screen.........................");
        Utils.ScaleManager();
    },
    preload: function() {
        game.load.script('GamePlay', 'js/GamePlay.js');
        LoadAssets.LoadAllAssets();
    },
    create: function() {
        // SoundManager.CreateSound();
        mainBackground = Utils.SpriteSettingsControl(gamePlayBackground, 640, 360, 'whitePixel', "true", "true", 0.5, 0.5, 1280, 1280, this);

        mainWhiteBackground = Utils.SpriteSettingsControl(gameplayWhiteBackground, 640, 360, 'whitePixel', "true", "true", 0.5, 0.5, 1000, 500, this);
        mainWhiteBackground.tint="0x7884d3"
        mainBg = Utils.SpriteSettingsControl(gameplayWhiteBackground, 640, 360, 'bg', "true", "true", 0.5, 0.5, 1, 1, this);
        mainBg = Utils.SpriteSettingsControl(mainBg, 713, 370, 'sprite', "true", "true", 0.5, 0.5, 1, 1, "false");
        mainBg.width=1448;
        mainBg.height=550;

        mainBoy = Utils.SpriteSettingsControl(mainBoy, 1190, 400, 'boy', "true", "true", 0.5, 0.5, 0.8, 0.8, this);
        mainGirl = Utils.SpriteSettingsControl(mainGirl, 130, 370, 'girl', "true", "true", 0.5, 0.5, 0.8, 0.8, this);
        nextButton = Utils.ButtonSettingsControl(nextButton, 1076, 535, 'btnNext',this.NextButtonPressed,null,null,null, "true", "true", 0.5, 0.5, 1, 1, this);
        nextButton.inputEnabled=false;
        nextButton.visible=false;         
        game.add.tween(mainBoy).to({ x : 790 },1000,Phaser.Easing.Linear.NONE,true);   
         game.add.tween(mainGirl).to({ x : 530 },1000,Phaser.Easing.Linear.NONE,true).onComplete.add(function()
         {
            nextButton.inputEnabled=true;
            nextButton.visible=true;
         });   
    
    },
    NextButtonPressed:function()
    {
        console.log("next button pressed");
        // if(loadingBarFill.scale.x<0.24000000000000007)
        // {
        //     loadingBarFill.scale.x+=0.01;
        //     setTimeout(() => {
        //         this.LoadingFillTimer();
        //     }, 10);
        // }
        // else
        // {

            game.state.add('GamePlay', GamePlay);
            game.state.start('GamePlay');
        // }
    }
};