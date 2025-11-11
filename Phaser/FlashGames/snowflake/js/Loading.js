var loadingMiddleTxt;
var loaderFlare;
var progressText;
var Loading = {
    CreateLoadingPopUpImage: function() {
        SoundManager.StopMainMenuBgSound();
        SoundManager.StopSelectPlayerBgMusic();
        SoundManager.StopPickAPackScreenBgSound();
        if (game.device.desktop) {
            loadingBg = game.add.sprite(640, 360, 'loadingBg');
            loadingBg.scale.set(1, 1);
        } else {
            //iPad Mini/iPad
            if ((window.screen.width == 1024 && window.screen.height == 768)
                || (window.screen.width == 1366 && window.screen.height == 1024)
                || (window.screen.width == 1024 && window.screen.height == 1366) 
                || (window.screen.width == 320 && window.screen.height == 240)) {
                loadingBg = game.add.sprite(640, 420, 'loadingBg');
                loadingBg.scale.set(1.5, 1.5);
            } else {
                loadingBg = game.add.sprite(640, 390, 'loadingBg');
                loadingBg.scale.set(1.5, 1.5);
            }

        }
        // loadingBg = game.add.sprite(game.world.centerX, game.world.centerY, 'loadingBg');
        loadingBg.anchor.setTo(0.5, 0.5);
        var style = { font: "50px Arial", fontWeight: "bold", fill: "#ffffff", align: "center", wordWrap: true, wordWrapWidth: 900};
        // var midTextStyle = { font: '42pt Arial', fontWeight: "bold", fill: '#fffffff', align: 'center', wordWrap: true, wordWrapWidth: 900};
        loadingText = game.add.text(540, 20, 'LOADING', style);//game.add.bitmapText(540, 20, 'vagRounded', 'LOADING', 50);
        
        progressText = game.add.text(840, 20, 'The Progress...', style);

        loadingMiddleTxt = game.add.text(640, 640, 'dsdfdshfhuds', style);//game.add.bitmapText(640, 640, 'vagRounded', '', 42);
        loadingMiddleTxt.anchor.setTo(0.5, 0.5);
        loadingMiddleTxt.tint = "0xffffff";
        // loadingMiddleTxt.maxWidth = 900;
        // loadingMiddleTxt.align = 'center';

        loadingWheel = game.add.sprite(640, 350, 'loaderScreen');
        loadingWheel.anchor.setTo(0.5, 0.5);
        loadingWheel.scale.setTo(1.2, 1.2);
        loadingWheel.animations.add('run');
        loadingWheel.animations.play('run', 50, true);


        loadingGroup = game.add.group();
        loadingGroup.add(loadingBg);
        loadingGroup.add(loadingText);
        loadingGroup.add(loadingWheel);
        loadingGroup.add(loadingMiddleTxt);
        loadingGroup.add(progressText);
        loadingGroup.visible = false;
    },
    LoadingTextAnimation: function() {},
    RotateLoadingPopUp: function() {},
    ShowLoadingPopUp: function() {
        showLoadingPopUp = true;
        randomPackbox = game.rnd.integerInRange(0, getPackTipsArray.length - 1);
        this.CreateLoadingPopUpImage();
        if (!isTutorialShowFirstTime) {
            setTimeout(() => {
                loadingMiddleTxt.setText(getPackTipsArray[randomPackbox].toString());
            }, 2000);
        } else {
            loadingMiddleTxt.setText(getPackTipsArray[randomPackbox].toString());
        }
        loadingGroup.visible = true;
        game.world.bringToTop(loadingGroup);
    },
    HideLoadingPopUp: function() {
        showLoadingPopUp = false;
        loadingGroup.visible = false;
    },
    
}
