var angle;
var graphics;
var opponentPanelGraphicsCounter = 1;
var playerpriteSheet;
var OpponentWaitingPanel = {
    ShowWaitingPopup: function(message) {
        Debug.log("Show Waiting Pop Up Panel.................."+opponentPanelGraphicsCounter);
        //opponentPanelGraphicsCounter = 1;
        if(opponentPanelGraphicsCounter == 1){
            isTimeRemainingPopUp = false;
            startTime = new Date();
            totalTime = oppoentWaitingPanelTime;
            timeElapsed = 0;
            timeRemaining = 1;
            Debug.log("Time Elapsed.................."+timeElapsed + "Total Time........."+totalTime + "Opponent Time............"+oppoentWaitingPanelTime);
            waitingforPopUpPanelGroup = game.add.group();

            var overlay = Utils.SpriteSettingsControl(overlay,640,360,'blackOnePixel',"true","false",0.5,0.5,0.0,0.0);
            overlay.scale.setTo(1280, 720);
            overlay.alpha = 0.5;
            overlay.inputEnabled = true;

            var popupBase = Utils.SpriteSettingsControl(popupBase,640,360,'popupBase',"true","true",0.5,0.5,0.5,0.5);
            var waitingPopUpHeading = Utils.TextSettingsControl(waitingPopUpHeading,640.0,220.0,message,"true","false",0.5,0.5,0.0,0.0,"Arial","bold","#ffffff","center","35px");
            timerText = Utils.TextSettingsControl(timerText,640.0,490.0,'00:00',"true","false",0.5,0.5,0.0,0.0,"Arial","bold","#ffffff","center","30px");

            var blackGraphics = game.add.graphics(0,0);
            blackGraphics.lineStyle(10,0xffd900);
            blackGraphics.arc(game.world.centerX, game.world.centerY, 85, 0, 360,false);

            waitingforPopUpPanelGroup.add(overlay);
            waitingforPopUpPanelGroup.add(popupBase);
            waitingforPopUpPanelGroup.add(waitingPopUpHeading);
            waitingforPopUpPanelGroup.add(timerText);
            waitingforPopUpPanelGroup.add(blackGraphics);
            // angle = { min: 0, max: 0 };
        
            // var tween = game.add.tween(angle).to({ max: 360 }, 10, "Linear", true, 0, 0, false);

            game.time.events.loop(100, this.updateTimer, this);
            game.time.events.start();
            //this.GraphicsCreateArc(game.math.degToRad(0),game.math.degToRad(opponentPanelGraphicsCounter * 36));
            // for(var i = 2;i<10;i++){
            //     sett
            // }
            opponentPanelGraphicsCounter = 0;
            this.DummyPlayerAnimation();
        }
        //this.GraphicsCreateBlackArc();
    },

    GraphicsCreateArc: function(minangle,maxangle,color){
        graphics = game.add.graphics(0,0);
        graphics.clear();
        graphics.lineStyle(10, color /*0xffd900*/);
        graphics.arc(game.world.centerX, game.world.centerY, 85, minangle, maxangle,false);
        graphics.endFill();
        //opponentPanelGraphicsCounter++;
    },
    updateTimer: function() {
        //Debug.log("Enter into the Update Timer");
        currentTime = new Date();
        var timeDifference = startTime.getTime() - currentTime.getTime();
        timeElapsed = Math.abs(timeDifference / 1000);
        timeRemaining = totalTime - timeElapsed;
        var minutes = Math.floor(timeRemaining / 60);
        var seconds = Math.floor(timeRemaining) - (60 * minutes);

        if (timeElapsed <= totalTime) {
            //Do what you need to do
            var result = (minutes < 10) ? "0" + minutes : minutes;
            result += (seconds < 10) ? ":0" + seconds : ":" + seconds;
            timerText.text = result;
        }
        this.GraphicsCreateArc(game.math.degToRad(0),game.math.degToRad(360-(36*timeRemaining)),"0x000000");
        waitingforPopUpPanelGroup.add(graphics);
        waitingforPopUpPanelGroup.add(playerpriteSheet);
        game.world.bringToTop(waitingforPopUpPanelGroup);

    },
    EnableDisableTimerPopUp: function(isShow){
        Debug.log("Enter into the EnableDisableTImerPOpUp..........."+isShow);
        if(!isShow){
            if(waitingforPopUpPanelGroup != null)
                waitingforPopUpPanelGroup.visible = isShow;
            if(timerText != null)
                timerText.visible = isShow;
        }
    },
    DummyPlayerAnimation: function(){
        playerpriteSheet = game.add.sprite(game.world.centerX, game.world.centerY, 'waiting_opponent_spritesheet');
        playerpriteSheet.anchor.setTo(0.5,0.5);
        playerpriteSheet.scale.setTo(0.4,0.4);
        var anim = playerpriteSheet.animations.add('anim');
        playerpriteSheet.animations.play('anim',10, true);
    },
}