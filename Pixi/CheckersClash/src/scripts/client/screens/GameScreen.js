/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 05-05-2025.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 12-05-2025
 * @Description :- Control the full gameplay.
 ************************************/

import { Constant } from "../Constant.js";
import * as PIXI from 'pixi.js';
import { CheckersGame } from "../game_mechanics/GameLogic.js";
import { Assets, Sprite, Texture, Container, Text, TextStyle } from 'pixi.js';
import ButtonTween from "../game_objects/ButtonTween.js";
import Player from "../game_objects/Player.js";
import gsap from "gsap";
import { AudioManager } from "../media/Audiomanager.js";
import GameoverPopup from "../popups/GameoverPopup.js";
import Ripple from "../game_objects/Ripple.js";
import { Emoji } from "../game_objects/Emoji.js";
import { Camera } from "pixi-game-camera";
// NEW: import GameAI
import { GameAI } from "../game_mechanics/GameAI.js";
import MatchMakingPopup from "../popups/MatchMakingPopup.js";
import { GameBg } from "../game_objects/GameBg.js";
import { PlayzhubEventHandler } from "../PlayzhubEventHandler.js";
import { QuitPopup } from "../popups/QuitPopup.js";
import NotifyTurnPopup from "../popups/NotifyTurnPopup.js";
import TimeoverPopup from "../popups/TimeoverPopup.js";
import { GameAnalytics } from "gameanalytics";

export default class GameScreen {
    constructor() {
        Constant.currentScreen = 'GameScreen';
        // this.bg = bg;
        this.gameContainer = null;
        this.gameTileArr = [];
        this.playerData = null;
        this.playerArr = [];
        this.turn = null;
        this.lastTurn = null;
        this.row = null;
        this.lastTile = null;
        this.nextTopTile = null;
        this.clickedPawn = null;
        this.needsSafeGuard = null;
        this.clickedPawnBool = true;
        this.isMoveInProgress = false;
        this.lastPawnMoved = null;
        this.beKingPoss = false;
        this.p = 0;
        this.pawnOnMove = false;
        this.botEmoji = ['angry', 'evil', 'injured', 'sick2', 'sick3'];
        this.userEmoji = ['cool', 'cute', 'happy', 'laugh', 'starstruck'];
        Constant.lifetimeScore = 0;
        Constant.hintLeft = 3;
        this.winScore = null;
        this.isPaused = false;
        this.pendingFunctions = [];
        this.possHintMovesArr = [];
        console.log("currBotLvl", Constant.currBotLvl);
        this.depthSearch = {
            1: 3,
            2: 5,
            3: 7
        };

        // <-- instantiate GameAI for bot moves -->
        // bot is player 1 (turn === 1). depth 4 is a good start (tweakable)
        this.gameAI = new GameAI(1, this.depthSearch[Constant.currBotLvl]);

        // ... rest of game setup remains the same ...
        // this.ShowMatchMakingPopup();
        const options = {
            ticker: Constant.game.app.ticker
        };
        this.camera = new Camera(options);
        this.RegisterGameEvents();
        this.ShowModeBg();
        this.CreateBoard();
        this.CreateBoardGrid();
        // this.CreateAdButton();
        // this.CreatePlayer();
        this.CreateGameUI();
        this.CreateAllPopups();
        // this.CheckTurn();
        Constant.game.addListener('resize', this.OnResize.bind(this));
        PlayzhubEventHandler.AdStarted(this.OnStartingAd.bind(this));
        PlayzhubEventHandler.AdCompleted(this.OnAdCompleted.bind(this));
        GameBg.resize();
        QuitPopup.resize();
        this.OnResize();

        GameAnalytics.addProgressionEvent(
            "Start",
            "checkers_go_endless"
        );
    }

    executeOrQueue(fn) {
        if (this.isPaused) {
            this.pendingFunctions.push(fn);
            console.log("Function queued. Total pending:", this.pendingFunctions.length);
        } else {
            fn();
        }
    }

    processPendingFunctions() {
        if (this.isPaused) {
            console.warn("Cannot process - still paused");
            return;
        }

        console.log("Processing", this.pendingFunctions.length, "pending functions");

        while (this.pendingFunctions.length > 0) {
            const fn = this.pendingFunctions.shift();
            fn();
        }
    }

    ShowAD() {
        GameAnalytics.addDesignEvent('ad:requested');
        PlayzhubEventHandler.RequestAD();
    }

    OnStartingAd() {
        console.log("ad started");
        GameAnalytics.addDesignEvent("ad:started");
        AudioManager.PauseAll();
        Constant.game.app.ticker.stop();
    }

    OnAdCompleted() {
        Constant.game.app.ticker.start();
        GameAnalytics.addDesignEvent("ad:completed");
        AudioManager.ResumeAll();
        console.log("ad completed");
    }

    RegisterGameEvents() {
        Constant.game.addListener('gamepaused', this.GamePaused.bind(this));
        Constant.game.addListener('gameresumed', this.GameResumed.bind(this));
        Constant.game.addListener('gameover', this.GameOver.bind(this));
    }

    GamePaused() {
        this.isPaused = true;
        if (this.timer)
            this.timer.pause();
        if (this.pawnMoveAnim)
            this.pawnMoveAnim.pause();
    }

    GameResumed() {
        this.isPaused = false;
        if (this.timer)
            this.timer.resume();
        if (this.pawnMoveAnim)
            this.pawnMoveAnim.resume();
        this.processPendingFunctions();
    }

    ShowModeBg() {
        console.log("bg", Constant.gameType.toString());

        // GameBg.getSprite().visible = true;
        GameBg.changeTexture('mode_' + Constant.gameType.toString());
        // Constant.game.app.stage.addChild(GameBg.getSprite());
    }

    CreateBoard() {
        this.playerData = Assets.get('player_data');
        const gameData = Assets.get('game_data');
        Constant.gameAtlas = gameData;

        this.gameContainer = new Container();
        Constant.game.app.stage.addChild(this.gameContainer);

        this.board = Sprite.from('board');
        this.board.anchor.set(0.5);
        this.board.visible = true;
        // this.board.y = 30;
        this.gameContainer.addChild(this.board);

        // Turn Switch Button
        // this.playBtn = Sprite.from('playBtn');
        // this.playBtn.anchor.set(0.5);
        // this.playBtn.eventMode = 'static';
        // this.playBtn.cursor = 'pointer';
        // this.playBtn.y += 900;

        // this.gameContainer.addChild(this.playBtn);

        // this.playBtn.on('pointerup', this.OnClickingPlayBtn, this);

        this.moveTileMarkerContainer = new Container();
        Constant.game.app.stage.addChild(this.moveTileMarkerContainer);
    }

    OnClickingPlayBtn() {
        this.ClearAllAndSwitchTurn();
    }

    CreateBoardGrid() {
        // console.log("Constant.gameType", Constant.gameType, this.playerData[Constant.gameType][0]);
        this.row = this.playerData[Constant.gameType].rows;
        this.lastTile = this.playerData[Constant.gameType].lasttile;
        let tileConfig = this.playerData[Constant.gameType].tilesize;

        const tileSize = tileConfig; // Fixed tile size (adjust to your actual tile size)
        const boardStartX = this.board.x - this.board.width / 2 + tileSize / 2;
        const boardStartY = this.board.y + this.board.height / 2 - tileSize / 2;

        for (let row = 0; row < this.row; row++) {
            for (let col = 0; col < this.row; col++) {
                const isBlack = (row + col) % 2 === 0;
                const texture = isBlack
                    ? Constant.gameType.toString() + '_dark'
                    : Constant.gameType.toString() + '_light';

                if (isBlack) this.textureKey = Constant.gameType.toString() + '_dark';
                else this.textureKey = Constant.gameType.toString() + '_light';
                const tile = Sprite.from(texture);
                tile.width = tileConfig;
                tile.height = tileConfig;
                tile.anchor.set(0.5);
                tile.num = row * this.row + col;
                tile.isTakenBy = false;
                tile.isHomeTo = null;
                tile.lastTexture = this.textureKey;

                // console.log("tile label", tile.label);
                // tile.eventMode = 'static';
                // tile.cursor = 'pointer';
                // tile.on('pointerup', this.OnClicking, tile);

                tile.x = boardStartX + col * tileSize;
                tile.y = boardStartY - row * tileSize;

                this.gameContainer.addChild(tile);
                this.gameTileArr.push(tile);
            }
        }
        // console.log("game Tile Arr", this.gameTileArr);

    }

    CreateAdButton() {
        this.adButton = Sprite.from('multiplier_base');
        this.adButton.position.set(0, 850);
        this.adButton.anchor.set(0.5);
        this.adButton.eventMode = 'static';
        this.adButton.cursor = 'pointer';

        const adIcon = Sprite.from('ad_icon');
        adIcon.position.set(this.adButton.x, this.adButton.y);
        adIcon.anchor.set(0.5);

        this.adButton.on('pointerdown', this.OnClickingAdBtn, this);

        this.gameContainer.addChild(this.adButton);
        this.gameContainer.addChild(adIcon);
    }

    OnClickingAdBtn() {
        const btnTween = new ButtonTween(this, this.adButton);

        // Load ad content and show it
        this.simulateAdApi().then(adHTML => {
            this.showAd(adHTML);
        });

    }

    CreatePlayer() {
        // this.childToRemoveContainer = new Container();
        // this.gameContainer.addChild(this.childToRemoveContainer);
        // Constant.game.app.stage.addChild(this.childToRemoveContainer);
        // console.log("child", this.childToRemoveContainer);
        const playerData = this.playerData[Constant.gameType];
        const pawnWidth = this.playerData[Constant.gameType].pawnwidth;
        const pawnHeight = this.playerData[Constant.gameType].pawnheight;
        this.winScore = playerData[0].pawn_tiles.length;
        for (let i = 0; i < 2; i++) {
            this.player = new Player(this, playerData[i], i, pawnWidth, pawnHeight);
            this.playerArr.push(this.player);
            this.gameContainer.addChild(this.player.playerContainer);
            this.gameContainer.addChild(this.player.playerShadowContainer);
            this.gameContainer.addChild(this.player.childToRemoveContainer);
            this.gameContainer.addChild(this.player.playerPawnContainer);
        }

        console.log("gamecontainer", this.player.playerPawnContainer);


        // console.log("player arr", this.playerArr);


        const emoji = Emoji.getSprite();
        this.gameContainer.addChild(emoji);
    }

    CreateGameUI() {
        //Create Containers
        this.topPanelContainer = new Container();
        this.bottomPanelContainer = new Container();
        Constant.game.app.stage.addChild(this.topPanelContainer);
        Constant.game.app.stage.addChild(this.bottomPanelContainer);
        this.CreateTopPanel();
        this.CreateBottomPanel();
    }

    CreateTopPanel() {
        //Timer
        const timerBase = Sprite.from('time');
        timerBase.anchor.set(0.5);
        timerBase.position.set(-165, 110);

        let topPanelFontStyle = new TextStyle({
            fontFamily: 'Fredoka Regular',
            fontSize: 35,
            fill: '#e0b176',
            stroke: {
                color: '#7d3c1f',
                width: 4
            },
            wordWrap: true,
            wordWrapWidth: 800,
        });
        this.timerTxt = new Text({
            text: '10:00',
            style: topPanelFontStyle
        });
        this.timerTxt.anchor.set(0.5);
        this.timerTxt.position.set(timerBase.x + 30, timerBase.y + 10);

        //Lifetime Score
        const lifetimeScoreBase = Sprite.from('Score');
        lifetimeScoreBase.anchor.set(0.5);
        lifetimeScoreBase.position.set(timerBase.x + 305, timerBase.y + 15);

        this.lifetimeScoreTxt = new Text({
            text: Constant.lifetimeScore,
            style: topPanelFontStyle
        });
        this.lifetimeScoreTxt.anchor.set(0.5);
        this.lifetimeScoreTxt.position.set(lifetimeScoreBase.x + 20, lifetimeScoreBase.y);

        //Sound Btn
        this.soundBtn = Sprite.from('Music_on');
        this.soundBtn.eventMode = 'static';
        this.soundBtn.cursor = 'pointer';
        this.soundBtn.anchor.set(0.5);
        this.soundBtn.position.set(lifetimeScoreBase.x + 300, lifetimeScoreBase.y);

        //Back Btn
        this.backBtn = Sprite.from('Back button');
        this.backBtn.eventMode = 'static';
        this.backBtn.cursor = 'pointer';
        this.backBtn.anchor.set(0.5);
        this.backBtn.position.set(timerBase.x - 275, this.soundBtn.y);


        this.topPanelContainer.addChild(timerBase, this.timerTxt, lifetimeScoreBase, this.lifetimeScoreTxt, this.soundBtn, this.backBtn);

        this.soundBtn.on('pointerup', this.OnClickingSoundBtn, this);
        this.backBtn.on('pointerup', this.OnClickingBackBtn, this);
    }

    CreateBottomPanel() {
        //Level Reload
        this.levelReloadBtn = Sprite.from('Replay Button');
        this.levelReloadBtn.eventMode = 'static';
        this.levelReloadBtn.cursor = 'pointer';
        this.levelReloadBtn.anchor.set(0.5);
        this.levelReloadBtn.position.set(445, -120);

        //Hint Btn
        this.hintBtn = Sprite.from('Hint');
        this.hintBtn.eventMode = 'static';
        this.hintBtn.cursor = 'pointer';
        this.hintBtn.anchor.set(0.5);
        this.hintBtn.position.set(-445, this.levelReloadBtn.y);

        const hintCounterBase = Sprite.from('hint_base');
        hintCounterBase.anchor.set(0.5);
        hintCounterBase.position.set(this.hintBtn.x + 25, this.hintBtn.y + 40);

        this.adIcon = Sprite.from('ad_icon');
        this.adIcon.anchor.set(0.5);
        this.adIcon.width = hintCounterBase.width - 25;
        this.adIcon.height = hintCounterBase.height - 25;
        this.adIcon.visible = false;
        this.adIcon.position.set(hintCounterBase.x, hintCounterBase.y - 2);

        let bottomPanelFontStyle = new TextStyle({
            fontFamily: 'Fredoka Medium',
            fontSize: 32.5,
            fontWeight: 'bold',
            fill: '#703d0b',
            wordWrap: true,
            wordWrapWidth: 800,
        });

        this.hintCountTxt = new Text({
            text: Constant.hintLeft,
            style: bottomPanelFontStyle
        });
        this.hintCountTxt.anchor.set(0.5);
        this.hintCountTxt.position.set(hintCounterBase.x, hintCounterBase.y - 2.5);

        this.bottomPanelContainer.addChild(this.levelReloadBtn, this.hintBtn, hintCounterBase, this.adIcon, this.hintCountTxt);

        this.levelReloadBtn.on('pointerup', this.OnClickingReloadBtn, this);
        this.hintBtn.on('pointerup', this.OnClickingHintBtn, this);
    }

    OnClickingSoundBtn() {
        GameAnalytics.addDesignEvent('ui:sound_clicked');
        AudioManager.PlayBtnPressedSFX();
        new ButtonTween(this, this.soundBtn, null, 0.85, 0.85);
        if (this.soundBtn.texture === Texture.from('Music_on')) {
            this.soundBtn.texture = Texture.from('Music_off');
            AudioManager.PauseAll();
        }
        else {
            this.soundBtn.texture = Texture.from('Music_on');
            AudioManager.ResumeAll();
        }
    }

    OnClickingBackBtn() {
        GameAnalytics.addDesignEvent('ui:back_clicked');
        const instance = QuitPopup.getInstance();
        AudioManager.PlayBtnPressedSFX();
        new ButtonTween(this, this.backBtn, null, 0.85, 0.85, QuitPopup.showQuitPopup.bind(instance));
        Constant.game.emit('gamepaused');
        setTimeout(() => {
            this.ShowAD();
        }, 200);
        // console.log("Back button pressed");
    }

    OnClickingReloadBtn() {
        GameAnalytics.addDesignEvent('ui:reload_clicked');
        AudioManager.PlayBtnPressedSFX();
        new ButtonTween(this, this.levelReloadBtn, null, 0.85, 0.85);
    }

    OnClickingHintBtn() {
        GameAnalytics.addDesignEvent('ui:hint_powerup_clicked');
        AudioManager.PlayBtnPressedSFX();
        if (Constant.hintLeft > 1) {
            new ButtonTween(this, this.hintBtn, null, 0.85, 0.85);
            Constant.hintLeft--;
            this.hintCountTxt.text = Constant.hintLeft;
            this.hintBtn.eventMode = 'none';
        }
        else if (!this.adIcon.visible) {
            this.hintCountTxt.visible = false;
            this.adIcon.visible = true;
        }
        setTimeout(() => {
            this.ShowPossibleMovesOfRandomPawn();
        }, 100);
    }

    ShowPossibleMovesOfRandomPawn() {
        const randomIndex = Math.floor(Math.random() * this.tempCollectArr.length);
        const randomObject = this.tempCollectArr[randomIndex];

        this.clickedPawn = randomObject;
        this.OnClickingPawn();

    }

    StartTimer() {
        this.remainingSeconds = 600; // 10 mins
        this.isPaused = false;
        // Named function for ticker callback
        this.timerTick = () => {
            console.log();

            if (this.isPaused) return;
            if (this.remainingSeconds > 0) {
                this.remainingSeconds -= Constant.game.app.ticker.elapsedMS / 1000;
                if (this.remainingSeconds < 0) this.remainingSeconds = 0;

                const mins = Math.floor(this.remainingSeconds / 60);
                const secs = Math.floor(this.remainingSeconds % 60);
                this.timerTxt.text = mins.toString().padStart(2, '0') + ':' + secs.toString().padStart(2, '0');
            } else {
                // Remove the ticker callback to stop the timer
                Constant.game.app.ticker.remove(this.timerTick);
                this.ShowTimeOverPopup();

            }
        };

        Constant.game.app.ticker.add(this.timerTick);
    }


    CreateAllPopups() {
        this.turnPopup = new NotifyTurnPopup(this);
        this.gameoverPopup = new GameoverPopup(this);
        this.mmPopup = new MatchMakingPopup(this, this.ShowPlayerandCheckTurn.bind(this));
        this.quitOverlay = QuitPopup.getOverlay();
        this.quitPopupContainer = QuitPopup.getPopupContainer();
        Constant.game.app.stage.addChild(this.quitOverlay);
        Constant.game.app.stage.addChild(this.quitPopupContainer);
        this.timeOverPopup = new TimeoverPopup(this);
    }

    NotifyFirstTurn() {
        this.turnPopup.showTurnPopup();

        setTimeout(() => {
            this.turnPopup.hideTurnPopup();
            this.turnPopup.destroyTurnPopup();
            this.CheckTurn();
            this.StartTimer();
        }, 1500);
    }

    CheckTurn() {
        this.hasSwitchedTurn = false;
        this.pawnOnMove = false;
        this.RemoveInteraction();
        if (this.turn === null) {
            this.turn = 0;
            this.lastTurn = 1;
        }

        else {
            this.SwitchTurn();
        }
        // console.log("turn", this.turn);
        this.GetPlayer();
        this.ShowTurn();
    }

    ShowPlayerandCheckTurn() {
        this.CreatePlayer();
        AudioManager.PlayBGM();
        setTimeout(() => {
            this.NotifyFirstTurn();
        }, 100);
    }

    RemoveInteraction() {
        this.playerArr[0].playerPawnContainer.children.forEach(element => {
            element.eventMode = 'none';
            element.alpha = 1;
        });

        this.gameTileArr.forEach((element, index) => {
            element.texture = Texture.from(element.lastTexture);
            element.eventMode = 'none';

        });

        this.moveTileMarkerContainer.removeChildren().forEach(child => child.destroy({ children: true }));
        this.markPossMoveTileArr = [];
        this.needsSafeGuard = false;
        this.lastPawnCheckedNum = null;
    }

    SwitchTurn() {
        this.clickedPawn = null;
        switch (this.turn) {
            case 0: this.lastTurn = this.turn;
                this.turn = 1;
                break;

            default: this.lastTurn = this.turn;
                this.turn = 0;
                break;
        }

        console.warn("CHECK TURN", this.turn);

    }

    ShowTurn() {
        this.currPlayer = this.playerArr[this.turn];
        this.currPlayer.startDisappear(15, this.ClearAllAndSwitchTurn.bind(this));
        this.timer = this.currPlayer.timerAnim;
        // this.playerArr[this.turn].startDisappear(55, null);
    }

    GetPlayer() {
        if (this.turn === 0) {
            this.firstEdgeAddends = this.row;
            this.secondEdgeAddends = 1;
            this.povRow = this.row;
            this.firstEdgeShift = 1;
            this.secondEdgeShift = -1;
            // this.ActivatePawns();
        }
        else {
            // console.warn("I'm the bot");

            this.firstEdgeAddends = 1;
            this.secondEdgeAddends = -this.row;
            this.povRow = -this.row;
            this.firstEdgeShift = -1;
            this.secondEdgeShift = 1;
            // this.AutomateMove();
        }
        this.ActivatePawns();
    }

    ActivatePawns() {
        this.tempCollectArr = [];
        // let triggeringPawn = null;

        for (const element of this.playerArr[this.turn].playerPawnContainer.children) {
            element.needsSafeGuard = false;
            element.blockedAt = 0;
            element.tempTileArr = [];
            element.tempValArr = [];
            element.canJump = false;
            element.canKillAt = {};
            element.canLeapTo = {};
            element.canLeapVal = {};
            element.canMoveVal = {};
            element.canMoveTo = {};

            if ((element.currBlockNum + this.firstEdgeAddends) % this.row === 0) {
                this.FirstEdgeCheck(element);
            } else if ((element.currBlockNum + this.secondEdgeAddends) % this.row === 0) {
                this.SecondEdgeCheck(element);
            } else {
                this.CheckOthers(element);
            }
        }

        if (this.playerArr[this.turn].playerPawnContainer.children.length === this.tempCollectArr.length) {
            // console.log("✅ All elements have been checked.", this.tempCollectArr);
            this.ValidateAndPushPawns();
            // this.AfterAllChecksDone?.(); // Optional callback
        }
    }

    FirstEdgeCheck(_elem) {
        // console.log("here at first");
        let nxtTileOne, nxtTileTwo, tileOne, tileTwo, valOne, valTwo, pawn = null;
        // let tempTileArr = [];
        // let tempValArr = [];
        pawn = _elem;
        pawn.isAtEdge = true;
        this.tempCollectArr.push(pawn);
        if (!pawn.isKing) {
            nxtTileOne = pawn.currBlockNum + this.povRow + this.firstEdgeShift;
            tileOne = this.gameTileArr[nxtTileOne];
            valOne = (this.povRow + this.firstEdgeShift);
            // tempTileArr.push(tileOne);
            // tempValArr.push(valOne);
            pawn.tempTileArr.push(tileOne);
            pawn.tempValArr.push(valOne);
        }
        else {
            let povRowOne = this.povRow;
            let povRowTwo = -this.povRow;
            nxtTileOne = pawn.currBlockNum + povRowOne + this.firstEdgeShift;
            let tileValidity = this.CheckTileValidity(nxtTileOne);
            if (tileValidity !== null) {
                tileOne = this.gameTileArr[tileValidity];
                valOne = (povRowOne + this.firstEdgeShift);
                // tempTileArr.push(tileOne);
                // tempValArr.push(valOne);
                pawn.tempTileArr.push(tileOne);
                pawn.tempValArr.push(valOne);
            }

            nxtTileTwo = pawn.currBlockNum + povRowTwo + this.firstEdgeShift;
            tileValidity = this.CheckTileValidity(nxtTileTwo);
            if (tileValidity !== null) {
                tileTwo = this.gameTileArr[tileValidity];
                valTwo = (povRowTwo + this.firstEdgeShift);
                // tempTileArr.push(tileTwo);
                // tempValArr.push(valTwo);
                pawn.tempTileArr.push(tileTwo);
                pawn.tempValArr.push(valTwo);
            }
        }
    }

    SecondEdgeCheck(_elem) {
        // console.log("here at second");
        let nxtTileOne, nxtTileTwo, tileOne, tileTwo, valOne, valTwo, pawn = null;
        // let tempTileArr = [];
        // let tempValArr = [];
        pawn = _elem;
        pawn.isAtEdge = true;
        this.tempCollectArr.push(pawn);
        if (!pawn.isKing) {
            nxtTileOne = pawn.currBlockNum + this.povRow + this.secondEdgeShift;
            tileOne = this.gameTileArr[nxtTileOne];
            valOne = (this.povRow + this.secondEdgeShift);
            // tempTileArr.push(tileOne);
            // tempValArr.push(valOne);
            pawn.tempTileArr.push(tileOne);
            pawn.tempValArr.push(valOne);
        }
        else {
            let povRowOne = this.povRow;
            let povRowTwo = -this.povRow;
            nxtTileOne = pawn.currBlockNum + povRowOne + this.secondEdgeShift;
            let tileValidity = this.CheckTileValidity(nxtTileOne);
            if (tileValidity !== null) {
                tileOne = this.gameTileArr[tileValidity];
                valOne = (povRowOne + this.secondEdgeShift);
                // tempTileArr.push(tileOne);
                // tempValArr.push(valOne);
                pawn.tempTileArr.push(tileOne);
                pawn.tempValArr.push(valOne);
            }

            nxtTileTwo = pawn.currBlockNum + povRowTwo + this.secondEdgeShift;
            tileValidity = this.CheckTileValidity(nxtTileTwo);
            if (tileValidity !== null) {
                tileTwo = this.gameTileArr[tileValidity];
                valTwo = (povRowTwo + this.secondEdgeShift);
                // tempTileArr.push(tileTwo);
                // tempValArr.push(valTwo);
                pawn.tempTileArr.push(tileTwo);
                pawn.tempValArr.push(valTwo);
            }
        }
    }

    CheckOthers(_elem) {
        // console.log("here at other");

        let nxtTileOne, nxtTileTwo, nxtTileThree, nxtTileFour, tileOne, tileTwo, tileThree, tileFour, valOne, valTwo, valThree, valFour, pawn = null;
        // let tempTileArr = [];
        // let tempValArr = [];
        pawn = _elem;
        pawn.isAtEdge = false;
        this.tempCollectArr.push(pawn);
        if (!pawn.isKing) {
            nxtTileOne = pawn.currBlockNum + this.povRow - 1;
            nxtTileTwo = pawn.currBlockNum + this.povRow + 1;
            tileOne = this.gameTileArr[nxtTileOne];
            valOne = (this.povRow - 1);
            tileTwo = this.gameTileArr[nxtTileTwo];
            valTwo = (this.povRow + 1);

            // tempTileArr.push(tileOne, tileTwo);
            // tempValArr.push(valOne, valTwo);
            pawn.tempTileArr.push(tileOne, tileTwo);
            pawn.tempValArr.push(valOne, valTwo);
        }
        else {
            let povRowOne = this.povRow;
            let povRowTwo = -this.povRow;
            nxtTileOne = pawn.currBlockNum + povRowOne + 1;
            let tileValidity = this.CheckTileValidity(nxtTileOne);
            if (tileValidity !== null) {
                tileOne = this.gameTileArr[tileValidity];
                valOne = (povRowOne + 1);
                // tempTileArr.push(tileOne);
                // tempValArr.push(valOne);
                pawn.tempTileArr.push(tileOne);
                pawn.tempValArr.push(valOne);
            }
            nxtTileTwo = pawn.currBlockNum + povRowOne - 1;
            tileValidity = this.CheckTileValidity(nxtTileTwo);
            if (tileValidity !== null) {
                tileTwo = this.gameTileArr[tileValidity];
                valTwo = (povRowOne - 1);
                // tempTileArr.push(tileTwo);
                // tempValArr.push(valTwo);
                pawn.tempTileArr.push(tileTwo);
                pawn.tempValArr.push(valTwo);
            }
            nxtTileThree = pawn.currBlockNum + povRowTwo + 1;
            tileValidity = this.CheckTileValidity(nxtTileThree);
            if (tileValidity !== null) {
                tileThree = this.gameTileArr[tileValidity];
                valThree = (povRowTwo + 1);
                // tempTileArr.push(tileThree);
                // tempValArr.push(valThree);
                pawn.tempTileArr.push(tileThree);
                pawn.tempValArr.push(valThree);
            }
            nxtTileFour = pawn.currBlockNum + povRowTwo - 1;
            tileValidity = this.CheckTileValidity(nxtTileFour);
            if (tileValidity !== null) {
                tileFour = this.gameTileArr[tileValidity];
                valFour = (povRowTwo - 1);
                // tempTileArr.push(tileFour);
                // tempValArr.push(valFour);
                pawn.tempTileArr.push(tileFour);
                pawn.tempValArr.push(valFour);
            }

        }
    }

    ValidateAndPushPawns() {
        // console.log("Validate and Push Pawns", this.tempCollectArr, this.playerArr[this.turn].playerPawnContainer.children.length, this.tempCollectArr.length);

        let pawn = this.tempCollectArr[this.p];
        pawn.canMoveVal = {};
        pawn.canMoveTo = {};
        pawn.canLeapTo = {};
        pawn.canKillAt = {};
        pawn.canLeapVal = {};

        for (let i = 0; i < pawn.tempTileArr.length; i++) {
            if (pawn.tempTileArr[i].isTakenBy === this.turn) {
                // console.log("pawn is blocked since taken by same turn");

                pawn.blockedAt++;
            }
            else if (pawn.tempTileArr[i].isTakenBy === this.lastTurn) {
                if (pawn.tempTileArr[i].isHomeTo !== this.lastTurn) {
                    let edgeCheck = this.EdgeCheck(pawn.tempTileArr[i].num)
                    if (edgeCheck) {

                        // console.log("edge check true", pawn.tempTileArr[i].num);

                        pawn.blockedAt++;
                    }
                    else {
                        let checkNextTile = this.CheckNextTile(pawn.tempTileArr[i], pawn.tempValArr[i]);
                        // console.log("check if next tile exists", checkNextTile);
                        if (checkNextTile) {
                            pawn.alpha = 1;
                            pawn.canJump = true;
                            pawn.needsSafeGuard = true;
                            pawn.canKillAt[i] = pawn.tempTileArr[i].num;
                            pawn.canLeapTo[i] = parseInt(pawn.tempTileArr[i].num) + parseInt(pawn.tempValArr[i]);
                            pawn.canLeapVal[i] = pawn.tempValArr[i];
                        }
                        else {
                            // console.log("pawn is blocked", checkNextTile, pawn.tempTileArr[i].num);

                            pawn.blockedAt++;
                        }
                    }
                }
            }
            else if (pawn.tempTileArr[i].isTakenBy === false) {
                // _pawn.alpha = 1;
                pawn.canMoveTo[i] = pawn.tempTileArr[i].num;
                pawn.canMoveVal[i] = pawn.tempValArr[i];
            }
        }

        if (this.p < this.tempCollectArr.length - 1) {
            this.p++;
            this.ValidateAndPushPawns();
        }
        else {
            // console.log("about to check validated pawns", this.tempCollectArr);

            this.p = 0;
            this.CheckValidatedPawns();
        }
    }

    CheckValidatedPawns() {
        // console.log("validated pawns", this.tempCollectArr);
        this.dPawnArr = [];

        // if(collectArr)
        for (let i = 0; i < this.tempCollectArr.length; i++) {
            const pawn = this.tempCollectArr[i];

            if (pawn.isAtEdge) {
                if (!pawn.isKing && pawn.blockedAt === 1) {
                    this.dPawnArr.push(pawn);
                } else if (pawn.isKing && pawn.blockedAt === 2) {
                    this.dPawnArr.push(pawn);
                }
            } else {
                if (!pawn.isKing && pawn.blockedAt === 2) {
                    this.dPawnArr.push(pawn);
                } else if (pawn.isKing && pawn.blockedAt === 4) {
                    this.dPawnArr.push(pawn);
                }
            }

            if (
                Object.keys(pawn.canMoveTo).length === 0 &&
                Object.keys(pawn.canLeapTo).length === 0
            ) {
                if (!this.dPawnArr.includes(pawn)) {
                    this.dPawnArr.push(pawn);
                }
            }
        }


        this.tempCollectArr = this.tempCollectArr.filter(pawn => !this.dPawnArr.includes(pawn));
        // console.log("dPawbArr", this.dPawnArr, this.tempCollectArr);
        this.dPawnArr.forEach(element => {
            if (this.turn === 0) {
                element.alpha = 0.5;
                element.shadow.alpha = 0.25;
            }
        });

        const filtered = this.tempCollectArr.filter(pawn => pawn.needsSafeGuard === true);
        if (filtered.length > 0) {
            this.tempCollectArr.forEach(pawn => {
                if (!filtered.includes(pawn)) {
                    if (this.turn === 0) {
                        pawn.alpha = 0.5;
                        pawn.shadow.alpha = 0.25;
                    }
                }
            });

            // Now assign filtered to tempCollectArr
            this.tempCollectArr = filtered;

        }

        if (!this.pawnOnMove)
            this.PriorToMakePawnsActive();
        else {
            // console.log("the filtered array", filtered, this.dPawnArr);

            if (filtered.length > 0) {
                // console.log("filtered array", filtered);

                this.tempCollectArr = filtered;
                this.AutomateNextMoves(this.tempCollectArr);
            }
            else {
                // console.log("safe guard not needed", filtered, this.p);

                this.tempCollectArr = [];
                this.ClearAllAndSwitchTurn();
            }
        }
    }

    PriorToMakePawnsActive() {
        if (this.turn === 0) {
            console.log("tempCollectrArr", this.tempCollectArr);

            this.tempCollectArr.forEach(pawn => {
                // pawn.alpha = 1;
                this.MakePawnsActive(pawn);
            });

        }
        else {
            // BOT turn: replaced random selection with AI decision
            // we still set clickedPawn for compatibility with MakeMove()
            const botPawns = this.tempCollectArr;
            if (botPawns.length === 0) {
                // nothing to move
                this.ClearAllAndSwitchTurn();
                return;
            }

            // call GetTileForBot (AI-backed) to choose pawn + tile and execute move
            this.GetTileForBot();
        }
    }

    EdgeCheck(_tileNum = null) {
        let num = null;
        num = _tileNum;

        if (num) {
            if (num % this.row === 0 || (num + 1) % this.row === 0)
                return true;
            else
                return false;
        }
    }

    MakePawnsActive(_elem) {
        this.gameTileArr[_elem.currBlockNum].texture = Texture.from('hl_layer_' + this.turn);
        _elem.eventMode = 'static';
        _elem.cursor = 'pointer';
        _elem.off('pointerup'); // Remove any previous listeners
        _elem.on('pointerup', () => {
            this.clickedPawn = _elem;
            this.clickedPawnBool = true;
            this.OnClickingPawn();
        }, this);
    }

    OnClickingPawn() {
        AudioManager.PlayPawnSelect();
        // console.log("element", this.clickedPawn, this.gameTileArr[this.clickedPawn.currBlockNum]);
        this.markPossMoveTileArr = [];
        this.checkTileCount = null;

        this.gameTileArr[this.clickedPawn.currBlockNum].texture = Texture.from('hl_layer_' + this.turn);
        this.gameTileArr.forEach((element, index) => {
            if (index !== this.clickedPawn.currBlockNum) {
                element.eventMode = 'none';
                element.texture = Texture.from(element.lastTexture);
            }
        });
        // console.log("Clicked Pawn at ONclickingPawn", this.clickedPawn);

        // this.MarkPossibleMoveTiles();
        this.CheckNextMove();

    }

    CheckTileValidity(_num) {
        if (_num !== null && _num >= 0 && _num <= this.lastTile)
            return _num;
        else
            return null;
    }

    CheckNextTile(_tile, _val) {
        this.ntile = null;
        let ntileNum, val = null;

        val = _val;

        ntileNum = parseInt(_tile.num) + val;
        // console.log("new tile num", ntileNum);

        let tileValidity = this.CheckTileValidity(ntileNum);

        // console.log("tile Validity", tileValidity);


        if (tileValidity !== null) {
            this.ntile = this.gameTileArr[tileValidity];

            if (this.ntile.isTakenBy === false) {
                // console.log("at this 1", this.ntile.num);
                return true;
            }

            else if (this.ntile.isTakenBy === this.lastTurn) {
                // console.log("at this 2", this.ntile.num);

                return false;

            }
            else if (this.ntile.isTakenBy === this.turn) {
                // console.log("at this 3", this.ntile.num);
                return false;
            }
        }
    }

    CheckNextMove() {
        if (this.turn === 0) {
            this.MarkPossibleMoveTiles();
            // console.log("this.markPossMoveTileArr", this.markPossMoveTileArr);
        } else {
            setTimeout(() => {
                this.GetTileForBot();
            }, 2200);
        }
    }

    // REPLACED: GetTileForBot now uses minimax GameAI to pick best move
    GetTileForBot() {
        // Defensive: ensure it's bot's turn
        if (this.turn !== 1) return;

        // Ask AI for best move using current GameScreen state (board and pawns must be already validated)
        const bestMove = this.gameAI.getBestMove(this);

        if (!bestMove) {
            // No move found by AI — clear and switch
            console.warn("AI: no move found, clearing & switching turn.");
            this.ClearAllAndSwitchTurn();
            return;
        }

        const { pawnId, tileNum, key, type } = bestMove;

        // Find the pawn in the bot container with matching currBlockNum (pawnId)
        const botPawnContainer = this.playerArr[1].playerPawnContainer;
        const botPawn = Array.from(botPawnContainer.children).find(p => p.currBlockNum === pawnId);

        if (!botPawn) {
            console.warn("AI: pawn not found for pawnId", pawnId);
            this.ClearAllAndSwitchTurn();
            return;
        }

        const targetTile = this.gameTileArr[tileNum];
        if (!targetTile) {
            console.warn("AI: target tile not found for tileNum", tileNum);
            this.ClearAllAndSwitchTurn();
            return;
        }

        // Set clickedPawn so existing MakeMove logic works unchanged
        this.clickedPawn = botPawn;
        this.clickedPawnBool = true;

        // Highlight tile (visual parity with human flow)
        try {
            targetTile.texture = Texture.from('hl_layer_' + this.turn);
        } catch (e) { /* ignore if texture missing */ }

        // Execute move after same delay as earlier flow (keeps feel)
        setTimeout(() => {
            // call MakeMove with the 'key' that maps to your pawn.canMoveTo / canLeapTo index
            this.MakeMove(targetTile, key);
        }, 600); // slightly faster than human delay but still natural; adjust if needed
    }

    MarkPossibleMoveTiles() {
        ///keep the nums of the marked move

        if (this.markPossMoveTileArr.length === 0) {
            if (this.clickedPawn.needsSafeGuard) {
                this.markPossMoveTileArr = Object.entries(this.clickedPawn.canLeapTo);
            } else {
                this.markPossMoveTileArr = Object.entries(this.clickedPawn.canMoveTo);
            }
        }

        console.log("markposs", this.markPossMoveTileArr);


        // console.log("can Kill at", this.clickedPawn.canKillAt, this.clickedPawn.canLeapTo, this.markPossMoveTileArr);

        this.moveTileMarkerContainer.removeChildren().forEach(child => child.destroy({ children: true }));

        for (let i = 0; i < this.markPossMoveTileArr.length; i++) {
            const [key, tileNum] = this.markPossMoveTileArr[i]; // Destructure to get key and tileNum

            const tile = this.gameTileArr[tileNum];
            // if (!tile) continue;

            // Make tile interactive only once
            tile.eventMode = 'static';
            tile.cursor = 'pointer';
            tile.removeAllListeners?.(); // safer than off('pointerup') if using PIXI

            // Use closure-safe reference to the tile
            tile.on('pointerup', () => {
                if (this.isMoveInProgress) return;
                // console.log("key", key);

                // Now sending the key instead of index i to MakeMove
                this.MakeMove(tile, key);
            });


            // Create and position marker
            const marker = Sprite.from('move_layer');
            marker.position.set(tile.x, tile.y);
            marker.anchor.set(0.5);
            this.moveTileMarkerContainer.addChild(marker);
        }
    }

    MakeMove(_clickedTile, index) {
        if (this.isMoveInProgress) return;
        this.isMoveInProgress = true;
        PIXI.warn("MAKEMOVE")
        this.clickedTile = _clickedTile;
        if (this.playerArr[this.turn])
            this.playerArr[this.turn].timerAnim.pause();
        this.checkTileCount = 0;
        this.fnCalled = 0;
        this.index = index;
        // PIXI.warn("I have clicked the tile", this.clickedTile);

        this.markPossMoveTileArr?.forEach(([key, tileNum]) => {
            if (tileNum !== undefined && this.gameTileArr[tileNum]) {
                this.gameTileArr[tileNum].eventMode = 'none';
            }
        });

        // console.log("moveTileMarker container", this.moveTileMarkerContainer);


        this.moveTileMarkerContainer.removeChildren().forEach(child => child.destroy({ children: true }));

        // console.log("moveTileMarker container", this.moveTileMarkerContainer);

        this.markPossMoveTileArr = [];
        this.pawnOnMove = true;
        // AudioManager.PlayPawnSFX();
        console.warn("frick turn", this.turn);

        let shiftX = null, shiftY = null;
        if (this.clickedPawn) {
            this.clickedPawn.shadow.visible = false;
            shiftX = this.clickedPawn.shiftX;
            shiftY = this.clickedPawn.shiftY;
        }
        if (this.clickedPawn.canJump) {
            // this.clickedPawn.state.setAnimation(0, 'dog_jump', false);
            const targetBlockNum = this.clickedPawn.canKillAt[this.index];
            this.childToRemove = this.playerArr[this.lastTurn].playerPawnContainer.children.find(child => child.currBlockNum === targetBlockNum);

            this.childToRemove.parent.removeChild(this.childToRemove);
            this.childToRemove.shadow.visible = false;
            this.playerArr[this.turn].childToRemoveContainer.addChild(this.childToRemove);
            this.childToRemove.visible = true;

            this.setJumpBeforeMoving(this.childToRemove);
        }
        // let spineTriggered = false;
        else {
            console.log("chai");

            this.PawnMoveAnimation();
        }
    }

    setJumpBeforeMoving(childToRemove) {
        this.currPlayer.pawn.setUpPawnJump(this.clickedTile, childToRemove, this.clickedPawn);
        console.warn("clickedPawn", this.clickedPawn);

        // this.currPlayer.pawn.sendCallBack(this.OnAnimationComplete.bind(this));
        // this.currPlayer.pawn.pawnMoveAnim.eventCallback("onComplete", () => {
        //     console.log('setJumpBeforeMoving!');
        //     this.OnAnimationComplete();
        // });

    }

    PawnMoveAnimation() {
        this.currPlayer.pawn.pawnMoveAnimation(this.clickedTile, this.clickedPawn);
        // this.currPlayer.pawn.sendCallBack(this.OnAnimationComplete.bind(this));
        this.currPlayer.pawn.pawnMoveAnim.eventCallback("onComplete", () => {
            console.log('setJumpBeforeMoving!');
            gsap.killTweensOf(this.clickedPawn);
            this.OnAnimationComplete();
        }, this);
    }

    async ChangeToKingAnimation() {
        // if (!_cPawn)return
        this.currPlayer.pawn.playIdleAnimation(this.clickedPawn);
    }

    OnAnimationComplete() {
        console.warn("OnAnimationComplete", this, this.clickedPawn, this.turn);

        this.executeOrQueue(() => {
            console.warn("I'M DONE", this.clickedPawn);
            this.ShiftPosAndSetInstanceVals(this.clickedPawn);
            this.clickedPawn.scale = 1;

            let edgeCheck = this.EdgeCheck(this.clickedPawn.currBlockNum);
            if (edgeCheck)
                this.clickedPawn.isAtEdge = true;
            this.ResetPawnOpacity();
            this.CheckAndSetKing(this.clickedPawn);            //.then(() => {

            // });
        });
    }

    afterCheckAndSetKing(_pawnInPlay) {
        console.log("clicked pawn ", this.clickedPawn);
        const pawnInPlay = _pawnInPlay;

        if (pawnInPlay.canJump) {
            console.warn("bari");

            pawnInPlay.canJump = false;
            pawnInPlay.needsSafeGuard = false;

            const container = this.playerArr[this.lastTurn].playerPawnContainer;
            const shadowContainer = this.playerArr[this.lastTurn].playerShadowContainer;
            const targetBlockNum = pawnInPlay.canKillAt[this.index];

            this.gameTileArr[targetBlockNum].isTakenBy = false;

            // const childToRemove = container.children.find(child => child.currBlockNum === targetBlockNum);
            if (this.childToRemove) {
                // this.CapturePawn(this.childToRemove, this.gameTileArr[targetBlockNum], container, shadowContainer);
                this.ShowRelevantEmoji(this.childToRemove, this.gameTileArr[targetBlockNum]);
                this.IncrementScoreAndInitInstanceVars(pawnInPlay);
            }
            this.CheckForFollowingMoves(pawnInPlay);
            return;
        }
        else {

            // Call ONCE per move
            this.ClearAllAndSwitchTurn();
            return;
        }
    }

    xyz(obg) {
        gsap.to(obg, {
            // x: this.clickedTile.x + shiftX,
            // y: this.clickedTile.y + shiftY,
            duration: 0.9,
            scaleX: 1.7,  // Scale X axis
            scaleY: 1.7,
        });
    }

    ShiftPosAndSetInstanceVals(_pawnInPlay) {
        const pawnInPlay = _pawnInPlay;
        const pawnShadowShiftX = pawnInPlay.shadow.shiftX;
        const pawnShadowShiftY = pawnInPlay.shadow.shiftY;
        console.log("clickedPawnSha", pawnInPlay.shadow);

        pawnInPlay.shadow.position.set(pawnInPlay.x + pawnShadowShiftX, pawnInPlay.y + pawnShadowShiftY);
        pawnInPlay.shadow.visible = true;
        this.isMoveInProgress = false;
        this.clickedTile.isTakenBy = this.turn;
        // console.log("clicked pawn is blocked at", pawnInPlay.blockedAt);

        pawnInPlay.blockedAt = 0;

        this.gameTileArr[pawnInPlay.currBlockNum].isTakenBy = false;
        // console.log("clicked Tile", this.clickedTile.isTakenBy, this.gameTileArr[pawnInPlay.currBlockNum]);
        pawnInPlay.currBlockNum = this.clickedTile.num;
        // console.log("clicked pawn curr block", this.clickedPawn.currBlockNum);
    }

    ResetPawnOpacity() {
        this.playerArr[this.turn].playerPawnContainer.children.forEach(element => {
            element.eventMode = 'none';
            element.alpha = 1;
            element.shadow.alpha = 1;
        });
    }

    CheckAndSetKing(_pawnInPlay) {
        const pawnInPlay = _pawnInPlay;
        if (this.clickedTile.isHomeTo === this.lastTurn) {
            if (!pawnInPlay.isKing) {
                pawnInPlay.isKing = true;
                pawnInPlay.base = pawnInPlay.kingSide;

                console.warn("change to king now");
                this.ChangeToKingAnimation();
            }
        }
        this.afterCheckAndSetKing(pawnInPlay);
    }

    IncrementScoreAndInitInstanceVars(_pawnInPlay) {
        const pawnInPlay = _pawnInPlay;
        this.playerArr[this.turn].score++;
        this.playerArr[this.turn].scoreTxt.text = this.playerArr[this.turn].score;
        this.tempCollectArr = [];
        pawnInPlay.canLeapTo = {};
        pawnInPlay.canLeapVal = {};
        pawnInPlay.canKillAt = {};
        pawnInPlay.tempTileArr = [];
        pawnInPlay.tempValArr = [];
        pawnInPlay.blockedAt = 0;
    }

    CheckForFollowingMoves(_pawnInPlay) {
        const pawnInPlay = _pawnInPlay;
        if ((pawnInPlay.currBlockNum + this.firstEdgeAddends) % this.row === 0) {
            this.FirstEdgeCheck(pawnInPlay);
        } else if ((pawnInPlay.currBlockNum + this.secondEdgeAddends) % this.row === 0) {
            this.SecondEdgeCheck(pawnInPlay);
        } else {
            this.CheckOthers(pawnInPlay);
        }

        // Only here do you check move array length
        if (this.tempCollectArr.length > 0) {
            // There are further valid moves - continue with those
            this.ValidateAndPushPawns();
            return;
        } else {
            // NO more moves, so only now do you switch turn
            this.ClearAllAndSwitchTurn();
            return;
        }
    }

    ShowRelevantEmoji(_gObj, _gameTile) {
        if (this.turn === 0) {
            const randomEmoji = this.userEmoji[Math.floor(Math.random() * this.userEmoji.length)];
            Emoji.changeTexture(randomEmoji);
        }
        else {
            const randomEmoji = this.botEmoji[Math.floor(Math.random() * this.botEmoji.length)];
            Emoji.changeTexture(randomEmoji);
        }
        // this.gameContainer.addChild(emoji);
        Emoji.animateEmoji(_gObj, _gameTile);

    }

    AutomateNextMoves() {
        // console.log("At the automation function");

        this.markPossMoveTileArr = [];

        if (this.tempCollectArr.length > 0) {
            // console.log("tempCollectArr on automation", this.tempCollectArr, this.clickedPawn);

            // if (this.tempCollectArr.currBlockNum === this.clickedPawn.currBlockNum) {
            // Use Object.entries() to get key-value pairs
            this.markPossMoveTileArr = Object.entries(this.clickedPawn.canLeapTo);
            // console.log("checking all", this.tempCollectArr, this.tempCollectArr, this.clickedPawn, this.markPossMoveTileArr);
        }
        // }

        if (this.markPossMoveTileArr.length > 1) {
            // console.log("Automation of GOD");
            if (this.turn === 0)
                this.MarkPossibleMoveTiles();
            else
                this.GetTileForBot();
        } else if (this.markPossMoveTileArr.length === 1) {
            // console.log("mark is 1");
            // Destructure to get the key and tile number
            const [key, tileNum] = this.markPossMoveTileArr[0];
            const tile = this.gameTileArr[tileNum];

            // PIXI.warn("the canKillAt needs a check", this.clickedPawn.canKillAt);

            if (this.turn === 0) {
                const marker = Sprite.from('move_layer');
                marker.position.set(tile.x, tile.y);
                marker.anchor.set(0.5);
                this.moveTileMarkerContainer.addChild(marker);
            }

            if (tile) {
                this.isMoveInProgress = false;
                setTimeout(() => {
                    // Send the key instead of 0 to MakeMove
                    this.MakeMove(tile, key);
                }, 1000);
            }
        }
        else {
            this.ClearAllAndSwitchTurn();
        }

    }

    ClearAllAndSwitchTurn() {
        console.log("Clear ALL and switch turn");
        if (this.hasSwitchedTurn) return;
        this.hasSwitchedTurn = true;
        // if (this.pawnOnMove) return;
        if (this.clickedPawn) {
            console.log("here I am ");

            this.clickedPawn.canMoveTo = {};
            this.clickedPawn.canMoveVal = {};
            this.pawnOnMove = false;
            this.clickedPawn.tempTileArr = [];
            this.clickedPawn.tempValArr = [];
            this.clickedPawn.blockedAt = 0;
            this.clickedPawn.canLeapTo = {};
            this.clickedPawn.canLeapVal = {};
            this.clickedPawn.canKillAt = {};
            this.clickedPawn.needsSafeGuard = false;
            this.clickedPawn.canJump = false;
            this.gameTileArr[this.clickedPawn.currBlockNum].texture = Texture.from(this.gameTileArr[this.clickedPawn.currBlockNum].lastTexture);
        }
        this.p = 0;
        // this.clickedPawn = null;
        this.pawnOnMove = false;
        this.moveTileMarkerContainer.removeChildren().forEach(child => child.destroy({ children: true }));
        // this.playerArr[this.turn].clearSpinnerBase();
        this.CheckWinner();
    }

    CheckWinner() {
        const user = this.playerArr[0];
        const oppo = this.playerArr[1];
        const userScore = user.score;
        const oppoScore = oppo.score;
        const spScenario = this.remainingSeconds === 0 || user.playerLives === 0 || oppo.playerLives === 0;

        // Score-based win
        if (userScore === this.winScore) {
            return this.emitGameOver(0, 1, false);
        }

        if (oppoScore === this.winScore) {
            return this.emitGameOver(1, 0, false);
        }

        // Time-based win/draw
        if (spScenario) {
            if (userScore === oppoScore) {
                return this.emitGameOver(0, 1, true); // Draw
            }

            const [winner, loser] = userScore > oppoScore ? [0, 1] : [1, 0];
            return this.emitGameOver(winner, loser, false);
        }

        // Continue game
        // this.clickedPawn = null;
        setTimeout(() => this.CheckTurn(), 1500);
    }

    emitGameOver(winner, loser, isDraw) {
        console.log(`Game Over - Winner: ${winner}, Draw: ${isDraw}`);
        Constant.game.emit('gameover', winner, loser, isDraw);

        // Easy to add more here later:
        // this.saveGameStats(winner, loser, isDraw);
        // this.showGameOverScreen();
    }

    GameOver(_winInd, _loseInd, isTied) {
        AudioManager.StopBGM();
        this.isPaused = true;
        setTimeout(() => {
            AudioManager.PlayGameOver();
        }, 100);
        const winner = this.playerArr[_winInd];
        const loser = this.playerArr[_loseInd];

        console.log("sdfsdfsdfsdf", winner, loser, this.playerArr);

        GameAnalytics.addProgressionEvent('Complete', 'checkers_go_endless', undefined, undefined, Constant.lifetimeScore);
        GameAnalytics.addDesignEvent('score:checkers_go', Constant.lifetimeScore);
        if (_winInd === 0)
            AudioManager.PlayGameWin();
        this.gameoverPopup.ShowGameoverPopup(winner, loser, isTied);
    }

    ShowTimeOverPopup() {
        Constant.game.emit('gamepaused');
        this.timeOverPopup.showTimeOverPopup();

        setTimeout(() => {
            this.timeOverPopup.hideTimeOverPopup();
            this.timeOverPopup.destroyTimeOverPopup();
            this.CheckWinner();
        }, 1500);
    }

    resizeBg() {
        this.bg.x = Constant.game.app.screen.width / 2;
        this.bg.y = Constant.game.app.screen.height / 2;
        if (Constant.game.app.screen.width > Constant.game.app.screen.height) {
            this.bg.width = 1080;
            this.bg.height = 1920;
            this.bg.scale.set(Constant.newScale)
        }
        else {
            this.bg.width = Constant.game.app.screen.width;
            this.bg.height = Constant.game.app.screen.height;
            // bg.scale.set(1, 1);
        }
    }

    RemoveGameContainers() {
        Constant.game.app.stage.removeChild(this.quitOverlay);
        Constant.game.app.stage.removeChild(this.quitPopupContainer);
    }

    OnResize() {
        if (Constant.currentScreen !== 'GameScreen')
            return;

        let scale = Math.min(Constant.game.app.screen.width / 1080, Constant.game.app.screen.height / 1920);
        Constant.newScale = scale;
        this.mmPopup.ResizeMatchmakingPopup();
        this.turnPopup.resizeTurnPopupContainer();
        QuitPopup.resize();

        // this.resizeBg();

        this.gameContainer.x = Constant.game.app.screen.width / 2;
        this.gameContainer.y = Constant.game.app.screen.height / 2;
        this.gameContainer.scale.set(Constant.newScale);

        this.topPanelContainer.x = Constant.game.app.screen.width / 2;
        this.topPanelContainer.y = 0;
        this.topPanelContainer.scale.set(Constant.newScale);

        this.bottomPanelContainer.x = Constant.game.app.screen.width / 2;
        this.bottomPanelContainer.y = Constant.game.app.screen.height / 1;
        this.bottomPanelContainer.scale.set(Constant.newScale);

        this.moveTileMarkerContainer.x = Constant.game.app.screen.width / 2;
        this.moveTileMarkerContainer.y = Constant.game.app.screen.height / 2;
        this.moveTileMarkerContainer.scale.set(Constant.newScale);

        if (this.childToRemoveContainer) {
            console.log("chele");

            this.childToRemoveContainer.x = Constant.game.app.screen.width / 2;
            this.childToRemoveContainer.y = Constant.game.app.screen.height / 2;
            this.childToRemoveContainer.scale.set(Constant.newScale);
        }


        this.gameoverPopup.ResizeGameoverPopup();
        this.timeOverPopup.resizeTimeOverContainer();
    }
}

//Two tweens will make the pawn movement smoother
