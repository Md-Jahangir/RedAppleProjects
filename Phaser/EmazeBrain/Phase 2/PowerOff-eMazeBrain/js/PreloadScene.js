// // import { LoadAssets } from "./LoadAssets.js";
// // import { Server } from "./Server.js";
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
//        console.log('into the preload sccene');
//        this.load.image('one','assets/images/one.png');
//        this.load.image('two','assets/images/two.png');
//        this.load.image('three','assets/images/three.png');
//        this.load.image('four','assets/images/four.png');
//        this.load.image('five','assets/images/five.png');
//        this.load.image('six','assets/images/six.png');
//        this.load.image('seven','assets/images/seven.png');
//        this.load.image('eight','assets/images/eight.png');
//        this.load.image('grey','assets/images/grey.png');
//        this.load.image('ten','assets/images/ten.png');
//        this.load.image('eleven','assets/images/eleven.png');
//        this.load.image('thirteen','assets/images/thirteen.png');
//        this.load.image('forteen','assets/images/forteen.png');
//        this.load.image('like','assets/images/like.png');
//        this.load.image('unlike','assets/images/unlike.png');
//        this.load.image('ticker_red','assets/images/ticker_red.png');
//        this.load.image('ticker_green','assets/images/ticker_green.png');
//     }
//     create() 
//     {
//         // this.loadingPopup = new LoadingPopup(this);
//         // let bg  = this.add.image(game.config.width/2,game.config.height/2,'background').setOrigin(0.5,0.5).setScale(scaleFactorX,scaleFactorY);       
//         // console.log("load complete");
//         // // this.loadingPopup.CreateLoadingPopup();
//         // this.loadingPopup.ShowLoadingPopup();
//         // // LoadAssets.LoadAssests(this,window.navigator.onLine,JSON.parse(localStorage.getItem("FindUsIfYouCanJsonData")),this.LoadComplete);
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
//         // console.log("load complete");
//         // SoundManager.AddSound();
//         this.scene.start("GameScene");
//         console.log('game scene started');
//     }

// }




import { LoadAssets } from "./LoadAssets.js";
import { Server } from "./Server.js";
import { GameArchitechture } from "./GameArchitechture.js";
import { LoadingPopup } from "./LoadingPopup.js";
import { SoundManager } from "./SoundManager.js";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
        this.normalFrequency = [];
        this.advanceFrequency = [];
    }
    init() {
    }
    preload() {
    }
    create() {
        this.loadingPopup = new LoadingPopup(this);
        let bg = this.add.image(game.config.width / 2, game.config.height / 2, 'background').setOrigin(0.5, 0.5).setScale(scaleFactorX, scaleFactorY);
        console.log("load complete");
        // this.loadingPopup.CreateLoadingPopup();
        this.loadingPopup.ShowLoadingPopup();
        LoadAssets.LoadAssests(this, JSON.parse(localStorage.getItem("poweroffimagejson")), this.LoadComplete);
        // LoadAssets.LoadAssests(this,window.navigator.onLine,JSON.parse(localStorage.getItem("moreislessimageJson")),this.LoadComplete);
    }
    LoadComplete()                                                /*After loading all the file*/ {
        // console.log(" this.scene ", this.scene);
        // this.scene.loadingPopup.HideLoadingPopup( this.scene);
        console.log("load complete");
        SoundManager.AddSound();
        this.scene.scene.start("GameScene");
    }

}