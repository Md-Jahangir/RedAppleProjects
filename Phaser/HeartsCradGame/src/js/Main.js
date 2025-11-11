const cp = new BroadcastChannel("create-player-channel");
import Phaser from 'phaser';
import PreloadScene from './scenes/PreloadScene.js';
import MenuScene from './scenes/MenuScene.js';
import GameScene from './scenes/GameScene.js';
import { Constant } from './Constant.js';
// import { Server } from './services/Server.js';
import { Client } from './services/Client.js'


// Load our scenes
// let preloadScene = new PreloadScene();
// let titleScene = new TitleScene();
// let gameScene = new GameScene();
// let gameErrorScene = new GameErrorScene();

// window.onload = function () {
Constant.isMobile = /iPhone|iPhoneX|iPod|iPad|BlackBerry|kindle|playbook|Windows Phone|Android/i.test(navigator.userAgent);
let config = {
    type: Phaser.AUTO,
    parent: "pokertexasholdem",

    plugins: {
        scene: [{
            key: 'SpinePlugin',
            plugin: window.SpinePlugin,
            sceneKey: 'spine'
        }]
    },
    scale: {
        mode: Phaser.Scale.RESIZE,
        width: window.innerWidth,
        height: window.innerHeight
    },
    scene: [PreloadScene, MenuScene, GameScene]
};

Constant.game = new Phaser.Game(config);

// Constant.scaleFactor = config.width / 1920;
// Constant.currentAspectRatio = (config.height / config.width);
// Constant.originalAspectRatio = (1080 / 1920);
// Constant.currentRatio = (Constant.currentAspectRatio / Constant.originalAspectRatio);

window.focus();

// // load scenes
// Constant.game.scene.add('PreloadScene', preloadScene);
// Constant.game.scene.add('TitleScene', titleScene);
// Constant.game.scene.add("GameScene", gameScene);
// Constant.game.scene.add("GameErrorScene", gameErrorScene);

// // start title
// Constant.game.scene.start('PreloadScene');
// }

window.addEventListener("resize", resize, false);

function resize() {
    let clientWidth = window.innerWidth;
    let clientHeight = window.innerHeight;
    Constant.game.events.emit("resize", clientWidth, clientHeight);
};