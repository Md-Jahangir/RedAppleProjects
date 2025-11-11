/* global window */
/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 16-02-2024.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 09-08-2024
 * @Description :- Resolution selecting and calculation scale.
 ************************************/

const assetsResolutions = [
  //3840 x 2160
  //2560 x 1440
  //1920 x 1080
  //1280 x 720
  // { width: 3840, height: 2160, path: "3840x2160" },
  // { width: 2560, height: 1440, path: "2560x1440" },
  { width: 1920, height: 1080, path: '1920x1080' },
  // { width: 1280, height: 720, path: "1280x720" }
];
//#################################################################################################
/**
 * Get absolute value of difference between passed width and value in resolutions array.
 * @param {number} _baseW - base width
 * @param {number} _index - index in resolutions array
 * @returns {number}
 */
function getAbsWidth(_baseW, _index) {
  const width = assetsResolutions[_index].width;
  return Math.abs(_baseW - width);
};
//#################################################################################################
/**
 * Get absolute value of difference between passed height and value in resolutions array.
 * @param {number} _baseH - base height 
 * @param {number} _index - index in resolutions array
 * @returns {number}
 */
function getAbsHeight(_baseH, _index) {
  const height = assetsResolutions[_index].height;
  return Math.abs(_baseH - height);
};
//#################################################################################################
/**
 * Walk through list of resolutions and calculate absolute difference between width and height of screen and current value in list.
 * Element with minimal differens is returned.
 * @returns {resolution: {width: number, height: number, path: string}, scale: number}
 */
function getResolution() {
  if (assetsResolutions.length === 1) {
    return assetsResolutions[0];
  }

  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;

  let resIndex = 0;
  let absWidth = getAbsWidth(screenWidth, 0);
  let absHeight = getAbsHeight(screenHeight, 0);

  for (let i = 0; i < assetsResolutions.length; i++) {
    const currentAbsWidth = getAbsWidth(screenWidth, i);
    const currentAbsHeight = getAbsHeight(screenHeight, i);
    if ((currentAbsWidth <= absWidth) && (currentAbsHeight <= absHeight)) {
      absWidth = currentAbsWidth;
      absHeight = currentAbsHeight;
      resIndex = i;
    }
  }

  // console.log("Resolution selected:", assetsResolutions[resIndex]);
  return assetsResolutions[resIndex];
};

/*function getScale(resolution) {
  let screenWidth = window.screen.width;
  let screenHeight = window.screen.height;

  let scaleX = screenWidth / resolution.width;
  let scaleY = screenHeight / resolution.height;
  return scaleX < scaleY ? scaleX : scaleY;
};*/

const selectedResolution = getResolution();

export { selectedResolution as SelectedResolution };