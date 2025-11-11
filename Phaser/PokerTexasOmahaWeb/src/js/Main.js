/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 16-02-2024.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 09-08-2024
 * @Description :- Creating the Canvas .
 ************************************/

/* global navigator, window */
import Phaser from 'phaser';
import PreloadScene from './scenes/PreloadScene.js';
import GameScene from './scenes/GameScene.js';
import GameErrorScene from './scenes/GameErrorScene.js';
import ReplayHandScene from './scenes/ReplayHandScene.js';
import { Constant } from './Constant.js';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';

//#region - Config canvas
Constant.isMobile = /iPhone|iPhoneX|iPod|iPad|BlackBerry|kindle|playbook|Windows Phone|Android/i.test(navigator.userAgent);
const config = {
  type: Phaser.AUTO,
  parent: 'pokerweb',

  plugins: {
    scene: [
      {
        key: 'SpinePlugin',
        plugin: window.SpinePlugin,
        sceneKey: 'spine'
      },
      {
        key: 'rexUI',
        plugin: UIPlugin,
        mapping: 'rexUI'
      }
    ],
  },
  dom: {
    createContainer: true
  },
  scale: {
    mode: Phaser.Scale.RESIZE,
    width: window.innerWidth,
    height: window.innerHeight
  },
  scene: [PreloadScene, GameScene, ReplayHandScene, GameErrorScene]
};
//#endregion

Constant.game = new Phaser.Game(config);
window.focus();
window.addEventListener('resize', resize, false);

//#region - Resize event
function resize() {
  const clientWidth = window.innerWidth;
  const clientHeight = window.innerHeight;
  Constant.game.events.emit('resize', clientWidth, clientHeight);
};
//#endregion