import { GameArchitechture } from './GameArchitechture.js';
import { Database } from './Database.js';
import { LoadAssets } from './LoadAssets.js';
class LevelManager {
    constructor() {
        this.initialLevelNumber; // Initial level
        this.levelNumber; //current level
        // this.numberOfTypeOfImage;
        this.numberOfImage;
        this.background;
        this.answerOrientation;
        // this.rotationTime;
        // this.rotationType;
        // this.movementDirection;
        // this.movementTime;
        // this.movementType;
        // this.movement;
        this.maxTimeForGame;
        this.maxTimeForLevel;
        this.totalNumberOfGame;
        this.totalLevelImageName = [];
        this.totalGameImageName = [];
        this.TotalBackgroundImage = [];

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
        // this.movementType = Database.GetGeneralData("movement_type");
        this.DecideAnswerAndDestractors();
        console.log("level initialized--------");
    };
    //==> random background <===//
    DecideLevelBackground() {
        // let singleImage;
        // let background =  this.TotalBackgroundImage[Math.floor(Math.random() * this.TotalBackgroundImage.length)];
        // singleImage = background.split("/");
        // background = singleImage[singleImage.length-1];
        // return  background;
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
        console.log(this.totalGameImageName);
    };


    SelectRandomGameImage() {
        // console.log("--==--", this.totalGameImageName);
        // console.log("   this.numberOfImage  " + this.numberOfImage);
        // console.log("   this.numberOfTypeOfImage  ", this.numberOfTypeOfImage);
        // this.numberOfTypeOfImage
        // return mainImageToSend;
    };
    LevelDataUpdate(_arr) {
        this.levelNumber = this.initialLevelNumber = _arr[0];
        this.numberOfImage = _arr[1];
        // this.background = _arr[2];
        this.maxTimeForGame = _arr[2];
        this.maxTimeForLevel = _arr[3];
        this.totalNumberOfGame = _arr[4];
        // this.numberOfTypeOfImage = _arr[11];
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
        console.log("this.maxTimeForGame" + this.maxTimeForGame)
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

    SelectAnswer() {
        // let _level = this.levelNumber, _selectedNumber = null;
        // // console.log("this.levelNumber "+this.levelNumber);
        // let min = 0, max = 0;
        // if (_level < 9) {
        //     min = 10 * (_level - 1);
        //     max = min + 9;
        // }
        // else if (_level > 9) {
        //     min = -(_level + 9);
        //     max = 99;
        // }
        // else {
        //     min = -9;
        //     max = 89;
        // }
        // // console.log("Level Min: "+min+" max: "+max);
        // _selectedNumber = Math.floor(Math.random() * (max - min) + min);
        // return (_selectedNumber);

        //-----------------------------------------------------------------------
        let _level = this.levelNumber, _selectedNumber = null;
        // console.log("this.levelNumber "+this.levelNumber);
        let min = 0, max = 0;
        if (_level == 1) {
            min = 2;
            max = 9;
        }
        else if (_level > 1 && _level < 9) {
            min = 10 * (_level - 1);
            max = min + 9;
        }
        else if (_level > 9) {
            min = -(_level + 9);
            max = 99;
        }
        else {
            min = -9;
            max = 89;
        }
        _selectedNumber = Math.floor(Math.random() * (max - min) + min);
        console.log("Level Min: " + min + " max: " + max, _selectedNumber);
        return (_selectedNumber);
    };
    SelectDigitForUserInput() {
        let _level = this.levelNumber;
        // if (_level < 6) {
        return 1;
        // }
        // else if (_level < 12) {
        //     return 2;
        // }
        // else {
        //     return 3;
        // }
    };
    SelectUserInput(_numberOfDigit) {
        switch (_numberOfDigit) {
            case 1:
                return (Math.floor(Math.random() * (9 - 1) + 1));
            case 2:
                return (Math.floor(Math.random() * (99 - 10) + 10));
            case 3:
                return (Math.floor(Math.random() * (999 - 100) + 100));
            default:
                break;
        }
    };
    SelectNumberOfOrgans() {
        let _level = this.levelNumber;
        console.log('_level : ' + _level)
        if (_level === 13 || _level === 1) {
            return 2;
        }
        else {
            if (_level < 13) {
                if ((_level + 1) > 5) {
                    return 5;
                }
                else {
                    return (_level + 1);
                }
            }
            else {
                if (((_level - 13) + 2) > 5) {
                    return 5;
                }
                else {
                    return ((_level - 13) + 2);
                }
            }

        }
    };
    SelectSigns(_level) {
        if (_level < 9) {
            return "equal";
        }
        else {
            if (Math.floor(Math.random()) > 0.5) {
                return "equal";
            }
            else {
                return "not equal";
            }
        }
    };
    SelectOperator() {
        let _level = this.levelNumber;
        if (_level < 5) {
            return ["+"];
        }
        else if (_level < 13) {
            return ["+", "-"];
        }
        else if (_level < 17) {
            return ["*", "+", "-"];
        }
        else {
            return ["/", "*", "+", "-"];
        }
    };
    ShuffleArr(arra1) {
        let ctr = arra1.length,
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
    MultiplyWithNegative(_operator) {
        switch (_operator) {
            case "+":
                return "-";
            case "-":
                return "+";
            case "*":
                return "-";
            case "/":
                return "-";
            default:
                break;
        }
    };
    CheckOperator(_operator) {
        switch (_operator) {
            case "+":
                return true;
            case "-":
                return true;
            case "*":
                return true;
            case "/":
                return true;
            default: return false;
        }
    };
}

let _LevelManager = new LevelManager();

export { _LevelManager as LevelManager };