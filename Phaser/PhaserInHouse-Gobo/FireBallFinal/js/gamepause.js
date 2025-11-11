var GamePause={
    
    GamePauseCreate:function(){
        // game.paused=true;
        timerPause=0;
        gamePauseGroup=game.add.group();
        handAnimation.alpha=0;
        console.log("user Score= "+pointCount + "The High score......."+localStorage.getItem('highscore'));
        gamePauseOverlay=Utils.SpriteSettingsControl(gamePauseOverlay,360,640,'white',"true","true",0.5,0.5,720,1280,"true");
        gamePauseOverlay.tint='0x000000';
        gamePauseOverlay.alpha=0.7;
       
        gamePauseOverBackground=Utils.SpriteSettingsControl(gamePauseOverBackground,360,640,'GameOverBackground',"true","true",0.5,0.5,0.55,0.35,"true");
        gamePausePlayButton=Utils.ButtonSettingsControl(gamePausePlayButton,360,820,'play_buttom',this.GameShow,null,null,null,"true","true",0.5,0.5,0,0,this);
         //.............................................................................
        gamePauseOverText=game.add.bitmapText(360,540,'riffic_free_bold',"Game Paused",70);
        gamePauseOverText.scale.setTo(0.1);
        gamePauseOverText.anchor.setTo(0.5);
        game.add.tween(gamePauseOverText.scale).to({ x : 1 ,y : 1},500,Phaser.Easing.Bounce.Out,this).onComplete.add(function(){
          game.add.tween(gamePausePlayButton.scale).to({ x : 0.9 ,y : 0.9},500,Phaser.Easing.Circular.Out,this)
        });
       
        game.world.bringToTop(gamePauseOverlay);
        gamePauseGroup.add(gamePauseOverlay);
        gamePauseGroup.add(gamePauseOverBackground);
        gamePauseGroup.add(gamePausePlayButton);
        gamePauseGroup.add(gamePauseOverText);
       
    },
   GameShow:function()
    {
        console.log("game show");
        // game.paused=false;
        var tween=game.add.tween(gamePausePlayButton.scale).to({ x : 0.8 , y :0.8 },100,Phaser.Easing.Linear.in,this);
            tween.onComplete.add(function(){
                game.add.tween(gamePausePlayButton.scale).to({ x : 0.9 , y :0.9   },100,Phaser.Easing.Linear.in,this);
            });
          setTimeout(() => {
            gamePauseGroup.visible=false;
            handAnimation.alpha=1;
            timerPause=1;
            GamePlay.prototype.GameStart();
          }, 200);
      
    },
   
}