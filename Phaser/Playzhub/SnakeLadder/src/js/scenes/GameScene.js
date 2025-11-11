/* global Phaser */

/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 02-03-2025.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 01-08-2025
 * @Description :- Game Manager.
 ************************************/

import { Constant } from "../Constant.js";
import GameoverPopup from "../popups/GameoverPopup.js";
import { Utils } from '../Utils.js';
import gsap from "gsap";
import Player from "../game_objects/Player.js";
import Snake from "../game_objects/Snake.js";
import Ladder from "../game_objects/Ladder.js";
import Gems from "../game_objects/Gems.js";
import ButtonTween from "../game_objects/ButtonTween.js";
import QuitPopup from "../popups/QuitPopup.js";
import TutorialPopup from "../popups/TutorialPopup.js";
import { PlayzhubEventHandler } from "../PlayzhubEventHandler.js";
import { AudioManager } from "../media/AudioManager.js";
import Board from "../game_objects/Board.js";
import Portal from "../game_objects/Portal.js";
import TurnPopup from "../popups/TurnPopup.js";
import SkipPopup from "../popups/SkipPopup.js";
import Rules from "../popups/Rules.js";
import * as GA from 'gameanalytics';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    preload() { }

    init() {
        this.currDiceNum = null;
        this.turnNumArr = [];
        this.playerArr = [];
        this.botTurnChainArr = [];
        this.botTurnArr = [];
        this.turnCounts = 2;
        this.animArr = [];
        this.turnCardArr = [];
        this.turnChainArr = [];
        this.rlvlData = null;
        this.lvlData = null;
        this.lastPawn = null;
        this.turn = Phaser.Math.Between(0, 1);
        this.lastTurn = null;
        this.infoBtnClickCounter = 0;
        this.pressedDice = null;
        this.isPaused = null;
        this.pausedMethods = null;
        this.hasCheckedTurn = null;
        this.lowerPanelY = null;
        this.skipLife = null;
        Constant.skipClickCount = 3;
        this.isSkipPressed = null;
    }

    create() {
        Constant.currentScene = 'GameScene';
        this.orgX = window.innerWidth; //originalX
        this.orgY = window.innerHeight; //originalY
        Constant.game.events.on('resize', this.resize, this);
        PlayzhubEventHandler.AdStarted(this.OnStartingAd.bind(this));
        PlayzhubEventHandler.AdCompleted(this.OnAdCompleted.bind(this));
        this.cameras.main.fadeIn(800);
        AudioManager.PlayLevelMusic();
        this.CreateGameEvents();
        this.AddPauseEvent();
        this.AddBackground();
        this.AddBoard();
        this.GetLevel();
        this.AddGameUI();
        this.GetTurnNums();
        this.AddPopups();
        this.GameResize();

        GA.GameAnalytics.addProgressionEvent(
            "Start",
            "snake_ladder_endless"
        );
    }

    GameResize() {
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

    ShowAd() {
        GA.GameAnalytics.addDesignEvent('ad:requested');
        PlayzhubEventHandler.RequestAD();
    }

    OnStartingAd() {
        GA.GameAnalytics.addDesignEvent("ad:started");
        PlayzhubEventHandler.GamePlayPaused();
        this.sound.setMute(true);
    }

    OnAdCompleted() {
        GA.GameAnalytics.addDesignEvent("ad:completed");
        PlayzhubEventHandler.GamePlayResumed();
        this.sound.setMute(false);
        // setTimeout(() => {
        //     this.RestartGameScene();
        // }, 150);
    }

    CreateGameEvents() {
        this.events.on('game_paused', this.PauseAllAnims, this);
        this.events.on('game_resumed', this.ResumeAllAnims, this);
    }

    AddPauseEvent() {
        this.isPausedEvent = this.time.addEvent({
            delay: 250,
            loop: true,
            paused: true,
            callback: this.pauseTick,
            callbackScope: this
        });
    }

    pauseTick() {
        if (!this.isPaused) return;

        if (!this.currPlayer) return;

        this.currPlayer.PausePlayerTimer?.();

        if (this.currPlayer.alarmTween?.timeScale)
            this.currPlayer.alarmTween.timeScale(0);

        for (let i = 0; i < this.animArr.length; i++) {
            const tween = this.animArr[i];
            if (tween?.timeScale) {
                tween.timeScale(0);
            }
        }
    }

    AddBackground() {
        this.bg = this.add.image(0, 0, 'game_bg').setOrigin(0.5);
    }

    AddBoard() {
        this.gameContainer = this.add.container().setDepth(2);//.setOrigin(0);
        this.ladderContainer = this.add.container().setDepth(2);
        this.snakeContainer = this.add.container().setDepth(2);
        this.board = new Board(this);
        this.gameContainer.add(this.board.boardGrid);
        this.gameContainer.add(this.board.boardTxtGrid);
    }

    GetLevel() {
        this.rlvlData = this.cache.json.get('lvl_data');
        this.lvlData = JSON.parse(JSON.stringify(this.rlvlData));
        this.getLvl = Constant.getLevel;

        this.InstantiateSnake();
    }

    InstantiateSnake() {
        let snakeData = this.lvlData[this.getLvl].snakes;
        this.snake = new Snake(this, snakeData);
    }

    InstantiateLadder() {
        let ladderData = this.lvlData[this.getLvl].ladders;
        this.ladder = new Ladder(this, ladderData);
    }

    InstantiateGems() {
        // this.gems = new Gems(this);
    }

    AddGameUI() {
        //TopPanel
        this.playerData = this.cache.json.get('player_data');
        this.topSoundContainer = this.add.container();
        this.topBackBtnContainer = this.add.container();
        this.topGemsBaseContainer = this.add.container();
        this.AddPortal();
        this.playerContainer = this.add.container();
        this.AddTopPanel();

        for (let i = 0; i < 2; i++) {
            this.player = new Player(this, i, this.playerData[i], this.board.board);
            this.playerArr.push(this.player);
            this.playerContainer.add(this.player.playerUIContainer);
        }

        // BottomPanel
        this.infoBtnContainer = this.add.container();//.setDepth(5);
        this.bottomUIContainer = this.add.container().setDepth(6);
        this.skipBtnContainer = this.add.container();
        this.shutterContainer = this.add.container().setDepth(5);
        this.turnCoverContainer = this.add.container().setDepth(5);
        this.turnChainContainer = this.add.container().setDepth(4);
        this.turnCardArr = [];
        this.turnChainArr = [];

        this.AddBottomPanel();
    }

    AddTopPanel() {
        this.backBtn = this.add.image(0, -25, 'ui', 'Back').setOrigin(0.5).setInteractive({ useHandCursor: true });
        this.topBackBtnContainer.add(this.backBtn);

        this.CreatePopupSpineBase();

        this.soundBtn = this.add.image(0, -25, 'ui', Constant.getSoundTexture).setOrigin(0.5).setInteractive({ useHandCursor: true });
        this.topSoundContainer.add(this.soundBtn);

        // this.gemsBase = this.add.image(0, -25, 'ui', 'diamond').setOrigin(0.5);
        // let fontTextStyle = { fontFamily: 'LuckiestGuy-Regular', fontSize: '55px', fill: '#ffffff', align: 'center' };
        // let text = Constant.gemsCollCount;
        // this.gemsCollTxt = this.add.text(this.gemsBase.x + 21, this.gemsBase.y - 8, text, fontTextStyle).setOrigin(0.5);
        // this.topGemsBaseContainer.add([this.gemsBase, this.gemsCollTxt]);

        this.backBtn.on('pointerup', this.OnClickingBackBtn, this);
        this.soundBtn.on('pointerup', this.OnClickingSoundBtn, this);
    }

    AddPortal() {
        let portalBlock = this.gameContainer.getByName(100);
        this.portal = new Portal(this, portalBlock);
    }

    ShowPortal() {
        this.portal.showPortal();
    }

    MinimizePortal() {
        this.portal.minimizePortal();
    }

    CreatePopupSpineBase() {
        this.qPopupBase = this.add.spine(0, 0, 'popup_data', 'popup_atlas').setOrigin(0.5).setVisible(false);

        this.qPopupBase.animationState.addListener({
            complete: (entry) => {
                if (this.qPopupBase.name === 'quit')
                    this.qPopupBase.animationState.setAnimation(0, 'quit_loop', true);
                else if (this.qPopupBase.name === 'congratulation')
                    this.qPopupBase.animationState.setAnimation(0, 'congratulation_loop', true);
                else
                    this.qPopupBase.animationState.setAnimation(0, 'lost_loop', true);
            }
        });
    }

    AddBottomPanel() {
        //Add Turn Chain
        this.lowerPanelY = (this.board.board.y) + (this.board.board.height / 2 + 145);
        this.turnChainBase = this.add.image(this.board.board.x, this.lowerPanelY, "dice_base").setOrigin(0.5);
        this.turnChainContainer.add(this.turnChainBase);
        for (let i = 0; i < 3; i++) {
            let turnChain = this.add.image(this.turnChainBase.x - 196, this.turnChainBase.y - 12, 'game_obj', '1').setOrigin(0.5).setScale(0.95, 0.88).setAlpha(0.5).removeInteractive().setScale(0.28);
            turnChain.setVisible(false);
            this.turnChainArr.push(turnChain);
            // turnChain.on('pointerdown', () => {
            //     this.OnClickingTurnChains(turnChain);
            // }, this);
            this.turnChainContainer.add(turnChain);
            if (i > 0) {
                turnChain.setPosition(this.turnChainArr[i - 1].x + 197, (this.turnChainBase.y - 12));
            }
        }

        //Add Shutters
        this.AddShutters();

        //Add Turn Cover
        this.AddTurnCover();

        //Add Turn Base
        this.AddTurnBase();

        //Add Skip Button
        this.AddSkipButton();

        //Add Rules
        this.AddRules();
    }

    AddTurnCover() {
        this.turnChainCover = this.add.image(this.turnChainBase.x, (this.turnChainBase.y - 7), "dice_overlay").setOrigin(0.5).setVisible(true).setInteractive();
        this.turnCoverContainer.add(this.turnChainCover);
    }

    AddShutters() {
        this.turnChainArr.forEach((element, index) => {
            let shutter = this.add.image(element.x, element.y + 2, 'shutter_' + (index + 1));
            this.shutterContainer.add(shutter);
        });
    }

    AddShutterDownAnimation() {
        const list = this.shutterContainer.list;
        const first = list[0];

        // Animate shutter container
        gsap.to(list, {
            y: first.y + first.height / 2,
            scaleY: 0.1,
            duration: 0.15
        });

        const shouldAnimate = this.playerTurnArr.length > 0;
        const total = this.turnChainArr.length;
        const baseY = this.turnChainBase.y - 17;

        this.turnChainArr.forEach((element, index) => {
            const targetAlpha = element.mAlpha ?? 1;
            const isLast = index === total - 1;

            element.visible = true;
            element.processed = false;

            if (shouldAnimate) {
                Object.assign(element, {
                    alpha: 0,
                    scaleX: 0.6,
                    scaleY: 0.6,
                    y: element.y + 30
                });

                gsap.to(element, {
                    y: baseY,
                    delay: 0.15,
                    scaleX: 1,
                    scaleY: 1,
                    alpha: targetAlpha,
                    duration: 0.5,
                    ease: "elastic.out(1.2, 0.5)",
                    onComplete: () => {
                        element.setInteractive({ useHandCursor: true });
                        element.isClickable = true;
                        gsap.killTweensOf(element);
                        // if (isLast) this.StartTimer();
                    }
                });
                return;
            }

            // If not animating
            element.alpha = targetAlpha;

            if (targetAlpha >= 1) {
                Object.assign(element, {
                    alpha: 0,
                    scaleX: 0.6,
                    scaleY: 0.6,
                    y: element.y + 30,
                    processed: true
                });

                this.AnimateSpecificDie(element, targetAlpha, isLast);
            } else if (!element.processed && element.y !== (this.turnChainBase.y - 13)) {
                element.y = this.turnChainBase.y - 9;
                element.setScale(0.95, 0.88);
            }
        });
    }

    AnimateSpecificDie(_elem = null, _tAlpha = null, _isLast = null) {
        // console.log("at the specific die ");
        const element = _elem;
        const tAlpha = _tAlpha;
        const isLast = _isLast;

        gsap.to(element, {
            y: this.turnChainBase.y - 17,
            delay: 0.15,
            scaleX: 1,
            scaleY: 1,
            alpha: tAlpha,
            duration: 0.5,
            ease: "elastic.out(1.2, 0.5)",
            onComplete: () => {
                element.setInteractive({ useHandCursor: true });
                element.isClickable = true;
                gsap.killTweensOf(element);
                // if (_isLast) {
                //     // this.StartTimer();
                // }
            }
        });
    }

    AddShutterUpAnimation() {
        this.turnChainArr.forEach(element => {
            gsap.to(element, {
                delay: 0.15,
                alpha: 0,
                y: element.y + 10,
                duration: 0.5,
                ease: "elastic.out(1.2,0.5)",
            })
        });

        if (this.shutterContainer.list[0].scaleY !== 1) {
            const children = this.shutterContainer.list;
            children.forEach((child, index) => {
                gsap.to(child, {
                    y: child.y - child.height / 2,
                    scaleY: 1,
                    duration: 0.15,
                    onComplete: index === children.length - 1 ? () => {
                        this.UpdateDice();
                        // this.StartTimer();
                        // this.GetBotDiceNum();
                    } : undefined
                });
            });
        }
    }

    MakePlayerBtnsActive() {
        this.turnChainCover.setVisible(false);
        this.infoBtn.clearTint();
        this.infoBtn.setInteractive({ useHandCursor: true });
        if (this.playerTurnArr?.length > 0 && Constant.skipClickCount > 0)
            this.MakeSkipBtnActive();
    }

    MakePlayerBtnsInactive() {
        this.turnChainCover.setVisible(true);
        this.infoBtn.setTint(0x555555);
        this.infoBtn.removeInteractive();
        this.MakeSkipBtnInactive();
    }

    MakeSkipBtnActive() {
        this.skipBtn.clearTint();
        this.skipBtn.setInteractive({ useHandCursor: true });
        this.skipClickCountBase.clearTint();
        this.skipClickCountTxt.clearTint();
    }

    MakeSkipBtnInactive() {
        this.skipBtn.setTint(0x555555);
        this.skipBtn.removeInteractive();
        this.skipClickCountBase.setTint(0x555555);
        this.skipClickCountTxt.setTint(0x555555);
    }

    UpdateDice() {
        const turnIndex = this.turnCounts;
        const pressedDice = this.pressedDice;
        this.pressedDice = null;

        if (!pressedDice) return;

        if (this.playerTurnArr.length >= 1) {
            // console.log("getting here ");

            this.playerTurnArr.splice(0, 1);
            pressedDice.setTexture('game_obj', this.turnCardArr[turnIndex]._text);
            this.turnCardArr[turnIndex].setStyle({ color: '#e4b08c' });
        } else {
            // console.log("getting at else");

            pressedDice.mAlpha = 0.5;
        }
    }

    StartTimer() {
        this.currPlayer.StartPlayerTimer();
        // this.lastPlayerTimer.animationState.setAnimation(0, 'idle', false);

        // setTimeout(() => {
        // callback();
        // }, 100);
    }

    AddTurnBase() {
        this.tBase = this.add.image(this.turnChainBase.x + 165, (this.lowerPanelY + 185), 'game_obj', 'turn_num_base').setOrigin(0.5);
        this.tBase.setData({ y: this.tBase.y });
        this.bottomUIContainer.add(this.tBase);

        this.infoBtn = this.add.image((this.turnChainBase.x + 12) + this.tBase.width / 2 + 90, (this.lowerPanelY + 40), 'ui', 'I').setOrigin(0.5);
        this.infoBtn.on('pointerup', this.OnClickingInfo, this);

        this.infoBtnContainer.add(this.infoBtn);

        let fontTextStyle = { fontFamily: 'LuckiestGuy-Regular', fontSize: '62px', fill: '#ac5218', align: 'center' };
        let txt = 0;
        const baseX = this.tBase.x - this.tBase.width / 2.5;
        const baseY = this.tBase.y - this.tBase.height / 7;

        let prevCard = null;

        for (let i = 0; i < 21; i++) {
            const rndNum = Phaser.Math.Between(1, 6);
            // const rndNum = 1;
            this.turnNumArr.push(rndNum);

            const turnCard = this.add.text(baseX, baseY, txt, fontTextStyle).setOrigin(0.5).setVisible(true);
            this.turnCardArr.push(turnCard);
            this.bottomUIContainer.add(turnCard);

            if (i > 0 && i < 11) {
                prevCard = this.turnCardArr[i - 1];
                turnCard.x = prevCard.x + prevCard.displayWidth * 1.35;
                turnCard.y = prevCard.y;
            } else if (i >= 11) {
                if (i === 11) {
                    const firstRowCard = this.turnCardArr[0];
                    const secondRowY = this.turnCardArr[1].y + this.turnCardArr[1].displayHeight;
                    turnCard.x = firstRowCard.x + 24;
                    turnCard.y = secondRowY;
                } else {
                    prevCard = this.turnCardArr[i - 1];
                    const secondRowY = this.turnCardArr[1].y + this.turnCardArr[1].displayHeight;
                    turnCard.x = prevCard.x + prevCard.displayWidth * 1.35;
                    turnCard.y = secondRowY;
                }
            }

            turnCard.setData('y', turnCard.y); // if still needed
        }

        this.infoBtnClickCounter++;
        this.AnimateTurnBase();
    }

    OnClickingInfo() {
        GA.GameAnalytics.addDesignEvent('ui:info_clicked');
        AudioManager.PlayButtonPressAudio();
        this.iBtnTween = new ButtonTween(this, this.infoBtn);

        // this.iBtnTween.btnTween.on('complete', () => {
        this.infoBtnClickCounter++;
        this.AnimateTurnBase();

        // });
    }

    AnimateTurnBase() {
        switch (this.infoBtnClickCounter) {
            case 1: this.bottomUIContainer.list.forEach(element => {
                gsap.to(element, {
                    y: element.y - 80,
                    // x: this.infoBtn.x,
                    // scaleX: 0.01,
                    scaleY: 0.01,
                    alpha: 0,
                    ease: 'power.out',
                    duration: 0.5,
                });
            });

                break;

            default: this.bottomUIContainer.list.forEach(element => {
                gsap.to(element, {
                    y: element.data.list.y,
                    // y: this.infoBtn.y + 5,
                    // scaleX: 1,
                    scaleY: 1,
                    alpha: 1,
                    ease: 'power.in',
                    duration: 0.5,
                });
                this.infoBtnClickCounter = 0;

            });
                break;
        }
    }

    AddSkipButton() {
        this.skipBtn = this.add.image((this.turnChainBase.x + 12) - this.tBase.width / 2 - 105, (this.lowerPanelY + 40), 'ui', 'skip_btn').setOrigin(0.5);//.setInteractive({ useHandCursor: true });//.setVisible(false);
        // this.skipBtn.setAlpha(0.7);
        this.skipClickCountBase = this.add.image(this.skipBtn.x + 35, (this.skipBtn.y - this.skipBtn.height / 1.7), 'game_obj', 'Number_base').setOrigin(0.5);
        // this.skipClickCountBase.setAlpha(0.7);
        let fontTextStyle = { fontFamily: 'LuckiestGuy-Regular', fontSize: '40px', fill: '#ffffff', align: 'center' };
        let txt = Constant.skipClickCount;
        this.skipClickCountTxt = this.add.text(this.skipClickCountBase.x, this.skipClickCountBase.y - 3, txt, fontTextStyle).setOrigin(0.5)//.setAlpha(0.7);
        this.skipClickCountTxt.setStroke('#314b00', 6);
        this.skipBtnContainer.add([this.skipBtn, this.skipClickCountBase, this.skipClickCountTxt]);
        this.skipLife = Constant.skipClickCount;
        this.MakeSkipBtnInactive();

        this.skipBtn.on('pointerup', this.OnClickingSkip, this);
    }

    AddRules() {
        this.txtRulesContainer = this.add.container();
        let fontTextStyle = { fontFamily: 'LuckiestGuy-Regular', fontSize: '40px', fill: '#ffffff', align: 'center' };
        let txt = "SEE RULES";
        this.rulesTxt = this.add.text(0, 0, txt, fontTextStyle).setOrigin(0.5);//.setInteractive({ useHandCursor: true });
        this.rulesTxt.setTint(0x555555);
        const textWidth = this.rulesTxt.width;
        const textHeight = this.rulesTxt.height;
        const x = this.rulesTxt.x - (textWidth / 2);
        const y = this.rulesTxt.y + (textHeight / 2);
        this.lineGraphics = this.add.graphics();
        this.lineGraphics.lineStyle(2, 0xffffff, 1); // 2px line, white color
        this.lineGraphics.lineBetween(x, y, x + textWidth, y);

        this.rulesTxt.on('pointerdown', this.OnClickingRulesTxt, this);
        this.txtRulesContainer.add([this.rulesTxt, this.lineGraphics]);
    }

    OnClickingRulesTxt() {
        GA.GameAnalytics.addDesignEvent('ui:rules_clicked');
        const buttonTwn = new ButtonTween(this, this.rulesTxt, this.lineGraphics);
        AudioManager.PlayButtonPressAudio();
        this.events.emit('game_paused');
        this.rulesPopup.ShowRules();
        buttonTwn.btnTween.on('complete', () => {
            setTimeout(() => {
                this.rulesTxt.removeInteractive();
                this.rulesTxt.setTint(0x555555);
            }, 100);
        });
    }

    OnClickingSkip() {
        GA.GameAnalytics.addDesignEvent('ui:skip_clicked');
        this.btnTween = new ButtonTween(this, this.skipBtn, this.skipClickCountBase, this.skipClickCountTxt);
        AudioManager.PlayButtonPressAudio();
        if (Constant.skipClickCount > 0) {
            Constant.skipClickCount--;
            this.skipClickCountTxt.setText(Constant.skipClickCount);
            // this.events.emit('game_paused');
            this.isSkipPressed = true;
            this.skipPopup.showSkipPopup();
        }
    }

    OnClickingBackBtn() {
        GA.GameAnalytics.addDesignEvent('ui:back_clicked');
        this.btnTween = new ButtonTween(this, this.backBtn);
        AudioManager.PlayButtonPressAudio();
        this.events.emit('game_paused');
        this.animArr = [];
        this.animArr.push(this.ladder.promotePawn, this.btnTween, this.currPlayer.movePawnAnim);
        this.ShowAd();
        this.quitPopup.ShowQuitPopup()
    }

    PauseAllAnims() {
        if (this.isPaused) return;
        this.isPaused = true;
        this.isPausedEvent.paused = false;
    }

    ResumeAllAnims() {
        if (!this.isPaused) return;

        this.isPaused = false;
        this.isPausedEvent.paused = true;

        const player = this.currPlayer;
        if (!player) return;

        const alarmTween = player.alarmTween;

        if (this.turn === 0) {
            player.ResumePlayerTimer();
        } else {
            player.PausePlayerTimer?.();
            if (Array.isArray(this.pausedMethods)) {
                for (let i = 0; i < this.pausedMethods.length; i++) {
                    const method = this.pausedMethods[i];
                    if (typeof method === 'function') method.call(this);
                }
                this.pausedMethods.length = 0;
            }
        }

        if (alarmTween && alarmTween.timeScale) {
            alarmTween.timeScale(1);
        }

        const anims = this.animArr;
        for (let i = 0; i < anims.length; i++) {
            const tween = anims[i];
            if (tween && tween.timeScale) {
                tween.timeScale(1);
            }
        }

        anims.length = 0;
    }

    OnClickingSoundBtn() {
        GA.GameAnalytics.addDesignEvent('ui:sound_clicked');
        const btnTween = new ButtonTween(this, this.soundBtn);
        AudioManager.PlayButtonPressAudio();
        btnTween.btnTween.on('complete', () => {
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
        });
    }

    GetTurnNums() {
        this.turnCardArr.forEach((element, index) => {
            element.setText(this.turnNumArr[index]);
        });
        this.playerTurnArr = [...this.turnNumArr];

        this.botTurnArr = this.turnNumArr.sort((a, b) => 0.5 - Math.random());
        this.botTurnChainArr = [this.botTurnArr[0], this.botTurnArr[1], this.botTurnArr[2]];
        this.botTurnArr.splice(0, 3);
        this.FirstTurnChainNum();
    }

    FirstTurnChainNum() {
        this.turnChainArr.forEach((element, index) => {

            element.setTexture('game_obj', this.turnCardArr[index]._text);
            this.playerTurnArr.splice(index, 1);
            element.setInteractive({ useHandCursor: true });
            this.turnCardArr[index].setStyle({ color: '#e4b08c' });
            element.sceneRef = this;

            element.on('pointerdown', this.AddAnimationForTurnChainArr, element);
        });
    }

    AddAnimationForTurnChainArr() {
        if (!this.isClickable) return;
        this.sceneRef.turnChainArr.forEach(element => {
            element.removeInteractive();
        });
        this.sceneRef.MakeSkipBtnInactive();
        this.sceneRef.turnCounts++;
        this.sceneRef.pressedDice = this;


        this.btnTween = this.sceneRef.tweens.add({
            targets: this,
            scaleX: 0.95 * 1,
            scaleY: 0.88 * 1,
            ease: 'Expo.easeOut',
            repeat: 0,
            duration: 150,
            y: this.y + 10,
            yoyo: false,
            alpha: 0.5,
            onComplete: () => {
                this.sceneRef.CheckGameState();
            }
        });
    }

    CheckGameState() {
        if (!this.isPaused) {
            this.currPlayer.PausePlayerTimer();
            if (this.isSkipPressed) {
                this.skipPopup.animateSkipPopupToSkipButton();
                this.ShowTurn();
            }
            else {
                this.currDiceNum = null;
                this.currDiceNum = parseInt(this.pressedDice.frame.name);
                this.MovePawn();
            }
        }
    }

    CheckSkipBalance() {
        if (!this.turn && this.skipLife > 0) {
            this.ProcessSkip();
        }

        if (this.skipLife <= 0) {
            this.HandleSkipDepletion();
            return;
        }

        this.CheckAndCallTurn();
    }

    ProcessSkip() {
        this.skipLife--;

        if (!this.isSkipPressed && Constant.skipClickCount > 0) {
            Constant.skipClickCount--;
            this.skipClickCountTxt.setText(Constant.skipClickCount);
        } else {
            this.skipPopup.animateSkipPopupToSkipButton();
        }
    }

    HandleSkipDepletion() {
        this.playerScore = 0;

        const currentPlayer = this.playerArr[this.turn];
        if (currentPlayer) currentPlayer.score = 0;

        this.playerScoreTxt.setText(0);
        this.DeclareWinner(0);
    }

    ShowTurn() {
        this.currPlayer?.stopAlarmAnimation();
        this.hasCheckedTurn = null;
        this.isSkipPressed = null;
        this.MakeSkipBtnInactive();
        this.SwitchTurn();
    }

    SwitchTurn() {
        this.rulesTxt.clearTint();
        this.rulesTxt.setInteractive({ useHandCursor: true });
        if (this.turn === 0 && this.botTurnChainArr.length > 0) {
            this.turn = 1;
            this.lastTurn = 0;
        } else if (this.turnCounts < 23) {
            this.turn = 0;
            this.lastTurn = 1;
        } else {
            this.turn = -1;
            this.lastTurn = -1;
            setTimeout(() => {
                this.DeclareWinner(0);
            }, 50);
        }

        if (this.turn !== -1) {
            this.currPlayer?.removeTurnNotif();
            this.GetPawn();
        }
    }

    GetPawn() {
        this.currPlayer = this.playerArr[this.turn];
        this.lastPlayer = this.playerArr[this.lastTurn];
        this.playerPawn = this.currPlayer.pawn;
        this.playerScore = this.currPlayer.score;
        this.playerScoreTxt = this.currPlayer.scoreTxt;
        this.playerCastle = this.currPlayer.playerCastle;
        this.playerCastleDoor = this.currPlayer.castleDoor;
        this.playerName = this.currPlayer.playerGameName;
        this.playerPfp = this.currPlayer.pfp;
        this.playerFrame = this.currPlayer.pfpFrame;
        this.playerEmptyTimer = this.currPlayer.emptyTimer;

        this.lastPlayerName = this.lastPlayer.playerGameName;
        this.lastPlayerCastle = this.lastPlayer.playerCastle;
        this.lastPlayerCastleDoor = this.lastPlayer.castleDoor;
        this.lastPlayerScoreTxt = this.lastPlayer.scoreTxt;
        this.lastPlayerPfp = this.lastPlayer.pfp;
        this.lastPlayerFrame = this.lastPlayer.pfpFrame;
        this.lastPlayerTimer = this.lastPlayer.timer;
        this.lastPlayerEmptyTimer = this.lastPlayer.emptyTimer;

        this.ShowCurrentPlayerActive();
        this.ShowTurnPopup();
    }

    ShowCurrentPlayerActive() {
        this.playerCastle.clearTint();
        this.playerCastleDoor.clearTint();
        this.playerScoreTxt.clearTint();
        this.playerName.clearTint();
        this.playerPfp.clearTint();
        this.playerFrame.clearTint();
        this.playerEmptyTimer.setVisible(false);

        this.lastPlayerCastle.setTint(0x555555);
        this.lastPlayerCastleDoor.setTint(0x555555);
        this.lastPlayerScoreTxt.setTint(0x555555);
        this.lastPlayerName.setTint(0x555555);
        this.lastPlayerPfp.setTint(0x555555);
        this.lastPlayerFrame.setTint(0x555555);
        this.lastPlayerEmptyTimer.setVisible(true);
    }

    ShowTurnPopup() {
        this.AddShutterUpAnimation();
        this.turnPopup.showTurnPopup();
        this.turnPopup.turnNotifTxt.setText(this.currPlayer.turnText);
    }

    CheckTurn() {
        if (this.turn === 0) {
            this.MakePlayerBtnsActive();
            // this.StartTimer();
        }
        else {
            this.MakePlayerBtnsInactive();
            // this.AddShutterUpAnimation();
            this.GetBotDiceNum();
        }
        this.StartTimer();
    }

    MakeTurnChainActive() {
        if (this.turn !== 0) return;
        this.AddShutterDownAnimation();

        // setTimeout(() => {
        //     this.turnChainArr.forEach(element => {
        //         if (element.alpha >= 1)
        //             //     element.interactive = false;
        //             //     element.buttonMode = false;
        //             // }
        //             // else
        //             element.setInteractive({ useHandCursor: true });

        //     });
        // }, 250);

        if (this.currPlayer.timer.animationState.timeScale === 0) return;
        this.currPlayer.ShakePawn();

    }

    GetBotDiceNum() {
        if (this.getLvl === 1) {
            this.botTurnNum = Math.min(...this.botTurnChainArr);
            const index = this.botTurnChainArr.indexOf(this.botTurnNum);
            this.RemoveBotTurns(index);
            this.currDiceNum = parseInt(this.botTurnNum);

            setTimeout(() => {
                this.currPlayer?.PausePlayerTimer();
                this.ShowBotDiceNum();
            }, 2000);
        } else {
            this.sortedArrInd = 0;
            this.sortedArr = [...this.botTurnChainArr].sort((a, b) => b - a);
            this.TryBotDiceWithSnakeCheck();
        }
    }

    TryBotDiceWithSnakeCheck() {
        const pawnBlock = this.playerPawn?.currBlockNum || 0;
        let attemptInd = this.sortedArrInd;

        while (attemptInd < this.sortedArr.length) {
            const testDice = parseInt(this.sortedArr[attemptInd]);
            const testBoardBlock = testDice + pawnBlock;

            if (!testBoardBlock.hasSnakeHead || attemptInd >= 2) {
                this.sortedArrInd = (attemptInd >= 2) ? 0 : attemptInd;
                this.botTurnNum = this.sortedArr[this.sortedArrInd];
                const index = this.botTurnChainArr.indexOf(this.botTurnNum);
                this.RemoveBotTurns(index);
                this.currDiceNum = parseInt(this.botTurnNum);

                setTimeout(() => {
                    this.currPlayer?.PausePlayerTimer();
                    this.ShowBotDiceNum();
                }, 1500);

                return;
            }

            attemptInd++;
        }

        this.sortedArrInd = 0;
        this.botTurnNum = this.sortedArr[this.sortedArrInd];
        this.currDiceNum = parseInt(this.botTurnNum);

        setTimeout(() => {
            this.currPlayer?.PausePlayerTimer();
            this.ShowBotDiceNum();
        }, 1500);
    }

    RemoveBotTurns(index) {
        if (index !== -1) {
            const removed = this.botTurnChainArr.splice(index, 1);
            if (this.botTurnArr.length > 0) {
                this.botTurnChainArr.push(this.botTurnArr[0]);
                this.botTurnArr.shift();
            }
        }
    }

    ShowBotDiceNum() {
        this.turnPopup.animateBotDice();
    }

    MovePawn() {
        if (!this.playerPawn._visible) {
            this.playerPawn.setVisible(true);
        }

        this.tBoardBlockNum = this.currDiceNum + this.playerPawn.currBlockNum;
        this.currPlayer.stopAlarmAnimation();
        this.currPlayer.pawn.setScale(1);

        setTimeout(() => {
            if (!this.isPaused) {
                this.AnimatePawnMovement();
            } else {
                if (!Array.isArray(this.pausedMethods)) this.pausedMethods = [];
                if (!this.pausedMethods.includes(this.AnimatePawnMovement)) {
                    this.pausedMethods.push(this.AnimatePawnMovement);
                }
            }
        }, 100);
    }

    AnimatePawnMovement() {
        const currBlockNum = this.playerPawn?.currBlockNum;

        if (!this.gameContainer || currBlockNum == null) {
            console.warn("Invalid gameContainer or playerPawn.currBlockNum");
            return;
        }

        const currBlock = this.gameContainer.getByName(currBlockNum);
        if (currBlock?.hasPawn) currBlock.hasPawn = false;

        const nextBlockNum = currBlockNum + 1;
        const nextBlock = this.gameContainer.getByName(nextBlockNum);

        const pawn = this.lastPawn;
        if (pawn && pawn._scaleX !== 1) {
            pawn.setScale(1);
        }

        if (this.tBoardBlockNum <= 100) {
            this.currPlayer.PawnMoveAnimation(nextBlock, this.playerPawn);
        } else {
            setTimeout(() => this.ShowTurn(), 1000);
        }
    }

    OnCompletingPawnMovement() {
        let getBlock = null;
        getBlock = this.gameContainer.getByName(this.playerPawn.currBlockNum);

        if (getBlock.hasSnakeHead) {
            this.snake.SnakeEatsPawn(getBlock, this.playerPawn);
            return;
        }

        if (getBlock.hasLadderBottom) {
            this.ladder.PromotePawn(getBlock, this.playerPawn);
            return;
        }

        this.CheckAndCallTurn();
    }

    CheckAndCallTurn() {
        if (this.hasCheckedTurn) return;
        this.hasCheckedTurn = true;

        const currBlock = this.gameContainer.getByName(this.playerPawn.currBlockNum);
        const firstPawn = this.playerArr[0].pawn;
        const secondPawn = this.playerArr[1].pawn;
        const playerPawn = this.playerPawn;

        const firstPawnCurrBlock = firstPawn.currBlockNum;
        const secondPawnCurrBlock = secondPawn.currBlockNum;

        if (firstPawnCurrBlock === secondPawnCurrBlock && firstPawnCurrBlock)
            this.ShiftPawns();

        if (currBlock)
            currBlock.hasPawn = true;

        this.UpdateScore();
        this.currPlayer.stopAlarmAnimation();
        if (playerPawn.currBlockNum < 100) {
            setTimeout(() => {
                this.ShowTurn();
            }, 1000);
        }
        else {
            this.currPlayer.leapPawn();
            this.portal.showPortal();
            // this.DeclareWinner(1);
        }
        this.lastPawn = playerPawn;
    }

    ShiftPawns() {
        this.playerPawn.setScale(0.7);
        this.playerPawn.x += 20;
        // if (this.lastPawn) 
        this.lastPawn.setScale(0.7);
        this.lastPawn.x -= 20;
        // }
    }

    UpdateScore() {
        this.playerScore = this.playerPawn.currBlockNum;
        this.playerArr[this.turn].score = this.playerScore;
        this.playerScoreTxt.setText(this.playerScore);
    }

    UpdateGemsCount() {
        Constant.gemsCollCount++;
        this.gemsCollTxt.setText(Constant.gemsCollCount);
    }

    DeclareWinner(_winCondi) {
        AudioManager.StopLevelMusic();
        this.currPlayer.stopAlarmAnimation();
        this.ShowAd();
        if (_winCondi === 0) {
            if (this.playerArr[0].score > this.playerArr[1].score)
                this.gameoverPopup.ShowWinPopup();
            else
                this.gameoverPopup.ShowLosePopup();
        }
        else {
            if (this.turn === 0)
                this.gameoverPopup.ShowWinPopup();
            else
                this.gameoverPopup.ShowLosePopup();
        }
    }

    AddPopups() {
        this.rulesPopup = new Rules(this);
        this.skipPopup = new SkipPopup(this);
        this.turnPopup = new TurnPopup(this);
        this.quitPopup = new QuitPopup(this);
        this.gameoverPopup = new GameoverPopup(this);
        if (Constant.canShowRules) {
            this.events.emit('game_paused');
            this.rulesPopup.ShowRules();
        }
        else this.ShowTurn();
    }

    RestartGameScene() {
        this.scene.stop('GameScene');
        this.scene.restart('GameScene');
    }

    resize(_newWidth, _newHeight, offsetWidth) {
        if (Constant.currentScene !== 'GameScene') {
            return;
        }

        this.newScale = Utils.GetScale(1080, 1920, _newWidth, _newHeight);
        Constant.newScale = this.newScale;
        Constant.clientWidth = _newWidth;
        Constant.clientHeight = _newHeight;

        this.bg.setDisplaySize(_newWidth, _newHeight);
        this.bg.setPosition(
            _newWidth / 2,
            _newHeight / 2
        );

        this.gameContainer.setScale(this.newScale);
        this.gameContainer.setPosition(_newWidth / 2,
            _newHeight / 2);

        this.snakeContainer.setScale(this.newScale);
        this.snakeContainer.setPosition(_newWidth / 2,
            _newHeight / 2);

        this.ladderContainer.setScale(this.newScale);
        this.ladderContainer.setPosition(_newWidth / 2,
            _newHeight / 2);

        this.playerArr.forEach(element => {
            element.ResizePlayerContainers(_newWidth, _newHeight, this.newScale);
        });

        this.bottomUIContainer.setScale(this.newScale);
        this.bottomUIContainer.setPosition(_newWidth / 2,
            _newHeight / 2);

        this.infoBtnContainer.setScale(this.newScale);
        this.infoBtnContainer.setPosition(_newWidth / 2,
            _newHeight / 2);

        this.txtRulesContainer.setScale(this.newScale);
        this.txtRulesContainer.setPosition(_newWidth / 2,
            _newHeight / 1 - (80 * this.newScale));

        Constant.rulesButPosX = this.txtRulesContainer.x;
        Constant.rulesButPosY = this.txtRulesContainer.y;

        this.skipBtnContainer.setScale(this.newScale);
        this.skipBtnContainer.setPosition(_newWidth / 2,
            _newHeight / 2);

        Constant.skipButPosX = this.skipBtnContainer.x;
        Constant.skipButPosY = this.skipBtnContainer.y;

        this.shutterContainer.setScale(this.newScale);
        this.shutterContainer.setPosition(_newWidth / 2,
            _newHeight / 2);

        this.turnChainContainer.setScale(this.newScale);
        this.turnChainContainer.setPosition(_newWidth / 2,
            _newHeight / 2);

        this.turnCoverContainer.setScale(this.newScale);
        this.turnCoverContainer.setPosition(_newWidth / 2,
            _newHeight / 2);


        this.portal.resizePortal(_newWidth, _newHeight, this.newScale);

        // this.topGemsBaseContainer.setScale(this.newScale);
        // this.topGemsBaseContainer.setPosition(_newWidth / 2,
        //     105 * this.newScale);

        this.topBackBtnContainer.setScale(this.newScale);
        this.topBackBtnContainer.setPosition(0 + (105 * this.newScale),
            105 * this.newScale);
        Constant.backButPosX = this.topBackBtnContainer.x;
        Constant.backButPosY = this.topBackBtnContainer.y;

        this.topSoundContainer.setScale(this.newScale);
        this.topSoundContainer.setPosition(_newWidth - (105 * this.newScale),
            105 * this.newScale);

        this.playerContainer.setScale(this.newScale);
        this.playerContainer.setPosition(_newWidth / 2, _newHeight / 2
        );

        Constant.rulesButPosX = this.txtRulesContainer.x;
        Constant.rulesButPosY = this.txtRulesContainer.y;
        this.rulesPopup.ResizeRulePopup(_newWidth, _newHeight, this.newScale);
        this.skipPopup.resizeSkipPopup(_newWidth, _newHeight, this.newScale);
        this.turnPopup.resizeTurnPopup(_newWidth, _newHeight, this.newScale);
        this.gameoverPopup.ResizeGameOverPopupContainer(_newWidth, _newHeight, this.newScale);
        this.quitPopup.ResizeQuitPopupContainer(_newWidth, _newHeight, this.newScale);

        const camera = this.cameras.main;
        camera.x = offsetWidth;
        camera.setViewport(offsetWidth, 0, _newWidth, _newHeight);

    };

}