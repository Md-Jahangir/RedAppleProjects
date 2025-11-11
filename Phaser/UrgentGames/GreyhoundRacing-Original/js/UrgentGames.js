$(document).ready(function(){
      let userBalance=  serverRequests.getBalance();

    var oMain = new CMain({        
                    //money:100, 
                    money: Array.isArray(userBalance) ? userBalance[0].balance : userBalance, //STARING CREDIT FOR THE USER
                    //money:serverRequests.getBalance(),          //USER MONEY
                    min_bet:1,            //MINIMUM BET
                    max_bet:100,          //MAXIMUM BET
                    win_occurrence: 30,   //WIN OCCURRENCE
                    game_cash:100,        //GAME CASH. STARTING MONEY THAT THE GAME CAN DELIVER.
                    chip_values:[1,5,10,25,50,100], //VALUE OF CHIPS
                    show_credits:true, //SET THIS VALUE TO FALSE IF YOU DON'T TO SHOW CREDITS BUTTON
                    fullscreen:true, //SET THIS TO FALSE IF YOU DON'T WANT TO SHOW FULLSCREEN BUTTON
                    check_orientation:true,     //SET TO FALSE IF YOU DON'T WANT TO SHOW ORIENTATION ALERT ON MOBILE DEVICES
                    num_levels_for_ads: 2 //NUMBER OF TURNS PLAYED BEFORE AD SHOWING //
                            //////// THIS FEATURE  IS ACTIVATED ONLY WITH CTL ARCADE PLUGIN./////////////////////////// 
                            /////////////////// YOU CAN GET IT AT: ///////////////////////////////////////////////////////// 
                            // http://codecanyon.net/item/ctl-arcade-wordpress-plugin/13856421///////////
    });

    

    $(oMain).on("start_session", function (evt) {
        if (getParamValue('ctl-arcade') === "true") {
            parent.__ctlArcadeStartSession();
        }
    });

    $(oMain).on("end_session", function (evt) {
        if (getParamValue('ctl-arcade') === "true") {
            parent.__ctlArcadeEndSession();
        }
    });
    
    $(oMain).on("bet_placed", function (evt, iTotBet) {
        //...ADD YOUR CODE HERE EVENTUALLY
    });
        
    $(oMain).on("save_score", function (evt, iScore) {
        if (getParamValue('ctl-arcade') === "true") {
            parent.__ctlArcadeSaveScore({score: iScore});
        }
    });

    $(oMain).on("show_interlevel_ad", function (evt) {
        if (getParamValue('ctl-arcade') === "true") {
            parent.__ctlArcadeShowInterlevelAD();
        }
    });

    $(oMain).on("share_event", function (evt, iScore) {
        if (getParamValue('ctl-arcade') === "true") {
            parent.__ctlArcadeShareEvent({img: TEXT_SHARE_IMAGE,
                title: TEXT_SHARE_TITLE,
                msg: TEXT_SHARE_MSG1 + iScore
                        + TEXT_SHARE_MSG2,
                msg_share: TEXT_SHARE_SHARE1
                        + iScore + TEXT_SHARE_SHARE1});
        }
    });

    if (isIOS()) {
        setTimeout(function () {
            sizeHandler();
        }, 200);
    } else {
        sizeHandler();
    }
  
   
});