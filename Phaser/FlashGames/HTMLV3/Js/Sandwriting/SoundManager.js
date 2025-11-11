var seaSound;

var SoundManager = {
    CreateSound: function() {
        seaSound = game.add.audio('sea_sound');
    },
    //Game End Sound 
    PlaySeaSound: function() {
        seaSound.loop = true;
        seaSound.play();
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