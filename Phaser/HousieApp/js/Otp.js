var otpTextInputField;
var resendText;
var otpOverlay;
var otpSubmitButton;

var Otp = function() {};
Otp.prototype = {
        init: function() {
            Utils.ScaleManager();
        },
        preload: function() {
            game.stage.disableVisibilityChange = true;
            game.time.advancedTiming = true;
        },
        create: function() {
            this.CreateOtpPage();
        },

        update: function() {
            otpTextInputField.update();
        },

        CreateOtpPage: function() {
            var otpBg = Utils.SpriteSettingsControl(otpBg, game.world.centerX, game.world.centerY, 'login_signup_bg', "true", "true", 0.5, 0.5, 1, 1, "false");
            var otpLock = Utils.SpriteSettingsControl(otpLock, game.world.centerX, game.world.centerY - Math.round(game.height / 9.8), 'lock', "true", "true", 0.5, 0.5, 1, 1, "false");

            Utils.CreateHeadingText("YOUR OTP");

            var otpMessageTextStyle = { font: '50px Lato-Regular', fill: '#5aefe2', align: 'center', wordWrap: true, wordWrapWidth: 700 };
            var otpMessageText = game.add.text(game.world.centerX, game.world.centerY - Math.round(game.height / 10), "Kindly enter the OTP sent to your registered email id", otpMessageTextStyle);
            otpMessageText.anchor.setTo(0.5);

            this.CreateOtpTextInputField();
            this.CreateDontReceiveResendText();
            this.CreateSubmitButton();

            //Create overlay For off the input of all button when click on button
            otpOverlay = Utils.ButtonSettingsControl(otpOverlay, game.world.centerX, game.world.centerY, 'transparent_image', this.OtpOverlayPressed, null, null, null, "true", "true", 0.5, 0.5, 2000, 2000, this);
            otpOverlay.alpha = 0.001;
            otpOverlay.visible = false;
        },

        CreateOtpTextInputField: function() {
            var otpTextFieldBg = Utils.SpriteSettingsControl(otpTextFieldBg, game.world.centerX, game.world.centerY + Math.round(game.height / 45), 'under_line', "true", "true", 0.5, 0.5, 1, 1, "false");
            otpTextInputField = game.add.inputField(-350, -100, {
                font: '50px Lato-Regular',
                fill: '#5aefe2',
                fillAlpha: 0,
                fontWeight: 'normal',
                width: 600,
                textAlign: 'center',
                padding: 10,
                height: 45,
                borderWidth: 1,
                borderColor: '#FFF',
                borderRadius: 6,
                placeHolder: '',
                zoom: false,
                cursorColor: '#5aefe2',
                max: 4,
            });
            otpTextFieldBg.addChild(otpTextInputField);
        },

        CreateDontReceiveResendText: function() {
            var dontReceiveTextStyle = { font: '42px Lato-Regular', fill: '#5aefe2', align: 'center' };
            var dontReceiveText = game.add.text(game.world.centerX - Math.round(game.width / 15), game.world.centerY + Math.round(game.height / 20), "Don't receive OTP ?", dontReceiveTextStyle);
            dontReceiveText.anchor.setTo(0.5);

            var resendTextStyle = { font: '45px Lato-Regular', fill: '#fff001', align: 'center' };
            resendText = game.add.text(270, 0, "Resend", resendTextStyle);
            resendText.anchor.setTo(0.5);
            resendText.inputEnabled = true;
            resendText.events.onInputDown.add(this.ResendTextPressed, this);
            resendText.events.onInputUp.add(this.ResendTextReleased, this);
            dontReceiveText.addChild(resendText);
        },

        CreateSubmitButton: function() {
            otpSubmitButton = Utils.ButtonSettingsControl(otpSubmitButton, game.world.centerX, game.world.centerY + Math.round(game.height / 5.8), 'button_base', this.OtpSubmitButtonPressed, null, null, this.OtpSubmitButtonButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            var submitTextstyle = { font: '40px Lato-Heavy', fill: '#361300', fontWeight: 'normal', align: 'center' };
            var submitButtonText = game.add.text(0, -5, "SUBMIT", submitTextstyle);
            submitButtonText.anchor.setTo(0.5);
            otpSubmitButton.addChild(submitButtonText);
        },

        ResendTextPressed: function() {
            Utils.ButtonScaleAnimation(resendText, resendText.scale.x - 0.02, otpOverlay);
            this.EnableDisableOtpPageButtonInput(true);
            SoundManager.PlayButtonClickTypeTwoSound();
        },

        ResendTextReleased: function() {
            API.ForgetPasswordGenerateOtp(inputForgetEmail);
        },

        OtpSubmitButtonPressed: function() {
            Utils.ButtonScaleAnimation(otpSubmitButton, otpSubmitButton.scale.x - 0.02, otpOverlay);
            this.EnableDisableOtpPageButtonInput(true);
            SoundManager.PlayButtonClickTypeOneSound();
        },
        OtpSubmitButtonButtonReleased: function() {
            if (otpTextInputField.value != "") {
                if (previousPage == "SignUp") {
                    API.Registration(signUpEnteredName, signUpEnteredEmail, signUpEnteredPassword, signUpEnteredDob, signUpEnteredStateId, signUpEnteredPhoneNumber, signUpEnteredGender, otpTextInputField.value);
                } else if (previousPage == "ForgotPassword") {
                    API.VerifyForgetOtp(otpTextInputField.value);
                } else {}
            } else {
                otpTextInputField.value = "";
                Alert.ShowAlert("Please enter valid");
            }
        },

        EnableDisableOtpPageButtonInput: function(_status) {
            otpOverlay.visible = _status;
        },


    } //End of Otp.prototype