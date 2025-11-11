/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
// /* eslint-disable no-console */
/* global window,console */
/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 30-10-2025.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 30-10-2025
 * @Description :- Design and control the table,table card of the gameplay page.
 ************************************/
import Phaser from 'phaser';
import { Constant } from '../utils/Constant';
import { Utils } from '../utils/Utils';
// import { Model } from '../utils/Model';

class Table {
  constructor(_scene) {
    this.scene = _scene;
    this.tableContainer = null;
    this.tableCardArray = [];
    this.currentWidth = null;
    this.currentHeight = null;
    this.currentTopCard = null;

    this.create();
  };

  //#region - Create function
  create() {
    this.tableContainer = this.scene.add.container(window.innerWidth / 2, window.innerHeight / 2);

    this.CreateDrawPileSprite();
    this.CreateDiscardPileSprite();
    this.CreateUnoButton();
    this.CreateCurrentColorShowing();

  };
  //#endregion

  //#region - Draw Pile Card
  CreateDrawPileSprite() {
    // this.drawPileSprite = this.scene.add.sprite(-80, 0, 'cards');
    this.drawPileSprite = this.scene.add.sprite(0, 0, 'cards');
    this.drawPileSprite.on('pointerdown', this.OnDrawPileSpitePressed, this);
    this.drawPileSprite.setFrame(54);
    this.tableContainer.add(this.drawPileSprite);
    this.EnableDrawPileSprite();
  };

  MoveDrawPileSpriteToLeft(_cardData) {
    this.scene.tweens.add({
      targets: this.drawPileSprite,
      x: -80,
      y: 0,
      duration: 300,
      ease: 'Cubic.easeOut',
      onComplete: () => {
        this.ShowHideDiscardPileSprite(true);
        this.SetCurrentColor(_cardData);
      }
    });
  };

  ShowHideDrawPileSprite(_status) {
    this.drawPileSprite.setVisible(_status);
  };

  OnDrawPileSpitePressed() {
    Utils.ButtonScaleTween(this.scene, this.drawPileSprite, 1);
    Constant.game.events.emit('evtPlayerDrawCardRequest');
  };

  EnableDrawPileSprite() {
    this.drawPileSprite.setInteractive({ useHandCursor: true });
  };
  DisableDrawPileSprite() {
    this.drawPileSprite.removeInteractive();
  };
  //#endregion

  //#region - Discard Pile Card
  CreateDiscardPileSprite() {
    this.discardPileSprite = this.scene.add.sprite(80, 0, 'cards').setOrigin(0.5);
    this.discardPileSprite.setFrame(0);
    this.tableContainer.add(this.discardPileSprite);
    this.ShowHideDiscardPileSprite(false);
  };

  ShowHideDiscardPileSprite(_status) {
    this.discardPileSprite.setVisible(_status);
  };
  SetInitailDiscardPileSprite(_cardData) {
    console.log('SetInitailDiscardPileSprite: ', _cardData);
    const frameIndex = this.scene.deck.GetActualCardFrameIndex(_cardData);
    this.discardPileSprite.setFrame(frameIndex);
    this.currentTopCard = _cardData;
  };

  GetDiscardPileSpritePosition() {
    return {
      x: this.discardPileSprite.x,
      y: this.discardPileSprite.y
    };
  };

  AddCardToDiscardPile(card) {
    console.log('AddCardToDiscardPile card..........: ', card);
    this.currentTopCard = card;
    this.scene.children.bringToTop(card);
    this.tableContainer.add(card);
    card.setPosition(this.discardPileSprite.x, this.discardPileSprite.y);
    card.setScale(1);
    this.SetCurrentColor(card.cardData);
  }
  //#endregion

  CreateUnoButton() {
    this.unoButton = this.scene.add.image(225, 70, 'button_uno');
    this.unoButton.setInteractive({ useHandCursor: true });
    this.unoButton.on('pointerdown', this.OnUnoButtonPressed, this);
    this.tableContainer.add(this.unoButton);
  };
  OnUnoButtonPressed() {
    Utils.ButtonScaleTween(this.scene, this.unoButton, 1);
  };

  CreateCurrentColorShowing() {
    this.currentColorSprite = this.scene.add.sprite(220, -65, 'colors');
    // this.currentColorSprite.setFrame(0);
    this.currentColorSprite.setAlpha(0);
    this.tableContainer.add(this.currentColorSprite);
  };

  SetCurrentColor(_currentCard) {
    const frameIndex = this.scene.deck.GetCardColorIndex(_currentCard);
    console.log('SetCurrentColor frameIndex: ', frameIndex);
    console.log('SetCurrentColor _currentCard: ', _currentCard);

    if (frameIndex !== -1) {
      this.currentColorSprite.setFrame(frameIndex);
      this.scene.tweens.add({
        targets: this.currentColorSprite,
        alpha: 1,
        duration: 300,
        ease: 'Cubic.easeOut',
        onComplete: () => {
          Constant.game.events.emit('evtEnableCardInteractice', this);
        }
      });
    }


  };

  //#region - Resize
  resize(_newWidth, _newHeight, _newScale) {
    this.newScaleFactor = _newScale;
    this.currentWidth = _newWidth;
    this.currentHeight = _newHeight;
    this.tableContainer.setScale(_newScale);
    this.tableContainer.setPosition((_newWidth / 2), (_newHeight / 2));

  };
  //#endregion

};

export default Table;