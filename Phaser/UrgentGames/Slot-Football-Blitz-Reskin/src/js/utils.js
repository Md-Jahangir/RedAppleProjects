import { Model } from "./model";
/**
 * Get value of scale between selected resolution for resources width/height and resized window width/height. 
 * @param {number} resWidth - width of selected resolution for resources
 * @param {number} resHeight - height of selected resolution for resources
 * @param {number} screenNewWidth - width of resized client area (innerWidth)
 * @param {number} screenNewHeight - height of resized client area (innerHeight)
 * @returns {number} - valus of scale
 */
function getScale(resWidth, resHeight, screenNewWidth, screenNewHeight) {
	let screenWidth = resWidth;
	let screenHeight = resHeight;
	let newScaleX = screenNewWidth / screenWidth;
	let newScaleY = screenNewHeight / screenHeight;
	return newScaleX < newScaleY ? newScaleX : newScaleY;
};

function getRandomSymbols() {
	let res = [];
	let symbolsList = Model.getSymbols();
	for (let i = 0; i < 3; i++) {
		let rndSymbol = Math.floor(Math.random() * symbolsList.length);
		res.push(symbolsList[rndSymbol]);
	}

	return res;
};

export { getScale, getRandomSymbols }