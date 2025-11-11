import { Database } from './Database.js';
import { LevelManager } from './LevelManager.js';
import { Server } from './Server.js';
class GameArchitechture {
    constructor() {
        this.maxSelectedImageForGame = 2;//maximum number of image to be used from cdn
        this.minSelectedImageForGame = 2;//minimum number of image to be used from cdn
        this.actualNumberOfImageSelected = 2;//actual number of image selected from cdn

        this.maxImageDisplayOnScreen = 0;//7;// maximum number of image displayed on screen
        this.minImageDisplayOnScreen = 0;//4;// minimum number of image displayed on screen
        this.actualImageDisplayOnScreen;// actual number of image displayed on screen

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
        //====Setting total number of image===============//
        this.maxImageDisplayOnScreen = _level + 7;//maximum number of image to be used from cdn
        this.minImageDisplayOnScreen = _level + 4;//minimum number of image to be used from cdn
        if (this.maxImageDisplayOnScreen > 23) {
            this.maxImageDisplayOnScreen = 23;
        }
        if (this.minImageDisplayOnScreen > 20) {
            this.minImageDisplayOnScreen = 20;
        }
        this.actualImageDisplayOnScreen = Math.floor(Math.random() *
            (this.maxImageDisplayOnScreen - this.minImageDisplayOnScreen + 1)
            + this.minImageDisplayOnScreen);
        //====Setting actual number of type of image===============//
        console.log("_level -> " + parseInt(_level));
        if (parseInt(_level) <= 5) {
            this.actualNumberOfImageSelected = 2;
        }
        else if (parseInt(_level) >= 6 && parseInt(_level) < 10) {
            this.actualNumberOfImageSelected = 3;
        }
        else if (parseInt(_level) >= 11) {
            this.actualNumberOfImageSelected = 4;
        }
        console.log(" this.actualNumberOfImageSelected ->" + this.actualNumberOfImageSelected);
        //==========Rotaion in the game ======================//
        if (parseInt(_level) < 17) {
            this.isRotationAvialable = false;
        }
        else {
            this.isRotationAvialable = true;
            for (let j = 0; j < (parseInt(_level) - 17); j++) {
                if (parseInt(_level) > 17 && this.imageRotationTime > 4) {
                    this.imageRotationTime -= 0.5;
                }
            }
        }
        //============== Movement in the game ===================//
        if (parseInt(_level) < 23) {
            this.isMovementAvailable = false;
        }
        else {
            this.isMovementAvailable = true;
            for (let j = 0; j < (parseInt(_level) - 23); j++) {
                if (parseInt(_level) > 23 && this.movementTime > 4) {
                    this.movementTime -= 0.5;
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
        this.SelectRotationOfImage(this.lastLevelPlayerPlayed, 0);

        this.movementDirection = Database.GetGeneralData("movement_direction");//movement_direction;
        this.movementType = Database.GetGeneralData("movement_type");//movement_type;
        this.movementTime = Database.GetGeneralData("movement_time");//movement_time ;
        this.SelectObjectMovement(this.lastLevelPlayerPlayed, 0);
        this.SelcetAnswerLocation();
        this.offsetForLevelUp = Database.GetGeneralData("level_up");//.level_up;
        this.offsetForLevelDown = Database.GetGeneralData("level_down");//.level_down;
    };
    SpecialGameArchitechture() {
        // console.log("game Architechture------------");
        this.lastHighScore = Database.GetSpecificData("high_score");//.high_score;
        this.lastSuccessRate = Database.GetSpecificData("success_rate");//.success_rate;
        this.lastLevelPlayerPlayed = Database.GetSpecificData("level");//.level;

        this.totalTimeForGame = Database.GetSpecificData("time_to_play");//.time_to_play;
        this.totalNumberOfQuestions = Database.GetSpecificData("number_of_questions");//.number_of_questions;

        this.gameDescription = Database.brain_help;
        this.gameInstruction = Database.GetSpecificData("game_instruction");//.game_instruction;

        this.totalTimePerQuestion = Database.GetSpecificData("time_per_question");//.time_per_question;
        this.initialNumberOfAnswer = Database.GetSpecificData("number_of_object");//.number_of_object;
        this.initialNumberOfDestractor = Database.GetSpecificData("number_of_distractor");//.number_of_distractor;
        if (Server.platform == "favorites") {
            this.totalTimeForGame = Server.time;//.time_to_play;
            this.lastLevelPlayerPlayed = parseInt(Server.level)
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

        console.log('argsArr', argsArr);

        return argsArr;
    };
    //==============General Architechture Methods===============//
    SelectTotalNumberOfImagesForScreen(_num) {
        this.maxImageDisplayOnScreen = this.lastLevelPlayerPlayed + 7;//maximum number of image to be used from cdn
        this.minImageDisplayOnScreen = this.lastLevelPlayerPlayed + 4;//minimum number of image to be used from cdn
        if (this.maxImageDisplayOnScreen > 23) {
            this.maxImageDisplayOnScreen = 23;
        }
        if (this.minImageDisplayOnScreen > 20) {
            this.minImageDisplayOnScreen = 20;
        }
        let number = Math.floor(Math.random() *
            (this.maxImageDisplayOnScreen - this.minImageDisplayOnScreen)
            + this.minImageDisplayOnScreen);
        return number;
    };
    SelectNumberOfImagesForScreen(_num) {
        if (parseInt(this.lastLevelPlayerPlayed) >= 1 && parseInt(this.lastLevelPlayerPlayed) <= 5) {
            this.actualNumberOfImageSelected = 2;
        }
        else if (parseInt(this.lastLevelPlayerPlayed) >= 6 && parseInt(this.lastLevelPlayerPlayed) <= 10) {
            this.actualNumberOfImageSelected = 3;
        }
        else if (parseInt(this.lastLevelPlayerPlayed) >= 11) {
            this.actualNumberOfImageSelected = 4;
        }
        console.log("this.actualNumberOfImageSelected->" + this.actualNumberOfImageSelected);
        console.log("this.lastLevelPlayerPlayed->" + (parseInt(this.lastLevelPlayerPlayed)));
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
        if (_levelNumber < 17) {
            this.isRotationAvialable = false;
        }
        else {
            this.isRotationAvialable = true;
            if (_num < 0) {
                if ((_levelNumber > 17) && (this.imageRotationTime < parseInt(Database.GetGeneralData("rotation_time")))) {
                    this.imageRotationTime += 0.5;
                }
            }
            else if (_num > 0) {
                if ((_levelNumber > 17) && (this.imageRotationTime > 4)) {
                    this.imageRotationTime -= 0.5;
                }
            }
        }
    };
    SelectObjectMovement(_levelNumber, _num) {
        if (_levelNumber < 23) {
            this.isMovementAvailable = false;
        }
        else {
            this.isMovementAvailable = true;
            // if(_num > 0)
            if (_num < 0) {
                if ((_levelNumber > 23) && (this.movementTime < parseInt(Database.GetGeneralData("movement_time")))) {
                    this.movementTime += 0.5;
                }
            }
            // else if(_num < 0)
            else if (_num > 0) {
                if ((_levelNumber > 23) && (this.movementTime > 4)) {
                    this.movementTime -= 0.5;
                }
            }
        }
    };
    SelcetAnswerLocation() {
        if (Database.answer_location != "random") {
            this.answerLocation = Database.GetGeneralData("answer_location");
            this.totalAnswerSpread = Database.GetGeneralData("answer_location_spread");
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