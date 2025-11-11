import { Database } from './Database.js';
import { LevelManager } from './LevelManager.js';
import { Server } from './Server.js';
class GameArchitechture {
    constructor() {
        this.actualNumberOfImageSelected = 2; //actual number of image selected from cdn
        //=========General Architechture Variables=============//
        this.ColourSchemeForImage;

        // this.isRotationAvialable;
        // this.imageRotationType;
        // this.imageRotationTime;

        // this.isMovementAvailable;
        // this.movementDirection;
        // this.movementTime;
        // this.movementType;

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

        LevelManager.InitializeLevel([
            this.lastLevelPlayerPlayed,
            this.actualNumberOfImageSelected,
            this.totalTimeForGame,
            this.totalTimePerQuestion,
            this.totalNumberOfQuestions
        ]);
    };
    InitializePerticularLevel(_level) {
        //====Setting actual number of type of image===============//
        this.actualNumberOfImageSelected = this.SelectNumberOfImagesForScreen();
        console.log(" this.actualNumberOfImageSelected ->" + this.actualNumberOfImageSelected);

    }
    GeneralGameArchitechture() {
        // console.log("game Architechture------------");
        this.ColourSchemeForImage = Database.GetGeneralData("color_scheme"); // Database.color_scheme;
        this.actualNumberOfImageSelected = this.SelectNumberOfImagesForScreen(-1);
        // this.selectedImageType = this.SelectImageType();

        this.imageRotationType = Database.GetGeneralData("rotation"); //rotation;
        this.imageRotationTime = Database.GetGeneralData("rotation_time"); //rotation_time;
        // this.SelectRotationOfImage(this.lastLevelPlayerPlayed, 0);

        this.movementDirection = Database.GetGeneralData("movement_direction"); //movement_direction;
        this.movementType = Database.GetGeneralData("movement_type"); //movement_type;
        this.movementTime = Database.GetGeneralData("movement_time"); //movement_time ;
        // this.SelcetAnswerLocation();
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
            this.totalTimeForGame = Server.time;//.time_to_play;
            this.lastLevelPlayerPlayed = parseInt(Server.level)
        }
    };
    UpdateLevelManager(_num) {
        let argsArr = [];

        this.lastLevelPlayerPlayed += parseInt(_num);
        this.actualNumberOfImageSelected = this.SelectNumberOfImagesForScreen(parseInt(_num));
        this.SelcetAnswerLocation();
        argsArr = [
            this.lastLevelPlayerPlayed,
            this.actualNumberOfImageSelected,
            this.totalTimeForGame,
            this.totalTimePerQuestion,
            this.totalNumberOfQuestions
        ];
        return argsArr;
    };

    SelectNumberOfImagesForScreen() {
        if (this.lastLevelPlayerPlayed > 1) {
            return (this.lastLevelPlayerPlayed + 2);
        }
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

}
let _GameArchitechture = new GameArchitechture();

export { _GameArchitechture as GameArchitechture };