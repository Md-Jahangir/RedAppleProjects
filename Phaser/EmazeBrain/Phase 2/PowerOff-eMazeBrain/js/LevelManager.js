import { GameArchitechture } from './GameArchitechture.js';
import { Database } from './Database.js';
import { SoundManager } from './SoundManager.js';
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
        this.TotalBackgroundImage = [];

        this.answerLocation;
        this.totalAnswerSpread;
        this.answerSpreadValue;

        //=================
        this.numberOfLightUpImage;
        this.blinkTime;
        this.frequency = '';
        this.basicFrequency = [];
        this.advanceFrequency = [];
    };
    InitializeLevel(_arr) {
        this.normalFrequencyArray = SoundManager.ReturnNormalFrequencyArray();
        this.advanceFrequencyArray = SoundManager.ReturnAdvanceFrequencyArray();
        console.log(' this.normalFrequencyArray : ', this.normalFrequencyArray);
        console.log('this.advanceFrequencyArray : ', this.advanceFrequencyArray)
        //     console.log('level maneger is calling',_arr);
        this.LevelDataUpdate(_arr);
        this.offsetForLevelUp = GameArchitechture.offsetForLevelUp;
        this.offsetForLevelDown = GameArchitechture.offsetForLevelDown;
        this.TotalBackgroundImage = GameArchitechture.SelectBackgroundImge();
        this.answerLocation = GameArchitechture.answerLocation;
        this.totalAnswerSpread = GameArchitechture.totalAnswerSpread;
        this.answerSpreadValue = GameArchitechture.answerSpreadValue;
        this.movementType = Database.GetGeneralData("movement_type");
        this.DecideAnswerAndDestractors();
        // console.log("level initialized--------",_arr);
        // this.SelectRandomQuestionImageSet()
    }
    // SendNormalFrequency() {
    //     let randomImage = Math.floor(Math.random() * this.normalFrequencyArray.length);
    //     console.log('=====================dxxxxxxxxxxxxxx=====================', randomImage, this.normalFrequencyArray[randomImage]);
    //     return this.normalFrequencyArray[randomImage];
    // }
    // SendAdvanceFrequency() {
    //     let randomImage = Math.floor(Math.random() * this.advanceFrequencyArray.length);
    //     console.log('=====================dxxxxxxxxxxxxxx=====================', randomImage, this.normalFrequencyArray[randomImage]);
    //     return this.normalFrequencyArray[randomImage];
    // }

    SendSoundFrequency() {
        if (this.levelNumber < 15) {
            // console.log('this.numberOfImage : ', this.numberOfImage);
            // console.log('enter when level is less then 15')
            // let randomFrequency = Math.floor(Math.random() * this.normalFrequencyArray.length);
            // console.log('=====================dxxxxxxxxxxxxxx=====================', randomFrequency, this.normalFrequencyArray[randomFrequency]);
            // this.frequency = this.normalFrequencyArray[randomFrequency]
            // return this.frequency;
            for (let i = 0; i < this.numberOfImage; i++) {
                let frequency = Math.floor(Math.random() * this.normalFrequencyArray.length);
                this.basicFrequency.push(this.normalFrequencyArray[frequency])
            }
            return this.basicFrequency;
        }
        else if (this.levelNumber >= 15) {
            // console.log('this.numberOfImage : ', this.numberOfImage);
            // console.log('enter when level is greater then 15')
            // let randomFrequency = Math.floor(Math.random() * this.advanceFrequencyArray.length);
            // console.log('=====================dxxxxxxxxxxxxxx=====================', randomFrequency, this.advanceFrequencyArray[randomFrequency]);
            // this.frequency = this.advanceFrequencyArray[randomFrequency]
            // return this.frequency;
            for (let i = 0; i < this.numberOfImage; i++) {
                let frequency = Math.floor(Math.random() * this.advanceFrequencyArray.length);
                this.advanceFrequency.push(this.advanceFrequencyArray[frequency])
            }
            return this.advanceFrequency;
        }
    }
    DecideLevelBackground() //==> random background <===//
    {
        return this.TotalBackgroundImage[Math.floor(Math.random() * this.TotalBackgroundImage.length)];
    }
    DecideAnswerAndDestractors() {
        let mainImageToSend = [];
        let index;
        let singleImage;
        this.totalLevelImageName = Database.GetGeneralData('main_image_location');
        // console.log('this.totalLevelImageName',this.totalLevelImageName);
    };
    SelectRandomGameImage() {
        // console.log(this.totalLevelImageName+"--==--"+this.numberOfImage); 
        let mainImageToSend = this.totalLevelImageName; //this.getRandom(this.totalLevelImageName,this.numberOfTypeOfImage);
        return mainImageToSend;
    };
    SelectRandomQuestionImageSet() {
        let questionImageForLevel = [];
        if (this.totalLevelImageName.length > 0) {
            // //    this.questionImageForLevel = this.totalLevelImageName.sort(() => Math.random() - 0.5).slice(0, this.numberOfImage);
            // //    console.log('questionImageForLevel',this.questionImageForLevel);
            //    console.log('totalLevelImageName',this.totalLevelImageName);
            // }
            // if(this.numberOfImage == 2)
            // {
            // questionImageForLevel = this.totalLevelImageName.sort(() => Math.random() - 0.5).slice(0, this.numberOfImage);
            // console.log('questionImageForLevel',questionImageForLevel);
            // }
            // else if(this.numberOfImage > 2)
            // {
            for (let i = 0; i < this.numberOfImage; i++) {
                let value = this.totalLevelImageName[Math.floor(Math.random() * this.totalLevelImageName.length)]
                // console.log('value : ',value);
                questionImageForLevel.push(value);
            }
            console.log('questionImageForLevel', questionImageForLevel)
            // }
        }
        // console.log('questionImageForLevel',questionImageForLevel);
        return questionImageForLevel;
    }
    LevelDataUpdate(_arr) {
        this.levelNumber = this.initialLevelNumber = _arr[0];
        console.log(' this.levelNumber : ', this.levelNumber)
        this.numberOfTypeOfImage = _arr[1];
        this.numberOfImage = _arr[2];
        this.numberOfLightUpImage = _arr[3];
        this.background = _arr[4];
        this.answerOrientation = _arr[5];
        this.rotationTime = _arr[6];
        this.rotationType = _arr[7];
        this.movementDirection = _arr[8];
        this.movementTime = _arr[9];
        this.maxTimeForGame = _arr[10];
        this.maxTimeForLevel = _arr[11];
        this.totalNumberOfGame = _arr[12];
        this.blinkTime = _arr[14];
        this.frequency = _arr[15];
        console.log('this.frequency', this.frequency)
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
        // console.log("this.totalNumberOfGame"+this.totalNumberOfGame)
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
    IncreaseLevel(_this) //===>Increase level number <======//
    {
        this.levelNumber += 1;
        console.log('lev no : ', this.levelNumber);
        let args = GameArchitechture.UpdateLevelManager(+1);
        console.log('args : ', args);
        this.LevelDataUpdate(args);
    }
    GetInitialLevel() {
        return this.initialLevelNumber;
    }
    DecreaseLevel(_this) //=====> Decrease level number <====//
    {
        this.levelNumber -= 1;
        let args = GameArchitechture.UpdateLevelManager(-1);
        console.log('args : ', args);
        this.LevelDataUpdate(args);
    }
    GetCurrentLevelNumber() {
        return this.levelNumber;
    };
    GetObjectPosition() {
        let objectPosition = [
            [Math.floor(game.config.width / 15), Math.floor(game.config.height / 3.5)],
            [Math.floor(game.config.width / 4.4), Math.floor(game.config.height / 3.5)],
            [Math.floor(game.config.width / 2.5), Math.floor(game.config.height / 3.5)],
            [Math.floor(game.config.width / 1.75), Math.floor(game.config.height / 3.5)],
            [Math.floor(game.config.width / 1.33), Math.floor(game.config.height / 3.5)],
            [Math.floor(game.config.width / 1.06), Math.floor(game.config.height / 3.5)],

            [Math.floor(game.config.width / 15), Math.floor(game.config.height / 1.8)],
            [Math.floor(game.config.width / 4.4), Math.floor(game.config.height / 1.8)],
            [Math.floor(game.config.width / 2.5), Math.floor(game.config.height / 1.8)],
            [Math.floor(game.config.width / 1.75), Math.floor(game.config.height / 1.8)],
            [Math.floor(game.config.width / 1.33), Math.floor(game.config.height / 1.8)],
            [Math.floor(game.config.width / 1.06), Math.floor(game.config.height / 1.8)],

            [Math.floor(game.config.width / 15), Math.floor(game.config.height / 1.15)],
            [Math.floor(game.config.width / 4.4), Math.floor(game.config.height / 1.15)],
            [Math.floor(game.config.width / 2.5), Math.floor(game.config.height / 1.15)],
            [Math.floor(game.config.width / 1.75), Math.floor(game.config.height / 1.15)],
            [Math.floor(game.config.width / 1.33), Math.floor(game.config.height / 1.15)],
            [Math.floor(game.config.width / 1.06), Math.floor(game.config.height / 1.15)],
        ];
        return objectPosition;
    }
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
    }

}

let _LevelManager = new LevelManager();

export { _LevelManager as LevelManager };