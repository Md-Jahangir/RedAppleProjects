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
    {}
    preload() 
    {}
    create() 
    {
        this.loadingPopup = new LoadingPopup(this);
        let bg  = this.add.image(game.config.width/2,game.config.height/2,'background').setOrigin(0.5,0.5).setScale(scaleFactorX,scaleFactorY);       
        console.log("load complete");
        // this.loadingPopup.CreateLoadingPopup();
        this.loadingPopup.ShowLoadingPopup();
        LoadAssets.LoadAssests(this,JSON.parse(localStorage.getItem("InMySkinImageJson")),this.LoadComplete);
        // LoadAssets.LoadAssests(this,window.navigator.onLine,JSON.parse(localStorage.getItem("InMySkinImageJson")),this.LoadComplete);
    }
    LoadComplete()/*After loading all the file*/
    {
        console.log(" this.scene ", this.scene);
        this.scene.loadingPopup.HideLoadingPopup( this.scene);
        console.log("load complete");
        SoundManager.AddSound();
        this.scene.scene.start("GameScene");
    }
   
}