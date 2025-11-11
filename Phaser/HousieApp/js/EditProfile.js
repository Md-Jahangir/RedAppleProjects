var editProfileProfilePic;
var editProfileEditButton;
var saveChangesButton;
var editProfileRightSign;
var editProfileTermConditionCheckBox;
var editProfileTermConditionText;
var editProfilePrivacyText;
var editProfileStateBg;
var editProfileBackButton;
var editProfileOverlay;
var editProfileCheckBoxToggleValue = 0;
var editProfileGenderPanelGroup;
var editProfileStatePopupGroup;
var editProfileScrollGroup;
var editProfileStateArray = [];
var editProfileIsMouseDown = false;
var editProfileIsStartPos = 0;
var editProfileStateButtonToggle = false;
var editProfileGanderButtonToggle = false;
var editProfileObjectToSelect;
var editProfileObjectIdToSelect;
var editProfileSelectedStateId;
var editProfileEmailInputField;
var editProfileNameInputField;
var editProfilePhoneInputField;
var editProfileGenderJson;


var EditProfile = function() {};
EditProfile.prototype = {
        init: function() {
            Utils.ScaleManager();
        },
        preload: function() {
            game.stage.disableVisibilityChange = true;
            game.time.advancedTiming = true;
        },
        create: function() {
            editProfileGenderJson = game.cache.getJSON('gender_json');

            this.CreateEditProfilePage();
            API.ProfileDetails(localStorage.getItem("access_token"));

        },

        SetValueFromServer: function(_playerName, _phoneNumber, _email, _stateId, _gender, _profilePic) {
            game.load.image('profileImageName', _profilePic);
            game.load.start();
            var givingStateName = this.ReturnStateName(_stateId);
            setTimeout(() => {
                /*if (editProfileNameInputField != null && editProfilePhoneInputField != null && editProfileEmailInputField != null && selectStateText != null && selectGenderText != null && editProfileProfilePic != null) {
                 */
                LoadingPopup.HideLoadingPopup();
                editProfileNameInputField.placeHolder.setText(_playerName);
                editProfilePhoneInputField.placeHolder.setText(_phoneNumber);
                editProfileEmailInputField.placeHolder.setText(_email);
                editProfileSelectedStateId = _stateId;
                selectStateText.setText(givingStateName);
                selectGenderText.setText(_gender);
                //editProfileProfilePic.loadTexture('profileImageName');
                /*} else {
                    LoadingPopup.HideLoadingPopup();
                }*/
            }, 1000);
        },

        ReturnStateName: function(_stateId) {
            for (var i = 0; i < stateList.length; i++) {
                if (stateList[i]._id == _stateId) {
                    var givingStateName = stateList[i].name;
                } else {}
            }
            return givingStateName;
        },

        update: function() {
            editProfileNameInputField.update();
            editProfilePhoneInputField.update();
            editProfileEmailInputField.update();
        },


        CreateEditProfilePage: function() {
            var editProfileBg = Utils.SpriteSettingsControl(editProfileBg, game.world.centerX, game.world.centerY, 'login_signup_bg', "true", "true", 0.5, 0.5, 1, 1, "false");

            Utils.CreateHeadingText("EDIT YOUR PROFILE");

            //this.CreateProfilePicture();
            this.CreateNameTextInputField();
            this.CreatePhoneNumberTextField();
            this.CreateEmailTextInputField();
            this.CreateStateField();
            this.CreateGenderField();

            editProfileTermConditionCheckBox = Utils.ButtonSettingsControl(editProfileTermConditionCheckBox, game.world.centerX - Math.round(game.width / 3), game.world.centerY + Math.round(game.height / 4.4), 'select_box', this.EditProfileTermConditionCheckBoxPressed, null, null, this.EditProfileTermConditionCheckBoxReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            editProfileRightSign = Utils.SpriteSettingsControl(editProfileRightSign, 0, 0, 'right_sign', "true", "true", 0.5, 0.5, 1, 1, "false");
            editProfileRightSign.visible = false;
            editProfileTermConditionCheckBox.addChild(editProfileRightSign);

            this.CreateAgreeAndTermConditionText(editProfileTermConditionCheckBox);
            this.CreateSaveChangesButton();

            editProfileBackButton = Utils.ButtonSettingsControl(editProfileBackButton, game.world.centerX, game.world.centerY + Math.round(game.height / 2.16), 'back_button', this.EditProfileBackButtonPressed, null, null, this.EditProfileBackButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);

            this.CreateStatePanel();

            //Create overlay For off the input of all button when click on button
            editProfileOverlay = Utils.ButtonSettingsControl(editProfileOverlay, game.world.centerX, game.world.centerY, 'transparent_image', this.EditProfileOverlayPressed, null, null, null, "true", "true", 0.5, 0.5, 2000, 2000, this);
            editProfileOverlay.alpha = 0.001;
            editProfileOverlay.visible = false;
        },

        CreateProfilePicture: function() {
            var profileMask = game.add.graphics(0, 0);
            profileMask.beginFill(0x000000);
            profileMask.drawCircle(game.world.centerX, game.world.centerY - Math.round(game.height / 3.55), game.height / 7);
            editProfileProfilePic = Utils.SpriteSettingsControl(editProfileProfilePic, game.world.centerX, game.world.centerY - Math.round(game.height / 3.55), 'profile_pic', "true", "true", 0.5, 0.5, 1, 1, "false");
            var profilePicBase = Utils.SpriteSettingsControl(profilePicBase, game.world.centerX, game.world.centerY - Math.round(game.height / 3.55), 'profile_base', "true", "true", 0.5, 0.5, 1, 1, "false");
            editProfileProfilePic.mask = profileMask;
            editProfileEditButton = Utils.ButtonSettingsControl(editProfileEditButton, 140, -50, 'edit_button', this.EditProfileEditButtonPressed, null, null, this.EditProfileEditButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            profilePicBase.addChild(editProfileEditButton);
        },

        CreateNameTextInputField: function() {
            var editProfileNameTextFieldBg = Utils.SpriteSettingsControl(editProfileNameTextFieldBg, game.world.centerX, game.world.centerY - Math.round(game.height / 6.28), 'text_box', "true", "true", 0.5, 0.5, 1, 1, "false");
            var nameTextstyle = { font: '38px Lato-Regular', fill: '#5aefe2', fontWeight: 'normal', align: 'center' };
            var nameText = game.add.text(-400, -85, "Name", nameTextstyle);
            editProfileNameInputField = game.add.inputField(-400, -35, {
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
            });
            editProfileNameTextFieldBg.addChild(editProfileNameInputField);
            editProfileNameTextFieldBg.addChild(nameText);
        },

        CreatePhoneNumberTextField: function() {
            var editProfilePhoneTextFieldBg = Utils.SpriteSettingsControl(editProfilePhoneTextFieldBg, game.world.centerX, game.world.centerY - Math.round(game.height / 11.2), 'text_box', "true", "true", 0.5, 0.5, 1, 1, "false");
            var phoneTextstyle = { font: '38px Lato-Regular', fill: '#5aefe2', fontWeight: 'normal', align: 'center' };
            var phoneText = game.add.text(-400, -85, "Phone no.", phoneTextstyle);
            editProfilePhoneInputField = game.add.inputField(-400, -35, {
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
                placeHolder: 'Enter phone no.',
                zoom: false,
                cursorColor: '#5aefe2',
                min: 0,
                type: PhaserInput.InputType.number
            });
            editProfilePhoneTextFieldBg.addChild(editProfilePhoneInputField);
            editProfilePhoneTextFieldBg.addChild(phoneText);
        },

        CreateEmailTextInputField: function() {
            var editProfileEmailTextFieldBg = Utils.SpriteSettingsControl(editProfileEmailTextFieldBg, game.world.centerX, game.world.centerY - Math.round(game.height / 50), 'text_box', "true", "true", 0.5, 0.5, 1, 1, "false");
            var emailTextstyle = { font: '38px Lato-Regular', fill: '#5aefe2', fontWeight: 'normal', align: 'center' };
            var emailText = game.add.text(-400, -85, "Email", emailTextstyle);
            editProfileEmailInputField = game.add.inputField(-400, -35, {
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
                placeHolder: 'Enter email',
                zoom: false,
                cursorColor: '#5aefe2',
                max: 50,
            });
            editProfileEmailInputField.inputEnabled = false;
            editProfileEmailTextFieldBg.addChild(editProfileEmailInputField);
            editProfileEmailTextFieldBg.addChild(emailText);
        },

        CreateStateField: function() {
            editProfileStateBg = Utils.ButtonSettingsControl(editProfileStateBg, game.world.centerX - Math.round(game.width / 5.15), game.world.centerY + Math.round(game.height / 19), 'text_box_small', this.EditProfileStateBgButtonPressed, null, null, this.EditProfileStateBgButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            var stateTextstyle = { font: '38px Lato-Regular', fill: '#5aefe2', fontWeight: 'normal', align: 'center', wordWrap: false, wordWrapWidth: 800 };
            var stateText = game.add.text(-186, -85, "State", stateTextstyle);
            editProfileStateBg.addChild(stateText);
            var selectStateTextstyle = { font: '40px Lato-Regular', fill: '#427a7b', fontWeight: 'normal', align: 'center', wordWrap: false, wordWrapWidth: 800 };
            selectStateText = game.add.text(-184, -27, "Select state", selectStateTextstyle);
            editProfileStateBg.addChild(selectStateText);
            var editProfileStateArrowButton = Utils.SpriteSettingsControl(editProfileStateArrowButton, 170, 3, 'arrow', "true", "true", 0.5, 0.5, 1, 1, "false");
            editProfileStateBg.addChild(editProfileStateArrowButton);
        },

        CreateGenderField: function() {
            var editProfileGenderBg = Utils.ButtonSettingsControl(editProfileGenderBg, game.world.centerX + Math.round(game.width / 5.15), game.world.centerY + Math.round(game.height / 19), 'text_box_small', this.EditProfileGenderBgButtonPressed, null, null, this.EditProfileGenderBgButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            var genderTextstyle = { font: '38px Lato-Regular', fill: '#5aefe2', fontWeight: 'normal', align: 'center', wordWrap: false, wordWrapWidth: 800 };
            var genderText = game.add.text(-186, -85, "Gender", genderTextstyle);
            editProfileGenderBg.addChild(genderText);
            var selectGenderTextstyle = { font: '40px Lato-Regular', fill: '#427a7b', fontWeight: 'normal', align: 'center', wordWrap: false, wordWrapWidth: 800 };
            selectGenderText = game.add.text(-184, -27, "Select gender", selectGenderTextstyle);
            editProfileGenderBg.addChild(selectGenderText);
            var genderArrowButton = Utils.SpriteSettingsControl(genderArrowButton, 170, 3, 'arrow', "true", "true", 0.5, 0.5, 1, 1, "false");
            editProfileGenderBg.addChild(genderArrowButton);
        },

        CreateAgreeAndTermConditionText: function(_editProfileTermConditionCheckBox) {
            var agreeTextStyle = { font: '40px Lato-Regular', fill: '#5aefe2', align: 'center' };
            var agreeText = game.add.text(165, 2, "I agree to the", agreeTextStyle);
            agreeText.anchor.setTo(0.5);
            editProfileTermConditionCheckBox.addChild(agreeText);

            var termConditionTextStyle = { font: '40px Lato-Regular', fill: '#fff001', align: 'center' };
            editProfileTermConditionText = game.add.text(320, 3, "Terms and conditions", termConditionTextStyle);
            editProfileTermConditionText.anchor.setTo(0.5);
            editProfileTermConditionText.inputEnabled = true;
            editProfileTermConditionText.events.onInputDown.add(this.EditProfileTermConditionPressed, this);
            editProfileTermConditionText.events.onInputUp.add(this.EditProfileTermConditionReleased, this);
            agreeText.addChild(editProfileTermConditionText);

            var andTextStyle = { font: '40px Lato-Regular', fill: '#5aefe2', align: 'center' };
            var andText = game.add.text(-71, 50, "and", andTextStyle);
            andText.anchor.setTo(0.5);
            agreeText.addChild(andText);

            this.CreatePrivacyText(agreeText);
        },

        CreatePrivacyText: function(_agreeText) {
            var privacyTextStyle = { font: '40px Lato-Regular', fill: '#fff001', align: 'center' };
            editProfilePrivacyText = game.add.text(95, 50, "Privacy policy", privacyTextStyle);
            editProfilePrivacyText.anchor.setTo(0.5);
            editProfilePrivacyText.inputEnabled = true;
            editProfilePrivacyText.events.onInputDown.add(this.EditProfilePrivacyTextPressed, this);
            editProfilePrivacyText.events.onInputUp.add(this.EditProfilePrivacyTextReleased, this);
            _agreeText.addChild(editProfilePrivacyText);
        },

        CreateSaveChangesButton: function() {
            saveChangesButton = Utils.ButtonSettingsControl(saveChangesButton, game.world.centerX, game.world.centerY + Math.round(game.height / 3.06), 'button_base', this.SaveChangesButtonPressed, null, null, this.SaveChangesButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            var saveChangesTextstyle = { font: '38px Lato-Heavy', fill: '#361300', fontWeight: 'normal', align: 'center' };
            var saveChangesButtonText = game.add.text(0, -5, "SAVE CHANGES", saveChangesTextstyle);
            saveChangesButtonText.anchor.setTo(0.5);
            saveChangesButton.addChild(saveChangesButtonText);
            saveChangesButton.inputEnabled = false;
            saveChangesButton.alpha = 0.5;
        },

        CreateStatePanel: function() {
            editProfileStatePopupGroup = game.add.group();
            editProfileScrollGroup = game.add.group();

            var EPStateMask = game.add.graphics(0, 0);
            EPStateMask.beginFill(0xFF3300);
            EPStateMask.drawRect(Math.round(game.width / 8.6), Math.round(game.height / 1.76), Math.round(game.width / 2.63), Math.round(game.width / 4));
            editProfileScrollGroup.mask = EPStateMask;

            this.CreateStatePanelDownFalseImage();
            this.CreateStatePanelUpFalseImage();

            this.CreateStateName(stateList);

            editProfileStatePopupGroup.add(EPStateMask);
            editProfileStatePopupGroup.add(editProfileScrollGroup);


            editProfileStatePopupGroup.visible = false;

            game.world.bringToTop(editProfileStateBg);
            game.world.bringToTop(editProfileTermConditionCheckBox);

            this.CreateStateScroller();
        },

        CreateStatePanelUpFalseImage: function() {
            var upFalseImage = game.add.sprite(Math.round(game.width / 8.6), 0, /*"transparent_image"*/ "one_pixel");
            upFalseImage.tint = "0x000000";
            upFalseImage.alpha = 0.001;
            upFalseImage.scale.set(Math.round(game.width / 2.63), Math.round(game.height / 1.76));
            upFalseImage.inputEnabled = true;
            upFalseImage.events.onInputDown.add(this.FasleImagePressed, this);
            editProfileStatePopupGroup.add(upFalseImage);
        },
        CreateStatePanelDownFalseImage: function() {
            var downFalseImage = game.add.sprite(Math.round(game.width / 8.6), Math.round(game.height / 1.407), "one_pixel");
            downFalseImage.tint = "0x000000";
            downFalseImage.alpha = 0.001;
            downFalseImage.scale.set(Math.round(game.width / 2.63), Math.round(game.height / 2.18));
            downFalseImage.inputEnabled = true;
            downFalseImage.events.onInputDown.add(this.FasleImagePressed, this);
            editProfileStatePopupGroup.add(downFalseImage);
        },

        FasleImagePressed: function() {},

        CreateStateName: function(_item) {
            editProfileStateArray = [];
            var stateStyle = { font: '42px Lato-Regular', fill: '#427a7b', align: 'left' };
            for (var i = 0; i < _item.length; i++) {
                var xPos = game.world.centerX - Math.round(game.width / 5.17);
                var yPos = game.world.centerY + Math.round(game.height / 11.5) + (i * 60);
                var bg = Utils.ButtonSettingsControl(editProfileOverlay, xPos, yPos, 'panel_box', this.StateNamePressed, null, null, this.StateNameReleased, "true", "true", 0.5, 0.5, 1, 1, this);
                bg.name = _item[i].name;
                bg.index = _item[i]._id;
                var stateText = game.add.text(-182, 0, _item[i].name, stateStyle);
                stateText.anchor.setTo(0, 0.5);
                bg.addChild(stateText);
                editProfileStateArray.push(bg);
                editProfileScrollGroup.add(editProfileStateArray[i]);
            }
        },

        ShowStatePannel: function() {
            editProfileStatePopupGroup.visible = true;
        },
        HideStatePannel: function() {
            if (editProfileStatePopupGroup != null) {
                editProfileStatePopupGroup.visible = false;
            } else {}
        },

        StateNamePressed: function(_this) {
            editProfileIsMouseDown = true;
            editProfileIsStartPos = game.input.y;
            editProfileObjectToSelect = _this.name;
            editProfileObjectIdToSelect = _this.index;
        },
        StateNameReleased: function() {
            editProfileIsMouseDown = false;
            if (editProfileObjectToSelect != null && editProfileObjectIdToSelect != null) {
                selectStateText.setText(editProfileObjectToSelect);
                selectStateText.fill = '#5aefe2';
                editProfileSelectedStateId = editProfileObjectIdToSelect;
                this.HideStatePannel();
                editProfileStateButtonToggle = false;
            } else {}
        },

        CreateStateScroller: function() {
            var scrollingLimit = Math.ceil(editProfileScrollGroup.children[0].height.toFixed(2) * 4);
            scrollingLimit = Math.ceil(Math.ceil(editProfileScrollGroup.height) - scrollingLimit);
            game.input.addMoveCallback(function(pointer, x, y) {
                if (editProfileIsMouseDown) {
                    if (pointer.y > editProfileIsStartPos) {
                        editProfileObjectToSelect = null;
                        editProfileObjectIdToSelect = null;
                        if (editProfileScrollGroup.y < 0) {
                            editProfileScrollGroup.y += (pointer.y - editProfileIsStartPos);
                            editProfileIsStartPos = pointer.y;
                        } else {}
                    } else {}
                    if (pointer.y < editProfileIsStartPos) {
                        editProfileObjectToSelect = null;
                        editProfileObjectIdToSelect = null;
                        if (editProfileScrollGroup.y > -scrollingLimit) {
                            editProfileScrollGroup.y -= (editProfileIsStartPos - pointer.y);
                            editProfileIsStartPos = pointer.y;
                        } else {}
                    } else {}
                } else {}
            });
        },

        ShowGenderPanel: function(_item) {
            editProfileGenderPanelGroup = game.add.group();
            var genderStyle = { font: '42px Lato-Regular', fill: '#427a7b', align: 'left' };
            for (var i = 0; i < _item.length; i++) {
                var xPos = game.world.centerX + game.width / 5.17;
                var yPos = game.world.centerY + game.height / 11.5 + (i * 60);
                var bg = Utils.ButtonSettingsControl(editProfileOverlay, xPos, yPos, 'panel_box', this.GenderNamePressed, null, null, this.GenderNameReleased, "true", "true", 0.5, 0.5, 1, 1, this);
                bg.name = _item[i].type;
                var genderText = game.add.text(-180, 0, _item[i].type, genderStyle);
                genderText.anchor.setTo(0, 0.5);
                bg.addChild(genderText);
                editProfileGenderPanelGroup.add(bg);
            }
        },

        HideGenderPanel: function() {
            if (editProfileGenderPanelGroup != null) {
                editProfileGenderPanelGroup.visible = false;
            } else {}
        },

        GenderNamePressed: function(_this) {
            selectGenderText.setText(_this.name);
            selectGenderText.fill = '#5aefe2';
            this.HideGenderPanel();
            editProfileGanderButtonToggle = false;
        },
        GenderButtonReleased: function() {},

        EditProfileEditButtonPressed: function() {
            Utils.ButtonScaleAnimation(editProfileEditButton, editProfileEditButton.scale.x - 0.02, editProfileOverlay);
            this.EnableDisableEditProfilePageButtonInput(true);
            SoundManager.PlayButtonClickTypeOneSound();
        },
        EditProfileEditButtonReleased: function() {},

        EditProfileStateBgButtonPressed: function() {
            editProfileStateButtonToggle = !editProfileStateButtonToggle;
            SoundManager.PlayButtonClickTypeOneSound();
        },
        EditProfileStateBgButtonReleased: function() {
            if (editProfileStateButtonToggle) {
                this.ShowStatePannel();
            } else {
                this.HideStatePannel();
            }
        },

        EditProfileGenderBgButtonPressed: function() {
            editProfileGanderButtonToggle = !editProfileGanderButtonToggle;
            SoundManager.PlayButtonClickTypeOneSound();
        },
        EditProfileGenderBgButtonReleased: function() {
            if (editProfileGanderButtonToggle) {
                this.ShowGenderPanel(editProfileGenderJson);
            } else {
                this.HideGenderPanel();
            }
        },

        ToggleEditProfileCheckBox: function() {
            if (editProfileCheckBoxToggleValue == 0) {
                editProfileRightSign.visible = true;
                editProfileCheckBoxToggleValue = 1;
                saveChangesButton.inputEnabled = true;
                saveChangesButton.alpha = 1;
            } else {
                editProfileRightSign.visible = false;
                editProfileCheckBoxToggleValue = 0;
                saveChangesButton.inputEnabled = false;
                saveChangesButton.alpha = 0.5;
            }
        },

        EditProfileTermConditionCheckBoxPressed: function() {
            this.ToggleEditProfileCheckBox();
            SoundManager.PlayButtonClickTypeTwoSound();
        },

        EditProfileTermConditionPressed: function() {
            Utils.ButtonScaleAnimation(editProfileTermConditionText, editProfileTermConditionText.scale.x - 0.02, editProfileOverlay);
            this.EnableDisableEditProfilePageButtonInput(true);
            SoundManager.PlayButtonClickTypeTwoSound();
        },
        EditProfileTermConditionReleased: function() {
            Utils.TransitToTermsAndCondition();
        },

        EditProfilePrivacyTextPressed: function() {
            Utils.ButtonScaleAnimation(editProfilePrivacyText, editProfilePrivacyText.scale.x - 0.02, editProfileOverlay);
            this.EnableDisableEditProfilePageButtonInput(true);
            SoundManager.PlayButtonClickTypeTwoSound();
        },
        EditProfilePrivacyTextReleased: function() {
            Utils.TransitToPrivacyPolicy();
        },

        SaveChangesButtonPressed: function() {
            Utils.ButtonScaleAnimation(saveChangesButton, saveChangesButton.scale.x - 0.02, editProfileOverlay);
            this.EnableDisableEditProfilePageButtonInput(true);
            SoundManager.PlayButtonClickTypeOneSound();
        },
        SaveChangesButtonReleased: function() {
            var enteredImage = '';
            var enteredName = editProfileNameInputField.value;
            var enteredPhoneNumber = editProfilePhoneInputField.value;
            var enteredStateId = editProfileSelectedStateId;
            var enteredGender = selectGenderText.text;
            API.UpdateProfile(localStorage.getItem("access_token"), enteredName, enteredPhoneNumber, enteredGender, enteredStateId, enteredImage);
        },

        EditProfileBackButtonPressed: function() {
            Utils.ButtonScaleAnimation(editProfileBackButton, editProfileBackButton.scale.x - 0.02, editProfileOverlay);
            this.EnableDisableEditProfilePageButtonInput(true);
            SoundManager.PlayButtonClickTypeOneSound();
        },
        EditProfileBackButtonReleased: function() {
            StateTransition.TransitToProfilePage();
            editProfileStatePopupGroup.destroy();
            editProfileScrollGroup.destroy();
        },

        EnableDisableEditProfilePageButtonInput: function(_status) {
            editProfileOverlay.visible = _status;
        },

    } //End of EditProfile.prototype