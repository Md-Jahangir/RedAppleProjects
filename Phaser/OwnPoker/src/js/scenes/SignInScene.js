import Phaser from "phaser";
import { Constant } from "../Constant.js";
import { SelectedResolution } from "../ResolutionSelector.js";
import { Utils } from "../Utils.js";
import Button from "../ui/Button.js";
import Text from "../ui/Text.js";
import { Server } from "../services/Server.js";
import { Model } from "../Model.js";
import AlertPopup from "../popup/AlertPopup.js";
import LoadingPopup from "../popup/LoadingPopup.js";
import BuyInPopup from "../popup/BuyInPopup.js";

export default class SignInScene extends Phaser.Scene {

    constructor() {
        super("SignInScene");
        this.actualPassword = "";
        this.alertPopup = null;
        this.loadingPopup = null;
        this.currentHeight = null;
        this.currentWidth = null;
        this.currentScale = null;
        this.buyInPopup = null;

    }

    //#region - CREATE ALL ASSESTS
    create() {
        this.game.events.on("resize", this.resize, this);

        this.CreateBg();
        this.CreateTopBase();
        this.CreateSignInHeading();
        // this.CreateBackButton();
        this.signInContainer = this.add.container(0, 0);

        this.CreateEmailSection();
        this.CreatePasswordSection();
        this.CreatePasswordVisibleIcon();
        this.CreateForgotPasswordText();
        this.CreateCheckBox();
        this.CreateIHaveReadText();
        this.CreateUserServiceText();
        this.CreateSignInButton();
        this.CreateNewHereText();

        this.loadingPopup = new LoadingPopup(this);
        this.alertPopup = new AlertPopup(this);

        this.buyInPopup = new BuyInPopup(this);

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
        let cuurHeight = this.topBase.displayHeight;
        this.topBase.setDisplaySize(newWidth, cuurHeight);
    };
    //#endregion
    //----------------------------------------------------------------

    //#region - SIGN IN HEADING
    CreateSignInHeading() {
        this.heading = this.add.image(0, 0, "sign_in_heading").setOrigin(0.5);

    };
    ResizeSignInHeading(newWidth, newHeight, newScale) {
        this.heading.setScale(newScale);
        this.heading.setPosition(this.topBase.x, this.topBase.y);
    };
    //#endregion
    //----------------------------------------------------------------

    //#region - CREATE BACK BUTTON
    // CreateBackButton() {
    //     this.backButton = new Button(this, Math.round(this.scale.width / 2), Math.round(this.scale.height / 2), "back_button");
    //     this.backButton.setClickCallback(this.OnBackButtonClicked, this);
    // };
    // ResizeBackButton(newWidth, newHeight, newScale) {
    //     this.backButton.setScale(newScale);
    //     this.backButton.setPosition(this.topBase.x - this.topBase.displayWidth / 2.4, this.topBase.y);
    // };
    // OnBackButtonClicked() {
    //     console.log("OnBackButtonClicked");
    // };
    //#endregion
    //----------------------------------------------------------------

    //#region - RESIZE CONTAINER
    ResizeSignInContainer(newWidth, newHeight, newScale) {
        this.signInContainer.setScale(newScale);
        this.signInContainer.setPosition(newWidth / 2, newHeight / 2);
    };
    //#endregion
    //----------------------------------------------------------------

    //#region - EMAIL INPUT FIELD
    CreateEmailSection() {
        let isPlaceholder = true;
        this.emailInputBase = this.add.image(0, -180, "input_text_base").setOrigin(0.5);
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

        this.signInContainer.add([this.emailInputBase, this.emailIcon, this.emailIdText, this.emailInputText]);
    };
    //#endregion
    //----------------------------------------------------------------

    //#region - PASSWORD INPUT FIELD
    CreatePasswordSection() {
        let isPlaceholder = true;

        this.passwordInputBase = this.add.image(0, 0, "input_text_base").setOrigin(0.5);
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

        this.signInContainer.add([this.passwordInputBase, this.passwordIcon, this.passwordText, this.passwordInputText]);
    };
    MarkPassword(password) {
        return new Array(password.length + 1).join('•');
    };
    CreatePasswordVisibleIcon() {
        this.passwordVisibleIcon = this.add.sprite(this.passwordInputBase.x + this.passwordInputBase.displayWidth / 2.3, this.passwordInputBase.y, "eye_icon").setOrigin(0.5);
        this.passwordVisibleIcon.setInteractive({ useHandCursor: true });
        this.passwordVisibleIcon.on('pointerdown', (pointer, x, y, event) => this.OnPasswordVisibleButtonPressed(this.passwordVisibleIcon), this);

        this.signInContainer.add(this.passwordVisibleIcon);
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

    //#region - FORGOT TEXT
    CreateForgotPasswordText() {
        let forgotPasswordTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '28px', fill: '#feaf23', fontStyle: 'normal', align: 'center' };
        this.forgotPasswordText = this.add.text(this.passwordInputBase.x, this.passwordInputBase.y + 95, Constant.FORGOT_PASSWORD_TEXT, forgotPasswordTextStyle).setOrigin(0.5);
        this.forgotPasswordText.setInteractive({ useHandCursor: true });
        this.forgotPasswordText.on('pointerdown', (pointer, x, y, event) => this.OnForgotPasswordButtonPressed(this.forgotPasswordText), this);
        this.signInContainer.add(this.forgotPasswordText);

    };
    OnForgotPasswordButtonPressed() {
        console.log("Goto forgot password page");
        this.scene.stop("SignInScene");
        this.scene.start('ForgotPasswordScene');
    };
    //#endregion
    //----------------------------------------------------------------

    //#region - CHECK BOX
    CreateCheckBox() {
        this.checkBoxIcon = this.add.sprite(this.forgotPasswordText.x - 350, this.forgotPasswordText.y + 55, "check_box").setOrigin(0.5);
        this.checkBoxIcon.setInteractive({ useHandCursor: true });
        this.checkBoxIcon.on('pointerdown', (pointer, x, y, event) => this.OnCheckBoxButtonPressed(this.checkBoxIcon), this);

        this.signInContainer.add(this.checkBoxIcon);
    };
    OnCheckBoxButtonPressed(_this) {
        if (_this.frame.name == 0) {
            _this.setFrame(1);
            this.signInButton.enable();
            this.signInButtonText.enable();
        } else {
            _this.setFrame(0);
            this.signInButton.disable();
            this.signInButtonText.disable();
        }
    };
    //#endregion
    //----------------------------------------------------------------

    //#region - I HAVE READ TEXT
    CreateIHaveReadText() {
        let haveReadTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '27px', fill: '#fff', fontStyle: 'normal', align: 'center' };
        this.haveReadText = this.add.text(this.checkBoxIcon.x + 30, this.checkBoxIcon.y, Constant.I_HAVE_READ_TEXT, haveReadTextStyle).setOrigin(0, 0.5);
        this.signInContainer.add(this.haveReadText);
    };
    //#endregion
    //----------------------------------------------------------------

    //#region - USER SERVICE TEXT
    CreateUserServiceText() {
        let userServiceTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '27px', fill: '#fff', fontStyle: 'normal', align: 'center' };
        this.userServiceText = this.add.text(this.haveReadText.x + 340, this.haveReadText.y, Constant.USER_SERVICE_TEXT, userServiceTextStyle).setOrigin(0, 0.5);
        this.userServiceText.setInteractive({ useHandCursor: true });
        this.userServiceText.on('pointerdown', (pointer, x, y, event) => this.OnUserServiceButtonPressed(this.userServiceText), this);

        this.underline = this.add.image(this.userServiceText.x, this.userServiceText.y + 15, "one_pixel_white").setOrigin(0, 0.5).setScale(298, 2);
        this.underline.setTint(0xfe8218);
        this.signInContainer.add([this.userServiceText, this.underline]);
    };
    OnUserServiceButtonPressed() {
        console.log("Goto User service agreement page");
    };
    //#endregion
    //----------------------------------------------------------------

    //#region - SIGN IN BUTTON
    CreateSignInButton() {
        this.signInButton = new Button(this, Math.round(this.scale.width / 2), Math.round(this.scale.height / 2), "sign_in_out_button");
        this.signInButton.setClickCallback(this.OnSignInButtonClicked, this);
        this.signInButton.disable();

        this.signInButtonText = new Text(this, this.signInButton.x, this.signInButton.y, {
            text: Constant.SIGN_IN_TEXT,
            fontFamily: "BAHNSCHRIFT",
            fontSize: "46px",
            fontStyle: "bold",
            color: "#ffffff",
            align: "center",
            wordWrap: {},
            shadow: {},
        }
        );
        this.signInButtonText.disable();
    };

    async OnSignInButtonClicked() {
        this.loadingPopup.ShowLoadingPopup();
        this.signInButtonText.TextScaleTween();

        if (this.emailInputText.text != Constant.EMAIL_PLACE_HOLDER_TEXT && !Utils.IsEmpty(this.emailInputText.text)) {
            if (!Utils.IsEmpty(this.actualPassword)) {

                try {
                    let response = await Server.LoginApi(this.emailInputText.text, this.actualPassword);
                    console.log("response: ", response);
                    if (!response.err) {
                        this.loadingPopup.HideLoadingPopup();
                        // localStorage.setItem("texas_poker_logged_in", true);
                        // localStorage.setItem("texas_poker_auth_token", response.data.token);
                        Model.SetAuthTokenToLocalStorage(response.data.token);
                        Model.SetLoginStatus(true);
                        Model.SetUserId(response.data.user_id);
                        this.scene.stop('SignInScene');
                        this.scene.start("DashboardScene");
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
                console.log("Password missing");
                this.loadingPopup.HideLoadingPopup();
                this.alertPopup.ShowAlertPopup(Constant.PASSWORD_MISSING_TEXT);
            }
        } else {
            console.log("Email missing");
            this.loadingPopup.HideLoadingPopup();
            this.alertPopup.ShowAlertPopup(Constant.EMAIL_MISSING_TEXT);
        }
    };
    ResizeSignInButton(newWidth, newHeight, newScale) {
        this.signInButton.setScale(newScale);
        this.signInButton.setPosition(newWidth / 2, newHeight / 2 + 310 * newScale);

        this.signInButtonText.setScale(newScale);
        this.signInButtonText.setPosition(this.signInButton.x, this.signInButton.y);
    };
    //#endregion
    //----------------------------------------------------------------

    //#region - New here text and Sign up text
    CreateNewHereText() {
        let newHereTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '25px', fill: '#feaf23', fontStyle: 'normal', align: 'center' };
        this.newHereText = this.add.text(this.haveReadText.x + 200, this.haveReadText.y + 310, Constant.NEW_HERE_TEXT, newHereTextStyle).setOrigin(0, 0.5);
        this.signInContainer.add(this.newHereText);

        let signUpTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '25px', fill: '#fff', fontStyle: 'normal', align: 'center' };
        this.signUpText = this.add.text(this.newHereText.x + 150, this.newHereText.y, Constant.SIGN_UP_TEXT, signUpTextStyle).setOrigin(0, 0.5);
        this.signUpText.setInteractive({ useHandCursor: true });
        this.signUpText.on('pointerdown', (pointer, x, y, event) => this.OnSignUpButtonPressed(this.signUpText), this);

        this.signUpUnderline = this.add.image(this.signUpText.x, this.signUpText.y + 10, "one_pixel_white").setOrigin(0, 0.5).setScale(95, 1);

        this.signInContainer.add([this.newHereText, this.signUpText, this.signUpUnderline]);
    };
    OnSignUpButtonPressed() {
        console.log("Goto Sign up  page");
        this.scene.stop("SignInScene");
        this.scene.start('SignUpScene');
    };
    //#endregion
    //----------------------------------------------------------------

    //#region - RESIZE ALL
    resize(newWidth, newHeight) {

        let newScale = Utils.getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);

        this.currentHeight = newHeight;
        this.currentWidth = newWidth;
        this.currentScale = newScale;
        this.ResizeBg(newWidth, newHeight, newScale);
        this.ResizeTopBase(newWidth, newHeight, newScale);
        this.ResizeSignInHeading(newWidth, newHeight, newScale);
        // this.ResizeBackButton(newWidth, newHeight, newScale);
        this.ResizeSignInButton(newWidth, newHeight, newScale);
        this.ResizeSignInContainer(newWidth, newHeight, newScale);
        this.loadingPopup.resize(newWidth, newHeight, newScale);
        this.alertPopup.resize(newWidth, newHeight, newScale);
        this.buyInPopup.resize(newWidth, newHeight, newScale);
    };
    //#endregion
    //----------------------------------------------------------------

}