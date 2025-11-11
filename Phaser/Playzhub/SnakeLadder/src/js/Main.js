import Phaser from 'phaser';
import { SpinePlugin } from '@esotericsoftware/spine-phaser';
import PreloadScene from './scenes/PreloadScene.js';
import GameScene from './scenes/GameScene.js';
import { Constant } from './Constant.js';
import MenuScene from './scenes/MenuScene.js';
import TitleScene from './scenes/TitleScene.js';
import RotateScreen from './RotateScreen.js';
import MuteConsole from './MuteConsole.js'
import * as GA from 'gameanalytics';

// window.onload = function () {
//#region - Config canvas
Constant.isMobile = /iPhone|iPhoneX|iPod|iPad|BlackBerry|kindle|playbook|Windows Phone|Android/i.test(navigator.userAgent);

const config = {
    type: Phaser.AUTO,
    // backgroundColor: '#87CEFA',
    parent: 'snakeladder',
    roundPixels: false,
    pixelArt: true,
    autoRound: true,
    antialias: true,
    render: {
        pixelArt: false, // <- MUST be false to allow smooth scaling
        antialias: true,
    },

    plugins: {
        scene: [
            {
                key: 'spine.SpinePlugin',
                plugin: SpinePlugin,
                mapping: 'spine'
            },
        ]
    },
    scale: {
        mode: Phaser.Scale.RESIZE,
        // orientation: Phaser.Scale.Orientation.PORTRAIT,
        width: window.innerWidth,
        height: window.innerHeight,
    },
    scene: [PreloadScene, TitleScene, MenuScene, GameScene]
    // scene: [PreloadScene, GameScene]
};
//#endregion

Constant.game = new Phaser.Game(config);
window.focus();
window.addEventListener('resize', resize, false);

let rotateScreen, isPortraitMode;
Constant.game.events.once('ready', () => {
    rotateScreen = new RotateScreen(Constant.game);
});
Constant.game.scale.on('orientationchange', function (orientation) {
    switch (orientation) {
        case Phaser.Scale.PORTRAIT:
            isPortraitMode = true;
            Constant.game.events.emit('orientation', isPortraitMode);
        case Phaser.Scale.PORTRAIT_SECONDARY:
            isPortraitMode = true;
            Constant.game.events.emit('orientation', isPortraitMode);
            // Add global logic for portrait mode here
            break;

        case Phaser.Scale.LANDSCAPE:
            isPortraitMode = false;
            Constant.game.events.emit('orientation', isPortraitMode);
        case Phaser.Scale.LANDSCAPE_SECONDARY:
            isPortraitMode = false;
            Constant.game.events.emit('orientation', isPortraitMode);
            // Add global logic for landscape mode here
            break;
    }
    window.focus();
});

console.log('Game Analytics oBj: ', GA);
GA.GameAnalytics.setEnabledManualSessionHandling(false); // Let GA manage sessions
GA.GameAnalytics.setEnabledEventSubmission(true);        // Ensure events send

GA.GameAnalytics.setEnabledInfoLog(true)
GA.GameAnalytics.configureUserId(Constant.GAME_KEY);
GA.GameAnalytics.initialize(Constant.GAME_KEY, Constant.SECRET_KEY);
GA.GameAnalytics.addDesignEvent("game:boot");

//#region - Resize event
function resize() {
    if (window.innerWidth > window.innerHeight) {
        const clientHeight = window.innerHeight;
        const clientWidth = (clientHeight / 1.77777777778);
        const widthOffset = (window.innerWidth / 2) - (clientWidth / 2);
        Constant.game.events.emit('resize', clientWidth, clientHeight, widthOffset);
    }
    else {
        const clientWidth = window.innerWidth;
        Constant.clientWidth = clientWidth;

        const clientHeight = window.innerHeight;
        Constant.clientHeight = clientHeight;

        const widthOffset = 0;
        Constant.game.events.emit('resize', clientWidth, clientHeight, widthOffset);
    }
}
//#endregion