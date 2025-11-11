var inputForgetEmail;
var forgotOverlay;
var forgotEmailTextInputField;
var forgotSubmitButton;
var forgotPasswordBackButton;

var ForgotPassword = function() {};
ForgotPassword.prototype = {
        init: function() {
            Utils.ScaleManager();
        },
        preload: function() {
            game.stage.disableVisibilityChange = true;
            game.time.advancedTiming = true;
        },
        create: function() {
            this.CreateForgotPasswordPage();
        },

        update: function() {
            forgotEmailTextInputField.update();
        },

        CreateForgotPasswordPage: function() {
            var forgotBg = Utils.SpriteSettingsControl(forgotBg, game.world.centerX, game.world.centerY, 'login_signup_bg', "true", "true", 0.5, 0.5, 1, 1, "false");
            var forgotLock = Utils.SpriteSettingsControl(forgotLock, game.world.centerX, game.world.centerY - Math.round(game.height / 9.8), 'lock', "true", "true", 0.5, 0.5, 1, 1, "false");

            Utils.CreateHeadingText("FORGOT PASSWORD");

            var forgotMessageTextStyle = { font: '52px Lato-Regular', fill: '#5aefe2', align: 'center', wordWrap: true, wordWrapWidth: 500 };
            var forgotMessageText = game.add.text(game.world.centerX, game.world.centerY - Math.round(game.height / 10), "Enter your email id to get otp", forgotMessageTextStyle);
            forgotMessageText.anchor.setTo(0.5);

            this.CreateEmailTextInputField();
            this.CreateSubmitButton();

            forgotPasswordBackButton = Utils.ButtonSettingsControl(forgotPasswordBackButton, game.world.centerX, game.world.centerY + Math.round(game.height / 2.16), 'back_button', this.ForgotPasswordBackButtonPressed, null, null, this.ForgotPasswordBackButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);

            //Create overlay For off the input of all button when click on button
            forgotOverlay = Utils.ButtonSettingsControl(forgotOverlay, game.world.centerX, game.world.centerY, 'transparent_image', this.ForgotOverlayPressed, null, null, null, "true", "true", 0.5, 0.5, 2000, 2000, this);
            forgotOverlay.alpha = 0.001;
            forgotOverlay.visible = false;
        },

        CreateSubmitButton: function() {
            forgotSubmitButton = Utils.ButtonSettingsControl(forgotSubmitButton, game.world.centerX, game.world.centerY + Math.round(game.height / 6.73), 'button_base', this.ForgotSubmitButtonPressed, null, null, this.ForgotSubmitButtonButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            var submitTextstyle = { font: '38px Lato-Heavy', fill: '#361300', fontWeight: 'normal', align: 'center' };
            var submitButtonText = game.add.text(0, -5, "SUBMIT", submitTextstyle);
            submitButtonText.anchor.setTo(0.5);
            forgotSubmitButton.addChild(submitButtonText);
        },
        CreateEmailTextInputField: function() {
            var forgotEmailTextFieldBg = Utils.SpriteSettingsControl(forgotEmailTextFieldBg, game.world.centerX, game.world.centerY + Math.round(game.height / 45), 'under_line', "true", "true", 0.5, 0.5, 1, 1, "false");
            forgotEmailTextInputField = game.add.inputField(-400, -95, {
                font: '48px Lato-Regular',
                fill: '#5aefe2',
                fillAlpha: 0,
                fontWeight: 'normal',
                width: 760,
                padding: 10,
                height: 45,
                borderWidth: 1,
                borderColor: '#FFF',
                borderRadius: 6,
                placeHolder: 'Email',
                zoom: false,
                cursorColor: '#5aefe2',
                max: 50,
                forceCase: PhaserInput.ForceCase.lower,
            });
            forgotEmailTextFieldBg.addChild(forgotEmailTextInputField);
        },

        ForgotSubmitButtonPressed: function() {
            Utils.ButtonScaleAnimation(forgotSubmitButton, forgotSubmitButton.scale.x - 0.02, forgotOverlay);
            this.EnableDisableForgotPageButtonInput(true);
            SoundManager.PlayButtonClickTypeOneSound();
        },
        ForgotSubmitButtonButtonReleased: function() {
            previousPage = "ForgotPassword";
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (forgotEmailTextInputField.value !== "") {
                if (forgotEmailTextInputField.value.match(mailformat)) {
                    inputForgetEmail = forgotEmailTextInputField.value;
                    API.ForgetPasswordGenerateOtp(forgotEmailTextInputField.value);
                } else {
                    forgotEmailTextInputField.value = "";
                    Alert.ShowAlert("Please enter valid email address");
                }
            } else {
                forgotEmailTextInputField.value = "";
                Alert.ShowAlert("Please enter your valid credentials");
            }
        },

        ForgotPasswordBackButtonPressed: function() {
            Utils.ButtonScaleAnimation(forgotPasswordBackButton, forgotPasswordBackButton.scale.x - 0.02, forgotOverlay);
            this.EnableDisableForgotPageButtonInput(true);
            SoundManager.PlayButtonClickTypeOneSound();
        },
        ForgotPasswordBackButtonReleased: function() {
            StateTransition.TransitToLogin();
        },

        EnableDisableForgotPageButtonInput: function(_status) {
            forgotOverlay.visible = _status;
        },


    } //End of ForgotPassword.prototype