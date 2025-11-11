import { Constant } from "./Constant.js";
class Food {
    constructor(scene) {
        this.scene = scene;
        this.numberOfPatternArray = [];
        this.foodGroupArray = [];
        this.foodGroup = null;
        this.foodArray = [];
        this.scoreCount = 0;
        this.patternOnePosArray = [
            { x: 0, y: 150 }, { x: 0, y: 210 },
            { x: 0, y: 250 }, { x: 0, y: 290 },
            { x: 0, y: 330 },
            { x: 0, y: 370 },
            { x: 0, y: 410 },
        ];
        this.patternTwoPosArray = [
            { x: 0, y: 0 }, { x: -50, y: 50 }, { x: 0, y: 100 },
            { x: -50, y: 150 }, { x: 0, y: 200 },
            { x: -50, y: 250 },
            { x: 0, y: 300 },
            { x: -50, y: 350 },
            { x: 0, y: 400 },
            { x: -50, y: 450 },
            { x: 0, y: 500 },
        ];
        this.patternThreePosArray = [
            { x: 0, y: 0 }, { x: 50, y: 50 }, { x: 0, y: 100 },
            { x: 50, y: 150 }, { x: 0, y: 200 },
            { x: 50, y: 250 },
            { x: 0, y: 300 },
            { x: 50, y: 350 },
            { x: 0, y: 400 },
            { x: 50, y: 450 },
            { x: 0, y: 500 },
        ];

        this.numberOfPatternArray = [
            this.patternThreePosArray,
            this.patternOnePosArray,
            this.patternTwoPosArray,
        ];
        this.foodLastIndex = null;
    }

    CreateFood() {
        this.foodLastIndex = this.numberOfPatternArray.length - 1;
        this.numberOfPatternArray.map((elem) => {
            let foodGroup = this.scene.add.container(0, 0)
            elem.map((elem1) => {
                let food = this.scene.physics.add.sprite(elem1.x * 1, elem1.y * 1, "Normal_Power").setOrigin(0.5, 0).setScale(Constant.scaleFactorX * 1, Constant.scaleFactorY * 1);
                this.foodArray.push(food)
                food.body.allowGravity = false;
                food.body.immovable = true;
                foodGroup.add(food);
                foodGroup.setSize(Constant.game.config.width / 3.6, Constant.game.config.height / 16);
            })
            this.foodGroupArray.push(foodGroup);
        });

        this.SetPositionOfFood();
    }

    SetPositionOfFood() {
        for (let i = 0; i < this.foodGroupArray.length; i++) {
            let rndGapX = this.GetRandomNumber(Constant.game.config.width / 3.6, Constant.game.config.height / 3.2);
            let rndGapY = this.GetRandomNumber(Constant.game.config.width / 0.63, Constant.game.config.height / 0.914);
            if (i == 0) {
                this.foodGroupArray[i].setPosition(Constant.game.config.width / 2, -Constant.game.config.height / 0.48);
            } else {
                this.foodGroupArray[i].setPosition(Constant.game.config.width / 2, this.foodGroupArray[i - 1].y - this.foodGroupArray[i].height * 1 - rndGapY);
            }
        }
    }
    ScoreCountOnCollide(_food) {
        this.scoreCount += 1;
        Constant.score = this.scoreCount;
        // this.scene.gameOver.scoreValue.setText(this.scoreCount);
        this.scene.ui.gameUIContainer.list[2].setText(this.scoreCount);
        _food.setVisible(false);
        _food.body.enable = false;
        this.AnimateFood(_food);
    }
    AnimateFood(elem1) {
        let food = this.scene.add.sprite(this.scene.monkeyPlayer.playerContainer.x, this.scene.monkeyPlayer.playerContainer.y - Constant.game.config.height / 30, "Normal_Power").setOrigin(0.5).setScale(Constant.scaleFactorX * 1, Constant.scaleFactorY * 1)

        let posTween = this.scene.tweens.add({
            targets: food,
            x: Math.round(Constant.game.config.width / 2),
            y: Math.round(Constant.game.config.height / 14),
            ease: 'Quad.easeInOut',
            duration: 1500,
            callbackScope: this,
            onComplete: function () {
                food.setVisible(false);
                food.destroy();
            }
        });
    }
    ResetFood(foodPattern, index) {
        for (let j = 0; j < foodPattern.list.length; j++) {
            foodPattern.list[j].enable = true;
            foodPattern.list[j].active = true;
            foodPattern.list[j].setVisible(true);
            foodPattern.list[j].body.enable = true;
        }
    }
    GetRandomNumber(_min, _max) {
        return Math.floor(Math.random() * (_max - _min) + _min);
    }
    MoveFood(_dt) {
        for (let i = 0; i < this.foodGroupArray.length; i++) {
            this.foodGroupArray[i].y += this.scene.upOffest;//(this.scene.upOffest * 1.2);
            if (this.foodGroupArray[i].y > Constant.game.config.height) {
                let rndGapX = this.GetRandomNumber(Constant.game.config.width / 5.4, Constant.game.config.height / 3.2);
                let rndGapY = this.GetRandomNumber(Constant.game.config.width / 0.63529, Constant.game.config.height / 0.914);
                this.foodGroupArray[i].x = Constant.game.config.width / 2;//rndGapX//this.coinGroupArray[this.coinLastIndex].x + this.coinGroupArray[this.coinLastIndex].width * scaleFactor + rndGapX;
                this.foodGroupArray[i].y = this.foodGroupArray[this.foodLastIndex].y - this.foodGroupArray[i].height - rndGapY;
                this.foodLastIndex = i;
                this.ResetFood(this.foodGroupArray[i], i);
            }
        }
    }

    DestroyAllCoin() {
        for (let i = 0; i < this.foodGroupArray.length; i++) {
            this.foodGroupArray[i].destroy();
            this.foodGroupArray[i] = null;
        }
    }


}

export default Food; 