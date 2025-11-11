$(document).ready(function() {
    var oMain = new CMain({
                time_show_hand: 2500, //TIME (IN MILLISECONDS) SHOWING LAST HAND
                fullscreen: true, //SET THIS TO FALSE IF YOU DON'T WANT TO SHOW FULLSCREEN BUTTON
                check_orientation: true, //SET TO FALSE IF YOU DON'T WANT TO SHOW ORIENTATION ALERT ON MOBILE DEVICES
                audio_enable_on_startup: false, //ENABLE/DISABLE AUDIO WHEN GAME STARTS 
            });

            $(oMain).on("end_session", function(evt) {
                   if(getParamValue('ctl-arcade') === "true"){
                       parent.__ctlArcadeEndSession();
                   }
                   //...ADD YOUR CODE HERE EVENTUALLY
                serverRequests.reset(function (res) {
                }, this);
            });
              if (isIOS()) {
                  setTimeout(function() {
                      sizeHandler()
                  }, 200)
              } else {
                  sizeHandler()
              }
});