import { Database } from './Database.js';
import { LevelManager } from './LevelManager.js';
import { Server } from './Server.js';
class GameArchitechture {
    constructor() {
        this.maxSelectedImageForGame = 2;//maximum number of image to be used from cdn
        this.minSelectedImageForGame = 2;//minimum number of image to be used from cdn
        this.actualNumberOfImageSelected = 2;//actual number of image selected from cdn

        // this.maxImageDisplayOnScreen = 0;//7;// maximum number of image displayed on screen
        // this.minImageDisplayOnScreen = 0;//4;// minimum number of image displayed on screen
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
        //====Setting minimum and maximum number of image======//
        console.log("_level" + _level);
        if (parseInt(_level) <= 14) {
            this.actualImageDisplayOnScreen = parseInt(_level) + 2;
        }
        else {
            // this.actualImageDisplayOnScreen = 8;
            this.actualImageDisplayOnScreen = 16;
        }
        //============ROTATION=======================//
        if (parseInt(_level) < 15) {
            this.isRotationAvialable = false;
        }
        else {
            this.isRotationAvialable = true;
            for (let j = 0; j < (parseInt(_level) - 15); j++) {
                if (parseInt(_level) > 15 && this.imageRotationTime > 4) {
                    this.imageRotationTime -= 0.5;
                }
            }
        }
        //===========MOVEMENT=====================//
        if (parseInt(_level) < 21) {
            this.isMovementAvailable = false;
        }
        else {
            this.isMovementAvailable = true;
            for (let j = 0; j < (parseInt(_level) - 23); j++) {
                if (parseInt(_level) > 20 && this.movementTime > 4) {
                    this.movementTime -= 0.5;
                }
            }
        }
        console.log("this.movementTime============" + this.movementTime);
    }
    GeneralGameArchitechture() {
        // console.log("game Architechture------------");
        this.ColourSchemeForImage = Database.GetGeneralData("color_scheme");// Database.color_scheme;
        this.actualImageDisplayOnScreen = 3;//this.SelectTotalNumberOfImagesForScreen(1);

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
        // console.log("_num "+_num);
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
        // console.log("parseInt(this.lastLevelPlayerPlayed) "+parseInt(this.lastLevelPlayerPlayed));
        // if(parseInt(this.lastLevelPlayerPlayed)<=8)
        if (parseInt(this.lastLevelPlayerPlayed) <= 14) {
            this.actualImageDisplayOnScreen = parseInt(this.lastLevelPlayerPlayed) + 2;
        }
        else {
            // this.actualImageDisplayOnScreen = 8;
            this.actualImageDisplayOnScreen = 16;
        }
        return this.actualImageDisplayOnScreen;
    };
    SelectNumberOfImagesForScreen(_num) {
        if (_num > 0) {
            if (this.actualNumberOfImageSelected < 4) {
                this.actualNumberOfImageSelected += 1;
            }
        }
        else {
            this.actualNumberOfImageSelected -= 1;
        }
        return this.actualNumberOfImageSelected;
    };
    // SelectoColourScheme(){};
    SelectBackgroundImge() {
        if (this.ColourSchemeForImage == "cool") {
            //select image from cold folder
        }
        else if (this.ColourSchemeForImage == "warm") {
            //select image from warm folder
        }
        // console.log("Database.bg_image_location",Database.bg_image_location);
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
        if (parseInt(_levelNumber) < 15) {
            this.isRotationAvialable = false;
        }
        else {
            this.isRotationAvialable = true;
            if (_num > 0) {
                if (parseInt(_levelNumber) > 15 && this.imageRotationTime > 4) {
                    this.imageRotationTime -= 0.5;
                }
            }
            else if (_num < 0) {
                if (parseInt(_levelNumber) > 15 && parseInt(this.imageRotationTime) != parseInt(Database.GetGeneralData("rotation_time"))) {
                    this.imageRotationTime += 0.5;
                }
            }

        }
    };
    // SelectLevelUpDownAmount(_levelNumber){};
    SelectObjectMovement(_levelNumber, _num) {
        if (_levelNumber < 21) {
            this.isMovementAvailable = false;
        }
        else {
            this.isMovementAvailable = true;
            if (_num > 0) {
                if (_levelNumber > 20 && this.movementTime > 4) {
                    this.movementTime -= 0.5;
                }
            }
            else if (_num < 0) {
                if (_levelNumber > 20 && parseInt(this.movementTime) != parseInt(Database.GetGeneralData("movement_time"))) {
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