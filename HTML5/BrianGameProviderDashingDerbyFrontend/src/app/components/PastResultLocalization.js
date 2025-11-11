/********* Script_Details ************
 * @Original_Creator :- Md jahangir.
 * @Created_Date :- 24-11-2023.
 * @Last_Update_By :- Md jahangir.
 * @Last_Updatd_Date :- 24-11-2023
 * @Description :- Handles message as per language.
 ************************************/

//#region - Class defination 
class PastResultLocalization {
    /**
    * initializes variables.
    * @Constructor
    */
    constructor() {

    };

    /**
    * Set the text as per language.
    * @param {string} _languageCode - language code of the game
    * @returns {null} 
    */
    async SetTextAsPerLanguage(_languageCode) {
        switch (_languageCode) {
            case "en":
                this.pastResultText = "PAST RACE RESULTS";
                this.pastRaceResultText = "PAST RACE RESULTS";
                this.hiloScoreCardText = "HIGH LOW SCORE CARD";
                this.oddEvenScoreCardText = "ODD EVEN SCORE CARD";
                this.topHighestWinnerText = "TOP 100 WINNER LIST";
                this.raceStartDateText = "Race Start Date";
                this.pastRaceResultsSmallText = "Past Race Results";
                this.searchHeadingText = "Search";
                this.winningOddsText = "Winning Odds";
                this.resultRaceNumberText = "Race Number";
                this.resultRaceStartDateText = "Race Start Date";
                this.resultRaceStartTimeText = "Race Start Time";
                this.resultWinningSeqText = "Winning Sequence";
                this.resultWinText = "WIN";
                this.resultPlaceShowText = "PLACE/SHOW";
                this.resultSwingerText = "SWINGER";
                this.resultQuinellaText = "QUINELLA";
                this.resultExactaText = "EXACTA";
                this.resultTrioText = "TRIO";
                this.resultTrifectaText = "TRIFECTA";
                this.resultHighLowText = "HIGH LOW";
                this.resultOddEvenText = "ODD EVEN";
                this.winnerRankText = "RANK";
                this.winnerPlayerText = "PLAYER";
                this.winnerNumberOfWinsText = "NUMBER OF WINS";
                this.winnerAvgWinOddText = "AVERAGE WINNING ODDS";
                this.winnerFavouriteText = "FAVOURITES";
                this.nextButtonText = "Next";
                this.previousButtonText = "Previous";
                this.betNameOddText = "ODD";
                this.betNameEvenText = "EVEN";
                this.betNameHighText = "HIGH";
                this.betNameLowText = "LOW";
                this.noDataFoundText = "No Data Found !";
                this.dateFieldNullText = "Please enter the dates !";
                this.dateFromFieldNullText = "Please enter the Race Start Date !";
                this.dateToFieldNullText = "Please enter the Race End Date !";
                this.firstButtonText = "First";
                this.lastButtonText = "Last";
                this.fromHeadingText = "From";
                this.toHeadingText = "To";
                break;
            case "ko":
                this.pastResultText = "지난 경기 결과";
                this.pastRaceResultText = "지난 경기 결과";
                this.hiloScoreCardText = "오버언더 스코어카드";
                this.oddEvenScoreCardText = "홀짝 스코어카드";
                this.topHighestWinnerText = "톱 100 수상자 리스트";
                this.raceStartDateText = "경기 시작 날짜";
                this.pastRaceResultsSmallText = "지난 경기 결과";
                this.searchHeadingText = "검색";
                this.winningOddsText = "배당률";
                this.resultRaceNumberText = "경주 번호";
                this.resultRaceStartDateText = "경기 시작 날짜";
                this.resultRaceStartTimeText = "경기 시작 시간";
                this.resultWinningSeqText = "승리 순서";
                this.resultWinText = "단승";
                this.resultPlaceShowText = "연승";
                this.resultSwingerText = "복연승";
                this.resultQuinellaText = "복승";
                this.resultExactaText = "쌍승";
                this.resultTrioText = "삼복승";
                this.resultTrifectaText = "삼쌍승";
                this.resultHighLowText = "오버언더";
                this.resultOddEvenText = "홀짝";
                this.winnerRankText = "계급";
                this.winnerPlayerText = "플레이어";
                this.winnerNumberOfWinsText = "승리 횟수";
                this.winnerAvgWinOddText = "평균 승리 확률";
                this.winnerFavouriteText = "즐겨찾기";
                this.nextButtonText = "다음";
                this.previousButtonText = "이전";
                this.betNameOddText = "홀";
                this.betNameEvenText = "짝";
                this.betNameHighText = "오버";
                this.betNameLowText = "언더";
                this.noDataFoundText = "데이터가 존재하지 않습니다 !";
                this.dateFieldNullText = "날짜를 입력하세요 !";
                this.dateFromFieldNullText = "레이스 시작 날짜를 입력하세요 !";
                this.dateToFieldNullText = "레이스 종료 날짜를 입력하세요 !";
                this.firstButtonText = "처음";
                this.lastButtonText = "마지막";
                this.fromHeadingText = "부터";
                this.toHeadingText = "까지";
                break;
        }
        await this.SetValueToDomText();
    };

    /**
    * Set the text value to dom elemnet with id as per language.
    * @param {string} _languageCode - language code of the game
    * @returns {null} 
    */
    async SetValueToDomText(_languageCode) {

        let pastResultHeadingObj = document.getElementById("pastResultHeading");
        pastResultHeadingObj.innerText = this.pastResultText;

        let pastRaceResultHeadingObj = document.getElementById("past_race_result_tab");
        pastRaceResultHeadingObj.innerText = this.pastRaceResultText;

        let hiloObj = document.getElementById("high_low_score_card_tab");
        hiloObj.innerText = this.hiloScoreCardText;

        let oddEvenScoreObj = document.getElementById("odd_even_score_card_tab");
        oddEvenScoreObj.innerText = this.oddEvenScoreCardText;

        let topHighestHeadingObj = document.getElementById("top_highest_winners_tab");
        topHighestHeadingObj.innerText = this.topHighestWinnerText;

        let raceStartDateHeadingObj = document.getElementById("raceStartDateHeading");
        raceStartDateHeadingObj.innerText = this.raceStartDateText;

        let searchObj = document.getElementById("previous_page_search_button");
        searchObj.innerText = this.searchHeadingText;

        let pastResultSmallHeadingObj = document.getElementById("pastResultHeadingSmall");
        pastResultSmallHeadingObj.innerText = this.pastRaceResultsSmallText;

        let winningOddsHeadingObj = document.getElementById("winningOddsHeading");
        winningOddsHeadingObj.innerText = this.winningOddsText;

        let resultRaceNumberHeadingObj = document.getElementById("resultRaceNumberHeading");
        resultRaceNumberHeadingObj.innerText = this.resultRaceNumberText;

        let resultStartDateHeadingObj = document.getElementById("resultRaceStartDateHeading");
        resultStartDateHeadingObj.innerText = this.resultRaceStartDateText;

        let resultStartTimeHeadingObj = document.getElementById("resultRaceStartTimeHeading");
        resultStartTimeHeadingObj.innerText = this.resultRaceStartTimeText;

        let resultWiiningSeqHeadingObj = document.getElementById("resultWinningSeqHeading");
        resultWiiningSeqHeadingObj.innerText = this.resultWinningSeqText;

        let resultWinHeadingObj = document.getElementById("resultWinHeading");
        resultWinHeadingObj.innerText = this.resultWinText;

        let resultShowPlaceHeadingObj = document.getElementById("resultPlaceShowHeading");
        resultShowPlaceHeadingObj.innerText = this.resultPlaceShowText;

        let resultSwingerHeadingObj = document.getElementById("resultSwingerHeading");
        resultSwingerHeadingObj.innerText = this.resultSwingerText;

        let resultQuinellaHeadingObj = document.getElementById("resultQuinellaHeading");
        resultQuinellaHeadingObj.innerText = this.resultQuinellaText;

        let resultExactaHeadingObj = document.getElementById("resultExactaHeading");
        resultExactaHeadingObj.innerText = this.resultExactaText;

        let resultTrioHeadingObj = document.getElementById("resultTrioHeading");
        resultTrioHeadingObj.innerText = this.resultTrioText;

        let resultTrifectaHeadingObj = document.getElementById("resultTrifectaHeading");
        resultTrifectaHeadingObj.innerText = this.resultTrifectaText;

        let resultHighLowHeadingObj = document.getElementById("resultHighLowHeading");
        resultHighLowHeadingObj.innerText = this.resultHighLowText;

        let resultOddEvenHeadingObj = document.getElementById("resultOddEvenHeading");
        resultOddEvenHeadingObj.innerText = this.resultOddEvenText;

        let winnerRankHeadingObj = document.getElementById("topWinnerRankHeading");
        winnerRankHeadingObj.innerText = this.winnerRankText;

        let winnerPlayerHeadingObj = document.getElementById("topWinnerPlayerHeading");
        winnerPlayerHeadingObj.innerText = this.winnerPlayerText;

        let winnerNumOfWinHeadingObj = document.getElementById("topWinnerNumOfWinHeading");
        winnerNumOfWinHeadingObj.innerText = this.winnerNumberOfWinsText;

        let winnerAvgWinOddHeadingObj = document.getElementById("topWinnerAvgWinOddsHeading");
        winnerAvgWinOddHeadingObj.innerText = this.winnerAvgWinOddText;

        let winnerFavouritesHeadingObj = document.getElementById("topWinnerFavouritesHeading");
        winnerFavouritesHeadingObj.innerText = this.winnerFavouriteText;

        let nextButtonObj = document.getElementById("pastResultPreviousButton");
        nextButtonObj.innerText = this.previousButtonText;

        let previousButtonObj = document.getElementById("pastResultNextButton");
        previousButtonObj.innerText = this.nextButtonText;

        let firstButtonObj = document.getElementById("pastResultFirstButton");
        firstButtonObj.innerText = this.firstButtonText;

        let lastButtonObj = document.getElementById("pastResultLastButton");
        lastButtonObj.innerText = this.lastButtonText;

        let startDateFromObj = document.getElementById("race_start_date_from");
        startDateFromObj.placeholder = this.fromHeadingText;
        let startDateToObj = document.getElementById("race_start_date_to");
        startDateToObj.placeholder = this.toHeadingText;

    };


}
//#endregion 
let localization = new PastResultLocalization();
export { localization as PastResultLocalization };