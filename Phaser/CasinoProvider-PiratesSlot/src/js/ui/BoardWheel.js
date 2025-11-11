class BoardWheel {
    constructor(scene, boardInstance) {
        this.scene = scene;
        this.boardInstance = boardInstance;
        this.rotationalValue = 10;
        this.minRotationalValue = 0.1;
        this.spinSpeedDecay = 0.085;
        this.leftTweenCount = 5;
        this.rightTweenCount = 5;
        this.spinning = false;
        this.config = this.scene.cache.json.get("game_config").wheel;
        this.create();
    }
    create() {
        this.scene.game.events.on('evtUpdateRotationValue', this.UpdateSpinning, this);
        this.scene.game.events.on('evtStopRotation', this.StopSpinning, this);
        this.leftWheel = this.scene.add.image(this.boardInstance.x - this.config.leftWheel.x, this.boardInstance.y + this.config.leftWheel.y, "board_wheel");
        this.leftWheel.angle = 360;
        this.righttWheel = this.scene.add.image(this.boardInstance.x + this.config.rightWheel.x, this.boardInstance.y + this.config.rightWheel.y, "board_wheel");
        this.righttWheel.angle = 360;
    }

    StartSpinning() {
        this.rotationalValue = 10;
        this.spinning = true;
        this.leftTweenCount = 5;
        this.rightTweenCount = 5;
        this.spinLeftWheel();
        this.spinRightWheel();
    }
    UpdateSpinning() {
        this.leftTweenCount -= 1;
        this.rightTweenCount -= 1;
    }
    StopSpinning() {
        this.spinning = false;
    }
    spinLeftWheel() {

        let count = 0;
        this.scene.tweens.add({
            targets: this.leftWheel,
            x: this.boardInstance.x - this.config.leftWheel.x,
            ease: 'Linear',
            repeat: -1,
            onUpdate: (tween) => {
                if (this.spinning) {
                    count += this.leftTweenCount;
                    this.leftWheel.setAngle(Math.PI * count);
                }
            }
        });
    }
    UpdateTweenCount() {
        this.leftTweenCount--;
    }
    spinRightWheel() {
        let count = 0;
        this.scene.tweens.add({
            targets: this.righttWheel,
            x: this.boardInstance.x + this.config.rightWheel.x,
            ease: 'Linear',
            repeat: -1,
            onUpdate: (tween) => {
                if (this.spinning) {
                    count += this.rightTweenCount;
                    this.righttWheel.setAngle(-Math.PI * count);
                }
            }
        });
    }
}
export default BoardWheel;