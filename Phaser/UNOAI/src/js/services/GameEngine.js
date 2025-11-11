/* eslint-disable no-console */
/* global console */
/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 07-11-2025.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 07-11-2025
 * @Description :- Core game engine logic for UNO game.
 ************************************/

import { Constant } from '../utils/Constant';

class GameEngine {
  constructor(_scene) {
    this.scene = _scene;
    this.currentPlayerIndex = 0;
    this.direction = 1; // 1 = clockwise, -1 = counterclockwise
    this.currentColor = null;
    this.currentCard = null;
    this.drawStack = 0; // For stacking +2 and +4 cards
    this.gameActive = false;
    this.hasDrawnThisTurn = false;
    this.unoCalledPlayers = new Set();
  }

  StartGame(_players, _initialCard) {
    this.players = _players;
    this.currentPlayerIndex = 0;
    this.direction = 1;
    this.currentCard = _initialCard;
    this.currentColor = _initialCard.color;
    this.drawStack = 0;
    this.gameActive = true;
    this.hasDrawnThisTurn = false;
    this.unoCalledPlayers.clear();

    console.log('Game started with card:', _initialCard);

    // Handle special first card
    this.HandleFirstCard(_initialCard);
  }

  HandleFirstCard(_card) {
    if (_card.type === 'skip') {
      this.NextTurn();
    } else if (_card.type === 'reverse') {
      this.ReverseDirection();
      this.NextTurn();
    } else if (_card.type === 'draw2') {
      this.drawStack = 2;
    } else if (_card.type === 'wild' || _card.type === 'wild_draw4') {
      // Random color for first wild card
      const colors = ['red', 'green', 'blue', 'yellow'];
      this.currentColor = colors[Math.floor(Math.random() * colors.length)];
      if (_card.type === 'wild_draw4') {
        this.drawStack = 4;
      }
    }
  }

  GetCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  GetNextPlayerIndex() {
    const nextIndex = (this.currentPlayerIndex + this.direction + this.players.length) % this.players.length;
    return nextIndex;
  }

  NextTurn() {
    this.currentPlayerIndex = this.GetNextPlayerIndex();
    this.hasDrawnThisTurn = false;
    console.log(`Turn: Player ${this.currentPlayerIndex + 1}`);

    Constant.game.events.emit('evtTurnChanged', this.currentPlayerIndex);
  }

  ReverseDirection() {
    this.direction *= -1;
    console.log('Direction reversed!');
  }

  CanPlayCard(_card) {
    // If there's a draw stack, only +2 or +4 can be played
    if (this.drawStack > 0) {
      if (_card.type === 'draw2' && this.currentCard.type === 'draw2') {
        return true;
      }
      if (_card.type === 'wild_draw4') {
        return true;
      }
      return false;
    }

    // Wild cards can always be played
    if (_card.type === 'wild' || _card.type === 'wild_draw4') {
      return true;
    }

    // Match color or type/value
    if (_card.color === this.currentColor) {
      return true;
    }

    if (_card.type === 'number' && this.currentCard.type === 'number') {
      return _card.value === this.currentCard.value;
    }

    if (_card.type === this.currentCard.type && _card.type !== 'number') {
      return true;
    }

    return false;
  }

  GetPlayableCards(_player) {
    const playableCards = [];
    for (let i = 0; i < _player.card.length; i++) {
      if (this.CanPlayCard(_player.card[i])) {
        playableCards.push(_player.cardSpriteArray[i]);
      }
    }
    return playableCards;
  }

  PlayCard(_player, _card, _chosenColor = null) {
    if (!this.CanPlayCard(_card.cardData)) {
      console.warn('Invalid card play attempt');
      return false;
    }

    this.currentCard = _card.cardData;

    // Handle wild cards
    if (_card.cardData.type === 'wild' || _card.cardData.type === 'wild_draw4') {
      this.currentColor = _chosenColor || this.ChooseColorForBot(_player);
    } else {
      this.currentColor = _card.cardData.color;
    }

    // Handle special cards
    this.HandleCardEffect(_card.cardData);

    // Check for UNO
    if (_player.card.length === 1 && !this.unoCalledPlayers.has(_player.GetPlayerId())) {
      console.log(`Player ${_player.GetPlayerId() + 1} forgot to call UNO!`);
      Constant.game.events.emit('evtUnoForgotten', _player);
    }

    // Check for win
    if (_player.card.length === 0) {
      this.EndGame(_player);
      return true; // Game ended
    }

    // Don't call NextTurn here - let the scene handle it after animations
    return false; // Game continues (NOT ended)
  }

  HandleCardEffect(_card) {
    const nextPlayerIndex = this.GetNextPlayerIndex();

    switch (_card.type) {
      case 'skip':
        console.log(`Player ${nextPlayerIndex + 1} will be skipped!`);
        // Don't call NextTurn here - the scene will call it once
        // But we need to skip an extra player, so call NextTurn to advance past the skipped player
        this.currentPlayerIndex = this.GetNextPlayerIndex(); // Skip one player
        break;

      case 'reverse':
        this.ReverseDirection();
        if (this.players.length === 2) {
          // In 2-player game, reverse acts like skip
          this.currentPlayerIndex = this.GetNextPlayerIndex();
        }
        break;

      case 'draw2':
        this.drawStack += 2;
        console.log(`Draw stack: ${this.drawStack}`);
        break;

      case 'wild_draw4':
        this.drawStack += 4;
        console.log(`Draw stack: ${this.drawStack}`);
        break;
    }
  }

  DrawCards(_player, _count) {
    const drawnCards = [];
    for (let i = 0; i < _count; i++) {
      const card = this.scene.deck.DealSingleCard();
      if (card) {
        drawnCards.push(card);
      } else {
        console.warn('Deck is empty!');
        this.ReshuffleDeck();
        const newCard = this.scene.deck.DealSingleCard();
        if (newCard) drawnCards.push(newCard);
      }
    }
    return drawnCards;
  }

  PlayerDrawCard(_player) {
    if (this.hasDrawnThisTurn) {
      console.warn('Already drawn this turn');
      return false;
    }

    let drawCount = 1;

    // Handle draw stack
    if (this.drawStack > 0) {
      drawCount = this.drawStack;
      this.drawStack = 0;
      this.hasDrawnThisTurn = true;

      Constant.game.events.emit('evtPlayerMustDraw', _player, drawCount);
      this.NextTurn();
      return true;
    }

    this.hasDrawnThisTurn = true;
    Constant.game.events.emit('evtPlayerDrawCard', _player, drawCount);

    return true;
  }

  ChooseColorForBot(_player) {
    const colorCount = { red: 0, green: 0, blue: 0, yellow: 0 };

    for (let i = 0; i < _player.card.length; i++) {
      const card = _player.card[i];
      if (card.color !== 'black') {
        colorCount[card.color]++;
      }
    }

    let maxColor = 'red';
    let maxCount = 0;
    for (const color in colorCount) {
      if (colorCount[color] > maxCount) {
        maxCount = colorCount[color];
        maxColor = color;
      }
    }

    return maxColor;
  }

  CallUno(_player) {
    if (_player.card.length === 1) {
      this.unoCalledPlayers.add(_player.GetPlayerId());
      console.log(`Player ${_player.GetPlayerId() + 1} called UNO!`);
      return true;
    }
    return false;
  }

  ReshuffleDeck() {
    console.log('Reshuffling discard pile into deck...');
    // This should be implemented in your scene to move cards from discard pile back to deck
    Constant.game.events.emit('evtReshuffleDeck');
  }

  EndGame(_winner) {
    this.gameActive = false;
    console.log(`Player ${_winner.GetPlayerId() + 1} wins!`);
    Constant.game.events.emit('evtGameOver', _winner);
  }

  GetGameState() {
    return {
      currentPlayerIndex: this.currentPlayerIndex,
      currentColor: this.currentColor,
      currentCard: this.currentCard,
      direction: this.direction,
      drawStack: this.drawStack,
      gameActive: this.gameActive
    };
  }
}

export default GameEngine;
