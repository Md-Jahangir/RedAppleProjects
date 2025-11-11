$(document).ready(function() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('token') || 'test188';
    const casino = urlParams.get('casino')
    const remote_id = urlParams.get('remote_id')
    const currency = urlParams.get('currency')
    const mode = urlParams.get('mode');

    var balanceVars;
    serverRequests.gameInit();


    if (mode === 'offline') {
        // balanceVars = 'https://api.gamessecure.com/casinos/api?action=balance' + '&mode=' + mode + '&token=' + token;
        balanceVars = 'https://dev.gamessecure.com/casinos/api?action=balance' + '&mode=' + mode + '&token=' + token;
    } else {
        // balanceVars = 'https://api.gamessecure.com/casinos/api?action=balance' + '&token=' + token + '&remote_id=' + remote_id + '&casino=' + casino + '&currency=' + currency;
        balanceVars = 'https://dev.gamessecure.com/casinos/api?action=balance' + '&token=' + token + '&remote_id=' + remote_id + '&casino=' + casino + '&currency=' + currency;
    }
    fetch(balanceVars)
        .then(resp => resp.json())
        .then(function(data) {
            if (data.balance) {
                var oMain = new CMain({
                    win_occurrence: 40, //WIN OCCURRENCE PERCENTAGE. VALUES BETWEEN 0-100
                    min_bet: (!serverRequests.getCurrencies().currencyBetMultiplier.BetMultiplierBlackjack[0]) ? 1 : serverRequests.getCurrencies().currencyBetMultiplier.BetMultiplierBlackjack[0], //MIN BET PLAYABLE BY USER. DEFAULT IS 0.1$
                    max_bet: (!serverRequests.getCurrencies().currencyBetMultiplier.BetMultiplierBlackjack[1]) ? 500 : serverRequests.getCurrencies().currencyBetMultiplier.BetMultiplierBlackjack[1], //MAX BET PLAYABLE BY USER. 
                    bet_time: 10000, //WAITING TIME FOR PLAYER BETTING
                    money: Array.isArray(data.balance) ? data.balance[0].balance : data.balance, //STARING CREDIT FOR THE USER
                    blackjack_payout: 1.5, //PAYOUT WHEN USER WINS WITH BLACKJACK (DEFAULT IS 3 TO 2). BLACKJACK OCCURS WHEN USER GET 21 WITH FIRST 2 CARDS
                    game_cash: 500000, //GAME CASH AVAILABLE WHEN GAME STARTS
                    show_credits: false, //ENABLE/DISABLE CREDITS BUTTON IN THE MAIN SCREEN
                    fullscreen: true, //SET THIS TO FALSE IF YOU DON'T WANT TO SHOW FULLSCREEN BUTTON
                    check_orientation: true, //SET TO FALSE IF YOU DON'T WANT TO SHOW ORIENTATION ALERT ON MOBILE DEVICES
                    ad_show_counter: 3 //NUMBER OF HANDS PLAYED BEFORE AD SHOWN
                })

                if (isIOS()) {
                    setTimeout(function() {
                        sizeHandler()
                    }, 200)
                } else {
                    sizeHandler()
                }
            }
        })
        .catch(function(error) {})
})