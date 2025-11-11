import { Constant } from "./Constant";
import FontFaceObserver from "fontfaceobserver";
import { Base } from "./util/base";
import { AlignGrid } from "./util/alignGrid";
import { AudioManager } from "./AudioManager";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
        this.fonts = {
            "FredokaOne-Regular": null
        };

    }
    init() {
        Constant.gameState = 'loading';
    }
    preload() {
        this.load.image('gBG', 'assets/images/bg/BG.png');
        this.load.image('loading_base', 'assets/images/progress_base.png');
        this.load.image('loading_bar', 'assets/images/progress_bar.png');
        this.load.image('logo', 'assets/images/wm_logo.png');
    }
    create() {
        //Background.
        this.bg = this.add.image(0, 0, 'gBG').setOrigin(0, 0);
        this.bg.setDisplaySize(Constant.game.config.width, Constant.game.config.height);
        //logo
        this.logo = this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 3, 'logo').setScale(0.8);
        //ver
        this.CreateGrid();
        let textStr = 'Ver 1.1.0';
        let textStyle = {
            fontFamily: 'FredokaOne-Regular', align: 'center', fontSize: 60, color: '#ebfdfe', fontStyle: 'bold', lineSpacing: 10, wordWrap: { width: 900, useAdvancedWrap: true }
        };
        let verTxt = Base.placeText(this, textStr, { x: 0, y: 0 }, textStyle);
        verTxt.setScale(Constant.scaleFactor);
        verTxt.setOrigin(0.5);
        this.aGrid.placeAtIndex(84.5, verTxt);
        // this.ver = this.add.text(Constant.game.config.width / 2, Constant.game.config.height / 3, 'logo').setScale(0.8);

        //font and Assets Load.
        this.FontLoading();

        //LoadingBar and Base.
        this.loadingBase = this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 1.1, 'loading_base');
        this.loadingBar = this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 1.1, 'loading_bar');

    }
    CreateGrid() {
        this.aGrid = new AlignGrid({
            scene: this,
            rows: 10,
            cols: 10,
            width: this.bg.displayWidth,
            height: this.bg.displayHeight,
            startX: this.bg.x,
            startY: this.bg.y,
        });
        // this.aGrid.showNumbers();
    }
    FontLoading() {
        let font_property = Object.getOwnPropertyNames(this.fonts);

        font_property.forEach((_fontname, _index) => {
            let lastFont = _index >= font_property.length - 1;
            this.fonts[_fontname] = new FontFaceObserver(_fontname);
            this.fonts[_fontname].load().then(this.FontLoadingSuccess.bind(this, _fontname, lastFont), this.FontLoadingFail.bind(this, _fontname));
        });
    }

    FontLoadingSuccess(_fontName, _lastFont) {
        if (_lastFont) {
            //Text
            this.loadingText = this.add.text(Constant.game.config.width / 2, Constant.game.config.height / 1.5, 'Loading...', { fontFamily: "FredokaOne-Regular", fontSize: 100 }).setOrigin(0.5);
            this.AssetLoad();
        }
    }

    FontLoadingFail(_fontName) {
        console.log('Font Loading Error: ', _fontName);
    }

    AssetLoad() {
        this.load.on('progress', this.LoadingProgress, this);
        this.load.on('complete', this.OnCompleteLoading, { scene: this.scene });

        // for (let i = 1; i < 3; i++) {
        //     this.load.image('bg_' + i, 'assets/images/bg_' + i + '.png');
        // }

        this.load.image('bBG', 'assets/images/bg/board.png');
        this.load.image('cLBlock', 'assets/images/bases/block.png');
        this.load.image('cBase', 'assets/images/bases/coin_base.png');
        this.load.image('hBase', 'assets/images/bases/hint_count.png');
        this.load.image('lBase', 'assets/images/bases/letter_base.png');
        this.load.image('wBase', 'assets/images/bases/word_base.png');
        this.load.image('wDoneBase', 'assets/images/bases/word_done_base.png');
        this.load.image('wLBase', 'assets/images/bases/word_suggestion_base.png');
        this.load.image('button', 'assets/images/buttons/button.png');
        this.load.image('but_restart', 'assets/images/buttons/but_restart.png');
        this.load.image('coin', 'assets/images/icons/coin.png');
        this.load.image('hint', 'assets/images/icons/hint.png');
        this.load.image('settings', 'assets/images/icons/settings.png');
        this.load.image('time', 'assets/images/icons/time.png');
        this.load.image('tutorial', 'assets/images/icons/tutorial.png');
        this.load.image('close_btn', 'assets/images/close_btn.png');
        this.load.json('word_category', 'assets/json/words.json');
        this.load.json('category', 'assets/json/categories.json');
        this.load.image('instruction_popup', 'assets/images/bases/Instruction_popup.png');

        //button assets
        this.load.image('arrow-left', 'assets/images/buttons/arrow_left.png');
        this.load.image('arrow-right', 'assets/images/buttons/arrow_right.png');
        //setting popup ui
        this.load.spritesheet({
            key: 'toggle',
            url: 'assets/images/buttons/toggle_button.png',
            frameConfig: {
                frameWidth: 189 / 2,
                frameHeight: 50,
                startFrame: 0,
                endFrame: 1
            }
        });

        //sc popup assets
        this.load.image('scpopup-bg', 'assets/images/bases/Instruction_popup.png');

        //Loading Audio
        this.load.audio('button_click', 'assets/audio/button_click.mp3');
        this.load.audio('gameover_popup', 'assets/audio/gameover_popup.mp3');
        this.load.audio('matched', 'assets/audio/matched.wav');
        this.load.audio('selection', 'assets/audio/selection.wav');

        this.load.start();
    }

    LoadingProgress(_percent) {
        this.loadingBar.setCrop(0, 0, this.loadingBar.width * _percent, this.loadingBar.height);
        _percent = _percent * 100;
        this.loadingText.setText("Loading... " + parseInt(_percent) + " %");
    }

    OnCompleteLoading() {
        setTimeout(() => {
            Constant.game.scene.stop('PreloadScene');
            Constant.game.scene.start('MenuScene');
            AudioManager.CreateAudio();
        }, 1000);
    }
}