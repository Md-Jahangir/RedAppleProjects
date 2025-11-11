class Shuriken {
    constructor(scene) {
        this.scene = scene;
        this.shurikenArray = [];
        this.minShurikens = 3;
        this.maxShurikens = 4;
        // this.numberOfShurikens = null;
        this.shurikenVelocity = 1300;
        this.shurikenStartX = game.config.width / 0.96;
        this.shurikenStartY = null;
        this.shurikenMinYPos = game.config.height / 1.96;
        this.shurikenMaxYPos = game.config.height / 1.83;
        this.minGapX = game.config.width / 2.95;
        this.maxGapX = game.config.width / 1.6;
        this.minGapY = game.config.height / 19.63;
        this.maxGapY = game.config.height / 10.8;
    }
    GetRandomNumber(_min, _max) {
        return Math.floor(Math.random() * (_max - _min) + _min);
    }
    CreateShuriken() {
        let numberOfShurikens = this.GetRandomNumber(this.minShurikens, this.maxShurikens);
        this.shurikenStartY = this.GetRandomNumber(this.shurikenMinYPos, this.shurikenMaxYPos);
        let gapX = this.GetRandomNumber(this.minGapX, this.maxGapX);
        let gapY = this.GetRandomNumber(this.minGapY, this.maxGapY);
        for (let i = 0; i < numberOfShurikens; i++) {
            let shuriken = this.scene.physics.add.image(this.shurikenStartX + (i * gapX), this.shurikenStartY + (i * gapY), 'obs').setScale(0.08 * scaleFactorX, 0.08 * scaleFactorY).setDepth(7);
            shuriken.body.allowGravity = false;
            shuriken.body.immovable = true;
            shuriken.setVelocityX(-this.shurikenVelocity * scaleFactorX);
            this.shurikenArray.push(shuriken);
        }
        // console.log("shurikenArray:", this.shurikenArray);
    }
    ShurikenRotation() {
        for (let i = 0; i < this.shurikenArray.length; i++) {
            this.shurikenArray[i].rotation += 0.25;
        }
    }
    MoveShuriken() {
        let shurikenStartXMax = game.config.width / 0.87;
        let shurikenstartXMin = game.config.width / 0.91;
        let shurikenStartYMax = game.config.height / 1.367;
        let shurikenstartYMin = game.config.height / 2.4;
        let shurikenSetPositionX = this.GetRandomNumber(shurikenstartXMin, shurikenStartXMax);
        let shurikenSetPositionY = this.GetRandomNumber(shurikenstartYMin, shurikenStartYMax);
        for (let i = 0; i < this.shurikenArray.length; i++) {
            if (this.shurikenArray[i].x <= 0) {
                // console.log("hello");
                this.shurikenArray[i].setPosition(shurikenSetPositionX, shurikenSetPositionY);
            }
        }
    }
}
export default Shuriken;