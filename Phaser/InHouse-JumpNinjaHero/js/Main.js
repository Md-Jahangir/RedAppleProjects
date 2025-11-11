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
            parent: 'jump_ninja_hero',
            backgroundColor: '#34568b',
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 4500 },
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
            parent: 'jump_ninja_hero',
            backgroundColor: '#34568b',
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 3000 },
                    debug: false,
                },
            },
            width: 1920,
            height: 1080,
        }
    }


    game = new Phaser.Game(config);
    scaleFactorX = config.width / 1920;
    scaleFactorY = config.height / 1080;
    // console.log(scaleFactorX, scaleFactorY);

    window.focus();

    game.scene.add('PreloadScene', preloadScene);
    game.scene.add('TitleScene', titleScene);
    game.scene.add('GameScene', gameScene);


    if (window.innerHeight > window.innerWidth) {
    } else {
        game.scene.start("PreloadScene");
    }

    window.addEventListener("orientationchange", function () {
        if (window.orientation == 0 || window.orientation == 180) // WHEN IN PORTRAIT MODE//
        {
        } else {
            if (!gameStarted) {
                window.location.reload();
            }
        }
    }, false);
    randomNumber = Math.floor((Math.random() * bgControlArray.length));
    // console.log(randomNumber);
}