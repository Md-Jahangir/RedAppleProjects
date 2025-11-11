/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 16-02-2024.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 09-08-2024
 * @Description :- Design and handling for the Loader.
 ************************************/

class LoadingPopup {
  constructor(scene) {
    this.scene = scene;
    this.loadingPopupContainer = null;
    this.overlay = null;
    this.wheelImage = null;

    this.create();
  };

  //#region - Create all images
  create() {
    this.CreateOverlay();
    this.loadingPopupContainer = this.scene.add.container(0, 0);
    this.loadingPopupContainer.setVisible(false);
    this.loadingPopupContainer.setDepth(3);
    this.CreateWheelAnimation();
  };
  //#endregion

  //#region - Create Overlay
  CreateOverlay() {
    this.overlay = this.scene.add.image(0, 0, 'overlay').setOrigin(0);
    this.overlay.setDisplaySize(this.scene.scale.width, this.scene.scale.height);
    this.overlay.setInteractive();
    this.overlay.setDepth(3);
    this.overlay.setVisible(false);
  };
  //#endregion

  //#region - Create Wheel Animation
  CreateWheelAnimation() {
    this.wheelImage = this.scene.add.sprite(0, 0, 'loading_wheel').setOrigin(0.5);
    this.scene.anims.create({
      key: 'loading_anim',
      frameRate: 4,
      repeat: -1,
      frames: this.scene.anims.generateFrameNumbers('loading_wheel', { start: 0, end: 2 }),
    });
    this.loadingPopupContainer.add(this.wheelImage);
  };
  //#endregion

  //#region - Show Loading popup
  ShowLoadingPopup() {
    this.overlay.setVisible(true);
    this.loadingPopupContainer.setVisible(true);
    this.wheelImage.play('loading_anim');
  };
  //#endregion

  //#region - Hide Loading popup
  HideLoadingPopup() {
    this.overlay.setVisible(false);
    this.loadingPopupContainer.setVisible(false);
  };

  //#region - Resize
  resize(_newWidth, _newHeight, _newScale) {
    this.overlay.setDisplaySize(_newWidth, _newHeight);
    this.loadingPopupContainer.setScale(_newScale);
    this.loadingPopupContainer.setPosition((_newWidth / 2), (_newHeight / 2));
  };

};

export default LoadingPopup;