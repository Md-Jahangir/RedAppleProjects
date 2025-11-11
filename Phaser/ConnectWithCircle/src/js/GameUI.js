import { Constant } from "./Constant.js";

class GameUI {
    constructor(scene) {

        this.scene = scene;

        this.timeValueText = null;

    }

    CreateTimerUI() {

        let timeValueTextStyle = { fontFamily: 'Aileron-Regular', fontSize: '45px', fill: '#fff', fontStyle: 'bold', align: 'center', wordWrap: { width: Math.round(Constant.game.config.width - 100) } };

        this.timeValueText = this.scene.add.text(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 18), "", timeValueTextStyle).setOrigin(0.5, 0.5);

        // this.CreateTimer();

    }

    CreateTimer() {
        this.TimedEvent = this.scene.time.addEvent({
            delay: 1000,
            callback: this.UpdateTime,
            callbackScope: this,
            loop: true
        });
    };

    UpdateTime() {
        if (Constant.timeToEnd > 0) {
            Constant.timeToEnd--;
            this.DisplayTimeFormat(Constant.timeToEnd);
        } else {
            this.TimedEvent.remove();
            // this.CallScoreSendAPI();
        }
    };

    CallScoreSendAPI() {
        this.TimedEvent.remove();
        if (getMobileOperatingSystem() == "Android") {
            // console.log(" gameover The from game over this.scoreCount........................" + this.scoreCount.toString());
            // sendMessage("The Game End..................................");
            // sendMessage("0");
        }
        if (getMobileOperatingSystem() == "iOS") {
            let postdata = {
                score: "0",
            };
            let postmessage = JSON.stringify(postdata);
            window.webkit.messageHandlers.jsHandler.postMessage(postmessage);
            window.webkit.messageHandlers.jsHandler.postMessage("The Game End.............");
        } else {
            this.TimedEvent.remove();
        }
    };



    DisplayTimeFormat(_time) {

        let minutes = parseInt(_time / 60, 10);
        let seconds = parseInt(_time % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        this.timeValueText.setText("Time Remain : " + minutes + ":" + seconds);

    }
}
export default GameUI;
