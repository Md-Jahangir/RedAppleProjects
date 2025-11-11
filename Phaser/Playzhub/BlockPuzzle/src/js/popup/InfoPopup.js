
/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 19-09-2024.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 06-03-2025
 * @Description :- Game Tutorial.
 ************************************/

import ButtonTween from '../game-objects/ButtonTween';
import { AudioManager } from '../media/AudioManager';

class InfoPopup {
  constructor(scene) {
    this.scene = scene;

    this.contCount = null;

    this.CreateInfoOneUI();
    this.CreateInfoTwoUI();
    this.CreateInfoThreeUI();
    this.CreateInfoFourUI();
    this.CreateBottomPanel();
    this.HideInfo();
  }

  CreateInfoOneUI() {
    this.overlay = this.scene.add.image(0, 0, 'overlay').setOrigin(0.5).setInteractive({ useHandCursor: true });
    this.tutorialInfoContainer = this.scene.add.container();
    this.infoUIContainerOne = this.scene.add.container().setName(1);

    this.pageOne = this.scene.add.image(0, -230, 'info_1').setOrigin(0.5);//.setVisible(false);

    this.infoUIContainerOne.add(this.pageOne);
    this.tutorialInfoContainer.add(this.infoUIContainerOne);
  }

  CreateInfoTwoUI() {
    this.infoUIContainerTwo = this.scene.add.container().setName(2).setVisible(false).removeInteractive();
    this.pageTwo = this.scene.add.image(0, -230, 'info_2').setOrigin(0.5);//.setVisible(false);

    this.infoUIContainerTwo.add(this.pageTwo);
    this.tutorialInfoContainer.add(this.infoUIContainerTwo);
  }

  CreateInfoThreeUI() {
    this.infoUIContainerThree = this.scene.add.container().setVisible(false);
    this.pageThree = this.scene.add.image(0, -230, 'info_3').setOrigin(0.5);//.setVisible(false);

    this.infoUIContainerThree.add(this.pageThree);
    this.tutorialInfoContainer.add(this.infoUIContainerThree);
  }

  CreateInfoFourUI() {
    this.infoUIContainerFour = this.scene.add.container().setVisible(false);
    this.pagefour = this.scene.add.image(0, -230, 'info_4').setOrigin(0.5);//.setVisible(false);

    this.infoUIContainerFour.add(this.pagefour);
    this.tutorialInfoContainer.add(this.infoUIContainerFour);
  }

  CreateBottomPanel() {
    this.bottomPanelContainer = this.scene.add.container().setDepth(2);

    const fontTextStyle = { fontFamily: 'Anja Eliane', fontSize: '60px', fill: '#ffffff', align: 'center' };
    const text = 'S K I P';
    this.skipTxt = this.scene.add.text(this.pageOne.x, this.pageOne.y - 200, text, fontTextStyle).setOrigin(0.5).setInteractive({ useHandCursor: true });
    this.skipTxt.setStroke('#f6acff', 8);
    this.skipTxt.setShadow(0, 7, '#9546cb', 2, true, false);
    this.paginationMid = this.scene.add.image(this.skipTxt.x - 35, this.skipTxt.y + 200, 'game_obj', 'Ellipse_2').setOrigin(0.5);
    this.paginationLft = this.scene.add.image(this.paginationMid.x - 50, this.paginationMid.y, 'game_obj', 'Ellipse_1').setOrigin(0.5);
    this.paginationRgt = this.scene.add.image(this.paginationMid.x + 50, this.paginationMid.y, 'game_obj', 'Ellipse_2').setOrigin(0.5);
    this.paginationRgtSec = this.scene.add.image(this.paginationRgt.x + 50, this.paginationRgt.y, 'game_obj', 'Ellipse_2').setOrigin(0.5);
    this.nextBtn = this.scene.add.image(this.paginationRgt.x + 380, this.paginationRgt.y, 'ui', 'next').setOrigin(0.5).setInteractive({ useHandCursor: true });
    this.prevBtn = this.scene.add.image(this.paginationLft.x - 380, this.paginationLft.y, 'ui', 'previous').setOrigin(0.5).setInteractive({ useHandCursor: true });

    this.skipTxt.on('pointerdown', this.OnSkip, this);
    this.nextBtn.on('pointerdown', this.OnNext, this);
    this.prevBtn.on('pointerdown', this.OnPrev, this);

    this.bottomPanelContainer.add([this.skipTxt, this.paginationMid, this.paginationLft, this.paginationRgt, this.paginationRgtSec, this.nextBtn, this.prevBtn]);
  }

  OnSkip() {
    this.btnTween = new ButtonTween(this.scene, this.skipTxt);
    AudioManager.PlayButtonPressAudio();
    this.btnTween.btnTween.on('complete', this.OnPressingInfoPageButtons, this);
  }

  OnNext() {
    this.btnTween = new ButtonTween(this.scene, this.nextBtn);
    AudioManager.PlayButtonPressAudio();
    this.currContainer = this.tutorialInfoContainer.list[this.contCount];
    this.btnTween.btnTween.on('complete', this.OnPressingInfoPageButtons, this);
  }

  OnPrev() {
    this.btnTween = new ButtonTween(this.scene, this.prevBtn);
    AudioManager.PlayButtonPressAudio();
    this.currContainer = this.tutorialInfoContainer.list[this.contCount];
    if (this.contCount !== 0) {
      this.contCount -= 1;
      this.btnTween.btnTween.on('complete', this.OnPressingInfoPageButtons, this);
    }
    else { }
  }

  OnPressingInfoPageButtons() {
    switch (this.btnTween.btn.frame.name) {
      case 'next': this.TweenInfoPages((-this.scene.gameplayBg.displayWidth * 2));
        if (this.contCount !== 3) {
          this.contCount += 1;
        }

        break;

      case 'previous': this.TweenInfoPages((this.scene.gameplayBg.displayWidth * 2));

        break;

      default: this.scene.CreateTimer();
        this.HideInfo();
    }
  }

  TweenInfoPages(_x) {
    this.tween = this.scene.tweens.add({
      targets: this.currContainer,

      props: {
        x: {
          value: _x,
        },
      },
      ease: 'Linear',
      duration: 200,
      yoyo: false,
      repeat: 0,
      onComplete: () => {
        this.currContainer.setVisible(false);
        this.currContainer.setPosition(0, 0);
        console.log('cont count', this.contCount);

        this.tutorialInfoContainer.list[this.contCount].setVisible(true);
        this.tutorialInfoContainer.list[this.contCount].setPosition(-_x, 0); // Start from the opposite direction
        this.tutorialInfoContainer.list[this.contCount].setAlpha(0);
        this.scene.tweens.add({
          targets: this.tutorialInfoContainer.list[this.contCount],
          delay: 100,
          x: 0,
          alpha: 1,
          ease: 'Linear',
          duration: 200,
          onComplete: () => {
            this.ChangePagination();
          }
        });

      },
    });
  }

  ChangePagination() {
    if (this.contCount === 0) {
      this.paginationLft.setTexture('game_obj', 'Ellipse_1');
      this.paginationMid.setTexture('game_obj', 'Ellipse_2');
      this.paginationRgt.setTexture('game_obj', 'Ellipse_2');
      this.paginationRgtSec.setTexture('game_obj', 'Ellipse_2');
      this.nextBtn.setTexture('ui', 'next');
    }
    else if (this.contCount === 1) {
      this.paginationLft.setTexture('game_obj', 'Ellipse_2');
      this.paginationMid.setTexture('game_obj', 'Ellipse_1');
      this.paginationRgt.setTexture('game_obj', 'Ellipse_2');
      this.paginationRgtSec.setTexture('game_obj', 'Ellipse_2');
      this.nextBtn.setTexture('ui', 'next');
    }
    else if (this.contCount === 2) {
      this.paginationLft.setTexture('game_obj', 'Ellipse_2');
      this.paginationMid.setTexture('game_obj', 'Ellipse_2');
      this.paginationRgt.setTexture('game_obj', 'Ellipse_1');
      this.paginationRgtSec.setTexture('game_obj', 'Ellipse_2');
      this.nextBtn.setTexture('ui', 'next');
    }
    else {
      this.paginationLft.setTexture('game_obj', 'Ellipse_2');
      this.paginationMid.setTexture('game_obj', 'Ellipse_2');
      this.paginationRgt.setTexture('game_obj', 'Ellipse_2');
      this.paginationRgtSec.setTexture('game_obj', 'Ellipse_1');
      this.nextBtn.setTexture('ui', 'previous copy 2');
    }
  }

  ShowInfo() {
    this.contCount = 0;
    this.overlay.setVisible(true);
    this.tutorialInfoContainer.setVisible(true);
    this.bottomPanelContainer.setVisible(true);
  }

  HideInfo() {
    this.overlay.setVisible(false);
    this.tutorialInfoContainer.setVisible(false);
    // this.infoUIContainerTwo.setVisible(false);
    this.bottomPanelContainer.setVisible(false);

  }

  ResizeInfoContainers(_newWidth, _newHeight, _newScale) {
    this.tutorialInfoContainer.setScale(_newScale);
    this.overlay.setDisplaySize(_newWidth, _newHeight);
    this.overlay.setPosition(
      _newWidth / 2,
      _newHeight / 2
    );
    this.tutorialInfoContainer.setPosition(_newWidth / 2, _newHeight / 2);
    this.bottomPanelContainer.setScale(_newScale);
    this.bottomPanelContainer.setPosition(_newWidth / 2, _newHeight / 1);
  }

}

export default InfoPopup;