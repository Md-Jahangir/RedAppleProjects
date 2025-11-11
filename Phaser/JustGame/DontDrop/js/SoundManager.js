var SoundManager = {
    AddSound: function() {
        buttonClickSound = game.sound.add('button_click_sound');
        bgMusic = game.sound.add('bg_music');
        obstacleCollideSound = game.sound.add('obstacle_collide_sound');
        ballCollectSound = game.sound.add('ball_collect_sound');
    },

    PlayBgMusic: function() {
        if (localStorage.getItem("dont_drop_is_sound_on") == null) {
            localStorage.setItem("dont_drop_is_sound_on", 1);
        }
        if (localStorage.getItem("dont_drop_is_sound_on") == "1") {
            bgMusic.stop();
            bgMusic.play();
            bgMusic.loop = true;
            bgMusic.volume = 0.1;
        }
    },
    StopBgMusic: function() {
        bgMusic.stop();
    },

    PlayButtonClickSound: function() {
        if (localStorage.getItem("dont_drop_is_sound_on") == null) {
            localStorage.setItem("dont_drop_is_sound_on", 1);
        }
        if (localStorage.getItem("dont_drop_is_sound_on") == "1") {
            buttonClickSound.play();
        }
    },

    PlayBallCollectSound: function() {
        if (localStorage.getItem("dont_drop_is_sound_on") == null) {
            localStorage.setItem("dont_drop_is_sound_on", 1);
        }
        if (localStorage.getItem("dont_drop_is_sound_on") == "1") {
            ballCollectSound.play();
        }
    },

    PlayObstacleCollideSound: function() {
        if (localStorage.getItem("dont_drop_is_sound_on") == null) {
            localStorage.setItem("dont_drop_is_sound_on", 1);
        }
        if (localStorage.getItem("dont_drop_is_sound_on") == "1") {
            obstacleCollideSound.play();
        }
    }
}