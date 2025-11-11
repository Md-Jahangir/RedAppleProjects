import { Model } from "./Model.js";
import ReelsView from "./reel/ReelsView.js";
import Background from "./ui/Background.js";
import GameLogo from "./ui/GameLogo.js";
import BottomPanel from "./ui/BottomPanel.js";
import Paylines from "./ui/Paylines.js";
import { SoundManager } from "./SoundManager.js";


export default class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
        this.background = null;
        this.reelsView = null;
        this.gameLogo = null;
        this.bottomPanel = null;
        this.paylines = null;
    }
    init() {}
    preload() {}

    create() {
        this.createAnims();
        this.background = new Background(this);
        this.reelsView = new ReelsView(this);
        this.gameLogo = new GameLogo(this);
        this.bottomPanel = new BottomPanel(this);
        this.paylines = new Paylines(this, this.reelsView);

        SoundManager.PlayBgMusic();
    }

    createAnims() {
        this.anims.create({
            key: "symbol_spin",
            frames: this.anims.generateFrameNumbers("symbol_spin_animation", {}),
            frameRate: 8,
            repeat: -1
        });

        let symbols = Model.GetSymbols();
        symbols.forEach((symbolName) => {
            this.anims.create({
                key: "anim_symbol_" + symbolName,
                frames: this.anims.generateFrameNumbers("animation_symbol_" + symbolName, {}),
                frameRate: 15,
                repeat: -1
            });
        });

        let totalLineNumber = Model.GetTotalPayLineNumber();
        totalLineNumber.forEach((line) => {
            this.anims.create({
                key: "anim_number_blink_" + line,
                frames: this.anims.generateFrameNumbers("number_" + line, {}),
                frameRate: 3,
                repeat: -1
            });
        });

        this.anims.create({
            key: "bear_run",
            frames: this.anims.generateFrameNumbers("bear_run", {}),
            frameRate: 36,
            repeat: -1
        });
        // this.anims.create({
        //     key: "bear_run",
        //     frames: this.anims.generateFrameNumbers("symbol_spin_animation", {}),
        //     frameRate: 30,
        //     repeat: -1
        // });

    };

    update() {}

}