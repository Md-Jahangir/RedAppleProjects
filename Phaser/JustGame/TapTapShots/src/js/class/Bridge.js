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
        this.clock = this.scene.add.text(0, 0, this.formatTime(Constant.timeToEnd), { fontFamily: "Poppins-Bold", fontSize: 50 }).setOrigin(0.5);
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
}