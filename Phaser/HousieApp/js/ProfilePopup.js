var profilePopupGroup;
var profilePopupOverlay;
var popupProfilePic;
var meUserImage;

var ProfilePopup = {
    CreateProfilePopup: function(_playerName, _levelNum, _ticketNum, _amount, _userImage) {
        profilePopupOverlay = Utils.ButtonSettingsControl(profilePopupOverlay, game.world.centerX, game.world.centerY, 'one_pixel', this.ProfilePopupOverlayPressed, null, null, null, "true", "true", 0.5, 0.5, 3000, 3000, this);
        profilePopupOverlay.tint = "0x000000";
        profilePopupOverlay.alpha = 0.5;

        var profilePopupBg = Utils.SpriteSettingsControl(profilePopupBg, game.world.centerX, game.world.centerY, 'profile_popup_base', "true", "true", 0.5, 0.5, 1, 1, "false");
        profilePopupBg.angle = 90;

        var profilePopupCrossButton = Utils.ButtonSettingsControl(profilePopupCrossButton, 460, -270, 'cross_icon', this.ProfilePopupCrossButtonPressed, null, null, this.ProfilePopupCrossButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
        profilePopupBg.addChild(profilePopupCrossButton);

        var profileHeadingTextstyle = { font: '45px Lato-Heavy', fontStyle: 'normal', fill: '#fff001', align: 'center', wordWrap: true, wordWrapWidth: 800 };
        var profileHeading = game.add.text(0, -220, "PROFILE", profileHeadingTextstyle);
        profileHeading.anchor.setTo(0.5);
        profileHeading.setShadow(0, 2, '#e07e00', 0);
        profilePopupBg.addChild(profileHeading);

        var userNameTextStyle = { font: '39px Lato-Heavy', fill: '#5aefe2', align: 'center', wordWrap: false, wordWrapWidth: 500 };
        var userName = game.add.text(-100, -110, _playerName, userNameTextStyle);
        userName.anchor.setTo(0);
        profilePopupBg.addChild(userName);

        var levelTextStyle = { font: '35px Lato-Medium', fill: '#5aefe2', align: 'center', wordWrap: false, wordWrapWidth: 500 };
        var levelText = game.add.text(-100, -45, "Level - " + _levelNum, levelTextStyle);
        levelText.anchor.setTo(0);
        profilePopupBg.addChild(levelText);

        var ticketTextStyle = { font: '35px Lato-Medium', fill: '#5aefe2', align: 'center', wordWrap: false, wordWrapWidth: 500 };
        var ticketText = game.add.text(-100, 18, "Ticket - " + _ticketNum, ticketTextStyle);
        ticketText.anchor.setTo(0);
        profilePopupBg.addChild(ticketText);

        var amountTextStyle = { font: '34px Lato-Medium', fill: '#5aefe2', align: 'center', wordWrap: false, wordWrapWidth: 500 };
        var amountText = game.add.text(-100, 78, "Winning Amount - " + _amount + " /-", amountTextStyle);
        amountText.anchor.setTo(0);
        profilePopupBg.addChild(amountText);

        var profileMask = game.add.graphics(0, 0);
        profileMask.beginFill(0x00f0f0);
        profileMask.drawRect(-406, -80, 210, 230);
        profilePopupBg.addChild(profileMask);

        popupProfilePic = Utils.SpriteSettingsControl(popupProfilePic, -300, 35, 'profile_pic', "true", "true", 0.5, 0.5, 1, 1, "false");
        profilePopupBg.addChild(popupProfilePic);
        popupProfilePic.mask = profileMask;

        meUserImage = _userImage;

        profilePopupGroup = game.add.group();
        profilePopupGroup.add(profilePopupBg);

        profilePopupGroup.alpha = 0;
        profilePopupOverlay.visible = false;
    },

    SetProfilePopupValue: function(_name, _level, _noTicket, _totalreward, _image) {

    },
    ShowProfilePopup: function() {
        if (meUserImage != null) {
            popupProfilePic.loadTexture(meUserImage);
        } else {
            popupProfilePic.loadTexture('profile_pic');
        }

        profilePopupGroup.visible = true;
        profilePopupOverlay.visible = true;
        game.world.bringToTop(profilePopupGroup);
        game.add.tween(profilePopupGroup).to({ alpha: 1 }, 400, Phaser.Easing.Linear.None, true);
    },

    HideProfilePopup: function() {
        profilePopupOverlay.visible = false;
        var twn = game.add.tween(profilePopupGroup).to({ alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
        twn.onComplete.add(function() {
            profilePopupGroup.visible = false;
        });
    },

    ProfilePopupCrossButtonPressed: function() {
        ProfilePopup.HideProfilePopup();
        SoundManager.PlayButtonClickTypeOneSound();
    },
    ProfilePopupCrossButtonReleased: function() {},

    ProfilePopupOverlayPressed: function() {}
}