import { Constant } from "./Constant";
import PreloadScene from "./scene/PreloadScene";
import MenuScene from "./scene/MenuScene";
import GameScene from "./scene/GameScene";
import ErrorScene from "./scene/GameErrorScene";
import RotateScreen from "./popups/RotateScreen";
import MuteConsole from "./MuteConsole";
import * as GA from "gameanalytics";

window.onload = function () {
    let clientHeight = null;
    let clientWidth = null;
    let widthOffset = null;
    if (window.innerWidth > window.innerHeight) {
        clientHeight = window.innerHeight;
        clientWidth = (clientHeight / 1.77777777778);
        widthOffset = (window.innerWidth / 2) - (clientWidth / 2);
    }
    else {
        clientWidth = window.innerWidth;
        clientHeight = window.innerHeight;
        widthOffset = 0;
    }
    Constant.clientWidth = clientWidth;
    Constant.clientHeight = clientHeight;
    Constant.isMobile = /iPhone|iPhoneX|iPod|iPad|BlackBerry|kindle|playbook|Windows Phone|Android/i.test(navigator.userAgent);
    let config = {
        type: Phaser.AUTO,
        scale: {
            mode: Phaser.Scale.RESIZE,
        },
        plugins: {
            scene: [
                {
                    key: 'SpinePlugin',
                    plugin: window.SpinePlugin,
                    sceneKey: 'spine'
                }
            ],
        },
        physics: {
            default: 'matter',
            matter: {
                enableSleeping: true,
                gravity: {
                    y: Constant.clientWidth / 960,
                    // Y: 0.1
                },
                // plugins: {
                //     wrap: true
                // },
                // debug: {
                //     showBody: true,
                //     showStaticBody: true,
                //     debugBodyColor: 0xffffff
                // }
            }
        },
        width: window.innerWidth,
        height: window.innerHeight,
        // scene: [PreloadScene, MenuScene, GameScene, ErrorScene]
    };

    Constant.game = new Phaser.Game(config);
    console.log(config);

    Constant.game.scene.add('PreloadScene', PreloadScene);
    Constant.game.scene.add('MenuScene', MenuScene);
    Constant.game.scene.add('GameScene', GameScene);
    Constant.game.scene.add('ErrorScene', ErrorScene);

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

    console.log('Game Analytics oBj: ', GA);
    GA.GameAnalytics.setEnabledManualSessionHandling(false); // Let GA manage sessions
    GA.GameAnalytics.setEnabledEventSubmission(true);        // Ensure events send

    GA.GameAnalytics.setEnabledInfoLog(true)
    GA.GameAnalytics.configureUserId(Constant.GAME_KEY);
    GA.GameAnalytics.initialize(Constant.GAME_KEY, Constant.SECRET_KEY);
    GA.GameAnalytics.addDesignEvent("game:boot");
}
window.focus();

window.addEventListener("resize", resize, false);


function resize() {
    let clientHeight = null;
    let clientWidth = null;
    let widthOffset = null;
    if (window.innerWidth > window.innerHeight) {
        clientHeight = window.innerHeight;
        clientWidth = (clientHeight / 1.77777777778);
        widthOffset = (window.innerWidth / 2) - (clientWidth / 2);
    }
    else {
        clientWidth = window.innerWidth;
        clientHeight = window.innerHeight;
        widthOffset = 0;
    }
    Constant.clientWidth = clientWidth;
    Constant.clientHeight = clientHeight;
    Constant.game.events.emit("resize", clientWidth, clientHeight, widthOffset);
}
