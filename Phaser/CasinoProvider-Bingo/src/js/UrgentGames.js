$(document).ready(function () {

    var userBalance = serverRequests.getBalance();
    console.log("userBalance: ", userBalance);
    // userBalance = 50000;
    $(document).ready(function () {
        var oMain = new CMain({

            bank_money: 1000,
            //start_player_money: serverRequests.getBalance(),
            start_player_money: Array.isArray(userBalance) ? userBalance[0].balance : userBalance,
            //start_player_money: 100,
            coin_bet: [0.25, 0.5, 1],
            win_occurrence: [
                40, //WIN OCURRENCE PERCENTAGE FOR 45 EXTRACTIONS
                50, //WIN OCURRENCE PERCENTAGE FOR 55 EXTRACTIONS
                60],//WIN OCURRENCE PERCENTAGE FOR 65 EXTRACTIONS
            time_extraction: 200,  //REDUCE THIS VALUE TO SPEED UP THE EXTRACTION
            paytable: [
                [5, 50, 100], //PAYTABLE FOR 45 EXTRACTIONS
                [2, 10, 50], //PAYTABLE FOR 55 EXTRACTIONS
                [1, 2, 20], //PAYTABLE FOR 65 EXTRACTIONS
            ],
            audio_enable_on_startup: false, //ENABLE/DISABLE AUDIO WHEN GAME STARTS 
            show_credits: true,           //ENABLE/DISABLE CREDITS BUTTON IN THE MAIN SCREEN
            fullscreen: true, //SET THIS TO FALSE IF YOU DON'T WANT TO SHOW FULLSCREEN BUTTON
            check_orientation: true,     //SET TO FALSE IF YOU DON'T WANT TO SHOW ORIENTATION ALERT ON MOBILE DEVICES
            //////////////////////////////////////////////////////////////////////////////////////////
            ad_show_counter: 5     //NUMBER OF TURNS PLAYED BEFORE AD SHOWN
            //
            //// THIS FUNCTIONALITY IS ACTIVATED ONLY WITH CTL ARCADE PLUGIN.///////////////////////////
            /////////////////// YOU CAN GET IT AT: /////////////////////////////////////////////////////////
            // http://codecanyon.net/item/ctl-arcade-wordpress-plugin/13856421?s_phrase=&s_rank=27 ///////////

        });

        $(oMain).on("recharge", function (evt) {
            //INSERT HERE YOUR RECHARGE SCRIPT THAT RETURN MONEY TO RECHARGE
            var iMoney = 100;
            if (s_oGame !== null) {
                s_oGame.setMoney(iMoney);
            }
        });


        $(oMain).on("start_session", function (evt) {
            if (getParamValue('ctl-arcade') === "true") {
                parent.__ctlArcadeStartSession();
            }
            //...ADD YOUR CODE HERE EVENTUALLY
        });

        $(oMain).on("end_session", function (evt) {
            if (getParamValue('ctl-arcade') === "true") {
                parent.__ctlArcadeEndSession();
            }
            //...ADD YOUR CODE HERE EVENTUALLY
        });

        $(oMain).on("save_score", function (evt, iScore) {
            if (getParamValue('ctl-arcade') === "true") {
                parent.__ctlArcadeSaveScore({ score: iScore });
            }
            //...ADD YOUR CODE HERE EVENTUALLY
        });

        $(oMain).on("show_interlevel_ad", function (evt) {
            if (getParamValue('ctl-arcade') === "true") {
                parent.__ctlArcadeShowInterlevelAD();
            }
            //...ADD YOUR CODE HERE EVENTUALLY
        });

        $(oMain).on("share_event", function (evt, iMoney) {
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

        $(oMain).on("bet_placed", function (evt, iTotBet) {
            //...ADD YOUR CODE HERE EVENTUALLY

        });

        if (isIOS()) {
            setTimeout(function () { sizeHandler(); }, 200);
        } else {
            sizeHandler();
        }
    });


});