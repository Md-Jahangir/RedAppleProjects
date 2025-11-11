/********* Script_Details ************
 * @Original_Creator :- Amit Kumar.
 * @Created_Date :- 23-10-2024.
 * @Last_Update_By :- Amit Kumar.
 * @Last_Updatd_Date :- 23-10-2024
 * @Description :- Creating the Canvas.
 ************************************/

/* global navigator, window */
import Phaser from 'phaser';
import { Constant } from './Constant.js';
import PreloadScene from './scenes/PreloadScene.js';
import GameScene from './scenes/GameScene.js';
import GameError from './scenes/GameErrorScene.js';

//#region - Config canvas
Constant.isMobile = /iPhone|iPhoneX|iPod|iPad|BlackBerry|kindle|playbook|Windows Phone|Android/i.test(navigator.userAgent);
const config = {
  type: Phaser.AUTO,
  parent: 'onetap',

  // plugins: {
  //   scene: [{
  //     key: 'SpinePlugin',
  //     plugin: window.SpinePlugin,
  //     sceneKey: 'spine'
  //   }]
  // },
  scale: {
    mode: Phaser.Scale.RESIZE,
    width: window.innerWidth,
    height: window.innerHeight
  },
  scene: [PreloadScene, GameScene, GameError]
};
//#endregion

Constant.game = new Phaser.Game(config);

// Expose Constant globally for debugging (browser mode only)
if (!window.sessionToken) {
  window.Constant = Constant;
}

window.focus();
window.addEventListener('resize', resize, false);

//#region - Resize event
function resize() {
  const clientWidth = window.innerWidth;
  const clientHeight = window.innerHeight;
  Constant.game.events.emit('resize', clientWidth, clientHeight);
};
//#endregion