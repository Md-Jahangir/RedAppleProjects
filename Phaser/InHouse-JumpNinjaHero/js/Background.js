class Background {
    constructor(scene) {
        this.scene = scene;
        this.nightTreeArray = [];
        this.minTrees = 1;
        this.maxTrees = 2;
        this.minTreesGapX = game.config.width / 2.4;
        this.maxTreesGapX = game.config.width / 1.796;
        this.leavesArray = [];
        this.numberOfLeaves = 3;
        this.GapLeavesX = game.config.width / 1.01;
        this.bgOneArray = [];
        this.bgOneDayArray = [];
        this.numberOfBgOne = 2;
        this.bgOneGapX = game.config.width / 1;
        this.bgTwoArray = [];
        this.bgTwoDayArray = [];
        this.numberOfBgTwo = 3;
        this.bgTwoGapX = game.config.width / 1;
        this.frontLayerArray = [];
        this.numberOfFrontLayers = 2;
        this.frontLayerGapX = game.config.width / 0.999;
        this.platformNightArray = [];
        this.platformDayArray = [];
        this.speed = 10;
        this.width = -game.config.width / 1.36;
        this.returnWidth = game.config.width / 0.5;
    }
    GetRandomNumber(_min, _max) {
        return Math.floor(Math.random() * (_max - _min) + _min);
    }
    CreateNightBackgound() {
        let sky = this.scene.add.image(game.config.width / 2, game.config.height / 2, 'sky').setDepth(1);
        if (isMobile) {
            sky.setScale(1 * scaleFactorX, 1.2 * scaleFactorY);
        }
        for (let i = 0; i < this.numberOfBgTwo; i++) {
            let bgTwo = this.scene.add.image(game.config.width / 1.959 + (i * this.bgTwoGapX), game.config.height / 1.98, 'bg_two').setDepth(2);
            if (isMobile) {
                bgTwo.setScale(1 * scaleFactorX, 1.2 * scaleFactorY);
            }
            this.bgTwoArray.push(bgTwo);
        }
        for (let i = 0; i < this.numberOfBgOne; i++) {
            let bgOne = this.scene.add.image(game.config.width / 1.92 + (i * this.bgOneGapX), game.config.height / 2.0769, 'bg_one').setDepth(3);
            if (isMobile) {
                bgOne.setScale(1 * scaleFactorX, 1.2 * scaleFactorY);
            }
            this.bgOneArray.push(bgOne);
        }
        console.log("this.bgOneArray", this.bgOneArray);
        let numberOfTrees = this.GetRandomNumber(this.minTrees, this.maxTrees);
        let gapTreeX = this.GetRandomNumber(this.minTreesGapX, this.maxTreesGapX);
        for (let i = 0; i < numberOfTrees; i++) {
            let treeOne = this.scene.add.image(game.config.width / 4.92 + (i * gapTreeX), game.config.height / 2.0377, 'tree_one').setDepth(6).setScale(0.85 * scaleFactorX, 0.85 * scaleFactorY);
            let treeTwo = this.scene.add.image(game.config.width / 1.61 + (i * gapTreeX), game.config.height / 2.0377, 'tree_two').setDepth(6).setScale(0.85 * scaleFactorX, 0.85 * scaleFactorY);
            let treeThree = this.scene.add.image(game.config.width / 1.07 + (i * gapTreeX), game.config.height / 2.0377, 'tree_three').setDepth(6).setScale(0.85 * scaleFactorX, 0.85 * scaleFactorY);
            this.nightTreeArray.push(treeOne, treeTwo, treeThree);
        }
        for (let i = 0; i < this.numberOfLeaves; i++) {
            let leavesThree = this.scene.add.image(game.config.width / 2.74 + (i * this.GapLeavesX), game.config.height / 5.68, 'leaves_three').setDepth(4).setScale(1 * scaleFactorX, 1.6 * scaleFactorY);
            leavesThree.name = "leavesThree"
            let leavesTwo = this.scene.add.image(game.config.width / 2.74 + (i * this.GapLeavesX), game.config.height / 5.14, 'leaves_two').setDepth(5).setScale(1 * scaleFactorX, 1.6 * scaleFactorY);
            leavesTwo.name = "leavesTwo";
            let leavesOne = this.scene.add.image(game.config.width / 2.74 + (i * this.GapLeavesX), game.config.height / 4.9, 'leaves_one').setDepth(6).setScale(1 * scaleFactorX, 1.6 * scaleFactorY);
            leavesOne.name = "leavesOne";
            this.leavesArray.push(leavesOne, leavesTwo, leavesThree);
        }
        console.log("LeavesArray:", this.leavesArray);

    }
    CreateDayBackground() {
        let skyDay = this.scene.add.image(game.config.width / 2, game.config.height / 2, 'sky_day').setDepth(1).setScale(1, 1.2);
        if (isMobile) {
            skyDay.setScale(1 * scaleFactorX, 1.2 * scaleFactorY);
        }
        for (let i = 0; i < this.numberOfBgTwo; i++) {
            let bgTwoDay = this.scene.add.image(game.config.width / 1.959 + (i * this.bgTwoGapX), game.config.height / 1.98, 'bg_day_two').setDepth(2).setScale(1.03 * scaleFactorX, 1.2 * scaleFactorY);
            // if (isMobile) {
            //     bgTwoDay.setScale(1 * scaleFactorX, 1.2 * scaleFactorY);
            // }
            this.bgTwoDayArray.push(bgTwoDay);
        }
        for (let i = 0; i < this.numberOfBgOne; i++) {
            let bgOneDay = this.scene.add.image(game.config.width / 1.92 + (i * this.bgOneGapX), game.config.height / 2.0769, 'bg_day_one').setDepth(3).setScale(1 * scaleFactorX, 1.2 * scaleFactorY);
            // if (isMobile) {
            //     bgOneDay.setScale(1 * scaleFactorX, 1.2 * scaleFactorY);
            // }
            this.bgOneDayArray.push(bgOneDay);
        }
        for (let i = 0; i < this.numberOfFrontLayers; i++) {
            let frontLayerDay = this.scene.add.image(game.config.width / 2.1 + (i * this.frontLayerGapX), game.config.height / 2.2, 'trees_day').setDepth(4).setScale(1.0047 * scaleFactorX, 1.2 * scaleFactorY);
            // if (isMobile) {
            //     frontLayerDay.setScale(1 * scaleFactorX, 1.2 * scaleFactorY);
            // }
            this.frontLayerArray.push(frontLayerDay);
        }
    }
    CreateNightPlatform() {
        for (let i = 0; i < 3; i++) {
            let groundNight = this.scene.physics.add.image(0 + (i * game.config.width / 1.1), game.config.height / 1.132, 'ground_night').setDepth(7);
            if (isMobile) {
                groundNight.setScale(0.95 * scaleFactorX, 0.95 * scaleFactorY);
            }
            groundNight.body.allowGravity = false;
            groundNight.body.immovable = true;
            this.platformNightArray.push(groundNight);
        }
    }
    CreateDayPlatform() {
        for (let i = 0; i < 4; i++) {
            let groundDay = this.scene.physics.add.image(0 + (i * game.config.width / 1.72), game.config.height / 1.132, 'ground_day').setDepth(4).setScale(1.01 * scaleFactorX, 0.95 * scaleFactorY);;
            // if (isMobile) {
            //     groundDay.setScale(1 * scaleFactorX, 0.95 * scaleFactorY);
            // }
            groundDay.body.allowGravity = false;
            groundDay.body.immovable = true;
            this.platformDayArray.push(groundDay);
        }
    }
    MoveNightBackground() {
        let treesStartXMax = game.config.width / 1.38;
        let treesStartXMin = game.config.width / 1.4769;
        let treesSetPositionX = this.GetRandomNumber(treesStartXMin, treesStartXMax);
        let gapTreeX = this.GetRandomNumber(this.minTreesGapX, this.maxTreesGapX);
        for (let i = 0; i < this.nightTreeArray.length; i++) {
            this.nightTreeArray[i].x -= this.speed * 0.7;
            if (this.nightTreeArray[i].x <= -game.config.width / 6.62) {
                this.nightTreeArray[i].x = treesSetPositionX + gapTreeX;
            }
        }
        let leavesStartX = game.config.width / 0.548;
        for (let i = 0; i < this.leavesArray.length; i++) {
            if (this.leavesArray[i].name = "leavesOne") {
                this.leavesArray[i].x -= this.speed * 0.7;
            }
            else {
                this.leavesArray[i].x -= this.speed * 0.5;
            }
            if (this.leavesArray[i].x <= - game.config.width / 1.28) {
                this.leavesArray[i].x = leavesStartX;
            }
        }
        let bgStartX = game.config.width / 0.676;
        for (let i = 0; i < this.bgOneArray.length; i++) {
            this.bgOneArray[i].x -= this.speed * 0.4;
            // console.log("this");
            if (this.bgOneArray[i].x <= - game.config.width / 1.92) {
                this.bgOneArray[i].x = bgStartX;
            }
        }
        for (let i = 0; i < this.bgTwoArray.length; i++) {
            this.bgTwoArray[i].x -= this.speed * 0.3;
            // console.log("this");
            if (this.bgTwoArray[i].x <= -game.config.width / 1.28) {
                this.bgTwoArray[i].x = bgStartX;
            }
        }
    }
    MoveDayBackground() {
        let bgStartX = game.config.width / 0.676;
        for (let i = 0; i < this.bgOneDayArray.length; i++) {
            this.bgOneDayArray[i].x -= this.speed * 0.4;
            // console.log("this");
            if (this.bgOneDayArray[i].x <= - game.config.width / 1.92) {
                this.bgOneDayArray[i].x = bgStartX;
            }
        }
        for (let i = 0; i < this.bgTwoDayArray.length; i++) {
            this.bgTwoDayArray[i].x -= this.speed * 0.3;
            // console.log("this");
            if (this.bgTwoDayArray[i].x <= -game.config.width / 1.28) {
                this.bgTwoDayArray[i].x = bgStartX;
            }
        }
        let bgFrontLayerStartX = game.config.width / 0.6798;
        for (let i = 0; i < this.frontLayerArray.length; i++) {
            this.frontLayerArray[i].x -= this.speed * 0.4;
            // console.log("this");
            if (this.frontLayerArray[i].x <= - game.config.width / 1.88) {
                this.frontLayerArray[i].x = bgFrontLayerStartX;
            }
        }
    }
    MoveDayPlatform() {
        for (let i = 0; i < this.platformDayArray.length; i++) {
            this.platformDayArray[i].x -= this.speed * scaleFactorX;
            if (this.platformDayArray[i].x <= this.width) {
                this.platformDayArray[i].x = this.returnWidth;
            }
        }
    }
    MoveNightPlatform() {
        for (let i = 0; i < this.platformNightArray.length; i++) {
            this.platformNightArray[i].x -= this.speed * scaleFactorX;
            if (this.platformNightArray[i].x <= this.width) {
                this.platformNightArray[i].x = this.returnWidth;
            }
        }
    }
}
export default Background;
