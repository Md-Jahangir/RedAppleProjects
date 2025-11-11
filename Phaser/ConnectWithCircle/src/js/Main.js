import PreloadScene from './PreloadScene.js';
import TitleScene from './TitleScene.js';
import TutorialScene from './TutorialScene.js'
import GameScene from './GameScene.js';
import GameErrorScene from './GameErrorScene.js';
import { Constant } from './Constant.js';
import RotateScreen from './RotateScreen.js';
import MuteConsole from './MuteConsole.js'
import * as GA from "gameanalytics";

// Load our scenes
let preloadScene = new PreloadScene();
let titleScene = new TitleScene();
let tutorialScene = new TutorialScene();
let gameScene = new GameScene();
let gameErrorScene = new GameErrorScene();

window.onload = function () {
    Constant.isMobile = /iPhone|iPhoneX|iPod|iPad|BlackBerry|kindle|playbook|Windows Phone|Android/i.test(navigator.userAgent);
    let config;
    if (Constant.isMobile) {
        config = {
            type: Phaser.AUTO,
            backgroundColor: 0x222222,
            parent: 'template',
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            width: window.innerWidth,
            height: window.innerHeight,
        };
    } else {
        config = {
            type: Phaser.AUTO,
            backgroundColor: 0x222222,
            parent: 'template',
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            width: 1080,
            height: 1920,
        };
    }
    console.log("Main")
    Constant.game = new Phaser.Game(config);
    if (Constant.game.scale.orientation === Phaser.Scale.LANDSCAPE) {
        Constant.isPortrait = false;
        if (Constant.isMobile == true) {
            // screen  rotate  
        }
        else if (Constant.isMobile == false) {
            Constant.scaleFactor = config.width / 1080;
            Constant.scaleFactorX = config.width / 1080;
            Constant.scaleFactorY = config.height / 1920;
            window.focus();
        }
    }
    else if (Constant.game.scale.orientation === Phaser.Scale.PORTRAIT) {
        Constant.isPortrait = true;
        Constant.scaleFactor = config.width / 1080;
        Constant.scaleFactorX = config.width / 1080;
        Constant.scaleFactorY = config.height / 1920;
        window.focus();
    }

    Constant.currentAspectRatio = (config.height / config.width);
    Constant.originalAspectRatio = (1080 / 1920);
    Constant.currentRatio = (Constant.currentAspectRatio / Constant.originalAspectRatio);

    window.focus();
    // load scenes
    Constant.game.scene.add('PreloadScene', preloadScene);
    Constant.game.scene.add('TitleScene', titleScene);
    Constant.game.scene.add("GameScene", gameScene);
    Constant.game.scene.add("TutorialScene", tutorialScene);
    Constant.game.scene.add("GameErrorScene", gameErrorScene);

    // start title
    Constant.game.scene.start('PreloadScene');


    let rotateScreen, isPortraitMode;
    Constant.game.events.once('ready', () => {
        rotateScreen = new RotateScreen(Constant.game);
    });
    Constant.game.scale.on('orientationchange', function (orientation) {
        switch (orientation) {
            case Phaser.Scale.PORTRAIT:
                isPortraitMode = true;
                console.log('Switched to PORTRAIT');
                Constant.game.events.emit('orientation', isPortraitMode);
            case Phaser.Scale.PORTRAIT_SECONDARY:
                isPortraitMode = true;
                console.log('Switched to PORTRAIT_SECONDARY');
                Constant.game.events.emit('orientation', isPortraitMode);
                // Add global logic for portrait mode here
                break;

            case Phaser.Scale.LANDSCAPE:
                isPortraitMode = false;
                console.log('Switched to LANDSCAPE');
                Constant.game.events.emit('orientation', isPortraitMode);
            case Phaser.Scale.LANDSCAPE_SECONDARY:
                isPortraitMode = false;
                console.log('Switched to LANDSCAPE_SECONDARY');
                Constant.game.events.emit('orientation', isPortraitMode);
                // Add global logic for landscape mode here
                break;
        }
    });

    GA.GameAnalytics.setEnabledManualSessionHandling(false); // Let GA manage sessions
    GA.GameAnalytics.setEnabledEventSubmission(true);        // Ensure events send

    GA.GameAnalytics.setEnabledInfoLog(true)
    GA.GameAnalytics.configureUserId(Constant.GAME_KEY);
    GA.GameAnalytics.initialize(Constant.GAME_KEY, Constant.SECRET_KEY);
    GA.GameAnalytics.addDesignEvent("game:boot");
}