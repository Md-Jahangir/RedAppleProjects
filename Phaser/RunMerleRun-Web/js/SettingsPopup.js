var settingsPopupGroup;
var settingsPopupOverlay;
var settingsCrossButton;
var musicButton;
var soundButton;
// var settingsHeading;

var SettingsPopup = {
    CreateSettingsPopup: function() {
        settingsPopupGroup = game.add.group();

        //ADD SETTING POPUP OVERLAY
        settingsPopupOverlay = Utils.ButtonSettingsControl(settingsPopupOverlay, 640.0, 360.0, 'overlay', this.SettingsPopupOverlayOnPress, null, null, null, "true", "true", 0.5, 0.5, 4, 4, this);

        //ADD SETTING PROMPT
        var settingsPrompt = Utils.SpriteSettingsControl(settingsPrompt, 640.0, 330.0, 'smallPrompt', "true", "true", 0.5, 0.5, 1, 1);

        //ADD SETTING HEADING
        var settingsHeading = Utils.SpriteSettingsControl(settingsHeading, 640.0, 240.0, 'settingHeading', "true", "true", 0.5, 0.5, 1, 1);

        //ADD CROSS BUTTON
        settingsCrossButton = Utils.ButtonSettingsControl(settingsCrossButton, 870, 200, 'cossButton', this.SettingsCrossButtonOnPress, null, null, this.SettingsCrossButtonOnRelease, "true", "true", 0.5, 0.5, 1, 1, this);

        //ADD SETTING MUSIC ICON
        var musicIcon = Utils.SpriteSettingsControl(musicIcon, 525.0, 365.0, 'musicIcon', "true", "true", 0.5, 0.5, 1, 1);
        // ADD SETTING MUSIC ON OFF BUTTON
        musicButton = Utils.ButtonSettingsControl(musicButton, 675, 365, 'onButton', this.MusicButtonOnPress, null, null, this.MusicButtonOnRelease, "true", "true", 0.5, 0.5, 1, 1, this);

        //ADD SETTING SOUND ICON
        var soundIcon = Utils.SpriteSettingsControl(soundIcon, 525.0, 452.0, 'soundIcon', "true", "true", 0.5, 0.5, 1, 1);
        // ADD SETTING MUSIC ON OFF BUTTON
        soundButton = Utils.ButtonSettingsControl(soundButton, 675, 452, 'onButton', this.SoundButtonOnPress, null, null, this.SoundButtonOnRelease, "true", "true", 0.5, 0.5, 1, 1, this);

        settingsPopupGroup.add(settingsPopupOverlay);
        settingsPopupGroup.add(settingsPrompt);
        settingsPopupGroup.add(settingsHeading);
        settingsPopupGroup.add(settingsCrossButton);
        settingsPopupGroup.add(musicIcon);
        settingsPopupGroup.add(musicButton);
        settingsPopupGroup.add(soundIcon);
        settingsPopupGroup.add(soundButton);

        SettingsPopup.DefaultToggleMusic();
        SettingsPopup.DefaultToggleSound();

        settingsPopupGroup.visible = false;
        settingsPopupGroup.alpha = 0;
    },

    ShowSettingsPopup: function() {
        game.world.bringToTop(settingsPopupGroup);
        settingsPopupGroup.visible = true;
        settingsPopupOverlay.visible = true;

        game.add.tween(settingsPopupGroup).to({ alpha: 1 }, 200, Phaser.Easing.Linear.Out, true);
    },

    HideSettingsPopup: function() {
        var tween = game.add.tween(settingsPopupGroup).to({ alpha: 0 }, 200, Phaser.Easing.Linear.Out, true);
        tween.onComplete.add(function() {
            settingsPopupGroup.visible = false;
            settingsPopupOverlay.visible = false;
        });

    },

    SettingsPopupOverlayOnPress: function() {},

    SettingsCrossButtonOnPress: function() {
        if (Database.LoadData("sound_on_off") == "0") {
            buttonClickSFX.play();
        }
        game.add.tween(settingsCrossButton.scale).to({ x: 0.95, y: 0.95 }, 100, Phaser.Easing.Linear.Out, true);
    },

    SettingsCrossButtonOnRelease: function() {
        game.add.tween(settingsCrossButton.scale).to({ x: 1, y: 1 }, 100, Phaser.Easing.Linear.Out, true);
        setTimeout(function() {
            SettingsPopup.HideSettingsPopup();
        }, 100);
    },

    MusicButtonOnPress: function() {
        if (Database.LoadData("sound_on_off") == "0") {
            buttonClickSFX.play();
        }
        this.ToggleMusic();
    },

    SoundButtonOnPress: function() {
        if (Database.LoadData("sound_on_off") == "0") {
            buttonClickSFX.play();
        }
        this.ToggleSound();
    },


    DefaultToggleMusic: function() {
        if (Database.LoadData("music_on_off") == "0") {
            musicButton.loadTexture("onButton");
        } else {
            musicButton.loadTexture("offButton");
        }
    },
    ToggleMusic: function() {
        console.log("The Status of Music On Off....."+Database.LoadData());
        if (Database.LoadData("music_on_off") == "0") {
            musicButton.loadTexture("offButton");
            Database.SaveData("music_on_off", 1);
            SoundManager.StopMainMenuBgSound();
        } else {
            musicButton.loadTexture("onButton");
            Database.SaveData("music_on_off", 0);
            SoundManager.PlayMainMenuBgSound();
        }
    },

    DefaultToggleSound: function() {
        if (Database.LoadData("sound_on_off") == "0") {
            soundButton.loadTexture("onButton");
        } else {
            soundButton.loadTexture("offButton");
        }
    },
    ToggleSound: function() {
        if (Database.LoadData("sound_on_off") == "0") {
            soundButton.loadTexture("offButton");

            Database.SaveData("sound_on_off", 1);
        } else {
            soundButton.loadTexture("onButton");

            Database.SaveData("sound_on_off", 0);
        }
    },

}