/* global  */
/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 30-10-2025.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 30-10-2025
 * @Description :- Store all the data for globally access.
 ************************************/

class Model {
  constructor() {
    this.numberOfPlayerSelected = null;

  };
  //#############################################################################################

  GetNumberOfPlayersSelected() {
    return this.numberOfPlayerSelected;
  };
  SetNumberOfPlayersSelected(_number) {
    this.numberOfPlayerSelected = _number;
  };

  //===============================================================================================

  //#region -Get card suit
  GetCardSuit(_type) {
    switch (_type) {
      case 'H':
        return 0;

      case 'D':
        return 1;

      case 'C':
        return 2;

      case 'S':
        return 3;

    }
  };
  //#endregion

  //#region - Get card number 
  GetCardNumber(_number) {
    const map = {
      'A': 0,
      '2': 1,
      '3': 2,
      '4': 3,
      '5': 4,
      '6': 5,
      '7': 6,
      '8': 7,
      '9': 8,
      '10': 9,
      'J': 10,
      'Q': 11,
      'K': 12
    };
    return map[_number];
  };
  //#endregion

  //#region - Get Actual card frame index
  GetActualCardFrameIndex(_cardId) {
    if (_cardId !== null) {
      const str = _cardId;
      const splitArr = str.split('');
      const numPart = (splitArr.length > 2) ? (splitArr[0] + splitArr[1]) : splitArr[0];
      const suitePart = (splitArr.length > 2) ? splitArr[2] : splitArr[1];
      const cardNumber = this.GetCardNumber(numPart);
      const suitIndex = this.GetCardSuit(suitePart);
      const frameIndex = (suitIndex * 13) + cardNumber;
      return frameIndex;
    }
  };
  //#endregion
};

const gameModel = new Model();
export { gameModel as Model };