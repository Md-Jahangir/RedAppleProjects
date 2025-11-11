import { SoundManager } from "../SoundManager.js";
import { Global } from "./Global.js";

class DragModule {
    constructor(scene, _elementsData) {
        this.scene = scene;
        this.staticImageArray = [];
        this.descriptionArray = [];
        this.optionArray = [];
        this.optionPreviousPosX = 0;
        this.optionPreviousPosY = 0;
        this.matchedOptionIndex = null;
        this.emptyContainerIndex = null;
        this.overlapResult = null;

        this.CreateDragModule(_elementsData);

        this.scene.game.events.on("evtShowResult", this.OnShowResult, this);
        console.log("DragModule")
    }

    CreateDragModule(_elementsData) {
        for (let i = 0; i < _elementsData.length; i++) {
            Global.SetCorrectAnswerData(_elementsData[i].answer);

            this.scene.uiPanel.SetQuestionFromServer(_elementsData[i].question);

            let imageLength = _elementsData[i].imageUrl.length;
            for (let j = 0; j < imageLength; j++) {
                let imageXPos = 522 + (j * 435)
                let imageYPos = 375;
                this.CreateImagePart(imageXPos, imageYPos, _elementsData[i].imageUrl[j], j);
            }

            let descriptionLength = _elementsData[i].descriptionYear.length;
            for (let j = 0; j < descriptionLength; j++) {
                let imageXPos = 522 + (j * 435)
                let imageYPos = 580;
                this.CreateDescriptionPart(imageXPos, imageYPos, _elementsData[i].descriptionYear[j], _elementsData[i].description[j], j);
            }

            let optionDataLength = _elementsData[i].options.length;
            for (let j = 0; j < optionDataLength; j++) {
                let imageXPos = 430 + (j * 350)
                let imageYPos = 775;
                this.CreateOptionPart(imageXPos, imageYPos, _elementsData[i].options[j], j);
            }
        }
    }

    CreateImagePart(_xPos, _yPos, _imageData, _index) {
        let imageContainer = this.scene.add.container(_xPos, _yPos);
        this.scene.load.image('drag_static_image_' + _index, _imageData);
        this.scene.load.start();
        setTimeout(() => {
            let image = this.scene.add.image(0, 0, 'drag_static_image_' + _index).setOrigin(0.5);
            imageContainer.add([image]);
            let tweenDescriptionAnimationDelay = 200;
            let tweenAnimationDelay = 800;
            this.TweenOptionButton(this.descriptionArray, tweenDescriptionAnimationDelay);
            this.TweenOptionButton(this.optionArray, tweenAnimationDelay);
        }, 1000);
        this.staticImageArray.push(imageContainer);
    }

    CreateDescriptionPart(_xPos, _yPos, _descriptionYear, _description, _index) {
        let descriptionContainer = this.scene.add.container(_xPos, _yPos);
        // let descriptionShadow = this.scene.add.image(0, 0, 'pair_matching_correct_ans_shadow').setOrigin(0.5);
        let descriptionShadow = this.scene.add.image(0, 10, 'pair_matching_correct_ans_shadow').setOrigin(0.5).setScale(1.05, 1.05);
        descriptionShadow.setVisible(false);
        let textBase = this.scene.add.image(0, 0, 'drag_module_description_base').setOrigin(0.5);
        descriptionContainer.name = _index;
        let descriptionYearTextStyle = { fontFamily: 'Rubik_Medium', fontSize: '25px', fill: '#3A3843', align: 'center', wordWrap: { width: 278, height: 415, x: 261, y: 345 } };
        let descriptionYearText = this.scene.add.text(0, -40, _descriptionYear, descriptionYearTextStyle).setOrigin(0.5, 0.5);
        let descriptionTextStyle = { fontFamily: 'Rubik_Medium', fontSize: '20px', fill: '#3A3843', align: 'center', wordWrap: { width: 308, height: 56, x: 368, y: 563 } };
        let descriptionText = this.scene.add.text(0, 8, _description, descriptionTextStyle).setOrigin(0.5, 0.5);
        let questionIcon = this.scene.add.image(0, 5, 'question_icon').setOrigin(0.5);

        let hintTextStyle = { fontFamily: 'Rubik_Medium', fontSize: '20px', fill: '#ff0000', align: 'center', wordWrap: { width: 308, height: 56, x: 368, y: 563 } };
        let hintText = this.scene.add.text(0, 45, "Drag the right option here", hintTextStyle).setOrigin(0.5, 0.5);


        descriptionContainer.add([descriptionShadow, textBase, descriptionYearText, descriptionText, questionIcon, hintText]);
        this.descriptionArray.push(descriptionContainer);

        if (_description == "") {
            descriptionText.setVisible(false);
            hintText.setVisible(true);
            questionIcon.setVisible(true);
            this.emptyContainerIndex = _index;
        } else {
            descriptionText.setVisible(true);
            hintText.setVisible(false);
            questionIcon.setVisible(false);
        }
    }


    CreateOptionPart(_xPos, _yPos, _optionData, _index) {
        // console.log("CreateOptionPart",_optionData);
        let optionContainer = this.scene.add.container(_xPos, _yPos);
        optionContainer.name = _index;
        let optionBase = this.scene.add.image(0, 0, 'pair_matching_option_base').setOrigin(0.5);
        let optionTextStyle = { fontFamily: 'Rubik_Medium', fontSize: '26px', fill: '#3A3843', fontStyle: 'bold', align: 'center', wordWrap: { width: 278, height: 415, x: 261, y: 345 } };
        let optionDataText = this.scene.add.text(0, 0, _optionData, optionTextStyle).setOrigin(0.5, 0.5);

        optionContainer.add([optionBase, optionDataText]);
        optionContainer.setSize(optionBase.displayWidth, optionBase.displayHeight);
        optionContainer.setInteractive({ useHandCursor: 'true' });

        optionContainer.on('pointerdown', (pointer, x, y, event) => this.OnOptionButtonPressed(optionContainer), this);

        this.scene.input.setDraggable(optionContainer);
        this.scene.input.on('drag', function(pointer, optionContainer, dragX, dragY) {
            optionContainer.x = dragX;
            optionContainer.y = dragY;
            this.overlapResult = this.CheckOverlapBetweenSprite(optionContainer.list[1], this.descriptionArray[this.emptyContainerIndex].list[1]);
        }, this);

        this.scene.input.on('dragend', function(pointer, optionContainer) {
            if (this.overlapResult) {
                this.overlapResult = false;
                optionContainer.list[1].setVisible(false);
                this.DisableAllImageAndText();
                this.SetTheDragedTextToEmptyBlock(optionContainer);
                this.DeactiveDraggedObject(optionContainer);
                this.scene.uiPanel.ShowCheckButton();
                this.CheckCorrectOrWrongAnswer();
            } else {}
            optionContainer.list[0].setVisible(true);
            optionContainer.x = this.optionPreviousPosX;
            optionContainer.y = this.optionPreviousPosY;
        }, this);

        this.optionArray.push(optionContainer);

        // console.log('OptionArray',this.optionArray);
        this.SetScaleToZero();
    }
    ClearOptionText(){

    }

    OnOptionButtonPressed(_seletedContainer) {
        SoundManager.PlayButtonClickSound();
        _seletedContainer.list[0].setVisible(false);
        _seletedContainer.setDepth(2);
        this.optionPreviousPosX = _seletedContainer.x;
        this.optionPreviousPosY = _seletedContainer.y;
    }

    SetTheDragedTextToEmptyBlock(_selectedObj) {
        this.descriptionArray[this.emptyContainerIndex].list[3].setVisible(true);
        this.descriptionArray[this.emptyContainerIndex].list[4].setVisible(false);
        this.descriptionArray[this.emptyContainerIndex].list[5].setVisible(false);
        this.descriptionArray[this.emptyContainerIndex].list[3].setText(_selectedObj.list[1].text);
        this.descriptionArray[this.emptyContainerIndex].list[3].setFontSize('28px');
    }

    DeactiveDraggedObject(_obj) {
        _obj.disableInteractive();
        _obj.list[1].setVisible(false);
        _obj.list[0].setAlpha(0.3);
    }

    CheckCorrectOrWrongAnswer() {
        if (this.descriptionArray[this.emptyContainerIndex].list[3].text.match(Global.GetCorrectAnswerData())) {
            this.scene.isCorrect = true;
        } else {
            this.scene.isCorrect = false;
        }
    }

    CheckOverlapBetweenSprite(spriteA, spriteB) {
        let boundsA = spriteA.getBounds();
        let boundsB = spriteB.getBounds();
        return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
    }

    OnShowResult() {
        // console.log("show result of Drag module");
        this.DisableAllOptionButton();
        if (this.scene.isCorrect) {
            SoundManager.PlayCorrectAnswerSound();
            this.scene.uiPanel.SetMessageAsPerAnswer('right_icon', Global.GetCorrectAnswerMessage(), '#76b750');
            this.ShowWinShadow();
            this.SetColorOfSeletedObject(0x98d873);
            this.PlayCorrectAnswerEffect(this.descriptionArray, this.emptyContainerIndex);
            this.scene.ShowWinEffect(this.descriptionArray[this.emptyContainerIndex].x, this.descriptionArray[this.emptyContainerIndex].y, 1);
            this.scene.uiPanel.PlayCharacterRightAnswerAnimation();
        } else {
            SoundManager.PlayWrongAnswerSound();
            this.scene.uiPanel.SetMessageAsPerAnswer('wrong_icon', Global.GetWrongAnswerMessage(), '#ff5d5d');
            this.SetColorOfSeletedObject(0xeb2f06);
            this.PlayWrongAnswerEffect(this.descriptionArray, this.emptyContainerIndex);
            this.scene.uiPanel.PlayCharacterWrongAnswerAnimation();
        }
    }

    SetScaleToZero() {
        for (let i = 0; i < this.optionArray.length; i++) {
            this.optionArray[i].setScale(0);
        }
        for (let i = 0; i < this.descriptionArray.length; i++) {
            this.descriptionArray[i].setScale(0);
        }
    }

    TweenOptionButton(_buttonArray, _delayTime) {
        this.scene.tweens.add({
            targets: _buttonArray[0],
            scaleX: 1,
            scaleY: 1,
            ease: 'Quad.easeInOut',
            duration: _delayTime,
            callbackScope: this,
            onComplete: function(tween) {
                this.scene.tweens.add({
                    targets: _buttonArray[1],
                    scaleX: 1,
                    scaleY: 1,
                    ease: 'Quad.easeInOut',
                    duration: 300,
                    callbackScope: this,
                    onComplete: function(tween) {
                        this.scene.tweens.add({
                            targets: _buttonArray[2],
                            scaleX: 1,
                            scaleY: 1,
                            ease: 'Quad.easeInOut',
                            duration: 300,
                            callbackScope: this,
                            onComplete: function(tween) {
                                this.scene.tweens.add({
                                    targets: _buttonArray[3],
                                    scaleX: 1,
                                    scaleY: 1,
                                    ease: 'Quad.easeInOut',
                                    duration: 300,
                                    callbackScope: this,
                                    onComplete: function(tween) {

                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }

    PlayCorrectAnswerEffect(_selectedArray, _index) {
        this.scene.tweens.add({
            targets: _selectedArray[_index],
            scaleX: 1.2,
            scaleY: 1.2,
            ease: 'Quad.easeInOut',
            duration: 200,
            callbackScope: this,
            onComplete: function() {
                this.scene.tweens.add({
                    targets: _selectedArray[_index],
                    scaleX: 1.0,
                    scaleY: 1.0,
                    ease: 'Quad.easeInOut',
                    duration: 200,
                });
            }
        });
    }

    PlayWrongAnswerEffect(_selectedArray, _index) {
        this.scene.tweens.add({
            targets: _selectedArray[_index],
            x: _selectedArray[_index].x + 12,
            ease: 'Quad.easeInOut',
            duration: 50,
            repeat: 3,
            yoyo: true,
            callbackScope: this,
            onComplete: function(tween) {
                this.scene.tweens.add({
                    targets: _selectedArray[_index],
                    x: _selectedArray[_index].x,
                    ease: 'Quad.easeInOut',
                    duration: 50,
                    callbackScope: this,
                });
            }
        });
    }

    DisableAllOptionButton() {
        for (let i = 0; i < this.optionArray.length; i++) {
            this.optionArray[i].removeInteractive();
        }
    }

    DisableAllImageAndText() {
        for (let i = 0; i < this.optionArray.length; i++) {
            this.optionArray[i].setInteractive();
            this.optionArray[i].list[0].setAlpha(1);
            this.optionArray[i].list[1].setVisible(true);
            this.optionArray[i].list[1].setFill('#000000');
        }
    }

    SetColorOfSeletedObject(_color) {
        this.descriptionArray[this.emptyContainerIndex].list[1].setTint(_color);
        this.descriptionArray[this.emptyContainerIndex].list[2].setFill('#ffffff');
        this.descriptionArray[this.emptyContainerIndex].list[3].setFill('#ffffff');
    }

    ShowWinShadow() {
        this.descriptionArray[this.emptyContainerIndex].list[0].setVisible(true);
    }

    HideWinShadow() {
        this.descriptionArray[this.emptyContainerIndex].list[0].setVisible(false);
    }
}

export default DragModule;