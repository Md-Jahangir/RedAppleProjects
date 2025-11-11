import Phaser from "phaser";
import { Constant } from "../Constant.js";
import { SelectedResolution } from "../ResolutionSelector.js";
import { Utils } from "../Utils.js";
import Button from "../ui/Button.js";
import Text from "../ui/Text.js";
import { Server } from "../services/Server.js";
import LoadingPopup from "../popup/LoadingPopup.js";
import AlertPopup from "../popup/AlertPopup.js";


export default class UserProfileScene extends Phaser.Scene {

    constructor() {
        super("UserProfileScene");
        this.alertPopup = null;
        this.loadingPopup = null;
    }
    init(data) {
        this.previousScene = data.fromScene;
        console.log("this.previousScene: ", this.previousScene);
    }
    async create() {
        this.game.events.on("resize", this.resize, this);
        this.userNamePlaceholderText = 'Enter your name'
        this.emailPlaceholderText = 'Enter your email';
        this.mobileNuberPlaceholderText = 'Enter your Mobile Number'


        this.CreateBg();
        this.CreateTopBase();
        this.CreateProfileHeading();
        this.CreateBackButton();
        this.CreateBalanceArea();
        this.profileContainer = this.add.container(0, 0);
        this.CreateUserNameSection();
        this.CreateEmailSection();
        this.CreateMobileNumberSection();
        this.CreateProfileSection();
        this.loadingPopup = new LoadingPopup(this);
        this.alertPopup = new AlertPopup(this);
        this.resize(window.innerWidth, window.innerHeight);

        await this.SetUserDetailsFromServer();
    };

    async SetUserDetailsFromServer() {
        this.loadingPopup.ShowLoadingPopup();
        try {
            let response = await Server.GetUserDetailsApi();
            console.log("user details response Choose Table: ", response);
            if (!response.err) {
                if (!Utils.IsEmpty(response.data.profile.profile_pic)) {
                    this.load.image("profile_pic", response.data.profile.profile_pic);
                    this.load.start();
                    this.SetProfileImage("profile_pic");
                }
                this.SetUserName(response.data.profile.username);
                this.SetBalance(response.data.balance.total_balance);
                this.SetEmailId(response.data.email);
                this.SetMobileNumber(response.data.profile.mobile);
                this.loadingPopup.HideLoadingPopup();
            } else {
                console.log(response.data.message);
                this.loadingPopup.HideLoadingPopup();
                this.alertPopup.ShowAlertPopup(response.message);
            }
        } catch (err) {
            this.loadingPopup.HideLoadingPopup();
            this.alertPopup.ShowAlertPopup(err.message);
        }
    };

    CreateBg() {
        this.bg = this.add.image(0, 0, "background").setOrigin(0);
    };
    ResizeBg(newWidth, newHeight, newScale) {
        this.bg.setDisplaySize(newWidth, newHeight);
    };

    CreateTopBase() {
        this.topBase = this.add.image(0, 0, "tob_base").setOrigin(0.5);
    };
    ResizeTopBase(newWidth, newHeight, newScale) {
        this.topBase.setScale(newScale);
        this.topBase.setPosition(newWidth / 2, this.topBase.displayHeight / 2);
        let currentHeight = this.topBase.displayHeight;
        this.topBase.setDisplaySize(newWidth, currentHeight);
    };

    CreateProfileHeading() {
        this.heading = this.add.image(0, 0, "profile_heading").setOrigin(0.5);

    };
    ResizeProfileHeading(newWidth, newHeight, newScale) {
        this.heading.setScale(newScale);
        this.heading.setPosition(this.topBase.x, this.topBase.y);
    };

    CreateBackButton() {
        this.backButton = new Button(this, Math.round(this.scale.width / 2), Math.round(this.scale.height / 2), "back_button");
        this.backButton.setClickCallback(this.OnBackButtonClicked, this);
    };
    ResizeBackButton(newWidth, newHeight, newScale) {
        this.backButton.setScale(newScale);
        this.backButton.setPosition(this.topBase.x - this.topBase.displayWidth / 2.4, this.topBase.y);
    };
    OnBackButtonClicked() {
        console.log("OnBackButtonClicked", this.previousScene);
        this.scene.stop('UserProfileScene');
        this.scene.start(this.previousScene);
    };

    //#region - CREATE BALANCE AREA
    CreateBalanceArea() {
        this.balanceBase = this.add.image(0, 0, "balance_base")//.setOrigin(0.5);
        this.balaceText = new Text(this, this.balanceBase.x, this.balanceBase.y, {
            text: "1000",
            fontFamily: "BAHNSCHRIFT",
            fontSize: "38px",
            fontStyle: "normal",
            color: "#ffffff",
            align: "left",
            wordWrap: {},
            shadow: {},
        }
        );
        this.balancePlusButton = new Button(this, Math.round(this.scale.width / 2), Math.round(this.scale.height / 2), "plus_button");
        this.balancePlusButton.setClickCallback(this.OnPlusButtonClicked, this);

    };
    ResizeBalanceArea(newWidth, newHeight, newScale) {
        this.balanceBase.setScale(newScale);
        this.balanceBase.setPosition(this.topBase.x + this.topBase.displayWidth / 3.5, this.topBase.y + 5 * newScale);

        this.balaceText.setScale(newScale);
        this.balaceText.setPosition(this.balanceBase.x + 25 * newScale, this.balanceBase.y);

        this.balancePlusButton.setScale(newScale);
        this.balancePlusButton.setPosition(this.balanceBase.x + 130 * newScale, this.balanceBase.y - 2 * newScale);
    };
    OnPlusButtonClicked() {
        console.log("OnPlusButtonClicked");
    };
    SetBalance(_amt) {
        this.balaceText.setText(parseFloat(_amt).toString(2));
    };
    //#endregion
    //----------------------------------------------------------------
    //#region - RESIZE CONTAINER
    ResizeProfileContainer(newWidth, newHeight, newScale) {
        this.profileContainer.setScale(newScale);
        this.profileContainer.setPosition(newWidth / 2, newHeight / 2);
    };
    //#endregion
    //----------------------------------------------------------------


    //#region - NAME INPUT FIELD
    CreateUserNameSection() {
        let isPlaceholder = true;
        this.userNameInputBase = this.add.image(50, -200, "profile_input_base").setOrigin(0.5);
        // this.userIcon = this.add.image(this.userNameInputBase.x - this.userNameInputBase.displayWidth / 2.2, this.userNameInputBase.y - this.userNameInputBase.displayHeight / 2 - 25, "person_icon").setOrigin(0.5);
        let userNameTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '36px', fill: '#fff', fontStyle: 'normal', align: 'left' };
        this.userNameText = this.add.text(this.userNameInputBase.x - 198, this.userNameInputBase.y - 30, Constant.USER_NAME_TEXT, userNameTextStyle).setOrigin(0, 0.5);

        this.userNameInputText = this.add.rexBBCodeText(this.userNameInputBase.x - 15, this.userNameInputBase.y + 30, this.userNamePlaceholderText, {
            fontFamily: 'BAHNSCHRIFT',
            color: 'yellow',
            fontSize: '32px',
            fixedWidth: 365,
            fixedHeight: 60,
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
                            textObject.text = this.userNamePlaceholderText;
                            isPlaceholder = true;
                            textObject.setColor('grey');
                        }
                    },
                    selectAll: true,
                }
                this.plugins.get('rextexteditplugin').edit(this.userNameInputText, config);
            }, this);

        this.userNameEditButton = this.add.image(this.userNameInputBase.x + 190, this.userNameInputBase.y + 30, "edit_button_normal").setOrigin(0.5);
        this.userNameEditButton.setInteractive({ useHandCursor: true });
        this.userNameEditButton.on('pointerdown', (pointer, x, y, event) => this.OnUserNameEditButtonPressed(this.userNameEditButton), this);

        // this.profileContainer.add([this.userNameInputBase, this.userIcon, this.userNameText, this.userNameInputText]);
        this.profileContainer.add([this.userNameInputBase, this.userNameText, this.userNameInputText, this.userNameEditButton]);
    };

    OnUserNameEditButtonPressed() {
        console.log("OnUserNameEditButtonPressed");
    };

    SetUserName(_name) {
        this.userNameInputText.setText(_name);
    };

    //#endregion
    //----------------------------------------------------------------
    //#region - EMAIL INPUT FIELD
    CreateEmailSection() {
        let isPlaceholder = true;
        this.emailInputBase = this.add.image(50, -20, "profile_input_base").setOrigin(0.5);
        // this.emailIcon = this.add.image(this.emailInputBase.x - this.emailInputBase.displayWidth / 2.2, this.emailInputBase.y - this.emailInputBase.displayHeight / 2 - 25, "email_icon").setOrigin(0.5);
        let emailIdTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '36px', fill: '#fff', fontStyle: 'normal', align: 'left' };
        this.emailIdText = this.add.text(this.emailInputBase.x - 198, this.emailInputBase.y - 30, Constant.EMAIL_ID_TEXT, emailIdTextStyle).setOrigin(0, 0.5);

        this.emailInputText = this.add.rexBBCodeText(this.emailInputBase.x - 15, this.emailInputBase.y + 30, this.emailPlaceholderText, {
            fontFamily: 'BAHNSCHRIFT',
            color: 'yellow',
            fontSize: '32px',
            fixedWidth: 365,
            fixedHeight: 60,
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
                            textObject.text = this.emailPlaceholderText;
                            isPlaceholder = true;
                            textObject.setColor('grey');
                        }
                    },
                    selectAll: true,
                }
                this.plugins.get('rextexteditplugin').edit(this.emailInputText, config);
            }, this);

        this.emailEditButton = this.add.image(this.emailInputBase.x + 190, this.emailInputBase.y + 30, "edit_button_normal").setOrigin(0.5);
        this.emailEditButton.setInteractive({ useHandCursor: true });
        this.emailEditButton.on('pointerdown', (pointer, x, y, event) => this.OnEmailEditButtonPressed(this.userNameEditButton), this);

        // this.profileContainer.add([this.emailInputBase, this.emailIcon, this.emailIdText, this.emailInputText]);
        this.profileContainer.add([this.emailInputBase, this.emailIdText, this.emailInputText, this.emailEditButton]);
    };

    OnEmailEditButtonPressed() {
        console.log("OnEmailEditButtonPressed");
    };

    SetEmailId(_email) {
        this.emailInputText.setText(_email);
    };
    //#endregion
    //----------------------------------------------------------------

    //#region - MOBILE INPUT FIELD
    CreateMobileNumberSection() {
        let isPlaceholder = true;
        this.mobileNumberInputBase = this.add.image(50, 160, "profile_input_base").setOrigin(0.5);
        // this.mobileIcon = this.add.image(this.mobileNumberInputBase.x - this.mobileNumberInputBase.displayWidth / 2.2, this.mobileNumberInputBase.y - this.mobileNumberInputBase.displayHeight / 2 - 25, "mobile_icon").setOrigin(0.5);
        let mobileNumberTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '36px', fill: '#fff', fontStyle: 'normal', align: 'left' };
        this.mobileNumberText = this.add.text(this.mobileNumberInputBase.x - 198, this.mobileNumberInputBase.y - 30, Constant.MOBILE_NO_TEXT, mobileNumberTextStyle).setOrigin(0, 0.5);

        this.mobileNumberInputText = this.add.rexBBCodeText(this.mobileNumberInputBase.x - 15, this.mobileNumberInputBase.y + 30, this.mobileNuberPlaceholderText, {
            fontFamily: 'BAHNSCHRIFT',
            color: 'yellow',
            fontSize: '32px',
            fixedWidth: 365,
            fixedHeight: 60,
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
                            textObject.text = this.mobileNuberPlaceholderText;
                            isPlaceholder = true;
                            textObject.setColor('grey');
                        }
                    },
                    selectAll: true,
                }
                this.plugins.get('rextexteditplugin').edit(this.mobileNumberInputText, config);
            }, this);

        this.phnNumberEditButton = this.add.image(this.mobileNumberInputBase.x + 190, this.mobileNumberInputBase.y + 30, "edit_button_normal").setOrigin(0.5);
        this.phnNumberEditButton.setInteractive({ useHandCursor: true });
        this.phnNumberEditButton.on('pointerdown', (pointer, x, y, event) => this.OnPhnNumberEditButtonPressed(this.userNameEditButton), this);

        // this.profileContainer.add([this.mobileNumberInputBase, this.mobileIcon, this.mobileNumberText, this.mobileNumberInputText]);
        this.profileContainer.add([this.mobileNumberInputBase, this.mobileNumberText, this.mobileNumberInputText, this.phnNumberEditButton]);
    };
    OnPhnNumberEditButtonPressed() {
        console.log("OnPhnNumberEditButtonPressed");
    };
    SetMobileNumber(_phn) {
        this.mobileNumberInputText.setText(_phn);
    };
    //#endregion
    //----------------------------------------------------------------

    //#region - CREATE PROFILE SECTION
    CreateProfileSection() {
        this.profilePicContainer = this.add.container(0, 0);
        this.userBase = this.add.image(0, 0, "profile__pic_base").setOrigin(0.5);
        // this.userImage = this.add.image(this.userBase.x, this.userBase.y, "profile_pic").setOrigin(0.5);
        this.userImage = this.add.image(this.userBase.x, this.userBase.y, "user_image").setOrigin(0.5).setScale(2.8);
        this.profilePicContainer.add([this.userBase, this.userImage]);
    };
    ResizeProfileSection(newWidth, newHeight, newScale) {
        this.profilePicContainer.setScale(newScale);
        this.profilePicContainer.setPosition(newWidth / 2 - 560 * newScale, newHeight / 2);

        this.userPicGraphics = null;
        this.userPicGraphics = this.add.graphics();
        this.userPicGraphics.fillStyle(0xfff, 0);
        this.userPicGraphics.fillCircle(0, 0, this.userBase.displayWidth / 2.05 * newScale);
        this.userPicGraphics.setPosition(newWidth / 2 - 560 * newScale, newHeight / 2);
        let mask = this.userPicGraphics.createGeometryMask();
        this.userImage.setMask(mask);
    };
    SetProfileImage(_img) {
        this.userImage.loadTexture(_img);
    };
    //#endregion
    //----------------------------------------------------------------

    resize(newWidth, newHeight) {
        let newScale = Utils.getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);

        this.ResizeBg(newWidth, newHeight, newScale);
        this.ResizeTopBase(newWidth, newHeight, newScale);
        this.ResizeProfileHeading(newWidth, newHeight, newScale);
        this.ResizeBackButton(newWidth, newHeight, newScale);
        this.ResizeBalanceArea(newWidth, newHeight, newScale);
        this.ResizeProfileContainer(newWidth, newHeight, newScale);
        this.ResizeProfileSection(newWidth, newHeight, newScale);
        this.loadingPopup.resize(newWidth, newHeight, newScale);
        this.alertPopup.resize(newWidth, newHeight, newScale);
    };


}