var gameplayWhiteBackground;
var gamePlayBackground;
var sideBar;
var elephant1,elephant2,alien1,alien2,bee1,bee2,butterfly1,butterfly2,giraffe1,giraffe2,peacock1,peacock2,pumpkin1,pumpkin2,robot1,robot2;
var doneButton;
var gameplayBoy;
var gameplayGirl;
var gamePlayBgAnimation;
var notMatchedText;
var leftSideBar;
var rightSideBar;
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
        if(game.device.touch){
            game.input.mouse.stop();
        }
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
        SoundManager.CreateSound();
        gamePlayBackground = Utils.SpriteSettingsControl(gamePlayBackground, 640, 360, 'whitePixel', "true", "true", 0.5, 0.5, 1280, 1280, this);
        gameplayWhiteBackground = Utils.SpriteSettingsControl(gameplayWhiteBackground, 550, 270, 'costumes', "true", "true", 0.5, 0.5, 1730, 580, this);
        // gameplayWhiteBackground.tint="0xCCD1D1";
        // gameplayWhiteBackground.tint="0x000000";
        doneButton = Utils.ButtonSettingsControl(doneButton, 705, 480, 'btnDone',this.DoneButtonPressed,null,null,null, "true", "true", 0.5, 0.5, 0.65, 0.65, this);

        sideBar = Utils.SpriteSettingsControl(sideBar, 1002, 280, 'taskbar', "true", "true", 0.5, 0.5, 0.146,0.135, this);
        gameplayBoy = Utils.ButtonSettingsControl(gameplayBoy,580, 250, 'boy',null,null,null,null,"true", "true", 0.5, 0.5, 0.55, 0.55, this);
        gameplayGirl = Utils.ButtonSettingsControl(gameplayGirl, 250, 240, 'girl', null,null,null,null,"true", "true", 0.5, 0.5, 0.55, 0.55, this);
        // sideBar.tint = "0x999999";
        //OVER LAP CHECK IMAGES---------------------
        overlapBoyHead = Utils.SpriteSettingsControl(overlapBoyHead, 585, 160, 'transparentImage', "true", "true", 0.5, 0.5, 89, 71, this);
        // overlapBoyHead.visible=false;
        // overlapBoyHead.tint="0xFC0101";
        overlapBoyHead.alpha=0;
        overlapBoyBody = Utils.SpriteSettingsControl(overlapBoyBody, 590, 270, 'transparentImage', "true", "true", 0.5, 0.5, 80, 120, this);
        // overlapBoyBody.visible=false;
        overlapBoyBody.alpha=0;

        overlapGirlHead = Utils.SpriteSettingsControl(overlapGirlHead, 260, 120 , 'transparentImage', "true", "true", 0.5, 0.5, 89, 71, this);
        overlapGirlHead.alpha=0;
        // overlapGirlHead.visible=false;
        // overlapGirlHead.tint="0xFC0101";

        overlapGirlBody = Utils.SpriteSettingsControl(overlapGirlBody, 270, 245, 'transparentImage', "true", "true", 0.5, 0.5, 80, 145, this);
        overlapGirlBody.alpha=0;
        // overlapGirlBody.visible=false;
        //bars for end game animation
        // leftSideBar = Utils.SpriteSettingsControl(leftSideBar, 27, 360, 'whitePixel', "true", "true", 0.5, 0.5, 230, 540, this);
        // leftSideBar.visible=false;
        // leftSideBar.tint="0xFC0101";
        // rightSideBar = Utils.SpriteSettingsControl(rightSideBar, 1255, 360, 'whitePixel', "true", "true", 0.5, 0.5, 230, 540, this);
        // rightSideBar.visible=false;
        // rightSideBar.tint="0xFC0101";
        //Costumes 
        elephant1 = Utils.ButtonSettingsControl(elephant1, 1109, 60, 'elephant1',this.SelectObjectToMove,null,null,null,"true", "true", 0.5, 0.5, 0.3, 0.3, this);
        elephant1.input.useHandCursor=true;
        elephant1.previousPositionX=1109
        elephant1.previousPositionY=60;
        elephant1.previousScale=0.3;

        elephant2 = Utils.ButtonSettingsControl(elephant2, 1140, 355, 'elephant2',this.SelectObjectToMove,null,null,null, "true", "true", 0.5, 0.5, 0.28, 0.28, this);
        elephant2.input.useHandCursor=true;
        elephant2.previousPositionX=1140
        elephant2.previousPositionY=355;
        elephant2.previousScale=0.28;

        alien1 = Utils.ButtonSettingsControl(alien1, 875, 50, 'alien1',this.SelectObjectToMove,null,null,null,"true", "true", 0.5, 0.5, 0.4, 0.4, this);
        alien1.input.useHandCursor=true;
        alien1.previousPositionX=875
        alien1.previousPositionY=50;
        alien1.previousScale=0.4;

        alien2 = Utils.ButtonSettingsControl(alien2, 1130, 470, 'alien2',this.SelectObjectToMove,null,null,null, "true", "true", 0.5, 0.5, 0.43, 0.43, this);
        alien2.input.pixelPerfectClick=true;
        alien2.input.useHandCursor=true;
        alien2.previousPositionX=1130
        alien2.previousPositionY=470;
        alien2.previousScale=0.43;

        bee1 = Utils.ButtonSettingsControl(bee1, 1045, 255, 'bee1',this.SelectObjectToMove,null,null,null,"true", "true", 0.5, 0.5, 0.4, 0.4, this);
        bee1.input.useHandCursor=true;
        bee1.previousPositionX=1045
        bee1.previousPositionY=255;
        bee1.previousScale=0.4;

        bee2 = Utils.ButtonSettingsControl(bee2, 895,170, 'bee2',this.SelectObjectToMove,null,null,null, "true", "true", 0.5, 0.5, 0.42, 0.42, this);
        bee2.input.pixelPerfectClick=true;
        bee2.input.useHandCursor=true;
        bee2.previousPositionX=895
        bee2.previousPositionY=140;
        bee2.previousScale=0.42;

        butterfly1 = Utils.ButtonSettingsControl(butterfly1, 1140, 265, 'butterfly1',this.SelectObjectToMove,null,null,null,"true", "true", 0.5, 0.5, 0.4, 0.4, this);
        butterfly1.input.useHandCursor=true;
        butterfly1.previousPositionX=1140
        butterfly1.previousPositionY=265;
        butterfly1.previousScale=0.4;

        butterfly2 = Utils.ButtonSettingsControl(butterfly2, 910, 297, 'butterfly2',this.SelectObjectToMove,null,null,null, "true", "true", 0.5, 0.5, 0.43, 0.43, this);
        butterfly2.input.pixelPerfectClick=true;
        butterfly2.input.useHandCursor=true;
        butterfly2.previousPositionX=910
        butterfly2.previousPositionY=267;
        butterfly2.previousScale=0.43;

        giraffe1 = Utils.ButtonSettingsControl(giraffe1, 1145, 185, 'Giraffe1',this.SelectObjectToMove,null,null,null,"true", "true", 0.5, 0.5, 0.4, 0.4, this);
        giraffe1.input.useHandCursor=true;
        giraffe1.previousPositionX=1145
        giraffe1.previousPositionY=185;
        giraffe1.previousScale=0.4;

        giraffe2 = Utils.ButtonSettingsControl(giraffe2, 1036, 405, 'Giraffe2',this.SelectObjectToMove,null,null,null, "true", "true", 0.5, 0.5, 0.42, 0.42, this);
        // giraffe2.input.pixelPerfectClick=true;
        giraffe2.input.useHandCursor=true;
        giraffe2.previousPositionX=1036
        giraffe2.previousPositionY=405;
        giraffe2.previousScale=0.42;

        peacock1 = Utils.ButtonSettingsControl(peacock1, 1005, 160, 'peacock1',this.SelectObjectToMove,null,null,null,"true", "true", 0.5, 0.5, 0.4, 0.4, this);
        peacock1.input.useHandCursor=true;
        peacock1.previousPositionX=1005
        peacock1.previousPositionY=160;
        peacock1.previousScale=0.4;

        peacock2 = Utils.ButtonSettingsControl(peacock2, 905, 450, 'peacock2',this.SelectObjectToMove,null,null,null, "true", "true", 0.5, 0.5, 0.42, 0.42, this);
        peacock2.input.pixelPerfectClick=true;
        peacock2.input.useHandCursor=true;
        peacock2.previousPositionX=905;
        peacock2.previousPositionY=440;
        peacock2.previousScale=0.42;

        pumpkin1 = Utils.ButtonSettingsControl(pumpkin1, 1145, 120, 'pumpkin1',this.SelectObjectToMove,null,null,null,"true", "true", 0.5, 0.5, 0.4, 0.4, this);
        pumpkin1.input.useHandCursor=true;
        pumpkin1.previousPositionX=1145
        pumpkin1.previousPositionY=120;
        pumpkin1.previousScale=0.4;

        pumpkin2 = Utils.ButtonSettingsControl(pumpkin2, 985, 65, 'pumpkin2',this.SelectObjectToMove,null,null,null, "true", "true", 0.5, 0.5, 0.42, 0.42, this);
        pumpkin2.input.pixelPerfectClick=true;
        pumpkin2.input.useHandCursor=true;
        pumpkin2.previousPositionX=985
        pumpkin2.previousPositionY=65;
        pumpkin2.previousScale=0.42;

        robot1 = Utils.ButtonSettingsControl(robot1, 1045, 325, 'robot1',this.SelectObjectToMove,null,null,null,"true", "true", 0.5, 0.5, 0.4, 0.4, this);
        robot1.input.useHandCursor=true;
        robot1.previousPositionX=1045;
        robot1.previousPositionY=325;
        robot1.previousScale=0.4;

        robot2 = Utils.ButtonSettingsControl(robot2, 1080, 175, 'robot2',this.SelectObjectToMove,null,null,null, "true", "true", 0.5, 0.5, 0.42, 0.42, this);
        robot2.input.pixelPerfectClick=true;
        robot2.input.useHandCursor=true;
        robot2.previousPositionX=1080
        robot2.previousPositionY=175;
        robot2.previousScale=0.42;

        notMatchedText=game.add.text(440,50,"NOT MATCHED",{font:"30px Arial",fill:"#FC0101"});
        notMatchedText.anchor.setTo(0.5);
        notMatchedText.alpha=0;

        gamePlayBgAnimation = Utils.SpriteSettingsControl(gamePlayBgAnimation, 685, 296, 'sprite', "true", "true", 0.5, 0.5, 1, 1, "false");
        gamePlayBgAnimation.width=1730;
        gamePlayBgAnimation.height=610;
        gamePlayBgAnimation.visible=false;
        gamePlayBgAnimation.animations.add('bg_');

        game.input.addMoveCallback(function(pointer,x,y)
        {
            // console.log(pointer.position);
            if(objectToMove!=null)
            {
                // objectToMove.position.setTo(pointer.x,pointer.y);
                objectToMove.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));

            }
        });
    },
    update:function()
    {
        // game.world.bringToTop(leftSideBar);
        // game.world.bringToTop(rightSideBar);
    },
    SelectObjectToMove:function(object)
    {
        if(!objectSelected)
        {
            objectSelected=true;
            objectToMove=object;
            game.world.bringToTop(objectToMove);           
            if(object.scale.x!=(object.previousScale+object.previousScale))
            {
                // previousX=object.position.x;
                // previousY=object.position.y;
                // previousScaleX=object.scale.x;
                // previousScaleY=object.scale.y;
                object.scale.set((object.previousScale+object.previousScale));
                // object.scale.y=(previousScaleY+previousScaleY);
            }
            // else
            // {
            //     this.ReturnToSideBar();
            // }
        }
        else
        {
            console.log("select object to move else part")
            var name=objectToMove.key.match(/(\d+)/);
            switch(name[0])
            {
                case "1": if(this.checkOverlap(objectToMove,overlapGirlHead))
                          {
                              console.log("over lap check");
                            if((objectToMove.position.x>(overlapGirlHead.position.x-50)
                            &&objectToMove.position.x<(overlapGirlHead.position.x+50))
                            && (objectToMove.position.y>(overlapGirlHead.position.y-50)
                            &&objectToMove.position.y<(overlapGirlHead.position.y+50)) 
                                )                   
                            {
                                objectSelected=false;
                                if((chhoosedGirlHead!=null)&&(objectToMove!=chhoosedGirlHead))
                                {
                                    chhoosedGirlHead.position.setTo(chhoosedGirlHead.previousPositionX,chhoosedGirlHead.previousPositionY);
                                    chhoosedGirlHead.scale.setTo(chhoosedGirlHead.previousScale);
                                }
                                if(objectToMove==chhoosedBoyHead)
                                {
                                    chhoosedBoyHead=null;
                                }
                                chhoosedGirlHead=objectToMove;
                                objectToMove=null;
                            }
                            else
                            {
                                chhoosedGirlHead=null;
                                console.log("else");

                                this.ReturnToSideBar();
                            }
                            
                          }
                          else if(this.checkOverlap(objectToMove,overlapBoyHead))
                          {
                              console.log("over lap check");
                            if((objectToMove.position.x>(overlapBoyHead.position.x-80))
                            &&(objectToMove.position.x<(overlapBoyHead.position.x+80))
                            &&(objectToMove.position.y>(overlapBoyHead.position.y-80))
                            &&(objectToMove.position.y<(overlapBoyHead.position.y+80)) 
                                ) 
                            {
                                console.log("if qualify");
                                objectSelected=false;
                                console.log(objectToMove==chhoosedBoyHead);
                                if((chhoosedBoyHead!=null)&&(objectToMove!=chhoosedBoyHead))
                                {
                                    chhoosedBoyHead.position.setTo(chhoosedBoyHead.previousPositionX,chhoosedBoyHead.previousPositionY);
                                    chhoosedBoyHead.scale.setTo(chhoosedBoyHead.previousScale);
                                }
                                if(objectToMove==chhoosedGirlHead)
                                {
                                    chhoosedGirlHead=null;
                                }
                                chhoosedBoyHead=objectToMove;
                                objectToMove=null;
                            }
                            else
                            {
                                console.log("else");
                                chhoosedBoyHead=null;
                                this.ReturnToSideBar();
                            }
                          }
                          else
                          {
                              console.log("else");
                            if(objectToMove==chhoosedBoyHead)
                            {
                                chhoosedBoyHead=null;
                            }
                            if(objectToMove==chhoosedGirlHead)
                            {
                                chhoosedGirlHead=null;
                            }
                            console.log("else");

                            this.ReturnToSideBar();
                          }
                        break;
                case "2": if(this.checkOverlap(objectToMove,overlapGirlBody))
                            {
                                console.log("over lap check");
                                if((objectToMove.x>(gameplayGirl.x-80)&&objectToMove.x<(gameplayGirl.x+90))&&
                                    (objectToMove.y>(gameplayGirl.y-70)&&objectToMove.y<(gameplayGirl.y+110)) 
                                )                   
                                {
                                    objectSelected=false;
                                    if((chhoosedGirlBody!=null)&&(objectToMove!=chhoosedGirlBody))
                                    {
                                        chhoosedGirlBody.position.setTo(chhoosedGirlBody.previousPositionX,chhoosedGirlBody.previousPositionY);
                                        chhoosedGirlBody.scale.setTo(chhoosedGirlBody.previousScale);
                                    }
                                    if(objectToMove==chhoosedBoyBody)
                                    {
                                        chhoosedBoyBody=null;
                                    }
                                    chhoosedGirlBody=objectToMove;
                                    objectToMove=null;
                                }
                                else
                                {
                                    console.log("else");
                                    chhoosedGirlBody=null;
                                    this.ReturnToSideBar();
                                }
                            }
                            else if(this.checkOverlap(objectToMove,overlapBoyBody))
                            {
                                console.log("over lap check");
                                if((objectToMove.x>(gameplayBoy.x-40)&&objectToMove.x<(gameplayBoy.x+50))&&
                                    (objectToMove.y>(gameplayBoy.y-70)&&objectToMove.y<(gameplayBoy.y+110)) 
                                )                   
                                {
                                    objectSelected=false;
                                    if((chhoosedBoyBody!=null)&&(objectToMove!=chhoosedBoyBody))
                                    {
                                        chhoosedBoyBody.position.setTo(chhoosedBoyBody.previousPositionX,chhoosedBoyBody.previousPositionY);
                                        chhoosedBoyBody.scale.setTo(chhoosedBoyBody.previousScale);
                                    }
                                    if(objectToMove==chhoosedGirlBody)
                                    {
                                        chhoosedGirlBody=null;
                                    }
                                    chhoosedBoyBody=objectToMove;
                                    objectToMove=null;
                                }
                                else
                                {
                                    console.log("else");
                                    chhoosedBoyBody=null;
                                    this.ReturnToSideBar();
                                }
                            }
                            else
                            {
                                console.log("else");
                                if(objectToMove==chhoosedBoyHead)
                                {
                                    chhoosedBoyHead=null;
                                }
                                if(objectToMove==chhoosedGirlHead)
                                {
                                    chhoosedGirlHead=null;
                                }
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
                SoundManager.PlayMatchedSound();
                chhoosedGirlHead.visible=true;
                chhoosedGirlHead.inputEnabled=false;
                chhoosedGirlBody.inputEnabled=false;
                chhoosedGirlBody.visible=true;
                chhoosedBoyHead.inputEnabled=false;
                chhoosedBoyHead.visible=true;
                chhoosedBoyBody.inputEnabled=false;
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
        objectToMove.position.setTo(objectToMove.previousPositionX,objectToMove.previousPositionY);
        objectToMove.scale.setTo(objectToMove.previousScale);
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
        SoundManager.PlayDoesNotMatchedSound();
        game.add.tween(notMatchedText).to({alpha:0},400,Phaser.Easing.Linear.NONE,true).onComplete.add(function()
        {
            doneButton.inputEnabled=true;
        }); 
    }
}