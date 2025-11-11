
import { Constant } from "./Constant";
import PreloadScene from "./scene/PreloadScene";
import MenuScene from "./scene/MenuScene";
import GameScene from "./scene/GameScene";
import ErrorScene from "./GameErrorScene";
import RotateScreen from "./RotateScreen";
import MuteConsole from "./MuteConsole";
import * as GA from "gameanalytics";

let preloadscene = new PreloadScene();
let menuscene = new MenuScene();
let gamescene = new GameScene();
let errorScene = new ErrorScene();

window.onload = function () {
    Constant.isMobile = /iPhone|iPhoneX|iPod|iPad|BlackBerry|kindle|playbook|Windows Phone|Android/i.test(navigator.userAgent);
    let config = {
        type: Phaser.AUTO,
        scale: {
            mode: Phaser.Scale.RESIZE,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        physics: {
            default: 'matter',
            matter: {
                enableSleeping: true,
                gravity: {
                    y: window.innerHeight / 349.09
                },
                plugins: {
                    wrap: true
                },
                // debug: {
                //     showBody: true,
                //     showStaticBody: true,
                //     debugBodyColor: 0xffffff
                // },
            }
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
    // Constant.scaleFactor = config.width / 1080;
    // Constant.scaleFactorX = config.width / 1080;
    // Constant.scaleFactorY = config.height / 1920;
    Constant.game.canvas.style.marginLeft = '100px'
    Constant.game.scene.add('PreloadScene', preloadscene);
    Constant.game.scene.add('MenuScene', menuscene);
    Constant.game.scene.add('GameScene', gamescene);
    Constant.game.scene.add('ErrorScene', errorScene);


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
    if (window.innerWidth > window.innerHeight) {
        let clientHeight = window.innerHeight;
        let clientWidth = (clientHeight / 1.77777777778);
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