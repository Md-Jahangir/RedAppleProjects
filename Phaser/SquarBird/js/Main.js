import PreloadScene from './PreloadScene.js';
import TutorialScene from './TutorialScene.js';
import GameScene from './GameScene.js';

let preloadScene = new PreloadScene();
let tutorialScene = new TutorialScene();
let gameScene = new GameScene();

window.onload = function () {

    isMobile = /iPhone|iPhoneX|iPod|iPad|BlackBerry|kindle|playbook|Windows Phone|Android/i.test(navigator.userAgent);
    let config = null;
    let gameStarted = false;

    if (isMobile) {
        config = {
            type: Phaser.AUTO,
            parent: 'square_bird',
            // backgroundColor: '#34568b',
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 1000 },
                    debug: true,
                },
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
            width: window.innerWidth,
            height: window.innerHeight,
        };
    }
    else {
        config = {
            type: Phaser.AUTO,
            parent: 'square_bird',
            // backgroundColor: '#34568b',
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 1000 },
                    // tileBias: 154,
                    debug: true,
                },
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
            width: 5000,
            height: 1920
        };
    }

    game = new Phaser.Game(config);

    if (isMobile) {
        scaleFactorX = config.width / 1080;
        scaleFactorY = config.height / 1920;
    }

    else {
        // scaleFactorX = config.width / 1080;
        // scaleFactorY = config.height / 1920;
        scaleFactor = config.width / 1080;
    }

    window.focus();

    game.scene.add('PreloadScene', preloadScene);
    game.scene.add('TutorialScene', tutorialScene);
    game.scene.add('GameScene', gameScene);

    if (isMobile && window.innerHeight < window.innerWidth) {
    } else {
        game.scene.start("PreloadScene");
    }
    window.addEventListener("orientationchange", function () {
        if (isMobile && window.screen.orientation == 90 || isMobile && window.screen.orientation == 270) // WHEN IN LANDSCAPE MODE//
        {
        } else {
            if (!gameStarted) {
                window.location.reload();
            }
        }
    }, false);
}