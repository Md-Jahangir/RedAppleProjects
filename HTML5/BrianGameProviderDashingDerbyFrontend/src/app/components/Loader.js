/********* Script_Details ************
 * @Original_Creator :- Md jahangir.
 * @Created_Date :- 06-03-2023.
 * @Last_Update_By :- Md jahangir.
 * @Last_Updatd_Date :- 12-05-2023
 * @Description :- Handles Loader.
 ************************************/

//#region - Class defination 
class Loader {
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
    ShowLoader() {
        let loadingScreenobj = document.getElementById("loading_screen");
        loadingScreenobj.style.display = "block";
    };

    /**
    * Hide the loading screen.
    * @public 
    * @returns {null} 
    */
    HideLoader() {
        let loadingScreenobj = document.getElementById("loading_screen");
        loadingScreenobj.style.display = "none";

    };

    /**
     * Show odds value loader animation.
     * @returns {null} 
    **/
    ShowOddsTableValueUpdateLoader() {
        let oddsTableLoadingbj = document.getElementById("odds_table_update_loader");
        oddsTableLoadingbj.style.display = "block";
    };
    /**
     * Hide odds value loader animation.
     * @returns {null} 
    **/
    HideOddsTableValueUpdateLoader() {
        let oddsTableLoadingbj = document.getElementById("odds_table_update_loader");
        oddsTableLoadingbj.style.display = "none";
    };

}
//#endregion 
let loader = new Loader();
export { loader as Loader };