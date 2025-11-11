/* global window,URLSearchParams,console */

/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 20-11-2024.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 20-11-2024
 * @Description :- Handle the all socket event.
 ************************************/
import io from 'socket.io-client';
import { Model } from '../Model';
import { Constant } from '../Constant.js';

// Connection to a broadcast channel
class Client {

    //#region - Get Value from Query parameter
    async GetValueFromServer() {
        this.urlParams = new URLSearchParams(window.location.search);
        this.authToken = this.urlParams.get('authToken');
        this.tableId = this.urlParams.get('table_id');
        this.minBuyIn = Number(this.urlParams.get('minBuyIn'));
        this.maxBuyIn = Number(this.urlParams.get('maxBuyIn'));
        this.gameType = this.urlParams.get('gametype');
        this.tournamentId = (this.urlParams.get('tournament_id') === null) ? null : this.urlParams.get('tournament_id');
        this.groupId = (this.urlParams.get('group_id') === null) ? null : this.urlParams.get('group_id');
        this.stageId = (this.urlParams.get('stage_id') === null) ? null : this.urlParams.get('stage_id');
        Constant.gameCategory = (this.tournamentId === null) ? 'cash' : 'tournament';
    };

    //#region - Set Value from Query parameter
    async SetValueFromQueryParameter() {
        Model.SetGameAuthToken(this.authToken);
        Model.SetTableId(this.tableId);
        Model.SetMinBuyInAmount(this.minBuyIn);
        Model.SetMaxBuyInAmount(this.maxBuyIn);
        Model.SetGameType(this.gameType);
    };

    constructor() {
        this.GetValueFromServer();
        this.SetValueFromQueryParameter();
        this.baseUrl = 'https://staginglocal.redappletech.com/pokerCoreEngine';//stagging local machine;
        // this.baseUrl = 'http://192.168.1.25:5030/pokerCoreEngine';//stagging local machine

        this.socket = null;

    };

    async ConnectSocket() {
        this.socket = io(this.baseUrl, {
            path: '/poker-engine-socket',
            query: {
                token: this.authToken
            }
        });
        this.InitSocketListeners();
    };

    //############################### INIT SOCKET AND LISTENER #######################################
    //#region - Init socket and listener
    async InitSocketListeners() {

        //#region -Socekt Connect
        this.socket.on('connect', () => {
            // eslint-disable-next-line no-console
            console.log('Socket successfully connected!');
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
        await this.ReconnectSession();
        await this.TournamentHandsOver();
        await this.TournamentStageOverCounter();
        await this.TournamentNextStage();
        // await this.RecieveMessage();
        // await this.ChatHistory();
        await this.GameState();
        await this.SpectatorPreFlop();

    };
    //#endregion

    //#region - Get User Data (Listener)
    async GetUserData() {
        this.socket.on('user-data', async (_data) => {
            // eslint-disable-next-line no-console
            console.log('user-data !', _data);
            if (!_data.error) {
                Model.SetLocalPlayerData(_data.data);
                Model.SetLocalPlayerId(_data.data.user_id);
                Model.SetLocalUserName(_data.data.user_name);
                // this.GetChatHistory();
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
        // // eslint-disable-next-line no-console
        // console.log('join-queue !', data);
        this.socket.emit('join-queue', data);
    };
    //#endregion

    //#region - Get Room Details (Listener)
    async GetRoomDetails() {
        this.socket.on('room-details', async (_data) => {
            // eslint-disable-next-line no-console
            console.log('room-details !', _data);
            if (!_data.error) {
                Model.SetRoomDetailsData(_data.data);
                Model.SetPlayersData(_data.data);
                Constant.game.events.emit('evtCreatePlayer');
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
                if (_data.data.sit_in === true) {
                    // // eslint-disable-next-line no-console
                    // console.log('inside is join true: ', _data.data);
                    Model.UpdateRoomDetailsData(_data.data);
                    Constant.game.events.emit('evtCreatePlayer');
                } else {
                    Model.SetSitOutPlayerDetails(_data.data);
                    Constant.game.events.emit('evtInactivePlayer');
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
        this.socket.emit('sit-in', data);
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
                Constant.game.events.emit('evtSitOutSuccess');
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
                Model.SetGameId(_data.data.game_id);
                Model.SetRoomName(_data.data.room_name);
                Model.SetSmallBigBlindPlayerData(_data.data);
                Model.SetSmallBlindPlayerId(_data.data);
                Model.SetBigBlindPlayerId(_data.data);
                Constant.game.events.emit('evtShowSmallAndBigBlind');
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
            Model.SetUpdateBlindsData(_data.data);
            Constant.game.events.emit('evtShowBlindDeductAnimation');
        });
    };
    //#endregion

    //#region - Start Pre Flop Round (Listener)
    async StartPreFlopRound() {
        this.socket.on('pre-flop', async (_data) => {
            // eslint-disable-next-line no-console
            console.log('pre-flop', _data);
            if (!_data.error) {
                Model.SetPreFlopRoundData(_data.data);
                Constant.game.events.emit('evtShowCardDistributionAnimation');
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
                Model.SetTurnData(_data.data);
                Constant.game.events.emit('evtChangeTurn');
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
                Model.SetUpdatePotValueData(_data);
                Constant.game.events.emit('evtUpdatePotValue');
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
                Model.SetDealFlopRoundData(_data.data);
                Constant.game.events.emit('evtDealFlopRound');
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
                Model.SetDealTurnRoundData(_data.data);
                Constant.game.events.emit('evtDealTurnRound');
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
                Model.SetDealRiverRoundData(_data.data);
                Constant.game.events.emit('evtDealRiverRound');
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
                Model.SetShowDownRoundData(_data.data);
                Constant.game.events.emit('evtShowDownRound');
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
                Model.SetReplayHandData(_data.data);
                Constant.game.events.emit('evtReplayHand');
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
                // window.open(Constant.platformUrl, '_self');
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
                window.open(Constant.platformUrl, '_self');
            }
        });
    };
    //#endregion

    //#region - Reconnect Session (Listener)
    async ReconnectSession() {
        this.socket.on('reconnect-session', async (_data) => {
            // eslint-disable-next-line no-console
            console.log('reconnect-session !', _data);
            if (!_data.error) {
                Model.SetReconnectData(_data.data);
                Constant.game.events.emit('evtReconnect');
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

    // //#region - send message (Emit)
    // async SendMessage(_msg) {
    //   const data = {
    //     'message': _msg,
    //     'table_id': Model.GetTableId()
    //   };
    //   // console.log('send-message !', data);
    //   this.chatSocket.emit('send-message', data);
    // }
    // //#endregion

    // //#region - Get Room Details (Listener)
    // async RecieveMessage() {
    //   this.chatSocket.on('receive-message', async (_data) => {
    //     // eslint-disable-next-line no-console
    //     console.log('receive-message !', _data);
    //     if (!_data.error) {
    //       Model.SetRecieveMsgData(_data.data);
    //       Constant.game.events.emit('evtRecieveMessage');
    //     } else {
    //       Constant.game.events.emit('evtShowAlert', _data.message);
    //     }
    //   });
    // }
    // //#endregion

    // async GetChatHistory() {
    //   const data = {
    //     'page': 3,
    //     'limit': 10
    //   };
    //   // eslint-disable-next-line no-console
    //   console.log('send-message !', data);
    //   this.socket.emit('get-chat-history', data);
    // }

    // //#region ChatHistory
    // async ChatHistory() {
    //   this.socket.on('chat-history', async (_data) => {
    //     // eslint-disable-next-line no-console
    //     console.log('chat-history !', _data);
    //     // if (!_data.error) {
    //     //   Model.SetRecieveMsgData(_data.data);
    //     //   Constant.game.events.emit('evtRecieveMessage');
    //     // } else {
    //     //   Constant.game.events.emit('evtShowAlert', _data.message);
    //     // }
    //   });
    // }
    // //#endregion

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
                Model.SetGameStateData(_data.data);
                Constant.game.events.emit('evtGameStateData');
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
        });
    };
    //#endregion

    //#region - SpectatorPreflop
    async SpectatorPreFlop() {
        this.socket.on('spectator-pre-flop', async (_data) => {
            // eslint-disable-next-line no-console
            console.log('spectator-pre-flop !', _data);
            if (!_data.error) {
                Model.SetGameStateData(_data.data);
                Constant.game.events.emit('evtSpectatorPreFlop');
            } else {
                Constant.game.events.emit('evtShowAlert', _data.message);
            }
        });
    }
    //#endregion

};
const client = new Client();
export { client as Client };