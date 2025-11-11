/* eslint-disable no-console */
/* global window,console,setTimeout */
/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 28-10-2025.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 28-10-2025
 * @Description :- Control the full gameplay.
 ************************************/

import Phaser from 'phaser';
// import { SelectedResolution } from '../ResolutionSelector.js';
import { SelectedResolution } from '../utils/ResolutionSelector.js';
import { Utils } from '../utils/Utils.js';
import { Constant } from '../utils/Constant.js';
// import { Model } from '../utils/Model.js';
import Player from '../component/Player.js';
import Table from '../component/Table.js';
import Deck from '../component/Deck.js';
import UpperPanel from '../component/UpperPanel.js';
import GameOverPopup from '../popup/GameOverPopup.js';
import EffectsManager from '../component/EffectsManager.js';

export default class GameScene extends Phaser.Scene {

  constructor() {
    super('GameScene');
    this.upperPanel = null;
    this.gameOverPopup = null;
    this.table = null;
    this.deck = null;
    this.effectManger = null;
    this.allPlayerArray = [];
    this.playerPosArray = [];

    this.currentPlayer = null;
  };

  init() { };
  preload() {
    console.log('GAME');
  };

  //#region - Create all images
  create() {
    this.game.events.on('evtPlayerSelectCardForDiscardPile', this.OnPlayerSelectCardForDiscardPile, this);
    this.game.events.on('evtPlayerDrawCardRequest', this.OnPlayerDrawCardRequest, this);
    this.game.events.on('evtEnableCardInteractice', this.OnEnableCardInteractive, this);

    this.game.events.on('resize', this.resize, this);

    this.playerPosArray = [
      { x: 0, y: 230 },//Down//0
      { x: -570, y: 0 },//Left //1
      { x: 0, y: -230 },//Up//2
      { x: 570, y: 0 },//Right//3
    ];

    this.PlayerLineAdjustDataArray = [
      { angle: 0, scaleX: 1 },
      { angle: 90, scaleX: 0.7 },
      { angle: 0, scaleX: 1 },
      { angle: 90, scaleX: 0.7 }
    ];
    this.PlayerNameAdjustDataArray = [
      { posX: -300, posY: -30, angle: 0 },
      { posX: 30, posY: -200, angle: 90 },
      { posX: 300, posY: 30, angle: 0 },
      { posX: -30, posY: 200, angle: 90 }
    ];
    this.PlayerCardAdjustDataArray = [
      { startPosX: 0, startPosY: 140, angle: 0, gapX: 105, gapY: 0, layoutType: 'horizontal' },//0
      { startPosX: -140, startPosY: 0, angle: 90, gapX: 0, gapY: 105, layoutType: 'vertical' },//1
      { startPosX: 0, startPosY: -140, angle: 0, gapX: 105, gapY: 0, layoutType: 'horizontal' },//2
      { startPosX: 140, startPosY: 30, angle: 90, gapX: 0, gapY: 105, layoutType: 'vertical' }//3
    ];
    this.playerNameArray = [Constant.PLAYER_1, Constant.PLAYER_2, Constant.PLAYER_3, Constant.PLAYER_4];

    this.CreateGameplayBg();
    this.table = new Table(this);
    this.deck = new Deck(this);

    this.CreatePlayer();
    setTimeout(() => {
      this.DealInitialCards();
    }, 1000);
    this.currentPlayer = this.allPlayerArray[0];

    this.upperPanel = new UpperPanel(this);
    this.effectManger = new EffectsManager(this);
    this.gameOverPopup = new GameOverPopup(this);

    this.resize(window.innerWidth, window.innerHeight);

  };

  //#region - CREATE BG
  CreateGameplayBg() {
    this.gameplayBg = this.add.image(0, 0, 'bg_game').setOrigin(0);
    const versionControlTextStyle = { fontFamily: 'Poppins-Regular', fontSize: '20px', fill: '#FFF', fontStyle: 'normal', align: 'right' };
    this.versionControlText = this.add.text(0, 0, `V  ${Constant.VERSION_TEXT}`, versionControlTextStyle).setOrigin(0.5);
  };
  ResizeGameplayBg(_newWidth, _newHeight, _newScale) {
    this.gameplayBg.setDisplaySize(_newWidth, _newHeight);


    this.versionControlText.setScale(_newScale);
    this.versionControlText.setPosition(50 * _newScale, _newHeight - (50 * _newScale));
  };
  //#endregion

  //#region - CREATE PLAYER
  CreatePlayer() {
    const numberOfPlayer = 4;//Model.GetNumberOfPlayersSelected();
    for (let i = 0; i < numberOfPlayer; i++) {
      const player = new Player(this, this.playerPosArray[i].x, this.playerPosArray[i].y);
      player.AdjustPlayerLine(this.PlayerLineAdjustDataArray[i].angle, this.PlayerLineAdjustDataArray[i].scaleX);
      player.AdjustPlayerName(this.PlayerNameAdjustDataArray[i].angle, this.PlayerNameAdjustDataArray[i].posX, this.PlayerNameAdjustDataArray[i].posY,);

      if (i === 0) {
        player.isLocalPlayer = true;
      }
      player.SetPlayerId(i);
      player.SetPlayerSittingIndex(i);
      player.SetUserName(this.playerNameArray[i]);
      this.allPlayerArray.push(player);
    }
  };
  DestroyPlayer() {
    for (let i = 0; i < this.allPlayerArray.length; i++) {
      this.allPlayerArray[i].DestroyPlayer();
    }
    this.allPlayerArray = [];
  };
  //#endregion

  //#region - DEAL CARD WITH ANIMATION
  DealInitialCards() {
    const cardsPerPlayer = 7;
    let delay = 0;
    const dealDelay = 150;
    for (let i = 0; i < cardsPerPlayer; i++) {
      for (let p = 0; p < this.allPlayerArray.length; p++) {
        const player = this.allPlayerArray[p];
        this.time.delayedCall(delay, () => {
          this.PlayDealCardAnimation(player, dealDelay);
        });
        delay += dealDelay;
      }
    }

    const totalCards = cardsPerPlayer * this.allPlayerArray.length;
    const totalDealTime = (totalCards * dealDelay) + 300; // +300ms buffer
    this.time.delayedCall(totalDealTime, () => {
      const firstCard = this.deck.DealSingleCard();
      this.table.SetInitailDiscardPileSprite(firstCard);
      this.table.MoveDrawPileSpriteToLeft(firstCard);
    });
  };

  PlayDealCardAnimation(_player, dealDelay) {
    const playerId = _player.GetPlayerId();
    const tempCardPosX = this.table.drawPileSprite.x + this.table.tableContainer.x;
    const tempCardPosY = this.table.drawPileSprite.y + this.table.tableContainer.y;
    const tempCard = this.add.sprite(tempCardPosX, tempCardPosY, 'cards')
      .setOrigin(0.5)
      .setDepth(6)
      .setScale(0.9 * this.currentNewScale)
      .setFrame(54)
      .setAngle(Phaser.Math.Between(-10, 10));

    const cardCount = _player.cardSpriteArray.length;
    const cardStartX = this.PlayerCardAdjustDataArray[playerId].startPosX * this.currentNewScale;
    const cardStartY = this.PlayerCardAdjustDataArray[playerId].startPosY * this.currentNewScale;
    let cardGapX = this.PlayerCardAdjustDataArray[playerId].gapX * this.currentNewScale;
    let cardGapY = this.PlayerCardAdjustDataArray[playerId].gapY * this.currentNewScale;

    if (this.PlayerCardAdjustDataArray[playerId].layoutType === 'horizontal') {
      if (cardCount >= 9) {
        const factor = 9 / cardCount;
        cardGapX *= factor;
        cardGapY *= factor;
      }
    } else {
      if (cardCount >= 8) {
        const factor = 8 / cardCount;
        cardGapX *= factor;
        cardGapY *= factor;
      }
    }

    const targetX = _player.playerContainer.x +
      (cardStartX + ((cardCount - ((cardCount - 1) / 2)) * cardGapX));

    const targetY = _player.playerContainer.y +
      (cardStartY + ((cardCount - ((cardCount - 1) / 2)) * cardGapY));

    const spinDir = Phaser.Math.Between(0, 1) ? 1 : -1; // random spin direction
    const spinAmount = 360 * spinDir; // one full spin (adjust as needed)

    this.tweens.add({
      targets: tempCard,
      x: targetX,
      y: targetY,
      angle: spinAmount,
      scale: this.currentNewScale,
      duration: dealDelay,
      ease: 'Cubic.easeInOut',
      onComplete: () => {
        tempCard.destroy();
        const cardData = this.deck.DealSingleCard();
        _player.CreateSingleCard(cardData);

        // Re-align the player’s cards nicely
        _player.AdjustPlayerCards(
          this.PlayerCardAdjustDataArray[playerId].angle,
          this.PlayerCardAdjustDataArray[playerId].startPosX,
          this.PlayerCardAdjustDataArray[playerId].startPosY,
          this.PlayerCardAdjustDataArray[playerId].gapX,
          this.PlayerCardAdjustDataArray[playerId].gapY,
          this.PlayerCardAdjustDataArray[playerId].layoutType
        );
      }
    });

  };
  //#endregion

  //#region - ENABLE INPUT TO CARDS
  OnEnableCardInteractive() {
    const playerId = this.currentPlayer.GetPlayerId();
    this.allPlayerArray[playerId].EnableInputToCard(this.allPlayerArray[playerId].cardSpriteArray);
    console.log('All palyer: ', this.allPlayerArray[1]);
  };
  //#endregion

  //#region - PLAYER TO DISCARD CARD
  OnPlayerSelectCardForDiscardPile(_player, _card) {
    this.MoveCardToDiscardPilePosition(_player, _card);
  };

  MoveCardToDiscardPilePosition(_player, _card) {
    // console.log('_card: ', _card);

    const playerId = _player.GetPlayerId();

    const discardPilePos = this.table.GetDiscardPileSpritePosition();

    const targetX = -(_player.posX - discardPilePos.x);
    const targetY = -(_player.posY + discardPilePos.y);

    const spinDir = Phaser.Math.Between(0, 1) ? 1 : -1; // random spin direction
    const spinAmount = 360 * spinDir; // one full spin (adjust as needed)

    this.tweens.add({
      targets: _card,
      x: targetX,
      y: targetY,
      angle: spinAmount,
      scale: 0.95,
      duration: 600,
      ease: 'Cubic.easeInOut',
      onComplete: () => {
        this.tweens.add({
          targets: _card,
          angle: 0,
          duration: 50,
          ease: 'Cubic.easeOut',
          onComplete: () => {
            _player.cardSpriteArray = _player.cardSpriteArray.filter(c => c !== _card);
            const frameIndex = this.deck.GetActualCardFrameIndex(_card.cardData);
            _card.setFrame(frameIndex);
            _player.card = _player.card.filter(c => c !== _card.cardData);
            // this.table.AddCardToDiscardPile(_card);
            this.table.AddCardToDiscardPile(_card);

            _player.AdjustPlayerCards(
              this.PlayerCardAdjustDataArray[playerId].angle,
              this.PlayerCardAdjustDataArray[playerId].startPosX,
              this.PlayerCardAdjustDataArray[playerId].startPosY,
              this.PlayerCardAdjustDataArray[playerId].gapX,
              this.PlayerCardAdjustDataArray[playerId].gapY,
              this.PlayerCardAdjustDataArray[playerId].layoutType
            );
          }
        });
      }
    });

    console.log('move to discard this.allPlayerArray[1].card: ', this.allPlayerArray[1].card);

  };
  //#endregion

  //#region - DRAW CARD TO PLAYER
  OnPlayerDrawCardRequest() {
    const cardData = this.deck.DealSingleCard();
    if (!cardData) {
      console.warn('Deck is empty!');
      return;
    }
    this.MoveCardToPlayerPosition(this.currentPlayer, cardData);
  };

  MoveCardToPlayerPosition(_player, _cardData) {
    const playerId = _player.GetPlayerId();
    const tempCardPosX = this.table.drawPileSprite.x + this.table.tableContainer.x;
    const tempCardPosY = this.table.drawPileSprite.y + this.table.tableContainer.y;
    const tempCard = this.add.sprite(tempCardPosX, tempCardPosY, 'cards')
      .setOrigin(0.5)
      .setDepth(6)
      .setScale(0.9 * this.currentNewScale)
      .setFrame(54)
      .setAngle(Phaser.Math.Between(-10, 10));

    const cardCount = _player.cardSpriteArray.length;
    const cardStartX = this.PlayerCardAdjustDataArray[playerId].startPosX * this.currentNewScale;
    const cardStartY = this.PlayerCardAdjustDataArray[playerId].startPosY * this.currentNewScale;
    let cardGapX = this.PlayerCardAdjustDataArray[playerId].gapX * this.currentNewScale;
    let cardGapY = this.PlayerCardAdjustDataArray[playerId].gapY * this.currentNewScale;

    if (this.PlayerCardAdjustDataArray[playerId].layoutType === 'horizontal') {
      if (cardCount >= 9) {
        const factor = 9 / cardCount;
        cardGapX *= factor;
        cardGapY *= factor;
      }
    } else {
      if (cardCount >= 8) {
        const factor = 8 / cardCount;
        cardGapX *= factor;
        cardGapY *= factor;
      }
    }

    const targetX = _player.playerContainer.x +
      (cardStartX + ((cardCount - ((cardCount - 1) / 2)) * cardGapX));

    const targetY = _player.playerContainer.y +
      (cardStartY + ((cardCount - ((cardCount - 1) / 2)) * cardGapY));

    const spinDir = Phaser.Math.Between(0, 1) ? 1 : -1; // random spin direction
    const spinAmount = 360 * spinDir; // one full spin (adjust as needed)

    this.tweens.add({
      targets: tempCard,
      x: targetX,
      y: targetY,
      angle: spinAmount,
      scale: this.currentNewScale,
      duration: 800,
      ease: 'Cubic.easeInOut',
      onComplete: () => {
        tempCard.destroy();
        _player.CreateSingleCard(_cardData);
        _player.AdjustPlayerCards(
          this.PlayerCardAdjustDataArray[playerId].angle,
          this.PlayerCardAdjustDataArray[playerId].startPosX,
          this.PlayerCardAdjustDataArray[playerId].startPosY,
          this.PlayerCardAdjustDataArray[playerId].gapX,
          this.PlayerCardAdjustDataArray[playerId].gapY,
          this.PlayerCardAdjustDataArray[playerId].layoutType
        );
        _player.EnableInputToCard(_player.cardSpriteArray);
      }
    });

    console.log('move to player this.allPlayerArray[1].card: ', this.allPlayerArray[1].card);
  };
  //#endregion

  //#region - RESIZE
  resize(_newWidth, _newHeight) {
    const newScale = Utils.GetScale(SelectedResolution.width, SelectedResolution.height, _newWidth, _newHeight);
    this.currentNewScale = newScale;
    this.ResizeGameplayBg(_newWidth, _newHeight, newScale);
    this.table.resize(_newWidth, _newHeight, newScale);
    for (let i = 0; i < this.allPlayerArray.length; i++) {
      this.allPlayerArray[i].resize(_newWidth, _newHeight, newScale);
    }
    this.upperPanel.resize(_newWidth, _newHeight, newScale);
    this.effectManger.resize(_newWidth, _newHeight, newScale);
    this.gameOverPopup.resize(_newWidth, _newHeight, newScale);
  };
  //#endregion

}