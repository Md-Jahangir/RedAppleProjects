import Phaser from 'phaser';
import { Constant } from './Constant.js';
import PreloadScene from './PreloadScene.js';
import GameScene from './GameScene.js';
// import GameErrorScene from './GameErrorScene.js';
import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";

// Load our scenes
let preloadScene = new PreloadScene();
let gameScene = new GameScene();
// let gameErrorScene = new GameErrorScene();
// let Constant = new Constant();

window.onload = function () {


    Constant.isMobile = /iPhone|iPhoneX|iPod|iPad|BlackBerry|kindle|playbook|Windows Phone|Android/i.test(navigator.userAgent);
    let config;
    // window.alert(Constant.isMobile);
    if (Constant.isMobile) {
        config = {
            type: Phaser.AUTO,
            backgroundColor: 0x222222,
            parent: 'slot',
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            plugins: {
                scene: [
                    {
                        key: "rexUI",
                        plugin: UIPlugin,
                        mapping: "rexUI",
                    },
                    {
                        key: 'SpinePlugin',
                        plugin: window.SpinePlugin,
                        sceneKey: 'spine'
                    }
                ]
            },

            dom: {
                createContainer: true
            },
            // fps: { target: 60 },
            width: window.innerWidth,
            height: window.innerHeight,
            render: {
                // antialias: false,
                pixelArt: true
            }
        };


    } else {
        config = {
            type: Phaser.AUTO,
            backgroundColor: 0x222222,
            parent: 'slot',
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            plugins: {
                scene: [

                    {
                        key: "rexUI",
                        plugin: UIPlugin,
                        mapping: "rexUI",
                    },
                    {
                        key: 'SpinePlugin',
                        plugin: window.SpinePlugin,
                        sceneKey: 'spine'
                    }
                ]
            },

            dom: {
                createContainer: true
            },
            // fps: { target: 60 },
            width: 1920,
            height: 1080,
            render: {
                // antialias: false,
                pixelArt: true
            }
        };
    }

    Constant.game = new Phaser.Game(config);

    // Constant.game.cache.destroy()
    // window.game = Constant.game;    
    // console.log(window.innerWidth, window.innerHeight)

    // start preload 
    if (Constant.game.scale.orientation === Phaser.Scale.LANDSCAPE) {
        Constant.isPortrait = false;
        Constant.scaleFactor = config.width / 1920;
        Constant.scaleFactorX = config.width / 1920;
        Constant.scaleFactorY = config.height / 1080;

        window.focus();

        Constant.currentAspectRatio = (config.height / config.width);
        Constant.originalAspectRatio = (1080 / 1920);
        Constant.currentRatio = (Constant.currentAspectRatio / Constant.originalAspectRatio);
    }
    else if (Constant.game.scale.orientation === Phaser.Scale.PORTRAIT) {
        Constant.isPortrait = true;
        Constant.scaleFactor = config.width / 1080;
        Constant.scaleFactorX = config.width / 1080;
        Constant.scaleFactorY = config.height / 1920;

        window.focus();

        Constant.currentAspectRatio = (config.height / config.width);
        // Constant.originalAspectRatio = (1080 / 1920);
        Constant.originalAspectRatio = (1920 / 1080);
        Constant.currentRatio = (Constant.currentAspectRatio / Constant.originalAspectRatio);
    }

    // load scenes
    Constant.game.scene.add('PreloadScene', preloadScene);
    Constant.game.scene.add("GameScene", gameScene);
    // Constant.game.scene.add("GameErrorScene", gameErrorScene);

    Constant.game.scene.start("PreloadScene");


    // if (!Constant.gameStarted) {
    //     window.location.reload();
    // }


    window.addEventListener("resize", () => {
        //     if (Constant.game.scale.orientation === Phaser.Scale.LANDSCAPE) {
        //         Constant.isPortrait = false;
        //         Constant.scaleFactor = config.width / 1920;
        //         Constant.scaleFactorX = config.width / 1920;
        //         Constant.scaleFactorY = config.height / 1080;

        //         window.focus();

        //         Constant.currentAspectRatio = (config.height / config.width);
        //         Constant.originalAspectRatio = (1080 / 1920);
        //         Constant.currentRatio = (Constant.currentAspectRatio / Constant.originalAspectRatio);
        //     }
        //     else if (Constant.game.scale.orientation === Phaser.Scale.PORTRAIT) {
        //         Constant.isPortrait = true;
        //         Constant.scaleFactor = config.width / 1080;
        //         Constant.scaleFactorX = config.width / 1080;
        //         Constant.scaleFactorY = config.height / 1920;

        //         window.focus();

        //         Constant.currentAspectRatio = (config.width / config.height);
        //         // Constant.originalAspectRatio = (1080 / 1920);
        //         Constant.originalAspectRatio = (1920 / 1080);
        //         Constant.currentRatio = (Constant.currentAspectRatio / Constant.originalAspectRatio);
        //     }
        //     //     console.log("landscape");
        //     // if (Constant.game.scale.orientation === Phaser.Scale.PORTRAIT) {
        if (!Constant.gameStarted) {
            window.location.reload();
        }
        // }
    }, false);


    //--------------------------------
    window.addEventListener("focus", function (event) {
        // window.location.reload();
    }, false);
    //--------------------------------
    // alert("Constant.isPortrait " + Constant.isPortrait + " \n Constant.isMobile " + Constant.isMobile)
}