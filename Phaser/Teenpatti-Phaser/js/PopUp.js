var isShowCommonPopUp = false;
var PopUp = {
    GenerateCommonPopup: function(message) {
  
        popUpOverlay = game.add.sprite(640, 360, 'blackOnePixel');
        popUpOverlay.anchor.setTo(0.5, 0.5);
        popUpOverlay.scale.setTo(1280, 720);
        popUpOverlay.alpha = 0.5;
        popUpOverlay.inputEnabled = true;

        commonPopupGroup = game.add.group();
        commonPopupGroup.position.set(0, 0);

        commonPopupText = game.add.text(640, 320, message, { font: '30px Arial', fill: '#ffffff', boundsAlignH: "center"});
        commonPopupText.anchor.set(0.5, 0.5);

        commonPopupBase = game.add.sprite(640, 360, 'popupBase');
        commonPopupBase.anchor.setTo(0.5, 0.5);
        commonPopupBase.scale.setTo(0.5, 0.5);

        commonPopUpOkButton = game.add.sprite(640, 460, 'okButton');
        commonPopUpOkButton.anchor.setTo(0.5, 0.5);
        commonPopUpOkButton.scale.setTo(0.5, 0.5);
        commonPopUpOkButton.inputEnabled = true;
        commonPopUpOkButton.events.onInputDown.add(this.OkButtonDownAnimation,this);
        commonPopUpOkButton.events.onInputUp.add(this.OkButtonUpAnimation,this);

        commonPopupGroup.add(popUpOverlay);
        commonPopupGroup.add(commonPopupBase);
        commonPopupGroup.add(commonPopUpOkButton);
        commonPopupGroup.add(commonPopupText);

        commonPopupGroup.visible = true;
        //Open Pop up
        //tween = game.add.tween(popup.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);

        //Close pop up
        // tween = game.add.tween(popup.scale).to( { x: 0.1, y: 0.1 }, 500, Phaser.Easing.Elastic.In, true);
        isShowCommonPopUp = true;
    },
    ShowCommonPopUp: function(){
        if(isShowCommonPopUp){
            game.world.bringToTop(commonPopupGroup);
        }
    },
    OkButtonClick: function(){
        commonPopupGroup.visible = false;
        isShowCommonPopUp = false;
    },
    OkButtonDownAnimation: function(){
        game.add.tween(commonPopUpOkButton.scale).to({ x: 0.45, y: 0.45}, 100, Phaser.Easing.Linear.In, true);
    },
    OkButtonUpAnimation: function(){
        game.add.tween(commonPopUpOkButton.scale).to({ x: 0.5, y: 0.5}, 100, Phaser.Easing.Linear.In, true);
        setTimeout(() => {
           this.OkButtonClick();
        }, 400);
    }
}