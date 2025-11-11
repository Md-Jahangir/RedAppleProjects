

export default class GameTween {
    constructor(scene) {
        this.scene = scene;
    }
    CardOnTableTween(_target, _x, _y, _duration, _angle) {
        this.tween = this.scene.tweens.add({
            targets: _target,
            angle: _angle,
            props: {
                x: {
                    value: _x,
                },
                y: {
                    value: _y,
                },
                scale: { value: 0.5 },
                angle: { value: _angle },
            },
            ease: "Linear",
            duration: _duration,
            yoyo: false,
            repeat: 0,
        });
    };
}