 
/* eslint-disable no-unused-vars */

/* global console */
/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 30-10-2025.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 30-10-2024
 * @Description :- Creating player and handle all player related work.
 ************************************/

// import { Model } from '../utils/Model.js';
// import { Utils } from '../utils/Utils.js';
import { Constant } from '../utils/Constant.js';

class Player {
  constructor(_scene, _posX, _posY) {
    this.scene = _scene;
    this.posX = _posX;
    this.posY = _posY;

    this.playerId = null;
    this.remotePlayerId = null;
    this.sittingIndex = null;
    this.isDelear = null;
    this.positionIndex = null;
    this.newScaleFactor = null;
    this.userBalance = null;
    this.isLocalPlayer = false;
    this.card = [];
    this.cardSpriteArray = [];

    this.CreatePlayer();

  };

  SetPlayerId(_id) {
    this.playerId = _id;
  };
  GetPlayerId() {
    return this.playerId;
  };

  SetPlayerSittingIndex(_index) {
    this.sittingIndex = _index;
  };
  GetPlayerSittingIndex() {
    return this.sittingIndex;
  };

  //#region - Create Player
  CreatePlayer() {
    this.playerContainer = this.scene.add.container(this.posX, this.posY);
    this.playerContainer.setDepth(1);

    this.CreateNameSection();
    // this.CreateCards(7);
  };
  //#endregion

  //#region - Destroy player
  DestroyPlayer() {
    this.playerContainer.destroy();
  };
  //#endregion

  //#region - Create Name Section
  CreateNameSection() {
    this.line = this.scene.add.image(0, 0, 'line_players').setOrigin(0.5);
    const userNameTextStyle = { fontFamily: 'Poppins-SemiBold', fontSize: '34px', fill: '#FFF', fontStyle: 'normal', align: 'center' };
    this.userNameText = this.scene.add.text(this.line.x, this.line.y, Constant.PLAYER_1, userNameTextStyle).setOrigin(0.5);
    this.playerContainer.add([this.userNameText, this.line]);

  };

  AdjustPlayerName(_angle, _posX, _posY) {
    this.userNameText.angle = _angle;
    this.userNameText.setPosition(_posX, _posY);
  };
  AdjustPlayerLine(_angle, _scaleX) {
    this.line.angle = _angle;
    this.line.scaleX = _scaleX;
    this.line.scaleY = 1;
  };
  SetUserName(_name) {
    this.userNameText.setText(_name);
  };
  //#endregion

  // CreateCards(_count) {
  //   for (let i = 0; i < _count; i++) {
  //     const card = this.scene.add.sprite(0, 0, 'cards').setOrigin(0.5);
  //     card.on('pointerdown', () => { this.OnCardPressed(card); });
  //     card.setDepth(2);
  //     card.setFrame(54);
  //     this.playerContainer.add(card);
  //     this.card.push(card);
  //     this.cardSpriteArray.push(card);
  //   }
  // };

  CreateSingleCard(_cardData) {
    // console.log('card data: ', _cardData);
    const card = this.scene.add.sprite(0, 0, 'cards').setOrigin(0.5);
    card.cardData = _cardData;
    card.on('pointerdown', () => this.OnCardPressed(card));
    card.setDepth(2);
    let frameIndex;
    if (this.isLocalPlayer === true) {
      frameIndex = this.scene.deck.GetActualCardFrameIndex(_cardData);
    } else {
      frameIndex = 54;
    }

    card.setFrame(frameIndex);
    this.scene.children.bringToTop(card);
    this.playerContainer.add(card);
    this.card.push(_cardData);
    this.cardSpriteArray.push(card);
  };

  EnableInputToCard(_cardArray) {
    for (let i = 0; i < this.cardSpriteArray.length; i++) {
      this.cardSpriteArray[i].disableInteractive();
    }
    for (let i = 0; i < _cardArray.length; i++) {
      const card = _cardArray[i];
      if (card && this.cardSpriteArray.includes(card)) {
        card.setInteractive({ useHandCursor: true });
      }
    }
  };

  DisableInputToCard() {
    for (let i = 0; i < this.cardSpriteArray.length; i++) {
      this.cardSpriteArray[i].disableInteractive();
    }
  };

  OnCardPressed(_card) {
    _card.disableInteractive();
    Constant.game.events.emit('evtPlayerSelectCardForDiscardPile', this, _card);
  };

  AdjustPlayerCards(_angle, _startX, _startY, _gapX, _gapY, _layoutType) {
    const cardCount = this.cardSpriteArray.length;
    let gapX = _gapX;
    let gapY = _gapY;
    const startX = _startX;
    const startY = _startY;
    let cardScale = 1;

    if (cardCount === 0) return;
    if (_layoutType === 'horizontal') {
      if (cardCount > 9) {
        const factor = (9 / cardCount); // simple compression ratio
        gapX *= factor;
        gapY *= factor;
      }

      if (cardCount > 12) {
        const scaleFactor = Math.max(0.7, 1 - ((cardCount - 12) * 0.02));
        cardScale = scaleFactor;
      }
    } else {
      if (cardCount > 8) {
        const factor = (8 / cardCount); // simple compression ratio
        gapX *= factor;
        gapY *= factor;
      }

      if (cardCount > 8) {
        const scaleFactor = Math.max(0.7, 1 - ((cardCount - 8) * 0.02));
        cardScale = scaleFactor;
      }
    }

    for (let i = 0; i < cardCount; i++) {
      const posX = startX + ((i - ((cardCount - 1) / 2)) * gapX);
      const posY = startY + ((i - ((cardCount - 1) / 2)) * gapY);

      const card = this.cardSpriteArray[i];
      card.setScale(cardScale);
      card.setPosition(posX, posY);
      card.angle = _angle;
    }
  };

  ShowLocalPLayerCards() {
    for (let i = 0; i < this.cardSpriteArray.length; i++) {
      this.cardSpriteArray[i].setFrame(i + 1);
    }
  }

  //#region - resize all
  resize(_newWidth, _newHeight, _newScale) {
    this.playerContainer.setScale(_newScale);
    this.playerContainer.setPosition((_newWidth / 2) + (this.posX * _newScale), (_newHeight / 2) + (this.posY * _newScale));

  };
  //#endregion
}

export default Player;