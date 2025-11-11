var settingsBackButton;
var settingsOverlay;
var totalButtonArray = [];

var SettingsPage = function() {};
SettingsPage.prototype = {
        init: function() {
            Utils.ScaleManager();
        },
        preload: function() {
            game.stage.disableVisibilityChange = true;
            game.time.advancedTiming = true;
        },
        create: function() {
            this.CreateSettingsPage();
        },

        CreateSettingsPage: function() {
            var settingsBg = Utils.SpriteSettingsControl(settingsBg, game.world.centerX, game.world.centerY, 'login_signup_bg', "true", "true", 0.5, 0.5, 1, 1, "false");
            // var settingsLock = Utils.SpriteSettingsControl(settingsLock, game.world.centerX, game.world.centerY - Math.round(game.height / 9.8), 'lock', "true", "true", 0.5, 0.5, 1, 1, "false");

            Utils.CreateHeadingText("SETTINGS");

            this.CreateAllButtons();

            settingsBackButton = Utils.ButtonSettingsControl(settingsBackButton, game.world.centerX, game.world.centerY + Math.round(game.height / 2.16), 'back_button', this.SettingsBackButtonPressed, null, null, this.SettingsBackButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);

            SoundOptionPopup.CreateSoundOptionPopup();

            //Create overlay For off the input of all button when click on button
            settingsOverlay = Utils.ButtonSettingsControl(settingsOverlay, game.world.centerX, game.world.centerY, 'transparent_image', this.SettingsOverlayPressed, null, null, null, "true", "true", 0.5, 0.5, 2000, 2000, this);
            settingsOverlay.alpha = 0.001;
            settingsOverlay.visible = false;
        },

        CreateAllButtons: function() {
            // var settingButtonsName = ["Help & Support", "Terms & Conditions", "Clubs-Terms Of Use", "Privacy Policy", "Rate Us", "Legal", "Log Out"];
            if (isIos) {
                var settingButtonsName = ["Help & Support", "Terms & Conditions", "Privacy Policy", "Sound Control", "Log Out"];
            } else {
                var settingButtonsName = ["Help & Support", "Terms & Conditions", "Privacy Policy", "Rate Us", "Sound Control", "Log Out"];
            }
            var settingsAllTextstyle = { font: '48px Lato-Heavy', fill: '#5aefe2', fontWeight: 'normal', align: 'center' };
            for (var i = 0; i < settingButtonsName.length; i++) {
                var xPos = game.world.centerX;
                // var yPos = (game.world.centerY - Math.round(game.height / 6)) + (i * Math.round(game.height / 12));
                var yPos = (game.world.centerY - Math.round(game.height / 4)) + (i * Math.round(game.height / 12));

                var button = Utils.ButtonSettingsControl(button, xPos, yPos, 'setting_button_base', this.ButtonPressed, null, null, this.ButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
                var buttonText = game.add.text(-340, 0, settingButtonsName[i], settingsAllTextstyle);
                buttonText.anchor.setTo(0, 0.5);
                button.name = settingButtonsName[i];
                button.index = i;
                buttonText.setShadow(0, 2, '#e07e00', 0);
                button.addChild(buttonText);
                var arrowSign = Utils.SpriteSettingsControl(arrowSign, 340, 0, 'arrow_white', "true", "true", 0.5, 0.5, 1, 1, "false");
                button.addChild(arrowSign);

                totalButtonArray.push(button);
            }
        },

        ButtonPressed: function(_this) {
            Utils.ButtonScaleAnimation(totalButtonArray[_this.index], totalButtonArray[_this.index].scale.x - 0.02, settingsOverlay);
            this.EnableDisableSettingsPageButtonInput(true);
            SoundManager.PlayButtonClickTypeOneSound();
        },
        ButtonReleased: function(_this) {
            switch (_this.name) {
                case "Help & Support":
                    window.open(HelpUsAndContact);
                    break;
                case "Terms & Conditions":
                    Utils.TransitToTermsAndCondition();
                    break;
                case "Privacy Policy":
                    Utils.TransitToPrivacyPolicy();
                    break;
                case "Rate Us":
                    window.open(PrivacyPolicy);
                    break;
                case "Sound Control":
                    // console.log("Settings");
                    SoundOptionPopup.ShowSoundOptionPopup();
                    break;
                case "Log Out":
                    var accessToken = localStorage.getItem("access_token");
                    API.Logout(accessToken);
                    break;
            }
        },

        SettingsBackButtonPressed: function() {
            Utils.ButtonScaleAnimation(settingsBackButton, settingsBackButton.scale.x - 0.02, settingsOverlay);
            this.EnableDisableSettingsPageButtonInput(true);
            SoundManager.PlayButtonClickTypeOneSound();
        },
        SettingsBackButtonReleased: function() {
            //StateTransition.TransitToProfilePage();
            StateTransition.TransitToMenu();
        },

        EnableDisableSettingsPageButtonInput: function(_status) {
            settingsOverlay.visible = _status;
        },

    } //End of SettingsPage.prototype