/**
 * Module implements resolution selection. It based on list of supported/existed assets resolutions and screen resolution.
 */
//#################################################################################################
/**
 * List of supported assets resolutions (for each resolution need to be appropriate folder in assets/images)
 */
const assetsResolutions = [
	//3840 x 2160
	//2560 x 1440
	//1920 x 1080
	//1280 x 720
	// { width: 3840, height: 2160, path: "3840x2160" },
	// { width: 2560, height: 1440, path: "2560x1440" },
	{ width: 1920, height: 1080, path: "1920x1080" },
	// { width: 1280, height: 720, path: "1280x720" }
];
//#################################################################################################
/**
 * Get absolute value of difference between passed width and value in resolutions array.
 * @param {number} baseW - base width
 * @param {number} index - index in resolutions array
 * @returns {number}
 */
function getAbsWidth(baseW, index) {
	let width = assetsResolutions[index].width;
	return Math.abs(baseW - width);
};
//#################################################################################################
/**
 * Get absolute value of difference between passed height and value in resolutions array.
 * @param {number} baseH - base height 
 * @param {number} index - index in resolutions array
 * @returns {number}
 */
function getAbsHeight(baseH, index) {
	let height = assetsResolutions[index].height;
	return Math.abs(baseH - height);
};
//#################################################################################################
/**
 * Walk through list of resolutions and calculate absolute difference between width and height of screen and current value in list.
 * Element with minimal differens is returned.
 * @returns {resolution: {width: number, height: number, path: string}, scale: number}
 */
function getResolution() {
	// console.log("assetsResolutions: ", assetsResolutions);
	// console.log("assetsResolutions length: ", assetsResolutions.length);
	if (assetsResolutions.length === 1) {
		// console.log("Resolution selected:", assetsResolutions[0]);
		return assetsResolutions[0];
	}

	let screenWidth = window.screen.width;
	let screenHeight = window.screen.height;

	let resIndex = 0;
	let absWidth = getAbsWidth(screenWidth, 0);
	let absHeight = getAbsHeight(screenHeight, 0);

	for (let i = 0; i < assetsResolutions.length; i++) {
		let currentAbsWidth = getAbsWidth(screenWidth, i);
		let currentAbsHeight = getAbsHeight(screenHeight, i);
		if ((currentAbsWidth <= absWidth) && (currentAbsHeight <= absHeight)) {
			absWidth = currentAbsWidth;
			absHeight = currentAbsHeight;
			resIndex = i;
		}
	}

	// console.log("Resolution selected:", assetsResolutions[resIndex]);
	return assetsResolutions[resIndex]
};

/*function getScale(resolution) {
	let screenWidth = window.screen.width;
	let screenHeight = window.screen.height;

	let scaleX = screenWidth / resolution.width;
	let scaleY = screenHeight / resolution.height;
	return scaleX < scaleY ? scaleX : scaleY;
};*/

const selectedResolution = getResolution();

export { selectedResolution as SelectedResolution }