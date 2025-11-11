var game;
var scaleFactor;
var isMobile;
var gameStartTime = null;
var playClicked = null;
var firstTimeGameStarted = 0;
var score = 0;
var roundCounter = 0;
// tscore = 0;

var gameOptions = {
    rotationSpeed: 4,
    maxRotationSpeed: 10,
    rotationVariation: 2,
    changeTime: 2500,
    minAngle: 12,
    throwSpeed: 150,
}