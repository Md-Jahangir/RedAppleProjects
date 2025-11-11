var loadingPopupGroup;

var LoadingPopup = {
    ShowLoadingPopup: function() {
        loadingPopupGroup = game.add.group();

        var loadingPopupOverlay = Utils.ButtonSettingsControl(loadingPopupOverlay, game.world.centerX, game.world.centerY, 'one_pixel', this.LoadingPopupOverlayPressed, null, null, null, "true", "true", 0.5, 0.5, 3000, 3000, this);
        loadingPopupOverlay.tint = "0x000000";
        loadingPopupOverlay.alpha = 0.5;

        var loadingWheel = Utils.SpriteSettingsControl(loadingWheel, game.world.centerX, game.world.centerY, 'loading_wheel', "true", "true", 0.5, 0.5, 1.5, 1.5, "false");
        loadingWheel.animations.add('loading_wheel_animation');
        loadingWheel.animations.play('loading_wheel_animation', 5, true);

        if (gamePage == "Gameplay") {
            loadingPopupOverlay.angle = 90;
            loadingWheel.angle = 90;
        } else {
            loadingPopupOverlay.angle = 0;
            loadingWheel.angle = 0;
        }

        loadingPopupGroup.add(loadingPopupOverlay);
        loadingPopupGroup.add(loadingWheel);
    },

    HideLoadingPopup: function() {
        if (loadingPopupGroup != null) {
            loadingPopupGroup.visible = false;
            loadingPopupGroup.destroy();
        } else {}
    }
}