import { Database } from './Database.js';
import { LevelManager } from './LevelManager.js';
import { Server } from './Server.js';
class GameArchitechture {
    constructor() {
        this.actualNumberOfImageSelected = 0;//actual number of image selected from cdn
        this.actualImageDisplayOnScreen = 1;// actual number of image displayed on screen

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
        //=======> Initialize Level Manager <=============//        
        if (this.isMovementAvailable)//Both movement and rotation available
        {
            argsArr = [
                this.lastLevelPlayerPlayed,
                this.actualNumberOfImageSelected,
                this.actualImageDisplayOnScreen,
                "",
                15,
                this.imageRotationTime,
                this.imageRotationType,
                this.movementDirection,
                this.movementTime,
                this.totalTimeForGame,
                this.totalTimePerQuestion,
                this.totalNumberOfQuestions,
                this.movementType
            ];
        }
        else if (this.isRotationAvialable)//Only rotation available
        {
            argsArr = [
                this.lastLevelPlayerPlayed,
                this.actualNumberOfImageSelected,
                this.actualImageDisplayOnScreen,
                "",
                15,
                this.imageRotationTime,
                this.imageRotationType,
                null,
                null,
                this.totalTimeForGame,
                this.totalTimePerQuestion,
                this.totalNumberOfQuestions,
                null
            ];
        }
        else//Both not available
        {
            argsArr = [
                this.lastLevelPlayerPlayed,
                this.actualNumberOfImageSelected,
                this.actualImageDisplayOnScreen,
                "",
                null,
                null,
                null,
                null,
                null,
                this.totalTimeForGame,
                this.totalTimePerQuestion,
                this.totalNumberOfQuestions,
                null
            ];
        }
        LevelManager.InitializeLevel(argsArr);
    };
    InitializePerticularLevel(_level) {
        //====Select Actual Image number======// 
        if (_level < 9) {
            this.actualNumberOfImageSelected = 1;
        }
        else if (_level < 17) {
            this.actualNumberOfImageSelected = 2;
        }
        else {
            this.actualNumberOfImageSelected = 3;
        }
        //====Setting actual number of type of image===============//
        if (_level < 11) {
            console.log('_level : ', _level)
            this.actualImageDisplayOnScreen = (_level + 1);
        }
        else {
            this.actualImageDisplayOnScreen = 12;
        }
        //=========Rotation and movement ========================//
        console.log(" this.movementTime" + this.movementTime);
        this.movementTime = Database.GetGeneralData("movement_time");
        if (_level > 15) {
            for (let i = 0; i < (_level - 15); i++) {
                if (this.movementTime > 4) {
                    this.movementTime -= 0.5;
                }
            }
        }
        this.imageRotationTime = Database.GetGeneralData("rotation_time");
        if (_level > 11) {
            for (let i = 0; i < (_level - 11); i++) {
                if (this.imageRotationTime > 4) {
                    this.imageRotationTime -= 0.5;
                }
            }
        }
    }
    GeneralGameArchitechture() {
        // console.log("game Architechture------------");
        this.ColourSchemeForImage = Database.GetGeneralData("color_scheme");// Database.color_scheme;
        this.actualImageDisplayOnScreen = this.SelectTotalNumberOfImagesForScreen(1);

        this.imageRotationType = Database.GetGeneralData("rotation");//rotation;
        this.imageRotationTime = Database.GetGeneralData("rotation_time");//rotation_time;
        this.SelectRotationOfImage(this.lastLevelPlayerPlayed);

        this.movementDirection = Database.GetGeneralData("movement_direction");//movement_direction;
        this.movementType = Database.GetGeneralData("movement_type");//movement_type;
        this.movementTime = Database.GetGeneralData("movement_time");//movement_time ;
        this.SelectObjectMovement(this.lastLevelPlayerPlayed);
        this.SelcetAnswerLocation();
        this.offsetForLevelUp = Database.GetGeneralData("level_up");//.level_up;
        this.offsetForLevelDown = Database.GetGeneralData("level_down");//.level_down;
    };
    SpecialGameArchitechture() {
        // console.log("game Architechture------------");
        this.lastHighScore = Database.GetSpecificData("high_score");//.high_score;
        this.lastSuccessRate = Database.GetSpecificData("success_rate");//.success_rate;
        this.lastLevelPlayerPlayed = 16// Database.GetSpecificData("level");//.level;

        this.totalTimeForGame = 60000//Database.GetSpecificData("time_to_play");//.time_to_play;
        this.totalNumberOfQuestions = Database.GetSpecificData("number_of_questions");//.number_of_questions;

        this.gameDescription = Database.brain_help;
        this.gameInstruction = Database.GetSpecificData("game_instruction");//.game_instruction;

        this.totalTimePerQuestion = Database.GetSpecificData("time_per_question");//.time_per_question;
        this.initialNumberOfAnswer = Database.GetSpecificData("number_of_object");//.number_of_object;
        this.initialNumberOfDestractor = Database.GetSpecificData("number_of_distractor");//.number_of_distractor;
        this.actualNumberOfImageSelected = this.SelectNumberOfImagesForScreen(0);
        if (Server.platform == "favorites") {
            // this.totalTimeForGame = Server.time;//.time_to_play;
            // this.lastLevelPlayerPlayed = parseInt(Server.level)
        }
    };
    UpdateLevelManager(_num) {
        let argsArr = [];

        this.actualNumberOfImageSelected = this.SelectNumberOfImagesForScreen(parseInt(_num));
        this.lastLevelPlayerPlayed += parseInt(_num);
        this.actualImageDisplayOnScreen = this.SelectTotalNumberOfImagesForScreen(parseInt(_num));

        this.SelectRotationOfImage(this.lastLevelPlayerPlayed, parseInt(_num));
        this.SelectObjectMovement(this.lastLevelPlayerPlayed, parseInt(_num));
        this.SelcetAnswerLocation();


        if (this.isMovementAvailable)//Both movement and rotation available
        {
            argsArr = [
                this.lastLevelPlayerPlayed,
                this.actualNumberOfImageSelected,
                this.actualImageDisplayOnScreen,
                "",
                15,
                this.imageRotationTime,
                this.imageRotationType,
                this.movementDirection,
                this.movementTime,
                this.totalTimeForGame,
                this.totalTimePerQuestion,
                this.totalNumberOfQuestions
            ];
        }
        else if (this.isRotationAvialable)//Only rotation available
        {
            argsArr = [
                this.lastLevelPlayerPlayed,
                this.actualNumberOfImageSelected,
                this.actualImageDisplayOnScreen,
                "",
                15,
                this.imageRotationTime,
                this.imageRotationType,
                null,
                null,
                this.totalTimeForGame,
                this.totalTimePerQuestion,
                this.totalNumberOfQuestions
            ];
        }
        else//Both not available
        {
            argsArr = [
                this.lastLevelPlayerPlayed,
                this.actualNumberOfImageSelected,
                this.actualImageDisplayOnScreen,
                "",
                null,
                null,
                null,
                null,
                null,
                this.totalTimeForGame,
                this.totalTimePerQuestion,
                this.totalNumberOfQuestions
            ];
        }
        return argsArr;
    };
    //==============General Architechture Methods===============//
    SelectTotalNumberOfImagesForScreen(_num) {
        if (_num < 0) {
            if (this.actualImageDisplayOnScreen > 2) {
                this.actualImageDisplayOnScreen -= 1;
            }
        }
        else {
            if (this.actualImageDisplayOnScreen < 12) {
                this.actualImageDisplayOnScreen += 1;
            }
        }
        return this.actualImageDisplayOnScreen;
    };
    SelectNumberOfImagesForScreen(_num) {
        if (this.lastLevelPlayerPlayed < 9) {
            this.actualNumberOfImageSelected = 1;
        }
        else if (this.lastLevelPlayerPlayed < 17) {
            this.actualNumberOfImageSelected = 2;
        }
        else {
            this.actualNumberOfImageSelected = 3;
        }
        console.log("  this.actualNumberOfImageSelected " + this.actualNumberOfImageSelected);
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
        return allBgName;
    };
    SelectRotationOfImage(_levelNumber, _num) {
        if (_levelNumber < 11) {
            this.isRotationAvialable = false;
        }
        else {
            this.isRotationAvialable = true;
            if (_num > 0) {
                if (_levelNumber > 11 && this.imageRotationTime > 4) {
                    this.imageRotationTime -= 0.5;
                }
            }
            else {
                if ((_levelNumber > 11) &&
                    (this.imageRotationTime != Database.GetGeneralData("rotation_time"))) {
                    this.imageRotationTime += 0.5;
                }
            }
        }
    };
    SelectObjectMovement(_levelNumber, _num) {
        if (_levelNumber < 15) {
            this.isMovementAvailable = false;
        }
        else {
            this.isMovementAvailable = true;
            if (_num > 0) {
                if ((_levelNumber > 15) && (this.movementTime > 4)) {
                    this.movementTime -= 0.5;
                }
            }
            else {
                if ((_levelNumber > 15) &&
                    (this.movementTime != Database.GetGeneralData("movement_time"))) {
                    this.movementTime += 0.5;
                }
            }
        }
    };
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