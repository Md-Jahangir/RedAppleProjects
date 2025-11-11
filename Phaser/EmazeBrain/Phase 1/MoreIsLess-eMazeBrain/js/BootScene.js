import { Database } from "./Database.js";
import { Server } from './Server.js';
import { LoadingPopup } from "./LoadingPopup.js";
import { ErrorPopup } from "./ErrorPopup.js";
// import { DataBaseManager } from "./DataBaseManager.js";
export default class BootScene extends Phaser.Scene {

    constructor() {
        super('BootScene');
    }
    init() {
    }
    preload() {
        //-------Load all assets for splash screen-------------------//       
        this.load.image('one_pixel_white', 'assets/images/one_pixel_white.png');
        this.load.image('background', 'assets/images/background.png');
        this.load.image('popupBg', 'assets/images/popupBg.png');
        this.load.spritesheet('loading_wheel', 'assets/images/loading_wheel.png', { frameWidth: (471 / 3), frameHeight: 157 });
    }
    async onDataRecieved(_this) {
        if (Server.platform && Server.platform == "favorites") {
            let data = await Server.getTherapistGameData(Server);
            if (data.error == 0) {
                console.log("data:", data.data);
                // if(this.CheckJsonData(data.data))
                // {
                localStorage.setItem("moreislessjsonData", JSON.stringify(data.data));
                Database.ParseAndStore(data.data);
                this.onImageDataRecieved(data.data);
                // }
                // else
                // {
                //     this.ErrorDisplay("Invalid JSON");
                //     return false;
                // }
            }
            else {
                this.loadingPopup.HideLoadingPopup(this.scene);
                // this.errorPopup.ShowErrorPopup(data.message);
                this.CheckDataAvailability(data.data);
                return false;
            }
        } else {
            let data = await Server.getGameData(Server);
            if (data.error == 0) {
                console.log("data:", data.data);
                // if(this.CheckJsonData(data.data))
                // {
                localStorage.setItem("moreislessjsonData", JSON.stringify(data.data));
                Database.ParseAndStore(data.data);
                this.onImageDataRecieved(data.data);
                // }
                // else
                // {
                //     this.ErrorDisplay("Invalid JSON");
                //     return false;
                // }
            }
            else {
                this.loadingPopup.HideLoadingPopup(this.scene);
                // this.errorPopup.ShowErrorPopup(data.message);
                this.CheckDataAvailability(data.data);
                return false;
            }
        }

    }
    async onImageDataRecieved(_data) {
        if (Server.platform && Server.platform == "favorites") {
            let data = await Server.getTherapistImageData(_data.general.bg_images_cdn_location, _data.general.main_images_cdn_location, Server);
            console.log("data:==", data);
            let bgImages = data.data.bg_images;
            let mainImages = data.data.main_images;
            console.log("bgImages:==", bgImages);
            console.log("mainImages:==", mainImages);
            if (data.error == 0 && (bgImages.length !== 0) && (mainImages.length !== 0)) {
                this.ImageData(data);
                this.SceneTransit();
            }
            else {
                // this.ErrorDisplay("Invalid JSON");
                this.loadingPopup.HideLoadingPopup(this.scene);
                if (bgImages == "") {
                    this.errorPopup.ShowErrorPopup(data.message);
                }
                else if (mainImages == "") {
                    this.errorPopup.ShowErrorPopup(data.message);
                }
                return false;
            }
        } else {
            let data = await Server.getImageData(_data.general.bg_images_cdn_location, _data.general.main_images_cdn_location, Server);
            console.log("data:==", data);
            let bgImages = data.data.bg_images;
            let mainImages = data.data.main_images;
            console.log("bgImages:==", bgImages);
            console.log("mainImages:==", mainImages);
            if (data.error == 0 && (bgImages.length !== 0) && (mainImages.length !== 0)) {
                this.ImageData(data);
                this.SceneTransit();
            }
            else {
                // this.ErrorDisplay("Invalid JSON");
                this.loadingPopup.HideLoadingPopup(this.scene);
                if (bgImages == "") {
                    this.errorPopup.ShowErrorPopup(data.message);
                }
                else if (mainImages == "") {
                    this.errorPopup.ShowErrorPopup(data.message);
                }
                return false;
            }
        }

    }


    CheckDataAvailability(data) {
        console.log('_data : ', data.specific);
        if (data.general.answers_location == "") {
            this.errorPopup.ShowErrorPopup("answer location is missing");
        }
        else if (data.general.answers_location_spread_value == null) {
            this.errorPopup.ShowErrorPopup("answer location is missing");
        }
        else if (data.general.main_images_cdn_location == "") {
            this.errorPopup.ShowErrorPopup("main image is missing");
        }
        else if (data.general.game_id == null) {
            this.errorPopup.ShowErrorPopup("Game id is not available");
        }
        else if (data.general.bg_images_cdn_location == "") {
            this.errorPopup.ShowErrorPopup("Background is missing");
        }
        else if (data.specific.time_to_play == null && data.specific.time_per_question == null) {
            this.errorPopup.ShowErrorPopup("time duration to play is not available");
        }
    }


    async CheckAuthentication() {
        if (Server.platform && Server.platform == "favorites") {
            this.onDataRecieved(this);
            return true;
        } else {
            let data = await Server.TokenAuthentication(Server);
            console.log("data:==", data);
            if (data.error == 0) {
                localStorage.setItem("userid", data.data.user_id);
                this.onDataRecieved(this);
            }
            else {
                this.ErrorDisplay("Invalid JSON");
                return false;
            }
        }

    }
    ImageData(_data) {
        localStorage.setItem("moreislessimageJson", JSON.stringify(_data.data));
    }
    create() {
        let bg = this.add.image(game.config.width / 2, game.config.height / 2, 'background').setOrigin(0.5, 0.5).setScale(scaleFactorX, scaleFactorY);
        console.log("load complete");
        this.loadingPopup = new LoadingPopup(this);
        this.loadingPopup.ShowLoadingPopup();
        this.errorPopup = new ErrorPopup(this);

        gameStarted = true;
        let checkFirstTime = this.CheckFirstTime();
        //======Checking Internet connection===================//
        if (checkFirstTime) {
            // console.log("----------------------");
            if (this.CheckInternetConnection())/*internet is connected*/ {
                /*load data from json store data in local storage*/
                if (Server.isUrlParamsMissing()) {
                    // this.onDataRecieved(this);
                    if (!this.CheckAuthentication(this)) {
                        this.ErrorDisplay("Please check Internet connection");
                    };
                }
                else {
                    this.ErrorDisplay("Please login first");
                }
            }
            else /*No internet connecion available for the first time*/ {
                this.ErrorDisplay("Please check Internet connection");
            }
        }
        else {
            // DataBaseManager.ClearDataBase(DataBaseManager);
            if (this.CheckInternetConnection())/*internet is connected*/ {
                if (Server.isUrlParamsMissing()) {
                    // this.onDataRecieved(this); 
                    if (!this.CheckAuthentication(this)) {
                        this.ErrorDisplay("Please check Internet connection");
                    };
                }
                else {
                    // console.log("isUrlParamsMissing------------------------");
                    this.ErrorDisplay("Please check Internet connection");
                }
            }
            else /* internet is not connected*/ {
                /*load data from local storage*/
                let _data = JSON.parse(localStorage.getItem("moreislessjsonData"));
                Database.ParseAndStore(_data);
                this.SceneTransit();
            }
        }
    };

    CheckInternetConnection() {
        if (window.navigator.onLine) {
            return true;
        }
        else {
            return false;
        }
    };
    CheckFirstTime() {
        if (localStorage.getItem('moreislessisFirstTime') == null) {
            localStorage.setItem('moreislessisFirstTime', true);
            return true;
        }
        else {
            localStorage.setItem('moreislessisFirstTime', false);
            return false;
        }

    };
    // CheckJsonData(_data)
    // {
    //     let general = ["","","","","   ",1,1,"","",1,1,1,1,1];
    //     let specific = [1,1,1.1,1,1,"","",1,1,1];
    //     console.log(typeof(_data.game_id));
    //     console.log((typeof(_data.game_id) === 'number'));
    //     console.log(_data);
    //     if((_data.general) && (_data.specific) && (typeof(_data.game_id) === 'number'))
    //     {
    //         if(this.ValidateGeneralData(Object.entries(_data.general),general))
    //         {
    //             if(this.ValidataSpecificData(Object.entries(_data.specific),specific))
    //             {
    //                 // console.log("Prefect JSON");
    //                 return true;
    //             }
    //             else
    //             {
    //                 // console.log("Invalid  Specific");
    //                 return false;
    //             }
    //         }
    //         else
    //         {
    //             // console.log("Invalid  General");
    //             return false;
    //         }            
    //     } 
    //     else
    //     {
    //         // console.log("game id  not a number");
    //         return false;
    //     }
    // }
    // ValidateGeneralData(_data,validator)
    // {
    //     for (let i = 0; i < validator.length; i++) 
    //     {
    //         // console.log(_data[i][1]);
    //        if(typeof(validator[i]) !== typeof(_data[i][1]))
    //        {
    //             return false;
    //        }            
    //     }
    //     return true;
    // }
    // ValidataSpecificData(_data,validator)
    // {
    //     for (let i = 0; i < validator.length; i++) 
    //     {
    //         if(i === 3)
    //         {
    //             if((typeof(validator[i]) !== typeof(_data[i][1])) && (_data[i][1] !== null))
    //             {
    //                 return false;
    //             }
    //         }
    //         else
    //         {
    //             if(typeof(validator[i]) !== typeof(_data[i][1])&& (_data[i][1] !== null))
    //             {
    //                 return false;
    //             } 
    //         }

    //     }
    //     return true;
    // }
    ErrorDisplay(_msg) {
        this.loadingPopup.HideLoadingPopup(this.scene);
        this.errorPopup.ShowErrorPopup(_msg);
    }
    SceneTransit() {
        this.loadingPopup.HideLoadingPopup(this.scene);
        delete this.loadingPopup;
        this.scene.start("PreloadScene");
    };
}