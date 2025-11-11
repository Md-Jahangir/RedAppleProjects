import { Constant } from './Constant.js';
import GameScene from './GameScene.js';
import PreloadScene from "./PreloadScene.js";
import Lobby from "./Lobby.js"
import RotateScreen from './RotateScreen.js';
// import GameResumeScene from "./GameResumeScene.js"

let gameScene = new GameScene();
let preloadScene = new PreloadScene();
let lobby = new Lobby();
// let gameResumeScene = new GameResumeScene();

window.onload = function () {
  let config;
  Constant.isMobile = /iPhone|iPhoneX|iPod|iPad|BlackBerry|kindle|playbook|Windows Phone|Android/i.test(navigator.userAgent);
  if (Constant.isMobile) {
    config = {
      type: Phaser.AUTO,
      // backgroundColor: '313131',
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      physics: {
        default: 'Arcade',
        debug: true,
        arcade: {
          //   // gravity: { y: 700 },
        }
      },
      plugins: {
        scene: [
          {
            key: 'SpinePlugin',
            plugin: window.SpinePlugin,
            sceneKey: 'spine'
          }
        ]
      },
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
  else {
    config = {
      type: Phaser.AUTO,
      // backgroundColor: '577568',

      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      physics: {
        default: 'Arcade',
        debug: true,
        arcade: {
          //   // gravity: { y: 700 },
          debug: true,
        }
      },
      plugins: {
        scene: [
          {
            key: 'SpinePlugin',
            plugin: window.SpinePlugin,
            sceneKey: 'spine'
          }
        ]
      },
      width: 1920,
      height: 1080,
    }
  }
  Constant.game = new Phaser.Game(config);
  // console.log('game', game)
  if (this.isIPad) {
    Constant.scaleFactorX = (config.width / 1920);
    Constant.scaleFactorY = (config.height / 1024);
  } else {
    Constant.scaleFactorX = (config.width / 1920);
    Constant.scaleFactorY = (config.width / 1920);
  }
  window.focus();
  if (Constant.game.scale.orientation === Phaser.Scale.LANDSCAPE) {
    Constant.scaleFactor = config.width / 1920;
    Constant.scaleFactorX = config.width / 1920;
    Constant.scaleFactorY = config.height / 1080;
  }

  else if (Constant.game.scale.orientation === Phaser.Scale.PORTRAIT) {
  }
  else {
    Constant.scaleFactor = config.width / 1920;
    Constant.scaleFactorX = config.width / 1920;
    Constant.scaleFactorY = config.height / 1080;
  }

  Constant.game.scene.add("GameScene", gameScene);
  Constant.game.scene.add("PreloadScene", preloadScene);
  Constant.game.scene.add("Lobby", lobby);
  // Constant.game.scene.add("GameResumeScene", gameResumeScene);

  // game.scene.start('GameScene');
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
    window.focus();
  });
}

