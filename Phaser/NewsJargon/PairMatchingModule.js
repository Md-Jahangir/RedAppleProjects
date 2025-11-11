import { SoundManager } from "../SoundManager.js";
import { Global } from "./Global.js";
class PairMatchingModule {
    constructor(scene, _elementsData, _slug, _questionType,_answerCount) {
        this.scene = scene;
        this.optionLeftArray = [];
        this.optionRightArray = [];
        this.slugId = _slug;
        this.answerCount = _answerCount;
        this.questionType = _questionType;
        this.selectedItemIndexArray = [];
        this.selectedItemContainerArray = [];

        this.completedLeftIndexArray = [];
        this.completedRightIndexArray = [];
        this.completedAnsArray = [];
        this.completedPairCount = 0;
        this.leftModuleCounter = 0;
        this.rightModuleCounter = 0;
        this.CreatePairMatchingModule(_elementsData, this.leftModuleCounter, this.rightModuleCounter);

        this.scene.game.events.on("evtHideMessage", this.OnHideMessage, this);
        this.scene.game.events.on("evtClearContainer", this.ClearContainer, this);
        console.log("PairMatchingModule")
    }
    CreatePairMatchingModule(_elementsData, _leftModuleCounter, _rightModuleCounter) {
        console.log('ElementsData', _elementsData);
        // this.scene.isCorrect = false;
        for (let i = 0; i < _elementsData.length; i++) {
            Global.SetCorrectAnswerData(_elementsData[i].answer);
            this.completedAnsArray = [..._elementsData[i].answer];
            console.log('thiscompletedans', this.completedAnsArray)
            this.scene.uiPanel.SetQuestionFromServer(_elementsData[i].question);
            if (this.slugId == 'm2-mtp-text-text') {
                let optionsLeftLength = _elementsData[i].opt1.length;
                for (let j = 0; j < optionsLeftLength; j++) {
                    let xPos = 605;
                    let yPos = 310 + (j * 155);
                    this.CreateLeftOptionPart(xPos, yPos, _elementsData[i].opt1[j], j);
                }
                let optionsRightLength = _elementsData[i].opt2.length;
                for (let j = 0; j < optionsRightLength; j++) {
                    let xPos = 1285;
                    let yPos = 310 + (j * 155);
                    this.CreateRightOptionPart(xPos, yPos, _elementsData[i].opt2[j], j);
                }
            }
            if (this.slugId == 'm2-mtp-img-text') {
                let optionsLeftLength = _elementsData[i].opt1.length;
                for (let j = 0; j < optionsLeftLength; j++) {
                    let xPos = 605;
                    let yPos = 310 + (j * 155);
                    _leftModuleCounter++;
                    this.CreateLeftOptionPart(xPos, yPos, _elementsData[i].opt1[j], j, _elementsData[i].imageUrl[j], _elementsData[i].imageUrl.length, _leftModuleCounter);
                }
                let optionsRightLength = _elementsData[i].opt2.length;
                for (let j = 0; j < optionsRightLength; j++) {
                    let xPos = 1285;
                    let yPos = 310 + (j * 155);
                    this.CreateRightOptionPart(xPos, yPos, _elementsData[i].opt2[j], j, _elementsData[i].imageUrl1[j], _elementsData[i].imageUrl1.length);
                }
            }
            if (this.slugId == 'm2-mtp-img-img') {
                let optionsLeftLength = _elementsData[i].opt1.length;
                for (let j = 0; j < optionsLeftLength; j++) {
                    let xPos = 605;
                    let yPos = 310 + (j * 155);
                    _leftModuleCounter++;
                    this.CreateLeftOptionPart(xPos, yPos, _elementsData[i].opt1[j], j, _elementsData[i].imageUrl[j], _elementsData[i].imageUrl.length, _leftModuleCounter);
                }
                let optionsRightLength = _elementsData[i].opt2.length;

                for (let j = 0; j < optionsRightLength; j++) {
                    let xPos = 1285;
                    let yPos = 310 + (j * 155);
                    _rightModuleCounter++;
                    this.CreateRightOptionPart(xPos, yPos, _elementsData[i].opt2[j], j, _elementsData[i].imageUrl1[j], _elementsData[i].imageUrl1.length, _rightModuleCounter);
                }
            }

        }
        this.scene.uiPanel.HideCheckButton();
    }

    //======================= Create Left option button ======================================
    CreateLeftOptionPart(_xPos, _yPos, _optionData, _index, _optionImageUrl, _optionImageLength, _moduleCounter) {
        let leftOptionContainer = this.scene.add.container(_xPos, _yPos);
        // let leftOptionShadow = this.scene.add.image(0, 0, 'pair_matching_correct_ans_shadow').setOrigin(0.5);
        let leftOptionShadow = this.scene.add.image(0, 10, 'pair_matching_correct_ans_shadow').setOrigin(0.5).setScale(1.05, 1.05);
        leftOptionShadow.setVisible(false);
        let leftOptionBase = this.scene.add.image(0, 0, 'pair_matching_option_base').setOrigin(0.5);
        leftOptionContainer.name = _index;
        leftOptionBase.setVisible(false);
        let tweenDelayTime = 0;
        if (_optionImageLength > 0) {
            // this.scene.uiPanel.Showloader();
            let imageKey = 'leftImage_' + _index + _optionImageUrl;
            this.scene.load.image(imageKey, _optionImageUrl);
            this.scene.load.start();
            this.scene.load.on('complete', () => {
                if (_moduleCounter < 5 && this.slugId != '') {
                    if (this.scene.textures.exists(imageKey)) {
                        // this.scene.uiPanel.HideLoader();
                        let imageData = this.scene.add.image(0, 0, imageKey).setOrigin(0.5);
                        console.log(imageData)
                        let scaleToFitX = (leftOptionBase.width / imageData.width).toFixed(2);
                        let scaleToFitY = (leftOptionBase.height / imageData.height).toFixed(2);
                        imageData.setScale(scaleToFitX, scaleToFitY - scaleToFitY / 4);
                        leftOptionContainer.add([leftOptionShadow, leftOptionBase, imageData]);
                        leftOptionBase.setVisible(true);
                    }
                }
            });
            tweenDelayTime = 1300;
        } else {
            leftOptionBase.setVisible(true);
            let optionTextStyle = { fontFamily: 'Rubik_Medium', fontSize: '26px', fill: '#3A3843', fontStyle: 'bold', align: 'center', wordWrap: { width: 278, height: 415, x: 261, y: 345 } };
            let optionDataText = this.scene.add.text(0, 0, _optionData, optionTextStyle).setOrigin(0.5, 0.5);
            leftOptionContainer.add([leftOptionShadow, leftOptionBase, optionDataText]);
            tweenDelayTime = 300;
        }

        leftOptionContainer.setSize(leftOptionBase.width, leftOptionBase.height);
        leftOptionContainer.setInteractive({ useHandCursor: 'true' });

        leftOptionContainer.on('pointerdown', (pointer, x, y, event) => this.OnLeftOptionButtonPressed(leftOptionContainer), this);

        leftOptionContainer.on('pointerup', (pointer, x, y, event) => this.OnLeftOptionButtonReleased(leftOptionContainer), this);

        this.optionLeftArray.push(leftOptionContainer);

        this.SetOptionButtonScaleToZero(this.optionLeftArray);
        this.TweenOptionButton(this.optionLeftArray, tweenDelayTime);
    }

    //On Left option pressed
    OnLeftOptionButtonPressed(_this) {
        this.SetColorOfOptionButtonAndText(_this.list[1], _this.list[2]);
    }

    //On left option release 
    OnLeftOptionButtonReleased(_this) {
        SoundManager.PlayButtonClickSound();
        this.DisableAllImageAndText();
        this.ClearTintOfAllOptionButtonAndText(this.optionLeftArray);
        this.SetColorOfOptionButtonAndText(_this.list[1], _this.list[2]);
        this.selectedItemContainerArray[0] = _this;

        this.selectedItemIndexArray[0] = _this.name;
        console.log('selctedleftoption', this.selectedItemIndexArray[0], this.selectedItemContainerArray[0].list[2].text)
        this.CheckMachtingPairResult();
    }

    //#############################################################

    //======================= Create Right option button ======================================
    CreateRightOptionPart(_xPos, _yPos, _optionData, _index, _optionImageUrl, _optionImageLength, _moduleCounter) {
        let rightOptionContainer = this.scene.add.container(_xPos, _yPos);
        // let rightOptionShadow = this.scene.add.image(0, 0, 'pair_matching_correct_ans_shadow').setOrigin(0.5);
        let rightOptionShadow = this.scene.add.image(0, 10, 'pair_matching_correct_ans_shadow').setOrigin(0.5).setScale(1.05, 1.05);
        rightOptionShadow.setVisible(false);
        let rightOptionBase = this.scene.add.image(0, 0, 'pair_matching_option_base').setOrigin(0.5);
        rightOptionContainer.name = _index;
        rightOptionBase.setVisible(false);
        let tweenDelayTime = 0;
        if (_optionImageLength > 0) {
            let imageKey = 'rightImage_' + _index + _optionImageUrl;
            // this.scene.uiPanel.Showloader();
            this.scene.load.image(imageKey, _optionImageUrl);
            this.scene.load.start();
            this.scene.load.on('complete', () => {
                // this.scene.uiPanel.HideLoader();
                if (_moduleCounter < 5 && this.slugId != '') {
                    if (this.scene.textures.exists(imageKey)) {
                        let imageData = this.scene.add.image(0, 0, imageKey).setScale(0.35, 0.3).setOrigin(0.5);
                        let scaleToFitX = (rightOptionBase.width / imageData.width).toFixed(2);
                        let scaleToFitY = (rightOptionBase.height / imageData.height).toFixed(2);
                        // let scaleToFit = Math.min(scaleToFitX, scaleToFitY);
                        imageData.setScale(scaleToFitX, scaleToFitY - scaleToFitY / 4)
                        rightOptionContainer.add([rightOptionShadow, rightOptionBase, imageData]);
                        rightOptionBase.setVisible(true);
                    }
                }
            });
            tweenDelayTime = 1300;
        } else {
            rightOptionBase.setVisible(true);
            let optionTextStyle = { fontFamily: 'Rubik_Medium', fontSize: '26px', fill: '#3A3843', fontStyle: 'bold', align: 'center', wordWrap: { width: 278, height: 415, x: 261, y: 345 } };
            let optionDataText = this.scene.add.text(0, 0, _optionData, optionTextStyle).setOrigin(0.5, 0.5);
            rightOptionContainer.add([rightOptionShadow, rightOptionBase, optionDataText]);
            tweenDelayTime = 300;
        }

        rightOptionContainer.setSize(rightOptionBase.width, rightOptionBase.height);
        rightOptionContainer.setInteractive({ useHandCursor: 'true' });

        rightOptionContainer.on('pointerdown', (pointer, x, y, event) => this.OnRightOptionButtonPressed(rightOptionContainer), this);
        rightOptionContainer.on('pointerup', (pointer, x, y, event) => this.OnRightOptionButtonReleased(rightOptionContainer), this);
        this.optionRightArray.push(rightOptionContainer);

        this.SetOptionButtonScaleToZero(this.optionRightArray);
        this.TweenOptionButton(this.optionRightArray, tweenDelayTime);
    }

    //On right option pressed
    OnRightOptionButtonPressed(_this) {
        this.SetColorOfOptionButtonAndText(_this.list[1], _this.list[2]);
    }

    //On right option release 
    OnRightOptionButtonReleased(_this) {
        SoundManager.PlayButtonClickSound();
        this.DisableAllImageAndText();
        this.ClearTintOfAllOptionButtonAndText(this.optionRightArray);
        this.SetColorOfOptionButtonAndText(_this.list[1], _this.list[2]);
        this.selectedItemContainerArray[1] = _this;
        this.selectedItemIndexArray[1] = _this.name;
        console.log('selctedrightoption', this.selectedItemIndexArray[1])
        this.CheckMachtingPairResult();
    }

    //#################################################################
    ClearContainer() {
        this.optionRightArray.forEach(elem => {
            elem.list[0].setVisible(false);
            elem.list[1].setVisible(false);
            elem.list[1].setTint(0xffffff);
            elem.list[2].setVisible(false);
        })
        this.optionLeftArray.forEach(elem => {
            elem.list[0].setVisible(false);
            elem.list[1].setVisible(false);
            elem.list[1].setTint(0xffffff);
            elem.list[2].setVisible(false);
        });
        // }

        this.questionType = '';
        this.slugId = '';
        this.completedPairCount = 0;
    }

    //=================================================================
    DisableAllImageAndText() {
        for (let i = 0; i < this.optionRightArray.length; i++) {
            this.optionRightArray[i].list[1].clearTint();
            if (this.optionRightArray[i].list[2].type == "Text") {
                this.optionRightArray[i].list[2].setFill('#000000');
            }
        }
        for (let i = 0; i < this.optionLeftArray.length; i++) {
            this.optionLeftArray[i].list[1].clearTint();
            if (this.optionLeftArray[i].list[2].type == "Text") {
                this.optionLeftArray[i].list[2].setFill('#000000');
            }

        }
    }

    //####################################################################

    //==================== set color of the option button base  ====================================
    SetColorOfOptionButtonAndText(_button, _text) {
        _button.setTint(0x298A91);
        if (_text.type == "Text") {
            _text.setFill('#ffffff');
        }
    }

    //#########################################################

    //==================== Set the options button scale to 0 ====================================
    SetOptionButtonScaleToZero(_buttonArray) {
        for (let i = 0; i < _buttonArray.length; i++) {
            _buttonArray[i].setScale(0);
        }
    }

    //#########################################################

    //==================== Tween the options button ====================================
    TweenOptionButton(_buttonArray, _delayTime) {
        this.scene.tweens.add({
            targets: _buttonArray[0],
            scaleX: 1,
            scaleY: 1,
            ease: 'Quad.easeInOut',
            duration: _delayTime,
            callbackScope: this,
            onComplete: function (tween) {
                this.scene.tweens.add({
                    targets: _buttonArray[1],
                    scaleX: 1,
                    scaleY: 1,
                    ease: 'Quad.easeInOut',
                    duration: 300,
                    callbackScope: this,
                    onComplete: function (tween) {
                        this.scene.tweens.add({
                            targets: _buttonArray[2],
                            scaleX: 1,
                            scaleY: 1,
                            ease: 'Quad.easeInOut',
                            duration: 300,
                            callbackScope: this,
                            onComplete: function (tween) {
                                this.scene.tweens.add({
                                    targets: _buttonArray[3],
                                    scaleX: 1,
                                    scaleY: 1,
                                    ease: 'Quad.easeInOut',
                                    duration: 300,
                                    callbackScope: this,
                                    onComplete: function (tween) {

                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }

    //#########################################################

    //==================== Clear tint of all options button ====================================
    ClearTintOfAllOptionButtonAndText(_buttonArray) {
        for (let i = 0; i < _buttonArray.length; i++) {
            _buttonArray[i].list[1].clearTint();
            if (_buttonArray[i].list[2].type == "Text") {
                _buttonArray[i].list[2].setFill('#000000');
            }
        }
    }

    DeactiveOptionButton(_buttonArray) {
        console.log("_buttonArray: ", _buttonArray);
        for (let i = 0; i < _buttonArray.length; i++) {
            _buttonArray[i].removeInteractive();
            _buttonArray[i].setAlpha(0.4);
            if (_buttonArray[i].list[2].type == "Text") {
                _buttonArray[i].list[2].setFill('#000000');
            }

        }
    }

    //#########################################################

    CheckMachtingPairResult() {
        
        // this.scene.isCorrect = false;
        // window.alert(this.scene.isCorrect)
        console.log('selectedItemContainerArray',this.selectedItemContainerArray)
        let correctAnsArray = Global.GetCorrectAnswerData();
        // console.log('amnswerArray', correctAnsArray, this.selectedItemIndexArray[0], this.selectedItemIndexArray[1])
        if (this.selectedItemIndexArray[0] != null && this.selectedItemIndexArray[1] != null) {
            for (let i = 0; i < correctAnsArray.length; i++) {
                // console.log('checkresult', this.selectedItemIndexArray,correctAnsArray[i])
                // console.log('checkValues',correctAnsArray[i][0],correctAnsArray[i][1]);
                if ((this.selectedItemIndexArray[0]) == (correctAnsArray[i][0]) && (this.selectedItemIndexArray[1]) == (correctAnsArray[i][1])) {
                    // console.log('checked true');
                    this.scene.isCorrect = true;
                    this.completedPairCount++;
                    break;
                }else{
                    this.scene.isCorrect = false;
                }
            }
            if (this.questionType == 'PAIR_MATCHING') {
                this.postScore = 0;
            if (this.scene.isCorrect) {
                this.postScore = 2;
                this.scene.gameScore += 2;
                // console.log('this.scene.gameScore', this.scene.gameScore);
                // console.log('CorrectAnswer')
                SoundManager.PlayCorrectAnswerSound();
                // this.DeactiveOptionButton(this.selectedItemContainerArray);
                this.scene.uiPanel.SetMessageAsPerAnswer('right_icon', Global.GetCorrectAnswerMessage(), '#76b750');
                this.scene.ShowWinEffect(Math.round(game.config.width / 2), Math.round(game.config.height / 2), 1.2);

                for (let i = 0; i < this.selectedItemContainerArray.length; i++) {
                    this.selectedItemContainerArray[i].list[1].setTint(0x98D873);
                    this.selectedItemContainerArray[i].list[0].setVisible(true);
                    this.PlayCorrectAnswerEffect(this.selectedItemContainerArray, i);
                }
                this.scene.uiPanel.PlayCharacterRightAnswerAnimation();
            } else {
                // console.log('WrongAnswer')
                this.postScore = 0;
                SoundManager.PlayWrongAnswerSound();
                this.scene.uiPanel.SetMessageAsPerAnswer('wrong_icon', Global.GetWrongAnswerMessage(), '#ff5d5d');
                for (let i = 0; i < this.selectedItemContainerArray.length; i++) {
                    this.selectedItemContainerArray[i].list[1].setTint(0xEB2F06);
                    this.PlayWrongAnswerEffect(this.selectedItemContainerArray, i);
                }
                this.scene.uiPanel.PlayCharacterWrongAnswerAnimation();
            }
            this.scene.uiPanel.ShowMessageContainer();
        }
    }
    let questionIdArray = Global.GetJSONId().QuestionId;
    console.log('getId', this.answerCount,Global.GetCorrectAnswerData());
    this.scene.uiPanel.SetAttemptedQuestionData(questionIdArray[this.answerCount], Global.GetCorrectAnswerData(), this.postScore , this.scene.isCorrect,this.answerCount);
    }

    OnHideMessage() {
        console.log('selectedItemContainerArray',this.selectedItemContainerArray)
        if(this.selectedItemContainerArray.length != 0){
        if (this.scene.isCorrect) {
            for (let i = 0; i < this.selectedItemContainerArray.length; i++) {
                this.selectedItemContainerArray[i].list[0].setVisible(false);
            }
            this.DeactiveOptionButton(this.selectedItemContainerArray);

            for (let j = 0; j < this.completedAnsArray.length; j++) {
                if (JSON.stringify(this.selectedItemIndexArray) == JSON.stringify(this.completedAnsArray[j])) {
                    this.completedAnsArray.splice(j, 1);
                    console.log(this.completedAnsArray,'Spliceansarray')
                }
            }
        }
        this.ClearTintOfAllOptionButtonAndText(this.selectedItemContainerArray);
        this.selectedItemIndexArray = [];
        setTimeout(() => {
        this.selectedItemContainerArray = [];
        }, 200);
        this.scene.isCorrect = null;

        if (this.completedPairCount == 3) {
            setTimeout(() => {
                console.log('completedanswer', this.completedAnsArray);
                console.log('this.completedAnsArr',this.completedAnsArray[0][0], this.completedAnsArray[0][1] ,this.optionLeftArray[this.completedAnsArray[0][0]], this.optionRightArray[this.completedAnsArray[0][1]])
                this.OnLeftOptionButtonPressed(this.optionLeftArray[this.completedAnsArray[0][0]]);
                this.OnLeftOptionButtonReleased(this.optionLeftArray[this.completedAnsArray[0][0]]);
                this.OnRightOptionButtonPressed(this.optionRightArray[this.completedAnsArray[0][1]]);
                this.OnRightOptionButtonReleased(this.optionRightArray[this.completedAnsArray[0][1]]);
            }, 300);

        }
        // console.log('this.completedPairCount',this.completedPairCount)
        if (this.completedPairCount == 4) {
            this.completedAnsArray =[];
            this.scene.uiPanel.ShowNextButton();
        }
    }
}

    PlayCorrectAnswerEffect(_selectedArray, _index) {
        this.scene.tweens.add({
            targets: _selectedArray[_index],
            scaleX: 1.2,
            scaleY: 1.2,
            ease: 'Quad.easeInOut',
            duration: 200,
            callbackScope: this,
            onComplete: function () {
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
            onComplete: function (tween) {
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

}

export default PairMatchingModule;