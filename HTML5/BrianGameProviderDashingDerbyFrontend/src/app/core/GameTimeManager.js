/********* Script_Details ************
 * @Original_Creator :- Faiz_Ahmad.
 * @Created_Date :- 27-09-2022.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 12_05_2023
 * @Description :- Handles all game time related calculation.
 ************************************/

import { Constant } from "../components/Constant.js";
import { Loader } from "../components/Loader.js";
import { Localization } from "../components/Localization.js";
import { Popup } from "../components/Popup.js";
import { GameManager } from "./GameManager.js";
import { Timer } from "../components/Timer.js";

//#region - importing required scripts 
//#endregion

//#region - Class defination 
export default class GameTimeManager {
    /**
    * initializes variables.
    * @Constructor
    */
    constructor() {
        this.allGameTime = [];
        this.timerValue = 0;
        this.timerIndex = 0;
        this.timerRunning = false;
        this.isWinResult = false;
        this.intervalTimer = null;
        this.SetTimerText(0);
    };

    /**
    * Handles Timer for each event.
    * @public 
    * @returns {null} 
    */
    async SetTimerValue() {
        this.timerIndex = 12;
        this.CalculateTimer();
    };

    /**
    * Handles Change of the live event when time finished.
    * @public 
    * @returns {null} 
    */
    async GameTimer() {
        if (this.timerRunning) {
            if (this.timerValue > 0) {
                if (this.timerValue > 240 || this.timerValue < 0) {
                    Popup.ShowErrorPopup(Localization.IssueWithServerTimePleaseRefreshThePageText);
                } else {
                    this.timerValue -= 1;
                    this.SetTimerText(this.timerValue);
                }
            }
            else {
                this.timerValue = 0;
                clearInterval(this.intervalTimer);
                this.timerRunning = false;
                let data1 = await GameManager.eventTimeManager.UpdateEventTimeData();
                await this.CalculateTimerNew();
                Loader.HideLoader();
                this.isWinResult = false;
            }

            // if (this.timerValue <= 50 && this.timerValue % 5 == 0) {
            // if (this.timerValue <= 70 && this.timerValue % 5 == 0) {
            if (this.timerValue <= 120 && this.timerValue % 5 == 0) {
                if (!this.isWinResult) {
                    this.isWinResult = true;
                    let resp = await GameManager.eventTimeManager.UpdateResultWhenGetResult();
                }
            }
        }
    };
    Timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
    * Calcualte the remaing time in next live event.
    * @public 
    * @returns {null} 
    */

    async CalculateTimer() {
        let data = await GameManager.GetServerTime();
        this.timerIndex += 1;
        let min = 0;
        let currentTimeValue = this.ReturnTime(Constant.currentServerTime);

        if (parseInt(this.allGameTime[this.timerIndex].EventTime[1]) > parseInt(currentTimeValue[1])) {
            min = (parseInt(this.allGameTime[this.timerIndex].EventTime[1]) - parseInt(currentTimeValue[1])) * 60;
        }
        else if (parseInt(this.allGameTime[this.timerIndex].EventTime[1]) < parseInt(currentTimeValue[1])) {
            if (parseInt(this.allGameTime[this.timerIndex].EventTime[1]) == 0) {
                min = (60 - parseInt(currentTimeValue[1])) * 60;
            }
            else {
                min = ((60 + parseInt(this.allGameTime[this.timerIndex].EventTime[1])) - parseInt(currentTimeValue[1])) * 60;
            }
        }
        else {
            min = 0;
        }

        if (parseInt(this.allGameTime[this.timerIndex].EventTime[2]) > parseInt(currentTimeValue[2])) {

            this.timerValue = (parseInt(this.allGameTime[this.timerIndex].EventTime[2]) - parseInt(currentTimeValue[2]));
            this.timerValue += min;
        }
        else if (parseInt(this.allGameTime[this.timerIndex].EventTime[2]) < parseInt(currentTimeValue[2])) {

            let sec = (parseInt(this.allGameTime[this.timerIndex].EventTime[2]) + (60 - parseInt(currentTimeValue[2])));
            min -= 60;
            this.timerValue = parseInt(min) + parseInt(sec);
        } else {
            this.timerValue = parseInt(min);
        }

        let currentTime = this.ReturnTime(Constant.currentServerTime);
        let eventTime = this.allGameTime[this.timerIndex].EventTime;
        let finishTime = this.allGameTime[this.timerIndex].FinishTime;

        let startTime = (parseInt(eventTime[0]) * 3600) + (parseInt(eventTime[1]) * 60) + parseInt(eventTime[2]);
        let endTime = (parseInt(finishTime[0]) * 3600) + (parseInt(finishTime[1]) * 60) + parseInt(finishTime[2]);

        let timeDiff = (endTime - startTime);
        this.timerValue = Math.abs(this.timerValue);

        this.intervalTimer = setInterval(() => {
            this.GameTimer();
        }, 1000);
        Timer.InitializeVariableValue(this.timerValue);
        Timer.ShowTimerAnimation();
        this.SetTimerText(this.timerValue);
        this.ShowRaceNumberWhenTimerAnimationShowing();
        this.timerRunning = true;
    };

    async CalculateTimerNew() {
        let data = await GameManager.GetServerTime();
        this.timerIndex += 1;

        let currentTime = this.ReturnTime(Constant.currentServerTime);
        let eventTime = this.allGameTime[this.timerIndex].EventTime;
        let finishTime = this.allGameTime[this.timerIndex].FinishTime;
        let startTime = (parseInt(eventTime[0]) * 3600) + (parseInt(eventTime[1]) * 60) + parseInt(eventTime[2]);
        let endTime = (parseInt(finishTime[0]) * 3600) + (parseInt(finishTime[1]) * 60) + parseInt(finishTime[2]);
        let recentTime = (parseInt(currentTime[0]) * 3600) + (parseInt(currentTime[1]) * 60) + parseInt(currentTime[2]);
        let actualTime = startTime - recentTime;
        this.timerValue = Math.abs(actualTime);

        this.intervalTimer = setInterval(() => {
            this.GameTimer();
        }, 1000);
        Timer.InitializeVariableValue(this.timerValue);
        Timer.ShowTimerAnimation();
        this.SetTimerText(this.timerValue);
        this.ShowRaceNumberWhenTimerAnimationShowing();
        this.timerRunning = true;
    };
    /**
    * Handles start and finish time for all event of the game.
    * @public 
    * @returns {null} 
    */
    async SetAllTime(_data) {
        let obj = null;
        for (let i = 0; i < _data.PreviousAndNextEvents.RaceEvent.length; i++) {
            obj = {
                "EventTime": this.ReturnTime(_data.PreviousAndNextEvents.RaceEvent[i].attributes.EventTime),
                "FinishTime": this.ReturnTime(_data.PreviousAndNextEvents.RaceEvent[i].attributes.FinishTime)
            };
            this.allGameTime.push(obj);
        }
        await this.SetTimerValue();
    };

    /**
    * Return live time in split format hour:min:sec
    * @public 
    * @param {time} _liveTime - time of the live time
    * @returns {null} 
    */
    ReturnTime(_liveTime) {
        let time = null;
        time = _liveTime.split(":");
        return time;
    };

    /**
    * Set value in timer
    * @public 
    * @param {Number} - value of the timer
    * @returns {null} 
    */
    SetTimerText(_value) {
        document.getElementById("timer").innerText = _value;
    };

    ShowRaceNumberWhenTimerAnimationShowing() {
        let raceNum = Constant.selectedEvent.attributes.EventNumber;
        let moreTimerObj = document.getElementById("bet_close_time_more_visible_race_number");
        moreTimerObj.innerText = raceNum;
    };

}
//#endregion