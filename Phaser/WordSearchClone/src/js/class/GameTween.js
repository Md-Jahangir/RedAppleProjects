export default class GameTween {
    constructor(scene) {
        this.categoryscene = scene;
    }
    PositionChangeTween(_target, _ease, _x, _y, _duration, _yoyo, _repeat) {
        this.tween = this.categoryscene.tweens.add({
            targets: _target,

            props: {
                x: {
                    value: _x,
                },
                y: {
                    value: _y,
                }
            },
            ease: _ease,
            duration: _duration,
            yoyo: _yoyo,
            repeat: _repeat
        });
    }
}