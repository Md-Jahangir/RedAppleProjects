

import {
    _decorator, BoxCollider, Camera, Component, CylinderCollider, director, EventKeyboard, EventTouch,
    geometry, ICollisionEvent, Input, input, KeyCode, Node, ParticleSystem, PhysicsSystem,
    Quat, RigidBody, tween, UITransform, Vec3
} from 'cc';
import { GameManager } from './GameManager';
import { LogScript } from './LogScript';
import { AudioManager } from '../AudioManager';
import { Constant } from '../Constant';

const { ccclass, property } = _decorator;

@ccclass('PlayerScript')
export class PlayerScript extends Component {
    @property(ParticleSystem) charTrail: ParticleSystem = null!
    @property(ParticleSystem) waterSplash: ParticleSystem = null!

    private _originalScale = new Vec3(1, 1, 1);
    private _scaledDown = new Vec3(1, 0.75, 1);
    private _moveDistance = 5;
    private _currentDirection: Vec3 | null = null;
    private _lastSetTriggerZ = 70;
    private _setSpacing = 50;
    private _touchStartPos: Vec3 | null = null;

    public collider: BoxCollider;
    public powerUpColllider: CylinderCollider;
    public currentLog: Node | null = null;

    private lastZ: number = null;
    public playerLastPos: Vec3 = null;
    private stepCount: number = 0;

    private storeNextMove: Vec3 | null = null;
    private isMove: boolean = false;
    private tutorialStepCount: number = 0;
    private prevDirection: Vec3 | null = null;  // Add this in your class
    private tempBlockMove: boolean = false;
    protected onEnable(): void {
        // const rigidbody = this.node.getComponent(RigidBody);
    }

    start() {
        this.collider = this.getComponent(BoxCollider)!;
        this.powerUpColllider = this.getComponent(CylinderCollider)!;

        this.registerInputEvents();
        this.registerColliders();
    }

    onDestroy() {
        this.unregisterInputEvents();
    }

    //#region Event Add Func
    private registerInputEvents() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }
    private unregisterInputEvents() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }
    //#endregion

    //#region  Collider Event Register & Raycast Detection
    private registerColliders() {
        this.collider.on('onCollisionEnter', this.OnCollisionEnter, this);
        // this.collider.on('onCollisionExit', this.OnCollisionExit, this);
        this.collider.on('onTriggerEnter', this.CoinAndPowerUpsDetection, this);
        this.powerUpColllider.on('onTriggerEnter', this.DestroyNearbyObjects, this);
    }

    private checkRaycastBlock(direction: Vec3): boolean {
        const origin = this.node.worldPosition.clone();
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

    //#region  Coin and PowerUp Detection
    private CoinAndPowerUpsDetection(event: ICollisionEvent) {
        const coinNode = event.otherCollider?.node;
        if (!coinNode || !coinNode.isValid) return;
        const name = coinNode.name;
        const gm = GameManager.instance;
        const audio = AudioManager.instance;
        if (name === "Coin") {
            const effect = coinNode.getChildByName("Coin_effect");
            const particle = effect?.getComponent(ParticleSystem);
            if (particle) {
                particle.play();
                this.CoinCollectAnim(coinNode);
                audio.CollectSound();

                setTimeout(() => {
                    if (coinNode.isValid) coinNode.destroy();
                }, 2000);
            } else {
                coinNode.destroy(); // Fallback if no particle system
            }
            gm.CoinCountUpdate();

        } else if (name === "power_up") {
            const effect = coinNode.getChildByName("Coin_effect-002");
            const particle = effect?.getComponent(ParticleSystem);
            // Hide visuals
            coinNode.children[0].active = false;
            coinNode.children[1].active = false;
            if (particle) {
                particle.play();
                audio.CollectSound();
                setTimeout(() => {
                    if (coinNode.isValid) coinNode.destroy();
                }, 500);
            } else {
                coinNode.destroy(); // Fallback if no particle system
            }
            gm.PowerCollect();
        }
    }

    //#endregion

    //#region Coin Collect Anim 
    CoinCollectAnim(_coin: Node) {
        const camera3D = GameManager.instance.cameraNode.getComponent(Camera);
        const canvas = GameManager.instance.UiManager;
        const uiCamera = canvas.getChildByName("Camera")?.getComponent(Camera);
        const coinBaseNode = canvas.getChildByName("CoinBase");

        if (!camera3D || !uiCamera || !_coin || !canvas || !coinBaseNode) return;

        // Convert 3D coin position to screen space
        const screenPos = camera3D.worldToScreen(_coin.worldPosition);

        // Convert screen position to UI local space
        const uiWorldPos = uiCamera.screenToWorld(screenPos);
        const uiLocalPos = canvas.getComponent(UITransform).convertToNodeSpaceAR(uiWorldPos);

        // Reparent to canvas and set position/scale
        _coin.removeFromParent();
        canvas.addChild(_coin);
        _coin.setPosition(uiLocalPos);
        _coin.setScale(new Vec3(50, 50, 50));
        _coin.active = true;

        // Tween toward CoinBase
        let targetPos = coinBaseNode.getPosition();
        targetPos.x -= 75;

        tween(_coin)
            .to(0.6, {
                position: targetPos,
                scale: new Vec3(20, 20, 20)
            }, { easing: 'quadOut' })
            .call(() => {
                // === PROPER CLEANUP ===
                _coin.removeFromParent();
                _coin.destroy(); // Clear memory
            })
            .start();
    }
    //#endregion

    //#region  KeyDown Func
    // private onKeyDown(event: EventKeyboard) {
    //     if (!GameManager.instance?.isFollow) return;
    //     if (!GameManager.instance.isStart) GameManager.instance.isStart = true;
    //     if (GameManager.instance.isTutorial && Constant.isMobile) return;
    //     if (this._currentDirection || this.tempBlockMove) return;

    //     const keyMap = {
    //         [KeyCode.SPACE]: new Vec3(0, 0, 1),
    //         [KeyCode.ARROW_UP]: new Vec3(0, 0, 1),
    //         [KeyCode.KEY_W]: new Vec3(0, 0, 1),
    //         [KeyCode.ARROW_DOWN]: new Vec3(0, 0, -1),
    //         [KeyCode.KEY_S]: new Vec3(0, 0, -1),
    //         [KeyCode.ARROW_LEFT]: new Vec3(1, 0, 0),
    //         [KeyCode.KEY_A]: new Vec3(1, 0, 0),
    //         [KeyCode.ARROW_RIGHT]: new Vec3(-1, 0, 0),
    //         [KeyCode.KEY_D]: new Vec3(-1, 0, 0),
    //     };

    //     let direction = keyMap[event.keyCode];

    //     if (direction) {
    //         if (this.isMove && !GameManager.instance.isTutorial) {
    //             this.storeNextMove = direction;
    //             // console.log('nextMove', this.storeNextMove);
    //         }
    //         if (GameManager.instance.isTutorial && !this._currentDirection) {
    //             const expectedDir = GameManager.instance.tutorialPath[this.tutorialStepCount].direction;
    //             if (expectedDir.strictEquals(direction)) {
    //                 // console.log(GameManager.instance.tutorialPath[this.tutorialStepCount].step, this.tutorialStepCount);
    //                 this.tutorialStepCount++;
    //                 this._currentDirection = direction;
    //                 // GameManager.instance.PcTutorialButtonOff();
    //                 this.startScaleAndRotate(direction);
    //             } else {
    //                 this._currentDirection = null;
    //                 return;
    //             }
    //         }
    //         else {
    //             this._currentDirection = direction;
    //             this.startScaleAndRotate(direction);
    //         }
    //     }
    // }
    private onKeyDown(event: EventKeyboard) {
        const gm = GameManager.instance;
        if (!gm?.isFollow) return;

        if (!gm.isStart) gm.isStart = true;
        if (gm.isTutorial && Constant.isMobile) return;
        if (this._currentDirection || this.tempBlockMove) return;

        const keyMap: Record<number, Vec3> = {
            [KeyCode.SPACE]: new Vec3(0, 0, 1),
            [KeyCode.ARROW_UP]: new Vec3(0, 0, 1),
            [KeyCode.KEY_W]: new Vec3(0, 0, 1),

            [KeyCode.ARROW_DOWN]: new Vec3(0, 0, -1),
            [KeyCode.KEY_S]: new Vec3(0, 0, -1),

            [KeyCode.ARROW_LEFT]: new Vec3(1, 0, 0),
            [KeyCode.KEY_A]: new Vec3(1, 0, 0),

            [KeyCode.ARROW_RIGHT]: new Vec3(-1, 0, 0),
            [KeyCode.KEY_D]: new Vec3(-1, 0, 0),
        };

        const direction = keyMap[event.keyCode];
        if (!direction) return;

        if (this.isMove && !gm.isTutorial) {
            this.storeNextMove = direction;
            return;
        }

        if (gm.isTutorial) {
            const expectedDir = gm.tutorialPath[this.tutorialStepCount]?.direction;
            if (expectedDir && expectedDir.strictEquals(direction)) {
                this.tutorialStepCount++;
                this._currentDirection = direction;
                this.startScaleAndRotate(direction);
            } else {
                this._currentDirection = null;
            }
        } else {
            this._currentDirection = direction;
            this.startScaleAndRotate(direction);
        }
    }

    //#endregion

    //#region  KeyUp Func
    // private onKeyUp() {
    //     if (!GameManager.instance?.isFollow || this.isMove || !this._currentDirection) return;
    //     this.isMove = true;
    //     // this.IsCheckColliderEnable(false);
    //     tween(this.node).to(0.09, { scale: this._originalScale }).start();

    //     const move = this._currentDirection.clone().multiplyScalar(this._moveDistance);
    //     const startPos = this.node.position;
    //     const targetX = startPos.x + move.x;

    //     let blocked = this.checkRaycastBlock(this._currentDirection);
    //     if (this._currentDirection.x === 1 || this._currentDirection.x === -1) {
    //         if (targetX < -20 || targetX > 20) {
    //             this.isMove = false;
    //             this._currentDirection = null;
    //             return;
    //         }
    //     }

    //     if (blocked) {
    //         this.isMove = false;
    //         this._currentDirection = null;
    //         return;
    //     }

    //     const snappedX = Math.round(targetX / 5) * 5;
    //     const peak = new Vec3(snappedX, 1.5, startPos.z + move.z);
    //     const final = new Vec3(snappedX, 0, startPos.z + move.z);
    //     if (this.charTrail) {
    //         this.charTrail.stop();  // Ensure it resets
    //         this.charTrail.play();  // Then play again
    //     }
    //     AudioManager.instance.FootStepSound();
    //     this._currentDirection = null;
    //     tween(this.node)
    //         .to(0.045, { position: peak }, { easing: 'quadOut' })
    //         .to(0.09, { position: final }, {
    //             easing: 'quadIn',
    //             onComplete: () => {
    //                 if (GameManager.instance.isTutorial && !Constant.isMobile) {
    //                     this.SelectPcTutorialButtonAnim();
    //                 }
    //                 if (GameManager.instance.isTutorial && Constant.isMobile) {
    //                     this.SelectTutorialMobileAnim();
    //                 }
    //                 this.node.eulerAngles = new Vec3(0, 0, 0);
    //                 this.isMove = false;
    //                 const pos = this.node.getPosition();
    //                 pos.x = Math.round(pos.x / 5) * 5;
    //                 this.node.setPosition(pos);
    //                 this.currentLog = null;
    //                 if (this.lastZ === null || (pos.z - this.lastZ) > 4) {
    //                     this.lastZ = pos.z;
    //                     this.stepCount++;
    //                     GameManager.instance.PlayerDistanceUpdate(this.stepCount);
    //                     this.playerLastPos = pos.clone();
    //                 }
    //                 if (this.storeNextMove && !GameManager.instance.isTutorial) {
    //                     this._currentDirection = this.storeNextMove;
    //                     this.onKeyUp();
    //                     this.storeNextMove = null;
    //                 }
    //             }
    //         })
    //         .start();

    //     this.NewSetInstantiateAndOldDestroy();
    // }
    private onKeyUp() {
        const gm = GameManager.instance;
        if (!gm?.isFollow || this.isMove || !this._currentDirection) return;
        this.isMove = true;
        tween(this.node).to(0.09, { scale: this._originalScale }).start();
        const move = this._currentDirection.clone().multiplyScalar(this._moveDistance);
        const startPos = this.node.position;
        const targetX = startPos.x + move.x;
        const isHorizontal = this._currentDirection.x !== 0;
        const outOfBounds = isHorizontal && (targetX < -20 || targetX > 20);
        const blocked = this.checkRaycastBlock(this._currentDirection);
        if (outOfBounds || blocked) {
            this.isMove = false;
            this._currentDirection = null;
            return;
        }
        const snappedX = Math.round(targetX / 5) * 5;
        const targetZ = startPos.z + move.z;
        const peak = new Vec3(snappedX, 1.5, targetZ);
        const final = new Vec3(snappedX, 0, targetZ);
        if (this.charTrail) {
            this.charTrail.stop();
            this.charTrail.play();
        }
        AudioManager.instance.FootStepSound();
        this._currentDirection = null;
        tween(this.node)
            .to(0.045, { position: peak }, { easing: 'quadOut' })
            .to(0.09, { position: final }, {
                easing: 'quadIn',
                onComplete: () => {
                    if (gm.isTutorial) {
                        if (Constant.isMobile) {
                            this.SelectTutorialMobileAnim();
                        } else {
                            this.SelectPcTutorialButtonAnim();
                        }
                    }
                    this.node.eulerAngles = new Vec3(0, 0, 0);
                    this.isMove = false;
                    const pos = this.node.getPosition();
                    pos.x = Math.round(pos.x / 5) * 5;
                    this.node.setPosition(pos);
                    // console.log("player pos update (x,y,z)", pos);
                    this.currentLog = null;
                    if (this.lastZ === null || (pos.z - this.lastZ) > 4) {
                        this.lastZ = pos.z;
                        this.stepCount++;
                        gm.PlayerDistanceUpdate(this.stepCount);
                        this.playerLastPos = pos.clone();
                    }
                    if (this.storeNextMove && !gm.isTutorial) {
                        this._currentDirection = this.storeNextMove;
                        this.storeNextMove = null;
                        this.onKeyUp();
                    }
                }
            })
            .start();
        this.NewSetInstantiateAndOldDestroy();
    }

    //#endregion

    //#region  Touch Start Func
    private onTouchStart(event: EventTouch) {
        if (GameManager.instance.isTutorial && this.isMove) return;
        if (!GameManager.instance?.isFollow) return;
        if (GameManager.instance.isTutorial && !Constant.isMobile) return;
        if (this._currentDirection || this.tempBlockMove) return;
        const loc = event.getLocation();
        this._touchStartPos = new Vec3(loc.x, loc.y, 0);
        tween(this.node).stop();
        tween(this.node).to(0.075, { scale: this._scaledDown }).start();
    }
    //#endregion

    //#region  Touch End Func
    private onTouchEnd(event: EventTouch) {
        if (!this._touchStartPos || !GameManager.instance?.isFollow) return;
        if (GameManager.instance.isTutorial && !Constant.isMobile) return;

        const loc = event.getLocation();
        const delta = new Vec3(loc.x - this._touchStartPos.x, loc.y - this._touchStartPos.y, 0);
        const absX = Math.abs(delta.x), absY = Math.abs(delta.y);
        const threshold = 40;

        let direction = new Vec3(0, 0, 1);
        if (absX > threshold || absY > threshold) {
            direction = absX > absY
                ? (delta.x > 0 ? new Vec3(-1, 0, 0) : new Vec3(1, 0, 0))
                : (delta.y > 0 ? new Vec3(0, 0, 1) : new Vec3(0, 0, -1));
        }

        if (direction) {
            if (this.isMove && !GameManager.instance.isTutorial) {
                this.storeNextMove = direction;
                console.log('nextMove', this.storeNextMove);
            }
            if (GameManager.instance.isTutorial && !this._currentDirection) {
                const expectedDir = GameManager.instance.tutorialPath[this.tutorialStepCount].direction;
                if (expectedDir.strictEquals(direction)) {
                    this._currentDirection = direction;
                    this._touchStartPos = null;
                    this.tutorialStepCount++;
                    this.startScaleAndRotate(direction);
                    this.onKeyUp();
                } else {
                    this._currentDirection = null;
                    tween(this.node).to(0.09, { scale: this._originalScale }).start();
                    return;
                }
            }
            else {
                this._currentDirection = direction;
                this.startScaleAndRotate(direction);
                this.onKeyUp();
                this._touchStartPos = null;
            }
        }
    }
    //#endregion

    //#region New Set Instantiate Func
    private NewSetInstantiateAndOldDestroy() {
        const z = this.node.position.z;
        if (z >= this._lastSetTriggerZ + this._setSpacing) {
            this._lastSetTriggerZ += this._setSpacing;
            GameManager.instance.HandleRepeatSet();
        }
    }
    //#endregion

    //#region  Scale And Rotate Player
    private startScaleAndRotate(direction: Vec3) {
        const angleY = Math.atan2(direction.x, direction.z) * 180 / Math.PI;
        const targetQuat = Quat.fromEuler(new Quat(), 0, angleY, 0);
        if (Quat.dot(this.node.rotation, targetQuat) < 0) {
            targetQuat.x *= -1;
            targetQuat.y *= -1;
            targetQuat.z *= -1;
            targetQuat.w *= -1;
        }
        tween(this.node.children[0]).stop();
        tween(this.node).stop();
        tween(this.node.children[0])
            .to(0.075, { rotation: targetQuat })
            .start();

        tween(this.node)
            .to(0.075, { scale: this._scaledDown })
            .start();
    }
    //#endregion

    //#region  Collision Func
    private OnCollisionEnter(event: ICollisionEvent) {
        const otherNode = event.otherCollider?.node;
        if (!otherNode) return;
        const name = otherNode.name;
        const parent = otherNode.parent;
        const parentName = parent?.name;
        const gm = GameManager.instance;
        // --- Handle car or train collision ---
        if (name === "car" || name === "Train") {
            console.log("death by", name);
            this.playDeathAnim();
            gm.CameraEffectAfterDeath(name);
            gm.SetPlayerLastPos(this.playerLastPos);
            if (gm.IsHitSoundEnable()) {
                AudioManager.instance.HitSound();
            }
            gm.GameOverFunc();
            return;
        }
        // --- Handle log collision ---
        if (name === "log" && parent) {
            this.currentLog = otherNode;
            const playerPos = this.node.getPosition();
            const parentX = parent.getPosition().x;
            // Default thresholds
            let threshold = 5;
            const offset = 30;
            if (parentName === "logSmall") {
                threshold = 2.5;
            } else if (parentName !== "Log") {
                return; // Ignore other log types
            }
            const logCenterX = parentX + offset;
            const diff = playerPos.x - logCenterX;
            if (Math.abs(diff) > threshold) {
                const snapX = logCenterX + Math.sign(diff) * threshold;
                this.node.setPosition(new Vec3(snapX, playerPos.y, playerPos.z));
                console.log(`Snapped ${diff < 0 ? "left" : "right"}, diff:`, diff);
            }
        }
    }

    //#endregion

    // private OnCollisionExit(event: ICollisionEvent) {
    //     if (event.otherCollider.node.name === 'log') {
    //         this.currentLog = null;
    //     }
    // }

    //#region  PowerUp Collider detect and Destroy Func
    private DestroyNearbyObjects(event: ICollisionEvent) {
        const destroyables = ["car", "Train"];
        if (destroyables.indexOf(event.otherCollider.node.name) !== -1) {
            const parentNode: Node = event.otherCollider.node.parent;
            const destroyEffect: ParticleSystem = parentNode.getChildByName("boxHitNew").getComponent(ParticleSystem);
            destroyEffect.play();

            // Call function after effect finishes (duration in seconds)
            this.scheduleOnce(() => {
                parentNode.destroy();
            }, destroyEffect.duration + 0.1);
        }
    }
    //#endregion

    //#region  Player Pos Get
    public GetPlayerLastPos() {
        return this.playerLastPos;
    }
    //#endregion

    //#region  Player Control Func
    public PlayerFunctionalityControl(status: boolean) {
        // this.tempBlockMove = false;
        this.collider.enabled = status;
        this.enabled = status;
        this.node.getComponent(RigidBody).enabled = status;
    }
    //#endregion

    //#region  Player Death Anim
    private playDeathAnim() {
        // Stop any active tweens to avoid conflicts
        tween(this.node).stop();
        // Optional: stop child animation/rotation if any
        this.node.children.forEach(child => tween(child).stop());
        // Scale down player over 0.2s with easing to simulate "smash"
        tween(this.node)
            .to(0.2, { scale: new Vec3(1.6, 0.1, 1.3) }, { easing: 'quadIn' })
            .start();
    }
    //#endregion

    //#region Water Detect by RayCast Func
    private CheckStandingOnWater() {
        const playerPos = this.node.worldPosition.clone();
        const origin = new Vec3(playerPos.x, playerPos.y, playerPos.z);
        const ray = geometry.Ray.create(origin.x, origin.y, origin.z, 0, -1, 0);
        const maxDistance = 1.40;

        PhysicsSystem.instance.raycastResults.length = 0;
        if (PhysicsSystem.instance.raycast(ray, 0xffffffff, maxDistance)) {
            const hits = PhysicsSystem.instance.raycastResults;
            if (hits.length === 0) return;
            const log = hits.find(hit => hit.collider.node.name === 'log');
            // this.currentLog = log?.collider?.node;
            if (log) return;
            // console.log("wood log not detected");
            const waterHit = hits.find(hit => hit.collider.node.name === 'water');
            if (waterHit) {
                this.waterSplash.play();
                // Tween player Y scale to 0 over 1 second
                tween(this.node)
                    .to(0.5, { scale: new Vec3(1, 0, 1) }) // shrink only Y
                    .call(() => {
                        this.node.setScale(new Vec3(0, 0, 0)); // Instantly set full scale to 0
                    })
                    .start();
                GameManager.instance.SetPlayerLastPos(this.playerLastPos);
                GameManager.instance.GameOverFunc();
                console.log('gameover by water');
            }
        }
    }
    //#endregion

    //#region  Player Distance Count Update
    GetPlayerStepCount(): number {
        return this.stepCount;
    }
    //#endregion

    //#region  First Move Player Func
    FirstMove(): void {
        this.startScaleAndRotate(new Vec3(0, 0, 1));
        this._currentDirection = new Vec3(0, 0, 1)
        tween(this.node).to(0.08, { scale: this._originalScale }).start();
        const move = this._currentDirection.clone().multiplyScalar(this._moveDistance);
        const startPos = this.node.position;
        let targetX = 0;
        if (GameManager.instance.isTutorial) {
            targetX = move.x;
        }
        else {
            targetX = startPos.x + move.x;
        }
        const snappedX = Math.round(targetX / 5) * 5;
        const peak = new Vec3(snappedX, 1.5, startPos.z + move.z);
        const final = new Vec3(snappedX, 0, startPos.z + move.z);
        if (this.charTrail) {
            this.charTrail.stop();  // Ensure it resets
            this.charTrail.play();  // Then play again
        }
        AudioManager.instance.FootStepSound();
        this._currentDirection = null;
        if (GameManager.instance.isTutorial) {
            this.tutorialStepCount++;
        }
        tween(this.node)
            .to(0.045, { position: peak }, { easing: 'quadOut' })
            .to(0.09, { position: final }, {
                easing: 'quadIn',
                onComplete: () => {
                    GameManager.instance.DisableOtherCharacter();
                    if (GameManager.instance.isTutorial && !Constant.isMobile) {
                        this.SelectPcTutorialButtonAnim();
                    }
                    if (GameManager.instance.isTutorial && Constant.isMobile) {
                        this.SelectTutorialMobileAnim();
                    }
                    const pos = this.node.getPosition();
                    pos.x = Math.round(pos.x / 5) * 5;
                    this.node.setPosition(pos);
                    this.currentLog = null;
                    if (this.lastZ === null || (pos.z - this.lastZ) > 4) {
                        this.lastZ = pos.z;
                        this.stepCount++;
                        GameManager.instance.PlayerDistanceUpdate(this.stepCount);
                        this.playerLastPos = pos.clone();
                    }
                }
            })
            .start();

    }
    //#endregion

    //#region Tutorial Anim Direction set
    SelectPcTutorialButtonAnim(): void {
        const gm = GameManager.instance;
        if (!gm) return;
        if (this.tutorialStepCount > 26) {
            gm.PcTutorialButtonOff(true);
            return;
        }
        if (this.tutorialStepCount === 14) {
            this.tempBlockMove = true;
            this.scheduleOnce(() => {
                this.tempBlockMove = false;
                gm.PcTutorialButtonOn("key_up_anim");
            }, 4);
            director.emit('TutorialTrainSpawn');
            gm.PcTutorialButtonOff();
            return;
        }
        const dir = gm.tutorialPath[this.tutorialStepCount]?.direction;
        if (!dir) return;

        if (this.prevDirection?.strictEquals(dir)) return;
        this.prevDirection = dir.clone();
        gm.PcTutorialButtonOff();
        const directionMap: Record<string, string> = {
            "0,0,1": "key_up_anim",     // Forward
            "0,0,-1": "key_down_anim",  // Backward
            "1,0,0": "key_left_anim",   // Left
            "-1,0,0": "key_right_anim"  // Right
        };
        const key = `${dir.x},${dir.y},${dir.z}`;
        const anim = directionMap[key];
        if (anim) {
            gm.PcTutorialButtonOn(anim);
        } else {
            console.warn("Unknown direction", dir);
        }
    }

    SelectTutorialMobileAnim(): void {
        const gm = GameManager.instance;
        if (!gm) return;
        if (this.tutorialStepCount > 26) {
            gm.MobileTutorialAnimOff(true);
            return;
        }
        if (this.tutorialStepCount === 14) {
            this.tempBlockMove = true;
            this.scheduleOnce(() => {
                this.tempBlockMove = false;
                gm.MobileTutorialOn("TapTutorial");
            }, 4);
            director.emit('TutorialTrainSpawn');
            gm.MobileTutorialAnimOff();
            return;
        }
        const dir = gm.tutorialPath[this.tutorialStepCount]?.direction;
        if (!dir) return;
        if (this.prevDirection?.strictEquals(dir)) return; // Skip if same as last direction
        this.prevDirection = dir.clone();
        gm.MobileTutorialAnimOff();
        const directionMap: Record<string, string> = {
            "0,0,1": "TapTutorial",   // Forward
            "0,0,-1": "swipe_down",   // Backward
            "-1,0,0": "swipe_right",  // Right
            "1,0,0": "swipe_left",    // Left
        };
        const key = `${dir.x},${dir.y},${dir.z}`;
        const anim = directionMap[key];
        if (anim) {
            gm.MobileTutorialOn(anim);
        } else {
            console.warn("Unknown direction", dir);
        }
    }

    //#endregion

    update(deltaTime: number) {
        if (!this.enabled || !GameManager.instance) return;
        // If player is not on a log, check if standing on water
        if (!this.currentLog) {
            this.CheckStandingOnWater();
            return;
        }
        const logScript = this.currentLog.parent?.getComponent(LogScript);
        if (!logScript) return;
        const delta = logScript.GetLogMovementDelta?.(deltaTime);
        if (!delta) return;
        // Move player with log
        this.node.setWorldPosition(this.node.worldPosition.clone().add(delta));
        const localX = this.node.getPosition().x;
        if (localX < -25 || localX > 25) {
            GameManager.instance.GameOverFunc();
        }
    }


}
