import { _decorator, Button, Color, Label, Node, ParticleSystem2D, sp, Sprite, Tween, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AnimationManager')
class AnimationManager {

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

    public BlinkEffectText(_targer: Label, _startColor: Color, _endColor: Color, _timeToEnd: number): Tween {
        const anim = tween(_targer).to(1, { color: _endColor }, { easing: 'smooth' }).to(1, { color: _startColor }, { easing: 'circInOut' }).union().repeatForever().start();
        return anim;
    }

    public HintTimer(_sprite: Sprite, _duration: number, _initialFillRange: number, _endFillRange: number, _onComplete: Function): void {
        // _sprite.fillRange = _initialFillRange;
        tween(_sprite).to(_duration, { fillRange: _endFillRange }, { easing: 'smooth' }).call(() => {
            _sprite.fillRange = _initialFillRange;
            _onComplete();
        }).start();
    }

    PopupAppearAnimation(_popupNode: Node, _appearAnimKey: string, _loopAnimKey?: string, _onCompleteCallback?: Function, _collect?: boolean[]): void {
        _popupNode.active = true;
        const popup = _popupNode.getChildByName('Popup');
        const popupSpine = popup.getComponent(sp.Skeleton);
        popup.children.forEach((_child: Node) => _child.active = false);

        const collect: boolean[] = _collect;

        popupSpine.setCompleteListener(null);
        popupSpine.setCompleteListener((entry: sp.spine.TrackEntry) => {
            if (entry.animation.name !== _appearAnimKey) return;

            if (_loopAnimKey)
                popupSpine.setAnimation(0, _loopAnimKey, true);

            popup.children.forEach((_child: Node, _index: number) => {
                setTimeout(() => {
                    _child.active = true;
                    if (_child.name === 'bonus') {
                        _child.children.forEach((_child: Node, _index: number) => {
                            _child.active = collect[_index];
                        })
                    }
                    const currScale = _child.scale.clone();
                    _child.setScale(0.8, 0.8, 1);
                    tween(_child)
                        .to(0.5, { scale: currScale }, { easing: 'elasticOut' })
                        .start();
                }, _index * 100);
            });

            if (_onCompleteCallback)
                _onCompleteCallback();

            popupSpine.setCompleteListener(null);
        });
        popupSpine.setAnimation(0, _appearAnimKey, false);
    }

    PopupDisappearAnimation(_popupNode: Node, _onCompleteCallback?: Function): void {
        const popupSprite = _popupNode.getComponent(Sprite);
        const popup = _popupNode.getChildByName('Popup');
        tween(popupSprite).to(0.5, { color: new Color(255, 255, 255, 0) }, { easing: 'smooth' }).call(() => {
            _popupNode.getComponent(Sprite).color = Color.WHITE;
        }).start();
        tween(popup).to(0.5, { scale: new Vec3(0.2, 0.2, 1) }, { easing: 'backIn' }).call(() => {
            _popupNode.active = false;
            popup.setScale(1, 1, 1);
            if (_onCompleteCallback)
                _onCompleteCallback();
        }).start();
    }

    LevelLoadGridAnimation(_grid: Node): void {
        const currPosition = _grid.getPosition();
        const xPos = currPosition.x < 0 ? -1000 : 1000;
        _grid.setPosition(xPos, currPosition.y, currPosition.z);
        tween(_grid).to(1, { position: currPosition }, { easing: 'backOut' }).start();
    }

    CollectAnimation(_object: Node, _targetNode: Node, _startPos: Vec3): void {
        _object.active = true;
        const _targetPos = _targetNode.getPosition();
        _object.setWorldPosition(_startPos);
        const particleSystem = _object.getComponent(ParticleSystem2D);
        particleSystem.resetSystem();
        tween(_object).to(0.5, { scale: new Vec3(1.2, 1.2, 1) }, { easing: 'smooth' }).call(() => {
            tween(_object).to(0.5, { position: _targetPos, scale: new Vec3(0.8, 0.8, 1) }, { easing: 'smooth' }).call(() => {
                _targetNode.setScale(1.1, 1.1, 1);
                _object.setScale(1, 1, 1);
                _object.active = false;
                particleSystem.stopSystem();
                tween(_targetNode).to(0.5, { scale: new Vec3(1, 1, 1) }, { easing: 'backIn' }).start();
            }).start();
        }).start();
    }

    RewardPopupAppear(_popupNode: Node): void {
        _popupNode.active = true;
        const popup = _popupNode.getChildByName('Popup');
        popup.children.forEach((_child: Node) => _child.active = false);

        popup.children.forEach((_child: Node, _index: number) => {
            setTimeout(() => {
                _child.active = true;

                if (_child.name === "ClaimButton")
                    _child.getComponent(Button).interactable = false;

                if (_child.name === "bonus")
                    _child.children.forEach((child: Node, index: number) => {
                        child.setScale(1, 1, 1);
                        child.children[0].getComponent(Sprite).enabled = false;
                        child.children[1].getComponent(Button).interactable = true;
                    })

                const currScale = _child.scale.clone();
                _child.setScale(0.8, 0.8, 1);
                tween(_child)
                    .to(0.5, { scale: currScale }, { easing: 'elasticOut' })
                    .start();
            }, _index * 100);
        });

    }

    RewardPopupDisappear(_popupNode: Node): void {
        const popup = _popupNode.getChildByName('Popup');
        popup.children.forEach((_child: Node, _index: number) => {
            if (_child.name === "bonus") {
                _child.active = false;
            } else {
                const currentYPos: number = _child.getPosition().y;
                let targetYPos: number = 0;
                if (currentYPos < 0) {
                    targetYPos = -1000
                } else {
                    targetYPos = 1000
                }

                tween(_child).to(0.5, { position: new Vec3(_child.getPosition().x, targetYPos, _child.getPosition().z) }, { easing: 'backIn' }).call(() => {
                    _child.active = false;
                    _child.setPosition(_child.getPosition().x, currentYPos, _child.getPosition().z);
                }).start();
            }
        })
    }

    BroadcasterAnimation(_node: Node, _isActive: boolean): void {
        const currentPosition: Vec3 = _node.getPosition();
        if (_isActive) {
            _node.active = true;
            _node.setScale(0.5, 0.5, 1);
            _node.setPosition(currentPosition.x, -700, currentPosition.z);
            tween(_node).to(0.2, { scale: new Vec3(1, 1, 1), position: currentPosition }, { easing: 'backOut' }).start();
        } else {
            tween(_node).to(0.2, { scale: new Vec3(0.5, 0.5, 1), position: new Vec3(currentPosition.x, -700, currentPosition.z) }, { easing: 'backIn' }).call(() => {
                _node.active = false;
                _node.setPosition(currentPosition);
            }).start();
        }
    }
}
const animManger = new AnimationManager();
export { animManger as AnimationManager };