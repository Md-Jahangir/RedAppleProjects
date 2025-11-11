import { GameArchitechture } from './GameArchitechture.js';
import { Database } from './Database.js';
class LevelManager {
    constructor() {
        this.initialLevelNumber;// Initial level
        this.levelNumber;//current level
        this.numberOfTypeOfImage;
        // this.numberOfImage;
        // this.answerImageSelected;
        // this.optionImageSelected;
        this.answerImageNumber;
        this.questionImageNumber;
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
        // this.answerImagePos = [];
        this.levelWiseImage = [];
        this.sendAnswerImageSet = [];
        this.answerLocation;
        this.totalAnswerSpread;
        this.answerSpreadValue;
        this.imageForLevel = [];
        this.index = [];
        this.answerImageText = [];
        this.questionImageText;
        this.max = 20;
        this.min = -20;     // will be -20 but changed due to project needs
        this.unitValue;
        this.answerImageText = [];
        // this.count = 0;

        //----------------------
        this.hoppingTime = 1500;
    };
    InitializeLevel(_arr) {
        this.LevelDataUpdate(_arr);
        this.offsetForLevelUp = GameArchitechture.offsetForLevelUp;
        // console.log('offset for levup :', this.offsetForLevelUp);
        this.offsetForLevelDown = GameArchitechture.offsetForLevelDown;
        this.TotalBackgroundImage = GameArchitechture.SelectBackgroundImge();
        // console.log("this.TotalBackgroundImage ",this.TotalBackgroundImage);
        this.answerLocation = GameArchitechture.answerLocation;
        this.totalAnswerSpread = GameArchitechture.totalAnswerSpread;
        this.answerSpreadValue = GameArchitechture.answerSpreadValue;
        this.movementType = Database.GetGeneralData("movement_type");
        this.DecideAnswerAndDestractors();
        // console.log("level initialized--------",_arr);

    }
    DecideLevelBackground()//==> random background <===//
    {
        return this.TotalBackgroundImage[Math.floor(Math.random() * this.TotalBackgroundImage.length)];
    }
    DecideAnswerAndDestractors() {
        let mainImageToSend = [];
        let index;
        let singleImage;
        this.totalLevelImageName = Database.GetGeneralData('main_image_location');
    };
    SelectRandomAnswerImageText() {
        this.answerImageText = [];
        for (let i = 0; i < this.answerImageNumber; i++) {
            let x = Math.floor(Math.random() * (this.max - this.min) + this.min);//.toFixed(2);
            if (this.answerImageText.includes(x) || (x == 0)) {
                --i;
                continue;
            }
            this.answerImageText.push(x);
        }
        return this.answerImageText;
    }
    SelectQuestionImageText() {
        this.questionImageText = Math.floor((Math.random() * (this.max - this.min) + this.min));//.toFixed(2));
        if (this.answerImageText.includes(this.questionImageText)) {
            this.SelectQuestionImageText();
        }
        // console.log("this.questionImageText"+this.answerImageText.includes(this.questionImageText));
        return this.questionImageText;
    };


    LevelDataUpdate(_arr) {
        this.levelNumber = this.initialLevelNumber = _arr[0];
        this.answerImageNumber = _arr[1];
        this.questionImageNumber = _arr[2],
            this.background = _arr[3];
        this.answerOrientation = _arr[4];
        this.rotationTime = _arr[5];
        this.rotationType = _arr[6];
        this.movementDirection = _arr[7];
        this.movementTime = _arr[8];
        this.maxTimeForGame = _arr[9];
        this.maxTimeForLevel = _arr[10];
        this.totalNumberOfGame = _arr[11];
        this.unitValue = _arr[13];
        this.SetHoppingTime(this.levelNumber);
    };
    SetHoppingTime(_levelNumber) {
        if (_levelNumber > 1) {
            this.hoppingTime -= (_levelNumber * 200);
        }
        if (this.hoppingTime < 500) {
            this.hoppingTime = 500;
        }
    }
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
    ConversionBetweenWeights() {
        // console.log('first unit value : ',this.unitValue)
        switch (this.unitValue[(this.unitValue.length - 1)]) {
            case "Kg":
                return 1000;
            case "m":
                return 100;
            case "Km":
                return 1000;
            case "L":
                return 1000;
            case "Year":
                return 12;
            case "Week":
                return 7;
        }
    }
    DecideTimeOrNumberOfQuestion() {
        // console.log("this.totalNumberOfGame"+this.totalNumberOfGame);
        let response = [this.maxTimeForGame, this.maxTimeForLevel, this.totalNumberOfGame];
        return response;
    };
    ReturnAnswerLocation() {
        return Database.GetGeneralData("answers_location");
    };
    DecideMovementAndRotation() {
        let response = [this.movementDirection, this.movementTime, this.rotationType, this.rotationTime];
        // console.log('response : ',response);
        return response;
    };
    IncreaseLevel(_this)//===>Increase level number <======//
    {
        this.levelNumber += 1;
        // console.log('level Num : ',this.levelNumber);
        let args = GameArchitechture.UpdateLevelManager(+1);
        this.LevelDataUpdate(args);
    }
    GetInitialLevel() {
        return this.initialLevelNumber;
        // console.log('initialLevelNumber',this.initialLevelNumber);
    }
    DecreaseLevel(_this)//=====> Decrease level number <====//
    {
        this.levelNumber -= 1;
        let args = GameArchitechture.UpdateLevelManager(-1);
        // console.log('on level down data : ' , args);
        this.LevelDataUpdate(args);
    }
    GetCurrentLevelNumber() {
        return this.levelNumber;
    }

    GetAnswerImagePosition() {
        let answerImagePos = [];
        let answerLocation = this.answerOrientation;
        // if(this.answerOrientation === null)
        // {
        answerLocation = Database.answer_location;
        // }
        switch (answerLocation) {
            case "N":
                {
                    answerImagePos = [
                        [Math.floor(game.config.width / 3.8), Math.floor(game.config.height / 4.3)],
                        [Math.floor(game.config.width / 3.17), Math.floor(game.config.height / 4.3)],
                        [Math.floor(game.config.width / 2.72), Math.floor(game.config.height / 4.3)],
                        [Math.floor(game.config.width / 2.383), Math.floor(game.config.height / 4.3)],
                        [Math.floor(game.config.width / 2.12), Math.floor(game.config.height / 4.3)],
                        [Math.floor(game.config.width / 1.91), Math.floor(game.config.height / 4.3)],
                        [Math.floor(game.config.width / 1.736), Math.floor(game.config.height / 4.3)],
                        [Math.floor(game.config.width / 1.593), Math.floor(game.config.height / 4.3)],
                        [Math.floor(game.config.width / 1.471), Math.floor(game.config.height / 4.3)],
                        [Math.floor(game.config.width / 1.366), Math.floor(game.config.height / 4.3)],
                        [Math.floor(game.config.width / 1.275), Math.floor(game.config.height / 4.3)],
                        [Math.floor(game.config.width / 1.196), Math.floor(game.config.height / 4.3)],
                    ];
                }
                break;

            case "S":
                {
                    answerImagePos = [
                        [Math.floor(game.config.width / 3.8), Math.floor(game.config.height / 1.1)],
                        [Math.floor(game.config.width / 3.17), Math.floor(game.config.height / 1.1)],
                        [Math.floor(game.config.width / 2.72), Math.floor(game.config.height / 1.1)],
                        [Math.floor(game.config.width / 2.383), Math.floor(game.config.height / 1.1)],

                        [Math.floor(game.config.width / 2.12), Math.floor(game.config.height / 1.1)],

                        [Math.floor(game.config.width / 1.91), Math.floor(game.config.height / 1.1)],

                        [Math.floor(game.config.width / 1.736), Math.floor(game.config.height / 1.1)],

                        [Math.floor(game.config.width / 1.593), Math.floor(game.config.height / 1.1)],
                        [Math.floor(game.config.width / 1.471), Math.floor(game.config.height / 1.1)],
                        [Math.floor(game.config.width / 1.366), Math.floor(game.config.height / 1.1)],
                        [Math.floor(game.config.width / 1.275), Math.floor(game.config.height / 1.1)],
                        [Math.floor(game.config.width / 1.196), Math.floor(game.config.height / 1.1)],
                    ]; //South Position
                }
                break;

            case "E":
                {
                    answerImagePos = [
                        [Math.floor(game.config.width / 1.07), Math.floor(game.config.height / 6.171)],
                        [Math.floor(game.config.width / 1.07), Math.floor(game.config.height / 4.31)],
                        [Math.floor(game.config.width / 1.07), Math.floor(game.config.height / 3.323)],
                        [Math.floor(game.config.width / 1.07), Math.floor(game.config.height / 2.7)],
                        [Math.floor(game.config.width / 1.07), Math.floor(game.config.height / 2.273)],
                        [Math.floor(game.config.width / 1.07), Math.floor(game.config.height / 1.963)],
                        [Math.floor(game.config.width / 1.07), Math.floor(game.config.height / 1.728)],
                        [Math.floor(game.config.width / 1.07), Math.floor(game.config.height / 1.542)],
                        [Math.floor(game.config.width / 1.07), Math.floor(game.config.height / 1.393)],
                        [Math.floor(game.config.width / 1.07), Math.floor(game.config.height / 1.270)],
                        [Math.floor(game.config.width / 1.07), Math.floor(game.config.height / 1.1667)],
                        [Math.floor(game.config.width / 1.07), Math.floor(game.config.height / 1.08)],
                    ];
                }

                break;

            case "W":
                {
                    answerImagePos = [
                        [Math.floor(game.config.width / 15), Math.floor(game.config.height / 6.171)],
                        [Math.floor(game.config.width / 15), Math.floor(game.config.height / 4.31)],
                        [Math.floor(game.config.width / 15), Math.floor(game.config.height / 3.323)],
                        [Math.floor(game.config.width / 15), Math.floor(game.config.height / 2.7)],
                        [Math.floor(game.config.width / 15), Math.floor(game.config.height / 2.273)],
                        [Math.floor(game.config.width / 15), Math.floor(game.config.height / 1.963)],
                        [Math.floor(game.config.width / 15), Math.floor(game.config.height / 1.728)],// // 
                        [Math.floor(game.config.width / 15), Math.floor(game.config.height / 1.542)],
                        [Math.floor(game.config.width / 15), Math.floor(game.config.height / 1.393)], //--
                        [Math.floor(game.config.width / 15), Math.floor(game.config.height / 1.270)],
                        [Math.floor(game.config.width / 15), Math.floor(game.config.height / 1.1667)],
                        [Math.floor(game.config.width / 15), Math.floor(game.config.height / 1.08)],
                    ]; //west Position
                }

                // }
                break;

            case "NE":
                {
                    answerImagePos = [
                        [Math.floor(game.config.width / 1.0666), Math.floor(game.config.height / 3.6)],
                        [Math.floor(game.config.width / 1.129), Math.floor(game.config.height / 3.6)],
                        [Math.floor(game.config.width / 1.2), Math.floor(game.config.height / 3.6)],
                        [Math.floor(game.config.width / 1.28), Math.floor(game.config.height / 3.6)],
                        [Math.floor(game.config.width / 1.3714), Math.floor(game.config.height / 3.6)],
                        [Math.floor(game.config.width / 1.476), Math.floor(game.config.height / 3.6)],
                        [Math.floor(game.config.width / 1.6), Math.floor(game.config.height / 3.6)],
                        [Math.floor(game.config.width / 1.745), Math.floor(game.config.height / 3.6)],
                        [Math.floor(game.config.width / 1.92), Math.floor(game.config.height / 3.6)],
                        [Math.floor(game.config.width / 2.1333), Math.floor(game.config.height / 3.6)],
                        [Math.floor(game.config.width / 2.4), Math.floor(game.config.height / 3.6)],
                        [Math.floor(game.config.width / 2.7428), Math.floor(game.config.height / 3.6)],
                    ];
                }
                break;

            case "NW":
                {
                    answerImagePos = [
                        [Math.floor(game.config.width / 25.3), Math.floor(game.config.height / 3.6)],
                        [Math.floor(game.config.width / 10.91), Math.floor(game.config.height / 3.6)],
                        [Math.floor(game.config.width / 6.96), Math.floor(game.config.height / 3.6)],
                        [Math.floor(game.config.width / 5.11), Math.floor(game.config.height / 3.6)],
                        [Math.floor(game.config.width / 4.042), Math.floor(game.config.height / 3.6)],
                        [Math.floor(game.config.width / 3.339), Math.floor(game.config.height / 3.6)],
                        [Math.floor(game.config.width / 2.844), Math.floor(game.config.height / 3.6)],
                        [Math.floor(game.config.width / 2.4774), Math.floor(game.config.height / 3.6)],
                        [Math.floor(game.config.width / 2.1942), Math.floor(game.config.height / 3.6)],
                        [Math.floor(game.config.width / 1.969), Math.floor(game.config.height / 3.6)],
                        [Math.floor(game.config.width / 1.786), Math.floor(game.config.height / 3.6)],
                        [Math.floor(game.config.width / 1.634), Math.floor(game.config.height / 3.6)],
                    ];
                }

                break;

            case "SE":
                {
                    answerImagePos = [
                        [Math.floor(game.config.width / 1.0666), Math.floor(game.config.height / 1.1)],
                        [Math.floor(game.config.width / 1.129), Math.floor(game.config.height / 1.1)],

                        [Math.floor(game.config.width / 1.2), Math.floor(game.config.height / 1.1)],

                        [Math.floor(game.config.width / 1.28), Math.floor(game.config.height / 1.1)],

                        [Math.floor(game.config.width / 1.3714), Math.floor(game.config.height / 1.1)],

                        [Math.floor(game.config.width / 1.476), Math.floor(game.config.height / 1.1)],

                        [Math.floor(game.config.width / 1.6), Math.floor(game.config.height / 1.1)],

                        [Math.floor(game.config.width / 1.745), Math.floor(game.config.height / 1.1)],  //
                        [Math.floor(game.config.width / 1.92), Math.floor(game.config.height / 1.1)],
                        [Math.floor(game.config.width / 2.1333), Math.floor(game.config.height / 1.1)],
                        [Math.floor(game.config.width / 2.4), Math.floor(game.config.height / 1.1)],
                        [Math.floor(game.config.width / 2.7428), Math.floor(game.config.height / 1.1)],
                    ]; //SouthEast Position
                }
                break;

            case "SW":
                {
                    answerImagePos = [
                        [Math.floor(game.config.width / 25.3), Math.floor(game.config.height / 1.1)],
                        [Math.floor(game.config.width / 10.91), Math.floor(game.config.height / 1.1)],
                        [Math.floor(game.config.width / 6.96), Math.floor(game.config.height / 1.1)],

                        [Math.floor(game.config.width / 5.11), Math.floor(game.config.height / 1.1)],

                        [Math.floor(game.config.width / 4.042), Math.floor(game.config.height / 1.1)],

                        [Math.floor(game.config.width / 3.339), Math.floor(game.config.height / 1.1)],

                        [Math.floor(game.config.width / 2.844), Math.floor(game.config.height / 1.1)],

                        [Math.floor(game.config.width / 2.4774), Math.floor(game.config.height / 1.1)],

                        [Math.floor(game.config.width / 2.1942), Math.floor(game.config.height / 1.1)],

                        [Math.floor(game.config.width / 1.969), Math.floor(game.config.height / 1.1)],
                        [Math.floor(game.config.width / 1.786), Math.floor(game.config.height / 1.1)],
                        [Math.floor(game.config.width / 1.634), Math.floor(game.config.height / 1.1)],
                    ];
                }
                break;
        }
        return answerImagePos;
    }

    GetBaseColliderPosition() {
        let baseColliderPosition = [];
        let answerLocation = this.answerOrientation;
        answerLocation = Database.answer_location;
        // console.log('answerLocation',answerLocation);
        switch (answerLocation) {
            case "N":
                baseColliderPosition = [
                    [game.config.width / 4.8, game.config.height / 4.3724]
                ]
                break;
            case "S":
                baseColliderPosition = [
                    [game.config.width / 4.8, game.config.height / 1.1]
                ]
                break;
            case "E":
                baseColliderPosition = [
                    [game.config.width / 1.0696, game.config.height / 7.3469]
                ]
                break;
            case "W":
                baseColliderPosition = [
                    [game.config.width / 15.483, game.config.height / 7.3469]
                ]
                break;
            case "NW":
                // console.log('NW')
                baseColliderPosition = [
                    [game.config.width / 550, game.config.height / 3.6]
                ]
                break;
            case "SW":
                baseColliderPosition = [
                    [game.config.width / 550, game.config.height / 1.1]
                ]
                break;
            case "NE":
                baseColliderPosition = [
                    [game.config.width / 1.01, game.config.height / 3.698]

                ]
                break;
            case "SE":
                baseColliderPosition = [
                    [game.config.width / 1.01, game.config.height / 1.1]

                ]
                break;
        }
        return baseColliderPosition;
    }

    ShuffleArr(arra1) {
        let ctr = arra1.length, temp, index;
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
    GetRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}

let _LevelManager = new LevelManager();

export { _LevelManager as LevelManager };