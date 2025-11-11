/* eslint-disable no-console */
/* global window,setTimeout,console */
/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 16-02-2024.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 09-08-2024
 * @Description :- Control the full gameplay.
 ************************************/

import Phaser from 'phaser';
import { SelectedResolution } from '../ResolutionSelector.js';
import { Utils } from '../Utils.js';
import Table from '../ui/Table.js';
import Player from '../ui/Player.js';
import UpperPanel from '../ui/UpperPanel.js';
import BottomPanel from '../ui/BottomPanel.js';
import { Model } from '../Model.js';
import { Client } from '../services/Client.js';
import LoadingPopup from '../popup/LoadingPopup.js';
import WinPopup from '../popup/WinPopup.js';
import AlertPopup from '../popup/AlertPopup.js';
import LeavingPopup from '../popup/LeavePopup.js';
import BuyinPopup from '../popup/BuyinPopup.js';
import SettingPopup from '../popup/SettingPopup.js';
import TournamentStageOverPopup from '../popup/TournamentStageOverPopup.js';
import SittingAnimationPopup from '../popup/SittingAnimationPopup.js';
import { Constant } from '../Constant.js';
import HandCoolDownTimerPopup from '../popup/HandCooldownTimerPopup.js';
import { GameAnalytics } from '../GameAnalyticsSDK';
import { getCurrentTimestampMillis } from '../timeLib.js';

export default class GameScene extends Phaser.Scene {

  constructor() {
    super('GameScene');
    this.bottomPanel = null;
    this.upperPanel = null;
    this.table = null;
    this.allPlayerArray = [];
    this.blindAnimCount = 0;
    this.chipArray = [];
    this.currentBet = 0;
    this.currentRound = null;
    this.loadingPopup = null;
    this.winPopup = null;
    this.alertPopup = null;
    this.cardAnimArray = [];
    this.currentPlayerId = null;
    this.totalTurnTime = null;
    this.currentNewScale = null;
    this.placeHolderContainerArray = [];
    this.sittingAnimPopup = null;
    this.localSitinIndex = null;
    this.currentSitIndexPressed = null;
    this.buyInZeroPlayerFound = false;
    this.isShowHandCooldownTimer = false;
    this.coin = null;
    this.confetti = null;
    // this.versionControl = '1.0.0';
  };

  init() { };
  preload() {
    // this.load.plugin('rexinputtextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js', true);
  };

  //#region - Create all images
  create() {
    // Client.SetConnection();
    this.game.events.on('resize', this.resize, this);

    this.game.events.on('evtCreatePlayer', this.CreatePlayer, this);
    this.game.events.on('evtJoinPlayer', this.JoinPlayer, this);
    this.game.events.on('evtInactivePlayer', this.InactivePlayer, this);
    this.game.events.on('evtShowSmallAndBigBlind', this.ShowSmallAndBigBlind, this);
    this.game.events.on('evtShowBlindDeductAnimation', this.ShowBlindAmountDeductAnimation, this);
    this.game.events.on('evtShowCardDistributionAnimation', this.ShowCardDistributionAnimation, this);
    this.game.events.on('evtChangeTurn', this.ShowPlayerTurn, this);
    this.game.events.on('evtShowTimer', this.SetPlayerTimer, this);
    this.game.events.on('evtUpdatePotValue', this.OnUpdatePotValue, this);

    this.game.events.on('evtDealFlopRound', this.ShowFlopRound, this);
    this.game.events.on('evtDealTurnRound', this.ShowTurnRound, this);
    this.game.events.on('evtDealRiverRound', this.ShowRiverRound, this);
    this.game.events.on('evtShowDownRound', this.ShowShowDownRound, this);
    this.game.events.on('evtReplayHand', this.ShowReplayHand, this);
    this.game.events.on('evtShowAlert', this.ShowAlertPopup, this);
    // this.game.events.on('evtSitOutSuccess', this.OnSitOutSuccess, this);
    this.game.events.on('evtTournamentStageOver', this.TournamentStageOverPopupShow, this);
    this.game.events.on('evtHideTournamentStagePopup', this.TournamentStageOverPopupHide, this);
    this.game.events.on('evtTournamentStageOverCounter', this.TournamentStageOverCounterUpdate, this);
    this.game.events.on('evtRecieveMessage', this.CreateRecieveMessage, this);
    this.game.events.on('evtBuyInSuccess', this.OnBuyInSuccess, this);
    this.game.events.on('evtUpdateUserBalanceFromUpdateChips', this.OnUpdateUserBalanceFromUpdateChips, this);
    this.game.events.on('evtGettingAckFromSitIn', this.OnSitInAckSuccess, this);
    this.game.events.on('evtGameStateData', this.GameStateData, this);
    this.game.events.on('evtSpectatorPreFlop', this.SpectatorPreFlopBackCardShow, this);
    // this.game.events.on('evtHandCooldownTimer', this.HandCooldownTimer, this);
    this.game.events.on('evtLeaveTableJsBridge', this.LeaveTableViaJsBridge, this);
    this.game.events.on('evtUserTimeEnd', this.OnUserTimerEnd, this);
    this.game.events.on('evtHandStrength', this.ShowHandStrength, this);
    // this.playerPosArray = [
    //   { x: 9.47, y: 217.67 },//middle down//0
    //   { x: -583.16, y: 161.54 },//left down//1
    //   { x: -517.11, y: -218.83 },//left up//2
    //   { x: -11.14, y: -316.36 },//middle up//3
    //   { x: 566.31, y: -218.83 },//right up//4
    //   { x: 592.91, y: 161.54 },//right down//5
    // ];
    this.playerPosArray = [
      { x: 11, y: 217 },//middle down//0
      { x: -565, y: 162 },//left down//1
      { x: -565, y: -220 },//left up//2
      { x: 11, y: -325 },//middle up//3
      { x: 585, y: -220 },//right up//4
      { x: 585, y: 162 },//right down//5
    ];
    this.userInfoDataArray = [
      { x: 0, y: 100, nameBaseXoffset: 0, nameTextOrigin: 0.5, offsetXUserBalance: -15, distFactor: -50 },//middle down//0
      { x: -85, y: -10, nameBaseXoffset: -(137.43 / 2) + 5, nameTextOrigin: 1, offsetXUserBalance: -30, distFactor: -75 },//left down//1
      { x: -85, y: -15, nameBaseXoffset: -(137.43 / 2) + 5, nameTextOrigin: 1, offsetXUserBalance: -30, distFactor: -75 },//left up//2
      { x: 85, y: -10, nameBaseXoffset: (137.43 / 2) - 5, nameTextOrigin: 0, offsetXUserBalance: 4, distFactor: -15 },//middle up//3
      { x: 85, y: -10, nameBaseXoffset: (137.43 / 2) - 5, nameTextOrigin: 0, offsetXUserBalance: 4, distFactor: -15 },//right up//4
      { x: 85, y: -10, nameBaseXoffset: (137.43 / 2) - 5, nameTextOrigin: 0, offsetXUserBalance: 4, distFactor: -15 },//right down//5
    ];
    this.userWinInfoDataArray = [
      { offsetX: 0, offsetY: 100, winTextOffsetX: -25, winTextOffsetY: 50, nameTextOrigin: 0.5 },
      { offsetX: -105, offsetY: -10, winTextOffsetX: -75, winTextOffsetY: 50, nameTextOrigin: 1 },
      { offsetX: -105, offsetY: -15, winTextOffsetX: -75, winTextOffsetY: 50, nameTextOrigin: 1 },
      { offsetX: 105, offsetY: -10, winTextOffsetX: 25, winTextOffsetY: 50, nameTextOrigin: 0 },
      { offsetX: 105, offsetY: -10, winTextOffsetX: 25, winTextOffsetY: 50, nameTextOrigin: 0 },
      { offsetX: 105, offsetY: -10, winTextOffsetX: 25, winTextOffsetY: 50, nameTextOrigin: 0 }
    ];
    // this.userDecisionBaseArray = [
    //   { x: 100, y: -40, offsetX: 20, originX: 0 },//middle down//0
    //   { x: 83, y: 0, offsetX: 20, originX: 0 },//left down//1

    //   { x: 80, y: 25, offsetX: 20, originX: 0 },//left up//2
    //   { x: -85, y: 0, offsetX: -20, originX: 1 },//middle up//3
    //   { x: -80, y: 25, offsetX: -20, originX: 1 },//right up//4
    //   { x: -83, y: 0, offsetX: -20, originX: 1 },//right down//5
    // ];
    this.userDecisionBaseArray = [
      { x: 100, y: -40, offsetX: 25, originX: 0 },//middle down//0
      { x: 100, y: -15, offsetX: 25, originX: 0 },//left down//1
      { x: 100, y: -15, offsetX: 25, originX: 0 },//left up//2
      { x: -100, y: -15, offsetX: -25, originX: 1 },//middle up//3
      { x: -100, y: -15, offsetX: -25, originX: 1 },//right up//4
      { x: -100, y: -15, offsetX: -25, originX: 1 },//right down//5
    ];

    // this.userCurrentBetShowBasePosArray = [
    //   { x: 100, y: -40, offsetX: 20, originX: 0 },//middle down//0
    //   { x: 100, y: -15, offsetX: 20, originX: 0 },//left down//1
    //   { x: 100, y: -15, offsetX: 20, originX: 0 },//left up//2
    //   { x: -100, y: -15, offsetX: -20, originX: 1 },//middle up//3
    //   { x: -100, y: -15, offsetX: -20, originX: 1 },//right up//4
    //   { x: -100, y: -15, offsetX: -20, originX: 1 },//right down//5
    // ];
    // this.userDealerPosArray = [
    //   { x: -80, y: -17 },//middle down//0
    //   { x: 47.5, y: 55 },//left down//1
    //   { x: -55, y: -25 },//left up//2
    //   { x: 47.5, y: 55 },//middle up//3
    //   { x: 47.5, y: 55 },//right up//4
    //   { x: 47.5, y: 55 },//right down//5
    // ];
    this.userDealerPosArray = [
      { x: -60, y: -17 },//middle down//0
      { x: 60, y: -17 },//left down//1
      { x: 60, y: -17 },//left up//2
      { x: -60, y: -17 },//middle up//3
      { x: -60, y: -17 },//right up//4
      { x: -60, y: -17 },//right down//5
    ];

    this.userSmallBigBlindPosArray = [
      { x: -80, y: 50 },//middle down//0
      { x: 55, y: 50 },//left down//1
      { x: 55, y: 50 },//left up//2
      { x: -55, y: 50 },//middle up//3
      { x: -55, y: 50 },//right up//4
      { x: -55, y: 50 },//right down//5
    ];

    this.CreateGameplayBg();
    this.table = new Table(this);
    this.upperPanel = new UpperPanel(this);
    this.bottomPanel = new BottomPanel(this);
    this.CreateChip();
    this.CreatePlayerPlaceHolder();
    this.CreatePopup();
    // this.CreateCoinAnimation();
    // this.CreateConfettiAnimation();

    // setTimeout(() => {
    //   this.PlayCoinAnimation();
    // }, 1000);

    // //Create All player
    // for (let i = 0; i < 6; i++) {
    //   const player = new Player(this, this.playerPosArray[i].x, this.playerPosArray[i].y);
    //   //   // player.InactivePlayer();
    //   player.ShowHideBackCard(true);
    //   player.ShowHideDelearIcon(true);
    //   player.ShowHideBigBlind(true);
    //   player.ShowDecisionBase('called');
    //   player.ShowHideCurrentBetShowArea(true, '10');
    //   //   // player.ShowDecisionBase("_msg");
    //   //   player.ShowHideSmallBlind(true);
    //   //   // player.ShowHideTimer(true);
    //   // player.AdjustCurrentBetShowArea();
    //   player.AdjustPlayerInfoSection(this.userInfoDataArray[i].x, this.userInfoDataArray[i].y, this.userInfoDataArray[i].nameBaseXoffset, this.userInfoDataArray[i].nameTextOrigin, this.userInfoDataArray[i].offsetXUserBalance, this.userInfoDataArray[i].distFactor);
    //   player.AdjustDecisionBase(this.userDecisionBaseArray[i].x, this.userDecisionBaseArray[i].y, this.userDecisionBaseArray[i].offsetX, this.userDecisionBaseArray[i].originX);
    //   player.AdjustDealerSection(this.userDealerPosArray[i].x, this.userDealerPosArray[i].y);
    //   player.AdjustBigBlindSection(this.userSmallBigBlindPosArray[i].x, this.userSmallBigBlindPosArray[i].y);
    //   //   // player.FoldPlayer();
    //   this.allPlayerArray.push(player);
    // }
    // this.allPlayerArray[0].ShowHideBackCard(false);
    // this.allPlayerArray[0].AdjustCharacterSection();
    // this.allPlayerArray[0].ShowHideFrontCard(true);
    // this.allPlayerArray[0].ShowHideBackCard(false);
    // this.allPlayerArray[0].ShowHideDelearIcon(true);
    // this.allPlayerArray[0].ShowHideBigBlind(true);
    // this.allPlayerArray[0].ShowHideSmallBlind(true);
    // this.allPlayerArray[0].AdjustDealerSection(this.userDealerPosArray[0].x - 20, this.userDealerPosArray[0].y);

    // this.ShowSmallAndBigBlind();
    // // this.ShowCardDistributionAnimation();
    // // this.ShowPlayerTurn();

    // this.allPlayerArray[1].FoldPlayer();
    // this.allPlayerArray[1].ShowDecisionBase('_msg');

    // console.log('this.allPlayerArray: ', this.allPlayerArray);

    // let time = new Timer(this, 300, 300);
    // setTimeout(() => {
    //     time.start(30);
    // }, 2000);
    this.resize(window.innerWidth, window.innerHeight);

    if (Model.GetLocalPlayerID() !== null) {
      Client.JoinQueue();
    }

    // this.loadingPopup.ShowLoadingPopup();

  };

  //#region - Create Place Holder
  CreatePlayerPlaceHolder() {
    for (let i = 0; i < this.playerPosArray.length; i++) {
      const placeHolderContainer = this.add.container(0, 0);
      const placeHolderBase = this.add.image(0, 0, 'user_base').setOrigin(0.5);
      // const placeHolderArrow = this.add.sprite(0, 0, 'sit_in_arrow').setOrigin(0.5);
      const placeHolderArrow = this.add.sprite(0, 0, 'sit_in_icon').setOrigin(0.5).setScale(0.8);
      // placeHolderArrow.play('sit_in_arrow_anim');
      const placeHolderRing = this.add.image(0, 0, 'user_ring').setOrigin(0.5);
      placeHolderRing.setVisible(false);
      placeHolderContainer.add([placeHolderBase, placeHolderArrow, placeHolderRing]);
      placeHolderContainer.setSize(placeHolderBase.width, placeHolderBase.height);
      placeHolderContainer.index = i;
      placeHolderContainer.setInteractive({ cursor: 'pointer' });
      placeHolderContainer.on('pointerdown', () => this.OnPlaceHolderClicked(placeHolderContainer), this);

      this.placeHolderContainerArray.push(placeHolderContainer);
    }
    this.placeHolderLoader = this.add.sprite(0, 0, 'loading_wheel').setOrigin(0.5).setVisible(false).setScale(0.9);
    this.anims.create({
      key: 'loading_anim_placeHolder',
      frameRate: 5,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('loading_wheel', { start: 0, end: 2 }),
    });

  };
  //#endregion
  //#region - Show Loading popup
  ShowPlaceHolderLoadingPopup(_idx) {
    this.placeHolderLoader.setPosition(this.placeHolderContainerArray[_idx].x, this.placeHolderContainerArray[_idx].y);
    this.placeHolderLoader.play('loading_anim_placeHolder');
    this.placeHolderLoader.setVisible(true);
  };
  //#endregion

  //#region - Hide Loading popup
  HidePlaceHolderLoadingPopup() {
    this.placeHolderLoader.stop('loading_anim');
    this.placeHolderLoader.setVisible(false);
  };

  ShowHidePlaceHolder(_posIndex, _status) {
    this.placeHolderContainerArray[_posIndex].setVisible(_status);
  };

  OnPlaceHolderClicked(_this) {
    this.currentSitIndexPressed = _this.index;
    if (Model.GetSeatIndex() === null) {
      this.ShowPlaceHolderLoadingPopup(this.currentSitIndexPressed);
      if (Model.GetType() === 'cash') {
        this.buyinPopup.ShowBuyinPopup();
      } else {
        Client.SitIn(this.currentSitIndexPressed);
      }
    }
  };

  OnBuyInSuccess() {
    // this.ShowPlaceHolderLoadingPopup(this.currentSitIndexPressed);
    if (this.buyInZeroPlayerFound) {
      Client.UpdateChips(Model.GetBuyInAmount());
      // this.loadingPopup.HideLoadingPopup();
      this.HidePlaceHolderLoadingPopup();
    } else {
      Client.SitIn(this.currentSitIndexPressed);
    }
  };

  OnUpdateUserBalanceFromUpdateChips() {
    const chipsData = Model.GetUpdateChipsData();
    console.log('OnUpdateUserBalanceFromUpdateChips: ', chipsData);
    for (let i = 0; i < this.allPlayerArray.length; i++) {
      if (this.allPlayerArray[i].playerId === chipsData.user_id) {
        this.allPlayerArray[i].SetUserBalance(chipsData.buy_in);
      }
    }
  };

  OnSitInAckSuccess() {
    if (this.currentSitIndexPressed !== 0) {
      if (Model.GetSeatIndex() === null) {
        this.localSitinIndex = this.currentSitIndexPressed;
        this.sittingAnimPopup.PlayerPlacedAnim(this.currentSitIndexPressed, true);
        this.ShowHideSittingAnimControl(false);
        Model.SetSeatIndex(this.currentSitIndexPressed);
      }
    }
  };

  SitOut() {
    const seatIndex = Model.GetSeatIndex();
    if (seatIndex !== null) {
      Client.SitOut(seatIndex);
    }
    else {
      this.HidePlaceHolderLoadingPopup();
    }
  };

  ShowHideSittingAnimControl(_status) {
    if (_status === false) {
      this.placeHolderContainerArray.forEach((element, index) => {
        element.setVisible(false);
        this.sittingAnimPopup.placedAnimContainerArray[index].setVisible(true);
      });
    }
  };
  ControlPlayerAndEmptyPlaceVisibility() {
    // const playersResponseData = Model.GetPlayersData();
    const playersResponseData = Model.GetRoomDetailsData();
    const localPlayerID = Model.GetLocalPlayerID();
    let localPlayerIndex = null;
    let localPlayerSeatIndex = null;
    localPlayerIndex = playersResponseData.findIndex(user => user.user_id === localPlayerID);
    localPlayerSeatIndex = (localPlayerIndex === -1) ? 0 : playersResponseData[localPlayerIndex].seat_no;
    for (let i = 0; i < this.placeHolderContainerArray.length; i++) {
      this.ShowHidePlaceHolder(i, true);
    }
    for (let i = 0; i < playersResponseData.length; i++) {
      if (playersResponseData[i].sit_in) {
        let positionIndex = (playersResponseData[i].seat_no - localPlayerSeatIndex);
        if (positionIndex < 0) positionIndex += 6;
        this.allPlayerArray[i].playerContainer.setVisible(true);
        this.ShowHidePlaceHolder(positionIndex, false);
      }
    }
  };

  //#region - Resize PlaceHolder
  ResizePlayerPlaceHolder(_newWidth, _newHeight, _newScale) {
    for (let i = 0; i < this.placeHolderContainerArray.length; i++) {
      this.placeHolderContainerArray[i].setScale(_newScale);
      this.placeHolderContainerArray[i].setPosition((_newWidth / 2) + (this.playerPosArray[i].x * _newScale), (_newHeight / 2) + (this.playerPosArray[i].y * _newScale));
    }
    this.placeHolderLoader.setScale(_newScale * 0.9);
    if (!Utils.IsEmpty(this.currentSitIndexPressed)) {
      this.placeHolderLoader.setPosition(this.placeHolderContainerArray[this.currentSitIndexPressed].x, this.placeHolderContainerArray[this.currentSitIndexPressed].y);
    }
  };
  //#endregion

  // OnSitOutSuccess() {
  //   // eslint-disable-next-line no-console
  //   console.log('OnSitOutSuccess _this !');
  //   //Show the placeholder
  // };

  //#region - TournamentStageOver Popup Show
  TournamentStageOverPopupShow(_msg) {
    this.winPopup.HideWinPopup();
    this.tournamentStageOverPopup.ShowTournamentStageOverPopup(_msg);
  }
  //#endregion

  //#region - TournamentStageOver Popup Hide
  TournamentStageOverPopupHide() {
    this.tournamentStageOverPopup.HideTournamentStageOverPopup();
  }
  //#endregion

  //#region - Resize PlaceHolder
  TournamentStageOverCounterUpdate(_counter) {
    this.tournamentStageOverPopup.UpdateStageOverCounter(_counter);
  }
  //#endregion

  //#region - Create Bg
  CreatePopup() {
    this.loadingPopup = new LoadingPopup(this);
    this.leavingPopup = new LeavingPopup(this);
    this.winPopup = new WinPopup(this);
    this.handCoolDownTimerPopup = new HandCoolDownTimerPopup(this);
    this.buyinPopup = new BuyinPopup(this);
    this.settingPopup = new SettingPopup(this);
    this.tournamentStageOverPopup = new TournamentStageOverPopup(this);
    this.sittingAnimPopup = new SittingAnimationPopup(this);
    // this.chatPopup = new ChatPopup(this);
    this.alertPopup = new AlertPopup(this);
  };
  //#endregion

  //#region - Create Bg
  CreateGameplayBg() {
    this.gameplayBg = this.add.image(0, 0, 'game_bg').setOrigin(0);
    const versionControlTextStyle = { fontFamily: 'Poppins-Regular', fontSize: '20px', fill: '#FFF', fontStyle: 'normal', align: 'right' };
    this.versionControlText = this.add.text(0, 0, `V  ${Constant.VERSION_TEXT}`, versionControlTextStyle).setOrigin(0.5);
  };
  ResizeGameplayBg(newWidth, newHeight, newScale) {
    this.gameplayBg.setDisplaySize(newWidth, newHeight);
    this.versionControlText.setScale(newScale);
    this.versionControlText.setPosition(50 * newScale, newHeight - (50 * newScale));
  };
  //#endregion

  //#region - Show alert popup

  ShowAlertPopup(_msg) {
    this.loadingPopup.HideLoadingPopup();
    this.alertPopup.ShowAlertPopup(_msg);
  };
  //#endregion

  //----------------------------------------------------------
  //#region - CHIP ANIMATION
  CreateChip() {
    for (let i = 0; i < this.playerPosArray.length; i++) {
      const chip = this.add.image(0, 0, 'poker_chip_popup');
      chip.setVisible(false);
      this.chipArray.push(chip);
    }
  };
  ResizeChip(_newWidth, _newHeight, _newScale) {
    for (let i = 0; i < this.chipArray.length; i++) {
      this.chipArray[i].setScale(1.5 * _newScale);
      this.chipArray[i].setPosition((_newWidth / 2) + (this.playerPosArray[i].x * _newScale), (_newHeight / 2) + (this.playerPosArray[i].y * _newScale));
    }
  };
  ShowChipAnimation(_potAmount, _obj, _startX, _startY, _endPosX, _endPosY) {
    _obj.setPosition(_startX, _startY);
    _obj.setVisible(true);
    this.add.tween({
      targets: [_obj],
      delay: 100,
      x: _endPosX,
      y: _endPosY,
      ease: 'Linear',
      duration: 500,
      callbackScope: this,
      onComplete: function () {
        _obj.setVisible(false);
        this.UpdatePotAmount(_potAmount);
        this.allPlayerArray.forEach(element => {
          element.ShowHideCurrentBetShowArea(false, '');
        });
        _obj.setPosition(_startX, _startY);
      }
    });
  };
  //#endregion
  //----------------------------------------------------------------

  //#region - CREATE PLAYER
  CreatePlayer() {
    this.DestroyPlayer();
    Model.SetSeatIndex(null);
    const localPlayerID = Model.GetLocalPlayerID();
    const localPlayerData = Model.GetLocalPlayerData();
    // const playersResponseData = Model.GetPlayersData();
    const playersResponseData = Model.GetRoomDetailsData();
    let localPlayerIndex;
    let localPlayerSeatIndex;

    try {
      if (this.localSitinIndex === null) {
        this.placeHolderContainerArray.forEach((_, i) => this.ShowHidePlaceHolder(i, true));
      }
      if (!Utils.IsEmpty(playersResponseData)) {
        localPlayerIndex = playersResponseData.findIndex(user => user.user_id === localPlayerID);
        localPlayerSeatIndex = (localPlayerIndex === -1) ? 0 : playersResponseData[localPlayerIndex].seat_no;
        Model.SetLocalPlayerIndex(localPlayerSeatIndex);

        for (let i = 0; i < playersResponseData.length; i++) {
          if (playersResponseData[i].sit_in) {
            let positionIndex = (playersResponseData[i].seat_no - localPlayerSeatIndex);
            if (positionIndex < 0) positionIndex += 6;
            const player = new Player(this, this.playerPosArray[positionIndex].x, this.playerPosArray[positionIndex].y);
            player.SetUserName(playersResponseData[i].user_name);
            // player.SetIsPlayerInGame(playersResponseData[i].inGame);
            if (playersResponseData[i].profile.profile_pic) {
              player.SetUserImageFromServer(playersResponseData[i].profile.profile_pic);
            } else {
              player.SetUserImageFromServer('profile_pic_0');
            }
            if (localPlayerData.settings.table_theme.back_deck) {
              player.SetBackCardImageFromServer(localPlayerData.settings.table_theme.back_deck);
            } else {
              player.SetBackCardImageFromServer('back_card_0');
            }
            if (localPlayerData.settings.table_theme.front_deck) {
              player.SetFrontCardImageFromServer(localPlayerData.settings.table_theme.front_deck);
            } else {
              player.SetFrontCardImageFromServer('front_card_0');
            }

            player.SetUserBalance(playersResponseData[i].buy_in);
            player.SetPlayerId(playersResponseData[i].user_id);
            player.SetPlayerSittingIndex(playersResponseData[i].seat_no);
            player.SetPlayerPositionIndex(positionIndex);
            // player.isDelear = playersResponseData[i].is_dealer;
            // player.ShowHideDelearIcon(player.isDelear);

            player.AdjustPlayerInfoSection(this.userInfoDataArray[positionIndex].x, this.userInfoDataArray[positionIndex].y, this.userInfoDataArray[positionIndex].nameBaseXoffset, this.userInfoDataArray[positionIndex].nameTextOrigin, this.userInfoDataArray[positionIndex].offsetXUserBalance, this.userInfoDataArray[positionIndex].distFactor);
            player.AdjustPlayerWinData(this.userWinInfoDataArray[positionIndex].offsetX, this.userWinInfoDataArray[positionIndex].offsetY, this.userWinInfoDataArray[positionIndex].winTextOffsetX, this.userWinInfoDataArray[positionIndex].winTextOffsetY, this.userWinInfoDataArray[positionIndex].nameTextOrigin);
            player.AdjustDecisionBase(this.userDecisionBaseArray[positionIndex].x, this.userDecisionBaseArray[positionIndex].y, this.userDecisionBaseArray[positionIndex].offsetX, this.userDecisionBaseArray[positionIndex].originX);
            player.AdjustDealerSection(this.userDealerPosArray[positionIndex].x, this.userDealerPosArray[positionIndex].y);
            if (localPlayerIndex === i) {
              Model.SetSeatIndex(playersResponseData[i].seat_no);

              player.AdjustCharacterSection();
              player.AdjustDealerSection(this.userDealerPosArray[0].x - 20, this.userDealerPosArray[0].y);
              Model.SetCurrentUserBalance(playersResponseData[i].buy_in);
            }
            // console.log('Model.GetSeatIndex(): ', Model.GetSeatIndex());

            // if (Model.GetSeatIndex() !== null) {
            //   console.log('inside check: ', Model.GetSeatIndex());
            //   this.upperPanel.EnableDisableSitOutButton(true);
            // } else {
            //   console.log('outside check: ', Model.GetSeatIndex());
            //   this.upperPanel.EnableDisableSitOutButton(false);
            // }

            this.allPlayerArray.push(player);
            this.ShowHidePlaceHolder(positionIndex, false);
          }
        }

        if (this.localSitinIndex !== null) {
          this.allPlayerArray.forEach(element => {
            element.playerContainer.setVisible(false);
          });
          this.localSitinIndex = null;
        }
        Client.GetGameState();
        this.loadingPopup.HideLoadingPopup();
        this.HidePlaceHolderLoadingPopup();
        this.resize(window.innerWidth, window.innerHeight);
      } else { }
    } catch (error) {
      console.log('Create player error: ', error);
    }

  };

  DestroyPlayer() {
    for (let i = 0; i < this.allPlayerArray.length; i++) {
      this.allPlayerArray[i].DestroyPlayer();
    }
    this.allPlayerArray = [];
  };

  InactivePlayer() {
    const roomData = Model.GetRoomDetailsData();
    const leavedUserId = Model.GetSitOutPlayerDetails().user_id;
    const removePlayerId = roomData.findIndex(user => user.user_id === leavedUserId);
    const localPlayerID = Model.GetLocalPlayerID();

    let playerSeatIndex = null;
    const player = this.allPlayerArray.find(element => element.playerId === leavedUserId);
    if (player) {
      playerSeatIndex = player.GetPlayerSittingIndex();
    }

    if (removePlayerId !== -1) {
      roomData.splice(removePlayerId, 1);
    }
    // this.CreatePlayer();

    if (playerSeatIndex !== 0 && leavedUserId === localPlayerID) {
      this.CreatePlayer();
    }
    else {
      const playersResponseData = Model.GetRoomDetailsData();
      const leavePlayerSeatNo = Model.GetSitOutPlayerDetails().seat_no;
      const localPlayerIndex = playersResponseData.findIndex(user => user.user_id === localPlayerID);
      const localPlayerSeatIndex = (localPlayerIndex === -1) ? 0 : playersResponseData[localPlayerIndex].seat_no;
      for (let i = 0; i < this.allPlayerArray.length; i++) {
        if (this.allPlayerArray[i].GetPlayerId() === leavedUserId) {
          let positionIndex = (leavePlayerSeatNo - localPlayerSeatIndex);
          if (positionIndex < 0) positionIndex += 6;

          this.ShowHidePlaceHolder(positionIndex, true);
          console.log(leavePlayerSeatNo, 'leavePlayerSeatNo');
          this.allPlayerArray[i].DestroyPlayer();
          this.allPlayerArray.splice(i, 1);
        }
      }
    }

    if (playerSeatIndex !== 0 && leavedUserId === localPlayerID) {
      this.sittingAnimPopup.SitOutResizePlayerPlaceHolderAnim(window.innerWidth, window.innerHeight, this.currentNewScale, playerSeatIndex);
      this.sittingAnimPopup.PlayerPlacedAnim(playerSeatIndex, false);
      this.ShowHideSittingAnimControl(false);
    }
    if (leavedUserId === localPlayerID) {
      this.buyInZeroPlayerFound = false;
      Model.SetSeatIndex(null);
    }
    Client.GetGameState();
  };
  //#endregion

  //#region - JoinPlayer
  JoinPlayer() {
    const newPlayerData = Model.roomDetailsData[Model.roomDetailsData.length - 1];
    const localPlayerID = Model.GetLocalPlayerID();
    const localPlayerData = Model.GetLocalPlayerData();
    const playersResponseData = Model.GetRoomDetailsData();
    const localPlayerIndex = playersResponseData.findIndex(user => user.user_id === localPlayerID);

    console.log('update room playersResponseData !', playersResponseData);

    if (newPlayerData.user_id === localPlayerID && newPlayerData.seat_no !== 0) {
      this.CreatePlayer();
    }
    else {
      if (newPlayerData.sit_in) {
        const localPlayerSeatIndex = (localPlayerIndex === -1) ? 0 : playersResponseData[localPlayerIndex].seat_no;
        let positionIndex = (newPlayerData.seat_no - localPlayerSeatIndex);
        if (positionIndex < 0) positionIndex += 6;

        const player = new Player(this, this.playerPosArray[positionIndex].x, this.playerPosArray[positionIndex].y);
        player.SetUserName(newPlayerData.user_name);
        // player.SetIsPlayerInGame(newPlayerData.inGame);
        if (newPlayerData.profile.profile_pic) {
          player.SetUserImageFromServer(newPlayerData.profile.profile_pic);
        } else {
          player.SetUserImageFromServer('profile_pic_0');
        }
        if (localPlayerData.settings.table_theme.back_deck) {
          player.SetBackCardImageFromServer(localPlayerData.settings.table_theme.back_deck);
        } else {
          player.SetBackCardImageFromServer('back_card_0');
        }
        if (localPlayerData.settings.table_theme.front_deck) {
          player.SetFrontCardImageFromServer(localPlayerData.settings.table_theme.front_deck);
        } else {
          player.SetFrontCardImageFromServer('front_card_0');
        }
        player.SetUserBalance(newPlayerData.buy_in);
        player.SetPlayerId(newPlayerData.user_id);
        player.SetPlayerSittingIndex(newPlayerData.seat_no);
        player.SetPlayerPositionIndex(positionIndex);
        player.AdjustPlayerInfoSection(this.userInfoDataArray[positionIndex].x, this.userInfoDataArray[positionIndex].y, this.userInfoDataArray[positionIndex].nameBaseXoffset, this.userInfoDataArray[positionIndex].nameTextOrigin, this.userInfoDataArray[positionIndex].offsetXUserBalance, this.userInfoDataArray[positionIndex].distFactor);
        player.AdjustPlayerWinData(this.userWinInfoDataArray[positionIndex].offsetX, this.userWinInfoDataArray[positionIndex].offsetY, this.userWinInfoDataArray[positionIndex].winTextOffsetX, this.userWinInfoDataArray[positionIndex].winTextOffsetY, this.userWinInfoDataArray[positionIndex].nameTextOrigin);
        player.AdjustDecisionBase(this.userDecisionBaseArray[positionIndex].x, this.userDecisionBaseArray[positionIndex].y, this.userDecisionBaseArray[positionIndex].offsetX, this.userDecisionBaseArray[positionIndex].originX);
        player.AdjustDealerSection(this.userDealerPosArray[positionIndex].x, this.userDealerPosArray[positionIndex].y);
        if (newPlayerData.user_id === localPlayerID) {
          Model.SetSeatIndex(newPlayerData.seat_no);
          player.AdjustCharacterSection();
          player.AdjustDealerSection(this.userDealerPosArray[0].x - 20, this.userDealerPosArray[0].y);
          Model.SetCurrentUserBalance(newPlayerData.buy_in);
        }
        this.allPlayerArray.push(player);
        this.ShowHidePlaceHolder(positionIndex, false);
      }
      if (this.localSitinIndex !== null) {
        this.allPlayerArray.forEach(element => {
          element.playerContainer.setVisible(false);
        });
        this.localSitinIndex = null;
      }
      Client.GetGameState();
      this.loadingPopup.HideLoadingPopup();
      this.HidePlaceHolderLoadingPopup();
      this.resize(window.innerWidth, window.innerHeight);
    }
  };
  //#endregion

  //#region - Show Hide SB BB    
  ShowSmallAndBigBlind() {
    this.handCoolDownTimerPopup.ShowHideHandCoolDownTimerPopup(false);
    this.buyinPopup.HideBuyinPopup();
    this.isShowHandCooldownTimer = false;

    const smallBlindId = Model.GetSmallBlindPlayerId();
    const bigBlindId = Model.GetBigBlindPlayerId();

    const startGameData = Model.GetSmallBigBlindPlayerData().blinds;
    this.allPlayerArray.forEach(element => {
      element.SetIsPlayerInGame(true);
    });
    startGameData.forEach(element => {
      if (element.is_dealer) {
        const dealerIndex = this.allPlayerArray.findIndex(user => user.GetPlayerId() === element.user_id);
        this.allPlayerArray[dealerIndex].ShowHideDelearIcon(true);
      }
    });

    const smallBlindPlayerIndex = this.allPlayerArray.findIndex(user => user.playerId === smallBlindId);
    const bigBlindPlayerIndex = this.allPlayerArray.findIndex(user => user.playerId === bigBlindId);

    if (smallBlindPlayerIndex !== -1 && bigBlindPlayerIndex !== -1) {
      // this.allPlayerArray[smallBlindPlayerIndex].SetSmallBlindAmount(Model.GetSmallBlindAmount());
      // this.allPlayerArray[bigBlindPlayerIndex].SetBigBlindAmount(Model.GetBigBlindAmount());
      this.allPlayerArray[smallBlindPlayerIndex].ShowHideSmallBlind(true);
      this.allPlayerArray[bigBlindPlayerIndex].ShowHideBigBlind(true);
    }
  };
  HideSmalAndBigBlind() {
    const smallBlindId = Model.GetSmallBlindPlayerId();
    const bigBlindId = Model.GetBigBlindPlayerId();

    const smallBlindPlayerIndex = this.allPlayerArray.findIndex(user => user.playerId === smallBlindId);
    const bigBlindPlayerIndex = this.allPlayerArray.findIndex(user => user.playerId === bigBlindId);

    if (smallBlindPlayerIndex !== -1 && bigBlindPlayerIndex !== -1) {
      this.allPlayerArray[smallBlindPlayerIndex].ShowHideSmallBlind(false);
      this.allPlayerArray[bigBlindPlayerIndex].ShowHideBigBlind(false);
    }

    this.CreateCardForDistribution();
    this.resize(window.innerWidth, window.innerHeight);
  };
  //#endregion

  //#region - SB BB Deduct Animation
  ShowBlindAmountDeductAnimation() {
    const updateBlindsData = Model.GetUpdateBlindsData();
    let blindsId;
    for (let i = 0; i < this.allPlayerArray.length; i++) {
      if (this.allPlayerArray[i].playerId === updateBlindsData.user_id) {
        blindsId = this.allPlayerArray[i].positionIndex;
        this.allPlayerArray[i].SetUserBalance(updateBlindsData.buy_in);
      }
    }

    if (blindsId !== null) {
      if (this.blindAnimCount === 0) {
        this.ShowChipAnimation(updateBlindsData.pot, this.chipArray[blindsId], this.chipArray[blindsId].x, this.chipArray[blindsId].y, this.table.tableContainer.x, Math.abs((this.table.potValueBase.y + 20) + this.table.tableContainer.y));
        this.blindAnimCount++;
      } else if (this.blindAnimCount === 1) {
        this.ShowChipAnimation(updateBlindsData.pot, this.chipArray[blindsId], this.chipArray[blindsId].x, this.chipArray[blindsId].y, this.table.tableContainer.x, Math.abs((this.table.potValueBase.y + 20) + this.table.tableContainer.y));
        this.blindAnimCount = 0;
      }
    }
  };
  //#endregion

  //#region - CARD DISTRIBUTION 
  CreateCardForDistribution() {
    this.cardAnimArray = [];
    const localPlayerData = Model.GetLocalPlayerData();
    let backCardFrameNum = null;

    if (localPlayerData.settings.table_theme.back_deck) {
      backCardFrameNum = Utils.GetCurrentBackCardFrame(localPlayerData.settings.table_theme.back_deck);
    } else {
      backCardFrameNum = 52;
    }
    for (let i = 0; i < this.allPlayerArray.length * 2; i++) {
      const card = this.add.sprite(0, 0, 'front_card_0').setOrigin(0.5).setScale(0.7);
      card.setFrame(backCardFrameNum);
      this.cardAnimArray.push(card);
    }
  };
  ResizeCardForDistribution(_newWidth, _newHeight, _newScale) {
    const gapY = 1.5;
    for (let i = 0; i < this.cardAnimArray.length; i++) {
      this.cardAnimArray[i].setScale(_newScale * 0.7);
      this.cardAnimArray[i].setPosition((_newWidth / 2), (_newHeight / 2) - ((this.cardAnimArray[0].displayHeight + 20) * _newScale) - (gapY * i));
    }
  };

  PlayCardDistributionAnimation() {
    for (let i = 0; i < this.cardAnimArray.length; i++) {
      if (i < this.cardAnimArray.length / 2) {
        this.CreateDistributeTween(
          i,
          this.cardAnimArray[i],
          this.allPlayerArray[i].playerContainer.x + (this.allPlayerArray[i].userBackCard1.x * this.currentNewScale),
          this.allPlayerArray[i].playerContainer.y + (this.allPlayerArray[i].userBackCard1.y * this.currentNewScale)
        );
      } else {
        this.CreateDistributeTween(
          i,
          this.cardAnimArray[i],
          this.allPlayerArray[i - (this.cardAnimArray.length / 2)].playerContainer.x + (this.allPlayerArray[i - (this.cardAnimArray.length / 2)].userBackCard2.x * this.currentNewScale),
          this.allPlayerArray[i - (this.cardAnimArray.length / 2)].playerContainer.y + (this.allPlayerArray[i - (this.cardAnimArray.length / 2)].userBackCard2.y * this.currentNewScale)
        );
      }
    }
  }

  CreateDistributeTween(_indx, _obj, _endPosX, _endPosY) {
    this.add.tween({
      targets: [_obj],
      delay: 100 * _indx,
      x: _endPosX,
      y: _endPosY,
      scaleX: 0.01,
      scaleY: 0.01,
      ease: 'Linear',
      duration: 200,
      callbackScope: this,
      onComplete: function () {
        if (_indx === this.cardAnimArray.length - 1) {
          this.HideDistributionAnimCard();
          this.ShowUserCard();
        }
      }

    });
  };

  HideDistributionAnimCard() {
    for (let i = 0; i < this.cardAnimArray.length; i++) {
      this.cardAnimArray[i].setVisible(false);
    }
  };

  ShowCardDistributionAnimation() {
    this.HideSmalAndBigBlind();
    this.PlayCardDistributionAnimation();
  };

  ShowUserCard() {
    const localPlayerID = Model.GetLocalPlayerID();
    const preFlopData = Model.GetPreFlopRoundData();

    if (preFlopData.player_details.user_id === localPlayerID) {
      for (let i = 0; i < this.allPlayerArray.length; i++) {
        if (this.allPlayerArray[i].GetPlayerId() === localPlayerID) {
          this.allPlayerArray[i].SetCardValue(preFlopData.player_details.hands);
          this.allPlayerArray[i].ShowHideFrontCard(true);
        } else {
          if (this.allPlayerArray[i].GetIsPlayerInGame() === true) {
            this.allPlayerArray[i].ShowHideBackCard(true);
          }
        }
      }
    }
  };
  //#endregion

  //#region - Show Timer
  SetPlayerTimer() {
    const timerData = Model.GetTimerData();
    for (let i = 0; i < this.allPlayerArray.length; i++) {
      if (this.allPlayerArray[i].GetPlayerId() === timerData.current_player_id) {
        this.totalTurnTime = timerData.actionTime;
      }
    }
  };
  //#endregion

  //#region - Show Player Turn
  ShowPlayerTurn() {
    const localPlayerID = Model.GetLocalPlayerID();
    const currentBetData = Model.GetTurnData();
    this.bottomPanel.HideAllBetButton();
    this.bottomPanel.HideRaiseSlider();
    this.bottomPanel.HideAllRaisedPopupBetButton();
    if (Object.keys(currentBetData).length > 0) {
      this.UpdatePotAmount(currentBetData.current_pot);
      for (let i = 0; i < this.allPlayerArray.length; i++) {
        // this.allPlayerArray[i].ShowHideTimer(false);
        this.allPlayerArray[i].HideGraphicsTimer();
        // this.allPlayerArray[i].ShowHideCurrentBetShowArea(false, '');
        if (this.allPlayerArray[i].GetPlayerId() === currentBetData.current_player_id) {
          // if (!currentBetData.isFolded) {
          // this.allPlayerArray[i].ShowHideTimer(true);

          // this.allPlayerArray[i].ShowGraphicsTimer(currentBetData.actionTime);
          this.allPlayerArray[i].ShowGraphicsTimer(currentBetData.timer_obj.end_timestamp);
          this.allPlayerArray[i].ShowHideCurrentBetShowArea(true, currentBetData.current_bet);
          if (currentBetData.current_player_id === localPlayerID) {

            this.bottomPanel.ShowAllBetButton();
            this.bottomPanel.ShowCheckOrCallButton(currentBetData.is_check);
            this.bottomPanel.ShowAllInButtonForPlayer(currentBetData.is_all_in);
            // this.bottomPanel.SetRaisedPopupButtonShowHideStatus(currentBetData.betConfig);
            this.bottomPanel.SetRaisedPopupButtonShowHideStatus(currentBetData);
            // this.allPlayerArray[i].ShowHideCurrentBetShowArea(true, currentBetData.current_bet);
            this.currentBet = currentBetData.current_bet;
            this.currentPlayerId = currentBetData.current_player_id;
            this.currentInHandBalance = currentBetData.current_player_buy_in;
            Model.SetCurrentUserBalance(this.currentInHandBalance);
          } else {
            this.bottomPanel.HideAllBetButton();
            this.bottomPanel.HideRaiseSlider();
          }
          // } else {
          //   // this.allPlayerArray[i].ShowHideTimer(false);
          //   this.allPlayerArray[i].HideGraphicsTimer();
          // }
        } else {
          // this.allPlayerArray[i].ShowHideTimer(false);
          this.allPlayerArray[i].HideGraphicsTimer();
        }
      }
    } else {
      //Taking from Recoonet 
    }
  };
  //#endregion

  //#region - Place Bet 
  PlaceBetForCurrentPlayer() {
    for (let i = 0; i < this.allPlayerArray.length; i++) {
      // this.allPlayerArray[i].ResetTimerGraphics();
      // this.allPlayerArray[i].ShowHideTimer(false);
      this.allPlayerArray[i].HideGraphicsTimer();
      if (this.currentBet === 0 || this.currentBet === -1) {
        this.allPlayerArray[i].ShowHideCurrentBetShowArea(false, '');
      }
      this.allPlayerArray[i].UpdateCurrentBetText(this.currentBet);
    }

    Client.PlaceBet(this.currentBet);
  };
  //#endregion

  //#region - Update Pot Value
  OnUpdatePotValue() {
    const updatePotdata = Model.GetUpdatePotValueData();
    console.log('updatePotdata data: !', updatePotdata);
    let playerId;
    for (let i = 0; i < this.allPlayerArray.length; i++) {
      // this.allPlayerArray[i].ShowHideTimer(false);
      this.allPlayerArray[i].HideGraphicsTimer();

      if (this.allPlayerArray[i].playerId === updatePotdata.data.user_id) {
        // this.allPlayerArray[i].HideDecisionBase();
        if (!updatePotdata.data.isFolded) {
          this.allPlayerArray[i].SetUserBalance(updatePotdata.data.buy_in);
          this.allPlayerArray[i].UpdateCurrentBetText(updatePotdata.data.bet);
          playerId = this.allPlayerArray[i].positionIndex;
          setTimeout(() => {
            this.allPlayerArray[i].ShowDecisionBase(updatePotdata.data.bet_status);
          }, 100);
        } else {
          setTimeout(() => {
            this.allPlayerArray[i].ShowDecisionBase('fold');
          }, 100);
          this.allPlayerArray[i].FoldPlayer();
          // this.allPlayerArray[i].ShowHideTimer(false);
          // this.allPlayerArray[i].HideGraphicsTimer();
          this.bottomPanel.HideAllBetButton();
          this.bottomPanel.HideRaiseSlider();
          this.bottomPanel.HideAllRaisedPopupBetButton();
        }
      }
    }

    if (playerId !== null && !updatePotdata.data.isFolded && updatePotdata.data.bet_status !== 'check') {
      if (updatePotdata.data.bet_status === 'called' || updatePotdata.data.bet_status === 'raised' || updatePotdata.data.bet_status === 'allin') {
        const chipPos = {
          x: (window.innerWidth / 2) + ((this.playerPosArray[playerId].x + this.userDecisionBaseArray[playerId].x) * this.currentNewScale),
          y: (window.innerHeight / 2) + ((this.playerPosArray[playerId].y - (this.userDecisionBaseArray[playerId].y + 30)) * this.currentNewScale)
        };
        this.ShowChipAnimation(updatePotdata.data.pot, this.chipArray[playerId], chipPos.x, chipPos.y, this.table.tableContainer.x, Math.abs((this.table.potValueBase.y + 20) + this.table.tableContainer.y));
      }
    } else {
      setTimeout(() => {
        this.allPlayerArray.forEach(element => {
          element.ShowHideCurrentBetShowArea(false, '');
        });
      }, 400);
    }
    this.table.DestroyPotSplitArea();
    if (updatePotdata.data.pot_split) {
      this.table.CreatePotSplitArea(updatePotdata.data.sidepots);
    } else {
      this.table.DestroyPotSplitArea();
    }
  };

  UpdatePotAmount(_amount) {
    this.table.SetPotValue(_amount);
  };
  //#endregion

  //#region - Flop Round
  ShowFlopRound() {
    for (let i = 0; i < this.allPlayerArray.length; i++) {
      // this.allPlayerArray[i].ResetTimerGraphics();
      // this.allPlayerArray[i].ShowHideTimer(false);
      this.allPlayerArray[i].HideGraphicsTimer();
      this.allPlayerArray[i].HideDecisionBase();
    }
    const flopRoundData = Model.GetDealFlopRoundData();
    // this.table.ShowTableCard(flopRoundData.community_cards, 'dealFlop');
    this.table.ShowTableCard(flopRoundData.community_cards, 'flop');
  };
  //#endregion

  //#region - Turn Round
  ShowTurnRound() {
    for (let i = 0; i < this.allPlayerArray.length; i++) {
      // this.allPlayerArray[i].ResetTimerGraphics();
      // this.allPlayerArray[i].ShowHideTimer(false);
      this.allPlayerArray[i].HideGraphicsTimer();
      this.allPlayerArray[i].HideDecisionBase();
    }
    const turnRoundData = Model.GetDealTurnRoundData();
    // this.table.ShowTableCard(turnRoundData.community_cards, 'dealTurn');
    this.table.ShowTableCard(turnRoundData.community_cards, 'turn');
  };
  //#endregion

  //#region - River Round
  ShowRiverRound() {
    for (let i = 0; i < this.allPlayerArray.length; i++) {
      // this.allPlayerArray[i].ResetTimerGraphics();
      // this.allPlayerArray[i].ShowHideTimer(false);
      this.allPlayerArray[i].HideGraphicsTimer();
      this.allPlayerArray[i].HideDecisionBase();
    }
    const riverRoundData = Model.GetDealRiverRoundData();
    // this.table.ShowTableCard(riverRoundData.community_cards, 'dealRiver');
    this.table.ShowTableCard(riverRoundData.community_cards, 'river');
  };
  //#endregion

  //#region -ShowDown Round
  ShowShowDownRound() {
    this.ResetPlayers();
    const showDownRoundData = Model.GetShowDownRoundData();
    showDownRoundData.players.forEach(playerData => {
      const player = this.allPlayerArray.find(p => p.GetPlayerId() === playerData.user_id);
      if (!player) return;
      if (!playerData.folded) {
        this.HandleActivePlayer(player, playerData);
      } else {
        this.HandleFoldedPlayer(player);
      }
    });
  };

  ResetPlayers() {
    this.allPlayerArray.forEach(player => {
      player.HideGraphicsTimer();
    });
    this.bottomPanel.raiseAmount = 0;
    this.bottomPanel.HideAllBetButton();
    this.bottomPanel.HideRaiseSlider();
    this.bottomPanel.HideAllRaisedPopupBetButton();
  };

  HandleActivePlayer(_player, _playerData) {
    if (_playerData.hands.length > 0) {
      _player.SetCardValue(_playerData.hands);
      _player.ShowHideFrontCard(true);
      _player.ShowHideBackCard(false);
      _player.HideDecisionBase();
    }
    _player.SetUserBalance(_playerData.buy_in);
    if (_playerData.is_winner) {
      this.HandleWinner(_player, _playerData);
    }
  };

  HandleFoldedPlayer(_player) {
    _player.HideDecisionBase();
    _player.FoldPlayer();
  };

  HandleWinner(_player, _playerData) {
    const playerPos = { posX: _player.posX, posY: _player.posY };
    let winnerName = _playerData.user_name;
    if (Model.GetLocalPlayerID() === _playerData.user_id) {
      winnerName = 'YOU';
    }
    _player.HidePlayerInfoShowDownRound(false);
    _player.SetWinData(winnerName, _playerData.win_amt, _playerData.hand_rank, true);
    this.winPopup.ShowWinPopup();
    _player.playerContainer.setDepth(4);
    this.table.HighLightWinCards(_playerData.com_cards);
    this.table.WinChipAnim(playerPos);
    _playerData.hands.forEach((_hand, _index) => {
      if (_hand.is_combination) {
        // _player.HighlightSelectedFrontCard(_index);
      } else {
        _player.UnselectedFrontCardWhenHighlight(_index);
      }
    });
  };
  //#endregion

  //#region -Replay Hand Round
  ShowReplayHand() {
    this.loadingPopup.ShowLoadingPopup();
    this.currentBet = 0;
    this.ResetAllHandDataAndPlayer();
    const replayData = Model.GetReplayHandData();

    if (!Utils.IsEmpty(replayData.hand_brake_timer_obj.end_timestamp)) {
      this.handCoolDownTimerPopup.remainTime = Math.floor((replayData.hand_brake_timer_obj.end_timestamp - getCurrentTimestampMillis()) / 1000);
      this.handCoolDownTimerPopup.CreateHandCoolDownTimer();
    }

    if (Model.GetType() === 'cash') {
      for (let j = 0; j < replayData.players.length; j++) {
        // if (!replayData.players[j].inGame && replayData.players[j].buy_in === 0) {
        if (!replayData.players[j].inGame && replayData.players[j].buy_in < Model.GetMinBuyInAmount()) {
          if (Model.GetLocalPlayerID() === replayData.players[j].user_id) {
            this.buyinPopup.ShowBuyinPopup();
            this.buyInZeroPlayerFound = true;
          }
        }
      }
    }

    this.loadingPopup.HideLoadingPopup();
  };
  //#endregion

  ResetAllHandDataAndPlayer() {
    this.buyInZeroPlayerFound = false;
    this.winPopup.HideWinPopup();
    // this.winPopup.SetWinAmountAndName('', 0);
    this.table.ResetHighLightWinCard();
    this.table.HideTableCard();
    this.table.HideOutline();
    this.table.DestroyPotSplitArea();
    this.table.winAnim.setVisible(false);
    this.table.winAnim.play('animation', false);
    this.table.animChip.setVisible(false);
    this.UpdatePotAmount(0);
    this.table.ShowHidePotBase(false);
    this.currentBet = 0;
    for (let i = 0; i < this.allPlayerArray.length; i++) {
      // this.allPlayerArray[i].ShowHideTimer(false);
      this.allPlayerArray[i].HideGraphicsTimer();
      this.allPlayerArray[i].playerContainer.setDepth(0);
      this.allPlayerArray[i].UnfoldPlayer();
      this.allPlayerArray[i].HideDecisionBase();
      this.allPlayerArray[i].ShowHideCurrentBetShowArea(false, '');
      // this.allPlayerArray[i].ShowHideUserWinRing(false);

      this.allPlayerArray[i].ShowHideDelearIcon(false);
      this.allPlayerArray[i].ShowHideBigBlind(false);
      this.allPlayerArray[i].ShowHideSmallBlind(false);
      this.allPlayerArray[i].ShowHideFrontCard(false);
      this.allPlayerArray[i].ShowHideBackCard(false);
      this.allPlayerArray[i].HideOutline();
      this.allPlayerArray[i].SetWinData('', 0, '', false);
      this.allPlayerArray[i].SetIsPlayerInGame(true);
      this.allPlayerArray[i].HidePlayerInfoShowDownRound(true);
    }
  };
  //#endregion

  //#region - LeavingPopupShow
  LeavingPopUpshow() {
    this.leavingPopup.ShowLeavingPopup();
  };
  //#endregion

  //#region - LeavingPopupShow
  SettingPopupshow() {
    this.settingPopup.ShowSettingPopup();
  };
  //#endregion

  //#region - LeavingPopupShow
  CreateRecieveMessage() {
    const recieveMsgUserId = Model.GetRecieveMsgData().sender_user_id;
    const recieveMsgUsername = Model.GetRecieveMsgData().sender_user_name;
    const recieveMsg = Model.GetRecieveMsgData().message;
    if (Model.GetLocalPlayerID() === recieveMsgUserId) {
      this.chatPopup.MakeLocalUserChatArea(1, '', recieveMsg);
    }
    else {
      this.chatPopup.MakeOtherUserChatArea(125, recieveMsgUsername, recieveMsg);
    }
  };
  //#endregion

  //#region - GameStateData (Reconnect)
  GameStateData() {
    const gameStateData = Model.GetGameStateData();
    this.handCoolDownTimerPopup.ShowHideHandCoolDownTimerPopup(false);
    this.winPopup.HideWinPopup();
    this.table.ResetHighLightWinCard();
    this.table.ShowHidePotBase(false);
    this.isShowHandCooldownTimer = false;
    if (!Utils.IsEmpty(gameStateData.hand_brake_timer_obj.end_timestamp)) {
      this.handCoolDownTimerPopup.remainTime = Math.floor((gameStateData.hand_brake_timer_obj.end_timestamp - getCurrentTimestampMillis()) / 1000);
      this.handCoolDownTimerPopup.CreateHandCoolDownTimer();
    }
    if (gameStateData.board.length) {
      // this.table.ShowTableCard(gameStateData.board, gameStateData.round, true);
      this.table.ShowTableCard(gameStateData.board, '', true);
    }
    if (gameStateData.round === null && gameStateData.players.length) {
      this.table.HideTableCard();
      this.table.HideOutline();
      gameStateData.players.forEach(element => {
        const player = this.allPlayerArray.find(user => user.GetPlayerId() === element.user_id);
        player.ShowHideFrontCard(false);
        player.ShowHideBackCard(false);
      });
    }
    if (gameStateData.players.length && (gameStateData.round !== null)) {
      gameStateData.players.forEach(element => {
        const player = this.allPlayerArray.find(user => user.GetPlayerId() === element.user_id);
        if (!player) return;
        player.SetUserBalance(element.buy_in);
        if (element.is_dealer) {
          player.ShowHideDelearIcon(true);
        }
        player.SetIsPlayerInGame(element.inGame);
        player.playerContainer.setAlpha(element.inGame ? 1 : 0.5);
      });

      switch (gameStateData.round) {
        case 'deal':

          break;

        case 'pre-flop':
          this.ShowRoundWiseData(gameStateData);
          break;

        case 'flop':
          this.ShowRoundWiseData(gameStateData);
          break;

        case 'turn':
          this.ShowRoundWiseData(gameStateData);
          break;

        case 'river':
          this.ShowRoundWiseData(gameStateData);
          break;

        case 'show-down':
          this.ShowShowDownRoundDataFromGameState(gameStateData);
          break;

        default:

          break;
      };
    } else {
    }
  };
  //#endregion

  //#region Show Round Wise data from Game state
  ShowRoundWiseData(gameStateData) {
    const localPlayerID = Model.GetLocalPlayerID();
    this.table.SetPotValue(gameStateData.pot);
    gameStateData.players.forEach(element => {
      const player = this.allPlayerArray.find(user => user.GetPlayerId() === element.user_id);
      if (!player) return;
      if (player.GetPlayerId() === localPlayerID && element.hands.length > 0) {
        player.SetCardValue(element.hands);
        player.ShowHideFrontCard(true, true);
      } else {
        player.ShowHideBackCard(element.inGame);
      }
    });

    this.ShowTurnRoundDataFromGameState(gameStateData);
  };
  //#endregion

  //#region Show Turn Round data from Game state
  ShowTurnRoundDataFromGameState(gameStateData) {
    if (!Utils.IsEmpty(gameStateData.curr_bet_obj)) {
      Model.SetTurnData(gameStateData.curr_bet_obj);
      // Constant.GAME_TURN_TIME = gameStateData.timer_details.actionTime;
      Model.SetGameTurnTime(gameStateData.timer_details.actionTime);
      this.ShowPlayerTurn();
    }
  };
  //#endregion

  //#region Show ShowDown Round data from Game state
  ShowShowDownRoundDataFromGameState(gameStateData) {
    if (!Utils.IsEmpty(gameStateData.game_data)) {
      const showDownData = gameStateData.game_data.find(element => element.event_name === 'show-down');
      if (!showDownData) return;
      Model.SetShowDownRoundData(showDownData.payload);
      this.ShowShowDownRound();
    }
  };
  //#endregion

  //#region SpectatorPreFlopBackCardShow Function
  SpectatorPreFlopBackCardShow() {
    if (Model.GetSeatIndex() === null) {
      this.allPlayerArray.forEach(player => {
        player.ShowHideBackCard(true);
      });
    }

    const smallBlindId = Model.GetSmallBlindPlayerId();
    const bigBlindId = Model.GetBigBlindPlayerId();

    const smallBlindPlayerIndex = this.allPlayerArray.findIndex(user => user.playerId === smallBlindId);
    const bigBlindPlayerIndex = this.allPlayerArray.findIndex(user => user.playerId === bigBlindId);

    if (smallBlindPlayerIndex !== -1 && bigBlindPlayerIndex !== -1) {
      this.allPlayerArray[smallBlindPlayerIndex].ShowHideSmallBlind(false);
      this.allPlayerArray[bigBlindPlayerIndex].ShowHideBigBlind(false);
    }
  };
  //#endregion

  CreateCoinAnimation() {
    this.coin = this.add.spine(0, 0, 'coin', 'animation', true);
    this.coin.setVisible(false);
    this.coin.setDepth(7);
  };
  ResizeCoinAnimation(_newWidth, _newHeight, _newScale) {
    this.coin.setScale(_newScale);
    this.coin.setPosition(_newWidth / 2, _newHeight / 2);
  };
  PlayCoinAnimation() {
    this.coin.play('animation', true);
  };

  CreateConfettiAnimation() {
    this.confetti = this.add.spine(0, 0, 'confetti', 'animation', false);
    this.confetti.setVisible(false);
    this.confetti.setDepth(7);
  };
  ResizeConfettiAnimation(_newWidth, _newHeight, _newScale) {
    this.confetti.setScale(_newScale);
    this.confetti.setPosition(_newWidth / 2, _newHeight / 2);
  };
  PlayConfettiAnimation() {
    this.confetti.play('animation', false);
  };

  //#region HandCooldownTimer Function
  HandCooldownTimer(_timerData) {
    if (!this.isShowHandCooldownTimer) {
      this.isShowHandCooldownTimer = true;
      this.handCoolDownTimerPopup.ShowHideHandCoolDownTimerPopup(true, _timerData.countdowntime);
      this.handCoolDownTimerPopup.UpdateTimerValueText(_timerData.countdowntime);
    }
    else {
      this.handCoolDownTimerPopup.UpdateTimerValueText(_timerData.countdowntime);
    }
    if (_timerData.countdowntime === '00:00:01') {
      setTimeout(() => {
        this.handCoolDownTimerPopup.ShowHideHandCoolDownTimerPopup(false);
        this.buyinPopup.HideBuyinPopup();
        this.isShowHandCooldownTimer = false;
      }, 1000);
    }
  }
  //#endregion

  //#region LeaveTableViaJsBridge Function
  LeaveTableViaJsBridge() {
    GameAnalytics.emit(Constant.POST_OR_GET_GAME_EVENTS.LEAVE_TABLE, Model.GetTableId());
  }
  //#endregion

  //#region Off the bet button When time end
  OnUserTimerEnd() {
    console.log('time end.............');
    const localPlayerID = Model.GetLocalPlayerID();
    const currentBetData = Model.GetTurnData();
    if (currentBetData.current_player_id === localPlayerID) {
      console.log('time end inside current plr.............');
      // this.bottomPanel.DisableAllBetButton();
      // this.bottomPanel.DisableAllRaisedPopupBetButton();
      this.bottomPanel.HideAllBetButton();
      this.bottomPanel.HideAllRaisedPopupBetButton();
    }
  };
  //#endregion

  //#region Show Hand Strength of the player
  ShowHandStrength() {
    const handStrengthData = Model.GetHandStrengthData();
    console.log('ShowHandStrength data: ', handStrengthData);

  };
  //#endregion

  //#region - Resize
  resize(_newWidth, _newHeight) {
    const newScale = Utils.GetScale(SelectedResolution.width, SelectedResolution.height, _newWidth, _newHeight);
    this.currentNewScale = newScale;
    this.ResizeGameplayBg(_newWidth, _newHeight, newScale);
    this.table.resize(_newWidth, _newHeight, newScale);
    this.upperPanel.resize(_newWidth, _newHeight, newScale);
    this.bottomPanel.resize(_newWidth, _newHeight, newScale);
    for (let i = 0; i < this.allPlayerArray.length; i++) {
      this.allPlayerArray[i].resize(_newWidth, _newHeight, newScale);
    }
    this.ResizeChip(_newWidth, _newHeight, newScale);
    this.ResizeCardForDistribution(_newWidth, _newHeight, newScale);
    this.ResizePlayerPlaceHolder(_newWidth, _newHeight, newScale);
    this.loadingPopup.resize(_newWidth, _newHeight, newScale);
    this.leavingPopup.resize(_newWidth, _newHeight, newScale);
    this.winPopup.resize(_newWidth, _newHeight, newScale);
    this.alertPopup.resize(_newWidth, _newHeight, newScale);
    this.handCoolDownTimerPopup.resize(_newWidth, _newHeight, newScale);
    this.buyinPopup.resize(_newWidth, _newHeight, newScale);
    this.settingPopup.resize(_newWidth, _newHeight, newScale);
    this.tournamentStageOverPopup.resize(_newWidth, _newHeight, newScale);
    this.sittingAnimPopup.ResizePlayerPlaceHolderAnim(_newWidth, _newHeight, newScale);

    // this.ResizeCoinAnimation(_newWidth, _newHeight, newScale);
    // this.ResizeConfettiAnimation(_newWidth, _newHeight, newScale);
    // this.chatPopup.resize(_newWidth, _newHeight, newScale);
  };
  //#endregion

}