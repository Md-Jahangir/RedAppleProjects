var menuGroup;
var playButton;
var menuBlock;
var settingButton;
var shopButton;
var parentsButton;
var parentJson;
var menuGameTitle;
var kintoonsLogo;
var menuCharacter;
var gameTitleEffect;
var playButtonEffect;
var groundEffect;
var menuGrassOne;
var menuGrassTwo;
var menuGrassThree;
var playbttnLoopEvent;

var Menu = function () { };
Menu.prototype = {
    init: function () {
        Utils.ScaleManager();
    },

    preload: function () {

    },
    create: function () {
        this.DestroyMenu();
        this.CreateMenu();
        SettingsPopup.CreateSettingsPopup();
        ParentsPopup.CreateParentPopup();
        CreditPopup.CreateCreditPopup();
        WrongPopup.CreateWrongPopup();
        Tutorial.GeneratePlayButtonHint();

        GameAnalytics("addDesignEvent", "screen:title");
    }, //End of create function

    CreateMenu: function () {
        menuGroup = game.add.group();

        //ADD BG
        var menuBackground = Utils.SpriteSettingsControl(menuBackground, -640.0, 360.0, 'menuBackground', "true", "true", 0.5, 0.5, 1, 1);

        // ADD GAME TITLE EFFECT
        gameTitleEffect = Utils.SpriteSettingsControl(gameTitleEffect, 270.0, 250.0, 'gameTitleEffect', "true", "true", 0.5, 0.5, 1, 1);
        gameTitleEffect.animations.add('game_title_effect');
        gameTitleEffect.visible = false;

        // ADD GAME TITLE
        menuGameTitle = Utils.SpriteSettingsControl(menuGameTitle, -920.0, 160.0, 'gameTitle', "true", "true", 0.5, 0.5, 1, 1);

        // ADD MENU MERLE CHARACTER
        menuCharacter = Utils.SpriteSettingsControl(menuCharacter, -350.0, 370.0, 'menuCharacter', "true", "true", 0.5, 0.5, 1, 1);

        // ADD GROUND EFFECT
        groundEffect = Utils.SpriteSettingsControl(groundEffect, 670.0, 600.0, 'groundEffect', "true", "true", 0.5, 0.5, 1, 1);
        groundEffect.animations.add('ground_effect');
        groundEffect.visible = false;

        // ADD KINTOONS LOGO
        // kintoonsLogo = Utils.SpriteSettingsControl(kintoonsLogo, 60.0, 660.0, 'kintoonsLogo', "true", "true", 0.5, 0.5, 0, 0);

        // ADD PLAY BUTTON
        playButton = Utils.ButtonSettingsControl(playButton, 670.0, 750.0, 'playButton', this.PlayButtonOnPress, null, null, this.PlayButtonOnRelease, "true", "true", 0.5, 0.5, 0, 0, this);

        // ADD PATH BEHIND PLAY BUTTON
        menuBlock = Utils.SpriteSettingsControl(menuBlock, 686.0, 793.0, 'menuBlock', "true", "true", 0.5, 0.5, 0, 0);

        // ADD PLAY BUTTON EFFECT
        playButtonEffect = Utils.SpriteSettingsControl(playButtonEffect, 720.0, 520.0, 'playButtonEffect', "true", "true", 0.5, 0.5, 1, 1);
        playButtonEffect.animations.add('play_button_effect');
        playButtonEffect.visible = false;

        //ADD GRASS 1
        menuGrassOne = Utils.SpriteSettingsControl(menuGrassOne, 880.0, 750.0, 'menuLeaf', "true", "true", 0.5, 1, 0, 0);
        menuGrassOne.angle = -30;

        //ADD GRASS 2
        menuGrassTwo = Utils.SpriteSettingsControl(menuGrassOne, 947.0, 750.0, 'menuLeaf', "true", "true", 0.5, 1, 0, 0);
        menuGrassTwo.angle = -35;

        //ADD GRASS 3
        menuGrassThree = Utils.SpriteSettingsControl(menuGrassOne, 1250.0, 780.0, 'menuLeaf', "true", "true", 0.5, 1, 0, 0);
        menuGrassThree.angle = -30;

        // ADD SETTING BUTTON //x:1130 y: 860
        settingButton = Utils.ButtonSettingsControl(settingButton, 1240.0, -40.0, 'settingButton', this.SettingButtonOnPress, null, null, this.SettingButtonOnRelease, "true", "true", 0.5, 0.5, 1, 1, this);
        // settingButton.visible = false;

        // ADD PARENTS BUTTON
        // parentsButton = Utils.ButtonSettingsControl(parentsButton, 130.0, -40.0, 'parentsButton', this.ParentsButtonOnPress, null, null, this.ParentsButtonOnRelease, "true", "true", 0.5, 0.5, 1, 1, this);
        // parentsButton.visible = false;

        menuGroup.add(menuBackground);
        menuGroup.add(gameTitleEffect);
        menuGroup.add(menuGameTitle);
        menuGroup.add(groundEffect);
        // menuGroup.add(kintoonsLogo);
        menuGroup.add(menuCharacter);
        menuGroup.add(playButton);
        menuGroup.add(menuBlock);
        menuGroup.add(playButtonEffect);
        menuGroup.add(menuGrassOne);
        menuGroup.add(menuGrassTwo);
        menuGroup.add(menuGrassThree);
        menuGroup.add(settingButton);
        // menuGroup.add(parentsButton);

        //ALL ANIMATION ONE BY ONE
        //Bg Tween
        var menuBackgroundTween = game.add.tween(menuBackground).to({ x: 640 }, 300, Phaser.Easing.In, true);

        //Ground(Block) path effect
        setTimeout(function () {
            groundEffect.visible = true;
            var playAnim = groundEffect.animations.play("ground_effect", 23, false);
        }, 300);

        //FOR GRASS ONE TWEEN
        var grassOneScaleTween = game.add.tween(menuGrassOne.scale).to({ x: 0.8, y: 0.8 }, 500, Phaser.Easing.Back.InOut, true, 1000);
        var grassOneAngleTween = game.add.tween(menuGrassOne).to({ angle: 0 }, 500, Phaser.Easing.Back.InOut, true, 1000);
        grassOneAngleTween.onComplete.add(function () {
            var grassOneAngleTween1 = game.add.tween(menuGrassOne).to({ angle: 5 }, 600, Phaser.Easing.Linear.Out, true);
            grassOneAngleTween1.onComplete.add(function () {
                var grassOneAngleTween2 = game.add.tween(menuGrassOne).to({ angle: -5 }, 600, Phaser.Easing.Linear.Out, true);
                grassOneAngleTween2.onComplete.add(function () {
                    var grassOneAngleTween3 = game.add.tween(menuGrassOne).to({ angle: 4 }, 600, Phaser.Easing.Linear.Out, true);
                    grassOneAngleTween3.onComplete.add(function () {
                        var grassOneAngleTween4 = game.add.tween(menuGrassOne).to({ angle: -3 }, 600, Phaser.Easing.Linear.Out, true);
                        grassOneAngleTween4.onComplete.add(function () {
                            var grassOneAngleTween5 = game.add.tween(menuGrassOne).to({ angle: 2 }, 600, Phaser.Easing.Linear.Out, true);
                            grassOneAngleTween5.onComplete.add(function () {
                                var grassOneAngleTween6 = game.add.tween(menuGrassOne).to({ angle: 0 }, 600, Phaser.Easing.Linear.Out, true);
                            });
                        });
                    });
                });
            });
        });
        //FOR GRASS TWO TWEEN
        var menuGrassTwoScaleTween = game.add.tween(menuGrassTwo.scale).to({ x: 0.6, y: 0.6 }, 500, Phaser.Easing.Back.InOut, true, 1000);
        var menuGrassTwoAngleTween = game.add.tween(menuGrassTwo).to({ angle: 5 }, 500, Phaser.Easing.Back.InOut, true, 1000);
        menuGrassTwoAngleTween.onComplete.add(function () {
            var menuGrassTwoAngleTween1 = game.add.tween(menuGrassTwo).to({ angle: 9 }, 600, Phaser.Easing.Linear.Out, true);
            menuGrassTwoAngleTween1.onComplete.add(function () {
                var menuGrassTwoAngleTween2 = game.add.tween(menuGrassTwo).to({ angle: -4 }, 600, Phaser.Easing.Linear.Out, true);
                menuGrassTwoAngleTween2.onComplete.add(function () {
                    var menuGrassTwoAngleTween3 = game.add.tween(menuGrassTwo).to({ angle: 8 }, 600, Phaser.Easing.Linear.Out, true);
                    menuGrassTwoAngleTween3.onComplete.add(function () {
                        var menuGrassTwoAngleTween4 = game.add.tween(menuGrassTwo).to({ angle: -2 }, 600, Phaser.Easing.Linear.Out, true);
                        menuGrassTwoAngleTween4.onComplete.add(function () {
                            var menuGrassTwoAngleTween5 = game.add.tween(menuGrassTwo).to({ angle: 6 }, 600, Phaser.Easing.Linear.Out, true);
                            menuGrassTwoAngleTween5.onComplete.add(function () {
                                var menuGrassTwoAngleTween6 = game.add.tween(menuGrassTwo).to({ angle: 5 }, 600, Phaser.Easing.Linear.Out, true);
                            });
                        });
                    });
                });
            });
        });
        //FOR GRASS THREE TWEEN
        var menuGrassThreeScaleTween = game.add.tween(menuGrassThree.scale).to({ x: 0.5, y: 0.5 }, 500, Phaser.Easing.Back.InOut, true, 1200);
        var menuGrassThreeAngleTween = game.add.tween(menuGrassThree).to({ angle: 0 }, 500, Phaser.Easing.Back.InOut, true, 1200);
        menuGrassThreeAngleTween.onComplete.add(function () {
            var menuGrassThreeAngleTween1 = game.add.tween(menuGrassThree).to({ angle: 6 }, 600, Phaser.Easing.Linear.Out, true);
            menuGrassThreeAngleTween1.onComplete.add(function () {
                var menuGrassThreeAngleTween2 = game.add.tween(menuGrassThree).to({ angle: -6 }, 600, Phaser.Easing.Linear.Out, true);
                menuGrassThreeAngleTween2.onComplete.add(function () {
                    var menuGrassThreeAngleTween3 = game.add.tween(menuGrassThree).to({ angle: 5 }, 600, Phaser.Easing.Linear.Out, true);
                    menuGrassThreeAngleTween3.onComplete.add(function () {
                        var menuGrassThreeAngleTween4 = game.add.tween(menuGrassThree).to({ angle: -4 }, 600, Phaser.Easing.Linear.Out, true);
                        menuGrassThreeAngleTween4.onComplete.add(function () {
                            var menuGrassThreeAngleTween5 = game.add.tween(menuGrassThree).to({ angle: 2 }, 600, Phaser.Easing.Linear.Out, true);
                            menuGrassThreeAngleTween5.onComplete.add(function () {
                                var menuGrassThreeAngleTween6 = game.add.tween(menuGrassThree).to({ angle: 0 }, 600, Phaser.Easing.Linear.Out, true);
                            });
                        });
                    });
                });
            });
        });

        //Game title effect
        setTimeout(function () {
            gameTitleEffect.visible = true;
            var titleAnim = gameTitleEffect.animations.play("game_title_effect", 25, false);
            titleAnim.onComplete.add(function () {
                gameTitleEffect.visible = false;
            },);
        }, 1700);

        //Game title comming tween
        var menuGameTitleTween = game.add.tween(menuGameTitle).to({ x: 920 }, 600, Phaser.Easing.Sinusoidal.Out, true, 1500);
        menuGameTitleTween.onComplete.add(function () {
            //Character comming tween
            var menuCharacterTween = game.add.tween(menuCharacter).to({ x: 350.0 }, 1500, Phaser.Easing.Exponential.Out, true);
            // Single block comming twen
            var menuBlockPosTween = game.add.tween(menuBlock).to({ y: 693 }, 500, Phaser.Easing.Elastic.Out, true, 600);
            var menuBlockScaleTween = game.add.tween(menuBlock.scale).to({ x: 1, y: 1 }, 500, Phaser.Easing.Elastic.Out, true, 600);
            //Play button comming tween
            var playButtonPosTween = game.add.tween(playButton).to({ y: 530 }, 400, Phaser.Easing.Back.InOut, true, 500);
            var playButtonScaleTween = game.add.tween(playButton.scale).to({ x: 1, y: 1 }, 400, Phaser.Easing.Back.InOut, true, 500);
            playButtonPosTween.onComplete.add(function () {

                if (Database.LoadData("is_play_button_hint_shown") == "0") {
                    //SHOW THE PLAY BUTTON HINT
                    //Tutorial.ShowPlayButtonHint();
                }
            });

            //Play button spark effect
            setTimeout(function () {
                playButtonEffect.visible = true;
                var playAnim = playButtonEffect.animations.play("play_button_effect", 20, false);
                playAnim.onComplete.add(function () {
                    playButtonEffect.visible = false;
                });
            }, 550);

            //Kintoons logo tween
            // var kintoonsLogoTween = game.add.tween(kintoonsLogo.scale).to({ x: 1, y: 1 }, 400, Phaser.Easing.Back.InOut, true, 700);
            game.add.tween(settingButton).to({ y: 40 }, 300, Phaser.Easing.Back.InOut, true, 800);
            // game.add.tween(parentsButton).to({ y: 45 }, 300, Phaser.Easing.Back.InOut, true, 800);
        });
        if (!playbttnLoopEvent) {
            game.time.events.remove(playbttnLoopEvent);
            playbttnLoopEvent = game.time.events.loop(2000, this.PlayBttnScale, this);      //Phaser.Timer.SECOND
        }
        if (Database.LoadData("music_on_off") == "0") {
            // SoundManager.PlayMainMenuBgSound();
        }

    }, //End of CreateMenu function

    PlayButtonOnPress: function () {
        GameAnalytics("addDesignEvent", "ui:play_clicked");

        if (Database.LoadData("sound_on_off") == "0") {
            buttonClickSFX.play();
        }

        game.add.tween(playButton.scale).to({ x: 0.95, y: 0.95 }, 100, Phaser.Easing.Linear.Out, true);
    }, //End of PlayButtonOnPress function

    PlayButtonOnRelease: function () {
        playButtonClick += 1;
        Server.PostGameFrequencyToParent(playButtonClick);
        game.add.tween(playButton.scale).to({ x: 1, y: 1 }, 100, Phaser.Easing.Linear.Out, true);
        Tutorial.HidePlayButtonHint();
        SoundManager.StopMainMenuBgSound();
        setTimeout(StateTransition.TransitToStory, 100);
        // setTimeout(StateTransition.TransitToGamePlay, 100);
    }, //End of PlayButtonOnRelease function

    SettingButtonOnPress: function () {
        GameAnalytics("addDesignEvent", "ui:settings_clicked");
        if (Database.LoadData("sound_on_off") == "0") {
            buttonClickSFX.play();
        }
        game.add.tween(settingButton.scale).to({ x: 0.95, y: 0.95 }, 100, Phaser.Easing.Linear.Out, true);
    },
    SettingButtonOnRelease: function () {
        game.add.tween(settingButton.scale).to({ x: 1, y: 1 }, 100, Phaser.Easing.Linear.Out, true);
        SettingsPopup.ShowSettingsPopup();
    },

    // ParentsButtonOnPress: function () {
    //     if (Database.LoadData("sound_on_off") == "0") {
    //         buttonClickSFX.play();
    //     }
    //     game.add.tween(parentsButton.scale).to({ x: 0.95, y: 0.95 }, 100, Phaser.Easing.Linear.Out, true);
    // },
    // ParentsButtonOnRelease: function () {
    //     game.add.tween(parentsButton.scale).to({ x: 1, y: 1 }, 100, Phaser.Easing.Linear.Out, true);
    //     ParentsPopup.ShowParentPopup();
    // },

    DestroyMenu: function () {
        if (menuGroup != null) {
            menuGroup.destroy();
        }
    }, //End of DestroyMenu function

    PlayBttnScale: function () {
        var downTweenScale = game.add.tween(playButton.scale).to({ x: 0.95, y: 0.95 }, 500, Phaser.Easing.Linear.None, true);
        downTweenScale.onComplete.add(function () {
            game.add.tween(playButton.scale).to({ x: 1, y: 1 }, 500, Phaser.Easing.Linear.None, true);
        });
    },


}; //End of Menu.prototype