import Phaser from 'phaser';
// import { Model } from "./Model.js";
import ReelsView from './reel/ReelsView.js';
import Background from "./ui/Background.js";
import BottomPanel from "./ui/BottomPanel.js";
import Paylines from "./ui/Paylines.js";
import { SoundManager } from './SoundManager.js';
import { Constant } from './Constant.js';
import AutoPlay from './popups/AutoPlay.js';
import MenuPopup from './popups/MenuPopup.js';
import JackpotWin from './popups/JackpotWin.js';
import FreeSpin from './popups/FreeSpinPopup.js';
import ScorePopup from './popups/ScorePopup.js';
import GameUI from './ui/GameUI.js';

export default class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
        this.background = null;
        this.reelsView = null;
        this.gameUI = null;
        this.bottomPanel = null;
        this.paylines = null;
        this.jackpotWin = null;
        this.freeSpin = null;
        this.animateScore = null;
        this.reelAnimation = null;
        this.demo = null;
        this.cursors = null;
        this.randomIndex = null;
        this.atStartFpsText;
        this.onRepeatFpsText;
        this.character3;
        this.isFirstReelStopped = false;
    }
    init() { }
    preload() {

    }

    create() {
        // this.cameras.main.setZoom(0.5)
        this.cameras.main.fadeIn(150, 0, 0, 0);
        // this.cameras.main.setZoom(1.3)
        this.background = new Background(this);
        this.gameUI = new GameUI(this);
        this.bottomPanel = new BottomPanel(this);
        this.reelsView = new ReelsView(this);
        this.paylines = new Paylines(this, this.reelsView);
        this.autoPlayPopup = new AutoPlay(this);
        this.autoPlayPopup.CreateAutoPopup();
        this.freeSpin = new FreeSpin(this);
        this.jackpotWin = new JackpotWin(this);
        this.scorePopup = new ScorePopup(this);
        SoundManager.PlayGameBgSound();
    }

    MakeReelsSlow(_reelIndexNumber) {
        this.reelsView.reels[_reelIndexNumber].obj.forEach(element => {
            if (Constant.isMobile) {
            }
            else {
            }


        });

    };
}