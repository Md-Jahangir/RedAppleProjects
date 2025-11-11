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
    LoadAssests(_this,_data,_loadCompleteCallback) 
    {
        this.loadCompleteCallback = _loadCompleteCallback;
        Database.StoreImageData(_this,Database);
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
            callback(canvas.toDataURL('image/png'));             
            canvas.remove();
        }
    };
    getImageName(_arr)
    {
        let singleImage,imageName;
        singleImage = _arr.split("/");
        imageName = singleImage[singleImage.length-1];
        imageName = imageName.split(".");
        return imageName[0];
    };
    StoreImgeToByte(_bgImages)
    {
        let byteArr = this.ConvertImageToByte(_bgImages);
        let yop = [0,9];
    };
    ConvertImageToByte(_arr,name)
    {      
        this.imageToUri(_arr,function(uri){
            DataBaseManager.InsertContact(DataBaseManager, name, uri);            
        });
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
        let wholeImageJSon =  JSON.parse(localStorage.getItem("InMySkinImageJson")) ;
        let wholeJSon = JSON.parse(localStorage.getItem("InMySkinJsonData"));
        let bgImageLocatins;
        let normalImageLocations = [];
        let image_name;
        let base_url = wholeImageJSon.base_url;
        bgImageLocatins = [...Database.bg_image_location];
        normalImageLocations = [... Database.main_image_location];
        bgImageLocatins = LevelManager.ShuffleArr(bgImageLocatins);

        /*  Laoding Background Images*/
       
        let singleImage = bgImageLocatins[0];
            singleImage = singleImage.split("/");
            singleImage = singleImage[singleImage.length-1].split(".");
            LevelManager.totalBackgroundImage = "Back"+singleImage[0]; 
            _this.load.image(LevelManager.totalBackgroundImage,base_url+bgImageLocatins[0]);


            let normalImages = [];
            if(normalImageLocations.length > 22)
            {
                normalImages =  LevelManager.getRandom(normalImageLocations,22);
            }
            else
            {
                normalImages = [...normalImageLocations];
            }
            Database.main_image_location = [...normalImages];    


        /*  Laoding Normal Images*/
        for (let i = 0; i < normalImageLocations.length; i++) 
        {
            image_name = _LoadAssets.getImageName(normalImageLocations[i]);
            _this.load.image(image_name,base_url+normalImageLocations[i]);
        }
       
        _LoadAssets.LoadCommonItems(_this);
        _this.load.on('complete',this.loadCompleteCallback );
    };
    LoadCommonItems(_this)
    {
        _this.load.image('excellent', 'assets/images/excellent.png');
        _this.load.image('gameOver', 'assets/images/gameOver.png');
        _this.load.image('levelUp', 'assets/images/levelUp.png');
        _this.load.image('timeUp', 'assets/images/timeUp.png');
        _this.load.image('start', 'assets/images/start.png');        
        _this.load.image('thumbs_up', 'assets/images/thumbs_up.png');
        _this.load.image('thumbs_down', 'assets/images/thumbs_down.png');

        _this.load.image('timer', 'assets/images/timer.png');
        _this.load.image('ticker_green', 'assets/images/ticker_green.png');
        _this.load.image('ticker_red', 'assets/images/ticker_red.png');
        _this.load.image('stop', 'assets/images/stop.png');
        _this.load.image('title', 'assets/images/title.png');
        _this.load.image('titleBg', 'assets/images/titleBg.png');
        _this.load.image('stop', 'assets/images/stop.png');

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