/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 16-10-2024.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 16-10-2024.
 * @Description :- To strike matched words.
 ************************************/

import { Constant } from '../Constant';

class Strikethrough {
  constructor(scene, txtObj, color) {
    this.scene = scene;
    this.x = txtObj.x;
    this.y = txtObj.y;
    this.txtObj = txtObj;
    this.width = this.txtObj.width;
    this.fillColor = color;
    this.CreateStrike();
  }
  CreateStrike() {
    const matrix = this.txtObj.getWorldTransformMatrix();
    const hexColor = this.fillColor;
    const colorAsHexNumber = parseInt(hexColor.replace('#', ''), 16); // Convert to 0x753100
    this.rect = this.scene.add.rectangle(matrix.tx, matrix.ty, this.width / 1 * Constant.newScale, 3, `0x${colorAsHexNumber.toString(16)}`);//.setOrigin(txtObj.originX, txtObj.originY).setDepth(10);
  }
}
export default Strikethrough;