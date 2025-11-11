var roundText;
var showRoundText  = false;
var RoundText = {
    ShowRoundText: function(){
        winText.visible = false;
        roundText = Utils.TextSettingsControl(roundText,640.0,680.0,"Starting the next round","true","true",0.5,0.5,0.0,0.0,"Arial","bold","#ffffff","center","45px"); 
        roundText.alpha = 0.1; 
        this.AnimateRoundText(); 
    },
    LoopRoundText: function(){
        game.time.events.loop(Phaser.Timer.SECOND * 10.0, this.AnimateRoundText, this);
        game.time.events.start();
    },
    
    AnimateRoundText: function(){
        game.add.tween(roundText.scale).to({x: 1.0, y: 1.0}, 1000, Phaser.Easing.Linear.Out, true);
        game.add.tween(roundText).to( { alpha: 1 }, 2000, "Linear", true);
        setTimeout(() => {
            game.add.tween(roundText.scale).to({x: 0.0, y: 0.0}, 1000, Phaser.Easing.Linear.Out, true);
            game.add.tween(roundText).to( { alpha: 0.1 }, 2000, "Linear", true);
        }, 2000);
        setTimeout(() => {
            game.add.tween(roundText.scale).to({x: 1.0, y: 1.0}, 1000, Phaser.Easing.Linear.Out, true);
            game.add.tween(roundText).to( { alpha: 1.0 }, 2000, "Linear", true);
            roundText.setText("Collecting the boot amount");
        }, 4000);
        setTimeout(() => {
            game.add.tween(roundText.scale).to({ x: 0.0, y: 0.0}, 1000, Phaser.Easing.Linear.Out, true);
            game.add.tween(roundText).to( { alpha: 0.1 }, 2000, "Linear", true);
        }, 6000);
        setTimeout(() => {
            roundText.setText("Starting the next round");
            game.add.tween(roundText.scale).to({ x: 1.0, y: 1.0}, 1000, Phaser.Easing.Linear.Out, true);
            game.add.tween(roundText).to( { alpha: 1.0 }, 2000, "Linear", true);
        }, 8000);
        setTimeout(() => {
            game.add.tween(roundText.scale).to({ x: 0.0, y: 0.0}, 1000, Phaser.Easing.Linear.Out, true);
            game.add.tween(roundText).to( { alpha: 0.1 }, 2000, "Linear", true);
        }, 10000);
    },
    ShowText: function(){
        if(showRoundText){
            if(nextRoundText != null){
                nextRoundText.visible = false;
                nextRoundBg.visible = false;
                winText.visible = false;
            }
            this.ShowRoundText();
            this.LoopRoundText();
        }
    }
}