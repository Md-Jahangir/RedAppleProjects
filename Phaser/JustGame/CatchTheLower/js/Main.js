import BootScene from './BootScene.js';
import PreloadScene from './PreloadScene.js';
import TitleScene from './TitleScene.js';
import GameScene from './GameScene.js';

// Load our scenes
let bootScene = new BootScene();
let preloadScene = new PreloadScene();
let titleScene = new TitleScene();
let gameScene = new GameScene();

window.onload = function() {
    isMobile = /iPhone|iPhoneX|iPod|iPad|BlackBerry|kindle|playbook|Windows Phone|Android/i.test(navigator.userAgent);
    let config;
    if (isMobile) {
        config = {
            type: Phaser.CANVAS,
            backgroundColor: 0x222222,
            parent: 'match_it_right',
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            physics: {
                default: 'arcade',
                arcade: {
                    // debug: true,
                }
            },
            width: window.innerWidth,
            height: window.innerHeight,
            plugins: {
                scene: [{
                    key: 'SpinePlugin',
                    plugin: window.SpinePlugin,
                    sceneKey: 'spine'
                }]
            },
        };
    } else {
        config = {
            type: Phaser.AUTO,
            backgroundColor: 0x222222,
            parent: 'match_it_right',
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            physics: {
                default: 'arcade',
                arcade: {
                    // debug: true,
                }
            },
            width: 1080,
            height: 1920,
            plugins: {
                scene: [{
                    key: 'SpinePlugin',
                    plugin: window.SpinePlugin,
                    sceneKey: 'spine'
                }]
            },
        };
    }
    game = new Phaser.Game(config);
    // scaleFactor = config.width / 1080;
    scaleFactor = config.height / 1920;
    window.focus();

    // load scenes
    game.scene.add('BootScene', bootScene);
    game.scene.add('PreloadScene', preloadScene);
    game.scene.add('TitleScene', titleScene);
    game.scene.add("GameScene", gameScene);

    // start title
    game.scene.start('BootScene');
}