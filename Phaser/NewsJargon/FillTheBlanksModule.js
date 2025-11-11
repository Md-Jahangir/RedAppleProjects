import { SoundManager } from "../SoundManager.js";
import { Global } from "./Global.js";

class FillTheBlanksModule {
    constructor(scene, _elementsData,_slug,_questionType,_answerCount) {
        this.scene = scene;
        this.questionArray = [];
        this.questionType = _questionType;
        this.slugId = _slug;
        this.answerCount = _answerCount;
        this.optionArray = [];
        this.optionPreviousPosX = 0;
        this.optionPreviousPosY = 0;
        this.overlapResult = null;
        this.blankQuestionIndex = 0;
        this.currentModuleDepth = 0;
        this.CreateFillTheBlanksModule(_elementsData);
        this.CreateFalseText();
        this.scene.game.events.on("evtShowResult", this.OnShowResult, this);
        console.log("FillTheBlanksModule",this.slugId,this.questionType);
        this.scene.game.events.on("evtHideSentence", this.HideSentence, this);
        this.scene.game.events.on("evtClearContainer", this.ClearContainer, this);
    }

    CreateFillTheBlanksModule(_elementsData) {
        console.log('_elementsData', _elementsData);
        this.currentModuleDepth += 1;
        for (let i = 0; i < _elementsData.length; i++) {
            Global.SetCorrectAnswerData(_elementsData[i].answer);

            this.scene.uiPanel.SetQuestionFromServer(_elementsData[i].question);

            let optionDataLength = _elementsData[i].options.length;
            for (let j = 0; j < optionDataLength; j++) {
                let imageXPos = 430 + (j * 350)
                let imageYPos = 775;
                this.CreateOptionPart(imageXPos, imageYPos, _elementsData[i].options[j], j);
            }
            Global.SetFillTheBlanksQuestion(_elementsData[i].fillTheBlanksQuestion);
            this.CreateFillTheBlanksQuestion();
        }
        
      
    }

    CreateFillTheBlanksQuestion() {
        this.blankQuestionIndex= 0;
        let arr = Global.GetFillTheBlanksQuestion();
        console.log("Arr",arr);
        this.questionArray = JSON.parse(JSON.stringify(arr));
        console.log("questionArray : ", this.questionArray);

        this.questionFalseBase = this.scene.add.image(Math.round(game.config.width / 2) + 30, Math.round(game.config.height / 2) - 190, 'one_pixel').setOrigin(0.5).setScale(1400, 120).setAlpha(0.001);

        let blanksQuestionTextStyle = { fontFamily: 'Rubik_Medium', fontSize: '42px', fill: '#000000', align: 'center', wordWrap: { width: 1480, height: 182, x: 253, y: 305 } };
        this.blanksQuestionText = this.scene.add.text(Math.round(game.config.width / 2) + 30, Math.round(game.config.height / 2) - 190, "_data", blanksQuestionTextStyle).setOrigin(0.5, 0.5);

        this.questionArray.map((elm, idx) => {
            // if (elm.status == false) {
            // if (elm.status == 0) {
            //     this.emptySpaceArr.push(idx);
            // }
        });
        // let elem= _getelementsData[0].answer.split(" ");
        // console.log(elem)
        // console.log(this.questionArray)
        // for(let i = 0 ; i < this.questionArray.length;i++){
        //     if(this.questionArray[i] == elem[i]){

        //     } else{
        //         this.blankQuestionIndex = i;
        //         console.log(this.blankQuestionIndex)
        //     }
        // }
        // console.log(_elementsData.indexOf(this.blankQuestionIndex)) 
        this.UpdateSentence();
    }

    UpdateSentence() {
        let questionString = "";
        console.log("UpdateSentence", this.questionArray);
        for (let i = 0; i < this.questionArray.length; i++) {
            // console.log("UpdateSentence Status",this.questionArray[i].status);
            // if (this.questionArray[i].status == false) {
            if (this.questionArray[i].status == 0) {
                questionString += "___________";
            } else {
                questionString += this.questionArray[i].text;
            }
            if (i < this.questionArray.length - 1) {
                questionString += " ";
            }
        }

        this.blanksQuestionText.setText(questionString);
        console.log("Blankquestion", this.blanksQuestionText);
        // let txt = this.blanksQuestionText.text;
        // console.log("text.........: " + txt);
        // this.blanksQuestionText.setColor();
        // this.blanksQuestionText.setFill("#ff0000", 10);
        // console.log("this.blanksQuestionText: ", this.blanksQuestionText);
    }
    HideSentence() {
        // console.log("HideSentence")
        this.blanksQuestionText.setVisible(false);
    }
    CreateFalseText() {
        let blanksFalseTextStyle = { fontFamily: 'Rubik_Medium', fontSize: '42px', fill: '#000000', align: 'center', wordWrap: { width: 1480, height: 182, x: 253, y: 305 } };
        this.blanksFalseText = this.scene.add.text(Math.round(game.config.width / 2) , Math.round(game.config.height / 2) - 205, "", blanksFalseTextStyle).setOrigin(0.5, 0.5);
        // console.log("CreateFalseText",this.blanksFalseText);

    }

    SetTheDragedTextToEmptyBlock(_selectedObjText) {
        console.log('SetTheDragedTextToEmptyBlock',_selectedObjText);
        let sentence = _selectedObjText.split(" ");
        let questionString = "";
        let index = null;
        this.blanksFalseText.setText(_selectedObjText);
        this.blanksFalseText.setVisible(false);
        this.blanksQuestionText.setFill("#68dbe8");
         index = this.questionArray.findIndex(element =>
             element.status === 0 || element.status === 2
             );
        this.questionArray.splice(index, 1 , {text : _selectedObjText,status : 2});
        console.log('this.questionArray',this.questionArray,index)
        
        // this.questionArray = this.questionArray.map((el) => {
        //     // el.text.splice(ind)
        // //     // if (!el.status) {
        // //     // el.status = true;
        //     if (el.status == 0 || el.status == 2) {
        //         el.status = 2;
        //         // this.questionArray.splice(index, 1 , {text : _selectedObjText,status : el.status})

        // //         el.text = sentence.shift();
        // //         console.log('el.Text',el.text);
                
        // //         // console.log(this.questionArray.findIndex(el));
                // this.blanksFalseText.setText(_selectedObjText);
        // //         this.blanksFalseText.setPosition(Math.round(game.config.width / 2) + (this.blankQuestionIndex * 70), Math.round(game.config.height / 2) -205);
        // //         console.log(this.blanksFalseText);
        // //         // this.blanksQuestionText.setFill("#68dbe8");
        //     }
        // //     return el;
        // });

        // this.UpdateSentence();
        for (let i = 0; i < this.questionArray.length; i++) {
            if (this.questionArray[i].status == 0) {
                questionString += "___________";
            } else {
                questionString += this.questionArray[i].text;
            }
            if (i < this.questionArray.length - 1) {
                questionString += " ";
                // questionString.setFill("#68dbe8")
            }
        }
        // this.blankQuestionIndex
        console.log('QuesionString', questionString);
        this.blanksQuestionText.setText(questionString);
        // For DEMO only
    
        // this.blanksFalseText.setPosition(Math.round(game.config.width / 2) + (this.blankQuestionIndex * 70), Math.round(game.config.height / 2) -205);
        // this.blanksFalseText.setVisible(false)
     
    }

    CreateOptionPart(_xPos, _yPos, _optionData, _index) {
        let optionDataText = null;
        let optionContainer = this.scene.add.container(_xPos, _yPos);
        optionContainer.name = _index;
        let optionBase = this.scene.add.image(0, 0, 'pair_matching_option_base').setOrigin(0.5);
        optionBase.setVisible(true);
        let optionTextStyle = { fontFamily: 'Rubik_Medium', fontSize: '26px', fill: '#3A3843', fontStyle: 'bold', align: 'center', wordWrap: { width: 278, height: 415, x: 261, y: 345 } };
        optionDataText = this.scene.add.text(0, 0, _optionData, optionTextStyle).setOrigin(0.5, 0.5);

        optionContainer.add([optionBase, optionDataText]);
        optionContainer.list[1].setVisible(true);
        optionContainer.setSize(optionBase.displayWidth, optionBase.displayHeight);
        optionContainer.setInteractive({ useHandCursor: 'true' });
        optionContainer.setDepth(this.currentModuleDepth);

        optionContainer.on('pointerdown', (pointer, x, y, event) => this.OnOptionButtonPressed(optionContainer), this);

        this.scene.input.setDraggable(optionContainer);
        this.scene.input.on('drag', function (pointer, optionContainer, dragX, dragY) {
            optionContainer.x = dragX;
            optionContainer.y = dragY;
            this.overlapResult = this.CheckOverlapBetweenSprite(optionContainer.list[1], this.questionFalseBase);
            // console.log("this.overlapResult: " + this.overlapResult);
        }, this);

        this.scene.input.on('dragend', function (pointer, optionContainer) {
            if (this.overlapResult) {
                this.overlapResult = false;
                optionContainer.list[1].setVisible(false);
                this.DisableAllImageAndText();
                this.DeactiveDraggedObject(optionContainer);
                this.SetTheDragedTextToEmptyBlock(optionContainer.list[1].text);
                this.scene.uiPanel.ShowCheckButton();
                this.CheckCorrectOrWrongAnswer();
            } else { }

            optionContainer.list[0].setVisible(true);
            optionContainer.x = this.optionPreviousPosX;
            optionContainer.y = this.optionPreviousPosY;
        }, this);

        this.optionArray.push(optionContainer);
        this.SetScaleToZero();
        let tweenAnimationDelay = 300;
        this.TweenOptionButton(this.optionArray, tweenAnimationDelay);

    }
    ClearContainer() {
        for (let i = 0; i < this.optionArray.length; i++) {
            this.optionArray[i].list[0].setVisible(false);
            this.optionArray[i].list[1].setText('');
            this.optionArray[i].depth = 0;
        }
        this.slugId = '';
        this.questionType = '';
        // this.blanksFalseText.setText('');
    }
    CheckOverlapBetweenSprite(spriteA, spriteB) {
        let boundsA = spriteA.getBounds();
        let boundsB = spriteB.getBounds();
        return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
    }

    OnOptionButtonPressed(_seletedContainer) {
        SoundManager.PlayButtonClickSound();
        _seletedContainer.list[0].setVisible(false);
        _seletedContainer.setDepth(2);
        this.optionPreviousPosX = _seletedContainer.x;
        this.optionPreviousPosY = _seletedContainer.y;
    }

    DeactiveDraggedObject(_obj) {
        console.log('DeactiveDraggedObject')
        _obj.disableInteractive();
        _obj.list[1].setVisible(false);
        _obj.list[0].setAlpha(0.3);
    }

    CheckCorrectOrWrongAnswer() {
        // if (this.blanksQuestionText.text.match(Global.GetCorrectAnswerData())) {
        //     this.scene.isCorrect = true;
        // } else {
        //     this.scene.isCorrect = false;
        // }

        //FOR DEMO
        if (this.blanksFalseText.text.match(Global.GetCorrectAnswerData())) {
            this.scene.isCorrect = true;
        } else {
            this.scene.isCorrect = false;
        }
        console.log("this.iscorrect",this.scene.isCorrect)
    }

    OnShowResult() {
        // console.log("show result of Fill in the blanks module",this.QuestionType);
        if(this.questionType == "FILL_THE_BLANKS"){
            this.postScore = 0;
        if (this.scene.isCorrect) {
            this.scene.gameScore += 2;
            this.postScore  = 2;
            console.log('this.scene.gameScore', this.scene.gameScore);
            console.log("this.scene.iscorrect",this.scene.isCorrect)
            this.DisableAllOptionButton();
            SoundManager.PlayCorrectAnswerSound();
            this.scene.uiPanel.SetMessageAsPerAnswer('right_icon', Global.GetCorrectAnswerMessage(), '#76b750');
            // this.ShowWinShadow();
            this.SetColorOfSeletedObject("#98d873");
            // this.PlayCorrectAnswerEffect(this.blanksQuestionText);
            //For demo
            this.PlayCorrectAnswerEffect(this.blanksQuestionText, this.blanksFalseText);
            this.scene.ShowWinEffect(Math.round(game.config.width / 2), Math.round(game.config.height / 2), 1);
            this.scene.uiPanel.PlayCharacterRightAnswerAnimation();
        } else {
            // this.DisableAllOptionButton();
            this.postScore = 0;
            this.scene.gameScore += 0;
            SoundManager.PlayWrongAnswerSound();
            this.scene.uiPanel.SetMessageAsPerAnswer('wrong_icon', Global.GetWrongAnswerMessage(), '#ff5d5d');
            this.SetColorOfSeletedObject("#eb2f06");
            // this.PlayWrongAnswerEffect(this.blanksQuestionText);
            //for demo
            this.PlayWrongAnswerEffect(this.blanksQuestionText, this.blanksFalseText);
            this.scene.uiPanel.PlayCharacterWrongAnswerAnimation();
        }
    
        let questionIdArray = Global.GetJSONId().QuestionId;
        console.log('getId', this.answerCount,Global.GetCorrectAnswerData());
        // for(let i of Global.GetCorrectAnswerData() ){

        // }
        this.scene.uiPanel.SetAttemptedQuestionData(questionIdArray[this.answerCount], Global.GetCorrectAnswerData(),this.postScore , this.scene.isCorrect,this.answerCount);
    }
    }

    SetScaleToZero() {
        for (let i = 0; i < this.optionArray.length; i++) {
            this.optionArray[i].setScale(0);
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

    // PlayCorrectAnswerEffect(ref) {
    //     this.scene.tweens.add({
    //         targets: ref,
    //         scaleX: 1.2,
    //         scaleY: 1.2,
    //         ease: 'Quad.easeInOut',
    //         duration: 200,
    //         callbackScope: this,
    //         onComplete: function() {
    //             this.scene.tweens.add({
    //                 targets: ref,
    //                 scaleX: 1.0,
    //                 scaleY: 1.0,
    //                 ease: 'Quad.easeInOut',
    //                 duration: 200,
    //             });
    //         }
    //     });
    // }

    //FOR DEMO
    PlayCorrectAnswerEffect(ref, ref2) {
        this.scene.tweens.add({
            targets: [ref, ref2],
            scaleX: 1.2,
            scaleY: 1.2,
            ease: 'Quad.easeInOut',
            duration: 200,
            callbackScope: this,
            onComplete: function () {
                this.scene.tweens.add({
                    targets: [ref, ref2],
                    scaleX: 1.0,
                    scaleY: 1.0,
                    ease: 'Quad.easeInOut',
                    duration: 200,
                });
            }
        });
    }

    // PlayWrongAnswerEffect(ref) {
    //     this.scene.tweens.add({
    //         targets: ref,
    //         x: ref.x + 12,
    //         ease: 'Quad.easeInOut',
    //         duration: 50,
    //         repeat: 3,
    //         yoyo: true,
    //         callbackScope: this,
    //         onComplete: function(tween) {
    //             this.scene.tweens.add({
    //                 targets: ref,
    //                 x: ref.x,
    //                 ease: 'Quad.easeInOut',
    //                 duration: 50,
    //                 callbackScope: this,
    //             });
    //         }
    //     });
    // }

    //FOR DEMO
    PlayWrongAnswerEffect(ref, ref2) {
        this.scene.tweens.add({
            targets: [ref],
            x: ref.x + 12,
            ease: 'Quad.easeInOut',
            duration: 50,
            repeat: 3,
            yoyo: true,
            callbackScope: this,
            onComplete: function (tween) {
                this.scene.tweens.add({
                    targets: [ref],
                    x: ref.x,
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
        console.log('DisableAllImageAndText')
        for (let i = 0; i < this.optionArray.length; i++) {
            this.optionArray[i].setInteractive();
            this.optionArray[i].list[0].setAlpha(1);
            this.optionArray[i].list[1].setVisible(true);
            this.optionArray[i].list[1].setFill('#000000');
        }
    }

    SetColorOfSeletedObject(_color) {
        // this.blanksQuestionText.setFill(_color);
        //For Demo
        this.blanksQuestionText.setFill(_color);
    }

    // ShowWinShadow() {
    //     this.descriptionArray[this.emptyContainerIndex].list[0].setVisible(true);
    // }

    // HideWinShadow() {
    //     this.descriptionArray[this.emptyContainerIndex].list[0].setVisible(false);
    // }
    // HidePopup() {
    //     this.optionArray.forEach(element => {
    //         element.destroy();//setVisible(false)
    //     });
    //     this.blanksQuestionText.destroy();//setVisible(false);
    //     this.blanksFalseText.destroy(); //setVisible(false);
    //     this.scene.uiPanel.questionText.destroy();//setText("")

    //     this.scene.ChangeModule();
    // }
    // ShowPopup() {
    //     this.optionArray.forEach(element => {
    //         element.setVisible(true)
    //     });
    //     this.blanksQuestionText.setVisible(true);
    //     this.blanksFalseText.setVisible(true);
    //     this.CreateFillTheBlanksModule(_elementsData);
    //     this.CreateFalseText();
    // }
}

export default FillTheBlanksModule;