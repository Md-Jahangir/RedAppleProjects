import { Database } from "./Database.js";
import { GameArchitechture } from "./GameArchitechture.js";
import { Server } from './Server.js';
import { LoadingPopup } from "./LoadingPopup.js";
import { ErrorPopup } from "./ErrorPopup.js";


export default class BootScene extends Phaser.Scene {

    constructor() {
        super('BootScene');
        // this.testJsonObj;
    }
    init() { }
    preload() {
        // this.load.json('Test', 'Test.json');
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
                localStorage.setItem("NeonCalculatorJsonData", JSON.stringify(data.data));
                Database.ParseAndStore(data.data);
                this.onImageDataRecieved(data.data);
            }
            else {
                this.loadingPopup.HideLoadingPopup(this.scene);
                this.errorPopup.ShowErrorPopup(data.message);
                return false;
            }
        } else {
            let data = await Server.getGameData(Server);
            if (data.error == 0) {
                console.log("data:", data.data);
                localStorage.setItem("NeonCalculatorJsonData", JSON.stringify(data.data));
                Database.ParseAndStore(data.data);
                this.onImageDataRecieved(data.data);
            }
            else {
                this.loadingPopup.HideLoadingPopup(this.scene);
                this.errorPopup.ShowErrorPopup(data.message);
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
                this.loadingPopup.HideLoadingPopup(this.scene);
                if (bgImages == "") {
                    console.log("bg image is null")
                    this.errorPopup.ShowErrorPopup('It seems that something went wrong, please contact support at support@emazelabs.com');
                }
                else if (mainImages == "") {
                    this.errorPopup.ShowErrorPopup('It seems that something went wrong, please contact support at support@emazelabs.com');
                }
                return false;
            }
        } else {
            let data = await Server.getImageData(_data.general.bg_images_cdn_location, _data.general.main_images_cdn_location, Server);
            console.log("data:==", data);
            if (data.error == 0) {
                this.ImageData(data);
                this.SceneTransit();
            }
            else {
                this.loadingPopup.HideLoadingPopup(this.scene);
                if (data.data.bg_images == "") {
                    console.log("bg image is null")
                    this.errorPopup.ShowErrorPopup('It seems that something went wrong, please contact support at support@emazelabs.com');
                }
                else if (data.data.main_images == "") {
                    this.errorPopup.ShowErrorPopup('It seems that something went wrong, please contact support at support@emazelabs.com');
                }
                return false;
            }
        }

    }
    async CheckAuthentication() {
        // let data = await Server.TokenAuthentication(Server);
        // console.log("data:==", data);
        // if (data.error == 0) {
        //     localStorage.setItem("userid", data.data.user_id);
        //     this.onDataRecieved(this);
        // }
        // else {
        //     this.loadingPopup.HideLoadingPopup(this.scene);
        //     this.errorPopup.ShowErrorPopup(data.message);
        //     return false;
        // }
        if (Server.platform && Server.platform == "favorites") {
            this.onDataRecieved(this);
            return true;
        } else {
            let data = await Server.TokenAuthentication(Server);
            if (data.error == 0) {
                localStorage.setItem("userid", data.data.user_id);
                this.onDataRecieved(this);
            } else {
                console.log("data:==", data);
                this.loadingPopup.HideLoadingPopup(this.scene);
                this.errorPopup.ShowErrorPopup(data.message);
                return false;
            }
        }
    }
    ImageData(_data) {
        localStorage.setItem("NeonCalculatorImageJson", JSON.stringify(_data.data));
    }
    create() {
        // this.testJsonObj = this.cache.json.get('Test');
        // console.log('testJsonObj : ', this.testJsonObj);
        // Database.ParseAndStore(this.testJsonObj);
        // GameArchitechture.GameArchitechtureInitiallize();
        // this.scene.start("PreloadScene");

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
                        // this.ShowError("Please check the Internet Connection");
                    };
                }
                else {
                    this.loadingPopup.HideLoadingPopup(this.scene);
                    this.errorPopup.ShowErrorPopup("Please login first");
                }
            }
            else /*No internet connecion available for the first time*/ {
                this.ShowError("Please check the Internet Connection");
            }
        }
        else {
            // DataBaseManager.ClearDataBase(DataBaseManager);
            if (this.CheckInternetConnection())/*internet is connected*/ {
                if (Server.isUrlParamsMissing()) {
                    // this.onDataRecieved(this); 
                    if (!this.CheckAuthentication(this)) {
                        // this.ShowError("Please check the Internet Connection");
                    };
                }
                else {
                    console.log("isUrlParamsMissing------------------------");
                    this.loadingPopup.HideLoadingPopup(this.scene);
                    this.errorPopup.ShowErrorPopup("Please login first");
                    // this.ShowError("Please check the Internet Connection");
                }
            }
            else /* internet is not connected*/ {
                /*load data from local storage*/
                let _data = JSON.parse(localStorage.getItem("NeonCalculatorJsonData"));
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
        if (localStorage.getItem('isFirstTime') == null) {
            localStorage.setItem('isFirstTime', true);
            return true;
        }
        else {
            localStorage.setItem('isFirstTime', false);
            return false;
        }

    };
    ShowError(_message) {
        const style = { font: "bold 32px Arial", fill: "#000" };
        let errorImage = this.add.image(game.config.width / 2, game.config.height / 2, 'one_pixel_white').setOrigin(0.5).setScale(800, 300);
        let errorMessage = this.add.text(game.config.width / 2, game.config.height / 2, _message, style).setOrigin(0.5);
    };
    SceneTransit() {
        this.loadingPopup.HideLoadingPopup(this.scene);
        delete this.loadingPopup;
        this.scene.start("PreloadScene");
    };
}