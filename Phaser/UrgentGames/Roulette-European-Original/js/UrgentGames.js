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
        balanceVars = 'https://dev.gamessecure.com/casinos/api?action=balance' + '&mode=' + mode + '&token=' + token;
        // balanceVars = 'https://api.gamessecure.com/casinos/api?action=balance' + '&mode=' + mode + '&token=' + token;
    } else {
        balanceVars = 'https://dev.gamessecure.com/casinos/api?action=balance' + '&token=' + token + '&remote_id=' + remote_id + '&casino=' + casino + '&currency=' + currency;
        // balanceVars = 'https://api.gamessecure.com/casinos/api?action=balance' + '&token=' + token + '&remote_id=' + remote_id + '&casino=' + casino + '&currency=' + currency;
    }
    fetch(balanceVars)
        .then(resp => resp.json())
        .then(function(data) {
            if (data.balance) {

                // var obj = JSON.parse(serverRequests.gameInitData());
                // console.log("obj: ", obj);
                var oMain = new CMain({
                    money: 1000, //STARING CREDIT FOR THE USER
                    min_bet: 0.1, //MINIMUM BET
                    max_bet: 1000, //MAXIMUM BET
                    time_bet: 0, //TIME TO WAIT FOR A BET IN MILLISECONDS. SET 0 IF YOU DON'T WANT BET LIMIT
                    time_winner: 1500, //TIME FOR WINNER SHOWING IN MILLISECONDS    
                    win_occurrence: 30, //Win occurrence percentage (100 = always win). 
                    //SET THIS VALUE TO -1 IF YOU WANT WIN OCCURRENCE STRICTLY RELATED TO PLAYER BET ( SEE DOCUMENTATION)
                    casino_cash: 1000, //The starting casino cash that is recharged by the money lost by the user
                    fullscreen: true, //SET THIS TO FALSE IF YOU DON'T WANT TO SHOW FULLSCREEN BUTTON
                    check_orientation: true, //SET TO FALSE IF YOU DON'T WANT TO SHOW ORIENTATION ALERT 
                    show_credits: true, //ENABLE/DISABLE CREDITS BUTTON IN THE MAIN SCREEN
                    num_hand_before_ads: 10 //NUMBER OF HANDS PLAYED BEFORE AD SHOWN
                        //
                        //// THIS FUNCTIONALITY IS ACTIVATED ONLY WITH CTL ARCADE PLUGIN.///////////////////////////
                        /////////////////// YOU CAN GET IT AT: /////////////////////////////////////////////////////////
                        // http://codecanyon.net/item/ctl-arcade-wordpress-plugin/13856421 ///////////
                });


                $(oMain).on("recharge", function(evt) {
                    //alert("recharge");
                });

                $(oMain).on("start_session", function(evt) {
                    if (getParamValue('ctl-arcade') === "true") {
                        parent.__ctlArcadeStartSession();
                    }
                    //...ADD YOUR CODE HERE EVENTUALLY
                });

                $(oMain).on("end_session", function(evt) {
                    if (getParamValue('ctl-arcade') === "true") {
                        parent.__ctlArcadeEndSession();
                    }
                    //...ADD YOUR CODE HERE EVENTUALLY
                });

                $(oMain).on("bet_placed", function(evt, iTotBet) {

                    //...ADD YOUR CODE HERE EVENTUALLY
                });

                $(oMain).on("save_score", function(evt, iMoney) {

                    if (getParamValue('ctl-arcade') === "true") {
                        parent.__ctlArcadeSaveScore({ score: iMoney });
                    }
                    //...ADD YOUR CODE HERE EVENTUALLY
                });

                $(oMain).on("show_interlevel_ad", function(evt) {
                    if (getParamValue('ctl-arcade') === "true") {
                        parent.__ctlArcadeShowInterlevelAD();
                    }
                    //...ADD YOUR CODE HERE EVENTUALLY
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
                    //...ADD YOUR CODE HERE EVENTUALLY
                });

                if (isIOS()) {
                    setTimeout(function() { sizeHandler(); }, 200);
                } else {
                    sizeHandler();
                }

            }
        })
        .catch(function(error) {})

})