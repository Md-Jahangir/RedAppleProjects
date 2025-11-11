var soundOptionOverlay;
var soundOptionGroup;
var musicBase;
var musicText;
var musicButton;
var soundBase;
var soundText;
var soundButton;

var SoundOptionPopup = {
    CreateSoundOptionPopup: function() {
        soundOptionGroup = game.add.group();

        soundOptionOverlay = Utils.ButtonSettingsControl(soundOptionOverlay, game.world.centerX, game.world.centerY, 'one_pixel', this.SoundOptionOverlayPressed, null, null, null, "true", "true", 0.5, 0.5, 3000, 3000, this);
        soundOptionOverlay.tint = "0x000000";
        soundOptionOverlay.alpha = 0.55;

        var soundOptionPopupBg = Utils.SpriteSettingsControl(soundOptionPopupBg, game.world.centerX, game.world.centerY, 'alert_box', "true", "true", 0.5, 0.5, 1, 1, "false");
        if (gamePage == "Gameplay") {
            soundOptionPopupBg.angle = 90;
        } else {
            soundOptionPopupBg.angle = 0;
        }

        var soundOptionCrossButton = Utils.ButtonSettingsControl(soundOptionCrossButton, 460, -320, 'cross_icon', this.SoundOptionCrossButtonPressed, null, null, this.SoundOptionCrossButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
        soundOptionPopupBg.addChild(soundOptionCrossButton);

        var soundOptionHeadingTextstyle = { font: '52px Lato-Heavy', fontStyle: 'normal', fill: '#fff001', align: 'center', wordWrap: true, wordWrapWidth: 800 };
        var soundOptionHeading = game.add.text(0, -250, "SOUND OPTIONS", soundOptionHeadingTextstyle);
        soundOptionHeading.anchor.setTo(0.5);
        soundOptionHeading.setShadow(0, 2, '#e07e00', 0);
        soundOptionPopupBg.addChild(soundOptionHeading);

        musicBase = Utils.SpriteSettingsControl(musicBase, 10, -60, 'sound_option_popup_line', "true", "true", 0.5, 0.5, 1, 1, "false");
        soundOptionPopupBg.addChild(musicBase);

        var musicTextStyle = { font: '40px Lato-Heavy', fill: '#5aefe2', align: 'center' };
        musicText = game.add.text(-380, -25, "Music", musicTextStyle);
        musicText.anchor.setTo(0);
        musicBase.addChild(musicText);

        musicButton = Utils.ButtonSettingsControl(musicButton, 270, 2, 'sound_on_button', this.MusicButtonPressed, null, null, this.MusicButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
        musicBase.addChild(musicButton);
        musicButton.inputEnabled = false;

        soundBase = Utils.SpriteSettingsControl(soundBase, 10, 140, 'sound_option_popup_line', "true", "true", 0.5, 0.5, 1, 1, "false");
        soundOptionPopupBg.addChild(soundBase);

        var soundTextStyle = { font: '40px Lato-Heavy', fill: '#5aefe2', align: 'center' };
        soundText = game.add.text(-380, -25, "Sound", soundTextStyle);
        soundText.anchor.setTo(0);
        soundBase.addChild(soundText);

        soundButton = Utils.ButtonSettingsControl(soundButton, 270, 2, 'sound_on_button', this.SoundButtonPressed, null, null, this.SoundButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
        soundBase.addChild(soundButton);
        soundButton.inputEnabled = false;


        soundOptionGroup.add(soundOptionPopupBg);
        soundOptionGroup.alpha = 0;
        soundOptionOverlay.visible = false;

        this.DefaultMusicButton();
        this.DefaultSoundButton();
    },

    MusicButtonPressed: function() {
        this.ToggleMusicButton();
        SoundManager.PlayButtonClickTypeTwoSound();
    },
    MusicButtonReleased: function() {},

    SoundButtonPressed: function() {
        this.ToggleSoundButton();
        SoundManager.PlayButtonClickTypeTwoSound();
    },
    SoundButtonReleased: function() {},

    ToggleSoundButton: function() {
        if (localStorage.getItem('housie_is_sound_on') == "true") {
            localStorage.setItem('housie_is_sound_on', false);
            soundButton.loadTexture('sound_off_button');
        } else {
            localStorage.setItem('housie_is_sound_on', true);
            soundButton.loadTexture('sound_on_button');
        }
    },
    DefaultSoundButton() {
        if (localStorage.getItem("housie_is_sound_on") == null) {
            localStorage.setItem("housie_is_sound_on", true);
        } else {}
        if (localStorage.getItem("housie_is_sound_on") == "true") {
            soundButton.loadTexture('sound_on_button');
        } else {
            soundButton.loadTexture('sound_off_button');
        }
    },

    ToggleMusicButton: function() {
        if (localStorage.getItem('housie_is_music_on') == "true") {
            localStorage.setItem('housie_is_music_on', false);
            musicButton.loadTexture('sound_off_button');
        } else {
            localStorage.setItem('housie_is_music_on', true);
            musicButton.loadTexture('sound_on_button');
        }
    },
    DefaultMusicButton() {
        if (localStorage.getItem("housie_is_music_on") == null) {
            localStorage.setItem("housie_is_music_on", true);
        } else {}
        if (localStorage.getItem("housie_is_music_on") == "true") {
            musicButton.loadTexture('sound_on_button');
        } else {
            musicButton.loadTexture('sound_off_button');
        }
    },

    ShowSoundOptionPopup: function() {
        musicButton.inputEnabled = true;
        soundButton.inputEnabled = true;
        soundOptionGroup.visible = true;
        soundOptionOverlay.visible = true;
        game.world.bringToTop(soundOptionGroup);
        game.add.tween(soundOptionGroup).to({ alpha: 1 }, 400, Phaser.Easing.Linear.None, true);
    },

    HideSoundOptionPopup: function() {
        soundOptionOverlay.visible = false;
        var twn = game.add.tween(soundOptionGroup).to({ alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
        twn.onComplete.add(function() {
            soundOptionGroup.visible = false;
            musicButton.inputEnabled = false;
            soundButton.inputEnabled = false;
        });
    },

    SoundOptionCrossButtonPressed: function() {
        SoundOptionPopup.HideSoundOptionPopup();
        SoundManager.PlayButtonClickTypeOneSound();
    },
    SoundOptionCrossButtonReleased: function() {},

    SoundOptionOverlayPressed: function() {}
}