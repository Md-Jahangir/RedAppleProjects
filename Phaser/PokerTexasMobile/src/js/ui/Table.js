/* global window,console */
/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 16-02-2024.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 09-08-2024
 * @Description :- Design and control the table,table card of the gameplay page.
 ************************************/

import { Model } from '../Model';
import { Utils } from '../Utils.js';
class Table {
  constructor(_scene) {
    this.scene = _scene;
    this.tableContainer = null;
    this.tableAnimContainer = null;
    this.tableCardArray = [];
    this.potSplitArray = [];
    this.newScaleFactor = null;
    this.currentWidth = null;
    this.currentHeight = null;
    this.tableCardOutlineArray = [];

    this.bgConstantValueObj = {
      tableBgPosX: -519,
      tableBgPosY: -220
    };
    this.potBaseConstantValueObj = {
      potValueBasePosX: 20,
      potValueBasePosY: -244,
    };
    // this.potSplitConstantValueObj = {
    //   potSplitPosXArray: [40, -80, -160, -280],
    //   potSplitStartPosY: -120,
    //   potSplitStartGapX: -40,
    //   potSplitScale: 0.8,
    // };
    this.potSplitScale = 1;
    this.tableCardConstantValueObj = {
      numberOfCards: 5,
      tableCardScale: 1,
      tableCardStartPosX: -190,
      // tableCardStartPosX: -10,
      tableCardStartPosY: -80,
      tableCardGapX: 7,
      tableCardRotationTweenScaleX: 0,
      tableCardRotationTweenDuration: 200,
    };
    this.tableCardPosXarr = [{ posX: 28 }, { posX: 28 }, { posX: 28 }, { posX: 28 }, { posX: 28 }];
    this.cardOutlineConstantValueObj = {
      tableCardOutlineScale: 0.8,
      tableCardOutlineTweenScale: 0.85,
      tableCardOutlineTweenDuration: 300,
      outlineGapX: -2
    };
    this.create();
  };

  //#region - Create function
  create() {
    this.tableContainer = this.scene.add.container(window.innerWidth / 2, window.innerHeight / 2);
    this.tableAnimContainer = this.scene.add.container(window.innerWidth / 2, window.innerHeight / 2).setDepth(3);
    this.CreateTableBg();
    this.CreatePotValueArea();
    this.CreateTableCard();
    try {
      const localPlayerData = Model.GetLocalPlayerData();
      if (localPlayerData.settings.table_theme.felt_color) {
        this.SetTableBgFromServer(localPlayerData.settings.table_theme.felt_color);
      } else {
        this.SetTableBgFromServer('table_bg_0');
      }

      if (localPlayerData.settings.table_theme.front_deck) {
        this.SetTableCardImageFromServer(localPlayerData.settings.table_theme.front_deck);
      } else {
        this.SetTableCardImageFromServer('front_card_0');
      }

      if (localPlayerData.settings.table_theme.back_deck) {
        this.SetBackCardImageFromServer(localPlayerData.settings.table_theme.back_deck);
      } else {
        this.SetBackCardImageFromServer('back_card_0');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error: ', error);

    }
  };
  //#endregion

  //#region - Table bg section
  CreateTableBg() {
    this.tableBg = this.scene.add.image(0, -44, 'table_bg_0').setOrigin(0.5);
    // this.tableBg.setPosition(this.bgConstantValueObj.tableBgPosX + (this.tableBg.displayWidth * 0.5), this.bgConstantValueObj.tableBgPosY + (this.tableBg.displayHeight * 0.5));
    this.tableContainer.add(this.tableBg);
  };
  //#endregion

  SetTableBgFromServer(_tableName) {
    this.tableBg.setTexture(_tableName);
  };

  //#region - Pot value section
  CreatePotValueArea() {
    this.potValueBase = this.scene.add.image(this.potBaseConstantValueObj.potValueBasePosX, this.potBaseConstantValueObj.potValueBasePosY, 'pot_value_base').setOrigin(0.5);
    this.potValueChip = this.scene.add.image(this.potValueBase.x - 67.5, this.potValueBase.y + 8, 'pot_value_chip').setOrigin(0.5);
    this.animChip = this.scene.add.spine(this.potValueChip.x, this.potValueChip.y, 'coin', 'animation', false).setVisible(false).setScale(0.2);
    this.winAnim = this.scene.add.spine(0, 0, 'confetti', 'animation', false).setVisible(false);
    const potValueTextStyle = { fontFamily: 'Poppins-Medium', fontSize: '26px', fill: '#FFF3F2', fontStyle: 'bold', align: 'center', wordWrap: { width: this.potValueBase.width - 5 } };
    this.potValueText = this.scene.add.text(this.potValueBase.x + 12, this.potValueBase.y + 2, '', potValueTextStyle).setOrigin(0.5);
    this.tableContainer.add([this.potValueBase, this.potValueChip, this.potValueText]);
    this.tableAnimContainer.add([this.winAnim, this.animChip]);
    this.ShowHidePotBase(false);
  };

  ShowHidePotBase(_status) {
    this.potValueBase.setVisible(_status);
    this.potValueChip.setVisible(_status);
    this.potValueText.setVisible(_status);
  };

  SetPotValue(_amt) {
    Model.SetCurrentPotTextBalance(_amt);
    const formattedBalance = _amt >= 1000 ? `${(parseFloat(_amt) / 1000).toFixed(2)}k` : parseFloat(_amt).toFixed(2);
    this.potValueText.setText(formattedBalance);
    this.ShowHidePotBase(true);
  };

  // CreatePotSplitArea(_arr) {
  //   this.potSplitContainer = this.scene.add.container(0, 0);
  //   const posArr = this.potSplitConstantValueObj.potSplitPosXArray;
  //   const startPosX = posArr[_arr.length - 1];
  //   const startPosY = this.potSplitConstantValueObj.potSplitStartPosY;
  //   const gapX = this.potSplitConstantValueObj.potSplitStartGapX;
  //   for (let i = 0; i < _arr.length; i++) {
  //     const potBase = this.scene.add.image(0, 0, 'pot_value_base').setOrigin(0.5);//.setScale(this.potSplitConstantValueObj.potSplitScale);
  //     potBase.setPosition(startPosX + (i * potBase.displayWidth) + gapX, startPosY);
  //     const potValueChip = this.scene.add.image(potBase.x - 67.5, potBase.y + 8, 'pot_value_chip').setOrigin(0.5);
  //     const potValueTextStyle = { fontFamily: 'Poppins-Medium', fontSize: '18px', fill: '#FFF3F2', fontStyle: 'bold', align: 'center', wordWrap: { width: this.potBase.width - 10 } };
  //     const potAmtText = this.scene.add.text(potBase.x, potBase.y, _arr[i].val, potValueTextStyle).setOrigin(0.5);//.setScale(this.potSplitConstantValueObj.potSplitScale);
  //     this.potSplitArray.push(potAmtText);
  //     this.potSplitContainer.add([potBase, potValueChip, potAmtText]);
  //   }
  //   this.tableContainer.add(this.potSplitContainer);
  // };

  CreatePotSplitArea(_arr) {
    this.potSplitContainer = this.scene.add.container(0, 0);
    const initialPosX = this.potValueBase.x;
    const initialPosY = this.potValueBase.y - 140;
    const gap = this.potValueBase.displayWidth + (2 * (initialPosX - (this.potValueBase.displayWidth / 2)));
    if (_arr.length === 1) {
      const potBase = this.scene.add.image(0, 0, 'pot_value_base').setOrigin(0.5).setScale(this.potSplitScale);
      potBase.setPosition(initialPosX, initialPosY + 200);
      const potValueChip = this.scene.add.image(potBase.x - 67.5, potBase.y + 4, 'pot_value_chip').setOrigin(0.5).setScale(this.potSplitScale);
      const potValueTextStyle = { fontFamily: 'Poppins-Medium', fontSize: '26px', fill: '#FFF3F2', fontStyle: 'bold', align: 'center', wordWrap: { width: potBase.width - 5 } };
      const potAmtTextFormat = _arr[0].val >= 1000 ? `${(parseFloat(_arr[0].val) / 1000).toFixed(2)}k` : parseFloat(_arr[0].val).toFixed(2);
      const potAmtText = this.scene.add.text(potBase.x + 12, potBase.y + 2, potAmtTextFormat, potValueTextStyle).setOrigin(0.5).setScale(this.potSplitScale);
      this.potSplitArray.push(potAmtText);
      this.potSplitContainer.add([potBase, potValueChip, potAmtText]);
    } else {
      const totalWidth = (2 * this.potValueBase.displayWidth) + ((2 - 1) * gap);
      const startX = initialPosX - (totalWidth / 2) + (this.potValueBase.displayWidth / 2);
      let resetFactorX = 0;
      let HeightGap = 0;
      for (let i = 0; i < _arr.length; i++) {
        if (i % 2 === 0) {
          resetFactorX = 0;
          HeightGap += 200;
        }
        const potBase = this.scene.add.image(0, 0, 'pot_value_base').setOrigin(0.5).setScale(this.potSplitScale);
        potBase.setPosition(startX + (resetFactorX * (this.potValueBase.displayWidth + gap)), initialPosY + HeightGap);
        const potValueChip = this.scene.add.image(potBase.x - 67.5, potBase.y + 4, 'pot_value_chip').setOrigin(0.5).setScale(this.potSplitScale);
        const potValueTextStyle = { fontFamily: 'Poppins-Medium', fontSize: '26px', fill: '#FFF3F2', fontStyle: 'bold', align: 'center', wordWrap: { width: potBase.width - 5 } };
        const potAmtTextFormat = _arr[i].val >= 1000 ? `${(parseFloat(_arr[0].val) / 1000).toFixed(2)}k` : parseFloat(_arr[i].val).toFixed(2);
        const potAmtText = this.scene.add.text(potBase.x + 12, potBase.y + 2, potAmtTextFormat, potValueTextStyle).setOrigin(0.5).setScale(this.potSplitScale);
        this.potSplitArray.push(potAmtText);
        this.potSplitContainer.add([potBase, potValueChip, potAmtText]);
        resetFactorX += 1;
      }
    }
    this.tableContainer.add(this.potSplitContainer);
  };

  DestroyPotSplitArea() {
    if (this.potSplitContainer) {
      this.potSplitContainer.destroy();
      this.potSplitArray = [];
    }
  };
  //#endregion


  //#region - Table card section
  CreateTableCard() {
    const startXPos = this.tableCardConstantValueObj.tableCardStartPosX;
    const yPos = this.tableCardConstantValueObj.tableCardStartPosY;
    const gapX = this.tableCardConstantValueObj.tableCardGapX;
    for (let i = 0; i < this.tableCardConstantValueObj.numberOfCards; i++) {
      const card = this.scene.add.sprite(0, 0, 'front_card_0').setOrigin(0.5).setScale(this.tableCardConstantValueObj.tableCardScale);
      card.setPosition(startXPos + (i * (card.width + gapX)), yPos);
      // card.setPosition(this.tableCardPosXarr[i].posX, yPos);
      card.setFrame(i);
      card.setVisible(false);
      this.tableCardArray.push(card);

      const cardOutline = this.scene.add.sprite(0, 0, 'card_outline').setOrigin(0.5).setScale(this.cardOutlineConstantValueObj.tableCardOutlineScale);
      cardOutline.setPosition(startXPos + (i * (cardOutline.width + gapX)), yPos);
      // cardOutline.setPosition(this.tableCardPosXarr[i].posX, yPos);
      cardOutline.setVisible(false);
      this.tableCardOutlineArray.push(cardOutline);
    }
  };
  //#endregion

  SetTableCardImageFromServer(_img) {
    for (let i = 0; i < this.tableCardArray.length; i++) {
      this.tableCardArray[i].setTexture(_img);
    }
  };

  //#region - Set Back Card form server 
  SetBackCardImageFromServer(_img) {
    const backCardFrameNum = Utils.GetCurrentBackCardFrame(_img);
    for (let i = 0; i < this.tableCardArray.length; i++) {
      this.tableCardArray[i].setFrame(backCardFrameNum);
    }
  };
  //#endregion

  //#region - Show card
  ShowTableCard(_arr, _roundName, _isViaGameState) {
    switch (_roundName) {
      case 'flop':
        for (let i = 0; i < _arr.length; i++) {
          const cardFrame = Model.GetActualCardFrameIndex(_arr[i].card_id);
          this.tableCardArray[i].setVisible(true);
          this.tableCardArray[i].name = _arr[i].card_id;
          this.RotateTableCard(this.tableCardArray[i], cardFrame, _isViaGameState);
        }
        // this.TableCardPositionAdjust(_arr.length);
        // setTimeout(() => {
        //   for (let i = 0; i < _arr.length; i++) {
        //     const cardFrame = Model.GetActualCardFrameIndex(_arr[i].card_id);
        //     this.tableCardArray[i].setVisible(true);
        //     this.tableCardArray[i].name = _arr[i].card_id;
        //     this.RotateTableCard(this.tableCardArray[i], cardFrame, _isViaGameState);
        //   }
        // }, (_arr.length * 120));
        break;
      case 'turn':
        {
          const cardFrame = Model.GetActualCardFrameIndex(_arr[0].card_id);
          // Previous
          this.tableCardArray[3].setVisible(true);
          this.tableCardArray[3].name = _arr[0].card_id;
          this.RotateTableCard(this.tableCardArray[3], cardFrame, _isViaGameState);
          // const cardFrame = Model.GetActualCardFrameIndex(_arr[0].card_id);
          // this.TableCardPositionAdjust(4);
          // setTimeout(() => {
          //   this.tableCardArray[3].setVisible(true);
          //   this.tableCardArray[3].name = _arr[0].card_id;
          //   this.RotateTableCard(this.tableCardArray[3], cardFrame, _isViaGameState);
          // }, (4 * 120));
        }
        break;
      case 'river':
        {
          const cardFrame = Model.GetActualCardFrameIndex(_arr[0].card_id);
          // previous
          this.tableCardArray[4].setVisible(true);
          this.tableCardArray[4].name = _arr[0].card_id;
          this.RotateTableCard(this.tableCardArray[4], cardFrame, _isViaGameState);
          // const cardFrame = Model.GetActualCardFrameIndex(_arr[0].card_id);
          // this.TableCardPositionAdjust(5);
          // setTimeout(() => {
          //   this.tableCardArray[4].setVisible(true);
          //   this.tableCardArray[4].name = _arr[0].card_id;
          //   this.RotateTableCard(this.tableCardArray[4], cardFrame, _isViaGameState);
          // }, (5 * 120));
        }
        break;
      default:
        for (let i = 0; i < _arr.length; i++) {
          const cardFrame = Model.GetActualCardFrameIndex(_arr[i].card_id);
          this.tableCardArray[i].setVisible(true);
          this.tableCardArray[i].name = _arr[i].card_id;
          this.RotateTableCard(this.tableCardArray[i], cardFrame, _isViaGameState);
        }
      // this.TableCardPositionAdjust(_arr.length);
      // setTimeout(() => {
      //   for (let i = 0; i < _arr.length; i++) {
      //     const cardFrame = Model.GetActualCardFrameIndex(_arr[i].card_id);
      //     this.tableCardArray[i].setVisible(true);
      //     this.tableCardArray[i].name = _arr[i].card_id;
      //     this.RotateTableCard(this.tableCardArray[i], cardFrame, _isViaGameState);
      //   }
      // }, (_arr.length * 100));
    }
  };
  //#endregion

  TableCardPositionAdjust(_CardLength, _isViaGameState) {
    const gapX = this.tableCardConstantValueObj.tableCardGapX;
    const startXpos = this.tableCardConstantValueObj.tableCardStartPosX - ((this.tableCardArray[0].width / 2) * (_CardLength - 1));
    const yPos = this.tableCardConstantValueObj.tableCardStartPosY;
    for (let i = 0; i < _CardLength; i++) {
      const cardPosition = (this.currentWidth / 2) + (((startXpos) + (i * (this.tableCardArray[i].width + gapX))) * this.newScaleFactor);
      this.tableCardPosXarr[i].posX = (((this.currentWidth / 2) + ((startXpos) + (i * (this.tableCardArray[i].width + gapX)))) - (this.currentWidth / 2));
      if (!_isViaGameState) {

        this.scene.tweens.add({
          targets: this.tableCardArray[i],
          x: cardPosition,
          duration: 500,
          ease: 'Power2',
          delay: i * 100
        });
      }
      else {
        this.tableCardArray[i].setScale(this.newScaleFactor * this.tableCardConstantValueObj.tableCardScale);
        this.tableCardArray[i].setPosition((this.currentWidth / 2) + ((this.tableCardPosXarr[i].posX) * this.newScaleFactor), (this.currentHeight / 2) + (yPos * this.newScaleFactor));
      }
    }
  };

  //#region - Rotate card
  RotateTableCard(_obj, _frame, _isViaGameState) {
    if (_isViaGameState) {
      _obj.setFrame(_frame);
    }
    else {
      this.scene.add.tween({
        targets: [_obj],
        scaleX: this.tableCardConstantValueObj.tableCardRotationTweenScaleX,
        ease: 'Linear',
        duration: this.tableCardConstantValueObj.tableCardRotationTweenDuration,
        callbackScope: this,
        onComplete: function () {
          _obj.setFrame(_frame);
          this.scene.add.tween({
            targets: [_obj],
            scaleX: this.tableCardConstantValueObj.tableCardScale * this.newScaleFactor,
            ease: 'Linear',
            duration: this.tableCardConstantValueObj.tableCardRotationTweenDuration
          });
        }
      });
    }
  };
  //#endregion

  HideTableCard() {
    for (let i = 0; i < this.tableCardArray.length; i++) {
      this.tableCardArray[i].setVisible(false);
    }
  };

  HideOutline() {
    for (let i = 0; i < this.tableCardOutlineArray.length; i++) {
      this.tableCardOutlineArray[i].setVisible(false);
    }
  };

  //#region - Highlight win card
  HighLightWinCards(_arr) {
    for (let i = 0; i < _arr.length; i++) {
      for (let j = 0; j < this.tableCardArray.length; j++) {
        if (this.tableCardArray[j].name === _arr[i].card_id) {

          this.tableCardArray[j].setDepth(3);
          // this.HighlightOutlineOfTableCard(j);
        }
      }
    }
  };
  //#endregion

  //#region - Highlight outline of win card
  HighlightOutlineOfTableCard(_targets) {
    this.tableCardOutlineArray[_targets].setVisible(true);
    this.scene.add.tween({
      targets: this.tableCardOutlineArray[_targets],
      scaleX: this.cardOutlineConstantValueObj.tableCardOutlineTweenScale * this.newScaleFactor,
      scaleY: this.cardOutlineConstantValueObj.tableCardOutlineTweenScale * this.newScaleFactor,
      ease: 'Linear',
      duration: this.cardOutlineConstantValueObj.tableCardOutlineTweenDuration,
      repeat: -1,
      yoyo: true
    });
  };
  //#endregion

  ResetHighLightWinCard() {
    for (let j = 0; j < this.tableCardArray.length; j++) {
      this.tableCardArray[j].setDepth(0);
    }
    // this.HideTableCard();
    // this.HideOutline();
    //off win anim loop
    this.winAnim.setVisible(false);
    this.winAnim.play('animation', false);
  };
  //#endregion

  WinChipAnim(_playerPos) {
    this.winAnim.play('animation', true);
    this.winAnim.setVisible(true);
    this.animChip.setVisible(true);
    this.animChip.play('animation', true);
    this.animChip.state.timeScale = 1.6;
    this.scene.add.tween({
      targets: this.animChip,
      delay: 300,
      x: _playerPos.posX,
      y: _playerPos.posY,
      ease: 'Linear',
      duration: 1400,
      callbackScope: this,
      onComplete: function () {
        this.animChip.setVisible(false);
        this.animChip.play('animation', false);
        this.animChip.setPosition(this.potValueChip.x, this.potValueChip.y);
      }
    });
  };

  //#region - Resize
  resize(_newWidth, _newHeight, _newScale) {
    this.newScaleFactor = _newScale;
    this.currentWidth = _newWidth;
    this.currentHeight = _newHeight;
    this.tableContainer.setScale(_newScale);
    this.tableContainer.setPosition((_newWidth / 2), (_newHeight / 2));
    this.tableAnimContainer.setScale(_newScale);
    this.tableAnimContainer.setPosition((_newWidth / 2), (_newHeight / 2));
    for (let i = 0; i < this.tableCardArray.length; i++) {
      const startXPos = this.tableCardConstantValueObj.tableCardStartPosX;
      const yPos = this.tableCardConstantValueObj.tableCardStartPosY;
      const gapX = this.tableCardConstantValueObj.tableCardGapX;
      const outlineGapX = this.cardOutlineConstantValueObj.outlineGapX;

      this.tableCardArray[i].setScale(_newScale * this.tableCardConstantValueObj.tableCardScale);
      this.tableCardArray[i].setPosition((_newWidth / 2) + (((startXPos) + (i * (this.tableCardArray[i].width + gapX))) * _newScale), (_newHeight / 2) + (yPos * _newScale));
      // this.tableCardArray[i].setPosition((_newWidth / 2) + ((this.tableCardPosXarr[i].posX) * _newScale), (_newHeight / 2) + (yPos * _newScale));

      this.tableCardOutlineArray[i].setScale(_newScale * this.cardOutlineConstantValueObj.tableCardOutlineScale);
      this.tableCardOutlineArray[i].setPosition((_newWidth / 2) + (((startXPos) + (i * (this.tableCardOutlineArray[i].width + outlineGapX))) * _newScale), (_newHeight / 2) + (yPos * _newScale));
      // this.tableCardOutlineArray[i].setPosition((_newWidth / 2) + ((this.tableCardPosXarr[i].posX) * _newScale), (_newHeight / 2) + (yPos * _newScale));
    }
  };
  //#endregion

};

export default Table;