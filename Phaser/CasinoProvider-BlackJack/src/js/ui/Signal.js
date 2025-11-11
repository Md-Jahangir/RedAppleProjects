import { Constant } from "../Constant";
import { LanguageService } from "../LanguageService.js";
import { Model } from "../Model.js";
import { Server } from "../Server.js";
import { SoundManager } from "../SoundManager.js";
import Button from "./Button.js";
import Text from "./Text.js";
class Signals {
    constructor(scene) {
        this.scene = scene;
        this.signalContainer = null;
        this.doubleSignal = null;
        this.dealSignal = null;
        this.splitSignal = null;
        this.hitSignal = null;
        this.rebetSignal = null;
        this.standSignal = null;

        this.create();
    }
    create() {
        this.signalContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.DoubleSignal();
        this.DealSignal();
        this.SplitSignal();
        this.HitSignal();
        this.RebetSignal();
        this.StandSignal();
        this.NewSignal();
        this.DisablePlayerSignals();
    }
    DoubleSignal() {
        let fontStyle = { fontFamily: 'LuckiestGuy-Regular', fontSize: '35px', fill: '#FFF', fontStyle: "normal", align: 'center' };
        this.doubleSignal = new Button(this.scene, -800, 475, 'button_double', LanguageService.getString('textDouble'), fontStyle);
        this.signalContainer.add([this.doubleSignal.buttonImg, this.doubleSignal.gameText]);
    }
    DealSignal() {
        let fontStyle = { fontFamily: 'LuckiestGuy-Regular', fontSize: '35px', fill: '#FFF', fontStyle: "normal", align: 'center' };
        this.dealSignal = new Button(this.scene, -525, 475, 'button_deal', LanguageService.getString('textDeal'), fontStyle);
        this.dealSignal.SetClickCallback(this.OnDealClick, this);
        this.signalContainer.add([this.dealSignal.buttonImg, this.dealSignal.gameText]);
    }
    SplitSignal() {
        let fontStyle = { fontFamily: 'LuckiestGuy-Regular', fontSize: '35px', fill: '#FFF', fontStyle: "normal", align: 'center' };
        this.splitSignal = new Button(this.scene, -250, 475, 'button_split', LanguageService.getString('textSplit'), fontStyle);
        this.signalContainer.add([this.splitSignal.buttonImg, this.splitSignal.gameText]);
    }
    HitSignal() {
        let fontStyle = { fontFamily: 'LuckiestGuy-Regular', fontSize: '35px', fill: '#FFF', fontStyle: "normal", align: 'center' };
        this.hitSignal = new Button(this.scene, 250, 475, 'button_hit', LanguageService.getString('textHit'), fontStyle);
        this.hitSignal.SetClickCallback(this.OnHitClick, this);
        this.signalContainer.add([this.hitSignal.buttonImg, this.hitSignal.gameText]);
    }
    RebetSignal() {
        let fontStyle = { fontFamily: 'LuckiestGuy-Regular', fontSize: '35px', fill: '#FFF', fontStyle: "normal", align: 'center' };
        this.rebetSignal = new Button(this.scene, 525, 475, 'button_rebet', LanguageService.getString('textRebet'), fontStyle);
        this.rebetSignal.SetClickCallback(this.onRebetClick, this);
        this.signalContainer.add([this.rebetSignal.buttonImg, this.rebetSignal.gameText]);
    }
    StandSignal() {
        let fontStyle = { fontFamily: 'LuckiestGuy-Regular', fontSize: '35px', fill: '#FFF', fontStyle: "normal", align: 'center' };
        this.standSignal = new Button(this.scene, 800, 475, 'button_stand', LanguageService.getString('textStand'), fontStyle);
        this.standSignal.SetClickCallback(this.onStandClick, this);
        this.signalContainer.add([this.standSignal.buttonImg, this.standSignal.gameText]);

    }
    NewSignal() {
        let fontStyle = { fontFamily: 'LuckiestGuy-Regular', fontSize: '35px', fill: '#FFF', fontStyle: "normal", align: 'center' };
        this.newSignal = new Button(this.scene, -525, 475, 'button_deal', LanguageService.getString('NEW'), fontStyle);
        this.newSignal.SetClickCallback(this.OnNewClick, this);
        this.signalContainer.add([this.newSignal.buttonImg, this.newSignal.gameText]);
        this.newSignal.HideButton();
    }
    DisablePlayerSignals() {
        this.dealSignal.DisableButton();
        this.doubleSignal.DisableButton();
        this.hitSignal.DisableButton();
        this.standSignal.DisableButton();
        this.splitSignal.DisableButton();
        this.newSignal.DisableButton();
        this.rebetSignal.DisableButton();
    }
    DisableRequestsSignals() {
        this.dealSignal.DisableButton();
        this.doubleSignal.DisableButton();
        this.hitSignal.DisableButton();
        this.standSignal.DisableButton();
        this.splitSignal.DisableButton();
    }
    OnDealClick() {
        SoundManager.PlaySignalButtonSound();
        this.scene.GetInitialCardsFromServer();
        this.dealSignal.DisableButton();
        Constant.game.events.emit('evtOnDisableBetBg');
    }
    OnNewClick() {
        this.newSignal.DisableButton();
        this.rebetSignal.DisableButton();
        SoundManager.PlaySignalButtonSound();
        this.scene.RemoveCardsAndFiches();
        this.scene.gameUi.betCoins.EnableChips();
        this.scene.gameUi.betCoins.ResetSelectedFiche();
    }
    OnHitClick() {
        SoundManager.PlaySignalButtonSound();
        this.hitSignal.DisableButton();
        this.standSignal.DisableButton();
        this.scene.GetHitFromServer();

    }
    onStandClick() {
        SoundManager.PlaySignalButtonSound();
        this.hitSignal.DisableButton();
        this.standSignal.DisableButton();
        this.scene.GetStandFromServer();
    }
    onRebetClick() {
        SoundManager.PlaySignalButtonSound();
        this.scene.RemoveCards();
        this.rebetSignal.DisableButton();
        this.newSignal.DisableButton();
        setTimeout(() => {
            this.scene.GetInitialCardsFromServer();
        }, 500);
    }

    EnableDeal() {
        this.dealSignal.ShowButton();
        this.newSignal.HideButton();
    }
    EnableNew() {
        this.newSignal.ShowButton();
        this.dealSignal.HideButton();
    }
    EnableHit() {
        this.hitSignal.ShowButton();
        this.hitSignal.EnableButton();
    }

    EnableStand() {
        this.standSignal.ShowButton();
        this.standSignal.EnableButton();
    }

    EnableRebet() {
        this.rebetSignal.ShowButton();
        this.rebetSignal.EnableButton();

    }
    DisableRebet() {
        this.rebetSignal.DisableButton();
    }

    async GetCardForDealer() {
        let dealerHand = await Server.CheckDealerHand();    ///#########-------------Get Dealer Cards on Stand  From Server-----------------
        if (dealerHand.result.status == 200) {
            Model.SetDealerActions(dealerHand.result.result);
            this.scene.CheckDealerActions();
        }
    }
}
export default Signals;