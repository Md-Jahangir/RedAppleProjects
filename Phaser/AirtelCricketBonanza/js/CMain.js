function CMain(oData) {
    var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    var _oData;

    var _oPreloader;
    var _oMenu;
    var _oGame;
    var _oTeamChoose;

    var _aTeamLoadedBatter = new Array();

    this.initContainer = function() {
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        createjs.Touch.enable(s_oStage);
        s_oStage.preventSelection = false;

        s_bMobile = jQuery.browser.mobile;
        if (s_bMobile === false) {
            s_oStage.enableMouseOver(20);
            $('body').on('contextmenu', '#canvas', function(e) {
                return false;
            });
        }

        s_iPrevTime = new Date().getTime();

        createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.framerate = 30;

        if (navigator.userAgent.match(/Windows Phone/i)) {
            DISABLE_SOUND_MOBILE = true;
        }

        s_oSpriteLibrary = new CSpriteLibrary();

        this.setLoadedArray();

        //ADD PRELOADER
        _oPreloader = new CPreloader();
    };

    this.preloaderReady = function() {
        this._loadImages();
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            this._initSounds();
        }


        _bUpdate = true;
    };

    this.soundLoaded = function(evt) {
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource / RESOURCE_TO_LOAD * 100);
        _oPreloader.refreshLoader(iPerc);

    };

    this._initSounds = function() {
        var aSoundsInfo = new Array();
        aSoundsInfo.push({ path: './sounds/', filename: 'buzzer', loop: false, volume: 1, ingamename: 'buzzer' });
        aSoundsInfo.push({ path: './sounds/', filename: 'countdown1', loop: false, volume: 1, ingamename: 'countdown1' });
        aSoundsInfo.push({ path: './sounds/', filename: 'countdown2', loop: false, volume: 1, ingamename: 'countdown2' });
        aSoundsInfo.push({ path: './sounds/', filename: 'drop_bounce_grass', loop: false, volume: 1, ingamename: 'drop_bounce_grass' });
        aSoundsInfo.push({ path: './sounds/', filename: 'hit_ball', loop: false, volume: 1, ingamename: 'hit_ball' });
        aSoundsInfo.push({ path: './sounds/', filename: 'crowd_cheering', loop: true, volume: 1, ingamename: 'crowd_cheering' });
        aSoundsInfo.push({ path: './sounds/', filename: 'applauses', loop: false, volume: 1, ingamename: 'applauses' });
        aSoundsInfo.push({ path: './sounds/', filename: 'crowd_ohhh', loop: false, volume: 1, ingamename: 'crowd_ohhh' });
        aSoundsInfo.push({ path: './sounds/', filename: 'click', loop: false, volume: 1, ingamename: 'click' });
        aSoundsInfo.push({ path: './sounds/', filename: 'soundtrack', loop: true, volume: 1, ingamename: 'soundtrack' });

        RESOURCE_TO_LOAD += aSoundsInfo.length;

        s_aSounds = new Array();
        for (var i = 0; i < aSoundsInfo.length; i++) {
            s_aSounds[aSoundsInfo[i].ingamename] = new Howl({
                src: [aSoundsInfo[i].path + aSoundsInfo[i].filename + '.mp3', aSoundsInfo[i].path + aSoundsInfo[i].filename + '.ogg'],
                autoplay: false,
                preload: true,
                loop: aSoundsInfo[i].loop,
                volume: aSoundsInfo[i].volume,
                onload: s_oMain.soundLoaded()
            });
        }

    };

    this._loadImages = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);

        //MENU
        s_oSpriteLibrary.addSprite("airtel", "./sprites/Menu/airtel.png");
        s_oSpriteLibrary.addSprite("home", "./sprites/Menu/home.png");
        s_oSpriteLibrary.addSprite("how_to_play", "./sprites/Menu/how_to_play.png");
        s_oSpriteLibrary.addSprite("teamselectionbg", "./sprites/Menu/teamselectionbg.png");
        s_oSpriteLibrary.addSprite("topScorer", "./sprites/Menu/topScorer.png");
        s_oSpriteLibrary.addSprite("faqs", "./sprites/Menu/faqs.png");
        s_oSpriteLibrary.addSprite("howToBg", "./sprites/Menu/howToBg.png");
        s_oSpriteLibrary.addSprite("howtoplayrectangle", "./sprites/Menu/howtoplayrectangle.png");
        s_oSpriteLibrary.addSprite("adRect", "./sprites/Menu/adRect.png");
        s_oSpriteLibrary.addSprite("indiaflag", "./sprites/Menu/indiaflag.png");
        s_oSpriteLibrary.addSprite("southafricalogo", "./sprites/Menu/southafricalogo.png");
        s_oSpriteLibrary.addSprite("gameScorerRunBg", "./sprites/Menu/gameScorerRunBg.png");
        s_oSpriteLibrary.addSprite("3star", "./sprites/Menu/3star.png");
        s_oSpriteLibrary.addSprite("scroll1", "./sprites/Menu/scroll1.png");
        s_oSpriteLibrary.addSprite("scroll2", "./sprites/Menu/scroll2.png");
        s_oSpriteLibrary.addSprite("scroll3", "./sprites/Menu/scroll3.png");
        s_oSpriteLibrary.addSprite("scroll4", "./sprites/Menu/scroll4.png");


        s_oSpriteLibrary.addSprite("play_button_base", "./sprites/play_base.png");

        //SHARE
        s_oSpriteLibrary.addSprite("share_popup", "./sprites/Share/Rounded Rectangle_02.png");
        s_oSpriteLibrary.addSprite("facebook_button", "./sprites/Share/fb.png");
        s_oSpriteLibrary.addSprite("whatsapp_button", "./sprites/Share/whtsapp.png");
        s_oSpriteLibrary.addSprite("share_popup_arrow", "./sprites/Share/arrow.png");
        s_oSpriteLibrary.addSprite("share_popup_cross", "./sprites/Share/cross.png");
        s_oSpriteLibrary.addSprite("alert_box", "./sprites/Share/alert_box.png");
        s_oSpriteLibrary.addSprite("back_to_game", "./sprites/Share/back_to_game.png");
        s_oSpriteLibrary.addSprite("back", "./sprites/Share/back.png");
        s_oSpriteLibrary.addSprite("score_panel", "./sprites/Share/score_panel.png");
        s_oSpriteLibrary.addSprite("bg_game", "./sprites/Share/new_bg.png");
        s_oSpriteLibrary.addSprite("arrow", "./sprites/Share/arrow_new.png");
        s_oSpriteLibrary.addSprite("next_button_base", "./sprites/Share/next_button.png");
        s_oSpriteLibrary.addSprite("wicket", "./sprites/Share/Wicket.png");
        s_oSpriteLibrary.addSprite("run_batsman", "./sprites/Share/batsman_run.png");

        s_oSpriteLibrary.addSprite("batsman_all", "./sprites/Share/Batsman_All_01.png");

        s_oSpriteLibrary.addSprite("preloader_anim", "./sprites/preloader_anim.png");


        s_oSpriteLibrary.addSprite("ball", "./sprites/ball.png");
        s_oSpriteLibrary.addSprite("bar", "./sprites/bar.png");
        s_oSpriteLibrary.addSprite("indicator", "./sprites/indicator.png");


        s_oSpriteLibrary.addSprite("1", "./sprites/1.png");
        s_oSpriteLibrary.addSprite("2", "./sprites/2.png");
        s_oSpriteLibrary.addSprite("3", "./sprites/3.png");

        s_oSpriteLibrary.addSprite("ball_target", "./sprites/ball_target.png");
        s_oSpriteLibrary.addSprite("pole_0", "./sprites/pole_0.png");
        s_oSpriteLibrary.addSprite("pole_1", "./sprites/pole_1.png");

        s_oSpriteLibrary.addSprite("but_exit", "./sprites/quit_base.png");
        s_oSpriteLibrary.addSprite("but_pause", "./sprites/pause_base.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/sound_btn.png");

        s_oSpriteLibrary.addSprite("but_yes", "./sprites/Share/yes.png");
        s_oSpriteLibrary.addSprite("but_no", "./sprites/Share/no.png");
        s_oSpriteLibrary.addSprite("one_pixel", "./sprites/one_pixel_white.png");


        //Non strike batsman
        s_oSpriteLibrary.addSprite("nonStrike", "./sprites/nonStrike.png");

        //Bowler spritesheet
        s_oSpriteLibrary.addSprite("bowler", "./sprites/new.png");

        //Umpire Spritesheets
        s_oSpriteLibrary.addSprite("umpire_all", "./sprites/umpire/umpire_all.png");

        //Fielder Spritesheets
        s_oSpriteLibrary.addSprite("fielder_all", "./sprites/fielder/fielder_all.png");
        //Bonanza Logo

        s_oSpriteLibrary.addSprite("bonanza_logo", "./sprites/bonanza_logo.png");
        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };

    this._onImagesLoaded = function() {
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource / RESOURCE_TO_LOAD * 100);
        _oPreloader.refreshLoader(iPerc);

    };

    this._onTeamsLoaded = function() {
        _iCurResource++;
        if (_iCurResource === RESOURCE_TO_LOAD) {
            this.gotoGame(s_iPlayerTeam, s_iOpponentTeam);
        }
    };

    this._onAllImagesLoaded = function() {

    };

    this.setLoadedArray = function() {
        for (var i = 0; i < TOT_TEAMS; i++) {
            _aTeamLoadedBatter[i] = false;
        }
    };

    this._onRemovePreloader = function() {
        _oPreloader.unload();

        playSound("soundtrack", 1, true);
        setTimeout(() => {
            this.gotoMenu();
        }, 1000);
    };

    this.gotoMenu = function() {
        _oMenu = new CMenu();
        _iState = STATE_MENU;
    };

    this.gotoGame = function(iPlayerTeam, iOpponentTeam) {
        _aTeamLoadedBatter[s_iOpponentTeam] = true;
        _aTeamLoadedBatter[s_iPlayerTeam] = true;
        _oGame = new CGame(_oData, iPlayerTeam, iOpponentTeam);
        _iState = STATE_GAME;
    };

    this.gotoTeamChoose = function() {
        _oTeamChoose = new CTeamChoose();
        _iState = STATE_MENU;
    };

    this.stopUpdate = function() {
        _bUpdate = false;
        createjs.Ticker.paused = true;
        $("#block_game").css("display", "block");

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            Howler.mute(true);
        }

    };

    this.startUpdate = function() {
        s_iPrevTime = new Date().getTime();
        _bUpdate = true;
        createjs.Ticker.paused = false;
        $("#block_game").css("display", "none");

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            if (s_bAudioActive) {
                Howler.mute(false);
            }
        }

    };

    this._update = function(event) {
        if (_bUpdate === false) {
            return;
        }
        var iCurTime = new Date().getTime();
        s_iTimeElaps = iCurTime - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = iCurTime;

        if (s_iCntTime >= 1000) {
            s_iCurFps = s_iCntFps;
            s_iCntTime -= 1000;
            s_iCntFps = 0;
        }

        if (_iState === STATE_GAME) {
            _oGame.update();
        }

        s_oStage.update(event);
    };

    s_oMain = this;

    _oData = oData;
    ENABLE_FULLSCREEN = oData.fullscreen;
    ENABLE_CHECK_ORIENTATION = oData.check_orientation;

    this.initContainer();
}
var s_bMobile;
var s_bAudioActive = true;
var s_bFullscreen = false;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;

var s_iPlayerTeam;
var s_iOpponentTeam;
var _iActivePlayerTeam;
var _iActiveOpponentTeam;

var s_iMode;
var s_iAdsLevel = 1;
var s_bBounce = true;

var s_oDrawLayer;
var s_oStage;
var s_oMain;
var s_oStadium;
var s_oBall;
var s_oSpriteLibrary;
var s_oSoundTrack = null;
var s_oBgSound;
var s_oCanvas;
var s_iCanvasResizeHeight;
var s_iCanvasResizeWidth;
var s_iCanvasOffsetHeight;
var s_iCanvasOffsetWidth;
var s_aSounds;

var s_oSharerLibrary;