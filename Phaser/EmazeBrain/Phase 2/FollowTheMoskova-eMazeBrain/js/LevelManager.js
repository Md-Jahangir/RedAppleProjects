import { GameArchitechture } from './GameArchitechture.js';
import { Database } from './Database.js';
class LevelManager {
    constructor() {
        this.initialLevelNumber;// Initial level
        this.levelNumber;//current level
        this.numberOfTypeOfImage;
        this.numberOfImage;
        this.answerImageSelected;
        this.optionImageSelected;
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
        this.questionImageShowTimer;
        this.sequenceNumber;
        // this.count = 0;
        this.numberOfAnswerImages;
    };
    InitializeLevel(_arr) {
        this.LevelDataUpdate(_arr);
        this.offsetForLevelUp = GameArchitechture.offsetForLevelUp;
        // console.log('offset for levup :', this.offsetForLevelUp);
        this.offsetForLevelDown = GameArchitechture.offsetForLevelDown;
        this.TotalBackgroundImage = GameArchitechture.SelectBackgroundImge();
        // console.log('TotalBg',this.TotalBackgroundImage)
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
    SelectRandomQuestionImageSet() {
        // console.log('dir-----',Database.movement_direction)
        this.questionImageForLevel = [];
        if (this.totalLevelImageName.length > 0) {
            this.questionImageForLevel = this.totalLevelImageName.sort(() => Math.random() - 0.5).slice(0, this.numberOfImage);
            //   console.log('questionImageForLevel',this.questionImageForLevel);
            // console.log('totalLevelImageName', this.totalLevelImageName);
        }
        return this.questionImageForLevel;
    }
    SelectRandomAnswerImageSet() {
        this.sendAnswerImageSet = [];
        // console.log("Before Shuffle: ",this.questionImageForLevel);
        let answerImage = [];
        this.ShuffleArr(this.questionImageForLevel);
        // console.log("this.answerImageSelected: ",this.answerImageSelected);
        if (this.answerImageSelected == 1) {
            answerImage.push(this.questionImageForLevel[Math.floor(Math.random() * this.questionImageForLevel.length)]);
            // console.log('answerImage----------------1----------------------->', answerImage); 
            this.numberOfAnswerImages = answerImage.length;
            console.log('this.numberOfAnswerImage : ', this.numberOfAnswerImages)
        }
        else if (this.answerImageSelected > 1) {
            answerImage = this.questionImageForLevel.sort(() => Math.random() - 0.5).slice(0, this.answerImageSelected);
            console.log('======================================================>', answerImage);
            this.numberOfAnswerImages = answerImage.length;
            console.log('this.numberOfAnswerImage : ', this.numberOfAnswerImages);
        }
        // console.log('after sort answerImage: ',answerImage);
        let uniqueOptions = this.SelectForOption();
        console.log('uniqueOptions : ', uniqueOptions);
        answerImage.push(...uniqueOptions);              // some defected 
        // console.log('answerImage',answerImage);
        this.sendAnswerImageSet = answerImage.sort((a, b) => 0.5 - Math.random());
        // this.sendAnswerImageSet.push(...answerImage);
        // console.log('sendAnswerImageSet', this.sendAnswerImageSet);
        return this.sendAnswerImageSet;
    }

    SelectForOption() {
        let uniqueOption = this.totalLevelImageName.sort(() => Math.random() - 0.5).slice(0, this.optionImageSelected);
        // console.log('UniqueOption',uniqueOption);  
        for (let i = 0; i < uniqueOption.length;) {
            if (this.questionImageForLevel.indexOf(uniqueOption[i]) >= 0) {
                return this.SelectForOption();
            }
            else if (this.questionImageForLevel.indexOf(uniqueOption[i + 1]) >= 0) {
                return this.SelectForOption();
            }
            else if (this.questionImageForLevel.indexOf(uniqueOption[i + 2]) >= 0) {
                return this.SelectForOption();
            }
            else if (this.questionImageForLevel.indexOf(uniqueOption[i + 3]) >= 0) {
                return this.SelectForOption();
            }
            else {
                return uniqueOption;
            }
        }
    }
    SelectRandomGameImage() {

    };
    LevelDataUpdate(_arr) {
        this.levelNumber = this.initialLevelNumber = _arr[0];
        // console.log('jhbef;ieb',this.initialLevelNumber)
        // this.numberOfTypeOfImage =  _arr[1];
        this.numberOfImage = _arr[1];
        this.answerImageSelected = _arr[2],
            this.optionImageSelected = _arr[3]
        this.background = _arr[4];
        this.answerOrientation = _arr[5];
        this.rotationTime = _arr[6];
        this.rotationType = _arr[7];
        this.movementDirection = _arr[8];
        this.movementTime = _arr[9];
        this.maxTimeForGame = _arr[10];
        this.maxTimeForLevel = _arr[11];
        this.totalNumberOfGame = _arr[12];
        this.questionImageShowTimer = _arr[14];
        this.sequenceNumber = _arr[15];
        this.randomPosNumber = _arr[16];
        // console.log('randomPosNumber : ',this.randomPosNumber)
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
        // console.log("this.totalNumberOfGame"+this.totalNumberOfGame);
        let response = [this.maxTimeForGame, this.maxTimeForLevel, this.totalNumberOfGame];
        return response;
    };
    ReturnAnswerLocation() {
        return Database.GetGeneralData("answers_location");
    };
    DecideMovementAndRotation() {
        let response = [this.movementDirection, this.movementTime, this.rotationType, this.rotationTime];
        // console.log('rotationType : ',this.rotationType)
        return response;
    };
    IncreaseLevel(_this)//===>Increase level number <======//
    {
        this.levelNumber += 1;
        // console.log('level Num : ',this.levelNumber);
        let args = GameArchitechture.UpdateLevelManager(+1);
        // console.log('args : ',args);
        this.LevelDataUpdate(args);
    }
    GetInitialLevel() {
        return this.initialLevelNumber;
        console.log('initialLevelNumber', this.initialLevelNumber);
    }
    DecreaseLevel(_this)//=====> Decrease level number <====//
    {
        this.levelNumber -= 1;
        // console.log('level Num : ',this.levelNumber)
        let args = GameArchitechture.UpdateLevelManager(-1);
        // console.log('args : ',args);
        this.LevelDataUpdate(args);
    }
    GetCurrentLevelNumber() {
        return this.levelNumber;
    };

    GetObjectPostion(_totalNumberOfObjects) {
        let objectPosition = [];
        let dir = this.movementDirection, arrayToBeSend = [];
        let endX = null, startX = null, endY = null, startY = null;
        let totalDistance = null, totalDistanceX = null, totalDistanceY = null;
        let totalGap = null, totalGapX = null, totalGapY = null;
        // console.log('DIR : ',dir);
        if (this.movementDirection === null) {
            dir = Database.movement_direction;
        }
        // console.log("dir------------>" + dir);
        switch (dir) {
            case "RTL":
                endX = Math.floor(game.config.width / 15.5);
                startX = Math.floor(game.config.width / 1.068);
                totalDistance = startX - endX;
                totalGap = (totalDistance / (_totalNumberOfObjects - 1));
                arrayToBeSend.push([startX, Math.floor(game.config.height / 2)]);
                for (let i = 1; i <= (_totalNumberOfObjects - 2); i++) {
                    arrayToBeSend.push([(startX - (i * totalGap)), Math.floor(game.config.height / 2)]);
                }
                arrayToBeSend.push([endX, Math.floor(game.config.height / 2)]);

                break;
            case "LTR":
                startX = Math.floor(game.config.width / 15.5);
                endX = Math.floor(game.config.width / 1.068);
                totalDistance = endX - startX;
                totalGap = (totalDistance / (_totalNumberOfObjects - 1));
                arrayToBeSend.push([startX, Math.floor(game.config.height / 2)]);
                for (let i = 1; i <= (_totalNumberOfObjects - 2); i++) {
                    arrayToBeSend.push([(startX + (i * totalGap)), Math.floor(game.config.height / 2)]);
                }
                arrayToBeSend.push([endX, Math.floor(game.config.height / 2)]);

                break;
            case "TTB":
                startY = Math.floor(game.config.height / 4.5);
                endY = Math.floor(game.config.height / 1.068);
                totalDistance = endY - startY;
                totalGap = (totalDistance / (_totalNumberOfObjects - 1));
                arrayToBeSend.push([Math.floor(game.config.width / 2), startY]);
                for (let i = 1; i <= (_totalNumberOfObjects - 2); i++) {
                    arrayToBeSend.push([Math.floor(game.config.width / 2), (startY + (i * totalGap))]);
                }
                arrayToBeSend.push([Math.floor(game.config.width / 2), endY]);

                break;
            case "BTT":
                endY = Math.floor(game.config.height / 4.5);
                startY = Math.floor(game.config.height / 1.068);
                totalDistance = startY - endY;
                totalGap = (totalDistance / (_totalNumberOfObjects - 1));
                arrayToBeSend.push([Math.floor(game.config.width / 2), startY]);
                for (let i = 1; i <= (_totalNumberOfObjects - 2); i++) {
                    arrayToBeSend.push([Math.floor(game.config.width / 2), (startY - (i * totalGap))]);
                }
                arrayToBeSend.push([Math.floor(game.config.width / 2), endY]);
                break;
            case "BRDTL":
                endX = Math.floor(game.config.width / 15.5);
                endY = Math.floor(game.config.height / 4.5);
                startX = Math.floor(game.config.width / 1.068);
                startY = Math.floor(game.config.height / 1.068);
                totalDistanceY = startY - endY;
                totalDistanceX = startX - endX;
                totalGapX = (totalDistanceX / (_totalNumberOfObjects - 1));
                totalGapY = (totalDistanceY / (_totalNumberOfObjects - 1));

                arrayToBeSend.push([startX, startY]);
                for (let i = 1; i <= (_totalNumberOfObjects - 1); i++) {
                    arrayToBeSend.push([(startX - (i * totalGapX)), (startY - (i * totalGapY))]);
                }
                break;
            case "BLDTR":
                endX = Math.floor(game.config.width / 1.068);
                endY = Math.floor(game.config.height / 4.5);
                startX = Math.floor(game.config.width / 15.5);
                startY = Math.floor(game.config.height / 1.068);
                totalDistanceY = startY - endY;
                totalDistanceX = startX - endX;
                totalGapX = (totalDistanceX / (_totalNumberOfObjects - 1));
                totalGapY = (totalDistanceY / (_totalNumberOfObjects - 1));

                arrayToBeSend.push([startX, startY]);
                for (let i = 1; i <= (_totalNumberOfObjects - 1); i++) {
                    arrayToBeSend.push([(startX - (i * totalGapX)), (startY - (i * totalGapY))]);
                }
                break;
            case "TLDBR":
                startX = Math.floor(game.config.width / 15.5);
                startY = Math.floor(game.config.height / 4.5);
                endX = Math.floor(game.config.width / 1.068);
                endY = Math.floor(game.config.height / 1.068);
                totalDistanceY = endY - startY;
                totalDistanceX = endX - startX;
                totalGapX = (totalDistanceX / (_totalNumberOfObjects - 1));
                totalGapY = (totalDistanceY / (_totalNumberOfObjects - 1));

                arrayToBeSend.push([startX, startY]);
                for (let i = 1; i <= (_totalNumberOfObjects - 1); i++) {
                    arrayToBeSend.push([(startX + (i * totalGapX)), (startY + (i * totalGapY))]);
                }
                break;
            case "TRDBL":
                startX = Math.floor(game.config.width / 1.068);
                startY = Math.floor(game.config.height / 4.5);
                endX = Math.floor(game.config.width / 15.5);
                endY = Math.floor(game.config.height / 1.068);
                totalDistanceY = endY - startY;
                totalDistanceX = endX - startX;
                totalGapX = (totalDistanceX / (_totalNumberOfObjects - 1));
                totalGapY = (totalDistanceY / (_totalNumberOfObjects - 1));

                arrayToBeSend.push([startX, startY]);
                for (let i = 1; i <= (_totalNumberOfObjects - 1); i++) {
                    arrayToBeSend.push([(startX + (i * totalGapX)), (startY + (i * totalGapY))]);
                }
                break;
        }
        return arrayToBeSend;
    }

    GetAnswerImagePosition() {
        // console.log('answerPosition : ',this.answerOrientation);
        let answerImagePos = [];
        let answerLocation = this.answerOrientation;
        // console.log('answerLoc',answerLocation);
        if (this.answerOrientation === null) {
            answerLocation = Database.answer_location;
        }
        switch (answerLocation) {
            case "N":
                {
                    answerImagePos = [
                        [Math.floor(game.config.width / 2.5), Math.floor(game.config.height / 4.8)],
                        [Math.floor(game.config.width / 1.7), Math.floor(game.config.height / 4.8)],
                        [Math.floor(game.config.width / 2.5), Math.floor(game.config.height / 3.1)],
                        [Math.floor(game.config.width / 1.7), Math.floor(game.config.height / 3.1)],
                        [Math.floor(game.config.width / 2.5), Math.floor(game.config.height / 2.2)],
                        [Math.floor(game.config.width / 1.7), Math.floor(game.config.height / 2.2)],
                    ];
                }
                break;

            case "S":
                {
                    answerImagePos = [
                        [Math.floor(game.config.width / 2.5), Math.floor(game.config.height / 1.5)],
                        [Math.floor(game.config.width / 1.7), Math.floor(game.config.height / 1.5)],
                        [Math.floor(game.config.width / 2.5), Math.floor(game.config.height / 1.26)],
                        [Math.floor(game.config.width / 1.7), Math.floor(game.config.height / 1.26)],
                        [Math.floor(game.config.width / 2.5), Math.floor(game.config.height / 1.08)],
                        [Math.floor(game.config.width / 1.7), Math.floor(game.config.height / 1.08)],
                    ]
                }
                break;

            case "E":
                {
                    answerImagePos = [
                        [Math.floor(game.config.width / 1.35), Math.floor(game.config.height / 2.3)],
                        [Math.floor(game.config.width / 1.04), Math.floor(game.config.height / 2.3)],
                        [Math.floor(game.config.width / 1.35), Math.floor(game.config.height / 1.79)],
                        [Math.floor(game.config.width / 1.04), Math.floor(game.config.height / 1.79)],
                        [Math.floor(game.config.width / 1.35), Math.floor(game.config.height / 1.47)],
                        [Math.floor(game.config.width / 1.04), Math.floor(game.config.height / 1.47)],
                    ];
                }
                break;

            case "W":
                {
                    answerImagePos = [
                        [Math.floor(game.config.width / 25), Math.floor(game.config.height / 2.3)],
                        [Math.floor(game.config.width / 4.5), Math.floor(game.config.height / 2.3)],
                        [Math.floor(game.config.width / 25), Math.floor(game.config.height / 1.79)],
                        [Math.floor(game.config.width / 4.5), Math.floor(game.config.height / 1.79)],
                        [Math.floor(game.config.width / 25), Math.floor(game.config.height / 1.47)],
                        [Math.floor(game.config.width / 4.5), Math.floor(game.config.height / 1.47)],
                    ]; //west Position
                }
                break;

            case "NE":
                {
                    answerImagePos = [
                        [Math.floor(game.config.width / 1.35), Math.floor(game.config.height / 4.8)],
                        [Math.floor(game.config.width / 1.04), Math.floor(game.config.height / 4.8)],
                        [Math.floor(game.config.width / 1.35), Math.floor(game.config.height / 3.1)],
                        [Math.floor(game.config.width / 1.04), Math.floor(game.config.height / 3.1)],
                        [Math.floor(game.config.width / 1.35), Math.floor(game.config.height / 2.2)],
                        [Math.floor(game.config.width / 1.04), Math.floor(game.config.height / 2.2)],
                    ];
                }
                break;

            case "NW":
                {
                    answerImagePos = [
                        [Math.floor(game.config.width / 25), Math.floor(game.config.height / 4.8)],
                        [Math.floor(game.config.width / 4.5), Math.floor(game.config.height / 4.8)],
                        [Math.floor(game.config.width / 25), Math.floor(game.config.height / 3.1)],
                        [Math.floor(game.config.width / 4.5), Math.floor(game.config.height / 3.1)],
                        [Math.floor(game.config.width / 25), Math.floor(game.config.height / 2.2)],
                        [Math.floor(game.config.width / 4.5), Math.floor(game.config.height / 2.2)],
                    ]
                }
                break;

            case "SE":
                {
                    answerImagePos = [
                        [Math.floor(game.config.width / 1.35), Math.floor(game.config.height / 1.5)],
                        [Math.floor(game.config.width / 1.04), Math.floor(game.config.height / 1.5)],
                        [Math.floor(game.config.width / 1.35), Math.floor(game.config.height / 1.26)],
                        [Math.floor(game.config.width / 1.04), Math.floor(game.config.height / 1.26)],
                        [Math.floor(game.config.width / 1.35), Math.floor(game.config.height / 1.08)],
                        [Math.floor(game.config.width / 1.04), Math.floor(game.config.height / 1.08)],
                    ];
                }
                break;

            case "SW":
                {
                    answerImagePos = [
                        [Math.floor(game.config.width / 25), Math.floor(game.config.height / 1.5)],
                        [Math.floor(game.config.width / 4.5), Math.floor(game.config.height / 1.5)],
                        [Math.floor(game.config.width / 25), Math.floor(game.config.height / 1.26)],
                        [Math.floor(game.config.width / 4.5), Math.floor(game.config.height / 1.26)],
                        [Math.floor(game.config.width / 25), Math.floor(game.config.height / 1.08)],
                        [Math.floor(game.config.width / 4.5), Math.floor(game.config.height / 1.08)],
                    ];
                }
                break;
        }
        return answerImagePos;
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

}

let _LevelManager = new LevelManager();

export { _LevelManager as LevelManager };