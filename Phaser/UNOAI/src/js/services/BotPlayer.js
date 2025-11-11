
/* eslint-disable no-console */
/* global setTimeout, console */
/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 07-11-2025.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 07-11-2025
 * @Description :- AI logic for bot players in UNO game.
 ************************************/

import { Constant } from '../utils/Constant';

class BotPlayer {
  constructor(_scene, _gameEngine) {
    this.scene = _scene;
    this.gameEngine = _gameEngine;
    this.thinkingTime = { min: 800, max: 2000 };
  }

  MakeTurn(_player) {
    const thinkTime = (Math.random() * (this.thinkingTime.max - this.thinkingTime.min)) + this.thinkingTime.min;
    console.log(`Bot MakeTurn: Player ${_player.GetPlayerId() + 1} thinking for ${Math.round(thinkTime)}ms`);

    setTimeout(() => {
      console.log(`Bot think time over, executing turn for Player ${_player.GetPlayerId() + 1}`);
      this.ExecuteTurn(_player);
    }, thinkTime);
  }

  ExecuteTurn(_player) {
    console.log(`=== Bot ExecuteTurn: Player ${_player.GetPlayerId() + 1} ===`);
    const playableCards = this.gameEngine.GetPlayableCards(_player);
    console.log(`Bot has ${playableCards.length} playable cards out of ${_player.card.length} total`);

    // Check if bot should call UNO
    if (_player.card.length === 2 && playableCards.length > 0) {
      const shouldCallUno = Math.random() > 0.2; // 80% chance to call UNO
      if (shouldCallUno) {
        setTimeout(() => {
          this.gameEngine.CallUno(_player);
          Constant.game.events.emit('evtBotCalledUno', _player);
        }, 300);
      }
    }

    if (playableCards.length > 0) {
      // Bot has playable cards
      const selectedCard = this.ChooseBestCard(_player, playableCards);
      console.log('Bot selected card:', selectedCard ? selectedCard.cardData : 'null');

      if (selectedCard) {
        let chosenColor = null;
        if (selectedCard.cardData.type === 'wild' || selectedCard.cardData.type === 'wild_draw4') {
          chosenColor = this.gameEngine.ChooseColorForBot(_player);
          console.log(`Bot chose color: ${chosenColor}`);
        }

        console.log('Emitting evtBotPlayCard');
        Constant.game.events.emit('evtBotPlayCard', _player, selectedCard, chosenColor);
      } else {
        console.error('Bot failed to select a card despite having playable cards!');
      }
    } else {
      // Bot must draw
      console.log('Bot has no playable cards, must draw');
      if (this.gameEngine.drawStack > 0) {
        // Must draw penalty cards
        console.log(`Emitting evtBotDrawPenalty for ${this.gameEngine.drawStack} cards`);
        Constant.game.events.emit('evtBotDrawPenalty', _player, this.gameEngine.drawStack);
      } else {
        // Draw one card
        console.log('Emitting evtBotDrawCard');
        Constant.game.events.emit('evtBotDrawCard', _player);
      }
    }
  }

  ChooseBestCard(_player, _playableCards) {
    if (_playableCards.length === 0) return null;

    // Strategy priority:
    // 1. If only one card left, play it
    if (_player.card.length === 1) {
      return _playableCards[0];
    }

    // 2. Play action cards first (skip, reverse, draw2)
    const actionCards = _playableCards.filter(card => {
      const type = card.cardData.type;
      return type === 'skip' || type === 'reverse' || type === 'draw2';
    });
    if (actionCards.length > 0) {
      return this.GetRandomCard(actionCards);
    }

    // 3. Save wild cards for later (unless it's the only option)
    const nonWildCards = _playableCards.filter(card => {
      const type = card.cardData.type;
      return type !== 'wild' && type !== 'wild_draw4';
    });
    if (nonWildCards.length > 0) {
      // Play cards that match the current color to maintain control
      const matchingColorCards = nonWildCards.filter(card =>
        card.cardData.color === this.gameEngine.currentColor
      );

      if (matchingColorCards.length > 0) {
        return this.GetRandomCard(matchingColorCards);
      }

      return this.GetRandomCard(nonWildCards);
    }

    // 4. Use wild cards as last resort
    const wildCards = _playableCards.filter(card => card.cardData.type === 'wild');
    if (wildCards.length > 0) {
      return this.GetRandomCard(wildCards);
    }

    // 5. Use wild draw 4 as absolute last resort
    const wildDraw4Cards = _playableCards.filter(card => card.cardData.type === 'wild_draw4');
    if (wildDraw4Cards.length > 0) {
      return this.GetRandomCard(wildDraw4Cards);
    }

    // Fallback: return any playable card
    return this.GetRandomCard(_playableCards);
  }

  GetRandomCard(_cardArray) {
    const randomIndex = Math.floor(Math.random() * _cardArray.length);
    return _cardArray[randomIndex];
  }

  ShouldChallengeWildDraw4() {
    // 30% chance to challenge a wild draw 4
    return Math.random() < 0.3;
  }

  SetDifficulty(_difficulty) {
    // Easy: 1500-3000ms, Medium: 1000-2000ms, Hard: 500-1500ms
    switch (_difficulty) {
      case 'easy':
        this.thinkingTime = { min: 1500, max: 3000 };
        break;
      case 'medium':
        this.thinkingTime = { min: 1000, max: 2000 };
        break;
      case 'hard':
        this.thinkingTime = { min: 500, max: 1500 };
        break;
      default:
        this.thinkingTime = { min: 800, max: 2000 };
    }
  }
}

export default BotPlayer;
