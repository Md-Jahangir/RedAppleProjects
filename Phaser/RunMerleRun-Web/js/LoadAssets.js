var isPaytm = false;
var isJio = false;
var numberOfObstacles = 3;

var LoadAssets = {
    LoadAllAssets: function () {
        //FOR LOAD THE PARENTS DESCRIPTION JSON
        // LOAD BGM SOUND
        game.load.audio('gamePlayBGM', 'sounds/bg_Sound_1.mp3');
        game.load.audio('mainMenuBGM', 'sounds/bg_sound_2.mp3');
        game.load.audio('storyBGM', 'sounds/story_bg_sound.mp3');
        // LOAD SFX SOUND
        game.load.audio('splashPageSFX', 'sounds/kinsane_logo_animation_sound.mp3');
        game.load.audio('hitSound', 'sounds/hit_sound.mp3');
        game.load.audio('gameOverSFX', 'sounds/loose_sound.mp3');
        game.load.audio('buttonClickSFX', "sounds/button_click.mp3");
        game.load.audio('blockClickSFX', 'sounds/block_click.mp3');
        game.load.audio('characterWalkSFX', 'sounds/walking_sound.mp3');
        game.load.json('parentJson', "json/parentJson.json");

        //FOR SPLASH PAGE
        game.load.image('overlay', "assets/images/gui/overlay.png");
        // game.load.image('titleArt', "assets/images/gui/title_art_animation.png");

        //CREDIT PAGE
        game.load.image('creditBg', "assets/images/credit/credit_bg.png");
        game.load.image('backButton', "assets/images/gui/back_button.png");
        game.load.image('redAppleLogo', "assets/images/credit/redapple_logo.png");
        game.load.image('kinsaneLogo', "assets/images/credit/kinsane_logo.png");
        game.load.image('termAndUse', "assets/images/credit/terms_of_use.png");
        game.load.image('privacyPolicy', "assets/images/credit/privacy_policy.png");

        //FOR NEW MENU
        game.load.image('menuBackground', "assets/images/newMenu/bg2.png");
        game.load.image('playButton', "assets/images/newMenu/play.png");
        game.load.image('settingButton', "assets/images/gui/setting_button.png");
        game.load.image('parentsButton', "assets/images/gui/parents_button.png");
        game.load.image('kintoonsLogo', "assets/images/newMenu/kintoons.png");
        game.load.image('gameTitle', "assets/images/newMenu/title.png");
        game.load.image('menuCharacter', "assets/images/newMenu/marle.png");
        game.load.spritesheet('gameTitleEffect', "assets/images/newMenu/logo_Effects.png", 400, 250, 12);
        game.load.spritesheet('playButtonEffect', "assets/images/newMenu/playButton_effects.png", 350, 300, 8);
        game.load.spritesheet('groundEffect', "assets/images/newMenu/ground.png", 1344, 250, 20);
        game.load.image('menuLeaf', "assets/images/newMenu/menu_leaf.png");
        game.load.image('menuBlock', "assets/images/newMenu/menu_block.png");

        //SETTING POPUP
        game.load.image('cossButton', "assets/images/gui/cross_button.png");
        game.load.image('settingHeading', "assets/images/gui/setings_heading.png");
        game.load.image('musicIcon', "assets/images/gui/music_icon.png");
        game.load.image('soundIcon', "assets/images/gui/sound_icon.png");
        game.load.image('onButton', "assets/images/gui/on_sprite.png");
        game.load.image('offButton', "assets/images/gui/off_sprite.png");
        game.load.image('bigPrompt', "assets/images/gui/big_prompt.png");
        game.load.image('answerBox', "assets/images/gui/answer_box.png");

        //GAMEPLAY
        game.load.image('scoreBoard', "assets/images/gui/score_board.png");
        game.load.image('pauseButton', "assets/images/gui/pause_button.png");
        game.load.image('sky', "assets/images/sky/sky.png");
        game.load.spritesheet('water', "assets/images/waterParallaxItems/water_spritesheets.png", 1260, 66, 5);
        game.load.image('grass', "assets/images/backgroundParallaxItems/grass.png");
        game.load.image('treeOne', "assets/images/backgroundParallaxItems/tree_1.png");
        game.load.image('landOne', "assets/images/backgroundParallaxItems/land_1.png");
        game.load.image('stoneOne', "assets/images/backgroundParallaxItems/stone_1.png");
        game.load.image('treeTwo', "assets/images/backgroundParallaxItems/tree_2.png");
        game.load.image('stoneTwo', "assets/images/backgroundParallaxItems/stone_2.png");
        game.load.image('landTwo', "assets/images/backgroundParallaxItems/land_2.png");
        game.load.image('treeThree', "assets/images/backgroundParallaxItems/tree_3.png");
        game.load.image('hill', "assets/images/backgroundParallaxItems/hill.png");
        game.load.image('skipButton', "assets/images/gui/skip.png");
        game.load.spritesheet('firefly', 'assets/images/backgroundParallaxItems/firefly_spritesheets.png', 50, 50, 19);

        // Quit Popup 
        game.load.image('quit_bg', "assets/images/gui/quit_bg.png");
        game.load.image('quit_no', "assets/images/gui/quit_no.png");
        game.load.image('quit_yes', "assets/images/gui/quit_yes.png");

        //LOAD WATER ROUND LEAF 
        for (var i = 1; i <= 2; i++) {
            var numberString = Utils.getZeroPaddedString(i);
            game.load.image('waterLeaf_' + numberString, 'assets/images/waterParallaxItems/water_leaf_' + numberString + '.png');
        }
        game.load.spritesheet('waterLeaf_03', 'assets/images/waterParallaxItems/water_leaf_03.png', 128, 128, 8);
        //GAME PAUSED POPUP
        game.load.image('smallPrompt', "assets/images/gui/small_prompt.png");
        game.load.image('pauseHeading', "assets/images/gui/game_pause_heading.png");
        game.load.image('replayButton', "assets/images/gui/replay_button.png");
        game.load.image('menuButton', "assets/images/gui/menu_button.png");

        //GAME OVER POPUP
        game.load.image('scoreFlag', "assets/images/gui/score_flag.png");
        game.load.image('tryAgainHeading', "assets/images/gui/try_again_heading.png");

        //LOAD BLOCK IMAGE
        game.load.image('block', "assets/images/blockImage/block.png");

        //LOAD THE CHARACTER
        game.load.spritesheet('character', 'assets/images/character/character_512x512.png', 512, 512, 61);

        //LOAD THE WATER FALL ANIMATION
        game.load.spritesheet('waterFall', 'assets/images/waterParallaxItems/water_fall.png', 618, 290, 8);

        //FOR LOAD STORY BG
        game.load.image('storyBg', "assets/images/story/story_bg.png");
        game.load.spritesheet('butterfly', 'assets/images/story/butterfly_spritesheets.png', 256, 256, 8);
        game.load.spritesheet('storyCharacter', "assets/images/story/marley_story_character.png", 512, 512, 103);

        // LOAD FONT
        game.load.bitmapFont('riccicFreeFont', "fonts/riffic_free_bold.png", "fonts/riffic_free_bold.fnt");

        // //FOR HINTS
        game.load.spritesheet('handClickHint', 'assets/images/hint/hand_click.png', 198, 256, 2);
        game.load.image('singleHandSprite', 'assets/images/hint/hand_01.png');
        game.load.spritesheet('arrowHint', 'assets/images/hint/hint_arrow.png', 46, 38, 9);

        //FOR LOAD THE OBSTACLES
        for (var i = 1; i <= numberOfObstacles; i++) {
            var numString = Utils.getZeroPaddedString(i);
            game.load.image('obstacle_' + numString, 'assets/images/obstacle/obstacle_' + numString + '.png');
        }



        game.load.start();
        game.load.onLoadComplete.add(this.onAssetsLoaded.bind(this));



    },
    onAssetsLoaded: function () {
        SoundManager.CreateSound();
        game.state.start('Menu');
    }

}
