/********* Script_Details ************
 * @Original_Creator :- Md jahangir.
 * @Created_Date :- 21-04-2023.
 * @Last_Update_By :- Md jahangir.
 * @Last_Updatd_Date :- 11-05-2023
 * @Description :- Handles message as per language.
 ************************************/

//#region - Class defination 
class Localization {
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
    SetTheTextAsPerLanguage(_languageCode) {
        switch (_languageCode) {
            case "en":
                this.htpImage1Url = "./assets/images/howtoplay/how_to_play_01_eng.png";
                this.htpImage2Url = "./assets/images/howtoplay/how_to_play_02_eng.png";
                this.htpImage3Url = "./assets/images/howtoplay/how_to_play_03_eng.png";
                this.htpImage4Url = "./assets/images/howtoplay/how_to_play_04_eng.png";
                this.htpImage5Url = "./assets/images/howtoplay/how_to_play_05_eng.png";
                this.htpImage6Url = "./assets/images/howtoplay/how_to_play_06_eng.png";
                this.htpImage7Url = "./assets/images/howtoplay/how_to_play_07_eng.png";
                this.htpImage8Url = "./assets/images/howtoplay/how_to_play_08_eng.png";

                this.betSlipPurchaseText = "BET SLIP PURCHASE";
                this.gameResultsText = "GAME RESULTS";
                this.oddsText = "ODDS";
                this.hiLoText = "HIGH LOW";
                this.oddEvenText = "ODD EVEN";
                this.hiorLoText = "HIGH OR LOW";
                this.oddorEvenText = "ODD OR EVEN";
                this.raceStartTimeText = "RACE START TIME";
                this.betClosingTimeText = "BET CLOSING TIME";
                this.raceNumberText = "RACE NUMBER";
                this.searchTableRaceNumberText = "RACE NO.";
                this.oddsRaceNumberText = "Race Number";
                this.betSlipAmountText = "BET SLIP AMOUNT";
                this.estimateWinAmountText = "ESTIMATED WIN AMOUNT";
                this.availableBalanceText = "AVAILABLE BALANCE";
                this.resetText = "RESET";
                this.buyBetSlipText = "BUY BET SLIP";
                this.placeBetButtonText = "PLACE BET";
                this.betSlipPurchaseHistoryText = "BET SLIP PURCHASE HISTORY";
                this.searchText = "SEARCH";
                this.betStartTimeText = "BET START";
                this.betResultText = "BET RESULT";
                this.totalBetAmountText = "TOTAL BET";
                this.totalwinAmountText = "TOTAL WIN";
                this.betTypeText = "BET TYPE";
                this.historyPositionText = "Position";
                this.historyOddsText = "ODDS";
                this.betAmountText = "BET AMOUNT";
                this.winAmountText = "WIN AMOUNT";
                this.betSlipWinAmountText = "  Win Amount";
                this.statusText = "STATUS";
                this.totalPurchaseAmountText = "TOTAL PURCHASE AMOUNT";
                this.dateText = "Date";
                this.timeText = "Time";

                this.winMessageText = "Pick 1 Player and finish 1st to win";//"Pick 1 Player and finish 1st to win";
                this.placeMessageText = "Pick 1 Player which finishes either 1st or 2nd (total Players under 7)";// "Pick 1 Player which finishes either 1st or 2nd (total Players 7 and under)";// "Pick 1 Player which finishes either 1st or 2nd";
                this.showMessageText = "Pick 1 Player which finishes either 1st, 2nd or 3rd (total Players over 7)";// "Pick 1 Player which finishes either 1st, 2nd, or 3rd (total Players 8 and over)";// "Pick 1 Player which finishes among top 3";
                this.swingerMessageText = "Pick 2 Players which finishes among top 3, no order";// "Pick 2 Players which finishes among top 3, no order";
                this.quinellaMessageText = "Pick 2 Players and finish 1st or 2nd, in either order, to win";// "Pick 2 Players and finish 1st or 2nd, in either order, to win";
                this.exactaMessageText = "Pick 2 Players and finish 1st and 2nd, in exact order, to win";// "Pick 2 Players and finish 1st and 2nd, in exact order, to win";
                this.trioMessageText = "Pick 3 Players and finish among 1st, 2nd, 3rd, in any order, to win";// "Pick 3 Players and finish among 1st, 2nd, 3rd, in any order, to win";
                this.trifectaMessageText = "Pick 3 Players and finish 1st, 2nd and 3rd, in exact order, to win";// "Pick 3 Players and finish 1st, 2nd and 3rd, in exact order, to win";
                this.hiLoMessageText = "Pick 1 and finish 1st to win";// "Pick 1 and finish 1st to win";
                this.evenOddMessageText = "Pick 1 and finish 1st to win";// "Pick 1 and finish 1st to win";
                this.quinellaComboMessageText = "Pick 2 and both finish 1st and 2nd regardless of order to win";
                this.exactaComboMessageText = "Pick 2 and both finish 1st and 2nd in exact order to win";
                this.oddEvenHiLoComboMessageText = "Pick 1 option to win";

                this.urlParameterMissingText = "Url Parameter Missing !";
                this.pleaseSelectTheBetAmountText = "Please Select The Bet Amount !";
                this.pleaseSelectTheText = "Please Select The ";
                this.positionText = " Position !";
                this.firstText = "ST";
                this.secondText = "ND";
                this.thirdText = "RD";
                this.sorryBetClosedText = "Sorry! Bet Closed...";
                this.insufficientBalanceText = "Insufficient Balance !";
                this.IssueWithServerTimePleaseRefreshThePageText = "Due to Betting has not been made for an extended time, the server has been time out.";//"Issue With Server Time. Please Refresh The Page !";
                this.noValueWillBeNullText = "No Value Will Be Empty !";
                this.totalWinOrBetAmountIsNullText = "Total Win Or Bet Amount Is Null !";
                this.noDataFoundText = "No Data Found !";
                this.pleaseSelectTheRaceNumberText = "Please Select The Race Number !";
                this.pleaseSelectTheOptionText = "  Please Select The Race Below or Type The Race Number ";
                this.resultRaceNumberText = "Result : Race Number - ";
                this.resultRaceStartTimeText = "  / Race Start Time - ";
                this.resultWinningSequenceText = "  / Winning Sequence: ";
                this.ifYouLeaveTheCurrentGameText = "If you leave the current game you will loose bet history ! \nDo you want to leave ?";
                this.betNameWinText = "WIN";
                this.betNamePlaceText = "PLACE(6)";
                this.betNameShowText = "SHOW(8)";
                this.betNameOnlyPlaceText = "PLACE";
                this.betNameOnlyShowText = "SHOW";
                this.betNamePlaceShowText = "PLACE/SHOW";
                this.betNameSwingerText = "SWINGER";
                this.betNameQuinellaText = "QUINELLA";
                this.betNameExactaText = "EXACTA";
                this.betNameShowTrioText = "TRIO";
                this.betNameShowTrifectaText = "TRIFECTA";
                this.betNameOddText = "ODD";
                this.betNameEvenText = "EVEN";
                this.betNameHighText = "HIGH";
                this.betNameLowText = "LOW";
                this.liveText = "LIVE";
                this.bettingTypeText = "BETTING TYPE: ";
                this.positionTextCapsLetter = "BET POSITION: ";
                this.winningSequenceTextCapsLetter = "WINNING SEQUENCE";
                this.bettingAreaRaceNumberText = "Race Number: ";
                this.bettingAreaRaceStartTimeText = "Race Start Time: ";
                this.errorHeadingText = "TIME OUT!";//"ERROR !";
                this.pleaseLoginAgainMessageText = "PLEASE LOGIN IN AGAIN!";
                this.userNameText = "Brian";
                this.winText = "WIN ";
                this.looseText = "LOOSE ";
                this.ratingText = "RATING";
                this.firstST = "1ST";
                this.secondND = "2ND";
                this.bettingAreaOddsText = "ODDS: ";
                this.moreVisibleBetCloseTimeRaceNumberText = "RACE NUMBER: ";
                this.lowestText = " (LOWEST)";
                this.multiCombBetHeadingText = "LOREM IPSUM IS A DUMMY TEXT";
                this.oddRaceStartTimeText = "Race Start Time";
                this.howToPlayButtonText = "HOW TO PLAY";
                this.pastRaceResultButtonText = "PAST RACE RESULTS";

                this.howToPlayLebelText = "HOW TO PLAY";// "How To Play";
                this.howToPlaySelectRaceStartTimeText = "1. SELECT THE RACE START TIME";// "Select the Race Start Time and click.";
                this.howToPlayTheMatchSessionShownText = "*** The match session shown in the guide is the current bettingsession.";
                this.howToPlayIfTheRoundOfTheText = "* If this round and the round of theodds table are different, move the mouse at the time of the relevant round and click to enter that round. It will be changed to the appropriate odds table.";
                this.howToPlayToViewTheOddsTableText = "* To view the odds table for the relevant round, move the mouse to the red select bar and click on the relevant time.";
                this.howToPlaySelectBettingTypeText = "2. SELECT THE BETTING TYPE";// "Select the Betting Type.";
                this.howToPlayselectTheBettingMethodByMovingText = "Select the Betting Type by moving a mouse and click on the Betting Type Tap.";
                this.howToPlaySelectBettingMethodText = "3. SELECT THE BETTING METHOD";
                this.howToPlayThereAre2WaysText = "There are 2 ways to bet.";
                this.howToPlayBettingMethod1Text = "Betting Method [1]";
                this.howToPlayClickOddsOnOddTableText = "Click the odds on the odds table after reviewing all odds.";
                this.howToPlayNumberInVerticalRepresentText = "The number in the vertical line represents a player which comes in First.The number in the parallel line represents a player which comes in Second.";
                this.howToPlayBettingMethod2Text = "Betting Method [2]";
                this.howToPlayAfterReviewingOddsText = "After reviewing odds, select a player to finish in first, then another player for the second place.";
                this.howToPlayYouCanSelectMultipleOddsText = "You can select multiple players for the second place.";
                this.howToPlaySelectBetAmountAndBuyBetSlipText = "4. SELECT BET SLIP AMOUNT AND BUY BET SLIP";
                this.howToPlaySelectBetSlipAmountFromTabText = "Select BET SLIP AMOUNT from the tab above and click";
                this.howToPlayBuyBetSlipGreenText = "'BUY BET SLIP'"
                this.howToPlayClickResetButtonToResetText = "Click 'RESET' button to reset BET SLIP AMOUNT if you make an error setting up BET SLIP AMOUNT.";
                this.howToPlayYouCanSelectManyTabText = "You can selet many tabs to create an amount not on the tab menu above.";
                this.howToPlayForExampleYouCanText = "(For example, you can buy 20K by clicking 10K twice.)";
                this.howToPlayBuyBetSlipHeadingText = "5. BUY BET SLIP";
                this.howToPlayBetSlipWillDisplayText = "The Bet Slips will display all bet details after clicking BUY BET SLIP.";
                this.howToPlayReviewConfirmBetText = "Review the confirmed Bet Slips and click X to remove any Bet Slips if you change your mind.";
                this.howToPlayOnlyClickText = "Click ";
                this.howToPlayPlaceBetRedText = "PLACE BET ";
                this.howToPlayToExecutePurchaseText = "to execute the purchase of all Bet Slips confirmed and displayed.";
                this.howToPlayBetSlipPurchaseAndConfirmText = "6. BET SLIP PURCHASE AND BET CONFIRMATION";
                this.howToPlayAfterPlaceIsConfirmText = "After PLACE BET is confirmed, the purchsed Bet slips are displayed on the right screen.";
                this.howToPlaySoundVolumeAndStreamText = "7. SOUND VOLUME AND STREAMING SCREEN SIZE CHANGE";
                this.howToPlayDefaultSoundSettingsText = "The default sound setting is mute. To turn on the sound, click the speaker icon at the bottom left of the screen.";
                this.howToPlaySoundVolumeCanBeText = "The sound volume can be adjusted on the bar on the right side of the speaker.";
                this.howToPlayToSeparateTheScreenText = "To separate the screen and change the screen size to the desired size, select the box on the left of the boxes in the bottom right to separate the screen, then just adjust the screen size.";
                this.howToPlayToViewItInFullText = "To view it in full screen, click on the box on the far right of the boxes in the lower right corner in the lower right corner to change to full screen.";
                this.howToPlayToReturnToOriginalText = "To return to the original state, press the 'ESC' key on your keyboard.";

                this.chooseRaceNumberText = "Choose Race No.";
                this.oddsWinningSequenceText = "Winning Sequence";
                this.youAreNotAllowFromBetPostionText = "You are not allowed to bet from BETTING PANEL below, if you have already selected players from ODDS TABLE from top. Please REFRESH and try agiain.";
                this.youAreNotAllowFromOddsValueText = "You are not allowed to bet from ODDS TABLE, if you have already selected players from BETTING PANEL below. Please REFRESH and try agiain.";
                this.raceIsAlreadyInLiveText = "This game is over.To place the bet please click on the next race.";
                break;
            case "ko":
                this.htpImage1Url = "./assets/images/howtoplay/how_to_play_01_ko.png";
                this.htpImage2Url = "./assets/images/howtoplay/how_to_play_02_ko.png";
                this.htpImage3Url = "./assets/images/howtoplay/how_to_play_03_ko.png";
                this.htpImage4Url = "./assets/images/howtoplay/how_to_play_04_ko.png";
                this.htpImage5Url = "./assets/images/howtoplay/how_to_play_05_ko.png";
                this.htpImage6Url = "./assets/images/howtoplay/how_to_play_06_ko.png";
                this.htpImage7Url = "./assets/images/howtoplay/how_to_play_07_ko.png";
                this.htpImage8Url = "./assets/images/howtoplay/how_to_play_08_ko.png";

                this.betSlipPurchaseText = "베팅 슬립 구매 기록";
                this.gameResultsText = "경기 결과";
                this.oddsText = "배당률";
                this.hiLoText = "오버언더";
                this.oddEvenText = "홀짝";
                this.hiorLoText = "하이로우";
                this.oddorEvenText = "홀짝";
                this.raceStartTimeText = "경기 시작 시간";
                this.betClosingTimeText = "베팅 종료 시간";
                this.raceNumberText = "경기 회차";
                this.searchTableRaceNumberText = "경기 회차";
                this.oddsRaceNumberText = "경기 회차";
                this.betSlipAmountText = "경주권 금액";
                this.estimateWinAmountText = "예상 당첨금";
                this.availableBalanceText = "사용 가능 잔고";
                this.resetText = "초기화";
                this.buyBetSlipText = "경주권 구매";
                this.placeBetButtonText = "베팅하기";
                this.betSlipPurchaseHistoryText = "경주권 구매 기록";
                this.searchText = "검색";
                this.betStartTimeText = "경기 시작";
                this.betResultText = "베팅 결과";
                this.totalBetAmountText = "총 베팅 금액";
                this.totalwinAmountText = "총 당첨 금액";
                this.betTypeText = "베팅 종류";
                this.historyPositionText = "베팅 내역";
                this.historyOddsText = "배당";
                this.betAmountText = "베팅 금액";
                this.winAmountText = "당첨 금액";
                this.betSlipWinAmountText = "  당첨 금액";
                this.statusText = "상태";
                this.totalPurchaseAmountText = "총 경주권 구매 금액";
                this.dateText = "날짜";
                this.timeText = "시간";

                this.winMessageText = "1등 도착 1마리 적중";// "1등 도착 1두 적중";
                this.placeMessageText = "2등안 도착 1마리 적중 (7마리 이하 경주)";// "2등안 도착 1두 적중 (7두 이하)";
                this.showMessageText = "3등안 도착 1마리 적중 (8마리 이상 경주)"// "3등안 도착 1마리 적중 (8두 이상 경주)";// "3등안 도착 1두 적중 (8두 이상)";
                this.swingerMessageText = "3등안 도착 2마리 순서 상관없이 적중";//"3등안 도착 2두 적중 순서 상관없음";
                this.quinellaMessageText = "2등안 도착 2마리 순서 상관없이 적중";// "2등안 도착 2두 적중 순서 상관없음";
                this.exactaMessageText = "1-2등 도착 2마리 순서대로 적중";// "1-2등 도착 2두 순서대로 적중";
                this.trioMessageText = "3등안 도착 3마리 순서 상관없이 적중";// "3등안 도착 3두 적중 순서 상관없음";
                this.trifectaMessageText = "1-3등 도착 3마리 순서대로 적중";// "1-3등 도착 3두 순서대로 적중";
                this.hiLoMessageText = "1등 도착 언더, 오버 적중";// "1등 도착 언더, 오버 적중";
                this.evenOddMessageText = "1등 도착 홀, 짝 적중";// "1등 도착 홀, 짝 적중";
                this.quinellaComboMessageText = "2등안 도착 2두 적중 순서 상관없음";
                this.exactaComboMessageText = "1-2등 도착 2두 순서대로 적중";
                this.oddEvenHiLoComboMessageText = "베팅 옵션 1가지를 선택히세요.";

                this.urlParameterMissingText = "파라미터가 없습니다.";
                this.pleaseSelectTheBetAmountText = "베팅 금액을 설정하세요.";
                this.pleaseSelectTheText = "선택하세요.";
                this.positionText = "베팅 내역";
                this.firstText = "등";
                this.secondText = "등";
                this.thirdText = "등";
                this.sorryBetClosedText = "다음 경기 회차로 변경!\n베팅이 이미 마감되었습니다. 다음 경기를 클릭하십시요.";
                this.insufficientBalanceText = "사용 가능한 잔고가 충분하지 않습니다.";
                this.IssueWithServerTimePleaseRefreshThePageText = "일정 시간동안 게임에 베팅을 하지않아서 서버시간이 초과되었습니다.";//"서버 시간에 오류가 발생했습니다. 페이지 재활성화를 시켜주세요.";
                this.noValueWillBeNullText = "모든 옵션을 선택하여야 합니다.";
                this.totalWinOrBetAmountIsNullText = "총 당첨금 또는 베팅금이 무효화되었습니다.";
                this.noDataFoundText = "데이터가 존재하지 않습니다 !";
                this.pleaseSelectTheRaceNumberText = "경기 회차를 선택하세요.";
                this.pleaseSelectTheOptionText = "  리스트에서 경기 회차를 선택하시거나 입력하세요 ";
                this.resultRaceNumberText = "결과 : 경기 회차 - ";
                this.resultRaceStartTimeText = "  / 경기 시작 시간 - ";
                this.resultWinningSequenceText = "  / 경기 결과 : ";
                this.ifYouLeaveTheCurrentGameText = "현재 게임을 중단하면 베팅 기록이 상실됩니다 ! \n 게임을 중단하시겠습니까 ?";
                this.betNameWinText = "단승";
                this.betNamePlaceText = "연승(6)";
                this.betNameShowText = "연승(8)";
                this.betNameOnlyPlaceText = "연승";
                this.betNameOnlyShowText = "연승";
                this.betNamePlaceShowText = "연승/연승";
                this.betNameSwingerText = "복연승";
                this.betNameQuinellaText = "복승";
                this.betNameExactaText = "쌍승";
                this.betNameShowTrioText = "삼복승";
                this.betNameShowTrifectaText = "삼쌍승";
                this.betNameOddText = "홀";
                this.betNameEvenText = "짝";
                this.betNameHighText = "오버";
                this.betNameLowText = "언더";
                this.liveText = "라이브";
                this.bettingTypeText = "베팅 타입: ";
                this.positionTextCapsLetter = "베팅 순위: ";
                this.bettingAreaRaceNumberText = "경기 회차: ";
                this.bettingAreaRaceStartTimeText = "경기 시작 시간: ";
                this.winningSequenceTextCapsLetter = "경기 결과";
                this.errorHeadingText = "시간 초과 !";// "오류 !";
                this.pleaseLoginAgainMessageText = "다시 로그인 해주십시요.";
                this.userNameText = "Brian";
                this.winText = "이기다 ";
                this.looseText = "헐렁한 ";
                this.ratingText = "인기 평가";
                this.firstST = "선착";
                this.secondND = "후착";
                this.bettingAreaOddsText = "배당: ";
                this.moreVisibleBetCloseTimeRaceNumberText = "경기 회차: ";
                this.lowestText = " (최소)";
                this.multiCombBetHeadingText = "LOREM IPSUM IS A DUMMY TEXT";
                this.oddRaceStartTimeText = "경기 시작 시간";
                this.howToPlayButtonText = "베팅방법";// "베팅방법";
                this.pastRaceResultButtonText = "지난 경기 결과";

                this.howToPlayLebelText = "베팅방법";// "베팅방법";
                this.howToPlaySelectRaceStartTimeText = "1. 베팅할 경기 선택";
                this.howToPlayTheMatchSessionShownText = "*** 가이드에 보여지는 경기 회차가 현재 베팅되는 회차 입니다.";
                this.howToPlayIfTheRoundOfTheText = "* 이 회차와 배당판의 회차가 서로 다른 경우 해당 회차의 시간에 마우스를 이동하여 클릭하면 그 회차에 해당되는 배당판으로 변경됩니다.";
                this.howToPlayToViewTheOddsTableText = "* 해당 회차의 배당판을 보기위해서는 빨간색 셀렉바애 마우스를 이동하여 해당되는 시간에 클릭하십시요.";
                this.howToPlaySelectBettingTypeText = "2. 베팅 유형 선택";
                this.howToPlayselectTheBettingMethodByMovingText = "마우스를 이동하여 베팅 유형을 선택합니다.";
                this.howToPlaySelectBettingMethodText = "3. 베팅 방법";
                this.howToPlayThereAre2WaysText = "베팅하는 방법은 2가지 방법이 있습니다.";
                this.howToPlayBettingMethod1Text = "[1번] 방법";
                this.howToPlayClickOddsOnOddTableText = "배팅판에서 배당을 확인하여 해당 배당을 클릭하면 됩니다.";
                this.howToPlayNumberInVerticalRepresentText = "배당판 좌측 번호는 첫번째 들어오는 선수 번호이고 상단 번호는 두번째 들어오는 선수 번호입니다.";
                this.howToPlayBettingMethod2Text = "[2번] 방법";
                this.howToPlayAfterReviewingOddsText = "배당판에서 배당을 확인하고 해당 선수의 번호를 1등을 먼저 선택하고 2등을 다음 선택하면 됩니다.";
                this.howToPlayYouCanSelectMultipleOddsText = "2등의 경우 여러 선수를 한번에 모두 선택할 수 있습니다.";
                this.howToPlaySelectBetAmountAndBuyBetSlipText = "4. 경주권 금액 선택 및 경주권 구매";
                this.howToPlaySelectBetSlipAmountFromTabText = "베팅할 금액을 메뉴에서 선택하고 '경주권 구매' 버튼을 클릭합니다.";
                this.howToPlayBuyBetSlipGreenText = "'경주권 구매'"
                this.howToPlayClickResetButtonToResetText = "경주권 금액 설정시 실수가 있는 경우 '초기화' 버튼을 클릭하면 경주권 금액란이 리셋됩니다.";
                this.howToPlayYouCanSelectManyTabText = "경주권 금액 메뉴에서 다수 선택이 가능합니다.";
                this.howToPlayForExampleYouCanText = "(예) 2만원 구매시 1만을 2회 클릭하면 됩니다.";
                this.howToPlayBuyBetSlipHeadingText = "5. 경주권 구매";
                this.howToPlayBetSlipWillDisplayText = "경주권 구매를 하게되면 위와같이 각각의 경주권의 세부사항이 포함되어 리스트가 됩니다.";
                this.howToPlayReviewConfirmBetText = "이 경주권 중 더이상 구매를 원하지않는 경주권의 경우 우측의 빨간색 X를 클릭하면 해당 경주권은 취소됩니다.";
                this.howToPlayOnlyClickText = "모든 내용이 맞으면 ";
                this.howToPlayPlaceBetRedText = "'베팅하기' ";
                this.howToPlayToExecutePurchaseText = "버튼을 클릭하면 해당 베팅은 모두 완료됩니다";
                this.howToPlayBetSlipPurchaseAndConfirmText = "6. 베팅한 경주권 확인";
                this.howToPlayAfterPlaceIsConfirmText = "베팅이 완료된 경주권은 우측 화면 하단에 표기됩니다.";
                this.howToPlaySoundVolumeAndStreamText = "7. 음향 조절 및 화면 크기 조정";
                this.howToPlayDefaultSoundSettingsText = "음향은 음소거가 기본 셋팅입니다. 음향을 켜기위해서는 화면 좌측하단 스피커에 마우스로 클릭하면 됩니다.";
                this.howToPlaySoundVolumeCanBeText = "음향의 높낮이 조절은 스피커 우측 바에서 조정이 가능합니다.";
                this.howToPlayToSeparateTheScreenText = "화면을 분리하여 화면 사이즈를 원하는 크기로 변경하려면 우측하단 박스 표기중 좌측 박스를 선택하여 분리된 화면의 크기를 조정하면 됩니다.";
                this.howToPlayToViewItInFullText = "전체 화면으로 보려면 우측하단 박스 표기중 가장 우측 박스를 클릭하면 전체 화면으로 변경됩니다.";
                this.howToPlayToReturnToOriginalText = "다시 원상태로 돌아오려면 키보드에서 'ESC' 키를 누르면 됩니다.";

                this.chooseRaceNumberText = "경기 회차 선택";
                this.oddsWinningSequenceText = "승리 순서";
                this.youAreNotAllowFromBetPostionText = "배당판 클릭 베팅을 이미 하셨으면 하단의 베팅카트 베팅은 동시에 사용할 수 없습니다. 초기화 버튼 클릭하시고 다시 진행해 주십시요.";
                this.youAreNotAllowFromOddsValueText = "배팅카트 베팅이나 배당판 클릭 베팅중 1가지 베팅방식만 가능합니다. 초기화 버튼 클릭하시고 다시 진행해 주십시요.";
                this.raceIsAlreadyInLiveText = "다음 경기 회차로 변경!\n이 경기는 이미 종료 되었습니다. 다음 경기를 클릭하십시요.";
                break;
        }
        this.SetValueToDomText(_languageCode);
    };

    /**
    * Set the text value to dom elemnet with id as per language.
    * @param {string} _languageCode - language code of the game
    * @returns {null} 
    */
    SetValueToDomText(_languageCode) {

        let rightSideBetSlipPurchaseTextObj = document.getElementById("right_bet_slip_purchase_tab");
        rightSideBetSlipPurchaseTextObj.innerText = localization.betSlipPurchaseText;
        let leftSideBetSlipPurchaseTextObj = document.getElementById("left_bet_slip_purchase_tab");
        leftSideBetSlipPurchaseTextObj.innerText = localization.betSlipPurchaseText;

        let rightSideGameResultTextObj = document.getElementById("right_game_result_tab");
        rightSideGameResultTextObj.innerText = localization.gameResultsText;
        let leftSideGameResultTextObj = document.getElementById("left_game_result_tab");
        leftSideGameResultTextObj.innerText = localization.gameResultsText;

        let rightSideOddsTextObj = document.getElementById("right_odds_tab");
        rightSideOddsTextObj.innerText = localization.oddsText;
        let leftSideOddsTextObj = document.getElementById("left_odds_tab");
        leftSideOddsTextObj.innerText = localization.oddsText;

        let rightSideHiloTextObj = document.getElementById("right_hilo_tab");
        rightSideHiloTextObj.innerText = localization.hiLoText;
        let leftSideHiloTextObj = document.getElementById("left_hilo_tab");
        leftSideHiloTextObj.innerText = localization.hiLoText;

        let rightSideOddEvenTextObj = document.getElementById("right_oddeven_tab");
        rightSideOddEvenTextObj.innerText = localization.oddEvenText;
        let leftSideOddEvenTextObj = document.getElementById("left_oddeven_tab");
        leftSideOddEvenTextObj.innerText = localization.oddEvenText;

        let raceStartTimeObj = document.getElementById("heading_race_start_time");
        raceStartTimeObj.innerText = localization.raceStartTimeText;

        let betClosingTimeObj = document.getElementById("heading_bet_closing_time");
        betClosingTimeObj.innerText = localization.betClosingTimeText;

        let raceNumberObj = document.getElementById("heading_race_number");
        raceNumberObj.innerText = localization.raceNumberText;

        let resetObj = document.getElementById("Reset");
        resetObj.innerText = localization.resetText;

        let amountSecResetObj = document.getElementById("sec_amount_reset_text");
        amountSecResetObj.innerText = localization.resetText;

        let buyBetSlipObj = document.getElementById("BuyBetSlip");
        buyBetSlipObj.innerText = localization.buyBetSlipText;

        let placeCombBet = document.getElementById("place_combination_Bet");
        placeCombBet.innerText = localization.placeBetButtonText;

        let betSlipAmountObj = document.getElementById("heading_bet_slip_amount");
        betSlipAmountObj.innerText = localization.betSlipAmountText;

        let availableBalanceObj = document.getElementById("heading_available_balance");
        availableBalanceObj.innerText = localization.availableBalanceText;

        let betSlipPurchaseHistoryObj = document.getElementById("heading_bet_slip_purchase_history");
        betSlipPurchaseHistoryObj.innerText = localization.betSlipPurchaseHistoryText;

        let searchObj = document.getElementById("basic-addon2");
        searchObj.innerText = localization.searchText;

        let betStartTimeObj = document.getElementById("heading_bet_start_time");
        betStartTimeObj.innerText = localization.betStartTimeText;

        let searchRaceNumberObj = document.getElementById("heading_search_race_number");
        searchRaceNumberObj.innerText = localization.searchTableRaceNumberText;

        let betResultObj = document.getElementById("heading_bet_result");
        betResultObj.innerText = localization.betResultText;

        let totalBetAmountObj = document.getElementById("heading_total_bet_amount");
        totalBetAmountObj.innerText = localization.totalBetAmountText;

        let totalWinAmountObj = document.getElementById("heading_total_win_amount");
        totalWinAmountObj.innerText = localization.totalwinAmountText;

        let historyBetTypeObj = document.getElementById("heading_history_bet_type");
        historyBetTypeObj.innerText = localization.betTypeText;

        let historybetStartObj = document.getElementById("heading_history_bet_start");
        historybetStartObj.innerText = localization.betStartTimeText;

        let historyRaceNoObj = document.getElementById("heading_history_race_no");
        historyRaceNoObj.innerText = localization.searchTableRaceNumberText;

        let historyWinSequenceObj = document.getElementById("heading_history_winning_Sequence");
        historyWinSequenceObj.innerText = localization.winningSequenceTextCapsLetter;

        let historyOddsObj = document.getElementById("heading_history_odds");
        historyOddsObj.innerText = localization.historyOddsText;

        let historyBetAmountObj = document.getElementById("heading_history_bet_amount");
        historyBetAmountObj.innerText = localization.betAmountText;

        let historyWinAmountObj = document.getElementById("heading_history_win_amount");
        historyWinAmountObj.innerText = localization.winAmountText;

        let historyStatusObj = document.getElementById("heading_history_status");
        historyStatusObj.innerText = localization.statusText;

        let totalPurchaseAmountObj = document.getElementById("heading_total_purchase_amount");
        totalPurchaseAmountObj.innerText = localization.totalPurchaseAmountText;

        let selectOptionObj = document.getElementById("heading_please_select_the_option");
        selectOptionObj.innerText = localization.pleaseSelectTheOptionText;

        let allCommonOddChooseRaceNumObj = document.getElementById("all_common_odds_table_choose_race_number");
        allCommonOddChooseRaceNumObj.innerText = localization.chooseRaceNumberText;
        let allCommonOddWinningSeqObj = document.getElementById("all_common_odd_winning_sequence_heading");
        allCommonOddWinningSeqObj.innerText = localization.oddsWinningSequenceText;
        let allCommonOddSearchButtonObjObj = document.getElementById("all_common_odds_table_search_button");
        allCommonOddSearchButtonObjObj.innerText = localization.searchText;

        let winOddRaceNumObj = document.getElementById("win_odd_race_num");
        winOddRaceNumObj.innerText = localization.oddsRaceNumberText;
        let winOddRaceStartObj = document.getElementById("win_odd_race_start_time_heading");
        winOddRaceStartObj.innerText = localization.oddRaceStartTimeText;
        let showPlaceOddRaceNumObj = document.getElementById("showplace_odd_race_num");
        showPlaceOddRaceNumObj.innerText = localization.oddsRaceNumberText;
        let showPlaceOddRaceStartObj = document.getElementById("showplace_odd_race_start_time_heading");
        showPlaceOddRaceStartObj.innerText = localization.oddRaceStartTimeText;
        let swingerOddRaceNumObj = document.getElementById("swinger_odd_race_num");
        swingerOddRaceNumObj.innerText = localization.oddsRaceNumberText;
        let swingerOddRaceStartObj = document.getElementById("swinger_odd_race_start_time_heading");
        swingerOddRaceStartObj.innerText = localization.oddRaceStartTimeText;
        let quinellaOddRaceNumObj = document.getElementById("quinella_odd_race_num");
        quinellaOddRaceNumObj.innerText = localization.oddsRaceNumberText;
        let quinellaOddRaceStartObj = document.getElementById("quinella_odd_race_start_time_heading");
        quinellaOddRaceStartObj.innerText = localization.oddRaceStartTimeText;
        let exactaOddRaceNumObj = document.getElementById("exacta_odd_race_num");
        exactaOddRaceNumObj.innerText = localization.oddsRaceNumberText;
        let exactaOddRaceStartObj = document.getElementById("exacta_odd_race_start_time_heading");
        exactaOddRaceStartObj.innerText = localization.oddRaceStartTimeText;
        let trioOddRaceNumObj = document.getElementById("trio_odd_race_num");
        trioOddRaceNumObj.innerText = localization.oddsRaceNumberText;
        let trioOddRaceStartObj = document.getElementById("trio_odd_race_start_time_heading");
        trioOddRaceStartObj.innerText = localization.oddRaceStartTimeText;
        let trifectaOddRaceNumObj = document.getElementById("trifecta_odd_race_num");
        trifectaOddRaceNumObj.innerText = localization.oddsRaceNumberText;
        let trifectaOddRaceStartObj = document.getElementById("terifecta_odd_race_start_time_heading");
        trifectaOddRaceStartObj.innerText = localization.oddRaceStartTimeText;
        let gameResultTabRaceNumObj = document.getElementById("game_result_tab_race_num");
        gameResultTabRaceNumObj.innerText = localization.oddsRaceNumberText;

        let gameResultTabPosObj = document.getElementById("game_result_tab_pos");
        gameResultTabPosObj.innerText = localization.historyPositionText;

        let gameResultTabDateObj = document.getElementById("game_result_tab_date");
        gameResultTabDateObj.innerText = localization.dateText;

        let gameResultTabTimeObj = document.getElementById("game_result_tab_time");
        gameResultTabTimeObj.innerText = localization.timeText;

        let liveTextObj = document.getElementById("live_text_only");
        liveTextObj.innerText = localization.liveText;

        let totalPurchaseITag = document.createElement("i");
        totalPurchaseITag.className = "fa fa-krw";
        totalPurchaseITag.style.fontSize = "14px"
        let currencyTotalPurchaseAmountObj = document.getElementById("currency_sec_total_purchase_amount");
        currencyTotalPurchaseAmountObj.appendChild(totalPurchaseITag);

        let betSlipITag = document.createElement("i");
        betSlipITag.className = "fa fa-krw";
        betSlipITag.style.fontSize = "14px"
        let currencyBetSlipAmountObj = document.getElementById("currency_sec_bet_slip_amount");
        currencyBetSlipAmountObj.appendChild(betSlipITag);

        let availableBalITag = document.createElement("i");
        availableBalITag.className = "fa fa-krw";
        availableBalITag.style.fontSize = "14px"
        let currencyAvailableBalanceObj = document.getElementById("currency_sec_available_balance_amount");
        currencyAvailableBalanceObj.appendChild(availableBalITag);

        let raceTimeShowModalHeadingObj = document.getElementById("race_time_show_modal_heading_text");
        raceTimeShowModalHeadingObj.innerText = localization.raceStartTimeText;

        let errorModalHeadingTextObj = document.getElementById("error_modal_heading_text");
        errorModalHeadingTextObj.innerText = localization.errorHeadingText;

        let errorModalLoginMessageTextObj = document.getElementById("error_modal_please_login_message");
        errorModalLoginMessageTextObj.innerText = localization.pleaseLoginAgainMessageText;

        let firstTextObj = document.getElementById("heading_1st_text");
        firstTextObj.innerText = localization.firstST;

        let secondTextObj = document.getElementById("heading_2nd_text");
        secondTextObj.innerText = localization.secondND;

        let betCloseTimeTextObj = document.getElementById("heading_bet_close_time_more_visible_race_number");
        betCloseTimeTextObj.innerText = localization.moreVisibleBetCloseTimeRaceNumberText;

        //MODAL ODDDS
        let modalWinOddBetNameObj = document.getElementById("modal_win_odd_bet_name");
        modalWinOddBetNameObj.innerText = localization.betNameWinText;
        let modalWinOddRaceNumObj = document.getElementById("modal_win_odd_race_num");
        modalWinOddRaceNumObj.innerText = localization.oddsRaceNumberText;
        let modalWinOddRaceStartTimeObj = document.getElementById("modal_win_odd_race_start_time_heading");
        modalWinOddRaceStartTimeObj.innerText = localization.oddRaceStartTimeText;

        let modalShowPlaceOddBetNameObj = document.getElementById("modal_showplace_odd_bet_name");
        modalShowPlaceOddBetNameObj.innerText = localization.betNamePlaceShowText;
        let modalShowPlaceOddRaceNumObj = document.getElementById("modal_showplace_odd_race_num");
        modalShowPlaceOddRaceNumObj.innerText = localization.oddsRaceNumberText;
        let modalShowPlaceOddRaceStartTimeObj = document.getElementById("modal_showplace_odd_race_start_time_heading");
        modalShowPlaceOddRaceStartTimeObj.innerText = localization.oddRaceStartTimeText;

        let modalSwingerOddBetNameObj = document.getElementById("modal_swinger_odd_bet_name");
        modalSwingerOddBetNameObj.innerText = localization.betNameSwingerText;
        let modalSwingerOddRaceNumObj = document.getElementById("modal_swinger_odd_race_num");
        modalSwingerOddRaceNumObj.innerText = localization.oddsRaceNumberText;
        let modalSwingerPlaceOddRaceStartTimeObj = document.getElementById("modal_swinger_odd_race_start_time_heading");
        modalSwingerPlaceOddRaceStartTimeObj.innerText = localization.oddRaceStartTimeText;

        let modalQuinellaOddBetNameObj = document.getElementById("modal_quinella_odd_bet_name");
        modalQuinellaOddBetNameObj.innerText = localization.betNameQuinellaText;
        let modalQuinellaOddRaceNumObj = document.getElementById("modal_quinella_odd_race_num");
        modalQuinellaOddRaceNumObj.innerText = localization.oddsRaceNumberText;
        let modalQuinellaPlaceOddRaceStartTimeObj = document.getElementById("modal_quinella_odd_race_start_time_heading");
        modalQuinellaPlaceOddRaceStartTimeObj.innerText = localization.oddRaceStartTimeText;

        let modalExactaOddBetNameObj = document.getElementById("modal_exacta_odd_bet_name");
        modalExactaOddBetNameObj.innerText = localization.betNameExactaText;
        let modalExactaOddRaceNumObj = document.getElementById("modal_exacta_odd_race_num");
        modalExactaOddRaceNumObj.innerText = localization.oddsRaceNumberText;
        let modalExactaPlaceOddRaceStartTimeObj = document.getElementById("modal_exacta_odd_race_start_time_heading");
        modalExactaPlaceOddRaceStartTimeObj.innerText = localization.oddRaceStartTimeText;

        let modalExactaFirstTextObj = document.getElementById("modal_heading_1st_text");
        modalExactaFirstTextObj.innerText = localization.firstST;

        let modalExactaSecondTextObj = document.getElementById("modal_heading_2nd_text");
        modalExactaSecondTextObj.innerText = localization.secondND;

        let modalTrioOddBetNameObj = document.getElementById("modal_trio_odd_bet_name");
        modalTrioOddBetNameObj.innerText = localization.betNameShowTrioText;
        let modalTrioOddRaceNumObj = document.getElementById("modal_trio_odd_race_num");
        modalTrioOddRaceNumObj.innerText = localization.oddsRaceNumberText;
        let modalTrioPlaceOddRaceStartTimeObj = document.getElementById("modal_trio_odd_race_start_time_heading");
        modalTrioPlaceOddRaceStartTimeObj.innerText = localization.oddRaceStartTimeText;

        let modalTrifectaOddBetNameObj = document.getElementById("modal_trifecta_odd_bet_name");
        modalTrifectaOddBetNameObj.innerText = localization.betNameShowTrifectaText;
        let modalTrifectaOddRaceNumObj = document.getElementById("modal_trifecta_odd_race_num");
        modalTrifectaOddRaceNumObj.innerText = localization.oddsRaceNumberText;
        let modalTrifectaPlaceOddRaceStartTimeObj = document.getElementById("modal_terifecta_odd_race_start_time_heading");
        modalTrifectaPlaceOddRaceStartTimeObj.innerText = localization.oddRaceStartTimeText;

        let modalHiOddBetNameObj = document.getElementById("modal_hi_text");
        modalHiOddBetNameObj.innerText = localization.betNameHighText;
        let modalLoOddBetNameObj = document.getElementById("modal_lo_text");
        modalLoOddBetNameObj.innerText = localization.betNameLowText;

        let modalOddOddBetNameObj = document.getElementById("modal_odd_text");
        modalOddOddBetNameObj.innerText = localization.betNameOddText;
        let modalEvenOddBetNameObj = document.getElementById("modal_even_text");
        modalEvenOddBetNameObj.innerText = localization.betNameEvenText;

        // ==================== HOW TO PLAY POPUP========================

        let htpImage1Object = document.getElementById("htp_img_1");
        htpImage1Object.src = localization.htpImage1Url;
        let htpImage2Object = document.getElementById("htp_img_2");
        htpImage2Object.src = localization.htpImage2Url;
        let htpImage3Object = document.getElementById("htp_img_3");
        htpImage3Object.src = localization.htpImage3Url;
        let htpImage4Object = document.getElementById("htp_img_4");
        htpImage4Object.src = localization.htpImage4Url;
        let htpImage5Object = document.getElementById("htp_img_5");
        htpImage5Object.src = localization.htpImage5Url;
        let htpImage6Object = document.getElementById("htp_img_6");
        htpImage6Object.src = localization.htpImage6Url;
        let htpImage7Object = document.getElementById("htp_img_7");
        htpImage7Object.src = localization.htpImage7Url;
        let htpImage8Object = document.getElementById("htp_img_8");
        htpImage8Object.src = localization.htpImage8Url;


        let howToPlayButtonObj = document.getElementById("howToPlayButtonText");
        howToPlayButtonObj.innerText = localization.howToPlayButtonText;

        let howtoplayLabelObj = document.getElementById("howtoplayLabel");
        howtoplayLabelObj.innerText = localization.howToPlayLebelText;

        let howtoplayWinObj = document.getElementById("htp_popup_win_text");
        howtoplayWinObj.innerText = localization.betNameWinText;
        let howtoplayWinDescriptionObj = document.getElementById("htp_popup_win_description_text");
        howtoplayWinDescriptionObj.innerText = localization.winMessageText;

        let howtoplayPlaceObj = document.getElementById("htp_popup_place_text");
        howtoplayPlaceObj.innerText = localization.betNameOnlyPlaceText;
        let howtoplayPlaceDescriptionObj = document.getElementById("htp_popup_place_description_text");
        howtoplayPlaceDescriptionObj.innerText = localization.placeMessageText;

        let howtoplayShowObj = document.getElementById("htp_popup_show_text");
        howtoplayShowObj.innerText = localization.betNameOnlyShowText;
        let howtoplayShowDescriptionObj = document.getElementById("htp_popup_show_description_text");
        howtoplayShowDescriptionObj.innerText = localization.showMessageText;

        let howtoplaySwingerObj = document.getElementById("htp_popup_swinger_text");
        howtoplaySwingerObj.innerText = localization.betNameSwingerText;
        let howtoplaySwingerDescriptionObj = document.getElementById("htp_popup_swinger_description_text");
        howtoplaySwingerDescriptionObj.innerText = localization.swingerMessageText;

        let howtoplayQuinellaObj = document.getElementById("htp_popup_quinella_text");
        howtoplayQuinellaObj.innerText = localization.betNameQuinellaText;
        let howtoplayQuinellaDescriptionObj = document.getElementById("htp_popup_quinella_description_text");
        howtoplayQuinellaDescriptionObj.innerText = localization.quinellaMessageText;

        let howtoplayExactaObj = document.getElementById("htp_popup_exacta_text");
        howtoplayExactaObj.innerText = localization.betNameExactaText;
        let howtoplayExactaDescriptionObj = document.getElementById("htp_popup_exacta_description_text");
        howtoplayExactaDescriptionObj.innerText = localization.exactaMessageText;

        let howtoplayTrioObj = document.getElementById("htp_popup_trio_text");
        howtoplayTrioObj.innerText = localization.betNameShowTrioText;
        let howtoplayTrioDescriptionObj = document.getElementById("htp_popup_trio_description_text");
        howtoplayTrioDescriptionObj.innerText = localization.trioMessageText;

        let howtoplayTrifectaObj = document.getElementById("htp_popup_trifecta_text");
        howtoplayTrifectaObj.innerText = localization.betNameShowTrifectaText;
        let howtoplayTrifectaDescriptionObj = document.getElementById("htp_popup_trifecta_description_text");
        howtoplayTrifectaDescriptionObj.innerText = localization.trifectaMessageText;

        let howtoplayHighLowObj = document.getElementById("htp_popup_high_low_text");
        howtoplayHighLowObj.innerText = localization.hiLoText;
        let howtoplayHighLowDescriptionObj = document.getElementById("htp_popup_high_low_description_text");
        howtoplayHighLowDescriptionObj.innerText = localization.hiLoMessageText;

        let howtoplayOddEvenObj = document.getElementById("htp_popup_odd_even_text");
        howtoplayOddEvenObj.innerText = localization.oddEvenText;
        let howtoplayOddEvenDescriptionObj = document.getElementById("htp_popup_odd_even_description_text");
        howtoplayOddEvenDescriptionObj.innerText = localization.evenOddMessageText;

        let howtoplaySelectRaceTimeObj = document.getElementById("htp_popup_select_race_time_text");
        howtoplaySelectRaceTimeObj.innerText = localization.howToPlaySelectRaceStartTimeText;

        let howtoplayTheMatchSessionShownObj = document.getElementById("the_match_session_shown_description");
        howtoplayTheMatchSessionShownObj.innerText = localization.howToPlayTheMatchSessionShownText;

        let howtoplayIfTheRoundAndTheObj = document.getElementById("if_the_round_and_the_description");
        howtoplayIfTheRoundAndTheObj.innerText = localization.howToPlayIfTheRoundOfTheText;

        let howtoplayToViewOddsTableObj = document.getElementById("to_view_the_odds_table_description");
        howtoplayToViewOddsTableObj.innerText = localization.howToPlayToViewTheOddsTableText;

        let howtoplaySelectBetTypeObj = document.getElementById("htp_popup_select_bet_text");
        howtoplaySelectBetTypeObj.innerText = localization.howToPlaySelectBettingTypeText;

        let howtoplaySelectTheBettingMethodByMovingObj = document.getElementById("select_the_betting_type_by_moving");
        howtoplaySelectTheBettingMethodByMovingObj.innerText = localization.howToPlayselectTheBettingMethodByMovingText;

        let howtoplaySelecthtpPopupSelectBettingMethodObj = document.getElementById("htp_popup_select_betting_method_text");
        howtoplaySelecthtpPopupSelectBettingMethodObj.innerText = localization.howToPlaySelectBettingMethodText;

        let howtoplayThereAre2WaysObj = document.getElementById("there_are_2_ways_bet_text");
        howtoplayThereAre2WaysObj.innerText = localization.howToPlayThereAre2WaysText;

        let howtoplayBettingMethod1Obj = document.getElementById("betting_method_1");
        howtoplayBettingMethod1Obj.innerText = localization.howToPlayBettingMethod1Text;

        let howtoplayClickOddsOnOddTableObj = document.getElementById("click_odds_on_odd_table_text");
        howtoplayClickOddsOnOddTableObj.innerText = localization.howToPlayClickOddsOnOddTableText;

        let howtoplayNumberInVerticalRepresentObj = document.getElementById("the_number_in_vertical_line_represent_text");
        howtoplayNumberInVerticalRepresentObj.innerText = localization.howToPlayNumberInVerticalRepresentText;

        let howtoplayBettingMethod2Obj = document.getElementById("betting_method_2");
        howtoplayBettingMethod2Obj.innerText = localization.howToPlayBettingMethod2Text;

        let howtoplayAfterReviewingOddslObj = document.getElementById("after_reviewing_odds_text");
        howtoplayAfterReviewingOddslObj.innerText = localization.howToPlayAfterReviewingOddsText;

        let howtoplayYouCanSelectMultipleOddsObj = document.getElementById("you_can_select_multiple_text");
        howtoplayYouCanSelectMultipleOddsObj.innerText = localization.howToPlayYouCanSelectMultipleOddsText;

        let howtoplaySelectBetAmountObj = document.getElementById("htp_popup_select_bet_amount_and_Buy_Bet_slip_text");
        howtoplaySelectBetAmountObj.innerText = localization.howToPlaySelectBetAmountAndBuyBetSlipText;

        let howtoplaySelectBetSlipAmountFromTabObj = document.getElementById("select_bet_slip_amount_from_tab_text");
        howtoplaySelectBetSlipAmountFromTabObj.innerText = localization.howToPlaySelectBetSlipAmountFromTabText;

        let howtoplayBuyBetSlipGreenObj = document.getElementById("htp_buy_bet_Slip_green");
        howtoplayBuyBetSlipGreenObj.innerText = localization.howToPlayBuyBetSlipGreenText;

        let howtoplayClickResetButtonToResetObj = document.getElementById("htp_popup_click_reset_button_to_reset_text");
        howtoplayClickResetButtonToResetObj.innerText = localization.howToPlayClickResetButtonToResetText;

        let howtoplayYouCanSelectManyTabObj = document.getElementById("you_can_select_many_tab_text");
        howtoplayYouCanSelectManyTabObj.innerText = localization.howToPlayYouCanSelectManyTabText;

        let howtoplayForExampleYouCanObj = document.getElementById("for_example_you_can_text");
        howtoplayForExampleYouCanObj.innerText = localization.howToPlayForExampleYouCanText;

        let howtoplayBuyBetSlipHeadingObj = document.getElementById("buy_bet_slip_heading_text");
        howtoplayBuyBetSlipHeadingObj.innerText = localization.howToPlayBuyBetSlipHeadingText;

        let howtoplayBetSlipWillDisplayObj = document.getElementById("the_bet_slip_will_display_text");
        howtoplayBetSlipWillDisplayObj.innerText = localization.howToPlayBetSlipWillDisplayText;

        let howtoplayReviewConfirmBetObj = document.getElementById("review_the_confirm_bet_text");
        howtoplayReviewConfirmBetObj.innerText = localization.howToPlayReviewConfirmBetText;

        let howtoplayOnlyClickObj = document.getElementById("htp_popup_click_text");
        howtoplayOnlyClickObj.innerText = localization.howToPlayOnlyClickText;

        let howtoplayPlaceBetOnlyObj = document.getElementById("htp_popup_place_bet_only_text");
        howtoplayPlaceBetOnlyObj.innerText = localization.howToPlayPlaceBetRedText;

        let howtoplayToExecutePurchaseObj = document.getElementById("htp_popup_to_execute_purchase_text");
        howtoplayToExecutePurchaseObj.innerText = localization.howToPlayToExecutePurchaseText;

        let howtoplayBetSlipPurchaseAndConfirmObj = document.getElementById("bet_slip_purchase_and_bet_confirm_text");
        howtoplayBetSlipPurchaseAndConfirmObj.innerText = localization.howToPlayBetSlipPurchaseAndConfirmText;

        let howtoplayAfterPlaceIsConfirmObj = document.getElementById("after_place_bet_is_confirm_text");
        howtoplayAfterPlaceIsConfirmObj.innerText = localization.howToPlayAfterPlaceIsConfirmText;

        let howtoplaySoundVolumeAndStreamObj = document.getElementById("sound_volume_and_stream_text");
        howtoplaySoundVolumeAndStreamObj.innerText = localization.howToPlaySoundVolumeAndStreamText;


        let howtoplayDefaultSoundSettingsObj = document.getElementById("default_sound_setting_is_mute_text");
        howtoplayDefaultSoundSettingsObj.innerText = localization.howToPlayDefaultSoundSettingsText;

        let howtoplaySoundVolumeCanBeObj = document.getElementById("sound_volume_can_be_adjust");
        howtoplaySoundVolumeCanBeObj.innerText = localization.howToPlaySoundVolumeCanBeText;

        let howtoplayToSeparateTheScreenObj = document.getElementById("to_separate_the_screen");
        howtoplayToSeparateTheScreenObj.innerText = localization.howToPlayToSeparateTheScreenText;

        let howtoplayToViewItInFullObj = document.getElementById("to_view_it_in_full_screen_text");
        howtoplayToViewItInFullObj.innerText = localization.howToPlayToViewItInFullText;

        let howtoplayToReturnToOriginalObj = document.getElementById("to_return_to_original_text");
        howtoplayToReturnToOriginalObj.innerText = localization.howToPlayToReturnToOriginalText;



        //==========================================================================

        let pastRaceResultButtonObj = document.getElementById("pastRaceResultButtonText");
        pastRaceResultButtonObj.innerText = localization.pastRaceResultButtonText;
    }


}
//#endregion 
let localization = new Localization();
export { localization as Localization };