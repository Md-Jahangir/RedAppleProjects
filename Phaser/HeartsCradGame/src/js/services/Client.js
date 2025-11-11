import io from 'socket.io-client';
import { Model } from "../Model";
import { Constant } from '../Constant.js';

// Connection to a broadcast channel
class Client {
    constructor() {
        this.GetValueFromServer();
        this.SetValueFromQueryParameter();

        // this.baseUrl = "http://3.129.109.248:4008/pokerCoreEngine";
        // this.baseUrl = "http://44.207.196.95:5002/pokerCoreEngineTexas";
        // this.baseUrl = "http://localhost:5002/pokerCoreEngineTexas";
        this.baseUrl = "https://staginglocal.redappletech.com/heartsCoreEngine";
        // this.baseUrl = "http://192.168.1.25:5008/pokerCoreEngineTexas";//stagging local machine
        // this.gameId = null;
        this.userId = null;
        this.isAutoMuck = null;
        this.isSitIn = null;


        this.socket = io(this.baseUrl, {
            path: "/hearts-engine-socket/socket.io"
            // query: {
            //     token: this.token
            // }
        });
        this.InitSocketListeners();


    };

    async GetValueFromServer() {
        this.urlParams = new URLSearchParams(window.location.search);
        this.authToken = this.urlParams.get("authToken");
    };
    async SetValueFromQueryParameter() {
        Model.SetAuthToken(this.authToken);
    };

    //############################### ON EVENT #######################################
    async InitSocketListeners() {
        let ref = this;
        this.socket.on('connect', () => {
            console.log('Socket successfully connected!');
            // this.SetConnection();
        });


        this.socket.on('disconnect', () => {
            console.log('Disconnected!');
        });

        // this.socket.on('reconnect', () => {
        //     console.log('The reconnect occurred!');
        // });

        this.socket.on('reconnecting', () => {
            console.log('reconnecting !');
        });

        this.SocketEventsListener();

        await this.VerifyUser();
        await this.RoomDetails();

    };
    SocketEventsListener() {
        this.socket.on('leave-room-res', (event) => {
            console.log(' User Room Left', event);
        })
    }

    //##################################################################################
    //#region - All Emit Events 

    async SetConnection() {
        let data = {
            "authToken": Model.GetAuthToken()
        }
        this.socket.emit('set-connection', data);
    }

    async JoinRoom() {
        let data = {
            "authToken": Model.GetAuthToken(),
            "room_id": "jXFFaYBHj"
        }
        this.socket.emit('join-room', (data));
    }
    async LeaveRoom() {
        let data = {
            "authToken": Model.GetAuthToken()
        }
        this.socket.emit('leave-room', data);
    }



    //#endregion
    //##################################################################################

    //##################################################################################
    //#region - All Listen Events 
    async VerifyUser() {
        this.socket.on('verify-user', async (_data) => {
            console.log('verify user', _data);
            if (!_data.error) {
                Model.SetLocalPlayerId(_data.data.user_id);
                await this.JoinRoom();
                // await this.LeaveRoom();

            }
        })
    }

    async RoomDetails() {
        this.socket.on('room-details', (event) => {
            console.log(event);
        })
    }


    //##################################################################################

};

let client = new Client();

export { client as Client };