import { SoundManager } from "../SoundManager.js";
import { Global } from "./Global.js";
// import Video from "../Video.js";

class VideoModule {
    constructor(scene, _elementsData, _slug, _questionType) {
        this.scene = scene;
        this.questionType = _questionType;
        this.slugId = _slug;
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
        this.CreateVideoModule(_elementsData, this.counter);
        // console.log(this.counter)

        // this.scene.game.events.on("evtShowResult", this.OnShowResult, this);
        this.scene.game.events.on("evtClearContainer", this.ClearContainer, this);
        console.log("ImageOrVideoModule", _elementsData, this.questionType)
    }

    CreateVideoModule(_elementsData) {
        for (let i = 0; i < _elementsData.length; i++) {
            if (this.slugId == 'video-lesson') {
                // this.CreateVideoPart(_elementsData[i].videoUrl);
                this.counter = 0;
                this.CreateVideoPart('https://staging.newsjargon.com/game/NewsJargon/assets/images/module3_image_or_video/image_or_video_option_video.mp4');
            };
        }
    }

    CreateVideoPart(_videoUrl) {

        if (_videoUrl != "") {
            console.log('videourl', _videoUrl)
            this.scene.uiPanel.ShowLoader();
            this.scene.load.video('image_video_module_video', _videoUrl);
            this.scene.load.start();
            // this.scene.load.on('complete', function () {
                setTimeout(() => {
                    this.scene.uiPanel.HideLoader();
                    // if (this.counter == 1) {
                        console.log('counter')
                        this.questionVideo = this.scene.add.video(Math.round(game.config.width / 2) + 20, Math.round(game.config.height / 2) - 80, 'image_video_module_video').setScale(0.6, 0.4).setOrigin(0.5);
                        this.playPauseButton = this.scene.add.image(Math.round(game.config.width / 2) + 20, Math.round(game.config.height / 2) - 80, 'video_play_button').setScale(1).setOrigin(0.5);
                        this.questionVideo.setInteractive();
                        this.questionVideo.setVisible(true);
                        this.questionVideo.addMarker("key", 10, 1);
                        this.questionVideo.on('pointerdown', this.PlayPauseVideo, this);
                        this.scene.uiPanel.HideCheckButton();
                        this.scene.uiPanel.DeactiveCheckButton();
                        this.questionVideo.on('complete', function (video) {
                            this.isVideoPlaying = false;
                            this.questionVideo.seekTo(0);
                            this.playPauseButton.setVisible(true);
                            this.scene.uiPanel.ShowNextButton();
                        }, this);
    
                        this.questionVideo.on('seeking', function (video) {
                            // console.log("seeking");
                        }, this);
    
                        this.questionVideo.on('seeked', function (video) {
                            // console.log("seeked");
    
                        }, this);
                    // }
                }, 5000);
              
            // }, this)
            // this.TweenOptionButton(this.optionArray, this.tweenAnimationDelay);
        }
        // this.TweenOptionButton(this.optionArray, this.tweenAnimationDelay);
    }

    PlayPauseVideo() {
        this.isVideoPlaying = !this.isVideoPlaying;
        if (this.isVideoPlaying) {
            this.playPauseButton.setVisible(false);
            this.questionVideo.play();
        } else {
            this.playPauseButton.setVisible(true);
            this.questionVideo.setPaused(true);
        }
    }

   
    ClearContainer() {
        if (this.slugId == 'video-lesson') {
            // this.optionArray.forEach(elem => {
            //     elem.destroy();
            // }, this)
            this.playPauseButton.setVisible(false);
            this.questionVideo.setVisible(false);
            this.questionType = '';
            this.slugId = '';
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

export default VideoModule;