var loginEmailTextInputField;
var loginPasswordTextInputField;
var loginButton;
var rightSign;
var termConditionText;
var forgotPasswordText;
var clickHereText;
var checkBoxToggleValue = 0;
var loginOverlay;

var Login = function() {};
Login.prototype = {
        init: function() {
            Utils.ScaleManager();
        },
        preload: function() {
            game.stage.disableVisibilityChange = true;
            game.time.advancedTiming = true;
        },
        create: function() {
            this.CreateLoginPage();
            var versionTextStyle = { font: '40px Lato-Regular', fill: '#5aefe2', align: 'center' };
            var versionText = game.add.text(game.world.centerX + Math.round(game.width / 5), game.world.centerY + Math.round(game.height / 2.2), "Version : 1.4", versionTextStyle);
        },

        update: function() {
            loginEmailTextInputField.update();
            loginPasswordTextInputField.update();
        },

        CreateLoginPage: function() {
            var loginBg = Utils.SpriteSettingsControl(loginBg, game.world.centerX, game.world.centerY, 'login_signup_bg', "true", "true", 0.5, 0.5, 1, 1, "false");
            var loginLock = Utils.SpriteSettingsControl(loginLock, game.world.centerX, game.world.centerY - Math.round(game.height / 9.8), 'lock', "true", "true", 0.5, 0.5, 1, 1, "false");

            Utils.CreateHeadingText("LOGIN");

            this.CreateEmailTextInputField();
            this.CreatePasswordTextInputField();
            this.CreateCheckBox();
            this.CreateForgotPasswordText();
            this.CreateLoginButton();
            this.CreateDontHaveActAndClickHereText();

            //Create overlay For off the input of all button when click on button
            loginOverlay = Utils.ButtonSettingsControl(loginOverlay, game.world.centerX, game.world.centerY, 'transparent_image', this.LoginOverlayPressed, null, null, null, "true", "true", 0.5, 0.5, 2000, 2000, this);
            loginOverlay.alpha = 0.001;
            loginOverlay.visible = false;
        },

        CreateEmailTextInputField: function() {
            var loginEmailTextFieldBg = Utils.SpriteSettingsControl(loginEmailTextFieldBg, game.world.centerX, game.world.centerY - Math.round(game.height / 7.7), 'under_line', "true", "true", 0.5, 0.5, 1, 1, "false");
            loginEmailTextInputField = game.add.inputField(-400, -100, {
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
            loginEmailTextFieldBg.addChild(loginEmailTextInputField);
        },

        CreatePasswordTextInputField: function() {
            var loginPasswordTextFieldBg = Utils.SpriteSettingsControl(loginPasswordTextFieldBg, game.world.centerX, game.world.centerY - Math.round(game.height / 24), 'under_line', "true", "true", 0.5, 0.5, 1, 1, "false");
            loginPasswordTextInputField = game.add.inputField(-400, -90, {
                font: '48px Lato-Regular',
                fill: '#5aefe2',
                fillAlpha: 0,
                fontWeight: 'normal',
                width: 600,
                padding: 10,
                height: 45,
                borderWidth: 1,
                borderColor: '#FFF',
                borderRadius: 6,
                placeHolder: 'Password',
                zoom: false,
                cursorColor: '#5aefe2',
                max: 20,
                type: PhaserInput.InputType.password
            });
            loginPasswordTextFieldBg.addChild(loginPasswordTextInputField);
        },

        CreateCheckBox: function() {
            var loginTermConditionCheckBox = Utils.ButtonSettingsControl(loginTermConditionCheckBox, game.world.centerX - Math.round(game.width / 3.2), game.world.centerY + Math.round(game.height / 45), 'select_box', this.LoginTermConditionCheckBoxPressed, null, null, this.LoginTermConditionCheckBoxReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            rightSign = Utils.SpriteSettingsControl(rightSign, 0, 0, 'right_sign', "true", "true", 0.5, 0.5, 1, 1, "false");
            rightSign.visible = false;
            loginTermConditionCheckBox.addChild(rightSign);
            this.CreateAgreeAndTermConditionText(loginTermConditionCheckBox);
        },

        CreateAgreeAndTermConditionText: function(_loginTermConditionCheckBox) {
            var agreeTextStyle = { font: '42px Lato-Regular', fill: '#5aefe2', align: 'center' };
            var agreeText = game.add.text(165, 2, "I agree to the", agreeTextStyle);
            agreeText.anchor.setTo(0.5);
            _loginTermConditionCheckBox.addChild(agreeText);
            var termConditionTextStyle = { font: '42px Lato-Regular', fill: '#fff001', align: 'center' };
            termConditionText = game.add.text(325, 3, "Terms and conditions", termConditionTextStyle);
            termConditionText.anchor.setTo(0.5);
            termConditionText.inputEnabled = true;
            termConditionText.input.useHandCursor = true;
            termConditionText.events.onInputDown.add(this.TermConditionTextPressed, this);
            termConditionText.events.onInputUp.add(this.TermConditionTextReleased, this);
            agreeText.addChild(termConditionText);
        },

        CreateForgotPasswordText: function() {
            var forgotPasswordTextStyle = { font: '42px Lato-Medium', fill: '#5aefe2', align: 'center' };
            forgotPasswordText = game.add.text(game.world.centerX, game.world.centerY + Math.round(game.height / 10.4), "Forgot your password ?", forgotPasswordTextStyle);
            forgotPasswordText.anchor.setTo(0.5);
            forgotPasswordText.inputEnabled = true;
            forgotPasswordText.input.useHandCursor = true;
            forgotPasswordText.events.onInputDown.add(this.ForgotPasswordTextPressed, this);
            forgotPasswordText.events.onInputUp.add(this.ForgotPasswordTextReleased, this);
            var forgotPasswordUnderline = Utils.SpriteSettingsControl(forgotPasswordUnderline, -2, 40, 'under_line', "true", "true", 0.5, 0.5, 0.52, 0.52, "false");
            forgotPasswordUnderline.tint = "0x5aefe2";
            forgotPasswordText.addChild(forgotPasswordUnderline);
        },

        CreateLoginButton: function() {
            loginButton = Utils.ButtonSettingsControl(loginButton, game.world.centerX, game.world.centerY + Math.round(game.height / 5.8), 'button_base', this.LoginButtonPressed, null, null, this.LoginButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            var loginTextstyle = { font: '38px Lato-Heavy', fill: '#361300', fontWeight: 'normal', align: 'center' };
            var loginButtonText = game.add.text(0, -5, "LOGIN", loginTextstyle);
            loginButtonText.anchor.setTo(0.5);
            loginButton.addChild(loginButtonText);
            loginButton.inputEnabled = false;
            loginButton.alpha = 0.5;
        },

        CreateDontHaveActAndClickHereText: function() {
            var dontHaveActTextStyle = { font: '42px Lato-Regular', fill: '#5aefe2', align: 'center' };
            var dontHaveActText = game.add.text(game.world.centerX - Math.round(game.width / 11), game.world.centerY + Math.round(game.height / 2.77), "Don't have an account ?", dontHaveActTextStyle);
            dontHaveActText.anchor.setTo(0.5);
            var clickHereTextStyle = { font: '42px Lato-Regular', fill: '#fff001', align: 'center' };
            clickHereText = game.add.text(335, 0, "Click here", clickHereTextStyle);
            clickHereText.anchor.setTo(0.5);
            clickHereText.inputEnabled = true;
            clickHereText.input.useHandCursor = true;
            clickHereText.events.onInputDown.add(this.ClickHereTextPressed, this);
            clickHereText.events.onInputUp.add(this.ClickHereTextReleased, this);
            dontHaveActText.addChild(clickHereText);
        },

        ToggleCheckBox: function() {
            if (checkBoxToggleValue == 0) {
                rightSign.visible = true;
                checkBoxToggleValue = 1;
                loginButton.inputEnabled = true;
                loginButton.input.useHandCursor = true;
                loginButton.alpha = 1;
            } else {
                rightSign.visible = false;
                checkBoxToggleValue = 0;
                loginButton.inputEnabled = false;
                loginButton.alpha = 0.5;
            }
        },

        LoginTermConditionCheckBoxPressed: function() {
            this.ToggleCheckBox();
            SoundManager.PlayButtonClickTypeTwoSound();
        },
        LoginTermConditionCheckBoxReleased: function() {},

        TermConditionTextPressed: function() {
            Utils.ButtonScaleAnimation(termConditionText, termConditionText.scale.x - 0.02, loginOverlay);
            this.EnableDisableLoginPageButtonInput(true);
            Utils.TransitToTermsAndCondition();
            SoundManager.PlayButtonClickTypeTwoSound();
        },
        TermConditionTextReleased: function() {},

        ForgotPasswordTextPressed: function() {
            Utils.ButtonScaleAnimation(forgotPasswordText, forgotPasswordText.scale.x - 0.02, loginOverlay);
            this.EnableDisableLoginPageButtonInput(true);
            SoundManager.PlayButtonClickTypeTwoSound();
        },
        ForgotPasswordTextReleased: function() {
            StateTransition.TransitToForgotPassword();
        },

        ClickHereTextPressed: function() {
            Utils.ButtonScaleAnimation(clickHereText, clickHereText.scale.x - 0.02, loginOverlay);
            this.EnableDisableLoginPageButtonInput(true);
            SoundManager.PlayButtonClickTypeTwoSound();
        },
        ClickHereTextReleased: function() {
            setTimeout(() => {
                StateTransition.TransitToSignUp();
            }, 100);
        },

        LoginButtonPressed: function() {
            Utils.ButtonScaleAnimation(loginButton, loginButton.scale.x - 0.02, loginOverlay);
            this.EnableDisableLoginPageButtonInput(true);
            SoundManager.PlayButtonClickTypeOneSound();
        },
        LoginButtonReleased: function() {
            loginEmailTextInputField.value = loginEmailTextInputField.value.replace(/\s/g, '');
            loginPasswordTextInputField.value = loginPasswordTextInputField.value.replace(/\s/g, '');
            if (loginEmailTextInputField.value != "" && loginPasswordTextInputField.value != "") {
                var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                // var passwordFormat = "^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$";
                if (loginEmailTextInputField.value.match(mailformat)) {
                    API.Login(loginEmailTextInputField.value, loginPasswordTextInputField.value, "", "", "");
                } else {
                    Alert.ShowAlert("Please enter valid email address");
                    loginEmailTextInputField.value = "";
                    loginPasswordTextInputField.value = "";
                }
            } else {
                Alert.ShowAlert("Please enter your valid credentials");
                loginEmailTextInputField.value = "";
                loginPasswordTextInputField.value = "";
            }
        },

        EnableDisableLoginPageButtonInput: function(_status) {
            loginOverlay.visible = _status;
        },


    } //End of Login.prototype