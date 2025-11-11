var Utils = {
    //All Button Control
    ButtonSettingsControl: function(buttonObj, posX, posY, imageName, OnInputDownEvent, OnInputHoverEvent, OnInputOutEvent, OnInputUpEvent, isSetAnchor, isSetScale, anchorX, anchorY, scaleX, scaleY, referenceClass,buttonName = null) {
        buttonObj = game.add.sprite(posX, posY, imageName);
        if (isSetAnchor == "true") {
            buttonObj.anchor.setTo(anchorX, anchorY);
        }
        if (isSetScale == "true") {
            buttonObj.scale.setTo(scaleX, scaleY);
        }
        buttonObj.index = buttonName;
        buttonObj.inputEnabled = true;
        if (OnInputDownEvent != null)
            buttonObj.events.onInputDown.add(OnInputDownEvent, referenceClass);
        if (OnInputHoverEvent != null)
            buttonObj.events.onInputOver.add(OnInputHoverEvent, referenceClass);
        if (OnInputOutEvent != null)
            buttonObj.events.onInputOut.add(OnInputOutEvent, referenceClass);
        if (OnInputUpEvent != null)
            buttonObj.events.onInputUp.add(OnInputUpEvent, referenceClass);
        return buttonObj;
    },
    //All Sprite Control
    SpriteSettingsControl: function(spriteObj, posX, posY, imageName, isSetAnchor, isSetScale, anchorX, anchorY, scaleX, scaleY, isInputEnable) {
        spriteObj = game.add.sprite(posX, posY, imageName);
        if (isSetAnchor == "true") {
            spriteObj.anchor.setTo(anchorX, anchorY);
        }
        if (isSetScale == "true") {
            spriteObj.scale.setTo(scaleX, scaleY);
        }
        if (isInputEnable == "true")
            spriteObj.inputEnabled = true;
        return spriteObj;
    },
    //All Text Control
    TextSettingsControl: function(textObj, posX, posY, textName, isSetAnchor, isSetScale, anchorX, anchorY, scaleX, scaleY, fontName, fontStyle, fontColor, fontAlign, fontSize) {
        textObj = game.add.text(posX, posY, textName, { "font": fontStyle + " " + fontSize + " " + fontName, "fill": fontColor, "align": fontAlign });
        if (isSetAnchor == "true")
            textObj.anchor.setTo(anchorX, anchorY);
        if (isSetScale == "true")
            textObj.scale.setTo(scaleX, scaleY);
        return textObj;
    },
    //ScaleManager of All
    ScaleManager: function() {
        console.log("Insdide utils scale manager");
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
    },
};