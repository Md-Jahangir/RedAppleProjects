// import Phaser from 'phaser';
import Background from "./ui/Background.js";
import GameUI from './ui/GameUI.js';
import { Server } from "./Server.js";
import { Model } from "./Model.js";
import JackpotWin from "./popups/JackpotWin.js";
import { Constant } from "./Constant.js";
import { SoundManager } from "./SoundManager.js";

export default class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
        this.background = null;
        this.gameUi = null;
        this.lastAction = null;
        this.dealerCards = null;
        this.playerCards = null;
        this.resultPopup = null;
        this.isFirstPlay = true;
        this.playerHandValue = null;
        this.winnerResult = null;
    }
    init() {

    }
    preload() {

    }

    create() {
        this.background = new Background(this);
        this.gameUi = new GameUI(this);
        this.resultPopup = new JackpotWin(this);
        SoundManager.PlayGameBgSound();
        this.background.create();
        this.gameUi.create();
        this.resultPopup.create();
        this.GameReset();
        Constant.game.events.on('evtRoundEnd', this.RoundComplete, this);
        Constant.game.events.on('evtShowResultDone', this.EnableRebetAndNew, this)
    }
    async GameReset() {
        await Server.Reset(this.isFirstPlay);

    }

    async GetInitialCardsFromServer() {
        this.DebitBalance();
        await Server.ShuffleDeck(Model.GetBalance(), this.gameUi.betCoins.totalbetPlacedFiche);
        let getFirstPlayerCard = await Server.GetPlayerCardAuto();
        if (getFirstPlayerCard.result.status == 200) {
            this.ShowGameCards(getFirstPlayerCard.result.result, 'playerCard', 200);
            let getFirstDealerCard = await Server.GetDealerCardAuto();
            this.gameUi.gameCards.SetHandValueText(getFirstDealerCard.result.result.cardValue, 'dealerCard');
            if (getFirstDealerCard.result.status == 200) {
                this.ShowGameCards(getFirstDealerCard.result.result, 'dealerCard', 400);
                let getSecondPlayerCard = await Server.GetPlayerCardAuto();
                if (getSecondPlayerCard.result.status == 200) {
                    this.ShowGameCards(getSecondPlayerCard.result.result, 'playerCard', 600);
                    let getSecondDealerrCard = await Server.GetDealerCardAuto();
                    if (getSecondDealerrCard.result.status == 200) {
                        this.ShowGameCards(getSecondDealerrCard.result.result, 'dealerCard', 800);
                        setTimeout(() => {
                            this.CheckInitialPlayerActions();
                        }, 1000);
                    }
                }
            }
        }

    }

    ShowGameCards(cardData, cardInitiator, _timeOut) {
        this.gameUi.betCoins.DisableChips();
        this.gameUi.gameCards.ShowCardsAndPoints();
        this.gameUi.betCoins.ShowBetPlaceValue();
        this.gameUi.gameCards.CreateCards(cardData, cardInitiator, _timeOut);
    }
    async CheckInitialPlayerActions() {
        this.action = await Server.CheckAvailablePlayerActions();
        Model.SetPlayerActions(this.action.result.result);
        let getPlayerActions = Model.GetPlayerActions();

        if (getPlayerActions) {
            if (!getPlayerActions.passTurn) {
                this.gameUi.gameCards.SetHandValueText(getPlayerActions.handValue, 'playerCard');
                this.gameUi.userSignals.EnableHit();
                this.gameUi.userSignals.EnableStand();
            }
            if (getPlayerActions.handValue) {
                this.gameUi.gameCards.SetHandValueText(getPlayerActions.handValue, 'playerCard');
                this.playerHandValue = getPlayerActions.handValue;
            }
            if (getPlayerActions.needActivateDouble) {
                this.gameUi.userSignals.EnableDouble();
            }
            if (getPlayerActions.isLose) {
                this.isFirstPlay = false;
                this.winnerResult = 'dealerWin';
                // this.RestartGame();
                this.GameReset();
            }
            if (getPlayerActions.passTurn) {
                this.gameUi.gameCards.SetBackCardFrameOfDealer();
                this.GetStandFromServer();
            }
        }

    }
    CheckPlayerActions() {
        let getPlayerActions = Model.GetPlayerActions();

        if (getPlayerActions.isLose) {
            this.isFirstPlay = false;
            this.winnerResult = 'dealerWin';
            this.GameReset();
            this.ShowResult(this.winnerResult);
        }
        if (getPlayerActions.handValue) {
            this.gameUi.gameCards.SetHandValueText(getPlayerActions.handValue, 'playerCard');
            this.playerHandValue = getPlayerActions.handValue;
        }
        if (getPlayerActions.isRestore) {

            this.gameUi.userSignals.EnableHit();
            this.gameUi.userSignals.EnableStand();
        }
        if (getPlayerActions.isActivateDouble) {
            this.gameUi.userSignals.EnableDouble();
        }
        if (getPlayerActions.isPassTurn && !getPlayerActions.isLose) {
            this.gameUi.gameCards.SetBackCardFrameOfDealer();
            this.GetStandFromServer();
        }
    }
    CheckDealerActions() {
        let getDealerActions = Model.GetDealerActions();
        if (getDealerActions.isPlayerWin) {
            this.isFirstPlay = false;
            this.winnerResult = 'playerWin';
            this.GameReset();
            this.CreditBalance(this.playerHandValue);
            this.ShowResult(this.winnerResult);
        }
        if (getDealerActions.isDealerWin) {
            this.isFirstPlay = false;
            this.winnerResult = 'dealerWin';
            this.gameUi.gameCards.SetBackCardFrameOfDealer();
            this.GameReset();
            this.ShowResult(this.winnerResult);
        }
        if (getDealerActions.isStandoff) {
            this.isFirstPlay = false;
            this.winnerResult = 'tieWin';
            this.GameReset();
            this.ShowResult(this.winnerResult);
        }
        if (getDealerActions.handValue) {

        }
        if (getDealerActions.card != -1 && getDealerActions.cardValue != -1) {

            let cardJson = { card: getDealerActions.card, cardValue: getDealerActions.cardValue };
            this.gameUi.gameCards.SetBackCardFrameOfDealer();
            this.ShowGameCards(cardJson, ' dealerCard');
            this.gameUi.userSignals.GetCardForDealer();
            this.gameUi.gameCards.SetHandValueText(getDealerActions.cardValue, 'dealerCard');
        } else {
            this.gameUi.gameCards.SetHandValueText(getDealerActions.handValue, 'dealerCard');
        }

    }
    async GetHitFromServer() {

        let getPLayerCard = await Server.GetPlayerCard();     ///#########-------------Get Player Cards on Hit From Server-----------------
        if (getPLayerCard.result.status == 200) {
            this.ShowGameCards(getPLayerCard.result.result, 'playerCard')
            let checkPlayerHand = await Server.CheckPlayerHand();

            Model.SetPlayerActions(checkPlayerHand.result.result);
            this.CheckPlayerActions();
        }

    }

    async GetStandFromServer() {
        let getStand = await Server.GetStand();
        if (getStand.result.status == 200) {
            let dealerHand = await Server.CheckDealerHand();    ///#########-------------Get Dealer Cards on Stand  From Server-----------------
            if (dealerHand.result.status == 200) {
                Model.SetDealerActions(dealerHand.result.result);
                this.CheckDealerActions();
            }
        }
    }
    async CreditBalance(handValue) {
        let amount = null;
        if (handValue == 21) {
            amount = this.gameUi.betCoins.totalbetPlacedFiche * 3;
        } else {
            amount = this.gameUi.betCoins.totalbetPlacedFiche * 2;
        }
        let creditBalance = await Server.CreditBalance(amount);
        let newBalance = (parseFloat(Model.GetBalance()) + amount).toFixed(2);
        this.gameUi.SetBalanceText(newBalance);
    }

    async DebitBalance() {
        let debitBalance = await Server.DebitBalance(this.gameUi.betCoins.totalbetPlacedFiche);
        let balanceUpdated = parseFloat(Model.GetBalance()) - this.gameUi.betCoins.totalbetPlacedFiche;
        this.gameUi.SetBalanceText(balanceUpdated);
        Model.SetBalance(balanceUpdated);
    }
    RestartGame() {
        this.gameUi.gameCards.DestroyCards();
        this.gameUi.betCoins.betPlacedFiche = 0;
    }
    RemoveCardsAndFiches() {
        this.gameUi.betCoins.totalbetPlacedFiche = 0;
        this.gameUi.betCoins.betCounter = 0;
        this.gameUi.gameCards.DestroyCards('new_signal');
        this.gameUi.gameCards.SetHandValueText('', 'playerCard');
        this.gameUi.gameCards.SetHandValueText('', 'dealerCard');
        this.gameUi.betCoins.RemoveTextureAndAmountOfPlacedFiches();
    }
    RemoveCards() {
        this.gameUi.gameCards.DestroyCards('rebet_signal');
        this.gameUi.gameCards.SetHandValueText('', 'playerCard');
        this.gameUi.gameCards.SetHandValueText('', 'dealerCard');
    }
    ShowResult() {

        if (this.winnerResult == 'dealerWin') {
            setTimeout(() => {

                this.resultPopup.ShowLoosePopup();
                this.winnerResult = null;
            }, 1200);
        } else if (this.winnerResult == 'tieWin') {
            setTimeout(() => {
                this.resultPopup.ShowTiePopup();
                this.winnerResult = null;
            }, 1200);
        } else {
            if (this.playerHandValue == 21) {
                setTimeout(() => {
                    this.resultPopup.ShowBlackJackPopup();
                    this.winnerResult = null;
                }, 1200);
            } else {
                setTimeout(() => {
                    this.resultPopup.ShowWinPopup();
                    this.winnerResult = null;
                }, 1200);
            }
        }

    }
    EnableRebetAndNew() {
        this.gameUi.DisableBetPlaceBg();
        this.gameUi.userSignals.EnableRebet();
        this.gameUi.userSignals.EnableNew();
        this.gameUi.userSignals.DisableRequestsSignals();
    }
    RoundComplete() {
        this.gameUi.gameCards.SetHandValueText('', 'playerCard');
        this.gameUi.gameCards.SetHandValueText('', 'dealerCard');
        this.gameUi.betCoins.betCounter = 0;
        // this.GetInitialCardsFromServer();

    }
}