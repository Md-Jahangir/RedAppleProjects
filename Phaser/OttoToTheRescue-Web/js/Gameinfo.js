var infoPopupOverlay;
var gameInfoBase;
var levelTargetInfo = [];
var levelCountInfo = [];
var  levelInfoCharacter;
var  levelSaveInfo;
var levelObjectiveTxt;
var closeBttn;
var gameInfoPopupGroup;
var GameInfo = {
    CreateGameInfo: function(){
        levelTargetInfo = [];
        levelCountInfo = [];
        gameInfoPopupGroup = game.add.group();
        // levelData = game.cache.getJSON(levelIndex);
        infoPopupOverlay =  Utils.ButtonSettingsControl(closeBttn, game.world.centerX,game.world.centerY, 'overlay', null,null,null, null, "true", "true", 0.5, 0.5, 0.6, 0.6,this);
        //Utils.SpriteSettingsControl(infoPopupOverlay,game.world.centerX,game.world.centerY,'overlay',"true","true",0.5,0.5,0.6,0.6);
        topBar = Utils.SpriteSettingsControl(topBar,360,100,'topBar',"true","true",0.5,0.5,0.6,0.6);
        pageTitle = Utils.SpriteSettingsControl(pageTitle,360,160,'pageTitle',"true","true",0.5,0.5,0.6,0.6);
        closeBttn =  Utils.ButtonSettingsControl(closeBttn, 360, 1240.0, 'nextBttn', this.CloseBttnDownAnimation,null,null, this.CloseBttnUpAnimation, "true", "true", 0.5, 0.5, 0.6, 0.6,this);
        // console.log("The level Data Targets Length.............."+levelData.targets.length);
        gameInfoPopupGroup.add(infoPopupOverlay);
        gameInfoPopupGroup.add(topBar);
        gameInfoPopupGroup.add(pageTitle);
        gameInfoPopupGroup.add(closeBttn);

        for(var i = 0;i<levelData.targets.length;i++){
            if(levelData.targets[i].count > 0){
                // console.log("The level Data Targets Length.............."+levelData.targets[i].count);
                levelTargetInfo.push(levelData.targets[i].type);
                levelCountInfo.push(levelData.targets[i].count);
            }
        }

        // console.log("The Level Data Target Info...........",levelTargetInfo + "The Level Data Count Info...........",levelCountInfo);
        if(levelTargetInfo.length <= 2){
            gameInfoBase = Utils.SpriteSettingsControl(gameInfoBase,360,300,'levelSelecionBase',"true","true",0.5,0,0.6,0.3);
        }
        else if(levelTargetInfo.length <= 4){
            gameInfoBase = Utils.SpriteSettingsControl(gameInfoBase,360,300,'levelSelecionBase',"true","true",0.5,0,0.6,0.45);
            // levelObjectiveTxt =  game.add.bitmapText(370,375, 'shootEmFont', "OBJECTIVE", 50);
        }
        else if(levelTargetInfo.length == 5){
            gameInfoBase = Utils.SpriteSettingsControl(gameInfoBase,360,300,'levelSelecionBase',"true","true",0.5,0,0.6,0.45);
            // levelObjectiveTxt =  game.add.bitmapText(370,375, 'shootEmFont', "OBJECTIVE", 50);
        }
        else{
            gameInfoBase = Utils.SpriteSettingsControl(gameInfoBase,360,300,'levelSelecionBase',"true","true",0.5,0,0.6,0.55);
        }
        gameInfoPopupGroup.add(gameInfoBase);
        // pageTitle = Utils.SpriteSettingsControl(pageTitle,360,160,'pageTitle',"true","true",0.5,0.5,0.6,0.6);
        levelObjectiveTxt =  game.add.bitmapText(360,140, 'shootEmFont', "LEVEL "+levelData.level_number, 35);
        levelObjectiveTxt.anchor.setTo(0.5,0.5);
        gameInfoPopupGroup.add(levelObjectiveTxt);
        for(var i = 0; i< levelTargetInfo.length;i++){
            var count = levelTargetInfo[i].substr(levelTargetInfo[i].length - 1);
            if(levelTargetInfo.length <= 2){
                // console.log("Enter when length less than equal to 2" + 'spawncharacter_'+count);
                levelInfoCharacter = game.add.sprite(200,465+(i*140),'spawncharacter_'+count);
                levelSaveInfo =  game.add.bitmapText(430,465+(i*140), 'shootEmFont', "save "+levelCountInfo[i] + " times", 30);
                levelSaveInfo.anchor.setTo(0.5,0.5);
                // Utils.TextSettingsControl(levelSaveInfo, 430,465+(i*140), "save "+levelCountInfo[i] + " times", "true", "true", 0.5, 0.5, 1.0, 1.0, "shootEmFont", "bold", "#ffffff", "center", "45px");
            }
            else if(levelTargetInfo.length == 3){
                levelInfoCharacter = game.add.sprite(200,500+(i*140),'spawncharacter_'+count);
                levelSaveInfo = Utils.TextSettingsControl(levelSaveInfo, 430,500+(i*140), "save "+levelCountInfo[i] + " times", "true", "true", 0.5, 0.5, 1.0, 1.0, "shootEmFont", "bold", "#ffffff", "center", "35px");
            }
            else if(levelTargetInfo.length == 4){
                // console.log("Enter when length less than equal to 4");
                levelInfoCharacter = game.add.sprite(200,445+(i*140),'spawncharacter_'+count);
                levelSaveInfo = Utils.TextSettingsControl(levelSaveInfo, 430,445+(i*140), "save "+levelCountInfo[i] + " times", "true", "true", 0.5, 0.5, 1.0, 1.0, "shootEmFont", "bold", "#ffffff", "center", "35px");
            }
            else if(levelTargetInfo.length == 5){
                // console.log("Enter when length less than equal to 5");
                levelInfoCharacter = game.add.sprite(200,380+(i*140),'spawncharacter_'+count);
                levelSaveInfo = Utils.TextSettingsControl(levelSaveInfo, 430,380+(i*140), "save "+levelCountInfo[i] + " times", "true", "true", 0.5, 0.5, 1.0, 1.0, "shootEmFont", "bold", "#ffffff", "center", "35px");
            }
            else{
                // console.log("Enter when length less than equal to 6");
                levelInfoCharacter = game.add.sprite(200,390+(i*140),'spawncharacter_'+count);
                levelSaveInfo = Utils.TextSettingsControl(levelSaveInfo, 430,390+(i*140), "save "+levelCountInfo[i] + " times", "true", "true", 0.5, 0.5, 1.0, 1.0, "shootEmFont", "bold", "#ffffff", "center", "35px");
            }
            levelInfoCharacter.anchor.setTo(0.5,0.5);
            levelInfoCharacter.scale.setTo(0.5,0.5);
            gameInfoPopupGroup.add(levelInfoCharacter);
            gameInfoPopupGroup.add(levelSaveInfo);
        }
        gameInfoPopupGroup.visible = false;
        gameInfoPopupGroup.aplha = 0;
        game.world.bringToTop(gameInfoPopupGroup);
    },
    ShowGameInfo: function(){
        console.log("Enter into the Show Game Info PopUp");
        game.add.tween(gameInfoPopupGroup).to({ alpha: 1 }, 200, Phaser.Easing.Linear.Out, true);
        gameInfoPopupGroup.visible = true;
    },
    HideGameInfo: function(){
        var gameInfoGroupTween = game.add.tween(gameInfoPopupGroup).to({ alpha: 0 }, 200, Phaser.Easing.Linear.Out, true);
        gameInfoGroupTween.onComplete.add(function(){
            gameInfoPopupGroup.visible = false;
            gameInfoPopupGroup.destroy();
        });
    },
    CloseBttnDownAnimation: function(){
        game.add.tween(closeBttn.scale).to({ x: 0.4, y: 0.4}, 400, Phaser.Easing.Bounce.Out, true);
    },
    CloseBttnUpAnimation: function(){
        setTimeout(() => {
            game.add.tween(closeBttn.scale).to({ x: 0.5, y: 0.5}, 400, Phaser.Easing.Bounce.Out, true);
        }, 500);
        this.CloseBttnClickAnimation();
    },
    CloseBttnClickAnimation: function(){
        SoundManager.PlayButtonSFX();
        if(gameplayType == "LevelSelection"){
            this.HideGameInfo();
            StateTransition.TransitToGamePlay();
        }
        else{
            game.paused = false;
            this.HideGameInfo();
        }
    }
}