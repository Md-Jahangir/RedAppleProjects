/******** Script_Details ***********
 * @Original_Creator :- Amit Kumar.
 * @Created_Date :- 21-08-2024.
 * @Last_Update_By :- Amit Kumar.
 * @Last_Updatd_Date :- 23-08-2024
 * @Description :- Camera class.
 ************************************/
import { _decorator, CCFloat, Component, Node, Vec3, lerp, clamp, Camera, RigidBody2D } from 'cc';
import { SoundManager } from './SoundManager';
const { ccclass, property } = _decorator;

@ccclass('CameraScript')
export class CameraScript extends Component {
    @property(Node) playerTransform: Node = null;
    currentCamPosition: Vec3 = null;
    targetCamPosition: Vec3 = null;
    cameraOffset: Vec3 = new Vec3(162, 0, 0);
    mainCam: Camera = null;
    @property(Node) fog: Node = null;
    @property(Node) timerText: Node = null;

    @property(CCFloat) camFollowSpeed: number;

    camZoomSpeed: number = 0.05;
    velocityFactor: number = 0.05;
    minFOV: number = 35;
    maxFOV: number = 55;
    isEggDropped: boolean = false;

    protected onEnable(): void {
        SoundManager.instance.SetBackgroundMusicSource();
        SoundManager.instance.PlayBackgroundMusic();
    }

    //#region - start
    start() {
        this.mainCam = this.node.getComponent(Camera);
    }
    //#endregion

    //#region - update
    update(deltaTime: number) {
        this.FollowPlayer();
        this.CameraZoom();
    }
    //#endregion

    //#region - FollowPlayer
    /**
     * @description - camera follow player.
     */
    FollowPlayer(): void {
        this.targetCamPosition = this.playerTransform.getPosition();
        this.currentCamPosition = this.node.getPosition();
        this.currentCamPosition.lerp(this.targetCamPosition, this.camFollowSpeed);
        this.currentCamPosition.x = this.currentCamPosition.x + this.cameraOffset.x;
        this.currentCamPosition.y = this.node.position.y;
        this.currentCamPosition.z = this.node.position.z;
        this.node.setPosition(this.currentCamPosition);
        this.fog.setPosition(this.node.getPosition());
        this.timerText?.setPosition(this.node.getPosition().x, 490);
    }
    //#endregion

    //#region -CameraZoom
    CameraZoom(): void {
        let playerVelocity: number = this.playerTransform.getComponent(RigidBody2D).linearVelocity.x;
        let targetFov: number = lerp(this.minFOV, this.maxFOV, playerVelocity * this.velocityFactor);
        targetFov = clamp(targetFov, this.minFOV, this.maxFOV);
        if (this.isEggDropped) targetFov = this.maxFOV;

        this.mainCam.fov = lerp(this.mainCam.fov, targetFov, this.camZoomSpeed);
    }
    //#endregion
}


