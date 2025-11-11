/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* global window,console */
/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 05-11-2025.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 05-11-2025
 * @Description :- Handles deck creation, shuffling, and dealing.
 ************************************/
import { Constant } from '../utils/Constant';
import { Utils } from '../utils/Utils';
// import { Model } from '../utils/Model';

class Deck {
  constructor(_scene) {
    this.scene = _scene;
    this.colors = ['red', 'green', 'blue', 'yellow'];
    this.numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    this.actions = ['skip', 'reverse', 'draw2'];
    this.wilds = ['wild', 'wild_draw4'];
    this.fullDeck = [];

    this.CreateDeck();
  };

  //#region - Create Deck
  CreateDeck() {

    this.colors.forEach(color => {
      // console.log('color: ', color);
      this.fullDeck.push({ color, type: 'number', value: '0' });

      this.numbers.slice(1).forEach(num => {
        this.fullDeck.push({ color, type: 'number', value: num });
        this.fullDeck.push({ color, type: 'number', value: num });
      });

      this.actions.forEach(action => {
        this.fullDeck.push({ color, type: action });
        this.fullDeck.push({ color, type: action });
      });

    });
    this.wilds.forEach(wild => {
      for (let i = 0; i < 4; i++) {
        this.fullDeck.push({ color: 'black', type: wild });
      }
    });
    // console.log('this.fullDeck: ', this.fullDeck);
    this.ShuffleDeck();
    return this.fullDeck;

  };
  //#endregion

  ShuffleDeck() {
    for (let i = this.fullDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.fullDeck[i], this.fullDeck[j]] = [this.fullDeck[j], this.fullDeck[i]];
    }
  };

  DealCards(count) {
    if (count > this.fullDeck.length) return;
    const dealtCards = [];
    for (let j = 0; j < count; j++) {
      dealtCards.push(this.fullDeck.pop());
    }
    return dealtCards;
  };

  DealSingleCard() {
    if (this.IsEmpty()) {
      return null;
    }
    return this.fullDeck.pop();
  };

  IsEmpty() {
    return this.fullDeck.length === 0;
  };

  GetActualCardFrameIndex(_card) {
    const colors = this.colors;           // ['red','green','blue','yellow']
    const FRAMES_PER_COLOR = 13;
    const WILD_START = FRAMES_PER_COLOR * colors.length; // auto = 52

    const colorIndex = colors.indexOf(_card.color);
    if (_card.type === 'wild') return WILD_START;
    if (_card.type === 'wild_draw4') return WILD_START + 1;
    if (_card.type === 'number') return (colorIndex * FRAMES_PER_COLOR) + parseInt(_card.value);
    if (_card.type === 'skip') return (colorIndex * FRAMES_PER_COLOR) + 10;
    if (_card.type === 'reverse') return (colorIndex * FRAMES_PER_COLOR) + 11;
    if (_card.type === 'draw2') return (colorIndex * FRAMES_PER_COLOR) + 12;
    return 0;
  };

  GetCardColorIndex(_card) {
    const colors = ['red', 'green', 'blue', 'yellow', 'black'];
    console.log('GetCardColorIndex _card.................', _card);

    return colors.indexOf(_card.color); // returns 0,1,2,3
  };


};

export default Deck;