import { Constant } from "./Constant";
import PreloadScene from "./PreloadScene";
import MenuScene from "./MenuScene";
import GameScene from "./GameScene";


let preloadscene = new PreloadScene();
let menuscene = new MenuScene();
let gamescene = new GameScene();

window.onload = function () {
    Constant.isMobile = /iPhone|iPhoneX|iPod|iPad|BlackBerry|kindle|playbook|Windows Phone|Android/i.test(navigator.userAgent);
    let config;
    if (Constant.isMobile) {
        config = {
            type: Phaser.AUTO,
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: {
                        y: 0,
                    },
                    debug: true,

                }
            },
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: '#4488aa',
        };
    }
    else {

        config = {
            type: Phaser.AUTO,
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: {
                        y: 0,
                    },
                    debug: false,

                }
            },
            width: 1920,
            height: 1080,

            backgroundColor: '#4488aa',

        }
    }

    Constant.game = new Phaser.Game(config);

    Constant.scaleFactor = config.height / 1080;
    // Constant.scaleFactorX = config.width / 1920;
    // Constant.scaleFactorY = config.height / 1080;

    Constant.currentAspectRatio = (config.height / config.width);
    Constant.originalAspectRatio = (1920 / 1080);
    Constant.currentRatio = (Constant.currentAspectRatio / Constant.originalAspectRatio);

    // window.focus();
    Constant.game.scene.add("PreloadScene", preloadscene);
    Constant.game.scene.add("MenuScene", menuscene);
    Constant.game.scene.add("GameScene", gamescene);
    Constant.game.scene.start("PreloadScene");
}