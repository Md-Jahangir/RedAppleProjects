import { LoadAssets } from "./LoadAssets.js";
import { Server } from "./Server.js";
import { GameArchitechture } from "./GameArchitechture.js";
import { LoadingPopup } from "./LoadingPopup.js";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }
    init() {

    }
    preload() {
        // this.load.image('background', 'assets/images/background.png');
        // this.load.spritesheet('loading_wheel', 'assets/images/loading_wheel.png', {
        //     frameWidth: 157,
        //     frameHeight: 157
        // });
       
        //------------GENERAL----------------------------------------//
        this.load.image('blue_rect', 'assets/images/blue_rect.png');
        this.load.image('blue_results', 'assets/images/blue_results.png');
        this.load.image('blue_button', 'assets/images/blue_button.png');
        this.load.image('green_results', 'assets/images/green_results.png');
        this.load.image('green_button', 'assets/images/green_button.png');
        this.load.image('green_rect', 'assets/images/green_rect.png');

        this.load.image('ticker_red', 'assets/images/ticker_red.png');
        this.load.image('ticker_green', 'assets/images/ticker_green.png');
        this.load.image('excellent', 'assets/images/excellent.png');
        this.load.image('gameOver', 'assets/images/gameOver.png');
        this.load.image('levelUp', 'assets/images/levelUp.png');
        this.load.image('timeUp', 'assets/images/timeUp.png');
        this.load.image('start', 'assets/images/start.png');
        this.load.audio('game_start_sound', 'assets/sounds/start/startSound.mp3');
        this.load.audio('game_end_sound', 'assets/sounds/end/endSound.mp3');
        this.load.audio('level_up_sound', 'assets/sounds/level_up/levelUpSound.mp3');
        this.load.audio('correct_answer_sound', 'assets/sounds/correct/correctSound.mp3');
        this.load.audio('incorrect_answer_sound', 'assets/sounds/incorrect/incorrectSound.mp3');
    }
    create() {
        this.loadingPopup = new LoadingPopup(this);
        let bg = this.add.image(game.config.width / 2, game.config.height / 2, 'background').setOrigin(0.5, 0.5).setScale(scaleFactorX, scaleFactorY);
        
        this.loadingPopup.ShowLoadingPopup();
        LoadAssets.LoadAssests(this,JSON.parse(localStorage.getItem("NeonCalculatorImageJson")),this.LoadComplete);
        // LoadAssets.LoadAssests(this,window.navigator.onLine,JSON.parse(localStorage.getItem("NeonCalculatorImageJson")),this.LoadComplete);
        // setTimeout(() => {
            // this.LoadComplete();
        // }, 3000);
    }
    LoadComplete() /*After loading all the file*/ {
        // console.log(" this.scene ", this.scene);
        // console.log('ada',this.scene.loadingPopup.HideLoadingPopup( this.scene));
        this.scene.loadingPopup.HideLoadingPopup( this.scene);
        console.log("load complete");
        SoundManager.AddSound();
        console.log('preload scene ended here');
        this.scene.scene.start("GameScene");
    }

}