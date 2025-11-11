/********* Script_Details ************
 * @Original_Creator :- Amit Kumar.
 * @Created_Date :- 10-12-2024.
 * @Last_Update_By :- Amit Kumar.
 * @Last_Updatd_Date :- 10-12-2024
 * @Description :- Player Profile.
 ************************************/

import { Constant } from './Constant';

/* global window*/

export default class PlayerProfile {
  constructor(_scene, userDetails, _posX, _posY, _isPlayer, _isTournament) {
    this.scene = _scene;
    this.userAvatarBase = null;
    this.userAvatar = null;

    if (_isTournament) {
      this.playerName = 'Me';
    } else {
      userDetails.full_name ? this.playerName = userDetails.full_name : this.playerName = 'John';
    }

    this.id = userDetails.id ? userDetails.id : '545';
    this.textureKey = userDetails.profile_picture;

    this.playerProfileContainer = null;
    this.posX = _posX;
    this.posY = _posY;
    this.avatarKey = null;
    _isPlayer ? this.avatarKey = 'playerAvatar' : this.avatarKey = 'opponentAvatar';

    //masking
    this.userPicGraphics = null;
    this.currentScale = null;
    this.create();
  }
  //#region  -Create
  create() {
    this.playerProfileContainer = this.scene.add.container(0, 0);
    const trunCateName = this.TruncateName(this.playerName);
    if (this.textureKey) {
      this.scene.load.image(this.avatarKey, this.textureKey);
      this.scene.load.start();

      this.scene.load.on('complete', () => {
        this.userAvatarBase = this.scene.add.image(0, 0, 'userBaseImage').setVisible(false);
        if (this.scene.textures.exists(this.avatarKey)) {
          this.userAvatar = this.scene.add.image(0, 0, this.avatarKey);
        } else {
          this.userAvatar = this.scene.add.image(0, 0, 'defaultPlayerImage');
        }
        this.SetSizeOfAvatar();
        this.userName = this.scene.add.text(0, this.userAvatar.displayHeight - 20, trunCateName, { fontFamily: 'CarosExtraBold', fontSize: 50, color: '#231440', align: 'center' })
          .setOrigin(0.5);
        this.CreateProfileMask();
        this.playerProfileContainer.add([this.userAvatarBase, this.userAvatar, this.userName]);
      });

    } else {
      this.DefaultUserAvatar();
    }
  }
  //#endregion

  //#region -Name Trunacation
  TruncateName(name) {
    const parts = name.split(' ');
    if (parts.length > 1) {
      return `${parts[0]} ...`;
    } else {
      return name;
    }
  }
  //#endregion

  //#region -CreateProfileMask
  CreateProfileMask() {
    this.userPicGraphics = this.scene.add.graphics();
    this.userPicGraphics.fillStyle(0x000, 0);
    this.userPicGraphics.fillCircle(0, 0, this.userAvatarBase.width / 2.2);
    this.userPicGraphics.setPosition((window.innerWidth / 2) + (this.posX * this.currentScale), (this.posY * this.currentScale));
    const mask = this.userPicGraphics.createGeometryMask();
    this.userAvatar.setMask(mask);
  }
  //#endregion

  //#region -DefaultUserAvatar
  DefaultUserAvatar() {
    this.userAvatarBase = this.scene.add.image(0, 0, 'userBaseImage').setVisible(false);
    this.userAvatar = this.scene.add.image(0, 0, 'defaultPlayerImage');
    this.SetSizeOfAvatar();
    this.userName = this.scene.add.text(0, this.userAvatar.displayHeight, this.playerName, { fontFamily: 'CarosExtraBold', fontSize: 50, color: '#231440' })
      .setOrigin(0.5);
    this.playerProfileContainer.add([this.userAvatarBase, this.userAvatar, this.userName]);
    // this.CreateProfileMask();
  }
  //#endregion

  //#region -SetVisible
  SetVisible(_bool) {
    this.playerProfileContainer.setVisible(_bool);
  }
  //#endregion

  //#region -SetSizeOfAvatar
  SetSizeOfAvatar() {
    if (this.userAvatar) {
      this.userAvatar.setDisplaySize(this.userAvatarBase.displayWidth, this.userAvatarBase.displayHeight);
    }
  }
  //#endregion

  //#region -GetID
  GetID() {
    return this.id;
  }
  //#endregion

  //#region -Resize
  Resize(_width, _height) {
    const newScale = Constant.GetNewScale(_width, _height, 1080, 1920);
    this.currentScale = newScale;
    this.playerProfileContainer.setScale(newScale).setPosition((_width / 2) + (this.posX * newScale), (this.posY * newScale));

    this.userPicGraphics?.setScale(newScale);
    this.userPicGraphics?.setPosition((_width / 2) + (this.posX * newScale), (this.posY * newScale));
  }
  //#endregion
}