/********* Script_Details ************
 * @Original_Creator :- Amit Kumar.
 * @Created_Date :- 23-10-2024.
 * @Last_Update_By :- Amit Kumar.
 * @Last_Updatd_Date :- 23-10-2024
 * @Description :-Game Scene.
 ************************************/

/* global window */
import Phaser from 'phaser';

export default class GameError extends Phaser.Scene {
  constructor() {
    super('GameError');

  }
  create() {
    this.errorMessageText = this.add.text(window.innerWidth / 2, window.innerHeight / 2, 'URL Missing!');
  }
}