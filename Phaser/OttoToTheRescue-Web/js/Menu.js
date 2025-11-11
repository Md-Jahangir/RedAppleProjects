var proceedBttnClick = false;
var Menu = function() {};
Menu.prototype = {
    init: function() {
        Utils.ScaleManager();
    },
    preload: function() {

    },
    create: function() {
        this.CreateMenuPopup();
    },

    CreateMenuPopup: function() {
        gameMenuBg = Utils.SpriteSettingsControl(gameMenuBg, 360, 645, 'menuNewBg', "true", "true", 0.5, 0.5, -0.6, 0.48);
        var gameMenuBgTween = game.add.tween(gameMenuBg.scale).to({ x: 0.6, y: 0.48 }, 500, Phaser.Easing.Cubic.In, true, 100);

        menuTable = Utils.SpriteSettingsControl(menuTable, 360, 1500, 'table', "true", "true", 0.5, 0.5, 0.58, 0.58);
        var menuTableTween = game.add.tween(menuTable).to({ y: 1175 }, 500, Phaser.Easing.Bounce.Out, true, 300);

        playBttn = Utils.ButtonSettingsControl(playBttn, 380.0, 930.0, 'playButton', this.PlayBttnDown, null, null, this.PlayBttnUp, "true", "true", 0.5, 0.5, 0, 0, this);
        playBttn.alpha = 0;

        //Table coming animation complete
        menuTableTween.onComplete.add(function() {
            //play the gun entry animation 
            gun = Utils.SpriteSettingsControl(gun, -620, 1020, 'gun_spriteSheets', "true", "true", 0.5, 0.5, 0.5, 0.5);
            gun.animations.add('gun_fire');
            var gunTween = game.add.tween(gun).to({ x: 620 }, 1200, Phaser.Easing.Exponential.Out, true);

            //ADD basket image
            menuBasket = Utils.SpriteSettingsControl(menuBasket, 350, 445, 'menuBasket', "true", "true", 0.5, 0, 0, 0);
            menuBasket.angle = 50;

            //Show the title art
            gameTitle = Utils.SpriteSettingsControl(gameTitle, 370, 360, 'gameTitle', "true", "true", 0.5, 0.5, 0, 0);
            gameTitle.alpha = 0;
            var gameTitleTween = game.add.tween(gameTitle.scale).to({ x: 0.5, y: 0.5 }, 500, Phaser.Easing.Cubic.Out, true, 400);
            var gameTitleAlphaTween = game.add.tween(gameTitle).to({ alpha: 1 }, 500, Phaser.Easing.Cubic.Out, true, 400);

            //Show the basket
            gameTitleAlphaTween.onComplete.add(function() {

                var menubasketScaletween = game.add.tween(menuBasket.scale).to({ x: 0.5, y: 0.5 }, 400, Phaser.Easing.Linear.Out, true);
                var menuBasketPosTween = game.add.tween(menuBasket).to({ x: 390, y: 445 }, 400, Phaser.Easing.Linear.Out, true);
                var menuBasketTween0 = game.add.tween(menuBasket).to({ angle: 0 }, 400, Phaser.Easing.Linear.Out, true);
                menuBasketTween0.onComplete.add(function() {
                    var menuBasketTween1 = game.add.tween(menuBasket).to({ angle: -5 }, 1200, Phaser.Easing.Linear.Out, true);
                    menuBasketTween1.onComplete.add(function() {
                        var menuBasketTween2 = game.add.tween(menuBasket).to({ angle: 4 }, 1200, Phaser.Easing.Linear.Out, true);
                        menuBasketTween2.onComplete.add(function() {
                            var menuBasketTween3 = game.add.tween(menuBasket).to({ angle: -3 }, 1200, Phaser.Easing.Linear.Out, true);
                            menuBasketTween3.onComplete.add(function() {
                                var menuBasketTween4 = game.add.tween(menuBasket).to({ angle: 2 }, 1200, Phaser.Easing.Linear.Out, true);
                                menuBasketTween4.onComplete.add(function() {
                                    var menuBasketTween5 = game.add.tween(menuBasket).to({ angle: -1 }, 1200, Phaser.Easing.Linear.Out, true);
                                    menuBasketTween5.onComplete.add(function() {
                                        var menuBasketTween6 = game.add.tween(menuBasket).to({ angle: 0 }, 1200, Phaser.Easing.Linear.Out, true);
                                    });
                                });
                            });
                        });
                    });
                });
            });

            gunTween.onComplete.add(function() {
                //play tomato blast animation
                var gunAnim = gun.animations.play('gun_fire', 30, false);
                setTimeout(function() {
                    tomato = Utils.SpriteSettingsControl(tomato, 585, 920, 'tomato', "true", "true", 0.5, 0.5, 0.1, 0.1);
                    tomato.visible = false;

                    gunSmoke = Utils.SpriteSettingsControl(gunSmoke, 510, 850, 'fireSmoke', "true", "true", 0.5, 0.5, 0.6, 0.6);
                    gunSmoke.animations.add('gun_Smoke');

                    gunSmoke.animations.play('gun_Smoke', 20, false);
                    tomato.visible = true;
                    var tomatoScaleTween = game.add.tween(tomato.scale).to({ x: 0.6, y: 0.6 }, 1200, Phaser.Easing.Exponential.Out, true, 100);
                    var tomatoTween = game.add.tween(tomato).to({ x: 435, y: 590 }, 1100, Phaser.Easing.Exponential.Out, true, 100);

                    menuKnife = Utils.SpriteSettingsControl(menuKnife, 0, 555, 'menuKnife', "true", "true", 0, 1, 0.5, 0.5);
                    menuKnife.angle = -50;
                    // var knifeTween = game.add.tween(menuKnife).to({ angle: 0 }, 1000, Phaser.Easing.Bounce.Out, true, 200);
                    var menuKnifeTween = game.add.tween(menuKnife).to({ angle: 0 }, 2500, Phaser.Easing.Elastic.Out, true, 200);


                    var playBttnTween = game.add.tween(playBttn.scale).to({ x: 0.5, y: 0.5 }, 600, Phaser.Easing.Cubic.Out, true, 300);
                    var playBttnAlphaTween = game.add.tween(playBttn).to({ alpha: 1 }, 600, Phaser.Easing.Cubic.Out, true, 300);
                    // playBttn = Utils.ButtonSettingsControl(playBttn, 350.0, 1025.0, 'playBttn', this.PlayBttnDown, null, null, this.PlayBttnUp, "true", "true", 0.5, 0.5, 0.5, 0.5, this);
                    game.world.bringToTop(playBttn);
                    bottomLogo = Utils.SpriteSettingsControl(bottomLogo, 90, 1220, 'bottomLogo', "true", "true", 0.5, 0.5, 0, 0);
                    bottomLogo.alpha = 0;
                    var bottomLogoTween = game.add.tween(bottomLogo.scale).to({ x: 0.5, y: 0.5 }, 500, Phaser.Easing.Cubic.Out, true, 500);
                    var bottomLogoAlphaTween = game.add.tween(bottomLogo).to({ alpha: 1 }, 500, Phaser.Easing.Cubic.Out, true, 500);

                }, 600);
            });
        });

        parentBttn = Utils.ButtonSettingsControl(parentBttn, 130.0, 60.0, 'parentsBttn', this.ParentBttnDown, null, null, this.ParentBttnUp, "true", "true", 0.5, 0.5, 0, 0, this);
        var parentBttnTween = game.add.tween(parentBttn.scale).to({ x: 0.5, y: 0.5 }, 500, Phaser.Easing.Cubic.Out, true, 3000);
        if (isJioSDK) {
            shopBttn = Utils.ButtonSettingsControl(shopBttn, 460, 1240.0, 'shopBttn', this.ShopBttnDown, null, null, this.ShopBttnUp, "true", "true", 0.5, 0.5, 0, 0, this);
            leaderboardBttn = Utils.ButtonSettingsControl(leaderboardBttn, 610.0, 1240.0, 'leaderBoardBttn', this.LeaderboardBttnDown, null, null, this.LeaderBoardBttnUp, "true", "true", 0.5, 0.5, 0, 0, this);
            ShopPopup.CreateShopPopup();
            settingBttn = Utils.ButtonSettingsControl(settingBttn, 310.0, 1240.0, 'settingsBttn', this.SettingsBttnDown, null, null, this.SettingsDownUp, "true", "true", 0.5, 0.5, 0, 0, this);

            var shopBttnTween = game.add.tween(shopBttn.scale).to({ x: 0.7, y: 0.7 }, 500, Phaser.Easing.Cubic.Out, true, 3000);
            var leaderboardBttnTween = game.add.tween(leaderboardBttn.scale).to({ x: 0.7, y: 0.7 }, 500, Phaser.Easing.Cubic.Out, true, 3000);
        } else {
            settingBttn = Utils.ButtonSettingsControl(settingBttn, 370.0, 1240.0, 'settingsBttn', this.SettingsBttnDown, null, null, this.SettingsDownUp, "true", "true", 0.5, 0.5, 0, 0, this);
        }
        var settingBttnTween = game.add.tween(settingBttn.scale).to({ x: 0.7, y: 0.7 }, 500, Phaser.Easing.Cubic.Out, true, 3000);

        ParentPopup.CreateParentPopup();
        SettingPopup.CreateSettingsPopup();
        CreditPopup.CreateCreditPopup();
        WrongPopup.CreateWrongPopup();
        SoundManager.PlayGameplayBgSound();
        //     game.time.events.loop(Phaser.Timer.SECOND, this.PlayBttnScale, this);
        if (proceedBttnClick) {
            proceedBttnClick = false;
            ShopPopup.ShowShopPopup();
        }
    },

    PlayBttnScale: function() {
        var downTweenScale = game.add.tween(playBttn.scale).to({ x: 0.56, y: 0.56 }, 500, Phaser.Easing.Linear.None, true);
        downTweenScale.onComplete.add(function() {
            game.add.tween(playBttn.scale).to({ x: 0.5, y: 0.5 }, 500, Phaser.Easing.Linear.None, true);
        });
    },

    //Play Button
    PlayBttnDown: function() {
        console.log("ply bttn pressed");
        game.add.tween(playBttn.scale).to({ x: 0.45, y: 0.45 }, 400, Phaser.Easing.Bounce.Out, true);
    },
    PlayBttnUp: function() {
        console.log("ply bttn pressed released");
        playBttn.inputEnable = false;
        game.add.tween(playBttn.scale).to({ x: 0.5, y: 0.5 }, 400, Phaser.Easing.Bounce.Out, true);
        setTimeout(() => {
            this.PlayBttnClick();
            playBttn.inputEnable = true;
        }, 500);
    },
    PlayBttnClick: function() {
        SoundManager.PlayButtonSFX();
        StoryPopup.CreateStoryPopup();
        StoryPopup.ShowStoryPopup();
    },
    SpriteMasking: function(imageName, positionX, positionY, diameter) {
        mask = game.add.graphics(positionX, positionY);
        mask.beginFill(0xff00ff);
        mask.drawCircle(100, 100, diameter);
        imageName.mask = mask;
        return imageName;
    },

    //Settings Button
    SettingsBttnDown: function() {
        game.add.tween(settingBttn.scale).to({ x: 0.6, y: 0.6 }, 400, Phaser.Easing.Bounce.Out, true);
    },
    SettingsDownUp: function() {
        settingBttn.inputEnable = false;
        game.add.tween(settingBttn.scale).to({ x: 0.7, y: 0.7 }, 400, Phaser.Easing.Bounce.Out, true);
        setTimeout(() => {
            this.SettingsBttnClick();
            settingBttn.inputEnable = true;
        }, 500);
    },
    SettingsBttnClick: function() {
        SettingPopup.ShowSettingsPopup();
        SoundManager.PlayButtonSFX();
    },

    //Shop Button
    ShopBttnDown: function() {
        game.add.tween(shopBttn.scale).to({ x: 0.6, y: 0.6 }, 400, Phaser.Easing.Bounce.Out, true);
    },
    ShopBttnUp: function() {
        shopBttn.inputEnable = false;
        game.add.tween(shopBttn.scale).to({ x: 0.7, y: 0.7 }, 400, Phaser.Easing.Bounce.Out, true);
        setTimeout(() => {
            this.ShopBttnClick();
            shopBttn.inputEnable = true;
        }, 500);
    },
    ShopBttnClick: function() {
        ShopPopup.ShowShopPopup();
        SoundManager.PlayButtonSFX();
    },

    //LeaderBoard Button
    LeaderboardBttnDown: function() {
        game.add.tween(leaderboardBttn.scale).to({ x: 0.6, y: 0.6 }, 400, Phaser.Easing.Bounce.Out, true);
    },
    LeaderBoardBttnUp: function() {
        leaderboardBttn.inputEnable = false;
        game.add.tween(leaderboardBttn.scale).to({ x: 0.7, y: 0.7 }, 400, Phaser.Easing.Bounce.Out, true);
        setTimeout(() => {
            leaderboardBttn.inputEnable = true;
            this.LeaderBoardBttnClick();
        }, 500);
    },
    LeaderBoardBttnClick: function() {
        // LeaderboardPopup.ShowLeaderboardPopup();
        StateTransition.TransitToLeaderBoard();
        SoundManager.PlayButtonSFX();
    },


    //Parent Button
    ParentBttnDown: function() {
        game.add.tween(parentBttn.scale).to({ x: 0.4, y: 0.4 }, 400, Phaser.Easing.Bounce.Out, true);
    },
    ParentBttnUp: function() {
        parentBttn.inputEnable = false;
        game.add.tween(parentBttn.scale).to({ x: 0.5, y: 0.5 }, 400, Phaser.Easing.Bounce.Out, true);
        setTimeout(() => {
            parentBttn.inputEnable = true;
            this.ParentBttnClick();
        }, 500);
    },
    ParentBttnClick: function() {
        ParentPopup.ShowParentPopup();
        SoundManager.PlayButtonSFX();
    }
};