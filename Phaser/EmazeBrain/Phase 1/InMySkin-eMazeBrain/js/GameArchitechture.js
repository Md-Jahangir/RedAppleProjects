import { Database } from './Database.js';
import { LevelManager } from './LevelManager.js';
import { Server } from './Server.js';
class GameArchitechture {
    constructor() {
        //=========General Architechture Variables=============//
        this.movementDirection;
        this.movementTime;
        this.movementType;

        this.offsetForLevelUp;
        this.offsetForLevelDown;

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
        argsArr = [
            this.lastLevelPlayerPlayed,
            this.movementDirection,
            this.movementTime,
            this.totalNumberOfQuestions,
            this.movementType,
            this.totalTimeForGame,
            this.totalTimePerQuestion
        ];
        LevelManager.InitializeLevel(argsArr);
    };
    InitializePerticularLevel(_level) {
        if (parseInt(_level) > 1) {
            for (let i = 0; i < parseInt(_level); i++) {
                if (this.movementTime > 2) {
                    this.movementTime -= 0.25;
                }
            }
        }
        console.log("%c Movement Time :" + this.movementTime,
            "color: white;background: black;font-size: 30px;border: 1px solid red;");
    }
    GeneralGameArchitechture() {
        this.ColourSchemeForImage = Database.GetGeneralData("color_scheme");// Database.color_scheme;        
        this.movementDirection = Database.GetGeneralData("movement_direction");//movement_direction;
        this.movementType = Database.GetGeneralData("movement_type");//movement_type;
        this.movementTime = Database.GetGeneralData("movement_time");

        this.SelectObjectMovement(this.lastLevelPlayerPlayed, 0);
        this.offsetForLevelUp = Database.GetGeneralData("level_up");//.level_up;
        this.offsetForLevelDown = Database.GetGeneralData("level_down");//.level_down;
    };
    SpecialGameArchitechture() {
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
            this.lastLevelPlayerPlayed = parseInt(Server.level);
        }
    };
    UpdateLevelManager(_num) {
        let argsArr = [];
        this.lastLevelPlayerPlayed += parseInt(_num);
        this.SelectObjectMovement(this.lastLevelPlayerPlayed, parseInt(_num));
        argsArr = [
            this.lastLevelPlayerPlayed,
            this.movementDirection,
            this.movementTime,
            this.totalNumberOfQuestions,
            this.movementType,
            this.totalTimeForGame,
            this.totalTimePerQuestion
        ];
        return argsArr;
    };
    //==============General Architechture Methods===============//
    SelectObjectMovement(_levelNumber, _num) {
        if (_num > 0) {
            if (this.movementTime > 2) {
                this.movementTime -= 0.25;
            }
        }
        if (_num < 0) {
            if (parseInt(this.movementTime) != parseInt(Database.GetGeneralData("movement_time"))) {
                // console.log("lev");
                this.movementTime += 0.25;
            }
        }
        console.log("%c Movement Time :" + this.movementTime,
            "color: white;background: black;font-size: 30px;border: 1px solid red;");
    };
    //==============Special Architechture Methods===============//
}
let _GameArchitechture = new GameArchitechture();

export { _GameArchitechture as GameArchitechture };
