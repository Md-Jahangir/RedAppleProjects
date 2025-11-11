/* global Phaser  */
/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 16-02-2024.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 13-11-2024
 * @Description :- Design and Handle the bottom section of the gameplay page.
 ************************************/
import { Constant } from '../Constant.js';
import { Model } from '../Model.js';
import Button from './Button.js';
import Text from './Text.js';

class BottomPanel {
  constructor(_scene) {
    this.scene = _scene;
    this.minRange = null;
    this.maxRange = null;
    this.minVal = null;
    this.maxVal = null;
    this.checkOrCallButtonShowingStatus = null;
    this.allInButtonShowingStatus = null;
    this.halfPotButtonShowingStatus = null;
    this.threeFourthButtonShowingStatus = null;
    this.potButtonShowingStatus = null;
    this.raiseAllInButtonShowingStatus = null;
    this.raiseAmount = 0;
    this.raiseSliderConstantValueObj = {
      containerPosX: 500,
      containerPosY: 185,
      basePosX: 0,
      basePosY: 0,
      barPosX: 0,
      barPosY: -20,
      amountTextPosX: 35,
      amountTextPosY: 55,
      closeButtonPosX: 50,
      closeButtonPosY: -100,
      okButtonPosX: 50,
      okButtonPosY: -100,
      clampMinRange: 2.5,
      clampMaxRange: 962.5,
      sliderMinVal: 2,
      sliderMaxVal: 150,
    };

    this.BetButtonXpos = {
      halfPotButtonX: 335,
      threeFourthButtonX: 335,
      potButtonX: 335,
      raiseAllInButton: 335,
      foldButtonX: 410,
      callButtonX: 130,
      checkButtonX: 130,
      allInButtonX: -50
    };
    this.BetButtonYpos = {
      halfPotButtonY: 208,
      threeFourthButtonY: 318,
      potButtonY: 428,
      raiseAllInButton: 538,
      foldButtonY: 410,
      callButtonY: 130,
      checkButtonY: 130,
      allInButtonY: -50
    };

    this.currScale = null;
    this.currWidth = null;
    this.currHeight = null;

    this.initialCorpWidthRaiseBar = 2.5;
    this.raiseTextTweenVal = null;

    this.create();
  };

  //#region - Create all image
  create() {
    this.CreateFoldButton();
    this.CreateCallButton();
    this.CreateAllinButton();
    this.CreateCheckButton();
    this.CreateRaiseButton();
    this.CreateRaiseSlider();
    this.SetRaiseMinMaxAmount(this.raiseSliderConstantValueObj.sliderMinVal, this.raiseSliderConstantValueObj.sliderMaxVal);
    this.CreateHalfPotButton();
    this.CreateThreeFourthPotButton();
    this.CreatePotButton();
    this.CreateRaisedAllInButton();
    this.HideAllBetButton();
    this.HideAllRaisedPopupBetButton();
  };
  //#endregion

  //#region - Hide All bet button
  HideAllBetButton() {
    this.HideFoldButton();
    this.HideCallButton();
    this.HideCheckButton();
    this.HideRaiseButton();
    this.HideAllInButton();
  };
  //#endregion

  DisableAllBetButton() {
    this.DisableFoldButton();
    if (this.allInButtonShowingStatus) {
      this.DisableAllInButton();
    }
    else {
      this.checkOrCallButtonShowingStatus ? this.DisableCheckButton() : this.DisableCallButton();
      this.DisableRaiseButton();
    }
  };

  //#region - Show All bet button
  ShowAllBetButton() {
    this.ShowFoldButton();
    this.ShowRaiseButton();
    this.ShowCallButton();
    this.ShowCheckButton();
  };
  //#endregion

  //#region - Hide All Raised popup bet button
  HideAllRaisedPopupBetButton() {
    this.HideHalfPotButton();
    this.HideThreeFourthPotButton();
    this.HidePotButton();
    this.HideRaisedAllInButton();
  };
  //#endregion

  DisableAllRaisedPopupBetButton() {
    this.DisableHalfPotButton(this.halfPotButtonShowingStatus);
    this.DisableThreeFourthPotButton(this.threeFourthButtonShowingStatus);
    this.DisablePotButton(this.potButtonShowingStatus);
    this.DisableRaisedAllInButton(this.raiseAllInButtonShowingStatus);
  };

  //#region - Show All Raised Popup bet button
  ShowAllRaisedPopupBetButton() {
    // if ((Model.GetCurrentUserBalance() - this.scene.currentBet) < this.raiseSliderConstantValueObj.sliderMaxVal) {
    //   this.raiseSliderConstantValueObj.sliderMaxVal = (Model.GetCurrentUserBalance() - this.scene.currentBet);
    //   if (this.raiseSliderConstantValueObj.sliderMinVal >= this.raiseSliderConstantValueObj.sliderMaxVal) {
    //     this.raiseSliderConstantValueObj.sliderMinVal = this.raiseSliderConstantValueObj.sliderMaxVal;
    //     if (this.raiseSliderConstantValueObj.sliderMinVal < 0) {
    //       this.raiseSliderConstantValueObj.sliderMinVal = 0;
    //       this.raiseSliderConstantValueObj.sliderMaxVal = this.raiseSliderConstantValueObj.sliderMinVal;
    //     }
    //   }
    //   this.SetRaiseMinMaxAmount(this.raiseSliderConstantValueObj.sliderMinVal, this.raiseSliderConstantValueObj.sliderMaxVal);
    // }
    this.ShowHalfPotButton(this.halfPotButtonShowingStatus);
    this.ShowThreeFourthPotButton(this.threeFourthButtonShowingStatus);
    this.ShowPotButton(this.potButtonShowingStatus);
    this.ShowRaisedAllInButton(this.raiseAllInButtonShowingStatus);
  };
  //#endregion

  //#region - Show Check or Call button
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
  //#endregion

  // //#region - Show All In button
  // ShowAllInButtonForPlayer(_status) {
  //   this.allInButtonShowingStatus = _status;
  //   if (_status) {
  //     this.ShowAllInButton();
  //     this.HideCallButton();
  //     this.HideCheckButton();
  //     this.HideRaiseButton();
  //   } else {
  //     this.HideAllInButton();
  //   }
  // };
  // //#endregion

  //#region - Show All In button
  ShowAllInButtonForPlayer(_status) {
    this.allInButtonShowingStatus = _status;
    if (_status) {
      if (this.BetButtonXpos.foldButtonX === 410) {
        this.BetButtonXpos.foldButtonX = 300;
        this.ResizeFoldButton(this.currWidth, this.currHeight, this.currScale);
      }
      this.ShowAllInButton();
      this.HideCallButton();
      this.HideCheckButton();
      this.HideRaiseButton();
      if (Model.GetTurnData().current_player_buy_in === 0) {
        this.HideAllInButton();
      }
    } else {
      this.BetButtonXpos.foldButtonX = 410;
      this.ResizeFoldButton(this.currWidth, this.currHeight, this.currScale);
      this.HideAllInButton();
    }
  };
  //#endregion

  //#region - Set Raise popup button status
  SetRaisedPopupButtonShowHideStatus(_data) {
    this.halfPotButtonShowingStatus = _data.betConfig['1/2 pot'];
    this.threeFourthButtonShowingStatus = _data.betConfig['3/4 pot'];
    this.potButtonShowingStatus = _data.betConfig.pot;
    this.raiseAllInButtonShowingStatus = _data.betConfig.all_in;

    const buttonStatuses = [
      _data.betConfig['1/2 pot'],
      _data.betConfig['3/4 pot'],
      _data.betConfig.pot,
      _data.betConfig.all_in
    ];
    const trueCount = buttonStatuses.filter(status => status === true).length;
    if (trueCount !== 0) {
      // this.RaiseBetButtonPosReset(trueCount, buttonStatuses);
      this.RaiseBetButtonPosResetOnMobile(trueCount, buttonStatuses);
    }
    this.raiseAmount = 0;
    this.currentHalfPotAmount = _data.bet_range['1/2_pot'];
    this.currentThreeFourthPotAmount = _data.bet_range['3/4_pot'];
    this.currentRaisePotAmount = _data.bet_range.pot;
    this.currentRaiseAllInAmount = _data.bet_range.all_in;
    this.raiseSliderConstantValueObj.sliderMinVal = _data.bet_range.min_bet;
    this.raiseSliderConstantValueObj.sliderMaxVal = _data.bet_range.max_bet;
    this.SetRaiseMinMaxAmount(this.raiseSliderConstantValueObj.sliderMinVal, this.raiseSliderConstantValueObj.sliderMaxVal);
  };
  //#endregion

  //#region Raise Sections Resize OnMObile
  RaiseBetButtonPosResetOnMobile(_trueCount, _buttonStatuses) {
    const keys = Object.keys(this.BetButtonYpos);
    const config = {
      4: { heightGap: 208, containerPosX: 834 },
      3: { heightGap: 208, containerPosX: 750 },
      2: { heightGap: 208, containerPosX: 500 },
      1: { heightGap: 208, containerPosX: 500 }
    };
    // const { containerPosX } = config[_trueCount] || { heightGap: 85, containerPosX: 500 };
    let { heightGap } = config[_trueCount] || { heightGap: 242, containerPosX: 500 };
    // this.raiseSliderConstantValueObj.containerPosX = containerPosX;
    for (let index = 0; index < _buttonStatuses.length; index++) {
      if (_buttonStatuses[index] === true) {
        this.BetButtonYpos[keys[index]] = heightGap;
        heightGap += 110;
      }
    }
    this.resize(this.currWidth, this.currHeight, this.currScale);
  }
  //#endregion

  //=================== FOLD BUTTON ================================
  //#region - Create Fold button section
  CreateFoldButton() {
    this.foldButton = new Button(this.scene, Math.round(this.scene.scale.width / 2), Math.round(this.scene.scale.height), 'call_button');
    this.foldButton.setClickCallback(this.OnFoldButtonClicked, this);
    this.foldButtonText = new Text(this.scene, this.foldButton.x, this.foldButton.y, {
      text: Constant.FOLD_TEXT,
      fontFamily: 'Poppins-Regular',
      fontSize: '36px',
      fontStyle: 'normal',
      color: '#D2DAE2',
      align: 'center',
      wordWrap: {},
      shadow: {},
    }
    );

  };
  OnFoldButtonClicked() {
    this.foldButtonText.TextScaleTween();
    this.scene.currentBet = -1;
    this.scene.PlaceBetForCurrentPlayer();
    // this.HideAllBetButton();
    this.DisableAllBetButton();
  };
  ResizeFoldButton(_newWidth, _newHeight, _newScale) {
    this.foldButton.setScale(_newScale);
    // this.foldButton.setPosition(((_newWidth / 2) - (235 * _newScale)) + (this.foldButton.getWidth() * 0.5), (_newHeight - (150 * _newScale)) + (this.foldButton.getHeight() * 0.5));
    // this.foldButton.setPosition(((_newWidth / 2) - ((_newWidth / 2) - (712 * _newScale))) + (this.foldButton.getWidth() * 0.5), (_newHeight - (88 * _newScale)) - (this.foldButton.getHeight() * 0.5));
    // this.foldButton.setPosition(((_newWidth / 2) - (248 * _newScale)) + (this.foldButton.getWidth() * 0.5), (_newHeight - (88 * _newScale)) - (this.foldButton.getHeight() * 0.5));
    this.foldButton.setPosition(((_newWidth / 2) - (this.BetButtonXpos.foldButtonX * _newScale)) + (this.foldButton.getWidth() * 0.5), (_newHeight - (51 * _newScale)) - (this.foldButton.getHeight() * 0.5));

    this.foldButtonText.setScale(_newScale);
    this.foldButtonText.setPosition(this.foldButton.x, this.foldButton.y);
  };

  ShowFoldButton() {
    this.foldButton.show();
    this.foldButton.enable();
    this.foldButtonText.show();
    this.foldButtonText.enable();
  };
  HideFoldButton() {
    this.foldButton.hide();
    this.foldButtonText.hide();
  };

  DisableFoldButton() {
    this.foldButton.disable();
    this.foldButtonText.disable();
  };
  //#endregion
  //#################################################################

  //=================== CALL BUTTON ================================
  //#region - Create Call button section
  CreateCallButton() {
    this.callButton = new Button(this.scene, Math.round(this.scene.scale.width / 2), Math.round(this.scene.scale.height), 'call_button');
    this.callButton.setClickCallback(this.OnCallButtonClicked, this);
    this.callButtonText = new Text(this.scene, this.callButton.x, this.callButton.y, {
      text: Constant.CALL_TEXT,
      fontFamily: 'Poppins-Regular',
      fontSize: '36px',
      fontStyle: 'normal',
      color: '#D2DAE2',
      align: 'center',
      wordWrap: {},
      shadow: {},
    }
    );
  };
  OnCallButtonClicked() {
    this.callButtonText.TextScaleTween();
    this.scene.PlaceBetForCurrentPlayer();
    // this.HideAllBetButton();
    this.DisableAllBetButton();
  };
  ResizeCallButton(_newWidth, _newHeight, _newScale) {
    this.callButton.setScale(_newScale);
    // this.callButton.setPosition(((_newWidth / 2) - (57 * _newScale)) + (this.callButton.getWidth() * 0.5), (_newHeight - (88 * _newScale)) - (this.callButton.getHeight() * 0.5));
    this.callButton.setPosition(((_newWidth / 2) - (this.BetButtonXpos.callButtonX * _newScale)) + (this.callButton.getWidth() * 0.5), (_newHeight - (51 * _newScale)) - (this.callButton.getHeight() * 0.5));
    this.callButtonText.setScale(_newScale);
    this.callButtonText.setPosition(this.callButton.x, this.callButton.y);
  };
  ShowCallButton() {
    this.callButton.show();
    this.callButton.enable();
    this.callButtonText.show();
    this.callButtonText.enable();
  };
  HideCallButton() {
    this.callButton.hide();
    this.callButtonText.hide();
  };

  DisableCallButton() {
    this.callButton.disable();
    this.callButtonText.disable();
  };
  //#endregion
  //#################################################################

  //=================== ALL IN BUTTON ================================
  //#region - Create Allin button section
  CreateAllinButton() {
    this.allinButton = new Button(this.scene, Math.round(this.scene.scale.width / 2), Math.round(this.scene.scale.height), 'call_button');
    this.allinButton.setClickCallback(this.OnAllinButtonClicked, this);
    this.allinButtonText = new Text(this.scene, this.allinButton.x, this.allinButton.y, {
      text: Constant.ALL_IN_TEXT,
      fontFamily: 'Poppins-Regular',
      fontSize: '36px',
      fontStyle: 'normal',
      color: '#D2DAE2',
      align: 'center',
      wordWrap: {},
      shadow: {},
    }
    );
    this.HideAllInButton();
  }
  OnAllinButtonClicked() {
    this.allinButtonText.TextScaleTween();
    this.scene.currentBet = this.scene.currentInHandBalance;
    this.scene.PlaceBetForCurrentPlayer();
    // this.HideRaiseSlider();
    // this.HideAllBetButton();
    this.DisableAllBetButton();
  }
  ResizeAllInButton(_newWidth, _newHeight, _newScale) {
    this.allinButton.setScale(_newScale);
    // this.allinButton.setPosition(((_newWidth / 2) - (57 * _newScale)) + (this.allinButton.getWidth() * 0.5), (_newHeight - (88 * _newScale)) - (this.allinButton.getHeight() * 0.5));
    this.allinButton.setPosition(((_newWidth / 2) - (this.BetButtonXpos.allInButtonX * _newScale)) + (this.allinButton.getWidth() * 0.5), (_newHeight - (51 * _newScale)) - (this.allinButton.getHeight() * 0.5));
    this.allinButtonText.setScale(_newScale);
    this.allinButtonText.setPosition(this.allinButton.x, this.allinButton.y);
  };

  ShowAllInButton() {
    this.allinButton.show();
    this.allinButton.enable();
    this.allinButtonText.show();
    this.allinButtonText.enable();
  };
  HideAllInButton() {
    this.allinButton.hide();
    this.allinButtonText.hide();
  };

  DisableAllInButton() {
    this.allinButton.disable();
    this.allinButtonText.disable();
  };
  //#endregion
  //#################################################################

  //=================== CHECK BUTTON ================================
  //#region - Create Check button section
  CreateCheckButton() {
    this.checkButton = new Button(this.scene, Math.round(this.scene.scale.width / 2), Math.round(this.scene.scale.height), 'call_button');
    this.checkButton.setClickCallback(this.OnCheckButtonClicked, this);
    this.checkButtonText = new Text(this.scene, this.checkButton.x, this.checkButton.y, {
      text: Constant.CHECK_TEXT,
      fontFamily: 'Poppins-Regular',
      fontSize: '36px',
      fontStyle: 'normal',
      color: '#D2DAE2',
      align: 'center',
      wordWrap: {},
      shadow: {},
    }
    );

  };
  OnCheckButtonClicked() {
    this.checkButtonText.TextScaleTween();
    this.scene.PlaceBetForCurrentPlayer();
    // this.HideAllBetButton();
    this.DisableAllBetButton();
  };
  ResizeCheckButton(_newWidth, _newHeight, _newScale) {
    this.checkButton.setScale(_newScale);
    // this.checkButton.setPosition(((_newWidth / 2) - (57 * _newScale)) + (this.checkButton.getWidth() * 0.5), (_newHeight - (88 * _newScale)) - (this.checkButton.getHeight() * 0.5));
    this.checkButton.setPosition(((_newWidth / 2) - (this.BetButtonXpos.checkButtonX * _newScale)) + (this.checkButton.getWidth() * 0.5), (_newHeight - (51 * _newScale)) - (this.checkButton.getHeight() * 0.5));
    this.checkButtonText.setScale(_newScale);
    this.checkButtonText.setPosition(this.checkButton.x, this.checkButton.y);
  };
  ShowCheckButton() {
    this.checkButton.show();
    this.checkButton.enable();
    this.checkButtonText.show();
    this.checkButtonText.enable();
  };
  HideCheckButton() {
    this.checkButton.hide();
    this.checkButtonText.hide();
  };

  DisableCheckButton() {
    this.checkButton.disable();
    this.checkButtonText.disable();
  };
  //#endregion
  //#################################################################

  //=================== RAISE BUTTON ================================
  //#region - Create Raise button section
  CreateRaiseButton() {
    this.raiseButton = new Button(this.scene, Math.round(this.scene.scale.width / 2), Math.round(this.scene.scale.height / 2), 'call_button');
    this.raiseButton.setClickCallback(this.OnRaiseButtonClicked, this);
    this.raiseButtonText = new Text(this.scene, this.raiseButton.x, this.raiseButton.y, {
      text: Constant.RAISE_TEXT,
      fontFamily: 'Poppins-Regular',
      fontSize: '36px',
      fontStyle: 'normal',
      color: '#D2DAE2',
      align: 'center',
      wordWrap: {},
      shadow: {},
    }
    );
  };
  OnRaiseButtonClicked() {
    this.raiseButtonText.TextScaleTween();
    this.HideAllBetButton();
    this.ShowRaiseSlider();
    this.ShowAllRaisedPopupBetButton();
  };
  ResizeRaiseButton(_newWidth, _newHeight, _newScale) {
    this.raiseButton.setScale(_newScale);
    this.raiseButton.setPosition(((_newWidth / 2) + (150 * _newScale)) + (this.raiseButton.getWidth() * 0.5), (_newHeight - (51 * _newScale)) - (this.raiseButton.getHeight() * 0.5));
    this.raiseButtonText.setScale(_newScale);
    this.raiseButtonText.setPosition(this.raiseButton.x, this.raiseButton.y);
  };

  ShowRaiseButton() {
    this.raiseButton.show();
    this.raiseButton.enable();
    this.raiseButtonText.show();
    this.raiseButtonText.enable();
  };
  HideRaiseButton() {
    this.raiseButton.hide();
    this.raiseButtonText.hide();
  };

  DisableRaiseButton() {
    this.raiseButton.disable();
    this.raiseButtonText.disable();
  };
  //#endregion
  //#################################################################

  //=================== RAISE SLIDER POPUP ================================
  //#region - Create Raise popup slider section
  SetRaiseMinMaxAmount(_minAmt, _maxAmt) {
    this.minRange = this.raiseSliderConstantValueObj.clampMinRange;
    this.maxRange = this.raiseSliderConstantValueObj.clampMaxRange;
    this.minVal = _minAmt;
    this.maxVal = _maxAmt;
    this.raiseTextTweenVal = this.minVal;
    this.limitParam = (this.maxRange - this.minRange) / (this.maxVal - this.minVal);
    this.raiseAmountText.setText(`$ ${this.minVal}`);
  };
  CreateRaiseSlider() {
    this.sliderContainer = this.scene.add.container(0, 0).setDepth(2);
    this.raiseSliderBase = this.scene.add.image(this.raiseSliderConstantValueObj.basePosX, this.raiseSliderConstantValueObj.basePosY, 'raise_base').setOrigin(0);
    this.raiseSliderBar = this.scene.add.image(this.raiseSliderConstantValueObj.basePosX, this.raiseSliderConstantValueObj.basePosY, 'raise_bar').setOrigin(0);
    this.raiseSliderChip = this.scene.add.image(this.raiseSliderConstantValueObj.basePosX - 2.5, this.raiseSliderConstantValueObj.basePosY + 8, 'raise_slider_chip').setOrigin(0.5);
    this.raiseSliderBar.setCrop(0, 0, 0, this.raiseSliderBase.height);
    this.raiseSliderKnob = this.scene.add.image(this.raiseSliderConstantValueObj.barPosX + 4.5, this.raiseSliderConstantValueObj.barPosY - 8, 'raise_slider').setOrigin(0);
    this.raiseSliderKnob.setInteractive({ draggable: true });
    this.raiseSliderKnob.setData('name', 'RaiseSlider');

    const raiseAmountTextStyle = { fontFamily: 'Poppins-Regular', fontSize: '33px', fill: '#FFF3F2', fontStyle: 'normal', align: 'center' };
    this.raiseAmountText = this.scene.add.text(this.raiseSliderKnob.x + this.raiseSliderConstantValueObj.amountTextPosX, this.raiseSliderKnob.y - this.raiseSliderConstantValueObj.amountTextPosY, this.minVal, raiseAmountTextStyle).setOrigin(0.5);
    this.raiseSliderKnobBase = this.scene.add.image(this.raiseAmountText.x, this.raiseAmountText.y + 15, 'raise_slider_base');

    this.sliderContainer.add([this.raiseSliderBase, this.raiseSliderBar, this.raiseSliderChip, this.raiseSliderKnob, this.raiseSliderKnobBase, this.raiseAmountText]);

    this.scene.input.on('drag', (pointer, _gameObject, _dragX) => {
      if (_gameObject.getData('name') === 'RaiseSlider') {
        _dragX = Phaser.Math.Clamp(_dragX, this.minRange, this.maxRange);
        this.raiseAmount = (_dragX / this.limitParam) - (this.minRange / this.limitParam);
        // this.raiseAmount = parseInt(this.raiseAmount);
        this.raiseAmount = Math.ceil(this.raiseAmount);
        const x = ((_dragX / 10) + 2) - (this.minRange / 10);
        // this.raiseAmountText.setText(`$ ${parseInt(this.raiseAmount + this.minVal)}`);
        const raiseAmountText = this.raiseAmount >= 1000 ? `${(parseFloat(this.raiseAmount + this.minVal) / 1000).toFixed(2)}k` : parseFloat(this.raiseAmount + this.minVal).toFixed(0);
        // this.raiseAmountText.setText(raiseAmountText);
        this.raiseAmountText.setText(`$ ${raiseAmountText}`);
        this.raiseSliderBar.setCrop(0, 0, this.raiseSliderBar.width * (x * 0.01), this.raiseSliderBase.height);
        this.initialCorpWidthRaiseBar = this.raiseSliderBar.width * (x * 0.01);
        _gameObject.x = Math.round(_dragX);
        this.raiseAmountText.x = this.raiseSliderConstantValueObj.amountTextPosX + Math.round(_dragX);
        this.raiseSliderKnobBase.x = this.raiseAmountText.x;
      }
    });

    this.raiseSliderCloseButton = new Button(this.scene, 0, 0, 'raise_popup_cancel_button');
    this.raiseSliderCloseButtonText = this.scene.add.text(0, 0, 'Cancel', raiseAmountTextStyle).setOrigin(0.5);
    this.raiseSliderCloseButton.setClickCallback(this.OnRaiseSliderCloseButtonClicked, this);

    this.raiseSliderOkButton = new Button(this.scene, 0, 0, 'call_button');
    this.raiseSliderOkButtonText = this.scene.add.text(0, 0, 'Done', raiseAmountTextStyle).setOrigin(0.5);
    this.raiseSliderOkButton.setClickCallback(this.OnRaiseSliderOkButtonClicked, this);

    this.HideRaiseSlider();
  };
  OnRaiseSliderCloseButtonClicked() {
    this.HideRaiseSlider();
    this.ShowAllBetButton();
    this.HideAllRaisedPopupBetButton();
    this.ShowCheckOrCallButton(this.checkOrCallButtonShowingStatus);
    this.ShowAllInButtonForPlayer(this.allInButtonShowingStatus);
  };
  OnRaiseSliderOkButtonClicked() {
    // this.HideRaiseSlider();
    // this.HideAllRaisedPopupBetButton();
    this.scene.currentBet = parseInt(this.raiseAmount + this.minVal);
    this.scene.PlaceBetForCurrentPlayer();
    this.DisableRaiseSlider();
    this.DisableAllRaisedPopupBetButton();
  };

  ShowRaiseSlider() {
    this.raiseAmount = 0;
    this.SetRaiseMinMaxAmount(this.raiseSliderConstantValueObj.sliderMinVal, this.raiseSliderConstantValueObj.sliderMaxVal);
    this.sliderContainer.setVisible(true).setAlpha(1);
    this.raiseSliderKnob.setInteractive({ draggable: true });
    if (Model.GetCurrentUserBalance() > this.scene.currentBet) {
      this.raiseSliderOkButton.show();
      this.raiseSliderOkButton.enable();
      this.raiseSliderOkButtonText.setVisible(true);
      this.raiseSliderOkButtonText.setAlpha(1);
    }
    else {
      this.raiseSliderOkButton.disable();
      this.raiseSliderOkButtonText.setVisible(true);
    }
    this.raiseSliderCloseButton.show();
    this.raiseSliderCloseButton.enable();
    this.raiseSliderCloseButtonText.setVisible(true);
    this.raiseSliderCloseButtonText.setAlpha(1);
  };

  HideRaiseSlider() {
    this.sliderContainer.setVisible(false);
    this.raiseSliderCloseButton.hide();
    this.raiseSliderCloseButtonText.setVisible(false);
    this.raiseSliderOkButton.hide();
    // this.raiseSliderOkButton.enable();
    this.raiseSliderOkButtonText.setVisible(false);

    this.raiseSliderKnob.setPosition(this.raiseSliderConstantValueObj.barPosX + 4.5, this.raiseSliderConstantValueObj.barPosY - 8);
    this.raiseAmountText.setPosition(this.raiseSliderKnob.x + this.raiseSliderConstantValueObj.amountTextPosX, this.raiseSliderKnob.y - this.raiseSliderConstantValueObj.amountTextPosY);
    this.raiseSliderKnobBase.setPosition(this.raiseAmountText.x, this.raiseAmountText.y + 15);
    this.raiseSliderBar.setCrop(0, 0, 0, this.raiseSliderBase.height);
  };

  DisableRaiseSlider() {
    this.raiseSliderKnob.removeInteractive();
    this.sliderContainer.setAlpha(0.5);
    this.raiseSliderCloseButton.disable();
    this.raiseSliderCloseButtonText.setAlpha(0.5);
    this.raiseSliderOkButton.disable();
    this.raiseSliderOkButtonText.setAlpha(0.5);
  };

  ResizeRaiseSlider(_newWidth, _newHeight, _newScale) {
    this.sliderContainer.setScale(_newScale);
    this.sliderContainer.setPosition(((_newWidth / 2) - (this.raiseSliderConstantValueObj.containerPosX * _newScale)), (_newHeight - (this.raiseSliderConstantValueObj.containerPosY * _newScale)));

    this.raiseSliderOkButton.setScale(_newScale);
    this.raiseSliderOkButton.setPosition(((_newWidth / 2) - (110 * _newScale)) + (this.raiseSliderOkButton.getWidth() * 0.5), (_newHeight - (51 * _newScale)) - (this.raiseSliderOkButton.getHeight() * 0.5));

    this.raiseSliderOkButtonText.setScale(_newScale);
    this.raiseSliderOkButtonText.copyPosition(this.raiseSliderOkButton);

    this.raiseSliderCloseButton.setScale(_newScale);
    this.raiseSliderCloseButton.setPosition(((_newWidth / 2) + (250 * _newScale)) + (this.raiseSliderCloseButton.getWidth() * 0.5), (_newHeight - (50 * _newScale)) - (this.raiseSliderCloseButton.getHeight() * 0.5));

    this.raiseSliderCloseButtonText.setScale(_newScale);
    this.raiseSliderCloseButtonText.copyPosition(this.raiseSliderCloseButton);
  };
  //#endregion
  //#################################################################

  //=================== HALF POT BUTTON ================================
  //#region - 1/2 Pot button 
  CreateHalfPotButton() {
    this.halfPotButton = new Button(this.scene, 0, 0, 'raise_half_pot_button');
    this.halfPotButton.setClickCallback(this.OnHalfPotButtonClicked, this);
    this.halfPotButtonText = new Text(this.scene, this.halfPotButton.x, this.halfPotButton.y, {
      text: Constant.HALF_POT_TEXT,
      fontFamily: 'Poppins-Regular',
      fontSize: '36px',
      fontStyle: 'bold',
      color: '#FFF3F2',
      align: 'center',
      wordWrap: {},
      shadow: {},
    }
    );
    this.checkHalfPotButton = this.scene.add.image(0, 0, 'user_check_decision_base').setVisible(false);
  };
  OnHalfPotButtonClicked() {
    this.halfPotButtonText.TextScaleTween();
    this.potButton.isCheck = false;
    this.IsSelectPotButton(this.potButton.isCheck);
    this.threeFourthPotButton.isCheck = false;
    this.IsSelectThreeFourthPotButton(this.threeFourthPotButton.isCheck);
    this.raisedAllInButton.isCheck = false;
    this.IsSelectRaisedAllInButton(this.raisedAllInButton.isCheck);
    this.halfPotButton.isCheck = !this.halfPotButton.isCheck;
    this.IsSelectHalfPotButton(this.halfPotButton.isCheck);
    // this.scene.currentBet = this.currentHalfPotAmount;
    // this.scene.PlaceBetForCurrentPlayer();
    // this.HideRaiseSlider();
    // this.HideAllRaisedPopupBetButton();
    // this.DisableRaiseSlider();
    // this.DisableAllRaisedPopupBetButton();
  };
  ResizeHalfPotButton(_newWidth, _newHeight, _newScale) {
    this.halfPotButton.setScale(_newScale);
    // this.halfPotButton.setPosition(((_newWidth / 2) - (254 * _newScale)) + (this.halfPotButton.getWidth() * 0.5), (_newHeight - (88 * _newScale)) - (this.halfPotButton.getHeight() * 0.5));
    this.halfPotButton.setPosition(((_newWidth / 2) + (this.BetButtonXpos.halfPotButtonX * _newScale)) + (this.halfPotButton.getWidth() * 0.5), (_newHeight - (this.BetButtonYpos.halfPotButtonY * _newScale)) - (this.halfPotButton.getHeight() * 0.5));
    this.halfPotButtonText.setScale(_newScale);
    this.halfPotButtonText.setPosition(this.halfPotButton.x, this.halfPotButton.y);
    this.checkHalfPotButton.setScale(_newScale);
    this.checkHalfPotButton.setPosition(this.halfPotButton.x - (89 * _newScale), this.halfPotButton.y);
  };
  ShowHalfPotButton(_status) {
    if (_status) {
      this.halfPotButton.SetTexture('raise_half_pot_button');
      this.halfPotButton.show();
      this.halfPotButton.enable();
      this.halfPotButtonText.textNormal.setStyle({ fill: '#FFF3F2' });
      this.halfPotButtonText.show();
      this.halfPotButtonText.enable();
      this.checkHalfPotButton.setVisible(false);
    } else {
      this.HideHalfPotButton();
    }
  };
  HideHalfPotButton() {
    this.halfPotButton.hide();
    this.halfPotButtonText.hide();
    this.checkHalfPotButton.setVisible(false);
    this.halfPotButton.isCheck = false;
  };

  DisableHalfPotButton(_status) {
    if (_status) {
      this.halfPotButton.disable();
      this.halfPotButtonText.disable();
    }
  };

  IsSelectHalfPotButton(_isCheck) {
    if (_isCheck) {
      this.checkHalfPotButton.setVisible(true);
      this.halfPotButton.SetTexture('select_raise_half_pot_button');
      this.halfPotButtonText.textNormal.setStyle({ fill: '#00A8FF' });
      this.raiseAmount = this.currentHalfPotAmount - this.minVal;
      if (this.currentHalfPotAmount > this.minVal) {
        const posX = (((this.currentHalfPotAmount - this.raiseSliderConstantValueObj.sliderMinVal)
          * (this.raiseSliderConstantValueObj.clampMaxRange - this.raiseSliderConstantValueObj.clampMinRange))
          / (this.raiseSliderConstantValueObj.sliderMaxVal - this.raiseSliderConstantValueObj.sliderMinVal))
          + this.raiseSliderConstantValueObj.clampMinRange;
        // console.log('raise amount', this.raiseAmount, posX, this.raiseSliderKnob.x);

        this.RaiseBarTweenControl(posX, this.currentHalfPotAmount);
      }
      else {
        this.RaiseBarTweenControl(0, this.currentHalfPotAmount);
      }
    }
    else {
      this.checkHalfPotButton.setVisible(false);
      this.halfPotButton.SetTexture('raise_half_pot_button');
      this.halfPotButtonText.textNormal.setStyle({ fill: '#FFF3F2' });
      this.raiseAmount = 0;
    }
  }
  //#endregion
  //#################################################################

  //=================== THREE FOURTH POT BUTTON ================================
  //#region -  3/4 Pot button
  CreateThreeFourthPotButton() {
    this.threeFourthPotButton = new Button(this.scene, Math.round(this.scene.scale.width / 2), Math.round(this.scene.scale.height), 'raise_half_pot_button');
    this.threeFourthPotButton.setClickCallback(this.OnThreeFourthPotButtonClicked, this);
    this.threeFourthPotButtonText = new Text(this.scene, this.threeFourthPotButton.x, this.threeFourthPotButton.y, {
      text: Constant.THREE_FOURTH_POT_TEXT,
      fontFamily: 'Poppins-Regular',
      fontSize: '36px',
      fontStyle: 'bold',
      color: '#FFF3F2',
      align: 'center',
      wordWrap: {},
      shadow: {},
    }
    );
    this.checkThreeFourthPotButton = this.scene.add.image(0, 0, 'user_check_decision_base').setVisible(false);
  };
  OnThreeFourthPotButtonClicked() {
    this.threeFourthPotButtonText.TextScaleTween();
    this.potButton.isCheck = false;
    this.IsSelectPotButton(this.potButton.isCheck);
    this.halfPotButton.isCheck = false;
    this.IsSelectHalfPotButton(this.halfPotButton.isCheck);
    this.raisedAllInButton.isCheck = false;
    this.IsSelectRaisedAllInButton(this.raisedAllInButton.isCheck);
    this.threeFourthPotButton.isCheck = !this.threeFourthPotButton.isCheck;
    this.IsSelectThreeFourthPotButton(this.threeFourthPotButton.isCheck);
    // this.scene.currentBet = this.currentThreeFourthPotAmount;// (parseInt(Model.GetCurrentPotTextBalance())) * 0.75;
    // this.scene.PlaceBetForCurrentPlayer();
    // this.HideRaiseSlider();
    // this.HideAllRaisedPopupBetButton();
    // this.DisableRaiseSlider();
    // this.DisableAllRaisedPopupBetButton();
  };
  ResizeThreeFourthPotButton(_newWidth, _newHeight, _newScale) {
    this.threeFourthPotButton.setScale(_newScale);
    // this.threeFourthPotButton.setPosition(((_newWidth / 2) - (85 * _newScale)) + (this.threeFourthPotButton.getWidth() * 0.5), (_newHeight - (88 * _newScale)) - (this.threeFourthPotButton.getHeight() * 0.5));
    this.threeFourthPotButton.setPosition(((_newWidth / 2) + (this.BetButtonXpos.threeFourthButtonX * _newScale)) + (this.threeFourthPotButton.getWidth() * 0.5), (_newHeight - (this.BetButtonYpos.threeFourthButtonY * _newScale)) - (this.threeFourthPotButton.getHeight() * 0.5));
    this.threeFourthPotButtonText.setScale(_newScale);
    this.threeFourthPotButtonText.setPosition(this.threeFourthPotButton.x, this.threeFourthPotButton.y);
    this.checkThreeFourthPotButton.setScale(_newScale);
    this.checkThreeFourthPotButton.setPosition(this.threeFourthPotButton.x - (89 * _newScale), this.threeFourthPotButton.y);
  };

  ShowThreeFourthPotButton(_status) {
    if (_status) {
      this.threeFourthPotButton.SetTexture('raise_half_pot_button');
      this.threeFourthPotButton.show();
      this.threeFourthPotButton.enable();
      this.threeFourthPotButtonText.textNormal.setStyle({ fill: '#FFF3F2' });
      this.threeFourthPotButtonText.show();
      this.threeFourthPotButtonText.enable();
      this.checkThreeFourthPotButton.setVisible(false);
    } else {
      this.HideThreeFourthPotButton();
    }
  };
  HideThreeFourthPotButton() {
    this.threeFourthPotButton.hide();
    this.threeFourthPotButtonText.hide();
    this.checkThreeFourthPotButton.setVisible(false);
    this.threeFourthPotButton.isCheck = false;
  };
  DisableThreeFourthPotButton(_status) {
    if (_status) {
      this.threeFourthPotButton.disable();
      this.threeFourthPotButtonText.disable();
    }
  };
  IsSelectThreeFourthPotButton(_isCheck) {
    if (_isCheck) {
      this.checkThreeFourthPotButton.setVisible(true);
      this.threeFourthPotButton.SetTexture('select_raise_half_pot_button');
      this.threeFourthPotButtonText.textNormal.setStyle({ fill: '#00A8FF' });
      this.raiseAmount = this.currentThreeFourthPotAmount - this.minVal;
      if (this.currentThreeFourthPotAmount > this.minVal) {
        const posX = (((this.currentThreeFourthPotAmount - this.raiseSliderConstantValueObj.sliderMinVal)
          * (this.raiseSliderConstantValueObj.clampMaxRange - this.raiseSliderConstantValueObj.clampMinRange))
          / (this.raiseSliderConstantValueObj.sliderMaxVal - this.raiseSliderConstantValueObj.sliderMinVal))
          + this.raiseSliderConstantValueObj.clampMinRange;
        // console.log('raise amount', this.raiseAmount, posX, this.raiseSliderKnob.x);

        this.RaiseBarTweenControl(posX, this.currentThreeFourthPotAmount);
      }
      else {
        this.RaiseBarTweenControl(0, this.currentThreeFourthPotAmount);
      }
    }
    else {
      this.checkThreeFourthPotButton.setVisible(false);
      this.threeFourthPotButton.SetTexture('raise_half_pot_button');
      this.threeFourthPotButtonText.textNormal.setStyle({ fill: '#FFF3F2' });
      this.raiseAmount = 0;
    }
  }
  //#endregion
  //#################################################################

  //=================== POT BUTTON ================================
  //#region - Pot button
  CreatePotButton() {
    this.potButton = new Button(this.scene, 0, 0, 'raise_half_pot_button');
    this.potButton.setClickCallback(this.OnPotButtonClicked, this);
    this.potButtonText = new Text(this.scene, this.potButton.x, this.potButton.y, {
      text: Constant.POT_TEXT,
      fontFamily: 'Poppins-Regular',
      fontSize: '36px',
      fontStyle: 'bold',
      color: '#FFF3F2',
      align: 'center',
      wordWrap: {},
      shadow: {},
    }
    );
    this.checkPotButton = this.scene.add.image(0, 0, 'user_check_decision_base').setVisible(false);
  };

  OnPotButtonClicked() {
    this.potButtonText.TextScaleTween();
    this.threeFourthPotButton.isCheck = false;
    this.IsSelectThreeFourthPotButton(this.threeFourthPotButton.isCheck);
    this.halfPotButton.isCheck = false;
    this.IsSelectHalfPotButton(this.halfPotButton.isCheck);
    this.raisedAllInButton.isCheck = false;
    this.IsSelectRaisedAllInButton(this.raisedAllInButton.isCheck);
    this.potButton.isCheck = !this.potButton.isCheck;
    this.IsSelectPotButton(this.potButton.isCheck);
    // this.scene.currentBet = this.currentRaisePotAmount;// parseInt(Model.GetCurrentPotTextBalance());
    // this.scene.PlaceBetForCurrentPlayer();
    // this.HideRaiseSlider();
    // this.HideAllRaisedPopupBetButton();
    // this.DisableRaiseSlider();
    // this.DisableAllRaisedPopupBetButton();
  };

  ResizePotButton(_newWidth, _newHeight, _newScale) {
    this.potButton.setScale(_newScale);
    // this.potButton.setPosition(((_newWidth / 2) + (84 * _newScale)) + (this.potButton.getWidth() * 0.5), (_newHeight - (88 * _newScale)) - (this.potButton.getHeight() * 0.5));
    this.potButton.setPosition(((_newWidth / 2) + (this.BetButtonXpos.potButtonX * _newScale)) + (this.potButton.getWidth() * 0.5), (_newHeight - (this.BetButtonYpos.potButtonY * _newScale)) - (this.potButton.getHeight() * 0.5));
    this.potButtonText.setScale(_newScale);
    this.potButtonText.setPosition(this.potButton.x, this.potButton.y);
    this.checkPotButton.setScale(_newScale);
    this.checkPotButton.setPosition(this.potButton.x - (89 * _newScale), this.potButton.y);
  };

  ShowPotButton(_status) {
    if (_status) {
      this.potButton.SetTexture('raise_half_pot_button');
      this.potButton.show();
      this.potButton.enable();
      this.potButtonText.textNormal.setStyle({ fill: '#FFF3F2' });
      this.potButtonText.show();
      this.potButtonText.enable();
      this.checkPotButton.setVisible(false);
    } else {
      this.HidePotButton();
    }
  };
  HidePotButton() {
    this.potButton.hide();
    this.potButtonText.hide();
    this.checkPotButton.setVisible(false);
    this.potButton.isCheck = false;
  };

  DisablePotButton(_status) {
    if (_status) {
      this.potButton.disable();
      this.potButtonText.disable();
    }
  };

  IsSelectPotButton(_isCheck) {
    if (_isCheck) {
      this.checkPotButton.setVisible(true);
      this.potButton.SetTexture('select_raise_half_pot_button');
      this.potButtonText.textNormal.setStyle({ fill: '#00A8FF' });
      this.raiseAmount = this.currentRaisePotAmount - this.minVal;
      if (this.currentRaisePotAmount > this.minVal) {
        const posX = (((this.currentRaisePotAmount - this.raiseSliderConstantValueObj.sliderMinVal)
          * (this.raiseSliderConstantValueObj.clampMaxRange - this.raiseSliderConstantValueObj.clampMinRange))
          / (this.raiseSliderConstantValueObj.sliderMaxVal - this.raiseSliderConstantValueObj.sliderMinVal))
          + this.raiseSliderConstantValueObj.clampMinRange;
        // console.log('raise amount', this.raiseAmount, posX, this.raiseSliderKnob.x);
        this.RaiseBarTweenControl(posX, this.currentRaisePotAmount);
      }
      else {
        this.RaiseBarTweenControl(0, this.currentRaisePotAmount);
      }
    }
    else {
      this.checkPotButton.setVisible(false);
      this.potButton.SetTexture('raise_half_pot_button');
      this.potButtonText.textNormal.setStyle({ fill: '#FFF3F2' });
      this.raiseAmount = 0;
      this.RaiseBarTweenControl(0, this.raiseAmount + this.minVal);
    }
  }
  //#endregion
  //#################################################################

  //=================== ALL IN BUTTON ================================
  //#region - All In button
  CreateRaisedAllInButton() {
    this.raisedAllInButton = new Button(this.scene, Math.round(this.scene.scale.width / 2), Math.round(this.scene.scale.height), 'raise_half_pot_button');
    this.raisedAllInButton.setClickCallback(this.OnRaisedAllInButtonClicked, this);
    this.raisedAllInButtonText = new Text(this.scene, this.raisedAllInButton.x, this.raisedAllInButton.y, {
      text: Constant.ALL_IN_TEXT,
      fontFamily: 'Poppins-Regular',
      fontSize: '36px',
      fontStyle: 'bold',
      color: '#FFF3F2',
      align: 'center',
      wordWrap: {},
      shadow: {},
    }
    );
    this.checkRaisedAllInButton = this.scene.add.image(0, 0, 'user_check_decision_base').setVisible(false);
  };
  OnRaisedAllInButtonClicked() {
    this.raisedAllInButtonText.TextScaleTween();
    this.threeFourthPotButton.isCheck = false;
    this.IsSelectThreeFourthPotButton(this.threeFourthPotButton.isCheck);
    this.halfPotButton.isCheck = false;
    this.IsSelectHalfPotButton(this.halfPotButton.isCheck);
    this.potButton.isCheck = false;
    this.IsSelectPotButton(this.potButton.isCheck);
    this.raisedAllInButton.isCheck = !this.raisedAllInButton.isCheck;
    this.IsSelectRaisedAllInButton(this.raisedAllInButton.isCheck);
    // this.scene.currentBet = this.currentRaiseAllInAmount;// this.scene.currentInHandBalance;
    // this.scene.PlaceBetForCurrentPlayer();
    // this.HideRaiseSlider();
    // this.HideAllRaisedPopupBetButton();
    // this.DisableRaiseSlider();
    // this.DisableAllRaisedPopupBetButton();
  };
  ResizeRaisedAllInButton(_newWidth, _newHeight, _newScale) {
    this.raisedAllInButton.setScale(_newScale);
    // this.raisedAllInButton.setPosition(((_newWidth / 2) + (254 * _newScale)) + (this.raisedAllInButton.getWidth() * 0.5), (_newHeight - (88 * _newScale)) - (this.raisedAllInButton.getHeight() * 0.5));
    this.raisedAllInButton.setPosition(((_newWidth / 2) + (this.BetButtonXpos.raiseAllInButton * _newScale)) + (this.raisedAllInButton.getWidth() * 0.5), (_newHeight - (this.BetButtonYpos.raiseAllInButton * _newScale)) - (this.raisedAllInButton.getHeight() * 0.5));
    this.raisedAllInButtonText.setScale(_newScale);
    this.raisedAllInButtonText.setPosition(this.raisedAllInButton.x, this.raisedAllInButton.y);
    this.checkRaisedAllInButton.setScale(_newScale);
    this.checkRaisedAllInButton.setPosition(this.raisedAllInButton.x - (89 * _newScale), this.raisedAllInButton.y);
  };
  ShowRaisedAllInButton(_status) {
    if (_status) {
      this.raisedAllInButton.SetTexture('raise_half_pot_button');
      this.raisedAllInButton.show();
      this.raisedAllInButton.enable();
      this.raisedAllInButtonText.textNormal.setStyle({ fill: '#FFF3F2' });
      this.raisedAllInButtonText.show();
      this.raisedAllInButtonText.enable();
      this.checkRaisedAllInButton.setVisible(false);
    } else {
      this.HideRaisedAllInButton();
    }
  };
  HideRaisedAllInButton() {
    this.raisedAllInButton.hide();
    this.raisedAllInButtonText.hide();
    this.checkRaisedAllInButton.setVisible(false);
    this.raisedAllInButton.isCheck = false;
  };

  DisableRaisedAllInButton(_status) {
    if (_status) {
      this.raisedAllInButton.disable();
      this.raisedAllInButtonText.disable();
    }
  };

  IsSelectRaisedAllInButton(_isCheck) {
    if (_isCheck) {
      this.checkRaisedAllInButton.setVisible(true);
      this.raisedAllInButton.SetTexture('select_raise_half_pot_button');
      this.raisedAllInButtonText.textNormal.setStyle({ fill: '#00A8FF' });
      this.raiseAmount = this.currentRaiseAllInAmount - this.minVal;
      if (this.currentRaiseAllInAmount > this.minVal) {
        const posX = (((this.currentRaiseAllInAmount - this.raiseSliderConstantValueObj.sliderMinVal)
          * (this.raiseSliderConstantValueObj.clampMaxRange - this.raiseSliderConstantValueObj.clampMinRange))
          / (this.raiseSliderConstantValueObj.sliderMaxVal - this.raiseSliderConstantValueObj.sliderMinVal))
          + this.raiseSliderConstantValueObj.clampMinRange;
        // console.log('raise amount', this.raiseAmount, posX, this.raiseSliderKnob.x);

        this.RaiseBarTweenControl(posX, this.currentRaiseAllInAmount);
      }
      else {
        this.RaiseBarTweenControl(0, this.currentRaiseAllInAmount);
      }
    }
    else {
      this.checkRaisedAllInButton.setVisible(false);
      this.raisedAllInButton.SetTexture('raise_half_pot_button');
      this.raisedAllInButtonText.textNormal.setStyle({ fill: '#FFF3F2' });
      this.raiseAmount = 0;
    }
  }
  //#endregion
  //#################################################################

  RaiseBarTweenControl(_endPosX, _targetAmt) {
    // console.log(this.raiseSliderKnob.x, this.raiseAmountText.x, '-------');
    this.scene.add.tween({
      targets: [this.raiseSliderKnob, this.raiseAmountText, this.raiseSliderKnobBase],
      x: 4.5 + _endPosX,
      ease: 'Linear',
      duration: 500,
      callbackScope: this,
      onUpdate: () => {
        this.raiseAmountText.x = this.raiseSliderKnob.x + 35;
        this.raiseSliderKnobBase.x = this.raiseAmountText.x;
      }
    });
    this.scene.tweens.add({
      targets: { value: this.raiseTextTweenVal },
      value: _targetAmt,
      duration: 500,
      ease: 'Linear',
      onUpdate: (tween, target) => {
        const raiseAmountText = _targetAmt >= 1000 ? `${(parseFloat(target.value) / 1000).toFixed(2)}k` : parseFloat(target.value).toFixed(0);
        this.raiseTextTweenVal = target.value;
        // this.raiseAmountText.setText(`$ ${parseInt(this.raiseAmount + this.minVal)}`);
        this.raiseAmountText.setText(`$ ${raiseAmountText}`);
      }
    });
    this.scene.tweens.add({
      targets: { value: this.initialCorpWidthRaiseBar },
      value: _endPosX,
      duration: 500,
      ease: 'Linear',
      onUpdate: (tween, target) => {
        this.raiseSliderBar.setCrop(0, 0, target.value + 35, this.raiseSliderBase.height);
        this.initialCorpWidthRaiseBar = target.value;
      }
    });
  };

  //#region - Resize all
  resize(_newWidth, _newHeight, _newScale) {
    this.currScale = _newScale;
    this.currWidth = _newWidth;
    this.currHeight = _newHeight;

    this.ResizeFoldButton(_newWidth, _newHeight, _newScale);
    this.ResizeCallButton(_newWidth, _newHeight, _newScale);
    this.ResizeCheckButton(_newWidth, _newHeight, _newScale);
    this.ResizeAllInButton(_newWidth, _newHeight, _newScale);
    this.ResizeRaiseButton(_newWidth, _newHeight, _newScale);

    this.ResizeHalfPotButton(_newWidth, _newHeight, _newScale);
    this.ResizeThreeFourthPotButton(_newWidth, _newHeight, _newScale);
    this.ResizePotButton(_newWidth, _newHeight, _newScale);
    this.ResizeRaisedAllInButton(_newWidth, _newHeight, _newScale);

    this.ResizeRaiseSlider(_newWidth, _newHeight, _newScale);
  };
  //#endregion

};

export default BottomPanel;