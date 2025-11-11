export class Timer {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.blackLayer = this.scene.add.sprite(x, y, 'black_layer');
        this.redLayer = this.scene.add.sprite(x, y, 'green_layer');

        this.shape = this.scene.make.graphics();
        this.shape.fillStyle(0xffffff);
        this.shape.slice(this.redLayer.x, this.redLayer.y, this.redLayer.displayWidth / 2, Phaser.Math.DegToRad(359), Phaser.Math.DegToRad(0), true);
        this.shape.fillPath();

        this.mask = this.shape.createGeometryMask();
        this.redLayer.setMask(this.mask);

        this.seconds = 30;

        this.timeEvent = scene.time.addEvent({
            delay: 1000,                // ms
            callback: this.TimeEventCallback,
            callbackScope: this,
            repeat: - 1
        });
        this.timeEvent.paused = true;

        this.counter = {};

        this.HideTimer();
    }

    TimeEventCallback() {
        this.seconds--;
        if (this.seconds === 0) {
            this.timeEvent.paused = true;
            this.seconds = 30;
            this.shape.clear();
            this.shape.slice(this.redLayer.x, this.redLayer.y, this.redLayer.displayWidth / 2, Phaser.Math.DegToRad(270), Phaser.Math.DegToRad(270), true);
            this.shape.fillPath();
            this.HideTimer();
        }
    };

    ShowTimer(seconds) {
        this.blackLayer.setVisible(true);
        this.redLayer.setVisible(true);
        this.StartTimer(seconds);
    }
    HideTimer() {
        this.blackLayer.setVisible(false);
        this.redLayer.setVisible(false);
    }

    StartTimer(seconds) {
        this.timeEvent.paused = false;
        this.seconds = seconds;
        this.counter = this.scene.tweens.addCounter({
            from: 0,
            to: 359,
            duration: this.seconds * 1000,
            onUpdate: (tween) => {
                let t = tween.getValue();
                this.shape.clear();
                this.shape.slice(this.redLayer.x, this.redLayer.y, this.redLayer.displayWidth / 2, Phaser.Math.DegToRad(270), Phaser.Math.DegToRad(270 + t), true);
                this.shape.fillPath();
            }
        });
    }
    PauseTimer() {
        this.timeEvent.paused = true;
        this.counter.pause();
    }
    ResumeTimer() {
        this.timeEvent.paused = false;
        this.counter.resume();
    }

    resize(newWidth, newHeight, newScale) {
        this.blackLayer.setScale(newScale);
        this.blackLayer.setPosition(newWidth / 2 + this.x * newScale, newHeight / 2 + this.y * newScale);
        this.redLayer.setScale(newScale);
        this.redLayer.setPosition(newWidth / 2 + this.x * newScale, newHeight / 2 + this.y * newScale);

    }
}
