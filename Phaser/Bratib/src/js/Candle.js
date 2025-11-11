
import { Constant } from "./Constant";
import { Utils } from "./Utils";
import { SoundManager } from "./SoundManager";

class Candle {
    constructor(scene) {
        this.scene = scene;
        this.candlePanelContainer = null;
        this.howManyCandle = 4;
        this.colorNameTextArray = [Constant.whiteText, Constant.redText, Constant.yellowText, Constant.orangeText];
        this.candleArray = [];

        this.create();
    };

    create() {
        this.candlePanelContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2) + 1500, Math.round(Constant.game.config.height / 2)).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.CreateCandle();
    };

    CreateCandle() {
        for (let i = 0; i < this.howManyCandle; i++) {
            let inactiveBase = this.scene.add.image(-390 + (i * 260), 515, "inactive_base_small").setOrigin(0.5);
            inactiveBase.name = i;
            inactiveBase.setInteractive({ useHandCursor: true });
            inactiveBase.on('pointerdown', (pointer, x, y, event) => this.OnCandlePressed(inactiveBase), this);
            inactiveBase.on('pointerup', (pointer, x, y, event) => this.OnCandleReleased(inactiveBase), this);
            let activeBase = this.scene.add.image(inactiveBase.x, inactiveBase.y - 50, "active_base_small").setOrigin(0.5);
            activeBase.setScale(0);
            let normarCandle = this.scene.add.image(inactiveBase.x + 10, inactiveBase.y - 40, "candle_" + i).setOrigin(0.5);
            let coloTextStyle = { fontFamily: Constant.fontName, fontSize: '36px', fill: '#fff', fontStyle: 'normal', lineSpacing: 10, align: 'center' };
            let coloText = this.scene.add.text(inactiveBase.x + 5, inactiveBase.y + 165, this.colorNameTextArray[i], coloTextStyle).setOrigin(0.5, 0.5);

            // let leftDot = this.scene.add.image(coloText.x - 82, coloText.y, "point").setOrigin(0.5);
            // let rightDot = this.scene.add.image(coloText.x + 82, coloText.y, "point").setOrigin(0.5);
            this.candleArray.push({ activeBase: activeBase, inactiveBase: inactiveBase, candle: normarCandle });
            // this.candlePanelContainer.add([inactiveBase, activeBase, normarCandle, leftDot, coloText, rightDot]);
            this.candlePanelContainer.add([inactiveBase, activeBase, normarCandle, coloText]);
        }
    };
    OnCandlePressed(_obj) {
        for (let i = 0; i < this.candleArray.length; i++) {
            this.candleArray[i].inactiveBase.setVisible(true);
            this.candleArray[i].activeBase.setScale(0);
            this.candleArray[i].candle.setPosition(this.candleArray[i].inactiveBase.x, this.candleArray[i].inactiveBase.y - 40);
            this.candleArray[i].candle.setScale(1);
        }
        _obj.setVisible(false);
        this.candleArray[_obj.name].candle.setPosition(this.candleArray[_obj.name].inactiveBase.x, this.candleArray[_obj.name].inactiveBase.y - 100);
        this.SelectParticularCandle(this.candleArray[_obj.name].activeBase, 1);
        this.SelectParticularCandle(this.candleArray[_obj.name].candle, 1.3);

        this.scene.contentHolder.ShowSelectedItem("candle", _obj.name);
        SoundManager.PlayItemsClickSound();
    };
    OnCandleReleased(_obj) {
    };

    SelectParticularCandle(_obj, _scale) {
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

    ShowCandlePanleContainer() {
        let posTween = this.scene.add.tween({
            targets: [this.candlePanelContainer],
            x: Math.round(Constant.game.config.width / 2),
            ease: 'Linear',
            duration: 500,
            callbackScope: this,
            onComplete: function (tween) { }
        });
    };

    HideCandlePanleContainer() {
        let posTween = this.scene.add.tween({
            targets: [this.candlePanelContainer],
            x: Math.round(Constant.game.config.width / 2) - 1500,
            // alpha: 0,
            ease: 'Linear',
            duration: 500,
            callbackScope: this,
            onComplete: function (tween) {
                this.candlePanelContainer.setPosition(Math.round(Constant.game.config.width / 2) + 1500, Math.round(Constant.game.config.height / 2));
            }
        });
    };

    HideAllCandleObjects() {
        this.candlePanelContainer.setVisible(false);
    };

}

export default Candle;