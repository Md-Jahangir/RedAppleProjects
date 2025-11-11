var screenWidth = 720
var screenHeight = 1280

//Splash
var splashBg;

//NEW MENU
var gameMenuBg;
var gameTitle;
var menuTable;
var playBttn;
var bottomLogo;
var menuKnife;
var gun;
var gunSmoke;
var tomato;
var menuBasket;

//Menu
var gameMenuGroup;
var settingBttn;
var shopBttn;
var leaderboardBttn;
var parentBttn;

//LevelSelection Page
var bgScroll;
var overlay;
var pageTitle;
var backBttn;
var levelActive;
var levelInactive;
var levelLock;
var levelSelectionBase;
var topBar;
var starActive;
var starInactive;
var topTxt;
var levelLock = [];
var levelStar = [
    [],
    []
];
var levelText = [];
var levelCounter;
var curretLevelCounter = 0;
var levelNumber = 1;

//WinPopUp
var winPopupBg;
var winGlow;
var lightParticle;
var menuBttn;
var nextBttn;
var winReplayBttn;
var starActive;
var starInactive;
var winPopupBase;
var winText;

//LoosePopup
var oopsTxt;
var tryAgainTxt;
var looseReplayBttn;

//Level Selection
var levelCount = 10;
var levelData;

//Gameplay
var targets = []; // ARRAY
var targetVelocities = []; // ARRAY
var targetCount = 3;
var targetsDepleted = 0;
var currentLevelNumber = 1;
var currentlyAiming;
var isProjectileLaunched;
var isCannonTouched;
var gameGravity = 200;

var bottomTable;
var gameplayBg;
var grillTop;
var timeBase;
var topBar;
var turretStand;

var pauseBttn;
// var powerup;
// var time;
// var numberCountOverlay;
// var powerupOverlay;

// var bomb;
// var time;
// var numberOverlay;
// var powerUpOverlay;

var bombPowerupBttn;
var timePowerupBttn;

var topBarGroup;

//Cannon
var touchArea;
var cannonPositionX = screenWidth / 2;
var cannonPositionY = screenHeight - 135;
var cannonLength = 190;

//Marker
var pathMarkers;
var pathMarkerGap = 50;
var pathMarkerCount = 20;
var markerTimer = 0;
var showMarkerPath = false;

//Projectile
var projectile;
var angleRange = 70;
var projectileSpeed = 2000;
var angleDirectionX;
var angleDirectionY;
var cannonLength;
var cannonBodyBack;

var isPaytm = false;
var isJioSDK = false;
var isWeb = true;

//ParentPopup
var parentPopupBg;
var answerBase;
var parentPopupBase;
var parentJson;

//SettingsPopup
var settingsPopupBg;
var settingsPopupBase;
var soundOnOffBttn;
var musicOnOffBttn;

//CreditsPopup
var creditPopupGroup;
var creditBg;
var creditGameTitle;
var creditBackButton;
var creditRedappleLogo;
var creditKinsaneLogo;
var creditTermOfUse;
var creditPrivacyPolicy;
var creditGameContent;

//ParentsPopup
var parentPopupGroup;
var firstQuestionTxt;
var secondQuestionTxt;
var rightAnswer;
var answerText = [];
var answerBaseArray = [];

var gameplayType;