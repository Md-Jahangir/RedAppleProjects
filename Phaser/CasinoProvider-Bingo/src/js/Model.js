import { Server } from "./Server";
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
        // this.SetBetsValues();
        // this.SetPaytableValues([100, 50, 5]);
        // this.SetCurrency(Server.currency);
    }
    SetCurrency(_currency) {
        this.currency = _currency;
    }
    GetCurrency() {
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
        console.log('this.betsValues', this.betsValues);
        return this.betsValues;
    }
    SetPaytableValues(paytableValues) {
        this.paytableValues = paytableValues;
    }

    GetPaytableValues() {
        return this.paytableValues;
    }
    SetCurrentBet(_currentBet) {
        this.currentBet = _currentBet;
    }
    GetCurrentBet() {
        return this.currentBet;
    }
    SetSelectedCards(selectedCard) {
        this.selectedCard = selectedCard;
    }
    GetSelectedCards() {
        return this.selectedCard;
    }
    SetNumbersToDraw(_numbersToDraw) {
        this.numbersToDraw = _numbersToDraw;
    }
    GetNumbersToDraw() {
        return this.numbersToDraw;
    }
    SetTotalBet(_totalBet) {
        this.totalBet = _totalBet;
    }
    GetTotalBet() {
        return this.totalBet;
    }


}
let model = new Model()
export { model as Model };