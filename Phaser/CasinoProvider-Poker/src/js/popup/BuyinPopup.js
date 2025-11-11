/* global console*/
/********* Script_Details ************
 * @Original_Creator :- Tanmay Mukherjee.
 * @Created_Date :- 09-09-2024.
 * @Last_Update_By :- Md Jahngir.
 * @Last_Updatd_Date :- 13-11-2024
 * @Description :- Design and handling for the Buyin Popup.
 ************************************/
import Button from '../ui/Button';
import Phaser from 'phaser';
import { Constant } from '../Constant.js';
import { Model } from '../Model.js';
import { Server } from '../services/Server.js';
import { Utils } from '../Utils.js';

class BuyinPopup {
  constructor(scene) {
    this.scene = scene;
    this.buyinPopupContainer = null;
    this.overlay = null;
    this.base = null;
    this.minAmount = 0;
    this.maxAmount = 0;
    this.amount = 0;
    this.gameType = null;
    this.balance = null;
    this.minRange = null;
    this.maxRange = null;
    this.minVal = null;
    this.maxVal = null;
    this.buyAmountSliderConstantValueObj = {
      containerPosX: -280,
      containerPosY: 88,
      basePosX: 0,
      basePosY: 0,
      barPosX: 0,
      barPosY: -20,
      amountTextPosX: 10,
      amountTextPosY: 40,
      clampMinRange: 8,
      clampMaxRange: 543,
      sliderMinVal: 80,
      sliderMaxVal: 500,
    };

    this.CreateBuyinPopup();
  };
  //#region - Creat Buyin popup
  CreateBuyinPopup() {
    this.SetAllBuyinPopupValueFromServer();
    this.CreateOverlay();
    this.buyinPopupContainer = this.scene.add.container(0, 0);
    this.buyinPopupContainer.setDepth(3);
    this.CreateBaseAndHeadingText();
    this.CreateGameTypeText();
    this.CreateAvailableBalanceText();
    this.CreateAutoBuyInButton();
    this.CreateYesButton();
    this.CreateNoButton();
    this.CreateCloseButton();
    this.CreateCurrentAmountSection();
    this.CreateMinAmountButton();
    this.CreateMaxAmountButton();
    this.CreateBuyAmountSlider();
    this.SetBuyinAmountMinMaxAmount(this.buyAmountSliderConstantValueObj.sliderMinVal, this.buyAmountSliderConstantValueObj.sliderMaxVal);
    this.HideBuyinPopup();
  };
  //#endregion

  //#region - Initialize Value from Server
  SetAllBuyinPopupValueFromServer() {
    const minBuyAmountFromServer = Model.GetMinBuyInAmount();
    const maxBuyAmountFromServer = Model.GetMaxBuyInAmount();
    this.gameType = Utils.GetGameTypeByName(Model.GetGameType());
    this.balance = Model.GetLocalPlayerData().balance.total_balance;
    // this.balance = 500;


    this.minAmount = minBuyAmountFromServer;
    this.amount = this.minAmount;
    this.maxAmount = maxBuyAmountFromServer;
    this.buyAmountSliderConstantValueObj.sliderMinVal = minBuyAmountFromServer;
    this.buyAmountSliderConstantValueObj.sliderMaxVal = maxBuyAmountFromServer;
  };

  //#region - Create overlay
  CreateOverlay() {
    this.overlay = this.scene.add.image(0, 0, 'overlay').setOrigin(0);
    this.overlay.setDisplaySize(this.scene.scale.width, this.scene.scale.height);
    this.overlay.setInteractive();
    this.overlay.setDepth(3);
  };
  //#endregion

  //#region - Create Base, Heading Text
  CreateBaseAndHeadingText() {
    this.buyinPopupBase = this.scene.add.image(0, 0, 'buyin_popup_base');
    const buyinHeadingTextStyle = { fontFamily: 'Poppins-SemiBold', fontSize: '32px', fill: '#fff', fontStyle: 'bold', align: 'center', wordWrap: { width: this.buyinPopupBase.width - 20 } };
    this.buyinHeadingText = this.scene.add.text(this.buyinPopupBase.x, this.buyinPopupBase.y - 298, 'Buy-In', buyinHeadingTextStyle).setOrigin(0.5);
    this.buyinPopupContainer.add([this.buyinPopupBase, this.buyinHeadingText]);
  };
  //#endregion

  //#region - Create Game Type Text
  CreateGameTypeText() {
    const gameTypeHeadingTextStyle = { fontFamily: 'Poppins-regular', fontSize: '20px', fill: '#897485', fontStyle: 'normal', align: 'center', wordWrap: { width: this.buyinPopupBase.width - 10 } };
    this.gameTypeHeadingText = this.scene.add.text(-216.5, -158, 'Game Type', gameTypeHeadingTextStyle).setOrigin(0.5);
    const gameTypeDynamicTextStyle = { fontFamily: 'Poppins-regular', fontSize: '20px', fill: '#FFF3F2', fontStyle: 'normal', align: 'center', wordWrap: { width: (this.buyinPopupBase.width / 2) - 10 } };
    this.gameTypeDynamicText = this.scene.add.text(60, -158, this.gameType, gameTypeDynamicTextStyle).setOrigin(0, 0.5);
    this.buyinPopupContainer.add([this.gameTypeHeadingText, this.gameTypeDynamicText]);
  };
  //#endregion

  //#region - Create Available Balance Text
  CreateAvailableBalanceText() {
    const availableBalanceHeadingTextStyle = { fontFamily: 'Poppins-regular', fontSize: '20px', fill: '#897485', fontStyle: 'normal', align: 'center', wordWrap: { width: this.buyinPopupBase.width - 10 } };
    this.availableBalanceHeadingText = this.scene.add.text(-185, -105, 'Available Balance', availableBalanceHeadingTextStyle).setOrigin(0.5);
    this.pokerChip = this.scene.add.image(70, -105, 'poker_chip_popup');
    const gameTypeDynamicTextStyle = { fontFamily: 'Poppins-regular', fontSize: '20px', fill: '#FFF3F2', fontStyle: 'normal', align: 'center', wordWrap: { width: (this.buyinPopupBase.width / 2) - 10 } };
    this.availableBalanceDynamicText = this.scene.add.text(this.pokerChip.x + 20, this.pokerChip.y, `$ ${this.balance}.00`, gameTypeDynamicTextStyle).setOrigin(0, 0.5);
    this.buyinPopupContainer.add([this.availableBalanceHeadingText, this.pokerChip, this.availableBalanceDynamicText]);
  };
  //#endregion

  SetAvailableBalance(_amount) {
    this.availableBalanceDynamicText.setText(`$ ${_amount}.00`);
  };

  //#region - Create Auto Buy In Section
  CreateAutoBuyInButton() {
    this.autoBuyInButtonBase = new Button(this.scene, 0, 0, 'buyin_bottom_base');
    this.autoBuyInButtonBase.setDepth(5);
    this.autoBuyInButtonBase.setClickCallback(this.OnAutoBuiInButtonClicked, this);
    const buyinPopupBottomBaseTextStyle = { fontFamily: 'Poppins-regular', fontSize: '20px', fill: '#FFF3F2', fontStyle: 'normal', align: 'center', wordWrap: { width: this.autoBuyInButtonBase.width - 10 } };
    this.autoBuyInButtonText = this.scene.add.text(0, 153, 'ACTIVATE AUTO BUY IN & AUTO RE BUY', buyinPopupBottomBaseTextStyle).setOrigin(0.5).setDepth(5);
  };
  OnAutoBuiInButtonClicked() {
    // eslint-disable-next-line no-console
    console.log('coming soon');
  };
  ResizeAutoBuiInButton(_newWidth, _newHeight, _newScale) {
    this.autoBuyInButtonBase.setScale(_newScale);
    this.autoBuyInButtonBase.setPosition((_newWidth / 2), (_newHeight / 2) + (153 * _newScale));
    this.autoBuyInButtonText.setScale(_newScale);
    this.autoBuyInButtonText.copyPosition(this.autoBuyInButtonBase);
  };
  //#endregion

  //#region - Show Buyin popup
  async ShowBuyinPopup() {
    const updatedBalance = await Server.UpdateUserBalance();
    this.SetAvailableBalance(updatedBalance.data.total_balance);
    this.overlay.setVisible(true);
    this.buyinPopupContainer.setVisible(true);
    this.yesButton.show();
    this.yesButton.enable();
    this.yesButtonText.setVisible(true);
    this.noButton.show();
    this.noButton.enable();
    this.noButtonText.setVisible(true);
    this.autoBuyInButtonBase.show();
    this.autoBuyInButtonBase.enable();
    this.autoBuyInButtonText.setVisible(true);
    // this.closeButton.show();
    // this.closeButton.enable();
    this.ShowMinAmountButton();
    this.ShowMaxAmountButton();
    this.ShowCurrentAmountSection();
    this.ShowbuyAmountSlide();
  };
  //#endregion

  //#region - Hide Buyin popup
  HideBuyinPopup() {
    this.overlay.setVisible(false);
    this.buyinPopupContainer.setVisible(false);
    this.yesButton.hide();
    this.yesButtonText.setVisible(false);
    this.noButton.hide();
    this.noButtonText.setVisible(false);
    this.autoBuyInButtonBase.hide();
    this.autoBuyInButtonText.setVisible(false);
    // this.closeButton.hide();
    this.HideMinAmountButton();
    this.HideMaxAmountButton();
    this.HideCurrentAmountSection();
    this.HidebuyAmountSlide();
  };
  //#endregion

  //#region - Yes Button
  CreateYesButton() {
    this.yesButton = new Button(this.scene, Math.round(this.scene.scale.width / 2), Math.round(this.scene.scale.height), 'call_button');
    this.yesButton.setClickCallback(this.OnYesButtonClicked, this);
    this.yesButton.setDepth(5);
    const yesButtonTextStyle = { fontFamily: 'Poppins-Regular', fontSize: '20px', fill: '#fff', fontStyle: 'normal', align: 'center', wordWrap: { width: this.yesButton.width - 10 } };
    this.yesButton.setDepth(5);
    this.yesButtonText = this.scene.add.text(this.yesButton.x, this.yesButton.y, 'Yes', yesButtonTextStyle).setOrigin(0.5).setDepth(5);
  };
  //#endregion

  //#region - Yes Button Click
  async OnYesButtonClicked() {
    if (this.balance > this.amount) {
      const buyInRespone = await Server.PlaceBuyInApi(Model.GetTableId(), this.amount);
      // eslint-disable-next-line no-console
      console.log('buyInRespone !', buyInRespone);
      if (!buyInRespone.error) {
        Model.SetBuyInAmount(buyInRespone.data.buy_in);
        Constant.game.events.emit('evtBuyInSuccess');
      } else {
        this.scene.alertPopup.ShowAlertPopup(buyInRespone.message);
      }
    }
    else {
      this.scene.alertPopup.ShowAlertPopup('Insufficient Balance');
    }
    this.HideBuyinPopup();
  };

  //#region - Resize Yes Button
  ResizeYesButton(_newWidth, _newHeight, _newScale) {
    this.yesButton.setScale(_newScale);
    this.yesButton.setPosition((_newWidth / 2) - (105 * _newScale), (_newHeight / 2) + (272 * _newScale));
    this.yesButtonText.setScale(_newScale);
    this.yesButtonText.copyPosition(this.yesButton);
  };
  //#endregion

  //#region - No Button
  CreateNoButton() {
    this.noButton = new Button(this.scene, Math.round(this.scene.scale.width / 2), Math.round(this.scene.scale.height), 'raise_popup_cancel_button');
    this.noButton.setClickCallback(this.OnNoButtonClicked, this);
    this.noButton.setDepth(5);
    const noButtonTextStyle = { fontFamily: 'Poppins-Regular', fontSize: '20px', fill: '#fff', fontStyle: 'normal', align: 'center', wordWrap: { width: this.noButton.width - 10 } };
    this.noButton.setDepth(5);
    this.noButtonText = this.scene.add.text(this.noButton.x, this.noButton.y, 'No', noButtonTextStyle).setOrigin(0.5).setDepth(5);
  };
  //#endregion

  //#region - No Button Clicked
  OnNoButtonClicked() {
    this.HideBuyinPopup();
    this.scene.SitOut();
  };
  //#endregion

  //#region - Resize No Button
  ResizeNoButton(_newWidth, _newHeight, _newScale) {
    this.noButton.setScale(_newScale);
    this.noButton.setPosition((_newWidth / 2) + (105 * _newScale), (_newHeight / 2) + (272 * _newScale));
    this.noButtonText.setScale(_newScale);
    this.noButtonText.copyPosition(this.noButton);
  };
  //#endregion

  //#region - Close Button
  CreateCloseButton() {
    this.closeButton = new Button(this.scene, 0, 0, 'close_button');
    this.closeButton.setClickCallback(this.OnCloseButtonClicked, this);
    this.closeButton.setDepth(5);
    this.closeButton.hide();
  };
  //#endregion

  //#region - Close Button Clicked
  OnCloseButtonClicked() {
    this.HideBuyinPopup();
  };
  //#endregion

  //#region - Resize Close Button
  ResizeCloseButton(_newWidth, _newHeight, _newScale) {
    this.closeButton.setScale(_newScale);
    this.closeButton.setPosition((_newWidth / 2) + (314.56 * _newScale), (_newHeight / 2) - (318.76 * _newScale));
  };
  //#endregion

  //#region - Current Amount Section
  CreateCurrentAmountSection() {
    // this.amountChip = this.scene.add.image(-60, -17, 'pot_value_chip').setScale(0.7);
    // this.buyinPopupContainer.add(this.amountChip);
    const amountTextText = { fontFamily: 'Poppins-Regular', fontSize: '20px', fill: '#897485', fontStyle: 'normal', align: 'center' };
    const amountText = this.scene.add.text(0, -21, 'Amount', amountTextText).setOrigin(0.5);
    this.buyinPopupContainer.add(amountText);
    this.amountBase = this.scene.add.image(Math.round(this.scene.scale.width / 2), Math.round(this.scene.scale.height), 'buy_in_amount_base');
    const amountButtonText = { fontFamily: 'Poppins-Regular', fontSize: '20px', fill: '#fff', fontStyle: 'normal', align: 'center', wordWrap: { width: this.amountBase.width - 10 } };
    this.amountBase.setDepth(5);
    this.amountBaseText = this.scene.add.text(this.amountBase.x, this.amountBase.y, `$ ${this.amount}`, amountButtonText).setOrigin(0.5).setDepth(5);
  };
  //#endregion

  //#region - resize Max Amount Button
  ResizeCurrentAmountSection(_newWidth, _newHeight, _newScale) {
    this.amountBase.setScale(_newScale);
    this.amountBase.setPosition((_newWidth / 2), (_newHeight / 2) + (24 * _newScale));
    this.amountBaseText.setScale(_newScale);
    this.amountBaseText.copyPosition(this.amountBase);
  };
  //#endregion

  //#region - Show Current Amount
  ShowCurrentAmountSection() {
    this.amountBase.setVisible(true);
    this.amountBaseText.setVisible(true);
  };
  //#endregion

  //#region - Hide Current Amount
  HideCurrentAmountSection() {
    this.amountBase.setVisible(false);
    this.amount = this.minAmount;
    this.amountBaseText.setText(`$ ${this.amount}`);
    this.amountBaseText.setVisible(false);
  };
  //#endregion

  //#region - Min Amount Button
  CreateMinAmountButton() {
    this.minAmountButton = new Button(this.scene, Math.round(this.scene.scale.width / 2), Math.round(this.scene.scale.height), 'buy_in_minmax_amount_base');
    this.minAmountButton.setClickCallback(this.OnMinAmountButtonClicked, this);
    const minAmountButtonText = { fontFamily: 'Poppins-Regular', fontSize: '20px', fill: '#fff', fontStyle: 'normal', align: 'center', wordWrap: { width: this.minAmountButton.width - 10 } };
    this.minAmountButton.setDepth(5);
    this.minAmountButtonText = this.scene.add.text(this.minAmountButton.x, this.minAmountButton.y, `MIN $${this.minAmount}`, minAmountButtonText).setOrigin(0.5).setDepth(5);
  };
  //#endregion

  //#region - Min Amount Button Clicked
  async OnMinAmountButtonClicked() {
    if (this.balance > this.minAmount) {
      const buyInRespone = await Server.PlaceBuyInApi(Model.GetTableId(), this.minAmount);
      // eslint-disable-next-line no-console
      console.log('buyInRespone !', buyInRespone);
      if (!buyInRespone.error) {
        Model.SetBuyInAmount(buyInRespone.data.buy_in);
        Constant.game.events.emit('evtBuyInSuccess');
      } else {
        this.scene.alertPopup.ShowAlertPopup(buyInRespone.message);
      }
    } else {
      this.scene.alertPopup.ShowAlertPopup('Insufficient Balance');
    }
    this.HideBuyinPopup();
  };
  //#endregion

  //#region - resize Min Amount Button
  ResizeMinAmountButton(_newWidth, _newHeight, _newScale) {
    this.minAmountButton.setScale(_newScale);
    this.minAmountButton.setPosition((_newWidth / 2) - (190.5 * _newScale), (_newHeight / 2) + (24 * _newScale));
    this.minAmountButtonText.setScale(_newScale);
    this.minAmountButtonText.copyPosition(this.minAmountButton);
  };
  //#endregion

  //#region - Show Min Amount Button
  ShowMinAmountButton() {
    this.minAmountButton.enable();
    this.minAmountButton.show();
    this.minAmountButtonText.setVisible(true);
  };
  //#endregion

  //#region - Hide Min Amount Button
  HideMinAmountButton() {
    this.minAmountButton.hide();
    this.minAmountButtonText.setVisible(false);
  };
  //#endregion

  //#region - Max Amount Button
  CreateMaxAmountButton() {
    this.maxAmountButton = new Button(this.scene, Math.round(this.scene.scale.width / 2), Math.round(this.scene.scale.height), 'buy_in_minmax_amount_base');
    this.maxAmountButton.setClickCallback(this.OnMaxAmountButtonClicked, this);
    const maxAmountButtonText = { fontFamily: 'Poppins-Regular', fontSize: '20px', fill: '#fff', fontStyle: 'normal', align: 'center', wordWrap: { width: this.maxAmountButton.width - 10 } };
    this.maxAmountButton.setDepth(5);
    this.maxAmountButtonText = this.scene.add.text(this.maxAmountButton.x, this.maxAmountButton.y, `MAX $${this.maxAmount}`, maxAmountButtonText).setOrigin(0.5).setDepth(5);
  };
  //#endregion

  //#region - Max Amount Button Clicked
  async OnMaxAmountButtonClicked() {
    if (this.balance > this.maxAmount) {
      const buyInRespone = await Server.PlaceBuyInApi(Model.GetTableId(), this.maxAmount);
      // eslint-disable-next-line no-console
      console.log('buyInRespone !', buyInRespone);
      if (!buyInRespone.error) {
        Model.SetBuyInAmount(buyInRespone.data.buy_in);
        Constant.game.events.emit('evtBuyInSuccess');
      } else {
        this.scene.alertPopup.ShowAlertPopup(buyInRespone.message);
      }
    }
    else {
      this.scene.alertPopup.ShowAlertPopup('Insufficient Balance');
    }
    this.HideBuyinPopup();
  };
  //#endregion

  //#region - resize Max Amount Button
  ResizeMaxAmountButton(_newWidth, _newHeight, _newScale) {
    this.maxAmountButton.setScale(_newScale);
    this.maxAmountButton.setPosition((_newWidth / 2) + (191.5 * _newScale), (_newHeight / 2) + (24 * _newScale));
    this.maxAmountButtonText.setScale(_newScale);
    this.maxAmountButtonText.copyPosition(this.maxAmountButton);
  };
  //#endregion

  //#region - Show Max Amount Button
  ShowMaxAmountButton() {
    this.maxAmountButton.enable();
    this.maxAmountButton.show();
    this.maxAmountButtonText.setVisible(true);
    if (this.balance < this.maxAmount) {
      this.maxAmountButton.disable();
      this.maxAmountButtonText.setAlpha(0.5);
    }
  };
  //#endregion

  //#region - Hide Max Amount Button
  HideMaxAmountButton() {
    this.maxAmountButton.hide();
    this.maxAmountButtonText.setVisible(false);
  };
  //#endregion

  //#region - Create Amount Buy Slider
  SetBuyinAmountMinMaxAmount(_minAmt, _maxAmt) {
    this.minRange = this.buyAmountSliderConstantValueObj.clampMinRange;
    this.maxRange = this.buyAmountSliderConstantValueObj.clampMaxRange;
    this.minVal = _minAmt;
    this.maxVal = _maxAmt;
    this.limitParam = (this.maxRange - this.minRange) / (this.maxVal - this.minVal);
  };
  CreateBuyAmountSlider() {
    this.sliderContainer = this.scene.add.container(0, 0).setDepth(5);
    this.buyAmountSlideBase = this.scene.add.image(this.buyAmountSliderConstantValueObj.basePosX, this.buyAmountSliderConstantValueObj.basePosY + 3, 'raise_base').setOrigin(0);
    this.buyAmountSlideBar = this.scene.add.image(this.buyAmountSliderConstantValueObj.basePosX, this.buyAmountSliderConstantValueObj.basePosY + 3, 'raise_bar').setOrigin(0);
    this.buyAmountSlideChip = this.scene.add.image(this.buyAmountSliderConstantValueObj.basePosX - 5, this.buyAmountSliderConstantValueObj.basePosY + 7, 'poker_chip_popup').setOrigin(0.5).setScale(1.3);
    this.buyAmountSlideKnob = this.scene.add.image(this.buyAmountSliderConstantValueObj.barPosX + 8, this.buyAmountSliderConstantValueObj.barPosY + 12, 'raise_slider').setOrigin(0);
    this.buyAmountSlideKnob.setData('name', 'BuyinSlider');
    this.buyAmountSlideBar.setCrop(0, 0, 0, 25);
    this.buyAmountSlideKnob.setInteractive({ draggable: true });

    this.sliderContainer.add([this.buyAmountSlideBase, this.buyAmountSlideBar, this.buyAmountSlideChip, this.buyAmountSlideKnob]);

    this.scene.input.on('drag', (pointer, _gameObject, _dragX) => {
      if (_gameObject.getData('name') === 'BuyinSlider') {
        _dragX = Phaser.Math.Clamp(_dragX, this.minRange, this.maxRange);
        this.buyinAmount = (_dragX / this.limitParam) - (this.minRange / this.limitParam);
        const x = ((_dragX / 5.5) + 2) - (this.minRange / 5.5);
        this.buyAmountSlideBar.setCrop(0, 0, this.buyAmountSliderConstantValueObj.clampMinRange + (this.buyAmountSlideBar.width * (x * 0.01)), this.buyAmountSlideBase.height);
        _gameObject.x = Math.round(_dragX);
        this.amount = parseInt(this.buyinAmount + this.minVal);
        const amountText = this.amount >= 1000 ? `${(parseFloat(this.amount) / 1000).toFixed(2)}k` : parseFloat(this.amount).toFixed(0);
        this.amountBaseText.setText(`$ ${amountText}`);
      }
    });

    // eslint-disable-next-line no-console
    console.log('on change after : ', this.amount);
  };

  ShowbuyAmountSlide() {
    this.sliderContainer.setVisible(true);
  };

  HidebuyAmountSlide() {
    this.buyAmountSlideKnob.setPosition(this.buyAmountSliderConstantValueObj.barPosX + 8, this.buyAmountSliderConstantValueObj.barPosY + 12);
    this.buyAmountSlideBar.setCrop(0, 0, 0, 25);
    this.sliderContainer.setVisible(false);
  };

  ResizebuyAmountSlide(_newWidth, _newHeight, _newScale) {
    this.sliderContainer.setScale(_newScale);
    this.sliderContainer.setPosition(((_newWidth / 2) + (this.buyAmountSliderConstantValueObj.containerPosX * _newScale)), (_newHeight / 2) + (this.buyAmountSliderConstantValueObj.containerPosY * _newScale));
  };
  //#endregion

  //#region - Resize
  resize(_newWidth, _newHeight, _newScale) {
    this.overlay.setDisplaySize(_newWidth, _newHeight);
    this.buyinPopupContainer.setScale(_newScale);
    this.buyinPopupContainer.setPosition((_newWidth / 2), (_newHeight / 2));
    this.ResizeYesButton(_newWidth, _newHeight, _newScale);
    this.ResizeNoButton(_newWidth, _newHeight, _newScale);
    this.ResizeAutoBuiInButton(_newWidth, _newHeight, _newScale);
    // this.ResizeCloseButton(_newWidth, _newHeight, _newScale);
    this.ResizeMinAmountButton(_newWidth, _newHeight, _newScale);
    this.ResizeMaxAmountButton(_newWidth, _newHeight, _newScale);
    this.ResizeCurrentAmountSection(_newWidth, _newHeight, _newScale);
    this.ResizebuyAmountSlide(_newWidth, _newHeight, _newScale);
  };
  //#endregion
}
export default BuyinPopup;