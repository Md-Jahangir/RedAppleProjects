import { Utils } from "../Utils.js";
import { SoundManager } from "../SoundManager.js";
import { Constant } from "../Constant.js";
import { Server } from "../Server.js";

class DrawHistory {

    constructor(scene) {
        this.scene = scene;
        this.howManyNumbers = 80;
        this.numberImageNumberArray = [];
        this.numberImageArray = [];
        this.drawIdArray = [];
        this.timerEvent = null;
        this.startTime = 65;
        this.mainBase;

        this.message = "PICK 3 TO 10 NUMBERS\n20 BALLS DRAWN\nFROM 80";
        this.nextDrawNumber = "78564"
        this.blinkNumberArray = ["8", "18", "35", "46", "57", "61", "73", "79"];//for testing
        this.previousDrawnNumberArray = [];
        this.usedNumbers = [];
        this.drawIdNumbers = [];
        this.drawNumbersDrawns = [];
        this.finalDrawNumber = [];
        this.first40Numbers = [];
        this.colbaseArray = [];

    }

    init() {
    }
    preload() { }

    create() {
        this.GetPrevious10BetDataFromServer();
        this.CreateBackground();
        this.CreateBase();
        // this.ShowNumbers();
        this.CreateNumberAndValue();
        this.HideDrawNumberHistory();
        // this.LoadFinalScene();
    }
    async GetPrevious10BetDataFromServer() {
        try {
            let getPrevious10Data = await Server.GetPrevious10BetData();
            if (getPrevious10Data.error) {
                console.log("API call failed with error:", getPrevious10Data.error);
            } else {
                for (let i = 0; i < getPrevious10Data.draw_id.length; i++) {
                    this.drawIdNumbers.push(getPrevious10Data.draw_id[i].draw_id);
                    this.drawNumbersDrawns.push(getPrevious10Data.numbers_drawn[i]);
                }
                for (let i = 0; i < this.drawNumbersDrawns.length; i++) {
                    for (let j = 0; j < this.drawNumbersDrawns[i].length; j++) {
                        this.finalDrawNumber.push(this.drawNumbersDrawns[i][j]);
                    }
                }
                this.SetDrawIdNumber();
                this.SetDrawNumberDrawns();
                this.SetDrawNumberDrawnsTexture();

                // this.CreateBase();
                // this.CreateNumberAndValue();
                // this.SetDrawIdNumber();
                // this.SetDrawNumberDrawns();
                // this.SetDrawNumberDrawnsTexture();
                // this.HideDrawNumberHistory();

            }
        } catch (error) {
            console.log("API call failed with errorrrr:", error);
        }
    }
    CreateBackground() {
        this.bg = this.scene.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2), "background").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
    }

    CreateBase() {
        this.mainBase = this.scene.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2), "main_base").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        let messageTextStyle = { fontFamily: 'Roboto_Medium', fontSize: '30px', fill: '#fff', fontStyle: 'normal', align: 'center', lineSpacing: 20, wordWrap: { width: Math.round(this.mainBase.width - 170) } };
        this.headingBg = this.scene.add.image(this.mainBase.x, this.mainBase.y - (300 * Constant.scaleFactor), "heading_base").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor * 1, Constant.scaleFactor);
        this.headingText = this.scene.add.text(this.mainBase.x, this.mainBase.y - (300 * Constant.scaleFactor), "Last Game", messageTextStyle).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
    };
    CreateNumberAndValue() {
        let startXPos = this.mainBase.x - (720 * Constant.scaleFactor);
        let startYPos = this.mainBase.y - (219 * Constant.scaleFactor);
        let gapX = 85;
        let gapY = 59;
        let col = 20;
        let row = 10;
        let counter = 1;
        let imageName = "";
        // let selectedImageName = "";
        for (let i = 0; i < row; i++) {
            let yPosId = startYPos - 5 + (i * gapY);
            let drawIDContainer = this.scene.add.container()
            let numberTextStyle = { fontFamily: 'Roboto_Regular', fontSize: '24px', fill: '#fff', fontStyle: 'normal', align: 'center' };
            let drawIdText = this.scene.add.text(startXPos - 180, yPosId, '', numberTextStyle).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
            let row_base = this.scene.add.image(Constant.game.config.width / 2, yPosId + 30, 'row_base').setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
            drawIDContainer.add([drawIdText,row_base]);
            this.drawIdArray.push(drawIDContainer);
            for (let j = 0; j < col; j++) {
                if (counter > 100) {
                    imageName = "ball_base_type_2";
                } else {
                    imageName = "ball_base_type_1";
                }
                let xPos = startXPos + (j * gapX);
                let yPos = startYPos + (i * gapY);
                let ballContainer = this.scene.add.container();
                let ballImg = this.scene.add.image(xPos, yPos, imageName).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);


                // let numberBaseTextStyle = { fontFamily: 'Roboto_Regular', fontSize: '18px', fill: '#fff', fontStyle: 'normal', align: 'center' };
                // let numberBaseText = this.scene.add.text(xPos + (35 * Constant.scaleFactor), yPos, '00', numberBaseTextStyle).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
                // console.log(this.drawNumbersDrawns[i])
                let numberTextStyle = { fontFamily: 'Roboto_Regular', fontSize: '18px', fill: '#000', fontStyle: 'normal', align: 'center' };
                let numberText = this.scene.add.text(xPos, yPos, '', numberTextStyle).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
                counter++;
                if (i == 9 && j == 10) {
                    let col_base = this.scene.add.image(Constant.game.config.width / 2 + 90, Constant.game.config.height / 2 + 30, 'col_base').setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
                    this.colbaseArray.push(col_base)
                }
                ballContainer.add([ballImg, numberText]);
                this.numberImageArray.push(ballContainer);
                // console.log('x',ballContainer.list[1].x,ballContainer.list[1].y);
                // this.numberImageNumberArray.push(numberText);
               
            }
        }
        console.log("this.NumberImageArray: ", this.numberImageArray);
        // console.log("this.NumberImageNumberArray: ", this.numberImageNumberArray);
    };

    SetDrawIdNumber() {
        for (let i = 0; i < this.drawIdArray.length; i++) {
            this.drawIdArray[i].list[0].setText(this.drawIdNumbers[i])
            // console.log('this.drawNumbersId',this.drawIdArray[i].list[0].setText(this.drawIdNumbers[i]));
        }
    }
    SetDrawNumberDrawns() {
        for (let j = 0; j < this.finalDrawNumber.length; j++) {
            this.numberImageArray[j].list[1].setText(this.finalDrawNumber[j]);
        }
    }
    SetDrawNumberDrawnsTexture() {
        for (let j = 0; j < this.finalDrawNumber.length; j++) {
            if (parseInt(this.finalDrawNumber[j]) <= 40) {
                this.numberImageArray[j].list[0].setTexture('ball_base_type_1');
            } else {
                this.numberImageArray[j].list[0].setTexture('ball_base_type_2');
            }

        }
    }

    GetRandomNumber() {

        let max = 80;
        let min = 1;
        const range = max - min + 1;
        if (this.usedNumbers.length >= range) {
            throw new Error('All possible numbers have been used.');
        }
        do {
            this.randomNumber = Math.floor(Math.random() * range) + min;
        } while (this.usedNumbers.includes(this.randomNumber));
        this.usedNumbers.push(this.randomNumber);

        return this.randomNumber;
    }

    ShowNumbers() {
        this.usedNumbers = [];
        for (let i = 0; i < 20; i++) {
            let randomNumber = this.GetRandomNumber();
            // console.log('Hotnumber', randomNumber);
            if (i < 10) {
                // this.VisibleHotNumbers(this.numberImageArray[randomNumber - 1]);
            } else {
                // this.VisibleColdNumbers(this.numberImageArray[randomNumber - 1]);
            }
        }
    }

    HideDrawNumberHistory() {
        this.bg.setVisible(false);
        this.mainBase.setVisible(false);
        this.headingBg.setVisible(false);
        this.headingText.setVisible(false);
        this.numberImageArray.forEach(element => {
            element.setVisible(false);
        });
        this.drawIdArray.forEach(element => {
            element.setVisible(false);
        });
        this.colbaseArray.forEach(element => {
            element.setVisible(false);
        });
        // this.soundOnOffButton.setVisible(false);
        // this.fullScreenButton.setVisible(false);
    }

    ShowDrawNumberHistory() {
        this.bg.setVisible(true);
        this.mainBase.setVisible(true);
        this.headingBg.setVisible(true);
        this.headingText.setVisible(true);
        this.numberImageArray.forEach(element => {
            element.setVisible(true);
        });
        this.drawIdArray.forEach(element => {
            element.setVisible(true);
        });
        this.colbaseArray.forEach(element => {
            element.setVisible(true);
        });
        this
    }
    LoadFinalScene() {
        setTimeout(() => {
            // this.scene.start("AfterDrawScene");
            // Constant.game.events.emit('onDrawHistoryCompleted');
            this.scene.drawNumberHits.ShowDrawNumberHits();
        }, 6000);
    }


    update(t, dt) {

    }

}
export default DrawHistory;