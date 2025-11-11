import { SoundManager } from "./SoundManager.js";
import { Global } from "./Pattern/Global.js";
import { Server } from "./Server.js";

class UIPanel {
    constructor(scene) {
        this.scene = scene;
        this.skipButton;
        this.startButton;
        this.checkButton;
        this.skipButtonText;
        this.checkButtonText;
        this.messageContainer;
        this.messageIcon;
        this.messagetext;
        this.questionText;

        this.animationInterval = null;
        this.progressBar = null;
        this.loadingText = null;
        this.loading = null;
        this.scoreBase = null;
        this.scoreBar = null;
        this.updateScoreBar = 0;
        this.spineArrayRightAnswer = [];
        this.spineArrayWrongAnswer = [];
        this.rndArray = [];
       

        this.CreateUIAssets();
    }
    CreateUIAssets() {
        this.topBase = this.scene.add.image(Math.round(game.config.width / 2), Math.round(game.config.height / 2) - 505, 'top_base').setOrigin(0.5, 0).setVisible(false);
        this.logo = this.scene.add.image(this.topBase.x - 855, this.topBase.y + 30, 'logo').setOrigin(0.5).setVisible(false);
        this.dashboardText = this.scene.add.image(this.topBase.x - 625, this.topBase.y + 32, 'dashboard_text').setOrigin(0.5).setVisible(false);
        this.lessonsText = this.scene.add.image(this.topBase.x - 504, this.topBase.y + 43, 'lessons_text').setOrigin(0.5).setVisible(false);
        this.badgesText = this.scene.add.image(this.topBase.x - 396, this.topBase.y + 32, 'badges_text').setOrigin(0.5).setVisible(false);
        this.notificationIcon = this.scene.add.image(this.topBase.x + 702, this.topBase.y + 32, 'notification_icon').setOrigin(0.5).setVisible(false);
        this.profilePicture = this.scene.add.image(this.topBase.x + 872, this.topBase.y + 32, 'profile_pic').setOrigin(0.5).setVisible(false);

        this.bottomBar = this.scene.add.image(Math.round(game.config.width / 2), Math.round(game.config.height / 2) + 360, 'one_pixel').setOrigin(0.5).setScale(1920, 2).setAlpha(0.5);

        this.CreateQuestionArea();
        this.CreateSkipButton();
        this.CreateCheckButton();
        this.CreateNextButton();
        this.CreateStartButton();
        this.CreateMessageArea();
        this.CreateLoader();
        this.ScoreBar();

        // this.character = this.scene.add.sprite(30, Math.round(game.config.height / 2) + 240, 'character').setOrigin(0, 0.5);
        // this.animationInterval = setInterval(() => {
        //     this.PlayCharacterAnimation();
        // }, 10000);

        // this.character = this.scene.add.sprite(30, Math.round(game.config.height / 2) + 240, 'character').setOrigin(0, 0.5);
        // for(let i = 1 ; i< 12;i++){
        // this.character1 = this.scene.add.spine(Math.round(game.config.width / 2) - 850, Math.round(game.config.height / 2) + 320, 'character1').setScale(scaleFactorX * 0.5, scaleFactorX * 0.5);
        // this.character.depth = 2;
        // this.character.setVisible(true);
        // console.log(this.character)
        // }
        this.character = this.scene.add.spine(Math.round(game.config.width / 2) - 850, Math.round(game.config.height / 2) + 320, 'character_1').setScale(scaleFactorX * 0.5, scaleFactorX * 0.5);
        this.character.depth = 2;
        this.character.setVisible(false);
        console.log('this.character',this.character)
        this.character.state.timeScale = 0.8;

        this.characterConfused = this.scene.add.spine(Math.round(game.config.width / 2) - 850, Math.round(game.config.height / 2) + 320, 'character_2').setScale(scaleFactorX * 0.5, scaleFactorX * 0.5);
        this.characterConfused.depth = 2;
        this.characterConfused.setVisible(false);
        this.characterConfused.state.timeScale = 0.8;

        this.characterDance = this.scene.add.spine(Math.round(game.config.width / 2) - 850, Math.round(game.config.height / 2) + 320, 'character_3').setScale(scaleFactorX * 0.5, scaleFactorX * 0.5);
        this.characterDance.depth = 2;
        this.characterDance.setVisible(false);
        this.characterDance.state.timeScale = 0.8;

        this.characterDoorShut = this.scene.add.spine(Math.round(game.config.width / 2) - 850, Math.round(game.config.height / 2) + 320, 'character_4').setScale(scaleFactorX * 0.5, scaleFactorX * 0.5);
        this.characterDoorShut.depth = 2;
        this.characterDoorShut.setVisible(false);
        this.characterDoorShut.state.timeScale = 0.8;

        this.characterFlying = this.scene.add.spine(Math.round(game.config.width / 2) - 850, Math.round(game.config.height / 2) + 320, 'character_5').setScale(scaleFactorX * 0.5, scaleFactorX * 0.5);
        this.characterFlying.depth = 2;
        this.characterFlying.setVisible(false);
        this.characterFlying.state.timeScale = 0.8;

        this.characterLightBulb = this.scene.add.spine(Math.round(game.config.width / 2) - 850, Math.round(game.config.height / 2) + 320, 'character_6').setScale(scaleFactorX * 0.5, scaleFactorX * 0.5);
        this.characterLightBulb.depth = 2;
        this.characterLightBulb.setVisible(false);
        this.characterLightBulb.state.timeScale = 0.8;

        this.characterSleepOff = this.scene.add.spine(Math.round(game.config.width / 2) - 850, Math.round(game.config.height / 2) + 320, 'character_7').setScale(scaleFactorX * 0.5, scaleFactorX * 0.5);
        this.characterSleepOff.depth = 2;
        this.characterSleepOff.setVisible(false);
        this.characterSleepOff.state.timeScale = 0.8;

        this.characterSpiralling = this.scene.add.spine(Math.round(game.config.width / 2) - 850, Math.round(game.config.height / 2) + 320, 'character_8').setScale(scaleFactorX * 0.5, scaleFactorX * 0.5);
        this.characterSpiralling.depth = 2;
        this.characterSpiralling.setVisible(false);
        this.characterSpiralling.state.timeScale = 0.8;

        this.characterThinking = this.scene.add.spine(Math.round(game.config.width / 2) - 850, Math.round(game.config.height / 2) + 320, 'character_9').setScale(scaleFactorX * 0.5, scaleFactorX * 0.5);
        this.characterThinking.depth = 2;
        this.characterThinking.setVisible(false);
        this.characterThinking.state.timeScale = 0.8;

        this.characterTrunkCovering = this.scene.add.spine(Math.round(game.config.width / 2) - 850, Math.round(game.config.height / 2) + 320, 'character_10').setScale(scaleFactorX * 0.5, scaleFactorX * 0.5);
        this.characterTrunkCovering.depth = 2;
        this.characterTrunkCovering.setVisible(false);
        this.characterTrunkCovering.state.timeScale = 0.8;

        this.characterWhistling = this.scene.add.spine(Math.round(game.config.width / 2) - 850, Math.round(game.config.height / 2) + 320, 'character_11').setScale(scaleFactorX * 0.5, scaleFactorX * 0.5);
        this.characterWhistling.depth = 2;
        this.characterWhistling.setVisible(false);
        this.characterWhistling.state.timeScale = 0.8;

        this.spineArrayRightAnswer.push( this.characterFlying, this.characterLightBulb, this.characterDance, this.characterSpiralling, this.characterWhistling)
        this.spineArrayWrongAnswer.push( this.characterConfused, this.characterSleepOff, this.characterThinking, this.characterTrunkCovering)

        // this.character.play("idle", true);
        // this.character.play("idle_2", true);
        // this.character.play("right_answer", true);
        // this.character.play("wrong_answer", true);
    }
   
    CreateQuestionArea() {
        this.questionBase = this.scene.add.image(Math.round(game.config.width / 2), Math.round(game.config.height / 2) - 350, 'question_base').setOrigin(0.5);
        let questionTextStyle = { fontFamily: 'Rubik_SemiBold', fontSize: '35px', fill: '#3A3843', fontStyle: 'bold', align: 'center', wordWrap: { width: Math.round(this.questionBase.width - 20), height: Math.round(this.questionBase.height - 5) } };
        this.questionText = this.scene.add.text(this.questionBase.x, this.questionBase.y, "Here will be the Question shown", questionTextStyle).setOrigin(0.5);
    }
    SetQuestionFromServer(_question) {
        // console.log('_question',_question)
        this.questionText.setText(_question);
        // console.log('Questionlength', _question.length, this.questionText)

        if (_question.length >= 72) {
            this.questionText.setStyle({ fontSize: '30px' });
        } else if (_question.length >= 100) {
            this.questionText.setStyle({ fontSize: '25px' });
        } else { }
    }

    //======================= SKIP BUTTON ====================================
    CreateSkipButton() {
        let buttonTextStyle = { fontFamily: 'Rubik_Bold', fontSize: '19px', fill: '#000000', align: 'center' };
        this.skipButtonContainer = this.scene.add.container(Math.round(game.config.width / 2) - 790, Math.round(game.config.height / 2) + 455);
        this.skipButton = this.scene.add.image(0, 0, 'check_button_base').setOrigin(0.5);
        this.skipButtonText = this.scene.add.text(this.skipButton.x, this.skipButton.y, 'Skip', buttonTextStyle).setOrigin(0.5);
        this.skipButtonContainer.add([this.skipButton, this.skipButtonText]);
        this.skipButtonContainer.setSize(this.skipButton.displayWidth, this.skipButton.displayHeight);
        this.skipButtonContainer.on('pointerdown', this.OnSkipButtonPressed, this);
        this.skipButtonContainer.on('pointerup', this.OnSkipButtonReleased, this);
    }

    ShowSkipButton() {
        this.skipButtonContainer.setInteractive({ useHandCursor: true });
        this.skipButton.setTint(0xF86D28);
        this.skipButtonText.setFill('#ffffff');
    }
    HideSkipButton() {
        this.skipButtonContainer.removeInteractive();
        this.skipButtonText.setFill('#000000');
        this.skipButton.clearTint();
    }

    OnSkipButtonPressed() {
        SoundManager.PlayButtonClickSound();
        this.ScaleDownTween(this.skipButtonContainer);
    }
    OnSkipButtonReleased() {
        this.ScaleUpTween(this.skipButtonContainer);
    }

    //##############################################################################

    //======================== START BUTTON =======================================
    CreateStartButton() {
        // console.log("Create Start Button")
        let buttonTextStyle = { fontFamily: 'Rubik_Bold', fontSize: '19px', fill: '#000000', align: 'center' };
        // this.startButtonContainer = this.scene.add.container(Math.round(game.config.width / 2) + 790, Math.round(game.config.height / 2) + 455);
        this.startButtonContainer = this.scene.add.container(Math.round(game.config.width / 2), Math.round(game.config.height / 2) - 60);
        this.startButtonContainer.depth = 5;
        this.startButton = this.scene.add.image(0, 0, 'check_button_base').setOrigin(0.5);
        this.startButtonText = this.scene.add.text(this.startButton.x, this.startButton.y, 'Start', buttonTextStyle).setOrigin(0.5);
        this.startButtonContainer.add([this.startButton, this.startButtonText]);
        this.startButtonContainer.setSize(this.startButton.displayWidth, this.startButton.displayHeight);
        this.startButtonContainer.on('pointerdown', this.OnStartButtonPressed, this);
        this.startButtonContainer.on('pointerup', this.OnStartButtonReleased, this);
        this.startButtonContainer.setVisible(false);
    }

    ShowStartButton() {
        // console.log("Show Start Button");
        this.startButtonContainer.setVisible(true);
        this.checkButtonContainer.setVisible(false);
        this.nextButtonContainer.setVisible(false);
        this.startButtonContainer.setInteractive({ useHandCursor: true });
        this.startButton.setTint(0xF86D28);
        this.startButtonText.setFill('#ffffff');
    }
    HideStartButton() {
        // console.log("HideStartButton");
        this.startButtonContainer.setVisible(false);
        this.nextButtonContainer.setVisible(true);
        this.startButtonContainer.removeInteractive();
        this.startButtonText.setFill('#000000');
        this.startButton.clearTint();
        this.DeactiveCheckButton();
    }

    DeactiveStartButton() {
        this.startButtonContainer.removeInteractive();
        this.startButtonText.setFill('#000000');
        this.startButton.clearTint();
    }

    OnStartButtonPressed() {
        SoundManager.PlayButtonClickSound();
        this.ScaleDownTween(this.startButtonContainer);
    }
    OnStartButtonReleased() {
        // console.log("OnStartButtonReleased");
        this.ScaleUpTween(this.startButtonContainer);
        this.ShowNextButton();
        this.scene.game.events.emit("evtOnStartButtonPressed");
    }

    //##############################################################################

    //======================== NEXT BUTTON =======================================
    CreateNextButton() {
        // console.log("CreateNextButton");
        let buttonTextStyle = { fontFamily: 'Rubik_Bold', fontSize: '19px', fill: '#000000', align: 'center' };
        this.nextButtonContainer = this.scene.add.container(Math.round(game.config.width / 2) + 790, Math.round(game.config.height / 2) + 455);
        this.nextButton = this.scene.add.image(0, 0, 'check_button_base').setOrigin(0.5);
        this.nextButtonText = this.scene.add.text(this.nextButton.x, this.nextButton.y, 'Next', buttonTextStyle).setOrigin(0.5);
        this.nextButtonContainer.add([this.nextButton, this.nextButtonText]);
        this.nextButtonContainer.setSize(this.nextButton.displayWidth, this.nextButton.displayHeight);
        this.nextButtonContainer.on('pointerdown', this.OnNextButtonPressed, this);
        this.nextButtonContainer.on('pointerup', this.OnNextButtonReleased, this);
        this.nextButtonContainer.setVisible(false);
    }

    ShowNextButton() {
        this.nextButtonContainer.setVisible(true);
        this.checkButtonContainer.setVisible(false);
        this.startButtonContainer.setVisible(false);
        this.nextButtonContainer.setInteractive({ useHandCursor: true });
        this.nextButton.setTint(0xF86D28);
        this.nextButtonText.setFill('#ffffff');
    }
    HideNextButton() {
        this.nextButtonContainer.setVisible(false);
        this.checkButtonContainer.setVisible(true);
        this.nextButtonContainer.removeInteractive();
        this.nextButtonText.setFill('#000000');
        this.nextButton.clearTint();
        this.DeactiveCheckButton();
    }

    DeactiveNextButton() {
        this.nextButtonContainer.removeInteractive();
        this.nextButtonText.setFill('#000000');
        this.nextButton.clearTint();
    }

    OnNextButtonPressed() {
        SoundManager.PlayButtonClickSound();
        this.ScaleDownTween(this.nextButtonContainer);
        this.scene.game.events.emit("evtClearContainer");
        // console.log(this.scoreBar);

    }
    OnNextButtonReleased() {
        this.ScaleUpTween(this.nextButtonContainer);
        this.HideNextButton();
        this.PlayCharacterIdleAnimation();
        // this.character.setVisible(false);
        // this.PlayOwlCharacterDoorShutAnimation();
        // console.log("next button clicked");
        this.scene.game.events.emit("evtHideSentence");
        // this.scene.currentModule.HidePopup();
        setTimeout(() => {
            Global.answerCountData++;
            Global.SetAnswerCountData(Global.answerCountData);
            // this.scene.mcq.HideQuestion();
            this.scene.VisibleModule();
            this.UpdateScoreBar();
            // this.EnableDisableText(false);
        }, 200);
    }
    ScoreBar() {
        this.scoreBase = this.scene.add.image(Math.round(game.config.width / 2), Math.round(game.config.height / 2) - 410, 'score_base').setOrigin(0.5);
        this.scoreBar = this.scene.add.image(Math.round(game.config.width / 2) - 740, Math.round(game.config.height / 2) - 410, 'score_bar').setOrigin(0, 0.5).setScale(0, 1);
        let questiontypeLength = Global.GetJsonObjectData().QuestionType.length;
        // console.log('questiontypeLength : ', questiontypeLength)
        this.updateScoreBar = (1 / questiontypeLength);
        // console.log('updatescore', this.updateScoreBar, this.scoreBar.width);
        this.scoreBar.scaleX = this.updateScoreBar;
    }
    UpdateScoreBar() {
        let questiontypeLength = Global.GetJsonObjectData().QuestionType.length;
        this.updateScoreBar = parseFloat(this.updateScoreBar) + parseFloat(1 / questiontypeLength);
        this.scoreBar.scaleX = this.updateScoreBar;
    }
    //##############################################################################


    //========================= CHECK BUTTON ======================================
    CreateCheckButton() {
        // console.log("CreateCheckButton");
        let buttonTextStyle = { fontFamily: 'Rubik_Bold', fontSize: '19px', fill: '#000000', align: 'center' };
        this.checkButtonContainer = this.scene.add.container(Math.round(game.config.width / 2) + 790, Math.round(game.config.height / 2) + 455);
        this.checkButton = this.scene.add.image(0, 0, 'check_button_base').setOrigin(0.5);
        this.checkButtonText = this.scene.add.text(this.checkButton.x, this.checkButton.y, 'Check', buttonTextStyle).setOrigin(0.5);
        this.checkButtonContainer.add([this.checkButton, this.checkButtonText]);
        this.checkButtonContainer.setSize(this.checkButton.displayWidth, this.checkButton.displayHeight);
        this.checkButtonContainer.on('pointerdown', this.OnCheckButtonPressed, this);
        this.checkButtonContainer.on('pointerup', this.OnCheckButtonReleased, this);
    }

    ShowCheckButton() {
        this.checkButtonContainer.setInteractive({ useHandCursor: true });
        this.checkButton.setTint(0xF86D28);
        this.checkButtonText.setFill('#ffffff');
    }
    DeactiveCheckButton() {
        this.checkButtonContainer.removeInteractive();
        this.checkButtonText.setFill('#000000');
        this.checkButton.clearTint();
    }
    HideCheckButton() {
        this.checkButtonContainer.setVisible(false);
    }

    async OnCheckButtonPressed() {
        SoundManager.PlayButtonClickSound();
        this.ScaleDownTween(this.checkButtonContainer);
        this.checkButton.setTint(0xF86D28);
        // this.PlayOwlCharacterLightBulbAnimation();
        let attemptId = this.GetCookie('attemptId');
        let saveQuestionData = await Server.SaveQuestion(Server.studentId, Server.id, attemptId, Server.badges);
        // console.log(saveQuestionData,attemptId);
    }

    GetCookie(name) {
        // console.log(name)
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    }
    OnCheckButtonReleased() {
        this.ScaleUpTween(this.checkButtonContainer);
        this.scene.game.events.emit("evtShowResult");
        // this.ShowNextButton();
        this.ShowMessageContainer();
        this.ShowNextButton();

        // setTimeout(() => {
        //     Global.answerCountData++;
        //     Global.SetAnswerCountdata(Global.answerCountData);
        //     this.scene.mcq.HideQuestion();
        //     this.scene.VisibleModule();
        //     this.EnableDisableText(false);
        // }, 2000);
    }
    //##############################################################################

    //========================= CORRECT OR WRONG MESSAGE AREA ======================================
    CreateMessageArea() {
        this.messageContainer = this.scene.add.container(Math.round(game.config.width / 2), Math.round(game.config.height / 2));
        this.overlay = this.scene.add.image(Math.round(game.config.width / 2), Math.round(game.config.height / 2), 'one_pixel').setOrigin(0.5).setScale(3000, 3000).setAlpha(0.001);
        this.overlay.setInteractive();
        this.messageBase = this.scene.add.sprite(0, 0, 'message_base').setOrigin(0.5);
        // let messageTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '55px', fill: '#FF5D5D', fontStyle: 'bold', align: 'left' };
        // this.messagetext = this.scene.add.text(-90, -50, "Come on, you can do it !", messageTextStyle).setOrigin(0, 0.5);
        let messageTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '55px', fill: '#FF5D5D', fontStyle: 'bold', align: 'center' };
        this.messagetext = this.scene.add.text(0, -40, "Come on, you can do it !", messageTextStyle).setOrigin(0.5);
        this.messageIcon = this.scene.add.sprite(this.messagetext.x - 30, this.messagetext.y, 'wrong_icon').setOrigin(1, 0.5);
        this.messageIcon.setVisible(false);
        this.messageContainer.add([this.overlay, this.messageBase, this.messageIcon, this.messagetext]);
        // this.messageContainer.add([this.overlay, this.messageBase, this.messagetext]);
        this.messageContainer.depth = 2;
        this.messageContainer.setScale(0, 0);
    }

    ShowMessageContainer() {
        let scaleTween = this.scene.add.tween({
            targets: [this.messageContainer],
            delay: 700,
            scaleX: 1,
            scaleY: 1,
            ease: 'Bounce.easeOut',
            duration: 500,
            callbackScope: this,
            onComplete: function () {
                this.HideMessageContainer();
            }
        });
    }

    HideMessageContainer() {
        let alphaTween = this.scene.add.tween({
            targets: [this.messageContainer],
            delay: 800,
            alpha: 0,
            ease: 'Linear',
            duration: 1200,
            callbackScope: this,
            onComplete: function () {
                this.messageContainer.setScale(0, 0);
                this.messageContainer.setAlpha(1);
                this.scene.game.events.emit("evtHideMessage");
                // this.ShowNextButton();
            }
        });
    }

    SetMessageAsPerAnswer(_icon, _message, _textColor) {
        this.messageIcon.setTexture(_icon);
        this.messagetext.setText(_message);
        this.messagetext.setFill(_textColor);
    }
    CreateLoader() {
        this.loading = this.scene.add.sprite(Math.round(game.config.width / 2), Math.round(game.config.height / 2), "loading_wheel").setOrigin(0.5, 0.5).setScale(scaleFactorX, scaleFactorY);
        this.scene.anims.create({
            key: "loading_anim",
            frameRate: 5,
            frames: this.scene.anims.generateFrameNumbers("loading_wheel", { start: 0, end: 2 }),
            repeat: -1
        });
        this.loading.setVisible(false);
    }
    ShowLoader() {
        this.loading.setVisible(true);
        this.loading.play("loading_anim");
    }
    HideLoader() {
        this.loading.setVisible(false);
        // this.scene.anims.pauseAll();
    }

    //##############################################################################

    //============================== BuTTON TWEEN EFFECT==============================
    ScaleDownTween(_param) {
        this.scene.tweens.add({
            targets: [_param],
            scaleX: 0.95,
            scaleY: 0.95,
            alpha: 0.5,
            case: 'linear',
            duration: 100
        });
    }
    ScaleUpTween(_param) {
        this.scene.tweens.add({
            targets: [_param],
            scaleX: 1,
            scaleY: 1,
            alpha: 1,
            case: 'linear',
            duration: 100
        });
    }

    //##############################################################################

    //=================== Play/Stop character animation ======================================
    PlayCharacterAnimation() {
        // let rnd = this.GetRandomNumber(1, 11);
        // this.character.setTexture('character_' + rnd);
        // if(rnd ==1 ){
        //     this.character.play('idle2',true);
        // }else{
        //     this.character.play('animation',true);
        // }

        // window.alert(rnd)
        // if (rnd == 0) {
        //     // this.character.play("idle", true);
        //     this.PlayOwlCharacterDanceAnimation();
        // } else {
        //     // this.character.play("idle2", true);
        //     this.PlayOwlCharacterFlyingAnimation();
        // }
        // this.character.play('character_anim');
    }
    PlayCharacterIdleAnimation() {

        this.character.setVisible(true);
        let rnd = this.GetRandomNumber(0, 2);
        // console.log('RandomNumberIdle', rnd);
        this.rndArray.push(rnd);
        if (rnd == 0) {
            this.character.play('idle_2', true);
        } else {
            this.character.play("idle", true);
        }

    }

    // PlayOwlCharacterDanceAnimation() {
    //         this.character.setVisible(false);
    //         this.characterDance.setVisible(true);
    //         this.characterDance.play("animation", true,1);
    //         this.characterDance.on('complete', (spine) => {
    //             console.log("PlayOwlCharacter1")
    //             this.characterDance.setVisible(false);
    //             // this.PlayCharacterIdleAnimation();
    //         });
    // }
    // PlayOwlCharacterConfusedAnimation() {
    //     this.character.setVisible(false);
    //     this.characterConfused.setVisible(true);
    //         this.characterConfused.play("animation", true,1);
    //         this.characterConfused.on('complete', (spine) => {
    //             this.characterConfused.setVisible(false);
    //             // this.PlayCharacterIdleAnimation();
    //         });
    // }
    // PlayOwlCharacterDoorShutAnimation() {
    //     this.character.setVisible(false);
    //     this.characterDoorShut.setVisible(true);
    //         this.characterDoorShut.play("animation", true,1);
    //     this.characterDoorShut.on('complete', (spine) => {
    //         this.characterDoorShut.setVisible(false);
    //         // this.PlayCharacterIdleAnimation();
    //     });
    // }
    // PlayOwlCharacterFlyingAnimation() {
    //     this.character.setVisible(false);
    //     this.characterFlying.setVisible(true);
    //         this.characterFlying.play("animation", true,1);
    //         this.characterFlying.on('complete', (spine) => {
    //             this.characterFlying.setVisible(false);
    //             // this.PlayCharacterIdleAnimation();
    //         });

    // }
    // PlayOwlCharacterLightBulbAnimation() {
    //     this.character.setVisible(false);
    //     this.characterLightBulb.setVisible(true);
    //         this.characterLightBulb.play("animation", true);
    //         this.characterLightBulb.on('complete', (spine) => {
    //             this.characterLightBulb.setVisible(false);
    //             // this.PlayCharacterIdleAnimation();
    //             this.character.setVisible(true);
    //         });
    // }

    PlayCharacterRightAnswerAnimation() {
        // console.log('this.rnd',this.rndArray)
        // this.spineArray[this.rndArray[0]].setVisible(false);
        // this.characterDance.setVisible(true);
        // this.characterDance.play("animation", true, 1);
        // this.characterDance.on('complete', (spine) => {
        //     this.characterDance.setVisible(false);
        //     this.spineArray[this.rndArray[0]].setVisible(true);
        // });
        this.character.setVisible(false);
        let randomRightAnswer = Math.floor(Math.random() * (5-0));
        // console.log('RandomRightAnswer' , randomRightAnswer);
        if(randomRightAnswer == 0  ){
            this.character.setVisible(true);
            this.character.play('right_answer',false);
            this.character.on('complete', (spine) => {
                // console.log('RightAnswer Complet')
                    this.character.setVisible(false);
                    // this.character.play('right_answer', false);
                    this.PlayCharacterIdleAnimation();
                    // this.spineArray[this.rndArray[0]].setVisible(true);
                });
        } else{
            this.character.setVisible(false);
             this.spineArrayRightAnswer[randomRightAnswer].setVisible(true);
             this.spineArrayRightAnswer[randomRightAnswer].play('animation', false);
             this.spineArrayRightAnswer[randomRightAnswer].on('complete', (spine) => {
                this.spineArrayRightAnswer[randomRightAnswer].setVisible(false);
                this.character.setVisible(false);
                this.PlayCharacterIdleAnimation();
                // this.spineArray[this.rndArray[0]].setVisible(true);
            });

        }
    }
    PlayCharacterWrongAnswerAnimation() {
        this.character.setVisible(false);
        let randomWrongAnswer = Math.floor(Math.random() * (4-0));
        // console.log('RandomRightAnswer' , randomWrongAnswer);
        if(randomWrongAnswer == 0  ){
            this.character.setVisible(true);
            this.character.play('wrong_answer',false);
            this.character.on('complete', (spine) => {
                // console.log('WrongAnswer Complet')
                    this.character.setVisible(false);
                    // this.character.play('right_answer', false);
                    this.PlayCharacterIdleAnimation();
                    // this.spineArray[this.rndArray[0]].setVisible(true);
                });
        } else{
            this.character.setVisible(false);
             this.spineArrayWrongAnswer[randomWrongAnswer].setVisible(true);
             this.spineArrayWrongAnswer[randomWrongAnswer].play('animation', false);
             this.spineArrayWrongAnswer[randomWrongAnswer].on('complete', (spine) => {
                this.spineArrayWrongAnswer[randomWrongAnswer].setVisible(false);
                this.character.setVisible(false);
                this.PlayCharacterIdleAnimation();
                // this.spineArray[this.rndArray[0]].setVisible(true);
            });

        }
    }

    StopCharacterAnimation() {
        // this.character.anims.stop();
        // this.character.setFrame(0);
    }

    GetRandomNumber(_min, _max) {
        let rnd = Math.floor(Math.random() * (_max - _min) + _min);
        return rnd;
    };

    //####################################################
}
export default UIPanel;