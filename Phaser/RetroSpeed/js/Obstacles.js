class Obstacles {
    constructor(scene) {
        this.scene = scene;
        this.obsLastIndexOne = null;
        this.obsLastIndexTwo = null;
        this.obsLastIndexThree = null;
        this.obsLastIndexFour = null;
        this.randomLanePicker = null;
        this.randomArrayOne = [];
        this.randomArrayTwo = [];
        this.randomArrayThree = [];
        this.randomArrayFour = [];
        this.vehiclesArrayLaneOne = [];
        this.vehiclesArrayLaneTwo = [];
        this.vehiclesArrayLaneThree = [];
        this.vehiclesArrayLaneFour = [];
        this.minStartY = -435 * scaleFactorY;
        this.maxStartY = -500 * scaleFactorY;
        this.minGapY = 730 * scaleFactorY
        this.maxGapY = 840 * scaleFactorY;
        this.maxSpeed = 12;
        this.minSpeed = 8;
        this.speedOne = null;
        this.speedTwo = null;
        this.speedThree = null;
        this.speedFour = null;
        this.counterOne = null;
        this.counterTwo = null;
        this.counterThree = null;
        this.counterFour = null;
        this.createAgainOne = false;
        this.createAgainTwo = false;
        this.createAgainThree = false;
        this.createAgainFour = false;
    }
    GenerateRandomNumbers(_min, _max) {
        return Math.floor(Math.random() * ((_max - _min) + 1) + _min);
    }
    GenerateRandomNumberWithoutFloor(_min, _max) {
        return Math.random() * ((_max - _min) + 1) + _min;
    }
    CreateRandomArray(_val) {
        if (_val == 0) {
            this.randomArrayOne = Array.from({ length: 4 }, () => Math.floor(Math.random() * (3 - 0 + 1) + 0));
        }
        if (_val == 1) {
            this.randomArrayTwo = Array.from({ length: 4 }, () => Math.floor(Math.random() * (3 - 0 + 1) + 0));
        }
        if (_val == 2) {
            this.randomArrayThree = Array.from({ length: 4 }, () => Math.floor(Math.random() * (3 - 0 + 1) + 0));
        }
        if (_val == 3) {
            this.randomArrayFour = Array.from({ length: 4 }, () => Math.floor(Math.random() * (3 - 0 + 1) + 0));
        }
    }
    LanePicker() {
        this.randomLanePicker = this.GenerateRandomNumbers(0, 3);
        // console.log(this.randomLanePicker);
    }
    CreateObstaclesPool() {
        this.LanePicker();
        if (this.randomLanePicker == 0) {
            this.CreateObstaclesLaneOne(game.config.height / 10.8);
            this.CreateObstaclesLaneTwo(game.config.height / 2.16);
            this.CreateObstaclesLaneThree(game.config.height / 1.2);
            this.CreateObstaclesLaneFour(game.config.height / 0.83);
        }
        if (this.randomLanePicker == 1) {
            this.CreateObstaclesLaneTwo(game.config.height / 10.8);
            this.CreateObstaclesLaneFour(game.config.height / 2.16);
            this.CreateObstaclesLaneOne(game.config.height / 1.2);
            this.CreateObstaclesLaneThree(game.config.height / 0.83);
        }
        if (this.randomLanePicker == 2) {
            this.CreateObstaclesLaneThree(game.config.height / 10.8);
            this.CreateObstaclesLaneOne(game.config.height / 2.16);
            this.CreateObstaclesLaneFour(game.config.height / 1.2);
            this.CreateObstaclesLaneTwo(game.config.height / 0.83);
        }
        if (this.randomLanePicker == 3) {
            this.CreateObstaclesLaneFour(game.config.height / 10.8);
            this.CreateObstaclesLaneTwo(game.config.height / 2.16);
            this.CreateObstaclesLaneThree(game.config.height / 1.2);
            this.CreateObstaclesLaneOne(game.config.height / 0.83);
        }
    }
    CreateObstaclesLaneOne(_gapOne) {

        this.CreateRandomArray(0);
        this.speedOne = this.GenerateRandomNumbers(this.minSpeed, this.maxSpeed);
        // console.log(this.speedOne);
        let startYOne = null;
        let laneOneX = game.config.width / 2.78;
        if (isMobile) {
            laneOneX = game.config.width / 3.01;
        }
        for (let i = 0; i < this.randomArrayOne.length; i++) {
            if (this.randomArrayOne[i] == '0') {
                let obsOne = this.scene.physics.add.image(0, 0, 'obs_carOne').setScale(3.4 * scaleFactorX, 3 * scaleFactorY);
                // obsOne.name = 'car_One';
                if (isMobile) {
                    obsOne.setScale(3 * scaleFactorY);
                }
                this.vehiclesArrayLaneOne.push(obsOne);
            }
            else if (this.randomArrayOne[i] == '1') {
                let obsTwo = this.scene.physics.add.image(0, 0, 'obs_carTwo').setScale(3.4 * scaleFactorX, 3 * scaleFactorY);
                // obsTwo.name = 'car_Two';
                if (isMobile) {
                    obsTwo.setScale(3 * scaleFactorY);
                }
                this.vehiclesArrayLaneOne.push(obsTwo);
            }
            else if (this.randomArrayOne[i] == '2') {
                let obsThree = this.scene.physics.add.image(0, 0, 'obs_carThree').setScale(2.9 * scaleFactorX, 2.8 * scaleFactorY);
                // obsThree.name = 'car_Three';
                if (isMobile) {
                    obsThree.setScale(2.6 * scaleFactorY);
                }
                this.vehiclesArrayLaneOne.push(obsThree);
            }
            else {
                let obsFour = this.scene.physics.add.image(0, 0, 'obs_carFour').setScale(2.9 * scaleFactorX, 2.8 * scaleFactorY);
                // obsFour.name = 'car_Four';
                if (isMobile) {
                    obsFour.setScale(2.6 * scaleFactorY);
                }
                this.vehiclesArrayLaneOne.push(obsFour);
            }

        }
        // console.log("vehiclesArrayLaneOne:", this.vehiclesArrayLaneOne);
        let numberOfObs = this.vehiclesArrayLaneOne.length;
        this.obsLastIndexOne = numberOfObs - 1;

        for (let i = 0; i < this.vehiclesArrayLaneOne.length; i++) {
            this.vehiclesArrayLaneOne[i].name = 'not_passed';
            let gapYOne = this.GenerateRandomNumberWithoutFloor(this.minGapY, this.maxGapY);
            if (this.counterOne == 1) {
                this.counterOne = 0;
                startYOne = -this.vehiclesArrayLaneOne[this.vehiclesArrayLaneOne.length - 3].y - this.vehiclesArrayLaneOne[this.vehiclesArrayLaneOne.length - 3].height - gapYOne - game.config.height / 1.08;
                console.log(startYOne);
                // console.log(startYOne);
            }
            else {
                startYOne = this.GenerateRandomNumberWithoutFloor(this.minStartY, this.maxStartY);
            }
            if (i == 0) {
                // let gap = Math.floor(Math.random() * (150 - 50 + 1) + 50);
                this.vehiclesArrayLaneOne[i].setPosition(laneOneX, startYOne + gapYOne - this.vehiclesArrayLaneOne[i].height * 1.5 - _gapOne);
            }
            else {
                this.vehiclesArrayLaneOne[i].setPosition(laneOneX, this.vehiclesArrayLaneOne[i - 1].y - this.vehiclesArrayLaneOne[i - 1].height - this.vehiclesArrayLaneOne[i].height * 1.5 - gapYOne - game.config.height / 1.8);
            }
        }
    }
    CreateObstaclesLaneTwo(_gapTwo) {
        this.CreateRandomArray(1);
        this.speedTwo = this.GenerateRandomNumbers(this.minSpeed, this.maxSpeed);
        // console.log(this.speedTwo);
        let startYTwo = null;
        let laneTwoX = game.config.width / 2.21;
        if (isMobile) {
            laneTwoX = game.config.width / 2.27;
        }
        for (let i = 0; i < this.randomArrayTwo.length; i++) {
            if (this.randomArrayTwo[i] == '0') {

                let obsOne = this.scene.physics.add.image(0, 0, 'obs_carTwo').setScale(3.4 * scaleFactorX, 3 * scaleFactorY);
                // obsOne.name = 'car_One';
                if (isMobile) {
                    obsOne.setScale(3 * scaleFactorY);
                }
                this.vehiclesArrayLaneTwo.push(obsOne);
            }
            else if (this.randomArrayTwo[i] == '1') {

                let obsTwo = this.scene.physics.add.image(0, 0, 'obs_carOne').setScale(3.4 * scaleFactorX, 3 * scaleFactorY);
                // obsTwo.name = 'car_Two';
                if (isMobile) {
                    obsTwo.setScale(3 * scaleFactorY);
                }
                this.vehiclesArrayLaneTwo.push(obsTwo);
            }
            else if (this.randomArrayTwo[i] == '2') {
                let obsThree = this.scene.physics.add.image(0, 0, 'obs_carThree').setScale(2.9 * scaleFactorX, 2.8 * scaleFactorY);
                // obsThree.name = 'car_Three';
                if (isMobile) {
                    obsThree.setScale(2.6 * scaleFactorY);
                }
                this.vehiclesArrayLaneTwo.push(obsThree);
            }
            else {
                let obsFour = this.scene.physics.add.image(0, 0, 'obs_carFour').setScale(2.9 * scaleFactorX, 2.8 * scaleFactorY);
                // obsFour.name = 'car_Four';
                if (isMobile) {
                    obsFour.setScale(2.6 * scaleFactorY);
                }
                this.vehiclesArrayLaneTwo.push(obsFour);
            }

        }
        // console.log("vehiclesArrayLaneOne:", this.vehiclesArrayLaneTwo);
        let numberOfObs = this.vehiclesArrayLaneTwo.length;
        this.obsLastIndexTwo = numberOfObs - 1;

        for (let i = 0; i < this.vehiclesArrayLaneTwo.length; i++) {
            this.vehiclesArrayLaneTwo[i].name = 'not_passed';
            let gapYTwo = this.GenerateRandomNumberWithoutFloor(this.minGapY, this.maxGapY);
            if (this.counterTwo == 1) {
                this.counterTwo = 0;
                startYTwo = this.vehiclesArrayLaneTwo[this.vehiclesArrayLaneTwo.length - 3].y - this.vehiclesArrayLaneTwo[this.vehiclesArrayLaneTwo.length - 3].height - gapYTwo - game.config.height / 1.8;
                // console.log(startYTwo);
            }
            else {
                startYTwo = this.GenerateRandomNumberWithoutFloor(this.minStartY, this.maxStartY);
            }
            if (i == 0) {
                // let gap = Math.floor(Math.random() * (200 - 150 + 1) + 150);
                this.vehiclesArrayLaneTwo[i].setPosition(laneTwoX, startYTwo + gapYTwo - this.vehiclesArrayLaneTwo[i].height * 4 - _gapTwo);
            }
            else {
                this.vehiclesArrayLaneTwo[i].setPosition(laneTwoX, this.vehiclesArrayLaneTwo[i - 1].y - this.vehiclesArrayLaneTwo[i - 1].height - this.vehiclesArrayLaneTwo[i].height * 4 - gapYTwo - game.config.height / 0.98);
            }
        }
    }
    CreateObstaclesLaneThree(_gapThree) {
        this.CreateRandomArray(2);
        this.speedThree = this.GenerateRandomNumbers(this.minSpeed, this.maxSpeed);
        // console.log(this.speedThree);
        let startYThree = null;
        let laneThreeX = game.config.width / 1.83;
        if (isMobile) {
            laneThreeX = game.config.width / 1.8;
        }
        for (let i = 0; i < this.randomArrayThree.length; i++) {
            if (this.randomArrayThree[i] == '0') {

                let obsOne = this.scene.physics.add.image(0, 0, 'obs_carThree').setScale(2.9 * scaleFactorX, 2.8 * scaleFactorY);
                // obsOne.name = 'car_One';
                if (isMobile) {
                    obsOne.setScale(2.6 * scaleFactorY);
                }
                this.vehiclesArrayLaneThree.push(obsOne);
            }
            else if (this.randomArrayThree[i] == '1') {

                let obsTwo = this.scene.physics.add.image(0, 0, 'obs_carOne').setScale(3.4 * scaleFactorX, 3 * scaleFactorY);
                // obsTwo.name = 'car_Two';
                if (isMobile) {
                    obsTwo.setScale(3 * scaleFactorY);
                }
                this.vehiclesArrayLaneThree.push(obsTwo);
            }
            else if (this.randomArrayThree[i] == '2') {
                let obsThree = this.scene.physics.add.image(0, 0, 'obs_carFour').setScale(2.9 * scaleFactorX, 2.8 * scaleFactorY);
                // obsThree.name = 'car_Three';
                if (isMobile) {
                    obsThree.setScale(2.6 * scaleFactorY);
                }
                this.vehiclesArrayLaneThree.push(obsThree);
            }
            else {
                let obsFour = this.scene.physics.add.image(0, 0, 'obs_carTwo').setScale(3.4 * scaleFactorX, 3 * scaleFactorY);
                // obsFour.name = 'car_Four';
                if (isMobile) {
                    obsFour.setScale(3 * scaleFactorY);
                }
                this.vehiclesArrayLaneThree.push(obsFour);
            }

        }
        // console.log("vehiclesArrayLaneOne:", this.vehiclesArrayLaneThree);
        let numberOfObs = this.vehiclesArrayLaneThree.length;
        this.obsLastIndexThree = numberOfObs - 1;

        for (let i = 0; i < this.vehiclesArrayLaneThree.length; i++) {
            this.vehiclesArrayLaneThree[i].name = 'not_passed';
            let gapYThree = this.GenerateRandomNumberWithoutFloor(this.minGapY, this.maxGapY);
            if (this.counterThree == 1) {
                this.counterThree = 0;
                startYThree = this.vehiclesArrayLaneThree[this.vehiclesArrayLaneThree.length - 3].y - this.vehiclesArrayLaneThree[this.vehiclesArrayLaneThree.length - 3].height - gapYThree;
                console.log(startYThree);
            }
            else {
                startYThree = this.GenerateRandomNumberWithoutFloor(this.minStartY, this.maxStartY);
            }
            if (i == 0) {
                // let gap = Math.floor(Math.random() * (350 - 50 + 1) + 50);
                this.vehiclesArrayLaneThree[i].setPosition(laneThreeX, startYThree + gapYThree - this.vehiclesArrayLaneThree[i].height * 3 - _gapThree);
            }
            else {
                this.vehiclesArrayLaneThree[i].setPosition(laneThreeX, this.vehiclesArrayLaneThree[i - 1].y - this.vehiclesArrayLaneThree[i - 1].height - this.vehiclesArrayLaneThree[i].height * 3 - gapYThree - game.config.height / 3.086);
            }
        }
    }
    CreateObstaclesLaneFour(_gapFour) {
        this.CreateRandomArray(3);
        this.speedFour = this.GenerateRandomNumbers(this.minSpeed, this.maxSpeed);
        // console.log(this.speedFour);
        let startYFour = null;
        let laneFourX = game.config.width / 1.56;
        if (isMobile) {
            laneFourX = game.config.width / 1.50;
        }
        for (let i = 0; i < this.randomArrayFour.length; i++) {
            if (this.randomArrayFour[i] == '0') {

                let obsOne = this.scene.physics.add.image(0, 0, 'obs_carFour').setScale(2.9 * scaleFactorX, 2.8 * scaleFactorY);
                // obsOne.name = 'car_One';
                if (isMobile) {
                    obsOne.setScale(2.6 * scaleFactorY);
                }
                this.vehiclesArrayLaneFour.push(obsOne);
            }
            else if (this.randomArrayFour[i] == '1') {

                let obsTwo = this.scene.physics.add.image(0, 0, 'obs_carThree').setScale(2.9 * scaleFactorX, 2.8 * scaleFactorY);
                // obsTwo.name = 'car_Two';
                if (isMobile) {
                    obsTwo.setScale(2.6 * scaleFactorY);
                }
                this.vehiclesArrayLaneFour.push(obsTwo);
            }
            else if (this.randomArrayFour[i] == '2') {
                let obsThree = this.scene.physics.add.image(0, 0, 'obs_carOne').setScale(3.4 * scaleFactorX, 3 * scaleFactorY);
                // obsThree.name = 'car_Three';
                if (isMobile) {
                    obsThree.setScale(3 * scaleFactorY);
                }
                this.vehiclesArrayLaneFour.push(obsThree);
            }
            else {
                let obsFour = this.scene.physics.add.image(0, 0, 'obs_carTwo').setScale(3.4 * scaleFactorX, 3 * scaleFactorY);
                // obsFour.name = 'car_Four';
                if (isMobile) {
                    obsFour.setScale(3 * scaleFactorY);
                }
                this.vehiclesArrayLaneFour.push(obsFour);
            }

        }
        // console.log("vehiclesArrayLaneOne:", this.vehiclesArrayLaneFour);
        let numberOfObs = this.vehiclesArrayLaneFour.length;
        this.obsLastIndexFour = numberOfObs - 1;

        for (let i = 0; i < this.vehiclesArrayLaneFour.length; i++) {
            this.vehiclesArrayLaneFour[i].name = 'not_passed';
            let gapYFour = this.GenerateRandomNumberWithoutFloor(this.minGapY, this.maxGapY);
            if (this.counterFour == 1) {
                this.counterFour = 0;
                startYFour = this.vehiclesArrayLaneFour[this.vehiclesArrayLaneFour.length - 3].y - this.vehiclesArrayLaneFour[this.vehiclesArrayLaneFour.length - 3].height - gapYFour;
                console.log(startYFour);
            }
            else {
                startYFour = this.GenerateRandomNumberWithoutFloor(this.minStartY, this.maxStartY);
            }
            if (i == 0) {
                // let gap = Math.floor(Math.random() * (550 - 50 + 1) + 50);
                this.vehiclesArrayLaneFour[i].setPosition(laneFourX, startYFour + gapYFour - this.vehiclesArrayLaneFour[i].height * 5 - _gapFour);
            }
            else {
                this.vehiclesArrayLaneFour[i].setPosition(laneFourX, this.vehiclesArrayLaneFour[i - 1].y - this.vehiclesArrayLaneFour[i - 1].height - this.vehiclesArrayLaneFour[i].height * 5 - gapYFour - game.config.height / 0.77);
            }
        }
    }
    MoveObstaclesLaneOne() {
        for (let i = 0; i < this.vehiclesArrayLaneOne.length; i++) {
            this.vehiclesArrayLaneOne[i].y += this.speedOne;

            if (this.vehiclesArrayLaneOne[i].y >= game.config.height / 0.9) {
                let gapYOne = this.GenerateRandomNumberWithoutFloor(this.minGapY, this.maxGapY);
                this.vehiclesArrayLaneOne[i].y = this.vehiclesArrayLaneOne[this.obsLastIndexOne].y - this.vehiclesArrayLaneOne[this.obsLastIndexOne].height - gapYOne - game.config.height / 0.36;
                this.obsLastIndexOne = i;
                if (i == this.vehiclesArrayLaneOne.length - 1) {
                    this.createAgainOne = true;
                }
                if (this.createAgainOne) {
                    this.counterOne = 1;
                    this.randomArrayOne = [];
                    this.vehiclesArrayLaneOne = [];
                    this.createAgainOne = false;
                    this.CreateObstaclesLaneOne(0);
                }
            }

        }
    }
    MoveObstaclesLaneTwo() {
        for (let i = 0; i < this.vehiclesArrayLaneTwo.length; i++) {
            this.vehiclesArrayLaneTwo[i].y += this.speedTwo;

            if (this.vehiclesArrayLaneTwo[i].y >= game.config.height / 0.9) {
                let gapYTwo = this.GenerateRandomNumberWithoutFloor(this.minGapY, this.maxGapY);
                this.vehiclesArrayLaneTwo[i].y = this.vehiclesArrayLaneTwo[this.obsLastIndexTwo].y - this.vehiclesArrayLaneTwo[this.obsLastIndexTwo].height - gapYTwo - game.config.height / 0.36;
                this.obsLastIndexTwo = i;
                if (i == this.vehiclesArrayLaneTwo.length - 1) {
                    this.createAgainTwo = true;
                }
                if (this.createAgainTwo) {
                    this.counterTwo = 1;
                    this.randomArrayTwo = [];
                    this.vehiclesArrayLaneTwo = [];
                    this.createAgainTwo = false;
                    this.CreateObstaclesLaneTwo(1);
                }
            }
        }
    }
    MoveObstaclesLaneThree() {
        for (let i = 0; i < this.vehiclesArrayLaneThree.length; i++) {
            this.vehiclesArrayLaneThree[i].y += this.speedThree;

            if (this.vehiclesArrayLaneThree[i].y >= game.config.height / 0.9) {
                let gapYThree = this.GenerateRandomNumberWithoutFloor(this.minGapY, this.maxGapY);
                this.vehiclesArrayLaneThree[i].y = this.vehiclesArrayLaneThree[this.obsLastIndexThree].y - this.vehiclesArrayLaneThree[this.obsLastIndexThree].height - gapYThree - game.config.height / 0.36;
                this.obsLastIndexThree = i;
                if (i == this.vehiclesArrayLaneThree.length - 1) {
                    this.createAgainThree = true;
                }
                if (this.createAgainThree) {
                    this.counterThree = 1;
                    this.randomArrayThree = [];
                    this.vehiclesArrayLaneThree = [];
                    this.createAgainThree = false;
                    this.CreateObstaclesLaneThree(2);
                }
            }
        }
    }
    MoveObstaclesLaneFour() {
        for (let i = 0; i < this.vehiclesArrayLaneFour.length; i++) {
            this.vehiclesArrayLaneFour[i].y += this.speedFour;

            if (this.vehiclesArrayLaneFour[i].y >= game.config.height / 0.9) {
                let gapYFour = this.GenerateRandomNumberWithoutFloor(this.minGapY, this.maxGapY);
                this.vehiclesArrayLaneFour[i].y = this.vehiclesArrayLaneFour[this.obsLastIndexFour].y - this.vehiclesArrayLaneFour[this.obsLastIndexFour].height - gapYFour - game.config.height / 0.36;
                this.obsLastIndexFour = i;
                if (i == this.vehiclesArrayLaneFour.length - 1) {
                    this.createAgainFour = true;
                }
                if (this.createAgainFour) {
                    this.counterFour = 1;
                    this.randomArrayFour = [];
                    this.vehiclesArrayLaneFour = [];
                    this.createAgainFour = false;
                    this.CreateObstaclesLaneFour(3);
                }
            }
        }
    }
    MoveObstaclesPool() {
        this.MoveObstaclesLaneOne();
        this.MoveObstaclesLaneTwo();
        this.MoveObstaclesLaneThree();
        this.MoveObstaclesLaneFour();
    }
}
export default Obstacles;