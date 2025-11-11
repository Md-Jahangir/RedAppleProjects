import { Constant } from "../Constant";
import { LanguageService } from "../LanguageService.js";
import { Model } from "../Model.js";
import { Server } from "../Server.js";
import Button from "./Button.js";
import Text from "./Text.js";
import { SoundManager } from "../SoundManager.js";
class Signals {
    constructor(scene) {
        this.scene = scene;
        this.signalContainer = null;
        this.dealSignal = null;
        this.clearSignal = null;
        this.rebetSignal = null;
        this.create();
    }
    create() {
        this.signalContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.NewSignal();
        this.DealSignal();
        this.RebetSignal();
        this.ClearSignal();
        this.InitSignalsState();
        // Constant.game.events.on('evtEnableDeal', this.EnableDeal, this);
    }
    DealSignal() {
        this.dealSignal = new Button(this.scene, 800, 475, 'but_deal', 'DEAL', 45);
        this.signalContainer.add([this.dealSignal.disabledBtn, this.dealSignal.normalBtn, this.dealSignal.buttonText]);
        this.dealSignal.normalBtn.on('pointerover', () => this.dealSignal.ButtonOver(this.dealSignal.normalBtn, this.dealSignal.buttonText), this);
        this.dealSignal.normalBtn.on('pointerout', () => this.dealSignal.ButtonOut(this.dealSignal.normalBtn, this.dealSignal.buttonText), this);
    }
    RebetSignal() {
        this.rebetSignal = new Button(this.scene, 550, 475, 'but_rebet', 'REBET', 55);
        this.signalContainer.add([this.rebetSignal.disabledBtn, this.rebetSignal.normalBtn, this.rebetSignal.buttonText]);
        this.rebetSignal.normalBtn.on('pointerover', () => this.rebetSignal.ButtonOver(this.rebetSignal.normalBtn, this.rebetSignal.buttonText), this);
        this.rebetSignal.normalBtn.on('pointerout', () => this.rebetSignal.ButtonOut(this.rebetSignal.normalBtn, this.rebetSignal.buttonText), this);
    }
    ClearSignal() {
        this.clearSignal = new Button(this.scene, -800, 475, 'but_clear', 'CLEAR', 60);
        this.signalContainer.add([this.clearSignal.disabledBtn, this.clearSignal.normalBtn, this.clearSignal.buttonText]);
        this.clearSignal.normalBtn.on('pointerover', () => this.clearSignal.ButtonOver(this.clearSignal.normalBtn, this.clearSignal.buttonText), this);
        this.clearSignal.normalBtn.on('pointerout', () => this.clearSignal.ButtonOut(this.clearSignal.normalBtn, this.clearSignal.buttonText), this);
    }

    NewSignal() {
        this.newSignal = new Button(this.scene, 800, 475, 'but_new', 'NEW', 45);
        this.signalContainer.add([this.newSignal.disabledBtn, this.newSignal.normalBtn, this.newSignal.buttonText]);
        this.newSignal.HideButton(this.newSignal.normalBtn);
        this.newSignal.normalBtn.on('pointerover', () => this.newSignal.ButtonOver(this.newSignal.normalBtn, this.newSignal.buttonText), this);
        this.newSignal.normalBtn.on('pointerout', () => this.newSignal.ButtonOut(this.newSignal.normalBtn, this.newSignal.buttonText), this);
    }
    InitSignalsState(){
        this.dealSignal.DisableButton();
        this.rebetSignal.DisableButton();
        this.clearSignal.DisableButton();
        this.newSignal.DisableButton();
    }
    
    
    async GetCardsFromServer() {
        this.dealSignal.DisableButton();
        this.scene.gameUi.betCoins.DisableHittingArea();
        await Server.Reset();
        let shuffleDeck = await Server.ShuffleDeck();
        if (shuffleDeck.result.status == 200) {
            Model.SetCardsArray(shuffleDeck.result.result);
            this.scene.GetInitialCardsFromServer();
        }
    }
    EnableNewSignal() {
        this.dealSignal.HideButton(this.dealSignal.normalBtn)
        this.newSignal.ShowButton(this.newSignal.normalBtn);
        this.newSignal.EnableButton();
        this.newSignal.normalBtn.removeAllListeners('pointerdown');
        this.newSignal.normalBtn.removeAllListeners('pointerup');
        this.newSignal.normalBtn.on('pointerdown', () => {
            // this.DisableRebet();
        })
        this.newSignal.normalBtn.on('pointerup', () => {
            this.scene.RemoveCardsAndBetCoins();
            // this.scene.gameUi.betCoins.EnableHittingArea();
            this.scene.gameUi.betCoins.EnableChips();
            SoundManager.PlaySignalButtonSound();
            this.InitSignalsState();
        })
    }
    EnableDeal() {
        this.newSignal.HideButton(this.newSignal.normalBtn)
        this.dealSignal.ShowButton(this.dealSignal.normalBtn);
        this.dealSignal.EnableButton();
        this.dealSignal.normalBtn.removeAllListeners('pointerdown');
        this.dealSignal.normalBtn.removeAllListeners('pointerup');
        this.dealSignal.normalBtn.on('pointerdown', () => {
            SoundManager.PlaySignalButtonSound();
            let minBet = Model.GetMinBet();
            if (this.scene.gameUi.betCoins.totalBetPlaceOnPlayer > minBet || this.scene.gameUi.betCoins.totalBetPlaceOnBanker > minBet || this.scene.gameUi.betCoins.totalBetPlaceOnTie > minBet) {
                this.DisableSignals();
                this.GetCardsFromServer();
            }

        })
        this.dealSignal.normalBtn.on('pointerup', () => {
        })
    }
    EnableClear() {
        this.clearSignal.EnableButton();
        this.clearSignal.normalBtn.removeAllListeners('pointerdown');
        this.clearSignal.normalBtn.removeAllListeners('pointerup');
        this.clearSignal.normalBtn.on('pointerdown', () => {
            SoundManager.PlaySignalButtonSound();
            this.scene.gameUi.betCoins.EnableChips();
            this.DisableRebet();
            if (this.scene.gameUi.gameCards.dealerCardArray.length > 0) {
                this.scene.RemoveCards();
            }
            this.scene.gameUi.betCoins.DisableHittingArea();
            this.scene.gameUi.betCoins.ResetBetCoins();
        })
        this.clearSignal.normalBtn.on('pointerup', () => {
            // this.scene.gameUi.betCoins.ResetBetCoins();
        })

    }
    EnableRebet() {
        this.rebetSignal.EnableButton();
        this.rebetSignal.normalBtn.removeAllListeners('pointerdown');
        this.rebetSignal.normalBtn.removeAllListeners('pointerup');
        this.rebetSignal.normalBtn.on('pointerdown', async () => {
            SoundManager.PlaySignalButtonSound();
            this.scene.RemoveCards();
            this.DisableSignals();
            this.scene.gameUi.betCoins.DisableHittingArea();
            await Server.Reset();
            setTimeout(() => {
                let minBet = Model.GetMinBet();
                if (this.scene.gameUi.betCoins.totalBetPlaceOnPlayer > minBet || this.scene.gameUi.betCoins.totalBetPlaceOnBanker > minBet || this.scene.gameUi.betCoins.totalBetPlaceOnTie > minBet) {
                    this.scene.GetInitialCardsFromServer();
                }
            }, 1000);

        })
        this.rebetSignal.normalBtn.on('pointerup', async () => {
            
        })

    }
    DisableRebet() {
        this.rebetSignal.DisableButton();
    }
    DisableSignals() {
        this.rebetSignal.DisableButton();
        this.clearSignal.DisableButton();
        this.dealSignal.DisableButton();
    }
    EnableSIgnals() {
        this.rebetSignal.EnableButton();
        this.clearSignal.EnableButton();
        this.dealSignal.EnableButton();
    }


}
export default Signals;