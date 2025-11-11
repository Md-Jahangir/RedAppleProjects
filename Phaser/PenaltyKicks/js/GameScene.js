import { Constant } from "./Constant.js";
import { SoundManeger } from "./SoundManeger.js";
import GameUI from "./GameUI.js"
import GoalKeeperMovement from "./GoalKeeperMovement.js";
import Ball from "./Ball.js";
import GameOverPopUp from "./GameOverPopUp.js";
import ResumePopup from "./ResumePopup.js";
import TitleText from "./TitleText.js";
import GameExitPopUp from "./GameExitPopUp.js";
import Player from "./Player.js";
import { PlayzhubEventHandler } from "./PlayzhubEventHandler_E6.js";
export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene")
    this.controlPoint1;
    this.controlPoint2;
    this.endPoint;
    this.player;
    this.camera;
    this.titleText;

    // this.curFrameIdx = 0;
  }
  init() {
    this.gameUI = new GameUI(this);
    this.goalKeeperMovement = new GoalKeeperMovement(this);
    this.ball = new Ball(this);
    this.gameOverPopUp = new GameOverPopUp(this);
    this.resumePopup = new ResumePopup(this);
    this.titleText = new TitleText(this);
    this.gameExit = new GameExitPopUp(this);
    this.player = new Player(this);
  }
  preload() { }
  create() {
    Constant.playClicked++;
    PlayzhubEventHandler.AdStarted(this.PauseGame.bind(this));
    PlayzhubEventHandler.AdCompleted(this.ResumeGame.bind(this));
    PlayzhubEventHandler.GamePlayStarted(Constant.playClicked);
    Constant.gameStartTime = Date.now();
    //-----------------------------------
    SoundManeger.CreateSounds();
    SoundManeger.PlayBackgroundSound();
    this.gameUI.GameBackground();
    this.gameUI.CreateUI();
    // this.gameUI.CreateLeaveGamePopUp();
    this.gameUI.CreateArrow();
    // this.goalKeeperMovement.AnimateGoalSaver();
    this.goalKeeperMovement.CreateGoalKeeperAnimation();
    this.CreateDefaultBezierCurve();
    this.ball.CreateBall();
    this.gameOverPopUp.CreateGameOverPopUp();
    this.resumePopup.CreateResumePopUp();
    // this.CreatePlayerAnim();
    this.titleText.CreateTitles();
    this.gameExit.CreateExitPopUp();
    this.player.CreatePlayer();
    // this.titleText.CreateConfetiAnim();
    this.camera = this.cameras.main;
    // let owlAnim = this.add.spine(960, 500, 'skeleton').setScale(1, 1);
    // owlAnim.play('idle', true);
    // owlAnim.timeScale = 0.8;
    // console.log(owlAnim)
  }

  PauseGame() {
    console.log(' Game paused ');
  }

  ResumeGame() {
    console.log(' Game Resumed ');
  }

  CreateDefaultBezierCurve() {
    this.graphics = this.add.graphics();

    let startPoint = new Phaser.Math.Vector2(Constant.game.config.width / 2.02, Constant.game.config.height / 1.30);//950,830
    this.controlPoint1 = new Phaser.Math.Vector2(Constant.game.config.width / 4.8, Constant.game.config.height / 5.4);//400,174
    this.controlPoint2 = new Phaser.Math.Vector2(Constant.game.config.width / 4.8, Constant.game.config.height / 5.4);//400,174
    this.endPoint = new Phaser.Math.Vector2(Math.round(Constant.game.config.width / 3.65), Math.round(Constant.game.config.height / 6.2));//526,174

    this.curve = new Phaser.Curves.CubicBezier(startPoint, this.controlPoint1, this.controlPoint2, this.endPoint);
  };
  update() {
  }
}