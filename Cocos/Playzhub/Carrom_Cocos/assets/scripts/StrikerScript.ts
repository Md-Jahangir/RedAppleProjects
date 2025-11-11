/******** Script_Details ***********
 * @Original_Creator :- Amit Kumar.
 * @Created_Date :- 30-08-2024.
 * @Last_Update_By :- Amit Kumar.
 * @Last_Updatd_Date :- 30-08-2024
 * @Description :- Striker Control.
 ************************************/
import { _decorator, clamp, Collider2D, Color, Component, director, ERaycast2DType, EventTouch, Graphics, Input, Node, ParticleSystem2D, PhysicsSystem2D, Rect, RigidBody2D, Slider, Sprite, Vec2, Vec3 } from 'cc';
import { COIN_TYPE, Constant, GAME_MODE } from './Constant';
import { GameManager } from './GameManager';
import { CarromenDatabase } from './Database/CarromenDatabase';
import { AnimationManager } from './utils/AnimationManger';
const { ccclass, property } = _decorator;

@ccclass('StrikerScript')
export class StrikerScript extends Component {
    //#region -Fields
    // Reference
    @property(Node) playerBaseLine: Node | null = null;
    @property(Slider) strikerSlider: Slider = null;
    @property(Node) strikerForceField: Node = null;
    strikerHandle: Node = null;
    @property(RigidBody2D) rigidBody: RigidBody2D = null;
    @property(Node) carromMenParent: Node = null;
    selfCollider: Collider2D;
    @property(Node) boardParent: Node | null = null;
    @property(Node) arrowHead: Node = null!;
    arrowHeadSprite: Sprite = null;

    //Game Logics variables
    strikerForce: number = 10;
    isMoving: Boolean = false;
    isCharging: Boolean = false;
    startDragPosition: Vec2 = null;
    endDragPosition: Vec2 = null;
    currentStrikerVelocity: number = 0;

    isFirstTimeHitCompleted: boolean = false;
    _isDestroyed: boolean = false;
    isTurnChanging: boolean = false;
    @property(Graphics) graphics: Graphics = null;
    private strickerParticles: ParticleSystem2D;
    @property(Node) pawnsParentNode: Node | null = null;

    isChallengerMode: boolean = false;
    //#endregion

    //#region -OnEnable
    protected onEnable(): void {
        //References
        this.rigidBody = this.node.getComponent(RigidBody2D);
        this.selfCollider = this.node.getComponent(Collider2D);
        this.strikerHandle = this.strikerSlider.node.children[0];
        this.arrowHeadSprite = this.arrowHead.getComponent(Sprite);
        // this.strickerParticles = this.node.getChildByName('particles').children[0].getComponent(ParticleSystem2D);
        //Events
        this.EventHandler(true);
        //Initial Set Value
        GameManager.instance.playerTurn = true;
    }
    //#endregion


    EventHandler(_isOn: boolean): void {
        const method: 'on' | 'off' = _isOn ? 'on' : 'off';

        type EventTuple = [string, (...args: any[]) => void];

        const strikerTouchEvents: EventTuple[] = [
            [Input.EventType.TOUCH_START, this.OnStrikerSliderDragStart],
            [Input.EventType.TOUCH_END, this.OnStrikerSliderDragEnd],
            [Input.EventType.TOUCH_CANCEL, this.OnStrikerSliderDragEnd],
        ];

        const mouseCursorEvent: EventTuple[] = [
            [Node.EventType.MOUSE_ENTER, Constant.onMouseEnter],
            [Node.EventType.MOUSE_LEAVE, Constant.onMouseLeaveOrUp],
            [Node.EventType.MOUSE_UP, Constant.onMouseLeaveOrUp],
        ]

        const nodeTouchEvents: EventTuple[] = [
            [Input.EventType.TOUCH_START, this.OnMouseDown],
            [Input.EventType.TOUCH_MOVE, this.OnMouseMove],
            [Input.EventType.TOUCH_END, this.OnMouseUp],
            [Input.EventType.TOUCH_CANCEL, this.OnMouseUp],
        ];

        strikerTouchEvents.forEach(([event, handler]) => {
            this.strikerHandle[method](event, handler, this);
        });

        mouseCursorEvent.forEach(([event, handler]) => {
            this.node[method](event, handler, this);
            this.strikerHandle[method](event, handler, this);
        })

        nodeTouchEvents.forEach(([event, handler]) => {
            this.node[method](event, handler, this);
        });
    }

    //#region -Start
    start() {
        this.strikerForceField.active = false;
        this.strikerSlider.progress = 0.5;
        this.arrowHead.active = false;
        this.isChallengerMode = GameManager.instance.gameMode === GAME_MODE.CHALLENGER;
    }
    //#endregion

    //#region GetBoardBaseLine
    async GetBoardBaseLine(): Promise<void> {
        const boardParent: Node = director.getScene().getChildByName("Canvas").getChildByName("Board");
        this.playerBaseLine = boardParent.children[0].getChildByName('BaseLine');
        this.node.setPosition(this.playerBaseLine.getPosition().x, this.GetYPosBaseline());
    }
    //#endregion

    //#region -OnMouseDown
    OnMouseDown(event: EventTouch): void {
        if (this.currentStrikerVelocity > 0.1 || this.isMoving) {
            this.isCharging = false;
            return
        }
        if (this.node.getWorldPosition().y.toFixed(1) != this.playerBaseLine.getWorldPosition().y.toFixed(1)) {
            this.node.setPosition(this.strikerSlider.progress * Constant.BASELINE_WIDTH - Constant.BASELINE_WIDTH / 2, this.GetYPosBaseline(), 0);
        }
        this.isCharging = true;
        this.startDragPosition = new Vec2(this.node.getWorldPosition().x, this.node.getWorldPosition().y);//event.getUILocation();

        this.strikerForceField.active = true;
        this.strikerForceField.setPosition(this.node.getPosition());

        if (this.isChallengerMode) {
            GameManager.instance.OnStartHit(this.isFirstTimeHitCompleted);
            if (!this.isFirstTimeHitCompleted) this.isFirstTimeHitCompleted = true;
        }
    }
    //#endregion

    //#region -OnMouseMove
    OnMouseMove(event: EventTouch): void {
        if (!this.isCharging) return;
        //Angle of Arraow
        const direction = event.getUILocation().subtract(this.startDragPosition);
        const radian = Math.atan2(direction.x, direction.y);
        const angle = radian * (180 / Math.PI);
        this.strikerForceField.angle = -angle + 180;
        //Scale of Arrow
        const strikerDistance = Vec2.distance(event.getUILocation(), this.startDragPosition);
        const strikerScale = clamp(strikerDistance * Constant.ARROW_SCALE_MULTIPLIER, 0, Constant.MAX_ARROW_SCALE);
        this.strikerForceField.setScale(strikerScale, strikerScale, strikerScale);
        // Raycast Perform and graphics render.
        this.predictStrikerSweepPath(event, radian);
    }
    //#endregion

    //#region -OnMouseUp
    async OnMouseUp(event: EventTouch) {
        if (this.isCharging) {
            this.graphics.clear();
            this.arrowHead.active = false;
            this.endDragPosition = event.getUILocation();
            const direction = this.startDragPosition.subtract(this.endDragPosition);
            let forceMagnitude = direction.length() * Constant.STRIKER_FORCE;
            forceMagnitude = clamp(forceMagnitude, 0, Constant.MAX_FORCE_MAGNITUDE);
            this.strikerForceField.setScale(0, 0, 0);
            this.strikerForceField.active = false;

            if (forceMagnitude < Constant.MIN_APPLY_FORCE) {
                this.isCharging = false;
                return
            }
            GameManager.instance.SetTurnChange(true)
            // this.node.off(Input.EventType.TOUCH_START, this.OnMouseDown, this);
            this.strikerSlider.enabled = false;
            //Logics
            this.AddForceAtDirection(direction, forceMagnitude);

            //Reset bool
            this.isMoving = true;
            this.isCharging = false;
            if (this.isChallengerMode) {
                GameManager.instance.MovePlayed();
            }
            GameManager.instance.PauseTimer();
            if (this.strickerParticles) this.strickerParticles.resetSystem();
            GameManager.instance.playerTurnSkipCounter = 0;
            // For turn change
            await this.WaitUntil(() => this.GetStrikerVelocity(this.rigidBody.linearVelocity.x, this.rigidBody.linearVelocity.y) < Constant.MIN_VELOCITY_FOR_TURN_CHANGE, this.TurnChange.bind(this));
        }
    };
    //#endregion

    //#region -RaycastGraphics
    /**
     * @description - Raycast and graphics render of collision.
     * @param event 
     * @param _radian 
     */
    predictStrikerSweepPath(event: EventTouch, _radian: number): void {
        if (!this.graphics) return;

        this.graphics.clear();
        this.arrowHead.active = true;

        // === Constants ===
        const strikerRadius = 34.5;
        const coinRadius = 23;
        const stepSize = 5;
        const MAX_FORCE = 1000;
        const MAX_ARROW_LENGTH = 300;

        // === Calculate direction and maxDistance ===
        let maxDistance = Vec2.distance(this.startDragPosition, event.getUILocation()) * Constant.STRIKER_FORCE;
        if (!this.isChallengerMode) {
            maxDistance = Math.min(maxDistance, MAX_ARROW_LENGTH);
        }

        const origin = this.node.getWorldPosition();
        const direction = new Vec2(
            Math.cos(-_radian - Constant.RADIAN_DEGREE_90),
            Math.sin(-_radian - Constant.RADIAN_DEGREE_90)
        ).normalize();

        // === Set force field scale and color ===
        const strikerScale = clamp(maxDistance * Constant.ARROW_SCALE_MULTIPLIER, 0.8, Constant.MAX_ARROW_SCALE);
        this.strikerForceField.setScale(strikerScale, strikerScale, strikerScale);

        const forceRatio = Math.min(maxDistance / MAX_FORCE, 1);
        const color = new Color(255 * forceRatio, 255 * (1 - forceRatio), 0, 255);
        this.graphics.fillColor = color;
        this.strikerForceField.children[0].getComponent(Sprite).color = new Color(0, 0, 0, 55);

        // === Simulation loop ===
        let currentPos = origin.clone();
        let hasReflected = false;

        for (let traveled = 0; traveled <= maxDistance; traveled += stepSize) {
            const nextPos = currentPos.clone().add(new Vec3(direction.x * stepSize, direction.y * stepSize, 0));

            // Draw dot and arrow triangle
            this.triangle(direction, nextPos, color);
            this.graphics.circle(nextPos.x, nextPos.y, 5);
            this.graphics.fill();

            if (this.isChallengerMode) {
                // === Coin collision prediction ===
                for (const targetNode of this.carromMenParent.children) {
                    const collider = targetNode.getComponent(Collider2D);
                    if (!collider || !collider.node.active) continue;

                    const tag = collider.tag;
                    if (tag !== 1 && tag !== 2 && tag !== 3 && tag !== 8) continue;

                    const coinPos = targetNode.getWorldPosition();
                    const distance = Vec2.distance(new Vec2(nextPos.x, nextPos.y), new Vec2(coinPos.x, coinPos.y));

                    if (distance <= strikerRadius + coinRadius) {
                        const strikerToCoin = new Vec2(coinPos.x - currentPos.x, coinPos.y - currentPos.y).normalize();

                        this.graphics.fillColor = new Color(0, 0, 0, 30);
                        this.graphics.circle(nextPos.x, nextPos.y, strikerRadius);
                        this.graphics.fill();

                        this.drawCoinPredictionDots(coinPos, strikerToCoin);
                        return;
                    }
                }

                // === Wall reflection prediction (only once) ===
                if (!hasReflected) {
                    const rayResult = PhysicsSystem2D.instance.raycast(currentPos, nextPos, ERaycast2DType.Closest);

                    if (rayResult?.length > 0) {
                        const validHit = [...rayResult]
                            .sort((a, b) => Vec2.distance(currentPos, new Vec3(a.point.x, a.point.y)) - Vec3.distance(currentPos, new Vec3(b.point.x, b.point.y)))
                            .find(hit => hit.collider.tag === 7);

                        if (validHit) {
                            hasReflected = true;

                            const hitPoint = new Vec2(validHit.point.x, validHit.point.y);
                            const hitNormal = new Vec2(validHit.normal.x, validHit.normal.y).normalize();
                            const reflectDir = direction.subtract(hitNormal.multiplyScalar(3 * direction.dot(hitNormal))).normalize();

                            const endPoint = hitPoint.add(reflectDir.multiplyScalar(stepSize));

                            this.graphics.strokeColor = new Color(255, 255, 0, 200);
                            this.graphics.lineWidth = 4;
                            this.graphics.moveTo(hitPoint.x, hitPoint.y);
                            this.graphics.lineTo(endPoint.x, endPoint.y);
                            this.graphics.stroke();
                        }
                    }
                }
            }

            currentPos = nextPos;
        }
    }

    // predictStrikerSweepPath(event: EventTouch, _radian: number): void {
    //     if (!this.graphics) return;
    //     this.graphics.clear();
    //     this.arrowHead.active = true;

    //     const strikerRadius = 34.5;
    //     const coinRadius = 23; // Adjust if your coins have different size
    //     const stepSize = 5;
    //     // const maxDistance = Vec2.distance(this.startDragPosition, event.getUILocation()) * Constant.STRIKER_FORCE;
    //     let maxDistance = Vec2.distance(this.startDragPosition, event.getUILocation()) * Constant.STRIKER_FORCE;
    //     if (!this.isChallengerMode) {
    //         const MAX_ARROW_LENGTH = 300;
    //         maxDistance = Math.min(maxDistance, MAX_ARROW_LENGTH);
    //     }
    //     const origin = this.node.getWorldPosition();

    //     const direction = new Vec2(
    //         Math.cos(-_radian - Constant.RADIAN_DEGREE_90),
    //         Math.sin(-_radian - Constant.RADIAN_DEGREE_90)
    //     ).normalize();

    //     let currentPos = origin.clone();
    //     let traveled = 0;
    //     let hasReflected = false;

    //     for (let dist = 0; dist <= maxDistance; dist += stepSize) {
    //         const nextPos = currentPos.clone().add(new Vec3(direction.x * stepSize, direction.y * stepSize, 0));
    //         traveled += stepSize;
    //         const MAX_FORCE = 1000;
    //         const strikerScale = clamp(maxDistance * Constant.ARROW_SCALE_MULTIPLIER, 0.8, Constant.MAX_ARROW_SCALE);
    //         this.strikerForceField.setScale(strikerScale, strikerScale, strikerScale);

    //         const forceRatio = Math.min(maxDistance / MAX_FORCE, 1);

    //         // Green to red: interpolate R and G
    //         const red = 255 * forceRatio;
    //         const green = 255 * (1 - forceRatio);
    //         const blue = 0; // stays 0 for green-red gradient

    //         const color = new Color(red, green, blue, 255);
    //         this.graphics.fillColor = color
    //         // const alpha = Math.max(255 - traveled * 0.8, 20);
    //         this.strikerForceField.children[0].getComponent(Sprite).color = new Color(0, 0, 0, 55);
    //         this.triangle(direction, nextPos, color);

    //         this.graphics.circle(nextPos.x, nextPos.y, 5);
    //         this.graphics.fill();

    //         // ✅ Circle-to-circle manual collision detection
    //         if (this.isChallengerMode) {
    //             for (const targetNode of this.carromMenParent.children) {
    //                 const collider = targetNode.getComponent(Collider2D);
    //                 if (!collider || !collider.node.active) continue;

    //                 const tag = collider.tag;
    //                 if (tag !== 1 && tag !== 2 && tag !== 3 && tag !== 8) continue;

    //                 const coinPos = targetNode.getWorldPosition();
    //                 const distance = Vec2.distance(new Vec2(nextPos.x, nextPos.y), new Vec2(coinPos.x, coinPos.y));

    //                 if (distance <= strikerRadius + coinRadius) {
    //                     const strikerToCoin = new Vec2(coinPos.x - currentPos.x, coinPos.y - currentPos.y).normalize();

    //                     this.graphics.fillColor = new Color(0, 0, 0, 30);
    //                     this.graphics.circle(nextPos.x, nextPos.y, strikerRadius);
    //                     this.graphics.fill();
    //                     // Optional: show predicted path of the coin after hit
    //                     this.drawCoinPredictionDots(coinPos, strikerToCoin);
    //                     return;
    //                 }
    //             }
    //         }
    //         // 🔁 Raycast wall reflection (only once)
    //         if (!hasReflected && this.isChallengerMode) {
    //             const rayResult = PhysicsSystem2D.instance.raycast(currentPos, nextPos, ERaycast2DType.Closest);

    //             if (rayResult && rayResult.length > 0) {
    //                 const sortedRayResults = [...rayResult].sort((a, b) => {
    //                     const da = Vec2.distance(currentPos, new Vec3(a.point.x, a.point.y));
    //                     const db = Vec2.distance(currentPos, new Vec3(b.point.x, b.point.y));
    //                     return da - db;
    //                 });

    //                 const validHit = sortedRayResults.find(hit => hit.collider.tag === 7);
    //                 if (validHit) {
    //                     hasReflected = true;
    //                     const hitPoint = new Vec2(validHit.point.x, validHit.point.y);
    //                     const hitNormal = new Vec2(validHit.normal.x, validHit.normal.y).normalize();
    //                     const reflectDir = direction.subtract(hitNormal.multiplyScalar(3 * direction.dot(hitNormal))).normalize();

    //                     // 🟡 Draw predicted reflection path
    //                     const endPoint = hitPoint.add(reflectDir.multiplyScalar(stepSize));
    //                     this.graphics.strokeColor = new Color(255, 255, 0, 200);
    //                     this.graphics.lineWidth = 4;
    //                     this.graphics.moveTo(hitPoint.x, hitPoint.y);
    //                     this.graphics.lineTo(endPoint.x, endPoint.y);
    //                     this.graphics.stroke();
    //                 }
    //             }
    //         }
    //         currentPos = nextPos;
    //     }
    // }

    drawCoinPredictionDots(coinPos: Vec3, moveDirection: Vec2) {
        const dotSpacing = 5;
        const dotCount = 25;
        const direction = moveDirection.clone().normalize();

        let current = coinPos.clone();
        for (let i = 0; i < dotCount; i++) {
            const next = current.add(new Vec3(direction.x * dotSpacing, direction.y * dotSpacing, 0));
            const alpha = 150 - i * (150 / dotCount); // fade out

            this.graphics.fillColor = new Color(0, 255, 0, alpha);
            this.graphics.circle(next.x, next.y, 10);
            this.graphics.fill();

            current = next;
        };

        // Optional reflection after final point
        const reflectStart = current;
        const reflectEnd = reflectStart.clone().add(new Vec3(direction.x * 100, direction.y * 100, 0));

        const result = PhysicsSystem2D.instance.raycast(reflectStart, reflectEnd, ERaycast2DType.Closest);
        if (result && result.length > 0 && result[0].point && result[0].collider.tag !== 6) {
            const hit = result[0];
            const normal = new Vec2(hit.normal.x, hit.normal.y);
            const incoming = direction.clone();
            const reflectDir = incoming.subtract(normal.multiplyScalar(4 * incoming.dot(normal))).normalize();

            // let reflectPoint = new Vec3(hit.point.x, hit.point.y, 0);
            // for (let i = 0; i < 5; i++) {
            //     reflectPoint = reflectPoint.add(new Vec3(reflectDir.x * dotSpacing, reflectDir.y * dotSpacing, 0));
            //     const reflectAlpha = 150 - i * 30;
            //     this.graphics.fillColor = new Color(0, 200, 255, reflectAlpha);
            //     this.graphics.circle(reflectPoint.x, reflectPoint.y, 3);
            //     this.graphics.fill();
            // };
        }
    };

    triangle(direction: Vec2, nextPos: Vec3, color: Color): void {
        this.arrowHead.setWorldPosition(new Vec3(nextPos.x, nextPos.y, 0));
        this.arrowHead.angle = Math.atan2(direction.y, direction.x) * (180 / Math.PI) - 90;
        this.arrowHeadSprite.color = color;
    }
    //#endregion

    //#region -ObstacleDetected
    /**
     * @description - Raycast for detect striker overlaping the coin.
     */
    ObstacleDetected(): boolean {
        const strikerRadius = Constant.STRIKER_DIAMETER / 2;
        const rayTestRectangle = new Rect(this.node.getWorldPosition().x - strikerRadius, this.node.getWorldPosition().y - strikerRadius, Constant.STRIKER_DIAMETER, Constant.STRIKER_DIAMETER);
        const rayDetectRectangle = PhysicsSystem2D.instance.testAABB(rayTestRectangle);
        return rayDetectRectangle.length > 0;
    };
    //#endregion

    //#region -AddForceAtDirection
    /**
     * @description - Adding force in direction.
     */
    AddForceAtDirection(_direction: Vec2, _forceMagnitude: number): void {
        const force = _direction.normalize().multiplyScalar(_forceMagnitude);
        this.rigidBody.applyLinearImpulseToCenter(force, true);
    };
    //#endregion

    //#region -IsWinGame
    IsWinGame(): boolean {
        let gameWin: boolean = true;
        const choosedColor: string = GameManager.instance.playerChoosedCoinColor;
        this.carromMenParent.children.forEach((_carrommen: Node, _index: number) => {
            const carromDatabase = _carrommen.getComponent(CarromenDatabase);
            // if (carromDatabase.IsChoosedColor(choosedColor) && !carromDatabase.IsPocket()) {
            //     gameWin = false;
            // }
            if (!carromDatabase.IsPocket()) {
                gameWin = false;
            }
        });
        return gameWin;
    };
    //#endregion

    //#region -StrikerMoveX
    /**
     * @description - Striker X direction Movement according to Slider.
     */
    StrikerMovementX(_data): void {
        GameManager.instance.OnStartHit(this.isFirstTimeHitCompleted);

        if (!this.isFirstTimeHitCompleted) this.isFirstTimeHitCompleted = true;

        this.strikerSlider.progress = clamp(this.strikerSlider.progress, Constant.MIN_STRIKER_BASELINE_CLAMP, Constant.MAX_STRIKER_BASELINE_CLAMP);

        const normalizedProgress = (this.strikerSlider.progress - Constant.MIN_STRIKER_BASELINE_CLAMP) / (Constant.MAX_STRIKER_BASELINE_CLAMP - Constant.MIN_STRIKER_BASELINE_CLAMP);

        const xPos = ((normalizedProgress * Constant.BASELINE_WIDTH) - Constant.BASELINE_WIDTH / 2) * Constant.MAX_STRIKER_BASELINE_CLAMP;
        this.node.setPosition(xPos, this.GetYPosBaseline(), 0);
    };
    //#endregion

    //#region  -GetStrikerVelocity
    /**
     * @description - For get velocity of striker into a single number instead of vec2.
     * @param x -  Striker X velocity.
     * @param y - Striker Y velocity.
     * @returns {number}
     */
    GetStrikerVelocity(x: number, y: number): number {
        return Math.sqrt(Math.abs(x) + Math.abs(y));
    };
    //#endregion

    //#region -WaitUntil
    /**
     * @description - Make for check condition until condition will true and after execute the function.
     * @param condition - Condition must be a form of function.
     * @param callBackFunc - Function for call after the condition true.
     * @returns {Promise}
     */
    WaitUntil(condition: Function, callBackFunc: Function): Promise<void> {
        return new Promise(resolve => {
            const checkCondition = () => {
                // Stop checking if node is destroyed or invalid
                if (this._isDestroyed || !this.node || !this.node.isValid) {
                    console.warn("WaitUntil aborted: node is destroyed or invalid.");
                    return resolve(); // Exit safely
                }

                try {
                    if (condition()) {
                        callBackFunc();
                        resolve();
                    } else {
                        setTimeout(checkCondition, 100);
                    }
                } catch (e) {
                    console.error("WaitUntil error:", e);
                    resolve(); // Stop polling on error
                }
            };
            checkCondition();
        });
    }
    //#endregion

    //#region -TurnChange
    /**
     * @description - Changing turn after hit once.
     */
    TurnChange(): void {
        if (this.isTurnChanging) return;

        this.isTurnChanging = true;

        this.graphics.clear();
        this.arrowHead.active = false;
        if (this.strikerForceField.active) {
            this.strikerForceField.setScale(0, 0, 0);
            this.strikerForceField.active = false;
        }
        if (this.strickerParticles) this.strickerParticles.stopSystem();

        this.rigidBody.linearVelocity = new Vec2(0, 0);
        this.isMoving = false;
        this.strikerSlider.enabled = true;

        const gameManager = GameManager.instance;

        // Handle Queen not covered
        if (gameManager.IsTurnChange()) {
            // if (gameManager.isQueenPocket && !gameManager.isQueenCovered) {
            //     gameManager.RecoverCarrommen(COIN_TYPE.QUEEN);
            //     gameManager.OnQueenCoverFailed();
            // }

            // Switch turn
            gameManager.playerTurn = false;
            gameManager.aiTurn = true;
            gameManager.gameEvent.emit("turn_change");
        } else {
            // Reappear striker with animation (not turn change)
            AnimationManager.PocketAnimation(this.node, false);
            gameManager.ResumeTimer(true);
        }
        // Reset position after animation
        const newX = this.strikerSlider.progress * Constant.BASELINE_WIDTH - Constant.BASELINE_WIDTH / 2;
        this.node.setPosition(newX, this.GetYPosBaseline(), 0);

        // Game mode checks
        if (gameManager.gameMode === GAME_MODE.CHALLENGER) {
            if (this.IsWinGame() && gameManager.isGameOver) {
                gameManager.gameEvent.emit("game_over");
            } else if (this.IsWinGame()) {
                gameManager.gameEvent.emit("level_complete");
            } else if (gameManager.isGameOver) {
                gameManager.gameEvent.emit("game_over");
            }
        } else {
            gameManager.CheckWins();
        }

        this.scheduleOnce(() => {
            this.isTurnChanging = false;
        }, 1)
    }
    //#endregion

    EnableTouchEvent(): void {
        this.node.on(Input.EventType.TOUCH_START, this.OnMouseDown, this);
    };

    //#region GetYPosBaseline
    GetYPosBaseline(): number {
        return this.playerBaseLine.getPosition().y + this.playerBaseLine.parent.getPosition().y;
    }
    //#endregion

    //#region -OnStrikerSliderDragStart
    OnStrikerSliderDragStart(): void {
        if (this.isMoving) return;

        this.rigidBody.enabled = false;
    }
    //#endregion

    RigidBodyEnable(_isEnable: boolean): void {
        this.rigidBody.enabled = _isEnable;
    }

    //#region OnStrikerSliderDragEnd
    OnStrikerSliderDragEnd(): void {
        if (this.isMoving) return;
        do {
            if (this.ObstacleDetected()) {
                const obstacleX = this.node.getPosition().x;
                const strikerX = this.strikerSlider.progress * Constant.BASELINE_WIDTH - Constant.BASELINE_WIDTH / 2;

                if (obstacleX > strikerX) {
                    this.strikerSlider.progress = Math.max(this.strikerSlider.progress - 0.05, Constant.MIN_STRIKER_BASELINE_CLAMP);
                } else {
                    this.strikerSlider.progress = Math.min(this.strikerSlider.progress + 0.05, Constant.MAX_STRIKER_BASELINE_CLAMP);
                }

                const newX = this.strikerSlider.progress * Constant.BASELINE_WIDTH - Constant.BASELINE_WIDTH / 2;

                this.node.setPosition(newX, this.GetYPosBaseline(), 0);

                if (this.strikerSlider.progress <= Constant.MIN_STRIKER_BASELINE_CLAMP || this.strikerSlider.progress >= Constant.MAX_STRIKER_BASELINE_CLAMP) {
                    console.log("Not able to place stricker");
                    break;
                }
            }
        } while (this.ObstacleDetected());

        setTimeout(() => {
            this.rigidBody.enabled = true;
        }, 50);
    }
    //#endregion

    //#region -StrikerPocket
    StrikerPocket(_pocketNode: Node): void {
        AnimationManager.PocketAnimation(this.node, true, _pocketNode, () => {
            this.scheduleOnce(() => {
                GameManager.instance.ResetPocketedState();
                this.RigidBodyEnable(true);

                // Set turn change only if striker is pocketed
                GameManager.instance.SetTurnChange(true);
                this.isTurnChanging = false;

                this.TurnChange(); // continue with turn logic
            }, 1);
        });
    }

    //#endregion

    //#region PlayFocus
    PlayFocus(): void {
        const choosedColor: string = GameManager.instance.playerChoosedCoinColor;
        this.carromMenParent.children.forEach((_carrommen: Node, _index: number) => {
            const carromDatabase = _carrommen.getComponent(CarromenDatabase);
            if (carromDatabase.IsChoosedColor(choosedColor) && !carromDatabase.IsPocket()) {
                carromDatabase.FocusAnimation();
            }
        });
    };
    //#endregion

    ResetFirstTimeHit(): void {
        this.isFirstTimeHitCompleted = false;
    };

    //#region -OnDisable
    protected onDisable(): void {
        this.EventHandler(false);
    }

    protected onDestroy(): void {
        this._isDestroyed = true;
    }
    //#endregion
}