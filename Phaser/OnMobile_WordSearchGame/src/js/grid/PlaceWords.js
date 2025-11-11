/* global Phaser */

/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 20-09-2024.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 26-09-2024
 * @Description :- Places words on Word List.
 ************************************/

class PlaceWords {
  constructor(scene, boardSizer, column, numberOfWordsForPlace, words) {
    this.scene = scene;
    this.boardSizer = boardSizer;
    this.column = column;
    this.numberOfWordsForPlace = numberOfWordsForPlace;
    this.tempWords = [...words].sort((a, b) => a.length - b.length); // Sort words by length (shorter words first)
    this.storingIndexOfWords = [];
    this.placedLetters = new Map();
    this.counterOfWordPlaced = 0;
    this.diagonalWordPlaced = 0; // Track diagonal words
    this.diagonalDirections = [1, 2, 3, 4]; // Available diagonal directions
    this.lastDiagonalDirection = null; // Last diagonal direction
    this.diagonalWords = []; // Store words placed diagonally
    this.allPlacedWords = []; // Array to store all placed words

    this.PlaceTexts(); // Start word placement
  }

  PlaceTexts() {
    // First try to place diagonal words (prefer shorter ones to save space)
    let diagonalWordsAttempted = 0;
    while (this.diagonalWordPlaced < 2 && diagonalWordsAttempted < this.tempWords.length) {
      if (this.TryPlaceDiagonalWord()) {
        this.diagonalWordPlaced++;
      }
      diagonalWordsAttempted++;
    }

    // Now place remaining words
    for (let i = 0; i < this.numberOfWordsForPlace && this.tempWords.length > 0; i++) {
      let isPlaced = false;
      let attempts = 0;

      // Pick a word to place
      const wordIndex = Phaser.Math.Between(0, this.tempWords.length - 1);
      const word = this.tempWords[wordIndex]; // Do not reverse words anymore

      // const originalWord = word;

      // Ensure storingIndexOfWords is initialized as an array for the current word
      if (!this.storingIndexOfWords[this.counterOfWordPlaced]) {
        this.storingIndexOfWords[this.counterOfWordPlaced] = []; // Initialize as empty array
      }

      // Try intersections first, then random placement if needed
      while (!isPlaced && attempts < 100) {
        attempts++;
        const intersectionInfo = this.FindIntersection(word);
        if (intersectionInfo) {
          const { row, col, pattern } = intersectionInfo;
          if (this.CanPlaceText(word, this.column, pattern, row, col)) {
            this.PlaceWord(word, pattern);
            isPlaced = true;
            this.tempWords.splice(wordIndex, 1); // Remove placed word
            this.allPlacedWords.push({ word: word, pattern, row, col }); // Add to allPlacedWords array
          }
        }

        if (!isPlaced) {
          this.randomPattern = Phaser.Math.Between(1, 2); // Horizontal (1) or vertical (2)
          this.randomRow = Phaser.Math.Between(1, this.column);
          this.randomColumn = Phaser.Math.Between(1, this.column);

          if (this.CanPlaceText(word, this.column, this.randomPattern, this.randomRow, this.randomColumn)) {
            this.PlaceWord(word, this.randomPattern);
            isPlaced = true;
            this.tempWords.splice(wordIndex, 1); // Remove placed word
            this.allPlacedWords.push({ word: word, pattern: this.randomPattern, row: this.randomRow, col: this.randomColumn }); // Add to allPlacedWords array
          }
        }

        if (attempts === 100) {

          // console.warn(`Failed to place the word: ${word} after 100 attempts.`);
        }
      }
    }

    // Ensure minimum number of words are placed
    if (this.counterOfWordPlaced < this.numberOfWordsForPlace) {

      // console.warn(`Only ${this.counterOfWordPlaced} words placed.Retrying.`);
      this.PlaceTexts(); // Retry if fewer than minimum words are placed
    }

  }

  TryPlaceDiagonalWord() {
    const availableDirections = this.diagonalDirections.filter(dir => dir !== this.lastDiagonalDirection);
    if (availableDirections.length === 0) {

      // console.warn('No available diagonal directions.');
      return false;
    }

    const direction = Phaser.Math.Between(0, availableDirections.length - 1);
    this.lastDiagonalDirection = availableDirections[direction];
    this.randomPattern = 3; // Diagonal pattern
    this.randomRow = Phaser.Math.Between(1, this.column);
    this.randomColumn = Phaser.Math.Between(1, this.column);
    const diagonalDirection = availableDirections[direction];
    const isForward = true; // Always forward since we no longer reverse

    const wordIndex = Phaser.Math.Between(0, this.tempWords.length - 1);
    const word = this.tempWords[wordIndex];

    if (this.CanPlaceText(word, this.column, this.randomPattern, this.randomRow, this.randomColumn, diagonalDirection, isForward)) {
      this.PlaceWord(word, this.randomPattern, diagonalDirection, isForward);
      this.diagonalWords.push({ word, direction: diagonalDirection });
      this.tempWords.splice(wordIndex, 1); // Remove the placed word
      this.allPlacedWords.push({ word, pattern: this.randomPattern, row: this.randomRow, col: this.randomColumn, direction: diagonalDirection }); // Add to allPlacedWords array

      return true;
    }

    return false;
  }

  FindIntersection(word) {
    for (let placedWordIndex = 0; placedWordIndex < this.counterOfWordPlaced; placedWordIndex++) {
      const placedWord = this.tempWords[placedWordIndex];
      const storedIndexes = this.storingIndexOfWords[placedWordIndex];


      for (let i = 0; i < word.length; i++) {
        const letter = word[i];
        // console.log("letter", letter);

        const intersectIndex = placedWord.indexOf(letter);

        if (intersectIndex !== -1) {
          const placedLetterIndex = storedIndexes[intersectIndex];
          const row = Math.floor(placedLetterIndex / this.column);
          const col = placedLetterIndex % this.column;

          const pattern = placedWord.indexOf(letter) === intersectIndex ? 2 : 1;

          // Validate intersection
          if (this.ValidateIntersection(word, placedWord, row, col, pattern)) {
            return { row, col, pattern };
          }
        }
      }
    }

    return null; // No valid intersection found
  }

  ValidateIntersection(newWord, placedWord, row, col, pattern) {
    // const placedWordLength = placedWord.length;
    const newWordLength = newWord.length;

    if (pattern === 1) {
      // Horizontal intersection
      if (row >= 0 && row < this.row && col >= 0 && col + newWordLength <= this.column) {
        // Check if all letters match
        for (let i = 0; i < newWordLength; i++) {
          if (this.board[row][col + i] !== '' && this.board[row][col + i] !== newWord[i]) {
            return false;
          }
        }
        return true;
      }
    } else if (pattern === 2) {
      // Vertical intersection
      if (row >= 0 && row + newWordLength <= this.row && col >= 0 && col < this.column) {
        // Check if all letters match
        for (let i = 0; i < newWordLength; i++) {
          if (this.board[row + i][col] !== '' && this.board[row + i][col] !== newWord[i]) {
            return false;
          }
        }
        return true;
      }
    }

    return false;
  }

  CanPlaceText(cellWord, gridLength, pattern, row, column, diagonalDirection = null, isForward = true) {

    // console.info('Checking if word can be placed:', cellWord);

    this.startIndex = ((row - 1) * gridLength) + column - 1;

    if (pattern === 1) { // Horizontal placement
      return this.canPlaceHorizontal(cellWord, gridLength, row, column);
    } else if (pattern === 2) { // Vertical placement
      return this.canPlaceVertical(cellWord, gridLength, row, column);
    } else if (pattern === 3) { // Diagonal placement
      return this.canPlaceDiagonal(cellWord, gridLength, row, column, diagonalDirection, isForward);
    }
    return false;
  }


  canPlaceHorizontal(cellWord, gridLength, row, column) {
    if (column + cellWord.length > gridLength) {
      return false;
    }

    for (let index = 0; index < cellWord.length; index++) {
      const gridIndex = this.startIndex + index;
      if (!this.isCellAvailable(gridIndex, cellWord[index])) {
        return false;
      }
    }

    return true;
  }

  canPlaceVertical(cellWord, gridLength, row) {
    if (row + cellWord.length > gridLength) {
      return false;
    }

    for (let index = 0; index < cellWord.length; index++) {
      const gridIndex = this.startIndex + (index * this.column);
      if (!this.isCellAvailable(gridIndex, cellWord[index])) {
        return false;
      }
    }

    return true;
  }

  canPlaceDiagonal(cellWord, gridLength, row, column, diagonalDirection, isForward) {
    const offset = isForward ? 0 : (cellWord.length - 1);

    const diagonalCheckers = {
      1: this.checkDiagonalDownRight,
      2: this.checkDiagonalDownLeft,
      3: this.checkDiagonalUpRight,
      4: this.checkDiagonalUpLeft
    };

    return diagonalCheckers[diagonalDirection].call(this, cellWord, gridLength, row, column, offset, isForward);
  }

  checkDiagonalDownRight(cellWord, gridLength, row, column, offset, isForward) {
    if (row + cellWord.length > gridLength || column + cellWord.length > gridLength) {
      return false;
    }

    for (let index = 0; index < cellWord.length; index++) {
      const gridIndex = this.startIndex + (index * this.column) + index;
      if (!this.isCellAvailable(gridIndex, cellWord[offset])) {
        return false;
      }
      offset = isForward ? offset + 1 : offset - 1;
    }

    return true;
  }

  checkDiagonalDownLeft(cellWord, gridLength, row, column, offset, isForward) {
    if (row + cellWord.length > gridLength || column - cellWord.length < 0) {
      return false;
    }

    for (let index = 0; index < cellWord.length; index++) {
      const gridIndex = this.startIndex + (index * this.column) - index;
      if (!this.isCellAvailable(gridIndex, cellWord[offset])) {
        return false;
      }
      offset = isForward ? offset + 1 : offset - 1;
    }

    return true;
  }

  checkDiagonalUpRight(cellWord, gridLength, row, column, offset, isForward) {
    if (row - cellWord.length < 0 || column + cellWord.length > gridLength) {
      return false;
    }

    for (let index = 0; index < cellWord.length; index++) {
      const gridIndex = this.startIndex - (index * this.column) + index;
      if (!this.isCellAvailable(gridIndex, cellWord[offset])) {
        return false;
      }
      offset = isForward ? offset + 1 : offset - 1;
    }

    return true;
  }

  checkDiagonalUpLeft(cellWord, gridLength, row, column, offset, isForward) {
    if (row - cellWord.length < 0 || column - cellWord.length < 0) {
      return false;
    }

    for (let index = 0; index < cellWord.length; index++) {
      const gridIndex = this.startIndex - (index * this.column) - index;
      if (!this.isCellAvailable(gridIndex, cellWord[offset])) {
        return false;
      }
      offset = isForward ? offset + 1 : offset - 1;
    }

    return true;
  }

  isCellAvailable(gridIndex, letter) {
    if (this.placedLetters.has(gridIndex)) {
      return this.placedLetters.get(gridIndex) === letter;
    }

    return true;
  }

  PlaceWord(cellWord, pattern, diagonalDirection = null, isForward = true) {
    const placementStrategies = {
      1: this.placeHorizontal,
      2: this.placeVertical,
      3: this.placeDiagonal,
    };

    placementStrategies[pattern].call(this, cellWord, diagonalDirection, isForward);
    this.counterOfWordPlaced++;
  }

  placeHorizontal(cellWord) {
    if (!this.storingIndexOfWords[this.counterOfWordPlaced]) {
      this.storingIndexOfWords[this.counterOfWordPlaced] = [];
    }

    for (let index = 0; index < cellWord.length; index++) {
      const gridIndex = this.startIndex + index;
      this.placedLetters.set(gridIndex, cellWord[index]);
      this.storingIndexOfWords[this.counterOfWordPlaced].push(gridIndex);
      this.PlaceWordOnBoardSizer(gridIndex, index, cellWord);

    }

  }

  placeVertical(cellWord) {
    if (!this.storingIndexOfWords[this.counterOfWordPlaced]) {
      this.storingIndexOfWords[this.counterOfWordPlaced] = [];
    }

    for (let index = 0; index < cellWord.length; index++) {
      const gridIndex = this.startIndex + (index * this.column);
      this.placedLetters.set(gridIndex, cellWord[index]);
      this.storingIndexOfWords[this.counterOfWordPlaced].push(gridIndex);
      this.PlaceWordOnBoardSizer(gridIndex, index, cellWord);
    }
  }

  placeDiagonal(cellWord, diagonalDirection, isForward) {
    if (!this.storingIndexOfWords[this.counterOfWordPlaced]) {
      this.storingIndexOfWords[this.counterOfWordPlaced] = [];
    }

    const diagonalPlacers = {
      1: this.placeDiagonalDownRight,
      2: this.placeDiagonalDownLeft,
      3: this.placeDiagonalUpRight,
      4: this.placeDiagonalUpLeft,
    };

    diagonalPlacers[diagonalDirection].call(this, cellWord, isForward);

  }

  placeDiagonalDownRight(cellWord, isForward) {
    let offset = isForward ? 0 : (cellWord.length - 1);

    for (let index = 0; index < cellWord.length; index++) {
      const gridIndex = this.startIndex + (index * this.column) + index;
      this.placedLetters.set(gridIndex, cellWord[offset]);
      this.storingIndexOfWords[this.counterOfWordPlaced].push(gridIndex);
      offset = isForward ? offset + 1 : offset - 1;
      this.PlaceWordOnBoardSizer(gridIndex, index, cellWord);
    }
  }

  placeDiagonalDownLeft(cellWord, isForward) {
    let offset = isForward ? 0 : (cellWord.length - 1);

    for (let index = 0; index < cellWord.length; index++) {
      const gridIndex = this.startIndex + (index * this.column) - index;
      this.placedLetters.set(gridIndex, cellWord[offset]);
      this.storingIndexOfWords[this.counterOfWordPlaced].push(gridIndex);
      offset = isForward ? offset + 1 : offset - 1;
      this.PlaceWordOnBoardSizer(gridIndex, index, cellWord);
    }
  }

  placeDiagonalUpRight(cellWord, isForward) {
    let offset = isForward ? 0 : (cellWord.length - 1);

    for (let index = 0; index < cellWord.length; index++) {
      const gridIndex = this.startIndex - (index * this.column) + index;
      this.placedLetters.set(gridIndex, cellWord[offset]);
      this.storingIndexOfWords[this.counterOfWordPlaced].push(gridIndex);
      offset = isForward ? offset + 1 : offset - 1;
      this.PlaceWordOnBoardSizer(gridIndex, index, cellWord);
    }
  }


  placeDiagonalUpLeft(cellWord, isForward) {
    let offset = isForward ? 0 : (cellWord.length - 1);

    for (let index = 0; index < cellWord.length; index++) {
      const gridIndex = this.startIndex - (index * this.column) - index;
      this.placedLetters.set(gridIndex, cellWord[offset]);
      this.storingIndexOfWords[this.counterOfWordPlaced].push(gridIndex);
      offset = isForward ? offset + 1 : offset - 1;
      this.PlaceWordOnBoardSizer(gridIndex, index, cellWord);
    }
  }

  PlaceWordOnBoardSizer(_gridInd, _index, _cWord) {
    this.boardSizer.sizerChildren[_gridInd].children[1].text = _cWord[_index];
    this.boardSizer.sizerChildren[_gridInd].children[1].setOrigin(0.5, 0.1);
  }
}

export default PlaceWords;
