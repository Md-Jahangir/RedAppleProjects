/**** 
@Original_Creator : - Supriyo_Mukherjee.
@Created_Date : - 26 - 11 - 2022.
@Last_Update_By : - Supriyo_Mukherjee.
@Last_Updatd_Date : - 28- 12 - 2022
@Description : - Handles all the loading of assets of the game with a menu page
*/
export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super("PreloadScene")
        this.loadingSceneBg;
        this.loadingBar = null;
        this.loadingbase = null;
        this.progressBar = null;
        this.textStyle;
    }
    /**
     * loading imges required initially
     */
    preload() {
        this.load.image('progress_bar', 'assets/images/progress_bar.png');
        this.load.image('progress_base', 'assets/images/progress_base.png');
        this.load.image('back', 'assets/images/back.jpg');
    };
    /**
     * added necessary images needed for this particullar scene
     */
    create() {
        this.add.image(960, 540, 'back').setOrigin(0.5);
        // this.ship = this.add.image(240, 903, 'boat').setOrigin(0.5).setAngle(-180).setScale(0.1);
        const ballBreakTextStyle = { font: "bold 95px CCBellyLaugh", stroke: '#fff', strokeThickness: 6 };
        this.textStyle = { fontFamily: 'Georgia', fontSize: '140px', fill: '#757', fontStyle: 'bold' };
        let loadingText = this.add.text(960, 990, 'loading...', { font: '34px Arial' }).setOrigin(0.5);
        loadingText.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);
        let boatRush = this.add.text(960, 240, "BOAT  RUSH", ballBreakTextStyle).setOrigin(0.5);
        boatRush.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);
        // let rectangleBoxBase = this.add.rectangle(960, 940, 1500, 30);

        // rectangleBoxBase.setStrokeStyle(2, 0x1a65ac);

        this.loadingbase = this.add.image(960, 940, 'progress_base').setOrigin(0.5)//.setScale(2, 1);//.setScale(3.4, 1);
        this.progressBar = this.add.image(460, 940, 'progress_bar').setOrigin(0, 0.5)//.setScale(2, 1);//.setScale(3.43, 1);

        this.progressBar.setCrop(0, 0, 0, this.progressBar.height);
        this.LoadAssets();
    }
    /**
     * For Loading images, animations,sound in run-time
     */
    LoadAssets() {
        this.load.image('white', 'assets/images/white.png');
        this.load.image('black', 'assets/images/black.png');

        this.load.image('bg', 'assets/images/bg.png');
        this.load.image('bone', 'assets/images/bone.png');
        this.load.image('coin', 'assets/images/coin.png');
        this.load.image('boat', 'assets/images/boat.png');
        this.load.image('missile', 'assets/images/missile.png');
        this.load.image('pool1', 'assets/images/pool1.png');
        this.load.image('log', 'assets/images/log.png');
        this.load.image('zebraCross', 'assets/images/zebraCross.png');

        //adding sound
        this.load.audio('bg_music', 'assets/sounds/bg/bg_music.mp3');
        this.load.audio('coin_collect', 'assets/sounds/sfx/coin_collect.mp3');
        this.load.audio('game_over', 'assets/sounds/sfx/game_over.mp3');

        // anim for colliding
        this.load.spritesheet('bomb', 'assets/images/bomb.png',
            {
                frameWidth: 202,
                frameHeight: 210
            });

        // For loading assets in runtime
        this.load.on('progress', this.loadProgress, this);
        this.load.on('complete', this.complete, { scene: this.scene });
        this.load.start();
    }
    /**
     * 
     * @param {percentage} integer 
     * handels loading and showing percentage
     */
    loadProgress(percentage) {
        this.progressBar.setCrop(0, 0, this.progressBar.width * percentage, this.progressBar.height);
        percentage = Math.floor(percentage * 100);
        // this.Percent(percentage);
    }
    Percent(_percentValue) {
        let loadingPercentage = this.add.text(1000, 990, _percentValue, this.textStyle)
    }
    /**
     * after loading completion this method has been called where we stop preload scene and I redirect to the gameScene
     */
    complete() {
        console.log("comp")
        setTimeout(() => {
            this.scene.stop('PreloadScene');
            this.scene.start("GameScene");
        }, 1000);
    }
}