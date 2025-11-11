import { Constant } from "./Constant";
import { Utils } from "./Utils";
class ContentHolder {
    constructor(scene) {
        this.scene = scene;
        this.contentHolderPanelContainer = null;
        this.smallContentHolderContainer = null;
        this.mediumContentHolderContainer = null;
        this.bigContentHolderContainer = null;

        this.plateType = "";
        this.bigItemsArray = [];
        this.mediumItemsArray = [];
        this.smallItemsArray = [];

        this.isFlowerCounted = false;
        this.isIncenseCounted = false;
        this.isCandleCounted = false;
        this.count = 0;

        this.BigContentHolderArray = [
            { type: "plate", isOccupied: "false", isRemovable: "", posX: "0", posY: "-290" },//back plate
            { type: "flower", isOccupied: "false", isRemovable: "false", posX: "20", posY: "-260" },//flower 1
            { type: "flower", isOccupied: "false", isRemovable: "false", posX: "-90", posY: "-260" },//flower 2
            { type: "flower", isOccupied: "false", isRemovable: "false", posX: "130", posY: "-260" },//flower 3
            { type: "flower", isOccupied: "false", isRemovable: "false", posX: "0", posY: "-200" },//flower 4
            { type: "flower", isOccupied: "false", isRemovable: "false", posX: "-180", posY: "-280" },//flower 5
            { type: "flower", isOccupied: "false", isRemovable: "false", posX: "230", posY: "-280" },//flower 6
            { type: "flower", isOccupied: "false", isRemovable: "false", posX: "-190", posY: "-240" },//flower 7
            { type: "flower", isOccupied: "false", isRemovable: "false", posX: "130", posY: "-190" },//flower 8
            { type: "flower", isOccupied: "false", isRemovable: "false", posX: "-130", posY: "-200" },//flower 9
            { type: "flower", isOccupied: "false", isRemovable: "false", posX: "-100", posY: "-330" },//flower 10
            { type: "flower", isOccupied: "false", isRemovable: "false", posX: "0", posY: "-340" },//flower 11
            { type: "flower", isOccupied: "false", isRemovable: "false", posX: "100", posY: "-330" },//flower 12
            { type: "flower", isOccupied: "false", isRemovable: "false", posX: "-260", posY: "-290" },//flower 13
            { type: "flower", isOccupied: "false", isRemovable: "false", posX: "-200", posY: "-360" },//flower 14
            { type: "flower", isOccupied: "false", isRemovable: "false", posX: "-60", posY: "-380" },//flower 15
            { type: "flower", isOccupied: "false", isRemovable: "false", posX: "90", posY: "-380" },//flower 16
            { type: "incense", isOccupied: "false", isRemovable: "true", posX: "220", posY: "-425" },//incense
            { type: "candle", isOccupied: "false", isRemovable: "true", posX: "-220", posY: "-420" },//candle
            { type: "plate", isOccupied: "false", isRemovable: "", posX: "0", posY: "-170" },//front plate
            { type: "candle_light", isOccupied: "false", isRemovable: "", posX: "-212", posY: "-575" },//candle light
            { type: "incense_smoke", isOccupied: "false", isRemovable: "", posX: "178", posY: "-690" },//incense smoke
            { type: "incense_smoke", isOccupied: "false", isRemovable: "", posX: "220", posY: "-690" },//incense smoke
            { type: "incense_smoke", isOccupied: "false", isRemovable: "", posX: "255", posY: "-690" },//incense smoke

        ];

        this.MediumContentHolderArray = [
            { type: "plate", isOccupied: "false", isRemovable: "", posX: "0", posY: "-260" },//back plate
            { type: "flower", isOccupied: "false", isRemovable: "false", posX: "0", posY: "-260" },//flower 1
            { type: "flower", isOccupied: "false", isRemovable: "false", posX: "-90", posY: "-260" },//flower 2
            { type: "flower", isOccupied: "false", isRemovable: "false", posX: "100", posY: "-260" },//flower 3
            { type: "flower", isOccupied: "false", isRemovable: "false", posX: "0", posY: "-200" },//flower 4
            { type: "flower", isOccupied: "false", isRemovable: "false", posX: "-180", posY: "-280" },//flower 5
            { type: "flower", isOccupied: "false", isRemovable: "false", posX: "180", posY: "-280" },//flower 6
            { type: "flower", isOccupied: "false", isRemovable: "false", posX: "-160", posY: "-220" },//flower 7
            { type: "flower", isOccupied: "false", isRemovable: "false", posX: "130", posY: "-190" },//flower 8
            { type: "flower", isOccupied: "false", isRemovable: "false", posX: "-130", posY: "-200" },//flower 9
            { type: "flower", isOccupied: "false", isRemovable: "false", posX: "-100", posY: "-330" },//flower 10
            { type: "flower", isOccupied: "false", isRemovable: "false", posX: "0", posY: "-340" },//flower 11
            { type: "flower", isOccupied: "false", isRemovable: "false", posX: "100", posY: "-330" },//flower 12
            { type: "incense", isOccupied: "false", isRemovable: "true", posX: "220", posY: "-425" },//incense
            { type: "candle", isOccupied: "false", isRemovable: "true", posX: "-220", posY: "-420" },//candle
            { type: "plate", isOccupied: "false", isRemovable: "", posX: "0", posY: "-170" },//front plate
            { type: "candle_light", isOccupied: "false", isRemovable: "", posX: "-212", posY: "-575" },//candle light
            { type: "incense_smoke", isOccupied: "false", isRemovable: "", posX: "178", posY: "-690" },//incense smoke
            { type: "incense_smoke", isOccupied: "false", isRemovable: "", posX: "220", posY: "-690" },//incense smoke
            { type: "incense_smoke", isOccupied: "false", isRemovable: "", posX: "255", posY: "-690" },//incense smoke
        ];

        this.smallContentHolderArray = [
            { type: "plate", isOccupied: "false", isRemovable: "", posX: "0", posY: "-260" },//back plate
            { type: "flower", isOccupied: "false", isRemovable: "false", posX: "0", posY: "-260" },//flower 1
            { type: "flower", isOccupied: "false", isRemovable: "false", posX: "-90", posY: "-260" },//flower 2
            { type: "flower", isOccupied: "false", isRemovable: "false", posX: "100", posY: "-260" },//flower 3 
            { type: "flower", isOccupied: "false", isRemovable: "false", posX: "0", posY: "-200" },//flower 4
            { type: "flower", isOccupied: "false", isRemovable: "false", posX: "-145", posY: "-280" },//flower 5
            { type: "flower", isOccupied: "false", isRemovable: "false", posX: "150", posY: "-280" },//flower 6
            { type: "flower", isOccupied: "false", isRemovable: "false", posX: "-140", posY: "-220" },//flower 7
            { type: "flower", isOccupied: "false", isRemovable: "false", posX: "130", posY: "-190" },//flower 8
            { type: "incense", isOccupied: "false", isRemovable: "true", posX: "175", posY: "-425" },//incense
            { type: "candle", isOccupied: "false", isRemovable: "true", posX: "-175", posY: "-420" },//candle
            { type: "plate", isOccupied: "false", isRemovable: "", posX: "0", posY: "-180" },//front plate
            { type: "candle_light", isOccupied: "false", isRemovable: "", posX: "-174", posY: "-575" },//candle light
            { type: "incense_smoke", isOccupied: "false", isRemovable: "", posX: "132", posY: "-690" },//incense smoke
            { type: "incense_smoke", isOccupied: "false", isRemovable: "", posX: "175", posY: "-690" },//incense smoke
            { type: "incense_smoke", isOccupied: "false", isRemovable: "", posX: "210", posY: "-690" },//incense smoke
        ];

        this.create();
    };

    create() {
        this.contentHolderPanelContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2)).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.smallContentHolderContainer = this.scene.add.container(0, 80);
        this.mediumContentHolderContainer = this.scene.add.container(0, 50);
        this.bigContentHolderContainer = this.scene.add.container(0, 0);

        this.CreateWater();
        this.HideWater();
        this.CreateBigItems();
        this.CreateMediumItems();
        this.CreateSmallItems();

        this.contentHolderPanelContainer.add([this.bigContentHolderContainer, this.mediumContentHolderContainer, this.smallContentHolderContainer])
    };

    CreateWater() {
        this.waterBig = this.scene.add.sprite(0, 0, "static_water").setOrigin(0.5).setScale(1);
        this.scene.anims.create({
            key: "static_water_anim",
            frameRate: 9,
            repeat: -1,
            frames: this.scene.anims.generateFrameNumbers("static_water", { start: 0, end: 13 }),
        });
        this.waterBig.play("static_water_anim");
        this.contentHolderPanelContainer.add(this.waterBig);
    };
    ShowWater() {
        this.waterBig.setVisible(true);
    }
    HideWater() {
        this.waterBig.setVisible(false);
    }

    ResizeWaterBg(_scale) {
        this.waterBig.setScale(_scale);
        this.ShowWater();
    };

    ShowSelectedPlate(_type, _index) {
        this.smallContentHolderContainer.setVisible(false);
        this.mediumContentHolderContainer.setVisible(false);
        this.bigContentHolderContainer.setVisible(false);
        this.smallContentHolderContainer.setScale(0);
        this.mediumContentHolderContainer.setScale(0);
        this.bigContentHolderContainer.setScale(0);
        switch (_index) {
            case 0:
                this.plateType = "small";
                this.ResizeWaterBg(0.7);
                this.smallContentHolderContainer.setVisible(true);
                this.ActivePlate(_type, _index, this.smallItemsArray);
                this.scene.flower.SetFlowerCounter(2);
                this.PlateShowingTween(this.smallContentHolderContainer);
                break;
            case 1:
                this.plateType = "medium";
                this.ResizeWaterBg(0.8);
                this.mediumContentHolderContainer.setVisible(true);
                this.ActivePlate(_type, _index, this.mediumItemsArray);
                this.scene.flower.SetFlowerCounter(3);
                this.PlateShowingTween(this.mediumContentHolderContainer);

                break;
            case 2:
                this.plateType = "big";
                this.ResizeWaterBg(1);
                this.bigContentHolderContainer.setVisible(true);
                this.ActivePlate(_type, _index, this.bigItemsArray);
                this.scene.flower.SetFlowerCounter(4);
                this.PlateShowingTween(this.bigContentHolderContainer);
                break;
        }
    };

    ActivePlate(_type, _index, _typeArray) {
        for (let i = 0; i < _typeArray.length; i++) {
            //id=isOccupied,name=type,data=isRemovable
            if (_typeArray[i].id == "false" && _typeArray[i].name == _type) {
                _typeArray[i].setVisible(true);
                _typeArray[i].id = true;
                let imgName = "plate_" + this.plateType + "_" + i;
                _typeArray[i].setTexture(imgName);
            }
        }
    };
    PlateShowingTween(_obj) {
        this.scene.tweens.add({
            targets: [_obj],
            scaleX: 1,
            scaleY: 1,
            ease: 'Back.easeOut',
            duration: 500,
            callbackScope: this,
            onComplete: function (tween) {
            }
        });
    };

    ShowSelectedItem(_type, _imageIndex) {
        let tempArray = [];
        switch (this.plateType) {
            case "big":
                tempArray = this.bigItemsArray;
                break;
            case "medium":
                tempArray = this.mediumItemsArray;
                break;
            case "small":
                tempArray = this.smallItemsArray;
                break;

        }
        for (let i = 0; i < tempArray.length; i++) {
            //id=isOccupied,name=type,data=isRemovable
            if (tempArray[i].id == "false" && tempArray[i].data == "false" && tempArray[i].name == _type) {
                tempArray[i].setVisible(true);
                tempArray[i].id = true;
                let imgName = "plate_" + _type + "_" + _imageIndex;
                tempArray[i].setTexture(imgName);
                break;
            } else if (tempArray[i].data == "true" && tempArray[i].name == _type) {
                tempArray[i].setVisible(true);
                tempArray[i].id = true;
                let imgName = "plate_" + _type + "_" + _imageIndex;
                tempArray[i].setTexture(imgName);
            } else if (tempArray[i].id == "false" && tempArray[i].name == "candle_light" && _type == "candle") {
                tempArray[i].setVisible(true);
                tempArray[i].id = true;
                tempArray[i].setTexture("candle_light");
                tempArray[i].anims.play("candle_light_anim");
            } else if (tempArray[i].id == "false" && tempArray[i].name == "incense_smoke" && _type == "incense") {
                tempArray[i].setVisible(true);
                tempArray[i].id = true;
                tempArray[i].setTexture("incense_smoke");
                tempArray[i].anims.play("incense_smoke_anim");
            }
        }
        this.CheckCanBartibFloat(tempArray);
    };

    CreateBigItems() {
        for (let i = 0; i < this.BigContentHolderArray.length; i++) {
            let posX = this.BigContentHolderArray[i].posX;
            let posY = this.BigContentHolderArray[i].posY;
            let itemObj = this.scene.add.sprite(posX, posY, "one_pixel_black").setOrigin(0.5);

            itemObj.name = this.BigContentHolderArray[i].type;
            itemObj.id = this.BigContentHolderArray[i].isOccupied;
            itemObj.data = this.BigContentHolderArray[i].isRemovable;
            itemObj.setVisible(false);
            this.bigItemsArray.push(itemObj);
            this.bigContentHolderContainer.add(itemObj);
        }
        this.bigContentHolderContainer.setVisible(false);
    };
    CreateMediumItems() {
        for (let i = 0; i < this.MediumContentHolderArray.length; i++) {
            let posX = this.MediumContentHolderArray[i].posX;
            let posY = this.MediumContentHolderArray[i].posY;
            let itemObj = this.scene.add.sprite(posX, posY, "one_pixel_black").setOrigin(0.5);

            itemObj.name = this.MediumContentHolderArray[i].type;
            itemObj.id = this.MediumContentHolderArray[i].isOccupied;
            itemObj.data = this.MediumContentHolderArray[i].isRemovable;
            itemObj.setVisible(false);
            this.mediumItemsArray.push(itemObj);
            this.mediumContentHolderContainer.add(itemObj);
        }
        this.mediumContentHolderContainer.setVisible(false);
    };
    CreateSmallItems() {
        for (let i = 0; i < this.smallContentHolderArray.length; i++) {
            let posX = this.smallContentHolderArray[i].posX;
            let posY = this.smallContentHolderArray[i].posY;
            let itemObj = this.scene.add.sprite(posX, posY, "one_pixel_black").setOrigin(0.5);

            itemObj.name = this.smallContentHolderArray[i].type;
            itemObj.id = this.smallContentHolderArray[i].isOccupied;
            itemObj.data = this.smallContentHolderArray[i].isRemovable;
            itemObj.setVisible(false);
            this.smallItemsArray.push(itemObj);
            this.smallContentHolderContainer.add(itemObj);
        }
        this.smallContentHolderContainer.setVisible(false);
    };

    CheckCanBartibFloat(_array) {
        for (let i = 0; i < _array.length; i++) {
            if (_array[i].name == "candle") {
                if (_array[i].id == true) {
                    if (!this.isCandleCounted) {
                        this.count++
                        this.isCandleCounted = true;
                    }
                }
            }
            if (_array[i].name == "incense") {
                if (_array[i].id == true) {
                    if (!this.isIncenseCounted) {
                        this.count++
                        this.isIncenseCounted = true;
                    }
                }
            }
            if (_array[i].name == "flower") {
                if (_array[i].id == true) {
                    if (!this.isFlowerCounted) {
                        this.count++
                        this.isFlowerCounted = true;
                    }
                }
            }
        }
        if (this.count >= 3) {
            this.scene.ShowFloatButton();
        } else {
            this.scene.HideFloatButton();
        }

    };
    SetFinalBratibPosition() {
        let tempContainer;
        switch (this.plateType) {
            case "big":
                this.bigContentHolderContainer.setPosition(0, 1500);
                this.bigContentHolderContainer.setScale(0.7);
                this.scene.floatPanel.ShowFloatingPlate(this.bigContentHolderContainer, 500);
                this.scene.floatPanel.ShowMovingWaterAnimation(0.6, 550);
                break;
            case "medium":
                this.mediumContentHolderContainer.setPosition(0, 1500);
                this.mediumContentHolderContainer.setScale(0.8);
                this.scene.floatPanel.ShowFloatingPlate(this.mediumContentHolderContainer, 510);
                this.scene.floatPanel.ShowMovingWaterAnimation(0.55, 550);
                break;
            case "small":
                this.smallContentHolderContainer.setPosition(0, 1500);
                this.smallContentHolderContainer.setScale(0.8);
                this.scene.floatPanel.ShowFloatingPlate(this.smallContentHolderContainer, 510);
                this.scene.floatPanel.ShowMovingWaterAnimation(0.5, 520);
                break;
            default:
                this.scene.loosePopup.ShowLoosePopup();
                break;
        }
    };

}

export default ContentHolder;