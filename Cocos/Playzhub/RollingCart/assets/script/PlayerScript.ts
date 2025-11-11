/******** Script_Details ***********
 * @Original_Creator :- Amit Kumar.
 * @Created_Date :- 22-08-2024.
 * @Last_Update_By :- Amit Kumar.
 * @Last_Updatd_Date :- 12-09-2024
 * @Description :- Player Class.
 ************************************/
import { _decorator, Component, EventKeyboard, Input, input, Node, RigidBody2D, Vec2, Collider2D, Contact2DType, IPhysics2DContact, sp, clamp, ERigidBody2DType, Camera, Prefab, AudioSource, randomRange } from 'cc';
import { ScoreManager } from './ScoreManager';
import { SoundManager } from './SoundManager';
import GA from 'gameanalytics';
const { ccclass, property } = _decorator;

@ccclass('PlayerScript')
export class PlayerScript extends Component {
    //#region -Fields
    //reference 
    @property(Node) startPoint: Node = null;
    @property(Node) scoreManager: Node = null;
    @property(Node) player: Node = null;
    @property(sp.Skeleton) playerAnimation: sp.Skeleton = null;
    @property(Node) cartBody: Node = null;
    @property(Node) uiStarPos: Node = null;
    @property(Camera) camera: Camera;
    @property(Prefab) starPrefabs: Prefab = null;

    //player controll values
    maxVelocity: number = 20;
    maxVelocityBackward: number = -4;
    private playerMovementForce: number = 8000;
    direction: number = 0;

    //Player Physics and Animation
    playerRigidBody: RigidBody2D = null;
    cartCollider: Collider2D = null;
    animationMixTime: number = 1;
    currentAnimation: string = "";

    //others
    isContact: Boolean = false;
    distance: number = 0;
    isEggDropped: Boolean = false;
    particleAmount: number = 500;
    isHitedByOstrich: boolean = false;

    // audioSource: AudioSource;
    //#endregion

    //#region - On Enable
    /**
     * @description - for register events and getting components before game starts.
     */
    protected onEnable(): void {
        //events and getting reference
        input.on(Input.EventType.KEY_DOWN, this.onKeyboardDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyboardUp, this);
        this.playerRigidBody = this.node.getComponent(RigidBody2D);
        this.cartCollider = this.cartBody.getComponent(Collider2D);
        this.cartCollider.on(Contact2DType.BEGIN_CONTACT, this.OnBeginContact, this);
        this.playerAnimation = this.player.getComponent(sp.Skeleton);
        // this.audioSource = this.node.getComponent(AudioSource);

        //Set Animation Blend.
        this.SetAnimationBlend("idle", "walk", 0.4);
        this.SetAnimationBlend("walk", "idle", 1);
        this.SetAnimationBlend("idle", "back_walk", 1);
        this.SetAnimationBlend("back_walk", "idle", 1);
        this.SetAnimationBlend("walk", "back_walk", 1);
        //Play Default Animation Idle.
        this.PlayAnimation("idle", true);
        this.PlayFootStep();
    }
    //#endregion

    protected start(): void {
        GA.GameAnalytics.addProgressionEvent(
            "Start",
            "rolling_cart_endless"
        );
    }

    //#region - update
    /**
     * @description - update function
     * @param deltaTime - time difference between previous and current frames
     */
    update(deltaTime: number) {
        let currentVelocity: number = this.playerRigidBody.linearVelocity.x;
        if (this.direction > 0 && this.playerRigidBody.linearVelocity.x < this.maxVelocity && !this.isEggDropped || this.direction < 0 && this.playerRigidBody.linearVelocity.x > this.maxVelocityBackward && !this.isEggDropped) {
            this.playerRigidBody.applyForceToCenter(new Vec2(this.direction * this.playerMovementForce, 0), true);
        }
        this.PlayerAnimationControl();
    }
    //#endregion

    //#region -PlayerAnimationControl
    PlayerAnimationControl(): void {
        if (this.playerRigidBody.linearVelocity.x > 1) {
            this.PlayAnimation("walk", true);
            this.playerAnimation.timeScale = this.TimeScaleCalculate(this.playerRigidBody.linearVelocity.x, this.maxVelocity / 3);
        }
        else if (this.playerRigidBody.linearVelocity.x < -1) {
            this.PlayAnimation("back_walk", true);
            this.playerAnimation.timeScale = this.TimeScaleCalculate(this.playerRigidBody.linearVelocity.x, this.maxVelocityBackward);
        }
        else if (this.isHitedByOstrich) {
            this.PlayAnimation("getting_hit", false);
        }
        else {
            this.PlayAnimation("idle", true);
            this.playerAnimation.timeScale = 1;
        }

    }
    //#endregion

    //#region - WalkLeft
    /**
     * @description - Player left walk control.
     * @param dt -  time difference between previous and current frames recieved from update function.
     */
    WalkLeft(): void {
        this.direction = -1;
    }
    //#endregion

    //#region - WalkRight
    /**
     * @description - Player right walk control.
     * @param dt -  time difference between previous and current frames recieved from update function.
     */
    WalkRight(): void {
        this.direction = 1;
    }
    //#endregion

    //#region - Idle State
    /**
     * @description - Idle State of Player
     */
    IdleState(): void {
        this.direction = 0;
        // this.audioSource?.stop();
    }
    //#endregion

    //#region - OnKeboardDown
    /**
     * @description - Input Control for Keyboard.
     * @param event - parameter recieve from keyboard down events
     */
    onKeyboardDown(event: EventKeyboard): void {
        switch (event.keyCode) {
            case 65:
                this.WalkLeft();
                break;
            case 68:
                this.WalkRight();
                break;
            default:
                break;
        }
    }
    //#endregion

    //#region - OnKeboardUp
    /**
     * @description - Input Control for Keyboard.
     * @param event - parameter recieve from keyboard down events
     */
    onKeyboardUp(event: EventKeyboard): void {
        switch (event.keyCode) {
            case 65:
                this.IdleState();
                break;
            case 68:
                this.IdleState();
                break;
            default:
                break;
        }
    }
    //#endregion

    //#region - OnCollisionEnter
    /**
     * @description - callback function while contact with others gameobjects
     * @param self - self collider details
     * @param others - others gameobjects colleder detail
     * @param contact - contact details between self and others gameobjects.
     */
    OnBeginContact(self: Collider2D, others: Collider2D, contact: IPhysics2DContact): void {
        if (others.group == 16 && !this.isEggDropped) {
            this.scheduleOnce(() => {
                others.node.active = false;
                this.isContact = false;
            }, 0)
            if (!this.isContact) {
                this.isContact = true;
                let newPosition = this.camera.worldToScreen(others.node.getPosition());
                this.scoreManager.getComponent(ScoreManager).ScoreIncreament(newPosition);
                SoundManager.instance.PlayStarCollectSound();
            }
        }
    }
    //#endregion

    //#region -SetMix
    /**
     * @description - Using for blending animation between two animation state.
     * @param _animStateOne -  animation state one
     * @param _animStateTwo -  animation state two
     * @param _mixTime - time difference tranfering from first animation state to another state. 
     */
    SetAnimationBlend(_animStateOne: string, _animStateTwo: string, _mixTime: number): void {
        this.playerAnimation?.setMix(_animStateOne, _animStateTwo, _mixTime);
    }
    //#endregion

    //#region - PlayAnimation
    /**
     * @description - this function is make for play animation even its call in update!...
     * @param animKey - key of animation which want to play.
     * @param isLoop - animation will play loop?
     * @returns - return from function if same key play again...
     */
    PlayAnimation(animKey: string, isLoop: boolean): void {
        if (animKey == this.currentAnimation) return;

        this.playerAnimation?.setAnimation(0, animKey, isLoop);
        this.currentAnimation = animKey;
    }
    //#endregion

    //#region - Timescale calculate
    /**
     * 
     * @param _currentValue -actual value which need to calulate
     * @param _maxValue - max value for percentage
     * @returns - percent.
     */
    TimeScaleCalculate(_currentValue: number, _maxValue: number): number {
        let _percent: number = _currentValue / _maxValue;
        _percent = clamp(_percent, 0.8, 2.5);
        return _percent;
    }
    //#endregion

    //#region -Physics Off
    PhysicsOff(): void {
        this.playerRigidBody.type = ERigidBody2DType.Static;
        this.node.getComponent(RigidBody2D).type = ERigidBody2DType.Static;
    }
    //#endregion

    //#region -PlayFootStep
    PlayFootStep(): void {
        this.playerAnimation.setStartListener((entry: sp.spine.TrackEntry) => {
            if (entry.animation.name == "walk" || entry.animation.name == "back_walk") {
                // this.audioSource.play();
                SoundManager.instance.PlayFootStep(randomRange(0.3, 1));
            }
        })
        this.playerAnimation.setCompleteListener((entry: sp.spine.TrackEntry) => {
            if (entry.animation.name == "walk" || entry.animation.name == "back_walk") {
                // this.audioSource.stop();
                SoundManager.instance.PlayFootStep(randomRange(0.3, 1));
            }
        })
    }
    //#endregion

    //#region - OnDisable
    /**
     * @description - For remove events from game for bugfix
     */
    protected onDisable(): void {
        input.off(Input.EventType.KEY_DOWN, this.onKeyboardDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyboardUp, this);
    }
    //#endregion
}


