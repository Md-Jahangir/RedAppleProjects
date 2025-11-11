
import {
    _decorator, Camera, Component, director, EventTouch, geometry, Input, input, instantiate,
    Node, PhysicsSystem, Prefab, tween, UIOpacity, Vec2, Vec3, Tween, ParticleSystem
} from 'cc';
import { CameraScript } from './CameraScript';
import { Constant } from '../Constant';
import { PlayerScript } from './PlayerScript';
import { RepeatingSetScript } from './RepeatingSetScript';
import { GameManagerUi } from './GameManagerUi';
import { AudioManager } from '../AudioManager';
import { Server } from '../Server';
import { PlayzhubEventHandler } from '../PlayzhubEventHandler';
import { AssetLoader } from '../AssetLoader';
import { AdManager } from '../AdManager';
import GA from 'gameanalytics';

const { ccclass, property } = _decorator;

interface TutorialStep {
    step: number;
    direction: Vec3;
}

@ccclass('GameManager')
export class GameManager extends Component {
    public static instance: GameManager | null = null;

    @property(Node) UiManager: Node = null!;
    @property(Node) splashBg: Node = null!;
    @property(Node) cameraNode: Node = null!;
    @property(Prefab) repeatSet: Prefab = null!;
    @property([Prefab]) characterPrefabs: Prefab[] = [];

    private characters: Node[] = [];
    private player: Node | null = null;
    private repeatingSetsPool: Node[] = [];
    private nextRepeatingSetPosZ: number = 52;
    private _lastSpeedIncreaseAt: number = 0;
    scoreArray: number[] = [];
    highScore3DText: Prefab[] | null = [];

    isStart: boolean = false;
    isPause: boolean = false;
    isFollow: boolean = false;
    isTutorial: boolean = false;
    isPowerUpActivated: boolean = false;
    powerUpStartDistance: number | null = null;
    countRepeatSet: number = 0;
    coinCount: number = 0;
    powerCount: number = 0;
    playerPos: Vec3 = new Vec3();
    tutorialPath: TutorialStep[];

    private _currentAnimIndex: number = 0;
    private _sequenceTimer: number = null!;
    private animSequence: number[] = [3, 1, 0, 2, 4];
    private _activeTween: Tween<Node> | null = null;

    onEnable(): void {
        if (!GameManager.instance) {
            GameManager.instance = this;
        } else {
            this.destroy(); // Keep singleton strict
        }
    }

    onLoad(): void {
        input.on(Input.EventType.TOUCH_START, this.OnTouchStart, this);
        Constant.gameStartTime = Date.now();
        if (Constant.mode === 'tutorial') {
            this.isTutorial = true;
            this.TutorialPathLoad();
        }
    }

    start(): void {
        GA.GameAnalytics.addProgressionEvent(
            "Start",
            "cross_n_dash_endless"
        );
        this.PreGameAssetsInstantiate();
        this.PreRepeatingSetsCreation();
    }

    //#region Tutorial PreDefine Path set
    TutorialPathLoad(): void {
        this.tutorialPath = [
            { step: 0, direction: new Vec3(0, 0, 1) },
            { step: 1, direction: new Vec3(0, 0, 1) },
            { step: 2, direction: new Vec3(0, 0, 1) },
            { step: 3, direction: new Vec3(0, 0, 1) },
            { step: 4, direction: new Vec3(0, 0, 1) },
            { step: 5, direction: new Vec3(0, 0, 1) },
            { step: 6, direction: new Vec3(0, 0, 1) },
            { step: 7, direction: new Vec3(1, 0, 0) },
            { step: 8, direction: new Vec3(0, 0, 1) },
            { step: 9, direction: new Vec3(0, 0, 1) },
            { step: 10, direction: new Vec3(-1, 0, 0) },
            { step: 11, direction: new Vec3(0, 0, 1) },
            { step: 12, direction: new Vec3(0, 0, 1) },
            { step: 13, direction: new Vec3(0, 0, -1) },
            { step: 14, direction: new Vec3(0, 0, 1) },
            { step: 15, direction: new Vec3(0, 0, 1) },
            { step: 16, direction: new Vec3(0, 0, 1) },
            { step: 17, direction: new Vec3(0, 0, 1) },
            { step: 18, direction: new Vec3(0, 0, 1) },
            { step: 19, direction: new Vec3(0, 0, 1) },
            { step: 20, direction: new Vec3(0, 0, 1) },
            { step: 21, direction: new Vec3(0, 0, 1) },
            { step: 22, direction: new Vec3(0, 0, 1) },
            { step: 23, direction: new Vec3(0, 0, 1) },
            { step: 24, direction: new Vec3(0, 0, 1) },
            { step: 25, direction: new Vec3(0, 0, 1) },
            { step: 26, direction: new Vec3(0, 0, 1) },
            { step: 27, direction: new Vec3(0, 0, 1) },
            { step: 28, direction: new Vec3(0, 0, 1) },
        ];
    }
    //#endregion

    //#region  HighScore3D Text add

    async HighScore3DTextLoad(): Promise<void> {
        // const highScoreStr = localStorage.getItem("highscore");
        // const highScoreStr = Constant.highScore;
        const highScore = Constant.highScore;
        if (highScore <= 0) return;

        this.scoreArray = Array.from(highScore.toString(), Number);

        const topScorePrefab = await AssetLoader.LoadAsset("HighScore3DTextPrefab", "top_score", Prefab) as Prefab;
        this.highScore3DText.push(topScorePrefab);

        const digitPromises: Promise<Prefab>[] = this.scoreArray.map(digit =>
            AssetLoader.LoadAsset("HighScore3DTextPrefab", `text_${digit}`, Prefab) as Promise<Prefab>
        );

        const digitPrefabs: Prefab[] = await Promise.all(digitPromises);
        this.highScore3DText.push(...digitPrefabs);

        await this.InitializeTopScore(highScore);
    }

    async InitializeTopScore(highScore: number): Promise<void> {
        const baseZ = this.player.getPosition().z + highScore * 5;

        let xOffset = 0;
        for (let i = 0; i < this.highScore3DText.length; i++) {
            const prefab = this.highScore3DText[i];
            const node = instantiate(prefab);

            if (i > 0) xOffset -= 1.5;

            node.setParent(this.node);
            node.setPosition(new Vec3(xOffset, 0.5, baseZ));
        }
    }
    //#endregion

    //#region GameStart OnTouch
    OnTouchStart(event: EventTouch) {
        this.CheckRaycast(event.getLocation());
    }
    //#endregion

    //#region RayCastCheck Fort player selection
    CheckRaycast(screenPos: Vec2): void {
        const camera = this.cameraNode.getComponent(Camera);
        if (!camera) return;

        const ray = geometry.Ray.create(0, 0, 0, 0, 0, 0);
        camera.screenPointToRay(screenPos.x, screenPos.y, ray);

        if (PhysicsSystem.instance.raycast(ray)) {
            const result = PhysicsSystem.instance.raycastResults.find(hit =>
                this.characters.some(char => char === hit.collider.node)
            );

            if (result && result.collider.node !== this.player) {
                input.off(Input.EventType.TOUCH_START, this.OnTouchStart, this);
                this.SwapPlayer(result.collider.node);
                this.StopLoopedCharacterAnimation();
            } else if (!this.isStart) {
                // this.isStart = true;
                input.off(Input.EventType.TOUCH_START, this.OnTouchStart, this);
                this.StartUiAnim();
                this.StopLoopedCharacterAnimation();
                Server.NumberOfPlayButtonClickedIncreament();
                PlayzhubEventHandler.GamePlayStarted(Server.numberOfPlayButtonClicked);
                // AudioManager.instance.GameStartSound();
            }
        }
    }

    SwapPlayer(newPlayer: Node): void {
        if (!this.player || this.player === newPlayer) return;

        const oldPlayer = this.player;
        this.DisablePlayer(oldPlayer);
        this.EnablePlayer(newPlayer, false);
        this.player = newPlayer;

        this.StartUiAnim();
        Server.NumberOfPlayButtonClickedIncreament();
        PlayzhubEventHandler.GamePlayStarted(Server.numberOfPlayButtonClicked);
    }
    //#endregion

    // Helper function to round Vec3 values
    // private RoundVec3(pos: Vec3): Vec3 {
    //     return new Vec3(
    //         Math.round(pos.x),
    //         Math.round(pos.y),
    //         Math.round(pos.z)
    //     );
    // }

    //#region Initial Assets Instantiate
    PreGameAssetsInstantiate(): void {
        if (Constant.mode === "tutorial") {
            this.cameraNode.getComponent(CameraScript)?.CamSpeedControlForTutorial(0);
        }
        this.characters = this.characterPrefabs.map(prefab => {
            const character = instantiate(prefab);
            character.setParent(director.getScene());
            return character;
        });

        this.player = this.characters[0];
        this.HighScore3DTextLoad();
        this.StartLoopedCharacterAnimation();
        this.playerPos = this.player.getPosition();
        this.EnablePlayer(this.player, true);
    }
    //#endregion

    //#region Character Selection anim Control
    StartLoopedCharacterAnimation(): void {
        if (!this.characters?.length) return;

        this._currentAnimIndex = 0;

        const playNext = () => {
            const charIndex = this.animSequence[this._currentAnimIndex];
            const character = this.characters[charIndex];
            if (!character) return;

            const originalPos = character.getPosition();
            const upPos = originalPos.clone().add3f(0, 1, 0);
            const downPos = originalPos.clone(); downPos.y = 0;

            this._activeTween = tween(character)
                .to(0.25, { position: upPos }, { easing: 'sineInOut' })
                .to(0.15, { position: downPos }, { easing: 'linear' })
                .call(() => {
                    character.eulerAngles = new Vec3(0, 0, 0);
                    this._currentAnimIndex = (this._currentAnimIndex + 1) % this.animSequence.length;
                    this._sequenceTimer = setTimeout(playNext, 400);
                });

            this._activeTween.start();
        };

        playNext(); // Start the loop
    }
    StopLoopedCharacterAnimation(): void {
        if (this._sequenceTimer !== null) {
            clearTimeout(this._sequenceTimer);
            this._sequenceTimer = null;
        }

        if (this._activeTween) {
            this._activeTween.stop();
            this._activeTween = null;
        }
    }
    //#endregion

    //#region  Player Enable and Disable Handle
    EnablePlayer(player: Node, isCamSet?: boolean): void {
        // this.HighScore3DTextLoad();
        const controller = player.getComponent(PlayerScript);
        if (controller) {
            controller.enabled = true;
            controller.start();
        }
        this.cameraNode.getComponent(CameraScript)?.AssignCurrentPlayer(player, isCamSet);
    }

    DisablePlayer(player: Node): void {
        const controller = player.getComponent(PlayerScript);
        if (controller) {
            controller.enabled = false;
            controller.onDestroy();
        }
    }
    //#endregion

    //#region  Initial SetInstantiate
    PreRepeatingSetsCreation(): void {
        for (let i = 0; i < 3; i++) {
            this.CreateAndPlaceRepeatSet();
        }
    }
    //#endregion

    //#region SetRepeat Handle Func
    HandleRepeatSet(): void {
        const firstSet = this.repeatingSetsPool.shift();
        if (firstSet?.isValid) {
            firstSet.removeFromParent();
            firstSet.destroy();
        }
        this.CreateAndPlaceRepeatSet();
    }
    private CreateAndPlaceRepeatSet(): void {
        const repeatSetInstance = instantiate(this.repeatSet);
        repeatSetInstance.setParent(director.getScene());
        repeatSetInstance.setPosition(30, -0.5, this.nextRepeatingSetPosZ);
        repeatSetInstance.getComponent(RepeatingSetScript)?.SetPosition(30, -0.5, this.nextRepeatingSetPosZ);

        this.nextRepeatingSetPosZ += 50;
        this.repeatingSetsPool.push(repeatSetInstance);
    }
    //#endregion

    //#region GameOver Func
    async GameOverFunc(_byCam?: string): Promise<void> {
        GA.GameAnalytics.addProgressionEvent(
            "Complete",
            "cross_n_dash_endless",
            undefined,
            undefined,
            Constant.distance
        );

        GA.GameAnalytics.addDesignEvent("score:cross_n_dash", Constant.distance);
        if (!this.isFollow) return;
        const ui = this.UiManager.getComponent(GameManagerUi);
        if (_byCam !== 'camera') {
            this.isFollow = false;
        }
        this.GetPlayerLastPos();
        const playerScript = this.player?.getComponent(PlayerScript);
        const distance: number = playerScript?.GetPlayerStepCount() ?? 0;
        Constant.distance = distance;
        this.SetHighScore(distance);
        playerScript?.PlayerFunctionalityControl(false);
        const camZSpeed = this.cameraNode.getComponent(CameraScript).GetCamSpeed();
        // Restart tutorial if camera speed is low
        if (camZSpeed < 30) {
            if (!GameManager.instance) return;
            Constant.mode = 'tutorial';
            ui?.RestartButFunc();
            return;
        }
        // Track game duration
        const currentTimeStamp = Date.now();
        const finalTime = currentTimeStamp - Constant.gameStartTime;
        // Send score update
        PlayzhubEventHandler.GameScoreUpdate(
            (finalTime / 1000).toString(),
            Constant.distance.toString()
        );
        const highScoreData = JSON.stringify({
            'highScore': Constant.highScore.toString()
        });
        PlayzhubEventHandler.GameStateUpdate(highScoreData);
        // Delay game over logic by 2 seconds
        setTimeout(async () => {
            await this.ShowAd();
            if (!GameManager.instance) return;
            if (_byCam === 'camera') {
                this.isFollow = false;
            }
            Constant.mode = 'easy';
            AudioManager.instance.GameOverSound();
            if (this.coinCount >= 2) {
                ui?.ShowHideRespawnPopup(true, distance);
            } else {
                ui?.GameOverPopUpShowFunc(distance);
            }
        }, 2000);
    }

    //#endregion

    //#region  RestartGameFunc
    RestartGame(): void {
        setTimeout(() => {
            if (!GameManager.instance) return;
            const ui = this.UiManager.getComponent(GameManagerUi);
            ui?.RestartButFunc();
            GameManager.instance = null;
        }, 1000);
    }
    //#endregion

    //#region  PlayerDistanceUpdate Every Move
    PlayerDistanceUpdate(distance: number): void {
        const ui = this.UiManager.getComponent(GameManagerUi);
        const camScript = this.cameraNode.getComponent(CameraScript);
        // Handle Power-Up Distance Expiry
        if (this.isPowerUpActivated && this.powerUpStartDistance + 10 === distance) {
            this.powerCount = 0;
            this.isPowerUpActivated = false;
            this.powerUpStartDistance = null;
            ui?.PowerUpBlinkTweenStop();
        }
        // Update UI Distance
        ui?.UpdateDistanceData(distance.toString());
        // End Tutorial at Distance 23
        if (distance === 23 && this.isTutorial) {
            this.isTutorial = false;
            camScript?.CamSpeedControlForTutorial(30);
        }
        // Difficulty Progression
        if (distance === 60) {
            Constant.mode = "medium";
            camScript?.IncreaseSpeed();
        } else if (distance === 150) {
            Constant.mode = "hard";
            camScript?.IncreaseSpeed();
        }
        // Dynamic Speed Scaling After 250
        if (distance >= 250 && distance - this._lastSpeedIncreaseAt >= 100) {
            if (Constant.speedRatio < 2.5) {
                Constant.speedRatio = Math.min(Constant.speedRatio + 0.1, 2.5);
                // Only increase camera speed while ratio <= 2.0
                if (Constant.speedRatio <= 2.0) {
                    camScript?.IncreaseSpeed();
                }
                this._lastSpeedIncreaseAt = distance;
                console.log("Speed ratio:", Constant.speedRatio);
            }
        }
    }
    //#endregion

    //#region  Player Pos Data
    SetPlayerLastPos(pos: Vec3): void {
        this.playerPos = pos;
    }
    GetPlayerLastPos(): Vec3 {
        return this.playerPos = this.player?.getComponent(PlayerScript)?.GetPlayerLastPos() ?? this.playerPos;
    }
    //#endregion

    //#region  Respawn Player Func
    RespawnPlayer(): void {
        this.coinCount -= 2;
        const ui = this.UiManager.getComponent(GameManagerUi);
        ui?.UpdateCoinCountText(this.coinCount.toString());
        // this.player.setScale(Vec3.ZERO);
        this.player.children[0].active = false;
        this.splashBg.active = true;
        this.ResetPowerCount();
        this.FadeOutAndDeactivate(this.splashBg, 1, () => {
            if (!this.player) return;
            let safePos = this.findSafeRespawnPos(this.playerPos.z) ?? new Vec3(0, 0, this.playerPos.z + 10);
            console.log("after respawn player safe pos set", safePos);
            // this.ResetPowerCount();
            this.powerCount = 0;
            this.isPowerUpActivated = false;
            this.powerUpStartDistance = null;
            ui?.PowerUpBlinkTweenStop();
            this.player.setPosition(safePos);
            this.player.setScale(Vec3.ONE);
            this.player.children[0].active = true;
            this.EnablePlayer(this.player, true);
            this.player.getComponent(PlayerScript)?.PlayerFunctionalityControl(true);
            this.isFollow = true;
            this.isStart = true;
        });
    }
    private findSafeRespawnPos(baseZ: number): Vec3 | null {
        const maxSteps = 25;
        const rayHeight = 1;
        const maxDistance = 2;

        for (let i = 0; i <= maxSteps; i += 5) {
            const testZ = baseZ + i;
            // console.log(testZ);
            const testPos = new Vec3(0, rayHeight, testZ);

            // Cast a ray downward
            const ray = geometry.Ray.create(testPos.x, testPos.y, testPos.z, 0, -1, 0);
            PhysicsSystem.instance.raycastResults.length = 0;

            if (PhysicsSystem.instance.raycast(ray, 0xffffffff, maxDistance)) {
                const hits = PhysicsSystem.instance.raycastResults;

                // ✅ check for log
                const hasLog = hits.some(hit => hit.collider.node.name === "log");

                // ✅ check for safe ground (not water, not log, not blocked obstacle)
                const blocked = this.checkRaycastBlock(
                    new Vec3(0, 0, 1),
                    new Vec3(testPos.x, testPos.y, testPos.z - 5)
                );

                let hasGround = false;
                if (!blocked) {
                    hasGround = hits.some(hit => {
                        const name = hit.collider.node.name;
                        return name !== "water" && name !== "log";
                    });
                }

                // If safe (either ground or log), return this position
                if (hasLog || hasGround) {
                    return new Vec3(0, 0, testZ);
                }
            }
        }
        return null; // No safe position found
    }
    public checkRaycastBlock(direction: Vec3, origin: Vec3): boolean {
        const ray = geometry.Ray.create(
            origin.x, origin.y + 0.5, origin.z,
            direction.x, direction.y, direction.z
        );

        const maxDistance = 5;
        const blockedNames = ["Mushroom", "sign_board", "tree", "rock", "Signal"];
        PhysicsSystem.instance.raycastResults.length = 0;

        if (PhysicsSystem.instance.raycast(ray, 0xffffffff, maxDistance)) {
            return PhysicsSystem.instance.raycastResults.some(hit => {
                const name = hit.collider.node.name;
                return blockedNames.indexOf(name) !== -1;
            });
        }

        return false;
    }
    //#endregion

    //#region  Start Game Func
    StartGameFunctionality(): void {
        this.countRepeatSet++;
        if (this.countRepeatSet === 2) {
            if (Constant.mode === 'tutorial') {
                Constant.mode = "easy";
            }
            this.UiManager.getComponent(GameManagerUi).GameNameAnim();
            this.scheduleOnce(() => { Constant.speedRatio = 1; }, 4);
            this.splashBg.active = true;
            this.FadeOutAndDeactivate(this.splashBg, 2, () => {
                // this.isFollow = true;
            });
        }
    }
    //#endregion

    //#region Collect Func
    CoinCountUpdate(): void {
        this.coinCount++;
        const ui = this.UiManager.getComponent(GameManagerUi);
        ui?.UpdateCoinCountText(this.coinCount.toString());
    }
    PowerCollect(): void {
        if (++this.powerCount > 4 || this.isPowerUpActivated) return;
        const camSpeed = this.cameraNode.getComponent(CameraScript)?.GetCamSpeed() ?? 0;
        const ui = this.UiManager.getComponent(GameManagerUi);
        const fillAmount = camSpeed < 30 ? 100 : 25;
        console.log(this.powerCount, "power count");

        ui?.UpdatePowerUpData(this.powerCount * fillAmount);
    }
    //#endregion

    //#region  ResetPower Count Func
    ResetPowerCount(): void {
        this.isPowerUpActivated = true;
        this.powerUpStartDistance = this.player?.getComponent(PlayerScript)?.GetPlayerStepCount();
        const collider = this.player?.getComponent(PlayerScript)?.powerUpColllider;
        if (collider) {
            console.log('destroy');
            collider.enabled = true;
            this.scheduleOnce(() => { collider.enabled = false; }, 0.5);
        }
    }
    //#endregion

    //#region  Initial Splash Bg animate 
    FadeOutAndDeactivate(node: Node, duration: number, onComplete?: () => void): void {
        if (!node) return;
        let opacityComp = node.getComponent(UIOpacity) ?? node.addComponent(UIOpacity);

        tween(opacityComp)
            .to(duration, { opacity: 0 })
            .call(() => {
                node.active = false;
                opacityComp.opacity = 255;
                onComplete?.();
            })
            .start();
    }
    //#endregion

    //#region CamPos & PlayerPos Detect
    GetCamPos(): Vec3 {
        return this.cameraNode.getPosition();
    }
    GetPlayerPos(): Vec3 {
        return this.player.getPosition();
    }
    //#endregion

    //#region  HighScore Update
    SetHighScore(distance: number): void {
        // const storedScoreStr = localStorage.getItem("highscore") || "0";
        // const storedScore = parseInt(storedScoreStr, 10);
        const storedScore = Constant.highScore;
        const newHighScore = Math.max(distance, storedScore);
        Constant.highScore = newHighScore;
        // if (newHighScore !== storedScore) {
        //     localStorage.setItem("highscore", newHighScore.toString());
        // }
        console.log("High Score:", Constant.highScore);
    }
    //#endregion

    //#region  Cam Effect Call
    CameraEffectAfterDeath(deathType: string): void {
        this.cameraNode.getComponent(CameraScript)?.CameraEffectAfterDeath(deathType);
    }
    //#endregion

    //#region UiAnim Func
    StartUiAnim() {
        this.UiManager.getComponent(GameManagerUi)?.GameStartUiAnimControl();
    }
    //#endregion

    //#region  Camera Data Set
    CamDataSet() {
        this.cameraNode.getComponent(CameraScript).SetCamFollowData();
    }
    //#endregion

    //#region First Move handle Func
    FirstPlayerMove() {
        this.isStart = true;
        this.isFollow = true;
        this.player.getComponent(PlayerScript).FirstMove();
    }
    //#endregion

    //#region  HitSound Handle For Tutorial
    IsHitSoundEnable(): boolean {
        const camZSpeed = this.cameraNode.getComponent(CameraScript)?.GetCamSpeed() ?? 0;
        return camZSpeed >= 30;
    }
    //#endregion

    //#region  AfterSelect Other Character Disable
    DisableOtherCharacter(): void {
        for (const element of this.characters) {
            const playerScript = element.getComponent(PlayerScript);
            if (playerScript && !playerScript.enabled) {
                const splashNode = element.getChildByName("Water_Splash");
                const splashPS = splashNode?.getComponent(ParticleSystem);
                tween(element)
                    .to(0.5, { scale: new Vec3(1, 0, 1) }) // shrink only Y
                    .call(() => {
                        element.setScale(new Vec3(0, 0, 0)); // Instantly set full scale to 0
                    })
                    .start();
                // Only play if not already playing to avoid stacking
                if (splashPS && !splashPS.isPlaying) {
                    splashPS.play();
                }
            }
        }
    }
    //#endregion

    //#region  PcTutorial Func
    PcTutorialButtonOff(_isEndTutorial?: boolean): void {
        const ui = this.UiManager.getComponent(GameManagerUi);
        if (!ui) return;
        if (_isEndTutorial) {
            ui.AfterTutorialGameStartTextTween();
        }
        ui.TutorialButtonVisibleOff();
    }
    PcTutorialButtonOn(_button: string): void {
        this.UiManager.getComponent(GameManagerUi)?.TutorialButtonAnim(_button);
    }
    //#endregion

    //#region MobileTutorial Func
    MobileTutorialOn(_direction: string): void {
        this.UiManager.getComponent(GameManagerUi)?.TutorialMobileAnim(_direction);
    }
    MobileTutorialAnimOff(_isEndTutorial?: boolean): void {
        const ui = this.UiManager.getComponent(GameManagerUi);
        if (!ui) return;
        if (_isEndTutorial) {
            ui.AfterTutorialGameStartTextTween();
        }
        ui.MobileTutorialOff();
    }
    //#endregion

    //#region Request Ad event Emit Handle
    async ShowAd(_onCompleteCallBack?: () => void) {
        const adManager = AdManager.getInstance();
        try {
            GA.GameAnalytics.addDesignEvent('ad:requested');
            if (_onCompleteCallBack) {
                await adManager.RequestAdAsync(1000, _onCompleteCallBack);
            }
            else {
                await adManager.RequestAdAsync();
            }
            director.resume();
        } catch (e) {
            console.error("Ad error:", e);
        }
    }
    //#endregion

}


