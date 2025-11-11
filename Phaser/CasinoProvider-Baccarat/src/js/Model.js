class Model {
    /**
* Create class instance and fill params from URL or fill it with default values if URL not contain needed data.
* @constructs
*/
    constructor() {
        this.balance = null;
        this.minBet = null;
        this.maxBet = null;
        this.betsValues = null;
        this.playerActions = null;
        this.dealerActions = null;
        this.cardsArray = null;
        this.winningHistoryArray = [];

    }
    SetBalance(_amount) {
        this.balance = _amount;
    }

    GetBalance() {
        return this.balance;
    }

    SetMinBet(_minBet) {
        this.minBet = _minBet;
    }

    GetMinBet() {
        return this.minBet;
    }

    SetMaxBet(_maxBet) {
        this.maxBet = _maxBet;
    }

    GetMaxBet() {
        return this.maxBet;
    }

    SetBetsValues(_betsValues) {
        this.betsValues = _betsValues;
    }

    GetBetsValues() {
        return this.betsValues;
    }
    SetPlayerActions(_playerActions) {
        this.playerActions = _playerActions;
    }
    GetPlayerActions() {
        return this.playerActions;
    }
    SetDealerActions(_dealerAction) {
        this.dealerActions = _dealerAction;
    }
    GetDealerActions() {
        return this.dealerActions;
    }
    SetCardsArray(_cardsArray) {
        this.cardsArray = _cardsArray;
    }
    GetCardsArray() {
        return this.cardsArray;
    }
    SetWinningHistory(winningHistoryValues) {
        this.winningHistoryArray.unshift(winningHistoryValues);
    }
    GetWinningHistory() {
        return this.winningHistoryArray;
    }

}
let model = new Model()
export { model as Model };