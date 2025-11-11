/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 20-09-2024.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 20-09-2024
 * @Description :- Design and handling for Gameover popup.
 ************************************/

import ButtonTween from '../game-objects/ButtonTween';
import * as GA from 'gameanalytics';

class GameOverPopup {
  constructor(scene) {
    this.scene = scene;
    this.gameOverPopupContainer = null;

    this.CreatePopup();
    this.HideGameOverPopup();
  }

  CreatePopup() {
    this.gameOverPopupContainer = this.scene.add.container().setDepth(2);
    this.overlay = this.scene.add.image(540, 960, 'info_overlay').setOrigin(0.5).setScale(1080, 1920).setInteractive({ useHandCursor: true });
    this.gameOverBase = this.scene.add.image(540, 960, 'victory_base').setOrigin(0.5);
    let fontTextStyle = { fontFamily: 'Fredoka-Bold', fontSize: '72px', fill: '#ffefd7', align: 'center', lineSpacing: 20 };
    let txt = 'Score : ';
    this.scoreTxt = this.scene.add.text(this.gameOverBase.x - 80, this.gameOverBase.y - 40, txt, fontTextStyle).setOrigin(0.5);
    const gameScore = 0;
    fontTextStyle = { fontFamily: 'Fredoka-Bold', fontSize: '72px', fill: '#ffefd7', align: 'center', lineSpacing: 20 };
    this.gameScoreTxt = this.scene.add.text(this.scoreTxt.x + 200, this.scoreTxt.y, gameScore, fontTextStyle).setOrigin(0.5);
    fontTextStyle = { fontFamily: 'Fredoka-Bold', fontSize: '45px', fill: '#ffefd7', align: 'center', lineSpacing: 20 };
    txt = 'Time Used : ';
    this.timeTxt = this.scene.add.text(this.scoreTxt.x + 25, this.scoreTxt.y + 90, txt, fontTextStyle).setOrigin(0.5);

    //Buttons
    this.menuBtn = this.scene.add.image(this.timeTxt.x - 100, this.timeTxt.y + 180, 'buy_btn_1').setOrigin(0.5).setInteractive({ useHandCursor: true });
    fontTextStyle = { fontFamily: 'Fredoka-Bold', fontSize: '50px', fill: '#ffefd7', align: 'center' };
    txt = 'MENU';
    this.menuBtnText = this.scene.add.text(this.menuBtn.x, this.menuBtn.y, txt, fontTextStyle).setOrigin(0.5);

    this.replayBtn = this.scene.add.image(this.menuBtn.x + 310, this.menuBtn.y, 'buy_btn_2').setOrigin(0.5).setInteractive({ useHandCursor: true });
    fontTextStyle = { fontFamily: 'Fredoka-Bold', fontSize: '50px', fill: '#ffefd7', align: 'center' };
    txt = 'REPLAY';
    this.replayBtnText = this.scene.add.text(this.replayBtn.x, this.replayBtn.y, txt, fontTextStyle).setOrigin(0.5);

    this.menuBtn.on('pointerup', this.OnPressingMenuBtn, this);
    this.replayBtn.on('pointerup', this.OnPressingReplayBtn, this);

    this.gameOverPopupContainer.add([this.overlay, this.gameOverBase, this.scoreTxt, this.gameScoreTxt, this.timeTxt, this.menuBtn, this.menuBtnText, this.replayBtn, this.replayBtnText]);

    // this.gameOverPopupContainer.x = this.scene.gameplayBg.x + (this.scene.gameplayBg.displayWidth * 1.5);
  }

  TweenGameOverPopupToScreen() {
    this.gameoverPopuptweenIn = this.scene.tweens.add({
      targets: this.gameOverPopupContainer,
      x: 0,
      ease: 'Linear',
      duration: 700,
      yoyo: false,
      repeat: 0,
    });
  }

  OnPressingMenuBtn() {
    GA.GameAnalytics.addDesignEvent('ui: menu_clicked');
    const btnTween = new ButtonTween(this.scene, this.menuBtn, this.menuBtnText);
    btnTween.btnTween.on('complete', () => {
      // this.scene.cameras.main.fadeOut(800);
      // this.scene.scene.restart('GameScene');
      // this.scene.start('MenuScene');
    });
  }

  OnPressingReplayBtn() {
    GA.GameAnalytics.addDesignEvent('ui:replay_clicked');
    new ButtonTween(this.scene, this.replayBtn, this.replayBtnText);
  }

  ShowGameOverPopup() {
    this.gameOverPopupContainer.setVisible(true);
  }

  HideGameOverPopup() {
    this.gameOverPopupContainer.setVisible(false);
  }

  ResizeGameOverPopupContainer(_newWidth, _newHeight, newScale) {
    this.gameOverPopupContainer.setScale(newScale);
    this.gameOverPopupContainer.setPosition(_newWidth, 0);
  }
}

export default GameOverPopup;