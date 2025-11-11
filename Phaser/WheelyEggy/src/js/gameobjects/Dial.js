export default class Dial {
    constructor(scene, car) {
        //#region -Variables
        this.scene = scene;
        this.car = car;
        //#endregion

        this.BoostDial();
        this.RPM_Dial();
        this.Event();
    }
    //#region -BoostDial
    BoostDial() {
        this.boostDial = this.scene.add.image(0, 0, "boost_dial")
            .setScrollFactor(0);
        this.boost_needle = this.scene.add.image(0, 0, "dial_needle")
            .setScrollFactor(0)
            .setOrigin(0.8, 0.8);
    }
    //#endregion

    //#region -RPM Dial
    RPM_Dial() {
        this.rpm_Dial = this.scene.add.image(0, 0, "rpm_dial")
            .setScrollFactor(0);
        this.rpm_needle = this.scene.add.image(0, 0, "dial_needle")
            .setScrollFactor(0)
            .setOrigin(0.8, 0.8);
    }
    //#endregion

    //#region -DialUpdate
    DialUpdate() {
        let maxRPM = 3.2;
        let newRotation = this.car.rearWheel.body.angularSpeed * 2;
        newRotation = Phaser.Math.Clamp(newRotation, 0, maxRPM);
        let boostSpeed = (newRotation / maxRPM) * 1.2;
        this.rpm_needle.setRotation(newRotation - 1.57);
        this.boost_needle.setRotation(boostSpeed - 1.57);
    }
    //#endregion

    //#region -Hide Dial
    HideDial() {
        this.boostDial.setVisible(false);
        this.rpm_Dial.setVisible(false);
        this.boost_needle.setVisible(false);
        this.rpm_needle.setVisible(false);
    }
    //#endregion

    //#region -Events
    Event() {
        this.scene.events.on('EggDestroy', this.HideDial, this);
    }
    //#endregion

    //#region -Resize
    Resize(newWidth, newHeight, newScale) {
        //boost dial and needle
        this.boostDial.setScale(newScale);
        this.boostDial.setPosition(newWidth / 2 - 325 * newScale, 120 * newScale);
        this.boost_needle.setScale(newScale);
        this.boost_needle.copyPosition(this.boostDial);
        //rpm dial and needle
        this.rpm_Dial.setScale(newScale);
        this.rpm_Dial.setPosition(newWidth / 2 + 325 * newScale, 120 * newScale);
        this.rpm_needle.setScale(newScale);
        this.rpm_needle.copyPosition(this.rpm_Dial);
    }
    //#endregion
}