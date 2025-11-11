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

    // CreateGameIcon() {
    //     let iconObj = document.getElementById("sec_game_icon");
    //     // console.log("iconObj: ", iconObj);
    //     for (let i = 0; i < Constant.gameNameArray.length; i++) {
    //         let divTag = document.createElement("div");
    //         divTag.className = "col-sm-4 mb-4";
    //         divTag.id = Constant.gameNameArray[i].name;
    //         // console.log("Constant.gameNameArray[i].name: ", Constant.gameNameArray[i].name);
    //         // divTag.itemid = Constant.gameNameArray[i].name;
    //         divTag.style.cursor = "pointer"
    //         divTag.addEventListener("click", () => {
    //             this.OnGameIconPressed(divTag);
    //         });
    //         // let anchTag = document.createElement("a");
    //         // anchTag.href = "";
    //         // anchTag.onclick = this.OnGameIconPressed();
    //         let imgTag = document.createElement("img");
    //         imgTag.className = "w-100";
    //         // imgTag.src = "./images/512_512.webp";
    //         imgTag.src = Constant.gameNameArray[i].image;
    //         divTag.appendChild(imgTag);
    //         // anchTag.appendChild(imgTag);
    //         // divTag.appendChild(anchTag);
    //         iconObj.appendChild(divTag);
    //     }
    // };

    CreateGameIcon() {
        let iconObj = document.getElementById("sec_game_icon");
        // console.log("iconObj: ", iconObj);
        for (let i = 0; i < Constant.gameNameArray.length; i++) {
            let mainDivTag = document.createElement("div");
            mainDivTag.className = "col-6 col-sm-4 col-lg-3 mb-4";
            let baseDivTag = document.createElement("div");
            baseDivTag.className = "game-wrapper";

            let imageDivTag = document.createElement("div");
            imageDivTag.className = "image-box";
            imageDivTag.id = Constant.gameNameArray[i].name;
            imageDivTag.style.cursor = "pointer";
            imageDivTag.addEventListener("click", () => {
                this.OnGameIconPressed(imageDivTag);
            });
            let imgTag = document.createElement("img");
            imgTag.className = "w-100";
            imgTag.src = Constant.gameNameArray[i].image;
            imageDivTag.appendChild(imgTag);

            let nameDivTag = document.createElement("div");
            nameDivTag.className = "game-title";

            let para = document.createElement("p");
            let textNode = document.createTextNode(Constant.gameNameArray[i].nameToShow);
            para.appendChild(textNode);
            nameDivTag.appendChild(para);

            baseDivTag.appendChild(imageDivTag);
            baseDivTag.appendChild(nameDivTag);
            mainDivTag.appendChild(baseDivTag);
            iconObj.appendChild(mainDivTag);
        }
    }

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