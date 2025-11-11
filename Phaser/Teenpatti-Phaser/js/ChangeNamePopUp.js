var okButton;
var okButtonText;
var ChangeNamePopUp = {
    CreateChangeNamePopup: function() {
        changeNamePopupGroup = game.add.group();
        var changeNamePopupOverlay = Utils.ButtonSettingsControl(changeNamePopupOverlay,640,300,'blackOnePixel',this.HideChangeNamePopUp,null,null,null,"true","true",0.5,0.5,1600,1600,this);
        changeNamePopupOverlay.alpha = 0.5;
        var changeNamePopupBase =  Utils.SpriteSettingsControl(changeNamePopupBase,640,360,'popupBase',"true","true",0.5,1.0,0.5,0.5,"true");
        var changeNamePopupHeading =  Utils.TextSettingsControl(changeNamePopupHeading,640.0,30.0,'Set Player Name',"true","false",0.5,0.5,0.5,0.5,"Arial","bold","#ffffff","center","35px");
        var nameInputBase =  Utils.SpriteSettingsControl(nameInputBase,640,120,'enter_code',"true","true",0.5,0.5,0.6,0.5,true);

        change_Name_value = game.add.inputField(460.0,100.0, {
            font: '25px Arial',
            fill: '#ffffff',
            fillAlpha: 0,
            fontWeight: 'bold',
            width: 350,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 6,
           // placeHolder: 'Enter your Name',
            zoom: false,
            cursorColor: '#ffffff'
        });
        Debug.log("The Value of user name........"+user_name);
        change_Name_value.setText(user_name);
        Debug.log("The Value of user name........"+change_Name_value.value);
        okButton = Utils.ButtonSettingsControl(okButton,640.0,260.0,'green_base',this.OkBttnDown,null,null,this.OkBttnUp,"true","true",0.5,0.5,0.4,0.7,this);
        okButtonText = Utils.TextSettingsControl(okButtonText,640.0,255.0,'OKAY',"true","false",0.5,0.5,0.0,0.0,"Arial","bold","#ffffff","center","30px");

        changeNamePopupGroup.add(changeNamePopupOverlay);
        changeNamePopupGroup.add(changeNamePopupBase);
        changeNamePopupGroup.add(changeNamePopupHeading);
        changeNamePopupGroup.add(nameInputBase);
        changeNamePopupGroup.add(change_Name_value);
        changeNamePopupGroup.add(okButton);
        changeNamePopupGroup.add(okButtonText);
        changeNamePopupGroup.visible = false;
        change_Name_value.value = user_name;
       // game.add.tween(changeNamePopupGroup).to({ x: 0, y: 220 }, 1200, Phaser.Easing.Bounce.Out, true);
    },
    ShowChangeNamePopup: function(){
        changeNamePopupGroup.visible = true;
        game.add.tween(changeNamePopupGroup).to({ x: 0, y: 220 }, 1200, Phaser.Easing.Bounce.Out, true);
        change_Name_value.value = user_name;
    },
    HideChangeNamePopUp: function() {
        console.log("Name Changed"+change_Name_value.value.length);
        if(change_Name_value.value.length > 0){
            API.UpdateProfileName(change_Name_value.value);
            Loading.HideLoadingPopUp();
            Debug.log("Enter into the Change Name Value Null"+change_Name_value.value);
        }
        var tween = game.add.tween(changeNamePopupGroup).to({ x: 0, y: -360 }, 400, Phaser.Easing.Linear.Out, true);
        tween.onComplete.add(this.CompleteHideChangePopUp);
    },
    CompleteHideChangePopUp : function(){
        changeNamePopupGroup.visible = false;
    },
    OkBttnDown: function(){
        var okBttnDownTween = game.add.tween(okButton.scale).to({ x: 0.35, y: 0.65}, 100, Phaser.Easing.Linear.Out, true);
        var okBttnDownTween = game.add.tween(okButtonText.scale).to({ x: 0.95, y: 0.95}, 100, Phaser.Easing.Linear.Out, true);
    },
    OkBttnUp: function(){
        var okBttnUpTween = game.add.tween(okButton.scale).to({ x: 0.4, y: 0.7}, 100, Phaser.Easing.Linear.Out, true);
        var okBttnUpTween = game.add.tween(okButtonText.scale).to({ x: 1.0, y: 1.0}, 100, Phaser.Easing.Linear.Out, true);
        okBttnUpTween.onComplete.add(this.HideChangeNamePopUp,this);
    }
}