import { Constant } from "./Constant.js";
import { Server } from "./Server.js";
import { SoundManeger } from "./SoundManeger.js";
import { PlayzhubEventHandler } from "./PlayzhubEventHandler_E6.js";
export default class Lobby extends Phaser.Scene {
  constructor() {
    super("Lobby")
    this.bgmenu;
    this.playButtonContainer = null;
  }
  preload() { }
  create() {
    PlayzhubEventHandler.AdStarted(this.PauseGame.bind(this));
    PlayzhubEventHandler.AdCompleted(this.ResumeGame.bind(this));
    this.CreateBg();
    this.CreatePlayButton();
  }

  PauseGame() {
    console.log(' Game paused ');
  }

  ResumeGame() {
    console.log(' Game Resumed ');
  }

  CreateBg() {
    this.bgmenu = this.add.sprite(Constant.game.config.width / 2, Constant.game.config.height / 2, 'bg_menu').setOrigin(0.5, 0.5).setScale(1.5 * Constant.scaleFactorX, 1.7 * Constant.scaleFactorY);
    let gameNameLogo = this.add.sprite(Constant.game.config.width / 1.6, Constant.game.config.height / 4.2, 'logo').setOrigin(0.5, 0.5).setScale(1.5 * Constant.scaleFactorX, 1.7 * Constant.scaleFactorY);
  }
  CreatePlayButton() {
    this.playButtonContainer = this.add.container(Constant.game.config.width / 1.15, Constant.game.config.height / 1.14);
    let playbtn = this.add.sprite(0, 0, 'Play_button').setOrigin(0.5, 0.5).setScale(1 * Constant.scaleFactorX, 1 * Constant.scaleFactorY).setInteractive({ cursor: 'pointer' });
    const textStyle = {
      fontSize: '74px',
      fontFamily: 'Roboto_Bold',
      color: '#7a2737',
      align: 'center',
      stroke: '#fff',
      strokeThickness: 4,
    }
    let playbtnText = this.add.text(0, 0, "Play", textStyle).setOrigin(0.5, 0.5).setScale(1 * Constant.scaleFactorX, 1 * Constant.scaleFactorY).setInteractive({ cursor: 'pointer' });
    playbtnText.setAngle(-8);

    this.playButtonContainer.add([
      playbtn,
      playbtnText
    ]);


    this.playButtonContainer.list[0].on('pointerdown', function () {
    }, this);
    this.playButtonContainer.list[0].on('pointerup', function () {

      this.StartGame();
      SoundManeger.PlayBackgroundSound();
    }, this);

    this.playButtonContainer.list[1].on('pointerdown', function () {
    }, this);
    this.playButtonContainer.list[1].on('pointerup', function () {
      this.StartGame();
      SoundManeger.PlayBackgroundSound();
    }, this);
  }
  StartGame() {
    this.scene.stop('Lobby');
    this.scene.start('GameScene');
  }
  update(t, dt) {

  }
}