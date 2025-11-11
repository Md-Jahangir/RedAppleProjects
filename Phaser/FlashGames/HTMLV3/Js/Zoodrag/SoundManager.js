var endVideoMusic;
var birdMusic;

var SoundManager = {
    CreateSound: function() {
        endVideoMusic = game.add.audio('endSound');
        birdMusic = game.add.audio('gamePlaySound');
    },
    //Game End Sound 
    PlayVideoEndSound: function() {
        endVideoMusic.loop = true;
        endVideoMusic.play();
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