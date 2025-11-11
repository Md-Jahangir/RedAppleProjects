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
        game.load.script('GamePlay', 'Js/Costumes/GamePlay.js');
        LoadAssets.LoadAllAssets();
    },
    create: function() {
        // SoundManager.CreateSound();
        // game.state.add('GamePlay', GamePlay);
        //     game.state.start('GamePlay');
        mainBackground = Utils.SpriteSettingsControl(gamePlayBackground, 640, 360, 'whitePixel', "true", "true", 0.5, 0.5, 1280, 1280, this);

        // mainWhiteBackground = Utils.SpriteSettingsControl(gameplayWhiteBackground, 640, 360, 'whitePixel', "true", "true", 0.5, 0.5, 1000, 500, this);
        // mainWhiteBackground.tint="0x7884d3"
        // mainBg = Utils.SpriteSettingsControl(gameplayWhiteBackground, 640, 360, 'bg', "true", "true", 0.5, 0.5, 1, 1, this);
        mainBg = Utils.SpriteSettingsControl(mainBg, 685, 295, 'sprite', "true", "true", 0.5, 0.5, 1, 1, "false");
        mainBg.width=1730;
        mainBg.height=610;

        mainBoy = Utils.SpriteSettingsControl(mainBoy, 1190, 320, 'boy', "true", "true", 0.5, 0.5, 0.8, 0.8, this);
        mainGirl = Utils.SpriteSettingsControl(mainGirl, 130, 290, 'girl', "true", "true", 0.5, 0.5, 0.8, 0.8, this);
        nextButton = Utils.ButtonSettingsControl(nextButton, 1076, 445, 'btnNext',this.NextButtonPressed,null,null,null, "true", "true", 0.5, 0.5, 1, 1, this);
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