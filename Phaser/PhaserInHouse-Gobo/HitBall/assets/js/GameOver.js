var gameOverGroup;
// var gameOverBackground;
var nextButton;
var isGameOver=1;
var gameOverBackground;
var GameOverPopUp={

                GameOverCreate:function()
                {
                    if(isGameOver==1)
                    {
                            isGameOver=0;
                            timerControl=0;
                            planetDisplay=0;
                            handAnimation.destroy();
                            console.log("timer control ="+timerControl);
                            bullet.visible=false;
                            game.pause=false;
                            tutorialTargetText.alpha=0;
                            bullet.position.x=1280;
                            var gameOverOverlay=Utils.ButtonSettingsControl(gameOverOverlay,360,640,'one',this.GameOverOverlayFunc,null,null,null,"true","true",0.5,0.5,720,1280,this);
                            gameOverOverlay.tint="0x000000";
                            gameOverOverlay.alpha=0.9;
                            // var gameOverBackground=Utils.SpriteSettingsControl(gameOverBackground,360,640,'gameOverBackground',"true","true",0.5,0.5,0.5,0.5,this);
                        
                            // gameOverBackground.visible=false;
                        
                            console.log("Game over popup");
                            gameOverGroup=game.add.group();
                            setTimeout(() => {
                            
                                gameOverBackground=Utils.SpriteSettingsControl(gameOverBackground,360,640,'gameOverBackground',"true","true",0.5,0.5,0.5,0.5,this);
                                var gameOverText=game.add.bitmapText(360,400,'riffic_free_bold','Game Over',94);
                                gameOverText.anchor.setTo(0.5);
                                gameOverText.scale.setTo(0.1);
                                // gameOverText.addColor("#FFFFFF",1);
                                gameOverText.tint="0xFFFFFF";
                                var gameOverTextTween= game.add.tween(gameOverText.scale).to({ x:1,y:1 },1000,Phaser.Easing.Bounce.Out,this);
                                var highScoreText=game.add.bitmapText(-260,500,'riffic_free_bold','High Score',64);
                                highScoreText.anchor.setTo(0.5);
                                var highScore=game.add.bitmapText(-260,580,'riffic_free_bold',localStorage.getItem('highscore_HITBALL'),44);
                                highScore.anchor.setTo(0.5);
                                var yourScoreText=game.add.bitmapText(-260,680,'riffic_free_bold','Your Score',64);
                                yourScoreText.anchor.setTo(0.5);
                                nextButton=Utils.ButtonSettingsControl(nextButton,360,880,'nextButton',this.nextButtonFunc,null,null,null,"true","true",0.5,0.5,0,0,this);
                            if(pointCounter==0)
                            {
                                var yourScore=game.add.bitmapText(-260,750,'riffic_free_bold','0',44);
                            }
                            else
                            var yourScore=game.add.bitmapText(-260,750,'riffic_free_bold',pointCounter,44);
                                yourScore.anchor.setTo(0.5);
                                // highScoreText.scale.setTo(0.1);
                                setTimeout(() => {
                                    game.add.tween(highScoreText).to({ x:360 },500,Phaser.Easing.Linear.None,this);
                                }, 600);
                                setTimeout(() => {
                                    game.add.tween(highScore).to({ x:360 },500,Phaser.Easing.Linear.None,this);
                                }, 800);
                                setTimeout(() => {
                                    game.add.tween(yourScoreText).to({ x:360 },500,Phaser.Easing.Linear.None,this);
                                }, 1000);
                                setTimeout(() => {
                                    game.add.tween(yourScore).to({ x:360 },500,Phaser.Easing.Linear.None,this);
                                }, 1200);
                                setTimeout(() => {
                                    game.add.tween(nextButton.scale).to({ x:0.4,y:0.4 },1000,Phaser.Easing.Bounce.Out,this);
                                }, 1400);
                                //..........Adding to group.............
                                gameOverGroup.add(gameOverBackground);
                                gameOverGroup.add(gameOverText);
                                gameOverGroup.add(highScoreText);
                                gameOverGroup.add(highScore);
                                gameOverGroup.add(yourScoreText);
                                gameOverGroup.add(yourScore);
                                }, 600);
                            } 
                        

                        },
                        nextButtonFunc:function()
                        {
                        
                            var buttonTween= game.add.tween(nextButton.scale).to({ x:0.3,y:0.3 },80,Phaser.Easing.Bounce.Out,this);
                            buttonTween.onComplete.add( function()
                            {
                                    game.add.tween(nextButton.scale).to({ x:0.4,y:0.4 },80,Phaser.Easing.Bounce.Out,this)
                            });
                            setTimeout(() => {
                              
                                game.state.add('GamePlay',GamePlay);
                                game.state.start('GamePlay');
                            }, 200);
                        
                        },
                        GameOverOverlayFunc:function()
                        {}






};
