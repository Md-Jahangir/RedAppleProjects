var storyGroup;
var storyCharacter;
var runCharacter;
var butterflay;
var storySkipButton;
var skipbttnLoopEvent;

var Story = function () { };
Story.prototype = {
    init: function () {
        Utils.ScaleManager();
    },
    preload: function () {

    },
    create: function () {

        this.CraeteStoryPage();
        this.ShowStoryAnimation();
        if (Database.LoadData("music_on_off") == "0") {
            SoundManager.PlayStoryBgSound();
        }

        GameAnalytics("addDesignEvent", "screen:tutorial");
    },

    CraeteStoryPage: function () {
        storyGroup = game.add.group();

        //ADD BG
        var storyBackground = Utils.SpriteSettingsControl(storyBackground, 640.0, 360.0, 'storyBg', "true", "true", 0.5, 0.5, 1, 1);

        //ADD character sitted
        storyCharacter = Utils.SpriteSettingsControl(storyCharacter, -350.0, 500, 'storyCharacter', "true", "true", 0.5, 0.5, 1, 1);
        // storyCharacter.animations.add("storyCharacterAllAnimation");
        // storyCharacter.animations.add('storyCharacterWalk', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]);
        storyCharacter.animations.add('storyCharacterWalk', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]);
        storyCharacter.animations.add('storyCharacterCatch', [29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61]);
        // storyCharacter.animations.add('storyCharacterCatch', [29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102]);

        //ADD butterflay
        butterflay = Utils.SpriteSettingsControl(butterflay, 1280.0, -100.0, 'butterfly', "true", "true", 0.5, 0.5, 0.5, 0.5);
        butterflay.animations.add("ButterFlyAnimation");
        butterflay.play('ButterFlyAnimation', 15, true);


        //ADD SKIP BUTTON
        storySkipButton = Utils.ButtonSettingsControl(storySkipButton, 1175, 649, 'skipButton', this.StorySkipButtonOnPress, null, null, this.StorySkipButtonOnRelease, "true", "true", 0.5, 0.5, 1, 1, this);


        storyGroup.add(storyBackground);
        storyGroup.add(storyCharacter);
        storyGroup.add(butterflay);
        storyGroup.add(storySkipButton);
        if (!skipbttnLoopEvent) {
            game.time.events.remove(skipbttnLoopEvent);
            skipbttnLoopEvent = game.time.events.loop(2000, this.SkipBttnScale, this);      //Phaser.Timer.SECOND
        }
    },

    ShowStoryAnimation: function () {
        var comingTween = game.add.tween(butterflay.position).to({ x: 740, y: 544 }, 4000, Phaser.Easing.Linear.Out, true, 100);
        comingTween.onComplete.add(function () {
            //Stop the butterfly Coming animation
            butterflay.animations.stop('ButterFlyAnimation');
            butterflay.frame = 1;
        });
        //Enter the character
        storyCharacter.animations.play("storyCharacterWalk", 20, true);
        var characterEntryTween = game.add.tween(storyCharacter.position).to({ x: 500 }, 3000, Phaser.Easing.Linear.Out, true, 400);
        characterEntryTween.onComplete.add(function () {
            //Stop the character animtion and play the catch animation
            storyCharacter.animations.stop('storyCharacterWalk');
            storyCharacter.frame = 27;
            setTimeout(function () {
                var anim = storyCharacter.animations.play("storyCharacterCatch", 13, false);
                anim.onComplete.add(function () {
                    storyCharacter.animations.stop('storyCharacterCatch');
                    storyCharacter.animations.play("storyCharacterWalk", 20, true);
                    var charGoingTween = game.add.tween(storyCharacter.position).to({ x: 1000 }, 3000, Phaser.Easing.Linear.Out, true);
                    charGoingTween.onComplete.add(function () {
                        storyCharacter.animations.stop('storyCharacterWalk');
                        storyCharacter.frame = 100;
                        setTimeout(StateTransition.TransitToGamePlay, 100);
                        setTimeout(this.DestroyStoryPage, 200);
                        setTimeout(function () { SoundManager.StopStoryBgSound(); }, 100);
                    });
                });

            }, 500);

            setTimeout(function () {
                var goingTween = game.add.tween(butterflay.position).to({ x: 1400, y: 240 }, 2500, Phaser.Easing.Linear.Out, true);
                butterflay.animations.play("ButterFlyAnimation", 15, true);
            }, 1000);

        });


        //});
    }, //END OF ShowStoryAnimation FUNCTION

    StorySkipButtonOnPress: function () {
        GameAnalytics("addDesignEvent", "ui:tutorial_skip_clicked");
        SoundManager.StopStoryBgSound();
        game.add.tween(storySkipButton.scale).to({ x: 0.95, y: 0.95 }, 100, Phaser.Easing.Linear.Out, true);
        if (Database.LoadData("sound_on_off") == "0") {
            buttonClickSFX.play();
        }
    },

    StorySkipButtonOnRelease: function () {
        game.add.tween(storySkipButton.scale).to({ x: 1, y: 1 }, 100, Phaser.Easing.Linear.Out, true);
        setTimeout(StateTransition.TransitToGamePlay, 200);
        setTimeout(function () { SoundManager.StopStoryBgSound(); }, 200);

        setTimeout(this.DestroyStoryPage, 500);
    },

    DestroyStoryPage: function () {
        if (storyGroup != null) {
            storyGroup.destroy();
        }
    },

    SkipBttnScale: function () {
        var downTweenScale = game.add.tween(storySkipButton.scale).to({ x: 0.95, y: 0.95 }, 500, Phaser.Easing.Linear.None, true);
        downTweenScale.onComplete.add(function () {
            game.add.tween(storySkipButton.scale).to({ x: 1, y: 1 }, 500, Phaser.Easing.Linear.None, true);
        });
    }
};