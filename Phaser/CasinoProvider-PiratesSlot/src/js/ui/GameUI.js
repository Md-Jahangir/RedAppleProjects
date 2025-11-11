import { Constant } from "../Constant.js";
import MenuPopup from "../popups/MenuPopup.js";
// import { Model } from "../Model.js";
import { SoundManager } from "../SoundManager.js";
import { ButtonScaleDownTween } from "../Utils.js";
import Button from "./Button.js";
class GameUI {

    constructor(scene) {
        this.scene = scene;
        this.logo = null;
        this.leftTruck = null;
        this.rightTruck = null;
        this.backButtonBase = null;
        this.backButton = null;
        this.leftSlotNumber = null;
        this.rightSlotNumber = null;
        this.isBuyBonusButtonClicked = false;//-------------
        this.leftSlotNumberArray = [];
        this.rightSlotNumberArray = [];
        this.tapToPlayPopupContainer = null;
        this.strom_anim = null;
        this.fog_anim = null;

        this.buyBonusContainer = null;
        this.bonusPopupContainer = null;
        this.bonusBettingAmount = '50.00';
        this.onStartButtonPressed = false;//--------------------
        this.freeSpin = 10;
        this.create();

    };
    create() {
        this.CreateMenuPopup();
        this.CreateMenuButton()
    };
    CreateBonusButton(){
    }
    BuyBonusButtonPressed() {
        this.buyBonusContainer.list[0].setScale(0.9);
    };
    BuyBonusButtonReleased() {
        this.isBuyBonusButtonClicked = true;
        this.buyBonusContainer.list[0].visible = false; //buy bonus button visible fals;e 
        this.buyBonusContainer.list[0].setScale(1);
        this.scene.bottomPanel.EnableOverlay();
        this.bonusPopupContainer.visible = true;
        this.scene.bottomPanel.bottomPanelContainer.list[14].setAlpha(0); //this is spin button
        this.scene.bottomPanel.bottomPanelContainer.list[12].setAlpha(0); //this is auto spin button
        // SoundManager.PlayBonusButtonSound();
    };

    CreateBonusPopup() {
        let bonusPopupBg, centralHeading, buyBonusText, scatterImg, bonusFunCost, funAmt, cancelButton, cancelText, startButton, startText;

        this.bonusPopupContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.floor(Constant.game.config.height / 2)).setScale(Constant.scaleFactorX, Constant.scaleFactorY);

        this.bonusPopupContainer.depth = 3;

        let bonusBuyStyle = { fontFamily: 'kingsandpirates-peak', fontSize: '60px', fill: '#fae761', fontStyle: 'normal', align: 'center' };
        let style = { fontFamily: 'kingsandpirates-peak', fontSize: '35px', fill: '#fae761', fontStyle: 'normal', align: 'center' };

        bonusPopupBg = this.scene.add.image(0, -55, 'full_ilustration').setOrigin(0.5, 0.5);

        centralHeading = this.scene.add.image(0, -385, 'central_button_title').setOrigin(0.5, 0.5);
        buyBonusText = this.scene.add.text(centralHeading.x, centralHeading.y, 'Buy Bonus', bonusBuyStyle).setOrigin(0.5, 0.5);

        scatterImg = this.scene.add.image(0, -115, 'scatter').setOrigin(0.5, 0.5);

        bonusFunCost = this.scene.add.image(0, 115, 'button_50fun').setOrigin(0.5, 0.5);
        funAmt = this.scene.add.text(bonusFunCost.x, bonusFunCost.y, 'FUN ' + this.bonusBettingAmount, style).setOrigin(0.5, 0.5);

        cancelButton = this.scene.add.image(-225, 275, 'buton_right').setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true });
        cancelText = this.scene.add.text(cancelButton.x, cancelButton.y, 'CANCEL', style).setOrigin(0.5, 0.5);

        startButton = this.scene.add.image(235, 275, 'button_left').setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true });
        startText = this.scene.add.text(startButton.x, startButton.y, 'START', style).setOrigin(0.5, 0.5);

        this.bonusPopupContainer.add(bonusPopupBg);
        this.bonusPopupContainer.add(centralHeading);
        this.bonusPopupContainer.add(buyBonusText);
        this.bonusPopupContainer.add(scatterImg);
        this.bonusPopupContainer.add(bonusFunCost);
        this.bonusPopupContainer.add(funAmt);
        this.bonusPopupContainer.add(cancelButton);
        this.bonusPopupContainer.add(cancelText);
        this.bonusPopupContainer.add(startButton);
        this.bonusPopupContainer.add(startText);
        this.bonusPopupContainer.visible = false;
        // this.bonusPopupContainer.list[6].on('pointerdown', this.OnCancelButtonDown, this);
        // this.bonusPopupContainer.list[6].on('pointerup', this.OnCancelButtonUp, this);//cancel button
        // this.bonusPopupContainer.list[8].on('pointerdown', this.OnStartButtonDown, this);
        // this.bonusPopupContainer.list[8].on('pointerup', this.OnStartButtonUp, this);//start button
    }
    OnCancelButtonDown() {
    }
    OnCancelButtonUp() {
        this.isBuyBonusButtonClicked = false;
        this.buyBonusContainer.list[0].visible = true; // buy bonus butto visible true
        this.scene.bottomPanel.DisableOverlay();
        this.bonusPopupContainer.visible = false;
        this.scene.bottomPanel.bottomPanelContainer.list[14].setAlpha(1);
        this.scene.bottomPanel.bottomPanelContainer.list[12].setAlpha(1);
    }
    OnStartButtonDown() {
    }
    OnStartButtonUp() {
        this.scene.bottomPanel.DisableSpaceBar();
        // SoundManager.PlayBonusButtonSound();
        this.scene.bottomPanel.normalSpin = false;
        this.buyBonusContainer.list[0].visible = true;
        this.DisableButtons(this.buyBonusContainer.list[0], 'buy_bonus_button_disabled');
        this.onStartButtonPressed = true;
        this.scene.bottomPanel.DisableOverlay();
        this.bonusPopupContainer.visible = false;
        this.scene.bottomPanel.SpinButtonReleased(this.scene.bottomPanel.normalSpin);
    };
   
  
    EnableButtons(_button, _texture) {
        _button.setTexture(_texture);
        _button.setInteractive({ useHandCursor: true });
    }
    DisableButtons(_button, _texture) {
        _button.setTexture(_texture);
        _button.removeInteractive();

    }

    CreateMenuButton() {
        let fontStyle = { fontFamily: 'kingsandpirates-peak', fontSize: '60px', fill: '#fae761', fontStyle: 'normal', align: 'center' };
        this.menuContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2)).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        this.menuButton =new Button(this.scene,840, -450, 'menu_button', '',fontStyle ) ;
        this.menuButton.normalImg.on("pointerdown", this.MenuButtonPressed, this);
        this.menuButton.normalImg.on("pointerup", this.MenuButtonReleased, this);
        this.menuContainer.add([this.menuButton.normalImg, this.menuButton.disabledImg, this.menuButton.glowImg]);
    };
    MenuButtonPressed() {
        // ButtonScaleDownTween(this.scene, this.menuButton.normalImg, 0.9);
        SoundManager.ShowPopup();
    };
    MenuButtonReleased() {
        // ButtonScaleDownTween(this.scene, this.menuButton.normalImg, 1);
        SoundManager.ButtonClickSound();
        this.menuPopup.ShowMenuPopup();
    };
    EnableMenu(){
        this.menuButton.EnableButton();
    }
    DisableMenu(){
        this.menuButton.DisableButton();
    }
    CreateMenuPopup(){
         this.menuPopup = new MenuPopup(this.scene);
    }
}

export default GameUI;