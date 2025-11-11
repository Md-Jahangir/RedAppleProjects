/* global window,URLSearchParams,console */

/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 16-02-2024.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 09-08-2024
 * @Description :- Handle the all socket event.
 ************************************/
import io from 'socket.io-client';
import { Model } from '../Model';
import { Constant } from '../Constant.js';
import { Utils } from '../Utils.js';

// Connection to a broadcast channel
class Client {
  //#region - Get Auth Token and Type from Query parameter
  async GetAuthTokenFromServer() {
    this.urlParams = new URLSearchParams(window.location.search);
    this.authToken = this.urlParams.get('authToken');
    this.type = this.urlParams.get('type');
    Model.SetAuthToken(this.authToken);
    Model.SetType(this.type);
  };
  //#endregion

  //#region - Set tableid,buyin,gameid from user data
  SetValueFromUserData(_data) {
    this.tableId = _data.table_id;
    this.minBuyIn = Number(_data.minBuyIn);
    this.maxBuyIn = Number(_data.maxBuyIn);
    this.gameType = _data.gametype;
    this.gameId = _data.game_id;
    Model.SetTableId(this.tableId);
    Model.SetMinBuyInAmount(this.minBuyIn);
    Model.SetMaxBuyInAmount(this.maxBuyIn);
    Model.SetGameType(this.gameType);
    Model.SetGameId(this.gameId);
  };
  //#endregion

  constructor() {
    this.GetAuthTokenFromServer();
    this.baseUrl = 'https://staginglocal.redappletech.com/pokerCoreEngine';//stagging local machine;
    // this.baseUrl = 'http://192.168.1.25:5030/pokerCoreEngine';//stagging local machine
    // eslint-disable-next-line no-console
    console.log('constructor client!');
    this.socket = io(this.baseUrl, {
      path: '/poker-engine-socket',
      query: {
        token: Model.GetAuthToken()// this.authToken
      }
    });

    if (Model.GetType() === 'cash' || Model.GetType() === 'tournament') {
      this.InitSocketListeners();
    }
  };

  //############################### INIT SOCKET AND LISTENER #######################################
  //#region - Init socket and listener
  async InitSocketListeners() {
    //#region -Socekt Connect
    this.socket.on('connect', () => {
      // eslint-disable-next-line no-console
      console.log('Socket successfully connected!');
      Constant.game.events.emit('evtSocketConnection', 'Socket successfully connected');
      if (!Utils.IsEmpty(Model.GetLocalPlayerID())) {
        // this.GetGameState();
        this.JoinQueue();
        // eslint-disable-next-line no-console
        console.log('Socket Reconnection join que Emit');
      }
    });
    //#endregion

    //#region -Socket Disconnect
    this.socket.on('disconnect', () => {
      // eslint-disable-next-line no-console
      console.log('Disconnected!');
      // window.open(Constant.platformUrl, '_self');
    });
    //#endregion

    await this.GetUserData();
    await this.GetRoomDetails();
    await this.UpdateRoom();
    await this.StartGame();
    await this.UpdateBlinds();
    await this.StartPreFlopRound();
    await this.SendBetData();
    await this.UpdateTimer();
    await this.PotSplitData();
    await this.UpdatePotValue();
    await this.DealFlopRound();
    await this.DealTurnRound();
    await this.DealRiverRound();
    await this.DealShowDownRound();
    await this.ReplayHand();
    await this.LeaveRoomSuccess();
    await this.LeaveTableSuccess();
    await this.TournamentHandsOver();
    await this.TournamentStageOverCounter();
    await this.TournamentNextStage();
    await this.GameState();
    await this.SpectatorPreFlop();
    await this.HandCooldownTimer();
    await this.UpdateChipsResponse();
    await this.HandStrength();
  };
  //#endregion

  //#region - Get User Data (Listener)
  async GetUserData() {
    this.socket.on('user-data', async (_data) => {
      // eslint-disable-next-line no-console
      console.log('user-data !', _data);
      if (!_data.error) {
        if (!Utils.IsEmpty(_data)) {
          this.SetValueFromUserData(_data.data.user_game_data);
          Model.SetLocalPlayerData(_data.data);
          Model.SetLocalPlayerId(_data.data.user_id);
          Model.SetLocalPlayerRemoteId(_data.data.remote_user_id);
          Model.SetLocalUserName(_data.data.user_name);
          if (_data.data.buy_in) {
            Model.SetBuyInAmount(_data.data.buy_in);
          }
        } else {
          Constant.game.events.emit('evtShowAlert', 'data null');
        }
      } else {
        Constant.game.events.emit('evtShowAlert', _data.message);
      }
    });
  };
  //#endregion

  //#region - Join Queue (Emit)
  async JoinQueue() {
    const data = {
      'table_id': Model.GetTableId()
    };
    // this.socket.emit('join-queue', data);
    this.socket.emit('join-queue', data, (response) => {
      // eslint-disable-next-line no-console
      console.log('Acknowledgement join-queue from server:', response);
      if (!response.error) {
        // eslint-disable-next-line no-console
        console.log('Model.GetRoomDetailsData(): ', Model.GetRoomDetailsData());
        if (Model.GetRoomDetailsData()) {
          // eslint-disable-next-line no-console
          console.log('inside Model.GetRoomDetailsData(): ', Model.GetRoomDetailsData());
          this.GetGameState();
          // eslint-disable-next-line no-console
          console.log('Socket Reconnection GetGameState Emit');
        }
      } else {
        Constant.game.events.emit('evtShowAlert', response.message);
      }
    });
  };
  //#endregion

  //#region - Get Room Details (Listener)
  async GetRoomDetails() {
    this.socket.on('room-details', async (_data) => {
      // eslint-disable-next-line no-console
      console.log('room-details !', _data);
      if (!_data.error) {
        if (!Utils.IsEmpty(_data)) {
          Model.SetRoomDetailsData(_data.data);
          Model.SetPlayersData(_data.data);
          Constant.game.events.emit('evtCreatePlayer');
        } else {
          Constant.game.events.emit('evtShowAlert', 'data null');
        }
      } else {
        Constant.game.events.emit('evtShowAlert', _data.message);
      }
    });
  };
  //#endregion

  //#region - Update Room (Listener)
  async UpdateRoom() {
    this.socket.on('update-room', async (_data) => {
      // eslint-disable-next-line no-console
      console.log('---Update Room', _data);
      if (!_data.error) {
        if (!Utils.IsEmpty(_data.data)) {
          if (_data.data.sit_in === true) {
            Model.UpdateRoomDetailsData(_data.data);
            // Constant.game.events.emit('evtCreatePlayer');
            Constant.game.events.emit('evtJoinPlayer');
          } else {
            Model.SetSitOutPlayerDetails(_data.data);
            Constant.game.events.emit('evtInactivePlayer');
          }
        } else {
          Constant.game.events.emit('evtShowAlert', 'data null');
        }
      } else {
        Constant.game.events.emit('evtShowAlert', _data.message);
      }
    });
  };
  //#endregion

  //#region - Sit In (Emit)
  async SitIn(_seatIndex) {
    const data = {
      'buy_in': Model.GetBuyInAmount(),
      'table_id': Model.GetTableId(),
      'seat_no': _seatIndex
    };
    // eslint-disable-next-line no-console
    console.log('sit-in !', data);
    // this.socket.emit('sit-in', data);

    this.socket.emit('sit-in', data, (response) => {
      // eslint-disable-next-line no-console
      console.log('Acknowledgement sit-in from server:', response);
      if (!response.error) {
        Constant.game.events.emit('evtGettingAckFromSitIn');
      } else {
        Constant.game.events.emit('evtShowAlert', response.message);
      }
    });
  };
  //#endregion

  //#region - Sit Out (Emit)
  async SitOut(_seatIndex) {
    const data = {
      'table_id': Model.GetTableId(),
      'seat_no': _seatIndex
    };
    // // eslint-disable-next-line no-console
    // console.log('sit-out !', data);
    this.socket.emit('sit-out', data);
  };
  //#endregion

  //#region - Sit in Success (Listener)
  async SitInSuccess() {
    this.socket.on('sit-in-res', async (_data) => {
      if (!_data.error) {
        if (!Utils.IsEmpty(_data)) {
          Constant.game.events.emit('evtSitOutSuccess');
        } else {
          Constant.game.events.emit('evtShowAlert', 'data null');
        }
      }
    });
  };
  //#endregion

  //#region - Start Game (Listener)
  async StartGame() {
    this.socket.on('start-game', async (_data) => {
      // eslint-disable-next-line no-console
      console.log('start-game', _data);
      if (!_data.error) {
        if (!Utils.IsEmpty(_data)) {
          Model.SetGameId(_data.data.game_id);
          Model.SetRoomName(_data.data.room_name);
          Model.SetSmallBigBlindPlayerData(_data.data);
          Model.SetSmallBlindPlayerId(_data.data);
          Model.SetBigBlindPlayerId(_data.data);
          // Constant.GAME_TURN_TIME = _data.data.actionTime;
          Model.SetGameTurnTime(_data.data.actionTime);
          Constant.game.events.emit('evtShowSmallAndBigBlind');
        } else {
          Constant.game.events.emit('evtShowAlert', 'data null');
        }
      } else {
        Constant.game.events.emit('evtShowAlert', _data.message);
      }
    });
  };
  //#endregion

  //#region - Update Blinds (Listener)
  async UpdateBlinds() {
    this.socket.on('update-blind', async (_data) => {
      // eslint-disable-next-line no-console
      console.log('update-blind', _data);
      if (!_data.error) {
        if (!Utils.IsEmpty(_data)) {
          Model.SetUpdateBlindsData(_data.data);
          Constant.game.events.emit('evtShowBlindDeductAnimation');
        } else {
          Constant.game.events.emit('evtShowAlert', 'data null');
        }
      } else {
        Constant.game.events.emit('evtShowAlert', _data.message);
      }
    });
  };
  //#endregion

  //#region - Start Pre Flop Round (Listener)
  async StartPreFlopRound() {
    this.socket.on('pre-flop', async (_data) => {
      // eslint-disable-next-line no-console
      console.log('pre-flop', _data);
      if (!_data.error) {
        if (!Utils.IsEmpty(_data)) {
          Model.SetPreFlopRoundData(_data.data);
          Constant.game.events.emit('evtShowCardDistributionAnimation');
        } else {
          Constant.game.events.emit('evtShowAlert', 'data null');
        }
      }
    });
  };
  //#endregion

  //#region - Send Bet Data (Listener)
  async SendBetData() {
    this.socket.on('send-bet', async (_data) => {
      // eslint-disable-next-line no-console
      console.log('send-bet', _data);
      if (!_data.error) {
        if (!Utils.IsEmpty(_data)) {
          Model.SetTurnData(_data.data);
          Constant.game.events.emit('evtChangeTurn');
        } else {
          Constant.game.events.emit('evtShowAlert', 'data null');
        }
      } else {
        Constant.game.events.emit('evtShowAlert', _data.message);
      }
    });
  };
  //#endregion

  //#region - Update Timer (Listener)
  async UpdateTimer() {
    this.socket.on('update-timer', async (_data) => {
      // console.log('update-timer', _data);
      if (!_data.error) {
        Model.SetTimerData(_data);
        Constant.game.events.emit('evtShowTimer');
      }
    });
  };
  //#endregion

  //#region - Bet Place (Emit)
  async PlaceBet(_betAmount) {
    const data = {
      'table_id': Model.GetTableId(),
      'game_id': Model.GetGameId(),
      'bet': _betAmount,
    };
    // eslint-disable-next-line no-console
    console.log('update-bet: ', data);
    this.socket.emit('update-bet', data);
  };
  //#endregion

  //#region - Update pot value (Listener)
  async UpdatePotValue() {
    this.socket.on('update-pot', async (_data) => {
      // eslint-disable-next-line no-console
      console.log('update-pot', _data);
      if (!_data.error) {
        if (!Utils.IsEmpty(_data)) {
          Model.SetUpdatePotValueData(_data);
          Constant.game.events.emit('evtUpdatePotValue');
        } else {
          Constant.game.events.emit('evtShowAlert', 'data null');
        }
      } else {
        Constant.game.events.emit('evtShowAlert', _data.message);
      }
    });
  };
  //#endregion

  //#region - Pot split data (Listener)
  async PotSplitData() {
    this.socket.on('pot-split', async (_data) => {
      // eslint-disable-next-line no-console
      console.log('pot-split', _data);
      if (!_data.error) {

      }
    });
  };
  //#endregion

  //#region - Flop Round (Listener)
  async DealFlopRound() {
    this.socket.on('deal-flop', async (_data) => {
      // eslint-disable-next-line no-console
      console.log('deal-flop', _data);
      if (!_data.error) {
        if (!Utils.IsEmpty(_data)) {
          Model.SetDealFlopRoundData(_data.data);
          Constant.game.events.emit('evtDealFlopRound');
        } else {
          Constant.game.events.emit('evtShowAlert', 'data null');
        }
      } else {
        Constant.game.events.emit('evtShowAlert', _data.message);
      }
    });
  };
  //#endregion

  //#region - Turn Round (Listener)
  async DealTurnRound() {
    this.socket.on('deal-turn', async (_data) => {
      // eslint-disable-next-line no-console
      console.log('deal-turn', _data);
      if (!_data.error) {
        if (!Utils.IsEmpty(_data)) {
          Model.SetDealTurnRoundData(_data.data);
          Constant.game.events.emit('evtDealTurnRound');
        } else {
          Constant.game.events.emit('evtShowAlert', 'data null');
        }
      } else {
        Constant.game.events.emit('evtShowAlert', _data.message);
      }
    });
  };
  //#endregion

  //#region - River Round (Listener)
  async DealRiverRound() {
    this.socket.on('deal-river', async (_data) => {
      // eslint-disable-next-line no-console
      console.log('deal-river', _data);
      if (!_data.error) {
        if (!Utils.IsEmpty(_data)) {
          Model.SetDealRiverRoundData(_data.data);
          Constant.game.events.emit('evtDealRiverRound');
        } else {
          Constant.game.events.emit('evtShowAlert', 'data null');
        }
      } else {
        Constant.game.events.emit('evtShowAlert', _data.message);
      }
    });
  };
  //#endregion

  //#region - Show Down Round (Listener)
  async DealShowDownRound() {
    this.socket.on('show-down', async (_data) => {
      // eslint-disable-next-line no-console
      console.log('show-down', _data);
      if (!_data.error) {
        if (!Utils.IsEmpty(_data)) {
          Model.SetShowDownRoundData(_data.data);
          Constant.game.events.emit('evtShowDownRound');
        } else {
          Constant.game.events.emit('evtShowAlert', 'data null');
        }
      } else {
        Constant.game.events.emit('evtShowAlert', _data.message);
      }
    });
  };
  //#endregion

  //#region - Replay Hand (Listener)
  async ReplayHand() {
    this.socket.on('replay-hand', async (_data) => {
      // eslint-disable-next-line no-console
      console.log('replay-hand', _data);
      if (!_data.error) {
        if (!Utils.IsEmpty(_data)) {
          Model.SetReplayHandData(_data.data);
          Constant.game.events.emit('evtReplayHand');
        } else {
          Constant.game.events.emit('evtShowAlert', 'data null');
        }
      } else {
        Constant.game.events.emit('evtShowAlert', _data.message);
      }
    });
  };
  //#endregion

  //#region - Leave Room (Emit)
  async LeaveRoom() {
    const data = {
      'table_id': Model.GetTableId()
    };
    // eslint-disable-next-line no-console
    console.log('leave-room !', data);
    this.socket.emit('leave-room', data);
  };
  //#endregion

  //#region - Leave Room Success (Listener)
  async LeaveTableSuccess() {
    this.socket.on('leave-table', async (_data) => {
      // eslint-disable-next-line no-console
      console.log('leave-table !', _data);
      if (!_data.error) {
        if (!Utils.IsEmpty(_data)) {
          Constant.game.events.emit('evtLeaveTableJsBridge');
          // window.open(Constant.platformUrl, '_self');
        } else {
          Constant.game.events.emit('evtShowAlert', 'data null');
        }
      } else {
        Constant.game.events.emit('evtShowAlert', _data.message);
      }
    });
  };
  //#endregion

  //#region - Disconnect Socket (Emit)
  async DisconnectSocket() {
    this.socket.disconnect();
  };
  //#endregion

  //#region - Leave Room Success (Listener)
  async LeaveRoomSuccess() {
    this.socket.on('leave-room-res', async (_data) => {
      // eslint-disable-next-line no-console
      console.log('leave-room-res !', _data);
      if (!_data.error) {
        if (!Utils.IsEmpty(_data)) {
          window.open(Constant.platformUrl, '_self');
        } else {
          Constant.game.events.emit('evtShowAlert', 'data null');
        }
      } else {
        Constant.game.events.emit('evtShowAlert', _data.message);
      }
    });
  };
  //#endregion

  //#region - Tournament Hands Over (Listener)
  async TournamentHandsOver() {
    this.socket.on('hands-over', async (_data) => {
      // eslint-disable-next-line no-console
      console.log('hands-over !', _data);
      Constant.game.events.emit('evtTournamentStageOver', _data.message);
    });
  };
  //#endregion

  //#region - Tournament Round complete Counter (Listener)
  async TournamentStageOverCounter() {
    this.socket.on('stage_over_coundown', async (_data) => {
      // eslint-disable-next-line no-console
      console.log('stage_over_coundown !', _data);
      Model.tournamentstageOverCounter = _data.counter;
      Constant.game.events.emit('evtTournamentStageOverCounter', _data.counter);
    });
  };
  //#endregion

  //#region - Tournament Next Round  (Listener)
  async TournamentNextStage() {
    this.socket.on('next_stage_url', async (_data) => {
      // eslint-disable-next-line no-console
      console.log('next_stage_url !', _data);
      if (!_data.error) {
        window.open(_data.url, '_self');
      }
      else {
        Constant.isTournamentCompleted = true;
        Constant.game.events.emit('evtHideTournamentStagePopup');
        Constant.game.events.emit('evtShowAlert', _data.message);
      }
    });
  };
  //#endregion

  //#region - Auto Muck (Emit)
  async AutoMuck() {
    const data = {
      'authToken': Model.GetAuthToken(),
      'game_id': Model.GetGameId(),
      'auto_muck': this.isAutoMuck,
    };
    // eslint-disable-next-line no-console
    console.log('auto-muck !', data);
    this.socket.emit('auto-muck', data);
  };
  //#endregion

  async GetGameState() {
    const data = {
      'table_id': Model.GetTableId(),
    };
    // eslint-disable-next-line no-console
    console.log('get-game-state', data);
    this.socket.emit('get-game-state', data);
  };

  //#region ChatHistory
  async GameState() {
    this.socket.on('game-state', async (_data) => {
      // eslint-disable-next-line no-console
      console.log('game-state !', _data);
      if (!_data.error) {
        if (!Utils.IsEmpty(_data)) {
          Model.SetGameStateData(_data.data);
          Constant.game.events.emit('evtGameStateData');
        } else {
          Constant.game.events.emit('evtShowAlert', 'data null');
        }
      } else {
        Constant.game.events.emit('evtShowAlert', _data.message);
      }
    });
  };
  //#endregion

  //#region - Update Chips
  async UpdateChips(_amount) {
    const data = {
      'table_id': Model.GetTableId(),
      'chips': _amount,
    };
    // eslint-disable-next-line no-console
    console.log('update-chips', data);
    // this.socket.emit('update-chips', data);
    this.socket.emit('update-chips', data, (response) => {
      // eslint-disable-next-line no-console
      console.log('Acknowledgement from server:', response);
      // Model.SetUpdateChipsData(response.data);
      // Constant.game.events.emit('evtUpdateUserBalanceFromUpdateChips');
    });
  };
  //#endregion

  //#region - Update Chips Response
  async UpdateChipsResponse() {
    this.socket.on('update-chips-res', async (_data) => {
      // eslint-disable-next-line no-console
      console.log('update-chips-res', _data);
      if (!_data.error) {
        if (!Utils.IsEmpty(_data.data)) {
          Model.SetUpdateChipsData(_data.data);
          Constant.game.events.emit('evtUpdateUserBalanceFromUpdateChips');
        } else {
          Constant.game.events.emit('evtShowAlert', 'data null');
        }
      } else {
        Constant.game.events.emit('evtShowAlert', _data.message);
      }
    });
  };
  //#endregion

  //#region - SpectatorPreflop
  async SpectatorPreFlop() {
    this.socket.on('spectator-pre-flop', async (_data) => {
      // eslint-disable-next-line no-console
      console.log('spectator-pre-flop !', _data);
      if (!_data.error) {
        if (!Utils.IsEmpty(_data)) {
          Model.SetGameStateData(_data.data);
          Constant.game.events.emit('evtSpectatorPreFlop');
        } else {
          Constant.game.events.emit('evtShowAlert', 'data null');
        }
      } else {
        Constant.game.events.emit('evtShowAlert', _data.message);
      }
    });
  }
  //#endregion

  //#region - HandCooldownTimer
  async HandCooldownTimer() {
    this.socket.on('hand-cooldown-timer', async (_data) => {
      // console.log('hand-cooldown-timer !', _data);
      if (!_data.error) {
        if (!Utils.IsEmpty(_data)) {
          Constant.game.events.emit('evtHandCooldownTimer', _data.data);
        } else {
          Constant.game.events.emit('evtShowAlert', 'data null');
        }
      } else {
        Constant.game.events.emit('evtShowAlert', _data.message);
      }
    });
  };
  //#endregion

  //#region - Hand Strength
  async HandStrength() {
    this.socket.on('hand_strength', async (_data) => {
      // eslint-disable-next-line no-console
      console.log('hand_strength: ', _data);
      if (!_data.error) {
        if (!Utils.IsEmpty(_data)) {
          Model.SetHandStrengthData(_data.data);
          Constant.game.events.emit('evtHandStrength');
        } else {
          Constant.game.events.emit('evtShowAlert', 'data null');
        }
      } else {
        Constant.game.events.emit('evtShowAlert', _data.message);
      }
    });
  };
  //#endregion

};
const client = new Client();
export { client as Client };