var GamePlay=function(){};

GamePlay.prototype= {


    init : function()
    {
        Utils.ScaleManager();
        if(localStorage.getItem('highscore') == null){
            localStorage.setItem('highscore',0);
        }
        if(localStorage.getItem('isFireBallTutorial') == null){
            localStorage.setItem('isFireBallTutorial',true);
        }
    },
        
    preload: function()
    {
        Debug.log(" Preload...",'GamePlay_preload');
        game.load.script('GameOver','js/GameOver.js');
            
    },//end preload
    create: function()
    {
        speed=2500;
        timer=10;
        block=[];
        pinkColor = [];
        purpleColor = [];
        deepPurpleColor = [];
        indigoColor=[];
        blueColor=[]
        pointCheck=0;
        limit=35;
        timer=10;
        blockCount=0;
        pointCount=0;
        bulletClickEnable=0;
        bulletObstacleCollideCheck=1;
        collisionCheck=0;
        colorCheck=0;
        colorIndex=0;
        timerStartLimit=2;
        tutorialCannonClicked=0;//controls the tap to fire text...........
        fireTextNum=3;
        timerPause=1;
        StopObstacle=1;
        //.....................adding color
        this.AddColor();
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //......asset loading........................................................................
        //..Background Image................................................
        for(var i = 0;i<=5;i++)
        {
            backGroundArray[i]= Utils.SpriteSettingsControl(gameBg,360,640,'background_'+i,"true","true",0.5,0.5,1,1,"true");
            if(i==0)
            backGroundArray[i].alpha=1;
            else
            backGroundArray[i].alpha=0;
       }
        //.............................................................
         pauseButton=Utils.ButtonSettingsControl(pauseButton,665,85,'pause_buttom',this.PauseButtonClicked,null,null,null,"true","true",0.5,0.5,0.5,0.5,"true");
        pauseButton.inputEnabled=false;
        backButton=Utils.ButtonSettingsControl(backButton,50,85,'play_buttom',this.BackButtonClicked,null,null,null,"true","true",0.5,0.5,0.5,0.5,"true");
        backButton.inputEnabled=false;
        backButton.angle+=180;
        //..........................................................
        bullet=Utils.SpriteSettingsControl(bullet,340,1175,'ball',"true","true",0.5,0.5,0.5,0.5,"true");
        game.physics.enable(bullet,Phaser.Physics.ARCADE);
        //......................................................
        cannonBase=Utils.SpriteSettingsControl(cannonBase,0,1240,'cannon_base',"true","true",0.5,0.5,720,0.5,"true");
        platformBase=Utils.SpriteSettingsControl(platformBase,0,1010,'platform_base',"true","true",0.5,0.5,720,0.8,"true");
        scoreLine=Utils.SpriteSettingsControl(scoreLine,350,40,'score_line',"true","true",0.5,0.5,0.5,0.5,"true");
        scoreLine1=Utils.SpriteSettingsControl(scoreLine1,350,140,'score_line',"true","true",0.5,0.5,0.5,0.5,"true");
        cannonWheel=Utils.ButtonSettingsControl(cannonWheel,340,1205,'cannon_wheel',null,null,null,null,"true","true",0.5,0.5,0.5,0.5,"true");
        cannonBody=Utils.ButtonSettingsControl(cannonBody,340,1164,'cannon_body',this.CanonClick,null,null,null,"true","true",0.5,0.5,0.5,0.5,"true");
        cloud=Utils.SpriteSettingsControl(cloud,700,250,'cloud',"true","true",0.5,0.5,0.5,0.5,"true");
        cloud1=Utils.SpriteSettingsControl(cloud1,140,170,'cloud_01',"true","true",0.5,0.5,0.5,0.5,"true");
        cloud2=Utils.SpriteSettingsControl(cloud2,510,500,'cloud_02',"true","true",0.5,0.5,0.5,0.5,"true");
        cloud3=Utils.SpriteSettingsControl(cloud3,700,620,'cloud_01',"true","true",1,1,0.5,0.5,"true");
        cloud4=Utils.SpriteSettingsControl(cloud4,240,720,'cloud_01',"true","true",1,1,0.5,0.5,"true");
        cloud5= Utils.SpriteSettingsControl(cloud5,720,1020,'cloud_01',"true","true",1,1,0.5,0.5,"true");
        cloud6= Utils.SpriteSettingsControl(cloud6,650,850,'cloud_01',"true","true",1,1,0.5,0.5,"true");
        obstacle=Utils.SpriteSettingsControl(obstacle,60,-990,'obstacle',"true","true",0.5,0.5,1,0.8,"true");
        obstacle1=Utils.SpriteSettingsControl(obstacle1,60,-450,'obstacle',"true","true",1,1,0.5,0.5,"true");
        obstacle2=Utils.SpriteSettingsControl(obstacle2,60,-450,'obstacle',"true","true",1,1,0.5,0.5,"true");
        //.....................................................................................................
        this.CreateBlock();
        backgroundSettingLoop=game.time.events.loop(8000,this.BackgroundSetting,this);
       //.............Hand animation..............................................
        handAnimation=game.add.sprite(430,1220,'hand');
        handAnimation.anchor.setTo(0.5);
        handAnimation.scale.setTo(0.5);
        handAnimation.angle-=30;
        handAnimation.animations.add('hand');
        handAnimation.frame=0;
        //.................................................................................................
        if(localStorage.getItem("isFireBallTutorial")=="true")
        {
            StopObstacle=0;           
            pointValue=game.add.text(360,95,'0'+" / "+tutorialPoint,{ font : "82px Arial",fill : "#FFFFFF"});
        }
        else
        pointValue=game.add.text(360,95,'0',{ font : "82px Arial",fill : "#FFFFFF"});
        pointValue.anchor.setTo(0.5);
        scoreOverLay=Utils.SpriteSettingsControl(scoreOverLay,360,-20,'overlay',"true","true",0.5,0.5,0.8,1,"true");
        Layer1=Utils.SpriteSettingsControl(Layer1,360,1266,'Layer1',"true","true",0.5,0.5,0.7,0.48,"true");
        Layer2=Utils.SpriteSettingsControl(Layer2,360,1266,'Layer2',"true","true",0.5,0.5,1.02,0.48,"true");
         //.............................................................
        this.AddtoTopLayers();
        cloud1.position.x=750;
        //......................................................
        if(localStorage.getItem("isFireBallTutorial")=="true")
        {
            
            fireText=game.add.bitmapText(-360,640,'riffic_free_bold','Tap to fire');
            fireText.anchor.setTo(0.5);
            fireText.fontSize=64;
            fireText.tint='#000000';
            var fireTextTween=game.add.tween(fireText).to({ x:350},700,Phaser.Easing.Linear.None,this);
            fireTextTween.onComplete.add(function(){
                tutorialCannonClicked=1;
                bulletClickEnable=1;
            });
            
        }
        else
        {
             pauseButton.inputEnabled=true;
            backButton.inputEnabled=true;
            game.time.events.loop(500,this.TimeDecrease,this);
            startBackground=Utils.ButtonSettingsControl(startBackground,360,640,'white',this.BlackBackground,null,null,null,"true","true",0.5,0.5,720,1280,this);
            timerPause=0;
            startBackground.tint='#000000';
            startBackground.alpha=0.5;
            fireText=game.add.bitmapText(360,640,'riffic_free_bold',fireTextNum);
            fireText.anchor.setTo(0.5);
            fireText.fontSize=100;
            timerBeforeGameLoop= game.time.events.loop(700,this.timerBeforeGame,this)
        }
        game.time.events.loop(500,this.CreateObstacleCheck,this);
    },//end create
    CreateObstacleCheck:function()
    {
        if(StopObstacle==1)
        {
            this.CreateObstacle();
            StopObstacle=0;
        }
    },
    BlackBackground:function(){},
    timerBeforeGame:function()
    {
        game.add.tween(fireText.scale).to({ x:5,y:5},500,Phaser.Easing.Linear.None,this);
        game.add.tween(fireText).to({ alpha:0},500,Phaser.Easing.Linear.None,this).onComplete.add(function(){
            fireText.scale.setTo(1);
            fireText.alpha=1;
            --fireTextNum;
            if(fireTextNum>0)
            fireText.text=fireTextNum;
            else if(fireTextNum<0){
                    fireText.destroy();
                    game.time.events.remove(timerBeforeGameLoop);
                    game.add.tween(startBackground).to({ alpha:0},500,Phaser.Easing.Linear.None,this).onComplete.add(function(){
                        timerPause=1;
                        bulletClickEnable=1;
                        tutorialCannonClicked=1;
                        startBackground.destroy();
                    });
                }
                else
                fireText.text="Go";
        });
    },

    update:function()
    {
            
            if(localStorage.getItem("isFireBallTutorial")=="true")
            {
                game.world.bringToTop(handAnimation);
                handAnimation.animations.play('hand',3,true);
            }
            else
            {
                handAnimation.destroy();
            }
            this.CloudMovement();
        if(bulletObstacleCollideCheck==1)
        {
          
            game.physics.arcade.collide(bullet,obstacle,this.BulletObstacleCollideHandler,null,this);
            game.physics.arcade.collide(bullet,obstacle1,this.BulletObstacleCollideHandler,null,this);
            game.physics.arcade.collide(bullet,obstacle2,this.BulletObstacleCollideHandler,null,this);
        }
        if(TwoObstacleCollideCheck==1)
        {
            game.physics.arcade.collide(obstacle,obstacle1,this.TwoObstacleCollide,null,this);
        }
       if(count==0)
        {
            game.physics.arcade.collide(bullet,block[blockCount],this.BulletBlockCollideHandler,null,this);
        }
    },
    CanonClick:function()
    {
        count=0;
        game.add.tween(handAnimation).to({alpha :  0},500,Phaser.Easing.Linear.None,this);
        if(bulletClickEnable==1)
        {
            var tween;
            var tutorialTargetTextTween;
            var tween=game.add.tween(cannonBody.scale).to({ x : 0.55 , y :0.55 },50,Phaser.Easing.Linear.none,this);
            game.add.tween(cannonWheel.scale).to({ x : 0.55 , y :0.55 },50,Phaser.Easing.Linear.in,this);
            tween.onComplete.add(function(){
                game.add.tween(cannonBody.scale).to({ x : 0.5 , y :0.5 },50,Phaser.Easing.Linear.none,this);
                game.add.tween(cannonWheel.scale).to({ x : 0.5 , y :0.5 },50,Phaser.Easing.Linear.in,this);
            });
         //............................................
           game.add.tween(bullet).to({ y : 980 },25,Phaser.Easing.Linear.in,true);
           timerStartLimit=2;
           var scaleTweenComplete= game.add.tween(Layer2.scale).to({ x:1 },1000,Phaser.Easing.Linear.in,this);
           scaleTweenComplete.onComplete.add(function(){
           timer=10;
           timerStartLimit=2;
       
          })
        }
        if(localStorage.getItem("isFireBallTutorial")=="true")
        {
            if(tutorialCannonClicked==1)
            {
                tutorialCannonClicked=0;
                var fireTextTween= game.add.tween(fireText).to({ x:900},500,Phaser.Easing.Linear.None,this);
                    fireTextTween.onComplete.add(function(){
                    bulletClickEnable=0;
                    tutorialTargetText=game.add.bitmapText(-360,640,'riffic_free_bold',"Shoot the target");
                    tutorialTargetText.fontSize=64;
                    tutorialTargetText.anchor.setTo(0.5);
                    tutorialTargetText.tint="#000000";
                     tutorialTargetTextTween=game.add.tween(tutorialTargetText).to({ x:400},700,Phaser.Easing.Linear.None,this);
                    tutorialTargetTextTween.onComplete.add(function(){
                        tween=game.add.tween(pointValue.scale).to({ x:1.5 ,y:1.5},300,Phaser.Easing.Linear.None,this);
                        tween.onComplete.add(function(){
                         game.add.tween(pointValue.scale).to({ x:1 ,y:1},300,Phaser.Easing.Linear.None,this).onComplete.add(function(){
                            bulletClickEnable=1;
                           
                            game.add.tween(tutorialTargetText).to({ x:1050},800,Phaser.Easing.Linear.None,this).onComplete.add(function(){
                                    StopObstacle=1;
                            });  
                         });
                    
                        });
                    });
                })

            }
        }
        else
        {
            if(tutorialCannonClicked==1)
            {
                tutorialCannonClicked=0;
                game.add.tween(fireText).to({ x:900},500,Phaser.Easing.Linear.None,this);
            }
        }
    },
    PauseButtonClicked:function()
    {
        var tween=game.add.tween(pauseButton.scale).to({ x : 0.4 , y :0.4 },100,Phaser.Easing.Linear.in,this);
        tween.onComplete.add(function(){
            game.add.tween(pauseButton.scale).to({ x : 0.5 , y :0.5   },100,Phaser.Easing.Linear.in,this);
        });
        game.tweens.pauseAll();
        bulletClickEnable=0;
        game.time.events.pause(backgroundSettingLoop);
        GamePause.GamePauseCreate();
    },
    BackButtonClicked:function()
    {
        var tween=game.add.tween(backButton.scale).to({ x : 0.4 , y :0.4 },100,Phaser.Easing.Linear.in,this);
        tween.onComplete.add(function(){
            game.add.tween(backButton.scale).to({ x : 0.5 , y :0.5   },100,Phaser.Easing.Linear.in,this);
        });
        setTimeout(() => {
            handAnimation.destroy();
            StateTransition.TransitToSplash();
        },200);
    },
    BulletTweenComplete:function()
    {
        count=0;
    },
    CreateBlock:function()
    {
        var block_Pos_Y=978;//1st block y position
        var  block_Pos_X=350;
        var i=0;
        var color;
        do{
            color=this.BlockColor(i);
            block[i]=Utils.SpriteSettingsControl(block,block_Pos_X,block_Pos_Y,'block_01',"true","true",0.5,0.5,0.5,0.5,"true");
            block[i].tint=color;
            game.physics.enable(block[i],Phaser.Physics.ARCADE);
            i++;
            block_Pos_Y-=30;
            block_Pos_X+=5;
            block[i]=Utils.SpriteSettingsControl(block,block_Pos_X,block_Pos_Y,'block_02',"true","true",0.5,0.5,0.5,0.5,"true");
            block[i].tint=color;
            game.physics.enable(block[i],Phaser.Physics.ARCADE);
            i++;
            block_Pos_Y-=30;
            block_Pos_X+=5;
            block[i]=Utils.SpriteSettingsControl(block,block_Pos_X,block_Pos_Y,'block_03',"true","true",0.5,0.5,0.5,0.5,"true");
            block[i].tint=color;
            game.physics.enable(block[i],Phaser.Physics.ARCADE);
            i++;
            block_Pos_Y-=30;
            block_Pos_X-=5;
            block[i]=Utils.SpriteSettingsControl(block,block_Pos_X,block_Pos_Y,'block_04',"true","true",0.5,0.5,0.5,0.5,"true");
            block[i].tint=color;
            game.physics.enable(block[i],Phaser.Physics.ARCADE);
            i++;
            block_Pos_Y-=30;
            block_Pos_X-=5;
            block[i]=Utils.SpriteSettingsControl(block,block_Pos_X,block_Pos_Y,'block_05',"true","true",0.5,0.5,0.5,0.5,"true");
            block[i].tint=color;
            game.physics.enable(block[i],Phaser.Physics.ARCADE);
            block_Pos_Y-=30;
            i++;
        } while(i<limit); 
        var blockCount=limit-5;
        do{
            color=this.BlockColor(blockCount);
            block[i]=Utils.SpriteSettingsControl(block,block_Pos_X,block_Pos_Y,'block_01',"true","true",0.5,0.5,0.5,0.5,"true");
            block[i].tint=color;
            game.physics.enable(block[i],Phaser.Physics.ARCADE);
            i++;
            block_Pos_Y-=30;
            block_Pos_X+=5;
            block[i]=Utils.SpriteSettingsControl(block,block_Pos_X,block_Pos_Y,'block_02',"true","true",0.5,0.5,0.5,0.5,"true");
            block[i].tint=color;
            game.physics.enable(block[i],Phaser.Physics.ARCADE);
            i++;
            block_Pos_Y-=30;
            block_Pos_X+=5;
            block[i]=Utils.SpriteSettingsControl(block,block_Pos_X,block_Pos_Y,'block_03',"true","true",0.5,0.5,0.5,0.5,"true");
            block[i].tint=color;
            game.physics.enable(block[i],Phaser.Physics.ARCADE);
            i++;
            block_Pos_Y-=30;
            block_Pos_X-=5;
            block[i]=Utils.SpriteSettingsControl(block,block_Pos_X,block_Pos_Y,'block_04',"true","true",0.5,0.5,0.5,0.5,"true");
            block[i].tint=color;
            game.physics.enable(block[i],Phaser.Physics.ARCADE);
            i++;
            block_Pos_Y-=30;
            block_Pos_X-=5;
            block[i]=Utils.SpriteSettingsControl(block,block_Pos_X,block_Pos_Y,'block_05',"true","true",0.5,0.5,0.5,0.5,"true");
            block[i].tint=color;
            game.physics.enable(block[i],Phaser.Physics.ARCADE);
            block_Pos_Y-=30;
            i++;
            blockCount-=5;
        } while(0<=blockCount); 
    },
    BlockColor:function(i)
    {
        var color;
        switch(i)
        {
             case 0:color=colorArray[colorIndex][0];
                     break;
             case 5:color=colorArray[colorIndex][1];
                     break;
             case 10:color=colorArray[colorIndex][2];
                     break;
             case 15:color=colorArray[colorIndex][3];
                     break;
             case 20:color=colorArray[colorIndex][4];
                     break;
             case 25:color=colorArray[colorIndex][5];
                     break;
             case 30:color=colorArray[colorIndex][6];
                     break;
        }
        return color;
    },
    CreateObstacle:function()
    {
            console.log("inside CreateObstacle");
            obstacle.destroy();
            obstacle1.destroy();
            obstacle2.destroy();
            var level=game.rnd.integerInRange(2,4);
            if(level==2)
            this.SecondLevel();
            else   if(level==3)
            this.ThirdLevel();
            else    if(level==4)
            this.FourthLevel();
        
    },
    TwoObstacleCollide:function()
    {
       var obstacle1Tween;
       TwoObstacleCollideCheck=0;  
       if(collisionCheck>=2)
       {
            collisionCheck=0;
            console.log("collide if"+collisionCheck);
            obstacle1Tween=game.add.tween(obstacle).to({ x : -150 },speed-800,Phaser.Easing.Linear.In,true);
            obstacle1Tween=game.add.tween(obstacle1).to({ x : 870 },speed-800,Phaser.Easing.Linear.In,true);
            obstacle1Tween.onComplete.add( this.CreateObstacle,this);
        
        }
        else
        {
            console.log("collide else"+collisionCheck);
            obstacle1Tween=game.add.tween(obstacle).to({ x : -150 },speed-800,Phaser.Easing.Linear.In,true);
            obstacle1Tween=game.add.tween(obstacle1).to({ x : 870 },speed-800,Phaser.Easing.Linear.In,true);
            obstacle1Tween.onComplete.add(this.TwoObstacleCollideCreate,this);
        }
   },
   BulletBlockCollideHandler:function(bullet,platformBase)
   {   
       bullet.destroy();
        if(localStorage.getItem("isFireBallTutorial")=="true")
        {
            if(pointCount==tutorialPoint-1)
            {
                    bulletClickEnable=0;
                    pointCount+=1;
                    pointValue.text=pointCount+" / "+tutorialPoint;
                    console.log("bulletClickEnable = "+bulletClickEnable);
                    localStorage.setItem("isFireBallTutorial",false);
                    cannonBody.alpha=0;
                    cannonWheel.alpha=0;
                    bullet.alpha=0;
                    StateTransition.TransitToGamePlay();
                    
            }
            else
            {
                count=1;
                bullet.destroy();
                block[blockCount].destroy();
                var newBlockPosY;
                var blockTween;
              
                pointCount+=1;
                pointCheck=0;
                block.shift();
                var posY;
                for(var i=0;i<block.length;i++)
                {
                    posY=block[i].position.y;
                    posY+=30;
                    blockTween=game.add.tween(block[i]).to({ y : posY } ,100, Phaser.Easing.Linear.in,true);
                }
                
                blockTween.onComplete.add(this.BlockDownTweenComplete);
                pointValue.text=pointCount+" / "+tutorialPoint;
            }
          
           
        }
        else
        {
            count=1;
            console.log("collide");
            bullet.destroy();
            block[blockCount].destroy();
            var newBlockPosY;
            var blockTween;
            bulletClickEnable=0;
            pointCount++;
            pointCheck=0;
            pointValue.text=pointCount;
            block.shift();
            var posY;
            for(var i=0;i<block.length;i++)
            {
                posY=block[i].position.y;
                posY+=30;
                blockTween=game.add.tween(block[i]).to({ y : posY } ,100, Phaser.Easing.Linear.in,true);
            }
            
            blockTween.onComplete.add(this.BlockDownTweenComplete);
            if(pointCount%30==0)
            {
                if(reverseCreate==0)
                {
                    if(colorIndex==colorArray.length)
                    colorIndex=-1;
                        
                    newBlockPosY=block[block.length-1].position.y;
                    this.CreateNewBlock(newBlockPosY);
                    reverseCreate=1;
                }
                else
                {
                    newBlockPosY=block[block.length-1].position.y;
                    this.BlockCreateReverse(newBlockPosY);
                    reverseCreate=0;
                }
            }
        }
        
    },
    BulletObstacleCollideHandler:function(bullet,obstacle)
    {
        if(localStorage.getItem("isFireBallTutorial")=="true")
        {
            bulletClickEnable=0;
            bullet.destroy();
            this.TutorialWarning();
        }
        else
        {
            bulletClickEnable=0;
            this.GameOver();
            obstacle.tint="0xFF0000";
        }
    },
    BlockDownTweenComplete:function()
    {
        bullet=Utils.SpriteSettingsControl(bullet,340,1175,'ball',"true","true",0.5,0.5,0.5,0.5,"true");
        game.physics.enable(bullet,Phaser.Physics.ARCADE);
        game.world.bringToTop(cannonBody);  
        bulletClickEnable=1;
   },

    FirstLevel:function()
    {
        var FirstLevelComplete;
        obstacle=Utils.SpriteSettingsControl(obstacle,-60,990,'obstacle',"true","true",0.5,0.5,1,0.8,"true");
        obstacle.tint="0xF8F9F9";
        game.physics.enable(obstacle,Phaser.Physics.ARCADE);
        FirstLevelComplete= game.add.tween(obstacle).to({ x : 1050 },speed,Phaser.Easing.Linear.In,true,200,2);
        FirstLevelComplete.onComplete.add(this.CreateObstacle,this);
        
    },
    SecondLevel:function()
    {
        var SecondLevelComplete;
        obstacle=Utils.SpriteSettingsControl(obstacle,-150,990,'obstacle',"true","true",0.5,0.5,2,0.8,"true");
        obstacle.tint="0xF8F9F9";
        game.physics.enable(obstacle,Phaser.Physics.ARCADE);
        SecondLevelComplete= game.add.tween(obstacle).to({ x : 1250 },speed,Phaser.Easing.Linear.In,true,200,2);
        obstacle1=Utils.SpriteSettingsControl(obstacle1,-480,990,'obstacle',"true","true",0.5,0.5,1.2,0.8,"true");
        obstacle1.tint="0xF8F9F9";
        game.physics.enable(obstacle1,Phaser.Physics.ARCADE);
        SecondLevelComplete= game.add.tween(obstacle1).to({ x : 1250-329 },speed,Phaser.Easing.Linear.In,true,200,2);
        SecondLevelComplete.onComplete.add(this.CreateObstacle,this);
    },
    ThirdLevel:function()
    {
        obstacle=Utils.SpriteSettingsControl(obstacle,-150,990,'obstacle',"true","true",0.5,0.5,1.2,0.8,"true");
        obstacle.tint="0xF8F9F9";
        game.physics.enable(obstacle,Phaser.Physics.ARCADE);
        obstacle1=Utils.SpriteSettingsControl(obstacle,870,990,'obstacle',"true","true",0.5,0.5,1.2,0.8,"true");
        obstacle1.tint="0xF8F9F9";
        game.physics.enable(obstacle1,Phaser.Physics.ARCADE);
        this.TwoObstacleCollideCreate();
    },
    FourthLevel:function()
    {
        var FourthLevelComplete;
        obstacle=Utils.SpriteSettingsControl(obstacle,-150,990,'obstacle',"true","true",0.5,0.5,1.4,0.8,"true");
        obstacle.tint="0xF8F9F9";
        game.physics.enable(obstacle,Phaser.Physics.ARCADE);
        FourthLevelComplete= game.add.tween(obstacle).to({ x :1450  },speed,Phaser.Easing.Linear.In,true,200,2);
        obstacle1=Utils.SpriteSettingsControl(obstacle,-480,990,'obstacle',"true","true",0.5,0.5,0.8,0.8,"true");
        obstacle1.tint="0xF8F9F9";
        game.physics.enable(obstacle1,Phaser.Physics.ARCADE);
        FourthLevelComplete= game.add.tween(obstacle1).to({ x : 1450-329 },speed,Phaser.Easing.Linear.In,true,200,2);
        obstacle2=Utils.SpriteSettingsControl(obstacle,-810,990,'obstacle',"true","true",0.5,0.5,2,0.8,"true");
        obstacle2.tint="0xF8F9F9";
        game.physics.enable(obstacle2,Phaser.Physics.ARCADE);
        FourthLevelComplete= game.add.tween(obstacle2).to({ x : 1450-660 },speed,Phaser.Easing.Linear.In,true,200,2);
        FourthLevelComplete.onComplete.add(this.CreateObstacle,this);
    },
    TwoObstacleCollideCreate:function()
    {
        collisionCheck++;
        game.add.tween(obstacle).to({ x :   360 },speed-500,Phaser.Easing.Linear.In,true);
        game.add.tween(obstacle1).to({ x : 360 },speed-500,Phaser.Easing.Linear.In,true);
        TwoObstacleCollideCheck=1;
    },
    BackgroundSetting:function()
    {
            if(backGroundArrayIndex>4)
            {
                setTimeout(() => {
                    game.add.tween(backGroundArray[backGroundArrayIndex]).to({ alpha : 0},5000,Phaser.Easing.Linear.In,this);
                    backGroundArrayIndex=0;
                    game.add.tween(backGroundArray[backGroundArrayIndex]).to({ alpha : 1},5000,Phaser.Easing.Linear.In,this);         
                     }, 3000);
                              for(var i = 1;i<=5;i++)
                              {
                                 backGroundArray[i].alpha=0;
                              }
            }
            else
            {
                setTimeout(() => {
                     game.add.tween(backGroundArray[backGroundArrayIndex]).to({ alpha : 0},5000,Phaser.Easing.Linear.In,this);
                    game.add.tween(backGroundArray[backGroundArrayIndex+1]).to({ alpha : 1},5000,Phaser.Easing.Linear.In,this);
                    backGroundArrayIndex+=1;
                 }, 3000);
            }
           ;
    },
    CreateNewBlock:function(newBlockPosY)
    {
        var block_Pos_Y=newBlockPosY;
        var block_Pos_X=355;
        var i=block.length;
        var count=0;
        var color;
        ++colorIndex;
        blockCount=0;
        console.log("CreateNewBlock");
        this.SpeedIncrease();
        if(colorIndex==colorArray.length)
        colorIndex=0;
        do
        {
            color=this.BlockColor(count);
            block[i]=Utils.SpriteSettingsControl(block,block_Pos_X,block_Pos_Y,'block_01',"true","true",0.5,0.5,0.5,0.5,"true");
            block[i].tint=color;
            game.physics.enable(block[i],Phaser.Physics.ARCADE);
            i++;
            block_Pos_Y-=30;
            block_Pos_X+=5;
            block[i]=Utils.SpriteSettingsControl(block,block_Pos_X,block_Pos_Y,'block_02',"true","true",0.5,0.5,0.5,0.5,"true");
            block[i].tint=color;
            game.physics.enable(block[i],Phaser.Physics.ARCADE);
            i++;
            block_Pos_Y-=30;
            block_Pos_X+=5;
            block[i]=Utils.SpriteSettingsControl(block,block_Pos_X,block_Pos_Y,'block_03',"true","true",0.5,0.5,0.5,0.5,"true");
            block[i].tint=color;
            game.physics.enable(block[i],Phaser.Physics.ARCADE);
            i++;
            block_Pos_Y-=30;
            block_Pos_X-=5;
            block[i]=Utils.SpriteSettingsControl(block,block_Pos_X,block_Pos_Y,'block_04',"true","true",0.5,0.5,0.5,0.5,"true");
            block[i].tint=color;
            game.physics.enable(block[i],Phaser.Physics.ARCADE);
            i++;
            block_Pos_Y-=30;
            block_Pos_X-=5;
            block[i]=Utils.SpriteSettingsControl(block,block_Pos_X,block_Pos_Y,'block_05',"true","true",0.5,0.5,0.5,0.5,"true");
            block[i].tint=color;
            game.physics.enable(block[i],Phaser.Physics.ARCADE);
            block_Pos_Y-=30;
            i++;
            count+=5;
            console.log("value of count = "+count);
        }while(count<limit);
        console.log("colorIndex ="+colorIndex);
        reverseCreate=1;
        this.AddtoTopLayers();
    },
    TimeDecrease:function()
    {
        if(timerPause==1)
        {
            if(timerStartLimit==0)
            this.TimerDecreaseShow();
            else
            --timerStartLimit;
        }
    },
    TimerDecreaseShow:function()
    {
        if(timer==0)
        {
            layerTweenScale=game.add.tween(Layer2.scale).to({ x : timer },100,Phaser.Easing.Linear.in,this);
            layerTweenScale.onComplete.add(this.GameOver);
        }
        else if(timerStartLimit==0){
        --timer;  
        var scaleTween=timer/10;
        layerTweenScale=game.add.tween(Layer2.scale).to({ x:scaleTween },1000,Phaser.Easing.Linear.in,this);
        }
   },
    GameOver:function(){
        
        game.tweens.removeAll();
        bulletClickEnable=0;
        bullet.destroy();
        game.time.events.removeAll(backgroundSettingLoop);
        userScore=pointCount;
        if(localStorage.getItem('highscore') < userScore){
            localStorage.setItem('highscore',userScore);
        }
        GameOver.prototype.GameOverCreate();
    },
    BlockCreateReverse:function(newBlockPosY,color)
    {
        var block_Pos_Y=newBlockPosY;
        var block_Pos_X=355;
        var i=block.length;
        var color;
        this.SpeedIncrease();
        colorCheck=6;
       var countBlock=limit-5;
        console.log("on block revere create");
        do
        {
          color=this.BlockColor(countBlock);
           console.log("block count ="+countBlock);
               block[i]=Utils.SpriteSettingsControl(block,block_Pos_X,block_Pos_Y,'block_01',"true","true",0.5,0.5,0.5,0.5,"true");
               block[i].tint=color;
               game.physics.enable(block[i],Phaser.Physics.ARCADE);
               i++;
               block_Pos_Y-=30;
               block_Pos_X+=5;
               block[i]=Utils.SpriteSettingsControl(block,block_Pos_X,block_Pos_Y,'block_02',"true","true",0.5,0.5,0.5,0.5,"true");
               block[i].tint=color;
               game.physics.enable(block[i],Phaser.Physics.ARCADE);
               i++;
               block_Pos_Y-=30;
               block_Pos_X+=5;
               block[i]=Utils.SpriteSettingsControl(block,block_Pos_X,block_Pos_Y,'block_03',"true","true",0.5,0.5,0.5,0.5,"true");
               block[i].tint=color;
               game.physics.enable(block[i],Phaser.Physics.ARCADE);
               i++;
               block_Pos_Y-=30;
               block_Pos_X-=5;
               block[i]=Utils.SpriteSettingsControl(block,block_Pos_X,block_Pos_Y,'block_04',"true","true",0.5,0.5,0.5,0.5,"true");
               block[i].tint=color;
               game.physics.enable(block[i],Phaser.Physics.ARCADE);
               i++;
               block_Pos_Y-=30;
               block_Pos_X-=5;
               block[i]=Utils.SpriteSettingsControl(block,block_Pos_X,block_Pos_Y,'block_05',"true","true",0.5,0.5,0.5,0.5,"true");
               block[i].tint=color;
               game.physics.enable(block[i],Phaser.Physics.ARCADE);
               block_Pos_Y-=30;
               i++;
               countBlock-=5;
          } while(0<=countBlock);  
          this.AddtoTopLayers();
  },
  CloudMovement:function()
  {
    if(cloud.x==-309)
                cloud.x=1400;
            else
                --cloud.x;
            if(cloud1.x==-126)
                cloud1.x=860;
            else
                --cloud1.x;
            if(cloud2.x==-66)
                cloud2.x=1230;
            else
                --cloud2.x;
            if(cloud3.x==-213)
                cloud3.x=1400;
            else
            --cloud3.x;
            if(cloud4.x==-213)
                cloud4.x=960;
            else
            --cloud4.x;
            if(cloud5.x==-213)
               cloud5.x=1440;
            else
               --cloud5.x;
            if(cloud6.x==-213)
                cloud6.x=1370;
           else
              --cloud6.x;
    },
    AddColor:function()
    {
        //Blue color Stack Color....
        blueColor.push("0xe3f2fd");
        blueColor.push("0xbbdefb");
        blueColor.push("0x90caf9");
        blueColor.push("0x64b5f6");
        blueColor.push("0x42a5f5");
        blueColor.push("0x2196f3");
        blueColor.push("0x1e88e5");
        //Pink color Stack Color....
        pinkColor.push("0xfce4ec");
        pinkColor.push("0xf8bbd0");
        pinkColor.push("0xf48fb1");
        pinkColor.push("0xf06292");
        pinkColor.push("0xec407a");
        pinkColor.push("0xe91e63");
        pinkColor.push("0xd81b60");
        //Green color Stack Color.....
        indigoColor.push("0xe8eaf6");
        indigoColor.push("0xc5cae9");
        indigoColor.push("0x9fa8da");
        indigoColor.push("0x7986cb");
        indigoColor.push("0x5c6bc0");
        indigoColor.push("0x3f51b5");
        indigoColor.push("0x3949ab");
        //Purple color Stack Color....
        purpleColor.push("0xf3e5f5");
        purpleColor.push("0xe1bee7");
        purpleColor.push("0xce93d8");
        purpleColor.push("0xba68c8");
        purpleColor.push("0xab47bc");
        purpleColor.push("0x9c27b0");
        purpleColor.push("0x8e24aa");
        //Deep Purple color Stack Color....
        deepPurpleColor.push("0xede7f6");
        deepPurpleColor.push("0xd1c4e9");
        deepPurpleColor.push("0xb39ddb");
        deepPurpleColor.push("0x9575cd");
        deepPurpleColor.push("0x7e57c2");
        deepPurpleColor.push("0x673ab7");
        deepPurpleColor.push("0x5e35b1");
        //Creating 2D color array....
        for(var i = 0;i<5;i++)
        {
            colorArray[i] = [[],[]];
        }
        //Adding colors to array......
        for(var i = 0;i<5;i++)
        {
            switch(i)
            {
                case 0: for(var j = 0;j<pinkColor.length;j++)
                        {
                            colorArray[i][j] = pinkColor[j];
                        }
                        break;
                case 1: for(var j = 0;j<purpleColor.length;j++)
                        {
                            colorArray[i][j] = purpleColor[j];
                        }
                        break;
                case 2: for(var j = 0;j<deepPurpleColor.length;j++)
                        {
                            colorArray[i][j] = deepPurpleColor[j];
                        }
                        break;
                case 3: for(var j = 0;j<deepPurpleColor.length;j++)
                        {
                            colorArray[i][j] = indigoColor[j];
                        }
                        break;
                case 4: for(var j = 0;j<deepPurpleColor.length;j++)
                        {
                            colorArray[i][j] = blueColor[j];
                        }
                        break;
            }
        }
        Debug.log(" colorArray...",colorArray);
    },
    AddtoTopLayers:function()
    {
        game.world.bringToTop(scoreOverLay);
        game.world.bringToTop(Layer1);
        game.world.bringToTop(Layer2);
        game.world.bringToTop(scoreLine);
        game.world.bringToTop(scoreLine1);
        game.world.bringToTop(pointValue);
        game.world.bringToTop(backButton);
        game.world.bringToTop(pauseButton);
    },
    SpeedIncrease:function()
    {
        if(speed<1000)
        {}
        else
        {
            var speedIncrease;
            if(pointCount%10==0)
            {
                speedIncrease=pointCount/10;
                switch(speedIncrease)
                {
                    case 1:speed-=10;
                    console.log("speed = "+speed);
                            break;
                    case 2:speed-=20;
                    console.log("speed = "+speed);
                            break;
                    case 3:speed-=30;
                    console.log("speed = "+speed);
                            break;
                    case 4:speed-=50;
                    console.log("speed = "+speed);
                            break;
                    case 5:speed-=80;
                    console.log("speed = "+speed);
                            break;
                    default :speed-=20;
                    console.log("speed = "+speed); 
                }
            }
        }
    },
    GameStart:function()
    {
        game.tweens.resumeAll();
        bulletClickEnable=1;
        game.time.events.resume(backgroundSettingLoop);
    },
    TutorialPointCheck:function()
    {
        if(pointCount==tutorialPoint)
        {
           bullet.destroy();
            bulletClickEnable=0;
            localStorage.setItem("isFireBallTutorial",false);
            setTimeout(() => {
                StateTransition.TransitToGamePlay();
              }, 400);
        }
        
    },
    TutorialWarning:function()
    {
        bullet=Utils.SpriteSettingsControl(bullet,340,1175,'ball',"true","true",0.5,0.5,0.5,0.5,"true");
        game.physics.enable(bullet,Phaser.Physics.ARCADE);
        game.world.bringToTop(cannonBody);
        var warningText=game.add.bitmapText(360,640,'riffic_free_bold',"Only Shoot the target");
        warningText.fontSize=64;
        warningText.anchor.setTo(0.5);
        warningText.tint="0xE73C46";
        warningText.alpha=0;
        game.add.tween(warningText).to({alpha : 1},500,Phaser.Easing.Linear.None,this).onComplete.add(function()
        {
            game.add.tween(warningText).to({alpha : 0},900,Phaser.Easing.Linear.None,this);
            setTimeout(() => {
                bulletClickEnable=1;
            }, 500);
        });
    }
    
}