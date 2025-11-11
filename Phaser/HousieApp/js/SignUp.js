var signUpProfilePic;
var profileEditButton;
var signUpNameInputField;
var signUpDobYearInputField;
var signUpDobMonthInputField;
var signupDobDayInputField;
var signUpStateBg;
var signUpSelectStateText;
var signUpSelectGenderText;
var signUpPhoneInputField;
var signUpEmailInputField;
var signUpPasswordInputField;
var signUpConfirmPasswordInputField;
var signUpTermConditionCheckBox;
var signUpRightSign;
var signUpCheckBoxToggleValue = 0;
var signUpTermConditionText;
var privacyText;
var signUpclickHereText;
var signUpButton;
var signUpGenderJson;
var signUpGenderPanelGroup;
var signUpStatePopupGroup;
var signUpScrollGroup;
var singnUpGenderStateButtonToggle = false;
var signUpStateId;
var signUpEnteredName;
var signUpEnteredDob;
var signUpEnteredStateId;
var signUpEnteredGender;
var signUpEnteredPhoneNumber;
var signUpEnteredEmail;
var signUpEnteredPassword;
var signUpStateObjectToSelect;
var signUpStateObjectIdToSelect;
var signUpStateArray = [];
var signUpIsMouseDown = false;
var signUpStartPos = 0;
var signUpStateButtonToggle = false;
var signUpOverlay;
var isYear = false;

var SignUp = function() {};
SignUp.prototype = {
        init: function() {
            Utils.ScaleManager();
        },
        preload: function() {
            game.stage.disableVisibilityChange = true;
            game.time.advancedTiming = true;
        },

        create: function() {
            signUpGenderJson = game.cache.getJSON('gender_json');
            this.CreateSignUpPage();
        },

        update: function() {
            signUpNameInputField.update();
            signUpDobYearInputField.update();
            signUpDobMonthInputField.update();
            signupDobDayInputField.update();
            signUpPhoneInputField.update();
            signUpEmailInputField.update();
            signUpPasswordInputField.update();
            signUpConfirmPasswordInputField.update();

            if (signUpDobYearInputField) {
                // console.log("...................................");
                if (signUpDobYearInputField.value.length > 4) {
                    // console.log("Insert..............");
                    signUpDobYearInputField.value = signUpDobYearInputField.value.slice(0, 4);
                    signUpDobYearInputField.text.setText(signUpDobYearInputField.value);
                    signUpDobYearInputField.endFocus();
                } else if (signUpDobMonthInputField.value.length > 2) {
                    // console.log("Insert..............");
                    signUpDobMonthInputField.value = signUpDobMonthInputField.value.slice(0, 2);
                    signUpDobMonthInputField.text.setText(signUpDobMonthInputField.value);
                    signUpDobMonthInputField.endFocus();
                } else if (signupDobDayInputField.value.length > 2) {
                    // console.log("Insert..............");
                    signupDobDayInputField.value = signupDobDayInputField.value.slice(0, 2);
                    signupDobDayInputField.text.setText(signupDobDayInputField.value);
                    signupDobDayInputField.endFocus();
                }
            }
        },
        CreateSignUpPage: function() {
            signUpStateButtonToggle = false;

            var signUpBg = Utils.SpriteSettingsControl(signUpBg, game.world.centerX, game.world.centerY, 'login_signup_bg', "true", "true", 0.5, 0.5, 1, 1, "false");

            Utils.CreateHeadingText("SIGN UP");

            //this.CreateProfilePicture();
            this.CreateNameTextInputField();
            this.CreateDobTextInputField();
            this.CreateStateField();
            this.CreateGenderField();
            this.CreatePhoneNumberTextInputField();
            this.CreateEmailTextInputField();
            this.CreatePasswordTextInputField();
            this.CreateConfirmPasswordTextInputField();
            this.CreateCheckBox();
            this.CreateHaveActAndClickHereText();
            this.CreateSignUpButton();
            this.CreateStatePanel();

            // //Create overlay For off the input of all button when click on button
            signUpOverlay = Utils.ButtonSettingsControl(signUpOverlay, game.world.centerX, game.world.centerY, 'transparent_image', this.SignUpOverlayPressed, null, null, null, "true", "true", 0.5, 0.5, 2000, 2000, this);
            signUpOverlay.alpha = 0.001;
            signUpOverlay.visible = false;
        },

        CreateProfilePicture: function() {
            var profileMask = game.add.graphics(0, 0);
            profileMask.beginFill(0x000000);
            profileMask.drawCircle(game.world.centerX, game.world.centerY - Math.round(game.height / 3.2), game.height / 7);
            signUpProfilePic = Utils.SpriteSettingsControl(signUpProfilePic, game.world.centerX, game.world.centerY - Math.round(game.height / 3.2), 'profile_pic', "true", "true", 0.5, 0.5, 1, 1, "false");
            var profilePicBase = Utils.SpriteSettingsControl(profilePicBase, game.world.centerX, game.world.centerY - Math.round(game.height / 3.2), 'profile_base', "true", "true", 0.5, 0.5, 1, 1, "false");
            signUpProfilePic.mask = profileMask;
            profileEditButton = Utils.ButtonSettingsControl(profileEditButton, 140, -50, 'edit_button', this.ProfileEditButtonPressed, null, null, this.ProfileEditButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            profilePicBase.addChild(profileEditButton);
        },

        CreateNameTextInputField: function() {
            var signUpNameTextFieldBg = Utils.SpriteSettingsControl(signUpNameTextFieldBg, game.world.centerX, game.world.centerY - Math.round(game.height / 4.92), 'text_box', "true", "true", 0.5, 0.5, 1, 1, "false");
            var nameTextstyle = { font: '38px Lato-Regular', fill: '#5aefe2', fontWeight: 'normal', align: 'center', wordWrap: false, wordWrapWidth: 800, };
            var nameText = game.add.text(-400, -85, "Name", nameTextstyle);
            signUpNameInputField = game.add.inputField(-400, -35, {
                font: '40px Lato-Regular',
                fill: '#5aefe2',
                fillAlpha: 0,
                fontWeight: 'normal',
                width: 700,
                padding: 10,
                height: 45,
                borderWidth: 1,
                borderColor: '#FFF',
                borderRadius: 6,
                placeHolder: 'Enter name',
                zoom: false,
                cursorColor: '#5aefe2',
                max: 50,
                type: PhaserInput.InputType.text,
            });
            signUpNameTextFieldBg.addChild(signUpNameInputField);
            signUpNameTextFieldBg.addChild(nameText);
        },

        CreateDobTextInputField: function() {
            var signUpDobYearTextFieldBg = Utils.SpriteSettingsControl(signUpDobYearTextFieldBg, game.world.centerX - Math.round(game.width / 3.8), game.world.centerY - Math.round(game.height / 7.5), 'text_box', "true", "true", 0.5, 0.5, 0.3, 1, "false");
            var dobTextstyle = { font: '38px Lato-Regular', fill: '#5aefe2', fontWeight: 'normal', align: 'center' };
            var dobText = game.add.text(game.world.centerX - Math.round(game.width / 2.7), game.world.centerY - Math.round(game.height / 5.7), "Date of birth", dobTextstyle);


            var signUpDobMonthTextFieldBg = Utils.SpriteSettingsControl(signUpDobMonthTextFieldBg, game.world.centerX - Math.round(game.width / 100), game.world.centerY - Math.round(game.height / 7.5), 'text_box', "true", "true", 0.5, 0.5, 0.3, 1, "false");

            var signUpDobDateTextFieldBg = Utils.SpriteSettingsControl(signUpDobDateTextFieldBg, game.world.centerX + Math.round(game.width / 4), game.world.centerY - Math.round(game.height / 7.5), 'text_box', "true", "true", 0.5, 0.5, 0.3, 1, "false");



            signUpDobYearInputField = game.add.inputField(game.world.centerX - Math.round(game.width / 2.7), game.world.centerY - Math.round(game.height / 6.6), {
                font: '40px Lato-Regular',
                fill: '#5aefe2',
                fillAlpha: 0,
                fontWeight: 'normal',
                width: 200,
                padding: 10,
                height: 45,
                borderWidth: 1,
                borderColor: '#FFF',
                borderRadius: 6,
                placeHolder: 'YYYY',
                zoom: false,
                cursorColor: '#5aefe2',
                type: PhaserInput.InputType.number,
            });
            signUpDobMonthInputField = game.add.inputField(game.world.centerX - Math.round(game.width / 8.5), game.world.centerY - Math.round(game.height / 6.6), {
                font: '40px Lato-Regular',
                fill: '#5aefe2',
                fillAlpha: 0,
                fontWeight: 'normal',
                width: 200,
                padding: 10,
                height: 45,
                borderWidth: 1,
                borderColor: '#FFF',
                borderRadius: 6,
                placeHolder: 'MM',
                zoom: false,
                cursorColor: '#5aefe2',
                min: 0,
                type: PhaserInput.InputType.number,
            });

            signupDobDayInputField = game.add.inputField(game.world.centerX + Math.round(game.width / 7), game.world.centerY - Math.round(game.height / 6.6), {
                font: '40px Lato-Regular',
                fill: '#5aefe2',
                fillAlpha: 0,
                fontWeight: 'normal',
                width: 200,
                padding: 8,
                height: 45,
                borderWidth: 1,
                borderColor: '#FFF',
                borderRadius: 6,
                placeHolder: 'DD',
                zoom: false,
                cursorColor: '#5aefe2',
                min: 0,
                type: PhaserInput.InputType.number,
            });
            // signUpDobTextFieldBg.addChild(signUpDobInputField);
            // signUpDobTextFieldBg.addChild(dobText);
        },




        CreateStateField: function() {
            signUpStateBg = Utils.ButtonSettingsControl(signUpStateBg, game.world.centerX - Math.round(game.width / 5.15), game.world.centerY - Math.round(this.game.height / 16), 'text_box_small', this.SignUpStateBgButtonPressed, null, null, this.SignUpStateBgButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            var stateTextstyle = { font: '38px Lato-Regular', fill: '#5aefe2', fontWeight: 'normal', align: 'center', wordWrap: false, wordWrapWidth: 800 };
            var stateText = game.add.text(-186, -85, "State", stateTextstyle);
            signUpStateBg.addChild(stateText);
            var selectStateTextstyle = { font: '40px Lato-Regular', fill: '#427a7b', fontWeight: 'normal', align: 'center', wordWrap: false, wordWrapWidth: 800 };
            signUpSelectStateText = game.add.text(-184, -27, "Select state", selectStateTextstyle);
            signUpStateBg.addChild(signUpSelectStateText);
            var stateArrowButton = Utils.SpriteSettingsControl(stateArrowButton, 170, 3, 'arrow', "true", "true", 0.5, 0.5, 1, 1, "false");
            signUpStateBg.addChild(stateArrowButton);
        },

        CreateGenderField: function() {
            var signUpGenderBg = Utils.ButtonSettingsControl(signUpGenderBg, game.world.centerX + Math.round(game.width / 5.15), game.world.centerY - Math.round(this.game.height / 16), 'text_box_small', this.SignUpGenderBgButtonPressed, null, null, this.SignUpGenderBgButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            var genderTextstyle = { font: '38px Lato-Regular', fill: '#5aefe2', fontWeight: 'normal', align: 'center', wordWrap: false, wordWrapWidth: 800 };
            var genderText = game.add.text(-186, -85, "Gender", genderTextstyle);
            signUpGenderBg.addChild(genderText);
            var selectGenderTextstyle = { font: '40px Lato-Regular', fill: '#427a7b', fontWeight: 'normal', align: 'center', wordWrap: false, wordWrapWidth: 800 };
            signUpSelectGenderText = game.add.text(-184, -27, "Select gender", selectGenderTextstyle);
            signUpGenderBg.addChild(signUpSelectGenderText);
            var genderArrowButton = Utils.SpriteSettingsControl(genderArrowButton, 170, 3, 'arrow', "true", "true", 0.5, 0.5, 1, 1, "false");
            signUpGenderBg.addChild(genderArrowButton);
        },

        CreatePhoneNumberTextInputField: function() {
            var signUpPhoneTextFieldBg = Utils.SpriteSettingsControl(signUpPhoneTextFieldBg, game.world.centerX, game.world.centerY + Math.round(this.game.height / 165), 'text_box', "true", "true", 0.5, 0.5, 1, 1, "false");
            var phoneTextstyle = { font: '38px Lato-Regular', fill: '#5aefe2', fontWeight: 'normal', align: 'center' };
            var phoneText = game.add.text(-400, -85, "Phone no.", phoneTextstyle);
            signUpPhoneInputField = game.add.inputField(-400, -35, {
                font: '40px Lato-Regular',
                fill: '#5aefe2',
                fillAlpha: 0,
                fontWeight: 'normal',
                width: 700,
                padding: 8,
                height: 45,
                borderWidth: 1,
                borderColor: '#FFF',
                borderRadius: 6,
                placeHolder: 'Enter phone no.',
                zoom: false,
                cursorColor: '#5aefe2',
                min: 0,
                type: PhaserInput.InputType.number,
            });
            signUpPhoneTextFieldBg.addChild(signUpPhoneInputField);
            signUpPhoneTextFieldBg.addChild(phoneText);
        },

        CreateEmailTextInputField: function() {
            var signUpEmailTextFieldBg = Utils.SpriteSettingsControl(signUpEmailTextFieldBg, game.world.centerX, game.world.centerY + Math.round(game.height / 13.7), 'text_box', "true", "true", 0.5, 0.5, 1, 1, "false");
            var emailTextstyle = { font: '38px Lato-Regular', fill: '#5aefe2', fontWeight: 'normal', align: 'center' };
            var emailText = game.add.text(-400, -85, "Email", emailTextstyle);
            signUpEmailInputField = game.add.inputField(-400, -35, {
                font: '40px Lato-Regular',
                fill: '#5aefe2',
                fillAlpha: 0,
                fontWeight: 'normal',
                width: 760,
                padding: 8,
                height: 45,
                borderWidth: 1,
                borderColor: '#FFF',
                borderRadius: 6,
                placeHolder: 'Enter email',
                zoom: false,
                cursorColor: '#5aefe2',
                max: 50,
                forceCase: PhaserInput.ForceCase.lower,
            });
            signUpEmailTextFieldBg.addChild(signUpEmailInputField);
            signUpEmailTextFieldBg.addChild(emailText);
        },

        CreatePasswordTextInputField: function() {
            var signUpPasswordTextFieldBg = Utils.SpriteSettingsControl(signUpPasswordTextFieldBg, game.world.centerX, game.world.centerY + Math.round(game.height / 7), 'text_box', "true", "true", 0.5, 0.5, 1, 1, "false");
            var passwordTextstyle = { font: '38px Lato-Regular', fill: '#5aefe2', fontWeight: 'normal', align: 'center', wordWrap: false, wordWrapWidth: 800 };
            var passwordText = game.add.text(-400, -85, "Password", passwordTextstyle);
            signUpPasswordInputField = game.add.inputField(-400, -35, {
                font: '40px Lato-Regular',
                fill: '#5aefe2',
                fillAlpha: 0,
                fontWeight: 'normal',
                width: 760,
                padding: 8,
                height: 45,
                borderWidth: 1,
                borderColor: '#FFF',
                borderRadius: 6,
                placeHolder: 'Enter pasword',
                zoom: false,
                cursorColor: '#5aefe2',
                max: 50,
                type: PhaserInput.InputType.password
            });
            signUpPasswordTextFieldBg.addChild(signUpPasswordInputField);
            signUpPasswordTextFieldBg.addChild(passwordText);
        },
        CreateConfirmPasswordTextInputField: function() {
            var signUpConfirmPasswordTextFieldBg = Utils.SpriteSettingsControl(signUpConfirmPasswordTextFieldBg, game.world.centerX, game.world.centerY + Math.round(game.height / 4.65), 'text_box', "true", "true", 0.5, 0.5, 1, 1, "false");
            var confirmPasswordTextstyle = { font: '38px Lato-Regular', fill: '#5aefe2', fontWeight: 'normal', align: 'center', wordWrap: false, wordWrapWidth: 800 };
            var confirmPasswordText = game.add.text(-400, -85, "Confirm password", confirmPasswordTextstyle);
            signUpConfirmPasswordInputField = game.add.inputField(-400, -35, {
                font: '40px Lato-Regular',
                fill: '#5aefe2',
                fillAlpha: 0,
                fontWeight: 'normal',
                width: 760,
                padding: 8,
                height: 45,
                borderWidth: 1,
                borderColor: '#FFF',
                borderRadius: 6,
                placeHolder: 'Confirm password',
                zoom: false,
                cursorColor: '#5aefe2',
                max: 50,
                type: PhaserInput.InputType.password
            });
            signUpConfirmPasswordTextFieldBg.addChild(signUpConfirmPasswordInputField);
            signUpConfirmPasswordTextFieldBg.addChild(confirmPasswordText);
        },

        CreateCheckBox: function() {
            signUpTermConditionCheckBox = Utils.ButtonSettingsControl(signUpTermConditionCheckBox, game.world.centerX - Math.round(game.width / 3), game.world.centerY + Math.round(game.height / 3.76), 'select_box', this.SignUpTermConditionCheckBoxPressed, null, null, this.SignUpTermConditionCheckBoxReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            signUpRightSign = Utils.SpriteSettingsControl(signUpRightSign, 0, 0, 'right_sign', "true", "true", 0.5, 0.5, 1, 1, "false");
            signUpRightSign.visible = false;
            signUpTermConditionCheckBox.addChild(signUpRightSign);

            this.CreateAgreeAndTermConditionText(signUpTermConditionCheckBox);
        },

        CreateAgreeAndTermConditionText: function(_signUpTermConditionCheckBox) {
            var agreeTextStyle = { font: '40px Lato-Regular', fill: '#5aefe2', align: 'center' };
            var agreeText = game.add.text(165, 2, "I agree to the", agreeTextStyle);
            agreeText.anchor.setTo(0.5);
            _signUpTermConditionCheckBox.addChild(agreeText);

            var termConditionTextStyle = { font: '40px Lato-Regular', fill: '#fff001', align: 'center' };
            signUpTermConditionText = game.add.text(320, 3, "Terms and conditions", termConditionTextStyle);
            signUpTermConditionText.anchor.setTo(0.5);
            signUpTermConditionText.inputEnabled = true;
            signUpTermConditionText.events.onInputDown.add(this.SignUpTermConditionPressed, this);
            signUpTermConditionText.events.onInputUp.add(this.SignUpTermConditionReleased, this);
            agreeText.addChild(signUpTermConditionText);

            this.CreateAndPrivacyText(agreeText);
        },

        CreateAndPrivacyText: function(_agreeText) {
            var andTextStyle = { font: '40px Lato-Regular', fill: '#5aefe2', align: 'center' };
            var andText = game.add.text(-71, 45, "and", andTextStyle);
            andText.anchor.setTo(0.5);
            _agreeText.addChild(andText);

            var privacyTextStyle = { font: '40px Lato-Regular', fill: '#fff001', align: 'center' };
            privacyText = game.add.text(95, 45, "Privacy policy", privacyTextStyle);
            privacyText.anchor.setTo(0.5);
            privacyText.inputEnabled = true;
            privacyText.events.onInputDown.add(this.PrivacyTextPressed, this);
            privacyText.events.onInputUp.add(this.PrivacyTextReleased, this);
            _agreeText.addChild(privacyText);
        },

        CreateHaveActAndClickHereText: function() {
            var haveActTextStyle = { font: '40px Lato-Regular', fill: '#5aefe2', align: 'center' };
            var haveActText = game.add.text(game.world.centerX - Math.round(game.width / 11), game.world.centerY + Math.round(game.height / 3), "Already have an account ?", haveActTextStyle);
            haveActText.anchor.setTo(0.5);

            var clickHereTextStyle = { font: '40px Lato-Regular', fill: '#fff001', align: 'center' };
            signUpclickHereText = game.add.text(330, 0, "Click here", clickHereTextStyle);
            signUpclickHereText.anchor.setTo(0.5);
            signUpclickHereText.inputEnabled = true;
            signUpclickHereText.events.onInputDown.add(this.SignUpClickHereTextPressed, this);
            signUpclickHereText.events.onInputUp.add(this.SignUpClickHereTextReleased, this);
            haveActText.addChild(signUpclickHereText);
        },

        CreateSignUpButton: function() {
            signUpButton = Utils.ButtonSettingsControl(signUpButton, game.world.centerX, game.world.centerY + Math.round(game.height / 2.6), 'button_base', this.SignUpButtonPressed, null, null, this.SignUpButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            var signupTextstyle = { font: '38px Lato-Heavy', fill: '#361300', fontWeight: 'normal', align: 'center' };
            var signUpButtonText = game.add.text(0, -5, "SIGN UP", signupTextstyle);
            signUpButtonText.anchor.setTo(0.5);
            signUpButton.addChild(signUpButtonText);
            signUpButton.inputEnabled = false;
            signUpButton.alpha = 0.5;
        },

        CreateStatePanel: function() {
            signUpStatePopupGroup = game.add.group();
            signUpScrollGroup = game.add.group();

            var signUpStateMask = game.add.graphics(0, 0);
            // signUpStateMask.beginFill(0xFF3300);
            signUpStateMask.drawRect(Math.round(game.width / 8.6), Math.round(game.height / 2.22), Math.round(game.width / 2.63), Math.round(game.width / 4));
            signUpScrollGroup.mask = signUpStateMask;

            this.CreateStatePanelDownFalseImage();
            this.CreateStatePanelUpFalseImage();
            this.CreateStateName(stateList);

            signUpStatePopupGroup.add(signUpStateMask);
            signUpStatePopupGroup.add(signUpScrollGroup);

            signUpStatePopupGroup.visible = false;
            game.world.bringToTop(signUpStateBg);
            game.world.bringToTop(signUpTermConditionCheckBox);

            this.CreateStateScroller();
        },

        CreateStatePanelDownFalseImage: function() {
            var downFalseImage = game.add.sprite(Math.round(game.width / 8.6), Math.round(game.height / 1.68), "transparent_image" /*"one_pixel"*/ );
            downFalseImage.tint = "0x000000";
            downFalseImage.alpha = 0.001;
            downFalseImage.scale.set(Math.round(game.width / 2.63), Math.round(game.height / 2.18));
            downFalseImage.inputEnabled = true;
            downFalseImage.events.onInputDown.add(this.FasleImagePressed, this);
            signUpStatePopupGroup.add(downFalseImage);
        },
        CreateStatePanelUpFalseImage: function() {
            var upFalseImage = game.add.sprite(Math.round(game.width / 8.6), 0, "transparent_image" /*"one_pixel"*/ );
            upFalseImage.tint = "0x000000";
            upFalseImage.alpha = 0.001;
            upFalseImage.scale.set(Math.round(game.width / 2.63), Math.round(game.height / 2.18));
            upFalseImage.inputEnabled = true;
            upFalseImage.events.onInputDown.add(this.FasleImagePressed, this);
            signUpStatePopupGroup.add(upFalseImage);
        },
        FasleImagePressed: function() {},

        CreateStateName: function(_item) {
            signUpStateArray = [];
            var stateStyle = { font: '42px Lato-Regular', fill: '#427a7b', align: 'left' };
            for (var i = 0; i < _item.length; i++) {
                var xPos = game.world.centerX - Math.round(game.width / 5.17);
                var yPos = game.world.centerY - Math.round(game.height / 31) + (i * 65);
                var bg = Utils.ButtonSettingsControl(bg, xPos, yPos, 'panel_box', this.StateNamePressed, null, null, this.StateNameReleased, "true", "true", 0.5, 0.5, 1, 1, this);
                bg.name = _item[i].name;
                bg.index = _item[i]._id;
                var stateText = game.add.text(-182, 0, _item[i].name, stateStyle);
                stateText.anchor.setTo(0, 0.5);
                bg.addChild(stateText);
                signUpStateArray.push(bg);
                signUpScrollGroup.add(signUpStateArray[i]);
            }
        },

        ShowStatePanel: function() {
            signUpStatePopupGroup.visible = true;
        },
        HideStatePanel: function() {
            signUpStatePopupGroup.visible = false;
        },

        StateNamePressed: function(_this) {
            signUpIsMouseDown = true;
            signUpStartPos = game.input.y;
            signUpStateObjectToSelect = _this.name;
            signUpStateObjectIdToSelect = _this.index;

        },
        StateNameReleased: function() {
            signUpIsMouseDown = false;
            if (signUpStateObjectToSelect != null && signUpStateObjectIdToSelect != null) {
                signUpSelectStateText.setText(signUpStateObjectToSelect);
                signUpSelectStateText.fill = '#5aefe2';
                signUpStateId = signUpStateObjectIdToSelect;
                this.HideStatePanel();
                signUpStateButtonToggle = false;
            } else {}
        },

        CreateStateScroller: function() {
            var scrollingLimit = Math.ceil(signUpScrollGroup.children[0].height.toFixed(2) * 4);
            scrollingLimit = Math.ceil(Math.ceil(signUpScrollGroup.height) - scrollingLimit);
            game.input.addMoveCallback(function(pointer, x, y) {
                if (signUpIsMouseDown) {
                    if (pointer.y > signUpStartPos) {
                        signUpStateObjectToSelect = null;
                        signUpStateObjectIdToSelect = null;
                        if (signUpScrollGroup.y < 0) {
                            signUpScrollGroup.y += (pointer.y - signUpStartPos);
                            signUpStartPos = pointer.y;
                        } else {}
                    } else {}
                    if (pointer.y < signUpStartPos) {
                        signUpStateObjectToSelect = null;
                        signUpStateObjectIdToSelect = null;
                        if (signUpScrollGroup.y > -scrollingLimit) {
                            signUpScrollGroup.y -= (signUpStartPos - pointer.y);
                            signUpStartPos = pointer.y;
                        } else {}
                    } else {}
                } else {}
            });
        },

        ShowGenderPanel: function(_item) {
            signUpGenderPanelGroup = game.add.group();
            var genderStyle = { font: '42px Lato-Regular', fill: '#427a7b', align: 'left' };
            for (var i = 0; i < _item.length; i++) {
                var xPos = game.world.centerX + Math.round(game.width / 5.17);
                var yPos = game.world.centerY - Math.round(game.height / 31) + (i * 65);
                var bg = Utils.ButtonSettingsControl(bg, xPos, yPos, 'panel_box', this.GenderNamePressed, null, null, this.GenderNameReleased, "true", "true", 0.5, 0.5, 1, 1, this);
                bg.name = _item[i].type;
                var genderText = game.add.text(-180, 0, _item[i].type, genderStyle);
                genderText.anchor.setTo(0, 0.5);
                bg.addChild(genderText);
                signUpGenderPanelGroup.add(bg);
            }
        },

        HideGenderPanel: function() {
            signUpGenderPanelGroup.visible = false;
        },

        GenderNamePressed: function(_this) {
            signUpSelectGenderText.setText(_this.name);
            signUpSelectGenderText.fill = '#5aefe2';
            this.HideGenderPanel();
            singnUpGenderStateButtonToggle = false;
        },
        GenderNameReleased: function() {},

        ProfileEditButtonPressed: function() {
            Utils.ButtonScaleAnimation(profileEditButton, profileEditButton.scale.x - 0.02, signUpOverlay);
            this.EnableDisableSignUpPageButtonInput(true);
            SoundManager.PlayButtonClickTypeOneSound();
        },
        ProfileEditButtonReleased: function() {},

        SignUpStateBgButtonPressed: function() {
            signUpStateButtonToggle = !signUpStateButtonToggle;
            SoundManager.PlayButtonClickTypeOneSound();
        },
        SignUpStateBgButtonReleased: function() {
            if (signUpStateButtonToggle) {
                this.ShowStatePanel();
            } else {
                this.HideStatePanel();
            }
        },

        SignUpGenderBgButtonPressed: function() {
            singnUpGenderStateButtonToggle = !singnUpGenderStateButtonToggle;
            SoundManager.PlayButtonClickTypeOneSound();
        },
        SignUpGenderBgButtonReleased: function() {
            if (singnUpGenderStateButtonToggle) {
                this.ShowGenderPanel(signUpGenderJson);
            } else {
                this.HideGenderPanel();
            }
        },

        ToggleSignUpCheckBox: function() {
            if (signUpCheckBoxToggleValue == 0) {
                signUpRightSign.visible = true;
                signUpCheckBoxToggleValue = 1;
                signUpButton.inputEnabled = true;
                signUpButton.alpha = 1;
            } else {
                signUpRightSign.visible = false;
                signUpCheckBoxToggleValue = 0;
                signUpButton.inputEnabled = false;
                signUpButton.alpha = 0.5;
            }
        },

        SignUpTermConditionCheckBoxPressed: function() {
            this.ToggleSignUpCheckBox();
            SoundManager.PlayButtonClickTypeTwoSound();
        },
        SignUpTermConditionCheckBoxReleased: function() {},

        SignUpTermConditionPressed: function() {
            Utils.ButtonScaleAnimation(signUpTermConditionText, signUpTermConditionText.scale.x - 0.02, signUpOverlay);
            this.EnableDisableSignUpPageButtonInput(true);
            Utils.TransitToTermsAndCondition();
            SoundManager.PlayButtonClickTypeTwoSound();
        },
        SignUpTermConditionReleased: function() {},

        PrivacyTextPressed: function() {
            Utils.ButtonScaleAnimation(privacyText, privacyText.scale.x - 0.02, signUpOverlay);
            this.EnableDisableSignUpPageButtonInput(true);
            Utils.TransitToPrivacyPolicy();
            SoundManager.PlayButtonClickTypeTwoSound();
        },
        PrivacyTextReleased: function() {},

        SignUpClickHereTextPressed: function() {
            Utils.ButtonScaleAnimation(signUpclickHereText, signUpclickHereText.scale.x - 0.02, signUpOverlay);
            this.EnableDisableSignUpPageButtonInput(true);
            SoundManager.PlayButtonClickTypeTwoSound();
        },
        SignUpClickHereTextReleased: function() {
            StateTransition.TransitToLogin();
            signUpStatePopupGroup.destroy();
            signUpScrollGroup.destroy();
        },

        SignUpButtonPressed: function() {
            Utils.ButtonScaleAnimation(signUpButton, signUpButton.scale.x - 0.02, signUpOverlay);
            this.EnableDisableSignUpPageButtonInput(true);
            SoundManager.PlayButtonClickTypeOneSound();
        },
        SignUpButtonReleased: function() {
            previousPage = "SignUp";
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            var passwordFormat = "^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$";
            var dateFormat = /^\d{4}-\d{1,2}-\d{1,2}$/;
            // var dateOfBirth = document.getElementById('dob').value;
            // if (signUpNameInputField.value != "" && signUpPhoneInputField &&
            //     signUpEmailInputField != null && signUpPasswordInputField.value != "" &&
            //     signUpConfirmPasswordInputField.value != "" && dateOfBirth != "" &&
            //     signUpSelectStateText != "Select state" &&
            //     signUpSelectGenderText != "Select gender") {
            signUpEnteredDob = signUpDobYearInputField.value + "-" + signUpDobMonthInputField.value + "-" + signupDobDayInputField.value;

            if ( /*signUpNameInputField.value != "" && signUpDobInputField.value != "" && */ signUpPhoneInputField &&
                signUpEmailInputField != null && signUpPasswordInputField.value != "" &&
                signUpConfirmPasswordInputField.value != "" &&
                signUpSelectStateText != "Select state" &&
                signUpSelectGenderText != "Select gender") {

                //if (signUpDobInputField.value.match(dateFormat)) {
                //if ((this.IsDateValid(signUpDobInputField.value) == true)) {
                if (signUpEmailInputField.value.match(mailformat)) {
                    /*if (signUpPasswordInputField.value.match(passwordFormat)) {*/
                    if (signUpPasswordInputField.value == signUpConfirmPasswordInputField.value) {
                        this.AssignValueToVariableFromInputField();
                        API.Registration(signUpNameInputField.value, signUpEmailInputField.value, signUpPasswordInputField.value, /*dateOfBirth*/ signUpEnteredDob, signUpStateId, signUpPhoneInputField.value, signUpSelectGenderText.text);
                        // API.RegistrationRequest(signUpNameInputField.value, signUpEmailInputField.value, signUpPasswordInputField.value, /*dateOfBirth*/ signUpDobInputField.value, signUpStateId, signUpPhoneInputField.value, signUpSelectGenderText.text);
                    } else {
                        Alert.ShowAlert("Password does not match");
                    }
                    /*} 
                    else {
                        Alert.ShowAlert("Password should be minimum 8 characters included one alpha numeric,uppercase,and special character");
                    }*/
                } else {
                    Alert.ShowAlert("Please enter valid email address");
                }
                //} 
                // else {
                //     Alert.ShowAlert("Please enter correct DOB");
                // }
            }
            // else {
            //     Alert.ShowAlert("Please enter DOB in this format yyyy-mm-dd");
            // }
            // } 
            // else {
            //     Alert.ShowAlert("Please enter your valid credentials");
            // }
        },

        IsDateValid: function(_date) {
            var status;
            var y = _date.substr(0, 4);
            var m = _date.substr(5, 2);
            var d = _date.substr(8, 2);
            if (y == "0000" || y < 1800 || m == "00" || d == "00" || m > 12 || d > 31) {
                status = false;
            } else {
                status = true;
            }
            return status
        },

        AssignValueToVariableFromInputField: function() {
            signUpEnteredName = signUpNameInputField.value;
            signUpEnteredEmail = signUpEmailInputField.value;
            signUpEnteredPassword = signUpPasswordInputField.value;
            signUpEnteredDob = signUpDobYearInputField.value + "-" + signUpDobMonthInputField.value + "-" + signupDobDayInputField.value;
            // signUpEnteredDob = dateOfBirth;
            signUpEnteredStateId = signUpStateId;
            signUpEnteredGender = signUpSelectGenderText.text;
            signUpEnteredPhoneNumber = signUpPhoneInputField.value;
        },


        EnableDisableSignUpPageButtonInput: function(_status) {
            signUpOverlay.visible = _status;
        },

    } //End of SignUp.prototype