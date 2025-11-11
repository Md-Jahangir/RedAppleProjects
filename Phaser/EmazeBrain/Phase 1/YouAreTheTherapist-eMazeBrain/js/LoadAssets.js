import { Database } from "./Database.js";
import { DataBaseManager } from "./DataBaseManager.js";
import { GameArchitechture } from "./GameArchitechture.js";
import { LevelManager } from "./LevelManager.js";
class LoadAssets 
{
    constructor() 
    {
        this.byteBgImageArray = [];
        this.loadCompleteCallback;
    };
    // LoadAssests(_this,_loadFromUrl,_data,_loadCompleteCallback) 
    LoadAssests(_this,_data,_loadCompleteCallback) 
    {
        this.loadCompleteCallback = _loadCompleteCallback;
        Database.StoreImageData(_this,Database);
        // if(_loadFromUrl)
        // {
        //     DataBaseManager.StoreImageData(_this,Database,DataBaseManager,Database.StoreImageData,_data);
        // }
        // else
        // {
        //    DataBaseManager.GetAllImageData(_this,this,DataBaseManager, this.LoaDataFromLocalStorage);
        // }     
    };
    imageToUri(url,callback) 
    {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
    
        let base_image = new Image();
        base_image.setAttribute('crossorigin', 'anonymous'); 
        base_image.src = url;
        base_image.onload = function() 
        {
            canvas.width = base_image.width;
            canvas.height = base_image.height;
    
            ctx.drawImage(base_image, 0, 0);
            //  data = canvas.toDataURL('image/png');
            callback(canvas.toDataURL('image/png'));
             
            canvas.remove();
        }
    };
    getImageName(_arr)
    {
        // let  index = _arr.lastIndexOf("/");//= _arr.substring(index+1,(_arr.length-1));  
        let singleImage,imageName;
        singleImage = _arr.split("/");
        imageName = singleImage[singleImage.length-1];
        imageName = imageName.split(".");
        // console.log("singleImage",imageName);
        return imageName[0];
    };
    StoreImgeToByte(_bgImages)
    {
        let byteArr = this.ConvertImageToByte(_bgImages);
        let yop = [0,9];
        // console.log("bgImages", yop);
        // console.log("bgImages", byteArr);
    };
    ConvertImageToByte(_arr,name)
    {
        let byteImageArr = [];
        let local;
        let i = 1;
        let ref = this;
        // let name = null; 
        // console.log("_arr", _arr);
        // console.log("ConvertImageToByte-------------------------");
        // for(let value of _arr)//fetch each value
        // {
            this.imageToUri(_arr,function(uri){
                // console.log(uri);
                // DataBaseManager.InsertContact(DataBaseManager,{
                //         ImageName : name,
                //         ImageData: uri
                //     });
                DataBaseManager.InsertContact(DataBaseManager, name, uri);
                // localStorage.setItem(name,uri);
                // ++i;
            });
        // }
    };
    LoaDataFromLocalStorage(_this,_loadAssetsRef,_callback)
    {
        let ObjectType = ["emoji","geometric","letters","numbers"];
        let boolArr = [true,true,true,true];
        let wholeJSon = JSON.parse(localStorage.getItem("you'reTheTherapistImageJson"));
        // console.log("_callback",_callback);
        let backgroundArr = [];
        let objectArr = [];
        let wholeImage = [];
        let colorScheme ;
        for (let k = 0; k <  _callback[0].length; k++) 
        {
            wholeImage.push([_callback[0][k],_callback[1][k]]);            
        }
        wholeImage = _loadAssetsRef.shuffle(wholeImage);
        if(wholeJSon.general.color_scheme =="cool")
        {
            colorScheme = "cool";
        }
        else
        {
            colorScheme = wholeJSon.general.color_scheme;
        }
        // console.log("wholeImage",wholeImage);
        for (let j = 0; j < wholeImage.length; j++) 
        {          
           
            if(wholeImage[j][0].includes("background") && wholeImage[j][0].includes(colorScheme))
            {
                backgroundArr.push(wholeImage[j][0]);
            }
            else if(wholeImage[j][0].includes("objects") && wholeImage[j][0].includes(ObjectType[0]) && boolArr[0])
            {
                objectArr.push(wholeImage[j][0]);
                // ObjectType = ObjectType.splice(0,1);
                boolArr[0]= false;
            } 
            else if(wholeImage[j][0].includes("objects") && wholeImage[j][0].includes(ObjectType[1])&&  boolArr[1])
            {
                objectArr.push(wholeImage[j][0]);
                // ObjectType = ObjectType.splice(1,1);
                boolArr[1]= false;
            } 
            else if(wholeImage[j][0].includes("objects") && wholeImage[j][0].includes(ObjectType[2])&&boolArr[2])
            {
                objectArr.push(wholeImage[j][0]);
                // ObjectType = ObjectType.splice(2,1);
                boolArr[2]= false;
            }  
            else if(wholeImage[j][0].includes("objects") && wholeImage[j][0].includes(ObjectType[3])&&boolArr[3])
            {
                objectArr.push(wholeImage[j][0]);
                // ObjectType = ObjectType.splice(3,1);
                boolArr[3]= false;
            }        
        }
        // console.log("backgroundArr",backgroundArr);
        // console.log("objectArr",objectArr);
       
      
        for (let i = 0; i < _callback[0].length; i++) 
        {
            _loadAssetsRef.AddTexture(_callback[1][i],_callback[0][i],_this);       
        }
        Database.bg_image_location = [...backgroundArr];
        Database.main_image_location = [...objectArr];
        GameArchitechture.GameArchitechtureInitiallize();
        _loadAssetsRef.LoadCommonItems(_this);
        _this.load.on('complete', _loadAssetsRef.loadCompleteCallback);
    };
    shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }
    LoadDataFromUrl(_LoadAssets,_this)
    {
        let wholeImageJSon =  JSON.parse(localStorage.getItem("you'reTheTherapistImageJson")) ;
        let wholeJSon = JSON.parse(localStorage.getItem("you'reTheTherapistJsonData"));
        let bgImageLocatins;
        let normalImageLocations = [];
        let image_name;
     
        let base_url = wholeImageJSon.base_url;
        bgImageLocatins = [...Database.bg_image_location];
        normalImageLocations = [... Database.main_image_location];
        console.log("image_name = ",Database.main_image_location);
        /*  Laoding Background Images*/
        for (let i = 0; i < bgImageLocatins.length; i++) 
        {
            image_name = _LoadAssets.getImageName(bgImageLocatins[i]);
            _this.load.image(image_name,base_url+bgImageLocatins[i]);
        }


        let normalImages = [];
        if(normalImageLocations.length > 15)
        {
            normalImages =  LevelManager.getRandom(normalImageLocations,15);
        }
        else
        {
            normalImages = [...normalImageLocations];
        }
        Database.main_image_location = [...normalImages];


        /*  Laoding Normal Images*/
        for (let i = 0; i < normalImageLocations.length; i++) 
        {
           if(normalImageLocations[i].includes(".png"))
           {
               image_name = _LoadAssets.getImageName(normalImageLocations[i]);
               _this.load.image(image_name,base_url+normalImageLocations[i]);
           }
           else
           {
                Database.main_image_location.splice(i,1);
           }

        }
       
        _LoadAssets.LoadCommonItems(_this);
        _this.load.on('complete',this.loadCompleteCallback );
    };
    LoadCommonItems(_this)
    {
        _this.load.image('button_1', 'assets/images/button_1.png');
        _this.load.image('button_2', 'assets/images/button_2.png');
        _this.load.image('button_3', 'assets/images/button_3.png');
        _this.load.image('button_4', 'assets/images/button_4.png');

        _this.load.image('base1', 'assets/images/base1.png');
        _this.load.image('base2', 'assets/images/base2.png');
        _this.load.image('base3', 'assets/images/base3.png');
        _this.load.image('base4', 'assets/images/base4.png');

        _this.load.image('check_mark', 'assets/images/check_mark.png');
        _this.load.image('angry_1', 'assets/images/angry_1.png');
        _this.load.image('heading', 'assets/images/heading.png');

        _this.load.image('excellent', 'assets/images/excellent.png');
        _this.load.image('gameOver', 'assets/images/gameOver.png');
        _this.load.image('levelUp', 'assets/images/levelUp.png');
        _this.load.image('timeUp', 'assets/images/timeUp.png');
        _this.load.image('start', 'assets/images/start.png');

        _this.load.image('thumbs_up', 'assets/images/thumbs_up.png');
        _this.load.image('thumbs_down', 'assets/images/thumbs_down.png');
        _this.load.image('timer', 'assets/images/timer.png');

        _this.load.audio('game_start_sound', 'assets/Sounds/start/startSound.mp3');
        _this.load.audio('game_end_sound', 'assets/Sounds/end/endSound.mp3');
        _this.load.audio('level_up_sound', 'assets/Sounds/level_up/levelUpSound.mp3');
        _this.load.audio('correct_answer_sound', 'assets/Sounds/correct/correctSound.mp3');
        _this.load.audio('incorrect_answer_sound', 'assets/Sounds/incorrect/incorrectSound.mp3');
        _this.load.start();
    }
    LoadDataFromImageUrl()
    {

    }
    AddTexture(_uri,name,_this)
    {
        _this.textures.addBase64(name, _uri);        
    };
}
let GameLoadAssets = new LoadAssets();

export { GameLoadAssets as LoadAssets };