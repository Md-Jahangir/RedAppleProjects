var loosePopupGroup;
var LoosePopup = {
    CreateLoosePopup: function(){

        loosePopupGroup = game.add.group();

        winPopupBg = Utils.ButtonSettingsControl(winPopupBg, game.world.centerX,game.world.centerY, 'blueOverlay', null,null,null, null, "true", "true", 0.5, 0.5, 1, 1,this);

        oopsTxt = Utils.SpriteSettingsControl(oopsTxt,game.world.centerX,360,'oops',"true","true",0.5,0.5,0.5,0.5);
        tryAgainTxt = Utils.SpriteSettingsControl(tryAgainTxt,game.world.centerX,480,'tryAgainTxt',"true","true",0.5,0.5,0.5,0.5);
        winPopupBase = Utils.SpriteSettingsControl(winPopupBase,game.world.centerX,660,'winPopupBase',"true","true",0.5,0.5,0.5,0.5);
        menuBttn = Utils.ButtonSettingsControl(menuBttn, game.world.centerX - 80, 650.0, 'menuBttn', this.MenuBttnDownAnimation,null,null, this.MenuBttnUpAnimation, "true", "true", 0.5, 0.5, 0.5, 0.5,this);
        looseReplayBttn = Utils.ButtonSettingsControl(looseReplayBttn,  game.world.centerX + 80, 650.0, 'replayBttn', this.ReplayBttnDownAnimation,null,null, this.ReplayBttnUpAnimation, "true", "true", 0.5, 0.5, 0.5, 0.5,this);

        loosePopupGroup.add(winPopupBg);
        loosePopupGroup.add(oopsTxt);
        loosePopupGroup.add(tryAgainTxt);
        loosePopupGroup.add(winPopupBase);
        loosePopupGroup.add(menuBttn);
        loosePopupGroup.add(looseReplayBttn);

        loosePopupGroup.visible = false;
        loosePopupGroup.alpha = 0;
    },
    ShowLoosePopup: function(){
        loosePopupGroup.visible = true;
        game.world.bringToTop(loosePopupGroup);
        game.add.tween(loosePopupGroup).to({ alpha: 1 }, 400, Phaser.Easing.Linear.Out, true);
    },
    HideLoosePopup: function(){
        var hideLooseGroupTween = game.add.tween(loosePopupGroup).to({ alpha: 0 }, 200, Phaser.Easing.Linear.Out, true);
        hideLooseGroupTween.onComplete.add(function(){
            loosePopupGroup.visible = false;
        });
    },
    MenuBttnDownAnimation: function(){
        game.add.tween(menuBttn.scale).to({ x: 0.4, y: 0.4}, 400, Phaser.Easing.Linear.Out, true);
        SoundManager.PlayButtonSFX();
    },
    MenuBttnUpAnimation: function(){
        game.add.tween(menuBttn.scale).to({ x: 0.5, y: 0.5}, 400, Phaser.Easing.Linear.Out, true);
        menuBttn.inputEnable = false;
        setTimeout(() => {
            this.MenuBttnClick();
        }, 500);
    },
    MenuBttnClick: function(){
        this.HideLoosePopup();
        menuBttn.inputEnable = true;
        StateTransition.TransitToMenu();
    },

    ReplayBttnDownAnimation: function(){
        game.add.tween(looseReplayBttn.scale).to({ x: 0.4, y: 0.4}, 400, Phaser.Easing.Linear.Out, true);
        SoundManager.PlayButtonSFX();
    },
    ReplayBttnUpAnimation: function(){
        game.add.tween(looseReplayBttn.scale).to({ x: 0.5, y: 0.5}, 400, Phaser.Easing.Linear.Out, true);
        looseReplayBttn.inputEnable = false;
        setTimeout(() => {
            this.ReplayBttnClick();
        }, 500);
    },
    ReplayBttnClick: function(){
        this.HideLoosePopup();
        looseReplayBttn.inputEnable = true;
        StateTransition.TransitToGamePlay();
    },
}