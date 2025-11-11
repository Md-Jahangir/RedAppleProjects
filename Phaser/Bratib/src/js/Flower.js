
import { Constant } from "./Constant";
import { Utils } from "./Utils";
import { SoundManager } from "./SoundManager";

class Flower {
    constructor(scene) {
        this.scene = scene;
        this.flowerPanelContainer = null;
        this.howManyFlower = 4;
        this.flowerNameTextArray = [{ flower: Constant.jasmineText, counter: "3" }, { flower: Constant.marigoldText, counter: "3" }, { flower: Constant.chompeyText, counter: "3" }, { flower: Constant.lotusText, counter: "3" }]
        this.flowerArray = [];

        this.create();
    };

    create() {
        this.flowerPanelContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2) + 1500, Math.round(Constant.game.config.height / 2)).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.CreateFlower();
    };
    SetFlowerCounter(_counter) {
        for (let i = 0; i < this.flowerNameTextArray.length; i++) {
            this.flowerNameTextArray[i].counter = _counter;
            this.flowerArray[i].counterText.setText(_counter);
        }
    };

    CreateFlower() {
        for (let i = 0; i < this.howManyFlower; i++) {
            let inactiveBase = this.scene.add.image(-390 + (i * 260), 515, "inactive_base_small").setOrigin(0.5);
            inactiveBase.name = i;
            inactiveBase.setInteractive({ useHandCursor: true });
            inactiveBase.on('pointerdown', (pointer, x, y, event) => this.OnFlowerPressed(inactiveBase), this);
            inactiveBase.on('pointerup', (pointer, x, y, event) => this.OnFlowerReleased(inactiveBase), this);

            let activeBase = this.scene.add.image(inactiveBase.x, inactiveBase.y - 50, "active_base_small").setOrigin(0.5);
            activeBase.setInteractive({ useHandCursor: true });
            activeBase.name = i;
            activeBase.on('pointerdown', (pointer, x, y, event) => this.OnFlowerActivePressed(activeBase), this);
            activeBase.on('pointerup', (pointer, x, y, event) => this.OnFlowerActiveReleased(activeBase), this);
            activeBase.setScale(0);

            let normalFlower = this.scene.add.image(inactiveBase.x, inactiveBase.y - 40, "plate_flower_" + i).setOrigin(0.5);
            let counterBase = this.scene.add.image(normalFlower.x, normalFlower.y + 105, "counter_base").setOrigin(0.5);
            let counterTextStyle = { fontFamily: Constant.fontName, fontSize: '36px', fill: '#fff', fontStyle: 'normal', lineSpacing: 10, align: 'center' };
            let counterText = this.scene.add.text(counterBase.x, counterBase.y, this.flowerNameTextArray[i].counter, counterTextStyle).setOrigin(0.5, 0.5);

            let flowerNameTextStyle = { fontFamily: Constant.fontName, fontSize: '36px', fill: '#fff', fontStyle: 'normal', lineSpacing: 10, align: 'center' };
            let flowerNameText = this.scene.add.text(inactiveBase.x + 5, inactiveBase.y + 165, this.flowerNameTextArray[i].flower, flowerNameTextStyle).setOrigin(0.5, 0.5);

            // let leftDot = this.scene.add.image(flowerNameText.x - 87, flowerNameText.y, "point").setOrigin(0.5);
            // let rightDot = this.scene.add.image(flowerNameText.x + 87, flowerNameText.y, "point").setOrigin(0.5);
            this.flowerArray.push({ activeBase: activeBase, inactiveBase: inactiveBase, flower: normalFlower, counterBase: counterBase, counterText: counterText });
            // this.flowerPanelContainer.add([inactiveBase, activeBase, normalFlower, counterBase, counterText, leftDot, flowerNameText, rightDot]);
            this.flowerPanelContainer.add([inactiveBase, activeBase, normalFlower, counterBase, counterText, flowerNameText]);
        }
    };
    OnFlowerPressed(_obj) {
        let reduceCounter = this.flowerArray[_obj.name].counterText.text;
        if (reduceCounter > 0) {
            for (let i = 0; i < this.flowerArray.length; i++) {
                this.flowerArray[i].inactiveBase.setVisible(true);
                this.flowerArray[i].activeBase.setScale(0);
                this.flowerArray[i].flower.setPosition(this.flowerArray[i].inactiveBase.x, this.flowerArray[i].inactiveBase.y - 40);
                this.flowerArray[i].counterBase.setPosition(this.flowerArray[i].flower.x, this.flowerArray[i].flower.y + 105);
                this.flowerArray[i].counterText.setPosition(this.flowerArray[i].flower.x, this.flowerArray[i].flower.y + 105);
                this.flowerArray[i].flower.setScale(1);
            }
            reduceCounter -= 1;
            this.flowerArray[_obj.name].counterText.setText(reduceCounter);

            _obj.setVisible(false);
            this.flowerArray[_obj.name].flower.setPosition(this.flowerArray[_obj.name].inactiveBase.x, this.flowerArray[_obj.name].inactiveBase.y - 70);
            this.flowerArray[_obj.name].counterBase.setPosition(this.flowerArray[_obj.name].flower.x, this.flowerArray[_obj.name].flower.y + 122);
            this.flowerArray[_obj.name].counterText.setPosition(this.flowerArray[_obj.name].flower.x, this.flowerArray[_obj.name].flower.y + 122);
            this.SelectParticularFlower(this.flowerArray[_obj.name].activeBase, 1);
            this.SelectParticularFlower(this.flowerArray[_obj.name].flower, 1.2);

            this.scene.contentHolder.ShowSelectedItem("flower", _obj.name);

        } else {

        }

        if (reduceCounter == 0) {
            setTimeout(() => {
                this.flowerArray[_obj.name].inactiveBase.setVisible(true);
                this.flowerArray[_obj.name].activeBase.setVisible(false);
                this.flowerArray[_obj.name].flower.setPosition(this.flowerArray[_obj.name].inactiveBase.x, this.flowerArray[_obj.name].inactiveBase.y - 40);
                this.flowerArray[_obj.name].counterBase.setPosition(this.flowerArray[_obj.name].flower.x, this.flowerArray[_obj.name].flower.y + 105);
                this.flowerArray[_obj.name].counterText.setPosition(this.flowerArray[_obj.name].flower.x, this.flowerArray[_obj.name].flower.y + 105);
                this.flowerArray[_obj.name].flower.setScale(1);
            }, 350);
        }
        SoundManager.PlayItemsClickSound();
    };
    OnFlowerReleased(_obj) {
    };

    OnFlowerActivePressed(_obj) {
        let reduceCounter = this.flowerArray[_obj.name].counterText.text;
        if (reduceCounter > 0) {
            reduceCounter -= 1;
            this.flowerArray[_obj.name].counterText.setText(reduceCounter);

            Utils.ButtonScaleTween(this.scene, _obj, 1);
            this.scene.contentHolder.ShowSelectedItem("flower", _obj.name);
        } else {

        }
        if (reduceCounter == 0) {
            this.flowerArray[_obj.name].inactiveBase.setVisible(true);
            this.flowerArray[_obj.name].activeBase.setVisible(false);
            this.flowerArray[_obj.name].flower.setPosition(this.flowerArray[_obj.name].inactiveBase.x, this.flowerArray[_obj.name].inactiveBase.y - 40);
            this.flowerArray[_obj.name].counterBase.setPosition(this.flowerArray[_obj.name].flower.x, this.flowerArray[_obj.name].flower.y + 105);
            this.flowerArray[_obj.name].counterText.setPosition(this.flowerArray[_obj.name].flower.x, this.flowerArray[_obj.name].flower.y + 105);
            this.flowerArray[_obj.name].flower.setScale(1);
        }
        SoundManager.PlayItemsClickSound();
    };
    OnFlowerActiveReleased() {

    };

    SelectParticularFlower(_obj, _scale) {
        let scaleTween = this.scene.add.tween({
            targets: [_obj],
            scaleX: _scale,
            scaleY: _scale,
            ease: 'Linear',
            duration: 200,
            callbackScope: this,
            onComplete: function (tween) {
            }
        });
    };

    ShowFlowerPanleContainer() {
        let posTween = this.scene.add.tween({
            targets: [this.flowerPanelContainer],
            x: Math.round(Constant.game.config.width / 2),
            ease: 'Linear',
            duration: 500,
            callbackScope: this,
            onComplete: function (tween) { }
        });
    };

    HideFlowerPanleContainer() {
        let posTween = this.scene.add.tween({
            targets: [this.flowerPanelContainer],
            x: Math.round(Constant.game.config.width / 2) - 1500,
            ease: 'Linear',
            duration: 500,
            callbackScope: this,
            onComplete: function (tween) {
                this.flowerPanelContainer.setPosition(Math.round(Constant.game.config.width / 2) + 1500, Math.round(Constant.game.config.height / 2));
            }
        });
    };

    HideAllFlowerObjects() {
        this.flowerPanelContainer.setVisible(false);
    };

}

export default Flower;