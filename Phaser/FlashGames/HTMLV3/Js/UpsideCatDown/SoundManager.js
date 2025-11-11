var clickSound;


var SoundManager = {
    CreateSound: function() {
        clickSound = game.add.audio('click_sound');
        birdMusic = game.add.audio('gamePlaySound');
    },
    //Game End Sound 
    PlayClickSound: function() {
        clickSound.play();
    },
    StopVideoEndSound: function() {
        endVideoMusic.stop();
    },

    //Game Play Sound
    PlayGameSound: function() {
        //birdMusic.loop = true;
        //birdMusic.play();
    },
    StopGameSound: function() {
        //birdMusic.stop();
    },
}