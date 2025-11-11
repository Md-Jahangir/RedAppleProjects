var tutorial=function(){};
// var planet1;
// var planet2;
// var planet3;.
var tutorialCompleteText;
tutorial.prototype= {

    init : function()
    {
        Utils.ScaleManager();
    },
    preload: function()
    {   
           Debug.log('preload ','tutorial '); 
            
    },//end preload
    create: function()
    {
        
        colorIndex=0;
        bulletTime=0;
        pointCounter=0;
        timer=10;//.......timer limit
        timerControl=1;
        fireCheck=1;
        rocketGroup=game.add.group();
        timerStartLimit=2;//............timer start after it becomes 0
        targetDestroyCounter=1;
        gameSpeed=gameSpeedLowLimit;
        pauseButtonCheck=1;
        replayButtonCheck=1;
        isGameOver=1;//check only one time gameover popup should be called
        game.stage.backgroundColor="0x566573";
        homeButtonCheck=1;
        targetDestroyIndex=0;//terget destroy index
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //........Adding Planet.........................................................................
        background=Utils.SpriteSettingsControl(background,360,640,'bg',"true","true",0.5,0.5,0.5,0.3,this);
        background1=Utils.SpriteSettingsControl(background1,360,-1351,'bg',"true","true",0.5,0.5,0.5,0.3,this);
        // this.CreatePlanet();//creat background planet
        //..............Adding Star......................................................................
         starGroup=game.add.group();
         starGroup2=game.add.group();
         starGroup3=game.add.group();
         starGroup.create(560,50,'star1');
         starGroup.create(300,800,'star1');
         starGroup.create(100,400,'star1');
         starGroup.create(600,350,'star1');
         starGroup.create(90,250,'star1');
         starGroup.create(650,250,'star1');
         starGroup.create(150,850,'star1');
         starGroup.create(360,850,'star1');
         starGroup.create(190,850,'star1');
         starGroup.create(360,150,'star1');
         starGroup.create(450,350,'star1');
         starGroup.create(50,350,'star1');
         starGroup.create(450,50,'star1');
         starGroup.create(100,900,'star1');
         starGroup.create(450,920,'star1');
         starGroup.create(450,960,'star1');
         starGroup.create(120,645,'star1');
         starGroup.create(450,540,'star1');
         starGroup.create(470,450,'star1');
         starGroup.create(150,800,'star1');
         starGroup.create(450,890,'star1');
         starGroup.create(500,760,'star1');
         starGroup.create(450,780,'star1');
         starGroup.create(700,350,'star1');
         starGroup.create(620,500,'star1');
         starGroup.create(690,800,'star1');
         starGroup.setAll('anchor.x','0.5');
         starGroup.setAll('anchor.y','0.5');
         starGroup.setAll('scale.x','0.1');
         starGroup.setAll('scale.y','0.1');
        
         //.................................
         starGroup3.create(640,740,'star1');
         starGroup3.create(450,690,'star1');
         starGroup3.create(450,1200,'star1');
         starGroup3.create(690,1050,'star1');
         starGroup3.create(450,350,'star1');
         starGroup3.create(450,100,'star2');
         starGroup3.setAll('anchor.x','0.5');
         starGroup3.setAll('anchor.y','0.5');
         starGroup3.setAll('scale.x','0.1');
         starGroup3.setAll('scale.y','0.1');
         starGroup3.setAll('alpha','0.5');
         //....................................
         starGroup2.create(450,100,'star2');
         starGroup2.create(150,800,'star2');
         starGroup2.create(250,790,'star2');
         starGroup2.create(600,560,'star2');
         starGroup2.create(350,880,'star2');
         starGroup2.create(700,150,'star2');
         starGroup2.setAll('anchor.x','0.5');
         starGroup2.setAll('anchor.y','0.5');
         starGroup2.setAll('scale.x','0.3');
         starGroup2.setAll('scale.y','0.3');
        //.......................SHAKE......................
         shake = new Phaser.Plugin.Shake(game);
         game.plugins.add(shake);
       //...........................................................................................................
        bullet=Utils.ButtonSettingsControl(bullet,380,1200,'bullet',null,null,null,null,"true","true",0.5,0.5,0.5,0.5,this);
        game.physics.enable(bullet,Phaser.Physics.ARCADE);
        cannon=Utils.ButtonSettingsControl(cannon,380,1200,'ROKET',this.fire,null,null,null,"true","true",0.5,0.5,0.3,0.3,this);
        game.physics.enable(cannon,Phaser.Physics.ARCADE);
        //.........BUtton..................................
        pauseButton=Utils.ButtonSettingsControl(pauseButton,80,80,'pauseButton',this.PauseButtonClicked,null,null,null,"true","true",0.5,0.5,0.4,0.4,this);
        homeButton=Utils.ButtonSettingsControl(homeButton,635,80,'homeButton',this.HomeButtonClicked,null,null,null,"true","true",0.5,0.5,0.4,0.4,this);
        //.....point display.......................................................
        pointShowText=game.add.text(360,80,pointCounter+"/12",{fill : "#FFFFFF"});
        pointShowText.anchor.setTo(0.5);
        pointShowText.scale.setTo(1.5);
        rotateCheck=1;
        //...tutorial complete text...........................................
        tutorialCompleteText=game.add.text(360,640,'Tutorial Complete',{fill:'#FFFFFF'});
        tutorialCompleteText.anchor.setTo(0.5);
        tutorialCompleteText.visible=false;
       
       //....TImer.....................
       timerShow=Utils.SpriteSettingsControl(timerShow,360,5,'timer',"true","true",0.5,0.5,1.2,0.5,this);
       timerShow.tint="0x80c2cc";
        //....................fire amination..........................................
                fire=game.add.sprite(380,1290,'rocketFire');

                fire.anchor.setTo(0.5);
        
                fire.animations.add('rocketFire');
                fire.frame=0;
                fire.scale.setTo(0.7);
                fire.y=1270;
        //...........Target Destroy Animation......................................
                targetDestroyAnimation=game.add.sprite(390,405,'targetDestroy');

                targetDestroyAnimation.anchor.setTo(0.5);
                targetDestroyAnimation.scale.setTo(1);
               
                game.physics.enable(targetDestroyAnimation,Phaser.Physics.ARCADE);
        //..............Taget Glow Animation.....................
        console.log("targetAnimation----------------------"+targetAnimation);
                targetAnimation=game.add.sprite(390,405,'tutorial_target_effect');
                targetAnimation.anchor.setTo(0.5);
                targetAnimation.scale.setTo(5);
                targetAnimation.frame=5;
                
        //.............................................
      
       random=game.rnd.integerInRange(1,4);
       rotateCheck=1;
       switch(random)
       {
           case 1: this.Level1();
                   break;
           case 2:this.Level2();
                   break;
           case 3:this.Level3();
                   break;
           case 4:this.Level4();
                   break;
       }
       game.time.events.loop(1000,this.StarTween,this);
       game.time.events.loop(500,this.TimeDecrease,this);
    },
   
    update:function()
    {
         //............LEVEL 1.....................................................
            if(random==1)
            {   
                if(rotateCheck==1)
                {
                    level1Collision.rotation+=gameSpeed;
                    level1Graphics.rotation+=gameSpeed;
                    level1Collision2.rotation+=gameSpeed;
                    level1Graphics2.rotation+=gameSpeed;
                }
                this.game.physics.arcade.overlap(bullet, level1Collision, this.collide, this.processHandler, this);
                this.game.physics.arcade.overlap(bullet, level1Collision2, this.collide, this.processHandler, this);
            }
             //..............LEVEL 2......................................................
            
             if(random==2)
             {
                 if(rotateCheck==1)
                 {
                     level2Collision.rotation+=gameSpeed;
                     level2Graphics.rotation+=gameSpeed;
                     level2Collision2.rotation+=gameSpeed;
                     level2Graphics2.rotation+=gameSpeed;
                     level2Collision3.rotation+=gameSpeed;
                     level2Graphics3.rotation+=gameSpeed;
                     level2Collision4.rotation+=gameSpeed;
                     level2Graphics4.rotation+=gameSpeed;
                 }
                 if(level2Collision!=null)
                 {
                           this.game.physics.arcade.overlap(bullet, level2Collision, this.collide, this.processHandler, this);
                 }
                 if(level2Collision2!=null)
                 {
                          this.game.physics.arcade.overlap(bullet, level2Collision2, this.collide, this.processHandler, this);
                 }
                 if(level2Collision3!=null)
                 {
                          this.game.physics.arcade.overlap(bullet, level2Collision3, this.collide, this.processHandler, this);
                 }
                 if(level2Collision4!=null)
                 {
                         this.game.physics.arcade.overlap(bullet, level2Collision4, this.collide, this.processHandler, this);
                 }
             }
         //........LEVEL 3.....................................................
             if(random==3)
             {
                 if(rotateCheck==1)
                 {
                     level3Graphics.rotation+=gameSpeed;
                     level3Collision.rotation+=gameSpeed;
                     level3Graphics2.rotation+=gameSpeed;
                     level3Collision2.rotation+=gameSpeed
                 }
                 this.game.physics.arcade.overlap(bullet, level3Collision, this.collide, this.processHandler, this);
                 this.game.physics.arcade.overlap(bullet, level3Collision2, this.collide, this.processHandler, this); 
             }
         //............LEVEL 4............................
             if(random==4)
             {
                 if(rotateCheck==1)
                 {
                     level4Graphics.rotation+=gameSpeed;
                     level4Collision.rotation+=gameSpeed;
                 }
                 this.game.physics.arcade.overlap(bullet, level4Collision, this.collide, this.processHandler, this);
             }
         //........LEVEL 5.................................
             if(random==5)
             {
                 if(rotateCheck==1)
                 {
                     level5Collision.rotation+=gameSpeed;
                     level5Graphics.rotation+=gameSpeed;
                     level5Collision2.rotation+=gameSpeed;
                     level5Graphics2.rotation+=gameSpeed;
                 }
                 this.game.physics.arcade.overlap(bullet, level5Collision, this.collide, this.processHandler, this);
                 this.game.physics.arcade.overlap(bullet, level5Collision2, this.collide, this.processHandler, this);
             }
         //....LEVEL 6................................
             if(random==6)
             {
                 if(rotateCheck==1)
                 {
                     level6Collision.rotation+=gameSpeed;
                     level6Graphics.rotation+=gameSpeed;
                     level6Collision2.rotation+=gameSpeed;
                     level6Graphics2.rotation+=gameSpeed;
                 }
                 this.game.physics.arcade.overlap(bullet, level6Collision, this.collide, this.processHandler, this);
                 this.game.physics.arcade.overlap(bullet, level6Collision2, this.collide, this.processHandler, this);
             }
         //..........level 7........................................
            if(random==7)
            {
                if(rotateCheck==1)
                {
                     level7Collision.rotation+=gameSpeed;
                     level7Graphics.rotation+=gameSpeed;
                     level7Collision2.rotation+=gameSpeed;
                     level7Graphics2.rotation+=gameSpeed;
                }
                 this.game.physics.arcade.overlap(bullet, level7Collision, this.collide, this.processHandler, this);
                 this.game.physics.arcade.overlap(bullet, level7Collision2, this.collide, this.processHandler, this);
                 
             }
          //..........level 8........................................
             if(random==8)
             {
                 if(rotateCheck==1)
                 {
                 level8Collision.rotation+=gameSpeed;
                 level8Graphics.rotation+=gameSpeed;
                 }
                 if(bullet){
                     this.game.physics.arcade.overlap(bullet, level8Collision, this.collide, this.processHandler, this);
                     
                 }
                 
             }
            this.game.physics.arcade.overlap(bullet, targetDestroyAnimation, this.pointTargetCollide, null, this);
    },
    PreviosLevelDestroy:function()
    {   
        bullet.destroy();
        fireCheck=0;
        switch(random)
        {
           
            case 1: level1Graphics.destroy();
                    level1Graphics2.destroy();
                    level1Collision.destroy();
                    level1Collision2.destroy();
                    break;
            case 2: level2Graphics.destroy();
                    level2Graphics2.destroy();
                    level2Graphics3.destroy();
                    level2Graphics4.destroy();
                    level2Collision.destroy();
                    level2Collision2.destroy();
                    level2Collision3.destroy();
                    level2Collision4.destroy();
                    break;
            case 3: level3Graphics.destroy();
                    level3Graphics2.destroy();
                    level3Collision.destroy();
                    level3Collision2.destroy();
                    break;
            case 4: level4Graphics.destroy();
                    level4Collision.destroy();
                    break;
            case 5: level5Graphics.destroy();
                    level5Graphics2.destroy();
                    level5Collision.destroy();
                    level5Collision2.destroy();
                    break;
            case 6: level6Graphics.destroy();
                    level6Graphics2.destroy();
                    level6Collision.destroy();
                    level6Collision2.destroy();
                    break;
            case 7: level7Graphics.destroy();
                    level7Graphics2.destroy();
                    level7Collision.destroy();
                    level7Collision2.destroy();
                    break;
            case 8: level8Graphics.destroy();
                    level8Collision.destroy();
                    break
        }
    },
    fire:function()
    {
        collideCheckCount=0;
        timerControl=0;
        var scaleTweenComplete= game.add.tween(timerShow.scale).to({ x:1.5 },1000,Phaser.Easing.Linear.in,this);
        scaleTweenComplete.onComplete.add(function(){
        timer=10;
        timerStartLimit=2;
        timerControl=1;

        });
        if(game.time.now>bulletTime)
        {
            if(fireCheck==1)
            {
                bullet.body.velocity.y=-2000;
                bulletTime+=150;
               
            }
        }
   },
    processHandler:function(bullet,collision)
    {
        return  true;
    },
    pointTargetCollide:function()
    {
        
        shake.shake(5,targetDestroyAnimation);
        var  spriteSheetLength=1;
        if(targetDestroyCounter!=12)
        {
            
            bullet.destroy();
           ++pointCounter;
            pointShowText.setText(pointCounter+"/12");
           
            if(targetDestroyCounter==1)
            {
               
                targetSpriteSheetStart=0;
                targetSpriteSheetEnd=spriteSheetLength;
            }
            else
            {
                targetSpriteSheetStart=targetSpriteSheetEnd;
                targetSpriteSheetEnd=targetSpriteSheetStart+spriteSheetLength;
            }
                var array=[];
                var i=targetSpriteSheetStart;
                var index=0;
                while(i!=targetSpriteSheetEnd)
                {
                    array[index]=i;
                    index++;
                    i++;
                }
                targetDestroyAnimation.animations.add('targetDestroy',array);
                targetDestroyAnimation.animations.play('targetDestroy',10,false);
                bullet=Utils.ButtonSettingsControl(bullet,380,1200,'bullet',this.fire,null,null,null,"true","true",0.5,0.5,0.5,0.5,this);
                game.physics.enable(bullet,Phaser.Physics.ARCADE);
                ++targetDestroyCounter;
                game.world.bringToTop(cannon);
        }
        else
        {
            bullet.destroy();
            fireCheck=0;
            timerControl=0;
            isGameOver=0;
            rotateCheck=0;
            this.PreviosLevelDestroy();
            targetDestroyCounter=1;
            if(targetDestroyIndex!=targetDestroy.length)
            ++targetDestroyIndex;
            else
            {
                targetDestroyIndex=game.rnd.integerInRange(6,10);
            }
            ++pointCounter;
            pointShowText.setText(pointCounter+"/12");
            cannon.y=1190;
            //........Fire animation..................................
            fire.scale.setTo(1);
            fire.y=1280;
            fire.animations.play('rocketFire',10,true);
            game.world.bringToTop(fire);
            //.....................................
            targetSpriteSheetStart=targetSpriteSheetEnd;
            targetSpriteSheetEnd=28;
            targetDestroyAnimation.animations.add('targetDestroy',[12,13,14,15,16,17,18,19,20,21,22,23,25]);
            targetDestroyAnimation.animations.play('targetDestroy',10,false);
            ++targetDestroyCounter;
            game.add.tween(targetDestroyAnimation).to({alpha : 0},1000,Phaser.Easing.Linear.None,this);
            tutorialCompleteText.visible=true;
            game.add.tween(tutorialCompleteText.scale).to({x:4,y:4},1000,Phaser.Easing.Linear.in,this);
            game.world.bringToTop(cannon);
            //.....................................................................
            // game.state.add('GamePlay', GamePlay);
            // game.state.start('GamePlay');
        }
    }, 
    collide:function(bullet,collision)
    {
        if(bullet)
        bullet.body.enable=false;
        collideCheckCount+=1;
        bullet.body.gravity=1;
        bullet.visible=false;
        bullet.position.y=1200;
        bullet.position.x=380;
        rotateCheck=0;
        pointCounter=0;
        game.camera.shake(0.05, 500);
        if(collideCheckCount==1)
        {
            timerControl=0;
            rotateCheck=0;
            GameOverPopUp.GameOverCreate();
        }
    },
    setCircle: function(object)
    {
        object.body.setCircle(12);   
    },
    createArc:function(startAngel,endAngel,dots,name)
    {
       var arcGroup = this.game.add.group();
       arcGroup.createMultiple(dots, 'bullet', [0], true);
       arcGroup.setAll('anchor.x', 0.5);
       arcGroup.setAll('anchor.y', 0.5);
       this.game.physics.arcade.enable(arcGroup);
       //LARGE ARC
        large = new Phaser.Circle(395, 545, 410);
        large.sample(dots, startAngel, endAngel, true, arcGroup.children);
        arcGroup.x = 395;
        arcGroup.y = 545;
        arcGroup.pivot.x = 395;
        arcGroup.pivot.y = 545;
        arcGroup.forEach(this.setCircle, this);
        arcGroup.forEach(function(object){ object.name = name; object.alpha = 0;}, this);
        return arcGroup;
    },
    Level1:function()
    {
        level1Collision=this.createArc(140,230,10,'level1');
        level1Collision.key=0;
        level1Graphics = this.game.add.sprite(380, 406, 'level1_left');
        level1Graphics.tint="0xe69a20";
        level1Graphics.anchor.setTo(0.5, 0.5);
        level1Graphics.scale.setTo(0.56,0.56);
         level1Collision2=this.createArc(-42,50,10,'level1');
        level1Graphics2 = this.game.add.sprite(380, 406, 'level1_right');
        level1Graphics2.tint="0xe69a20";
        level1Graphics2.anchor.setTo(0.5, 0.5);
        level1Graphics2.scale.setTo(0.56,0.56);
    },
    Level2:function()
    {
        level2Collision=this.createArc(155,215,6,'level2');
        level2Graphics = this.game.add.sprite(380, 406, 'level2_01');
        level2Graphics.anchor.setTo(0.5, 0.5);
        level2Graphics.scale.setTo(0.56,0.56);
        level2Graphics.tint="0xe69a20";
        level2Collision2=this.createArc(-25,30,6,'level2');
        level2Graphics2 = this.game.add.sprite(380, 406, 'level2_02');
        level2Graphics2.anchor.setTo(0.5, 0.5);
        level2Graphics2.scale.setTo(0.56,0.56);
        level2Graphics2.tint="0xe69a20";
        level2Collision3=this.createArc(248,300,6,'level2');
        level2Graphics3= this.game.add.sprite(380, 406, 'level2_03');
        level2Graphics3.anchor.setTo(0.5, 0.5);
        level2Graphics3.scale.setTo(0.56,0.56);
        level2Graphics3.tint="0xe69a20";
        level2Collision4=this.createArc(65,120,6,'level2');
        level2Graphics4= this.game.add.sprite(380, 406, 'level2_04');
        level2Graphics4.anchor.setTo(0.5, 0.5);
        level2Graphics4.scale.setTo(0.56,0.56);
        level2Graphics4.tint="0xe69a20";
    },
    Level3:function()
    {
        level3Collision=this.createArc(218,340,10,'level3');
        level3Graphics = this.game.add.sprite(380, 406, 'level3_01');
        level3Graphics.anchor.setTo(0.5, 0.5);
        level3Graphics.scale.setTo(0.56,0.56);
        level3Graphics.tint="0xe69a20";
        level3Collision2=this.createArc(35,160,10,'level3');
        level3Graphics2 = this.game.add.sprite(380, 406, 'level3_02');
        level3Graphics2.anchor.setTo(0.5, 0.5);
        level3Graphics2.scale.setTo(0.56,0.56);
        level3Graphics2.tint="0xe69a20";
    },
    Level4:function()
    {
        level4Check=1;
        level4Collision=this.createArc(94,277,18,'level4');
        level4Graphics = this.game.add.sprite(380, 406, 'level4_01');
        level4Graphics.anchor.setTo(0.5, 0.5);
        level4Graphics.scale.setTo(0.56,0.56);
        level4Graphics.tint="0xe69a20";
    },
    Level5:function()
    {
        level5Check=1;
        level5Collision=this.createArc(-20,210,20,'level5');
        level5Graphics = this.game.add.sprite(380, 406, 'level5_01');
        level5Graphics.anchor.setTo(0.5, 0.5);
        level5Graphics.scale.setTo(0.56,0.56);
        level5Graphics.tint="0xe69a20";
        level5Collision2=this.createArc(248,300,8,'level5');
        level5Graphics2 = this.game.add.sprite(380, 406, 'level5_02');
        level5Graphics2.anchor.setTo(0.5, 0.5);
        level5Graphics2.scale.setTo(0.56,0.56);
        level5Graphics2.tint="0xe69a20";
    },
    Level6:function()
    {
        level6Check=1;
        level6Collision=this.createArc(92,275,20,'level6');
        level6Graphics = this.game.add.sprite(380, 406, 'level6_01');
        level6Graphics.anchor.setTo(0.5, 0.5);
        level6Graphics.scale.setTo(0.56,0.56);
        level6Graphics.tint="0xe69a20";
        level6Collision2=this.createArc(-24,28,8,'level6');
        level6Graphics2 = this.game.add.sprite(380, 406, 'level6_02');
        level6Graphics2.anchor.setTo(0.5, 0.5);
        level6Graphics2.scale.setTo(0.56,0.56);
        level6Graphics2.tint="0xe69a20";
    },
    Level7:function()
    {
        level7Check=1;
        level7Collision=this.createArc(92,275,20,'level7');
        level7Graphics = this.game.add.sprite(380, 406, 'level7_01');
        level7Graphics.anchor.setTo(0.5, 0.5);
        level7Graphics.scale.setTo(0.56,0.56);
        level7Graphics.tint="0xe69a20";
        level7Collision2=this.createArc(-55,60,15,'level7');
        level7Graphics2 = this.game.add.sprite(380, 406, 'level7_02');
        level7Graphics2.anchor.setTo(0.5, 0.5);
        level7Graphics2.scale.setTo(0.56,0.56);
        level7Graphics2.tint="0xe69a20";
    },
    Level8:function()
    {
        level8Check=1;
        level8Collision=this.createArc(20,348,40,'level8');
        level8Graphics = this.game.add.sprite(380, 406, 'level8');
        level8Graphics.anchor.setTo(0.5, 0.5);
        level8Graphics.scale.setTo(0.56,0.56);
        level8Graphics.tint="0xe69a20";
    },
    PauseButtonClicked:function()
    {
        timerControl=0;
        var tween=game.add.tween(pauseButton.scale).to({ x : 0.3 , y :0.3 },100,Phaser.Easing.Linear.in,this);
        tween.onComplete.add(function(){
            game.add.tween(pauseButton.scale).to({ x : 0.4 , y :0.4   },100,Phaser.Easing.Linear.in,this);
        });
        if(pauseButtonCheck==1)
        {
            pauseButtonCheck=0;
            setTimeout(() => {
            
                pausePopUp.pausePopUpCreate();
            }, 300);
        }
    },
    HomeButtonClicked:function()
    {
        if(homeButtonCheck==1)
        {
            var tween=game.add.tween(homeButton.scale).to({ x : 0.3 , y :0.3 },100,Phaser.Easing.Linear.in,this);
            tween.onComplete.add(function(){
                game.add.tween(homeButton.scale).to({ x : 0.4 , y :0.4   },100,Phaser.Easing.Linear.in,this);
            });
            setTimeout(() => {
                homeButtonCheck=0;
                StateTransition.TransitToSplash();
            }, 300);
        }
         
    },
    TimeDecrease:function()
    {
        if(timerControl==1 && isGameOver!=0)
        {
            if(timerStartLimit==0)
                this.TimerDecreaseShow();
            else
            {
                --timerStartLimit;
            }
        }
    },
    TimerDecreaseShow:function()
    {
           
        if(timer==0)
        {
            var timerTweenScale=game.add.tween(timerShow.scale).to({ x : 0 },200,Phaser.Easing.Linear.in,this);
            console.log("timer= "+timer);
            timerTweenScale.onComplete.add(this.GameOver);
             rotateCheck=0;
        }
        else if(timerStartLimit==0)
        {  
             if(timer>=1)
             {
                    var scaleTween=timer/10;
                    --timer;
                    game.add.tween(timerShow.scale).to({ x: scaleTween},500,Phaser.Easing.Linear.in,this);
             }
        }
   },
   GameOver:function()
   {
        console.log("game over function");
        timerControl=0;
        rotateCheck=0;
        game.pause=true;
        GameOverPopUp.GameOverCreate();
       
   },
   getLocationX:function()
   {
       var x;
       do{
               x=game.rnd.integerInRange(0,720)

        }while(x>60&&x<560)
        return x;
    },
    StarTween:function()
     {
        
        starGroup.forEach(function(child)
        {
            var starTween=game.add.tween(child.scale).to({ x : 0.2, y : 0.2},500,Phaser.Easing.Linear.In,this);
             starTween.onComplete.add(function()
             {
                game.add.tween(child.scale).to({ x : 0.1, y : 0.1},500,Phaser.Easing.Linear.In,this);
             });
        });
        starGroup2.forEach(function(child)
        {
            var starTween=game.add.tween(child.scale).to({ x : 0.2, y : 0.2},500,Phaser.Easing.Linear.In,this);
             starTween.onComplete.add(function()
             {
                game.add.tween(child.scale).to({ x : 0.3, y : 0.3},500,Phaser.Easing.Linear.In,this);
             });
        });
        starGroup3.forEach(function(child)
        {
            var starTween=game.add.tween(child.scale).to({ x : 0.2, y : 0.2},500,Phaser.Easing.Linear.In,this);
             starTween.onComplete.add(function()
             {
                game.add.tween(child.scale).to({ x : 0.3, y : 0.3},500,Phaser.Easing.Linear.In,this);
             });
        });
     },
     CreatePlanet:function()
     {
        switch(game.rnd.integerInRange(2,3))
        {
                case 2: console.log("case2");
                        planet1=Utils.SpriteSettingsControl(planet1,this.getLocationX(),game.rnd.integerInRange(0,720),'planet1',"true","ture",0.5,0.5,0.5,0.5);
                        planet1.scale.setTo(0.5);
                        planet2=Utils.SpriteSettingsControl(planet2,this.getLocationX(),game.rnd.integerInRange(0,720),'planet2',"true","ture",0.5,0.5,0.5,0.5);
                        planet2.scale.setTo(0.5);
                        break;

                case 3: console.log("case3");
                        planet1=Utils.SpriteSettingsControl(planet1,this.getLocationX(),game.rnd.integerInRange(0,720),'planet1',"true","ture",0.5,0.5,0.5,0.5);
                        planet1.scale.setTo(0.5);
                        planet2=Utils.SpriteSettingsControl(planet2,this.getLocationX(),game.rnd.integerInRange(0,720),'planet2',"true","ture",0.5,0.5,0.5,0.5);
                        planet2.scale.setTo(0.5);
                        planet3=Utils.SpriteSettingsControl(planet3,this.getLocationX(),game.rnd.integerInRange(0,720),'planet3',"true","ture",0.5,0.5,0.5,0.5);
                        planet3.scale.setTo(0.5);
                        break;
        }  
     }
    
}