var PlayerDetails = function() {
    this.playerId = "";
    this.playerName = "";
    this.playerSprite = "";
    this.playerLevel = "";
    this.playerTicket = "";
    this.playerPosX = "";
    this.playerPosY = "";

    this.playerProfilePic = "";
    this.profileMask = "";
    this.playerNameText = "";
    this.playerLevelText = "";
    this.playerTicketText = "";


    this.CreatePlayerDetails = function(_playerPosX, _playerPosY, _playerId, _playerName, _playerSprite, _playerLevel, _playerTicket) {
        this.playerPosX = _playerPosX;
        this.playerPosY = _playerPosY;
        this.playerId = _playerId;
        this.playerName = _playerName;
        this.playerSprite = _playerSprite;
        this.playerLevel = _playerLevel;
        this.playerTicket = _playerTicket;

        this.profileDetailsBg = Utils.SpriteSettingsControl(this.profileDetailsBg, this.playerPosX, this.playerPosY, 'profiles_details_area', "true", "true", 0.5, 0.5, 1, 1, "false");

        this.profileMask = game.add.graphics(0, 0);
        this.profileMask.beginFill(0x00f0f0);
        this.profileMask.drawRect(0, -66, 174, 128);
        this.profileDetailsBg.addChild(this.profileMask);

        this.playerProfilePic = Utils.SpriteSettingsControl(this.playerProfilePic, 100, 0, 'profile_pic', "true", "true", 0.5, 0.5, 0.5, 0.5, "false");
        this.profileDetailsBg.addChild(this.playerProfilePic);
        this.playerProfilePic.mask = this.profileMask;

        var playerNameStyle = { font: '29px Lato-Heavy', fill: '#fff', align: 'center' };
        this.playerNameText = game.add.text(-156, -45, "", playerNameStyle);
        this.playerNameText.anchor.setTo(0, 0.5);
        this.profileDetailsBg.addChild(this.playerNameText);

        var levelStyle = { font: '32px Lato-Heavy', fill: '#06746b', align: 'left' };
        this.playerLevelText = game.add.text(-156, -8, "Level- " + "0", levelStyle);
        this.playerLevelText.anchor.setTo(0, 0.5);
        this.profileDetailsBg.addChild(this.playerLevelText);

        var ticketStyle = { font: '32px Lato-Heavy', fill: '#06746b', align: 'left' };
        this.playerTicketText = game.add.text(-156, 40, "Ticket- " + "0", ticketStyle);
        this.playerTicketText.anchor.setTo(0, 0.5);
        this.profileDetailsBg.addChild(this.playerTicketText);

        playerDetailsScrollableGroup.add(this.profileDetailsBg);
        playerDetailsScrollableGroup.angle = 90;
    }

    this.SetPlayerDetailsValue = function(_image, _name, _level, _ticket) {
        if (_image != null) {
            this.playerProfilePic.loadTexture(_image);
        } else {
            this.playerProfilePic.loadTexture('profile_pic');
        }
        this.playerNameText.setText(_name);
        this.playerLevelText.setText("Level- " + _level);
        this.playerTicketText.setText("Ticket- " + _ticket);
    }

}