import PreloadScene from './PreloadScene.js';
import TitleScene from './TitleScene.js';
import GameScene from './GameScene.js';

let preloadScene = new PreloadScene();
let titleScene = new TitleScene();
let gameScene = new GameScene();

window.onload = function () {

    isMobile = /iPhone|iPhoneX|iPod|iPad|BlackBerry|kindle|playbook|Windows Phone|Android/i.test(navigator.userAgent);
    let config;
    let gameStarted = false;

    if (isMobile) {
        config = {
            type: Phaser.AUTO,
            parent: 'retro_speed',
            backgroundColor: '#28282B',
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            physics: {
                default: 'arcade',
                arcade: {
                    // gravity: { y: 4500 },
                    debug: false,
                },
            },
            width: window.innerWidth,
            height: window.innerHeight,
        };
    }
    else {
        config = {
            type: Phaser.AUTO,
            parent: 'retro_speed',
            backgroundColor: '#28282B',
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            physics: {
                default: 'arcade',
                arcade: {
                    // gravity: { y: 15 },
                    debug: false,
                },
            },
            width: 1920,
            height: 1080,
        }
    }

    game = new Phaser.Game(config);

    if (isMobile) {
        scaleFactorX = config.width / 1080;
        scaleFactorY = config.height / 1920;
    }

    else {
        scaleFactorX = config.width / 1920;
        scaleFactorY = config.height / 1080;
    }
    // console.log(scaleFactorX, scaleFactorY);

    window.focus();

    game.scene.add('PreloadScene', preloadScene);
    game.scene.add('TitleScene', titleScene);
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
    randomNumber = (Math.floor(Math.random() * bgArray.length));

}