/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
// /* eslint-disable no-console */
/* global window,console,setTimeout */
/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 10-11-2025.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 10-11-2025
 * @Description :- Design and control UI and animation effects for gameplay.
 ************************************/
import { Constant } from '../utils/Constant';
import { Utils } from '../utils/Utils';

class EffectsManager {
  constructor(_scene) {
    this.scene = _scene;
    this.effectManagerContainer = null;
    this.currentWidth = null;
    this.currentHeight = null;
    this.selectedColor = null;

    this.create();
  };

  //#region - Create function
  create() {
    this.effectManagerContainer = this.scene.add.container(window.innerWidth / 2, window.innerHeight / 2);
    this.effectManagerContainer.setDepth(4);

    this.CreateChooseColorSection();
    this.CreateChangeColorAnimation();
    this.CreateSkipTurn();
    this.CreateReverseTurn();
    this.CreateDraw4Icon();
    this.CreateDraw2Icon();
    this.CreateFingerAnimation();

  };
  //#endregion

  //#region -Choose color for draw and animation of select
  CreateChooseColorSection() {
    this.selectColorPanelContainer = this.scene.add.container(0, 0);
    this.selectColorPanelContainer.setVisible(false);
    this.chooseColorPanel = this.scene.add.image(0, 0, 'select_color_panel');
    this.chooseColorPanel.setInteractive();
    const selectColorTextStyle = { fontFamily: 'Poppins-SemiBold', fontSize: '46px', fill: '#FFF', fontStyle: 'bold', align: 'center' };
    this.selectColorText = this.scene.add.text(0, -90, Constant.SELECT_COLOR, selectColorTextStyle).setOrigin(0.5);

    this.selectColorPanelContainer.add([this.chooseColorPanel, this.selectColorText]);
    const startX = -200;
    const startY = 50;
    const gapX = 135;
    for (let i = 0; i < 4; i++) {
      const chooseColor = this.scene.add.sprite(startX + (i * gapX), startY, 'colors');
      chooseColor.setFrame(i);
      const color = Utils.GetColorFromIndex(i);
      chooseColor.color = color;
      chooseColor.setInteractive({ useHandCursor: true });
      chooseColor.on('pointerdown', () => this.OnColorPressed(chooseColor));
      this.selectColorPanelContainer.add(chooseColor);
    }
    this.effectManagerContainer.add(this.selectColorPanelContainer);
  };
  OnColorPressed(_this) {
    console.log('OnColorPressed _this: ', _this);
    this.selectedColor = _this.color;
    this.HideChooseColorSection();
    this.PlayChangeColorAnimation();
  };

  ShowChooseColorSection() {
    this.selectColorPanelContainer.setVisible(true);
  };
  HideChooseColorSection() {
    this.selectColorPanelContainer.setVisible(false);
  };
  //#endregion

  //#region -Changed color for draw animation and show selected
  CreateChangeColorAnimation() {
    this.changeColor = this.scene.add.sprite(0, 0, 'change_color').setVisible(false);
    if (!this.scene.anims.exists('change_color_anim')) {
      this.scene.anims.create({
        key: 'change_color_anim',
        frames: this.scene.anims.generateFrameNumbers('change_color', { start: 0, end: 16 }), // adjust total frames
        frameRate: 30,
        repeat: 2
      });
    }
    this.effectManagerContainer.add(this.changeColor);
  };
  PlayChangeColorAnimation() {
    this.changeColor.setVisible(true);
    this.changeColor.play('change_color_anim');
    this.changeColor.once('animationcomplete', () => {
      this.StopChangeColorAnimation(this.selectedColor);
    });
  };
  StopChangeColorAnimation(_color) {
    this.changeColor.anims.stop();
    const colorFrameMap = {
      green: 2,
      red: 6,
      yellow: 10,
      blue: 14
    };
    const frameIndex = colorFrameMap[_color] ?? 2;
    this.changeColor.setFrame(frameIndex);

    this.scene.time.delayedCall(500, () => {
      this.changeColor.setVisible(false);
    });
  };

  ShowChangeColorAnimation() {

  };
  HideChangeColorAnimation() {

  };
  //#endregion

  //#region -Skip Turn Icon
  CreateSkipTurn() {
    this.skipTurnIcon = this.scene.add.image(0, 0, 'skip_turn');
    this.effectManagerContainer.add(this.skipTurnIcon);
    this.skipTurnIcon.setVisible(false);
  };
  ShowSkipTurnIcon() {
    this.skipTurnIcon.setVisible(true);
  };
  HideSkipTurnIcon() {
    this.skipTurnIcon.setVisible(false);
  };
  //#endregion

  //#region -Reverse Turn Icon
  CreateReverseTurn() {
    this.reverseTurnIcon = this.scene.add.image(0, 0, 'change_clockwise');
    this.effectManagerContainer.add(this.reverseTurnIcon);
    this.reverseTurnIcon.setVisible(false);
  };
  ShowReverseTurnIcon() {
    this.reverseTurnIcon.setVisible(true);
  };
  HideReverseTurnIcon() {
    this.reverseTurnIcon.setVisible(false);
  };
  //#endregion

  //#region -Draw 4 Icon
  CreateDraw4Icon() {
    this.draw4Icon = this.scene.add.sprite(0, 0, 'draw_4').setVisible(false);
    if (!this.scene.anims.exists('draw_4_anim')) {
      this.scene.anims.create({
        key: 'draw_4_anim',
        frames: this.scene.anims.generateFrameNumbers('draw_4', { start: 0, end: 13 }), // adjust total frames
        frameRate: 30,
        repeat: 0
      });
    }
    this.effectManagerContainer.add(this.draw4Icon);
  };
  ShowDraw4Icon() {
    this.draw4Icon.setVisible(true);
    this.draw4Icon.play('draw_4_anim');
    this.draw4Icon.once('animationcomplete', () => {
      this.scene.time.delayedCall(500, () => {
        this.HideDraw4Icon();
      });
    });
  };
  HideDraw4Icon() {
    this.draw4Icon.anims.stop();
    this.draw4Icon.setVisible(false);
  };
  //#endregion

  //#region -Draw 2 Icon
  CreateDraw2Icon() {
    this.draw2Icon = this.scene.add.sprite(0, 0, 'draw_2').setVisible(false);
    if (!this.scene.anims.exists('draw_2_anim')) {
      this.scene.anims.create({
        key: 'draw_2_anim',
        frames: this.scene.anims.generateFrameNumbers('draw_2', { start: 0, end: 13 }), // adjust total frames
        frameRate: 30,
        repeat: 0
      });
    }
    this.effectManagerContainer.add(this.draw2Icon);
  };
  ShowDraw2Icon() {
    this.draw2Icon.setVisible(true);
    this.draw2Icon.play('draw_2_anim');
    this.draw2Icon.once('animationcomplete', () => {
      this.scene.time.delayedCall(500, () => {
        this.HideDraw2Icon();
      });
    });
  };
  HideDraw2Icon() {
    this.draw2Icon.anims.stop();
    this.draw2Icon.setVisible(false);
  };
  //#endregion

  //#region -Finger animation for draw card 
  CreateFingerAnimation() {
    this.fingerIcon = this.scene.add.sprite(-110, -120, 'finger').setVisible(false);
    this.fingerIcon.setScale(0.5);

    if (!this.scene.anims.exists('finger_anim')) {
      this.scene.anims.create({
        key: 'finger_anim',
        frames: this.scene.anims.generateFrameNumbers('finger', { start: 0, end: 9 }), // adjust total frames
        frameRate: 30,
        repeat: 1
      });
    }
    this.effectManagerContainer.add(this.fingerIcon);
  };

  ShowFingerAnimation() {
    this.fingerIcon.setVisible(true);
    this.fingerIcon.play('finger_anim');
    this.fingerIcon.once('animationcomplete', () => {
      this.scene.time.delayedCall(300, () => {
        this.HideFingerAnimation();
      });
    });
  };
  HideFingerAnimation() {
    this.fingerIcon.setVisible(false);
  };
  //#endregion

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
    this.effectManagerContainer.setScale(_newScale);
    this.effectManagerContainer.setPosition((_newWidth / 2), (_newHeight / 2));

  };
  //#endregion

};

export default EffectsManager;