$(document).ready(function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('token') || 'test188';
    const casino = urlParams.get('casino')
    const remote_id = urlParams.get('remote_id')
    const currency = urlParams.get('currency')
    const mode = urlParams.get('mode')

    var balanceVars;

    if (mode === 'offline') {
        balanceVars = 'https://api.gamessecure.com/casinos/api?action=balance' + '&mode=' + mode + '&token=' + token;
    } else {
        balanceVars = 'https://api.gamessecure.com/casinos/api?action=balance' + '&token=' + token + '&remote_id=' + remote_id + '&casino=' + casino + '&currency=' + currency;
    }
    fetch(balanceVars)
        .then(resp => resp.json())
        .then(function(data) {
            if (data.balance) {
                var oMain = new CMain({
                    win_occurrence: 40, //WIN OCCURRENCE PERCENTAGE. VALUES BETWEEN 0-100
                    min_bet: 1, //MIN BET PLAYABLE BY USER. DEFAULT IS 0.1$
                    max_bet: 300, //MAX BET PLAYABLE BY USER. 
                    money: Array.isArray(data.balance) ? data.balance[0].balance : data.balance, //STARING CREDIT FOR THE USER
                    //money: userBalance,
                    //money: 100,  
                    game_cash: 100, //GAME CASH AVAILABLE WHEN GAME STARTS
                    ante_payout: [
                        5, //MULTIPLIER FOR STRAIGHT FLUSH
                        4, //MULTIPLIER FOR THREE OF A KIND
                        1 //MULTIPLIER FOR STRAIGHT  
                    ],
                    //MULTIPLIER LIST FOR PAIR PLUS BET
                    plus_payouts: [40, //MULTIPLIER FOR STRAIGHT FLUSH
                        30, //MULTIPLIER FOR 3 OF A KIND
                        6, //MULTIPLIER FOR STRAIGHT
                        4, //MULTIPLIER FOR FLUSH
                        1
                    ], //MULTIPLIER FOR PAIR 
                    time_show_hand: 1500, //TIME (IN MILLISECONDS) SHOWING LAST HAND
                    audio_enable_on_startup: false, //ENABLE/DISABLE AUDIO WHEN GAME STARTS 
                    show_credits: true, //SET THIS VALUE TO FALSE IF YOU DON'T TO SHOW CREDITS BUTTON
                    fullscreen: true, //SET THIS TO FALSE IF YOU DON'T WANT TO SHOW FULLSCREEN BUTTON
                    check_orientation: true, //SET TO FALSE IF YOU DON'T WANT TO SHOW ORIENTATION ALERT ON MOBILE DEVICES
                    //////////////////////////////////////////////////////////////////////////////////////////
                    ad_show_counter: 10 //NUMBER OF HANDS PLAYED BEFORE AD SHOWN
                        //
                        //// THIS FUNCTIONALITY IS ACTIVATED ONLY WITH CTL ARCADE PLUGIN.///////////////////////////
                        /////////////////// YOU CAN GET IT AT: /////////////////////////////////////////////////////////
                        // http://codecanyon.net/item/ctl-arcade-wordpress-plugin/13856421 ///////////
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