import { GameArchitechture } from './GameArchitechture.js';
import { Database } from './Database.js';
import { LoadAssets } from './LoadAssets.js';
import { ErrorPopup } from "./ErrorPopup.js";
class LevelManager {
    constructor() {
        this.initialLevelNumber; // Initial level
        this.levelNumber; //current level
        this.numberOfTypeOfImage;
        this.numberOfImage;
        this.background;
        this.answerOrientation;
        this.rotationTime;
        this.rotationType;
        this.movementDirection;
        this.movementTime;
        this.movementType;
        this.movement;
        this.maxTimeForGame;
        this.maxTimeForLevel;
        this.totalNumberOfGame;
        this.totalLevelImageName = [];
        this.totalGameImageName = [];
        this.TotalBackgroundImage = [];

        this.answerLocation;
        this.totalAnswerSpread;
        this.answerSpreadValue;
        this.maximumNUmberOfAttempts = 0;

        this.itemsImages = [];
        this.gameImages = [];
        this.imageArr = [];
        this.currentLevelGrid = [];
    };
    create() {
        this.errorPopup = new ErrorPopup(this);
    }
    InitializeLevel(_arr) {
        this.LevelDataUpdate(_arr);
        this.offsetForLevelUp = GameArchitechture.offsetForLevelUp;
        this.offsetForLevelDown = GameArchitechture.offsetForLevelDown;
        this.answerLocation = GameArchitechture.answerLocation;
        this.totalAnswerSpread = GameArchitechture.totalAnswerSpread;
        this.answerSpreadValue = GameArchitechture.answerSpreadValue;
        this.autoCorrect = GameArchitechture.auto_correct; //auto_correct
        this.DecideAnswerAndDestractors();
    };
    //==> random background <===//
    DecideLevelBackground() {
        return this.TotalBackgroundImage;
    };
    DecideAnswerAndDestractors() {
        let mainImageToSend = [];
        let index;
        let singleImage;

        let images = Database.GetGeneralData('main_image_location');
        images.forEach(element => {
            singleImage = LoadAssets.getImageName(element);
            this.totalGameImageName.push(singleImage);
        });
        this.gameImages = this.totalGameImageName.filter(function (el) {
            return el.includes('game');
        });
        this.itemsImages = this.totalGameImageName.filter(function (el) {
            return el.includes('item');
        });
        this.imageArr = this.totalGameImageName.filter(function (el) {
            return el.includes('image');
        });
    };


    SelectRandomGameImage() {
        let mainImageToSend = [];
        try {
            let items = this.getRandom(this.itemsImages, this.numberOfTypeOfImage.item);
            let game = this.getRandom(this.imageArr, this.numberOfTypeOfImage.image);
            mainImageToSend = items.concat(game);
            return mainImageToSend;
        }
        catch (exception) {
            return null;
        }
    };
    LevelDataUpdate(_arr) {
        this.levelNumber = this.initialLevelNumber = _arr[0];
        this.numberOfImage = _arr[1];
        this.background = _arr[2];
        this.answerOrientation = _arr[3];
        this.rotationTime = _arr[4];
        this.rotationType = _arr[5];
        this.movementDirection = _arr[6];
        this.movementTime = _arr[7];
        this.maxTimeForGame = _arr[8];
        this.maxTimeForLevel = _arr[9];
        this.totalNumberOfGame = _arr[10];
        this.numberOfTypeOfImage = _arr[11];
        this.currentLevelGrid = _arr[12];
        this.maximumNUmberOfAttempts = _arr[13];
    };
    getRandom(arr, n) {
        var result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        //-------------.,------------------------------------------------------
        if (n > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    };
    DecidePlacementOfImages() {

    };
    DecideTimeOrNumberOfQuestion() {
        let response = [this.maxTimeForGame, this.maxTimeForLevel, this.totalNumberOfGame];
        return response;
    };
    ReturnAnswerLocation() {
        return Database.GetGeneralData("answers_location");
    };
    DecideMovementAndRotation() {
        let response = [this.movementDirection, this.movementTime, this.rotationType, this.rotationTime];
        return response;
    };
    //===>Increase level number <======//
    IncreaseLevel(_this) {
        this.levelNumber += 1;
        let args = GameArchitechture.UpdateLevelManager(+1);
        this.LevelDataUpdate(args);
    };
    GetInitialLevel() {
        return this.initialLevelNumber;
    };
    //=====> Decrease level number <====//
    DecreaseLevel(_this) {
        this.levelNumber -= 1;
        let args = GameArchitechture.UpdateLevelManager(-1);
        this.LevelDataUpdate(args);
    };
    GetCurrentLevelNumber() {
        return this.levelNumber;
    };
    Create() { };
    ShuffleArr(arra1) {
        var ctr = arra1.length,
            temp, index;

        // While there are elements in the array
        while (ctr > 0) {
            // Pick a random index
            index = Math.floor(Math.random() * ctr);
            // Decrease ctr by 1
            ctr--;
            // And swap the last element with it
            temp = arra1[ctr];

            arra1[ctr] = arra1[index];
            arra1[index] = temp;
        }
        return arra1;
    };
    DecideObjectOrientationAngle(_level) {
        if (this.levelNumber < 8) {
            return 0;
        } else if (this.levelNumber < 16) {
            return 180;
        } else {
            return 360;
        }
    }
}

let _LevelManager = new LevelManager();

export { _LevelManager as LevelManager };