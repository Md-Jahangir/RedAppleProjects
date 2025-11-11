
import { Constant } from "./Constant.js";
import { SoundManeger } from "./SoundManeger.js";
class Score {
    constructor(scene) {
        this.scene = scene;
        this.scoreOffset = 60;
        this.title = ["GOOD!", "EXCELENT!", "GREAT!"];
    }
    CheckGoalScore(_endX, _endY) {
        console.log('CheckGoalScore', _endX, _endY, this.scene.goalKeeperMovement.getKey);

        //for left side jump
        if (_endX > Math.round(Constant.game.config.width / 4.8) && _endX <= Math.round(Constant.game.config.width / 2.258)) {                           //400,850
            if (_endY > Math.round(Constant.game.config.height / 11.368) && _endY <= Math.round(Constant.game.config.height / 3.776)) {                        //95,286
                if (this.scene.goalKeeperMovement.getKey == "Save_right") {
                    this.SaveLogic();
                }
                else {
                    this.WinLogic();
                }
            }
            else if (_endY > Math.round(Constant.game.config.height / 3.776) && _endY <= Math.round(Constant.game.config.height / 2.097)) {    //286,515
                if (this.scene.goalKeeperMovement.getKey == "Save_down_right") {
                    this.SaveLogic();
                }
                else {
                    this.WinLogic();
                }
            }
        }
        else if (_endX > Math.round(Constant.game.config.width / 1.891) && _endX < Math.round(Constant.game.config.width / 1.254)) {                       //1015,1530
            if (_endY > Math.round(Constant.game.config.height / 11.368) && _endY <= Math.round(Constant.game.config.height / 3.776)) {                    //95,286
                if (this.scene.goalKeeperMovement.getKey == "Save_left") {
                    this.SaveLogic();
                }
                else {
                    this.WinLogic();
                }
            }
            else if (_endY > Math.round(Constant.game.config.height / 3.776) && _endY <= Math.round(Constant.game.config.height / 2.097)) {                                                                                      //286,515
                if (this.scene.goalKeeperMovement.getKey == "Save_down_left") {
                    this.SaveLogic();
                }
                else {
                    this.WinLogic();
                }
            }
        }
        else if (_endX > Math.round(Constant.game.config.width / 2.258) && _endX < Math.round(Constant.game.config.width / 1.891)) {        //850,1015
            if (_endY > Math.round(Constant.game.config.height / 11.368) && _endY <= Math.round(Constant.game.config.height / 3.776)) {        //95,286
                if (this.scene.goalKeeperMovement.getKey == "Save_Centre_up") {
                    this.SaveLogic();
                }
                else {
                    this.WinLogic();
                }
            }
            else if (_endY > Math.round(Constant.game.config.height / 3.776) && _endY <= Math.round(Constant.game.config.height / 2.097)) {             //286,515
                if (this.scene.goalKeeperMovement.getKey == "Save_Centre_down") {
                    this.SaveLogic();
                }
                else {
                    this.WinLogic();
                }
            }
        }
    }
    SaveLogic() {
        console.log(' Save logic');

        this.scene.titleText.AnimateSpecificTitles(this.scene.titleText.saveText);
    }
    ReturnScoreOffset() {
        let item = this.title[Math.floor(Math.random() * this.title.length)];
        switch (Math.floor(Math.random() * this.title.length)) {
            case 0:
                item = "GOOD!";
                return 60;
            case 1:
                item = "GREAT!";
                return 120;
            case 2:
                item = "EXCELENT!";
                return 200;
        }
    }
    WinLogic() {
        console.log(' win logic');
        SoundManeger.PlayCheerUpOnGoalSound();
        // this.scene.titleText.PlayConfetiAnimation();
        setTimeout(() => {
            this.scene.gameUI.score += this.ReturnScoreOffset();
            this.scene.gameUI.scoreText.setText("SCORE : " + this.scene.gameUI.score);
            this.scene.titleText.AnimateSpecificTitles(this.scene.titleText.goalText);
        }, 600);
    }
}
export default Score;