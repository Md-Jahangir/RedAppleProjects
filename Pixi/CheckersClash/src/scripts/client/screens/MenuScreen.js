import { Constant } from "../Constant.js";
import * as PIXI from 'pixi.js';
import { Sprite, Texture, Container, Text, TextStyle } from 'pixi.js';
import ButtonTween from "../game_objects/ButtonTween.js";
import GameScreen from "./GameScreen.js";
import gsap from "gsap";
import { GameBg } from "../game_objects/GameBg.js";
import { InfoPopup } from "../popups/InfoPopup.js";
import { AudioManager } from "../media/Audiomanager.js";
import { GameAnalytics } from "gameanalytics";

export default class MenuScreen {
    constructor() {
        Constant.currentScreen = 'MenuScreen';
        this.menuUIContainer = null;
        this.bottomPanelContainer = null;
        this.topPanelContainer = null;
        this.gModeBtnArray = [];
        this.currentPageIndex = 0;
        this.pageHandlers = {
            0: this.unlockModeOneLvls.bind(this),
            1: this.unlockModeTwoLvls.bind(this),
            2: this.unlockModeThreeLvls.bind(this)
        };

        this.initMenuScreen();

        Constant.game.addListener('resize', this.OnResize.bind(this));
        GameBg.resize();
        this.OnResize();
        InfoPopup.resize();
    }

    initMenuScreen() {
        this.CreateMenuUI();
        AudioManager.PlayBGM();
        GameAnalytics.addDesignEvent('screen:title');
    }

    CreateMenuUI() {
        this.bg = GameBg.getSprite();
        this.bg.visible = false;

        this.menuUIContainer = new Container();
        this.bottomPanelContainer = new Container();
        this.topPanelContainer = new Container();
        this.style = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 30,
            fill: '#ffffff',
            wordWrap: true,
            wordWrapWidth: 800,
        });

        Constant.game.app.stage.addChild(this.menuUIContainer);
        Constant.game.app.stage.addChild(this.topPanelContainer);
        Constant.game.app.stage.addChild(this.bottomPanelContainer);

        this.CreateModeOne();
        this.CreateModeTwo();
        this.CreateModeThree();
        this.CreateInfoBtn();
        this.CreateGameLevelUI();
        this.CreateGameStartButton();
        this.CreatePagination();
        this.CreateInfoPopup();

        // Only slide these pairs (bg, title)
        this.modeSlideArray = [
            [this.modeOneBg, this.modeOneTitle],
            [this.modeTwoBg, this.modeTwoTitle],
            [this.modeThreeBg, this.modeThreeTitle]
        ];

        // Add all elements to the main container (unchanged initialization)
        this.menuUIContainer.addChild(
            this.modeOneBg,
            this.modeTwoBg,
            this.modeThreeBg,
            this.levelBase, this.levelTxt, ...this.levelModeArr, ...this.checkArr
        );
        this.topPanelContainer.addChild(this.modeOneTitle, this.modeTwoTitle, this.modeThreeTitle, this.infoBtn);
        this.bottomPanelContainer.addChild(this.gameStartButton);
        this.bottomPanelContainer.addChild(
            this.leftArrow, this.pageMarkerOne, this.pageMarkerTwo, this.pageMarkerThree, this.rightArrow
        );

        this.leftArrow.on('pointerup', this.switchToPrevMode.bind(this));
        this.rightArrow.on('pointerup', this.switchToNextMode.bind(this));
        this.infoBtn.on('pointerup', this.ShowGameRule, this);
        this.gameStartButton.on('pointerup', this.OnClickingGameStart, this);

        // Ensure only the first mode is visible at start
        this.setVisibleModeIndex(0);
        this.unlockModeOneLvls();
    }

    // Mode creation logic is UNCHANGED
    CreateModeOne() {
        this.modeOneBg = Sprite.from('english');
        this.modeOneBg.anchor.set(0.5);
        this.modeOneTitle = Sprite.from(Constant.uiAtlas.textures['english checkers']);
        this.modeOneTitle.anchor.set(0.5);
        this.modeOneTitle.position.set(0, 230);
    }

    CreateModeTwo() {
        this.modeTwoBg = Sprite.from('international');
        this.modeTwoBg.anchor.set(0.5);
        this.modeTwoTitle = Sprite.from(Constant.uiAtlas.textures['International Droughts']);
        this.modeTwoTitle.anchor.set(0.5);
        this.modeTwoTitle.position.set(0, 230);
    }

    CreateModeThree() {
        this.modeThreeBg = Sprite.from('canadian');
        this.modeThreeBg.anchor.set(0.5);
        this.modeThreeTitle = Sprite.from(Constant.uiAtlas.textures['Canadian Checkers']);
        this.modeThreeTitle.anchor.set(0.5);
        this.modeThreeTitle.position.set(0, 230);
    }

    CreateInfoBtn() {
        this.infoBtn = Sprite.from(Constant.uiAtlas.textures['Information Button']);
        this.infoBtn.anchor.set(0.5);
        this.infoBtn.eventMode = 'static';
        this.infoBtn.cursor = 'pointer';
        this.infoBtn.position.set(460, 230);
    }

    CreateGameLevelUI() {
        this.levelBase = Sprite.from(Constant.uiAtlas.textures['Level Base']);
        this.levelBase.anchor.set(0.5);
        this.levelBase.position.set(0, 330);

        this.levelTxt = Sprite.from(Constant.uiAtlas.textures['Levels']);
        this.levelTxt.anchor.set(0.5);
        this.levelTxt.position.set(0, 230);

        this.levelModeArr = [];
        this.checkArr = [];
        for (let i = 0; i < 3; i++) {
            let levelModeBtn = Sprite.from(Constant.uiAtlas.textures['Lock button']);
            levelModeBtn.eventMode = 'none';
            levelModeBtn.cursor = 'pointer';
            levelModeBtn.anchor.set(0.5);
            levelModeBtn.position.set(-210, 360);
            let check = Sprite.from('check');
            check.position.set(levelModeBtn.x + 32, levelModeBtn.y + 22);
            check.visible = false;
            this.levelModeArr.push(levelModeBtn);
            this.checkArr.push(check);
            if (i > 0) {
                this.levelModeArr[i].position.set(this.levelModeArr[i - 1].x + this.levelModeArr[i - 1].width + 47, this.levelModeArr[i - 1].y);
                // this.levelModeArr[i].texture = Sprite.from(Constant.uiAtlas.textures['Lock button']).texture;
            }
        }
    }

    CreateGameStartButton() {
        this.gameStartButton = Sprite.from(Constant.uiAtlas.textures['Game_start']);
        this.gameStartButton.anchor.set(0.5);
        this.gameStartButton.position.set(0, -320);
        this.gameStartButton.eventMode = 'static';
        this.gameStartButton.cursor = 'pointer';
    }

    CreatePagination() {
        this.leftArrow = Sprite.from(Constant.uiAtlas.textures['Left arrow']);
        this.leftArrow.anchor.set(0.5);
        this.leftArrow.eventMode = 'static';
        this.leftArrow.cursor = 'pointer';
        this.leftArrow.position.set(-140, -130);

        this.pageMarkerOne = Sprite.from(Constant.uiAtlas.textures['White circle']);
        this.pageMarkerOne.anchor.set(0.5);
        this.pageMarkerOne.position.set(this.leftArrow.x + 70, -130);

        this.pageMarkerTwo = Sprite.from(Constant.uiAtlas.textures['Black Circle']);
        this.pageMarkerTwo.anchor.set(0.5);
        this.pageMarkerTwo.position.set(this.pageMarkerOne.x + 70, -130);

        this.pageMarkerThree = Sprite.from(Constant.uiAtlas.textures['Black Circle']);
        this.pageMarkerThree.anchor.set(0.5);
        this.pageMarkerThree.position.set(this.pageMarkerTwo.x + 70, -130);

        this.rightArrow = Sprite.from(Constant.uiAtlas.textures['Left arrow']);
        this.rightArrow.anchor.set(0.5);
        this.rightArrow.eventMode = 'static';
        this.rightArrow.cursor = 'pointer';
        this.rightArrow.scale.x = -1;
        this.rightArrow.position.set(this.pageMarkerThree.x + 70, -130);
    }

    CreateInfoPopup() {
        InfoPopup.createRulesPopup();
        Constant.game.app.stage.addChild(InfoPopup.getOverlay());
        Constant.game.app.stage.addChild(InfoPopup.getInfoContainer());
        InfoPopup.hideRulesPopup();
    }

    unlockModeOneLvls() {
        const modeArrOne = Constant.modeOneArr;
        modeArrOne.forEach((elem, ind) => {
            if ((ind - 1) != -1) {
                if (modeArrOne[ind - 1] >= 1) {
                    this.levelModeArr[ind].texture = Texture.from('unlocked_' + (ind + 1));
                    this.checkArr[ind - 1].visible = true;
                    Constant.currBotLvl = (ind + 1);
                }
            }
            else {
                this.levelModeArr[ind].texture = Texture.from('unlocked_' + (ind + 1));
                this.levelModeArr[ind].eventMode = 'static';
                Constant.currBotLvl = (ind + 1);
            }
        });
    }

    unlockModeTwoLvls() {
        const modeArrTwo = Constant.modeTwoArr;
        modeArrTwo.forEach((elem, ind) => {
            if ((ind - 1) != -1) {
                if (modeArrTwo[ind - 1] >= 1) {
                    this.levelModeArr[ind].texture = Texture.from('unlocked_' + (ind + 1));
                    this.checkArr[ind - 1].visible = true;
                    Constant.currBotLvl = (ind + 1);
                }
            }
            else {
                this.levelModeArr[ind].texture = Texture.from('unlocked_' + (ind + 1));
                Constant.currBotLvl = (ind + 1);
            }
        });
    }

    unlockModeThreeLvls() {
        const modeArrThree = Constant.modeThreeArr;
        modeArrThree.forEach((elem, ind) => {
            if ((ind - 1) != -1) {
                if (modeArrThree[ind - 1] >= 1) {
                    this.levelModeArr[ind].texture = Texture.from('unlocked_' + (ind + 1));
                    this.checkArr[ind - 1].visible = true;
                    Constant.currBotLvl = (ind + 1);
                }
            }
            else {
                this.levelModeArr[ind].texture = Texture.from('unlocked_' + (ind + 1));
                Constant.currBotLvl = (ind + 1);
            }
        });
    }

    // UPDATED: Only bg + title of each mode is affected.
    setVisibleModeIndex(idx) {
        this.modeSlideArray.forEach((pair, i) => {
            pair.forEach(obj => {
                obj.visible = i === idx;
                obj.alpha = i === idx ? 1 : 0;
                obj.x = 0; // Reset slide offset
            });
        });
        this.currentPageIndex = idx;
        this.animatePageMarkers(idx);
    }

    switchToPrevMode() {
        GameAnalytics.addDesignEvent('ui:leftarrow_clicked');
        AudioManager.PlayBtnPressedSFX();
        if (this.currentPageIndex > 0) {
            this.animatePageSwitch(this.currentPageIndex - 1);
        }
    }

    switchToNextMode() {
        GameAnalytics.addDesignEvent('ui:rightarrow_clicked');
        AudioManager.PlayBtnPressedSFX();
        if (this.currentPageIndex < 2) {
            this.animatePageSwitch(this.currentPageIndex + 1);
        }
    }

    // UPDATED: Only slide bg and title of modes, nothing else
    animatePageSwitch(newPageIndex) {
        if (this.currentPageIndex === newPageIndex) return;

        // Disable buttons
        this.DisableButtons();

        let outgoing = this.modeSlideArray[this.currentPageIndex];
        let incoming = this.modeSlideArray[newPageIndex];
        let dir = (newPageIndex > this.currentPageIndex) ? 1 : -1;
        let slideDistance = 350;

        // Hide other modes immediately
        this.modeSlideArray.forEach((pair, idx) => {
            if (idx !== this.currentPageIndex && idx !== newPageIndex) {
                pair.forEach(obj => { obj.visible = false; obj.alpha = 0; obj.x = 0; });
            }
        });

        // Prepare incoming
        incoming.forEach(obj => {
            obj.visible = true;
            obj.alpha = 0;
            obj.x = -dir * slideDistance;
        });

        gsap.to(outgoing, {
            alpha: 0,
            x: "+=" + (dir * slideDistance),
            duration: 0.35,
            ease: "power2.in",
            onComplete: () => {
                outgoing.forEach(obj => {
                    obj.visible = false;
                    obj.x = 0;
                });

                gsap.to(incoming, {
                    alpha: 1,
                    x: "+=" + (dir * slideDistance),
                    duration: 0.35,
                    ease: "power2.out",
                    onComplete: () => {
                        this.setVisibleModeIndex(newPageIndex);
                        if (this.pageHandlers[this.currentPageIndex]) {
                            this.pageHandlers[this.currentPageIndex]();
                        }
                        // Re-enable buttons
                        this.EnableButtons();
                        console.log("current page index", this.currentPageIndex);

                    }
                });
            }
        });
    }

    DisableButtons() {
        this.leftArrow.eventMode = 'none';
        this.rightArrow.eventMode = 'none';
        this.gameStartButton.eventMode = 'none';
        this.infoBtn.eventMode = 'none';
    }

    EnableButtons() {
        this.leftArrow.eventMode = 'static';
        this.rightArrow.eventMode = 'static';
        this.gameStartButton.eventMode = 'static';
        this.infoBtn.eventMode = 'static';
    }

    animatePageMarkers(newPageIndex) {
        let markers = [this.pageMarkerOne, this.pageMarkerTwo, this.pageMarkerThree];
        markers.forEach((m, i) => {
            m.texture = (i === newPageIndex)
                ? Constant.uiAtlas.textures['White circle']  // ON state
                : Constant.uiAtlas.textures['Black Circle']; // OFF state
        });
    }

    ShowGameRule() {
        GameAnalytics.addDesignEvent('ui:info_clicked');
        AudioManager.PlayBtnPressedSFX();
        new ButtonTween(this, this.infoBtn, null, 0.85, 0.85);
        InfoPopup.showRulesPopup(this.currentPageIndex);
    }

    OnClickingGameStart(_gbtn) {
        GameAnalytics.addDesignEvent('ui:gamestart_clicked');
        Constant.gameType = this.currentPageIndex;
        Constant.unlockedBotLevel = 0;
        AudioManager.PlayBtnPressedSFX();
        this.btnTween = new ButtonTween(this, this.gameStartButton, null, 0.85, 0.85, this.SwitchScreen.bind(this));
    }

    SwitchScreen() {
        Constant.game.app.stage.removeChild(this.menuUIContainer, this.bottomPanelContainer, this.topPanelContainer);
        AudioManager.StopBGM();
        new GameScreen();
    }

    resizeBg() {
        if (!this.bg) return;
        this.bg.x = Constant.game.app.screen.width / 2;
        this.bg.y = Constant.game.app.screen.height / 2;
        if (Constant.game.app.screen.width > Constant.game.app.screen.height) {
            this.bg.width = 1080;
            this.bg.height = 1920;
            this.bg.scale.set(Constant.newScale)
        } else {
            this.bg.width = Constant.game.app.screen.width;
            this.bg.height = Constant.game.app.screen.height;
        }
    }

    resizeTopPanelContainer() {
        this.topPanelContainer.x = Constant.game.app.screen.width / 2;
        this.topPanelContainer.y = 0;
        this.topPanelContainer.scale.set(Constant.newScale);
    }

    OnResize() {
        if (Constant.currentScreen !== 'MenuScreen') return;
        let scale = Math.min(
            Constant.game.app.screen.width / 1080,
            Constant.game.app.screen.height / 1920
        );
        Constant.newScale = scale;

        // this.resizeBg();
        this.menuUIContainer.x = Constant.game.app.screen.width / 2;
        this.menuUIContainer.y = Constant.game.app.screen.height / 2;
        this.menuUIContainer.scale.set(Constant.newScale);

        this.bottomPanelContainer.x = Constant.game.app.screen.width / 2;
        this.bottomPanelContainer.y = Constant.game.app.screen.height;
        this.bottomPanelContainer.scale.set(Constant.newScale);

        this.resizeTopPanelContainer();
        InfoPopup.resize();
    }
}
