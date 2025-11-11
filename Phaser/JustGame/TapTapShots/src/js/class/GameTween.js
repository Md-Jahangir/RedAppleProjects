export default class GameTween {
    constructor(scene) {
        this.scene = scene;

    }
    //Basket Out of canvas tween functionality
    SmoothTransitionOutofCanvas(_ease, _x, _y, _duration, _yoyo, _repeat, basketStand, basketBackPiece, basketFrontPiece, basketColliderLeft, basketColliderRight, scChecker1, scChecker2, scChecker3) {
        this.tween = this.scene.tweens.add({
            targets: [basketStand, basketBackPiece, basketFrontPiece, basketColliderLeft, basketColliderRight, scChecker1, scChecker2, scChecker3],

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
            repeat: _repeat,
        });
    }
    //Basket In Canvas tween functionality
    SmoothTransitionInCanvas(_ease, _x, _y, _duration, _yoyo, _repeat, basketStand, basketBackPiece, basketFrontPiece, basketColliderLeft, basketColliderRight, scChecker1, scChecker2, scChecker3) {
        this.tweenIn = this.scene.tweens.add({
            targets: [basketStand, basketBackPiece, basketFrontPiece, basketColliderLeft, basketColliderRight, scChecker1, scChecker2, scChecker3],

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
            repeat: _repeat,
        });
    }

}