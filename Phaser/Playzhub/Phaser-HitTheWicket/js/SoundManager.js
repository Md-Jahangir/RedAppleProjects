var SoundManager = {
    AddSound: function() {
        buttonClickSound = game.sound.add('button_click_sound');
        menuPagebgMusic = game.sound.add('menu_page_audio');
        gamePlayPageBgMusic = game.sound.add('gameplay_page_audio');
        ballHitWicketCheerSound = game.sound.add('cheer01');
        ballPassesBatCheerSound = game.sound.add('cheer02');
        ballHitsBatCheerSound = game.sound.add('cheer03');
        swingSound = game.sound.add('swing');
    },

    PlayMenuPageBgMusic: function() {
        if (localStorage.getItem("hit_the_wicket_is_sound_on") == null) {
            localStorage.setItem("hit_the_wicket_is_sound_on", 1);
        }
        if (localStorage.getItem("hit_the_wicket_is_sound_on") == "1") {
            menuPagebgMusic.stop();
            menuPagebgMusic.play();
            menuPagebgMusic.loop = true;
        }
    },
    StopMenuPageBgMusic: function() {
        menuPagebgMusic.stop();
    },

    PlayGameplayPageBgMusic: function()
    {
        if (localStorage.getItem("hit_the_wicket_is_sound_on") == null) {
            localStorage.setItem("hit_the_wicket_is_sound_on", 1);
        }
        if (localStorage.getItem("hit_the_wicket_is_sound_on") == "1") {
            gamePlayPageBgMusic.stop();
            gamePlayPageBgMusic.play();
            gamePlayPageBgMusic.loop = true;
        }
    },
    StopGamePlayPageBgMusic: function()
    {
        gamePlayPageBgMusic.stop();
    },
    PlayButtonClickSound: function() {
        if (localStorage.getItem("hit_the_wicket_is_sound_on") == null) {
            localStorage.setItem("hit_the_wicket_is_sound_on", 1);
        }
        if (localStorage.getItem("hit_the_wicket_is_sound_on") == "1") {
            buttonClickSound.play();
        }
    },

    BallHitWicketPlayCheerSound: function() {
        if (localStorage.getItem("hit_the_wicket_is_sound_on") == null) {
            localStorage.setItem("hit_the_wicket_is_sound_on", 1);
        }
        if (localStorage.getItem("hit_the_wicket_is_sound_on") == "1") {
            ballHitWicketCheerSound.play();
        }
    },
    BallPassesBatPlayCheerSound: function()
    {
        if (localStorage.getItem("hit_the_wicket_is_sound_on") == null) {
            localStorage.setItem("hit_the_wicket_is_sound_on", 1);
        }
        if (localStorage.getItem("hit_the_wicket_is_sound_on") == "1") {
            ballPassesBatCheerSound.play();
        }
    },
    BallHitsBatPlayCheerSound: function()
    {
        if (localStorage.getItem("hit_the_wicket_is_sound_on") == null) {
            localStorage.setItem("hit_the_wicket_is_sound_on", 1);
        }
        if (localStorage.getItem("hit_the_wicket_is_sound_on") == "1") {
            ballHitsBatCheerSound.play();
        }
    },

    PlaySwingSound: function() {
        if (localStorage.getItem("hit_the_wicket_is_sound_on") == null) {
            localStorage.setItem("hit_the_wicket_is_sound_on", 1);
        }
        if (localStorage.getItem("hit_the_wicket_is_sound_on") == "1") {
            swingSound.play();
        }
    }
}