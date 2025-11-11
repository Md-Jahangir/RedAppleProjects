/**
 * Paytable item. Contain symbol name and paytable array.
 * @typedef {Object} PaytableItem
 * @property {string} symbol - symbol name.
 * @property {number[]} paytable - paytable array.
 */

/**
 * Model contain all data neede for game, like player balance, bets values etc.
 * All data except symbols requested from server.
 */
class Model {
    constructor() {

        this.leftPayLineNumber = [
            4, 2, 24, 20, 16, 10, 1, 11, 17, 13, 21, 5, 3
        ];
        this.rightPayLineNumber = [
            14, 18, 12, 9, 22, 6, 7, 23, 8, 19, 25, 15
        ];
        this.totalPayLineNumber = [
            4, 2, 24, 20, 16, 10, 1, 11, 17, 13, 21, 5, 3, 14, 18, 12, 9, 22, 6, 7, 23, 8, 19, 25, 15
        ];

        this.symbolsList = [
            "wild",
            "scatter",
            "a",
            "q",
            "j",
            "k",
            "9",
            "10",
            "goldFish",
            "starFish",
            "shark",
            "seaHorse",
            "turtle"
        ];

        this.balance = 0;
        this.betsValues = [];
        this.paylinesData = [];

        this.currentGrid = [];
        this.selectedLines = 0;
        this.selectedBetPerLine = 0;
        this.lastWinValue = 0;
        this.wonPaylines = [];
        this.freeSpinsData = [];

        this.regularPaytable = [];
        this.featurePaytable = [];
        this.bonus = 0;

        this.lineNumber = 25;
        this.totalBetValue = 0;
        this.betAmountValue = [];
        this.multiplier = 0;
        this.soundStatus;
        this.musicStatus;
    };


    GetLeftPayLineNumber() {
        return this.leftPayLineNumber;
    }

    GetRightPayLineNumber() {
        return this.rightPayLineNumber;
    }

    GetTotalPayLineNumber() {
        return this.totalPayLineNumber;
    }

    //#############################################################################################
    /**
     * Return list of symbols available in game.
     * @public
     * @returns {string[]}
     */
    GetSymbols() {
        return this.symbolsList;
    };
    //#############################################################################################
    /**
     * Return current player's balance. This value updates during the game.
     * @public
     * @returns {number}
     */
    getBalance() {
        return this.balance;
    };
    setBalance(newBalance) {
        this.balance = parseFloat(newBalance).toFixed(2);
    };

    //#############################################################################################
    /**
     * Contain all posiible values of bets, available in bet switcher on bottom panel.
     * @public
     * @returns {number[]}
     */
    getBetsValues() {
        return this.betsValues;
    };
    setBetsValues(newValues) {
        this.betsValues = newValues;
    };

    //#############################################################################################
    getPaylines() {
        return this.paylinesData;
    };
    setPaylines(values) {
        this.paylinesData = values;
        this.setLines(this.paylinesData.length);
    };

    //#############################################################################################
    getLines() {
        return this.selectedLines;
    };
    setLines(value) {
        this.selectedLines = value;
    };

    //#############################################################################################
    getBetPerLine() {
        return this.selectedBetPerLine;
    };
    setBetPerLine(value) {
        this.selectedBetPerLine = value;
    };

    //#############################################################################################
    getGrid() {
        return this.currentGrid;
    };
    setGrid(value) {
        this.currentGrid = value;
    };

    //#############################################################################################
    getLastWin() {
        return this.lastWinValue;
    };
    setLastWin(value) {
        this.lastWinValue = value;
    };

    //#############################################################################################
    getWonPaylines() {
        return this.wonPaylines;
    };
    setWonPaylines(values) {
        this.wonPaylines = values;
    };


    //#############################################################################################
    //#############################################################################################

    GetTotalBet() {
        return this.totalBetValue;
    };
    SetTotalBet(_newTotalBetValue) {
        this.totalBetValue = _newTotalBetValue;
    };

    GetLineNumber() {
        return this.lineNumber;
    };
    SetLineNumber(_newLineNumber) {
        this.lineNumber = _newLineNumber;
    };

    GetBetAmountValue() {
        return this.betAmountValue;
    };
    SetBetAmountValue(_newBetAmountValue) {
        this.betAmountValue = _newBetAmountValue;
    };

    setFreeSpinsData(_data) {
        this.freeSpinsData = _data;
    };
    getFreeSpinsData() {
        return this.freeSpinsData;
    }

    SetMultiplierValue(_newValue) {
        this.multiplier = _newValue;
    }
    GetMultiplierValue() {
        return this.multiplier;
    }

    SetRemainingFreeSpinOptions(_newValue) {
        this.remainingOption = _newValue;
    }
    GetRemainingFreeSpinOptions() {
        return this.remainingOption;
    }

    SetSoundStatus(_status) {
        this.soundStatus = _status;
    }

    GetSoundStatus() {
        return this.soundStatus;
    }

    SetMusicStatus(_status) {
        this.musicStatus = _status;
    }

    GetMusicStatus() {
        return this.musicStatus;
    }

    //==============================================================================
    //==============================================================================



    //#############################################################################################
    /**
     * Return current bonus value.
     * NOTE: this value is set to 0 after bonus popup was shown, or bonus game was played.
     * @public 
     * @returns {number}
     */
    getBonus() {
            return this.bonus;
        }
        //#############################################################################################

    //#############################################################################################

    //#############################################################################################

    //#############################################################################################
    getRegularPaytable() {
        return this.regularPaytable;
    };
    //#############################################################################################
    getFeaturePaytable() {
            return this.featurePaytable;
        }
        //#############################################################################################

    //#############################################################################################

    //#############################################################################################

    //#############################################################################################

    //#############################################################################################

    //#############################################################################################

    //#############################################################################################
    setBonus(value) {
        this.bonus = value;
    };
    //#############################################################################################

    //#############################################################################################

    //#############################################################################################

    //#############################################################################################

    //#############################################################################################

    //#############################################################################################
    setPaytable(data) {
        let regular = data["Regular"];
        let feature = data["Feature"];
        this.sortPaytable(this.regularPaytable, regular);
        this.sortPaytable(this.featurePaytable, feature);
    };
    //#############################################################################################
    /**
     * Fill and sort paytable items array. Format is differ from server because client need to use sorted list, to show
     * in paytable popups.
     * @private
     * @param {PaytableItem[]} list - sorted list of paytable items.
     * @param {{string : number[]}} paytableData - data from server. It's object with string properties (symbols names).
     */
    sortPaytable(list, paytableData) {
        for (let prop in paytableData) {
            let listItem = {
                "symbol": prop,
                "paytable": paytableData[prop]
            }
            list.push(listItem);
        };
        list.sort((elem1, elem2) => {
            // paytable array has same length for both elements
            let length = elem1.paytable.length;
            if (elem1.paytable[length - 1] > elem2.paytable[length - 1]) {
                return -1;
            }
            return 0;
        });
    };
};

let gameModel = new Model();

export { gameModel as Model };