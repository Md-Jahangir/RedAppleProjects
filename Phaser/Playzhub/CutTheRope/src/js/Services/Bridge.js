import { Constant } from "../Constant";
import Texture from "../gameObjectsClass/Texture";

export default class Bridge {
    constructor(scene) {
        this.scene = scene;
        this.timer = null;
        this.create();
    }
    create() {
        this.GameTimer();
        this.VisibleControl(false);
    }
    VisibleControl(_isVisible) {
        this.clockBase.setVisible(_isVisible);
        this.clockBar.setVisible(_isVisible);
        this.clockLogo.setVisible(_isVisible);
        this.clock.setVisible(_isVisible);
    }
    GameTimer() {
        this.clockBase = new Texture(this.scene, 0, 0, 'timer_base');
        this.clockBase.setOrigin(0.5).setDepth(2);
        this.clockBar = this.scene.add.nineslice(0, 0, 'timer_bar', 0, 256, 6, 6).setDepth(2).setOrigin(0, 0.5);
        this.clockLogo = new Texture(this.scene, 0, 0, 'timer_logo');
        this.clockLogo.setOrigin(0.5).setDepth(2);
        this.clock = this.scene.add.text(0, 0, this.formatTime(Constant.timeToEnd), { fontFamily: "Poppins-Bold", fontSize: 40 }).setDepth(2).setOrigin(1, 0.5);
        this.TimerEventStart();
    }
    TimerEventStart() {
        this.timer = this.scene.time.addEvent({
            delay: 1000, // 1 second
            callback: this.ShowTime,
            callbackScope: this,
            repeat: -1
        });
        this.clockBarTween = this.scene.tweens.add({
            targets: this.clockBar,
            width: 50,
            duration: (Constant.timeToEnd * 1000),
            ease: 'Linear',
            yoyo: false,
            repeat: 0,
        });

    }
    ShowTime() {
        Constant.timeToEnd--;
        this.clock.setText(this.formatTime(Constant.timeToEnd));
        if (Constant.timeToEnd <= 0) {
            this.scene.time.removeEvent(this.timer);
            this.timer.remove();
            // this.scene.CallTheScoreSendAPI();
            console.log('time end');
        }
        if (Constant.timeToEnd <= 15) {
            this.clock.setStyle({ color: this.GetRandomColor(Constant.timeToEnd) });
        }
    }
    GetRandomColor(_time) {
        return (_time % 2) === 0 ? "#FFFFFF" : "#FF0000";
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
        this.clockBase.setPosition((newWidth / 2) + (175 * newScale), 175 * newScale);
        this.clockBar.setScale(newScale);
        this.clockBar.setPosition(this.clockBase.x - (130 * newScale), this.clockBase.y);
        this.clockLogo.setScale(newScale);
        this.clockLogo.setPosition(this.clockBase.x - (110 * newScale), this.clockBase.y);
        this.clock.setScale(newScale);
        this.clock.setPosition(this.clockBase.x + (75 * newScale), this.clockBase.y);
    }
}