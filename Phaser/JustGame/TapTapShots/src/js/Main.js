
import { Constant } from "./Constant";
import PreloadScene from "./scene/PreloadScene";
import MenuScene from "./scene/MenuScene";
import GameScene from "./scene/GameScene";
import ErrorScene from "./GameErrorScene";

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
    };;

    Constant.game = new Phaser.Game(config);
    // Constant.scaleFactor = config.width / 1080;
    // Constant.scaleFactorX = config.width / 1080;
    // Constant.scaleFactorY = config.height / 1920;

    Constant.game.scene.add('PreloadScene', preloadscene);
    Constant.game.scene.add('MenuScene', menuscene);
    Constant.game.scene.add('GameScene', gamescene);
    Constant.game.scene.add('ErrorScene', errorScene);

    Constant.game.scene.start('PreloadScene');

}
window.focus();

window.addEventListener("resize", resize, false);

function resize() {
    let clientWidth = window.innerWidth;
    let clientHeight = window.innerHeight;
    Constant.game.events.emit("resize", clientWidth, clientHeight)
}