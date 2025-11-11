var pausePopUpGroup;
var pauseBackground;
var pauseText;
var replayButton;
var nextButton;
var playButton;
var replayButtonCheck=1;
var pausePopUp={

    pausePopUpCreate:function()
    {
        rotateCheck=0;
        pausePopUpGroup=game.add.group();
        pauseBackground=Utils.ButtonSettingsControl(pauseBackground,360,640,'one',this.PauseBackgroundFunc,null,null,null,"true","true",0.5,0.5,720,1280,this);
        pauseBackground.tint="0x000000";
        pauseBackground.alpha=0.8;
        tutorialTargetText.alpha=0;
        fireText.alpha=0;
        pauseText=Utils.SpriteSettingsControl(pauseText,380,760,'gamePausedText',"true","true",0.5,0.5,0.5,0.5,this);
        playButton=Utils.ButtonSettingsControl(playButton,1200,940,'playButton',this.playButtonClicked,null,null,null,"true","true",0.5,0.5,0.4,0.4,this);
        replayButton=Utils.ButtonSettingsControl(replayButton,-220,940,'replayButton',this.replayButtonClicked,null,null,null,"true","true",0.5,0.5,0.4,0.4,this);
        //  nextButton=Utils.ButtonSettingsControl(nextButton,900,940,'nextButton',this.nextButtonClicked,null,null,null,"true","true",0.5,0.5,0.4,0.4,this);
        pausePopUpGroup.add(pauseBackground);
        pausePopUpGroup.add(pauseText);
        pausePopUpGroup.add(playButton);
        pausePopUpGroup.add(replayButton);
        //  pausePopUpGroup.add(nextButton);
        game.time.events.repeat(100,4,this.BlinkText);
        //  while(i<2)
        //  {
        
            // i++;
        //  }
        var tween=game.add.tween(playButton).to({ x : 450 },200,Phaser.Easing.Linear.In,this);
        tween.onComplete.add(function()
        {
           game.add.tween(replayButton).to({ x : 290 },100,Phaser.Easing.Linear.In,this);
        })
        
    },
    playButtonClicked:function()
    {
        pauseBackground.destroy();
      
        var tween=game.add.tween(playButton.scale).to({ x : 0.3 , y :0.3 },100,Phaser.Easing.Linear.in,this);
        tween.onComplete.add(function(){
            game.add.tween(playButton.scale).to({ x : 0.4 , y :0.4   },100,Phaser.Easing.Linear.in,this);
        });  
        setTimeout(() => {
            pauseText.destroy();
            playButton.destroy();
            replayButton.destroy();
            handAnimation.alpha=1;
            rotateCheck=1;
            pauseButtonCheck=1;
            timerControl=1;
            tutorialTargetText.alpha=1;
            fireText.alpha=1;
        }, 100);
     
    },
    replayButtonClicked:function()
    {
        if(replayButtonCheck==1)
        {
            var tween=game.add.tween(replayButton.scale).to({ x : 0.3 , y :0.3 },100,Phaser.Easing.Linear.in,this);
            tween.onComplete.add(function(){
                game.add.tween(replayButton.scale).to({ x : 0.4 , y :0.4   },100,Phaser.Easing.Linear.in,this);
            });
            replayButtonCheck=0;
            setTimeout(() => {
                StateTransition.TransitToGamePlay();  
            }, 300);
        }
       
    },
    nextButtonClicked:function()
    {},
    PauseBackgroundFunc:function()
    {},
    BlinkText:function()
    {
        var pauseTextTween=game.add.tween(pauseText).to({ alpha : 0.5 },100,Phaser.Easing.Linear.In,this);
        pauseTextTween.onComplete.add(function()
        {
            game.add.tween(pauseText).to({ alpha : 1 },100,Phaser.Easing.Linear.In,this);
        });
    }
    
}