import { Database } from "./Database.js";
import { DataBaseManager } from "./DataBaseManeger.js";
import { GameArchitechture } from "./GameArchitechture.js";
import { LevelManager } from "./LevelManager.js";
class LoadAssets {
    constructor() {
        this.byteBgImageArray = [];
        this.loadCompleteCallback;
    };
    // LoadAssests(_this,_loadFromUrl,_data,_loadCompleteCallback) 
    LoadAssests(_this, _data, _loadCompleteCallback) {
        this.loadCompleteCallback = _loadCompleteCallback;
        Database.StoreImageData(_this, Database);
        // if(_loadFromUrl)
        // {
        //     DataBaseManager.StoreImageData(_this,Database,DataBaseManager,Database.StoreImageData,_data);
        // }
        // else
        // {
        //    DataBaseManager.GetAllImageData(_this,this,DataBaseManager, this.LoaDataFromLocalStorage);
        // }     
    };
    imageToUri(url, callback) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        let base_image = new Image();
        base_image.setAttribute('crossorigin', 'anonymous');
        base_image.src = url;
        base_image.onload = function () {
            canvas.width = base_image.width;
            canvas.height = base_image.height;

            ctx.drawImage(base_image, 0, 0);
            //  data = canvas.toDataURL('image/png');
            callback(canvas.toDataURL('image/png'));

            canvas.remove();
        }
    };
    getImageName(_arr) {
        let singleImage, imageName;
        singleImage = _arr.split("/");
        imageName = singleImage[singleImage.length - 1];
        imageName = imageName.split(".");
        return imageName[0];
    };
    StoreImgeToByte(_bgImages) {
        this.ConvertImageToByte(_bgImages);
    };
    ConvertImageToByte(_arr, name) {
        this.imageToUri(_arr, function (uri) {
            DataBaseManager.InsertContact(DataBaseManager, name, uri);
        });
    };
    LoaDataFromLocalStorage(_this, _loadAssetsRef, _callback) {
        let ObjectType = ["emoji", "geometric", "letters", "numbers"];
        let boolArr = [true, true, true, true];
        let wholeJSon = JSON.parse(localStorage.getItem('TheShadowerImageJson'));
        // console.log("_callback",_callback);
        let backgroundArr = [];
        let objectArr = [];
        let wholeImage = [];
        let colorScheme;
        for (let k = 0; k < _callback[0].length; k++) {
            wholeImage.push([_callback[0][k], _callback[1][k]]);
        }
        wholeImage = _loadAssetsRef.shuffle(wholeImage);
        if (wholeJSon.general.color_scheme == "cool") {
            colorScheme = "cool";
        } else {
            colorScheme = wholeJSon.general.color_scheme;
        }
        // console.log("wholeImage",wholeImage);
        for (let j = 0; j < wholeImage.length; j++) {

            if (wholeImage[j][0].includes("background") && wholeImage[j][0].includes(colorScheme)) {
                backgroundArr.push(wholeImage[j][0]);
            } else if (wholeImage[j][0].includes("objects") && wholeImage[j][0].includes(ObjectType[0]) && boolArr[0]) {
                objectArr.push(wholeImage[j][0]);
                // ObjectType = ObjectType.splice(0,1);
                boolArr[0] = false;
            } else if (wholeImage[j][0].includes("objects") && wholeImage[j][0].includes(ObjectType[1]) && boolArr[1]) {
                objectArr.push(wholeImage[j][0]);
                // ObjectType = ObjectType.splice(1,1);
                boolArr[1] = false;
            } else if (wholeImage[j][0].includes("objects") && wholeImage[j][0].includes(ObjectType[2]) && boolArr[2]) {
                objectArr.push(wholeImage[j][0]);
                // ObjectType = ObjectType.splice(2,1);
                boolArr[2] = false;
            } else if (wholeImage[j][0].includes("objects") && wholeImage[j][0].includes(ObjectType[3]) && boolArr[3]) {
                objectArr.push(wholeImage[j][0]);
                // ObjectType = ObjectType.splice(3,1);
                boolArr[3] = false;
            }
        }
        console.log("backgroundArr", backgroundArr);
        console.log("objectArr", objectArr);


        for (let i = 0; i < _callback[0].length; i++) {
            _loadAssetsRef.AddTexture(_callback[1][i], _callback[0][i], _this);
        }
        Database.bg_image_location = [...backgroundArr];
        Database.main_image_location = [...objectArr];
        GameArchitechture.GameArchitechtureInitiallize();
        _loadAssetsRef.LoadCommonItems(_this);
        _this.load.on('complete', _loadAssetsRef.loadCompleteCallback);
    };
    shuffle(array) {
        let currentIndex = array.length,
            randomIndex;
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]
            ];
        }
        return array;
    }
    LoadDataFromUrl(_LoadAssets, _this) {
        let wholeImageJSon = JSON.parse(localStorage.getItem("TheShadowerImageJson")); //_this.cache.json.get('imageJson');
        let gameJSon = JSON.parse(localStorage.getItem("TheShadowerJsonData")); //_this.cache.json.get('jsonData');
        let bgImageLocatins;
        let normalImageLocations = [];
        let image_name;

        let base_url = wholeImageJSon.base_url;
        bgImageLocatins = [...Database.bg_image_location];
        normalImageLocations = [...Database.main_image_location];
        bgImageLocatins = LevelManager.ShuffleArr(bgImageLocatins);
        let bg = bgImageLocatins[0];
        // console.log('bg',bg);
        let singleImage = bg.split("/");
        singleImage = singleImage[singleImage.length - 1].split(".");
        LevelManager.TotalBackgroundImage = "Back" + singleImage;
        _this.load.image(LevelManager.TotalBackgroundImage, base_url + bgImageLocatins[0]);
        /*Laoding Normal Images*/
        for (let i = 0; i < normalImageLocations.length; i++) {
            image_name = _LoadAssets.getImageName(normalImageLocations[i]);
            _this.load.image(image_name, base_url + normalImageLocations[i]);
        }

        _LoadAssets.LoadCommonItems(_this);
        _this.load.on('complete', this.loadCompleteCallback, _this);
    };
    LoadCommonItems(_this) {
        _this.load.image('excellent', 'assets/images/excellent.png');
        _this.load.image('gameOver', 'assets/images/gameOver.png');
        _this.load.image('levelUp', 'assets/images/levelUp.png');
        _this.load.image('timeUp', 'assets/images/timeUp.png');
        _this.load.image('start', 'assets/images/start.png');
        _this.load.audio('game_start_sound', 'assets/sounds/start/startSound.mp3');
        _this.load.audio('game_end_sound', 'assets/sounds/end/endSound.mp3');
        _this.load.audio('level_up_sound', 'assets/sounds/level_up/levelUpSound.mp3');
        _this.load.audio('correct_answer_sound', 'assets/sounds/correct/correctSound.mp3');
        _this.load.audio('incorrect_answer_sound', 'assets/sounds/incorrect/incorrectSound.mp3');
        _this.load.start();
    }
    LoadDataFromImageUrl() {

    }
    AddTexture(_uri, name, _this) {
        _this.textures.addBase64(name, _uri);
    };
}
let GameLoadAssets = new LoadAssets();

export { GameLoadAssets as LoadAssets };