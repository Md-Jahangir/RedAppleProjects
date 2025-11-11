
/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 16-02-2024.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 09-08-2024
 * @Description :- Creating player and handle all player related work.
 ************************************/
import { Model } from '../Model';
import Timer from '../Timer';
import { Utils } from '../Utils.js';

class Player {
  constructor(_scene, _posX, _posY) {
    this.scene = _scene;
    this.posX = _posX;
    this.posY = _posY;
    this.initialTime = 15;
    this.maskScaleFactor = 1;

    this.playerId = null;
    this.remotePlayerId = null;
    this.sittingIndex = null;
    this.isDelear = null;
    this.isSmallBlind = null;
    this.isBigBlind = null;
    this.smallBlindAmount = null;
    this.bigBlindAmount = null;
    this.positionIndex = null;
    this.isIngame = null;

    this.isSitIn = null;
    this.isLeft = null;
    this.cardArray = [];
    this.seconds = 30;
    this.newScaleFactor = null;
    this.frontCardPosArray = [{ x: -90, y: -120, angle: -30 }, { x: -30, y: -140, angle: -10 }, { x: 30, y: -140, angle: 10 }, { x: 90, y: -120, angle: 30 }];
    this.frontCardArray = [];
    this.frontCardOutlineArray = [];
    this.timer = null;

    this.userBalance = null;
    this.isLocalPlayer = false;

    this.CreatePlayer();
  };

  //#region - Create Player
  CreatePlayer() {
    this.playerContainer = this.scene.add.container(this.posX, this.posY);

    this.playerContainer.setDepth(1);
    this.CreateCharacterSection();
    this.CreateFrontCardSection();
    this.CreateBackCardSection();
    this.CreateNameSection();
    this.CreateBalanceSection();
    this.CreateTimer();
    this.CreateDelearSection();
    this.CreateDecisionBaseSection();
    this.CreateSmallBlindSection();
    this.CreateBigBlindSection();
    this.CreateFoldText();
    this.CreateCurrentBetShowArea();
    this.CreateWinData();
    this.CreateOfflineText();
    this.RotateWinRing(this.userWinEffect, this.userWinRing);
  };
  //#endregion

  //#region - Destroy player
  DestroyPlayer() {
    this.playerContainer.destroy();
  };
  //#endregion

  //#region - Create character image, base, mask section
  CreateCharacterSection() {
    this.userBase = this.scene.add.image(0, 0, 'user_base').setOrigin(0.5);
    this.userImage = this.scene.add.image(0, 0, 'profile_pic_0').setOrigin(0.5);
    this.userRing = this.scene.add.image(0, 0, 'user_ring').setOrigin(0.5);
    this.userWinRing = this.scene.add.image(0, 0, 'user_win_ring').setOrigin(0.5).setVisible(false);
    this.userWinEffect = this.scene.add.image(0, 0, 'user_win_effect').setOrigin(0.5).setVisible(false);
    //for depth sorting these obj are add container at CREATEBACKCARDSECTION function-------------
    this.CreateProfileMask();
  };

  AdjustCharacterSection() {
    this.maskScaleFactor = 1.3;
    this.userBase.setScale(1.3);
    this.userImage.setScale(1.3);
    this.userRing.setScale(1.3);
    this.userWinRing.setScale(1.3);
    this.userWinEffect.setScale(1.3);
    this.userPicGraphics.setScale(this.maskScaleFactor);
    this.userNameBase.setTexture('localUser_name_base');
    this.isLocalPlayer = true;
    this.bigBlindBase.setPosition(this.userBase.x - 78, this.userBase.y + 42);
    this.bigBlindText.copyPosition(this.bigBlindBase);
    this.smallBlindBase.setPosition(this.userBase.x - 78, this.userBase.y + 42);
    this.smallBlindText.copyPosition(this.smallBlindBase);
    this.timer.redLayer.setScale(1.3);
    this.winMessageText.y += 50;
    this.winMessageText.setStyle({ fontSize: '60px' });
    this.winStrength.y += 50;
    this.winStrength.setStyle({ fontSize: '35px' });
  }
  CreateProfileMask() {
    this.userPicGraphics = this.scene.add.graphics();
    this.userPicGraphics.fillStyle(0xfff, 0);
    this.userPicGraphics.fillCircle(0, 0, this.userBase.width / 2.1);
    this.userPicGraphics.setPosition(Math.round(this.scene.scale.width / 2), Math.round(this.scene.scale.height / 2));
    const mask = this.userPicGraphics.createGeometryMask();

    this.userImage.setMask(mask);
  };
  SetUserImageFromServer(_img) {
    this.userImage.setTexture(_img);
  };
  //#endregion

  //#region - Create Name Section
  CreateNameSection() {
    this.userNameBase = this.scene.add.image(this.userBase.x, this.userBase.y, 'user_name_base');
    this.userNameBar = this.scene.add.image(this.userBase.x, this.userBase.y, 'user_name_bar');
    const userNameTextStyle = { fontFamily: 'Poppins-Regular', fontSize: '32px', fill: '#D2DAE2', fontStyle: 'normal', align: 'center', wordWrap: { width: this.userNameBase.width + 50 } };
    this.userNameText = this.scene.add.text(this.userBase.x, this.userBase.y, 'Julia Holden', userNameTextStyle).setOrigin(0.5);
    this.playerContainer.add([this.userNameBase, this.userNameText, this.userNameBar]);
  };
  SetUserName(_name) {
    this.userNameText.setText(_name);
  };
  //#endregion

  //#region - Create Balance Section
  CreateBalanceSection() {
    this.userbalanceChip = this.scene.add.image(this.userBase.x, this.userBase.y, 'poker_chip');
    const userBalanceTextStyle = { fontFamily: 'Poppins-Regular', fontSize: '26px', fill: '#D2DAE2', fontStyle: 'normal', align: 'center', wordWrap: { width: this.userBase.width - 10 } };
    this.userBalanceText = this.scene.add.text(this.userBase.x, this.userBase.y, '200k', userBalanceTextStyle).setOrigin(0.5);
    this.playerContainer.add([this.userbalanceChip, this.userBalanceText]);
  };
  SetUserBalance(_bal) {
    this.userBalance = _bal;
    const formattedBalance = _bal >= 1000 ? `${(parseFloat(_bal) / 1000).toFixed(2)}k` : parseFloat(_bal).toFixed(2);
    this.userBalanceText.setText(formattedBalance);
  };
  //#endregion

  //#region - AdjustuserInfoSection
  AdjustPlayerInfoSection(_namePosX, _namePosY, _nameBaseXoffset, _nameTextorigin, _offsetXUserBalance) {
    this.userNameText.setPosition(this.userBase.x + _namePosX, this.userBase.y + _namePosY).setOrigin(_nameTextorigin, 0.5);
    this.userNameBase.setPosition(this.userNameText.x + _nameBaseXoffset, this.userNameText.y + 20);
    this.userNameBar.setPosition(this.userNameText.x + _nameBaseXoffset, this.userNameText.y + 25);
    this.userBalanceText.setPosition(this.userNameText.x + _offsetXUserBalance + 30, this.userNameText.y + 50).setOrigin(_nameTextorigin, 0.5);
    this.userbalanceChip.setPosition((this.userBalanceText.x - 75), this.userNameText.y + 50);
  };
  //#endregion

  //#region - Adjustuser Player win data
  AdjustPlayerWinData(_offsetX, _offsetY, _winAmountOffsetX, _winAmountOffsety, _nameTextorigin) {
    this.winMessageText.setPosition(this.userBase.x + _offsetX, this.userBase.y + _offsetY).setOrigin(_nameTextorigin, 0.5);
    this.winAmountText.setPosition(this.winMessageText.x + _winAmountOffsetX, this.winMessageText.y + _winAmountOffsety).setOrigin(0, 0.5);
    this.chip.setPosition(this.winAmountText.x - 20, this.winAmountText.y - 2).setOrigin(0.5);
    this.winStrength.setPosition(this.winMessageText.x, this.chip.y + 50).setOrigin(_nameTextorigin, 0.5);
  };
  //#endregion

  //#region - Create Delear Section
  CreateDelearSection() {
    this.userDelearBase = this.scene.add.image(this.userBase.x - 80, this.userBase.y, 'user_role_base').setOrigin(0.5);
    this.userDelearBase.setVisible(false);
    // const delearTextStyle = { fontFamily: 'Poppins-SemiBold', fontSize: '17px', fill: '#371125', fontStyle: 'bold', align: 'center' };
    const delearTextStyle = { fontFamily: 'Poppins-SemiBold', fontSize: '32px', fill: '#222743', fontStyle: 'bold', align: 'center' };
    this.delearText = this.scene.add.text(this.userDelearBase.x, this.userDelearBase.y, 'D', delearTextStyle).setOrigin(0.5);
    this.playerContainer.add([this.userDelearBase, this.delearText]);

    this.ShowHideDelearIcon(false);
  };
  ShowHideDelearIcon(_status) {
    this.userDelearBase.setVisible(_status);
    this.delearText.setVisible(_status);
  };
  AdjustDealerSection(_posX, _posY) {
    this.userDelearBase.setPosition(_posX, _posY);
    this.delearText.copyPosition(this.userDelearBase);
  };
  //#endregion

  //#region - Create Back card Section
  CreateBackCardSection() {
    this.userBackCard1 = this.scene.add.sprite(this.userBase.x - 40, this.userBase.y - 70, 'front_card_0').setOrigin(0.5).setScale(1);
    this.userBackCard1.setAngle(-20);
    this.userBackCard1.setFrame(52);
    this.userBackCard2 = this.scene.add.sprite(this.userBase.x - 20, this.userBase.y - 82, 'front_card_0').setOrigin(0.5).setScale(1);
    this.userBackCard2.setAngle(-8);
    this.userBackCard2.setFrame(52);
    this.userBackCard3 = this.scene.add.sprite(this.userBase.x + 5, this.userBase.y - 86, 'front_card_0').setOrigin(0.5).setScale(1);
    this.userBackCard3.setAngle(8);
    this.userBackCard3.setFrame(52);
    this.userBackCard4 = this.scene.add.sprite(this.userBase.x + 40, this.userBase.y - 84, 'front_card_0').setOrigin(0.5).setScale(1);
    this.userBackCard4.setAngle(22);
    this.userBackCard4.setFrame(52);

    this.userBackCard1.setVisible(false);
    this.userBackCard2.setVisible(false);
    this.userBackCard3.setVisible(false);
    this.userBackCard4.setVisible(false);
    this.playerContainer.add([this.userBackCard4, this.userBackCard3, this.userBackCard2, this.userBackCard1]);
    this.playerContainer.add([this.userBase, this.userImage, this.userRing, this.userWinRing, this.userWinEffect]);
    // this.ShowHideBackCard(true);
  };
  // CreateBackCardSection() {
  //   this.userBackCard1 = this.scene.add.sprite(this.userBase.x - 40, this.userBase.y - 50, 'card_spritesheet').setOrigin(0.5).setScale(0.6);
  //   this.userBackCard1.setAngle(-40);
  //   this.userBackCard1.setFrame(52);
  //   this.userBackCard2 = this.scene.add.sprite(this.userBase.x - 20, this.userBase.y - 70, 'card_spritesheet').setOrigin(0.5).setScale(0.6);
  //   this.userBackCard2.setAngle(-10);
  //   this.userBackCard2.setFrame(52);
  //   this.userBackCard3 = this.scene.add.sprite(this.userBase.x + 20, this.userBase.y - 70, 'card_spritesheet').setOrigin(0.5).setScale(0.6);
  //   this.userBackCard3.setAngle(10);
  //   this.userBackCard3.setFrame(52);
  //   this.userBackCard4 = this.scene.add.sprite(this.userBase.x + 40, this.userBase.y - 50, 'card_spritesheet').setOrigin(0.5).setScale(0.6);
  //   this.userBackCard4.setAngle(40);
  //   this.userBackCard4.setFrame(52);

  //   this.userBackCard1.setVisible(false);
  //   this.userBackCard2.setVisible(false);
  //   this.userBackCard3.setVisible(false);
  //   this.userBackCard4.setVisible(false);
  //   this.playerContainer.add([this.userBackCard1, this.userBackCard2, this.userBackCard3, this.userBackCard4]);
  //   this.playerContainer.add([this.userBase, this.userImage, this.userRing]);
  //   // this.ShowHideBackCard(true);
  // };

  //#region - Set Back Card form server 
  SetBackCardImageFromServer(_img) {
    const backCardFrameNum = Utils.GetCurrentBackCardFrame(_img);
    this.userBackCard1.setFrame(backCardFrameNum);
    this.userBackCard2.setFrame(backCardFrameNum);
    this.userBackCard3.setFrame(backCardFrameNum);
    this.userBackCard4.setFrame(backCardFrameNum);
  };
  //#endregion

  //#region - Show Hide back card
  ShowHideBackCard(_status) {
    this.userBackCard1.setVisible(_status);
    this.userBackCard2.setVisible(_status);
    this.userBackCard3.setVisible(_status);
    this.userBackCard4.setVisible(_status);
  };
  //#endregion

  //#region - Create Front card Section
  CreateFrontCardSection() {
    // for (let i = 0; i < 4; i++) {
    for (let i = 3; i >= 0; i--) {
      const card = this.scene.add.sprite(this.frontCardPosArray[i].x, this.frontCardPosArray[i].y, 'front_card_0').setOrigin(0.5).setScale(1);
      card.setAngle(this.frontCardPosArray[i].angle);
      card.setVisible(false);
      card.setFrame(i + 5);
      this.playerContainer.add(card);
      this.frontCardArray.push(card);

      const cardOutline = this.scene.add.sprite(this.frontCardPosArray[i].x, this.frontCardPosArray[i].y, 'card_outline').setOrigin(0.5).setScale(0.48);
      cardOutline.setAngle(this.frontCardPosArray[i].angle);
      cardOutline.setVisible(false);
      this.playerContainer.add(cardOutline);
      this.frontCardOutlineArray.push(cardOutline);
    }
  };
  //#endregion

  //#region - Set Front Card form server
  SetFrontCardImageFromServer(_img) {
    for (let i = 0; i < this.frontCardArray.length; i++) {
      this.frontCardArray[i].setTexture(_img);
    }
  };
  //#endregion

  ShowHideFrontCard(_status, _isViaGameState) {
    this.HideOutline();
    for (let i = 0; i < this.frontCardArray.length; i++) {
      this.frontCardArray[i].setAlpha(1);
      this.frontCardArray[i].setVisible(_status);
    }
    this.RotateFrontCard(_isViaGameState);
  };

  SetCardValue(_cardDetails) {
    for (let i = 0; i < this.frontCardArray.length; i++) {
      const cardVal = Model.GetActualCardFrameIndex(_cardDetails[i].card_id);
      this.frontCardArray[i].setFrame(cardVal);
    }
  };

  //#region - Rotate front animation
  RotateFrontCard(_isViaGameState) {
    if (!_isViaGameState) {
      this.scene.add.tween({
        targets: this.frontCardArray,
        scaleX: 0,
        ease: 'Linear',
        duration: 200,
        callbackScope: this,
        onComplete: function () {
          this.scene.add.tween({
            targets: this.frontCardArray,
            scaleX: 1,
            ease: 'Linear',
            duration: 200
          });
        }
      });
    }
  };
  //#endregion

  HighlightSelectedFrontCard(_targets) {
    this.frontCardOutlineArray[_targets].setVisible(true);
    this.scene.add.tween({
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
  //#endregion

  //#region - Create Decision base section
  CreateDecisionBaseSection() {
    this.userDecisionBase = this.scene.add.image(0, 0, 'user_check_decision_base').setOrigin(0.5);
    this.userDecisionBase.setVisible(false);
    const decisionTextStyle = { fontFamily: 'Poppins-Regular', fontSize: '30px', fill: '#FFF3F2', fontStyle: 'bold', align: 'center'/*, wordWrap: { width: this.userDecisionBase.width - 10 }*/ };
    this.decisionText = this.scene.add.text(this.userDecisionBase.x, this.userDecisionBase.y, 'Check', decisionTextStyle).setOrigin(0.5).setVisible(false);
    this.playerContainer.add([this.userDecisionBase, this.decisionText]);

    // this.HideDecisionBase();
  };
  AdjustDecisionBase(_posX, _posY, _offsetX, _originX) {
    this.userDecisionBase.setPosition(this.userBase.x + _posX, this.userBase.y - _posY);
    this.decisionText.setOrigin(_originX, 0.5);
    this.decisionText.setPosition(this.userDecisionBase.x + _offsetX, this.userDecisionBase.y);
    // this.currentBetShowText.setPosition(this.decisionText.x, this.decisionText.y + 20).setOrigin(_originX, 0.5);
    this.AdjustFoldBase(_posX, _posY, _offsetX, _originX);
    // this.AdjustCurrentBetShowArea(_posX, _posY, _offsetX, _originX);
  }
  ShowDecisionBase(_msg, isTexture) {
    if (isTexture !== false) {
      this.userDecisionBase.setTexture(`user_${_msg}_decision_base`);
      this.userDecisionBase.setVisible(true);
    }
    _msg = _msg.charAt(0).toUpperCase() + _msg.slice(1);
    this.decisionText.setText(_msg);
    this.decisionText.setVisible(true);
    this.scene.add.tween({
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
    // console.log('--hide');
    this.scene.add.tween({
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
  //#endregion

  //#region - Create Small Blind Section
  CreateSmallBlindSection() {
    this.smallBlindBase = this.scene.add.image(this.userBase.x - 47.5, this.userBase.y + 55, 'user_role_base').setOrigin(0.5);
    this.smallBlindBase.setVisible(false);
    // const smallBlindAmountTextStyle = { fontFamily: 'Poppins-SemiBold', fontSize: '17px', fill: '#371125', fontStyle: 'bold', align: 'center', wordWrap: { width: this.smallBlindBase.width - 10 } };
    const smallBlindAmountTextStyle = { fontFamily: 'Poppins-SemiBold', fontSize: '32px', fill: '#222743', fontStyle: 'bold', align: 'center', wordWrap: { width: this.smallBlindBase.width - 10 } };
    this.smallBlindText = this.scene.add.text(this.smallBlindBase.x, this.smallBlindBase.y, 'SB', smallBlindAmountTextStyle).setOrigin(0.5);
    this.playerContainer.add([this.smallBlindBase, this.smallBlindText]);
    this.ShowHideSmallBlind(false);
  };
  ShowHideSmallBlind(_status) {
    this.smallBlindBase.setVisible(_status);
    this.smallBlindText.setVisible(_status);
    // this.smallBlindText.setText(this.smallBlindAmount);
  };
  //#endregion
  AdjustSmallBlindSection(_posX, _posY) {
    this.smallBlindBase.setPosition(_posX, _posY);
    this.smallBlindText.copyPosition(this.smallBlindBase);
  };

  //#region - Create Big Blind Section
  CreateBigBlindSection() {
    this.bigBlindBase = this.scene.add.image(this.userBase.x - 47.5, this.userBase.y + 55, 'user_role_base').setOrigin(0.5);
    this.bigBlindBase.setVisible(false);
    // const bigBlindTextStyle = { fontFamily: 'Poppins-SemiBold', fontSize: '17px', fill: '#371125', fontStyle: 'bold', align: 'center', wordWrap: { width: this.bigBlindBase.width - 10 } };
    const bigBlindTextStyle = { fontFamily: 'Poppins-SemiBold', fontSize: '32px', fill: '#222743', fontStyle: 'bold', align: 'center', wordWrap: { width: this.bigBlindBase.width - 10 } };
    this.bigBlindText = this.scene.add.text(this.bigBlindBase.x, this.bigBlindBase.y, 'BB', bigBlindTextStyle).setOrigin(0.5);
    // const bigBlindAmountTextStyle = { fontFamily: 'Poppins-SemiBold', fontSize: '30px', fill: '#fff', fontStyle: 'bold', align: 'center', wordWrap: { width: this.bigBlindBase.width - 10 } };
    // this.bigBlindAmountText = this.scene.add.text(this.bigBlindBase.x + 15, this.bigBlindBase.y, this.bigBlindAmount, bigBlindAmountTextStyle).setOrigin(0.5);
    this.playerContainer.add([this.bigBlindBase, this.bigBlindText]);
    this.ShowHideBigBlind(false);
  };
  ShowHideBigBlind(_status) {
    this.bigBlindBase.setVisible(_status);
    this.bigBlindText.setVisible(_status);
    // this.bigBlindAmountText.setText(this.bigBlindAmount);
    // this.bigBlindAmountText.setVisible(_status);
  };
  //#endregion
  AdjustBigBlindSection(_posX, _posY) {
    this.bigBlindBase.setPosition(_posX, _posY);
    this.bigBlindText.copyPosition(this.bigBlindBase);
  };

  AdjustCurrentBetShowArea(_posX, _posY, _allignment) {
    this.currentBetBase.setPosition(_posX, _posY);
    if (_allignment === 1) {
      this.currentBetBase.setFlipX(true);
      this.currentBetChip.setPosition(this.currentBetBase.x + 67.5, this.currentBetBase.y + 6);
      this.winAmountText.setPosition(this.currentBetBase.x - 10, this.currentBetBase.y + 6);
      this.chip.setPosition(this.winAmountText.x + 50, this.winAmountText.y - 2);
    }
    else {
      this.currentBetChip.setPosition(this.currentBetBase.x - 67.5, this.currentBetBase.y + 6);
      this.winAmountText.setPosition(this.currentBetBase.x, this.currentBetBase.y + 6).setOrigin(0, 0.5);
      this.chip.setPosition(this.winAmountText.x - 50, this.winAmountText.y - 2);
      if (_allignment === 2) {
        this.winAmountText.setPosition(this.currentBetBase.x, this.currentBetBase.y + 150);
        this.chip.setPosition(this.winAmountText.x - 50, this.winAmountText.y);
      }
    }
    this.currentBetShowText.setPosition(this.currentBetBase.x, this.currentBetBase.y);
  };

  //#region - Create Fold text Section
  CreateFoldText() {
    this.foldTextBase = this.scene.add.image(this.userBase.x, this.userBase.y, 'user_fold_decision_base').setOrigin(0.5);
    const foldTextStyle = { fontFamily: 'Poppins-SemiBold', fontSize: '30px', fill: '#fff', fontStyle: 'bold', align: 'center', wordWrap: { width: this.foldTextBase.width - 10 } };
    this.foldText = this.scene.add.text(this.foldTextBase.x, this.foldTextBase.y, 'Fold', foldTextStyle).setOrigin(0.5);
    this.playerContainer.add([this.foldTextBase, this.foldText]);
    this.ShowHideFoldText(false);
  };

  AdjustFoldBase(_posX, _posY, _offsetX, _originX) {
    this.foldTextBase.setPosition(this.userBase.x + _posX, this.userBase.y - _posY);
    this.foldText.setOrigin(_originX, 0.5);
    this.foldText.setPosition(this.foldTextBase.x + _offsetX, this.foldTextBase.y);
  }

  ShowHideFoldText(_status) {
    this.foldTextBase.setVisible(_status);
    this.foldText.setVisible(_status);
    if (_status) {
      this.HideDecisionBase();
    }
  };
  //#endregion

  //#region - Create Current bet show  Section
  CreateCurrentBetShowArea() {
    this.currentBetBase = this.scene.add.image(this.userBase.x, this.userBase.y, 'pot_value_base').setOrigin(0.5);
    this.currentBetChip = this.scene.add.image(this.currentBetBase.x - 67.5, this.currentBetBase.y + 8, 'pot_value_chip').setOrigin(0.5);
    const currentBetShowTextStyle = { fontFamily: 'Poppins-SemiBold', fontSize: '22px', fill: '#fff', fontStyle: 'bold', align: 'center',/* wordWrap: { width: this.currentBetShowBase.width - 10 } 8*/ };
    this.currentBetShowText = this.scene.add.text(this.userBase.x - 140, this.userBase.y - 60, '', currentBetShowTextStyle).setOrigin(0.5);


    this.playerContainer.add([this.currentBetBase, this.currentBetChip, this.currentBetShowText]);
    this.ShowHideCurrentBetShowArea(false, '');
  };
  ShowHideCurrentBetShowArea(_status, _amt) {
    const formattedBalance = _amt >= 1000 ? `${(parseFloat(_amt) / 1000).toFixed(1)}k` : parseFloat(_amt).toFixed(2);
    this.currentBetShowText.setText(formattedBalance);
    this.currentBetShowText.setVisible(_status);
    this.currentBetChip.setVisible(_status);
    this.currentBetBase.setVisible(_status);
  };

  UpdateCurrentBetText(_amt) {
    const formattedBalance = _amt >= 1000 ? `${(parseFloat(_amt) / 1000).toFixed(1)}k` : parseFloat(_amt).toFixed(2);
    this.currentBetShowText.setText(formattedBalance);
  };
  //#endregion

  CreateWinData() {
    const winMessageTextStyle = { fontFamily: 'Poppins-SemiBold', fontSize: '40px', fill: '#F7B731', fontStyle: 'bold', align: 'center' };
    this.winMessageText = this.scene.add.text(this.userBase.x, this.userBase.y + 230, 'You Win', winMessageTextStyle).setOrigin(0.5).setVisible(false);
    const winStrengthStyle = { fontFamily: 'Poppins-SemiBold', fontSize: '32px', fill: '#F7B731', fontStyle: 'bold', align: 'center', wordWrap: { width: this.userNameBase.width + 50 } };
    this.winStrength = this.scene.add.text(this.winMessageText.x, this.winMessageText.y + 70, '2 PAIR', winStrengthStyle).setOrigin(0.5).setVisible(false);
    const winAmountTextStyle = { fontFamily: 'Poppins-SemiBold', fontSize: '51px', fill: '#F7B731', fontStyle: 'bold', align: 'left' };
    this.winAmountText = this.scene.add.text(this.userBase.x, this.userBase.y, '200k', winAmountTextStyle).setOrigin(1, 0.5).setVisible(false);
    this.chip = this.scene.add.image(this.winAmountText.x - 100, this.winAmountText.y - 2, 'buy_in_slider_chip').setOrigin(0.5).setVisible(false);
    this.playerContainer.add([this.winMessageText, this.winStrength, this.winAmountText, this.chip]);
  };

  HidePlayerInfoShowDownRound(_status) {
    // this.userNameBase.setVisible(_status);
    // this.userNameText.setVisible(_status);
    // this.userbalanceChip.setVisible(_status);
    // this.userBalanceText.setVisible(_status);
    _status ? this.rotateWinRing.pause() : this.rotateWinRing.play();
  };

  RotateWinRing(_obj1, obj2) {
    this.rotateWinRing = this.scene.add.tween({
      targets: [_obj1, obj2],
      angle: 360,
      ease: 'Linear',
      repeat: -1,
      duration: 3000,
    });
    this.rotateWinRing.pause();
  };

  SetWinData(_name, _amount, _strength, _status) {
    this.winMessageText.setText(`${_name} WIN!`).setVisible(_status);
    this.winStrength.setText(_strength).setVisible(_status);
    this.userWinRing.setVisible(_status);
    this.userWinEffect.setVisible(_status);
    this.chip.setVisible(_status);
    const winAmount = _amount >= 1000 ? `${(parseFloat(_amount) / 1000).toFixed(2)}k` : parseFloat(_amount).toFixed(0);
    this.winAmountText.setText(winAmount).setVisible(_status);
  }

  // AdjustCurrentBetShowArea(_posX, _posY, _offsetX, _originX) {
  //   this.currentBetBase.setPosition(this.userBase.x + _posX, this.userBase.y - _posY - 30);
  //   this.currentBetShowText.setOrigin(_originX, 0.5);
  //   this.currentBetShowText.setPosition(this.currentBetBase.x + _offsetX, this.currentBetBase.y - 4);
  // };

  //#region - Create Offline text section
  CreateOfflineText() {
    // this.offlineTextBase = this.scene.add.image(this.userBase.x, this.userBase.y, 'user_decision_base').setOrigin(0.5);
    const offlineTextStyle = { fontFamily: 'Poppins-SemiBold', fontSize: '20px', fill: '#fff', fontStyle: 'bold', align: 'center' };
    this.offlineText = this.scene.add.text(this.userBase.x, this.userBase.y, 'OFFLINE', offlineTextStyle).setOrigin(0.5);
    this.playerContainer.add([this.offlineText]);
    this.ShowHideOfflineText(false);
  };

  ShowHideOfflineText(_status) {
    this.offlineText.setVisible(_status);
  };
  //#endregion

  //#region - Create Timer section
  CreateTimer() {
    this.timer = new Timer(this.scene, this.playerContainer.x, this.playerContainer.y);
    const timeValueTextStyle = { fontFamily: 'Poppins-Regular', fontSize: '50px', fill: '#00ff00', fontStyle: 'bold', align: 'center' };
    this.timeValueText = this.scene.add.text(0, 0, '', timeValueTextStyle).setOrigin(0.5);
    this.playerContainer.add(this.timeValueText);
    this.playerContainer.add([this.timer.redLayer]);
  };
  // SetTimerValue(_sec) {
  //   this.timeValueText.setText(_sec);
  //   this.timeValueText.setVisible(false);
  // }
  // ShowHideTimer(_status) {
  //   this.SetTimerValue('');
  //   this.timeValueText.setVisible(_status);
  // };

  ShowGraphicsTimer(_totalTime) {
    this.timer.ShowTimer(_totalTime);
    this.timer.ShowOnTop();
  };

  HideGraphicsTimer() {
    // this.timer.counter = undefined;
    this.timer.HideTimer();
  };
  //#endregion

  //######################################################
  //#region - Fold player
  FoldPlayer() {
    this.ShowHideFoldText(true);
    // this.ShowHideFrontCard(false);
    // this.ShowHideBackCard(false);
    this.playerContainer.setAlpha(0.5);
  };
  //#endregion

  //#region - Unfold player
  UnfoldPlayer() {
    this.ShowHideFrontCard(false);
    this.ShowHideFoldText(false);
    this.playerContainer.setAlpha(1);
  };
  //#endregion

  //#region - Inactive player
  InactivePlayer() {
    this.ShowHideOfflineText(true);
    this.ShowHideFrontCard(false);
    this.ShowHideBackCard(false);
    this.playerContainer.setAlpha(0.5);
  };
  //#endregion

  //#region - Active player
  ActivePlayer() {
    this.ShowHideOfflineText(false);
    this.ShowHideFrontCard(false);
    this.ShowHideBackCard(false);
    this.playerContainer.setAlpha(1);
  };
  //#endregion

  //#region - Destroy player
  DestroyPlayer() {
    this.playerContainer.destroy();
  };
  //#endregion

  //#region - Set data for player
  SetPlayerId(_id) {
    this.playerId = _id;
  };
  GetPlayerId() {
    return this.playerId;
  };

  SetRemotePlayerId(_remoteId) {
    this.remotePlayerId = _remoteId;
  }
  GetRemotePlayerId() {
    return this.remotePlayerId;
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

  SetIsPlayerInGame(_status) {
    this.isIngame = _status;
  };
  GetIsPlayerInGame() {
    return this.isIngame;
  };

  //#region - resize all
  resize(_newWidth, _newHeight, _newScale) {
    this.playerContainer.setScale(_newScale);
    this.playerContainer.setPosition((_newWidth / 2) + (this.posX * _newScale), (_newHeight / 2) + (this.posY * _newScale));
    this.userPicGraphics.setScale(_newScale * this.maskScaleFactor);
    this.userPicGraphics.setPosition((_newWidth / 2) + (this.posX * _newScale), (_newHeight / 2) + (this.posY * _newScale));

    this.timer.resize(_newWidth, _newHeight, _newScale, this.isLocalPlayer);

    this.newScaleFactor = _newScale;
  };
  //#endregion
}

export default Player;