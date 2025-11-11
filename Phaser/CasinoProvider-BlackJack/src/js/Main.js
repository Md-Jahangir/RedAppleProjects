import { Constant } from './Constant.js';
import PreloadScene from './PreloadScene.js';
import GameScene from './GameScene.js';
import GameErrorScene from './GameErrorScene.js';
import SplashScene from './SplashScene.js';
import ScreenRotation from './ScreenRotation.js';

let preloadScene = new PreloadScene();
let screenRotationScene = new ScreenRotation();
let splashScene = new SplashScene();
let gameScene = new GameScene();
let gameErrorScene = new GameErrorScene();
window.onload = function () {


    Constant.isMobile = /iPhone|iPhoneX|iPod|iPad|BlackBerry|kindle|playbook|Windows Phone|Android/i.test(navigator.userAgent);
    let config;
    // window.alert(Constant.isMobile);
    if (Constant.isMobile) {
        config = {
            type: Phaser.AUTO,
            backgroundColor: 0x222222,
            parent: 'slot',
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
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

            dom: {
                createContainer: true
            },
            width: window.innerWidth,
            height: window.innerHeight,
            render: {
            }
        };


    } else {
        config = {
            type: Phaser.AUTO,
            backgroundColor: 0x222222,
            parent: 'slot',
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
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

            dom: {
                createContainer: true
            },
            // fps: { target: 60 },
            width: 1920,
            height: 1080,
        };
    }

    Constant.game = new Phaser.Game(config);
    if (Constant.game.scale.orientation === Phaser.Scale.LANDSCAPE) {
        Constant.isPortrait = false;
        Constant.scaleFactor = config.width / 1920;
        Constant.scaleFactorX = config.width / 1920;
        Constant.scaleFactorY = config.height / 1080;

        window.focus();

        Constant.currentAspectRatio = (config.height / config.width);
        Constant.originalAspectRatio = (1080 / 1920);
        Constant.currentRatio = (Constant.currentAspectRatio / Constant.originalAspectRatio);
    }
    else if (Constant.game.scale.orientation === Phaser.Scale.PORTRAIT) {
        Constant.isPortrait = true;
        Constant.scaleFactor = config.width / 1080;
        Constant.scaleFactorX = config.width / 1080;
        Constant.scaleFactorY = config.height / 1920;

        window.focus();

        Constant.currentAspectRatio = (config.height / config.width);
        Constant.originalAspectRatio = (1920 / 1080);
        Constant.currentRatio = (Constant.currentAspectRatio / Constant.originalAspectRatio);
    }
    Constant.game.scene.add('ScreenRotation', screenRotationScene);
    Constant.game.scene.add('PreloadScene', preloadScene);
    Constant.game.scene.add("SplashScene", splashScene);
    Constant.game.scene.add("GameScene", gameScene);
    Constant.game.scene.add("GameErrorScene", gameErrorScene);

    if (Constant.isPortrait) {
        Constant.game.scene.start("ScreenRotation");
    } else {
        Constant.game.scene.start("PreloadScene");
    }
    window.addEventListener("resize", () => {
        if (!Constant.gameStarted) {
            // window.location.reload();
        }
    }, false);
    // window.addEventListener("focus", function (event) {
    // }, false);
}