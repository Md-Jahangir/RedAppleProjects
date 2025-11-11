/* eslint-disable no-unused-vars */
/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 17-02-2025.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 21-03-2025
 * @Description :- Shows Level Up.
 ************************************/

import { Constant } from '../Constant';
import gsap from 'gsap';
import ButtonTween from '../game-objects/ButtonTween';
import { AudioManager } from '../media/AudioManager';
import { PlayzhubEventHandler } from '../PlayzhubEventHandler';
import * as GA from 'gameanalytics';

class LevelUpPopup {
  constructor(scene) {
    this.scene = scene;

    this.lvlUpAnimName = null;
    this.shineArray = [];

    this.CreateLevelUpPopup();
    this.CreateLevelFailPopup();
    this.HideLevelFailPopup();
    this.HideLevelUpPopup();
  }

  CreateLevelUpPopup() {
    this.overlay = this.scene.add.image(0, 0, 'overlay').setOrigin(0.5).setInteractive({ useHandCursor: true });
    this.levelUpContainer = this.scene.add.container();//.setDepth(2);
    this.lvlCompleteAnim = this.scene.add.spine(0, 0, 'leveldone_data', 'leveldone_atlas');
    this.upBtnBase = this.scene.add.image(this.lvlCompleteAnim.x, this.lvlCompleteAnim.y + 405, 'nxtBtn_base').setOrigin(0.5).setScale(0);
    let fontTextStyle = { fontFamily: 'Anja Eliane', fontSize: '36px', fill: '#ffffff', align: 'center', lineSpacing: 20 };
    let txt = 'N E X T';
    this.upbtnTxt = this.scene.add.text(this.upBtnBase.x + 7, this.upBtnBase.y + 5, txt, fontTextStyle).setOrigin(0.5).setScale(0);
    this.upbtnTxt.setStroke('#7d32c0', 6);
    fontTextStyle = { fontFamily: 'Anja Eliane', fontSize: '40px', fill: '#ffffff', align: 'center', lineSpacing: 20 };
    txt = 'LEVEL 1 COMPLETED';
    this.levelCompletionTxt = this.scene.add.text(this.lvlCompleteAnim.x, this.lvlCompleteAnim.y - 650, txt, fontTextStyle).setOrigin(0.5).setAlpha(0);//.setVisible(false);
    fontTextStyle = { fontFamily: 'Anja Eliane', fontSize: '40px', fill: '#ffffff', align: 'center', lineSpacing: 20 };
    txt = 'TIME: 135 SEC';
    this.timeConsumedTxt = this.scene.add.text(this.levelCompletionTxt.x, this.levelCompletionTxt.y + 80, txt, fontTextStyle).setOrigin(0.5).setAlpha(0);//.setVisible(false);
    fontTextStyle = { fontFamily: 'Anja Eliane', fontSize: '30px', fill: '#ad63a3', align: 'center', lineSpacing: 20 };
    txt = 'SCORE';
    this.scoreTxt = this.scene.add.text(this.lvlCompleteAnim.x - 55, this.lvlCompleteAnim.y - 20, txt, fontTextStyle).setOrigin(0.5).setScale(0);
    fontTextStyle = { fontFamily: 'Anja Eliane', fontSize: '45px', fill: '#ad63a3', align: 'center', lineSpacing: 20 };
    txt = '100';
    this.scoreNum = this.scene.add.text(this.scoreTxt.x + 260, this.scoreTxt.y, txt, fontTextStyle).setOrigin(0.5).setScale(0);
    fontTextStyle = { fontFamily: 'Anja Eliane', fontSize: '28px', fill: '#ad63a3', align: 'center', lineSpacing: 1 };
    txt = 'TIME\n BONUS';
    this.timeBonusTxt = this.scene.add.text(this.scoreTxt.x, this.scoreTxt.y + 88, txt, fontTextStyle).setOrigin(0.5).setScale(0);
    fontTextStyle = { fontFamily: 'Anja Eliane', fontSize: '45px', fill: '#ad63a3', align: 'center', lineSpacing: 20 };
    txt = '45';
    this.timeNum = this.scene.add.text(this.timeBonusTxt.x + 255, this.timeBonusTxt.y, txt, fontTextStyle).setOrigin(0.5).setScale(0);
    fontTextStyle = { fontFamily: 'Anja Eliane', fontSize: '32px', fill: '#fff8e0', align: 'center', lineSpacing: 1 };
    txt = 'TOTAL\n SCORE';
    this.totalScoreTxt = this.scene.add.text(this.timeBonusTxt.x, this.timeBonusTxt.y + 122, txt, fontTextStyle).setOrigin(0.5).setScale(0);
    fontTextStyle = { fontFamily: 'Anja Eliane', fontSize: '45px', fill: '#fff8e0', align: 'center', lineSpacing: 20 };
    txt = '145';
    this.totalNum = this.scene.add.text(this.totalScoreTxt.x + 255, this.totalScoreTxt.y, txt, fontTextStyle).setOrigin(0.5).setScale(0);

    this.shineArray = [this.upBtnBase, this.scoreTxt, this.scoreNum, this.timeBonusTxt, this.timeNum, this.totalScoreTxt, this.totalNum];

    this.upBtnBase.on('pointerdown', this.OnClickingNextBtn, this);

    this.levelUpContainer.add([this.lvlCompleteAnim, this.upBtnBase, this.upbtnTxt, this.levelCompletionTxt, this.timeConsumedTxt, this.scoreTxt, this.scoreNum, this.timeBonusTxt, this.timeNum, this.totalScoreTxt, this.totalNum]);

  }

  CreateLevelFailPopup() {
    this.lvlFailPopUpContainer = this.scene.add.container();//.setDepth(3);
    this.failedAnim = this.scene.add.spine(0, 0, 'level_fail_data', 'level_fail_atlas').setOrigin(0.5);
    let fontTextStyle = { fontFamily: 'Anja Eliane', fontSize: '45px', fill: '#ffffff', align: 'center', lineSpacing: 20 };
    let txt = 'Time is up';
    this.lvlFailTxt = this.scene.add.text(this.failedAnim.x, this.failedAnim.y + 50, txt, fontTextStyle).setOrigin(0.5);
    this.lvlFailTxt.setStroke('#f6acff', 6);
    this.lvlFailTxt.setShadow(0, 5, '#9546cb', 2, true, false);

    this.lvlFailPopUpContainer.add([this.failedAnim, this.lvlFailTxt]);

    //Bottom Panel
    this.bottomFailPopUpContainer = this.scene.add.container();
    this.btnBase = this.scene.add.image(0, 0, 'btn_base').setOrigin(0.5).setInteractive({ useHandCursor: true });
    fontTextStyle = { fontFamily: 'Anja Eliane', fontSize: '45px', fill: '#fff8e0', align: 'center', lineSpacing: 20 };
    txt = 'TRY AGAIN';
    this.btnTxt = this.scene.add.text(this.btnBase.x, this.btnBase.y - 5, txt, fontTextStyle).setOrigin(0.5);
    this.btnTxt.setStroke('#a26ec7', 6);
    this.adBtn = this.scene.add.image(this.btnBase.x + (this.btnBase.width / 2), this.btnBase.y - (this.btnBase.height / 6), 'ad_icon').setOrigin(0.5).setVisible(false);//.setInteractive({ useHandCursor: true });

    this.btnBase.on('pointerdown', this.OnClickingTryAgain, this);

    this.bottomFailPopUpContainer.add([this.btnBase, this.btnTxt, this.adBtn]);
  }

  ShowLevelUpPopup(_level) {
    GA.GameAnalytics.addProgressionEvent(
      'Complete',
      'cake_sort_level',
      Constant.setLevel,
      undefined,
      Constant.gameScore
    );

    GA.GameAnalytics.addDesignEvent('score:cake_sort', Constant.gameScore);

    this.overlay.setVisible(true);
    this.levelUpContainer.setVisible(true);
    this.upbtnTxt.setText(`NEXT LVL ${parseInt(_level) + 1}`);
    this.levelCompletionTxt.setText(`LEVEL ${_level} COMPLETED`);
    this.timeConsumedTxt.setText(`TIME: ${this.scene.startTime - Constant.timeToEnd} SEC`);
    if (Constant.gameScore.toString().length >= 4) {
      this.scoreNum.setStyle({ fontSize: '38px' });
      this.totalNum.setStyle({ fontSize: '38px' });
    }
    this.scoreNum.setText(Constant.gameScore);
    this.timeNum.setText(Constant.timeToEnd);
    const totalScore = Constant.gameScore + parseInt(Constant.timeToEnd);
    Constant.gameScore = totalScore;
    this.totalNum.setText(Constant.gameScore);

    const currentTimeStamp = Date.now();
    const finalTime = currentTimeStamp - Constant.gameStartTime;
    PlayzhubEventHandler.GameScoreUpdate(finalTime / 1000, Constant.gameScore);
    this.lvlCompleteAnim.animationState.setAnimation(0, 'well_done_appear', false);
    this.lvlCompleteAnim.timeScale = 4; // 2x speed
    this.lvlUpAnimName = 'well_done_appear';
    this.LevelData();
    this.ShowGameScores();
    this.lvlCompleteAnim.animationState.addListener({
      complete: (entry) => {
        if (this.lvlUpAnimName === 'well_done_appear') {
          this.lvlCompleteAnim.animationState.setAnimation(0, 'well_done_loop', true);
          this.lvlUpAnimName = 'well_done_loop';
          this.upBtnBase.setVisible(true);
          // this.scene.time.delayedCall(50, () => { // Adjust time as needed
          this.lvlUpAnimName = null;
          // });
        }
      }
    });
  }

  LevelData() {
    gsap.to([this.levelCompletionTxt, this.timeConsumedTxt], {
      // delay: 0.15,
      duration: 0.4,
      alpha: 1,
      ease: 'sine.easeIn',
    });
  }

  ShowGameScores() {
    const timeline = gsap.timeline();

    timeline
      .to(this.scoreTxt, { duration: 0.4, scale: 1, ease: 'expo.in' })
      .to(this.scoreNum, { duration: 0.4, scale: 1, ease: 'expo.in' })
      .to(this.timeBonusTxt, { duration: 0.4, scale: 1, ease: 'expo.in' })
      .to(this.timeNum, { duration: 0.4, scale: 1, ease: 'expo.in' })
      .to([this.totalScoreTxt, this.totalNum], { duration: 0.4, scale: 1, ease: 'expo.in' })
      .add(() => this.ShowNextButton());
  }

  ShowNextButton() {
    gsap.fromTo([this.upBtnBase, this.upbtnTxt],
      { scale: 1.4 },
      {
        duration: 0.3,
        scale: 1,
        ease: 'expo.in',
        onComplete: () => {
          this.upBtnBase.setInteractive({ useHandCursor: true });
          this.shineArray.forEach(obj => {
            obj.postFX.addShine(1, 0.2, 2.5);
          });
        }
      }
    );
  }

  OnClickingNextBtn() {
    GA.GameAnalytics.addDesignEvent('ui: next_clicked');
    AudioManager.PlayButtonPressAudio();
    this.btnTween = new ButtonTween(this.scene, this.upBtnBase, this.upbtnTxt);
    this.scene.ShowAd();
    this.scene.CreateTimer();
    this.btnTween.btnTween.on('complete', () => {
      this.HideLevelUpPopup();
    });
  }

  OnClickingTryAgain() {
    GA.GameAnalytics.addDesignEvent('ui:replay_clicked');
    AudioManager.PlayButtonPressAudio();
    this.btnTween = new ButtonTween(this.scene, this.btnBase, this.btnTxt, this.adBtn, 0.85, 0.85, 150, 1, true);
    this.btnTween.btnTween.on('complete', () => {
      Constant.showTutPages = false;
      this.scene.isReplay = true;
      this.scene.adHitFrom = 'level_failed';
      setTimeout(() => {
        this.HideLevelFailPopup();
        // this.scene.ShowAd();
        this.scene.scene.restart({ 'isReplay': this.isReplay });
      }, 100);
    });
  }

  HideLevelUpPopup() {
    this.levelUpContainer.setVisible(false);
    this.overlay.setVisible(false);
    this.scoreTxt.setScale(0);
    this.scoreNum.setScale(0);
    this.timeBonusTxt.setScale(0);
    this.timeNum.setScale(0);
    this.totalScoreTxt.setScale(0);
    this.totalNum.setScale(0);
    this.upBtnBase.setScale(0);
    this.upbtnTxt.setScale(0);
    this.levelCompletionTxt.setAlpha(0);
    this.timeConsumedTxt.setAlpha(0);
  }

  ShowLvlFailPopup() {
    GA.GameAnalytics.addProgressionEvent(
      'Fail',
      'cake_sort_level',
      Constant.setLevel,  // progression02
      undefined,  // progression03
      Constant.gameScore
    );

    GA.GameAnalytics.addDesignEvent('score:cake_sort', Constant.gameScore);

    this.lvlFailPopUpContainer.setVisible(true);
    this.bottomFailPopUpContainer.setVisible(true);
    this.overlay.setVisible(true);
    this.failedAnim.animationState.setAnimation(0, 'oops_appear', false);

    this.failedAnim.animationState.addListener({
      complete: (entry) => {
        this.failedAnim.animationState.setAnimation(0, 'oops_loop', true);
      }
    });
  }

  HideLevelFailPopup() {
    this.lvlFailPopUpContainer.setVisible(false);
    this.bottomFailPopUpContainer.setVisible(false);
    this.overlay.setVisible(false);
  }

  ResizeLevelPopupContainer(_newWidth, _newHeight, newScale) {
    this.overlay.setDisplaySize(_newWidth, _newHeight);
    this.overlay.setPosition(
      _newWidth / 2,
      _newHeight / 2
    );

    this.levelUpContainer.setScale(newScale);
    this.levelUpContainer.setPosition(_newWidth / 2, _newHeight / 2);
    this.lvlFailPopUpContainer.setScale(newScale);
    this.lvlFailPopUpContainer.setPosition(_newWidth / 2, _newHeight / 2);
    this.bottomFailPopUpContainer.setScale(newScale);
    this.bottomFailPopUpContainer?.setPosition(_newWidth / 2, (_newHeight / 1) - (115 * newScale));
  }
}

export default LevelUpPopup;