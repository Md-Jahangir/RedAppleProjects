import { _decorator, clamp, Component, Graphics, Node, PhysicsSystem2D, Rect, RigidBody2D, tween, Vec2, Vec3 } from 'cc';
import { CarromenDatabase } from './Database/CarromenDatabase';
import { GameManager } from './GameManager';
import { COIN_TYPE, Constant } from './Constant';
import { AnimationManager } from './utils/AnimationManger';
const { ccclass, property } = _decorator;

enum AIDifficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
};

@ccclass('AIStriker')
export class AIStriker extends Component {
    //#region -Fields
    @property(Node) aiBaselineWidth: Node = null;
    @property(Node) carromMenParent: Node = null;
    @property(Node) pockets: Node[] = [];
    isMoving: boolean = false;
    rigidBody: RigidBody2D;

    @property(Graphics) graphics: Graphics = null;
    isTurnChanging: boolean = false;
    _isDestroyed: boolean = false;

    difficulty: AIDifficulty = AIDifficulty.HARD;
    //#endregion

    protected onLoad(): void {
        this.rigidBody = this.node.getComponent(RigidBody2D);
    }

    //#region -PlayAIFunction
    async PlayAIFunction() {
        if (this.node.active != true) this.node.active = true;

        AnimationManager.PocketAnimation(this.node, false);

        this.rigidBody.enabled = false;
        // tween(this.node).to(1,{})
        GameManager.instance.SetTurnChange(true);
        const { nearestCarrommen, nearestPocket, numberOfCoinAvailable } = this.GetNearestCarrommen();

        if (!nearestCarrommen && numberOfCoinAvailable === 0) {
            GameManager.instance.CheckWins();
            // console.log("AI Wins!");
            return
        }
        await this.SetStrikerPosition(nearestCarrommen.getPosition(), nearestPocket.getPosition(), this.GetYPosBaseline());
        await this.Sleep(2);
        if (!this.isMoving) {
            const { force, direction } = this.CalculateForceAndAngle(this.node?.getWorldPosition(), nearestCarrommen.getWorldPosition(), nearestPocket.getWorldPosition());
            const forceApply = direction.normalize().multiplyScalar(force);
            this.rigidBody.applyLinearImpulseToCenter(new Vec2(forceApply.x, forceApply.y), true);
            this.isMoving = true;

            GameManager.instance.PauseTimer();
        }

        //Changing turn
        await this.Sleep(1.5);
        await this.WaitUntil(() => this.GetStrikerVelocity(this.rigidBody.linearVelocity.x, this.rigidBody.linearVelocity.y) < Constant.MIN_VELOCITY_FOR_TURN_CHANGE, this.TurnChange.bind(this));
    }
    //#endregion

    //#region GetYPosBaseline
    GetYPosBaseline(): number {
        return this.aiBaselineWidth.getPosition().y + this.aiBaselineWidth.parent.getPosition().y;
    };
    //#endregion

    //#region -GetNearestCarrommen
    GetNearestCarrommen(): { nearestCarrommen: Node, nearestPocket: Node, numberOfCoinAvailable: number } {
        let nearDistance: number = Infinity;
        let nearestCarrommen = null;
        let tempNearestCarrommen = null;
        let nearestPocket = null;
        let coinCounter: number = 0;
        const choosedColor: string = GameManager.instance.GetAIChoosedColor();
        this.carromMenParent.children.forEach((_carrommen: Node, _index: number) => {
            const carromDatabase = _carrommen.getComponent(CarromenDatabase);
            if (carromDatabase.IsChoosedColor(choosedColor) && !carromDatabase.IsPocket()) {
                coinCounter++;
                const targetPocket = this.GetNearestPocket(_carrommen.getPosition());
                const nearestDistanceObject = Vec2.distance(_carrommen.getPosition(), targetPocket.getPosition());
                if (nearDistance > nearestDistanceObject) {
                    nearestPocket = targetPocket;
                    nearDistance = nearestDistanceObject;
                    nearestCarrommen = _carrommen;
                    tempNearestCarrommen = nearestCarrommen;
                }
            }
        })
        if (coinCounter < 3 && !GameManager.instance.isQueenCovered) {
            nearestCarrommen = this.GetQueen();
        }
        if (!nearestCarrommen) nearestCarrommen = tempNearestCarrommen;
        return { nearestCarrommen, nearestPocket, numberOfCoinAvailable: coinCounter }
    }
    //#endregion

    //#region -GetQueen
    GetQueen(): Node {
        let queen: Node = null;
        this.carromMenParent.children.forEach((_carrommen: Node, _index: number) => {
            const carromDatabase = _carrommen.getComponent(CarromenDatabase);
            if (carromDatabase.IsQueen() && !carromDatabase.IsPocket()) {
                queen = _carrommen;
            }
        })
        return queen;
    }
    //#endregion

    //#region -SetStrikerPosition
    async SetStrikerPosition(coinPos: Vec3, pocketPos: Vec3, baselineY: number): Promise<void> {
        const directionToPocket = pocketPos.subtract(coinPos).normalize();
        const extendedPoint = coinPos.subtract(directionToPocket.multiplyScalar(Constant.EXTENDED_ANGLE_POS_X));
        let baselineX = extendedPoint.x;

        let clampedX = clamp(baselineX, -Constant.BASLINE_CLAMP_X, Constant.BASLINE_CLAMP_X);
        let attempt: number = 0;

        // const finalPos = new Vec3(clampedX, baselineY, this.node.getPosition().z);

        const originalPos = new Vec3(clampedX, baselineY, this.node.getPosition().z);
        const fakeOffset = 20; // Small shake distance
        const left = new Vec3(clampedX - fakeOffset, baselineY, this.node.getPosition().z);
        const right = new Vec3(clampedX + fakeOffset, baselineY, this.node.getPosition().z);

        await new Promise(resolve => {
            tween(this.node)
                .to(0.2, { position: right }, { easing: 'sineOut' })
                .to(0.3, { position: left }, { easing: 'sineInOut' })
                .to(0.1, { position: originalPos }, { easing: 'sineOut' })
                .call(() => resolve(null))
                .start();
        });

        do {
            this.node.setPosition(new Vec3(clampedX, baselineY, this.node.getPosition().z));
            if (this.ObstacleDetected()) {
                attempt++;
                const strikerRadius = Constant.STRIKER_DIAMETER / 2;
                if (this.node.getPosition().x > clampedX) {
                    clampedX = Math.max(clampedX - strikerRadius, -Constant.BASLINE_CLAMP_X);
                } else {
                    clampedX = Math.min(clampedX + strikerRadius, Constant.BASLINE_CLAMP_X);
                }
            }
        } while (this.ObstacleDetected() && attempt < Constant.MAX_PLACE_ATTEMPT);

        this.node.setPosition(new Vec3(clampedX, baselineY, this.node.getPosition().z));

        setTimeout(() => {
            this.rigidBody.enabled = true;
        }, 100);
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
    }
    //#endregion

    //#region -GetNearestPocket
    GetNearestPocket(position: Vec3): Node {
        let nearDistance = Infinity;
        let targetPocket = null;

        this.pockets.forEach((pocket) => {
            const distance = Vec3.distance(position, pocket.getPosition());
            if (distance < nearDistance) {
                nearDistance = distance;
                targetPocket = pocket;
            }
        });
        return targetPocket;
    }
    //#endregion

    //#region -GetCarrommenPosition
    GetCarrommenPosition(_nearestCorrommenPos: Vec3, _basslinePos: Vec3): Vec3 {
        return new Vec3(_nearestCorrommenPos.x, _basslinePos.y, _basslinePos.z);
    }
    //#endregion

    //#region -CalculateForceAndAngle
    /**
     * @description - Calculating force and angle for hit carrommens.
     * @param strikerPos 
     * @param carrommenPos 
     * @param pocketPos 
     * @returns 
     */
    CalculateForceAndAngle(strikerPos: Vec3, carrommenPos: Vec3, pocketPos: Vec3): { force: number, direction: Vec3 } {
        const toCarrommen = carrommenPos.subtract(strikerPos);
        const toPocket = pocketPos.subtract(carrommenPos);

        let forceMagnitude = Math.min(toCarrommen.length() + toPocket.length(), toCarrommen.length());
        forceMagnitude = clamp(forceMagnitude, 0, Constant.MAX_FORCE_MAGNITUDE);

        let direction = toCarrommen.normalize();

        // Apply inaccuracy based on difficulty
        const angleOffset = this.GetRandomAngleOffset();
        direction = this.ApplyAngleOffset(direction, angleOffset);

        return { force: forceMagnitude, direction };
    }

    GetRandomAngleOffset(): number {
        switch (this.difficulty) {
            case AIDifficulty.EASY:
                return Math.random() * 0.2 - 0.1; // ±0.1 rad
            case AIDifficulty.MEDIUM:
                return Math.random() * 0.1 - 0.05; // ±0.05 rad
            case AIDifficulty.HARD:
                return 0; // perfect accuracy
        }
    }

    ApplyAngleOffset(direction: Vec3, angleOffset: number): Vec3 {
        const cos = Math.cos(angleOffset);
        const sin = Math.sin(angleOffset);
        const x = direction.x * cos - direction.y * sin;
        const y = direction.x * sin + direction.y * cos;
        return new Vec3(x, y).normalize();
    }

    //#endregion

    RigidBodyEnable(_enable: boolean): void {
        this.rigidBody.enabled = _enable;
    }

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

    //#region GetStrikerVelocity
    GetStrikerVelocity(x: number, y: number): number {
        return Math.sqrt(Math.abs(x) + Math.abs(y));
    }
    //#endregion

    //#region TurnChange
    TurnChange(): void {
        if (this.isTurnChanging) return;
        this.isTurnChanging = true;

        this.rigidBody.linearVelocity = new Vec2(0, 0);
        this.isMoving = false;

        const gameManager = GameManager.instance;

        if (gameManager.IsTurnChange()) {
            // Switch turn to PLAYER
            gameManager.playerTurn = true;
            gameManager.aiTurn = false;

            // Reset striker to player baseline
            const resetX = this.aiBaselineWidth.getPosition().x;
            const resetPos = new Vec3(resetX, this.GetYPosBaseline(), this.node.getPosition().z);
            this.node.setPosition(resetPos);

            // Player turn animation
            setTimeout(() => {
                gameManager.PlayFocusAnimationCarrommen();
            }, 500);

            gameManager.gameEvent.emit("turn_change");
        } else {
            // If turn not changed, continue AI
            AnimationManager.PocketAnimation(this.node, false);
            gameManager.ResumeTimer(true);
            // Start AI logic after short delay
            this.scheduleOnce(() => {
                this.PlayAIFunction(); // defined in AIStriker
            }, 0.3);
        }
        this.scheduleOnce(() => {
            this.isTurnChanging = false;
        }, 1);
    }

    //#endregion

    StrikerPocket(_pocketNode: Node): void {
        AnimationManager.PocketAnimation(this.node, true, _pocketNode, () => {
            this.scheduleOnce(() => {
                // Reset striker position to its respective baseline
                const resetX = this.aiBaselineWidth.getPosition().x;  // This works for both AI and player, since it's passed correctly
                const resetZ = this.node.getPosition().z;
                const resetPos = new Vec3(resetX, this.GetYPosBaseline(), resetZ);
                this.node.setPosition(resetPos);
                this.isTurnChanging = false;
                GameManager.instance.ResetPocketedState();
                this.TurnChange(); // handle switching and animation after pocket
            }, 1);
        });
    }

    //#region Sleep
    Sleep(_seconds: number) {
        return new Promise((e) => setTimeout(e, _seconds * 1000));
    }
    //#endregion

    protected onDestroy(): void {
        this._isDestroyed = true;
    }
}


