import { Constant } from "./Constant.js";

class Platform {
    constructor(scene) {

        this.scene = scene;

        this.platformArrayMapOne = [];
        this.lastMapOneIndex = null
        this.platformArrayMapTwo = [];
        this.lastMapTwoIndex = null;
        this.platformArrayMapThree = [];
        this.lastMapThreeIndex = null;
        this.platformArrayMapFour = [];
        this.lastMapFourIndex = null;
        this.allPlatformArray = [];

    }

    CreatePlatform() {

        //--------------------Creating Map One----------------------//

        let platformMapOne = this.scene.make.tilemap({ key: 'platform_patterns', tileWidth: 256, tileHeight: 256 });

        let tilesetOne = platformMapOne.addTilesetImage('tiles', 'platform');

        let layerTwo = platformMapOne.createLayer('second_pattern', tilesetOne, 0, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY).setName("2nd");
        layerTwo.setCollisionBetween(0, 8);

        let layerThree = platformMapOne.createLayer('third_pattern', tilesetOne, 0, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        layerThree.setCollisionBetween(0, 8);

        let layerOne = platformMapOne.createLayer('first_pattern', tilesetOne, 0, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        layerOne.setCollisionBetween(0, 8).setName("2nd");

        let layerFour = platformMapOne.createLayer('fourth_pattern', tilesetOne, 0, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        layerFour.setCollisionBetween(0, 8);

        let layerFive = platformMapOne.createLayer('fifth_pattern', tilesetOne, 0, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        layerFive.setCollisionBetween(0, 8);

        let layerSix = platformMapOne.createLayer('sixth_pattern', tilesetOne, 0, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        layerSix.setCollisionBetween(0, 8);

        this.platformArrayMapOne.push(layerOne, layerTwo, layerThree, layerFour, layerFive, layerSix);

        this.lastMapOneIndex = (this.platformArrayMapOne.length - 1);

        // console.log(this.platformLayerArray);

        //--------------------Creating Map Two----------------------//

        let platformMapTwo = this.scene.make.tilemap({ key: 'platform_pattern_two', tileWidth: 256, tileHeight: 256 });

        let mapTwoLayerOne = platformMapTwo.createLayer('second_pattern', tilesetOne, 0, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        mapTwoLayerOne.setCollisionBetween(0, 8);

        let mapTwoLayerTwo = platformMapTwo.createLayer('first_pattern', tilesetOne, 0, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        mapTwoLayerTwo.setCollisionBetween(0, 8);

        let mapTwoLayerThree = platformMapTwo.createLayer('third_pattern', tilesetOne, 0, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        mapTwoLayerThree.setCollisionBetween(0, 8);

        let mapTwoLayerFour = platformMapTwo.createLayer('fourth_pattern', tilesetOne, 0, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        mapTwoLayerFour.setCollisionBetween(0, 8);

        let mapTwoLayerFive = platformMapTwo.createLayer('fifth_pattern', tilesetOne, 0, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        mapTwoLayerFive.setCollisionBetween(0, 8);

        this.platformArrayMapTwo.push(mapTwoLayerOne, mapTwoLayerTwo, mapTwoLayerThree, mapTwoLayerFour, mapTwoLayerFive);

        this.lastMapTwoIndex = (this.platformArrayMapTwo.length - 1);


        //--------------------Creating Map Three----------------------//

        let platformMapThree = this.scene.make.tilemap({ key: 'platform_pattern_three', tileWidth: 256, tileHeight: 256 });

        let mapThreeLayerOne = platformMapThree.createLayer('first_pattern', tilesetOne, 0, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        mapThreeLayerOne.setCollisionBetween(0, 8);

        let mapThreeLayerTwo = platformMapThree.createLayer('second_pattern', tilesetOne, 0, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        mapThreeLayerTwo.setCollisionBetween(0, 8);

        this.platformArrayMapThree.push(mapThreeLayerOne, mapThreeLayerTwo);

        this.lastMapThreeIndex = (this.platformArrayMapThree.length - 1);


        //--------------------Creating Map Four----------------------//

        let platformMapFour = this.scene.make.tilemap({ key: 'platform_pattern_four', tileWidth: 256, tileHeight: 256 });

        let mapFourLayerOne = platformMapFour.createLayer('second_pattern', tilesetOne, 0, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        mapFourLayerOne.setCollisionBetween(0, 8);

        let mapFourLayerTwo = platformMapFour.createLayer('first_pattern', tilesetOne, 0, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        mapFourLayerTwo.setCollisionBetween(0, 8);

        this.platformArrayMapFour.push(mapFourLayerOne, mapFourLayerTwo);

        this.lastMapFourIndex = (this.platformArrayMapFour.length - 1);

        //--------------------Pushing All Arrays in One----------------------//

        this.allPlatformArray.push(this.platformArrayMapOne, this.platformArrayMapTwo, this.platformArrayMapThree, this.platformArrayMapFour);

    }

    MovePlatform() {

        for (let i = 0; i < this.platformArrayMapOne.length; i++) {

            if (Constant.isMobile) {
                this.platformArrayMapOne[i].x -= Constant.gameOptionsMobile.frontBGLayerSpeed;
            }

            else {
                this.platformArrayMapOne[i].x -= Constant.gameOptions.frontBGLayerSpeed;
            }

            if (this.platformArrayMapOne[i].x <= -Constant.game.config.width / 0.32) {
                // console.log("Map One");
                this.platformArrayMapOne[i].x = this.platformArrayMapFour[this.lastMapFourIndex].x + Constant.game.config.width / 0.105;
            }
        };


        for (let i = 0; i < this.platformArrayMapTwo.length; i++) {

            if (Constant.isMobile) {
                this.platformArrayMapTwo[i].x -= Constant.gameOptionsMobile.frontBGLayerSpeed;
            }

            else {
                this.platformArrayMapTwo[i].x -= Constant.gameOptions.frontBGLayerSpeed;
            }

            if (this.platformArrayMapTwo[i].x <= -Constant.game.config.width / 0.21) {
                // console.log("Map Two");
                this.platformArrayMapTwo[i].x = this.platformArrayMapOne[this.lastMapOneIndex].x;
            }
        };

        for (let i = 0; i < this.platformArrayMapThree.length; i++) {

            if (Constant.isMobile) {
                this.platformArrayMapThree[i].x -= Constant.gameOptionsMobile.frontBGLayerSpeed;
            }

            else {
                this.platformArrayMapThree[i].x -= Constant.gameOptions.frontBGLayerSpeed;
            }

            if (this.platformArrayMapThree[i].x <= -Constant.game.config.width / 0.128) {
                // console.log("Map Three");
                this.platformArrayMapThree[i].x = this.platformArrayMapTwo[this.lastMapTwoIndex].x;
            }
        };

        for (let i = 0; i < this.platformArrayMapFour.length; i++) {

            if (Constant.isMobile) {
                // console.log("Mobile from platform", Constant.gameOptionsMobile.frontBGLayerSpeed);
                this.platformArrayMapFour[i].x -= Constant.gameOptionsMobile.frontBGLayerSpeed;
            }

            else {
                this.platformArrayMapFour[i].x -= Constant.gameOptions.frontBGLayerSpeed;
            }

            if (this.platformArrayMapFour[i].x <= -Constant.game.config.width / 0.1067) {
                // console.log("Map Four");
                this.platformArrayMapFour[i].x = this.platformArrayMapThree[this.lastMapThreeIndex].x;
            }
        };

    }
}

export default Platform;