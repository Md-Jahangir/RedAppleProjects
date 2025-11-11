import { Global } from "../Pattern/Global.js";
import UIPanel from '../UIPanel.js';
import McqModule from '../Pattern/McqModule.js';
import PairMatchingModule from '../Pattern/PairMatchingModule.js';
import ImageOrVideoModule from '../Pattern/ImageOrVideoModule.js';
import DragModule from '../Pattern/DragModule.js';
import FillTheBlanksModule from '../Pattern/FillTheBlanksModule.js';
import SlideModule from '../Pattern/SlideModule.js';
import VideoModule from '../Pattern/VideoModule.js';
import QuizCompleted from "../QuizCompleted.js";
import ScoreModule from "../ScoreModule.js";
import { Server } from "../Server.js";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene")
        this.winEffect;
        this.isCorrect = false;
        this.uiPanel = null;
        this.mcqModule = null;
        this.pairMatchingModule = null;
        this.imageOrVideoModule = null;
        this.dragModule = null;
        this.fillTheBlanksModule = null;
        this.slideModule = null;
        this.scoreModule = null;

        this.gameScore = 0;
        this.questionCounter = 0;
        this.currentModule = null;
        this.quizCompleted = null;
        // this.updateScoreBar = null;
    }
    init() {
        this.uiPanel = new UIPanel(this);
        this.scoreModule = new ScoreModule(this);
    }
    preload() { }
    create() {
        this.cameras.main.setBackgroundColor(0xffffff);
        this.QuizStart();
        this.QuizResume();
        this.VisibleModule();
        this.CreateCharacterAnimation();
        this.CreateWinEffect();

        // setTimeout(() => {
        //     this.uiPanel.PlayCharacterIdleAnimation();
        // }, 500);
    }

    VisibleModule() {
        setTimeout(() => {
            this.uiPanel.PlayCharacterIdleAnimation();
        }, 500);
        let questiontypeLength = Global.GetJsonObjectData().QuestionType.length;
        let slug = '';
        let type = '';
        // console.log("Question Type length ",questiontypeLength);
        // console.log("The question type......................", Global.GetJsonObjectData().QuestionType.length + "The answercount data........." + Global.GetAnswerCountdata() + "..............." + questiontypeLength);
        console.log('GlobalAnswerCount',Global.GetAnswerCountdata())
        if (Global.GetAnswerCountdata() == -1 ){
            console.log('GetVideoJsonObjectData',Global.GetVideoJsonObjectData())
            slug = Global.GetVideoJsonObjectData().QuestionType.slug;
            type = Global.GetVideoJsonObjectData().QuestionType.type;
           let startModule =  new VideoModule(this, Global.GetVideoJsonObjectData().QuestionType.Elements, slug, type)
        }
        else if (Global.GetAnswerCountdata() < questiontypeLength && Global.GetAnswerCountdata() >= 0 ) {
            // console.log("this.questionCounter ", this.questionCounter);
            // console.log("QuestionType ", Global.GetJsonObjectData().QuestionType[this.questionCounter]);
            // switch (Global.GetJsonObjectData().QuestionType[this.questionCounter].type) {
            // console.log("Question Type",Global.GetJsonObjectData().QuestionType[Global.answerCountData].type);
            slug = Global.GetJsonObjectData().QuestionType[Global.answerCountData].slug;
            type = Global.GetJsonObjectData().QuestionType[Global.answerCountData].type;
            console.log("Load_module", slug, type)
            switch (Global.GetJsonObjectData().QuestionType[Global.answerCountData].type) {
                case "MCQ":
                    // this.mcqModule = 
                    this.currentModule = new McqModule(this, Global.GetJsonObjectData().QuestionType[Global.answerCountData].Elements, slug, type);
                    console.log("This is MCQ Module");
                    break;
                case "PAIR_MATCHING":
                    // this.pairMatchingModule =
                    this.currentModule = new PairMatchingModule(this, Global.GetJsonObjectData().QuestionType[Global.answerCountData].Elements, slug, type);
                    console.log("This is PAIR_MATCHING Module");
                    break;
                case "IMAGE_OR_VIDEO":
                    // this.imageOrVideoModule =
                    this.currentModule = new ImageOrVideoModule(this, Global.GetJsonObjectData().QuestionType[Global.answerCountData].Elements, slug, type);
                    console.log("This is image video Module");
                    break;
                case "DRAG":
                    // this.dragModule =
                    this.currentModule = new DragModule(this, Global.GetJsonObjectData().QuestionType[Global.answerCountData].Elements);
                    console.log("This is DRAG Module");
                    break;
                case "FILL_THE_BLANKS":
                    // this.fillTheBlanksModule =
                    this.currentModule = new FillTheBlanksModule(this, Global.GetJsonObjectData().QuestionType[Global.answerCountData].Elements, slug, type);
                    console.log("This is FILL_THE_BLANKS Module");
                    break;
                case "SLIDE":
                    // this.slideModule =
                    this.currentModule = new SlideModule(this, Global.GetJsonObjectData().QuestionType[Global.answerCountData].Elements, slug, type);
                    console.log("This is SLIDE Module");
                    break;
                case "Video_Lesson":
                    this.currentModule = new VideoModule(this, Global.GetJsonObjectData().QuestionType[Global.answerCountData].Elements, slug, type)
                    break;
                default:
                    //default
                    break;
            }
        } else {
            console.log("Quiz Completeed");
            this.EndQuiz()
            //  this.currentModule = new QuizCompleted(this);
            //  this.currentModule.QuizCompletedPopup();

        }

    }

    async QuizStart() {
        let startQuiz = await Server.StartQuiz()
            .then(startData => {
                console.log(startData, attemptId);
                attemptId = startData.attempt_id;
                Server.attemptId = attemptId;
                this.SetCookie('attemptId', attemptId, 1);//Set Cookie for 1 days named as attemptId recieved on Quiz start 
                console.log('attemptId', attemptId);
            })
            .catch(error => {
                console.error('Error starting quiz:', error);
            });
    }
    async QuizResume() {
        let resumeQuiz = await Server.ResumeQuiz()
            .then(resumeData => {
                console.log(resumeData, attemptId);
                attemptId = resumeData.attempt_id;
                Server.attemptId = attemptId;
                // this.SetCookie('attemptId', attemptId, 1);//Set Cookie for 1 days named as attemptId recieved on Quiz start 
                console.log('attemptId', attemptId);
            })
            .catch(error => {
                console.error('Error starting quiz:', error);
            });
    }

    async EndQuiz() {
        let attemptId = this.GetCookie('attemptId');
        let endQuiz = await Server.EndQuiz(Server.studentId, Server.id, attemptId, Server.badges);
    }



    SetCookie(name, value, days) {
        console.log(name, value, days)
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + value + expires + '; path=/';
        console.log('SetCookies', document.cookie);
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
    //===================== Create Win Effect =============================
    CreateWinEffect() {
        this.winEffect = this.add.sprite(Math.round(game.config.width / 2), Math.round(game.config.height / 2), 'win_spritesheet');
        this.winEffect.setVisible(false);
        this.winEffect.setTint('0xfeca57');
        this.anims.create({
            key: 'win_blast_anim',
            frames: this.anims.generateFrameNumbers('win_spritesheet', {}),
            frameRate: 25,
            hideOnComplete: true
        });
    }
    ShowWinEffect(_posX, _posY, _scale) {
        this.winEffect.setVisible(true);
        this.winEffect.setPosition(_posX, _posY,);
        this.winEffect.setScale(_scale);
        this.winEffect.play('win_blast_anim');
    }

    //###################################################

    //===================== Create Character animation =============================
    CreateCharacterAnimation() {
        this.anims.create({
            key: 'character_anim',
            frames: this.anims.generateFrameNumbers('character', { start: 0, end: 36 }),
            frameRate: 30,
            repeat: 3,
        });
    }

    UpdateScoreBar() {
        // let questiontypeLength = Global.GetJsonObjectData().QuestionType.length;
        // this.updateScoreBar = 1467/questiontypeLength * 259;
        // this.uiPanel.scorebase.scaleX(this.updateScoreBar)
        // console.log(this.updateScoreBar)
    }
    // ChangeModule() {
    //     this.questionCounter += 1;
    //     this.VisibleModule();
    // }
    //###################################################
}