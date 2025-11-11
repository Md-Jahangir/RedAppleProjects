


import { _decorator, Component, Quat, Vec3 } from 'cc';
import { RepeatingSetScript } from './RepeatingSetScript';
import { Constant } from '../Constant';
const { ccclass } = _decorator;

@ccclass('CarScript')
export class CarScript extends Component {
    private isRightDirection: boolean = true;
    private speed: number = 10;

    private startPos: Vec3 = new Vec3();
    private endX: number = 0;
    private _currentPos: Vec3 | null = null;

    private parentSetScript: RepeatingSetScript | null = null;

    onEnable() {
        this.parentSetScript = this.node.parent?.parent?.getComponent(RepeatingSetScript);
    }

    //#region Car SetSpeed Func
    SetSpeed(_speed: number) {
        this.speed = _speed;
    }
    //#endregion

    //#region Move Car Based on Lane Direction
    MoveCar(_isRightDirection: boolean) {
        this.isRightDirection = _isRightDirection;

        if (_isRightDirection) {
            this.RightDirCarDataSet();
            this.node.rotation = Quat.fromEuler(new Quat(), 0, -90, 0);
            this.node.getChildByName("shadowLeft").active = false;
            this.node.getChildByName("shadowRight").active = true;
        } else {
            this.LeftDirCarDataSet();
            this.node.rotation = Quat.fromEuler(new Quat(), 0, 90, 0);
            this.node.getChildByName("shadowRight").active = false;
            this.node.getChildByName("shadowLeft").active = true;
        }

        this.node.setPosition(this.startPos);
    }

    RightDirCarDataSet() {
        this.endX = -80;
    }

    LeftDirCarDataSet() {
        this.endX = 40;
    }
    //#endregion

    //#region  CarStart Pos Initialize
    SetStartPos(_startPos: Vec3) {
        this.startPos.set(_startPos);
        this._currentPos = this.startPos;

    }
    //#endregion

    //#region car Move frame by frame handle
    update(deltaTime: number) {
        if ((!this.parentSetScript || !this.parentSetScript.CheckRender()) && !this._currentPos) return;

        const effectiveSpeed = this.speed * deltaTime * Constant.speedRatio;
        const direction = this.isRightDirection ? -1 : 1;
        this.node.getPosition(this._currentPos);
        this._currentPos.x += effectiveSpeed * direction;
        this.node.setPosition(this._currentPos);

        const currentX = this._currentPos.x;
        if ((this.isRightDirection && currentX <= this.endX) ||
            (!this.isRightDirection && currentX >= this.endX)) {
            if (this.isRightDirection) {
                this.node.setPosition(new Vec3(40, -0.9, this.startPos.z));
                this._currentPos.x = 40;
            }
            else {
                this.node.setPosition(new Vec3(-80, -0.9, this.startPos.z));
                this._currentPos.x = -80;
            }
        }
    }
    //#endregion
}


