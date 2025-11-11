var GameOver=function(){};
var highScoreText;
var yourScoreText;
GameOver.prototype={
    
    GameOverCreate:function()
    {
        bulletClickEnable=0;
        handAnimation.destroy();
        console.log("user Score= "+pointCount + "The High score......."+localStorage.getItem('highscore'));
        gameOverlay=Utils.SpriteSettingsControl(gameOverlay,360,640,'white',"true","true",0.5,0.5,720,1280,"true");
        gameOverlay.tint='0x000000';
        gameOverlay.alpha=0.7;
        gameOverBackground=Utils.SpriteSettingsControl(gameOverBackground,360,640,'GameOverBackground',"true","true",0.5,0.5,0.55,0.65,"true");
        gameOverPlayButton=Utils. ButtonSettingsControl(gameOverPlayButton,370,985,'play_buttom',this.PlayButtonClicked,null,null,null,"true","true",0.5,0.5,0.01,0.01,this);
        
        
        gameOverText=Utils.SpriteSettingsControl(gameOverText,360,390,'GameOverText',"true","true",0.5,0.5,0.1,0.1,"true");
        //.............................................................................
        highScoreText=game.add.bitmapText(-350,460,'riffic_free_bold',"High Score",50);
        highScore=game.add.bitmapText(-350,610,'riffic_free_bold',"12345789",80);
        highScore.anchor.setTo(0.5);
        highScore.scale.setTo(1.2);
        //......................................................................
        yourScoreText=game.add.bitmapText(-350,690,'riffic_free_bold',"Your Score",50); 
        yourScore=game.add.bitmapText(-350,840,'riffic_free_bold',"",80);
        yourScore.anchor.setTo(0.5);
        yourScore.setText(pointCount);
        yourScore.scale.setTo(1.2);
        //........................................................
        highScore.setText(localStorage.getItem('highscore'));
        //..........game over tween.....................................................
        game.add.tween(gameOverText.scale).to({ x:0.55,y:0.55},500,Phaser.Easing.Bounce.Out,this).onComplete.add(function(){
            game.add.tween(highScoreText).to({ x : 240 },380,Phaser.Easing.Linear.None,this);
                game.add.tween(highScore).to({ x : 370 },550,Phaser.Easing.Linear.None,this);
                    game.add.tween(yourScoreText).to({ x : 240 },620,Phaser.Easing.Linear.None,this);
                        game.add.tween(yourScore).to({ x : 370 },690,Phaser.Easing.Linear.None,this).onComplete.add(function(){
                            game.add.tween(gameOverPlayButton.scale).to({ x : 0.7, y:0.7 },500,Phaser.Easing.Bounce.Out,this);
                        });
        });
    },
    PlayButtonClicked:function(){
        var tween=game.add.tween(gameOverPlayButton.scale).to({ x : 0.6 , y :0.6 },100,Phaser.Easing.Linear.in,this);
            tween.onComplete.add(function(){
                game.add.tween(gameOverPlayButton.scale).to({ x : 0.7 , y :0.7   },100,Phaser.Easing.Linear.in,this);
            });
          setTimeout(() => {
            StateTransition.TransitToGamePlay();
          }, 200);
           
    }
}