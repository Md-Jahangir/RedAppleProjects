// import PreloadScene from './scene/PreloadScene.js';
import PreloadScene from './Scene/PreloadScene.js';
import GameScene from './Scene/GameScene.js';
import GameErrorScene from './Scene/GameErrorScene.js';

let gameScene = new GameScene();
let preloadScene = new PreloadScene();
let gameErrorScene = new GameErrorScene();

window.onload = function() {
    let config;
    let isMobile = /iPhone|iPhoneX|iPod|iPad|BlackBerry|kindle|playbook|Windows Phone|Android/i.test(navigator.userAgent);
    if (isMobile) {
        config = {
            type: Phaser.AUTO,
            backgroundColor: '#000',
            parent: 'news-jargon',
            dom: {
                createContainer: true
            },
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            physics: {
                default: 'arcade',
                arcade: {
                    // gravity: { y: 1300 },
                    // debug: true,
                }
            },
            plugins: {
                scene: [{
                    key: 'SpinePlugin',
                    plugin: window.SpinePlugin,
                    sceneKey: 'spine'
                }]
            },

            width: window.innerWidth,
            height: window.innerHeight,
        };
    } else {
        config = {
            type: Phaser.AUTO,
            backgroundColor: '#000',
            parent: 'news-jargon',
            dom: {
                createContainer: true
            },
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            physics: {
                default: 'arcade',
                arcade: {
                    // gravity: { y: 700 },
                    // debug: true,
                }
            },
            plugins: {
                scene: [{
                    key: 'SpinePlugin',
                    plugin: window.SpinePlugin,
                    sceneKey: 'spine'
                }]
            },

            width: 1920,
            height: 1080,
        }
    }
    game = new Phaser.Game(config);
    scaleFactorX = config.width / 1920;
    scaleFactorY = config.height / 1080;

    game.scene.add("PreloadScene", preloadScene);
    game.scene.add("GameScene", gameScene);
    game.scene.add("GameErrorScene", gameErrorScene);

    game.scene.start('PreloadScene');
}