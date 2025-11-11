var splash=function(){};
var splashBackground;
var splashPlay;
var splashTitle;
splash.prototype={

        init:function()
        {
            // Debug.log(" splash init...",'splash_init');
            // Utils.ScaleManager();
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;
            // game.stage.disableVisibilityChange = true;
        },
        preload:function()
        {
            // Debug.log(" splash preload...",'splash_preload');
        },
        create:function()
        {
            // Debug.log(" splash create...",'splash_create');
            var backOver=Utils.SpriteSettingsControl(backOver,360,640,'one',"true","true",0.5,0.5,720,1280,"true");
           game.add.tween(backOver).to({ alpha : 0},500,Phaser.Easing.Linear.None,this);
          
                setTimeout(() => {
                    splashBackground=Utils.SpriteSettingsControl(splashBackground,360,640,'splash_bg',"true","true",0.5,0.5,0.65,0.53,"true");
                    splashPlay=Utils.ButtonSettingsControl(splashPlay,360,740,'splash_Play',this.PlayButtonPressed,null,null,null,"true","true",0.5,0.5,0.5,0.5,this);
                    splashTitle=Utils.SpriteSettingsControl(splashTitle,345,250,'splash_Title',"true","true",0.5,0.5,0.5,0.5,"true");
                }, 300);
               
          
            
        },
        PlayButtonPressed:function()
        {
            var tween=game.add.tween(splashPlay.scale).to({ x : 0.4 , y :0.4 },100,Phaser.Easing.Linear.in,this);
            tween.onComplete.add(function(){
                game.add.tween(splashPlay.scale).to({ x : 0.5 , y :0.5   },100,Phaser.Easing.Linear.in,this);
            });
            // setTimeout(() => {
            //     game.state.add('GamePlay', GamePlay);
            //     game.state.start('GamePlay');
            // }, 300);
            setTimeout(() => {
                game.state.add('menu', menu);
                game.state.start('menu');
            }, 300);
            
        }






















}