import { Constant } from "../Constant";
import Coin from "./Coin";

export default class Terrain {
    constructor(scene) {
        this.scene = scene;
        this.scale = null;
        this.zerothPlatform = null;
        this.flatPlatform = null;
        this.startPlatform = null;
        this.firstPlatform = null;
        this.secondPlatform = null;
        this.thirdPlatform = null;
        this.forthPlatform = null;
        this.platformArray = [];
        this.terrainIndex = null;
        this.platformShiftX = null;
        this.platformCoinsArray = [];
        this.Create();
    }
    //#region -Create
    Create() {
        this.scene.events.on("ReadyToPoolPlatform", this.TerrainPooling, this);
        this.terrainIndex = 0;
        this.zerothPlatform = this.scene.matter.add.image(0, 0, "terrain_flat", null)
            .setOrigin(0.5);
        this.flatPlatform = this.scene.matter.add.image(0, 0, "terrain_flat", null)
            .setOrigin(0.5);
        this.stopper = this.scene.matter.add.image(0, 0, "blockage", null, { isStatic: true });
        this.startPlatform = this.scene.matter.add.image(0, 0, "terrain_start", null, { shape: Constant.colliders.terrain_start });
        this.firstPlatform = this.scene.matter.add.image(0, 0, "terrain_0", null, { shape: Constant.colliders.terrain_0 });
        this.secondPlatform = this.scene.matter.add.image(0, 0, "terrain_1", null, { shape: Constant.colliders.terrain_1 });
        this.thirdPlatform = this.scene.matter.add.image(0, 0, "terrain_2", null, { shape: Constant.colliders.terrain_2 });
        this.forthPlatform = this.scene.matter.add.image(0, 0, "terrain_3", null, { shape: Constant.colliders.terrain_3 });
        this.platformArray = [this.firstPlatform, this.secondPlatform, this.thirdPlatform, this.forthPlatform];

        this.coin1 = new Coin(this.scene, this.startPlatform, 3);
        this.coin2 = new Coin(this.scene, this.firstPlatform, 8);
        this.coin3 = new Coin(this.scene, this.secondPlatform, 8);
        this.coin4 = new Coin(this.scene, this.thirdPlatform, 8);
        this.coin5 = new Coin(this.scene, this.forthPlatform, 8);
        this.coin1.SetCallBack(this.OnStartPlatform, this);
        this.coin2.SetCallBack(this.OnFirstPlatform, this);
        this.coin3.SetCallBack(this.OnSecondPlatform, this);
        this.coin4.SetCallBack(this.OnThirdPlatform, this);
        this.coin5.SetCallBack(this.OnFourthPlatform, this);
        this.platformCoinsArray.push(this.coin2, this.coin3, this.coin4, this.coin5);

        // this.OnStartPlatform();
        // this.SearchPlatformCoins(0);
        // this.SearchPlatformCoins(1);
        // this.SearchPlatformCoins(2);
        // this.SearchPlatformCoins(3);
    }
    //#endregion
    //#region -SearchPlatformCoins
    /**
     * 
     * @param {number} _indexZ - index of coin set Array
     */
    SearchPlatformCoins(_indexZ) {
        this.platformCoinsArray[_indexZ].Invokecallback();
    }
    //#endregion
    //#region -ReActiveCoins
    ReActiveCoins(_indexZ) {
        this.platformCoinsArray[_indexZ].SetVisible();
    }
    //#endregion
    //#region -Onstart Platform
    /**
     * @description - coin position set of coin array of startPlatform
     */
    OnStartPlatform() {
        let coin1Length = this.coin1.coinsArray.length;
        for (let index = 0; index < coin1Length; index++) {
            this.coin1.coinsArray[index].setScale(this.scale);
            this.coin1.coinsArray[index].setPosition(this.startPlatform.x + (index * (200 * this.scale)), this.startPlatform.y - this.coin1OffsetY[index]);
        }
    }
    //#endregion
    //#region - OnfirstPlatform
    /**
     * @description - coin position set of coin array of firstPlatform
     */
    OnFirstPlatform() {
        let coin2Length = this.coin2.coinsArray.length;
        let offsetX = -this.firstPlatform.displayWidth / 2;
        for (let index = 0; index < coin2Length; index++) {
            this.coin2.coinsArray[index].setScale(this.scale);
            this.coin2.coinsArray[index].setPosition(this.firstPlatform.x + offsetX, this.firstPlatform.y - this.coin2OffsetY[index]);
            offsetX += 200 * this.scale;
        }
    }
    //#endregion
    //#region -OnSecondPlatform
    /**
     * @description - coin position set of coin array of secondPlatform
     */
    OnSecondPlatform() {
        let coin3Length = this.coin3.coinsArray.length;
        let offsetX = -this.secondPlatform.displayWidth / 2;
        for (let index = 0; index < coin3Length; index++) {
            this.coin3.coinsArray[index].setScale(this.scale);
            this.coin3.coinsArray[index].setPosition(this.secondPlatform.x + offsetX, this.secondPlatform.y - this.coin3OffsetY[index]);
            offsetX += 200 * this.scale;
        }
    }
    //#endregion
    //#region -OnThirdPlatform
    /**
     * @description - coin position set of coin array of thirdPlatform
     */
    OnThirdPlatform() {
        let coin4Length = this.coin4.coinsArray.length;
        let offsetX = -this.thirdPlatform.displayWidth / 2;
        for (let index = 0; index < coin4Length; index++) {
            this.coin4.coinsArray[index].setScale(this.scale);
            this.coin4.coinsArray[index].setPosition(this.thirdPlatform.x + offsetX, this.thirdPlatform.y - this.coin4OffsetY[index]);
            offsetX += 200 * this.scale;
        }
    }
    //#endregion
    //#region - OnFourthPlatform
    /**
     * @description - coin position set of coin array of fourthPlatform
     */
    OnFourthPlatform() {
        let coin5Length = this.coin5.coinsArray.length;
        let offsetX = -this.forthPlatform.displayWidth / 2;
        for (let index = 0; index < coin5Length; index++) {
            this.coin5.coinsArray[index].setScale(this.scale);
            this.coin5.coinsArray[index].setPosition(this.forthPlatform.x + offsetX, this.forthPlatform.y - this.coin5OffsetY[index]);
            offsetX += 200 * this.scale;
        }
    }
    //#endregion
    //#region - Terrain Pooling
    TerrainPooling() {
        this.scene.terrain.platformArray[this.terrainIndex].x += this.platformShiftX;
        let arrayLength = this.scene.terrain.platformArray.length - 1;
        this.SearchPlatformCoins(this.terrainIndex);
        this.ReActiveCoins(this.terrainIndex);
        if (this.terrainIndex < arrayLength) {
            this.terrainIndex++;
        } else {
            this.terrainIndex = 0;
        }
    }
    //#endregion

    //#region  -Resize
    Resize(newWidth, newHeight, _newScale) {
        this.scale = _newScale;
        this.platformShiftX = 0;
        this.zerothPlatform.setScale(_newScale, _newScale * 0.9);
        this.zerothPlatform.setPosition(-this.zerothPlatform.displayWidth, newHeight + 28 * _newScale);
        this.zerothPlatform.setBody({ type: "rectangle", height: (510 * _newScale) * 0.9, width: 1920 * _newScale, }, { isStatic: true, label: "terrain" });
        this.flatPlatform.setScale(_newScale, _newScale * 0.9);
        this.flatPlatform.setPosition(0, newHeight + 28 * _newScale);
        this.flatPlatform.setBody({ type: "rectangle", height: (510 * _newScale) * 0.9, width: 1920 * _newScale, }, { isStatic: true, label: "terrain" });
        this.stopper.setScale(_newScale);
        this.stopper.setPosition(-75 * _newScale, newHeight - 260 * _newScale);
        this.startPlatform.setScale(_newScale, _newScale * 1.28);
        this.startPlatform.setPosition(_newScale * 1745, newHeight);
        this.firstPlatform.setScale(_newScale);
        this.firstPlatform.setPosition(this.startPlatform.x + (this.startPlatform.displayWidth - 18 * _newScale), this.startPlatform.y + (10 * _newScale));
        this.secondPlatform.setScale(_newScale);
        this.secondPlatform.setPosition(this.firstPlatform.x + this.firstPlatform.displayWidth, this.firstPlatform.y);
        this.thirdPlatform.setScale(_newScale);
        this.thirdPlatform.setPosition(this.secondPlatform.x + this.secondPlatform.displayWidth, this.secondPlatform.y);
        this.forthPlatform.setScale(_newScale);
        this.forthPlatform.setPosition(this.thirdPlatform.x + this.thirdPlatform.displayWidth, this.thirdPlatform.y - 1 * _newScale);
        for (let i = 0; i < this.platformArray.length; i++) {
            this.platformShiftX += this.platformArray[i].displayWidth - 2 * _newScale;
        }
        this.coin1OffsetY = [(this.startPlatform.displayHeight / 2) + 100 * _newScale, (this.startPlatform.displayHeight / 2) + 100 * _newScale, (this.startPlatform.displayHeight / 2) + 60 * _newScale];

        this.coin2OffsetY = [(this.firstPlatform.displayHeight / 2) + 50 * _newScale, (this.firstPlatform.displayHeight / 2) + 50 * _newScale, (this.firstPlatform.displayHeight / 2) - 20 * _newScale, (this.firstPlatform.displayHeight / 2) - 20 * _newScale, (this.firstPlatform.displayHeight / 2) + 50 * _newScale, (this.firstPlatform.displayHeight / 2) + 50 * _newScale, (this.firstPlatform.displayHeight / 2) - 20 * _newScale, (this.firstPlatform.displayHeight / 2) + 50 * _newScale];

        this.coin3OffsetY = [(this.secondPlatform.displayHeight / 2) + 50 * _newScale, (this.secondPlatform.displayHeight / 2) + 50 * _newScale, (this.secondPlatform.displayHeight / 2) - 50 * _newScale, (this.secondPlatform.displayHeight / 2) - 100 * _newScale, (this.secondPlatform.displayHeight / 2) - 150 * _newScale, (this.secondPlatform.displayHeight / 2) - 100 * _newScale, (this.secondPlatform.displayHeight / 2), (this.secondPlatform.displayHeight / 2) + 50 * _newScale];

        this.coin4OffsetY = [(this.thirdPlatform.displayHeight / 2) + 50 * _newScale, (this.thirdPlatform.displayHeight / 2), (this.thirdPlatform.displayHeight / 2), (this.thirdPlatform.displayHeight / 2) + 50 * _newScale, (this.thirdPlatform.displayHeight / 2), (this.thirdPlatform.displayHeight / 2) - 60 * _newScale, (this.thirdPlatform.displayHeight / 2), (this.thirdPlatform.displayHeight / 2) + 40 * _newScale];

        this.coin5OffsetY = [(this.forthPlatform.displayHeight / 2) + 50 * _newScale, (this.forthPlatform.displayHeight / 2) + 50 * _newScale, (this.forthPlatform.displayHeight / 2), (this.forthPlatform.displayHeight / 2), (this.forthPlatform.displayHeight / 2) - 130 * _newScale, (this.forthPlatform.displayHeight / 2) - 130 * _newScale, (this.forthPlatform.displayHeight / 2) - 20 * _newScale, (this.forthPlatform.displayHeight / 2) + 50 * _newScale];

        this.OnStartPlatform();
        this.SearchPlatformCoins(0);
        this.SearchPlatformCoins(1);
        this.SearchPlatformCoins(2);
        this.SearchPlatformCoins(3);
        this.coin1.Resize(newWidth, newHeight, _newScale);
        this.coin2.Resize(newWidth, newHeight, _newScale);
        this.coin3.Resize(newWidth, newHeight, _newScale);
        this.coin4.Resize(newWidth, newHeight, _newScale);
        this.coin5.Resize(newWidth, newHeight, _newScale);
    }
    //#endregion
}