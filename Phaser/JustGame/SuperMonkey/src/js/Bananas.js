import { Constant } from "./Constant.js";
import { Align } from "./util/align.js";

class Bananas {
    constructor(scene) {

        this.scene = scene;

        this.bananaPatternArray = [];
        this.bananaContainersArray = [];
        this.rndNumber = null;
        this.arrLength = null;
        this.bool = false;
        this.screenOutXPos = null;
        this.bananaVel = null;
        this.bananaArrowYPos = null;
        this.bananaRestYPos = null;
        this.specialBananaContainer = null;
        this.isPlaced = false;

    }

    CreateBananas() {

        let bananaPatternLines = [{ x: 200, y: 100 },
        { x: 253, y: 100 },
        { x: 306, y: 100 },
        { x: 359, y: 100 },
        { x: 412, y: 100 },
        { x: 306, y: 200 },
        { x: 359, y: 200 },
        { x: 412, y: 200 },
        { x: 465, y: 200 },
        { x: 518, y: 200 }];

        this.bananaPatternArray.push(bananaPatternLines);

        let bananaPatternCurve = [{ x: 200, y: 500 },
        { x: 306, y: 407 },
        { x: 430, y: 357 },
        { x: 542, y: 407 },
        { x: 648, y: 500 }];

        this.bananaPatternArray.push(bananaPatternCurve);

        let bananaPatternArrow = [{ x: 500, y: 530 },
        { x: 583, y: 530 },
        { x: 666, y: 530 },
        { x: 749, y: 530 },
        { x: 500, y: 630 },
        { x: 583, y: 630 },
        { x: 666, y: 630 },
        { x: 749, y: 630 },
        { x: 832, y: 700 },
        { x: 842, y: 590 },
        { x: 842, y: 485 },
        { x: 922, y: 650 },
        { x: 932, y: 532 },
        { x: 1015, y: 590 }];

        this.bananaPatternArray.push(bananaPatternArrow);

        let bananaPatternLinesTwo = [{ x: 200, y: 100 },
        { x: 253, y: 100 },
        { x: 306, y: 100 },
        { x: 359, y: 100 },
        { x: 412, y: 100 },
        { x: 306, y: 200 },
        { x: 359, y: 200 },
        { x: 412, y: 200 },
        { x: 465, y: 200 },
        { x: 518, y: 200 }];

        this.bananaPatternArray.push(bananaPatternLinesTwo);

        let bananaPatternCurveTwo = [{ x: 200, y: 500 },
        { x: 306, y: 407 },
        { x: 430, y: 357 },
        { x: 542, y: 407 },
        { x: 648, y: 500 }];

        this.bananaPatternArray.push(bananaPatternCurveTwo);

        let bananaPatternArrowTwo = [{ x: 500, y: 530 },
        { x: 583, y: 530 },
        { x: 666, y: 530 },
        { x: 749, y: 530 },
        { x: 500, y: 630 },
        { x: 583, y: 630 },
        { x: 666, y: 630 },
        { x: 749, y: 630 },
        { x: 832, y: 700 },
        { x: 842, y: 590 },
        { x: 842, y: 485 },
        { x: 922, y: 650 },
        { x: 932, y: 532 },
        { x: 1015, y: 590 }];

        this.bananaPatternArray.push(bananaPatternArrowTwo);

        // console.log(random);

        this.bananaPatternArray.forEach((_arrays, _index) => {

            let bananaContainers = this.scene.add.container(0, 0).setScale(Constant.scaleFactor);
            Align.placeAt(3.6, -1, bananaContainers);

            _arrays.forEach(_pos => {

                let bananas = this.scene.physics.add.image(_pos.x, _pos.y, 'banana').setName("notCollected");
                bananas.setData({ prevX: _pos.x, prevY: _pos.y });
                bananas.body.allowGravity = false;
                bananas.body.immovable = true;
                bananaContainers.add(bananas);

            });

            this.bananaContainersArray.push(bananaContainers);

        });

        Align.shuffleArray(this.bananaContainersArray);

        this.rndNumber = Align.generateRandomNumber(0, 5);
        // console.log(this.rndNumber);

        this.arrLength = this.bananaContainersArray[this.rndNumber].list.length;
        // console.log("arrLength", this.arrLength);

        if (Constant.isMobile) {
            // console.log("Mobile");
            this.bananaArrowYPos = Constant.gameOptionsMobile.bananaArrowYPos;
            this.bananaRestYPos = Constant.gameOptionsMobile.bananaRestYPos;
            this.screenOutXPos = -Constant.round(Constant.game.config.width / 0.3);
            this.bananaVel = Constant.gameOptionsMobile.bananaLayerSpeed;
        }

        else {
            // console.log("Desktop");
            this.bananaArrowYPos = Constant.gameOptions.bananaArrowYPos;
            this.bananaRestYPos = Constant.gameOptions.bananaRestYPos;
            this.screenOutXPos = -Constant.round(Constant.game.config.width / 0.77);
            this.bananaVel = Constant.gameOptions.frontBGLayerSpeed
        }

        if (this.arrLength == 14) {
            // console.log("If------------");
            // this.bananaContainersArray[this.rndNumber].y = -Constant.round(Constant.game.config.height / 4.5);
            Align.placeAt(0.96, this.bananaArrowYPos, this.bananaContainersArray[this.rndNumber]);
        }

        else {
            // this.bananaContainersArray[this.rndNumber].y = Constant.round(Constant.game.config.height / 6.16);
            Align.placeAt(0.96, this.bananaRestYPos, this.bananaContainersArray[this.rndNumber]);
        }



    }

    MoveBananas() {

        // if (this.canIterate) {
        this.canIterate = false;
        this.bananaContainersArray[this.rndNumber].list.forEach(_banana => {
            // console.log("this.rndNumber------", this.rndNumber);

            if (_banana.x >= this.screenOutXPos) {
                _banana.x -= this.bananaVel;
            }

            if (_banana.x <= this.screenOutXPos && !this.bool) {
                this.bool = true;
                this.scene.events.once('reset', this.ResetBananaContainerPos, this);
                this.scene.events.emit('reset', this.rndNumber);

            }

        });
    }

    ResetBananaContainerPos(_rnd) {

        this.bananaContainersArray[_rnd].each(child => {
            child.x = child.data.list.prevX + Constant.round(Constant.game.config.width / 0.8);
            child.y = child.data.list.prevY;
            child.body.enable = true;
            child.visible = true;
            child.name = "notCollected";
        });

        this.scene.events.once('pickRandom', this.SelectBananaPattern, this);

        this.scene.events.emit('pickRandom');

    }

    SelectBananaPattern() {

        this.rndNumber = Align.generateRandomNumber(0, 5);

        this.arrLength = this.bananaContainersArray[this.rndNumber].list.length;

        if (this.arrLength == 14) {
            // console.log("If------------", this.arrLength);
            // this.bananaContainersArray[this.rndNumber].x = Constant.round(Constant.game.config.width / 0.96);
            // this.bananaContainersArray[this.rndNumber].y = -Constant.round(Constant.game.config.height / 4);
            Align.placeAt(0.96, this.bananaArrowYPos, this.bananaContainersArray[this.rndNumber]);
            this.bool = false;
        }

        else if (this.arrLength != 14) {
            // console.log("Else------------", this.arrLength);
            // this.bananaContainersArray[this.rndNumber].x = Constant.round(Constant.game.config.width / 0.96);
            // this.bananaContainersArray[this.rndNumber].y = Constant.round(Constant.game.config.height / 7);
            Align.placeAt(0.96, this.bananaRestYPos, this.bananaContainersArray[this.rndNumber]);
            this.bool = false;
        }

    }

    CreateSpecialBananaBox() {

        this.specialBananaContainer = this.scene.add.container(0, 0).setScale(Constant.scaleFactor);
        Align.placeAt(3.6, -2, this.specialBananaContainer);
        // this.specialBananaContainer = this.scene.add.container(500, 500).setScale(Constant.scaleFactor);

        let splBananaBox = this.scene.physics.add.image(0, 0, 'special_box');
        splBananaBox.body.allowGravity = false;
        splBananaBox.body.immovable = true;

        this.specialBananaContainer.add(splBananaBox);


    }

    MoveSpecialBox() {

        if (this.scene.obs.mapCounter == 4 && !this.isPlaced) {
            this.isPlaced = true;

            // this.specialBananaContainer.setPosition(2960, 476);
            Align.placeAt(0.6487, 2.2689, this.specialBananaContainer);
            // console.log("Hello from Banana class");
            // this.specialBananaContainer.x -= 7;
        }

        if (this.specialBananaContainer.x >= -Constant.round(Constant.game.config.width / 0.77) && this.isPlaced) {
            this.specialBananaContainer.x -= Constant.gameOptions.frontBGLayerSpeed;
        }

        if (this.specialBananaContainer.x <= -Constant.round(Constant.game.config.width / 0.77) && this.isPlaced) {
            // this.specialBananaContainer.setPosition(Constant.round(Constant.game.config.width / 3.6), -Constant.round(Constant.game.config.width / 2));
            Align.placeAt(3.6, -2, this.specialBananaContainer);
            this.isPlaced = false;

        }
    }

}
export default Bananas;