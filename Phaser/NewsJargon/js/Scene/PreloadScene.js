import { Global } from "../Pattern/Global.js";
import { Server } from "../Server.js";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super("PreloadScene")
        this.progressBar = null;
        this.fonts = {
            "Rubik_Medium": null,
            "Rubik_Bold": null,
            "Rubik_SemiBold": null,
            "Roboto_Bold": null,
        }
        console.log("PreloadScene");
    }
    preload() {
        this.load.image('progress_base', 'assets/images/progress_base.png');
        this.load.image('progress_bar', 'assets/images/progress_bar.png');
        this.load.json('gameData', 'json/gameData.json');
    }

    create() {
        this.progressBase = this.add.image(Math.round(game.config.width / 2), Math.round(game.config.height / 1.25), "progress_base").setOrigin(0.5, 0.5).setScale(scaleFactorX, scaleFactorX);
        this.progressBar = this.add.image(Math.round(game.config.width / 2), Math.round(game.config.height / 1.25), "progress_bar").setOrigin(0.5, 0.5).setScale(scaleFactorX, scaleFactorX);
        this.progressBar.setCrop(0, 0, 0, this.progressBar.height);

        this.loadFonts();
    }

    async OnReceivedDataFromServer() {
        //====================================================================================
        // let data = this.cache.json.get('gameData');
        // if (data.length == 0) {} else {
        //     Global.SetJsonObjectData(data);
        //     this.LoadAssets();
        // }
        // const studentId = "16";
        // const lessonId = 554;
        // const attemptId = "lession_hyatszwv50wb";
        // const badges = 2;
        console.log('Json Object data', Global.GetJsonObjectData());
        //====================================================================================
        let lessonData = await Server.GetLessonData()
        console.log('lessonData : ', Object.entries(lessonData.quiz_data.quiz_questions));
        let json = this.FormatJson(Object.entries(lessonData.quiz_data.quiz_questions));
        let json1 = this.FormatVideoJson(Object.entries(lessonData.quiz_data.quiz_config));
        console.log("jsonData ", json);
        console.log("jsonData1 ", json1);
        Global.SetJsonObjectData(
            {
                "QuestionType": json
            }
        );
        Global.SetVideoJsonObjectData(
            {
                "QuestionType": json1
            }
        );
        this.LoadAssets();


        // let saveOuestion = await Server.SaveQuestion(studentId, lessonId, attemptId, badges)
        //     .then(saveData => {
        //         console.log(saveData);
        //     })
        //     .catch(error => {
        //         console.error('Error saving question:', error);
        //     });

        // let endQuiz = await Server.EndQuiz(studentId, lessonId, attemptId, badges)
        //     .then(endData => {
        //         console.log(endData);
        //     })
        //     .catch(error => {
        //         console.error('Error ending quiz:', error);
        //     });

        // let resumeQuiz = await Server.ResumeQuiz(studentId, lessonId, attemptId, badges)
        //     .then(resumeData => {
        //         console.log(resumeData);
        //     })
        //     .catch(error => {
        //         console.error('Error ending quiz:', error)
        //     })
    }

    loadFonts() {
        let propNames = Object.getOwnPropertyNames(this.fonts);
        propNames.forEach((fontName, index) => {
            let isLast = index >= propNames.length - 1;
            this.fonts[fontName] = new FontFaceObserver(fontName);
            this.fonts[fontName].load().then(this.fontLoadSuccess.bind(this, fontName, isLast), this.fontLoadError.bind(this, fontName));
        });
    };

    fontLoadSuccess(fontName, isLast) {
        if (isLast) {
            // if (Server.IsUrlParamsMissing()) {
            //     this.scene.start("GameErrorScene");
            // } else {
            this.OnReceivedDataFromServer();
            // }
        }
    };

    fontLoadError(fontName) { };

    LoadAssets() {
        // this.load.crossOrigin = undefined;
        this.load.on('progress', this.LoadProgress, this);
        this.load.on('complete', this.complete, { scene: this.scene });
        this.load.html('video_template', 'assets/video_template.html');

        this.load.image('line_base', 'assets/images/line_base.png');
        this.load.image('thumbs_up', 'assets/images/thumbs_up.png');
        this.load.image('thumbs_down', 'assets/images/thumbs_down.png');

        //UI PANEL
        this.load.image('one_pixel', 'assets/images/ui/one_pixel.png');
        this.load.image('top_base', 'assets/images/ui/top_base.png');
        this.load.image('logo', 'assets/images/ui/logo.png');
        this.load.image('dashboard_text', 'assets/images/ui/dashboard_text.png');
        this.load.image('lessons_text', 'assets/images/ui/lessons_text.png');
        this.load.image('badges_text', 'assets/images/ui/badges_text.png');
        this.load.image('notification_icon', 'assets/images/ui/notification_icon.png');
        this.load.image('profile_pic', 'assets/images/ui/profile_pic.png');
        this.load.image('score_base', 'assets/images/ui/score_base.png');
        this.load.image('score_bar', 'assets/images/ui/score_bar.png');
        this.load.image('question_base', 'assets/images/ui/question_base.png');
        this.load.image('check_button_base', 'assets/images/ui/check_button_base.png');
        this.load.image('wrong_icon', 'assets/images/ui/wrong_icon.png');
        this.load.image('right_icon', 'assets/images/ui/right_icon.png');
        this.load.image('message_base', 'assets/images/ui/message_base.png');
        this.load.image('hand_sprite_single', 'assets/images/ui/hand_sprite_single.png')
        this.load.image('popup_base', 'assets/images/popup_base.png');
        this.load.spritesheet('win_spritesheet', 'assets/images/ui/win_spritesheet.png', {
            frameWidth: 514,
            frameHeight: 514
        });
        this.load.spritesheet('character', 'assets/images/ui/character.png', {
            frameWidth: 256,
            frameHeight: 256
        });
        this.load.spritesheet('loading_wheel', 'assets/images/loading_wheel.png', { frameWidth: (471 / 3), frameHeight: 157 });
        //MODULE_1 (MCQ)
        this.load.image('mcq_option_base', 'assets/images/module1_mcq/mcq_option_base.png');
        this.load.image('mcq_correct_ans_shadow', 'assets/images/module1_mcq/mcq_correct_ans_shadow.png');

        //MODULE_2 (PAIR MATCHING)
        this.load.image('pair_matching_option_base', 'assets/images/module2_pair_mattching/pair_matching_option_base.png');
        this.load.image('pair_matching_correct_ans_shadow', 'assets/images/module2_pair_mattching/pair_matching_correct_ans_shadow.png');
        this.load.image('pair_matching_option_image_0', 'assets/images/module1_mcq/mcq_option_image_0.png');

        //MODULE_3 (IMAGE OR VIDEO)
        this.load.image('video_play_button', 'assets/images/module3_image_or_video/video_play_button.png');
        this.load.image('image_or_video_option_video', 'assets/images/module3_image_or_video/image_or_video_option_video.png');
        // this.load.image('video_base', 'assets/images/module3_image_or_video/video_base.png');

        //MODULE_4 (DRAG)
        this.load.image('drag_module_description_base', 'assets/images/module4_drag/drag_module_description_base.png');
        this.load.image('question_icon', 'assets/images/module4_drag/question_icon.png');

        //MODULE_5 (FILL IN THE BLANKS)

        //MODULE_6 (SLIDE)
        this.load.image('clock_icon', 'assets/images/module6_slide/clock_icon.png');
        this.load.image('slide_module_description_base', 'assets/images/module6_slide/slide_module_description_base.png');
        this.load.image('slide_module_base', 'assets/images/module6_slide/slide_module_base.png');
        this.load.image('slide_module_name_base', 'assets/images/module6_slide/slide_module_name_base.png');
        this.load.image('arrow_active', 'assets/images/module6_slide/arrow_active.png');
        this.load.image('arrow_inactive', 'assets/images/module6_slide/arrow_inactive.png');

        //LOAD AUDIO
        this.load.audio('button_click_sound', 'sounds/button_click_sound.mp3');
        this.load.audio('correct_answer_sound', 'sounds/correct_answer_sound.mp3');
        this.load.audio('wrong_answer_sound', 'sounds/wrong_answer_sound.mp3');
        this.load.audio('clock_ticking_sound', 'sounds/clock_ticking_sound.mp3');

        this.load.setPath('assets/spine/');
        this.load.spine('character_1', 'Owl_V3_A-01_only_layers.json', 'Owl_V3_A-01_only_layers.atlas');
        this.load.spine('character_2', 'Confused_v02.json', 'Confused_v02.atlas')
        this.load.spine('character_3', 'Dancing_02.json', 'Dancing_02.atlas')
        this.load.spine('character_4', 'Door_Shut_02.json', 'Door_Shut_02.atlas')
        this.load.spine('character_5', 'Flying_02.json', 'Flying_02.atlas')
        this.load.spine('character_6', 'Light_Bulb_02.json', 'Light_Bulb_02.atlas')
        this.load.spine('character_7', 'Sleep_Off_02.json', 'Sleep_Off_02.atlas')
        this.load.spine('character_8', 'Spiralling_Up_And_Down_02.json', 'Spiralling_Up_And_Down_02.atlas')
        this.load.spine('character_9', 'Thinking_v02.json', 'Thinking_v02.atlas')
        this.load.spine('character_10', 'Trunk_Covering_Body_v02.json', 'Trunk_Covering_Body_v02.atlas')
        this.load.spine('character_11', 'Whistling_v02.json', 'Whistling_v02.atlas')
        
        this.load.start();
    }

    LoadProgress(percentage) {
        this.progressBar.setCrop(0, 0, this.progressBar.width * percentage, this.progressBar.height);
        percentage = percentage * 100;
    }

    complete(_this) {
        this.scene.start('GameScene');
    }
    FormatVideoJson(_data){
        console.log('FormatVideoJson', _data );
        let tempVar = null;
        tempVar = {
            "type": "Video_Lesson",
            "slug": "video-lesson",
            "Elements": [
                {
                    // "question": "",
                    // "fillTheBlanksQuestion": question,
                    // "options": [
                    //     temp1[1][1],
                    //     temp1[2][1],
                    //     temp1[3][1],
                    //     temp1[4][1]
                    // ],
                    "videoUrl" : _data[2][1]
                    // "answer": temp1[parseInt(temp1[5][1])][1]
                }
            ]
        };
     
        return tempVar;
    }
    FormatJson(_data) {
        let allQuestion = [];
        let temp = null, temp1 = null, temp2 = null;
        console.log('lesson_data', _data);
        _data.forEach(element => {
            console.log(element[1].question_template.slug);
            if (element[1].question_template.slug.match("m5-fib")) {
                temp1 = Object.entries(element[1].question_data);
                console.log("Temp1", temp1);
                temp2 = temp1[0][1].split(" ");
                let question = [], index = null, status = null;
                temp2[index] = temp1[parseInt(temp1[5][1])][1];
                temp2.forEach(element => {
                    if (element.charAt(0) == '_' || element.charAt(0) == '-') {
                        status = 0;
                    } else {
                        status = 1;
                    }
                    question.push(
                        {
                            "text": element,
                            "status": status
                        }
                    )
                });
                temp = {
                    "type": "FILL_THE_BLANKS",
                    "slug": element[1].question_template.slug,
                    "Elements": [
                        {
                            "question": "Drag the correct answer into the gap to complete the sentence.",
                            "slug": element[1].question_template.slug,
                            "fillTheBlanksQuestion": question,
                            "options": [
                                temp1[1][1],
                                temp1[2][1],
                                temp1[3][1],
                                temp1[4][1]
                            ],
                            "answer": temp1[parseInt(temp1[5][1])][1]
                        }
                    ]
                };
                allQuestion.push(temp);
            }
            else if (element[1].question_template.slug.match("m3-img-text")) {
                temp1 = Object.entries(element[1].question_data);
                console.log("Temp1", temp1);
                if (temp1[0][0] != 'question') {
                    temp = {
                        "type": "IMAGE_OR_VIDEO",
                        "slug": element[1].question_template.slug,
                        "Elements": [
                            {
                                "question": '',
                                "imageUrl": temp1[0][1],
                                "videoUrl": "",
                                "options": [
                                    temp1[temp1.length - 5][1],
                                    temp1[temp1.length - 4][1],
                                    temp1[temp1.length - 3][1],
                                    temp1[temp1.length - 2][1]
                                ],
                                "answer": temp1[parseInt(temp1[temp1.length - 1][1])][1]
                            }
                        ]
                    };
                } else {
                    temp = {
                        "type": "IMAGE_OR_VIDEO",
                        "slug": element[1].question_template.slug,
                        "Elements": [
                            {
                                "question": temp1[0][1],
                                "imageUrl": temp1[1][1],
                                "videoUrl": "",
                                "options": [
                                    temp1[temp1.length - 5][1],
                                    temp1[temp1.length - 4][1],
                                    temp1[temp1.length - 3][1],
                                    temp1[temp1.length - 2][1]
                                ],
                                "answer": temp1[parseInt(temp1[temp1.length - 1][1]) + 1][1]
                            }
                        ]
                    };
                }
                allQuestion.push(temp);
            }
        
            else if (element[1].question_template.slug.match("m3-video-text")) {
                temp1 = Object.entries(element[1].question_data);
                console.log("temp1..", temp1);
                temp = {
                    "type": "IMAGE_OR_VIDEO",
                    "slug": element[1].question_template.slug,
                    "Elements": [
                        {
                            "question": temp1[0][1],
                            // "imageUrl": temp1[1][1],
                            "videoUrl": temp1[1][1],
                            "options": [
                                temp1[2][1],
                                temp1[3][1],
                                temp1[4][1],
                                temp1[5][1]
                            ],
                            "answer": temp1[parseInt(temp1[temp1.length - 1][1]) + 1][1]
                        }
                    ]
                };
                allQuestion.push(temp);
            }
            else if (element[1].question_template.slug.match("m1-text-text")) {
                temp1 = Object.entries(element[1].question_data);
                console.log("temp1..", temp1);
                temp = {
                    "type": "MCQ",
                    "slug": element[1].question_template.slug,
                    "Elements": [
                        {
                            "question": temp1[0][1],
                            // "imageUrl": "",
                            // "videoUrl": temp1[1][1],
                            "options": [
                                temp1[1][1],
                                temp1[2][1],
                                temp1[3][1],
                                temp1[4][1]
                            ],
                            "answer": temp1[parseInt(temp1[temp1.length - 1][1])][1]
                        }
                    ]
                };
                allQuestion.push(temp);
            }
            else if (element[1].question_template.slug.match("m1-text-img")) {
                temp1 = Object.entries(element[1].question_data);
                console.log("temp1..", temp1);
                temp = {
                    "type": "MCQ",
                    "slug": element[1].question_template.slug,
                    "Elements": [
                        {
                            "question": temp1[0][1],
                            // "imageUrl": [
                            //     temp1[1][1],
                            //     temp1[3][1],
                            //     temp1[5][1],
                            //     temp1[7][1]
                            // ],
                            "imageUrl": [
                                temp1[1][1],
                                temp1[3][1],
                                temp1[5][1],
                                temp1[7][1]
                            ],
                            // "videoUrl": temp1[1][1],
                            "options": [
                                temp1[2][1],
                                temp1[4][1],
                                temp1[6][1],
                                temp1[8][1]
                            ],
                            "answer": temp1[parseInt(temp1[temp1.length - 1][1]) + parseInt(temp1[temp1.length - 1][1]) ][1]
                        }
                    ]
                };
                allQuestion.push(temp);
            }
          
            else if (element[1].question_template.slug.match("m2-mtp-text-text")) {
                temp1 = Object.entries(element[1].question_data);
                console.log("temp1..", temp1);
                let temp3 = [];
                temp3.push(temp1[2][1]);
                temp3.push(temp1[4][1]);
                temp3.push(temp1[6][1]);
                temp3.push(temp1[8][1]);
                for (var i = 3; i >= 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1));
                    var temp = temp3[i];
                    temp3[i] = temp3[j];
                    temp3[j] = temp;
                }
                let indexArry = [];
                for (let i = 1; i < 5; i++) {
                    let index = temp3.indexOf(temp1[i * 2][1]);
                    indexArry.push(index);
                }
                temp = {
                    "type": "PAIR_MATCHING",
                    "slug": element[1].question_template.slug,
                    "Elements": [
                        {
                            "question": temp1[0][1],
                            "imageUrl": [],
                            "imageUrl1": [],
                            "opt1": [
                                temp1[1][1],
                                temp1[3][1],
                                temp1[5][1],
                                temp1[7][1]
                            ],
                            "opt2": [
                                temp3[0],
                                temp3[1],
                                temp3[2],
                                temp3[3]
                            ],
                            "answer": [[0, indexArry[0]], [1, indexArry[1]], [2, indexArry[2]], [3, indexArry[3]]]
                        }
                    ]
                };
                allQuestion.push(temp);
            }
            else if (element[1].question_template.slug.match("m2-mtp-img-text")) {
                temp1 = Object.entries(element[1].question_data);
                console.log("temp1..", temp1);
                let temp3 = [];
                temp3.push(temp1[2][1]);
                temp3.push(temp1[4][1]);
                temp3.push(temp1[6][1]);
                temp3.push(temp1[8][1]);
                for (var i = 3; i >= 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1));
                    var temp = temp3[i];
                    temp3[i] = temp3[j];
                    temp3[j] = temp;
                }
                let indexArry = [];
                for (let i = 1; i < 5; i++) {
                    let index = temp3.indexOf(temp1[i * 2][1]);
                    indexArry.push(index);
                }
                console.log('indexAry', indexArry)
                temp = {
                    "type": "PAIR_MATCHING",
                    "slug": element[1].question_template.slug,
                    "Elements": [
                        {
                            "question": temp1[0][1],
                            "imageUrl": [
                                temp1[1][1],
                                temp1[3][1],
                                temp1[5][1],
                                temp1[7][1],
                            ],
                            "imageUrl1": [],
                            "opt1": ["", "", "", ""],
                            "opt2": [
                                temp3[0],
                                temp3[1],
                                temp3[2],
                                temp3[3]
                            ],
                            "answer": [[0, indexArry[0]], [1, indexArry[1]], [2, indexArry[2]], [3, indexArry[3]]]
                        }
                    ]
                };
                allQuestion.push(temp);
            }
            else if (element[1].question_template.slug.match("m2-mtp-img-img")) {
                temp1 = Object.entries(element[1].question_data);
                console.log("temp1..", temp1);
                let temp3 = [];
                temp3.push(temp1[2][1]);
                temp3.push(temp1[4][1]);
                temp3.push(temp1[6][1]);
                temp3.push(temp1[8][1]);
                for (var i = 3; i >= 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1));
                    var temp = temp3[i];
                    temp3[i] = temp3[j];
                    temp3[j] = temp;
                }
                let indexArry = [];
                for (let i = 1; i < 5; i++) {
                    let index = temp3.indexOf(temp1[i * 2][1]);
                    indexArry.push(index);
                }
                console.log('indexAry', indexArry);
                temp = {
                    "type": "PAIR_MATCHING",
                    "slug": element[1].question_template.slug,
                    "Elements": [
                        {
                            "question": temp1[0][1],
                            "imageUrl": [
                                temp1[1][1],
                                temp1[3][1],
                                temp1[5][1],
                                temp1[7][1]
                            ],
                            "imageUrl1": [
                                temp3[0],
                                temp3[1],
                                temp3[2],
                                temp3[3]
                            ],
                            "opt1": ["", "", "", ""],
                            "opt2": ["", "", "", ""],
                            "answer": [[0, indexArry[0]], [1, indexArry[1]], [2, indexArry[2]], [3, indexArry[3]]]
                        }
                    ]
                };
                allQuestion.push(temp);
            }
            // else if (element[1].question_template.slug.match("video-lesson")) {
            //     temp1 = Object.entries(element[1].question_data);
            //     console.log("temp1..", temp1);

            //     temp = {
            //         "type": "Video_Lesson",
            //         "slug": element[1].question_template.slug,
            //         "Elements": [
            //             {
            //                 // "question": temp1[0][1],
            //                 "imageUrl": "",
            //                 "videoUrl": temp1[0][1],
            //                 // "videoUrl": "image_or_video_option_video",  // For testing and server dependency unaccessible videos from server
            //                 // "options": [
            //                 //     temp1[2][1],
            //                 //     temp1[3][1],
            //                 //     temp1[4][1],
            //                 //     temp1[5][1]
            //                 // ],
            //                 // "answer": temp1[parseInt(temp1[temp1.length - 1][1]) + 1][1]
            //             }
            //         ]
            //     };
            //     allQuestion.push(temp);
            // }


           
            else if (element[1].question_template.slug.match("m6-slider-img-text")) {
                temp1 = Object.entries(element[1].question_data);
                console.log("temp1..", temp1);
            temp2 = temp1[0][1].split(" ");
            let question = [], index = null,status = null;
                    temp = {
                        "type": "SLIDE",
                        "slug": element[1].question_template.slug,
                        "Elements": [
                            {
                                "question": temp1[0][1],
                                "imageUrl": [
                                    temp1[1][1],
                                    temp1[5][1],
                                    temp1[9][1],
                                    temp1[13][1]

                                ],
                                "videoUrl": "",
                                "options":[ [
                                    temp1[2][1],
                                    temp1[3][1]
                                ],
                              [
                                    temp1[6][1],
                                    temp1[7][1]
                                ],
                                [
                                    temp1[10][1],
                                    temp1[11][1],
                                ],[
                                    temp1[14][1],
                                    temp1[15][1]
                                ]
                                 
                                ],
                                "answer": temp1[parseInt(temp1[temp1.length - 1][1]) + 1][1]
                            }
                        ]
                    };
                    allQuestion.push(temp);
                }
        });

        // console.log("allQuestion : ", allQuestion);
        return allQuestion;
    };
}