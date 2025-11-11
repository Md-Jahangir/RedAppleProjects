/**
 * Paytable item. Contain symbol name and paytable array.
 * @typedef {Object} TypePaytableItem
 * @property {string} symbol - symbol name.
 * @property {number[]} paytable - paytable array.
 */

/**
 * Information about payline. Contain it configuration and color. Color value is not used - they are predefined on client.
 * @typedef {Object} TypePaylineItem
 * @property {number[]} points - line grid configuration.
 * @property {string} color - color of payline.
 */

/**
 * Information about payline that won during spin.
 * @typedef {Object} TypeWonPayline
 * @property {number} index - index of payline in paylines list. Used for drawing.
 * @property {number[]} points - payline configuration.
 * @property {number[]} winIndexes - indexes of won symbols in line.
 */

/**
 * Information about earned free games.
 * @typedef {Object} TypeFreeSpinData
 * @property {string[][]} grid - grid for current spin.
 * @property {number} multiplier - results multiplier. Used for user information.
 * @property {TypeWonPayline[]} wonPaylines - information about paylines that won during free spin
 */

/**
 * Model contain all data neede for game, like player balance, bets values etc.
 * All data except symbols requested from server.
 * @class
 */
class Model {
	constructor() {
		// TODO: maybe a good idea to move symbols list to the server, and send it with initial data.
		/**
		 * List of symbols used by game.
		 * @type {string[]}
		 */
		this.symbolsList = [
			"A",
			"Acorn",
			"Apple",
			"Blueberry",
			"Bonus",
			"Chanterelle",
			"Clover",
			"Free Spin",
			"Honey",
			"J",
			"K",
			"Nine",
			"Q",
			"Ten",
			"Wild"
		];
		/**
		 * User balance. Balance updates by server during game.
		 * @type {number}
		 */
		this.balance = 0;
		/**
		 * List of possible bet values, used in bet switcher on bottom panel.
		 * @type {number[]}
		 */
		this.betsValues = [];
		/**
		 * Representation of reels data. Updates each spin. Usually it array of string [5][3].
		 * @type {string[][]}
		 */
		this.currentGrid = [];
		/**
		 * Number of paylines selected by user. It forcibly set to general number of paylines. See setPaylines() method.
		 * @type {number}
		 */		
		this.selectedLines = 0;
		/**
		 * Selected bet per line value. This value is different than you can see on bottom panel.
		 * On bottom panel you can see this value multiplied by 20 (active paylines).
		 * @type {number[]}
		 */
		this.selectedBetPerLine = 0;
		/**
		 * Win amount after last spin.
		 * @type {number}
		 */
		this.lastWinValue = 0;
		/**
		 * Paylines configurations.
		 * @type {TypePaylineItem[]}
		 */
		this.paylinesData = [];
		/**
		 * List of paylines won during last spin.
		 * @type {TypeWonPayline[]}
		 */
		this.wonPaylines = [];
		/**
		 * List of free spins with results. Free spins already done by server, so client only need to show already prepaired results.
		 * @type {TypeFreeSpinData[]}
		 */
		this.freeSpinsData = [];
		/**
		 * Sorted paytable values for regular game. Used in paytable popups.
		 * @type {TypePaytableItem[]}
		 */
		this.regularPaytable = [];
		/**
		 * Sorted paytable values for free game. Used in paytable popups.
		 * @type {TypePaytableItem[]}
		 */
		this.featurePaytable = [];
		/**
		 * Bonus value got from last spin. It set to zero after bonus game was played or bonus popup was shown.
		 * @type {number}
		 */
		this.bonus = 0;
	};
	//#############################################################################################
	/**
	 * Returns list of symbols available in game.
	 * @public
	 * @returns {string[]}
	 */
	getSymbols() {
		return this.symbolsList;
	};
	//#############################################################################################
	/**
	 * Returns current player's balance.
	 * @public
	 * @returns {number}
	 */
	getBalance() {
		return this.balance;
	};
	//#############################################################################################
	/**
	 * Returns all posiible values of bets, available in bet switcher on bottom panel.
	 * @public
	 * @returns {number[]}
	 */
	getBetsValues() {
		return this.betsValues;
	};
	//#############################################################################################
	/**
	 * Returns bonus value got from last spin.
	 * @public 
	 * @returns {number}
	 */
	getBonus() {
		return this.bonus;
	}
	//#############################################################################################
	/**
	 * Returns current game reels configuration.
	 * @public
	 * @returns {string[][]}
	 */
	getGrid() {
		return this.currentGrid;
	};
	//#############################################################################################
	/**
	 * Returns amount of win during last spin.
	 * @public
	 * @returns {number}
	 */
	getLastWin() {
		return this.lastWinValue;
	}
	//#############################################################################################
	/**
	 * Returns paylines selected by user.
	 * @public
	 * @returns {number}
	 */
	getLines() { 
		return this.selectedLines;
	};
	//#############################################################################################
	/**
	 * Returns bet per payline selectd by user.
	 * @public
	 * @returns {number}
	 */
	getBetPerLine() {
		return this.selectedBetPerLine;
	};
	//#############################################################################################
	/**
	 * Returns paylines configuration.
	 * @public
	 * @returns {TypePaylineItem[]}
	 */
	getPaylines() {
		return this.paylinesData;
	};
	//#############################################################################################
	/**
	 * Returns paytable data for regular game.
	 * @public
	 * @returns {TypePaytableItem[]}
	 */
	getRegularPaytable() {
		return this.regularPaytable;
	};
	//#############################################################################################
	/**
	 * Returns paytable data for free game.
	 * @public
	 * @returns {TypePaytableItem[]}
	 */
	getFeaturePaytable() {
		return this.featurePaytable;
	}
	//#############################################################################################
	/**
	 * Returns information about paylines won during last spin.
	 * @public
	 * @returns {TypeWonPayline[]}
	 */
	getWonPaylines() {
		return this.wonPaylines;
	};
	//#############################################################################################
	/**
	 * Returns data for performing free games.
	 * @public
	 * @returns {TypeFreeSpinData[]}
	 */
	getFreeSpinsData() {
		return this.freeSpinsData;
	}
	//#############################################################################################
	/**
	 * Sets paylines selected by user.
	 * @public
	 * @param {number} value - number of selected paylines.
	 */
	setLines(value) {
		this.selectedLines = value;
	};
	//#############################################################################################
	/**
	 * Sets bet per line value. Value need to be one of the values from betsValues.
	 * @public
	 * @param {number} value - bet per payline.
	 */
	setBetPerLine(value) {
		this.selectedBetPerLine = value;
	};
	//#############################################################################################
	/**
	 * Sets new value of player's balance.
	 * @public
	 * @param {number} newBalance - new balance value.
	 */
	setBalance(newBalance) {
		this.balance = newBalance.toFixed(2);
	};
	//#############################################################################################
	/**
	 * Sets list of possible bets per payline values. Normally sets only once during game initialization.
	 * @public
	 * @param {number[]} newValues - values of possible bets per payline.
	 */
	setBetsValues(newValues) {
		this.betsValues = newValues;
	};
	//#############################################################################################
	/**
	 * Sets bonus value that was won during last spin.
	 * 
	 * @param {number} value - bonus amount won with last spin.
	 */
	setBonus(value) {
		this.bonus = value;
	};
	//#############################################################################################
	/**
	 * Sets reels symbols after last spin.
	 * @public
	 * @param {string[][]} value - current reels configuration
	 */
	setGrid(value) {
		this.currentGrid = value;
	};
	//#############################################################################################
	/**
	 * Sets last win amount.
	 * @public
	 * @param {number} value - amount of money won on last spin.
	 */
	setLastWin(value) {
		this.lastWinValue = value;
	};
	//#############################################################################################
	/**
	 * Sets payline information that came from server.
	 * @public
	 * @param {TypePaylineItem[]} values - information about game paylines.
	 */
	setPaylines(values) {
		this.paylinesData = values;
		this.setLines(this.paylinesData.length);
	};
	//#############################################################################################
	/**
	 * Sets paylines that won during last spin.
	 * @public
	 * @param {TypeWonPayline[]} values - information about won paylines.
	 */
	setWonPaylines(values) {
		this.wonPaylines = values;
	};
	//#############################################################################################
	/**
	 * Sets information about free spins.
	 * @public
	 * @param {TypeFreeSpinData[]} data - information about free spins.
	 */
	setFreeSpinsData(data) {
		console.log("FREE SPINS DATA:", data);
		this.freeSpinsData = data;
	};
	//#############################################################################################
	/**
	 * Create and sort paytable data for regular and free game, based on data came from server.
	 * @public.
	 * @param {Object} data - paytable data from server.
	 */
	setPaytable(data) {
		let regular = data["Regular"];
		let feature = data["Feature"];
		this.sortPaytable(this.regularPaytable, regular);
		this.sortPaytable(this.featurePaytable, feature);
	};
	//#############################################################################################
	/**
	 * Fill and sort paytable items array. Format is differ than on the server because client need to use sorted list, to show
	 * in paytable popups.
	 * @private
	 * @param {TypePaytableItem[]} list - sorted list of paytable items.
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