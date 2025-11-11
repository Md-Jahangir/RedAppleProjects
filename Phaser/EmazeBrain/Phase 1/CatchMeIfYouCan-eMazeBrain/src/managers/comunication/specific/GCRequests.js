import URLParser from "@/managers/comunication/URLParser";
import { Signals } from "@/Imports";
import Facade from "@/Facade";

export default class GCRequests {

  constructor () {
    this.URLParser = new URLParser()
    this.adress = 'https://api.emazebrain.com/game_response/';

    this.urlParams = new URLSearchParams(window.location.search);
    this.token = "Bearer " + this.urlParams.get("t");
    this.isStandAlone = this.urlParams.get("standAlone");
    this.serverAddress = "https://api.emazebrain.com/api/v1/gamedata";
    this.serverPostAddress = "https://api.emazebrain.com/api/v1/responsedata/";
    this.imageUrl = "https://api.emazebrain.com/api/v1/imagedata/";
    this.authUrl = "https://api.emazebrain.com/api/v1/game/auth";
    this.standAloneUrl = "https://api.emazebrain.com/api/v1/staticGames/getData";
    this.init()
  }

  init() {
    console.log('API INIT');
    this.gameXHR = new XMLHttpRequest();
    this.gameXHR.addEventListener('error', this.onError.bind(this));
    this.gameXHR.addEventListener('load', this.onGameLoad.bind(this));
  }

  getInit(data) {
    let requestData = {};

    this.lastAction = 'init';
    this.sendMessage(requestData, 'authenticate');
  }
  
  onSendAPI(infoAPI) {
    this.sendMessage(infoAPI, '?id:<ID>&UID:<UID>');
  }

  sendMessage(data, action) {
    // this.gameXHR.open('POST', this.adress + action, true);
    this.gameXHR.open('POST', this.adress , true);
    this.gameXHR.setRequestHeader('Content-Type', 'application/json');
    this.gameXHR.setRequestHeader('Access-Control-Allow-Origin', '*');
    this.gameXHR.send(JSON.stringify(data));

    console.log('req', JSON.stringify(data));
  }
  async sendGameData(_data) 
  {
      let reqHeaders = new Headers();
      reqHeaders.append("Content-Type", "application/json");
      reqHeaders.append("Authorization",this.token);
      let url = this.serverPostAddress;
      let option = _data;
      
      let requestOptions = {
          method: 'POST',
          body: JSON.stringify(option),
          headers: reqHeaders,
      };
      return (await this.getData(url, requestOptions));
  }
  async TokenAuthentication() 
  {
    console.log("TokenAuthentication---------------------",this);
    let reqHeaders = new Headers();
    reqHeaders.append("Content-Type", "application/json");
    reqHeaders.append("Authorization",this.token);
    let url = this.authUrl;
    let requestOptions = {
        method: 'POST',
        headers: reqHeaders
    };
    return (await this.getData(url, requestOptions));
  }
  async getGameData() 
  {   
    console.log("getGameData---------------------",this);
    let reqHeaders = new Headers();
    reqHeaders.append("Content-Type", "application/json");
    reqHeaders.append("Authorization",this.token);    
    let url = this.standAloneUrl;
    let option = {
        "game_id": "7"//gameId.toString()
    };    
    let requestOptions = {
        method: 'POST',
        headers: reqHeaders,
        body : JSON.stringify(option)
    };
    return (await this.getData(url, requestOptions));
  }
  async getImageData(_bg,_main) 
  {
    // console.log("server",_server);
    let reqHeaders = new Headers();
    reqHeaders.append("Content-Type", "application/json");
    reqHeaders.append("Authorization",this.token);
    let url = this.imageUrl;
    let option = {
        bg_images_cdn_location: _bg,
        main_images_cdn_location: _main
    };
    let requestOptions = {
        method: 'POST',
        headers: reqHeaders,
        body : JSON.stringify(option)
    };
    return (await this.getData(url, requestOptions));
  }
  async getData(url, options) 
  {        
    try 
    {
      let response = await fetch(url, options);
      return response.json();
    } 
    catch (err) 
    {
      console.log("Error log: ", err);
    }
  };

  onError(event) {
    Signals.errorConnection.dispatch();
    console.log('ERROR', event);
  }

  onGameLoad(event) {
    let data = JSON.parse(event.target.response);
    if (data.hasOwnProperty('error')) {
      Signals.sessionTimeout.dispatch()
      console.log('SERVER ERROR: ',data.message)

      return;
    }
    console.log('SERVER RESPONSE: ',data);

    if(data.status && data.status == 911) {
      Facade.status = 911
      Signals.realityCheck.dispatch(data)
      return
    }
    switch (this.lastAction) {
      case 'init':
        this.onInitLoad(data);
        break;
    }
  }

  onInitLoad(data) {
    this.sessionToken = data.session_token;
    console.log("on init load");
    Signals.backendMessage.dispatch({action: "init", data: data})
  }

}