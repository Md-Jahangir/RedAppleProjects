import Phaser from "phaser";
import { Constant } from "../Constant.js";
import { SelectedResolution } from "../ResolutionSelector.js";
import { Utils } from "../Utils.js";
import Button from "../ui/Button.js";
import Text from "../ui/Text.js";
import { Server } from "../services/Server.js";
import AlertPopup from "../popup/AlertPopup.js";
import LoadingPopup from "../popup/LoadingPopup.js";

export default class ResetPasswordScene extends Phaser.Scene {

    constructor() {
        super("ResetPasswordScene");
        this.actualNewPassword = "";
        this.actualConfirmPassword = "";
        this.alertPopup = null;
        this.loadingPopup = null;
    }

    //#region - CREATE ALL ASSESTS
    create() {
        this.game.events.on("resize", this.resize, this);

        this.CreateBg();
        this.CreateTopBase();
        this.CreateResetPasswordHeading();
        this.CreateBackButton();
        this.resetPasswordContainer = this.add.container(0, 0);
        this.CreateNewPasswordSection();
        this.CreateConfirmPasswordSection();
        this.CreateOtpSection();
        this.CreateNewPasswordVisibleIcon();
        this.CreateConfirmPasswordVisibleIcon();
        this.CreateSubmitButton();

        this.loadingPopup = new LoadingPopup(this);
        this.alertPopup = new AlertPopup(this);

        this.resize(window.innerWidth, window.innerHeight);
    };

    //#region - CREATE BG
    CreateBg() {
        this.bg = this.add.image(0, 0, "background").setOrigin(0);
    };
    ResizeBg(newWidth, newHeight, newScale) {
        this.bg.setDisplaySize(newWidth, newHeight);
    };
    //#endregion
    //----------------------------------------------------------------

    //#region - TOP BASE
    CreateTopBase() {
        this.topBase = this.add.image(0, 0, "tob_base").setOrigin(0.5);
    };
    ResizeTopBase(newWidth, newHeight, newScale) {
        this.topBase.setScale(newScale);
        this.topBase.setPosition(newWidth / 2, this.topBase.displayHeight / 2);
        let currentHeight = this.topBase.displayHeight;
        this.topBase.setDisplaySize(newWidth, currentHeight);
    };
    //#endregion
    //----------------------------------------------------------------

    //#region - SIGN IN HEADING
    CreateResetPasswordHeading() {
        this.heading = this.add.image(0, 0, "reset_password_heading").setOrigin(0.5);
    };
    ResizeResetPasswordHeading(newWidth, newHeight, newScale) {
        this.heading.setScale(newScale);
        this.heading.setPosition(this.topBase.x, this.topBase.y);
    };
    //#endregion
    //----------------------------------------------------------------

    //#region - CREATE BACK BUTTON
    CreateBackButton() {
        this.backButton = new Button(this, Math.round(this.scale.width / 2), Math.round(this.scale.height / 2), "back_button");
        this.backButton.setClickCallback(this.OnBackButtonClicked, this);
    };
    ResizeBackButton(newWidth, newHeight, newScale) {
        this.backButton.setScale(newScale);
        this.backButton.setPosition(this.topBase.x - this.topBase.displayWidth / 2.4, this.topBase.y);
    };
    OnBackButtonClicked() {
        console.log("OnBackButtonClicked");
        this.scene.stop('ResetPasswordScene');
        this.scene.start("ForgotPasswordScene");
    };
    //#endregion
    //----------------------------------------------------------------

    //#region - RESIZE CONTAINER
    ResizeResetPasswordContainer(newWidth, newHeight, newScale) {
        this.resetPasswordContainer.setScale(newScale);
        this.resetPasswordContainer.setPosition(newWidth / 2, newHeight / 2);
    };
    //#endregion
    //----------------------------------------------------------------

    //#region - NEW PASSWORD INPUT FIELD
    CreateNewPasswordSection() {
        let isPlaceholder = true;

        this.newPasswordInputBase = this.add.image(0, -220, "input_text_base").setOrigin(0.5);
        this.newPasswordIcon = this.add.image(this.newPasswordInputBase.x - this.newPasswordInputBase.displayWidth / 2.2, this.newPasswordInputBase.y - this.newPasswordInputBase.displayHeight / 2 - 30, "password_icon").setOrigin(0.5);
        let newPasswordTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '28px', fill: '#fff', fontStyle: 'normal', align: 'left' };
        this.newPasswordText = this.add.text(this.newPasswordIcon.x + 25, this.newPasswordIcon.y, Constant.NEW_PASSWORD_TEXT, newPasswordTextStyle).setOrigin(0, 0.5);

        this.newPasswordInputText = this.add.rexBBCodeText(this.newPasswordInputBase.x - 25, this.newPasswordInputBase.y, Constant.NEW_PAASWORD_PLACE_HOLDER_TEXT, {
            fontFamily: 'BAHNSCHRIFT',
            color: 'grey',
            fontSize: '32px',
            fixedWidth: 610,
            fixedHeight: 65,
            // backgroundColor: '#ff00ff',
            valign: 'center',
            // rtl: true
        }).setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', function () {
                if (isPlaceholder) {
                    this.newPasswordInputText.text = '';
                    isPlaceholder = false;
                    this.newPasswordInputText.setColor('yellow');
                }
                let config = {
                    type: 'password',
                    onOpen: function (textObject) {
                    },
                    onTextChanged: (textObject, text) => {
                        this.actualNewPassword = text;
                        textObject.text = this.MarkPassword(this.actualNewPassword);
                    },
                    onClose: function (textObject) {
                        if (textObject.text == '') {
                            textObject.text = Constant.NEW_PAASWORD_PLACE_HOLDER_TEXT;
                            isPlaceholder = true;
                            textObject.setColor('grey');
                        }
                    },
                    selectAll: true,
                    enterClose: true
                }
                this.plugins.get('rextexteditplugin').edit(this.newPasswordInputText, config);
            }, this);

        this.resetPasswordContainer.add([this.newPasswordInputBase, this.newPasswordIcon, this.newPasswordText, this.newPasswordInputText]);
    };
    MarkPassword(password) {
        return new Array(password.length + 1).join('•');
    };
    CreateNewPasswordVisibleIcon() {
        this.newPasswordVisibleIcon = this.add.sprite(this.newPasswordInputBase.x + this.newPasswordInputBase.displayWidth / 2.3, this.newPasswordInputBase.y, "eye_icon").setOrigin(0.5);
        this.newPasswordVisibleIcon.setInteractive({ useHandCursor: true });
        this.newPasswordVisibleIcon.on('pointerdown', (pointer, x, y, event) => this.OnNewPasswordVisibleButtonPressed(this.newPasswordVisibleIcon), this);

        this.resetPasswordContainer.add(this.newPasswordVisibleIcon);
    };
    OnNewPasswordVisibleButtonPressed(_this) {
        if (_this.frame.name == 0) {
            _this.setFrame(1);
            this.newPasswordInputText.text = this.actualNewPassword;
        } else {
            _this.setFrame(0);
            this.newPasswordInputText.text = this.MarkPassword(this.actualNewPassword);
        }
    };
    //#endregion
    //----------------------------------------------------------------

    //#region - CONFIRM PASSWORD INPUT FIELD
    CreateConfirmPasswordSection() {
        let isPlaceholder = true;

        this.confirmPasswordInputBase = this.add.image(0, -55, "input_text_base").setOrigin(0.5);
        this.confirmPasswordIcon = this.add.image(this.confirmPasswordInputBase.x - this.confirmPasswordInputBase.displayWidth / 2.2, this.confirmPasswordInputBase.y - this.confirmPasswordInputBase.displayHeight / 2 - 30, "password_icon").setOrigin(0.5);
        let confirmPasswordTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '28px', fill: '#fff', fontStyle: 'normal', align: 'left' };
        this.confirmPasswordText = this.add.text(this.confirmPasswordIcon.x + 25, this.confirmPasswordIcon.y, Constant.CONFIRM_PASSWORD_TEXT, confirmPasswordTextStyle).setOrigin(0, 0.5);

        this.confirmPasswordInputText = this.add.rexBBCodeText(this.confirmPasswordInputBase.x - 25, this.confirmPasswordInputBase.y, Constant.CONFIRM_PAASWORD_PLACE_HOLDER_TEXT, {
            fontFamily: 'BAHNSCHRIFT',
            color: 'grey',
            fontSize: '32px',
            fixedWidth: 610,
            fixedHeight: 65,
            // backgroundColor: '#ff00ff',
            valign: 'center',
            // rtl: true
        }).setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', function () {
                if (isPlaceholder) {
                    this.confirmPasswordInputText.text = '';
                    isPlaceholder = false;
                    this.confirmPasswordInputText.setColor('yellow');
                }
                let config = {
                    type: 'password',
                    onOpen: function (textObject) {
                    },
                    onTextChanged: (textObject, text) => {
                        this.actualConfirmPassword = text;
                        textObject.text = this.MarkPassword(this.actualConfirmPassword);
                    },
                    onClose: function (textObject) {
                        if (textObject.text == '') {
                            textObject.text = Constant.CONFIRM_PAASWORD_PLACE_HOLDER_TEXT;
                            isPlaceholder = true;
                            textObject.setColor('grey');
                        }
                    },
                    selectAll: true,
                    enterClose: true
                }
                this.plugins.get('rextexteditplugin').edit(this.confirmPasswordInputText, config);
            }, this);

        this.resetPasswordContainer.add([this.confirmPasswordInputBase, this.confirmPasswordIcon, this.confirmPasswordText, this.confirmPasswordInputText]);
    };
    CreateConfirmPasswordVisibleIcon() {
        this.confirmPasswordVisibleIcon = this.add.sprite(this.confirmPasswordInputBase.x + this.confirmPasswordInputBase.displayWidth / 2.3, this.confirmPasswordInputBase.y, "eye_icon").setOrigin(0.5);
        this.confirmPasswordVisibleIcon.setInteractive({ useHandCursor: true });
        this.confirmPasswordVisibleIcon.on('pointerdown', (pointer, x, y, event) => this.OnConfirmPasswordVisibleButtonPressed(this.confirmPasswordVisibleIcon), this);

        this.resetPasswordContainer.add(this.confirmPasswordVisibleIcon);
    };
    OnConfirmPasswordVisibleButtonPressed(_this) {
        if (_this.frame.name == 0) {
            _this.setFrame(1);
            this.confirmPasswordInputText.text = this.actualConfirmPassword;
        } else {
            _this.setFrame(0);
            this.confirmPasswordInputText.text = this.MarkPassword(this.actualConfirmPassword);
        }
    };
    //#endregion
    //----------------------------------------------------------------

    //#region - OTP INPUT FIELD
    CreateOtpSection() {
        let isPlaceholder = true;
        this.otpInputBase = this.add.image(0, 110, "input_text_base").setOrigin(0.5);
        this.otpIcon = this.add.image(this.otpInputBase.x - this.otpInputBase.displayWidth / 2.2, this.otpInputBase.y - this.otpInputBase.displayHeight / 2 - 25, "mobile_icon").setOrigin(0.5);
        let otpTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '28px', fill: '#fff', fontStyle: 'normal', align: 'left' };
        this.otpText = this.add.text(this.otpIcon.x + 25, this.otpIcon.y, Constant.OTP_TEXT, otpTextStyle).setOrigin(0, 0.5);

        this.otpInputText = this.add.rexBBCodeText(this.otpInputBase.x, this.otpInputBase.y, Constant.OTP_PLACE_HOLDER_TEXT, {
            fontFamily: 'BAHNSCHRIFT',
            color: 'grey',
            fontSize: '32px',
            fixedWidth: 660,
            fixedHeight: 65,
            // backgroundColor: '#ff00ff',
            valign: 'center',
        }).setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', function () {
                if (isPlaceholder) {
                    this.otpInputText.text = '';
                    isPlaceholder = false;
                    this.otpInputText.setColor('yellow');
                }
                let config = {
                    onOpen: function (textObject) {
                    },
                    onTextChanged: function (textObject, text) {
                        textObject.text = text;
                    },
                    onClose: function (textObject) {
                        if (textObject.text == '') {
                            textObject.text = Constant.OTP_PLACE_HOLDER_TEXT;
                            isPlaceholder = true;
                            textObject.setColor('grey');
                        }
                    },
                    selectAll: true,
                }
                this.plugins.get('rextexteditplugin').edit(this.otpInputText, config);
            }, this);

        this.resetPasswordContainer.add([this.otpInputBase, this.otpIcon, this.otpText, this.otpInputText]);
    };
    //#endregion
    //----------------------------------------------------------------

    //#region - SIGN IN BUTTON
    CreateSubmitButton() {
        this.submitButton = new Button(this, Math.round(this.scale.width / 2), Math.round(this.scale.height / 2), "sign_in_out_button");
        this.submitButton.setClickCallback(this.OnSubmitButtonClicked, this);

        this.submitButtonText = new Text(this, this.submitButton.x, this.submitButton.y, {
            text: Constant.SUBMIT_TEXT,
            fontFamily: "BAHNSCHRIFT",
            fontSize: "46px",
            fontStyle: "bold",
            color: "#ffffff",
            align: "center",
            wordWrap: {},
            shadow: {},
        }
        );
    };
    async OnSubmitButtonClicked() {
        this.submitButtonText.TextScaleTween();
        this.loadingPopup.ShowLoadingPopup();

        if (!Utils.IsEmpty(this.actualNewPassword)) {
            if (!Utils.IsEmpty(this.actualConfirmPassword)) {
                if (!Utils.IsEmpty(this.otpInputText.text) && this.otpInputText.text != Constant.OTP_PLACE_HOLDER_TEXT) {
                    if (this.actualNewPassword === this.actualConfirmPassword) {
                        console.log("noe sumbb");
                        try {
                            let response = await Server.ResetPasswordApi(this.actualNewPassword, this.otpInputText.text);
                            console.log("reset password response: ", response);
                            if (!response.err) {
                                this.loadingPopup.HideLoadingPopup();
                                this.scene.stop('ResetPasswordScene');
                                this.scene.start("SignInScene");
                            } else {
                                console.log(response.message);
                                this.loadingPopup.HideLoadingPopup();
                                this.alertPopup.ShowAlertPopup(response.message);
                            }
                        } catch (err) {
                            this.loadingPopup.HideLoadingPopup();
                            this.alertPopup.ShowAlertPopup(err.message);
                        }
                    } else {
                        console.log("Password not Match");
                        this.loadingPopup.HideLoadingPopup();
                        this.alertPopup.ShowAlertPopup(Constant.PASSWORD_NOT_MATCH_TEXT);
                    }
                } else {
                    console.log("OTP missing");
                    this.loadingPopup.HideLoadingPopup();
                    this.alertPopup.ShowAlertPopup(Constant.OTP_MISSING_TEXT);
                }
            } else {
                console.log("Confirm password missing");
                this.loadingPopup.HideLoadingPopup();
                this.alertPopup.ShowAlertPopup(Constant.CONFIRM_PASSWORD_MISSING_TEXT);
            }
        } else {
            console.log("New password missing");
            this.loadingPopup.HideLoadingPopup();
            this.alertPopup.ShowAlertPopup(Constant.NEW_PASSWORD_MISSING_TEXT);
        }
    };
    ResizeSubmitButton(newWidth, newHeight, newScale) {
        this.submitButton.setScale(newScale);
        this.submitButton.setPosition(newWidth / 2, newHeight / 2 + 340 * newScale);

        this.submitButtonText.setScale(newScale);
        this.submitButtonText.setPosition(this.submitButton.x, this.submitButton.y);
    };
    //#endregion
    //----------------------------------------------------------------


    //#region - RESIZE ALL
    resize(newWidth, newHeight) {
        let newScale = Utils.getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);

        this.ResizeBg(newWidth, newHeight, newScale);
        this.ResizeTopBase(newWidth, newHeight, newScale);
        this.ResizeResetPasswordHeading(newWidth, newHeight, newScale);
        this.ResizeBackButton(newWidth, newHeight, newScale);
        this.ResizeSubmitButton(newWidth, newHeight, newScale);
        this.ResizeResetPasswordContainer(newWidth, newHeight, newScale);
        this.loadingPopup.resize(newWidth, newHeight, newScale);
        this.alertPopup.resize(newWidth, newHeight, newScale);
    };
    //#endregion
    //----------------------------------------------------------------

}