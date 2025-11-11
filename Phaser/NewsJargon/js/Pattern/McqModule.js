import { SoundManager } from "../SoundManager.js";
import { Global } from "./Global.js";
class McqModule {
    // constructor(scene) {
    constructor(scene, _elementsData, _slug, _questionType) {
        this.scene = scene;
        this.selectedOptionIndex = 0;
        this.slugId = _slug;
        this.questionType = _questionType;
        this.optionArray = [];
        this.imageArray = [];
        this.tweenAnimationDelay = 0;
        this.mcqCounter = 0;
        this.currentModuleDepth = 0;
        this.CreateMcqModule(_elementsData, this.mcqCounter);
        // this.imageContainer=null
        // console.log(this.mcqCounter)
        this.scene.game.events.on("evtShowResult", this.OnShowResult, this);
        this.scene.game.events.on("evtClearContainer", this.ClearContainer, this);
        console.log("McqModule", this.slugId, this.questionType)
    }

    CreateMcqModule(_elementsData, _mcqCounter) {
        // console.log('slugid', this.slugId);
        // console.log(_mcqCounter)
        for (let i = 0; i < _elementsData.length; i++) {
            console.log('CorrectAnswer',_elementsData[i].answer)
            Global.SetCorrectAnswerData(_elementsData[i].answer);
            //Set the question from server
            this.scene.uiPanel.SetQuestionFromServer(_elementsData[i].question);
            let optionsLength = _elementsData[i].options.length;
            for (let j = 0; j < optionsLength; j++) {
                let xPos = 400 + (j * 380);
                let yPos = 554;
                if (this.slugId == 'm1-text-img') {
                    _mcqCounter++;
                    // console.log(_mcqCounter)
                    this.CreateOptionPart(xPos, yPos, _elementsData[i].options[j], j, _elementsData[i].imageUrl[j], _elementsData[i].imageUrl.length, _mcqCounter);
                } if (this.slugId == 'm1-text-text') {
                    this.CreateOptionPart(xPos, yPos, _elementsData[i].options[j], j);
                }
            }
        }
    }

    CreateOptionPart(_xPos, _yPos, _optionData, _index, _imageUrl, _imageUrlLength, mcqCounter) {
        let optionContainer;
        // console.log('slugid', this.slugId);
        // this.mcqCounter = _mcqCounter;
        // console.log(mcqCounter);
        // console.log('Container',optionContainer)
        if(optionContainer != null || optionContainer != undefined || optionContainer != ''){
            optionContainer = null;
           optionContainer = this.scene.add.container(_xPos, _yPos);
            // console.log("Emptyand New cont")
        } else{
            // console.log("NewCont")
            optionContainer = this.scene.add.container(_xPos, _yPos);
        }
        // optionContainer = this.scene.add.container(_xPos, _yPos);
        // let optionShadow = this.scene.add.image(0, 0, 'mcq_correct_ans_shadow').setOrigin(0.5);
        let optionShadow = this.scene.add.image(0, 10, 'mcq_correct_ans_shadow').setOrigin(0.5).setScale(1.05, 1.05);
        let optionBase = this.scene.add.image(0, 0, 'mcq_option_base').setOrigin(0.5);
        
        optionContainer.name = _index;
        // this.imageContainer.name = _index;
        optionBase.setVisible(false);
        optionShadow.setVisible(false);
        // console.log("Containerin",optionContainer)
        let optionTextStyle = { fontFamily: 'Rubik_Medium', fontSize: '26px', fill: '#3A3843', fontStyle: 'bold', align: 'center', wordWrap: { width: 278, height: 415, x: 261, y: 345 } };
        if (_imageUrlLength > 0) {
            //    console.log('optioncontainery',)
            let optionDataText = this.scene.add.text(0, optionBase.y + (200 * scaleFactorY), _optionData, optionTextStyle).setOrigin(0.5, 0.5);
            optionDataText.setVisible(false);
            let imageKey = 'image_' + _index + _imageUrl;
            this.scene.uiPanel.ShowLoader();
            this.scene.load.image(imageKey, _imageUrl);
            this.scene.load.start();
            // setTimeout(() => {
            this.scene.load.on('complete', function () {
                this.scene.uiPanel.HideLoader();
                // console.log(this,this.scene)
                // console.log("Container",optionContainer)
                if (mcqCounter < 5 && this.slugId != '') {
                if (this.scene.textures.exists(imageKey)) {
                    let imageData = this.scene.add.image(0, -40, imageKey);
                    // console.log('optionbasesize',optionBase.width,optionBase.height)
                    // console.log('imagedatasize',imageData.width , imageData.height);
                    let scaleToFitX = (optionBase.width / imageData.width).toFixed(2);
                    let scaleToFitY = (optionBase.height /imageData.height).toFixed(2);
                    // let scaleToFit = Math.min(scaleToFitX, scaleToFitY);
                    // imageData.setScale(scaleToFitX - scaleToFitX /10,scaleToFitY -scaleToFitY/40 ) 
                    imageData.setScale(scaleToFitX - scaleToFitX /10,scaleToFitY-scaleToFitY/4 )
                    // const cropWidth = imageData.width * scaleToFit;
                    // const cropHeight = imageData.height * scaleToFit;
                    console.log(scaleToFitX,scaleToFitY,scaleToFitY-scaleToFitY/20)
                    // imageData.setCrop(imageData.width / 2 - cropWidth / 2,imageData.height / 2 - cropHeight / 2, cropWidth, cropHeight);
                    optionContainer.add([optionShadow, optionBase, optionDataText, imageData]);
                    optionBase.setVisible(true);
                    optionDataText.setVisible(true);
                   
                }
            }
            })
            // }, 20000);
            // this.scene.load.on('complete', function () {
            //     console.log('this.MCQcounter', mcqCounter);
            //     if (mcqCounter < 5) {
            //         if (this.scene.textures.exists('image_' + _index)) {
            //     console.log("ImageLoaderMcq")
            //     let imageData = this.scene.add.image(0, -40, 'image_' + _index).setScale(0.15);
            //     //  imageData.setVisible(true)
            //     optionContainer.add([optionShadow, optionBase, optionDataText, imageData]);
            //     optionBase.setVisible(true);
            //     optionDataText.setVisible(true);
            // }
            // }
            // if (this.scene.textures.exists('image_' + _index)){
            // if (mcqCounter = 4) {
            //     setTimeout(() => {
            //         mcqCounter += 1; // Stop loading scene
            //     }, 100);
            // }
            // }
            // });
            this.tweenAnimationDelay = 1200;
        } else {
            let optionDataText = this.scene.add.text(0, 0, _optionData, optionTextStyle).setOrigin(0.5, 0.5);
            optionContainer.add([optionShadow, optionBase, optionDataText]);
            optionBase.setVisible(true);
            optionDataText.setVisible(true);
            this.tweenAnimationDelay = 300;
        }

        optionContainer.setSize(optionBase.width, optionBase.height);
        optionContainer.setInteractive({ useHandCursor: 'true' });
        optionContainer.setDepth(this.currentModuleDepth);

        optionContainer.on('pointerdown', function () {
            optionContainer.list[1].setTint(0x298A91);
            optionContainer.list[2].setFill('#ffffff');
        });

        optionContainer.on('pointerup', (pointer, x, y, event) => this.OnOptionButtonReleased(optionContainer), this);
        this.optionArray.push(optionContainer);

        this.SetScaleToZero();
        this.TweeningContainer();
    }

    ClearContainer() {

        if (this.slugId == 'm1-text-text') {
            this.optionArray.forEach(elem => {
                elem.list[0].setVisible(false);
                elem.list[1].setVisible(false);
                elem.list[2].setVisible(false);
            });
        }
        if (this.slugId == 'm1-text-img') {
            this.optionArray.forEach(elem => {
                    elem.setVisible(false);
            });
        }
        this.questionType = '';
        this.slugId = '';
    }
    OnOptionButtonReleased(_clickContainer) {
        SoundManager.PlayButtonClickSound();
        this.selectedOptionIndex = _clickContainer.name;
        this.DisableAllImageAndText();
        this.scene.uiPanel.ShowCheckButton();
        _clickContainer.list[1].setTint(0x298a91);
        _clickContainer.list[2].setFill('#ffffff');
        if (_clickContainer.list[2].text.match(Global.GetCorrectAnswerData())) {
            this.scene.isCorrect = true;
            this.scene.xPos = _clickContainer.x;
            this.scene.yPos = _clickContainer.y;
        } else {
            this.scene.isCorrect = false;
        }
    }

    OnShowResult() {
        // console.log('slugid', this.slugId);
        this.DisableAllOptionButton();
        if (this.questionType == 'MCQ') {
            this.scene.load.off('complete', this.completeHandler);
            if (this.scene.isCorrect) {
                this.scene.gameScore += 2;
                console.log('this.scene.gameScore', this.scene.gameScore);
                SoundManager.PlayCorrectAnswerSound();
                this.scene.uiPanel.SetMessageAsPerAnswer('right_icon', Global.GetCorrectAnswerMessage(), '#76b750');
                this.SetColorOfOptionButton(0x98d873);
                this.PlayCorrectAnswerEffect();
                this.ShowWinShadow();
                this.scene.ShowWinEffect(this.optionArray[this.selectedOptionIndex].x, this.optionArray[this.selectedOptionIndex].y, 1);
                this.scene.uiPanel.PlayCharacterRightAnswerAnimation();
            } else {
                for(let i = 0 ; i < 4;i++){
                    if( this.optionArray[i].list[2].text == Global.GetCorrectAnswerData()){
                     this.SetCorrectColorOfOptionButton(0x98d873,i);
                     this.PlayCorrectAnswerEffect(this.optionArray, i);
                    }
                 }
                SoundManager.PlayWrongAnswerSound();
                this.scene.uiPanel.SetMessageAsPerAnswer('wrong_icon', Global.GetWrongAnswerMessage(), '#ff5d5d');
                this.SetColorOfOptionButton(0xeb2f06);
                this.PlayWrongAnswerEffect();
                this.scene.uiPanel.PlayCharacterWrongAnswerAnimation();
            }
        }
    }
    completeHandler() { }
    DisableAllOptionButton() {
        for (let i = 0; i < this.optionArray.length; i++) {
            this.optionArray[i].removeInteractive();
        }
    }
    SetColorOfOptionButton(_color) {
        this.optionArray[this.selectedOptionIndex].list[1].setTint(_color);
    }

    SetCorrectColorOfOptionButton(_color,_correctAnswer){
        this.optionArray[_correctAnswer].list[1].setTint(_color);
    }

    SetCorrectColorOfOptionButton(_color,_correctAnswer){
        this.optionArray[_correctAnswer].list[1].setTint(_color);
    }
    ShowWinShadow() {
        this.optionArray[this.selectedOptionIndex].list[0].setVisible(true);
    }

    HideWinShadow() {
        this.optionArray[this.selectedOptionIndex].list[0].setVisible(false);
    }

    PlayCorrectAnswerEffect() {
        this.scene.tweens.add({
            targets: this.optionArray[this.selectedOptionIndex],
            scaleX: 1.2,
            scaleY: 1.2,
            ease: 'Quad.easeInOut',
            duration: 200,
            callbackScope: this,
            onComplete: function () {
                this.scene.tweens.add({
                    targets: this.optionArray[this.selectedOptionIndex],
                    scaleX: 1.0,
                    scaleY: 1.0,
                    ease: 'Quad.easeInOut',
                    duration: 200,
                });
            }
        });
    }

    PlayWrongAnswerEffect() {
        this.scene.tweens.add({
            targets: this.optionArray[this.selectedOptionIndex],
            x: this.optionArray[this.selectedOptionIndex].x + 12,
            ease: 'Quad.easeInOut',
            duration: 50,
            repeat: 3,
            yoyo: true,
            callbackScope: this,
            onComplete: function (tween) {
                this.scene.tweens.add({
                    targets: this.optionArray[this.selectedOptionIndex],
                    x: this.optionArray[this.selectedOptionIndex].x,
                    ease: 'Quad.easeInOut',
                    duration: 50,
                    callbackScope: this,
                });
            }
        });
    }

    SetScaleToZero() {
        for (let i = 0; i < this.optionArray.length; i++) {
            this.optionArray[i].setScale(0);
        }
    }

    TweeningContainer() {
        this.scene.tweens.add({
            targets: this.optionArray[0],
            scaleX: 1,
            scaleY: 1,
            ease: 'Quad.easeInOut',
            duration: this.tweenAnimationDelay,
            callbackScope: this,
            onComplete: function (tween) {
                this.scene.tweens.add({
                    targets: this.optionArray[1],
                    scaleX: 1,
                    scaleY: 1,
                    ease: 'Quad.easeInOut',
                    duration: 300,
                    callbackScope: this,
                    onComplete: function (tween) {
                        this.scene.tweens.add({
                            targets: this.optionArray[2],
                            scaleX: 1,
                            scaleY: 1,
                            ease: 'Quad.easeInOut',
                            duration: 300,
                            callbackScope: this,
                            onComplete: function (tween) {
                                this.scene.tweens.add({
                                    targets: this.optionArray[3],
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

    DisableAllImageAndText() {
        for (let i = 0; i < this.optionArray.length; i++) {
            this.optionArray[i].list[1].clearTint();
            this.optionArray[i].list[2].setFill('#000000');
        }
    }

    HideQuestion() {
        for (let i = 0; i < this.optionArray.length; i++) {
            this.optionArray[i].destroy();
        }
        this.questionBase.destroy();
        this.questionText.destroy();
        this.optionArray = [];
    }
}
export default McqModule;