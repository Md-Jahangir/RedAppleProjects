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
    }
    SetCurrency(_currency) {
        this.currency = _currency;
    }
    GetCurrency(_currency) {
        return this.currency;
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
}
let model = new Model()
export { model as Model };