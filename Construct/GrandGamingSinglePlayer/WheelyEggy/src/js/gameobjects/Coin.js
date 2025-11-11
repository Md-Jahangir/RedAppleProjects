import { Constant } from "../Constant";
import { SoundManager } from "../SoundManager";

export default class Coin {
    constructor(scene, terrain, coinsNumber) {
        //#region -Variables
        this.scene = scene;
        this.scale = Constant.GetScale(1920, 1080, window.innerWidth, window.innerHeight);
        this.callback = null;
        this.callbackContext = null;
        this.coinsNumber = coinsNumber;
        this.terrain = terrain;
        this.coinRadius = 33 * this.scale;
        this.coinsArray = [];
        //#endregion
        this.Create();
    }
    //#region -Create
    Create() {
        this.scene.events.once("EggDestroy", () => {
            // this.SetCoinQty();
        });
        this.coinCollected = 0;
        //get coin qty from localstorage.
        this.GetCoinQty();

        //coin ui
        this.coinIcon = this.scene.add.image(0, 0, "coinUI")
            .setScrollFactor(0);
        this.coinCollectText = this.scene.add.text(0, 0, this.coinCollected, { fontFamily: "LILITAONE", fontSize: 50 })
            .setOrigin(0, 0.5)
            .setScrollFactor(0);
        this.coinCollectText.setPosition(this.coinIcon.x + this.coinIcon.displayWidth, this.coinIcon.y);

        //coin spawn and push
        for (let index = 0; index < this.coinsNumber; index++) {
            let randomVisibleSelector = Phaser.Math.Between(0, 1);
            let coin = this.scene.matter.add.image(this.terrain.x + (index * 200), 810, "coin", null);
            coin.setBody({ type: 'circle', radius: coin.displayWidth / 2 }, {
                label: "coin",
                collisionFilter: {
                    group: 1
                },
                isStatic: true,
                isSensor: true
            })
            coin.setScale(this.scale);
            if (randomVisibleSelector == 0) {
                coin.setActive(false);
                coin.setVisible(false);
                this.scene.matter.world.remove(coin.body, true);
            }
            else {
                coin.setActive(true);
                coin.setVisible(true);
            }
            this.coinsArray.push(coin);
        }
        //initialize coin collision.
        this.CoinCollision()
    }
    //#endregion

    //#region -SetCallBack
    SetCallBack(callback, callbackContext) {
        this.callback = callback;
        this.callbackContext = callbackContext;
    }
    //#endregion

    //#region -Invokecallback
    Invokecallback() {
        this.callback.call(this.callbackContext);
    }
    //#endregion

    //#region -SetVisisble
    SetVisible() {
        this.coinsArray.forEach((coin) => {
            let randomVisibleSelector = Phaser.Math.Between(0, 1);
            if (randomVisibleSelector == 0) {
                coin.setActive(false);
                coin.setVisible(false);
                this.scene.matter.world.remove(coin.body, true);
            }
            else {
                coin.setActive(true)
                coin.setVisible(true);
                this.scene.matter.world.add(coin.body, true);
            }
        })
    }
    //#endregion

    //#region -CoinCollision
    CoinCollision() {
        this.scene.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
            if ((bodyA.label == "coin" || bodyB.label == "coin") && (bodyA.label == "carBody" || bodyB.label == "carBody") && !this.scene.egg.isDestroy) {
                if (bodyA.label == "coin") {
                    this.CoinCollect();
                    this.CoinRemove(bodyA);
                }
                else {
                    this.CoinCollect();
                    this.CoinRemove(bodyB);
                }
            }
        });
    }
    //#endregion

    //#region -CoinRemove
    /**
     * 
     * @param {Object} body - coin body
     */
    CoinRemove(body) {
        body.gameObject.setVisible(false);
        body.gameObject.setActive(false);
        this.scene.matter.world.remove(body, true);
    }
    //#endregion

    //#region -CoinCollect
    CoinCollect() {
        this.coinCollected++;
        this.coinCollectText.setText(this.coinCollected);
        SoundManager.PLayCoinCollectSound();
    }
    //#endregion

    //#region -GetCoinQty
    GetCoinQty() {
        // let tempCoinQty = localStorage.getItem("eggy_car_coin");
        // if (tempCoinQty != null) {
        //     this.coinCollected = parseInt(tempCoinQty);
        // }
        // else this.coinCollected = 0;
        this.coinCollected = 0;
    }
    //#endregion

    //#region -SetCoinQty
    SetCoinQty() {
        localStorage.setItem("eggy_car_coin", this.coinCollected);
    }
    //#endregion

    //#region -Resize
    Resize(newWidth, newHeight, newScale) {
        this.coinIcon.setScale(newScale)
            .setPosition((newWidth / 2) + (520 * newScale), 100 * newScale);
        this.coinCollectText.setScale(newScale)
            .setPosition(this.coinIcon.x + (this.coinIcon.displayWidth / 2) + 10 * newScale, this.coinIcon.y);
        this.scale = newScale;
    }
    //#endregion
}