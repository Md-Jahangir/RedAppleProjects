import PreloadScene from './PreloadScene.js';
// import PreviosDrawScene from './PreviosDrawScene.js';
// import DrawScene from './DrawScene.js';
import GameErrorScene from './GameErrorScene.js';
import GameScene from './GameScene.js';
import { Constant } from './Constant.js';
// import AfterDrawScene from './AfterDrawScene.js';
// import FinalDrawScene from './FinalDrawScene.js';
import  Client  from './Client.js';

// Load our scenes
let preloadScene = new PreloadScene();
let gameScene = new GameScene();
// let drawScene = new DrawScene();
// let afterDrawScene = new AfterDrawScene();
let gameErrorScene = new GameErrorScene();
// let finalDrawScene = new FinalDrawScene();
let client = new Client(gameScene);

window.onload = function () {
    Constant.isMobile = /iPhone|iPhoneX|iPod|iPad|BlackBerry|kindle|playbook|Windows Phone|Android/i.test(navigator.userAgent);
    let config;
    if (Constant.isMobile) {
        config = {
            type: Phaser.CANVAS,
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
            width: 1920,
            height: 1080,
        };
    }

    Constant.game = new Phaser.Game(config);

    // Constant.scaleFactor = config.height / 1080;
    Constant.scaleFactor = config.width / 1920;
    Constant.currentAspectRatio = (config.height / config.width);
    // Constant.originalAspectRatio = (1080 / 1920);
    Constant.originalAspectRatio = (1920 / 1080);
    Constant.currentRatio = (Constant.currentAspectRatio / Constant.originalAspectRatio);

    window.focus();

    // load scenes
    Constant.game.scene.add('PreloadScene', preloadScene);
    // Constant.game.scene.add("PreviosDrawScene", previosDrawScene);
    Constant.game.scene.add("GameScene", gameScene);
    // Constant.game.scene.add("AfterDrawScene", afterDrawScene);
    Constant.game.scene.add("GameErrorScene", gameErrorScene);
    // Constant.game.scene.add("FinalDrawScene", finalDrawScene);

    // start title
    Constant.game.scene.start('PreloadScene');
}