import Phaser from "phaser";
import { Constant } from "../Constant.js";
import { SelectedResolution } from "../ResolutionSelector.js";
import { Utils } from "../Utils.js";
import Button from "../ui/Button.js";
import Text from "../ui/Text.js";
import { Server } from "../services/Server.js";
import AlertPopup from "../popup/AlertPopup.js";
import LoadingPopup from "../popup/LoadingPopup.js";

export default class DashboardScene extends Phaser.Scene {

    constructor() {
        super("DashboardScene");
        this.alertPopup = null;
        this.loadingPopup = null;
    }

    //#region - CREATE ALL ASSESTS
    async create() {
        this.game.events.on("resize", this.resize, this);

        this.CreateBg();
        this.CreateTopBase();
        this.CreateProfileHeading();
        this.CreateBackButton();
        this.CreateBalanceArea();
        this.CreateSettingsButton();
        this.CreateProfileSection();
        this.CreateTornamentSection();
        this.CreateTableSection();

        this.loadingPopup = new LoadingPopup(this);
        this.alertPopup = new AlertPopup(this);
        this.resize(window.innerWidth, window.innerHeight);

        await this.SetUserDetailsFromServer();
    };
    //#endregion
    //----------------------------------------------------------------

    async SetUserDetailsFromServer() {
        this.loadingPopup.ShowLoadingPopup();
        try {
            let response = await Server.GetUserDetailsApi();
            console.log("user details response Dash Board: ", response);
            if (!response.err) {
                if (!Utils.IsEmpty(response.data.profile.profile_pic)) {
                    // this.load.image("profile_pic", response.data.profile.profile_pic);
                    // this.load.start();
                    this.SetProfileImage(response.data.profile.profile_pic);
                } else {
                    this.SetProfileImage("profile_pic_0");
                }
                this.SetUserName(response.data.profile.username);
                this.SetBalance(response.data.balance.total_balance);
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

    //#region - CREATE BG
    CreateBg() {
        this.bg = this.add.image(0, 0, "background").setOrigin(0);
    };
    ResizeBg(newWidth, newHeight, newScale) {
        this.bg.setDisplaySize(newWidth, newHeight);
    };
    //#endregion
    //----------------------------------------------------------------

    //#region - CREATE TOP BASE
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

    //#region - CREATE TOP HEADING
    CreateProfileHeading() {
        this.heading = this.add.image(0, 0, "dashboard_heading").setOrigin(0.5);
    };
    ResizeProfileHeading(newWidth, newHeight, newScale) {
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
        this.scene.stop('DashboardScene');
        this.scene.start("SignInScene");
    };
    //#endregion
    //----------------------------------------------------------------

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

    //#region - CREATE SETTINGS BUTTON
    CreateSettingsButton() {
        this.settingsButton = new Button(this, Math.round(this.scale.width / 2), Math.round(this.scale.height / 2), "settings_button");
        this.settingsButton.setClickCallback(this.OnSettingsButtonClicked, this);

    };
    ResizeSettingsButton(newWidth, newHeight, newScale) {
        this.settingsButton.setScale(newScale);
        this.settingsButton.setPosition(this.balanceBase.x + 260 * newScale, this.balanceBase.y);
    };
    OnSettingsButtonClicked() {
        console.log("OnSettingsButtonClicked");
    };
    //#endregion
    //----------------------------------------------------------------

    //#region - CREATE PROFILE SECTION
    CreateProfileSection() {
        this.profileContainer = this.add.container(0, 0);

        this.userBase = this.add.image(0, 0, "user_base").setOrigin(0.5).setScale(0.55);
        this.userBase.setInteractive({ useHandCursor: true });
        this.userBase.on('pointerdown', (pointer, x, y, event) => this.OnProfilePicPressed(this.userBase), this);
        this.userImage = this.add.image(this.userBase.x, this.userBase.y, "user_image").setOrigin(0.5).setScale(0.95);
        // this.userImage = this.add.image(this.userBase.x, this.userBase.y, "profile_pic").setOrigin(0.5).setScale(0.25);
        this.userRing = this.add.image(this.userBase.x, this.userBase.y, "user_ring").setOrigin(0.5).setScale(0.55);
        let userNameTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '36px', fill: '#fff', fontStyle: 'normal', align: 'left' };
        this.userNameText = this.add.text(this.userBase.x + 70, this.userBase.y - 5, "Your Name", userNameTextStyle).setOrigin(0, 0.5);

        this.profileContainer.add([this.userBase, this.userImage, this.userRing, this.userNameText]);

        // this.CreateProfileMask();
    };

    OnProfilePicPressed() {
        console.log("Goto Profile  page");
        this.scene.stop('DashboardScene');
        this.scene.start("UserProfileScene", { fromScene: 'DashboardScene' });
    };
    // CreateProfileMask() {
    // this.userPicGraphics = this.add.graphics();
    // this.userPicGraphics.fillStyle(0xfff, 0);
    // this.userPicGraphics.fillCircle(0, 0, this.userBase.displayWidth / 2.1);
    // this.userPicGraphics.setPosition(Math.round(this.scale.width / 2), Math.round(this.scale.height / 2));

    // let mask = this.userPicGraphics.createGeometryMask();
    // this.userImage.setMask(mask);
    // };
    ResizeProfileSection(newWidth, newHeight, newScale) {
        this.profileContainer.setScale(newScale);
        this.profileContainer.setPosition(this.topBase.x - this.topBase.displayWidth / 2.9, this.topBase.y);

        this.userPicGraphics = null;
        this.userPicGraphics = this.add.graphics();
        this.userPicGraphics.fillStyle(0xfff, 0);
        this.userPicGraphics.fillCircle(0, 0, this.userBase.displayWidth / 2.1 * newScale);
        this.userPicGraphics.setPosition(this.topBase.x - this.topBase.displayWidth / 2.9, this.topBase.y);
        let mask = this.userPicGraphics.createGeometryMask();
        this.userImage.setMask(mask);
    };
    SetProfileImage(_img) {
        this.userImage.setTexture(_img);
    };
    SetUserName(_name) {
        this.userNameText.setText(_name);
    };
    //#endregion
    //----------------------------------------------------------------

    //#region - CREATE TORNAMENT TABLE BASE
    CreateTornamentSection() {
        this.tournamentBase = this.add.image(0, 0, "dashboard_tournament_base").setOrigin(0.5);
        this.tournamentText = new Text(this, this.tournamentBase.x, this.tournamentBase.y, {
            text: Constant.TOURNAMENTS_TEXT,
            fontFamily: "BAHNSCHRIFT",
            fontSize: "85px",
            fontStyle: "bold",
            color: "#ffffff",
            align: "center",
            wordWrap: {},
            shadow: {},
        }
        );
        this.tournamentMessageText = new Text(this, this.tournamentBase.x, this.tournamentBase.y, {
            text: Constant.SELECT_TABLES_AND_PLAY_TEXT,
            fontFamily: "BAHNSCHRIFT",
            fontSize: "27px",
            fontStyle: "normal",
            color: "#66cd67",
            align: "center",
            wordWrap: {},
            shadow: {},
        }
        );

        this.registraionButton = new Button(this, Math.round(this.scale.width / 2), Math.round(this.scale.height / 2), "dashboard_register_button");
        this.registraionButton.setClickCallback(this.OnRegistrationButtonClicked, this);
    };
    ResizeTournamentSection(newWidth, newHeight, newScale) {
        this.tournamentBase.setScale(newScale);
        this.tournamentBase.setPosition(newWidth / 2, newHeight / 2 + 225 * newScale);

        this.tournamentText.setScale(newScale);
        this.tournamentText.setPosition(this.tournamentBase.x - 280 * newScale, this.tournamentBase.y - 20 * newScale);

        this.tournamentMessageText.setScale(newScale);
        this.tournamentMessageText.setPosition(this.tournamentBase.x - 390 * newScale, this.tournamentBase.y + 45 * newScale);

        this.registraionButton.setScale(newScale);
        this.registraionButton.setPosition(this.tournamentBase.x - 320 * newScale, this.tournamentBase.y + 185 * newScale);
    }
    OnRegistrationButtonClicked() {

    };
    //#endregion
    //----------------------------------------------------------------

    //#region - CREATE TABLE TABLE BASE
    CreateTableSection() {
        this.tableBase = this.add.image(0, 0, "dashboard_table_base").setOrigin(0.5);
        this.tablesText = new Text(this, this.tableBase.x, this.tableBase.y, {
            text: Constant.TABLES_TEXT,
            fontFamily: "BAHNSCHRIFT",
            fontSize: "85px",
            fontStyle: "bold",
            color: "#ffffff",
            align: "center",
            wordWrap: {},
            shadow: {},
        }
        );
        this.tablesMessageText = new Text(this, this.tableBase.x, this.tableBase.y, {
            text: Constant.SELECT_TABLES_AND_PLAY_TEXT,
            fontFamily: "BAHNSCHRIFT",
            fontSize: "25px",
            fontStyle: "normal",
            color: "#e48313",
            align: "center",
            wordWrap: {},
            shadow: {},
        }
        );

        this.playButton = new Button(this, Math.round(this.scale.width / 2), Math.round(this.scale.height / 2), "dashboard_play_button");
        this.playButton.setClickCallback(this.OnPlayButtonClicked, this);

    };
    ResizeTableSection(newWidth, newHeight, newScale) {
        this.tableBase.setScale(newScale);
        this.tableBase.setPosition(newWidth / 2, newHeight / 2 - 150 * newScale);

        this.tablesText.setScale(newScale);
        this.tablesText.setPosition(this.tableBase.x, this.tableBase.y - 70 * newScale);

        this.tablesMessageText.setScale(newScale);
        this.tablesMessageText.setPosition(this.tableBase.x, this.tableBase.y + 5 * newScale);

        this.playButton.setScale(newScale);
        this.playButton.setPosition(this.tableBase.x, this.tableBase.y + 170 * newScale);
    }
    OnPlayButtonClicked() {
        this.scene.stop('DashboardScene');
        this.scene.start("ChooseTableScene");
    };
    //#endregion
    //----------------------------------------------------------------

    //#region - RESIZE ALL
    resize(newWidth, newHeight) {
        let newScale = Utils.getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);

        this.ResizeBg(newWidth, newHeight, newScale);
        this.ResizeTopBase(newWidth, newHeight, newScale);
        this.ResizeProfileHeading(newWidth, newHeight, newScale);
        this.ResizeBackButton(newWidth, newHeight, newScale);
        this.ResizeBalanceArea(newWidth, newHeight, newScale);
        this.ResizeSettingsButton(newWidth, newHeight, newScale);
        this.ResizeProfileSection(newWidth, newHeight, newScale);
        this.ResizeTournamentSection(newWidth, newHeight, newScale);
        this.ResizeTableSection(newWidth, newHeight, newScale);
        this.loadingPopup.resize(newWidth, newHeight, newScale);
        this.alertPopup.resize(newWidth, newHeight, newScale);
    };
    //#endregion
    //----------------------------------------------------------------

}