import { _decorator, AudioSource, clamp01, Collider2D, Component, Contact2DType, ERigidBody2DType, EventTarget, IPhysics2DContact, Node, PolygonCollider2D, randomRange, RigidBody2D, sp, Vec2 } from 'cc';
import { PlayerScript } from './PlayerScript';
import { UIManager } from './UIManager';
import { SoundManager } from './SoundManager';
const { ccclass, property } = _decorator;

@ccclass('OstrichAI')
export class OstrichAI extends Component {
    //#region -Fields
    event = new EventTarget();
    @property(Node) playerTransform: Node = null;
    @property(Node) ostrichTransform: Node = null;
    @property(Node) uiManager: Node = null;
    //Components
    selfRigidBody: RigidBody2D = null;
    spineAnimation: sp.Skeleton = null;

    //Property
    speed: number = 15;
    playerNearbyDistance: number = 350;
    ostrichSpawnOffsetX: number = 1000;
    ostrichSpawnOffsetY: number = 300;
    currentAnimationKey: string = "";
    isPlayerNearby: boolean = false;
    isReadyToRun: boolean = false;

    distance: number = 0;
    Max_Velocity: number = 15;

    audioSource: AudioSource;
    //#endregion

    //#region -OnEnable
    protected onEnable(): void {
        this.event.once("egg_droped", this.OnEggDroped, this);
        this.ostrichTransform.getComponent(PolygonCollider2D).on(Contact2DType.BEGIN_CONTACT, this.OnCollideWithPlayer, this);
        this.ostrichTransform.active = false
    }
    //#endregion

    //#region -Start
    start() {
        this.selfRigidBody = this.node.getComponent(RigidBody2D);
        this.audioSource = this.selfRigidBody.getComponent(AudioSource);
        this.spineAnimation = this.ostrichTransform.getComponent(sp.Skeleton);
        this.spineAnimation.setMix("Walk", "Stop", 0.5);
        this.spineAnimation.timeScale = 1;
    }
    //#endregion

    //#region -LateUpdate
    protected lateUpdate(dt: number): void {
        if (this.playerTransform.getComponent(PlayerScript).isEggDropped) {
            this.event.emit("egg_droped");
            this.MoveTowardsPlayer();
            this.OstrichAnimationControll();
        }
    }
    //#endregion

    //#region -OnEggDroped
    OnEggDroped(): void {
        this.PlayFootStep();
        this.ostrichTransform.active = true;
        this.isReadyToRun = true;
        this.node.setPosition(this.playerTransform.getPosition().x - this.ostrichSpawnOffsetX, this.node.getPosition().y + this.ostrichSpawnOffsetY);
    }
    //#endregion

    //#region -MoveTowardsPlayer
    MoveTowardsPlayer(): void {
        // if (this.isReadyToRun && !this.isPlayerNearby && this.selfRigidBody.linearVelocity.x < this.Max_Velocity && this.distance > this.playerNearbyDistance) {
        // }
        this.selfRigidBody.linearVelocity = new Vec2(this.speed, this.selfRigidBody.linearVelocity.y);
        // if (this.isReadyToRun) {
        //     let newPosition: Vec3 = new Vec3(this.PositionLerpX(this.node.getPosition().x, this.playerTransform.getPosition().x, 0.01), this.node.getPosition().y, this.node.getPosition().z);
        //     this.node.setPosition(newPosition);
        // }
    }
    //#endregion

    //#region -CheckPlayerNearby
    CheckPlayerNearby(): void {
        this.distance = Vec2.distance(this.node.getPosition(), this.playerTransform.getPosition());

        if (this.distance <= this.playerNearbyDistance) {
            this.isPlayerNearby = true
            this.isReadyToRun = false;
        }
        else {
            this.isPlayerNearby = false;
            this.isReadyToRun = true;
        }
    }
    //#endregion

    //#region -OstrichAnimationControll
    OstrichAnimationControll(): void {
        if (this.selfRigidBody.linearVelocity.x > 1 && !this.isPlayerNearby) {
            this.SetAnimation("Walk", true);
        }
        else if (this.selfRigidBody.linearVelocity.x < 1 && this.isPlayerNearby) {

        }
    }
    //#endregion

    //#region -SetAnimation
    /**
     * @description - Function make for play animation in update.
     * @param _animKey - animation state key
     * @param isLoop - loop
     * @returns 
     */
    SetAnimation(_animKey: string, isLoop: boolean): void {
        if (this.currentAnimationKey == _animKey) return;

        this.spineAnimation.setAnimation(0, _animKey, isLoop);
        this.currentAnimationKey = _animKey;
    }
    //#endregion

    //#region -PositionLerpX
    PositionLerpX(_objectAX: number, _objectBX: number, _timeScale: number): number {
        const timeScale = clamp01(_timeScale);
        let x: number = _objectAX + (_objectBX - _objectAX) * timeScale;
        return x;
    }
    //#endregion

    //#region -OnCollideWithPlayer
    /**
     * 
     * @param self - own collider
     * @param others - other contact collider
     * @param contactInfo - contact info
     */
    OnCollideWithPlayer(self: Collider2D, others: Collider2D, contactInfo: IPhysics2DContact): void {
        if (others.group == 128) {
            this.isPlayerNearby = true
            this.isReadyToRun = false;
            ;
            this.spineAnimation.setStartListener((entry: sp.spine.TrackEntry) => {
                if (entry.animation.name == "Stop") {
                    setTimeout(() => {
                        this.playerTransform.getComponent(PlayerScript).isHitedByOstrich = true;
                        SoundManager.instance.PlayPlayerGettingHitSound();
                    }, 2500);
                }
            })
            this.SetAnimation("Stop", false)
            this.speed = this.speed / 1.2;
            setTimeout(() => {
                this.speed = 0;
            }, 1500);
            this.scheduleOnce(() => {
                setTimeout(() => {
                    this.selfRigidBody.type = ERigidBody2DType.Static;
                }, 1500);
                //on animation complete.
                this.spineAnimation.setCompleteListener((entry: sp.spine.TrackEntry) => {
                    if (entry.animation.name == "Stop") {
                        setTimeout(() => {
                            this.uiManager.getComponent(UIManager).events.emit("GameOver");
                            // SoundManager.instance.PlayGameOverSound();
                        }, 500);
                    }
                })
            }, 0)
        }
    }
    //#endregion

    //#region -PlayFootStep
    PlayFootStep(): void {
        this.spineAnimation.setStartListener((entry: sp.spine.TrackEntry) => {
            if (entry.animation.name == "Walk") {
                // SoundManager.instance.PlayFootStep(randomRange(0.3, 1));
                this.audioSource.play();
            }
        })
        this.spineAnimation.setCompleteListener((entry: sp.spine.TrackEntry) => {
            if (entry.animation.name == "Walk") {
                // SoundManager.instance.PlayFootStep(randomRange(0.3, 1));
                this.audioSource.stop();
            }
        })
    }
    //#endregion
}


