import { Constant } from "../Constant";

export default class Bridge {
    constructor(scene) {
        this.scene = scene;
        this.timer = null;
        this.create();
    }
    create() {
        this.GameTimer();
    }
    GameTimer() {
        this.clockBase = this.scene.add.image(0, 0, 'clock-base').setDepth(3);
        this.clock = this.scene.add.text(0, 0, this.formatTime(Constant.timeToEnd), { fontFamily: "Poppins-Bold", fontSize: 35 }).setDepth(3).setOrigin(1, 0.5);
        // this.TimerEventStart();
    }
    TimerEventStart() {
        this.timer = this.scene.time.addEvent({
            delay: 1000, // 1 second
            callback: this.ShowTime,
            callbackScope: this,
            repeat: -1
        });
    }
    ShowTime() {
        Constant.timeToEnd--;
        this.clock.setText(this.formatTime(Constant.timeToEnd));
        if (Constant.timeToEnd <= 0) {
            this.scene.time.removeEvent(this.timer);
            this.timer.remove();
            this.scene.CallTheScoreSendAPI();
        }
    }
    formatTime(seconds) {
        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = seconds % 60;
        let formattedMinutes = String(minutes).padStart(2, '0');
        let formattedSeconds = String(remainingSeconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    }
    resize(newWidth, newHeight, newScale) {
        this.clockBase.setScale(newScale);
        this.clockBase.setPosition((newWidth / 2) + (150 * newScale), 100 * newScale);
        this.clock.setScale(newScale);
        this.clock.setPosition(this.clockBase.x + (80 * newScale), this.clockBase.y - (5 * newScale));
    }
}