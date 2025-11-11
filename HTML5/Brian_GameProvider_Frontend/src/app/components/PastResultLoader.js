/********* Script_Details ************
 * @Original_Creator :- Md jahangir.
 * @Created_Date :- 06-03-2023.
 * @Last_Update_By :- Md jahangir.
 * @Last_Updatd_Date :- 11-05-2023
 * @Description :- Handles Loader.
 ************************************/

//#region - Class defination 
class PastResultLoader {
    /**
    * initializes variables.
    * @Constructor
    */
    constructor() {
    };

    /**
    * Show the loading screen.
    * @public 
    * @returns {null} 
    */
    ShowPastResultLoader() {
        let loadingScreenobj = document.getElementById("loading_screen_past_result");
        loadingScreenobj.style.display = "block";
    };

    /**
    * Hide the loading screen.
    * @returns {null} 
    */
    HidePastResultLoader() {
        let loadingScreenobj = document.getElementById("loading_screen_past_result");
        loadingScreenobj.style.display = "none";
    };

    /**
     * Show result section loader animation.
     * @returns {null} 
    **/
    ShowResultPositionLoader() {
        let resultLoadingObj = document.getElementById("result_position_loader");
        resultLoadingObj.style.display = "block";
    };
    /**
     * Hide result section loader animation.
     * @returns {null} 
    **/
    HideResultPositionLoader() {
        let resultLoadingObj = document.getElementById("result_position_loader");
        resultLoadingObj.style.display = "none";
    };

}
//#endregion 
let loader = new PastResultLoader();
export { loader as PastResultLoader };