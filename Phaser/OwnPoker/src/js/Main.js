// const cp = new BroadcastChannel("create-player-channel");
import Phaser from 'phaser';
import PreloadScene from './scenes/PreloadScene.js';
import SignInScene from './scenes/SignInScene.js';
import SignUpScene from './scenes/SignUpScene.js';
import ForgotPasswordScene from './scenes/ForgotPasswordScene.js';
import ResetPasswordScene from './scenes/ResetPasswordScene.js';
import UserProfileScene from './scenes/UserProfileScene.js';
import DashboardScene from './scenes/DashboardScene.js';
import ChooseTableScene from './scenes/ChooseTableScene.js';
import TitleScene from './scenes/TitleScene.js';
import GameScene from './scenes/GameScene.js';
import GameErrorScene from './scenes/GameErrorScene.js';
import { Constant } from './Constant.js';
// import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin'
// import RexUIPlugin from 'rex-ui/plugins/rexuiplugin.js';

Constant.isMobile = /iPhone|iPhoneX|iPod|iPad|BlackBerry|kindle|playbook|Windows Phone|Android/i.test(navigator.userAgent);
let config = {
    type: Phaser.AUTO,
    parent: "pokertexasholdem",
    dom: {
        createContainer: true
    },
    plugins: {
        scene: [
            {
                key: 'SpinePlugin',
                plugin: window.SpinePlugin,
                sceneKey: 'spine'
            },
            // {
            //     key: 'rexUI',
            //     plugin: RexUIPlugin,
            //     mapping: 'rexUI'
            // }
        ]
    },
    scale: {
        mode: Phaser.Scale.RESIZE,
        width: window.innerWidth,
        height: window.innerHeight
    },
    scene: [PreloadScene, SignInScene, SignUpScene, ForgotPasswordScene, ResetPasswordScene, UserProfileScene, DashboardScene, ChooseTableScene, TitleScene, GameScene, GameErrorScene]
};

Constant.game = new Phaser.Game(config);

window.focus();

window.addEventListener("resize", resize, false);

function resize() {
    let clientWidth = window.innerWidth;
    let clientHeight = window.innerHeight;
    Constant.game.events.emit("resize", clientWidth, clientHeight);
};