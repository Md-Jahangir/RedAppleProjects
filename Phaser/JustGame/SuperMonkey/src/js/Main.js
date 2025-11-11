import PreloadScene from './PreloadScene.js';
import GameTutorialScene from './GameTutorialScene.js';
import TitleScene from './TitleScene.js';
import GameScene from './GameScene.js';
import PausedScene from './PausedScene.js'
import GameErrorScene from './GameErrorScene.js';
import { Constant } from './Constant.js';
import RotateScreen from './RotateScreen.js';
import MuteConsole from "./MuteConsole.js";
import * as GA from "gameanalytics";

// Load our scenes
let preloadScene = new PreloadScene();
let gameTutorialScene = new GameTutorialScene();
let titleScene = new TitleScene();
let gameScene = new GameScene();
let pausedScene = new PausedScene();
let gameErrorScene = new GameErrorScene();

window.onload = function () {
    Constant.isMobile = /iPhone|iPhoneX|iPod|iPad|BlackBerry|kindle|playbook|Windows Phone|Android/i.test(navigator.userAgent);
    let config;
    let gameStarted = false;

    // Create the configuration for the Phaser game
    if (Constant.isMobile) {
        config = {
            type: Phaser.AUTO,
            // backgroundColor: 0x222222,
            parent: 'supermonkey',
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 1600 },
                    // debug: true,
                },
            },
            plugins: {
                scene: [
                    {
                        key: 'SpinePlugin',
                        plugin: window.SpinePlugin,
                        sceneKey: 'spine',
                    }
                ]
            },
            width: window.innerWidth,
            height: window.innerHeight,
        };
    } else {
        config = {
            type: Phaser.AUTO,
            // backgroundColor: 0x222222,
            parent: 'supermonkey',
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 1600 },
                    // debug: true,
                },
            },
            plugins: {
                scene: [
                    {
                        key: 'SpinePlugin',
                        plugin: window.SpinePlugin,
                        sceneKey: 'spine',
                    }
                ]
            },
            width: 1920,
            height: 1080,
        };
    }

    Constant.game = new Phaser.Game(config);

    Constant.scaleFactor = config.width / 1920;
    Constant.scaleFactorX = config.width / 1920;
    Constant.scaleFactorY = config.height / 1080;

    Constant.currentAspectRatio = (config.height / config.width);
    Constant.originalAspectRatio = (1080 / 1920);
    Constant.currentRatio = (Constant.currentAspectRatio / Constant.originalAspectRatio);

    window.focus();

    // load scenes
    Constant.game.scene.add('PreloadScene', preloadScene);
    Constant.game.scene.add('GameTutorialScene', gameTutorialScene);
    Constant.game.scene.add('TitleScene', titleScene);
    Constant.game.scene.add("GameScene", gameScene);
    Constant.game.scene.add('PausedScene', pausedScene);
    Constant.game.scene.add("GameErrorScene", gameErrorScene);

    Constant.game.scene.start("PreloadScene");


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