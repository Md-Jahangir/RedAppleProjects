import PreloadScene from './PreloadScene.js';
import TitleScene from './TitleScene.js';
import GameScene from './GameScene.js';
import GameErrorScene from './GameErrorScene.js';
import { Constant } from './Constant.js';
import RotateScreen from './RotateScreen.js';

// Load our scenes
let preloadScene = new PreloadScene();
let titleScene = new TitleScene();
let gameScene = new GameScene();
let gameErrorScene = new GameErrorScene();

window.onload = function () {
    Constant.isMobile = /iPhone|iPhoneX|iPod|iPad|BlackBerry|kindle|playbook|Windows Phone|Android/i.test(navigator.userAgent);
    let config = {
        type: Phaser.CANVAS,
        scale: {
            mode: Phaser.Scale.RESIZE,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        pixelArt: false,

        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0
    };

    Constant.game = new Phaser.Game(config);
    Constant.game.canvas.id = 'phaser-canvas';
    Constant.clientWidth = window.innerWidth;
    Constant.clientHeight = window.innerHeight;

    Constant.initialWidth = window.innerWidth;
    Constant.initialHeight = window.innerHeight;
    // Constant.game.canvas.style.marginLeft = '100px';

    window.focus();

    // load scenes
    Constant.game.scene.add('PreloadScene', preloadScene);
    Constant.game.scene.add('TitleScene', titleScene);
    Constant.game.scene.add("GameScene", gameScene);
    Constant.game.scene.add("GameErrorScene", gameErrorScene);

    // start title
    Constant.game.scene.start('PreloadScene');
    let rotateScreen, isPortraitMode;
    Constant.game.events.once('ready', () => {
        rotateScreen = new RotateScreen(Constant.game);
    });
    Constant.game.scale.on('orientationchange', function (orientation) {
        switch (orientation) {
            case Phaser.Scale.PORTRAIT:
                isPortraitMode = true;
                console.log('Switched to PORTRAIT');
                Constant.game.events.emit('orientation', isPortraitMode);
            case Phaser.Scale.PORTRAIT_SECONDARY:
                isPortraitMode = true;
                console.log('Switched to PORTRAIT_SECONDARY');
                Constant.game.events.emit('orientation', isPortraitMode);
                // Add global logic for portrait mode here
                break;

            case Phaser.Scale.LANDSCAPE:
                isPortraitMode = false;
                console.log('Switched to LANDSCAPE');
                Constant.game.events.emit('orientation', isPortraitMode);
            case Phaser.Scale.LANDSCAPE_SECONDARY:
                isPortraitMode = false;
                console.log('Switched to LANDSCAPE_SECONDARY');
                Constant.game.events.emit('orientation', isPortraitMode);
                // Add global logic for landscape mode here
                break;
        }
    });
}
window.addEventListener("resize", resize, false);

function resize() {
    if (window.innerWidth >= (window.innerHeight / 1.7777777)) {
        let clientHeight = window.innerHeight;

        let clientWidth = (clientHeight / 1.777777777777);
        let widthOffset = (window.innerWidth / 2) - (clientWidth / 2);
        Constant.game.events.emit("resize", clientWidth, clientHeight, widthOffset);
    }
    else {
        let clientWidth = window.innerWidth;
        Constant.clientWidth = clientWidth;

        let clientHeight = window.innerHeight;
        Constant.clientHeight = clientHeight;

        let widthOffset = 0;
        Constant.game.events.emit("resize", clientWidth, clientHeight, widthOffset);
    }
}
