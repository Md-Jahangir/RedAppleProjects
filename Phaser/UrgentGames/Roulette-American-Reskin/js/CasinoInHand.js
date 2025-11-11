$(document).ready(function() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('token');
    const casino = urlParams.get('casino');
    const remote_id = urlParams.get('remote_id');

    var userBalance = serverRequests.getBalance();
    var money = Array.isArray(userBalance) ? userBalance[0].balance : userBalance;
    var min_bet = serverRequests.getCurrencies().currencyBetMultiplier.BetMultiplierRoulette[0]; //MINIMUM BET 0.1
    var max_bet = serverRequests.getCurrencies().currencyBetMultiplier.BetMultiplierRoulette[1]; //MAXIMUM BET 1000

    var obj = JSON.parse(serverRequests.gameInitData(min_bet, max_bet, money));
    var oMain = new CMain({
        sid: obj.sid,
        money: money,
        min_bet: min_bet,
        max_bet: max_bet,
        time_bet: obj.time_bet, //TIME TO WAIT FOR A BET IN MILLISECONDS. 0 SET 0 IF YOU DON'T WANT BET LIMIT
        time_winner: obj.time_winner, //TIME FOR WINNER SHOWING IN MILLISECONDS    1500
        win_occurrence: 100, //Win occurrence percentage (100 = always win if there is enough cash). 
        //SET THIS VALUE TO -1 IF YOU WANT WIN OCCURRENCE STRICTLY RELATED TO PLAYER BET ( SEE DOCUMENTATION)
        casino_cash: obj.casino_cash, //The starting casino cash that is 1000 recharged by the money lost by the user
        fullscreen: obj.fullscreen, //SET THIS TO FALSE IF YOU DON'T WANT TO SHOW FULLSCREEN BUTTON
        check_orientation: obj.check_orientation, //SET TO FALSE IF YOU DON'T WANT TO SHOW ORIENTATION ALERT 
        show_credits: obj.show_credits, //ENABLE/DISABLE CREDITS BUTTON IN THE MAIN SCREEN
        num_hand_before_ads: obj.num_hand_before_ads //10 NUMBER OF HANDS PLAYED BEFORE AD SHOWN
    });

    $(oMain).on("recharge", function(evt) {});

    $(oMain).on("start_session", function(evt) {
        if (getParamValue('ctl-arcade') === "true") {
            parent.__ctlArcadeStartSession();
        }
    });

    $(oMain).on("end_session", function(evt) {
        if (getParamValue('ctl-arcade') === "true") {
            parent.__ctlArcadeEndSession();
        }
    });

    $(oMain).on("bet_placed", function(evt, iTotBet) {});

    $(oMain).on("save_score", function(evt, iMoney) {

        if (getParamValue('ctl-arcade') === "true") {
            parent.__ctlArcadeSaveScore({ score: iMoney });
        }
    });

    $(oMain).on("show_interlevel_ad", function(evt) {
        if (getParamValue('ctl-arcade') === "true") {
            parent.__ctlArcadeShowInterlevelAD();
        }
    });

    $(oMain).on("share_event", function(evt, iMoney) {
        if (getParamValue('ctl-arcade') === "true") {
            parent.__ctlArcadeShareEvent({
                img: "200x200.jpg",
                title: TEXT_CONGRATULATIONS,
                msg: TEXT_SHARE_1 + iMoney + TEXT_SHARE_2,
                msg_share: TEXT_SHARE_3 + iMoney + TEXT_SHARE_4
            });
        }
    });

    if (isIOS()) {
        setTimeout(function() { sizeHandler(); }, 200);
    } else {
        sizeHandler();
    }

});