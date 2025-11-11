var settingsPopupGroup;

var SettingPopup = {
    CreateSettingsPopup: function() {
        settingsPopupGroup = game.add.group();

        settingsPopupBg = Utils.ButtonSettingsControl(settingsPopupBg, game.world.centerX, game.world.centerY, 'blueOverlay', this.HideSettingsPopup, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);
        settingsPopupBase = Utils.SpriteSettingsControl(settingsPopupBase, game.world.centerX, game.world.centerY, 'parentsBase', "true", "true", 0.5, 0.5, 0.6, 0.6);

        soundBttnTxt = game.add.bitmapText(120, 540, 'shootEmFont', "SOUND", 45);
        musicBttnTxt = game.add.bitmapText(120, 670, 'shootEmFont', "MUSIC", 45);

        soundOnOffBttn = Utils.ButtonSettingsControl(soundOnOffBttn, 490, 560, 'onBttn', this.SoundEffectsOnOff, null, null, null, "true", "true", 0.5, 0.5, 0.5, 0.5, this);
        musicOnOffBttn = Utils.ButtonSettingsControl(musicOnOffBttn, 490, 690, 'offBttn', this.MusicButtonOnOff, null, null, null, "true", "true", 0.5, 0.5, 0.5, 0.5, this);

        settingsPopupGroup.add(settingsPopupBg);
        settingsPopupGroup.add(settingsPopupBase);
        settingsPopupGroup.add(soundOnOffBttn);
        settingsPopupGroup.add(musicOnOffBttn);
        settingsPopupGroup.add(soundBttnTxt);
        settingsPopupGroup.add(musicBttnTxt);
        this.SetDefaultMusicEffectsButton();
        this.SetDefaultSoundEffectButton();
        settingsPopupGroup.visible = false;
        settingsPopupGroup.alpha = 0;
    },
    ShowSettingsPopup: function() {
        game.world.bringToTop(settingsPopupGroup);
        settingsPopupGroup.visible = true;
        game.add.tween(settingsPopupGroup).to({ alpha: 1 }, 200, Phaser.Easing.Linear.Out, true);
    },
    HideSettingsPopup: function() {
        var hideSettingsGroupTween = game.add.tween(settingsPopupGroup).to({ alpha: 0 }, 200, Phaser.Easing.Linear.Out, true);
        hideSettingsGroupTween.onComplete.add(function() {
            settingsPopupGroup.visible = false;
        });
    },
    //#region  MusicEffectsOnOff
    MusicButtonOnOff: function() {
        if (Database.LoadData("isMusic") == "1") {
            console.log("The Music Button Status...............0" + Database.LoadData("isMusic"));
            musicOnOffBttn.loadTexture("offBttn");
            Database.SaveData("isMusic", "0");
            SoundManager.StopGameplayBgSound();
        } else {
            console.log("The Music Button Status...............1" + Database.LoadData("isMusic"));
            musicOnOffBttn.loadTexture("onBttn");
            Database.SaveData("isMusic", "1");
            SoundManager.PlayGameplayBgSound();
        }
    },
    //#endregion

    //#region  SoundEffectsOnOff
    SoundEffectsOnOff: function() {
        if (Database.LoadData("isSound") == "1") {
            console.log("The Sound Button Status...............0" + Database.LoadData("isSound"));
            soundOnOffBttn.loadTexture("offBttn");
            Database.SaveData("isSound", "0");
        } else {
            console.log("The Sound Button Status...............1" + Database.LoadData("isSound"));
            soundOnOffBttn.loadTexture("onBttn");
            Database.SaveData("isSound", "1");
        }
    },
    //#endregion

    //#region SetDefaultMusicButton
    SetDefaultMusicEffectsButton: function() {
        if (Database.LoadData("isMusic") == "1") {
            musicOnOffBttn.loadTexture("onBttn");
        } else {
            musicOnOffBttn.loadTexture("offBttn");
        }
    },
    //#endregion


    //#region SetDefaultSoundButton
    SetDefaultSoundEffectButton: function() {
        if (Database.LoadData("isSound") == "1") {
            soundOnOffBttn.loadTexture("onBttn");
        } else {
            soundOnOffBttn.loadTexture("offBttn");
        }
    },
    //#endregion
}