/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 15_03_2023.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 12_05_2023
 * @Description :- Handles all odds value.
 ************************************/

import { Constant } from "../components/Constant.js";
import { Localization } from "../components/Localization.js";
import { Popup } from "../components/Popup.js";
import { Utils } from "../components/Utils.js";
import { Server } from "../services/Server.js";
import { GameManager } from "./GameManager.js";

//#endregion

let GetTheHiLoOddEvenData = (arr0) => {
    let Original_length = arr0.length;
    // Utility Functions for null checking && Creating Columns
    let trim = (x) => {
        let value = String(x)
        return value.replace(/^\s+|\s+$/gm, '')
    }
    let isEmpty = (value) => {
        if (value === null || value === undefined || trim(value) === '' || value.length === 0) {
            return true
        } else {
            return false
        }
    }
    let createColumn = () => {
        let array = new Array(6);
        return array.fill('');
    }
    let createSurplusArr = (finalArr) => {
        let surplus = [];
        for (let [idx, column] of finalArr.entries()) {
            if (column.length > 6) {
                let leftnumber = (column.length - 5)
                let extras = column.slice(1, leftnumber);
                let col = column.slice(leftnumber - 1, column.length)
                // let extras = column.slice(6,column.length);
                // let col = column.slice(0,6);
                if (!isEmpty(extras[0])) {
                    let extraObjMap = {
                        idx: idx,
                        value: extras,
                        col: col
                    }
                    surplus.push(extraObjMap);
                }
            }
        }
        return surplus;
    }

    // Grouping data based on continuity
    let grouped = [];
    let groupData = (arr) => {
        // let current_col_type = arr[0];
        let current_col_type = arr[0].winingType;
        let temp = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].winingType == current_col_type) {
                temp.push(arr[i]);
            } else {
                current_col_type = arr[i].winingType;
                break;
            }
        }

        for (let i = 0; i < temp.length; i++) {
            arr.shift();
        }

        grouped.push(temp);
        if (arr.length > 0) {
            groupData(arr);
        }
        return grouped;
    }
    groupData(arr0);

    let findLastContiguousOccurence = (arr) => {
        let current_col_type;
        let lastIdx = 0;
        if (!isEmpty(arr)) {
            // current_col_type = arr[0];
            current_col_type = arr[0].winingType;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].winingType == current_col_type) {
                    lastIdx = i;
                } else {
                    break;
                }
            }
        }
        return lastIdx;
    }

    // Display Matrix Generation Start
    let current_column = createColumn();
    let current_col_type;
    let finalArr = [];

    for (let i = 0; i < grouped.length; i++) {
        let current_str = grouped[i];
        current_col_type = current_str[0].winingType;
        if (current_column.includes('')) {
            let count = 0;
            for (let j = 0; j < current_str.length; j++) {
                if (count == 6) {
                    current_column.push(current_str[j])
                } else {
                    current_column[j] = current_str[j];
                    count++;
                }
            }
        }
        finalArr.push(current_column);
        current_column = createColumn();
    }

    // Display Matrix Generation End

    let surplus = createSurplusArr(finalArr);
    let adjust = (_surplus, _finalArr) => {

        for (let [index, obj] of _surplus.entries()) {
            _finalArr[obj.idx] = _finalArr[obj.idx].slice(_finalArr[obj.idx].length - 6, _finalArr[obj.idx].length);
            for (let [i, colObj] of obj['value'].entries()) {
                let lidx = findLastContiguousOccurence(_finalArr[obj.idx]);
                let hotfixArr = _finalArr[obj.idx + i + 1];
                if (isEmpty(hotfixArr)) {
                    _finalArr[obj.idx + i + 1] = createColumn()
                }
                let lidx0 = findLastContiguousOccurence(_finalArr[obj.idx + i + 1]);
                let offset = lidx0 - lidx;
                if (offset > 0) {
                    let extraElem = [];
                    for (let j = 0; j <= offset; j++) {
                        _finalArr[obj.idx + i + 1].splice(lidx0 + 1, 0, '');
                        extraElem.push(_finalArr[obj.idx + i + 1].shift());
                    }
                    _finalArr[obj.idx + i + 1].splice(lidx, 1, colObj);
                    /** Insert New Column */
                    let newColumn = createColumn();
                    for (let m = 0; m < extraElem.length; m++) {
                        newColumn.splice(m, 1, extraElem[m]);
                    }
                    _finalArr.splice((obj.idx + i + 2), 0, newColumn);
                    /** */
                } else {
                    let tailArr = _finalArr[obj.idx + i + 1].slice(lidx + 1).join('');
                    if (isEmpty(tailArr)) {
                        _finalArr[obj.idx + i + 1].splice(lidx + 1, 0, colObj);
                    } else {
                        _finalArr[obj.idx + i + 1].splice(lidx + 1, 1, colObj);
                    }
                }

            }
        }
        surplus = createSurplusArr(_finalArr)
        return _finalArr;
    }


    while (surplus.length > 0) {
        finalArr = adjust(surplus, finalArr);
    }

    let current_column_type = finalArr[0][0].winingType;

    for (let a = 1; a < finalArr.length; a++) {
        if (finalArr[a][0].winingType == current_column_type) {
            let newCol = createColumn();
            finalArr.splice(a, 0, newCol)
        } else if (isEmpty(finalArr[a][0])) {
            finalArr[a].shift();
            continue;
        }

        current_column_type = finalArr[a][0].winingType;

    }
    return finalArr;
}

//#region - Class defination 
export default class OddsManager {
    /**
    * initializes variables.
    * @Constructor
    */
    constructor() {
        this.singleOdds = [];
        this.placeOrShowOdds = [];
        this.hiloOdds = [];
        this.oddevenOdds = [];
        this.swingerOdds = [];
        this.quinellaOdds = [];
        this.exactaOdds = [];
        this.trifectaOdds = [];
        this.prevSelectedTrifectaOdds = 0;
        this.selectedTrifectaOdds = 1;
        this.trioOdds = [];
        this.prevSelectedTrioOdds = 0;
        this.selectedTrioOdds = 1;
        this.highLowWinnerArray = [];
        this.oddEvenArray = [];
    };

    /**
    * Get all the single odds data from server 
    * @param {string} _eventId - event id
    * @returns {null} 
    **/
    async GetSingleOddsData(_eventId) {
        let response = await Server.GetRaceEventSingleOdds(_eventId, Constant.sessionId);
        if (response.error == false) {
            await this.UpdateSingleOddsValue(response.data);
        } else {
            await Popup.ShowErrorPopup(response.message);
        }
    }

    /**
    * Add the single odds data to bet config array for single odds 
    * @param {string} _data - odds data value
    * @returns {null} 
    **/
    async UpdateSingleOddsValue(_data) {
        for (const [key, value] of Object.entries(_data)) {
            for (let i = 0; i < GameManager.betManager.betConfigArray.length; i++) {
                let betConfigObj = GameManager.betManager.betConfigArray[i];
                if (key == "place") {
                    if (betConfigObj.bet_name.toLowerCase() == "place" || betConfigObj.bet_name.toLowerCase() == "show") {
                        betConfigObj.odds = [];
                        if (betConfigObj) {
                            for (let j = 0; j < value.Selection.length; j++) {
                                let tempObj = { ID: value.Selection[j].attributes.ID, Odds: value.Selection[j].attributes.Odds };
                                betConfigObj.odds.push(tempObj);
                            }
                        }
                    }
                } else {
                    if (betConfigObj.bet_name.toLowerCase() === key.toLowerCase()) {
                        betConfigObj.odds = [];
                        if (betConfigObj) {
                            for (let j = 0; j < value.Selection.length; j++) {
                                let tempObj = { ID: value.Selection[j].attributes.ID, Odds: value.Selection[j].attributes.Odds };
                                betConfigObj.odds.push(tempObj);
                            }
                        }
                    }
                }
            }
        }
    };

    /**
    * Get all the combination odds data from server 
    * @param {string} _eventId - event id
    * @returns {null} 
    **/
    async GetCombinationOddsData(_eventId) {
        let response = await Server.GetRaceEventCombinationOdds(_eventId, Constant.sessionId);
        if (response.error == false) {
            await this.UpdateCombinationOddsValue(response.data.RaceEventCombinationOdds);
        } else {
            Popup.ShowErrorPopup(response.message);
        }
    };

    /**
    * Add the combination odds data to bet config array for single odds 
    * @param {string} _data - odds data value
    * @returns {null} 
    **/
    async UpdateCombinationOddsValue(_data) {
        let tempArray = [];
        let respOdds = null;
        let betDetailsObj = null;

        //-----------------------SWINGER ODDS---------------------------------
        respOdds = _data.Swinger._text;
        tempArray = respOdds.split("|");
        betDetailsObj = this.GetBetDetails("SWINGER");
        if (betDetailsObj) {
            betDetailsObj.odds = [];
            for (let i = 0; i < parseInt(tempArray.length); i += 3) {
                let tempObj = { ID: tempArray[i], Odds: tempArray[(i + 1)] }
                betDetailsObj.odds.push(tempObj);
            }
        }
        tempArray = [];
        respOdds = null;
        betDetailsObj = null;

        //-------------------------QUINELLA ODDS(ReverseForecast)--------------  
        respOdds = _data.ReverseForecast._text;
        tempArray = respOdds.split("|");
        betDetailsObj = this.GetBetDetails("QUINELLA");
        if (betDetailsObj) {
            betDetailsObj.odds = [];
            for (let i = 0; i < parseInt(tempArray.length); i += 3) {
                let tempObj = { ID: tempArray[i], Odds: tempArray[(i + 1)] }
                betDetailsObj.odds.push(tempObj);
            }
        }
        tempArray = [];
        respOdds = null;
        betDetailsObj = null;

        //--------------------------EXACTA ODDS(Forecast)-----------------------
        respOdds = _data.Forecast._text;
        tempArray = respOdds.split("|");
        betDetailsObj = this.GetBetDetails("EXACTA");
        if (betDetailsObj) {
            betDetailsObj.odds = [];
            for (let i = 0; i < parseInt(tempArray.length); i += 3) {
                let tempObj = { ID: tempArray[i], Odds: tempArray[(i + 1)] }
                betDetailsObj.odds.push(tempObj);
            }
        }
        tempArray = [];
        respOdds = null;
        betDetailsObj = null;

        //----------TRIO ODDS(ReverseTricast)-------------------------------------
        respOdds = _data.ReverseTricast._text;
        tempArray = respOdds.split("|");
        betDetailsObj = this.GetBetDetails("TRIO");
        if (betDetailsObj) {
            betDetailsObj.odds = [];
            for (let i = 0; i < parseInt(tempArray.length); i += 3) {
                let tempObj = { ID: tempArray[i], Odds: tempArray[(i + 1)] }
                betDetailsObj.odds.push(tempObj);
            }
        }
        tempArray = [];
        respOdds = null;
        betDetailsObj = null;

        //---------------------------TRIFECTA ODDS(Tricast)----------------------
        respOdds = _data.Tricast._text;
        tempArray = respOdds.split("|");
        betDetailsObj = this.GetBetDetails("TRIFECTA");
        if (betDetailsObj) {
            betDetailsObj.odds = [];
            for (let i = 0; i < parseInt(tempArray.length); i += 3) {
                let tempObj = { ID: tempArray[i], Odds: tempArray[(i + 1)] }
                betDetailsObj.odds.push(tempObj);
            }
        }
        tempArray = [];
        respOdds = null;
        betDetailsObj = null;
    };

    /**
    * Handle the matched with bet id
    * @param {string} _betId - bet id
    * @returns {object}  bet configuration object
    **/
    GetBetDetails(_betId) {
        for (let i = 0; i < GameManager.betManager.betConfigArray.length; i++) {
            let betConfigObj = GameManager.betManager.betConfigArray[i];
            if (betConfigObj.bet_name.toLowerCase() === _betId.toLowerCase()) {
                return betConfigObj;
            }
        }
        return null;
    };

    /**
    * Set the event number as per bet type in dom element
    * @param {string} _evtNum - event number
    * @returns {null}  
    **/
    SetEventNumberOfOddsSection(_evtNum) {
        document.getElementById("single_evt_num").innerText = _evtNum;
        document.getElementById("place_show_evt_num").innerText = _evtNum;
        document.getElementById("swinger_evt_num").innerText = _evtNum;
        document.getElementById("quinella_evt_num").innerText = _evtNum;
        document.getElementById("exacta_evt_num").innerText = _evtNum;
        document.getElementById("trio_evt_num").innerText = _evtNum;
        document.getElementById("terifecta_evt_num").innerText = _evtNum;
    };

    SetRaceStartTimeOfOddsSection(_time) {
        document.getElementById("win_odd_race_start_time").innerText = _time;
        document.getElementById("showplace_odd_race_start_time").innerText = _time;
        document.getElementById("swinger_odd_race_start_time").innerText = _time;
        document.getElementById("quinella_odd_race_start_time").innerText = _time;
        document.getElementById("exacta_odd_race_start_time").innerText = _time;
        document.getElementById("trio_odd_race_start_time").innerText = _time;
        document.getElementById("terifecta_odd_race_start_time").innerText = _time;
    };

    SetBetTypeOfOddsSection(_betName) {
        let winSeqObj = document.getElementById("all_common_odd_bet_name").innerText = _betName;
    };

    SetWinningSequenceOfOddsSection(_seq) {
        let winSeqObj = document.getElementById("all_common_odd_winning_sequence").innerText = _seq;
    };

    /**
    * Get odds data for High low from server 
    * @returns {null} 
    **/
    async GetResultDataForHighLowOdd() {
        let previousData;
        let response = await Server.HowManyPreviousNextEvents(25, Constant.howManyNextData, Constant.sessionId, Constant.gameType);
        if (response.error == false) {
            if (!Utils.IsEmpty(response.data)) {
                previousData = response.data.PreviousAndNextEvents.RaceEvent.filter((elem) => {
                    if (elem.attributes.EventStatus === "Finished") {
                        return elem;
                    }
                });
            }
        }

        let highLowSecquence = [];
        let tempArray = [];
        let result;
        let sortArray = [];
        try {
            for (let i = 0; i < previousData.length; i++) {
                if (previousData[i].attributes.Result) {
                    result = previousData[i].attributes.Result;
                }
                let orgEvt = previousData[i].attributes.EventTime;
                let orgEvtSplit = orgEvt.split(":");
                let evtTime = orgEvtSplit[0] + ":" + orgEvtSplit[1];
                let eventTime = evtTime;
                let resultArr = result.split(",");
                let winner = resultArr[0];
                let count = resultArr.length;
                let winnerType = "";
                if (winner > (count / 2)) {
                    //High
                    winnerType = "HI";
                } else {
                    //Low
                    winnerType = "LO";
                }
                tempArray.push(winnerType);
                let eventNumber = previousData[i].attributes.EventNumber;

                let serverTime = previousData[i].attributes.EventTime;
                serverTime = serverTime.split("T");
                let actualServerTime = serverTime[1].split(":");
                let raceStartTime = Utils.ConvertUtcTimeToLocal(actualServerTime[0], actualServerTime[1], actualServerTime[2]);
                let hiloSeqObj = { "winingType": winnerType, "eventNumber": eventNumber, "raceStartTime": raceStartTime };
                highLowSecquence.push(hiloSeqObj);
            }
            let returnData = GetTheHiLoOddEvenData(highLowSecquence);
            this.SetDataForHighLowOdd(returnData);
        } catch (error) {
        }

    };

    /**
    * Set odds data for High low to dom element
    * @returns {null} 
    **/
    SetDataForHighLowOdd(highLowWinnerArray) {
        let colCell = "";
        let footerCell = "";
        let headerCell = "";
        let rows = highLowWinnerArray[0].length;
        colCell = colCell + "<table>";
        colCell = colCell + "<tr>";
        let startValue = highLowWinnerArray[0][0].winingType;
        let oddColValue = "";
        let evenColValue = "";
        if (startValue == "LO") {
            oddColValue = Localization.betNameHighText;
            evenColValue = Localization.betNameLowText;
        } else {
            oddColValue = Localization.betNameLowText;
            evenColValue = Localization.betNameHighText;
        }
        for (let n = 0; n < highLowWinnerArray.length; n++) {
            if (n % 2 == 0) {
                headerCell = headerCell + "<td>";
                headerCell = headerCell + "<div style='text-align: center;font-weight: 700; width:60px'>";
                headerCell = headerCell + evenColValue;
                headerCell = headerCell + "</div>";
                headerCell = headerCell + "</td>";
            } else {
                headerCell = headerCell + "<td>";
                headerCell = headerCell + "<div style='text-align: center;font-weight: 700; width:60px'>";
                headerCell = headerCell + oddColValue;
                headerCell = headerCell + "</div>";
                headerCell = headerCell + "</td>";
            }
        }
        colCell = colCell + "</tr>";
        for (let i = 0; i < rows; i++) {
            colCell = colCell + "<tr class='box_2nd'>";
            for (let j = 0; j < highLowWinnerArray.length; j++) {
                if (highLowWinnerArray[j][i] == "") {
                    colCell = colCell + "<td>" + "" + "</td>";
                } else {
                    if (highLowWinnerArray[j][i].winingType == "HI") {
                        colCell = colCell + "<td onclick=HiloOddEvenCellClicked('" + highLowWinnerArray[j][i].raceStartTime + "');>";
                        colCell = colCell + "<div class='oddred'>" +
                            highLowWinnerArray[j][i].eventNumber
                        colCell = colCell + "</div>";
                        colCell = colCell + "</td>";
                    } else if (highLowWinnerArray[j][i].winingType == "LO") {
                        colCell = colCell + "<td onclick=HiloOddEvenCellClicked('" + highLowWinnerArray[j][i].raceStartTime + "');>";
                        colCell = colCell + "<div class='oddblue'>" +
                            highLowWinnerArray[j][i].eventNumber
                        colCell = colCell + "</div>";
                        colCell = colCell + "</td>";
                    }
                }
            }
            colCell = colCell + "</tr>";
        }
        footerCell = footerCell + "<tr>";
        for (let k = 0; k < highLowWinnerArray.length; k++) {
            let count = 0;
            for (let n = 0; n < highLowWinnerArray[k].length; n++) {
                if (highLowWinnerArray[k][n] != "") {
                    count++;
                }
            }
            footerCell = footerCell + "<td style='text-align: center;font-weight: 700;'>";
            footerCell = footerCell + count;
            footerCell = footerCell + "</td>";
        }
        footerCell = footerCell + "</tr>";
        colCell = colCell + "</table>";

        let objContainer = document.getElementById("hilocontainer");
        let objFooter = document.getElementById("hilofooter");
        let objHeader = document.getElementById("hiloheader");
        objContainer.innerHTML = colCell;
        objFooter.innerHTML = footerCell;
        objHeader.innerHTML = headerCell;
    };

    /**
    * Get odds data for odd even from server 
    * @returns {null} 
    **/
    async GetResultDataForOddEvenOdd() {
        let previousData;
        let response = await Server.HowManyPreviousNextEvents(25, Constant.howManyNextData, Constant.sessionId, Constant.gameType);
        if (response.error == false) {
            if (!Utils.IsEmpty(response.data)) {
                previousData = response.data.PreviousAndNextEvents.RaceEvent.filter((elem) => {
                    if (elem.attributes.EventStatus === "Finished") {
                        return elem;
                    }
                });
            }
        }
        let oddEvenSequenceArray = [];
        let result;
        let sortArray = [];
        let tempArray = [];
        try {
            for (let i = 0; i < previousData.length; i++) {
                if (previousData[i].attributes.Result) {
                    result = previousData[i].attributes.Result;
                }
                let orgEvt = previousData[i].attributes.EventTime;
                let orgEvtSplit = orgEvt.split(":");
                let evtTime = orgEvtSplit[0] + ":" + orgEvtSplit[1];
                let eventTime = evtTime;
                let resultArr = result.split(",");
                let winner = resultArr[0];
                let count = resultArr.length;
                let winnerType = "";
                if ((winner % 2) > 0) {
                    //ODD
                    winnerType = "ODD";
                } else {
                    //EVEN
                    winnerType = "EVEN";
                }
                tempArray.push(winnerType);

                let eventNumber = previousData[i].attributes.EventNumber;
                let serverTime = previousData[i].attributes.EventTime;
                serverTime = serverTime.split("T");
                let actualServerTime = serverTime[1].split(":");
                let raceStartTime = Utils.ConvertUtcTimeToLocal(actualServerTime[0], actualServerTime[1], actualServerTime[2]);
                let oddEvenSeqObj = { "winingType": winnerType, "eventNumber": eventNumber, "raceStartTime": raceStartTime };
                oddEvenSequenceArray.push(oddEvenSeqObj);
            }
            let returnData = GetTheHiLoOddEvenData(oddEvenSequenceArray);
            this.SetDataForOddEvenOdd(returnData);
        } catch (error) {
        }
    };

    /**
    * Set odds data for odd even to dom element
    * @returns {null} 
    **/
    SetDataForOddEvenOdd(oddEvenWinnerArray) {
        let colCell = "";
        let footerCell = "";
        let headerCell = "";
        let rows = oddEvenWinnerArray[0].length;
        colCell = colCell + "<table>";
        colCell = colCell + "<tr>";
        let startValue = oddEvenWinnerArray[0][0].winingType;
        let oddColValue = "";
        let evenColValue = "";
        if (startValue == "ODD") {
            oddColValue = Localization.betNameEvenText;
            evenColValue = Localization.betNameOddText;
        } else {
            oddColValue = Localization.betNameOddText;
            evenColValue = Localization.betNameEvenText;
        }
        for (let n = 0; n < oddEvenWinnerArray.length; n++) {
            if (n % 2 == 0) {
                headerCell = headerCell + "<td>";
                headerCell = headerCell + "<div style='text-align: center;font-weight: 700; width:60px'>";
                headerCell = headerCell + evenColValue;
                headerCell = headerCell + "</div>";
                headerCell = headerCell + "</td>";
            } else {
                headerCell = headerCell + "<td>";
                headerCell = headerCell + "<div style='text-align: center;font-weight: 700; width:60px'>";
                headerCell = headerCell + oddColValue;
                headerCell = headerCell + "</div>";
                headerCell = headerCell + "</td>";
            }
        }
        colCell = colCell + "</tr>";

        for (let i = 0; i < rows; i++) {
            colCell = colCell + "<tr class='box_2nd'>";
            for (let j = 0; j < oddEvenWinnerArray.length; j++) {
                if (oddEvenWinnerArray[j][i] == "") {
                    colCell = colCell + "<td >" + "" + "</td>";
                } else {
                    if (oddEvenWinnerArray[j][i].winingType == "EVEN") {
                        colCell = colCell + "<td onclick=HiloOddEvenCellClicked('" + oddEvenWinnerArray[j][i].raceStartTime + "');>";
                        colCell = colCell + "<div class='oddredborder'>" +
                            oddEvenWinnerArray[j][i].eventNumber
                        colCell = colCell + "</div";
                        colCell = colCell + "</td>";
                    } else if (oddEvenWinnerArray[j][i].winingType == "ODD") {
                        colCell = colCell + "<td onclick=HiloOddEvenCellClicked('" + oddEvenWinnerArray[j][i].raceStartTime + "');>";
                        colCell = colCell + "<div class='oddblueborder'>" +
                            oddEvenWinnerArray[j][i].eventNumber
                        colCell = colCell + "</div";
                        colCell = colCell + "</td>";
                    }
                }
            }
            colCell = colCell + "</tr>";
        }
        footerCell = footerCell + "<tr>";
        for (let k = 0; k < oddEvenWinnerArray.length; k++) {
            let count = 0;
            for (let n = 0; n < oddEvenWinnerArray[k].length; n++) {
                if (oddEvenWinnerArray[k][n] != "") {
                    count++;
                }
            }
            footerCell = footerCell + "<td style='text-align: center;font-weight: 700;'>";
            footerCell = footerCell + count;
            footerCell = footerCell + "</td>";
        }
        footerCell = footerCell + "</tr>";
        colCell = colCell + "</table>";

        let objContainer = document.getElementById("oddEvencontainer");
        let objFooter = document.getElementById("oddEvenfooter");
        let objHeader = document.getElementById("oddEvenheader");
        objContainer.innerHTML = colCell;
        objFooter.innerHTML = footerCell;
        objHeader.innerHTML = headerCell;
    };

}
//#endregion