import Button from "../ui/Button.js";
import { Server } from "../services/Server.js";
// import LoadingPopup from "./LoadingPopup.js";
class BuyInPopup {
    constructor(scene) {
        this.scene = scene;
        this.buyInPopupContainer = null;
        this.overlay = null;
        this.base = null;
        this.minVal = null;

        this.buyInSliderConstantValueObj = {
            containerPosX: -350,
            containerPosY: -50,
            basePosX: 0,
            basePosY: 0,
            barPosX: 0,
            barPosY: -20,
            amountTextPosX: 10,
            amountTextPosY: 25,
            closeButtonPosX: 50,
            closeButtonPosY: 5,
            clampMinRange: 0,
            clampMaxRange: 690,
            sliderMinVal: 200,
            sliderMaxVal: 300
        }
        this.CreateBuyInPopup();
    };

    CreateBuyInPopup() {
        this.CreateOverlay();

        this.buyInPopupContainer = this.scene.add.container(0, 0);
        this.buyInPopupContainer.setDepth(4);

        this.base = this.scene.add.image(0, 0, "popup_base").setOrigin(0.5);
        this.buyInPopupContainer.add([this.base]);

        this.CreateCrossButton();
        this.CreateOkButton();
        this.CreateBuyInSlider();
        this.SetBuyInMinMaxAmount(this.buyInSliderConstantValueObj.sliderMinVal, this.buyInSliderConstantValueObj.sliderMaxVal);
        this.HideBuyInPopup();
    };

    CreateOverlay() {
        this.overlay = this.scene.add.image(0, 0, "overlay").setOrigin(0);
        this.overlay.setDisplaySize(this.scene.scale.width, this.scene.scale.height);
        this.overlay.setInteractive();
        this.overlay.setDepth(4);
    };

    CreateCrossButton() {
        this.crossButton = new Button(this.scene, Math.round(this.scene.scale.width / 2), Math.round(this.scene.scale.height), "cross_button");
        this.crossButton.setClickCallback(this.OnCrossButtonClicked, this);
        this.crossButton.setDepth(5);
    };

    OnCrossButtonClicked() {
        console.log("OnCrossButtonClicked");
        this.HideBuyInPopup();
    };

    ResizeCrossButton(newWidth, newHeight, newScale) {
        this.crossButton.setScale(newScale);
        this.crossButton.setPosition(newWidth / 2 + ((this.base.width / 2 * newScale) - 25 * newScale), newHeight / 2 - ((this.base.height / 2 * newScale) - 25 * newScale));
    };

    //#region - CREATE SLIDER
    CreateBuyInSlider() {
        this.sliderContainer = this.scene.add.container(this.buyInSliderConstantValueObj.containerPosX, this.buyInSliderConstantValueObj.containerPosY);
        this.raiseSliderBase = this.scene.add.image(this.buyInSliderConstantValueObj.basePosX, this.buyInSliderConstantValueObj.basePosY, "buy_in_base").setOrigin(0);
        this.raiseSliderBar = this.scene.add.image(this.buyInSliderConstantValueObj.barPosX, this.buyInSliderConstantValueObj.barPosY, "buy_in_bar").setOrigin(0);
        this.raiseSliderBar.setInteractive({ draggable: true });

        let raiseAmountTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '30px', fill: '#fff', fontStyle: 'normal', align: 'center' };
        this.raiseAmountText = this.scene.add.text(this.raiseSliderBar.x + this.buyInSliderConstantValueObj.amountTextPosX, this.raiseSliderBar.y - this.buyInSliderConstantValueObj.amountTextPosY, this.minVal, raiseAmountTextStyle).setOrigin(0.5);

        this.sliderContainer.add([this.raiseSliderBase, this.raiseSliderBar, this.raiseAmountText]);

        this.scene.input.on('drag', (pointer, gameObject, dragX) => {
            dragX = Phaser.Math.Clamp(dragX, this.minRange, this.maxRange);
            this.raiseAmount = (dragX / this.limitParam) - (this.minRange / this.limitParam);
            this.raiseAmountText.setText(parseInt(this.raiseAmount + this.minVal));

            gameObject.x = Math.round(dragX);;
            this.raiseAmountText.x = this.buyInSliderConstantValueObj.amountTextPosX + Math.round(dragX);;
        });

        this.buyInPopupContainer.add(this.sliderContainer);
    };
    SetBuyInMinMaxAmount(_minAmt, _maxAmt) {
        this.minRange = this.buyInSliderConstantValueObj.clampMinRange;
        this.maxRange = this.buyInSliderConstantValueObj.clampMaxRange;
        this.minVal = _minAmt;
        this.maxVal = _maxAmt;
        this.limitParam = (this.maxRange - this.minRange) / (this.maxVal - this.minVal);

        this.raiseAmountText.setText(this.minVal);
    };
    //#endregion

    ShowBuyInPopup(_data) {
        this.SetBuyInMinMaxAmount(_data.minBuyInAmount, _data.maxBuyInAmount);
        this.overlay.setVisible(true);
        this.buyInPopupContainer.setVisible(true);
        this.crossButton.show();
        this.crossButton.enable();
        this.okButton.show();
        this.okButton.enable();
    };

    HideBuyInPopup() {
        this.overlay.setVisible(false);
        this.buyInPopupContainer.setVisible(false);
        this.crossButton.hide();
        this.okButton.hide();
    };

    CreateOkButton() {
        this.okButton = new Button(this.scene, Math.round(this.scene.scale.width / 2), Math.round(this.scene.scale.height), "raise_popup_correct_button");
        this.okButton.setClickCallback(this.OnOkButtonClicked, this);
        this.okButton.setDepth(5);
    };
    OnOkButtonClicked() {
        console.log("OnOkButtonClicked: ", this.raiseAmountText.text);
        this.HideBuyInPopup();
        // this.scene.GetGameLaunchUrl(this.raiseAmountText.text);
    };
    ResizeOkButton(newWidth, newHeight, newScale) {
        this.okButton.setScale(newScale);
        this.okButton.setPosition(newWidth / 2, newHeight / 2 + ((this.base.height / 4 * newScale)));
    };

    OverlayPressed() { }

    resize(newWidth, newHeight, newScale) {
        this.overlay.setDisplaySize(newWidth, newHeight);
        this.buyInPopupContainer.setScale(newScale);
        this.buyInPopupContainer.setPosition((newWidth / 2), (newHeight / 2));
        this.ResizeCrossButton(newWidth, newHeight, newScale);

        this.ResizeOkButton(newWidth, newHeight, newScale);
    };

};
export default BuyInPopup