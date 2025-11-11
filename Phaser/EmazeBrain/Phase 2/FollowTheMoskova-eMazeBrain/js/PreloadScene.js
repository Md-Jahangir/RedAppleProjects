// import { LoadAssets } from "./LoadAssets.js";
// import { Server } from "./Server.js";
// // import { GameArchitechture } from "./GameArchitechture.js";
// // import { LoadingPopup } from "./LoadingPopup.js";

// export default class PreloadScene extends Phaser.Scene 
// {
//     constructor() 
//     {
//         super('PreloadScene'); 
//     }
//     init()
//     {  
//     }
//     preload() 
//     {
//         // this.load.image('titleBg', 'assets/images/titleBg.png');
//         // // this.load.image('timer_bg', 'assets/images/timer_bg.png');
//         // this.load.image('unlke', 'assets/images/unlke.png');
//         // this.load.image('like', 'assets/images/like.png');
//         // this.load.image('ticker', 'assets/images/ticker.png');
//         // // this.load.json('Test','Test.json');  
//         // this.load.image('ball_1', 'assets/images/ball_1.png');
//         // this.load.image('ball_2', 'assets/images/ball_2.png');
//         // this.load.image('ball_3', 'assets/images/ball_3.png');
//         // this.load.image('ball_4', 'assets/images/ball_4.png');
//         // this.load.image('ball_correct', 'assets/images/ball_correct.png');
//         // this.load.image('ball_original', 'assets/images/ball_original.png');
//         // // this.load.image('ticker', 'assets/images/ticker.png');

//         // this.load.image('bee_1', 'assets/images/bee_1.png');
//         // this.load.image('bee_2', 'assets/images/bee_2.png');
//         // this.load.image('bee_3', 'assets/images/bee_3.png');
//         // this.load.image('bee_4', 'assets/images/bee_4.png');
//         // this.load.image('bee_correct', 'assets/images/bee_correct.png');
//         // this.load.image('bee_original', 'assets/images/bee_original.png');


//         // this.load.image('bf_1', 'assets/images/bf_1.png');
//         // this.load.image('bf_2', 'assets/images/bf_2.png');
//         // this.load.image('bf_3', 'assets/images/bf_3.png');
//         // this.load.image('bf_4', 'assets/images/bf_4.png');
//         // this.load.image('bf_correct', 'assets/images/bf_correct.png');
//         // this.load.image('bee_original', 'assets/images/bee_original.png');
//         // this.load.image('bf_original', 'assets/images/bf_original.png');

//         // this.load.image('excellent', 'assets/images/excellent.png');
//         // this.load.image('gameOver', 'assets/images/gameOver.png');
//         // this.load.image('levelUp', 'assets/images/levelUp.png');
//         // this.load.image('timeUp', 'assets/images/timeUp.png');
//         // this.load.image('start', 'assets/images/start.png');
//         // // this.load.image('thumbs_up', 'assets/images/thumbs_up.png');
//         // // this.load.image('thumbs_down', 'assets/images/thumbs_down.png');
//         // this.load.image('ticker_red', 'assets/images/ticker_red.png');
//         // this.load.image('ticker_green', 'assets/images/ticker_green.png');
//         //     // added sound for the game
//         // this.load.audio('game_start_sound', 'assets/Sounds/start/startSound.mp3');
//         // this.load.audio('game_end_sound', 'assets/Sounds/end/endSound.mp3');
//         // this.load.audio('level_up_sound', 'assets/Sounds/level_up/levelUpSound.mp3');
//         // this.load.audio('correct_answer_sound', 'assets/Sounds/correct/correctSound.mp3');
//         // this.load.audio('incorrect_answer_sound', 'assets/Sounds/incorrect/incorrectSound.mp3');
//     }
//     create() 
//     {
//         // this.loadingPopup = new LoadingPopup(this);
//         let bg  = this.add.image(game.config.width/2,game.config.height/2,'background').setOrigin(0.5,0.5).setScale(scaleFactorX,scaleFactorY);       
//         // console.log("load complete");
//         // this.loadingPopup.CreateLoadingPopup();
//         // this.loadingPopup.ShowLoadingPopup();
//         // LoadAssets.LoadAssests(this,window.navigator.onLine,JSON.parse(localStorage.getItem("FindUsIfYouCanJsonData")),this.LoadComplete);
//         // LoadAssets.LoadAssests(this,JSON.parse(localStorage.getItem("FindUsIfYouCanJsonData")),this.LoadComplete);

//         setTimeout(() => {
//             this.LoadComplete();
//             // console.log('load complete')
//         }, 2000);
//     }
//     LoadComplete()/*After loading all the file*/
//     {
//         // console.log(" this.scene ", this.scene);
//         // this.scene.loadingPopup.HideLoadingPopup( this.scene);
//         // console.log("SoundManager",SoundManager);
//         SoundManager.AddSound();
//         this.scene.start("GameScene");
//         // console.log('game scene started', this.scene.start("GameScene"));
//     }
   
// }



import { LoadAssets } from "./LoadAssets.js";
import { Server } from "./Server.js";
import { GameArchitechture } from "./GameArchitechture.js";
import { LoadingPopup } from "./LoadingPopup.js";

export default class PreloadScene extends Phaser.Scene 
{
    constructor() 
    {
        super('PreloadScene'); 
    }
    init()
    {  
    }
    preload() 
    {
        this.load.image('one_pixel_white', 'assets/images/one_pixel_white.png');
    }
    create() 
    {
        this.loadingPopup = new LoadingPopup(this);
        let bg  = this.add.image(game.config.width/2,game.config.height/2,'background').setOrigin(0.5,0.5).setScale(scaleFactorX,scaleFactorY);       
        console.log("load complete");
        // this.loadingPopup.CreateLoadingPopup();
        this.loadingPopup.ShowLoadingPopup();
        LoadAssets.LoadAssests(this,JSON.parse(localStorage.getItem("followthemoskovaimageJson")),this.LoadComplete);
        // LoadAssets.LoadAssests(this,window.navigator.onLine,JSON.parse(localStorage.getItem("moreislessimageJson")),this.LoadComplete);
    }
    LoadComplete()                                                /*After loading all the file*/
    {
        // console.log(" this.scene ", this.scene);
        this.scene.loadingPopup.HideLoadingPopup( this.scene);
        console.log("load complete");
        SoundManager.AddSound();
        this.scene.scene.start("GameScene");
    }
   
}