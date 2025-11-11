import { Constant } from './Constant.js';
import GameScene from './GameScene.js';
import PreloadScene from "./PreloadScene.js";
import MenuScene from "./MenuScene.js";
import GameTutorialScene from './GameTutorialScene.js';
import GameErrorScene from './GameErrorScene.js';
import RotateScreen from './RotateScreen.js';

let gameScene = new GameScene();
let preloadScene = new PreloadScene();
let menuScene = new MenuScene();
let gameTutorialScene = new GameTutorialScene();
let gameErrorScene = new GameErrorScene();

window.onload = function () {
    let config;
    Constant.isMobile = /iPhone|iPhoneX|iPod|iPad|BlackBerry|kindle|playbook|Windows Phone|Android/i.test(navigator.userAgent);
    if (Constant.isMobile) {
        config = {
            type: Phaser.AUTO,
            // backgroundColor: '313131',
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 800 },
                    // debug: true
                }
            },
            plugins: {
                scene: [
                    {
                        key: 'SpinePlugin',
                        plugin: window.SpinePlugin,
                        sceneKey: 'spine'
                    }
                ]
            },
            render: {
                pixelArt: true,
                antialias: false,
                roundPixels: true,
            },
            width: window.innerWidth,
            height: window.innerHeight,
        };
    }
    else {
        config = {
            type: Phaser.AUTO,
            // backgroundColor: '577568',

            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 650 },
                    // debug: true
                }
            },
            plugins: {
                scene: [
                    {
                        key: 'SpinePlugin',
                        plugin: window.SpinePlugin,
                        sceneKey: 'spine'
                    }
                ]
            },
            render: {
                pixelArt: true,
                antialias: false,
                roundPixels: true,
            },
            width: 1080,
            height: 1920,
        }
    }
    Constant.game = new Phaser.Game(config);


    Constant.game.scene.add("GameScene", gameScene);
    Constant.game.scene.add("PreloadScene", preloadScene);
    Constant.game.scene.add("MenuScene", menuScene);
    Constant.game.scene.add("GameTutorialScene", gameTutorialScene);
    Constant.game.scene.add("GameErrorScene", gameErrorScene);
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
        window.focus();
    });
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





}

