import Phaser from 'phaser';
import PreloadScene from './PreloadScene.js';
import TitleScene from './TitleScene.js';
import GameScene from './GameScene.js';

// Load our scenes
let preloadScene = new PreloadScene();
let titleScene = new TitleScene();
let gameScene = new GameScene();

let isMobile = /iPhone|iPhoneX|iPod|iPad|BlackBerry|kindle|playbook|Windows Phone|Android/i.test(navigator.userAgent);

const configureGame = () => {
    let config;

    if (isMobile) {
        config = {
            type: Phaser.AUTO,
            backgroundColor: 0x222222,
            parent: 'phaser-game',
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
                    // debug: true,
                    gravity: { y: 0 }
                }
            },
            width: window.innerWidth,
            height: window.innerHeight,
        };
    } else {
        config = {
            type: Phaser.AUTO,
            backgroundColor: 0x222222,
            parent: 'phaser-game',
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
                    // debug: true,
                    gravity: { y: 0 }
                }
            },
            width: 1920,
            height: 1080,
        };
    }

    const game = new Phaser.Game(config);

    window.phaserGame = {
        game,
        scaleFactorX: config.width / 1920,
        scaleFactorY: config.height / 1080,
        popupOpened: false,
        isGameStarted: false
    };

    window.focus();

    // load scenes
    window.phaserGame.game.scene.add('PreloadScene', preloadScene);
    window.phaserGame.game.scene.add('TitleScene', titleScene);
    window.phaserGame.game.scene.add('GameScene', gameScene);

    // start title
    window.phaserGame.game.scene.start('PreloadScene');
};

export default configureGame;