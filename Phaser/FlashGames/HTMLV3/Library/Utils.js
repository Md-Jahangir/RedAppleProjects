var indicatorAnimation;
var buttonAnimation;
var isBttnAnimationCreated = false;
var isIndicatorAnimationCreated = false;

var fakeCountOverlay;
var fakeCountGroup;
var fakeCount1Text;
var fakeCount2Text;
var fakeCount3Text;
var fakeCount4Text;
var gameplayPageMotionCar;

var time;
var TimerResult;
var timerIcon;
var totalTimeToPrint;

var timeDifference;
var currentTime;

var Utils = {
    //All Button Control
    ButtonSettingsControl: function(buttonObj, posX, posY, imageName, OnInputDownEvent, OnInputHoverEvent, OnInputOutEvent, OnInputUpEvent, isSetAnchor, isSetScale, anchorX, anchorY, scaleX, scaleY, referenceClass) {
        buttonObj = game.add.sprite(posX, posY, imageName);
        if (isSetAnchor == "true") {
            buttonObj.anchor.setTo(anchorX, anchorY);
        }
        if (isSetScale == "true") {
            buttonObj.scale.setTo(scaleX, scaleY);
        }
        buttonObj.inputEnabled = true;
        if (OnInputDownEvent != null)
            buttonObj.events.onInputDown.add(OnInputDownEvent, referenceClass);
        if (OnInputHoverEvent != null)
            buttonObj.events.onInputOver.add(OnInputHoverEvent, referenceClass);
        if (OnInputOutEvent != null)
            buttonObj.events.onInputOut.add(OnInputOutEvent, referenceClass);
        if (OnInputUpEvent != null)
            buttonObj.events.onInputUp.add(OnInputUpEvent, referenceClass);
        return buttonObj;
    },
    //All Sprite Control
    SpriteSettingsControl: function(spriteObj, posX, posY, imageName, isSetAnchor, isSetScale, anchorX, anchorY, scaleX, scaleY, isInputEnable) {
        spriteObj = game.add.sprite(posX, posY, imageName);
        if (isSetAnchor == "true") {
            spriteObj.anchor.setTo(anchorX, anchorY);
        }
        if (isSetScale == "true") {
            spriteObj.scale.setTo(scaleX, scaleY);
        }
        if (isInputEnable == "true")
            spriteObj.inputEnabled = true;
        return spriteObj;
    },
    //All Text Control
    TextSettingsControl: function(textObj, posX, posY, textName, isSetAnchor, isSetScale, anchorX, anchorY, scaleX, scaleY, fontName, fontStyle, fontColor, fontAlign, fontSize) {
        textObj = game.add.text(posX, posY, textName, { "font": fontStyle + " " + fontSize + " " + fontName, "fill": fontColor, "align": fontAlign });
        if (isSetAnchor == "true")
            textObj.anchor.setTo(anchorX, anchorY);
        if (isSetScale == "true")
            textObj.scale.setTo(scaleX, scaleY);
        return textObj;
    },
    ScaleManager: function() {
        console.log("Insdide utils scale manager");
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        // game.camera.scale.x = 2;
        // game.camera.scale.y = 2;
    },
    FitToScreen: function() {

        // if (game.device.desktop) {
            console.log("Enter into the Fit Screen.................");
            //IphoneX
            if ((window.screen.width == 812 && window.screen.height == 375) || (window.screen.width == 375 && window.screen.height == 812)) {
                game.camera.scale.x = 0.52;
                game.camera.scale.y = 0.52;
                game.camera.x = -75;
                game.camera.y = 0;
            }
            //IphoneXR
            else if ((window.screen.width == 896 && window.screen.height == 414) || (window.screen.width == 414 && window.screen.height == 896)) {
                game.camera.scale.x = 0.57;
                game.camera.scale.y = 0.57;
                game.camera.x = -80;
                game.camera.y = 0;
            }
            //Iphone6/7/8 Plus
            else if ((window.screen.width == 736 && window.screen.height == 414) || (window.screen.width == 414 && window.screen.height == 736)) {
                game.camera.scale.x = 0.57;
                game.camera.scale.y = 0.57;
                game.camera.x = -2;
                game.camera.y = 0;
            }
            //iPhone 4
            else if ((window.screen.width == 480 && window.screen.height == 320) || (window.screen.width == 320 && window.screen.height == 480)) {
                game.camera.scale.x = 0.375;
                game.camera.scale.y = 0.375;
                game.camera.x = 0;
                game.camera.y = 0;
            }
            //iPhone 5/SE
            else if ((window.screen.width == 568 && window.screen.height == 320) || (window.screen.width == 320 && window.screen.height == 568)) {
                game.camera.scale.x = 0.44;
                game.camera.scale.y = 0.44;
                game.camera.x = -3;
                game.camera.y = 0;
            }
            //Pixel 2
            else if ((window.screen.width == 731 && window.screen.height == 411) || (window.screen.width == 411 && window.screen.height == 731)) {
                game.camera.scale.x = 0.57;
                game.camera.scale.y = 0.57;
                game.camera.x = -1;
                game.camera.y = 0;
            }
            //Pixel 2XL
            else if ((window.screen.width == 823 && window.screen.height == 411) || (window.screen.width == 411 && window.screen.height == 823)) {
                game.camera.scale.x = 0.57;
                game.camera.scale.y = 0.57;
                game.camera.x = -50;
                game.camera.y = 0;
            }
            //Nokia N9
            else if ((window.screen.width == 854 && window.screen.height == 480) || (window.screen.width == 480 && window.screen.height == 854)) {
                game.camera.scale.x = 1;
                game.camera.scale.y = 1;
                game.camera.x = 0;
                game.camera.y = 0;
            }
            //Nokia Lumia 520
            else if ((window.screen.width == 533 && window.screen.height == 320) || (window.screen.width == 320 && window.screen.height == 533)) {
                game.camera.scale.x = .415;
                // game.camera.scale.y = .415;
                game.camera.scale.y = .44;
                game.camera.x = 0;
                game.camera.y = 0;
            }
            //Glaxy Note3/Glaxy NoteII/Glaxy SIII/Glaxy S5/Microsoft lumia 550/Microsoft lumia 950/BlackBerry Z30/Nexus 5
            else if ((window.screen.width == 640 && window.screen.height == 360) || (window.screen.width == 360 && window.screen.height == 640)) {
                game.camera.scale.x = 0.5;
                game.camera.scale.y = 0.5;
                game.camera.x = 0;
                game.camera.y = 0;
            }
            //LG Optimus L70/Nexus 4
            else if ((window.screen.width == 640 && window.screen.height == 384) || (window.screen.width == 384 && window.screen.height == 640)) {
                game.camera.scale.x = 0.5;
                // game.camera.scale.y = 0.5;
                game.camera.scale.y = 0.532;
                game.camera.x = 0;
                game.camera.y = 0;
            }
            //Nexus 6/Nexus 6P/Nexus 5X
            else if ((window.screen.width == 732 && window.screen.height == 412) || (window.screen.width == 412 && window.screen.height == 732)) {
                game.camera.scale.x = 0.57;
                game.camera.scale.y = 0.57;
                game.camera.x = -1;
                game.camera.y = 0;
            }
            //Nexus 7
            else if ((window.screen.width == 960 && window.screen.height == 600) || (window.screen.width == 600 && window.screen.height == 960)) {
                game.camera.scale.x = 0.75;
                // game.camera.scale.y = 0.75;
                game.camera.scale.y = 0.83;
                game.camera.x = 0;
                game.camera.y = 0;
            }
            //Nexus 10/Kindle fire HDX
            else if ((window.screen.width == 1280 && window.screen.height == 800) || (window.screen.width == 800 && window.screen.height == 1280)) {
                game.camera.scale.x = 1;
                // game.camera.scale.y = 1;
                game.camera.scale.y = 1.1;
                game.camera.x = 0;
                game.camera.y = 0;
            }
            //Jio Phone2
            else if ((window.screen.width == 320 && window.screen.height == 240) || (window.screen.width == 240 && window.screen.height == 320)) {
                game.camera.scale.x = 0.25;
                game.camera.scale.y = 0.25;
                game.camera.x = 0;
                game.camera.y = 0;
            }
            //Blackberry PlayBook
            else if ((window.screen.width == 1024 && window.screen.height == 600) || (window.screen.width == 600 && window.screen.height == 1024)) {
                game.camera.scale.x = 0.8;
                game.camera.scale.y = 0.83;
                game.camera.x = 0;
                game.camera.y = 0;
            }
            //iPad Mini/iPad
            else if ((window.screen.width == 1024 && window.screen.height == 768) || (window.screen.width == 768 && window.screen.height == 1024)) {
                game.camera.scale.x = 0.85;
                game.camera.scale.y = 0.85;
                console.log("ipad----------------------------------");
            }
            //iPad Pro
            else if ((window.screen.width == 1366 && window.screen.height == 1024) || (window.screen.width == 1024 && window.screen.height == 1366)) {
                game.camera.scale.x = 1;
                game.camera.scale.y = 1; 
                // game.camera.scale.x = 0.85;
                // game.camera.scale.y = 0.85;
            }
            //ipad Air
            else if ((window.screen.width == 2048 && window.screen.height == 1536) || (window.screen.width == 1536 && window.screen.height == 2048)) {
                game.camera.scale.x = 1;
                game.camera.scale.y = 1;
            }
            // //Redmi Note 5 pro
            // else if ((window.screen.width == 720 && window.screen.height == 360) || (window.screen.width == 360 && window.screen.height == 720)) {
            //     game.camera.scale.x = 0.5;
            //     game.camera.scale.y = 0.5;
            //     game.camera.x = -40;
            //     game.camera.y = 0;
            // }
            //Redmi MI A3
            else if ((window.screen.width == 520 && window.screen.height == 240) || (window.screen.width == 240 && window.screen.height == 520)) {
                game.camera.scale.x = 0.33;
                game.camera.scale.y = 0.33;
                game.camera.x = -50;
                game.camera.y = 0;
            }
            //Redmi Note 5 pro
            else if((window.screen.width == 786 && window.screen.height == 393) || (window.screen.width == 393 && window.screen.height == 786)){
                game.camera.scale.x = 0.54;
                game.camera.scale.y = 0.54;
                game.camera.x = -60;
            }
            //Galaxy Note 9
            else if((window.screen.width == 740 && window.screen.height == 360) || (window.screen.width == 360 && window.screen.height == 740)){
                game.camera.scale.x = 0.5;
                game.camera.scale.y = 0.5;
                game.camera.x = -50;
            }
            else if((window.screen.width == 846 && window.screen.height == 412) || (window.screen.width == 412 && window.screen.height == 846)){
                game.camera.scale.x = 0.57;
                game.camera.scale.y = 0.57;
                game.camera.x = -60;
            }
            else if((window.screen.width == 780 && window.screen.height == 360) || (window.screen.width == 780 && window.screen.height == 360)){
                game.camera.scale.x = 0.5;
                game.camera.scale.y = 0.5;
                game.camera.x = -70;
            }
            //iPhone 6/7/8
            else {
                game.camera.scale.x = 0.52;
                game.camera.scale.y = 0.52;
            }

        }
    // }
};