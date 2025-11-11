import { _decorator, Component, instantiate, Node, Prefab, Vec3 } from 'cc';
import { RepeatingSetScript } from './RepeatingSetScript';
import { Constant } from '../Constant';
const { ccclass, property } = _decorator;

@ccclass('LogScript')
export class LogScript extends Component {
    @property(Prefab) coinPrefab: Prefab = null!;
    @property private speed: number = 20;

    private isRightDirection: boolean = true;
    private startPos: Vec3 = new Vec3();
    private endX: number = 0;
    private lastDelta = new Vec3();

    private parentSetScript: RepeatingSetScript = null!;
    private _targetPos: Vec3 = new Vec3();
    private _newPos: Vec3 = new Vec3();

    private _elapsedTime: number = 0;
    private _boostActive: boolean = false;
    private _boostMultiplier: number = 1;
    private _boostDuration: number = 2;

    start() {
        this.parentSetScript = this.node.parent?.parent?.getComponent(RepeatingSetScript)!;

        switch (Constant.mode) {
            case 'easy':
                this._boostMultiplier = 6;
                this._boostDuration = 1;
                break;
            case 'medium':
                this._boostMultiplier = 4;
                this._boostDuration = 1.5;
                break;
            case 'hard':
                this._boostMultiplier = 3;
                this._boostDuration = 1.2;
                break;
            default:
                this._boostMultiplier = 4;
                this._boostDuration = 1.5;
                break;
        }
    }

    SetSpeed(_speed: number) {
        this.speed = _speed;
    }

    MoveLog(_isRightDirection: boolean) {
        this.isRightDirection = _isRightDirection;
        this.setDirectionData();

        this.node.setPosition(this.startPos);
        this._elapsedTime = 0;
        this._boostActive = true;

        if (this.coinPrefab && Math.random() < 0.2) {
            const coin = instantiate(this.coinPrefab);
            coin.setParent(this.node);
            coin.setPosition(0, 2.5, 0);
        }
    }

    private setDirectionData() {
        if (this.isRightDirection) {
            this.startPos.set(40, 0, 2.5);
            this.endX = -80;
        } else {
            this.startPos.set(-80, 0, -2.5);
            this.endX = 40;
        }
    }

    update(deltaTime: number) {
        if (!this.parentSetScript?.CheckRender()) return;

        if (this._boostActive) {
            this._elapsedTime += deltaTime;
            if (this._elapsedTime > this._boostDuration) {
                this._boostActive = false;
            }
        }

        const speedMultiplier = this._boostActive ? this._boostMultiplier : 1;
        const moveSpeed = this.speed * speedMultiplier * deltaTime * Constant.speedRatio;

        const currentX = this.node.position.x;
        const direction = this.isRightDirection ? -1 : 1;
        const targetX = currentX + moveSpeed * direction;

        // If passed end, reset
        if ((this.isRightDirection && targetX <= this.endX) || (!this.isRightDirection && targetX >= this.endX)) {
            this.node.setPosition(this.startPos);
            this.lastDelta.set(0, 0, 0);
            this._boostActive = false;
            return;
        }

        this._targetPos.set(targetX, this.node.position.y, this.node.position.z);
        Vec3.lerp(this._newPos, this.node.position, this._targetPos, 0.25);
        this.node.setPosition(this._newPos);
        this.lastDelta.set(this._newPos.x - currentX, 0, 0);
    }

    GetLogMovementDelta(deltaTime: number): Vec3 {
        return this.lastDelta.clone();
    }
}
