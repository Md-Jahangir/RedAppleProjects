import Phaser from "phaser";
import { Constant } from "../Constant.js";
import { SelectedResolution } from "../ResolutionSelector.js";
import { Utils } from "../Utils.js";
import Button from "../ui/Button.js";
import Text from "../ui/Text.js";
import TableCategory from "../ui/TableCategory.js";
import { Server } from "../services/Server.js";
import AlertPopup from "../popup/AlertPopup.js";
import BuyInPopup from "../popup/BuyInPopup.js";
import LoadingPopup from "../popup/LoadingPopup.js";
import { Model } from "../Model.js";
export default class ChooseTableScene extends Phaser.Scene {

    constructor() {
        super("ChooseTableScene");
        this.currentScale = null;
        // this.currentWidth = null;
        // this.currentHeight = null;
        this.tableCategoryArray = [];
        this.tableCategoryContainer = null;
        this.numberOfTables = null;
        this.themes = [];
        this.prime = 0;
        this.animationSpeed = 200;
        this.totalThemes = null;
        this.alertPopup = null;
        this.loadingPopup = null;
        this.buyInPopup = null;
        this.tableDetailsData = null;

        this.pageNum = 1;
        this.pageLimit = 10;
        this.tableType = "No Limit";
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
        this.CreateNLHPLHSection();
        this.CreateLeftArrowButton();
        this.CreateRightArrowButton();

        this.loadingPopup = new LoadingPopup(this);
        this.alertPopup = new AlertPopup(this);
        this.buyInPopup = new BuyInPopup(this);

        this.resize(window.innerWidth, window.innerHeight);

        await this.SetUserDetailsFromServer();
        await this.GetTableDetailsFromServer();
    };
    //#endregion
    //----------------------------------------------------------------

    async SetUserDetailsFromServer() {
        this.loadingPopup.ShowLoadingPopup();
        try {
            let response = await Server.GetUserDetailsApi();
            console.log("user details response Choose Table: ", response);

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
                this.loadingPopup.HideLoadingPopup();
                this.alertPopup.ShowAlertPopup(response.message);
            }

        } catch (err) {
            console.log("user err : ", err);
            this.loadingPopup.HideLoadingPopup();
            this.alertPopup.ShowAlertPopup(err.message);
        }
    };

    async GetTableDetailsFromServer() {
        this.loadingPopup.ShowLoadingPopup();
        try {
            let response = await Server.GetTableDetailsApi(this.pageNum, this.pageLimit, this.tableType);
            console.log("table details response : ", response);
            if (!response.err) {
                this.numberOfTables = response.data.tables.length;
                await this.CreateTables(this.tableType, response.data);
                this.DefaultArrowButtonEnableDisable();
                this.loadingPopup.HideLoadingPopup();
            } else {
                this.loadingPopup.HideLoadingPopup();
                this.alertPopup.ShowAlertPopup(response.message);
            }
        } catch (err) {
            console.log("tabl err : ", err);

            this.loadingPopup.HideLoadingPopup();
            this.alertPopup.ShowAlertPopup(err.message);
        }
    };

    // async GetGameLaunchUrl(_buyInAmt) {
    //     this.loadingPopup.ShowLoadingPopup();
    //     try {
    //         let response = await Server.GetGameLaunchUrlApi(this.tableDetailsData.tableId, _buyInAmt);
    //         console.log("game launch response : ", response);
    //         if (!response.err) {
    //             await this.SetValueFromQueryParameter(_buyInAmt);
    //             if (response.data.uri != "") {
    //                 this.scene.stop('ChooseTableScene');
    //                 this.scene.start("GameScene");
    //                 this.loadingPopup.HideLoadingPopup();
    //             }
    //         } else {
    //             this.loadingPopup.HideLoadingPopup();
    //             this.alertPopup.ShowAlertPopup(response.message);
    //         }
    //     } catch (err) {
    //         this.loadingPopup.HideLoadingPopup();
    //         this.alertPopup.ShowAlertPopup(err.message);
    //     }
    // };

    // async SetValueFromQueryParameter(_buyInAmt) {
    //     Model.SetTableId(this.tableDetailsData.tableId);
    //     Model.SetBuyInAmount(_buyInAmt);
    //     Model.SetMaxPlayersCount(this.tableDetailsData.totalPlayerCount);
    //     Model.SetSmallBlindAmount(this.tableDetailsData.smallBlindAmount);
    //     Model.SetBigBlindAmount(this.tableDetailsData.bigBlindAmount);
    // };

    ShowBuyInPopup(_data) {
        this.tableDetailsData = _data
        this.buyInPopup.ShowBuyInPopup(this.tableDetailsData);
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
        this.heading = this.add.image(0, 0, "choose_table_heading").setOrigin(0.5);
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
        this.scene.stop('ChooseTableScene');
        this.scene.start("DashboardScene");
    };
    //#endregion
    //----------------------------------------------------------------

    //#region - CREATE BALANCE AREA
    CreateBalanceArea() {
        this.balanceBase = this.add.image(0, 0, "balance_base")
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
        this.userRing = this.add.image(this.userBase.x, this.userBase.y, "user_ring").setOrigin(0.5).setScale(0.55);
        let userNameTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '36px', fill: '#fff', fontStyle: 'normal', align: 'left' };
        this.userNameText = this.add.text(this.userBase.x + 70, this.userBase.y - 5, "Your Name", userNameTextStyle).setOrigin(0, 0.5);

        this.profileContainer.add([this.userBase, this.userImage, this.userRing, this.userNameText]);

        // this.CreateProfileMask();
    };
    OnProfilePicPressed() {
        console.log("Goto Profile  page");
        this.scene.stop('ChooseTableScene');
        this.scene.start("UserProfileScene", { fromScene: 'ChooseTableScene' });
    };
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

    //#region - NLP PLH SELECT SECTION
    CreateNLHPLHSection() {
        this.nlhPlhbase = this.add.image(0, 0, "nlh_plh_base").setOrigin(0.5);

        this.nlhButton = new Button(this, Math.round(this.scale.width / 2), Math.round(this.scale.height / 2), "nlh_plh_button");
        this.nlhButton.setClickCallback(this.OnNLHButtonClicked, this);

        this.nlhButtonText = new Text(this, this.nlhButton.x, this.nlhButton.y, {
            text: Constant.NLH_TEXT,
            fontFamily: "BAHNSCHRIFT",
            fontSize: "40px",
            fontStyle: "bold",
            color: "#fb4d4c",
            align: "center",
            wordWrap: {},
            shadow: {},
        }
        );

        this.plhButton = new Button(this, Math.round(this.scale.width / 2), Math.round(this.scale.height / 2), "nlh_plh_button");
        this.plhButton.setClickCallback(this.OnPLHButtonClicked, this);
        this.plhButtonText = new Text(this, this.plhButton.x, this.plhButton.y, {
            text: Constant.PLH_TEXT,
            fontFamily: "BAHNSCHRIFT",
            fontSize: "40px",
            fontStyle: "bold",
            color: "#fb4d4c",
            align: "center",
            wordWrap: {},
            shadow: {},
        }
        );
        this.plhButton.FlipButtonXAxis();

        this.selectedArrow = this.add.image(0, 0, "selected_arrow").setOrigin(0.5);

        this.SetDefaultSelectedButton();
    };
    SetDefaultSelectedButton() {
        this.nlhButton.DisableClick();
        this.plhButton.SetOpacityDown();
        this.plhButtonText.disable();
    };
    async OnNLHButtonClicked() {
        this.tableType = "No Limit";

        this.nlhButtonText.TextScaleTween();
        this.EnableButton(this.plhButton, this.plhButtonText);
        this.DisableButton(this.nlhButton, this.nlhButtonText);
        this.ShiftSelectedArrow(this.nlhButton);
        await this.GetTableDetailsFromServer();
        this.resize(window.innerWidth, window.innerHeight);
    };
    async OnPLHButtonClicked() {
        this.tableType = "Pot Limit";

        this.plhButtonText.TextScaleTween();
        this.EnableButton(this.nlhButton, this.nlhButtonText);
        this.nlhButton.EnableClick();
        this.DisableButton(this.plhButton, this.plhButtonText);
        this.ShiftSelectedArrow(this.plhButton);
        await this.GetTableDetailsFromServer();
        this.resize(window.innerWidth, window.innerHeight);
    };
    EnableButton(_bttn, _txt) {
        _bttn.enable();
        _txt.disable();
        _bttn.SetOpacityDown();
    };
    DisableButton(_bttn, _txt) {
        _bttn.disable();
        _txt.enable();
        setTimeout(() => {
            _bttn.SetOpacityUp();
        }, 100);
    };
    ShiftSelectedArrow(_bttn) {
        this.selectedArrow.setPosition(_bttn.x, _bttn.y + 62 * this.currentScale);
    };
    ResizeNLHPLHSection(newWidth, newHeight, newScale) {
        this.nlhPlhbase.setScale(newScale);
        this.nlhPlhbase.setPosition(this.topBase.x, this.topBase.y + this.topBase.displayHeight * 1.5);

        this.nlhButton.setScale(newScale);
        this.nlhButton.setPosition(this.nlhPlhbase.x - 164 * newScale, this.nlhPlhbase.y);

        this.nlhButtonText.setScale(newScale);
        this.nlhButtonText.setPosition(this.nlhButton.x, this.nlhButton.y);

        this.plhButton.setScale(newScale);
        this.plhButton.setPosition(this.nlhPlhbase.x + 164 * newScale, this.nlhPlhbase.y);

        this.plhButtonText.setScale(newScale);
        this.plhButtonText.setPosition(this.plhButton.x, this.plhButton.y);

        this.selectedArrow.setScale(newScale);
        this.selectedArrow.setPosition(this.nlhButton.x, this.nlhButton.y + 62 * newScale);
    };

    //#endregion
    //----------------------------------------------------------------

    ResetTableCategory() {
        this.tableCategoryContainer = null;
        for (let i = 0; i < this.tableCategoryArray.length; i++) {
            this.tableCategoryArray[i].Destroy();
        }
        this.tableCategoryArray = [];
    }

    async CreateTables(_type, _data) {
        console.log("TAble _type: ", _type);

        this.ResetTableCategory();

        this.tableCategoryContainer = this.add.container(0, 0);
        this.startXPos = -635//-610;
        this.startYPos = 60;
        this.gapX = 635;
        this.currentIndex = 0;
        this.dragStartX = null;
        this.containerOffset = null;

        let imageName = null;
        if (_type == "No Limit") {
            imageName = "nlh_table";
        } else if (_type == "Pot Limit") {
            imageName = "plh_table";
        }

        for (let i = 0; i < this.numberOfTables; i++) {
            let leftRightScale = (i == 1) ? 1 : 0.75;
            let table = new TableCategory(this, this.startXPos + (i * this.gapX), this.startYPos, leftRightScale, imageName);
            this.tableCategoryArray.push(table);
            this.tableCategoryContainer.add(table.tableContainer);
        }

        this.SetTablesValue(_data);
        this.resize(window.innerWidth, window.innerHeight);
    };

    SetTablesValue(_data) {
        this.tableCategoryArray.forEach((element, index) => {
            element.tableId = _data.tables[index].table_id;
            element.SetGameType(_data.tables[index].potType);
            element.SetTableName(_data.tables[index].tablename.toUpperCase());
            element.SetBlindsCount(_data.tables[index].small_blind, _data.tables[index].big_blind);
            element.SetPlayerCount(_data.tables[index].maxPlayers);
            element.SetTableAmount(_data.tables[index].minBuyIn, _data.tables[index].maxBuyIn);
        });
    };

    MoveCarousel(direction) {
        this.currentIndex += direction;
        if (this.currentIndex < 0) {
            this.currentIndex = 0;
        } else if (this.currentIndex >= this.numberOfTables) {
            this.currentIndex = this.numberOfTables - 1;
        }
        // console.log("this.currentIndex after: ", this.currentIndex);

        this.UpdateCarousel();
    };

    UpdateCarousel() {
        // this.nlhTableCategoryArray.forEach((table, index) => {
        this.tableCategoryArray.forEach((table, index) => {
            let targetX = (index - this.currentIndex) * (this.gapX * this.currentScale) + this.containerOffset;
            // let targetX = (((index - this.currentIndex) * this.gapX) * this.currentScale) + this.containerOffset;
            this.tweens.add({
                targets: table.tableContainer,
                x: targetX,
                duration: 300,
                ease: 'Power2'
            });

            // let targetScale = (index === this.currentIndex + 1) ? 1 * this.currentScale : 0.75 * this.currentScale;
            let targetScale = (index === this.currentIndex + 1) ? 1 * this.currentScale : 0.75 * this.currentScale;
            this.tweens.add({
                targets: table.tableContainer,
                scale: targetScale,
                duration: 300,
                ease: 'Power2'
            });
        });
    };

    CreateLeftArrowButton() {
        this.leftArrowButton = new Button(this, Math.round(this.scale.width / 2), Math.round(this.scale.height / 2), "arrow_button");
        this.leftArrowButton.setClickCallback(this.OnLeftArrowButtonClicked, this);
        this.leftArrowButton.FlipButtonXAxis();
        this.leftArrowButton.setDepth(1);
    };
    ResizeLeftArrowButton(newWidth, newHeight, newScale) {
        this.leftArrowButton.setScale(newScale);
        this.leftArrowButton.setPosition(50 * newScale, newHeight / 2 + 60 * newScale);

    };
    OnLeftArrowButtonClicked() {
        this.MoveCarousel(-1);
        if (this.currentIndex == 0 && this.numberOfTables >= 3) {
            this.leftArrowButton.disable();
            this.rightArrowButton.enable();
        } else if (this.currentIndex > 0) {
            this.rightArrowButton.enable();
        } else {
            this.leftArrowButton.enable();
        }
    };

    CreateRightArrowButton() {
        this.rightArrowButton = new Button(this, Math.round(this.scale.width / 2), Math.round(this.scale.height / 2), "arrow_button");
        this.rightArrowButton.setClickCallback(this.OnRightArrowButtonClicked, this);
        this.rightArrowButton.setDepth(1);
    };
    ResizeRightArrowButton(newWidth, newHeight, newScale) {
        this.rightArrowButton.setScale(newScale);
        this.rightArrowButton.setPosition(newWidth - 50 * newScale, newHeight / 2 + 60 * newScale);
    };

    OnRightArrowButtonClicked() {
        this.MoveCarousel(1);
        if (this.currentIndex > 0 && this.currentIndex < this.numberOfTables - 3) {
            this.leftArrowButton.enable();
        }
        else {
            this.leftArrowButton.enable();
            this.rightArrowButton.disable();
        }
    };

    DefaultArrowButtonEnableDisable() {
        if (this.currentIndex == 0 && this.numberOfTables <= 3) {
            // this.rightArrowButton.enable();
            this.rightArrowButton.disable();
            this.leftArrowButton.disable();
        } else if (this.currentIndex > 0) {
            this.rightArrowButton.enable();
            this.leftArrowButton.enable();
        } else if (this.currentIndex < this.numberOfTables - 3) {
            // this.rightArrowButton.disable();
            // this.leftArrowButton.enable();
            this.rightArrowButton.enable();
            this.leftArrowButton.disable();
        }
    }

    OnPlayButtonPressed() {
        console.log("Go to gameplay page");
    };

    //#region - RESIZE ALL
    resize(newWidth, newHeight) {
        let newScale = Utils.getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);
        this.currentScale = newScale;
        // this.currentWidth = newWidth;
        // this.currentHeight = newHeight;
        this.ResizeBg(newWidth, newHeight, newScale);
        this.ResizeTopBase(newWidth, newHeight, newScale);
        this.ResizeProfileHeading(newWidth, newHeight, newScale);
        this.ResizeBackButton(newWidth, newHeight, newScale);
        this.ResizeBalanceArea(newWidth, newHeight, newScale);
        this.ResizeSettingsButton(newWidth, newHeight, newScale);
        this.ResizeProfileSection(newWidth, newHeight, newScale);
        this.ResizeNLHPLHSection(newWidth, newHeight, newScale);

        for (let i = 0; i < this.tableCategoryArray.length; i++) {
            this.tableCategoryArray[i].resize(newWidth, newHeight, newScale);
            this.containerOffset = this.tableCategoryArray[0].tableContainer.x;
            // console.log("this.containerOffset: ", this.containerOffset);

        }
        // this.tableCategoryContainer.setScale(newScale);
        // this.tableCategoryContainer.setPosition(0, 0);
        // for (let i = 0; i < this.nlhTableCategoryArray.length; i++) {
        //     this.nlhTableCategoryArray[i].resize(newWidth, newHeight, newScale);
        //     this.containerOffset = this.nlhTableCategoryArray[0].tableContainer.x;
        // }

        this.ResizeLeftArrowButton(newWidth, newHeight, newScale);
        this.ResizeRightArrowButton(newWidth, newHeight, newScale);
        this.loadingPopup.resize(newWidth, newHeight, newScale);
        this.alertPopup.resize(newWidth, newHeight, newScale);
        this.buyInPopup.resize(newWidth, newHeight, newScale);

        this.currentIndex = 0;
        this.DefaultArrowButtonEnableDisable();
    };


    //#endregion
    //----------------------------------------------------------------


}