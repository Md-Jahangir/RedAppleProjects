import {GameArchitechture} from './GameArchitechture.js';
import {Database} from './Database.js';
class LevelManager 
{
    constructor() 
    {
        this.initialLevelNumber;// Initial level
        this.levelNumber;//current level
        this.numberOfTypeOfImage;
        // this.numberOfImage;
        // this.answerImageSelected;
        // this.optionImageSelected;
        this.answerImageNumber;
        this.questionImageNumber;
        this.background;
        this.answerOrientation;
        this.rotationTime;
        this.rotationType;
        this.movementDirection ;
        this.movementTime;
        this.movementType;
        this.movement;
        this.maxTimeForGame;
        this.maxTimeForLevel;
        this.totalNumberOfGame;
        this.totalLevelImageName = [];
        this.TotalBackgroundImage = [];
        // this.answerImagePos = [];
        this.levelWiseImage = [];
        this.sendAnswerImageSet = [];
        this.answerLocation;
        this.totalAnswerSpread;
        this.answerSpreadValue;
        this.imageForLevel = [];
        this.index = [];
        this.answerImageText = [];
        this.questionImageText;
        this.max = 20;
        this.min = -20;
        // this.count = 0;

        this.objectPositionOfPrefOne = [];
        this.objectPostionOfPrefTwo = [];
    };
    InitializeLevel(_arr)
    {
        this.LevelDataUpdate(_arr);
        this.offsetForLevelUp = GameArchitechture.offsetForLevelUp;
        // console.log('offset for levup :', this.offsetForLevelUp);
        this.offsetForLevelDown = GameArchitechture.offsetForLevelDown;
        this.TotalBackgroundImage =  GameArchitechture.SelectBackgroundImge();
        this.answerLocation = GameArchitechture.answerLocation;
        this.totalAnswerSpread = GameArchitechture.totalAnswerSpread;
        this.answerSpreadValue = GameArchitechture.answerSpreadValue;
        this.movementType = Database.GetGeneralData("movement_type");
        this.DecideAnswerAndDestractors();
        // console.log("level initialized--------",_arr);
       
    }
    DecideLevelBackground()//==> random background <===//
    {       
        return  this.TotalBackgroundImage[Math.floor(Math.random() * this.TotalBackgroundImage.length)];
    }
    DecideAnswerAndDestractors()
    {
        let mainImageToSend = [];
        let  index;
        let singleImage;
        this.totalLevelImageName = Database.GetGeneralData('main_image_location');
    };
    SelectRandomAnswerImageText()
    {
        for(let i = 0; i < this.answerImageNumber; i++)
        {
            this.answerImageText.push((Math.random() * (this.max - this.min) + this.min).toFixed(2));
        }
        return this.answerImageText;
    }
    SelectQuestionImageText()
    {
        this.questionImageText = ((Math.random() * (this.max - this.min) + this.min).toFixed(2));
        console.log(this.questionImageText);
        return this.questionImageText;
    }

    SelectCarImage()
    {
        console.log('answer Image nim : ',this.answerImageNumber)
        return this.answerImageNumber;
    }
    LevelDataUpdate(_arr)
    {
        this.levelNumber = this.initialLevelNumber =  _arr[0];
        this.answerImageNumber =  _arr[1];
        // this.questionImageNumber = _arr[2],
        this.background = _arr[2];
        this.answerOrientation = _arr[3];
        this.rotationTime=  _arr[4];
        this.rotationType=  _arr[5];
        this.movementDirection = _arr[6] ;
        this.movementTime = _arr[7];
        this.maxTimeForGame =  _arr[8];
        this.maxTimeForLevel=  _arr[9];
        this.totalNumberOfGame=  _arr[10];
    };
    getRandom(arr, n) {
        var result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        if (n > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    };
    DecidePlacementOfImages()
    {

    };
    DecideTimeOrNumberOfQuestion()
    {
        // console.log("this.totalNumberOfGame"+this.totalNumberOfGame);
        let response = [this.maxTimeForGame,this.maxTimeForLevel,this.totalNumberOfGame];
        return response;        
    };
    ReturnAnswerLocation()
    {
        return Database.GetGeneralData("answers_location");
    };
    DecideMovementAndRotation()
    {
        let response = [this.movementDirection,this.movementTime,this.rotationType,this.rotationTime];
        return response;
    };
    IncreaseLevel(_this)//===>Increase level number <======//
    {
        this.levelNumber +=1;
        console.log('level Num : ',this.levelNumber);
        let args =  GameArchitechture.UpdateLevelManager(+1);
        this.LevelDataUpdate(args);
    }
    GetInitialLevel()
    {
        return this.initialLevelNumber;
        console.log('initialLevelNumber',this.initialLevelNumber);
    }
    DecreaseLevel(_this)//=====> Decrease level number <====//
    {
        this.levelNumber -=1;
        let args = GameArchitechture.UpdateLevelManager(-1);
        this.LevelDataUpdate(args);
    }
    GetCurrentLevelNumber()
    {
        return this.levelNumber;
    };
   
    CarPositionOfPrefOneImages()
    {
        this.objectPositionOfPrefOne =  [
            [Math.floor(game.config.width/6.295),Math.floor(game.config.height/2.73),Math.floor(game.config.width/18.285),Math.floor(game.config.height/5.4)],  
            [Math.floor(game.config.width/6.295),Math.floor(game.config.height/1.656),Math.floor(game.config.width/18.285),Math.floor(game.config.height/5.4)],  
            [Math.floor(game.config.width/1.694),Math.floor(game.config.height/1.1513),Math.floor(game.config.width/18.285),Math.floor(game.config.height/5.4)],
            [Math.floor(game.config.width/1.176),Math.floor(game.config.height/1.92),Math.floor(game.config.width/18.285),Math.floor(game.config.height/5.4)],

            [Math.floor(game.config.width/6.442),Math.floor(game.config.height/1.2),Math.floor(game.config.width/18.285),Math.floor(game.config.height/5.4)],

            [Math.floor(game.config.width/1.750),Math.floor(game.config.height/3.6),Math.floor(game.config.width/18.285),Math.floor(game.config.height/5.4)],
            [Math.floor(game.config.width/2.633),Math.floor(game.config.height/1.351),Math.floor(game.config.width/18.285),Math.floor(game.config.height/5.4)],

            [Math.floor(game.config.width/4.1),Math.floor(game.config.height/2),Math.floor(game.config.width/18.285),Math.floor(game.config.height/5.4)],

            [Math.floor(game.config.width/1.177),Math.floor(game.config.height/3.292),Math.floor(game.config.width/18.285),Math.floor(game.config.height/5.4)],

            [Math.floor(game.config.width/1.971),Math.floor(game.config.height/1.14),Math.floor(game.config.width/18.285),Math.floor(game.config.height/5.4)],

            [Math.floor(game.config.width/1.176),Math.floor(game.config.height/1.35),Math.floor(game.config.width/18.285),Math.floor(game.config.height/5.4)],

            [Math.floor(game.config.width/2.3),Math.floor(game.config.height/2),Math.floor(game.config.width/18.285),Math.floor(game.config.height/5.4)],
            [Math.floor(game.config.width/1.71),Math.floor(game.config.height/1.53),Math.floor(game.config.width/18.285),Math.floor(game.config.height/5.4)],  //new
            [Math.floor(game.config.width/1.376),Math.floor(game.config.height/1.785),Math.floor(game.config.width/18.285),Math.floor(game.config.height/5.4)], 
            // [Math.floor(game.config.width/1.36),Math.floor(game.config.height/3)], 
        ]
        return this.objectPositionOfPrefOne;
    }

    CarImagePositionOfPreftwoImages()
    {
        this.objectPostionOfPrefTwo = [
            [Math.floor(game.config.width/3.8),Math.floor(game.config.height/3.3),Math.floor(game.config.width/24.935),Math.floor(game.config.height/5.4)],  
            [Math.floor(game.config.width/1.33),Math.floor(game.config.height/4.5),Math.floor(game.config.width/24.935),Math.floor(game.config.height/5.4)],  
            [Math.floor(game.config.width/1.9),Math.floor(game.config.height/2),Math.floor(game.config.width/24.935),Math.floor(game.config.height/5.4)],
            [Math.floor(game.config.width/3),Math.floor(game.config.height/2),Math.floor(game.config.width/24.935),Math.floor(game.config.height/5.4)],
            [Math.floor(game.config.width/3.8),Math.floor(game.config.height/1.5),Math.floor(game.config.width/24.935),Math.floor(game.config.height/5.4)],
            [Math.floor(game.config.width/1.37),Math.floor(game.config.height/2.35),Math.floor(game.config.width/24.935),Math.floor(game.config.height/5.4)],
            [Math.floor(game.config.width/1.37),Math.floor(game.config.height/1.25),Math.floor(game.config.width/24.935),Math.floor(game.config.height/5.4)],

            [Math.floor(game.config.width/2.651),Math.floor(game.config.height/1.09),Math.floor(game.config.width/24.935),Math.floor(game.config.height/5.4)],
            [Math.floor(game.config.width/3.8),Math.floor(game.config.height/1.3),Math.floor(game.config.width/24.935),Math.floor(game.config.height/5.4)],
            [Math.floor(game.config.width/2.021),Math.floor(game.config.height/1.360),Math.floor(game.config.width/24.935),Math.floor(game.config.height/5.4)],
            [Math.floor(game.config.width/3.934),Math.floor(game.config.height/1.133),Math.floor(game.config.width/24.935),Math.floor(game.config.height/5.4)],
            [Math.floor(game.config.width/1.386),Math.floor(game.config.height/1.4304),Math.floor(game.config.width/24.935),Math.floor(game.config.height/5.4)],
            [Math.floor(game.config.width/2.109),Math.floor(game.config.height/4.576),Math.floor(game.config.width/24.935),Math.floor(game.config.height/5.4)],
            [Math.floor(game.config.width/1.381),Math.floor(game.config.height/2.958),Math.floor(game.config.width/24.935),Math.floor(game.config.height/5.4)],
            [Math.floor(game.config.width/1.573),Math.floor(game.config.height/2.312),Math.floor(game.config.width/24.935),Math.floor(game.config.height/5.4)],
        ]
        return this.objectPostionOfPrefTwo;
    }

    ShuffleArr(arra1) 
    {
        let ctr = arra1.length, temp, index;
    
        // While there are elements in the array
        while (ctr > 0) {
        // Pick a random index
            index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
            ctr--;
        // And swap the last element with it
            temp = arra1[ctr];
     
            arra1[ctr] = arra1[index];
            arra1[index] = temp;
        }
        return arra1;
    }
    
}

let _LevelManager = new LevelManager();

export { _LevelManager as LevelManager };