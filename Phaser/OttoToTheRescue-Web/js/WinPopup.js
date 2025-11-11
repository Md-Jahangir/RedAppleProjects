var winPopupGroup;
var starArray = [];
var previousStarCount = 0;
var WinPopup = {
    CreateWinPopup: function(){
        winPopupGroup = game.add.group();

        winPopupBg = Utils.ButtonSettingsControl(winPopupBg, game.world.centerX,game.world.centerY, 'blueOverlay', null,null,null, null, "true", "true", 0.5, 0.5, 1, 1,this);
        winGlow = Utils.SpriteSettingsControl(winGlow,game.world.centerX,500,'glow',"true","true",0.5,0.5,0.5,0.5);
        winPopupBase = Utils.SpriteSettingsControl(winPopupBase,game.world.centerX,660,'winPopupBase',"true","true",0.5,0.5,0.5,0.5);
        winText = Utils.SpriteSettingsControl(winText,game.world.centerX,460,'winText',"true","true",0.5,0.5,0.5,0.5);
        menuBttn = Utils.ButtonSettingsControl(menuBttn, game.world.centerX - 150, 650.0, 'menuBttn', this.MenuBttnDownAnimation,null,null, this.MenuBttnUpAnimation, "true", "true", 0.5, 0.5, 0.5, 0.5,this);
        nextBttn = Utils.ButtonSettingsControl(nextBttn,  game.world.centerX + 150, 650.0, 'nextBttn', this.NextBttnDownAnimation,null,null, this.NextBttnUpAnimation, "true", "true", 0.5, 0.5, 0.5, 0.5,this);
        winReplayBttn = Utils.ButtonSettingsControl(winReplayBttn,  game.world.centerX, 650.0, 'replayBttn', this.ReplayBttnDownAnimation,null,null, this.ReplayBttnUpAnimation, "true", "true", 0.5, 0.5, 0.5, 0.5,this);

        //lightParticle =  Utils.SpriteSettingsControl(lightParticle,game.world.centerX,game.world.centerY,'lightParticle',"true","true",0.5,0.5,0.5,0.5);
        winPopupGroup.add(winPopupBg);
        winPopupGroup.add(winGlow);
        winPopupGroup.add(winPopupBase);
        winPopupGroup.add(winText);
        winPopupGroup.add(menuBttn);
        winPopupGroup.add(nextBttn);
        winPopupGroup.add(winReplayBttn);

        for(var i = 0;i<5;i++){
            starArray[i] = Utils.SpriteSettingsControl(starInactive,180+(i*90),350,'winstarInActive',"true","true",0.5,0.5,0.5,0.5);
            winPopupGroup.add(starArray[i]);
        }
        // winPopupGroup.add(lightParticle);

        winPopupGroup.position.setTo(0,80);
        winPopupGroup.visible = false;
        winPopupGroup.alpha = 0;
    },
    ShowWinPopup: function(){
        winPopupGroup.visible = true;
        game.world.bringToTop(winPopupGroup);
        this.CreateStar();
        game.add.tween(winPopupGroup).to({ alpha: 1 }, 400, Phaser.Easing.Linear.Out, true);
    },
    HideWinPopup: function(){
        var hideWinGroupTween = game.add.tween(winPopupGroup).to({ alpha: 0 }, 200, Phaser.Easing.Linear.Out, true);
        hideWinGroupTween.onComplete.add(function(){
            winPopupGroup.visible = false;
        });
    },
    CreateStar: function(){
        previousStarCount = 0;
        for(var i = 0;i<5;i++){
            if(Database.LoadData("isLevelActive"+(levelNumber-1)+"isStarActive"+i) == 1){
                previousStarCount++;
            }
        }
        console.log("The previous counter,................"+previousStarCount);
        if(previousStarCount < starCount){
            for(var i = 0;i<starCount;i++){
                if(starArray[i] != null){
                    starArray[i].loadTexture('winstarActive');
                    Database.SaveData("isLevelActive"+(levelNumber-1)+"isStarActive"+i,1);
                }
            }
        }
        else{
            for(var i = 0;i<previousStarCount;i++){
                if(starArray[i] != null){
                    starArray[i].loadTexture('winstarActive');
                }
            }
        }
        Database.SaveData("isLevelActive"+levelNumber,1);
        Database.SaveData("lastLevel",curretLevelCounter+1);
    },
    MenuBttnDownAnimation: function(){
        game.add.tween(menuBttn.scale).to({ x: 0.45, y: 0.45}, 400,Phaser.Easing.Linear.Out, true);
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
        this.HideWinPopup();
        menuBttn.inputEnable = true;
        StateTransition.TransitToMenu();
    },

    ReplayBttnDownAnimation: function(){
        game.add.tween(winReplayBttn.scale).to({ x: 0.45, y: 0.45}, 400, Phaser.Easing.Linear.Out, true);
        SoundManager.PlayButtonSFX();
    },
    ReplayBttnUpAnimation: function(){
        game.add.tween(winReplayBttn.scale).to({ x: 0.5, y: 0.5}, 400, Phaser.Easing.Linear.Out, true);
        winReplayBttn.inputEnable = false;
        setTimeout(() => {
            this.ReplayBttnClick();
        }, 500);
    },
    ReplayBttnClick: function(){
        this.HideWinPopup();
        winReplayBttn.inputEnable = true;
        StateTransition.TransitToGamePlay();
    },

    NextBttnDownAnimation: function(){
        game.add.tween(nextBttn.scale).to({ x: 0.45, y: 0.45}, 400, Phaser.Easing.Linear.Out, true);
        SoundManager.PlayButtonSFX();
    },  
    NextBttnUpAnimation: function(){
        game.add.tween(nextBttn.scale).to({ x: 0.5, y: 0.5}, 400, Phaser.Easing.Linear.Out, true);
        nextBttn.inputEnable = false;
        setTimeout(() => {
            this.NextBttnClick();
        }, 500);
    },
    NextBttnClick: function(){
        this.HideWinPopup();
        nextBttn.inputEnable = true;
        curretLevelCounter++;
        if(curretLevelCounter<10){
            LevelSelection.prototype.LoadLevel(curretLevelCounter);
            gameplayType = "LevelSelection";
            GameInfo.CreateGameInfo(curretLevelCounter);
            GameInfo.ShowGameInfo();
        }else{
            StateTransition.TransitToLevelSelection();
        }
        // StateTransition.TransitToGamePlay();
        // Database.SaveData("lastLevel",curretLevelCounter);
    },
}