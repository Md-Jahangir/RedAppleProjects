var LevelSelection = function () {};
LevelSelection.prototype = {
    init: function(){
        Utils.ScaleManager();
    },
    preload: function () {
        Debug.log("Enter into the LevelSelection Preload Fucntion");
    },
    create: function () { 
        bgScroll = Utils.SpriteSettingsControl(bgScroll,game.world.centerX,game.world.centerY,'bgScroll',"true","true",0.5,0.5,0.6,0.6);
        overlay = Utils.SpriteSettingsControl(overlay,game.world.centerX,game.world.centerY,'overlay',"true","true",0.5,0.5,0.6,0.6);
        topBar = Utils.SpriteSettingsControl(topBar,360,100,'topBar',"true","true",0.5,0.5,0.6,0.6);
        pageTitle = Utils.SpriteSettingsControl(pageTitle,360,160,'pageTitle',"true","true",0.5,0.5,0.6,0.6);
        topTxt = game.add.bitmapText(360, 145, 'shootEmFont', "SELECT LEVEL", 35);
        topTxt.anchor.set(0.5, 0.5);

        levelSelectionBase = Utils.SpriteSettingsControl(levelSelectionBase,360,720,'levelSelecionBase',"true","true",0.5,0.5,0.5,0.5);
    
        backBttn = Utils.ButtonSettingsControl(backBttn, 80.0, 150.0, 'backBttn', this.BackButtonDownAnimtion,null,null, this.BackButtonUpAnimation, "true", "true", 0.5, 0.5, 0.6, 0.6,this);
        for(var i = 0;i < 10;i++){
            levelStar[i] = [[],[]];
        }
        for(var i = 0;i < 10;i++){
            if(i < 3){
                levelLock[i] = this.CreateLevel('levelLock',220+(i*150),480,i);
                levelText[i] = this.CreateText(i+1,220+(i*150),480);
                for(var j = 0;j<5;j++){
                    levelStar[i][j] = this.CreateStar(180+(i*150)+(j*20),410);
                    // Debug.log("The Array of levelstar",levelStar[i][j]);
                }
            }
            else if( i < 6)
            {
                if(i  == 3){
                    levelCounter = 0;
                }
                levelLock[i] = this.CreateLevel('levelLock',220+(levelCounter*150),630,i);
                levelText[i] = this.CreateText(i+1,220+(levelCounter*150),630);
                for(var j = 0;j<5;j++){
                    levelStar[i][j] = this.CreateStar(180+(levelCounter*150)+(j*20),560);
                }
                levelCounter++;
            }
            else if( i < 9){
                if(i  == 6){
                    levelCounter = 0;
                }
                levelLock[i] = this.CreateLevel('levelLock',220+(levelCounter*150),780,i);
                levelText[i] = this.CreateText(i+1,220+(levelCounter*150),780);
                for(var j = 0;j<5;j++){
                    levelStar[i][j] = this.CreateStar(180+(levelCounter*150)+(j*20),710);
                }
                levelCounter++;
            }
            else{
                levelLock[i] = this.CreateLevel('levelLock',370,930,i);
                levelText[i] = this.CreateText(i+1,370,930);
                for(var j = 0;j<5;j++){
                    levelStar[i][j] = this.CreateStar(330+(j*20),860);
                }
            }
        }
        this.SetActiveInactiveLock();
        // this.LoadLevel();
    },
    SetActiveInactiveLock: function(){
        Database.SaveData("isLevelActive"+0,1);
        // Database.SaveData("isLevelActive"+0+"isStarActive"+0,1);
        // console.log("The current Level Number................."+curretLevelCounter);
        //SandBoxTool
        // for(var i = 0;i < 10;i++){
        //     Database.SaveData("isLevelActive"+i,1);
        //     for(var j = 0;j < 5;j++){
        //         Database.SaveData("isLevelActive"+i+"isStarActive"+j,1);
        //     }
        // }
        for(var i = 0;i < 10;i++){
            if(Database.LoadData("isLevelActive"+i) == 0){
                levelLock[i].inputEnable = false;
                levelLock[i].loadTexture('levelLock');
                levelText[i].visible = false;
                for(var j = 0;j < 5;j++){
                    levelStar[i][j].visible = false;
                }
            }
            else{
                levelLock[i].inputEnable = true;
                levelText[i].visible = true;
                if(i == Database.LoadData("lastLevel")){
                    levelLock[i].loadTexture('levelCurrent');
                    levelText[i].tint = "0xffffff";
                }
                else{
                    levelLock[i].loadTexture('levelActive');
                    levelText[i].tint = "0x000000";

                }
            }
            for(var j = 0;j < 5;j++){
                //console.log("Load Data......."+Database.LoadData("isLevelActive"+i+"isStarActive"+j) + "The i..."+i +"The J..."+j);
                if(Database.LoadData("isLevelActive"+i+"isStarActive"+j) == 0){
                    levelStar[i][j].loadTexture('starInActive');
                }
                else{
                    levelStar[i][j].loadTexture('starActive');
                }
            }
        }
    },
    CreateText: function(index,x,y){
        var text = game.add.bitmapText(x,y-10, 'shootEmFont', index, 35);
        text.anchor.set(0.5,0.5);
        // text.tint = "0xffffff";
        game.add.tween(text.scale).to({ x: 1.0, y: 1.0}, 500, Phaser.Easing.Linear.None, true);
        return text;
    },
    CreateLevel: function(index,x, y,picName) {
        var pic = game.add.button(x, y, index);
        pic.anchor.set(0.5, 0.5);
        pic.scale.set(0.0, 0.0);
        pic.name = picName;
        game.add.tween(pic.scale).to({ x: 0.5, y: 0.5}, 500, Phaser.Easing.Linear.None, true);
        // levelNumber = picName;
        // curretLevelCounter = picName;
        pic.events.onInputDown.add(this.LevelButtonDownAnimation,this);
        pic.events.onInputUp.add(this.LevelButtonUpAnimation,this);
        return pic;
    },
    CreateStar: function(x,y){
        var pic = game.add.sprite(x, y, 'starInActive');
        pic.anchor.set(0.5, 0.5);
        pic.scale.set(0.5, 0.5);
        return pic;
    },
    LevelButtonDownAnimation: function(sprite){
        game.add.tween(sprite.scale).to({ x: 0.4, y: 0.4}, 500, Phaser.Easing.Linear.None, true);
        game.add.tween(levelText[sprite.name].scale).to({ x: 0.8, y: 0.8}, 500, Phaser.Easing.Bounce.Out, true);
        SoundManager.PlayButtonSFX();
    },
    LevelButtonUpAnimation: function(sprite){
        game.add.tween(sprite.scale).to({ x: 0.5, y: 0.5}, 500, Phaser.Easing.Linear.None, true);
        game.add.tween(levelText[sprite.name].scale).to({ x: 1.0, y: 1.0}, 500, Phaser.Easing.Linear.None, true);
        setTimeout(() => {
            // console.log("The Level Button Click.............");
            this.LevelButtonClick(sprite);
        }, 500);
    },
    LevelButtonClick: function(sprite){
        // console.log("The name of the sprite....."+sprite.name);
        this.LoadLevel(sprite.name);
        // StateTransition.TransitToGamePlay();
        gameplayType = "LevelSelection";
        GameInfo.CreateGameInfo(sprite.name);
        GameInfo.ShowGameInfo();
    },
    render: function(){
        //  FPS debug info
        //Debug.log("Enter into the Render");
        // game.debug.text('FPS: ' + game.time.fps || 'FPS: --', 40, 40, "#00ff00");
    },
    BackButtonDownAnimtion: function(){
        game.add.tween(backBttn.scale).to({ x: 0.4, y: 0.4}, 400, Phaser.Easing.Linear.None, true);
        SoundManager.PlayButtonSFX();
    },
    BackButtonUpAnimation: function(){
        backBttn.inputEnable = false;
        game.add.tween(backBttn.scale).to({ x: 0.5, y: 0.5}, 400, Phaser.Easing.Linear.None, true);
        setTimeout(() => {
           this.BackButtonClick();
           backBttn.inputEnable = true;
        }, 500);
    },
    BackButtonClick: function(){
        StateTransition.TransitToMenu();
    },
    LoadLevel: function(levelindex){
        levelNumber = levelindex+1;
        curretLevelCounter = (levelNumber - 1);
        // console.log("The Level Number............"+levelNumber);
        if(levelNumber>9){
            levelData = game.cache.getJSON('level_'+levelNumber);
            // console.log("The Level data.............",levelData);
        }
        else{
            levelData = game.cache.getJSON('level_0'+levelNumber);
            // console.log("The Level data.............",levelData);
        }
    }
};