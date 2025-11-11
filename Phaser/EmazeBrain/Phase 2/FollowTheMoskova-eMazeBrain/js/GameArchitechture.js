import { Database } from './Database.js';
import { LevelManager } from './LevelManager.js';
import { Server } from './Server.js';
class GameArchitechture {
    constructor() {
        // this.maxSelectedImageForGame = 2;//maximum number of image to be used from cdn
        // this.minSelectedImageForGame = 2;//minimum number of image to be used from cdn
        // this.actualNumberOfImageSelected = 1;//actual number of image selected from cdn

        // // this.maxImageDisplayOnScreen = 0;//7;// maximum number of image displayed on screen
        // // this.minImageDisplayOnScreen = 0;//4;// minimum number of image displayed on screen
        // this.actualImageDisplayOnScreen = 4;// actual number of image displayed on screen

        // for follow the moskova game 
        this.randomPositionNumber = 7;
        this.actualNumberOfImageSelected = 4;
        this.actualAnswerImageSelected = 1;
        this.optionImageSelected = 1;
        this.sequenceNumber = 1;
        this.questionImageShowTimer = 2000;
        //=========General Architechture Variables=============//
        this.ColourSchemeForImage;

        this.isRotationAvialable;
        this.imageRotationType;
        // this.imageRotationTime;

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
        // console.log('isRotationAvialable',this.isRotationAvialable);
        if (this.lastLevelPlayerPlayed > 1) {
            this.InitializePerticularLevel(this.lastLevelPlayerPlayed);
            // console.log('GameArchitechtureInitiallize');
        }
        let argsArr = [];
        //=======> Initialize Level Manager <=============//

        // if(this.isMovementAvailable)//Both movement and rotation available
        // {
        //     argsArr = [
        //         this.lastLevelPlayerPlayed,
        //         this.actualNumberOfImageSelected, 
        //         this.actualAnswerImageSelected,
        //         this.optionImageSelected,
        //         "",
        //         15,
        //         this.imageRotationTime,
        //         this.imageRotationType,
        //         this.movementDirection,
        //         this.movementTime,
        //         this.totalTimeForGame,
        //         this.totalTimePerQuestion,
        //         this.totalNumberOfQuestions,
        //         this.movementType
        //     ];            
        // }
        // else  if(this.isRotationAvialable)//Only rotation available
        // {
        //     argsArr = [
        //         this.lastLevelPlayerPlayed,
        //         this.actualNumberOfImageSelected,
        //          this.actualAnswerImageSelected,
        //          this.optionImageSelected,
        //         "",
        //         15,
        //         this.imageRotationTime,
        //         this.imageRotationType,
        //         null,
        //         null,
        //         this.totalTimeForGame,
        //         this.totalTimePerQuestion,
        //         this.totalNumberOfQuestions,
        //         null
        //     ];  
        // }
        // else//Both not available
        // {
        if (this.isRotationAvialable == true)  //only rotation is available for the answer images level 15 or above
        {
            argsArr = [
                this.lastLevelPlayerPlayed,
                this.actualNumberOfImageSelected,
                this.actualAnswerImageSelected,
                this.optionImageSelected,
                "",
                null,
                null,
                this.imageRotationType,
                null,
                null,
                this.totalTimeForGame,
                this.totalTimePerQuestion,
                this.totalNumberOfQuestions,
                null,
                this.questionImageShowTimer,
                this.sequenceNumber,
                this.randomPositionNumber
            ];
            // console.log(this.isRotationAvialable)
        }
        else {
            argsArr = [
                this.lastLevelPlayerPlayed,
                this.actualNumberOfImageSelected,
                this.actualAnswerImageSelected,
                this.optionImageSelected,
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
                this.questionImageShowTimer,
                this.sequenceNumber,
                this.randomPositionNumber
            ];
        }
        // }
        LevelManager.InitializeLevel(argsArr);
    };
    InitializePerticularLevel(_level) {
        // console.log('_level : ', _level);
        this.actualAnswerImageSelected = 1;
        this.optionImageSelected = 1;
        this.sequenceNumber = 1
        //================initializing question sequece for any level=======================
        // let _level = LevelManager.GetCurrentLevelNumber();
        // if(parseInt(_level) == 2)
        // {
        //     this.actualNumberOfImageSelected = 4;
        // }
        //  else if(parseInt(_level) >= 2 && parseInt(_level) <  5)
        //  {
        //      this.actualNumberOfImageSelected = 4;
        //  }
        //  else if(parseInt(_level) >=5 && parseInt(_level) < 10)
        //  {
        //      this.actualNumberOfImageSelected = 5;
        //  }
        //  else if(parseInt(_level) >=7 && parseInt(_level) < 9)
        //  {
        //      this.actualNumberOfImageSelected = 4;
        //  }
        //  else if(parseInt(_level) >= 9)
        //  {
        //      this.actualNumberOfImageSelected = 3;
        //     //  console.log('enter',this.actualNumberOfImageSelected);
        //  }


        if (parseInt(_level) == 2 || parseInt(_level) < 4) {
            this.actualNumberOfImageSelected = 4;
        }
        else if (parseInt(_level) == 4 || parseInt(_level) < 7) {
            this.actualNumberOfImageSelected = 5;
        }
        else if (parseInt(_level) == 7 || parseInt(_level) < 10) {
            this.actualNumberOfImageSelected = 6;
        }
        else if (parseInt(_level) == 10 || parseInt(_level) < 13) {
            this.actualNumberOfImageSelected = 7;
            console.log('this.actualNumberOfImageSelected : ', this.actualNumberOfImageSelected)
        }
        else if (parseInt(_level) == 13 || parseInt(_level) < 16) {
            this.actualNumberOfImageSelected = 8;
            console.log('actual number of image : ', this.actualNumberOfImageSelected)
        }
        else if (parseInt(_level) == 16 || parseInt(_level) < 19) {
            this.actualNumberOfImageSelected = 9;
        }
        else if (parseInt(_level) == 19 || parseInt(_level) > 19) {
            this.actualNumberOfImageSelected = 10;
        }


        //-----------------------Number of image to be shown on the screen----------------



        //--------------------------------------------------------------------------------
        //==============Answer image selection for level compeltion======================

        if (parseInt(_level) < 10) {
            this.actualAnswerImageSelected = 1;
        }
        else if (parseInt(_level) < 20) {
            this.actualAnswerImageSelected = 2;
        }
        else {
            this.actualAnswerImageSelected = 3;
        }
        //----------------------------------------------------
        if (parseInt(_level) >= 5 && parseInt(_level) < 9) {

            this.optionImageSelected = 3 - this.actualAnswerImageSelected;// 2;
        }
        else if (parseInt(_level) >= 9 && parseInt(_level) < 13) {

            this.optionImageSelected = 4 - this.actualAnswerImageSelected;//3;
        }
        else if (parseInt(_level) >= 13 && parseInt(_level) < 17) {
            this.optionImageSelected = 5 - this.actualAnswerImageSelected;// 3;
        }
        else if (parseInt(_level) >= 17 && parseInt(_level) < 21) {
            this.optionImageSelected = 6 - this.actualAnswerImageSelected;// 4;
        }
        else if (parseInt(_level) >= 21) {

            this.optionImageSelected = 6 - this.actualAnswerImageSelected;//3;
            // console.log('this.actualAnswerImageSelected:' + this.actualAnswerImageSelected + 'this.optionImageSelected '+this.optionImageSelected )
        }

        //----------------random position image to be spawn------------------------

        if (parseInt(_level) == 2) {
            this.randomPositionNumber = 7;
        }
        else if (parseInt(_level) == 3 || parseInt(_level) < 5) {
            this.randomPositionNumber = 6;
        }
        else if (parseInt(_level) == 5 || parseInt(_level) < 7) {
            this.randomPositionNumber = 5;
        }
        else if (parseInt(_level) == 7 || parseInt(_level) < 9) {
            this.randomPositionNumber = 4;
        }
        else if (parseInt(_level) == 9 || parseInt(_level) > 9) {
            this.randomPositionNumber = 3;
        }

        //-------------------------------------------------------------------------
        //--------------------------------------------------------------------------
        //     this.actualImageDisplayOnScreen = 4;
        //     //====Setting minimum and maximum number of image======// 
        //     for (let i = 0; i < _level; i++) 
        //     {
        //         if( this.actualImageDisplayOnScreen < 20)
        //         {
        //             this.actualImageDisplayOnScreen += 1;          
        //         }
        //     }
        //     //====Setting actual number of type of image===============//
        //     if(_level < 7 )
        //     {
        //         this.actualNumberOfImageSelected = 1;
        //     }
        //     else if(_level > 6 && _level < 13)
        //     {
        //         this.actualNumberOfImageSelected = 2;
        //     }
        //     else
        //     {
        //         this.actualNumberOfImageSelected = 3;
        //     }

        //==========Rotation Of the Option images================
        if (parseInt(_level) < 15) {
            this.isRotationAvialable = false;
        }
        else if (parseInt(_level) >= 15) {
            this.isRotationAvialable = true;
        }
        // in sequence question image show timer manipulation on level up and down
        if (parseInt(_level) == 2) {
            this.questionImageShowTimer = 1900;
        }
        else if (parseInt(_level) == 3) {
            this.questionImageShowTimer = 1800;
        }
        else if (parseInt(_level) == 4) {
            this.questionImageShowTimer = 1700;
        }
        else if (parseInt(_level) == 5) {
            this.questionImageShowTimer = 1600;
        }
        else if (parseInt(_level) >= 6) {
            this.questionImageShowTimer = 1500;
        }

        //--------------Sequence show on levels-------------------------------------
        if (parseInt(_level) >= 2 && parseInt(_level) < 5) {
            this.sequenceNumber = 1;
        }
        else if (parseInt(_level) >= 5 && parseInt(_level) < 9) {
            this.sequenceNumber = 2;
        }
        if (parseInt(_level) >= 9 && parseInt(_level) < 13) {
            this.sequenceNumber = 3;
        }
        else if (parseInt(_level) >= 13) {
            this.sequenceNumber = 4;
            console.log('enter')
        }

    }
    GeneralGameArchitechture() {
        this.ColourSchemeForImage = Database.GetGeneralData("color_scheme");

        this.imageRotationType = Database.GetGeneralData("rotation");
        console.log('this.rotationtype : ', this.imageRotationType);
        this.imageRotationTime = Database.GetGeneralData("rotation_time");
        this.SelectRotationOfImage(this.lastLevelPlayerPlayed);

        this.movementDirection = Database.GetGeneralData("movement_direction");
        this.movementType = Database.GetGeneralData("movement_type");
        this.movementTime = Database.GetGeneralData("movement_time");
        this.SelcetAnswerLocation();
        this.offsetForLevelUp = Database.GetGeneralData("level_up");
        this.offsetForLevelDown = Database.GetGeneralData("level_down");
        this.QuestionImageShowTimerFun(this.lastLevelPlayerPlayed);
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
        console.log('lastLevelPlayerPlayed', this.lastLevelPlayerPlayed);
        // let prevActualNumberOfImageSelected = this.actualNumberOfImageSelected;
        this.SelectNumberOfImagesForScreen(parseInt(_num));
        this.SelectRotationOfImage(this.lastLevelPlayerPlayed);
        this.SelcetAnswerLocation();
        this.QuestionImageShowTimerFun(this.lastLevelPlayerPlayed);
        // if(this.actualNumberOfImageSelected > prevActualNumberOfImageSelected)
        // {
        //     this.actualImageDisplayOnScreen = this.actualImageDisplayOnScreen - 1;
        // }
        // else if(this.actualNumberOfImageSelected < prevActualNumberOfImageSelected)
        // {
        //     this.actualImageDisplayOnScreen = this.actualImageDisplayOnScreen + 1;
        // }
        // else
        // {
        //     if(_num > 0)
        //     {
        //         if(this.actualImageDisplayOnScreen < 20 )
        //         {
        //             this.actualImageDisplayOnScreen += 1;
        //         }
        //     }
        //     else if(_num < 0 )
        //     {
        //         if(this.actualImageDisplayOnScreen > 4 )
        //         {
        //             this.actualImageDisplayOnScreen -= 1;
        //         }
        //     }
        // }
        // console.log("  this.actualImageDisplayOnScreen "+  this.actualImageDisplayOnScreen);


        // if(this.isMovementAvailable)    //Both movement and rotation available
        // {
        // argsArr = [
        //     this.lastLevelPlayerPlayed,
        //     this.actualNumberOfImageSelected,
        //     // this.actualImageDisplayOnScreen,
        //     this.actualAnswerImageSelected,
        //     this.optionImageSelected,
        //     "",
        //     15,
        //     this.imageRotationTime,
        //     this.imageRotationType,
        //     this.movementDirection,
        //     this.movementTime,
        //     this.totalTimeForGame,
        //     this.totalTimePerQuestion,
        //     this.totalNumberOfQuestions
        // ];            
        // }
        // else  if(this.isRotationAvialable)//Only rotation available
        // {
        // argsArr = [
        // this.lastLevelPlayerPlayed,
        // this.actualNumberOfImageSelected,
        // // this.actualImageDisplayOnScreen,
        // this.actualAnswerImageSelected,
        // this.optionImageSelected,
        // "",
        // 15,
        // this.imageRotationTime,
        // this.imageRotationType,
        // null,
        // null,
        // this.totalTimeForGame,
        // this.totalTimePerQuestion,
        // this.totalNumberOfQuestions
        // ];  
        // }
        // else//Both not available
        // {
        if (this.isRotationAvialable)  //only rotation is available for the answer images level 15 or above
        {
            argsArr = [
                this.lastLevelPlayerPlayed,
                this.actualNumberOfImageSelected,
                this.actualAnswerImageSelected,
                this.optionImageSelected,
                "",
                null,
                null,
                this.imageRotationType,
                null,
                null,
                this.totalTimeForGame,
                this.totalTimePerQuestion,
                this.totalNumberOfQuestions,
                null,
                this.questionImageShowTimer,
                this.sequenceNumber,
                this.randomPositionNumber
            ];
        }
        else {
            argsArr = [
                this.lastLevelPlayerPlayed,
                this.actualNumberOfImageSelected,
                this.actualAnswerImageSelected,
                this.optionImageSelected,
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
                this.questionImageShowTimer,
                this.sequenceNumber,
                this.randomPositionNumber
            ];
        }
        // }
        return argsArr;
    };
    //==============General Architechture Methods===============//
    SelectNumberOfImagesForScreen(_num) {
        // let _level = LevelManager.GetCurrentLevelNumber();
        // if( _level < 7 )
        // {
        //     this.actualNumberOfImageSelected = 1;
        // }
        // else if(_level > 6 && _level < 13)
        // {
        //     this.actualNumberOfImageSelected = 2;
        // }
        // else
        // {
        //     this.actualNumberOfImageSelected = 3;
        // }
        //==============question image position selection for level completion====================
        let _level = LevelManager.GetCurrentLevelNumber();
        if (parseInt(_level) == 2) {
            this.randomPositionNumber = 7;
        }
        else if (parseInt(_level) >= 3 && parseInt(_level) < 5) {
            this.randomPositionNumber = 6;
        }
        else if (parseInt(_level) >= 5 && parseInt(_level) < 7) {
            this.randomPositionNumber = 5;
        }
        else if (parseInt(_level) >= 7 && parseInt(_level) < 9) {
            this.randomPositionNumber = 4;
        }
        else if (parseInt(_level) >= 9) {
            this.randomPositionNumber = 3;
        }

        //actual number of image selected on level up-down

        if (parseInt(_level) == 2 || parseInt(_level) < 4) {
            this.actualNumberOfImageSelected = 4;
        }
        else if (parseInt(_level) == 4 || parseInt(_level) < 7) {
            this.actualNumberOfImageSelected = 5;
        }
        else if (parseInt(_level) == 7 || parseInt(_level) < 10) {
            this.actualNumberOfImageSelected = 6;
        }
        else if (parseInt(_level) == 10 || parseInt(_level) < 13) {
            this.actualNumberOfImageSelected = 7;
            console.log('this.actualNumberOfImageSelected : ', this.actualNumberOfImageSelected)
        }
        else if (parseInt(_level) == 13 || parseInt(_level) < 16) {
            this.actualNumberOfImageSelected = 8;
            console.log('actual number of image : ', this.actualNumberOfImageSelected)
        }
        else if (parseInt(_level) == 16 || parseInt(_level) < 19) {
            this.actualNumberOfImageSelected = 9;
        }
        else if (parseInt(_level) == 19 || parseInt(_level) > 19) {
            this.actualNumberOfImageSelected = 10;
        }

        //================initailize option images for level change===================
        if (parseInt(_level) >= 5 && parseInt(_level) < 9) {
            this.actualAnswerImageSelected = 1;
            this.optionImageSelected = 2;
        }
        else if (parseInt(_level) >= 9 && parseInt(_level) < 13) {
            console.log("enter=========================>")
            this.actualAnswerImageSelected = 2;
            this.optionImageSelected = 2;
        }
        else if (parseInt(_level) >= 13 && parseInt(_level) < 17) {
            this.actualAnswerImageSelected = 2;
            this.optionImageSelected = 3;
        }
        else if (parseInt(_level) >= 17 && parseInt(_level) < 21) {
            this.actualAnswerImageSelected = 2;
            this.optionImageSelected = 4;
        }
        else if (parseInt(_level) >= 21) {
            this.actualAnswerImageSelected = 3;
            this.optionImageSelected = 3;
        }

        //==========number of  sequence on level increase===============
        if (parseInt(_level) >= 2 && parseInt(_level) < 5) {
            this.sequenceNumber = 1;
        }
        else if (parseInt(_level) >= 5 && parseInt(_level) < 9) {
            this.sequenceNumber = 2;
        }
        if (parseInt(_level) >= 9 && parseInt(_level) < 13) {
            this.sequenceNumber = 3;
        }
        else if (parseInt(_level) >= 13) {
            this.sequenceNumber = 4;
        }
    };
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
    QuestionImageShowTimerFun(_level) {
        console.log('lev', _level)
        // in sequence question image show timer manipulation on level up and down
        if (parseInt(_level) == 2) {
            this.questionImageShowTimer = 1900;
        }
        else if (parseInt(_level) == 3) {
            this.questionImageShowTimer = 1800;
        }
        else if (parseInt(_level) == 4) {
            this.questionImageShowTimer = 1700;
        }
        else if (parseInt(_level) == 5) {
            this.questionImageShowTimer = 1600;
        }
        else if (parseInt(_level) >= 6) {
            this.questionImageShowTimer = 1500;
        }
    }
    SelectRotationOfImage(_levelNumber) {
        if (_levelNumber >= 15) {
            this.isRotationAvialable = true;
        }
        else {
            this.isRotationAvialable = false;
        }
        // else
        // {
        //     this.isRotationAvialable = true;
        //     if(_levelNumber>11 && this.imageRotationTime>4)
        //     {
        //         this.imageRotationTime -= 0.5;
        //     }
        // }
    };
    SelcetAnswerLocation() {
        if (Database.answer_location != "random") {
            this.answerLocation = Database.GetGeneralData("answer_location");
            // console.log('answerLocation',this.answerLocation)
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