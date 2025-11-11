var gameplayWhiteBackground;
var gamePlayBackground;
var sideBar;
var elephant1,elephant2,alien1,alien2,bee1,bee2,butterfly1,butterfly2,giraffe1,giraffe2,peacock1,peacock2,pumpkin1,pumpkin2,robot1,robot2;
var doneButton;
var gameplayBoy;
var gameplayGirl;
var gamePlayBgAnimation;
var notMatchedText;

//
var objectToMove;
var objectSelected;
var previousX;
var previousY;
var previousScaleX;
var previousScaleY;
var overlapBoyHead;
var overlapBoyBody;
var overlapGirlHead;
var overlapGirlBody;
//
var chhoosedBoyHead;
var chhoosedBoyBody;
var chhoosedGirlHead;
var chhoosedGirlBody;
var GamePlay = function() {};
GamePlay.prototype = {
    init: function() {
        Utils.ScaleManager();
    },
    preload: function() {
        gamePage = "GameplayScreen";
    },
    render: function() {},
    create: function() {
        objectToMove=null;
        objectSelected=false;
        previousScaleX=0;
        previousScaleY=0;
        gamePlayBackground = Utils.SpriteSettingsControl(gamePlayBackground, 640, 360, 'whitePixel', "true", "true", 0.5, 0.5, 1280, 1280, this);
        gameplayWhiteBackground = Utils.SpriteSettingsControl(gameplayWhiteBackground, 630, 360, 'whitePixel', "true", "true", 0.5, 0.5, 1030, 540, this);
        gameplayWhiteBackground.tint="0xCCD1D1";
        doneButton = Utils.ButtonSettingsControl(doneButton, 705, 580, 'btnDone',this.DoneButtonPressed,null,null,null, "true", "true", 0.5, 0.5, 0.65, 0.65, this);

        sideBar = Utils.SpriteSettingsControl(sideBar, 952, 360, 'taskbar', "true", "true", 0.5, 0.5, 0.146,0.129, this);
        gameplayBoy = Utils.ButtonSettingsControl(gameplayBoy,580, 350, 'boy',null,null,null,null,"true", "true", 0.5, 0.5, 0.55, 0.55, this);
        gameplayGirl = Utils.ButtonSettingsControl(gameplayGirl, 320, 340, 'girl', null,null,null,null,"true", "true", 0.5, 0.5, 0.55, 0.55, this);
        // sideBar.tint = "0x999999";
        //OVER LAP CHECK IMAGES---------------------
        overlapBoyHead = Utils.SpriteSettingsControl(overlapBoyHead, 585, 260, 'whitePixel', "true", "true", 0.5, 0.5, 54, 61, this);
        overlapBoyHead.visible=false;
        overlapBoyBody = Utils.SpriteSettingsControl(overlapBoyBody, 590, 370, 'whitePixel', "true", "true", 0.5, 0.5, 80, 120, this);
        overlapBoyBody.visible=false;

        overlapGirlHead = Utils.SpriteSettingsControl(overlapGirlHead, 332, 215, 'whitePixel', "true", "true", 0.5, 0.5, 89, 71, this);
        overlapGirlHead.visible=false;

        overlapGirlBody = Utils.SpriteSettingsControl(overlapGirlBody, 340, 345, 'whitePixel', "true", "true", 0.5, 0.5, 80, 145, this);
        overlapGirlBody.visible=false;
        //Costumes 
        elephant1 = Utils.ButtonSettingsControl(elephant1, 1059, 145, 'elephant1',this.SelectObjectToMove,null,null,null,"true", "true", 0.3, 0.3, 0.3, 0.3, this);
        // elephant1.input.pixelPerfectClick=true;
        elephant1.input.useHandCursor=true;

        elephant2 = Utils.ButtonSettingsControl(elephant2, 1090, 490, 'elephant2',this.SelectObjectToMove,null,null,null, "true", "true", 0.3, 0.9, 0.28, 0.28, this);
        elephant2.input.pixelPerfectClick=true;
        elephant2.input.useHandCursor=true;

        alien1 = Utils.ButtonSettingsControl(alien1, 835, 150, 'alien1',this.SelectObjectToMove,null,null,null,"true", "true", 0.5, 0.5, 0.4, 0.4, this);
        // alien1.input.pixelPerfectClick=true;
        alien1.input.useHandCursor=true;

        alien2 = Utils.ButtonSettingsControl(alien2, 820, 575, 'alien2',this.SelectObjectToMove,null,null,null, "true", "true", 0.5, 0.5, 0.43, 0.43, this);
        alien2.input.pixelPerfectClick=true;
        alien2.input.useHandCursor=true;

        bee1 = Utils.ButtonSettingsControl(bee1, 995, 345, 'bee1',this.SelectObjectToMove,null,null,null,"true", "true", 0.5, 0.5, 0.4, 0.4, this);
        // bee1.input.pixelPerfectClick=true;
        bee1.input.useHandCursor=true;

        bee2 = Utils.ButtonSettingsControl(bee2, 845, 250, 'bee2',this.SelectObjectToMove,null,null,null, "true", "true", 0.5, 0.5, 0.42, 0.42, this);
        bee2.input.pixelPerfectClick=true;
        bee2.input.useHandCursor=true;

        butterfly1 = Utils.ButtonSettingsControl(butterfly1, 1090, 360, 'butterfly1',this.SelectObjectToMove,null,null,null,"true", "true", 0.5, 0.5, 0.4, 0.4, this);
        // butterfly1.input.pixelPerfectClick=true;
        butterfly1.input.useHandCursor=true;

        butterfly2 = Utils.ButtonSettingsControl(butterfly2, 859, 377, 'butterfly2',this.SelectObjectToMove,null,null,null, "true", "true", 0.5, 0.5, 0.43, 0.43, this);
        butterfly2.input.pixelPerfectClick=true;
        butterfly2.input.useHandCursor=true;

        giraffe1 = Utils.ButtonSettingsControl(giraffe1, 847, 475, 'Giraffe1',this.SelectObjectToMove,null,null,null,"true", "true", 0.5, 0.5, 0.4, 0.4, this);
        // giraffe1.input.pixelPerfectClick=true;
        giraffe1.input.useHandCursor=true;

        giraffe2 = Utils.ButtonSettingsControl(giraffe2, 1076, 565, 'Giraffe2',this.SelectObjectToMove,null,null,null, "true", "true", 0.5, 0.5, 0.42, 0.42, this);
        giraffe2.input.pixelPerfectClick=true;
        giraffe2.input.useHandCursor=true;
       
        peacock1 = Utils.ButtonSettingsControl(peacock1, 970, 260, 'peacock1',this.SelectObjectToMove,null,null,null,"true", "true", 0.5, 0.5, 0.4, 0.4, this);
        // peacock1.input.pixelPerfectClick=true;
        peacock1.input.useHandCursor=true;

        peacock2 = Utils.ButtonSettingsControl(peacock2, 955, 555, 'peacock2',this.SelectObjectToMove,null,null,null, "true", "true", 0.5, 0.5, 0.42, 0.42, this);
        peacock2.input.pixelPerfectClick=true;
        peacock2.input.useHandCursor=true;

        pumpkin1 = Utils.ButtonSettingsControl(pumpkin1, 995, 410, 'pumpkin1',this.SelectObjectToMove,null,null,null,"true", "true", 0.5, 0.5, 0.4, 0.4, this);
        // pumpkin1.input.pixelPerfectClick=true;
        pumpkin1.input.useHandCursor=true;

        pumpkin2 = Utils.ButtonSettingsControl(pumpkin2, 955, 165, 'pumpkin2',this.SelectObjectToMove,null,null,null, "true", "true", 0.5, 0.5, 0.42, 0.42, this);
        pumpkin2.input.pixelPerfectClick=true;
        pumpkin2.input.useHandCursor=true;

        robot1 = Utils.ButtonSettingsControl(robot1, 995, 475, 'robot1',this.SelectObjectToMove,null,null,null,"true", "true", 0.5, 0.5, 0.4, 0.4, this);
        // robot1.input.pixelPerfectClick=true;
        robot1.input.useHandCursor=true;

        robot2 = Utils.ButtonSettingsControl(robot2, 1090, 255, 'robot2',this.SelectObjectToMove,null,null,null, "true", "true", 0.5, 0.5, 0.42, 0.42, this);
        robot2.input.pixelPerfectClick=true;
        robot2.input.useHandCursor=true;

        notMatchedText=game.add.text(440,130,"NOT MATCHED",{font:"30px Arial",fill:"#FC0101"});
        notMatchedText.anchor.setTo(0.5);
        notMatchedText.alpha=0;

        gamePlayBgAnimation = Utils.SpriteSettingsControl(gamePlayBgAnimation, 713, 370, 'sprite', "true", "true", 0.5, 0.5, 1, 1, "false");
        gamePlayBgAnimation.width=1448;
        gamePlayBgAnimation.height=550;
        gamePlayBgAnimation.visible=false;
        gamePlayBgAnimation.animations.add('bg_');

        game.input.addMoveCallback(function(pointer,x,y)
        {
            // console.log(pointer.position);
            if(objectToMove!=null)
            {
                objectToMove.position.setTo(pointer.x,pointer.y);
            }
        });
    },
    SelectObjectToMove:function(object)
    {
        if(!objectSelected)
        {
            objectSelected=true;
            objectToMove=object;
            game.world.bringToTop(objectToMove);           
            if(object.scale.x!=(previousScaleX+previousScaleX))
            {
                previousX=object.position.x;
                previousY=object.position.y;
                previousScaleX=object.scale.x;
                previousScaleY=object.scale.y;
                object.scale.x=(previousScaleX+previousScaleX);
                object.scale.y=(previousScaleY+previousScaleY);
            }
            else
            {
                this.ReturnToSideBar();
            }
        }
        else
        {
            var name=objectToMove.key.match(/(\d+)/);
            switch(name[0])
            {
                case "1": if(this.checkOverlap(objectToMove,overlapGirlHead))
                          {
                            if((objectToMove.position.x>(overlapGirlHead.position.x-50)
                            &&objectToMove.position.x<(overlapGirlHead.position.x+50))
                            && (objectToMove.position.y>(overlapGirlHead.position.y-50)
                            &&objectToMove.position.y<(overlapGirlHead.position.y+50)) 
                                )                   
                            {
                                console.log("over lap check");
                                objectSelected=false;
                                chhoosedGirlHead=objectToMove;
                                objectToMove=null;
                            }
                            else
                            {
                                this.ReturnToSideBar();
                            }
                            
                          }
                          else if(this.checkOverlap(objectToMove,overlapBoyHead))
                          {
                            if((objectToMove.position.x>(overlapBoyHead.position.x-50))
                            &&(objectToMove.position.x<(overlapBoyHead.position.x+50))
                            &&(objectToMove.position.y>(overlapBoyHead.position.y-50))
                            &&(objectToMove.position.y<(overlapBoyHead.position.y+50)) 
                                ) 
                            {
                                console.log("over lap check");
                                objectSelected=false;
                                chhoosedBoyHead=objectToMove;
                                objectToMove=null;
                            }
                            else
                            {
                                this.ReturnToSideBar();
                            }
                          }
                          else
                          {
                            this.ReturnToSideBar();
                          }
                        break;
                case "2": if(this.checkOverlap(objectToMove,overlapGirlBody))
                            {
                                if((objectToMove.x>(gameplayGirl.x-80)&&objectToMove.x<(gameplayGirl.x+90))&&
                                    (objectToMove.y>(gameplayGirl.y-70)&&objectToMove.y<(gameplayGirl.y+110)) 
                                )                   
                                {
                                    console.log("over lap check");
                                    objectSelected=false;
                                    chhoosedGirlBody=objectToMove;
                                    objectToMove=null;
                                }
                                else
                                {
                                    this.ReturnToSideBar();
                                }
                            }
                            else if(this.checkOverlap(objectToMove,overlapBoyBody))
                            {
                                if((objectToMove.x>(gameplayBoy.x-40)&&objectToMove.x<(gameplayBoy.x+50))&&
                                    (objectToMove.y>(gameplayBoy.y-70)&&objectToMove.y<(gameplayBoy.y+110)) 
                                )                   
                                {
                                    console.log("over lap check");
                                    objectSelected=false;
                                    chhoosedBoyBody=objectToMove;
                                    objectToMove=null;
                                }
                                else
                                {
                                    this.ReturnToSideBar();
                                }
                            }
                            else
                            {
                                this.ReturnToSideBar();
                            }    
                            break;
            }
                   
        }
    },
    DoneButtonPressed:function()
    {
        console.log("DoneButtonPressed");
        var girlHead,girlBody;
        var boyHead,boyBody;
        if(chhoosedGirlHead!=null &&
            chhoosedGirlBody!=null &&
            chhoosedBoyHead!=null &&
            chhoosedBoyBody!=null)
        {           
            girlHead=this.returnNameOfTheItem(chhoosedGirlHead.key);
            girlBody=this.returnNameOfTheItem(chhoosedGirlBody.key);
            boyHead=this.returnNameOfTheItem(chhoosedBoyHead.key);
            boyBody=this.returnNameOfTheItem(chhoosedBoyBody.key);
            console.log(girlHead+" "+girlBody);
            if(girlBody==girlHead && boyHead== boyBody)
            {
                gameplayWhiteBackground.visible=false;
                sideBar.visible=false;
                doneButton.visible=false;
                elephant1.visible=elephant2.visible=pumpkin1.visible=pumpkin2.visible=bee1.visible=bee2.visible=false;
                peacock1.visible=peacock2.visible=false;
                butterfly1.visible=butterfly2.visible=false;
                alien1.visible=alien2.visible=false;
                giraffe1.visible=giraffe2.visible=false;
                robot1.visible=robot2.visible=false;
                gamePlayBgAnimation.visible=true;
                
                gamePlayBgAnimation.animations.play('bg_', 5, true);
                chhoosedGirlHead.visible=true;
                chhoosedGirlBody.visible=true;
                chhoosedBoyHead.visible=true;
                chhoosedBoyBody.visible=true;
                game.world.bringToTop(gameplayBoy);
                game.world.bringToTop(gameplayGirl);
                game.world.bringToTop(chhoosedGirlHead);
                game.world.bringToTop(chhoosedGirlBody);
                game.world.bringToTop(chhoosedBoyHead);
                game.world.bringToTop(chhoosedBoyBody);
            }
            else
            {
                this.DisplayNotMatched();
            }
        }
        else
        {
            this.DisplayNotMatched()
        }       
    },
    checkOverlap:function(spriteA, spriteB) {

        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();    
        return Phaser.Rectangle.intersects(boundsA, boundsB);    
    },
    ReturnToSideBar:function()
    {
        objectToMove.position.setTo(previousX,previousY);
        objectToMove.scale.setTo(previousScaleX,previousScaleY);
        objectSelected=false;
        objectToMove=null;
    },
    returnNameOfTheItem:function(item)
    {
        var name,dummy;
        dummy=item.match(/(\d+)/);
        name=item.split(dummy[0]);
        return name[0];
    },
    DisplayNotMatched:function()
    {
        notMatchedText.alpha=1;
        doneButton.inputEnabled=false;
        game.add.tween(notMatchedText).to({alpha:0},200,Phaser.Easing.Linear.NONE,true).onComplete.add(function()
        {
            doneButton.inputEnabled=true;
        }); 
    }
}