
/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 20-09-2024.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 14-11-2024
 * @Description :- Shows Level Up.
 ************************************/

import { Constant } from '../Constant';

class LevelUpPopup {
  constructor(scene) {
    this.scene = scene;

    this.CreatePopup();
    this.CreateSublevelPopup();
    this.HideSubLvlPopup();
    this.HidePopup();
  }

  CreatePopup() {
    this.popUpContainer = this.scene.add.container().setDepth(2);
    this.spineContainer = this.scene.add.container().setDepth(2);
    this.overlay = this.scene.add.image(0, 0, 'info_overlay').setOrigin(0.5).setScale(1080, 1920).setInteractive({ useHandCursor: true });
    this.lvlCompleteBase = this.scene.add.spine(0, 0, 'lvlup');
    let fontTextStyle = { fontFamily: 'Fredoka-Bold', fontSize: '40px', fill: '#ffffff', align: 'center', lineSpacing: 20 };
    let txt = '0';
    this.levelScoreTxt = this.scene.add.text(this.lvlCompleteBase.x + 10, this.lvlCompleteBase.y + 120, txt, fontTextStyle).setOrigin(0.5).setVisible(false);
    this.levelScoreTxt.setStroke('#892209', 6);
    this.clapRabbitLvl = this.scene.add.spine(-300, 1125, 'rabbit_exp');
    fontTextStyle = { fontFamily: 'Fredoka-Bold', fontSize: '48px', fill: '#fffffe', align: 'center', lineSpacing: 20 };
    txt = 'TAP TO CONTINUE';
    this.continueTxt = this.scene.add.text(this.clapRabbitLvl.x + 318, 650 + 133, txt, fontTextStyle).setOrigin(0.5).setVisible(false);

    // this.overlay.on('pointerup', this.RemoveLvlPopup, this);

    this.popUpContainer.add([this.overlay, this.lvlCompleteBase, this.levelScoreTxt]);
    this.spineContainer.add([this.clapRabbitLvl, this.continueTxt]);
  }

  RemoveLvlPopup() {
    // this.scene.events.emit('reset');
    this.scene.ResetGrid();
    this.HidePopup();
    this.scene.gameState = 'playing';
    this.scene.CheckIdleScreen();
  }

  CreateSublevelPopup() {
    this.subLvlPopUpContainer = this.scene.add.container().setDepth(2);
    this.spineSubLvlContainer = this.scene.add.container().setDepth(2);
    this.subLvlOverlay = this.scene.add.image(0, 0, 'info_overlay').setOrigin(0.5).setScale(1080, 1920).setInteractive({ useHandCursor: true });
    this.subLvlbase = this.scene.add.spine(0, 0, 'perfect');//.setOrigin(0.5);
    let fontTextStyle = { fontFamily: 'Fredoka-Bold', fontSize: '40px', fill: '#7e1b03', align: 'center', lineSpacing: 20 };
    let txt = 'LEVEL';
    this.lvlTxt = this.scene.add.text(0, 52, txt, fontTextStyle).setOrigin(0.5).setVisible(false);
    fontTextStyle = { fontFamily: 'Fredoka-Bold', fontSize: '35px', fill: '#ffffff', align: 'center', lineSpacing: 20 };
    txt = `${Constant.sLvlCount}/20`;
    this.subLvlCount = this.scene.add.text(this.lvlTxt.x - 5, this.lvlTxt.y + 50, txt, fontTextStyle).setOrigin(0.5).setVisible(false);
    this.subLvlCount.setStroke('#892209', 6);
    this.clapRabbit = this.scene.add.spine(-300, 1125, 'rabbit_exp');
    fontTextStyle = { fontFamily: 'Fredoka-Bold', fontSize: '48px', fill: '#fffffe', align: 'center', lineSpacing: 20 };
    txt = 'TAP TO CONTINUE';
    this.continueTxt = this.scene.add.text(this.clapRabbit.x + 318, 650 + 133, txt, fontTextStyle).setOrigin(0.5).setVisible(false);

    // this.subLvlOverlay.on('pointerup', this.RemoveSubLvlPopup, this);

    this.subLvlPopUpContainer.add([this.subLvlOverlay, this.subLvlbase, this.lvlTxt, this.subLvlCount]);
    this.spineSubLvlContainer.add([this.clapRabbit, this.continueTxt]);
  }

  RemoveSubLvlPopup() {

    // this.scene.events.emit('reset');
    this.scene.ResetGrid();
    this.HideSubLvlPopup();
    this.scene.gameState = 'playing';
    this.scene.CheckIdleScreen();
  }

  TweenSublevelPopup() {
    this.sLvlPopuptweenIn = this.scene.tweens.add({
      targets: this.subLvlPopUpContainer,
      scaleX: 1080, // Scale up from 1 to 1.5
      scaleY: 1920,
      ease: 'Linear',
      duration: 500,
      yoyo: false,
      repeat: 0,
    });
  }


  TweenPopupToScreen() {
    this.lvlPopuptweenIn = this.scene.tweens.add({
      targets: this.popUpContainer,

      // props: {
      x: 0,
      ease: 'Linear',
      duration: 1500,
      yoyo: false,
      repeat: 0,
    });
  }

  TweenPopupOutOfScreen() {
    this.lvlPopuptweenOut = this.scene.tweens.add({
      targets: this.popUpContainer,


      x: -1080,

      ease: 'Linear',
      duration: 1500,
      yoyo: false,
      repeat: 0,
      onComplete: () => {
        this.ResizeLevelPopupCOntainer(Constant.clientWidth, Constant.clientHeight, Constant.newScale);
        // this.levelPopup.lvlPopuptweenOut.off('complete');
        this.HidePopup();
      }
    });
  }

  ShowPopup() {
    this.popUpContainer.setVisible(true);
    this.spineContainer.setVisible(true);
    this.lvlCompleteBase.play('animation', false);
    this.clapRabbitLvl.play('Hand_Clap', false);
    this.clapRabbitLvl.on('complete', () => {
      this.clapRabbitLvl.play('Hand_Clap_Loop', true);
    });
    this.lvlCompleteBase.on('complete', () => {
      this.levelScoreTxt.setVisible(true);
    });
  }

  HidePopup() {
    // this.scene.events.off('reset');
    this.popUpContainer.setVisible(false);
    this.spineContainer.setVisible(false);
    this.levelScoreTxt.setVisible(false);
  }

  ShowSubLvlPopup() {
    this.subLvlPopUpContainer.setVisible(true);
    this.spineSubLvlContainer.setVisible(true);
    this.clapRabbit.play('Hand_Clap', false);
    this.clapRabbit.on('complete', () => {
      this.clapRabbit.play('Hand_Clap_Loop', true);
    });
    this.subLvlbase.play('animation2', false);
    this.subLvlbase.on('complete', () => {
      this.lvlTxt.setVisible(true);
      this.subLvlCount.setVisible(true);
    });
  }

  HideSubLvlPopup() {
    // this.scene.events.off('reset');
    this.subLvlPopUpContainer.setVisible(false);
    this.spineSubLvlContainer.setVisible(false);
    this.lvlTxt.setVisible(false);
    this.subLvlCount.setVisible(false);
  }

  ResizeLevelPopupCOntainer(_newWidth, _newHeight, newScale) {
    this.popUpContainer.setScale(newScale);
    this.popUpContainer.setPosition(_newWidth / 2, _newHeight / 2);
    this.subLvlPopUpContainer.setScale(newScale);
    this.subLvlPopUpContainer.setPosition(_newWidth / 2, _newHeight / 2);
    this.spineContainer.setScale(newScale);
    this.spineContainer.setPosition(_newWidth / 2, _newHeight - (985 * newScale));
    this.spineSubLvlContainer.setScale(newScale);
    this.spineSubLvlContainer.setPosition(_newWidth / 2, _newHeight - (985 * newScale));
  }
}

export default LevelUpPopup;