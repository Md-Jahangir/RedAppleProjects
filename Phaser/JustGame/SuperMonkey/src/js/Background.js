import { Align } from "./util/align.js";
import { Constant } from "./Constant.js";

class Background {
    constructor(scene) {

        this.scene = scene;

        this.bgContainer = null;
        this.frontBushContainer = null;
        this.cloudOneArray = [];
        this.lastCloudOneIndex = null;
        this.cloudTwoArray = [];
        this.lastCloudTwoIndex = null;
        this.cloudGapX = null;
        this.bushThreeArray = [];
        this.lastBushThreeIndex = null;
        this.bushThreeGapX = null;
        this.bushTwoArray = [];
        this.lastBushTwoIndex = null;
        this.bushTwoGapX = null;
        this.bushOneArray = [];
        this.lastBushOneIndex = null;
        this.bushOneGapX = null;
        this.frontBushArray = [];
        this.lastBushFrontIndex = null;

    }

    CreateBG() {

        let sky = this.scene.add.image(0, 0, 'sky').setScale(1920 * Constant.scaleFactorX, 1080 * Constant.scaleFactorY);
        Align.center(sky);

        this.bgContainer = this.scene.add.container(0, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        Align.center(this.bgContainer);

        //--------------Creating last layer of cloud------------//

        let greenCloudOne = this.scene.add.image(0, 0, 'green_cloud_0');
        let greenCloudTwo = this.scene.add.image(0, 0, 'green_cloud_1');
        let greenCloudThree = this.scene.add.image(0, 0, 'green_cloud_2');
        greenCloudOne.setPosition(-950, -227.37);
        greenCloudTwo.setPosition(400, -227.37);
        greenCloudThree.setPosition(1500, -227.37);

        this.cloudTwoArray.push(greenCloudOne, greenCloudTwo, greenCloudThree);
        // console.log(" this.cloudTwoArray:", this.cloudTwoArray);

        this.bgContainer.add(this.cloudTwoArray);
        this.lastCloudTwoIndex = this.cloudTwoArray.length - 1;

        //--------------Creating first layer of cloud------------//

        let cloudOne = this.scene.add.image(0, 0, 'cloud_0');
        let cloudTwo = this.scene.add.image(0, 0, 'cloud_1');
        let cloudThree = this.scene.add.image(0, 0, 'cloud_2');
        cloudOne.setPosition(-950, -341.053);
        cloudTwo.setPosition(200, -227.37);
        cloudThree.setPosition(1400, -227.37);

        this.cloudOneArray.push(cloudOne, cloudTwo, cloudThree);
        // console.log(" this.cloudOneArray:", this.cloudOneArray);

        this.bgContainer.add(this.cloudOneArray);
        this.lastCloudOneIndex = this.cloudOneArray.length - 1;

        //--------------Creating last layer of jungle------------//

        let jungleOne = this.scene.add.image(0, 0, 'jungle_0');
        let jungleTwo = this.scene.add.image(0, 0, 'jungle_1');
        let jungleThree = this.scene.add.image(0, 0, 'jungle_2');
        let jungleFour = this.scene.add.image(0, 0, 'jungle_3');
        let jungleFive = this.scene.add.image(0, 0, 'jungle_4');
        let jungleSix = this.scene.add.image(0, 0, 'jungle_5');

        this.bushThreeArray.push(jungleOne, jungleTwo, jungleThree, jungleFour, jungleFive, jungleSix);
        // console.log(" this.bushThreeArray:", this.bushThreeArray);

        this.bushThreeArray.forEach((_elem, _index) => {

            if (_index == 0) {
                _elem.setPosition(-801.053, -56.84);
            }

            else if (_index == 2) {
                _elem.setPosition(this.bushThreeArray[_index - 1].x + this.bushThreeArray[_index - 1].width - 10, -40);
            }

            else if (_index == 4) {
                _elem.setPosition(this.bushThreeArray[_index - 1].x + this.bushThreeArray[_index - 1].width - 10, -44);
            }

            else if (_index == 5) {
                _elem.setPosition(this.bushThreeArray[_index - 1].x + this.bushThreeArray[_index - 1].width - 40, -104);
            }

            else {
                _elem.setPosition(this.bushThreeArray[_index - 1].x + this.bushThreeArray[_index - 1].width - 10, -56.84);
            }

        });

        this.bgContainer.add(this.bushThreeArray);
        this.lastBushThreeIndex = this.bushThreeArray.length - 1;

        //--------------Creating middle layer of jungle------------//

        let frontJungleOne = this.scene.add.image(0, 0, 'front_jungle_0');
        let frontJungleTwo = this.scene.add.image(0, 0, 'front_jungle_1');
        let frontJungleThree = this.scene.add.image(0, 0, 'front_jungle_2');
        let frontJungleFour = this.scene.add.image(0, 0, 'front_jungle_3');
        let frontJungleFive = this.scene.add.image(0, 0, 'front_jungle_4');
        let frontJungleSix = this.scene.add.image(0, 0, 'front_jungle_5');

        this.bushTwoArray.push(frontJungleOne, frontJungleTwo, frontJungleThree, frontJungleFour, frontJungleFive, frontJungleSix);
        // console.log(" this.bushTwoArray:", this.bushTwoArray);

        this.bushTwoArray.forEach((_elem, _index) => {

            if (_index == 0) {
                _elem.setPosition(-801.053, 56.84);
            }

            else if (_index == 2) {
                _elem.setPosition(this.bushTwoArray[_index - 1].x + this.bushTwoArray[_index - 1].width - 5, 47);
            }

            else {
                _elem.setPosition(this.bushTwoArray[_index - 1].x + this.bushTwoArray[_index - 1].width - 5, 56.84);
            }

        });

        this.bgContainer.add(this.bushTwoArray);
        this.lastBushTwoIndex = this.bushTwoArray.length - 1;

        //--------------Creating first layer of jungle------------//

        let flippedJungleOne = this.scene.add.image(0, 0, 'front_jungle_0').setFlipX(true);
        let flippedJungleTwo = this.scene.add.image(0, 0, 'front_jungle_1').setFlipX(true);
        let flippedJungleThree = this.scene.add.image(0, 0, 'front_jungle_2').setFlipX(true);
        let flippedJungleFour = this.scene.add.image(0, 0, 'front_jungle_3').setFlipX(true);
        let flippedJungleFive = this.scene.add.image(0, 0, 'front_jungle_4').setFlipX(true);
        let flippedJungleSix = this.scene.add.image(0, 0, 'front_jungle_5').setFlipX(true);

        this.bushOneArray.push(flippedJungleOne, flippedJungleTwo, flippedJungleThree, flippedJungleFour, flippedJungleFive, flippedJungleSix);
        // console.log(" this.bushTwoArray:", this.bushTwoArray);

        this.bushOneArray.forEach((_elem, _index) => {

            if (_index == 0) {
                _elem.setPosition(-101.053, 300);
            }

            else {
                _elem.setPosition(this.bushOneArray[_index - 1].x + this.bushOneArray[_index - 1].width - 5, 300);
            }

        });

        this.bgContainer.add(this.bushOneArray);
        this.lastBushOneIndex = this.bushOneArray.length - 1;

        //--------------Creating fog-----------//

        let fog = this.scene.add.image(0, 0, 'fog').setScale(1920 * Constant.scaleFactorX, 1080 * Constant.scaleFactorY);
        Align.center(fog);

        //--------------Calculating gaps-----------//

        this.cloudGapX = Constant.round(Constant.game.config.width / 3.84);
        this.bushThreeGapX = Constant.round(Constant.game.config.width / 71.11);
        this.bushTwoGapX = Constant.round(Constant.game.config.width / 192);
        this.bushOneGapX = Constant.round(Constant.game.config.width / 384);

    }

    CreateFrontBush() {

        this.frontBushContainer = this.scene.add.container(0, 0).setScale(Constant.scaleFactorY);
        Align.center(this.frontBushContainer);

        for (let i = 0; i < 5; i++) {
            let bushFront = this.scene.physics.add.image(0, 0, 'bush_front').setName("frontbush");
            bushFront.body.allowGravity = false;
            this.frontBushArray.push(bushFront);
            if (i == 0) {
                bushFront.setPosition(-500, 500);
            }
            else {
                bushFront.setPosition(this.frontBushArray[i - 1].x + this.frontBushArray[i - 1].width + 70, this.frontBushArray[i - 1].y);
            }
        }

        this.frontBushContainer.add(this.frontBushArray);
        this.lastBushFrontIndex = this.frontBushArray.length - 1;

    }

    MoveBG() {

        for (let i = 0; i < this.cloudTwoArray.length; i++) {
            this.cloudTwoArray[i].x -= Constant.gameOptions.cloudTwoArraySpeed;
            if (this.cloudTwoArray[i].x <= -2300) {
                this.cloudTwoArray[i].x = this.cloudTwoArray[this.lastCloudTwoIndex].x + this.cloudTwoArray[this.lastCloudTwoIndex].width + this.gapX;
                this.lastCloudTwoIndex = i;
            }
        }

        for (let i = 0; i < this.cloudOneArray.length; i++) {
            this.cloudOneArray[i].x -= Constant.gameOptions.cloudOneArraySpeed;
            if (this.cloudOneArray[i].x <= -2300) {
                this.cloudOneArray[i].x = this.cloudOneArray[this.lastCloudOneIndex].x + this.cloudOneArray[this.lastCloudOneIndex].width + this.gapX;
                this.lastCloudOneIndex = i;
            }
        }

        for (let i = 0; i < this.bushThreeArray.length; i++) {
            this.bushThreeArray[i].x -= Constant.gameOptions.bushThreeArraySpeed;
            if (this.bushThreeArray[i].x <= -2300) {
                this.bushThreeArray[i].x = this.bushThreeArray[this.lastBushThreeIndex].x + this.bushThreeArray[this.lastBushThreeIndex].width - this.bushThreeGapX;
                this.lastBushThreeIndex = i;
            }
        }

        for (let i = 0; i < this.bushTwoArray.length; i++) {
            this.bushTwoArray[i].x -= Constant.gameOptions.bushTwoArraySpeed;
            if (this.bushTwoArray[i].x <= -2300) {
                this.bushTwoArray[i].x = this.bushTwoArray[this.lastBushTwoIndex].x + this.bushTwoArray[this.lastBushTwoIndex].width - this.bushTwoGapX;
                this.lastBushTwoIndex = i;
            }
        }

        for (let i = 0; i < this.bushOneArray.length; i++) {
            this.bushOneArray[i].x -= Constant.gameOptions.bushOneArraySpeed;
            if (this.bushOneArray[i].x <= -2300) {
                this.bushOneArray[i].x = this.bushOneArray[this.lastBushOneIndex].x + this.bushOneArray[this.lastBushOneIndex].width - this.bushOneGapX;
                this.lastBushOneIndex = i;
            }
        }

    }

    MoveFrontBush() {

        for (let i = 0; i < this.frontBushArray.length; i++) {

            if (Constant.isMobile) {
                this.frontBushArray[i].x -= Constant.gameOptionsMobile.frontBGLayerSpeed;
            }

            else {
                this.frontBushArray[i].x -= Constant.gameOptions.frontBGLayerSpeed;
            }

            if (this.frontBushArray[i].x <= -3000) {
                this.frontBushArray[i].x = this.frontBushArray[this.lastBushFrontIndex].x + this.frontBushArray[this.lastBushFrontIndex].width * 1.1;
                this.lastBushFrontIndex = i;
            }
        }

    }

}

export default Background;