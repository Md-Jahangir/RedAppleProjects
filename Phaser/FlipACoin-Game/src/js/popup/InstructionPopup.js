/********* Script_Details ************
 * @Original_Creator :- Amit Kumar.
 * @Created_Date :- 23-10-2024.
 * @Last_Update_By :- Amit Kumar.
 * @Last_Updatd_Date :- 23-10-2024
 * @Description :-Instruction Page.
 ************************************/

/* global */
import { Constant } from '../Constant';

export default class Instructions {
  constructor(_scene) {
    this.scene = _scene;
    this.buttonTween = null;
    this.create();
  }
  create() {
    this.overlay = this.scene.add.image(0, 0, 'background')
      .setOrigin(0.5)
      .setInteractive()
      .setDisplaySize(Constant.DESIGNWIDTH, Constant.DESIGNHEIGHT);

    this.container = this.scene.add.container(0, 0);
    this.instructionLogo = this.scene.add.image(0, 450, 'flip_a_coin_logo');
    this.instructionsHeadline = this.scene.add.image(0, 600, 'quickest_win');

    const dialog = ['You have ',
      '      to Flip three coins',
      '           by taping it.'
    ];
    const dialog2 = ['  The fastest who flip the coins',
      '            wins the game.',
    ];
    this.dialogText = this.scene.add.text(-65, 1000, dialog, { fontFamily: 'CarosExtraBold', fontSize: 65, color: '#231440' })
      .setOrigin(0.5);

    this.dialogText1 = this.scene.add.text(160, this.dialogText.y - (this.dialogText.displayHeight / 3), 'one opportunity', { fontFamily: 'CarosExtraBold', fontSize: 65, color: '#5F2DCC' })
      .setOrigin(0.5);

    this.dialogText2 = this.scene.add.text(0, 1400, dialog2, { fontFamily: 'CarosMedium', fontSize: 30, color: '#9E9E9E' })
      .setOrigin(0.5);

    this.coinLogo = this.scene.add.image(-210, 1200, 'coinLogo');
    this.coinLogo1 = this.scene.add.image(0, 1200, 'coinLogo');
    this.coinLogo2 = this.scene.add.image(210, 1200, 'coinLogo');


    this.button = this.scene.add.image(0, 1800, 'gameStartLoadingBase')
      .setOrigin(0.5, 0.5)
      .setInteractive();
    this.buttonOverlay = this.scene.add.image(-(this.button.displayWidth / 2), 1800, 'gameStartLoadingBar')
      .setOrigin(0, 0.5);
    this.buttonText = this.scene.add.text(0, 0, 'GAME STARTING', { fontFamily: 'CarosExtraBold', fontSize: 40 })
      .setOrigin(0.5, 0.5)
      .copyPosition(this.button);

    // this.container.add([this.instructionLogo, this.instructionsHeadline, this.button, this.buttonOverlay, this.buttonText, dialogText, dialogText1, dialogText2, coinLogo, coinLogo1, coinLogo2]);
  }
  //#region -Button Crop
  ButtonProgress(_onCompleteCallback, _callbackscope) {
    this.buttonTween = this.scene.tweens.add({
      targets: this.buttonOverlay,
      width: 0,
      ease: 'Linear',
      duration: Constant.GAMESTART_TIME,
      onUpdate: () => {
        this.buttonOverlay.setCrop(0, 0, this.buttonOverlay.width, this.button.height);
      },
      onComplete: () => {
        _onCompleteCallback.call(_callbackscope);
      },
      repeat: 0,
      yoyo: false,
    });
  }
  //#endregion

  //#region -SetVisible
  SetVisible(_isVisible) {
    this.overlay.setVisible(_isVisible);
    // this.container.setVisible(_isVisible);
    this.instructionLogo.setVisible(_isVisible);
    this.instructionsHeadline.setVisible(_isVisible);
    this.dialogText.setVisible(_isVisible);
    this.dialogText1.setVisible(_isVisible);
    this.dialogText2.setVisible(_isVisible);
    this.coinLogo.setVisible(_isVisible);
    this.coinLogo1.setVisible(_isVisible);
    this.coinLogo2.setVisible(_isVisible);
    this.button.setVisible(_isVisible);
    this.buttonOverlay.setVisible(_isVisible);
    this.buttonText.setVisible(_isVisible);
  }
  //#endregion

  //#region -OnButtonClick
  OnButtonClick(_callback, _callbackscope) {
    this.button.on('pointerdown', () => {
      _callback.call(_callbackscope);
      this.buttonTween.destroy();
    });
  }
  //#endregion

  //#region -Resize
  Resize(_width, _height, _newScale) {
    this.overlay.setDisplaySize(_width, _height)
      .setPosition(_width / 2, _height / 2);
    // this.container.setScale(_newScale)
    //   .setPosition(_width / 2, 0);
    this.instructionLogo.setScale(_newScale)
      .setPosition(_width / 2, (450 * _newScale));
    this.instructionsHeadline.setScale(_newScale)
      .setPosition(_width / 2, (600 * _newScale));
    this.dialogText.setScale(_newScale)
      .setPosition((_width / 2) + (-65 * _newScale), 900 * _newScale);
    this.dialogText1.setScale(_newScale)
      .setPosition((_width / 2) + (160 * _newScale), this.dialogText.y - (this.dialogText.displayHeight / 3));
    this.dialogText2.setScale(_newScale)
      .setPosition(_width / 2, 1400 * _newScale);
    this.coinLogo.setScale(_newScale)
      .setPosition((_width / 2) + (-210 * _newScale), 1200 * _newScale);
    this.coinLogo1.setScale(_newScale)
      .setPosition(_width / 2, 1200 * _newScale);
    this.coinLogo2.setScale(_newScale)
      .setPosition((_width / 2) + (210 * _newScale), 1200 * _newScale);
    this.button.setScale(_newScale)
      .setPosition(_width / 2, _height - (200 * _newScale));
    this.buttonOverlay.setScale(_newScale)
      .setPosition((_width / 2) - (this.button.displayWidth / 2), this.button.y);
    this.buttonText.setScale(_newScale)
      .copyPosition(this.button);
  }
  //#endregion
}