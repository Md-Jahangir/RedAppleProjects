var goodJobSound;
var backGroundSound;

var SoundManager = {
    CreateSound: function() {
        backGroundSound = game.add.audio('sceneryDifference_background');
        goodJobSound = game.add.audio('goodJob');
    },
    //Game End Sound 
    PlayBackgroundSound: function() {
        backGroundSound.loop=true;
        backGroundSound.play();
    },
    StopBackgroundSound: function() {
        backGroundSound.stop();
    },

    //Game Play Sound
    PlayGoodJobSound: function() {
        goodJobSound.play();
    },
    StopGoodJobSound: function() {
        goodJobSound.stop();
    },
}