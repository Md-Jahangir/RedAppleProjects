import { Constant } from "./Constant.js";

class Branchs {
    constructor(scene) {
        this.scene = scene;

        this.rightBranchGroupArray = [];
        this.numberOfRightPlates = 6;
        this.rightBranchLastIndexOf = null;

        this.randomSetNumber = 7;
        this.plateCounter = 0
        this.plateCounterRight = 0
        //##########################################################

        this.numberOfLeftPlates = 7;
        this.leftBranchGroupArray = [];
        this.leftBranchLastIndexOf = null;

        this.gapYOfLeftPlates = 0;
        this.gapYOfRightPlates = 0;
    }
    CreateBranchsLeft() {
        if (Constant.isMobile) {
            if (Constant.isPortrait) {
                this.gapYOfLeftPlates = -Constant.game.config.height / 12.8;
                this.gapYOfRightPlates = -Constant.game.config.height / 12.8;
            }
            else {

            }
        }
        else {
            this.gapYOfLeftPlates = 0;
            this.gapYOfRightPlates = 0;
        }
        this.leftBranchLastIndexOf = this.numberOfLeftPlates - 1;
        for (let i = 1; i <= this.numberOfLeftPlates; i++) {
            let plate = this.scene.physics.add.sprite(0, 0, 'L_Plate_' + i).setOrigin(0.5, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);

            plate.body.allowGravity = false;
            plate.body.immovable = true;
            // plate.body.setSize((plate.width), (plate.height), true);


            this.leftBranchGroupArray.push(plate);
            if (i == 1) {
                plate.setPosition(Math.floor(Constant.game.config.width / 10.8), -Math.floor(Constant.game.config.height / 90));
            }
            else if (i == 2) {
                plate.setPosition(Math.floor(Constant.game.config.width / 18), this.leftBranchGroupArray[i - 2].y - this.leftBranchGroupArray[i - 1].height - this.gapYOfLeftPlates)
            }
            else if (i == 3) {
                plate.setPosition(Math.floor(Constant.game.config.width / 4.153), this.leftBranchGroupArray[i - 2].y - this.leftBranchGroupArray[i - 1].height - this.gapYOfLeftPlates);
                plate.body.setSize((plate.width), (plate.height), true);
                plate.body.setOffset(-Math.floor(Constant.game.config.width / 3.6), 0);
            }
            else if (i == 4) {
                plate.setPosition(Math.floor(Constant.game.config.width / 18), this.leftBranchGroupArray[i - 2].y - this.leftBranchGroupArray[i - 1].height - this.gapYOfLeftPlates)
            }
            else if (i == 5) {
                plate.setPosition(Math.floor(Constant.game.config.width / 18), this.leftBranchGroupArray[i - 2].y - this.leftBranchGroupArray[i - 1].height - this.gapYOfLeftPlates)
            }
            else if (i == 6) {
                plate.setPosition(Math.floor(Constant.game.config.width / 18), this.leftBranchGroupArray[i - 2].y - this.leftBranchGroupArray[i - 1].height - this.gapYOfLeftPlates);
            } else if (i == 7) {
                plate.setPosition(Math.floor(Constant.game.config.width / 18), this.leftBranchGroupArray[i - 2].y - this.leftBranchGroupArray[i - 1].height - this.gapYOfLeftPlates);
            }
        }
    }
    CreateBranchsRight() {
        // this.scene.input.on('pointerdown', this.MoveRightPlates, this);

        this.rightBranchLastIndexOf = this.numberOfRightPlates - 1;
        for (let i = 1; i <= this.numberOfRightPlates; i++) {
            let rightPlates = this.scene.physics.add.image(0, 0, "R_Plate_" + i).setOrigin(0.5, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);;


            rightPlates.body.allowGravity = false;
            rightPlates.body.immovable = true;
            rightPlates.body.setSize((rightPlates.width - rightPlates.width / 4), (rightPlates.height), true);


            this.rightBranchGroupArray.push(rightPlates);

            if (i == 1) {
                rightPlates.setPosition(Math.floor(Constant.game.config.width / 1.069), -Math.floor(Constant.game.config.height / 40));
            }
            else if (i == 2) {
                rightPlates.setPosition(Math.floor(Constant.game.config.width / 1.069), this.rightBranchGroupArray[i - 2].y - this.rightBranchGroupArray[i - 1].height - this.gapYOfRightPlates);
            }
            else if (i == 3) {
                rightPlates.setPosition(Math.floor(Constant.game.config.width / 1.113), this.rightBranchGroupArray[i - 2].y - this.rightBranchGroupArray[i - 1].height - this.gapYOfRightPlates);
            }
            else if (i == 4) {
                rightPlates.setPosition(Math.floor(Constant.game.config.width / 1.113), this.rightBranchGroupArray[i - 2].y - this.rightBranchGroupArray[i - 1].height - this.gapYOfRightPlates);
            }
            else if (i == 5) {
                rightPlates.setPosition(Math.floor(Constant.game.config.width / 1.113), this.rightBranchGroupArray[i - 2].y - this.rightBranchGroupArray[i - 1].height - this.gapYOfRightPlates);
            }
            else if (i == 6) {
                rightPlates.setPosition(Math.floor(Constant.game.config.width / 1.113), this.rightBranchGroupArray[i - 2].y - this.rightBranchGroupArray[i - 1].height - this.gapYOfRightPlates);
            }
        }
    }
    MoveRightPlates() {
        for (let i = 0; i < this.rightBranchGroupArray.length; i++) {
            this.rightBranchGroupArray[i].y += this.scene.upOffest;
            if (this.rightBranchGroupArray[i].y >= Math.floor(Constant.game.config.height / 0.827)) {
                this.rightBranchGroupArray[i].y = this.rightBranchGroupArray[this.rightBranchLastIndexOf].y - this.rightBranchGroupArray[this.rightBranchLastIndexOf].height;
                this.rightBranchLastIndexOf = i;
            }
        }
    }

    MoveLeftPlates() {
        for (let i = 0; i < this.leftBranchGroupArray.length; i++) {
            this.leftBranchGroupArray[i].y += this.scene.upOffest;
            if (this.leftBranchGroupArray[i].y >= Math.floor(Constant.game.config.height)) {
                this.plateCounterRight += 1;
                if (this.plateCounterRight == 2) {
                    this.scene.isBranchesTwigsMoving = true;
                }
                if (this.plateCounterRight === 10) {
                    this.scene.bladeObstacle.structureOneMoveBool = true;
                }
                this.leftBranchGroupArray[i].y = this.leftBranchGroupArray[this.leftBranchLastIndexOf].y - this.leftBranchGroupArray[this.leftBranchLastIndexOf].height + 800;
                this.leftBranchLastIndexOf = i;
            }
        }
    }
}
export default Branchs;