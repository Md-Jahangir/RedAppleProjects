import BootScene from './BootScene.js';
import PreloadScene from './PreloadScene.js';
import TitleScene from './TitleScene.js';
import GameScene from './GameScene.js';
import RotateScreen from './RotateScreen.js';

// Load our scenes
var bootScene = new BootScene();
var preloadScene = new PreloadScene();
var titleScene = new TitleScene();
var gameScene = new GameScene();


window.onload = function () {
    isMobile = /iPhone|iPhoneX|iPod|iPad|BlackBerry|kindle|playbook|Windows Phone|Android/i.test(navigator.userAgent);
    if (isMobile) {
        var config = {
            type: Phaser.CANVAS,
            backgroundColor: 0x000000,
            parent: 'knife_hit',
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            physics: {
                default: 'arcade',
                arcade: {
                    debug: true,
                }
            },
            width: 1080,
            height: 1920,
        };
    }
    else {
        var config = {
            type: Phaser.CANVAS,
            backgroundColor: 0x000000,
            parent: 'knife_hit',
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            physics: {
                default: 'arcade',
                arcade: {
                    debug: true,
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

    // load scenes
    game.scene.add('BootScene', bootScene);
    game.scene.add('PreloadScene', preloadScene);
    game.scene.add('TitleScene', titleScene);
    game.scene.add("GameScene", gameScene);

    // start title
    game.scene.start('PreloadScene');
    let rotateScreen, isPortraitMode;
    game.events.once('ready', () => {
        rotateScreen = new RotateScreen(game);
    });
    game.scale.on('orientationchange', function (orientation) {
        switch (orientation) {
            case Phaser.Scale.PORTRAIT:
                isPortraitMode = true;
                console.log('Switched to PORTRAIT');
                game.events.emit('orientation', isPortraitMode);
            case Phaser.Scale.PORTRAIT_SECONDARY:
                isPortraitMode = true;
                console.log('Switched to PORTRAIT_SECONDARY');
                game.events.emit('orientation', isPortraitMode);
                // Add global logic for portrait mode here
                break;

            case Phaser.Scale.LANDSCAPE:
                isPortraitMode = false;
                console.log('Switched to LANDSCAPE');
                game.events.emit('orientation', isPortraitMode);
            case Phaser.Scale.LANDSCAPE_SECONDARY:
                isPortraitMode = false;
                console.log('Switched to LANDSCAPE_SECONDARY');
                game.events.emit('orientation', isPortraitMode);
                // Add global logic for landscape mode here
                break;
        }
        window.focus();
    });

    GameAnalytics("addDesignEvent", "game:boot");
}