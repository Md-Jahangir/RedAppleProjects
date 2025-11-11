/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 02-11-2023.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 02-11-2023
 * @Description :- Handles all dom related task for past race rersult.
 ************************************/

//#region - importing required scripts 
import { Server } from "../services/Server.js";
import { Utils } from "./Utils.js";
import { PastResultPopup } from "./PastResultPopup.js";
import { PastResultLoader } from "./PastResultLoader.js";
import { PastResultLocalization } from "./PastResultLocalization.js";

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

//#endregion
//#region - Class defination 
export default class PastRaceResultManager {
    /**
    * Initializes variables and call the function for add event.
    * @Constructor
    */
    constructor() {
        this.totalCount = null;
        this.totalRecords = 0;
        this.currentPageNumber = 1;
        this.limit = 10;
        this.numberOfPages = 0;

        this.urlParams = new URLSearchParams(window.location.search);
        this.token = this.urlParams.get("token");
        this.sessionId = this.urlParams.get("sessionid");
        this.gameType = this.urlParams.get("gametype");
        this.languageCode = this.urlParams.get("languagecode");

        PastResultLoader.ShowPastResultLoader();
        PastResultLocalization.SetTextAsPerLanguage(this.languageCode);

        this.Get24HoursDataFromApi();
        this.GetAllPlayerRankFromApi();
        this.AddEventListenerToSearchButton();
        this.AddEventListenerToNextButton();
        this.AddEventListenerToPreviousButton();
        this.AddEventListenerToFastButton();
        this.AddEventListenerToLastButton();
    };

    //----------------------- 24 HOURS DATA -------------------------------
    async Get24HoursDataFromApi() {
        let prev = moment.utc().subtract(1, "days").format('YYYYMMDDHHmmss');
        let curr = moment.utc().format('YYYYMMDDHHmmss');
        let responseData = await Server.GetGame24HoursEventData(prev, curr, this.gameType, this.sessionId);

        let dataArray = [];
        if (responseData.error == false) {
            try {
                await this.GetDataForHighLow(responseData.data.Events.RaceEvent);
                await this.GetDataForOddEven(responseData.data.Events.RaceEvent);
                responseData.data.Events.RaceEvent.forEach(element => {
                    let eventNumber = element.attributes.EventNumber;
                    let startTime = element.attributes.EventTime;
                    let endTime = element.attributes.FinishTime;
                    let eventId = element.attributes.ID;
                    dataArray.push({ id: eventId, startTime: startTime, endTime: endTime, raceNumber: eventNumber });
                });
                this.SetRaceNumberFrom(dataArray);
                this.SetRaceNumberTo(dataArray);
                this.SetRaceStartTimeFrom(dataArray);
                this.SetRaceStartTimeTo(dataArray);
            } catch { }
        }
    };
    //--------------------------------------------------------------------

    //------------------------------- HIGH LOW DATA------------------------
    async GetDataForHighLow(_data) {
        let highLowData;
        highLowData = _data.filter((elem) => {
            if (elem.attributes.EventStatus === "Finished") {
                return elem;
            }
        });

        let highLowSecquence = [];
        let tempArray = [];
        let result;

        try {
            for (let i = 0; i < highLowData.length; i++) {
                if (highLowData[i].attributes.Result) {
                    result = highLowData[i].attributes.Result;
                }
                let orgEvt = highLowData[i].attributes.EventTime;
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
                let eventNumber = highLowData[i].attributes.EventNumber;
                let serverTime = highLowData[i].attributes.EventTime;

                serverTime = serverTime.split("T");
                let actualServerTime = serverTime[1].split(":");
                let raceStartTime = Utils.ConvertUtcTimeToLocal(actualServerTime[0], actualServerTime[1], actualServerTime[2]);
                let hiloSeqObj = { "winingType": winnerType, "eventNumber": eventNumber, "raceStartTime": raceStartTime };
                highLowSecquence.push(hiloSeqObj);
            }
            let returnData = GetTheHiLoOddEvenData(highLowSecquence);

            await this.SetDataForHighLow(returnData);
        } catch (error) { }
    };
    async SetDataForHighLow(highLowWinnerArray) {
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
            oddColValue = PastResultLocalization.betNameHighText;
            evenColValue = PastResultLocalization.betNameLowText;
        } else {
            oddColValue = PastResultLocalization.betNameLowText;
            evenColValue = PastResultLocalization.betNameHighText;
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
                if (Utils.IsEmpty(highLowWinnerArray[j][i])) {

                    colCell = colCell + "<td>" + "" + "</td>";
                } else {
                    if (highLowWinnerArray[j][i].winingType == "HI") {
                        colCell = colCell + "<td>";
                        colCell = colCell + "<div class='oddred'>" +
                            highLowWinnerArray[j][i].eventNumber
                        colCell = colCell + "</div>";
                        colCell = colCell + "</td>";
                    } else if (highLowWinnerArray[j][i].winingType == "LO") {
                        colCell = colCell + "<td>";
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

        let objContainer = document.getElementById("pasthilocontainer");
        let objFooter = document.getElementById("pasthilofooter");
        let objHeader = document.getElementById("pasthiloheader");
        objContainer.innerHTML = colCell;
        objFooter.innerHTML = footerCell;
        objHeader.innerHTML = headerCell;
    };
    //----------------------------------------------------------------------

    //----------------------- ODD EVEN DATA---------------------------------
    async GetDataForOddEven(_data) {
        let oddEvenData;
        oddEvenData = _data.filter((elem) => {
            if (elem.attributes.EventStatus === "Finished") {
                return elem;
            }
        });

        let oddEvenSequenceArray = [];
        let result;
        let tempArray = [];

        try {
            for (let i = 0; i < oddEvenData.length; i++) {
                if (oddEvenData[i].attributes.Result) {
                    result = oddEvenData[i].attributes.Result;
                }
                let orgEvt = oddEvenData[i].attributes.EventTime;
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
                let eventNumber = oddEvenData[i].attributes.EventNumber;
                let serverTime = oddEvenData[i].attributes.EventTime;
                serverTime = serverTime.split("T");
                let actualServerTime = serverTime[1].split(":");
                let raceStartTime = Utils.ConvertUtcTimeToLocal(actualServerTime[0], actualServerTime[1], actualServerTime[2]);
                let oddEvenSeqObj = { "winingType": winnerType, "eventNumber": eventNumber, "raceStartTime": raceStartTime };
                oddEvenSequenceArray.push(oddEvenSeqObj);
            }
            let returnData = GetTheHiLoOddEvenData(oddEvenSequenceArray);
            await this.SetDataForOddEven(returnData);
        } catch (error) { }
    };
    async SetDataForOddEven(oddEvenWinnerArray) {
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
            oddColValue = PastResultLocalization.betNameEvenText;
            evenColValue = PastResultLocalization.betNameOddText;
        } else {
            oddColValue = PastResultLocalization.betNameOddText;
            evenColValue = PastResultLocalization.betNameEvenText;
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
                if (Utils.IsEmpty(oddEvenWinnerArray[j][i])) {
                    colCell = colCell + "<td >" + "" + "</td>";
                } else {
                    if (oddEvenWinnerArray[j][i].winingType == "EVEN") {
                        colCell = colCell + "<td>";
                        colCell = colCell + "<div class='oddredborder'>" +
                            oddEvenWinnerArray[j][i].eventNumber
                        colCell = colCell + "</div";
                        colCell = colCell + "</td>";
                    } else {
                        colCell = colCell + "<td>";
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

        let objContainer = document.getElementById("pastoddevencontainer");
        let objFooter = document.getElementById("pastoddevenfooter");
        let objHeader = document.getElementById("pastoddevenheader");
        objContainer.innerHTML = colCell;
        objFooter.innerHTML = footerCell;
        objHeader.innerHTML = headerCell;

        PastResultLoader.HidePastResultLoader();
    };
    //-----------------------------------------------------------------------

    //------------------------- TOP 100 Player rank--------------------------
    async GetAllPlayerRankFromApi() {
        let response = await Server.GetAllPlayerRank(this.gameType);
        if (response.error == false) {
            if (response.data.length > 0) {
                await this.SetPlayerRankData(response.data);
            } else {

            }
        } else {

        }
    };
    async SetPlayerRankData(_data) {
        let rankObj = document.getElementById("topHighestTBody");
        for (let i = 0; i < _data.length; i++) {
            let trTag = document.createElement('tr');

            let rankTd = document.createElement('td');
            rankTd.innerText = _data[i].player_rank;
            trTag.appendChild(rankTd);

            let nameTd = document.createElement('td');
            nameTd.innerText = _data[i].player_name;
            trTag.appendChild(nameTd);

            let winsTd = document.createElement('td');
            winsTd.innerText = _data[i].total_win;
            trTag.appendChild(winsTd);

            let winOddTd = document.createElement('td');
            winOddTd.innerText = _data[i].avg_odds;
            trTag.appendChild(winOddTd);

            let ratingTd = document.createElement('td');
            await this.PrintStarIcon(ratingTd, _data[i].avg_rating);
            trTag.appendChild(ratingTd);

            rankObj.appendChild(trTag);
        }
    };
    async PrintStarIcon(_obj, _rating) {
        let startRatingDivTag = document.createElement('div');
        startRatingDivTag.className = "Stars";
        let rating = _rating;
        startRatingDivTag.style = "--rating:" + rating;
        _obj.appendChild(startRatingDivTag);
    };
    //--------------------------------------------------

    //---------------------------- SEARCH BUTTON, Search Result --------------------------
    AddEventListenerToSearchButton() {
        let searchButtonObj = document.getElementById("previous_page_search_button");
        searchButtonObj.addEventListener("click", async () => {
            await this.ShowSearchResult();
            this.CreatePagination(this.numberOfPages);
        });
    };
    AddEventListenerToNextButton() {
        let searchButtonObj = document.getElementById("pastResultNextButton");
        searchButtonObj.addEventListener("click", async () => {
            this.currentPageNumber++;
            await this.ShowSearchResult();
            let paginationContainer = document.getElementById("pagination_container");
            this.SelectParticularPageNumber(paginationContainer.children[this.currentPageNumber - 1]);
            this.RearrangePageNumber(this.currentPageNumber);
        });
    };
    AddEventListenerToPreviousButton() {
        let searchButtonObj = document.getElementById("pastResultPreviousButton");
        searchButtonObj.addEventListener("click", async () => {
            if (this.currentPageNumber > 1) {
                this.currentPageNumber--;
            }
            await this.ShowSearchResult();
            let paginationContainer = document.getElementById("pagination_container");
            this.SelectParticularPageNumber(paginationContainer.children[this.currentPageNumber - 1]);
            this.RearrangePageNumber(this.currentPageNumber);
        });
    };
    AddEventListenerToFastButton() {
        let searchButtonObj = document.getElementById("pastResultFirstButton");
        searchButtonObj.addEventListener("click", async () => {
            this.currentPageNumber = 1;
            await this.ShowSearchResult();
            let paginationContainer = document.getElementById("pagination_container");
            this.SelectParticularPageNumber(paginationContainer.children[this.currentPageNumber - 1]);
            this.RearrangePageNumber(this.currentPageNumber);
        });
    };
    AddEventListenerToLastButton() {
        let searchButtonObj = document.getElementById("pastResultLastButton");
        searchButtonObj.addEventListener("click", async () => {
            if (this.numberOfPages > 0) {
                this.currentPageNumber = this.numberOfPages;
            }
            await this.ShowSearchResult();
            let paginationContainer = document.getElementById("pagination_container");
            this.SelectParticularPageNumber(paginationContainer.children[this.currentPageNumber - 1]);
            this.RearrangePageNumber(this.currentPageNumber);
        });
    };
    async ShowSearchResult() {
        PastResultLoader.ShowResultPositionLoader();
        let fromDate = await this.GetFromDateFromDatePicker();
        let toDate = await this.GetToDateFromDatePicker();
        if (!Utils.IsEmpty(fromDate) && !Utils.IsEmpty(toDate)) {
            try {
                let response = await Server.GetPastEventResultHistory(fromDate, toDate, this.limit, this.currentPageNumber);
                if (response.error == false) {
                    if (response.data.length > 0) {
                        this.totalCount = response.count;
                        this.totalRecords = ((this.currentPageNumber - 1) * this.limit) + response.data.length;
                        this.numberOfPages = parseInt(this.totalCount / this.limit);
                        if (this.totalCount % this.limit > 0) {
                            this.numberOfPages++;
                        } else {
                        }
                        await this.SetValueForPastRaceResultSection(response.data);
                        this.EnableDisbleNextPreviousButton();
                    } else {
                        PastResultPopup.ShowPastResultErrorPopup(PastResultLocalization.noDataFoundText);
                        PastResultLoader.HideResultPositionLoader();
                        this.ClearAllTheResultSectionData();
                        this.ClearAllPaginationContainerData();
                    }
                } else {
                    PastResultPopup.ShowPastResultErrorPopup(response.message);
                    PastResultLoader.HideResultPositionLoader();
                    this.ClearAllTheResultSectionData();
                    this.ClearAllPaginationContainerData();
                }
            } catch (e) {
                console.log('error : ', e.message)
                PastResultPopup.ShowPastResultErrorPopup(e.message);
                PastResultLoader.HideResultPositionLoader();
                this.ClearAllTheResultSectionData();
                this.ClearAllPaginationContainerData();
            }
        } else if (!Utils.IsEmpty(fromDate)) {
            PastResultPopup.ShowPastResultErrorPopup(PastResultLocalization.dateToFieldNullText);
            PastResultLoader.HideResultPositionLoader();
            this.ClearAllTheResultSectionData();
            this.ClearAllPaginationContainerData();

        } else if (!Utils.IsEmpty(toDate)) {
            PastResultPopup.ShowPastResultErrorPopup(PastResultLocalization.dateFromFieldNullText);
            PastResultLoader.HideResultPositionLoader();
            this.ClearAllTheResultSectionData();
            this.ClearAllPaginationContainerData();

        } else {
            PastResultPopup.ShowPastResultErrorPopup(PastResultLocalization.dateFieldNullText);
            PastResultLoader.HideResultPositionLoader();
            this.ClearAllTheResultSectionData();
            this.ClearAllPaginationContainerData();
        }
    };

    EnableDisbleNextPreviousButton() {
        if (this.totalRecords >= this.totalCount) {
            let nextButtonObj = document.getElementById("pastResultNextButton");
            nextButtonObj.classList.add('disabled');
        } else {
            let nextButtonObj = document.getElementById("pastResultNextButton");
            nextButtonObj.classList.remove('disabled');
        }

        if (this.currentPageNumber == 1) {
            let previousButtonObj = document.getElementById("pastResultPreviousButton");
            previousButtonObj.classList.add('disabled');
        } else {
            let previousButtonObj = document.getElementById("pastResultPreviousButton");
            previousButtonObj.classList.remove('disabled');
        }
    };

    CreatePagination(_numOfPage) {
        this.ClearAllPaginationContainerData();
        let paginationContainer = document.getElementById("pagination_container");
        for (let i = 1; i <= _numOfPage; i++) {
            let pageLi = document.createElement('li');
            pageLi.classList.add("page-item");
            pageLi.classList.add("number");
            let pageAnchor = document.createElement('a');
            pageAnchor.innerText = i;
            pageLi.addEventListener("click", () => {
                this.OnPageNumberClicked(pageLi);
            });
            pageAnchor.classList.add("page-link");
            pageLi.appendChild(pageAnchor);

            paginationContainer.appendChild(pageLi);

            if (i == 1) {
                this.OnPageNumberClicked(pageLi);
            }
        }
    };

    RearrangePageNumber(_number) {
        let paginationContainer = document.getElementById("pagination_container");
        let count = 0;
        if (_number <= 2) {
            for (let i = 0; i < paginationContainer.children.length; i++) {
                let pageHolder = paginationContainer.children[i];
                if (pageHolder) {
                    count++;
                    if (count <= 3) {
                        pageHolder.style.display = 'block';
                    }
                    else {
                        pageHolder.style.display = 'none'
                    }
                }
            }
        } else if (_number > this.numberOfPages - 2) {
            count = 0;
            for (let i = paginationContainer.children.length; i >= 0; i--) {
                let pageHolder = paginationContainer.children[i];
                if (pageHolder) {
                    count++;
                    if (count <= 3) {
                        pageHolder.style.display = 'block';
                    }
                    else {
                        pageHolder.style.display = 'none'
                    }
                }
            }
        }
        else {
            count = 0;
            for (let i = parseInt(_number - 2); i >= 0; i--) {
                let pageHolder = paginationContainer.children[i];
                if (pageHolder) {
                    count++;
                    if (count <= 2) {
                        pageHolder.style.display = 'block';
                    }
                    else {
                        pageHolder.style.display = 'none'
                    }
                }
            }
            count = 0;
            for (let i = parseInt(_number - 1); i < this.numberOfPages; i++) {
                let pageHolder = paginationContainer.children[i];
                if (pageHolder) {
                    count++;
                    if (count <= 1) {
                        pageHolder.style.display = 'block';
                    }
                    else {
                        pageHolder.style.display = 'none';
                    }
                }
            }
        }
    };

    async OnPageNumberClicked(_obj) {
        this.SelectParticularPageNumber(_obj);
        this.currentPageNumber = parseInt(_obj.children[0].innerText);
        await this.ShowSearchResult();
        this.RearrangePageNumber(this.currentPageNumber);
    };
    SelectParticularPageNumber(_obj) {
        if (_obj) {
            let paginationContainer = document.getElementById("pagination_container");
            for (let i = 0; i < paginationContainer.children.length; i++) {
                paginationContainer.children[i].classList.remove("active");
            }
            _obj.classList.add("active");
        }

    };
    ClearAllPaginationContainerData() {
        let paginationContinerObj = document.getElementById("pagination_container");
        while (paginationContinerObj.firstChild) {
            paginationContinerObj.removeChild(paginationContinerObj.lastChild);
        }
    };

    async GetFromDateFromDatePicker() {
        let fromObj = document.getElementById("race_start_date_from");
        let date = fromObj.value;
        if (!Utils.IsEmpty(date)) {
            let formatedDate = await this.FormatDate(date);
            return formatedDate;
        } else {
            return null;
        }
    };
    async GetToDateFromDatePicker() {
        let toObj = document.getElementById("race_start_date_to");
        let date = toObj.value;
        if (!Utils.IsEmpty(date)) {
            let formatedDate = await this.FormatDate(date);
            return formatedDate;
        } else {
            return null;
        }
    };
    async FormatDate(_date) {
        let splitData = _date.split("/");
        let formatDate = splitData[2] + "-" + splitData[0] + "-" + splitData[1];
        return formatDate;
    };

    async ReplaceWithDash(_value) {
        let format = _value.replaceAll(",", "-");
        return format;
    };

    async SetValueForPastRaceResultSection(_data) {
        this.ClearAllTheResultSectionData();

        let pastRaceResultTBodyObj = document.getElementById("pastRaceResultTBoday");
        for (let i = 0; i < _data.length; i++) {
            let trTag = document.createElement('tr');

            let raceNumTd = document.createElement('td');
            raceNumTd.innerText = _data[i].eventNumber;
            trTag.appendChild(raceNumTd);

            let startDateTd = document.createElement('td');
            let startDate = this.GetConvertedLocalDate(_data[i].eventStartTime);

            startDateTd.innerText = startDate;
            trTag.appendChild(startDateTd);

            let startTimeTd = document.createElement('td');
            let startTime = this.GetConvertedToLoclTime(_data[i].eventStartTime);
            startTimeTd.innerText = startTime;
            trTag.appendChild(startTimeTd);

            let winSeqTd = document.createElement('td');
            winSeqTd.innerText = _data[i].result;
            trTag.appendChild(winSeqTd);

            let winOddTd = document.createElement('td');
            winOddTd.innerText = _data[i].win;
            trTag.appendChild(winOddTd);

            let showPlaceOddTd = document.createElement('td');
            showPlaceOddTd.innerText = _data[i].place;
            trTag.appendChild(showPlaceOddTd);

            let swingerOddTd = document.createElement('td');
            let swingOdd1 = await this.ReplaceWithDash(_data[i].swinger[0]);
            let swingOdd2 = await this.ReplaceWithDash(_data[i].swinger[1]);
            let swingOdd3 = await this.ReplaceWithDash(_data[i].swinger[2]);
            let swingerOdd = swingOdd1 + ", " + swingOdd2 + ", " + swingOdd3;
            swingerOddTd.innerText = swingerOdd;
            trTag.appendChild(swingerOddTd);

            let quinellaOddTd = document.createElement('td');
            let quinellaOdd = await this.ReplaceWithDash(_data[i].quinella);
            quinellaOddTd.innerText = quinellaOdd;
            trTag.appendChild(quinellaOddTd);

            let exactaOddTd = document.createElement('td');
            let exactaOdd = await this.ReplaceWithDash(_data[i].exacta);
            exactaOddTd.innerText = exactaOdd;
            trTag.appendChild(exactaOddTd);

            let trioOddTd = document.createElement('td');
            let trioOdd = await this.ReplaceWithDash(_data[i].trio);
            trioOddTd.innerText = trioOdd;
            trTag.appendChild(trioOddTd);

            let trifectaOddTd = document.createElement('td');
            let trifectaOdd = await this.ReplaceWithDash(_data[i].trifecta);
            trifectaOddTd.innerText = trifectaOdd;
            trTag.appendChild(trifectaOddTd);

            let hiloOddTd = document.createElement('td');
            hiloOddTd.innerText = _data[i].hi_lo;
            trTag.appendChild(hiloOddTd);

            let oddEvenOddTd = document.createElement('td');
            oddEvenOddTd.innerText = _data[i].odd_even;
            trTag.appendChild(oddEvenOddTd);

            pastRaceResultTBodyObj.appendChild(trTag);
        }
        PastResultLoader.HideResultPositionLoader();
    };

    GetConvertedToLoclTime(_data) {
        let date = _data.split("T");
        let time = date[1];
        time = time.split(":");
        time = Utils.ConvertUtcTimeToLocal(time[0], time[1], time[2]);
        return time;
    };
    GetConvertedLocalDate(_data) {
        let date = _data.split("T");
        date = date[0];
        return date;
    };

    ClearAllTheResultSectionData() {
        let pastRaceResultTBodyObj = document.getElementById("pastRaceResultTBoday");
        while (pastRaceResultTBodyObj.firstChild) {
            pastRaceResultTBodyObj.removeChild(pastRaceResultTBodyObj.lastChild);
        }
    };
    //---------------------------------------------------------------------

};

//#endregion 