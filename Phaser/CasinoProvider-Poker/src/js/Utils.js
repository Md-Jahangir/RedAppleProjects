/* global */

//#region - Class defination

/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 16-02-2024.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 09-08-2024
 * @Description :- Control the Common function .
 ************************************/
class Utils {
  constructor() { };

  //#region - Check is there any value null/undefine/length 0
  /**
    * @returns {string} empty or not
  **/
  IsEmpty(_value) {
    if (_value === null || _value === undefined || this.Trim(_value) === '' || this.Trim(_value) === '' || _value.length === 0) {
      return true;
    } else {
      return false;
    }
  };
  //#endregion

  //#region - Trim the string
  /**
    * @returns {string} string with trim
  **/
  Trim(_x) {
    const value = String(_x);
    return value.replace(/^\s+|\s+$/gm, '');
  };
  //#endregion

  //#region - Get the scale factor
  /**
    * @param {number} _resWidth -selected resolution inner width
    * @param {number} _resHeight -selected resolution inner height
    * @param {number} _screenNewWidth -new resolution width
    * @param {number} _screenNewHeight -new resolution height
    * @returns {number} return actual scale factor 
  **/
  GetScale(_resWidth, _resHeight, _screenNewWidth, _screenNewHeight) {
    const screenWidth = _resWidth;
    const screenHeight = _resHeight;
    const newScaleX = _screenNewWidth / screenWidth;
    const newScaleY = _screenNewHeight / screenHeight;
    return newScaleX < newScaleY ? newScaleX : newScaleY;
  };
  //#endregion

  //#region - Button scale tween
  /**
    * @param {object} _this -selected scene
    * @param {string} _refImage -selected game object
    * @param {number} _scale -current scale
  **/
  ButtonScaleTween(_this, _refImage, _scale) {
    _this.add.tween({
      targets: [_refImage],
      scaleX: _scale * 0.95,
      scaleY: _scale * 0.95,
      ease: 'Linear',
      duration: 50,
      onComplete: this.OnCompleteHandler,
      onCompleteParams: [_refImage, _scale],
    });
  };
  //#endregion

  //#region - On tween complete
  /**
    * @param {object} _tween -selected tween object
    * @param {object} _targets -selected game object
    * @param {string} _refImage -cimage name
    * @param {number} _scale -current scale
  **/
  OnCompleteHandler(_tween, _targets, _refImage, _scale) {
    this.parent.scene.add.tween({
      targets: [_refImage],
      scaleX: _scale * 1,
      scaleY: _scale * 1,
      ease: 'Linear',
      duration: 50,
    });
  };

  GetCurrentBackCardFrame(_name) {
    let selectedBackCardFrame = null;
    switch (_name) {
      case 'back_card_0':
        selectedBackCardFrame = 52;
        break;
      case 'back_card_1':
        selectedBackCardFrame = 53;
        break;
      case 'back_card_2':
        selectedBackCardFrame = 54;
        break;
      case 'back_card_3':
        selectedBackCardFrame = 55;
        break;
      default:
        selectedBackCardFrame = 52;
    }
    return selectedBackCardFrame;
  };

  GetGameTypeByName(_key) {
    const gameNameMap = new Map([
      ['nlh', 'No Limit Hold\'em'],
      ['plh', 'Pot Limit Hold\'em'],
      ['nlo', 'No Limit Omaha'],
      ['plo', 'Pot Limit Omaha']
    ]);
    return gameNameMap.get(_key);
  };
};
//#endregion


//#endregion
const utils = new Utils();
export { utils as Utils };