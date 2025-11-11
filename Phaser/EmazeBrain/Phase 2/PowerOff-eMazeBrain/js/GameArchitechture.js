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
        this.actualImageDisplayOnScreen = 2;
        this.numberOfLightUpImage = 2;
        this.blinkTiming = 2000;
        this.soundFrequency = '';
        // this.normalFrequencyArray = [];
        // this.advanceFrequencyArray = [];
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

        // if(this.isMovementAvailable)//Both movement and rotation available
        // {
        //     argsArr = [
        //         this.lastLevelPlayerPlayed,
        //         this.actualNumberOfImageSelected,
        //         this.actualImageDisplayOnScreen,
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
        //         this.actualImageDisplayOnScreen,
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
        // console.log('no move no rotate');
        argsArr = [
            this.lastLevelPlayerPlayed,
            this.actualNumberOfImageSelected,
            this.actualImageDisplayOnScreen,
            this.numberOfLightUpImage,
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
            this.blinkTiming,
            this.soundFrequency
        ];
        console.log('blink Time', this.blinkTiming)
        // }
        LevelManager.InitializeLevel(argsArr);
    };
    InitializePerticularLevel(_level) {
        // question image selection
        if (parseInt(_level) > 1 && parseInt(_level) < 3) {
            this.actualImageDisplayOnScreen = 2;
        }
        else if (parseInt(_level) == 3) {
            this.actualImageDisplayOnScreen = 3;
        }
        else if (parseInt(_level) > 3 && parseInt(_level) < 5) {
            this.actualImageDisplayOnScreen = 3;
        }
        else if (parseInt(_level) == 5) {
            this.actualImageDisplayOnScreen = 4;
        }
        else if (parseInt(_level) > 5 && parseInt(_level) < 7) {
            this.actualImageDisplayOnScreen = 4;
        }
        else if (parseInt(_level) == 7) {
            this.actualImageDisplayOnScreen = 5;
        }
        else if (parseInt(_level) > 7 && parseInt(_level) < 9) {
            this.actualImageDisplayOnScreen = 5;
        }
        else if (parseInt(_level) == 9) {
            this.actualImageDisplayOnScreen = 6;
        }
        else if (parseInt(_level) > 9) {
            this.actualImageDisplayOnScreen = 7;
        }

        //==================answer Image Selection======================
        if (parseInt(_level) > 1 && parseInt(_level) < 3) {
            this.numberOfLightUpImage = 2;
        }
        else if (parseInt(_level) == 3) {
            this.numberOfLightUpImage = 3;
        }
        else if (parseInt(_level) > 3 && parseInt(_level) < 5) {
            this.numberOfLightUpImage = 3;
        }
        else if (parseInt(_level) == 5) {
            this.numberOfLightUpImage = 4;
        }
        else if (parseInt(_level) > 5 && parseInt(_level) < 7) {
            this.numberOfLightUpImage = 4;
        }
        else if (parseInt(_level) == 7) {
            this.numberOfLightUpImage = 5;
        }
        else if (parseInt(_level) > 7 && parseInt(_level) < 9) {
            this.numberOfLightUpImage = 5;
        }
        else if (parseInt(_level) == 9) {
            this.numberOfLightUpImage = 6;
        }
        else if (parseInt(_level) > 9) {
            this.numberOfLightUpImage = 7;
        }


        // time gap between blink
        if (parseInt(_level) == 2) {
            this.blinkTiming = 2000;
        }
        else if (parseInt((_level)) == 3 || parseInt((_level)) == 4) {
            this.blinkTiming = 1900;
        }
        else if (parseInt(_level) == 5 || parseInt(_level) == 6) {
            this.blinkTiming = 1800;
        }
        else if (parseInt(_level) == 7 || parseInt(_level) == 8) {
            this.blinkTiming = 1700;
        }
        else if (parseInt(_level) == 9 || parseInt(_level) == 10) {
            this.blinkTiming = 1600;
        }
        else if (parseInt(_level) == 11 || parseInt(_level) == 12) {
            this.blinkTiming = 1500;
        }
        else if (parseInt(_level) == 13 || parseInt(_level) == 14) {
            this.blinkTiming = 1400;
        }
        else if (parseInt(_level) == 15 || parseInt(_level) == 16) {
            this.blinkTiming = 1300;
        }
        else if (parseInt(_level) == 17 || parseInt(_level) == 18) {
            this.blinkTiming = 1200;
        }
        else if (parseInt(_level) == 19 || parseInt(_level) == 20) {
            this.blinkTiming = 1100;
        }
        else if (parseInt(_level) == 21 || parseInt(_level) > 21) {
            this.blinkTiming = 1000;
        }
        // this.actualImageDisplayOnScreen = 4;
        // //====Setting minimum and maximum number of image======// 
        // for (let i = 0; i < _level; i++) 
        // {
        //     if( this.actualImageDisplayOnScreen < 20)
        //     {
        //         this.actualImageDisplayOnScreen += 1;          
        //     }
        // }
        // //====Setting actual number of type of image===============//
        // if(_level < 7 )
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

        //==========================sound Frequency================================

        // if (parseInt(_level) < 15) {
        //     console.log('when normalFrequencyArray1')
        //     return this.normalFrequencyArray;
        // }
        // else if (parseInt(_level) > 15) {
        //     console.log('when advanceFrequencyArray1')
        //     return this.advanceFrequencyArray;
        // }
    }
    GeneralGameArchitechture() {
        this.ColourSchemeForImage = Database.GetGeneralData("color_scheme");

        this.imageRotationType = Database.GetGeneralData("rotation");
        this.imageRotationTime = Database.GetGeneralData("rotation_time");
        // this.SelectRotationOfImage(this.lastLevelPlayerPlayed);

        this.movementDirection = Database.GetGeneralData("movement_direction");
        this.movementType = Database.GetGeneralData("movement_type");
        this.movementTime = Database.GetGeneralData("movement_time");
        // this.SelcetAnswerLocation();
        this.offsetForLevelUp = Database.GetGeneralData("level_up");
        this.offsetForLevelDown = Database.GetGeneralData("level_down");
        this.QuestionImageShowTimerFun(this.lastLevelPlayerPlayed);
    };
    SpecialGameArchitechture() {
        this.lastHighScore = Database.GetSpecificData("high_score");
        this.lastSuccessRate = Database.GetSpecificData("success_rate");
        this.lastLevelPlayerPlayed = Database.GetSpecificData("level");

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
        console.log('this.lastLevelPlayerPlaye', this.lastLevelPlayerPlayed)
        // let prevActualNumberOfImageSelected = this.actualNumberOfImageSelected;
        this.SelectNumberOfImagesForScreen(parseInt(_num));
        // this.SelectRotationOfImage(this.lastLevelPlayerPlayed);
        this.SelcetAnswerLocation();
        this.QuestionImageShowTimerFun(this.lastLevelPlayerPlayed);
        // this.SelectFrequency(_num)
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
        //         if(this.actualImageDisplayOnScreen > 4)
        //         {
        //             this.actualImageDisplayOnScreen -= 1;
        //         }
        //     }
        // }
        // console.log("  this.actualImageDisplayOnScreen "+  this.actualImageDisplayOnScreen);
        // if(this.isMovementAvailable)//Both movement and rotation available
        // {
        //     argsArr = [
        //         this.lastLevelPlayerPlayed,
        //         this.actualNumberOfImageSelected,
        //         this.actualImageDisplayOnScreen,
        //         "",
        //         15,
        //         this.imageRotationTime,
        //         this.imageRotationType,
        //         this.movementDirection,
        //         this.movementTime,
        //         this.totalTimeForGame,
        //         this.totalTimePerQuestion,
        //         this.totalNumberOfQuestions
        //     ];            
        // }
        // else  if(this.isRotationAvialable)//Only rotation available
        // {
        //     argsArr = [
        //         this.lastLevelPlayerPlayed,
        //         this.actualNumberOfImageSelected,
        //         this.actualImageDisplayOnScreen,
        //         "",
        //         15,
        //         this.imageRotationTime,
        //         this.imageRotationType,
        //         null,
        //         null,
        //         this.totalTimeForGame,
        //         this.totalTimePerQuestion,
        //         this.totalNumberOfQuestions
        //     ];  
        // }
        // else//Both not available
        // {
        argsArr = [
            // this.lastLevelPlayerPlayed,
            // this.actualNumberOfImageSelected,
            // this.actualImageDisplayOnScreen,
            // this.numberOfLightUpImage,
            // "",
            // null,
            // null,
            // null,
            // null,
            // null,
            // this.totalTimeForGame,
            // this.totalTimePerQuestion,
            // this.totalNumberOfQuestions,
            // this.blinkTiming
            this.lastLevelPlayerPlayed,
            this.actualNumberOfImageSelected,
            this.actualImageDisplayOnScreen,
            this.numberOfLightUpImage,
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
            this.blinkTiming,
            this.soundFrequency
        ];
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

        let _level = LevelManager.GetCurrentLevelNumber();
        console.log('lev', _level)
        // question image selection
        if (parseInt(_level) > 1 && parseInt(_level) < 3) {
            this.actualImageDisplayOnScreen = 2;
        }
        else if (parseInt(_level) == 3) {
            this.actualImageDisplayOnScreen = 3;
        }
        else if (parseInt(_level) > 3 && parseInt(_level) < 5) {
            this.actualImageDisplayOnScreen = 3;
        }
        else if (parseInt(_level) == 5) {
            this.actualImageDisplayOnScreen = 4;
        }
        else if (parseInt(_level) > 5 && parseInt(_level) < 7) {
            this.actualImageDisplayOnScreen = 4;
        }
        else if (parseInt(_level) == 7) {
            this.actualImageDisplayOnScreen = 5;
            console.log('it is happening')
        }
        else if (parseInt(_level) > 7 && parseInt(_level) < 9) {
            this.actualImageDisplayOnScreen = 5;
        }
        else if (parseInt(_level) == 9) {
            this.actualImageDisplayOnScreen = 6;
        }
        else if (parseInt(_level) > 9) {
            this.actualImageDisplayOnScreen = 7;
        }

        //==================answer Image Selection======================
        if (parseInt(_level) > 1 && parseInt(_level) < 3) {
            this.numberOfLightUpImage = 2;
        }
        else if (parseInt(_level) == 3) {
            this.numberOfLightUpImage = 3;
        }
        else if (parseInt(_level) > 3 && parseInt(_level) < 5) {
            this.numberOfLightUpImage = 3;
        }
        else if (parseInt(_level) == 5) {
            this.numberOfLightUpImage = 4;
        }
        else if (parseInt(_level) > 5 && parseInt(_level) < 7) {
            this.numberOfLightUpImage = 4;
        }
        else if (parseInt(_level) == 7) {
            this.numberOfLightUpImage = 5;
        }
        else if (parseInt(_level) > 7 && parseInt(_level) < 9) {
            this.numberOfLightUpImage = 5;
        }
        else if (parseInt(_level) == 9) {
            this.numberOfLightUpImage = 6;
        }
        else if (parseInt(_level) > 9) {
            this.numberOfLightUpImage = 7;
        }
    };

    QuestionImageShowTimerFun(_level) {
        // time gap between blink
        if (parseInt(_level) == 2) {
            this.blinkTiming = 2000;
        }
        else if (parseInt((_level)) == 3 || parseInt((_level)) == 4) {
            this.blinkTiming = 1900;
        }
        else if (parseInt(_level) == 5 || parseInt(_level) == 6) {
            this.blinkTiming = 1800;
        }
        else if (parseInt(_level) == 7 || parseInt(_level) == 8) {
            this.blinkTiming = 1700;
        }
        else if (parseInt(_level) == 9 || parseInt(_level) == 10) {
            this.blinkTiming = 1600;
        }
        else if (parseInt(_level) == 11 || parseInt(_level) == 12) {
            this.blinkTiming = 1500;
        }
        else if (parseInt(_level) == 13 || parseInt(_level) == 14) {
            this.blinkTiming = 1400;
        }
        else if (parseInt(_level) == 15 || parseInt(_level) == 16) {
            this.blinkTiming = 1300;
        }
        else if (parseInt(_level) == 17 || parseInt(_level) == 18) {
            this.blinkTiming = 1200;
        }
        else if (parseInt(_level) == 19 || parseInt(_level) == 20) {
            this.blinkTiming = 1100;
        }
        else if (parseInt(_level) == 21 || parseInt(_level) > 21) {
            this.blinkTiming = 1000;
        }
    }
    // SelectFrequency() {
    //     //==========================sound Frequency================================
    //     let _level = LevelManager.GetCurrentLevelNumber();
    //     console.log('lev', _level)

    //     if (parseInt(_level) < 15) {
    //         console.log('when normalFrequencyArray')
    //         return this.normalFrequencyArray;
    //     }
    //     else if (parseInt(_level) > 15) {
    //         console.log('when advanceFrequencyArray')
    //         return this.advanceFrequencyArray;
    //     }
    // }
    SelectBackgroundImge() {
        // let allBgLocation = [...Database.bg_image_location];
        // let allBgName = [];
        // let index;
        // let singleImage;
        // for (let i = 0; i < allBgLocation.length; i++) 
        // {
        //     singleImage = allBgLocation[i];
        //     // singleImage = singleImage.split(".");
        //     allBgName.push(singleImage[0]);            
        // }
        // return allBgName;



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
    SelectRotationOfImage(_levelNumber) {
        if (_levelNumber < 11) {
            this.isRotationAvialable = false;
        }
        else {
            this.isRotationAvialable = true;
            if (_levelNumber > 11 && this.imageRotationTime > 4) {
                this.imageRotationTime -= 0.5;
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