/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 09-12-2024.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 09-12-2024
 * @Description :- Coin tweens.
 ************************************/

import { Constant } from '../Constant';

class BlockIcon {
  constructor(scene, _posX, _iconKey, _i, _iconDataKey, _fIconDataKey, _iconPosY) {
    this.scene = scene;
    this.x = _posX;
    this.iconKey = _iconKey;
    this.iconKeyData = _iconDataKey;
    this.i = _i;
    this.flipIconDataKey = _fIconDataKey;
    this.iconPosY = _iconPosY;
    this.iconWidth = Constant.iconWidth;
    this.CreateBlockIcons();
  }

  CreateBlockIcons() {
    // console.log('this.x', this.x);

    this.bIcons = this.scene.add.image(this.x + 12.5, this.iconPosY - (this.iconWidth * this.i), 'game_obj', `cake_${this.iconKeyData}`).setName(`cake_${this.iconKeyData}`).setOrigin(0.5);
    if (this.bIcons.name === 'cake_0') this.bIcons.flipKey = `cake_${this.flipIconDataKey}`;
    this.bIcons.setData({ posX: this.x, posY: this.iconPosY - (this.iconWidth * this.i) });
    this.bIcons.lastPosX = [];
    this.bIcons.lastPosY = [];
    this.bIcons.breakPosX = [];
    this.bIcons.breakPosY = [];
    this.bIcons.path = [];
    // console.log('icon posY', this.bIcons);

  }
}

export default BlockIcon;