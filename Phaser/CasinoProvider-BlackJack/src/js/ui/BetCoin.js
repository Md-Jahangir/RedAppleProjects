import { Constant } from "../Constant";
import { LanguageService } from "../LanguageService";
import { Model } from "../Model";
import { SoundManager } from "../SoundManager";
class BetCoin {
    constructor(scene) {
        this.scene = scene;
        this.arrayOfBetAmount = [1, 5, 10, 50, 100, 500];
        this.betColorArray = ['0x474237', '0xdc4a1c', '0x2180da', '0x303030', '0xf10019', '0x005f17']
        this.betCoinContainer = null;
        this.betPlacedFiche = null;
        this.selectedFicheObj = null;
        this.totalbetPlacedFiche = null;
        this.betCounter = 0;
        this.create();
    }
    create() {
        this.CreateRingBase();
        this.BetPanelUi();
        this.PlaceBets();
        this.EnableChips();
        this.TweenBetBase();
        Constant.game.events.on('evtShowWarningDone', this.EnableBets, this);
    }
    BetPanelUi() {
        let fontStyle = { fontFamily: 'LuckiestGuy-Regular', fontSize: '30px', fill: '#FFF', fontStyle: "normal", align: 'center' };
        this.betCoinContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        let startX = -800;
        let startY = 50;
        let stepX = [425, 575, 725, 875, 1025, 1175];
        let stepY = [175, 200, 210, 210, 200, 175];
        let getBetsValues = Model.GetBetsValues();
        for (let index = 0; index < getBetsValues.length; index++) {
            let childContainer = this.scene.add.container(0, 0);
            let image = this.scene.add.image(startX + stepX[index], startY + stepY[index], 'fiche_' + index).setScale(1.2, 1.2).setOrigin(0.5);
            image.setData({ index: index, amount: getBetsValues[index] });
            let text = this.scene.add.text(image.x, image.y - 10, getBetsValues[index], fontStyle).setScale(1, 1).setOrigin(0.5);
            text.setTint(this.betColorArray[index]);
            childContainer.add([image, text]);
            this.betCoinContainer.add(childContainer);
        }
    }
    GetChildContainer(index) {
        return this.betCoinContainer.list[index];
    }
    CreateRingBase() {
        this.ringBaseContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.ficheRingBase = this.scene.add.image(0, -1000, 'fiche_base').setScale(1.3).setVisible(true);
        this.ringBaseContainer.add(this.ficheRingBase);
    }
    EnableBets() {
        this.betCoinContainer.list.forEach((element, index) => {
            element.list[0].setInteractive({ useHandCursor: true });
            element.list[0].on('pointerover', () => this.ButtonOver(element.list[0], element.list[1]), this);
            element.list[0].on('pointerout', () => this.ButtonOut(element.list[0], element.list[1]), this);
            element.list[0].on('pointerdown', () => this.BetCoinButtonPressed(element.list[0]), this);
            element.list[0].on('pointerup', () => this.BetCoinButtonReleased(element.list[0]), this);
        });
    }

    EnableChips() {
        this.scene.gameUi.PlayInstructionTween('Pick your coins and start deal!');
        this.EnableBets();
    }

    ButtonOver(obj, text) {
        if (!obj.input.enabled) return;
        obj.setScale(1.1);
        text.setScale(1.1);
    }
    ButtonOut(obj, text) {
        if (!obj.input.enabled) return;
        obj.setScale(1.2);
        text.setScale(1.2);
    }
    BetCoinButtonPressed(obj) {

    }
    BetCoinButtonReleased(obj) {
        this.betPlacedFiche = obj.data.list.amount;
        this.selectedFicheObj = obj;
        this.ficheRingBase.setPosition(obj.x, obj.y)
        this.EnableBetBase();
    }
    InitialBetCoin() {
        this.betPlacedFiche
    }
    DisableChips() {
        this.betCoinContainer.list.forEach((element, index) => {
            element.list[0].setAlpha(1);
            element.list[1].setAlpha(1);
            element.list[0].removeInteractive();
        });
    }

    PlaceBets() {
        let fontStyle = { fontFamily: 'LuckiestGuy-Regular', fontSize: '30px', fill: '0x474237', fontStyle: "normal", align: 'center' };
        this.betPlaceContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.betBaseimage = this.scene.add.image(0, 110, 'bet_bg');
        this.betBaseimageAlpha = this.scene.add.image(0, 110, 'bet_bg_alpha').setAlpha(1);
        this.ficheImage = this.scene.add.image(this.betBaseimage.x, this.betBaseimage.y + 55, 'fiche_0');
        this.text = this.scene.add.text(this.ficheImage.x, this.ficheImage.y - 10, '', fontStyle).setOrigin(0.5);
        this.betPlaceContainer.add([this.betBaseimage, this.betBaseimageAlpha, this.ficheImage, this.text]);
        this.betPlaceContainer.setVisible(true);
        this.betBaseimage.on('pointerup', () => {
            this.SetBetPlaceFiche(this.betPlacedFiche, this.selectedFicheObj);
        })
    }

    TweenBetBase() {
        this.baseTween = this.scene.tweens.add({
            targets: this.betBaseimageAlpha,
            ease: 'Quad.easeInOut',
            yoyo: false,
            repeat: 0,
            duration: 500,
            x: this.betBaseimage.x,
            y: this.betBaseimage.y,
            alpha: 0,
            repeat: -1,
            yoyo: true,
        })
        this.StopTween();
    }
    StopTween() {
        this.baseTween.pause();
        this.betBaseimageAlpha.setAlpha(0);
    }
    PlayTween() {
        this.baseTween.resume();
        this.betBaseimageAlpha.setAlpha(1);
    }
    EnableBetBase() {
        if (this.betBaseimage.input == undefined) {
            SoundManager.PlayPlaceYourBets();
            this.TweenBetBase();
            this.PlayTween();
            this.betBaseimage.setInteractive({ useHandCursor: true });
            this.scene.gameUi.PlayInstructionTween('Great! Now Place Bets On Coins Area.');
        }
    }
    DisableBetBase() {
        this.betBaseimage.removeInteractive();
    }
    ShowBetPlaceValue() {
        this.betPlaceContainer.setVisible(true);
    }
    CreateTweenForBet(image, totalbetPlacedFiche) {
        if (totalbetPlacedFiche < Model.GetMaxBet()) {
            let betCoinContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
            let baseimage = this.scene.add.image(image.x, image.y, image.texture.key).setScale(1, 1).setOrigin(0.5);
            betCoinContainer.add(baseimage);
            let tween = this.scene.tweens.add({
                targets: baseimage,
                ease: 'Quad.easeInOut',
                yoyo: false,
                repeat: 0,
                duration: 250,
                x: this.text.x,
                y: this.text.y,

                onComplete: () => {
                    betCoinContainer.destroy();
                }
            }, this)
        }
    }
    SetBetPlaceFiche(amount, object) {
        this.StopTween();
        SoundManager.PlayChipSound();
        this.scene.gameUi.StopInstructionTween();
        this.scene.gameUi.userSignals.EnableDeal();
        this.SetPlacedAmount(this.totalbetPlacedFiche, amount);
        this.CreateTweenForBet(object, this.totalbetPlacedFiche);

    }
    SetPlacedAmount(totalPlacedAmount, amount) {
        this.totalbetPlacedFiche += amount;
        if (this.totalbetPlacedFiche <= Model.GetMaxBet()) {
            if (this.totalbetPlacedFiche > 1000 && this.totalbetPlacedFiche <= 10000) {
                this.text.setFontSize('29px');
                this.text.setText(this.totalbetPlacedFiche);
            }
            else if (this.totalbetPlacedFiche > 10000 && this.totalbetPlacedFiche <= 100000) {
                this.text.setFontSize('24px');
                this.text.setText(this.totalbetPlacedFiche);
            }
            else if (this.totalbetPlacedFiche > 100000) {
                this.text.setFontSize('22px');
                this.text.setText(this.totalbetPlacedFiche);
            } else {
                this.text.setFontSize('30px');
                this.text.setText(this.totalbetPlacedFiche);
            }
        } else {
            this.totalbetPlacedFiche -= amount;
            this.DisableChips();
            this.scene.gameUi.CreateTweenForWarning(LanguageService.getString('textErrorMaxBet'));
        }
        this.SetTextureOfPlacedCoins(this.totalbetPlacedFiche);
    }
    SetTextureOfPlacedCoins() {
        let getBetsValues = Model.GetBetsValues();
        if (this.totalbetPlacedFiche <= Model.GetMaxBet()) {
            if (this.totalbetPlacedFiche <= getBetsValues[1]) {
                this.ficheImage.setTexture('fiche_0');
                this.text.style.color = this.betColorArray[0];
            }
            else if (this.totalbetPlacedFiche >= getBetsValues[1] && this.totalbetPlacedFiche < getBetsValues[2]) {
                this.ficheImage.setTexture('fiche_1');
                this.text.style.color = this.betColorArray[1];
            }
            else if (this.totalbetPlacedFiche >= getBetsValues[2] && this.totalbetPlacedFiche < getBetsValues[3]) {
                this.ficheImage.setTexture('fiche_2');
                this.text.style.color = this.betColorArray[2];
            }

            else if (this.totalbetPlacedFiche >= getBetsValues[3] && this.totalbetPlacedFiche < getBetsValues[4]) {
                this.ficheImage.setTexture('fiche_3');
                this.text.style.color = this.betColorArray[3];
            }
            else if (this.totalbetPlacedFiche >= getBetsValues[4] && this.totalbetPlacedFiche < getBetsValues[5]) {
                this.ficheImage.setTexture('fiche_4');
                this.text.style.color = this.betColorArray[4];
            }
            else if (this.totalbetPlacedFiche >= getBetsValues[5]) {
                this.ficheImage.setTexture('fiche_5');
                this.text.style.color = this.betColorArray[5];
            }
        } else {
            // Handle Popup for Max bet Allow

            // this.DisableChips();
            // this.scene.gameUi.CreateTweenForWarning(LanguageService.getString('textErrorMaxBet'));
        }
    }
    RemoveTextureAndAmountOfPlacedFiches() {
        this.ficheImage.setTexture('fiche_0');
        this.text.setText('');
    }
    ResetSelectedFiche() {
        this.betPlacedFiche = null;
        this.selectedFicheObj = null;
        this.DisableBetBase();
        this.ficheRingBase.setPosition(0, -1000);
    }
}
export default BetCoin;