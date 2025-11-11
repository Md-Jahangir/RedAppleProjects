/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 23-05-2024.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 23-05-2025
 * @Description :- To mute consoles globally on importing to any script.
 ************************************/

class MuteConsole {
    static mute() {
        console.log = () => { };
        console.info = () => { };
        console.warn = () => { };
        console.error = () => { };
        console.debug = () => { };
    }
}

// Automatically mute on import
MuteConsole.mute();

// mute consoles

export default MuteConsole;