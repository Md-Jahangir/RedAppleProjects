
import { Constant } from "./Constant";
import { Utils } from "./Utils";
import { SoundManager } from "./SoundManager";

class Plate {
    constructor(scene) {
        this.scene = scene;
        this.plateContainer = null;
        this.howManyPlate = 3;
        this.sizeNameTextArray = [Constant.smallText, Constant.mediumText, Constant.bigText];
        this.plateArray = [];

        this.create();
    };

    create() {
        this.plateContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2) + 1500, Math.round(Constant.game.config.height / 2)).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.CreatePlate();
        this.CreateNextButton();
    };

    CreatePlate() {
        for (let i = 0; i < this.howManyPlate; i++) {
            let plateBase = this.scene.add.image(-330 + (i * 330), 480, "inactive_base").setOrigin(0.5);
            plateBase.name = i;
            plateBase.setInteractive({ useHandCursor: true });
            plateBase.on('pointerdown', (pointer, x, y, event) => this.OnPlatePressed(plateBase), this);
            plateBase.on('pointerup', (pointer, x, y, event) => this.OnPlateReleased(plateBase), this);
            let plateBaseActive = this.scene.add.image(plateBase.x, plateBase.y - 50, "active_base").setOrigin(0.5);
            plateBaseActive.setScale(0);
            let normalPlate = this.scene.add.image(plateBase.x, plateBase.y, "plate_normal").setOrigin(0.5).setScale(0.8 + (i * 0.1));
            let sizeTextStyle = { fontFamily: Constant.fontName, fontSize: '36px', fill: '#fff', fontStyle: 'normal', lineSpacing: 10, align: 'center' };
            let sizeText = this.scene.add.text(plateBase.x + 5, plateBase.y + 200, this.sizeNameTextArray[i], sizeTextStyle).setOrigin(0.5, 0.5);

            // let leftDot = this.scene.add.image(sizeText.x - 82, sizeText.y, "point").setOrigin(0.5);
            // let rightDot = this.scene.add.image(sizeText.x + 82, sizeText.y, "point").setOrigin(0.5);
            this.plateArray.push({ activeBase: plateBaseActive, inactiveBase: plateBase, plate: normalPlate });
            // this.plateContainer.add([plateBase, plateBaseActive, normalPlate, leftDot, sizeText, rightDot]);
            this.plateContainer.add([plateBase, plateBaseActive, normalPlate, sizeText]);
        }
    };
    OnPlatePressed(_obj) {
        this.scene.gameplayUI.HideSelectYourBratibText();

        for (let i = 0; i < this.plateArray.length; i++) {
            this.plateArray[i].inactiveBase.setVisible(true);
            this.plateArray[i].activeBase.setScale(0);
            this.plateArray[i].plate.setPosition(this.plateArray[i].inactiveBase.x, this.plateArray[i].inactiveBase.y);
            this.plateArray[i].plate.setScale(0.8 + (i * 0.1));
        }
        _obj.setVisible(false);
        this.plateArray[_obj.name].plate.setPosition(this.plateArray[_obj.name].inactiveBase.x, this.plateArray[_obj.name].inactiveBase.y - 50);
        this.SelectParticularPlate(this.plateArray[_obj.name].activeBase, 1);
        this.SelectParticularPlate(this.plateArray[_obj.name].plate, (this.plateArray[_obj.name].plate.scaleX + 0.2));
        this.nextButton.setTexture("active_play_button_base");
        this.nextButton.setInteractive({ useHandCursor: true });

        this.scene.contentHolder.ShowSelectedPlate("plate", _obj.name)

        SoundManager.PlayItemsClickSound();
    };
    OnPlateReleased(_obj) {
    };

    SelectParticularPlate(_obj, _scale) {
        let scaleTween = this.scene.add.tween({
            targets: [_obj],
            scaleX: _scale,
            scaleY: _scale,
            ease: 'Linear',
            duration: 200
        });
    };

    CreateNextButton() {
        // this.nextButton = this.scene.add.image(0, 850, "inactive_play_button_base").setOrigin(0.5);
        this.nextButton = this.scene.add.image(0, 800, "inactive_play_button_base").setOrigin(0.5);
        this.nextButton.on('pointerdown', (pointer, x, y, event) => this.OnNextButtonPressed(this.nextButton), this);
        this.nextButton.on('pointerup', (pointer, x, y, event) => this.OnNextButtonReleased(this.nextButton), this);

        let nextTextStyle = { fontFamily: Constant.fontName, fontSize: '45px', fill: '#fff', fontStyle: 'normal', align: 'center' };
        this.nextText = this.scene.add.text(this.nextButton.x, this.nextButton.y - 7, Constant.nextText, nextTextStyle).setOrigin(0.5, 0.5);

        this.plateContainer.add([this.nextButton, this.nextText]);
    };

    OnNextButtonPressed() {
        Utils.ButtonScaleTween(this.scene, this.nextButton, 1);
        Utils.ButtonScaleTween(this.scene, this.nextText, 1);

        this.HidePlateContainer();
        this.scene.gameplayUI.ShowBottomButton();
        SoundManager.PlayButtonClickSound();
    };
    OnNextButtonReleased() {

    };

    ShowPlateContainer() {
        let posTween = this.scene.add.tween({
            targets: [this.plateContainer],
            x: Math.round(Constant.game.config.width / 2),
            ease: 'Linear',
            duration: 500,
            callbackScope: this,
            onComplete: function (tween) { }
        });
    };


    HidePlateContainer() {
        let posTween = this.scene.add.tween({
            targets: [this.plateContainer],
            x: Math.round(Constant.game.config.width / 2) - 1500,
            ease: 'Linear',
            duration: 200,
            callbackScope: this,
            onComplete: function (tween) { }
        });
    };

}

export default Plate;