import { Database } from './Database.js';
import { LevelManager } from './LevelManager.js';
import { Server } from './Server.js';
class GameArchitechture {
    constructor() {
        //=========General Architechture Variables=============//
        this.isRotationAvialable;
        this.imageRotationType;
        this.imageRotationTime;
        this.offsetForLevelUp;
        this.offsetForLevelDown;
        //=========Special Architechture Variables=============//
        this.lastHighScore;
        this.lastSuccessRate;
        this.lastLevelPlayerPlayed;
        this.totalTimeForGame;
        this.totalNumberOfQuestions;
        // this.gameDescription;
        // this.gameInstruction;
        this.totalTimePerQuestion;
    };
    GameArchitechtureInitiallize() {
        this.SpecialGameArchitechture();
        // if(this.lastLevelPlayerPlayed >1 )
        // {
        //     this.InitializePerticularLevel(this.lastLevelPlayerPlayed);
        // }
        this.GeneralGameArchitechture();
        let argsArr = [];
        //=======> Initialize Level Manager <=============//

        if (this.isRotationAvialable)//Only rotation available
        {
            argsArr = [
                this.lastLevelPlayerPlayed,
                this.imageRotationTime,
                this.imageRotationType,
                this.totalTimeForGame,
                this.totalTimePerQuestion,
                this.totalNumberOfQuestions,
            ];
        }
        else//Both not available
        {
            argsArr = [
                this.lastLevelPlayerPlayed,
                null,
                null,
                this.totalTimeForGame,
                this.totalTimePerQuestion,
                this.totalNumberOfQuestions
            ];
        }
        LevelManager.InitializeLevel(argsArr);
    };
    InitializePerticularLevel(_level) { };
    GeneralGameArchitechture() {
        // console.log("game Architechture------------");
        this.imageRotationType = Database.GetGeneralData("rotation");//rotation;
        this.imageRotationTime = Database.GetGeneralData("rotation_time");//rotation_time;
        this.SelectRotationOfImage(this.lastLevelPlayerPlayed, 0);

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

        // this.gameDescription = Database.brain_help;
        // this.gameInstruction = Database.GetSpecificData("game_instruction");//.game_instruction;

        this.totalTimePerQuestion = Database.GetSpecificData("time_per_question");//.time_per_question;
        if (Server.platform == "favorites") {
            this.totalTimeForGame = Server.time;//.time_to_play;
            this.lastLevelPlayerPlayed = parseInt(Server.level)
        }
    };
    UpdateLevelManager(_num) {
        console.log("UpdateLevelManager");
        let argsArr = [];
        this.lastLevelPlayerPlayed += parseInt(_num);
        this.SelectRotationOfImage(this.lastLevelPlayerPlayed, parseInt(_num));
        this.SelectTimeForEachLevel(this.lastLevelPlayerPlayed, parseInt(_num));
        if (this.isRotationAvialable)//Only rotation available
        {
            argsArr = [
                this.lastLevelPlayerPlayed,
                this.imageRotationTime,
                this.imageRotationType,
                this.totalTimeForGame,
                this.totalTimePerQuestion,
                this.totalNumberOfQuestions
            ];
        }
        else//Both not available
        {
            argsArr = [
                this.lastLevelPlayerPlayed,
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
        let actualSelectedImage = this.actualImageDisplayOnScreen;
        if (_num < 0) {
            if (actualSelectedImage > 4) {
                actualSelectedImage -= 1;
            }
        }
        else {
            if (actualSelectedImage < 20) {
                actualSelectedImage += 1;
            }
        }
        return actualSelectedImage;
    };
    SelectBackgroundImge() {
        let allBgLocation = [...Database.bg_image_location];
        let allBgName = [];
        // let index;
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
                if ((_levelNumber > 11) && (this.imageRotationTime > 4)) {
                    this.imageRotationTime -= 0.5;
                }
            }
            if (_num < 0) {
                if ((_levelNumber > 11) && (this.imageRotationTime != Database.GetGeneralData("rotation_time"))) {
                    this.imageRotationTime += 0.5;
                }
            }
        }
    };
    SelectTimeForEachLevel(_levelNumber, _num) {
        console.log(" _num " + _num);
        console.log(" this.totalTimePerQuestion " + this.totalTimePerQuestion);
        if (this.totalTimePerQuestion >= 4 && _num > 0) {
            this.totalTimePerQuestion -= 0.25;
        }
        else if ((this.totalTimePerQuestion != Database.GetSpecificData("time_per_question")) && (_num < 0)) {
            this.totalTimePerQuestion += 0.5;
        }
    };
}
let _GameArchitechture = new GameArchitechture();

export { _GameArchitechture as GameArchitechture };