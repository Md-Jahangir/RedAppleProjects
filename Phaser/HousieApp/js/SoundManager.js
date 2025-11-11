var welcomeSound;
var playingWithOneSound;
var playingWithTwoSound;
var blockedSound;
var claimedSound;
var buttonClickSound;
var buttonClickType2Sound;
var numberClickSound;
var popupShowingSound;
var allNumbersSound = [];
var earlyFiveSound;
var topLineSound;
var middleLineSound;
var bottomLineSound;
var fourCornerSound;
var fullHouseSound;

var SoundManager = {

    CreateSound: function() {
        welcomeSound = game.add.audio('welcome_sound');
        playingWithOneSound = game.add.audio('playing_with_one_sound');
        playingWithTwoSound = game.add.audio('playing_with_two_sound');
        blockedSound = game.add.audio('blocked_sound');
        claimedSound = game.add.audio('claimed_sound');
        buttonClickSound = game.add.audio('button_click');
        buttonClickType2Sound = game.add.audio('button_click_type_2');
        numberClickSound = game.add.audio('number_click');
        popupShowingSound = game.add.audio('popup_showing_sound');
        earlyFiveSound = game.add.audio('early_five_sound');
        topLineSound = game.add.audio('top_line_sound');
        middleLineSound = game.add.audio('middle_line_sound');
        bottomLineSound = game.add.audio('bottom_line_sound');
        fourCornerSound = game.add.audio('four_corners_sound');
        fullHouseSound = game.add.audio('full_house_sound');
        for (var i = 1; i <= 90; i++) {
            allNumbersSound[i] = game.add.audio('number_sound_' + i);
        }
    },

    PlayDeclaredNumberSound: function(_number) {
        if (localStorage.getItem("housie_is_music_on") == null) {
            localStorage.setItem("housie_is_music_on", true);
        }
        if (localStorage.getItem("housie_is_music_on") == "true") {
            allNumbersSound[_number].play();
        }
    },

    PlayWelcomeSound: function() {
        if (localStorage.getItem("housie_is_sound_on") == null) {
            localStorage.setItem("housie_is_sound_on", true);
        }
        if (localStorage.getItem("housie_is_sound_on") == "true") {
            welcomeSound.play();
        }
    },

    PlayOneTicketSound: function() {
        if (localStorage.getItem("housie_is_sound_on") == null) {
            localStorage.setItem("housie_is_sound_on", true);
        }
        if (localStorage.getItem("housie_is_sound_on") == "true") {
            playingWithOneSound.play();
        }
    },
    PlayTwoTicketSound: function() {
        if (localStorage.getItem("housie_is_sound_on") == null) {
            localStorage.setItem("housie_is_sound_on", true);
        }
        if (localStorage.getItem("housie_is_sound_on") == "true") {
            playingWithTwoSound.play();
        }
    },

    PlayButtonClickTypeOneSound: function() {
        if (localStorage.getItem("housie_is_sound_on") == null) {
            localStorage.setItem("housie_is_sound_on", true);
        }
        if (localStorage.getItem("housie_is_sound_on") == "true") {
            buttonClickSound.play();
        }
    },
    PlayButtonClickTypeTwoSound: function() {
        if (localStorage.getItem("housie_is_sound_on") == null) {
            localStorage.setItem("housie_is_sound_on", true);
        }
        if (localStorage.getItem("housie_is_sound_on") == "true") {
            buttonClickType2Sound.play();
        }
    },

    PlayNumberClickSound: function() {
        if (localStorage.getItem("housie_is_sound_on") == null) {
            localStorage.setItem("housie_is_sound_on", true);
        }
        if (localStorage.getItem("housie_is_sound_on") == "true") {
            numberClickSound.play();
        }
    },

    PlayPopupShowingSound: function() {
        if (localStorage.getItem("housie_is_sound_on") == null) {
            localStorage.setItem("housie_is_sound_on", true);
        }
        if (localStorage.getItem("housie_is_sound_on") == "true") {
            popupShowingSound.play();
        }
    },
    PlayBlockedSound: function() {
        if (localStorage.getItem("housie_is_sound_on") == null) {
            localStorage.setItem("housie_is_sound_on", true);
        }
        if (localStorage.getItem("housie_is_sound_on") == "true") {
            blockedSound.play();
        }
    },
    PlayClaimedSound: function() {
        if (localStorage.getItem("housie_is_sound_on") == null) {
            localStorage.setItem("housie_is_sound_on", true);
        }
        if (localStorage.getItem("housie_is_sound_on") == "true") {
            claimedSound.play();
        }
    },

    PlayEarlyFiveSound: function() {
        if (localStorage.getItem("housie_is_sound_on") == null) {
            localStorage.setItem("housie_is_sound_on", true);
        }
        if (localStorage.getItem("housie_is_sound_on") == "true") {
            earlyFiveSound.play();
        }
    },
    PlayTopLineSound: function() {
        if (localStorage.getItem("housie_is_sound_on") == null) {
            localStorage.setItem("housie_is_sound_on", true);
        }
        if (localStorage.getItem("housie_is_sound_on") == "true") {
            topLineSound.play();
        }
    },
    PlayMiddleLineSound: function() {
        if (localStorage.getItem("housie_is_sound_on") == null) {
            localStorage.setItem("housie_is_sound_on", true);
        }
        if (localStorage.getItem("housie_is_sound_on") == "true") {
            middleLineSound.play();
        }
    },
    PlayBottomLineSound: function() {
        if (localStorage.getItem("housie_is_sound_on") == null) {
            localStorage.setItem("housie_is_sound_on", true);
        }
        if (localStorage.getItem("housie_is_sound_on") == "true") {
            bottomLineSound.play();
        }
    },
    PlayFourCornerSound: function() {
        if (localStorage.getItem("housie_is_sound_on") == null) {
            localStorage.setItem("housie_is_sound_on", true);
        }
        if (localStorage.getItem("housie_is_sound_on") == "true") {
            fourCornerSound.play();
        }
    },
    PlayFullHouseSound: function() {
        if (localStorage.getItem("housie_is_sound_on") == null) {
            localStorage.setItem("housie_is_sound_on", true);
        }
        if (localStorage.getItem("housie_is_sound_on") == "true") {
            fullHouseSound.play();
        }
    },

}