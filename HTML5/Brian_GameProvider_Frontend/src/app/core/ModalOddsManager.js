/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 08_06_2023.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 09_06_2023
 * @Description :- Handles all the modal odds value.
 ************************************/

import { Constant } from "../components/Constant.js";
import { Loader } from "../components/Loader.js";
import { Localization } from "../components/Localization.js";
import { Popup } from "../components/Popup.js";
import { Server } from "../services/Server.js";

//#region - Class defination 
export default class ModalOddsManager {
    /**
    * initializes variables.
    * @Constructor
    */
    constructor() {

    };

    ShowOddsModal() {
        this.ResetTab();
        $('#oddsModal').modal("show");
    }
    HideOddsModal() {
        $('#oddsModal').modal("hide");
    };

    ResetTab() {
        let tabObj = document.getElementById("modal_general_bet_sec");
        let buttonObj = tabObj.querySelectorAll('button');
        buttonObj.forEach(function (button) {
            button.classList.remove("active");
            if (button.innerText == "QUINELLA") {
                button.classList.add("active");
            }
        });
        let tabContentObj = document.getElementById("myTabContentOddsModal");
        let divObj = tabContentObj.querySelectorAll('div');
        divObj.forEach(function (div) {
            div.classList.remove("show");
            div.classList.remove("active");
            if (div.id == "quinella-tab-pane") {
                div.classList.add("show");
                div.classList.add("active");
            }
        });
    };

    async GetSpecificResultDataForModal(_eventId) {
        let resultResp = await Server.GetSpecificEventResult(_eventId, Constant.sessionId);
        this.GetWinningOddsForSingleType(resultResp.data.Event.RaceEvent.Market);

        this.GetSingleOddsDataForModal(_eventId);
        this.GetCombinationOddsDataForModal(_eventId);
    };
    GetWinningOddsForSingleType(_data) {
        this.winBetWinId = null;
        this.placeBetWinId = null;
        this.swingerBetWinId = null;
        this.quinellaBetWinId = null;
        this.exactaBetWinId = null;
        this.trioBetWinId = null;
        this.trifectaBetWinId = null;
        this.oddEvenBetWinId = null;
        this.hiLoBetWinId = null;
        _data.forEach(element => {
            if (element.attributes.ID == "Win") {
                this.winBetWinId = element.attributes.WinningSelectionIDs;
            }
            else if (element.attributes.ID == "Place") {
                this.placeBetWinId = element.attributes.WinningSelectionIDs;
            }
            else if (element.attributes.ID == "Swinger") {
                this.swingerBetWinId = element.attributes.WinningSelectionIDs;
            }
            else if (element.attributes.ID == "ReverseForecast") {//Quinella
                this.quinellaBetWinId = element.Selection.attributes.ID;
            }
            else if (element.attributes.ID == "Forecast") {//Exacta
                this.exactaBetWinId = element.Selection.attributes.ID;
            }
            else if (element.attributes.ID == "ReverseTricast") {//Trio
                this.trioBetWinId = element.Selection.attributes.ID;
            }
            else if (element.attributes.ID == "Tricast") {//Trifecta
                this.trifectaBetWinId = element.Selection.attributes.ID;
            }
            else if (element.attributes.ID == "OE") {
                this.oddEvenBetWinId = element.attributes.WinningSelectionIDs;
            }
            else if (element.attributes.ID == "HL") {
                this.hiLoBetWinId = element.attributes.WinningSelectionIDs;
            }
        });
    };

    /**
    * Get all the single odds data from server for modal
    * @param {string} _eventId - event id
    * @returns {null} 
    **/
    async GetSingleOddsDataForModal(_eventId) {
        let response = await Server.GetRaceEventSingleOdds(_eventId, Constant.sessionId);
        if (response.error == false) {
            this.SetAllSingleTypesOddsValue(response.data);
        } else {
            Popup.ShowErrorPopup(response.message);
        }
    };

    /**
    * Get all the combination odds data from server for modal
    * @param {string} _eventId - event id
    * @returns {null} 
    **/
    async GetCombinationOddsDataForModal(_eventId) {
        let response = await Server.GetRaceEventCombinationOdds(_eventId, Constant.sessionId);
        if (response.error == false) {
            this.SetAllCombinationTypesOddsValue(response.data.RaceEventCombinationOdds);
        } else {
            Popup.ShowErrorPopup(response.message);
        }
    };

    SetAllSingleTypesOddsValue(_data) {
        this.ConfigureOddsModalBetType(_data.place.Selection.length);
        this.SetModalSingleOddsValue(_data.win.Selection);
        this.SetModalShowPlaceOddsValue(_data.place.Selection);
        this.SetModalHiLoOddsValue(_data.hilo.Selection);
        this.SetModalOddEvenOddsValue(_data.evenodd.Selection);
    };

    SetAllCombinationTypesOddsValue(_data) {
        let swingerOdds = this.GetTheOddsArrayForCombinationOdds(_data.Swinger._text);
        let quinellaOdds = this.GetTheOddsArrayForCombinationOdds(_data.ReverseForecast._text);
        let exactaOdds = this.GetTheOddsArrayForCombinationOdds(_data.Forecast._text);
        let trioOdds = this.GetTheOddsArrayForCombinationOdds(_data.ReverseTricast._text);
        let trifectaOdds = this.GetTheOddsArrayForCombinationOdds(_data.Tricast._text);

        this.SetModalSwingerOddsValue(swingerOdds);
        this.SetModalQuinellaOddsValue(quinellaOdds);
        this.SetModalExactaOddsValue(exactaOdds);
        this.SetModalTrioOddsValue(trioOdds);
        this.SetModalTrifectaOddsValue(trifectaOdds);

        Loader.HideLoader();
        this.ShowOddsModal();
    };

    GetTheOddsArrayForCombinationOdds(_respOdds) {
        let tempArray = [];
        let oddsArray = [];
        tempArray = _respOdds.split("|");
        for (let i = 0; i < parseInt(tempArray.length); i += 3) {
            let tempObj = { ID: tempArray[i], Odds: tempArray[(i + 1)] };
            oddsArray.push(tempObj);
        }
        return oddsArray;
    };

    /**
    * Set the bet Name of modal odds
    * @param {number} _numberOfPlayer -player number
    * @returns {null} 
    */
    ConfigureOddsModalBetType(_numberOfPlayer) {
        let modalWinBetObj = document.getElementById("win-tab");
        modalWinBetObj.innerText = Localization.betNameWinText;

        let modalShowPlaceBetObj = document.getElementById("place-tab");
        if (_numberOfPlayer <= 6) {
            modalShowPlaceBetObj.innerText = Localization.betNameOnlyPlaceText;
        } else {
            modalShowPlaceBetObj.innerText = Localization.betNameOnlyShowText;
        }

        let modalSwingerBetObj = document.getElementById("swinger-tab");
        modalSwingerBetObj.innerText = Localization.betNameSwingerText;

        let modalQuinellaBetObj = document.getElementById("quinella-tab");
        modalQuinellaBetObj.innerText = Localization.betNameQuinellaText;

        let modalExactaBetObj = document.getElementById("exacta-tab");
        modalExactaBetObj.innerText = Localization.betNameExactaText;

        let modalTrioBetObj = document.getElementById("trio-tab");
        modalTrioBetObj.innerText = Localization.betNameShowTrioText;

        let modalTrifectaBetObj = document.getElementById("trifecta-tab");
        modalTrifectaBetObj.innerText = Localization.betNameShowTrifectaText;

        let modalHiLoBetObj = document.getElementById("highlow-tab");
        modalHiLoBetObj.innerText = Localization.hiLoText;

        let modalOddEvenBetObj = document.getElementById("oddeven-tab");
        modalOddEvenBetObj.innerText = Localization.oddEvenText;
    };

    SetEventNumberOfModalOddsSection(_evtNum) {
        document.getElementById("modal_single_evt_num").innerText = _evtNum;
        document.getElementById("modal_place_show_evt_num").innerText = _evtNum;
        document.getElementById("modal_swinger_evt_num").innerText = _evtNum;
        document.getElementById("modal_quinella_evt_num").innerText = _evtNum;
        document.getElementById("modal_exacta_evt_num").innerText = _evtNum;
        document.getElementById("modal_trio_evt_num").innerText = _evtNum;
        document.getElementById("modal_terifecta_evt_num").innerText = _evtNum;
    };
    SetRaceStartTimeOfModalOddsSection(_time) {
        document.getElementById("modal_win_odd_race_start_time").innerText = _time;
        document.getElementById("modal_showplace_odd_race_start_time").innerText = _time;
        document.getElementById("modal_swinger_odd_race_start_time").innerText = _time;
        document.getElementById("modal_quinella_odd_race_start_time").innerText = _time;
        document.getElementById("modal_exacta_odd_race_start_time").innerText = _time;
        document.getElementById("modal_trio_odd_race_start_time").innerText = _time;
        document.getElementById("modal_terifecta_odd_race_start_time").innerText = _time;
    };

    /**
    * Set modal single odds value to dom element
    * @param {Array} _oddsArray -odds array value
    * @returns {null} 
    */
    SetModalSingleOddsValue(_oddsArray) {
        this.ClearAllTheModalOddsIdValue("modal_single");
        let lowestNum = Math.min(..._oddsArray.map(item => item.attributes.Odds));
        let winId = this.winBetWinId;
        let singleId;
        for (let i = 0; i < _oddsArray.length; i++) {
            let className = this.GetModalOddsColorClassNameAsPerOddsRange(_oddsArray[i].attributes.Odds);
            singleId = _oddsArray[i].attributes.ID;
            let obj = document.getElementById("modal_single_1_" + singleId);
            if (obj) {
                obj.innerText = _oddsArray[i].attributes.Odds;
                obj.className = className;
                if (lowestNum === Number(_oddsArray[i].attributes.Odds)) {
                    obj.classList.add("lowest_odd_blink");
                }
                if (singleId == winId) {
                    obj.classList.add("modal_odd_active_Red");
                }
            }
        }
    };

    /**
    * Set Modal show/place odds value to dom element
    * @param {Array} _oddsArray -odds array value
    * @returns {null} 
    */
    SetModalShowPlaceOddsValue(_oddsArray) {
        this.ClearAllTheModalOddsIdValue("modal_placeShow");
        let lowestNum = Math.min(..._oddsArray.map(item => item.attributes.Odds));
        let placeShowId;
        let placeWinId = this.placeBetWinId.split(",");
        for (let i = 0; i < _oddsArray.length; i++) {
            let className = this.GetModalOddsColorClassNameAsPerOddsRange(_oddsArray[i].attributes.Odds);
            placeShowId = _oddsArray[i].attributes.ID;
            let obj = document.getElementById("modal_placeShow_1_" + placeShowId);
            if (obj) {
                obj.innerText = _oddsArray[i].attributes.Odds;
                obj.className = className;
                if (lowestNum === Number(_oddsArray[i].attributes.Odds)) {
                    obj.classList.add("lowest_odd_blink");
                }
                if (placeShowId == placeWinId[0] || placeShowId == placeWinId[1] || placeShowId == placeWinId[2]) {
                    obj.classList.add("modal_odd_active_Red");
                }
            }
        }
    };

    /**
    * Set high low odds value to dom element
    * @returns {null} 
    */
    SetModalHiLoOddsValue(_oddsArray) {
        let hiClassName = this.GetModalOddsColorClassNameAsPerOddsRange(_oddsArray[0].attributes.Odds);
        let loClassName = this.GetModalOddsColorClassNameAsPerOddsRange(_oddsArray[1].attributes.Odds);
        let hiOddObj = document.getElementById("modal_hi_odd_value");//hi
        let lowOddObj = document.getElementById("modal_lo_odd_value");//lo

        if (hiOddObj && lowOddObj) {
            hiOddObj.innerText = "";
            lowOddObj.innerText = "";
            hiOddObj.className = "";
            lowOddObj.className = "";

            hiOddObj.className = hiClassName;
            lowOddObj.className = loClassName;
            hiOddObj.innerText = _oddsArray[0].attributes.Odds;//hi
            lowOddObj.innerText = _oddsArray[1].attributes.Odds;//lo

            if (this.hiLoBetWinId == "H") {
                hiOddObj.classList.add("modal_odd_active_Red");
            } else {
                lowOddObj.classList.add("modal_odd_active_Red");
            }
        }
    };

    /**
    * Set odd even odds value to dom element
    * @returns {null} 
    */
    SetModalOddEvenOddsValue(_oddsArray) {
        let oddClassName = this.GetModalOddsColorClassNameAsPerOddsRange(_oddsArray[0].attributes.Odds);
        let evenClassName = this.GetModalOddsColorClassNameAsPerOddsRange(_oddsArray[1].attributes.Odds);
        let oddObj = document.getElementById("modal_odd_odd_value");//odd
        let evenObj = document.getElementById("modal_even_odd_value");//even
        if (oddObj && evenObj) {
            oddObj.innerText = "";
            evenObj.innerText = "";
            oddObj.className = "";
            evenObj.className = "";

            oddObj.className = oddClassName;
            evenObj.className = evenClassName;
            oddObj.innerText = _oddsArray[0].attributes.Odds;//odd
            evenObj.innerText = _oddsArray[1].attributes.Odds;//even

            if (this.oddEvenBetWinId == "O") {
                oddObj.classList.add("modal_odd_active_Red");
            } else {
                evenObj.classList.add("modal_odd_active_Red");
            }
        }
    };

    /**
    * Set Modal swinger odds value to dom element
    * @param {Array} _oddsArray -odds array value
    * @returns {null} 
    */
    SetModalSwingerOddsValue(_oddsArray) {
        this.ClearAllTheModalOddsIdValue("modal_swinger");
        let swingerWinId = this.swingerBetWinId.split(",");
        let lowestNum = Math.min(..._oddsArray.map(item => item.Odds));
        let swingerId;
        for (let i = 0; i < _oddsArray.length; i++) {
            let className = this.GetModalOddsColorClassNameAsPerOddsRange(_oddsArray[i].Odds);
            swingerId = _oddsArray[i].ID;
            swingerId = swingerId.split("-");
            let obj = document.getElementById("modal_swinger_" + swingerId[0] + "_" + swingerId[1]);
            if (obj) {
                obj.innerText = _oddsArray[i].Odds;
                obj.className = className;
                if (lowestNum === Number(_oddsArray[i].Odds)) {
                    obj.classList.add("lowest_odd_blink");
                }
                if (_oddsArray[i].ID == swingerWinId[0] || _oddsArray[i].ID == swingerWinId[1] || _oddsArray[i].ID == swingerWinId[2]) {
                    obj.classList.add("modal_odd_active_Red");
                }
            }
        }
    };

    /**
    * Set Modal quinella odds value to dom element
    * @param {Array} _oddsArray -odds array value
    * @returns {null} 
    */
    SetModalQuinellaOddsValue(_oddsArray) {
        let quinellaWinId = this.quinellaBetWinId.replace(",", "-");
        this.ClearAllTheModalOddsIdValue("modal_quenlla");
        let lowestNum = Math.min(..._oddsArray.map(item => item.Odds));
        let quenllaId;
        for (let i = 0; i < _oddsArray.length; i++) {
            let className = this.GetModalOddsColorClassNameAsPerOddsRange(_oddsArray[i].Odds);
            quenllaId = _oddsArray[i].ID;
            quenllaId = quenllaId.split("-");
            let obj = document.getElementById("modal_quenlla_" + quenllaId[0] + "_" + quenllaId[1]);
            if (obj) {
                obj.innerText = _oddsArray[i].Odds;
                obj.className = className;
                if (lowestNum === Number(_oddsArray[i].Odds)) {
                    obj.classList.add("lowest_odd_blink");
                }
                if (_oddsArray[i].ID == quinellaWinId) {
                    obj.classList.add("modal_odd_active_Red");
                }
            }
        }
    };

    /**
    * Set Modal exacta odds value to dom element
    * @param {Array} _oddsArray -odds array value
    * @returns {null} 
    */
    SetModalExactaOddsValue(_oddsArray) {
        let exactaWinId = this.exactaBetWinId;
        this.ClearAllTheModalOddsIdValue("modal_exacta");
        let lowestNum = Math.min(..._oddsArray.map(item => item.Odds));
        let exactaId;
        for (let i = 0; i < _oddsArray.length; i++) {
            let className = this.GetModalOddsColorClassNameAsPerOddsRange(_oddsArray[i].Odds);
            exactaId = _oddsArray[i].ID;
            exactaId = exactaId.split("-");
            let obj = document.getElementById("modal_exacta_" + exactaId[0] + "_" + exactaId[1]);
            if (obj) {
                obj.innerText = _oddsArray[i].Odds;
                obj.className = className;
                if (lowestNum === Number(_oddsArray[i].Odds)) {
                    obj.classList.add("lowest_odd_blink");
                }
                if (_oddsArray[i].ID == exactaWinId) {
                    obj.classList.add("modal_odd_active_Red");
                }
            }
        }
    };

    /**
    * Set trio odds value to dom element
    * @param {Array} _oddsArray -odds array value
    * @returns {null} 
    */
    SetModalTrioOddsValue(_oddsArray) {
        let trioWinId = this.trioBetWinId.replaceAll(",", "-");
        let mainTr = document.getElementById("modal_trio_main_tr");
        while (mainTr.firstChild) {
            mainTr.removeChild(mainTr.lastChild);
        }
        this.ClearModalAllTheOddsIdValueOfTrioTrifecta("modal_trio");
        let lowestNum = Math.min(..._oddsArray.map(item => item.Odds));
        let mainTdTag, tbodyTag;
        let count = 0;
        for (let i = 0; i < _oddsArray.length; i++) {
            let className = this.GetModalOddsColorClassNameAsPerOddsRange(_oddsArray[i].Odds);
            let posNum = _oddsArray[i].ID;
            let posName = posNum.replaceAll("-", "");
            let posOdd = _oddsArray[i].Odds;
            if (count == 0) {
                mainTdTag = document.createElement('td');
                mainTdTag.className = "odd_td_padding_0";
                let tableTag = document.createElement('table');
                tableTag.className = "table";
                tableTag.classList.add("table-bordered");
                tbodyTag = document.createElement('tbody');
                let trTag = document.createElement('tr');
                let thTag = document.createElement('th');
                thTag.className = "chart_head";
                thTag.classList.add("new_chart_color");
                thTag.innerText = posName;
                let tdTag = document.createElement('td');
                tdTag.id = "modal_trio_" + posNum.replaceAll("-", "_");
                tdTag.className = "chart_body";
                tdTag.classList.add(className);
                if (lowestNum === Number(_oddsArray[i].Odds)) {
                    tdTag.classList.add("lowest_odd_blink");
                }
                if (_oddsArray[i].ID == trioWinId) {
                    tdTag.classList.add("modal_odd_active_Red");
                }
                tdTag.innerText = posOdd;
                trTag.appendChild(thTag);
                trTag.appendChild(tdTag);
                tbodyTag.appendChild(trTag);
                tableTag.appendChild(tbodyTag);
                mainTdTag.appendChild(tableTag);
                mainTr.appendChild(mainTdTag);
            } else {
                let trTag = document.createElement('tr');
                let thTag = document.createElement('th');
                thTag.className = "chart_head";
                thTag.classList.add("new_chart_color");
                thTag.innerText = posName;
                let tdTag = document.createElement('td');
                tdTag.id = "modal_trio_" + posNum.replaceAll("-", "_");
                tdTag.className = "chart_body";
                tdTag.classList.add(className);
                if (lowestNum === Number(_oddsArray[i].Odds)) {
                    tdTag.classList.add("lowest_odd_blink");
                }
                if (_oddsArray[i].ID == trioWinId) {
                    tdTag.classList.add("modal_odd_active_Red");
                }
                tdTag.innerText = posOdd;
                trTag.appendChild(thTag);
                trTag.appendChild(tdTag);
                tbodyTag.appendChild(trTag);
            }
            count++;
            if (count == 9) {
                count = 0;
            }
        }
    };

    /**
    * Set trifecta odds value to dom element
    * @param {Array} _oddsArray -odds array value
    * @returns {null} 
    */
    SetModalTrifectaOddsValue(_oddsArray) {
        let trifectaWinId = this.trifectaBetWinId;
        let mainTr = document.getElementById("modal_trifecta_main_tr");
        while (mainTr.firstChild) {
            mainTr.removeChild(mainTr.lastChild);
        }
        this.ClearModalAllTheOddsIdValueOfTrioTrifecta("modal_trifecta");
        let lowestNum = Math.min(..._oddsArray.map(item => item.Odds));
        let mainTdTag, tbodyTag;
        let count = 0;
        for (let i = 0; i < _oddsArray.length; i++) {
            let className = this.GetModalOddsColorClassNameAsPerOddsRange(_oddsArray[i].Odds);
            let posNum = _oddsArray[i].ID;
            let posName = posNum.replaceAll("-", "");
            let posOdd = _oddsArray[i].Odds;
            if (count == 0) {
                mainTdTag = document.createElement('td');
                mainTdTag.className = "odd_td_padding_0";
                let tableTag = document.createElement('table');
                tableTag.className = "table";
                tableTag.classList.add("table-bordered");
                tbodyTag = document.createElement('tbody');
                let trTag = document.createElement('tr');
                let thTag = document.createElement('th');
                thTag.className = "chart_head";
                thTag.classList.add("new_chart_color");
                thTag.innerText = posName;
                let tdTag = document.createElement('td');
                tdTag.id = "modal_trifecta_" + posNum.replaceAll("-", "_");
                tdTag.className = "chart_body";
                tdTag.classList.add(className);
                if (lowestNum === Number(_oddsArray[i].Odds)) {
                    tdTag.classList.add("lowest_odd_blink");
                }
                if (_oddsArray[i].ID == trifectaWinId) {
                    tdTag.classList.add("modal_odd_active_Red");
                }
                tdTag.innerText = posOdd;
                trTag.appendChild(thTag);
                trTag.appendChild(tdTag);
                tbodyTag.appendChild(trTag);
                tableTag.appendChild(tbodyTag);
                mainTdTag.appendChild(tableTag);
                mainTr.appendChild(mainTdTag);
            } else {
                let trTag = document.createElement('tr');
                let thTag = document.createElement('th');
                thTag.className = "chart_head";
                thTag.classList.add("new_chart_color");
                thTag.innerText = posName;
                let tdTag = document.createElement('td');
                tdTag.id = "modal_trifecta_" + posNum.replaceAll("-", "_");
                tdTag.className = "chart_body";
                tdTag.classList.add(className);
                if (lowestNum === Number(_oddsArray[i].Odds)) {
                    tdTag.classList.add("lowest_odd_blink");
                }
                if (_oddsArray[i].ID == trifectaWinId) {
                    tdTag.classList.add("modal_odd_active_Red");
                }
                tdTag.innerText = posOdd;
                trTag.appendChild(thTag);
                trTag.appendChild(tdTag);
                tbodyTag.appendChild(trTag);
            }
            count++;
            if (count == 9) {
                count = 0;
            }
        }
    };

    /**
    * Clear all the value of odds from dom element
    * @param {string} _name -odds name
    * @returns {null} 
    */
    ClearAllTheModalOddsIdValue(_name) {
        for (let i = 1; i <= 8; i++) {
            for (let j = 1; j <= 8; j++) {
                let obj = document.getElementById(`${_name}_${i}_${j}`);
                if (obj) {
                    obj.innerHTML = "-";
                    obj.className = "";
                }
            }
        }
    };

    ClearModalAllTheOddsIdValueOfTrioTrifecta(_name) {
        for (let i = 1; i <= 8; i++) {
            for (let j = 1; j <= 8; j++) {
                for (let k = 1; k <= 8; k++) {
                    let obj = document.getElementById(`${_name}_${i}_${j}_${k}`);

                    if (obj) {
                        obj.innerHTML = "-";
                        obj.className = "";
                    }
                }
            }
        }
    };

    /**
    * Get color class for odds range 
    * @param {number} _value -odd  value
    * @returns {null} 
    */
    GetModalOddsColorClassNameAsPerOddsRange(_value) {
        let className = null;
        if (_value < 10) {
            className = "red_range"
        } else if (_value >= 10 && _value < 100) {
            className = "blue_range"
        } else if (_value >= 100) {
            className = "black_range"
        }
        return className;
    };


}
//#endregion