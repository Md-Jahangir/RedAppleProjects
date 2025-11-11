/**
 * 
 * @param {number} iXPos 
 * @param {number} iYPos 
 * @param {HTMLImageElement} oSprite 
 * @returns 
 */
function ChipButton(x, y, spriteNormal, spriteDisabled) {
    this.imgDisabled = null;
    
    this._init(x, y, spriteNormal, spriteDisabled);

    return this;
}
//#########################################################################################################################################
ChipButton.prototype = Object.create(CGfxButton.prototype);
ChipButton.prototype.constructor = ChipButton;
//#########################################################################################################################################
/**
 * 
 * @param {*} x 
 * @param {*} y 
 * @param {*} spriteNormal 
 * @param {*} spriteDisabled 
 */
ChipButton.prototype._init = function(x, y, spriteNormal, spriteDisabled) {
    CGfxButton.prototype._init.apply(this, [x, y, spriteNormal]);

    this.imgDisabled = createBitmap(spriteDisabled);
    this.imgDisabled.x = x;
    this.imgDisabled.y = y;

    this.imgDisabled.regX = spriteDisabled.width / 2;
    this.imgDisabled.regY = spriteDisabled.height / 2;
    this.imgDisabled.cursor = "pointer";
    s_oGameCon.addChild(this.imgDisabled);
};
//#########################################################################################################################################
/**
 * 
 */
ChipButton.prototype.unload = function() {
    CGfxButton.prototype.unload.apply(this, []);
    s_oGameCon.removeChild(this.imgDisabled);
};
//#########################################################################################################################################
/**
 * 
 * @param {boolean} isVisible 
 */
ChipButton.prototype.setVisible = function(isVisible) {
    CGfxButton.prototype.setVisible.apply(this, [isVisible]);
};
//#########################################################################################################################################
/**
 * 
 * @param {*} newX 
 * @param {*} newY 
 */
ChipButton.prototype.setPosition = function(newX, newY) {
    CGfxButton.prototype.setPosition.apply(this, [newX, newY]);
    this.imgDisabled.x = newX;
    this.imgDisabled.y = newY;
};
//#########################################################################################################################################
/**
 * 
 * @param {*} newscale 
 */
ChipButton.prototype.setScale = function(newscale) {
    CGfxButton.prototype.setScale.apply(this, [newscale]);

   
};
//#########################################################################################################################################
/**
 * 
 * @param {*} newX 
 */
ChipButton.prototype.setX = function(newX) {
    CGfxButton.prototype.setX.apply(this, [newX]);
    this.imgDisabled.x = newX;
};
//#########################################################################################################################################
/**
 * 
 * @param {*} newY 
 */
ChipButton.prototype.setY = function(newY) {
    CGfxButton.prototype.setY.apply(this, [newY]);
    this.imgDisabled.y = newY;
};
//#########################################################################################################################################
/**
 * 
 */
ChipButton.prototype.enable = function() {
    CGfxButton.prototype.enable.apply(this, []);
    this.imgDisabled.visible = false;
};
//#########################################################################################################################################
/**
 * 
 */
ChipButton.prototype.disable = function() {
    CGfxButton.prototype.disable.apply(this, []);
    this.imgDisabled.visible = true;
};