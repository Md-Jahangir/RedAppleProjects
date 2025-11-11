
import { Utils } from "../Utils";
import Button from "../class/Button";
import BasketBall from "../class/BasketBall";
import Basket from "../class/Basket";
import GameTween from "../class/GameTween";
import PausePopup from "../popup/PausePopup";
import BasketNet from "../class/BasketNet";
import { Constant } from "../Constant";
import { Server } from "../class/Server";
import { SoundManager } from "../SoundManager";
import LeavePopup from "../popup/LeavePopup";
import TutorialPopup from "../popup/TutorialPopup";
import GameOverPopup from "../popup/GameOverPopup";
import { AdSDK } from '../AdSDK.js';
import { PlayzhubEventHandler } from '../PlayzhubEventHandler.js';
import AdManager from '../AdManager.js';
import * as GA from "gameanalytics";


export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.istimeOver = null;
        this.isgameOver = null;
        this.isGamePause = null;
        this.basketPos = null;
        this.netBody = null;
        this.constraintArray = null;
        this.constraintArrayPointA = null;
        this.previousScale = null;
        this.constraintYCordinate = null;
        this.resizeCount = 0;

        this.clientWidth = null;
        this.clientHeight = null;
        this.currentNewScale = null;

        this.howManyLevelsPlayed = 0;
        this.adHitFrom = '';
    };

    // InitializeAdSdk() {
    //     this.HideAdDiv();
    //     this.adSdk = new AdSDK({
    //         injectionElementId: Constant.adDivId,
    //         apiKey: Constant.adApiKey
    //     });

    //     this.adSdk.onStatus((status) => {
    //         this.OnGetStatus(status);
    //     });

    //     this.adSdk.onError((error) => {
    //         this.OnGetError();
    //     });
    // };

    // OnGetError() {
    //     setTimeout(() => {
    //         console.log('OnGetError');
    //         this.ControlFunctionalityOnAdStatus();
    //     }, 1000);
    // }

    // OnGetStatus(_status) {
    //     switch (_status.type) {
    //         case 'click':
    //             console.log('case click');
    //             break;

    //         case 'loaded':
    //             console.log('case loaded');
    //             break;

    //         case 'started':
    //             console.log('case started');
    //             break;

    //         case 'firstQuartile':
    //             console.log('case firstQuartile');
    //             break;

    //         case 'midpoint':
    //             console.log('case midpoint');
    //             break;

    //         case 'thirdQuartile':
    //             console.log('case thirdQuartile');
    //             break;

    //         case 'complete':
    //             console.log('case complete');
    //             this.ControlFunctionalityOnAdStatus();
    //             break;

    //         case 'allAdsCompleted':
    //             console.log('case allAdsCompleted');

    //             break;

    //         case 'paused':
    //             console.log('case paused');
    //             break;

    //         case 'skip':
    //             console.log('case skip');
    //             this.ControlFunctionalityOnAdStatus();
    //             break;

    //         case 'manuallyEnded':
    //             console.log('case manuallyEnded');
    //             this.ControlFunctionalityOnAdStatus();
    //             break;

    //         default:
    //             break;
    //     }
    // };

    async ShowAd() {
        // this.ShowAdDiv();
        // this.adSdk.showAd();

        const adManager = AdManager.getInstance();
        try {
            console.log('Show AD...........');
            GA.GameAnalytics.addDesignEvent("ad:requested");
            await adManager.RequestAdAsync();

            this.overlay.setVisible(false);
            this.isGamePause = false;
            this.matter.world.resume();
            // PlayzhubEventHandler.GamePlayResumed();

        } catch (e) {
            console.error("Ad error:", e);
        }
    };

    // ShowAdDiv() {
    //     const adContainer = document.getElementById('applixir-ad-container');
    //     adContainer.style.display = 'block';
    // };

    // HideAdDiv() {
    //     const adContainer = document.getElementById('applixir-ad-container');
    //     if (adContainer) {
    //         adContainer.innerHTML = '';
    //     }
    //     adContainer.style.display = 'none';
    // };

    // ControlFunctionalityOnAdStatus() {
    //     console.log(' ControlFunctionalityOnAdStatus', this.adHitFrom);
    //     if (this.adHitFrom === 'reload') {
    //         setTimeout(() => {
    //             this.RestartGame();
    //         }, 100);
    //     } else if (this.adHitFrom === 'level_complete') {
    //         setTimeout(() => {
    //             if (this.basketInstance.gameTimer) {
    //                 this.basketInstance.TimerTweenRestartAfterScore();
    //             }
    //         }, 500);
    //     }

    // };

    // async IncrementLevelAndShowAd() {
    //     this.howManyLevelsPlayed += 1;
    //     if (this.howManyLevelsPlayed === 10) {
    //         this.howManyLevelsPlayed = 0;
    //         if (this.basketInstance.gameTimer) {
    //             this.basketInstance.gameTimer.stop();
    //         }
    //         await this.ShowAd();
    //     } else {

    //     }
    // };

    create(isTutorial) {
        // this.InitializeAdSdk();
        Constant.activeScene = 'game';
        Constant.gameStartTime = Date.now();
        this.game.events.on('resize', this.resize, this);
        SoundManager.IsPlayGameBgMusic();
        this.camera = this.cameras.main;
        this.CanvasCheck();
        //collider json 
        this.basketColliderJson = this.cache.json.get('basket-collider');
        //reuse Varriable in Game
        this.constraintArray = [];
        this.constraintArrayPointA = [];
        this.constraintYCordinate = [-10, -15, -20, -20, -20, -15, -10];
        this.basketPos = 1;
        this.istimeOver = false;
        this.isgameOver = false;
        this.isGamePause = false;
        this.bg = this.add.image(0, 0, 'game-bg').setOrigin(0).setInteractive();
        this.InstanceCreate(isTutorial);
        this.CreateUI();
        if (!isTutorial.isTutorial) {
            this.GameAwakeFunc();
        }
        // this.planeBg = this.add.image(0, 0, 'ground').setOrigin(0, 0.5);

        //Game Over Collision Check
        this.matter.world.on("collisionstart", (event, bodyA, bodyB) => {
            if (this.istimeOver && bodyB.position.y > (window.innerHeight / 1.05) && !this.isgameOver) {
                // this.time.removeEvent(this.bridgeCreate.timer);
                // this.bridgeCreate.timer.remove();
                this.CallTheScoreSendAPI();
                // console.log('gameover');
            }
            // if (this.istimeOver && !this.isgameOver) {
            //     this.time.removeEvent(this.bridgeCreate.timer);
            //     this.bridgeCreate.timer.remove();
            //     this.CallTheScoreSendAPI();
            //     console.log('gameover', bodyB.position.y, (window.innerHeight / 1.05), bodyB);
            // }
        });

        this.AddConstraint();
        const currentTimeStamp = Date.now();
        const finalTime = currentTimeStamp - Constant.gameStartTime;
        PlayzhubEventHandler.GameStateFetch(() => {
            PlayzhubEventHandler.GameScoreUpdate(finalTime / 1000, Constant.score);
        });
        this.AdControlByPlazHub();
        if (window.innerWidth > window.innerHeight) {
            let clientHeight = window.innerHeight;
            let clientWidth = (clientHeight / 1.77777777778);
            this.resize(clientWidth, clientHeight, (window.innerWidth / 2) - (clientWidth / 2));
        }
        else {
            let clientWidth = window.innerWidth;
            let clientHeight = window.innerHeight;
            this.resize(clientWidth, clientHeight, 0);
        }

        GA.GameAnalytics.addProgressionEvent(
            "Start",
            "tap_tap_shots_endless"
        );
    }

    //#region -  CanvasCheck
    CanvasCheck() {
        if (window.innerWidth > window.innerHeight) {
            this.clientHeight = window.innerHeight;
            this.clientWidth = (this.clientHeight / 1.77777777778);
            this.currentNewScale = Utils.getScale(1080, 1920, this.clientWidth, this.clientHeight);
        }
        else {
            this.clientWidth = window.innerWidth;
            this.clientHeight = window.innerHeight;
            this.currentNewScale = Utils.getScale(1080, 1920, this.clientWidth, this.clientHeight);
        }
    }
    //#endregion

    //#region -  All Class Instances Create Here
    InstanceCreate(_isTutorial) {
        this.tutorialPopUp = new TutorialPopup(this);
        this.tutorialPopUp.ShowHidePopup(_isTutorial.isTutorial);
        this.gameTween = new GameTween(this);
        this.basketBallInstance = new BasketBall(this);
        this.rightBasketNet = new BasketNet(this, this.clientWidth - (193 * this.currentNewScale), this.clientHeight / 2.08);
        this.leftBasketNet = new BasketNet(this, -(209 * this.currentNewScale), this.clientHeight / 2 - (401 * this.currentNewScale));
        this.basketInstance = new Basket(this);
        this.pausePopupInstance = new PausePopup(this);
        this.leavePopupInstance = new LeavePopup(this);
        this.gameOverPopupInstance = new GameOverPopup(this);
        // this.bridgeCreate = new Bridge(this);
        // this.matter.world.pause();
        // setTimeout(() => {
        //     this.matter.world.resume();
        //     console.log('-----');
        // }, 4000)
    }
    //#endregion

    //#region Ad Control Section By PlayzHub
    AdControlByPlazHub() {
        this.overlay = this.add.image(0, 0, 'game-bg').setInteractive().setOrigin(0).setVisible(false).setAlpha(0.2).setDepth(5);;
        PlayzhubEventHandler.AdStarted(() => {
            GA.GameAnalytics.addDesignEvent("ad:started");
            this.overlay.setVisible(true);
            this.isGamePause = true;
            this.matter.world.pause();
            PlayzhubEventHandler.GamePlayPaused();
        });
        PlayzhubEventHandler.AdCompleted(() => {
            GA.GameAnalytics.addDesignEvent("ad:completed");
            // this.overlay.setVisible(false);
            // this.isGamePause = false;
            // this.matter.world.resume();
            // PlayzhubEventHandler.GamePlayResumed();
        })
    }
    //#endregion

    //#region -  BallAwake
    GameAwakeFunc() {
        setTimeout(() => {
            this.basketBallInstance.ball.body.isStatic = false;
            this.basketBallInstance.ball.setAwake();
        }, 100);
        // this.bridgeCreate.TimerEventStart();
    }
    //#endregion

    //#region -
    CreateUI() {
        this.pauseBut = new Button(this, 'pause-but', this.clientWidth / 1.1, this.clientHeight / 10, 1, 1);
        this.pauseBut.button.setDepth(3);
        this.pauseBut.hide();
        this.pauseBut.setClickcallback(this.PauseButtonFunc, this);

        this.backBut = new Button(this, 'back-but', 0, 0, 1, 1);
        this.backBut.button.setDepth(3);
        this.backBut.setClickcallback(this.BackButtonFunc, this);

        this.soundBut = new Button(this, 'sound-but', 0, 0, 1, 1, true);
        this.soundBut.button.setDepth(3);
        this.soundBut.SetFrame(this.soundButCurrFrame);
        this.soundBut.setClickcallback(this.SoundButtonFunc, this);

        this.soundButCurrFrame = localStorage.getItem('SoundButtonFrame');
        if (this.soundButCurrFrame != null) {
            this.soundBut.SetFrame(this.soundButCurrFrame);
        }
        else {
            this.soundButCurrFrame = 0;
        }
    }
    //#endregion

    //#region - In game Pause Button functionality
    PauseButtonFunc() {
        GA.GameAnalytics.addDesignEvent("ui:pause_clicked");
        this.isGamePause = true;
        this.pauseBut.button.setVisible(false);
        this.basketBallInstance.ball.body.timeScale = 0.001;
        if (this.basketInstance.score > 0) {
            this.basketInstance.gameTimer.pause();
        }
        this.pausePopupInstance.popupbg.setVisible(true);
        this.pausePopupInstance.pausePopupContainer.list[2].setVisible(false);
        this.pausePopupInstance.pausePopupContainer.list[1].setVisible(true);
        this.pausePopupInstance.pausePopupContainer.setVisible(true);
    }
    //#endregion

    //#region - In game Back Button functionality
    BackButtonFunc() {
        GA.GameAnalytics.addDesignEvent("ui:back_clicked");
        this.isGamePause = true;
        if (this.basketInstance.gameTimer != null) {
            this.basketInstance.gameTimer.pause();
        }
        SoundManager.StopGameBgMusic();
        this.ShowAd();
        this.leavePopupInstance.ShowHidePopup(true);
    }
    //#endregion

    //#region - In game Sound Button functionality
    SoundButtonFunc() {
        GA.GameAnalytics.addDesignEvent("ui:sound_clicked");
        this.soundBut.SetFrame(this.soundButCurrFrame = this.soundButCurrFrame === 0 ? 1 : 0);
        localStorage.setItem('SoundButtonFrame', this.soundButCurrFrame);
        SoundManager.IsPlayGameBgMusic();
    }
    //#endregion

    //#region - Game Over Functionality Handle
    GameOverFunc() {
        const currentTimeStamp = Date.now();
        GA.GameAnalytics.addProgressionEvent(
            "Complete",
            "tap_tap_shots_endless",
            undefined,
            undefined,
            Constant.score
        );

        GA.GameAnalytics.addDesignEvent("score:tap_tap_shots", Constant.score);
        const finalTime = currentTimeStamp - Constant.gameStartTime;
        // Server.PostGamePlayTimeToParent(finalTime / 1000, Constant.score);
        PlayzhubEventHandler.GameScoreUpdate(finalTime / 1000, Constant.score);
        SoundManager.StopGameBgMusic();
        this.isgameOver = true;
        this.basketBallInstance.ball.body.timeScale = 1;
        this.basketBallInstance.ball.setMass(window.innerHeight / 128)
        // this.pausePopupInstance.popupbg.setVisible(true);
        // this.pausePopupInstance.pausePopupContainer.list[1].setVisible(false);
        // this.pausePopupInstance.pausePopupContainer.list[2].setText(this.basketInstance.score).setVisible(true);
        // this.pausePopupInstance.pausePopupContainer.setVisible(true);
        this.ShowAd();
        this.gameOverPopupInstance.ShowHidePopup(true);
        Constant.timeToEnd = Server.timerValue;
    }
    MobileGameOverFunc() {
        this.isgameOver = true;
        this.basketBallInstance.ball.body.timeScale = 1;
        this.basketBallInstance.ball.setMass(window.innerHeight / 128);
        this.pauseBut.button.setVisible(false);
    }
    //#endregion


    //#region - Joint Both BasketNet on Basket
    AddConstraint() {
        let newScale = Utils.getScale(1080, 1920, window.innerWidth, window.innerHeight);
        let offsetWidth = 0;
        let offsetWidthWithoutScale = 0;
        for (let i = 0; i < 7; i++) {
            const body1 = this.rightBasketNet.cloth.bodies[i];
            const body2 = this.leftBasketNet.cloth.bodies[i];
            let rightJoint = this.matter.add.constraint(body1, this.basketInstance.basketFrontPiece1, 0, 1, { pointA: { x: (-75 * newScale) + offsetWidth, y: this.constraintYCordinate[i] * newScale } });
            let leftJoint = this.matter.add.constraint(body2, this.basketInstance.basketFrontPiece2, 0, 1, { pointA: { x: (-75 * newScale) + offsetWidth, y: this.constraintYCordinate[i] * newScale } });
            let rightJointPointA = { x: -75 + offsetWidthWithoutScale, y: this.constraintYCordinate[i] };
            let leftJointPointA = { x: -75 + offsetWidthWithoutScale, y: this.constraintYCordinate[i] };
            this.constraintArray.push(rightJoint, leftJoint);
            this.constraintArrayPointA.push(rightJointPointA, leftJointPointA);
            offsetWidth += 25 * newScale;
            offsetWidthWithoutScale += 25;
        }
        // console.log(this.constraintArray);
    }
    //#endregion

    //#region - Net Joint resize
    ConstraintResize(newScale) {
        for (let i = 0; i < this.constraintArray.length; i++) {
            this.constraintArray[i].pointA = { x: this.constraintArrayPointA[i].x * newScale, y: this.constraintArrayPointA[i].y * newScale };
        }
    }
    //#endregion

    //#region - Right Net Body Resize 
    RightNetBodyResize(newScale) {
        let scaleChange = newScale - this.previousScale;
        let rightNetConstraint = this.rightBasketNet.cloth.constraints;
        for (let i = 0; i < rightNetConstraint.length; i++) {
            let lengthChange = rightNetConstraint[i].length * scaleChange;
            rightNetConstraint[i].length += lengthChange;
        }
    }
    //#endregion

    //#region - Left Net Body Resize
    LeftNetBodyResize(newScale) {
        let scaleChange = newScale - this.previousScale;
        let leftNetConstraint = this.leftBasketNet.cloth.constraints;
        for (let i = 0; i < leftNetConstraint.length; i++) {
            let lengthChange = leftNetConstraint[i].length * scaleChange;
            leftNetConstraint[i].length += lengthChange;
        }
    }
    //#endregion

    //#region - CallTheScoreSendAPI
    CallTheScoreSendAPI() {
        // if (getMobileOperatingSystem() == "Android") {
        //     this.MobileGameOverFunc();
        //     // console.log("The score........................" + this.basketInstance.score.toString());
        //     sendMessage("The Game End..................................");
        //     sendMessage(this.basketInstance.score.toString());
        // } else if (getMobileOperatingSystem() == "iOS") {
        //     this.MobileGameOverFunc();
        //     let postdata = {
        //         score: this.basketInstance.score.toString(),
        //     };
        //     let postmessage = JSON.stringify(postdata);
        //     window.webkit.messageHandlers.jsHandler.postMessage(postmessage);
        //     window.webkit.messageHandlers.jsHandler.postMessage("The Game End.............");
        // }
        // else {
        this.GameOverFunc();
        // }

    }
    //#endregion

    RestartGame() {
        console.log('RestartGame: ', this);
        this.howManyLevelsPlayed = 0;
        this.scene.stop('GameScene');
        this.scene.start('GameScene', { isTutorial: false });
    };

    //#region -  Resize
    resize(newWidth, newHeight, offsetWidth) {
        if (Constant.activeScene != 'game') return;
        this.resizeCount++;
        let newScale = Utils.getScale(1080, 1920, newWidth, newHeight);
        this.currentNewScale = newScale;
        this.matter.world.setBounds(- newWidth, 0, 4 * newWidth, newHeight - (170 * newScale), 200 * newScale, false, false, false, true);
        this.overlay.setDisplaySize(newWidth, newHeight);
        this.bg.setDisplaySize(newWidth, newHeight);
        // this.planeBg.setScale(newScale);
        // let y = newHeight - 96 * newScale;
        // this.planeBg.setPosition(0, y);
        // let currentHeight = this.planeBg.displayHeight;
        // this.planeBg.setDisplaySize(newWidth, currentHeight);
        this.basketBallInstance.resize(newWidth, newHeight, newScale);
        this.basketInstance.resize(newWidth, newHeight, newScale);
        // this.bridgeCreate.resize(newWidth, newHeight, newScale);

        this.tutorialPopUp.resize(newWidth, newHeight, newScale);
        this.pausePopupInstance.resize(newWidth, newHeight, newScale);
        this.leavePopupInstance.resize(newWidth, newHeight, newScale);
        this.gameOverPopupInstance.resize(newWidth, newHeight, newScale);

        this.pauseBut.SetScale(newScale);
        this.pauseBut.SetPosition(newWidth - 98 * newScale, 192 * newScale);
        this.backBut.SetScale(newScale);
        this.backBut.SetPosition(98 * newScale, 92 * newScale);
        this.soundBut.SetScale(newScale);
        this.soundBut.SetPosition(newWidth - 98 * newScale, 92 * newScale);

        if (this.resizeCount > 2) {
            this.ConstraintResize(newScale);
            this.RightNetBodyResize(newScale);
            this.LeftNetBodyResize(newScale);
        }
        this.previousScale = newScale;

        // this.camera.x = offsetWidth;
        // this.camera.setBounds(0, 0, window.innerWidth, window.innerHeight);
        this.camera.setViewport(offsetWidth, 0, newWidth, newHeight);
    }
    //#endregion

    //#region -  Update
    update() {
        //Ball Shadow Control
        if (!this.isGamePause && !this.isgameOver) {
            this.basketBallInstance.OnUpdate();
        }
        this.basketBallInstance.ShadowEffect();
        this.rightBasketNet.OnUpdate();
        this.leftBasketNet.OnUpdate();
    }
    //#endregion
}
