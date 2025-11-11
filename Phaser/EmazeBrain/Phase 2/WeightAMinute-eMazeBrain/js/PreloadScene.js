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
        this.load.image('titleBg', 'assets/images/titleBg.png');
    }
    create() 
    {
        this.loadingPopup = new LoadingPopup(this);
        let bg  = this.add.image(game.config.width/2,game.config.height/2,'background').setOrigin(0.5,0.5).setScale(scaleFactorX,scaleFactorY);       
        console.log("load complete");
        this.loadingPopup.CreateLoadingPopup();
        this.loadingPopup.ShowLoadingPopup();
        LoadAssets.LoadAssests(this,JSON.parse(localStorage.getItem("WeightAMinuteJsonData")),this.LoadComplete);

    }
    LoadComplete()/*After loading all the file*/
    {
        this.scene.loadingPopup.HideLoadingPopup( this.scene);
        console.log("load complete");
        SoundManager.AddSound();
        this.scene.scene.start("GameScene");
    }
   
}