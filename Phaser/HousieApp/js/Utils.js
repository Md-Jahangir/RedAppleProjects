var TermAndCondition = "https://www.w3schools.com";
var PrivacyPolicy = "https://www.w3schools.com";
var HelpUsAndContact = "https://www.w3schools.com";
var HelpUsAndContact = "https://www.w3schools.com";
var Utils = {
    //ScaleManager of All
    ScaleManager: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
    },

    SpriteSettingsControl: function(_spriteObj, _posX, _posY, _imageName, _isSetAnchor, _isSetScale, _anchorX, _anchorY, _scaleX, _scaleY, _isInputEnable) {
        _spriteObj = game.add.sprite(_posX, _posY, _imageName);
        if (_isSetAnchor == "true") {
            _spriteObj.anchor.setTo(_anchorX, _anchorY);
        } else {}
        if (_isSetScale == "true") {
            _spriteObj.scale.setTo(_scaleX, _scaleY);
        } else {}
        if (_isInputEnable == "true") {
            _spriteObj.inputEnabled = true;
        } else {}
        return _spriteObj;
    },

    ButtonSettingsControl: function(_buttonObj, _posX, _posY, _imageName, _OnInputDownEvent, _OnInputHoverEvent, _OnInputOutEvent, _OnInputUpEvent, _isSetAnchor, _isSetScale, _anchorX, _anchorY, _scaleX, _scaleY, _referenceClass) {
        _buttonObj = game.add.sprite(_posX, _posY, _imageName);
        if (_isSetAnchor == "true") {
            _buttonObj.anchor.setTo(_anchorX, _anchorY);
        } else {}
        if (_isSetScale == "true") {
            _buttonObj.scale.setTo(_scaleX, _scaleY);
        } else {}
        _buttonObj.inputEnabled = true;
        _buttonObj.input.useHandCursor = true;
        if (_OnInputDownEvent != null) {
            _buttonObj.events.onInputDown.add(_OnInputDownEvent, _referenceClass);
        } else {}
        if (_OnInputHoverEvent != null) {
            _buttonObj.events.onInputOver.add(_OnInputHoverEvent, _referenceClass);
        } else {}
        if (_OnInputOutEvent != null) {
            _buttonObj.events.onInputOut.add(_OnInputOutEvent, _referenceClass);
        } else {}
        if (_OnInputUpEvent != null) {
            _buttonObj.events.onInputUp.add(_OnInputUpEvent, _referenceClass);
        } else {}
        return _buttonObj;
    },

    ButtonScaleAnimation: function(_buttonName, _scaleMultiplier, _overlay) {
        if (_scaleMultiplier) {
            game.add.tween(_buttonName.scale).to({ x: _scaleMultiplier, y: _scaleMultiplier }, 200, Phaser.Easing.Linear.None, true).onComplete.add(function() {
                game.add.tween(_buttonName.scale).to({ x: _scaleMultiplier + 0.02, y: _scaleMultiplier + 0.02 }, 200, Phaser.Easing.Linear.None, true).onComplete.add(function() {
                    _overlay.visible = false;
                });
            });
        }
    },

    CreateHeadingText: function(_textToPrint) {
        var headingTextStyle = { font: '54px Lato-Heavy', fontStyle: 'normal', fill: '#fff001', align: 'center' };
        var headingText = game.add.text(game.world.centerX, game.world.centerY - Math.round(game.height / 2.5), _textToPrint, headingTextStyle);
        headingText.anchor.setTo(0.5);
        headingText.setShadow(0, 2, '#e07e00', 0);
    },

    TransitToPrivacyPolicy: function()
    {
        window.open(PrivacyPolicy);
    },
    TransitToTermsAndCondition: function()
    {
        window.open(TermAndCondition);
    }

};