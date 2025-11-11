/********* Script_Details ************
 * @Original_Creator :- Tanmay Mukherjee.
 * @Created_Date :- 26-07-2024
 * @Last_Update_By :- Tanmay Mukherjee
 * @Last_Updatd_Date :- 26-09-24
 * @Description :- Create GameObjects and Handle Game Play
 ************************************/
import { Utils } from "../class/Utils";
import Rope from "../class/GameObjectClasses/Rope";
import MatterImage from "../gameObjectsClass/MatterImage";
import Texture from "../gameObjectsClass/Texture";
import Stars from "../class/GameObjectClasses/Stars";
import Frog from "../class/GameObjectClasses/Frog";
import GameOverPopup from "../popups/GameOverPopup";
import PausePopup from "../popups/PausePopup";
import Button from "../class/Button";
import Bubble from "../class/GameObjectClasses/Bubble";
import Obstacle1 from "../class/GameObjectClasses/obstacle1";
import RuntimeRope from "../class/GameObjectClasses/RuntimeRope";
import AirGun from "../class/GameObjectClasses/AirGun";
import { Constant } from "../Constant";
import QuitPopup from "../popups/QuitPopup";
import Bridge from "../Services/Bridge";
import TutorialPopup from "../popups/TutorialPopup";
import { SoundManager } from "../SoundManager";
import BouncyObs from "../class/GameObjectClasses/BouncyObs";
import DragRope from "../class/GameObjectClasses/DragRope";
// import { PlayzhubEventHandler } from "../../lib/PlayzhubEventHandler";
import RunTimeDragRope from "../class/GameObjectClasses/RunTimeDragRope";
import TweenRope from "../class/GameObjectClasses/TweenRope";
import TweenRunTimeRope from "../class/GameObjectClasses/TweenRunTimeRope";
import MagicHat from "../class/GameObjectClasses/MagicHat";
import { AdSDK } from '../AdSDK.js';
// import AdManager from "../../lib/AdManager.js";
import AdManager from '../AdManager.js';
import { PlayzhubEventHandler } from "../PlayzhubEventHandler.js";
import * as GA from "gameanalytics";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.isCutting = null;
        this.starCount = null;
        this.isGameOver = null;
        this.isGamePause = null;
        this.currentScale = null;
        this.soundButCurrFrame = null;
        this.levelTimerStart = null;
        this.levelTimerEnd = null;
        this.levelTime = null;
        this.effectRatio = null;
        this.popupanimContainer = null;
        this.sceneStarUiArray = null;
        this.bubbleInstanceArray = null;
        this.bubbleAnimArray = null;
        this.smallBouncyObjArray = null;
        this.dragRopeArray = null;
        this.tweenRopeArray = null;
        this.tweenRuntimeRopeArray = null;
        this.isRopeDragging = null;
        this.magicHatArray = null;
        this.cutEffect = null;

        this.howManyLevelsPlayed = 0;
        this.adHitFrom = '';
    }
    init(data) {
        console.log('data', data);
        const totalStars = data.stars.reduce((a, b) => a + (b > 0 ? b : 0), 0);
        const result = totalStars * 10;
        Constant.lifeTimescore = result;
        this.gameInfo = data;
        this.level = data.level;
        // this.level = 3;
        this.stars = data.stars;
        this.gameOption = data.gameOption;
        this.lvlJson = this.cache.json.get('lvl-json');
        this.colliderJson = this.cache.json.get('collider-json');
        let levelPropertyName = 'level' + this.level;
        this.currentLevel = this.lvlJson[levelPropertyName];
    }

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
        const adManager = AdManager.getInstance();
        try {
            console.log('SHOW ad...........');
            GA.GameAnalytics.addDesignEvent("ad:requested");
            await adManager.RequestAdAsync();
            this.overlay.setVisible(false);
            this.isGamePause = false;
            this.matter.world.resume();
            // PlayzhubEventHandler.GamePlayResumed();
            console.log('ad completed from show ad!');
            // SoundManager.IsPlayGameBgMusic();

        } catch (e) {
            console.error("Ad error:", e);
        }
    }

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
    //             this.RestartGameControl();
    //         }, 100);
    //     } else if (this.adHitFrom === 'complete') {

    //     }

    // };

    // IncrementLevelAndShowAd() {
    //     this.howManyLevelsPlayed += 1;
    //     if (this.howManyLevelsPlayed === 3) {
    //         this.ShowAd();
    //         this.howManyLevelsPlayed = 0;
    //     } else { }
    // };

    create() {
        // this.InitializeAdSdk();
        this.game.events.once('evtGameOver', this.ObstacleGameOverHandle, this);

        this.input.on("dragstart", () => { });
        this.input.on("drag", () => { });
        this.input.on("dragend", () => { });
        this.starCount = -1;
        Constant.score = 0;

        // when make build below code will be not commented
        if (Constant.isMobile) {
            this.currentLevel.candyMass = this.currentLevel.candyMass / 2;
        }
        this.cutEffect = null;
        this.sceneStarUiArray = [];
        this.bubbleInstanceArray = [];
        this.bubbleAnimArray = [];
        this.smallBouncyObjArray = [];
        this.dragRopeArray = [];
        this.smallRuntimeDragRope = [];
        this.tweenRopeArray = [];
        this.tweenRuntimeRopeArray = [];
        this.magicHatArray = [];
        this.sceneStarUiPos = [{ x: -125, y: -40 }, { x: -30, y: -40 }, { x: 60, y: -40 }];
        this.cameras.main.fadeIn(1000);
        // this.game.events.on("resize", this.resize, this);
        Constant.activeScene = 'GameScene';
        this.camera = this.cameras.main;
        Constant.bulletSpeed = Constant.clientWidth / 60;
        this.isCutting = false;
        this.isGameOver = false;
        this.isGamePause = false;
        this.isRopeDragging = false;
        this.scoreRatio = 10;
        // this.popupAnimPos = { x: 0, y: 0 };

        this.rope = [];
        this.runtimeRope = [];
        this.mediumRuntimeRope = [];
        this.largeRuntimeRope = [];
        this.sharpEdgeObsArray = [];
        this.airguns = [];
        this.candy = null;
        // console.log(this.level);
        // this.matter.add.mouseSpring();
        // let newScale = Utils.getScale(1080, 1920, Constant.clientWidth, Constant.clientHeight);
        this.bg = new Texture(this, 0, 0, 'bg');
        this.candy = new MatterImage(this, 0, 0, 'spider', null, { label: 'candy' });

        this.candy.setCircle(this.candy.displayWidth / 3, { label: 'spider' });
        if (this.currentLevel.candyConfig !== undefined) {
            if (this.currentLevel.candyConfig.airFriction !== undefined) {
                this.candy.setFrictionAir(this.currentLevel.candyConfig.airFriction);
            }
            if (this.currentLevel.candyConfig.bounce !== undefined) {
                this.candy.setBounce(this.currentLevel.candyConfig.bounce);
            }
        }
        this.candy.setDepth(2).setAngle(-20);

        this.ropeCutter = new MatterImage(this, 1080, 1920, 'rope-head2', null, { isStatic: true, isSensor: true, label: 'temp' });
        this.ropeCutter.setAlpha(0);

        this.upperCollider = new MatterImage(this, 0, 0, 'one-pixel', null, { isStatic: true, isSensor: true });
        this.upperCollider.SetOrigin(0.5);
        this.lowerCollider = new MatterImage(this, 0, 0, 'one-pixel', null, { isStatic: true, isSensor: true });
        this.lowerCollider.SetOrigin(0.5);

        this.ClassInstance();

        this.pauseBut = new Button(this, 'pauseBut', 1);
        this.pauseBut.button.SetOrigin(0.5);
        this.pauseBut.button.SetDepth(2);
        this.pauseBut.setClickcallback(this.PauseButFunc, this, null);
        this.pauseBut.button.setVisible(false);
        this.backBut = new Button(this, 'backBut');
        this.backBut.button.SetOrigin(0.5);
        this.backBut.setClickcallback(this.BackButFunc, this, null);
        this.soundBut = new Button(this, 'sound_button');
        this.soundBut.button.SetOrigin(0.5);
        this.soundBut.button.SetDepth(2);
        this.soundBut.setClickcallback(this.SoundButFunc, this, null);
        this.soundButCurrFrame = parseInt(localStorage.getItem('SoundButtonFrame'));
        this.soundButCurrFrame != null ? this.soundBut.button.setFrame(this.soundButCurrFrame) : this.soundButCurrFrame = 1;
        this.replayBut = new Button(this, 'replay_but');
        this.replayBut.button.setOrigin(0.5);
        this.replayBut.button.SetDepth(2);
        this.adImg = new Texture(this, 0, 0, 'ad_img');
        this.adImg.SetOrigin(0.5);
        this.adImg.SetDepth(2);
        this.replayBut.setClickcallback(this.ReplayButFunc, this, null);
        this.BubbleCollision();
        // this.CheckGameOver();
        this.OutofCanvasGameOverControl();
        this.RopeCutterEffect();
        this.AdControlByPlazHub();
        PlayzhubEventHandler.GameStateFetch(() => {
            // PlayzhubEventHandler.GameScoreUpdate(this.ConsumedTimeCalculateFunc(), Constant.score);
            PlayzhubEventHandler.GameScoreUpdate(this.ConsumedTimeCalculateFunc(), Constant.lifeTimescore);
        })
        if (window.innerWidth > window.innerHeight) {
            let clientHeight = window.innerHeight;
            let clientWidth = (clientHeight / 1.77777777778);
            this.resize(clientWidth, clientHeight, (window.innerWidth / 2) - (clientWidth / 2));
        } else {
            let clientWidth = window.innerWidth;
            let clientHeight = window.innerHeight;
            this.resize(clientWidth, clientHeight, 0);
        }
        // this.matter.world.pause();
        // setTimeout(() => {
        //     this.matter.world.resume();
        // }, 4000);

        GA.GameAnalytics.addProgressionEvent(
            "Start",
            "cut_it_right_level"
        );
    }
    //#region -  PauseButton Functionality
    PauseButFunc() {
        GA.GameAnalytics.addDesignEvent("ui:pause_clicked");
        this.pausePopup.VisibleControl(true);
        this.isGamePause = true;
        this.matter.world.pause();
    }
    //#endregion
    async ReplayButFunc() {
        GA.GameAnalytics.addDesignEvent("ui:replay_clicked");
        this.adHitFrom = 'reload'
        SoundManager.StopGameBgMusic();
        await this.ShowAd();
        this.RestartGameControl();
        this.scene.stop('GameScene');
        this.scene.start('GameScene', {
            level: this.gameInfo.level,
            stars: this.gameInfo.stars,
            gameOption: this.gameInfo.gameOption
        });
    }
    RestartGameControl() {
        this.game.events.emit('evtGameRestart');
        if (this.gameOverTimeoutLoose !== undefined) {
            clearTimeout(this.gameOverTimeoutLoose);
        }
        if (this.gameOverTimeoutWin !== undefined) {
            clearTimeout(this.gameOverTimeoutWin);
        }

        this.scene.stop('GameScene');
        this.scene.start('GameScene', {
            level: this.gameInfo.level,
            stars: this.gameInfo.stars,
            gameOption: this.gameInfo.gameOption
        });
        SoundManager.IsPlayGameBgMusic();
    }

    //#region BackButton Functionality
    async BackButFunc() {
        GA.GameAnalytics.addDesignEvent("ui:back_clicked");
        if (!this.isGameOver) {
            SoundManager.StopGameBgMusic();
            await this.ShowAd();
            this.quitPopup.PopupBaseAnimControl(true);
        }
    }
    //#endregion

    SoundButFunc() {
        GA.GameAnalytics.addDesignEvent("ui:sound_clicked");
        this.soundBut.button.setFrame(this.soundButCurrFrame = this.soundButCurrFrame === 1 ? 0 : 1);
        localStorage.setItem('SoundButtonFrame', this.soundButCurrFrame);
        SoundManager.IsPlayGameBgMusic();
    }

    //#region Ad Control Section By PlayzHub
    AdControlByPlazHub() {
        this.overlay = new Texture(this, 0, 0, 'overlay');
        this.overlay.setOrigin(0).setDepth(3).setVisible(false).setInteractive();
        PlayzhubEventHandler.AdStarted(() => {
            GA.GameAnalytics.addDesignEvent("ad:started");
            this.overlay.setVisible(true);
            this.isGamePause = true;
            this.matter.world.pause();
            PlayzhubEventHandler.GamePlayPaused();
            console.log('ad started');
        });
        PlayzhubEventHandler.AdCompleted(() => {
            // this.overlay.setVisible(false);
            // this.isGamePause = false;
            // this.matter.world.resume();
            // PlayzhubEventHandler.GamePlayResumed();
            GA.GameAnalytics.addDesignEvent("ad:completed");
            console.log('ad completed');
        })
    }
    //#endregion

    //#region -  Make GameObject Instances
    ClassInstance() {
        this.starsInstance = new Stars(this);

        let isEnemyRope = this.currentLevel.isEnemyRope?.rope;
        for (let index = 0; index < this.currentLevel.ropeCount; index++) {
            const ropeBodyCount = this.currentLevel.ropebodyCount[index];
            const enemyRope = isEnemyRope ? isEnemyRope[index] : undefined;
            this.rope.push(new Rope(this, ropeBodyCount, enemyRope));
        }

        //For Layer sorting starBar is here
        this.starBar = new Texture(this, 0, 0, 'star_bar');
        this.starBar.setOrigin(0.5).setDepth(2);
        for (let index = 1; index <= 3; index++) {
            const element = new Texture(this, 0, 0, 'star_blank');
            element.setDepth(2);
            this.sceneStarUiArray.push(element);
        }
        // this.tempStarText = new Text(this, 0, 0, 0, { fontFamily: "Poppins-Bold", fontSize: 40 });
        // this.tempStarText.setOrigin(0.5).setDepth(2).setVisible(false);

        this.frogInstance = new Frog(this, this.gameOption);
        if (this.currentLevel.obs1Position != undefined) {
            for (let index = 0; index < this.currentLevel.obs1Count.length; index++) {
                this.sharpEdgeObsArray.push(new Obstacle1(this, this.currentLevel.obs1Count[index].subObs, this.currentLevel.obs1Angle[index]));
                if (this.currentLevel.obs1Tween !== undefined) {
                    const obsTweenData = this.currentLevel.obs1Tween[index];
                    this.sharpEdgeObsArray[index].ObsTweenControl(obsTweenData.direction, obsTweenData.time, obsTweenData.endPos);
                }
            }
        }
        if (this.currentLevel.runtimeRopeCount != undefined) {
            let isEnemyRope = this.currentLevel.isEnemyRope?.runtimeRope;
            for (let index = 0; index < this.currentLevel.runtimeRopeCount; index++) {
                const ropeBodyCount = this.currentLevel.runtimeropebodyCount[index];
                const enemyRope = isEnemyRope ? isEnemyRope[index] : undefined;
                this.runtimeRope.push(new RuntimeRope(this, ropeBodyCount, 'small-radious', enemyRope));
            }
        }
        if (this.currentLevel.runtimeRopeMediumCount != undefined) {
            let isEnemyRope = this.currentLevel.isEnemyRope?.runtimeRopeMedium;
            for (let index = 0; index < this.currentLevel.runtimeRopeMediumCount; index++) {
                const ropeBodyCount = this.currentLevel.runtimeropeMediumbodyCount[index];
                const enemyRope = isEnemyRope ? isEnemyRope[index] : undefined;
                this.mediumRuntimeRope.push(new RuntimeRope(this, ropeBodyCount, 'medium-radious', enemyRope));
            }
        }
        if (this.currentLevel.runtimeRopeLargeCount != undefined) {
            let isEnemyRope = this.currentLevel.isEnemyRope?.runtimeRopeLarge;
            for (let index = 0; index < this.currentLevel.runtimeRopeLargeCount; index++) {
                const ropeBodyCount = this.currentLevel.runtimeropeLargebodyCount[index];
                const enemyRope = isEnemyRope ? isEnemyRope[index] : undefined;
                this.largeRuntimeRope.push(new RuntimeRope(this, ropeBodyCount, 'large-radious', enemyRope));
            }
        }
        if (this.currentLevel.dragRopeCount !== undefined) {
            for (let index = 0; index < this.currentLevel.dragRopeCount; index++) {
                this.dragRopeArray.push(new DragRope(this, this.currentLevel.dragRopeConfig, index));
            }
        }
        if (this.currentLevel.runtimeSmallDragRopeCount != undefined) {
            for (let index = 0; index < this.currentLevel.runtimeSmallDragRopeCount; index++) {
                this.smallRuntimeDragRope.push(new RunTimeDragRope(this, this.currentLevel.runtimeSmallDragRopeConfig, index, 'small-radious'));
            }
        }
        if (this.currentLevel.tweenRopeCount != undefined) {
            let isEnemyRope = this.currentLevel.isEnemyRope?.rope;
            for (let index = 0; index < this.currentLevel.tweenRopeCount; index++) {
                const ropeBodyCount = this.currentLevel.tweenRopebodyCount[index];
                const enemyRope = isEnemyRope ? isEnemyRope[index] : undefined;
                this.tweenRopeArray.push(new TweenRope(this, ropeBodyCount, enemyRope, this.currentLevel.tweenRopeConfig[index], index));
            }
        }
        if (this.currentLevel.tweenRuntimeRopeCount != undefined) {
            let isEnemyRope = this.currentLevel.isEnemyRope?.rope;
            for (let index = 0; index < this.currentLevel.tweenRuntimeRopeCount; index++) {
                const ropeBodyCount = this.currentLevel.tweenRuntimeRopebodyCount[index];
                const enemyRope = isEnemyRope ? isEnemyRope[index] : undefined;
                this.tweenRuntimeRopeArray.push(new TweenRunTimeRope(this, ropeBodyCount, enemyRope, this.currentLevel.tweenRuntimeRopeConfig[index], index, 'small-radious'));
            }
        }
        if (this.currentLevel.airgunCount != undefined) {
            for (let index = 0; index < this.currentLevel.airgunCount; index++) {
                this.airguns.push(new AirGun(this, index));
            }
        }
        if (this.currentLevel.bubblePosition != undefined) {
            // this.bubbleInstance = new Bubble(this);
            // this.bubbleAnim = this.add.spine(0, 0, 'bubble_anim');
            // console.log(this.bubbleInstance);
            for (let index = 0; index < this.currentLevel.bubbleCount; index++) {
                let bubble;
                if (this.currentLevel.bubblePosition.isChangeVelocity !== undefined) {
                    bubble = new Bubble(this, this.currentLevel.bubblePosition.isChangeVelocity[index]);
                }
                else {
                    bubble = new Bubble(this, false)
                }
                this.bubbleInstanceArray.push(bubble);
                const bubbleAnim = this.add.spine(0, 0, 'bubble_anim');
                this.bubbleAnimArray.push(bubbleAnim);
            }
        }
        if (this.currentLevel.magicHatCount !== undefined) {
            for (let index = 0; index < this.currentLevel.magicHatCount; index++) {
                const magicHat = new MagicHat(this, this.currentLevel.magicHatConfig, index);
                this.magicHatArray.push(magicHat);
            }
        }
        if (this.currentLevel.smallBouncerCount !== undefined) {
            for (let index = 0; index < this.currentLevel.smallBouncerCount; index++) {
                const smallBouncyObj = new BouncyObs(this, this.currentLevel.smallBouncerConfig.force[index].x, this.currentLevel.smallBouncerConfig.force[index].y, 'small_bouncer', this.currentLevel.smallBouncerConfig.angle[index]);
                this.smallBouncyObjArray.push(smallBouncyObj);
            }
        }
        this.CreatePopup();
        if (this.level === 0) {
            this.tutPopup.VisibleControl(true);
        }
        else {
            this.RopeCutControl();
        }
        this.GameOverPopup.PopupAnimControl(false);
        // this.GameOverPopup.VisibleControl(true, 1, 1);
    }
    //#endregion

    RopeVisibleCntrol() {
        this.rope.forEach(element => {
            element.TransitionValueOverTime(0);
        });
    }
    BubbleAnimOn(_index) {
        // this.bubbleAnim.setAnimation(0, 'bubble_interaction', true);
        // this.bubbleAnim.setVisible(true);
        console.log(_index, this.bubbleAnimArray[_index]);

        this.bubbleAnimArray[_index].setAnimation(0, 'bubble_interaction', true);
        this.bubbleAnimArray[_index].setVisible(true);
    }

    //#region PopupCreate
    CreatePopup() {
        // this.popupAnim.setAnimation(0, 'quit_loop', true);
        this.createBridge = new Bridge(this);
        this.GameOverPopup = new GameOverPopup(this);
        this.pausePopup = new PausePopup(this);
        this.quitPopup = new QuitPopup(this);
        this.tutPopup = new TutorialPopup(this);
        this.levelTimerStart = Constant.timeToEnd;
        this.popupanimContainer = this.add.container(0, 0).setDepth(3).setVisible(false);
        this.popupAnim = this.add.spine(0, 0, 'Popup_anim');
        this.popupanimContainer.add([this.popupAnim]);
    }
    //#endregion

    //#region ScoreUpdate
    UpdateScore(_star) {
        console.log(_star);
        this.ScoreUiUpdate(_star);
        const score = parseInt(_star * this.scoreRatio);
        console.log('UpdateScore score: ', score);

        // this.tempStarText.setText(score);
        Constant.score = score;
    }
    //#endregion

    ScoreUiUpdate(_star) {
        switch (_star) {
            case 1:
                this.sceneStarUiArray[0].setTexture('star_fill');
                break;
            case 2:
                this.sceneStarUiArray[1].setTexture('star_fill');
                break;
            case 3:
                this.sceneStarUiArray[2].setTexture('star_fill');
                break;
        }
    }

    //#region -  RopeCut Control
    RopeCutControl() {
        this.input.on('pointerdown', () => {
            this.isCutting = true;
            if (!this.isGamePause && !this.isGameOver) {
                this.ropeCutter.SetPosition((this.input.activePointer.x - ((window.innerWidth / 2) - (Constant.clientWidth / 2))), this.input.activePointer.y);
            }
        });
        this.input.on('pointerup', () => {
            this.isCutting = false;
            this.effectRatio = 0;
            this.ropeCutter.SetPosition(0, 0);
        });
    }
    //#endregion

    //#region -  OutofCanvas GameOVer Control
    OutofCanvasGameOverControl() {
        this.upperCollider.setOnCollideWith(this.candy.body, () => {
            if (!this.isGameOver) {
                this.ObstacleGameOverHandle();
            }
        });
        this.lowerCollider.setOnCollideWith(this.candy.body, () => {
            if (!this.isGameOver) {
                this.ObstacleGameOverHandle();
            }
        })
    }
    //#endregion
    RopeCutterEffect() {
        this.effectRatio = 0;
        setTimeout(() => {
            this.cutEffect = this.add.particles(0, 0, 'cutter_particle', {
                lifespan: {
                    onEmit: (particle, key, t, value) => Phaser.Math.Percent(this.effectRatio, 0, 300) * 10000
                },
                alpha: {
                    onEmit: (particle, key, t, value) => Phaser.Math.Percent(this.effectRatio, 0, 300) * 3000
                },
                scale: { start: 0.3 * this.currentScale, end: 0.1 * this.currentScale },
                frequency: 2,
                blendMode: 'ADD'
            });
            this.cutEffect.startFollow(this.ropeCutter);
        }, 1000);
        this.input.on('pointermove', () => {
            if (this.isCutting && !this.isGamePause && !this.isGameOver) {
                if (this.dragRopeArray.length !== 0 || this.smallRuntimeDragRope.length !== 0) {
                    if (!this.isRopeDragging) {
                        this.ropeCutter.SetPosition((this.input.activePointer.x - ((window.innerWidth / 2) - (Constant.clientWidth / 2))), this.input.activePointer.y);
                        this.effectRatio = 5;
                    }
                }
                else {
                    this.ropeCutter.SetPosition((this.input.activePointer.x - ((window.innerWidth / 2) - (Constant.clientWidth / 2))), this.input.activePointer.y);
                    this.effectRatio = 5;
                }
            }
            else {
                this.effectRatio = 0;
            }
        });
    }


    //#region  Level Fails 
    ObstacleGameOverHandle() {
        GA.GameAnalytics.addProgressionEvent(
            "Fail",
            "cut_it_right_level",
            this.level,  // progression02
            undefined,  // progression03
            Constant.score
        );

        GA.GameAnalytics.addDesignEvent("score:run", Constant.score);
        this.ShowAd();
        this.isGameOver = true;
        this.quitPopup.PopupBaseAnimControl(false);
        this.frogInstance.chamaeleon.setAnimation(0, "crying", false);
        if (this.currentLevel.bubblePosition != undefined && this.candy.texture.key === 'spiderBubble') {
            // this.bubbleAnim.setAnimation(0, 'bubble_blast', false);
            this.bubbleAnimArray.forEach(element => {
                element.setAnimation(0, 'bubble_blast', false);
            });
            this.matter.world.engine.gravity.y = Constant.clientHeight / 1706;
            Constant.bulletSpeed = Constant.clientWidth / 60;
        }
        if (this.currentLevel.obs1Position != undefined) {
            for (let index = 0; index < this.currentLevel.obs1Count.length; index++) {
                if (this.currentLevel.obs1Tween !== undefined) {
                    this.sharpEdgeObsArray[index].ObsTweenRemove();
                }
            }
        }
        if (this.currentLevel.tweenRopeCount !== undefined) {
            for (let index = 0; index < this.currentLevel.tweenRopeCount; index++) {
                if (this.currentLevel.tweenRopeCount !== undefined) {
                    this.tweenRopeArray[index].RopeTweenRemove();
                }
            }
        }
        if (this.currentLevel.tweenRuntimeRopeCount !== undefined) {
            for (let index = 0; index < this.currentLevel.tweenRuntimeRopeCount; index++) {
                if (this.currentLevel.tweenRuntimeRopeCount !== undefined) {
                    this.tweenRuntimeRopeArray[index].RunTimeRopeTweenRemove();
                }
            }
        }
        setTimeout(() => {
            // Server.PostGameLevelToParent(this.ConsumedTimeCalculateFunc(), this.level + 1, 'incomplete');
            PlayzhubEventHandler.UpdateGameLevel(this.ConsumedTimeCalculateFunc(), this.level + 1, 'incomplete');
        }, 1000);
        this.gameOverTimeoutLoose = setTimeout(() => {
            SoundManager.StopGameBgMusic();
            this.GameOverPopup.PopupAnimControl(true, 0);
        }, 1000);
    }
    //#endregion

    //#region -Level Success-  Chamaeleon CollisionDetect with Spider
    CheckGameOver() {
        if (!this.isGameOver) {
            this.isGameOver = true;
            console.log('CheckGameOver', this.isGameOver);
            console.log('spider Bubble', this.candy);
            if (this.currentLevel.bubblePosition != undefined && this.candy.texture.key === 'spiderBubble') {
                this.bubbleAnimArray.forEach(element => {
                    element.setAnimation(0, 'bubble_blast', false);
                });
                // this.bubbleAnim.setAnimation(0, 'bubble_blast', false);
            }
            if (this.currentLevel.obs1Position !== undefined) {
                for (let index = 0; index < this.currentLevel.obs1Count.length; index++) {
                    if (this.currentLevel.obs1Tween !== undefined) {
                        this.sharpEdgeObsArray[index].ObsTweenRemove();
                    }
                }
            }
            if (this.currentLevel.tweenRopeCount !== undefined) {
                for (let index = 0; index < this.currentLevel.tweenRopeCount; index++) {
                    if (this.currentLevel.tweenRopeCount !== undefined) {
                        this.tweenRopeArray[index].RopeTweenRemove();
                    }
                }
            }
            if (this.currentLevel.tweenRuntimeRopeCount !== undefined) {
                for (let index = 0; index < this.currentLevel.tweenRuntimeRopeCount; index++) {
                    if (this.currentLevel.tweenRuntimeRopeCount !== undefined) {
                        this.tweenRuntimeRopeArray[index].RunTimeRopeTweenRemove();
                    }
                }
            }

            this.quitPopup.PopupBaseAnimControl(false);
            this.gameOverTimeoutWin = setTimeout(() => {
                SoundManager.StopGameBgMusic();
                let levelTime = this.createBridge.formatTime(this.ConsumedTimeCalculateFunc());
                this.GameOverPopup.PopupAnimControl(true, this.starCount, this.level + 1, levelTime);
            }, 1000);
            setTimeout(() => {
                // console.log('CheckGameOver', this.starCount);
                if (this.stars[this.level] < this.starCount) {
                    const newAdditionScore = (this.starCount - this.stars[this.level]) * 10;
                    Constant.lifeTimescore += newAdditionScore;
                    console.log('Constant.lifeTimescore: ', Constant.lifeTimescore);
                }
                if (this.stars[this.level] > 3) {
                    this.stars[this.level] = 3;
                }
                this.stars[this.level] = Math.max(this.stars[this.level], this.starCount);
                console.log(this.stars[this.level], this.starCount);

                Constant.starsData[this.level] = this.stars[this.level];
                console.log('this.stars', this.stars, this.level, this.starCount);

                if (this.stars[this.level + 1] != undefined && this.stars[this.level + 1] == -1 && (this.level < 49)) {
                    this.stars[this.level + 1] = 0;
                    console.log("game completed................ if");
                    GA.GameAnalytics.addProgressionEvent(
                        "Complete",
                        "cut_it_right_level",
                        this.level,
                        undefined,
                        Constant.score
                    );

                    // Server.PostGameState(Constant.starsData, Constant.score, Constant.gameOptions);
                    PlayzhubEventHandler.GameStateUpdate(Constant.starsData, Constant.score, Constant.gameOptions);
                    // sendmessage(Constant.score);
                    // Server.PostGamePlayTimeToParent(this.ConsumedTimeCalculateFunc(), Constant.score);
                    // PlayzhubEventHandler.GameScoreUpdate(this.ConsumedTimeCalculateFunc(), Constant.score);
                    PlayzhubEventHandler.GameScoreUpdate(this.ConsumedTimeCalculateFunc(), Constant.lifeTimescore);
                    PlayzhubEventHandler.GameStateFetch(() => {
                    })
                    // Server.PostGameLevelToParent(this.ConsumedTimeCalculateFunc(), this.level + 1, 'complete');
                    PlayzhubEventHandler.UpdateGameLevel(this.ConsumedTimeCalculateFunc(), this.level + 1, 'complete');
                }
                else if (this.stars[this.level + 1] != undefined && this.stars[this.level + 1] == -1 && (this.level == 49)) {
                    console.log("game completed................ else");
                    GA.GameAnalytics.addProgressionEvent(
                        "Complete",
                        "cut_it_right_level",
                        this.level,
                        undefined,
                        Constant.score
                    );
                    // Server.PostGameState(Constant.starsData, Constant.score, Constant.gameOptions);
                    PlayzhubEventHandler.GameStateUpdate(Constant.starsData, Constant.score, Constant.gameOptions);
                    // sendmessage(Constant.score);
                    // Server.PostGamePlayTimeToParent(this.ConsumedTimeCalculateFunc(), Constant.score);
                    // PlayzhubEventHandler.GameScoreUpdate(this.ConsumedTimeCalculateFunc(), Constant.score);
                    PlayzhubEventHandler.GameScoreUpdate(this.ConsumedTimeCalculateFunc(), Constant.lifeTimescore);
                    // Server.PostGameLevelToParent(this.ConsumedTimeCalculateFunc(), this.level + 1, 'complete');
                    PlayzhubEventHandler.UpdateGameLevel(this.ConsumedTimeCalculateFunc(), this.level + 1, 'complete');

                    setTimeout(() => {
                        this.ResetGameState();
                    }, 20);
                } else if ((this.stars[this.level + 1] != undefined && (this.level < 49)) || (this.stars[this.level + 1] != undefined && (this.level == 49))) {
                    this.stars[this.level + 1] = 0;
                    // Server.PostGameLevelToParent(this.ConsumedTimeCalculateFunc(), this.level + 1, 'complete');
                    PlayzhubEventHandler.UpdateGameLevel(this.ConsumedTimeCalculateFunc(), this.level + 1, 'complete');
                } else {
                }
            }, 1000)

            // this.adHitFrom = 'complete';
            // setTimeout(() => {
            //     this.IncrementLevelAndShowAd();
            // }, 2200);
        }
    }

    ResetGameState() {
        const gameData = null;
        // Server.PostGameState(null, null, null);
        PlayzhubEventHandler.GameStateUpdate(null, null, null);
    }
    //#endregion
    ConsumedTimeCalculateFunc() {
        this.levelTimerEnd = Constant.timeToEnd;
        this.levelTime = this.levelTimerStart - this.levelTimerEnd;
        return this.levelTime;
    }
    //#region -  BubbleCollision Detect
    BubbleCollision() {
        this.candy.setOnCollideWith(this.ropeCutter.body, (body, collisionData) => {
            if (this.isCutting && this.candy.texture.key == 'spiderBubble') {
                this.candy.setTexture('spider').setScale(this.candy.scale);
                this.bubbleInstanceArray.forEach(element => {
                    if (element.bubbleIsAnim) {
                        this.bubbleAnimArray[element.bubbleIndex].copyPosition(this.candy);
                        this.bubbleAnimArray[element.bubbleIndex].setAnimation(0, 'bubble_blast', false);
                        element.bubbleIsAnim = false;
                    }
                });
                // this.bubbleAnim.copyPosition(this.candy);
                // this.bubbleAnim.setAnimation(0, 'bubble_blast', false);
                // this.bubbleAnim.setVisible(true);
                // this.matter.world.engine.gravity.y = Constant.clientWidth / 960;
                this.matter.world.engine.gravity.y = Constant.clientHeight / 1706;
                Constant.bulletSpeed = Constant.clientWidth / 60;
                console.log("candy bubble blast");
            }
        });
    }
    //#endregion

    RemoveCandyConstraint() {
        this.rope.forEach(element => {
            element.RemoveCandyConstraint();
        });
        this.mediumRuntimeRope.forEach(element => {
            element.RemoveCandyConstraint();
        });
    }

    //#region -  Resize
    resize(newWidth, newHeight, offsetWidth) {
        if (Constant.activeScene !== 'GameScene') {
            return;
        }
        let newScale = Utils.getScale(1080, 1920, newWidth, newHeight);
        this.currentScale = newScale;
        this.bg.SetDisplay(newWidth, newHeight);
        this.overlay.setDisplaySize(newWidth, newHeight);
        this.starBar.setScale(newScale);
        this.starBar.setPosition((newWidth / 2), 175 * newScale);
        for (let index = 0; index < this.sceneStarUiArray.length; index++) {
            const element = this.sceneStarUiArray[index];
            element.setScale(newScale);
            element.setPosition(this.starBar.x + (this.sceneStarUiPos[index].x * newScale), this.starBar.y + (this.sceneStarUiPos[index].y * newScale));
        }
        // this.tempStarText.SetScale(newScale);
        // this.tempStarText.setPosition(this.starBar.x + (30 * newScale), this.starBar.y);
        this.ropeCutter.setScale(newScale * 1.2, newScale * 0.8);
        this.candy.SetScale(newScale);
        this.candy.setMass(this.currentLevel.candyMass * newScale);

        this.candy.SetPosition(newWidth / 2 + this.currentLevel.candyPosition.x * newScale, newHeight / 2 + this.currentLevel.candyPosition.y * newScale);
        this.upperCollider.setScale(newScale * 2080, newScale * 200);
        this.upperCollider.SetPosition(newWidth / 2, -300 * newScale);
        this.lowerCollider.setScale(newScale * 2080, newScale * 200);
        this.lowerCollider.SetPosition(newWidth / 2, newHeight + 1000 * newScale);

        if (this.currentLevel.bubblePosition != undefined) {
            this.bubbleInstanceArray.forEach((element, index) => {
                element.Resize(newWidth, newHeight, newScale, index);
                this.bubbleAnimArray[index].setScale(newScale);
            });
            // this.bubbleInstance.Resize(newWidth, newHeight, newScale);
            // this.bubbleAnim.setScale(newScale);
        }
        if (this.currentLevel.obs1Position != undefined) {
            this.sharpEdgeObsArray.forEach((element, index) => {
                element.Resize(newWidth, newHeight, newScale, this.currentLevel.obs1Position, index, this.currentLevel.obs1Offset.x[index], this.currentLevel.obs1Offset.y[index]);
            });
        }
        for (let index = 0; index < this.rope.length; index++) {
            this.rope[index].Resize(newWidth, newHeight, newScale, index);
        }
        if (this.currentLevel.runtimeRopeCount != undefined) {
            for (let index = 0; index < this.currentLevel.runtimeRopeCount; index++) {
                this.runtimeRope[index].Resize(newWidth, newHeight, newScale, index, this.currentLevel.runtimeropeHeadPosition);
            }
        }
        if (this.currentLevel.tweenRopeCount != undefined) {
            for (let index = 0; index < this.currentLevel.tweenRopeCount; index++) {
                this.tweenRopeArray[index].Resize(newWidth, newHeight, newScale, index, this.currentLevel.tweenRopeHeadPosition);
            }
        }
        if (this.currentLevel.tweenRuntimeRopeCount != undefined) {
            for (let index = 0; index < this.currentLevel.tweenRuntimeRopeCount; index++) {
                this.tweenRuntimeRopeArray[index].Resize(newWidth, newHeight, newScale, index, this.currentLevel.tweenRuntimeRopeHeadPosition);
            }
        }
        if (this.currentLevel.runtimeRopeMediumCount != undefined) {
            for (let index = 0; index < this.currentLevel.runtimeRopeMediumCount; index++) {
                this.mediumRuntimeRope[index].Resize(newWidth, newHeight, newScale, index, this.currentLevel.runtimeropeMediumHeadPosition);
            }
        }
        if (this.currentLevel.runtimeRopeLargeCount != undefined) {
            for (let index = 0; index < this.currentLevel.runtimeRopeLargeCount; index++) {
                this.largeRuntimeRope[index].Resize(newWidth, newHeight, newScale, index, this.currentLevel.runtimeropeLargeHeadPosition);
            }
        }
        if (this.currentLevel.dragRopeCount != undefined) {
            for (let index = 0; index < this.currentLevel.dragRopeCount; index++) {
                this.dragRopeArray[index].Resize(newWidth, newHeight, newScale);
            }
        }
        if (this.currentLevel.runtimeSmallDragRopeCount != undefined) {
            for (let index = 0; index < this.currentLevel.runtimeSmallDragRopeCount; index++) {
                this.smallRuntimeDragRope[index].Resize(newWidth, newHeight, newScale);
            }
        }
        if (this.currentLevel.airgunCount != undefined) {
            this.airguns.forEach(element => {
                element.Resize(newWidth, newHeight, newScale);
            });
        }
        if (this.currentLevel.smallBouncerCount != undefined) {
            this.smallBouncyObjArray.forEach((element, index) => {
                element.Resize(newWidth, newHeight, newScale, this.currentLevel.smallBouncerConfig.x[index], this.currentLevel.smallBouncerConfig.y[index]);
            });
        }
        if (this.currentLevel.magicHatCount !== undefined) {
            this.magicHatArray.forEach(element => {
                element.Resize(newWidth, newHeight, newScale);
            });
        }
        this.pauseBut.SetScale(newScale);
        this.pauseBut.button.SetPosition(newWidth - 115 * newScale, 175 * newScale);
        this.soundBut.SetScale(newScale);
        this.soundBut.button.SetPosition(newWidth - 115 * newScale, 175 * newScale);
        this.replayBut.SetScale(newScale);
        this.replayBut.button.SetPosition(newWidth - 115 * newScale, 350 * newScale);
        this.adImg.SetScale(newScale);
        this.adImg.SetPosition(newWidth - 60 * newScale, 285 * newScale);
        this.backBut.SetScale(newScale);
        this.backBut.button.SetPosition(115 * newScale, 175 * newScale);
        if (!this.isGameOver) {
            this.starsInstance.Resize(newWidth, newHeight, newScale);
        }
        this.frogInstance.Resize(newWidth, newHeight, newScale);
        this.tutPopup.Resize(newWidth, newHeight, newScale);
        this.pausePopup.Resize(newWidth, newHeight, newScale);
        this.GameOverPopup.Resize(newWidth, newHeight, newScale);
        this.quitPopup.Resize(newWidth, newHeight, newScale);
        this.createBridge.resize(newWidth, newHeight, newScale);
        this.popupanimContainer.setScale(newScale);
        this.popupanimContainer.setPosition((newWidth / 2), (newHeight / 2));

        this.camera.setViewport(offsetWidth, 0, newWidth, newHeight);
    }
    //#endregion

    //#region -  update Call Each Frame
    update() {
        // if (this.currentLevel.bubblePosition != undefined) {
        //     this.bubbleAnim.copyPosition(this.candy);
        // }
        this.bubbleInstanceArray.forEach(element => {
            element.Onupdate();
        });
        this.rope.forEach(element => {
            element.Onupdate();
        });
        this.runtimeRope.forEach(element => {
            element.Onupdate();
        });
        this.mediumRuntimeRope.forEach(element => {
            element.Onupdate();
        });
        this.largeRuntimeRope.forEach(element => {
            element.Onupdate();
        });
        this.dragRopeArray.forEach(element => {
            element.Onupdate();
        });
        this.smallRuntimeDragRope.forEach(element => {
            element.Onupdate();
        });
        this.tweenRopeArray.forEach(element => {
            element.Onupdate();
        });
        this.tweenRuntimeRopeArray.forEach(element => {
            element.Onupdate();
        });
    }
    //#endregion
}