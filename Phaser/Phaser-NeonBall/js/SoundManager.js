var SoundManager = {
    AddSound: function() {
        buttonClickSound = game.sound.add('button_click_sound');
        bgMusic = game.sound.add('bg_music');
        gameOverSound = game.sound.add('game_over_sound');
        hitSound = game.sound.add('hit_sound');
    },

    PlayBgMusic: function() {
        if (localStorage.getItem("neon_ball_is_sound_on") == null) {
            localStorage.setItem("neon_ball_is_sound_on", 1);
        }
        if (localStorage.getItem("neon_ball_is_sound_on") == "1") {
            bgMusic.stop();
            bgMusic.play();
            bgMusic.loop = true;
        }
    },
    StopBgMusic: function() {
        bgMusic.stop();
    },

    PlayButtonClickSound: function() {
        if (localStorage.getItem("neon_ball_is_sound_on") == null) {
            localStorage.setItem("neon_ball_is_sound_on", 1);
        }
        if (localStorage.getItem("neon_ball_is_sound_on") == "1") {
            buttonClickSound.play();
        }
    },

    PlayGameOverSound: function() {
        if (localStorage.getItem("neon_ball_is_sound_on") == null) {
            localStorage.setItem("neon_ball_is_sound_on", 1);
        }
        if (localStorage.getItem("neon_ball_is_sound_on") == "1") {
            gameOverSound.play();
        }
    },

    PlayHitSound: function() {
        if (localStorage.getItem("neon_ball_is_sound_on") == null) {
            localStorage.setItem("neon_ball_is_sound_on", 1);
        }
        if (localStorage.getItem("neon_ball_is_sound_on") == "1") {
            hitSound.play();
        }
    }
}