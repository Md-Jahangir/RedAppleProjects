
/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 19-09-2024.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 13-11-2024
 * @Description :- Game Tutorial.
 ************************************/
import { Constant } from '../Constant';
import ButtonTween from '../game-objects/ButtonTween';
import gsap from 'gsap';
import { AudioManager } from '../media/AudioManager';
// import { duration } from 'moment';
import * as GA from 'gameanalytics';

class InfoPopup {
  constructor(scene) {
    this.scene = scene;

    this.msgTxtOne = 'LOCATE THE GIVEN WORDS IN THE GRID, RUNNING IN ONE OF THREE\n POSSIBLE DIRECTIONS HORIZONTALLY, VERTICALLY,\n OR DIAGONALLY';

    this.msgTxtTwo = 'YOU CAN USE THE                          TO FIND\n THE CORRECT WORD.\nREMEMBER YOU HAVE ONLY 5 HINTS';
    this.hint = '"HINT"';
    this.crspndgColorLetterKeyNum = 0;
    this.canAnimate = true;
    this.fWArr = [];
    this.sWArr = [];
    this.tWArr = [];
    this.wArrNum = 1;
    this.wArr = null;
    this.index = 0;

    this.CreateInfoOneUI();
    this.CreateInfoTwoUI();
    this.CreateBottomPanel();
    this.HideInfo();
  }

  CreateInfoOneUI() {
    // this.tutorialInfoContainer = this.scene.add.container();
    this.infoUIContainerOne = this.scene.add.container().setName(1);

    this.boardOne = this.scene.add.image(0, 29.69, 'info_board_2').setOrigin(0.5);
    this.infoWords = this.scene.add.image(this.boardOne.x, this.boardOne.y - 620, 'info_words').setOrigin(0.5);
    this.overlay = this.scene.add.image(0, 0, 'info_overlay').setOrigin(0.5).setScale(2000, 1920).setInteractive({ useHandCursor: true });
    this.zebraTxt = this.scene.add.image(this.infoWords.x - 270, this.infoWords.y - 60, 'tut_tiles', 'zebra').setOrigin(0.5);
    this.monkeyTxt = this.scene.add.image(this.zebraTxt.x + 265, this.zebraTxt.y, 'tut_tiles', 'monkey').setOrigin(0.5);
    this.ratTxt = this.scene.add.image(this.monkeyTxt.x + 80, this.monkeyTxt.y + 110, 'tut_tiles', 'rat').setOrigin(0.5);

    for (let i = 0; i < 5; i++) {
      const frameName = `fword_${i + 1}`;
      const fWord = this.scene.add.sprite(this.boardOne.x + 345, this.boardOne.y - 360, 'tut_tiles', frameName).setOrigin(0.5).setName(frameName);
      this.fWArr.push(fWord);

      if (i > 0) this.fWArr[i].setPosition(this.fWArr[i - 1].x - 115, this.fWArr[i - 1].y + 120);
    }

    for (let i = 0; i < 6; i++) {
      const frameName = `sword_${i + 1}`;
      const sWord = this.scene.add.sprite(this.boardOne.x - (this.boardOne.width / 2.5), this.boardOne.y - 245, 'tut_tiles', frameName).setOrigin(0.5).setName(frameName);
      this.sWArr.push(sWord);

      if (i > 0) sWord.y = this.sWArr[i - 1].y + 120;
    }

    for (let i = 0; i < 3; i++) {
      const frameName = `tword_${i + 1}`;
      const tword = this.scene.add.sprite(this.sWArr[this.sWArr.length - 1].x + 115, this.sWArr[this.sWArr.length - 1].y, 'tut_tiles', frameName).setOrigin(0.5).setName(frameName);
      this.tWArr.push(tword);

      if (i > 0) this.tWArr[i].x = this.tWArr[i - 1].x + 115;
    }

    this.hand = this.scene.add.image(0, 0, 'palm').setOrigin(0.5).setVisible(false);
    const fontTextStyle = { fontFamily: 'Fredoka-Bold', fontSize: '28px', fill: '#ffefd7', align: 'center', lineSpacing: 20 };
    this.infoTextOne = this.scene.add.text(this.boardOne.x - 440, this.boardOne.y + 470, this.msgTxtOne, fontTextStyle).setOrigin(0);

    this.infoUIContainerOne.add([this.boardOne, this.infoWords, this.overlay, this.zebraTxt, this.monkeyTxt, this.ratTxt, ...this.fWArr, ...this.sWArr, ...this.tWArr, this.hand, this.infoTextOne]);
  }

  CreateInfoTwoUI() {
    this.infoUIContainerTwo = this.scene.add.container().setName(2);

    this.boardTwo = this.scene.add.image(0, 0, 'info_board_1').setOrigin(0.5);//.setVisible(false);
    this.infoWordsTwo = this.scene.add.image(this.boardTwo.x, this.boardTwo.y - 620, 'info_words').setOrigin(0.5).setVisible(true);
    this.zebra = this.scene.add.image(this.infoWordsTwo.x - 270, this.infoWordsTwo.y - 60, 'tut_tiles', 'zebra_1').setOrigin(0.5);
    this.monkey = this.scene.add.image(this.zebra.x + 265, this.zebra.y, 'tut_tiles', 'monkey').setOrigin(0.5);
    this.rat = this.scene.add.image(this.monkey.x + 80, this.monkey.y + 110, 'tut_tiles', 'rat').setOrigin(0.5);
    this.overlayTwo = this.scene.add.image(0, 0, 'info_overlay').setOrigin(0.5).setScale(2000, 1920).setInteractive({ useHandCursor: true });
    let fontTextStyle = { fontFamily: 'Fredoka-Bold', fontSize: '36px', fill: '#ffefd7', align: 'center', lineSpacing: 25 };
    this.infoTextTwo = this.scene.add.text(this.boardTwo.x - 330, this.boardTwo.y + 260, this.msgTxtTwo, fontTextStyle).setOrigin(0).setVisible(true);
    fontTextStyle = { fontFamily: 'Fredoka-Bold', fontSize: '53px', fill: '#ffefd7', align: 'center', lineSpacing: 20 };
    this.hintWord = this.scene.add.text(this.infoTextTwo.x + 330, this.infoTextTwo.y - 10, this.hint, fontTextStyle).setOrigin(0).setVisible(true);
    this.arrow = this.scene.add.image(this.infoTextTwo.x + 470, this.infoTextTwo.y + 280, 'arrow').setOrigin(0.5).setVisible(true);
    this.glow = this.scene.add.image(this.arrow.x - 180, this.arrow.y + 120, 'glow_hint').setOrigin(0.5).setVisible(true);
    this.ShowGlowAnimation(this.glow);
    this.infoHint = this.scene.add.image(this.glow.x, this.glow.y, 'info_hint').setOrigin(0.5).setVisible(true);

    this.infoUIContainerTwo.add([this.boardTwo, this.infoWordsTwo, this.zebra, this.monkey, this.rat, this.overlayTwo, this.infoTextTwo, this.hintWord, this.arrow, this.glow, this.infoHint]);


    // this.infoUIContainerTwo.x = this.scene.gameplayBg.x + (this.scene.gameplayBg.displayWidth * 2);
    // this.tutorialInfoContainer.add(this.infoUIContainerTwo);
  }

  CreateBottomPanel() {
    this.bottomPanelContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2);

    this.skipBtn = this.scene.add.image(-357, -220, 'buy_btn_1').setOrigin(0.5).setInteractive({ useHandCursor: true });
    let fontTextStyle = { fontFamily: 'Fredoka-Bold', fontSize: '50px', fill: '#ffefd7', align: 'center' };
    let text = 'Skip';
    this.sBtnText = this.scene.add.text(this.skipBtn.x + 5, this.skipBtn.y - 10, text, fontTextStyle).setOrigin(0.5);
    this.nxtBtn = this.scene.add.image(310, this.skipBtn.y, 'buy_btn_2').setOrigin(0.5).setInteractive({ useHandCursor: true });
    fontTextStyle = { fontFamily: 'Fredoka-Bold', fontSize: '50px', fill: '#ffefd7', align: 'center' };
    text = 'Next';
    this.nBtnText = this.scene.add.text(this.nxtBtn.x + 5, this.nxtBtn.y - 10, text, fontTextStyle).setOrigin(0.5);
    this.pageMarkOne = this.scene.add.image(this.skipBtn.x + 310, this.skipBtn.y + 150, 'page_mark_1').setOrigin(0.5);
    this.pageMarkTwo = this.scene.add.image(this.pageMarkOne.x + 45, this.pageMarkOne.y, 'page_mark_2').setOrigin(0.5);

    this.skipBtn.on('pointerup', this.OnPressingSkipBtn, this);
    this.nxtBtn.on('pointerup', this.OnPressingNextBtn, this);

    this.bottomPanelContainer.add([this.skipBtn, this.sBtnText, this.nxtBtn, this.nBtnText, this.pageMarkOne, this.pageMarkTwo]);
  }

  ShowGlowAnimation(_gameObj) {
    gsap.to(_gameObj, {
      duration: 500,
      repeat: -1,
      rotation: 360,
      ease: 'none',
    });
  }

  OnPressingSkipBtn() {
    GA.GameAnalytics.addDesignEvent('ui:tutorial_skip_clicked');
    this.btnTween = new ButtonTween(this.scene, this.skipBtn, this.sBtnText);
    AudioManager.PlayButtonPressAudio();
    this.btnTween.btnTween.on('complete', this.AfterPressingInfoPageButtons, this);
  }
  OnPressingNextBtn() {
    GA.GameAnalytics.addDesignEvent('ui:tutorial_next_clicked');
    this.btnTween = new ButtonTween(this.scene, this.nxtBtn, this.nBtnText);
    AudioManager.PlayButtonPressAudio();
    this.btnTween.btnTween.on('complete', this.AfterPressingInfoPageButtons, this);
  }

  AfterPressingInfoPageButtons() {
    // console.log('changing pages');

    switch (this.btnTween.btnTxt.text) {
      case 'Pre': this.TweenInfoPages((-this.scene.gameplayBg.displayWidth * 2), this.infoUIContainerTwo);
        this.animation?.pause();
        this.animation?.kill();
        this.animation = null;

        this.handTween?.remove();
        this.handTween = null;
        this.canAnimate = true;
        this.ResetHandTutorial();

        break;

      case 'Next': this.TweenInfoPages((-this.scene.gameplayBg.displayWidth * 2), this.infoUIContainerOne);
        this.canAnimate = false;
        this.animation?.pause();
        this.animation?.kill();
        this.animation = null;

        this.handTween?.remove();
        this.handTween = null;

        break;

      default: this.HideInfo();
        this.scene.CreateTimer();
        this.canAnimate = false;
        this.animation?.pause();
        this.animation?.kill();
        this.animation = null;

        this.handTween?.remove();
        this.handTween = null;
        this.scene.grid.panel.setVisible(true);
        this.scene.wLContainer.setVisible(true);
        this.scene.gameState = 'playing';
        AudioManager.StopLevelMusic();
        this.scene.CheckIdleScreen();
        this.scene.topPanelContainer.setDepth(3);
        AudioManager.PlayGameMusic();

        break;
    }
  }

  TweenInfoPages(_x, _tContainer) {
    this.tween = this.scene.tweens.add({
      targets: _tContainer,

      props: {
        x: {
          value: _x,
        },
      },
      ease: 'Linear',
      duration: 100,
      yoyo: false,
      repeat: 0,
      onActive: () => {
        if (this.sBtnText.text === 'Pre') {
          this.sBtnText.setText('Skip');
          this.nBtnText.setText('Next');
          this.pageMarkOne.setTexture('page_mark_1');
          this.pageMarkTwo.setTexture('page_mark_2');
        }
        else {
          this.sBtnText.setText('Pre');
          this.nBtnText.setText('Play');
          this.pageMarkOne.setTexture('page_mark_2');
          this.pageMarkTwo.setTexture('page_mark_1');
        }
      },
      onComplete: () => {
        _tContainer.setVisible(false);
        _tContainer.setPosition(Constant.clientWidth / 2, Constant.clientHeight / 2);
        if (_tContainer.name === 1) this.infoUIContainerTwo.setVisible(true);
        else this.infoUIContainerOne.setVisible(true);
      }
    });
  }

  ShowInfo() {
    this.infoUIContainerOne.setVisible(true);
    // this.infoUIContainerTwo.setVisible(true);
    this.bottomPanelContainer.setVisible(true);
    setTimeout(() => {
      this.hand.setVisible(true);
      this.GetWordArray();

    }, 500);
  }

  GetWordArray() {
    switch (this.wArrNum) {
      case 1: this.wArr = this.fWArr;
        this.fWArr.forEach(sprite => sprite.setTexture('tut_tiles', sprite.name));
        this.sWArr.forEach(sprite => sprite.setTexture('tut_tiles', sprite.name));
        this.tWArr.forEach(sprite => sprite.setTexture('tut_tiles', sprite.name));

        this.zebraTxt.setTexture('tut_tiles', 'zebra');
        this.monkeyTxt.setTexture('tut_tiles', 'monkey');
        this.ratTxt.setTexture('tut_tiles', 'rat');
        this.crspndgColorLetterKeyNum = 0;
        this.TweenHandToNewWord();
        break;

      case 2: this.wArr = this.sWArr;
        this.zebraTxt.setTexture('tut_tiles', 'zebra_1');
        this.TweenHandToNewWord();
        break;


      case 3: this.wArr = this.tWArr;
        this.monkeyTxt.setTexture('tut_tiles', 'monkey_1');
        this.TweenHandToNewWord();
        break;

      default:

        this.ratTxt.setTexture('tut_tiles', 'rat_1');
        this.wArrNum = 1;
        setTimeout(() => {
          this.GetWordArray();
        }, 250);
        break;
    }

  }

  TweenHandToNewWord() {
    if (this.handTween) {
      this.handTween.remove(); // kills existing tween if it's running
    }

    this.handTween = this.scene.tweens.add({
      targets: this.hand,
      x: this.wArr[0].x,
      y: this.wArr[0].y,
      duration: 100,
      ease: 'linear',
      onComplete: () => {
        this.handTween.remove(); // ensure tween is removed after completion
        this.handTween = null;
        setTimeout(() => {
          this.ShowGameTutorialAnimation();
        }, 100);
      }
    });
  }

  ShowGameTutorialAnimation() {
    if (this.index <= this.wArr.length - 1) {
      // eslint-disable-next-line no-unused-vars
      const tileTween = new ButtonTween(this.scene, this.wArr[this.index]);
      this.crspndgColorLetterKeyNum += 1;
      this.ChangeTileColor(this.wArr[this.index], this.crspndgColorLetterKeyNum);
    }
  }

  ChangeTileColor(_obj, _num) {
    if (this.canAnimate) {
      _obj.setTexture('tut_tiles', `cLetter_${_num}`);
      // this.nextLetterInd = this.infoUIContainerOne.getIndex(_obj) + 1;
      this.ShiftHand();
    }
  }

  ShiftHand() {
    // if (this.index >= this.wArr[this.wArr.length]) return;

    this.index += 1;
    const nextLetter = this.wArr[this.index];
    if (!nextLetter) {
      (this.wArrNum <= 2) ? this.wArrNum += 1 : this.wArrNum = 0;
      this.ResetAnimation();
    }
    else {
      this.animation = gsap.to(this.hand, {
        duration: 0.3,
        repeat: 0,
        alpha: 1,
        x: nextLetter.x + 30,
        y: nextLetter.y + 30,
        ease: 'linear',
        onComplete: () => {
          this.animation.kill();
          this.animation = null;
          this.ShowGameTutorialAnimation();
        }
      });
    }

  }

  ResetAnimation() {
    setTimeout(() => {
      this.wArr = null;
      this.index = 0;
      this.GetWordArray();
    }, 500);
  }

  ResetHandTutorial() {
    this.index = 0;
    this.wArr = null;
    this.crspndgColorLetterKeyNum = 0;
    this.wArrNum = 1;
    this.hand.setPosition(0, 0);
    this.fWArr.forEach(sprite => sprite.setTexture('tut_tiles', sprite.name));
    this.sWArr.forEach(sprite => sprite.setTexture('tut_tiles', sprite.name));
    this.tWArr.forEach(sprite => sprite.setTexture('tut_tiles', sprite.name));

    this.zebraTxt.setTexture('tut_tiles', 'zebra');
    this.monkeyTxt.setTexture('tut_tiles', 'monkey');
    this.ratTxt.setTexture('tut_tiles', 'rat');
    this.GetWordArray();
  }

  HideInfo() {
    this.infoUIContainerOne.setVisible(false);
    this.infoUIContainerTwo.setVisible(false);
    this.bottomPanelContainer.setVisible(false);
  }

  ResizeInfoContainers(_newWidth, _newHeight, _newScale) {
    this.infoUIContainerOne.setScale(_newScale);
    this.infoUIContainerTwo.setScale(_newScale);
    this.cScale = _newScale;
    this.infoUIContainerOne.setPosition(_newWidth / 2, _newHeight / 2);
    this.infoUIContainerTwo.setPosition(_newWidth / 2, _newHeight / 2);
    this.bottomPanelContainer.setScale(_newScale);
    this.bottomPanelContainer.setPosition(_newWidth / 2, _newHeight / 1);

  }

}

export default InfoPopup;