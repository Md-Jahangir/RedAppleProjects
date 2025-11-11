import { Database } from './Database.js';
import { LevelManager } from './LevelManager.js';
import { Server } from './Server.js';
class GameArchitechture {
    constructor() {
        this.answerImageNumber = 2;
        this.questionImageNumber = 1;
        this.unitValueText;
        //=========General Architechture Variables=============//
        this.ColourSchemeForImage;

        this.isRotationAvialable;
        this.imageRotationType;
        this.imageRotationTime;

        this.isMovementAvailable;
        this.movementDirection;
        this.movementTime;
        this.movementType;

        this.offsetForLevelUp;
        this.offsetForLevelDown;

        this.answerLocation;
        this.totalAnswerSpread;
        this.answerSpreadValue;

        //=========Special Architechture Variables=============//
        this.lastHighScore;
        this.lastSuccessRate;
        this.lastLevelPlayerPlayed;

        this.totalTimeForGame;
        this.totalNumberOfQuestions;

        this.gameDescription;
        this.gameInstruction;

        this.totalTimePerQuestion;
        this.initialNumberOfAnswer;
        this.initialNumberOfDestractor;
        //===========================================================================
        this.unitArray = [];
        this.unitValueSend = [];
    };
    GameArchitechtureInitiallize() {
        this.SpecialGameArchitechture();
        this.GeneralGameArchitechture();
        if (this.lastLevelPlayerPlayed > 1) {
            this.InitializePerticularLevel(this.lastLevelPlayerPlayed);
            // console.log('GameArchitechtureInitiallize');
        }
        let argsArr = [];
        this.unitValueText = this.SelectUnitValuesForLevel();
        //=======> Initialize Level Manager <=============//

        if (this.isMovementAvailable)//Both movement and rotation available
        {
            console.log('this.isMovementAvailable : ', this.isMovementAvailable)
            argsArr = [
                this.lastLevelPlayerPlayed,
                this.answerImageNumber,
                this.questionImageNumber,
                "",
                null,
                this.imageRotationTime,
                this.imageRotationType,
                this.movementDirection,
                this.movementTime,
                this.totalTimeForGame,
                this.totalTimePerQuestion,
                this.totalNumberOfQuestions,
                this.movementType,
                this.unitValueText
            ];
        }
        else if (this.isRotationAvialable)//Only rotation available
        {
            argsArr = [
                this.lastLevelPlayerPlayed,
                this.answerImageNumber,
                this.questionImageNumber,
                "",
                null,
                this.imageRotationTime,
                this.imageRotationType,
                null,
                null,
                this.totalTimeForGame,
                this.totalTimePerQuestion,
                this.totalNumberOfQuestions,
                null,
                this.unitValueText
            ];
        }
        else//Both not available
        {
            argsArr = [
                this.lastLevelPlayerPlayed,
                this.answerImageNumber,
                this.questionImageNumber,
                "",
                null,
                null,
                null,
                null,
                null,
                this.totalTimeForGame,
                this.totalTimePerQuestion,
                this.totalNumberOfQuestions,
                null,
                this.unitValueText
            ];
        }
        console.log('---_arr', argsArr)
        LevelManager.InitializeLevel(argsArr);
    };
    InitializePerticularLevel(_level) {
        if (parseInt(_level) % 2 === 0) {
            this.answerImageNumber = parseInt(_level - 1) - ((parseInt((_level - 1) / 2)) + (parseInt((_level - 1) % 2)));
            this.answerImageNumber += 2;
        }
        else {
            this.answerImageNumber = parseInt(_level) - ((parseInt((_level) / 2)) + (parseInt((_level) % 2)));
            // console.log("this.answerImageNumber==========================="+_level);
            // console.log("this.answerImageNumber==========================="+this.answerImageNumber);
            this.answerImageNumber += 2;
        }
        if (this.answerImageNumber >= 12) {
            this.answerImageNumber = 12;
        }
        //   console.log("this.answerImageNumber==========================="+this.answerImageNumber);
    }
    SelectUnitValuesForLevel() {
        let max = 0;

        // this.unitArray = [
        //     ["g", "Kg"],
        //     ["Cm", "Mtr"],
        //     ["m", "Km"],
        //     ["ml", "Ltr"],
        //     ["months", "Year"],
        //     ["day", "Week"]
        // ];

        this.unitArray = [
            ["g", "Kg"],
            ["Cm", "m"],
            ["m", "Km"],
            ["ml", "L"],
            ["months", "Year"],
            ["day", "Week"]
        ];

        let arr = [];

        if (parseInt(this.lastLevelPlayerPlayed) < 8) {
            max = 3;
        }
        else if (parseInt(this.lastLevelPlayerPlayed) < 15) {
            max = 4;
        }
        else {
            max = 5;
        }
        arr = this.unitArray[LevelManager.GetRandomArbitrary(0, max)];
        // console.log("===arr",LevelManager.GetRandomArbitrary(0,max));
        if (parseInt(this.lastLevelPlayerPlayed) < 11) {
            // if(Math.random() > 0.5)
            return [arr[1]];
            // else
            // return [arr[0]];
        }
        else {
            return arr;
        }
    }
    GeneralGameArchitechture() {
        this.ColourSchemeForImage = Database.GetGeneralData("color_scheme");

        this.imageRotationType = Database.GetGeneralData("rotation");
        this.imageRotationTime = Database.GetGeneralData("rotation_time");
        this.SelectRotationOfImage(this.lastLevelPlayerPlayed, 0);

        this.movementDirection = Database.GetGeneralData("movement_direction");
        this.movementType = Database.GetGeneralData("movement_type");
        this.movementTime = Database.GetGeneralData("movement_time");
        this.SelectObjectMovement(this.lastLevelPlayerPlayed, 0);
        this.SelcetAnswerLocation();
        this.offsetForLevelUp = Database.GetGeneralData("level_up");
        this.offsetForLevelDown = Database.GetGeneralData("level_down");
    };
    SpecialGameArchitechture() {
        this.lastHighScore = Database.GetSpecificData("high_score");
        this.lastSuccessRate = Database.GetSpecificData("success_rate");
        this.lastLevelPlayerPlayed = Database.GetSpecificData("level");
        // console.log('last level player played : ',this.lastLevelPlayerPlayed);

        this.totalTimeForGame = Database.GetSpecificData("time_to_play");
        this.totalNumberOfQuestions = Database.GetSpecificData("number_of_questions");

        this.gameDescription = Database.brain_help;
        this.gameInstruction = Database.GetSpecificData("game_instruction");

        this.totalTimePerQuestion = Database.GetSpecificData("time_per_question");
        this.initialNumberOfAnswer = Database.GetSpecificData("number_of_object");
        this.initialNumberOfDestractor = Database.GetSpecificData("number_of_distractor");
        if (Server.platform == "favorites") {
            this.totalTimeForGame = Server.time;//.time_to_play;
            this.lastLevelPlayerPlayed = parseInt(Server.level)
        }
    };
    UpdateLevelManager(_num) {
        let argsArr = [];
        this.lastLevelPlayerPlayed += parseInt(_num);
        // console.log('UpdateLevelManager');
        this.unitValueText = this.SelectUnitValuesForLevel();
        // let prevActualNumberOfImageSelected = this.actualNumberOfImageSelected;
        this.SelectNumberOfImagesForScreen(parseInt(_num));
        // console.log('a----------->',a)
        // let b = this.SelectUnitsForTheGame(parseInt(_num));
        this.SelectUnitValuesForLevel();
        // console.log('b------------->',b);
        this.SelectRotationOfImage(this.lastLevelPlayerPlayed, parseInt(_num));
        this.SelectObjectMovement(this.lastLevelPlayerPlayed, parseInt(_num));
        this.SelcetAnswerLocation();
        if (this.isMovementAvailable)//Both movement and rotation available
        {
            argsArr = [
                this.lastLevelPlayerPlayed,
                this.answerImageNumber,
                this.questionImageNumber,
                "",
                null,
                this.imageRotationTime,
                this.imageRotationType,
                this.movementDirection,
                this.movementTime,
                this.totalTimeForGame,
                this.totalTimePerQuestion,
                this.totalNumberOfQuestions,
                this.movementType,
                this.unitValueText
            ];
        }
        else if (this.isRotationAvialable)//Only rotation available
        {
            argsArr = [
                this.lastLevelPlayerPlayed,
                this.answerImageNumber,
                this.questionImageNumber,
                "",
                null,
                this.imageRotationTime,
                this.imageRotationType,
                null,
                null,
                this.totalTimeForGame,
                this.totalTimePerQuestion,
                this.totalNumberOfQuestions,
                null,
                this.unitValueText
            ];
        }
        else//Both not available
        {
            argsArr = [
                this.lastLevelPlayerPlayed,
                this.answerImageNumber,
                this.questionImageNumber,
                "",
                null,
                null,
                null,
                null,
                null,
                this.totalTimeForGame,
                this.totalTimePerQuestion,
                this.totalNumberOfQuestions,
                null,
                this.unitValueText
            ];
        }
        return argsArr;
    };
    SelectUnitsForTheGame() {
        let _level = LevelManager.GetCurrentLevelNumber();
        let randomIndex;
        if (_level < 11) {
            randomIndex = Math.floor(Math.random() * this.unitArray.length);
            // console.log('randomIndex',randomIndex);
        }

        // this.questionImageNumber = 1;
        return randomIndex;
    }
    //==============General Architechture Methods===============//
    SelectNumberOfImagesForScreen(_num) {
        let _level = LevelManager.GetCurrentLevelNumber();
        if (parseInt(_level) % 2 === 0) {
            this.answerImageNumber = parseInt(_level - 1) - ((parseInt((_level - 1) / 2)) + (parseInt((_level - 1) % 2)));
            this.answerImageNumber += 2;
        }
        else {
            this.answerImageNumber = parseInt(_level) - ((parseInt((_level) / 2)) + (parseInt((_level) % 2)));
            this.answerImageNumber += 2;
        }
        if (this.answerImageNumber >= 12) {
            this.answerImageNumber = 12;
        }
        console.log("this.answerImageNumber=====" + this.answerImageNumber);
        return this.answerImageNumber;
    };
    SelectBackgroundImge() {
        let allBgLocation = [...Database.bg_image_location];
        let allBgName = [];
        let index;
        let singleImage;
        for (let i = 0; i < allBgLocation.length; i++) {
            singleImage = allBgLocation[i];
            singleImage = singleImage.split(".");
            allBgName.push(singleImage[0]);
        }
        return allBgName;
    };
    SelectRotationOfImage(_levelNumber, _num) {
        if (_levelNumber < 7) {
            this.isRotationAvialable = false;
        } else {
            this.isRotationAvialable = true;
            if (_num < 0) {
                if ((_levelNumber > 7) && (this.imageRotationTime < parseInt(Database.GetGeneralData("rotation_time")))) {
                    this.imageRotationTime += 0.5;
                }
            } else if (_num > 0) {
                if ((_levelNumber > 7) && (this.imageRotationTime > 4)) {
                    this.imageRotationTime -= 0.5;
                }
            }
        }
    };


    SelectObjectMovement(_levelNumber, _num) {
        if (_levelNumber < 11) {
            this.isMovementAvailable = false;
        } else {
            this.isMovementAvailable = true;
            this.isMovementAvailable = true;
            if (_num < 0) {
                if ((_levelNumber > 11) && (this.movementTime < parseInt(Database.GetGeneralData("movement_time")))) {
                    this.movementTime += 0.5;
                }
            }
            else if (_num > 0) {
                if ((_levelNumber > 11) && (this.movementTime > 3)) {
                    this.movementTime -= 0.5;
                }
            }
        }
    }

    SelcetAnswerLocation() {
        if (Database.answer_location != "random") {
            this.answerLocation = Database.GetGeneralData("answer_location");
            this.totalAnswerSpread = Database.GetGeneralData("answer_location_spread");//((this.actualImageDisplayOnScreen*70)/100);
            this.answerSpreadValue = Database.GetGeneralData("answer_location_spread_value");
        }
        else {
            this.answerLocation = null;//Database.answer_location;
            this.totalAnswerSpread = 0;
            this.answerSpreadValue = 0;
        }
    };
    //==============Special Architechture Methods===============//
}
let _GameArchitechture = new GameArchitechture();

export { _GameArchitechture as GameArchitechture };