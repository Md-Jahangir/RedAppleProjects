import Phaser from "phaser";
import { Constant } from "../Constant.js";
import { SelectedResolution } from "../ResolutionSelector.js";
import { Utils } from "../Utils.js";
import Button from "../ui/Button.js";
import Text from "../ui/Text.js";
import { Server } from "../services/Server.js";
import AlertPopup from "../popup/AlertPopup.js";
import LoadingPopup from "../popup/LoadingPopup.js";

export default class ForgotPasswordScene extends Phaser.Scene {

    constructor() {
        super("ForgotPasswordScene");
        this.alertPopup = null;
        this.loadingPopup = null;
    }

    //#region - CREATE ALL ASSESTS
    create() {
        this.game.events.on("resize", this.resize, this);

        this.CreateBg();
        this.CreateTopBase();
        this.CreateForgotPasswordHeading();
        this.CreateBackButton();
        this.forgotPasswordContainer = this.add.container(0, 0);
        this.CreateCharacterIcon();
        this.CreateForgotMessageText();
        this.CreateEmailSection();
        this.CreateSubmitButton();

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

    //#region - FORGOT PASSWORD HEADING
    CreateForgotPasswordHeading() {
        this.heading = this.add.image(0, 0, "forgot_password_heading").setOrigin(0.5);
    };
    ResizeForgotPasswordHeading(newWidth, newHeight, newScale) {
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
        this.scene.stop('ForgotPasswordScene');
        this.scene.start("SignInScene");
    };
    //#endregion
    //----------------------------------------------------------------

    //#region - CHARACER ICON
    CreateCharacterIcon() {
        this.icon = this.add.image(-400, 0, "forgot_password_icon").setOrigin(0.5);
        this.forgotPasswordContainer.add(this.icon);
    };
    //#endregion
    //----------------------------------------------------------------

    //#region - FORGOT MESSAGE TEXT
    CreateForgotMessageText() {
        let forgotYourTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '32px', fill: '#fff', fontStyle: 'normal', align: 'center' };
        this.forgotYourText = this.add.text(240, -200, Constant.FORGOT_YOUR_PASSWORD_TEXT, forgotYourTextStyle).setOrigin(0, 0.5);

        let enterEmailBelowTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '24px', fill: '#feaf23', fontStyle: 'normal', align: 'center' };
        this.enterEmailBelowText = this.add.text(180, -150, Constant.ENTER_EMAIL_BELLOW_MESSAGE_TEXT, enterEmailBelowTextStyle).setOrigin(0, 0.5);
        this.forgotPasswordContainer.add([this.forgotYourText, this.enterEmailBelowText]);
    };
    //#endregion
    //----------------------------------------------------------------

    //#region - EMAIL INPUT FIELD
    CreateEmailSection() {
        let isPlaceholder = true;
        this.emailInputBase = this.add.image(440, 0, "input_text_base").setOrigin(0.5);
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

        this.forgotPasswordContainer.add([this.emailInputBase, this.emailIcon, this.emailIdText, this.emailInputText]);
    };
    //#endregion
    //----------------------------------------------------------------

    //#region - RESIZE CONTAINER
    ResizeForgotPasswordContainer(newWidth, newHeight, newScale) {
        this.forgotPasswordContainer.setScale(newScale);
        this.forgotPasswordContainer.setPosition(newWidth / 2, newHeight / 2);
    };
    //#endregion
    //----------------------------------------------------------------

    //#region - SUBMIT BUTTON
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

        if (this.emailInputText.text != Constant.EMAIL_PLACE_HOLDER_TEXT && !Utils.IsEmpty(this.emailInputText.text)) {
            console.log("Email id found");
            console.log("FORGOT Submit");
            try {
                let response = await Server.ForgotPasswordApi(this.emailInputText.text);
                console.log("forgot password response: ", response);
                if (!response.err) {
                    this.loadingPopup.HideLoadingPopup();
                    this.scene.stop('ForgotPasswordScene');
                    this.scene.start("ResetPasswordScene");
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
            console.log("Email id missing");
            this.loadingPopup.HideLoadingPopup();
            this.alertPopup.ShowAlertPopup(Constant.EMAIL_MISSING_TEXT);
        }
    };
    ResizeSubmitButton(newWidth, newHeight, newScale) {
        this.submitButton.setScale(newScale);
        this.submitButton.setPosition(newWidth / 2 + 440 * newScale, newHeight / 2 + 200 * newScale);

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
        this.ResizeForgotPasswordHeading(newWidth, newHeight, newScale);
        this.ResizeBackButton(newWidth, newHeight, newScale);
        this.ResizeSubmitButton(newWidth, newHeight, newScale);

        this.ResizeForgotPasswordContainer(newWidth, newHeight, newScale);
        this.loadingPopup.resize(newWidth, newHeight, newScale);
        this.alertPopup.resize(newWidth, newHeight, newScale);
    };
    //#endregion
    //----------------------------------------------------------------


}