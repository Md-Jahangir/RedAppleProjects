$(document).ready(function() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('token') || 'test188';
    const casino = urlParams.get('casino');
    const remote_id = urlParams.get('remote_id');
    const currency = urlParams.get('currency')
    const mode = urlParams.get('mode')

    var userBalance;


    if (mode === 'offline') {
        balanceVars = 'https://api.gamessecure.com/casinos/api?action=balance' + '&mode=' + mode + '&token=' + token;
    } else {
        balanceVars = 'https://api.gamessecure.com/casinos/api?action=balance' + '&token=' + token + '&remote_id=' + remote_id + '&casino=' + casino + '&currency=' + currency;
    }
    fetch(balanceVars)
        .then(resp => resp.json())
        .then(function(data) {
            if (data.balance) {


                var obj = JSON.parse(serverRequests.gameInitData());
                var oMain = new CMain({
                    sid: obj.sid,
                    money: Array.isArray(data.balance) ? data.balance[0].balance : data.balance, //STARING CREDIT FOR THE USER
                    min_bet: serverRequests.getCurrencies().currencyBetMultiplier.BetMultiplierRoulette[0], //MINIMUM BET 0.1
                    max_bet: 1000, //serverRequests.getCurrencies().currencyBetMultiplier.BetMultiplierRoulette[1], //MAXIMUM BET 1000
                    time_bet: obj.time_bet, //TIME TO WAIT FOR A BET IN MILLISECONDS. 0 SET 0 IF YOU DON'T WANT BET LIMIT
                    time_winner: obj.time_winner, //TIME FOR WINNER SHOWING IN MILLISECONDS    1500
                    win_occurrence: -1, //Win occurrence percentage (100 = always win if there is enough cash). 
                    //SET THIS VALUE TO -1 IF YOU WANT WIN OCCURRENCE STRICTLY RELATED TO PLAYER BET ( SEE DOCUMENTATION)
                    casino_cash: obj.casino_cash, //The starting casino cash that is 1000 recharged by the money lost by the user
                    fullscreen: obj.fullscreen, //SET THIS TO FALSE IF YOU DON'T WANT TO SHOW FULLSCREEN BUTTON
                    check_orientation: obj.check_orientation, //SET TO FALSE IF YOU DON'T WANT TO SHOW ORIENTATION ALERT 
                    show_credits: obj.show_credits, //ENABLE/DISABLE CREDITS BUTTON IN THE MAIN SCREEN
                    num_hand_before_ads: obj.num_hand_before_ads //10 NUMBER OF HANDS PLAYED BEFORE AD SHOWN
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