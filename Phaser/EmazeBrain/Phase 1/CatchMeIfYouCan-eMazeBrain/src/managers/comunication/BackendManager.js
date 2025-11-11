import BaseManager from "@base/manager/BaseManager";
import {Requests,  Signals} from "@/Imports";
import Facade from "@/Facade";

export default class BackendManager extends BaseManager {

  constructor () {
    super()

    // Game listenter
    Signals.gameMessage.add(this.onGameMessage, this)

    // Backend listener
    Signals.backendMessage.add(this.onBackendessage, this)

    // onSendAPI
    Signals.sendAPI.add(this.onSendAPI, this)

    // tokenAuthAPI
     Signals.tokenAuthAPI.add(this.CheckAuthentication, this)

    // gameDataAPI
    Signals.gameDataAPI.add(this.onDataRecieved, this)

    // imageDataAPI
     Signals.imageDataAPI.add(this.onImageDataRecieved, this)

    this.requests = new Requests()
  }

  onSendAPI(infoAPI) {
    // this.requests.onSendAPI(infoAPI)
    this.requests.sendGameData(infoAPI)
  }

  onGameMessage(message) {
    switch (message) {
      case 'init':
        console.log('onGameMessage init', this.requests.URLParser.data);
        this.requests.getInit(this.requests.URLParser.data)
        break
    }
  }
  async onDataRecieved()
  {
    let data =  await this.requests.getGameData();
    console.log("onDataRecieved---------------------",data);
      if(data.error == 0)
      {
        window.GameConfigPOST = data.data;
        console.log(Signals.allDataReceived);
        Signals.allDataReceived.dispatch();
      //     console.log("data:",data.data);
      //     if(this.CheckJsonData(data.data))
      //     {
      //         localStorage.setItem("moreislessjsonData",JSON.stringify(data.data));  
      //         Database.ParseAndStore(data.data);
              // this.onImageDataRecieved(data.data);
      //     }
      //     else
      //     {
      //         window.alert("Invalid JSON");
      //         return false;
      //     }
      }
      else
      {
          window.alert("Invalid JSON");
          return false;
      }
  }
  async onImageDataRecieved(_data)
  {
    let data = await this.requests.getImageData(_data.general.bg_images_cdn_location,_data.general.main_images_cdn_location);
    console.log("onImageDataRecieved ----------------------------",data);
      // console.log("data:==",data);
      // let bgImages = data.data.bg_images;
      // let mainImages = data.data.main_images;
      // console.log("bgImages:==",bgImages);
      // console.log("mainImages:==",mainImages);
      // if(data.error == 0 && (bgImages.length !== 0) && (mainImages.length !== 0))
      // {
      //     this.ImageData(data);
      //     this.SceneTransit();
      // }
      // else
      // {
      //     window.alert("Invalid JSON");
      //     return false;
      // }
  }
  async CheckAuthentication()
  {
    let data  = await this.backendManager.requests.TokenAuthentication();
    console.log("CheckAuthentication---------------------",data);
    console.log("data:==",data);
    if(data.error == 0)
    {
        localStorage.setItem("userid",data.data.user_id);
        this.backendManager.onDataRecieved();
    }
    else
    {
        window.alert("Invalid JSON");
        return false;
    }
  }
  onBackendessage(message) {
    switch (message.action) {
      case 'init':
        Signals.initGame.dispatch(message)
        break

      case 'spin':
        Signals.spinResponse.dispatch(message)
        break

    }
  }

}