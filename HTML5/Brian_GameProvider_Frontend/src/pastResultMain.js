/********* Script_Details ************
 * @Original_Creator :- Md jahangir.
 * @Created_Date :- 06-03-2023.
 * @Last_Update_By :- Md jahangir.
 * @Last_Updatd_Date :- 11-05-2023
 * @Description :- Call the initial API to recived data. The staring poitn of the game.
 ************************************/
//#region - importing required scripts 
import PastRaceResultManager from "./app/components/PastRaceResultManager.js";

//#endregion

/**
 * Initializes game.
 * @public
*/
window.onload = async function (event) {
    this.pastRaceResultManager = new PastRaceResultManager();
}