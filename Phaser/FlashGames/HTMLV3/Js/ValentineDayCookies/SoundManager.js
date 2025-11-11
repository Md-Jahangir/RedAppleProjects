var backgroundSound;
var goodJobSound;

var SoundManager = {
    CreateSound: function() {
        backgroundSound = game.add.audio('backgroundSound');
        goodJobSound = game.add.audio('goodJob');
    },
    //Game End Sound 
    PlayVideoEndSound: function() {
        backgroundSound.loop = true;
        backgroundSound.play();
        goodJobSound.play();
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