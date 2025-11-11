import Phaser from "phaser";
import { Constant } from "../Constant.js";
import { SelectedResolution } from "../ResolutionSelector.js";
import { Utils } from "../Utils.js";
import Button from "../ui/Button.js";
import Text from "../ui/Text.js";
import { Server } from "../services/Server.js";
import AlertPopup from "../popup/AlertPopup.js";
import LoadingPopup from "../popup/LoadingPopup.js";

export default class SignUpScene extends Phaser.Scene {

    constructor() {
        super("SignUpScene");
        this.alertPopup = null;
        this.loadingPopup = null;
    }

    //#region - CREATE ALL ASSESTS
    create() {
        this.game.events.on("resize", this.resize, this);

        this.CreateBg();
        this.CreateTopBase();
        this.CreateSignUpHeading();
        this.CreateBackButton();
        this.signUpContainer = this.add.container(0, 0);
        this.CreateUserNameSection();
        this.CreateEmailSection();
        this.CreateMobileNumberSection();
        this.CreatePasswordSection();
        this.CreatePasswordVisibleIcon();
        this.CreateSignUpButton();
        this.CreateAlreadyHaveAccountText();
        this.loadingPopup = new LoadingPopup(this);
        this.alertPopup = new AlertPopup(this);

        this.resize(window.innerWidth, window.innerHeight);
    };
    //#endregion
    //----------------------------------------------------------------

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

    //#region - SIGN UP HEADING
    CreateSignUpHeading() {
        this.heading = this.add.image(0, 0, "sign_up_heading").setOrigin(0.5);

    };
    ResizeSignUpHeading(newWidth, newHeight, newScale) {
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
        this.scene.stop('SignUpScene');
        this.scene.start("SignInScene");
    };
    //#endregion
    //----------------------------------------------------------------

    //#region - RESIZE CONTAINER
    ResizeSignUpContainer(newWidth, newHeight, newScale) {
        this.signUpContainer.setScale(newScale);
        this.signUpContainer.setPosition(newWidth / 2, newHeight / 2);
    };
    //#endregion
    //----------------------------------------------------------------

    //#region - NAME INPUT FIELD
    CreateUserNameSection() {
        let isPlaceholder = true;
        this.userNameInputBase = this.add.image(0, -280, "input_text_base").setOrigin(0.5);
        this.userIcon = this.add.image(this.userNameInputBase.x - this.userNameInputBase.displayWidth / 2.2, this.userNameInputBase.y - this.userNameInputBase.displayHeight / 2 - 25, "person_icon").setOrigin(0.5);
        let userNameTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '28px', fill: '#fff', fontStyle: 'normal', align: 'left' };
        this.userNameText = this.add.text(this.userIcon.x + 25, this.userIcon.y, Constant.USER_NAME_TEXT, userNameTextStyle).setOrigin(0, 0.5);

        this.userNameInputText = this.add.rexBBCodeText(this.userNameInputBase.x, this.userNameInputBase.y, Constant.USER_NAME_PLACE_HOLDER_TEXT, {
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
                    this.userNameInputText.text = '';
                    isPlaceholder = false;
                    this.userNameInputText.setColor('yellow');
                }
                let config = {
                    onOpen: function (textObject) {
                    },
                    onTextChanged: function (textObject, text) {
                        textObject.text = text;
                    },
                    onClose: function (textObject) {
                        if (textObject.text == '') {
                            textObject.text = Constant.USER_NAME_PLACE_HOLDER_TEXT;
                            isPlaceholder = true;
                            textObject.setColor('grey');
                        }
                    },
                    selectAll: true,
                }
                this.plugins.get('rextexteditplugin').edit(this.userNameInputText, config);
            }, this);

        this.signUpContainer.add([this.userNameInputBase, this.userIcon, this.userNameText, this.userNameInputText]);
    };
    //#endregion
    //----------------------------------------------------------------

    //#region - EMAIL INPUT FIELD
    CreateEmailSection() {
        let isPlaceholder = true;
        this.emailInputBase = this.add.image(0, -120, "input_text_base").setOrigin(0.5);
        this.emailIcon = this.add.image(this.emailInputBase.x - this.emailInputBase.displayWidth / 2.2, this.emailInputBase.y - this.emailInputBase.displayHeight / 2 - 25, "email_icon").setOrigin(0.5);
        let emailIdTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '28px', fill: '#fff', fontStyle: 'normal', align: 'left' };
        this.emailIdText = this.add.text(this.emailIcon.x + 25, this.emailIcon.y, Constant.EMAIL_ID_TEXT, emailIdTextStyle).setOrigin(0, 0.5);

        this.emailInputText = this.add.rexBBCodeText(this.emailInputBase.x, this.emailInputBase.y, Constant.EMAIL_PLACE_HOLDER_TEXT, {
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
                    this.emailInputText.text = '';
                    isPlaceholder = false;
                    this.emailInputText.setColor('yellow');
                }
                let config = {
                    onOpen: function (textObject) {
                    },
                    onTextChanged: function (textObject, text) {
                        textObject.text = text;
                    },
                    onClose: function (textObject) {
                        if (textObject.text == '') {
                            textObject.text = Constant.EMAIL_PLACE_HOLDER_TEXT;
                            isPlaceholder = true;
                            textObject.setColor('grey');
                        }
                    },
                    selectAll: true,
                }
                this.plugins.get('rextexteditplugin').edit(this.emailInputText, config);
            }, this);

        this.signUpContainer.add([this.emailInputBase, this.emailIcon, this.emailIdText, this.emailInputText]);
    };
    //#endregion
    //----------------------------------------------------------------

    //#region - MOBILE INPUT FIELD
    CreateMobileNumberSection() {
        let isPlaceholder = true;
        this.mobileNumberInputBase = this.add.image(0, 45, "input_text_base").setOrigin(0.5);
        this.mobileIcon = this.add.image(this.mobileNumberInputBase.x - this.mobileNumberInputBase.displayWidth / 2.2, this.mobileNumberInputBase.y - this.mobileNumberInputBase.displayHeight / 2 - 25, "mobile_icon").setOrigin(0.5);
        let mobileNumberTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '28px', fill: '#fff', fontStyle: 'normal', align: 'left' };
        this.mobileNumberText = this.add.text(this.mobileIcon.x + 25, this.mobileIcon.y, Constant.MOBILE_NO_TEXT, mobileNumberTextStyle).setOrigin(0, 0.5);

        this.mobileNumberInputText = this.add.rexBBCodeText(this.mobileNumberInputBase.x, this.mobileNumberInputBase.y, Constant.MOBILE_NUMBER_PLACE_HOLDER_TEXT, {
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
                    this.mobileNumberInputText.text = '';
                    isPlaceholder = false;
                    this.mobileNumberInputText.setColor('yellow');
                }
                let config = {
                    type: 'number',
                    onOpen: function (textObject) {
                    },
                    onTextChanged: function (textObject, text) {
                        textObject.text = text;
                    },
                    onClose: function (textObject) {
                        if (textObject.text == '') {
                            textObject.text = Constant.MOBILE_NUMBER_PLACE_HOLDER_TEXT;
                            isPlaceholder = true;
                            textObject.setColor('grey');
                        }
                    },
                    selectAll: true,
                }
                this.plugins.get('rextexteditplugin').edit(this.mobileNumberInputText, config);
            }, this);

        this.signUpContainer.add([this.mobileNumberInputBase, this.mobileIcon, this.mobileNumberText, this.mobileNumberInputText]);
    };
    //#endregion
    //----------------------------------------------------------------

    //#region - PASSWORD INPUT FIELD
    CreatePasswordSection() {
        let isPlaceholder = true;

        this.passwordInputBase = this.add.image(0, 210, "input_text_base").setOrigin(0.5);
        this.passwordIcon = this.add.image(this.passwordInputBase.x - this.passwordInputBase.displayWidth / 2.2, this.passwordInputBase.y - this.passwordInputBase.displayHeight / 2 - 30, "password_icon").setOrigin(0.5);
        let passwordTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '28px', fill: '#fff', fontStyle: 'normal', align: 'left' };
        this.passwordText = this.add.text(this.passwordIcon.x + 25, this.passwordIcon.y, Constant.PASSWORD_TEXT, passwordTextStyle).setOrigin(0, 0.5);

        this.passwordInputText = this.add.rexBBCodeText(this.passwordInputBase.x - 25, this.passwordInputBase.y, Constant.PASSWORD_PLACE_HOLDER_TEXT, {
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
                    this.passwordInputText.text = '';
                    isPlaceholder = false;
                    this.passwordInputText.setColor('yellow');
                }
                let config = {
                    type: 'password',
                    onOpen: function (textObject) {
                    },
                    onTextChanged: (textObject, text) => {
                        this.actualPassword = text;
                        textObject.text = this.MarkPassword(this.actualPassword);
                    },
                    onClose: function (textObject) {
                        if (textObject.text == '') {
                            textObject.text = Constant.PASSWORD_PLACE_HOLDER_TEXT;
                            isPlaceholder = true;
                            textObject.setColor('grey');
                        }
                    },
                    selectAll: true,
                    enterClose: true
                }
                this.plugins.get('rextexteditplugin').edit(this.passwordInputText, config);
            }, this);

        this.signUpContainer.add([this.passwordInputBase, this.passwordIcon, this.passwordText, this.passwordInputText]);
    };
    MarkPassword(password) {
        return new Array(password.length + 1).join('•');
    };
    CreatePasswordVisibleIcon() {
        this.passwordVisibleIcon = this.add.sprite(this.passwordInputBase.x + this.passwordInputBase.displayWidth / 2.3, this.passwordInputBase.y, "eye_icon").setOrigin(0.5);
        this.passwordVisibleIcon.setInteractive({ useHandCursor: true });
        this.passwordVisibleIcon.on('pointerdown', (pointer, x, y, event) => this.OnPasswordVisibleButtonPressed(this.passwordVisibleIcon), this);

        this.signUpContainer.add(this.passwordVisibleIcon);
    };
    OnPasswordVisibleButtonPressed(_this) {
        if (_this.frame.name == 0) {
            _this.setFrame(1);
            this.passwordInputText.text = this.actualPassword;
        } else {
            _this.setFrame(0);
            this.passwordInputText.text = this.MarkPassword(this.actualPassword);
        }
    };
    //#endregion
    //----------------------------------------------------------------

    //#region - SIGN UP BUTTON
    CreateSignUpButton() {
        this.signUpButton = new Button(this, Math.round(this.scale.width / 2), Math.round(this.scale.height / 2), "sign_in_out_button");
        this.signUpButton.setClickCallback(this.OnSignUpButtonClicked, this);

        this.signUpButtonText = new Text(this, this.signUpButton.x, this.signUpButton.y, {
            text: Constant.SIGN_UP_TEXT,
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
    async OnSignUpButtonClicked() {
        this.signUpButtonText.TextScaleTween();
        this.loadingPopup.ShowLoadingPopup();

        if (this.userNameInputText.text != Constant.USER_NAME_PLACE_HOLDER_TEXT && !Utils.IsEmpty(this.userNameInputText.text)) {
            console.log("user name found");
            if (this.emailInputText.text != Constant.EMAIL_PLACE_HOLDER_TEXT && !Utils.IsEmpty(this.emailInputText.text)) {
                console.log("Email id found");
                if (this.mobileNumberInputText.text != Constant.MOBILE_NUMBER_PLACE_HOLDER_TEXT && !Utils.IsEmpty(this.mobileNumberInputText.text)) {

                    if (!Utils.IsEmpty(this.actualPassword)) {

                        try {
                            let response = await Server.SignUpApi(this.userNameInputText.text, this.emailInputText.text, this.actualPassword, this.mobileNumberInputText.text);
                            console.log("sign up response: ", response);
                            if (!response.err) {
                                this.loadingPopup.HideLoadingPopup();
                                this.scene.stop('SignUpScene');
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
                        console.log("password missing");
                        this.loadingPopup.HideLoadingPopup();
                        this.alertPopup.ShowAlertPopup(Constant.PASSWORD_MISSING_TEXT);
                    }
                } else {
                    console.log("Mobile number missing");
                    this.loadingPopup.HideLoadingPopup();
                    this.alertPopup.ShowAlertPopup(Constant.MOBILE_MISSING_TEXT);
                }
            } else {
                console.log("Email id missing");
                this.loadingPopup.HideLoadingPopup();
                this.alertPopup.ShowAlertPopup(Constant.EMAIL_MISSING_TEXT);
            }
        } else {
            console.log("User name missing");
            this.loadingPopup.HideLoadingPopup();
            this.alertPopup.ShowAlertPopup(Constant.USER_NAME_MISSING_TEXT);
        }

    };
    ResizeSignUpButton(newWidth, newHeight, newScale) {
        this.signUpButton.setScale(newScale);
        this.signUpButton.setPosition(newWidth / 2, newHeight / 2 + 380 * newScale);

        this.signUpButtonText.setScale(newScale);
        this.signUpButtonText.setPosition(this.signUpButton.x, this.signUpButton.y);
    };
    //#endregion
    //----------------------------------------------------------------

    //#region - ALREADY ACCOUNT AND SIGN IN TEXT
    CreateAlreadyHaveAccountText() {
        let haveAccountTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '25px', fill: '#feaf23', fontStyle: 'normal', align: 'center' };
        this.haveAccountText = this.add.text(this.passwordInputBase.x - 230, this.passwordInputBase.y + 280, Constant.ALREADY_HAVE_ACCOUNT_TEXT, haveAccountTextStyle).setOrigin(0, 0.5);
        this.signUpContainer.add(this.haveAccountText);

        let signInTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '25px', fill: '#fff', fontStyle: 'normal', align: 'center' };
        this.signInText = this.add.text(this.haveAccountText.x + 355, this.haveAccountText.y, Constant.SIGN_IN_TEXT, signInTextStyle).setOrigin(0, 0.5);
        this.signInText.setInteractive({ useHandCursor: true });
        this.signInText.on('pointerdown', (pointer, x, y, event) => this.OnSignInButtonPressed(this.signInText), this);

        this.signInUnderline = this.add.image(this.signInText.x, this.signInText.y + 10, "one_pixel_white").setOrigin(0, 0.5).setScale(90, 1);

        this.signUpContainer.add([this.haveAccountText, this.signInText, this.signInUnderline]);

    };
    OnSignInButtonPressed() {
        console.log("Goto Sign IN  page");
        this.scene.stop('SignUpScene');
        this.scene.start("SignInScene");
    };
    //#endregion
    //----------------------------------------------------------------

    //#region - RESIZE ALL
    resize(newWidth, newHeight) {
        let newScale = Utils.getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);

        this.ResizeBg(newWidth, newHeight, newScale);
        this.ResizeTopBase(newWidth, newHeight, newScale);
        this.ResizeSignUpHeading(newWidth, newHeight, newScale);
        this.ResizeBackButton(newWidth, newHeight, newScale);
        this.ResizeSignUpButton(newWidth, newHeight, newScale);

        this.ResizeSignUpContainer(newWidth, newHeight, newScale);
        this.loadingPopup.resize(newWidth, newHeight, newScale);
        this.alertPopup.resize(newWidth, newHeight, newScale);
    };
    //#endregion
    //----------------------------------------------------------------

}