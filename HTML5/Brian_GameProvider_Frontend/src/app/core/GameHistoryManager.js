/********* Script_Details ************
 * @Original_Creator :- Faiz_Ahmad.
 * @Created_Date :- 27-09-2022.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 11-05-2022
 * @Description :- Handles Game history.
 ************************************/

//#region - importing required scripts 
import moment, { Moment } from "moment/moment.js";
import { Constant } from "../components/Constant.js";
import { Utils } from "../components/Utils.js";
import { Server } from "../services/Server.js";
import { Loader } from "../components/Loader.js";
import { Popup } from "../components/Popup.js";
import { GameManager } from "./GameManager.js";
//#endregion

//#region - Class defination
export default class GameHistoryManager {
    /**
    * initializes variables.
    * @Constructor
    */
    constructor() {
        this.InitializeGameHistory();

    };

    /**
    * Add initial game history with 24 hours data.
    * @returns {null} 
    */
    async InitializeGameHistory() {
        this.InitializeSelect2Dropdown();
        let prev = moment.utc().subtract(1, "days").format('YYYYMMDDHHmmss');
        let curr = moment.utc().format('YYYYMMDDHHmmss');
        let responseData = await Server.GetGame24HoursEventData(prev, curr, Constant.gameType, Constant.sessionId);
        if (responseData.error == false) {
            responseData.data.Events.RaceEvent.forEach(element => {
                if (element.attributes.EventStatus !== "InProgress") {
                    let date = element.attributes.EventTime;
                    date = date.split("T");
                    let time = date[1];
                    time = time.split(":");
                    time = Utils.ConvertUtcTimeToLocal(time[0], time[1], time[2]);

                    let result = element.attributes.Result;
                    if (!Utils.IsEmpty(result)) {
                        result = result.split(",");
                        if (result.length > 6) {
                            this.AddValueToGameHistoryField(element.attributes.ID, element.attributes.EventNumber, result[0], result[1], result[2], result[3], result[4], result[5], result[6], result[7], date[0], time);
                        } else {
                            this.AddValueToGameHistoryField(element.attributes.ID, element.attributes.EventNumber, result[0], result[1], result[2], result[3], result[4], result[5], "-", "-", date[0], time);
                        }
                    }
                }
            });
            Loader.HideLoader();
        } else {
            Popup.ShowErrorPopup(responseData.message);
        }
        await this.GetAllEventNumberList();
    };

    /**
    * Add 24 hours data value to dom element.
    * @param {string} _raceNumber - race number
    * @param {string} _1st -  1st position
    * @param {string} _2nd - 2nd position
    * @param {string} _3rd - 3rd position
    * @param {string} _4th - 4th position
    * @param {string} _5th - 5th position
    * @param {string} _6th - 6th position
    * @param {string} _7th - 7th position
    * @param {string} _8th - 8th position
    * @param {string} _date - date
    * @param {string} _time - time
    * @returns {null} 
    */
    AddValueToGameHistoryField(_raceNumber, _eventNumber, _1st, _2nd, _3rd, _4th, _5th, _6th, _7th, _8th, _date, _time) {
        document.querySelector("#GameHistory").insertAdjacentHTML('afterbegin',
            '<tr id= "' + _raceNumber + '">' +
            '<td>' + _eventNumber + '</td>' +
            '<td>' + _1st + '</td>' +
            '<td>' + _2nd + '</td>' +
            '<td>' + _3rd + '</td>' +
            '<td>' + _4th + '</td>' +
            '<td>' + _5th + '</td>' +
            '<td>' + _6th + '</td>' +
            '<td>' + _7th + '</td>' +
            '<td>' + _8th + '</td>' +
            '<td>' + _date + '</td>' +
            '<td>' + _time + '</td>' +
            '</tr>'
        );
        document.getElementById(_raceNumber).addEventListener('click', () => this.GetEventNumber(_raceNumber, _eventNumber, _time));
    };
    // async GetEventNumber(_raceNumber, _eventNumber) {
    async GetEventNumber(_raceNumber, _eventNumber, _time) {
        Loader.ShowLoader();
        GameManager.modalOddsManager.GetSpecificResultDataForModal(_raceNumber);
        GameManager.modalOddsManager.SetEventNumberOfModalOddsSection(_eventNumber);
        GameManager.modalOddsManager.SetRaceStartTimeOfModalOddsSection(_time);
    };

    /**
    * Get all the event number from api.
    * @returns {null} 
    */
    async GetAllEventNumberList() {
        let response = await Server.GetSessionEventNumberList(Constant.sessionId, Constant.gameId);
        let dataArray = [];
        if (response.error == false) {
            try {
                if (response.data.length > 0) {
                    response.data.forEach(element => {
                        dataArray.push({ id: element.event_id, startTime: element.bet_start_time, endTime: element.race_end_time, raceNumber: element.race_number });
                    });
                    this.AddValueToBetSlipPurchaseHistoryField(dataArray);
                    this.AddAllCommonOddsRaceNumberToDropdown(dataArray);
                }
            } catch { }
        } else {
            Popup.ShowErrorPopup(response.message);
        }
    };

    /**
* Add value to purchase history when search.
* @param {Array} _dataArray - response data
* @returns {null} 
*/
    AddValueToBetSlipPurchaseHistoryField(_dataArray) {
        let DropDownobj = document.getElementById("event_number_input");
        for (let i = DropDownobj.options.length - 1; i > 0; i--) {
            DropDownobj.removeChild(DropDownobj.options[i]);
        }
        _dataArray.forEach(element => {
            let option = document.createElement("option");
            option.text = element.raceNumber + "   (" + element.startTime + " - " + element.endTime + ")";
            option.value = element.id;
            DropDownobj.add(option);
        })
    };

    AddAllCommonOddsRaceNumberToDropdown(_dataArray) {
        let winDropDownobj = document.getElementById("all_common_odd_all_race_number");
        for (let i = winDropDownobj.options.length - 1; i > 0; i--) {
            winDropDownobj.removeChild(winDropDownobj.options[i]);
        }
        _dataArray.forEach(element => {
            let option = document.createElement("option");
            option.text = element.raceNumber;
            option.value = element.id;
            winDropDownobj.add(option);
        })
    };

    InitializeSelect2Dropdown() {
        $(document).ready(function () {
            $('.select_dropsec').select2();

        });
    };

    /**
    * Add new element in game history when update
    * @public 
    * @param {object} element - data object in game history.
    * @returns {null} 
    */
    UpdateGameHistory(element) {
        let responseData = element.Event.RaceEvent;
        let date = responseData.attributes.EventTime;
        date = date.split("T");
        let time = date[1];
        time = time.split(":");
        time = Utils.ConvertUtcTimeToLocal(time[0], time[1], time[2]);
        let result = responseData.attributes.Result;
        result = result.split(",");
        if (result.length > 6) {
            this.AddValueToGameHistoryField(responseData.attributes.ID, responseData.attributes.EventNumber, result[0], result[1], result[2], result[3], result[4], result[5], result[6], result[7], date[0], time);
        } else {
            this.AddValueToGameHistoryField(responseData.attributes.ID, responseData.attributes.EventNumber, result[0], result[1], result[2], result[3], result[4], result[5], "-", "-", date[0], time);
        }

        let stTime = responseData.attributes.EventTime;
        stTime = stTime.split("T");
        let stTimeSplit = stTime[1];
        stTimeSplit = stTimeSplit.split(":");
        let startTime = Utils.ConvertUtcTimeToLocal(stTimeSplit[0], stTimeSplit[1], stTimeSplit[2]);

        let edTime = responseData.attributes.FinishTime;
        edTime = edTime.split("T");
        let edTimeSplit = edTime[1];
        edTimeSplit = edTimeSplit.split(":");
        let endTime = Utils.ConvertUtcTimeToLocal(edTimeSplit[0], edTimeSplit[1], edTimeSplit[2]);
    };
}
//#endregion