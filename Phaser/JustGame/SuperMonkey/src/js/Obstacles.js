import { Constant } from "./Constant.js";
import { Align } from "./util/align.js";

class Obstacles {
    constructor(scene) {

        this.scene = scene;

        this.obsArrayOne = [];
        this.obsArrayTwo = [];
        this.obsArrayThree = [];
        this.obsArrayFour = [];
        this.fireContainer = null;
        this.stoneContainer = null;
        this.rockContainer = null;
        this.birdContainer = null;
        this.showBird = null;
        this.birdTween = null;
        this.durationTime = null;
        this.tweenCompleted = null;
        this.rndNumberArray = [];
        this.currObsArrayOne = [];
        this.currObsArrayTwo = [];
        this.currObsArrayThree = [];
        this.currObsArrayFour = [];
        this.obsBool = false;
        this.stoneBool = false;
        this.mapCounter = null;
        this.firstArray = [];

    }
    CreateObstacles() {
        // 3960, 483.15
        // 3760, 483.15
        // 4120, 730.15
        // 3960, 730.15
        // 4960, 730.15
        // 5960, 483.15
        //5960
        // 13460, 730.15
        // this.obsArray[0] Top------- 960 483.15789473684214
        // this.obsArray[2] Down------- 1364.2105263157896 767.3684210526317

        // this.rockContainer = this.scene.add.container(2000, 0).setScale(Constant.scaleFactor);

        for (let i = 0; i < 12; i++) {
            let fire = this.scene.add.spine(0, -Constant.round(Constant.game.config.height / 2), 'fire').setName("fire").setScale(Constant.scaleFactor).setVisible(true);
            this.scene.physics.add.existing(fire);
            fire.body.allowGravity = false;
            fire.body.immovable = true;
            fire.play("animation", true);
            if (i < 3) {
                this.obsArrayOne.push(fire);
            }
            else if (i < 6) {
                this.obsArrayTwo.push(fire);
            }
            else if (i < 9) {
                this.obsArrayThree.push(fire);
            }
            else if (i < 12) {
                this.obsArrayFour.push(fire);
            }
        }
        // console.log("Array checks--------", this.obsArrayOne, this.obsArrayTwo, this.obsArrayThree, this.obsArrayFour)
        // console.log(this.obsArrayTwo); //, this.obsArrayThree, this.obsArrayFour);

        for (let i = 0; i < 12; i++) {
            let rock = this.scene.add.image(0, -Constant.round(Constant.game.config.height / 2), 'rock').setName("rock").setScale(Constant.scaleFactor).setVisible(true);
            this.scene.physics.add.existing(rock);
            rock.body.allowGravity = false;
            rock.body.immovable = true;
            if (i < 3) {
                this.obsArrayOne.push(rock);
            }
            else if (i < 6) {
                this.obsArrayTwo.push(rock);
            }
            else if (i < 9) {
                this.obsArrayThree.push(rock);
            }
            else if (i < 12) {
                this.obsArrayFour.push(rock);
            }
        }

        // for (let i = 0; i < 4; i++) {
        //     let stone = this.scene.add.spine(0, -540, 'stoneball').setName("stone").setScale(Constant.scaleFactor).setVisible(true);
        //     stone.play("animation", true);
        //     if (i < 1) {
        //         this.obsArrayOne.push(stone);
        //     }
        //     else if (i < 2) {
        //         this.obsArrayTwo.push(stone);
        //     }
        //     else if (i < 3) {
        //         this.obsArrayThree.push(stone);
        //     }
        //     else if (i < 4) {
        //         this.obsArrayFour.push(stone);
        //     }
        // }

        // this.stone = this.scene.add.spine(0, -540, 'stoneball').setName("stone").setScale(Constant.scaleFactor).setVisible(true);


        // console.log(this.obsArray);
        Align.shuffleArray(this.obsArrayOne);
        Align.shuffleArray(this.obsArrayTwo);
        Align.shuffleArray(this.obsArrayThree);
        Align.shuffleArray(this.obsArrayFour);

        this.mapCounter = 1;
        // this.obsArrayOne[0].setPosition(2760, 750);
        if (this.obsArrayOne[0].name == "fire") {
            Align.placeAt(0.6956, 1.44, this.obsArrayOne[0]);
        }

        else {
            Align.placeAt(0.6956, 1.479, this.obsArrayOne[0]);
        }

        this.currObsArrayOne.push(this.obsArrayOne[0]);

    }

    MoveObstacles() {

        this.currObsArrayOne.forEach(element => {
            if (element.x >= -Constant.round(Constant.game.config.width / 1.067)) {
                if (Constant.isMobile) {
                    element.x -= Constant.gameOptionsMobile.frontBGLayerSpeed;
                }

                else {
                    element.x -= Constant.gameOptions.frontBGLayerSpeed;
                }
            }
            if (element.x <= -Constant.round(Constant.game.config.width / 1.067)) {
                this.scene.events.once('reset_obs', this.ResetObsPos, this);
                this.scene.events.emit('reset_obs');
            }

        });

        this.currObsArrayTwo.forEach(element => {
            if (element.x >= -Constant.round(Constant.game.config.width / 1.067)) {
                if (Constant.isMobile) {
                    element.x -= Constant.gameOptionsMobile.frontBGLayerSpeed;
                }

                else {
                    element.x -= Constant.gameOptions.frontBGLayerSpeed;
                }
            }
            if (element.x <= -Constant.round(Constant.game.config.width / 1.067)) {
                this.scene.events.once('reset_obs', this.ResetObsPos, this);
                this.scene.events.emit('reset_obs');
            }
        });

        this.currObsArrayThree.forEach(element => {
            if (element.x >= -Constant.round(Constant.game.config.width / 1.067)) {
                if (Constant.isMobile) {
                    element.x -= Constant.gameOptionsMobile.frontBGLayerSpeed;
                }

                else {
                    element.x -= Constant.gameOptions.frontBGLayerSpeed;
                }
            }
            if (element.x <= -Constant.round(Constant.game.config.width / 1.067)) {
                this.scene.events.once('reset_obs', this.ResetObsPos, this);
                this.scene.events.emit('reset_obs');
            }
        });

        this.currObsArrayFour.forEach(element => {
            if (element.x >= -Constant.round(Constant.game.config.width / 1.03)) {
                if (Constant.isMobile) {
                    element.x -= Constant.gameOptionsMobile.frontBGLayerSpeed;
                }

                else {
                    element.x -= Constant.gameOptions.frontBGLayerSpeed;
                }
            }
            if (element.x <= -Constant.round(Constant.game.config.width / 1.03)) {
                this.scene.events.once('reset_obs', this.ResetObsPos, this);
                this.scene.events.emit('reset_obs');
            }
        });
    }

    ResetObsPos() {

        if (this.mapCounter < 5) {
            this.mapCounter++;
        }

        else {
            this.mapCounter = 1;
        }
        this.scene.events.once('pickRandom', this.SelectObstacles, this);

        this.scene.events.emit('pickRandom', this.mapCounter);
        // }
    }

    // })



    // }


    SelectObstacles(_mapCounter) {

        // console.log("MapCount-------------", _mapCounter);

        // this.currObsArray = [];
        // console.log("Curr obs Array--------", this.currObsArray);

        if (_mapCounter == 2) {
            // console.log("Second counter");
            this.currObsArrayOne = [];
            // let rndNumber = Align.generateRandomNumber(2, 3);
            // rndNumber = 2;
            // if (rndNumber == 1) {
            //     console.log("Number One");
            //     // console.log(Align.generateRandomNumber(0, 8));
            //     this.rndNumberArray = Align.generateUniqueRandomNumbers(1, 0, 8);
            //     let a = this.rndNumberArray[0];
            //     // let b = this.rndNumber[1];
            //     // let c = this.rndNumber[2];
            //     if (this.obsArray[a].name == "fire") {
            //         this.obsArray[a].setPosition(2060, 500);
            //         this.currObsArray.push(this.obsArray[a]);
            //         this.obsBool = false;
            //     }

            //     else {
            //         this.obsArray[a].setPosition(2060, 483.15);
            //         this.currObsArray.push(this.obsArray[this.rndNumber]);
            //         this.obsBool = false;
            //     }
            // }


            // if (rndNumber == 2) {
            //     console.log("Number Two");
            //     this.rndNumberArray = Align.generateUniqueRandomNumbers(2, 0, 7);
            //     let a = this.rndNumberArray[0];
            //     let b = this.rndNumberArray[1];
            //     // this.rndNumberArray = Align.generateRandomNumber(0, 9);
            //     if (this.obsArray[a].name == "fire") {
            //         this.obsArray[a].setPosition(2560, 500);
            //         this.currObsArray.push(this.obsArray[a]);
            //     }

            //     else if (this.obsArray[a].name == "stone") {
            //         this.obsArray[a].setPosition(2460, 483.15);
            //         this.stoneArray.push(this.obsArray[a]);
            //     }
            //     else {
            //         this.obsArray[a].setPosition(2560, 483.15);
            //         this.currObsArray.push(this.obsArray[a]);
            //     }

            //     if (this.obsArray[b].name == "fire") {
            //         this.obsArray[b].setPosition(4500, 750);
            //         this.currObsArray.push(this.obsArray[b]);
            //         this.obsBool = false;
            //     }
            //     else if (this.obsArray[b].name == "stone") {
            //         this.obsArray[b].setPosition(4000, 730.15);
            //         this.stoneArray.push(this.obsArray[b]);
            //         this.obsBool = false;
            //     }
            //     else {
            //         this.obsArray[b].setPosition(4500, 730.15);
            //         this.stoneArray.push(this.obsArray[b]);
            //         this.obsBool = false;
            //     }
            // }

            // else if (rndNumber == 3) {
            // console.log("Number Three");
            this.rndNumberArray = [];
            this.rndNumberArray = Align.generateUniqueRandomNumbers(3, 0, 5);
            let a = this.rndNumberArray[0];
            let b = this.rndNumberArray[1];
            let c = this.rndNumberArray[2];

            // console.log(this.obsArray[a].name);
            // console.log(this.obsArray[b].name);
            // console.log(this.obsArray[c].name);
            // if (this.obsArray[a].name == "fire") {
            //     this.obsArray[a].setPosition(1920, 500);
            //     this.currObsArray.push(this.obsArray[a]);
            // }
            // else if (this.obsArray[a].name == "stone") {
            //     this.obsArray[a].setPosition(1960, 483.15);
            //     this.stoneArray.push(this.obsArray[a]);
            // }
            // else {
            //     this.obsArray[a].setPosition(1920, 483.15);
            //     this.currObsArray.push(this.obsArray[a]);
            // }

            // this.rndNumber[0] = Align.generateRandomNumber(0, 9);
            if (this.obsArrayTwo[b].name == "fire") {
                // this.obsArrayTwo[b].setPosition(2200, 750);
                Align.placeAt(0.873, 1.44, this.obsArrayTwo[b])
                this.currObsArrayTwo.push(this.obsArrayTwo[b]);
            }
            else {
                // this.obsArrayTwo[b].setPosition(2200, 730.15);
                Align.placeAt(0.873, 1.479, this.obsArrayTwo[b]);
                this.currObsArrayTwo.push(this.obsArrayTwo[b]);
            }

            //   this.rndNumberArray = Align.generateRandomNumber(0, 9);
            // if (this.obsArrayTwo[c].name == "fire") {
            //     // this.obsArrayTwo[c].setPosition(3060, 500);
            //     Align.placeAt(0.627, 2.16, this.obsArrayTwo[c]);
            //     this.currObsArrayTwo.push(this.obsArrayTwo[c]);
            //     // this.obsBool = false;
            // }
            // else {
            //     // this.obsArrayTwo[c].setPosition(3060, 483.15);
            //     Align.placeAt(0.627, 2.235, this.obsArrayTwo[c]);
            //     this.currObsArrayTwo.push(this.obsArrayTwo[c]);
            //     // this.obsBool = false;
            // }
        }

        // }

        else if (_mapCounter == 3) {
            // console.log("Third counter");
            this.currObsArrayTwo = [];
            this.rndNumberArray = [];
            this.rndNumberArray = Align.generateUniqueRandomNumbers(3, 0, 5);
            let a = this.rndNumberArray[0];
            let b = this.rndNumberArray[1];
            let c = this.rndNumberArray[2];
            if (this.obsArrayThree[a].name == "fire") {
                // this.obsArrayThree[a].setPosition(2800, 750);
                Align.placeAt(0.6857, 1.44, this.obsArrayThree[a]);
                this.currObsArrayThree.push(this.obsArrayThree[a]);
                // this.obsBool = false;
            }

            else {
                // this.obsArrayThree[a].setPosition(2800, 730.15);
                Align.placeAt(0.6857, 1.479, this.obsArrayThree[a]);
                this.currObsArrayThree.push(this.obsArrayThree[a]);
            }
            if (this.obsArrayThree[b].name == "fire") {
                // this.obsArrayThree[b].setPosition(3960, 500);
                Align.placeAt(0.486, 2.16, this.obsArrayThree[b]);
                this.currObsArrayThree.push(this.obsArrayThree[b]);
                // this.obsBool = false;
            }
            else {
                // this.obsArrayThree[b].setPosition(3960, 483.15);
                Align.placeAt(0.486, 2.235, this.obsArrayThree[b]);
                this.currObsArrayThree.push(this.obsArrayThree[b]);
            }
            if (this.obsArrayThree[c].name == "fire") {
                // this.obsArrayThree[c].setPosition(4150, 750);
                Align.placeAt(0.46, 1.44, this.obsArrayThree[c]);
                this.currObsArrayThree.push(this.obsArrayThree[c]);
                this.obsBool = false;
            }
            else {
                // this.obsArrayThree[c].setPosition(4150, 730.15);
                Align.placeAt(0.46, 1.479, this.obsArrayThree[c]);
                this.currObsArrayThree.push(this.obsArrayThree[c]);
                this.obsBool = false;
            }



        }

        else if (_mapCounter == 4) {

            // console.log("Fourth counter");
            this.currObsArrayThree = [];
            this.rndNumberArray = [];
            this.rndNumberArray = Align.generateUniqueRandomNumbers(2, 0, 5);
            let a = this.rndNumberArray[0];
            let b = this.rndNumberArray[1];

            if (this.obsArrayFour[a].name == "fire") {
                // this.obsArrayFour[a].setPosition(1935, 500);
                Align.placeAt(0.99, 2.16, this.obsArrayFour[a]);
                this.currObsArrayFour.push(this.obsArrayFour[a]);
                // this.obsBool = false;
            }

            else {
                // this.obsArrayFour[a].setPosition(1935, 483.15);
                Align.placeAt(0.99, 2.235, this.obsArrayFour[a]);
                this.currObsArrayFour.push(this.obsArrayFour[a]);
            }
            if (this.obsArrayFour[b].name == "fire") {
                // this.obsArrayFour[b].setPosition(3760, 750);
                Align.placeAt(0.51, 1.44, this.obsArrayFour[b]);
                this.currObsArrayFour.push(this.obsArrayFour[b]);
                // this.obsBool = false;
            }
            else {
                // this.obsArrayFour[b].setPosition(3760, 730.15);
                Align.placeAt(0.51, 1.479, this.obsArrayFour[b]);
                this.currObsArrayFour.push(this.obsArrayFour[b]);
            }

        }

        else if (_mapCounter == 1) {

            // console.log("First Counter");
            this.currObsArrayFour = [];
            this.rndNumberArray = [];
            this.rndNumberArray = Align.generateUniqueRandomNumbers(3, 0, 5);
            let a = this.rndNumberArray[0];
            let b = this.rndNumberArray[1];

            if (this.obsArrayOne[a].name == "fire") {
                // this.obsArrayOne[a].setPosition(4050, 750);
                Align.placeAt(0.474, 1.44, this.obsArrayOne[a]);
                this.currObsArrayOne.push(this.obsArrayOne[a]);
                // this.obsBool = false;
            }

            else {
                // this.obsArrayOne[a].setPosition(4050, 730.15);
                Align.placeAt(0.474, 1.479, this.obsArrayOne[a]);
                this.currObsArrayOne.push(this.obsArrayOne[a]);
            }
            // if (this.obsArrayFour[b].name == "fire") {
            //     this.obsArrayFour[b].setPosition(3660, 500);
            //     this.currObsArrayFour.push(this.obsArrayFour[b]);
            //     // this.obsBool = false;
            // }
            // else {
            //     this.obsArrayFour[b].setPosition(3660, 483.15);
            //     this.currObsArrayFour.push(this.obsArrayFour[b]);
            // }

        }
        // 

    }
    // }

    CreateBird() {

        // 2000, 620

        this.birdContainer = this.scene.add.container(0, 0).setScale(Constant.scaleFactor);
        Align.center(this.birdContainer);

        let bird = this.scene.add.spine(1040, 80, 'bird').setName("bird");
        this.scene.physics.add.existing(bird);
        bird.body.setSize(bird.width, bird.height - 30, true);
        bird.body.allowGravity = false;
        bird.body.immovable = true;
        bird.play('animation', true);

        this.birdContainer.add(bird);

        this.showBird = this.scene.time.addEvent({ delay: 11200, paused: false, callback: this.MoveBird, callbackScope: this, loop: true });

    }

    MoveBird() {

        // console.log("this.birdContainer.list[0]------", this.birdContainer.list[0]);
        this.tweenCompleted = false;

        if (Constant.isMobile) {
            // console.log("Mobile from obs");
            this.durationTime = Constant.gameOptionsMobile.birdTweenDuration;
        }

        else {
            // console.log("PC from obs");
            this.durationTime = Constant.gameOptions.birdTweenDuration;
        }

        this.birdTween = this.scene.tweens.add({

            targets: this.birdContainer.list[0],
            x: -Constant.round(Constant.game.config.width / 0.83),
            duration: this.durationTime,
            ease: 'Quad.out',
            onComplete: () => {

                this.birdContainer.list[0].x = Constant.round(Constant.game.config.width / 0.96);
                // this.showBird.delay = 6000;
                // this.tweenCompleted = true;

            }

        });

    }

}

export default Obstacles;