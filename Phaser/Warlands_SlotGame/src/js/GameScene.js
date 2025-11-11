import Phaser from 'phaser';
// import { Model } from "./Model.js";
import ReelsView from "./reel/ReelsView.js";
import Background from "./ui/Background.js";
import GameLogo from "./ui/GameLogo.js";
import BottomPanel from "./ui/BottomPanel.js";
// import Paylines from "./ui/Paylines.js";
import { SoundManager } from './SoundManager.js';
import { Constant } from './Constant.js';
import AutoPlay from './popups/AutoPlay.js';
import MenuPopup from './popups/MenuPopup.js';

export default class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
        this.background = null;
        this.reelsView = null;
        this.gameLogo = null;
        this.bottomPanel = null;
        this.paylines = null;
        this.reelAnimation = null;

        this.demo = null;
        this.cursors = null;
        this.randomIndex = null;



        this.atStartFpsText;
        this.onRepeatFpsText;
        this.character3;
    }
    init() { }
    preload() {

    }

    create() {
        // this.cameras.main.setZoom(0.6);
        // this.cache.destroy() 
        // let roughBoy1 = this.add.spine(960, 540, 'barbar')//.setOrigin(0.5, 0.5);
        // roughBoy1.play('Barbas_Animation', true);
        //------------------------------------------------------------------

        // this.scale.lockOrientation('landscape')
        // alert(window.innerWidth);
        // this.cameras.main.setZoom(0.5);

        this.createAnims();
        window.focus();

        // this.background = new Background(this, Constant);         //1
        // this.reelsView = new ReelsView(this);
        // this.CreateFalseOverlay();
        // this.gameLogo = new GameLogo(this);
        // this.bottomPanel = new BottomPanel(this);

        this.background = new Background(this, Constant);           //2
        this.CreateFalseOverlay();
        this.gameLogo = new GameLogo(this);
        this.bottomPanel = new BottomPanel(this);
        this.reelsView = new ReelsView(this);
        // setTimeout(() => {
        //     this.reelsView.PlayMultiplierAnim();
        // }, 500);

        SoundManager.PlayBackgroundSound();//-------------------

        // this.paylines = new Paylines(this, this.reelsView);
        // let fire = this.add.sprite(Constant.game.config.width / 2, Constant.game.config.height / 2, "fireSpritesheet").setOrigin(0.5, 0.5).setScale(1);//Constant.scaleFactorX, Constant.scaleFactorY);
        // fire.play("fire_animtion", false, 0);

        //=================
        this.autoPlayPopup = new AutoPlay(this);
        this.autoPlayPopup.CreateAlertPopup();

        this.menuPopup = new MenuPopup(this);
        this.menuPopup.CreateMenuPopup();
        //===================  

        //-------------------------------------------------------------------------------------------------
    }

    createAnims() {
        this.anims.create({
            key: "fire_animtion",
            frames: this.anims.generateFrameNumbers("fireSpritesheet", {}),
            frameRate: 25,
        });
    };
    CreateFalseOverlay() {
        let overlay;
        if (Constant.isMobile) {
            if (Constant.isPortrait) {
                overlay = this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 4.7, 'one_pixel_black').setOrigin(0.5).setInteractive();
                overlay.setScale(Constant.scaleFactorX * 1080, Constant.scaleFactorY * 490);
            }
            else {
                overlay = this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 27, 'one_pixel_black').setOrigin(0.5).setInteractive();
                overlay.setScale(Constant.scaleFactorX * 1920, Constant.scaleFactorY * 200);
            }
        } else {
            overlay = this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 27, 'one_pixel_black').setOrigin(0.5).setInteractive();
            overlay.setScale(Constant.scaleFactorX * 1920, Constant.scaleFactorY * 200);
            overlay.setDepth(1);
        }
        overlay.setAlpha(0.000001);
        overlay.on("pointerdown", this.OnOverlayClicked, this)
    }
    OnOverlayClicked() {
        // console.log('overlay pressed');
    }

    update() {

    };
    StopSlowReels() {
        SoundManager.StopSlowReelsSound();
        // console.log('------stop rest reels-------')
        this.reelsView.reels.forEach((elem, index) => {
            setTimeout(() => {
                elem.StopAnimation();
            }, index * 110);
        });
        // console.log(this.randomIndex)

    };
    MakeReelsSlow(_reelIndexNumber) {
        this.reelsView.reels[_reelIndexNumber].obj.forEach(element => {
            if (Constant.isMobile) {
                element.animationTween.timeScale = 0.19;
            }
            else {
                element.animationTween.timeScale = 0.2;
            }
        });
    };
}