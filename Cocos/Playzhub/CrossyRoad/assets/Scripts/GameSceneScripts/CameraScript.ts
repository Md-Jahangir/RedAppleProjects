
import { _decorator, Camera, CCFloat, Component, DebugMode, math, Node, Quat, tween, Vec3 } from 'cc';
import { Constant } from '../Constant';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('CameraScript')
export class CameraScript extends Component {
    @property(CCFloat) camFollowSpeed: number = 0.1;

    public playerTransform: Node | null = null;

    private cameraOffset: Vec3 = new Vec3(-16, 30, -17.5);
    private baseZSpeed: number = 30;
    private previousPlayerZ: number = 0;

    private deathEffectActive: boolean = false;
    private deathElapsed: number = 0;
    private deathDuration: number = 1.2;
    private deathType: string = '';
    private initialCamPos: Vec3 = new Vec3();

    private readonly camMinX = -30;
    private readonly camMaxX = 30;
    private camera: Camera = null!;
    private isCamOver: boolean = false;

    // Reusable vectors to avoid allocations
    private _targetPos: Vec3 = new Vec3();
    private _smoothedPos: Vec3 = new Vec3();
    private _cachedPlayerPos: Vec3 = new Vec3();
    private _cachedCamPos: Vec3 = new Vec3();

    protected onEnable(): void {
        this.camera = this.node.getComponent(Camera);
    }

    start() {
        const zOffset = Constant.mode === 'tutorial' ? -21.5 : -21.5;
        this.node.setPosition(new Vec3(-12, 30, zOffset));
    }

    //#region Camera DeathEffect Handle
    lateUpdate(deltaTime: number) {
        if (this.deathEffectActive) {
            this.updateDeathEffect(deltaTime);
            return;
        }

        const gm = GameManager.instance;
        if (!gm?.isStart || !gm.isFollow) return;
        if (deltaTime > 0.03) deltaTime = 0.03;
        this.followPlayer(deltaTime, gm);
    }
    //#endregion

    //#region  Death effect Func
    private updateDeathEffect(deltaTime: number) {
        this.deathElapsed += deltaTime;
        const t = math.clamp(this.deathElapsed / this.deathDuration, 0, 1);

        const shakeStrength = this.deathType === 'car' ? 0 : 2;
        const shake = Math.sin(this.deathElapsed * 50) * (1 - t) * shakeStrength;

        this.camera.orthoHeight = math.lerp(25, 20, t);

        const rotX = math.lerp(-40, -50, t);
        const { y, z } = this.node.eulerAngles;
        this.node.setRotationFromEuler(rotX, y, z);

        const camX = this.initialCamPos.x + shake;
        this.node.setPosition(camX, this.initialCamPos.y, this.initialCamPos.z);

        if (t >= 1) this.deathEffectActive = false;
    }

    CameraEffectAfterDeath(deathType: string) {
        this.deathEffectActive = true;
        this.deathElapsed = 0;
        this.deathType = deathType;
        this.initialCamPos.set(this.node.getPosition());
        this.deathDuration = deathType === 'train' ? 1.4 : 1.0;
    }
    //#endregion

    //#region  Player Assigned for follow player
    AssignCurrentPlayer(player: Node, setPosition: boolean = false) {
        this.camera.orthoHeight = 25;
        this.isCamOver = false;
        const { y, z } = this.node.eulerAngles;
        this.node.setRotationFromEuler(-40, y, z);
        this.playerTransform = player;
        this.previousPlayerZ = player.position.z;

        if (setPosition) {
            this.node.setPosition(new Vec3(-12, 30, this.previousPlayerZ - 21.5));
        }
    }
    //#endregion

    //#region  FollowPlayer Handle based on Distance
    private followPlayerAuto(deltaTime: number, gm: GameManager) {
        if (!this.playerTransform) return;

        this.playerTransform.getWorldPosition(this._cachedPlayerPos);
        this.node.getWorldPosition(this._cachedCamPos);

        const playerPos = this._cachedPlayerPos;
        const camPos = this._cachedCamPos;

        // Z movement
        const predictedZ = camPos.z + this.baseZSpeed * deltaTime;
        const offsetZ = playerPos.z + this.cameraOffset.z * 60;
        const targetZ = Math.max(predictedZ, offsetZ);
        const smoothedZ = math.lerp(camPos.z, targetZ, this.camFollowSpeed * deltaTime * 60);

        // X movement
        const offsetX = playerPos.x + this.cameraOffset.x;
        const clampedX = math.clamp(offsetX, this.camMinX, this.camMaxX);
        const smoothedX = math.lerp(camPos.x, clampedX, this.camFollowSpeed * deltaTime * 12);

        // Apply position
        this._smoothedPos.set(smoothedX, camPos.y, smoothedZ);
        this.node.setWorldPosition(this._smoothedPos);

        // Camera fail check
        if (!this.isCamOver && gm.isFollow) {
            const outOfBoundsX = playerPos.x < this.camMinX || playerPos.x > this.camMaxX;
            const isBehind = camPos.z > playerPos.z + 10;
            if (outOfBoundsX || isBehind) {
                this.isCamOver = true;
                gm.GameOverFunc("camera");
                if (DebugMode) console.log("Game over by camera", outOfBoundsX, isBehind);
            }
        }

        this.previousPlayerZ = playerPos.z;
    }
    private followPlayer(deltaTime: number, gm: GameManager) {
        if (!this.playerTransform) return;

        this.playerTransform.getWorldPosition(this._cachedPlayerPos);
        this.node.getWorldPosition(this._cachedCamPos);

        const playerPos = this._cachedPlayerPos;
        const camPos = this._cachedCamPos;

        const distanceZ = playerPos.z - camPos.z;
        const distanceX = playerPos.x - camPos.x;

        if (distanceZ < 20 || distanceX > 26 || distanceX < 6) {
            this.followPlayerAuto(deltaTime, gm);
            return;
        }

        // Easing and boost
        const t = math.clamp(distanceZ / 200, 0, 1);
        const easedSpeed = math.lerp(0.0015, 0.5, t * t);
        const catchUp = math.clamp((distanceZ - 5) / 15, 0, 1);
        const finalSpeed = easedSpeed * (1 + catchUp * 2);

        // Target position
        const targetZ = Math.max(camPos.z + this.baseZSpeed * deltaTime, playerPos.z + this.cameraOffset.z);
        const targetX = math.clamp(playerPos.x + this.cameraOffset.x, this.camMinX, this.camMaxX);

        this._targetPos.set(targetX, camPos.y, targetZ);
        Vec3.lerp(this._smoothedPos, camPos, this._targetPos, finalSpeed * deltaTime * 15);
        this.node.setWorldPosition(this._smoothedPos);

        // Camera fail check
        if (!this.isCamOver && gm.isFollow) {
            const outOfBoundsX = playerPos.x < this.camMinX || playerPos.x > this.camMaxX;
            const isBehind = camPos.z > playerPos.z + 10;
            if (outOfBoundsX || isBehind) {
                this.isCamOver = true;
                gm.GameOverFunc("camera");
                if (DebugMode) console.log("Game over by camera", outOfBoundsX, isBehind);
            }
        }

        this.previousPlayerZ = playerPos.z;
    }
    //#endregion

    //#region Speed Control Func
    CamSpeedControlForTutorial(speed: number) {
        this.baseZSpeed = speed;
    }

    GetCamSpeed(): number {
        return this.baseZSpeed;
    }

    IncreaseSpeed(): void {
        this.baseZSpeed += 2;
    }
    //#endregion

    //#region  Camera Follow Start on GameStart
    SetCamFollowData() {
        // const zOffset = Constant.mode === 'tutorial' ? -21.5 : -21.5;
        const start = this.camera.orthoHeight;
        const target = 25;
        const temp = { value: start };

        tween(temp)
            .to(0.9, { value: target }, {
                onUpdate: (obj) => {
                    this.camera.orthoHeight = obj.value;
                },
                onComplete: () => {
                    GameManager.instance.FirstPlayerMove();
                },
                easing: 'quadInOut'
            })
            .start();
    }
    //#endregion

}



