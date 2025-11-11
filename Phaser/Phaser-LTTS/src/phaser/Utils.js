function ButtonScaleDownTween(_this, _refImage, _scale) {
    // eslint-disable-next-line no-unused-vars
    let ScaleTween = _this.add.tween({
        targets: [_refImage],
        scaleX: _scale * 0.9,
        scaleY: _scale * 0.9,
        ease: 'Linear',
        duration: 50,
    });
}

function ButtonScaleUpTween(_this, _refImage, _scale) {
    // eslint-disable-next-line no-unused-vars
    let ScaleTween = _this.add.tween({
        targets: [_refImage],
        scaleX: _scale * 1,
        scaleY: _scale * 1,
        ease: 'Linear',
        duration: 50,
    });
}


export {ButtonScaleDownTween, ButtonScaleUpTween};
