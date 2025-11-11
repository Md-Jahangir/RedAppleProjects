import BootScene from './BootScene.js';
import PreloadScene from './PreloadScene.js';
import TitleScene from './TitleScene.js';

// Load our scenes
var bootScene = new BootScene();
var preloadScene = new PreloadScene();
var titleScene = new TitleScene();
// var gameScene = new GameScene();

window.onload = function() {
    // let isReload;
    isMobile = /iPhone|iPhoneX|iPod|iPad|BlackBerry|kindle|playbook|Windows Phone|Android/i.test(navigator.userAgent);

    if (isMobile) {
        var config = {
            type: Phaser.CANVAS,
            backgroundColor: 0x222222,
            parent: 'knife_hit',
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
        };
    } 
    else {
        var config = {
            type: Phaser.CANVAS,
            backgroundColor: 0x222222,
            parent: 'knife_hit',
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
        };
    }

    game = new Phaser.Game(config);
    // scaleFactor = config.width / 1080;
    scaleFactor = config.height / 1920;
    window.focus();
    // if(!isReload)
    // {
    //     isReload = true;
    //     console.log("The reload Page.............."+isReload);
    //     // location.reload();
    // }
    // load scenes
    game.scene.add('BootScene', bootScene);
    game.scene.add('PreloadScene', preloadScene);
    game.scene.add('TitleScene', titleScene);
    // game.scene.add("GameScene", gameScene);

    // start title
    game.scene.start('BootScene');
}