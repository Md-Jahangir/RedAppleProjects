import { Constant } from "../Constant";
import { Model } from "../Model";
import { SoundManager } from "../SoundManager";
import { Utils } from "../Utils";
import Button from "./Button";
class BetCoin {
    constructor(scene) {
        this.scene = scene;
        this.arrayOfBetAmount = [0.1, 1, 5, 10, 25, 100];
        this.betColorArray = ['0x013D3D', '0x361600', '0x5F0010', '0x113D00', '0x002F3F', '0x790060']
        this.betCoinContainer = null;
        this.betPlacedFiche = null;
        this.totalbetPlacedFiche = 0;
        this.totalBetPlaceOnBanker = 0;
        this.totalBetPlaceOnPlayer = 0;
        this.totalBetPlaceOnTie = 0;
        this.selectedFiche = null;
        this.selectedFicheObj = null;
        this.create();
    }
    create() {
        this.BetPanelUi();
        this.CreateRingBase();
        this.EnableChips();
        this.ShowRingBase();
        this.CreateHittingAreaOfBetsPlace();
        // this.PlaceBets();
    }
    BetPanelUi() {
        let fontStyle = { fontFamily: 'Roboto-Black', fontSize: '30px', fill: '#FFF', fontStyle: "normal", align: 'center' };
        Model.SetMinBet(0.1);
        Model.SetMaxBet(100);
        this.cloneCoinBankerContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.cloneCoinPlayerContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.cloneCoinTieContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.betCoinContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        let startX = -800;
        let startY = 50;
        let stepX = [-325, -195, -65, 65, 195, 325];
        let stepY = [275, 295, 305, 305, 295, 275];
        // let getBetsValues = Model.GetBetsValues();
        for (let index = 0; index < 6; index++) {
            let tempContainer = this.scene.add.container(0, 0)
            this.betCoinButtons = new Button(this.scene, stepX[index], stepY[index], 'fiche_' + index, '', 0)//this.scene.add.image(stepX[index], stepY[index], 'fiche_' + index).setScale(1, 1)
            this.betCoinButtons.normalBtn.setData({ name: 'fiche' + index, value: this.arrayOfBetAmount[index] });
            tempContainer.add([this.betCoinButtons.disabledBtn, this.betCoinButtons.normalBtn, this.betCoinButtons.buttonText])
            this.betCoinContainer.add([tempContainer]);
            this.betCoinContainer.setDepth(2);
        }
    }
    CreateRingBase() {
        this.ringBaseContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.ficheRingBase = this.scene.add.image(0, -1000, 'fiche_ring').setOrigin(0.5).setVisible(true);
        this.ringBaseContainer.add(this.ficheRingBase);
    }
    HideRingBase() {
        this.ringBaseContainer.setVisible(false);
    }
    ShowRingBase() {
        this.ringBaseContainer.setVisible(true);
        this.ficheRingBase.setPosition(0, -1000);
    }

    EnableChips() {
        this.scene.gameUi.ShowPlaceYourBets('Pick your coins and start deal!');
        this.betCoinContainer.list.forEach(element => {
            element.list[1].setVisible(true);
            element.list[1].on('pointerover', () => this.betCoinButtons.ButtonOver(element.list[1], element.list[2]), this);
            element.list[1].on('pointerout', () => this.betCoinButtons.ButtonOut(element.list[1], element.list[2]), this);
            element.list[1].on('pointerdown', () => this.BetCoinButtonPressed(element.list[1]), this);
            element.list[1].on('pointerup', () => this.BetCoinButtonReleased(element.list[1]), this);
        });
       
    }
    BetCoinButtonPressed(obj) {

    }
    BetCoinButtonReleased(obj) {
        this.selectedFiche = obj.data.list.value;
        this.selectedFicheObj = obj;
        this.ficheRingBase.setPosition(obj.x, obj.y + 5);
        this.EnableHittingArea();
        // this.PlayTween();
    }

    DisableChips() {
        // this.scene.gameUi.HidePlaceYourBets();
        this.betCoinContainer.list.forEach(element => {
            element.list[0].setVisible(true);
            element.list[1].setVisible(false);
        });
        this.HideRingBase();
    }

    PlaceBets() {
        let fontStyle = { fontFamily: 'Roboto-Black', fontSize: '25px', fill: '0x474237', fontStyle: "normal", align: 'center' };
        this.betPlaceContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.tieBetCoinImage = this.scene.add.image(0, -150, 'fiche_6');
        this.bankerBetCoinImage = this.scene.add.image(0, 0, 'fiche_6');
        this.playerBetCoinImage = this.scene.add.image(0, 150, 'fiche_6');
        this.tieBetCoinText = this.scene.add.text(this.tieBetCoinImage.x, this.tieBetCoinImage.y - 20, '', fontStyle);
        this.bankerBetCoinText = this.scene.add.text(this.bankerBetCoinImage.x, this.bankerBetCoinImage.y - 20, '', fontStyle);
        this.playerBetCoinText = this.scene.add.text(this.playerBetCoinImage.x, this.playerBetCoinImage.y - 20, '', fontStyle);
        this.betPlaceContainer.add([this.tieBetCoinImage, this.tieBetCoinText, this.bankerBetCoinImage, this.bankerBetCoinText, this.playerBetCoinImage, this.playerBetCoinText]);
        this.betPlaceContainer.setVisible(true);
    }
    ShowBetPlaceValue() {
        this.betPlaceContainer.setVisible(false);
    }
    CreateHittingAreaOfBetsPlace() {
        this.hittingContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.tieHittinArea = this.scene.add.image(0, -150, 'bet_tie').setAlpha(0.1);
        this.bankerHittingArea = this.scene.add.image(0, 0, 'bet_banker').setAlpha(0.1);
        this.playerHittingArea = this.scene.add.image(0, 150, 'bet_player').setAlpha(0.1);
        this.hittingContainer.add([this.tieHittinArea, this.bankerHittingArea, this.playerHittingArea]);
        this.DisableHittingArea();
        this.HandleEventsOnHitClick();
        this.TweenHittingArea()
    }
    TweenHittingArea(){
        this.hittingContainer1 = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.tieHittinArea1 = this.scene.add.image(0, -150, 'bet_tie1').setAlpha(0.1);
        this.bankerHittingArea1 = this.scene.add.image(0, 0, 'bet_banker1').setAlpha(0.1);
        this.playerHittingArea1 = this.scene.add.image(0, 150, 'bet_player1').setAlpha(0.1);
        this.hittingContainer1.add([this.tieHittinArea1, this.bankerHittingArea1, this.playerHittingArea1]);
        this.hitAreaTween = this.scene.tweens.add({
            targets:[this.tieHittinArea1, this.bankerHittingArea1, this.playerHittingArea1],
            duration : 500,
            alpha : 1, 
            yoyo : true,
            repeat : -1,
            ease : 'Sine.easeInOut'
        })
        this.StopTween();
    }
    PlayTween(){
        this.hitAreaTween.resume();
    }
    StopTween(){
        this.tieHittinArea1.setAlpha(0.1);
        this.bankerHittingArea1.setAlpha(0.1);
        this.playerHittingArea1.setAlpha(0.1);
        this.hitAreaTween.pause();
    }
    EnableHittingArea() {
        if(this.tieHittinArea.input == undefined ){
            this.tieHittinArea.setInteractive({ cursor: 'url(assets/images/custom_cursor.png), pointer' });
            this.scene.gameUi.ShowPlaceYourBets('Great! Now bet on banker, player, or tie.');
            SoundManager.PlayPlaceYourBets();
            this.PlayTween();
        }
        if(this.bankerHittingArea.input == undefined ){
            this.bankerHittingArea.setInteractive({ cursor: 'url(assets/images/custom_cursor.png), pointer' });
            this.scene.gameUi.ShowPlaceYourBets('Great! Now bet on banker, player, or tie.');
            SoundManager.PlayPlaceYourBets();
            this.PlayTween();
        }
        
        if(this.playerHittingArea.input == undefined ){
            this.playerHittingArea.setInteractive({ cursor: 'url(assets/images/custom_cursor.png), pointer' });
            this.scene.gameUi.ShowPlaceYourBets('Great! Now bet on banker, player, or tie.');
            SoundManager.PlayPlaceYourBets();
            this.PlayTween();
        }
        
    }
    DisableHittingArea() {
        this.tieHittinArea.removeInteractive();
        this.bankerHittingArea.removeInteractive();
        this.playerHittingArea.removeInteractive();
    }
    HandleEventsOnHitClick() {

        this.bankerHittingArea.on('pointerup', () => {
            this.totalbetPlacedFiche = this.totalBetPlaceOnBanker + this.totalBetPlaceOnPlayer + this.totalBetPlaceOnTie + this.selectedFiche;
            if (this.totalbetPlacedFiche <= Model.GetMaxBet()) {
                this.totalBetPlaceOnBanker += this.selectedFiche;
                let targetObjX1 = this.bankerHittingArea.x - this.bankerHittingArea.displayWidth / 2 + this.betCoinContainer.list[0].list[1].displayWidth / 2;
                let targetObjX2 = this.bankerHittingArea.x + this.bankerHittingArea.displayWidth / 2 - this.betCoinContainer.list[0].list[1].displayWidth / 2;
                let targetObjY1 = this.bankerHittingArea.y - this.bankerHittingArea.displayHeight / 2 + this.betCoinContainer.list[0].list[1].displayHeight / 2;
                let targetObjY2 = this.bankerHittingArea.y + this.bankerHittingArea.displayHeight / 2 - this.betCoinContainer.list[0].list[1].displayHeight / 2;
                let getRandomX = Utils.GetRandomNumber(targetObjX1, targetObjX2);
                let getRandomY = Utils.GetRandomNumber(targetObjY1, targetObjY2);
                this.IncreaseBetCoins( this.selectedFicheObj, getRandomX, getRandomY, this.cloneCoinBankerContainer);
            } else {
                this.scene.warningPopup.ShowWarnPopup('You have exceeded maximum \n bet .Please reduce your bet. ');
            }

        })
        this.playerHittingArea.on('pointerup', () => {
            this.totalbetPlacedFiche = this.totalBetPlaceOnBanker + this.totalBetPlaceOnPlayer + this.totalBetPlaceOnTie + this.selectedFiche;
            if (this.totalbetPlacedFiche <= Model.GetMaxBet()) {
                this.totalBetPlaceOnPlayer += this.selectedFiche;
                let targetObjX1 = this.playerHittingArea.x - this.playerHittingArea.displayWidth / 2 + this.betCoinContainer.list[0].list[1].displayWidth / 2;
                let targetObjX2 = this.playerHittingArea.x + this.playerHittingArea.displayWidth / 2 - this.betCoinContainer.list[0].list[1].displayWidth / 2;
                let targetObjY1 = this.playerHittingArea.y - this.playerHittingArea.displayHeight / 2 + this.betCoinContainer.list[0].list[1].displayHeight / 2;
                let targetObjY2 = this.playerHittingArea.y + this.playerHittingArea.displayHeight / 2 - this.betCoinContainer.list[0].list[1].displayHeight / 2;
                let getRandomX = Utils.GetRandomNumber(targetObjX1, targetObjX2);
                let getRandomY = Utils.GetRandomNumber(targetObjY1, targetObjY2);
                this.IncreaseBetCoins( this.selectedFicheObj, getRandomX, getRandomY, this.cloneCoinPlayerContainer);
            } else {
                this.scene.warningPopup.ShowWarnPopup('You have exceeded maximum \n bet .Please reduce your bet. ');
            }
        })
        this.tieHittinArea.on('pointerup', () => {
            this.totalbetPlacedFiche = this.totalBetPlaceOnBanker + this.totalBetPlaceOnPlayer + this.totalBetPlaceOnTie + this.selectedFiche;
            if (this.totalbetPlacedFiche <= Model.GetMaxBet()) {
                this.totalBetPlaceOnTie += this.selectedFiche;
                let targetObjX1 = this.tieHittinArea.x - this.tieHittinArea.displayWidth / 2 + this.betCoinContainer.list[0].list[1].displayWidth / 2;
                let targetObjX2 = this.tieHittinArea.x + this.tieHittinArea.displayWidth / 2 - this.betCoinContainer.list[0].list[1].displayWidth / 2;
                let targetObjY1 = this.tieHittinArea.y - this.tieHittinArea.displayHeight / 2 + this.betCoinContainer.list[0].list[1].displayHeight / 2;
                let targetObjY2 = this.tieHittinArea.y + this.tieHittinArea.displayHeight / 2 - this.betCoinContainer.list[0].list[1].displayHeight / 2;
                let getRandomX = Utils.GetRandomNumber(targetObjX1, targetObjX2);
                let getRandomY = Utils.GetRandomNumber(targetObjY1, targetObjY2);
                this.IncreaseBetCoins( this.selectedFicheObj, getRandomX, getRandomY, this.cloneCoinTieContainer);
            } else {
                this.scene.warningPopup.ShowWarnPopup('You have exceeded maximum \n bet .Please reduce your bet .');
            }
        })

    }
    IncreaseBetCoins( object, targetX, targetY, container) {
        if (object != null || object != undefined) {
            this.scene.gameUi.betCoins.StopTween();
            this.scene.gameUi.HidePlaceYourBets();
            SoundManager.PlayChipSound();
            this.clonedObj = this.scene.add.image(object.x, object.y, object.texture.key);
            container.add([this.clonedObj]);
            this.clonedObj.setScale(0.8)
            let tween = this.scene.tweens.add({
                targets: this.clonedObj,
                ease: 'Quad.easeInOut',
                yoyo: false,
                repeat: 0,
                duration: 350,
                delay: 150,
                x: targetX,
                y: targetY,
                onComplete: () => {
                }
            })
            this.scene.gameUi.userSignals.EnableDeal();
            this.scene.gameUi.userSignals.EnableClear();
        }

    }
    ResetBetCoins() {
        this.totalbetPlacedFiche = 0;
        this.totalBetPlaceOnBanker = 0;
        this.totalBetPlaceOnPlayer = 0;
        this.totalBetPlaceOnTie = 0;
        this.selectedFiche = null;
        this.selectedFicheObj = null;
        this.DisableCoins(this.cloneCoinTieContainer);
        this.DisableCoins(this.cloneCoinBankerContainer);
        this.DisableCoins(this.cloneCoinPlayerContainer);

    }
    RemoveBetCoins(winnerType) {
        if (winnerType == 'Tie') {
            this.DisableCoins(this.cloneCoinTieContainer);
            this.DisableCoins(this.cloneCoinBankerContainer);
            this.DisableCoins(this.cloneCoinPlayerContainer);
        }
        else if (winnerType == 'player') {
            for (let index = this.cloneCoinPlayerContainer.list.length - 1; index >= 0; index--) {
                this.TweenCoinsToRemove(this.cloneCoinPlayerContainer.list[index], this.cloneCoinPlayerContainer, -300, -100);
            }

            this.DisableCoins(this.cloneCoinBankerContainer);
            this.DisableCoins(this.cloneCoinTieContainer);
        }
        if (winnerType == 'banker') {
            for (let index = this.cloneCoinBankerContainer.list.length - 1; index >= 0; index--) {
                this.TweenCoinsToRemove(this.cloneCoinBankerContainer.list[index], this.cloneCoinBankerContainer, 500, -100);
            }
            this.DisableCoins(this.cloneCoinPlayerContainer);
            this.DisableCoins(this.cloneCoinTieContainer);
        }

    }
    DisableCoins(container) {
        for (let index = container.list.length - 1; index >= 0; index--) {
            container.remove(container.list[index], true);
        }
    }
    TweenCoinsToRemove(element, container, targetX, targetY) {
        SoundManager.PLayFicheCollectSound();
        let tween = this.scene.tweens.add({
            targets: element,
            ease: 'Quad.easeInOut',
            yoyo: false,
            repeat: 0,
            duration: 500,
            delay: 20,
            x: targetX,
            y: targetY,
            onComplete: () => {
                container.remove(element, true);

            }
        })
    }
}
export default BetCoin;