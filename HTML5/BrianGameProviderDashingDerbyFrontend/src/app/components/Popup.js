/********* Script_Details ************
 * @Original_Creator :- Md jahangir.
 * @Created_Date :- 06-03-2023.
 * @Last_Update_By :- Md jahangir.
 * @Last_Updatd_Date :- 12-05-2023
 * @Description :- Handles All the popup.
 ************************************/

//#region - Class defination 
class Popup {
    /**
    * initializes variables.
    * @Constructor
    */
    constructor() {
        this.AddEventListenerToCloseButton();
    };

    /**
    * Add click event to close button.
    *  @returns {null} 
    */
    AddEventListenerToCloseButton() {
        let closeButtonObj = document.getElementById("error_modal_close_button");
        closeButtonObj.addEventListener("click", this.HideErrorPopup);
    };

    /**
    * Show the popup.
    *  @returns {null} 
    */
    async ShowErrorPopup(_message) {
        let messageObj = document.getElementById("error_modal_message");
        messageObj.innerText = _message;
        $('#error_modal').modal("show");
    };

    /**
    * Hide the popup.
    *  @returns {null} 
    */
    HideErrorPopup() {
        $('#error_modal').modal("hide");
    };

}
//#endregion 
let popup = new Popup();
export { popup as Popup };