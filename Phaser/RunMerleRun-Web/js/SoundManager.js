var mainMenuBGM;
var gamePlayBGM;
var storyBGM;
var splashPageSFX;
var hitSound;
var gameOverSFX;
var buttonClickSFX;
var blockClickSFX;

var characterWalkSFX;
var characterWalkSoundInterval;


var SoundManager = {

    CreateSound: function () {
        // INITIALIZE SOUNDS
        mainMenuBGM = game.add.audio('mainMenuBGM');
        gamePlayBGM = game.add.audio('gamePlayBGM');
        storyBGM = game.add.audio('storyBGM');
        splashPageSFX = game.add.audio('splashPageSFX');
        hitSound = game.add.audio('hitSound');
        gameOverSFX = game.add.audio('gameOverSFX');
        buttonClickSFX = game.add.audio('buttonClickSFX');
        blockClickSFX = game.add.audio('blockClickSFX');
        characterWalkSFX = game.add.audio('characterWalkSFX');
    },

    PlayGameplayBgSound: function () {
        if (!gamePlayBGM) {
            gamePlayBGM = this.add.audio('gamePlayBGM'); // make sure it's preloaded
        }

        if (Database.LoadData("music_on_off") === "0") {
            if (!gamePlayBGM.isPlaying) {
                gamePlayBGM.volume = 0.5;   // set volume before play
                gamePlayBGM.loopFull();     // play + loop
            }
        } else {
            if (gamePlayBGM.isPlaying) {
                gamePlayBGM.stop();
            }
        }
    },
    StopGameplayBgSound: function () {
        if (gamePlayBGM && gamePlayBGM.isPlaying) {
            gamePlayBGM.stop();
        }
    },

    PlayMainMenuBgSound: function () {
        if (!mainMenuBGM) {
            mainMenuBGM = this.add.audio('mainMenuBGM'); // make sure it's preloaded
        }

        if (Database.LoadData("music_on_off") === "0") {
            if (!mainMenuBGM.isPlaying) {
                gamePlayBGM.volume = 0.5;
                mainMenuBGM.loopFull();
            }
        } else {
            if (mainMenuBGM.isPlaying) {
                mainMenuBGM.stop();
            }
        }
    },
    StopMainMenuBgSound: function () {
        if (mainMenuBGM && mainMenuBGM.isPlaying) {
            mainMenuBGM.stop();
        }
    },

    PlayStoryBgSound: function () {
        if (!storyBGM) {
            storyBGM = this.add.audio('storyBGM'); // preload required
        }

        if (Database.LoadData("music_on_off") === "0") {
            if (!storyBGM.isPlaying) {
                gamePlayBGM.volume = 0.5;
                storyBGM.loopFull(); // plays + loops
            }
        } else {
            if (storyBGM.isPlaying) {
                storyBGM.stop();
            }
        }
    },
    StopStoryBgSound: function () {
        if (storyBGM) {
            storyBGM.stop();
        }
    },

    PlayCharacterSound: function () {
        characterWalkSFX.play();
    },
    StopCharacterSound: function () {
        clearInterval(characterWalkSoundInterval);
        characterWalkSoundInterval = 0;
        characterWalkSFX.stop();
    },

}