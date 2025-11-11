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
import GameEngine from '../services/GameEngine.js';
import BotPlayer from '../services/BotPlayer.js';

export default class GameScene extends Phaser.Scene {

  constructor() {
    super('GameScene');
    this.upperPanel = null;
    this.gameOverPopup = null;
    this.table = null;
    this.deck = null;
    this.allPlayerArray = [];
    this.playerPosArray = [];

    this.currentPlayer = null;
    this.gameEngine = null;
    this.botPlayer = null;
    this.isAnimating = false;
    this.turnInProgress = false;
  };

  init() { };
  preload() {
    console.log('GAME');
  };

  //#region - Create all images
  create() {
    this.game.events.on('evtPlayerSelectCardForDiscardPile', this.OnPlayerSelectCardForDiscardPile, this);
    this.game.events.on('evtPlayerDrawCardRequest', this.OnPlayerDrawCardRequest, this);
    this.game.events.on('evtTurnChanged', this.OnTurnChanged, this);
    this.game.events.on('evtBotPlayCard', this.OnBotPlayCard, this);
    this.game.events.on('evtBotDrawCard', this.OnBotDrawCard, this);
    this.game.events.on('evtBotDrawPenalty', this.OnBotDrawPenalty, this);
    this.game.events.on('evtGameOver', this.OnGameOver, this);

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
    this.gameEngine = new GameEngine(this);
    this.botPlayer = new BotPlayer(this, this.gameEngine);

    this.CreatePlayer();
    setTimeout(() => {
      this.DealInitialCards();
    }, 1000);
    this.currentPlayer = this.allPlayerArray[0];

    this.upperPanel = new UpperPanel(this);
    this.gameOverPopup = new GameOverPopup(this);

    this.resize(window.innerWidth, window.innerHeight);

  };

  //#region - Create Bg
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

  //#region - Create Player
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

      // Start the game engine
      this.time.delayedCall(500, () => {
        this.gameEngine.StartGame(this.allPlayerArray, firstCard);
        // Don't call StartPlayerTurn here - let the game engine handle first turn
        // If first card is Skip/Reverse, HandleFirstCard will call NextTurn which triggers evtTurnChanged
        // Otherwise, we need to manually trigger the first turn
        const firstCardType = firstCard.type;
        if (firstCardType !== 'skip' && firstCardType !== 'reverse') {
          // Normal first card, start first player's turn
          this.time.delayedCall(300, () => {
            this.StartPlayerTurn();
          });
        }
        // If Skip/Reverse, evtTurnChanged will handle it
      });
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

  StartPlayerTurn() {
    console.log(`StartPlayerTurn called. turnInProgress: ${this.turnInProgress}, isAnimating: ${this.isAnimating}`);

    if (this.turnInProgress || this.isAnimating) {
      console.log('Early return due to flags');
      return;
    }

    this.currentPlayer = this.gameEngine.GetCurrentPlayer();
    const playerId = this.currentPlayer.GetPlayerId();

    console.log(`Starting turn for Player ${playerId + 1}`);

    if (this.currentPlayer.isLocalPlayer) {
      // Enable playable cards for human player
      const playableCards = this.gameEngine.GetPlayableCards(this.currentPlayer);
      if (playableCards.length > 0) {
        this.currentPlayer.EnableInputToCard(playableCards);
      } else {
        // No playable cards, must draw
        this.currentPlayer.DisableInputToCard();
      }
    } else {
      // Bot player's turn
      this.currentPlayer.DisableInputToCard();
      this.turnInProgress = true;
      this.botPlayer.MakeTurn(this.currentPlayer);
    }
  }

  OnTurnChanged() {
    console.log('OnTurnChanged called');
    // Disable all cards first
    for (let i = 0; i < this.allPlayerArray.length; i++) {
      this.allPlayerArray[i].DisableInputToCard();
    }

    // Reset turn flag before starting next turn
    this.turnInProgress = false;
    console.log('Flags reset, scheduling StartPlayerTurn in 500ms');

    this.time.delayedCall(500, () => {
      console.log('Delayed call executing, calling StartPlayerTurn');
      this.StartPlayerTurn();
    });
  }


  OnPlayerSelectCardForDiscardPile(_player, _card) {
    console.log('=== OnPlayerSelectCardForDiscardPile called ===');
    console.log(`Player ${_player.GetPlayerId() + 1} playing card:`, _card.cardData);
    console.log(`Player has ${_player.card.length} cards before playing`);

    if (this.isAnimating || this.turnInProgress) {
      console.log(`Blocked: isAnimating=${this.isAnimating}, turnInProgress=${this.turnInProgress}`);
      return;
    }

    // Validate the card play
    if (!this.gameEngine.CanPlayCard(_card.cardData)) {
      console.warn('Cannot play this card!');
      _card.setInteractive({ useHandCursor: true });
      return;
    }

    // Disable all inputs during animation
    console.log('Setting flags: isAnimating=true, turnInProgress=true');
    this.isAnimating = true;
    this.turnInProgress = true;
    _player.DisableInputToCard();

    // Store chosen color for wild cards
    let chosenColor = null;
    if (_card.cardData.type === 'wild' || _card.cardData.type === 'wild_draw4') {
      chosenColor = this.gameEngine.ChooseColorForBot(_player);
    }

    console.log('Starting card animation...');
    // Animate first, then update game state
    this.MoveCardToDiscardPilePosition(_player, _card, () => {
      // After animation completes, update game engine
      console.log('=== CALLBACK: Animation complete, calling PlayCard ===');
      const gameEnded = this.gameEngine.PlayCard(_player, _card, chosenColor);
      console.log(`PlayCard returned, gameEnded=${gameEnded}`);

      if (!gameEnded) {
        // Continue to next turn
        console.log('Clearing flags: isAnimating=false, turnInProgress=false');
        this.isAnimating = false;
        this.turnInProgress = false;
        console.log('=== Calling NextTurn() ===');
        this.gameEngine.NextTurn();
      }
    });
  };

  MoveCardToDiscardPilePosition(_player, _card, _onComplete) {
    const playerId = _player.GetPlayerId();

    const discardPilePos = this.table.GetDiscardPileSpritePosition();

    const targetX = -(_player.posX - discardPilePos.x);
    const targetY = -(_player.posY + discardPilePos.y);

    const spinDir = Phaser.Math.Between(0, 1) ? 1 : -1;
    const spinAmount = 360 * spinDir;

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
            // Remove card from both visual and game state arrays
            _player.cardSpriteArray = _player.cardSpriteArray.filter(c => c !== _card);
            _player.card = _player.card.filter(c => c !== _card.cardData);

            const frameIndex = this.deck.GetActualCardFrameIndex(_card.cardData);
            _card.setFrame(frameIndex);
            this.table.AddCardToDiscardPile(_card);

            _player.AdjustPlayerCards(
              this.PlayerCardAdjustDataArray[playerId].angle,
              this.PlayerCardAdjustDataArray[playerId].startPosX,
              this.PlayerCardAdjustDataArray[playerId].startPosY,
              this.PlayerCardAdjustDataArray[playerId].gapX,
              this.PlayerCardAdjustDataArray[playerId].gapY,
              this.PlayerCardAdjustDataArray[playerId].layoutType
            );

            // Call completion callback - PlayCard will check the UPDATED card count
            console.log(`Card removed, player now has ${_player.card.length} cards, calling callback`);
            if (_onComplete) {
              _onComplete();
            } else {
              console.log('WARNING: No callback provided!');
            }
          }
        });
      }
    });
  };

  OnPlayerDrawCardRequest() {
    if (this.isAnimating || this.turnInProgress) {
      return;
    }

    if (!this.gameEngine.PlayerDrawCard(this.currentPlayer)) {
      return;
    }

    this.isAnimating = true;
    this.turnInProgress = true;
    this.currentPlayer.DisableInputToCard();

    const drawCount = this.gameEngine.drawStack > 0 ? this.gameEngine.drawStack : 1;
    const cards = this.gameEngine.DrawCards(this.currentPlayer, drawCount);

    if (this.gameEngine.drawStack > 0) {
      this.gameEngine.drawStack = 0;
    }

    // Draw cards with animation
    let delay = 0;
    for (let i = 0; i < cards.length; i++) {
      const isLastCard = i === cards.length - 1;
      this.time.delayedCall(delay, () => {
        this.MoveCardToPlayerPosition(this.currentPlayer, cards[i], isLastCard);
      });
      delay += 200;
    }
  };

  MoveCardToPlayerPosition(_player, _cardData, _isLastCard) {
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

    const spinDir = Phaser.Math.Between(0, 1) ? 1 : -1;
    const spinAmount = 360 * spinDir;

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

        // If this is the last card being drawn, check if player can play
        if (_isLastCard) {
          this.time.delayedCall(500, () => {
            const playableCards = this.gameEngine.GetPlayableCards(_player);
            const drawnCardSprite = _player.cardSpriteArray[_player.cardSpriteArray.length - 1];

            if (playableCards.includes(drawnCardSprite) && _player.isLocalPlayer) {
              // Human can play the drawn card
              _player.EnableInputToCard(playableCards);
              this.isAnimating = false;
              this.turnInProgress = false;
            } else {
              // Pass turn
              this.isAnimating = false;
              this.turnInProgress = false;
              this.gameEngine.NextTurn();
            }
          });
        }
      }
    });
  };

  OnBotPlayCard(_player, _card, _chosenColor) {
    if (this.isAnimating) {
      console.log('OnBotPlayCard blocked - animation in progress');
      return;
    }

    console.log(`=== OnBotPlayCard: Bot Player ${_player.GetPlayerId() + 1} plays card ===`);
    console.log('Card:', _card.cardData);

    this.isAnimating = true;

    // Animate the card first
    this.MoveCardToDiscardPilePosition(_player, _card, () => {
      console.log('Bot card animation complete, calling PlayCard');
      // After animation, update game engine
      const gameEnded = this.gameEngine.PlayCard(_player, _card, _chosenColor);
      console.log(`Bot PlayCard returned, gameEnded=${gameEnded}`);

      if (!gameEnded) {
        // Continue to next turn
        console.log('Clearing flags and calling NextTurn');
        this.isAnimating = false;
        this.turnInProgress = false;
        this.gameEngine.NextTurn();
      }
    });
  }

  OnBotDrawCard(_player) {
    if (this.isAnimating) {
      console.log('OnBotDrawCard blocked - animation in progress');
      return;
    }

    console.log(`=== OnBotDrawCard: Bot Player ${_player.GetPlayerId() + 1} draws a card ===`);

    this.isAnimating = true;

    const cardData = this.deck.DealSingleCard();
    if (!cardData) {
      console.warn('Deck is empty!');
      this.isAnimating = false;
      this.turnInProgress = false;
      return;
    }

    // Don't pass isLastCard flag - we'll handle turn logic here
    this.MoveCardToPlayerPosition(_player, cardData, false);

    // After drawing animation completes (800ms) + small delay
    this.time.delayedCall(1300, () => {
      console.log('Bot draw animation complete, checking if card is playable');
      const playableCards = this.gameEngine.GetPlayableCards(_player);
      const drawnCardSprite = _player.cardSpriteArray[_player.cardSpriteArray.length - 1];

      if (playableCards.includes(drawnCardSprite)) {
        console.log('Bot can play the drawn card');
        // Bot can play the drawn card (50% chance)
        if (Math.random() > 0.5) {
          console.log('Bot decides to play the drawn card');
          // Clear animation flag before playing
          this.isAnimating = false;
          this.time.delayedCall(500, () => {
            let chosenColor = null;
            if (drawnCardSprite.cardData.type === 'wild' || drawnCardSprite.cardData.type === 'wild_draw4') {
              chosenColor = this.gameEngine.ChooseColorForBot(_player);
            }
            this.OnBotPlayCard(_player, drawnCardSprite, chosenColor);
          });
          return;
        } else {
          console.log('Bot decides NOT to play the drawn card (50% chance)');
        }
      } else {
        console.log('Bot cannot play the drawn card');
      }

      // Bot passes turn
      console.log('Bot passes turn after drawing');
      this.isAnimating = false;
      this.turnInProgress = false;
      this.gameEngine.NextTurn();
    });
  }

  OnBotDrawPenalty(_player, _count) {
    if (this.isAnimating) {
      console.log('OnBotDrawPenalty blocked - animation in progress');
      return;
    }

    console.log(`=== OnBotDrawPenalty: Bot Player ${_player.GetPlayerId() + 1} draws ${_count} penalty cards ===`);

    this.isAnimating = true;

    const cards = this.gameEngine.DrawCards(_player, _count);
    this.gameEngine.drawStack = 0;

    let delay = 0;
    for (let i = 0; i < cards.length; i++) {
      const isLastCard = i === cards.length - 1;
      this.time.delayedCall(delay, () => {
        this.MoveCardToPlayerPosition(_player, cards[i], isLastCard);
      });
      delay += 200;
    }

    this.time.delayedCall(delay + 500, () => {
      this.isAnimating = false;
      this.turnInProgress = false;
      this.gameEngine.NextTurn();
    });
  }

  OnGameOver(_winner) {
    console.log(`Game Over! Player ${_winner.GetPlayerId() + 1} wins!`);

    // Disable all interactions
    for (let i = 0; i < this.allPlayerArray.length; i++) {
      this.allPlayerArray[i].DisableInputToCard();
    }

    this.table.DisableDrawPileSprite();

    // Show game over popup
    this.time.delayedCall(1000, () => {
      this.gameOverPopup.ShowGameOverPopup(_winner);
    });
  }

  //#region - Resize
  resize(_newWidth, _newHeight) {
    const newScale = Utils.GetScale(SelectedResolution.width, SelectedResolution.height, _newWidth, _newHeight);
    this.currentNewScale = newScale;
    this.ResizeGameplayBg(_newWidth, _newHeight, newScale);
    this.table.resize(_newWidth, _newHeight, newScale);
    for (let i = 0; i < this.allPlayerArray.length; i++) {
      this.allPlayerArray[i].resize(_newWidth, _newHeight, newScale);
    }
    this.upperPanel.resize(_newWidth, _newHeight, newScale);
    this.gameOverPopup.resize(_newWidth, _newHeight, newScale);

  };
  //#endregion

}