import { Model } from "../Model";
import { Timer } from "../Timer.js";

class Player {
    constructor(scene, _posX, _posY) {
        this.scene = scene;
        this.posX = _posX;
        this.posY = _posY;
        this.initialTime = 15;

        this.playerId = null;
        this.sittingIndex = null;
        this.isDelear = null;
        this.isSmallBlind = null;
        this.isBigBlind = null;
        this.smallBlindAmount = null;
        this.bigBlindAmount = null;
        this.positionIndex = null;

        this.isSitIn = null;
        this.isLeft = null;
        this.cardArray = [];

        this.seconds = 30;
        this.newScaleFactor = null;
        this.frontCardPosArray = [{ x: -90, y: -100, angle: -30 }, { x: -20, y: -125, angle: -10 }, { x: 50, y: -125, angle: 10 }, { x: 120, y: -95, angle: 30 }];
        this.frontCardArray = [];
        this.frontCardOutlineArray = [];

        // this.profileMaskConstantValueObj = {
        //     picGraphicsPosX: Math.round(this.scene.scale.width / 2),
        //     picGraphicsPosY: Math.round(this.scene.scale.height / 2)
        // };
        // this.nameSectionConstantValueObj = {
        //     nameBasePosX: 0,
        //     nameBasePosY: 65,
        //     fontName: "BAHNSCHRIFT",
        //     fontSize: '20px',
        //     color: '#fff',
        //     fontStyle: 'normal',
        //     align: 'center'
        // };
        // this.balanceSectionConstantValueObj = {
        //     nameBasePosX: 0,
        //     nameBasePosY: 65,
        //     fontName: "BAHNSCHRIFT",
        //     fontSize: '22px',
        //     color: '#fff',
        //     fontStyle: 'normal',
        //     align: 'center'
        // };

        this.CreatePlayer();
    };
    SetPlayerId(_id) {
        this.playerId = _id;
    };
    GetPlayerId() {
        return this.playerId;
    };

    SetPlayerPositionIndex(_index) {
        this.positionIndex = _index;
    };
    GetPlayerPositionIndex() {
        return this.positionIndex;
    };

    SetPlayerSittingIndex(_index) {
        this.sittingIndex = _index;
    };
    GetPlayerSittingIndex() {
        return this.sittingIndex;
    };

    SetSmallBlindAmount(_amount) {
        this.smallBlindAmount = _amount;
    };
    GetSmallBlindAmount() {
        return this.smallBlindAmount;
    };

    SetBigBlindAmount(_amount) {
        this.bigBlindAmount = _amount;
    };
    GetBigBlindAmount() {
        return this.bigBlindAmount;
    };

    //##########################################################

    CreatePlayer() {
        this.playerContainer = this.scene.add.container(this.posX, this.posY);
        this.CreateFrontCardSection();
        this.CreateCharacterSection();
        this.CreateBackCardSection();
        this.CreateNameSection();
        this.CreateBalanceSection();
        this.CreateDelearSection();
        this.CreateDecisionBaseSection();
        this.CreateSmallBlindSection();
        this.CreateBigBlindSection();
        this.CreateFoldText();
        this.CreateCurrentBetShowArea();
        this.CreateOfflineText();
        this.CreateTimer();

    };

    DestroyPlayer() {
        this.playerContainer.destroy();
    };

    CreateCharacterSection() {
        this.userBase = this.scene.add.image(0, 0, "user_base").setOrigin(0.5);
        this.userImage = this.scene.add.image(0, 0, "user_image").setOrigin(0.5);
        this.userRing = this.scene.add.image(0, 0, "user_ring").setOrigin(0.5);
        this.playerContainer.add([this.userBase, this.userImage, this.userRing,]);

        this.CreateProfileMask();
    };
    CreateProfileMask() {
        this.userPicGraphics = this.scene.add.graphics();
        this.userPicGraphics.fillStyle(0xfff, 0);
        this.userPicGraphics.fillCircle(0, 0, this.userBase.width / 2.1);
        this.userPicGraphics.setPosition(Math.round(this.scene.scale.width / 2), Math.round(this.scene.scale.height / 2));
        // this.userPicGraphics.setPosition(this.profileMaskConstantValueObj.picGraphicsPosX, this.profileMaskConstantValueObj.picGraphicsPosY);
        let mask = this.userPicGraphics.createGeometryMask();

        this.userImage.setMask(mask);
    };
    SetUserImage(_img) {
        this.userImage.loadTexture(_img);
    };

    CreateNameSection() {
        this.userNameBase = this.scene.add.image(0, 65, "user_name_base").setOrigin(0.5);
        // this.userNameBase = this.scene.add.image(this.nameSectionConstantValueObj.nameBasePosX, this.nameSectionConstantValueObj.nameBasePosY, "user_name_base").setOrigin(0.5);
        // let userNameTextStyle = {
        //     fontFamily: this.nameSectionConstantValueObj.fontName,
        //     fontSize: this.nameSectionConstantValueObj.fontSize,
        //     fill: this.nameSectionConstantValueObj.color,
        //     fontStyle: this.nameSectionConstantValueObj.fontStyle,
        //     align: this.nameSectionConstantValueObj.align,
        //     wordWrap: { width: this.userNameBase.width - 10 }
        // };
        let userNameTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '20px', fill: '#fff', fontStyle: 'normal', align: 'center', wordWrap: { width: this.userNameBase.width - 10 } };
        this.userNameText = this.scene.add.text(this.userNameBase.x, this.userNameBase.y, "", userNameTextStyle).setOrigin(0.5);
        this.playerContainer.add([this.userNameBase, this.userNameText]);
    };
    SetUserName(_name) {
        this.userNameText.setText(_name);
    };

    CreateBalanceSection() {
        this.userBalanceBase = this.scene.add.image(this.userNameBase.x + 15, this.userNameBase.y + 40, "user_balance_base").setOrigin(0.5);
        let userBalanceTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '22px', fill: '#fff', fontStyle: 'normal', align: 'center', wordWrap: { width: this.userBalanceBase.width - 10 } };
        this.userBalanceText = this.scene.add.text(this.userBalanceBase.x, this.userBalanceBase.y, "", userBalanceTextStyle).setOrigin(0.5);
        this.playerContainer.add([this.userBalanceBase, this.userBalanceText]);
    };
    SetUserBalance(_bal) {
        this.userBalanceText.setText(_bal);
    };

    //################## BACK CARD ###################
    CreateDelearSection() {
        this.userDelearBase = this.scene.add.image(this.userBase.x - 80, this.userBase.y, "user_delear_base").setOrigin(0.5);
        this.userDelearBase.setVisible(false);
        let delearTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '36px', fill: '#fff', fontStyle: 'bold', align: 'center' };
        this.delearText = this.scene.add.text(this.userDelearBase.x, this.userDelearBase.y, "D", delearTextStyle).setOrigin(0.5);
        this.playerContainer.add([this.userDelearBase, this.delearText]);

        this.ShowHideDelearIcon(false);
    };
    ShowHideDelearIcon(_status) {
        this.userDelearBase.setVisible(_status);
        this.delearText.setVisible(_status);
    };
    //######################################################

    //################## BACK CARD ###################
    CreateBackCardSection() {
        // this.userBackCard1 = this.scene.add.image(this.userBase.x + 115, this.userBase.y, "user_card_back").setOrigin(0.5);
        // this.userBackCard2 = this.scene.add.image(this.userBackCard1.x + 15, this.userBackCard1.y, "user_card_back").setOrigin(0.5);
        this.userBackCard1 = this.scene.add.sprite(this.userBase.x + 115, this.userBase.y, "card_spritesheet").setOrigin(0.5).setScale(0.4);
        this.userBackCard1.setFrame(52);
        this.userBackCard2 = this.scene.add.sprite(this.userBackCard1.x + 15, this.userBackCard1.y, "card_spritesheet").setOrigin(0.5).setScale(0.4);
        this.userBackCard2.setFrame(52);

        this.userBackCard1.setVisible(false);
        this.userBackCard2.setVisible(false);
        this.playerContainer.add([this.userBackCard1, this.userBackCard2]);
        this.ShowHideBackCard(false);
    };
    ShowHideBackCard(_status) {
        this.userBackCard1.setVisible(_status);
        this.userBackCard2.setVisible(_status);
    };
    //######################################################

    //################## FRONT CARD ###################
    CreateFrontCardSection() {
        for (let i = 0; i < 4; i++) {
            let card = this.scene.add.sprite(this.frontCardPosArray[i].x, this.frontCardPosArray[i].y, "card_spritesheet").setOrigin(0.5).setScale(0.5);
            card.setAngle(this.frontCardPosArray[i].angle);
            card.setVisible(false);
            card.setFrame(52);
            this.playerContainer.add(card);
            this.frontCardArray.push(card);

            let cardOutline = this.scene.add.sprite(this.frontCardPosArray[i].x, this.frontCardPosArray[i].y, "card_outline").setOrigin(0.5).setScale(0.5);
            cardOutline.setAngle(this.frontCardPosArray[i].angle);
            cardOutline.setVisible(false);
            this.playerContainer.add(cardOutline);
            this.frontCardOutlineArray.push(cardOutline);
        }
    };

    ShowHideFrontCard(_status) {
        console.log("show hide .............");
        this.HideOutline();
        for (let i = 0; i < this.frontCardArray.length; i++) {
            this.frontCardArray[i].setAlpha(1);
            this.frontCardArray[i].setVisible(_status);
        }
        this.RotateFrontCard();
    };

    SetCardValue(_cardDetails) {
        for (let i = 0; i < this.frontCardArray.length; i++) {
            let cardVal = Model.GetActualCardFrameIndex(_cardDetails[i].card_id);
            this.frontCardArray[i].setFrame(cardVal);
        }
    };

    RotateFrontCard() {
        let scaleTween1 = this.scene.add.tween({
            targets: this.frontCardArray,
            scaleX: 0,
            ease: 'Linear',
            duration: 200,
            callbackScope: this,
            onComplete: function () {
                let scaleTween = this.scene.add.tween({
                    targets: this.frontCardArray,
                    scaleX: 0.5,
                    ease: 'Linear',
                    duration: 200
                });
            }
        });
    };

    HighlightSelectedFrontCard(_targets) {
        console.log("_targets: ", _targets);
        this.frontCardOutlineArray[_targets].setVisible(true);
        let scaleTwn = this.scene.add.tween({
            targets: this.frontCardOutlineArray[_targets],
            scaleX: 0.53,
            scaleY: 0.53,
            ease: 'Linear',
            duration: 300,
            repeat: -1,
            yoyo: true
        });
    };

    UnselectedFrontCardWhenHighlight(_targets) {
        this.frontCardArray[_targets].setAlpha(0.5);
    };

    HideOutline() {
        for (let i = 0; i < this.frontCardOutlineArray.length; i++) {
            this.frontCardOutlineArray[i].setVisible(false);
        }
    };

    //######################################################

    //################## Decision Base ###################
    CreateDecisionBaseSection() {
        this.userDecisionBase = this.scene.add.image(this.userBase.x + 125, this.userBase.y - 70, "user_decision_base").setOrigin(0.5);
        this.userDecisionBase.setVisible(false);
        let decisionTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '30px', fill: '#fff', fontStyle: 'bold', align: 'center', wordWrap: { width: this.userDecisionBase.width - 10 } };
        this.decisionText = this.scene.add.text(this.userDecisionBase.x, this.userDecisionBase.y, "", decisionTextStyle).setOrigin(0.5);
        this.playerContainer.add([this.userDecisionBase, this.decisionText]);
        this.HideDecisionBase("");
    };
    ShowDecisionBase(_msg) {
        this.decisionText.setText(_msg);
        this.userDecisionBase.setVisible(true);
        this.decisionText.setVisible(true);
        let scaleTween = this.scene.add.tween({
            targets: [this.userDecisionBase, this.decisionText],
            scaleX: 1,
            scaleY: 1,
            ease: 'Linear',
            duration: 50,
            callbackScope: this,
            onComplete: function () {

            }
        });
    };
    HideDecisionBase() {
        let scaleTween = this.scene.add.tween({
            targets: [this.userDecisionBase, this.decisionText],
            scaleX: 0,
            scaleY: 0,
            ease: 'Linear',
            duration: 50,
            callbackScope: this,
            onComplete: function () {
                this.userDecisionBase.setVisible(false);
                this.decisionText.setVisible(false);
            }
        });
    };
    //######################################################

    //################## Small Blind ###################
    CreateSmallBlindSection() {
        this.smallBlindBase = this.scene.add.image(this.userBase.x - 130, this.userBase.y - 60, "small_blind_base").setOrigin(0.5);
        this.smallBlindBase.setVisible(false);
        let smallBlindAmountTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '30px', fill: '#fff', fontStyle: 'bold', align: 'center', wordWrap: { width: this.smallBlindBase.width - 10 } };
        this.smallBlindAmountText = this.scene.add.text(this.smallBlindBase.x + 15, this.smallBlindBase.y, this.smallBlindAmount, smallBlindAmountTextStyle).setOrigin(0.5);
        this.playerContainer.add([this.smallBlindBase, this.smallBlindAmountText]);
        this.ShowHideSmallBlind(false);
    };
    ShowHideSmallBlind(_status) {
        this.smallBlindBase.setVisible(_status);
        this.smallBlindAmountText.setText(this.smallBlindAmount);
        this.smallBlindAmountText.setVisible(_status);
    };
    //######################################################

    //################## Big Blind ###################
    CreateBigBlindSection() {
        this.bigBlindBase = this.scene.add.image(this.userBase.x - 130, this.userBase.y - 60, "big_blind_base").setOrigin(0.5);
        this.bigBlindBase.setVisible(false);
        let bigBlindAmountTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '30px', fill: '#fff', fontStyle: 'bold', align: 'center', wordWrap: { width: this.bigBlindBase.width - 10 } };
        this.bigBlindAmountText = this.scene.add.text(this.bigBlindBase.x + 15, this.bigBlindBase.y, this.bigBlindAmount, bigBlindAmountTextStyle).setOrigin(0.5);
        this.playerContainer.add([this.bigBlindBase, this.bigBlindAmountText]);
        this.ShowHideBigBlind(false);
    };
    ShowHideBigBlind(_status) {
        this.bigBlindBase.setVisible(_status);
        this.bigBlindAmountText.setText(this.bigBlindAmount);
        this.bigBlindAmountText.setVisible(_status);
    };
    //######################################################

    //################## Fold Text ###################
    CreateFoldText() {
        this.foldTextBase = this.scene.add.image(this.userBase.x, this.userBase.y, "user_decision_base").setOrigin(0.5);
        let foldTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '45px', fill: '#fff', fontStyle: 'bold', align: 'center', wordWrap: { width: this.foldTextBase.width - 10 } };
        this.foldText = this.scene.add.text(this.foldTextBase.x, this.foldTextBase.y, "FOLD", foldTextStyle).setOrigin(0.5);
        this.playerContainer.add([this.foldTextBase, this.foldText]);
        this.ShowHideFoldText(false)
    };

    ShowHideFoldText(_status) {
        this.foldTextBase.setVisible(_status);
        this.foldText.setVisible(_status);
    };
    //######################################################

    //################## Timer ###################
    CreateCurrentBetShowArea() {
        this.currentBetShowBase = this.scene.add.image(this.userBase.x - 140, this.userBase.y - 60, "user_decision_base").setOrigin(0.5);
        this.currentBetShowBase.setVisible(false);
        let currentBetShowTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '30px', fill: '#fff', fontStyle: 'bold', align: 'center', wordWrap: { width: this.currentBetShowBase.width - 10 } };
        this.currentBetShowText = this.scene.add.text(this.currentBetShowBase.x, this.currentBetShowBase.y, "", currentBetShowTextStyle).setOrigin(0.5);
        this.playerContainer.add([this.currentBetShowBase, this.currentBetShowText]);
        this.ShowHideCurrentBetShowArea(false, "");
    };
    ShowHideCurrentBetShowArea(_status, _amt) {
        this.currentBetShowBase.setVisible(_status);
        this.currentBetShowText.setText(_amt);
        this.currentBetShowText.setVisible(_status);
    };

    //######################################################

    //################## Offline Text ###################
    CreateOfflineText() {
        this.offlineTextBase = this.scene.add.image(this.userBase.x, this.userBase.y, "user_decision_base").setOrigin(0.5);
        let offlineTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '40px', fill: '#fff', fontStyle: 'bold', align: 'center', wordWrap: { width: this.offlineTextBase.width - 10 } };
        this.offlineText = this.scene.add.text(this.offlineTextBase.x, this.offlineTextBase.y, "OFFLINE", offlineTextStyle).setOrigin(0.5);
        this.playerContainer.add([this.offlineTextBase, this.offlineText]);
        this.ShowHideOfflineText(false);
    };

    ShowHideOfflineText(_status) {
        this.offlineTextBase.setVisible(_status);
        this.offlineText.setVisible(_status);
    };
    //######################################################

    //################## Timer ###################
    CreateTimer() {
        this.timer = new Timer(this.scene, this.posX, this.posY);
        let timeValueTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '50px', fill: '#00ff00', fontStyle: 'bold', align: 'center' };
        this.timeValueText = this.scene.add.text(0, 0, "", timeValueTextStyle).setOrigin(0.5);
        this.playerContainer.add(this.timeValueText);
        this.ShowHideTimer(false);
    };

    SetTimerValue(_sec) {
        this.timeValueText.setText(_sec);
    };
    ShowHideTimer(_status) {
        this.SetTimerValue("")
        this.timeValueText.setVisible(_status);
    };

    ShowGraphicsTimer(_totalTime) {
        this.timer.ShowTimer(_totalTime);
    };

    HideGraphicsTimer() {
        this.timer.HideTimer();
    };

    //######################################################

    FoldPlayer() {
        this.ShowHideFoldText(true);
        this.ShowHideFrontCard(false)
        this.playerContainer.setAlpha(0.8);
    };

    UnfoldPlayer() {
        this.ShowHideFoldText(false);
        this.ShowHideFrontCard(false)
        this.playerContainer.setAlpha(1);
    };

    InactivePlayer() {
        this.ShowHideOfflineText(true);
        this.ShowHideFrontCard(false)
        this.ShowHideBackCard(false);
        this.playerContainer.setAlpha(0.5);
    };

    ActivePlayer() {
        this.ShowHideOfflineText(false);
        this.ShowHideFrontCard(false);
        this.ShowHideBackCard(false);
        this.playerContainer.setAlpha(1);
    };


    resize(newWidth, newHeight, newScale) {
        this.playerContainer.setScale(newScale);
        // this.tableContainer.setPosition((newWidth - this.tableBg.width * newScale) / 2, (newHeight - this.tableBg.height * newScale) / 2);
        // this.playerContainer.setPosition((newWidth / 2), (newHeight / 1.45));
        this.playerContainer.setPosition(newWidth / 2 + this.posX * newScale, newHeight / 2 + this.posY * newScale);


        this.userPicGraphics.setScale(newScale);
        this.userPicGraphics.setPosition(newWidth / 2 + this.posX * newScale, newHeight / 2 + this.posY * newScale);

        this.timer.resize(newWidth, newHeight, newScale);

        this.newScaleFactor = newScale;
    };

}

export default Player;