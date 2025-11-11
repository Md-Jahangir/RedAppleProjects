/********* Script_Details ************
 * @Original_Creator :- Faiz_Ahmad.
 * @Created_Date :- 27-09-2022.
 * @Last_Update_By :- Faiz Ahmad.
 * @Last_Updatd_Date :- 26-12-2022
 * @Description :- Handles Event time.
 ************************************/

//#region - importing required scripts 
import { Constant } from "../components/Constant.js";
import { Loader } from "../components/Loader.js";
import { Localization } from "../components/Localization.js";
import { Popup } from "../components/Popup.js";
import { Utils } from "../components/Utils.js";
import { Server } from "../services/Server.js";
import { GameManager } from "./GameManager.js";
import OddsManager from "./OddsManager.js";
//#endregion

//#region - Class defination
export default class EventTimeManager {
    /**
    * initializes variables.
    * @Constructor
    */
    constructor() {
        this.availableEvents = 50;
        this.liveCounter = 0;
        this.boolToSkip1StEventResult = true;
        this.alreadyRunningEvent = true;
        this.gameResult = [];
        this.oddsManager = new OddsManager();

        this.InitializeEventTimeData();
    };

    /**
    * Add initialize game event time.
    * @returns {null} 
    */
    async InitializeEventTimeData() {
        let response = await Server.HowManyPreviousNextEvents(Constant.howManyPrevData, Constant.howManyNextData, Constant.sessionId, Constant.gameType);

        if (response.error == false) {
            if (!Utils.IsEmpty(response.data)) {
                this.previousRaceEventData = response.data.PreviousAndNextEvents.RaceEvent.filter((elem) => {
                    if (elem.attributes.EventStatus === "Finished") {
                        return elem;
                    }
                });
                this.nextRaceEventData = response.data.PreviousAndNextEvents.RaceEvent.filter((elem) => {
                    if (elem.attributes.EventStatus === "OpenForBetting" || elem.attributes.EventStatus === "Pending") {
                        return elem;
                    }
                });
                this.runningEvent = response.data.PreviousAndNextEvents.RaceEvent.filter((elem) => {
                    if (elem.attributes.EventStatus === "InProgress") {
                        return elem;
                    }
                });

                this.ConvertEventUtcTimeToLocal(this.previousRaceEventData);
                this.ConvertEventUtcTimeToLocal(this.nextRaceEventData);
                if (this.runningEvent.length > 0) {
                    this.ConvertEventUtcTimeToLocal(this.runningEvent);
                }
                this.availableEvents -= 12;

                if (this.runningEvent.length > 0) {
                    this.runningEvent = this.runningEvent[0];
                    this.SetLiveEventTime(this.runningEvent);
                    this.SetInitialPreviousEventTime(this.previousRaceEventData);
                    this.SetImmediateNextEventTime(this.nextRaceEventData[this.liveCounter]);
                    this.SetInitialFutureEventTime(this.nextRaceEventData);
                    Constant.SetSeletedEvent(this.nextRaceEventData[this.liveCounter]);
                } else {
                    this.boolToSkip1StEventResult = false;
                    this.alreadyRunningEvent = false;
                    this.SetLiveEventTime(this.previousRaceEventData[this.previousRaceEventData.length - 1]);
                    this.runningEvent = this.previousRaceEventData[this.previousRaceEventData.length - 1];
                    this.SetInitialPreviousEventTime(this.previousRaceEventData);
                    this.SetImmediateNextEventTime(this.nextRaceEventData[this.liveCounter]);
                    this.SetInitialFutureEventTime(this.nextRaceEventData);
                    Constant.SetSeletedEvent(this.nextRaceEventData[this.liveCounter]);
                }
                Constant.SetSelectedLiveEvent(this.runningEvent);
                this.SetBetCloseTime();
                this.SetRaceNumberToNextSec(Constant.selectedEvent.attributes.EventNumber);

                this.oddsManager.GetSingleOddsData(this.nextRaceEventData[this.liveCounter].attributes.ID);
                this.oddsManager.GetCombinationOddsData(this.nextRaceEventData[this.liveCounter].attributes.ID);
                await GameManager.betManager.GetAllPlayersRatingData(this.nextRaceEventData[this.liveCounter].attributes.ID);

                await GameManager.SetGameTime(response.data);
                GameManager.UpdateNumberOfPlayers(this.nextRaceEventData[this.liveCounter].Entry.length);
                this.oddsManager.SetEventNumberOfOddsSection(this.nextRaceEventData[this.liveCounter].attributes.EventNumber);
                this.oddsManager.SetRaceStartTimeOfOddsSection(this.nextRaceEventData[this.liveCounter].attributes.EventTime);

                this.oddsManager.GetResultDataForHighLowOdd();
                this.oddsManager.GetResultDataForOddEvenOdd();
            }
        } else {
            Popup.ShowErrorPopup(response.message);
        }

    };

    /**
    * Set initialize previous event time.
    * @param {object}_data -response from api
    * @returns {null} 
    */
    SetInitialPreviousEventTime(_data) {
        let serverTime = null, actualServerTime = null;
        for (let i = (document.getElementById("time_sec1").children.length - 1); i >= 0; i--) {
            serverTime = _data[i].attributes.EventTime;
            actualServerTime = serverTime.split(":");
            document.getElementById("time_sec1").children[i].innerText = actualServerTime[0] + ":" + actualServerTime[1];
        }
    };

    /**
    * Set live event time.
    * @param {object}_data -response from api
    * @returns {null} 
    */
    SetLiveEventTime(_data) {
        let time = _data.attributes.EventTime;
        let actualServerTime = time.split(":");
        let liveTimeObj = document.getElementById("live");
        liveTimeObj.innerText = actualServerTime[0] + ":" + actualServerTime[1];
    };

    /**
    * Set Immediate next event time.
    * @param {object}_data -response from api
    * @returns {null} 
    */
    SetImmediateNextEventTime(_data) {
        let serverTime = _data.attributes.EventTime;
        let actualServerTime = serverTime.split(":");
        let nextEventObj = document.getElementById("next");

        this.ClearAllTheAnchorTabFromRaceEventData();

        let link = document.createElement("A");
        link.setAttribute('href', '#');
        link.text = actualServerTime[0] + ":" + actualServerTime[1];
        nextEventObj.appendChild(link);

        GameManager.SetParticularColorForRaceEventTime(nextEventObj);
    };

    /**
    * Set initialize future event time.
    * @param {object}_data -response from api
    * @returns {null} 
    */
    SetInitialFutureEventTime(_data) {
        let timeSec2Obj = document.getElementById("time_sec2").children;
        for (let j = 0; j < (timeSec2Obj.length); j++) {
            let serverTime = _data[j + 1].attributes.EventTime;
            let actualServerTime = serverTime.split(":");

            let link = document.createElement("A");
            link.setAttribute('href', '#');
            link.text = actualServerTime[0] + ":" + actualServerTime[1];
            timeSec2Obj[j].appendChild(link);
        }
    };

    /**
    * Update game event time.
    * @returns {null} 
    */

    async UpdateEventTimeData() {
        //to kept
        this.previousRaceEventData.shift();
        let temp = await this.previousRaceEventData.push(this.runningEvent);
        this.SetLiveEventTime(this.nextRaceEventData[this.liveCounter]);
        this.runningEvent = this.nextRaceEventData[this.liveCounter];
        //to kept
        this.SetImmediateNextEventTime(this.nextRaceEventData[(1)]);
        Constant.SetSeletedEvent(this.nextRaceEventData[(1)]);
        Constant.SetSelectedLiveEvent(this.runningEvent);
        this.availableEvents -= 1;
        this.nextRaceEventData.shift();
        //to kept
        this.UpdatePreviousEventTime(this.previousRaceEventData);
        this.UpdateFutureEventTime(this.nextRaceEventData);
        this.SetBetCloseTime();
        this.SetRaceNumberToNextSec(Constant.selectedEvent.attributes.EventNumber);
        //to kept
        this.oddsManager.GetResultDataForHighLowOdd();
        this.oddsManager.GetResultDataForOddEvenOdd();
        await GameManager.betManager.CheckWhetherRaceFinishedOrNot(Constant.selectedLiveEvent.attributes.ID);
        GameManager.betManager.ResetAllBetInputs();
    };

    async UpdateResultWhenGetResult() {
        try {
            let status = false;
            let resultSeq;
            let specificResultResponse = await GameManager.GetSpecificEventResultData(this.runningEvent.attributes.ID, Constant.sessionId);
            if (specificResultResponse.error == false) {
                if (specificResultResponse.data.Event.RaceEvent.attributes.Result) {
                    if (this.boolToSkip1StEventResult) {
                        GameManager.gameHistoryManager.UpdateGameHistory(specificResultResponse.data);
                        resultSeq = specificResultResponse.data.Event.RaceEvent.attributes.Result;
                        GameManager.ShowResultSectionUI(this.runningEvent.attributes.EventNumber, resultSeq, this.runningEvent.attributes.EventTime);
                        await GameManager.gameHistoryManager.GetAllEventNumberList();
                        GameManager.domHandler.ClearAllTheWinningSequenceFromOddsTable();
                        setTimeout(async () => {
                            this.oddsManager.GetSingleOddsData(Constant.selectedEvent.attributes.ID);
                            this.oddsManager.GetCombinationOddsData(Constant.selectedEvent.attributes.ID);
                            await GameManager.betManager.GetAllPlayersRatingData(this.nextRaceEventData[0].attributes.ID);
                            GameManager.UpdateNumberOfPlayers(this.nextRaceEventData[0].Entry.length);
                            this.oddsManager.SetRaceStartTimeOfOddsSection(Constant.selectedEvent.attributes.EventTime);
                            this.oddsManager.SetEventNumberOfOddsSection(Constant.selectedEvent.attributes.EventNumber);
                            await GameManager.betManager.CheckWhetherRaceFinishedOrNot(Constant.selectedEvent.attributes.ID);
                        }, 15000);
                        GameManager.GetAllSessionBets();
                        status = true;
                    } else {
                        this.boolToSkip1StEventResult = true;
                    }

                } else {
                    status = false;
                }

            } else {
                Popup.ShowErrorPopup(specificResultResponse.message);
            }
            return status;
        } catch { }

    };

    /**
    * Update previous event time.
    * @param {object}_data -response from api
    * @returns {null} 
    */
    UpdatePreviousEventTime(_data) {
        let pIndex = (_data.length - 1);
        for (let i = (document.getElementById("time_sec1").children.length - 1); i >= 0; i--) {
            let serverTime = _data[pIndex].attributes.EventTime;
            let actualServerTime = serverTime.split(":");
            document.getElementById("time_sec1").children[i].innerText = actualServerTime[0] + ":" + actualServerTime[1];
            --pIndex;
        }
    };

    /**
    * Update future event time.
    * @param {object}_data -response from api
    * @returns {null} 
    */
    UpdateFutureEventTime(_data) {
        let timeSec2Obj = document.getElementById("time_sec2").children;
        for (let j = 0; j < (timeSec2Obj.length); j++) {
            timeSec2Obj.innerText = "";
            let serverTime = _data[(this.liveCounter + 1 + j)].attributes.EventTime;
            let actualServerTime = serverTime.split(":");

            let link = document.createElement("A");
            link.setAttribute('href', '#');
            link.text = actualServerTime[0] + ":" + actualServerTime[1];
            timeSec2Obj[j].appendChild(link);
        }
    };

    /**
    * Set bet close time.
    * @returns {null} 
    */
    SetBetCloseTime() {
        let _eventTime = Constant.selectedEvent.attributes.EventTime;
        _eventTime = _eventTime.split(":");
        if (parseInt(_eventTime[2]) > 10) {
            _eventTime[2] = parseInt(_eventTime[2]) - 10;
        }
        else {
            if (parseInt(_eventTime[1]) > 0) {
                _eventTime[1] = parseInt(_eventTime[1]) - 1;
                _eventTime[2] = parseInt(_eventTime[2]) + (60 - 10);
            }
            else {
                if (parseInt(_eventTime[0]) > 0) {
                    _eventTime[0] = parseInt(_eventTime[0]) - 1;
                    _eventTime[1] = parseInt(_eventTime[1]) + (60 - 1);
                    _eventTime[2] = parseInt(_eventTime[2]) + 50;
                }
                else {
                    _eventTime[0] = 23;
                    _eventTime[1] = parseInt(_eventTime[1]) + (60 - 1);
                    _eventTime[2] = parseInt(_eventTime[2]) + 50;
                }
            }
        }
        let middleTime;
        if (_eventTime[1] < 10) {
            middleTime = "0" + _eventTime[1];
        } else {
            middleTime = _eventTime[1];
        }
        this.SetRaceStartTime(Constant.selectedEvent.attributes.EventTime);
        this.SetBetClosingTime((_eventTime[0] + ":" + middleTime + ":" + _eventTime[2]));
        this.SetRaceNumber(Constant.selectedEvent.attributes.EventNumber);
        this.SetRaceNumberToLiveSec(Constant.selectedLiveEvent.attributes.EventNumber);
        Constant.SetBetCloseTime(_eventTime[0] + ":" + middleTime + ":" + _eventTime[2]);
    };

    /**
    * Set race start time in dom element.
    * @param {string}_time -response from api
    * @returns {null} 
    */
    SetRaceStartTime(_time) {
        document.querySelector("#race_start_time").innerHTML = _time;
    };

    /**
    * Set bet close time in dom element.
    * @param {string}_time -response from api
    * @returns {null} 
    */
    SetBetClosingTime(_time) {
        document.querySelector("#bet_closing_time").innerHTML = _time;
    };

    /**
    * Set race number in dom element
    * @param {number}_number -response from api
    * @returns {null} 
    */
    SetRaceNumber(_number) {
        document.querySelector("#race_number").innerHTML = _number;
    };

    SetRaceNumberToLiveSec(_number) {
        document.querySelector("#live_sec_event_num").innerHTML = _number;
    };
    SetRaceNumberToNextSec(_number) {
        document.querySelector("#next_sec_event_num").innerHTML = _number;
    };

    /**
    * Set the selected event time object
    * @param {string} _time -response from api
    * @returns {null} 
    */
    UpdateSeletedEvent(_time) {
        let tempTime = _time.innerHTML;
        tempTime = tempTime.split(":");
        let hour = tempTime[0];
        let sec = tempTime[1];

        let event = this.nextRaceEventData.filter((elem) => {
            let temp = elem.attributes.EventTime.split(":");
            if (temp[0] === hour && temp[1] === sec) {
                return elem;
            }
        });
        Constant.SetSeletedEvent(event[0]);
        this.SetBetCloseTime();
    };

    UpdateSeletedPreviousEvent(_time) {
        let tempTime = _time.innerHTML;
        tempTime = tempTime.split(":");
        let hour = tempTime[0];
        let sec = tempTime[1];

        let event = this.previousRaceEventData.filter((elem) => {
            let temp = elem.attributes.EventTime.split(":");
            if (temp[0] === hour && temp[1] === sec) {
                return elem;
            }
        });
        Constant.SetSelectedPreviousEvent(event[0]);
    };

    /**
    * Convert the utc event time to local time
    * @param {string} _data -response from api
    * @returns {null} 
    */
    ConvertEventUtcTimeToLocal(_data) {
        let serverTime = null, actualServerTime = null;
        _data.forEach(element => {
            serverTime = element.attributes.EventTime;
            serverTime = serverTime.split("T");
            actualServerTime = serverTime[1].split(":");
            element.attributes.EventTime = Utils.ConvertUtcTimeToLocal(actualServerTime[0], actualServerTime[1], actualServerTime[2]);
            serverTime = element.attributes.FinishTime;
            serverTime = serverTime.split("T");
            actualServerTime = serverTime[1].split(":");
            element.attributes.FinishTime = Utils.ConvertUtcTimeToLocal(actualServerTime[0], actualServerTime[1], actualServerTime[2]);
        });
    };

    /**
    * Clear all the anchor pointer from dom element
    * @returns {null} 
    */
    ClearAllTheAnchorTabFromRaceEventData() {
        const prevLinks = document.getElementsByTagName("A");
        while (prevLinks.length > 0) {
            prevLinks[0].remove();
        }
    };

}
//#endregion