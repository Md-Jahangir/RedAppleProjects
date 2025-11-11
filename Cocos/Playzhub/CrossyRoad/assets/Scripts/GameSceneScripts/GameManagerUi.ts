import {
    _decorator, Animation, Button, Color, Component, director, instantiate, Label, Node, Prefab, ProgressBar, sp, Sprite, SpriteFrame, Tween, tween,
    TweenEasing, UIOpacity, UITransform, Vec3
} from 'cc';
import { GameManager } from './GameManager';
import { AudioManager } from '../AudioManager';
import { PlayzhubEventHandler } from '../PlayzhubEventHandler';
import { Constant } from '../Constant';
import GA from 'gameanalytics';

const { ccclass, property } = _decorator;

@ccclass('GameManagerUi')
export class GameManagerUi extends Component {
    @property(SpriteFrame)
    soundOnSprite: SpriteFrame = null!;
    @property(SpriteFrame)
    soundOffSprite: SpriteFrame = null!;
    @property(Label) coinCountText: Label = null!;
    @property(Label) distanceText: Label = null!;
    @property(Node) powerUpNode: Node = null!;

    @property(Button) SoundButon: Button = null!;

    @property(Node) quitPopup: Node = null!;
    @property(Node) respawnPopup: Node = null!;
    @property(ProgressBar) respawnTimeBar = null!;
    @property(Label) respawnTimerText = null!;
    @property(Node) gameOverPopup: Node = null!;

    @property(Node) gameNameImage: Node = null!;
    @property(Node) characterSelect: Node = null!;
    @property(Prefab) pcTutorialButtonsPrefab: Prefab = null!;
    pcTutorialButtonsNode: Node | null = null!;
    @property(Prefab) mobileTapTutorial: Prefab = null!;
    mobileTapTutorialNode: Node | null = null!;
    @property(Prefab) mobileSwipeTutorial: Prefab = null!;
    mobileSwipeTutorialNode: Node | null = null!;
    @property(Node) afterTutorialGameStartText: Node = null!;

    private isSoundOn: boolean = true;
    private powerUpBlinkTween: Tween<Node> | null = null;
    private respawnTween: Tween<ProgressBar> | null = null;
    protected onEnable(): void {
        // initial pos set
        // this.gameNameImage.setPosition(Vec3.ZERO);
        // this.gameNameImage.setScale(1, 1, 1);
        if (Constant.mode !== 'tutorial') return;
        const addNodeToParent = (prefab: Prefab, siblingIndex: number): Node => {
            const node = instantiate(prefab);
            node.active = false;
            node.setParent(this.node);
            node.setSiblingIndex(siblingIndex);
            return node;
        };
        if (Constant.isMobile) {
            this.mobileTapTutorialNode = addNodeToParent(this.mobileTapTutorial, 2);
            this.mobileSwipeTutorialNode = addNodeToParent(this.mobileSwipeTutorial, 3);
        } else {
            this.pcTutorialButtonsNode = addNodeToParent(this.pcTutorialButtonsPrefab, 2);
        }
    }

    start() {
        PlayzhubEventHandler.AdStarted(() => {
            GA.GameAnalytics.addDesignEvent("ad:started");
            PlayzhubEventHandler.GamePlayPaused();
            director.pause();
        })
        PlayzhubEventHandler.AdCompleted(() => {
            GA.GameAnalytics.addDesignEvent("ad:completed");
            PlayzhubEventHandler.GamePlayResumed();
            director.resume();
        })
    }

    //#region  Ui Pos Setup on Game Start
    ResetUiPos() {
        // Move these nodes to specific Y positions instantly
        ['BackButton', 'CoinBase', 'DistanceBase', 'SoundButton'].forEach(name => {
            const node = this.node.getChildByName(name);
            if (node) {
                node.setPosition(node.position.x, node.position.y + 200, node.position.z);
                // node.active = true;
            }
        });
        ['PowerUpBase'].forEach(name => {
            const node = this.node.getChildByName(name);
            if (node) {
                node.setPosition(node.position.x, node.position.y - 200, node.position.z);
                // node.active = true;
            }
        });
    }
    //#endregion

    //#region  CoinCountText Update
    UpdateCoinCountText(_CoinCount: string) {
        this.coinCountText.string = _CoinCount;
    }
    //#endregion

    //#region  Restart Button Func
    async RestartButFunc() {
        GA.GameAnalytics.addDesignEvent('ui:replay_clicked');
        // AudioManager.instance.ButtonClickSound();
        //in development please off next line
        // Request Ad -------------------------------------------------
        Constant.distance = 0;
        AudioManager.instance = null;
        GameManager.instance = null;
        director.loadScene("GameScene");
    }
    //#endregion

    //#region  SoundButFunc
    SoundButFunc() {
        GA.GameAnalytics.addDesignEvent('ui:sound_clicked');
        this.isSoundOn = !this.isSoundOn;
        const newSprite = this.isSoundOn ? this.soundOnSprite : this.soundOffSprite;
        this.SoundButon.normalSprite = newSprite;
        AudioManager.instance.ButtonClickSound();
        AudioManager.instance.SetMute();
    }
    //#endregion

    //#region  PowerUpDataUpdate on Ui
    UpdatePowerUpData(_power: number): void {
        const progressBar = this.powerUpNode.getComponent(ProgressBar);
        const button = this.powerUpNode.getChildByName("PowerUpButton");
        const labelNode = button?.getChildByName("Label");
        const logoNode = this.powerUpNode.getChildByName("PowerUpLogo");

        if (!progressBar || !button || !labelNode || !logoNode) {
            console.warn("Power-up UI elements missing.");
            return;
        }

        const label = labelNode.getComponent(Label);
        const buttonSprite = button.getComponent(Sprite);
        const buttonComp = button.getComponent(Button);

        // Update UI values
        progressBar.progress = _power / 100;
        if (label) label.string = `${_power} %`;
        const isPowerReady = _power >= 100;
        if (label) label.enabled = !isPowerReady;
        logoNode.active = !isPowerReady;
        if (buttonSprite) buttonSprite.enabled = isPowerReady;
        if (buttonComp) buttonComp.interactable = isPowerReady;
        if (isPowerReady) {
            this.PowerUpActivatedPopUp();

            if (!this.powerUpBlinkTween) {
                this.powerUpBlinkTween = tween(button)
                    .repeatForever(
                        tween()
                            .to(0.4, { scale: new Vec3(1.1, 1.1, 1) })
                            .to(0.4, { scale: new Vec3(1.0, 1.0, 1) })
                    )
                    .start();

                this.scheduleOnce(() => this.PoowerUpButtonFunc(), 1);
            }
        } else {
            if (this.powerUpBlinkTween) {
                tween(button).stop();
                button.setScale(new Vec3(1, 1, 1));
                this.powerUpBlinkTween = null;
            }
        }
    }
    //#endregion

    PoowerUpButtonFunc() {
        AudioManager.instance.ButtonClickSound();
        GameManager.instance.ResetPowerCount();
    }

    //#region  PowerUpBlink Func
    PowerUpBlinkTweenStop(): void {
        const button = this.powerUpNode.getChildByName("PowerUpButton");
        if (this.powerUpBlinkTween) {
            this.powerUpBlinkTween.stop();
            this.powerUpBlinkTween = null;
            button.setScale(1, 1, 1); // Reset scale
        }
        this.powerUpNode.getChildByName("PowerUpLogo").active = true;
        button.getChildByName("Label").getComponent(Label).string = "0 %";
        button.getChildByName("Label").getComponent(Label).enabled = true;
        button.getComponent(Button).interactable = false;
        button.getComponent(Sprite).enabled = false;
        this.powerUpNode.getComponent(ProgressBar).progress = 0;
    }
    //#endregion

    //#region  UpdateDistance Ui
    UpdateDistanceData(_distance: string) {
        this.distanceText.string = _distance;
    }
    //#endregion

    //#region  BackButton Func
    async BackButtonFunc() {
        GA.GameAnalytics.addDesignEvent('ui:back_clicked');
        AudioManager.instance.ButtonClickSound();
        await GameManager.instance.ShowAd();
        this.quitPopup.active = true;
        this.respawnPopup.active = false;
        this.gameOverPopup.active = false;
    }
    //#endregion

    //#region  QuitPopup Func
    QuitPopupYesButFunc() {
        GA.GameAnalytics.addDesignEvent('ui:quit_yes_clicked');
        const currentTimeStamp = Date.now();
        const finalTime = currentTimeStamp - Constant.gameStartTime;

        PlayzhubEventHandler.GameStateFetch(() => {
            PlayzhubEventHandler.GameScoreUpdate((finalTime / 1000).toString(), (Constant.distance).toString());
        });
        const highScoreData = JSON.stringify({
            'highScore': Constant.highScore.toString()
        });
        PlayzhubEventHandler.GameStateUpdate(highScoreData);
        AudioManager.instance.ButtonClickSound();
        // setTimeout(() => {
        // }, 500);
        GameManager.instance.RestartGame();
    }
    QuitPopupNoButFunc() {
        GA.GameAnalytics.addDesignEvent('ui:quit_no_clicked');
        AudioManager.instance.ButtonClickSound();
        this.quitPopup.active = false;
    }
    //#endregion

    //#region  RespawnPopup Func
    ShowHideRespawnPopup(_isShow: boolean, _distance: number = Constant.distance) {
        if (_isShow) {
            this.respawnTimeBar.progress = 1;
            this.quitPopup.active = false;
            this.RespawnCountDownControl();
        }
        this.gameOverPopup.getChildByName("ScoreText").getComponent(Label).string = _distance.toString();
        this.respawnPopup.active = _isShow;
    }
    async RespawnButtonFunc() {
        GA.GameAnalytics.addDesignEvent('ui:respawn_clicked');
        AudioManager.instance.ButtonClickSound();
        //in development please off next line
        // Request Ad -------------------
        this.quitPopup.active = false;
        this.ShowHideRespawnPopup(false);
        this.respawnTimeBar.progress = 1;
        this.ProperStopRespawnCountDown();
        GameManager.instance.RespawnPlayer();
    }
    RespawnCountDownControl() {
        const totalTime = 8;
        let timeLeft = totalTime;
        // Set initial text
        this.respawnTimerText.string = `${timeLeft}`;
        // Schedule countdown text update every 1 second
        this.schedule(() => {
            timeLeft--;
            this.respawnTimerText.string = `${timeLeft}`;
            if (timeLeft <= 0) {
                this.unscheduleAllCallbacks(); // Stop the timer
            }
        }, 1, totalTime - 1); // Run 7 times after the first (8 → 1)
        this.respawnTween = tween(this.respawnTimeBar)
            .to(8, { progress: 0 })
            .call(() => {
                if (this.respawnPopup.active) {
                    if (GameManager.instance) {
                        this.ProperStopRespawnCountDown();
                        this.GameOverPopUpShowFunc();
                    }
                }
            })
            .start();
    }
    ProperStopRespawnCountDown() {
        this.unscheduleAllCallbacks();
        if (this.respawnTween) {
            this.respawnTween.stop();
            this.respawnTween = null;
        }
        this.respawnTimeBar.progress = 1;
        const totalTime = 8;
        let timeLeft = totalTime;
        // Set initial text
        this.respawnTimerText.string = `${timeLeft}`;
    }
    //#endregion

    //#region GameOverPopup Func
    GameOverPopUpShowFunc(_distance?: number) {
        if (!GameManager.instance) return;
        GA.GameAnalytics.addDesignEvent('ui:no_thanks_clicked');
        if (_distance != null) {
            const scoreText = this.gameOverPopup.getChildByName("ScoreText")?.getComponent(Label);
            if (scoreText) {
                scoreText.string = _distance.toString();
            }
        }
        if (this.respawnTween) {
            this.respawnTween.stop();
            this.respawnTween = null;
        }
        this.ShowHideRespawnPopup(false);
        this.respawnTimeBar.progress = 1;
        this.quitPopup.active = false;
        this.gameOverPopup.active = true;
    }
    //#endregion

    //#region  Ui Anim Control Func
    GameStartUiAnimControl() {
        const duration = 1.2;
        const easing = 'backInOut';
        GameManager.instance.CamDataSet();
        this.ResetUiPos();
        // === Animate gameNameImage (X + Y move) ===
        const gameNameTargetPos = new Vec3(960, this.gameNameImage.getPosition().y - 200, this.gameNameImage.getPosition().z);
        tween(this.gameNameImage)
            .to(duration, { position: gameNameTargetPos }, {
                easing,
                // onComplete: () => {
                //     GameManager.instance.CamDataSet();
                // }
            })
            .start();

        // === Fade out characterSelect (dissolve) ===
        let opacity = this.characterSelect.getComponent(UIOpacity);
        if (!opacity) {
            opacity = this.characterSelect.addComponent(UIOpacity);
        }
        opacity.opacity = 255;

        tween(opacity)
            .to(duration, { opacity: 0 }, {
                easing: 'fade',
                onComplete: () => {
                    this.gameNameImage.active = false;
                    this.characterSelect.active = false;
                }
            })
            .start();

        // === Shared function to tween Y offset ===
        const tweenNodeY = (name: string, offsetY: number, ease: TweenEasing = 'backOut') => {
            const node = this.node.getChildByName(name);
            if (!node) return;
            // node.active = true;
            node.setScale(1, 1, 1);
            const startPos = node.getPosition();
            const targetPos = new Vec3(startPos.x, startPos.y + offsetY, startPos.z);

            tween(node)
                .to(1.5, { position: targetPos }, { easing: ease as TweenEasing }) // ✅ cast to proper type
                .start();
        };

        // === Move up/down UI nodes ===
        ['BackButton', 'CoinBase', 'DistanceBase', 'SoundButton'].forEach(name => tweenNodeY(name, -200));
        ['PowerUpBase'].forEach(name => tweenNodeY(name, 200));
        this.scheduleOnce(() => {
        }, 5);
    }
    GameNameAnim() {
        const duration = 1.5;
        const easing: TweenEasing = 'backInOut';
        const node = this.gameNameImage;
        if (!node || !this.characterSelect) return;
        node.setPosition(Vec3.ZERO);
        const startPos = node.getPosition();
        const endPos = new Vec3(startPos.x, startPos.y + 400, startPos.z);
        tween(node)
            .to(duration, { position: endPos }, { easing })
            .call(() => {
                this.node.getChildByName("SplashBgGameScene").getComponent(Button).interactable = false;
                const charNode = this.characterSelect;
                charNode.active = true;
                const anim = charNode.getChildByName("Arrow")?.getComponent(Animation);
                anim?.play();
            })
            .start();
    }
    //#endregion

    //#region Tutorial Button Func
    TutorialButtonAnim(_direction: string) {
        this.pcTutorialButtonsNode.active = true;
        this.pcTutorialButtonsNode.getComponent(Animation).play(_direction);
    }
    TutorialButtonVisibleOff() {
        // Traverse all direct and nested children
        this.pcTutorialButtonsNode.active = false;
        this.pcTutorialButtonsNode.children.forEach(child => {
            this.DisableAnimationsRecursively(child);
        });
    }
    private DisableAnimationsRecursively(node: Node): void {
        const anim: Animation = node.getComponent(Animation);
        if (anim) {
            anim.stop();
            node.setScale(Vec3.ONE);
            node.getComponent(Sprite).color = Color.WHITE;
            anim.enabled = false;
        }
    }
    //#endregion

    //#region  Mobile Anim Tutorial 
    TutorialMobileAnim(_direction: string) {
        if (_direction === "TapTutorial") {
            this.mobileTapTutorialNode.active = true;
            const tapSpine = this.mobileTapTutorialNode.getChildByName("TapSpine")?.getComponent(sp.Skeleton);
            if (tapSpine) {
                tapSpine.setAnimation(0, "click", true);
            }
            const tapAnim = this.mobileTapTutorialNode.getComponent(Animation);
            if (tapAnim) {
                tapAnim.play();
            }

        } else {
            this.mobileSwipeTutorialNode.active = true;
            const swipeAnim = this.mobileSwipeTutorialNode.getComponent(Animation);
            if (swipeAnim) {
                swipeAnim.play(_direction);  // `_direction` is expected to match an animation clip name
            }
            // console.log(_direction);
        }
    }
    MobileTutorialOff() {
        // Disable swipe tutorial
        this.mobileSwipeTutorialNode.active = false;
        const swipeAnim = this.mobileSwipeTutorialNode.getComponent(Animation);
        if (swipeAnim) {
            swipeAnim.stop();
            swipeAnim.enabled = false;
        }
        // Disable tap tutorial
        this.mobileTapTutorialNode.active = false;
        const tapSpine = this.mobileTapTutorialNode.getChildByName("TapSpine")?.getComponent(sp.Skeleton);
        if (tapSpine) {
            tapSpine.clearAnimation(0);
        }
        const tapAnim = this.mobileTapTutorialNode.getComponent(Animation);
        if (tapAnim) {
            tapAnim.stop();
            tapAnim.enabled = false;
        }
    }
    //#endregion

    //#region Powerup Popup Func
    PowerUpActivatedPopUp() {
        const animateNode = (node: Node, targetPos: Vec3) => {
            node.setScale(new Vec3(0, 0, 0));
            node.setPosition(Vec3.ZERO);
            node.active = true;
            tween(node)
                .to(1, { scale: Vec3.ONE, position: targetPos }, { easing: 'backOut' })
                .delay(1.5)
                .call(() => {
                    tween(node)
                        .to(0.8, { scale: new Vec3(0, 0, 0), position: Vec3.ZERO }, { easing: 'backIn' })
                        .call(() => {
                            node.active = false;
                        })
                        .start();
                })
                .start();
        };

        const powerUpText = this.powerUpNode.getChildByName('Power_Up_activated_Text');
        const thunderLogo = this.powerUpNode.getChildByName('thunder');
        const uiTransform = this.node.getComponent(UITransform);

        const canvasWidth = uiTransform.contentSize.x;
        const canvasHeight = uiTransform.contentSize.y;
        if (powerUpText) animateNode(powerUpText, new Vec3((-435 * canvasWidth) / 1080, (1400 * canvasHeight) / 1920, 0));
        if (thunderLogo) animateNode(thunderLogo, new Vec3((-435 * canvasWidth) / 1080, (1200 * canvasHeight) / 1920, 0));
    }
    //#endregion

    //#region  Game Start Text tween(tutorial)
    AfterTutorialGameStartTextTween() {
        this.afterTutorialGameStartText.setPosition(new Vec3(-1200, 300, 0)); // Optional: start off-screen
        tween(this.afterTutorialGameStartText)
            .to(0.75, { position: new Vec3(0, 150, 0) }, { easing: 'quadOut' })  // Move to center
            .delay(2)                                                         // Stay for 1 second
            .to(0.75, { position: new Vec3(1200, 0, 0) }, { easing: 'quadIn' }) // Move out right
            .start();
    }
    //#endregion
}


