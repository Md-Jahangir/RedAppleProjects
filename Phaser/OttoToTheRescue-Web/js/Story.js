// var storyGroup;
var story_1;
var story_2;
var story_3;
var story_4;
var story_5;
var story_6;
var story_7;
var story_8;
var story_9;
var story_10;
var story_11;
var story_12;
var story_13;
var story_14;
var story_15;
var story_16;
var story_17;
var story_18;
var story_19;
var story_20;
var story_21;
var delayTime = 400;
var appearanceTime = 1000;
var storyGroup = [];
var storyPageGoBttn;
var storyPageGoBttnTxt;

var StoryPopup = {
    CreateStoryPopup: function() {
        // storyGroup = game.add.group();
        var blackPixel = Utils.ButtonSettingsControl(blackPixel, game.world.centerX,game.world.centerY, 'onePixel', null,null,null, null, "true", "true", 0.5, 0.5, 720, 1280,this);
        blackPixel.tint = "0x000000";

        winPopupBg = Utils.ButtonSettingsControl(winPopupBg, game.world.centerX,game.world.centerY, 'blueOverlay', null,null,null, null, "true", "true", 0.5, 0.5, 1, 1,this);
        
        
        // storyPageGoBttn.alpha = 0;
        storyGroup[16] = storyPageGoBttn;

        story_3 = Utils.SpriteSettingsControl(story_3, 360.0, 235.0, 'story_3', "true", "true", 0.5, 0.5, 0.5, 0.5);
        story_3.alpha = 0;
        storyGroup[2] = story_3;

        story_1 = Utils.SpriteSettingsControl(story_1, 215.0, 170.0, 'story_1', "true", "true", 0.5, 0.5, 0.5, 0.5);
        story_1.alpha = 0;
        storyGroup[0] = story_1;

        story_2 = Utils.SpriteSettingsControl(story_2, 220.0, 120.0, 'story_2', "true", "true", 0.5, 0.5, 0.6, 0.6);
        story_2.alpha = 0;
        storyGroup[1] = story_2;

        story_4 = Utils.SpriteSettingsControl(story_4, 487.0, 15.0, 'story_4', "true", "true", 0.5, 0.5, 0.6, 0.6);
        story_4.alpha = 0;
        storyGroup[3] = story_4;

        story_5 = Utils.SpriteSettingsControl(story_5, 650.0, 160.0, 'story_5', "true", "true", 0.5, 0.5, 0.6, 0.6);
        story_5.alpha = 0;
        storyGroup[4] = story_5;

        story_13 = Utils.SpriteSettingsControl(story_13, 360.0, 660.0, 'story_13', "true", "true", 0.5, 0.5, 0.5, 0.5);
        story_13.alpha = 0;
        storyGroup[12] = story_13;

        story_6 = Utils.SpriteSettingsControl(story_6, 545.0, 475.0, 'story_6', "true", "true", 0.5, 0.5, 0.5, 0.5);
        story_6.alpha = 0;
        storyGroup[5] = story_6;

        story_7 = Utils.SpriteSettingsControl(story_7, 500.0, 425.0, 'story_7', "true", "true", 0.5, 0.5, 0.6, 0.6);
        story_7.alpha = 0;
        storyGroup[6] = story_7;

        story_8 = Utils.SpriteSettingsControl(story_8, 285.0, 580.0, 'story_8', "true", "true", 0.5, 0.5, 0.5, 0.5);
        story_8.alpha = 0;
        storyGroup[7] = story_8;

        story_9 = Utils.SpriteSettingsControl(story_9, 160.0, 540.0, 'story_9', "true", "true", 0.5, 0.5, 0.6, 0.6);
        story_9.alpha = 0;
        storyGroup[8] = story_9;

        story_10 = Utils.SpriteSettingsControl(story_10, 400.0, 575.0, 'story_10', "true", "true", 0.5, 0.5, 0.6, 0.6);
        story_10.alpha = 0;
        storyGroup[9] = story_10;

        story_11 = Utils.SpriteSettingsControl(story_11, 180.0, 690.0, 'story_11', "true", "true", 0.5, 0.5, 0.5, 0.5);
        story_11.alpha = 0;
        storyGroup[10] = story_11;

        story_12 = Utils.SpriteSettingsControl(story_12, 120.0, 640.0, 'story_12', "true", "true", 0.5, 0.5, 0.6, 0.6);
        story_12.alpha = 0;
        storyGroup[11] = story_12;

        story_14 = Utils.SpriteSettingsControl(story_14, 400.0, 720.0, 'story_14', "true", "true", 0.5, 0.5, 0.6, 0.6);
        story_14.alpha = 0;
        storyGroup[13] = story_14;

        story_15 = Utils.SpriteSettingsControl(story_15, 390.0, 800.0, 'story_15', "true", "true", 0.5, 0.5, 0.6, 0.6);
        story_15.alpha = 0;
        storyGroup[14] = story_15;

        story_16 = Utils.SpriteSettingsControl(story_16, 167.0, 1035.0, 'story_16', "true", "true", 0.5, 0.5, 0.5, 0.5);
        story_16.alpha = 0;
        storyGroup[15] = story_16;
        story_17 = Utils.SpriteSettingsControl(story_17, 552.0, 1035.0, 'story_17', "true", "true", 0.5, 0.5, 0.5, 0.5);
        story_17.alpha = 0;
        storyGroup[16] = story_17;
        story_18 = Utils.SpriteSettingsControl(story_18, 200.0, 1035.0, 'story_18', "true", "true", 0.5, 0.5, 0.6, 0.6);
        story_18.alpha = 0;
        storyGroup[17] = story_18;
        story_19 = Utils.SpriteSettingsControl(story_19, 325.0, 960.0, 'story_19', "true", "true", 0.5, 0.5, 0.5, 0.5);
        story_19.alpha = 0;
        storyGroup[18] = story_19;
        story_20 = Utils.SpriteSettingsControl(story_20, 393.0, 1113.0, 'story_20', "true", "true", 0.5, 0.5, 0.5, 0.5);
        story_20.alpha = 0;
        storyGroup[19] = story_20;
        story_21 = Utils.SpriteSettingsControl(story_21, 510.0, 1200.0, 'story_21', "true", "true", 0.5, 0.5, 0.6, 0.6);
        story_21.alpha = 0;
        storyGroup[20] = story_21;
        // console.log("The story Group ",storyGroup);
        storyPageGoBttn = Utils.ButtonSettingsControl(storyPageGoBttn, game.world.centerX,1140, 'goBttn', this.StoryGoBttnDownAnimation,null,null, this.StoryGoBttnUpAnimation, "true", "true", 0.5, 0.5, 0.5, 0.5,this);
        storyPageGoBttnTxt = game.add.bitmapText(game.world.centerX,1130, 'shootEmFont', "SKIP", 35);
        storyPageGoBttnTxt.anchor.set(0.5, 0.5);
        storyPageGoBttnTxt.tint = "0x9c2100";
        // for(var i =1;i<17;i++){
        //     storyGroup.add(story_+""+""+i);
        // }

    },

    CreateStory: function(){
        
    },

    ShowStoryPopup: function(){

        // story1tween = game.add.tween(story_1).to({ alpha: 1 }, delayTime, Phaser.Easing.Linear.Out, true);
        // story1tween.onComplete.add(function(){
        //     story2tween = game.add.tween(story_2).to({ alpha: 1 }, delayTime, Phaser.Easing.Linear.Out, true);
        // });
        
        // for(var i = 0;i<storyGroup.length-1;i++){
        //     console.log("The index of story group........."+storyGroup[i+1].key);
        this.StoryTween();
        // }
    },
    HideStoryPopup: function(){
        
    },
    StoryGoBttnDownAnimation: function(){
        SoundManager.PlayButtonSFX();
        StateTransition.TransitToLevelSelection();
    },
    StoryGoBttnUpAnimation: function(){

    },
    StoryTween: function(){
        story1tween = game.add.tween(story_1).to({ alpha: 1 }, delayTime, Phaser.Easing.Linear.Out, true,400);
        story1tween.onComplete.add(function(){
            story2tween = game.add.tween(story_2).to({ alpha: 1 }, delayTime, Phaser.Easing.Linear.Out, true);
            story2tween.onComplete.add(function(){
                story3tween = game.add.tween(story_3).to({ alpha: 1 }, delayTime, Phaser.Easing.Linear.Out, true,appearanceTime);
                story3tween.onComplete.add(function(){
                    story4tween = game.add.tween(story_4).to({ alpha: 1 }, delayTime, Phaser.Easing.Linear.Out, true);
                    story4tween.onComplete.add(function(){
                        story5tween = game.add.tween(story_5).to({ alpha: 1 }, delayTime, Phaser.Easing.Linear.Out, true);
                        story5tween.onComplete.add(function(){
                            story6tween = game.add.tween(story_6).to({ alpha: 1 }, delayTime, Phaser.Easing.Linear.Out, true,appearanceTime);
                            story6tween.onComplete.add(function(){
                                story7tween = game.add.tween(story_7).to({ alpha: 1 }, delayTime, Phaser.Easing.Linear.Out, true);
                                story7tween.onComplete.add(function(){
                                    story8tween = game.add.tween(story_8).to({ alpha: 1 }, delayTime, Phaser.Easing.Linear.Out, true,appearanceTime);
                                    story8tween.onComplete.add(function(){
                                        story9tween = game.add.tween(story_9).to({ alpha: 1 }, delayTime, Phaser.Easing.Linear.Out, true);
                                        story9tween.onComplete.add(function(){
                                            story10tween = game.add.tween(story_10).to({ alpha: 1 }, delayTime, Phaser.Easing.Linear.Out, true);
                                            story10tween.onComplete.add(function(){
                                                story11tween = game.add.tween(story_11).to({ alpha: 1 }, delayTime, Phaser.Easing.Linear.Out, true,appearanceTime);
                                                story11tween.onComplete.add(function(){
                                                    story12tween = game.add.tween(story_12).to({ alpha: 1 }, delayTime, Phaser.Easing.Linear.Out, true);
                                                    story12tween.onComplete.add(function(){
                                                        story13tween = game.add.tween(story_13).to({ alpha: 1 }, delayTime, Phaser.Easing.Linear.Out, true,appearanceTime);
                                                        story13tween.onComplete.add(function(){
                                                            story14tween = game.add.tween(story_14).to({ alpha: 1 }, delayTime, Phaser.Easing.Linear.Out, true);
                                                            story14tween.onComplete.add(function(){
                                                                story15tween = game.add.tween(story_15).to({ alpha: 1 }, delayTime, Phaser.Easing.Linear.Out, true);
                                                                story15tween.onComplete.add(function(){
                                                                    story16tween = game.add.tween(story_16).to({ alpha: 1 }, delayTime, Phaser.Easing.Linear.Out, true);
                                                                    story16tween.onComplete.add(function(){
                                                                        story17tween = game.add.tween(story_17).to({ alpha: 1 }, delayTime, Phaser.Easing.Linear.Out, true);
                                                                            story17tween.onComplete.add(function(){
                                                                                story18tween = game.add.tween(story_18).to({ alpha: 1 }, delayTime, Phaser.Easing.Linear.Out, true);
                                                                                story18tween.onComplete.add(function(){
                                                                                    story19tween = game.add.tween(story_19).to({ alpha: 1 }, delayTime, Phaser.Easing.Linear.Out, true);
                                                                                    story19tween.onComplete.add(function(){
                                                                                        story20tween = game.add.tween(story_20).to({ alpha: 1 }, delayTime, Phaser.Easing.Linear.Out, true);
                                                                                        story20tween.onComplete.add(function(){
                                                                                            story21tween = game.add.tween(story_21).to({ alpha: 1 }, delayTime, Phaser.Easing.Linear.Out, true);
                                                                                            story21tween.onComplete.add(function(){
                                                                                                storyPageGoBttnTxt.setText("GO");
                                                                            //story17tween = game.add.tween(storyPageGoBttn).to({ alpha: 1 }, delayTime, Phaser.Easing.Linear.Out, true,appearanceTime);
                                                                            // story17tween.onComplete.add(function(){
                                                                            //     // var downTweenScale = game.add.tween(storyPageGoBttn.scale).to({ x: 0.4, y: 0.5}, 500, Phaser.Easing.Linear.None, true);
                                                                            //     // downTweenScale.onComplete.add(function(){
                                                                            //     //     game.add.tween(storyPageGoBttn.scale).to({ x: 0.5, y: 0.5}, 500, Phaser.Easing.Linear.None, true);
                                                                            //     // });
                                                                            //     game.time.events.loop(Phaser.Timer.SECOND, this.GoBttn, this);
                                                                            // });
                                                                                        });
                                                                                    });
                                                                                });    
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    },
}