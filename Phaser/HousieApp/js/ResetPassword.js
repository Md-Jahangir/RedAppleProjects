var newPasswordTextInputField;
var confirmPasswordTextInputField;
var resetPasswordSubmitButton;
var resetPasswordOverlay;

var ResetPassword = function() {};
ResetPassword.prototype = {
        init: function() {
            Utils.ScaleManager();
        },
        preload: function() {
            game.stage.disableVisibilityChange = true;
            game.time.advancedTiming = true;
        },
        create: function() {
            this.CreateResetPasswordPage();
        },

        update: function() {
            newPasswordTextInputField.update();
            confirmPasswordTextInputField.update();
        },

        CreateResetPasswordPage: function() {
            var resetPasswordBg = Utils.SpriteSettingsControl(resetPasswordBg, game.world.centerX, game.world.centerY, 'login_signup_bg', "true", "true", 0.5, 0.5, 1, 1, "false");
            var resetPasswordLock = Utils.SpriteSettingsControl(resetPasswordLock, game.world.centerX, game.world.centerY - Math.round(game.height / 9.8), 'lock', "true", "true", 0.5, 0.5, 1, 1, "false");

            Utils.CreateHeadingText("RESET PASSWORD");

            this.CreatePasswordTextInputField();
            this.CreateConfirmPasswordTextInputField();
            this.CreateSubmitButton();

            //Create overlay For off the input of all button when click on button
            resetPasswordOverlay = Utils.ButtonSettingsControl(resetPasswordOverlay, game.world.centerX, game.world.centerY, 'transparent_image', this.ResetPasswordOverlayPressed, null, null, null, "true", "true", 0.5, 0.5, 2000, 2000, this);
            resetPasswordOverlay.alpha = 0.001;
            resetPasswordOverlay.visible = false;
        },

        CreatePasswordTextInputField: function() {
            var newPasswordTextFieldBg = Utils.SpriteSettingsControl(newPasswordTextFieldBg, game.world.centerX, game.world.centerY - Math.round(game.height / 10), 'under_line', "true", "true", 0.5, 0.5, 1, 1, "false");
            newPasswordTextInputField = game.add.inputField(-400, -95, {
                font: '50px Lato-Regular',
                fill: '#5aefe2',
                fillAlpha: 0,
                fontWeight: 'normal',
                width: 600,
                padding: 10,
                height: 45,
                borderWidth: 1,
                borderColor: '#FFF',
                borderRadius: 6,
                placeHolder: 'New password',
                zoom: false,
                cursorColor: '#5aefe2',
                max: 20,
                type: PhaserInput.InputType.password
            });
            newPasswordTextFieldBg.addChild(newPasswordTextInputField);
        },

        CreateConfirmPasswordTextInputField: function() {
            var confirmPasswordTextFieldBg = Utils.SpriteSettingsControl(confirmPasswordTextFieldBg, game.world.centerX, game.world.centerY - Math.round(game.height / 70), 'under_line', "true", "true", 0.5, 0.5, 1, 1, "false");
            confirmPasswordTextInputField = game.add.inputField(-400, -95, {
                font: '50px Lato-Regular',
                fill: '#5aefe2',
                fillAlpha: 0,
                fontWeight: 'normal',
                width: 600,
                padding: 10,
                height: 45,
                borderWidth: 1,
                borderColor: '#FFF',
                borderRadius: 6,
                placeHolder: 'Confirm password',
                zoom: false,
                cursorColor: '#5aefe2',
                max: 20,
                type: PhaserInput.InputType.password
            });
            confirmPasswordTextFieldBg.addChild(confirmPasswordTextInputField);
        },

        CreateSubmitButton: function() {
            resetPasswordSubmitButton = Utils.ButtonSettingsControl(resetPasswordSubmitButton, game.world.centerX, game.world.centerY + Math.round(game.height / 8.1), 'button_base', this.ResetSubmitButtonPressed, null, null, this.ResetSubmitButtonButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            var submitTextstyle = { font: '40px Lato-Heavy', fill: '#361300', fontWeight: 'normal', align: 'center' };
            var submitButtonText = game.add.text(0, -5, "SUBMIT", submitTextstyle);
            submitButtonText.anchor.setTo(0.5);
            resetPasswordSubmitButton.addChild(submitButtonText);
        },

        ResetSubmitButtonPressed: function() {
            Utils.ButtonScaleAnimation(resetPasswordSubmitButton, resetPasswordSubmitButton.scale.x - 0.02, resetPasswordOverlay);
            this.EnableDisableResetPageButtonInput(true);
            SoundManager.PlayButtonClickTypeOneSound();
        },
        ResetSubmitButtonButtonReleased: function() {
            var passwordFormat = "^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$";
            if (newPasswordTextInputField.value != "" && confirmPasswordTextInputField.value != "") {
                //if (newPasswordTextInputField.value.match(passwordFormat)) {
                   // if (confirmPasswordTextInputField.value.match(passwordFormat)) {
                        if (newPasswordTextInputField.value == confirmPasswordTextInputField.value) {
                            API.ResetPassword(newPasswordTextInputField.value);
                        } else {
                            Alert.ShowAlert("The password and confirmation password do not match");
                            newPasswordTextInputField.value = "";
                            confirmPasswordTextInputField.value = "";
                        }
                    /*} 
                    else {
                        Alert.ShowAlert("The password and confirmation password do not match");
                        newPasswordTextInputField.value = "";
                        confirmPasswordTextInputField.value = "";
                    }*/
                /*} 
                else {
                    Alert.ShowAlert("Password should be minimum 8 \ncharacters included one alpha numeric,\nuppercase,and special character");
                    newPasswordTextInputField.value = "";
                    confirmPasswordTextInputField.value = "";
                }*/
            } else {
                Alert.ShowAlert("Please enter your valid credentials");
                newPasswordTextInputField.value = "";
                confirmPasswordTextInputField.value = "";
            }
        },

        EnableDisableResetPageButtonInput: function(_status) {
            resetPasswordOverlay.visible = _status;
        },


    } //End of ResetPassword.prototype