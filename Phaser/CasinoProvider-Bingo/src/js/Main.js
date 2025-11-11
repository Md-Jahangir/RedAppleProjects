import Phaser from 'phaser';
import { Constant } from './Constant.js';
import PreloadScene from './SceneManager/PreloadScene.js';
import GameScene from './SceneManager/GameScene.js';
import SplashScene from './SceneManager/SplashScene.js';
import CardsSelectionScene from './SceneManager/CardsSelection.js';
// import GameErrorScene from './GameErrorScene.js';

// let preloadScene = new PreloadScene();
// let splashScene = new SplashScene();
// let cardsSelection = new CardsSelectionScene();
// let gameScene = new GameScene();
// let gameErrorScene = new GameErrorScene();
window.onload = function () {
    Constant.isMobile = /iPhone|iPhoneX|iPod|iPad|BlackBerry|kindle|playbook|Windows Phone|Android/i.test(navigator.userAgent);
    let config = {
        type: Phaser.AUTO,
        parent: "bingo",
        plugins: {
            // scene: [{
            //     key: 'SpinePlugin',
            //     plugin: window.SpinePlugin,
            //     sceneKey: 'spine',
            // }]
        },
        scale: {
            mode: Phaser.Scale.RESIZE,
            width: window.innerWidth,
            height: window.innerHeight
        },

        scene: [PreloadScene, SplashScene, CardsSelectionScene, GameScene]
    };
    Constant.game = new Phaser.Game(config);

    // if (Constant.game.scale.orientation === Phaser.Scale.LANDSCAPE) {
    //     Constant.isPortrait = false;
    // }
    // else if (Constant.game.scale.orientation === Phaser.Scale.PORTRAIT) {
    //     Constant.isPortrait = true;
    // }
    // Constant.game.scene.add('PreloadScene', preloadScene);
    // Constant.game.scene.add('SplashScene', splashScene);
    // Constant.game.scene.add("CardsSelectionScene", cardsSelection);
    // Constant.game.scene.add("GameScene", gameScene);

    // Constant.game.scene.start("PreloadScene");

    window.addEventListener("resize", () => {
        let clientWidth = window.innerWidth;
        let clientHeight = window.innerHeight;
        Constant.game.events.emit("resize", clientWidth, clientHeight);
    }, false);

}