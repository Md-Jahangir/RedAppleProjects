import { Constant } from "./Constant";
import PreloadScene from "./scenes/PreloadScene";
import MenuScene from "./scenes/MenuScene";
import GameScene from "./scenes/GameScene";
import GameError from "./scenes/GameErrorScene";

//#region -SceneInstance
let preloadScene = new PreloadScene();
let menuScene = new MenuScene();
let gameScene = new GameScene();
let gameError = new GameError();
//#endregion

//#region -Game Config and Load
window.onload = function () {
    let config;
    config = {
        type: Phaser.AUTO,
        background: '#000000',
        parent: 'wheelyeggy',
        scale: {
            mode: Phaser.Scale.RESIZE,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        physics: {
            default: 'matter',
            matter: {
                enableSleeping: true,
                gravity: {
                    y: 2 * window.innerHeight / 1080
                },
                debug: {
                    showBody: false,
                    showStaticBody: false
                }
            }
        },
        width: window.innerWidth,
        height: window.innerHeight
    }

    //Constant Variable assigns
    Constant.game = new Phaser.Game(config);
    Constant.gameWidth = config.width;
    Constant.gameHeight = config.height;
    Constant.scaleFactor = config.width / 1920;

    //load scenes
    Constant.game.scene.add("PreloadScene", preloadScene);
    Constant.game.scene.add("MenuScene", menuScene);
    Constant.game.scene.add("GameScene", gameScene);
    Constant.game.scene.add("GameError", gameError);

    //start scene
    Constant.game.scene.start("PreloadScene");
}
//#endregion

//#region -Resize Event and callback
window.addEventListener("resize", resize, false);

function resize() {
    let clientWidth = window.innerWidth;
    let clientHeight = window.innerHeight;
    Constant.game.events.emit("resize", clientWidth, clientHeight);
};
//#endregion