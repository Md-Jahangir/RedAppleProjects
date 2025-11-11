/********* Script_Details ************
 * @Original_Creator :- Md jahangir.
 * @Created_Date :- 06-03-2023.
 * @Last_Update_By :- Md jahangir.
 * @Last_Updatd_Date :- 12-05-2023
 * @Description :- Call the initial API to recived data. The staring poitn of the game.
 ************************************/

//#region - importing required scripts 
import Preload from "./Preload.js";

//#endregion

/**
 * Initializes game.
 * @public
*/
window.onload = async function (event) {
    this.preload = new Preload();

    this.preload.ValidateUserAuthentication();
}