//assets
var canon;
var bullets;
var bullet;
var bulletTime=0;
var target;
var collideCheckCount=0;

var level1Graphics;
var level1Graphics2;
var level1Collision;
var level1Collision2;
//.............
var level2Graphics;
var level2Graphics2;
var level2Graphics3;
var level2Graphics4;

var level2Collision;
var level2Collision2;
var level2Collision3;
var level2Collision4;
//...............................
var level3Graphics;
var level3Graphics2;

var level3Collision;
var level3Collision2;
//.......................
var level4Graphics;
var level4Collision;
//..................
var level5Graphics;
var level5Graphics2;
var level5Collision;
var level5Collision2;
//..................................
var level6Graphics;
var level6Graphics2;
var level6Collision;
var level6Collision2;
//.....................................
var level7Graphics;
var level7Graphics2;
var level7Collision;
var level7Collision2;
//...........................
var level8Graphics;
var level8Collision;
//..........Condition for level check....................
var rotateCheck=0;

var bulletTween;
//GamePLay Constant......................................
var circle;
var colors;
var large;
var random;
var doubleObstacleCollision;
var doubleObstacleCollision1;
var tripleObstacleCollision;
var tripleObstacleCollision1;
var tripleObstacleCollision2;
var cannon;
var background;
var background1;
var pauseButton;
var homeButton;
var fireCheck=1;
var homeButtonCheck=1;
var pauseButtonCheck=1;
var targetDestroy=[2,3,4,6,7,8,9,10];//TARGET DESTROY POINT ARRAY
var targetDestroyIndex;//ATRGET DESTROY INDEX
var targetDestroyCounter;//Counts the no of times for each level according to targetDestroy array
var targetSpriteSheetStart;//destroy sprite sheet animation start
var targetSpriteSheetEnd;//destroy sprite sheet animation end
var pointCounter;//counts the points
var pointShowText;//Text show point on the screen
var gameSpeed;
var gameSpeedLowLimit=0.010;
var gameSpeedHighLimit=0.1;
//....................timer.......................
var timer;
var timerShow;
var timerStartLimit;
var timerControl;
//....Stars.......................................
var starGroup;
var starGroup2;
var starGroup3;
var starGroup4;
var starGroup5;
var starGroup6;
//......Rocket group..............
var rocketGroup;
var fire;//rocket fire animation...................
//.....SHAKE........................
var shake;
//...........Planet Display................................
var planetDisplay;
//.........hand animation.......................
var handAnimation;
//.....Tutorial Point.............................
var tutorialPoint=5;
var tutorialCannonClicked=1;
var fireText;
var tutorialTargetText;
//...........Target Animation........
var targetAnimation;
//..................................................R E N D E R......................................................
 /* render: function()
    {
        //..............LEVEL 1....................
        if(random==1)
        {
            this.game.debug.physicsGroup(level1Collision);
            this.game.debug.physicsGroup(level1Collision2);
        }      
        //.............LEVEL 2............................
        if(random==2)
        {
                this.game.debug.physicsGroup(level2Collision);
                this.game.debug.physicsGroup(level2Collision2);
                this.game.debug.physicsGroup(level2Collision3);
                this.game.debug.physicsGroup(level2Collision4);
        }
        //..............LEVEL 3...........................
        if(random==3)
        {
                this.game.debug.physicsGroup(level3Collision);
                this.game.debug.physicsGroup(level3Collision2);
        }
        //......Level 4........................................
        if(random==4)
        {
                this.game.debug.physicsGroup(level4Collision);
        }
        //.........LEVEL 5....................................
        if(random==5)
        {
                  this.game.debug.physicsGroup(level5Collision);
                  this.game.debug.physicsGroup(level5Collision2);
                   this.game.debug.spriteBounds(level5Graphics);
                   this.game.debug.spriteBounds(level5Graphics2);
        }
        //.............LEVEL 6......................................
        if(random==6)
        {
                  this.game.debug.physicsGroup(level6Collision);
                  this.game.debug.physicsGroup(level6Collision2);
        }
        //.............LEVEL 7......................................
        if(random==7)
        {
                this.game.debug.physicsGroup(level7Collision);
                this.game.debug.physicsGroup(level7Collision2);
        }
         //.............LEVEL 8......................................
         if(random==8)
            this.game.debug.physicsGroup(level8Collision);
  
    }, */
    /* if(starGroup.y>300)
           {
       
                starGroup.y=-500;
                    game.add.tween(starGroup).to({ y: 0 },1000,Phaser.Easing.Linear.None,this);
            }
            if(starGroup2.y>600)
            {
                starGroup.y=-500;
            game.add.tween(starGroup2).to({ y: 0 },1000,Phaser.Easing.Linear.None,this);
               
            }
            if(starGroup3.y>800)
            {
                starGroup.y=-500;
            game.add.tween(starGroup3).to({ y: 0 },1000,Phaser.Easing.Linear.None,this);
                
            } */
 /*  if(planetDisplay==1)
        {
            if(planet1 && planet1.y>500)
            game.world.bringToTop(planet1);
            if(planet2  && planet1.y>500)
            game.world.bringToTop(planet2);
            if(planet3  && planet3.y>700)
            game.world.bringToTop(planet3);
        } */