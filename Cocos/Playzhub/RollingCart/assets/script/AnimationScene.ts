import { _decorator, CCFloat, Component, Node, RigidBody2D, sp, Vec2, clamp, director, Animation, AudioSource, randomRange } from 'cc';
import { SoundManager } from './SoundManager';
import GA from 'gameanalytics';
const { ccclass, property } = _decorator;

@ccclass('AnimationScene')
export class AnimationScene extends Component {
    //#region -Fields
    @property(Node) player: Node = null;
    @property(Node) playerBody: Node = null;
    playerRigidBody: RigidBody2D = null;
    playerSpineAnimation: sp.Skeleton = null;

    @property(Node) ostrich: Node = null;
    ostrichRigidBody: RigidBody2D = null;
    ostrichSpineAnimation: sp.Skeleton = null;

    @property(CCFloat) playerSpeed: number;
    @property(CCFloat) minPlayerAnimationSpeed: number;
    @property(CCFloat) maxPlayerAnimationSpeed: number;
    currentPlayerAnimKey: string = "";

    @property(CCFloat) ostrichSpeed: number;
    @property(CCFloat) ostrichAnimationSpeed: number;
    currentOstrichAnimKey: string = "";

    @property(Node) transitionSprite: Node = null;

    //#endregion

    //#region -OnEnable
    protected onEnable(): void {
        SoundManager.instance.SetBackgroundMusicSource();
        SoundManager.instance.PlayBackgroundMusic();
        this.OnOrientationChange();
    }
    //#endregion

    //#region -OnOrientationChange
    OnOrientationChange(): void {
        const orientation = director.getScene().getChildByName('UICanvas').getChildByName('Orientation');
        if (screen.orientation.type === 'portrait-primary') {
            orientation.active = true;
        } else {
            orientation.active = false;
        }
    }
    //#endregion

    //#region -Start
    start() {
        GA.GameAnalytics.addDesignEvent("screen:game_story");
        //Scene transition effect.
        this.transitionSprite.getComponent(Animation).play("fadeIn");

        //Player Components
        this.playerRigidBody = this.player.getComponent(RigidBody2D);
        this.playerSpineAnimation = this.playerBody.getComponent(sp.Skeleton);
        this.playerSpineAnimation.setMix("idle", "walk", 1);

        if (SoundManager.instance.playSoundState) {
            this.player.getComponent(AudioSource).play();
            // this.ostrich.getComponent(AudioSource).play();
        }

        //Ostrich Components
        this.ostrichRigidBody = this.ostrich.getComponent(RigidBody2D);
        this.ostrichSpineAnimation = this.ostrich.getComponent(sp.Skeleton);
        this.OstrichAnimation();
        this.ChangingScene();
    }
    //#endregion

    //#region -Update
    update(deltaTime: number) {
        this.PlayerMovement();
        this.PlayerAnimation();
        this.OstrichMovement();
    }
    //#endregion

    //#region -PLAYER -----------------------------

    //#region -PlayerMovement
    PlayerMovement(): void {
        if (this.playerRigidBody.linearVelocity.x <= this.playerSpeed) {
            this.playerRigidBody.linearVelocity = new Vec2(this.playerSpeed, this.playerRigidBody.linearVelocity.y);
        }
    }
    //#endregion

    //#region -PlayerAnimation
    PlayerAnimation() {
        this.playerSpineAnimation.timeScale = this.TimeScaleCalculate(this.playerRigidBody.linearVelocity.x, this.playerSpeed / 3, this.minPlayerAnimationSpeed, this.maxPlayerAnimationSpeed);

        this.SetPlayerAnimation("walk", true);
    }
    //#endregion

    //#region -SetPlayerAnimation
    SetPlayerAnimation(_animKey: string, _isLoop: boolean): void {
        if (this.currentPlayerAnimKey == _animKey) return;

        this.playerSpineAnimation.setAnimation(0, _animKey, _isLoop);
        this.currentPlayerAnimKey = _animKey;
    }
    //#endregion

    //#endregion -------------------------------------

    //#region -Ostrich

    //#region -OstrichMovement
    OstrichMovement(): void {
        if (this.ostrichRigidBody.linearVelocity.x <= this.ostrichSpeed) {
            this.ostrichRigidBody.linearVelocity = new Vec2(this.ostrichSpeed, this.ostrichRigidBody.linearVelocity.y);
        }
    }
    //#endregion

    //#region -OstrichAnimation
    OstrichAnimation(): void {
        this.ostrichSpineAnimation.timeScale = this.ostrichAnimationSpeed;
        this.ostrichSpineAnimation.setAnimation(0, "Walk", true);
    }
    //#endregion

    //#endregion

    //#region - Timescale calculate
    /**
     * 
     * @param _currentValue -actual value which need to calulate
     * @param _maxValue - max value for percentage
     * @returns - percent.
     */
    TimeScaleCalculate(_currentValue: number, _maxValue: number, _minScale: number, _maxScale: number): number {
        let _percent: number = _currentValue / _maxValue;
        _percent = clamp(_percent, _minScale, _maxScale);
        return _percent;
    }
    //#endregion

    //#region -ChangingScene
    ChangingScene(): void {
        director.preloadScene("GameScene", () => {
            setTimeout(async () => {
                this.transitionSprite.getComponent(Animation).play("fadeOut");
                await this.Sleep(2);
                director.loadScene("GameScene");
            }, 5000);
        })
    }
    //#endregion

    //#region -Transition Effect
    Sleep(_seconds: number) {
        return new Promise((e) => setTimeout(e, _seconds * 1000));
    }
    //#endregion

    //#region -PlayFootStep
    PlayFootStep(): void {
        this.playerSpineAnimation.setStartListener((entry: sp.spine.TrackEntry) => {
            if (entry.animation.name == "walk" || entry.animation.name == "back_walk") {
                this.player.getComponent(AudioSource).play();
            }
        })
        this.playerSpineAnimation.setCompleteListener((entry: sp.spine.TrackEntry) => {
            if (entry.animation.name == "walk" || entry.animation.name == "back_walk") {
                this.player.getComponent(AudioSource).stop();
            }
        })
    }
    //#endregion
}


