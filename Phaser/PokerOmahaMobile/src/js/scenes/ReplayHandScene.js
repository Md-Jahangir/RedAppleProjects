/* global window,setTimeout,console */
/*eslint-disable no-console*/
/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 15-01-2025.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 15-01-2025
 * @Description :- Replay the prevoius hand record.
 ************************************/

import Phaser from 'phaser';
import { SelectedResolution } from '../ResolutionSelector.js';
import { Utils } from '../Utils.js';
import Table from '../ui/Table.js';
import Player from '../ui/Player.js';
import BottomPanel from '../ui/BottomPanel.js';
import { Model } from '../Model.js';
import { HandRecord } from '../services/HandRecord.js';
import LoadingPopup from '../popup/LoadingPopup.js';
import LeavingPopup from '../popup/LeavePopup.js';
import WinPopup from '../popup/WinPopup.js';
import AlertPopup from '../popup/AlertPopup.js';
import SittingAnimationPopup from '../popup/SittingAnimationPopup.js';
import { Constant } from '../Constant.js';
import { GameAnalytics } from '../GameAnalyticsSDK.js';

export default class ReplayHandScene extends Phaser.Scene {

  constructor() {
    super('ReplayHandScene');
  };

  init() {
    this.bottomPanel = null;
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
    this.isSpectator = true;
  };
  preload() {
    this.device = Constant.isMobile ? 'OnMobile' : 'OnDesktop';
  };

  //#region - Create all images
  create(_data) {
    // Client.SetConnection();
    this.game.events.on('resize', this.resize, this);
    const detailedPosConfig = this.cache.json.get('position-config');
    this.posConfig = detailedPosConfig.Game[this.device];

    this.game.events.on('evtCreatePlayer', this.CreatePlayer, this);
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
    this.game.events.on('evtShowAlert', this.ShowAlertPopup, this);

    this.game.events.on('evtSendFrameRate', this.PostFrameRateDataToPlatform, this);
    this.game.events.on('evtEmitStartReel', this.StartReel, this);

    this.playerPosArray = [
      { x: 6, y: 485 },//middle down//0
      { x: -385, y: 56 },//left down//1
      { x: -330, y: -421 },//left up//2
      { x: 0, y: -684 },//middle up//3
      { x: 334, y: -421 },//right up//4
      { x: 387, y: 56 },//right down//5
    ];
    this.userInfoDataArray = [
      { x: 0, y: 110, nameBaseXoffset: 0, nameTextOrigin: 0.5, offsetXUserBalance: -15, distFactor: 10 },//middle down//0
      { x: 0, y: 110, nameBaseXoffset: 0, nameTextOrigin: 0.5, offsetXUserBalance: -15, distFactor: 10 },//left down//1
      { x: 0, y: 110, nameBaseXoffset: 0, nameTextOrigin: 0.5, offsetXUserBalance: -15, distFactor: 10 },//left up//2
      { x: 0, y: 110, nameBaseXoffset: 0, nameTextOrigin: 0.5, offsetXUserBalance: -15, distFactor: 10 },//middle up//3
      { x: 0, y: 110, nameBaseXoffset: 0, nameTextOrigin: 0.5, offsetXUserBalance: -15, distFactor: 10 },//right up//4
      { x: 0, y: 110, nameBaseXoffset: 0, nameTextOrigin: 0.5, offsetXUserBalance: -15, distFactor: 10 },//right down//5
    ];
    this.userDecisionBaseArray = [
      { x: -140, y: -40, offsetX: -35, originX: 1 },//middle down//0
      { x: -60, y: -220, offsetX: 35, originX: 0 },//left down//1
      { x: -60, y: -220, offsetX: 35, originX: 0 },//left up//2
      { x: 110, y: 40, offsetX: 35, originX: 0 },//middle up//3
      { x: -60, y: -220, offsetX: 35, originX: 0 },//right up//4
      { x: -60, y: -220, offsetX: 35, originX: 0 },//right down//5
    ];
    this.userDealerPosArray = [
      { x: 65, y: 45 },//middle down//0
      { x: 65, y: 45 },//left down//1
      { x: 65, y: 45 },//left up//2
      { x: 65, y: 45 },//middle up//3
      { x: 65, y: 45 },//right up//4
      { x: 65, y: 45 },//right down//5
    ];
    this.userSmallBigBlindPosArray = [
      { x: -65, y: 45 },//middle down//0
      { x: -65, y: 45 },//left down//1
      { x: -65, y: 45 },//left up//2
      { x: -65, y: 45 },//middle up//3
      { x: -65, y: 45 },//right up//4
      { x: -65, y: 45 },//right down//5
    ];
    this.CurrentBetShowAreaPosArray = [
      { x: 0, y: -250, allignment: 1 },//middle down//0
      { x: 230, y: 40, allignment: 0 },//left down//1
      { x: 237, y: 131, allignment: 0 },//left up//2
      { x: 0, y: 227, allignment: 0 },//middle up//3
      { x: -237, y: 131, allignment: 1 },//right up//4
      { x: -230, y: 40, allignment: 1 },//right down//5
    ];

    this.CreateGameplayBg();
    this.table = new Table(this);
    this.bottomPanel = new BottomPanel(this);
    this.CreateChip();
    this.CreatePlayerPlaceHolder();
    this.CreatePopup();
    this.GetDataFromPlatform();
    if (_data.data === true) {
      this.StartReel();
    }
    this.resize(window.innerWidth, window.innerHeight);
  };

  //#region - Start Reel 
  StartReel() {
    setTimeout(() => {
      HandRecord.StartReel();
    }, 1000);
  };
  //#endregion

  //----------------------------------------------------------
  //#region - Create Bg
  CreateGameplayBg() {
    this.gameplayBg = this.add.image(0, 0, 'game_bg').setOrigin(0);
    const versionControlTextStyle = { fontFamily: 'Poppins-Regular', fontSize: '25px', fill: '#FFF', fontStyle: 'normal', align: 'right' };
    this.versionControlText = this.add.text(0, 0, `V  ${Constant.VERSION_TEXT}`, versionControlTextStyle).setOrigin(0.5);
    this.replayBase = this.add.image(0, 0, 'replay_base');
    const replayBaseTextStyle = { fontFamily: 'Poppins-Regular', fontSize: '32px', fill: '#FFFFFF', fontStyle: 'normal', align: 'center', wordWrap: { width: this.replayBase.width - 10 } };
    this.replayBaseText = this.add.text(this.replayBase.x + 77, this.replayBase.y, 'Replay', replayBaseTextStyle).setOrigin(0.5);
  };
  ResizeGameplayBg(newWidth, newHeight, _newScale) {
    this.gameplayBg.setDisplaySize(newWidth, newHeight);
    this.replayBase.setScale(_newScale);
    this.replayBase.setPosition(44 * _newScale, 166 * _newScale);
    this.replayBaseText.setScale(_newScale);
    this.replayBaseText.setPosition(this.replayBase.x + (77 * _newScale), this.replayBase.y);
    this.versionControlText.setScale(_newScale);
    this.versionControlText.setPosition(50 * _newScale, newHeight - (100 * _newScale));
  };
  //#endregion
  //----------------------------------------------------------

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
      this.chipArray[i].setScale(1.3 * _newScale);
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
      }
    });
  };
  //#endregion
  //----------------------------------------------------------------

  //----------------------------------------------------------
  //#region - Create Place Holder
  CreatePlayerPlaceHolder() {
    for (let i = 0; i < this.playerPosArray.length; i++) {
      const placeHolderContainer = this.add.container(0, 0);
      const placeHolderBase = this.add.image(0, 0, 'user_base').setOrigin(0.5);
      const placeHolderArrow = this.add.image(0, 0, 'sit_in_arrow').setOrigin(0.5);
      placeHolderContainer.add([placeHolderBase, placeHolderArrow]);
      placeHolderContainer.setSize(placeHolderBase.width, placeHolderBase.height);
      placeHolderContainer.index = i;
      this.placeHolderContainerArray.push(placeHolderContainer);
    }
  };
  //#endregion

  //#region - Resize PlaceHolder
  ResizePlayerPlaceHolder(_newWidth, _newHeight, _newScale) {
    for (let i = 0; i < this.placeHolderContainerArray.length; i++) {
      this.placeHolderContainerArray[i].setScale(_newScale);
      this.placeHolderContainerArray[i].setPosition((_newWidth / 2) + (this.playerPosArray[i].x * _newScale), (_newHeight / 2) + (this.playerPosArray[i].y * _newScale));
    }
  };
  //#endregion

  //#region - Show Hide Place holder
  ShowHidePlaceHolder(_posIndex, _status) {
    this.placeHolderContainerArray[_posIndex].setVisible(_status);
  };
  //#endregion
  //----------------------------------------------------------

  //----------------------------------------------------------
  //#region - Create Bg
  CreatePopup() {
    this.loadingPopup = new LoadingPopup(this);
    this.leavingPopup = new LeavingPopup(this);
    this.winPopup = new WinPopup(this);
    this.sittingAnimPopup = new SittingAnimationPopup(this);
    this.alertPopup = new AlertPopup(this);
  };
  //#endregion

  //#region - Show alert popup
  ShowAlertPopup(_msg) {
    this.loadingPopup.HideLoadingPopup();
    this.alertPopup.ShowAlertPopup(_msg);
  };
  //#endregion
  //----------------------------------------------------------

  //----------------------------------------------------------
  //#region - CREATE PLAYER
  CreatePlayer() {
    this.DestroyPlayer();
    Model.SetSeatIndex(null);
    const localPlayerID = Model.GetLocalPlayerID();
    const localPlayerData = Model.GetLocalPlayerData();
    const playersResponseData = Model.GetRoomDetailsData();
    let localPlayerIndex;
    let localPlayerSeatIndex;

    try {
      if (this.localSitinIndex === null) {
        this.placeHolderContainerArray.forEach((_, i) => this.ShowHidePlaceHolder(i, true));
      }
      if (!Utils.IsEmpty(playersResponseData)) {
        localPlayerIndex = playersResponseData.findIndex(user => user.remote_user_id === localPlayerID);
        localPlayerSeatIndex = (localPlayerIndex === -1) ? 0 : playersResponseData[localPlayerIndex].seat_no;
        Model.SetLocalPlayerIndex(localPlayerSeatIndex);

        for (let i = 0; i < playersResponseData.length; i++) {
          if (playersResponseData[i].sit_in) {
            let positionIndex = (playersResponseData[i].seat_no - localPlayerSeatIndex);
            if (positionIndex < 0) positionIndex += 6;
            const player = new Player(this, this.playerPosArray[positionIndex].x, this.playerPosArray[positionIndex].y);
            player.SetUserName(playersResponseData[i].user_name);
            player.SetIsPlayerInGame(playersResponseData[i].inGame);
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
            player.SetRemotePlayerId(playersResponseData[i].remote_user_id);
            player.SetPlayerSittingIndex(playersResponseData[i].seat_no);
            player.SetPlayerPositionIndex(positionIndex);
            // player.isDelear = playersResponseData[i].is_dealer;
            // player.ShowHideDelearIcon(player.isDelear);

            player.AdjustPlayerInfoSection(this.userInfoDataArray[positionIndex].x, this.userInfoDataArray[positionIndex].y, this.userInfoDataArray[positionIndex].nameBaseXoffset, this.userInfoDataArray[positionIndex].nameTextOrigin, this.userInfoDataArray[positionIndex].offsetXUserBalance);
            player.AdjustDecisionBase(this.userDecisionBaseArray[positionIndex].x, this.userDecisionBaseArray[positionIndex].y, this.userDecisionBaseArray[positionIndex].offsetX, this.userDecisionBaseArray[positionIndex].originX);
            player.AdjustDealerSection(this.userDealerPosArray[positionIndex].x, this.userDealerPosArray[positionIndex].y);
            player.AdjustBigBlindSection(this.userSmallBigBlindPosArray[positionIndex].x, this.userSmallBigBlindPosArray[positionIndex].y);
            player.AdjustSmallBlindSection(this.userSmallBigBlindPosArray[positionIndex].x, this.userSmallBigBlindPosArray[positionIndex].y);
            player.AdjustCurrentBetShowArea(this.CurrentBetShowAreaPosArray[positionIndex].x, this.CurrentBetShowAreaPosArray[positionIndex].y, this.CurrentBetShowAreaPosArray[positionIndex].allignment);
            if (localPlayerIndex === i) {
              this.isSpectator = false;
              Model.SetSeatIndex(playersResponseData[i].seat_no);
              player.AdjustCharacterSection();
              player.AdjustDealerSection(this.userDealerPosArray[0].x + 20, this.userDealerPosArray[0].y);
              player.AdjustBigBlindSection(this.userSmallBigBlindPosArray[0].x - 20, this.userSmallBigBlindPosArray[0].y);
              player.AdjustSmallBlindSection(this.userSmallBigBlindPosArray[0].x - 20, this.userSmallBigBlindPosArray[0].y);
              player.AdjustPlayerInfoSection(this.userInfoDataArray[0].x, this.userInfoDataArray[0].y + 40, this.userInfoDataArray[0].nameBaseXoffset, this.userInfoDataArray[0].nameTextOrigin, this.userInfoDataArray[0].offsetXUserBalance);
              Model.SetCurrentUserBalance(playersResponseData[i].buy_in);
            }

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
        this.loadingPopup.HideLoadingPopup();
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

    let playerSeatIndex = null;
    const player = this.allPlayerArray.find(element => element.playerId === leavedUserId);
    if (player) {
      playerSeatIndex = player.GetPlayerSittingIndex();
    }

    if (removePlayerId !== -1) {
      roomData.splice(removePlayerId, 1);
    }
    this.CreatePlayer();

    if (playerSeatIndex !== 0 && leavedUserId === Model.GetLocalPlayerID()) {
      this.sittingAnimPopup.SitOutResizePlayerPlaceHolderAnim(window.innerWidth, window.innerHeight, this.currentNewScale, playerSeatIndex);
      this.sittingAnimPopup.PlayerPlacedAnim(playerSeatIndex, false);
      this.ShowHideSittingAnimControl(false);
    }
  };
  //#endregion
  //----------------------------------------------------------

  //#region - Show Hide SB BB    
  ShowSmallAndBigBlind() {
    const smallBlindId = Model.GetSmallBlindPlayerId();
    const bigBlindId = Model.GetBigBlindPlayerId();

    const startGameData = Model.GetSmallBigBlindPlayerData().blinds;
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
      if (this.allPlayerArray[i].remotePlayerId === updateBlindsData.remote_user_id) {
        blindsId = this.allPlayerArray[i].positionIndex;
        this.allPlayerArray[i].SetUserBalance(updateBlindsData.buy_in);
      }
    }

    if (blindsId !== null) {
      if (this.blindAnimCount === 0) {
        this.ShowChipAnimation(updateBlindsData.pot, this.chipArray[blindsId], this.chipArray[blindsId].x, this.chipArray[blindsId].y, this.table.tableContainer.x, Math.abs(((this.table.potValueBase.y + 20) * this.currentNewScale) + this.table.tableContainer.y));
        this.blindAnimCount++;
      } else if (this.blindAnimCount === 1) {
        this.ShowChipAnimation(updateBlindsData.pot, this.chipArray[blindsId], this.chipArray[blindsId].x, this.chipArray[blindsId].y, this.table.tableContainer.x, Math.abs(((this.table.potValueBase.y + 20) * this.currentNewScale) + this.table.tableContainer.y));
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

  // ShowUserCard() {
  //   // const localPlayerRemoteID = Model.GetLocalPlayerRemoteID();
  //   const preFlopData = Model.GetPreFlopRoundData();
  //   const localPlayerID = Model.GetLocalPlayerID();
  //   preFlopData.forEach(element => {
  //     for (let i = 0; i < this.allPlayerArray.length; i++) {
  //       if (this.allPlayerArray[i].GetRemotePlayerId() === localPlayerID) {
  //         this.allPlayerArray[i].SetCardValue(element.player_details.hands);
  //         this.allPlayerArray[i].ShowHideFrontCard(true);
  //       } else {
  //         this.allPlayerArray[i].ShowHideBackCard(true);
  //       }
  //     }
  //     // }
  //   });
  // };
  ShowUserCard() {
    const localPlayerRemoteID = Model.GetLocalPlayerRemoteID();
    const preFlopData = Model.GetPreFlopRoundData();
    preFlopData.forEach(element => {
      if (element.player_details.remote_user_id === localPlayerRemoteID) {
        for (let i = 0; i < this.allPlayerArray.length; i++) {
          if (this.allPlayerArray[i].GetRemotePlayerId() === element.player_details.remote_user_id) {
            this.allPlayerArray[i].SetCardValue(element.player_details.hands);
            this.allPlayerArray[i].ShowHideFrontCard(true);
          } else {
            this.allPlayerArray[i].ShowHideBackCard(true);
          }
        }
      }
    });
    if (this.isSpectator) {
      for (let i = 0; i < this.allPlayerArray.length; i++) {
        this.allPlayerArray[i].ShowHideBackCard(true);
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
          if (!currentBetData.isFolded) {
            // this.allPlayerArray[i].ShowHideTimer(true);

            this.allPlayerArray[i].ShowGraphicsTimer(currentBetData.actionTime);
            this.allPlayerArray[i].ShowHideCurrentBetShowArea(true, currentBetData.current_bet);
            if (currentBetData.current_player_id === localPlayerID) {
              // this.bottomPanel.ShowAllBetButton();
              // this.bottomPanel.ShowCheckOrCallButton(currentBetData.is_check);
              // this.bottomPanel.ShowAllInButtonForPlayer(currentBetData.is_all_in);
              this.bottomPanel.SetRaisedPopupButtonShowHideStatus(currentBetData);
              this.currentBet = currentBetData.current_bet;
              this.currentPlayerId = currentBetData.current_player_id;
              this.currentInHandBalance = currentBetData.current_player_buy_in;
              Model.SetCurrentUserBalance(this.currentInHandBalance);
            } else {
              this.bottomPanel.HideAllBetButton();
              this.bottomPanel.HideRaiseSlider();
            }
          } else {
            // this.allPlayerArray[i].ShowHideTimer(false);
            this.allPlayerArray[i].HideGraphicsTimer();
          }
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
          // setTimeout(() => {
          //   this.allPlayerArray[i].ShowDecisionBase('fold');
          // }, 100);
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
          x: (window.innerWidth / 2) + ((this.playerPosArray[playerId].x + this.CurrentBetShowAreaPosArray[playerId].x) * this.currentNewScale),
          y: (window.innerHeight / 2) + ((this.playerPosArray[playerId].y + this.CurrentBetShowAreaPosArray[playerId].y) * this.currentNewScale)
        };
        this.ShowChipAnimation(updatePotdata.data.pot, this.chipArray[playerId], chipPos.x, chipPos.y, this.table.tableContainer.x, Math.abs(((this.table.potValueBase.y + 20) * this.currentNewScale) + this.table.tableContainer.y));
      }
    }
    else {
      setTimeout(() => {
        this.allPlayerArray.forEach(element => {
          element.ShowHideCurrentBetShowArea(false, '');
        });
      }, 400);
    }

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
    this.table.ShowTableCard(riverRoundData.community_cards, 'river');
  };
  //#endregion

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
    setTimeout(() => {
      this.PostStopPlayDataToPlatform(true);
    }, 2000);
  };

  ResetPlayers() {
    this.allPlayerArray.forEach(player => {
      // player.ShowHideTimer(false);
      player.HideGraphicsTimer();
    });
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
  }

  HandleWinner(_player, _playerData) {
    const playerPos = { posX: _player.posX, posY: _player.posY };
    let winnerName = _playerData.user_name;
    if (Model.GetLocalPlayerID() === _playerData.remote_user_id) {
      winnerName = 'YOU';
    }
    _player.HidePlayerInfoShowDownRound(false);
    _player.SetWinData(winnerName, _playerData.win_amt, _playerData.hand_rank, true);
    this.winPopup.ShowWinPopup();
    _player.playerContainer.setDepth(4);
    // _player.ShowHideUserWinRing(true);
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

  GetDataFromPlatform() {
    GameAnalytics.listen(Constant.POST_OR_GET_GAME_EVENTS.PLAY_PAUSE, (_data) => {
      console.log('GetDataFromPlatform PLAY_PAUSE: ', _data);
      if (!_data) {
        this.allPlayerArray.forEach(element => {
          element.timer.PauseTimer();
        });
        HandRecord.PauseReel();
      }
      else {
        this.allPlayerArray.forEach(element => {
          element.timer.ResumeTimer();
        });
        HandRecord.ResumeReel();
      }

    });
    GameAnalytics.listen(Constant.POST_OR_GET_GAME_EVENTS.PROGRESS, (_data) => {
      console.log('GetDataFromPlatform PROGRESS: ', _data);

    });
    GameAnalytics.listen(Constant.POST_OR_GET_GAME_EVENTS.SKIP, (_data) => {
      console.log('GetDataFromPlatform SKIP: ', _data);
      HandRecord.SetSpeed(_data);

    });
    GameAnalytics.listen(Constant.POST_OR_GET_GAME_EVENTS.FORWARD, (_data) => {
      console.log('GetDataFromPlatform FORWARD: ', _data);

    });
    GameAnalytics.listen(Constant.POST_OR_GET_GAME_EVENTS.BACKWARD, (_data) => {
      console.log('GetDataFromPlatform BACKWARD: ', _data);

    });
    GameAnalytics.listen(Constant.POST_OR_GET_GAME_EVENTS.REPLAY, (_data) => {
      console.log('GetDataFromPlatform REPLAY: ', _data);
      if (_data) {
        this.scene.stop('ReplayHandScene');
        this.scene.start('ReplayHandScene', { data: _data });
      }
    });
    GameAnalytics.listen(Constant.POST_OR_GET_GAME_EVENTS.REPLAY_END, (_data) => {
      console.log('Socket Disconnected', _data);
      HandRecord.DisconnectSocket();
    });
  };

  PostFrameRateDataToPlatform(_data) {
    console.log('data send ', typeof (_data), _data);
    GameAnalytics.emit(Constant.POST_OR_GET_GAME_EVENTS.FRAME_RATE, _data);
  };
  PostStopPlayDataToPlatform(_data) {
    console.log('data send Stop ', typeof (_data), _data);
    GameAnalytics.emit(Constant.POST_OR_GET_GAME_EVENTS.STOP, _data);
  };

  //#region - Resize
  resize(_newWidth, _newHeight) {
    const newScale = Utils.GetScale(SelectedResolution.width, SelectedResolution.height, _newWidth, _newHeight);
    this.currentNewScale = newScale;
    this.ResizeGameplayBg(_newWidth, _newHeight, newScale);

    this.table.resize(_newWidth, _newHeight, newScale);
    // this.upperPanel.resize(_newWidth, _newHeight, newScale);
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
    // this.buyinPopup.resize(_newWidth, _newHeight, newScale);
    // this.settingPopup.resize(_newWidth, _newHeight, newScale);
    // this.tournamentStageOverPopup.resize(_newWidth, _newHeight, newScale);
    this.sittingAnimPopup.ResizePlayerPlaceHolderAnim(_newWidth, _newHeight, newScale);
    // this.chatPopup.resize(_newWidth, _newHeight, newScale);
  };
  //#endregion

}