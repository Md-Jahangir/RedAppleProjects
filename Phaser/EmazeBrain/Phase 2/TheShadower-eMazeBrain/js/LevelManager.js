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

        this.index = 0;
        this.answerLocation;
        this.totalAnswerSpread;
        this.answerSpreadValue;
    };
    InitializeLevel(_arr) {
        this.LevelDataUpdate(_arr);
        this.offsetForLevelUp = GameArchitechture.offsetForLevelUp;
        this.offsetForLevelDown = GameArchitechture.offsetForLevelDown;
        this.TotalBackgroundImage = GameArchitechture.SelectBackgroundImge();
        this.answerLocation = GameArchitechture.answerLocation;
        this.totalAnswerSpread = GameArchitechture.totalAnswerSpread;
        this.answerSpreadValue = GameArchitechture.answerSpreadValue;
        this.autoCorrect = GameArchitechture.auto_correct; //auto_correct
        this.movementType = Database.GetGeneralData("movement_type");
        this.DecideAnswerAndDestractors();
    }
    DecideLevelBackground() //==> random background <===//
    {
        return this.TotalBackgroundImage;
    }
    DecideAnswerAndDestractors() {
        let mainImageToSend = [];
        let index;
        let singleImage;

        let images = Database.GetGeneralData('main_image_location');
        let totalImages = []; // Database.GetGeneralData('main_image_location');
        images.forEach(element => {
            singleImage = LoadAssets.getImageName(element);
            totalImages.push(singleImage);
        });
        this.totalGameImageName = this.FilterArray(totalImages);
        console.log("this.totalGameImageName ", this.totalGameImageName);
    };
    FilterArray(_arr) {
        let final_Array = [];
        let localArray = [..._arr];
        while (localArray.length > 10) {
            let split = localArray[0].split("_");
            let [arr1, arr2] = this.SearchElementInArray(split[0], localArray);
            localArray = [...arr1];
            final_Array.push(arr2);
        }
        final_Array.push(localArray);
        return final_Array;
    }
    SearchElementInArray(_element, _arr) {
        let localArr = [..._arr];
        let newArr = [],
            split;
        for (let i = 0; i < localArr.length; i++) {
            split = localArr[i].split("_");
            if (split[0] == _element) {
                newArr.push(localArr[i]);
                localArr[i] = null;
            }
        }
        localArr = localArr.filter(function (el) {
            return el != null;
        });
        return [localArr, newArr];
    };
    SelectRandomImageSet() {
        const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
        if (this.totalGameImageName.length > 1) {
            // shuffle(this.totalGameImageName);    
            let randomIndex = random(this.totalGameImageName.length, 0);
            this.totalLevelImageName = [...this.totalGameImageName[randomIndex]];
            // this.totalGameImageName.splice(randomIndex, 1);
        } else {
            this.totalLevelImageName = [...this.totalGameImageName[0]];
        }
        return;
    }
    SelectRandomGameImage(_this) {
        this.SelectRandomImageSet();
        try {
            let correct = this.totalLevelImageName.filter(function (el) {
                return el.includes("correct");
            });
            this.totalLevelImageName = this.totalLevelImageName.filter(function (el) {
                return !(el.includes("correct") || el.includes("original"));
            });
            let mainImageToSend = this.getRandom(this.totalLevelImageName, (this.numberOfImage - 1));
            mainImageToSend.push(correct[0]);
            return mainImageToSend;
        } catch (error) {
            // let errorPopup = new ErrorPopup(_this);
            _this.errorPopup.ShowErrorPopup("Please provide corrrect image");
            // _this.scene.stop();
            return null
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
    };
    getRandom(arr, n) {
        var result = new Array(n),
            len = arr.length,
            taken = new Array(len);
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
        this.index += 1;
        let args = GameArchitechture.UpdateLevelManager(+1);
        this.LevelDataUpdate(args);
    };
    GetInitialLevel() {
        return this.initialLevelNumber;
    };
    //=====> Decrease level number <====//
    DecreaseLevel(_this) {
        this.levelNumber -= 1;
        this.index += 1;
        let args = GameArchitechture.UpdateLevelManager(-1);
        this.LevelDataUpdate(args);
    };
    GetCurrentLevelNumber() {
        return this.levelNumber;
    };
    GetObjectPostion() {
        let objectPosition = [];
        let dir = this.answerLocation;
        // let dir = this.movementDirection;
        if (this.movementDirection === null) {
            dir = Database.answer_location;
            // dir = Database.movement_direction;
        }

        switch (dir) {
            case "N":
                objectPosition = [
                    [Math.floor(game.config.width / 2.74), Math.floor(game.config.height / 4.67)],
                    [Math.floor(game.config.width / 2.209), Math.floor(game.config.height / 4.67)],
                    [Math.floor(game.config.width / 1.849), Math.floor(game.config.height / 4.67)],
                    [Math.floor(game.config.width / 1.590), Math.floor(game.config.height / 4.67)],
                    [Math.floor(game.config.width / 2.74), Math.floor(game.config.height / 2.75)],
                    [Math.floor(game.config.width / 2.209), Math.floor(game.config.height / 2.75)],
                    [Math.floor(game.config.width / 1.849), Math.floor(game.config.height / 2.75)],
                    [Math.floor(game.config.width / 1.590), Math.floor(game.config.height / 2.75)],
                ]; //North Position 
                break;
            case "S":
                objectPosition = [
                    [Math.floor(game.config.width / 2.74), Math.floor(game.config.height / 1.29)],
                    [Math.floor(game.config.width / 2.209), Math.floor(game.config.height / 1.29)],
                    [Math.floor(game.config.width / 1.849), Math.floor(game.config.height / 1.29)],
                    [Math.floor(game.config.width / 1.590), Math.floor(game.config.height / 1.29)],
                    [Math.floor(game.config.width / 2.74), Math.floor(game.config.height / 1.08)],
                    [Math.floor(game.config.width / 2.209), Math.floor(game.config.height / 1.08)],
                    [Math.floor(game.config.width / 1.849), Math.floor(game.config.height / 1.08)],
                    [Math.floor(game.config.width / 1.590), Math.floor(game.config.height / 1.08)],
                ]; //South Position
                break;
            case "W":
                objectPosition = [
                    [Math.floor(game.config.width / 21), Math.floor(game.config.height / 2.2)],
                    [Math.floor(game.config.width / 7.5), Math.floor(game.config.height / 2.2)],
                    [Math.floor(game.config.width / 4.5), Math.floor(game.config.height / 2.2)],
                    [Math.floor(game.config.width / 3.2), Math.floor(game.config.height / 2.2)],
                    [Math.floor(game.config.width / 21), Math.floor(game.config.height / 1.5)],
                    [Math.floor(game.config.width / 7.5), Math.floor(game.config.height / 1.5)],
                    [Math.floor(game.config.width / 4.5), Math.floor(game.config.height / 1.5)],
                    [Math.floor(game.config.width / 3.2), Math.floor(game.config.height / 1.5)],
                ]; //West Position 
                break;
            case "E":
                objectPosition = [
                    [Math.floor(game.config.width / 1.45), Math.floor(game.config.height / 2.2)],
                    [Math.floor(game.config.width / 1.29), Math.floor(game.config.height / 2.2)],
                    [Math.floor(game.config.width / 1.16), Math.floor(game.config.height / 2.2)],
                    [Math.floor(game.config.width / 1.05), Math.floor(game.config.height / 2.2)],
                    [Math.floor(game.config.width / 1.45), Math.floor(game.config.height / 1.5)],
                    [Math.floor(game.config.width / 1.29), Math.floor(game.config.height / 1.5)],
                    [Math.floor(game.config.width / 1.16), Math.floor(game.config.height / 1.5)],
                    [Math.floor(game.config.width / 1.05), Math.floor(game.config.height / 1.5)],
                ]; //East Position
                break;
            case "NE":
                objectPosition = [
                    [Math.floor(game.config.width / 1.5), Math.floor(game.config.height / 4.3)],
                    [Math.floor(game.config.width / 1.32), Math.floor(game.config.height / 4.3)],
                    [Math.floor(game.config.width / 1.18), Math.floor(game.config.height / 4.3)],
                    [Math.floor(game.config.width / 1.06), Math.floor(game.config.height / 4.3)],
                    [Math.floor(game.config.width / 1.5), Math.floor(game.config.height / 2.4)],
                    [Math.floor(game.config.width / 1.32), Math.floor(game.config.height / 2.4)],
                    [Math.floor(game.config.width / 1.18), Math.floor(game.config.height / 2.4)],
                    [Math.floor(game.config.width / 1.06), Math.floor(game.config.height / 2.4)],
                ]; //NorthEast Postion -- SW 
                break;
            case "SW":
                objectPosition = [
                    [Math.floor(game.config.width / 22), Math.floor(game.config.height / 1.4)],
                    [Math.floor(game.config.width / 7.5), Math.floor(game.config.height / 1.4)],
                    [Math.floor(game.config.width / 4.5), Math.floor(game.config.height / 1.4)],
                    [Math.floor(game.config.width / 3.2), Math.floor(game.config.height / 1.4)],
                    [Math.floor(game.config.width / 22), Math.floor(game.config.height / 1.1)],
                    [Math.floor(game.config.width / 7.5), Math.floor(game.config.height / 1.1)],
                    [Math.floor(game.config.width / 4.5), Math.floor(game.config.height / 1.1)],
                    [Math.floor(game.config.width / 3.2), Math.floor(game.config.height / 1.1)],
                ]; // SouthWest Position --NE
                break;
            case "NW":
                objectPosition = [
                    [Math.floor(game.config.width / 22), Math.floor(game.config.height / 4.3)],
                    [Math.floor(game.config.width / 7.5), Math.floor(game.config.height / 4.3)],
                    [Math.floor(game.config.width / 4.5), Math.floor(game.config.height / 4.3)],
                    [Math.floor(game.config.width / 3.2), Math.floor(game.config.height / 4.3)],
                    [Math.floor(game.config.width / 22), Math.floor(game.config.height / 2.4)],
                    [Math.floor(game.config.width / 7.5), Math.floor(game.config.height / 2.4)],
                    [Math.floor(game.config.width / 4.5), Math.floor(game.config.height / 2.4)],
                    [Math.floor(game.config.width / 3.2), Math.floor(game.config.height / 2.4)],
                ]; //NorthWest Position
                break;
            case "SE":
                objectPosition = [
                    [Math.floor(game.config.width / 1.5), Math.floor(game.config.height / 1.4)],
                    [Math.floor(game.config.width / 1.32), Math.floor(game.config.height / 1.4)],
                    [Math.floor(game.config.width / 1.18), Math.floor(game.config.height / 1.4)],
                    [Math.floor(game.config.width / 1.06), Math.floor(game.config.height / 1.4)],
                    [Math.floor(game.config.width / 1.5), Math.floor(game.config.height / 1.1)],
                    [Math.floor(game.config.width / 1.32), Math.floor(game.config.height / 1.1)],
                    [Math.floor(game.config.width / 1.18), Math.floor(game.config.height / 1.1)],
                    [Math.floor(game.config.width / 1.06), Math.floor(game.config.height / 1.1)],
                ]; //SouthEast Position
                break;
        }
        return objectPosition;
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
    // GetColour() {
    //     switch (GameArchitechture.ColourSchemeForImage) {
    //         case "Black": return (0x000000);//black
    //         case "White": return (0xffffff);//white
    //         case "Blue": return (0x0000FF);// blue
    //         case "Green": return (0x00FF00); // green
    //         case "Red": return (0xFF0000); //red
    //         case "Grey": return (0x999999);// grey
    //         case "Lime": return (0x00FF00); //lime
    //         case "Aqua": return (0x00FFFF); //aqua
    //         case "Purple": return (0x800080); //purple 
    //         default: console.log('enter when defa');
    //             return
    //     }
    // };

    GetColour() {
        let colorArray = [];
        let color;
        // console.log('GameArchitechture.ColourSchemeForImage', GameArchitechture.ColourSchemeForImage);
        switch (GameArchitechture.ColourSchemeForImage.toLowerCase()) {
            case "black": return (0x000000);//black
            case "white": return (0xffffff);//white
            case "blue": return (0x0000FF);// blue
            case "green": return (0x00FF00); // green
            case "red": return (0xFF0000); //red
            case "grey": return (0x999999);// grey
            case "lime": return (0x00FF00); //lime
            case "aqua": return (0x00FFFF); //aqua
            case "purple": return (0x800080); //purple 
            default:
                console.log('enter')
                colorArray = [(0x000000), (0xffffff), (0x0000FF), (0x00FF00), (0xFF0000), (0x999999), (0x00FF00), (0x00FFFF), (0x800080)];
                color = colorArray[Math.floor(Math.random() * colorArray.length)]
                console.log('color', color);
                return color;
        }
    };
}

let _LevelManager = new LevelManager();

export { _LevelManager as LevelManager };