import { Constant } from "./Constant";
import { SoundManager } from "./SoundManager";
export default class Distance {
    constructor(scene, egg, inWidth, inHeight) {
        //#region -Varables
        this.scale = Constant.GetScale(1920, 1080, inWidth, inHeight);
        this.scene = scene;
        this.egg = egg;
        this.newWidth = inWidth;
        this.newHeight = inHeight;
        this.boundayPosition = 2000 * this.scale;
        //#endregion
        this.Create();
    }
    //#region -Create
    Create() {
        this.Events();
        //Variables
        this.startPosition = this.egg.egg.x
        this._distance = 0;
        this._targetDistance = 60;
        this.distanceVariation = 1.5;
        this.distanceScale = 100 * this.scale;
        this.highScore = 0;

        //GetHighScore from localstorage
        this.GetHighScore();

        //UI Elements
        this.distanceBase = this.scene.add.image(0, 0, "distancebase")
            .setScrollFactor(0)
        this.distanceBar = this.scene.add.image(0, 0, "distancebar")
            .setScrollFactor(0)
        this.distanceText = this.scene.add.text(0, 0, this._distance.toFixed(0) + " m", { fontFamily: "LILITAONE", fontSize: 30 })
            .setOrigin(0, 0.5)
            .setScrollFactor(0)
        this.highScoreText = this.scene.add.text(0, 0, "BEST \n" + this.highScore + " m", { fontFamily: "LILITAONE", fontSize: 20 })
            .setOrigin(1, 0.5)
            .setScrollFactor(0)
        this.distanceIcon = this.scene.add.image(100 * this.scale, 100 * this.scale, "distance_icon")
            .setScrollFactor(0);
        this.distanceIconText = this.scene.add.text(0, 0, this._distance, { fontFamily: "LILITAONE", fontSize: 50 })
            .setOrigin(0, 0.5)
            .setScrollFactor(0)
        this.targetGarphic = this.scene.add.graphics();
        this.targetFlag = this.scene.add.image((this._distance + this._targetDistance + this.distanceVariation) * this.distanceScale, this.newHeight / 1.5, "target_flag")
            .setOrigin(0.5);
        this.targetFlapPositionText = this.scene.add.text(0, 0, this._targetDistance + " m", { fontFamily: "LILITAONE", fontSize: 50 })
            .setOrigin(0.5)
    }
    //#endregion

    //#region -TargetFlagGraphic
    /**
     * 
     * @param {number} newWidth 
     * @param {number} newHeight 
     * @param {number} _newScale 
     */
    TargetFlagGraphic(newWidth, newHeight, _newScale) {
        //flage resize
        this.targetFlag.setScale(_newScale)
            .setPosition((this._distance + this._targetDistance + this.distanceVariation) * this.distanceScale, this.newHeight / 1.5);
        this.targetFlapPositionText.setScale(_newScale)
            .setPosition(this.targetFlag.x, this.targetFlag.y - 100 * this.scale);

        //graphics
        this.targetGarphic.clear();
        let startPoint = -newHeight / 2;
        this.targetGarphic.lineStyle(2, 0xffffff);
        for (let i = 0; i < 20; i++) {
            this.targetGarphic.beginPath();
            this.targetGarphic.moveTo(0, startPoint);
            this.targetGarphic.lineTo(0, startPoint + (50 * _newScale));
            this.targetGarphic.strokePath();
            startPoint += 100 * _newScale;
        }
        this.targetGarphic.copyPosition(this.targetFlag);
    }
    //#endregion

    //#region -GetActualDistance
    GetActualDistance() {
        let actual_distance = Phaser.Math.Distance.Between(this.startPosition, this.egg.egg.y, this.egg.egg.x, this.egg.egg.y);
        return actual_distance / this.scale;
    }
    //#endregion

    //#region -DistanceCalculator
    DistanceCalculator() {
        this._distance = this.GetActualDistance() / 100;
        this.distanceText.setText(this._distance.toFixed(0) + " m");
        this.distanceIconText.setText(this._distance.toFixed(0) + " m");
    }
    //#endregion

    //#region -DistanceProgressBar
    DistanceProgressBar() {
        let _percentDistance = this._distance / this._targetDistance;
        this.distanceBar.setCrop(0, 0, this.distanceBar.width * _percentDistance, this.distanceBar.height);
    }
    //#endregion

    //#region -SetNewTarget
    SetNewTarget() {
        if (this._distance >= this._targetDistance) {
            this.scene.events.once("DistanceComplete", () => {
                SoundManager.TargetCompleteSound();
                this._targetDistance += 15;
                let tempDistance = (this._targetDistance + this.distanceVariation) * this.distanceScale;
                this.ChangingFlagPositionIntoNewTarget(tempDistance);
                this.scene.events.emit("ReadyToPoolPlatform");
                this.scene.matter.world.setBounds(tempDistance - this.boundayPosition, 0, this.newWidth, this.newHeight, 200, true, false, false, false);
            });
            this.scene.events.emit("DistanceComplete");
        }
    }
    //#endregion

    //#region -ChangingFlagPositionIntoNewTarget
    /**
     * 
     * @param {number} _newDistance 
     */
    ChangingFlagPositionIntoNewTarget(_newDistance) {
        this.targetFlag.x = _newDistance;
        this.targetGarphic.copyPosition(this.targetFlag);
        this.targetFlapPositionText.x = this.targetFlag.x;
        this.targetFlapPositionText.setText(this._targetDistance + "m");
    }
    //#endregion

    //#region -GetScore
    GetScore() {
        return this._distance.toFixed(0);
    }
    //#endregion

    //#region -HideDistanceBar
    HideDistanceBar() {
        this.distanceBar.setVisible(false);
        this.distanceBase.setVisible(false);
        this.distanceText.setVisible(false);
        this.highScoreText.setVisible(false);
    }
    //#endregion

    //#region -Events
    Events() {
        this.scene.events.once("EggDestroy", () => {
            this.SetHighScore();
            this.HideDistanceBar();
            SoundManager.StopGameBgMusic();
        });
    }
    //#endregion

    //#region -GetHighScore
    GetHighScore() {
        this.tempScore = localStorage.getItem("eggy_car_score");
        if (this.tempScore != null) {
            this.highScore = parseInt(this.tempScore);
        }
        else this.highScore = 0;
    }
    //#endregion

    //#region -SetHighScore
    SetHighScore() {
        this.lastDistance = this.GetScore();
        if (parseInt(this.lastDistance) > parseInt(this.highScore)) {
            localStorage.setItem("eggy_car_score", this.lastDistance);
        }
    }
    //#endregion

    //#region -DistanceUpdate
    DistanceUpdate() {
        if (!this.egg.isDestroy) {
            this.DistanceCalculator();
            this.DistanceProgressBar();
            this.SetNewTarget();
        }
    }
    //#endregion

    //#region -GetDistanceStartPosition
    GetDistanceStartPosition() {
        this.startPosition = this.egg.egg.x;
    }
    //#endregion

    //#region -Resize
    /**
     * 
     * @param {number} newWidth 
     * @param {number} newHeight 
     * @param {number} newScale 
     */
    Resize(newWidth, newHeight, newScale) {
        //Checking first resize
        if (Constant.isFirstResize) this.GetDistanceStartPosition();

        //reassign values
        this.distanceScale = 100 * newScale;
        this.boundayPosition = 2000 * newScale;
        this.newWidth = newWidth;
        this.newHeight = newHeight;

        //UI Elements
        this.distanceBase.setScale(newScale)
            .setPosition(newWidth / 2, 100 * newScale);
        this.distanceBar.setScale(newScale)
            .copyPosition(this.distanceBase);
        this.distanceText.setScale(newScale)
            .setPosition(this.distanceBar.x - this.distanceBar.displayWidth / 2, this.distanceBar.y + 50 * newScale);
        this.highScoreText.setScale(newScale)
            .setPosition(this.distanceBar.x + this.distanceBar.displayWidth / 2, this.distanceBar.y + 50 * newScale);
        this.distanceIcon.setScale(newScale)
            .setPosition(350 * newScale, 100 * newScale);
        this.distanceIconText.setScale(newScale)
            .setPosition(this.distanceIcon.x + (this.distanceIcon.displayWidth / 2) + (10 * newScale), this.distanceIcon.y);
        this.TargetFlagGraphic(newWidth, newHeight, newScale);
    }
    //#endregion
}