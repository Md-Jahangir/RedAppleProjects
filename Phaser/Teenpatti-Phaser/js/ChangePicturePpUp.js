var changePicturePopupOverlay;
var submitButton;
var submitButtonText;
var ChangePicturePopUp = {

    //This function is called for Create The Change Picture PopUp
    CreateChangePicturePopUp: function(){
        _profile_picture.inputEnabled = false;
        Debug.log("Create the Change Picture Pop Up"+avatarsArray.length + "         Tick Mark ARray Length......."+tickMarkArray.length);
        if(avatarsArray.length > 0){
            for(var i = 0;i<avatarsArray.length;i++){
                avatarsArray[i] = null;
                tickMarkArray[i] = null;
            }
            avatarsArray.length = 0;
            tickMarkArray.length = 0;
        }
        Debug.log("Create the Change Picture Pop Up.............................."+avatarsArray.length + "         Tick Mark ARray Length......."+tickMarkArray.length);
        changePictureGroup = game.add.group();

        changePicturePopupOverlay =  Utils.SpriteSettingsControl(changePicturePopupOverlay,640,360,'blackOnePixel',"true","true",0.5,0.5,1280,1720,"false");
        changePicturePopupOverlay.alpha = 0.5;
        // changePicturePopupOverlay.inputEnabled = false;
        changePicturePopupOverlay.events.onInputUp.add(this.PopUpCloseAnimation, this);

        // changePicturePopupOverlay = Utils.ButtonSettingsControl(changePicturePopupOverlay,640.0,360.0,'blackOnePixel',null,null,null,this.OverlayUpAnimation,"true","true",0.5,0.5,1280,1720);
        // changePicturePopupOverlay.alpha = 0.5;
        // changePicturePopupOverlay.inputEnabled = false;

        submitButton = Utils.ButtonSettingsControl(submitButton,640,240,'green_base',this.SubmitBttnDown,null,null,this.SubmitBttnUp,"true","true",0.5,0.5,0.4,0.7,this);
        submitButtonText = Utils.TextSettingsControl(submitButtonText,640.0,235.0,'OKAY',"true","false",0.5,0.5,0.,0.0,"Arial","bold","#ffffff","center","25px");

        var avatarPopupBase = Utils.ButtonSettingsControl(avatarPopupBase,640,280,'popupBase',this.GetStartPosition,null,null,this.GetEndPosition,"true","true",0.5,1.0,0.8,0.8,this);
        var changeNamePopupHeading =  Utils.TextSettingsControl(changeNamePopupHeading,640.0,-280.0,'Set Player Avatar',"true","false",0.5,0.5,0.5,0.5,"Arial","bold","#ffffff","center","35px");

        rightButton = Utils.ButtonSettingsControl(rightButton,1070,-50,'arrowButton',this.RightBttnDown,null,null,this.RightBttnUp,"true","true",0.5,0.5,0.8,0.8,this);
        leftButton = Utils.ButtonSettingsControl(leftButton,210,-50,'arrowButton',this.LeftBttnDown,null,null,this.LeftBttnUp,"true","true",0.5,0.5,0.8,0.8,this);
        leftButton.angle = -180;

        changePictureGroup.add(changePicturePopupOverlay);
        changePictureGroup.add(avatarPopupBase);
        changePictureGroup.add(changeNamePopupHeading);

        changePictureGroup.add(rightButton);
        changePictureGroup.add(leftButton);

        changePictureGroup.add(submitButton);
        changePictureGroup.add(submitButtonText);

        //changePictureGroup.position.set(1800, 0);
        changePictureGroup.visible = false;
        leftButton.tint = hoverColourCode;
    },

    //This function is called for Select The Specific Tick
    SelectSpecificTick: function(){
        tickMarkArray[user_image-1].visible = true;
    },

    //This function is called for Create the Scroll Group
    CreateScrollGroup: function() {
        scrollGroup = game.add.group();

        scrollGroup.position.set(0, 0);

        var mask = game.add.graphics(0, 0);
        mask.beginFill(0xffffff);
        // mask.drawRect(175, 160, 930, 420);
        mask.drawRect(227, 160, 825, 420);
        scrollGroup.mask = mask;

        scrollbg = game.add.sprite(640, 360, 'whiteOnePixel');
        scrollbg.anchor.set(0.5, 0.5);
        scrollbg.scale.set(940, 580);
        scrollbg.alpha = 0;
        //scrollbg.inputEnabled = true;
        // scrollbg.events.onInputDown(this.ShowChangePicturePopUp(),this);

        scrollGroup.add(scrollbg);

        var initX = 320;
        var initY = 250;

        for (var i = 0; i < numberOfAvatar; i++) {
            avatarsArray.push(this.CreateAvatar(i+1,initX, initY));
            tickMarkArray.push(this.CreateTickMark(initX+45,initY-55));
            scrollGroup.add(avatarsArray[i]);
            scrollGroup.add(tickMarkArray[i]);
            initX += 215;
            if (i > changePicturePopUpScrollCounter) {
                initY += 250;
                initX = 320;
                changePicturePopUpScrollCounter += 8;
            }
        }
        // setTimeout(() => {
        //     // changePicturePopupOverlay.inputEnabled = true;
        // }, 1000);
    },

    //This function is called for Create the Avatar
    CreateAvatar: function(index,x, y) {  
        var pic = game.add.button(x, y, index);
        pic.anchor.set(0.5, 0.5);
        pic.scale.set(0.0, 0.0);
        pic.events.onInputDown.add(this.PictureButtonClick,this);
        game.add.tween(pic.scale).to({ x: 0.5, y: 0.5 }, 1000, Phaser.Easing.Bounce.Out, true);
        return pic;
    },

    //This function is called for Create the Tick Mark
    CreateTickMark: function(x,y){
        tick_mark = game.add.sprite(x,y,'setting_tick_mark');
        tick_mark.anchor.set(0.5, 0.5);
        tick_mark.scale.set(1.0, 1.0);
        return tick_mark;
    },

    RightBttnDown: function(){
        var rightbttnDownTween = game.add.tween(rightButton.scale).to({ x: 0.75, y: 0.75}, 100, Phaser.Easing.Linear.In, true);
    },
    RightBttnUp: function(){
        var rightbttnUpTween = game.add.tween(rightButton.scale).to({ x: 0.8, y: 0.8}, 100, Phaser.Easing.Linear.In, true);
        rightbttnUpTween.onComplete.add(this.MoveRight,this);
    },
    LeftBttnUp: function(){
        var leftbttnUpTween = game.add.tween(leftButton.scale).to({ x: 0.8, y: 0.8}, 100, Phaser.Easing.Linear.In, true);
        leftbttnUpTween.onComplete.add(this.MoveLeft,this);
    },
    LeftBttnDown: function(){
        var leftbttnDownTween = game.add.tween(leftButton.scale).to({ x: 0.75, y: 0.75}, 100, Phaser.Easing.Linear.In, true);
    },

    MoveRight: function() {
        rightButton.inputEnabled = false;
        if (scrollGroup.x >= -650) {
            scrollCounter++;
            speed -= 650;
            var leanTween = game.add.tween(scrollGroup.position).to({ x: speed, y: 0 }, 500, Phaser.Easing.Linear.Out, true);
            leanTween.onComplete.add(this.MoveRightInputUp, this);
            if(scrollCounter >= 2){
                rightButton.tint = hoverColourCode;
            }
            else{
                leftButton.tint = outColourCode;  
            }
        }
    },
    MoveRightInputUp: function(){
        rightButton.inputEnabled = true;
        leftButton.inputEnabled = true;
    },
    MoveLeft: function() {
        leftButton.inputEnabled = false;
        if (scrollGroup.x <= -650) {
            scrollCounter--;
            speed += 650;
            var leanTween = game.add.tween(scrollGroup.position).to({ x: speed, y: 0 }, 500, Phaser.Easing.Linear.Out, true);
            leanTween.onComplete.add(this.MoveLeftInputUp, this);
            if(scrollCounter <= 0){
                leftButton.tint = hoverColourCode;
            }
            else{
                rightButton.tint = outColourCode;
            }
        }
    },

    MoveLeftInputUp: function(){
        rightButton.inputEnabled = true;
        leftButton.inputEnabled = true;
    },

    PictureButtonClick: function(index){
        this.DeactivateAllTick();
        changePicturePopUpImageName = index.key;
        Debug.log("The name of the Sprite......"+index.key);
        tickMarkArray[index.key - 1].visible = true;
    },

    DeactivateAllTick: function(){
        for (var i = 0; i < tickMarkArray.length; i++) {
            tickMarkArray[i].visible = false;
        }
    },

    HideChangePicturePopUp: function(){
        changePicturePopupOverlay.visible = false;
        changePictureGroup.visible = false;
        scrollGroup.visible = false;
    },

    ShowChangePicturePopUp: function(){
        _profile_picture.inputEnabled = false;
        //changePicturePopupOverlay.visible = true;
        var appearTween = game.add.tween(changePictureGroup).to({ x: 0, y: 420 }, 1000, Phaser.Easing.Bounce.Out, true);
        appearTween.onComplete.add(this.OnCompleteTween,this);
        //setTimeout(this.OnCompleteTween,700,this);
        Debug.log("Show Picture Pop up");
        changePicturePopUpScrollCounter = 6;
        speed = 0;
        scrollCounter = 0;
        changePictureGroup.visible = true;
        //scrollGroup.visible = true;
    },

    OnCompleteTween: function(){
        this.CreateScrollGroup();
        this.DeactivateAllTick();
        setTimeout(() => {
            this.SelectSpecificTick();
            if(changePicturePopupOverlay != null){
                changePicturePopupOverlay.inputEnabled = true;
                _Classics_card.inputEnabled = true;
                // _Muflis_Card.inputEnabled = true;
                // _Joker_Card.inputEnabled = true;
                _Private_Table_Button.inputEnabled = true;
            }
        }, 500);
        //this.HideChangePicturePopUp();
    },

    GetStartPosition: function() {
        startPos = game.input.x;
        console.log("start Position: " + startPos);
    },

    GetEndPosition: function() {
        endPos = game.input.x;
        console.log("end Position: " + endPos);
        deltaX = endPos - startPos;
        console.log("Gap  Position: " + deltaX);

        if (deltaX > threshold) {
            this.MoveLeft();
        } else if (deltaX < -threshold) {
            this.MoveRight();
        }

    },

    SubmitBttnDown: function(){
        //submitBttnGroup.position.set(0,0);
        var submitBttnDecareaseScaleAnimation = game.add.tween(submitButton.scale).to({ x: 0.35, y: 0.65}, 100, Phaser.Easing.Linear.In, true);
        var submitBttnDecareaseScaleAnimation = game.add.tween(submitButtonText.scale).to({ x: 0.95, y: 0.95}, 100, Phaser.Easing.Linear.In, true);
        //submitBttnDecareaseScaleAnimation.onComplete.add(this.SubmitBttnCLicked,this);
    },
    SubmitBttnUp: function(){
        var submitBttnIncreaseScaleAnimation = game.add.tween(submitButton.scale).to({ x: 0.4, y: 0.7}, 100, Phaser.Easing.Linear.Out, true);
        var submitBttnIncreaseScaleAnimation = game.add.tween(submitButtonText.scale).to({ x: 1.0, y: 1.0}, 100, Phaser.Easing.Linear.Out, true);
        submitBttnIncreaseScaleAnimation.onComplete.add(this.SubmitBttnCLicked,this);
    },
    //This function is called for Submit Button Click
    SubmitBttnCLicked: function(){
        Debug.log("ENter into the submit button clicked"+changePicturePopUpImageName);
        controlPicturePopup = false;
        if(changePicturePopUpImageName != null){
            user_image = changePicturePopUpImageName;
            API.SetProfilePic();
        }
        else{
            PopUp.GenerateCommonPopup('Please Select An Image \n          For Change');
        }
    },

    //This function is called for Close Animation of the PopUp
    PopUpCloseAnimation: function(){
        for(var i = 0;i<avatarsArray.length;i++){
            tickMarkArray[i].visible = false;
            game.add.tween(avatarsArray[i].scale).to({ x: 0.0, y: 0.0 }, 300, Phaser.Easing.Linear.Out, true);
        }
        setTimeout(this.OverlayCloseAnimation,300);
    },

    //This function is called for Close the Overlay of the PopUp
    OverlayCloseAnimation: function(){
        var popUpTween = game.add.tween(changePictureGroup).to({ x: 0, y: -420 }, 300, Phaser.Easing.Linear.Out, true);
        popUpTween.onComplete.add(function(){
            changePicturePopupOverlay.visible = false;
            changePicturePopupOverlay.destroy();
            changePictureGroup.destroy();
            scrollGroup.destroy();
            for(var i = 0;i<avatarsArray.length;i++){
                avatarsArray[i].destroy();
            }
            for(var i = 0;i<tickMarkArray.length;i++){
                tickMarkArray[i].destroy();
            }
            setTimeout(() => {
                _profile_picture.inputEnabled = true;
                profilePicButtonClick = false;
            }, 500);
            controlPicturePopup = false;
        });
    },
};