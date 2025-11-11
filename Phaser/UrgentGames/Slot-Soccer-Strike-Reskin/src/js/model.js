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
		// this.symbolsList = [
		// 	"A",
		// 	"Acorn",
		// 	"Apple",
		// 	"Blueberry",
		// 	"Bonus",
		// 	"Chanterelle",
		// 	"Clover",
		// 	"Free Spin",
		// 	"Honey",
		// 	"J",
		// 	"K",
		// 	"Nine",
		// 	"Q",
		// 	"Ten",
		// 	"Wild"
		// ];
		this.symbolsList = [
			"Wild",
			"Ball",
			"Field",
			"Gloves",
			"Goal",
			"Score Board",
			"Shoes",
			"Strike",
			"Trophy",
			"Whistle",
			"Bonus",
			"Free Spin"
		];
		this.balance            = 0;
		this.betsValues         = [];
		this.currentGrid        = [];
		this.selectedLines      = 0;
		this.selectedBetPerLine = 0;
		this.lastWinValue       = 0;
		this.paylinesData       = [];
		this.wonPaylines        = [];
		this.freeSpinsData      = [];
		this.regularPaytable    = [];
		this.featurePaytable    = [];
		this.bonus              = 0;
	};
	//#############################################################################################
	/**
	 * Return list of symbols available in game.
	 * @public
	 * @returns {string[]}
	 */
	getSymbols() {
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
	//#############################################################################################
	/**
	 * Contain all posiible values of bets, available in bet switcher on bottom panel.
	 * @public
	 * @returns {number[]}
	 */
	getBetsValues() {
		return this.betsValues;
	};
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
	getGrid() {
		return this.currentGrid;
	};
	//#############################################################################################
	getLastWin() {
		return this.lastWinValue;
	}
	//#############################################################################################
	getLines() { 
		return this.selectedLines;
	};
	//#############################################################################################
	getBetPerLine() {
		return this.selectedBetPerLine;
	};
	//#############################################################################################
	getPaylines() {
		return this.paylinesData;
	};
	//#############################################################################################
	getRegularPaytable() {
		return this.regularPaytable;
	};
	//#############################################################################################
	getFeaturePaytable() {
		return this.featurePaytable;
	}
	//#############################################################################################
	getWonPaylines() {
		return this.wonPaylines;
	};
	//#############################################################################################
	getFreeSpinsData() {
		return this.freeSpinsData;
	}
	//#############################################################################################
	setLines(value) {
		this.selectedLines = value;
	};
	//#############################################################################################
	setBetPerLine(value) {
		this.selectedBetPerLine = value;
	};
	//#############################################################################################
	setBalance(newBalance) {
		this.balance = newBalance.toFixed(2);
	};
	//#############################################################################################
	setBetsValues(newValues) {
		this.betsValues = newValues;
	};
	//#############################################################################################
	setBonus(value) {
		this.bonus = value;
	};
	//#############################################################################################
	setGrid(value) {
		this.currentGrid = value;
	};
	//#############################################################################################
	setLastWin(value) {
		this.lastWinValue = value;
	};
	//#############################################################################################
	setPaylines(values) {
		this.paylinesData = values;
		this.setLines(this.paylinesData.length);
	};
	//#############################################################################################
	setWonPaylines(values) {
		this.wonPaylines = values;
	};
	//#############################################################################################
	setFreeSpinsData(data) {
		this.freeSpinsData = data;
	};
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