var characterfrighten;
var LoadAssets = {
    LoadAllAssets: function() {

        //Common
        game.load.image('onePixel', 'assets/one_pixel_white.png');

        //Splash Page
        game.load.image('splashPage', 'assets/Splash/splash_dummy.png');
        game.load.spritesheet('titleArt', "assets/Splash/title_art_animation.png", 512, 512);

        //NEW MENU
        game.load.image('menuNewBg', 'assets/newMenu/bg.png');
        game.load.image('gameTitle', 'assets/newMenu/title_art.png');
        game.load.image('table', 'assets/newMenu/table.png');
        game.load.image('playButton', 'assets/newMenu/play_button.png');
        game.load.image('bottomLogo', 'assets/newMenu/bottom_logo.png');
        game.load.image('menuKnife', 'assets/newMenu/Knife.png');
        game.load.image('menuBasket', 'assets/newMenu/Basket.png');
        game.load.image('tomato', 'assets/newMenu/Tomato.png');
        game.load.spritesheet('gun_spriteSheets', 'assets/newMenu/Gun_spritesheets.png', 400, 512, 25)
        game.load.spritesheet('fireSmoke', 'assets/newMenu/Gun_Fire.png', 300, 400, 16)

        //Menu Page
        game.load.image('menuBg', 'assets/mainMenu/main_bg_dummy.png');
        game.load.image('playBttn', 'assets/mainMenu/play.png');
        game.load.image('settingsBttn', 'assets/mainMenu/settings.png');
        game.load.image('shopBttn', 'assets/mainMenu/shop.png');
        game.load.image('leaderBoardBttn', 'assets/mainMenu/leaderboard.png');
        game.load.image('parentsBttn', 'assets/mainMenu/for_parents.png');
        game.load.image('titleBg', 'assets/mainMenu/title_dummy.png');

        //LevelSelection Page
        game.load.image('bgScroll', 'assets/levelSelection/bg_scroll.jpg');
        game.load.image('overlay', 'assets/levelSelection/overlay.png');
        game.load.image('pageTitle', 'assets/levelSelection/page_title.png');
        game.load.image('backBttn', 'assets/levelSelection/back.png');
        game.load.image('levelCurrent', 'assets/levelSelection/level_current.png');
        game.load.image('levelActive', 'assets/levelSelection/level_active.png');
        game.load.image('levelLock', 'assets/levelSelection/level_lock.png');
        game.load.image('levelSelecionBase', 'assets/levelSelection/level_selection_base.png');
        game.load.image('topBar', 'assets/levelSelection/top_Bar.png');
        game.load.image('starActive', 'assets/levelSelection/star_active.png');
        game.load.image('starInActive', 'assets/levelSelection/star_inactive.png');

        //Fonts
        shootEmFont = game.load.bitmapFont('shootEmFont', 'fonts/font.png', 'fonts/font.fnt');


        //WinPopup
        game.load.image('blueOverlay', 'assets/win/blue_overlay.png');
        game.load.image('glow', 'assets/win/glow.png');
        game.load.image('lightParticle', 'assets/win/light_particle.png');
        game.load.image('menuBttn', 'assets/win/menu.png');
        game.load.image('nextBttn', 'assets/win/next.png');
        game.load.image('replayBttn', 'assets/win/replay.png');
        game.load.image('winstarActive', 'assets/win/star_active.png');
        game.load.image('winstarInActive', 'assets/win/star_inactive.png');
        game.load.image('winPopupBase', 'assets/win/win_popup_base.png');
        game.load.image('winText', 'assets/win/win_text.png');

        //LoosePopup
        game.load.image('oops', 'assets/loose/oops.png');
        game.load.image('tryAgainTxt', 'assets/loose/try_again_text.png');

        //Gameplay
        game.load.image('cannon_body_sprite', 'assets/Gameplay/Gameplay_1/turretBody_front.png');
        game.load.image('cannon_body_pressed', 'assets/Gameplay/Gameplay_1/turretBody_pressed.png');
        game.load.image('turretBodyBack', 'assets/Gameplay/Gameplay_1/turretBody_back.png');
        game.load.image('bottomTable', 'assets/Gameplay/bottom_table.png');

        game.load.image('gameplayBg', 'assets/Gameplay/gameplay_bg.png');
        game.load.image('grillTop', 'assets/Gameplay/grill_top.png');
        game.load.image('timeBase', 'assets/Gameplay/time_base.png');
        game.load.image('topBar', 'assets/Gameplay/top_Bar.png');
        game.load.image('turretStand', 'assets/Gameplay/turret_stand.png');
        game.load.image('pauseBttn', 'assets/Gameplay/pause.png');
        game.load.image('bombPowerupBttn', 'assets/Gameplay/blaster.png');
        game.load.image('timePowerupBttn', 'assets/Gameplay/slowdown.png');
        game.load.spritesheet('stone_spritesheet', 'assets/Gameplay/Gameplay_1/stone_spritesheet.png')

        if (isJioSDK) {
            game.load.image('bomb', 'assets/Gameplay/Gameplay_1/bomb.png');
            game.load.image('time', 'assets/Gameplay/Gameplay_1/time.png');
            game.load.image('numberCountOverlay', 'assets/Gameplay/Gameplay_1/numberCountOverlay.png');
            game.load.image('powerupOverlay', 'assets/Gameplay/Gameplay_1/overlay.png');
        }

        game.load.image('stone', 'assets/Gameplay/stone.png');
        game.load.image('projectile_marker', 'assets/Gameplay/projectile_marker.png');
        game.load.image('knife', 'assets/Gameplay/knife.png');
        game.load.image('bombProjectile', 'assets/Gameplay/bomb.png');
        game.load.image('timerProjectile', 'assets/Gameplay/time.png');
        game.load.image('gameplayOverlay', 'assets/Gameplay/gameplay_overlay.png');

        //PausePopup
        game.load.image('pauseTxt', 'assets/pause_text.png');
        game.load.image('resumeBttn', 'assets/resume.png');

        //ParentsPopup
        game.load.image('parentsBase', 'assets/parents/parents_base.png');
        game.load.image('answerBase', 'assets/parents/answer_base.png');
        game.load.json('parentJson', 'levels/parentJson.json');

        //SettingPopup
        game.load.image('onBttn', 'assets/settings/on.png');
        game.load.image('offBttn', 'assets/settings/off.png');

        //CreditsPopup
        game.load.image('creditBg', 'assets/credits/credits_bg.png');
        game.load.image('redAppleLogo', 'assets/credits/redapple_logo.png');
        game.load.image('kinsaneLogo', 'assets/credits/kinsane_logo.png');
        game.load.image('termAndUse', 'assets/credits/terms_of_use.png');
        game.load.image('privacyPolicy', 'assets/credits/privacy_policy.png');
        game.load.image('creditContent', 'assets/credits/content.png');


        //ShopPopup
        game.load.image('bombThumbnail', 'assets/shop/bomb.png');
        game.load.image('buyBttn', 'assets/shop/buy_btn.png');
        game.load.image('clock', 'assets/shop/clock.png');
        game.load.image('rupeesSymbol', 'assets/shop/INR.png');
        game.load.image('itemTitle', 'assets/shop/item_title.png');
        game.load.image('shopBase', 'assets/shop/shop_base.png');
        game.load.image('shopItemBase', 'assets/shop/shop_item_base.png');
        game.load.image('slowDownShop', 'assets/shop/slowdown_shop.png');
        game.load.image('blaster_shop', 'assets/shop/blaster_shop.png');
        game.load.image('greenOverlay', 'assets/shop/greenOverlay.png');


        //Leaderboard
        game.load.image('topOverlay', 'assets/leaderboard/top_overlay.png');
        game.load.image('leaderboard_top', 'assets/leaderboard/leaderboard_top.png');
        game.load.image('leaderboard_bottom', 'assets/leaderboard/bottom.png');
        game.load.image('leaderboard_Rank_base', 'assets/leaderboard/Rank_base.png');
        game.load.image('photoMask', 'assets/leaderboard/photo_mask.png');
        game.load.image('profilePic', 'assets/leaderboard/profileImage.png');


        //Story Book
        for (var i = 1; i < 22; i++) {
            game.load.image('story_' + i, 'assets/story/' + i + '.png');
        }
        game.load.image('goBttn', 'assets/story/go.png');

        //Load Audio
        // LOAD BGM SOUND
        game.load.audio('gamePlayBGM', 'sounds/bg_Sound.ogg');
        // LOAD SFX SOUND
        game.load.audio('splashPageSFX', 'sounds/kinsane_logo_animation_sound.mp3');
        game.load.audio('gameOverSFX', 'sounds/loose_sound.mp3');
        game.load.audio('buttonClickSFX', "sounds/button_click.mp3");

        game.load.image('closeBttn', 'assets/Gameplay/close.png');
        game.load.image('objBttn', 'assets/Gameplay/objective.png');
        game.load.image('proceedBttn', 'assets/Gameplay/next.png');
        // game.load.image();

        // game.load.image('',);
        // game.load.image('',);

        this.LoadAllLevelData();
        this.LoadCharacterAssets();
        game.load.start();
    },
    PreloadLevelData: function(levelNumber) {
        var levelString = "level_";

        // ZERO PADDING
        if (levelNumber > 9) {
            levelString += levelNumber;
        } else {
            levelString += "0" + levelNumber;
        }

        // console.log("Load: " + levelString);

        // LOAD THE JSON FILE
        game.load.json(
            levelString,
            'levels/' + levelString + '.json'
        );
    },
    LoadAllLevelData: function() {
        var i = 1;
        for (i = 1; i <= levelCount; i++) {
            this.PreloadLevelData(i);
        }
    },
    LoadCharacterAssets: function() {
        for (var i = 0; i <= 5; i++) {
            game.load.image('character_' + (i + 1), 'assets/Gameplay/character/' + (i + 1) + '.png');
            game.load.image('spawncharacter_' + (i + 1), 'assets/Gameplay/character/0' + (i + 1) + '.png');
            // game.load.image('characterCounter_'+(i+1),'assets/Gameplay/counter/'+(i+1)+'.png');
        }
        //Character 1
        game.load.spritesheet('characterfrighten_1', 'assets/Gameplay/character/frighten_1.png', 1600 / 4, 2000 / 5, 17);
        game.load.spritesheet('characterfrighten_1_Run', 'assets/Gameplay/character/frighten_1_Run.png', 1600 / 4, 2000 / 5, 18);

        //Character 2
        game.load.spritesheet('characterfrighten_2', 'assets/Gameplay/character/frighten_2.png', 1600 / 4, 2000 / 5, 20);
        game.load.spritesheet('characterfrighten_2_Run', 'assets/Gameplay/character/frighten_2_Run.png', 1600 / 4, 1600 / 4, 16);

        //Character 3
        game.load.spritesheet('characterfrighten_3', 'assets/Gameplay/character/frighten_3.png', 1200 / 3, 1600 / 4, 12);
        game.load.spritesheet('characterfrighten_3_Run', 'assets/Gameplay/character/frighten_3_Run.png', 1600 / 4, 1600 / 4, 16);

        //Character 4
        game.load.spritesheet('characterfrighten_4', 'assets/Gameplay/character/frighten_4.png', 1200 / 3, 2000 / 5, 15);
        game.load.spritesheet('characterfrighten_4_Run', 'assets/Gameplay/character/frighten_4_Run.png', 1600 / 4, 2000 / 5, 20);

        //Character 5
        game.load.spritesheet('characterfrighten_5', 'assets/Gameplay/character/frighten_5.png', 1600 / 4, 2000 / 5, 18);
        game.load.spritesheet('characterfrighten_5_Run', 'assets/Gameplay/character/frighten_5_Run.png', 1200 / 3, 2000 / 5, 13);

        //Character 6
        game.load.spritesheet('characterfrighten_6', 'assets/Gameplay/character/frighten_6.png', 1200 / 3, 2000 / 5, 13);
        game.load.spritesheet('characterfrighten_6_Run', 'assets/Gameplay/character/frighten_6_Run.png', 1200 / 3, 2000 / 5, 13);

        //OttoCanon
        game.load.spritesheet('ottoCanon', 'assets/Otto_Canon.png', 1792 / 7, 2304 / 9, 60);

        //Bucket
        game.load.spritesheet('bucketDestroy', 'assets/Bucket_destroy.png', 1280 / 5, 1536 / 6, 30);
        game.load.spritesheet('basket', 'assets/Gameplay/basket.png');
    }

}