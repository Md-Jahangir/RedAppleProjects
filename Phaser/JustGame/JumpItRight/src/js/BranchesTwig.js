import { Constant } from "./Constant.js";
class BranchesTwig {
    constructor(scene) {
        this.scene = scene;

        this.numberOfTwigsLeft = 9;
        this.numberOfTwigsRight = 10;
        this.leftArray = [];
        this.leftLastIndex = null;
        this.counterTwig = 0;

        this.rightArray = [];
        this.rightLastIndex = null;
        this.leftCollidingArray = [];
        this.rightJsonArray = [];
        this.wheelArray = [];
        this.rotationAngle = 0;
    }
    CreateLeftTwigs() {
        // let a = this.scene.physics.add.image(100, 800, '6')//.setOrigin(0.5, 0.5);
        let leftBranchObstacleGroupOne = this.scene.add.container(0, 0);
        let L_Brunch_obstacles_1 = this.scene.add.image(240, 1200, 'L_Brunch_obstacles_1').setOrigin(0.5, 0);

        //--------------------------------------
        let box_1 = this.scene.add.image(90, 1440, 'white').setOrigin(0.5, 0).setScale(200, 80)//.setAngle(-15);
        let box_2 = this.scene.add.image(150, 1370, 'white').setOrigin(0.5, 0).setScale(55, 60)//.setAngle(-15);
        let box_3 = this.scene.add.image(190, 1340, 'white').setOrigin(0.5, 0).setScale(100, 20)//.setAngle(-15);
        let box_4 = this.scene.add.image(290, 1390, 'white').setOrigin(0.5, 0).setScale(30, 30)//.setAngle(45);
        let box_5 = this.scene.add.image(320, 1325, 'white').setOrigin(0.5, 0).setScale(30, 30)//.setAngle(-50);
        let box_6 = this.scene.add.image(390, 1280, 'white').setOrigin(0.5, 0).setScale(30, 30)//.setAngle(-50);
        //--------------------------------------  
        leftBranchObstacleGroupOne.add([
            L_Brunch_obstacles_1,
            box_1,
            box_2,
            box_3,
            box_4,
            box_5,
            box_6
        ])

        this.leftCollidingArray.push(box_1);
        this.leftCollidingArray.push(box_2);
        this.leftCollidingArray.push(box_3);
        this.leftCollidingArray.push(box_4);
        this.leftCollidingArray.push(box_5);
        this.leftCollidingArray.push(box_6);



        let leftBranchObstacleGroupTwo = this.scene.add.container(0, 0);

        let L_Brunch_obstacles_2 = this.scene.add.image(240, 800, 'L_Brunch_obstacles_2').setOrigin(0.5, 0);
        let box_7 = this.scene.add.image(180, 880, 'white').setOrigin(0.5, 0).setScale(120, 120)//.setAngle(-15);
        let box_8 = this.scene.add.image(230, 1000, 'white').setOrigin(0.5, 0).setScale(70, 100)//.setAngle(-15);
        let box_9 = this.scene.add.image(320, 1020, 'white').setOrigin(0.5, 0).setScale(100, 70);
        let box_10 = this.scene.add.image(440, 960, 'white').setOrigin(0.5, 0).setScale(30, 120)//.setAngle(45);
        let box_11 = this.scene.add.image(440, 960, 'white').setOrigin(0.5, 0).setScale(10, 120)//.setAngle(-30);
        let box_12 = this.scene.add.image(280, 860, 'white').setOrigin(0.5, 0).setScale(20, 20)//.setAngle(30);
        let box_13 = this.scene.add.image(330, 800, 'white').setOrigin(0.5, 0).setScale(120, 10)//.setAngle(270);


        leftBranchObstacleGroupTwo.add([
            L_Brunch_obstacles_2,
            box_7,
            box_8,
            box_9,
            box_10,
            box_11,
            box_12,
            box_13
        ])


        this.leftCollidingArray.push(box_7);
        this.leftCollidingArray.push(box_8);
        this.leftCollidingArray.push(box_9);
        this.leftCollidingArray.push(box_10);
        this.leftCollidingArray.push(box_11);
        this.leftCollidingArray.push(box_12);
        this.leftCollidingArray.push(box_13);


        let leftBranchObstacleGroupThree = this.scene.add.container(0, 0);

        let L_Brunch_obstacles_3 = this.scene.add.image(300, 400, 'L_Brunch_obstacles_3').setOrigin(0.5, 0);
        let box_14 = this.scene.add.image(160, 540, 'white').setOrigin(0.5, 0).setScale(170, 70)//.setAngle(15);
        let box_15 = this.scene.add.image(275, 520, 'white').setOrigin(0.5, 0).setScale(40, 40)//.setAngle(-55);
        let box_16 = this.scene.add.image(390, 500, 'white').setOrigin(0.5, 0).setScale(170, 20)//.setAngle(180);


        leftBranchObstacleGroupThree.add([
            L_Brunch_obstacles_3,
            box_14,
            box_15,
            box_16,
        ])


        this.leftCollidingArray.push(box_14);
        this.leftCollidingArray.push(box_15);
        this.leftCollidingArray.push(box_16);

        let leftBranchObstacleGroupFour = this.scene.add.container(0, 0);

        let L_Brunch_obstacles_4 = this.scene.add.image(300, 400, 'L_Brunch_obstacles_4').setOrigin(0.5, 0);
        let box_17 = this.scene.add.image(210, 430, 'white').setOrigin(0.5, 0).setScale(170, 10)//.setAngle(-160);
        let box_18 = this.scene.add.image(270, 490, 'white').setOrigin(0.5, 0).setScale(20, 210)//.setAngle(270);
        let box_19 = this.scene.add.image(200, 750, 'white').setOrigin(0.5, 0).setScale(30, 30)//.setAngle(-60);


        leftBranchObstacleGroupFour.add([
            L_Brunch_obstacles_4,
            box_17,
            box_18,
            box_19
        ])

        this.leftCollidingArray.push(box_17);
        this.leftCollidingArray.push(box_18);
        this.leftCollidingArray.push(box_19);


        let leftBranchObstacleGroupFive = this.scene.add.container(0, 0);

        let L_Brunch_obstacles_5 = this.scene.add.image(300, 400, 'L_Brunch_obstacles_5').setOrigin(0.5, 0);
        let box_20 = this.scene.add.image(320, 570, 'white').setOrigin(0.5, 0).setScale(30, 30);
        let box_21 = this.scene.add.image(300, 820, 'white').setOrigin(0.5, 0).setScale(30, 30);
        let box_i = this.scene.add.image(250, 450, 'white').setOrigin(0.5, 0).setScale(30, 30);
        let box_ii = this.scene.add.image(380, 660, 'white').setOrigin(0.5, 0).setScale(30, 30);
        let box_iii = this.scene.add.image(380, 760, 'white').setOrigin(0.5, 0).setScale(30, 30);
        let box_iv = this.scene.add.image(260, 890, 'white').setOrigin(0.5, 0).setScale(30, 30);
        leftBranchObstacleGroupFive.add([
            L_Brunch_obstacles_5,
            box_20,
            box_21,
            box_i,
            box_ii,
            box_iii,
            box_iv
        ])


        this.leftCollidingArray.push(box_20);
        this.leftCollidingArray.push(box_21);
        this.leftCollidingArray.push(box_i);
        this.leftCollidingArray.push(box_ii);
        this.leftCollidingArray.push(box_iii);
        this.leftCollidingArray.push(box_iv);


        let leftBranchObstacleGroupSix = this.scene.add.container(0, 0);

        let L_Brunch_obstacles_6 = this.scene.add.image(300, 400, 'L_Brunch_obstacles_6').setOrigin(0.5, 0);
        let box_22 = this.scene.add.image(270, 450, 'white').setOrigin(0.5, 0).setScale(40, 40)//.setAngle(-25);
        let box_x = this.scene.add.image(320, 410, 'white').setOrigin(0.5, 0).setScale(30, 30)//.setAngle(-25);
        let box_x1 = this.scene.add.image(380, 410, 'white').setOrigin(0.5, 0).setScale(30, 30)//.setAngle(-25);

        leftBranchObstacleGroupSix.add([
            L_Brunch_obstacles_6,
            box_22,
            box_x,
            box_x1
        ])


        this.leftCollidingArray.push(box_22);
        this.leftCollidingArray.push(box_x);
        this.leftCollidingArray.push(box_x1);

        let leftBranchObstacleGroupSeven = this.scene.add.container(0, 0);

        let L_Brunch_obstacles_7 = this.scene.add.image(300, 400, 'L_Brunch_obstacles_7').setOrigin(0.5, 0);
        let box_23 = this.scene.add.image(230, 460, 'white').setOrigin(0.5, 0).setScale(40, 40)//.setAngle(25);
        let box_24 = this.scene.add.image(380, 520, 'white').setOrigin(0.5, 0).setScale(100, 30)

        let box_25 = this.scene.add.image(430, 530, 'white').setOrigin(0.5, 0).setScale(10, 100)//.setAngle(55)
        let box_26 = this.scene.add.image(260, 585, 'white').setOrigin(0.5, 0).setScale(25, 35)//.setAngle(-30)

        leftBranchObstacleGroupSeven.add([
            L_Brunch_obstacles_7,
            box_23,
            box_24,
            box_25,
            box_26
        ]);


        this.leftCollidingArray.push(box_23);
        this.leftCollidingArray.push(box_24);
        this.leftCollidingArray.push(box_25);
        this.leftCollidingArray.push(box_26);



        let leftBranchObstacleGroupEight = this.scene.add.container(0, 0);

        let L_Brunch_obstacles_8 = this.scene.add.image(300, 400, 'L_Brunch_obstacles_8').setOrigin(0.5, 0);
        let box_27 = this.scene.add.image(260, 560, 'white').setOrigin(0.5, 0).setScale(40, 40)//.setAngle(-25);
        let box_28 = this.scene.add.image(360, 470, 'white').setOrigin(0.5, 0).setScale(20, 30);
        let box_29 = this.scene.add.image(380, 410, 'white').setOrigin(0.5, 0).setScale(20, 30);

        let box_v = this.scene.add.image(330, 500, 'white').setOrigin(0.5, 0).setScale(40, 40)//.setAngle(-25); 

        leftBranchObstacleGroupEight.add([
            L_Brunch_obstacles_8,
            box_27,
            box_28,
            box_29,
            box_v
        ]);

        this.leftCollidingArray.push(box_27);
        this.leftCollidingArray.push(box_28);
        this.leftCollidingArray.push(box_29);
        this.leftCollidingArray.push(box_v);


        let leftBranchObstacleGroupNine = this.scene.add.container(0, 0);
        let L_Brunch_obstacles_9 = this.scene.add.image(300, 400, 'L_Brunch_obstacles_9').setOrigin(0.5, 0);

        let box_30 = this.scene.add.image(260, 430, 'white').setOrigin(0.5, 0).setScale(150, 10)//.setAngle(-25);
        let box_31 = this.scene.add.image(320, 470, 'white').setOrigin(0.5, 0).setScale(10, 190)//.setAngle(-25);
        let box_32 = this.scene.add.image(370, 660, 'white').setOrigin(0.5, 0).setScale(100, 10)//.setAngle(-25);
        let box_33 = this.scene.add.image(350, 750, 'white').setOrigin(0.5, 0).setScale(40, 40)//.setAngle(-35);

        leftBranchObstacleGroupNine.add([
            L_Brunch_obstacles_9,
            box_30,
            box_31,
            box_32,
            box_33
        ])


        this.leftCollidingArray.push(box_30);
        this.leftCollidingArray.push(box_31);
        this.leftCollidingArray.push(box_32);
        this.leftCollidingArray.push(box_33);


        let leftBranchObstacleGroupTen = this.scene.add.container(0, 0);
        let L_Brunch_obstacles_10 = this.scene.add.image(300, 400, 'L_Brunch_obstacles_10').setOrigin(0.5, 0);
        leftBranchObstacleGroupTen.add(L_Brunch_obstacles_10);
        this.leftCollidingArray.push(L_Brunch_obstacles_10);

        let leftBranchObstacleGroupEleven = this.scene.add.container(0, 0);
        let L_Brunch_obstacles_11 = this.scene.add.image(300, 400, 'L_Brunch_obstacles_11').setOrigin(0.5, 0);
        leftBranchObstacleGroupEleven.add(L_Brunch_obstacles_11);
        this.leftCollidingArray.push(L_Brunch_obstacles_11);


        let leftBranchObstacleGroupTwelve = this.scene.add.container(0, 0);
        let L_Brunch_obstacles_12 = this.scene.add.image(300, 400, 'L_Brunch_obstacles_12').setOrigin(0.5, 0);
        leftBranchObstacleGroupTwelve.add(L_Brunch_obstacles_12);
        this.leftCollidingArray.push(L_Brunch_obstacles_12);



        let leftBranchObstacleGroupThirteen = this.scene.add.container(0, 0);
        let L_Brunch_obstacles_13 = this.scene.add.image(300, 400, 'L_Brunch_obstacles_13').setOrigin(0.5, 0);
        leftBranchObstacleGroupThirteen.add(L_Brunch_obstacles_13);
        this.leftCollidingArray.push(L_Brunch_obstacles_13);



        let leftBranchObstacleGroupForteen = this.scene.add.container(0, 0);
        let L_Brunch_obstacles_14 = this.scene.add.image(300, 400, 'L_Brunch_obstacles_14').setOrigin(0.5, 0);
        leftBranchObstacleGroupForteen.add(L_Brunch_obstacles_14);
        this.leftCollidingArray.push(L_Brunch_obstacles_14);



        let leftBranchObstacleGroupFifteen = this.scene.add.container(0, 0);
        let L_Brunch_obstacles_15 = this.scene.add.image(300, 400, 'L_Brunch_obstacles_15').setOrigin(0.5, 0);
        leftBranchObstacleGroupFifteen.add(L_Brunch_obstacles_15);
        this.leftCollidingArray.push(L_Brunch_obstacles_15);




        this.leftArray.push(leftBranchObstacleGroupOne);
        this.leftArray.push(leftBranchObstacleGroupTwo);
        this.leftArray.push(leftBranchObstacleGroupThree);
        this.leftArray.push(leftBranchObstacleGroupFour);
        this.leftArray.push(leftBranchObstacleGroupFive);
        this.leftArray.push(leftBranchObstacleGroupSix);
        this.leftArray.push(leftBranchObstacleGroupSeven);
        this.leftArray.push(leftBranchObstacleGroupEight);
        this.leftArray.push(leftBranchObstacleGroupNine);

        this.leftArray.push(leftBranchObstacleGroupTen);
        this.leftArray.push(leftBranchObstacleGroupEleven);
        this.leftArray.push(leftBranchObstacleGroupTwelve);
        this.leftArray.push(leftBranchObstacleGroupThirteen);
        this.leftArray.push(leftBranchObstacleGroupForteen);
        this.leftArray.push(leftBranchObstacleGroupFifteen);


        this.leftLastIndex = this.leftArray.length - 1;


        for (let i = 0; i < this.leftArray.length; i++) {
            if (i < 9) {

                for (let j = 1; j < this.leftArray[i].list.length; j++) {
                    this.leftArray[i].list[j].alpha = 0;
                    this.scene.physics.add.existing(this.leftArray[i].list[j]);
                    this.leftArray[i].list[j].body.setMass(5);
                    this.leftArray[i].list[j].body.allowGravity = false;
                    this.leftArray[i].list[j].body.immovable = true;
                }
            }
            else {
                this.scene.physics.add.existing(this.leftArray[i].list[0]);
                this.leftArray[i].list[0].body.allowGravity = false;
                this.leftArray[i].list[0].body.immovable = true;
            }
        }

        //###################################################################################################################
        //##########################$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@##################
        //***************************************************************************************************************#

        this.SetPositionOfLeftBranches(this.leftArray);

    }





    SetPositionOfLeftBranches(_leftArray) {
        let gapY = this.GetRandomValue(Math.floor(Constant.game.config.width / 2.7), Math.floor(Constant.game.config.height / 2.7428))
        for (let i = 0; i < _leftArray.length; i++) {
            if (i == 0) {
                _leftArray[i].setPosition(0, -Math.floor(Constant.game.config.height / 0.8));
            }
            else if (i == 1) {
                _leftArray[i].setPosition(0, _leftArray[i - 1].y - _leftArray[i].list[0].height);
                // console.log(_leftArray[i - 1].y - _leftArray[i].height)
            }
            else if (i == 2) {
                _leftArray[i].setPosition(-Math.round(Constant.game.config.width / 13), _leftArray[i - 1].y - _leftArray[i].list[0].height);
                // console.log(_leftArray[i - 1].y - _leftArray[i].height)
            }
            else if (i == 3) {
                _leftArray[i].setPosition(-Math.floor(Constant.game.config.width / 9), _leftArray[i - 1].y - _leftArray[i].list[0].height);
                // console.log(_leftArray[i - 1].y - _leftArray[i].height)
            }
            else if (i == 4) {
                _leftArray[i].setPosition(-Math.floor(Constant.game.config.widths / 6.75), _leftArray[i - 1].y - _leftArray[i].list[0].height);
                // console.log(_leftArray[i])
            }
            else if (i == 5) {
                _leftArray[i].setPosition(-Math.floor(Constant.game.config.widths / 6.75), _leftArray[i - 1].y - _leftArray[i].list[0].height);
                // console.log(_leftArray[i - 1].y - _leftArray[i].height)
            }
            else if (i == 6) {
                _leftArray[i].setPosition(-Math.floor(Constant.game.config.widths / 6.75), _leftArray[i - 1].y - _leftArray[i].list[0].height);
                // console.log(_leftArray[i - 1].y - _leftArray[i].height)
            }
            else if (i == 7) {
                _leftArray[i].setPosition(-Math.floor(Constant.game.config.widths / 7.71), _leftArray[i - 1].y - _leftArray[i].list[0].height);
                // console.log(_leftArray[i - 1].y - _leftArray[i].height)
            }
            else if (i == 8) {
                _leftArray[i].setPosition(-Math.floor(Constant.game.config.widths / 6.75), _leftArray[i - 1].y - _leftArray[i].list[0].height);
                // console.log(_leftArray[i - 1].y - _leftArray[i].height)
            }



            else if (i == 9) {
                _leftArray[i].setPosition(-Constant.game.config.height / 9.6, _leftArray[i - 1].y - _leftArray[i].list[0].height - gapY);
                // console.log(_leftArray[i - 1].y - _leftArray[i].height)
            }
            else if (i == 10) {
                _leftArray[i].setPosition(-Constant.game.config.height / 9.6, _leftArray[i - 1].y - _leftArray[i].list[0].height - gapY);
                // console.log(_leftArray[i - 1].y - _leftArray[i].height)
            }
            else if (i == 11) {
                _leftArray[i].setPosition(-Constant.game.config.height / 9.6, _leftArray[i - 1].y - _leftArray[i].list[0].height - gapY);
                // console.log(_leftArray[i - 1].y - _leftArray[i].height)
            }
            else if (i == 12) {
                _leftArray[i].setPosition(-Constant.game.config.height / 9.6, _leftArray[i - 1].y - _leftArray[i].list[0].height - gapY);
                // console.log(_leftArray[i - 1].y - _leftArray[i].height)
            }
            else if (i == 13) {
                _leftArray[i].setPosition(-Constant.game.config.height / 9.6, _leftArray[i - 1].y - _leftArray[i].list[0].height - gapY);
                // console.log(_leftArray[i - 1].y - _leftArray[i].height)
            }
            else if (i == 14) {
                _leftArray[i].setPosition(-Constant.game.config.height / 9.6, _leftArray[i - 1].y - _leftArray[i].list[0].height - gapY);
                // console.log(_leftArray[i - 1].y - _leftArray[i].height)
            }
        }
    }
    MoveLeftObstacle() {
        for (let i = 0; i < this.leftArray.length; i++) {
            this.leftArray[i].y += this.scene.upOffest;
            if (this.leftArray[i].y > Constant.game.config.height) {
                let gapY = this.GetRandomValue(Math.floor(Constant.game.config.width / 2.7), Constant.game.config.height / 2.74)
                this.leftArray[i].y = this.leftArray[this.leftLastIndex].y - this.leftArray[i].list[0].height - gapY;
                this.leftLastIndex = i;
            }
        }
    }
    CreateRightTwigs() {
        // // this.scene.input.on('pointerdown', this.MoveRightObstacle, this);
        // this.rightLastIndex = this.numberOfTwigsRight - 1;
        // for (let i = 1; i <= this.numberOfTwigsRight; i++) {
        //     let twigRight = this.scene.add.sprite(0, 0, 'R_Brunch_obstacles_' + i).setOrigin(0.5, 0);
        //     this.rightArray.push(twigRight);
        // }
        // // this.CreateRightBlade();
        // this.SetPositionOfRightBranches(this.rightArray)


        //####################################################################################
        //####################################################################################

        let rightBranchObstacleGroupOne = this.scene.add.container(0, 0);
        let R_Brunch_obstacles_1 = this.scene.add.image(540, 540, 'R_Brunch_obstacles_1').setOrigin(0.5, 0);
        let R_1 = this.scene.add.image(500, 630, 'white').setOrigin(0.5, 0).setScale(20, 20);
        let R_2 = this.scene.add.image(400, 710, 'white').setOrigin(0.5, 0).setScale(20, 20);
        let R_3 = this.scene.add.image(450, 660, 'white').setOrigin(0.5, 0).setScale(20, 20);
        let R_4 = this.scene.add.image(550, 660, 'white').setOrigin(0.5, 0).setScale(20, 20);
        let R_5 = this.scene.add.image(600, 710, 'white').setOrigin(0.5, 0).setScale(20, 20);

        let R_6 = this.scene.add.image(630, 800, 'white').setOrigin(0.5, 0).setScale(20, 20);

        let R_7 = this.scene.add.image(690, 710, 'white').setOrigin(0.5, 0).setScale(20, 20);
        let R_8 = this.scene.add.image(690, 820, 'white').setOrigin(0.5, 0).setScale(20, 20);


        rightBranchObstacleGroupOne.add([
            R_Brunch_obstacles_1,
            R_1,
            R_2,
            R_3,
            R_4,
            R_5,
            R_6,
            R_7,
            R_8
        ])
        this.rightArray.push(rightBranchObstacleGroupOne);

        this.leftCollidingArray.push(R_1)
        this.leftCollidingArray.push(R_2)
        this.leftCollidingArray.push(R_3)
        this.leftCollidingArray.push(R_4)
        this.leftCollidingArray.push(R_5)
        this.leftCollidingArray.push(R_6)
        this.leftCollidingArray.push(R_7)
        this.leftCollidingArray.push(R_8)



        let rightBranchObstacleGroupTwo = this.scene.add.container(0, 0);
        let R_Brunch_obstacles_2 = this.scene.add.image(540, 540, 'R_Brunch_obstacles_2').setOrigin(0.5, 0);
        let R_9 = this.scene.add.image(500, 710, 'white').setOrigin(0.5, 0).setScale(40, 40);
        let R_10 = this.scene.add.image(600, 650, 'white').setOrigin(0.5, 0).setScale(40, 40);
        let R_11 = this.scene.add.image(410, 760, 'white').setOrigin(0.5, 0).setScale(15, 15);
        let R_12 = this.scene.add.image(600, 800, 'white').setOrigin(0.5, 0).setScale(30, 30);

        rightBranchObstacleGroupTwo.add([
            R_Brunch_obstacles_2,
            R_9, R_10, R_11, R_12
        ])

        this.rightArray.push(rightBranchObstacleGroupTwo);

        this.leftCollidingArray.push(R_9)
        this.leftCollidingArray.push(R_10)
        this.leftCollidingArray.push(R_11)
        this.leftCollidingArray.push(R_12)

        let rightBranchObstacleGroupThree = this.scene.add.container(0, 0);
        let R_Brunch_obstacles_3 = this.scene.add.image(540, 540, 'R_Brunch_obstacles_3').setOrigin(0.5, 0);
        let R_13 = this.scene.add.image(400, 560, 'white').setOrigin(0.5, 0).setScale(15, 15);
        let R_14 = this.scene.add.image(480, 570, 'white').setOrigin(0.5, 0).setScale(15, 15);
        let R_15 = this.scene.add.image(520, 650, 'white').setOrigin(0.5, 0).setScale(30, 30);
        let R_16 = this.scene.add.image(500, 780, 'white').setOrigin(0.5, 0).setScale(15, 15);
        let R_17 = this.scene.add.image(620, 700, 'white').setOrigin(0.5, 0).setScale(30, 30);

        rightBranchObstacleGroupThree.add([
            R_Brunch_obstacles_3,
            R_13, R_14, R_15, R_16, R_17
        ])

        this.rightArray.push(rightBranchObstacleGroupThree);

        this.leftCollidingArray.push(R_13)
        this.leftCollidingArray.push(R_14)
        this.leftCollidingArray.push(R_15)
        this.leftCollidingArray.push(R_16)
        this.leftCollidingArray.push(R_17)


        let rightBranchObstacleGroupFour = this.scene.add.container(0, 0);
        let R_Brunch_obstacles_4 = this.scene.add.image(540, 540, 'R_Brunch_obstacles_4').setOrigin(0.5, 0);
        let R_18 = this.scene.add.image(550, 580, 'white').setOrigin(0.5, 0).setScale(20, 20);
        let R_19 = this.scene.add.image(520, 660, 'white').setOrigin(0.5, 0).setScale(20, 20);
        let R_20 = this.scene.add.image(490, 720, 'white').setOrigin(0.5, 0).setScale(30, 30);
        let R_21 = this.scene.add.image(520, 850, 'white').setOrigin(0.5, 0).setScale(25, 25);
        let R_22 = this.scene.add.image(520, 920, 'white').setOrigin(0.5, 0).setScale(30, 30);

        rightBranchObstacleGroupFour.add([
            R_Brunch_obstacles_4,
            R_18,
            R_19,
            R_20,
            R_21,
            R_22
        ])

        this.rightArray.push(rightBranchObstacleGroupFour);

        this.leftCollidingArray.push(R_18)
        this.leftCollidingArray.push(R_19)
        this.leftCollidingArray.push(R_20)
        this.leftCollidingArray.push(R_21)
        this.leftCollidingArray.push(R_22)

        let rightBranchObstacleGroupFive = this.scene.add.container(0, 0);
        let R_Brunch_obstacles_5 = this.scene.add.image(540, 540, 'R_Brunch_obstacles_5').setOrigin(0.5, 0);
        let R_23 = this.scene.add.image(325, 580, 'white').setOrigin(0.5, 0).setScale(150, 20);
        // let R_24 = this.scene.add.image(370, 580, 'white').setOrigin(0.5, 0).setScale(20, 20);
        let R_25 = this.scene.add.image(400, 630, 'white').setOrigin(0.5, 0).setScale(20, 130);
        // let R_26 = this.scene.add.image(370, 760, 'white').setOrigin(0.5, 0).setScale(25, 25);
        let R_27 = this.scene.add.image(325, 760, 'white').setOrigin(0.5, 0).setScale(150, 25);

        let R_28 = this.scene.add.image(640, 550, 'white').setOrigin(0.5, 0).setScale(325, 65);


        rightBranchObstacleGroupFive.add([
            R_Brunch_obstacles_5,
            R_23,
            // R_24,
            R_25,
            // R_26,
            R_27,
            R_28
        ])

        this.rightArray.push(rightBranchObstacleGroupFive);

        this.leftCollidingArray.push(R_23)
        // this.leftCollidingArray.push(R_24)
        this.leftCollidingArray.push(R_25)
        // this.leftCollidingArray.push(R_26)
        this.leftCollidingArray.push(R_27)
        this.leftCollidingArray.push(R_28)

        let rightBranchObstacleGroupSix = this.scene.add.container(0, 0);
        let R_Brunch_obstacles_6 = this.scene.add.image(540, 540, 'R_Brunch_obstacles_6').setOrigin(0.5, 0);
        let R_29 = this.scene.add.image(500, 620, 'white').setOrigin(0.5, 0).setScale(350, 20).setAngle(-25);
        let R_30 = this.scene.add.image(500, 820, 'white').setOrigin(0.5, 0).setScale(350, 20).setAngle(25);


        rightBranchObstacleGroupSix.add([
            R_Brunch_obstacles_6,
            R_29,
            R_30
        ])

        this.rightArray.push(rightBranchObstacleGroupSix);


        this.leftCollidingArray.push(R_29)
        this.leftCollidingArray.push(R_30)

        let rightBranchObstacleGroupSeven = this.scene.add.container(0, 0);
        let R_Brunch_obstacles_7 = this.scene.add.image(540, 540, 'R_Brunch_obstacles_7').setOrigin(0.5, 0);
        let R_31 = this.scene.add.image(300, 560, 'white').setOrigin(0.5, 0).setScale(20, 20);
        let R_32 = this.scene.add.image(390, 540, 'white').setOrigin(0.5, 0).setScale(20, 20);
        let R_33 = this.scene.add.image(450, 580, 'white').setOrigin(0.5, 0).setScale(20, 50);
        let R_34 = this.scene.add.image(520, 580, 'white').setOrigin(0.5, 0).setScale(20, 50);
        let R_35 = this.scene.add.image(600, 610, 'white').setOrigin(0.5, 0).setScale(20, 60);
        let R_36 = this.scene.add.image(680, 660, 'white').setOrigin(0.5, 0).setScale(20, 60);


        rightBranchObstacleGroupSeven.add([
            R_Brunch_obstacles_7,
            R_31,
            R_32,
            R_33,
            R_34,
            R_35,
            R_36,
        ])

        this.rightArray.push(rightBranchObstacleGroupSeven);

        this.leftCollidingArray.push(R_31)
        this.leftCollidingArray.push(R_32)
        this.leftCollidingArray.push(R_33)
        this.leftCollidingArray.push(R_34)
        this.leftCollidingArray.push(R_35)
        this.leftCollidingArray.push(R_36)

        let rightBranchObstacleGroupEight = this.scene.add.container(0, 0);
        let R_Brunch_obstacles_8 = this.scene.add.image(540, 540, 'R_Brunch_obstacles_8').setOrigin(0.5, 0);
        let R_37 = this.scene.add.image(400, 590, 'white').setOrigin(0.5, 0).setScale(20, 20);
        let R_38 = this.scene.add.image(475, 620, 'white').setOrigin(0.5, 0).setScale(20, 20);
        let R_39 = this.scene.add.image(550, 620, 'white').setOrigin(0.5, 0).setScale(20, 20);
        let R_40 = this.scene.add.image(570, 560, 'white').setOrigin(0.5, 0).setScale(20, 20);
        let R_41 = this.scene.add.image(560, 700, 'white').setOrigin(0.5, 0).setScale(60, 20);
        let R_42 = this.scene.add.image(660, 690, 'white').setOrigin(0.5, 0).setScale(55, 55);


        rightBranchObstacleGroupEight.add([
            R_Brunch_obstacles_8,
            R_37,
            R_38,
            R_39,
            R_40,
            R_41,
            R_42,
        ])

        this.rightArray.push(rightBranchObstacleGroupEight);


        this.leftCollidingArray.push(R_37)
        this.leftCollidingArray.push(R_38)
        this.leftCollidingArray.push(R_39)
        this.leftCollidingArray.push(R_40)
        this.leftCollidingArray.push(R_41)
        this.leftCollidingArray.push(R_42)

        let rightBranchObstacleGroupNine = this.scene.add.container(0, 0);
        let R_Brunch_obstacles_9 = this.scene.add.image(540, 540, 'R_Brunch_obstacles_9').setOrigin(0.5, 0);
        let R_43 = this.scene.add.image(380, 670, 'white').setOrigin(0.5, 0).setScale(25, 25);
        let R_44 = this.scene.add.image(455, 630, 'white').setOrigin(0.5, 0).setScale(25, 25);
        let R_45 = this.scene.add.image(550, 670, 'white').setOrigin(0.5, 0).setScale(25, 25);
        let R_46 = this.scene.add.image(530, 570, 'white').setOrigin(0.5, 0).setScale(25, 25);
        let R_47 = this.scene.add.image(620, 570, 'white').setOrigin(0.5, 0).setScale(60, 20);
        let R_48 = this.scene.add.image(640, 690, 'white').setOrigin(0.5, 0).setScale(20, 20);


        rightBranchObstacleGroupNine.add([
            R_Brunch_obstacles_9,
            R_43,
            R_44,
            R_45,
            R_46,
            R_47,
            R_48,
        ])


        this.rightArray.push(rightBranchObstacleGroupNine);

        this.leftCollidingArray.push(R_43)
        this.leftCollidingArray.push(R_44)
        this.leftCollidingArray.push(R_45)
        this.leftCollidingArray.push(R_46)
        this.leftCollidingArray.push(R_47)
        this.leftCollidingArray.push(R_48)


        let rightBranchObstacleGroupTen = this.scene.add.container(0, 0);
        let R_Brunch_obstacles_10 = this.scene.add.image(540, 540, 'R_Brunch_obstacles_10').setOrigin(0.5, 0);
        let R_49 = this.scene.add.image(440, 845, 'white').setOrigin(0.5, 0).setScale(25, 25);
        let R_50 = this.scene.add.image(480, 980, 'white').setOrigin(0.5, 0).setScale(20, 20);
        let R_51 = this.scene.add.image(485, 1050, 'white').setOrigin(0.5, 0).setScale(20, 20);
        let R_52 = this.scene.add.image(630, 570, 'white').setOrigin(0.5, 0).setScale(20, 280).setAngle(20);
        let R_53 = this.scene.add.image(540, 1000, 'white').setOrigin(0.5, 0).setScale(10, 280).setAngle(-20);


        rightBranchObstacleGroupTen.add([
            R_Brunch_obstacles_10,
            R_49,
            R_50,
            R_51,
            R_52,
            R_53,
        ]);




        this.leftCollidingArray.push(R_49)
        this.leftCollidingArray.push(R_50)
        this.leftCollidingArray.push(R_51)
        this.leftCollidingArray.push(R_52)
        this.leftCollidingArray.push(R_53)


        this.rightArray.push(rightBranchObstacleGroupTen);
        this.rightLastIndex = this.rightArray.length - 1;

        for (let i = 0; i < this.rightArray.length; i++) {
            for (let j = 1; j < this.rightArray[i].list.length; j++) {
                this.rightArray[i].list[j].alpha = 0;
                this.scene.physics.add.existing(this.rightArray[i].list[j]);
                this.rightArray[i].list[j].body.allowGravity = false;
                this.rightArray[i].list[j].body.immovable = true;
            }
        }
        this.SetPositionOfRightBranches(this.rightArray);

        for (let branches of this.leftCollidingArray) {
            branches.body.setBounce(0);
        }
    }
    GetRandomValue(_min, _max) {
        let random = Math.floor(Math.random() * (_max - _min) + _min);
        return random;
    }
    CreateRightBlade() {
        let rightBladeContainer = this.scene.add.container(0, 0);
        let bladeBase = this.scene.add.image(0, 0, 'blade_base').setOrigin(0.5);
        let bladeThree = this.scene.add.image(-190, 0, 'blade_3').setOrigin(0.5);

        this.scene.physics.add.existing(bladeThree);
        bladeThree.body.setBounce(0.2);
        bladeThree.body.setCircle(Math.floor(Constant.game.consfig.width / 8));
        bladeThree.body.allowGravity = false;
        bladeThree.body.immovable = true;
        this.wheelArray.push(bladeThree);

        rightBladeContainer.add(bladeBase);
        rightBladeContainer.add(bladeThree);

        this.rightArray.push(rightBladeContainer);

    }
    SetPositionOfRightBranches(_rightArray) {
        for (let i = 0; i < _rightArray.length; i++) {
            let gapX = this.GetRandomValue(Math.floor(Constant.game.config.width / 1.542), Math.floor(Constant.game.config.height / 1.92))
            if (i == 0) {
                _rightArray[i].setPosition(Math.floor(Constant.game.config.width / 2.7), -Math.floor(Constant.game.config.height / 1.28));
            }
            else if (i == 1) {
                _rightArray[i].setPosition(Math.floor(Constant.game.config.width / 2.7), _rightArray[i - 1].y - _rightArray[i].list[0].height);
            }
            else if (i == 2) {
                _rightArray[i].setPosition(Math.floor(Constant.game.config.width / 2.7), _rightArray[i - 1].y - _rightArray[i].list[0].height);
            }
            else if (i == 3) {
                _rightArray[i].setPosition(Math.floor(Constant.game.config.width / 2.2), _rightArray[i - 1].y - _rightArray[i].list[0].height);
            }
            else if (i == 4) {
                _rightArray[i].setPosition(Math.floor(Constant.game.config.width / 2.6), _rightArray[i - 1].y - _rightArray[i].list[0].height);
                // console.log('_rightArray[i] : ', _rightArray[i])
            }
            else if (i == 5) {
                _rightArray[i].setPosition(Math.floor(Constant.game.config.width / 2.6), _rightArray[i - 1].y - _rightArray[i].list[0].height);
            }
            else if (i == 6) {
                _rightArray[i].setPosition(Math.floor(Constant.game.config.width / 2.6), _rightArray[i - 1].y - _rightArray[i].list[0].height);
            }
            else if (i == 7) {
                _rightArray[i].setPosition(Math.floor(Constant.game.config.width / 2.7), _rightArray[i - 1].y - _rightArray[i].list[0].height);
            }
            else if (i == 8) {
                _rightArray[i].setPosition(Math.floor(Constant.game.config.width / 2.7), _rightArray[i - 1].y - _rightArray[i].list[0].height);
            }
            else if (i == 9) {
                _rightArray[i].setPosition(Math.floor(Constant.game.config.width / 2.6), _rightArray[i - 1].y - _rightArray[i].list[0].height);
            }
        }
    }
    MoveRightObstacle() {

        for (let i = 0; i < this.rightArray.length; i++) {
            this.rightArray[i].y += this.scene.upOffest;
            if (this.rightArray[i].y > Math.floor(Constant.game.config.height)) {
                // let gapX = this.GetRandomValue(700, 1000)
                this.rightArray[i].y = this.rightArray[this.rightLastIndex].y - this.rightArray[i].list[0].height;
                this.rightLastIndex = i;
            }
        }
    }

}
export default BranchesTwig;