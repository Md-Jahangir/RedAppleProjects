/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 17-03-2023.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 12-05-2023
 * @Description :- Handles all dom related task.
 ************************************/

//#region - importing required scripts 
// import { Database } from "../core/Database";
import { GameManager } from "../core/GameManager.js";
import { Server } from "../services/Server.js";
import { Constant } from "./Constant.js";
import { Loader } from "./Loader.js";
import { Localization } from "./Localization.js";
import { Popup } from "./Popup.js";
import { Utils } from "./Utils.js";
//#endregion

//#region - Class defination 
export default class DomHandler {
    /**
    * initializes variables.
    * @Constructor
    */
    constructor() {
        this.buyBetSlipDisabled = false;
        this.AddListenerToNextEventTime();
        this.AddListenerToFutureEventTime();
        this.AddListenerToSearchButton();
        this.AddListenerToResetButton();
        this.AddListenerToBuyBetSlipButton();
        this.AddListenerToPlaceBetButton();
        this.AddListenerToLiveEventTime();
        this.AddListenerToPreviousEventTime();
        this.AddEventListenerToCommonOddsTableSearchButton();
        this.AddEventListenerToRightSideTabButton();

        this.AddListenerToPastRaceResultButton();
    };

    //-----------------Live Event Time Section-------------------------------
    AddEventListenerToRightSideTabButton() {
        let rightSideBetSlipPurchaseObj = document.getElementById("right_bet_slip_purchase_tab");
        rightSideBetSlipPurchaseObj.addEventListener("click", () => {
            this.ShowParticularTabSection("BetSlip");
        });

        let rightSideGameResultObj = document.getElementById("right_game_result_tab");
        rightSideGameResultObj.addEventListener("click", () => {
            this.ShowParticularTabSection("GameResult");
        });

        let rightSideOddsObj = document.getElementById("right_odds_tab");
        rightSideOddsObj.addEventListener("click", () => {
            this.ShowParticularTabSection("Odds");
            GameManager.betManager.DisplayOddsTable(GameManager.betManager.selectedBetTypeIndex);
        });

        let rightHiloTabObj = document.getElementById("right_hilo_tab");
        rightHiloTabObj.addEventListener("click", () => {
            this.ShowParticularTabSection("HiLo");
        });

        let rightOddevenTabObj = document.getElementById("right_oddeven_tab");
        rightOddevenTabObj.addEventListener("click", () => {
            this.ShowParticularTabSection("OddEven");
        });

        //----------Mobile-------------
        let lefttSideBetSlipPurchaseObj = document.getElementById("left_bet_slip_purchase_tab");
        lefttSideBetSlipPurchaseObj.addEventListener("click", () => {
            this.ShowParticularTabSection("BetSlip");
        });

        let leftSideGameResultObj = document.getElementById("left_game_result_tab");
        leftSideGameResultObj.addEventListener("click", () => {
            this.ShowParticularTabSection("GameResult");
        });

        let leftSideOddsObj = document.getElementById("left_odds_tab");
        leftSideOddsObj.addEventListener("click", () => {
            this.ShowParticularTabSection("Odds");
            GameManager.betManager.DisplayOddsTable(GameManager.betManager.selectedBetTypeIndex);
        });

        let leftHiloTabObj = document.getElementById("left_hilo_tab");
        leftHiloTabObj.addEventListener("click", () => {
            this.ShowParticularTabSection("HiLo");
        });

        let leftOddevenTabObj = document.getElementById("left_oddeven_tab");
        leftOddevenTabObj.addEventListener("click", () => {
            this.ShowParticularTabSection("OddEven");

        });
    };

    ShowParticularTabSection(_id) {
        let betSlipPurchaseTableObj = document.getElementById("betSlipPurchaseHistoryTab");
        let gameResultTableObj = document.getElementById("GameResults");
        let oddsTableObj = document.getElementById("Odds");
        let hiloTableObj = document.getElementById("HiLo");
        let oddEvenTableObj = document.getElementById("oddeven");

        betSlipPurchaseTableObj.style.display = "none";
        gameResultTableObj.style.display = "none";
        oddsTableObj.style.display = "none";
        hiloTableObj.style.display = "none";
        oddEvenTableObj.style.display = "none";

        switch (_id) {
            case "BetSlip":
                betSlipPurchaseTableObj.style.display = "block";
                break;
            case "GameResult":
                gameResultTableObj.style.display = "block";
                break;
            case "Odds":
                oddsTableObj.style.display = "block";
                break;
            case "HiLo":
                hiloTableObj.style.display = "block";
                break;
            case "OddEven":
                oddEvenTableObj.style.display = "block";
                break;
        }
    };

    /**
    * Add click event to live time section.
    *  @returns {null}
    */
    AddListenerToLiveEventTime() {
        let liveEventObj = document.getElementById("live");
        liveEventObj.addEventListener("click", async () => {
            await GameManager.OnLiveRaceEventTimePressed(liveEventObj);
        });
    };

    AddListenerToPastRaceResultButton() {
        document.getElementById("pastRaceResultButtonText").addEventListener("click", () => {
            let winObj = window.open("pastResult.html?token=" + Server.token +
                "&sessionid=" + Constant.sessionId + "&gametype=" + Constant.gameType +
                "&languagecode=" + Constant.languageCode
                , "_blank");
        });
    };
    //---------------------------------------------------------------

    //-----------------Immediate Next Event Time Section-------------------------------
    /**
    * Add click event to immediate next time section.
    *  @returns {null}
    */
    AddListenerToNextEventTime() {
        let nextEventObj = document.getElementById("next");
        nextEventObj.addEventListener("click", () => {
            GameManager.OnRaceEventTimePressed(nextEventObj);
        });
    };
    //---------------------------------------------------------------

    //-----------------Future Event Time Section-------------------------------
    /**
    * Add click event to all the future time section.
    *  @returns {null}
    */
    AddListenerToFutureEventTime() {
        let futureEvtObj = document.getElementById("time_sec2").children;
        for (let i = 0; i < futureEvtObj.length; i++) {
            futureEvtObj[i].addEventListener("click", () => {
                GameManager.OnRaceEventTimePressed(futureEvtObj[i]);
            });
        }
    };

    AddListenerToPreviousEventTime() {
        let previousEvtObj = document.getElementById("time_sec1").children;
        for (let i = 0; i < previousEvtObj.length; i++) {
            previousEvtObj[i].addEventListener("click", () => {
                GameManager.OnPreviousRaceEventTimePressed(previousEvtObj[i]);
            });
        }
    };

    //---------------------------------------------------------------

    //-----------------Buy Bet Slip Button-------------------------------
    /**
    * Add click event to buy bet slip button.
    *  @returns {null}
    */
    AddListenerToBuyBetSlipButton() {
        document.getElementById("BuyBetSlip").addEventListener("click", () => {
            GameManager.OnBuyBetSlipPressed();
        });
    };
    //---------------------------------------------------------------

    //-----------------Reset Button-------------------------------
    /**
    * Add click event to reset button.
    *  @returns {null}
    */
    AddListenerToResetButton() {
        document.getElementById("Reset").addEventListener("click", () => {
            GameManager.OnResetButtonPressed();
        });
    };
    //---------------------------------------------------------------

    //-----------------Search Button-------------------------------
    /**
    * Add click event to search button.
    *  @returns {null}
    */
    async AddListenerToSearchButton() {
        let raceNumber;
        let raceStartTime;
        document.getElementById("basic-addon2").addEventListener("click", async () => {
            raceNumber = document.getElementById("event_number_input").value.trim();
            raceStartTime = document.querySelector("#race_start_time").innerHTML;
            if (!Utils.IsEmpty(raceNumber)) {
                let eventHistoryResponse = await Server.EventHistoryApi(raceNumber, Constant.userId, raceStartTime, Constant.sessionId);
                if (eventHistoryResponse.error == false) {
                    if (eventHistoryResponse.data.data.length > 0) {
                        this.SetBetSlipPurchaseHistory(
                            eventHistoryResponse.data.data[0].bet_start_time,
                            eventHistoryResponse.data.data[0].race_number,
                            eventHistoryResponse.data.data[0].bet_result,
                            eventHistoryResponse.data.total_purchase_amount.toLocaleString("en-US"),
                            eventHistoryResponse.data.total_win_amount.toLocaleString("en-US"),
                        );
                        let posVal = null;
                        document.querySelector("#BetPurchaseHistory").innerHTML = "";
                        eventHistoryResponse.data.data.forEach(element => {
                            if (element.position != null) {
                                posVal = element.position.split(",");
                                for (let i = posVal.length; i < 3; i++) {
                                    posVal.push("-");
                                }
                            }
                            else {
                                posVal = ['-', '-', '-'];
                            }
                            this.ShowPurchaseHistory(true, element.bet_type_name, posVal[0], posVal[1], posVal[2],
                                element.odds, element.bet_amount, element.win_amount, element.status, element.bet_start_time, element.race_number, element.bet_result);

                        });
                    } else {
                        this.ShowPurchaseHistory(false);
                        Popup.ShowErrorPopup(Localization.noDataFoundText);
                    }
                } else {
                    Popup.ShowErrorPopup(eventHistoryResponse.message);
                }
            } else {
                this.ShowPurchaseHistory(false);
                Popup.ShowErrorPopup(Localization.pleaseSelectTheRaceNumberText);
            }
        });
    };

    async AddEventListenerToCommonOddsTableSearchButton() {
        let raceNumber;
        let raceStartTime;
        let winSeqObj;
        document.getElementById("all_common_odds_table_search_button").addEventListener("click", async () => {
            Loader.ShowOddsTableValueUpdateLoader();
            raceNumber = document.getElementById("all_common_odd_all_race_number").value.trim();
            if (!Utils.IsEmpty(raceNumber)) {
                let specificResultResp = await Server.GetSpecificEventResult(raceNumber, Constant.sessionId);
                if (specificResultResp.error == false) {
                    raceStartTime = this.ConverRaceStartTimeToLocalTime(specificResultResp.data.Event.RaceEvent.attributes.EventTime);
                    if (specificResultResp.data.Event.RaceEvent.attributes.Result) {
                        winSeqObj = specificResultResp.data.Event.RaceEvent.attributes.Result;
                    } else {
                        winSeqObj = "";
                    }
                } else {
                    Popup.ShowErrorPopup(specificResultResp.message);
                    Loader.HideOddsTableValueUpdateLoader();
                }
                await GameManager.eventTimeManager.oddsManager.GetSingleOddsData(raceNumber);
                await GameManager.eventTimeManager.oddsManager.GetCombinationOddsData(raceNumber);
                await GameManager.eventTimeManager.oddsManager.SetEventNumberOfOddsSection(specificResultResp.data.Event.RaceEvent.attributes.EventNumber);
                await GameManager.eventTimeManager.oddsManager.SetRaceStartTimeOfOddsSection(raceStartTime);
                await GameManager.eventTimeManager.oddsManager.SetWinningSequenceOfOddsSection(winSeqObj);
                await GameManager.betManager.OnLiveOrPreviousEventShowOdds();
                await GameManager.betManager.CheckWhetherRaceFinishedOrNot(raceNumber);
            } else {
                Popup.ShowErrorPopup(Localization.pleaseSelectTheRaceNumberText);
                Loader.HideOddsTableValueUpdateLoader();
            }
        });
    };

    ConverRaceStartTimeToLocalTime(_time) {
        let serverTime = _time;
        serverTime = serverTime.split("T");
        let actualServerTime = serverTime[1].split(":");
        let convertedTime = Utils.ConvertUtcTimeToLocal(actualServerTime[0], actualServerTime[1], actualServerTime[2]);
        return convertedTime;
    };

    ClearAllTheWinningSequenceFromOddsTable() {
        let winSeqObj = document.getElementById("all_common_odd_winning_sequence").innerText = "";
    };

    ClearAllTheEventNumberFromOddSection() {
        let dropDownobj = document.getElementById("all_common_odd_all_race_number");
        if (dropDownobj.selectedIndex != 0) {
            dropDownobj.remove(dropDownobj.selectedIndex);
        }
    };

    /**
    * Set the inner text to the dom element.
    * @param {string} _startTime - race start time
    * @param {string} _raceNumber - race number
    * @param {string} _resultSeq - result sequence of the race
    * @param {string} _totalBetAmount - total bet amount of the race
    * @param {string} _totalWinAmount - total win amount of the race
    * @returns {null} 
    */
    SetBetSlipPurchaseHistory(_startTime, _raceNumber, _resultSeq, _totalBetAmount, _totalWinAmount,) {
        document.getElementById("purchase_history_bet_start_time").innerText = _startTime;
        document.getElementById("purchase_history_race_number").innerText = _raceNumber;
        document.getElementById("purchase_history_bet_result").innerText = Localization.winningSequenceTextCapsLetter + " - " + _resultSeq;
        document.getElementById("purchase_history_total_bet_amount").innerText = _totalBetAmount;
        document.getElementById("purchase_history_search_total_bet_amount").innerText = _totalBetAmount;
        document.getElementById("purchase_history_total_win_amount").innerText = _totalWinAmount;
        document.getElementById("purchase_history_search_total_win_amount").innerText = _totalWinAmount;
    };

    /**
    * Reset the inner text of the dom element for bet slip purchase histroy.
    * @returns {null} 
    */
    ResetBetSlipPurchaseHistory() {
        document.getElementById("purchase_history_bet_start_time").innerText = "";
        document.getElementById("purchase_history_race_number").innerText = "";
        document.getElementById("purchase_history_bet_result").innerText = "";
        document.getElementById("purchase_history_total_bet_amount").innerText = "";
        document.getElementById("purchase_history_total_win_amount").innerText = "";
        document.getElementById("purchase_history_search_total_bet_amount").innerText = "";
        document.getElementById("purchase_history_search_total_win_amount").innerText = "";
    };

    /**
    * Set the value to the dom elemenyt for purchase history.
    * @param {boolean} _bool - will update or not
    * @param {string} _betType - bet type
    * @param {string} _1st - 1st position
    * @param {string} _2nd - 2nd position
    * @param {string} _3rd - 3rd position
    * @param {string} _odds - purchase amount
    * @param {string} _betAmount - bet amount
    * @param {string} _winAmount - win amount
    * @param {string} _status - status of result
    * @returns {null} 
    */
    ShowPurchaseHistory(_bool, _betType, _1st, _2nd, _3rd, _odds, _betAmount, _winAmount,
        _status, _betStartTime, _raceNumber, _resultSeq) {
        if (_bool) {
            let fontRedClass = "";
            if (_status.toUpperCase() == "WIN") {
                fontRedClass = "red_font_color";
            } else {
                fontRedClass = "black_font_color";
            }
            document.querySelector("#BetPurchaseHistory").insertAdjacentHTML('beforeend',
                '<tr class =' + fontRedClass + '>' +
                '<td>' + _betType + '</td>' +
                '<td>' + _1st + '</td>' +
                '<td>' + _2nd + '</td>' +
                '<td>' + _3rd + '</td>' +
                '<td>' + _odds + '</td>' +
                '<td>' + parseFloat(_betAmount).toLocaleString("en-US") + '</td>' +
                '<td>' + parseFloat(_winAmount).toLocaleString("en-US") + '</td>' +
                '<td>' + _status.toUpperCase() + '</td>' +
                '<td>' + _betStartTime + '</td>' +
                '<td>' + _raceNumber + '</td>' +
                '<td>' + _resultSeq + '</td>' +
                '</tr>'
            );
        } else {
            document.querySelector("#BetPurchaseHistory").innerHTML = "";
            document.querySelector("#BetPurchaseHistory").insertAdjacentHTML('beforeend',
                '<tr>' +
                '<td>-</td>' +
                '<td>-</td>' +
                '<td>-</td>' +
                '<td>-</td>' +
                '<td>-</td>' +
                '<td>-</td>' +
                '<td>-</td>' +
                '<td>-</td>' +
                '<td>-</td>' +
                '<td>-</td>' +
                '<td>-</td>' +
                '</tr>'
            );
        }
    }
    //---------------------------------------------------------------

    //-----------------Create New bet slip Section-------------------------------
    /**
    * Create bet silp when buy bet slip pressed.
    * @param {string} _raceNumber - race number
    * @param {string} _bettingName - bet name 
    * @param {string} _selectedPosition - position to where bet place
    * @param {string} _raceStartTime - race start time
    * @returns {null} 
    */
    CreateNewBetSlip(_raceNumber, _bettingName, _selectedPosition, _raceStartTime,
        _bettingAmount, _raceStatus, _betStatus, _winAmount, _oddValue, _gameResult) {
        if (_bettingName == "HIGH LOW") {
            _bettingName = Localization.hiorLoText;
        } else if (_bettingName == "ODD EVEN") {
            _bettingName = Localization.oddorEvenText;
        }
        let objString = "";
        let bettingClass = ' class="betting_box ">'
        if (_raceStatus == "Over") {
            bettingClass = ' class="betting_box betting_box_shadow">'
        }
        objString = '<div id=' + _raceNumber + bettingClass +

            '<div class="row">' +
            '<div class="col-sm-4 col-4">' +
            '<div class="blue_stripe_bar">' +
            '<p>' + Localization.bettingTypeText + _bettingName.toUpperCase() + '</p>' +
            '</div>' +
            '</div>' +
            '<div class="col-sm-4 col-4">' +
            '<div class="blue_stripe_bar text-center">' +
            '<p>' + Localization.bettingAreaOddsText + _oddValue + '</p>' +
            '</div>' +
            '</div>' +
            '<div class="col-sm-4 col-4">' +
            '<div class="blue_stripe_bar text-end">' +
            '<p>' + Localization.positionTextCapsLetter + _selectedPosition + '</p>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '<div class="row">' +
            '<div class="col-sm-6 col-6">' +
            '<div class="blue_stripe_bar">' +
            '<p>' + Localization.bettingAreaRaceNumberText + _raceNumber + '</p>' +
            '</div>' +
            '</div>' +
            '<div class="col-sm-6 col-6">' +
            '<div class="blue_stripe_bar text-end">' +
            '<p>' + Localization.bettingAreaRaceStartTimeText + _raceStartTime + '</p>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '<div class="row m-0 bg-white b-radius">' +
            '<div class="col-4 betAmount_box">' + Localization.betAmountText + '<span>' + _bettingAmount.toLocaleString("en-US") + '</span></div>'
        if (_winAmount > 0) {
            objString = objString +
                '<div class="col-8 winAmount_box text-end">' + Localization.winningSequenceTextCapsLetter + " - " + _gameResult + " / " + Localization.betSlipWinAmountText + '<span>' + _winAmount.toLocaleString("en-US") + '</span></div>'
        }
        objString = objString +
            '</div>'

        document.querySelector("#betting-area").insertAdjacentHTML('afterbegin',
            objString
        );
        let obj = document.querySelector("#betting-area");
        if (obj.children.length > 3) {
            obj.parentNode.classList.add("scroll_box", "bet_rest");
        }

    };

    // ===============================================
    AddListenerToPlaceBetButton() {
        document.getElementById("place_combination_Bet").addEventListener("click", () => {
            GameManager.OnPlaceBetButtonPressed();

        });
    };
    ResetMultiBetCombArea() {
        let obj = document.getElementById("multibet_combination_area");
        if (obj) {
            obj.innerHTML = "";
        }
        GameManager.allMultibetCombinationData = [];
        GameManager.ShowBuyBetSlipButton();
    };
    CreateMultibetCombination(_raceNumber, _bettingName, _bettingAmount, _raceStartTime, _selectedPosition, _oddValue, _estimateWinAmount, _index) {

        let objString = "";
        let betPosToShow;
        if (_selectedPosition == "H" || _selectedPosition == "L" || _selectedPosition == "O" || _selectedPosition == "E") {
            betPosToShow = GameManager.betManager.ShowBetPositionNameForHiLoOddEven(_selectedPosition);
        } else {
            betPosToShow = _selectedPosition;
        }

        objString = '<div id=bet_comb_slip_' + _index + ' class="betting_box ">' +
            '<div class="cross_main"><img class="w-100" id="crossButtonSec_' + _index + '" src="assets/images/cross_button.png" alt=""/></div>' +
            '<div class="row">' +
            '<div class="col-sm-4 col-4">' +
            '<div class="blue_stripe_bar">' +
            '<p>' + Localization.bettingTypeText + _bettingName + '</p>' +
            '</div>' +
            '</div>' +
            '<div class="col-sm-4 col-4">' +
            '<div class="blue_stripe_bar text-center">' +
            '<p>' + Localization.bettingAreaOddsText + _oddValue + '</p>' +
            '</div>' +
            '</div>' +
            '<div class="col-sm-4 col-4">' +
            '<div class="blue_stripe_bar text-end">' +
            '<p>' + Localization.positionTextCapsLetter + betPosToShow + '</p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col-sm-6 col-6">' +
            '<div class="blue_stripe_bar">' +
            '<p>' + Localization.bettingAreaRaceNumberText + _raceNumber + '</p>' +
            '</div>' +
            '</div>' +
            '<div class="col-sm-6 col-6">' +
            '<div class="blue_stripe_bar text-end">' +
            '<p>' + Localization.bettingAreaRaceStartTimeText + _raceStartTime + '</p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="row m-0 bg-white b-radius">' +
            '<div class="col-6 betAmount_box">' + Localization.betAmountText + '<span>' + _bettingAmount.toLocaleString("en-US") + '</span></div>'

        objString = objString +
            '<div class="col-6 combo_slip_est_amt text-end">' + Localization.estimateWinAmountText + " : " + '<span>' + _estimateWinAmount.toLocaleString("en-US") + '</span></div>'

        objString = objString +
            '</div>'

        document.querySelector("#multibet_combination_area").insertAdjacentHTML('beforeend',
            objString
        );

        let obj = document.querySelector("#multibet_combination_area");

        this.AddEventListenerCombBetToCrossButton(_index);
    };
    AddEventListenerCombBetToCrossButton(_index) {
        let className = document.getElementById("crossButtonSec_" + _index);
        className.addEventListener("click", () => {
            this.OnCrossButtonPressed(_index);
        });
    };

    OnCrossButtonPressed(_index) {
        let divObj = document.getElementById("bet_comb_slip_" + _index);
        let betSlipContainer = document.querySelector("#multibet_combination_area");
        betSlipContainer.removeChild(divObj);

        GameManager.allMultibetCombinationData.splice(_index, 1);
        if (GameManager.allMultibetCombinationData.length == 0 || GameManager.allMultibetCombinationData == null) {
            GameManager.ShowBuyBetSlipButton();
        }
    };

    //---------------------------------------------------------------
};
//#endregion 