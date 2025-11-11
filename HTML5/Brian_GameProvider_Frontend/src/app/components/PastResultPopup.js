/********* Script_Details ************
 * @Original_Creator :- Md jahangir.
 * @Created_Date :- 24-11-2023.
 * @Last_Update_By :- Md jahangir.
 * @Last_Updatd_Date :- 24-11-2023
 * @Description :- Handles the error the popup for past result.
 ************************************/

//#region - Class defination 
class PastResultPopup {
    /**
    * initializes variables.
    * @Constructor
    */
    constructor() {
        this.AddEventListenerToPastResultCloseButton();
    };

    /**
    * Add click event to close button.
    *  @returns {null} 
    */
    AddEventListenerToPastResultCloseButton() {
        let closeButtonObj = document.getElementById("pastResult_error_modal_close_button");
        closeButtonObj.addEventListener("click", this.HidePastResultErrorPopup);
    };

    /**
    * Show the popup.
    *  @returns {null} 
    */
    async ShowPastResultErrorPopup(_message) {
        let messageObj = document.getElementById("pastResult_error_modal_message");
        messageObj.innerText = _message;
        $('#pastResult_error_modal').modal("show");
    };

    /**
    * Hide the popup.
    *  @returns {null} 
    */
    HidePastResultErrorPopup() {
        $('#pastResult_error_modal').modal("hide");
    };
}
//#endregion 
let popup = new PastResultPopup();
export { popup as PastResultPopup };