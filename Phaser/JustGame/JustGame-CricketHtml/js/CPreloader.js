function CPreloader() {
    var _iMaskWidth;
    var _iMaskHeight;
    var _oLoadingText;
    var _oProgressBar;
    var _oMaskPreloader;
    var _oFade;
    // var _oIcon;
    // var _oIconMask;
    var _oContainer;
    var dataForSha;
    var dataTobeMatched;
    var afterShaData;

    var preloaderBg;
    var preloaderLogo;
    var progressBase;
    var progressBallArray = [];


    this._init = function() {
        //API calling--------------------------------------------------------------------
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);

        s_oSpriteLibrary.addSprite("menu_bg", "./sprites/Menu/menu_bg.png");
        s_oSpriteLibrary.addSprite("cricket_logo", "./sprites/Menu/cricket_logo.png");
        s_oSpriteLibrary.addSprite("progress_base", "./sprites/preloader/progress_base.png");
        s_oSpriteLibrary.addSprite("progress_base_ball_blank", "./sprites/preloader/progress_base_ball_blank.png");
        s_oSpriteLibrary.addSprite("progress_ball", "./sprites/preloader/progress_ball.png");

        // s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar_black.png");
        // s_oSpriteLibrary.addSprite("preloader_Image", "./sprites/preloader_Image.png");
        s_oSpriteLibrary.loadSprites();

        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);

        token = window.location.href;
        var link = token;
        secretKey = token;
        var start = link.indexOf("token=");
        var end = link.indexOf("&secret");
        token = link.slice(start + 6, end);
        // API.GetRewardStatus(token);
        // API.GetSavePlayerDetails(token);
        //----------------------------------------
    };

    this.unload = function() {
        _oContainer.removeAllChildren();
    };

    this._onImagesLoaded = function() {

    };

    this._onAllImagesLoaded = function() {

        this.attachSprites();

        s_oMain.preloaderReady();

    };

    this.attachSprites = function() {

        // var oBg = new createjs.Shape();
        // oBg.graphics.beginFill("#F8ECF0").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        // _oContainer.addChild(oBg);

        // var oSprite = s_oSpriteLibrary.getSprite('preloader_Image');
        // _oIcon = createBitmap(oSprite);
        // _oIcon.regX = oSprite.width * 0.5;
        // _oIcon.regY = oSprite.height * 0.5;
        // _oIcon.x = CANVAS_WIDTH / 2;
        // _oIcon.y = CANVAS_HEIGHT / 2 - 120;
        // _oIcon.scaleX = 2;
        // _oIcon.scaleY = 2;
        // _oContainer.addChild(_oIcon);

        var oSprite = s_oSpriteLibrary.getSprite('menu_bg');
        preloaderBg = createBitmap(oSprite);
        preloaderBg.x = 0;
        preloaderBg.y = 0;
        _oContainer.addChild(preloaderBg);

        var oSprite = s_oSpriteLibrary.getSprite('cricket_logo');
        preloaderLogo = createBitmap(oSprite);
        preloaderLogo.x = CANVAS_WIDTH / 2;
        preloaderLogo.y = CANVAS_HEIGHT / 4.2
        preloaderLogo.regX = oSprite.width * 0.5;
        preloaderLogo.regY = oSprite.height * 0.5;
        _oContainer.addChild(preloaderLogo);

        var oSprite = s_oSpriteLibrary.getSprite('progress_base');
        progressBase = createBitmap(oSprite);
        progressBase.x = CANVAS_WIDTH / 2;
        progressBase.y = CANVAS_HEIGHT / 1.2;
        progressBase.regX = oSprite.width * 0.5;
        progressBase.regY = oSprite.height * 0.5;
        _oContainer.addChild(progressBase);

        var oSprite = s_oSpriteLibrary.getSprite('progress_base_ball_blank');
        for (var i = 0; i < 6; i++) {
            var blankBall = createBitmap(oSprite);
            blankBall.x = CANVAS_WIDTH / 3.45 + (i * 60);
            blankBall.y = CANVAS_HEIGHT / 1.197;
            blankBall.regX = oSprite.width * 0.5;
            blankBall.regY = oSprite.height * 0.5;
            _oContainer.addChild(blankBall);
        }

        var oSprite = s_oSpriteLibrary.getSprite('progress_ball');
        for (var i = 0; i < 6; i++) {
            var progressBall = createBitmap(oSprite);
            progressBall.x = CANVAS_WIDTH / 3.45 + (i * 60);
            progressBall.y = CANVAS_HEIGHT / 1.197;
            progressBall.regX = oSprite.width * 0.5;
            progressBall.regY = oSprite.height * 0.5;
            _oContainer.addChild(progressBall);
            progressBallArray.push(progressBall);
            progressBall.visible = false;
        }


        // _oIconMask = new createjs.Shape();
        // _oIconMask.graphics.beginFill("rgba(0,0,0,0.01)").drawRoundRect(_oIcon.x - 100, _oIcon.y - 100, 200, 200, 10);
        // _oContainer.addChild(_oIconMask);

        // _oIcon.mask = _oIconMask;

        // var oSprite = s_oSpriteLibrary.getSprite('progress_bar');
        // _oProgressBar = createBitmap(oSprite);
        // _oProgressBar.x = CANVAS_WIDTH / 2 - (oSprite.width / 2);
        // _oProgressBar.y = CANVAS_HEIGHT / 2 + 50;
        // _oContainer.addChild(_oProgressBar);

        // _iMaskWidth = oSprite.width;
        // _iMaskHeight = oSprite.height;
        // _oMaskPreloader = new createjs.Shape();
        // _oMaskPreloader.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(_oProgressBar.x, _oProgressBar.y, 1, _iMaskHeight);

        // _oContainer.addChild(_oMaskPreloader);

        // _oProgressBar.mask = _oMaskPreloader;

        // _oLoadingText = new createjs.Text("", "30px " + TondoBD, "#000");
        // _oLoadingText.x = CANVAS_WIDTH / 2;
        // _oLoadingText.y = CANVAS_HEIGHT / 2 + 100;
        // _oLoadingText.textBaseline = "alphabetic";
        // _oLoadingText.textAlign = "center";
        // _oContainer.addChild(_oLoadingText);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oContainer.addChild(_oFade);

        //FOR FADDING THE SCREEN
        createjs.Tween.get(_oFade).to({ alpha: 0 }, 500).call(function() {
            createjs.Tween.removeTweens(_oFade);
            _oContainer.removeChild(_oFade);
        });


    };

    this._onButStartRelease = function() {
        s_oMain._onRemovePreloader();
    };


    this.refreshLoader = function(iPerc) {
        // _oLoadingText.text = iPerc + "%";
        // if (Math.floor(iPerc) % 16 == 0) {
        // var itr = Math.floor(iPerc) / 16;
        if (iPerc % 16 == 0) {
            var itr = iPerc / 16;
            for (var i = 0; i <= itr; i++) {
                progressBallArray[i].visible = true;
            }
        }
        if (iPerc === 100) {
            s_oMain._onRemovePreloader();
            // _oLoadingText.visible = false;
            // _oProgressBar.visible = false;



        };
        // _oMaskPreloader.graphics.clear();
        // var iNewMaskWidth = Math.floor((iPerc * _iMaskWidth) / 100);
        // _oMaskPreloader.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(_oProgressBar.x, _oProgressBar.y, iNewMaskWidth, _iMaskHeight);
    };


    this._init();
}