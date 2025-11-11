var targetCountArray = [];
var targetRequiredCount = [0,0,0,0,0,0];
var speedFactor;
var isSpawn = false;
var Gameplay = function(){};
var winRequiredCount = [0,0,0,0,0,0];
var setItemCount = [];
var setStarCount = [];
var fallcount = 0;
var starCount = 0;
var characterCounter = [];
var charcaterTotalCounter = [];
var characterHitCounter = [];
var instructionBttn;
var isTimerPowerUpActivate;
var isBombPowerUpActivate;
var ottoCharacterAnimation;
var timerLoopEvents;
var timerBase;
var timerLoop;
var timerOverlay;
var shopBttn;
var closeBttn;
var proceedBttn;
// var levelDataCharacterCounter = [];
Gameplay.prototype = {
    init: function(){
        Utils.ScaleManager();
    },
    preload: function(){
      // Database.SaveData("bombCount", "7");
      // Database.SaveData("timePopupCount","7");
      // console.log("The Bomb Load Data.................."+Database.LoadData("bombCount"));
      // console.log("The Timer Load Data.................."+Database.LoadData("timePopupCount"));
    },
    create: function(){
        gameplayType = "Gameplay";
        isSpawn = false;
        fallcount = 0;
        targetRequiredCount = [0,0,0,0,0,0];
        winRequiredCount = [0,0,0,0,0,0];
        targetsDepleted = 0;
        targetCountArray = [];
        targets = [];
        targetVelocities = [];
        characterCounter = [];
        charcaterTotalCounter = [];
        characterHitCounter = [];
        // levelDataCharacterCounter = [];
        topBarGroup = game.add.group();

        gameplayBg = Utils.SpriteSettingsControl(gameplayBg,game.world.centerX,game.world.centerY,'gameplayBg',"true","true",0.5,0.5,0.6,0.6);
        bottomTable = Utils.SpriteSettingsControl(bottomTable,game.world.centerX,1230,'bottomTable',"true","true",0.5,0.5,0.6,0.7);
        grillTop = Utils.SpriteSettingsControl(grillTop,game.world.centerX,170,'grillTop',"true","true",0.5,0.5,0.6,0.6);
   
        topBar =  Utils.SpriteSettingsControl(topBar,game.world.centerX,90,'topBar',"true","true",0.5,0.5,0.6,0.6);
        //timeBase = Utils.SpriteSettingsControl(timeBase,600,112,'timeBase',"true","true",0.5,0.5,0.5,0.5);
        pauseBttn = Utils.ButtonSettingsControl(pauseBttn, 70.0, 145.0, 'pauseBttn',this.PauseBttnDown,null,null, this.PauseBttnUp, "true", "true", 0.5, 0.5, 0.6, 0.6,this);
        instructionBttn = Utils.ButtonSettingsControl(instructionBttn, 650.0, 145.0, 'objBttn',this.InstructionBttnDown,null,null, this.InstructionBttnUp, "true", "true", 0.5, 0.5, 0.6, 0.6,this);
        
        pageTitle = Utils.SpriteSettingsControl(pageTitle,360,160,'pageTitle',"true","true",0.5,0.5,0.6,0.6);
        topTxt = game.add.bitmapText(300, 125, 'shootEmFont', "LEVEL "+levelData.level_number, 35);
        ottoCharacterAnimation = game.add.sprite(80,1000,'ottoCanon');
        //bombPowerupBttn = Utils.ButtonSettingsControl(bombPowerupBttn, 70.0, 1215.0, 'bombPowerupBttn',this.bombPowerupBttn,null,null, this.bombPowerupBttn, "true", "true", 0.5, 0.5, 0.6, 0.6,this);


        // console.log("Frame............");
        topBarGroup.add(topBar);
        topBarGroup.add(pauseBttn);
        topBarGroup.add(instructionBttn);
        topBarGroup.add(pageTitle);
        topBarGroup.add(topTxt);

        turretStand =  Utils.SpriteSettingsControl(turretStand,game.world.centerX,1130,'turretStand',"true","true",0.5,0.5,0.6,0.6);
        if(isJioSDK){
            bombPowerupBttn = Utils.ButtonSettingsControl(bombPowerupBttn, 70.0, 1165.0, 'bombPowerupBttn',this.BombPowerupBttnDown,null,null, this.BombPowerupBttnUp, "true", "true", 0.5, 0.5, 0.6, 0.6,this);
            bombCounter = game.add.bitmapText(-65,-110, 'shootEmFont', Database.LoadData("bombCount"), 30);
            bombCounter.tint = "0x3d0c0c";
            bombPowerupBttn.addChild(bombCounter);

            timePowerupBttn = Utils.ButtonSettingsControl(timePowerupBttn, 650.0, 1165.0, 'timePowerupBttn',this.TimePowerupBttnDown,null,null, this.TimePowerupBttnUp, "true", "true", 0.5, 0.5, 0.6, 0.6,this);
            timeCounter = game.add.bitmapText(-65,-110, 'shootEmFont', Database.LoadData("timePopupCount"), 30);
            timeCounter.tint = "0x3d0c0c";
            timePowerupBttn.addChild(timeCounter);
        }

        this.SetupPhysics();
        this.GenerateTargets();
        
        // GENERATE THE PROJECTILE
        Cannon.GenerateProjectile();

        // PATH-MARKERS
        Cannon.GeneratePathMarkers();
        
        //HIDE PATH MARKERS
        Cannon.HidePathMarker();

        // ADD THE CANNON
        this.AddCannon();
        // this.GenerateCounter();
        game.world.bringToTop(topBarGroup);
        game.world.bringToTop(ottoCharacterAnimation);
        PausePopup.CreatePausePopup();
        WinPopup.CreateWinPopup();
        LoosePopup.CreateLoosePopup();
        GameInfo.CreateGameInfo();
        WrongPopup.CreateWrongPopup();
        this.OttoAnimationPlay();
        this.Timer();
        DisclamairPopup.CreateDisclaimeropup();
    },
    update: function(){
        game.world.bringToTop(gameInfoPopupGroup);
        game.world.bringToTop(winPopupGroup);

        if(isCannonTouched == true && currentlyAiming == true){
            Cannon.CannonMovement();
            Cannon.PathMarkerAnimation();
          }
      
          if(projectile.body.y >= screenHeight-64){
            // console.log("Projectile below min bound");
      
            Cannon.HideProjectile();
            // if(projectileTypeACount + projectileTypeBCount == 0){
            //   if(levelCurrentScore < levelTargetScore)  // BUT NOT WON EVEN AFTER HITTING THE LAST TARGET
            //   {
            //     // console.log("From Update");
            //     GameOverEvent();
            //   }
            // }
        }
        this.ScrollTargets();
    },
    render: function(){

    },

    InstructionBttnDown: function(){
      game.add.tween(instructionBttn.scale).to({ x: 0.5, y: 0.5}, 400, Phaser.Easing.Linear.None, true);
    },
    InstructionBttnUp: function(){
      var instructionBttnTween = game.add.tween(instructionBttn.scale).to({ x: 0.6, y: 0.6}, 400, Phaser.Easing.Linear.None, true);
      instructionBttnTween.onComplete.add(this.InstructionBttnClick,this);
    },
    InstructionBttnClick: function(){
      GameInfo.CreateGameInfo(levelData);
      GameInfo.ShowGameInfo();
      SoundManager.PlayButtonSFX();
      setTimeout(() => {
          game.paused = true;
          game.paused != game.paused;
      }, 200);
    },
    PauseBttnDown: function(){
        game.add.tween(pauseBttn.scale).to({ x: 0.5, y: 0.5}, 400, Phaser.Easing.Bounce.Out, true);
    },
    PauseBttnUp: function(){
        var pauseBttnTween = game.add.tween(pauseBttn.scale).to({ x: 0.6, y: 0.6}, 400, Phaser.Easing.Bounce.Out, true);
        pauseBttnTween.onComplete.add(this.PauseBttnClick,this);
    },
    PauseBttnClick: function(){
        // console.log("Pause Button Click...................................");
        PausePopup.ShowPausePopup();
        SoundManager.PlayButtonSFX();
        setTimeout(() => {
            game.paused = true;
            game.paused != game.paused;
        }, 200);
    },

    
    BombPowerupBttnDown: function(){
      // bombGroup.position.setTo(0,0);
      game.add.tween(bombPowerupBttn.scale).to({ x: 0.5, y: 0.5}, 400, Phaser.Easing.Linear.None, true);
    },
    BombPowerupBttnUp: function(){
      // bombGroup.position.setTo(0,0);
      var bombPowerupBttnTween = game.add.tween(bombPowerupBttn.scale).to({ x: 0.6, y: 0.6}, 400, Phaser.Easing.Linear.None, true);
      bombPowerupBttnTween.onComplete.add(this.BombPowerupBttnClick,this);
    },
    ShopBttnDownAnimation: function(){
      game.paused = false;
    },
    ShopButtonUpAnimation: function(){
      this.ShopBttnClick();
    },
    ShopBttnClick: function(){
      wrongPopupGroup.visible = false;
      shopBttn.visible = false;
      DisclamairPopup.ShowDisclaimerPopUp();
        //WrongPopup.ShowWrongPopup('   You Loss  your \ngame progress');
        // closeBttn = Utils.ButtonSettingsControl(closeBttn, 660.0, 465.0, 'closeBttn',this.CloseBttnDownAnimation,null,null,this.CloseBttnUpAnimation, "true", "true", 0.5, 0.5, 0.5, 0.5,this); 
        // proceedBttn = Utils.ButtonSettingsControl(proceedBttn, 360.0, 825.0, 'proceedBttn',this.NextBttnDownAnimation,null,null,this.NextBttnUpAnimation, "true", "true", 0.5, 0.5, 0.5, 0.5,this); 
    },
    // CloseBttnDownAnimation: function(){
    //   game.paused = false;
    // },
    // CloseBttnUpAnimation: function(){
    //   this.CloseBttnClick();
    // },
    // CloseBttnClick: function(){
    //   console.log("Close Bttn Click");
    //   game.paused = false;
    //   WrongPopup.HideWrongPopup();
    // },
    // NextBttnDownAnimation: function(){
    //     game.paused = false;
    // },
    // NextBttnUpAnimation: function(){
    //   console.log("Nxt Bttn Click");
    //   this.NextBttnClick();
    // },
    // NextBttnClick: function(){
    //   // WrongPopup.HideWrongPopup();
    //   game.paused = false;
    //   StateTransition.TransitToMenu();
    // },
    BombPowerupBttnClick: function(){
      if(parseInt(Database.LoadData("bombCount")) == 0){
          // console.log("....bomb powerup count 0");
          WrongPopup.ShowWrongPopup('   No Blaster \npowerup left');
          // game.paused = true;
          shopBttn = Utils.ButtonSettingsControl(shopBttn, 360.0, 825.0, 'shopBttn',this.ShopBttnDownAnimation,null,null, this.ShopButtonUpAnimation, "true", "true", 0.5, 0.5, 0.6, 0.6,this); 
      }
      else{
        // console.log("bombPowerupBttnClick Click...................................");
        isBombPowerUpActivate = true;
        bombPowerupBttn.inputEnabled = false;
        bombPowerupBttn.alpha = 0.7;
        var count = parseInt(Database.LoadData("bombCount"))-1;
        Database.SaveData("bombCount", count);
        bombCounter.setText(count);
        projectileInCannon.loadTexture('bombProjectile');
        projectileInCannon.scale.setTo(1.6,1.6);
        projectileInCannon.position.setTo(15,-145);
        projectile.loadTexture('bombProjectile');
        SoundManager.PlayButtonSFX();
      }
    },

    TimePowerupBttnDown: function(){
      game.add.tween(timePowerupBttn.scale).to({ x: 0.5, y: 0.5}, 400, Phaser.Easing.Bounce.Out, true);
    },
    TimePowerupBttnUp: function(){
      var timePowerupBttnTween = game.add.tween(timePowerupBttn.scale).to({ x: 0.6, y: 0.6}, 400, Phaser.Easing.Bounce.Out, true);
      timePowerupBttnTween.onComplete.add(this.TimePowerupBttnClick,this);
    },
    TimePowerupBttnClick: function(){
      SoundManager.PlayButtonSFX();
      if(parseInt(Database.LoadData("timePopupCount")) == 0){
        // console.log("....time powerup count 0");
        WrongPopup.ShowWrongPopup('No SlowDown \npowerup left');
        // game.paused = true;
        shopBttn = Utils.ButtonSettingsControl(shopBttn, 360.0, 825.0, 'shopBttn',this.ShopBttnDownAnimation,null,null, this.ShopButtonUpAnimation, "true", "true", 0.5, 0.5, 0.6, 0.6,this);
      }
      else{
        // console.log("timePowerupBttnClick Click...................................");
        isTimerPowerUpActivate = true;
        timePowerupBttn.inputEnabled = true;
        timePowerupBttn.alpha = 0.7;
        var count = parseInt(Database.LoadData("timePopupCount"))-1;
        Database.SaveData("timePopupCount", count);
        timeCounter.setText(count);
        timerLoopEvents = game.time.events.loop(5000, this.DiactivateTimePowerup, this);
        timerBase.visible = true;
        this.StartTimer();
        // projectileInCannon.loadTexture('timerProjectile');
        // projectileInCannon.scale.setTo(1.6,1.6);
        // projectileInCannon.position.setTo(5,-130);
        // projectile.loadTexture('timerProjectile');
        SoundManager.PlayButtonSFX();
      }
    },

    DiactivateTimePowerup: function(){
      game.time.events.remove(timerLoopEvents);
      isTimerPowerUpActivate = false;
      timePowerupBttn.inputEnabled = true;
      timePowerupBttn.alpha = 1;
      timerBase.visible = false;
      timerOverlay.visible = false;
    },

    GenerateCounter: function(){ 
      // console.log("The level Data Targets................."+levelData.targets[i].type);  
      for(var i = 0;i<levelData.targets.length;i++){
        if(levelData.targets[i].count > 0){
          // console.log("The level Data Targets................."+levelData.targets[i].type);
          if(levelData.targets[i].type == "character_"+(i+1)){
            // console.log("The level Data Targets.................WIthin If"+levelData.targets[i].type);
            var characterCounterSprite = game.add.sprite(660-(i*90),145,'characterCounter_'+(i+1));
            characterCounterSprite.anchor.setTo(0.5,0.5);
            characterCounterSprite.scale.setTo(0.7,0.7);
            characterCounter[i] = characterCounterSprite;
            charcaterTotalCounter[i] =  game.add.bitmapText(660-(i*90), 165, 'shootEmFont', "/ "+levelData.targets[i].count, 20);
            characterHitCounter[i] = game.add.bitmapText(640-(i*90), 165, 'shootEmFont', "0", 20);
            topBarGroup.add(characterCounter[i]);
            topBarGroup.add(charcaterTotalCounter[i]);
            topBarGroup.add(characterHitCounter[i]);
          }
        }
      }
    },  
    GenerateTargets: function(){
        var i; // ITERATOR
        var j; // ITERATOR
        isSpawn = true;
      
        // console.log(levelData);
        // RemoveAllTargets();
      
        var temp;
        var knife;
        var key;
        var count;
      
        // for(i = 0; i < levelData.bombs; i++){
        //   temp = game.add.sprite(0,0,"bomb_spark_spritesheet");
        // //   temp.animations.add("bomb_spark_animation");
        // //   temp.play("bomb_spark_animation",30,true);
        // //   temp.anchor.set(0.5,0.5);
        // //   temp.health = 1;
        //   targets.push(temp);
        // }
        for(var i = 0;i<levelData.star.length;i++){
          setItemCount[i] = levelData.star[i].itemCount;
          setStarCount[i] = levelData.star[i].starCount;
        }
        // console.log("The set Item Count",setItemCount);
        // console.log("The set Star Count.........",setStarCount);
        for(i=0; i<levelData.targets.length; i++){
          // ITERATE THROUGH EACH OF THE TARGETS
          key = levelData.targets[i].type;
          count = levelData.targets[i].count;
      
          // console.log("The Key......."+key);
          // console.log("The Count......."+count);
          //for(j=0; j<levelData.targets[i].count; j++){
            if(levelData.targets[i].count > 0){
              temp = game.add.sprite(0,-880,'knife');
              knife = game.add.sprite(-100,260,'characterfrighten_'+key.substr(key.length - 1));
              knife.animations.add('characterfrighten_'+key.substr(key.length - 1));
              knife.animations.play('characterfrighten_'+key.substr(key.length - 1),10,true);
              temp.addChild(knife);
              // console.log("The index..........."+key.substr(key.length - 1));
              temp.health = 1;
              temp.anchor.set(0.5,0.5);
              temp.scale.set(0.5,0.5);
              targets.push(temp);
            }
          //}

          // if(levelData.targets[i].count > 0){
            targetCountArray[i] = levelData.targets[i].count;
            winRequiredCount[i] = levelData.targets[i].count;
          // }
          //console.log("The targets Array........."+targets.length);
        }
        // console.log("The Target Count Array",targetCountArray);
            
        // CASE SPECIFIC REQUIREMENTS BY CLIENT
      
        //For level 1 & 2
        if(currentLevelNumber < 3){
          // speedFactor = Math.pow( 1.8 , (currentLevelNumber-1) );
          speedFactor = Math.pow( 1.4 , (currentLevelNumber-1) ) + 0.5;
        }
        //For level 3 & 4
        else if(currentLevelNumber > 2 && currentLevelNumber < 5){
          speedFactor = Math.pow( 1.4 , (currentLevelNumber-1) );
        }
        //For level 5 to 7
        else if(currentLevelNumber > 4 && currentLevelNumber < 8){
          speedFactor = Math.pow( 1.3 , (currentLevelNumber-1) );
        }
        //For level 8
        else if(currentLevelNumber == 8){
          speedFactor = Math.pow( 1.2 , 9); 
        }
        //For level 9
        else if(currentLevelNumber == 9){
          speedFactor = Math.pow( 1.2 , 9) * 1.1; 
        }
        //For level 10
        else if(currentLevelNumber == 10){
          speedFactor = Math.pow( 1.2 , 9) * 1.2; 
        }
         
        // console.log("Level Number: " + currentLevelNumber +" | Speed Factor: " + (speedFactor*100) + "%");
      
        for(i=0; i < targets.length; i++){
          var velocity = speedFactor*(-2 + Math.random()) - speedFactor;
          targetVelocities.push(velocity);
        }
        targetCount = levelData.target_missed;
        targetsDepleted = 0;
        // console.log("The target Count............"+targetCount);
        // ARRANGE ITEMS
        arrangemnetPatternArray = [];
        for(i=0;i<targets.length;i++){
          arrangemnetPatternArray[i] = i;
        }
      
        // this.ShuffleArray();
      
        for(i=0;i<targets.length;i++){
          targets[i].x = screenWidth*1.5 + arrangemnetPatternArray[i]*(512+10);
          targets[i].y = 200 + Math.random()*100;
        }
      
        // this.ShuffleArray();
      
        // MAKE SURE THAT THE SPLATTER EFFECTS ARE ALWAYS ON TOP OF THE ITEMS
        // game.world.bringToTop(impactEffectsGroup);
      },
      
      ShuffleArray : function(){
        // SHUFFLE AN ARRAY
        var i;
        var n = arrangemnetPatternArray.length;
        var random;
        var temp;
      
        for (i = n-1; i > 0; i--) {
          // GENERATE A RANDOM INDEX
          random = parseInt(Math.floor(Math.random()*i));
      
          // SWAP THE ELEMENTS
          temp = arrangemnetPatternArray[i];
          arrangemnetPatternArray[i] = arrangemnetPatternArray[random];
          arrangemnetPatternArray[random] = temp;
        }
      },
      SpawnTarget: function(spriteName,xPos,yPos){
        isSpawn = true;
        // console.log("Enter into the spawn Target........."+spriteName);
        // var temp = game.add.sprite(0,-380,spriteName);
        // knife = temp.addChild(game.make.sprite(-190,-880,'knife'));
        var temp = game.add.sprite(0,-880,'knife');
        var knife = game.add.sprite(-100,260,spriteName);
        knife.animations.add(spriteName);
        knife.animations.play(spriteName,10,true);
        temp.addChild(knife);
        temp.health = 1;
        temp.anchor.set(0.5,0.5);
        temp.scale.set(0.5,0.5);
        temp.x = screenWidth*1.5 + (512+10*currentLevelNumber);
        temp.y = 100 + Math.random()*300;
        // console.log("The temp position..........",temp);
        var velocity = speedFactor*(-2 + Math.random()) - speedFactor;
        targetVelocities.push(velocity);
        setTimeout(() => {
          targets.push(temp);
        }, 500);
        game.world.bringToTop(topBarGroup);
        game.world.bringToTop(timerOverlay);
      },
      ScrollTargets: function(){
        // console.log("Scroll Targets");

        var i = 0;
        for(i=0; i<targets.length; i++){
          if(targets[i] != null){
            if(targets[i].health == 0){
              if(isTimerPowerUpActivate){
                targets[i].x += targetVelocities[i]/2;
              }else{
                targets[i].x += targetVelocities[i];
              }
            }
            if(targets[i].health > 0 && targets[i].x > -150)
            {
              //console.log(".....target x: "+targets[i].x);
              if(isTimerPowerUpActivate){
                targets[i].x += targetVelocities[i]/2;
              }
              else{
                targets[i].x += targetVelocities[i];
              }
              // ALSO CHECK COLLISION WITH PROJECTILE
              // DISTANCE FORMULA BASED COLLISION
              if(targets[i].x <= -150){
                // JUST CROSSED LESS THAN -150
                targets[i].health = 0;
                this.TargetDepletion();
                winRequiredCount[targets[i].children[0].key.substr(targets[i].children[0].key.length - 1) - 1] = 0;
                // console.log("The Win Required Count.............",winRequiredCount);
                this.WinPopupShow();
              }
              if(this.DistanceBetween(targets[i],projectile) < 150){
                // console.log("Collision"+targets[i].children[0].position.x+"Y postion......"+targets[i].children[0].position.y+"Children......"+targets[i].children[0].key);
                
                if(isBombPowerUpActivate){
                  this.CollisionWithBomb(targets);
                  bombPowerupBttn.inputEnabled = true;
                  bombPowerupBttn.alpha = 1;
                  isBombPowerUpActivate = false;
                  // console.log("Enter when interact with bomb");
                }
                // else if(isTimerPowerUpActivate){
                //   //The logic of the timer
                //   console.log("Enter when interact with timer");
                // }
                else{
                  // console.log("Enter when interact with stone");
                  this.CollisionWithStone(targets,i);
                }
                // console.log("The Win Required Count.............",winRequiredCount);
                this.WinPopupShow();
              }
            }
          }
        }
      },
      WinPopupShow : function(){
        setTimeout(() => {
          if(this.CheckingWinPopup()){
            // console.log("Show Win Pop up");
            for(var i = 0;i<setItemCount.length;i++){
              // console.log("The set Star Count........."+setItemCount[i]+"The fallen Count........."+fallcount);
              if(fallcount <= setItemCount[i]){
                starCount = setStarCount[i];
                break;
              }
            }
            if(targetsDepleted != targetCount){
              WinPopup.ShowWinPopup();
            }
            // console.log("The starCount.............."+starCount);
          }
        }, 2000);
      },
      CheckingWinPopup: function(){
        for(var i = 0; i < winRequiredCount.length - 1; i++) {
          if(winRequiredCount[i] !== winRequiredCount[i+1]) {
              return false;
          }
        }
        return true;
      },
      CharacterSpawn: function(spriteName,xPos,yPos){
        var spawnSprite = game.add.sprite(xPos,yPos,spriteName);
        spawnSprite.anchor.setTo(0.5,0.5);
        spawnSprite.scale.setTo(0.5,0.5);
        var spriteTween = game.add.tween(spawnSprite).to({ y: 1160 }, 500, Phaser.Easing.Linear.Out, true);
        spriteTween.onComplete.add(function()
        {  
          spawnSprite.animations.add(spriteName);
          spawnSprite.animations.play(spriteName,10,true);
          var tweenComplete = game.add.tween(spawnSprite).to({ x: 1130 }, 2500, Phaser.Easing.Linear.Out, true);
          tweenComplete.onComplete.add(function(){
            spawnSprite.destroy();
          },this);
        });
      },
    DistanceBetween : function(obj,physicsObj){
        var distance;
        
        distance = Math.sqrt(
                            Math.pow(obj.x - physicsObj.body.x,2)
                            +
                            Math.pow(obj.y - physicsObj.body.y,2)
                            );
        
        // console.log("Distance: " + distance);
        
        return distance;
    },
    TargetDepletion: function(){
        // console.log("Target Depletion");
        // CHECK IF ALL THE TARGETS ARE AOUT OF THE SCREEN
        targetsDepleted += 1;
        // console.log("Targets Depleted: " + targetsDepleted);
      
        if(targetsDepleted == targetCount){ //All Target Depleted
          // console.log("All targets Depleted");
          LoosePopup.ShowLoosePopup();
      
        //   if(levelCurrentScore < levelTargetScore)  // BUT NOT WON EVEN AFTER HITTING THE LAST TARGET
        //   {
        //     // console.log("Target Score Not Met");
        //     // console.log("From Target Depletion");
        //     GameOverEvent();
        //   }
        }
    },
    
    

    SetupPhysics : function(){
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setBoundsToWorld(false,false,false,false);
        game.physics.p2.gravity.y = gameGravity;
        game.physics.p2.restitution = 0.9;
        game.physics.p2.setBoundsToWorld(true, true, true, true)
    },
      
    AddCannon : function(){
        // ADD CANNON BODY
        cannonBody = game.add.sprite(cannonPositionX,cannonPositionY ,'cannon_body_sprite');
        cannonBody.anchor.set(0.5,1);
        cannonBody.scale.set(0.5,0.5);
      
        cannonBodyBack = game.add.sprite(cannonPositionX,cannonPositionY - 200,'turretBodyBack');
        cannonBodyBack.anchor.set(0.5,0.5);
        cannonBodyBack.scale.set(0.5,0.5);


        // ADD PROJECTILE IN CANNON
        projectileInCannon = game.add.sprite(0,-114,'stone');
        // projectileInCannon.animations.add("projectiles");
        // projectileInCannon.frame = 0;
        projectileInCannon.anchor.set(0.5,0.5);

        // projectileInCannon.scale.setTo(1.0,1.0);
        // projectileInCannon.position.setTo(0,0);
        projectileInCannon.visible = false;
        // projectileInCannon.scale.set(0.5,0.5);
      
        cannonBody.inputEnabled = true;
        cannonBody.input.useHandCursor = true;
        
        cannonBody.events.onInputDown.add(this.TouchAreaPressed, this);
        cannonBody.events.onInputUp.add(this.TouchAreaReleased, this);
      
        cannonBody.addChild(projectileInCannon);
        cannonBody.addChild(cannonBodyBack);
    },

    TouchAreaPressed : function(){
        // console.log("Touch Area Pressed");
        cannonBody.loadTexture('cannon_body_pressed');
        currentlyAiming = true;
      
        if(isProjectileLaunched == false){
          isCannonTouched = true;
          Cannon.ShowPathMarker();
        }
      },
      
      TouchAreaReleased : function(){
        // console.log("Touch Area Released");
        cannonBody.loadTexture('cannon_body_sprite');
        currentlyAiming = false;
        projectileInCannon.visible = false;
        this.OttoAnimationPlay();
        if(isCannonTouched == true && isProjectileLaunched == false){
        //    if(isTutorialRunning){
        //     //StopTutorialAnimation();
        //   }
          isCannonTouched = false;
          Cannon.LaunchProjectile();
          Cannon.HidePathMarker();
        }
      },

      CollisionWithBomb : function(targets){
        for(j=0;j<targets.length;j++){
          if(targets[j].x>=40 && targets[j].x<=800){
            targets[j].health = 0;
            if(targets[j].children[0].visible == true){
              targets[j].children[0].visible = false;
              this.CharacterSpawn(targets[j].children[0].key+"_Run",parseInt(targets[j].position.x),parseInt(targets[j].children[0].position.y + 250));
              if(targetCountArray[targets[j].children[0].key.substr(targets[j].children[0].key.length - 1) - 1] > 0){
                if(targetRequiredCount[targets[j].children[0].key.substr(targets[j].children[0].key.length - 1) - 1] < (targetCountArray[targets[j].children[0].key.substr(targets[j].children[0].key.length - 1) - 1]-1)){
                  this.SpawnTarget(targets[j].children[0].key,parseInt(targets[j].children[0].position.x),parseInt(targets[j].children[0].position.y + 250));
                  targetRequiredCount[targets[j].children[0].key.substr(targets[j].children[0].key.length - 1) - 1]++;
                  // console.log("The index I..........."+(targets[j].children[0].key.substr(targets[j].children[0].key.length - 1) - 1)+"The Target Required Count Array",targetRequiredCount);
                }
                if(targetRequiredCount[targets[j].children[0].key.substr(targets[j].children[0].key.length - 1) - 1] < (targetCountArray[targets[j].children[0].key.substr(targets[j].children[0].key.length - 1) - 1])){
                  winRequiredCount[targets[j].children[0].key.substr(targets[j].children[0].key.length - 1) - 1]--;
                  fallcount++;
                  //characterHitCounter[targets[i].key.substr(targets[i].key.length - 1) - 1].setText(parseInt(characterHitCounter[targets[i].key.substr(targets[i].key.length - 1) - 1].text)+1);
                }
              }
            }
          }
        }
      },

      CreateBasketAnimation: function(xPos,yPos){
        var basket = game.add.sprite(xPos,yPos,'bucketDestroy');
        var destroyAnimation = basket.animations.add('destroyAnimation');
        basket.animations.play('destroyAnimation',20,false);
        destroyAnimation.onComplete.add(function(){
          basket.destroy();
        }, this);
      },
      OttoAnimationPlay: function(){
        var ottoCanonAnimation = ottoCharacterAnimation.animations.add('destroyAnimation');
        ottoCharacterAnimation.animations.play('destroyAnimation',80,false);
        ottoCanonAnimation.onComplete.add(function(){
          projectileInCannon.visible = true;
          projectileInCannon.loadTexture('stone');
          projectileInCannon.scale.setTo(1.0,1.0);
          projectileInCannon.position.setTo(0,-110);
          setTimeout(() => {
            projectile.loadTexture('stone');
          }, 1000);
        },this)
      },
      CollisionWithStone : function(targets,i){
        targets[i].health = 0;
        targets[i].children[0].visible = false;
        // console.log("The Children Key.........."+targets[i].children[0].key);
        this.CreateBasketAnimation(parseInt(targets[i].position.x)-130,parseInt(targets[i].children[0].position.y + 250-90));
        this.CharacterSpawn(targets[i].children[0].key+"_Run",parseInt(targets[i].position.x),parseInt(targets[i].children[0].position.y + 250));
        if(targetCountArray[targets[i].children[0].key.substr(targets[i].children[0].key.length - 1) - 1] > 0){
          if(targetRequiredCount[targets[i].children[0].key.substr(targets[i].children[0].key.length - 1) - 1] < (targetCountArray[targets[i].children[0].key.substr(targets[i].children[0].key.length - 1) - 1]-1)){
            this.SpawnTarget(targets[i].children[0].key,parseInt(targets[i].children[0].position.x),parseInt(targets[i].children[0].position.y + 250));
            targetRequiredCount[targets[i].children[0].key.substr(targets[i].children[0].key.length - 1) - 1]++;
            // console.log("The index I..........."+(targets[i].children[0].key.substr(targets[i].children[0].key.length - 1) - 1)+"The Target Required Count Array",targetRequiredCount);
          }
          if(targetRequiredCount[targets[i].children[0].key.substr(targets[i].children[0].key.length - 1) - 1] < (targetCountArray[targets[i].children[0].key.substr(targets[i].children[0].key.length - 1) - 1])){
            winRequiredCount[targets[i].children[0].key.substr(targets[i].children[0].key.length - 1) - 1]--;
            fallcount++;
            //characterHitCounter[targets[i].key.substr(targets[i].key.length - 1) - 1].setText(parseInt(characterHitCounter[targets[i].key.substr(targets[i].key.length - 1) - 1].text)+1);
          }
        }
      },
      Timer : function(){
        timerOverlay = Utils.SpriteSettingsControl(timerOverlay,game.world.centerX,game.world.centerY,'gameplayOverlay',"true","true",0.5,0.5,0.6,0.6);
        timerBase = Utils.SpriteSettingsControl(timerBase,game.world.centerX,240,'onePixel',"true","true",0.5,0.5,750,15);
        // timerBase.tint = "0x00ff00";
        timerLoop = Utils.SpriteSettingsControl(timerLoop,game.world.centerX,240,'onePixel',"true","true",0.5,0.5,750,15);
        timerLoop.tint = "0x22a6b3";
        timerBase.visible = false;
        timerLoop.visible = false;
        timerOverlay.visible = false;
      },
      StartTimer: function(){
        timerBase.visible = true;
        timerLoop.visible = true;
        timerOverlay.visible = true;
        timerOverlay.alpha = 1;
        timerLoop.scale.setTo(750,15);
        game.add.tween(timerLoop.scale).to({ x: 0, y: 15}, 5000, Phaser.Easing.Linear.None, true);
        // setTimeout(() => {
        //   game.add.tween(timerOverlay).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true);
        // }, 4.0);
      }
}