// import Phaser from 'phaser';
import Background from "./ui/Background.js";
import GameUI from './ui/GameUI.js';
import { Server } from "./Server.js";
import { Model } from "./Model.js";
import JackpotWin from "./popups/JackpotWin.js";
import { Constant } from "./Constant.js";
import { Utils } from "./Utils.js";
import WarningPopup from "./popups/WarningPopup.js";
import { SoundManager } from "./SoundManager.js";
// import InfoPopup from "./popups/InfoPopup.js";

export default class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
        this.background = null;
        this.gameUi = null;
        this.lastAction = null;
        this.dealerCards = null;
        this.playerCards = null;
        this.resultPopup = null;
        this.warningPopup = null;
        this.isFirstPlay = true;
        this.playerHandValue = 0;
        this.bankerHandValue = 0;
        this.winnerResult = null;
        this.playerThirdCard = null;
        this.playerThirdCardHandValue = null;
    }
    init() {
        this.background = new Background(this);
        this.gameUi = new GameUI(this);
        this.resultPopup = new JackpotWin(this);
        this.warningPopup = new WarningPopup(this);
    }
    preload() {

    }

    create() {
        this.input.setDefaultCursor('url(assets/images/custom_cursor.png), pointer');
        this.background.create();
        this.gameUi.create();
        this.resultPopup.create();
        // SoundManager.PlayGameBgMusic();
        Constant.game.events.on('evtRestartGame', this.RoundComplete, this);
    }
    async GameReset() {
        await Server.Reset();
    }

    async GetInitialCardsFromServer() {
        this.DebitBalance();
        this.isFirstPlay = false;
        this.gameUi.gameCards.ShowCardsAndPoints();

        let getCardsFromModel = Model.GetCardsArray();

        let getFirstPlayerCard = getCardsFromModel[Utils.GetRandomNumber(0, 52)];
        this.ShowGameCards(getFirstPlayerCard, 'player');
        this.GetHandValue(getFirstPlayerCard, 'player', 0);

        setTimeout(() => {
            let getFirstDealerCard = getCardsFromModel[Utils.GetRandomNumber(0, 52)];
            this.ShowGameCards(getFirstDealerCard, 'banker');
            this.GetHandValue(getFirstDealerCard, 'banker', 0);
        }, 300);

        setTimeout(() => {
            let getSecondPlayerCard = getCardsFromModel[Utils.GetRandomNumber(0, 52)];
            this.ShowGameCards(getSecondPlayerCard, 'player');
            this.GetHandValue(getSecondPlayerCard, 'player', 1);
        }, 600);

        setTimeout(() => {
            let getSecondDealerCard = getCardsFromModel[Utils.GetRandomNumber(0, 52)];
            this.ShowGameCards(getSecondDealerCard, 'banker');
            this.GetHandValue(getSecondDealerCard, 'banker', 1);
        }, 900);
    }
    GetHandValue(_handValue, handType, cardIndex) {
        let handValue = null;
        Utils.cardsDataJson.forEach(element => {
            if (element.card == _handValue) {
                handValue = element.value;
            }
        });
        if (handType == 'player' && cardIndex == 2) {
            this.playerThirdCardHandValue = handValue;
        }
        if (handType == 'player') {
            this.playerHandValue += handValue;
        } else {
            this.bankerHandValue += handValue;
        }
        //==========================If either the "Player" or the "Banker" hand has a total of 8 or 9 from the first two cards, it is called a "natural" and no more cards are drawn.
        if (this.playerHandValue >= 10) {
            this.playerHandValue -= 10;
        }
        else if (this.playerHandValue >= 20) {
            this.playerHandValue -= 20;
        }
        else if (this.bankerHandValue >= 10) {
            this.bankerHandValue -= 10;
        }
        else if (this.bankerHandValue >= 20) {
            this.bankerHandValue -= 20;
        }
        if (handType == 'player') {
            this.gameUi.gameCards.SetHandValue(this.playerHandValue, handType);
        } else {
            this.gameUi.gameCards.SetHandValue(this.bankerHandValue, handType);
        }
        if (cardIndex == 1 && handType == 'player' && (this.playerHandValue >= 0 && this.playerHandValue < 6)) {

            this.DrawThirdPlayerCard();
        }
        else if (cardIndex == 1 && handType == 'banker' && (this.bankerHandValue >= 0 && this.bankerHandValue < 3)) {
            this.DrawThirdBankerCard();
        }
        else if (cardIndex == 1 && handType == 'banker' && (this.bankerHandValue >= 3 && this.bankerHandValue < 6)) {
            // 
            if (this.bankerHandValue == 3 && this.playerThirdCardHandValue != 8) {
                // Random Draw third card
                this.DrawThirdBankerCard();
            }
            else if (this.bankerHandValue == 4 && this.playerThirdCardHandValue >= 2 && this.playerThirdCardHandValue < 8) {
                // Draws third card if player's third card is 2-7
                this.DrawThirdBankerCard();
            }
            else if (this.bankerHandValue == 5 && this.playerThirdCardHandValue >= 4 && this.playerThirdCardHandValue < 8) {
                // Draws third card if player's third card is 4-7
                this.DrawThirdBankerCard();
            }
            else if (this.bankerHandValue == 6 && this.playerThirdCardHandValue >= 6 && this.playerThirdCardHandValue < 8) {
                // Draws third card if player's third card is 6-7
                this.DrawThirdBankerCard();
            }
        }
        if (cardIndex == 1 && handType == 'banker') {
            setTimeout(() => {
                this.CheckDrawCompletion();
            }, 1500);

        }
    }

    DrawThirdPlayerCard() {
        setTimeout(() => {
            let getCardsFromModel = Model.GetCardsArray();
            this.playerThirdCard = getCardsFromModel[Utils.GetRandomNumber(0, 52)];
            this.ShowGameCards(this.playerThirdCard, 'player');
            this.GetHandValue(this.playerThirdCard, 'player', 2);
        }, 600);

    }
    DrawThirdBankerCard() {
        setTimeout(() => {
            let getCardsFromModel = Model.GetCardsArray();
            let getSecondDealerCard = getCardsFromModel[Utils.GetRandomNumber(0, 52)];
            this.ShowGameCards(getSecondDealerCard, 'banker');
            this.GetHandValue(getSecondDealerCard, 'banker', 2);
        }, 600)
    }

    ShowGameCards(cardData, cardInitiator) {
        this.gameUi.betCoins.DisableChips();
        this.gameUi.gameCards.CreateCards(cardData, cardInitiator);
    }


    CheckDrawCompletion(cardIndex) {
        Model.SetWinningHistory({ player: this.playerHandValue, banker: this.bankerHandValue });
        this.gameUi.SetDataOfWinningHistory(Model.GetWinningHistory());
        if (this.playerHandValue > this.bankerHandValue) {
            this.CheckAmountPlaced(this.gameUi.betCoins.totalBetPlaceOnPlayer, this.gameUi.betCoins.totalBetPlaceOnBanker, this.gameUi.betCoins.totalBetPlaceOnTie, 'playerWin');
        }
        else if (this.playerHandValue < this.bankerHandValue) {
            this.CheckAmountPlaced(this.gameUi.betCoins.totalBetPlaceOnBanker, this.gameUi.betCoins.totalBetPlaceOnPlayer, this.gameUi.betCoins.totalBetPlaceOnTie, 'bankerWin');
        }
        else if (this.playerHandValue == this.bankerHandValue) {
            this.CheckAmountPlaced(this.gameUi.betCoins.totalBetPlaceOnBanker, this.gameUi.betCoins.totalBetPlaceOnPlayer, this.gameUi.betCoins.totalBetPlaceOnTie, 'tieWin');
        }

    }
    CheckAmountPlaced(betOnPlayer, betOnBanker, betOnTie, finalWins) {
        if (finalWins == 'tieWin') {
            this.CreditBalance(betOnPlayer, 'singleTimes');
            this.CreditBalance(betOnBanker, 'singleTimes');
            this.CreditBalance(betOnTie, 'eightTimes');
            this.resultPopup.ShowWinnerPopup('tie_win');
        }else if ((betOnPlayer != null || betOnPlayer != undefined) && betOnPlayer > betOnBanker && betOnPlayer > betOnTie && finalWins != 'tieWin') {
            if (finalWins == 'bankerWin') {
                this.CreditBalance(betOnBanker, 'lessDouble');
                this.resultPopup.ShowWinnerPopup('banker_win');
            } else if (finalWins == 'playerWin') {
                this.CreditBalance(betOnPlayer, 'doubleTimes')
                this.resultPopup.ShowWinnerPopup('player_win');
            }
        } else if ((betOnTie != null || betOnTie != undefined) && betOnTie > betOnBanker && betOnTie > betOnPlayer) {
            if (finalWins == 'bankerWin') {
                this.CreditBalance(betOnBanker, 'lessDouble');
                this.resultPopup.ShowWinnerPopup('banker_win');
            } else if (finalWins == 'playerWin') {
                this.CreditBalance(betOnPlayer, 'doubleTimes');
                this.resultPopup.ShowWinnerPopup('player_win');
            }
        }
        else {
            if (finalWins != 'tieWin') {
                if (this.gameUi.betCoins.totalBetPlaceOnPlayer > this.gameUi.betCoins.totalBetPlaceOnBanker) {
                    this.resultPopup.ShowLooserPopup('player_loose');
                }
                else if (this.gameUi.betCoins.totalBetPlaceOnPlayer < this.gameUi.betCoins.totalBetPlaceOnBanker) {
                    this.resultPopup.ShowLooserPopup('banker_loose');
                } else {
                    if (finalWins == 'bankerWin') {
                        this.CreditBalance(betOnBanker, 'lessDouble');
                        this.resultPopup.ShowWinnerPopup('banker_win');
                    } else if (finalWins == 'playerWin') {
                        this.CreditBalance(betOnPlayer, 'doubleTimes');
                        this.resultPopup.ShowWinnerPopup('player_win');
                    }
                }
            }
        }


    }
    async DebitBalance() {
        let totalAmountPlaced = this.gameUi.betCoins.totalBetPlaceOnBanker + this.gameUi.betCoins.totalBetPlaceOnPlayer + this.gameUi.betCoins.totalBetPlaceOnTie;
        let debitBalance = await Server.DebitBalance(totalAmountPlaced);
        let balanceUpdated = parseFloat(Model.GetBalance()) - totalAmountPlaced;
        Model.SetBalance(balanceUpdated);
        this.gameUi.SetBalanceText(balanceUpdated);
    }
    async CreditBalance(amount, multiplier) {
        let totalAmountWin = null;
        if (multiplier == 'lessDouble') {
            totalAmountWin = amount * 1.95;
        }
        if (multiplier == 'doubleTimes') {
            totalAmountWin = amount * 2;
        }
        if (multiplier == 'singleTimes') {
            totalAmountWin = amount * 1;
        }
        if (multiplier == 'eightTimes') {
            totalAmountWin = amount * 8;
        }
        let creditBalance = await Server.CreditBalance(totalAmountWin);
        let newBalance = (parseFloat(Model.GetBalance()) + totalAmountWin).toFixed(2);
        Model.SetBalance(newBalance);
        this.gameUi.SetBalanceText(newBalance);
    }
    RemoveCards() {
        this.playerHandValue = 0;
        this.bankerHandValue = 0;
        this.gameUi.gameCards.HideCardsAndPoints();
        this.gameUi.gameCards.SetHandValueText('', 'player');
        this.gameUi.gameCards.SetHandValueText('', 'banker');
        this.gameUi.gameCards.MoveCardsToCloseDeck();
    }
    RemoveCardsAndBetCoins() {
        this.playerHandValue = 0;
        this.bankerHandValue = 0;
        this.gameUi.betCoins.ResetBetCoins();
        this.gameUi.betCoins.RemoveBetCoins('player');
        this.gameUi.betCoins.RemoveBetCoins('banker');
        this.gameUi.betCoins.RemoveBetCoins('tie');
        this.gameUi.betCoins.DisableHittingArea();
        this.gameUi.gameCards.MoveCardsToCloseDeck();
        this.gameUi.userSignals.DisableSignals();
        this.gameUi.gameCards.HideCardsAndPoints();
        this.gameUi.betCoins.totalbetPlacedFiche = 0;
    }
    RoundComplete() {
        this.gameUi.betCoins.selectedFiche = null;
        this.gameUi.betCoins.selectedFicheObj = null;
        this.gameUi.userSignals.EnableRebet();
        this.gameUi.userSignals.EnableClear();
        this.gameUi.userSignals.EnableNewSignal();
        this.gameUi.betCoins.DisableChips();
    }
}