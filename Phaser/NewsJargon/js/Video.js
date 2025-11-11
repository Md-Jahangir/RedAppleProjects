class Video {
    constructor(scene, _url) {
        this.scene = scene;
        this.questionVideo = null;
        this.isVideoPlaying = false;
        this.CreateVideoPart(_url);
        this.videoElement = null;
        // this.CreateVideoDOM();
        console.log("Video");
        // this.scene.game.events.on("evtClearContainer", this.ClearContainer, this);
    }

    // CreateVideoDOM() {
    //     this.videoElement = this.scene.add.dom(Math.round(game.config.width / 2) + 20, Math.round(game.config.height / 2) - 80).createFromCache('video_template');
    //     console.log("video dom elem: ", this.videoElement);
    //     document.getElementById("videourl").src = "assets/images/module3_image_or_video/image_or_video_option_video.mp4";
    // }

    CreateVideoPart(_videoUrl) {
        console.log(_videoUrl)
        if (_videoUrl != "") {
            this.videoElement = this.scene.add.dom(Math.round(game.config.width / 2) + 20, Math.round(game.config.height / 2) - 60).createFromCache('video_template');
            document.getElementById("videourl").src = _videoUrl;

            setTimeout(() => {
                // this.scene.imageOrVideoModule.ShowOptionButton();
            }, 1000);
        }
        // if (_videoUrl != "") {
        //     this.scene.load.video('image_video_module_video', _videoUrl);
        //     this.scene.load.start();
        //     setTimeout(() => {
        //         this.questionVideo = this.scene.add.video(Math.round(game.config.width / 2) + 20, Math.round(game.config.height / 2) - 80, 'image_video_module_video').setScale(0.6).setOrigin(0.5);
        //         this.playPauseButton = this.scene.add.image(Math.round(game.config.width / 2) + 20, Math.round(game.config.height / 2) - 80, 'video_play_button').setScale(1).setOrigin(0.5);
        //         this.questionVideo.setInteractive();
        //         this.questionVideo.addMarker("key", 10, 1);
        //         this.questionVideo.on('pointerdown', this.PlayPauseVideo, this);
        //         this.questionVideo.on('complete', function(video) {
        //             this.isVideoPlaying = false;
        //             this.questionVideo.seekTo(0);
        //             this.playPauseButton.setVisible(true);
        //         }, this);

        //         // this.questionVideo.on('seeking', function(video) {
        //         //     console.log("seeking");
        //         // }, this);

        //         // this.questionVideo.on('seeked', function(video) {
        //         //     console.log("seeked");

        //         // }, this);

        //         this.scene.imageOrVideoModule.ShowOptionButton();
        //     }, 1000);
        // }
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

    DeactiveVideoAndVideoButton() {
        console.log("DeactiveVideoAndVideoButton");
        if (this.questionVideo != null && this.playPauseButton != null) {
            this.questionVideo.removeInteractive();
            this.isVideoPlaying = false;
            this.questionVideo.stop();
            this.playPauseButton.setVisible(true);
        }
    }
    ClearContainer(){
        this.videoElement.setVisible(false);
    }
}

export default Video;