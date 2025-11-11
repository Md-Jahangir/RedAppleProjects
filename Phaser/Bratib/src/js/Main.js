import Phaser from 'phaser';
import PreloadScene from './PreloadScene.js';
import TitleScene from './TitleScene.js';
import GameScene from './GameScene.js';
import GameErrorScene from './GameErrorScene.js';
import { Constant } from './Constant.js';

// Load our scenes
let preloadScene = new PreloadScene();
let titleScene = new TitleScene();
let gameScene = new GameScene();
let gameErrorScene = new GameErrorScene();

window.onload = function () {

    Constant.isMobile = /iPhone|iPhoneX|iPod|iPad|BlackBerry|kindle|playbook|Windows Phone|Android/i.test(navigator.userAgent);
    let config;
    if (Constant.isMobile) {
        config = {
            type: Phaser.CANVAS,
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
            parent: 'template',
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            width: 1080,
            height: 1920,
        };
    }

    Constant.game = new Phaser.Game(config);

    Constant.scaleFactor = config.height / 1920;
    Constant.scaleFactorX = config.width / 1080;

    Constant.currentAspectRatio = (config.height / config.width);
    Constant.originalAspectRatio = (1080 / 1920);
    Constant.currentRatio = (Constant.currentAspectRatio / Constant.originalAspectRatio);

    window.focus();

    // load scenes
    Constant.game.scene.add('PreloadScene', preloadScene);
    Constant.game.scene.add('TitleScene', titleScene);
    Constant.game.scene.add("GameScene", gameScene);
    Constant.game.scene.add("GameErrorScene", gameErrorScene);

    // start title
    Constant.game.scene.start('PreloadScene');
}