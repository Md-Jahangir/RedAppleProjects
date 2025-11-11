import { Constant } from "./Constant"
import PreloadScene from "./PreloadScene";
import GameScene from "./GameScene";
import MainMenu from "./MainMenu";
import MenuScene from "./MenuScene";
import CategoryScene from "./CategoryScene";

//plugins
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
//Instance
let preloadScene = new PreloadScene();
let gameScene = new GameScene();
let mainMenu = new MainMenu();
let categoryScene = new CategoryScene();
let menuScene = new MenuScene();
//Game Config
window.onload = function () {
    Constant.isMobile = /iPhone|iPhoneX|iPod|iPad|BlackBerry|kindle|playbook|Windows Phone|Android/i.test(navigator.userAgent);
    let config;
    if (Constant.isMobile) {
        config = {
            type: Phaser.AUTO,
            backgroundColor: 0x222222,
            parent: 'word_match',
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            plugins: {
                scene: [{
                    key: 'rexUI',
                    plugin: UIPlugin,
                    mapping: 'rexUI'
                }]
            },
            width: 1080,
            height: 1920,
            // timeStep: 1 / 120,
        };
    } else {
        config = {
            type: Phaser.AUTO,
            backgroundColor: 0x222222,
            parent: 'word_match',
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            plugins: {
                scene: [{
                    key: 'rexUI',
                    plugin: UIPlugin,
                    mapping: 'rexUI'
                }]
            },

            width: 1080,
            height: 1920,
            // timeStep: 1 / 160,
        };
    }
    Constant.game = new Phaser.Game(config);

    Constant.scaleFactor = config.width / 1080;
    Constant.scaleFactorX = config.width / 1080;
    Constant.scaleFactorY = config.height / 1920;


    Constant.currentAspectRatio = (config.height / config.width);
    Constant.originalAspectRatio = (1920 / 1080);
    Constant.currentRatio = (Constant.currentAspectRatio / Constant.originalAspectRatio);

    //Add Scene
    Constant.game.scene.add('PreloadScene', preloadScene);
    Constant.game.scene.add('MainMenu', mainMenu);
    Constant.game.scene.add('GameScene', gameScene);
    Constant.game.scene.add('CategoryScene', categoryScene);
    Constant.game.scene.add('MenuScene', menuScene);

    //Start Scene
    Constant.game.scene.start("PreloadScene");
}