var sendButton;
var ChatBox = {
    ShowChatPopup: function() {
        templateJsonData = game.cache.getJSON('templateJsonData');

        chatGroup = game.add.group();

        var chatPopupOverlay = Utils.ButtonSettingsControl(chatPopupOverlay, 640, 360, 'blackOnePixel', this.GetStartPositionOfChatBox, null, null, this.GetEndPositionOfChatBox, "true", "true", 0.5, 0.5, 1600, 900, this);
        chatPopupOverlay.alpha = 0.8;

        var typingBase = Utils.SpriteSettingsControl(typingBase, 540, 660, 'typingBase', "true", "true", 0.5, 0.5, 0.5, 0.5);
        messageTypedValue = game.add.inputField(285, 635, {
            font: '25px Arial',
            fill: '#ffffff',
            fillAlpha: 0,
            fontWeight: 'bold',
            width: 500,
            padding: 8,
            max: 35,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 6,
            placeHolder: 'Enter message here',
            zoom: false
        });
        sendButton = Utils.ButtonSettingsControl(sendButton, 890, 660, 'sendButton', this.SendButtonDownAnimation, null, null, this.SendButtonUpAnimation, "true", "true", 0.5, 0.5, 0.5, 0.5, this);

        var templateMsgBackground = Utils.ButtonSettingsControl(templateMsgBackground, 1115, 360, 'whiteOnePixel', this.GetStartPositionOfTemplateBox, null, null, this.GetEndPositionOfTemplateBox, "true", "true", 0.5, 0.5, 330, 900, this);
        templateMsgBackground.tint = 0x092a5c;

        crossButton = Utils.ButtonSettingsControl(crossButton, 1000, 50, 'crossButton', this.CrossDownAnimation, null, null, this.CrossButtonUpAnimation, "true", "true", 0.5, 0.5, 0.5, 0.5, this);

        chatGroup.add(chatPopupOverlay);
        chatGroup.add(typingBase);
        //chatGroup.add(typingInputText);
        chatGroup.add(sendButton);
        chatGroup.add(templateMsgBackground);
        chatGroup.add(crossButton);
        chatGroup.add(messageTypedValue);

        this.CreateAllTemplateMessage(templateJsonData);
        this.CreateMaskingToOwnMsgBox();
    },
    CreateOwnMessageBox: function(message,sender_id,avatar_id) {
        ownBoxGroup = game.add.group();
        ownBoxGroup.position.set(0, 0);
        ownMsgBox = game.add.sprite(740, 565, 'ownMsgBox');
        ownMsgBox.anchor.set(0.5, 0.5);
        ownMsgBox.scale.set(0.5, 0.5);
        if(sender_id == user_id){
            ownMsgBox.tint = "0xF39C12";
        }
        else{
            ownMsgBox.tint = "0xFFFFFF";
        }
        ownMsgBoxText = game.add.text(740, 565, message, { font: '25px Arial', fill: '#000000' });
        ownMsgBoxText.anchor.set(0.5, 0.5);

        var userPic = game.add.sprite(550, 565, avatar_id);
        userPic.anchor.set(0.5, 0.5);
        userPic.scale.set(0.3, 0.3);

        ownBoxGroup.add(ownMsgBox);
        ownBoxGroup.add(ownMsgBoxText);
        ownBoxGroup.add(userPic);

        heightOfOwnMsgBox = ownMsgBox.height;
        console.log("height....." + heightOfOwnMsgBox);
        return ownBoxGroup;
    },

    OwnTemplateMsgBoxUpdateScroll: function(message,sender_id,avatar_id) {
        console.log("OwnMsgBoxUpdateScroll With Parameter"+isChatBoxOpen);
        if(isChatBoxOpen){
            if (message.length > 0) {
                var createdGroup = this.CreateOwnMessageBox(message,sender_id,avatar_id);
                ownMsgTotalscrollY += (heightOfOwnMsgBox + 20);
                ownBoxGroup.y += ownMsgTotalscrollY;
    
                ownMsgBoxMaskingGroup.add(createdGroup);
                Debug.log("group lenght : " + ownMsgBoxMaskingGroup.length);
    
                amountToMove -= (heightOfOwnMsgBox + 20);
                game.add.tween(ownMsgBoxMaskingGroup.position).to({ x: 0, y: amountToMove }, 500, Phaser.Easing.Linear.Out, true);
                if(sender_id == user_id){
                    if (message.length > 0) {
                        messageTypedValue.resetText();
                        messageTypedValue.value = "";
                    }
                }
            }
        }
    },
    SendButtonClick: function(){
        Debug.log("Send Button Click...................");
        if(messageTypedValue.value.length >0){
            Client.NewMessageEmit(messageTypedValue.value);
        }
    },
    SendButtonDownAnimation: function(){
        game.add.tween(sendButton.scale).to({ x: 0.45, y: 0.45}, 100, Phaser.Easing.Linear.Out, true);
    },
    SendButtonUpAnimation: function(){
        game.add.tween(sendButton.scale).to({ x: 0.5, y: 0.5}, 100, Phaser.Easing.Linear.Out, true);
        setTimeout(() => {
            this.SendButtonClick();
        }, 100);
    },
    // OwnMsgBoxUpdateScroll: function() {

    //     console.log("OwnMsgBoxUpdateScroll WithOut Parameter");

    //     var createdGroup = this.CreateOwnMessageBox(messageTypedValue.value);
    //     ownMsgTotalscrollY += (heightOfOwnMsgBox + 20);
    //     // ownBoxGroup.y -= ownMsgTotalscrollY;
    //     ownBoxGroup.y += ownMsgTotalscrollY;

    //     ownMsgBoxMaskingGroup.add(createdGroup);
    //     Debug.log("group lenght : " + ownMsgBoxMaskingGroup.length);

    //     amountToMove -= (heightOfOwnMsgBox + 20);
    //     game.add.tween(ownMsgBoxMaskingGroup.position).to({ x: 0, y: amountToMove }, 500, Phaser.Easing.Linear.Out, true);
    //     // messageTypedValue.value = "";
    //     Debug.log("The message Typed Value Length........."+messageTypedValue.value.length);
    //     if (messageTypedValue.value.length > 0) {
    //         messageTypedValue.resetText();
    //         messageTypedValue.value = "";
    //     }
    // },

    CreateMaskingToOwnMsgBox: function() {
        ownMsgBoxMaskingGroup = game.add.group();
        ownMsgBoxMaskingGroup.position.set(0, 0);

        var mask = game.add.graphics(0, 0);
        mask.beginFill(0xffffff);
        mask.drawRect(120, 30, 820, 590);

        ownMsgBoxMaskingGroup.mask = mask;
    },
    GetStartPositionOfChatBox: function() {
        startPosOfChatBox = game.input.y;
        console.log("start Position: " + startPosOfChatBox);
    },

    GetEndPositionOfChatBox: function() {
        endPosChatBox = game.input.y;
        console.log("end Position: " + endPosChatBox);

        deltaYOfChatBox = endPosChatBox - startPosOfChatBox;
        console.log("Gap  Position: " + deltaYOfChatBox);

        if (deltaYOfChatBox > thresholdOfChatBox) {
            this.ChatMoveUp();
        } else if (deltaYOfChatBox < -thresholdOfChatBox) {
            this.ChatMoveDown();
        }
    },
    ChatMoveDown: function() {
        if (ownMsgBoxMaskingGroup.y > -109 * ownMsgBoxMaskingGroup.length) {
            amountToMove -= 110;
            game.add.tween(ownMsgBoxMaskingGroup.position).to({ x: 0, y: amountToMove }, 500, Phaser.Easing.Linear.Out, true);
        }
    },

    ChatMoveUp: function() {
        var offset = 0;
        if (ownMsgBoxMaskingGroup.length < 6) {
            offset = -109 * ownMsgBoxMaskingGroup.length;
        } else {
            offset = -109 * 5 + (ownMsgBoxMaskingGroup.length - 5);
        }

        if (ownMsgBoxMaskingGroup.y < offset) {
            console.log("Should move ");
            console.log("Masking Group Y..................." + ownMsgBoxMaskingGroup.y);
            amountToMove += 110;
            console.log("Amount To Move..................." + amountToMove);
            var tween = game.add.tween(ownMsgBoxMaskingGroup.position).to({ x: 0, y: amountToMove }, 500, Phaser.Easing.Linear.Out, true);

        }
    },

    CreateTemplateMessageBox: function(message, _playerPosY, index) {
        var templateMsgButton = Utils.ButtonSettingsControl(templateMsgButton, 1115, _playerPosY, 'whiteOnePixel', this.TemplateButtonClick, null, null, null, "true", "true", 0.5, 0.5, 320, 55, this);
        templateMsgButton.tint = 0x092a5c;
        templateMsgButton.name = index;
        var templateMsgText = Utils.TextSettingsControl(templateMsgText, 1115, _playerPosY, message, "true", "false", 0.5, 0.5, 0.0, 0.0, "Arial", "bold", "#ffffff", "center", "20px");

        templateBoxGroup.add(templateMsgButton);
        templateBoxGroup.add(templateMsgText);
    },
    CreateAllTemplateMessage: function(jsonData) {
        templateBoxGroup = game.add.group();
        templateBoxGroup.position.set(0, 10);
        var playerPosy = 90;
        for (var i = 0; i < jsonData.chatMessage.length; i++) {
            this.CreateTemplateMessageBox(jsonData.chatMessage[i], playerPosy, i);
            playerPosy += 49;
        }
    },
    TemplateButtonClick: function(sprite) {
        console.log("Key......" + sprite.key + "TemplateMsgButton........" + sprite.name + "Json Data.........." + this.ReturnJson(sprite.name));
        //this.OwnTemplateMsgBoxUpdateScroll(this.ReturnJson(sprite.name));
        Client.NewMessageEmit(this.ReturnJson(sprite.name));
    },
    ReturnJson: function(index) {
        for (var i = 0; i < templateJsonData.chatMessage.length; i++) {
            if (i == index) {
                return templateJsonData.chatMessage[index];
            }
        }
    },
    CloseButton: function(){
        this.HideChatBox();
    },
    CrossDownAnimation: function(){
        game.add.tween(crossButton.scale).to({ x: 0.45, y: 0.45}, 100, Phaser.Easing.Linear.Out, true);
    },
    CrossButtonUpAnimation: function(){
        game.add.tween(crossButton.scale).to({ x: 0.5, y: 0.5}, 100, Phaser.Easing.Linear.Out, true);
        setTimeout(() => {
            this.CloseButton();
        }, 100);
    },
    // CloseButtonHover: function(){
    //     crossButton.tint = hoverColourCode;
    // },
    // CloseButtonOut: function(){
    //     crossButton.tint = outColourCode;
    // },
    HideChatBox: function(){
        templateBoxGroup.visible = false;
        chatGroup.visible = false;
        ownMsgBoxMaskingGroup.visible = false;
        isChatBoxOpen = false;
        amountToMove = 0;
        ownMsgTotalscrollY = 0;
    },
    RenderChatBox: function(){
        if(isChatBoxOpen){
            game.world.bringToTop(chatGroup);
            game.world.bringToTop(ownMsgBoxMaskingGroup);
            game.world.bringToTop(templateBoxGroup);
        }
    }
}