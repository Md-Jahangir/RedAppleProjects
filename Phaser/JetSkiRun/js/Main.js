/*@Original_Creator : - Supriyo_Mukherjee.
@Created_Date : - 26 - 11 - 2022.
@Last_Update_By : - Supriyo_Mukherjee.
@Last_Updatd_Date : - 26 - 12 - 2022
@Last_Update_By : - Md_Jahangir.
@Last_Updatd_Date : - 30/01/2023
@Description : - handles the standard config of different devices including the pc and and starting the scene
and maintaing arcade physics*/

//importing required script


import GameScene from './GameScene.js';
import PreloadScene from "./PreloadScene.js";


// game scene and preload scene instances 
let gameScene = new GameScene();
let preloadScene = new PreloadScene();

// checking compatibility if different devices and configuration too including the standard width and height
window.onload = function () {
    const isMobile = /iPhone|iPhoneX|iPod|iPad|BlackBerry|kindle|playbook|Windows Phone|Android/i.test(navigator.userAgent);
    let config;
    if (isMobile) {
        config = {
            type: Phaser.CANVAS,
            backgroundColor: '313131',
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
            width: window.innerWidth,
            height: window.innerHeight,
        };
    }
    else {
        config = {
            type: Phaser.AUTO,
            backgroundColor: 'FFFFFF',

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
            width: 1920,
            height: 1080,
        }
    }
    // creating instance of Phaser
    // const game = new Phaser.Game(config);
    game = new Phaser.Game(config);

    // window.ConstantVariable = {
    //     isMobile,
    //     game,
    //     scaleFactorX: config.width / 1920,
    //     scaleFactorY: config.height / 1080,
    // }

    //adding both the scenes
    game.scene.add("GameScene", gameScene);
    game.scene.add("PreloadScene", preloadScene);

    // starting the preload scene
    game.scene.start('PreloadScene');

    // //adding both the scenes
    // window.ConstantVariable.game.scene.add("GameScene", gameScene);
    // window.ConstantVariable.game.scene.add("PreloadScene", preloadScene);

    // // starting the preload scene
    // window.ConstantVariable.game.scene.start('PreloadScene');
}
