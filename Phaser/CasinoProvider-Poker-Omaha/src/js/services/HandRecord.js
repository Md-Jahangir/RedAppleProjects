/* global console,setTimeout */

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

// Connection to a broadcast channel
class HandRecord {
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
    this.baseUrl = 'https://staginglocal.redappletech.com/pokerRecorderEngine';//stagging local machine;
    // eslint-disable-next-line no-console
    console.log('constructor handrecord!');
    this.socket = io(this.baseUrl, {
      path: '/poker-engine-socket',
      query: {
        token: this.authToken
      }
    });

    if (Model.GetType() === 'replay') {
      this.InitSocketListeners();
    }
  };

  //############################### INIT SOCKET AND LISTENER #######################################
  //#region - Init socket and listener
  async InitSocketListeners() {


    //#region -Socekt Connect
    this.socket.on('connect', () => {
      // eslint-disable-next-line no-console
      console.log('hand Socket successfully connected!');
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
    await this.LeaveTableSuccess();
  };
  //#endregion

  //#region - Get User Data (Listener)
  async GetUserData() {
    this.socket.on('user-data', (_data, _ack) => {
      try {
        // eslint-disable-next-line no-console
        console.log('hand record user-data : ', _data);
        if (!_data.error) {
          this.SetValueFromUserData(_data.data.user_game_data);
          Model.SetLocalPlayerData(_data.data);
          Model.SetPlaybackID(_data.data.playback_id);
          Model.SetLocalPlayerId(_data.data.user_id);
          Model.SetLocalUserName(_data.data.user_name);
          Model.SetLocalPlayerRemoteId(_data.data.remote_user_id);
        } else {
          Constant.game.events.emit('evtShowAlert', _data.message);
        }
        // Send acknowledgment back to the server
        if (_ack) {
          _ack({ success: true, message: 'User data processed successfully' });
          setTimeout(() => {
            Constant.game.events.emit('evtEmitStartReel');
          }, 6000);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error processing user data:', error);
        // Send acknowledgment with an error back to the server
        if (_ack) {
          _ack({ success: false, error: 'Failed to process user data' });
        }
      }
    });
  };
  //#endregion

  //#region - Start Reels
  async StartReel() {
    const data = {
      'table_id': Model.GetTableId(),
      'game_id': Model.GetGameId(),
      'playback_id': Model.GetPlaybackID()
    };
    // eslint-disable-next-line no-console
    console.log('hand record start-reel', data);
    // this.socket.emit('update-chips', data);
    this.socket.emit('start-reel', data, (response) => {
      // eslint-disable-next-line no-console
      console.log('Acknowledgement from server:', response);
      Constant.game.events.emit('evtSendFrameRate', response);
    });
  };
  //#endregion

  //#region - Get Room Details (Listener)
  async GetRoomDetails() {
    // this.socket.on('room-details', async (_data) => {
    //   // eslint-disable-next-line no-console
    //   console.log('room-details !', _data);

    //   if (!_data.error) {
    //     Model.SetRoomDetailsData(_data.data);
    //     Model.SetPlayersData(_data.data);
    //     Constant.game.events.emit('evtCreatePlayer');
    //   } else {
    //     Constant.game.events.emit('evtShowAlert', _data.message);
    //   }
    // });

    this.socket.on('room-details', (_data, _ack) => {
      try {
        // eslint-disable-next-line no-console
        console.log('hand record room-details : ', _data);
        if (!_data.error) {
          Model.SetRoomDetailsData(_data.data);
          Model.SetPlayersData(_data.data);
          Constant.game.events.emit('evtCreatePlayer');
        } else {
          Constant.game.events.emit('evtShowAlert', _data.message);
        }
        // Send acknowledgment back to the server
        if (_ack) {
          _ack({ success: true, message: 'room details processed successfully' });
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error processing room details:', error);
        // Send acknowledgment with an error back to the server
        if (_ack) {
          _ack({ success: false, error: error });
        }
      }
    });
  };
  //#endregion

  //#region - Update Room (Listener)
  async UpdateRoom() {
    // this.socket.on('update-room', async (_data) => {
    //   // eslint-disable-next-line no-console
    //   console.log('---Update Room', _data);
    //   if (!_data.error) {
    //     if (_data.data.sit_in === true) {
    //       // // eslint-disable-next-line no-console
    //       // console.log('inside is join true: ', _data.data);
    //       Model.UpdateRoomDetailsData(_data.data);
    //       Constant.game.events.emit('evtCreatePlayer');
    //     } else {
    //       Model.SetSitOutPlayerDetails(_data.data);
    //       Constant.game.events.emit('evtInactivePlayer');
    //     }
    //   } else {
    //     Constant.game.events.emit('evtShowAlert', _data.message);
    //   }
    // });
    this.socket.on('update-room', (_data, _ack) => {
      try {
        // eslint-disable-next-line no-console
        console.log('hand record update-room : ', _data);
        if (!_data.error) {
          if (_data.data.sit_in === true) {
            Model.UpdateRoomDetailsData(_data.data);
            Constant.game.events.emit('evtCreatePlayer');
          } else {
            Model.SetSitOutPlayerDetails(_data.data);
            Constant.game.events.emit('evtInactivePlayer');
          }
        } else {
          Constant.game.events.emit('evtShowAlert', _data.message);
        }
        // Send acknowledgment back to the server
        if (_ack) {
          _ack({ success: true, message: 'update-room processed successfully' });
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error processing update-room:', error);
        // Send acknowledgment with an error back to the server
        if (_ack) {
          _ack({ success: false, error: 'Failed to process update-room' });
        }
      }
    });
  };
  //#endregion

  //#region - Start Game (Listener)
  async StartGame() {
    // this.socket.on('start-game', async (_data) => {
    //   // eslint-disable-next-line no-console
    //   console.log('start-game', _data);
    //   if (!_data.error) {
    //     Model.SetGameId(_data.data.game_id);
    //     Model.SetRoomName(_data.data.room_name);
    //     Model.SetSmallBigBlindPlayerData(_data.data);
    //     Model.SetSmallBlindPlayerId(_data.data);
    //     Model.SetBigBlindPlayerId(_data.data);
    //     Constant.game.events.emit('evtShowSmallAndBigBlind');
    //   } else {
    //     Constant.game.events.emit('evtShowAlert', _data.message);
    //   }
    // });
    this.socket.on('start-game', (_data, _ack) => {
      try {
        // eslint-disable-next-line no-console
        console.log('hand record start-game : ', _data);
        if (!_data.error) {
          Model.SetGameId(_data.data.game_id);
          Model.SetRoomName(_data.data.room_name);
          Model.SetSmallBigBlindPlayerData(_data.data);
          Model.SetSmallBlindPlayerId(_data.data);
          Model.SetBigBlindPlayerId(_data.data);
          // Constant.GAME_TURN_TIME = _data.data.actionTime;
          Model.SetGameTurnTime(_data.data.actionTime);
          Constant.game.events.emit('evtShowSmallAndBigBlind');
        } else {
          Constant.game.events.emit('evtShowAlert', _data.message);
        }
        // Send acknowledgment back to the server
        if (_ack) {
          _ack({ success: true, message: 'start-game processed successfully' });
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error processing start-game:', error);
        // Send acknowledgment with an error back to the server
        if (_ack) {
          _ack({ success: false, error: 'Failed to process start-game' });
        }
      }
    });
  };
  //#endregion

  //#region - Update Blinds (Listener)
  async UpdateBlinds() {
    // this.socket.on('update-blind', async (_data) => {
    //   // eslint-disable-next-line no-console
    //   console.log('update-blind', _data);
    //   Model.SetUpdateBlindsData(_data.data);
    //   Constant.game.events.emit('evtShowBlindDeductAnimation');
    // });
    this.socket.on('update-blind', (_data, _ack) => {
      try {
        // eslint-disable-next-line no-console
        console.log('hand record update-blind : ', _data);
        if (!_data.error) {
          Model.SetUpdateBlindsData(_data.data);
          Constant.game.events.emit('evtShowBlindDeductAnimation');
        } else {
          Constant.game.events.emit('evtShowAlert', _data.message);
        }
        // Send acknowledgment back to the server
        if (_ack) {
          _ack({ success: true, message: 'update-blind processed successfully' });
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error processing update-blind:', error);
        // Send acknowledgment with an error back to the server
        if (_ack) {
          _ack({ success: false, error: 'Failed to process update-blind' });
        }
      }
    });
  };
  //#endregion

  //#region - Start Pre Flop Round (Listener)
  async StartPreFlopRound() {
    // this.socket.on('pre-flop', async (_data) => {
    //   // eslint-disable-next-line no-console
    //   console.log('pre-flop', _data);
    //   if (!_data.error) {
    //     Model.SetPreFlopRoundData(_data.data);
    //     Constant.game.events.emit('evtShowCardDistributionAnimation');
    //   }
    // });
    this.socket.on('pre-flop', (_data, _ack) => {
      try {
        // eslint-disable-next-line no-console
        console.log('hand record pre-flop : ', _data);
        if (!_data.error) {
          Model.SetPreFlopRoundData(_data.data);
          Constant.game.events.emit('evtShowCardDistributionAnimation');
        } else {
          Constant.game.events.emit('evtShowAlert', _data.message);
        }
        // Send acknowledgment back to the server
        if (_ack) {
          _ack({ success: true, message: 'pre-flop processed successfully' });
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error processing pre-flop:', error);
        // Send acknowledgment with an error back to the server
        if (_ack) {
          _ack({ success: false, error: 'Failed to process pre-flop' });
        }
      }
    });
  };
  //#endregion

  //#region - Send Bet Data (Listener)
  async SendBetData() {
    // this.socket.on('send-bet', async (_data) => {
    //   // eslint-disable-next-line no-console
    //   console.log('send-bet', _data);
    //   if (!_data.error) {
    //     Model.SetTurnData(_data.data);
    //     Constant.game.events.emit('evtChangeTurn');
    //   } else {
    //     Constant.game.events.emit('evtShowAlert', _data.message);
    //   }
    // });
    this.socket.on('send-bet', (_data, _ack) => {
      try {
        // eslint-disable-next-line no-console
        console.log('hand record send-bet : ', _data);
        if (!_data.error) {
          Model.SetTurnData(_data.data);
          Constant.game.events.emit('evtChangeTurn');
        } else {
          Constant.game.events.emit('evtShowAlert', _data.message);
        }
        // Send acknowledgment back to the server
        if (_ack) {
          _ack({ success: true, message: 'send-bet processed successfully' });
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error processing send-bet:', error);
        // Send acknowledgment with an error back to the server
        if (_ack) {
          _ack({ success: false, error: 'Failed to process send-bet' });
        }
      }
    });
  };
  //#endregion

  //#region - Update Timer (Listener)
  async UpdateTimer() {
    // this.socket.on('update-timer', async (_data) => {
    //   if (!_data.error) {
    //     Model.SetTimerData(_data);
    //     Constant.game.events.emit('evtShowTimer');
    //   }
    // });
    this.socket.on('update-timer', (_data, _ack) => {
      try {
        // eslint-disable-next-line no-console
        console.log('hand record update-timer : ', _data);
        if (!_data.error) {
          Model.SetTimerData(_data);
          Constant.game.events.emit('evtShowTimer');
        } else {
          Constant.game.events.emit('evtShowAlert', _data.message);
        }
        // Send acknowledgment back to the server
        if (_ack) {
          _ack({ success: true, message: 'update-timer processed successfully' });
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error processing update-timer:', error);
        // Send acknowledgment with an error back to the server
        if (_ack) {
          _ack({ success: false, error: 'Failed to process update-timer' });
        }
      }
    });
  };
  //#endregion

  //#region - Update pot value (Listener)
  async UpdatePotValue() {
    // this.socket.on('update-pot', async (_data) => {
    //   // eslint-disable-next-line no-console
    //   console.log('update-pot', _data);
    //   if (!_data.error) {
    //     Model.SetUpdatePotValueData(_data);
    //     Constant.game.events.emit('evtUpdatePotValue');
    //   }
    // });
    this.socket.on('update-pot', (_data, _ack) => {
      try {
        // eslint-disable-next-line no-console
        console.log('hand record update-pot : ', _data);
        if (!_data.error) {
          Model.SetUpdatePotValueData(_data);
          Constant.game.events.emit('evtUpdatePotValue');
        } else {
          Constant.game.events.emit('evtShowAlert', _data.message);
        }
        // Send acknowledgment back to the server
        if (_ack) {
          _ack({ success: true, message: 'update-pot processed successfully' });
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error processing update-pot:', error);
        // Send acknowledgment with an error back to the server
        if (_ack) {
          _ack({ success: false, error: 'Failed to process update-pot' });
        }
      }
    });
  };
  //#endregion

  //#region - Pot split data (Listener)
  async PotSplitData() {
    // this.socket.on('pot-split', async (_data) => {
    //   // eslint-disable-next-line no-console
    //   console.log('pot-split', _data);
    //   if (!_data.error) {

    //   }
    // });
    this.socket.on('pot-split', (_data, _ack) => {
      try {
        // eslint-disable-next-line no-console
        console.log('hand record pot-split : ', _data);
        if (!_data.error) {
          // Model.SetUpdatePotValueData(_data);
          // Constant.game.events.emit('evtUpdatePotValue');
        } else {
          Constant.game.events.emit('evtShowAlert', _data.message);
        }
        // Send acknowledgment back to the server
        if (_ack) {
          _ack({ success: true, message: 'pot-split processed successfully' });
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error processing pot-split:', error);
        // Send acknowledgment with an error back to the server
        if (_ack) {
          _ack({ success: false, error: 'Failed to process pot-split' });
        }
      }
    });
  };
  //#endregion

  //#region - Flop Round (Listener)
  async DealFlopRound() {
    // this.socket.on('deal-flop', async (_data) => {
    //   // eslint-disable-next-line no-console
    //   console.log('deal-flop', _data);
    //   if (!_data.error) {
    //     Model.SetDealFlopRoundData(_data.data);
    //     Constant.game.events.emit('evtDealFlopRound');
    //   }
    // });
    this.socket.on('deal-flop', (_data, _ack) => {
      try {
        // eslint-disable-next-line no-console
        console.log('hand record deal-flop : ', _data);
        if (!_data.error) {
          Model.SetDealFlopRoundData(_data.data);
          Constant.game.events.emit('evtDealFlopRound');
        } else {
          Constant.game.events.emit('evtShowAlert', _data.message);
        }
        // Send acknowledgment back to the server
        if (_ack) {
          _ack({ success: true, message: 'deal-flop processed successfully' });
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error processing deal-flop:', error);
        // Send acknowledgment with an error back to the server
        if (_ack) {
          _ack({ success: false, error: 'Failed to process deal-flop' });
        }
      }
    });
  };
  //#endregion

  //#region - Turn Round (Listener)
  async DealTurnRound() {
    // this.socket.on('deal-turn', async (_data) => {
    //   // eslint-disable-next-line no-console
    //   console.log('deal-turn', _data);
    //   if (!_data.error) {
    //     Model.SetDealTurnRoundData(_data.data);
    //     Constant.game.events.emit('evtDealTurnRound');
    //   }
    // });
    this.socket.on('deal-turn', (_data, _ack) => {
      try {
        // eslint-disable-next-line no-console
        console.log('hand record deal-turn : ', _data);
        if (!_data.error) {
          Model.SetDealTurnRoundData(_data.data);
          Constant.game.events.emit('evtDealTurnRound');
        } else {
          Constant.game.events.emit('evtShowAlert', _data.message);
        }
        // Send acknowledgment back to the server
        if (_ack) {
          _ack({ success: true, message: 'deal-turn processed successfully' });
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error processing deal-turn:', error);
        // Send acknowledgment with an error back to the server
        if (_ack) {
          _ack({ success: false, error: 'Failed to process deal-turn' });
        }
      }
    });
  };
  //#endregion

  //#region - River Round (Listener)
  async DealRiverRound() {
    // this.socket.on('deal-river', async (_data) => {
    //   // eslint-disable-next-line no-console
    //   console.log('deal-river', _data);
    //   if (!_data.error) {
    //     Model.SetDealRiverRoundData(_data.data);
    //     Constant.game.events.emit('evtDealRiverRound');
    //   }
    // });
    this.socket.on('deal-river', (_data, _ack) => {
      try {
        // eslint-disable-next-line no-console
        console.log('hand record deal-river : ', _data);
        if (!_data.error) {
          Model.SetDealRiverRoundData(_data.data);
          Constant.game.events.emit('evtDealRiverRound');
        } else {
          Constant.game.events.emit('evtShowAlert', _data.message);
        }
        // Send acknowledgment back to the server
        if (_ack) {
          _ack({ success: true, message: 'deal-river processed successfully' });
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error processing deal-river:', error);
        // Send acknowledgment with an error back to the server
        if (_ack) {
          _ack({ success: false, error: 'Failed to process deal-river' });
        }
      }
    });
  };
  //#endregion

  //#region - Show Down Round (Listener)
  async DealShowDownRound() {
    // this.socket.on('show-down', async (_data) => {
    //   // eslint-disable-next-line no-console
    //   console.log('show-down', _data);
    //   if (!_data.error) {
    //     Model.SetShowDownRoundData(_data.data);
    //     Constant.game.events.emit('evtShowDownRound');
    //   }
    // });
    this.socket.on('show-down', (_data, _ack) => {
      try {
        // eslint-disable-next-line no-console
        console.log('hand record show-down : ', _data);
        if (!_data.error) {
          Model.SetShowDownRoundData(_data.data);
          Constant.game.events.emit('evtShowDownRound');
        } else {
          Constant.game.events.emit('evtShowAlert', _data.message);
        }
        // Send acknowledgment back to the server
        if (_ack) {
          _ack({ success: true, message: 'show-down processed successfully' });
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error processing show-down:', error);
        // Send acknowledgment with an error back to the server
        if (_ack) {
          _ack({ success: false, error: 'Failed to process show-down' });
        }
      }
    });
  };
  //#endregion

  //#region - Leave Room Success (Listener)
  async LeaveTableSuccess() {
    // this.socket.on('leave-table', async (_data) => {
    //   // eslint-disable-next-line no-console
    //   console.log('leave-table !', _data);
    //   if (!_data.error) {
    //     // window.open(Constant.platformUrl, '_self');
    //   }
    // });
    this.socket.on('leave-table', (_data, _ack) => {
      try {
        // eslint-disable-next-line no-console
        console.log('hand record leave-table : ', _data);
        if (!_data.error) {
          // Model.SetShowDownRoundData(_data.data);
          // Constant.game.events.emit('evtShowDownRound');
        } else {
          Constant.game.events.emit('evtShowAlert', _data.message);
        }
        // Send acknowledgment back to the server
        if (_ack) {
          _ack({ success: true, message: 'leave-table processed successfully' });
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error processing leave-table:', error);
        // Send acknowledgment with an error back to the server
        if (_ack) {
          _ack({ success: false, error: 'Failed to process leave-table' });
        }
      }
    });
  };
  //#endregion

  async PauseReel() {
    const data = {
      'playback_id': Model.GetPlaybackID()
    };
    // eslint-disable-next-line no-console
    console.log('pause-reel !', data);
    this.socket.emit('pause-reel', data, (response) => {
      // eslint-disable-next-line no-console
      console.log('Acknowledgement from server:', response);
    });
  }

  async ResumeReel() {
    const data = {
      'playback_id': Model.GetPlaybackID()
    };
    // eslint-disable-next-line no-console
    console.log('resume-reel !', data);
    this.socket.emit('resume-reel', data, (response) => {
      // eslint-disable-next-line no-console
      console.log('Acknowledgement from server:', response);
    });
  }

  async SetSpeed(_speed) {
    const data = {
      'playback_id': Model.GetPlaybackID(),
      'speed_setting_value': _speed
    };
    // eslint-disable-next-line no-console
    console.log('set-speed !', data);
    this.socket.emit('set-speed', data, (response) => {
      // eslint-disable-next-line no-console
      console.log('Acknowledgement from server:', response);
    });
  }

  //#region - Disconnect Socket (Emit)
  async DisconnectSocket() {
    this.socket.disconnect();
  };
  //#endregion

};
const handRecord = new HandRecord();
export { handRecord as HandRecord };