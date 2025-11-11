import { Constant } from "../Constant.js";
import { Model } from "../Model.js";
import { Client } from "../services/Client.js";
import Button from "./Button.js";
import Text from "./Text.js";

class BottomPanel {
    constructor(scene) {
        this.scene = scene;

        this.minRange = null;
        this.maxRange = null;
        this.minVal = null;
        this.maxVal = null;
        this.checkOrCallButtonShowingStatus = null;
        this.allInButtonShowingStatus = null;

        this.raiseSliderConstantValueObj = {
            containerPosX: 740,
            containerPosY: 100,
            basePosX: 0,
            basePosY: 0,
            barPosX: 0,
            barPosY: -20,
            amountTextPosX: 10,
            amountTextPosY: 25,
            closeButtonPosX: 50,
            closeButtonPosY: 5,
            okButtonPosX: 50,
            okButtonPosY: 5,
            clampMinRange: 0,
            clampMaxRange: 1453,
            sliderMinVal: 2,
            sliderMaxVal: 150
        }

        this.create();
    };

    //#############################################################################################
    /**
     *
     */
    create() {
        this.CreateLeaveRoomButton();

        this.CreateFoldButton();
        this.CreateCallButton();
        this.CreateCheckButton();
        this.CreateRaiseButton();
        // this.CreateRaisePopup();
        this.CreateAllInButton();
        this.CreateRaiseSlider();
        this.SetRaiseMinMaxAmount(this.raiseSliderConstantValueObj.sliderMinVal, this.raiseSliderConstantValueObj.sliderMaxVal);

        this.HideAllBetButton();
    };


    HideAllBetButton() {
        this.HideFoldButton();
        this.HideCallButton();
        this.HideCheckButton();
        this.HideRaiseButton();
        this.HideAllInButton();
    };
    ShowAllBetButton() {
        this.ShowFoldButton();
        this.ShowRaiseButton();
    };

    ShowCheckOrCallButton(_status) {
        this.checkOrCallButtonShowingStatus = _status;
        if (_status) {
            this.ShowCheckButton();
            this.HideCallButton();
        } else {
            this.ShowCallButton();
            this.HideCheckButton();
        }
    };

    ShowAllInButtonForPlayer(_status) {
        this.allInButtonShowingStatus = _status;
        if (_status) {
            this.ShowAllInButton();
        } else {
            this.HideAllInButton();
        }
    };

    //=================== LEAVE ROOM BUTTON ================================

    CreateLeaveRoomButton() {
        this.leaveButton = new Button(this.scene, Math.round(this.scene.scale.width / 2), Math.round(this.scene.scale.height), "leave_button");
        this.leaveButton.setClickCallback(this.OnLeaveRoomButtonClicked, this);
    };

    OnLeaveRoomButtonClicked() {
        Client.LeaveRoom();
    };

    ResizeLeaveRoomButton(newWidth, newHeight, newScale) {
        this.leaveButton.setScale(newScale);
        this.leaveButton.setPosition(newWidth / 2 - (this.leaveButton.getWidth() * 15 * newScale), newHeight / 2 - (this.leaveButton.getHeight() * 5));
    };
    //#################################################################

    //=================== FOLD BUTTON ================================
    CreateFoldButton() {
        this.foldButton = new Button(this.scene, Math.round(this.scene.scale.width / 2), Math.round(this.scene.scale.height), "fold_button");
        this.foldButton.setClickCallback(this.OnFoldButtonClicked, this);
        this.foldButtonText = new Text(this.scene, this.foldButton.x, this.foldButton.y, {
            text: Constant.FOLD_TEXT,
            fontFamily: "BAHNSCHRIFT",
            fontSize: "40px",
            fontStyle: "bold",
            color: "#000",
            align: "center",
            wordWrap: {},
            shadow: {},
        }
        );
    };
    OnFoldButtonClicked() {
        this.foldButtonText.TextScaleTween();
        this.scene.currentBet = -1;
        this.scene.PlaceBetForCurrentPlayer();
        this.HideAllBetButton();

    };
    ResizeFoldButton(newWidth, newHeight, newScale) {
        this.foldButton.setScale(newScale);
        this.foldButton.setPosition(newWidth / 2 - (this.foldButton.getWidth() * 1.3), newHeight - (this.foldButton.getHeight()));

        this.foldButtonText.setScale(newScale);
        this.foldButtonText.setPosition(this.foldButton.x, this.foldButton.y);
    };

    ShowFoldButton() {
        this.foldButton.show();
        this.foldButton.enable();
        this.foldButtonText.show();
    };
    HideFoldButton() {
        this.foldButton.hide();
        this.foldButtonText.hide();
    };
    //#################################################################


    //=================== CALL BUTTON ================================
    CreateCallButton() {
        this.callButton = new Button(this.scene, Math.round(this.scene.scale.width / 2), Math.round(this.scene.scale.height), "call_button");
        this.callButton.setClickCallback(this.OnCallButtonClicked, this);
        this.callButtonText = new Text(this.scene, this.callButton.x, this.callButton.y, {
            text: Constant.CALL_TEXT,
            fontFamily: "BAHNSCHRIFT",
            fontSize: "40px",
            fontStyle: "bold",
            color: "#000",
            align: "center",
            wordWrap: {},
            shadow: {},
        }
        );
    };
    OnCallButtonClicked() {
        this.callButtonText.TextScaleTween();
        this.scene.PlaceBetForCurrentPlayer();
        this.HideAllBetButton();
    };
    ResizeCallButton(newWidth, newHeight, newScale) {
        this.callButton.setScale(newScale);
        this.callButton.setPosition(newWidth / 2, newHeight - (this.callButton.getHeight()));

        this.callButtonText.setScale(newScale);
        this.callButtonText.setPosition(this.callButton.x, this.callButton.y);
    };
    ShowCallButton() {
        this.callButton.show();
        this.callButton.enable();
        this.callButtonText.show();
    };
    HideCallButton() {
        this.callButton.hide();
        this.callButtonText.hide();
    };
    //#################################################################

    //=================== CHECK BUTTON ================================
    CreateCheckButton() {
        this.checkButton = new Button(this.scene, Math.round(this.scene.scale.width / 2), Math.round(this.scene.scale.height / 2), "check_button");
        this.checkButton.setClickCallback(this.OnCheckButtonClicked, this);
        this.checkButtonText = new Text(this.scene, this.checkButton.x, this.checkButton.y, {
            text: Constant.CHECK_TEXT,
            fontFamily: "BAHNSCHRIFT",
            fontSize: "40px",
            fontStyle: "bold",
            color: "#000",
            align: "center",
            wordWrap: {},
            shadow: {},
        }
        );
    };
    OnCheckButtonClicked() {
        this.checkButtonText.TextScaleTween();
        this.scene.PlaceBetForCurrentPlayer();
        this.HideAllBetButton();
    };
    ResizeCheckButton(newWidth, newHeight, newScale) {
        this.checkButton.setScale(newScale);
        this.checkButton.setPosition(newWidth / 2, newHeight - (this.checkButton.getHeight()));

        this.checkButtonText.setScale(newScale);
        this.checkButtonText.setPosition(this.checkButton.x, this.checkButton.y);
    };
    ShowCheckButton() {
        this.checkButton.show();
        this.checkButton.enable();
        this.checkButtonText.show();
    };
    HideCheckButton() {
        this.checkButton.hide();
        this.checkButtonText.hide();
    };
    //#################################################################

    //=================== RAISE BUTTON ================================
    CreateRaiseButton() {
        this.raiseButton = new Button(this.scene, Math.round(this.scene.scale.width / 2), Math.round(this.scene.scale.height / 2), "raise_button");
        this.raiseButton.setClickCallback(this.OnRaiseButtonClicked, this);
        this.raiseButtonText = new Text(this.scene, this.raiseButton.x, this.raiseButton.y, {
            text: Constant.RAISE_TEXT,
            fontFamily: "BAHNSCHRIFT",
            fontSize: "40px",
            fontStyle: "bold",
            color: "#000",
            align: "center",
            wordWrap: {},
            shadow: {},
        }
        );
    };
    OnRaiseButtonClicked() {
        this.raiseButtonText.TextScaleTween();
        this.HideAllBetButton();
        this.ShowRaiseSlider();
    };
    ResizeRaiseButton(newWidth, newHeight, newScale) {
        this.raiseButton.setScale(newScale);
        this.raiseButton.setPosition(newWidth / 2 + (this.raiseButton.getWidth() * 1.3), newHeight - (this.raiseButton.getHeight()));

        this.raiseButtonText.setScale(newScale);
        this.raiseButtonText.setPosition(this.raiseButton.x, this.raiseButton.y);
    };

    ShowRaiseButton() {
        this.raiseButton.show();
        this.raiseButton.enable();
        this.raiseButtonText.show();
    };
    HideRaiseButton() {
        this.raiseButton.hide();
        this.raiseButtonText.hide();
    };
    //#################################################################

    //=================== RAISE SLIDER POPUP ================================
    SetRaiseMinMaxAmount(_minAmt, _maxAmt) {
        this.minRange = this.raiseSliderConstantValueObj.clampMinRange;
        this.maxRange = this.raiseSliderConstantValueObj.clampMaxRange;
        this.minVal = _minAmt;
        this.maxVal = _maxAmt;
        this.limitParam = (this.maxRange - this.minRange) / (this.maxVal - this.minVal);

        this.raiseAmountText.setText(this.minVal);
    };
    CreateRaiseSlider() {
        this.sliderContainer = this.scene.add.container(0, 0);
        this.raiseSliderBase = this.scene.add.image(this.raiseSliderConstantValueObj.basePosX, this.raiseSliderConstantValueObj.basePosY, "raise_base").setOrigin(0);
        this.raiseSliderBar = this.scene.add.image(this.raiseSliderConstantValueObj.barPosX, this.raiseSliderConstantValueObj.barPosY, "raise_bar").setOrigin(0);
        this.raiseSliderBar.setInteractive({ draggable: true });

        let raiseAmountTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '30px', fill: '#fff', fontStyle: 'normal', align: 'center' };
        this.raiseAmountText = this.scene.add.text(this.raiseSliderBar.x + this.raiseSliderConstantValueObj.amountTextPosX, this.raiseSliderBar.y - this.raiseSliderConstantValueObj.amountTextPosY, this.minVal, raiseAmountTextStyle).setOrigin(0.5);

        this.sliderContainer.add([this.raiseSliderBase, this.raiseSliderBar, this.raiseAmountText]);

        this.scene.input.on('drag', (pointer, gameObject, dragX) => {
            dragX = Phaser.Math.Clamp(dragX, this.minRange, this.maxRange);
            this.raiseAmount = (dragX / this.limitParam) - (this.minRange / this.limitParam);
            this.raiseAmountText.setText(parseInt(this.raiseAmount + this.minVal));

            gameObject.x = Math.round(dragX);;
            this.raiseAmountText.x = this.raiseSliderConstantValueObj.amountTextPosX + Math.round(dragX);;
        });

        this.raiseSliderCloseButton = new Button(this.scene, 0, 0, "raise_popup_cross_button");
        this.raiseSliderCloseButton.setClickCallback(this.OnRaiseSliderCloseButtonClicked, this);

        this.raiseSliderOkButton = new Button(this.scene, 0, 0, "raise_popup_correct_button");
        this.raiseSliderOkButton.setClickCallback(this.OnRaiseSliderOkButtonClicked, this);

        this.HideRaiseSlider();
    };
    OnRaiseSliderCloseButtonClicked() {
        this.HideRaiseSlider();
        this.ShowAllBetButton();
        this.ShowCheckOrCallButton(this.checkOrCallButtonShowingStatus);
        this.ShowAllInButtonForPlayer(this.allInButtonShowingStatus);
    };
    OnRaiseSliderOkButtonClicked() {
        this.HideRaiseSlider();
        this.scene.currentBet += parseInt(this.raiseAmount + this.minVal);
        this.scene.PlaceBetForCurrentPlayer();
    };

    ShowRaiseSlider() {
        this.sliderContainer.setVisible(true);
        this.raiseSliderCloseButton.show();
        this.raiseSliderOkButton.show();
        this.raiseSliderCloseButton.enable();
        this.raiseSliderOkButton.enable();
    };

    HideRaiseSlider() {
        this.sliderContainer.setVisible(false);
        this.raiseSliderCloseButton.hide();
        this.raiseSliderOkButton.hide();
    };

    ResizeRaiseSlider(newWidth, newHeight, newScale) {
        this.sliderContainer.setScale(newScale);
        this.sliderContainer.setPosition((newWidth / 2 - this.raiseSliderConstantValueObj.containerPosX * newScale), (newHeight - this.raiseSliderConstantValueObj.containerPosY * newScale));

        this.raiseSliderCloseButton.setScale(newScale);
        this.raiseSliderCloseButton.setPosition(this.sliderContainer.x - this.raiseSliderConstantValueObj.closeButtonPosX * newScale, this.sliderContainer.y + this.raiseSliderConstantValueObj.closeButtonPosY * newScale);

        this.raiseSliderOkButton.setScale(newScale);
        this.raiseSliderOkButton.setPosition(this.sliderContainer.x + (this.raiseSliderBase.width + this.raiseSliderConstantValueObj.okButtonPosX) * newScale, this.sliderContainer.y + this.raiseSliderConstantValueObj.okButtonPosY * newScale);
    };

    // CreateRaisePopup() {
    //     this.raisePopupBase = this.scene.add.image(this.raiseButton.x, this.raiseButton.y, "raise_popup_base").setOrigin(0.5);
    //     this.raisedAmountText = new Text(this.scene, this.raisePopupBase.x, this.raisePopupBase.y, {
    //         text: this.currentRaiseAmount,
    //         fontFamily: "BAHNSCHRIFT",
    //         fontSize: "32px",
    //         fontStyle: "bold",
    //         color: "#fff",
    //         align: "center",
    //         wordWrap: {},
    //         shadow: {},
    //     });

    //     this.raisePopupCloseButton = new Button(this.scene, this.raisePopupBase.x, this.raisePopupBase.y, "raise_popup_cross_button");
    //     this.raisePopupCloseButton.setClickCallback(this.OnRaisePopupCloseButtonClicked, this);

    //     this.raisePopupCorrectButton = new Button(this.scene, this.raisePopupBase.x, this.raisePopupBase.y, "raise_popup_correct_button");
    //     this.raisePopupCorrectButton.setClickCallback(this.OnRaisePopupCorrectButtonClicked, this);

    //     this.raisePopupMinusButton = new Button(this.scene, this.raisePopupBase.x, this.raisePopupBase.y, "raise_popup_minus_button");
    //     this.raisePopupMinusButton.setClickCallback(this.OnRaisePopupMinusButtonClicked, this);

    //     this.raisePopupPlusButton = new Button(this.scene, this.raisePopupBase.x, this.raisePopupBase.y, "raise_popup_plus_button");
    //     this.raisePopupPlusButton.setClickCallback(this.OnRaisePopupPlusButtonClicked, this);

    //     this.raisePopupBase.setVisible(false);
    //     this.raisedAmountText.hide();
    //     this.raisePopupMinusButton.hide();
    //     this.raisePopupPlusButton.hide();
    //     this.raisePopupCloseButton.hide();
    //     this.raisePopupCorrectButton.hide();

    // };

    // SetCurrentRaiseAmount(_amount) {
    //     this.lowRaiseAmount = _amount;
    //     this.currentRaiseAmount = _amount;
    //     this.raisedAmountText.setText(this.currentRaiseAmount);
    // };

    // SetCurrentHighestRaiseAmount(_amount) {
    //     this.highRaiseAmount = _amount;
    // };

    // IncrementRaiseAmount(_amt) {
    //     this.currentRaiseAmount += _amt;
    //     this.raisedAmountText.setText(this.currentRaiseAmount);
    //     if (this.currentRaiseAmount >= this.highRaiseAmount) {
    //         this.raisedAmountText.setText("All In");
    //         this.raisePopupPlusButton.disable();
    //     } else {
    //         this.raisePopupMinusButton.enable();

    //     }
    // };
    // DecrementRaiseAmount(_amt) {
    //     this.currentRaiseAmount -= _amt;
    //     this.raisedAmountText.setText(this.currentRaiseAmount);
    //     if (this.currentRaiseAmount <= this.lowRaiseAmount) {
    //         this.raisePopupMinusButton.disable();
    //     } else {
    //         this.raisePopupPlusButton.enable();

    //     }
    // };

    // DefaultShowPlusMinusButton() {
    //     if (this.currentRaiseAmount == this.lowRaiseAmount) {
    //         this.raisePopupMinusButton.disable();
    //     } else if (this.currentRaiseAmount == this.highRaiseAmount) {
    //         this.raisePopupPlusButton.disable();
    //     }
    //     else {
    //         this.raisePopupPlusButton.enable();
    //         this.raisePopupMinusButton.enable();
    //     }
    // };

    // OnRaisePopupPlusButtonClicked() {
    //     this.IncrementRaiseAmount(1);
    // };
    // OnRaisePopupMinusButtonClicked() {
    //     this.DecrementRaiseAmount(1);
    // };

    // OnRaisePopupCloseButtonClicked() {
    //     this.HideRaisePopup();
    // };
    // OnRaisePopupCorrectButtonClicked() {
    //     this.scene.currentBet = this.currentRaiseAmount;
    //     this.scene.PlaceBetForCurrentPlayer();
    //     this.HideRaisePopup();
    //     this.HideAllBetButton();
    // }

    // ShowRaisePopup() {
    //     this.raisePopupBase.setVisible(true);
    //     this.raisedAmountText.show();
    //     this.raisePopupMinusButton.show();
    //     this.raisePopupPlusButton.show();
    //     this.raisePopupCloseButton.show();
    //     this.raisePopupCorrectButton.show();
    //     this.raisePopupCloseButton.enable();
    //     this.raisePopupCorrectButton.enable();
    //     this.scene.tweens.add({
    //         targets: [this.raisePopupBase, this.raisedAmountText, this.raisePopupMinusButton, this.raisePopupPlusButton, this.raisePopupCloseButton, this.raisePopupCorrectButton],
    //         alpha: 1,
    //         ease: 'Linear',
    //         duration: 200,
    //         callbackScope: this,
    //         onComplete: function (tween) {
    //             this.DefaultShowPlusMinusButton();
    //         }
    //     });
    // };
    // HideRaisePopup() {
    //     this.willRaisePopupShow = false;
    //     this.scene.tweens.add({
    //         targets: [this.raisePopupBase, this.raisedAmountText, this.raisePopupMinusButton, this.raisePopupPlusButton, this.raisePopupCloseButton, this.raisePopupCorrectButton],
    //         alpha: 0,
    //         ease: 'Linear',
    //         duration: 200,
    //         callbackScope: this,
    //         onComplete: function (tween) {
    //             this.raisePopupBase.setVisible(false);
    //             this.raisedAmountText.hide();
    //             this.raisePopupMinusButton.hide();
    //             this.raisePopupPlusButton.hide();
    //             this.raisePopupCloseButton.hide();
    //             this.raisePopupCorrectButton.hide();
    //             this.raiseButton.enable();
    //         }
    //     });
    // };
    // ResizeRaisePopup(newWidth, newHeight, newScale) {
    //     this.raisePopupBase.setScale(newScale);
    //     this.raisePopupBase.setPosition(this.raiseButton.x, this.raiseButton.y - (this.raisePopupBase.height * 1.6) * newScale);

    //     this.raisedAmountText.setScale(newScale);
    //     this.raisedAmountText.setPosition(this.raisePopupBase.x, this.raisePopupBase.y);

    //     this.raisePopupMinusButton.setScale(newScale);
    //     this.raisePopupMinusButton.setPosition(this.raisePopupBase.x - (this.raisePopupBase.width / 1.9 + this.raisePopupMinusButton.getWidth()) * newScale, this.raisePopupBase.y);

    //     this.raisePopupPlusButton.setScale(newScale);
    //     this.raisePopupPlusButton.setPosition(this.raisePopupBase.x + (this.raisePopupBase.width / 1.8 + this.raisePopupMinusButton.getWidth()) * newScale, this.raisePopupBase.y);

    //     this.raisePopupCloseButton.setScale(newScale);
    //     this.raisePopupCloseButton.setPosition(this.raisePopupBase.x - (this.raisePopupBase.width / 3 + this.raisePopupCloseButton.getWidth()) * newScale, this.raisePopupBase.y - 70 * newScale);

    //     this.raisePopupCorrectButton.setScale(newScale);
    //     this.raisePopupCorrectButton.setPosition(this.raisePopupBase.x + (this.raisePopupBase.width / 3 + this.raisePopupCorrectButton.getWidth()) * newScale, this.raisePopupBase.y - 70 * newScale);
    // };
    //#################################################################

    //=================== ALL IN BUTTON ================================
    CreateAllInButton() {
        this.allInButton = new Button(this.scene, Math.round(this.scene.scale.width / 2), Math.round(this.scene.scale.height), "fold_button");
        this.allInButton.setClickCallback(this.OnAllInButtonClicked, this);
        this.allInButtonText = new Text(this.scene, this.allInButton.x, this.allInButton.y, {
            text: Constant.ALL_IN_TEXT,
            fontFamily: "BAHNSCHRIFT",
            fontSize: "40px",
            fontStyle: "bold",
            color: "#000",
            align: "center",
            wordWrap: {},
            shadow: {},
        }
        );
    };
    OnAllInButtonClicked() {
        this.allInButtonText.TextScaleTween();
        this.scene.PlaceBetForCurrentPlayer();
        this.HideAllBetButton();
    };
    ResizeAllInButton(newWidth, newHeight, newScale) {
        this.allInButton.setScale(newScale);
        this.allInButton.setPosition(newWidth / 2 + (this.allInButton.getWidth() * 2.6), newHeight - (this.allInButton.getHeight()));
        this.allInButtonText.setScale(newScale);
        this.allInButtonText.setPosition(this.allInButton.x, this.allInButton.y);
    };

    ShowAllInButton() {
        this.allInButton.show();
        this.allInButton.enable();
        this.allInButtonText.show();
    };
    HideAllInButton() {
        this.allInButton.hide();
        this.allInButtonText.hide();
    };
    //#################################################################


    //=================== XX XX ================================

    //#################################################################



    resize(newWidth, newHeight, newScale) {
        this.ResizeLeaveRoomButton(newWidth, newHeight, newScale)
        this.ResizeFoldButton(newWidth, newHeight, newScale);
        this.ResizeCallButton(newWidth, newHeight, newScale);
        this.ResizeCheckButton(newWidth, newHeight, newScale);
        this.ResizeRaiseButton(newWidth, newHeight, newScale);
        // this.ResizeRaisePopup(newWidth, newHeight, newScale);
        this.ResizeAllInButton(newWidth, newHeight, newScale);
        this.ResizeRaiseSlider(newWidth, newHeight, newScale);
    };

};

export default BottomPanel;