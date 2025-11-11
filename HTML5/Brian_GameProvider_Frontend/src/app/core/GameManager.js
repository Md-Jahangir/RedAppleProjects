/********* Script_Details ************
 * @Original_Creator :- Md jahangir.
 * @Created_Date :- 09-03-2023.
 * @Last_Update_By :- Md jahangir.
 * @Last_Updatd_Date :- 11-05-2023
 * @Description :- Handles flow of the game. All the scripts are manipulted from here.
 ************************************/

//#region - importing required scripts 
import GameHistoryManager from "./GameHistoryManager.js";
import EventTimeManager from "./EventTimeManager.js";
import GameTimeManager from "./GameTimeManager.js";
import { Server } from "../services/Server.js";
import { Constant } from "../components/Constant.js";
import DomHandler from "../components/DomHandler.js";
import BetManager from "./BetManager.js";
import { Popup } from "../components/Popup.js";
import { Utils } from "../components/Utils.js";
import { Loader } from "../components/Loader.js";
import moment from "moment/moment.js";
import "moment-timezone";
import { Localization } from "../components/Localization.js";
import ModalOddsManager from "./ModalOddsManager.js";

//#endregion

//#region - Class defination 
class GameManager {
    /**
     * Create class instance and initializes variables.
     * @Constructor
     */
    constructor() {
        this.gameHistoryManager = null;
        this.eventTimeManager = null;
        this.domHandler = null;
        this.gameTimeManager = null;
        this.betManager = new BetManager();
        this.modalOddsManager = new ModalOddsManager();

        this.CreateCoinAnimation();

        this.allMultibetCombinationData = [];
    };

    CreateCoinAnimation() {
        new spine.SpinePlayer("coin_animation_new", {
            alpha: true,
            jsonUrl: "assets/images/skeleton.json",
            atlasUrl: "assets/images/skeleton.atlas",
            animation: "Coin_Animation_Loop",
            showControls: false,
        });
    };

    ShowCoinAnimation() {
        let animObj = document.getElementById("coin_animation_new");
        animObj.style.display = "block";
    };

    HideCoinAnimation() {
        let animObj = document.getElementById("coin_animation_new");
        animObj.style.display = "none";
    };

    /**
     * Set the Current local time
     *@returns {null} 
    **/
    SetCurrentTime() {
        let timeZone = moment.tz.guess();
        let time = moment().tz(timeZone).format("HH:mm:ss");
        let userTimeObj = document.getElementById("usertime");
        userTimeObj.innerText = "";
        userTimeObj.innerText = time;
    };

    /**
     * Set the Current user name
     *@returns {null} 
    **/
    SetUserName() {
        let userNameTextObj = document.getElementById("provider_name_sec");
        userNameTextObj.innerText = "";
        userNameTextObj.innerText = Constant.userName;
    }

    /**
     * Get the server time from api.
     *@returns {null} 
    **/
    async GetServerTime() {
        let response = await Server.GetServerTime(Constant.sessionId);
        if (response.error == false) {
            let timeDiff = await this.CheckTimeDifference(response);
            if (timeDiff) {
                let obj = {
                    "LocalTime": response.data.ServerTime.attributes.LocalTime,
                    "RoundTripTime": response.data.ServerTime.attributes.RoundTripTime,
                    "UtcTime": response.data.ServerTime.attributes.UtcTime,
                };
                Constant.SetServerTime(obj);
            } else {
                Popup.ShowErrorPopup(Localization.IssueWithServerTimePleaseRefreshThePageText);
            }
        } else {
            Popup.ShowErrorPopup(response.message);
        }
        return (null);
    };

    /**
     * Check server time with users local time . The difference between two times should be less than 10 .
     * @param {string} _responseData - response data from api
     * @returns {null} 
    **/
    async CheckTimeDifference(_responseData) {
        let actualServerTime = [];
        let userLocalTime = [];

        let localTime = _responseData.data.ServerTime.attributes.LocalTime;
        localTime = localTime.split("T");
        let serverTime = localTime[1];
        actualServerTime = serverTime.split(":");
        actualServerTime = Utils.ConvertUtcTimeToLocal(actualServerTime[0], actualServerTime[1], actualServerTime[2]);
        actualServerTime = actualServerTime.split(":");
        let timeZone = moment.tz.guess();
        let usertime = moment().tz(timeZone).format("HH:mm:ss");
        userLocalTime = usertime.split(":");

        if (
            parseFloat(actualServerTime[0]) === parseInt(userLocalTime[0]) &&
            parseInt(actualServerTime[1]) === parseInt(userLocalTime[1]) &&
            parseInt(actualServerTime[2]) === parseInt(userLocalTime[2])

        ) {
            return true;
        } else if (
            parseInt(actualServerTime[2]) > parseInt(userLocalTime[2]) &&
            (parseInt(actualServerTime[2]) - parseInt(userLocalTime[2])) < 10
        ) {
            return true;
        } else if (
            parseInt(userLocalTime[2]) > parseInt(actualServerTime[2]) &&
            (parseInt(userLocalTime[2]) - parseInt(actualServerTime[2])) < 10
        ) {
            return true;
        } else {
            return false;
        }
    };

    /**
     * Set bet slip amount to dom element
     *  @param {number} _amount - amount
     * @returns {null} 
    **/
    SetBetSlipAmount(_amount) {
        let betSlipObj = document.getElementById("betSlipAmount");
        let convertAmount = parseInt(_amount).toLocaleString("en-US");
        betSlipObj.innerText = "";
        betSlipObj.innerText = convertAmount;
    };

    /**
     * Set total user balance to dom element.
     *  @param {number} _amount - amount
     * @returns {null} 
    **/
    SetTotalAvailableBalance(_amount) {
        let balanceObj = document.getElementById("availableBalance");
        let convertAmount = parseInt(_amount.replaceAll(",", ""));

        balanceObj.innerText = "";
        balanceObj.innerText = convertAmount.toLocaleString("en-US");
    };

    /**
     * Set total purchase amount to dom element.
     * @param {number} _amount - amount
     * @returns {null} 
    **/
    SetTotalPurchaseAmount(_amount) {
        let totalPurchaseAmountObj = document.getElementById("totalPurchaseAmount");
        totalPurchaseAmountObj.innerText = "";
        totalPurchaseAmountObj.innerText = parseInt(_amount).toLocaleString("en-US");
    }

    /**
     * Create the game history object.
     * @returns {null} 
    **/
    SetGameHistoryData() {
        this.gameHistoryManager = new GameHistoryManager();
    };

    /**
     * Create and show all the session bets.
     * @returns {null} 
    **/
    async GetAllSessionBets() {
        let sumOfTotalBetAmount = 0;
        let response = await Server.GetSessionBets(Constant.sessionId, Constant.gameId);
        let obj = document.getElementById("betting-area");
        if (obj) {
            obj.innerHTML = "";
        }
        if (response.error == false) {
            if (response.data.length > 0) {
                for (let i = 0; i < response.data.length; i++) {
                    sumOfTotalBetAmount += response.data[i].bet_amount;
                    let betPos = response.data[i].bet_position;
                    betPos = betPos.split(",");
                    betPos = betPos.join("-");
                    let oddVal;
                    if (response.data[i].is_lowest == 1) {
                        oddVal = response.data[i].odds + Localization.lowestText;
                    } else {
                        oddVal = response.data[i].odds;
                    }
                    let betPosToShow = null;
                    if (betPos == "H" || betPos == "L" || betPos == "O" || betPos == "E") {
                        betPosToShow = this.betManager.ShowBetPositionNameForHiLoOddEven(betPos);
                    } else {
                        betPosToShow = betPos;
                    }
                    this.domHandler.CreateNewBetSlip(response.data[i].race_number, response.data[i].bet_type, betPosToShow,
                        response.data[i].race_time, response.data[i].bet_amount, response.data[i].race_status,
                        response.data[i].bet_status, response.data[i].win_amount, oddVal, response.data[i].game_result);

                }
                this.SetTotalPurchaseAmount(sumOfTotalBetAmount);
            }
        } else {
            Popup.ShowErrorPopup(response.message);
        }
    };

    /**
     * Show session bets loader animation.
     * @returns {null} 
    **/
    ShowSessionBetsLoader() {
        let sessionLoadingbj = document.getElementById("session_bets_loader");
        sessionLoadingbj.style.display = "block";
    };
    /**
     * Hide session bets loader animation.
     * @returns {null} 
    **/
    HideSessionBetsLoader() {
        let sessionLoadingbj = document.getElementById("session_bets_loader");
        sessionLoadingbj.style.display = "none";
    };


    ShowBetCombinationSlipLoader() {
        let multiBetLoaderObj = document.getElementById("multibet_comb_bets_loader");
        multiBetLoaderObj.style.display = "block";
    };
    /**
     * Hide session bets loader animation.
     * @returns {null} 
    **/
    HideBetCombinationSlipLoader() {
        let multiBetLoaderObj = document.getElementById("multibet_comb_bets_loader");
        multiBetLoaderObj.style.display = "none";
    };

    ShowWinAmountOnWinAnimation(_amount) {
        let amountObj = document.getElementById("win_loose_anim_total_win_amount");
        amountObj.innerHTML = Localization.winText + '<i class="fa fa-krw" style="font-size: 20px;">' + parseInt(_amount).toLocaleString("en-US");

        let animObj = document.getElementById("win_loose_anim_sec");
        animObj.style.display = "block";
        this.ShowCoinAnimation();

        let audioObj = document.getElementById("coin_anim_sound");
        audioObj.play();

        this.HideWinAmountOnWinAnimation();
    };

    ShowLooseOnWinAnimation(_amount) {
        let amountObj = document.getElementById("win_loose_anim_total_win_amount");
        let animObj = document.getElementById("win_loose_anim_sec");
        animObj.style.display = "block";

        this.HideWinAmountOnWinAnimation();
    };

    HideWinAmountOnWinAnimation() {
        setTimeout(() => {
            let animObj = document.getElementById("win_loose_anim_sec");
            animObj.style.display = "none";
            this.HideCoinAnimation();
            let audioObj = document.getElementById("coin_anim_sound");
            audioObj.pause();
        }, 10000);
    };

    /**
     * Create the event time manager object.
     * @returns {null}
            **/
    SetAllEventTime() {
        this.eventTimeManager = new EventTimeManager();
    };

    /**
     * Create the domhandler object.
     * @returns {null}
            **/
    SetAllEventListener() {
        this.domHandler = new DomHandler();
    };

    /**
     * Create the bet area.
     * @returns {null}
            **/
    SetAllBetConfiguration() {
        this.betManager.GetAllBetsData();
    }

    /**
     * Create the game time manager object.
     * @returns {null}
            **/
    CreateObjectOfGameTimeManager() {
        this.gameTimeManager = new GameTimeManager();
    }

    /**
    * Set the time from response.
    * @param {number} _obj - amount
    * @returns {null}
    **/
    async SetGameTime(_obj) {
        await this.gameTimeManager.SetAllTime(_obj);
    };

    /**
     * Update number of players.
     * @param {number} _numberOfPlayer - how many player
            * @returns {null}
            **/
    UpdateNumberOfPlayers(_numberOfPlayer) {
        this.betManager.ClearAllTheOddsActiveClass();
        this.betManager.ConfigureBetType(_numberOfPlayer);
        this.betManager.ResetSelectedAmount();

    };

    /**
     * get specific result.
     * @param {number} _eventId -race number
            * @returns {object}
            **/
    async GetSpecificEventResultData(_eventId) {
        let response = await Server.GetSpecificEventResult(_eventId, Constant.sessionId);
        let data = await this.GetBetResult(_eventId);
        return response;
    }

    /**
     * get bet result.
     * @param {number} _eventId -race number
            * @returns {null}
            **/
    async GetBetResult(_eventId) {
        let response = await Server.EventResultApi(
            Constant.operatorId, Constant.userId, _eventId, Constant.playerToken,
            Constant.playerId, Constant.currencyCode, Constant.sessionId, Constant.gameId
        );
        if (response.error == false) {
            try {
                if (response.data.settlement_details) {
                    let hasWon = false;
                    for (let i = 0; i < response.data.settlement_details.length; i++) {
                        if (response.data.settlement_details[i].result_status == "Win") {
                            hasWon = true;
                        }
                    }
                    if (hasWon) {
                        let balanceResponse = await Server.GetUserBalance(
                            Constant.playerToken,
                            Constant.operatorId,
                            Constant.playerId,
                            Constant.currencyCode,
                            Constant.sessionId
                        );
                        if (balanceResponse.error == false) {
                            if (balanceResponse.data) {
                                this.SetTotalAvailableBalance(balanceResponse.data.Amount);
                                Constant.SetUserBalance(parseInt(balanceResponse.data.Amount.replaceAll(",", "")));
                            }
                        } else {
                            Popup.ShowErrorPopup(balanceResponse.message);
                        }
                        this.ShowWinAmountOnWinAnimation(response.data.total_win_amount);
                    }
                }
            } catch { }

        } else {
            Popup.ShowErrorPopup(response.message);
        }
    };

    /**
    * Show the result in dom elemet.
    * @param {number} _raceNumber -race number
            * @param {number} _resultSeq -result sequence
            * @param {number} _raceStartTime -race start time
            * @returns {null}
            **/
    ShowResultSectionUI(_raceNumber, _resultSeq, _raceStartTime) {
        let gameResultObj = document.getElementById("game_result");
        gameResultObj.children[0].children[0].innerText = Localization.resultRaceNumberText + _raceNumber + Localization.resultRaceStartTimeText + _raceStartTime + Localization.resultWinningSequenceText + _resultSeq;
        gameResultObj.style.display = "block";
        this.HideResultSectionUI();
    };

    /**
    * Hide the result of dom elemet.
    * @returns {null}
            **/
    HideResultSectionUI() {
        let gameResultObj = document.getElementById("game_result");
        setTimeout(() => {
            gameResultObj.style.display = "none";
        }, 15000);
    };

    /**
    * Handle race time pressed.
    *  @param {number} _obj -pressed object
            * @returns {null}
            **/
    async OnRaceEventTimePressed(_obj) {
        Loader.ShowLoader();
        this.domHandler.ClearAllTheWinningSequenceFromOddsTable();
        this.SetParticularColorForRaceEventTime(_obj);
        this.eventTimeManager.UpdateSeletedEvent(_obj.children[0]);
        this.UpdateNumberOfPlayers(Constant.selectedEvent.Entry.length);
        this.eventTimeManager.oddsManager.GetSingleOddsData(Constant.selectedEvent.attributes.ID);
        this.eventTimeManager.oddsManager.GetCombinationOddsData(Constant.selectedEvent.attributes.ID);
        this.eventTimeManager.oddsManager.SetEventNumberOfOddsSection(Constant.selectedEvent.attributes.EventNumber);
        this.eventTimeManager.oddsManager.SetRaceStartTimeOfOddsSection(Constant.selectedEvent.attributes.EventTime);
        await this.betManager.GetAllPlayersRatingData(Constant.selectedEvent.attributes.ID);
        await this.betManager.CheckWhetherRaceFinishedOrNot(Constant.selectedEvent.attributes.ID);
    };

    async OnLiveRaceEventTimePressed(_obj) {
        Loader.ShowLoader();
        this.domHandler.ClearAllTheWinningSequenceFromOddsTable();
        this.SetParticularColorForRaceEventTime(_obj);
        Constant.SetSeletedEvent(this.eventTimeManager.nextRaceEventData[this.eventTimeManager.liveCounter]);
        await this.eventTimeManager.oddsManager.GetSingleOddsData(Constant.selectedLiveEvent.attributes.ID);
        await this.eventTimeManager.oddsManager.GetCombinationOddsData(Constant.selectedLiveEvent.attributes.ID);
        await this.eventTimeManager.oddsManager.SetEventNumberOfOddsSection(Constant.selectedLiveEvent.attributes.EventNumber);
        await this.eventTimeManager.oddsManager.SetRaceStartTimeOfOddsSection(Constant.selectedLiveEvent.attributes.EventTime);
        this.betManager.OnLiveOrPreviousEventShowOdds();
        await this.betManager.CheckWhetherRaceFinishedOrNot(Constant.selectedLiveEvent.attributes.ID);
        this.betManager.ResetAllBetInputs();
    };

    async OnPreviousRaceEventTimePressed(_obj) {
        Loader.ShowLoader();
        this.domHandler.ClearAllTheWinningSequenceFromOddsTable();
        this.SetParticularColorForRaceEventTime(_obj);
        this.eventTimeManager.UpdateSeletedPreviousEvent(_obj);
        Constant.SetSeletedEvent(this.eventTimeManager.nextRaceEventData[this.eventTimeManager.liveCounter]);
        await this.eventTimeManager.oddsManager.GetSingleOddsData(Constant.selectedPreviousEvent.attributes.ID);
        await this.eventTimeManager.oddsManager.GetCombinationOddsData(Constant.selectedPreviousEvent.attributes.ID);
        await this.eventTimeManager.oddsManager.SetEventNumberOfOddsSection(Constant.selectedPreviousEvent.attributes.EventNumber);
        await this.eventTimeManager.oddsManager.SetRaceStartTimeOfOddsSection(Constant.selectedPreviousEvent.attributes.EventTime);
        this.betManager.OnLiveOrPreviousEventShowOdds();
        await this.betManager.CheckWhetherRaceFinishedOrNot(Constant.selectedPreviousEvent.attributes.ID);
    };

    /**
    * Set particular color for the time event.
    *  @param {number} _obj -pressed object
            * @returns {null}
            **/
    SetParticularColorForRaceEventTime(_obj) {
        this.ResetAllRaceEventTimeColor();
        _obj.classList.add("active_red");
    };

    /**
    * Reset particular color for the time event.
    * @returns {null}
            */
    ResetAllRaceEventTimeColor() {
        let liveObj = document.getElementById("live");
        let nextObj = document.getElementById("next");
        let timeSec1Obj = document.getElementById("time_sec1").children;
        let timeSec2Obj = document.getElementById("time_sec2").children;

        liveObj.classList.remove("active_red");
        nextObj.classList.remove("active_red");
        for (let i = 0; i < timeSec1Obj.length; i++) {
            timeSec1Obj[i].classList.remove("active_red");
        }
        for (let i = 0; i < timeSec2Obj.length; i++) {
            timeSec2Obj[i].classList.remove("active_red");
        }
    };

    async OnBuyBetSlipPressed() {
        this.ShowBetCombinationSlipLoader();
        this.domHandler.ClearAllTheWinningSequenceFromOddsTable();
        this.domHandler.ResetMultiBetCombArea();
        this.DisableBuyBetSlipButton();
        let availableBalance = Constant.GetUserBalance();
        let betCloseTime = Constant.GetBetCloseTime();
        let timeZone = moment.tz.guess();
        let currentTime = moment().tz(timeZone).format("HH:mm:ss");
        let betType = this.betManager.ReturnSelectedBetType();
        let betLabel = this.betManager.ReturnSelectedBetTypeLabel();
        let betId = this.betManager.ReturnSelectedBetTypeId();
        let betAmount = this.betManager.ReturnSelectedBetAmount();
        let combBetPosition = this.betManager.ReturnSelectedBetCombinationPosition();

        let allCombinationData = null;
        if (this.betManager.isClikedFromOddsValue) {
            allCombinationData = this.betManager.allOddsValueClikedArray;
        } else {
            allCombinationData = this.betManager.GetMultiBetCombination();
            if (allCombinationData != null) {
                allCombinationData = allCombinationData.combinationArr;
            } else {
                this.HideBetCombinationSlipLoader();
                Popup.ShowErrorPopup(Localization.noValueWillBeNullText);
                this.EnableBuyBetSlipButton();
            }
        }

        let lowestOddValue = this.betManager.GetTheLowestOddValue();
        let isLowestOddValue = 0;
        let betValidationStatus = this.betManager.CheckValidationForComboBet();
        let HowManyCombGenerate;
        let betPos;
        if (betValidationStatus) {
            if (betAmount > 0) {
                if (availableBalance > betAmount) {
                    if (currentTime < betCloseTime) {
                        if (allCombinationData != null) {
                            HowManyCombGenerate = allCombinationData.length;
                            betPos = allCombinationData;
                            for (let i = 0; i < HowManyCombGenerate; i++) {
                                let oddValue = this.betManager.GetOddValueForSelectedPositionForComboBet(betType, betPos[i]);
                                if (oddValue == lowestOddValue) {
                                    isLowestOddValue = 1;
                                } else {
                                    isLowestOddValue = 0;
                                }
                                let obj = {
                                    player_token: Constant.playerToken.toString(),
                                    player_id: Constant.playerId.toString(),
                                    curency_code: Constant.currencyCode.toString(),
                                    user_id: Constant.userId.toString(),
                                    session_id: Constant.sessionId,
                                    game_id: Constant.gameId,
                                    event_id: Constant.selectedEvent.attributes.ID.toString(),
                                    bet_start_time: Constant.selectedEvent.attributes.EventTime,
                                    race_end_time: Constant.selectedEvent.attributes.FinishTime,
                                    bet_result: "",
                                    race_number: Constant.selectedEvent.attributes.EventNumber,
                                    selection_id: betPos[i].toString(),
                                    bet_id: betId.toString(),
                                    bet_name: betType,
                                    stake: betAmount,
                                    odds: oddValue,
                                    amount: betAmount.toString(),
                                    status: "Placed",
                                    race_status: "Upcoming",
                                    bet_label: betLabel.toUpperCase(),
                                    is_lowest: isLowestOddValue
                                };
                                this.allMultibetCombinationData.push(obj);
                                let estimatedWinAmount = betAmount * oddValue;

                                this.domHandler.CreateMultibetCombination(
                                    obj.race_number,
                                    obj.bet_label,
                                    obj.amount,
                                    obj.bet_start_time,
                                    obj.selection_id.replace(/,/g, '-'),
                                    obj.odds,
                                    estimatedWinAmount,
                                    i
                                );
                            }
                            this.HideBetCombinationSlipLoader();
                            this.betManager.ResetAllBetInputs();
                            this.HideBuyBetSlipButton();
                            this.betManager.ClearAllTheOddsActiveClass();
                        } else {
                            this.HideBetCombinationSlipLoader();
                            Popup.ShowErrorPopup(Localization.noValueWillBeNullText);
                            this.EnableBuyBetSlipButton();
                        }
                    } else {
                        this.HideBetCombinationSlipLoader();
                        Popup.ShowErrorPopup(Localization.sorryBetClosedText);
                        this.EnableBuyBetSlipButton();
                        this.betManager.ClearAllTheOddsActiveClass();
                    }
                } else {
                    this.HideBetCombinationSlipLoader();
                    Popup.ShowErrorPopup(Localization.insufficientBalanceText);
                    this.EnableBuyBetSlipButton();
                }
            } else {
                this.HideBetCombinationSlipLoader();
                Popup.ShowErrorPopup(Localization.pleaseSelectTheBetAmountText);
                this.EnableBuyBetSlipButton();
            }
        } else {
            setTimeout(() => {
                this.HideBetCombinationSlipLoader();
                this.EnableBuyBetSlipButton();
            }, 100);
        }
    };

    OnPlaceBetButtonPressed() {
        this.ShowSessionBetsLoader();
        this.DisablePlaceBetButton();
        this.PlaceAllMultiBet();
    };

    async PlaceAllMultiBet() {
        let betCloseTime = Constant.GetBetCloseTime();
        let timeZone = moment.tz.guess();
        let currentTime = moment().tz(timeZone).format("HH:mm:ss");
        let availableBalance = Constant.GetUserBalance();

        if (currentTime < betCloseTime) {
            if (this.allMultibetCombinationData.length > 0) {
                let totalBetAmount = await this.GetTotalBetAmountFromCombinationBet();
                if (availableBalance >= totalBetAmount) {
                    let multiBetResponse = await Server.PlaceMultiBet(Constant.operatorId, this.allMultibetCombinationData);
                    if (multiBetResponse.error == false) {
                        if (multiBetResponse.data) {
                            await this.GetAllSessionBets();
                            await this.gameHistoryManager.GetAllEventNumberList();
                            let balanceResponse = await Server.GetUserBalance(
                                Constant.playerToken,
                                Constant.operatorId,
                                Constant.playerId,
                                Constant.currencyCode,
                                Constant.sessionId
                            );
                            if (balanceResponse.error == false) {
                                if (balanceResponse.data) {
                                    this.SetTotalAvailableBalance(balanceResponse.data.Amount);
                                    Constant.SetUserBalance(parseInt(balanceResponse.data.Amount.replaceAll(",", "")));
                                } else {
                                    this.HideSessionBetsLoader();
                                    Popup.ShowErrorPopup(balanceResponse.message);
                                    this.EnablePlaceBetButton();
                                }
                            } else {
                                this.HideSessionBetsLoader();
                                Popup.ShowErrorPopup(balanceResponse.message);
                                this.EnablePlaceBetButton();
                            }
                            this.HideSessionBetsLoader();
                            this.domHandler.ResetMultiBetCombArea();
                            this.domHandler.ClearAllTheWinningSequenceFromOddsTable();
                            this.ShowBuyBetSlipButton();
                        }
                    } else {
                        this.HideSessionBetsLoader();
                        Popup.ShowErrorPopup(multiBetResponse.message);
                        this.EnablePlaceBetButton();
                    }
                } else {
                    this.HideSessionBetsLoader();
                    Popup.ShowErrorPopup(Localization.insufficientBalanceText);
                    this.EnablePlaceBetButton();
                }

            } else {
                this.HideSessionBetsLoader();
                Popup.ShowErrorPopup(Localization.noValueWillBeNullText);
                this.EnablePlaceBetButton();
            }
        } else {
            this.HideSessionBetsLoader();
            Popup.ShowErrorPopup(Localization.sorryBetClosedText);
            this.EnablePlaceBetButton();
        }
    };

    async GetTotalBetAmountFromCombinationBet() {
        let totalBetAmount = 0;
        for (let i = 0; i < this.allMultibetCombinationData.length; i++) {
            totalBetAmount = totalBetAmount + parseInt(this.allMultibetCombinationData[i].amount);
        }
        return totalBetAmount;
    };

    /**
    * Handle Reset button pressed.
    * @returns {null}
    **/
    OnResetButtonPressed() {
        this.betManager.ResetAllBetInputs();
    };

    //=========================================================
    ShowBuyBetSlipButton() {
        let buyBetObj = document.getElementById("BuyBetSlip");
        buyBetObj.style.display = "block";
        this.EnableBuyBetSlipButton();
        this.HidePlaceBetButton();
        this.DisablePlaceBetButton();
    };
    HideBuyBetSlipButton() {
        let buyBetObj = document.getElementById("BuyBetSlip");
        buyBetObj.style.display = "none";
        this.DisableBuyBetSlipButton();
        this.ShowPlaceBetButton();
        this.EnablePlaceBetButton();
    };

    ShowPlaceBetButton() {
        let placeBetObj = document.getElementById("place_combination_Bet");
        placeBetObj.style.display = "block";
    };
    HidePlaceBetButton() {
        let placeBetObj = document.getElementById("place_combination_Bet");
        placeBetObj.style.display = "none";
    };

    DisableBuyBetSlipButton() {
        let buttonObj = document.getElementById("BuyBetSlip");
        buttonObj.disabled = true;
        buttonObj.style.backgroundColor = "#2b452b";

    };
    EnableBuyBetSlipButton() {
        let buttonObj = document.getElementById("BuyBetSlip");
        buttonObj.disabled = false;
        buttonObj.style.backgroundColor = "#419041";
    };

    DisablePlaceBetButton() {
        let buttonObj = document.getElementById("place_combination_Bet");
        buttonObj.disabled = true;
        buttonObj.style.backgroundColor = "#8d2d3f";
    };
    EnablePlaceBetButton() {
        let buttonObj = document.getElementById("place_combination_Bet");
        buttonObj.disabled = false;
        buttonObj.style.backgroundColor = "#e2002b";
    };
    //===================================================


}
//#endregion
let gameManager = new GameManager();
export { gameManager as GameManager };