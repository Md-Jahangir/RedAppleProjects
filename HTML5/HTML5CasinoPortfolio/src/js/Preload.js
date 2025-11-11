/********* Script_Details ************
 * @Original_Creator :- Md jahangir.
 * @Created_Date :- 07-06-2023.
 * @Last_Update_By :- Md jahangir.
 * @Last_Updatd_Date :- 07-06-2023
 * @Description :- Handles all data recived at the starting time of the game and show loader .
 ************************************/

// import { Constant } from "./js/Constant";
// import { Utils } from "./js/Utils";
import { Constant } from "./Constant";
import { Utils } from "./Utils";

// import { Constant } from "./app/components/Constant.js";

//#region - Class defination
export default class Preload {
    /**
    * initializes variables.
    * @Constructor
    */
    constructor() {
    };

    CreateGameIcon() {
        let iconObj = document.getElementById("sec_game_icon");
        // console.log("iconObj: ", iconObj);
        for (let i = 0; i < Constant.gameNameArray.length; i++) {
            let divTag = document.createElement("div");
            divTag.className = "col-sm-4 mb-4";
            divTag.id = Constant.gameNameArray[i].name;
            // console.log("Constant.gameNameArray[i].name: ", Constant.gameNameArray[i].name);
            // divTag.itemid = Constant.gameNameArray[i].name;
            divTag.style.cursor = "pointer"
            divTag.addEventListener("click", () => {
                this.OnGameIconPressed(divTag);
            });
            // let anchTag = document.createElement("a");
            // anchTag.href = "";
            // anchTag.onclick = this.OnGameIconPressed();
            let imgTag = document.createElement("img");
            imgTag.className = "w-100";
            // imgTag.src = "./images/512_512.webp";
            imgTag.src = Constant.gameNameArray[i].image;
            divTag.appendChild(imgTag);
            // anchTag.appendChild(imgTag);
            // divTag.appendChild(anchTag);
            iconObj.appendChild(divTag);
        }
    };

    OnGameIconPressed(_obj) {
        let find = Constant.gameNameArray.find(elem => elem.name == _obj.id);
        // console.log("find ", find);

        if (!Utils.IsEmpty(find.url)) {
            window.open(find.url, "");
        } else {
            window.alert("Coming soon...");
        }
    }

}
//#endregion