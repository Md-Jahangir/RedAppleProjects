import PreloadScene from './PreloadScene.js';
import GameScene from './GameScene.js';
import GameErrorScene from './GameErrorScene.js';

// Load our scenes
let preloadScene = new PreloadScene();
let gameScene = new GameScene();
let gameErrorScene = new GameErrorScene();

window.onload = function () {
    let isMobile = /iPhone|iPhoneX|iPod|iPad|BlackBerry|kindle|playbook|Windows Phone|Android/i.test(navigator.userAgent);
    let config;

    if (isMobile) {
        config = {
            type: Phaser.AUTO,
            backgroundColor: 0x222222,
            parent: 'slot9',
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
            parent: 'slot9',
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            width: 1920,
            height: 1080,
        };
    }

    game = new Phaser.Game(config);

    scaleFactor = config.width / 1920;
    scaleFactorX = config.width / 1920;
    scaleFactorY = config.height / 1080;

    window.focus();

    currentAspectRatio = (config.height / config.width);
    originalAspectRatio = (1080 / 1920);
    currentRatio = (currentAspectRatio / originalAspectRatio);

    // load scenes
    game.scene.add('PreloadScene', preloadScene);
    game.scene.add("GameScene", gameScene);
    game.scene.add("GameErrorScene", gameErrorScene);

    // start title
    game.scene.start("PreloadScene");
}