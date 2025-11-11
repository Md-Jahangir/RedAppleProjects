var gamePlayBGM;
var splashPageSFX;
var gameOverSFX;
var buttonClickSFX;

var SoundManager = {

    CreateSound: function() {
        // INITIALIZE SOUNDS
        console.log("Enter into the Create Sound");
        gamePlayBGM = game.add.audio('gamePlayBGM');
        splashPageSFX = game.add.audio('splashPageSFX');
        gameOverSFX = game.add.audio('gameOverSFX');
        buttonClickSFX = game.add.audio('buttonClickSFX');
    },

    PlayGameplayBgSound: function() {
        if(Database.LoadData("isMusic") == "1"){
            gamePlayBGM.play();
            gamePlayBGM.loopFull();
        }
    },
    StopGameplayBgSound: function() {
        gamePlayBGM.stop();
    },

    // PlayMainMenuBgSound: function() {
    //     mainMenuBGM.play();
    //     mainMenuBGM.loopFull();
    // },
    // StopMainMenuBgSound: function() {
    //     mainMenuBGM.stop();
    // },
    PlayButtonSFX: function(){
        if(Database.LoadData("isSound") == "1"){
            buttonClickSFX.play();
        }
    }
}