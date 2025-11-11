var doesNotMatched;
var matched;

var SoundManager = {
    CreateSound: function() {
        doesNotMatched = game.add.audio('does_not_matched');
        matched = game.add.audio('matched');
    },
    //Game End Sound 
    PlayDoesNotMatchedSound: function() {
        doesNotMatched.play();
    },
    StopVideoEndSound: function() {
        endVideoMusic.stop();
    },

    //Game Play Sound
    PlayMatchedSound: function() {
        matched.loop = true;
        matched.play();
    },
    StopGameSound: function() {
        //birdMusic.stop();
    },
}