/* global window,URLSearchParams,fetch,Headers,console */
/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 04-11-2024.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 04-11-2024
 * @Description :- This class used for any interactions between client and server with Rest API.
 ************************************/

import { Model } from '../Model.js';

//#region - Class defination 
class Server {
  /**
     * Create class instance and fill params from URL or fill it with default values if URL not contain needed data.
     * @constructs
    */
  constructor() {
    //================Platform API URL================================
    this.urlParams = new URLSearchParams(window.location.search);

    this.baseUrl = 'https://staginglocal.redappletech.com/poker-auth-service/api/v1/';
    this.buyInApiUrl = 'update-balance';
    this.updateUserBalanceApiUrl = 'get-updated-balance';
  };

  //##########################################################################
  //#region PLATFORM API'S-------------------------

  //#region - Get Data
  /**
     * Requests data from server, and call handler function after responce was received. URL contain only
     * needed data - action name and it's params. Static parts or URL stored in class instance.
     * @public
     * @param {string} url - string with action name and params.
     * @param {function} callback - function that will be called with responce as param.
     * @returns {object} response in json format.
    **
    ****/
  async GetData(url, options) {
    try {
      const response = await (await fetch(url, options)).json();

      switch (true) {
        case (response.status === 404):
          throw new Error(response.message);
        case (response.status === 401):
          throw new Error(response.message);
        case (response.status === 400):
          throw new Error(response.message);
        case (response.status === 406):
          throw new Error(response.message);
        case (response.error):
          throw new Error(response.message);
        default:
          return response;
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };

  async PlaceBuyInApi(_tableId, _amount) {
    try {
      const reqHeaders = new Headers();
      reqHeaders.append('Content-Type', 'application/json');
      reqHeaders.append('token', Model.GetAuthToken());
      const option = {
        'table_id': _tableId,
        'amount': _amount,
      };
      const url = this.baseUrl + this.buyInApiUrl;
      const requestOptions = {
        method: 'POST',
        headers: reqHeaders,
        body: JSON.stringify(option)
      };
      return (await this.GetData(url, requestOptions));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('PlaceBuyInApi error: ', err);
    }
  };

  async UpdateUserBalance() {
    try {
      const reqHeaders = new Headers();
      reqHeaders.append('Content-Type', 'application/json');
      reqHeaders.append('token', Model.GetAuthToken());
      const url = this.baseUrl + this.updateUserBalanceApiUrl;
      const requestOptions = {
        method: 'GET',
        headers: reqHeaders,
      };
      return (await this.GetData(url, requestOptions));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('updateUserBalanceApiUrl error: ', err);
    }
  };

  IsParamsMissing() {
    return false;
  };


};
//#endregion
const server = new Server();

export { server as Server };