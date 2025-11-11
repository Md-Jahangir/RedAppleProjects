/********* Script_Details ************
 * @Original_Creator :- Md jahangir.
 * @Created_Date :- 08-06-2023.
 * @Last_Update_By :- Md jahangir.
 * @Last_Updatd_Date :- 08-06-2023
 * @Description :- Handles Global function that need everywhere.
 ************************************/


//#region - Class defination 
class Utils {
    /**
    * initializes variables.
    * @Constructor
    */
    constructor() {
    };

    /**
    * Check is there any value null/undefine/length 0 .
    * @returns {string} empty or not
    */
    IsEmpty = (value) => {
        // if (value === null || value === undefined || this.Trim(value) === '' || value.length === 0) {
        if (value === null || value === undefined || this.Trim(value) === '' || this.Trim(value) === "" || value.length === 0) {
            return true
        } else {
            return false
        }
    };

    /**
    * Trim the string.
    * @returns {string} string with trim
    */
    Trim = (x) => {
        let value = String(x)
        return value.replace(/^\s+|\s+$/gm, '')
    };

}
//#endregion 
let utils = new Utils();
export { utils as Utils };