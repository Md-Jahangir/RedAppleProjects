//Common
var gamePlayType;  //Gameplay Private Or Normal store in that variable
var privateTableType; //Private Table ("Classic","Muflis","Joker") store in that variable
var numberofPlayer; //Number of Player in the Room
var currentBetAmount; //Current Bet Amount of the Room
var gameType; //Game is ("Classic","Muflis","Joker")
var userIndex = -1;
var playerId = 19;
var isPlayerTimer = true;
var isPlayerTimerCreate = true;
var waitingTimeInterval = 30000;
var hoverColourCode = "0x98909a";
var outColourCode = "0xffffff";
var oppoentWaitingPanelTime = 0;
var isCardTopShown = false;
var isSeeButtonRender = false;
var isSeeCardTopShown = false;
var isGiftIconTopShown = false;
var isDealerIconTopShow = false;

//Menu Page 
var _Classics_card;
var _Joker_Card;
var _Muflis_Card;
var _Private_Table_Card;
var _Private_Table_Button;
var _Settings_Button;
var _poker_chip_text_showcase;
var _poker_chip;
var _picture_text_showcase;
var _profile_picture;
var _classic_bet_amount;
var _joker_bet_amount;
var _muflis_bet_amount;
var _private_bet_amount;
var _inhand_money_text;
var _user_name_text;
var _BG;
var isLoginAPI = false;
var bubbleArray = [];

//Private Table
var _tick_mark_for_classic;
var _tick_mark_for_muflis;
var _tick_mark_for_joker;
var enter_code_value;
var _create_table_button;
var _classics_card;
var _muflis_Card;
var _joker_Card;
var _join_table_button;
var _back_button;
var _classic_check_circle;
var _muflis_check_circle;
var _joker_check_circle;
var _chooseRoomText;
var _classic_amount;
var _classic_play_text;
var _muflis_amount;
var _muflis_play_text;
var _joker_amount;
var _joker_play_text;
var _create_table;
var _enter_code;
var _join_table;

//Settings Pop up
var settingsGroup;
var settingsPopupOverlay;
var settingsPopupBase;
var settingsHeading;
var exitNameGroup;
var chanageNameGroup;
var chanagePictureGroup;
var gameRulesGroup;
var soundOnOffGroup;
var signOutGroup;
var buttonIcon;
var soundOnOffButtonIcon;
var soundOnOffButtonText;
var buttonText;
var changeNameGroupbuttonBase;
var changePictureGroupbuttonBase;
var soundOnOffGroupbuttonBase;
var rulesGroupbuttonBase;
var exitGroupbuttonBase;
var blackOnePixel;
var sounOnOff = 0;
var settingsPopupsettingsPopupCounter = 0;

//Database
var user_id;
var user_amount;
var image_url;
var user_name;
var session_id;
var classic_amount;
var classic_pot_amount;
var muflis_amount;
var muflis_pot_amount;
var joker_amount;
var joker_pot_amount;
var user_image;
var room_name;
var room_id;
var round_id;
var room_player_id;
var chaal_limit;
var max_blind;
var pot_limit;
var dealer_id;
var boot_amount;
var room_code;
var game_id;
var private_pot_limit;
//Main
var parseUserId;

//Classic
var _classic_heading;

//Muflis
var _muflis_heading;

//Joker
var _joker_heading;

//GlobalPopUp
var commonPopupGroup;
var commonPopupBase;
var commonPopupText;
var commonPopUpOkButton;
var popUpOverlay;

//ChangePicturePopUp
var avatarPopupBg;
var avatarPopupBase;
var avatarsArray = [];
var tickMarkArray = [];
var numberOfAvatar = 15;
var speed = 0;
var upButton;
var downButton;
var rightButton;
var leftButton;
var scrollGroup;
var scrollbg;
var changePictureGroup;
var changePicturePopUpScrollCounter = 6;
var tick_mark;
var startPos = 0;
var endPos = 0;
var deltaX = 0;
var totalAmount = 0;
var threshold = 40;
var scrollCounter = 0;
var changePicturePopUpImageName;

//Utils
var _back_button;
var _text_showcase;
var _chat_button;
var _info_button;
var _pack_button;
var _show_button;
var _poker_chip;
var _see_button;
var _table;
var _girl_dealer;
var _pot_amount_text_showcase;
var _pot_amount_text_showcase;
var _pot_amount_icon;
var _button_ui_base;
var _online_user;
var _online_user_inhand_money_text_showcase;
var _online_user_inhand_money_icon;
var _side_show_button;
var _blind_button;
var _chaal_button;
var _plus_button;
var _minus_button;
var _remote_user;
var _remote_user_inhand_money_text_showcase;
var _remote_user_inhand_money_icon;
var _see_button;
var _see_button_text;
var _room_code_text;
var _room_code;
var _current_bet_amount_text;
var _pot_amount;

var playerPosX = [];
var playerPosY = [];

var cardPosX = [];
var cardPosY = [];

var dealerIconPosX = [];
var dealerIconPosY = [];

var giftIconPosx = [];
var giftIconPosY = [];

var namePosX = [];
var namePosY = [];

var timerImagePosX = [];
var timerImagePosY = [];

var decisionImagePosX = [];
var decisionImagePosY = [];
var decisionTextPosX = [];
var decisionTextPosY = [];

var bootAmountBasePosX = [];
var bootAmountBasePosY = [];
var bootAmountTextPosX = [];
var bootAmountTextPosY = [];
var bootIconPosX = [];
var bootIconPosY = [];

var inHandMoneyBaseAmountPosX = [];
var inHandMoneyBaseAmountPosY = [];
var inHandMoneyIconPosX = [];
var inHandMoneyIconPosY = [];
var inHandAmountPosX = [];
var inHandAmountPosY = [];

var crownImagePosX = [];
var crownImagePosY = [];
var giftImagePosX = [];
var giftImagePosY = [];

var packBasePosX = [];
var packBasePosY = [];

var allPlayers = [];
var lststartIndex = [];

var cardShowPosX = [];
var cardShowPosY = [];

var crownImageStayPosX = [];
var crownImageStayPosY = [];

var _online_player_button_group;
var _online_player_card_group;

var roomJoinDataJSON;
var playerCardJson;
var allCardSprite;

var angle;
var timerImage;
var potAmount = 0;
var currentBetAmount = 0;

var hasSeenCard = false;
var togglePlusMinusButton = false;

var currentBetAmountBase;
var currentBetAmountBaseIcon;
var currentBetAmountText;

var currentChaalAmount = 0;
var currentBlindAmount = 0;
var isShowInfoPopUp = false;
var blindCount = 0;

var potAmountAnimationBase;
var potAmountAnimationBaseIcon;
var potAnimationAmountText;
var dealerMessageText;
var _dealerMessageBase;
var sendSideShowPlayerID;
var jokerCard;
//var ownMessageGroup;
var cardGroup;
var seenCardGroup;

//LoadingPopUp
var loadingWheel;
var loadingPopupOverlay;
var loadingGroup;
var showLoadingPopUp = false;

//LoadAssets
var commonBackgroundImage1;
var commonBackgroundImage2;
var commonBackgroundImage3;

var classicCardImage;
var jokerCardImage;
var muflisCardImage;
var pokerChipImage;
var privateTableImage;
var privateTableBttnImage;
var settingsBttnImage;
var textShowCaseImage;
var userProfileImage;

var backBttnImage;
var classicCheckCircleImage;
var jokerCheckCircleImage;
var muflisCheckCircleImage;
var createTableTxtImage;
var createTableBttnImage;
var enterCodeImage;
var joinTableBttnImage;
var joinTableTxtImage;
var tickMarkImage;

var chatBttnImage;
var infoBttnImage;
var classicHeadingImage;
var jokerHeadingImage;
var muflisHeadingImage;
var girlsDealerImage;
var bootIconImage;
var chaalBttnImage;
var chaalLimitIconImage;
var minusIconImage;
var plusIconImage;
var potLimitImage;
var sideShowBttnImage;
var tableBttnImage1;
var tableBttnImage2;
var tableBttnImage3;
var showBttnImage;
var blindBttnImage;
var bttnUiBaseImage;
var packBttnImage;
var cardBackImage;

var dealericonImage;
var giftIconImage;
var crownImage;
var decisionImage;
var packImage;
var allCard;
var popUpBase;
var okButton;
var blackOnePixel;

var greenButtonBase;
var redButtonBase;
var blueButtonBase;
var particleEffectSpriteSheet

//OpponentWaitingPanel
var timerText;
var startTime;
var totalTime;
var timeElapsed;
var waitingforPopUpPanelGroup;
var timeRemaining;
var isTimeRemainingPopUp = false;

//ChangeNamePopUp
var change_Name_value;

//SideShow PopUp
var sideShowPopupGroup;

//ChatBox
var chatPopupOverlay;
var typingBase;
var typingInputText;
var sendButton;
var templateMsgBackground;

var ownBoxGroup;
var ownMsgBox;
var ownMsgBoxText;
var heightOfOwnMsgBox = 0;
var ownMsgTotalscrollY = 0;

var startPosOfChatBox = 0;
var endPosChatBox = 0;
var deltaYOfChatBox = 0;
var totalAmount = 0;
var thresholdOfChatBox = 10;
var amountToMove = 0;

var templateJsonData;
var chatGroup;
var crossButton;
var messageTypedValue;
var isChatBoxOpen = false;

//Gift Pop Up
var avatarPopupBg;
var avatarGiftPopupBase;
var giftsArray = [];
var giftsTickMarkArray = [];
var numberOfGift = 15;

var giftScrollSpeed = 0;
// var upButton;
// var downButton;
var giftRightButton;
var giftLeftButton;
var giftScrollGroup;
var giftScrollBg;

var changeGiftGroup;
var giftScrollManageCounter = 6;
var gift_tick_mark;

var giftstartPos = 0;
var giftendPos = 0;
var giftdeltaX = 0;
var giftotalAmount = 0;
var giftScrollthreshold = 40;

var giftScrollCounter = 0;
var giftImageName;
var gift_to_id;
var gift_id;
// var sendGiftIconBase;
// var receiverGiftIconBase;
//var senderGiftSpriteSheet;
//var receieverGiftSpriteSheet;
// var senderGiftIcon;
// var receiverGiftIcon;
// var giftSenderPosX;
// var giftSenderPosY;
// var giftReceiverPosX;
// var giftReceiverPosY;


//MenuController
var menuConrollerPopupOverlay;
var menuGroup;
var menuPopupBase;
var menuHeading;
var menuGroup;

var closeMenuPopUpBase;
var exitToLobbyPopUpBase;
var switchTablePopUpBase;
var howToPlayPopUPBase;

var closeMenuGroup;
var exitToLobbyGroup;
var switchToLobbyGroup;
var howToPlayGroup;

var isSwitchTable = false;

//API
var BaseUrL  = "http://13.232.233.114:3000/";///*"http://192.168.2.57:3004/";*/"http://esclipping.net:3004/";//"http://192.168.2.57:3004/";
var loginUrl = "user-update-login-details";
var logoutUrl = "logout";
var getBalanceUrl = "";
var setBalanceUrl = "";
var getProfilePicUrl = "";
var setProfilePicUrl = "update-avatar";
var getProfileDetails = "profile-details";
var updateProfileName = "update-profile";
var chatList = "chat-list";
var createPrivateTable = "create-private-table";
var joinPrivateTable = "join-private-table";
var getGift = "get-gift";
var specificPage = "";
var maxBalance = 10;

var numberOfPlayerCounter = 0;
var gamePage = "";
var isExitToLobbyClicked = false;
// var isSwitchTable = true;