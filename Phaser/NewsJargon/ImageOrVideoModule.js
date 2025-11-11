import { SoundManager } from "../SoundManager.js";
import { Global } from "./Global.js";
import Video from "../Video.js";

class ImageOrVideoModule {
    constructor(scene, _elementsData, _slug, _questionType,_answerCount) {
        this.scene = scene;
        this.questionType = _questionType;
        this.slugId = _slug;
        this.answerCount = _answerCount;
        this.tweenAnimationDelay = 300;
        this.optionArray = [];
        this.selectedOptionIndex = 0;
        this.isVideoPlaying = false;
        this.videoObj = null;
        this.imageData = null;
        this.imageCont = null;
        this.questionVideo = null;
        this.counter = 0;
        this.progressBar = null;
        this.currentModuleDepth = 0;
        this.CreateImageVideoModule(_elementsData, this.counter);
        // console.log(this.counter)

        this.scene.game.events.on("evtShowResult", this.OnShowResult, this);
        this.scene.game.events.on("evtClearContainer", this.ClearContainer, this);
        console.log("ImageOrVideoModule", _elementsData, this.questionType)
    }

    CreateImageVideoModule(_elementsData, _counter) {
        // console.log('slugid', this.slugId);
        this.currentModuleDepth += 1;
        for (let i = 0; i < _elementsData.length; i++) {
            this.scene.uiPanel.SetQuestionFromServer(_elementsData[i].question);
            Global.SetCorrectAnswerData(_elementsData[i].answer);


            // this.CreateVideoPart();
            // this.videoObj = new Video(this.scene, _elementsData[i].videoUrl);
            let optionsLength = _elementsData[i].options.length;
            for (let j = 0; j < optionsLength; j++) {
                let xPos = 430 + (j * 350)
                // let yPos = 775;
                let yPos = 775;
                this.CreateOptionPart(xPos, yPos, _elementsData[i].options[j], j);
            }
            if (this.slugId == 'm3-video-text') {
                // console.log("CreateVideoPart")
                _counter++;
                this.CreateVideoPart(_elementsData[i].videoUrl);
                // this.CreateVideoPart('https://staging.newsjargon.com/game/NewsJargon/assets/images/module3_image_or_video/image_or_video_option_video.mp4');
            } if (this.slugId == 'm3-img-text') {
                // console.log("CreateImagePart")
                _counter++;
                // console.log(_counter)
                this.CreateImagePart(_elementsData[i].imageUrl, _counter);
                // this.CreateImagePart( 'http://localhost/Rupesh/Git/NewsJargon/assets/images/module3_image_or_video/image_or_video_option_image.png');
                //  http://localhost/Rupesh/Git/NewsJargon/assets/images/module3_image_or_video/image_or_video_option_video.mp4
            }
            // Global.SetImgVideoModulequestion(_elementsData[i].fillTheBlanksQuestion);
            // this.CreateImageOrVideoModuleQuestion();
        }
    }

    // CreateImageOrVideoModuleQuestion(){

    // }
    CreateImagePart(_imageUrl, _counterValue) {
        // console.log('imagadata', this.imageData);
        this.counter += _counterValue;
        // let slugId = this.slugId;
        // console.log('count', this.counter, _counterValue, this.slugId)
        if (_imageUrl != "") {
            let imageKey = 'image_video_module_image' + _imageUrl;
            this.scene.uiPanel.ShowLoader();
            this.scene.load.image(imageKey, _imageUrl);
            this.scene.load.start();
            this.scene.load.on('complete', () => {
                this.scene.uiPanel.HideLoader();
                if (this.counter == 1 && this.slugId != '') {
                    if (this.scene.textures.exists(imageKey)) {
                        this.imageCont = null;
                        this.imageData = null;
                        this.imageCont = this.scene.add.container();
                        this.imageData = this.scene.add.image(Math.round(game.config.width / 2) + 20, Math.round(game.config.height / 2) - 80, imageKey).setScale(0.5, 0.4).setOrigin(0.5);
                        this.imageData.setVisible(true);
                        this.imageCont.add(this.imageData);
                        this.TweenOptionButton(this.optionArray, this.tweenAnimationDelay);
                    }
                }
            });
        }
    }
    //     LoadProgress(){
    //         // this.progressBar.setCrop(0, 0, this.progressBar.width * percentage, this.progressBar.height);
    //         // percentage = percentage * 100;
    //     }
    //     complete(){
    //   console.log("complete");
    //     }
    CreateVideoPart(_videoUrl) {
        // console.log(this.imageData)
        // this.imageData.setVisible(false);
        // console.log(_videoUrl)
        // _videoUrl = 'http://localhost/Rupesh/Git/NewsJargon/assets/images/module3_image_or_video/image_or_video_option_video.mp4';
        if (_videoUrl != "") {
            this.scene.uiPanel.ShowLoader();
            this.scene.load.video('image_video_module_video', _videoUrl);
            this.scene.load.start();
            this.scene.load.on('complete', function () {
                this.scene.uiPanel.HideLoader();
                if (this.counter == 1) {
                    this.questionVideo = this.scene.add.video(Math.round(game.config.width / 2) + 20, Math.round(game.config.height / 2) - 80, 'image_video_module_video').setScale(0.6, 0.4).setOrigin(0.5);
                    this.playPauseButton = this.scene.add.image(Math.round(game.config.width / 2) + 20, Math.round(game.config.height / 2) - 80, 'video_play_button').setScale(1).setOrigin(0.5);
                    this.questionVideo.setInteractive();
                    this.questionVideo.setVisible(true);
                    this.questionVideo.addMarker("key", 10, 1);
                    this.questionVideo.on('pointerdown', this.PlayPauseVideo, this);
                    this.questionVideo.on('complete', function (video) {
                        this.isVideoPlaying = false;
                        this.questionVideo.seekTo(0);
                        this.playPauseButton.setVisible(true);
                    }, this);

                    this.questionVideo.on('seeking', function (video) {
                        // console.log("seeking");
                    }, this);

                    this.questionVideo.on('seeked', function (video) {
                        // console.log("seeked");

                    }, this);
                }
                // setTimeout(() => {

                //For Client code 
                // this.TweenOptionButton(this.optionArray, this.tweenAnimationDelay);
                // }, 500);
                // }
            }, this)
            //For demo code 
            this.TweenOptionButton(this.optionArray, this.tweenAnimationDelay);
        }
        // this.TweenOptionButton(this.optionArray, this.tweenAnimationDelay);
    }

    PlayPauseVideo() {
        this.isVideoPlaying = !this.isVideoPlaying;
        if (this.isVideoPlaying) {
            this.playPauseButton.setVisible(false);
            this.questionVideo.play();
            // this.questionVideo.setPaused(false);
            // let t = this.questionVideo.getProgress();
            // let isSkeek = this.questionVideo.seekTo(t);
            // console.log("isSkeek t: ", t);
            // this.questionVideo.setCurrentTime('+' + 5);
            // this.questionVideo.playMarker("key", 1);

        } else {
            this.playPauseButton.setVisible(true);
            this.questionVideo.setPaused(true);
        }
    }

    CreateOptionPart(_xPos, _yPos, _optionData, _index) {
        // console.log('slugid', this.slugId);
         this.previousSelectedContainer = null;
        let optionContainer = this.scene.add.container(_xPos, _yPos);
        optionContainer.name = _index;
        // let optionShadow = this.scene.add.image(0, 0, 'pair_matching_correct_ans_shadow').setOrigin(0.5);
        let optionShadow = this.scene.add.image(0, 10, 'pair_matching_correct_ans_shadow').setOrigin(0.5).setScale(1.05, 1.05);
        optionShadow.setVisible(false);
        let optionBase = this.scene.add.image(0, 0, 'pair_matching_option_base').setOrigin(0.5);
        let optionTextStyle = { fontFamily: 'Rubik_Medium', fontSize: '26px', fill: '#3A3843', fontStyle: 'bold', align: 'center', wordWrap: { width: 278, height: 415, x: 261, y: 345 } };
        let optionDataText = this.scene.add.text(0, 0, _optionData, optionTextStyle).setOrigin(0.5, 0.5);
        optionContainer.add([optionShadow, optionBase, optionDataText]);
        // 
        optionContainer.setSize(optionBase.width, optionBase.height);
        optionContainer.setInteractive({ useHandCursor: 'true' });
        optionContainer.setDepth(this.currentModuleDepth);
        optionContainer.on('pointerdown', function () {
            if(this.previousSelectedContainer != null){
            if (this.previousSelectedContainer.name !== optionContainer.name) { 
                this.previousSelectedContainer.list[0].setVisible(false);
                this.previousSelectedContainer.list[1].clearTint();
                this.previousSelectedContainer.list[2].setFill('#3A3843');
            }
        }
            
            this.previousSelectedContainer = optionContainer;
            optionContainer.list[1].setTint(0x298A91);
            optionContainer.list[2].setFill('#ffffff');

        },this);
        optionContainer.on('pointerup', (pointer, x, y, event) => this.OnOptionButtonReleased(optionContainer), this);
        this.optionArray.push(optionContainer);
        // console.log(this.optionArray)
        this.SetScaleToZero();
    }
    ClearContainer() {
        // console.log('slugid', this.slugId);
        // for (let i = 0; i < this.optionArray.length; i++) {
        //     this.optionArray[i].list[0].setVisible(false);
        //     this.optionArray[i].list[1].setTint(0xffffff);
        //     this.optionArray[i].list[2].setText('');
        // }
        if (this.slugId == 'm3-video-text') {
            this.optionArray.forEach(elem => {
                // console.log(elem)
                // elem.destroy();
                elem.setVisible(false);
                elem.depth = 0;
            }, this)
            this.questionType = '';
            this.slugId = '';
        }
        if (this.slugId == 'm3-img-text') {
            this.imageCont.setVisible(false);
            this.optionArray.forEach(elem => {
                // elem.destroy();
                elem.setVisible(false);
                elem.depth = 0;
            }, this)
            this.questionType = '';
            this.slugId = '';
        }
    }

    OnOptionButtonReleased(_clickContainer) {
        // console.log("OnOptionButtonReleased",_clickContainer);
        SoundManager.PlayButtonClickSound();
        this.selectedOptionIndex = _clickContainer.name;
        this.DisableAllImageAndText();
        this.scene.uiPanel.ShowCheckButton();
        // console.log('selectedoption',this.selectedOptionIndex);
        _clickContainer.list[0].setVisible(true);
        _clickContainer.list[1].setTint(0x298A91);
        _clickContainer.list[2].setFill('#ffffff');
        if (_clickContainer.list[2].text.match(Global.GetCorrectAnswerData())) {
            // console.log('container2',_clickContainer.list[2]);
            this.scene.isCorrect = true;
        } else {
            this.scene.isCorrect = false;
        }
        // console.log('CheckScene',this.scene.isCorrect)
    }

    OnShowResult() {
        // console.log('slugid', this.slugId);
        // this.DeactiveVideoAndVideoButton();
        // this.videoObj.DeactiveVideoAndVideoButton();
        // this.DisableAllOptionButton();
        // console.log('CheckSlugandtype',this.slugId,this.questionType)
        if (this.questionType == "IMAGE_OR_VIDEO") {
            this.postScore = 0;
            // console.log("show result of image or video module",this.questionType);
            this.DisableAllOptionButton();
            // console.log("ImageOrVideo")
            if (this.scene.isCorrect) {
                this.postScore = 2;
                this.scene.gameScore += 2;
                console.log('this.scene.gameScore', this.scene.gameScore);
                console.log(this.selectedOptionIndex);
                SoundManager.PlayCorrectAnswerSound();
                this.scene.uiPanel.SetMessageAsPerAnswer('right_icon', Global.GetCorrectAnswerMessage(), '#76b750');
                this.SetColorOfOptionButton(0x98d873);
                this.PlayCorrectAnswerEffect(this.optionArray, this.selectedOptionIndex);
                this.ShowWinShadow();
                this.scene.ShowWinEffect(this.optionArray[this.selectedOptionIndex].x, this.optionArray[this.selectedOptionIndex].y, 1);
                this.scene.uiPanel.PlayCharacterRightAnswerAnimation();
            } else {
                this.postScore = 0;
                for(let i = 0 ; i < 4;i++){
                   if( this.optionArray[i].list[2].text == Global.GetCorrectAnswerData()){
                    this.SetCorrectColorOfOptionButton(0x98d873,i);
                    this.PlayCorrectAnswerEffect(this.optionArray, i);
                   }
                }
                console.log(this.optionArray)
                SoundManager.PlayWrongAnswerSound();
                this.scene.uiPanel.SetMessageAsPerAnswer('wrong_icon', Global.GetWrongAnswerMessage(), '#ff5d5d');
                this.SetColorOfOptionButton(0xeb2f06);
                // this.PlayCorrectAnswerEffect(this.optionArray, this.selectedOptionIndex);
                this.PlayWrongAnswerEffect(this.optionArray, this.selectedOptionIndex);
                this.scene.uiPanel.PlayCharacterWrongAnswerAnimation();
            }
        }
        let questionIdArray = Global.GetJSONId().QuestionId;
        console.log('getId', this.answerCount,Global.GetCorrectAnswerData());
        this.scene.uiPanel.SetAttemptedQuestionData(questionIdArray[this.answerCount], Global.GetCorrectAnswerData(), this.postScore , this.scene.isCorrect,this.answerCount);
    }

    // DeactiveVideoAndVideoButton() {
    //     if (this.questionVideo != null && this.playPauseButton != null) {
    //         this.questionVideo.removeInteractive();
    //         this.isVideoPlaying = false;
    //         this.questionVideo.stop();
    //         this.playPauseButton.setVisible(true);
    //     }
    // }
    ShowOptionButton() {
        this.TweenOptionButton(this.optionArray, this.tweenAnimationDelay);
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

    DisableAllOptionButton() {
        for (let i = 0; i < this.optionArray.length; i++) {
            this.optionArray[i].removeInteractive();
        }
    }

    DisableAllImageAndText() {
        for (let i = 0; i < this.optionArray.length; i++) {
            this.optionArray[i].list[1].clearTint();
            this.optionArray[i].list[2].setFill('#000000');
        }
    }
    SetColorOfOptionButton(_color) {
        this.optionArray[this.selectedOptionIndex].list[1].setTint(_color);
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
}

export default ImageOrVideoModule;