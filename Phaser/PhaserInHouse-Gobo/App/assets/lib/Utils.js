var Utils = {
    //All Button Control
    ButtonSettingsControl: function(buttonObj, posX, posY, imageName, OnInputDownEvent, OnInputHoverEvent, OnInputOutEvent, OnInputUpEvent, isSetAnchor, isSetScale, anchorX, anchorY, scaleX, scaleY, referenceClass) {
        buttonObj = game.add.sprite(posX, posY, imageName);
        if (isSetAnchor == "true") {
            buttonObj.anchor.setTo(anchorX, anchorY);
        }
        if (isSetScale == "true") {
           
            buttonObj.scale.setTo(scaleX, scaleY);
        }
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

    //ScaleManager of All
    ScaleManager: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
    },

    //FOR GENERATE THE NUMBER WITH 0 OR WITHOUT 0 FORMAT
    getZeroPaddedString: function(number) {
        var string;
        if (number < 10) {
            string = '0' + number;
        } else {
            string = '' + number;
        }

        return string;
    }, //END OF getZeroPaddedString FUNCTION

    //FOR GET THE RANDOM NUMBER
    getRandomNumber: function(min, max) {
        return parseInt(min + Math.random() * (max - min + 1));
    }, //END OF getRandomNumber FUNCTION


};