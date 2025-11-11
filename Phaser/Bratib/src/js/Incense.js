
import { Constant } from "./Constant";
import { Utils } from "./Utils";
import { SoundManager } from "./SoundManager";

class Incense {
    constructor(scene) {
        this.scene = scene;
        this.incensePanelContainer = null;
        this.howManyIncense = 3;
        this.colorNameTextArray = [Constant.redText, Constant.yellowText, Constant.pinkText];
        this.incenseArray = [];

        this.create();
    };

    create() {
        this.incensePanelContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2) + 1500, Math.round(Constant.game.config.height / 2)).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.CreateIncense();
    };

    CreateIncense() {
        for (let i = 0; i < this.howManyIncense; i++) {
            let inactiveBase = this.scene.add.image(-330 + (i * 330), 480, "inactive_base").setOrigin(0.5);
            inactiveBase.name = i;
            inactiveBase.setInteractive({ useHandCursor: true });
            inactiveBase.on('pointerdown', (pointer, x, y, event) => this.OnIncensePressed(inactiveBase), this);
            inactiveBase.on('pointerup', (pointer, x, y, event) => this.OnIncenseReleased(inactiveBase), this);
            let activeBase = this.scene.add.image(inactiveBase.x, inactiveBase.y - 50, "active_base").setOrigin(0.5);
            activeBase.setScale(0);
            let normarIncense = this.scene.add.image(inactiveBase.x, inactiveBase.y - 20, "incense_" + i).setOrigin(0.5);
            let coloTextStyle = { fontFamily: Constant.fontName, fontSize: '36px', fill: '#fff', fontStyle: 'normal', lineSpacing: 10, align: 'center' };
            let coloText = this.scene.add.text(inactiveBase.x + 5, inactiveBase.y + 200, this.colorNameTextArray[i], coloTextStyle).setOrigin(0.5, 0.5);

            // let leftDot = this.scene.add.image(coloText.x - 82, coloText.y, "point").setOrigin(0.5);
            // let rightDot = this.scene.add.image(coloText.x + 82, coloText.y, "point").setOrigin(0.5);
            this.incenseArray.push({ activeBase: activeBase, inactiveBase: inactiveBase, incense: normarIncense });
            // this.incensePanelContainer.add([inactiveBase, activeBase, normarIncense, leftDot, coloText, rightDot]);
            this.incensePanelContainer.add([inactiveBase, activeBase, normarIncense, coloText]);
        }
    };
    OnIncensePressed(_obj) {
        for (let i = 0; i < this.incenseArray.length; i++) {
            this.incenseArray[i].inactiveBase.setVisible(true);
            this.incenseArray[i].activeBase.setScale(0);
            this.incenseArray[i].incense.setPosition(this.incenseArray[i].inactiveBase.x, this.incenseArray[i].inactiveBase.y);
            this.incenseArray[i].incense.setScale(1);
        }
        _obj.setVisible(false);
        this.incenseArray[_obj.name].incense.setPosition(this.incenseArray[_obj.name].inactiveBase.x, this.incenseArray[_obj.name].inactiveBase.y - 70);
        this.SelectParticularIncense(this.incenseArray[_obj.name].activeBase, 1);
        this.SelectParticularIncense(this.incenseArray[_obj.name].incense, 1.5);
        this.scene.contentHolder.ShowSelectedItem("incense", _obj.name);
        SoundManager.PlayItemsClickSound();
    };
    OnIncenseReleased(_obj) {
    };

    SelectParticularIncense(_obj, _scale) {
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

    ShowIncensePanleContainer() {
        let posTween = this.scene.add.tween({
            targets: [this.incensePanelContainer],
            x: Math.round(Constant.game.config.width / 2),
            ease: 'Linear',
            duration: 500,
            callbackScope: this,
            onComplete: function (tween) { }
        });
    };

    HideIncensePanleContainer() {
        let posTween = this.scene.add.tween({
            targets: [this.incensePanelContainer],
            x: Math.round(Constant.game.config.width / 2) - 1500,
            // alpha: 0,
            ease: 'Linear',
            duration: 500,
            callbackScope: this,
            onComplete: function (tween) {
                this.incensePanelContainer.setPosition(Math.round(Constant.game.config.width / 2) + 1500, Math.round(Constant.game.config.height / 2));
            }
        });
    };

    HideAllIncenseObjects() {
        this.incensePanelContainer.setVisible(false);
    };

}

export default Incense;