var pausePopupGroup;
var pausePopupMenuBttn;
var pausePopupResumeBttn;
var pausePopupReplayBttn;
var PausePopup = {
    CreatePausePopup: function(){

        pausePopupGroup = game.add.group();
        var pausePopupBg = Utils.ButtonSettingsControl(pausePopupMenuBttn, game.world.centerX,game.world.centerY, 'blueOverlay', this.HidePausePopup,null,null,null, "true", "true", 0.5, 0.5, 1, 1,this);
        //Utils.SpriteSettingsControl(pausePopupBg,game.world.centerX,game.world.centerY,'blueOverlay',"true","true",0.5,0.5,1,1);
        var pausePopupBase = Utils.SpriteSettingsControl(pausePopupBase,game.world.centerX,660,'winPopupBase',"true","true",0.5,0.5,0.5,0.5);
        var pausePopupText = Utils.SpriteSettingsControl(pausePopupText,game.world.centerX,460,'pauseTxt',"true","true",0.5,0.5,0.5,0.5);
        pausePopupMenuBttn = Utils.ButtonSettingsControl(pausePopupMenuBttn, game.world.centerX - 150, 650.0, 'menuBttn', this.PauseMenuBttnDownAnimation,null,null,this.PauseMenuBttnUpAnimation, "true", "true", 0.5, 0.5, 0.5, 0.5,this);
        pausePopupResumeBttn = Utils.ButtonSettingsControl(pausePopupResumeBttn, game.world.centerX + 150, 650.0, 'resumeBttn', this.PauseResumeBttnDownAnimation,null,null, this.PauseResumeBttnUpAnimation, "true", "true", 0.5, 0.5, 0.5, 0.5,this);
        pausePopupReplayBttn = Utils.ButtonSettingsControl(pausePopupReplayBttn, game.world.centerX, 650.0, 'replayBttn', this.PauseReplayBttnDownAnimation,null,null, this.PauseReplayBttnUpAnimation, "true", "true", 0.5, 0.5, 0.5, 0.5,this);
    
        pausePopupGroup.add(pausePopupBg);
        pausePopupGroup.add(pausePopupBase);
        pausePopupGroup.add(pausePopupText);
        pausePopupGroup.add(pausePopupText);
        pausePopupGroup.add(pausePopupMenuBttn);
        pausePopupGroup.add(pausePopupResumeBttn);
        pausePopupGroup.add(pausePopupReplayBttn);
        
        pausePopupGroup.visible = false;
        pausePopupGroup.aplha = 0;
    },
    ShowPausePopup: function(){
        pausePopupGroup.visible = true;
        game.world.bringToTop(pausePopupGroup);
        game.add.tween(pausePopupGroup).to({ alpha: 1 }, 200, Phaser.Easing.Linear.Out, true);
    },
    HidePausePopup: function(){
        game.paused = false;
        var hidePauseGroupTween = game.add.tween(pausePopupGroup).to({ alpha: 0 }, 200, Phaser.Easing.Linear.Out, true);
        hidePauseGroupTween.onComplete.add(function(){
            pausePopupGroup.visible = false;
        });
    },

    PauseMenuBttnDownAnimation: function(){
        game.paused = false;
        game.add.tween(pausePopupMenuBttn.scale).to({ x: 0.4, y: 0.4}, 400, Phaser.Easing.Bounce.Out, true);
        SoundManager.PlayButtonSFX();
    },
    PauseMenuBttnUpAnimation: function(){
        console.log("l;kfjshdjfdsjfdskjfsh");
        setTimeout(() => {
            game.add.tween(pausePopupMenuBttn.scale).to({ x: 0.5, y: 0.5}, 400, Phaser.Easing.Bounce.Out, true);
        }, 500);
        this.PauseMenuBttnClick();
    },
    PauseMenuBttnClick: function(){
        setTimeout(() => {
            StateTransition.TransitToMenu();
        },1000);
    },

    PauseResumeBttnDownAnimation: function(){
        game.paused = false;
        game.add.tween(pausePopupResumeBttn.scale).to({ x: 0.4, y: 0.4}, 400, Phaser.Easing.Bounce.Out, true);
        SoundManager.PlayButtonSFX();
    },
    PauseResumeBttnUpAnimation: function(){
        game.add.tween(pausePopupResumeBttn.scale).to({ x: 0.5, y: 0.5}, 400, Phaser.Easing.Bounce.Out, true);
        this.PauseResumeBttnClick();
    },
    PauseResumeBttnClick: function(){
        console.log("Resume Button Click");
        setTimeout(() => {
            this.HidePausePopup();
        }, 400);
    },

    PauseReplayBttnDownAnimation: function(){
        game.paused = false;
        game.add.tween(pausePopupReplayBttn.scale).to({ x: 0.4, y: 0.4}, 400, Phaser.Easing.Bounce.Out, true);
        SoundManager.PlayButtonSFX();
    },
    PauseReplayBttnUpAnimation: function(){
        game.add.tween(pausePopupReplayBttn.scale).to({ x: 0.5, y: 0.5}, 400, Phaser.Easing.Bounce.Out, true);
        this.PauseReplayBttnClick();
    },  
    PauseReplayBttnClick: function(){
        setTimeout(() => {
            StateTransition.TransitToGamePlay();
        },400);
    },
}