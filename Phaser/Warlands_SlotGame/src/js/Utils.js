import { Model } from "./Model.js";

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
function ShuffleArr(arra1) {
    var ctr = arra1.length, temp, index;
    // console.log(arra1)
    // While there are elements in the array
    while (ctr > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
        ctr--;
        // And swap the last element with it
        temp = arra1[ctr];

        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
};


export { GetRandomSymbols, ButtonScaleDownTween, ButtonScaleUpTween, GetRandomNumber, ShuffleArr };