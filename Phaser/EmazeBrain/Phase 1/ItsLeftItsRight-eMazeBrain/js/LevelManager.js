import {GameArchitechture} from './GameArchitechture.js';
import {Database} from './Database.js';
class LevelManager 
{
    constructor() 
    {
        this.initialLevelNumber;// Initial level
        this.levelNumber;//current level
        // this.numberOfTypeOfImage;
        // this.numberOfImage;
        this.background;
        // this.answerOrientation;
        this.rotationTime;
        this.rotationType;
        // this.movement;
        this.maxTimeForGame;
        this.maxTimeForLevel;
        this.totalNumberOfGame;
        this.totalLevelImageName = [];
        this.TotalBackgroundImage = [];

        // this.answerLocation;
        // this.totalAnswerSpread;
        // this.answerSpreadValue;
    };
    InitializeLevel(_arr)
    {
        this.LevelDataUpdate(_arr);
        this.offsetForLevelUp = GameArchitechture.offsetForLevelUp;
        this.offsetForLevelDown = GameArchitechture.offsetForLevelDown;
        this.TotalBackgroundImage =  GameArchitechture.SelectBackgroundImge();
        // this.answerLocation = GameArchitechture.answerLocation;
        // this.totalAnswerSpread = GameArchitechture.totalAnswerSpread;
        // this.answerSpreadValue = GameArchitechture.answerSpreadValue;
        this.DecideAnswerAndDestractors();
    }
    DecideLevelBackground()//==> random background <===//
    {       
        return  this.TotalBackgroundImage[Math.floor(Math.random() * this.TotalBackgroundImage.length)];
    }
    DecideAnswerAndDestractors()
    {
        this.totalLevelImageName = Database.GetGeneralData('main_image_location');
    };
    SelectRandomGameImage()
    {
        let mainImageToSend = this.totalLevelImageName;
        return mainImageToSend;
    };
    LevelDataUpdate(_arr)
    {
        this.levelNumber = this.initialLevelNumber =  _arr[0];
        this.rotationTime=  _arr[1];
        this.rotationType=  _arr[2];
        this.maxTimeForGame=  _arr[3];
        this.maxTimeForLevel=  _arr[4];
        this.totalNumberOfGame=  _arr[5];
    };
    DecideTimeOrNumberOfQuestion()
    {
        // console.log("this.totalNumberOfGame"+this.totalNumberOfGame)
        let response = [this.maxTimeForGame,this.maxTimeForLevel,this.totalNumberOfGame];
        return response;        
    };
    DecideRotation()
    {
        let response = [this.rotationType,this.rotationTime];
        return response;
    };
    IncreaseLevel(_this)//===>Increase level number <======//
    {
        this.levelNumber +=1;
        let args =  GameArchitechture.UpdateLevelManager(+1);
        this.LevelDataUpdate(args);
    }
    GetInitialLevel()
    {
        return this.initialLevelNumber;
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



    Create()
    {
    };
    ShuffleArr(arra1) 
    {
        var ctr = arra1.length, temp, index;
    
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