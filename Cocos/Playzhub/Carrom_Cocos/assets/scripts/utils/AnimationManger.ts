import { _decorator, Component, Node, RigidBody2D, sp, tween, UITransform, Vec2, Vec3 } from 'cc';
import { Constant } from '../Constant';
const { ccclass, property } = _decorator;

@ccclass('AnimationManger')
class AnimationManger {
    public ButtonsInteractiveAnim(_button: Node, _duration: number, _onCompleteCallback: Function, _scale?:
        { initial_scale_x: number, initial_scale_y: number, final_scale_x: number, final_scale_y: number }
    ): void {
        let scaleProperty: Object = {};
        const scaleZ: number = _button.getScale().z;

        _scale ? scaleProperty = _scale : scaleProperty = {
            initial_scale_x: 0.95,
            initial_scale_y: 0.95,
            final_scale_x: 1,
            final_scale_y: 1,
        }

        _button.setScale(scaleProperty["initial_scale_x"], scaleProperty["initial_scale_y"], scaleZ);
        tween(_button).to(_duration, { scale: new Vec3(scaleProperty["final_scale_x"], scaleProperty["final_scale_y"], scaleZ) }, { easing: 'bounceOut' }).call(() => {
            _onCompleteCallback()
        }).start();
    }

    PocketAnimation(_targetNode: Node, _setPocket: boolean, _pocket?: Node, _completeCallback?: Function): void {
        if (_setPocket) {
            // Stop movement if any physics or motion applied
            _targetNode.setWorldPosition(_pocket?.getWorldPosition());
            const rigidBody = _targetNode.getComponent(RigidBody2D);
            if (rigidBody) {
                rigidBody.linearVelocity = new Vec2(0, 0);
                rigidBody.angularVelocity = 0;
                rigidBody.sleep();
            }

            // Animate into the hole (scale+fade)
            tween(_targetNode)
                .to(0.2, { scale: new Vec3(0, 0, 0) })
                .call(() => {
                    _targetNode.active = false;
                    if (_completeCallback)
                        _completeCallback();
                })
                .start();
        } else {
            _targetNode.active = true;
            _targetNode.scale = new Vec3(1, 1, 1);
        };
    };

    LevelStartTimerAnimation(_isPlay: boolean, _icon: Node, _targetPositionNode: Node): void {
        if (_isPlay) {
            _icon.setPosition(0, -1000, 1);
            const worldPos = _targetPositionNode.worldPosition;
            const targetPos = _icon.parent!.getComponent(UITransform)!.convertToNodeSpaceAR(worldPos);
            _icon.active = true;
            tween(_icon)
                .to(0.5, { position: new Vec3(0, 0, 1), scale: new Vec3(2, 2, 2) }, { easing: 'backIn' })
                .to(1, { scale: new Vec3(2.5, 2.5, 2.5) }, { easing: 'bounceIn' })
                .to(0.5, { position: targetPos, scale: new Vec3(1, 1, 1) }, { easing: 'backOut' })
                .call(() => {
                    _icon.active = false;
                })
                .start();
        } else {
            _icon.active = false;
        };
    };

    async ShowPopup(popupParentNode: Node, onStartCallBack: Function, onCompleteCallback: Function): Promise<void> {
        const popup: Node = popupParentNode.getChildByName("Popup");
        const pupupLength: number = popup.children.length;
        await onStartCallBack();
        popup.children.forEach((child: Node, index: number) => {
            child.active = true;
            tween(child).to(0.1, { scale: new Vec3(1.2, 1.2, 1.2) }, { easing: 'sineIn' })
                .to(0.2, { scale: new Vec3(1, 1, 1) }, { easing: 'sineOut' }).start();
            if (index === pupupLength - 1) {
                setTimeout(onCompleteCallback, 500);
            };
        });
    };

    async HidePopup(popupParentNode: Node, onStartCallBack: Function, onCompleteCallback: Function): Promise<void> {
        const popup: Node = popupParentNode.getChildByName("Popup");
        const pupupLength: number = popup.children.length;
        await onStartCallBack();

        popup.children.forEach((child: Node, index: number) => {
            // Tween to shrink down before hiding
            tween(child)
                .to(0.1, { scale: new Vec3(1.2, 1.2, 1.2) }, { easing: 'sineIn' })
                .to(0.2, { scale: new Vec3(0.5, 0.5, 0.5) }, { easing: 'sineOut' })
                .call(() => {
                    child.active = false;
                    // When the last child is done, call onCompleteCallback
                    if (index === pupupLength - 1) {
                        onCompleteCallback();
                    }
                })
                .start();
        });
    };

    playPopupAnimation(popupNode: Node, animName: string, loopAnimName?: string, onComplete?: (popup?: Node) => void): void {
        const popup = popupNode.getChildByName('popup');
        const spine = popup?.getComponent(sp.Skeleton);
        const buttons = popup?.getChildByName("Buttons");

        if (!popup || !spine || !buttons) return;

        buttons.children.forEach(button => button.active = false);
        spine.timeScale = 1;
        spine.setCompleteListener(entry => {
            if (entry.animation.name === animName && loopAnimName) {
                spine.setAnimation(0, loopAnimName, true);
                this.showButtons(buttons);
                onComplete?.(popup);
            } else if (entry.animation.name === animName) {
                this.showButtons(buttons);
                onComplete?.(popup);
            }
        });

        spine.setAnimation(0, animName, false);
    }

    reversePopupAnimation(popupNode: Node, animationKey: string): void {
        const popup = popupNode.getChildByName('popup');
        const spine = popup?.getComponent(sp.Skeleton);
        const buttons = popup?.getChildByName("Buttons");

        if (!popup || !spine || !buttons) return;

        this.animateAndHideButtons(buttons);
        const animation = spine.findAnimation(animationKey);
        if (!animation) return;

        // Set animation and reverse it
        const state = spine.setAnimation(0, animationKey, false);
        spine.timeScale = -1;

        // Jump to end of animation to play it backwards
        if (state) state.trackTime = animation.duration;

        // this.scheduleOnce(() => {
        //     popupNode.active = false;
        // }, animation.duration);
        setTimeout(() => {
            popupNode.active = false;
        }, animation.duration * 1000);
    }

    private showButtons(buttons: Node): void {
        buttons.children.forEach(button => {
            button.active = true;
            button.setScale(new Vec3(1, 0.6, 1));
            tween(button).to(0.5, { scale: Vec3.ONE }, { easing: 'elasticOut' }).start();
        });
        this.AddOrRemoveCursorEvent(buttons.children, true);
    }

    private animateAndHideButtons(buttons: Node): void {
        buttons.children.forEach(button => {
            tween(button)
                .to(0.2, { scale: new Vec3(1, 0.6, 1) }, { easing: 'linear' })
                .call(() => button.active = false)
                .start();
        });
        this.AddOrRemoveCursorEvent(buttons.children, false);
    }

    animatePageChildren(pageNode: Node): void {
        const offset = 300;
        const bounds = {
            top: 960,       // half of 1920
            bottom: -960,
            left: -540,     // half of 1080
            right: 540
        };

        pageNode.children.forEach(child => {
            child.active = true;
            tween(child).stop();

            const pos = child.getPosition();
            const distances = {
                top: Math.abs(bounds.top - pos.y),
                bottom: Math.abs(bounds.bottom - pos.y),
                left: Math.abs(bounds.left - pos.x),
                right: Math.abs(bounds.right - pos.x),
                center: Math.sqrt(pos.x * pos.x + pos.y * pos.y)
            };

            const minDistance = Math.min(
                distances.top,
                distances.bottom,
                distances.left,
                distances.right,
                distances.center
            );

            if (minDistance === distances.center) {
                child.setScale(0.5, 0.5, 1);
                tween(child)
                    .to(0.4, { scale: Vec3.ONE }, { easing: 'sineIn' })
                    .start();

            } else if (minDistance === distances.top) {
                child.setPosition(pos.x, pos.y + offset);
                tween(child)
                    .to(0.4, { position: pos }, { easing: 'smooth' })
                    .start();

            } else if (minDistance === distances.bottom) {
                child.setPosition(pos.x, pos.y - offset);
                tween(child)
                    .to(0.4, { position: pos }, { easing: 'sineIn' })
                    .start();

            } else if (minDistance === distances.left) {
                child.setPosition(pos.x - offset, pos.y);
                tween(child)
                    .to(0.4, { position: pos }, { easing: 'sineIn' })
                    .start();

            } else if (minDistance === distances.right) {
                child.setPosition(pos.x + offset, pos.y);
                tween(child)
                    .to(0.4, { position: pos }, { easing: 'sineIn' })
                    .start();
            }
        });
    }
    private AddOrRemoveCursorEvent(_buttons: Node[], _isEnable: boolean): void {
        for (let i = 0; i < _buttons.length; i++) {
            const btn = _buttons[i];
            if (_isEnable) {
                btn.on(Node.EventType.MOUSE_ENTER, Constant.onMouseEnter, this);
                btn.on(Node.EventType.MOUSE_LEAVE, Constant.onMouseLeaveOrUp, this);
                btn.on(Node.EventType.MOUSE_UP, Constant.onMouseLeaveOrUp, this);
            } else {
                btn.off(Node.EventType.MOUSE_ENTER, Constant.onMouseEnter, this);
                btn.off(Node.EventType.MOUSE_LEAVE, Constant.onMouseLeaveOrUp, this);
                btn.off(Node.EventType.MOUSE_UP, Constant.onMouseLeaveOrUp, this);
            }
        }
    }
}

const animationManager = new AnimationManger()
export { animationManager as AnimationManager };
