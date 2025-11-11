function CPreloader() {
    var _iMaskWidth;
    var _iMaskHeight;
    var _oLoadingText;
    var _oProgressBar;
    var _oProgressBase;
    var _oMaskPreloader;
    var _oFade;
    var _oIcon;
    var _oIconMask;
    var _oContainer;
    var _oBg;
    var _loadArray = [];

    this._init = function () {
        // s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        // s_oSpriteLibrary.addSprite("bg_splash", "./sprites/bg_splash.png");

        // s_oSpriteLibrary.addSprite("progress_glow", "./sprites/progress_glow.png");
        // s_oSpriteLibrary.addSprite("progress_base", "./sprites/progress_base.png");
        // s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");

        // s_oSpriteLibrary.loadSprites();

        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);


        const getOverlayBg = document.getElementById("loading_overlay");
        const getLogo = document.getElementById("brand_logo");
        const getProgressbase = document.getElementById("loading_base");
        const getProgressBar = document.getElementById("loading_bar");
        _loadArray.push(getOverlayBg, getLogo, getProgressbase, getProgressBar);
        for (let index = 0; index < _loadArray.length; index++) {
            const element = _loadArray[index];
            if (element.complete) {
                this.loadHTMLImage(element);
            } else {
                element.onload = () => this.loadHTMLImage(element);
            }
            if (index == _loadArray.length - 1) {
                this.loadingText();
            }
        }



    };
    this.loadHTMLImage = function (element) {
        if (element.id) {
            const textureKey = element.id;

            // Attach sprites based on the element ID
            switch (textureKey) {
                case "loading_overlay":
                    _oBg = createBitmap(element);
                    _oContainer.addChild(_oBg);
                    break;

                case "brand_logo":
                    _oIcon = createBitmap(element);
                    _oIcon.x = CANVAS_WIDTH / 2 - (element.width / 2);
                    _oIcon.y = CANVAS_HEIGHT / 2 - 300;
                    _oContainer.addChild(_oIcon);
                    break;

                case "loading_base":
                    _oProgressBase = createBitmap(element);
                    _oProgressBase.x = CANVAS_WIDTH / 2 - (element.width / 2);
                    _oProgressBase.y = CANVAS_HEIGHT / 2 + 0;
                    _oContainer.addChild(_oProgressBase);
                    break;

                case "loading_bar":
                    _oProgressBar = createBitmap(element);
                    _oProgressBar.x = _oProgressBase.x + 5;
                    _oProgressBar.y = _oProgressBase.y + 3;
                    _oContainer.addChild(_oProgressBar);

                    _iMaskWidth = element.width;
                    _iMaskHeight = element.height;
                    _oMaskPreloader = new createjs.Shape();
                    _oMaskPreloader.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(_oProgressBar.x, _oProgressBar.y, 1, _iMaskHeight);

                    _oContainer.addChild(_oMaskPreloader);
                    _oProgressBar.mask = _oMaskPreloader;
                    break;
                default:
                    console.warn("Unhandled element ID:", textureKey);
            }
        } else {
            console.warn("Element does not have an ID:", element);
        }
    };
    this.loadingText = function () {
        console.log(' loading ');

        _oLoadingText = new createjs.Text("", "28px " + FONT_GEORGIA, "#ffffff");
        // _oLoadingText.x = CANVAS_WIDTH / 2;
        // _oLoadingText.y = CANVAS_HEIGHT / 2 + 125;
        _oLoadingText.x = (CANVAS_WIDTH / 2);
        _oLoadingText.y = _oProgressBase.y - 20;

        _oLoadingText.textBaseline = "alphabetic";
        _oLoadingText.textAlign = "center";
        _oContainer.addChild(_oLoadingText);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oContainer.addChild(_oFade);

        createjs.Tween.get(_oFade).to({ alpha: 0 }, 500).call(function () {
            createjs.Tween.removeTweens(_oFade);
            _oContainer.removeChild(_oFade);
        });
        s_oMain.preloaderReady();
    }

    this.unload = function () {
        _oContainer.removeAllChildren();
    };

    this._onImagesLoaded = function () {

    };

    this._onAllImagesLoaded = function () {
        this.attachSprites();

        s_oMain.preloaderReady();
    };

    this.attachSprites = function () {
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('loading_overlay'));
        _oContainer.addChild(_oBg);

        //Progress glow
        var oSprite = s_oSpriteLibrary.getSprite('brand_logo');
        _oProgressGlow = createBitmap(oSprite);
        _oProgressGlow.x = CANVAS_WIDTH / 2 - (oSprite.width / 2);
        _oProgressGlow.y = CANVAS_HEIGHT / 2 - 300;
        _oContainer.addChild(_oProgressGlow);

        //Progress base
        var oSprite = s_oSpriteLibrary.getSprite('loading_base');
        _oProgressBase = createBitmap(oSprite);
        _oProgressBase.x = CANVAS_WIDTH / 2 - (oSprite.width / 2);
        _oProgressBase.y = CANVAS_HEIGHT / 2 + 350;
        _oContainer.addChild(_oProgressBase);

        //Progress bar
        var oSprite = s_oSpriteLibrary.getSprite('loading_bar');
        _oProgressBar = createBitmap(oSprite);
        // _oProgressBar.x = CANVAS_WIDTH / 2 - (oSprite.width / 2);
        // _oProgressBar.y = CANVAS_HEIGHT / 2 + 360;
        _oProgressBar.x = _oProgressBase.x + 5;
        _oProgressBar.y = _oProgressBase.y + 3;

        _oContainer.addChild(_oProgressBar);

        _iMaskWidth = oSprite.width;
        _iMaskHeight = oSprite.height;
        _oMaskPreloader = new createjs.Shape();
        _oMaskPreloader.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(_oProgressBar.x, _oProgressBar.y, 1, _iMaskHeight);

        _oContainer.addChild(_oMaskPreloader);

        _oProgressBar.mask = _oMaskPreloader;

        _oLoadingText = new createjs.Text("", "28px " + FONT_GEORGIA, "#fffc05");
        // _oLoadingText.x = CANVAS_WIDTH / 2;
        // _oLoadingText.y = CANVAS_HEIGHT / 2 + 125;
        _oLoadingText.x = _oProgressBase.x + (oSprite.width / 2);
        _oLoadingText.y = _oProgressBase.y - 40;

        _oLoadingText.textBaseline = "alphabetic";
        _oLoadingText.textAlign = "center";
        _oContainer.addChild(_oLoadingText);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oContainer.addChild(_oFade);

        createjs.Tween.get(_oFade).to({ alpha: 0 }, 500).call(function () {
            createjs.Tween.removeTweens(_oFade);
            _oContainer.removeChild(_oFade);
        });
    };

    this.refreshLoader = function (iPerc) {
        _oLoadingText.text = "LOADING..." + iPerc + "%";

        if (iPerc === 100) {
            s_oMain._onRemovePreloader();
            // _oLoadingText.visible = false;
            _oProgressBar.visible = false;
            _oProgressBase.visible = false;
            // _oProgressGlow.visible = false;
        };

        _oMaskPreloader.graphics.clear();
        var iNewMaskWidth = Math.floor((iPerc * _iMaskWidth) / 100);
        _oMaskPreloader.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(_oProgressBar.x, _oProgressBar.y, iNewMaskWidth, _iMaskHeight);
    };

    this._init();
}