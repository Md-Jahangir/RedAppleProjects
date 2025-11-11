var nonStrikePlayer;

function CNonStrikerBatter(oParentContainer, iTeam) {

    var nonStrikePlayer;
    this._init = function(oParentContainer, iTeam) {

        nonStrikePlayer = createBitmap(s_oSpriteLibrary.getSprite('nonStrike'));
        s_oStage.addChild(nonStrikePlayer);
        nonStrikePlayer.scaleX = 0.6;
        nonStrikePlayer.scaleY = 0.6;
        nonStrikePlayer.x = NON_STRIKER_BATTER_X;
        nonStrikePlayer.y = NON_STRIKER_BATTER_Y;
    };

    this.makeInvisible = function() {
        nonStrikePlayer.visible = false;
    };

    this.makeVisible = function() {
        nonStrikePlayer.visible = true;
    };

    s_oNonStrikeBatter = this;

    this._init(oParentContainer, iTeam);

}
s_oNonStrikeBatter = null;