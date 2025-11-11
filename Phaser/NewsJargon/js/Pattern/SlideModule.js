import { SoundManager } from "../SoundManager.js";
import { Global } from "./Global.js";
class SlideModule {
    constructor(scene, _elementsData, _slug, _questionType) {
        this.scene = scene;
        this.messageTextContainer = null;
        this.optionArray = [];
        this.imageArray = [];
        this.imageBaseArray = [];
        this.slugId = _slug;
        this.questionType = _questionType;
        this.timer = null;
        this.clockBarGraphics = null;
        this.startAngle = -90;
        this.endAngle = -89;
        this.totalTime = null;
        this.imageCounter = 0;
        this.indexCounter = 0;
        this.optionsDataArray = [];
        this.staticData = { option1: ["Lenticular Clouds", "Framed when winds that contain enough moisture hit an obstacle. Condensation forms lenticular clouds at lower temperature "], option2: ["MS Dhoni", "Mahendra Singh Dhoni is an Indian professional cricketer "], option3: ["Last Stage Drugs", "Harmful For Body"] }
        this.CreateSlideModule(_elementsData);
        this.CreateArrowButton();
        this.scene.game.events.on("evtOnStartButtonPressed", this.OnStartButtonPressed, this);
        console.log("SlideModule", _elementsData);
    }
    CreateSlideModule(_elementsData) {
        for (let i = 0; i < _elementsData.length; i++) {
            Global.SetCorrectAnswerData(_elementsData[i].answer);
            this.scene.uiPanel.SetQuestionFromServer(_elementsData[i].question);
            for (let j = 0; j < _elementsData[i].imageUrl.length; j++) {
                let xPos = Math.round(game.config.width / 2);
                let yPos = Math.round(game.config.height / 2) - 74;
                this.CreateImagePart(xPos, yPos, j, _elementsData[i].imageUrl[j])
            }
            // this.CreateMessageHeadingText(_elementsData[i].options[0]);
            // this.CreateMessageText(_elementsData[i].options[1]);
        }
        this.CreateClockBase();
        for (let i = 0; i < _elementsData[0].options.length; i++) {
            this.optionsDataArray.push(_elementsData[0].options[i]);
        }
        this.CreateStaticMessage(this.optionsDataArray[0][1]);
        this.CreateStaticMessageHeading(this.optionsDataArray[0][0]);
        this.scene.uiPanel.HideCheckButton();
    }

    OnStartButtonPressed() {
        this.CreateTimer();
        this.scene.uiPanel.DeactiveNextButton();
        this.EnableArrowButton();
        SoundManager.PlayClockTrickingSound();
    }

    CreateImagePart(_xPos, _yPos, _index, _imageUrl) {
        // console.log(_xPos, _yPos, _index,_imageUrl)
        let iteratorXPos = _xPos + (_index * 150);
        let iteratorDepth = (3 - _index);
        let iteratorScale = (1 - (5 * 0.06));
        let iteratorAlpha;
        if (_index == 0) {
            iteratorAlpha = 1;
        } else {
            iteratorAlpha = 0.3;
        }
        let imageBase = this.scene.add.image(iteratorXPos, _yPos, 'slide_module_base').setOrigin(0.5);
        imageBase.setScale(iteratorScale);
        imageBase.setAlpha(iteratorAlpha);
        imageBase.setDepth(iteratorDepth);
        imageBase.name = _index;
        this.imageBaseArray.push(imageBase);

        let image;
        let imageKey = 'slide_image_' + _index + _imageUrl;
        this.scene.load.image(imageKey, _imageUrl);
        this.scene.load.start();
        this.scene.load.on('complete', function () {
            image = this.scene.add.image(iteratorXPos, _yPos, imageKey).setOrigin(0.5);
            // console.log(image,this.imageArray)
            image.setScale(0.3);
            image.setAlpha(iteratorAlpha);
            image.setDepth(iteratorDepth);
            let scaleToFitX = (imageBase.width / image.width).toFixed(2);
            let scaleToFitY = (imageBase.height / image.height).toFixed(2);
            // image.setScale(scaleToFitX, scaleToFitY - scaleToFitY / 4);
            console.log('scalefix', scaleToFitX, scaleToFitY -scaleToFitY/4)
            image.name = _index;
            this.imageArray.push(image);

            this.scene.uiPanel.ShowStartButton();
        }, this);
    }
    CreateStaticMessage(_text) {
        this.messageTextContainer = this.scene.add.container(Math.round(game.config.width / 2) + 260, Math.round(game.config.height / 2) + 255);
        let textBase = this.scene.add.image(0, 0, 'slide_module_description_base').setOrigin(0.5);
        let messageTextStyle = { fontFamily: 'Rubik_Medium', fontSize: '26px', fill: '#3A3843', fontStyle: 'bold', align: 'center', wordWrap: { width: 675, height: 69, x: 621, y: 745 } };
        let messageText = this.scene.add.text(0, 0, _text, messageTextStyle).setOrigin(0.5, 0.5);
        this.messageTextContainer.add([textBase, messageText]);
    }
    CreateStaticMessageHeading(_text) {
        this.messageHeadingTextContainer = this.scene.add.container(Math.round(game.config.width / 2) - 420, Math.round(game.config.height / 2) + 255);
        let textBase = this.scene.add.image(0, 0, 'slide_module_name_base').setOrigin(0.5);
        let messageHeadingTextStyle = { fontFamily: 'Rubik_Medium', fontSize: '26px', fill: '#3A3843', fontStyle: 'bold', align: 'center', wordWrap: { width: 675, height: 69, x: 621, y: 745 } };
        let messageHeadingText = this.scene.add.text(0, 0, _text, messageHeadingTextStyle).setOrigin(0.5, 0.5);
        this.messageHeadingTextContainer.add([textBase, messageHeadingText]);
    }

    MoveImageToLeft(_index) {
        if (_index < 4) {
            let leftXPos = Math.round(game.config.width / 2) - ((this.imageCounter - 1) * 150);
            // console.log(leftXPos,'===',this.imageCounter)
            let leftDepth = (_index + 1);
            // let leftScale = (1 - ((this.imageCounter - 1) * 0.12));
            let leftScale = (1 - (5 * 0.16));
            let leftAlpha = 0.3;
            // console.log("left move after depth: " , leftDepth,this.imageArray[_index],_index);

            this.imageArray[_index].setDepth(leftDepth);
            this.imageBaseArray[_index].setDepth(leftDepth);
            this.scene.tweens.add({
                targets: [this.imageArray[_index], this.imageBaseArray[_index]],
                x: leftXPos,
                ease: 'linear',
                scaleX: leftScale,
                scaleY: leftScale,
                alpha: leftAlpha,
                duration: 700,
                callbackScope: this,
                onComplete: function (tween) { }
            });
        }
    }

    MoveImageToMiddle(_index) {
        if (_index <= 4) {
            // console.log('MoveImageTomiddle', _index, this.imageCounter)
            let leftShitXPos = Math.round(game.config.width / 2);
            let shiftScale = (1-(5 * 0.14));
            let shiftDepth = _index + 3;
            let shiftAlpha = 1;
            this.imageArray[_index].setDepth(shiftDepth);
            this.imageBaseArray[_index].setDepth(shiftDepth);
            this.scene.tweens.add({
                targets: [this.imageArray[_index], this.imageBaseArray[_index]],
                delay: 0,
                x: leftShitXPos,
                ease: 'linear',
                scaleX: shiftScale,
                scaleY: shiftScale,
                alpha: shiftAlpha,
                duration: 700,
                callbackScope: this,
                onComplete: function (tween) { }
            });
        }
    }

    MoveImageToRight(_index) {
        // console.log("right _index: " + _index);
        // console.log("right this.imageCounter: " + this.imageCounter);
        if (_index >= 0) {
            let leftXPos = Math.round(game.config.width / 2) + ((_index) * 150);
            let leftDepth = (this.imageCounter - 1);
            // let rightScale = (1 - ((_index) * 0.12));
            let rightScale = (1 - ((5 * 0.16)));
            let rightAlpha = 0.3;
            // console.log("right move after depth: " + leftDepth);
            this.imageArray[_index].setDepth(leftDepth);
            this.imageBaseArray[_index].setDepth(leftDepth);
            this.scene.tweens.add({
                targets: [this.imageArray[_index], this.imageBaseArray[_index]],
                x: leftXPos,
                ease: 'linear',
                scaleX: rightScale,
                scaleY: rightScale,
                alpha: rightAlpha,
                duration: 700,
                callbackScope: this,
                onComplete: function (tween) { }
            });
        }
    }

    CreateArrowButton() {
        this.leftArrowButton = this.scene.add.image(Math.round(game.config.width / 2) - 700, Math.round(game.config.height / 2) - 75, 'arrow_inactive').setOrigin(0.5);
        this.leftArrowButton.flipX = true;
        // this.leftArrowButton.setInteractive();
        this.leftArrowButton.on('pointerdown', this.LeftArrowButtonPressed, this);
        this.leftArrowButton.on('pointerup', this.LeftArrowButtonReleased, this);

        this.rightArrowButton = this.scene.add.image(Math.round(game.config.width / 2) + 700, Math.round(game.config.height / 2) - 75, 'arrow_inactive').setOrigin(0.5);
        this.rightArrowButton.on('pointerdown', this.RightArrowButtonPressed, this);
        this.rightArrowButton.on('pointerup', this.RightArrowButtonReleased, this);
    }
    EnableArrowButton() {
        // this.leftArrowButton.setInteractive();
        // this.leftArrowButton.setTexture('arrow_active');

        this.rightArrowButton.setInteractive();
        this.rightArrowButton.setTexture('arrow_active');
    }

    LeftArrowButtonPressed() {
        // this.MoveImageToLeft(this.indexCounter);
        // this.MoveImageToMiddle(this.indexCounter + 1);
        // this.indexCounter++;
        // this.imageCounter--;
        // if (this.imageCounter == 1) {
        //     this.leftArrowButton.removeInteractive();
        //     this.leftArrowButton.setTexture('arrow_inactive');
        // } else {
        //     this.rightArrowButton.setInteractive();
        //     this.rightArrowButton.setTexture('arrow_active');
        // }

        this.MoveImageToRight(this.indexCounter);
        this.MoveImageToMiddle(this.indexCounter - 1);
        // console.log(this.scene)
        this.indexCounter--;
        this.imageCounter++;
        // console.log('counter',this.imageCounter,this.indexCounter);
        if (this.indexCounter == 2) {
            this.messageHeadingTextContainer.list[1].setText(this.optionsDataArray[2][0]);
            this.messageTextContainer.list[1].setText(this.optionsDataArray[2][1]);
        }
        if (this.indexCounter == 1) {
            this.messageHeadingTextContainer.list[1].setText(this.optionsDataArray[1][0]);
            this.messageTextContainer.list[1].setText(this.optionsDataArray[1][1]);
        }
        if (this.indexCounter == 0) {
            this.messageHeadingTextContainer.list[1].setText(this.optionsDataArray[0][0]);
            this.messageTextContainer.list[1].setText(this.optionsDataArray[0][1]);
            this.leftArrowButton.removeInteractive();
            this.leftArrowButton.setTexture('arrow_inactive');
        }
        if (this.imageCounter >= 4) {
            this.leftArrowButton.removeInteractive();
            this.leftArrowButton.setTexture('arrow_inactive');
        } else {
            this.rightArrowButton.setInteractive();
            this.rightArrowButton.setTexture('arrow_active');
        }
    }
    LeftArrowButtonReleased() {

    }
    RightArrowButtonPressed() {
        // this.MoveImageToRight(this.indexCounter);
        // this.MoveImageToMiddle(this.indexCounter - 1);
        // this.indexCounter--;
        // this.imageCounter++;
        // if (this.imageCounter >= 3) {
        //     this.rightArrowButton.removeInteractive();
        //     this.rightArrowButton.setTexture('arrow_inactive');
        // } else {
        //     this.leftArrowButton.setInteractive();
        //     this.leftArrowButton.setTexture('arrow_active');
        // }

        this.MoveImageToLeft(this.indexCounter);
        this.MoveImageToMiddle(this.indexCounter + 1);
        // console.log("right button pressd",this.staticData,this.staticData.option1);
        this.indexCounter++;
        this.imageCounter--;
        // console.log("img contr: " + this.imageCounter,this.indexCounter);
        if (this.indexCounter == 1) {
            this.messageHeadingTextContainer.list[1].setText(this.optionsDataArray[1][0]);
            this.messageTextContainer.list[1].setText(this.optionsDataArray[1][1]);
        }
        if (this.indexCounter == 2) {
            this.messageHeadingTextContainer.list[1].setText(this.optionsDataArray[2][0]);
            this.messageTextContainer.list[1].setText(this.optionsDataArray[2][1]);
            // this.rightArrowButton.removeInteractive();
            // this.rightArrowButton.setTexture('arrow_inactive');
        }
        if (this.indexCounter == 3) {
            this.messageHeadingTextContainer.list[1].setText(this.optionsDataArray[3][0]);
            this.messageTextContainer.list[1].setText(this.optionsDataArray[3][1]);
            this.rightArrowButton.removeInteractive();
            this.rightArrowButton.setTexture('arrow_inactive');
        }
        if (this.imageCounter == 1 ) {
            this.rightArrowButton.removeInteractive();
            this.rightArrowButton.setTexture('arrow_inactive');
        } else {
            this.leftArrowButton.setInteractive();
            this.leftArrowButton.setTexture('arrow_active');
        }


    }
    RightArrowButtonReleased() {

    }

    CreateMessageHeadingText(_text) {
        this.messageHeadingTextContainer = this.scene.add.container(Math.round(game.config.width / 2) - 420, Math.round(game.config.height / 2) + 255);
        let textBase = this.scene.add.image(0, 0, 'slide_module_name_base').setOrigin(0.5);
        let messageHeadingTextStyle = { fontFamily: 'Rubik_Medium', fontSize: '26px', fill: '#3A3843', fontStyle: 'bold', align: 'center', wordWrap: { width: 675, height: 69, x: 621, y: 745 } };
        let messageHeadingText = this.scene.add.text(0, 0, _text, messageHeadingTextStyle).setOrigin(0.5, 0.5);
        this.messageHeadingTextContainer.add([textBase, messageHeadingText]);
    }
    CreateMessageText(_text) {
        this.messageTextContainer = this.scene.add.container(Math.round(game.config.width / 2) + 260, Math.round(game.config.height / 2) + 255);
        let textBase = this.scene.add.image(0, 0, 'slide_module_description_base').setOrigin(0.5);
        let messageTextStyle = { fontFamily: 'Rubik_Medium', fontSize: '26px', fill: '#3A3843', fontStyle: 'bold', align: 'center', wordWrap: { width: 675, height: 69, x: 621, y: 745 } };
        let messageText = this.scene.add.text(0, 0, _text, messageTextStyle).setOrigin(0.5, 0.5);
        this.messageTextContainer.add([textBase, messageText]);
    }

    CreateClockBase() {
        let timerBase = this.scene.add.image(Math.round(game.config.width / 2) + 805, Math.round(game.config.height / 2) + 260, 'clock_icon').setOrigin(0.5);
        this.clockBarGraphics = this.scene.add.graphics();

        this.clockBarGraphics.lineStyle(45, 0xFF5D5D);
        this.clockBarGraphics.beginPath();
        this.clockBarGraphics.arc(Math.round(game.config.width / 2) + 805, Math.round(game.config.height / 2) + 266, 22, Phaser.Math.DegToRad(this.startAngle), Phaser.Math.DegToRad(this.endAngle), true);
        this.clockBarGraphics.strokePath();
    }

    CreateTimer() {
        this.imageCounter = this.imageArray.length;
        // this.totalTime = this.imageArray.length;
        // this.timer = this.scene.time.addEvent({ delay: 700 * this.imageArray.length, callback: this.UpdateTimer, callbackScope: this, loop: true });
        this.totalTime = 120;
        this.timer = this.scene.time.addEvent({ delay: 1000, callback: this.UpdateTimer, callbackScope: this, loop: true });
    }

    UpdateTimer() {
        // if (this.imageCounter < 0) {
        //     this.timer.remove();
        //     this.scene.uiPanel.ShowNextButton();
        // }

        this.clockBarGraphics.clear();
        // this.endAngle += ((360 / this.imageArray.length));
        this.endAngle += ((360 / this.totalTime));
        if (this.endAngle < 120) {
            this.clockBarGraphics.lineStyle(45, 0xFF5D5D);
            this.clockBarGraphics.beginPath();
            this.clockBarGraphics.arc(Math.round(game.config.width / 2) + 805, Math.round(game.config.height / 2) + 266, 22, Phaser.Math.DegToRad(this.startAngle), Phaser.Math.DegToRad(this.endAngle), true);
            this.clockBarGraphics.strokePath();
        } else {
            this.timer.remove();
            this.scene.uiPanel.ShowNextButton();
            SoundManager.StopClockTrickingSound();
        }

        // this.MoveImageToLeft(this.indexCounter);
        // this.MoveImageToMiddle(this.indexCounter + 1);

        // this.indexCounter++;
        // this.imageCounter--;
    }

}
export default SlideModule;