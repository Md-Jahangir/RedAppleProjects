var Player = function() {
    this.playerId = "";
    this.playerName = "";
    this.playerSprite = "";
    this.playerPosX = "";
    this.playerPosY = "";

    this.playerProfilePic = "";
    this.profileMask = "";
    this.playerNameText = "";
    this.playerNameTextBg = "";
    this.playersGroup = "";


    this.CreatePlayer = function(_playerPosX, _playerPosY, _playerId, _playerName, _playerSprite) {
        this.playerPosX = _playerPosX;
        this.playerPosY = _playerPosY;
        this.playerId = _playerId;
        this.playerName = _playerName;
        this.playerSprite = _playerSprite;

        this.profileMask = game.add.graphics(0, 0);
        this.profileMask.beginFill(0x00f0f0);
        this.profileMask.drawRect((this.playerPosX - 75), (this.playerPosY - 95), 150, 170);

        this.playerProfilePic = Utils.SpriteSettingsControl(this.playerProfilePic, this.playerPosX, this.playerPosY, 'profile_pic', "true", "true", 0.5, 0.5, 0.5, 0.5, "false");
        this.playerProfilePic.angle = 90;
        this.playerProfilePic.mask = this.profileMask;

        this.playerNameTextBg = Utils.SpriteSettingsControl(this.playerNameTextBg, (this.playerPosX - 65), (this.playerPosY - 10), 'player_name_area', "true", "true", 0.5, 0.5, 0.7, 0.7, "false");
        this.playerNameTextBg.angle = 90;

        var playerNameStyle = { font: '38px Lato-Heavy', fill: '#fff', align: 'center' };
        this.playerNameText = game.add.text(-5, 0, "", playerNameStyle);
        this.playerNameText.anchor.setTo(0.5);
        this.playerNameTextBg.addChild(this.playerNameText);

        this.playersGroup = game.add.group();
        this.playersGroup.add(this.profileMask);
        this.playersGroup.add(this.playerProfilePic);
        this.playersGroup.add(this.playerNameTextBg);
        playersNormalGroup.add(this.playersGroup);

    }

    this.SetPlayerValue = function(_image, _name) {
        if (_image != null) {
            this.playerProfilePic.loadTexture(_image);
        } else {
            this.playerProfilePic.loadTexture('profile_pic');
        }
        this.playerNameText.setText(_name);
    }


}