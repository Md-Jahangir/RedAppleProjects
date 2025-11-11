
/**
 * This class used for any interactions between client and server. 
 */
class Server {
    /**
     * Create class instance and fill params from URL or fill it with default values if URL not contain needed data.
     * @constructs
     */
    constructor() {
      this.urlParams = new URLSearchParams(window.location.search);
      this.token = this.urlParams.get("token");
        this.baseUrl = "http://staging.redappletech.com:3001/api/v1/"
        // console.log(this.token)
        // this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiNjA0MDBiLWUwODMtNGUzOS05NmE1LTFjMjEwMTZhOGYxMSIsImVtYWlsIjoidHVsdUB5b3BtYWlsLmNvbSIsImlhdCI6MTY5MTQwMTg1OX0.g7GyTTtxT6Pzrud_raHYPVyJBrN1nFhUrLzPVCfLlD8';//this.urlParams.get('token');


    };

    IsUrlParamsMissing() {
        if (!this.timerValue) {
            return true;
        }
        return false;
    };
    async GetData(url, options) {
        console.log('Getdata', url)
        try {
          let response = await fetch(url, options);
          console.log("response", response);
          return response.json();
        } catch (err) {
          console.log("Error log: ", err);
        }
      };
      async GetPrevious10BetData() {
        let reqHeaders = new Headers();
        reqHeaders.append("Content-Type", "application/json");
        reqHeaders.append("token", this.token); 
        // let url = this.baseUrl + "lesson/" + "525";
        this.previousBetDataApi = 'previous_10_bet_draw';
        let url = this.baseUrl + this.previousBetDataApi ;
        let requestOptions = {
          method: 'GET',
          // body: JSON.stringify(),
          headers: reqHeaders,
        };
        // console.log("GetLessondata requestOptions",requestOptions);
        return (await this.GetData(url, requestOptions));
      }
      // async GetDateAndTimeData() {
      //   let reqHeaders = new Headers();
      //   reqHeaders.append("Content-Type", "application/json");
      //   // let url = this.baseUrl + "lesson/" + "525";
      //   this.dateAndTimeApi = 'get_date_and_time';
      //   let url = this.baseUrl + this.dateAndTimeApi ;
      //   let requestOptions = {
      //     method: 'GET',
      //     // body: JSON.stringify(),
      //     headers: reqHeaders,
      //   };
      //   // console.log("GetLessondata requestOptions",requestOptions);
      //   return (await this.GetData(url, requestOptions));
      // }
      async GetPreviousDrawData() {
        let reqHeaders = new Headers();
        reqHeaders.append("Content-Type", "application/json");
        reqHeaders.append("token",this.token); 
        this.previousDrawApi = 'previous_draw';
        let url = this.baseUrl + this.previousDrawApi ;
        let requestOptions = {
          method: 'GET',
          headers: reqHeaders,
        };
        return (await this.GetData(url, requestOptions));
      }
     
      async GetHotAndColdData() {
        let reqHeaders = new Headers();
        reqHeaders.append("Content-Type", "application/json");
        reqHeaders.append("token", this.token); 
        // let url = this.baseUrl + "lesson/" + "525";
        this.hotAndColdApi = 'hot_and_cold';
        let url = this.baseUrl + this.hotAndColdApi ;
        let requestOptions = {
          method: 'GET',
          // body: JSON.stringify(),
          headers: reqHeaders,
        };
        // console.log("GetLessondata requestOptions",requestOptions);
        return (await this.GetData(url, requestOptions));
      }
   
      async GetPayoutData() {
        let reqHeaders = new Headers();
        reqHeaders.append("Content-Type", "application/json");
        reqHeaders.append("token", this.token); 
        // let url = this.baseUrl + "lesson/" + "525";
        this.payOutDataApi = 'payout_table';
        let url = this.baseUrl + this.payOutDataApi ;
        let requestOptions = {
          method: 'POST',
          // body: JSON.stringify(),
          headers: reqHeaders,
        };
        // console.log("GetLessondata requestOptions",requestOptions);
        return (await this.GetData(url, requestOptions));
      }

      async TokenAuthentication(_server) {
        // _server.token = "Bearer " + _server.token;
        // console.log("Server.token"+_server.token);
        let reqHeaders = new Headers();
        reqHeaders.append("Content-Type", "application/json");
        // reqHeaders.append("Authorization", this.token);
        let url = _server.authUrl;
        let requestOptions = {
            method: 'POST',
            headers: reqHeaders
        };
        return (await this.getData(url, requestOptions));
    }

   



};

let server = new Server();

export { server as Server };