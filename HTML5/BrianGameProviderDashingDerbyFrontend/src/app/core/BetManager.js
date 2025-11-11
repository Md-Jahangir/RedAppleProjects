/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 20_03_2023.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 20_03_2023
 * @Description :- Handles all Bet configuration.
 ************************************/

import { Constant } from "../components/Constant.js";
import { Server } from "../services/Server.js";
import { GameManager } from "./GameManager.js";
import { Popup } from "../components/Popup.js";
import { Utils } from "../components/Utils.js";
import { Loader } from "../components/Loader.js";
import { Localization } from "../components/Localization.js";
//#endregion

//#region - Class defination 
export default class BetManager {
    /**
    * initializes variables.
    * @Constructor
    */
    constructor() {
        this.betConfigArray = [];
        this.ratingArray = [];
        this.selectedBetTypeIndex = -1;
        this.selectedBetPositions = [];
        this.selectedCombBetPositions = [];
        this.selectedBetAmounts = [];
        this.totalPurchaseBetAmount = 0;
        this.estimatedWinAmount = 0;
        this.totalPurchaseBetSlipAmount = 0;
        this.prevSelectedTrioOdds = 0;
        this.selectedTrioOdds = 1;
        this.prevSelectedTrifectaOdds = 0;
        this.selectedTrifectaOdds = 1;
        this.trackOddsSelectionArray = [];
        this.isRaceFinished = false;

        this.allOddsValueClikedArray = [];
        this.isClikedFromOddsValue = false;
        this.isClikedFromBetPosition = false;
    };

    /**
    * Get all the bet configure data from api
    * @returns {null} 
    */
    async GetAllBetsData() {
        let betResponse = await Server.GetBetConfiguration(Constant.operatorId, Constant.gameId, Constant.userId, Constant.sessionId);
        this.betConfigArray = [...betResponse.data];
    };

    async GetAllPlayersRatingData(_eventId) {
        this.ratingArray = [];
        let ratingResponse = await Server.GetPlayerRating(_eventId, Constant.sessionId);
        this.ratingArray = [...ratingResponse.data];
    }
    /**
    * Set the bet  Name
    * @param {number} _numberOfPlayer -player number
    * @returns {null} 
    */
    ConfigureBetType(_numberOfPlayer) {
        this.ShowBetPositionLoader();
        GameManager.domHandler.ClearAllTheWinningSequenceFromOddsTable();
        GameManager.domHandler.ClearAllTheEventNumberFromOddSection();
        this.ClearBetConfigObj();
        let secBetTypeGeneralObj = document.getElementById("sec_bet_type_general");
        let secBetTypeComboObj = document.getElementById("sec_bet_type_combo");
        if (secBetTypeGeneralObj && secBetTypeComboObj) {
            for (let i = 0; i < this.betConfigArray.length; i++) {
                let li = document.createElement("LI");
                li.setAttribute('class', 'nav-item');
                li.setAttribute('role', 'presentation');
                li.betname = this.betConfigArray[i].bet_name;
                let button = document.createElement("button");
                button.innerText = this.betConfigArray[i].label;
                button.id = this.betConfigArray[i].bet_type_id;
                button.itemid = i;
                button.className = "nav-link";
                li.appendChild(button);
                button.addEventListener("click", () => {
                    this.OnBetTypeClicked(button, _numberOfPlayer);
                });
                button.disabled = true;
                if (
                    this.betConfigArray[i].bet_name != "ExactaCombo" &&
                    this.betConfigArray[i].bet_name != "QuinellaCombo" &&
                    this.betConfigArray[i].bet_name != "OddEvenHiloCombo"
                ) {
                    secBetTypeGeneralObj.appendChild(li);
                } else {
                    secBetTypeComboObj.appendChild(li);
                }
                setTimeout(() => {
                    if (i == 4) { //by default select quinella bet
                        this.OnBetTypeClicked(button, _numberOfPlayer);
                    }
                    button.disabled = false;
                }, 5000);
            }
        }
        this.ShowHideForBetPlaceAndShow(_numberOfPlayer);
    };

    /**
    * Show hide for bet type show and place
    * @param {number} _numberOfPlayer -player number
    * @returns {null} 
    */
    ShowHideForBetPlaceAndShow(_numberOfPlayer) {
        let secBetTypeGeneralObj = document.getElementById("sec_bet_type_general");
        for (let i = 0; i < secBetTypeGeneralObj.children.length; i++) {
            if (secBetTypeGeneralObj.children[i].betname == "Place") {
                secBetTypeGeneralObj.children[i].style.display = "none";
            }
            if (secBetTypeGeneralObj.children[i].betname == "Show") {
                secBetTypeGeneralObj.children[i].style.display = "none";
            }
        }
        if (_numberOfPlayer <= 6) {
            for (let i = 0; i < secBetTypeGeneralObj.children.length; i++) {
                if (secBetTypeGeneralObj.children[i].betname == "Place") {
                    secBetTypeGeneralObj.children[i].style.display = "block";
                    break;
                }
            }
        } else {
            for (let i = 0; i < secBetTypeGeneralObj.children.length; i++) {
                if (secBetTypeGeneralObj.children[i].betname == "Show") {
                    secBetTypeGeneralObj.children[i].style.display = "block";
                    break;
                }
            }
        }
    };

    /**
    * Set the message to show when select bet type
    * @param {number} _betTypeIndex -selected bet index
    * @returns {null} 
    */
    SetInformaticMessageForBetType(_betTypeIndex) {
        let betName = this.betConfigArray[_betTypeIndex].bet_name;
        let message = this.GetInformaticMessageAsPerBetTyep(betName);
        let messageObj = document.getElementById("sec_bet_type_informatic_message");
        messageObj.innerText = message;
    };

    /**
    * Get the message to show when select bet type
    * @param {number} _betTypeIndex -selected bet index
    * @returns {null} 
    */
    GetInformaticMessageAsPerBetTyep(_betType) {
        let message = "";
        switch (_betType) {
            case "Win":
                message = Localization.winMessageText;
                break;

            case "Place":
                message = Localization.placeMessageText;
                break;

            case "Show":
                message = Localization.showMessageText;
                break;

            case "Swinger":
                message = Localization.swingerMessageText;
                break;

            case "Quinella":
                message = Localization.quinellaMessageText;
                break;

            case "Exacta":
                message = Localization.exactaMessageText;
                break;

            case "Trio":
                message = Localization.trioMessageText;
                break;

            case "Trifecta":
                message = Localization.trifectaMessageText;
                break;

            case "Hilo":
                message = Localization.hiLoMessageText;
                break;

            case "EvenOdd":
                message = Localization.evenOddMessageText;
                break;

            case "QuinellaCombo":
                message = Localization.quinellaComboMessageText;
                break;

            case "ExactaCombo":
                message = Localization.exactaComboMessageText;
                break;

            case "OddEvenHiLoCombo":
                message = Localization.oddEvenHiLoComboMessageText;
                break;
        }
        return message;
    };

    /**
    * Clear all the selected bet type
    * @param {number} _betTypeIndex -selected bet index
    * @returns {null} 
    */
    ClearBetConfigObj() {
        let secBetTypeGeneralObj = document.getElementById("sec_bet_type_general");
        let secBetTypeComboObj = document.getElementById("sec_bet_type_combo");
        let generalBetTypeButtons = secBetTypeGeneralObj.querySelectorAll('button');
        generalBetTypeButtons.forEach(function (button) {
            button.disabled = true;
        });
        let comboBetTypeButtons = secBetTypeComboObj.querySelectorAll('button');
        comboBetTypeButtons.forEach(function (button) {
            button.disabled = true;
        });
        while (secBetTypeGeneralObj.firstChild) {
            secBetTypeGeneralObj.removeChild(secBetTypeGeneralObj.lastChild);
        }
        while (secBetTypeComboObj.firstChild) {
            secBetTypeComboObj.removeChild(secBetTypeComboObj.lastChild);
        }
    };

    /**
    * Set the bet  position
    * @param {number} _index -selected bet index
    * @param {number} _numberOfPlayer -player number
    * @returns {null} 
    */
    async ConfigureBetPosition(_index, _numberOfPlayer, _betTypeObj) {
        let selectedObj = this.betConfigArray[_index];
        let table = document.getElementById('sec_bet_position');
        if (table.children.length > 0) {
            table.removeChild(table.firstElementChild);
        }
        let response = await Server.GetSpecificEventResult(Constant.selectedEvent.attributes.ID, Constant.sessionId);
        if (response.error == false) {
            Utils.EnableButton(_betTypeObj);
            setTimeout(() => {
                this.HideBetPositionLoader();
            }, 200);
        }
        let tableBody = document.createElement('tbody');
        for (let i = 0; i < selectedObj.number_of_rows; i++) {
            if (selectedObj.bet_name == "Hilo") {
                let row = document.createElement('tr');
                row.className = "hover_hiloOddEven";
                row.itemid = i;
                for (let j = 1; j <= 2; j++) {
                    let cell = document.createElement('td');
                    let nameToShow = this.ShowBetPositionNameForHiLoOddEven(selectedObj.odds[j - 1].ID);
                    cell.innerText = nameToShow;
                    cell.className = "oddEvenHiLo";
                    if (j == 1) {
                        cell.classList.add("oddHiAllignment");
                    } else {
                        cell.classList.add("evenLoAllignment");

                    }
                    cell.itemid = selectedObj.odds[j - 1].ID;
                    cell.parentid = i;
                    let pTag = document.createElement("p");
                    let className = this.GetColorClassNameAsPerOddsRange(selectedObj.odds[j - 1].Odds);
                    let txt = document.createTextNode(selectedObj.odds[j - 1].Odds);
                    pTag.className = "count_amnt";
                    pTag.appendChild(txt);
                    pTag.classList.add(className);
                    cell.appendChild(pTag);
                    cell.addEventListener("click", () => {
                        this.OnBetPositionClicked(cell);
                    });
                    row.appendChild(cell);
                }
                tableBody.appendChild(row);
                this.ShowBetPosAndRatingForHiloOddeven(_index, _numberOfPlayer);
            } else if (selectedObj.bet_name == "EvenOdd") {
                let row = document.createElement('tr');
                row.className = "hover_hiloOddEven";
                row.itemid = i;
                for (let j = 1; j <= 2; j++) {
                    let cell = document.createElement('td');
                    let nameToShow = this.ShowBetPositionNameForHiLoOddEven(selectedObj.odds[j - 1].ID);
                    cell.innerText = nameToShow;
                    cell.className = "oddEvenHiLo";
                    if (j == 1) {
                        cell.classList.add("oddHiAllignment");
                    } else {
                        cell.classList.add("evenLoAllignment");
                    }
                    cell.itemid = selectedObj.odds[j - 1].ID;
                    cell.parentid = i;
                    let pTag = document.createElement("p");
                    let className = this.GetColorClassNameAsPerOddsRange(selectedObj.odds[j - 1].Odds);
                    let txt = document.createTextNode(selectedObj.odds[j - 1].Odds);
                    pTag.className = "count_amnt";
                    pTag.appendChild(txt);
                    pTag.classList.add(className);
                    cell.appendChild(pTag);
                    cell.addEventListener("click", () => {
                        this.OnBetPositionClicked(cell);
                    });
                    row.appendChild(cell);
                }
                tableBody.appendChild(row);
                this.ShowBetPosAndRatingForHiloOddeven(_index, _numberOfPlayer);
            } else {
                let row = document.createElement('tr');
                row.itemid = i;
                let cell = document.createElement('td');
                cell.innerText = Utils.ConvertPositionToString((i + 1));
                cell.className = "yellow position";
                row.appendChild(cell);
                for (let j = 1; j <= _numberOfPlayer; j++) {
                    let cell = document.createElement('td');
                    cell.innerText = j;
                    cell.className = "yellow";
                    cell.classList.add("rating_sec_show");
                    cell.itemid = j;
                    cell.parentid = i;
                    let pTag = document.createElement("p");
                    pTag.className = "count_amnt";
                    let imgTag = document.createElement("img");
                    imgTag.src = "assets/images/silk_" + j + ".png";
                    pTag.appendChild(imgTag);
                    let nameSpan = document.createElement("span");
                    try {
                        nameSpan.innerText = response.data.Event.RaceEvent.Entry[j - 1].attributes.Name;//"player_name";
                        pTag.appendChild(nameSpan);
                        this.CreateAndPrintStarIcon(pTag, (j - 1));
                    } catch { }
                    cell.appendChild(pTag);
                    cell.addEventListener("click", () => {
                        this.OnBetPositionClicked(cell);
                    });
                    row.appendChild(cell);
                }
                tableBody.appendChild(row);
                this.ClearBetPosAndRatingForHiloOddeven();
            }
        }
        table.appendChild(tableBody);
        this.selectedBetPositions = new Array(selectedObj.number_of_rows);
        this.selectedCombBetPositions = [];
        this.trackOddsSelectionArray = [];

        this.allOddsValueClikedArray = [];
        this.isClikedFromOddsValue = false;
        this.isClikedFromBetPosition = false;


    };

    ClearBetPosAndRatingForHiloOddeven() {
        let secBetTypeComboObj = document.getElementById("sec_bet_position_hilo_oddeven_rating");
        while (secBetTypeComboObj.firstChild) {
            secBetTypeComboObj.removeChild(secBetTypeComboObj.lastChild);
        }
    };

    async ShowBetPosAndRatingForHiloOddeven(_index, _numberOfPlayer) {
        let response = await Server.GetSpecificEventResult(Constant.selectedEvent.attributes.ID, Constant.sessionId);
        let table = document.getElementById('sec_bet_position_hilo_oddeven_rating');
        if (table.children.length > 0) {
            table.removeChild(table.firstElementChild);
        }
        let tableBody = document.createElement('tbody');
        let row = document.createElement('tr');
        for (let j = 1; j <= _numberOfPlayer; j++) {
            let cell = document.createElement('td');
            cell.innerText = j;
            cell.className = "yellow";
            cell.classList.add("rating_sec_show");
            cell.itemid = j;
            let pTag = document.createElement("p");
            pTag.className = "count_amnt";
            let imgTag = document.createElement("img");
            imgTag.src = "assets/images/silk_" + j + ".png";
            pTag.appendChild(imgTag);
            let nameSpan = document.createElement("span");
            nameSpan.innerText = response.data.Event.RaceEvent.Entry[j - 1].attributes.Name;//"player_name";
            pTag.appendChild(nameSpan);
            try {
                this.CreateAndPrintStarIcon(pTag, (j - 1));
            } catch { }
            cell.appendChild(pTag);
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
        table.appendChild(tableBody);
    };

    CreateAndPrintStarIcon(_obj, _index) {
        let startRatingDivTag = document.createElement('div');
        startRatingDivTag.className = "Stars";
        let rating = this.ratingArray[_index].rating;
        startRatingDivTag.style = "--rating:" + rating;
        _obj.appendChild(startRatingDivTag);
    };

    /**
    * Set the bet amount
    * @param {number} _index -selected bet index
    * @returns {null} 
    */
    ConfigureBetAmount(_index) {
        let selectedObj = this.betConfigArray[_index].denominations;
        let table = document.getElementById('sec_bet_amount');
        if (table.children.length > 0) {
            table.removeChild(table.firstElementChild);
        }
        let tableBody = document.createElement('tbody');
        let row = document.createElement('tr');
        row.className = "amount_sec";
        for (let i = 0; i < selectedObj.length; i++) {
            let cell = document.createElement('td');
            cell.itemid = selectedObj[i].value;
            let span = document.createElement('SPAN');
            span.innerText = selectedObj[i].name;
            cell.addEventListener("click", () => {
                this.OnBetAmountClicked(cell);
            });
            cell.appendChild(span);
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
        table.appendChild(tableBody);
        this.AddEventListeneToBetAmountResetButton();
    };

    /**
    * Add click evnet to bet amount reset button
    * @param {string} _name -selected bet name
    * @returns {null} 
    */
    AddEventListeneToBetAmountResetButton() {
        let resetObj = document.getElementById("sec_amount_reset_text");
        resetObj.addEventListener("click", () => {
            this.OnBetAmountResetClicked(resetObj);
        });
    };

    /**
    * Set the name that show for bet type hilo oddeven
    * @param {string} _name -selected bet name
    * @returns {string} bet name
    */
    ShowBetPositionNameForHiLoOddEven(_name) {
        let nameToShow = "";
        switch (_name) {
            case "H":
                nameToShow = Localization.betNameHighText;
                break;

            case "L":
                nameToShow = Localization.betNameLowText;
                break;

            case "O":
                nameToShow = Localization.betNameOddText;
                break;

            case "E":
                nameToShow = Localization.betNameEvenText;
                break;
        }
        return nameToShow;
    }

    /**
    * Set the bet type when clciked
    * @param {number} _obj -selected object
    * @param {number} _numberOfPlayer -how many players
    * @returns {null} 
    */
    OnBetTypeClicked(_obj, _numberOfPlayer) {
        this.ShowBetPositionLoader();
        this.ResetRightMainTab();
        Utils.DisableButton(_obj);
        this.ResetBetTypes();
        GameManager.domHandler.ResetMultiBetCombArea();
        _obj.classList.add("active");
        this.selectedBetTypeIndex = _obj.itemid;

        if (this.betConfigArray[this.selectedBetTypeIndex].bet_name == "Hilo") {
            this.HideCommonOddsSearchAreaTable();
            GameManager.domHandler.ShowParticularTabSection("Odds");
        } else if (this.betConfigArray[this.selectedBetTypeIndex].bet_name == "EvenOdd") {
            this.HideCommonOddsSearchAreaTable();
            GameManager.domHandler.ShowParticularTabSection("Odds");
        } else {
            this.ShowCommonOddsSearchAreaTable();
            GameManager.domHandler.ShowParticularTabSection("Odds");
        }
        this.ConfigureBetPosition(this.selectedBetTypeIndex, _numberOfPlayer, _obj);
        this.ConfigureBetAmount(this.selectedBetTypeIndex);

        this.SetInformaticMessageForBetType(this.selectedBetTypeIndex);
        this.ResetSelectedAmount();
        GameManager.eventTimeManager.oddsManager.SetBetTypeOfOddsSection(this.betConfigArray[this.selectedBetTypeIndex].label);

        this.DisplayOddsTable(this.selectedBetTypeIndex);
    };

    OnLiveOrPreviousEventShowOdds() {
        this.DisplayOddsTable(this.selectedBetTypeIndex);
    }

    /**
    * Show the odds table in dom element
    * @param {number} _betTypeIndex -selected brt type index
    * @returns {null} 
    */
    DisplayOddsTable(_betTypeIndex) {
        let singleOddsObj = document.getElementById("SingleOdds");
        let placeShowOddsObj = document.getElementById("PlaceShowOdds");
        let swingerOddsObj = document.getElementById("SwingerOdds");
        let quinellaOddsObj = document.getElementById("QuinellaOdds");
        let exactaOddsObj = document.getElementById("ExactaOdds");
        let trioOddsObj = document.getElementById("TrioOdds");
        let trifectaOddsObj = document.getElementById("TrifectaOdds");
        let hiLoOddsObj = document.getElementById("HiLo");
        let oddEvenOddsObj = document.getElementById("oddeven");

        singleOddsObj.style.display = "none";
        placeShowOddsObj.style.display = "none";
        swingerOddsObj.style.display = "none";
        quinellaOddsObj.style.display = "none";
        exactaOddsObj.style.display = "none";
        trioOddsObj.style.display = "none";
        trifectaOddsObj.style.display = "none";
        hiLoOddsObj.style.display = "none";
        oddEvenOddsObj.style.display = "none";

        switch (this.betConfigArray[_betTypeIndex].bet_name) {
            case "Quinella":
                if (this.betConfigArray[_betTypeIndex].odds) {
                    this.SetQuinellaOddsValue(this.betConfigArray[_betTypeIndex].odds);
                }
                quinellaOddsObj.style.display = "block";
                break;
            case "Exacta":
                if (this.betConfigArray[_betTypeIndex].odds) {
                    this.SetExactaOddsValue(this.betConfigArray[_betTypeIndex].odds);
                }
                exactaOddsObj.style.display = "block";
                break;
            case "Trio":
                if (this.betConfigArray[_betTypeIndex].odds) {
                    this.SetTrioOddsValue(this.betConfigArray[_betTypeIndex].odds);
                }
                trioOddsObj.style.display = "block";
                break;
            case "Trifecta":
                if (this.betConfigArray[_betTypeIndex].odds) {
                    this.SetTrifectaOddsValue(this.betConfigArray[_betTypeIndex].odds);
                }
                trifectaOddsObj.style.display = "block";
                break;
            case "Hilo":
                hiLoOddsObj.style.display = "block";
                hiLoOddsObj.classList.add("show");
                hiLoOddsObj.classList.add("active");
                break;
            case "EvenOdd":
                oddEvenOddsObj.style.display = "block";
                oddEvenOddsObj.classList.add("show");
                oddEvenOddsObj.classList.add("active");
                break;
            case "Place":
                if (this.betConfigArray[_betTypeIndex].odds) {
                    this.SetShowPlaceOddsValue(this.betConfigArray[_betTypeIndex].odds);
                }
                placeShowOddsObj.style.display = "block";
                break;
            case "Swinger":
                if (this.betConfigArray[this.selectedBetTypeIndex].odds) {
                    this.SetSwingerOddsValue(this.betConfigArray[this.selectedBetTypeIndex].odds);
                }
                swingerOddsObj.style.display = "block";
                break;
            case "ExactaCombo":
                break;
            case "Win":
                if (this.betConfigArray[this.selectedBetTypeIndex].odds) {
                    this.SetSingleOddsValue(this.betConfigArray[this.selectedBetTypeIndex].odds);
                }
                singleOddsObj.style.display = "block";
                break;
            case "QuinellaCombo":
                break;
            case "OddEvenHiLoCombo":
                break;
            case "Show":
                if (this.betConfigArray[this.selectedBetTypeIndex].odds) {
                    this.SetShowPlaceOddsValue(this.betConfigArray[this.selectedBetTypeIndex].odds);
                }
                placeShowOddsObj.style.display = "block";
                break;
        }
        Loader.HideLoader();
        Loader.HideOddsTableValueUpdateLoader();
    };


    DeselectBetPosition(_parentIndex, _childIndex) {
        let betPositionTableObj = document.getElementById('sec_bet_position');
        let convertChildInx;
        if (_childIndex == "H" || _childIndex == "O") {
            convertChildInx = 0;
        } else if (_childIndex == "L" || _childIndex == "E") {
            convertChildInx = 1;
        } else {
            convertChildInx = _childIndex;
        }
        let liObj = betPositionTableObj.children[0].children[_parentIndex].children[convertChildInx];

        liObj.classList.remove("dark_red");

        let row = this.selectedCombBetPositions[_parentIndex];
        for (let i = row.length - 1; i >= 0; i--) {
            if (row[i] == _childIndex) {
                row.splice(i, 1);
            }
        }
    };

    OnBetPositionClicked(_obj) {
        if (!this.isClikedFromOddsValue) {
            if (!this.isRaceFinished) {
                let rowNum = _obj.parentid;
                if (!this.CheckIfBetPositionAlreadySelected(rowNum, _obj.itemid)) {
                    if (!this.CheckBetPositionAlreadyExistsPerRow(rowNum, _obj.itemid)) {
                        this.isClikedFromBetPosition = true;
                        this.selectedBetPositions[_obj.parentid] = _obj.itemid;
                        let rowArrLength = this.selectedCombBetPositions.length;
                        for (let i = rowArrLength; i <= rowNum; i++) {
                            this.selectedCombBetPositions.push([]);
                        }

                        //=====================================================
                        let rowId;
                        if (this.selectedBetTypeIndex == 0 || this.selectedBetTypeIndex == 1 || this.selectedBetTypeIndex == 2) {
                            rowId = this.selectedCombBetPositions[rowNum];
                            rowId.push(_obj.itemid);
                            _obj.classList.add("dark_red");
                        }
                        else if (this.selectedBetTypeIndex == 3 || this.selectedBetTypeIndex == 4 || this.selectedBetTypeIndex == 5) {
                            if (rowNum == 0) {
                                if (this.selectedCombBetPositions[rowNum].length < 1) {
                                    rowId = this.selectedCombBetPositions[rowNum];
                                    rowId.push(_obj.itemid);
                                    _obj.classList.add("dark_red");
                                } else {
                                    this.ResetBetPositionPerRow(rowNum);
                                    rowId = this.selectedCombBetPositions[rowNum];
                                    rowId[0] = _obj.itemid;
                                    _obj.classList.add("dark_red");
                                }
                            } else {
                                rowId = this.selectedCombBetPositions[rowNum];
                                rowId.push(_obj.itemid);
                                _obj.classList.add("dark_red");
                            }
                        } else if (this.selectedBetTypeIndex == 6 || this.selectedBetTypeIndex == 7) {
                            if (rowNum == 0) {
                                if (this.selectedCombBetPositions[rowNum].length < 1) {
                                    rowId = this.selectedCombBetPositions[rowNum];
                                    rowId.push(_obj.itemid);
                                    _obj.classList.add("dark_red");
                                } else {
                                    this.ResetBetPositionPerRow(rowNum);
                                    rowId = this.selectedCombBetPositions[rowNum];
                                    rowId[0] = _obj.itemid;
                                    _obj.classList.add("dark_red");
                                }
                            } else if (rowNum == 1) {
                                if (this.selectedCombBetPositions[rowNum].length < 1) {
                                    rowId = this.selectedCombBetPositions[rowNum];
                                    rowId.push(_obj.itemid);
                                    _obj.classList.add("dark_red");
                                } else {
                                    this.ResetBetPositionPerRow(rowNum);
                                    rowId = this.selectedCombBetPositions[rowNum];
                                    rowId[0] = _obj.itemid;
                                    _obj.classList.add("dark_red");
                                }
                            } else {
                                rowId = this.selectedCombBetPositions[rowNum];
                                rowId.push(_obj.itemid);
                                _obj.classList.add("dark_red");
                            }
                        } else {
                            if (this.selectedCombBetPositions[rowNum].length < 1) {
                                rowId = this.selectedCombBetPositions[rowNum];
                                rowId.push(_obj.itemid);
                                _obj.classList.add("dark_red");
                            } else {
                                this.ResetBetPositionPerRow(rowNum);
                                rowId = this.selectedCombBetPositions[rowNum];
                                rowId[0] = _obj.itemid;
                                _obj.classList.add("dark_red");
                            }
                        }
                        //=====================================================
                        this.CalculatePurchaseAmount();
                    } else {
                        this.DeselectBetPosition(rowNum, _obj.itemid);
                        let flatArr = this.selectedCombBetPositions.flat();
                        if (flatArr.length == 0) {
                            this.isClikedFromBetPosition = false;
                        }
                    }
                }
            } else {
                Popup.ShowErrorPopup(Localization.raceIsAlreadyInLiveText);
            }

        } else {
            Popup.ShowErrorPopup(Localization.youAreNotAllowFromBetPostionText);
        }
    };

    CheckIfBetPositionAlreadySelected(_pos, _value) {
        for (let i = 0; i < this.selectedCombBetPositions.length; i++) {
            if (i != _pos) {
                for (let el of this.selectedCombBetPositions[i]) {
                    if (el == _value) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    CheckBetPositionAlreadyExistsPerRow(_row, _val) {
        for (let i = 0; i < this.selectedCombBetPositions.length; i++) {
            if (i == _row) {
                for (let el of this.selectedCombBetPositions[i]) {
                    if (el == _val) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    GetMultiBetCombination() {
        if (this.selectedCombBetPositions.length > 0) {
            let result = Utils.GetAllPermutationsAndCombinations(this.selectedCombBetPositions);
            return result;
        } else {
            return null;
        }
    };


    /**
 * Handle bet amount clicked button pressed
 * @param {object} _obj -clicked object
 * @returns {null} 
 */
    OnBetAmountClicked(_obj) {
        this.selectedBetAmounts.push(_obj.itemid);
        this.CalculatePurchaseAmount();
        // this.CalculateEstimatedWinAmount();
        this.ResetBetAmount();
        _obj.children[0].classList.add("dark_red");
    };

    /**
    * Handle bet amount reset button pressed
    * @param {object} _obj -clicked object
    * @returns {null} 
    */
    OnBetAmountResetClicked(_obj) {
        this.ResetSelectedAmount();
        this.ResetBetAmount();
    };

    /**
    * Check validation for bet type
    * @returns {null} 
    */

    CheckValidationForBet() {
        if (this.isClikedFromOddsValue) {
            return true;
        } else {
            for (let i = 0; i < this.selectedBetPositions.length; i++) {
                if (this.selectedBetPositions[i] == null || this.selectedBetPositions[i] < 0) {
                    if (this.betConfigArray[this.selectedBetTypeIndex].bet_name == "Hilo") {
                        Popup.ShowErrorPopup(Localization.pleaseSelectTheText + Localization.hiorLoText + Localization.positionText);
                    } else if (this.betConfigArray[this.selectedBetTypeIndex].bet_name == "EvenOdd") {
                        Popup.ShowErrorPopup(Localization.pleaseSelectTheText + Localization.oddorEvenText + Localization.positionText);
                    } else {
                        Popup.ShowErrorPopup(Localization.pleaseSelectTheText + Utils.ConvertPositionToString((i + 1)) + Localization.positionText);
                    }
                    return false;
                }
            }
            if (this.selectedBetAmounts.length == 0) {
                Popup.ShowErrorPopup(Localization.pleaseSelectTheBetAmountText);
                return false;
            }
            return true;
        }
    };

    CheckValidationForComboBet() {
        let errorFound = false;
        let lastIndex = 0;
        let numOfRows = this.betConfigArray[this.selectedBetTypeIndex].number_of_rows;
        if (this.isClikedFromOddsValue) {
            return true;
        } else {
            if (this.selectedCombBetPositions.length == 0) {
                if (this.betConfigArray[this.selectedBetTypeIndex].bet_name == "Hilo") {
                    Popup.ShowErrorPopup(Localization.pleaseSelectTheText + Localization.hiorLoText + Localization.positionText);
                } else if (this.betConfigArray[this.selectedBetTypeIndex].bet_name == "EvenOdd") {
                    Popup.ShowErrorPopup(Localization.pleaseSelectTheText + Localization.oddorEvenText + Localization.positionText);
                } else {
                    Popup.ShowErrorPopup(Localization.pleaseSelectTheText + Utils.ConvertPositionToString((1)) + Localization.positionText);
                }
                return false;
            }
            let i = 0;
            for (i; i < this.selectedCombBetPositions.length; i++) {
                let obj = this.selectedCombBetPositions[i];

                if (obj.length == 0) {
                    errorFound = true;
                    if (this.betConfigArray[this.selectedBetTypeIndex].bet_name == "Hilo") {
                        Popup.ShowErrorPopup(Localization.pleaseSelectTheText + Localization.hiorLoText + Localization.positionText);
                    } else if (this.betConfigArray[this.selectedBetTypeIndex].bet_name == "EvenOdd") {
                        Popup.ShowErrorPopup(Localization.pleaseSelectTheText + Localization.oddorEvenText + Localization.positionText);
                    } else {
                        Popup.ShowErrorPopup(Localization.pleaseSelectTheText + Utils.ConvertPositionToString((i + 1)) + Localization.positionText);
                    }
                    return false;
                }
                lastIndex = i;
            }

            if (!errorFound && lastIndex < numOfRows - 1) {
                lastIndex++;
                Popup.ShowErrorPopup(Localization.pleaseSelectTheText + Utils.ConvertPositionToString((lastIndex + 1)) + Localization.positionText);
                return false;
            }

            if (this.selectedBetAmounts.length == 0) {
                Popup.ShowErrorPopup(Localization.pleaseSelectTheBetAmountText);
                return false;
            }

            if (!errorFound) {
                return true;
            }
        }
    };

    /**
 * Calculate the purchase ampount
 * @returns {null} 
 */
    CalculatePurchaseAmount() {
        if (this.selectedBetAmounts.length > 0) {
            this.totalPurchaseBetSlipAmount = 0;
            for (let i = 0; i < this.selectedBetAmounts.length; i++) {
                this.totalPurchaseBetSlipAmount += this.selectedBetAmounts[i];
                GameManager.SetBetSlipAmount(this.totalPurchaseBetSlipAmount);
            }
        }
    };

    /**
* Get the selected bet type
* @returns {string} bet name
*/
    ReturnSelectedBetType() {
        return this.betConfigArray[this.selectedBetTypeIndex].bet_name;
    };

    /**
    * Get the selected bet id
    * @returns {string} bet id
    */
    ReturnSelectedBetTypeId() {
        return this.betConfigArray[this.selectedBetTypeIndex].bet_type_id;
    };

    /**
    * Get the selected bet lable
    * @returns {string} bet lable
    */
    ReturnSelectedBetTypeLabel() {
        return this.betConfigArray[this.selectedBetTypeIndex].label;
    };

    /**
    * Get the selected bet position
    * @returns {string} amount
    */
    ReturnSelectedBetPosition() {
        return this.selectedBetPositions;
    };

    ReturnSelectedBetCombinationPosition() {
        return this.selectedCombBetPositions;
    };

    /**
    * Get the total purchase bet amount
    * @returns {string} amount
    */
    ReturnSelectedBetAmount() {
        return this.totalPurchaseBetSlipAmount;
    };

    GetOddValueForSelectedPositionForComboBet(_betName, _selectedPos) {
        let oddVal;
        let combinationArray = [];
        let splitVal = _selectedPos.split(",");

        if (!Utils.IsEmpty(splitVal[0])) {
            combinationArray = Utils.GetExactCombinationArray(splitVal);
        }
        switch (_betName) {
            case "Win":
                oddVal = this.FindTheMatchedOddValue(_selectedPos);
                break;

            case "Show":
                oddVal = this.FindTheMatchedOddValue(_selectedPos);
                break;

            case "Place":
                oddVal = this.FindTheMatchedOddValue(_selectedPos);
                break;

            case "Swinger":
                if (!Utils.IsEmpty(combinationArray)) {
                    oddVal = this.FindTheMatchedOddValueForPermutation(combinationArray);
                }
                break;

            case "Quinella":
                if (!Utils.IsEmpty(combinationArray)) {
                    oddVal = this.FindTheMatchedOddValueForPermutation(combinationArray);
                }
                break;

            case "Exacta":
                oddVal = this.FindTheMatchedOddValue(_selectedPos);
                break;

            case "Trio":
                if (!Utils.IsEmpty(combinationArray)) {
                    oddVal = this.FindTheMatchedOddValueForPermutation(combinationArray);
                }
                break;

            case "Trifecta":
                oddVal = this.FindTheMatchedOddValue(_selectedPos);
                break;

            case "Hilo":
                oddVal = this.FindTheMatchedOddValue(_selectedPos);
                break;

            case "EvenOdd":
                oddVal = this.FindTheMatchedOddValue(_selectedPos);
                break;

            case "QuinellaCombo":
                oddVal = this.FindTheMatchedOddValue(_selectedPos);
                break;

            case "ExactaCombo":
                oddVal = this.FindTheMatchedOddValue(_selectedPos);
                break;

            case "OddEvenHiLoCombo":
                oddVal = this.FindTheMatchedOddValue(_selectedPos);
                break;
        }
        return oddVal;
    };

    /**
    * Get the matched odd value from bet type
    * @param {number} _betName -bet name
    * @param {number} _selectedPos -pos index
    * @returns {string} odd value
    */
    GetOddValueForSelectedPosition(_betName, _selectedPos) {
        let oddVal;
        let combinationArray;
        if (!Utils.IsEmpty(_selectedPos[0])) {
            combinationArray = Utils.GetExactCombinationArray(_selectedPos);
        } else { }
        _selectedPos = _selectedPos.join('-');
        switch (_betName) {
            case "Win":
                oddVal = this.FindTheMatchedOddValue(_selectedPos);
                break;

            case "Show":
                oddVal = this.FindTheMatchedOddValue(_selectedPos);
                break;

            case "Place":
                oddVal = this.FindTheMatchedOddValue(_selectedPos);
                break;

            case "Swinger":
                if (!Utils.IsEmpty(combinationArray)) {
                    oddVal = this.FindTheMatchedOddValueForPermutation(combinationArray);
                }
                break;

            case "Quinella":
                if (!Utils.IsEmpty(combinationArray)) {
                    oddVal = this.FindTheMatchedOddValueForPermutation(combinationArray);
                }
                break;

            case "Exacta":
                oddVal = this.FindTheMatchedOddValue(_selectedPos);
                break;

            case "Trio":
                if (!Utils.IsEmpty(combinationArray)) {
                    oddVal = this.FindTheMatchedOddValueForPermutation(combinationArray);
                }
                break;

            case "Trifecta":
                oddVal = this.FindTheMatchedOddValue(_selectedPos);
                break;

            case "Hilo":
                oddVal = this.FindTheMatchedOddValue(_selectedPos);
                break;

            case "EvenOdd":
                oddVal = this.FindTheMatchedOddValue(_selectedPos);
                break;

            case "QuinellaCombo":
                oddVal = this.FindTheMatchedOddValue(_selectedPos);
                break;

            case "ExactaCombo":
                oddVal = this.FindTheMatchedOddValue(_selectedPos);
                break;

            case "OddEvenHiLoCombo":
                oddVal = this.FindTheMatchedOddValue(_selectedPos);
                break;
        }
        return oddVal;
    };

    /**
    * Get the matched odd value from normal
    * @param {number} _selectedPos -pos index
    * @returns {string} odd value
    */
    FindTheMatchedOddValue(_selectedPos) {
        let position = _selectedPos.replace(/,/g, '-');
        let oddVal = null;
        this.betConfigArray[this.selectedBetTypeIndex].odds.forEach(elem => {
            if (elem.ID == String(position)) {
                oddVal = elem.Odds
            }
        });
        return oddVal;
    };

    GetTheLowestOddValue() {
        let lowestVal = Math.min(...this.betConfigArray[this.selectedBetTypeIndex].odds.map(item => item.Odds));
        return lowestVal
    };

    /**
    * Get the matched odd value from combination
    * @param {number} _selectedPos -pos index
    * @returns {string} odd value
    */
    FindTheMatchedOddValueForPermutation(_selectedPos) {
        let oddVal = null;
        this.betConfigArray[this.selectedBetTypeIndex].odds.forEach(elem => {
            if (_selectedPos.includes(elem.ID)) {
                oddVal = elem.Odds
            }
        });
        return oddVal;
    };

    /**
    * Reset selected bet types
    * @returns {null} 
    */
    ResetBetTypes() {
        let secBetTypeGeneralObj = document.getElementById("sec_bet_type_general");
        let secBetTypeComboObj = document.getElementById("sec_bet_type_combo");
        if (secBetTypeGeneralObj.children.length > 0) {
            for (let i = 0; i < secBetTypeGeneralObj.children.length; i++) {
                let liObj = secBetTypeGeneralObj.children[i];
                liObj.children[0].classList.remove("active");
            }
        }
        if (secBetTypeComboObj.children.length > 0) {
            for (let i = 0; i < secBetTypeComboObj.children.length; i++) {
                let liObj = secBetTypeComboObj.children[i];
                liObj.children[0].classList.remove("active");
            }
        }
    };

    /**
    * Reset bet position per row
    * @param {number} _parentIndex -index
    * @returns {null} 
    */
    ResetBetPositionPerRow(_parentIndex) {
        let betPositionTableObj = document.getElementById('sec_bet_position');
        for (let i = 0; i < betPositionTableObj.children[0].children[_parentIndex].children.length; i++) {
            let liObj = betPositionTableObj.children[0].children[_parentIndex].children[i];
            liObj.classList.remove("dark_red");
        }
    };

    /**
   * Reset selected bet amount
   * @returns {null} 
   */
    ResetBetAmount() {
        let betAmountTableObj = document.getElementById('sec_bet_amount');
        for (let i = 0; i < betAmountTableObj.children[0].children[0].children.length; i++) {
            let liObj = betAmountTableObj.children[0].children[0].children[i];
            liObj.children[0].classList.remove("dark_red");
        }
    };

    /**
    * Reset selected amount
    * @returns {null} 
    */
    ResetSelectedAmount() {
        this.selectedBetAmounts = [];
        this.totalPurchaseBetSlipAmount = 0;
        GameManager.SetBetSlipAmount(this.totalPurchaseBetSlipAmount);
        this.estimatedWinAmount = 0;
    };

    /**
    * Reset all the bet inputs
    * @returns {null} 
    */
    ResetAllBetInputs() {
        this.ResetSelectedAmount();
        this.ResetBetAmount();
        let betConfig = this.betConfigArray[this.selectedBetTypeIndex];
        if (betConfig) {
            for (let i = 0; i < betConfig.number_of_rows; i++) {
                this.ResetBetPositionPerRow(i);
            }
            this.selectedBetPositions = new Array(betConfig.number_of_rows);
            this.selectedCombBetPositions = [];
            this.trackOddsSelectionArray = [];
            this.ClearAllTheOddsActiveClass();

            this.allOddsValueClikedArray = [];
            this.isClikedFromOddsValue = false;
            this.isClikedFromBetPosition = false;
        }
    };

    /**
    * Set single odds value to dom element
    * @param {Array} _oddsArray -odds array value
    * @returns {null} 
    */
    SetSingleOddsValue(_oddsArray) {
        this.ClearAllTheOddsIdValue("single");
        let lowestNum = Math.min(..._oddsArray.map(item => item.Odds));
        let singleId;
        for (let i = 0; i < _oddsArray.length; i++) {
            let className = this.GetColorClassNameAsPerOddsRange(_oddsArray[i].Odds);
            singleId = _oddsArray[i].ID;
            let obj = document.getElementById("single_1_" + singleId);
            if (obj) {
                obj.innerText = _oddsArray[i].Odds;
                obj.className = className;
                if (lowestNum === Number(_oddsArray[i].Odds)) {
                    obj.classList.add("lowest_odd_blink");
                }
                this.AddEventListenerIfNotExist(obj, () => {
                    this.OnOddsValuePressed(obj);
                });
            }
        }
    };

    /**
    * Set show/place odds value to dom element
    * @param {Array} _oddsArray -odds array value
    * @returns {null} 
    */
    SetShowPlaceOddsValue(_oddsArray) {
        this.ClearAllTheOddsIdValue("placeShow");
        let lowestNum = Math.min(..._oddsArray.map(item => item.Odds));
        let placeShowId;
        for (let i = 0; i < _oddsArray.length; i++) {
            let className = this.GetColorClassNameAsPerOddsRange(_oddsArray[i].Odds);
            placeShowId = _oddsArray[i].ID;
            let obj = document.getElementById("placeShow_1_" + placeShowId);
            if (obj) {
                obj.innerText = _oddsArray[i].Odds;
                obj.className = className;
                if (lowestNum === Number(_oddsArray[i].Odds)) {
                    obj.classList.add("lowest_odd_blink");
                }
                this.AddEventListenerIfNotExist(obj, () => {
                    this.OnOddsValuePressed(obj);
                });
            }
        }
    };

    /**
    * Set quinella odds value to dom element
    * @param {Array} _oddsArray -odds array value
    * @returns {null} 
    */
    SetQuinellaOddsValue(_oddsArray) {
        this.ClearAllTheOddsIdValue("quenlla");
        let lowestNum = Math.min(..._oddsArray.map(item => item.Odds));
        let quenllaId;
        for (let i = 0; i < _oddsArray.length; i++) {
            let className = this.GetColorClassNameAsPerOddsRange(_oddsArray[i].Odds);
            quenllaId = _oddsArray[i].ID;
            quenllaId = quenllaId.split("-");
            let obj = document.getElementById("quenlla_" + quenllaId[0] + "_" + quenllaId[1]);
            if (obj) {
                obj.innerText = _oddsArray[i].Odds;
                obj.className = className;
                if (lowestNum === Number(_oddsArray[i].Odds)) {
                    obj.classList.add("lowest_odd_blink");
                }

                this.AddEventListenerIfNotExist(obj, () => {
                    this.OnOddsValuePressed(obj);
                });
            }
        }
    };

    /**
    * Set exacta odds value to dom element
    * @param {Array} _oddsArray -odds array value
    * @returns {null} 
    */
    SetExactaOddsValue(_oddsArray) {
        this.ClearAllTheOddsIdValue("exacta");
        let lowestNum = Math.min(..._oddsArray.map(item => item.Odds));
        let exactaId;
        for (let i = 0; i < _oddsArray.length; i++) {
            let className = this.GetColorClassNameAsPerOddsRange(_oddsArray[i].Odds);
            exactaId = _oddsArray[i].ID;
            exactaId = exactaId.split("-");
            let obj = document.getElementById("exacta_" + exactaId[0] + "_" + exactaId[1]);
            if (obj) {
                obj.innerText = _oddsArray[i].Odds;
                obj.className = className;
                if (lowestNum === Number(_oddsArray[i].Odds)) {
                    obj.classList.add("lowest_odd_blink");
                }
                this.AddEventListenerIfNotExist(obj, () => {
                    this.OnOddsValuePressed(obj);
                });
            }
        }
    };

    /**
* Set trio odds value to dom element
* @param {Array} _oddsArray -odds array value
* @returns {null} 
*/
    SetTrioOddsValue(_oddsArray) {
        let mainTr = document.getElementById("trio_main_tr");
        while (mainTr.firstChild) {
            mainTr.removeChild(mainTr.lastChild);
        }
        this.ClearAllTheOddsIdValueOfTrioTrifecta("trio");
        let lowestNum = Math.min(..._oddsArray.map(item => item.Odds));
        let mainTdTag, tbodyTag;
        let count = 0;
        for (let i = 0; i < _oddsArray.length; i++) {
            let className = this.GetColorClassNameAsPerOddsRange(_oddsArray[i].Odds);
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
                tdTag.id = "trio_" + posNum.replaceAll("-", "_");
                this.AddEventListenerIfNotExist(tdTag, () => {
                    this.OnOddsValuePressed(tdTag);
                });
                tdTag.className = "chart_body";
                tdTag.classList.add(className);
                if (lowestNum === Number(_oddsArray[i].Odds)) {
                    tdTag.classList.add("lowest_odd_blink");
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
                tdTag.id = "trio_" + posNum.replaceAll("-", "_");
                this.AddEventListenerIfNotExist(tdTag, () => {
                    this.OnOddsValuePressed(tdTag);
                });
                tdTag.className = "chart_body";
                tdTag.classList.add(className);
                if (lowestNum === Number(_oddsArray[i].Odds)) {
                    tdTag.classList.add("lowest_odd_blink");
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
    SetTrifectaOddsValue(_oddsArray) {
        let mainTr = document.getElementById("trifecta_main_tr");
        while (mainTr.firstChild) {
            mainTr.removeChild(mainTr.lastChild);
        }
        this.ClearAllTheOddsIdValueOfTrioTrifecta("trifecta");
        let lowestNum = Math.min(..._oddsArray.map(item => item.Odds));
        let mainTdTag, tbodyTag;
        let count = 0;
        for (let i = 0; i < _oddsArray.length; i++) {
            let className = this.GetColorClassNameAsPerOddsRange(_oddsArray[i].Odds);
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
                tdTag.id = "trifecta_" + posNum.replaceAll("-", "_");
                this.AddEventListenerIfNotExist(tdTag, () => {
                    this.OnOddsValuePressed(tdTag);
                });
                tdTag.className = "chart_body";
                tdTag.classList.add(className);
                if (lowestNum === Number(_oddsArray[i].Odds)) {
                    tdTag.classList.add("lowest_odd_blink");
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
                tdTag.id = "trifecta_" + posNum.replaceAll("-", "_");
                this.AddEventListenerIfNotExist(tdTag, () => {
                    this.OnOddsValuePressed(tdTag);
                });
                tdTag.className = "chart_body";
                tdTag.classList.add(className);
                if (lowestNum === Number(_oddsArray[i].Odds)) {
                    tdTag.classList.add("lowest_odd_blink");
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
    * Set swinger odds value to dom element
    * @param {Array} _oddsArray -odds array value
    * @returns {null} 
    */
    SetSwingerOddsValue(_oddsArray) {
        this.ClearAllTheOddsIdValue("swinger");
        let lowestNum = Math.min(..._oddsArray.map(item => item.Odds));
        let swingerId;
        for (let i = 0; i < _oddsArray.length; i++) {
            let className = this.GetColorClassNameAsPerOddsRange(_oddsArray[i].Odds);
            swingerId = _oddsArray[i].ID;
            swingerId = swingerId.split("-");
            let obj = document.getElementById("swinger_" + swingerId[0] + "_" + swingerId[1]);
            if (obj) {
                obj.innerText = _oddsArray[i].Odds;
                obj.className = className;
                if (lowestNum === Number(_oddsArray[i].Odds)) {
                    obj.classList.add("lowest_odd_blink");
                }
                this.AddEventListenerIfNotExist(obj, () => {
                    this.OnOddsValuePressed(obj);
                });
            }
        }
    };

    /**
    * Set high low odds value to dom element
    * @returns {null} 
    */
    SetHiLoOddsValue() {
        let lowOddObj = document.getElementById("low_odd_section");//lo
        let hiOddObj = document.getElementById("hi_odd_section");//hi
        if (lowOddObj && hiOddObj) {
            lowOddObj.innerText = this.hiloOdds[1][1];//lo
            hiOddObj.innerText = this.hiloOdds[0][1];//hi
        }
    };

    /**
    * Set odd even odds value to dom element
    * @returns {null} 
    */
    SetOddEvenOddsValue() {
        let oddObj = document.getElementById("odd_section1");//odd
        let evenObj = document.getElementById("odd_section2");//even
        if (oddObj && evenObj) {
            oddObj.innerText = this.oddevenOdds[0][1];//odd
            evenObj.innerText = this.oddevenOdds[1][1];//even
        }
    };

    AddEventListenerIfNotExist(element, listener) {
        if (!this.HasClickEventListener(element)) {
            element.addEventListener('click', listener);
            // Store the listener in a data attribute for later reference
            if (!element.clickListeners) {
                element.clickListeners = [];
            }
            element.clickListeners.push(listener);
        }
    };

    HasClickEventListener(element) {
        return element.clickListeners && element.clickListeners.length > 0;
    };

    /**
    * Clear all the value of odds from dom element
    * @param {string} _name -odds name
    * @returns {null} 
    */
    ClearAllTheOddsIdValue(_name) {
        for (let i = 1; i <= 14; i++) {
            for (let j = 1; j <= 14; j++) {
                let obj = document.getElementById(`${_name}_${i}_${j}`);
                if (obj) {
                    obj.innerHTML = "-";
                    obj.classList.remove("lowest_odd_blink");
                    obj.classList.remove("active_yellow");
                    obj.classList.remove("blue_range");
                    obj.classList.remove("red_range");
                    obj.classList.remove("black_range");
                }
            }
        }
    };

    ClearAllTheOddsIdValueOfTrioTrifecta(_name) {
        for (let i = 1; i <= 14; i++) {
            for (let j = 1; j <= 14; j++) {
                for (let k = 1; k <= 14; k++) {
                    let obj = document.getElementById(`${_name}_${i}_${j}_${k}`);
                    if (obj) {
                        obj.innerHTML = "-";
                        obj.classList.remove("lowest_odd_blink");
                        obj.classList.remove("active_yellow");
                        obj.classList.remove("blue_range");
                        obj.classList.remove("red_range");
                        obj.classList.remove("black_range");
                    }
                }
            }
        }
    };

    RemoveActiveColorForSingleTypeOddsValue(_betName) {
        for (let i = 1; i <= 14; i++) {
            for (let j = 1; j <= 14; j++) {
                let obj = document.getElementById(`${_betName}_${i}_${j}`);
                if (obj) {
                    obj.classList.remove("active_yellow");
                }
            }
        }
    };

    RemoveActiveColorForTrioTrifectaOddsValue(_betName) {
        for (let i = 1; i <= 14; i++) {
            for (let j = 1; j <= 14; j++) {
                for (let k = 1; k <= 14; k++) {
                    let obj = document.getElementById(`${_betName}_${i}_${j}_${k}`);
                    if (obj) {
                        obj.classList.remove("active_yellow");
                    }
                }
            }
        }
    };

    ClearAllTheOddsActiveClass() {
        this.RemoveActiveColorForSingleTypeOddsValue("single");
        this.RemoveActiveColorForSingleTypeOddsValue("placeShow");
        this.RemoveActiveColorForSingleTypeOddsValue("swinger");
        this.RemoveActiveColorForSingleTypeOddsValue("quenlla");
        this.RemoveActiveColorForSingleTypeOddsValue("exacta");
        this.RemoveActiveColorForTrioTrifectaOddsValue("trio");
        this.RemoveActiveColorForTrioTrifectaOddsValue("trifecta");
    };

    /**
    * Get color class for odds range 
    * @param {number} _value -odd  value
    * @returns {null} 
    */
    GetColorClassNameAsPerOddsRange(_value) {
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

    async CheckWhetherRaceFinishedOrNot(_eventId) {
        let specificResultResp = await Server.GetSpecificEventResult(_eventId, Constant.sessionId);
        if (specificResultResp.data.Event.RaceEvent.attributes.EventStatus == "Finished" ||
            specificResultResp.data.Event.RaceEvent.attributes.EventStatus == "InProgress") {
            this.isRaceFinished = true;
        } else {
            this.isRaceFinished = false;
        }
    };

    OnOddsValuePressed(_obj) {
        if (!this.isClikedFromBetPosition) {
            if (!this.isRaceFinished) {
                if (_obj.innerHTML != "-") {
                    this.isClikedFromOddsValue = true;
                    let splitData = _obj.id.split("_");
                    let isClassActive = false;
                    let positionArray;
                    if (splitData[0] == "single" || splitData[0] == "placeShow") {
                        positionArray = splitData.slice(2);
                    } else {
                        positionArray = splitData.slice(1);
                    }
                    let joinPos = positionArray.join(",");

                    if (this.allOddsValueClikedArray.length > 0) {
                        let index = this.allOddsValueClikedArray.indexOf(joinPos);
                        if (index !== -1) {
                            this.allOddsValueClikedArray.splice(index, 1);
                            if (this.allOddsValueClikedArray.length == 0) {
                                this.isClikedFromOddsValue = false;
                            }
                        } else {
                            this.allOddsValueClikedArray.push(joinPos);
                        }
                    } else {
                        this.allOddsValueClikedArray.push(joinPos);
                    }

                    if (_obj.className.includes("active_yellow")) {
                        isClassActive = true;
                    } else {
                        isClassActive = false;
                    }

                    if (isClassActive) {
                        this.RemoveActiveColorFromOddsValue(_obj);
                    } else {
                        this.SetActiveColorForOddsValue(_obj);
                    }
                }
            }
        } else {
            Popup.ShowErrorPopup(Localization.youAreNotAllowFromOddsValueText);
        }
    };

    SetActiveColorForOddsValue(_obj) {
        _obj.classList.add("active_yellow");
    };

    RemoveActiveColorFromOddsValue(_obj) {
        _obj.classList.remove("active_yellow");
    };

    /**
     * Show bet position loader animation.
     * @returns {null} 
    **/
    ShowBetPositionLoader() {
        let sessionLoadingbj = document.getElementById("bet_position_loader");
        sessionLoadingbj.style.display = "block";
    };
    /**
     * Hide  bet position loader animation.
     * @returns {null} 
    **/
    HideBetPositionLoader() {
        let sessionLoadingbj = document.getElementById("bet_position_loader");
        sessionLoadingbj.style.display = "none";
    };

    ResetRightMainTab() {
        let tabObj = document.getElementById("rightSideMenuTab");
        let buttonObj = tabObj.querySelectorAll('button');
        buttonObj.forEach(function (button) {
            button.classList.remove("active");
            if (button.innerText == "ODDS") {
                button.classList.add("active");
            }
        });

        let leftTabObj = document.getElementById("leftSideMenuTab");
        let leftButtonObj = leftTabObj.querySelectorAll('button');
        leftButtonObj.forEach(function (button) {
            button.classList.remove("active");
            if (button.innerText == "ODDS") {
                button.classList.add("active");
            }
        });

        let tabContentObj = document.getElementById("gameResultOddsBetSlipHiLoOddEvenTabContent");
        let divObj = tabContentObj.querySelectorAll('div');

        divObj.forEach(function (div) {
            div.classList.remove("show");
            div.classList.remove("active");
            if (div.id == "Odds") {
                div.classList.add("show");
                div.classList.add("active");
            }
        });
    };

    ShowCommonOddsSearchAreaTable() {
        let oddsTableObj = document.getElementById("common_odds_search_table");
        oddsTableObj.style.display = "block";
    };
    HideCommonOddsSearchAreaTable() {
        let oddsTableObj = document.getElementById("common_odds_search_table");
        oddsTableObj.style.display = "none";
    };


}
//#endregion