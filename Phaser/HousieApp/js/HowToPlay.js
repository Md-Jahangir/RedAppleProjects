var howToPlayBg;
var howToPlayHeading;
var howToPlayLock;
var howToPlayKey;
var videoBox;
var watchText;
var videoPlayButton;
var tutorialVideo;
var howToPlayBackButton;
var howToPlayOverlay;
var videoImage;

var HowToPlay = function() {};
HowToPlay.prototype = {
        init: function() {
            Utils.ScaleManager();
        },
        preload: function() {
            game.stage.disableVisibilityChange = true;
            game.time.advancedTiming = true;
        },
        create: function() {
            this.CreateHowToPlayPage();
        },

        update: function() {},

        CreateHowToPlayPage: function() {
            var howToPlayBg = Utils.SpriteSettingsControl(howToPlayBg, game.world.centerX, game.world.centerY, 'login_signup_bg', "true", "true", 0.5, 0.5, 1, 1, "false");

            Utils.CreateHeadingText("HOW TO PLAY");

            howToPlayLock = Utils.SpriteSettingsControl(howToPlayLock, game.world.centerX, game.world.centerY - Math.round(game.height / 13), 'lock', "true", "true", 0.5, 0.5, 1, 1, "false");
            howToPlayKey = Utils.SpriteSettingsControl(howToPlayKey, 48, -185, 'key', "true", "true", 0.5, 0.5, 1, 1, "false");
            howToPlayLock.addChild(howToPlayKey);

            this.CreateVideoBox();

            howToPlayBackButton = Utils.ButtonSettingsControl(howToPlayBackButton, game.world.centerX, game.world.centerY + Math.round(game.height / 2.16), 'back_button', this.HowToPlayBackButtonPressed, null, null, this.howToPlayBackButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);

            //Create overlay For off the input of all button when click on button
            howToPlayOverlay = Utils.ButtonSettingsControl(howToPlayOverlay, game.world.centerX, game.world.centerY, 'transparent_image', this.HowToPlayOverlayPressed, null, null, null, "true", "true", 0.5, 0.5, 2000, 2000, this);
            howToPlayOverlay.alpha = 0.001;
            howToPlayOverlay.visible = false;

            // //For ADDS testing
            // var addButton = Utils.ButtonSettingsControl(addButton, game.world.centerX, game.world.centerY - game.height / 4, 'join_button_base', this.AddButtonPressed, null, null, null, 0.5, 0.6, this);
            // var addsText = game.add.text(0, -5, "ADD", watchTextStyle);
            // addsText.anchor.setTo(0.5);
            // addsText.tint = "0x01000"
            // addButton.addChild(addsText);

            // var provider = new PhaserAds.AdProvider.GameDistributionAds(
            //     game, // Your Phaser game instance
            //     // '2d77cfd4b1e5487d998465c29de195b3' // Your gameId
            //     '658d6558e3684b2bb0d6260d3277d516'
            // );
            // game.ads.setAdProvider(provider);
        },

        CreateVideoBox: function() {
            videoBox = Utils.SpriteSettingsControl(videoBox, game.world.centerX, game.world.centerY + Math.round(game.height / 6), 'watch_video_box', "true", "true", 0.5, 0.5, 1, 1, "false");

            var watchTextStyle = { font: '36px Lato-Medium', fill: '#fff', align: 'center' };
            watchText = game.add.text(-270, -280, "WATCH VIDEO", watchTextStyle);
            watchText.anchor.setTo(0.5);
            videoBox.addChild(watchText);

            videoPlayButton = Utils.ButtonSettingsControl(videoPlayButton, 0, 110, 'watch_video_icon', this.VideoPlayButtonPressed, null, null, this.VideoPlayButtonReleased, "true", 0.5, 0.5, 1, 1, this);
            videoBox.addChild(videoPlayButton);

            tutorialVideo = game.add.video('tutorial_video');
            videoImage = tutorialVideo.addToWorld(game.world.centerX, game.world.centerY + Math.round(game.height / 5.36), 0.5, 0.5, 1.32, 1.13);
            videoImage.visible = false;
        },
        // //For ADDS testing
        // AddButtonPressed: function() {
        //     console.log("add button press");
        //     game.ads.showAd();
        // },

        VideoPlayButtonPressed: function() {
            videoImage.visible = true;
            // Utils.ButtonScaleAnimation(videoPlayButton, videoPlayButton.scale.x - 0.02, howToPlayOverlay);
            // // this.EnableDisableHowToPlayPageButtonInput(true);
            SoundManager.PlayButtonClickTypeOneSound();
        },
        VideoPlayButtonReleased: function() {
            // videoBox.visible = false;
            tutorialVideo.play(true);
        },

        HowToPlayBackButtonPressed: function() {
            tutorialVideo.stop();
            tutorialVideo.removeVideoElement();
            videoImage.destroy();
            Utils.ButtonScaleAnimation(howToPlayBackButton, howToPlayBackButton.scale.x - 0.02, howToPlayOverlay);
            this.EnableDisableHowToPlayPageButtonInput(true);
            SoundManager.PlayButtonClickTypeOneSound();
        },
        howToPlayBackButtonReleased: function() {
            if (previousPage == "Menu") {
                StateTransition.TransitToMenu();
            } else if (previousPage == "ProfilePage") {
                StateTransition.TransitToProfilePage();
            } else {}
        },

        EnableDisableHowToPlayPageButtonInput: function(_status) {
            howToPlayOverlay.visible = _status;
        },


    } //End of HowToPlay.prototype