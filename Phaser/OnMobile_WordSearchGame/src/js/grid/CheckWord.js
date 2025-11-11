/* global setTimeout*/

/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 19-09-2024.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 16-10-2024.
 * @Description :- Checks if selected word matches with any list of words.
 ************************************/

import CoinTween from '../game-objects/CoinTween';
import Strikethrough from '../game-objects/Strikethrough';
import { AudioManager } from '../media/AudioManager';

class CheckWord {
  constructor(scene, searchedWord, wordList, selectedCells) {

    this.scene = scene;
    this.searchedWord = searchedWord;
    this.wordList = wordList;
    this.selectedCells = selectedCells;
    this.searchList = this.scene.searchListArray;
    this.wordsDumpedArray = this.scene.wordsDumpedArray;
    this.cTxt = null;
    this.cTile = null;
    this.arrCoin = [];
    this.strike = null;

    this.CheckMatch();

  }

  async CheckMatch() {
    this.CheckValidDirection();
    if (this.wordList.includes(this.searchedWord) && this.isValidSequence) {
      this.scene.dragDirCheckArray = [];
      AudioManager.PlayWordMatchedAudio();
      this.scene.events.emit('scoreup');
      this.textColor = this.ChangeTileTextColor(this.scene.uniqueRndNum[0]);
      for (let i = 0; i < this.selectedCells.length; i++) {
        this.selectedCells[i].children[0].setTexture(`color_box_${this.scene.uniqueRndNum[0]}`);
        this.selectedCells[i].children[0].data = this.scene.uniqueRndNum[0];
        this.selectedCells[i].children[1].setStyle({ fill: this.textColor.cTxt });
        this.selectedCells[i].children[1].data.list.selection = false;
        this.selectedCells[i].children[1].data.list.fill = this.textColor.cTxt;
        const coin = this.scene.add.image(this.selectedCells[i].children[0].x, this.selectedCells[i].children[0].y, 'coin').setScale(0);
        this.arrCoin.push(coin);
      }
      // for (let i = 0; i < this.selectedCells.length; i++) {
      //   const coin = this.scene.add.image(this.selectedCells[i].children[0].x, this.selectedCells[i].children[0].y, 'coin').setScale(0);
      //   this.arrCoin.push(coin);
      // }
      const searchedWordIndex = this.wordList.indexOf(this.searchedWord);
      const wordFromListIndex = this.scene.words.findIndex(obj => obj.word === this.searchedWord);
      this.wordList.splice(searchedWordIndex, 1);
      this.scene.words.splice(wordFromListIndex, 1);
      this.scene.storedIndices.splice(wordFromListIndex, 1);
      this.scene.uniqueRndNum.splice(0, 1);
    }
    else {
      this.scene.dragDirCheckArray = [];
      // console.log('check', this.scene.dragDirCheckArray);
      AudioManager.PlayIncorrectMatchedAudio();
      for (let i = 0; i < this.selectedCells.length; i++) {
        this.selectedCells[i].children[1].setStyle({ fill: this.selectedCells[i].children[1].data.list.fill });
        if (this.selectedCells[i].children[0].data === null) {
          this.selectedCells[i].children[0].setTexture('lBase');
          this.selectedCells[i].children[1].data.list.selection = false;
        }
        else {
          this.selectedCells[i].children[0].setTexture(`color_box_${this.selectedCells[i].children[0].data}`);
          this.selectedCells[i].children[1].data.list.selection = false;
        }
      }
    }

    if (this.isValidSequence) {

      this.MarkFoundWordFromList();
      // this.LevelUpgrade();
    }
  }

  CheckValidDirection() {
    // console.log("selected dir", this.scene.dragDirCheckArray);
    const arr = this.scene.dragDirCheckArray;

    if (arr.length < 2) return false; // Not enough elements to check

    this.isValidSequence = false; // Final result

    // 1️⃣ Check for Incrementing or Decrementing by specified steps
    if (this.checkIncrementDecrement(arr, 10)) return; // Check by 10
    if (this.checkIncrementDecrement(arr, 1)) return;  // Check by 1
    if (this.checkIncrementDecrement(arr, 9)) return;  // Check by 9
    if (this.checkIncrementDecrement(arr, 11)) return; // Check by 11

    // 2️⃣ Check for multiples of 11 (first to last or last to first)
    if (this.checkMultiples(arr, 11)) return;

    // 3️⃣ Check for differences of 9 (first to last or last to first)
    if (this.checkDifference(arr, 9)) return;

    // ❌ If none of the conditions are met, set false
    this.isValidSequence = false;
  }

  // Helper function: Check increment or decrement by a specific step
  checkIncrementDecrement(arr, step) {
    let isIncrementing = true;
    let isDecrementing = true;

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] !== arr[i - 1] + step) {
        isIncrementing = false;
      }
      if (arr[i] !== arr[i - 1] - step) {
        isDecrementing = false;
      }
    }

    if (isIncrementing || isDecrementing) {
      this.isValidSequence = true;
      return true; // ✅ Sequence is valid
    }

    return false; // ❌ Continue checking other conditions
  }

  // Helper function: Check if all elements are multiples of a number
  checkMultiples(arr, num) {
    const isMultipleFirstToLast = arr.every(val => val % num === 0);
    const isMultipleLastToFirst = [...arr].reverse().every(val => val % num === 0);

    if (isMultipleFirstToLast || isMultipleLastToFirst) {
      this.isValidSequence = true;
      return true; // ✅ Sequence is valid
    }

    return false; // ❌ Continue checking other conditions
  }

  // Helper function: Check if the difference between consecutive elements is a specific value
  checkDifference(arr, diff) {
    let isDifferenceFirstToLast = true;
    let isDifferenceLastToFirst = true;

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] - arr[i - 1] !== diff) {
        isDifferenceFirstToLast = false;
      }
    }

    for (let i = arr.length - 1; i > 0; i--) {
      if (arr[i - 1] - arr[i] !== diff) {
        isDifferenceLastToFirst = false;
      }
    }

    if (isDifferenceFirstToLast || isDifferenceLastToFirst) {
      this.isValidSequence = true;
      return true; // ✅ Sequence is valid
    }

    return false; // ❌ Continue checking other conditions
  }

  ChangeTileTextColor(_tileColor) {
    switch (_tileColor) {
      case 1: return { cTxt: '#086F70', cTile: '#01A3A4' };
      case 2: return { cTxt: '#094485', cTile: '#4692E6' };
      case 3: return { cTxt: '#0C542F', cTile: '#54CA8E' };
      case 4: return { cTxt: '#9A5110', cTile: '#FC8113' };
      case 5: return { cTxt: '#921065', cTile: '#FDA7DF' };
      case 6: return { cTxt: '#5C127F', cTile: '#C969F6' };
      case 7: return { cTxt: '#A00F38', cTile: '#FF6296' };
      case 8: return { cTxt: '#271489', cTile: '#7463F0' };
      case 9: return { cTxt: '#9C5A12', cTile: '#FCCD13' };
      default:
        break;
    }
  }

  MarkFoundWordFromList() {
    const tempSearchListLen = this.searchList.length;
    this.searchList.forEach((_c, index) => {
      if (_c._text === this.searchedWord) {
        _c.setStyle({ fill: this.textColor.cTile });
        this.strike = new Strikethrough(this.scene, _c, this.textColor.cTile);
        this.wordsDumpedArray.push(_c);
        this.wordsDumpedArray.push(this.strike.rect);
        this.searchList.splice(index, 1);  // Use index to remove the correct element
      }
    });
    if (this.searchList.length < tempSearchListLen) {
      this.coinTween = new CoinTween(this.scene, this.arrCoin, this.LevelUpgrade());
      const fontTextStyle = { fontFamily: 'Fredoka-Bold', fontSize: '35px', fill: '#ffefd7', align: 'center' };
      const text = '+10';
      // let localPos = this.scene.pointBase.getLocalPoint(matrix.tx, matrix.ty);
      this.toastTxt = this.scene.add.text(this.scene.pointBase.x + 100, this.scene.pointBase.y + 50, text, fontTextStyle).setAlpha(0);
      this.scene.topPanelContainer.add(this.toastTxt);
      this.TweenToast(this.toastTxt);
    }
  }

  LevelUpgrade() {
    if (this.searchList.length === 0) {
      this.searchList.push('a');
      setTimeout(() => {
        this.scene.events.emit('levelup');
      }, 2000);
    }

  }

  TweenToast(_toastObj) {
    this.scene.tweens.add({
      targets: _toastObj,
      y: _toastObj.y - 50,
      alpha: { from: 0, to: 1 },
      duration: 500,
      onComplete: () => {
        this.RemoveToastFromScreen(_toastObj);
      }
    });
  }

  RemoveToastFromScreen(_toastObj) {
    this.scene.tweens.add({
      targets: _toastObj,
      y: _toastObj.y - 50,
      alpha: { from: 1, to: 0 },
      duration: 500,
      onComplete: () => {
        _toastObj.destroy();
      }
    });
  }
}


export default CheckWord;