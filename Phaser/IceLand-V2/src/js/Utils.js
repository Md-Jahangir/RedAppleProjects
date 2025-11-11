import { Model } from "./Model.js";

// function SpriteSettingsControl(_this, posX, posY, imageName, anchorX = null, anchorY = null, scaleX = null, scaleY = null, isInputEnabled = false, OnInputDownEvent = null, OnInputUpEvent = null, OnInputHoverEvent = null, OnInputOutEvent = null) {
//     var tempImage = _this.add.image(posX, posY, imageName);
//     if (anchorX != null && anchorY != null) {
//         tempImage.setOrigin(anchorX, anchorY);
//     } else {
//         tempImage.setOrigin(0, 0);
//     }
//     if (scaleX != null && scaleY != null) {
//         tempImage.setScale(scaleX, scaleY);
//     }
//     if (isInputEnabled) {
//         tempImage.setInteractive({ useHandCursor: true });
//     }
//     if (OnInputDownEvent != null)
//         tempImage.on("pointerdown", OnInputDownEvent, _this);
//     if (OnInputHoverEvent != null)
//         tempImage.on("pointerover", OnInputHoverEvent);
//     if (OnInputOutEvent != null)
//         tempImage.on("pointerout", OnInputOutEvent);
//     if (OnInputUpEvent != null)
//         tempImage.on("pointerup", OnInputUpEvent, _this);
//     return tempImage;
// };

function GetRandomSymbols() {
    let res = [];
    let symbolsList = Model.GetSymbols();
    for (let i = 0; i < 3; i++) {
        let rndSymbol = Math.floor(Math.random() * symbolsList.length);
        res.push(symbolsList[rndSymbol]);
    }
    return res;
};

function ButtonScaleDownTween(_this, _refImage, _scale) {
    let ScaleTween = _this.add.tween({
        targets: [_refImage],
        scaleX: _scale * 0.9,
        scaleY: _scale * 0.9,
        ease: 'Linear',
        duration: 50,
    });
};

function ButtonScaleUpTween(_this, _refImage, _scale) {
    let ScaleTween = _this.add.tween({
        targets: [_refImage],
        scaleX: _scale * 1,
        scaleY: _scale * 1,
        ease: 'Linear',
        duration: 50,
    });
};

function GetRandomNumber(_min, _max) {
    let rnd = Math.floor(Math.random() * (_max - _min) + _min);
    return rnd;
};

export { GetRandomSymbols, ButtonScaleDownTween, ButtonScaleUpTween, GetRandomNumber };