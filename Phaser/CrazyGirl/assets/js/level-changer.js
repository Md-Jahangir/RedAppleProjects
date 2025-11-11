function loadLevel(urlString){
	console.log("Next Level URL: " + urlString);
	parent.document.getElementById('game_iframe').src = urlString;
}
//  function loadLevel(index){
// 	console.log("Next Level URL: " + index);
// 	parent.document.getElementById('game_iframe').src = index;
// }

function generateURLAndLoad(levelString){
	var parsedNumber = levelString;
	var urlString;

	if(parsedNumber<10){
		// urlString = "./level-0" + parsedNumber;
		urlString = parsedNumber;
	}else{
		// urlString = "./level-" + parsedNumber;
		urlString = parsedNumber;
	}

	console.log("Next Level URL: " + urlString);
	parent.document.getElementById('game_iframe').src = urlString;
}

function updateLastWonLevel(levelNumber){
    // CHECK THE EXISTING LAST LEVEL NUMBER IN LOCAL STORAGE
    var lastWonLevel = localStorage.getItem("crazy_girl_last_level_won");

    if(!lastWonLevel || (parseInt(lastWonLevel) < levelNumber) ){
        localStorage.setItem("crazy_girl_last_level_won",levelNumber);
    }
}
