var closeBttn;
var proceedBttn;
var disclaimerPopupOverlay;
var disclaimerPopupPrompt;
var disclaimerText;
var disclaimerGroup;
var DisclamairPopup = {
    CreateDisclaimeropup: function() {
        disclaimerGroup = game.add.group();
        disclaimerPopupOverlay = Utils.ButtonSettingsControl(wrongPopupOverlay, 360.0, 640.0, 'blueOverlay', this.HideWrongPopup, null, null, null, "true", "true", 0.5, 0.5, 0.6, 0.6, this);
        disclaimerPopupPrompt = Utils.SpriteSettingsControl(wrongPopupPrompt, 360.0, 640.0, 'parentsBase', "true", "true", 0.5, 0.5, 0.6, 0.6);

        disclaimerText = game.add.bitmapText(360, 640, 'shootEmFont', '   You will lose \n your progress', 42);
        disclaimerText.anchor.set(0.5, 0.5);
        disclaimerText.tint = "0xffffff";


        closeBttn = Utils.ButtonSettingsControl(closeBttn, 660.0, 465.0, 'closeBttn',this.CloseBttnDownAnimation,null,null,this.CloseBttnUpAnimation, "true", "true", 0.5, 0.5, 0.5, 0.5,this); 
        proceedBttn = Utils.ButtonSettingsControl(proceedBttn, 360.0, 825.0, 'proceedBttn',this.NextBttnDownAnimation,null,null,this.NextBttnUpAnimation, "true", "true", 0.5, 0.5, 0.5, 0.5,this);   
    
        disclaimerGroup.add(disclaimerPopupOverlay);
        disclaimerGroup.add(disclaimerPopupPrompt);
        disclaimerGroup.add(disclaimerText);
        disclaimerGroup.add(closeBttn);
        disclaimerGroup.add(proceedBttn);
        disclaimerGroup.visible = false;
    },
    ShowDisclaimerPopUp: function(){
        disclaimerGroup.visible = true;
        game.paused = true;
        game.world.bringToTop(disclaimerGroup);
    },
    CloseBttnDownAnimation: function(){
        game.paused = false;
        game.add.tween(closeBttn.scale).to({ x: 0.45, y: 0.45}, 400, Phaser.Easing.Linear.None, true);
    },
    CloseBttnUpAnimation: function(){
        var closeBttnTween = game.add.tween(closeBttn.scale).to({ x: 0.5, y: 0.5}, 400, Phaser.Easing.Linear.None, true);
        closeBttnTween.onComplete.add(this.CloseBttnClick,this);
        // this.CloseBttnClick();
    },
    CloseBttnClick: function(){
        console.log("Close Bttn Click  1");
        closeBttn.scale.setTo(0.5,0.5);
        disclaimerGroup.visible = false;
    },
    NextBttnDownAnimation: function(){
        game.paused = false;
        game.add.tween(proceedBttn.scale).to({ x: 0.45, y: 0.45}, 400, Phaser.Easing.Linear.None, true);
    },
    NextBttnUpAnimation: function(){
      console.log("Nxt Bttn Click  1");
      var proceedBttnTween = game.add.tween(proceedBttn.scale).to({ x: 0.5, y: 0.5}, 400, Phaser.Easing.Linear.None, true);
      proceedBttnTween.onComplete.add(this.NextBttnClick,this);
    //   this.NextBttnClick();
    },
    NextBttnClick: function(){
      // WrongPopup.HideWrongPopup();
      proceedBttn.scale.setTo(0.5,0.5);
      game.paused = false;
      proceedBttnClick = true;
      StateTransition.TransitToMenu();
    },
}