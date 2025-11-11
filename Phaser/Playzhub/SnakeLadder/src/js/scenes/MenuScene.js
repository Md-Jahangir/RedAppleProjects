/* global Phaser */

/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 13-09-2024.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 02-07-2025
 * @Description :- Game Menu.
 ************************************/

import { Constant } from "../Constant";
import { SelectedResolution } from '../ResolutionSelector.js';
import { Utils } from '../Utils.js';
import ButtonTween from '../game_objects/ButtonTween.js';
import { PlayzhubEventHandler } from "../PlayzhubEventHandler.js";
import { AudioManager } from "../media/AudioManager.js";
import gsap from "gsap";
import Rules from "../popups/Rules.js";
import * as GA from 'gameanalytics';

export default class MenuScene extends Phaser.Scene {
    constructor() {

        super('MenuScene');

    }

    init() {
        this.topPanelContainer = null;
        this.shineArr = [];
        this.originalX = null;
        this.originalY = null;
        Constant.gameScore = 0;
        this.isMenuShown = null;
        this.dataRcvd = null;

        const soundTexture = 1;
        Constant.getSoundTexture = (soundTexture === '0') ? 'Sound_off' : 'Sound_on';

    }

    preload() {

    }

    create() {
        Constant.currentScene = 'MenuScene';
        this.orgX = window.innerWidth; //originalX
        this.orgY = window.innerHeight; //originalY
        Constant.game.events.on('resize', this.resize, this);
        // PlayzhubEventHandler.AdStarted(this.OnStartingAd.bind(this));
        // PlayzhubEventHandler.AdCompleted(this.OnAdCompleted.bind(this));

        this.FetchGameData();
        this.AddBackground();
        this.AddMenuUI();
        this.AddRulesPopup();
        this.ResizeMenu();

        GA.GameAnalytics.addDesignEvent('screen:title');
    }

    FetchGameData() {
        PlayzhubEventHandler.ReceivedGameState(this.UpdateLevel.bind(this));;
        PlayzhubEventHandler.SendGameStateToGame(this.UpdateLevel.bind(this));
        PlayzhubEventHandler.RequestGameStateFromGame();
        PlayzhubEventHandler.RequestGameState();
    }

    ResizeMenu() {
        if (window.innerWidth > window.innerHeight) {
            const clientHeight = window.innerHeight;
            Constant.clientHeight = clientHeight;
            const clientWidth = (clientHeight / 1.77777777778);
            Constant.clientWidth = clientWidth;
            const widthOffset = (window.innerWidth / 2) - (clientWidth / 2);
            Constant.offsetWidth = widthOffset;
            this.resize(clientWidth, clientHeight, widthOffset);
        }
        else {
            const clientWidth = window.innerWidth;
            Constant.clientWidth = clientWidth;

            const clientHeight = window.innerHeight;
            Constant.clientHeight = clientHeight;

            const widthOffset = 0;
            Constant.offsetWidth = widthOffset;
            this.resize(clientWidth, clientHeight, widthOffset);
        }
    }

    // OnStartingAd() {
    //     PlayzhubEventHandler.GamePlayPaused();
    // }

    // OnAdCompleted() {
    //     PlayzhubEventHandler.GamePlayResumed();
    // }

    AddBackground() {
        this.bg = this.add.image(0, 0, 'splash').setOrigin(0.5);
        this.overlay = this.add.image(0, 0, 'overlay').setOrigin(0.5);
    }

    AddMenuUI() {
        //Menu Animation
        this.AddMenuBgAnimation();

        //TopPanel
        this.topPanelContainer = this.add.container();
        this.gameLogo = this.add.spine(0, -110, 'title_art_data', 'title_art_atlas').setOrigin(0.5);
        this.gameLogo.animationState.setAnimation(0, 'appear', false);
        this.gameLogo.name = 'appear';

        this.topPanelContainer.add(this.gameLogo);

        //TopButtonPanel Container
        this.topButtonPanelContainer = this.add.container();
        this.soundBtn = this.add.image(0, 0, 'ui', Constant.getSoundTexture).setOrigin(0.5).setInteractive({ useHandCursor: true });
        this.topButtonPanelContainer.add(this.soundBtn);

        this.soundBtn.on('pointerdown', this.OnClickingSoundBtn, this);

        //Menu Panel Container
        this.menuContainer = this.add.container();

        for (let i = 0; i < 2; i++) {
            this.gModeBtn = this.add.image(-250, -65, 'ui', 'Easy_mode').setOrigin(0.5).setInteractive({ useHandCursor: true }).setName(i);
            this.gModeBtn.postFX.addShine(1, 0.2, 5);
            this.gModeBtn.sceneRef = this;
            if (i > 0) {
                this.gModeBtn.setPosition(this.gModeBtn.x + 480, this.gModeBtn.y);
                this.gModeBtn.setTexture('ui', 'Hard_mode');
                // this.gModeBtn.removeInteractive();
            }

            this.gModeBtn.on('pointerup', this.OnClickingGameModeBtn, this.gModeBtn);
            this.menuContainer.add(this.gModeBtn);
        }

        let multiplierBase = this.add.image((this.gModeBtn.x + this.gModeBtn.width / 2.3), (this.gModeBtn.y - this.gModeBtn.height / 2.3), 'multiplier_base').setOrigin(0.5);
        multiplierBase.postFX.addShine(1, 0.2, 5);
        let fontTextStyle = { fontFamily: 'LuckiestGuy-Regular', fontSize: '40px', fill: '#ffffff', align: 'center' };
        let text = "X2";
        let multiplierTxt = this.add.text(multiplierBase.x, multiplierBase.y - 5, text, fontTextStyle).setOrigin(0.5);
        multiplierTxt.postFX.addShine(1, 0.2, 5);
        this.menuContainer.add([multiplierBase, multiplierTxt]);

        this.scoreBase = this.add.image(-10, this.gModeBtn.y - 210, 'score_base').setVisible(false);
        this.playerPawn = this.add.image(this.scoreBase.x - (this.scoreBase.width / 2.22), (this.scoreBase.y - 10), 'player_0').setVisible(false);
        this.playerPawn.displayWidth = 112;
        this.playerPawn.displayHeight = 192;
        fontTextStyle = { fontFamily: 'LuckiestGuy-Regular', fontSize: '45px', fill: '#ffffff', align: 'center' };
        text = "LIFE TIME SCORE";
        this.scoreText = this.add.text(this.scoreBase.x - 300, this.scoreBase.y - 30, text, fontTextStyle).setVisible(false);
        fontTextStyle = { fontFamily: 'LuckiestGuy-Regular', fontSize: '50px', fill: '#ffffff', align: 'center' };
        text = Constant.gameScore;
        console.log("lifetime score", Constant.gameScore);

        this.lifeTimeScore = this.add.text(this.scoreBase.x + 100, this.scoreBase.y - 30, text, fontTextStyle).setVisible(false);
        this.menuContainer.add([this.scoreBase, this.playerPawn, this.scoreText, this.lifeTimeScore]);

        this.isMenuShown = false;

        // setTimeout(() => {
        this.OnGameLogoAnimComplete();
        // }, 1500);
    }

    AddMenuBgAnimation() {
        this.menuSpineContainer = this.add.container();
        this.bgAnim = this.add.spine(-50, 0, 'splash_data', 'splash_atlas').setOrigin(0.5);
        this.bgAnim.animationState.setAnimation(0, 'splash_page', false);
        this.bgAnim.animationState.timeScale = 2;
        this.menuSpineContainer.add(this.bgAnim);
    }

    OnGameLogoAnimComplete() {
        this.gameLogo.animationState.addListener({
            complete: (entry) => {
                if (entry.animation.name === 'appear') {
                    this.gameLogo.animationState.setAnimation(0, 'loop', true);
                    this.FetchGameData();
                    this.lifeTimeScore.setText(Constant.gameScore);
                    setTimeout(() => {
                        this.ShowMenuContainer();
                    }, 100);
                }
            }
        });
    }

    UpdateLevel(_data) {
        console.log('Fetch data of levels', _data);

        if (_data === null) {
            Constant.gemsCollCount = 0;
            Constant.gameScore = 0;
        }
        else {
            Constant.gemsCollCount = _data.gems;
            Constant.gameScore = _data.score;
        }
    }

    UpdateScore(_data) {
        if (_data.score === null) Constant.gameScore = 0;
        else Constant.gameScore = _data.score;
    }

    AddRulesPopup() {
        this.rulesPopup = new Rules(this);
    }

    OnClickingSoundBtn() {
        GA.GameAnalytics.addDesignEvent('ui:sound_clicked');
        AudioManager.PlayButtonPressAudio();
        this.sBtnTween = new ButtonTween(this, this.soundBtn);

        if (this.soundBtn.frame.name === 'Sound_on') {
            localStorage.setItem('snl', 0);
            this.soundBtn.setTexture('ui', 'Sound_off');
            Constant.getSoundTexture = 'Sound_off';
            AudioManager.PauseGameMusic();
        }
        else {
            localStorage.setItem('snl', 1);
            this.soundBtn.setTexture('ui', 'Sound_on');
            Constant.getSoundTexture = 'Sound_on';
            AudioManager.ResumeGameMusic();
        }
    }

    OnClickingGameModeBtn(pointer) {
        GA.GameAnalytics.addDesignEvent('ui:' + this.frame.name + '_clicked');
        // GA.GameAnalytics.addDesignEvent('ui:game_mode_clicked');
        const sceneRef = this.sceneRef;
        sceneRef.topPanelContainer = null;
        sceneRef.topPanelContainer = null;
        sceneRef.bottomPanelContainer = null;
        sceneRef.shineArr = null;
        Constant.getLevel = parseInt(this.name) + 1;
        let btnTween = new ButtonTween(sceneRef, this);
        AudioManager.PlayButtonPressAudio();
        btnTween.btnTween.on('complete', () => {
            // console.log("constant.game", Constant.game.scene);

            sceneRef.scene.stop("MenuScene");
            sceneRef.scene.start("GameScene");
        });
    }

    ShowMenuContainer() {
        console.log("about to show the container");

        const tween = gsap.to(this.menuContainer, {
            y: Constant.clientHeight - (270 * Constant.newScale),
            duration: 0.25,
            ease: "power4.out",
            onComplete: () => {
                console.log("on complete of menu container animation");

                this.playerPawn.setVisible(true);
                this.scoreBase.setVisible(true);
                this.scoreText.setVisible(true);
                this.lifeTimeScore.setVisible(true);
                this.isMenuShown = true;
                // this.rulesPopup.ShowRules();
                this.bgAnim.animationState.timeScale = 0;
                this.ResizeMenuContainer(Constant.clientWidth, Constant.clientHeight, Constant.newScale);
                tween.kill();
            }
        });
    }

    ResizeMenuContainer(newWidth, newHeight, newScale) {
        this.menuContainer?.setScale(newScale);
        this.menuContainer?.setPosition(newWidth / 2, (this.isMenuShown) ?
            (Constant.clientHeight - (270 * Constant.newScale)) :
            (Constant.clientHeight + (175 * Constant.newScale)));
    }

    resize(_newWidth, _newHeight, offsetWidth) {
        if (Constant.currentScene !== 'MenuScene') {
            return;
        }
        this.newScale = Utils.GetScale(1080, 1920, _newWidth, _newHeight);

        Constant.clientWidth = _newWidth;
        Constant.clientHeight = _newHeight;

        this.bg.setDisplaySize(_newWidth, _newHeight);
        this.bg.setPosition(
            _newWidth / 2,
            _newHeight / 2
        );

        this.overlay.setDisplaySize(_newWidth, _newHeight);
        this.overlay.setPosition(
            _newWidth / 2,
            _newHeight / 2
        );

        this.topPanelContainer?.setScale(this.newScale);
        this.topPanelContainer?.setPosition(_newWidth / 2, 480 * this.newScale);

        this.menuSpineContainer.setScale(this.newScale);
        this.menuSpineContainer.setPosition(
            _newWidth / 2,
            _newHeight / 2
        );

        this.topButtonPanelContainer?.setScale(this.newScale);
        this.topButtonPanelContainer?.setPosition(_newWidth - (105 * this.newScale), 100 * this.newScale);

        this.ResizeMenuContainer(_newWidth, _newHeight, this.newScale);

        const camera = this.cameras.main;

        camera.x = offsetWidth;
        // camera.setBounds(0, 0, _newWidth, _newHeight);
        camera.setViewport(offsetWidth, 0, _newWidth, _newHeight);

    }
    // _newHeight - (405 * this.newScale));
}