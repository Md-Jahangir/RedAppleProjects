var _indicator;

function CBatsmanHint(oParentContainer) {

    var _bar;

    this._init = function(oParentContainer) {

        _bar = createBitmap(s_oSpriteLibrary.getSprite('bar'));
        _bar.x = 650;
        _bar.y = 655;
        oParentContainer.addChild(_bar);

        _indicator = createBitmap(s_oSpriteLibrary.getSprite('indicator'));
        _indicator.x = 655;
        _indicator.y = 924;
        oParentContainer.addChild(_indicator);
    };

    this.ShowIndicatorAnimation = function(duration) {
        // _indicator.x= 639;
        // _indicator.y= 924;
        _indicator.x = CANVAS_WIDTH / 2 + 295;
        _indicator.y = CANVAS_HEIGHT / 2 + 254;
        var indicatorAnim = createjs.Tween.get(_indicator).to({ x: 655, y: 670 }, duration, createjs.Ease.linear.out).call(function() {

        });
    };

    this._init(oParentContainer);

}