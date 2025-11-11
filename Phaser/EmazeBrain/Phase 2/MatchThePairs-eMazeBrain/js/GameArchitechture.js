import { Database } from './Database.js';
import { LevelManager } from './LevelManager.js';
import { Server } from './Server.js';
class GameArchitechture {
    constructor() {
        this.actualNumberOfImageSelected = 2; //actual number of image selected from cdn
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
    };
    GameArchitechtureInitiallize() {
        this.SpecialGameArchitechture();
        this.GeneralGameArchitechture();
        if (this.lastLevelPlayerPlayed > 1) {
            this.InitializePerticularLevel(this.lastLevelPlayerPlayed);
        }
        let argsArr = [];
        let currentLevelGrid = this.GridSelection(this.lastLevelPlayerPlayed);
        this.maximumNUmberOfAttempts = this.CalculateMaximumAllowedAttempts(this.lastLevelPlayerPlayed, this.actualNumberOfImageSelected);
        //=======> Initialize Level Manager <=============//

        if (this.isMovementAvailable) //Both movement and rotation available
        {
            argsArr = [
                this.lastLevelPlayerPlayed,
                this.actualNumberOfImageSelected,
                "",
                15,
                this.imageRotationTime,
                this.imageRotationType,
                this.movementDirection,
                this.movementTime,
                this.totalTimeForGame,
                this.totalTimePerQuestion,
                this.totalNumberOfQuestions,
                this.selectedImageType,
                currentLevelGrid,
                this.maximumNUmberOfAttempts
            ];
        } else if (this.isRotationAvialable) //Only rotation available
        {
            argsArr = [
                this.lastLevelPlayerPlayed,
                this.actualNumberOfImageSelected,
                "",
                15,
                this.imageRotationTime,
                this.imageRotationType,
                null,
                null,
                this.totalTimeForGame,
                this.totalTimePerQuestion,
                this.totalNumberOfQuestions,
                this.selectedImageType,
                currentLevelGrid,
                this.maximumNUmberOfAttempts
            ];
        } else //Both not available
        {
            argsArr = [
                this.lastLevelPlayerPlayed,
                this.actualNumberOfImageSelected,
                "",
                null,
                null,
                null,
                null,
                null,
                this.totalTimeForGame,
                this.totalTimePerQuestion,
                this.totalNumberOfQuestions,
                this.selectedImageType,
                currentLevelGrid,
                this.maximumNUmberOfAttempts
            ];
        }
        LevelManager.InitializeLevel(argsArr);
    };
    InitializePerticularLevel(_level) {
        //====Setting actual number of type of image===============//
        this.actualNumberOfImageSelected = this.SelectNumberOfImagesForScreen();
        this.selectedImageType = this.SelectImageType();
        console.log(" this.actualNumberOfImageSelected ->" + this.actualNumberOfImageSelected);

        //==========Rotaion in the game ======================//
        if (parseInt(_level) < 21) {
            this.isRotationAvialable = false;
        } else {
            this.isRotationAvialable = true;
            for (let j = 0; j < (parseInt(_level) - 21); j++) {
                if (this.imageRotationTime > 4) {
                    this.imageRotationTime -= 0.5;
                }
            }
        }
    }
    GeneralGameArchitechture() {
        // console.log("game Architechture------------");
        this.ColourSchemeForImage = Database.GetGeneralData("color_scheme"); // Database.color_scheme;
        this.actualNumberOfImageSelected = this.SelectNumberOfImagesForScreen(-1);
        this.selectedImageType = this.SelectImageType();

        this.imageRotationType = Database.GetGeneralData("rotation"); //rotation;
        this.imageRotationTime = Database.GetGeneralData("rotation_time"); //rotation_time;
        this.SelectRotationOfImage(this.lastLevelPlayerPlayed, 0);

        this.movementDirection = Database.GetGeneralData("movement_direction"); //movement_direction;
        this.movementType = Database.GetGeneralData("movement_type"); //movement_type;
        this.movementTime = Database.GetGeneralData("movement_time"); //movement_time ;
        this.SelcetAnswerLocation();
        this.offsetForLevelUp = Database.GetGeneralData("level_up"); //.level_up;
        this.offsetForLevelDown = Database.GetGeneralData("level_down"); //.level_down;auto_correct
        this.auto_correct = Database.GetGeneralData("auto_correct"); //auto_correct
        // this.SelectObjectMovement(this.lastLevelPlayerPlayed, 0);
    };
    SpecialGameArchitechture() {
        // console.log("game Architechture------------");
        this.lastHighScore = Database.GetSpecificData("high_score"); //.high_score;
        this.lastSuccessRate = Database.GetSpecificData("success_rate"); //.success_rate;
        this.lastLevelPlayerPlayed = Database.GetSpecificData("level"); //.level;

        this.totalTimeForGame = Database.GetSpecificData("time_to_play"); //.time_to_play;
        this.totalNumberOfQuestions = Database.GetSpecificData("number_of_questions"); //.number_of_questions;

        this.gameDescription = Database.brain_help;
        this.gameInstruction = Database.GetSpecificData("game_instruction"); //.game_instruction;

        this.totalTimePerQuestion = Database.GetSpecificData("time_per_question"); //.time_per_question;
        this.initialNumberOfAnswer = Database.GetSpecificData("number_of_object"); //.number_of_object;
        this.initialNumberOfDestractor = Database.GetSpecificData("number_of_distractor"); //.number_of_distractor;
        if (Server.platform == "favorites") {
            this.totalTimeForGame = parseInt(Server.time);//.time_to_play;
            this.lastLevelPlayerPlayed = parseInt(Server.level)
        }
    };
    UpdateLevelManager(_num) {
        let argsArr = [];

        this.lastLevelPlayerPlayed += parseInt(_num);
        this.actualNumberOfImageSelected = this.SelectNumberOfImagesForScreen(parseInt(_num));
        this.selectedImageType = this.SelectImageType();

        this.SelectRotationOfImage(this.lastLevelPlayerPlayed, parseInt(_num));
        this.SelcetAnswerLocation();
        // this.SelectObjectMovement(this.lastLevelPlayerPlayed, _num);
        let currentLevelGrid = this.GridSelection(this.lastLevelPlayerPlayed);
        this.maximumNUmberOfAttempts = this.CalculateMaximumAllowedAttempts(this.lastLevelPlayerPlayed, this.actualNumberOfImageSelected);

        if (this.isMovementAvailable) //Both movement and rotation available
        {
            argsArr = [
                this.lastLevelPlayerPlayed,
                this.actualNumberOfImageSelected,
                "",
                15,
                this.imageRotationTime,
                this.imageRotationType,
                this.movementDirection,
                this.movementTime,
                this.totalTimeForGame,
                this.totalTimePerQuestion,
                this.totalNumberOfQuestions,
                this.selectedImageType,
                currentLevelGrid,
                this.maximumNUmberOfAttempts
            ];
        } else if (this.isRotationAvialable) //Only rotation available
        {
            argsArr = [
                this.lastLevelPlayerPlayed,
                this.actualNumberOfImageSelected,
                "",
                15,
                this.imageRotationTime,
                this.imageRotationType,
                null,
                null,
                this.totalTimeForGame,
                this.totalTimePerQuestion,
                this.totalNumberOfQuestions,
                this.selectedImageType,
                currentLevelGrid,
                this.maximumNUmberOfAttempts
            ];
        } else //Both not available
        {
            argsArr = [
                this.lastLevelPlayerPlayed,
                this.actualNumberOfImageSelected,
                "",
                null,
                null,
                null,
                null,
                null,
                this.totalTimeForGame,
                this.totalTimePerQuestion,
                this.totalNumberOfQuestions,
                this.selectedImageType,
                currentLevelGrid,
                this.maximumNUmberOfAttempts
            ];
        }
        return argsArr;
    };
    SelectNumberOfImagesForScreen() {
        let grid = this.GridSelection(this.lastLevelPlayerPlayed)
        this.actualNumberOfImageSelected = Math.floor(((grid[0] * grid[1]) - grid[2]) / 2);
        return this.actualNumberOfImageSelected;
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
        console.log('allbgname: ', allBgName)
        return allBgName;
    };
    SelectRotationOfImage(_levelNumber, _num) {
        if (_levelNumber < 21) {
            this.isRotationAvialable = false;
        } else {
            this.isRotationAvialable = true;
            if (_num < 0) {
                if ((_levelNumber > 21) && (this.imageRotationTime < parseInt(Database.GetGeneralData("rotation_time")))) {
                    this.imageRotationTime += 0.5;
                }
            } else if (_num > 0) {
                if ((_levelNumber > 21) && (this.imageRotationTime > 4)) {
                    this.imageRotationTime -= 0.5;
                }
            }
        }
    };
    SelcetAnswerLocation() {
        if (Database.answer_location != "random") {
            this.answerLocation = Database.GetGeneralData("answer_location");
            this.totalAnswerSpread = Database.GetGeneralData("answer_location_spread");
            this.answerSpreadValue = Database.GetGeneralData("answer_location_spread_value");
        } else {
            this.answerLocation = null; //Database.answer_location;
            this.totalAnswerSpread = 0;
            this.answerSpreadValue = 0;
        }
    };
    GridSelection(_level) {
        switch (parseInt(_level)) {
            case 1:
                return [2, 2, 0]; //[Cols,Rows,No_Of_Blocks]
            case 2:
                return [3, 2, 2]; //[Cols,Rows,No_Of_Blocks]
            case 3:
                return [3, 2, 0]; //[Cols,Rows,No_Of_Blocks]
            case 4:
                return [4, 2, 2]; //[Cols,Rows,No_Of_Blocks]
            case 5:
                return [4, 2, 0]; //[Cols,Rows,No_Of_Blocks]
            case 6:
                return [4, 3, 4]; //[Cols,Rows,No_Of_Blocks]
            case 7:
                return [4, 3, 2]; //[Cols,Rows,No_Of_Blocks]
            case 8:
                return [4, 3, 0]; //[Cols,Rows,No_Of_Blocks]
            case 9:
                return [5, 3, 3]; //[Cols,Rows,No_Of_Blocks]
            case 10:
                return [5, 3, 1]; //[Cols,Rows,No_Of_Blocks]
            case 11:
                return [5, 3, 1]; //[Cols,Rows,No_Of_Blocks]
            case 12:
                return [6, 3, 4]; //[Cols,Rows,No_Of_Blocks]
            case 13:
                return [6, 3, 2]; //[Cols,Rows,No_Of_Blocks]
            case 14:
                return [6, 3, 0]; //[Cols,Rows,No_Of_Blocks]
            case 15:
                return [6, 4, 6]; //[Cols,Rows,No_Of_Blocks]
            case 16:
                return [6, 4, 4]; //[Cols,Rows,No_Of_Blocks]
            case 17:
                return [6, 4, 2]; //[Cols,Rows,No_Of_Blocks]
            case 18:
                return [6, 4, 0]; //[Cols,Rows,No_Of_Blocks]
            case 19:
                return [7, 4, 4]; //[Cols,Rows,No_Of_Blocks]
            case 20:
                return [7, 4, 2]; //[Cols,Rows,No_Of_Blocks]
            case 21:
                return [7, 4, 0]; //[Cols,Rows,No_Of_Blocks]
            case 22:
                return [8, 4, 4]; //[Cols,Rows,No_Of_Blocks]
            case 23:
                return [8, 4, 2]; //[Cols,Rows,No_Of_Blocks]
            case 24:
                return [8, 4, 0]; //[Cols,Rows,No_Of_Blocks]
            case 25:
                return [8, 4, 0]; //[Cols,Rows,No_Of_Blocks]
            case 26:
                return [8, 4, 0]; //[Cols,Rows,No_Of_Blocks]
            default:
                return [8, 4, 0]; //[Cols,Rows,No_Of_Blocks]
        }
    };
    SelectImageType() {
        let image = 0,
            item = 0;
        let grid = this.GridSelection(this.lastLevelPlayerPlayed)
        if (this.lastLevelPlayerPlayed < 11) {
            image = this.actualNumberOfImageSelected;
        } else if (this.lastLevelPlayerPlayed < 16) {
            image = (this.actualNumberOfImageSelected - 1);
            item = 1;
        } else if (this.lastLevelPlayerPlayed < 21) {
            image = (this.actualNumberOfImageSelected - 2);
            item = 1;
        } else {
            image = (this.actualNumberOfImageSelected - 3);
            item = 3;
        }
        return ({
            "image": image,
            "item": item,
            "blocked": grid[2]
        });
    };
    //===========> Allowed  attempts <===============//
    CalculateMaximumAllowedAttempts(_level, _pairs) {

        let minimuPairSelectionError = Math.ceil(0.5 * _pairs);
        let allowedAttempts = null;
        if (_level < 11) {
            allowedAttempts = _pairs + Math.ceil(minimuPairSelectionError * 1.5);
        } else if (_level < 21) {
            allowedAttempts = _pairs + Math.ceil(minimuPairSelectionError * 1.2);
        } else {
            allowedAttempts = _pairs + Math.ceil(minimuPairSelectionError + 1);
        }
        return allowedAttempts;
    };
}
let _GameArchitechture = new GameArchitechture();

export { _GameArchitechture as GameArchitechture };