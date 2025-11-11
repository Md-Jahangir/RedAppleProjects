/* global setTimeout */
/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 30-10-2025.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 30-10-2025
 * @Description :- Design and handling for game over popup.
 ************************************/

import Button from '../component/Button';
import { Utils } from '../utils/Utils';
import { Constant } from '../utils/Constant';

class GameOverPopup {
  constructor(scene) {
    this.scene = scene;

    this.CreateGameOverPopup();
  };
  //#############################################################################################

  //#region - GameOver Popup
  CreateGameOverPopup() {
    this.CreateOverlay();
    this.gameOverPopupContainer = this.scene.add.container(0, 0);
    this.gameOverPopupContainer.setVisible(false);
    this.gameOverPopupContainer.setDepth(5);
    this.CreateBaseAndHeading();
  };
  //#endregion

  //#region - Create Overlay
  CreateOverlay() {
    this.overlay = this.scene.add.image(0, 0, 'overlay').setOrigin(0);
    this.overlay.setDisplaySize(this.scene.scale.width, this.scene.scale.height);
    this.overlay.setInteractive();
    this.overlay.setDepth(5);
    this.overlay.setVisible(false);
  };
  //#endregion

  //#region - Base and Heading
  CreateBaseAndHeading() {
    this.gameOverPopupBase = this.scene.add.image(0, 0, 'popup_base');
    const headingTextStyle = { fontFamily: 'Poppins-SemiBold', fontSize: '62px', fill: '#FFF', fontStyle: 'bold', align: 'center' };
    this.headingText = this.scene.add.text(0, -330, Constant.GAME_OVER_HEADING, headingTextStyle).setOrigin(0.5);

    this.CreateHomeButton();
    this.CreateReplayButton();

    this.gameOverPopupContainer.add([this.gameOverPopupBase, this.headingText]);
    this.CreatePlayerDetailsArea();

  };
  //#endregion

  CreatePlayerDetailsArea() {
    const playerNameTextStyle = { fontFamily: 'Poppins-Regular', fontSize: '46px', fill: '#FFF', fontStyle: 'bold', align: 'center' };
    const playerScoreTextStyle = { fontFamily: 'Poppins-Regular', fontSize: '46px', fill: '#FFF', fontStyle: 'bold', align: 'center' };

    this.playerOneHeadingText = this.scene.add.text(-250, -160, Constant.PLAYER_1, playerNameTextStyle).setOrigin(0.5);
    this.playerOneScore = this.scene.add.text(250, -160, Constant.player1Score, playerScoreTextStyle).setOrigin(0.5);
    this.playerOneLine = this.scene.add.image(0, this.playerOneHeadingText.y + 40, 'line_players');
    this.gameOverPopupContainer.add([this.playerOneHeadingText, this.playerOneScore, this.playerOneLine]);

    this.playerTwoHeadingText = this.scene.add.text(-250, -70, Constant.PLAYER_2, playerNameTextStyle).setOrigin(0.5);
    this.playerTwoScore = this.scene.add.text(250, -70, Constant.player2Score, playerScoreTextStyle).setOrigin(0.5);
    this.playerTwoLine = this.scene.add.image(0, this.playerTwoHeadingText.y + 40, 'line_players');
    this.gameOverPopupContainer.add([this.playerTwoHeadingText, this.playerTwoScore, this.playerTwoLine]);

    this.playerThreeHeadingText = this.scene.add.text(-250, 10, Constant.PLAYER_3, playerNameTextStyle).setOrigin(0.5);
    this.playerThreeScore = this.scene.add.text(250, 10, Constant.player3Score, playerScoreTextStyle).setOrigin(0.5);
    this.playerThreeLine = this.scene.add.image(0, this.playerThreeHeadingText.y + 40, 'line_players');
    this.gameOverPopupContainer.add([this.playerThreeHeadingText, this.playerThreeScore, this.playerThreeLine]);

    this.playerFourHeadingText = this.scene.add.text(-250, 90, Constant.PLAYER_4, playerNameTextStyle).setOrigin(0.5);
    this.playerFourScore = this.scene.add.text(250, 90, Constant.player4Score, playerScoreTextStyle).setOrigin(0.5);
    this.playerFourLine = this.scene.add.image(0, this.playerFourHeadingText.y + 40, 'line_players');
    this.gameOverPopupContainer.add([this.playerFourHeadingText, this.playerFourScore, this.playerFourLine]);

  };

  //#region - Home button
  CreateHomeButton() {
    this.homeButton = new Button(this.scene, 0, 0, 'button_home');
    this.homeButton.setClickCallback(this.OnHomeButtonClicked, this);
    this.homeButton.setDepth(5);
    this.homeButton.hide();
  };
  OnHomeButtonClicked() {
    this.HideGameOverPopup();
    setTimeout(() => {
      Utils.SceneTransition(this.scene, 'MenuScene');
    }, 200);
  };
  ResizeHomeButton(_newWidth, _newHeight, _newScale) {
    this.homeButton.setScale(_newScale);
    this.homeButton.setPosition((_newWidth / 2) - (180 * _newScale), (_newHeight / 2) + (250 * _newScale));
  };
  //#endregion

  //#region - Replay button
  CreateReplayButton() {
    this.replayButton = new Button(this.scene, 0, 0, 'button_replay');
    this.replayButton.setClickCallback(this.OnReplayButtonClicked, this);
    this.replayButton.setDepth(5);
    this.replayButton.hide();
  };
  OnReplayButtonClicked() {
    this.HideGameOverPopup();
  };
  ResizeReplayButton(_newWidth, _newHeight, _newScale) {
    this.replayButton.setScale(_newScale);
    this.replayButton.setPosition((_newWidth / 2) + (180 * _newScale), (_newHeight / 2) + (250 * _newScale));
  };
  //#endregion


  //#region - Show Game Over popup
  ShowGameOverPopup() {
    this.overlay.setVisible(true);
    this.gameOverPopupContainer.setVisible(true);
    this.homeButton.show();
    this.replayButton.show();
  };
  //#endregion

  //#region - Hide Game Over popup
  HideGameOverPopup() {
    this.overlay.setVisible(false);
    this.gameOverPopupContainer.setVisible(false);
    this.homeButton.hide();
    this.replayButton.hide();
  };

  //#region - Resize
  resize(_newWidth, _newHeight, _newScale) {
    this.overlay.setDisplaySize(_newWidth, _newHeight);
    this.gameOverPopupContainer.setScale(_newScale);
    this.gameOverPopupContainer.setPosition((_newWidth / 2), (_newHeight / 2));
    this.ResizeHomeButton(_newWidth, _newHeight, _newScale);
    this.ResizeReplayButton(_newWidth, _newHeight, _newScale);
  };
  //#endregion

};

export default GameOverPopup;